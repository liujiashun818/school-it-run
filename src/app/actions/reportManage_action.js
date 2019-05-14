/**
 * 报表相关action
 */
var oDataReport = require('../server/odataReport');
import * as requestDataActions from './requestData_action'

export const SET_VIDEOCHECKDAILYDATA = 'SET_VIDEOCHECKDAILYDATA'
export const SET_VIDEOCHECKWEEKLYDATA = 'SET_VIDEOCHECKWEEKLYDATA'
export const SET_VIDEOCHECKMONTHLYDATA = 'SET_VIDEOCHECKMONTHLYDATA'
export const SET_VIDEOCHECKQUARTERLYDATA = 'SET_VIDEOCHECKQUARTERLYDATA'
export const SET_VIDEOCHECKYEARLYDATA = 'SET_VIDEOCHECKYEARLYDATA'
export const SET_VIDEOCHECKCUSTOMDATA = 'SET_VIDEOCHECKCUSTOMDATA'
export const SET_VIDEOCHECKCUSTOMLINEDATA = 'SET_VIDEOCHECKCUSTOMLINEDATA'
export const SET_VIDEOCHECKCUSTOMPARAM = 'SET_VIDEOCHECKCUSTOMPARAM'

export const SET_VIDEOREALTIMEDATA = 'SET_VIDEOREALTIMEDATA'
export const SET_VIDEOONLINETRENDSDATA = 'SET_VIDEOONLINETRENDSDATA'
export const SET_VIDEOONLINETRENDSAXIS = 'SET_VIDEOONLINETRENDSAXIS'

export const SET_VIDEOOFFLINEDATA = 'SET_VIDEOOFFLINEDATA'
export const SET_VIDEOOFFLINEDAILYDATA = 'SET_VIDEOOFFLINEDAILYDATA'
export const SET_VIDEOOFFLINEWEEKLYDATA = 'SET_VIDEOOFFLINEWEEKLYDATA'
export const SET_VIDEOOFFLINEMONTHLYDATA = 'SET_VIDEOOFFLINEMONTHLYDATA'
export const SET_VIDEOOFFLINEQUARTERLYDATA = 'SET_VIDEOOFFLINEQUARTERLYDATA'
export const SET_VIDEOOFFLINEYEARLYDATA = 'SET_VIDEOOFFLINEYEARLYDATA'
export const SET_VIDEOOFFLINECUSTOMDATA = 'SET_VIDEOOFFLINECUSTOMDATA'

export const SET_VIDEOMEDIALOSSDATA = 'SET_VIDEOMEDIALOSSDATA'
export const SET_VIDEOMEDIALOSSDAILYDATA = 'SET_VIDEOMEDIALOSSDAILYDATA'
export const SET_VIDEOMEDIALOSSWEEKLYDATA = 'SET_VIDEOMEDIALOSSWEEKLYDATA'
export const SET_VIDEOMEDIALOSSMONTHLYDATA = 'SET_VIDEOMEDIALOSSMONTHLYDATA'
export const SET_VIDEOMEDIALOSSQUARTERLYDATA = 'SET_VIDEOMEDIALOSSQUARTERLYDATA'
export const SET_VIDEOMEDIALOSSYEARLYDATA = 'SET_VIDEOMEDIALOSSYEARLYDATA'
export const SET_VIDEOMEDIALOSSCUSTOMDATA = 'SET_VIDEOMEDIALOSSCUSTOMDATA'

export const SET_VIDEOLOSSDATA = 'SET_VIDEOLOSSDATA'
export const SET_VIDEOLOSSDAILYDATA = 'SET_VIDEOLOSSDAILYDATA'
export const SET_VIDEOLOSSWEEKLYDATA = 'SET_VIDEOLOSSWEEKLYDATA'
export const SET_VIDEOLOSSMONTHLYDATA = 'SET_VIDEOLOSSMONTHLYDATA'
export const SET_VIDEOLOSSQUARTERLYDATA = 'SET_VIDEOLOSSQUARTERLYDATA'
export const SET_VIDEOLOSSYEARLYDATA = 'SET_VIDEOLOSSYEARLYDATA'
export const SET_VIDEOLOSSCUSTOMDATA = 'SET_VIDEOLOSSCUSTOMDATA'

export const SET_DVRSTORAGEDAILYDATA = 'SET_DVRSTORAGEDAILYDATA'
export const SET_DVRSTORAGEWEEKLYDATA = 'SET_DVRSTORAGEWEEKLYDATA'
export const SET_DVRSTORAGEMONTHLYDATA = 'SET_DVRSTORAGEMONTHLYDATA'
export const SET_DVRSTORAGEQUARTERLYDATA = 'SET_DVRSTORAGEQUARTERLYDATA'
export const SET_DVRSTORAGEYEARLYDATA = 'SET_DVRSTORAGEYEARLYDATA'
export const SET_DVRSTORAGECUSTOMDATA = 'SET_DVRSTORAGECUSTOMDATA'
export const SET_DVRSTORAGECUSTOMLINEDATA = 'SET_DVRSTORAGECUSTOMLINEDATA'

export const SET_NVRSTORAGEDAILYDATA = 'SET_NVRSTORAGEDAILYDATA'
export const SET_NVRSTORAGEWEEKLYDATA= 'SET_NVRSTORAGEWEEKLYDATA'
export const SET_NVRSTORAGEMONTHLYDATA = 'SET_NVRSTORAGEMONTHLYDATA'
export const SET_NVRSTORAGEQUARTERLYDATA = 'SET_NVRSTORAGEQUARTERLYDATA'
export const SET_NVRSTORAGEYEARLYDATA = 'SET_NVRSTORAGEYEARLYDATA'
export const SET_NVRSTORAGECUSTOMDATA = 'SET_NVRSTORAGECUSTOMDATA'
export const SET_NVRSTORAGECUSTOMLINEDATA = 'SET_NVRSTORAGECUSTOMLINEDATA'

