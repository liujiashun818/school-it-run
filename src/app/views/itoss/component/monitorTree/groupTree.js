/**
 * tianzhuo.nie  2015/12/11.
 * onClickChild 左键点击方法
 */

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Navigation = require('react-router').Navigation;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var treenodeIndex=0, initialSelectedGroupId="", initialSelectedGroupName="";

var Ztreeview1 = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("YFTSystemStore").getState()
    //     }
    // },
    getInitialState:function(){
        return({
          curNode:""
        })
    },
    componentWillMount:function(){
      this.props.get_allGroup(this);
    },
    getTree:function(){
      var zTree = $.fn.zTree.getZTreeObj("leftTree");
      return zTree;
    },
    initTree:function(treeData){
        var zTree;
        var treeDatas;
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
                    rootPid: ""
                }
            },
            callback: {
                beforeClick: function(treeId, treeNode) {
                    that.onClickChild(treeNode);
                },
                onRightClick: function(event, treeId, treeNode){
                    // return false;
                    that.OnRightClick(event, treeId, treeNode)
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
    //------------------------------------------右键菜单---------------------------------
    OnRightClick:function(event, treeId, treeNode){
        $(".ztree").find("li").each(function(){
            $(this).attr("class","normalNodeLi");
        })
        var tid = treeNode.tId;
        var li = $("#"+tid);
        var that = this;
        var zTree = $.fn.zTree.getZTreeObj("leftTree");
        var width = event.clientX;
        var limit = $(".groupZTree").width() - 110;
        if(width>limit){
          width=limit;
        };
        var height = $(li).offset().top-100;
        $(li).attr("class","curSelectedNodeLi");
        $(li).find("a").attr("class","curSelectedNode");
        $("#leftTree").find("li").find("a").attr("class","");
        this.hideRightMenu();
        var curNode1 = this.state.curNode;
        if(curNode1!=null && curNode1!=""){
          var curAid = curNode1.tId;
          var lis = document.getElementById(curAid+"_a");
          if(lis != null && lis != ""){
            document.getElementById(curAid+"_a").className = "fadeOutTreeNode";
          };
        };
        this.setState({curNode:treeNode});

        if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
            zTree.cancelSelectedNode();
            that.showRightMenu("root", width, height);
        } else if (treeNode && !treeNode.noR) {
            zTree.selectNode(treeNode);
            that.showRightMenu("node", width, height);
        }
    },
    hideRightMenu:function() {
        var that = this;
        var rMenu = $("#rMenu3");
        if (rMenu) rMenu.css({"visibility": "hidden"});
        $("body").unbind("mousedown", that.onBodyMouseDown);
    },
    showRightMenu:function(type, x, y) {
        $("#rMenu3 ul").show();
        var rMenu = $("#rMenu3");
        var that = this;
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

        $("body").bind("mousedown", that.onBodyMouseDownRight);
    },
    onBodyMouseDownRight:function(event){
        var rMenu = $("#rMenu3");
        if (!(event.target.id == "rMenu3" || $(event.target).parents("#rMenu3").length>0)) {
            rMenu.css({"visibility" : "hidden"});
        }
    },
    onExpandNode:function(event, treeId, treeNode){
      $(".groupZTree .ztree ul li a").each(function(){
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
      var height = $(window).height() - 110 - 30 + 'px';
      var height2 = $(window).height() - 110 - 30 -22 + 'px';
      $(".leftListDiv").css("height",height);
      $(".groupZTree").css("height",height2);
      // setTimeout(function(){
      //   that.props.init_tree(that);
      // },200)
      this.hideRightMenu();
      $(function(){
        $(".groupZTree .ztree ul li a").each(function(){
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
        });

        var zTree = $.fn.zTree.getZTreeObj("leftTree");
        this.props.setCurGroupData(treeNode);
        this.props.init_data(true);
        var tid = treeNode.tId;
        var li = $("#"+tid);
        $(li).attr("class","curSelectedNodeLi");
        $(li).find("a").attr("class","curSelectedNode");
        $("#leftTree").find("li").find("a").attr("class","");
        var curNode1 = this.state.curNode;
        if(curNode1!=null && curNode1!=""){
          var curAid = curNode1.tId;
          var lis = document.getElementById(curAid+"_a");
          document.getElementById(curAid+"_a").className = "fadeOutTreeNode";
        };
        this.hideRightMenu();

        var tname = treeNode.name;
        $(".systemGroupButtonGroup1").find(".titleLeft").find(".extraText").text("-"+tname);

        var isParent = treeNode.isParent;
        if(isParent){
          $("#createGroupCode").attr("disabled",true);
        }else{
          $("#createGroupCode").attr("disabled",false);
        };
        this.setState({curNode:treeNode});
    },
    onClickCreate:function(){
      var nodeData = this.state.curNode;
      var pid = nodeData.id;
      var pname = nodeData.name;
      this.props.set_parentCode(pid);
      this.props.init_data(false);
      $("#createGroupParentCode").find(".rw-input").text(pname);
      $("#createGroupCode").attr("disabled",false);
      this.hideRightMenu();
    },
    onClickEdit:function(){
      var nodeData = this.state.curNode;
      var isParent = nodeData.isParent;
      if(isParent){
        $("#createGroupCode").attr("disabled",true);
      }else{
        $("#createGroupCode").attr("disabled",false);
      };
      this.props.setCurGroupData(nodeData);
      this.props.init_data(true);
      this.hideRightMenu();
    },
    onClickDelete:function(){
      var nodeData = this.state.curNode;
      this.props.setCurGroupData(nodeData);
      this.hideRightMenu();
      $("#deleteAlertModal").modal('show');
    },
    onCreateNew:function(){
      this.props.set_parentCode("");
      this.props.init_data(false);
      $("#createGroupParentCode").find(".rw-input").text("根目录");
      $(".systemGroupButtonGroup1").find(".titleLeft").find(".extraText").text("");
      $("#createGroupCode").attr("disabled",false);
      $(".extraText").text("");
      var treeObj = $.fn.zTree.getZTreeObj("leftTree");
      var nodes = treeObj.getSelectedNodes();
      if (nodes.length>0) {
      	treeObj.cancelSelectedNode(nodes[0]);
      };
    },
    render:function(){
        return(
            <div className="zTreeMonitor groupZTree">
                <div>
                    <label>组织机构结构树<span className="addCircle" onClick={this.onCreateNew} title="新增组织"><i className="fa fa-plus-circle"></i></span></label>
                </div>
                <ul id="leftTree" className="ztree"></ul>
                <div id="rMenu3" className="groupTreeRightMenu">
                    <ul className="rightClickMenu">
                        <li>
                            <a onClick={this.onClickCreate}>
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/add.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">新增子组</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={this.onClickEdit}>
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/refresh.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">修改组织</span>
                            </a>
                        </li>
                        <hr/>
                        <li>
                            <a onClick={this.onClickDelete}>
                                <span className="GroupMenuIconSpan" style={{"background":"url('./img/itoss/menuitem/delete.png') 0 0 no-repeat"}}></span>
                                <span className="GroupMenuName">删除组织</span>
                            </a>
                        </li>
                        <hr/>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Ztreeview1;
