/**
 * 统一监控平台相关的reducer
 */
import { combineReducers } from 'redux'
import {
  SET_ERRORALARM, SET_GOODALARM, SET_WARNINGALARM, SET_LOGGOOD,
  SET_LOGERROR, SET_LOGDANGER, SET_LOGBAN, SET_FUNCTIONVALUE,
  SET_MONITORS, /*SET_CURFUNCVALNAME, SET_CURFUNCVALAVG, SET_CURFUNCVALMAX,
  SET_CURFUNCVALMIN, SET_CURFUNCVALNEW,*/ SET_FUNCVALUE, SET_CURTOWHOURNAME,
  SET_CURTOWHOURVALUE, SET_TWOHOURSREPORT, SET_MONITORTABLEDATA, SET_MONITORSSTATUS,
  SET_MONITORFILTERSTATUS, SET_GROUPID, SET_EQUIPMENTS, SET_SUBGROUPS,
  SET_STATUS, SET_GROUPINFOFILTERSTATUS, SET_MONITORTABLESELECTFIRSTFLAG, SET_SELECTEDMONITORNAME,
  SET_RESOURCESETTREE, SET_EQUIPMENTIDNTZ, SET_ALARMRULESARRAY, SET_EQUIPMENTID,
  SET_BCLICKTREENODE, SET_BCLICKDESVIEWMONITORTABLEROW, SET_GETMONITORDATAFILTER, SET_TREEIDS,
  SET_OLDTREE, SET_ASSETIDNTZ, SET_CREATERESOURCEVIEWID, SET_SELECTEDRESOURCE, SET_CREATEMONITORVIEWID, SET_SELECTEDMONITOR,
  SET_CREATERESOURCESTABLEDATA, SET_CREATEMONITORSTABLEDATA, SET_SELECTEDNODE, SET_RESOURCETYPES, SET_COMMONMONITORS,
  SET_MONITORALARMCONDITIONNAMEDATA, SET_MONITORERRORALARMTEXT, SET_MONITORWARNINGALARMTEXT, SET_MONITORGOODALARMTEXT, SET_MONITORERRORCONDITIONSDATA,
  SET_MONITORSETTINGERRORCONDITIONSDATA, SET_MONITORWARNINGCONDITIONSDATA, SET_MONITORSETTINGWARNINGCONDITIONSDATA, SET_MONITORGOODCONDITIONSDATA,
  SET_MONITORSETTINGGOODCONDITIONSDATA, SET_DELETEMONITORALARMCONDITIONSDATA, SET_EQUIPMENTSERVERADDRESS, SET_EQUIPMENTMODEL, SET_NAVIGATEFROMCREATEMONITORVIEWFLAG,
  SET_MONITORDISKS, SET_MONITORDISKIONAMES, SET_SELECTEDMONITORDISK, SET_SELECTEDMONITORDISKIONAME, SET_MONITORNETWORKS, SET_SELECTEDMONITORNETWORK, SET_MONITORPROCESSES, SET_SELECTEDMONITORPROCESS,
  SET_MONITORSERVICES, SET_SELECTEDMONITORSERVICE, SET_MONITORNTEVENTLOGS, SET_SELECTEDMONITORNTEVENTLOG, SET_MONITORSCRIPTS, SET_SELECTEDMONITORSCRIPT,
  SET_MONITORS_PROPERTY_DATA, SET_MONITORS_PROPERTY_EDIT, SET_MONITORS_MYSQL_COUNTERDATA, SET_MONITORS_MYSQL_PROPERTYCOUNTERDATA,
  SET_GETMONITORSPROPERTYDATADONEFLAG, SET_GETALARMCONDITIONDATADONEFLAG, SET_GETMYSQLMONITORCOUNTERDATADONEFLAG, SET_MONITORS_MYSQL_CURRENTCOUNTER,
  SET_MONITORSENTRYALIASDATA, SET_MONITORS_ORACLE_COUNTERDATA, SET_MONITORS_ORACLE_PROPERTYCOUNTERDATA, SET_MONITORS_ORACLE_CURRENTCOUNTER,
  SET_MONITORSCRIPTS_ENTRYALIAS, SET_MONITORSNMPMIBFILE, SET_MONITORSNMPMIBCOUNTER, SET_SELECTEDMONITORSNMPMIBCOUNTER, SET_SELECTEDMONITORMONGOQUERY
} from '../actions/equipment_action'

