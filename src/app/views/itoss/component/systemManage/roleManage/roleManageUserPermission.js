/*
* 角色与权限管理-权限设置
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var util = require('./../../../../../utils/util.js');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var PermissionTree = require('../../monitorTree/permissionTree.js');

var UserPermissionTable = React.createClass({
    mixins: [History],
    componentWillMount:function(){
        this.props.get_permissionTreeData();
    },
    componentDidMount:function(){
      // console.log("1111111")
    },
    handelExpand:function(){
        var treeObj = $.fn.zTree.getZTreeObj("leftTree");
        var _this = this;
        this.props.setState({
            expand:!this.props.expand
        },function(){
            treeObj.expandAll(_this.props.expand);
        });
    },
    handelSavePermission:function(){
        this.props.save_permissionTree();
    },
    handelCancelAll:function(){
        var treeObj = $.fn.zTree.getZTreeObj("leftTree");
        treeObj.checkAllNodes(false);
        var zTree = $.fn.zTree.getZTreeObj("leftTree");
        var checkedList = zTree.getCheckedNodes(true);
        this.props.set_permissionTreeData(checkedList);
    },
    handelCheckAll:function(){
        var treeObj = $.fn.zTree.getZTreeObj("leftTree");
        treeObj.checkAllNodes(true);
        var zTree = $.fn.zTree.getZTreeObj("leftTree");
        var checkedList = zTree.getCheckedNodes(true);
        this.props.set_permissionTreeData(checkedList);
    },
    render:function(){
        var valid = util.hasPermission(this.props.Permissions,"/systemmanage/rolemanage/update");
        var curName = localStorage.getItem("CURRENT_ROLENAME");
        var clickRoleValid = true;
        if(this.props.clickRole=="管理员"||this.props.clickRole==curName||this.props.clickRole==null) clickRoleValid = false;
        var data = this.props.permissionTreeData;
        console.log("this is the data:-------",data.length);
        var curRoleName = this.props.curRoleName;
        if(data != null && data != ""){
            if(curRoleName != null && curRoleName != "" && valid!=null && clickRoleValid){
                return(
                    <div className="col-md-12">
                        <div className="col-md-4" style={{"marginTop":"10px"}}>
                          <PermissionTree
                            data={data}
                            Permissions={this.props.Permissions}
                            setPermissionTree={this.props.setPermissionTree}
                            setPermissionTreeData={this.props.setPermissionTreeData}
                            initPermissionTree={this.props.initPermissionTree}
                          />
                        </div>
                        <div className="col-md-8" style={{"marginTop":"10px"}}>
                            <div className="btn-group" role="group">
                                <button type="button" style={{"fontSize":"13px"}} className="btn btn-default btn-xs" onClick={this.handelExpand}>{this.props.expand?"全部收合":"全部展开"}</button>
                                <button type="button" className="btn btn-success btn-xs" onClick={this.handelSavePermission} style={{"marginLeft":"10px"}}>保存权限</button>
                                <br/><br/>
                                <button type="button" className="btn btn-danger btn-xs" onClick={this.handelCancelAll} style={{"fontSize":"13px"}}>取消所有勾选</button>
                                <button type="button" className="btn btn-success btn-xs" onClick={this.handelCheckAll} style={{"marginLeft":"10px"}}>勾选所有节点</button>
                            </div>
                        </div>
                    </div>
                );
            }else{
                return(
                    <div className="col-md-12">
                        <div className="col-md-4" style={{"marginTop":"10px"}}>
                          <PermissionTree
                            data={this.props.permissionTreeData}
                            Permissions={this.props.Permissions}
                            setPermissionTree={this.props.setPermissionTree}
                            setPermissionTreeData={this.props.setPermissionTreeData}
                            initPermissionTree={this.props.initPermissionTree}
                          />
                        </div>
                        <div className="col-md-8" style={{"marginTop":"10px"}}>
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-default btn-xs" onClick={this.handelExpand}>{this.props.expand?"全部收合":"全部展开"}</button>
                            </div>
                        </div>
                    </div>
                );
            };
        }else{
            return (<label>暂无数据</label>);
        };
    }
  });

  module.exports = UserPermissionTable;
