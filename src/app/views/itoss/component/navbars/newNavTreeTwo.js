/*
二级导航条
*/

// var React = require('react');
import React from 'react'
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

// var Fluxxor = require('fluxxor');
//
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Ztreeview1 = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("NavbarStore").getState()
    //     }
    // },
    getInitialState:function(){
        return({
          isDefault:0
        })
    },
    // propTypes: {
    //   dispatch: React.PropTypes.func.isRequired
    // },
    initTree:function(){
        var zTree;
        var that = this;
        var treeData = this.props.data;
        var treeId = this.props.treeId;
        var ttList = [];
        for(var i=0;i<treeData.length;i++){
          ttList.push(treeData[i]);
        };
        var tlist = [];
        var minData = 0;
        for(var i=0;i<ttList.length;i=0){
          var idi = ttList[i].id;
          var mark = idi;
          for(var j=0;j<ttList.length;j++){
            var idj = ttList[j].id;
            if(idj <= mark){
              mark = idj;
              minData = j;
            };
          };
          tlist.push(ttList[minData]);
          ttList.splice(minData,1);
          if(ttList.length>0){
            continue;
          };
        };
        // console.log(tlist);

        var setting = {
            view: {
                dblClickExpand: false,
                showLine: false,
                showIcon:false,
                nameIsHTML: true,
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable:true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPid: "0"
                },
                key:{
                  name:"name"
                }
            },
            callback: {
                beforeClick: function(treeId, treeNode) {
                    that.onClickChild(treeNode);
                },
                onExpand: function(event, treeId, treeNode){
                  that.onExpandNode(event, treeId, treeNode);
                }
            }
        };
        $(document).ready(function(){
          var t = $("#"+treeId);
          t = $.fn.zTree.init(t, setting, tlist);
          var zTree = $.fn.zTree.getZTreeObj(treeId);
        });
    },
    componentDidUpdate:function(){
      // console.log(this.props);
    },
    componentDidMount:function(){
      this.initTree();
      var that = this;
      var treeId = this.props.treeId;
      var zTree = $.fn.zTree.getZTreeObj(treeId);
      var nodes = zTree.getNodes();
      var navOne = this.props.curOneNode;
      // console.log(this.props);
      var mark = "";
      var markId = "";
      if(navOne == null || navOne == ""){
        mark = "indexMenu";
      }else{
        var name = navOne.name;
        switch (name) {
          case "首页":
            mark = "indexMenu";
            break;
          case "资源监测":
            mark = "resourceMenu";
            break;
          case "资产管理":
            mark = "assetMenu";
            break;
          case "运维管理":
            mark = "workOrderMenu";
            break;
          case "报表管理":
            mark = "reportMenu";
            break;
          case "系统设置":
            mark = "systemMenu";
            break;
          case "网络拓扑":
            mark = "mapMenu";
            break;
        }
      };
      // console.log(mark);
      //
      var navTarget = "";
      var navBefore = "";
      switch (treeId) {
        case "indexMenu":
          navBefore = this.props.preTwoNode.indexMenu;
          navTarget = this.props.curTwoNode.indexMenu;
          markId = "0";
          break;
        case "resourceMenu":
          navBefore = this.props.preTwoNode.resourceMenu;
          navTarget = this.props.curTwoNode.resourceMenu;
          markId = "1";
          break;
        case "assetMenu":
          navBefore = this.props.preTwoNode.assetMenu;
          navTarget = this.props.curTwoNode.assetMenu;
          markId = "2";
          break;
        case "mapMenu":
          navBefore = this.props.preTwoNode.mapMenu;
          navTarget = this.props.curTwoNode.mapMenu;
          markId = "3";
          break;
        case "workOrderMenu":
          navBefore = this.props.preTwoNode.workOrderMenu;
          navTarget = this.props.curTwoNode.workOrderMenu;
          markId = "4";
          break;
        case "reportMenu":
          navBefore = this.props.preTwoNode.reportMenu;
          navTarget = this.props.curTwoNode.reportMenu;
          markId = "5";
          break;
        case "systemMenu":
          navBefore = this.props.preTwoNode.systemMenu;
          navTarget = this.props.curTwoNode.systemMenu;
          markId = "6";
          break;
      };
      var proMude = this.props.firstModu;
      var propMude = this.props.secondModu;
      if(proMude!=null && proMude!=""){
        if(markId == proMude){
          // console.log(markId,proMude,propMude);
          for(var i=0;i<nodes.length;i++){
            var mkId = nodes[i].markId;
            if(mkId == propMude){
              var tid = nodes[i].tId;
              // var param = [{key:treeId},{value:nodes[i]}];
              // var param2 = [{key:treeId},{value:nodes[i]}];
              var param = [treeId,nodes[i]];
              if(navBefore != null && navBefore != ""){
                var curAid = navBefore.tId;
                if(curAid != tid){
                  zTree.selectNode(nodes[i]);
                  $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
                }else{
                  $("#"+tid).attr("class","curSelectedNodeLi fadeInMenuCommon");
                  $("#"+tid+"_a").attr("class","fadeInMenuCommon");
                };
                var targetA = document.getElementById(curAid+"_a");
                var targetLi = document.getElementById(curAid);
                if(targetLi != null && targetLi != "" && curAid != tid){
                  document.getElementById(curAid+"_a").className = "fadeOutTreeNode";
                  document.getElementById(curAid).className = "fadeOutMenu";
                };
              }else{
                zTree.selectNode(nodes[i]);
                $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
              };
              that.props.onSetCurTwoNode(param);
              that.props.onSetPreTwoNode(param);
      //         that.getFlux().actions.NavbarActions.set_navbarDataTwo([param,param2]);
              break;
            };
          };
        };
      }else{
        console.log("error");
      //   if(treeId == mark){
      //     if(navTarget == null || navTarget == ""){
      //       if(nodes.length>0){
      //         var tid = nodes[0].tId;
      //         zTree.selectNode(nodes[0]);
      //         // console.log(treeId);
      //         var param = [{key:treeId},{value:nodes[0]}];
      //         var param2 = [{key:treeId},{value:navTarget}];
      //         // var toUrl = nodes[0].toUrl;
      //         $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
      //         that.getFlux().actions.NavbarActions.set_navbarDataTwo([param,param]);
      //       };
      //     }else{
      //       var tid = navTarget.tId;
      //       var param = [{key:treeId},{value:navTarget}];
      //       var param2 = [{key:treeId},{value:navTarget}];
      //       if(navBefore != null || navBefore != ""){
      //         var curAid = navBefore.tId;
      //         if(curAid != tid){
      //           zTree.selectNode(navTarget);
      //           $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
      //         }else{
      //           $("#"+tid).attr("class","curSelectedNodeLi fadeInMenuCommon");
      //           $("#"+tid+"_a").attr("class","fadeInMenuCommon");
      //         };
      //         var targetA = document.getElementById(curAid+"_a");
      //         var targetLi = document.getElementById(curAid);
      //         if(targetLi != null && targetLi != "" && curAid != tid){
      //           document.getElementById(curAid+"_a").className = "fadeOutTreeNode";
      //           document.getElementById(curAid).className = "fadeOutMenu";
      //         };
      //       }else{
      //         zTree.selectNode(navTarget);
      //         $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
      //       };
      //       that.getFlux().actions.NavbarActions.set_navbarDataTwo([param,param2]);
      //     };
      //   };
      };
      $(function(){
        $(".navbarTreeDiv2 .ztree li a").each(function(){
          var $node = $(this);
          var $pNode = $(this).parent("li");
          $node.mouseover(function(){
            var claz = $(this).attr("class");
            var ind = claz.indexOf("curSelectedNode");
            var ind2 = claz.indexOf("fadeInMenuCommon");
            if(ind2<0){
              if(ind>=0){
                $node.attr("class","");
                $node.attr("class","curSelectedNode");
                $pNode.attr("class","fadeInMenu");
              }else{
                $node.attr("class","fadeInTreeNodeHover");
                $pNode.attr("class","fadeInMenuHover");
              };
            };
          });
          $node.mouseout(function(){
            var claz = $(this).attr("class");
            var ind = claz.indexOf("curSelectedNode");
            var ind2 = claz.indexOf("fadeInMenuCommon");
            if(ind2<0){
              if(ind>=0){
                $node.attr("class","");
                $node.attr("class","curSelectedNode");
                $pNode.attr("class","fadeInMenu");
              }else{
                $node.attr("class","fadeOutTreeNodeHover");
                $pNode.attr("class","fadeOutMenuHover");
              };
            };
          });
        });
      });
      // this.history.pushState(null,toUrl);
    },
    onClickChild:function(treeNode){
      // var treeId = this.props.treeId;
      // var navBefore = this.state.itoss.navTwoBefore;
      // // console.log(curNode);
      // switch (treeId) {
      //   case "indexMenu":
      //     navBefore = this.state.itoss.navTwoBefore.indexMenu;
      //     break;
      //   case "resourceMenu":
      //     navBefore = this.state.itoss.navTwoBefore.resourceMenu;
      //     break;
      //   case "assetMenu":
      //     navBefore = this.state.itoss.navTwoBefore.assetMenu;
      //     break;
      //   case "mapMenu":
      //     navBefore = this.state.itoss.navTwoBefore.mapMenu;
      //     break;
      //   case "workOrderMenu":
      //     navBefore = this.state.itoss.navTwoBefore.workOrderMenu;
      //     break;
      //   case "reportMenu":
      //     navBefore = this.state.itoss.navTwoBefore.reportMenu;
      //     break;
      //   case "systemMenu":
      //     navBefore = this.state.itoss.navTwoBefore.systemMenu;
      //     break;
      // };
      // var navBeforeOne = this.state.itoss.navOneBefore;
      // this.getFlux().actions.NavbarActions.set_navbarDataOne([navBeforeOne,navBeforeOne]);
      // this.getFlux().actions.YFTIndexActions.set_linshiData("");
      // this.getFlux().actions.YFTIndexActions.set_linshiNode("");
      // this.getFlux().actions.YFTIndexActions.set_linshiName("");
      //
      // var param = [{key:treeId},{value:navBefore}];
      // var param2 = [{key:treeId},{value:treeNode}];
      // this.getFlux().actions.NavbarActions.set_navbarDataTwo([param,param2]);
      var toUrl = treeNode.toUrl;
      this.props.onSetCurThreeNode("");
      this.history.pushState(null,toUrl);
      // var curThreeNode = this.props.curThreeNode;
      // if(curThreeNode != null && curThreeNode != ""){
      //  this.props.onSetPreThreeNode("");
      // };
      // var zTree = $.fn.zTree.getZTreeObj("commonTree");
      // if(zTree != null && zTree != ""){
      //   var treeNodes = zTree.getNodes();
      // };
    },
    render:function(){
      // var personalMark = this.props.pmark;
      var treeId = this.props.treeId;
      // console.log(this.props);
      return(
        <div className="zTreeMonitor navbarTreeDiv2">
          <ul id={treeId} className="ztree" style={{"backgroundColor":"rgba(255, 255, 255, 0)"}}></ul>
        </div>
      );
    }
});

module.exports = Ztreeview1;