export const SET_ENCODERSTORAGEDAILYDATA = 'SET_ENCODERSTORAGEDAILYDATA'
export const SET_ENCODERSTORAGEWEEKLYDATA = 'SET_ENCODERSTORAGEWEEKLYDATA'
export const SET_ENCODERSTORAGEMONTHLYDATA = 'SET_ENCODERSTORAGEMONTHLYDATA'
export const SET_ENCODERSTORAGEQUARTERLYDATA = 'SET_ENCODERSTORAGEQUARTERLYDATA'
export const SET_ENCODERSTORAGEYEARLYDATA = 'SET_ENCODERSTORAGEYEARLYDATA'
export const SET_ENCODERSTORAGECUSTOMDATA = 'SET_ENCODERSTORAGECUSTOMDATA'
export const SET_ENCODERSTORAGECUSTOMLINEDATA = 'SET_ENCODERSTORAGECUSTOMLINEDATA'

export const SET_SERVERDAILYDATA = 'SET_SERVERDAILYDATA'
export const SET_SERVERWEEKLYDATA = 'SET_SERVERWEEKLYDATA'
export const SET_SERVERMONTHLYDATA = 'SET_SERVERMONTHLYDATA'
export const SET_SERVERQUARTERLYDATA = 'SET_SERVERQUARTERLYDATA'
export const SET_SERVERYEARLYDATA = 'SET_SERVERYEARLYDATA'
export const SET_SERVERCUSTOMDATA = 'SET_SERVERCUSTOMDATA'
export const SET_SERVERCUSTOMLINEDATA = 'SET_SERVERCUSTOMLINEDATA'

export const SET_NETWORKDAILYDATA = 'SET_NETWORKDAILYDATA'
export const SET_NETWORKWEEKLYDATA = 'SET_NETWORKWEEKLYDATA'
export const SET_NETWORKMONTHLYDATA = 'SET_NETWORKMONTHLYDATA'
export const SET_NETWORKQUARTERLYDATA = 'SET_NETWORKQUARTERLYDATA'
export const SET_NETWORKYEARLYDATA = 'SET_NETWORKYEARLYDATA'
export const SET_NETWORKCUSTOMDATA = 'SET_NETWORKCUSTOMDATA'
export const SET_NETWORKCUSTOMLINEDATA = 'SET_NETWORKCUSTOMLINEDATA'

export const SET_FIREWALLDAILYDATA = 'SET_FIREWALLDAILYDATA'
export const SET_FIREWALLWEEKLYDATA = 'SET_FIREWALLWEEKLYDATA'
export const SET_FIREWALLMONTHLYDATA = 'SET_FIREWALLMONTHLYDATA'
export const SET_FIREWALLQUARTERLYDATA = 'SET_FIREWALLQUARTERLYDATA'
export const SET_FIREWALLYEARLYDATA = 'SET_FIREWALLYEARLYDATA'
export const SET_FIREWALLCUSTOMDATA = 'SET_FIREWALLCUSTOMDATA'
export const SET_FIREWALLCUSTOMLINEDATA = 'SET_FIREWALLCUSTOMLINEDATA'

export const SET_DATABASEDAILYDATA = 'SET_DATABASEDAILYDATA'
export const SET_DATABASEWEEKLYDATA = 'SET_DATABASEWEEKLYDATA'
export const SET_DATABASEMONTHLYDATA = 'SET_DATABASEMONTHLYDATA'
export const SET_DATABASEQUARTERLYDATA = 'SET_DATABASEQUARTERLYDATA'
export const SET_DATABASEYEARLYDATA = 'SET_DATABASEYEARLYDATA'
export const SET_DATABASECUSTOMDATA = 'SET_DATABASECUSTOMDATA'
export const SET_DATABASECUSTOMLINEDATA = 'SET_DATABASECUSTOMLINEDATA'

export const SET_REPORTDAILYDATA = 'SET_REPORTDAILYDATA'
export const SET_REPORTWEEKLYDATA = 'SET_REPORTWEEKLYDATA'
export const SET_REPORTMONTHLYDATA = 'SET_REPORTMONTHLYDATA'
export const SET_REPORTQUARTERLYDATA = 'SET_REPORTQUARTERLYDATA'
export const SET_REPORTYEARLYDATA = 'SET_REPORTYEARLYDATA'
export const SET_REPORTCUSTOMDATA = 'SET_REPORTCUSTOMDATA'

export const SET_ORDERDAILYDATA = 'SET_ORDERDAILYDATA'
export const SET_ORDERWEEKLYDATA = 'SET_ORDERWEEKLYDATA'
export const SET_ORDERMONTHLYDATA = 'SET_ORDERMONTHLYDATA'
export const SET_ORDERQUARTERLYDATA = 'SET_ORDERQUARTERLYDATA'
export const SET_ORDERYEARLYDATA = 'SET_ORDERYEARLYDATA'
export const SET_ORDERCUSTOMDATA = 'SET_ORDERCUSTOMDATA'
export const SET_ORDERCUSTOMLINEDATA = 'SET_ORDERCUSTOMLINEDATA'
export const SET_ORDERONCEDATA = 'SET_ORDERONCEDATA'
export const SET_ORDERTWICEDATA = 'SET_ORDERTWICEDATA'
export const SET_ORDERTREEDATA = 'SET_ORDERTREEDATA'
export const SET_ORDERCURTYPE = 'SET_ORDERCURTYPE'

