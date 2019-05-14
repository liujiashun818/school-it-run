require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var History = require('react-router').History;
var DateChange = require('../../../../../utils/dateChange.js');

var template_id='';
var editOperationHandle = React.createClass({
  mixins: [History],
  getInitialState: function(){
      return {
          workorder_responsetime:""
      }
  },
  componentDidMount: function() {
    template_id='';
    //清除当前流转人员数据
    this.props.setCurrentNextPerson("");
    if (this.isMounted()) {
      // if(this.props.workOrderTemplatesSheetForm){
      //   //ReactDOM.render(<OperationFlowPic/>,document.getElementById('OperationFlowPic'));
      //   var handlelDiv = document.getElementById('editWorkOrderModelHandle');
      //   handlelDiv.innerHTML = this.props.workOrderTemplatesSheetForm.t_content;
      // };
      // var workFlowDetailCurrent = this.props.workFlowDetailCurrent;
      // if(workFlowDetailCurrent.length > 0){
      //   for (var i = 0; i < workFlowDetailCurrent.length; i++) {
      //      workFlowDetailCurrent[i]
      //   }
      // }
    };
  },
  shouldComponentUpdate: function(nextProps, nextState){
    if (nextProps.workOrderTemplatesSheetForm !== this.props.workOrderTemplatesSheetForm) {
      if(nextProps.workOrderTemplatesSheetForm){
        //ReactDOM.render(<OperationFlowPic/>,document.getElementById('OperationFlowPic'));
        var handlelDiv = document.getElementById('editWorkOrderModelHandle');
        if(handlelDiv){
            handlelDiv.innerHTML = nextProps.workOrderTemplatesSheetForm.t_content;
            this.props.getBusObDefFieldsHandle(nextProps.workOrderTemplatesSheetForm.t_entity);
        }
      };
    };
    return true;
  },
  _handleOnClickSelect: function(row, element) {
      //清除当前流转人员数据
      this.props.setCurrentNextPerson("");
      var curWorkFlowId = "";
      var grouid = "";
      if(this.props.orderDetailData != ""){
        if(this.props.orderDetailData.WORKFLOW_ID != ""){
          curWorkFlowId = this.props.orderDetailData.WORKFLOW_ID;
          grouid = this.props.orderDetailData.GROUP_ID;
        };
      };
      var filter = [{key:"FROM_ID",value:localStorage.getItem("CURRENT_ROLENAME")},{key:"WORKFLOW_ID",value:curWorkFlowId},{key:"GROUP_ID",value:grouid}];
      this.props.get_WorkOrderNextPersonData(filter);
      $('#operationPersonnelTableModal').modal('show')
  },
  render:function(){
    var NextPers="";
    var currentPers = localStorage.getItem("USERNAME");
    var currentNextPerson = this.props.currentNextPerson;
    if(currentNextPerson != null && currentNextPerson != ""){
      NextPers = currentNextPerson[0].name;
    };
    $("#editOperationHandleNextPers").val(NextPers);
    var fromuser = "";//上级处理人
    var dispatchTime = null;//上级派工时间
    var arrivalTime =  null;//工单处理人的响应时间
    var mydispatchTime = new Date();//自己向下流转时填写的派工时间
    var workFlowDetailCurrent = this.props.workFlowDetailCurrent;
    var workFlowLogData = this.props.workFlowLogData;
    var WorkOrderProcessLogData = this.props.workOrderProcessLogData;
    var Flag = false;   //是否是维护人员(false 不是，true 是：需要修改工单响应时间)
    if(workFlowLogData!=null && workFlowLogData!="" && workFlowLogData.length > 0){
       if(!template_id){
          if(workFlowDetailCurrent.length > 0){
            //获取需要填充的处理表单内容
            for (var i = 0; i < workFlowDetailCurrent.length; i++) {
               if(workFlowDetailCurrent[i].FromId == workFlowLogData[0].FromId && workFlowDetailCurrent[i].ToId == workFlowLogData[0].ToId){
                  var param ={
                     workFlowId:'',
                     templdateId:workFlowDetailCurrent[i].template_id,
                     workWorderId:this.props.curWorkOrderId
                 };
                 template_id = workFlowDetailCurrent[i].template_id;
                 this.props.get_workOrderTemplatesSheetFromId(param);
               }
            }
          };
       };
       if(workFlowLogData[0].ToUser == localStorage.getItem("USERNAME")) {
          //是当前处理人自己打开的处理表单
          fromuser = workFlowLogData[0].FromUser; //上级处理人
          dispatchTime = workFlowLogData[0].DispatchTime; //上级派工时间
          dispatchTime = new Date(parseInt(dispatchTime.substring(6, (dispatchTime.length - 2))));

          $('#openOperPersTableModal').attr("disabled",false);//打开选择流转人员页
          $('#saveEditOrderHandleFlow').attr("disabled",false);//保存处理表单数据按钮
          //$('#editOperationHandleProcess').attr("disabled",false);//将input元素设置为
          //控制是否显示关闭 按钮
          var FlowActionListData = this.props.flowActionListData;
          var closeflow = false;
          if(FlowActionListData.length > 0){
            for(var i=0;i<FlowActionListData.length;i++){
              //判断当前这个人是否有关闭流程可以走
              if(FlowActionListData[i].FROM_ID == localStorage.getItem("CURRENT_ROLENAME") && FlowActionListData[i].STATUS == "gb"){
                closeflow = true;
                break;
              };
            };
          };
          if(document.getElementById('closeEditOrderHandleFlow') != null){
            if(closeflow){
              document.getElementById('closeEditOrderHandleFlow').style.display = 'inline-block';
            }else{
              document.getElementById('closeEditOrderHandleFlow').style.display = 'none';
            };
          };

          $("#FromUser").val(fromuser);//上级处理人
          $("#CurrentHandle").val(localStorage.getItem("USERNAME"));//当前处理人
          //$("#DispatchTime").find('input').val(dispatchTime);//上级派工时间
          $("#DispatchTime").val(DateChange.DatetoStr(dispatchTime));
          arrivalTime =  new Date();//工单处理人的响应时间
          //$("#ArrivalTime").find('input').val(arrivalTime);//工单处理人的响应时间
          $("#ArrivalTime").val(DateChange.DatetoStr(arrivalTime));
       }
       else {
        //处理表单不是当前处理打开的
        // dispatchTime = null;//上级派工时间
        // arrivalTime =  null;//响应时间
        if(workFlowLogData[0].DispatchTime != "/Date(-28800000)/"){
          dispatchTime = workFlowLogData[0].DispatchTime;//派工时间
          dispatchTime = new Date(parseInt(dispatchTime.substring(6, (dispatchTime.length - 2))));
        };
        currentPers = workFlowLogData[0].ToUser;//当前处理人
        fromuser = workFlowLogData[0].FromUser;//上级处理人
        $("#CurrentHandle").val(currentPers);//当前处理人
        $("#FromUser").val(fromuser);//上级处理人
        $("#DispatchTime").val(DateChange.DatetoStr(dispatchTime));
        $('#openOperPersTableModal').attr("disabled",true);//打开选择流转人员页
        $("#openOperPersTableModal").css('background-color',"#ddd");
        $("#saveEditOrderHandleFlow").css('background-color',"#ddd");
        $('#saveEditOrderHandleFlow').attr("disabled",true);//保存处理表单数据按钮
        $('#saveEditOrderDetailFlow').attr("disabled",true);//保存表单详情数据按钮
        $("#saveEditOrderDetailFlow").css('background-color',"#ddd");
        if(document.getElementById('closeEditOrderHandleFlow') != null){
          //控制是否显示关闭 按钮
          document.getElementById('closeEditOrderHandleFlow').style.display = 'none';
        }
      }
    }
    else {
      //为草稿工单
      arrivalTime =  null;//响应时间
      dispatchTime = new Date();//派工时间
      $("#CurrentHandle").val(localStorage.getItem("USERNAME"));//当前处理人
    };
    return (
      <div className="operationHandleDiv operationFormDiv">
        <div className="operationHandleTable2">
          <div id="editWorkOrderModelHandle">

          </div>
          <div className="operationHandleButton">
            <button className="personFlowButton" data-toggle="modal" id="openOperPersTableModal" onClick={this._handleOnClickSelect}>人员流转</button>
            <table style={{width:"50%"}}>
              <tbody>
                <tr>
                  <th>下级处理人</th>
                  <td><input type="text" className="form-control" id="editOperationHandleNextPers" disabled/></td>
                  <th>派工时间</th>
                  <td><ReactWidgets.DateTimePicker format={"yyyy-MM-dd HH:mm:ss"} id="editDispatchTime" value={mydispatchTime} disabled/></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = editOperationHandle;
