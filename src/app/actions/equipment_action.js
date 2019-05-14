/**
 * 统一监控平台相关action
 */
var oData = require('../server/odataEquipment');
var TreeUtil = require('../views/itoss/component/equipmentManage/setting/treeUtil');
import * as createMonitorModalTexts from '../views/itoss/component/equipmentManage/createMonitorModal_i18n_zh'
import * as requestDataActions from './requestData_action'

export const SET_ERRORALARM = 'SET_ERRORALARM'
export const SET_GOODALARM = 'SET_GOODALARM'
export const SET_WARNINGALARM = 'SET_WARNINGALARM'
export const SET_LOGGOOD = 'SET_LOGGOOD'
export const SET_LOGERROR = 'SET_LOGERROR'
export const SET_LOGDANGER = 'SET_LOGDANGER'
export const SET_LOGBAN = 'SET_LOGBAN'
export const SET_FUNCTIONVALUE = 'SET_FUNCTIONVALUE'
export const SET_MONITORS = 'SET_MONITORS'
// export const SET_CURFUNCVALNAME = 'SET_CURFUNCVALNAME'
// export const SET_CURFUNCVALAVG = 'SET_CURFUNCVALAVG'
// export const SET_CURFUNCVALMAX = 'SET_CURFUNCVALMAX'
// export const SET_CURFUNCVALMIN = 'SET_CURFUNCVALMIN'
// export const SET_CURFUNCVALNEW = 'SET_CURFUNCVALNEW'
export const SET_FUNCVALUE = 'SET_FUNCVALUE'
export const SET_CURTOWHOURNAME = 'SET_CURTOWHOURNAME'
export const SET_CURTOWHOURVALUE = 'SET_CURTOWHOURVALUE'
export const SET_TWOHOURSREPORT = 'SET_TWOHOURSREPORT'
export const SET_MONITORTABLEDATA = 'SET_MONITORTABLEDATA'
export const SET_MONITORSSTATUS = 'SET_MONITORSSTATUS'
export const SET_MONITORFILTERSTATUS = 'SET_MONITORFILTERSTATUS'
export const SET_GROUPID = 'SET_GROUPID'
export const SET_EQUIPMENTS = 'SET_EQUIPMENTS'
export const SET_SUBGROUPS = 'SET_SUBGROUPS'
export const SET_STATUS = 'SET_STATUS'
export const SET_GROUPINFOFILTERSTATUS = 'SET_GROUPINFOFILTERSTATUS'
export const SET_MONITORTABLESELECTFIRSTFLAG = 'SET_MONITORTABLESELECTFIRSTFLAG'
export const SET_SELECTEDMONITORNAME = 'SET_SELECTEDMONITORNAME'
export const SET_RESOURCESETTREE = 'SET_RESOURCESETTREE'
export const SET_EQUIPMENTIDNTZ = 'SET_EQUIPMENTIDNTZ'
export const SET_ALARMRULESARRAY = 'SET_ALARMRULESARRAY'
export const SET_EQUIPMENTID = 'SET_EQUIPMENTID'
export const SET_BCLICKTREENODE = 'SET_BCLICKTREENODE'
export const SET_BCLICKDESVIEWMONITORTABLEROW = 'SET_BCLICKDESVIEWMONITORTABLEROW'
export const SET_GETMONITORDATAFILTER = 'SET_GETMONITORDATAFILTER'
export const SET_TREEIDS = 'SET_TREEIDS'
export const SET_OLDTREE = 'SET_OLDTREE'
export const SET_ASSETIDNTZ = 'SET_ASSETIDNTZ'
export const SET_CREATERESOURCEVIEWID = 'SET_CREATERESOURCEVIEWID'
export const SET_SELECTEDRESOURCE = 'SET_SELECTEDRESOURCE'
export const SET_CREATEMONITORVIEWID = 'SET_CREATEMONITORVIEWID'
export const SET_SELECTEDMONITOR = 'SET_SELECTEDMONITOR'
export const SET_CREATERESOURCESTABLEDATA = 'SET_CREATERESOURCESTABLEDATA'
export const SET_CREATEMONITORSTABLEDATA = 'SET_CREATEMONITORSTABLEDATA'
export const SET_SELECTEDNODE = 'SET_SELECTEDNODE'
export const SET_RESOURCETYPES = 'SET_RESOURCETYPES'
export const SET_COMMONMONITORS = 'SET_COMMONMONITORS'
export const SET_MONITORALARMCONDITIONNAMEDATA = 'SET_MONITORALARMCONDITIONNAMEDATA'
export const SET_MONITORERRORALARMTEXT = 'SET_MONITORERRORALARMTEXT'
export const SET_MONITORWARNINGALARMTEXT = 'SET_MONITORWARNINGALARMTEXT'
export const SET_MONITORGOODALARMTEXT = 'SET_MONITORGOODALARMTEXT'
export const SET_MONITORERRORCONDITIONSDATA = 'SET_MONITORERRORCONDITIONSDATA'
export const SET_MONITORSETTINGERRORCONDITIONSDATA = 'SET_MONITORSETTINGERRORCONDITIONSDATA'
export const SET_MONITORWARNINGCONDITIONSDATA = 'SET_MONITORWARNINGCONDITIONSDATA'
export const SET_MONITORSETTINGWARNINGCONDITIONSDATA = 'SET_MONITORSETTINGWARNINGCONDITIONSDATA'
export const SET_MONITORGOODCONDITIONSDATA = 'SET_MONITORGOODCONDITIONSDATA'
export const SET_MONITORSETTINGGOODCONDITIONSDATA = 'SET_MONITORSETTINGGOODCONDITIONSDATA'
export const SET_DELETEMONITORALARMCONDITIONSDATA = 'SET_DELETEMONITORALARMCONDITIONSDATA'
export const SET_EQUIPMENTSERVERADDRESS = 'SET_EQUIPMENTSERVERADDRESS'
export const SET_EQUIPMENTMODEL = 'SET_EQUIPMENTMODEL'
export const SET_NAVIGATEFROMCREATEMONITORVIEWFLAG = 'SET_NAVIGATEFROMCREATEMONITORVIEWFLAG'
export const SET_MONITORDISKS = 'SET_MONITORDISKS'
export const SET_MONITORDISKIONAMES = 'SET_MONITORDISKIONAMES'
export const SET_SELECTEDMONITORDISK = 'SET_SELECTEDMONITORDISK'
export const SET_SELECTEDMONITORDISKIONAME = 'SET_SELECTEDMONITORDISKIONAME'
export const SET_MONITORNETWORKS = 'SET_MONITORNETWORKS'
export const SET_SELECTEDMONITORNETWORK = 'SET_SELECTEDMONITORNETWORK'
export const SET_MONITORPROCESSES = 'SET_MONITORPROCESSES'
export const SET_SELECTEDMONITORPROCESS = 'SET_SELECTEDMONITORPROCESS'
export const SET_MONITORSERVICES = 'SET_MONITORSERVICES'
export const SET_SELECTEDMONITORSERVICE = 'SET_SELECTEDMONITORSERVICE'
export const SET_MONITORNTEVENTLOGS = 'SET_MONITORNTEVENTLOGS'
export const SET_SELECTEDMONITORNTEVENTLOG = 'SET_SELECTEDMONITORNTEVENTLOG'
export const SET_MONITORSCRIPTS = 'SET_MONITORSCRIPTS'
export const SET_SELECTEDMONITORSCRIPT = 'SET_SELECTEDMONITORSCRIPT'
export const SET_GETMONITORSPROPERTYDATADONEFLAG = 'SET_GETMONITORSPROPERTYDATADONEFLAG'
export const SET_GETALARMCONDITIONDATADONEFLAG = 'SET_GETALARMCONDITIONDATADONEFLAG'
export const SET_GETMYSQLMONITORCOUNTERDATADONEFLAG = 'SET_GETMYSQLMONITORCOUNTERDATADONEFLAG'
export const SET_MONITORS_PROPERTY_DATA = 'SET_MONITORS_PROPERTY_DATA'
export const SET_MONITORS_PROPERTY_EDIT = 'SET_MONITORS_PROPERTY_EDIT'
export const SET_MONITORS_MYSQL_COUNTERDATA = 'SET_MONITORS_MYSQL_COUNTERDATA'
export const SET_MONITORS_MYSQL_PROPERTYCOUNTERDATA = 'SET_MONITORS_MYSQL_PROPERTYCOUNTERDATA'
export const SET_MONITORS_MYSQL_CURRENTCOUNTER = 'SET_MONITORS_MYSQL_CURRENTCOUNTER'
export const SET_MONITORSCRIPTS_ENTRYALIAS= 'SET_MONITORSCRIPTS_ENTRYALIAS'

export const SET_MONITORS_ORACLE_COUNTERDATA = 'SET_MONITORS_ORACLE_COUNTERDATA'
export const SET_MONITORS_ORACLE_PROPERTYCOUNTERDATA = 'SET_MONITORS_ORACLE_PROPERTYCOUNTERDATA'
export const SET_MONITORS_ORACLE_CURRENTCOUNTER = 'SET_MONITORS_ORACLE_CURRENTCOUNTER'
export const SET_GETOracleMONITORCOUNTERDATADONEFLAG = 'SET_GETOracleMONITORCOUNTERDATADONEFLAG'

export const SET_MONITORSNMPMIBFILE= 'SET_MONITORSNMPMIBFILE'
export const SET_SELECTEDMONITORSNMPMIBCOUNTER= 'SET_SELECTEDMONITORSNMPMIBCOUNTER'
export const SET_MONITORSNMPMIBCOUNTER= 'SET_MONITORSNMPMIBCOUNTER'
export const SET_SELECTEDMONITORMONGOQUERY= 'SET_SELECTEDMONITORMONGOQUERY'


export function setErrorAlarm(errorAlarm) {
    return {
        type: SET_ERRORALARM,
        errorAlarm
    }
}

export function setGoodAlarm(goodAlarm) {
    return {
        type: SET_GOODALARM,
        goodAlarm
    }
}

export function setWarningAlarm(warningAlarm) {
    return {
        type: SET_WARNINGALARM,
        warningAlarm
    }
}

export function setLogGood(logGood) {
    return {
        type: SET_LOGGOOD,
        logGood
    }
}

export function setLogError(logError) {
    return {
        type: SET_LOGERROR,
        logError
    }
}

export function setLogDanger(logDanger) {
    return {
        type: SET_LOGDANGER,
        logDanger
    }
}

export function setLogBan(logBan) {
    return {
        type: SET_LOGBAN,
        logBan
    }
}

export function setFunctionValue(functionValue) {
    return {
        type: SET_FUNCTIONVALUE,
        functionValue
    }
}

export function setMonitors(monitors) {
    return {
        type: SET_MONITORS,
        monitors
    }
}

// export function setCurFuncValName(curFuncValName) {
//     return {
//         type: SET_CURFUNCVALNAME,
//         curFuncValName
//     }
// }
//
// export function setCurFuncValAvg(curFuncValAvg) {
//     return {
//         type: SET_CURFUNCVALAVG,
//         curFuncValAvg
//     }
// }
//
// export function setCurFuncValMax(curFuncValMax) {
//     return {
//         type: SET_CURFUNCVALMAX,
//         curFuncValMax
//     }
// }
//
// export function setCurFuncValMin(curFuncValMin) {
//     return {
//         type: SET_CURFUNCVALMIN,
//         curFuncValMin
//     }
// }
//
// export function setCurFuncValNew(curFuncValNew) {
//     return {
//         type: SET_CURFUNCVALNEW,
//         curFuncValNew
//     }
// }

export function setFuncValue(funcValue) {
    return {
        type: SET_FUNCVALUE,
        funcValue
    }
}

export function setCurTowHourName(curTowHourName) {
    return {
        type: SET_CURTOWHOURNAME,
        curTowHourName
    }
}

export function setCurTowHourValue(curTowHourValue) {
    return {
        type: SET_CURTOWHOURVALUE,
        curTowHourValue
    }
}

export function setTwoHoursReport(twoHoursReport) {
    return {
        type: SET_TWOHOURSREPORT,
        twoHoursReport
    }
}

export function setMonitorTableData(monitorTableData) {
    return {
        type: SET_MONITORTABLEDATA,
        monitorTableData
    }
}

export function setMonitorsStatus(monitorsStatus) {
    return {
        type: SET_MONITORSSTATUS,
        monitorsStatus
    }
}

export function setMonitorFilterStatus(monitorFilterStatus) {
    return {
        type: SET_MONITORFILTERSTATUS,
        monitorFilterStatus
    }
}

export function setGroupId(groupId) {
    return {
        type: SET_GROUPID,
        groupId
    }
}

export function setEquipments(equipments) {
    return {
        type: SET_EQUIPMENTS,
        equipments
    }
}

export function setSubGroups(subGroups) {
    return {
        type: SET_SUBGROUPS,
        subGroups
    }
}

export function setStatus(status) {
    return {
        type: SET_STATUS,
        status
    }
}

export function setGroupInfoFilterStatus(groupInfoFilterStatus) {
    return {
        type: SET_GROUPINFOFILTERSTATUS,
        groupInfoFilterStatus
    }
}

export function setMonitorTableSelectFirstFlag(monitorTableSelectFirstFlag) {
    return {
        type: SET_MONITORTABLESELECTFIRSTFLAG,
        monitorTableSelectFirstFlag
    }
}