export const SET_CHARGEMONTHLYDATA = 'SET_CHARGEMONTHLYDATA'
export const SET_CHARGEQUARTERLYDATA = 'SET_CHARGEQUARTERLYDATA'
export const SET_CHARGEYEARLYDATA = 'SET_CHARGEYEARLYDATA'
export const SET_CHARGEPICDATA = 'SET_CHARGEPICDATA'

export function setVideoCheckDailyData(videoCheckDailyData) {
    return {
        type: SET_VIDEOCHECKDAILYDATA,
        videoCheckDailyData
    }
}
export function setVideoCheckWeeklyData(videoCheckWeeklyData) {
    return {
        type: SET_VIDEOCHECKWEEKLYDATA,
        videoCheckWeeklyData
    }
}
export function setVideoCheckMonthlyData(videoCheckMonthlyData) {
    return {
        type: SET_VIDEOCHECKMONTHLYDATA,
        videoCheckMonthlyData
    }
}
export function setVideoCheckQuarterlyData(videoCheckQuarterlyData) {
    return {
        type: SET_VIDEOCHECKQUARTERLYDATA,
        videoCheckQuarterlyData
    }
}
export function setVideoCheckYearlyData(videoCheckYearlyData) {
    return {
        type: SET_VIDEOCHECKYEARLYDATA,
        videoCheckYearlyData
    }
}
export function setVideoCheckCustomData(videoCheckCustomData) {
    return {
        type: SET_VIDEOCHECKCUSTOMDATA,
        videoCheckCustomData
    }
}
export function setVideoCheckCustomLineData(videoCheckCustomLineData) {
    return {
        type: SET_VIDEOCHECKCUSTOMLINEDATA,
        videoCheckCustomLineData
    }
}
export function setVideoCheckCustomParam(videoCheckCustomParam) {
    return {
        type: SET_VIDEOCHECKCUSTOMPARAM,
        videoCheckCustomParam
    }
}
export function setVideoRealTimeData(videoRealTimeData) {
    return {
        type: SET_VIDEOREALTIMEDATA,
        videoRealTimeData
    }
}
export function setVideoOnlineTrendsData(videoOnlineTrendsData) {
    return {
        type: SET_VIDEOONLINETRENDSDATA,
        videoOnlineTrendsData
    }
}
export function setVideoOnlineTrendsAxis(videoOnlineTrendsAxis) {
    return {
        type: SET_VIDEOONLINETRENDSAXIS,
        videoOnlineTrendsAxis
    }
}
export function setVideoOfflineData(videoOfflineData) {
    return {
        type: SET_VIDEOOFFLINEDATA,
        videoOfflineData
    }
}
export function setVideoOfflineDailyData(videoOfflineDailyData) {
    return {
        type: SET_VIDEOOFFLINEDAILYDATA,
        videoOfflineDailyData
    }
}
export function setVideoOfflineWeeklyData(videoOfflineWeeklyData) {
    return {
        type: SET_VIDEOOFFLINEWEEKLYDATA,
        videoOfflineWeeklyData
    }
}
export function setVideoOfflineMonthlyData(videoOfflineMonthlyData) {
    return {
        type: SET_VIDEOOFFLINEMONTHLYDATA,
        videoOfflineMonthlyData
    }
}
export function setVideoOfflineQuarterlyData(videoOfflineQuarterlyData) {
    return {
        type: SET_VIDEOOFFLINEQUARTERLYDATA,
        videoOfflineQuarterlyData
    }
}
export function setVideoOfflineYearlyData(videoOfflineYearlyData) {
    return {
        type: SET_VIDEOOFFLINEYEARLYDATA,
        videoOfflineYearlyData
    }
}
export function setVideoOfflineCustomData(videoOfflineCustomData) {
    return {
        type: SET_VIDEOOFFLINECUSTOMDATA,
        videoOfflineCustomData
    }
}
export function setVideoMediaLossData(videoMediaLossData) {
    return {
        type: SET_VIDEOMEDIALOSSDATA,
        videoMediaLossData
    }
}
export function setVideoMediaLossDailyData(videoMediaLossDailyData) {
    return {
        type: SET_VIDEOMEDIALOSSDAILYDATA,
        videoMediaLossDailyData
    }
}
export function setVideoMediaLossWeeklyData(videoMediaLossWeeklyData) {
    return {
        type: SET_VIDEOMEDIALOSSWEEKLYDATA,
        videoMediaLossWeeklyData
    }
}
export function setVideoMediaLossMonthlyData(videoMediaLossMonthlyData) {
    return {
        type: SET_VIDEOMEDIALOSSMONTHLYDATA,
        videoMediaLossMonthlyData
    }
}
export function setVideoMediaLossQuarterlyData(videoMediaLossQuarterlyData) {
    return {
        type: SET_VIDEOMEDIALOSSQUARTERLYDATA,
        videoMediaLossQuarterlyData
    }
}
export function setVideoMediaLossYearlyData(videoMediaLossYearlyData) {
    return {
        type: SET_VIDEOMEDIALOSSYEARLYDATA,
        videoMediaLossYearlyData
    }
}
export function setVideoMediaLossCustomData(videoMediaLossCustomData) {
    return {
        type: SET_VIDEOMEDIALOSSCUSTOMDATA,
        videoMediaLossCustomData
    }
}
export function setVideoLossData(videoLossData) {
    return {
        type: SET_VIDEOLOSSDATA,
        videoLossData
    }
}
export function setVideoLossDailyData(videoLossDailyData) {
    return {
        type: SET_VIDEOLOSSDAILYDATA,
        videoLossDailyData
    }
}
export function setVideoLossWeeklyData(videoLossWeeklyData) {
    return {
        type: SET_VIDEOLOSSWEEKLYDATA,
        videoLossWeeklyData
    }
}
export function setVideoLossMonthlyData(videoLossMonthlyData) {
    return {
        type: SET_VIDEOLOSSMONTHLYDATA,
        videoLossMonthlyData
    }
}
export function setVideoLossQuarterlyData(videoLossQuarterlyData) {
    return {
        type: SET_VIDEOLOSSQUARTERLYDATA,
        videoLossQuarterlyData
    }
}
export function setVideoLossYearlyData(videoLossYearlyData) {
    return {
        type: SET_VIDEOLOSSYEARLYDATA,
        videoLossYearlyData
    }
}
export function setVideoLossCustomData(videoLossCustomData) {
    return {
        type: SET_VIDEOLOSSCUSTOMDATA,
        videoLossCustomData
    }
}
export function setDvrStorageDailyData(dvrStorageDailyData) {
    return {
        type: SET_DVRSTORAGEDAILYDATA,
        dvrStorageDailyData
    }
}
export function setDvrStorageWeeklyData(dvrStorageWeeklyData) {
    return {
        type: SET_DVRSTORAGEWEEKLYDATA,
        dvrStorageWeeklyData
    }
}
export function setDvrStorageMonthlyData(dvrStorageMonthlyData) {
    return {
        type: SET_DVRSTORAGEMONTHLYDATA,
        dvrStorageMonthlyData
    }
}
export function setDvrStorageQuarterlyData(dvrStorageQuarterlyData) {
    return {
        type: SET_DVRSTORAGEQUARTERLYDATA,
        dvrStorageQuarterlyData
    }
}
export function setDvrStorageYearlyData(dvrStorageYearlyData) {
    return {
        type: SET_DVRSTORAGEYEARLYDATA,
        dvrStorageYearlyData
    }
}
export function setDvrStorageCustomData(dvrStorageCustomData) {
    return {
        type: SET_DVRSTORAGECUSTOMDATA,
        dvrStorageCustomData
    }
}
export function setDvrStorageCustomLineData(dvrStorageCustomLineData) {
    return {
        type: SET_DVRSTORAGECUSTOMLINEDATA,
        dvrStorageCustomLineData
    }
}
export function setNvrStorageDailyData(nvrStorageDailyData) {
    return {
        type: SET_NVRSTORAGEDAILYDATA,
        nvrStorageDailyData
    }
}
export function setNvrStorageWeeklyData(nvrStorageWeeklyData) {
    return {
        type: SET_NVRSTORAGEWEEKLYDATA,
        nvrStorageWeeklyData
    }
}
export function setNvrStorageMonthlyData(nvrStorageMonthlyData) {
    return {
        type: SET_NVRSTORAGEMONTHLYDATA,
        nvrStorageMonthlyData
    }
}
export function setNvrStorageQuarterlyData(nvrStorageQuarterlyData) {
    return {
        type: SET_NVRSTORAGEQUARTERLYDATA,
        nvrStorageQuarterlyData
    }
}
export function setNvrStorageYearlyData(nvrStorageYearlyData) {
    return {
        type: SET_NVRSTORAGEYEARLYDATA,
        nvrStorageYearlyData
    }
}
export function setNvrStorageCustomData(nvrStorageCustomData) {
    return {
        type: SET_NVRSTORAGECUSTOMDATA,
        nvrStorageCustomData
    }
}
export function setNvrStorageCustomLineData(nvrStorageCustomLineData) {
    return {
        type: SET_NVRSTORAGECUSTOMLINEDATA,
        nvrStorageCustomLineData
    }
}
export function setEncoderStorageDailyData(encoderStorageDailyData) {
    return {
        type: SET_ENCODERSTORAGEDAILYDATA,
        encoderStorageDailyData
    }
}
export function setEncoderStorageWeeklyData(encoderStorageWeeklyData) {
    return {
        type: SET_ENCODERSTORAGEWEEKLYDATA,
        encoderStorageWeeklyData
    }
}
export function setEncoderStorageMonthlyData(encoderStorageMonthlyData) {
    return {
        type: SET_ENCODERSTORAGEMONTHLYDATA,
        encoderStorageMonthlyData
    }
}
export function setEncoderStorageQuarterlyData(encoderStorageQuarterlyData) {
    return {
        type: SET_ENCODERSTORAGEQUARTERLYDATA,
        encoderStorageQuarterlyData
    }
}
export function setEncoderStorageYearlyData(encoderStorageYearlyData) {
    return {
        type: SET_ENCODERSTORAGEYEARLYDATA,
        encoderStorageYearlyData
    }
}
export function setEncoderStorageCustomData(encoderStorageCustomData) {
    return {
        type: SET_ENCODERSTORAGECUSTOMDATA,
        encoderStorageCustomData
    }
}
export function setEncoderStorageCustomLineData(encoderStorageCustomLineData) {
    return {
        type: SET_ENCODERSTORAGECUSTOMLINEDATA,
        encoderStorageCustomLineData
    }
}
export function setServerDailyData(serverDailyData) {
    return {
        type: SET_SERVERDAILYDATA,
        serverDailyData
    }
}
export function setServerWeeklyData(serverWeeklyData) {
    return {
        type: SET_SERVERWEEKLYDATA,
        serverWeeklyData
    }
}
export function setServerMonthlyData(serverMonthlyData) {
    return {
        type: SET_SERVERMONTHLYDATA,
        serverMonthlyData
    }
}
export function setServerQuarterlyData(serverQuarterlyData) {
    return {
        type: SET_SERVERQUARTERLYDATA,
        serverQuarterlyData
    }
}
export function setServerYearlyData(serverYearlyData) {
    return {
        type: SET_SERVERYEARLYDATA,
        serverYearlyData
    }
}
export function setServerCustomData(serverCustomData) {
    return {
        type: SET_SERVERCUSTOMDATA,
        serverCustomData
    }
}
export function setServerCustomLineData(serverCustomLineData) {
    return {
        type: SET_SERVERCUSTOMLINEDATA,
        serverCustomLineData
    }
}
export function setNetworkDailyData(networkDailyData) {
    return {
        type: SET_NETWORKDAILYDATA,
        networkDailyData
    }
}
export function setNetworkWeeklyData(networkWeeklyData) {
    return {
        type: SET_NETWORKWEEKLYDATA,
        networkWeeklyData
    }
}
export function setNetworkMonthlyData(networkMonthlyData) {
    return {
        type: SET_NETWORKMONTHLYDATA,
        networkMonthlyData
    }
}
export function setNetworkQuarterlyData(networkQuarterlyData) {
    return {
        type: SET_NETWORKQUARTERLYDATA,
        networkQuarterlyData
    }
}
export function setNetworkYearlyData(networkYearlyData) {
    return {
        type: SET_NETWORKYEARLYDATA,
        networkYearlyData
    }
}
export function setNetworkCustomData(networkCustomData) {
    return {
        type: SET_NETWORKCUSTOMDATA,
        networkCustomData
    }
}
export function setNetworkCustomLineData(networkCustomLineData) {
    return {
        type: SET_NETWORKCUSTOMLINEDATA,
        networkCustomLineData
    }
}
export function setFirewallDailyData(firewallDailyData) {
    return {
        type: SET_FIREWALLDAILYDATA,
        firewallDailyData
    }
}
export function setFirewallWeeklyData(firewallWeeklyData) {
    return {
        type: SET_FIREWALLWEEKLYDATA,
        firewallWeeklyData
    }
}
export function setFirewallMonthlyData(firewallMonthlyData) {
    return {
        type: SET_FIREWALLMONTHLYDATA,
        firewallMonthlyData
    }
}
export function setFirewallQuarterlyData(firewallQuarterlyData) {
    return {
        type: SET_FIREWALLQUARTERLYDATA,
        firewallQuarterlyData
    }
}
export function setFirewallYearlyData(firewallYearlyData) {
    return {
        type: SET_FIREWALLYEARLYDATA,
        firewallYearlyData
    }
}
export function setFirewallCustomData(firewallCustomData) {
    return {
        type: SET_FIREWALLCUSTOMDATA,
        firewallCustomData
    }
}
export function setFirewallCustomLineData(firewallCustomLineData) {
    return {
        type: SET_FIREWALLCUSTOMLINEDATA,
        firewallCustomLineData
    }
}
export function setDatabaseDailyData(databaseDailyData) {
    return {
        type: SET_DATABASEDAILYDATA,
        databaseDailyData
    }
}
export function setDatabaseWeeklyData(databaseWeeklyData) {
    return {
        type: SET_DATABASEWEEKLYDATA,
        databaseWeeklyData
    }
}
export function setDatabaseMonthlyData(databaseMonthlyData) {
    return {
        type: SET_DATABASEMONTHLYDATA,
        databaseMonthlyData
    }
}
export function setDatabaseQuarterlyData(databaseQuarterlyData) {
    return {
        type: SET_DATABASEQUARTERLYDATA,
        databaseQuarterlyData
    }
}
export function setDatabaseYearlyData(databaseYearlyData) {
    return {
        type: SET_DATABASEYEARLYDATA,
        databaseYearlyData
    }
}
export function setDatabaseCustomData(databaseCustomData) {
    return {
        type: SET_DATABASECUSTOMDATA,
        databaseCustomData
    }
}
export function setDatabaseCustomLineData(databaseCustomLineData) {
    return {
        type: SET_DATABASECUSTOMLINEDATA,
        databaseCustomLineData
    }
}
export function setReportDailyData(reportDailyData) {
    return {
        type: SET_REPORTDAILYDATA,
        reportDailyData
    }
}
export function setReportWeeklyData(reportWeeklyData) {
    return {
        type: SET_REPORTWEEKLYDATA,
        reportWeeklyData
    }
}
export function setReportMonthlyData(reportMonthlyData) {
    return {
        type: SET_REPORTMONTHLYDATA,
        reportMonthlyData
    }
}
export function setReportQuarterlyData(reportQuarterlyData) {
    return {
        type: SET_REPORTQUARTERLYDATA,
        reportQuarterlyData
    }
}
export function setReportYearlyData(reportYearlyData) {
    return {
        type: SET_REPORTYEARLYDATA,
        reportYearlyData
    }
}
export function setReportCustomData(reportCustomData) {
    return {
        type: SET_REPORTCUSTOMDATA,
        reportCustomData
    }
}
export function setOrderDailyData(orderDailyData) {
    return {
        type: SET_ORDERDAILYDATA,
        orderDailyData
    }
}
export function setOrderWeeklyData(orderWeeklyData) {
    return {
        type: SET_ORDERWEEKLYDATA,
        orderWeeklyData
    }
}
export function setOrderMonthlyData(orderMonthlyData) {
    return {
        type: SET_ORDERMONTHLYDATA,
        orderMonthlyData
    }
}
export function setOrderQuarterlyData(orderQuarterlyData) {
    return {
        type: SET_ORDERQUARTERLYDATA,
        orderQuarterlyData
    }
}
export function setOrderYearlyData(orderYearlyData) {
    return {
        type: SET_ORDERYEARLYDATA,
        orderYearlyData
    }
}
export function setOrderCustomData(orderCustomData) {
    return {
        type: SET_ORDERCUSTOMDATA,
        orderCustomData
    }
}
export function setOrderCustomLineData(orderCustomLineData) {
    return {
        type: SET_ORDERCUSTOMLINEDATA,
        orderCustomLineData
    }
}
export function setOrderOnceData(orderOnceData) {
    return {
        type: SET_ORDERONCEDATA,
        orderOnceData
    }
}
export function setOrderTwiceData(orderTwiceData) {
    return {
        type: SET_ORDERTWICEDATA,
        orderTwiceData
    }
}
export function setOrderTreeData(orderTreeData) {
    return {
        type: SET_ORDERTREEDATA,
        orderTreeData
    }
}
export function setOrderCurType(orderCurType) {
    return {
        type: SET_ORDERCURTYPE,
        orderCurType
    }
}
export function setChargeMonthlyData(chargeMonthlyData) {
    return {
        type: SET_CHARGEMONTHLYDATA,
        chargeMonthlyData
    }
}
export function setChargeQuarterlyData(chargeQuarterlyData) {
    return {
        type: SET_CHARGEQUARTERLYDATA,
        chargeQuarterlyData
    }
}
export function setChargeYearlyData(chargeYearlyData) {
    return {
        type: SET_CHARGEYEARLYDATA,
        chargeYearlyData
    }
}
export function setChargePicData(chargePicData) {
    return {
        type: SET_CHARGEPICDATA,
        chargePicData
    }
}

