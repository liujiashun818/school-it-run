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

var ReactWidgets = require('react-widgets');

// Example：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
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

var dependenceConditionData = [
    {id:'0', name:'错误'},
    {id:'1', name:'禁用'},
    {id:'2', name:'危险'},
    {id:'3', name:'正常'}
];

var alarmConfigurationData = [
    {id:'0', name:'默认报警'},
    {id:'1', name:'NULL'}
];

var AdvancedSettings_monitorDependence = React.createClass({
    render: function() {
        return (
            <tr>
                <th rowSpan="4" style={{width:"10%"}}>高级选项</th>
                <td className="paddingleft10" style={{width:"15%"}}>监测依赖</td>
                <td style={{width:"25%"}}><input type="text"/></td>
                <td style={{width:"5%"}}><button type="button" className="btn btn-default btnGetModel" style={{width:"100%"}} data-toggle="modal" data-target="#dependOnModal">...</button></td>
                <td className="paddingleft10" style={{width:"15%"}}>依赖条件</td>
                <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={dependenceConditionData} defaultValue={dependenceConditionData[3]} textField='name'/></td>
            </tr>
        );
    }
});

var AdvancedSettings_alarmDependence = React.createClass({
    render: function() {
        return (
            <tr>
                <td className="paddingleft10" style={{width:"15%"}}>报警依赖</td>
                <td style={{width:"25%"}}><input type="text"/></td>
                <td style={{width:"5%"}}><button type="button" className="btn btn-default btnGetModel" style={{width:"100%"}} data-toggle="modal" data-target="#dependOnModal">...</button></td>
                <td className="paddingleft10" style={{width:"15%"}}>报警配置</td>
                <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={alarmConfigurationData} defaultValue={alarmConfigurationData[0]} textField='name'/></td>
            </tr>
        );
    }
});

var AdvancedSettings_creatInfo = React.createClass({
    render: function() {
        return (
            <tr>
                <td className="paddingleft10" style={{width:"15%"}}>创建人</td>
                <td colSpan="2" style={{width:"30%"}}><div style={{padding:"0 5px",fontWeight:"bold",color:"black"}}>{localStorage.getItem("localUserName")}</div></td>
                <td className="paddingleft10" style={{width:"15%"}}>创建时间</td>
                <td colSpan="2" style={{width:"30%"}}><div style={{padding:"0 5px",fontWeight:"bold",color:"black"}}>{(new Date()).Format("yyyy-MM-dd hh:mm")}</div></td>
            </tr>
        );
    }
});

var AdvancedSettings_modifyInfo = React.createClass({
    render: function() {
        return (
            <tr>
                <td className="paddingleft10" style={{width:"15%"}}>最后修改人</td>
                <td colSpan="2" style={{width:"30%"}}><div style={{padding:"0 5px",fontWeight:"bold",color:"black"}}>{localStorage.getItem("localUserName")}</div></td>
                <td className="paddingleft10" style={{width:"15%"}}>最后修改时间</td>
                <td colSpan="2" style={{width:"30%"}}><div style={{padding:"0 5px",fontWeight:"bold",color:"black"}}>{(new Date()).Format("yyyy-MM-dd hh:mm")}</div></td>
            </tr>
        );
    }
});

// module.exports = AdvancedSettings;
module.exports = {
  MonitorDependence:AdvancedSettings_monitorDependence,
  AlarmDependence:AdvancedSettings_alarmDependence,
  CreatInfo:AdvancedSettings_creatInfo,
  ModifyInfo:AdvancedSettings_modifyInfo
};
