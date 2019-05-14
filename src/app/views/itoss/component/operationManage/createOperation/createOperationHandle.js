/**
* 工单管理-新建工单-处理表单
*/
require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var History = require('react-router').History;

var createOperationHandle = React.createClass({
  mixins: [History],
  componentDidMount: function() {
    //清除当前流转人员数据
    //this.getFlux().actions.YFTOperationFlowActions.set_CurrentNextPerson("");
    this.props.setCurrentNextPerson('');
    //清除 工单 数据
    //this.getFlux().actions.YFTOperationActions.init_detailData(1);
    this.props.init_detailData(1);
  },
  componentDidUpdate: function() {
    $("#createOperationHandleCurrentPers").val(localStorage.getItem("USERNAME"));
  },
  _handleOnClickSelect: function(row, element) {
      //清除当前流转人员数据
      //this.getFlux().actions.YFTOperationFlowActions.set_CurrentNextPerson("");
      this.props.setCurrentNextPerson('');
      var filter = [{key:"FROM_ID",value:localStorage.getItem("CURRENT_ROLENAME")},
                    {key:"WORKFLOW_ID",value:this.props.curWorkFlowId},
                    {key:"GROUP_ID",value:localStorage.getItem("GROUP_ID")}];
      //this.getFlux().actions.YFTOperationFlowActions.get_WorkOrderNextPersonData(filter);
      this.props.get_WorkOrderNextPersonData(filter);
      $('#operationPersonnelTableModal').modal('show')
  },
  render:function(){
    var NextPers="";
    var currentNextPerson = this.props.currentNextPerson;
    if(currentNextPerson != null && currentNextPerson != ""){
      NextPers = currentNextPerson[0].name;
    };
    return (
      <div className="operationHandleDiv operationFormDiv">
        <div className="operationHandleTable2">
          <table>
            <tbody>
              <tr>
                <th>上级处理人</th>
                <td><input type="text" className="form-control" id="createOperationHandlePreviousPers" disabled /></td>
                <th>当前处理人</th>
                <td><input type="text" className="form-control" id="createOperationHandleCurrentPers" disabled /></td>
              </tr>
              <tr>
                <th>响应时间</th>
                <td><ReactWidgets.DateTimePicker format={"yyyy-MM-dd HH:mm:ss"} id="createOperationHandleResponseTime" disabled /></td>
                <th>派工时间</th>
                <td><ReactWidgets.DateTimePicker format={"yyyy-MM-dd HH:mm:ss"} id="createOperationHandleDisTime" defaultValue={new Date()} disabled /></td>
              </tr>
              <tr>
                <th>上级处理意见</th>
                <td colSpan="5"><textarea rows="4" className="form-control" id="createOperationHandlePreviousOpinion" disabled></textarea></td>
              </tr>
              <tr>
                <th>处理过程</th>
                <td colSpan="5"><textarea rows="6" className="form-control" id="createOperationHandleProcess"></textarea></td>
              </tr>
            </tbody>
          </table>
          <div className="operationHandleButton">
            <button className="personFlowButton" data-toggle="modal" onClick={this._handleOnClickSelect}>人员流转</button>
            <table>
              <tbody>
                <tr>
                  <th>下级处理人</th>
                  <td><input type="text" className="form-control" id="createOperationHandleNextPers" value={NextPers} disabled/></td>
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