function errorAlarm(state = "", action) {
    switch (action.type) {
        case SET_ERRORALARM:
            return action.errorAlarm
        default:
            return state
    }
}

function goodAlarm(state = "", action) {
    switch (action.type) {
        case SET_GOODALARM:
            return action.goodAlarm
        default:
            return state
    }
}

function warningAlarm(state = "", action) {
    switch (action.type) {
        case SET_WARNINGALARM:
            return action.warningAlarm
        default:
            return state
    }
}

function logGood(state = "0", action) {
    switch (action.type) {
        case SET_LOGGOOD:
            return action.logGood
        default:
            return state
    }
}

function logError(state = "0", action) {
    switch (action.type) {
        case SET_LOGERROR:
            return action.logError
        default:
            return state
    }
}

function logDanger(state = "0", action) {
    switch (action.type) {
        case SET_LOGDANGER:
            return action.logDanger
        default:
            return state
    }
}

function logBan(state = "0", action) {
    switch (action.type) {
        case SET_LOGBAN:
            return action.logBan
        default:
            return state
    }
}

function functionValue(state = "", action) {
    switch (action.type) {
        case SET_FUNCTIONVALUE:
            return action.functionValue
        default:
            return state
    }
}

function monitors(state = [], action) {
    switch (action.type) {
        case SET_MONITORS:
            return action.monitors
        default:
            return state
    }
}

// function curFuncValName(state = "", action) {
//     switch (action.type) {
//         case SET_CURFUNCVALNAME:
//             return action.curFuncValName
//         default:
//             return state
//     }
// }
//
// function curFuncValAvg(state = 0, action) {
//     switch (action.type) {
//         case SET_CURFUNCVALAVG:
//             return action.curFuncValAvg
//         default:
//             return state
//     }
// }
//
// function curFuncValMax(state = 0, action) {
//     switch (action.type) {
//         case SET_CURFUNCVALMAX:
//             return action.curFuncValMax
//         default:
//             return state
//     }
// }
//
// function curFuncValMin(state = 0, action) {
//     switch (action.type) {
//         case SET_CURFUNCVALMIN:
//             return action.curFuncValMin
//         default:
//             return state
//     }
// }
//
// function curFuncValNew(state = 0, action) {
//     switch (action.type) {
//         case SET_CURFUNCVALNEW:
//             return action.curFuncValNew
//         default:
//             return state
//     }
// }

function funcValue(state = [], action) {
    switch (action.type) {
        case SET_FUNCVALUE:
            if(action.funcValue == null || action.funcValue.length == 0) {
                return [];
            }
            else {
                return action.funcValue
            }
        default:
            return state
    }
}

function curTowHourName(state = "", action) {
    switch (action.type) {
        case SET_CURTOWHOURNAME:
            return action.curTowHourName
        default:
            return state
    }
}

function curTowHourValue(state = [], action) {
    switch (action.type) {
        case SET_CURTOWHOURVALUE:
            return action.curTowHourValue
        default:
            return state
    }
}

function twoHoursReport(state = [], action) {
    switch (action.type) {
        case SET_TWOHOURSREPORT:
            if(action.twoHoursReport == null || action.twoHoursReport.length == 0) {
                return [];
            }
            else {
                return action.twoHoursReport
            }
        default:
            return state
    }
}

function monitorTableData(state = [], action) {
    switch (action.type) {
        case SET_MONITORTABLEDATA:
            return action.monitorTableData
        default:
            return state
    }
}

function monitorsStatus(state = [], action) {
    switch (action.type) {
        case SET_MONITORSSTATUS:
            return action.monitorsStatus
        default:
            return state
    }
}

function monitorFilterStatus(state = "all", action) {
    switch (action.type) {
        case SET_MONITORFILTERSTATUS:
            return action.monitorFilterStatus
        default:
            return state
    }
}

function groupId(state = "", action) {
    switch (action.type) {
        case SET_GROUPID:
            return action.groupId
        default:
            return state
    }
}

