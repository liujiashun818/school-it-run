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
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');
var GeneralSettings = require('./common/createResourceView_monitoringSettingTab_generalSettings');
var AdvancedSettings = require('./common/createResourceView_monitoringSettingTab_advancedSettings');

var modelData = [
    {id:'0', name:'other'},
    {id:'1', name:'3COM'},
    {id:'2', name:'CoreBuilder-9400'}
];

var versionData = [
    {id:'0', name:'V1'},
    {id:'1', name:'V2'},
    {id:'2', name:'V3'}
];

var verificationAlgorithmData = [
    {id:'0', name:'MD5'},
    {id:'1', name:'other'}
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
                    <td className="paddingleft10" style={{width:"15%"}}>资源型号<span style={{color: "red"}}>*</span></td>
                    <td style={{width:"25%"}}><ReactWidgets.DropdownList data={modelData} defaultValue={modelData[0]} textField='name'/></td>
                    <td style={{width:"5%"}}><button type="button" className="btn btn-default btnGetModel" style={{width:"100%"}}>获取型号</button></td>
                    <td className="paddingleft10" style={{width:"15%"}}>资源IP<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>端口<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><input type="number"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>共同体<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><input type="password"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>版本</td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={versionData} defaultValue={versionData[0]} textField='name'/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>验证算法</td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={verificationAlgorithmData} defaultValue={verificationAlgorithmData[0]} textField='name'/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>用户名</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>密码</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="password"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>隐私算法</td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={privacyAlgorithmData} defaultValue={privacyAlgorithmData[0]} textField='name'/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>隐私密码</td>
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
