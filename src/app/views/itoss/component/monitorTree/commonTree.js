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
// var Navigation = require('react-router').Navigation;
// var Fluxxor = require('fluxxor');

// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Ztreeview1 = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("YFTIndexStore").getState()
    //     }
    // },
    getInitialState:function(){
        return({
          isDefault:0
        })
    },
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
          var t = $("#commonTree");
          t = $.fn.zTree.init(t, setting, tlist);
          var zTree = $.fn.zTree.getZTreeObj("commonTree");
        });
    },
    componentDidMount:function(){
      var that = this;
      var height = $(window).height() - 400 + 'px';
      var height2 = $(window).height() - 440 + 'px';
      $("#commonTree").css("height",height2);
      $(".commonTreeDiv").css("height",height);
      this.initTree();
      var clearMark = this.props.clearMark;
      if(clearMark == "1"){
        this.props.onGetPreThreeNode("");
        this.props.onGetCurThreeNode("");
        return false;
      };

      var zTree = $.fn.zTree.getZTreeObj("commonTree");
      var treeNodes = zTree.getNodes();

      var preThreeNode = this.props.preThreeNode;
      var curThreeNode = this.props.curThreeNode;
      var curName = this.props.curName;
      if(curName == null || curName == ""){
        if(curThreeNode == null || curThreeNode == ""){
          var tid = treeNodes[0].tId;
          zTree.selectNode(treeNodes[0]);
          $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
          that.props.onGetCurThreeNode(treeNodes[0]);
        }else{
          var tid = curThreeNode.tId;
          if(preThreeNode != null && preThreeNode != ""){
            var ptid = preThreeNode.tId;
            if(ptid != tid){
              zTree.selectNode(curThreeNode);
              $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
            }else{
              $("#"+tid+"_a").attr("class","curSelectedNode");
              $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
            };
            var targetA = document.getElementById(ptid+"_a");
            var targetLi = document.getElementById(ptid);
            if(targetLi != null && targetLi != "" && ptid != tid){
              document.getElementById(ptid+"_a").className = "fadeOutTreeNode";
              document.getElementById(ptid).className = "fadeOutMenu";
            };
          }else{
            zTree.selectNode(curThreeNode);
            $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
          };
        };
      }else{
        for(var i=0;i<treeNodes.length;i++){
          var liName = treeNodes[i].name;
          if(liName == curName){
            var litid = treeNodes[i].tId;
            zTree.selectNode(treeNodes[i]);
            $("#"+litid).attr("class","curSelectedNodeLi fadeInMenu");
            that.props.setCurName("");
            that.props.onGetCurThreeNode(treeNodes[i]);
            break;
          };
        };
      };
      $(function(){
        $(".commonTreeDiv .ztree li a").each(function(){
          var $node = $(this);
          var $pNode = $(this).parent("li");
          $node.mouseover(function(){
            var claz = $(this).attr("class");
            var ind = claz.indexOf("curSelectedNode");
            if(ind>=0){
              $node.attr("class","");
              $node.attr("class","curSelectedNode");
              $pNode.attr("class","fadeInMenu");
            }else{
              $node.attr("class","fadeInTreeNodeHover");
              $pNode.attr("class","fadeInMenuHover");
            };
          });
          $node.mouseout(function(){
            var claz = $(this).attr("class");
            var ind = claz.indexOf("curSelectedNode");
            if(ind>=0){
              $node.attr("class","");
              $node.attr("class","curSelectedNode");
              $pNode.attr("class","fadeInMenu");
            }else{
              $node.attr("class","fadeOutTreeNodeHover");
              $pNode.attr("class","fadeOutMenuHover");
            };
          });
        });
      });
    },
    componentDidUpdate:function(){
      var that = this;
      var canUpdate = this.props.canUpdate;
      var isOperationMark = this.props.isOperationMark;
      if(isOperationMark == "1" && canUpdate == "true"){
        var height = $(window).height() - 400 + 'px';
        var height2 = $(window).height() - 440 + 'px';
        $("#commonTree").css("height",height2);
        $(".commonTreeDiv").css("height",height);
        that.initTree();
        var clearMark = that.props.clearMark;
        if(clearMark == "1"){
          that.props.onGetPreThreeNode("");
          that.props.onGetCurThreeNode("");
          return false;
        };

        var zTree = $.fn.zTree.getZTreeObj("commonTree");
        var treeNodes = zTree.getNodes();

        var preThreeNode = that.props.preThreeNode;
        var curThreeNode = that.props.curThreeNode;
        if(curThreeNode == null || curThreeNode == ""){
          var tid = treeNodes[0].tId;
          zTree.selectNode(treeNodes[0]);
          $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
          that.props.onGetCurThreeNode(treeNodes[0]);
        }else{
          var tid = curThreeNode.tId;
          if(preThreeNode != null && preThreeNode != ""){
            var ptid = preThreeNode.tId;
            if(ptid != tid){
              zTree.selectNode(curThreeNode);
              $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
            }else{
              $("#"+tid+"_a").attr("class","curSelectedNode");
              $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
            };
            var targetA = document.getElementById(ptid+"_a");
            var targetLi = document.getElementById(ptid);
            if(targetLi != null && targetLi != "" && ptid != tid){
              document.getElementById(ptid+"_a").className = "fadeOutTreeNode";
              document.getElementById(ptid).className = "fadeOutMenu";
            };
          }else{
            zTree.selectNode(curThreeNode);
            $("#"+tid).attr("class","curSelectedNodeLi fadeInMenu");
          };
        };
        $(function(){
          $(".commonTreeDiv .ztree li a").each(function(){
            var $node = $(this);
            var $pNode = $(this).parent("li");
            $node.mouseover(function(){
              var claz = $(this).attr("class");
              var ind = claz.indexOf("curSelectedNode");
              if(ind>=0){
                $node.attr("class","");
                $node.attr("class","curSelectedNode");
                $pNode.attr("class","fadeInMenu");
              }else{
                $node.attr("class","fadeInTreeNodeHover");
                $pNode.attr("class","fadeInMenuHover");
              };
            });
            $node.mouseout(function(){
              var claz = $(this).attr("class");
              var ind = claz.indexOf("curSelectedNode");
              if(ind>=0){
                $node.attr("class","");
                $node.attr("class","curSelectedNode");
                $pNode.attr("class","fadeInMenu");
              }else{
                $node.attr("class","fadeOutTreeNodeHover");
                $pNode.attr("class","fadeOutMenuHover");
              };
            });
          });
        });
      };
    },
    onClickChild:function(treeNode){
      var that = this;
      $(".ztree").find("li").each(function(){
          $(this).attr("class","normalNodeLi");
      })
      var curThreeNode = this.props.curThreeNode;
      var flowId = treeNode.flowId;
      if(flowId!=null && flowId!=""){
        $("#createOperationOrderTitle").val("");
        $("#createOperationOrderExplain").val("");
        $("#createOperationFaultType").find(".rw-input").text("");
        $("#createOperationFaultSubType").find(".rw-input").text("");
        $("#createOperationOrderLevel").find(".rw-input").text("");
        $("#createOperationOrderSla").find(".rw-input").text("");
        $("#createOperationOrderResponse").val("");
        $("#createOperationOrderOver").val("");
        that.props.init_detailData(2);
        that.props.set_curWorkFlowType(flowId);
        var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
        that.props.get_createOrderInfo(param);
        that.history.pushState(null,'operationManage/createOperation');
        $(".operationButtonGroup1").find(".buttonInfo").find("button").each(function(){
          $(this).attr("disabled",false);
          // console.log($(this).index());
          var indes = $(this).index();
          if(indes == 1){
            $(this).css("background-color","#00b724");
          }else if(indes == 2){
            $(this).css("background-color","#FF9933");
          };
        });
      };
      if(curThreeNode.name == treeNode.name && curThreeNode.tId == treeNode.tId){
        this.props.onGetPreThreeNode("");
      }else{
        this.props.onGetPreThreeNode(curThreeNode);
      };
      this.props.onGetCurThreeNode(treeNode);
      var zTree = $.fn.zTree.getZTreeObj("commonTree");
      var isparent = treeNode.isParent;
      if(isparent){
        zTree.expandNode(treeNode);
      }else{
        var toUrl = treeNode.toUrl;
        that.history.pushState(null,toUrl);
      };
      // var tid = treeNode.tId;
      // var li = $("#"+tid);
      // $(li).attr("class","curSelectedNodeLi fadeInMenu");
      // $(li).find("a").attr("class","curSelectedNode");
      // $("#dictTree").find("li").find("a").attr("class","");
      // this.hideRightMenu();
      // var curNode1 = this.state.itoss.linshiNode;
      // if(curNode1!=null && curNode1!=""){
      //   var curAid = curNode1.tId;
      //   document.getElementById(curAid+"_a").className = "fadeOutTreeNode";
      //   document.getElementById(curAid).className = "fadeOutMenu";
      // };
      // this.getFlux().actions.YFTIndexActions.set_linshiNode(treeNode);
      // this.getFlux().actions.YFTIndexActions.set_linshiName("");
      var isOperationMark = this.props.isOperationMark;
      if(isOperationMark == "1"){
        this.props.setCanUpdate("true");
      };
    },
    render:function(){
        return(
            <div className="zTreeMonitor commonTreeDiv">
              <ul id="commonTree" className="ztree" style={{"backgroundColor":"#fff"}}></ul>
            </div>
        );
    }
});

module.exports = Ztreeview1;
