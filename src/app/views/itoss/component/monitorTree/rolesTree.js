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
// var Fluxxor = require('fluxxor');
//
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var treenodeIndex=0, initialSelectedGroupId="", initialSelectedGroupName="";

var Ztreeview1 = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("YFTSystemRoleStore").getState()
    //     }
    // },
    getInitialState:function(){
        return({
        })
    },
    componentWillMount:function(){
      this.props.get_createInfo(this);
    },
    initTree:function(treeData){
        var zTree;
        var treeDatas;
        var that = this;
        var check = {
            enable: true,
            //是否无法选择
            chkDisabledInherit: true,
            //是否单选框
            chkStyle: "checkbox"
        };
        var setting = {
            view: {
                dblClickExpand: false,
                showLine: false,
                nameIsHTML: true,
                showIcon: false,
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable:true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPid: ""
                },
                key:{
                  name:"name"
                }
            },
            check: check,
            callback: {
                beforeClick: function(treeId, treeNode) {
                    that.onClickChild(treeNode);
                },
                onCheck :function(event,treeId,treeNode){
                    that.onCheckTree(event,treeId,treeNode);
                },
                onExpand: function(event, treeId, treeNode){
                  that.onExpandNode(event, treeId, treeNode);
                }
            }
        };
        $(document).ready(function(){
            var t = $("#roleTree");
            t = $.fn.zTree.init(t, setting, treeData);
            var zTree = $.fn.zTree.getZTreeObj("roleTree");
        });
    },
    getChecked:function(){
      var zTree = $.fn.zTree.getZTreeObj("roleTree");
      var nodes = zTree.getCheckedNodes(true);
      return nodes;
    },
    onExpandNode:function(event, treeId, treeNode){
      $(".rolesTree .ztree ul li a").each(function(){
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
    componentDidMount:function(){
      var that = this;
      // setTimeout(function(){
      //   that.props.init_roleTree(that);
      // },500)
      $(function(){
        $(".rolesTree .ztree li a").each(function(){
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
    onClickChild:function(treeNode){
        $(".ztree").find("li").each(function(){
            $(this).attr("class","normalNodeLi");
        })
        var zTree = $.fn.zTree.getZTreeObj("roleTree");
        var checkedState = treeNode.checked;
        if(checkedState){
          checkedState = false;
        }else{
          checkedState = true;
        };
        zTree.checkNode(treeNode,checkedState,true);
        var checkedList = zTree.getCheckedNodes(true);
        var curNode1 = this.state.curNode;
        if(curNode1!=null && curNode1!=""){
          var curAid = curNode1.tId;
          var lis = $("#"+curAid+"_a");
          document.getElementById(curAid+"_a").className = "fadeOutTreeNode";
        };
        this.setState({curNode:treeNode});

        var tid = treeNode.tId;
        var li = $("#"+tid);
        $(li).attr("class","curSelectedNodeLi");
        $(li).find("a").attr("class","curSelectedNode");
        $("#roleTree").find("li").find("a").attr("class","");
    },
    onCheckTree:function(event,treeId,treeNode){
      var zTree = $.fn.zTree.getZTreeObj("roleTree");
      var checkedList = zTree.getCheckedNodes(true);
    },
    render:function(){
        return(
            <div className="zTreeMonitor rolesTree">
              <ul id="roleTree" className="ztree" style={{"backgroundColor":"#fff"}}></ul>
            </div>
        );
    }
});

module.exports = Ztreeview1;