export function setSelectedMonitorName(selectedMonitorName) {
    return {
        type: SET_SELECTEDMONITORNAME,
        selectedMonitorName
    }
}

export function setResourceSetTree(resourceSetTree) {
    return {
        type: SET_RESOURCESETTREE,
        resourceSetTree
    }
}

export function setEquipmentIdNtz(equipmentIdNtz) {
    return {
        type: SET_EQUIPMENTIDNTZ,
        equipmentIdNtz
    }
}

export function setAlarmRulesArray(alarmRulesArray) {
    return {
        type: SET_ALARMRULESARRAY,
        alarmRulesArray
    }
}

export function setEquipmentId(equipmentId) {
    return {
        type: SET_EQUIPMENTID,
        equipmentId
    }
}

export function setbClickTreeNode(bClickTreeNode) {
    return {
        type: SET_BCLICKTREENODE,
        bClickTreeNode
    }
}

export function setbClickDesViewMonitorTableRow(bClickDesViewMonitorTableRow) {
    return {
        type: SET_BCLICKDESVIEWMONITORTABLEROW,
        bClickDesViewMonitorTableRow
    }
}

export function setGetMonitorDataFilter(getMonitorDataFilter) {
    return {
        type: SET_GETMONITORDATAFILTER,
        getMonitorDataFilter
    }
}

export function setTreeIds(treeIds) {
    return {
        type: SET_TREEIDS,
        treeIds
    }
}

export function setOldTree(oldTree) {
    return {
        type: SET_OLDTREE,
        oldTree
    }
}

export function setAssetIdNtz(assetIdNtz) {
    return {
        type: SET_ASSETIDNTZ,
        assetIdNtz
    }
}

// export function setCreateResourceViewId(createResourceViewId) {
//     return {
//         type: SET_CREATERESOURCEVIEWID,
//         createResourceViewId
//     }
// }
export function setSelectedResource(selectedResource) {
    return {
        type: SET_SELECTEDRESOURCE,
        selectedResource
    }
}

export function setCreateMonitorViewId(createMonitorViewId) {
    return {
        type: SET_CREATEMONITORVIEWID,
        createMonitorViewId
    }
}
export function setSelectedMonitor(selectedMonitor) {
    return {
        type: SET_SELECTEDMONITOR,
        selectedMonitor
    }
}

export function setCreateResourcesTableData(createResourcesTableData) {
    return {
        type: SET_CREATERESOURCESTABLEDATA,
        createResourcesTableData
    }
}

export function setCreateMonitorsTableData(createMonitorsTableData) {
    return {
        type: SET_CREATEMONITORSTABLEDATA,
        createMonitorsTableData
    }
}

export function setSelectedNode(selectedNode) {
    return {
        type: SET_SELECTEDNODE,
        selectedNode
    }
}

export function setResourceTypes(resourceTypes) {
    return {
        type: SET_RESOURCETYPES,
        resourceTypes
    }
}

export function setCommonMonitors(commonMonitors) {
    return {
        type: SET_COMMONMONITORS,
        commonMonitors
    }
}

export function setMonitorAlarmConditionNameData(monitorAlarmConditionNameData) {
    return {
        type: SET_MONITORALARMCONDITIONNAMEDATA,
        monitorAlarmConditionNameData
    }
}

export function setMonitorErrorAlarmText(monitorErrorAlarmText) {
    return {
        type: SET_MONITORERRORALARMTEXT,
        monitorErrorAlarmText
    }
}

export function setMonitorWarningAlarmText(monitorWarningAlarmText) {
    return {
        type: SET_MONITORWARNINGALARMTEXT,
        monitorWarningAlarmText
    }
}

export function setMonitorGoodAlarmText(monitorGoodAlarmText) {
    return {
        type: SET_MONITORGOODALARMTEXT,
        monitorGoodAlarmText
    }
}

export function setMonitorErrorConditionsData(monitorErrorConditionsData) {
    return {
        type: SET_MONITORERRORCONDITIONSDATA,
        monitorErrorConditionsData
    }
}

export function setMonitorSettingErrorConditionsData(monitorSettingErrorConditionsData) {
    return {
        type: SET_MONITORSETTINGERRORCONDITIONSDATA,
        monitorSettingErrorConditionsData
    }
}

export function setMonitorWarningConditionsData(monitorWarningConditionsData) {
    return {
        type: SET_MONITORWARNINGCONDITIONSDATA,
        monitorWarningConditionsData
    }
}

export function setMonitorSettingWarningConditionsData(monitorSettingWarningConditionsData) {
    return {
        type: SET_MONITORSETTINGWARNINGCONDITIONSDATA,
        monitorSettingWarningConditionsData
    }
}

export function setMonitorGoodConditionsData(monitorGoodConditionsData) {
    return {
        type: SET_MONITORGOODCONDITIONSDATA,
        monitorGoodConditionsData
    }
}

export function setMonitorSettingGoodConditionsData(monitorSettingGoodConditionsData) {
    return {
        type: SET_MONITORSETTINGGOODCONDITIONSDATA,
        monitorSettingGoodConditionsData
    }
}

export function setDeleteMonitorAlarmConditionsData(deleteMonitorAlarmConditionsData) {
    return {
        type: SET_DELETEMONITORALARMCONDITIONSDATA,
        deleteMonitorAlarmConditionsData
    }
}

export function setEquipmentServerAddress(equipmentServerAddress) {
    return {
        type: SET_EQUIPMENTSERVERADDRESS,
        equipmentServerAddress
    }
}

export function setEquipmentModel(equipmentModel) {
    return {
        type: SET_EQUIPMENTMODEL,
        equipmentModel
    }
}

export function setNavigateFromCreateMonitorViewFlag(navigateFromCreateMonitorViewFlag) {
    return {
        type: SET_NAVIGATEFROMCREATEMONITORVIEWFLAG,
        navigateFromCreateMonitorViewFlag
    }
}

export function setMonitorDisks(monitorDisks) {
    return {
        type: SET_MONITORDISKS,
        monitorDisks
    }
}
export function setMonitorDiskIONames(monitorDiskIONames) {
    return {
        type: SET_MONITORDISKIONAMES,
        monitorDiskIONames
    }
}

export function setSelectedMonitorDisk(selectedMonitorDisk) {
    return {
        type: SET_SELECTEDMONITORDISK,
        selectedMonitorDisk
    }
}

export function setSelectedMonitorDiskIOName(selectedMonitorDiskIOName) {
    return {
        type: SET_SELECTEDMONITORDISKIONAME,
        selectedMonitorDiskIOName
    }
}

export function setMonitorNetworks(monitorNetworks) {
    return {
        type: SET_MONITORNETWORKS,
        monitorNetworks
    }
}

export function setSelectedMonitorNetwork(selectedMonitorNetwork) {
    return {
        type: SET_SELECTEDMONITORNETWORK,
        selectedMonitorNetwork
    }
}

export function setMonitorProcesses(monitorProcesses) {
    return {
        type: SET_MONITORPROCESSES,
        monitorProcesses
    }
}

export function setSelectedMonitorProcess(selectedMonitorProcess) {
    return {
        type: SET_SELECTEDMONITORPROCESS,
        selectedMonitorProcess
    }
}

export function setMonitorServices(monitorServices) {
    return {
        type: SET_MONITORSERVICES,
        monitorServices
    }
}

export function setSelectedMonitorService(selectedMonitorService) {
    return {
        type: SET_SELECTEDMONITORSERVICE,
        selectedMonitorService
    }
}

export function setMonitorNTEventLogs(monitorNTEventLogs) {
    return {
        type: SET_MONITORNTEVENTLOGS,
        monitorNTEventLogs
    }
}

export function setSelectedMonitorNTEventLog(selectedMonitorNTEventLog) {
    return {
        type: SET_SELECTEDMONITORNTEVENTLOG,
        selectedMonitorNTEventLog
    }
}

export function setMonitorScripts(monitorScripts) {
    return {
        type: SET_MONITORSCRIPTS,
        monitorScripts
    }
}

export function setMonitorScriptsEntryAlias(monitorScriptsEntryAlias) {
    return {
        type: SET_MONITORSCRIPTS_ENTRYALIAS,
        monitorScriptsEntryAlias
    }
}

export function setSelectedMonitorScript(selectedMonitorScript) {
    return {
        type: SET_SELECTEDMONITORSCRIPT,
        selectedMonitorScript
    }
}


export function setGetMonitorsPropertyDataDoneFlag(getMonitorsPropertyDataDoneFlag) {
    return {
        type: SET_GETMONITORSPROPERTYDATADONEFLAG,
        getMonitorsPropertyDataDoneFlag
    }
}
export function setGetAlarmConditionDataDoneFlag(getAlarmConditionDataDoneFlag) {
    return {
        type: SET_GETALARMCONDITIONDATADONEFLAG,
        getAlarmConditionDataDoneFlag
    }
}

export function setGetMySqlMonitorCounterDataDoneFlag(getMySqlMonitorCounterDataDoneFlag) {
    return {
        type: SET_GETMYSQLMONITORCOUNTERDATADONEFLAG,
        getMySqlMonitorCounterDataDoneFlag
    }
}

export function setGetOracleMonitorCounterDataDoneFlag(getOracleMonitorCounterDataDoneFlag) {
    return {
        type: SET_GETOracleMONITORCOUNTERDATADONEFLAG,
        getOracleMonitorCounterDataDoneFlag
    }
}

//监测器属性数据
export function setMonitorsPropertyData(monitorsPropertyData) {
    return {
        type: SET_MONITORS_PROPERTY_DATA,
        monitorsPropertyData
    }
}

//设置监测器属性编辑状态，true 是编辑监测器 false 是增加监测器
export function setMonitorsPropertyEdit(monitorsPropertyEdit) {
    return {
        type: SET_MONITORS_PROPERTY_EDIT,
        monitorsPropertyEdit
    }
}

//MySQL监测器:计数器 所有可选择项数据
export function setMySqlMonitorCounterData(mySqlCounterData) {
    return {
        type: SET_MONITORS_MYSQL_COUNTERDATA,
        mySqlCounterData
    }
}

//MySQL监测器:计数器 属性数据
export function setMySqlMonitorPropertyCounterData(mySqlMonitorsPropertyCounterData) {
    return {
        type: SET_MONITORS_MYSQL_PROPERTYCOUNTERDATA,
        mySqlMonitorsPropertyCounterData
    }
}

//MySQL监测器:计数器 当前选择项数据
export function setMySqlMonitorCurrentCounterData(mySqlCurrentCounterData) {
    return {
        type: SET_MONITORS_MYSQL_CURRENTCOUNTER,
        mySqlCurrentCounterData
    }
}

//Oracle监测器:计数器 所有可选择项数据
export function setOracleMonitorCounterData(OracleCounterData) {
    return {
        type: SET_MONITORS_ORACLE_COUNTERDATA,
        OracleCounterData
    }
}

//Oracle监测器:计数器 属性数据
export function setOracleMonitorPropertyCounterData(OracleMonitorsPropertyCounterData) {
    return {
        type: SET_MONITORS_ORACLE_PROPERTYCOUNTERDATA,
        OracleMonitorsPropertyCounterData
    }
}

//Oracle监测器:计数器 当前选择项数据
export function setOracleMonitorCurrentCounterData(OracleCurrentCounterData) {
    return {
        type: SET_MONITORS_ORACLE_CURRENTCOUNTER,
        OracleCurrentCounterData
    }
}

export function setMonitorSnmpMIBFile(monitorSnmpMIBFile) {
    return {
        type: SET_MONITORSNMPMIBFILE,
        monitorSnmpMIBFile
    }
}

export function setMonitorSnmpMIBCounter(monitorSnmpMIBCounter) {
    return {
        type: SET_MONITORSNMPMIBCOUNTER,
        monitorSnmpMIBCounter
    }
}

export function setSelectedMonitorSnmpMIBCounter(selectedMonitorSnmpMIBCounter) {
    return {
        type: SET_SELECTEDMONITORSNMPMIBCOUNTER,
        selectedMonitorSnmpMIBCounter
    }
}

export function setSelectedMonitorMongoQuery(selectedMonitorMongoQuery) {
    return {
        type: SET_SELECTEDMONITORMONGOQUERY,
        selectedMonitorMongoQuery
    }
}

