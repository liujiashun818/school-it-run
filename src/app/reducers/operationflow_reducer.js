/**
* 工单流转相关的reducer方法
*/

import { combineReducers } from 'redux'
import {
  SET_FLOWPERSONNELLISTDATA, SET_FLOWACTIONLISTDATA, SET_CURRENTNEXTPERSON, SET_WORKFLOWLOGDATA,
  SET_CURRENTWORKFLOWLOGDATA, SET_STEPS, SET_CURRENTWORKORDERPROCESSLOGDATA, SET_WORKORDERPROCESSLOGDATA,
  SET_WORKFLOWDETAILSDATA, SET_CURWORKFLOWID
} from '../actions/operationflow_action'

function flowPersonnelListData(state = [], action) {
    switch (action.type) {
        case SET_FLOWPERSONNELLISTDATA:
            return action.flowPersonnelListData
        default:
            return state
    }
}

function flowActionListData(state = [], action) {
    switch (action.type) {
        case SET_FLOWACTIONLISTDATA:
            return action.flowActionListData
        default:
            return state
    }
}

function currentNextPerson(state = "", action) {
    switch (action.type) {
        case SET_CURRENTNEXTPERSON:
            return action.currentNextPerson
        default:
            return state
    }
}

function workFlowLogData(state = [], action) {
    switch (action.type) {
        case SET_WORKFLOWLOGDATA:
            return action.workFlowLogData
        default:
            return state
    }
}

function currentWorkFlowLogData(state = null, action) {
    switch (action.type) {
        case SET_CURRENTWORKFLOWLOGDATA:
            return action.currentWorkFlowLogData
        default:
            return state
    }
}

function steps(state = 1, action) {
    switch (action.type) {
        case SET_STEPS:
            return action.steps
        default:
            return state
    }
}

function currentWorkOrderProcessLogData(state = null, action) {
    switch (action.type) {
        case SET_CURRENTWORKORDERPROCESSLOGDATA:
            return action.currentWorkOrderProcessLogData
        default:
            return state
    }
}

function workOrderProcessLogData(state = [], action) {
    switch (action.type) {
        case SET_WORKORDERPROCESSLOGDATA:
            return action.workOrderProcessLogData
        default:
            return state
    }
}

function workFlowDetailsData(state = "", action) {
    switch (action.type) {
        case SET_WORKFLOWDETAILSDATA:
            return action.workFlowDetailsData
        default:
            return state
    }
}

function curWorkFlowId(state = "", action) {
    switch (action.type) {
        case SET_CURWORKFLOWID:
            return action.curWorkFlowId
        default:
            return state
    }
}

const operationFlowReducer = combineReducers({
    flowPersonnelListData,//流程下一步接收人列表数据
    flowActionListData,//流程流转中每一个步骤状态列表数据
    currentNextPerson,//当前工单下一个人员流传信息
    workFlowLogData,//工单流程数据
    currentWorkFlowLogData,//当前工单流程数据
    steps,//工单当前步骤数
    currentWorkOrderProcessLogData,//当前工单处理信息数据
    workOrderProcessLogData,//工单处理信息数据
    workFlowDetailsData,//当前需要修改工单状态或响应时间判断条件数据
    curWorkFlowId  //流程图主键ID
})

export default operationFlowReducer
