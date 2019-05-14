/**
 * tianzhuo.nie  2015/12/11.
 * onClickChild 左键点击方法
 */

var React = require('react');
var ReactRouter = require('react-router');
var util = require('./../../../../utils/util.js');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;

// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var treenodeIndex=0, initialSelectedGroupId="", initialSelectedGroupName="";

var Ztreeview1 = React.createClass({
    mixins: [History],
    getInitialState:function(){
        return({
        })
    },
    initTree:function(treeData){
        var zTree;
        var treeDatas;
        var that = this;
        var valid = util.hasPermission(this.props.Permissions,"/systemmanage/rolemanage/update");
        var check = valid==null?{}:{
            enable: true,
            //是否无法选择
            chkDisabledInherit: true,
            chkboxType:{"Y":"ps","N":"s"},
            //是否单选框
            chkStyle: "checkbox"
        }
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
                    idKey: "resourceId",
                    pIdKey: "parentId",
                    rootPid: ""
                },
                key:{
                  name:"resourceName"
                }
            },
            check: check,
            callback: {
                beforeClick: function(treeId, treeNode) {
                    that.onClickChild(treeNode);
                },
                onRightClick: function(event, treeId, treeNode){
                    return false;
                    // that.OnRightClick(event, treeId, treeNode);
                },
                onCheck :function(event,treeId,treeNode){
                    that.onCheckTree(event,treeId,treeNode);
                },
                onExpand: function(event, treeId, treeNode){
                  that.onExpandNode(event, treeId, treeNode);
                }
            }
        };
        treeDatas = treeData;
        $(document).ready(function(){
            var t = $("#leftTree");
            t = $.fn.zTree.init(t, setting, treeDatas);
            var zTree = $.fn.zTree.getZTreeObj("leftTree");
        });
    },
    checkTree:function(data){
      var zTree = $.fn.zTree.getZTreeObj("leftTree");
      for(var i=0;i<data.length;i++){
        zTree.checkNode(data[i],true,true);
      };
    },
    componentDidMount:function(){
      var height = $(window).height() -400 + 'px';
      var height2 = $(window).height() - 440 + 'px';
      $("#leftTree").css("height",height2);
      $(".permissionTree").css("height",height);
      //console.log(this.getFlux().actions.YFTSystemActions);
      // this.getFlux().actions.YFTSystemActions.init_tree(this);
      // var ptreeData = this.props.data;
      // this.initTree(ptreeData);
      this.props.initPermissionTree(this);
      $(function(){
        $(".permissionTree li a").each(function(){
          var $node = $(this);
          $node.mouseover(function(){
            var claz = $(this).attr("class");
            var ind = claz.indexOf("curSelectedNode");
            if(ind>=0){
              $node.attr("class","");
              $node.attr("class","curSelectedNode");
            }else{
              $node.attr("class","fadeInTreeNodeHover");
            };
          });
          $node.mouseout(function(){
            var claz = $(this).attr("class");
            var ind = claz.indexOf("curSelectedNode");
            if(ind>=0){
              $node.attr("class","");
              $node.attr("class","curSelectedNode");
            }else{
              $node.attr("class","fadeOutTreeNodeHover");
            };
          });
        });
      });
    },
    onExpandNode:function(event, treeId, treeNode){
      $(".permissionTree ul li a").each(function(){
        var $node = $(this);
        $node.mouseover(function(){
          var claz = $(this).attr("class");
          var ind = claz.indexOf("curSelectedNode");
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","curSelectedNode");
          }else{
            $node.attr("class","fadeInTreeNodeHover");
          };
        });
        $node.mouseout(function(){
          var claz = $(this).attr("class");
          var ind = claz.indexOf("curSelectedNode");
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","curSelectedNode");
          }else{
            $node.attr("class","fadeOutTreeNodeHover");
          };
        });
      });
    },
    onClickChild:function(treeNode){
        $(".ztree").find("li").each(function(){
            $(this).attr("class","normalNodeLi");
        })
        var zTree = $.fn.zTree.getZTreeObj("leftTree");
        var checkedState = treeNode.checked;
        if(checkedState){
          checkedState = false;
        }else{
          checkedState = true;
        };
        zTree.checkNode(treeNode,checkedState,true);
        var checkedList = zTree.getCheckedNodes(true);
        this.props.setPermissionTreeData(checkedList);

        var tid = treeNode.tId;
        var li = $("#"+tid);
        $(li).attr("class","curSelectedNodeLi");
        $(li).find("a").attr("class","curSelectedNode");
        $("#leftTree").find("li").find("a").attr("class","");

        var curNode1 = this.state.curNode;
        if(curNode1!=null && curNode1!=""){
          var curAid = curNode1.tId;
          var lis = $("#"+curAid+"_a");
          document.getElementById(curAid+"_a").className = "fadeOutTreeNode";
        };
        this.setState({curNode:treeNode});
    },
    onCheckTree:function(event,treeId,treeNode){
      var zTree = $.fn.zTree.getZTreeObj("leftTree");
      var checkedList = zTree.getCheckedNodes(true);
      this.props.setPermissionTreeData(checkedList);
    },
    render:function(){
        return(
            <div className="zTreeMonitor permissionTree">
                <ul id="leftTree" className="ztree" style={{"backgroundColor":"#fff"}}></ul>
            </div>
        );
    }
});

module.exports = Ztreeview1;
