/**
 * Created by SHIN on 2015/12/29.
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');
var GeneralSettings = require('./common/createResourceView_monitoringSettingTab_generalSettings');
var AdvancedSettings = require('./common/createResourceView_monitoringSettingTab_advancedSettings');

var osData = [
    {id:'0', name:'Windows'},
    {id:'1', name:'Windows 2012'},
    {id:'2', name:'Windows 2003'},
    {id:'3', name:'Windows 2008'},
    {id:'4', name:'Windows 7'},
    {id:'5', name:'Windows 8'},
    {id:'6', name:'Windows 9'},
    {id:'7', name:'Windows XP'}
];

var connectionModeData = [
    {id:'0', name:'WMI'},
    {id:'1', name:'other'}
];

var MonitoringSettingTab = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    render: function() {
        return (
            <div className="createGroupDetailDiv" style={{borderTop:"none",marginTop:"0"}}>
              <table>
                <tbody>
                  <GeneralSettings.Title />
                  <GeneralSettings.Des />

                  <tr>
                    <th rowSpan="3" style={{width:"10%"}}>基本信息</th>
                    <td className="paddingleft10" style={{width:"15%"}}>资源IP<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>操作系统<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={osData} defaultValue={osData[0]} textField='name'/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>连接方式<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={connectionModeData} defaultValue={connectionModeData[0]} textField='name'/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>验证算法<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><input type="number"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>用户名<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>密码<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><input type="password"/></td>
                  </tr>

                  <AdvancedSettings.MonitorDependence />
                  <AdvancedSettings.AlarmDependence />
                  <AdvancedSettings.CreatInfo />
                  <AdvancedSettings.ModifyInfo />
                </tbody>
              </table>
            </div>
        );
    }
});

module.exports = MonitoringSettingTab;
