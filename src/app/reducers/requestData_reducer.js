/**
* odata请求数据状态相关的reducer方法
*/

import { combineReducers } from 'redux'
import {
  SET_REQUEST, SET_REQUEST_SUCCESS, SET_REQUEST_FAIL
} from '../actions/requestData_action'

function requestStatus(state = {
  isRequesting: false,
  status: ""
}, action) {
    switch (action.type) {
        case SET_REQUEST:
            return Object.assign({}, state, {
                isRequesting: true,
                status: action.status
            })
        case SET_REQUEST_SUCCESS:
        case SET_REQUEST_FAIL:
            return Object.assign({}, state, {
                isRequesting: false,
                status: action.status
            })
        default:
            return state
    }
}

const requestDataReducer = combineReducers({
    requestStatus
})

export default requestDataReducer
