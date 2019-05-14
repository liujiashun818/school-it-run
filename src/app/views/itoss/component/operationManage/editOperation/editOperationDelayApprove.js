require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import ClaimRecord from './editOperationDelayApproveRecord.js';

var delayApprove = React.createClass({
  mixins: [Navigation],
  // getStateFromFlux: function() {
  //   var flux = this.getFlux();
  //   return {
  //     itoss:flux.store("YFTOperationStore").getState()
  //   }
  // },
  componentDidMount:function(){
    var isCanUpdate = false;
    var permissions = this.props.permissions;
    for(var i=0;i<permissions.length;i++){
      var resourceType = permissions[i].resourceType;
      if(resourceType == "/operationmanage/workordermanage/workspacedetails/approval"){
        isCanUpdate = true;
        break;
      };
    } ;
    if(!isCanUpdate){
      $(".operationButtonGroup4").find(".buttonInfo").find("button").attr("disabled",true);
      $(".operationButtonGroup4").find(".buttonInfo").find("button").css('background-color',"#ddd");
    };
  },
  render:function(){
    var propMark = this.props.mark;
    // console.log("propMark-----------------",propMark);
    var mark = false;
    if(propMark!=null && propMark!=""){
      mark = propMark;
      $(".operationButtonGroup4").find(".buttonInfo").find("button").attr("disabled",true);
      $(".operationButtonGroup4").find(".buttonInfo").find("button").css('background-color',"#ddd");
    };
    return (
      <div className="operationDelayDiv">
        <div className="col-md-12">
          <table>
            <tbody>
              <tr>
                <td>申请单号</td>
                <td><input type="text" className="form-control" disabled id="delayApproveIndex"/></td>
                <td>工单号</td>
                <td><input type="text" className="form-control" disabled id="delayApproveNumber"/></td>
                <td>延期状态</td>
                <td><input type="text" className="form-control" disabled id="delayApproveStatus"/></td>
              </tr>
              <tr>
                <td>申请人</td>
                <td><input type="text" className="form-control" disabled id="delayApproveMan"/></td>
                <td>申请人电话</td>
                <td><input type="text" className="form-control" disabled id="delayApproveTelephone"/></td>
                <td>延长时间</td>
                <td><input type="text" className="form-control" disabled id="delayApproveTime"/></td>
              </tr>
              <tr>
                <td style={{"borderRight":"none","height":"30px"}}>申请原因</td>
                <td colSpan="5" style={{"borderLeft":"none"}}>&nbsp;</td>
              </tr>
              <tr>
                <td colSpan="6"><textarea rows="4" className="form-control" disabled id="delayApproveReason"></textarea></td>
              </tr>
              <tr>
                <td style={{"borderRight":"none","height":"30px"}}>审批意见</td>
                <td colSpan="5" style={{"borderLeft":"none"}}>&nbsp;</td>
              </tr>
              <tr>
                <td colSpan="6"><textarea rows="4" className="form-control" id="delayApproveOpinion" disabled={mark}></textarea></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-12">
          <ClaimRecord
            orderDetailData={this.props.orderDetailData}
            setCurDelayId={this.props.setCurDelayId}
          />
        </div>
      </div>
    );
  }
});

module.exports = delayApprove;
