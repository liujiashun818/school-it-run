/**
 * 登录页相关的reducer
 */
import { combineReducers } from 'redux'
import {
  SET_ERROR_MSG,
  SET_LOGIN_TYPE
} from '../actions/login_action'

function errorMsg(state = '', action) {
    switch (action.type) {
        case SET_ERROR_MSG:
            return action.msg
        default:
            return state
    }
}
//登录类型：react 或 rap
function loginType(state = 'react', action) {
    switch (action.type) {
        case SET_LOGIN_TYPE:
            return action.loginType
        default:
            return state
    }
}

const loginReducer = combineReducers({
    errorMsg,
    loginType
})

export default loginReducer
