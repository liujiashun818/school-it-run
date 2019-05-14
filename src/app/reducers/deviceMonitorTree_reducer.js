/**
 * 统一监控平台左侧树相关的reducer
 */
import { combineReducers } from 'redux'
import {
  SET_DEVICEMONITORTREEDATA, SET_AREADATA
} from '../actions/deviceMonitorTree_action'

function deviceMonitorTreeData(state = [], action) {
    switch (action.type) {
        case SET_DEVICEMONITORTREEDATA:
            return action.deviceMonitorTreeData
        default:
            return state
    }
}

function areaData(state = [], action) {
    switch (action.type) {
        case SET_AREADATA:
            return action.areaData
        default:
            return state
    }
}

const deviceMonitorTreeReducer = combineReducers({
  deviceMonitorTreeData,
  areaData
})

export default deviceMonitorTreeReducer
