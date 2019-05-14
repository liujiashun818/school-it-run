/**
 * Created by SHIN on 2015/12/28.
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var GeneralSettings_title = React.createClass({
    render: function() {
        return (
            <tr>
                <th rowSpan="2" style={{width:"10%"}}>常规设置</th>
                <td className="paddingleft10" style={{width:"15%"}}>标题<span style={{color:"#FF0000"}}>*</span></td>
                <td colSpan="5" style={{width:"75%"}}><input type="text"/></td>
            </tr>
        );
    }
});

var GeneralSettings_des = React.createClass({
    render: function() {
        return (
            <tr>
                <td className="paddingleft10" style={{width:"15%"}}>描述</td>
                <td colSpan="5" style={{width:"75%"}}><textarea className="form-control" style={{height:"60px"}}/></td>
            </tr>
        );
    }
});

// module.exports = GeneralSettings;
module.exports = {
  Title:GeneralSettings_title,
  Des:GeneralSettings_des
};
