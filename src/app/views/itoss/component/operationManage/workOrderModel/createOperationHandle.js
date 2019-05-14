/**
* 工单管理-新建工单-处理表单
*/
require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var History = require('react-router').History;

Date.prototype.Format = function(fmt)
{
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

var createOperationHandle = React.createClass({
  mixins: [History],
  componentDidMount: function() {
    //清除当前流转人员数据
    this.props.setCurrentNextPerson('');
    //清除 工单 数据
    this.props.init_detailData(1);
    if (this.isMounted()) {
    //   $("#CurrentHandle").val(localStorage.getItem("USERNAME"));//当前处理人
      // if(this.props.workOrderTemplatesSheetForm){
      //   //ReactDOM.render(<OperationFlowPic/>,document.getElementById('OperationFlowPic'));
      //   var handlelDiv = document.getElementById('createWorkOrderModelHandle');
      //   handlelDiv.innerHTML = this.props.workOrderTemplatesSheetForm.t_content;
      //   this.props.getBusObDefFieldsHandle(this.props.workOrderTemplatesSheetForm.t_entity);
      // };
    };
  },
  shouldComponentUpdate: function(nextProps, nextState){
    if (nextProps.workOrderTemplatesSheetForm !== this.props.workOrderTemplatesSheetForm) {
      if(nextProps.workOrderTemplatesSheetForm){
        //ReactDOM.render(<OperationFlowPic/>,document.getElementById('OperationFlowPic'));
        var handlelDiv = document.getElementById('createWorkOrderModelHandle');
        if(handlelDiv){
            handlelDiv.innerHTML = nextProps.workOrderTemplatesSheetForm.t_content;
            this.props.getBusObDefFieldsHandle(nextProps.workOrderTemplatesSheetForm.t_entity);
            $("#CurrentHandle").val(localStorage.getItem("USERNAME"));//当前处理人
            $("#ArrivalTime").val((new Date()).Format("yyyy-MM-dd hh:mm:ss"));//响应时间
            $("#DispatchTime").val((new Date()).Format("yyyy-MM-dd hh:mm:ss"));//响应时间
        }
      };
    };
    return true;
  },
  componentDidUpdate: function() {

  },
  _handleOnClickSelect: function(row, element) {
      //清除当前流转人员数据
      this.props.setCurrentNextPerson('');
      var filter = [{key:"FROM_ID",value:localStorage.getItem("CURRENT_ROLENAME")},
                    {key:"WORKFLOW_ID",value:this.props.curWorkFlowId},
                    {key:"GROUP_ID",value:localStorage.getItem("GROUP_ID")}];
      this.props.get_WorkOrderNextPersonData(filter);
      $('#operationPersonnelTableModal').modal('show')
  },
  render:function(){
    var NextPers="";
    var currentNextPerson = this.props.currentNextPerson;
    if(currentNextPerson != null && currentNextPerson != ""){
      NextPers = currentNextPerson[0].name;
    };
    var mydispatchTime = new Date();//自己向下流转时填写的派工时间

    return (
      <div className="operationHandleDiv operationFormDiv">
        <div className="operationHandleTable2">
          <div id="createWorkOrderModelHandle">

          </div>
          <div className="operationHandleButton">
            <button className="personFlowButton" data-toggle="modal" onClick={this._handleOnClickSelect}>人员流转</button>
            <table style={{width:"50%"}}>
              <tbody>
                <tr>
                  <th>下级处理人</th>
                  <td><input type="text" className="form-control" id="createOperationHandleNextPers" value={NextPers} disabled/></td>
                  <th>派工时间</th>
                  <td><ReactWidgets.DateTimePicker format={"yyyy-MM-dd HH:mm:ss"} id="createDispatchTime" value={mydispatchTime} disabled /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = createOperationHandle;
