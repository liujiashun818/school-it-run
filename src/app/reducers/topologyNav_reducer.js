/**
* 拓朴导航 相关的 reducer 方法
*/

import { combineReducers } from 'redux'
import {
  SET_ALLMAP_MARKERS_LIST,
  SET_ALLMAP_MARKERS_MYLIST,
  SET_ALLMAP_MARKERS_LIST_MAPLV,
  SET_NODEPOINT_TOPOLOGYNAV,
  SET_INITNODETOKEN_TOPOLOGYNAV,
  GET_TPJBDICTIONARYDATA
} from '../actions/topologyNav_action'

//
function deviceMaps(state = [], action) {
    switch (action.type) {
        case SET_ALLMAP_MARKERS_LIST:
            return action.deviceMaps
        default:
            return state
    }
};
//
function mydeviceMaps(state = [], action) {
    switch (action.type) {
        case SET_ALLMAP_MARKERS_MYLIST:
            return action.mydeviceMaps
        default:
            return state
    }
};
//
function nodeToken(state = '', action) {
    switch (action.type) {
        case SET_INITNODETOKEN_TOPOLOGYNAV:
            return action.nodeToken
        default:
            return state
    }
};
//
function nodePoint(state = {}, action) {
    switch (action.type) {
        case SET_NODEPOINT_TOPOLOGYNAV:
            return action.nodePoint
        default:
            return state
    }
};
//
function tpjbdictionaryData(state = [], action) {
    switch (action.type) {
        case GET_TPJBDICTIONARYDATA:
            return action.tpjbdictionaryData
        default:
            return state
    }
};
//
function initMAPLV(state = '', action) {
    switch (action.type) {
        case SET_ALLMAP_MARKERS_LIST_MAPLV:
            return action.initMAPLV
        default:
            return state
    }
};

const topologyNavReducer = combineReducers({
  deviceMaps,
  mydeviceMaps,
  nodeToken,
  nodePoint,
  tpjbdictionaryData,
  initMAPLV
})

export default topologyNavReducer
