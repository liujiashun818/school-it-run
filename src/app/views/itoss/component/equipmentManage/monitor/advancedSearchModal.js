/*
* 资源监测-统一监控平台-高级搜索
*/
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var ReactWidgets = require('react-widgets');

// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BasicPropsBox = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    render: function() {
        return (
            <div className="row basicPropsBox">
                <div className='col-md-12 boldFontStyle'>基本属性</div>
                <div className='col-md-12'>
                    <div className='col-md-6'>
                        <div className="subForm">
                            <div className="col-md-2">
                                <label className="label-name">国标编码</label>
                            </div>
                            <div className="col-md-10">
                                <input id="mo_BasicPropsBox_InternationalCode" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="subForm">
                            <div className="col-md-2">
                                <label className="label-name">区域编码</label>
                            </div>
                            <div className="col-md-10">
                                <input id="mo_BasicPropsBox_AreaCode" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="subForm">
                            <div className="col-md-2">
                                <label className="label-name">安装地址</label>
                            </div>
                            <div className="col-md-10">
                                <input id="mo_BasicPropsBox_InstallAddress" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="subForm">
                            <div className="col-md-2">
                                <label className="label-name">设备类型</label>
                            </div>
                            <div className="col-md-10">
                                <input id="mo_BasicPropsBox_DeviceType" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="subForm">
                            <div className="col-md-2">
                                <label className="label-name">品牌</label>
                            </div>
                            <div className="col-md-10">
                                <input id="mo_BasicPropsBox_Brand" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="subForm">
                            <div className="col-md-2">
                                <label className="label-name">型号</label>
                            </div>
                            <div className="col-md-10">
                                <input id="mo_BasicPropsBox_Model" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="subForm">
                            <div className="col-md-2">
                                <label className="label-name">朝向</label>
                            </div>
                            <div className="col-md-10">
                                <input id="mo_BasicPropsBox_Direction" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var StatePropsBox = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    render: function() {
        return (
            <div className="row statePropsBox">
                <div className='col-md-12 boldFontStyle'>状态属性</div>
                <div className='col-md-12'>
                    <div className='col-md-12'>
                        <div className="radio radioDiv">
                            <label className='searchFontStyle'>
                                <input id="radio_And" type="radio" name="radio_and_or" value="1" defaultChecked="true"/> 与
                            </label>
                        </div>
                        <div className="radio radioDiv">
                            <label className='searchFontStyle'>
                                <input id="radio_Or" type="radio" name="radio_and_or" value="2"/> 或
                            </label>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">状态</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_Status" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">信号丢失</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_SignalLoss" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">画面丢失</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_PictureLoss" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">偏亮</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_PartialLight" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">偏暗</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_PartialDark" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">清晰度</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_Definition" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">偏色</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_PartialColor" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">雪花</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_Snowflake" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">条纹</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_Stripe" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">滚屏</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_ScrollScreen" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">抖动</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_ShakeScreen" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">遮挡</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_Shelter" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="subForm">
                            <div className="col-md-5">
                                <label className="label-name">冻结</label>
                            </div>
                            <div className="col-md-7">
                                <ReactWidgets.DropdownList id="mo_StatePropsBox_Frozen" className="form-control" data={['全部','正常','异常']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var CameraAdvancedSearchBox = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    render: function() {
        return (
            <div>
                <BasicPropsBox/>
                <StatePropsBox/>
            </div>
        );
    }
});

var AdvancedSearchBox = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    render: function() {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        return (
            <div className="row advancedSearchBox">
                    <div className='col-md-12'>
                        <div className="subForm">
                            <div className="col-md-3">
                                <label className="label-name">在线</label>
                            </div>
                            <div className="col-md-9">
                                <ReactWidgets.DropdownList id="mo_AdvancedSearchBox_OnlineStatus" className="form-control" data={['全部','在线','不在线']} textField='name' defaultValue='全部'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className="subForm">
                            <div className="col-md-3">
                                <label className="label-name">国标编码</label>
                            </div>
                            <div className="col-md-9">
                                <input id="mo_AdvancedSearchBox_InternationalCode" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className="subForm">
                            <div className="col-md-3">
                                <label className="label-name">区域编码</label>
                            </div>
                            <div className="col-md-9">
                                <input id="mo_AdvancedSearchBox_AreaCode" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className="subForm">
                            <div className="col-md-3">
                                <label className="label-name">品牌</label>
                            </div>
                            <div className="col-md-9">
                                <input id="mo_AdvancedSearchBox_Brand" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className="subForm">
                            <div className="col-md-3">
                                <label className="label-name">安装地址</label>
                            </div>
                            <div className="col-md-9">
                                <input id="mo_AdvancedSearchBox_InstallAddress" type="text" className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className="subForm">
                            <div className="col-md-3">
                                <label className="label-name alarmRangeLabel">告警范围</label>
                            </div>
                            <div className="col-md-9">
                                <ReactWidgets.DateTimePicker id="mo_AdvancedSearchBox_AlarmRangeLower" className="form-control" format={"yyyy-MM-dd HH:mm:ss"} defaultValue={date}/>
                                <ReactWidgets.DateTimePicker id="mo_AdvancedSearchBox_AlarmRangeUpper" className="form-control subForm" format={"yyyy-MM-dd HH:mm:ss"} defaultValue={new Date()}/>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
});

var AdvancedSearchModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    // _handleOnClickOK: function() {
    //     var filter = {};
    //     var baseSearch = "", advancedSearch = "", relation;
    //
    //     if($.trim(document.getElementById('quickSearchInput').value) != "") {
    //         switch (document.getElementById('quickSearchType').childNodes[1].innerText) {
    //             case "IP地址":
    //                 if(this.state.itoss_Monitor.MonitorType == "1") {
    //                     baseSearch = "e.IPADDRESS like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                 }
    //                 else {
    //                     baseSearch = "e.SERVERIP like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                 }
    //                 break;
    //             case "设备名称":
    //                 if(this.state.itoss_Monitor.MonitorType == "1") {
    //                     baseSearch = "e.VIDEONAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                 }
    //                 else {
    //                     baseSearch = "e.SERVERNAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                 }
    //                 break;
    //         }
    //     }
    //
    //     switch (this.state.itoss_Monitor.MonitorType) {
    //         case "1":
    //             if($.trim(document.getElementById('mo_BasicPropsBox_InternationalCode').value) != "") {
    //                 baseSearch += (baseSearch.length==0?"":" and ") + "e.VIDEOFLAG='" + $.trim(document.getElementById('mo_BasicPropsBox_InternationalCode').value) + "'";
    //             }
    //             if($.trim(document.getElementById('mo_BasicPropsBox_AreaCode').value) != "") {
    //                 baseSearch += (baseSearch.length==0?"":" and ") + "e.CIVILCODE='" + $.trim(document.getElementById('mo_BasicPropsBox_AreaCode').value) + "'";
    //             }
    //             if($.trim(document.getElementById('mo_BasicPropsBox_InstallAddress').value) != "") {
    //                 baseSearch += (baseSearch.length==0?"":" and ") + "e.IPLACE like '%" + $.trim(document.getElementById('mo_BasicPropsBox_InstallAddress').value) + "%'";
    //             }
    //             if($.trim(document.getElementById('mo_BasicPropsBox_DeviceType').value) != "") {
    //                 baseSearch += (baseSearch.length==0?"":" and ") + "e.BASETYPE like '%" + $.trim(document.getElementById('mo_BasicPropsBox_DeviceType').value) + "%'";
    //             }
    //             if($.trim(document.getElementById('mo_BasicPropsBox_Brand').value) != "") {
    //                 baseSearch += (baseSearch.length==0?"":" and ") + "e.MANUFACTURER like '%" + $.trim(document.getElementById('mo_BasicPropsBox_Brand').value) + "%'";
    //             }
    //             if($.trim(document.getElementById('mo_BasicPropsBox_Model').value) != "") {
    //                 baseSearch += (baseSearch.length==0?"":" and ") + "e.BRAND like '%" + $.trim(document.getElementById('mo_BasicPropsBox_Model').value) + "%'";
    //             }
    //             if($.trim(document.getElementById('mo_BasicPropsBox_Direction').value) != "") {
    //                 baseSearch += (baseSearch.length==0?"":" and ") + "e.DIRECTIONTYPE like '%" + $.trim(document.getElementById('mo_BasicPropsBox_Direction').value) + "%'";
    //             }
    //
    //             if(document.getElementById('radio_And').checked) {
    //                 relation = "and";
    //             } else {
    //                 relation = "or";
    //             }
    //
    //             if(document.getElementById('mo_StatePropsBox_Status').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.ONLINESTATUS" + (document.getElementById('mo_StatePropsBox_Status').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_SignalLoss').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.SIGNALLOSS" + (document.getElementById('mo_StatePropsBox_SignalLoss').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_PictureLoss').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.IMAGELOSS" + (document.getElementById('mo_StatePropsBox_PictureLoss').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_PartialLight').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.BRIGHT" + (document.getElementById('mo_StatePropsBox_PartialLight').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_PartialDark').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.DIM" + (document.getElementById('mo_StatePropsBox_PartialDark').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_Definition').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.DEFINITION" + (document.getElementById('mo_StatePropsBox_Definition').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_PartialColor').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.COLORCOST" + (document.getElementById('mo_StatePropsBox_PartialColor').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_Snowflake').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.SNOWFLAKE" + (document.getElementById('mo_StatePropsBox_Snowflake').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_Stripe').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.STREAK" + (document.getElementById('mo_StatePropsBox_Stripe').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_ScrollScreen').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.SCREENSCROLL" + (document.getElementById('mo_StatePropsBox_ScrollScreen').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_ShakeScreen').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.SCREENSHAKE" + (document.getElementById('mo_StatePropsBox_ShakeScreen').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_Shelter').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.COVERSTATUS" + (document.getElementById('mo_StatePropsBox_Shelter').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             if(document.getElementById('mo_StatePropsBox_Frozen').childNodes[1].innerText != "全部") {
    //                 advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.FREEZE" + (document.getElementById('mo_StatePropsBox_Frozen').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
    //             }
    //             break;
    //         case "2":
    //         case "3":
    //         case "4":
    //         case "5":
    //         default:
    //             var alarmRangeLower = new Date(document.getElementById('mo_AdvancedSearchBox_AlarmRangeLower').childNodes[0].value.replace(/-/g,"/"));
    //             var alarmRangeUpper = new Date(document.getElementById('mo_AdvancedSearchBox_AlarmRangeUpper').childNodes[0].value.replace(/-/g,"/"));
    //             if(isNaN(alarmRangeLower.getDate()) || isNaN(alarmRangeUpper.getDate()) || alarmRangeUpper.getTime() < alarmRangeLower.getTime()) {
    //                 alert("告警范围时间设置错误！");
    //                 return;
    //             }
    //             else {
    //                 // if(document.getElementById('mo_AdvancedSearchBox_OnlineStatus').childNodes[1].innerText == "在线") {
    //                 //     filter.ONLINESTATUS = '1';
    //                 // }
    //                 // else if(document.getElementById('mo_AdvancedSearchBox_OnlineStatus').childNodes[1].innerText == "不在线") {
    //                 //     filter.ONLINESTATUS = '0';
    //                 // }
    //                 if(document.getElementById('mo_AdvancedSearchBox_OnlineStatus').childNodes[1].innerText != "全部") {
    //                     baseSearch += (baseSearch.length==0?"":" and ") + "a.NETBREAK" + (document.getElementById('mo_AdvancedSearchBox_OnlineStatus').childNodes[1].innerText=="在线"?"=":"!=") + "'1'";
    //                 }
    //                 if($.trim(document.getElementById('mo_AdvancedSearchBox_InternationalCode').value) != "") {
    //                     baseSearch += (baseSearch.length==0?"":" and ") + "e.SERVERFLAG='" + $.trim(document.getElementById('mo_AdvancedSearchBox_InternationalCode').value) + "'";
    //                 }
    //                 if($.trim(document.getElementById('mo_AdvancedSearchBox_AreaCode').value) != "") {
    //                     baseSearch += (baseSearch.length==0?"":" and ") + "e.CIVILCODE='" + $.trim(document.getElementById('mo_AdvancedSearchBox_AreaCode').value) + "'";
    //                 }
    //                 if($.trim(document.getElementById('mo_AdvancedSearchBox_Brand').value) != "") {
    //                     baseSearch += (baseSearch.length==0?"":" and ") + "e.MANUFACTURER='" + $.trim(document.getElementById('mo_AdvancedSearchBox_Brand').value) + "'";
    //                 }
    //                 if($.trim(document.getElementById('mo_AdvancedSearchBox_InstallAddress').value) != "") {
    //                     baseSearch += (baseSearch.length==0?"":" and ") + "e.IPLACE='" + $.trim(document.getElementById('mo_AdvancedSearchBox_InstallAddress').value) + "'";
    //                 }
    //
    //                 filter.ALARMRANGE1 = document.getElementById('mo_AdvancedSearchBox_AlarmRangeLower').childNodes[0].value;
    //                 filter.ALARMRANGE2 = document.getElementById('mo_AdvancedSearchBox_AlarmRangeUpper').childNodes[0].value;
    //                 baseSearch += (baseSearch.length==0?"":" and ") + "a.ALARMTIME>='" + document.getElementById('mo_AdvancedSearchBox_AlarmRangeLower').childNodes[0].value + "'";
    //                 baseSearch += (baseSearch.length==0?"":" and ") + "a.ALARMTIME<='" + document.getElementById('mo_AdvancedSearchBox_AlarmRangeUpper').childNodes[0].value + "'";
    //                 break;
    //             }
    //     }
    //
    //     var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
    //     var yftDeviceMonitorStoreState = this.getFlux().store("YFTDeviceMonitorStore").getState();
    //     var yftDeviceMonitorTreeStoreState = this.getFlux().store("YFTDeviceMonitorTreePageStore").getState();
    //     if(yftDeviceMonitorStoreState.SettingSearchAreaData != yftDeviceMonitorStoreState.SearchAreaData) {
    //         var monitorType;
    //         switch (yftDeviceMonitorStoreState.MonitorType) {
    //             case "1":
    //                 monitorType = "vedio";
    //                 break;
    //             case "2":
    //                 monitorType = "dvr";
    //                 break;
    //             case "3":
    //                 monitorType = "nvr";
    //                 break;
    //             case "4":
    //                 monitorType = "code";
    //                 break;
    //             case "5":
    //                 monitorType = "ipsan";
    //                 break;
    //         }
    //
    //         var _this = this;
    //         // setTimeout(function () {
    //             var flag = false;
    //             for(var i = 0; i < yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData.length; i++) {
    //                 if(yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].type == monitorType && yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].pid == yftDeviceMonitorStoreState.SettingSearchAreaData.id) {
    //                     flag = true;
    //                     var filter = [
    //                         {key:"SELECTGROUP", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].pid},
    //                         {key:"GROUPID", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id},
    //                         {key:"NAME", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].name.substring(0, yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].name.indexOf("("))},
    //                         {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}
    //                     ];
    //                     if(baseSearch != "") {
    //                         filter.push({key:"BASESEARCH", value:baseSearch});
    //                     }
    //                     if(advancedSearch != "") {
    //                         filter.push({key:"ADVANCEDSEARCH", value:advancedSearch});
    //                     }
    //                     if(yftDeviceMonitorStoreState.MonitorFilterStatus != "all") {
    //                         filter.push({key:"STATUS", value:yftDeviceMonitorStoreState.MonitorFilterStatus});
    //                     }
    //                     yftDeviceMonitorAction.set_monitorTableFilter(filter.slice(0));
    //                     filter.push({key:"FROM", value:0});
    //                     filter.push({key:"TO", value:20});
    //                     yftDeviceMonitorAction.get_GroupListData(filter);
    //                     document.getElementById("fixed-monitorTable-pagination").style.display = "block";
    //                     $('#monitorTable').bootstrapTable('refreshOptions', {
    //                         pagination: false
    //                     });
    //                     // var filter2 = [{key:"GROUPID", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id}, {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}];
    //                     // yftDeviceMonitorAction.get_TearmListData(filter2);
    //                     yftDeviceMonitorAction.set_MonitorGroupId(yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id);
    //                     yftDeviceMonitorAction.set_MonitorName(yftDeviceMonitorStoreState.SettingSearchAreaData.name.substring(0, yftDeviceMonitorStoreState.SettingSearchAreaData.name.indexOf("(")) + "-" + yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].name);
    //                     yftDeviceMonitorAction.set_SearchAreaData(yftDeviceMonitorStoreState.SettingSearchAreaData);
    //                     yftDeviceMonitorAction.set_monitorTableCurrentPage(1);
    //                     yftDeviceMonitorAction.set_monitorTableNumPerPage(20);
    //                 }
    //             }
    //
    //             if(!flag) {
    //                 var name;
    //                 switch (yftDeviceMonitorStoreState.MonitorType) {
    //                     case "1":
    //                         name = "摄像机";
    //                         break;
    //                     case "2":
    //                         name = "DVR";
    //                         break;
    //                     case "3":
    //                         name = "NVR";
    //                         break;
    //                     case "4":
    //                         name = "编码器";
    //                         break;
    //                     case "5":
    //                         name = "IPSAN";
    //                         break;
    //                     default:
    //                         name = "摄像机";
    //                         break;
    //                 }
    //
    //                 var filter = [
    //                     {key:"SELECTGROUP", value:yftDeviceMonitorStoreState.SettingSearchAreaData.id},
    //                     {key:"GROUPID", value:yftDeviceMonitorStoreState.MonitorGroupId},
    //                     {key:"NAME", value:name},
    //                     {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}
    //                 ];
    //                 if(baseSearch != "") {
    //                     filter.push({key:"BASESEARCH", value:baseSearch});
    //                 }
    //                 if(advancedSearch != "") {
    //                     filter.push({key:"ADVANCEDSEARCH", value:advancedSearch});
    //                 }
    //                 if(yftDeviceMonitorStoreState.MonitorFilterStatus != "all") {
    //                     filter.push({key:"STATUS", value:yftDeviceMonitorStoreState.MonitorFilterStatus});
    //                 }
    //                 yftDeviceMonitorAction.set_monitorTableFilter(filter.slice(0));
    //                 filter.push({key:"FROM", value:0});
    //                 filter.push({key:"TO", value:20});
    //                 yftDeviceMonitorAction.get_GroupListData(filter);
    //                 document.getElementById("fixed-monitorTable-pagination").style.display = "block";
    //                 $('#monitorTable').bootstrapTable('refreshOptions', {
    //                     pagination: false
    //                 });
    //                 // var filter2 = [{key:"GROUPID", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id}, {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}];
    //                 // yftDeviceMonitorAction.get_TearmListData(filter2);
    //                 yftDeviceMonitorAction.set_SearchAreaData(yftDeviceMonitorStoreState.SettingSearchAreaData);
    //                 yftDeviceMonitorAction.set_monitorTableCurrentPage(1);
    //                 yftDeviceMonitorAction.set_monitorTableNumPerPage(20);
    //             }
    //         // }, 100);
    //     }
    //     else {
    //         var monitorName;
    //         switch (yftDeviceMonitorStoreState.MonitorType) {
    //             case "1":
    //                 monitorName = "摄像机";
    //                 break;
    //             case "2":
    //                 monitorName = "DVR";
    //                 break;
    //             case "3":
    //                 monitorName = "NVR";
    //                 break;
    //             case "4":
    //                 monitorName = "编码器";
    //                 break;
    //             case "5":
    //                 monitorName = "IPSAN";
    //                 break;
    //             default:
    //                 monitorName = "摄像机";
    //                 break;
    //         }
    //         var filter = [
    //             {key:"SELECTGROUP", value:yftDeviceMonitorStoreState.SearchAreaData.id},
    //             {key:"GROUPID", value:yftDeviceMonitorStoreState.MonitorGroupId},
    //             {key:"NAME", value:monitorName},
    //             {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}
    //         ];
    //         if(baseSearch != "") {
    //             filter.push({key:"BASESEARCH", value:baseSearch});
    //         }
    //         if(advancedSearch != "") {
    //             filter.push({key:"ADVANCEDSEARCH", value:advancedSearch});
    //         }
    //         if(yftDeviceMonitorStoreState.MonitorFilterStatus != "all") {
    //             filter.push({key:"STATUS", value:yftDeviceMonitorStoreState.MonitorFilterStatus});
    //         }
    //         yftDeviceMonitorAction.set_monitorTableFilter(filter.slice(0));
    //         filter.push({key:"FROM", value:0});
    //         filter.push({key:"TO", value:20});
    //         yftDeviceMonitorAction.get_GroupListData(filter);
    //         document.getElementById("fixed-monitorTable-pagination").style.display = "block";
    //         $('#monitorTable').bootstrapTable('refreshOptions', {
    //             pagination: false
    //         });
    //         yftDeviceMonitorAction.set_monitorTableCurrentPage(1);
    //         yftDeviceMonitorAction.set_monitorTableNumPerPage(20);
    //     }
    // },

    getModalBodyContent: function () {
        switch (this.props.monitorType) {
            case "1":
                return <CameraAdvancedSearchBox/>;
                break;
            case "2":
            case "3":
            case "4":
            case "5":
            default:
                return <AdvancedSearchBox/>;
                break;
        }
    },

    componentDidUpdate: function() {
        var _this = this;
        $('#advancedSearchModal').on('show.bs.modal', function () {
            switch (_this.props.monitorType) {
                case "1":
                    document.getElementsByClassName("advancedSearchModalDialog")[0].style.width = "700px";
                    break;
                case "2":
                case "3":
                case "4":
                case "5":
                    document.getElementsByClassName("advancedSearchModalDialog")[0].style.width = "320px";
                    break;
                default:
                    document.getElementsByClassName("advancedSearchModalDialog")[0].style.width = "320px";
                    break;
            }
        })
    },

    render : function(){
        const { onClickOk } = this.props;
        return (
            <div className="modal fade" id="advancedSearchModal" tabIndex="-1" role="dialog" aria-labelledby="advancedSearchModalLabel" aria-hidden="true">
                <div className="modal-dialog advancedSearchModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">高级检索</h5>
                        </div>
                        <div className="modal-body">
                            {this.getModalBodyContent()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal" onClick={onClickOk}>确定</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

AdvancedSearchModal.propTypes = {
    monitorType: PropTypes.string.isRequired,
    onClickOk: PropTypes.func.isRequired
}

module.exports = AdvancedSearchModal;
