require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var claimRecord = React.createClass({
  render:function(){
    return (
      <div className="operationMonitorInfoDiv">
        <label className="operationMonitorLabel">延期申请</label>
        <table>
          <tbody>
            <tr>
              <td><input type="checkBox"/></td>
              <td>申请时间</td>
              <td>申请单位</td>
              <td>申请人</td>
              <td>状态</td>
              <td>审批人</td>
              <td>审批时间</td>
            </tr>
            <tr>
              <td><input type="checkBox"/></td>
              <td>2016/12/22 18:00</td>
              <td>xxx派出所</td>
              <td>admin</td>
              <td>已申请</td>
              <td>---</td>
              <td>---</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = claimRecord;