export function getVideoCheckData(param) {
    return dispatch => {
        dispatch(setVideoCheckCustomParam(""));
        dispatch(requestDataActions.setRequest());
        oDataReport.getVideoCheckReport(param, dispatch, function(data){
            dispatch(setVideoCheckCustomParam(param));
            var results = data.d.results;
            if (results && results.length) {
                var res = JSON.parse(results[0].REPORTDATA);
                switch (param.key) {
                    case 1:
                        dispatch(setVideoCheckDailyData(res));
                        break;
                    case 2:
                        dispatch(setVideoCheckWeeklyData(res));
                        break;
                    case 3:
                        dispatch(setVideoCheckMonthlyData(res));
                        break;
                    case 4:
                        dispatch(setVideoCheckQuarterlyData(res));
                        break;
                    case 5:
                        dispatch(setVideoCheckYearlyData(res));
                        break;
                    case 6:
                        dispatch(setVideoCheckCustomData(res));
                        try {
                            if(results[0].BROKENLINE != null){
                                var resline = JSON.parse(results[0].BROKENLINE);
                                dispatch(setVideoCheckCustomLineData(resline));
                            }
                        } catch (e){
                        };
                        break;
                    default:
                }
                dispatch(requestDataActions.setRequestSuccess());
            }
            else {
                dispatch(requestDataActions.setRequestFail());
            }
        });
    }
}