function receiveGetResourceSetTree(data) {
    return (dispatch, getState) => {
        if(data.results.length == 0) {
            dispatch(requestDataActions.setRequestFail());
            return;
        }
        var state = getState();
        var resultData = $.parseJSON(data.results[0].TREEDATA);
        var alarmRulesData = [];
        alarmRulesData.push({id:"12341234",name: "无"});
        // alarmRulesData.concat($.parseJSON(data.results[0].ALARMCONFIG));
        var aD = $.parseJSON(data.results[0].ALARMCONFIG);
        for(var i = 0; i < aD.length; i++){
          alarmRulesData.push(aD[i]);
        }
        if(resultData instanceof Array && resultData.length > 0){
          var newData =[];
          var rSetNewData = [];
          rSetNewData.push({
            bid: "",
            icon: "",
            id: "se",
            name:"监测树",
            open: true,
            parent: false,
            pId: "0",
            type: "all"
          });
          for(var i=0;i< resultData.length;i++){
            var nData = {};
            if(resultData[i].status){
              nData  ={
                alarmconfig:resultData[i].alarmconfig,
                alarmname:resultData[i].alarmname,
                bid: resultData[i].bid,
                icon: resultData[i].icon,
                id: resultData[i].id,
                name:resultData[i].name,
                pId: resultData[i].pid,
                status:resultData[i].status,
                title:resultData[i].title,
                type: resultData[i].type
              };
            }else{
              nData  ={
                    bid: resultData[i].bid,
                    icon: resultData[i].icon,
                    id: resultData[i].id,
                    name:resultData[i].name,
                    open:resultData[i].open,
                    parent: resultData[i].parent,
                    pId: resultData[i].pid,
                    type: resultData[i].type
                  }
            }
            rSetNewData.push(nData);
          }

          var oldTreeList = [];
        //   oldTreeList = this.oldTree;
          oldTreeList = state.equipmentReducer.getOldTree;
          if(oldTreeList.length > 0 ){
            for(var i =0;i <rSetNewData.length;i++){
              for(var j=0;j < oldTreeList.length;j++){
                if(rSetNewData[i].id == oldTreeList[j].id){
                  rSetNewData[i].open =oldTreeList[j].open;
                }
              }
            }
            // TreeUtil.treeConfig("monitortree",rSetNewData);
            // TreeUtil.setTreeNode(this.treeIds);
            // TreeUtil.setTreeNode(state.equipmentReducer.treeIds);
            // $('#monitorTable').bootstrapTable('refreshOptions', {data: TreeUtil.monitortreeF()});
            dispatch(setAlarmRulesArray(alarmRulesData));
            dispatch(setResourceSetTree(rSetNewData));
            dispatch(isShowTree(true));
          }else{
            dispatch(setAlarmRulesArray(alarmRulesData));
            dispatch(setResourceSetTree(rSetNewData));
          }

        //   this.alarmRulesArray = alarmRulesData;
        //   this.resourceSetTree = rSetNewData;

        //   this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
        }
    }
}

function oDataGetResourceSetTree() {
    return dispatch => {
		oData.getResourceSetTree(data => dispatch(receiveGetResourceSetTree(data)));
    }
}

export function getResourceSetTree() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetResourceSetTree());
    }
}

function showDialog(title,content) {
    setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = title;
          document.getElementById('publicMessageModalcontent').innerHTML = content;
          $('#publicMessageModal').modal('show');
        },100);
}

function receiveSetEquipment(obj, code, data) {
    return dispatch => {
        if(code == "ok"){
          for(var i=0;i < obj.length;i++){
            if(obj[i].key == "USERNAME"){
              showDialog("基础设置","修改成功。");
            }else if(obj[i].key == "COMMUNITY"){
              showDialog("共同体","修改成功。");
            }else if(obj[i].key == "ALARM_RULE"){
              showDialog("报警规则","修改成功。");
              dispatch(getResourceSetTree());
              //refresh left tree
              // $.fn.zTree.init($("#monitortree"), this.rSetting(), newData);
            }else if(obj[i].key == "STATUS"){
              showDialog("依赖","修改成功。");
            }
          }
          dispatch(requestDataActions.setRequestSuccess());
        }
        else {
            dispatch(requestDataActions.setRequestFail());
        }
    }
}

function oDataSetEquipment(obj) {
    return dispatch => {
		oData.setEquipment(obj, (code, data) => dispatch(receiveSetEquipment(obj, code, data)));
    }
}

export function setEquipment(obj) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataSetEquipment(obj));
    }
}

export function changePicData(key) {
    return (dispatch, getState) => {
        var state = getState();
        // var _this = this;
        var tval = state.equipmentReducer.twoHoursReport;
        for(var i=0;i<tval.length;i++){
            var k = tval[i].MonitorEntry;
            if(k == key){
                var v = tval[i].Values;
                // _this.curTowHourName = k;
                // _this.curTowHourValue = v;
                dispatch(setCurTowHourName(k));
                dispatch(setCurTowHourValue(v));
                // _this.emit("change");
            };
        };
    }
}

function receiveGetGroupAllData(data) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        }
        //console.log("查询成功",data.results);
        //通过eval() 函数可以将JSON字符串转化为对象
        var dataObj = eval(data.results[0]);
        var equipments = dataObj.EQUIPMENTS;
        var groups = dataObj.GROUPS;
        var status = dataObj.STATUSCOUNT;
        // _this.equipments = eval('('+equipments+')');
        // _this.subGroups = eval('('+groups+')');
        // _this.status = eval('('+status+')');
        dispatch(setEquipments(eval('('+equipments+')')));
        dispatch(setSubGroups(eval('('+groups+')')));
        dispatch(setStatus(eval('('+status+')')));
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
    }
}

function oDataGetGroupAllData(filters) {
    return dispatch => {
		oData.getGroupAllData(filters, data => dispatch(receiveGetGroupAllData(data)));
    }
}

export function getGroupAllData(rid) {
    return dispatch => {
        var filters = [{key:"RECID",value:rid}];
        // this.groupId = rid;
        dispatch(setGroupId(rid));
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetGroupAllData(filters));
    }
}

function receiveGetAssetByGb(data) {
    return dispatch => {
        var results = data.results;
        if(results.length>0){
            var result = results[0];
            var assetIdNtz = result.RecId;
            // _this.assetIdNtz = assetIdNtz;
            dispatch(setAssetIdNtz(assetIdNtz));
            // _this.emit("change");
            dispatch(requestDataActions.setRequestSuccess());
        }
        else {
            dispatch(requestDataActions.setRequestFail());
            return;
        }
    }
}

function oDataGetAssetByGb(rid) {
    return dispatch => {
		oData.getAssetByGb(rid, data => dispatch(receiveGetAssetByGb(data)));
    }
}

function receiveGetEquipmentAllData(data) {
	return (dispatch, getState) => {
        var state = getState();
        var results = data.results;
        if(results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        }
        if(results.length>0){
            var result = results[0];
            //console.log("查询成功",result);
            var alarms = result.ALARM_CONDITIONS;
            var funcVal = result.FUNCTION_VALUE;
            var logcount = result.LOGCOUNT;
            var monitors = result.MONITORS;
            var twoHoursReport = result.TWO_HOURS_REPORT;
            alarms = eval("(" + alarms + ")");
            logcount = eval("(" + logcount + ")");
            funcVal = eval("(" + funcVal + ")");
            monitors = eval(monitors);
            twoHoursReport = eval(twoHoursReport);
            var statusGood=0, statusWarning=0, statusError=0, statusDisabled=0;
            if(monitors.length>0){
                var moList = [];
                for(var i=0;i<monitors.length;i++){
                    var monitor = {
                        id:monitors[i].monitorId,
                        type:monitors[i].monitorType,
                        status:monitors[i].status,
                        nameChar:monitors[i].name,
                        discribe:monitors[i].message,
                        lastModify:monitors[i].updateTime
                    };
                    moList.push(monitor);

                    switch (monitors[i].status) {
                        case "good":
                            statusGood++;
                            break;
                        case "warning":
                            statusWarning++;
                            break;
                        case "error":
                            statusError++;
                            break;
                        case "disabled":
                            statusDisabled++;
                            break;
                    }
                }
                // _this.monitors = moList;
                // _this.monitorTableData = _this.monitors;
                // _this.monitorTableSelectFirstFlag = true;
                // _this.selectedMonitorName = monitors[0].name;
                dispatch(setMonitors(moList.slice(0)));
                dispatch(setMonitorTableData(moList.slice(0)));
                dispatch(setMonitorTableSelectFirstFlag(true));
                dispatch(setSelectedMonitorName(monitors[0].name));
                var filter ={
                  monitorId:monitors[0].monitorId,
                  monitorType:monitors[0].monitorType
                };
        				dispatch(getMonitorsPropertyDataFromID(monitors[0].monitorId));
        				dispatch(getAlarmConditionDataFromMonitorId(monitors[0].monitorId));
        				dispatch(getMySqlMonitorPropertyCounterData(monitors[0].monitorId));
        				dispatch(setSelectedMonitorByClickMonitorTableRow(state.equipmentReducer.selectedNode.type, monitors[0].monitorType));
            }
            // _this.monitorsStatus = [monitors.length, statusGood, statusWarning, statusError, statusDisabled];
            dispatch(setMonitorsStatus([monitors.length, statusGood, statusWarning, statusError, statusDisabled]));
            if(funcVal && funcVal.length>0){
                // _this.curFuncValName = funcVal[0].MonitorEntry;
                // _this.curFuncValAvg = funcVal[0].avg;
                // _this.curFuncValMax = funcVal[0].max;
                // _this.curFuncValMin = funcVal[0].min;
                // _this.curFuncValNew = funcVal[0].new;
                // dispatch(setCurFuncValName(funcVal[0].MonitorEntry));
                // dispatch(setCurFuncValAvg(funcVal[0].avg));
                // dispatch(setCurFuncValMax(funcVal[0].max));
                // dispatch(setCurFuncValMin(funcVal[0].min));
                // dispatch(setCurFuncValNew(funcVal[0].new));
            }
            // _this.funcValue = funcVal;
            // _this.twoHoursReport = twoHoursReport;
            dispatch(setFuncValue(funcVal));
            dispatch(setTwoHoursReport(twoHoursReport));
            if(twoHoursReport && twoHoursReport.length>0){
                // _this.curTowHourName = twoHoursReport[0].MonitorEntry;
                // _this.curTowHourValue = twoHoursReport[0].Values;
                dispatch(setCurTowHourName(twoHoursReport[0].MonitorEntry));
                dispatch(setCurTowHourValue(twoHoursReport[0].Values));
            }
            else{
                // _this.curTowHourName = "";
                // _this.curTowHourValue = [];
                dispatch(setCurTowHourName(""));
                dispatch(setCurTowHourValue([]));
            }
            if(alarms) {
                // _this.errorAlarm = alarms.errorAlarm;
                // _this.goodAlarm = alarms.goodAlarm;
                // _this.warningAlarm = alarms.warningAlarm;
                dispatch(setErrorAlarm(alarms.errorAlarm));
                dispatch(setGoodAlarm(alarms.goodAlarm));
                dispatch(setWarningAlarm(alarms.warningAlarm));
            }
            if(logcount) {
                // _this.logGood = logcount[0];
                // _this.logDanger = logcount[1];
                // _this.logError = logcount[2];
                // _this.logBan = logcount[3];
				if(logcount.length>0) {
					dispatch(setLogGood(logcount[0]));
	                dispatch(setLogDanger(logcount[1]));
	                dispatch(setLogError(logcount[2]));
	                dispatch(setLogBan(logcount[3]));
				}
                else {
					dispatch(setLogGood("0"));
	                dispatch(setLogDanger("0"));
	                dispatch(setLogError("0"));
	                dispatch(setLogBan("0"));
				}
            }
            // _this.emit("change");
            dispatch(requestDataActions.setRequestSuccess());
        }
    }
}

function oDataGetEquipmentAllData(filters) {
    return dispatch => {
		oData.getEquipmentAllData(filters, data => dispatch(receiveGetEquipmentAllData(data)));
    }
}

export function getEquipmentAllData(rid) {
    return (dispatch, getState) => {
        var state = getState();
        if(state.equipmentReducer.bClickTreeNode) {
            // this.bClickTreeNode = false;
            dispatch(setbClickTreeNode(false));
            // var _this = this;
            // this.equipmentIdNtz = rid;
            dispatch(setEquipmentIdNtz(rid));
            dispatch(requestDataActions.setRequest());
            dispatch(oDataGetAssetByGb(rid));
            var filters = [{key:"RECID",value:rid}];
            // _this.monitorTableData = [];
            // _this.monitorTableSelectFirstFlag = false;
            // _this.selectedMonitorName = "";
            dispatch(setMonitorTableData([]));
            dispatch(setMonitorTableSelectFirstFlag(false));
            dispatch(setSelectedMonitorName(""));
            dispatch(requestDataActions.setRequest());
            return dispatch(oDataGetEquipmentAllData(filters));
        }
    }
}

export function getMonitorTableData(filter) {
    return (dispatch, getState) => {
        var state = getState();
        if(filter != null) {
            // this.monitorTableData = [];
            // dispatch(setMonitorTableData([]));
            var monitorTableData = [];
            for(var i = 0; i < state.equipmentReducer.monitors.length; i++) {
                var bMatch = true;
                if(filter.hasOwnProperty('includedName') && state.equipmentReducer.monitors[i].nameChar.toLowerCase().indexOf($.trim(filter.includedName.toLowerCase())) == -1 ) {
                    bMatch = false;
                }

                if(bMatch) {
                    // this.monitorTableData.push(this.monitors[i]);
                    monitorTableData.push(state.equipmentReducer.monitors[i]);
                }
            }
            dispatch(setMonitorTableData(monitorTableData));
        }
        else {
            // this.monitorTableData = this.monitors;
            dispatch(setMonitorTableData(state.equipmentReducer.monitors));
        }
        // this.emit("change");
    }
}