function equipments(state = [], action) {
    switch (action.type) {
        case SET_EQUIPMENTS:
            return action.equipments
        default:
            return state
    }
}

function subGroups(state = [], action) {
    switch (action.type) {
        case SET_SUBGROUPS:
            return action.subGroups
        default:
            return state
    }
}

function status(state = [], action) {
    switch (action.type) {
        case SET_STATUS:
            return action.status
        default:
            return state
    }
}

function groupInfoFilterStatus(state = "all", action) {
    switch (action.type) {
        case SET_GROUPINFOFILTERSTATUS:
            return action.groupInfoFilterStatus
        default:
            return state
    }
}

function monitorTableSelectFirstFlag(state = false, action) {
    switch (action.type) {
        case SET_MONITORTABLESELECTFIRSTFLAG:
            return action.monitorTableSelectFirstFlag
        default:
            return state
    }
}

function selectedMonitorName(state = "", action) {
    switch (action.type) {
        case SET_SELECTEDMONITORNAME:
            return action.selectedMonitorName
        default:
            return state
    }
}

function resourceSetTree(state = [], action) {
    switch (action.type) {
        case SET_RESOURCESETTREE:
            return action.resourceSetTree
        default:
            return state
    }
}

function equipmentIdNtz(state = "", action) {
    switch (action.type) {
        case SET_EQUIPMENTIDNTZ:
            return action.equipmentIdNtz
        default:
            return state
    }
}

function alarmRulesArray(state = [], action) {
    switch (action.type) {
        case SET_ALARMRULESARRAY:
            return action.alarmRulesArray
        default:
            return state
    }
}

function equipmentId(state = "", action) {
    switch (action.type) {
        case SET_EQUIPMENTID:
            return action.equipmentId
        default:
            return state
    }
}

function bClickTreeNode(state = false, action) {
    switch (action.type) {
        case SET_BCLICKTREENODE:
            return action.bClickTreeNode
        default:
            return state
    }
}

function bClickDesViewMonitorTableRow(state = false, action) {
    switch (action.type) {
        case SET_BCLICKDESVIEWMONITORTABLEROW:
            return action.bClickDesViewMonitorTableRow
        default:
            return state
    }
}

function getMonitorDataFilter(state = [], action) {
    switch (action.type) {
        case SET_GETMONITORDATAFILTER:
            return action.getMonitorDataFilter
        default:
            return state
    }
}

function treeIds(state = [], action) {
    switch (action.type) {
        case SET_TREEIDS:
            return action.treeIds
        default:
            return state
    }
}

function oldTree(state = [], action) {
    switch (action.type) {
        case SET_OLDTREE:
            return action.oldTree
        default:
            return state
    }
}

function assetIdNtz(state = "", action) {
    switch (action.type) {
        case SET_ASSETIDNTZ:
            return action.assetIdNtz
        default:
            return state
    }
}

function createResourceViewId(state = 0, action) {
    switch (action.type) {
        case SET_CREATERESOURCEVIEWID:
            return action.createResourceViewId
        default:
            return state
    }
}
function selectedResource(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDRESOURCE:
            return action.selectedResource
        default:
            return state
    }
}

function createMonitorViewId(state = 0, action) {
    switch (action.type) {
        case SET_CREATEMONITORVIEWID:
            return action.createMonitorViewId
        default:
            return state
    }
}
function selectedMonitor(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDMONITOR:
            return action.selectedMonitor
        default:
            return state
    }
}

function createResourcesTableData(state = [], action) {
    switch (action.type) {
        case SET_CREATERESOURCESTABLEDATA:
            return action.createResourcesTableData
        default:
            return state
    }
}

function createMonitorsTableData(state = [], action) {
    switch (action.type) {
        case SET_CREATEMONITORSTABLEDATA:
            return action.createMonitorsTableData
        default:
            return state
    }
}

function selectedNode(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDNODE:
            return action.selectedNode
        default:
            return state
    }
}

function resourceTypes(state = [], action) {
    switch (action.type) {
        case SET_RESOURCETYPES:
            return action.resourceTypes
        default:
            return state
    }
}

function commonMonitors(state = [], action) {
    switch (action.type) {
        case SET_COMMONMONITORS:
            return action.commonMonitors
        default:
            return state
    }
}

