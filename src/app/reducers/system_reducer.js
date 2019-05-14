/**
* 系统设置相关的redux方法
*/
import { combineReducers } from 'redux'
import {
  ISSHOWTREE, SET_MONITOR_TREE, SET_MONITOR_TREE_CHECKEDNODES, SET_TREE_CLEAR, SET_MONITOR_TYPE_ARRAY,
  SET_MONITOR_RETURNITEM, SET_MONITORRE_TURNITEMDEFAULT_VALUE, SET_MONITORRE_TREE_INIT, SET_MONITORRE_TREE_IDS,
  SET_GROUPS, SET_ALLGROUPDATA, SET_CREATEINFO, SET_PARENTCODE, SET_CURGROUPDATA,
  SET_CURGROUPDATA_PARENTORGANIZATIONNAME, SET_CURGROUPDATA_ORGANIZATIONPWD, SET_CURGROUPDATA_ROLE,
  SET_SAFEGROUPS, SET_USERORGANIZATION, SET_PUREORGANIZATION, SET_USERS, SET_SELECTEDUSER,
  SET_OPERATIONFLAG, SET_CHANGEPASSWORDFLAG, SET_ROLES, SET_CURTREE, SET_PCODEMARK,
  SET_PERMISSIONS, SET_ISUPDATE, SET_ROLETREE, SET_SESSIONUSERS, SET_USERINFOCHANGEFLAG, SET_SYSMAPDATA, SET_SYSMAPDATAVALUE
} from '../actions/system_action'

function isShowTree(state = true ,action){
  switch (action.type) {
      case ISSHOWTREE:
        return action.data;
      default:
        return state
  }
}

function monitorTree(state = [], action) {
    switch (action.type) {
        case SET_MONITOR_TREE:
          return action.monitorTreeData
        default:
          return state
    }
};

function oldTree(state = [], action) {
    switch (action.type) {
        case SET_MONITOR_TREE_CHECKEDNODES:
          return action.checkedNodes
        default:
          return state
    }
};

function isTreeClear(state = false, action) {
    switch (action.type) {
        case SET_TREE_CLEAR:
          return action.flag;
        default:
          return state
    }
};

function monitorTypeArray(state = [], action) {
    switch (action.type) {
        case SET_MONITOR_TYPE_ARRAY:
          return action.monitorTypeArray
        default:
          return state
    }
};

function monitorReturnItem(state = [], action) {
    switch (action.type) {
        case SET_MONITOR_RETURNITEM:
           return action.monitorReturnItem
        default:
          return state
    }
};

function monitorReturnItemDefaultValue(state = '', action) {
    switch (action.type) {
        case SET_MONITORRE_TURNITEMDEFAULT_VALUE:
          return action.monitorReturnItemDefaultValue;
        default:
          return state
    }
};

function monitorTreeInit(state = null, action) {
    switch (action.type) {
        case SET_MONITORRE_TREE_INIT:
          return action.value;
        default:
          return state
    }
};

function treeIds(state = '', action) {
    switch (action.type) {
        case SET_MONITORRE_TREE_IDS:
          return action.treeIds;
        default:
          return state
    }
};

function groups(state = [], action) {
    switch (action.type) {
        case SET_GROUPS:
          return action.groups
        default:
          return state
    }
}

function allGroupData(state = [], action) {
    switch (action.type) {
        case SET_ALLGROUPDATA:
          return action.allGroupData
        default:
          return state
    }
}

function createInfo(state = "", action) {
    switch (action.type) {
        case SET_CREATEINFO:
          return action.createInfo
        default:
          return state
    }
}

function parentCode(state = "", action) {
    switch (action.type) {
        case SET_PARENTCODE:
          return action.parentCode
        default:
          return state
    }
}

function curGroupData(state = null, action) {
    switch (action.type) {
        case SET_CURGROUPDATA:
          return action.curGroupData
        case SET_CURGROUPDATA_PARENTORGANIZATIONNAME:
          return Object.assign({}, state, {
              parentOrganizationName: action.parentOrganizationName
          })
        case SET_CURGROUPDATA_ORGANIZATIONPWD:
          return Object.assign({}, state, {
              organizationPwd: action.organizationPwd
          })
        case SET_CURGROUPDATA_ROLE:
          return Object.assign({}, state, {
              role: action.role
          })
        default:
          return state
    }
}

function safeGroups(state = [], action) {
    switch (action.type) {
        case SET_SAFEGROUPS:
          return action.safeGroups
        default:
          return state
    }
}

function userOrganization(state = [], action) {
    switch (action.type) {
        case SET_USERORGANIZATION:
          return action.userOrganization
        default:
          return state
    }
}

function pureOrganization(state = [], action) {
    switch (action.type) {
        case SET_PUREORGANIZATION:
          return action.pureOrganization
        default:
          return state
    }
}

function users(state = [], action) {
    switch (action.type) {
        case SET_USERS:
          return action.users
        default:
          return state
    }
}

function selectedUser(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDUSER:
          return action.selectedUser
        default:
          return state
    }
}

function operationFlag(state = "add", action) {
    switch (action.type) {
        case SET_OPERATIONFLAG:
          return action.operationFlag
        default:
          return state
    }
}

function changePasswordFlag(state = "change", action) {
    switch (action.type) {
        case SET_CHANGEPASSWORDFLAG:
          return action.changePasswordFlag
        default:
          return state
    }
}

function roles(state = [], action) {
    switch (action.type) {
        case SET_ROLES:
          return action.roles
        default:
          return state
    }
}

function curTree(state = "", action) {
    switch (action.type) {
        case SET_CURTREE:
          return action.curTree
        default:
          return state
    }
}

function pcodeMark(state = false, action) {
    switch (action.type) {
        case SET_PCODEMARK:
          return action.pcodeMark
        default:
          return state
    }
}

function permissions(state = "", action) {
    switch (action.type) {
        case SET_PERMISSIONS:
          return action.permissions
        default:
          return state
    }
}

function isUpdate(state = false, action) {
    switch (action.type) {
        case SET_ISUPDATE:
          return action.isUpdate
        default:
          return state
    }
}

function roleTree(state = "", action) {
    switch (action.type) {
        case SET_ROLETREE:
          return action.roleTree
        default:
          return state
    }
}

function sessionUsers(state = [], action) {
    switch (action.type) {
        case SET_SESSIONUSERS:
          return action.sessionUsers
        default:
          return state
    }
}

function userInfoChangeFlag(state = false, action) {
    switch (action.type) {
        case SET_USERINFOCHANGEFLAG:
          return action.userInfoChangeFlag
        default:
          return state
    }
}

function sysMapData(state = [], action) {
    switch (action.type) {
        case SET_SYSMAPDATA:
          return action.sysMapData
        default:
          return state
    }
}

function sysMapDataValue(state = "", action) {
    switch (action.type) {
        case SET_SYSMAPDATAVALUE:
          return action.sysMapDataValue
        default:
          return state
    }
}

const systemReducer = combineReducers({
  isShowTree,
  monitorTree,
  oldTree,
  isTreeClear,
  monitorTypeArray,
  monitorReturnItem,
  monitorReturnItemDefaultValue,
  monitorTreeInit,
  treeIds,
  groups,
  allGroupData,
  createInfo,
  parentCode,
  curGroupData,
  safeGroups,
  userOrganization,
  pureOrganization,
  users,
  selectedUser,
  operationFlag,
  changePasswordFlag,
  roles,
  curTree,
  pcodeMark,
  permissions,
  isUpdate,
  roleTree,
  sessionUsers,
  userInfoChangeFlag,
  sysMapData,
  sysMapDataValue
})

export default systemReducer
