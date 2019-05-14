/**
* tianzhuo.nie  2015/12/11.
* 资源监测-统一监控平台-资源子组列表
 */
require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
// import { setMonitorName, setMonitorView, setGetTearmListDataType, setMonitorGroupId, getTearmListData } from '../../../../actions/deviceMonitor_action'
// import { getGroupAllData, setbClickTreeNode, setEquipmentId, setGroupInfoFilterStatus } from '../../../../actions/equipment_action'
import * as deviceMonitorActions from '../../../../actions/deviceMonitor_action'
import * as equipmentActions from '../../../../actions/equipment_action'

function getgroupStatusImgUrl(status) {
    var imgUrl = '';
    switch (status) {
        case 'good':
            imgUrl = 'img/itoss/groupok.png';
            break;
        case 'warning':
            imgUrl = 'img/itoss/groupwarning.png';
            break;
        case 'error':
            imgUrl = 'img/itoss/grouperror.png';
            break;
        case 'disabled':
            imgUrl = 'img/itoss/groupdisable.png';
            break;
        case 'nodata':
            imgUrl = 'img/itoss/groupnodata.png';
            break;
        default:
            imgUrl = 'img/itoss/groupnodata.png';
            break;
    }
    return imgUrl;
}

function getresourceStatusImgUrl(status) {
    var imgUrl = '';
    switch (status) {
        case 'good':
            imgUrl = 'img/itoss/entityok.png';
            break;
        case 'warning':
            imgUrl = 'img/itoss/entitywarning.png';
            break;
        case 'error':
            imgUrl = 'img/itoss/entityerror.png';
            break;
        case 'disabled':
            imgUrl = 'img/itoss/entitydisable.png';
            break;
        case 'nodata':
            imgUrl = 'img/itoss/entitynodata.png';
            break;
        default:
            imgUrl = 'img/itoss/entitynodata.png';
            break;
    }
    return imgUrl;
}

function groupStatusFormatter(value, row) {
    var imgUrl = getgroupStatusImgUrl(row.status);
    return [
        '<img src="' + imgUrl + '" width="15px" height="15px"/>'
    ].join('');
}

function resourceStatusFormatter(value, row) {
    var imgUrl = getresourceStatusImgUrl(row.status);
    return [
        '<img src="' + imgUrl + '" width="15px" height="15px"/>'
    ].join('');
}

