/**
 * 告警规则、告警日志和模板配置reducer
 */
import { combineReducers } from 'redux'
import * as ACTIONS from '../actions/alarm_action'

function permissions(state = {}, action) {
    switch (action.type) {
        case ACTIONS.SET_PERMISSIONS:
            return action.permissions
        default:
            return state
    }
}
function alarmLogList(state = [], action) {//告警日志列表
    switch (action.type) {
        case ACTIONS.SET_ALARMLOGLIST:
            return action.alarmLogList
        default:
            return state
    }
}
function alarmLogCount(state = 0, action) {//告警日志总数
    switch (action.type) {
        case ACTIONS.SET_ALARMLOGCOUNT:
            return action.alarmLogCount
        default:
            return state
    }
}
function alarmNameList(state = [], action) {//告警名称列表
    switch (action.type) {
        case ACTIONS.SET_ALARMNAMELIST:
            return action.alarmNameList
        default:
            return state
    }
}
function alarmRuleID(state = "", action) {//默认告警规则ID
    switch (action.type) {
        case ACTIONS.SET_ALARMRULEID:
            return action.alarmRuleID
        default:
            return state
    }
}
function alarmRuleList(state = [], action) {//告警规则列表
    switch (action.type) {
        case ACTIONS.SET_ALARMRULELIST:
            return action.alarmRuleList
        default:
            return state
    }
}
function user_addAlarmRule(state = [], action) {
    switch (action.type) {
        case ACTIONS.SET_USER_ADDALARMRULE:
            return action.user_addAlarmRule
        default:
            return state
    }
}
function user_addAlarmRule2(state = [], action) {
    switch (action.type) {
        case ACTIONS.SET_USER_ADDALARMRULE2:
            return action.user_addAlarmRule2
        default:
            return state
    }
}
function userIdList(state = [], action) {//默认单个告警规则数据相关的用户
    switch (action.type) {
        case ACTIONS.SET_USERIDLIST:
            return action.userIdList
        default:
            return state
    }
}
function receiverIdList(state = [], action) {//默认单个告警规则数据相关的接收人
    switch (action.type) {
        case ACTIONS.SET_RECEIVERIDLIST:
            return action.receiverIdList
        default:
            return state
    }
}
function smsTemplete(state = [], action) {
    switch (action.type) {
        case ACTIONS.SET_SMSTEMPLETE:
            return action.smsTemplete
        default:
            return state
    }
}
function mailTemplete(state = [], action) {
    switch (action.type) {
        case ACTIONS.SET_MAILTEMPLETE:
            return action.mailTemplete
        default:
            return state
    }
}
function staff(state = [], action) {//默认单个告警规则数据相关的用户和接收人合集
    switch (action.type) {
        case ACTIONS.SET_STAFF:
            return action.staff
        default:
            return state
    }
}
function alarmRule(state = [], action) {//默认单个告警规则数据
    switch (action.type) {
        case ACTIONS.SET_ALARMRULE:
            return action.alarmRule
        default:
            return state
    }
}
function templeteList(state = [], action) {//模板列表
    switch (action.type) {
        case ACTIONS.SET_TEMPLATELIST:
            return action.templeteList
        default:
            return state
    }
}
function smsServerStatus(state = false, action) {//短息服务开启状态
    switch (action.type) {
        case ACTIONS.SET_SMSSERVERSTATUS:
            return action.smsServerStatus
        default:
            return state
    }
}
const alarmReducer = combineReducers({
    permissions,
    alarmLogList,
    alarmLogCount,
    alarmNameList,
    alarmRuleID,
    alarmRuleList,
    user_addAlarmRule,
    user_addAlarmRule2,
    userIdList,
    receiverIdList,
    smsTemplete,
    mailTemplete,
    staff,
    alarmRule,
    templeteList,
    smsServerStatus,
})

export default alarmReducer