export function getVideoOnlineTrends(time) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oDataReport.getCameraOnlineTrends(time,dispatch,function(data){
            var results = data.d.results;
            if (results && results.length) {
                var res = JSON.parse(results[0].REPORTDATA);
                var array = [], xAxis = [];
                for (var i = 0; i < res.length; i++) {
                    var temponlinerate = res[i].onlinerate * 100;
                    temponlinerate = temponlinerate.toFixed(2);
                    array.push(temponlinerate);
                    xAxis.push(res[i].time);
                }
                dispatch(setVideoOnlineTrendsAxis(xAxis.sort()));
                dispatch(setVideoOnlineTrendsData(array));
                dispatch(requestDataActions.setRequestSuccess());
            }
            else {
                dispatch(requestDataActions.setRequestFail());
            }
        });
    }
}

export function getVideoDetailsData(param) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oDataReport.getVideoDetailsReport(param,dispatch,function(data){
            var results = data.d.results;
            if (results && results.length) {
                var res = JSON.parse(results[0].REPORTDATA);
                switch (param.status) {
                    case 1:
                        switch (param.key) {
                            case 1:
                                dispatch(setVideoOfflineDailyData(res));
                                break;
                            case 2:
                                dispatch(setVideoOfflineWeeklyData(res));
                                break;
                            case 3:
                                dispatch(setVideoOfflineMonthlyData(res));
                                break;
                            case 4:
                                dispatch(setVideoOfflineQuarterlyData(res));
                                break;
                            case 5:
                                dispatch(setVideoOfflineYearlyData(res));
                                break;
                            case 6:
                                dispatch(setVideoOfflineCustomData(res));
                                break;
                            default:
                        }
                        break;
                    case 2:
                        switch (param.key) {
                            case 1:
                                dispatch(setVideoMediaLossDailyData(res));
                                break;
                            case 2:
                                dispatch(setVideoMediaLossWeeklyData(res));
                                break;
                            case 3:
                                dispatch(setVideoMediaLossMonthlyData(res));
                                break;
                            case 4:
                                dispatch(setVideoMediaLossQuarterlyData(res));
                                break;
                            case 5:
                                dispatch(setVideoMediaLossYearlyData(res));
                                break;
                            case 6:
                                dispatch(setVideoMediaLossCustomData(res));
                                break;
                            default:
                        }
                        break;
                    case 3:
                        switch (param.key) {
                            case 1:
                                dispatch(setVideoLossDailyData(res));
                                break;
                            case 2:
                                dispatch(setVideoLossWeeklyData(res));
                                break;
                            case 3:
                                dispatch(setVideoLossMonthlyData(res));
                                break;
                            case 4:
                                dispatch(setVideoLossQuarterlyData(res));
                                break;
                            case 5:
                                dispatch(setVideoLossYearlyData(res));
                                break;
                            case 6:
                                dispatch(setVideoLossCustomData(res));
                                break;
                            default:
                        }
                        break;
                    default:
                }
                dispatch(requestDataActions.setRequestSuccess());
            }
            else {
                dispatch(requestDataActions.setRequestFail());
            }
        });
    }
}

