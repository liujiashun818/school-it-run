/**
* Created by Yuchen  2016/01/21.
* 角色与权限管理
*/

'use strict';
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var Store = require('./../../../../../server/store.js');
var base64 = require('./../../../../../utils/base64.js');
var util = require('./../../../../../utils/util.js');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

import { connect } from 'react-redux'
import * as actions from '../../../../../actions/systemRole_actions'

var GroupForm = require('./roleManageFormView.js');

var RoleManageView = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return {
            showMainDiv: true
        }
    },
    componentDidMount: function() {
        const { dispatch } = this.props;
        dispatch(actions.getRoleManageData());
        //获取权限集合
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            dispatch(actions.setPermissions(temp));
            var valid = util.hasPermission(temp,"/systemmanage/rolemanage");
            if(valid==null){
                this.setState({
                    showMainDiv: false
                });
            }
        }
        var valid = util.hasPermission(temp,"/systemmanage/rolemanage/add");
        if(valid==null){
            $("#btn-addRole").attr("disabled","disabled");
            $("#btn-addRole").hide();
        }
    },
    render: function(){
        const { dispatch, permissions, groups, roles, users, editRoleName, editRoleDesc, notRoleUsers, } = this.props;
        var desView =
            <GroupForm
                Permissions={permissions}
                Groups={groups}
                Roles={roles}
                Users={users}
                EditRoleName={editRoleName}
                EditRoleDesc={editRoleDesc}
                NotRoleUsers={notRoleUsers}
                curRoleName={this.props.curRoleName}
                permissionTreeData={this.props.permissionTreeData}
                setPermissionTree={data => dispatch(actions.setPermissionTree(data))}
                setPermissionTreeData={data => dispatch(actions.set_PermissionTreeData(data))}
                set_permissions={this._set_permissions}
                add_role={this._add_role}
                edit_role={this._edit_role}
                delete_roles={this._delete_roles}
                set_edit_role_namedesc={this._set_edit_role_namedesc}
                get_roleManage_data={this._get_roleManage_data}
                remove_users_from_role={this._remove_users_from_role}
                create_userRoles={this._create_userRoles}
                set_permissionTreeData={data => dispatch(actions.setPermissionTreeData(data))}
                save_permissionTree={data => dispatch(actions.savePermissionTree(data))}
                get_not_role_users={this._get_not_role_users}
                initPermissionTree={data => dispatch(actions.initPermissionTree(data))}
                get_permissionTreeData={this._get_permissionTreeData} />;

        var mainDiv = this.state.showMainDiv?desView:"";
        // mainDiv = "角色&权限管理页";
        return (
            <div id='roleManageView' className='overviewDiv fullview'>
                {mainDiv}
            </div>
        );
    },
    _set_permissions: function(param){
        const { dispatch } = this.props;
        dispatch(actions.setPermissions(param));
    },
    _get_permissionTreeData: function(param){
        const { dispatch } = this.props;
        dispatch(actions.getPermissionTreeData(param));
    },
    _add_role: function(param){
        const { dispatch } = this.props;
        dispatch(actions.addRole(param));
    },
    _edit_role: function(param){
        const { dispatch } = this.props;
        dispatch(actions.editRole(param));
    },
    _delete_roles: function(param){
        const { dispatch } = this.props;
        dispatch(actions.deleteRoles(param));
    },
    _set_edit_role_namedesc: function(param){
        const { dispatch } = this.props;
        dispatch(actions.setEditRoleNameDesc(param));
    },
    _get_roleManage_data: function(param){
        const { dispatch } = this.props;
        dispatch(actions.getRoleManageData(param));
    },
    _remove_users_from_role: function(param){
        const { dispatch } = this.props;
        dispatch(actions.removeUsersFromRole(param));
    },
    _create_userRoles: function(param){
        const { dispatch } = this.props;
        dispatch(actions.createUserRoles(param));
    },
    _get_not_role_users: function(param){
        const { dispatch } = this.props;
        dispatch(actions.getNotRoleUsers(param));
    },
    _handleOnClick: function(e) {
        if(e.target.id == 'roleManage'){
            this.history.pushState(null,'systemManage/roleManagePage');
        }
    },
});

RoleManageView.propTypes = {
    // groups: PropTypes.array.isRequired,
    // roles: PropTypes.array.isRequired,
    // users: PropTypes.array.isRequired,
    // notRoleUsers: PropTypes.array.isRequired,
    // editRoleName: PropTypes.string.isRequired,
    // editRoleDesc: PropTypes.string.isRequired,
    // permissionTreeData: PropTypes.array.isRequired,
    // handlePermission: PropTypes.array.isRequired,
    // permissionTree: PropTypes.string.isRequired,
    // beforePermission: PropTypes.array.isRequired,
    // curRoleName: PropTypes.string.isRequired,
    // staticPermission: PropTypes.array.isRequired,
    // isClickTreeChange: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state) {
    const { permissions,
            groups,
            roles,
            users,
            notRoleUsers,
            editRoleName,
            editRoleDesc,
            permissionTreeData,
            handlePermission,
            permissionTree,
            beforePermission,
            curRoleName,
            staticPermission,
            isClickTreeChange, } = state.yftsystemRoleReducer;
    return {
        permissions,
        groups,
        roles,
        users,
        notRoleUsers,
        editRoleName,
        editRoleDesc,
        permissionTreeData,
        handlePermission,
        permissionTree,
        beforePermission,
        curRoleName,
        staticPermission,
        isClickTreeChange,
    }
}
export default connect(mapStateToProps)(RoleManageView)
