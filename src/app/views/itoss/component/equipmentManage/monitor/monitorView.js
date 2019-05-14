/**
 * Created by SHIN on 2016/1/7.
 * 资源监测-统一监控平台
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
import { getDeviceMonitorTreeData, getDeviceMonitorTreeDataByType } from '../../../../../actions/deviceMonitorTree_action'
// import {
//     setGetTearmListDataType, getTearmListData, setMonitorGroupId, setMonitorName, setMonitorView, setMonitorTree2, setbClickTreeNode, setSearchAreaData,
//     setSettingSearchAreaData, setMonitorTableCurrentPage, setMonitorTableNumPerPage, setMonitorTableFilter, setMonitorFilterStatus,
// } from '../../../../../actions/deviceMonitor_action'
// import { getGroupAllData, setbClickTreeNode, setEquipmentId, getEquipmentAllData } from '../../../../../actions/equipment_action'
import * as deviceMonitorActions from '../../../../../actions/deviceMonitor_action'
import * as equipmentActions from '../../../../../actions/equipment_action'

var MonitorTree2 = require('../../monitorTree/monitorTree2');
import StatisticalView from './statisticalView';
import MonitorTableView from './monitorTableView';
import GroupInfoView_desView from '../groupInfoView_desView';
import ListView_desView from '../listView_desView';
import CreateResourceModal from '../createResourceModal';
import CreateMonitorModal from '../createMonitorModal';
import ListResourceModal from '../listResourceModal';
import UpdateResourceModal from '../updateResourceModal';
import CreateGroupModal from "../createSubGroupModal"

var refreshTime;
var MonitorView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore","YFTDeviceMonitorTreePageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },
    getInitialState: function() {
        return {
            monitorTreeObj: null,
            bMountMonitorTree: true,
            bMonitorTreeFreshed: false,
            bMonitorTreeFilterChanged: false,
            selectedNodes: [],
            openNodes: []
        }
    },

    componentWillMount: function() {
        const { dispatch } = this.props;
        dispatch(getDeviceMonitorTreeData());
        // this.setState({bMountMonitorTree: true});
    },

    componentDidMount: function() {
        if(document.getElementById('monitorView') != null) {
            document.getElementById('monitorView').style.height = $(window).height() - 110 - 30 + 'px';
        }
    },

    // componentWillReceiveProps(nextProps) {
    shouldComponentUpdate: function(nextProps, nextState) {
        const { dispatch } = this.props;
        if (nextProps.deviceMonitorTreeData !== this.props.deviceMonitorTreeData) {
            if(nextState.bMountMonitorTree) {
                this.setState({bMountMonitorTree: false});
                this.handleMonitorTreeDidMount(nextState.monitorTreeObj, nextProps);
                if(nextProps.navigateFromCreateMonitorViewFlag) {
                    this.handleOnClickMonitorTreeNode(nextProps.selectedNode);

                    var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
                    var nodes = treeObj.transformToArray(treeObj.getNodes());
                    var bInTree = false;
                    for(var i = 0; i < nodes.length; i++) {
                        if(nodes[i].id == nextProps.selectedNode.id) {
                            bInTree = true;
                            treeObj.selectNode(nodes[i]);
                            nextState.monitorTreeObj.setState({curNode:nodes[i]});
                            break;
                        }
                    }
                    if(!bInTree) {
                        treeObj.selectNode(nodes[0]);
                        nextState.monitorTreeObj.setState({curNode:nodes[0]});
                    }

                    dispatch(equipmentActions.setNavigateFromCreateMonitorViewFlag(false));
                }
            }
            if(nextState.bMonitorTreeFreshed) {
                this.setState({bMonitorTreeFreshed: false});
                this.handleRefreshMonitorTree(nextState.monitorTreeObj, nextProps, nextState);
            }
            if(nextState.bMonitorTreeFilterChanged) {
                this.setState({bMonitorTreeFilterChanged: false});
                this.handleFilteMonitorTree(nextState.monitorTreeObj, nextProps);
            }
        }
        return true;
    },

    componentWillUnmount:function(){
        clearInterval(refreshTime);
    },

    handleMonitorTreeDidMount: function(monitorTree, props) {
        const { dispatch, deviceMonitorTreeData, pieChartMonitorType } = props;
        var height = $(window).height() - 110 - 30 + 'px';
        var height2 = $(window).height() - 110 - 30 -22 + 'px';
        $(".leftListDiv").css("height",height);
        $(".monitorTree2").css("height",height2);
        $(".commonTreeDiv").css("height",height2);
        $(".dictTreeDiv").css("height",height2);
        $(".groupZTree").css("height",height2);
        this.initTree(monitorTree, deviceMonitorTreeData);
        monitorTree.hideRightMenu();
        monitorTree.hideRMenu2();

        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        if(nodes.length > 0) {
            treeObj.selectNode(nodes[0]);

            var initialSelectedGroupId = nodes[0].id;
            var initialSelectedGroupName = nodes[0].name;

            if(nodes[0].type=="organize" || nodes[0].type=="other") {
                // setTimeout(function () {
                    var filter = [{key:"GROUPID",value:initialSelectedGroupId},{key:"TYPE",value:pieChartMonitorType}];
                    dispatch(deviceMonitorActions.setGetTearmListDataType(0));
                    dispatch(deviceMonitorActions.getTearmListData(filter));
                    dispatch(deviceMonitorActions.setMonitorGroupId(initialSelectedGroupId));
                    dispatch(deviceMonitorActions.setMonitorName(initialSelectedGroupName));
                    dispatch(deviceMonitorActions.setMonitorView(1));
                // }, 100);
            }
            else if(nodes[0].type=="group") {
                // setTimeout(function () {
                    dispatch(deviceMonitorActions.setMonitorName(initialSelectedGroupName));
                    dispatch(deviceMonitorActions.setMonitorView(3));
                    dispatch(equipmentActions.getGroupAllData(initialSelectedGroupId));
                // }, 100);
            }
        }
        dispatch(deviceMonitorActions.setMonitorTree2(monitorTree))

        $("#monitorTree_typeFilter").hide();
        $("#monitorTree_quickSearch").hide();
        var quickSearchObj = document.getElementById("monitorTree_quickSearch");
        quickSearchObj.firstChild.style.display = "none";
        var quickSearchBtn= document.createElement('button');
        quickSearchBtn.setAttribute('class', 'rw-select rw-btn');
        quickSearchBtn.setAttribute('type', 'button');
        quickSearchBtn.setAttribute('tabindex', '-1');
        var quickSearchIcon= document.createElement('i');
        quickSearchIcon.setAttribute('class', 'rw-i rw-i-search');
        quickSearchBtn.appendChild(quickSearchIcon);
        quickSearchObj.insertBefore(quickSearchBtn, quickSearchObj.childNodes[0]);

        var that = monitorTree;
        quickSearchBtn.onclick = function() {
            var treeData = deviceMonitorTreeData;
            if(treeData==null || treeData==""){
                that.setState({ quickSearchResults: []});
            }else{
                var quickSearchResults = [];
                for(var i = 0; i < treeData.length; i++) {
                    if(treeData[i].name.indexOf(quickSearchInput.value) != -1) {
                        var bHaveParent = false;
                        for(var j = 0; j < treeData.length; j++) {
                            if(treeData[j].id == treeData[i].pid) {
                                bHaveParent = true;
                                var result = treeData[j].name + "->" + treeData[i].name;
                                quickSearchResults.push({id:treeData[i].id, node:result});
                                break;
                            }
                        }
                        if(!bHaveParent) {
                            quickSearchResults.push({id:treeData[i].id, node:treeData[i].name});
                        }
                    }
                }
                that.setState({ quickSearchResults: quickSearchResults});
            }
            that.setState({ quickSearchOpen: true});
        };

        var quickSearchInput = document.getElementById("monitorTree_quickSearch_input");
        quickSearchInput.onfocus = function() {
            var value = quickSearchInput.value;
            that.setState({ quickSearchOpen: false});
            quickSearchInput.value = value;
        };

        refreshTime = setInterval(this.handleOnClickRefreshMonitorTree, 300000, false);       //每隔5分钟刷新1次监测树
        $(function(){
          $(".monitorTree2 li a").each(function(){
            var $node = $(this);
            $node.mouseover(function(){
              var claz = $(this).attr("class");
              if(claz) {
                  var ind = claz.indexOf("curSelectedNode");
                  if(ind>=0){
                    $node.attr("class","");
                    $node.attr("class","curSelectedNode");
                  }else{
                    $node.attr("class","fadeInTreeNodeHover");
                  }
              }
            });
            $node.mouseout(function(){
              var claz = $(this).attr("class");
              if(claz) {
                  var ind = claz.indexOf("curSelectedNode");
                  if(ind>=0){
                    $node.attr("class","");
                    $node.attr("class","curSelectedNode");
                  }else{
                    $node.attr("class","fadeOutTreeNodeHover");
                  }
              }
            });
          });
        });
    },

    initTree:function(monitorTree, deviceMonitorTreeData){
        const { dispatch } = this.props;
        var zTree;
        var treeDatas = [];
        var _this = this;
        var that = monitorTree;
        var setting = {
            view: {
                dblClickExpand: false,
                showLine: true,
                nameIsHTML: true,
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable:true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPid: ""
                }
            },
            callback: {
                beforeClick: function(treeId, treeNode) {
                    dispatch(equipmentActions.setSelectedNode(treeNode));
                    if(treeNode.type.substr(0,9).toLowerCase() == "equipment") {
                        dispatch(equipmentActions.getEquipment(treeNode.id));
                    }
                    _this.handleOnClickMonitorTreeNode(treeNode);
                },
                onRightClick: function(event, treeId, treeNode){
                    dispatch(equipmentActions.setSelectedNode(treeNode));
                    if(treeNode.type.substr(0,9).toLowerCase() == "equipment"){
                        dispatch(equipmentActions.getEquipment(treeNode.id));
                        dispatch(equipmentActions.setSelectedResourceByRightClickTree(treeNode));
                    }
                    that.OnRightClick(event, treeId, treeNode);
                },
                onExpand: function(event, treeId, treeNode){
                  that.onExpandNode(event, treeId, treeNode);
                }
            }
        };
        if(deviceMonitorTreeData==null || deviceMonitorTreeData==""){
            // window.location.href="#/"
            treeDatas = [];
        }else{
          for(var i=0;i<deviceMonitorTreeData.length;i++){
            var dataNodeType = deviceMonitorTreeData[i].type;
            var dataNodeStatus = deviceMonitorTreeData[i].status;
            var dataNodeInd = dataNodeType.indexOf("Equipment");
            var curIcon = "./img/itoss/";
            if(dataNodeType == "dvr"){
              curIcon += "DVR.png";
            }else if(dataNodeType == "nvr"){
              curIcon += "NVR.png";
            }else if(dataNodeType == "ipsan"){
              curIcon += "IPSAN.png";
            }else if(dataNodeType == "vedio"){
              curIcon += "Qj.png";
            }else if(dataNodeType == "code"){
              curIcon += "CODE.png";
            }else{
              if(dataNodeInd<0){
                curIcon += "group";
              }else{
                curIcon += "entity"
              };
              curIcon += dataNodeStatus;
              curIcon += ".png";
            };
            deviceMonitorTreeData[i].icon = curIcon;
          };
          treeDatas = deviceMonitorTreeData;
        }
        $(document).ready(function(){
            var t = $("#monitorTree");
            t = $.fn.zTree.init(t, setting, treeDatas);
            var zTree = $.fn.zTree.getZTreeObj("monitorTree");
        });
    },

    handleSetMonitorTree: function(monitorTree) {
        this.setState({monitorTreeObj: monitorTree});
    },

    handleOnClickRefreshMonitorTree: function(e) {
        const { dispatch } = this.props;
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var selectedNodes = treeObj.getSelectedNodes();
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        var openNodes = [];
        for(var i = 0; i < nodes.length; i++) {
            if(nodes[i].open) {
                openNodes.push(nodes[i]);
            }
        }

        var monitorTree = this.state.monitorTreeObj;
        if(monitorTree.state.filteType.type == "0") {
            if(e) {
                // this.getFlux().actions.YFTDeviceMonitorTreeActions.get_DeviceMonitorTreeData([{key:"ISREALTIME", value: "1"}]);
                dispatch(getDeviceMonitorTreeData([{key:"ISREALTIME", value: "1"}]));
            }
            else {
                // this.getFlux().actions.YFTDeviceMonitorTreeActions.get_DeviceMonitorTreeData();
                dispatch(getDeviceMonitorTreeData());
            }
        }
        else {
            // this.getFlux().actions.YFTDeviceMonitorTreeActions.get_DeviceMonitorTreeDataByType([{key:"TYPE", value: this.state.filteType.name}]);
            dispatch(getDeviceMonitorTreeDataByType([{key:"TYPE", value: monitorTree.state.filteType.name}]));
        }
        this.setState({bMonitorTreeFreshed: true, selectedNodes: selectedNodes, openNodes: openNodes});
    },

    handleRefreshMonitorTree: function(monitorTree, props, state) {
        const { dispatch, deviceMonitorTreeData } = props;
        var _this = this;
        var that = monitorTree;
        var setting = {
            view: {
                dblClickExpand: false,
                showLine: true,
                nameIsHTML: true,
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable:true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPid: ""
                }
            },
            callback: {
                beforeClick: function(treeId, treeNode) {
                    dispatch(equipmentActions.setSelectedNode(treeNode));
                    if(treeNode.type.substr(0,9).toLowerCase() == "equipment") {
                        dispatch(equipmentActions.getEquipment(treeNode.id));
                    }
                    _this.handleOnClickMonitorTreeNode(treeNode);
                },
                onRightClick: function(event, treeId, treeNode){
                    dispatch(equipmentActions.setSelectedNode(treeNode));
                    if(treeNode.type.substr(0,9).toLowerCase() == "equipment"){
                        dispatch(equipmentActions.getEquipment(treeNode.id));
                        dispatch(equipmentActions.setSelectedResourceByRightClickTree(treeNode));
                    }
                    that.OnRightClick(event, treeId, treeNode);
                }
            }
        };
        var treeDatas;
        if(deviceMonitorTreeData==null || deviceMonitorTreeData==""){
            // window.location.href="#/"
            treeDatas = [];
        }else{
          for(var i=0;i<deviceMonitorTreeData.length;i++){
            var dataNodeType = deviceMonitorTreeData[i].type;
            var dataNodeStatus = deviceMonitorTreeData[i].status;
            var dataNodeInd = dataNodeType.indexOf("Equipment");
            var curIcon = "./img/itoss/";
            if(dataNodeType == "dvr"){
              curIcon += "DVR.png";
            }else if(dataNodeType == "nvr"){
              curIcon += "NVR.png";
            }else if(dataNodeType == "ipsan"){
              curIcon += "IPSAN.png";
            }else if(dataNodeType == "vedio"){
              curIcon += "Qj.png";
            }else if(dataNodeType == "code"){
              curIcon += "CODE.png";
            }else{
              if(dataNodeInd<0){
                curIcon += "group";
              }else{
                curIcon += "entity"
              };
              curIcon += dataNodeStatus;
              curIcon += ".png";
            };
            deviceMonitorTreeData[i].icon = curIcon;
          };
          treeDatas = deviceMonitorTreeData;
        }
        $.fn.zTree.init($("#monitorTree"), setting, treeDatas);
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var newNodes = treeObj.transformToArray(treeObj.getNodes());
        var bInNewTree = false;
        if(state.selectedNodes.length > 0) {
            for(var i = 0; i < newNodes.length; i++) {
                if(newNodes[i].id == state.selectedNodes[0].id) {
                    bInNewTree = true;
                    treeObj.selectNode(newNodes[i]);
                    that.setState({curNode:newNodes[i]});
                    break;
                }
            }
        }

        if(!bInNewTree) {
            treeObj.selectNode(newNodes[0]);
            that.setState({curNode:newNodes[0]});
        }

        for(var i = 0; i < state.openNodes.length; i++) {
            for(var j = 0; j < newNodes.length; j++) {
                if(newNodes[j].id == state.openNodes[i].id) {
                    treeObj.expandNode(newNodes[j], true, false);
                    // newNodes[j].open = true;
                    break;
                }
            }
        }
    },

    handleOnClickMonitorTreeNode: function(treeNode) {
        const { dispatch, deviceMonitorTreeData, pieChartMonitorType } = this.props;
        var monitorTree = this.state.monitorTreeObj;

        $(".ztree").find("li").each(function(){
            $(this).attr("class","normalNodeLi");
        })
        var zTree = $.fn.zTree.getZTreeObj("monitorTree");
        // if (treeNode.isParent) {
        //     zTree.expandNode(treeNode);
        // }
        var tid = treeNode.tId;
        var li = $("#"+tid);
        $(li).attr("class","curSelectedNodeLi");
        $(li).find("a").attr("class","curSelectedNode");
        $("#monitorTree").find("li").find("a").attr("class","");
        monitorTree.hideRightMenu();
        monitorTree.hideRMenu2();
        var curNode1 = monitorTree.state.curNode;
        // console.log(curNode1);
        if(curNode1!=null && curNode1!=""){
          var curAid = curNode1.tId;
          var lis = $("#"+curAid+"_a");
          // $(li).attr("class","fadeOutTreeNodeLi");
          // $(li).attr("class","fadeOutTreeNode");
          document.getElementById(curAid+"_a").className = "fadeOutTreeNode";
        };
        // $("#leftTree_2_a").attr("class","fadeOutTreeNode");
        monitorTree.setState({curNode:treeNode});

        // var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
        if(treeNode.type=="dvr"||treeNode.type=="nvr"||treeNode.type=="vedio"||treeNode.type=="code"||treeNode.type=="ipsan") {
            // var _this = this;
            // setTimeout(function () {
                var filter;
                if(treeNode.type=="vedio"){
                    filter = [{key:"SELECTGROUP",value:treeNode.pid}, {key:"GROUPID",value:treeNode.id}, {key:"NAME",value:treeNode.name.substring(0, treeNode.name.indexOf("("))}, {key:"TYPE",value:"1"}]
                }
                else if(treeNode.type=="dvr"){
                    filter = [{key:"SELECTGROUP",value:treeNode.pid}, {key:"GROUPID",value:treeNode.id}, {key:"NAME",value:treeNode.name.substring(0, treeNode.name.indexOf("("))}, {key:"TYPE",value:"2"}]
                }
                else if(treeNode.type=="nvr"){
                    filter = [{key:"SELECTGROUP",value:treeNode.pid}, {key:"GROUPID",value:treeNode.id}, {key:"NAME",value:treeNode.name.substring(0, treeNode.name.indexOf("("))}, {key:"TYPE",value:"3"}]
                }
                else if(treeNode.type=="code"){
                    filter = [{key:"SELECTGROUP",value:treeNode.pid}, {key:"GROUPID",value:treeNode.id}, {key:"NAME",value:treeNode.name.substring(0, treeNode.name.indexOf("("))}, {key:"TYPE",value:"4"}]
                }
                else if(treeNode.type=="ipsan"){
                    filter = [{key:"SELECTGROUP",value:treeNode.pid}, {key:"GROUPID",value:treeNode.id}, {key:"NAME",value:treeNode.name.substring(0, treeNode.name.indexOf("("))}, {key:"TYPE",value:"5"}]
                }
                var tmpFilter = filter.slice(0);
                if(document.getElementById("fixed-monitorTable-pagination") != null) {
                    document.getElementById("fixed-monitorTable-pagination").style.display = "block";
                    $('#monitorTable').bootstrapTable('refreshOptions', {
                        pagination: false
                    });
                }
                var monitorName, searchAreaData, settingSearchAreaData;
                for(var i = 0; i < deviceMonitorTreeData.length; i++) {
                    if(deviceMonitorTreeData[i].id == treeNode.pid) {
                        monitorName = deviceMonitorTreeData[i].name.substring(0, deviceMonitorTreeData[i].name.indexOf("(")) + "-" + treeNode.name;
                        searchAreaData = deviceMonitorTreeData[i];
                        settingSearchAreaData = deviceMonitorTreeData[i];
                        break;
                    }
                }
                // yftDeviceMonitorAction.set_monitorParam_1({bClickTreeNode: true, getTearmListDataType: 0, groupId: treeNode.id, monitorView: 2, monitorName: monitorName, searchAreaData: searchAreaData, settingSearchAreadData: settingSearchAreaData, monitorTableCurrentPage: 1, monitorTableNumPerPage: 20, monitorTableFilter: tmpFilter, monitorFilterStatus: "all"});
                dispatch(deviceMonitorActions.setbClickTreeNode(true));
                dispatch(deviceMonitorActions.setGetTearmListDataType(0));
                dispatch(deviceMonitorActions.setMonitorGroupId(treeNode.id));
                dispatch(deviceMonitorActions.setMonitorView(2));
                dispatch(deviceMonitorActions.setMonitorName(monitorName));
                dispatch(deviceMonitorActions.setSearchAreaData(searchAreaData));
                dispatch(deviceMonitorActions.setSettingSearchAreaData(settingSearchAreaData));
                dispatch(deviceMonitorActions.setMonitorTableCurrentPage(1));
                dispatch(deviceMonitorActions.setMonitorTableNumPerPage(20));
                dispatch(deviceMonitorActions.setMonitorTableFilter(tmpFilter));
                dispatch(deviceMonitorActions.setMonitorFilterStatus("all"));
                // const { dispatch, bClickTreeNode, monitorTableFilter } = this.props;
                // if(bClickTreeNode) {
                    // var filter = monitorTableFilter.slice(0);
                    filter.push({key:"FROM", value:0});
                    filter.push({key:"TO", value:20});
                    // var _this = this;
                    setTimeout(function () {
                        // _this.getFlux().actions.YFTDeviceMonitorActions.get_GroupListDataByClickTree(filter);
                        dispatch(deviceMonitorActions.getGroupListDataByClickTree(filter));
                    }, 500);
                // }
            // }, 500);
        }
        else if(treeNode.type=="organize" || treeNode.type=="other") {
            // var _this = this;
            // setTimeout(function () {
                // var filter = [{key:"GROUPID",value:treeNode.id},{key:"TYPE",value:_this.getFlux().store("YFTDeviceMonitorStore").getState().PieChartMonitorType}];
                var filter = [{key:"GROUPID",value:treeNode.id},{key:"TYPE",value:pieChartMonitorType}];
                // yftDeviceMonitorAction.set_monitorParam_3({getTearmListDataType: 0, groupId: treeNode.id, monitorName: treeNode.name, monitorView: 1});
                // yftDeviceMonitorAction.get_TearmListData(filter);
                dispatch(deviceMonitorActions.setGetTearmListDataType(0));
                dispatch(deviceMonitorActions.setMonitorGroupId(treeNode.id));
                dispatch(deviceMonitorActions.setMonitorName(treeNode.name));
                dispatch(deviceMonitorActions.setMonitorView(1));
                dispatch(deviceMonitorActions.getTearmListData(filter));
            // }, 500);
        }
        else if(treeNode.type=="group") {
            // setTimeout(function () {
                // yftDeviceMonitorAction.set_monitorParam_4({monitorName: treeNode.name, monitorView: 3});
                // yftEquipmentActions.get_GroupAllData(treeNode.id);
                dispatch(deviceMonitorActions.setMonitorName(treeNode.name));
                dispatch(deviceMonitorActions.setMonitorView(3));
                dispatch(equipmentActions.getGroupAllData(treeNode.id));
            // }, 100);
        }
        else if(treeNode.type.substr(0,9).toLowerCase()=="equipment") {
            // setTimeout(function () {
                // yftDeviceMonitorAction.set_monitorParam_4({monitorName: treeNode.name, monitorView: 4});
                // yftEquipmentActions.set_equipmentParam_1({bClickTreeNode: true, equipmentId: treeNode.id});
                // yftEquipmentActions.get_equipmentAllData(treeNode.id);
                dispatch(deviceMonitorActions.setMonitorName(treeNode.name));
                dispatch(deviceMonitorActions.setMonitorView(4));
                dispatch(equipmentActions.setbClickTreeNode(true));
                dispatch(equipmentActions.setEquipmentId(treeNode.id));
                dispatch(equipmentActions.getEquipmentAllData(treeNode.id));
            // }, 500);
        }
    },

    handleOnChangeMonitorTreeFilteType: function(e) {
        const { dispatch, deviceMonitorTreeData, pieChartMonitorType } = this.props;
        var monitorTree = this.state.monitorTreeObj;
        var _this = this;

        monitorTree.setState({filteType: e});
        if(e.type == "0") {
            // this.getFlux().actions.YFTDeviceMonitorTreeActions.get_DeviceMonitorTreeData();
            dispatch(getDeviceMonitorTreeData());
        }
        else {
            // this.getFlux().actions.YFTDeviceMonitorTreeActions.get_DeviceMonitorTreeDataByType([{key:"TYPE", value: e.name}]);
            dispatch(getDeviceMonitorTreeDataByType([{key:"TYPE", value: e.name}]));
        }
        this.setState({bMonitorTreeFilterChanged: true});
    },

    handleFilteMonitorTree: function(monitorTree, props) {
        const { dispatch, deviceMonitorTreeData } = props;
        var _this = this;
        var setting = {
            view: {
                dblClickExpand: false,
                showLine: true,
                nameIsHTML: true,
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable:true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPid: ""
                }
            },
            callback: {
                beforeClick: function(treeId, treeNode) {
                    dispatch(equipmentActions.setSelectedNode(treeNode));
                    if(treeNode.type.substr(0,9).toLowerCase() == "equipment") {
                        dispatch(equipmentActions.getEquipment(treeNode.id));
                    }
                    _this.handleOnClickMonitorTreeNode(treeNode);
                },
                onRightClick: function(event, treeId, treeNode){
                    dispatch(equipmentActions.setSelectedNode(treeNode));
                    if(treeNode.type.substr(0,9).toLowerCase() == "equipment"){
                        dispatch(equipmentActions.getEquipment(treeNode.id));
                        dispatch(equipmentActions.setSelectedResourceByRightClickTree(treeNode));
                    }
                    monitorTree.OnRightClick(event, treeId, treeNode);
                }
            }
        };
        var treeDatas;
        if(deviceMonitorTreeData==null || deviceMonitorTreeData==""){
            // window.location.href="#/"
            treeDatas = [];
        }else{
            treeDatas = deviceMonitorTreeData;
        }
        $.fn.zTree.init($("#monitorTree"), setting, treeDatas);
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        if(nodes.length > 0) {
            treeObj.selectNode(nodes[0]);
            monitorTree.setState({curNode:nodes[0]});

            // var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
            // var yftEquipmentActions = this.getFlux().actions.YFTEquipmentActions;
            var initialSelectedGroupId = nodes[0].id;
            var initialSelectedGroupName = nodes[0].name;
            if(nodes[0].type=="organize" || nodes[0].type=="other") {
                // var _this = this;
                // setTimeout(function () {
                    // var filter = [{key:"GROUPID",value:initialSelectedGroupId},{key:"TYPE",value:_this.getFlux().store("YFTDeviceMonitorStore").getState().PieChartMonitorType}];
                    // yftDeviceMonitorAction.set_GetTearmListDataType(1);
                    // yftDeviceMonitorAction.get_TearmListData(filter);
                    // yftDeviceMonitorAction.set_MonitorGroupId(initialSelectedGroupId);
                    // yftDeviceMonitorAction.set_MonitorName(initialSelectedGroupName);
                    // yftDeviceMonitorAction.set_MonitorView(1);
                    var filter = [{key:"GROUPID",value:initialSelectedGroupId},{key:"TYPE",value:monitorTree.state.filteType.type=="0"?"1":monitorTree.state.filteType.type}];
                    dispatch(deviceMonitorActions.setGetTearmListDataType(1));
                    dispatch(deviceMonitorActions.getTearmListData(filter));
                    dispatch(deviceMonitorActions.setMonitorGroupId(initialSelectedGroupId));
                    dispatch(deviceMonitorActions.setMonitorName(initialSelectedGroupName));
                    dispatch(deviceMonitorActions.setMonitorView(1));
                    if(monitorTree.state.filteType.type != "0") {
                        // yftDeviceMonitorAction.set_PieChartMonitorType(e.type);
                        // yftDeviceMonitorAction.set_SelectedTearmEquipmentNameData({RecId:"0", name:""});
                        dispatch(deviceMonitorActions.setPieChartMonitorType(monitorTree.state.filteType.type));
                        dispatch(deviceMonitorActions.setSelectedTearmEquipmentNameData({RecId:"0", name:""}));
                        switch (monitorTree.state.filteType.type) {
                            case "1":
                                document.getElementById('radio_pieChart_monitorType_camera').checked = true;
                                break;
                            case "2":
                                document.getElementById('radio_pieChart_monitorType_DVR').checked = true;
                                break;
                            case "3":
                                document.getElementById('radio_pieChart_monitorType_NVR').checked = true;
                                break;
                            case "4":
                                document.getElementById('radio_pieChart_monitorType_encoder').checked = true;
                                break;
                            case "5":
                                document.getElementById('radio_pieChart_monitorType_IPSAN').checked = true;
                                break;
                            default:
                                document.getElementById('radio_pieChart_monitorType_camera').checked = true;
                                break;
                        }
                    }
                // }, 100);
            }
            else if(nodes[0].type=="group") {
                // document.getElementById("loadingPic").style.display = 'block';
                setTimeout(function () {
                    // yftEquipmentActions.get_GroupAllData(initialSelectedGroupId);
                    // yftDeviceMonitorAction.set_monitorParam_4({monitorName: initialSelectedGroupName, monitorView: 3});
                    dispatch(deviceMonitorActions.setMonitorName(initialSelectedGroupName));
                    dispatch(deviceMonitorActions.setMonitorView(3));
                    dispatch(equipmentActions.getGroupAllData(initialSelectedGroupId));
                }, 100);
            }
        }
    },

    getForm: function() {
        const { monitorView } = this.props;
        switch (monitorView) {
            case 1:
                return <StatisticalView/>;
                break;
            case 2:
                return <MonitorTableView/>;
                break;
            case 3:
                return <GroupInfoView_desView/>;
                break;
            case 4:
                return <ListView_desView/>;
                break;
            default:
                return <StatisticalView/>;
                break;
        }
    },

    render: function() {
        const { dispatch, deviceMonitorTreeData, createResourcesTableData, createMonitorsTableData, resourceTypes, selectedNode, commonMonitors,
            selectedDeivceGroup, equipmentModel } = this.props;
        // var monitorTree = this.state.monitorTreeObj;
        // return (
        //     <div id='monitorView' className='overviewDiv'>
        //         <div className='leftListDiv col-md-2'>
        //             <MonitorTree2 treeData={this.getFlux().store("YFTDeviceMonitorTreePageStore").getState().DeviceMonitorTreeData}/>
        //         </div>
        //         {this.getForm(this.state.itoss_Monitor.MonitorView, this.state.itoss_Monitor.MonitorName)}
        //     </div>
        // );
        var _this = this;
        return (
            <div id='monitorView' className='overviewDiv'>
                <CreateResourceModal createResourcesTableData={createResourcesTableData} resourceTypes={resourceTypes}
                    setSelectedResource={selectedResource=>dispatch(equipmentActions.setSelectedResource(selectedResource))}
                    getResourceTypes={()=>dispatch(equipmentActions.getResourceTypes())}
                    getResourcesByTypeId={resourceTypeRecId=>dispatch(equipmentActions.getResourcesByTypeId(resourceTypeRecId))}
                    getResourcesBySearchName={searchName=>dispatch(equipmentActions.getResourcesBySearchName(searchName))}/>
                <ListResourceModal
                    childrenGroup={this.props.childrenGroup} childrenEquip={this.props.childrenEquip}
                    getChildrenGroups={data => dispatch(deviceMonitorActions.getChildrenGroups(data))}
                    getChildrenEquip={data => dispatch(deviceMonitorActions.getChildrenEquip(data))}
                    updateGroupSorter={data => dispatch(deviceMonitorActions.updateGroupSorter(data, _this.state.monitorTreeObj))}
                    updateEquipmentSorter={data => dispatch(deviceMonitorActions.updateEquipmentSorter(data, _this.state.monitorTreeObj))}
                />
                <UpdateResourceModal
                  selectedNode={selectedNode} selectedDeivceGroup={selectedDeivceGroup}
                  getEccGroupById={param => dispatch(deviceMonitorActions.getEccGroupById(param))}
                  updateEccGroup={param => dispatch(deviceMonitorActions.updateEccGroup(param, _this.state.monitorTreeObj))}
                />
                <CreateGroupModal
                  selectedNode={selectedNode}
                  createEccGroup={param => dispatch(deviceMonitorActions.createEccGroup(param, _this.state.monitorTreeObj))}
                />
                <CreateMonitorModal createMonitorsTableData={createMonitorsTableData} selectedNode={selectedNode} commonMonitors={commonMonitors} equipmentModel={equipmentModel}
                    setSelectedMonitor={selectedMonitor=>dispatch(equipmentActions.setSelectedMonitor(selectedMonitor))}
                    getMonitorAlarmConditionNameData={monitorType=>dispatch(equipmentActions.getMonitorAlarmConditionNameData(monitorType))}
                    getInitialAlarmConditionDataFromMonitorType={monitorType=>dispatch(equipmentActions.getInitialAlarmConditionDataFromMonitorType(monitorType))}
                    setMonitorsPropertyEdit={monitorsPropertyEdit=>dispatch(equipmentActions.setMonitorsPropertyEdit(monitorsPropertyEdit))}
                    getMonitors={(equipmentType,vendor,resourceModel)=>dispatch(equipmentActions.getMonitors(equipmentType,vendor,resourceModel))}
                    getMonitorsBySearchName={(searchName,equipmentType,vendor,resourceModel)=>dispatch(equipmentActions.getMonitorsBySearchName(searchName,equipmentType,vendor,resourceModel))}/>
                <div className='leftListDiv col-md-2'>
                    <MonitorTree2 treeData={deviceMonitorTreeData} onCallBackSetMonitorTree={this.handleSetMonitorTree} onClickRefresh={this.handleOnClickRefreshMonitorTree}
                        onClickMonitorTreeNode={this.handleOnClickMonitorTreeNode} onChangeFilteType={this.handleOnChangeMonitorTreeFilteType}
                        changeGroupStatus={(param, monitorTreeObj) => dispatch(deviceMonitorActions.changeGroupStatus(param, monitorTreeObj))} selectedNode={selectedNode}
                        changeEquipmentStatus={(param, monitorTreeObj) => dispatch(deviceMonitorActions.changeEquipmentStatus(param, monitorTreeObj))}
                    />
                </div>
                {this.getForm()}
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('monitorView') != null) {
        document.getElementById('monitorView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = MonitorView;
MonitorView.propTypes = {
  deviceMonitorTreeData: PropTypes.array.isRequired,
  pieChartMonitorType: PropTypes.string.isRequired,
  monitorView: PropTypes.number.isRequired,
  createResourcesTableData: PropTypes.array.isRequired,
  createMonitorsTableData: PropTypes.array.isRequired,
  resourceTypes: PropTypes.array.isRequired,
  selectedNode: PropTypes.object,
  commonMonitors: PropTypes.array.isRequired,
  navigateFromCreateMonitorViewFlag: PropTypes.bool.isRequired,
  equipmentModel: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { deviceMonitorTreeData } = state.deviceMonitorTreeReducer
  const { pieChartMonitorType, monitorView,childrenGroup,childrenEquip,selectedDeivceGroup } = state.deviceMonitorReducer
  const { createResourcesTableData, createMonitorsTableData, resourceTypes, selectedNode, commonMonitors, navigateFromCreateMonitorViewFlag,
        equipmentModel } = state.equipmentReducer

  return {
    deviceMonitorTreeData,
    pieChartMonitorType,
    monitorView,
    createResourcesTableData,
    createMonitorsTableData,
    resourceTypes,
    childrenEquip,
    childrenGroup,
    selectedNode,
    commonMonitors,
    selectedDeivceGroup,
    navigateFromCreateMonitorViewFlag,
    equipmentModel
  }
}

export default connect(mapStateToProps)(MonitorView)