export function getVideoRealTimeData() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oDataReport.getVideoRealTimeReport(dispatch,function(data){
            var results = data.d.results;
            if (results && results.length) {
                var res = JSON.parse(results[0].REPORTDATA);
                dispatch(setVideoRealTimeData(res));
                dispatch(requestDataActions.setRequestSuccess());
            }
            else {
                dispatch(requestDataActions.setRequestFail());
            }
        });
    }
}

export function getStorageData(param) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oDataReport.getStorageReport(param,dispatch,function(data){
            var results = data.d.results;
            if (results && results.length) {
                var res = JSON.parse(results[0].REPORTDATA);
                switch (param.status) {
                    case 1:
                        switch (param.key) {
                            case 1:
                                dispatch(setDvrStorageDailyData(res));
                                break;
                            case 2:
                                dispatch(setDvrStorageWeeklyData(res));
                                break;
                            case 3:
                                dispatch(setDvrStorageMonthlyData(res));
                                break;
                            case 4:
                                dispatch(setDvrStorageQuarterlyData(res));
                                break;
                            case 5:
                                dispatch(setDvrStorageYearlyData(res));
                                break;
                            case 6:
                                dispatch(setDvrStorageCustomData(res));
                                try {
                                    if(results[0].BROKENLINE != null){
                                        var resline = JSON.parse(results[0].BROKENLINE);
                                        dispatch(setDvrStorageCustomLineData(resline));
                                    }
                                } catch (e){
                                };
                                break;
                            default:
                        }
                        break;
                    case 2:
                        switch (param.key) {
                            case 1:
                                dispatch(setNvrStorageDailyData(res));
                                break;
                            case 2:
                                dispatch(setNvrStorageWeeklyData(res));
                                break;
                            case 3:
                                dispatch(setNvrStorageMonthlyData(res));
                                break;
                            case 4:
                                dispatch(setNvrStorageQuarterlyData(res));
                                break;
                            case 5:
                                dispatch(setNvrStorageYearlyData(res));
                                break;
                            case 6:
                                dispatch(setNvrStorageCustomData(res));
                                try {
                                    if(results[0].BROKENLINE != null){
                                        var resline = JSON.parse(results[0].BROKENLINE);
                                        dispatch(setNvrStorageCustomLineData(resline));
                                    }
                                } catch (e){
                                };
                                break;
                            default:
                        }
                        break;
                    case 3:
                        switch (param.key) {
                            case 1:
                                dispatch(setEncoderStorageDailyData(res));
                                break;
                            case 2:
                                dispatch(setEncoderStorageWeeklyData(res));
                                break;
                            case 3:
                                dispatch(setEncoderStorageMonthlyData(res));
                                break;
                            case 4:
                                dispatch(setEncoderStorageQuarterlyData(res));
                                break;
                            case 5:
                                dispatch(setEncoderStorageYearlyData(res));
                                break;
                            case 6:
                                dispatch(setEncoderStorageCustomData(res));
                                try {
                                    if(results[0].BROKENLINE != null){
                                        var resline = JSON.parse(results[0].BROKENLINE);
                                        dispatch(setEncoderStorageCustomLineData(resline));
                                    }
                                } catch (e){
                                };
                                break;
                            default:
                        }
                        break;
                    default:
                }
                dispatch(requestDataActions.setRequestSuccess());
            }
            else {
                dispatch(requestDataActions.setRequestFail());
            }
        });
    }
}