function receiveGetMonitorData(data) {
    return dispatch => {
        // _this.bClickDesViewMonitorTableRow = false;
        dispatch(setbClickDesViewMonitorTableRow(false));
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        }
        //通过eval() 函数可以将JSON字符串转化为对象
        var dataObj = eval(data.results[0]);
        var alarms = dataObj.ALARM_CONDITIONS;
        var funcVal = dataObj.FUNCTION_VALUE;
        var logcount = dataObj.LOGCOUNT;
        var twoHoursReport = dataObj.TWO_HOURS_REPORT;
        alarms = eval("(" + alarms + ")");
        logcount = eval("(" + logcount + ")");
        funcVal = eval("(" + funcVal + ")");
        twoHoursReport = eval(twoHoursReport);

        if(funcVal && funcVal.length>0){
            // _this.curFuncValName = funcVal[0].MonitorEntry;
            // _this.curFuncValAvg = funcVal[0].avg;
            // _this.curFuncValMax = funcVal[0].max;
            // _this.curFuncValMin = funcVal[0].min;
            // _this.curFuncValNew = funcVal[0].new;
            // dispatch(setCurFuncValName(funcVal[0].MonitorEntry));
            // dispatch(setCurFuncValAvg(funcVal[0].avg));
            // dispatch(setCurFuncValMax(funcVal[0].max));
            // dispatch(setCurFuncValMin(funcVal[0].min));
            // dispatch(setCurFuncValNew(funcVal[0].new));
        }
        // _this.funcValue = funcVal;
        // _this.twoHoursReport = twoHoursReport;
        dispatch(setFuncValue(funcVal));
        dispatch(setTwoHoursReport(twoHoursReport));
        if(twoHoursReport && twoHoursReport.length>0){
            // _this.curTowHourName = twoHoursReport[0].MonitorEntry;
            // _this.curTowHourValue = twoHoursReport[0].Values;
            dispatch(setCurTowHourName(twoHoursReport[0].MonitorEntry));
            dispatch(setCurTowHourValue(twoHoursReport[0].Values));
        }
        else{
            // _this.curTowHourName = "";
            // _this.curTowHourValue = [];
            dispatch(setCurTowHourName(""));
            dispatch(setCurTowHourValue([]));
        }
        if(alarms) {
            // _this.errorAlarm = alarms.errorAlarm;
            // _this.goodAlarm = alarms.goodAlarm;
            // _this.warningAlarm = alarms.warningAlarm;
            dispatch(setErrorAlarm(alarms.errorAlarm));
            dispatch(setGoodAlarm(alarms.goodAlarm));
            dispatch(setWarningAlarm(alarms.warningAlarm));
        }
        if(logcount) {
            // _this.logGood = logcount[0];
            // _this.logDanger = logcount[1];
            // _this.logError = logcount[2];
            // _this.logBan = logcount[3];
			if(logcount.length>0) {
				dispatch(setLogGood(logcount[0]));
				dispatch(setLogDanger(logcount[1]));
				dispatch(setLogError(logcount[2]));
				dispatch(setLogBan(logcount[3]));
			}
			else {
				dispatch(setLogGood("0"));
				dispatch(setLogDanger("0"));
				dispatch(setLogError("0"));
				dispatch(setLogBan("0"));
			}
        }
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
    }
}

function oDataGetMonitorData(filter) {
    return dispatch => {
		oData.getMonitorData(filter, data => dispatch(receiveGetMonitorData(data)));
    }
}

export function getMonitorData(filter) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetMonitorData(filter));
    }
}