function monitorAlarmConditionNameData(state = [], action) {
    switch (action.type) {
        case SET_MONITORALARMCONDITIONNAMEDATA:
            return action.monitorAlarmConditionNameData
        default:
            return state
    }
}

function monitorErrorAlarmText(state = "", action) {
    switch (action.type) {
        case SET_MONITORERRORALARMTEXT:
            return action.monitorErrorAlarmText
        default:
            return state
    }
}

function monitorWarningAlarmText(state = "", action) {
    switch (action.type) {
        case SET_MONITORWARNINGALARMTEXT:
            return action.monitorWarningAlarmText
        default:
            return state
    }
}

function monitorGoodAlarmText(state = "", action) {
    switch (action.type) {
        case SET_MONITORGOODALARMTEXT:
            return action.monitorGoodAlarmText
        default:
            return state
    }
}

function monitorErrorConditionsData(state = [], action) {
    switch (action.type) {
        case SET_MONITORERRORCONDITIONSDATA:
            return action.monitorErrorConditionsData
        default:
            return state
    }
}

function monitorSettingErrorConditionsData(state = [], action) {
    switch (action.type) {
        case SET_MONITORSETTINGERRORCONDITIONSDATA:
            return action.monitorSettingErrorConditionsData
        default:
            return state
    }
}

function monitorWarningConditionsData(state = [], action) {
    switch (action.type) {
        case SET_MONITORWARNINGCONDITIONSDATA:
            return action.monitorWarningConditionsData
        default:
            return state
    }
}

function monitorSettingWarningConditionsData(state = [], action) {
    switch (action.type) {
        case SET_MONITORSETTINGWARNINGCONDITIONSDATA:
            return action.monitorSettingWarningConditionsData
        default:
            return state
    }
}

function monitorGoodConditionsData(state = [], action) {
    switch (action.type) {
        case SET_MONITORGOODCONDITIONSDATA:
            return action.monitorGoodConditionsData
        default:
            return state
    }
}

function monitorSettingGoodConditionsData(state = [], action) {
    switch (action.type) {
        case SET_MONITORSETTINGGOODCONDITIONSDATA:
            return action.monitorSettingGoodConditionsData
        default:
            return state
    }
}

function deleteMonitorAlarmConditionsData(state = [], action) {
    switch (action.type) {
        case SET_DELETEMONITORALARMCONDITIONSDATA:
            return action.deleteMonitorAlarmConditionsData
        default:
            return state
    }
}

function equipmentServerAddress(state = "", action) {
    switch (action.type) {
        case SET_EQUIPMENTSERVERADDRESS:
            return action.equipmentServerAddress
        default:
            return state
    }
}

function equipmentModel(state = "", action) {
    switch (action.type) {
        case SET_EQUIPMENTMODEL:
            return action.equipmentModel
        default:
            return state
    }
}

function navigateFromCreateMonitorViewFlag(state = false, action) {
    switch (action.type) {
        case SET_NAVIGATEFROMCREATEMONITORVIEWFLAG:
            return action.navigateFromCreateMonitorViewFlag
        default:
            return state
    }
}

function monitorDisks(state = [], action) {
    switch (action.type) {
        case SET_MONITORDISKS:
            return action.monitorDisks
        default:
            return state
    }
}

function monitorDiskIONames(state = [], action) {
    switch (action.type) {
        case SET_MONITORDISKIONAMES:
            return action.monitorDiskIONames
        default:
            return state
    }
}

function selectedMonitorDisk(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDMONITORDISK:
            return action.selectedMonitorDisk
        default:
            return state
    }
}

function selectedMonitorDiskIOName(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDMONITORDISKIONAME:
            return action.selectedMonitorDiskIOName
        default:
            return state
    }
}

function monitorNetworks(state = [], action) {
    switch (action.type) {
        case SET_MONITORNETWORKS:
            return action.monitorNetworks
        default:
            return state
    }
}

function selectedMonitorNetwork(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDMONITORNETWORK:
            return action.selectedMonitorNetwork
        default:
            return state
    }
}

function monitorProcesses(state = [], action) {
    switch (action.type) {
        case SET_MONITORPROCESSES:
            return action.monitorProcesses
        default:
            return state
    }
}

