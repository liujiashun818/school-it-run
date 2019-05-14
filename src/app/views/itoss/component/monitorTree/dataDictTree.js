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

var Ztreeview1 = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         dict:flux.store("DictStore").getState()
    //     }
    // },
    getInitialState:function(){
        return({
        })
    },
    initTree:function(treeData){
        var zTree;
        var that = this;
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
          var t = $("#dictTree");
          t = $.fn.zTree.init(t, setting, treeData);
          var zTree = $.fn.zTree.getZTreeObj("dictTree");
        });
    },
    onExpandNode:function(event, treeId, treeNode){
      $(".dictTreeDiv .ztree ul li a").each(function(){
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
        var height = $(window).height() - 400 + 'px';
        var height2 = $(window).height() - 440 + 'px';
        $("#dictTree").css("height",height2);
        $(".dictTreeDiv").css("height",height);
        var data = [
          {id:1,name:"资产管理",pid:0,open:true},
          {id:2,name:"故障管理",pid:0,open:true},
          // {id:3,name:"品牌管理",pid:1},
          // {id:4,name:"资产类型管理",pid:1},
          {id:5,name:"资产状态管理",pid:1},
          // {id:6,name:"物理位置管理",pid:1},
          // {id:7,name:"应用响应级别管理",pid:1},
          {id:8,name:"资产类型管理",pid:1},
          {id:9,name:"故障大类管理",pid:2},
          {id:10,name:"故障细类管理",pid:2},
          // {id:11,name:"故障类型管理",pid:2},
          {id:12,name:"区域管理",pid:0,open:true},
          {id:13,name:"区域管理",pid:12},
          // {id:14,name:"子区域管理",pid:12},
          {id:15,name:"网络拓扑",pid:0,open:true},
          {id:16,name:"拓扑导航配置",pid:15},
          {id:17,name:"工单管理",pid:0,open:true},
          {id:18,name:"工单状态",pid:17}
        ];
        this.initTree(data);
        $(function(){
          $(".dictTreeDiv .ztree li a").each(function(){
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
      var that = this;
        $(".ztree").find("li").each(function(){
            $(this).attr("class","normalNodeLi");
        })
        var zTree = $.fn.zTree.getZTreeObj("dictTree");
        var isparent = treeNode.isParent;
        if(isparent){
          zTree.expandNode(treeNode);
        }else{
          var id = treeNode.id;
          var name = treeNode.name;
          var data = {
            id:id,name:name
          };
          that.props.setRightDictPage(data);
          // console.log(treeNode.name);
        };
        switch (id) {
          case 3:
            that.props.getRightPageData(1);
            break;
          case 5:
            that.props.getRightPageData(2);
            break;
          case 8:
            that.props.getRightPageData(3);
            break;
          case 9:
            that.props.getRightPageData(4);
            break;
          case 10:
            that.props.getRightPageData(5);
            break;
          case 13:
            that.props.getRightPageData(6);
            break;
          case 16:
            that.props.getRightPageData(7);
            break;
          case 18:
            that.props.getRightPageData(8);
            break;
        };
        var tid = treeNode.tId;
        var li = $("#"+tid);
        $(li).attr("class","curSelectedNodeLi");
        $(li).find("a").attr("class","curSelectedNode");
        $("#dictTree").find("li").find("a").attr("class","");
        // this.hideRightMenu();
        var curNode1 = this.state.curNode;
        if(curNode1!=null && curNode1!=""){
          var curAid = curNode1.tId;
          var lis = $("#"+curAid+"_a");
          document.getElementById(curAid+"_a").className = "fadeOutTreeNode";
        };
        this.setState({curNode:treeNode});
    },
    render:function(){
        return(
            <div className="zTreeMonitor dictTreeDiv">
              <div>
                <label>数据字典菜单</label>
              </div>
              <ul id="dictTree" className="ztree" style={{"backgroundColor":"#fff"}}></ul>
            </div>
        );
    }
});

module.exports = Ztreeview1;
