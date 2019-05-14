/*
* 资源监测-统一监控平台-设备列表
*/
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as deviceMonitorActions from '../../../../../actions/deviceMonitor_action'
import * as equipmentActions from '../../../../../actions/equipment_action'
import * as operationActions from '../../../../../actions/operation_action'

var SearchBox = require('./monitorTableSearchBox');
var MonitorTableBox = require('./monitorTableBox');
var FieldSettingModal = require("./fieldSettingModal");
var AdvancedSearchModal = require("./advancedSearchModal");
var DeviceInfoModal = require("./deviceInfoModal");
var ImageLinkModal = require("./imageLinkModal");
var VideoLinkModal = require("./videoLinkModal");
var FeedbackModal = require("./feedbackModal");
var FeedbackRestoreModal = require("./feedbackRestoreModal");
var FeedbackRestoreAllModal = require("./feedbackRestoreAllModal");
// var TriggerOperationModal = require("../../operationManage/triggerOperation/triggerOperationModal");
import TriggerOperationModal from "../../operationManage/triggerOperation/triggerOperationModal";

var MonitorTableView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    componentDidMount: function() {
        // const { dispatch, monitorTableFilter } = this.props;
        if(document.getElementById('monitorTableView') != null) {
            document.getElementById('monitorTableView').style.height = $(window).height() - 110 - 30 + 'px';
        }

        // var filter = monitorTableFilter.slice(0);
        // filter.push({key:"FROM", value:0});
        // filter.push({key:"TO", value:20});
        // // var _this = this;
        // setTimeout(function () {
        //     // _this.getFlux().actions.YFTDeviceMonitorActions.get_GroupListData(filter);
        //     dispatch(deviceMonitorActions.getGroupListData(filter));
        // }, 500);
    },

    componentDidUpdate: function() {
        // const { dispatch, bClickTreeNode, monitorTableFilter } = this.props;
        // if(bClickTreeNode) {
        //     var filter = monitorTableFilter.slice(0);
        //     filter.push({key:"FROM", value:0});
        //     filter.push({key:"TO", value:20});
        //     // var _this = this;
        //     setTimeout(function () {
        //         // _this.getFlux().actions.YFTDeviceMonitorActions.get_GroupListDataByClickTree(filter);
        //         dispatch(deviceMonitorActions.getGroupListDataByClickTree(filter));
        //     }, 500);
        // }
    },

    componentWillUnmount: function() {
        const { dispatch } = this.props;
        // var _this = this;
        setTimeout(function () {
            // _this.getFlux().actions.YFTDeviceMonitorActions.clear_monitorTableView_data();
            dispatch(deviceMonitorActions.clearMonitorTableViewData());
        }, 100);
    },

    _handleOnClickGoBack: function() {
        const { dispatch, monitorGroupId, monitorTree2, pieChartMonitorType } = this.props;
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var i = 0; i < nodes.length; i++) {
            if(nodes[i].id == monitorGroupId) {
                for(var j = 0; j < nodes.length; j++) {
                    if(nodes[j].id == nodes[i].pid) {
                        treeObj.selectNode(nodes[j]);
                        monitorTree2.setState({curNode:nodes[j]});
                        if(nodes[j].type=="organize" || nodes[j].type=="other") {
                            var filter = [{key:"GROUPID",value:nodes[j].id},{key:"TYPE",value:pieChartMonitorType}];
                            // this.getFlux().actions.YFTDeviceMonitorActions.set_monitorParam_3({getTearmListDataType: 0, groupId: nodes[j].id, monitorName: nodes[j].name, monitorView: 1});
                            // this.getFlux().actions.YFTDeviceMonitorActions.get_TearmListData(filter);
                            dispatch(deviceMonitorActions.setGetTearmListDataType(0));
                            dispatch(deviceMonitorActions.setMonitorGroupId(nodes[j].id));
                            dispatch(deviceMonitorActions.setMonitorName(nodes[j].name));
                            dispatch(deviceMonitorActions.setMonitorView(1));
                            dispatch(deviceMonitorActions.getTearmListData(filter));
                        }
                        else if(nodes[j].type=="group") {
                            // this.getFlux().actions.YFTEquipmentActions.get_GroupAllData(nodes[j].id);
                            // this.getFlux().actions.YFTDeviceMonitorActions.set_monitorParam_4({monitorName: nodes[j].name, monitorView: 3});
                            dispatch(equipmentActions.getGroupAllData(nodes[j].id));
                            dispatch(deviceMonitorActions.setMonitorName(nodes[j].name));
                            dispatch(deviceMonitorActions.setMonitorView(3));
                        }
                        break;
                    }
                }
                break;
            }
        }
    },

    handleOnClickAdvancedSearchModalOK: function() {
        const { dispatch, settingSearchAreaData, searchAreaData, monitorFilterStatus, monitorGroupId, deviceMonitorTreeData } = this.props;
        var filter = {};
        var baseSearch = "", advancedSearch = "", relation;

        if($.trim(document.getElementById('quickSearchInput').value) != "") {
            switch (document.getElementById('quickSearchType').childNodes[1].innerText) {
                case "IP地址":
                    if(this.props.monitorType == "1") {
                        baseSearch = "e.IPADDRESS like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                    }
                    else {
                        baseSearch = "e.SERVERIP like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                    }
                    break;
                case "设备名称":
                    if(this.props.monitorType == "1") {
                        baseSearch = "e.VIDEONAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                    }
                    else {
                        baseSearch = "e.SERVERNAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                    }
                    break;
            }
        }

        switch (this.props.monitorType) {
            case "1":
                if($.trim(document.getElementById('mo_BasicPropsBox_InternationalCode').value) != "") {
                    baseSearch += (baseSearch.length==0?"":" and ") + "e.VIDEOFLAG='" + $.trim(document.getElementById('mo_BasicPropsBox_InternationalCode').value) + "'";
                }
                if($.trim(document.getElementById('mo_BasicPropsBox_AreaCode').value) != "") {
                    baseSearch += (baseSearch.length==0?"":" and ") + "e.CIVILCODE='" + $.trim(document.getElementById('mo_BasicPropsBox_AreaCode').value) + "'";
                }
                if($.trim(document.getElementById('mo_BasicPropsBox_InstallAddress').value) != "") {
                    baseSearch += (baseSearch.length==0?"":" and ") + "e.IPLACE like '%" + $.trim(document.getElementById('mo_BasicPropsBox_InstallAddress').value) + "%'";
                }
                if($.trim(document.getElementById('mo_BasicPropsBox_DeviceType').value) != "") {
                    baseSearch += (baseSearch.length==0?"":" and ") + "e.BASETYPE like '%" + $.trim(document.getElementById('mo_BasicPropsBox_DeviceType').value) + "%'";
                }
                if($.trim(document.getElementById('mo_BasicPropsBox_Brand').value) != "") {
                    baseSearch += (baseSearch.length==0?"":" and ") + "e.MANUFACTURER like '%" + $.trim(document.getElementById('mo_BasicPropsBox_Brand').value) + "%'";
                }
                if($.trim(document.getElementById('mo_BasicPropsBox_Model').value) != "") {
                    baseSearch += (baseSearch.length==0?"":" and ") + "e.BRAND like '%" + $.trim(document.getElementById('mo_BasicPropsBox_Model').value) + "%'";
                }
                if($.trim(document.getElementById('mo_BasicPropsBox_Direction').value) != "") {
                    baseSearch += (baseSearch.length==0?"":" and ") + "e.DIRECTIONTYPE like '%" + $.trim(document.getElementById('mo_BasicPropsBox_Direction').value) + "%'";
                }

                if(document.getElementById('radio_And').checked) {
                    relation = "and";
                } else {
                    relation = "or";
                }

                if(document.getElementById('mo_StatePropsBox_Status').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.ONLINESTATUS" + (document.getElementById('mo_StatePropsBox_Status').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_SignalLoss').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.SIGNALLOSS" + (document.getElementById('mo_StatePropsBox_SignalLoss').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_PictureLoss').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.IMAGELOSS" + (document.getElementById('mo_StatePropsBox_PictureLoss').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_PartialLight').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.BRIGHT" + (document.getElementById('mo_StatePropsBox_PartialLight').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_PartialDark').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.DIM" + (document.getElementById('mo_StatePropsBox_PartialDark').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_Definition').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.DEFINITION" + (document.getElementById('mo_StatePropsBox_Definition').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_PartialColor').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.COLORCOST" + (document.getElementById('mo_StatePropsBox_PartialColor').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_Snowflake').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.SNOWFLAKE" + (document.getElementById('mo_StatePropsBox_Snowflake').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_Stripe').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.STREAK" + (document.getElementById('mo_StatePropsBox_Stripe').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_ScrollScreen').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.SCREENSCROLL" + (document.getElementById('mo_StatePropsBox_ScrollScreen').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_ShakeScreen').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.SCREENSHAKE" + (document.getElementById('mo_StatePropsBox_ShakeScreen').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_Shelter').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.COVERSTATUS" + (document.getElementById('mo_StatePropsBox_Shelter').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                if(document.getElementById('mo_StatePropsBox_Frozen').childNodes[1].innerText != "全部") {
                    advancedSearch += (advancedSearch.length==0?"":" "+relation+" ") + "a.FREEZE" + (document.getElementById('mo_StatePropsBox_Frozen').childNodes[1].innerText=="正常"?"=":"!=") + "'1'";
                }
                break;
            case "2":
            case "3":
            case "4":
            case "5":
            default:
                var alarmRangeLower = new Date(document.getElementById('mo_AdvancedSearchBox_AlarmRangeLower').childNodes[0].value.replace(/-/g,"/"));
                var alarmRangeUpper = new Date(document.getElementById('mo_AdvancedSearchBox_AlarmRangeUpper').childNodes[0].value.replace(/-/g,"/"));
                if(isNaN(alarmRangeLower.getDate()) || isNaN(alarmRangeUpper.getDate()) || alarmRangeUpper.getTime() < alarmRangeLower.getTime()) {
                    alert("告警范围时间设置错误！");
                    return;
                }
                else {
                    // if(document.getElementById('mo_AdvancedSearchBox_OnlineStatus').childNodes[1].innerText == "在线") {
                    //     filter.ONLINESTATUS = '1';
                    // }
                    // else if(document.getElementById('mo_AdvancedSearchBox_OnlineStatus').childNodes[1].innerText == "不在线") {
                    //     filter.ONLINESTATUS = '0';
                    // }
                    if(document.getElementById('mo_AdvancedSearchBox_OnlineStatus').childNodes[1].innerText != "全部") {
                        baseSearch += (baseSearch.length==0?"":" and ") + "a.NETBREAK" + (document.getElementById('mo_AdvancedSearchBox_OnlineStatus').childNodes[1].innerText=="在线"?"=":"!=") + "'1'";
                    }
                    if($.trim(document.getElementById('mo_AdvancedSearchBox_InternationalCode').value) != "") {
                        baseSearch += (baseSearch.length==0?"":" and ") + "e.SERVERFLAG='" + $.trim(document.getElementById('mo_AdvancedSearchBox_InternationalCode').value) + "'";
                    }
                    if($.trim(document.getElementById('mo_AdvancedSearchBox_AreaCode').value) != "") {
                        baseSearch += (baseSearch.length==0?"":" and ") + "e.CIVILCODE='" + $.trim(document.getElementById('mo_AdvancedSearchBox_AreaCode').value) + "'";
                    }
                    if($.trim(document.getElementById('mo_AdvancedSearchBox_Brand').value) != "") {
                        baseSearch += (baseSearch.length==0?"":" and ") + "e.MANUFACTURER='" + $.trim(document.getElementById('mo_AdvancedSearchBox_Brand').value) + "'";
                    }
                    if($.trim(document.getElementById('mo_AdvancedSearchBox_InstallAddress').value) != "") {
                        baseSearch += (baseSearch.length==0?"":" and ") + "e.IPLACE='" + $.trim(document.getElementById('mo_AdvancedSearchBox_InstallAddress').value) + "'";
                    }

                    filter.ALARMRANGE1 = document.getElementById('mo_AdvancedSearchBox_AlarmRangeLower').childNodes[0].value;
                    filter.ALARMRANGE2 = document.getElementById('mo_AdvancedSearchBox_AlarmRangeUpper').childNodes[0].value;
                    baseSearch += (baseSearch.length==0?"":" and ") + "a.ALARMTIME>='" + document.getElementById('mo_AdvancedSearchBox_AlarmRangeLower').childNodes[0].value + "'";
                    baseSearch += (baseSearch.length==0?"":" and ") + "a.ALARMTIME<='" + document.getElementById('mo_AdvancedSearchBox_AlarmRangeUpper').childNodes[0].value + "'";
                    break;
                }
        }

        // var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
        // var yftDeviceMonitorStoreState = this.getFlux().store("YFTDeviceMonitorStore").getState();
        // var yftDeviceMonitorTreeStoreState = this.getFlux().store("YFTDeviceMonitorTreePageStore").getState();
        if(settingSearchAreaData != searchAreaData) {
            var monitorType;
            switch (this.props.monitorType) {
                case "1":
                    monitorType = "vedio";
                    break;
                case "2":
                    monitorType = "dvr";
                    break;
                case "3":
                    monitorType = "nvr";
                    break;
                case "4":
                    monitorType = "code";
                    break;
                case "5":
                    monitorType = "ipsan";
                    break;
            }

            var _this = this;
            // setTimeout(function () {
                var flag = false;
                for(var i = 0; i < deviceMonitorTreeData.length; i++) {
                    if(deviceMonitorTreeData[i].type == monitorType && deviceMonitorTreeData[i].pid == settingSearchAreaData.id) {
                        flag = true;
                        var filter = [
                            {key:"SELECTGROUP", value:deviceMonitorTreeData[i].pid},
                            {key:"GROUPID", value:deviceMonitorTreeData[i].id},
                            {key:"NAME", value:deviceMonitorTreeData[i].name.substring(0, deviceMonitorTreeData[i].name.indexOf("("))},
                            {key:"TYPE", value:this.props.monitorType}
                        ];
                        if(baseSearch != "") {
                            filter.push({key:"BASESEARCH", value:baseSearch});
                        }
                        if(advancedSearch != "") {
                            filter.push({key:"ADVANCEDSEARCH", value:advancedSearch});
                        }
                        if(monitorFilterStatus != "all") {
                            filter.push({key:"STATUS", value:monitorFilterStatus});
                        }
                        dispatch(deviceMonitorActions.setMonitorTableFilter(filter.slice(0)));
                        filter.push({key:"FROM", value:0});
                        filter.push({key:"TO", value:20});
                        dispatch(deviceMonitorActions.getGroupListData(filter));
                        document.getElementById("fixed-monitorTable-pagination").style.display = "block";
                        $('#monitorTable').bootstrapTable('refreshOptions', {
                            pagination: false
                        });
                        // var filter2 = [{key:"GROUPID", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id}, {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}];
                        // yftDeviceMonitorAction.get_TearmListData(filter2);
                        dispatch(deviceMonitorActions.setMonitorGroupId(deviceMonitorTreeData[i].id));
                        dispatch(deviceMonitorActions.setMonitorName(settingSearchAreaData.name.substring(0, settingSearchAreaData.name.indexOf("(")) + "-" + deviceMonitorTreeData[i].name));
                        dispatch(deviceMonitorActions.setSearchAreaData(settingSearchAreaData));
                        dispatch(deviceMonitorActions.setMonitorTableCurrentPage(1));
                        dispatch(deviceMonitorActions.setMonitorTableNumPerPage(20));
                    }
                }

                if(!flag) {
                    var name;
                    switch (this.props.monitorType) {
                        case "1":
                            name = "摄像机";
                            break;
                        case "2":
                            name = "DVR";
                            break;
                        case "3":
                            name = "NVR";
                            break;
                        case "4":
                            name = "编码器";
                            break;
                        case "5":
                            name = "IPSAN";
                            break;
                        default:
                            name = "摄像机";
                            break;
                    }

                    var filter = [
                        {key:"SELECTGROUP", value:settingSearchAreaData.id},
                        {key:"GROUPID", value:monitorGroupId},
                        {key:"NAME", value:name},
                        {key:"TYPE", value:this.props.monitorType}
                    ];
                    if(baseSearch != "") {
                        filter.push({key:"BASESEARCH", value:baseSearch});
                    }
                    if(advancedSearch != "") {
                        filter.push({key:"ADVANCEDSEARCH", value:advancedSearch});
                    }
                    if(monitorFilterStatus != "all") {
                        filter.push({key:"STATUS", value:monitorFilterStatus});
                    }
                    dispatch(deviceMonitorActions.setMonitorTableFilter(filter.slice(0)));
                    filter.push({key:"FROM", value:0});
                    filter.push({key:"TO", value:20});
                    dispatch(deviceMonitorActions.getGroupListData(filter));
                    document.getElementById("fixed-monitorTable-pagination").style.display = "block";
                    $('#monitorTable').bootstrapTable('refreshOptions', {
                        pagination: false
                    });
                    // var filter2 = [{key:"GROUPID", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id}, {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}];
                    // yftDeviceMonitorAction.get_TearmListData(filter2);
                    dispatch(deviceMonitorActions.setSearchAreaData(settingSearchAreaData));
                    dispatch(deviceMonitorActions.setMonitorTableCurrentPage(1));
                    dispatch(deviceMonitorActions.setMonitorTableNumPerPage(20));
                }
            // }, 100);
        }
        else {
            var monitorName;
            switch (this.props.monitorType) {
                case "1":
                    monitorName = "摄像机";
                    break;
                case "2":
                    monitorName = "DVR";
                    break;
                case "3":
                    monitorName = "NVR";
                    break;
                case "4":
                    monitorName = "编码器";
                    break;
                case "5":
                    monitorName = "IPSAN";
                    break;
                default:
                    monitorName = "摄像机";
                    break;
            }
            var filter = [
                {key:"SELECTGROUP", value:searchAreaData.id},
                {key:"GROUPID", value:monitorGroupId},
                {key:"NAME", value:monitorName},
                {key:"TYPE", value:this.props.monitorType}
            ];
            if(baseSearch != "") {
                filter.push({key:"BASESEARCH", value:baseSearch});
            }
            if(advancedSearch != "") {
                filter.push({key:"ADVANCEDSEARCH", value:advancedSearch});
            }
            if(monitorFilterStatus != "all") {
                filter.push({key:"STATUS", value:monitorFilterStatus});
            }
            dispatch(deviceMonitorActions.setMonitorTableFilter(filter.slice(0)));
            filter.push({key:"FROM", value:0});
            filter.push({key:"TO", value:20});
            dispatch(deviceMonitorActions.getGroupListData(filter));
            document.getElementById("fixed-monitorTable-pagination").style.display = "block";
            $('#monitorTable').bootstrapTable('refreshOptions', {
                pagination: false
            });
            dispatch(deviceMonitorActions.setMonitorTableCurrentPage(1));
            dispatch(deviceMonitorActions.setMonitorTableNumPerPage(20));
        }
    },

    handleOnTouchWorkOrder: function() {
        const { dispatch, monitorTableSelectedRowData, monitorType, isCreateWorkOrder } = this.props;
        dispatch(deviceMonitorActions.get_isCreateWorkOrder(monitorTableSelectedRowData.LAG));
        var status;
        switch (monitorType) {
            case "1":
                status = monitorTableSelectedRowData.ONLINESTATUS;
                break;
            case "2":
            case "3":
            case "4":
            case "5":
                status = monitorTableSelectedRowData.NETBREAK;
                break;
        }
        if(status == "1") {
            setTimeout(function(){
              document.getElementById('publicMessageModelTitle').innerHTML = "提示";
              document.getElementById('publicMessageModalcontent').innerHTML = "设备正常，无需生成工单。";
              $('#publicMessageModal').modal('show');
            },100);
        }
        else if(isCreateWorkOrder == "0"){
          var data = monitorTableSelectedRowData;
          var type = monitorType;
          data.markType = type;
          dispatch(operationActions.init_detailData(0));
          dispatch(operationActions.get_faultType());
          dispatch(operationActions.get_serviceName());
          var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
          dispatch(operationActions.get_createOrderInfo(param));
          dispatch(operationActions.get_workFlowTypes());
          dispatch(operationActions.setIsBunder(0));
          dispatch(operationActions.set_touchWorkOrderData(data));
          $('#triggerOperationModal').modal('show');
          $("#triggerOperationFaultSubType").find(".rw-input").text("");
          $("#triggerOperationOrderResponse").val("");
          $("#triggerOperationOrderOver").val("");
          $("#triggerOperationOrderLevel").find(".rw-input").text("");
          $("#triggerOperationOrderSla").find(".rw-input").text("");
          $("#triggerOperationFlowType").find(".rw-input").text("");
        }
        else{
            setTimeout(function(){
              document.getElementById('publicMessageModelTitle').innerHTML = "提示";
              document.getElementById('publicMessageModalcontent').innerHTML = "已经存在工单。";
              $('#publicMessageModal').modal('show');
            },100);
        }
    },

    handleOnClickSearchBoxTypeRadio: function(e) {
        const { dispatch, monitorGroupId, searchAreaData, monitorTree2, monitorName, tearmAllMAPData } = this.props;
        // var _this = this;
        // setTimeout(function () {
            var name, treeNodeType, groupId;
            switch (e.target.value) {
                case "1":
                    name = "摄像机";
                    treeNodeType = "vedio";
                    break;
                case "2":
                    name = "DVR";
                    treeNodeType = "dvr";
                    break;
                case "3":
                    name = "NVR";
                    treeNodeType = "nvr";
                    break;
                case "4":
                    name = "编码器";
                    treeNodeType = "code";
                    break;
                case "5":
                    name = "IPSAN";
                    treeNodeType = "ipsan";
                    break;
                default:
                    name = "摄像机";
                    treeNodeType = "vedio";
                    break;
            }
            var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
            var nodes = treeObj.transformToArray(treeObj.getNodes());
            for(var i = 0; i < nodes.length; i++) {
                if(nodes[i].id == monitorGroupId) {
                    for(var j = 0; j < nodes.length; j++) {
                        if(nodes[j].pid == nodes[i].pid && nodes[j].type == treeNodeType) {
                            if(nodes[j].pid == searchAreaData.id) {
                                treeObj.selectNode(nodes[j]);
                                monitorTree2.setState({curNode:nodes[j]});
                            }
                            groupId = nodes[j].id;
                            break;
                        }
                    }
                    break;
                }
            }
            var filter = [{key:"SELECTGROUP",value:searchAreaData.id}, {key:"GROUPID",value:groupId}, {key:"NAME",value:name}, {key:"TYPE",value:e.target.value}];
            dispatch(deviceMonitorActions.setMonitorTableFilter(filter.slice(0)));
            filter.push({key:"FROM", value:0});
            filter.push({key:"TO", value:20});
            dispatch(deviceMonitorActions.getGroupListData(filter));
            document.getElementById("fixed-monitorTable-pagination").style.display = "block";
            $('#monitorTable').bootstrapTable('refreshOptions', {
                pagination: false
            });
            // var filter2 = [{key:"GROUPID",value:_this.state.itoss_Monitor.MonitorGroupId},{key:"TYPE",value:e.target.value},{bSearchBox_monitorType:"true",groupName:name}];
            // yftDeviceMonitorAction.get_TearmListData(filter2);
            dispatch(deviceMonitorActions.setMonitorGroupId(groupId));
            dispatch(deviceMonitorActions.setMonitorName(monitorName.substring(0, monitorName.lastIndexOf("-")) + "-" + name + "(" + (tearmAllMAPData.good+tearmAllMAPData.warning).toString() + "/" + tearmAllMAPData.sum + ")"));
            dispatch(deviceMonitorActions.setMonitorTableCurrentPage(1));
            dispatch(deviceMonitorActions.setMonitorTableNumPerPage(20));
            dispatch(deviceMonitorActions.setMonitorFilterStatus("all"));
        // }, 100);
    },

    handleOnClickSearchBoxFilterBtn: function(e) {
        const { dispatch, monitorTableNumPerPage, monitorType, searchAreaData, monitorGroupId, monitorFilterStatus } = this.props;
        dispatch(deviceMonitorActions.setMonitorTableCurrentPage(1));
        var showStart = 0;
        var showEnd = 1*monitorTableNumPerPage;
        var monitorName;
        switch (monitorType) {
            case "1":
                monitorName = "摄像机";
                break;
            case "2":
                monitorName = "DVR";
                break;
            case "3":
                monitorName = "NVR";
                break;
            case "4":
                monitorName = "编码器";
                break;
            case "5":
                monitorName = "IPSAN";
                break;
            default:
                monitorName = "摄像机";
                break;
        }
        var filter = [
            {key:"SELECTGROUP",value:searchAreaData.id},
            {key:"GROUPID", value:monitorGroupId},
            {key:"NAME", value:monitorName},
            {key:"TYPE", value:monitorType}
        ];

        switch (e.currentTarget.id){
            case "monitorTableFilter_all_btn":
                dispatch(deviceMonitorActions.setMonitorFilterStatus("all"));
                break;
            case "monitorTableFilter_good_btn":
                if(monitorFilterStatus != "good") {
                    dispatch(deviceMonitorActions.setMonitorFilterStatus("good"));
                    filter.push({key:"STATUS", value:"good"});
                }
                else {
                    dispatch(deviceMonitorActions.setMonitorFilterStatus("all"));
                }
                break;
            case "monitorTableFilter_warning_btn":
                if(monitorFilterStatus != "warning") {
                    dispatch(deviceMonitorActions.setMonitorFilterStatus("warning"));
                    filter.push({key:"STATUS", value:"warning"});
                }
                else {
                    dispatch(deviceMonitorActions.setMonitorFilterStatus("all"));
                }
                break;
            case "monitorTableFilter_error_btn":
                if(monitorFilterStatus != "error") {
                    dispatch(deviceMonitorActions.setMonitorFilterStatus("error"));
                    filter.push({key:"STATUS", value:"error"});
                }
                else {
                    dispatch(deviceMonitorActions.setMonitorFilterStatus("all"));
                }
                break;
        }
        dispatch(deviceMonitorActions.setMonitorTableFilter(filter.slice(0)));
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        dispatch(deviceMonitorActions.getGroupListData(filter));
        document.getElementById("fixed-monitorTable-pagination").style.display = "block";
        $('#monitorTable').bootstrapTable('refreshOptions', {
            pagination: false
        });
    },

    handleOnClickMonitorTableBoxSearch: function() {
        const { dispatch, settingSearchAreaData, searchAreaData, monitorFilterStatus, monitorGroupId, deviceMonitorTreeData, tearmAllMAPData, monitorTree2 } = this.props;
        // var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
        // var yftDeviceMonitorStoreState = this.getFlux().store("YFTDeviceMonitorStore").getState();
        // var yftDeviceMonitorTreeStoreState = this.getFlux().store("YFTDeviceMonitorTreePageStore").getState();
        var baseSearch = "";
        if(settingSearchAreaData != searchAreaData) {
            var monitorType;
            switch (this.props.monitorType) {
                case "1":
                    monitorType = "vedio";
                    break;
                case "2":
                    monitorType = "dvr";
                    break;
                case "3":
                    monitorType = "nvr";
                    break;
                case "4":
                    monitorType = "code";
                    break;
                case "5":
                    monitorType = "ipsan";
                    break;
            }

            if($.trim(document.getElementById('quickSearchInput').value) != "") {
                switch (document.getElementById('quickSearchType').childNodes[1].innerText) {
                    case "IP地址":
                        if(this.props.monitorType == "1") {
                            baseSearch = "e.IPADDRESS like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                        }
                        else {
                            baseSearch = "e.SERVERIP like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                        }
                        break;
                    case "设备名称":
                        if(this.props.monitorType == "1") {
                            baseSearch = "e.VIDEONAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                        }
                        else {
                            baseSearch = "e.SERVERNAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                        }
                        break;
                }
            }

            var _this = this;
            // setTimeout(function () {
                var flag = false;
                for(var i = 0; i < deviceMonitorTreeData.length; i++) {
                    if(deviceMonitorTreeData[i].type == monitorType && deviceMonitorTreeData[i].pid == settingSearchAreaData.id) {
                        flag = true;
                        var filter = [
                            {key:"SELECTGROUP", value:deviceMonitorTreeData[i].pid},
                            {key:"GROUPID", value:deviceMonitorTreeData[i].id},
                            {key:"NAME", value:deviceMonitorTreeData[i].name.substring(0, deviceMonitorTreeData[i].name.indexOf("("))},
                            {key:"TYPE", value:this.props.monitorType}
                        ];
                        if(baseSearch != "") {
                            filter.push({key:"BASESEARCH", value:baseSearch});
                        }
                        if(monitorFilterStatus != "all") {
                            filter.push({key:"STATUS", value:monitorFilterStatus});
                        }
                        dispatch(deviceMonitorActions.setMonitorTableFilter(filter.slice(0)));
                        filter.push({key:"FROM", value:0});
                        filter.push({key:"TO", value:20});
                        dispatch(deviceMonitorActions.getGroupListData(filter));
                        document.getElementById("fixed-monitorTable-pagination").style.display = "block";
                        $('#monitorTable').bootstrapTable('refreshOptions', {
                            pagination: false
                        });
                        // var filter2 = [{key:"GROUPID", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id}, {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}];
                        // yftDeviceMonitorAction.get_TearmListData(filter2);
                        dispatch(deviceMonitorActions.setMonitorGroupId(deviceMonitorTreeData[i].id));
                        dispatch(deviceMonitorActions.setMonitorName(settingSearchAreaData.name.substring(0, settingSearchAreaData.name.indexOf("(")) + "-" + deviceMonitorTreeData[i].name));
                        dispatch(deviceMonitorActions.setSearchAreaData(settingSearchAreaData));
                        dispatch(deviceMonitorActions.setMonitorTableCurrentPage(1));
                        dispatch(deviceMonitorActions.setMonitorTableNumPerPage(20));

                        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
                        var nodes = treeObj.transformToArray(treeObj.getNodes());
                        if(nodes.length > 0) {
                            for(var j = 0; j < nodes.length; j++) {
                                if(nodes[j].id == deviceMonitorTreeData[i].id) {
                                    treeObj.selectNode(nodes[j]);
                                    monitorTree2.setState({curNode:nodes[j]});
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }

                if(!flag) {
                    var name;
                    switch (this.props.monitorType) {
                        case "1":
                            name = "摄像机";
                            break;
                        case "2":
                            name = "DVR";
                            break;
                        case "3":
                            name = "NVR";
                            break;
                        case "4":
                            name = "编码器";
                            break;
                        case "5":
                            name = "IPSAN";
                            break;
                        default:
                            name = "摄像机";
                            break;
                    }

                    var filter = [
                        {key:"SELECTGROUP", value:settingSearchAreaData.id},
                        {key:"GROUPID", value:monitorGroupId},
                        {key:"NAME", value:name},
                        {key:"TYPE", value:this.props.monitorType}
                    ];
                    if(baseSearch != "") {
                        filter.push({key:"BASESEARCH", value:baseSearch});
                    }
                    if(monitorFilterStatus != "all") {
                        filter.push({key:"STATUS", value:monitorFilterStatus});
                    }
                    dispatch(deviceMonitorActions.setMonitorTableFilter(filter.slice(0)));
                    filter.push({key:"FROM", value:0});
                    filter.push({key:"TO", value:20});
                    dispatch(deviceMonitorActions.getGroupListData(filter));
                    document.getElementById("fixed-monitorTable-pagination").style.display = "block";
                    $('#monitorTable').bootstrapTable('refreshOptions', {
                        pagination: false
                    });
                    // var filter2 = [{key:"GROUPID", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id}, {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}];
                    // yftDeviceMonitorAction.get_TearmListData(filter2);
                    dispatch(deviceMonitorActions.setMonitorName(settingSearchAreaData.name.substring(0, settingSearchAreaData.name.indexOf("(")) + "-" + name + "(" + (tearmAllMAPData.good+tearmAllMAPData.warning).toString() + "/" + tearmAllMAPData.sum + ")"));
                    dispatch(deviceMonitorActions.setSearchAreaData(settingSearchAreaData));
                    dispatch(deviceMonitorActions.setMonitorTableCurrentPage(1));
                    dispatch(deviceMonitorActions.setMonitorTableNumPerPage(20));
                }
            // }, 100);
        }
        else {
            if($.trim(document.getElementById('quickSearchInput').value) != "") {
                switch (document.getElementById('quickSearchType').childNodes[1].innerText) {
                    case "IP地址":
                        if(this.props.monitorType == "1") {
                            baseSearch = "e.IPADDRESS like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                        }
                        else {
                            baseSearch = "e.SERVERIP like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                        }
                        break;
                    case "设备名称":
                        if(this.props.monitorType == "1") {
                            baseSearch = "e.VIDEONAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                        }
                        else {
                            baseSearch = "e.SERVERNAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
                        }
                        break;
                }
            }
            var monitorName;
            switch (this.props.monitorType) {
                case "1":
                    monitorName = "摄像机";
                    break;
                case "2":
                    monitorName = "DVR";
                    break;
                case "3":
                    monitorName = "NVR";
                    break;
                case "4":
                    monitorName = "编码器";
                    break;
                case "5":
                    monitorName = "IPSAN";
                    break;
                default:
                    monitorName = "摄像机";
                    break;
            }
            var filter = [
                {key:"SELECTGROUP", value:searchAreaData.id},
                {key:"GROUPID", value:monitorGroupId},
                {key:"NAME", value:monitorName},
                {key:"TYPE", value:this.props.monitorType}
            ];
            if(baseSearch != "") {
                filter.push({key:"BASESEARCH", value:baseSearch});
            }
            if(monitorFilterStatus != "all") {
                filter.push({key:"STATUS", value:monitorFilterStatus});
            }
            dispatch(deviceMonitorActions.setMonitorTableFilter(filter.slice(0)));
            filter.push({key:"FROM", value:0});
            filter.push({key:"TO", value:20});
            dispatch(deviceMonitorActions.getGroupListData(filter));
            document.getElementById("fixed-monitorTable-pagination").style.display = "block";
            $('#monitorTable').bootstrapTable('refreshOptions', {
                pagination: false
            });
            dispatch(deviceMonitorActions.setMonitorTableCurrentPage(1));
            dispatch(deviceMonitorActions.setMonitorTableNumPerPage(20));
        }
    },

    render: function() {
        const { dispatch, monitorName, monitorType, monitorFilterStatus, tearmAllMAPData, groupAllColumnData, groupTableData, groupTableCount,
                monitorTableNumPerPage, monitorTableCurrentPage, monitorTableFilter, settingSearchAreaData, areaData, monitorTableSelectedRowData, bShowVideoLossTab,
                videoLossData, channelInfoData, sipid } = this.props;
        return (
            <div id="monitorTableView" className='overviewDesViewDiv'>
                <FieldSettingModal groupAllColumnData={groupAllColumnData} set_MonitorTableColumns={monitorTableColumns=>dispatch(deviceMonitorActions.setMonitorTableColumns(monitorTableColumns))}/>
                <AdvancedSearchModal monitorType={monitorType} onClickOk={this.handleOnClickAdvancedSearchModalOK}/>
                <DeviceInfoModal monitorType={monitorType} monitorTableSelectedRowData={monitorTableSelectedRowData} bShowVideoLossTab={bShowVideoLossTab} groupAllColumnData={groupAllColumnData}
                    videoLossData={videoLossData} channelInfoData={channelInfoData}
                    set_sipid={sipid=>dispatch(deviceMonitorActions.setSipid(sipid))} onTouchWorkOrder={this.handleOnTouchWorkOrder}/>
                <ImageLinkModal monitorTableSelectedRowData={monitorTableSelectedRowData}/>
                <VideoLinkModal sipid={sipid}/>
                <FeedbackModal monitorTableSelectedRowData={monitorTableSelectedRowData} setUserFeedback={param=>dispatch(deviceMonitorActions.setUserFeedback(param))}/>
                <FeedbackRestoreModal monitorTableSelectedRowData={monitorTableSelectedRowData} setUserFeedbackReset={param=>dispatch(deviceMonitorActions.setUserFeedbackReset(param))}/>
                <FeedbackRestoreAllModal groupTableData={groupTableData} setUserFeedbackReset={param=>dispatch(deviceMonitorActions.setUserFeedbackReset(param))}/>
                <TriggerOperationModal />
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        {monitorName}
                    </div>
                    <div className="titleRight">
                        <a className="backSpaceText" onClick={this._handleOnClickGoBack}>返回上一级</a>
                        <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                        <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                    </div>
                </div>
                <SearchBox monitorType={monitorType} monitorFilterStatus={monitorFilterStatus} tearmAllMAPData={tearmAllMAPData}
                    onClickTypeRadio={this.handleOnClickSearchBoxTypeRadio} onClickFilterBtn={this.handleOnClickSearchBoxFilterBtn}/>
                <MonitorTableBox groupAllColumnData={groupAllColumnData} groupTableData={groupTableData} monitorType={monitorType} groupTableCount={groupTableCount} monitorTableNumPerPage={monitorTableNumPerPage}
                    monitorTableCurrentPage={monitorTableCurrentPage} monitorTableFilter={monitorTableFilter} settingSearchAreaData={settingSearchAreaData} areaData={areaData}
                    set_MonitorTableSelectedRowData={row=>dispatch(deviceMonitorActions.setMonitorTableSelectedRowData(row))} get_videoLoss={filter=>dispatch(deviceMonitorActions.get_videoLoss(filter))}
                    get_channelInfo={filter=>dispatch(deviceMonitorActions.get_channelInfo(filter))} set_sipid={sipid=>dispatch(deviceMonitorActions.setSipid(sipid))}
                    set_showVideoLossTab={bShowVideoLossTab=>dispatch(deviceMonitorActions.setbShowVideoLossTab(bShowVideoLossTab))} set_SettingSearchAreaData={settingSearchAreaData=>dispatch(deviceMonitorActions.setSettingSearchAreaData(settingSearchAreaData))}
                    get_GroupListData={filter=>dispatch(deviceMonitorActions.getGroupListData(filter))} set_monitorTableNumPerPage={monitorTableNumPerPage=>dispatch(deviceMonitorActions.setMonitorTableNumPerPage(monitorTableNumPerPage))}
                    set_monitorTableCurrentPage={monitorTableCurrentPage=>dispatch(deviceMonitorActions.setMonitorTableCurrentPage(monitorTableCurrentPage))} onClickSearch={this.handleOnClickMonitorTableBoxSearch}/>
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('monitorTableView') != null) {
        document.getElementById('monitorTableView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = MonitorTableView;
MonitorTableView.propTypes = {
	monitorTableFilter: PropTypes.array.isRequired,
	bClickTreeNode: PropTypes.bool.isRequired,
    monitorGroupId: PropTypes.string.isRequired,
    monitorTree2: PropTypes.object,
    pieChartMonitorType: PropTypes.string.isRequired,
    monitorName: PropTypes.string.isRequired,
    monitorType: PropTypes.string.isRequired,
    monitorFilterStatus: PropTypes.string.isRequired,
    // tearmAllMAPData: PropTypes.object,
    searchAreaData: PropTypes.object,
    monitorTableNumPerPage: PropTypes.number.isRequired,
    groupAllColumnData: PropTypes.array.isRequired,
    groupTableData: PropTypes.array.isRequired,
    groupTableCount: PropTypes.number.isRequired,
    monitorTableCurrentPage: PropTypes.number.isRequired,
    settingSearchAreaData: PropTypes.object,
    areaData: PropTypes.array.isRequired,
    deviceMonitorTreeData: PropTypes.array.isRequired,
	monitorTableSelectedRowData: PropTypes.object,
	bShowVideoLossTab: PropTypes.bool.isRequired,
	isCreateWorkOrder: PropTypes.string.isRequired,
    videoLossData: PropTypes.array.isRequired,
    channelInfoData: PropTypes.array.isRequired,
    sipid: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { monitorTableFilter, bClickTreeNode, monitorGroupId, monitorTree2, pieChartMonitorType, monitorName, monitorType, monitorFilterStatus, tearmAllMAPData,
            searchAreaData, monitorTableNumPerPage, groupAllColumnData, groupTableData, groupTableCount, monitorTableCurrentPage, settingSearchAreaData,
            monitorTableSelectedRowData, bShowVideoLossTab, isCreateWorkOrder, videoLossData, channelInfoData, sipid } = state.deviceMonitorReducer
    const { areaData, deviceMonitorTreeData } = state.deviceMonitorTreeReducer

    return {
		monitorTableFilter,
        bClickTreeNode,
        monitorGroupId,
        monitorTree2,
        pieChartMonitorType,
        monitorName,
        monitorType,
        monitorFilterStatus,
        tearmAllMAPData,
        searchAreaData,
        monitorTableNumPerPage,
        groupAllColumnData,
        groupTableData,
        groupTableCount,
        monitorTableCurrentPage,
        settingSearchAreaData,
        areaData,
        deviceMonitorTreeData,
        monitorTableSelectedRowData,
        bShowVideoLossTab,
        isCreateWorkOrder,
        videoLossData,
        channelInfoData,
        sipid
    }
}

export default connect(mapStateToProps)(MonitorTableView)
