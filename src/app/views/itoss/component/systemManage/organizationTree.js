/**
 * tianzhuo.nie  2015/12/11.
 */

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Ztreeview1 = React.createClass({
    mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore","YFTDeviceMonitorTreePageStore")],
    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            // itoss_SeviceLevel:flux.store("ServiceLevelPageStore").getState()
        }
    },

    getInitialState:function(){
        return({
        })
    },

    initTree:function(){
        var zTree;
        var treeDatas;
        var that = this;
        var setting = {
            check: {
				enable: true
			},
            view: {
                dblClickExpand: false,
                showIcon: false,
                showLine: true,
                nameIsHTML: true,
                selectedMulti: false
            },
            data: {
                key: {
                    name: "NAME"
                },
                simpleData: {
                    enable:true,
                    idKey: "ID",
                    pIdKey: "PARENT_ID",
                    rootPid: ""
                }
            },
            callback: {
                beforeClick: function(treeId, treeNode) {
                    that.onClickChild(treeNode);
                }
            }
        };
        if(that.props.treeData==null || that.props.treeData==""){
            treeDatas = [];
        }else{
            treeDatas = that.props.treeData;
        }
        $(document).ready(function(){
            var t = $("#organizationTree");
            t = $.fn.zTree.init(t, setting, treeDatas);
            var zTree = $.fn.zTree.getZTreeObj("organizationTree");
        });
    },

    componentWillMount:function(){
        var treeDatas;
        if(this.props.treeData==null || this.props.treeData==""){
            treeDatas = [];
        }else{
            treeDatas = this.props.treeData;
        }
    },
    componentDidMount:function(){
        // var height = $(window).height() - 110 - 30 + 'px';
        // var height2 = $(window).height() - 110 - 30 -22 + 'px';
        // $(".leftListDiv").css("height",height);
        // $(".zTreeMonitor").css("height",height2);
        this.initTree();
    },
    componentDidUpdate:function(){
        this.initTree();
    },
    onClickChild:function(treeNode){
        // console.log(treeNode.getIndex());
        $(".ztree").find("li").each(function(){
            $(this).attr("class","normalNodeLi");
        })
        var zTree = $.fn.zTree.getZTreeObj("organizationTree");
        if (treeNode.isParent) {
            zTree.expandNode(treeNode);
        }
        var tid = treeNode.tId;
        var li = $("#"+tid);
        $(li).attr("class","curSelectedNodeLi");
        $(li).find("a").attr("class","curSelectedNode");
        $("#organizationTree").find("li").find("a").attr("class","");
    },
    render:function(){
        return(
            <div id="organizationTreeDiv" className="zTreeMonitor">
                <ul id="organizationTree" className="ztree"></ul>
            </div>
        );
    }
});

$(window).resize(function () {
    // var height = $(window).height() - 110 - 30 + 'px';
    // var height2 = $(window).height() - 110 - 30 -22 + 'px';
    // $(".leftListDiv").css("height",height);
    // $(".zTreeMonitor").css("height",height2);
    if(document.getElementById('organizationTreeDiv') != null) {
        document.getElementById("organizationTreeDiv").style.height = "auto";
    }
});

module.exports = Ztreeview1;
