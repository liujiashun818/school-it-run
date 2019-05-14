require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import ClaimRecord from './editOperationDelayClaimRecord.js';

var delayClaim = React.createClass({
  mixins: [Navigation],
  // getStateFromFlux: function() {
  //   var flux = this.getFlux();
  //   return {
  //     itoss:flux.store("YFTOperationStore").getState(),
  //     login:flux.store("LoginPageStore").getState()
  //   }
  // },
  componentDidMount:function(){
    var param = [{key:"TABLENAME",value:"ExtensionRequest"}];
    this.props.get_delaySerialNum(param);
    var isCanUpdate = false;
    var permissions = this.props.permissions;
    for(var i=0;i<permissions.length;i++){
      var resourceType = permissions[i].resourceType;
      if(resourceType == "/operationmanage/workordermanage/workspacedetails/extension"){
        isCanUpdate = true;
        break;
      };
    } ;
    if(!isCanUpdate){
      $(".operationButtonGroup3").find(".buttonInfo").find("button").attr("disabled",true);
      $(".operationButtonGroup3").find(".buttonInfo").find("button").css('background-color',"#ddd");
    };
  },
  render:function(){
    var propMark = this.props.mark;
    var mark = false;
    if(propMark!=null && propMark!=""){
      mark = propMark;
      $(".operationButtonGroup3").find(".buttonInfo").find("button").attr("disabled",true);
      $(".operationButtonGroup3").find(".buttonInfo").find("button").css('background-color',"#ddd");
    };
    var userName = localStorage.getItem("localUserName");
    var userPhone = localStorage.getItem("PHONE");
    return (
      <div className="operationDelayDiv operationFormDiv">
        <div className="col-md-12">
          <table>
            <tbody>
              <tr>
                <th>申请单号</th>
                <td><input type="text" className="form-control" id="delayClaimIndex" value={this.props.delayIndex} disabled/></td>
                <th>工单号</th>
                <td><input type="text" className="form-control" defaultValue={this.props.orderDetailData.WORKORDERNUM} disabled/></td>
                <th>延期状态</th>
                <td><input type="text" className="form-control" defaultValue="提交" disabled/></td>
              </tr>
              <tr>
                <th>申请人</th>
                <td><input type="text" className="form-control" defaultValue={userName} disabled/></td>
                <th>申请人电话</th>
                <td><input type="text" className="form-control" defaultValue={userPhone} disabled/></td>
                <th>延长时间</th>
                <td>
                    <input type="text" id="delayClaimTime" disabled={mark} style={{"width":"80%","height":"100%","padding":"0"}}/>
                    <span style={{"width":"20%","display":"inline-block","cursor":"default"}}>小时</span>
                </td>
              </tr>
              <tr>
                <th style={{"borderRight":"none","height":"30px"}}>申请原因</th>
                <td colSpan="5" style={{"borderLeft":"none"}}>&nbsp;</td>
              </tr>
              <tr>
                <td colSpan="6"><textarea rows="4" className="form-control" id="delayClaimReason" disabled={mark}></textarea></td>
              </tr>
              <tr>
                <th style={{"borderRight":"none","height":"30px"}}>审批意见</th>
                <td colSpan="5" style={{"borderLeft":"none"}}>&nbsp;</td>
              </tr>
              <tr>
                <td colSpan="6"><textarea rows="4" className="form-control" id="delayClaimOpinion" disabled></textarea></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-12">
          <ClaimRecord
            orderDetailData={this.props.orderDetailData}
          />
        </div>
      </div>
    );
  }
});

module.exports = delayClaim;