export function getResourceTypes() {
    return dispatch => {
		dispatch(requestDataActions.setRequest());
        oData.getResourceTypes(function(data){
			if(data.results.length == 0){
	            // _this.emit("change");
	            dispatch(requestDataActions.setRequestFail());
	            return;
	        }
	        //console.log("查询成功",data.results);
	        dispatch(setResourceTypes(data.results));
			dispatch(getResourcesByTypeId(''));
	        // _this.emit("change");
	        dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function getResourcesByTypeId(resourceTypeRecId) {
	return dispatch => {
        dispatch(setCreateResourcesTableData([]));
		dispatch(requestDataActions.setRequest());
		if(resourceTypeRecId == '') {
			oData.getAllResources(function(data){
				if(data.results.length == 0){
		            // _this.emit("change");
		            dispatch(requestDataActions.setRequestFail());
		            return;
		        }
		        //console.log("查询成功",data.results);
				dispatch(setCreateResourcesTableData(data.results));
		        // _this.emit("change");
		        dispatch(requestDataActions.setRequestSuccess());
			});
		}
        else {
			oData.getResources(resourceTypeRecId, function(data){
				if(data.results.length == 0){
		            // _this.emit("change");
		            dispatch(requestDataActions.setRequestFail());
		            return;
		        }
		        //console.log("查询成功",data.results);
				dispatch(setCreateResourcesTableData(data.results));
		        // _this.emit("change");
		        dispatch(requestDataActions.setRequestSuccess());
			});
		}
    }
}

export function getResourcesBySearchName(searchName) {
	return dispatch => {
        dispatch(setCreateResourcesTableData([]));
		dispatch(requestDataActions.setRequest());
		oData.getAllResources(function(data){
			if(data.results.length == 0){
	            // _this.emit("change");
	            dispatch(requestDataActions.setRequestFail());
	            return;
	        }
			var results = data.results;
			var resources = [];
			for(var i = 0; i < results.length; i++) {
				if(results[i].typeAlias.toLowerCase().indexOf($.trim(searchName.toLowerCase())) != -1) {
					resources.push(results[i]);
				}
			}
			dispatch(setCreateResourcesTableData(resources));
	        // _this.emit("change");
	        dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function setSelectedResourceByRightClickTree(treeNode) {
	return dispatch => {
		dispatch(requestDataActions.setRequest());
		oData.getAllResources(function(data){
			if(data.results.length == 0){
	            // _this.emit("change");
	            dispatch(requestDataActions.setRequestFail());
	            return;
	        }
			var results = data.results;
			for(var i = 0; i < results.length; i++) {
				if(results[i].relationEqName == treeNode.type) {
					if(treeNode.type=="Equipment.FireWall" || treeNode.type=="Equipment.Network" || treeNode.type=="Equipment.WirelessNetwork") {
						if(results[i].EqName == treeNode.connectionType) {
							dispatch(setSelectedResource(results[i]));
							break;
						}
					}
					else {
						dispatch(setSelectedResource(results[i]));
						break;
					}
				}
			}
	        // _this.emit("change");
	        dispatch(requestDataActions.setRequestSuccess());
		});
	}
}

export function getEquipment(equipmentId) {
	return dispatch => {
		dispatch(requestDataActions.setRequest());
		oData.getEquipment(equipmentId, function(data){
			if(data.results.length == 0){
	            // _this.emit("change");
	            dispatch(requestDataActions.setRequestFail());
	            return;
	        }
			var results = data.results;
			dispatch(setEquipmentServerAddress(results[0].ServerAddress));
			dispatch(setEquipmentModel(results[0].EquipmentModel));
	        // _this.emit("change");
	        dispatch(requestDataActions.setRequestSuccess());
		});
	}
}

export function getMonitors(equipmentType, vendor, resourceModel) {
	return dispatch => {
        dispatch(setCreateMonitorsTableData([]));
        dispatch(setCommonMonitors([]));
		dispatch(requestDataActions.setRequest());
		oData.getMonitors(equipmentType, function(data){
			if(data.results.length == 0){
	            // _this.emit("change");
	            dispatch(requestDataActions.setRequestFail());
	            return;
	        }
			var monitorsTableData = [], count = 0, commonMonitors = [];
			var monitorResults = data.results;
			if(equipmentType == "Equipment.Network" || equipmentType == "Equipment.FireWall") {
				dispatch(requestDataActions.setRequest());
				oData.getMibs(vendor, resourceModel, function(data2){
					if(data2.results.length == 0){
			            // _this.emit("change");
			            dispatch(requestDataActions.setRequestFail());
						for(var i = 0; i < monitorResults.length; i++) {
							var monitorType = monitorResults[i].MonitorTableName.substring(11);
							if(monitorType == "PowerStatus" || monitorType == "Temperature" || monitorType == "NetworkCpu" || monitorType == "NetworkMemory" || monitorType == "FanStatus") {
								monitorResults.splice(i, 1);
								i--;
							}
						}
			        }
			        else {
						for(var i = 0; i < monitorResults.length; i++) {
							var monitorType = monitorResults[i].MonitorTableName.substring(11);
							if(monitorType == "PowerStatus" && data2.results[0].PowerOID == "") {
								monitorResults.splice(i, 1);
								i--;
							}
							else if(monitorType == "Temperature" && data2.results[0].TemperatureOID == "") {
								monitorResults.splice(i, 1);
								i--;
							}
							else if(monitorType == "NetworkCpu" && (data2.results[0].CpuOID == "" && data2.results[0].Cpu1mOID == "" && data2.results[0].Cpu5mOID == "" && data2.results[0].Cpu5sOID == "")) {
								monitorResults.splice(i, 1);
								i--;
							}
							else if(monitorType == "NetworkMemory" && (data2.results[0].MemUseOID == "" && (data2.results[0].MemFreeOID == "" || data2.results[0].MemTotalOID == "")  )) {
								monitorResults.splice(i, 1);
								i--;
							}
							else if(monitorType == "FanStatus" && data2.results[0].FanstatusOID == "") {
								monitorResults.splice(i, 1);
								i--;
							}
						}
					}

					for(var i = 0; i < monitorResults.length; i++) {
						dispatch(requestDataActions.setRequest());
						oData.getMonitorReturnValues(monitorResults[i].MonitorTableName.substring(11), function(data3, monitorType){
							count++;
							if(data3.results.length == 0){
					            // _this.emit("change");
					            dispatch(requestDataActions.setRequestFail());
								for(var j = 0; j < monitorResults.length; j++) {
									if(monitorResults[j].MonitorTableName.substring(11) == monitorType && createMonitorModalTexts[monitorType]) {
										monitorsTableData.push({id:monitorResults[j].RecId, name:monitorResults[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:"", monitorType:monitorType, monitorPackage:monitorResults[j].description});
										if(monitorType.indexOf("Ping") != -1
										|| monitorType.toLowerCase().indexOf("cpu") != -1
										|| monitorType.toLowerCase().indexOf("memory") != -1
										|| monitorType.toLowerCase().indexOf("disk") != -1
										|| monitorType.indexOf("Process") != -1) {
											commonMonitors.push({id:monitorResults[j].RecId, name:monitorResults[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:"", monitorType:monitorType, monitorPackage:monitorResults[j].description});
										}
										break;
									}
								}
								if(count == monitorResults.length) {
									dispatch(setCreateMonitorsTableData(monitorsTableData));
									dispatch(setCommonMonitors(commonMonitors));
								}
					            return;
					        }
							var monitorReturnValues = data3.results;
							var returnValue="";
							for(var j = 0; j < monitorReturnValues.length; j++) {
								if(returnValue=="") {
									returnValue += createMonitorModalTexts[monitorReturnValues[j].MonitorType][monitorReturnValues[j].SaveItem];
								}
								else {
									returnValue += ','+createMonitorModalTexts[monitorReturnValues[j].MonitorType][monitorReturnValues[j].SaveItem];
								}
							}
							for(var j = 0; j < monitorResults.length; j++) {
								if(monitorResults[j].MonitorTableName.substring(11) == monitorType && createMonitorModalTexts[monitorType]) {
									monitorsTableData.push({id:monitorResults[j].RecId, name:monitorResults[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:returnValue, monitorType:monitorType, monitorPackage:monitorResults[j].description});
									if(monitorType.indexOf("Ping") != -1
									|| monitorType.toLowerCase().indexOf("cpu") != -1
									|| monitorType.toLowerCase().indexOf("memory") != -1
									|| monitorType.toLowerCase().indexOf("disk") != -1
									|| monitorType.indexOf("Process") != -1) {
										commonMonitors.push({id:monitorResults[j].RecId, name:monitorResults[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:"", monitorType:monitorType, monitorPackage:monitorResults[j].description});
									}
									break;
								}
							}
							if(count == monitorResults.length) {
								dispatch(setCreateMonitorsTableData(monitorsTableData));
								dispatch(setCommonMonitors(commonMonitors));
							}
					        // _this.emit("change");
					        dispatch(requestDataActions.setRequestSuccess());
						});
					}
			        // _this.emit("change");
			        dispatch(requestDataActions.setRequestSuccess());
				});
			}
			else {
				for(var i = 0; i < monitorResults.length; i++) {
					dispatch(requestDataActions.setRequest());
					oData.getMonitorReturnValues(monitorResults[i].MonitorTableName.substring(11), function(data2, monitorType){
						count++;
						if(data2.results.length == 0){
							// _this.emit("change");
							dispatch(requestDataActions.setRequestFail());
							for(var j = 0; j < monitorResults.length; j++) {
								if(monitorResults[j].MonitorTableName.substring(11) == monitorType && createMonitorModalTexts[monitorType]) {
									monitorsTableData.push({id:monitorResults[j].RecId, name:monitorResults[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:"", monitorType:monitorType, monitorPackage:monitorResults[j].description});
									if(monitorType.indexOf("Ping") != -1
									|| ((monitorResults[j].Range=="Equipment.AgentUnix" && monitorType=="AgentCPU") || (monitorResults[j].Range=="Equipment.Unix" && monitorType=="CPU") || (monitorResults[j].Range=="Equipment.WirelessNetwork" && monitorType=="NetworkCpu") || (monitorResults[j].Range!="Equipment.AgentUnix" && monitorResults[j].Range!="Equipment.Unix" && monitorResults[j].Range!="Equipment.WirelessNetwork" && monitorType.toLowerCase().indexOf("cpu") != -1))
									|| ((monitorResults[j].Range=="Equipment.AgentUnix" && monitorType=="AgentMemory") || (monitorResults[j].Range=="Equipment.Unix" && monitorType=="Memory") || (monitorResults[j].Range=="Equipment.WirelessNetwork" && monitorType=="NetworkMemory") || (monitorResults[j].Range!="Equipment.AgentUnix" && monitorResults[j].Range!="Equipment.Unix" && monitorResults[j].Range!="Equipment.WirelessNetwork" && monitorType.toLowerCase().indexOf("memory") != -1))
									|| ((monitorResults[j].Range=="Equipment.AgentUnix" && monitorType=="AgentDiskSpace") || (monitorResults[j].Range=="Equipment.Unix" && monitorType=="DiskSpace") || (monitorResults[j].Range=="Equipment.SNMPUnix" && monitorType=="SnmpDisk") || (monitorResults[j].Range!="Equipment.AgentUnix" && monitorResults[j].Range!="Equipment.Unix" && monitorResults[j].Range!="Equipment.SNMPUnix" && monitorType.toLowerCase().indexOf("disk") != -1))
									|| monitorType.indexOf("Process") != -1) {
										commonMonitors.push({id:monitorResults[j].RecId, name:monitorResults[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:"", monitorType:monitorType, monitorPackage:monitorResults[j].description});
									}
									break;
								}
							}
							if(count == monitorResults.length) {
								dispatch(setCreateMonitorsTableData(monitorsTableData));
								dispatch(setCommonMonitors(commonMonitors));
							}
							return;
						}
						var monitorReturnValues = data2.results;
						var returnValue="";
						for(var j = 0; j < monitorReturnValues.length; j++) {
							if(returnValue=="") {
								returnValue += createMonitorModalTexts[monitorReturnValues[j].MonitorType][monitorReturnValues[j].SaveItem];
							}
							else {
								returnValue += ','+createMonitorModalTexts[monitorReturnValues[j].MonitorType][monitorReturnValues[j].SaveItem];
							}
						}
						for(var j = 0; j < monitorResults.length; j++) {
							if(monitorResults[j].MonitorTableName.substring(11) == monitorType && createMonitorModalTexts[monitorType]) {
								monitorsTableData.push({id:monitorResults[j].RecId, name:monitorResults[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:returnValue, monitorType:monitorType, monitorPackage:monitorResults[j].description});
								if(monitorType.indexOf("Ping") != -1
								|| ((monitorResults[j].Range=="Equipment.AgentUnix" && monitorType=="AgentCPU") || (monitorResults[j].Range=="Equipment.Unix" && monitorType=="CPU") || (monitorResults[j].Range=="Equipment.WirelessNetwork" && monitorType=="NetworkCpu") || (monitorResults[j].Range!="Equipment.AgentUnix" && monitorResults[j].Range!="Equipment.Unix" && monitorResults[j].Range!="Equipment.WirelessNetwork" && monitorType.toLowerCase().indexOf("cpu") != -1))
								|| ((monitorResults[j].Range=="Equipment.AgentUnix" && monitorType=="AgentMemory") || (monitorResults[j].Range=="Equipment.Unix" && monitorType=="Memory") || (monitorResults[j].Range=="Equipment.WirelessNetwork" && monitorType=="NetworkMemory") || (monitorResults[j].Range!="Equipment.AgentUnix" && monitorResults[j].Range!="Equipment.Unix" && monitorResults[j].Range!="Equipment.WirelessNetwork" && monitorType.toLowerCase().indexOf("memory") != -1))
								|| ((monitorResults[j].Range=="Equipment.AgentUnix" && monitorType=="AgentDiskSpace") || (monitorResults[j].Range=="Equipment.Unix" && monitorType=="DiskSpace") || (monitorResults[j].Range=="Equipment.SNMPUnix" && monitorType=="SnmpDisk") || (monitorResults[j].Range!="Equipment.AgentUnix" && monitorResults[j].Range!="Equipment.Unix" && monitorResults[j].Range!="Equipment.SNMPUnix" && monitorType.toLowerCase().indexOf("disk") != -1))
								|| monitorType.indexOf("Process") != -1) {
									commonMonitors.push({id:monitorResults[j].RecId, name:monitorResults[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:"", monitorType:monitorType, monitorPackage:monitorResults[j].description});
								}
								break;
							}
						}
						if(count == monitorResults.length) {
							dispatch(setCreateMonitorsTableData(monitorsTableData));
							dispatch(setCommonMonitors(commonMonitors));
						}
						// _this.emit("change");
						dispatch(requestDataActions.setRequestSuccess());
					});
				}
			}
	        // _this.emit("change");
	        dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function getMonitorsBySearchName(searchName, equipmentType, vendor, resourceModel) {
	return dispatch => {
        dispatch(setCreateMonitorsTableData([]));
		dispatch(requestDataActions.setRequest());
		oData.getMonitors(equipmentType, function(data){
			if(data.results.length == 0){
	            // _this.emit("change");
	            dispatch(requestDataActions.setRequestFail());
	            return;
	        }
	        //console.log("查询成功",data.results);
			var monitorsTableData = [], filteredMonitors = [], count = 0;
			var monitorResults = data.results;
			if(equipmentType == "Equipment.Network" || equipmentType == "Equipment.FireWall") {
				dispatch(requestDataActions.setRequest());
				oData.getMibs(vendor, resourceModel, function(data2){
					if(data2.results.length == 0){
			            // _this.emit("change");
			            dispatch(requestDataActions.setRequestFail());
						for(var i = 0; i < monitorResults.length; i++) {
							var monitorType = monitorResults[i].MonitorTableName.substring(11);
							if(monitorType == "PowerStatus" || monitorType == "Temperature" || monitorType == "NetworkCpu" || monitorType == "NetworkMemory" || monitorType == "FanStatus") {
								monitorResults.splice(i, 1);
								i--;
							}
						}
			        }
			        else {
						for(var i = 0; i < monitorResults.length; i++) {
							var monitorType = monitorResults[i].MonitorTableName.substring(11);
							if(monitorType == "PowerStatus" && data2.results[0].PowerOID == "") {
								monitorResults.splice(i, 1);
								i--;
							}
							else if(monitorType == "Temperature" && data2.results[0].TemperatureOID == "") {
								monitorResults.splice(i, 1);
								i--;
							}
							else if(monitorType == "NetworkCpu" && data2.results[0].CpuOID == "") {
								monitorResults.splice(i, 1);
								i--;
							}
							else if(monitorType == "NetworkMemory" && data2.results[0].MemTotalOID == "") {
								monitorResults.splice(i, 1);
								i--;
							}
							else if(monitorType == "FanStatus" && data2.results[0].FanstatusOID == "") {
								monitorResults.splice(i, 1);
								i--;
							}
						}
					}

					if($.trim(searchName) != "") {
			            for(var i = 0; i < monitorResults.length; i++) {
			                var bMatch = true;
			                if(monitorResults[i].MonitorName.toLowerCase().indexOf($.trim(searchName.toLowerCase())) == -1) {
			                    bMatch = false;
			                }

			                if(bMatch) {
			                    filteredMonitors.push(monitorResults[i]);
			                }
			            }
			        }
			        else {
						filteredMonitors = monitorResults;
			        }

					for(var i = 0; i < filteredMonitors.length; i++) {
						dispatch(requestDataActions.setRequest());
						oData.getMonitorReturnValues(filteredMonitors[i].MonitorTableName.substring(11), function(data3, monitorType){
							count++;
							if(data3.results.length == 0){
					            // _this.emit("change");
					            dispatch(requestDataActions.setRequestFail());
								for(var j = 0; j < filteredMonitors.length; j++) {
									if(filteredMonitors[j].MonitorTableName.substring(11) == monitorType && createMonitorModalTexts[monitorType]) {
										monitorsTableData.push({id:filteredMonitors[j].RecId, name:filteredMonitors[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:"", monitorType:monitorType, monitorPackage:filteredMonitors[j].description});
										break;
									}
								}
								if(count == filteredMonitors.length) {
									dispatch(setCreateMonitorsTableData(monitorsTableData));
								}
					            return;
					        }
							var monitorReturnValues = data3.results;
							var returnValue="";
							for(var j = 0; j < monitorReturnValues.length; j++) {
								if(returnValue=="") {
									returnValue += createMonitorModalTexts[monitorReturnValues[j].MonitorType][monitorReturnValues[j].SaveItem];
								}
								else {
									returnValue += ','+createMonitorModalTexts[monitorReturnValues[j].MonitorType][monitorReturnValues[j].SaveItem];
								}
							}
							for(var j = 0; j < filteredMonitors.length; j++) {
								if(filteredMonitors[j].MonitorTableName.substring(11) == monitorType && createMonitorModalTexts[monitorType]) {
									monitorsTableData.push({id:filteredMonitors[j].RecId, name:filteredMonitors[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:returnValue, monitorType:monitorType, monitorPackage:filteredMonitors[j].description});
									break;
								}
							}
							if(count == filteredMonitors.length) {
								dispatch(setCreateMonitorsTableData(monitorsTableData));
							}
					        // _this.emit("change");
					        dispatch(requestDataActions.setRequestSuccess());
						});
					}
			        // _this.emit("change");
			        dispatch(requestDataActions.setRequestSuccess());
				});
			}
			else {
				if($.trim(searchName) != "") {
					for(var i = 0; i < monitorResults.length; i++) {
						var bMatch = true;
						if(monitorResults[i].MonitorName.toLowerCase().indexOf($.trim(searchName.toLowerCase())) == -1) {
							bMatch = false;
						}

						if(bMatch) {
							filteredMonitors.push(monitorResults[i]);
						}
					}
				}
				else {
					filteredMonitors = monitorResults;
				}

				for(var i = 0; i < filteredMonitors.length; i++) {
					dispatch(requestDataActions.setRequest());
					oData.getMonitorReturnValues(filteredMonitors[i].MonitorTableName.substring(11), function(data2, monitorType){
						count++;
						if(data2.results.length == 0){
							// _this.emit("change");
							dispatch(requestDataActions.setRequestFail());
							for(var j = 0; j < filteredMonitors.length; j++) {
								if(filteredMonitors[j].MonitorTableName.substring(11) == monitorType && createMonitorModalTexts[monitorType]) {
									monitorsTableData.push({id:filteredMonitors[j].RecId, name:filteredMonitors[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:"", monitorType:monitorType, monitorPackage:filteredMonitors[j].description});
									break;
								}
							}
							if(count == filteredMonitors.length) {
								dispatch(setCreateMonitorsTableData(monitorsTableData));
							}
							return;
						}
						var monitorReturnValues = data2.results;
						var returnValue="";
						for(var j = 0; j < monitorReturnValues.length; j++) {
							if(returnValue=="") {
								returnValue += createMonitorModalTexts[monitorReturnValues[j].MonitorType][monitorReturnValues[j].SaveItem];
							}
							else {
								returnValue += ','+createMonitorModalTexts[monitorReturnValues[j].MonitorType][monitorReturnValues[j].SaveItem];
							}
						}
						for(var j = 0; j < filteredMonitors.length; j++) {
							if(filteredMonitors[j].MonitorTableName.substring(11) == monitorType && createMonitorModalTexts[monitorType]) {
								monitorsTableData.push({id:filteredMonitors[j].RecId, name:filteredMonitors[j].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:returnValue, monitorType:monitorType, monitorPackage:filteredMonitors[j].description});
								break;
							}
						}
						if(count == filteredMonitors.length) {
							dispatch(setCreateMonitorsTableData(monitorsTableData));
						}
						// _this.emit("change");
						dispatch(requestDataActions.setRequestSuccess());
					});
				}
			}

	        // _this.emit("change");
	        dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function setSelectedMonitorByClickMonitorTableRow(equipmentType, monitorType) {
	return dispatch => {
		dispatch(requestDataActions.setRequest());
		oData.getMonitors(equipmentType, function(data){
			if(data.results.length == 0){
	            // _this.emit("change");
	            dispatch(requestDataActions.setRequestFail());
	            return;
	        }
			var monitorResults = data.results;
			for(var i = 0; i < monitorResults.length; i++) {
				if(monitorResults[i].MonitorTableName.substring(11) == monitorType) {
					dispatch(setSelectedMonitor({id:monitorResults[i].RecId, name:monitorResults[i].MonitorName, description:createMonitorModalTexts[monitorType].Description, returnValue:"", monitorType:monitorType, monitorPackage:monitorResults[i].description}));
			        dispatch(getMonitorAlarmConditionNameData(monitorType));
					break;
				}
			}
	        // _this.emit("change");
	        dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function getMonitorAlarmConditionNameData(monitorType) {
	return dispatch => {
		dispatch(setMonitorAlarmConditionNameData([]));
		dispatch(requestDataActions.setRequest());
		oData.getMonitorReturnValues(monitorType, function(data, monitorType){
			if(data.results.length == 0){
				// _this.emit("change");
				dispatch(requestDataActions.setRequestFail());
				return;
			}
			var monitorAlarmConditionNameData = [];
			var monitorReturnValues = data.results;
			for(var i = 0; i < monitorReturnValues.length; i++) {
				if(monitorReturnValues[i].IsMainReturn == "1") {
					monitorAlarmConditionNameData.unshift({id:monitorReturnValues[i].RecId, name:createMonitorModalTexts[monitorReturnValues[i].MonitorType][monitorReturnValues[i].SaveItem], saveItem:monitorReturnValues[i].SaveItem});
				}
				else {
					monitorAlarmConditionNameData.push({id:monitorReturnValues[i].RecId, name:createMonitorModalTexts[monitorReturnValues[i].MonitorType][monitorReturnValues[i].SaveItem], saveItem:monitorReturnValues[i].SaveItem});
				}
			}
			dispatch(setMonitorAlarmConditionNameData(monitorAlarmConditionNameData));
			// _this.emit("change");
			dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function getInitialAlarmConditionDataFromMonitorType(monitorType) {
	return dispatch => {
		dispatch(setMonitorErrorConditionsData([]));
		dispatch(setMonitorSettingErrorConditionsData([]));
		dispatch(setMonitorWarningConditionsData([]));
		dispatch(setMonitorSettingWarningConditionsData([]));
		dispatch(setMonitorGoodConditionsData([]));
		dispatch(setMonitorSettingGoodConditionsData([]));
		dispatch(requestDataActions.setRequest());
		oData.getInitialAlarmConditionDataFromMonitorType(monitorType, function(data){
			if(data.results.length == 0){
				// _this.emit("change");
				dispatch(requestDataActions.setRequestFail());
				return;
			}
			var alarmConditionsData = data.results;
			var errorAlarmConditionsData = [], warningAlarmConditionsData = [], goodAlarmConditionsData = []
			for(var i = 0; i < alarmConditionsData.length; i++) {
        var alarmConditionName = createMonitorModalTexts[monitorType][alarmConditionsData[i].SaveReturnValue] ? createMonitorModalTexts[monitorType][alarmConditionsData[i].SaveReturnValue] : alarmConditionsData[i].SaveReturnValue;
				if(alarmConditionsData[i].AlarmStatus == "error") {
					errorAlarmConditionsData.push({id:'', conditionName: alarmConditionName, returnValue: alarmConditionsData[i].SaveReturnValue, conditionSymbol: alarmConditionsData[i].Operators, conditionValue: alarmConditionsData[i].AlramValue, conditionRelation: ""});
				}
				else if(alarmConditionsData[i].AlarmStatus == "warning") {
					warningAlarmConditionsData.push({id:'', conditionName: alarmConditionName, returnValue: alarmConditionsData[i].SaveReturnValue, conditionSymbol: alarmConditionsData[i].Operators, conditionValue: alarmConditionsData[i].AlramValue, conditionRelation: ""});
				}
				else if(alarmConditionsData[i].AlarmStatus == "good") {
					goodAlarmConditionsData.push({id:'', conditionName: alarmConditionName, returnValue: alarmConditionsData[i].SaveReturnValue, conditionSymbol: alarmConditionsData[i].Operators, conditionValue: alarmConditionsData[i].AlramValue, conditionRelation: ""});
				}
			}

			dispatch(setMonitorErrorConditionsData(errorAlarmConditionsData));
			dispatch(setMonitorSettingErrorConditionsData(errorAlarmConditionsData));
			dispatch(setMonitorWarningConditionsData(warningAlarmConditionsData));
			dispatch(setMonitorSettingWarningConditionsData(warningAlarmConditionsData));
			dispatch(setMonitorGoodConditionsData(goodAlarmConditionsData));
			dispatch(setMonitorSettingGoodConditionsData(goodAlarmConditionsData));
			// _this.emit("change");
			dispatch(requestDataActions.setRequestSuccess());
		});
	}
}

export function getAlarmConditionDataFromMonitorId(monitorId) {
	return dispatch => {
		dispatch(setMonitorErrorConditionsData([]));
		dispatch(setMonitorSettingErrorConditionsData([]));
		dispatch(setMonitorWarningConditionsData([]));
		dispatch(setMonitorSettingWarningConditionsData([]));
		dispatch(setMonitorGoodConditionsData([]));
		dispatch(setMonitorSettingGoodConditionsData([]));
		dispatch(requestDataActions.setRequest());
		oData.getAlarmConditionDataFromMonitorId(monitorId, function(data){
			if(data.results.length == 0){
				// _this.emit("change");
                dispatch(setGetAlarmConditionDataDoneFlag(true));
				dispatch(requestDataActions.setRequestFail());
				return;
			}
			var alarmConditionsData = data.results;
			var errorAlarmConditionsData = [], warningAlarmConditionsData = [], goodAlarmConditionsData = []
			for(var i = 0; i < alarmConditionsData.length; i++) {
        var alarmConditionName = createMonitorModalTexts[alarmConditionsData[i].MonitorType][alarmConditionsData[i].ReturnValue] ? createMonitorModalTexts[alarmConditionsData[i].MonitorType][alarmConditionsData[i].ReturnValue] : alarmConditionsData[i].ReturnValue;
				if(alarmConditionsData[i].AlarmStatus == "error") {
					errorAlarmConditionsData.push({id:alarmConditionsData[i].RecId, conditionName: alarmConditionName, returnValue: alarmConditionsData[i].ReturnValue, conditionSymbol: alarmConditionsData[i].Operator, conditionValue: alarmConditionsData[i].AlramValue, conditionRelation: alarmConditionsData[i].relation});
				}
				else if(alarmConditionsData[i].AlarmStatus == "warning") {
					warningAlarmConditionsData.push({id:alarmConditionsData[i].RecId, conditionName: alarmConditionName, returnValue: alarmConditionsData[i].ReturnValue, conditionSymbol: alarmConditionsData[i].Operator, conditionValue: alarmConditionsData[i].AlramValue, conditionRelation: alarmConditionsData[i].relation});
				}
				else if(alarmConditionsData[i].AlarmStatus == "good") {
					goodAlarmConditionsData.push({id:alarmConditionsData[i].RecId, conditionName: alarmConditionName, returnValue: alarmConditionsData[i].ReturnValue, conditionSymbol: alarmConditionsData[i].Operator, conditionValue: alarmConditionsData[i].AlramValue, conditionRelation: alarmConditionsData[i].relation});
				}
			}

			dispatch(setMonitorErrorConditionsData(errorAlarmConditionsData));
			dispatch(setMonitorSettingErrorConditionsData(errorAlarmConditionsData));
			dispatch(setMonitorWarningConditionsData(warningAlarmConditionsData));
			dispatch(setMonitorSettingWarningConditionsData(warningAlarmConditionsData));
			dispatch(setMonitorGoodConditionsData(goodAlarmConditionsData));
			dispatch(setMonitorSettingGoodConditionsData(goodAlarmConditionsData));

            dispatch(setGetAlarmConditionDataDoneFlag(true));
			// _this.emit("change");
			dispatch(requestDataActions.setRequestSuccess());
		});
	}
}
//保存监测器属性-报警条件的值
export function saveMonitorAlarmConditions(monitorId, monitorType) {
	return (dispatch, getState) => {
		var state = getState();
		var monitorErrorConditionsData = state.equipmentReducer.monitorErrorConditionsData;
		var monitorWarningConditionsData = state.equipmentReducer.monitorWarningConditionsData;
		var monitorGoodConditionsData = state.equipmentReducer.monitorGoodConditionsData;
		var deleteMonitorAlarmConditionsData = state.equipmentReducer.deleteMonitorAlarmConditionsData;

		var newAlarmConditions = [], updatedAlarmConditions = [];
		for(var i = 0; i < monitorErrorConditionsData.length; i++) {
			if(monitorErrorConditionsData[i].id == "") {
				newAlarmConditions.push({AlarmStatus:"error", MonitorId:monitorId, ReturnValue:monitorErrorConditionsData[i].returnValue, Operator:monitorErrorConditionsData[i].conditionSymbol, AlramValue:monitorErrorConditionsData[i].conditionValue, MonitorType:monitorType, relation:monitorErrorConditionsData[i].conditionRelation});
			}
			else {
				updatedAlarmConditions.push({RecId:monitorErrorConditionsData[i].id, AlarmStatus:"error", MonitorId:monitorId, ReturnValue:monitorErrorConditionsData[i].returnValue, Operator:monitorErrorConditionsData[i].conditionSymbol, AlramValue:monitorErrorConditionsData[i].conditionValue, MonitorType:monitorType, relation:monitorErrorConditionsData[i].conditionRelation});
			}
		}
		for(var i = 0; i < monitorWarningConditionsData.length; i++) {
			if(monitorWarningConditionsData[i].id == "") {
				newAlarmConditions.push({AlarmStatus:"warning", MonitorId:monitorId, ReturnValue:monitorWarningConditionsData[i].returnValue, Operator:monitorWarningConditionsData[i].conditionSymbol, AlramValue:monitorWarningConditionsData[i].conditionValue, MonitorType:monitorType, relation:monitorWarningConditionsData[i].conditionRelation});
			}
			else {
				updatedAlarmConditions.push({RecId:monitorWarningConditionsData[i].id, AlarmStatus:"warning", MonitorId:monitorId, ReturnValue:monitorWarningConditionsData[i].returnValue, Operator:monitorWarningConditionsData[i].conditionSymbol, AlramValue:monitorWarningConditionsData[i].conditionValue, MonitorType:monitorType, relation:monitorWarningConditionsData[i].conditionRelation});
			}
		}
		for(var i = 0; i < monitorGoodConditionsData.length; i++) {
			if(monitorGoodConditionsData[i].id == "") {
				newAlarmConditions.push({AlarmStatus:"good", MonitorId:monitorId, ReturnValue:monitorGoodConditionsData[i].returnValue, Operator:monitorGoodConditionsData[i].conditionSymbol, AlramValue:monitorGoodConditionsData[i].conditionValue, MonitorType:monitorType, relation:monitorGoodConditionsData[i].conditionRelation});
			}
			else {
				updatedAlarmConditions.push({RecId:monitorGoodConditionsData[i].id, AlarmStatus:"good", MonitorId:monitorId, ReturnValue:monitorGoodConditionsData[i].returnValue, Operator:monitorGoodConditionsData[i].conditionSymbol, AlramValue:monitorGoodConditionsData[i].conditionValue, MonitorType:monitorType, relation:monitorGoodConditionsData[i].conditionRelation});
			}
		}

		for(var i = 0; i < deleteMonitorAlarmConditionsData.length; i++) {
			dispatch(requestDataActions.setRequest());
			oData.deleteMonitorAlarmCondition({
	            data: {RecId: deleteMonitorAlarmConditionsData[i].id},
	            callback: function(resp){
	                dispatch(requestDataActions.setRequestSuccess());
	            },
	            error: function(resp){
	                dispatch(requestDataActions.setRequestFail());
	            }
	        });
		}
		for(var i = 0; i < newAlarmConditions.length; i++) {
			dispatch(requestDataActions.setRequest());
			oData.addMonitorAlarmCondition({
	            data: newAlarmConditions[i],
	            callback: function(resp){
	                dispatch(requestDataActions.setRequestSuccess());
	            },
	            error: function(resp){
	                dispatch(requestDataActions.setRequestFail());
	            }
	        });
		}
		for(var i = 0; i < updatedAlarmConditions.length; i++) {
			dispatch(requestDataActions.setRequest());
			oData.updateMonitorAlarmCondition({
	            data: updatedAlarmConditions[i],
	            callback: function(resp){
	                dispatch(requestDataActions.setRequestSuccess());
	            },
	            error: function(resp){
	                dispatch(requestDataActions.setRequestFail());
	            }
	        });
		}
	}
}

export function deleteMonitorAlarmConditions() {
	return (dispatch, getState) => {
		var state = getState();
		var monitorErrorConditionsData = state.equipmentReducer.monitorErrorConditionsData;
		var monitorWarningConditionsData = state.equipmentReducer.monitorWarningConditionsData;
		var monitorGoodConditionsData = state.equipmentReducer.monitorGoodConditionsData;
		var deleteAlarmConditionIds = [];
		for(var i = 0; i < monitorErrorConditionsData.length; i++) {
			deleteAlarmConditionIds.push({RecId:monitorErrorConditionsData[i].id});
		}
		for(var i = 0; i < monitorWarningConditionsData.length; i++) {
			deleteAlarmConditionIds.push({RecId:monitorWarningConditionsData[i].id});
		}
		for(var i = 0; i < monitorGoodConditionsData.length; i++) {
			deleteAlarmConditionIds.push({RecId:monitorGoodConditionsData[i].id});
		}

		for(var i = 0; i < deleteAlarmConditionIds.length; i++) {
			dispatch(requestDataActions.setRequest());
			oData.deleteMonitorAlarmCondition({
	            data: deleteAlarmConditionIds[i],
	            callback: function(resp){
	                dispatch(requestDataActions.setRequestSuccess());
	            },
	            error: function(resp){
	                dispatch(requestDataActions.setRequestFail());
	            }
	        });
		}
	}
}

export function getMonitorDisk(equipmentId) {
    return dispatch => {
        var filter = [{key:"EquipmentId", value:equipmentId}];
        dispatch(setMonitorDisks([]));
        dispatch(requestDataActions.setRequest());
        oData.getMonitorDisk(filter, function(data){
            if(data.results.length == 0){
                // _this.emit("change");
                dispatch(requestDataActions.setRequestFail());
                return;
            }
            //通过eval() 函数可以将JSON字符串转化为对象
            var dataObj = eval(data.results[0]);
            var diskNames = dataObj.DiskName;
            var diskIds = dataObj.DiskID;
            diskNames = eval("(" + diskNames + ")");
            diskIds = eval("(" + diskIds + ")");

            var monitorDisks = [];
            for(var i = 0; i < diskNames.length; i++) {
                if(diskIds.length == diskNames.length) {
                    monitorDisks.push({name:diskNames[i], oid:diskIds[i]});
                }
                else {
                    monitorDisks.push({name:diskNames[i], oid:""});
                }
            }
            //按磁盘名排序
            monitorDisks.sort(function(a,b){
                return a.name>b.name ? 1 : -1;
            });
            dispatch(setMonitorDisks(monitorDisks));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function getMonitorDiskIONames(equipmentId) {
    return dispatch => {
        var filter = [{key:"EquipmentId", value:equipmentId}];
        dispatch(setMonitorDiskIONames([]));
        dispatch(requestDataActions.setRequest());
        oData.getMonitorDiskIONames(filter, function(data){
            if(data.results.length == 0){
                // _this.emit("change");
                dispatch(requestDataActions.setRequestFail());
                return;
            }else{
            //通过eval() 函数可以将JSON字符串转化为对象
            var dataObj = eval(data.results[0]);
            }
            dispatch(setMonitorDiskIONames(dataObj));
            dispatch(requestDataActions.setRequestSuccess());
        });
    };
}

export function getMonitorProcess(equipmentId, equipmentType) {
    return dispatch => {
        var filter = [{key:"EquipmentId", value:equipmentId}];
        dispatch(setMonitorProcesses([]));
        dispatch(requestDataActions.setRequest());
        oData.getMonitorProcess(filter, function(data){
            if(data.results.length == 0){
                // _this.emit("change");
                dispatch(requestDataActions.setRequestFail());
                return;
            }
            //通过eval() 函数可以将JSON字符串转化为对象
            var dataObj = eval(data.results[0]);
            var processNames = dataObj.ProcessName;
            var processIds = dataObj.ProcessID;
            processNames = eval("(" + processNames + ")");
            processIds = eval("(" + processIds + ")");

            var monitorProcesses = [];
            for(var i = 0; i < processNames.length; i++) {
                if(processIds.length == processNames.length) {
                    if(equipmentType == "Equipment.SNMPUnix" || equipmentType == "Equipment.SNMPWindows") {
                        monitorProcesses.push({name:processNames[i], oid:processIds[i].substring(processIds[i].lastIndexOf(".")+1)});
                    }
                    else {
                        monitorProcesses.push({name:processNames[i], oid:processIds[i]});
                    }
                }
                else {
                    monitorProcesses.push({name:processNames[i], oid:""});
                }
            }
            //按进程名排序
            // monitorProcesses.sort(function(a,b){
            //     return a.name>b.name ? 1 : -1;
            // });
            //按oid排序
            monitorProcesses.sort(function(a,b){
                return a.oid>b.oid ? 1 : -1;
            });
            var filteredMonitorProcesses = [], isRepeated;
            for (var i = 0; i < monitorProcesses.length; i++) {
                isRepeated = false;
                for (var j = 0; j < filteredMonitorProcesses.length; j++) {
                    if (monitorProcesses[i].name == filteredMonitorProcesses[j].name) {
                        isRepeated = true;
                        break;
                    }
                }
                if (!isRepeated) {
                    filteredMonitorProcesses.push(monitorProcesses[i]);
                }
            }
            dispatch(setMonitorProcesses(filteredMonitorProcesses));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function getMonitorNetWork(equipmentId, equipmentType) {
    return dispatch => {
        var filter = [{key:"EQUIPMENT_ID", value:equipmentId}];
        dispatch(setMonitorNetworks([]));
        dispatch(requestDataActions.setRequest());
        oData.getMonitorNetWork(filter, function(data){
            if(data.results.length == 0){
                // _this.emit("change");
                dispatch(requestDataActions.setRequestFail());
                return;
            }
            //通过eval() 函数可以将JSON字符串转化为对象
            var dataObj = eval(data.results[0]);
            var networkNames = dataObj.NetWorkName;
            var networkIds = dataObj.NetWorkID;
            var networkStatus = dataObj.NetWorkStatus;
            networkNames = eval("(" + networkNames + ")");
            networkIds = eval("(" + networkIds + ")");
            networkStatus = eval("(" + networkStatus + ")");

            var monitorNetworks = [];
            for(var i = 0; i < networkNames.length; i++) {
                if(networkIds.length == networkNames.length && networkStatus.length == networkNames.length) {
                    if(equipmentType == "Equipment.SNMPUnix" || equipmentType == "Equipment.SNMPWindows" || equipmentType == "Equipment.Network") {
                        monitorNetworks.push({name:networkNames[i], oid:networkIds[i].substring(networkIds[i].lastIndexOf(".")+1), status:networkStatus[i]});
                    }
                    else {
                        monitorNetworks.push({name:networkNames[i], oid:networkIds[i], status:networkStatus[i]});
                    }
                }
                else {
                    monitorNetworks.push({name:networkNames[i], oid:"", status:""});
                }
            }
            //按网卡名排序
            // monitorNetworks.sort(function(a,b){
            //     return a.name>b.name ? 1 : -1;
            // });
            dispatch(setMonitorNetworks(monitorNetworks));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function getMonitorScripts(filt) {
    return dispatch => {
        var filter = [{key:"EQUIPMENT_ID", value:filt.equipmentId},{key:"FILE_PATH",value:filt.scriptPath}];
        dispatch(setMonitorScripts([]));
        dispatch(requestDataActions.setRequest());
        oData.getMonitorScripts(filter,function(data){
            var results = data.results[0].SCRIPT_NAME;
            if(results){
              results = eval(results);
              var dataresult=[];
              for (var i = 0; i < results.length; i++) {
                var value={
                  SCRIPT_NAME:results[i]
                }
                dataresult.push(value);
              }
              dispatch(setMonitorScripts(dataresult));
            };
            dispatch(requestDataActions.setRequestSuccess());
        })
    }
}


export function getMonitorServiceNames(equipmentId) {
    return dispatch => {
        var filter = [{key:"EQUIPMENT_ID", value:equipmentId}];
        dispatch(setMonitorServices([]));
        dispatch(requestDataActions.setRequest());
        oData.getMonitorServiceNames(filter, function(data){
            if(data.results.length == 0){
                // _this.emit("change");
                dispatch(requestDataActions.setRequestFail());
                return;
            }
            //通过eval() 函数可以将JSON字符串转化为对象
            var serviceNames = eval(data.results);
            //按服务名排序
            serviceNames.sort(function(a,b){
                return a.SERVICE_NAME>b.SERVICE_NAME ? 1 : -1;
            });
            dispatch(setMonitorServices(serviceNames));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function getMonitorNTEventLog(equipmentId) {
    return dispatch => {
        var filter = [{key:"EQUIPMENT_ID", value:equipmentId}];
        dispatch(setMonitorNTEventLogs([]));
        dispatch(requestDataActions.setRequest());
        oData.getMonitorNTEventLog(filter, function(data){
            if(data.results.length == 0){
                // _this.emit("change");
                dispatch(requestDataActions.setRequestFail());
                return;
            }
            //通过eval() 函数可以将JSON字符串转化为对象
            var dataObj = eval(data.results[0]);
            var eventNames = dataObj.EVENT_NAME;
            eventNames = eval("(" + eventNames + ")");
            //按服务名排序
            eventNames.sort(function(a,b){
                return a>b ? 1 : -1;
            });
            var NTEventLogs = [];
            for(var i = 0; i < eventNames.length; i++) {
                NTEventLogs.push({EVENT_NAME: eventNames[i]});
            }
            dispatch(setMonitorNTEventLogs(NTEventLogs));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

//获取监测器属性数据
export function getMonitorsPropertyDataFromID(filter) {
	return dispatch => {
		dispatch(setMonitorsPropertyData(null));
		dispatch(requestDataActions.setRequest());
    var monitorId = filter.monitorId;
    var monitorType = filter.monitorType;
		oData.getMonitorsPropertyDataFromID(monitorId, function(data){
			if(data.results.length == 0){
        dispatch(setGetMonitorsPropertyDataDoneFlag(true));
				dispatch(requestDataActions.setRequestFail());
				return;
			};
			dispatch(setMonitorsPropertyData(data.results[0]));
      if(monitorType == "Mysql"){
        dispatch(getMySqlMonitorPropertyCounterData(monitorId));//获取当前选择的Mysql监测器计数器属性数据
      }else if (monitorType == "Oracle") {
        dispatch(getOracleMonitorPropertyCounterData(monitorId));//获取当前选择的Oracle监测器计数器属性数据
      }else if(monitorType == "Script"){
        dispatch(getMonitorsEntryAliasDataFromID(monitorId))//获取监测器EntryAlias数据
      }else if(monitorType == "SnmpMIB"){
        dispatch(getMonitorSnmpMIBFile())
      }
			dispatch(setGetMonitorsPropertyDataDoneFlag(true));
			dispatch(requestDataActions.setRequestSuccess());
		});
  }
}

//增加监测器属性数据
export function addMonitorsProperty(adddata) {
	return (dispatch,getState) => {
		dispatch(requestDataActions.setRequest());
    var state = getState();
		oData.addMonitorProperty(adddata, function(data){
			if(data){
        if(data.RecId && data.MonitorType){
          if(data.MonitorType == "Mysql"){
            //新增加计数器
            for (var i = 0; i < state.equipmentReducer.mySqlCurrentCounterData.length; i++) {
              var updataObj = {
                monitorid:data.RecId,
                monitortype:'Monitor',
                savename:state.equipmentReducer.mySqlCurrentCounterData[i],
                showname:state.equipmentReducer.mySqlCurrentCounterData[i]
              };
              dispatch(addMonitorPropertyCounterData(updataObj));
            };
          }else if(data.MonitorType == "Oracle"){
            //新增加计数器
            for (var i = 0; i < state.equipmentReducer.OracleCurrentCounterData.length; i++) {
              var updataObj = {
                monitorid:data.RecId,
                monitortype:'Monitor',
                savename:state.equipmentReducer.OracleCurrentCounterData[i],
                showname:state.equipmentReducer.OracleCurrentCounterData[i]
              };
              dispatch(addMonitorPropertyCounterData(updataObj));
            };
          }else if(data.MonitorType == "Script"){
            var updataObj = {
              MonitorId:data.RecId,
              EntryAlias:state.equipmentReducer.monitorScriptsEntryAlias
            };
            dispatch(addMonitorPropertyEntryAliasData(updataObj));
          };
        };
        //保存监测器属性-报警条件的值
  			dispatch(saveMonitorAlarmConditions(data.RecId, data.MonitorType));
  			dispatch(requestDataActions.setRequestSuccess());
  			showDialog("系统提示","监测器增加成功。");
			}else{
        dispatch(requestDataActions.setRequestFail());
        showDialog("系统提示","监测器增加失败。");
      };
      dispatch(setNavigateFromCreateMonitorViewFlag(true));
      window.location.href="#/equipmentManage/MonitorPage";
		});
  }
}
//更新监测器属性数据
export function updataMonitorsProperty(updata) {
	return (dispatch,getState) => {
		dispatch(requestDataActions.setRequest());
    var state = getState();
    if(updata.MonitorType == "Mysql"){
      //先删除原来的计数器
      for (var i = 0; i < state.equipmentReducer.mySqlMonitorsPropertyCounterData.length; i++) {
        dispatch(deleteMonitorPropertyCounterData(state.equipmentReducer.mySqlMonitorsPropertyCounterData[i].RecId));
      };
      //重新增加计数器
      for (var i = 0; i < state.equipmentReducer.mySqlCurrentCounterData.length; i++) {
        var updataObj = {
          monitorid:updata.RecId,
          monitortype:'Monitor',
          savename:state.equipmentReducer.mySqlCurrentCounterData[i],
          showname:state.equipmentReducer.mySqlCurrentCounterData[i]
        };
        dispatch(addMonitorPropertyCounterData(updataObj));
      };
    }else if(updata.MonitorType == "Oracle"){
      //先删除原来的计数器
      for (var i = 0; i < state.equipmentReducer.OracleMonitorsPropertyCounterData.length; i++) {
        dispatch(deleteMonitorPropertyCounterData(state.equipmentReducer.OracleMonitorsPropertyCounterData[i].RecId));
      };
      //重新增加计数器
      for (var i = 0; i < state.equipmentReducer.OracleCurrentCounterData.length; i++) {
        var updataObj = {
          monitorid:updata.RecId,
          monitortype:'Monitor',
          savename:state.equipmentReducer.OracleCurrentCounterData[i],
          showname:state.equipmentReducer.OracleCurrentCounterData[i]
        };
        dispatch(addMonitorPropertyCounterData(updataObj));
      };
    }else if(updata.MonitorType == "Script"){
      //先删除原来的计数器
      for (var i = 0; i < state.equipmentReducer.monitorScriptsEntryAlias.length; i++) {
        dispatch(deleteMonitorPropertyEntryAliasData(state.equipmentReducer.monitorScriptsEntryAlias[i].RecId));
      };
      //重新增加计数器
      for (var i = 0; i < state.equipmentReducer.monitorScriptsEntryAlias.length; i++) {
        var updataObj = {
          MonitorId:updata.RecId,
          EntryAlias:state.equipmentReducer.monitorScriptsEntryAlias[i].EntryAlias
        };
        dispatch(addMonitorPropertyEntryAliasData(updataObj));
      };
    };
		oData.updateMonitorProperty(updata, function(data){
			if(data == "success"){
				//保存监测器属性-报警条件的值
				dispatch(saveMonitorAlarmConditions(updata.RecId, updata.MonitorType));
				dispatch(requestDataActions.setRequestSuccess());
				showDialog("系统提示","监测器修改成功。");
			}else{
				dispatch(requestDataActions.setRequestFail());
				showDialog("系统提示","监测器修改失败。");
			};
      dispatch(setNavigateFromCreateMonitorViewFlag(true));
      window.location.href="#/equipmentManage/MonitorPage";
		});
  }
}
//删除监测器属性数据 {monitorId:'',monitorType=''}
export function deleteMonitorsProperty(deleteData) {
	return (dispatch,getState) => {
		dispatch(requestDataActions.setRequest());
    var state = getState();
    if(deleteData.monitorType == "Mysql"){
      //删除计数器
      for (var i = 0; i < state.equipmentReducer.mySqlMonitorsPropertyCounterData.length; i++) {
        dispatch(deleteMonitorPropertyCounterData(state.equipmentReducer.mySqlMonitorsPropertyCounterData[i].RecId));
      };
    }else if (deleteData.monitorType == "Oracle") {
      //删除计数器
      for (var i = 0; i < state.equipmentReducer.OracleMonitorsPropertyCounterData.length; i++) {
        dispatch(deleteMonitorPropertyCounterData(state.equipmentReducer.OracleMonitorsPropertyCounterData[i].RecId));
      };
    }else if(data.MonitorType == "Script"){
      var updataObj = {
        MonitorId:data.RecId,
        EntryAlias:state.equipmentReducer.monitorScriptsEntryAlias
      };
      dispatch(deleteMonitorPropertyEntryAliasData(updataObj));
    };
		oData.deleteMonitorProperty(deleteData.monitorId, function(data){
			// if(data.results.length == 0){
			// 	dispatch(requestDataActions.setRequestFail());
			// 	return;
			// };
			dispatch(deleteMonitorAlarmConditions());
			dispatch(requestDataActions.setRequestSuccess());
			showDialog("系统提示","监测器删除成功。");
		});
  }
}

//获取MySQL监测器:计数器 所有可选择项数据
export function getMySqlMonitorCounterData(equipmentId) {
	return dispatch => {
		dispatch(setMySqlMonitorCounterData([]));
		dispatch(requestDataActions.setRequest());
    var filter = [{key:"EQUIPMENT_ID", value:equipmentId}];
		oData.getMySqlMonitorCounterData(filter, function(data){
			if(data.results.length == 0){
				dispatch(requestDataActions.setRequestFail());
				return;
			};
			dispatch(setMySqlMonitorCounterData(data.results));
			dispatch(requestDataActions.setRequestSuccess());
		});
  }
}
//获取MySQL监测器:计数器; 属性数据
export function getMySqlMonitorPropertyCounterData(monitorId) {
	return dispatch => {
		dispatch(setMySqlMonitorPropertyCounterData([]));
    dispatch(setMySqlMonitorCurrentCounterData([]));
		dispatch(requestDataActions.setRequest());
		oData.getMySqlMonitorPropertyCounter(monitorId, function(data){
			if(data.results.length == 0){
          dispatch(setGetMySqlMonitorCounterDataDoneFlag(true));
				  dispatch(requestDataActions.setRequestFail());
				  return;
			}else{
        var currentCounterData = [];
        for (var i = 0; i < data.results.length; i++) {
          currentCounterData.push(data.results[i].showname);
        }
        dispatch(setMySqlMonitorCurrentCounterData(currentCounterData));
        dispatch(setMySqlMonitorPropertyCounterData(data.results));
        dispatch(setGetMySqlMonitorCounterDataDoneFlag(true));
      };
			dispatch(requestDataActions.setRequestSuccess());
		});
  }
}
//增加 MySQL监测器:计数器; 属性数据
export function addMonitorPropertyCounterData(updata) {
	return dispatch => {
		// dispatch(requestDataActions.setRequest());
		oData.addMonitorPropertyCounter(updata, function(data){
			// dispatch(requestDataActions.setRequestSuccess());
		});
  }
}
//删除 MySQL监测器:计数器;属性数据
export function deleteMonitorPropertyCounterData(RecId) {
	return dispatch => {
		// dispatch(requestDataActions.setRequest());
		oData.deleteMonitorPropertyCounter(RecId, function(data){
			// dispatch(requestDataActions.setRequestSuccess());
		});
  }
}

//获取 script监测器: 属性EntryAlias数据
export function getMonitorsEntryAliasDataFromID(monitorId) {
	return dispatch => {
		dispatch(setMonitorScriptsEntryAlias([]));
		dispatch(requestDataActions.setRequest());
		oData.getMonitorsEntryAliasDataFromID(monitorId, function(data){
			if(data.results.length == 0){
				dispatch(requestDataActions.setRequestFail());
				return;
			};
			dispatch(setMonitorScriptsEntryAlias(data.results));
			dispatch(requestDataActions.setRequestSuccess());
		});
  }
};

//增加 script监测器:属性数据
export function addMonitorPropertyEntryAliasData(updata) {
	return dispatch => {
		// dispatch(requestDataActions.setRequest());
		oData.addMonitorPropertyEntryAlias(updata, function(data){
			// dispatch(requestDataActions.setRequestSuccess());
		});
  }
}
//删除 script 监测器:属性数据
export function deleteMonitorPropertyEntryAliasData(RecId) {
	return dispatch => {
		// dispatch(requestDataActions.setRequest());
		oData.deleteMonitorPropertyEntryAlias(RecId, function(data){
			// dispatch(requestDataActions.setRequestSuccess());
		});
  }
}

//获取Oracle监测器:计数器 所有可选择项数据
export function getOracleMonitorCounterData(equipmentId) {
	return dispatch => {
		dispatch(setOracleMonitorCounterData([]));
		dispatch(requestDataActions.setRequest());
    var filter = [{key:"EQUIPMENT_ID", value:equipmentId}];
		oData.getOracleMonitorCounterData(filter, function(data){
			if(data.results.length == 0){
				dispatch(requestDataActions.setRequestFail());
				return;
			};
			dispatch(setOracleMonitorCounterData(data.results));
			dispatch(requestDataActions.setRequestSuccess());
		});
  }
}
//获取Oracle监测器:计数器; 属性数据
export function getOracleMonitorPropertyCounterData(monitorId) {
	return dispatch => {
		dispatch(setOracleMonitorPropertyCounterData([]));
    dispatch(setOracleMonitorCurrentCounterData([]));
		dispatch(requestDataActions.setRequest());
		oData.getOracleMonitorPropertyCounter(monitorId, function(data){
			if(data.results.length == 0){
          dispatch(setGetOracleMonitorCounterDataDoneFlag(true));
				  dispatch(requestDataActions.setRequestFail());
				  return;
			}else{
        var currentCounterData = [];
        for (var i = 0; i < data.results.length; i++) {
          currentCounterData.push(data.results[i].showname);
        }
        dispatch(setOracleMonitorCurrentCounterData(currentCounterData));
        dispatch(setOracleMonitorPropertyCounterData(data.results));
        dispatch(setGetOracleMonitorCounterDataDoneFlag(true));
      };
			dispatch(requestDataActions.setRequestSuccess());
		});
  }
}
// //增加 Oracle监测器:计数器; 属性数据
// export function addMonitorPropertyCounterData(updata) {
// 	return dispatch => {
// 		// dispatch(requestDataActions.setRequest());
// 		oData.addMonitorPropertyCounter(updata, function(data){
// 			// dispatch(requestDataActions.setRequestSuccess());
// 		});
//   }
// }
// //删除 Oracle监测器:计数器;属性数据
// export function deleteMonitorPropertyCounterData(RecId) {
// 	return dispatch => {
// 		// dispatch(requestDataActions.setRequest());
// 		oData.deleteMonitorPropertyCounter(RecId, function(data){
// 			// dispatch(requestDataActions.setRequestSuccess());
// 		});
//   }
// }
//
// //增加 Oracle监测器:计数器; 属性数据
// export function addMonitorPropertyEntryAliasData(updata) {
// 	return dispatch => {
// 		// dispatch(requestDataActions.setRequest());
// 		oData.addMonitorPropertyEntryAlias(updata, function(data){
// 			// dispatch(requestDataActions.setRequestSuccess());
// 		});
//   }
// }
// //删除 Oracle监测器:计数器;属性数据
// export function deleteMonitorPropertyEntryAliasData(RecId) {
// 	return dispatch => {
// 		// dispatch(requestDataActions.setRequest());
// 		oData.deleteMonitorPropertyEntryAlias(RecId, function(data){
// 			// dispatch(requestDataActions.setRequestSuccess());
// 		});
//   }
// }
//=================是否显示树============
export const ISSHOWTREE = 'ISSHOWTREE';//获取visio 数据
export function emitIsShowTree(data){
  return {
      type: ISSHOWTREE,
      data
  }
}
export function isShowTree(isShow){
  return dispatch => {
    return dispatch(emitIsShowTree(isShow));
  }
}
//================设置上次选择资源树节点=========================
export const GETOLDRESOURCETREENODE = 'GETOLDRESOURCETREENODE';
export function emitOldResourceTreeNode(checkedNodes) {
    return {
        type: GETOLDRESOURCETREENODE,
        checkedNodes
    }
}

//获取 SNMPMIBFile
export function getMonitorSnmpMIBFile() {
    return dispatch => {

        dispatch(setMonitorSnmpMIBFile([]));
        dispatch(requestDataActions.setRequest());
        oData.getMonitorSnmpMIBFile(function(data){
            var results = data.results;
            if(results.length == 0){
      				dispatch(requestDataActions.setRequestFail());
      				return;
      			};
            var resultsValue=results[0].FileNames;
            if(resultsValue){
              resultsValue = resultsValue.substring(1,resultsValue.length-2).replace(/"/g,'');
              var dataresult=resultsValue.split(",");
              dispatch(setMonitorSnmpMIBFile(dataresult));
            }
            dispatch(requestDataActions.setRequestSuccess());
        })
    }
}

export function getMonitorSnmpMIBCounter(filt) {
    return dispatch => {
        var filter = [{key:"EquipmentId", value:filt.EquipmentId},{key:"FileName", value:filt.FileName}];
        dispatch(setMonitorSnmpMIBCounter([]));
        dispatch(requestDataActions.setRequest());
        oData.getMonitorSnmpMIBCounter(filter, function(data){
            if(data.results.length == 0){
                // _this.emit("change");
                dispatch(requestDataActions.setRequestFail());
                return;
            }
            var counter=data.results[0].Counter;

            if(counter){
              //通过eval() 函数可以将JSON字符串转化为对象
              var counterTemp = eval(counter);
              var counterObj={};      //整理后的对象
              var counterArray=[];  //整理后的数组
              var newParentData = [];
              var newChildrenData = [];
              var newObj=[];
              var newData=[];
              counterTemp=counterTemp[0];
              for(var i in counterTemp){
                counterObj = { name: counterTemp[i].name, pid: counterTemp[i].pid, oid: counterTemp[i].oid };
                counterArray.push(counterObj);
              }
              if(counterArray.length > 0){
                //  for(var j = 0; j < counterArray.length; j++){
                //    if(counterArray[j].pid){
                //      for(var k = 0; k < counterArray.length; k++){
                //        if(counterArray[j].pid == counterArray[k].oid){
                 //
                //           var newChildrenObj = { name: counterArray[k].name, children:[{name: counterArray[j].name}]};
                //           newChildrenData.push(newChildrenObj);
                //          }
                //      }
                //    }else{
                //      for(var g = 0; g < counterArray.length; g++){
                //        if(counterArray[j].oid == counterArray[g].pid){
                //          break;
                //        }
                //      }
                //      var newParentObj = { name: counterArray[j].name};
                //      newParentData.push(newParentObj);
                //    }
                //  }

                 var Twocountarr = [];
                 var resultarr = [];
                 for(var j = 0; j < counterArray.length; j++){
                   if(counterArray[j].pid){
                     Twocountarr.push(counterArray[j]);
                   }else{
                     var data ={
                       name:counterArray[j].name,
                       oid:counterArray[j].oid,
                       children:[]
                     }
                     resultarr.push(data);
                   }
                 };
                 for (var i = 0; i < Twocountarr.length; i++) {
                  var pid = Twocountarr[i].pid;
                  for (var n = 0; n < resultarr.length; n++) {
                    if(resultarr[n].oid == pid){
                      var data ={
                         name:Twocountarr[i].name
                      };
                      resultarr[n].children.push(data);
                    }
                  }
                 }

              }
              dispatch(setMonitorSnmpMIBCounter(resultarr));
            }
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}
