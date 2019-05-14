var React = require('react');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ztreeview2 = React.createClass({
	initTree:function(){
	//	//debugger;
		var zTree;
		var that = this;

		var setting = {
//			//是否复选框
//			check: {
//				enable: true,
//				//是否可以无选择框
//				nocheckInherit: true,
//				//是否无法选择
//				chkDisabledInherit: true,
//				//是否单选框
//				chkStyle: "radio",
//				//单选分级为level还是all
//				radioType: "all"
//			},
//			//是否可编辑
//			edit: {
//				enable: true,
//				//删除按钮
//				showRemoveBtn: true,
//				//修改按钮
//				showRenameBtn: true
//			},
			view: {
				//双击事件是否开启
				dblClickExpand: false,
				//是否显示连接线
				showLine: true,
				//name是否是html代码
				nameIsHTML: true,
//				showIcon: 'showIconForTree',
				selectedMulti: false
			},
			data: {
				simpleData: {
					enable:true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: ""
				}
			},
			callback: {
				beforeClick: function(treeId, treeNode) {
					var zTree = $.fn.zTree.getZTreeObj("leftTree");
					if (treeNode.isParent) {
						zTree.expandNode(treeNode);
						return false;
					} else {
						that.onClickChild(treeNode);
					}
				},
				onRightClick: that.OnRightClick
			}
		};

		//nodes的配置API-------------------------------------------------------------------------------------------------------------------
		//id:当前ID,pid:父级ID,name:显示的文字,open:是否打开,isParent:是否是父节点
		//iconOpen:"../../../css/zTreeStyle/img/diy/1_open.png", iconClose:"../../../css/zTreeStyle/img/diy/1_close.png"：打开/关闭时显示什么图标
		//icon:"../../../css/zTreeStyle/img/diy/2.png":设置图标是什么
		//利用 节点数据的 iconSkin 属性 配合 css 实现自定义图标 :iconSkin:"pIcon01"
		//url:"http://www.ztree.me/", target:"_blank":链接
		//nocheck:true:没有选择框，chkDisabled:true, checked:true：无法选择，并被选中
		//
		var zNodes =[
			{id:1, pId:0, name:"[core] 基本功能 演示", open:true},
			{id:101, pId:1, name:"最简单的树 --  标准 JSON 数据",open:true},
			{id:1011, pId:101, name:"最简单的树1--无checkbox"},
			{id:1012, pId:101, name:"最简单的树2"},
			{id:1013, pId:101, name:"最简单的树3"},
			{id:102, pId:1, name:"最简单的树 --  简单 JSON 数据",isParent:true},
			{id:1021, pId:102, name:"<span style='color:blue;margin-right:0px;'>view</span>.<span style='color:red;margin-right:0px;'>nameIsHTML</span>"},
			{id:103, pId:1, name:"to baidu", url:"http://www.baidu.com", target:"_blank"},
			{id:2, pId:0, name:"[excheck] 复/单选框功能 演示", open:true},
			{id:201, pId:2, name:"最简单的树 "},
			{id:202, pId:2, name:"最简单的树 2"},
			{id:203, pId:2, name:"最简单的树 3"},
			{id:204, pId:2, name:"最简单的树 4"},
			{id:3, pId:0, name:"[exedit] 编辑功能 演示", open:false},
		];

		$(document).ready(function(){
			var t = $("#leftTree");
			t = $.fn.zTree.init(t, setting, zNodes);
//			demoIframe = $("#testIframe");
//			demoIframe.bind("load", loadReady);
			var zTree = $.fn.zTree.getZTreeObj("leftTree");
			zTree.selectNode(zTree.getNodeByParam("id", 101));

		});
	},
	//------------------------------------------右键菜单---------------------------------
	OnRightClick:function(event, treeId, treeNode){
		var zTree = $.fn.zTree.getZTreeObj("leftTree");
		var that = this;
		if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
			zTree.cancelSelectedNode();
			that.showRMenu("root", event.clientX, event.clientY);
		} else if (treeNode && !treeNode.noR) {
			zTree.selectNode(treeNode);
			that.showRMenu("node", event.clientX, event.clientY);
		}
	},
	hideRMenu:function() {
		var that = this;
		var rMenu = $("#rMenu");
		if (rMenu) rMenu.css({"visibility": "hidden"});
		$("body").unbind("mousedown", that.onBodyMouseDown);
	},
	showRMenu:function(type, x, y) {
		$("#rMenu ul").show();
		var rMenu = $("#rMenu");
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
		rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});

		$("body").bind("mousedown", that.onBodyMouseDown);
	},
	onBodyMouseDown:function(event){
		var rMenu = $("#rMenu");
		if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
			rMenu.css({"visibility" : "hidden"});
		}
	},
	//---------------------------------------over
	//获取字体
	getFont:function(treeId, node) {
		return node.font ? node.font : {};
	},
	//勾选统计
	count:function() {
		var zTree = $.fn.zTree.getZTreeObj("leftTree");
		var checkCount = zTree.getCheckedNodes(true).length;//选中个数
		var nocheckCount = zTree.getCheckedNodes(false).length;//未选中个数
		var changeCount = zTree.getChangeCheckedNodes().length;//变动的个数
	},
	componentDidMount:function(){
		this.initTree();
		this.hideRMenu();
	},
	onClickChild:function(treeNode){
		alert(treeNode.name);
	},
	onClickMenu:function(a){
		var menuItem = $($(a.target).parent().find("span")[0]);
		console.log("point:-------"+menuItem.attr("class"));
	},
	render:function(){
		return(
			<div>
				<ul id="leftTree" className="ztree"></ul>
				<div id="rMenu">
					<ul>
						<li><span onClick={this.onClickMenu}><span className="addNode">&nbsp;</span>增加节点</span></li>
						<li><span onClick={this.onClickMenu}><span className="deleteNode">&nbsp;</span>删除节点</span></li>
						<li><span onClick={this.onClickMenu}><span className="checkNode">&nbsp;</span>Check节点</span></li>
						<li><span onClick={this.onClickMenu}><span className="uncheckNode">&nbsp;</span>unCheck节点</span></li>
						<hr/>
						<li><span onClick={this.onClickMenu}><span className="reloadTree">&nbsp;</span>恢复zTree</span></li>
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = ztreeview2;
