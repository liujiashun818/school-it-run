/**
* Created by Yuchen 2016/01/21
* 系统设置-角色和权限管理action
 */
var oData = require('../server/odataSystem');
var Store = require('../server/store');
var base64 = require('../utils/base64');
import * as requestDataActions from './requestData_action'

export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const ROLE_SET_GROUPS = 'ROLE_SET_GROUPS';
export const ROLE_SET_ROLES = 'ROLE_SET_ROLES';
export const ROLE_SET_USERS = 'ROLE_SET_USERS';
export const ROLE_SET_NOTROLEUSERS = 'ROLE_SET_NOTROLEUSERS';
export const ROLE_SET_EDITROLENAME = 'ROLE_SET_EDITROLENAME';
export const ROLE_SET_EDITROLEDESC = 'ROLE_SET_EDITROLEDESC';
export const ROLE_SET_PERMISSIONTREEDATA = 'ROLE_SET_PERMISSIONTREEDATA';
export const ROLE_SET_HANDLEPERMISSION = 'ROLE_SET_HANDLEPERMISSION';
export const ROLE_SET_PERMISSIONTREE = 'ROLE_SET_PERMISSIONTREE';
export const ROLE_SET_BEFOREPERMISSION = 'ROLE_SET_BEFOREPERMISSION';
export const ROLE_SET_CURROLENAME = 'ROLE_SET_CURROLENAME';
export const ROLE_SET_STATICPERMISSION = 'ROLE_SET_STATICPERMISSION';
export const ROLE_SET_ISCLICKTREECHANGE = 'ROLE_SET_ISCLICKTREECHANGE';

export function setPermissions(permissions) {
    return {
        type: SET_PERMISSIONS,
        permissions
    }
}
export function setGroups(groups){
    return {
        type: ROLE_SET_GROUPS,
        groups
    }
}
export function setRoles(roles){
    return {
        type: ROLE_SET_ROLES,
        roles
    }
}
export function setUsers(users){
    return {
        type: ROLE_SET_USERS,
        users
    }
}
export function setNotRoleUsers(notRoleUsers){
    return {
        type: ROLE_SET_NOTROLEUSERS,
        notRoleUsers
    }
}
export function setEditRoleName(editRoleName){
    return {
        type: ROLE_SET_EDITROLENAME,
        editRoleName
    }
}
export function setEditRoleDesc(editRoleDesc){
    return {
        type: ROLE_SET_EDITROLEDESC,
        editRoleDesc
    }
}
export function set_PermissionTreeData(permissionTreeData){
    return {
        type: ROLE_SET_PERMISSIONTREEDATA,
        permissionTreeData
    }
}
export function setHandlePermission(handlePermission){
    return {
        type: ROLE_SET_HANDLEPERMISSION,
        handlePermission
    }
}
export function setPermissionTree(permissionTree){
    return {
        type: ROLE_SET_PERMISSIONTREE,
        permissionTree
    }
}
export function setBeforePermission(beforePermission){
    return {
        type: ROLE_SET_BEFOREPERMISSION,
        beforePermission
    }
}
export function setCurRoleName(curRoleName){
    return {
        type: ROLE_SET_CURROLENAME,
        curRoleName
    }
}
export function setStaticPermission(staticPermission){
    return {
        type: ROLE_SET_STATICPERMISSION,
        staticPermission
    }
}
export function setIsClickTreeChange(isClickTreeChange){
    return {
        type: ROLE_SET_ISCLICKTREECHANGE,
        isClickTreeChange
    }
}

