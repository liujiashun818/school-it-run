/**
 * 报表相关的reducer
 */
import { combineReducers } from 'redux'
import {
  SET_VIDEOCHECKDAILYDATA, SET_VIDEOCHECKWEEKLYDATA, SET_VIDEOCHECKMONTHLYDATA, SET_VIDEOCHECKQUARTERLYDATA, SET_VIDEOCHECKYEARLYDATA,
  SET_VIDEOCHECKCUSTOMDATA, SET_VIDEOCHECKCUSTOMLINEDATA, SET_VIDEOCHECKCUSTOMPARAM, SET_VIDEOREALTIMEDATA, SET_VIDEOONLINETRENDSDATA,
  SET_VIDEOONLINETRENDSAXIS, SET_VIDEOOFFLINEDATA, SET_VIDEOOFFLINEDAILYDATA, SET_VIDEOOFFLINEWEEKLYDATA, SET_VIDEOOFFLINEMONTHLYDATA, SET_VIDEOOFFLINEQUARTERLYDATA,
  SET_VIDEOOFFLINEYEARLYDATA, SET_VIDEOOFFLINECUSTOMDATA, SET_VIDEOMEDIALOSSDATA, SET_VIDEOMEDIALOSSDAILYDATA, SET_VIDEOMEDIALOSSWEEKLYDATA, SET_VIDEOMEDIALOSSMONTHLYDATA,
  SET_VIDEOMEDIALOSSQUARTERLYDATA, SET_VIDEOMEDIALOSSYEARLYDATA, SET_VIDEOMEDIALOSSCUSTOMDATA, SET_VIDEOLOSSDATA, SET_VIDEOLOSSDAILYDATA,
  SET_VIDEOLOSSWEEKLYDATA, SET_VIDEOLOSSMONTHLYDATA, SET_VIDEOLOSSQUARTERLYDATA, SET_VIDEOLOSSYEARLYDATA, SET_VIDEOLOSSCUSTOMDATA,
  SET_DVRSTORAGEDAILYDATA, SET_DVRSTORAGEWEEKLYDATA, SET_DVRSTORAGEMONTHLYDATA, SET_DVRSTORAGEQUARTERLYDATA, SET_DVRSTORAGEYEARLYDATA,
  SET_DVRSTORAGECUSTOMDATA, SET_DVRSTORAGECUSTOMLINEDATA, SET_NVRSTORAGEDAILYDATA, SET_NVRSTORAGEWEEKLYDATA, SET_NVRSTORAGEMONTHLYDATA,
  SET_NVRSTORAGEQUARTERLYDATA, SET_NVRSTORAGEYEARLYDATA, SET_NVRSTORAGECUSTOMDATA, SET_NVRSTORAGECUSTOMLINEDATA, SET_ENCODERSTORAGEDAILYDATA,
  SET_ENCODERSTORAGEWEEKLYDATA, SET_ENCODERSTORAGEMONTHLYDATA, SET_ENCODERSTORAGEQUARTERLYDATA, SET_ENCODERSTORAGEYEARLYDATA, SET_ENCODERSTORAGECUSTOMDATA,
  SET_ENCODERSTORAGECUSTOMLINEDATA, SET_SERVERDAILYDATA, SET_SERVERWEEKLYDATA, SET_SERVERMONTHLYDATA, SET_SERVERQUARTERLYDATA,
  SET_SERVERYEARLYDATA, SET_SERVERCUSTOMDATA, SET_SERVERCUSTOMLINEDATA, SET_NETWORKDAILYDATA, SET_NETWORKWEEKLYDATA,
  SET_NETWORKMONTHLYDATA, SET_NETWORKQUARTERLYDATA, SET_NETWORKYEARLYDATA, SET_NETWORKCUSTOMDATA, SET_NETWORKCUSTOMLINEDATA,
  SET_FIREWALLDAILYDATA, SET_FIREWALLWEEKLYDATA, SET_FIREWALLMONTHLYDATA, SET_FIREWALLQUARTERLYDATA, SET_FIREWALLYEARLYDATA,
  SET_FIREWALLCUSTOMDATA, SET_FIREWALLCUSTOMLINEDATA, SET_DATABASEDAILYDATA, SET_DATABASEWEEKLYDATA, SET_DATABASEMONTHLYDATA,
  SET_DATABASEQUARTERLYDATA, SET_DATABASEYEARLYDATA, SET_DATABASECUSTOMDATA, SET_DATABASECUSTOMLINEDATA, SET_REPORTDAILYDATA,
  SET_REPORTWEEKLYDATA, SET_REPORTMONTHLYDATA, SET_REPORTQUARTERLYDATA, SET_REPORTYEARLYDATA, SET_REPORTCUSTOMDATA,
  SET_ORDERDAILYDATA, SET_ORDERWEEKLYDATA, SET_ORDERMONTHLYDATA, SET_ORDERQUARTERLYDATA, SET_ORDERYEARLYDATA, SET_ORDERCUSTOMDATA,
  SET_ORDERCUSTOMLINEDATA, SET_ORDERONCEDATA, SET_ORDERTWICEDATA, SET_ORDERTREEDATA, SET_ORDERCURTYPE,
  SET_CHARGEMONTHLYDATA, SET_CHARGEQUARTERLYDATA, SET_CHARGEYEARLYDATA, SET_CHARGEPICDATA
} from '../actions/reportManage_action'

function videoCheckDailyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOCHECKDAILYDATA:
            return action.videoCheckDailyData
        default:
            return state
    }
}
function videoCheckWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOCHECKWEEKLYDATA:
            return action.videoCheckWeeklyData
        default:
            return state
    }
}
function videoCheckMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOCHECKMONTHLYDATA:
            return action.videoCheckMonthlyData
        default:
            return state
    }
}
function videoCheckQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOCHECKQUARTERLYDATA:
            return action.videoCheckQuarterlyData
        default:
            return state
    }
}
function videoCheckYearlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOCHECKYEARLYDATA:
            return action.videoCheckYearlyData
        default:
            return state
    }
}
function videoCheckCustomData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOCHECKCUSTOMDATA:
            return action.videoCheckCustomData
        default:
            return state
    }
}
function videoCheckCustomLineData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOCHECKCUSTOMLINEDATA:
            return action.videoCheckCustomLineData
        default:
            return state
    }
}
function videoCheckCustomParam(state = "", action) {
    switch (action.type) {
        case SET_VIDEOCHECKCUSTOMPARAM:
            return action.videoCheckCustomParam
        default:
            return state
    }
}
function videoRealTimeData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOREALTIMEDATA:
            return action.videoRealTimeData
        default:
            return state
    }
}
function videoOnlineTrendsData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOONLINETRENDSDATA:
            return action.videoOnlineTrendsData
        default:
            return state
    }
}
function videoOnlineTrendsAxis(state = [], action) {
    switch (action.type) {
        case SET_VIDEOONLINETRENDSAXIS:
            return action.videoOnlineTrendsAxis
        default:
            return state
    }
}
function videoOfflineData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOOFFLINEDATA:
            return action.videoOfflineData
        default:
            return state
    }
}
function videoOfflineDailyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOOFFLINEDAILYDATA:
            return action.videoOfflineDailyData
        default:
            return state
    }
}
function videoOfflineWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOOFFLINEWEEKLYDATA:
            return action.videoOfflineWeeklyData
        default:
            return state
    }
}
function videoOfflineMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOOFFLINEMONTHLYDATA:
            return action.videoOfflineMonthlyData
        default:
            return state
    }
}
function videoOfflineQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOOFFLINEQUARTERLYDATA:
            return action.videoOfflineQuarterlyData
        default:
            return state
    }
}
function videoOfflineYearlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOOFFLINEYEARLYDATA:
            return action.videoOfflineYearlyData
        default:
            return state
    }
}
function videoOfflineCustomData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOOFFLINECUSTOMDATA:
            return action.videoOfflineCustomData
        default:
            return state
    }
}
function videoMediaLossData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOMEDIALOSSDATA:
            return action.videoMediaLossData
        default:
            return state
    }
}
function videoMediaLossDailyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOMEDIALOSSDAILYDATA:
            return action.videoMediaLossDailyData
        default:
            return state
    }
}
function videoMediaLossWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOMEDIALOSSWEEKLYDATA:
            return action.videoMediaLossWeeklyData
        default:
            return state
    }
}
function videoMediaLossMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOMEDIALOSSMONTHLYDATA:
            return action.videoMediaLossMonthlyData
        default:
            return state
    }
}
function videoMediaLossQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOMEDIALOSSQUARTERLYDATA:
            return action.videoMediaLossQuarterlyData
        default:
            return state
    }
}
function videoMediaLossYearlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOMEDIALOSSYEARLYDATA:
            return action.videoMediaLossYearlyData
        default:
            return state
    }
}
function videoMediaLossCustomData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOMEDIALOSSCUSTOMDATA:
            return action.videoMediaLossCustomData
        default:
            return state
    }
}
function videoLossData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOLOSSDATA:
            return action.videoLossData
        default:
            return state
    }
}
function videoLossDailyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOLOSSDAILYDATA:
            return action.videoLossDailyData
        default:
            return state
    }
}
function videoLossWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOLOSSWEEKLYDATA:
            return action.videoLossWeeklyData
        default:
            return state
    }
}
function videoLossMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOLOSSMONTHLYDATA:
            return action.videoLossMonthlyData
        default:
            return state
    }
}
function videoLossQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOLOSSQUARTERLYDATA:
            return action.videoLossQuarterlyData
        default:
            return state
    }
}
function videoLossYearlyData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOLOSSYEARLYDATA:
            return action.videoLossYearlyData
        default:
            return state
    }
}
function videoLossCustomData(state = [], action) {
    switch (action.type) {
        case SET_VIDEOLOSSCUSTOMDATA:
            return action.videoLossCustomData
        default:
            return state
    }
}
function dvrStorageDailyData(state = [], action) {
    switch (action.type) {
        case SET_DVRSTORAGEDAILYDATA:
            return action.dvrStorageDailyData
        default:
            return state
    }
}
function dvrStorageWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_DVRSTORAGEWEEKLYDATA:
            return action.dvrStorageWeeklyData
        default:
            return state
    }
}
function dvrStorageMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_DVRSTORAGEMONTHLYDATA:
            return action.dvrStorageMonthlyData
        default:
            return state
    }
}
function dvrStorageQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_DVRSTORAGEQUARTERLYDATA:
            return action.dvrStorageQuarterlyData
        default:
            return state
    }
}
function dvrStorageYearlyData(state = [], action) {
    switch (action.type) {
        case SET_DVRSTORAGEYEARLYDATA:
            return action.dvrStorageYearlyData
        default:
            return state
    }
}
function dvrStorageCustomData(state = [], action) {
    switch (action.type) {
        case SET_DVRSTORAGECUSTOMDATA:
            return action.dvrStorageCustomData
        default:
            return state
    }
}
function dvrStorageCustomLineData(state = [], action) {
    switch (action.type) {
        case SET_DVRSTORAGECUSTOMLINEDATA:
            return action.dvrStorageCustomLineData
        default:
            return state
    }
}
function nvrStorageDailyData(state = [], action) {
    switch (action.type) {
        case SET_NVRSTORAGEDAILYDATA:
            return action.nvrStorageDailyData
        default:
            return state
    }
}
function nvrStorageWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_NVRSTORAGEWEEKLYDATA:
            return action.nvrStorageWeeklyData
        default:
            return state
    }
}
function nvrStorageMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_NVRSTORAGEMONTHLYDATA:
            return action.nvrStorageMonthlyData
        default:
            return state
    }
}
function nvrStorageQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_NVRSTORAGEQUARTERLYDATA:
            return action.nvrStorageQuarterlyData
        default:
            return state
    }
}
function nvrStorageYearlyData(state = [], action) {
    switch (action.type) {
        case SET_NVRSTORAGEYEARLYDATA:
            return action.nvrStorageYearlyData
        default:
            return state
    }
}
function nvrStorageCustomData(state = [], action) {
    switch (action.type) {
        case SET_NVRSTORAGECUSTOMDATA:
            return action.nvrStorageCustomData
        default:
            return state
    }
}
function nvrStorageCustomLineData(state = [], action) {
    switch (action.type) {
        case SET_NVRSTORAGECUSTOMLINEDATA:
            return action.nvrStorageCustomLineData
        default:
            return state
    }
}
function encoderStorageDailyData(state = [], action) {
    switch (action.type) {
        case SET_ENCODERSTORAGEDAILYDATA:
            return action.encoderStorageDailyData
        default:
            return state
    }
}
function encoderStorageWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_ENCODERSTORAGEWEEKLYDATA:
            return action.encoderStorageWeeklyData
        default:
            return state
    }
}
function encoderStorageMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_ENCODERSTORAGEMONTHLYDATA:
            return action.encoderStorageMonthlyData
        default:
            return state
    }
}
function encoderStorageQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_ENCODERSTORAGEQUARTERLYDATA:
            return action.encoderStorageQuarterlyData
        default:
            return state
    }
}
function encoderStorageYearlyData(state = [], action) {
    switch (action.type) {
        case SET_ENCODERSTORAGEYEARLYDATA:
            return action.encoderStorageYearlyData
        default:
            return state
    }
}
function encoderStorageCustomData(state = [], action) {
    switch (action.type) {
        case SET_ENCODERSTORAGECUSTOMDATA:
            return action.encoderStorageCustomData
        default:
            return state
    }
}
function encoderStorageCustomLineData(state = [], action) {
    switch (action.type) {
        case SET_ENCODERSTORAGECUSTOMLINEDATA:
            return action.encoderStorageCustomLineData
        default:
            return state
    }
}
function serverDailyData(state = [], action) {
    switch (action.type) {
        case SET_SERVERDAILYDATA:
            return action.serverDailyData
        default:
            return state
    }
}
function serverWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_SERVERWEEKLYDATA:
            return action.serverWeeklyData
        default:
            return state
    }
}
function serverMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_SERVERMONTHLYDATA:
            return action.serverMonthlyData
        default:
            return state
    }
}
function serverQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_SERVERQUARTERLYDATA:
            return action.serverQuarterlyData
        default:
            return state
    }
}
function serverYearlyData(state = [], action) {
    switch (action.type) {
        case SET_SERVERYEARLYDATA:
            return action.serverYearlyData
        default:
            return state
    }
}
function serverCustomData(state = [], action) {
    switch (action.type) {
        case SET_SERVERCUSTOMDATA:
            return action.serverCustomData
        default:
            return state
    }
}
function serverCustomLineData(state = [], action) {
    switch (action.type) {
        case SET_SERVERCUSTOMLINEDATA:
            return action.serverCustomLineData
        default:
            return state
    }
}
function networkDailyData(state = [], action) {
    switch (action.type) {
        case SET_NETWORKDAILYDATA:
            return action.networkDailyData
        default:
            return state
    }
}
function networkWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_NETWORKWEEKLYDATA:
            return action.networkWeeklyData
        default:
            return state
    }
}
function networkMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_NETWORKMONTHLYDATA:
            return action.networkMonthlyData
        default:
            return state
    }
}
function networkQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_NETWORKQUARTERLYDATA:
            return action.networkQuarterlyData
        default:
            return state
    }
}
function networkYearlyData(state = [], action) {
    switch (action.type) {
        case SET_NETWORKYEARLYDATA:
            return action.networkYearlyData
        default:
            return state
    }
}
function networkCustomData(state = [], action) {
    switch (action.type) {
        case SET_NETWORKCUSTOMDATA:
            return action.networkCustomData
        default:
            return state
    }
}
function networkCustomLineData(state = [], action) {
    switch (action.type) {
        case SET_NETWORKCUSTOMLINEDATA:
            return action.networkCustomLineData
        default:
            return state
    }
}
function firewallDailyData(state = [], action) {
    switch (action.type) {
        case SET_FIREWALLDAILYDATA:
            return action.firewallDailyData
        default:
            return state
    }
}
function firewallWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_FIREWALLWEEKLYDATA:
            return action.firewallWeeklyData
        default:
            return state
    }
}
function firewallMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_FIREWALLMONTHLYDATA:
            return action.firewallMonthlyData
        default:
            return state
    }
}
function firewallQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_FIREWALLQUARTERLYDATA:
            return action.firewallQuarterlyData
        default:
            return state
    }
}
function firewallYearlyData(state = [], action) {
    switch (action.type) {
        case SET_FIREWALLYEARLYDATA:
            return action.firewallYearlyData
        default:
            return state
    }
}
function firewallCustomData(state = [], action) {
    switch (action.type) {
        case SET_FIREWALLCUSTOMDATA:
            return action.firewallCustomData
        default:
            return state
    }
}
function firewallCustomLineData(state = [], action) {
    switch (action.type) {
        case SET_FIREWALLCUSTOMLINEDATA:
            return action.firewallCustomLineData
        default:
            return state
    }
}
function databaseDailyData(state = [], action) {
    switch (action.type) {
        case SET_DATABASEDAILYDATA:
            return action.databaseDailyData
        default:
            return state
    }
}
function databaseWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_DATABASEWEEKLYDATA:
            return action.databaseWeeklyData
        default:
            return state
    }
}
function databaseMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_DATABASEMONTHLYDATA:
            return action.databaseMonthlyData
        default:
            return state
    }
}
function databaseQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_DATABASEQUARTERLYDATA:
            return action.databaseQuarterlyData
        default:
            return state
    }
}
function databaseYearlyData(state = [], action) {
    switch (action.type) {
        case SET_DATABASEYEARLYDATA:
            return action.databaseYearlyData
        default:
            return state
    }
}
function databaseCustomData(state = [], action) {
    switch (action.type) {
        case SET_DATABASECUSTOMDATA:
            return action.databaseCustomData
        default:
            return state
    }
}
function databaseCustomLineData(state = [], action) {
    switch (action.type) {
        case SET_DATABASECUSTOMLINEDATA:
            return action.databaseCustomLineData
        default:
            return state
    }
}
function reportDailyData(state = [], action) {
    switch (action.type) {
        case SET_REPORTDAILYDATA:
            return action.reportDailyData
        default:
            return state
    }
}
function reportWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_REPORTWEEKLYDATA:
            return action.reportWeeklyData
        default:
            return state
    }
}
function reportMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_REPORTMONTHLYDATA:
            return action.reportMonthlyData
        default:
            return state
    }
}
function reportQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_REPORTQUARTERLYDATA:
            return action.reportQuarterlyData
        default:
            return state
    }
}
function reportYearlyData(state = [], action) {
    switch (action.type) {
        case SET_REPORTYEARLYDATA:
            return action.reportYearlyData
        default:
            return state
    }
}
function reportCustomData(state = [], action) {
    switch (action.type) {
        case SET_REPORTCUSTOMDATA:
            return action.reportCustomData
        default:
            return state
    }
}
function orderDailyData(state = [], action) {
    switch (action.type) {
        case SET_ORDERDAILYDATA:
            return action.orderDailyData
        default:
            return state
    }
}
function orderWeeklyData(state = [], action) {
    switch (action.type) {
        case SET_ORDERWEEKLYDATA:
            return action.orderWeeklyData
        default:
            return state
    }
}
function orderMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_ORDERMONTHLYDATA:
            return action.orderMonthlyData
        default:
            return state
    }
}
function orderQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_ORDERQUARTERLYDATA:
            return action.orderQuarterlyData
        default:
            return state
    }
}
function orderYearlyData(state = [], action) {
    switch (action.type) {
        case SET_ORDERYEARLYDATA:
            return action.orderYearlyData
        default:
            return state
    }
}
function orderCustomData(state = [], action) {
    switch (action.type) {
        case SET_ORDERCUSTOMDATA:
            return action.orderCustomData
        default:
            return state
    }
}
function orderCustomLineData(state = [], action) {
    switch (action.type) {
        case SET_ORDERCUSTOMLINEDATA:
            return action.orderCustomLineData
        default:
            return state
    }
}
function orderOnceData(state = [], action) {
    switch (action.type) {
        case SET_ORDERONCEDATA:
            return action.orderOnceData
        default:
            return state
    }
}
function orderTwiceData(state = [], action) {
    switch (action.type) {
        case SET_ORDERTWICEDATA:
            return action.orderTwiceData
        default:
            return state
    }
}
function orderTreeData(state = [], action) {
    switch (action.type) {
        case SET_ORDERTREEDATA:
            return action.orderTreeData
        default:
            return state
    }
}
function orderCurType(state = "", action) {
    switch (action.type) {
        case SET_ORDERCURTYPE:
            return action.orderCurType
        default:
            return state
    }
}
function chargeMonthlyData(state = [], action) {
    switch (action.type) {
        case SET_CHARGEMONTHLYDATA:
            return action.chargeMonthlyData
        default:
            return state
    }
}
function chargeQuarterlyData(state = [], action) {
    switch (action.type) {
        case SET_CHARGEQUARTERLYDATA:
            return action.chargeQuarterlyData
        default:
            return state
    }
}
function chargeYearlyData(state = [], action) {
    switch (action.type) {
        case SET_CHARGEYEARLYDATA:
            return action.chargeYearlyData
        default:
            return state
    }
}
function chargePicData(state = [], action) {
    switch (action.type) {
        case SET_CHARGEPICDATA:
            return action.chargePicData
        default:
            return state
    }
}