export function getServerReportData(param) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oDataReport.getServerReport(param,dispatch,function(data){
            var results = data.d.results;
            if (results && results.length) {
                var res = JSON.parse(results[0].REPORTDATA);
                switch (param.status) {
                    case 1:
                        switch (param.key) {
                            case 1:
                                dispatch(setServerDailyData(res));
                                break;
                            case 2:
                                dispatch(setServerWeeklyData(res));
                                break;
                            case 3:
                                dispatch(setServerMonthlyData(res));
                                break;
                            case 4:
                                dispatch(setServerQuarterlyData(res));
                                break;
                            case 5:
                                dispatch(setServerYearlyData(res));
                                break;
                            case 6:
                                dispatch(setServerCustomData(res));
                                try {
                                    if(results[0].BROKENLINE != null){
                                        var resline = JSON.parse(results[0].BROKENLINE);
                                        dispatch(setServerCustomLineData(resline));
                                    }
                                } catch (e){
                                };
                                break;
                            default:
                        }
                        break;
                    case 2:
                        switch (param.key) {
                            case 1:
                                dispatch(setNetworkDailyData(res));
                                break;
                            case 2:
                                dispatch(setNetworkWeeklyData(res));
                                break;
                            case 3:
                                dispatch(setNetworkMonthlyData(res));
                                break;
                            case 4:
                                dispatch(setNetworkQuarterlyData(res));
                                break;
                            case 5:
                                dispatch(setNetworkYearlyData(res));
                                break;
                            case 6:
                                dispatch(setNetworkCustomData(res));
                                try {
                                    if(results[0].BROKENLINE != null){
                                        var resline = JSON.parse(results[0].BROKENLINE);
                                        dispatch(setNetworkCustomLineData(resline));
                                    }
                                } catch (e){
                                };
                                break;
                            default:
                        }
                        break;
                    case 3:
                        switch (param.key) {
                            case 1:
                                dispatch(setFirewallDailyData(res));
                                break;
                            case 2:
                                dispatch(setFirewallWeeklyData(res));
                                break;
                            case 3:
                                dispatch(setFirewallMonthlyData(res));
                                break;
                            case 4:
                                dispatch(setFirewallQuarterlyData(res));
                                break;
                            case 5:
                                dispatch(setFirewallYearlyData(res));
                                break;
                            case 6:
                                dispatch(setFirewallCustomData(res));
                                try {
                                    if(results[0].BROKENLINE != null){
                                        var resline = JSON.parse(results[0].BROKENLINE);
                                        dispatch(setFirewallCustomLineData(resline));
                                    }
                                } catch (e){
                                };
                                break;
                            default:
                        }
                        break;
                    case 4:
                        switch (param.key) {
                            case 1:
                                dispatch(setDatabaseDailyData(res));
                                break;
                            case 2:
                                dispatch(setDatabaseWeeklyData(res));
                                break;
                            case 3:
                                dispatch(setDatabaseMonthlyData(res));
                                break;
                            case 4:
                                dispatch(setDatabaseQuarterlyData(res));
                                break;
                            case 5:
                                dispatch(setDatabaseYearlyData(res));
                                break;
                            case 6:
                                dispatch(setDatabaseCustomData(res));
                                try {
                                    if(results[0].BROKENLINE != null){
                                        var resline = JSON.parse(results[0].BROKENLINE);
                                        dispatch(setDatabaseCustomLineData(resline));
                                    }
                                } catch (e){
                                };
                                break;
                            default:
                        }
                        break;
                    default:
                }
                dispatch(requestDataActions.setRequestSuccess());
            }
            else {
                dispatch(requestDataActions.setRequestFail());
            }
        });
    }
}

