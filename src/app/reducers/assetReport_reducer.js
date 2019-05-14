/**
 * 报表-资产报表reducer
 */
import { combineReducers } from 'redux'
import * as ACTIONS from '../actions/assetReport_actions'

function permissions(state = {}, action) {
    switch (action.type) {
        case ACTIONS.SET_PERMISSIONS:
            return action.permissions
        default:
            return state
    }
}
function defaultDeviceStateValue(state = -1, action) {
    switch (action.type) {
        case ACTIONS.SET_DEFAULTDEVICESTATEVALUE:
            return action.defaultDeviceStateValue
        default:
            return state
    }
}
function maintainReportMonthlyData(state = [], action) {
    switch (action.type) {
        case ACTIONS.SET_MAINTAINREPORTMONTHLYDATA:
            return action.maintainReportMonthlyData
        default:
            return state
    }
}
function maintainReportYearlyData(state = [], action) {
    switch (action.type) {
        case ACTIONS.SET_MAINTAINREPORTYEARLYDATA:
            return action.maintainReportYearlyData
        default:
            return state
    }
}
function assetReportMonthlyData(state = [], action) {
    switch (action.type) {
        case ACTIONS.SET_ASSETREPORTMONTHLYDATA:
            return action.assetReportMonthlyData
        default:
            return state
    }
}
function assetReportYearlyData(state = [], action) {
    switch (action.type) {
        case ACTIONS.SET_ASSETREPORTYEARLYDATA:
            return action.assetReportYearlyData
        default:
            return state
    }
}
const assetReportReducer = combineReducers({
    permissions,
    defaultDeviceStateValue,
    maintainReportMonthlyData,
    maintainReportYearlyData,
    assetReportMonthlyData,
    assetReportYearlyData,
})

export default assetReportReducer
