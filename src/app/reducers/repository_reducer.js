/**
  知识库相关的reducer 方法
*/

import { combineReducers } from 'redux'
import {
  SETREPOSITORYSTATE_REPOSITORY,
  SETREPOSITORYLIMIT_REPOSITORY,
  GET_CHECKPENDING_REPOSITORY,
  SETCHECKPENDINGOBJ_REPOSITORY,
  GETKNOWLEDGEBASELIST_REPOSITORY,
  SETKNOWLEDGELISTOBJ_REPOSITORY,
  GETCOMMONKNOWLEDGE_REPOSITORY,
  GETUPDATEKNOWLEDGE_REPOSITORY,
  GETREPOSITORYSTATISTICS_REPOSITORY,
  GETFAULTTYPE_REPOSITORY,
  GETFAULTSUBTYPE_REPOSITORY
} from '../actions/repository_action'

function isDisabled(state = false, action) {
    switch (action.type) {
        case SETREPOSITORYSTATE_REPOSITORY:
            return action.isDisabled
        default:
            return state
    }
}
//待审核
function checkPending(state = [], action) {
    switch (action.type) {
        case GET_CHECKPENDING_REPOSITORY:
            return action.checkPending
        default:
            return state
    }
}
//行选择设置obj
function checkPendingObj(state = {}, action) {
    switch (action.type) {
        case SETCHECKPENDINGOBJ_REPOSITORY:
            return action.checkPendingObj
        default:
            return state
    }
}
//清单
function knowledgeList(state = [], action) {
    switch (action.type) {
        case GETKNOWLEDGEBASELIST_REPOSITORY:
            return action.knowledgeList
        default:
            return state
    }
}

function knowledgeListObj(state = {}, action) {
    switch (action.type) {
        case SETKNOWLEDGELISTOBJ_REPOSITORY:
            return action.knowledgeListObj
        default:
            return state
    }
}
//常用知识
function CommonKnowledgeList(state = [], action) {
    switch (action.type) {
        case GETCOMMONKNOWLEDGE_REPOSITORY:
            return action.CommonKnowledgeList
        default:
            return state
    }
}
//更新知识
function updateKnowledgeList(state = [], action) {
    switch (action.type) {
        case GETUPDATEKNOWLEDGE_REPOSITORY:
            return action.updateKnowledgeList
        default:
            return state
    }
}
//知识库统计
function knowledgeStatisticsList(state = [], action) {
    switch (action.type) {
        case GETREPOSITORYSTATISTICS_REPOSITORY:
            return action.knowledgeStatisticsList
        default:
            return state
    }
}
//权限控制
function repositoryLimitObj(state = {}, action) {
    switch (action.type) {
        case SETREPOSITORYLIMIT_REPOSITORY:
            return action.repositoryLimitObj
        default:
            return state
    }
}
//故障类型
function faultTypes(state = [], action) {
    switch (action.type) {
        case GETFAULTTYPE_REPOSITORY:
            return action.faultTypes
        default:
            return state
    }
}
//故障子类型
function faultSubTypes(state = [], action) {
    switch (action.type) {
        case GETFAULTSUBTYPE_REPOSITORY:
            return action.faultSubTypes
        default:
            return state
    }
}

const repositoryReducer = combineReducers({
  isDisabled,
  checkPending,
  checkPendingObj,
  knowledgeList,
  knowledgeListObj,
  CommonKnowledgeList,
  updateKnowledgeList,
  knowledgeStatisticsList,
  repositoryLimitObj,
  faultTypes,
  faultSubTypes
})

export default repositoryReducer
