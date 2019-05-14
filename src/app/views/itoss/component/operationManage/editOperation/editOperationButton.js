require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var DateChange = require('../../../../../utils/dateChange.js');

var operationButtons = React.createClass({
  mixins: [History],
  // getStateFromFlux: function() {
  //   var flux = this.getFlux();
  //   return {
  //     itoss:flux.store("YFTOperationStore").getState(),
  //     flow:flux.store("YFTOperationFlowStore").getState()
  //   }
  // },
  componentDidMount:function(){
    $(".oBGroup").hide();
    $(".operationButtonGroup1").show();
  },
  editOrder:function(){
    var title = $("#editOperationOrderTitle").val();
    if(title == null || title ==""){
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "请填写工单主题。"
        $('#publicMessageModal').modal('show');
      },100);
      return false;
    };
    var explain = $("#editOperationOrderExplain").val();
    var workOrderId = this.props.curWorkOrderId;
    var faultLarge = this.props.faultTypeId;
    var faultSmall = this.props.faultSubTypeId;
    var faultLevel = this.props.flowLevel;
    var serviceId = this.props.serviceId;
    var data = {
      Subject:title,
      WorkOrderDesc:explain,
      RecId:workOrderId
    };
    if(faultLarge!=""&&faultLarge!=null&&faultSmall!=""&&faultSmall!=null){
      data.FaultLarge = faultLarge
      data.FaultSmall = faultSmall
    };
    if(faultLevel!=""&&faultLevel!=null){
      data.FaultLevelId = faultLevel
    };
    if(serviceId!=""&&serviceId!=null){
      data.SLAId = serviceId
    };
    // console.log(data);
    this.props.save_updateOrder(data);
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
    console.log("flowStatus:"+flowStatus);
    if(flowStatus == ""){
      //alert("没有取到向下流转工单状态，不能向下流转工单。");
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "没有取到向下流转工单状态，不能向下流转工单。"
        $('#publicMessageModal').modal('show');
      },100);
      return;
    };

    var iorderOver = 0;
    //工单解决时间
    if($("#editOperationOrderOver").val() != "" && $("#editOperationOrderOver").val() != null){
       iorderOver = parseInt($("#editOperationOrderOver").val());
    };
    var dispatchTime = new Date(); //派工时间
    var yjwcTime = DateChange.addHoursRDate(new Date(),iorderOver);   //预计完成时间

    //增加 工单处理信息 WorkOrderProcessLog
    if($("#editOperationHandleProcess").val() != "" && $("#editOperationHandleProcess").val() != null){
      var processLogData = {
        WorkOrderId: this.props.curWorkOrderId,//对应工单ID
        Content:$("#editOperationHandleProcess").val(),//处理意见(处理过程)
        Handler:$('#editOperationHandleCurrentPers').val() //当前处理人
      };
      this.props.add_WorkOrderProcessLogData(processLogData);
    };
    var resolutionState = "未解决";//解决状态
    //修改工单状态 WorkOrderCommon 的字段 Status：申请延期批复	sqyqpf;fp 待分配 待验证	wc;关闭	gb;申请延期拒绝	sqyqjj;草稿	cg;待处理	cl;申请延期	sqyq;待分配 fp;
    if(this.props.curWorkOrderStatus == "cl" || this.props.curWorkOrderStatus == "sqyqpf" || this.props.curWorkOrderStatus == "sqyqjj" ){
      //根据当前工单状态判断是否要计算 “解决时长” Workload (string)
      var sworkload ="";  //解决时长
      // var sSLA_TITLE = "";//SLA名称
      // var sRESPONSE_TIME ="";//响应时间
      // var sRESOLVE_TIME ="";//解决时间
      // var sEXTENDED_DEADLINE ="";//延期截止日期
      var curdate = new Date();
      var CountDownMS= 0; //得出时间毫秒差
      var CountDownH = 0;//得出时间小时差
      var disTime = $("#editOperationHandleDisTime").find('input').val();//上级派工时间
      disTime = new Date(Date.parse(disTime.replace(/-/,"/")));
      var oldsworkload = $("#editOperationDetailWorkload").val();  //以前计算过的解决时长
      var timeOutNumber = 0; //超时时长
      CountDownMS = curdate.getTime() - disTime.getTime();//得出时间毫秒差
      if(CountDownMS > 0){
        CountDownH = Math.floor(CountDownMS / (1000 * 60 * 60));//得出两个日期之间 时间小时差
        //判断余前两位是否大于 0 ，大于0时，CountDownH 多增加一个小时
        var CountHtemp = CountDownMS / (1000 * 60 * 60);
        var countHtempstr = CountHtemp.toString();
        var ixof = countHtempstr.indexOf(".");
        if(ixof > 0){
          var aa = countHtempstr.substr((ixof + 1), 2);
          var aai = parseInt(aa);
          if(aai > 0){
            CountDownH++;
          }
        };

        if(oldsworkload != ""){
          var sc = parseInt(oldsworkload);
          CountDownH = CountDownH + sc;
        }else{
          if(CountDownH <= 0){
            CountDownH = 1;
          };
        };
        sworkload =String(CountDownH);
      };
      if(this.props.orderDetailData != ""){
        var timenum = 0
        if(this.props.orderDetailData.RESOLVE_TIME_NUM != ""){
          timenum = parseInt(this.props.orderDetailData.RESOLVE_TIME_NUM);
        };
        if(timenum > 0){
          if((CountDownH - timenum) > 0){
            timeOutNumber = CountDownH - timenum;
          };
        };
      };
      //CompleteTime： 维护人员工单完成时间; TimeOutNumber 超时时长
      var statusData = {
        RecId:this.props.curWorkOrderId,
        Status:flowStatus,
        CurrentHandle:$('#editOperationHandleNextPers').val(),
        Workload:sworkload,
        TimeOutNumber:timeOutNumber,
        CompleteTime:curdate
      };
      this.props.update_WorkOrderCommonStatusData(statusData);
    }else{
      if(flowStatus == "cl"){
        if(this.props.orderDetailData.DISPATCH_NUM == 1){
          dispatchTime = DateChange.strToDate(this.props.orderDetailData.DISPATCH_TIME);
          //DISPATCH_NUM == 1 填了派工时间。
          var statusData = {
            RecId:this.props.curWorkOrderId,
            Status:flowStatus,
            CurrentHandle:$('#editOperationHandleNextPers').val()
          };
          this.props.update_WorkOrderCommonStatusData(statusData);
        }else{
          //DispatchNumber 用于标志是否填了，派工时间。
          var statusData = {
            RecId:this.props.curWorkOrderId,
            Status:flowStatus,
            CurrentHandle:$('#editOperationHandleNextPers').val(),
            ResponseTime:dispatchTime,
            AppointmentTime:yjwcTime,
            DispatchNumber:1
          };
          this.props.update_WorkOrderCommonStatusData(statusData);
        }
      }else{
        var statusData = {
          RecId:this.props.curWorkOrderId,
          Status:flowStatus,
          CurrentHandle:$('#editOperationHandleNextPers').val()
        };
        this.props.update_WorkOrderCommonStatusData(statusData);
      }
    };
    //响应时间
    var arrivalTime = $("#editOperationHandleResponseTime").find('input').val();
    if(arrivalTime == ""){
      arrivalTime = new Date();
    }else{
      arrivalTime = new Date(Date.parse(arrivalTime.replace(/-/,"/")));
    };
    var HandleProcess = "";
    if($("#editOperationHandleProcess").val()){
      HandleProcess = $("#editOperationHandleProcess").val();
    };
    var flowData = {
        FlowAction:flowAction,
        WorkOrderId: this.props.curWorkOrderId,//对应工单ID
        LinkDesc:"",//环境描述
        FromId: localStorage.getItem("CURRENT_ROLENAME"),//当前处理人角色名
        ToId: NextRoleName,//下级处理人角色名
        Content:HandleProcess,//处理意见
        //ProcessResult:$("input[name='wo_revisitResult']:checked").val(),//未解决原因
        DispatchTime:dispatchTime, //派工时间
        ArrivalTime:arrivalTime,//响应时间
        ResolutionState:resolutionState,//解决状态
        FromUser:$('#editOperationHandleCurrentPers').val(),//当前处理人
        ToUser:$('#editOperationHandleNextPers').val(),//下级处理人
        Step:this.props.steps,
        OpIdentity:0
    };
    console.log(flowData);
    this.props.add_WorkFlowLogData(flowData);
    //向当前工单下一个流转人员发送邮件
    if(key == 2){
      //filters 格试 [{key:"EMAIL",value:""},{key:"SUBJECT",value:""},{key:"CONTENT",value:""}];
      var contenttemp = "",ordertitle="";
      if($("#editOperationOrderExplain").val()){
        contenttemp = $("#editOperationOrderExplain").val();
      };
      if($("#editOperationOrderTitle").val()){
        ordertitle = $("#editOperationOrderTitle").val();
      };
      if($("#editOperationHandleProcess").val()){
        contenttemp = contenttemp + "\n"+"上级处理意见："+ HandleProcess;
      };
      if(currentNextPerson[0].email){
        var emaildata = [{key:"EMAIL",value:currentNextPerson[0].email},
                      {key:"SUBJECT",value:ordertitle},
                      {key:"CONTENT",value:contenttemp}];
        this.props.set_WorkFlowSendEmail(emaildata);
      }else{
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示";
          document.getElementById('publicMessageModalcontent').innerHTML = "邮箱地址为空,不能发送邮件。"
          $('#publicMessageModal').modal('show');
        },100);
      };
    };
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
        if(FlowActionListData[i].FROM_ID == localStorage.getItem("CURRENT_ROLENAME") && FlowActionListData[i].TO_ID == "关闭"){
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
    //修改工单状态 WorkOrderCommon 的字段 Status：申请延期批复	sqyqpf;待验证	wc;关闭	gb;申请延期拒绝	sqyqjj;草稿	cg;待处理	cl;申请延期	sqyq;
    //流程从 运维人员 -> 视频监控管理人员 流程状态变为 待验证; 其他情况为  待处理状态
    var statusData = {
      RecId:this.props.curWorkOrderId,
      Status:flowStatus,
      CurrentHandle:$('#editOperationHandleNextPers').val()
    };
    this.props.update_WorkOrderCommonStatusData(statusData);

    //增加 工单处理信息 WorkOrderProcessLog
    if($("#editOperationHandleProcess").val() != "" && $("#editOperationHandleProcess").val() != null){
      var processLogData = {
        WorkOrderId: this.props.curWorkOrderId,//对应工单ID
        Content:$("#editOperationHandleProcess").val(),//处理意见(处理过程)
        Handler:$('#editOperationHandleCurrentPers').val() //当前处理人
      };
      this.props.add_WorkOrderProcessLogData(processLogData);
    };

    var flowData = {
        FlowAction:flowAction,
        WorkOrderId: this.props.curWorkOrderId,//对应工单ID
        LinkDesc:"",//环境描述
        FromId: localStorage.getItem("CURRENT_ROLENAME"),//当前处理人角色名
        ToId: "关闭",
        Content:$("#editOperationHandleProcess").val(),//处理过程
        //ProcessResult:$("input[name='wo_revisitResult']:checked").val(),//未解决原因
        //DispatchTime:new Date(Date.parse($("#editOperationHandleNextDisTime").find('input').val().replace(/-/,"/"))), //派工时间

        // DispatchTime:new Date(), //派工时间
        // ArrivalTime:new Date(Date.parse($("#editOperationHandleResponseTime").find('input').val().replace(/-/,"/"))),//响应时间
        ResolutionState:"解决",//解决状态
        FromUser:$('#editOperationHandleCurrentPers').val(),//当前处理人
        //ToUser:$('#editOperationHandleNextPers').val(),//下级处理人
        Step:this.props.steps,
        OpIdentity:0
    };
    this.props.add_WorkFlowLogData(flowData);
  },
  onCreateDelay:function(){
    var claimTime = $("#delayClaimTime").val();
    if(claimTime=="" || claimTime==null){
      //alert("请填写延期时间");
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "请填写延期时间。"
        $('#publicMessageModal').modal('show');
      },100);
      return false;
    };
    var re = /^[1-9]+[0-9]*]*$/;
    if(!re.test(claimTime)){
      //alert("延长时间请输入正整数");
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "延长时间请输入正整数。"
        $('#publicMessageModal').modal('show');
      },100);
      return false;
    };
    var claimReason = $("#delayClaimReason").val();
    var claimOpinion = $("#delayClaimOpinion").val();
    var claimIndex = $("#delayClaimIndex").val();
    var workOrderId = this.props.curWorkOrderId;
    var currentApprover = "";//当前处理人
    if(this.props.currentNextPerson){
      currentApprover = this.props.currentNextPerson[0].name;
    }else{
      //alert("请选择审核人。");
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "请选择审核人。"
        $('#publicMessageModal').modal('show');
      },100);
      return;
    };
    var data = {
      Status:"申请延期",
      Reason:claimReason,
      Opinion:claimOpinion,
      SerialNumber:claimIndex,
      ExtendTime:claimTime,
      Approver:currentApprover,
      WorkOrderId:workOrderId
    };
    var data2 = {
      Status:"sqyq",
      RecId:workOrderId,
      CurrentHandle:currentApprover
    };
    this.props.save_createDelay(data);
    this.props.save_updateOrder(data2);
    // this.history.pushState(null,'operationManage/myWorkSpace');
  },
  onNotCreate:function(){
    //alert("您有延期申请尚未审批，无法再次提交");
    setTimeout(function(){
      document.getElementById('publicMessageModelTitle').innerHTML = "提示";
      document.getElementById('publicMessageModalcontent').innerHTML = "您有延期申请尚未审批，无法再次提交。"
      $('#publicMessageModal').modal('show');
    },100);
  },
  delayPass:function(){
    //审批通过
    var that = this;
    var id = this.props.curDelayId;
    var claimOpinion = $("#delayApproveOpinion").val();
    var workOrderId = this.props.curWorkOrderId;
    if(id!=null&&id!=""){
      var state = $("#delayApproveStatus").val();
      if(state=="申请延期"){
        var data = {
          RecId:id,
          Opinion:claimOpinion,
          Status:"申请延期批复",
          ApproverTime:new Date()
        };
        // console.log(data);
        //CurrentHandle 将这个值回填成转流日志中当前处理人
        var currentHandle ="";
        var workFlowLogData = this.props.workFlowLogData;
        if(workFlowLogData.length > 0){
          currentHandle = workFlowLogData[0].ToUser;
        };

        var iorderOver = 0;
        //申请延期 小时数
        if($("#delayApproveTime").val() != "" && $("#delayApproveTime").val() != null){
           iorderOver = parseInt($("#delayApproveTime").val());
        };
        var oldyjwcTime = new Date(); //预计完成时间
        if(this.props.orderDetailData != ""){
          oldyjwcTime = DateChange.strToDate(this.props.orderDetailData.APPOINTMENTTIME);
        };
        var yjwcTime = DateChange.addHoursRDate(oldyjwcTime,iorderOver);   //预计完成时间

        var data2 = {
          Status:"sqyqpf",
          RecId:workOrderId,
          CurrentHandle:currentHandle,
          AppointmentTime:yjwcTime
        };
        that.props.save_updateDelay(data);
        that.props.save_updateOrder(data2);
      }else{
        //alert("请选择一条待审批记录进行审批");
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示";
          document.getElementById('publicMessageModalcontent').innerHTML = "请选择一条待审批记录进行审批。"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
    }else{
      //alert("请选择一条记录进行审批");
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "请选择一条记录进行审批。"
        $('#publicMessageModal').modal('show');
      },100);
      return false;
    };
    // this.history.pushState(null,'operationManage/myWorkSpace');
  },
  delayNotPass:function(){
    //审批不通过
    var that = this;
    var id = this.props.curDelayId;
    var claimOpinion = $("#delayApproveOpinion").val();
    var workOrderId = this.props.curWorkOrderId;
    if(id!=null&&id!=""){
      var state = $("#delayApproveStatus").val();
      if(state=="申请延期"){
        var data = {
          RecId:id,
          Opinion:claimOpinion,
          Status:"申请延期拒绝",
          ApproverTime:new Date()
        };
        // console.log(data);
        //CurrentHandle 将这个值回填成转流日志中当前处理人
        var currentHandle ="";
        var workFlowLogData = this.props.workFlowLogData;
        if(workFlowLogData.length > 0){
          currentHandle = workFlowLogData[0].ToUser;
        };
        var data2 = {
          Status:"sqyqjj",
          RecId:workOrderId,
          CurrentHandle:currentHandle
        };
        that.props.save_updateDelay(data);
        that.props.save_updateOrder(data2);
      }else{
        //alert("请选择一条待审批记录进行审批");
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示";
          document.getElementById('publicMessageModalcontent').innerHTML = "请选择一条待审批记录进行审批。"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
    }else{
      //alert("请选择一条记录进行审批");
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "请选择一条记录进行审批。"
        $('#publicMessageModal').modal('show');
      },100);
      return false;
    };
    //this.history.pushState(null,'operationManage/myWorkSpace');
  },
  onSaveSatisfy:function(){
    var that = this;
    var state = this.props.orderDetailData.STATUS;
    if(state=="关闭"){
      var workOrderId = that.props.curWorkOrderId;
      var suggest = $("#satisfySuggest").val();
      var pointer = parseInt($("input[name='satisfyRadio']:checked").val());
      var data = {
        WorkOrderId: workOrderId,
        ServiceSuggestions: suggest,
        ServicesAging: pointer
      };
      that.props.save_satisfyScore(data);
      // console.log(data);
    }else{
      //alert("您的工单还未完成，无法评价");
      setTimeout(function(){
        document.getElementById('publicMessageModelTitle').innerHTML = "提示";
        document.getElementById('publicMessageModalcontent').innerHTML = "您的工单还未完成，无法评价。"
        $('#publicMessageModal').modal('show');
      },100);
    };
    // console.log(this.state.itoss);
    //this.history.pushState(null,'operationManage/myWorkSpace');
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
    var orderDetail = this.props.orderDetailData;
    var mark = false;
    if(orderDetail!=null && orderDetail!=""){
      var extensions = orderDetail.EXTENSIONS;
      extensions = eval(extensions);
      for(var i=0;i<extensions.length;i++){
        var status = extensions[i].status;
        if(status=="申请延期"){
          mark = true;
          break;
        };
      };
    };
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
              <p>新建工单的主要功能：记录工单信息，故障描述，工单对应服务级别协议。</p>
              <button onClick={this.editOrder}>保存</button>
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
              <button id="saveEditOrderSendEmailHandleFlow"  onClick={this.editOrderHandleFlow.bind(this, 2)} style={{"marginLeft":"15px","backgroundColor":"#FF9933"}}>保存并发邮件</button>
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
              <p>延期申请的主要功能：工单处理中遇到不可抗拒因素时延长工单处理时间。</p>
              <button onClick={mark?this.onNotCreate:this.onCreateDelay}>提交</button>
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
              <p>延期审批的主要功能：负责人对延期申请审批，不通过需给出审批意见。</p>
              <button onClick={this.delayPass}>审批通过</button>
              <button className="marginLeft notPass" onClick={this.delayNotPass}>审批不通过</button>
            </div>
          </div>
        </div>
        <div className="operationButtonGroup5 oBGroup">
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
        <div className="operationButtonGroup6 oBGroup">
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
        <div className="operationButtonGroup7 oBGroup">
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
              <p>满意度调查的主要功能：工单处理完成后对客户进行回访。</p>
              <button onClick={this.onSaveSatisfy}>保存</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = operationButtons;
