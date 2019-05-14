/**
* 流程设计相关的reducer方法
*/

import { combineReducers } from 'redux'
import {
  SET_FLOWDESIGNRESULTDATA_FLOW,
  GET_WORKFLOWNAME_FLOWNAME,
  GET_WORKFLOWNAME_FLOWOBJECT,
  GET_FLOWDESIGNPICDATA_FLOW,
  GET_WORKFLOWTABLE_FLOW,
  GET_WORKFLOWDETAILSTABLE_FLOW,
  SET_CURRFLOW,
  SET_FLOWPANEL,
  SET_FLOWONLYSHOW,
  SET_WORKORDERTEMPLATES,
  SET_WORKORDERTEMPLATESID,
  SET_FLOWDESIGNTEMPLATESID
} from '../actions/flowdesign_action'


function workOrderTemplatesId(state = {},action) {
  switch (action.type) {
      case SET_WORKORDERTEMPLATESID:
          return action.data
      default:
          return state
  }
}
function flowDesignTemplatesId(state = {},action) {
  switch (action.type) {
      case SET_FLOWDESIGNTEMPLATESID:
          return action.data
      default:
          return state
  }
}


function workOrderTemplatesData(state = [],action) {
  switch (action.type) {
      case SET_WORKORDERTEMPLATES:
          return action.data
      default:
          return state
  }
}

function flowDeignResultData(state = [], action) {
    switch (action.type) {
        case SET_FLOWDESIGNRESULTDATA_FLOW:
            return action.flowDeignResultData
        default:
            return state
    }
}

function flowName(state = [], action) {
    switch (action.type) {
        case GET_WORKFLOWNAME_FLOWNAME:
            return action.flowName
        default:
            return state
    }
}

function flowObjects(state = [], action) {
    switch (action.type) {
        case GET_WORKFLOWNAME_FLOWOBJECT:
            return action.flowObjects
        default:
            return state
    }
}

function flowDesignPicData(state = null, action) {
    switch (action.type) {
        case GET_FLOWDESIGNPICDATA_FLOW:
            return action.flowDesignPicData
        default:
            return state
    }
}

function workFlowTable(state = '', action) {
    switch (action.type) {
        case GET_WORKFLOWTABLE_FLOW:
            return action.workFlowTable
        default:
            return state
    }
}

function workFlowDetailTable(state = '', action) {
    switch (action.type) {
        case GET_WORKFLOWDETAILSTABLE_FLOW:
            return action.workFlowDetailTable
        default:
            return state
    }
}

function currFlowData(state = '', action) {
    switch (action.type) {
        case SET_CURRFLOW:
            return action.currFlowData
        default:
            return state
    }
}

function flowPanelState(state = 0, action) {
    switch (action.type) {
        case SET_FLOWPANEL:
            return action.flowPanelState
        default:
            return state
    }
}

function flowOnlyShow(state = 0, action) {
    switch (action.type) {
        case SET_FLOWONLYSHOW:
            return action.flowOnlyShow
        default:
            return state
    }
}

const flowDesignReducer = combineReducers({
  flowDesignPicData,
  workFlowTable,
  flowName,
  flowObjects,
  flowDeignResultData,
  workFlowDetailTable,
  currFlowData,
  flowPanelState,
  flowOnlyShow,
  workOrderTemplatesData,
  workOrderTemplatesId,
  flowDesignTemplatesId
})

export default flowDesignReducer
