require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var DateChange = require('../../../../../utils/dateChange.js');

var operationButtons = React.createClass({
  mixins: [History],
  componentDidMount:function(){
    $(".oBGroup").hide();
    $(".operationButtonGroup1").show();
  },
  editOrder:function(){
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
    detailData["RecId"] = this.props.workOrderTemplatesMainData[0].RecId;
    // this.props.update_workOrderForm(detailData, this.props.workOrderTemplatesMainForm.t_entity, this.props.workOrderTemplatesMainData[0].RecId);
    this.props.save_updateDetailTemplate(detailData, this.props.workOrderTemplatesMainForm.t_entity);
  },
  editOrderHandleFlow:function(key){
    //保存流转
    //key=1 保存；key=2 保存并发送邮件
    var NextRoleName="";
    var currentNextPerson = this.props.currentNextPerson;
    if(currentNextPerson != null && currentNextPerson != ""){
      NextRoleName = currentNextPerson[0].roleName;
    };
    if(!NextRoleName){
      //alert("请选择下级处理人");
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "请选择下级处理人。"
        $('#publicMessageModal').modal('show');
      },100);
      return;
    };
    //流程流转中每一个步骤状态列表数据
    var flowStatus="";//工单状态
    var flowAction="";//工单动作
    var FlowActionListData = this.props.flowActionListData;
    // console.log("FlowActionListData:");
    // console.log(FlowActionListData);
    if(FlowActionListData.length > 0){
      for(var i=0;i<FlowActionListData.length;i++){
        if(FlowActionListData[i].FROM_ID == localStorage.getItem("CURRENT_ROLENAME") && FlowActionListData[i].TO_ID == NextRoleName){
          flowStatus=FlowActionListData[i].STATUS;
          flowAction=FlowActionListData[i].FLOW_ACTION;
          break;
        }
      }
    };
    // console.log("flowStatus:"+flowStatus);
    if(flowStatus == ""){
      //alert("没有取到向下流转工单状态，不能向下流转工单。");
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "没有取到向下流转工单状态，不能向下流转工单。"
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

    var iorderOver = 0;
    // //工单解决时间
    // if($("#editOperationOrderOver").val() != "" && $("#editOperationOrderOver").val() != null){
    //    iorderOver = parseInt($("#editOperationOrderOver").val());
    // };
    // var dispatchTime = new Date(); //派工时间
    // var yjwcTime = DateChange.addHoursRDate(new Date(),iorderOver);   //预计完成时间
    //
    // //增加 工单处理信息 WorkOrderProcessLog
    // if($("#editOperationHandleProcess").val() != "" && $("#editOperationHandleProcess").val() != null){
    //   var processLogData = {
    //     WorkOrderId: this.props.curWorkOrderId,//对应工单ID
    //     Content:$("#editOperationHandleProcess").val(),//处理意见(处理过程)
    //     Handler:$('#editOperationHandleCurrentPers').val() //当前处理人
    //   };
    //   this.props.add_WorkOrderProcessLogData(processLogData);
    // };
    var resolutionState = "未解决";//解决状态
    //修改工单状态 WorkOrderCommon 的字段 Status：申请延期批复	sqyqpf;fp 待分配 待验证	wc;关闭	gb;申请延期拒绝	sqyqjj;草稿	cg;待处理	cl;申请延期	sqyq;待分配 fp;
    // if(this.props.curWorkOrderStatus == "cl" || this.props.curWorkOrderStatus == "sqyqpf" || this.props.curWorkOrderStatus == "sqyqjj" ){
    //   //根据当前工单状态判断是否要计算 “解决时长” Workload (string)
    //   var sworkload ="";  //解决时长
    //   // var sSLA_TITLE = "";//SLA名称
    //   // var sRESPONSE_TIME ="";//响应时间
    //   // var sRESOLVE_TIME ="";//解决时间
    //   // var sEXTENDED_DEADLINE ="";//延期截止日期
    //   var curdate = new Date();
    //   var CountDownMS= 0; //得出时间毫秒差
    //   var CountDownH = 0;//得出时间小时差
    //   var disTime = $("#editOperationHandleDisTime").find('input').val();//上级派工时间
    //   disTime = new Date(Date.parse(disTime.replace(/-/,"/")));
    //   var oldsworkload = $("#editOperationDetailWorkload").val();  //以前计算过的解决时长
    //   var timeOutNumber = 0; //超时时长
    //   CountDownMS = curdate.getTime() - disTime.getTime();//得出时间毫秒差
    //   if(CountDownMS > 0){
    //     CountDownH = Math.floor(CountDownMS / (1000 * 60 * 60));//得出两个日期之间 时间小时差
    //     //判断余前两位是否大于 0 ，大于0时，CountDownH 多增加一个小时
    //     var CountHtemp = CountDownMS / (1000 * 60 * 60);
    //     var countHtempstr = CountHtemp.toString();
    //     var ixof = countHtempstr.indexOf(".");
    //     if(ixof > 0){
    //       var aa = countHtempstr.substr((ixof + 1), 2);
    //       var aai = parseInt(aa);
    //       if(aai > 0){
    //         CountDownH++;
    //       }
    //     };
    //
    //     if(oldsworkload != ""){
    //       var sc = parseInt(oldsworkload);
    //       CountDownH = CountDownH + sc;
    //     }else{
    //       if(CountDownH <= 0){
    //         CountDownH = 1;
    //       };
    //     };
    //     sworkload =String(CountDownH);
    //   };
    //   if(this.props.orderDetailData != ""){
    //     var timenum = 0
    //     if(this.props.orderDetailData.RESOLVE_TIME_NUM != ""){
    //       timenum = parseInt(this.props.orderDetailData.RESOLVE_TIME_NUM);
    //     };
    //     if(timenum > 0){
    //       if((CountDownH - timenum) > 0){
    //         timeOutNumber = CountDownH - timenum;
    //       };
    //     };
    //   };
    //   //CompleteTime： 维护人员工单完成时间; TimeOutNumber 超时时长
    //   var statusData = {
    //     RecId:this.props.curWorkOrderId,
    //     Status:flowStatus,
    //     CurrentHandle:$('#editOperationHandleNextPers').val(),
    //     Workload:sworkload,
    //     TimeOutNumber:timeOutNumber,
    //     CompleteTime:curdate
    //   };
    //   this.props.update_WorkOrderCommonStatusData(statusData);
    // }else{
    //   if(flowStatus == "cl"){
    //     if(this.props.orderDetailData.DISPATCH_NUM == 1){
    //       dispatchTime = DateChange.strToDate(this.props.orderDetailData.DISPATCH_TIME);
    //       //DISPATCH_NUM == 1 填了派工时间。
    //       var statusData = {
    //         RecId:this.props.curWorkOrderId,
    //         Status:flowStatus,
    //         CurrentHandle:$('#editOperationHandleNextPers').val()
    //       };
    //       this.props.update_WorkOrderCommonStatusData(statusData);
    //     }else{
    //       //DispatchNumber 用于标志是否填了，派工时间。
    //       var statusData = {
    //         RecId:this.props.curWorkOrderId,
    //         Status:flowStatus,
    //         CurrentHandle:$('#editOperationHandleNextPers').val(),
    //         ResponseTime:dispatchTime,
    //         AppointmentTime:yjwcTime,
    //         DispatchNumber:1
    //       };
    //       this.props.update_WorkOrderCommonStatusData(statusData);
    //     }
    //   }else{
        var statusData = {
          RecId:this.props.curWorkOrderId,
          Status:flowStatus,
          CurrentHandle:$('#editOperationHandleNextPers').val()
        };
        this.props.update_WorkOrderCommonStatusData(statusData);
    //   }
    // };
    //响应时间
    // var arrivalTime = $("#editOperationHandleResponseTime").find('input').val();
    // if(arrivalTime == ""){
    //   arrivalTime = new Date();
    // }else{
    //   arrivalTime = new Date(Date.parse(arrivalTime.replace(/-/,"/")));
    // };
    // var HandleProcess = "";
    // if($("#editOperationHandleProcess").val()){
    //   HandleProcess = $("#editOperationHandleProcess").val();
    // };
    var flowData = {
        FlowAction:flowAction,
        WorkOrderId: this.props.curWorkOrderId,//对应工单ID
        // LinkDesc:"",//环境描述
        FromId: localStorage.getItem("CURRENT_ROLENAME"),//当前处理人角色名
        ToId: NextRoleName,//下级处理人角色名
        // Content:HandleProcess,//处理意见
        //ProcessResult:$("input[name='wo_revisitResult']:checked").val(),//未解决原因
        DispatchTime:new Date(Date.parse($("#editDispatchTime").find('input').val().replace(/-/,"/"))).getDate()?new Date(Date.parse($("#editDispatchTime").find('input').val().replace(/-/,"/"))):null, //派工时间
        ArrivalTime:new Date(Date.parse($('#ArrivalTime').val().replace(/-/,"/"))),//响应时间
        // ResolutionState:resolutionState,//解决状态
        FromUser:$('#CurrentHandle').val(),//当前处理人
        ToUser:$('#editOperationHandleNextPers').val(),//下级处理人
        Step:this.props.steps,
        OpIdentity:0
    };
    // console.log(flowData);
    // this.props.add_WorkFlowLogData(flowData);
    this.props.add_WorkFlowLogDataAndHandleTemplate(flowData, handleData, this.props.workOrderTemplatesSheetForm.t_entity);
    //向当前工单下一个流转人员发送邮件
    // if(key == 2){
    //   //filters 格试 [{key:"EMAIL",value:""},{key:"SUBJECT",value:""},{key:"CONTENT",value:""}];
    //   var contenttemp = "",ordertitle="";
    //   if($("#editOperationOrderExplain").val()){
    //     contenttemp = $("#editOperationOrderExplain").val();
    //   };
    //   if($("#editOperationOrderTitle").val()){
    //     ordertitle = $("#editOperationOrderTitle").val();
    //   };
    //   if($("#editOperationHandleProcess").val()){
    //     contenttemp = contenttemp + "\n"+"上级处理意见："+ HandleProcess;
    //   };
    //   if(currentNextPerson[0].email){
    //     var emaildata = [{key:"EMAIL",value:currentNextPerson[0].email},
    //                   {key:"SUBJECT",value:ordertitle},
    //                   {key:"CONTENT",value:contenttemp}];
    //     this.props.set_WorkFlowSendEmail(emaildata);
    //   }else{
    //     setTimeout(function(){
    //       document.getElementById('publicMessageModelTitle').innerHTML = "提示";
    //       document.getElementById('publicMessageModalcontent').innerHTML = "邮箱地址为空,不能发送邮件。"
    //       $('#publicMessageModal').modal('show');
    //     },100);
    //   };
    // };
  },
  closeOrderHandleFlow:function(){
    //alert("关闭工单");
    ////debugger;
    //流程流转中每一个步骤状态列表数据
    var flowStatus="";//工单状态
    var flowAction="";//工单动作
    var FlowActionListData = this.props.flowActionListData;
    if(FlowActionListData.length > 0){
      for(var i=0;i<FlowActionListData.length;i++){
        //if(FlowActionListData[i].FROM_ID == localStorage.getItem("CURRENT_ROLENAME") && FlowActionListData[i].TO_ID == "关闭"){ STATUS
        if(FlowActionListData[i].FROM_ID == localStorage.getItem("CURRENT_ROLENAME") && FlowActionListData[i].STATUS == "gb"){
          flowStatus=FlowActionListData[i].STATUS;
          flowAction=FlowActionListData[i].FLOW_ACTION;
          break;
        }
      }
    };
    if(flowStatus == ""){
      //alert("没有取到向下流转工单状态，不能关闭工单。");
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "没有取到向下流转工单状态，不能向下流转工单。"
        $('#publicMessageModal').modal('show');
      },100);
      return;
    };
    // 注:字符类型主要为这几个固定值
    //                Text     - 文本
    //                Number   - 数字
    //                Logic    - 逻辑
    //                DateTime - 日期
    // 输出参数:（分类型）
    //
    // Text 和  Number 类型 (Text为整数，Number格式为 整数长度+逗号+小数位)
    // result=[{name:"字段名",alias:"字段别名",dataType:"字符类型",lengthDetail:"{长度}"}...] json数组
    //
    // DateTime类型 (DateTime Date Time 分别为 日期时间 仅日期 仅时间)
    // result=[{name:"字段名",alias:"字段别名",dataType:"字符类型",dateDetail:"{类型}"}...] json数组
    //获取处理表单的值
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
                        handleData[busObDefFieldHandletemp[i].name] = new Date(document.getElementById(busObDefFieldHandletemp[i].name).value);
                        break;
                    default:
                        handleData[busObDefFieldHandletemp[i].name] = document.getElementById(busObDefFieldHandletemp[i].name).value;
                        break;
                }
            }
        }
    };
    handleData["workOrderId"] = this.props.curWorkOrderId;

    //修改工单状态 WorkOrderCommon 的字段 Status：申请延期批复	sqyqpf;待验证	wc;关闭	gb;申请延期拒绝	sqyqjj;草稿	cg;待处理	cl;申请延期	sqyq;
    //流程从 运维人员 -> 视频监控管理人员 流程状态变为 待验证; 其他情况为  待处理状态
    var statusData = {
      RecId:this.props.curWorkOrderId,
      Status:flowStatus,
      CurrentHandle:$('#editOperationHandleNextPers').val()
    };
    this.props.update_WorkOrderCommonStatusData(statusData);

    // //增加 工单处理信息 WorkOrderProcessLog
    // if($("#editOperationHandleProcess").val() != "" && $("#editOperationHandleProcess").val() != null){
    //   var processLogData = {
    //     WorkOrderId: this.props.curWorkOrderId,//对应工单ID
    //     Content:$("#editOperationHandleProcess").val(),//处理意见(处理过程)
    //     Handler:$('#editOperationHandleCurrentPers').val() //当前处理人
    //   };
    //   this.props.add_WorkOrderProcessLogData(processLogData);
    // };

    var flowData = {
        FlowAction:flowAction,
        WorkOrderId: this.props.curWorkOrderId,//对应工单ID
        LinkDesc:"",//环境描述
        FromId: localStorage.getItem("CURRENT_ROLENAME"),//当前处理人角色名
        ToId: "关闭",
        // Content:$("#editOperationHandleProcess").val(),//处理过程
        //ProcessResult:$("input[name='wo_revisitResult']:checked").val(),//未解决原因
        //DispatchTime:new Date(Date.parse($("#editOperationHandleNextDisTime").find('input').val().replace(/-/,"/"))), //派工时间
        DispatchTime:new Date(),
        // ArrivalTime:new Date(Date.parse($("#editOperationHandleResponseTime").find('input').val().replace(/-/,"/"))),//响应时间
        ArrivalTime:new Date(),
        // ResolutionState:"解决",//解决状态
        FromUser:$('#editOperationHandleCurrentPers').val(),//当前处理人
        //ToUser:$('#editOperationHandleNextPers').val(),//下级处理人
        Step:this.props.steps,
        OpIdentity:0
    };
    // this.props.add_WorkFlowLogData(flowData);
    this.props.add_WorkFlowLogDataAndHandleTemplate(flowData, handleData, this.props.workOrderTemplatesSheetForm.t_entity);
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
    // if(isCanWorkSpace){
    //   var zTree = $.fn.zTree.getZTreeObj("commonTree");
    //   var treeNodes = zTree.getNodes();
    //   var targetNode = zTree.getNodeByParam("name","工作台");
    //   // console.log(targetNode);
    //   var tid = targetNode.tId;
    //   var tIndex = zTree.getNodeIndex(targetNode);
    //   document.getElementById(tid).className = "fadeInMenu";
    //   zTree.selectNode(targetNode);
    //   this.props.onSetPreThreeNode("");
    //   this.props.onSetCurThreeNode(targetNode);
    //   that.history.pushState(null,'operationManage/myWorkSpace');
    // };
      if(isCanWorkSpace){
          this.props.setCurName("工作台");
          that.history.pushState(null,'operationManage/myWorkSpace');
      };
  },
  render:function(){
    // console.log(this.state.itoss.orderDetailData)
    var flowTypes = this.props.workFlowTypes;
    var curId = this.props.orderDetailData.WORKFLOW_ID;
    var flowName = "";
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
              运维管理-{flowName}详情
            </div>
            <div className="titleRight">
              <a className="backSpaceText" onClick={this.backtoSpace}>返回工作台</a>
              <a href="#/operationManage/myWorkSpace"><i className="fa fa-cog"></i></a>
            </div>
          </div>
          <div className="col-md-12">
            <div className="buttonInfo">
              <p>工单的主要功能：记录工单信息，故障描述。</p>
              <button id="saveEditOrderDetailFlow" onClick={this.editOrder}>保存</button>
            </div>
          </div>
        </div>
        <div className="operationButtonGroup2 oBGroup">
          <div className="titleDiv col-md-12">
            <div className="titleLeft">
              运维管理-{flowName}详情
            </div>
            <div className="titleRight">
              <a className="backSpaceText" onClick={this.backtoSpace}>返回工作台</a>
              <a href="#/operationManage/myWorkSpace"><i className="fa fa-cog"></i></a>
            </div>
          </div>
          <div className="col-md-12">
            <div className="buttonInfo">
              <p>工单详情的主要功能：根据流程将工单分配给指定处理人员。/处理表单的主要功能：工程师填写表单处理过程。</p>
              <button id="saveEditOrderHandleFlow" onClick={this.editOrderHandleFlow.bind(this, 1)}>保存</button>
              {/* <button id="saveEditOrderSendEmailHandleFlow"  onClick={this.editOrderHandleFlow.bind(this, 2)} style={{"marginLeft":"15px","backgroundColor":"#FF9933"}}>保存并发邮件</button>*/}
              <button id="closeEditOrderHandleFlow" className="marginLeft notPass" onClick={this.closeOrderHandleFlow} style={{display: 'none'}}>关闭</button>
            </div>
          </div>
        </div>
        <div className="operationButtonGroup3 oBGroup">
          <div className="titleDiv col-md-12">
            <div className="titleLeft">
              运维管理-{flowName}详情
            </div>
            <div className="titleRight">
              <a className="backSpaceText" onClick={this.backtoSpace}>返回工作台</a>
              <a href="#/operationManage/myWorkSpace"><i className="fa fa-cog"></i></a>
            </div>
          </div>
          <div className="col-md-12">
            <div className="buttonInfo">
              <p>流程图的主要功能：通过流程图查看工单处理所处阶段，以及各阶段人员处理时间与结果</p>
            </div>
          </div>
        </div>
        <div className="operationButtonGroup4 oBGroup">
          <div className="titleDiv col-md-12">
            <div className="titleLeft">
              运维管理-{flowName}详情
            </div>
            <div className="titleRight">
              <a className="backSpaceText" onClick={this.backtoSpace}>返回工作台</a>
              <a href="#/operationManage/myWorkSpace"><i className="fa fa-cog"></i></a>
            </div>
          </div>
          <div className="col-md-12">
            <div className="buttonInfo">
              <p>流程日志的主要功能：通过流程图查看工单处理所处阶段，以及各阶段人员处理时间与结果</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = operationButtons;
