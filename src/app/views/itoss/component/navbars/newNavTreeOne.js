/*
一级导航条
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
          var t = $("#navbarTree");
          t = $.fn.zTree.init(t, setting, tlist);
          var zTree = $.fn.zTree.getZTreeObj("navbarTree");
        });
    },
    componentDidMount:function(){
      this.initTree();
      // console.log(this.props.);
      var that = this;
      var zTree = $.fn.zTree.getZTreeObj("navbarTree");
      var nodes = zTree.getNodes();

      var navBefore = this.props.curOneNode; //前一个节点;
      var propMude = this.props.firstModu;
      if(propMude != null && propMude != ""){
        // console.log(propMude);
        var nameParam = "";
        $(".lftMenuDiv").hide();
        switch (propMude) {
          case "0":
            // console.log("首页")
            nameParam = "首页";
            break;
          case "1":
            // console.log("资源监测")
            nameParam = "资源监测";
            break;
          case "2":
            // console.log("资产管理")
            nameParam = "资产管理";
            break;
          case "3":
            // console.log("网络拓扑")
            nameParam = "网络拓扑";
            break;
          case "4":
            // console.log("运维管理")
            nameParam = "运维管理";
            break;
          case "5":
            // console.log("报表管理")
            nameParam = "报表管理";
            break;
          case "6":
            // console.log("系统设置")
            nameParam = "系统设置";
            break;
        };
        var curNode = zTree.getNodeByParam("name",nameParam);
        var tid = curNode.tId;
        var Tid = curNode.id;
        if(navBefore != null || navBefore != ""){
          var curAid = navBefore.tId;
          if(curAid != tid){
            zTree.selectNode(curNode);
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
          zTree.selectNode(curNode);
          $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
        };
        $(".lftMenuDiv").hide();
        var ta = "#lft-tab-"+(Tid-1);
        $(ta).show();
        that.props.onSetCurOneNode(curNode);
      }else{
        console.log("error");
      };
      $(function(){
        $(".navbarTreeDiv .ztree li a").each(function(){
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
    },
    onClickChild:function(treeNode){
      var tid = treeNode.tId;
      var Tid = treeNode.id;
      var li = $("#"+tid);
      var navBefore = this.props.curOneNode;
      var name = navBefore.name;
      var treeId = "";
      switch (name) {
        case "首页":
          treeId = "indexMenu";
          break;
        case "资源监测":
          treeId = "resourceMenu";
          break;
        case "资产管理":
          treeId = "assetMenu";
          break;
        case "运维管理":
          treeId = "workOrderMenu";
          break;
        case "报表管理":
          treeId = "reportMenu";
          break;
        case "系统设置":
          treeId = "systemMenu";
          break;
        case "网络拓扑":
          treeId = "mapMenu";
          break;
      }
      // this.props.onSetCurOneNode(treeNode);
      $(".lftMenuDiv").hide();
      if(Tid != 1){
        var ta = "#lft-tab-"+(Tid-1);
        $(ta).show();
      };
      var toUrl = treeNode.toUrl;
      this.props.onSetCurThreeNode("");
      this.history.pushState(null,toUrl);
      // var curThreeNode = this.props.curThreeNode;
      // if(curThreeNode != null && curThreeNode != ""){
      //   this.props.onSetPreThreeNode(curThreeNode);
      // };
      // var zTree = $.fn.zTree.getZTreeObj("commonTree");
      // if(zTree != null && zTree != ""){
      //   var treeNodes = zTree.getNodes();
      //   this.props.onSetCurThreeNode(treeNodes[0]);
      // };
    },
    render:function(){
        return(
            <div className="zTreeMonitor navbarTreeDiv">
              <ul id="navbarTree" className="ztree"></ul>
            </div>
        );
    }
});

module.exports = Ztreeview1;