function selectedMonitorProcess(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDMONITORPROCESS:
            return action.selectedMonitorProcess
        default:
            return state
    }
}

function monitorServices(state = [], action) {
    switch (action.type) {
        case SET_MONITORSERVICES:
            return action.monitorServices
        default:
            return state
    }
}

function selectedMonitorService(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDMONITORSERVICE:
            return action.selectedMonitorService
        default:
            return state
    }
}

function monitorNTEventLogs(state = [], action) {
    switch (action.type) {
        case SET_MONITORNTEVENTLOGS:
            return action.monitorNTEventLogs
        default:
            return state
    }
}

function selectedMonitorNTEventLog(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDMONITORNTEVENTLOG:
            return action.selectedMonitorNTEventLog
        default:
            return state
    }
}

function monitorScripts(state = [], action) {
    switch (action.type) {
        case SET_MONITORSCRIPTS:
            return action.monitorScripts
        default:
            return state
    }
}

function selectedMonitorScript(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDMONITORSCRIPT:
            return action.selectedMonitorScript
        default:
            return state
    }
}

function getMonitorsPropertyDataDoneFlag(state = false, action) {
    switch (action.type) {
        case SET_GETMONITORSPROPERTYDATADONEFLAG:
            return action.getMonitorsPropertyDataDoneFlag
        default:
            return state
    }
}

function getAlarmConditionDataDoneFlag(state = false, action) {
    switch (action.type) {
        case SET_GETALARMCONDITIONDATADONEFLAG:
            return action.getAlarmConditionDataDoneFlag
        default:
            return state
    }
}

function getMySqlMonitorCounterDataDoneFlag(state = false, action) {
    switch (action.type) {
        case SET_GETMYSQLMONITORCOUNTERDATADONEFLAG:
            return action.getMySqlMonitorCounterDataDoneFlag
        default:
            return state
    }
}

function isShowTree(state = true ,action){
  switch (action.type) {
      case "ISSHOWTREE":
        return action.data;
      default:
        return state
  }
}

function getOldTree(state = [], action) {
    switch (action.type) {
        case "GETOLDRESOURCETREENODE":
            return action.checkedNodes
        default:
            return state
    }
};

//监测器属性数据
function monitorsPropertyData(state = null, action) {
    switch (action.type) {
        case "SET_MONITORS_PROPERTY_DATA":
            return action.monitorsPropertyData
        default:
            return state
    }
};


//设置监测器属性编辑状态，true 是编辑监测器 false 是增加监测器
function monitorsPropertyEdit(state = false, action) {
    switch (action.type) {
        case "SET_MONITORS_PROPERTY_EDIT":
            return action.monitorsPropertyEdit
        default:
            return state
    }
};

//MySQL监测器:计数器 所有可选择项数据
function mySqlCounterData(state = [], action) {
    switch (action.type) {
        case "SET_MONITORS_MYSQL_COUNTERDATA":
            return action.mySqlCounterData
        default:
            return state
    }
};

//MySQL监测器:计数器 属性数据
function mySqlMonitorsPropertyCounterData(state = [], action) {
    switch (action.type) {
        case "SET_MONITORS_MYSQL_PROPERTYCOUNTERDATA":
            return action.mySqlMonitorsPropertyCounterData
        default:
            return state
    }
};

//MySQL监测器:计数器 当前选择项的数据
function mySqlCurrentCounterData(state = [], action) {
    switch (action.type) {
        case "SET_MONITORS_MYSQL_CURRENTCOUNTER":
            return action.mySqlCurrentCounterData
        default:
            return state
    }
};

//Oracle监测器:计数器 所有可选择项数据
function OracleCounterData(state = [], action) {
    switch (action.type) {
        case "SET_MONITORS_ORACLE_COUNTERDATA":
            return action.OracleCounterData
        default:
            return state
    }
};

//Oracle监测器:计数器 属性数据
function OracleMonitorsPropertyCounterData(state = [], action) {
    switch (action.type) {
        case "SET_MONITORS_ORACLE_PROPERTYCOUNTERDATA":
            return action.OracleMonitorsPropertyCounterData
        default:
            return state
    }
};

