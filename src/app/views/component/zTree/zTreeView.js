var React = require('react');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ztreeview = React.createClass({
	initTree:function(){
//		//debugger;
		var zTree;
		var demoIframe;
		var that = this;
	
		var setting = {
			view: {
				dblClickExpand: false,
				showLine: true,
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
					var zTree = $.fn.zTree.getZTreeObj("tree");
					if (treeNode.isParent) {
						zTree.expandNode(treeNode);
						return false;
					} else {
						that.onClickChild(treeNode);
					}
				}
			}
		};
	
		var zNodes =[
			{id:1, pId:0, name:"[core] 基本功能 演示", open:true},
			{id:101, pId:1, name:"最简单的树 --  标准 JSON 数据", file:"js/zTree/demo/cn/core/standardData"},
			{id:102, pId:1, name:"最简单的树 --  简单 JSON 数据", file:"js/zTree/demo/cn/core/simpleData"},
			{id:103, pId:1, name:"不显示 连接线", file:"js/zTree/demo/cn/core/noline"},
			{id:104, pId:1, name:"不显示 节点 图标", file:"js/zTree/demo/cn/core/noicon"},
			{id:105, pId:1, name:"自定义图标 --  icon 属性", file:"js/zTree/demo/cn/core/custom_icon"},
			{id:106, pId:1, name:"自定义图标 --  iconSkin 属性", file:"js/zTree/demo/cn/core/custom_iconSkin"},
			{id:107, pId:1, name:"自定义字体", file:"js/zTree/demo/cn/core/custom_font"},
			{id:115, pId:1, name:"超链接演示", file:"js/zTree/demo/cn/core/url"},
			{id:108, pId:1, name:"异步加载 节点数据", file:"js/zTree/demo/cn/core/async"},
			{id:109, pId:1, name:"用 zTree 方法 异步加载 节点数据", file:"js/zTree/demo/cn/core/async_fun"},
			{id:110, pId:1, name:"用 zTree 方法 更新 节点数据", file:"js/zTree/demo/cn/core/update_fun"},
			{id:111, pId:1, name:"单击 节点 控制", file:"js/zTree/demo/cn/core/click"},
			{id:112, pId:1, name:"展开 / 折叠 父节点 控制", file:"js/zTree/demo/cn/core/expand"},
			{id:113, pId:1, name:"根据 参数 查找 节点", file:"js/zTree/demo/cn/core/searchNodes"},
			{id:114, pId:1, name:"其他 鼠标 事件监听", file:"js/zTree/demo/cn/core/otherMouse"},
	
			{id:2, pId:0, name:"[excheck] 复/单选框功能 演示", open:false},
			{id:201, pId:2, name:"Checkbox 勾选操作", file:"js/zTree/demo/cn/excheck/checkbox"},
			{id:206, pId:2, name:"Checkbox nocheck 演示", file:"js/zTree/demo/cn/excheck/checkbox_nocheck"},
			{id:207, pId:2, name:"Checkbox chkDisabled 演示", file:"js/zTree/demo/cn/excheck/checkbox_chkDisabled"},
			{id:208, pId:2, name:"Checkbox halfCheck 演示", file:"js/zTree/demo/cn/excheck/checkbox_halfCheck"},
			{id:202, pId:2, name:"Checkbox 勾选统计", file:"js/zTree/demo/cn/excheck/checkbox_count"},
			{id:203, pId:2, name:"用 zTree 方法 勾选 Checkbox", file:"js/zTree/demo/cn/excheck/checkbox_fun"},
			{id:204, pId:2, name:"Radio 勾选操作", file:"js/zTree/demo/cn/excheck/radio"},
			{id:209, pId:2, name:"Radio nocheck 演示", file:"js/zTree/demo/cn/excheck/radio_nocheck"},
			{id:210, pId:2, name:"Radio chkDisabled 演示", file:"js/zTree/demo/cn/excheck/radio_chkDisabled"},
			{id:211, pId:2, name:"Radio halfCheck 演示", file:"js/zTree/demo/cn/excheck/radio_halfCheck"},
			{id:205, pId:2, name:"用 zTree 方法 勾选 Radio", file:"js/zTree/demo/cn/excheck/radio_fun"},
	
			{id:3, pId:0, name:"[exedit] 编辑功能 演示", open:false},
			{id:301, pId:3, name:"拖拽 节点 基本控制", file:"js/zTree/demo/cn/exedit/drag"},
			{id:302, pId:3, name:"拖拽 节点 高级控制", file:"js/zTree/demo/cn/exedit/drag_super"},
			{id:303, pId:3, name:"用 zTree 方法 移动 / 复制 节点", file:"js/zTree/demo/cn/exedit/drag_fun"},
			{id:304, pId:3, name:"基本 增 / 删 / 改 节点", file:"js/zTree/demo/cn/exedit/edit"},
			{id:305, pId:3, name:"高级 增 / 删 / 改 节点", file:"js/zTree/demo/cn/exedit/edit_super"},
			{id:306, pId:3, name:"用 zTree 方法 增 / 删 / 改 节点", file:"js/zTree/demo/cn/exedit/edit_fun"},
			{id:307, pId:3, name:"异步加载 & 编辑功能 共存", file:"js/zTree/demo/cn/exedit/async_edit"},
			{id:308, pId:3, name:"多棵树之间 的 数据交互", file:"js/zTree/demo/cn/exedit/multiTree"},
	
			{id:4, pId:0, name:"大数据量 演示", open:false},
			{id:401, pId:4, name:"一次性加载大数据量", file:"js/zTree/demo/cn/bigdata/common"},
			{id:402, pId:4, name:"分批异步加载大数据量", file:"js/zTree/demo/cn/bigdata/diy_async"},
			{id:403, pId:4, name:"分批异步加载大数据量", file:"js/zTree/demo/cn/bigdata/page"},
	
			{id:5, pId:0, name:"组合功能 演示", open:false},
			{id:501, pId:5, name:"冻结根节点", file:"js/zTree/demo/cn/super/oneroot"},
			{id:502, pId:5, name:"单击展开/折叠节点", file:"js/zTree/demo/cn/super/oneclick"},
			{id:503, pId:5, name:"保持展开单一路径", file:"js/zTree/demo/cn/super/singlepath"},
			{id:504, pId:5, name:"添加 自定义控件", file:"js/zTree/demo/cn/super/diydom"},
			{id:505, pId:5, name:"checkbox / radio 共存", file:"js/zTree/demo/cn/super/checkbox_radio"},
			{id:506, pId:5, name:"左侧菜单", file:"js/zTree/demo/cn/super/left_menu"},
			{id:513, pId:5, name:"OutLook 风格", file:"js/zTree/demo/cn/super/left_menuForOutLook"},
			{id:515, pId:5, name:"Awesome 风格", file:"js/zTree/demo/cn/super/awesome"},
			{id:514, pId:5, name:"Metro 风格", file:"js/zTree/demo/cn/super/metro"},
			{id:507, pId:5, name:"下拉菜单", file:"js/zTree/demo/cn/super/select_menu"},
			{id:509, pId:5, name:"带 checkbox 的多选下拉菜单", file:"js/zTree/demo/cn/super/select_menu_checkbox"},
			{id:510, pId:5, name:"带 radio 的单选下拉菜单", file:"js/zTree/demo/cn/super/select_menu_radio"},
			{id:508, pId:5, name:"右键菜单 的 实现", file:"js/zTree/demo/cn/super/rightClickMenu"},
			{id:511, pId:5, name:"与其他 DOM 拖拽互动", file:"js/zTree/demo/cn/super/dragWithOther"},
			{id:512, pId:5, name:"异步加载模式下全部展开", file:"js/zTree/demo/cn/super/asyncForAll"},
	
			{id:6, pId:0, name:"其他扩展功能 演示", open:false},
			{id:601, pId:6, name:"隐藏普通节点", file:"js/zTree/demo/cn/exhide/common"},
			{id:602, pId:6, name:"配合 checkbox 的隐藏", file:"js/zTree/demo/cn/exhide/checkbox"},
			{id:603, pId:6, name:"配合 radio 的隐藏", file:"js/zTree/demo/cn/exhide/radio"}
		];
	
		$(document).ready(function(){
			var t = $("#tree");
			t = $.fn.zTree.init(t, setting, zNodes);
			demoIframe = $("#testIframe");
			demoIframe.bind("load", loadReady);
			var zTree = $.fn.zTree.getZTreeObj("tree");
			zTree.selectNode(zTree.getNodeByParam("id", 101));
	
		});
	
		function loadReady() {
			var bodyH = demoIframe.contents().find("body").get(0).scrollHeight,
			htmlH = demoIframe.contents().find("html").get(0).scrollHeight,
			maxH = Math.max(bodyH, htmlH), minH = Math.min(bodyH, htmlH),
			h = demoIframe.height() >= maxH ? minH:maxH ;
			if (h < 530) h = 530;
			demoIframe.height(h);
		}
	},
	onClickChild:function(treeNode){
		var demoIframe = $("#testIfram");
		demoIframe.attr("src",treeNode.file + ".html");
		this.setState({src:treeNode.file + ".html"})
	},
	getInitialState:function(){
		var src="js/zTree/demo/cn/core/standardData.html";
		return {'src':src};
	},
	componentDidMount:function(){
		this.initTree();
	},
	render:function(){
		return (
			<div>
				<table height='600px'>
					<tr>
						<td width='260px' style={{"BORDER-RIGHT":"#999999 1px dashed"}}>
							<ul id="tree" className="ztree" style={{'width':'260px','overflow':'auto'}}></ul>
						</td>
						<td width='770px'><iframe ID="testIframe" Name="testIframe" frameBorder='0' scrolling='AUTO' width='100%'  height='600px' src={this.state.src}></iframe></td>
					</tr>
				</table>
			</div>
		);
	}
});

module.exports = ztreeview;