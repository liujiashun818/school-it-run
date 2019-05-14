/**
* Created by Yuchen  2016/01/21.
* 角色与权限管理主窗口
*/

require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var CreateModal = require('./roleManageCreateModal.js');
var EditModal = require('./roleManageEditModal.js');
var GroupButtons = require('./roleManageButtons.js');
var RoleListTable = require('./roleManageRoleListTable.js');
var UserListTable = require('./roleManageUserListTable.js');

var CreateFormView = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            clickRole : null,
            expand: false,
        }
    },
    componentDidMount: function() {
        if($('#createForm') != null) {
            var height = $(window).height() - 110 - 30 + 'px';
            $('#createForm').css("height",height);
        }
    },
    componentDidUpdate: function() {
        //role list 样式：拉伸
        var view = $("#roleListView");
        var fieldset = $("#roleListField");
        var p = view.parent();
        view.find(".bootstrap-table").height(p.height()-282+"px");
        fieldset.find(".fixed-table-container").height("100%");
        //user list 样式：拉伸
        view = $("#userListView");
        fieldset = $("#userListField");
        p = view.parent();
        view.find(".bootstrap-table").height(p.height()-282+"px");
        fieldset.find(".fixed-table-container").height("100%");
    },
    render: function() {
        return (
            <div>
                <CreateModal
                    Groups={this.props.Groups}
                    Roles={this.props.Roles}
                    add_role={this.props.add_role} />
                <EditModal
                    EditRoleName={this.props.EditRoleName}
                    EditRoleDesc={this.props.EditRoleDesc}
                    Roles={this.props.Roles}
                    edit_role={this.props.edit_role} />
                <div id='createForm' className='overviewDesViewDiv' style={{position:"relative"}}>
                    <GroupButtons />
                    <RoleListTable
                        onClickRow={this._onClickRow}
                        clickRole={this.state.clickRole}
                        Permissions={this.props.Permissions}
                        Roles={this.props.Roles}
                        set_permissions={this.props.set_permissions}
                        get_roleManage_data={this.props.get_roleManage_data}
                        delete_roles={this.props.delete_roles}
                        set_edit_role_namedesc={this.props.set_edit_role_namedesc} />
                    <UserListTable
                        clickRole={this.state.clickRole}
                        permissionTreeData={this.props.permissionTreeData}
                        setPermissionTree={this.props.setPermissionTree}
                        setPermissionTreeData={this.props.set_permissionTreeData}
                        get_permissionTreeData={this.props.get_permissionTreeData}
                        setState={this._setState}
                        expand={this.state.expand}
                        Permissions={this.props.Permissions}
                        Users={this.props.Users}
                        NotRoleUsers={this.props.NotRoleUsers}
                        curRoleName={this.props.curRoleName}
                        get_roleManage_data={this.props.get_roleManage_data}
                        remove_users_from_role={this.props.remove_users_from_role}
                        create_userRoles={this.props.create_userRoles}
                        save_permissionTree={this.props.save_permissionTree}
                        set_permissionTreeData={this.props.set_permissionTreeData}
                        initPermissionTree={this.props.initPermissionTree}
                        get_not_role_users={this.props.get_not_role_users} />
                </div>
            </div>
        );
    },
    _setState: function(state,callback){
        if(!state) return;
        this.setState(state,callback);
    },
    _onClickRow: function(r) {
        this.props.get_permissionTreeData(r.ROLE_NAME);
        this.setState({
            clickRole : r.ROLE_NAME,
            expand: false,
        });
    },
});

$(window).resize(function () {
    if($('#createForm') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
        $('#createForm').css("height",height);
        //role list 样式：拉伸
        var view = $("#roleListView");
        var fieldset = $("#roleListField");
        var p = view.parent();
        view.find(".bootstrap-table").height(p.height()-282+"px");
        //user list 样式：拉伸
        view = $("#userListView");
        fieldset = $("#userListField");
        p = view.parent();
        view.find(".bootstrap-table").height(p.height()-282+"px");
        fieldset.find(".fixed-table-container").height("100%");
    }
});

module.exports = CreateFormView;