//Oracle监测器:计数器 当前选择项的数据
function OracleCurrentCounterData(state = [], action) {
    switch (action.type) {
        case "SET_MONITORS_ORACLE_CURRENTCOUNTER":
            return action.OracleCurrentCounterData
        default:
            return state
    }
};

function monitorScriptsEntryAlias(state = [], action) {
    switch (action.type) {
        case "SET_MONITORSCRIPTS_ENTRYALIAS":
            return action.monitorScriptsEntryAlias
        default:
            return state
    }
};

function monitorSnmpMIBFile(state = [], action) {
    switch (action.type) {
        case "SET_MONITORSNMPMIBFILE":
            return action.monitorSnmpMIBFile
        default:
            return state
    }
};

function monitorSnmpMIBCounter(state = [], action) {
    switch (action.type) {
        case "SET_MONITORSNMPMIBCOUNTER":
            return action.monitorSnmpMIBCounter
        default:
            return state
    }
};

function selectedMonitorSnmpMIBCounter(state = null, action) {
    switch (action.type) {
        case "SET_SELECTEDMONITORSNMPMIBCOUNTER":
            return action.selectedMonitorSnmpMIBCounter
        default:
            return state
    }
};

function selectedMonitorMongoQuery(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDMONITORMONGOQUERY:
            return action.selectedMonitorMongoQuery
        default:
            return state
    }
};

const equipmentReducer = combineReducers({
    errorAlarm,
    goodAlarm,
    warningAlarm,
    logGood,
    logError,
    logDanger,
    logBan,
    functionValue,
    monitors,
    /*curFuncValName,
    curFuncValAvg,
    curFuncValMax,
    curFuncValMin,
    curFuncValNew,*/
    funcValue,
    curTowHourName,
    curTowHourValue,
    twoHoursReport,
    monitorTableData,
    monitorsStatus,
    monitorFilterStatus,
    groupId,
    equipments,
    subGroups,
    status,
    groupInfoFilterStatus,
    monitorTableSelectFirstFlag,
    selectedMonitorName,
    resourceSetTree,
    equipmentIdNtz,
    alarmRulesArray,
    equipmentId,
    bClickTreeNode,
    bClickDesViewMonitorTableRow,
    getMonitorDataFilter,
    treeIds,
    oldTree,
    assetIdNtz,
    createResourceViewId,
    selectedResource,
    createMonitorViewId,
    selectedMonitor,
    createResourcesTableData,
    createMonitorsTableData,
    selectedNode,
    resourceTypes,
    commonMonitors,
    monitorAlarmConditionNameData,
    monitorErrorAlarmText,
    monitorWarningAlarmText,
    monitorGoodAlarmText,
    monitorErrorConditionsData,
    monitorSettingErrorConditionsData,
    monitorWarningConditionsData,
    monitorSettingWarningConditionsData,
    monitorGoodConditionsData,
    monitorSettingGoodConditionsData,
    deleteMonitorAlarmConditionsData,
    equipmentServerAddress,
    equipmentModel,
    navigateFromCreateMonitorViewFlag,
    monitorDisks,
    monitorDiskIONames,
    selectedMonitorDisk,
    selectedMonitorDiskIOName,
    monitorNetworks,
    selectedMonitorNetwork,
    monitorProcesses,
    selectedMonitorProcess,
    monitorServices,
    selectedMonitorService,
    monitorNTEventLogs,
    selectedMonitorNTEventLog,
    monitorScripts,
    selectedMonitorScript,
    getMonitorsPropertyDataDoneFlag,
    getAlarmConditionDataDoneFlag,
    getMySqlMonitorCounterDataDoneFlag,
    isShowTree,
    getOldTree,
    monitorsPropertyData,
    monitorsPropertyEdit,
    mySqlCounterData,
    mySqlMonitorsPropertyCounterData,
    mySqlCurrentCounterData,
    OracleCounterData,
    OracleMonitorsPropertyCounterData,
    OracleCurrentCounterData,
    monitorScriptsEntryAlias,
    monitorSnmpMIBFile,
    monitorSnmpMIBCounter,
    selectedMonitorSnmpMIBCounter,
    selectedMonitorMongoQuery
})

export default equipmentReducer
