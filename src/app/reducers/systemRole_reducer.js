/**
 * 系统设置-角色和权限管理reducer
 */
import { combineReducers } from 'redux'
import * as ACTIONS from '../actions/systemRole_actions'

function permissions(state = {}, action) {
    switch (action.type) {
        case ACTIONS.SET_PERMISSIONS:
            return action.permissions
        default:
            return state
    }
}
function groups(state = [], action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_GROUPS:
            return action.groups
        default:
            return state
    }
}
function roles(state = [], action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_ROLES:
            return action.roles
        default:
            return state
    }
}
function users(state = [], action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_USERS:
            return action.users
        default:
            return state
    }
}
function notRoleUsers(state = [], action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_NOTROLEUSERS:
            return action.notRoleUsers
        default:
            return state
    }
}
function editRoleName(state = "", action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_EDITROLENAME:
            return action.editRoleName
        default:
            return state
    }
}
function editRoleDesc(state = "", action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_EDITROLEDESC:
            return action.editRoleDesc
        default:
            return state
    }
}
function permissionTreeData(state = [], action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_PERMISSIONTREEDATA:
            return action.permissionTreeData
        default:
            return state
    }
}
function handlePermission(state = [], action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_HANDLEPERMISSION:
            return action.handlePermission
        default:
            return state
    }
}
function permissionTree(state = "", action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_PERMISSIONTREE:
            return action.permissionTree
        default:
            return state
    }
}
function beforePermission(state = [], action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_BEFOREPERMISSION:
            return action.beforePermission
        default:
            return state
    }
}
function curRoleName(state = "", action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_CURROLENAME:
            return action.curRoleName
        default:
            return state
    }
}
function staticPermission(state = [], action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_STATICPERMISSION:
            return action.staticPermission
        default:
            return state
    }
}
function isClickTreeChange(state = false, action) {
    switch (action.type) {
        case ACTIONS.ROLE_SET_ISCLICKTREECHANGE:
            return action.isClickTreeChange
        default:
            return state
    }
}

const systemRoleReducer = combineReducers({
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
})

export default systemRoleReducer