const reportManageReducer = combineReducers({
    videoCheckDailyData,
    videoCheckWeeklyData,
    videoCheckMonthlyData,
    videoCheckQuarterlyData,
    videoCheckYearlyData,
    videoCheckCustomData,
    videoCheckCustomLineData,
    videoCheckCustomParam,
    videoRealTimeData,
    videoOnlineTrendsData,
    videoOnlineTrendsAxis,
    videoOfflineData,
    videoOfflineDailyData,
    videoOfflineWeeklyData,
    videoOfflineMonthlyData,
    videoOfflineQuarterlyData,
    videoOfflineYearlyData,
    videoOfflineCustomData,
    videoMediaLossData,
    videoMediaLossDailyData,
    videoMediaLossWeeklyData,
    videoMediaLossMonthlyData,
    videoMediaLossQuarterlyData,
    videoMediaLossYearlyData,
    videoMediaLossCustomData,
    videoLossData,
    videoLossDailyData,
    videoLossWeeklyData,
    videoLossMonthlyData,
    videoLossQuarterlyData,
    videoLossYearlyData,
    videoLossCustomData,
    dvrStorageDailyData,
    dvrStorageWeeklyData,
    dvrStorageMonthlyData,
    dvrStorageQuarterlyData,
    dvrStorageYearlyData,
    dvrStorageCustomData,
    dvrStorageCustomLineData,
    nvrStorageDailyData,
    nvrStorageWeeklyData,
    nvrStorageMonthlyData,
    nvrStorageQuarterlyData,
    nvrStorageYearlyData,
    nvrStorageCustomData,
    nvrStorageCustomLineData,
    encoderStorageDailyData,
    encoderStorageWeeklyData,
    encoderStorageMonthlyData,
    encoderStorageQuarterlyData,
    encoderStorageYearlyData,
    encoderStorageCustomData,
    encoderStorageCustomLineData,
    serverDailyData,
    serverWeeklyData,
    serverMonthlyData,
    serverQuarterlyData,
    serverYearlyData,
    serverCustomData,
    serverCustomLineData,
    networkDailyData,
    networkWeeklyData,
    networkMonthlyData,
    networkQuarterlyData,
    networkYearlyData,
    networkCustomData,
    networkCustomLineData,
    firewallDailyData,
    firewallWeeklyData,
    firewallMonthlyData,
    firewallQuarterlyData,
    firewallYearlyData,
    firewallCustomData,
    firewallCustomLineData,
    databaseDailyData,
    databaseWeeklyData,
    databaseMonthlyData,
    databaseQuarterlyData,
    databaseYearlyData,
    databaseCustomData,
    databaseCustomLineData,
    reportDailyData,
    reportWeeklyData,
    reportMonthlyData,
    reportQuarterlyData,
    reportYearlyData,
    reportCustomData,
    orderDailyData,
    orderWeeklyData,
    orderMonthlyData,
    orderQuarterlyData,
    orderYearlyData,
    orderCustomData,
    orderCustomLineData,
    orderOnceData,
    orderTwiceData,
    orderTreeData,
    orderCurType,
    chargeMonthlyData,
    chargeQuarterlyData,
    chargeYearlyData,
    chargePicData
})

export default reportManageReducer