export function getOrderReportData(param) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oDataReport.getOrderReportData(param,dispatch,function(data){
            var results = data.d.results;
            if(results.length>0){
                var res = JSON.parse(results[0].REPORTDATA);
                switch (param.key) {
                    case 2:
                        dispatch(setOrderWeeklyData(res));
                        break;
                    case 3:
                        dispatch(setOrderMonthlyData(res));
                        break;
                    case 4:
                        dispatch(setOrderQuarterlyData(res));
                        break;
                    case 5:
                        dispatch(setOrderYearlyData(res));
                        break;
                    case 6:
                        dispatch(setOrderCustomData(res));
                        try {
                            if(results[0].BROKENLINE != null){
                                var resline = JSON.parse(results[0].BROKENLINE);
                                dispatch(setOrderCustomLineData(resline));
                            }
                        } catch (e){
                        };
                        break;
                    default:
                }
            }
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function getChargeReportData(param) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oDataReport.getChargeReportData(param,dispatch,function(data){
            var results = data.d.results;
            if(results.length>0){
                var result = results[0];
                var result2 = eval(result.REPORTCHARTDATA);
                result = eval(result.REPORTDATA);
                var type = param.REPORT_TYPE;
                if(type=="accountingassessmentMonthly"){
                    dispatch(setChargeMonthlyData(result));
                }
                if(type=="accountingassessmentQuarterly"){
                    dispatch(setChargeQuarterlyData(result));
                }
                if(type=="accountingassessmentYearly"){
                    dispatch(setChargeYearlyData(result));
                }
                dispatch(setChargePicData(result2));
            }
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function setinitCustomData() {
    return dispatch => {
        dispatch(setVideoCheckDailyData([]));
        dispatch(setVideoRealTimeData([]));
        dispatch(setDvrStorageDailyData([]));
        dispatch(setNvrStorageDailyData([]));
        dispatch(setEncoderStorageDailyData([]));
        dispatch(setServerDailyData([]));
        dispatch(setNetworkDailyData([]));
        dispatch(setFirewallDailyData([]));
        dispatch(setDatabaseDailyData([]));
        dispatch(setReportDailyData([]));
        dispatch(setOrderWeeklyData([]));

        dispatch(setVideoCheckCustomData([]));
        dispatch(setVideoCheckCustomLineData([]));
        dispatch(setVideoOfflineCustomData([]));
        dispatch(setVideoMediaLossCustomData([]));
        dispatch(setVideoLossCustomData([]));
        dispatch(setDvrStorageCustomData([]));
        dispatch(setDvrStorageCustomLineData([]));
        dispatch(setNvrStorageCustomData([]));
        dispatch(setNvrStorageCustomLineData([]));
        dispatch(setEncoderStorageCustomData([]));
        dispatch(setEncoderStorageCustomLineData([]));
        dispatch(setServerCustomData([]));
        dispatch(setServerCustomLineData([]));
        dispatch(setNetworkCustomData([]));
        dispatch(setNetworkCustomLineData([]));
        dispatch(setFirewallCustomData([]));
        dispatch(setFirewallCustomLineData([]));
        dispatch(setDatabaseCustomData([]));
        dispatch(setDatabaseCustomLineData([]));
        dispatch(setReportCustomData([]));
        dispatch(setOrderCustomData([]));
        dispatch(setOrderCustomLineData([]));
    }
}
