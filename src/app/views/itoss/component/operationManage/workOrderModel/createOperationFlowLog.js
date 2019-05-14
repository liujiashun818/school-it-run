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

var operationFlowLog = React.createClass({

  render:function(){
    return(
      <div className="operationFlowLogDiv">
        <table className="table table-hover table-striped">
          <tbody>
            <tr>
              <th>处理人</th>
              <th>处理时间</th>
              <th>操作流程</th>
              <th>环节描述</th>
            </tr>
            <tr>
              <td>admin</td>
              <td>2015-09-25 10:15:51</td>
              <td>分配内部接口</td>
              <td>----</td>
            </tr>
            <tr>
              <td>admin</td>
              <td>2015-09-25 10:15:51</td>
              <td>分配内部接口</td>
              <td>----</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = operationFlowLog;