var GroupInfoView_desView = React.createClass({
    // mixins: [History],
    componentDidUpdate: function() {
        const { groupInfoFilterStatus, subGroups, equipments, groupId } = this.props;
        var SubGroups = [];
        if(groupInfoFilterStatus == "all") {
            SubGroups = subGroups;
        }
        else {
            for(var i = 0; i < subGroups.length; i++) {
                if(subGroups[i].status == groupInfoFilterStatus) {
                    SubGroups.push(subGroups[i]);
                }
            }
        }
        $('#subGroupTable').bootstrapTable('refreshOptions', {data: SubGroups});

        var Equipments = [];
        if(groupInfoFilterStatus == "all") {
            Equipments = equipments;
        }
        else {
            for(var i = 0; i < equipments.length; i++) {
                if(equipments[i].status == groupInfoFilterStatus) {
                    Equipments.push(equipments[i]);
                }
            }
        }
        $('#resourcesTable').bootstrapTable('refreshOptions', {data: Equipments});

        if(SubGroups.length == 0) {
            document.getElementById("collapseAssetStatus").className = "panel-collapse collapse";
            document.getElementById("collapseAssetStatus").ariaExpanded = "false";
        }
        else {
            document.getElementById("collapseAssetStatus").className = "panel-collapse collapse in";
            document.getElementById("collapseAssetStatus").ariaExpanded = "true";
            document.getElementById("collapseAssetStatus").style.height = "auto";
        }

        if(Equipments.length == 0) {
            document.getElementById("collapseRanking").className = "panel-collapse collapse";
            document.getElementById("collapseRanking").ariaExpanded = "false";
        }
        else {
            document.getElementById("collapseRanking").className = "panel-collapse collapse in";
            document.getElementById("collapseRanking").ariaExpanded = "true";
            document.getElementById("collapseRanking").style.height = "auto";
        }

        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var i = 0; i < nodes.length; i++) {
            if(nodes[i].id == groupId) {
                var bHasParent = false;
                for(var j = 0; j < nodes.length; j++) {
                    if(nodes[j].id == nodes[i].pid) {
                        bHasParent = true;
                        document.getElementById("groupInfoView_desView_GoBack").style.display = "inline-block";
                        break;
                    }
                }
                if(!bHasParent) {
                    document.getElementById("groupInfoView_desView_GoBack").style.display = "none";
                }
                break;
            }
        }
    },

    componentDidMount: function() {
        const { groupInfoFilterStatus, subGroups, equipments, groupId } = this.props;
        if(document.getElementById('groupInfoView') != null) {
            document.getElementById('groupInfoView').style.height = $(window).height() - 110 - 30 + 'px';
        }

        switch (groupInfoFilterStatus) {
            case "all":
                document.getElementById('filter_all_btn').className = 'btn btn-default btnNoShadow btnAll active';
                document.getElementById('filter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('filter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('filter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('filter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "good":
                document.getElementById('filter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('filter_good_btn').className = 'btn btn-default btnNoShadow btnGood active';
                document.getElementById('filter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('filter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('filter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "warning":
                document.getElementById('filter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('filter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('filter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning active';
                document.getElementById('filter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('filter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "error":
                document.getElementById('filter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('filter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('filter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('filter_error_btn').className = 'btn btn-default btnNoShadow btnError active';
                document.getElementById('filter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "disabled":
                document.getElementById('filter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('filter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('filter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('filter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('filter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable active';
                break;
        }

        var SubGroups = [];
        if(groupInfoFilterStatus == "all") {
            SubGroups = subGroups;
        }
        else {
            for(var i = 0; i < subGroups.length; i++) {
                if(subGroups[i].status == groupInfoFilterStatus) {
                    SubGroups.push(subGroups[i]);
                }
            }
        }
        $('#subGroupTable').bootstrapTable({
            columns: [
                {
                    title: '状态',
                    field: 'status',
                    halign: 'center',
                    align: 'center',
                    formatter: groupStatusFormatter
                }, {
                    title: '组名',
                    field: 'name',
                    halign: 'left',
                    align: 'left'
                }, {
                    title: '资源',
                    field: 'eqcount',
                    halign: 'center',
                    align: 'center'
                }, {
                    title: '正常资源',
                    field: 'eqgood',
                    halign: 'center',
                    align: 'center'
                }, {
                    title: '错误资源',
                    field: 'eqerror',
                    halign: 'center',
                    align: 'center'
                }, {
                    title: '监测器',
                    field: 'mcount',
                    halign: 'center',
                    align: 'center'
                }, {
                    title: '正常监测器',
                    field: 'mgood',
                    halign: 'center',
                    align: 'center'
                }, {
                    title: '危险监测器',
                    field: 'mwarning',
                    halign: 'center',
                    align: 'center'
                }, {
                    title: '错误监测器',
                    field: 'merror',
                    halign: 'center',
                    align: 'center'
                }, {
                    title: '禁止监测器',
                    field: 'mdiabled',
                    halign: 'center',
                    align: 'center'
                }, {
                    title: '最后状态修改时间',
                    field: 'lasttime',
                    halign: 'center',
                    align: 'center'
                }
            ],
            data: SubGroups,
            onClickRow: this.clickSubGroupTableRow
        });

        var Equipments = [];
        if(groupInfoFilterStatus == "all") {
            Equipments = equipments;
        }
        else {
            for(var i = 0; i < equipments.length; i++) {
                if(equipments[i].status == groupInfoFilterStatus) {
                    Equipments.push(equipments[i]);
                }
            }
        }
        $('#resourcesTable').bootstrapTable({
            columns: [
                {
                    title: '状态',
                    field: 'status',
                    halign: 'center',
                    align: 'center',
                    formatter: resourceStatusFormatter
                }, {
                    title: 'IP地址',
                    field: 'ip',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }, {
                    title: '名称',
                    field: 'name',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }, {
                    title: '资源类型',
                    field: 'type',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }, {
                    title: '监测器',
                    field: 'mcount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '正常监测器',
                    field: 'mgood',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '危险监测器',
                    field: 'mwarning',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '错误监测器',
                    field: 'merror',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '禁止监测器',
                    field: 'mdisabled',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '最后状态修改时间',
                    field: 'lasttime',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }
            ],
            data: Equipments,
            onClickRow: this.clickResourcesTableRow
        });

        if(SubGroups.length == 0) {
            document.getElementById("collapseAssetStatus").className = "panel-collapse collapse";
            document.getElementById("collapseAssetStatus").ariaExpanded = "false";
        }
        else {
            document.getElementById("collapseAssetStatus").className = "panel-collapse collapse in";
            document.getElementById("collapseAssetStatus").ariaExpanded = "true";
            document.getElementById("collapseAssetStatus").style.height = "auto";
        }

        if(Equipments.length == 0) {
            document.getElementById("collapseRanking").className = "panel-collapse collapse";
            document.getElementById("collapseRanking").ariaExpanded = "false";
        }
        else {
            document.getElementById("collapseRanking").className = "panel-collapse collapse in";
            document.getElementById("collapseRanking").ariaExpanded = "true";
            document.getElementById("collapseRanking").style.height = "auto";
        }

        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var i = 0; i < nodes.length; i++) {
            if(nodes[i].id == groupId) {
                var bHasParent = false;
                for(var j = 0; j < nodes.length; j++) {
                    if(nodes[j].id == nodes[i].pid) {
                        bHasParent = true;
                        document.getElementById("groupInfoView_desView_GoBack").style.display = "inline-block";
                        break;
                    }
                }
                if(!bHasParent) {
                    document.getElementById("groupInfoView_desView_GoBack").style.display = "none";
                }
                break;
            }
        }
    },

    clickSubGroupTableRow: function(row, element) {
        const { dispatch, monitorTree2 } = this.props;
        // var _this = this;
        // setTimeout(function () {
            // _this.getFlux().actions.YFTEquipmentActions.get_GroupAllData(row.id);
            // _this.getFlux().actions.YFTDeviceMonitorActions.set_MonitorName(row.name);
            // _this.getFlux().actions.YFTDeviceMonitorActions.set_MonitorView(3);
            dispatch(equipmentActions.getGroupAllData(row.id));
            dispatch(deviceMonitorActions.setMonitorName(row.name));
            dispatch(deviceMonitorActions.setMonitorView(3));
        // }, 100);

        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var i = 0; i < nodes.length; i++) {
            if(nodes[i].id == row.id) {
                treeObj.selectNode(nodes[i]);
                // this.state.itoss_Monitor.MonitorTree2.setState({curNode:nodes[i]});
                monitorTree2.setState({curNode:nodes[i]});
                break;
            }
        }
    },

    clickResourcesTableRow: function(row, element) {
        const { dispatch, monitorTree2 } = this.props;
        // var _this = this;
        setTimeout(function () {
            // _this.getFlux().actions.YFTEquipmentActions.set_equipmentParam_1({bClickTreeNode: true, equipmentId: row.id});
            // // _this.getFlux().actions.YFTEquipmentActions.get_equipmentAllData(row.id);
            // _this.getFlux().actions.YFTDeviceMonitorActions.set_monitorParam_4({monitorName: row.name, monitorView: 4});
            dispatch(equipmentActions.setbClickTreeNode(true));
            dispatch(equipmentActions.setEquipmentId(row.id));
            dispatch(equipmentActions.getEquipmentAllData(row.id));
            dispatch(deviceMonitorActions.setMonitorName(row.name));
            dispatch(deviceMonitorActions.setMonitorView(4));
        }, 100);

        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var i = 0; i < nodes.length; i++) {
            if(nodes[i].id == row.id) {
                treeObj.selectNode(nodes[i]);
                // this.state.itoss_Monitor.MonitorTree2.setState({curNode:nodes[i]});
                monitorTree2.setState({curNode:nodes[i]});
                break;
            }
        }
    },

    _handleOnClickGoBack: function() {
        const { dispatch, groupId, monitorTree2, pieChartMonitorType } = this.props;
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var i = 0; i < nodes.length; i++) {
            if(nodes[i].id == groupId) {
                for(var j = 0; j < nodes.length; j++) {
                    if(nodes[j].id == nodes[i].pid) {
                        treeObj.selectNode(nodes[j]);
                        // this.state.itoss_Monitor.MonitorTree2.setState({curNode:nodes[j]});
                        monitorTree2.setState({curNode:nodes[j]});
                        if(nodes[j].type=="organize" || nodes[j].type=="other") {
                            // var filter = [{key:"GROUPID",value:nodes[j].id},{key:"TYPE",value:this.getFlux().store("YFTDeviceMonitorStore").getState().PieChartMonitorType}];
                            // this.getFlux().actions.YFTDeviceMonitorActions.set_monitorParam_3({getTearmListDataType: 0, groupId: nodes[j].id, monitorName: nodes[j].name, monitorView: 1});
                            // this.getFlux().actions.YFTDeviceMonitorActions.get_TearmListData(filter);
                            var filter = [{key:"GROUPID",value:nodes[j].id},{key:"TYPE",value:pieChartMonitorType}];
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

    _handleOnClickFilterStatus: function (e) {
        const { dispatch } = this.props;
        switch (e.currentTarget.id){
            case "filter_all_btn":
                // this.getFlux().actions.YFTEquipmentActions.set_GroupInfoFilterStatus("all");
                dispatch(equipmentActions.setGroupInfoFilterStatus("all"));
                document.getElementById('filter_all_btn').className = 'btn btn-default btnNoShadow btnAll active';
                document.getElementById('filter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('filter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('filter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('filter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "filter_good_btn":
                // this.getFlux().actions.YFTEquipmentActions.set_GroupInfoFilterStatus("good");
                dispatch(equipmentActions.setGroupInfoFilterStatus("good"));
                document.getElementById('filter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('filter_good_btn').className = 'btn btn-default btnNoShadow btnGood active';
                document.getElementById('filter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('filter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('filter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "filter_warning_btn":
                // this.getFlux().actions.YFTEquipmentActions.set_GroupInfoFilterStatus("warning");
                dispatch(equipmentActions.setGroupInfoFilterStatus("warning"));
                document.getElementById('filter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('filter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('filter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning active';
                document.getElementById('filter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('filter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "filter_error_btn":
                // this.getFlux().actions.YFTEquipmentActions.set_GroupInfoFilterStatus("error");
                dispatch(equipmentActions.setGroupInfoFilterStatus("error"));
                document.getElementById('filter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('filter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('filter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('filter_error_btn').className = 'btn btn-default btnNoShadow btnError active';
                document.getElementById('filter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "filter_disable_btn":
                // this.getFlux().actions.YFTEquipmentActions.set_GroupInfoFilterStatus("disabled");
                dispatch(equipmentActions.setGroupInfoFilterStatus("disabled"));
                document.getElementById('filter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('filter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('filter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('filter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('filter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable active';
                break;
        }
    },

    render: function() {
        const { monitorName, equipments, status } = this.props;
        return (
    		<div id="groupInfoView" className="overviewDesViewDiv groupInfoView">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        {monitorName}
                    </div>
                    <div className="titleRight">
                        <a id="groupInfoView_desView_GoBack" className="backSpaceText" onClick={this._handleOnClickGoBack}>返回上一级</a>
                        <div className="btn-group" role="group" aria-label="...">
                            <button type="button" className="btn btn-default" title="资源数"><img src="img/itoss/resource.png" className="statusImg"/>&nbsp;资源({equipments.length})</button>
                            <button id="filter_all_btn" type="button" className="btn btn-default btnNoShadow btnAll" title="监测器数量" onClick={this._handleOnClickFilterStatus}><img src="img/itoss/monitor.png" className="statusImg"/>&nbsp;监测器({status[0]})</button>
                            <button id="filter_good_btn" type="button" className="btn btn-default btnNoShadow btnGood" title="正常监测器数" onClick={this._handleOnClickFilterStatus}><img src="img/itoss/monitorgood.png" className="statusImg"/>&nbsp;正常({status[1]})</button>
                            <button id="filter_warning_btn" type="button" className="btn btn-default btnNoShadow btnWarning" title="危险监测器数" onClick={this._handleOnClickFilterStatus}><img src="img/itoss/monitorwarning.png" className="statusImg"/>&nbsp;危险({status[3]})</button>
                            <button id="filter_error_btn" type="button" className="btn btn-default btnNoShadow btnError" title="错误监测器数" onClick={this._handleOnClickFilterStatus}><img src="img/itoss/monitorerror.png" className="statusImg"/>&nbsp;错误({status[2]})</button>
                            <button id="filter_disable_btn" type="button" className="btn btn-default btnNoShadow btnDisable" title="禁止监测器数" onClick={this._handleOnClickFilterStatus}><img src="img/itoss/monitordisable.png" className="statusImg"/>&nbsp;禁止({status[4]})</button>
                            <button type="button" className="btn btn-default" title="列表视图" disabled="disabled" style={{display:"none"}}><i className="glyphicon glyphicon-th-list"></i></button>
                            <button type="button" className="btn btn-default" title="图标视图" disabled="disabled" style={{display:"none"}}><i className="glyphicon glyphicon-th-large"></i></button>
                            <button type="button" className="btn btn-default" title="树状视图" disabled="disabled" style={{display:"none"}}><img src="img/itoss/tree.png" width="12px" height="12px"/></button>
                        </div>
                    </div>
                </div>
                <div className = "subGroupPanel col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingAssetStatus">
                            <div className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseAssetStatus" aria-expanded="true" aria-controls="collapseAssetStatus">
                                    子组
                                </a>
                            </div>
                        </div>
                        <div id="collapseAssetStatus" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingAssetStatus">
                            <div className="panel-body">
                                <table id='subGroupTable'
                                       data-toggle='table'
                                       data-classes='table table-no-bordered table-striped table-hover'>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "resourcesPanel col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingRanking">
                            <div className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseRanking" aria-expanded="true" aria-controls="collapseRanking">
                                    资源
                                </a>
                            </div>
                        </div>
                        <div id="collapseRanking" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingRanking">
                            <div className="panel-body groupMonitorViewTableBox">
                                <table id='resourcesTable'
                                       data-toggle='table'
                                       data-classes='table table-no-bordered table-striped table-hover'
                                       data-show-export="true"
                                       data-show-columns='true'>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('groupInfoView') != null) {
        document.getElementById('groupInfoView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = GroupInfoView_desView;
GroupInfoView_desView.propTypes = {
    monitorName: PropTypes.string.isRequired,
    pieChartMonitorType: PropTypes.string.isRequired,
    monitorTree2: PropTypes.object,
    groupInfoFilterStatus: PropTypes.string.isRequired,
    subGroups: PropTypes.array.isRequired,
    equipments: PropTypes.array.isRequired,
    groupId: PropTypes.string.isRequired,
    status: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { monitorName, pieChartMonitorType, monitorTree2 } = state.deviceMonitorReducer
    const { groupInfoFilterStatus, subGroups, equipments, groupId, status } = state.equipmentReducer

    return {
        monitorName,
        pieChartMonitorType,
        monitorTree2,
        groupInfoFilterStatus,
        subGroups,
        equipments,
        groupId,
        status
    }
}

export default connect(mapStateToProps)(GroupInfoView_desView)
