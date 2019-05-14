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
    {id:'0', name:'AIX'},
    {id:'1', name:'CentOS'},
    {id:'2', name:'Fedora'},
    {id:'3', name:'FreeBSD'},
    {id:'4', name:'HP/UX'},
    {id:'5', name:'HP/UX 64-bit'},
    {id:'6', name:'Linux'},
    {id:'7', name:'MaxOSX'},
    {id:'8', name:'OPENSERVER'},
    {id:'9', name:'Red Hat Enterprise Linux'},
    {id:'10', name:'SCO'},
    {id:'11', name:'SGI Irix'},
    {id:'12', name:'SUSE'},
    {id:'13', name:'Ubuntu'}
];

var connecttionModeData = [
    {id:'0', name:'SSH'},
    {id:'1', name:'other'}
];

var connectionAuthorityData = [
    {id:'0', name:'password'},
    {id:'1', name:'keyfile'}
];

var privacyAlgorithmData = [
    {id:'0', name:'DES'},
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
                    <th rowSpan="5" style={{width:"10%"}}>基本信息</th>
                    <td className="paddingleft10" style={{width:"15%"}}>资源IP<span style={{color: "red"}}>*</span></td>
                    <td colSpan="5" style={{width:"75%"}}><input type="text"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>操作系统<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={osData} defaultValue={osData[6]} textField='name'/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>连接方式<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={connecttionModeData} defaultValue={connecttionModeData[0]} textField='name'/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>连接数<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><input type="number"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>连接权限<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={connectionAuthorityData} defaultValue={connectionAuthorityData[0]} textField='name'/></td>
                  </tr>

                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>秘钥文件</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>端口<span style={{color: "red"}}>*</span></td>
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
