/**
 * tianzhuo.nie  2015/12/11.
 * 资源监测-统一监控平台-左侧树
 */

// var React = require('react');
import React, { PropTypes } from 'react';
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
// var Fluxxor = require('fluxxor');
//
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var ReactWidgets = require('react-widgets');

var treenodeIndex=0, initialSelectedGroupId="", initialSelectedGroupName="";
var filteTypes = [
    {type:"0", name:"全部"},
    {type:"1", name:"摄像机"},
    {type:"2", name:"DVR"},
    {type:"3", name:"NVR"},
    {type:"4", name:"编码器"},
    {type:"5", name:"IPSAN"}
];

var refreshTime;
var Ztreeview1 = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         // itoss_SeviceLevel:flux.store("ServiceLevelPageStore").getState()
    //     }
    // },
    getInitialState:function(){
      return({
          quickSearchOpen: false,
          quickSearchResults: [],
          filteType: filteTypes[0]
      });
    },
    // initTree:function(){
    //     var zTree;
    //     var treeDatas;
    //     var that = this;
    //     var setting = {
    //         view: {
    //             dblClickExpand: false,
    //             showLine: true,
    //             nameIsHTML: true,
    //             selectedMulti: false
    //         },
    //         data: {
    //             simpleData: {
    //                 enable:true,
    //                 idKey: "id",
    //                 pIdKey: "pid",
    //                 rootPid: ""
    //             }
    //         },
    //         callback: {
    //             beforeClick: function(treeId, treeNode) {
    //                 that.onClickChild(treeNode);
    //             },
    //             onRightClick: function(event, treeId, treeNode){
    //                 // that.OnRightClick(event, treeId, treeNode)
    //             },
    //             onExpand: function(event, treeId, treeNode){
    //               that.onExpandNode(event, treeId, treeNode);
    //             }
    //         }
    //     };
    //     if(that.props.treeData==null || that.props.treeData==""){
    //         // window.location.href="#/"
    //         treeDatas = [];
    //     }else{
    //         treeDatas = that.props.treeData;
    //     }
    //     $(document).ready(function(){
    //         var t = $("#monitorTree");
    //         t = $.fn.zTree.init(t, setting, treeDatas);
    //         var zTree = $.fn.zTree.getZTreeObj("monitorTree");
    //     });
    // },
    //------------------------------------------右键菜单---------------------------------
    OnRightClick:function(event, treeId, treeNode){
        // $(".ztree").find("li").each(function(){
        //     $(this).attr("class","normalNodeLi");
        // })
        var tid = treeNode.tId;
        var li = $("#"+tid);
        var zTree = $.fn.zTree.getZTreeObj("monitorTree");
        var width = event.clientX;
        if(width>148){
          width=148;
        };
        var height = $(li).offset().top-100;
        // $(li).attr("class","curSelectedNodeLi");
        // $(li).find("a").attr("class","curSelectedNode");
        // $("#monitorTree").find("li").find("a").attr("class","");
        this.hideRightMenu();
        this.hideRMenu2();

        var tStatu = treeNode.status;
        if(tStatu == "good"){
          $("#monitorTree2Startli").hide();
          $("#monitorTree2Disableli").show();
          $("#rightMenuStartEquipmentLi").hide();
          $("#rightMenuDisableEquipmentLi").show();
        }else if(tStatu == "disabled"){
          $("#monitorTree2Startli").show();
          $("#monitorTree2Disableli").hide();
          $("#rightMenuStartEquipmentLi").show();
          $("#rightMenuDisableEquipmentLi").hide();
        };

        var curNode1 = this.state.curNode;
        // console.log(curNode1);
        if(curNode1!=null && curNode1!=""){
          var curAid = curNode1.tId;
          var lis = $("#"+curAid+"_a");
          // $(li).attr("class","fadeOutTreeNodeLi");
          // $(li).attr("class","fadeOutTreeNode");
          document.getElementById(curAid+"_a").className = "fadeOutTreeNode";
        };
        // $("#leftTree_2_a").attr("class","fadeOutTreeNode");
        this.setState({curNode:treeNode});

        var type = treeNode.type;
        if(type == "root"){
            return false;
        }else if(type == "group"){
            if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
                zTree.cancelSelectedNode();
                this.showRightMenu("root", width, height);
            } else if (treeNode && !treeNode.noR) {
                zTree.selectNode(treeNode);
                this.showRightMenu("node", width, height);
            }
        }else if(type.substr(0,9).toLowerCase() == "equipment"){
            if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
                zTree.cancelSelectedNode();
                this.showRMenu2("root", width, height);
            } else if (treeNode && !treeNode.noR) {
                zTree.selectNode(treeNode);
                this.showRMenu2("node", width, height);
            }
        }else{
          zTree.selectNode(treeNode);
          $(li).attr("class","curSelectedNodeLi");
        };
    },
    hideRightMenu:function() {
        var rMenu = $("#rMenu3");
        if (rMenu) rMenu.css({"visibility": "hidden"});
        $("body").unbind("mousedown", this.onBodyMouseDown);
    },
    showRightMenu:function(type, x, y) {
        $("#rMenu3 ul").show();
        var rMenu = $("#rMenu3");
        if (type=="root") {
            $("#m_del").hide();
            $("#m_check").hide();
            $("#m_unCheck").hide();
        } else {
            $("#m_del").show();
            $("#m_check").show();
            $("#m_unCheck").show();
        }

        rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible","z-index":"999"});

        $("body").bind("mousedown", this.onBodyMouseDownRight);
    },
    onBodyMouseDownRight:function(event){
        var rMenu = $("#rMenu3");
        if (!(event.target.id == "rMenu3" || $(event.target).parents("#rMenu3").length>0)) {
            rMenu.css({"visibility" : "hidden"});
        }
    },
    hideRMenu2:function() {
        var rMenu = $("#rMenu4");
        if (rMenu) rMenu.css({"visibility": "hidden"});
        $("body").unbind("mousedown", this.onBodyMouseDown);
    },
    showRMenu2:function(type, x, y) {
        $("#rMenu4 ul").show();
        var rMenu = $("#rMenu4");
        if (type=="root") {
            $("#m_del").hide();
            $("#m_check").hide();
            $("#m_unCheck").hide();
        } else {
            $("#m_del").show();
            $("#m_check").show();
            $("#m_unCheck").show();
        }

        rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible","z-index":"999"});

        $("body").bind("mousedown", this.onBodyMouseDown2);
    },
    onBodyMouseDown2:function(event){
        var rMenu = $("#rMenu4");
        if (!(event.target.id == "rMenu4" || $(event.target).parents("#rMenu4").length>0)) {
            rMenu.css({"visibility" : "hidden"});
        }
    },
    // componentWillMount:function(){
    //     var treeDatas;
    //     if(this.props.treeData==null || this.props.treeData==""){
    //         // window.location.href="#/"
    //         treeDatas = [];
    //     }else{
    //         treeDatas = this.props.treeData;
    //         initialSelectedGroupId = treeDatas[0].id;
    //         initialSelectedGroupName = treeDatas[0].name;
    //
    //         var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
    //         var yftEquipmentActions = this.getFlux().actions.YFTEquipmentActions;
    //         if(treeDatas[0].type=="organize" || treeDatas[0].type=="other") {
    //             var _this = this;
    //             // setTimeout(function () {
    //                 var filter = [{key:"GROUPID",value:initialSelectedGroupId},{key:"TYPE",value:_this.getFlux().store("YFTDeviceMonitorStore").getState().PieChartMonitorType}];
    //                 yftDeviceMonitorAction.set_GetTearmListDataType(0);
    //                 yftDeviceMonitorAction.get_TearmListData(filter);
    //                 yftDeviceMonitorAction.set_MonitorGroupId(initialSelectedGroupId);
    //                 yftDeviceMonitorAction.set_MonitorName(initialSelectedGroupName);
    //                 //yftDeviceMonitorAction.set_StatisticalView();
    //                 yftDeviceMonitorAction.set_MonitorView(1);
    //             // }, 100);
    //         }
    //         else if(treeDatas[0].type=="group") {
    //             setTimeout(function () {
    //                 // yftEquipmentActions.get_GroupAllData(initialSelectedGroupId);
    //                 // yftDeviceMonitorAction.set_MonitorName(initialSelectedGroupName);
    //                 // yftDeviceMonitorAction.set_MonitorView(3);
    //                 yftEquipmentActions.get_GroupAllData(initialSelectedGroupId);
    //                 yftDeviceMonitorAction.set_monitorParam_4({monitorName: initialSelectedGroupName, monitorView: 3});
    //             }, 100);
    //         }
    //         yftDeviceMonitorAction.set_monitorTree2(this);
    //     }
    // },
    onExpandNode:function(event, treeId, treeNode){
      $(".monitorTree2 ul li a").each(function(){
        var $node = $(this);
        $node.mouseover(function(){
          var claz = $(this).attr("class");
          var ind = claz?claz.indexOf("curSelectedNode"):-1;
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","curSelectedNode");
          }else{
            $node.attr("class","fadeInTreeNodeHover");
          };
        });
        $node.mouseout(function(){
          var claz = $(this).attr("class");
          var ind = claz?claz.indexOf("curSelectedNode"):-1;
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","curSelectedNode");
          }else{
            $node.attr("class","fadeOutTreeNodeHover");
          };
        });
      });
    },
    componentDidMount:function(){
        this.props.onCallBackSetMonitorTree(this);
    },
    // componentDidMount:function(){
    //     var height = $(window).height() - 110 - 30 + 'px';
    //     var height2 = $(window).height() - 110 - 30 -22 + 'px';
    //     $(".leftListDiv").css("height",height);
    //     $(".monitorTree2").css("height",height2);
    //     $(".commonTreeDiv").css("height",height2);
    //     $(".dictTreeDiv").css("height",height2);
    //     $(".groupZTree").css("height",height2);
    //     this.initTree();
    //     this.hideRightMenu();
    //     this.hideRMenu2();
    //
    //     var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
    //     var nodes = treeObj.transformToArray(treeObj.getNodes());
    //     treeObj.selectNode(nodes[0]);
    //
    //     $("#monitorTree_typeFilter").hide();
    //     $("#monitorTree_quickSearch").hide();
    //     var quickSearchObj = document.getElementById("monitorTree_quickSearch");
    //     quickSearchObj.firstChild.style.display = "none";
    //     var quickSearchBtn= document.createElement('button');
    //     quickSearchBtn.setAttribute('class', 'rw-select rw-btn');
    //     quickSearchBtn.setAttribute('type', 'button');
    //     quickSearchBtn.setAttribute('tabindex', '-1');
    //     var quickSearchIcon= document.createElement('i');
    //     quickSearchIcon.setAttribute('class', 'rw-i rw-i-search');
    //     quickSearchBtn.appendChild(quickSearchIcon);
    //     quickSearchObj.insertBefore(quickSearchBtn, quickSearchObj.childNodes[0]);
    //
    //     var _this = this;
    //     quickSearchBtn.onclick = function() {
    //         var treeData = _this.props.treeData;
    //         if(treeData==null || treeData==""){
    //             _this.setState({ quickSearchResults: []});
    //         }else{
    //             var quickSearchResults = [];
    //             for(var i = 0; i < treeData.length; i++) {
    //                 if(treeData[i].name.indexOf(quickSearchInput.value) != -1) {
    //                     var bHaveParent = false;
    //                     for(var j = 0; j < treeData.length; j++) {
    //                         if(treeData[j].id == treeData[i].pid) {
    //                             bHaveParent = true;
    //                             var result = treeData[j].name + "->" + treeData[i].name;
    //                             quickSearchResults.push({id:treeData[i].id, node:result});
    //                             break;
    //                         }
    //                     }
    //                     if(!bHaveParent) {
    //                         quickSearchResults.push({id:treeData[i].id, node:treeData[i].name});
    //                     }
    //                 }
    //             }
    //             _this.setState({ quickSearchResults: quickSearchResults});
    //         }
    //         _this.setState({ quickSearchOpen: true});
    //     };
    //
    //     var quickSearchInput = document.getElementById("monitorTree_quickSearch_input");
    //     quickSearchInput.onfocus = function() {
    //         var value = quickSearchInput.value;
    //         _this.setState({ quickSearchOpen: false});
    //         quickSearchInput.value = value;
    //     };
    //
    //     refreshTime = setInterval(this._handleOnClickRefresh, 300000, false);       //每隔5分钟刷新1次监测树
    //     $(function(){
    //       $(".monitorTree2 li a").each(function(){
    //         var $node = $(this);
    //         $node.mouseover(function(){
    //           var claz = $(this).attr("class");
    //           var ind = claz.indexOf("curSelectedNode");
    //           if(ind>=0){
    //             $node.attr("class","");
    //             $node.attr("class","curSelectedNode");
    //           }else{
    //             $node.attr("class","fadeInTreeNodeHover");
    //           };
    //         });
    //         $node.mouseout(function(){
    //           var claz = $(this).attr("class");
    //           var ind = claz.indexOf("curSelectedNode");
    //           if(ind>=0){
    //             $node.attr("class","");
    //             $node.attr("class","curSelectedNode");
    //           }else{
    //             $node.attr("class","fadeOutTreeNodeHover");
    //           };
    //         });
    //       });
    //     });
    // },
    // componentWillUnmount:function(){
    //     clearInterval(refreshTime);
    // },
    // onClickChild:function(treeNode){
    //     $(".ztree").find("li").each(function(){
    //         $(this).attr("class","normalNodeLi");
    //     })
    //     var zTree = $.fn.zTree.getZTreeObj("monitorTree");
    //     // if (treeNode.isParent) {
    //     //     zTree.expandNode(treeNode);
    //     // }
    //     var tid = treeNode.tId;
    //     var li = $("#"+tid);
    //     $(li).attr("class","curSelectedNodeLi");
    //     $(li).find("a").attr("class","curSelectedNode");
    //     $("#monitorTree").find("li").find("a").attr("class","");
    //     this.hideRightMenu();
    //     this.hideRMenu2();
    //     var curNode1 = this.state.curNode;
    //     // console.log(curNode1);
    //     if(curNode1!=null && curNode1!=""){
    //       var curAid = curNode1.tId;
    //       var lis = $("#"+curAid+"_a");
    //       // $(li).attr("class","fadeOutTreeNodeLi");
    //       // $(li).attr("class","fadeOutTreeNode");
    //       document.getElementById(curAid+"_a").className = "fadeOutTreeNode";
    //     };
    //     // $("#leftTree_2_a").attr("class","fadeOutTreeNode");
    //     this.setState({curNode:treeNode});
    //
    //     var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
    //     var yftEquipmentActions = this.getFlux().actions.YFTEquipmentActions;
    //     if(treeNode.type=="dvr"||treeNode.type=="nvr"||treeNode.type=="vedio"||treeNode.type=="code"||treeNode.type=="ipsan") {
    //         var _this = this;
    //         setTimeout(function () {
    //             var filter;
    //             // var filter2;
    //             if(treeNode.type=="vedio"){
    //                 filter = [{key:"SELECTGROUP",value:treeNode.pid}, {key:"GROUPID",value:treeNode.id}, {key:"NAME",value:treeNode.name.substring(0, treeNode.name.indexOf("("))}, {key:"TYPE",value:"1"}]
    //                 // filter2 = [{key:"GROUPID",value:treeNode.id},{key:"TYPE",value:"1"}];
    //             }
    //             else if(treeNode.type=="dvr"){
    //                 filter = [{key:"SELECTGROUP",value:treeNode.pid}, {key:"GROUPID",value:treeNode.id}, {key:"NAME",value:treeNode.name.substring(0, treeNode.name.indexOf("("))}, {key:"TYPE",value:"2"}]
    //                 // filter2 = [{key:"GROUPID",value:treeNode.id},{key:"TYPE",value:"2"}];
    //             }
    //             else if(treeNode.type=="nvr"){
    //                 filter = [{key:"SELECTGROUP",value:treeNode.pid}, {key:"GROUPID",value:treeNode.id}, {key:"NAME",value:treeNode.name.substring(0, treeNode.name.indexOf("("))}, {key:"TYPE",value:"3"}]
    //                 // filter2 = [{key:"GROUPID",value:treeNode.id},{key:"TYPE",value:"3"}];
    //             }
    //             else if(treeNode.type=="code"){
    //                 filter = [{key:"SELECTGROUP",value:treeNode.pid}, {key:"GROUPID",value:treeNode.id}, {key:"NAME",value:treeNode.name.substring(0, treeNode.name.indexOf("("))}, {key:"TYPE",value:"4"}]
    //                 // filter2 = [{key:"GROUPID",value:treeNode.id},{key:"TYPE",value:"4"}];
    //             }
    //             else if(treeNode.type=="ipsan"){
    //                 filter = [{key:"SELECTGROUP",value:treeNode.pid}, {key:"GROUPID",value:treeNode.id}, {key:"NAME",value:treeNode.name.substring(0, treeNode.name.indexOf("("))}, {key:"TYPE",value:"5"}]
    //                 // filter2 = [{key:"GROUPID",value:treeNode.id},{key:"TYPE",value:"5"}];
    //             }
    //             // var filter = [{key:"GROUPID",value:treeNode.id},{key:"NAME",value:treeNode.name.substring(0, treeNode.name.indexOf("("))}];
    //             var tmpFilter = filter.slice(0);
    //             // filter.push({key:"FROM", value:0});
    //             // filter.push({key:"TO", value:20});
    //             // yftDeviceMonitorAction.get_GroupListData(filter);
    //             if(document.getElementById("fixed-monitorTable-pagination") != null) {
    //                 document.getElementById("fixed-monitorTable-pagination").style.display = "block";
    //                 $('#monitorTable').bootstrapTable('refreshOptions', {
    //                     pagination: false
    //                 });
    //             }
    //             // yftDeviceMonitorAction.set_GetTearmListDataType(0);
    //             // yftDeviceMonitorAction.get_TearmListData(filter2);
    //             // yftDeviceMonitorAction.set_MonitorGroupId(treeNode.id);
    //             var monitorName, searchAreaData, settingSearchAreadData;
    //             for(var i = 0; i < _this.props.treeData.length; i++) {
    //                 if(_this.props.treeData[i].id == treeNode.pid) {
    //                     // yftDeviceMonitorAction.set_MonitorName(_this.props.treeData[i].name.substring(0, _this.props.treeData[i].name.indexOf("(")) + "-" + treeNode.name);
    //                     // yftDeviceMonitorAction.set_SearchAreaData(_this.props.treeData[i]);
    //                     // yftDeviceMonitorAction.set_SettingSearchAreaData(_this.props.treeData[i]);
    //                     // yftDeviceMonitorAction.set_monitorParam_2({monitorName: _this.props.treeData[i].name.substring(0, _this.props.treeData[i].name.indexOf("(")) + "-" + treeNode.name, searchAreaData: _this.props.treeData[i], settingSearchAreadData: _this.props.treeData[i]});
    //                     monitorName = _this.props.treeData[i].name.substring(0, _this.props.treeData[i].name.indexOf("(")) + "-" + treeNode.name;
    //                     searchAreaData = _this.props.treeData[i];
    //                     settingSearchAreadData = _this.props.treeData[i];
    //                     break;
    //                 }
    //             }
    //             // yftDeviceMonitorAction.set_MonitorView(2);
    //             yftDeviceMonitorAction.set_monitorParam_1({bClickTreeNode: true, getTearmListDataType: 0, groupId: treeNode.id, monitorView: 2, monitorName: monitorName, searchAreaData: searchAreaData, settingSearchAreadData: settingSearchAreadData, monitorTableCurrentPage: 1, monitorTableNumPerPage: 20, monitorTableFilter: tmpFilter, monitorFilterStatus: "all"});
    //         }, 500);
    //     }
    //     else if(treeNode.type=="organize" || treeNode.type=="other") {
    //         var _this = this;
    //         // setTimeout(function () {
    //             var filter = [{key:"GROUPID",value:treeNode.id},{key:"TYPE",value:_this.getFlux().store("YFTDeviceMonitorStore").getState().PieChartMonitorType}];
    //             // yftDeviceMonitorAction.set_GetTearmListDataType(0);
    //             yftDeviceMonitorAction.set_monitorParam_3({getTearmListDataType: 0, groupId: treeNode.id, monitorName: treeNode.name, monitorView: 1});
    //             yftDeviceMonitorAction.get_TearmListData(filter);
    //             // yftDeviceMonitorAction.set_MonitorGroupId(treeNode.id);
    //             // yftDeviceMonitorAction.set_MonitorName(treeNode.name);
    //             //yftDeviceMonitorAction.set_StatisticalView();
    //             // yftDeviceMonitorAction.set_MonitorView(1);
    //         // }, 100);
    //     }
    //     else if(treeNode.type=="group") {
    //         // setTimeout(function () {
    //             yftDeviceMonitorAction.set_monitorParam_4({monitorName: treeNode.name, monitorView: 3});
    //             yftEquipmentActions.get_GroupAllData(treeNode.id);
    //             // yftDeviceMonitorAction.set_MonitorName(treeNode.name);
    //             // yftDeviceMonitorAction.set_MonitorView(3);
    //
    //         // }, 100);
    //     }
    //     else if(treeNode.type=="equipment") {
    //         setTimeout(function () {
    //             yftDeviceMonitorAction.set_monitorParam_4({monitorName: treeNode.name, monitorView: 4});
    //             yftEquipmentActions.set_equipmentParam_1({bClickTreeNode: true, equipmentId: treeNode.id});
    //             // yftEquipmentActions.get_equipmentAllData(treeNode.id);
    //             // yftDeviceMonitorAction.set_MonitorName(treeNode.name);
    //             // yftDeviceMonitorAction.set_MonitorView(4);
    //         }, 500);
    //     }
    // },
    // _handleOnClickRefresh: function(e) {
    //     var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
    //     var selectedNodes = treeObj.getSelectedNodes();
    //     var nodes = treeObj.transformToArray(treeObj.getNodes());
    //     var openNodes = [];
    //     for(var i = 0; i < nodes.length; i++) {
    //         if(nodes[i].open) {
    //             openNodes.push(nodes[i]);
    //         }
    //     }
    //
    //     // if(this.state.filteType.type == "0") {
    //     //     if(e) {
    //     //         this.getFlux().actions.YFTDeviceMonitorTreeActions.get_DeviceMonitorTreeData([{key:"ISREALTIME", value: "1"}]);
    //     //     }
    //     //     else {
    //     //         this.getFlux().actions.YFTDeviceMonitorTreeActions.get_DeviceMonitorTreeData();
    //     //     }
    //     // }
    //     // else {
    //     //     this.getFlux().actions.YFTDeviceMonitorTreeActions.get_DeviceMonitorTreeDataByType([{key:"TYPE", value: this.state.filteType.name}]);
    //     // }
    //     var that = this;
    //     var setting = {
    //         view: {
    //             dblClickExpand: false,
    //             showLine: true,
    //             nameIsHTML: true,
    //             selectedMulti: false
    //         },
    //         data: {
    //             simpleData: {
    //                 enable:true,
    //                 idKey: "id",
    //                 pIdKey: "pid",
    //                 rootPid: ""
    //             }
    //         },
    //         callback: {
    //             beforeClick: function(treeId, treeNode) {
    //                 that.onClickChild(treeNode);
    //             },
    //             onRightClick: function(event, treeId, treeNode){
    //                 // that.OnRightClick(event, treeId, treeNode)
    //             }
    //         }
    //     };
    //     var treeDatas;
    //     // if(this.getFlux().store("YFTDeviceMonitorTreePageStore").getState().DeviceMonitorTreeData==null || this.getFlux().store("YFTDeviceMonitorTreePageStore").getState().DeviceMonitorTreeData==""){
    //     //     // window.location.href="#/"
    //     //     treeDatas = [];
    //     // }else{
    //     //     treeDatas = this.getFlux().store("YFTDeviceMonitorTreePageStore").getState().DeviceMonitorTreeData;
    //     // }
    //     $.fn.zTree.init($("#monitorTree"), setting, treeDatas);
    //     treeObj = $.fn.zTree.getZTreeObj("monitorTree");
    //     var newNodes = treeObj.transformToArray(treeObj.getNodes());
    //     var bInNewTree = false;
    //     if(selectedNodes.length > 0) {
    //         for(var i = 0; i < newNodes.length; i++) {
    //             if(newNodes[i].id == selectedNodes[0].id) {
    //                 bInNewTree = true;
    //                 treeObj.selectNode(newNodes[i]);
    //                 this.setState({curNode:newNodes[i]});
    //                 break;
    //             }
    //         }
    //     }
    //
    //     if(!bInNewTree) {
    //         treeObj.selectNode(newNodes[0]);
    //         this.setState({curNode:newNodes[0]});
    //     }
    //
    //     for(var i = 0; i < openNodes.length; i++) {
    //         for(var j = 0; j < newNodes.length; j++) {
    //             if(newNodes[j].id == openNodes[i].id) {
    //                 treeObj.expandNode(newNodes[j], true, false);
    //                 // newNodes[j].open = true;
    //                 break;
    //             }
    //         }
    //     }
    // },
    _handleOnClickExpandAll: function() {
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        treeObj.expandAll(true);
    },
    _handleOnClickShrinkAll: function() {
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        treeObj.expandAll(false);
    },
    _handleOnClickQuickSearch: function() {
        $("#monitorTree_quickSearch").toggle();
        $("#monitorTree_typeFilter").hide();
    },
    _handleOnSelectQuickSearchResult: function(e) {
        const { onClickMonitorTreeNode } = this.props;
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var i = 0; i < nodes.length; i++) {
            if(nodes[i].id == e.id) {
                onClickMonitorTreeNode(nodes[i]);
                treeObj.selectNode(nodes[i]);
                break;
            }
        }
    },
    _handleOnClickTypeFilter: function() {
        $("#monitorTree_typeFilter").toggle();
        $("#monitorTree_quickSearch").hide();
    },
    // _handleOnChangeFilteType: function(e) {
    //     this.setState({filteType: e});
    //     if(e.type == "0") {
    //         this.getFlux().actions.YFTDeviceMonitorTreeActions.get_DeviceMonitorTreeData();
    //     }
    //     else {
    //         this.getFlux().actions.YFTDeviceMonitorTreeActions.get_DeviceMonitorTreeDataByType([{key:"TYPE", value: e.name}]);
    //     }
    //
    //     var that = this;
    //     var setting = {
    //         view: {
    //             dblClickExpand: false,
    //             showLine: true,
    //             nameIsHTML: true,
    //             selectedMulti: false
    //         },
    //         data: {
    //             simpleData: {
    //                 enable:true,
    //                 idKey: "id",
    //                 pIdKey: "pid",
    //                 rootPid: ""
    //             }
    //         },
    //         callback: {
    //             beforeClick: function(treeId, treeNode) {
    //                 that.onClickChild(treeNode);
    //             },
    //             onRightClick: function(event, treeId, treeNode){
    //                 // that.OnRightClick(event, treeId, treeNode)
    //             }
    //         }
    //     };
    //     var treeDatas;
    //     if(this.getFlux().store("YFTDeviceMonitorTreePageStore").getState().DeviceMonitorTreeData==null || this.getFlux().store("YFTDeviceMonitorTreePageStore").getState().DeviceMonitorTreeData==""){
    //         // window.location.href="#/"
    //         treeDatas = [];
    //     }else{
    //         treeDatas = this.getFlux().store("YFTDeviceMonitorTreePageStore").getState().DeviceMonitorTreeData;
    //     }
    //     $.fn.zTree.init($("#monitorTree"), setting, treeDatas);
    //     treeObj = $.fn.zTree.getZTreeObj("monitorTree");
    //     var nodes = treeObj.transformToArray(treeObj.getNodes());
    //     treeObj.selectNode(nodes[0]);
    //     this.setState({curNode:nodes[0]});
    //
    //     var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
    //     var yftEquipmentActions = this.getFlux().actions.YFTEquipmentActions;
    //     var initialSelectedGroupId = nodes[0].id;
    //     var initialSelectedGroupName = nodes[0].name;
    //     if(nodes[0].type=="organize" || nodes[0].type=="other") {
    //         // document.getElementById("loadingPic").style.display = 'block';
    //         var _this = this;
    //         // setTimeout(function () {
    //             if(e.type != "0") {
    //                 yftDeviceMonitorAction.set_PieChartMonitorType(e.type);
    //                 yftDeviceMonitorAction.set_SelectedTearmEquipmentNameData({RecId:"0", name:""});
    //                 switch (e.type) {
    //                     case "1":
    //                         document.getElementById('radio_pieChart_monitorType_camera').checked = true;
    //                         break;
    //                     case "2":
    //                         document.getElementById('radio_pieChart_monitorType_DVR').checked = true;
    //                         break;
    //                     case "3":
    //                         document.getElementById('radio_pieChart_monitorType_NVR').checked = true;
    //                         break;
    //                     case "4":
    //                         document.getElementById('radio_pieChart_monitorType_encoder').checked = true;
    //                         break;
    //                     case "5":
    //                         document.getElementById('radio_pieChart_monitorType_IPSAN').checked = true;
    //                         break;
    //                     default:
    //                         document.getElementById('radio_pieChart_monitorType_camera').checked = true;
    //                         break;
    //                 }
    //             }
    //             var filter = [{key:"GROUPID",value:initialSelectedGroupId},{key:"TYPE",value:_this.getFlux().store("YFTDeviceMonitorStore").getState().PieChartMonitorType}];
    //             yftDeviceMonitorAction.set_GetTearmListDataType(1);
    //             yftDeviceMonitorAction.get_TearmListData(filter);
    //             yftDeviceMonitorAction.set_MonitorGroupId(initialSelectedGroupId);
    //             yftDeviceMonitorAction.set_MonitorName(initialSelectedGroupName);
    //             //yftDeviceMonitorAction.set_StatisticalView();
    //             yftDeviceMonitorAction.set_MonitorView(1);
    //         //     document.getElementById("loadingPic").style.display = 'none';
    //         // }, 100);
    //     }
    //     else if(nodes[0].type=="group") {
    //         // document.getElementById("loadingPic").style.display = 'block';
    //         setTimeout(function () {
    //             // yftEquipmentActions.get_GroupAllData(initialSelectedGroupId);
    //             // yftDeviceMonitorAction.set_MonitorName(initialSelectedGroupName);
    //             // yftDeviceMonitorAction.set_MonitorView(3);
    //             yftEquipmentActions.get_GroupAllData(initialSelectedGroupId);
    //             yftDeviceMonitorAction.set_monitorParam_4({monitorName: initialSelectedGroupName, monitorView: 3});
    //             // document.getElementById("loadingPic").style.display = 'none';
    //         }, 100);
    //     }
    // },
    openGroup:function(){
      var curNode = this.props.selectedNode;
      var cid = curNode.id;
      var param = [{"key":"RecId","value":cid},{"key":"operate","value":"start"}];
      this.props.changeGroupStatus(param, this);

    //   this.props.changeGroupStatus(param);
      //
    //   var newList = [];
    //   var tTree = this;
    //   var tData = this.props.treeData;
    //   for(var i=0;i<tData.length;i++){
    //     var tid = tData[i].id;
    //     if(tid == cid){
    //       tData[i].status = "good";
    //       tData[i].icon = "./img/itoss/groupgood.png";
    //     };
    //     newList.push(tData[i]);
    //   };
    //   this.hideRightMenu();
    //   this.props.initTree(tTree,newList);
    },
    disableGroup:function(){
      var curNode = this.props.selectedNode;
      var cid = curNode.id;
      var param = [{"key":"RecId","value":cid},{"key":"operate","value":"disable"}];
      this.props.changeGroupStatus(param, this);

    //   this.props.changeGroupStatus(param);
      //
    //   var newList = [];
    //   var tTree = this;
    //   var tData = this.props.treeData;
    //   for(var i=0;i<tData.length;i++){
    //     var tid = tData[i].id;
    //     if(tid == cid){
    //       tData[i].status = "disabled";
    //       tData[i].icon = "./img/itoss/groupdisabled.png";
    //     };
    //     newList.push(tData[i]);
    //   };
    //   this.hideRightMenu();
    //   this.props.initTree(tTree,newList);
    },
    deleteGroup:function(){
      var curNode = this.props.selectedNode;
      var cid = curNode.id;
      var param = [{"key":"RecId","value":cid},{"key":"operate","value":"delete"}];
      this.props.changeGroupStatus(param, this);

    //   this.props.changeGroupStatus(param);
      //
    //   var newList = [];
    //   var tTree = this;
    //   var tData = this.props.treeData;
    //   for(var i=0;i<tData.length;i++){
    //     var tid = tData[i].id;
    //     if(tid != cid){
    //       newList.push(tData[i]);
    //     };
    //   };
    //   this.hideRightMenu();
    //   this.props.initTree(tTree,newList);
    },
    editEquipment:function(){
      this.history.pushState(null,'equipmentManage/createResourcePage');
    },
    startEquipment:function(){
      var curNode = this.props.selectedNode;
      var cid = curNode.id;
      var param = [{"key":"RecId","value":cid},{"key":"operate","value":"start"}];
      this.props.changeEquipmentStatus(param, this);
    },
    disableEquipment:function(){
      var curNode = this.props.selectedNode;
      var cid = curNode.id;
      var param = [{"key":"RecId","value":cid},{"key":"operate","value":"disable"}];
      this.props.changeEquipmentStatus(param, this);
    },
    deleteEquipment:function(){
      var curNode = this.props.selectedNode;
      var cid = curNode.id;
      var param = [{"key":"RecId","value":cid},{"key":"operate","value":"delete"}];
      this.props.changeEquipmentStatus(param, this);
    },
    render:function(){
        const { onClickRefresh, onChangeFilteType } = this.props;
        return(
            <div className="zTreeMonitor monitorTree2">
                <div>
                    <label>
                        监测树
                        <span className="addCircle" onClick={onClickRefresh} title="刷新监测树"><i className="fa fa-refresh"></i></span>
                        <span className="addCircle" onClick={this._handleOnClickShrinkAll} title="全部收起"><i className="fa fa-minus-square"></i></span>
                        <span className="addCircle" onClick={this._handleOnClickExpandAll} title="全部打开"><i className="fa fa-plus-square"></i></span>
                        <span className="addCircle" onClick={this._handleOnClickQuickSearch} title="快速检索"><i className="fa fa-search"></i></span>
                        <span className="addCircle" onClick={this._handleOnClickTypeFilter} title="设备类型类型过滤"><i className="fa fa-filter"></i></span>
                    </label>
                </div>
                <ReactWidgets.Combobox id="monitorTree_quickSearch" className="comboboxStyle" open={this.state.quickSearchOpen} data={this.state.quickSearchResults} textField="node" onToggle={()=>this.setState({ quickSearchOpen: false})} onSelect={this._handleOnSelectQuickSearchResult}/>
                <ReactWidgets.DropdownList id="monitorTree_typeFilter" className="comboboxStyle" data={filteTypes} textField="name" value={this.state.filteType} onChange={onChangeFilteType}/>
                <ul id="monitorTree" className="ztree"></ul>
                <div id="rMenu3">
                    <ul className="rightClickMenu" style={{"display":"none"}}>
                        <li>
                            <a data-toggle="modal" data-target="#createResourceModal">
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/add.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">新增资源</span>
                            </a>
                        </li>
                        <li>
                            <a data-toggle="modal" data-target="#listResourceModal">
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/refresh.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">排序</span>
                            </a>
                        </li>
                        <hr/>
                        <li id="monitorTree2Startli">
                            <a href="javascript:void(0)" onClick={this.openGroup}>
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/start.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">启用分组</span>
                            </a>
                        </li>
                        <li id="monitorTree2Disableli">
                            <a href="javascript:void(0)" onClick={this.disableGroup}>
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/disable.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">禁用分组</span>
                            </a>
                        </li>
                        <li>
                            <a data-toggle="modal" data-target="#updateResourceModal">
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/edit.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">编辑分组</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" onClick={this.deleteGroup}>
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/delete.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">删除分组</span>
                            </a>
                        </li>
                        <li>
                            <a data-toggle="modal" data-target="#createSubGroupModal">
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/addson.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">添加子组</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div id="rMenu4">
                    <ul className="rightClickMenu" style={{"display":"none"}}>
                        <li>
                            <a data-toggle="modal" data-target="#createMonitorModal">
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/monitor.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">添加监测器</span>
                            </a>
                        </li>
                        <hr/>
                        <li>
                            <a href="javascript:void(0)">
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/dashboard.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">设备仪表板</span>
                            </a>
                        </li>
                        <hr/>
                        <li>
                            <a href="javascript:void(0)" onClick={this.editEquipment}>
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/editzy.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">编辑资源</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/refreshzy.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">刷新资源</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" onClick={this.deleteEquipment}>
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/deletezy.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">删除资源</span>
                            </a>
                        </li>
                        <li id="rightMenuStartEquipmentLi">
                            <a href="javascript:void(0)" onClick={this.startEquipment}>
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/startzy.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">启用资源</span>
                            </a>
                        </li>
                        <li id="rightMenuDisableEquipmentLi">
                            <a href="javascript:void(0)" onClick={this.disableEquipment}>
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/disablezy.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">禁用资源</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/copyzy.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">移动资源</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

$(window).resize(function () {
    var height = $(window).height() - 110 - 30 + 'px';
    var height2 = $(window).height() - 110 - 30 -22 + 'px';
    $(".leftListDiv").css("height",height);
    $(".monitorTree2").css("height",height2);
    $(".commonTreeDiv").css("height",height2);
    $(".dictTreeDiv").css("height",height2);
    $(".groupZTree").css("height",height2);
});

Ztreeview1.propTypes = {
  onCallBackSetMonitorTree: PropTypes.func.isRequired,
  onClickRefresh: PropTypes.func.isRequired,
  onClickMonitorTreeNode: PropTypes.func.isRequired,
  onChangeFilteType: PropTypes.func.isRequired,
  treeData: PropTypes.array.isRequired
};

module.exports = Ztreeview1;
