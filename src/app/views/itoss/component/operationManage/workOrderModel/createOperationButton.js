require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

var DateChange = require('../../../../../utils/dateChange.js');

var operationButtons = React.createClass({
  mixins: [History],
  createOrder:function(){
    var detailData = new Object();
    var busObDefFieldDetailtemp = this.props.busObDefFieldDetail;
    for(var i = 0; i < busObDefFieldDetailtemp.length; i++) {
        if(busObDefFieldDetailtemp[i].name != "RecId" && busObDefFieldDetailtemp[i].name != "LastModDateTime" && busObDefFieldDetailtemp[i].name != "LastModBy" &&
        busObDefFieldDetailtemp[i].name != "CreatedDateTime" && busObDefFieldDetailtemp[i].name != "CreatedBy") {
            if(document.getElementById(busObDefFieldDetailtemp[i].name) != null) {
                switch (busObDefFieldDetailtemp[i].dataType) {
                    case "Text":
                        detailData[busObDefFieldDetailtemp[i].name] = document.getElementById(busObDefFieldDetailtemp[i].name).value;
                        break;
                    case "DateTime":
                        detailData[busObDefFieldDetailtemp[i].name] = new Date(Date.parse(document.getElementById(busObDefFieldDetailtemp[i].name).value.replace(/-/,"/")));
                        break;
                    default:
                        detailData[busObDefFieldDetailtemp[i].name] = document.getElementById(busObDefFieldDetailtemp[i].name).value;
                        break;
                }
            }
        }
    }
    // this.props.add_workOrderForm(detailData, this.props.workOrderTemplatesMainForm.t_entity);

    var workOrderNumber = this.props.createOrderInfo.SERIALNUMBER;
    var data = {
      Status:"cg",
      WorkOrderNumber:workOrderNumber,
      SerialNumber:workOrderNumber,
      CurrentHandle:localStorage.getItem("USERNAME")
    };
    // // console.log(data);
    // this.props.save_createOrder(data);
    this.props.save_createOrderAndDetailTemplate(data, detailData, this.props.workOrderTemplatesMainForm.t_entity);
    this.props.setCanUpdate("true");
    $(".operationButtonGroup1").find(".buttonInfo").find("button").each(function(){
      $(this).attr("disabled",true);
      $(this).css("background-color","#ddd");
    });
  },
  createOrder2:function(){

    //清除当前流转人员数据
    // this.getFlux().actions.YFTOperationFlowActions.set_CurrentNextPerson("");
    this.props.setCurrentNextPerson("");
    var filter = [{key:"FROM_ID",value:localStorage.getItem("CURRENT_ROLENAME")},
                  {key:"WORKFLOW_ID",value:this.props.curWorkFlowId},
                  {key:"GROUP_ID",value:localStorage.getItem("GROUP_ID")}];
    //this.getFlux().actions.YFTOperationFlowActions.get_WorkOrderNextPersonData(filter);
    this.props.get_WorkOrderNextPersonData(filter);

    var serviceId = this.props.serviceId;
    // if(serviceId==null||serviceId==""){
    //   alert("请选择服务级别协议名称");
    //   return false;
    // };
    var workOrderNumber = this.props.createOrderInfo.SERIALNUMBER;
    var data = {
      Subject:title,
      WorkOrderDesc:explain,
      FaultLarge:faultLarge,
      FaultSmall:faultSmall,
      FaultLevelId:faultLevel,
      Status:"cg",
      WorkOrderNumber:workOrderNumber,
      SerialNumber:workOrderNumber,
      CurrentHandle:localStorage.getItem("USERNAME"),
      SLAId:serviceId,
    };
    this.props.save_createOrder2(data);
    this.props.setCanUpdate("true");
    $(".operationButtonGroup1").find(".buttonInfo").find("button").each(function(){
      $(this).attr("disabled",true);
      $(this).css("background-color","#ddd");
    });
  },
  createOrderHandleFlow:function(key){
    //key=1 保存；key=2 保存并发送邮件
    if(this.props.curWorkOrderId == ""){
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "请保存工单后再保存处理表单数据。"
        $('#publicMessageModal').modal('show');
      },100);
      //alert("请保存工单后再保存处理表单数据。");
      return;
    };

    var NextRoleName="";
    // var currentNextPerson = this.state.flow.CurrentNextPerson;
    var currentNextPerson = this.props.currentNextPerson;
    if(currentNextPerson != null && currentNextPerson != ""){
      NextRoleName = currentNextPerson[0].roleName;
    }else{
      //alert("请选择下级处理人。");
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "请选择下级处理人。"
        $('#publicMessageModal').modal('show');
      },100);
      return;
    };

    var handleData = new Object();
    var busObDefFieldHandletemp= this.props.busObDefFieldHandle;
    for(var i = 0; i < busObDefFieldHandletemp.length; i++) {
        if(busObDefFieldHandletemp[i].name != "RecId" && busObDefFieldHandletemp[i].name != "LastModDateTime" && busObDefFieldHandletemp[i].name != "LastModBy" &&
        busObDefFieldHandletemp[i].name != "CreatedDateTime" && busObDefFieldHandletemp[i].name != "CreatedBy") {
            if(document.getElementById(busObDefFieldHandletemp[i].name) != null) {
                switch (busObDefFieldHandletemp[i].dataType) {
                    case "Text":
                        handleData[busObDefFieldHandletemp[i].name] = document.getElementById(busObDefFieldHandletemp[i].name).value;
                        break;
                    case "DateTime":
                        handleData[busObDefFieldHandletemp[i].name] = new Date(Date.parse(document.getElementById(busObDefFieldHandletemp[i].name).value.replace(/-/,"/")));
                        break;
                    default:
                        handleData[busObDefFieldHandletemp[i].name] = document.getElementById(busObDefFieldHandletemp[i].name).value;
                        break;
                }
            }
        }
    }
    handleData["workOrderId"] = this.props.curWorkOrderId;

    //流程流转中每一个步骤状态列表数据
    var flowStatus="";
    var flowAction="";
    // var FlowActionListData = this.state.flow.FlowActionListData;
    var FlowActionListData = this.props.flowActionListData;
    if(FlowActionListData.length > 0){
      for(var i=0;i<FlowActionListData.length;i++){
        if(FlowActionListData[i].FROM_ID == localStorage.getItem("CURRENT_ROLENAME") && FlowActionListData[i].TO_ID == NextRoleName){
          flowStatus=FlowActionListData[i].STATUS;
          flowAction=FlowActionListData[i].FLOW_ACTION;
          break;
        }
      }
    };

    var iorderOver = 0;
    // //工单解决时间
    // if($("#createOperationOrderOver").val() != "" && $("#createOperationOrderOver").val() != null){
    //    iorderOver = parseInt($("#createOperationOrderOver").val());
    // };
    // var dispatchTime = new Date(); //派工时间
    // var yjwcTime = DateChange.addHoursRDate(new Date(),iorderOver);   //预计完成时间

    // if($("#createOperationHandleNextDisTime").find('input').val() == ""){
    //   alert("请填写派工时间。");
    //   return;
    // };
    //修改工单状态 WorkOrderCommon 的字段 Status：申请延期批复	sqyqpf;待验证	wc;关闭	gb;申请延期拒绝	sqyqjj;草稿	cg;待处理	cl;申请延期	sqyq;
    // if(flowStatus == "cl"){
    //   //流程从 运维人员 -> 视频监控管理人员 流程状态变为 待验证; 其他情况为  待处理状态
    //   //DispatchNumber 用于标志是否填了，派工时间。
    //   var statusData = {
    //     RecId:this.props.curWorkOrderId,
    //     Status:flowStatus,
    //     CurrentHandle:$('#createOperationHandleNextPers').val(),
    //     ResponseTime:dispatchTime,
    //     AppointmentTime:yjwcTime,
    //     DispatchNumber:1
    //   };
    //   //this.getFlux().actions.YFTOperationFlowActions.update_WorkOrderCommonStatusData(statusData);
    //   this.props.update_WorkOrderCommonStatusData(statusData);
    // }else{
    //   //流程从 运维人员 -> 视频监控管理人员 流程状态变为 待验证; 其他情况为  待处理状态
      var statusData = {
        RecId:this.props.curWorkOrderId,
        Status:flowStatus,
        CurrentHandle:$('#createOperationHandleNextPers').val()
      };
      this.props.update_WorkOrderCommonStatusData(statusData);
    // };

    // //增加 工单处理信息 WorkOrderProcessLog
    // if($("#createOperationHandleProcess").val() != "" && $("#createOperationHandleProcess").val() != null){
    //   var processLogData = {
    //     WorkOrderId: this.props.curWorkOrderId,//对应工单ID
    //     Content:$("#createOperationHandleProcess").val(),//处理意见(处理过程)
    //     Handler:$('#createOperationHandleCurrentPers').val() //当前处理人
    //   };
    //   //this.getFlux().actions.YFTOperationFlowActions.add_WorkOrderProcessLogData(processLogData);
    //   this.props.add_WorkOrderProcessLogData(processLogData);
    // };
    // var HandleProcess = "";
    // if($("#createOperationHandleProcess").val()){
    //   HandleProcess = $("#createOperationHandleProcess").val();
    // };
    var flowData = {
        FlowAction:flowAction,
        WorkOrderId: this.props.curWorkOrderId,//对应工单ID
        // LinkDesc:"",//环境描述
        FromId: localStorage.getItem("CURRENT_ROLENAME"),//当前处理人角色名
        ToId: NextRoleName,//下级处理人角色名
        //Content:HandleProcess,//处理过程
        //ProcessResult:$("input[name='wo_revisitResult']:checked").val(),//未解决原因
        //DispatchTime:new Date(Date.parse($("#createOperationHandleNextDisTime").find('input').val().replace(/-/,"/"))), //派工时间
        DispatchTime:new Date(Date.parse($("#createDispatchTime").find('input').val().replace(/-/,"/"))).getDate()?new Date(Date.parse($("#createDispatchTime").find('input').val().replace(/-/,"/"))):null, //派工时间
        //ArrivalTime:new Date(Date.parse($("#createOperationHandleResponseTime").find('input').val().replace(/-/,"/"))),//响应时间
        ArrivalTime:new Date(Date.parse($('#ArrivalTime').val().replace(/-/,"/"))),//响应时间,只有在维护人员才有用，所以在其他人员那里，只填当前时间作备用，在界面上不填值。
        // ResolutionState:"未解决",//解决状态
        FromUser:$('#CurrentHandle').val(),//当前处理人
        ToUser:$('#createOperationHandleNextPers').val(),//下级处理人
        Step:1,//流程步骤 this.state.flow.Steps
        OpIdentity:0
    };
    //增加 工单日志
    //this.getFlux().actions.YFTOperationFlowActions.add_WorkFlowLogData(flowData);
    // this.props.add_WorkFlowLogData(flowData);
    this.props.add_WorkFlowLogDataAndHandleTemplate(flowData, handleData, this.props.workOrderTemplatesSheetForm.t_entity);
    //向当前工单下一个流转人员发送邮件
    // if(key == 2){
    //   //filters 格试 [{key:"EMAIL",value:""},{key:"SUBJECT",value:""},{key:"CONTENT",value:""}];
    //   var contenttemp = "",ordertitle="";
    //   if($("#createOperationOrderExplain").val()){
    //     contenttemp = $("#createOperationOrderExplain").val();
    //   };
    //   if($("#createOperationOrderTitle").val()){
    //     ordertitle = $("#createOperationOrderTitle").val();
    //   };
    //   if($("#createOperationHandleProcess").val()){
    //     contenttemp = contenttemp + "\n"+"上级处理意见："+ HandleProcess;
    //   };
    //   if(currentNextPerson[0].email){
    //     var emaildata = [{key:"EMAIL",value:currentNextPerson[0].email},
    //                   {key:"SUBJECT",value:ordertitle},
    //                   {key:"CONTENT",value:contenttemp}];
    //     //this.getFlux().actions.YFTOperationFlowActions.set_WorkFlowSendEmail(emaildata);
    //     this.props.set_WorkFlowSendEmail(emaildata);
    //   }else{
    //     setTimeout(function(){
    //       document.getElementById('publicMessageModelTitle').innerHTML = "提示";
    //       document.getElementById('publicMessageModalcontent').innerHTML = "邮箱地址为空,不能发送邮件。"
    //       $('#publicMessageModal').modal('show');
    //     },100);
    //   }
    // };

    //清除当前流转人员数据
    this.props.setCurrentNextPerson("");
    this.props.setCanUpdate("true");
  },
  backtoSpace:function(){
    var that = this;
    var isCanWorkSpace = false;
    var permissions = this.props.permissions;
    for(var i=0;i<permissions.length;i++){
      var resourceType = permissions[i].resourceType;
      if(resourceType == "/operationmanage/workordermanage/workspace"){
        isCanWorkSpace = true;
      };
    };
    if(isCanWorkSpace){
      var zTree = $.fn.zTree.getZTreeObj("commonTree");
      var treeNodes = zTree.getNodes();
      var targetNode = zTree.getNodeByParam("name","工作台");
      // console.log(targetNode);
      var tid = targetNode.tId;
      var tIndex = zTree.getNodeIndex(targetNode);
      document.getElementById(tid).className = "fadeInMenu";
      zTree.selectNode(targetNode);
      // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
      // this.getFlux().actions.YFTIndexActions.set_linshiNode(targetNode);
      var curThreeNode = this.props.curThreeNode;
      this.props.onSetPreThreeNode(curThreeNode);
      this.props.onSetCurThreeNode(targetNode);
      that.history.pushState(null,'operationManage/myWorkSpace');
    };
    this.props.setCanUpdate("true");
  },
  render:function(){
    var flowTypes = this.props.workFlowTypes;
    var curId = this.props.curWorkFlowId;
    var flowName = "";
    var isCanWorkSpace = false;
    var permissions = this.props.permissions;
    for(var i=0;i<permissions.length;i++){
      var resourceType = permissions[i].resourceType;
      if(resourceType == "/operationmanage/workordermanage/workspace"){
        isCanWorkSpace = true;
      };
    };
    if(!isCanWorkSpace){
      $(".backSpaceText").hide();
    };
    for(var i=0;i<flowTypes.length;i++){
      var rid = flowTypes[i].RecId;
      if(curId == rid){
        flowName = flowTypes[i].Name;
      };
    };
    return (
      <div className="operationButtons">
        <div className="operationButtonGroup1 oBGroup">
          <div className="titleDiv col-md-12">
            <div className="titleLeft">
                运维管理-新建{flowName}
            </div>
            <div className="titleRight">
              <a className="backSpaceText" onClick={this.backtoSpace}>返回工作台</a>
              <a href="#/operationManage/createOperation"><i className="fa fa-cog"></i></a>
            </div>
          </div>
          <div className="col-md-12">
            <div className="buttonInfo">
              <p>新建工单的主要功能：记录工单信息，故障描述。</p>
              <button onClick={this.createOrder}>仅保存</button>
              {/* <button style={{"marginLeft":"15px","backgroundColor":"#FF9933"}} onClick={this.createOrder2}>保存并分配</button> */}
            </div>
          </div>
        </div>
        <div className="operationButtonGroup2 oBGroup">
          <div className="titleDiv col-md-12">
            <div className="titleLeft">
                运维管理-{flowName}工单详情
            </div>
            <div className="titleRight">
              <a className="backSpaceText" onClick={this.backtoSpace}>返回工作台</a>
              <a href="#/operationManage/createOperation"><i className="fa fa-cog"></i></a>
            </div>
          </div>
          <div className="col-md-12">
            <div className="buttonInfo">
              <p>工单详情的主要功能：根据流程将工单分配给指定处理人员。/处理表单的主要功能：工程师填写表单处理过程。</p>
              <button onClick={this.createOrderHandleFlow.bind(this, 1)}>保存</button>
              {/* <button onClick={this.createOrderHandleFlow.bind(this, 2)} style={{"marginLeft":"15px","backgroundColor":"#FF9933"}}>保存并发邮件</button>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = operationButtons;
