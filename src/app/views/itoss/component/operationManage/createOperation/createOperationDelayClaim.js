require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ClaimRecord = require('./createOperationDelayClaimRecord.js');

var delayClaim = React.createClass({
  render:function(){
    return (
      <div className="operationDelayDiv">
        <div className="col-md-12">
          <table>
            <tbody>
              <tr>
                <td>申请单号</td>
                <td><input type="text" className="form-control"/></td>
                <td>工单号</td>
                <td><input type="text" className="form-control"/></td>
                <td>延期状态</td>
                <td><input type="text" className="form-control"/></td>
              </tr>
              <tr>
                <td>申请人</td>
                <td><input type="text" className="form-control"/></td>
                <td>申请人电话</td>
                <td><input type="text" className="form-control"/></td>
                <td>延长时间</td>
                <td><input type="text" className="form-control"/></td>
              </tr>
              <tr>
                <td style={{"borderRight":"none","height":"30px"}}>申请原因</td>
                <td colSpan="5" style={{"borderLeft":"none"}}>&nbsp;</td>
              </tr>
              <tr>
                <td colSpan="6"><textarea rows="4" className="form-control"></textarea></td>
              </tr>
              <tr>
                <td style={{"borderRight":"none","height":"30px"}}>审批意见</td>
                <td colSpan="5" style={{"borderLeft":"none"}}>&nbsp;</td>
              </tr>
              <tr>
                <td colSpan="6"><textarea rows="4" className="form-control"></textarea></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-12">
          <ClaimRecord />
        </div>
      </div>
    );
  }
});

module.exports = delayClaim;