export function getRoleManageData(param){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.getRoleManageData(dispatch,function(response){
            var groups = eval(response.groups.d.results[0].ORGANIZATION);
            var newGroups = [];
            for(var i in groups){
                var recid = groups[i].organizationRecId;
                if(recid&&recid!="") newGroups.push(groups[i].organizationName);
            }
            dispatch(setGroups(newGroups));
            dispatch(setRoles(response.roles.d.results));
            dispatch(setUsers(response.users.d.results));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}
export function setStoreUsers(param){
    return dispatch => {
        if(param&&param!=null&&param.data&&param.data!=null){
            dispatch(setUsers(param.data));
        }
    }
}
export function getNotRoleUsers(param){
    return dispatch => {
        if(!param||!param.data) return;
        dispatch(requestDataActions.setRequest());
        oData.getNotRoleUsers(
            {ROLE_NAME:param.data},
            function(response){
                var notRoleUsers = eval(response.d.results[0].USERS);
                dispatch(setNotRoleUsers(notRoleUsers));
                var resp = {
                    notRoleUsers: notRoleUsers
                };
                if(param.callback) param.callback(resp);
                dispatch(requestDataActions.setRequestSuccess());
            },
            function(response){
                var resp = response.responseText;
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            }
        );
    }
}
export function addRole(param){
    return dispatch => {
        if(!param||!param.data) return;
        dispatch(requestDataActions.setRequest());
        oData.addRole(param.data, function(resp){
            if(param.callback) param.callback();
            dispatch(requestDataActions.setRequestSuccess());
            dispatch(getRoleManageData());
        }, function(resp){
            if(param.error) param.error();
            dispatch(requestDataActions.setRequestFail());
        });
    }
}
export function createUserRoles(param){
    return dispatch => {
        if(!param||!param.data) return;
        dispatch(requestDataActions.setRequest());
        oData.createUserRoles(
            {roleName:param.data.roleName, data:param.data.selections,},
            function(resp){
                if(param.callback) param.callback(resp);
                dispatch(requestDataActions.setRequestSuccess());
                dispatch(getRoleManageData());
            },
            function(response){
                resp = response.responseText;
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            }
        );
    }
}
export function editRole(param){
    return dispatch => {
        if(!param||!param.data) return;
        dispatch(requestDataActions.setRequest());
        oData.editRole(param.data,
            function(resp){
                if(param.callback) param.callback(resp);
                dispatch(requestDataActions.setRequestSuccess());
                dispatch(getRoleManageData());
            },
            function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
                dispatch(getRoleManageData());
            }
        );
    }
}
export function deleteRoles(param){
    return dispatch => {
        if(!param||!param.data) return;
        dispatch(requestDataActions.setRequest());
        oData.deleteRoles(param.data,
            function(resp){
                if(param.callback) param.callback(resp);
                dispatch(requestDataActions.setRequestSuccess());
                dispatch(getRoleManageData());
            },
            function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
                dispatch(getRoleManageData());
            }
        );
    }
}
export function setEditRoleNameDesc(param){
    return dispatch => {
        if(!param) return;
        dispatch(setEditRoleName(param.name));
        dispatch(setEditRoleDesc(param.desc));
    }
}
export function removeUsersFromRole(param){
    return dispatch => {
        if(!param||!param.data) return;
        dispatch(requestDataActions.setRequest());
        oData.removeUsersFromRole(param.data,
            function(resp){
                if(param.callback) param.callback(resp);
                dispatch(requestDataActions.setRequestSuccess());
                dispatch(getRoleManageData());
            },
            function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
                dispatch(getRoleManageData());
            }
        );
    }
}
//---
export function initPermissionTree(param){
    return (dispatch, getState) => {
        dispatch(setPermissionTree(param));
        var state = getState();
        var data = state.yftsystemRoleReducer.permissionTreeData;
        dispatch(refreshPermissionTree(data));
    }
}
export function refreshPermissionTree(data){
    return (dispatch, getState) => {
        var state = getState();
        var tree = state.yftsystemRoleReducer.permissionTree;
        if(tree!=null && tree!=""){
            tree.initTree(data);
        };
    }
}
export function checkPermissionTree(data){
    return (dispatch, getState) => {
        var state = getState();
        var tree = state.yftsystemRoleReducer.permissionTree;
        if(tree!=null && tree!=""){
            tree.checkTree(data);
        };
    }
}
export function getPermissionTreeData(data){
    return dispatch => {
        if(data!=null && data!=""){
            dispatch(requestDataActions.setRequest());
            oData.getOperationPermissions(data,dispatch,function(data2){
                var permis = data2;
                var ids = [];
                var idss = [];
                for(var i=0;i<permis.length;i++){
                    var mark = permis[i].checked;
                    var dismark = permis[i].chkDisabled;
                    if(mark=="true"){
                        ids.push(permis[i]);
                    };
                    if(dismark=="true"){
                        idss.push(permis[i]);
                    };
                };
                dispatch(setStaticPermission(idss));
                dispatch(setBeforePermission(ids));
                dispatch(setCurRoleName(data));
                dispatch(setIsClickTreeChange(false));
                dispatch(setHandlePermission(""));
                dispatch(refreshPermissionTree(permis));
                dispatch(requestDataActions.setRequestSuccess());
            });
        }
        else{
            var temp = Store.get("PERMISSIONS");
            if(temp!=null&&temp!=""){
                temp = base64.base64decode(temp);
                temp = decodeURI(temp);
                var ttemp = eval(temp);
                dispatch(set_PermissionTreeData(ttemp));
                dispatch(setIsClickTreeChange(false));
                dispatch(refreshPermissionTree(ttemp));
            }
        }
    }
}
export function setPermissionTreeData(data){
    return dispatch => {
        dispatch(setHandlePermission(data));
        dispatch(setIsClickTreeChange(true));
    }
}
export function savePermissionTree(data){
    return (dispatch, getState) => {
        var state = getState();
        var prep = state.yftsystemRoleReducer.beforePermission;
        var newp = state.yftsystemRoleReducer.handlePermission;
        var isClickTreeChange = state.yftsystemRoleReducer.isClickTreeChange;
        var roleName = state.yftsystemRoleReducer.curRoleName;
        if(prep.length == 0){
            var valList = "[";
            for(var i=0;i<newp.length;i++){
                var val = "{'resourceId':'"+newp[i].resourceId+"','resourceName':'"+newp[i].resourceName+"','parentId':'"+newp[i].parentId+"','action':'"+newp[i].action+"','resourceType':'"+newp[i].resourceType+"','instanceName':'"+newp[i].instanceName+"'},";
                if(i==newp.length-1){
                    val = "{'resourceId':'"+newp[i].resourceId+"','resourceName':'"+newp[i].resourceName+"','parentId':'"+newp[i].parentId+"','action':'"+newp[i].action+"','resourceType':'"+newp[i].resourceType+"','instanceName':'"+newp[i].instanceName+"'}]";
                };
                valList+=val;
            };
            if(newp.length == 0){
                valList += "]";
            };
            var filter = {name:roleName,group:valList};
            oData.addOperationPermissions(filter,function(data){
                var mark = data[0].OUT_FLAG;
                if(mark=="true"){
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                        document.getElementById('publicMessageModalcontent').innerHTML = "保存完成。"
                        $('#publicMessageModal').modal('show');
                    },100);
                    dispatch(setHandlePermission(""));
                    dispatch(setBeforePermission(newp));
                }
                else{
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                        document.getElementById('publicMessageModalcontent').innerHTML = "保存失败。"+data[0].ERROR_MSG;
                        $('#publicMessageModal').modal('show');
                    },100);
                };
            });
        }
        else{
            if(newp.length == 0 && isClickTreeChange){
                oData.deleteOperationPermissions(roleName,function(data){
                    var mark = data[0].OUT_FLAG;
                    if(mark=="true"){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                            document.getElementById('publicMessageModalcontent').innerHTML = "保存完成。"
                            $('#publicMessageModal').modal('show');
                        },100);
                        dispatch(setHandlePermission(""));
                        dispatch(setBeforePermission(""));
                    }
                    else{
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                            document.getElementById('publicMessageModalcontent').innerHTML = "保存失败。"+data[0].ERROR_MSG;
                            $('#publicMessageModal').modal('show');
                        },100);
                    };
                });
            }
            else{
                if(newp.length == 0){
                    newp = prep;
                };
                var valList = "[";
                for(var i=0;i<newp.length;i++){
                    var val = "{'resourceId':'"+newp[i].resourceId+"','resourceName':'"+newp[i].resourceName+"','parentId':'"+newp[i].parentId+"','action':'"+newp[i].action+"','resourceType':'"+newp[i].resourceType+"','instanceName':'"+newp[i].instanceName+"'},";
                    if(i==newp.length-1){
                        val = "{'resourceId':'"+newp[i].resourceId+"','resourceName':'"+newp[i].resourceName+"','parentId':'"+newp[i].parentId+"','action':'"+newp[i].action+"','resourceType':'"+newp[i].resourceType+"','instanceName':'"+newp[i].instanceName+"'}]";
                    };
                    valList+=val;
                };
                var valList2 = "[";
                for(var i=0;i<prep.length;i++){
                    var pid = prep[i].parentId;
                    if(pid == ""){
                        pid = null
                    };
                    var val = "{'resourceId':'"+prep[i].resourceId+"','resourceName':'"+prep[i].resourceName+"','parentId':'"+pid+"','action':'"+prep[i].action+"','resourceType':'"+prep[i].resourceType+"','instanceName':'"+prep[i].instanceName+"'},";
                    if(i==prep.length-1){
                        val = "{'resourceId':'"+prep[i].resourceId+"','resourceName':'"+prep[i].resourceName+"','parentId':'"+pid+"','action':'"+prep[i].action+"','resourceType':'"+prep[i].resourceType+"','instanceName':'"+prep[i].instanceName+"'}]";
                    };
                    valList2+=val;
                };
                var filter = {name:roleName,group:valList2,newgroup:valList};
                oData.editOperationPermissions(filter,function(data){
                    var mark = data[0].OUT_FLAG;
                    var message = data[0].ERROR_MSG;
                    if(mark=="true"){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                            document.getElementById('publicMessageModalcontent').innerHTML = "保存完成。"
                            $('#publicMessageModal').modal('show');
                        },100);
                        dispatch(setHandlePermission(""));
                        dispatch(setBeforePermission(newp));
                    }
                    else{
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                            document.getElementById('publicMessageModalcontent').innerHTML = "保存失败。"+message;
                            $('#publicMessageModal').modal('show');
                        },100);
                    };
                });
            };
        };
    }
}



//
