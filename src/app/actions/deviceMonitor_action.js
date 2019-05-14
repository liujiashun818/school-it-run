/**
 * 统一监控平台相关action
 */
var oData = require('../server/odatayft');
import * as requestDataActions from './requestData_action'

export const SET_GROUPALLCOLUMNDATA = 'SET_GROUPALLCOLUMNDATA'
export const SET_GROUPALLSHOWCOLUMNDATA = 'SET_GROUPALLSHOWCOLUMNDATA'
export const SET_GROUPTABLEDATA = 'SET_GROUPTABLEDATA'
export const SET_GROUPTABLECOUNT = 'SET_GROUPTABLECOUNT'
export const SET_TEARMALLMAPDATA = 'SET_TEARMALLMAPDATA'
export const SET_TEARMEQUIPMENTTYPEDATA = 'SET_TEARMEQUIPMENTTYPEDATA'
export const SET_TEARMEQUIPMENTNAMEDATA = 'SET_TEARMEQUIPMENTNAMEDATA'
export const SET_SELECTEDTEARMEQUIPMENTNAMEDATA = 'SET_SELECTEDTEARMEQUIPMENTNAMEDATA'
export const SET_TEARMSUBMAPDATA = 'SET_TEARMSUBMAPDATA'
export const SET_MONITORTREE2 = 'SET_MONITORTREE2'
export const SET_MONITORVIEW = 'SET_MONITORVIEW'
export const SET_PIECHARTMONITORTYPE = 'SET_PIECHARTMONITORTYPE'
export const SET_MONITORNAME = 'SET_MONITORNAME'
export const SET_MONITORGROUPID = 'SET_MONITORGROUPID'
export const SET_MONITORTYPE = 'SET_MONITORTYPE'
export const SET_MONITORTABLECOLUMNS = 'SET_MONITORTABLECOLUMNS'
export const SET_BCLICKTREENODE = 'SET_BCLICKTREENODE'
export const SET_GETTEARMLISTDATATYPE = 'SET_GETTEARMLISTDATATYPE'
export const SET_PIECHARTDATATYPE = 'SET_PIECHARTDATATYPE'
export const SET_TEARMALLMAPDATA_PIECHARTMONITORTYPERADIO = 'SET_TEARMALLMAPDATA_PIECHARTMONITORTYPERADIO'
export const SET_TEARMALLMAPDATA_MONITORTYPERADIO = 'SET_TEARMALLMAPDATA_MONITORTYPERADIO'
export const SET_TEARMEQUIPMENTTYPEDATA_MONITORTYPERADIO = 'SET_TEARMEQUIPMENTTYPEDATA_MONITORTYPERADIO'
export const SET_TEARMEQUIPMENTNAMEDATA_MONITORTYPERADIO = 'SET_TEARMEQUIPMENTNAMEDATA_MONITORTYPERADIO'
export const SET_TEARMSUBMAPDATA_MONITORTYPERADIO = 'SET_TEARMSUBMAPDATA_MONITORTYPERADIO'
export const SET_TEARMMAPDATA_MONITORTYPERADIO = 'SET_TEARMMAPDATA_MONITORTYPERADIO'
export const SET_TEARMMAPDATA_MONITORTYPERADIO_SINGLE = 'SET_TEARMMAPDATA_MONITORTYPERADIO_SINGLE'
export const SET_STATUSGRIDMONITORGROUPID = 'SET_STATUSGRIDMONITORGROUPID'
export const SET_MONITORTABLESELECTEDROWDATA = 'SET_MONITORTABLESELECTEDROWDATA'
export const SET_MONITORTABLESELECTEDROWDATA_FIELD = 'SET_MONITORTABLESELECTEDROWDATA_FIELD'
export const SET_SEARCHAREADATA = 'SET_SEARCHAREADATA'
export const SET_SETTINGSEARCHAREADATA = 'SET_SETTINGSEARCHAREADATA'
export const SET_MONITORTABLECURRENTPAGE = 'SET_MONITORTABLECURRENTPAGE'
export const SET_MONITORTABLENUMPERPAGE = 'SET_MONITORTABLENUMPERPAGE'
export const SET_MONITORTABLEFILTER = 'SET_MONITORTABLEFILTER'
export const SET_MONITORFILTERSTATUS = 'SET_MONITORFILTERSTATUS'
export const SET_FILTEREDGROUPTABLEDATA = 'SET_FILTEREDGROUPTABLEDATA'
export const SET_YFTALARMDATA = 'SET_YFTALARMDATA'
export const SET_YFTALARMRULEDATA = 'SET_YFTALARMRULEDATA'
export const SET_ERRORALARMTEXT = 'SET_ERRORALARMTEXT'
export const SET_WARNINGALARMTEXT = 'SET_WARNINGALARMTEXT'
export const SET_GOODALARMTEXT = 'SET_GOODALARMTEXT'
export const SET_ERRORCONDITIONSDATA = 'SET_ERRORCONDITIONSDATA'
export const SET_SETTINGERRORCONDITIONSDATA = 'SET_SETTINGERRORCONDITIONSDATA'
export const SET_ISORERROR = 'SET_ISORERROR'
export const SET_SETTINGISORERROR = 'SET_SETTINGISORERROR'
export const SET_WARNINGCONDITIONSDATA = 'SET_WARNINGCONDITIONSDATA'
export const SET_SETTINGWARNINGCONDITIONSDATA = 'SET_SETTINGWARNINGCONDITIONSDATA'
export const SET_ISORWARNING = 'SET_ISORWARNING'
export const SET_SETTINGISORWARNING = 'SET_SETTINGISORWARNING'
export const SET_GOODCONDITIONSDATA = 'SET_GOODCONDITIONSDATA'
export const SET_SETTINGGOODCONDITIONSDATA = 'SET_SETTINGGOODCONDITIONSDATA'
export const SET_ISORGOOD = 'SET_ISORGOOD'
export const SET_SETTINGISORGOOD = 'SET_SETTINGISORGOOD'
export const SET_ALARMISSUEDTABLEDATA = 'SET_ALARMISSUEDTABLEDATA'
export const SET_ALARMISSUEDEQUIPMENTTYPE = 'SET_ALARMISSUEDEQUIPMENTTYPE'
export const SET_ALARMISSUEDMONITORTYPE = 'SET_ALARMISSUEDMONITORTYPE'
export const SET_ALARMEVENTDATA = 'SET_ALARMEVENTDATA'
export const SET_ALARMEVENTCOUNT = 'SET_ALARMEVENTCOUNT'
export const SET_SELECTEDALARMEVENT = 'SET_SELECTEDALARMEVENT'
export const SET_ALARMEVENTCURRENTPAGE = 'SET_ALARMEVENTCURRENTPAGE'
export const SET_ALARMEVENTNUMPERPAGE = 'SET_ALARMEVENTNUMPERPAGE'
export const SET_ALARMEVENTFILTER = 'SET_ALARMEVENTFILTER'
export const SET_ALARMEVENTDETAILS = 'SET_ALARMEVENTDETAILS'
export const SET_ALARMEVENTDETAILMODALOPENEDFROMPAGE = 'SET_ALARMEVENTDETAILMODALOPENEDFROMPAGE'
export const SET_ISCREATEWORKORDER = 'SET_ISCREATEWORKORDER'
export const SET_VIDEOLOSSDATA = 'SET_VIDEOLOSSDATA'
export const SET_BSHOWVIDEOLOSSTAB = 'SET_BSHOWVIDEOLOSSTAB'
export const SET_CHANNELINFODATA = 'SET_CHANNELINFODATA'
export const SET_SIPID = 'SET_SIPID'
export const SET_ALARMEVENTPAGE_CURRENTFILTER = 'SET_ALARMEVENTPAGE_CURRENTFILTER'
export const SET_CHILDRENGROUP = 'SET_CHILDRENGROUP'
export const SET_CHILDRENEQUIP = 'SET_CHILDRENEQUIP'
export const SET_SELECTEDDEVICEGROUP = 'SET_SELECTEDDEVICEGROUP'

export function setSelectedDeviceGroup(dGroup){
  return {
    type: SET_SELECTEDDEVICEGROUP,
    dGroup
  }
}

export function setCHildrenEquip(cEquip){
  return {
    type: SET_CHILDRENEQUIP,
    cEquip
  }
}

export function setChildrenGroup(cGroup){
  return {
    type: SET_CHILDRENGROUP,
    cGroup
  }
}

export function setGroupAllColumnData(groupAllColumnData) {
    return {
        type: SET_GROUPALLCOLUMNDATA,
        groupAllColumnData
    }
}

export function setGroupAllShowColumnData(groupAllShowColumnData) {
    return {
        type: SET_GROUPALLSHOWCOLUMNDATA,
        groupAllShowColumnData
    }
}

export function setGroupTableData(groupTableData) {
    return {
        type: SET_GROUPTABLEDATA,
        groupTableData
    }
}

export function setGroupTableCount(groupTableCount) {
    return {
        type: SET_GROUPTABLECOUNT,
        groupTableCount
    }
}

export function setTearmAllMAPData(tearmAllMAPData) {
    return {
        type: SET_TEARMALLMAPDATA,
        tearmAllMAPData
    }
}

export function setTearmEquipmentTypeData(tearmEquipmentTypeData) {
    return {
        type: SET_TEARMEQUIPMENTTYPEDATA,
        tearmEquipmentTypeData
    }
}

export function setTearmEquipmentNameData(tearmEquipmentNameData) {
    return {
        type: SET_TEARMEQUIPMENTNAMEDATA,
        tearmEquipmentNameData
    }
}

export function setSelectedTearmEquipmentNameData(selectedTearmEquipmentNameData) {
    return {
        type: SET_SELECTEDTEARMEQUIPMENTNAMEDATA,
        selectedTearmEquipmentNameData
    }
}

export function setTearmSubMAPData(tearmSubMAPData) {
    return {
        type: SET_TEARMSUBMAPDATA,
        tearmSubMAPData
    }
}

export function setMonitorTree2(monitorTree2) {
    return {
        type: SET_MONITORTREE2,
        monitorTree2
    }
}

export function setMonitorView(monitorView) {
    return {
        type: SET_MONITORVIEW,
        monitorView
    }
}

export function setPieChartMonitorType(pieChartMonitorType) {
    return {
        type: SET_PIECHARTMONITORTYPE,
        pieChartMonitorType
    }
}

export function setMonitorName(monitorName) {
    return {
        type: SET_MONITORNAME,
        monitorName
    }
}

export function setMonitorGroupId(monitorGroupId) {
    return {
        type: SET_MONITORGROUPID,
        monitorGroupId
    }
}

export function setMonitorType(monitorType) {
    return {
        type: SET_MONITORTYPE,
        monitorType
    }
}

export function setMonitorTableColumns(monitorTableColumns) {
    return {
        type: SET_MONITORTABLECOLUMNS,
        monitorTableColumns
    }
}

export function setbClickTreeNode(bClickTreeNode) {
    return {
        type: SET_BCLICKTREENODE,
        bClickTreeNode
    }
}

export function setGetTearmListDataType(getTearmListDataType) {
    return {
        type: SET_GETTEARMLISTDATATYPE,
        getTearmListDataType
    }
}

export function setPieChartDataType(pieChartDataType) {
    return {
        type: SET_PIECHARTDATATYPE,
        pieChartDataType
    }
}

export function setTearmAllMAPData_pieChartMonitorTypeRadio(tearmAllMAPData_pieChartMonitorTypeRadio) {
    return {
        type: SET_TEARMALLMAPDATA_PIECHARTMONITORTYPERADIO,
        tearmAllMAPData_pieChartMonitorTypeRadio
    }
}

export function setTearmAllMAPData_monitorTypeRadio(tearmAllMAPData_monitorTypeRadio) {
    return {
        type: SET_TEARMALLMAPDATA_MONITORTYPERADIO,
        tearmAllMAPData_monitorTypeRadio
    }
}

export function setTearmEquipmentTypeData_monitorTypeRadio(tearmEquipmentTypeData_monitorTypeRadio) {
    return {
        type: SET_TEARMEQUIPMENTTYPEDATA_MONITORTYPERADIO,
        tearmEquipmentTypeData_monitorTypeRadio
    }
}

export function setTearmEquipmentNameData_monitorTypeRadio(tearmEquipmentNameData_monitorTypeRadio) {
    return {
        type: SET_TEARMEQUIPMENTNAMEDATA_MONITORTYPERADIO,
        tearmEquipmentNameData_monitorTypeRadio
    }
}

export function setTearmSubMAPData_monitorTypeRadio(tearmSubMAPData_monitorTypeRadio) {
    return {
        type: SET_TEARMSUBMAPDATA_MONITORTYPERADIO,
        tearmSubMAPData_monitorTypeRadio
    }
}

export function setTearmMAPData_monitorTypeRadio(tearmMAPData_monitorTypeRadio) {
    return {
        type: SET_TEARMMAPDATA_MONITORTYPERADIO,
        tearmMAPData_monitorTypeRadio
    }
}

export function setTearmMAPData_monitorTypeRadio_single(tearmMAPData_monitorTypeRadio_single, index) {
    return {
        type: SET_TEARMMAPDATA_MONITORTYPERADIO_SINGLE,
        tearmMAPData_monitorTypeRadio_single,
        index
    }
}

export function setStatusGridMonitorGroupId(statusGridMonitorGroupId) {
    return {
        type: SET_STATUSGRIDMONITORGROUPID,
        statusGridMonitorGroupId
    }
}

export function setMonitorTableSelectedRowData(monitorTableSelectedRowData) {
    return {
        type: SET_MONITORTABLESELECTEDROWDATA,
        monitorTableSelectedRowData
    }
}

export function setMonitorTableSelectedRowDataField(LAG, BRAND) {
    return {
        type: SET_MONITORTABLESELECTEDROWDATA_FIELD,
        LAG,
        BRAND
    }
}

export function setSearchAreaData(searchAreaData) {
    return {
        type: SET_SEARCHAREADATA,
        searchAreaData
    }
}

export function setSettingSearchAreaData(settingSearchAreaData) {
    return {
        type: SET_SETTINGSEARCHAREADATA,
        settingSearchAreaData
    }
}

export function setMonitorTableCurrentPage(monitorTableCurrentPage) {
    return {
        type: SET_MONITORTABLECURRENTPAGE,
        monitorTableCurrentPage
    }
}

export function setMonitorTableNumPerPage(monitorTableNumPerPage) {
    return {
        type: SET_MONITORTABLENUMPERPAGE,
        monitorTableNumPerPage
    }
}

export function setMonitorTableFilter(monitorTableFilter) {
    return {
        type: SET_MONITORTABLEFILTER,
        monitorTableFilter
    }
}

export function setMonitorFilterStatus(monitorFilterStatus) {
    return {
        type: SET_MONITORFILTERSTATUS,
        monitorFilterStatus
    }
}

export function setFilteredGroupTableData(filteredGroupTableData) {
    return {
        type: SET_FILTEREDGROUPTABLEDATA,
        filteredGroupTableData
    }
}

export function setYFTAlarmData(yftAlarmData) {
    return {
        type: SET_YFTALARMDATA,
        yftAlarmData
    }
}

export function setYFTAlarmRuleData(yftAlarmRuleData) {
    return {
        type: SET_YFTALARMRULEDATA,
        yftAlarmRuleData
    }
}

export function setErrorAlarmText(errorAlarmText) {
    return {
        type: SET_ERRORALARMTEXT,
        errorAlarmText
    }
}

export function setWarningAlarmText(warningAlarmText) {
    return {
        type: SET_WARNINGALARMTEXT,
        warningAlarmText
    }
}

export function setGoodAlarmText(goodAlarmText) {
    return {
        type: SET_GOODALARMTEXT,
        goodAlarmText
    }
}

export function setErrorConditionsData(errorConditionsData) {
    return {
        type: SET_ERRORCONDITIONSDATA,
        errorConditionsData
    }
}

export function setSettingErrorConditionsData(settingErrorConditionsData) {
    return {
        type: SET_SETTINGERRORCONDITIONSDATA,
        settingErrorConditionsData
    }
}

export function setIsOrError(isOrError) {
    return {
        type: SET_ISORERROR,
        isOrError
    }
}

export function setSettingIsOrError(settingIsOrError) {
    return {
        type: SET_SETTINGISORERROR,
        settingIsOrError
    }
}

export function setWarningConditionsData(warningConditionsData) {
    return {
        type: SET_WARNINGCONDITIONSDATA,
        warningConditionsData
    }
}

export function setSettingWarningConditionsData(settingWarningConditionsData) {
    return {
        type: SET_SETTINGWARNINGCONDITIONSDATA,
        settingWarningConditionsData
    }
}

export function setIsOrWarning(isOrWarning) {
    return {
        type: SET_ISORWARNING,
        isOrWarning
    }
}

export function setSettingIsOrWarning(settingIsOrWarning) {
    return {
        type: SET_SETTINGISORWARNING,
        settingIsOrWarning
    }
}

export function setGoodConditionsData(goodConditionsData) {
    return {
        type: SET_GOODCONDITIONSDATA,
        goodConditionsData
    }
}

export function setSettingGoodConditionsData(settingGoodConditionsData) {
    return {
        type: SET_SETTINGGOODCONDITIONSDATA,
        settingGoodConditionsData
    }
}

export function setIsOrGood(isOrGood) {
    return {
        type: SET_ISORGOOD,
        isOrGood
    }
}

export function setSettingIsOrGood(settingIsOrGood) {
    return {
        type: SET_SETTINGISORGOOD,
        settingIsOrGood
    }
}

export function setAlarmIssuedTableData(alarmIssuedTableData) {
    return {
        type: SET_ALARMISSUEDTABLEDATA,
        alarmIssuedTableData
    }
}

export function setAlarmIssuedEquipmentType(alarmIssuedEquipmentType) {
    return {
        type: SET_ALARMISSUEDEQUIPMENTTYPE,
        alarmIssuedEquipmentType
    }
}

export function setAlarmIssuedMonitorType(alarmIssuedMonitorType) {
    return {
        type: SET_ALARMISSUEDMONITORTYPE,
        alarmIssuedMonitorType
    }
}

export function setAlarmEventData(alarmEventData) {
    return {
        type: SET_ALARMEVENTDATA,
        alarmEventData
    }
}

export function setAlarmEventCount(alarmEventCount) {
    return {
        type: SET_ALARMEVENTCOUNT,
        alarmEventCount
    }
}

export function setSelectedAlarmEvent(selectedAlarmEvent) {
    return {
        type: SET_SELECTEDALARMEVENT,
        selectedAlarmEvent
    }
}

export function setAlarmEventCurrentPage(alarmEventCurrentPage) {
    return {
        type: SET_ALARMEVENTCURRENTPAGE,
        alarmEventCurrentPage
    }
}

export function setAlarmEventNumPerPage(alarmEventNumPerPage) {
    return {
        type: SET_ALARMEVENTNUMPERPAGE,
        alarmEventNumPerPage
    }
}

export function setAlarmEventFilter(alarmEventFilter) {
    return {
        type: SET_ALARMEVENTFILTER,
        alarmEventFilter
    }
}

export function setAlarmEventDetails(alarmEventDetails) {
    return {
        type: SET_ALARMEVENTDETAILS,
        alarmEventDetails
    }
}

export function setAlarmEventDetailModalOpenedFromPage(alarmEventDetailModalOpenedFromPage) {
    return {
        type: SET_ALARMEVENTDETAILMODALOPENEDFROMPAGE,
        alarmEventDetailModalOpenedFromPage
    }
}

export function setIsCreateWorkOrder(isCreateWorkOrder) {
    return {
        type: SET_ISCREATEWORKORDER,
        isCreateWorkOrder
    }
}

export function setVideoLossData(videoLossData) {
    return {
        type: SET_VIDEOLOSSDATA,
        videoLossData
    }
}

export function setbShowVideoLossTab(bShowVideoLossTab) {
    return {
        type: SET_BSHOWVIDEOLOSSTAB,
        bShowVideoLossTab
    }
}

export function setChannelInfoData(channelInfoData) {
    return {
        type: SET_CHANNELINFODATA,
        channelInfoData
    }
}

export function setSipid(sipid) {
    return {
        type: SET_SIPID,
        sipid
    }
}

export function setAlarmEventPageCurrentFilter(currentFilter) {
    return {
        type: SET_ALARMEVENTPAGE_CURRENTFILTER,
        currentFilter
    }
}

function receiveGetGroupList(data) {
    return (dispatch, getState) => {
        var state = getState();
        if(data.results.length == 0){
            dispatch(requestDataActions.setRequestFail());
            // _this.emit("change");
            return;
        };
        var tempdata = data.results[0];
        //通过eval() 函数可以将JSON字符串转化为对象
        var dataobj = eval(tempdata);
        var aLL_DATA = dataobj.ALL_DATA;
        aLL_DATA = eval('('+aLL_DATA+')');//将json对像转成数组
        // _this.groupAllColumnData=aLL_DATA;//组列表全部列数据
        dispatch(setGroupAllColumnData(aLL_DATA));
        var monitorTableColumns = [];
        for(var i=0; i<state.deviceMonitorReducer.groupAllColumnData.length; i++) {
            if(state.deviceMonitorReducer.groupAllColumnData[i].isshow == "1"){
                monitorTableColumns.push(state.deviceMonitorReducer.groupAllColumnData[i]);
            }
        }
        dispatch(setMonitorTableColumns(monitorTableColumns));

        var sHOW_DATA = dataobj.SHOW_DATA;
        sHOW_DATA = eval('('+sHOW_DATA+')');//将json对像转成数组
        // _this.groupAllShowColumnData=sHOW_DATA;//组列表当前显的列数据
        dispatch(setGroupAllShowColumnData(sHOW_DATA));

        var tABLE_DATA = dataobj.TABLE_DATA;
        tABLE_DATA = eval('('+tABLE_DATA+')');//将json对像转成数组
        // _this.groupTableData=tABLE_DATA;//组列表当前显的数据
        // _this.groupTableCount = eval(dataobj.COUNT);
        // _this.filteredGroupTableData = tABLE_DATA;
        dispatch(setGroupTableData(tABLE_DATA));
        dispatch(setGroupTableCount(eval(dataobj.COUNT)));
        dispatch(setFilteredGroupTableData(tABLE_DATA));

        var aLL_MAP = dataobj.ALL_MAP;
        aLL_MAP = eval('('+aLL_MAP+')');//将json对像转成数组
        // _this.tearmAllMAPData=aLL_MAP;
        dispatch(setTearmAllMAPData(aLL_MAP));

        // _this.monitorFilterStatus = "all";
        dispatch(requestDataActions.setRequestSuccess());
        // _this.emit("change");
    }
}

function oDataGetGroupList(filter) {
    return dispatch => {
        oData.getGroupList(filter, data => dispatch(receiveGetGroupList(data)));
    }
}

export function getGroupListData(filter) {
    return dispatch => {
        dispatch(setbClickTreeNode(false));
        dispatch(setTearmAllMAPData([]));
        dispatch(setGroupAllColumnData([]));
        dispatch(setGroupTableData([]));
        dispatch(setGroupAllShowColumnData([]));
        for(var i = 0; i < filter.length; i++) {
            if(filter[i].key == "TYPE") {
                dispatch(setMonitorType(filter[i].value));
                break;
            }
        }
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetGroupList(filter));
    }
}

export function getGroupListDataByClickTree(filter) {
    return (dispatch, getState) => {
        var state = getState();
        // if(state.deviceMonitorReducer.bClickTreeNode) {
            // this.bClickTreeNode = false;
            dispatch(setbClickTreeNode(false));
            dispatch(setTearmAllMAPData([]));
            dispatch(setGroupAllColumnData([]));
            dispatch(setGroupTableData([]));
            dispatch(setGroupAllShowColumnData([]));
            for(var i = 0; i < filter.length; i++) {
                if(filter[i].key == "TYPE") {
                    dispatch(setMonitorType(filter[i].value));
                    break;
                }
            }
            dispatch(requestDataActions.setRequest());
            return dispatch(oDataGetGroupList(filter));
        // }
    }
}

function receiveGetTearmList(filter, data) {
    return (dispatch, getState) => {
        var state = getState();
        if(data.results.length == 0){
            dispatch(requestDataActions.setRequestFail());
            // _this.emit("change");
            return;
        };
        var tempdata = data.results[0];
        //通过eval() 函数可以将JSON字符串转化为对象
        var dataobj = eval(tempdata);
        var aLL_MAP = dataobj.ALL_MAP;
        aLL_MAP = eval('('+aLL_MAP+')');//将json对像转成数组
        switch (state.deviceMonitorReducer.getTearmListDataType) {
            case 0:
                // _this.tearmAllMAPData=aLL_MAP;
                dispatch(setTearmAllMAPData(aLL_MAP));
                break;
            case 1:
                // _this.tearmAllMAPData_pieChartMonitorTypeRadio=aLL_MAP;
                dispatch(setTearmAllMAPData_pieChartMonitorTypeRadio(aLL_MAP));
                break;
            case 2:
                // _this.tearmAllMAPData_monitorTypeRadio=aLL_MAP;
                dispatch(setTearmAllMAPData_monitorTypeRadio(aLL_MAP));
                break;
            default:
                // _this.tearmAllMAPData=aLL_MAP;
                dispatch(setTearmAllMAPData(aLL_MAP));
                break;
        }
        var eQUIPMENT_NAME = dataobj.EQUIPMENT_NAME;
        eQUIPMENT_NAME = eval('('+eQUIPMENT_NAME+')');//将json对像转成数组
        // _this.getTearmListDataType==0 ? _this.tearmEquipmentNameData=eQUIPMENT_NAME : _this.tearmEquipmentNameData_monitorTypeRadio=eQUIPMENT_NAME;
        state.deviceMonitorReducer.getTearmListDataType==0 ? dispatch(setTearmEquipmentNameData(eQUIPMENT_NAME)) : dispatch(setTearmEquipmentNameData_monitorTypeRadio(eQUIPMENT_NAME));
        var eQUIPMENT_TYPE = dataobj.EQUIPMENT_TYPE;
        eQUIPMENT_TYPE = eval('('+eQUIPMENT_TYPE+')');//将json对像转成数组
        // _this.getTearmListDataType==0 ? _this.tearmEquipmentTypeData=eQUIPMENT_TYPE : _this.tearmEquipmentTypeData_monitorTypeRadio=eQUIPMENT_TYPE;
        state.deviceMonitorReducer.getTearmListDataType==0 ? dispatch(setTearmEquipmentTypeData(eQUIPMENT_TYPE)) : dispatch(setTearmEquipmentTypeData_monitorTypeRadio(eQUIPMENT_TYPE));
        var sUB_MAP = dataobj.SUB_MAP;
        sUB_MAP = eval('('+sUB_MAP+')');//将json对像转成数组
        // _this.getTearmListDataType==0 ? _this.tearmSubMAPData=sUB_MAP : _this.tearmSubMAPData_monitorTypeRadio=sUB_MAP;
        state.deviceMonitorReducer.getTearmListDataType==0 ? dispatch(setTearmSubMAPData(sUB_MAP)) : dispatch(setTearmSubMAPData_monitorTypeRadio(sUB_MAP));
        // if(_this.getTearmListDataType != 2) {
        //     _this.tearmMAPData_monitorTypeRadio = sUB_MAP;
        // }
        if(state.deviceMonitorReducer.getTearmListDataType != 2) {
            // _this.tearmMAPData_monitorTypeRadio = sUB_MAP;
            dispatch(setTearmMAPData_monitorTypeRadio(sUB_MAP));
        }
        else {
            // for(var i = 0; i < _this.tearmMAPData_monitorTypeRadio.length; i++) {
            //     if(_this.tearmMAPData_monitorTypeRadio[i].GROUPID == filter[0].value) {
            //         _this.tearmMAPData_monitorTypeRadio[i].good = aLL_MAP.good;
            //         _this.tearmMAPData_monitorTypeRadio[i].error = aLL_MAP.error;
            //         _this.tearmMAPData_monitorTypeRadio[i].warning = aLL_MAP.warning;
            //         _this.tearmMAPData_monitorTypeRadio[i].sum = aLL_MAP.sum;
            //         break;
            //     }
            // }
            for(var i = 0; i < state.deviceMonitorReducer.tearmMAPData_monitorTypeRadio.length; i++) {
                if(state.deviceMonitorReducer.tearmMAPData_monitorTypeRadio[i].GROUPID == filter[0].value) {
                    dispatch(setTearmMAPData_monitorTypeRadio_single(aLL_MAP, i));
                    break;
                }
            }
        }

        for (var i = 0; i < filter.length; i++) {
            if(filter[i].bSearchBox_monitorType == "true"){
                // _this.onSetMonitorName(filter[i].groupName+"("+(parseInt(aLL_MAP.good)+parseInt(aLL_MAP.warning))+"/"+parseInt(aLL_MAP.sum)+")");
                dispatch(setMonitorName(filter[i].groupName+"("+(parseInt(aLL_MAP.good)+parseInt(aLL_MAP.warning))+"/"+parseInt(aLL_MAP.sum)+")"));
            }
        }
        dispatch(requestDataActions.setRequestSuccess());
        // _this.emit("change");
    }
}

function oDataGetTearmList(filter) {
    return dispatch => {
		oData.getTearmList(filter, data => dispatch(receiveGetTearmList(filter, data)));
    }
}

export function getTearmListData(filter) {
    return dispatch => {
        dispatch(setTearmAllMAPData([]));
        dispatch(setTearmAllMAPData_pieChartMonitorTypeRadio([]));
        dispatch(setTearmAllMAPData_monitorTypeRadio([]));
        for(var i = 0; i < filter.length; i++) {
            if(filter[i].key == "TYPE") {
                dispatch(setMonitorType(filter[i].value));
                break;
            }
        }
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetTearmList(filter));
    }
}

function receiveSetDisplayOrder(data) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        };
        var dataObj = eval(data.results[0]);
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
    }
}

function oDataSetDisplayOrder(filter) {
    return dispatch => {
		oData.setDisplayOrder(filter, data => dispatch(receiveSetDisplayOrder(data)));
    }
}

export function setDisplayOrder(columns) {
    return dispatch => {
        dispatch(setGroupAllColumnData(columns));
        var filter = [{key:"DISPLAYORDER",value:JSON.stringify(columns)}];
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataSetDisplayOrder(filter));
    }
}

function receiveGetYFTAlarm(data) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        }
        //通过eval() 函数可以将JSON字符串转化为对象
        var dataObj = eval(data.results[0]);
        var alarms = dataObj.ALARMS;
        var alarmConfig = dataObj.ALARMCONFIG;
        // _this.yftAlarmData = eval("(" + alarms + ")");
        // _this.yftAlarmRuleData = eval("(" + alarmConfig + ")");
        dispatch(setYFTAlarmData(eval("(" + alarms + ")")));
        dispatch(setYFTAlarmRuleData(eval("(" + alarmConfig + ")")));
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
    }
}

function oDataGetYFTAlarm() {
    return dispatch => {
		oData.getYFTAlarm(data => dispatch(receiveGetYFTAlarm(data)));
    }
}

export function getYFTAlarm() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetYFTAlarm());
    }
}

function receiveSetYFTAlarm(data) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        }
        //通过eval() 函数可以将JSON字符串转化为对象
        var dataObj = eval(data.results[0]);
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
        showDialog("提示","保存完成");
        dispatch(getYFTAlarm());
    }
}

function oDataSetYFTAlarm(params) {
    return dispatch => {
		oData.setYFTAlarm(params, data => dispatch(receiveSetYFTAlarm(data)));
    }
}

export function setYFTAlarm(params) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataSetYFTAlarm(params));
    }
}

function showDialog(title,content) {
    setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = title;
          document.getElementById('publicMessageModalcontent').innerHTML = content;
          $('#publicMessageModal').modal('show');
        },100);
}

function receiveGetAlarmIssued(data) {
    return dispatch => {
        if(data.results.length == 0){
            dispatch(requestDataActions.setRequestFail());
            showDialog("提示","获取告警规则失败。");
            // _this.emit("change");
            return;
        }
        //通过eval() 函数可以将JSON字符串转化为对象
        var dataObj = eval(data.results[0]);
        var alarmIssued = dataObj.ALARMISSUED;
        var equipmentType = dataObj.EQUIPMENTTYPE;
        var monitorType = dataObj.MONITORTYPE;
        // _this.alarmIssuedTableData = eval("(" + alarmIssued + ")");
        // _this.alarmIssuedEquipmentType = eval("(" + equipmentType + ")");
        // _this.alarmIssuedMonitorType = eval("(" + monitorType + ")");
        dispatch(setAlarmIssuedTableData(eval("(" + alarmIssued + ")")));
        dispatch(setAlarmIssuedEquipmentType(eval("(" + equipmentType + ")")));
        dispatch(setAlarmIssuedMonitorType(eval("(" + monitorType + ")")));
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
    }
}

function oDataGetAlarmIssued() {
    return dispatch => {
		oData.getAlarmIssued(data => dispatch(receiveGetAlarmIssued(data)));
    }
}

export function getAlarmIssued() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetAlarmIssued());
    }
}

function receiveSetAlarmIssued(response) {
    return dispatch => {
        if(response) {
            //console.log("保存成功");
            // _this.emit("change");
            dispatch(requestDataActions.setRequestSuccess());
        }
        else {
            //console.log("保存失败");
            dispatch(requestDataActions.setRequestFail());
            showDialog("提示","保存告警规则失败。");
            // _this.emit("change");
        }
    }
}

function oDataSetAlarmIssued(params) {
    return dispatch => {
		oData.setAlarmIssued(params, response => dispatch(receiveSetAlarmIssued(response)));
    }
}

export function setAlarmIssued(params) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataSetAlarmIssued(params));
    }
}

function receiveDeleteAlarmIssued(response) {
    return dispatch => {
        if(response) {
            //console.log("删除成功");
            // _this.emit("change");
            dispatch(requestDataActions.setRequestSuccess());
        }
        else {
            //console.log("删除失败");
            dispatch(requestDataActions.setRequestFail());
            showDialog("提示","删除告警规则失败。");
            // _this.emit("change");
        }
    }
}

function oDataDeleteAlarmIssued(params) {
    return dispatch => {
		oData.deleteAlarmIssued(params, response => dispatch(receiveDeleteAlarmIssued(response)));
    }
}

export function deleteAlarmIssued(params) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataDeleteAlarmIssued(params));
    }
}

function receiveGetAlarmEvent(data) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        };
        var result = data.results[0];
        var dataobj = eval(result);
        // _this.alarmEventData = eval(dataobj.EVENTDATA);
        // _this.alarmEventCount = eval(dataobj.COUNT);
        // console.log(dataobj);
        dispatch(setAlarmEventData(eval(dataobj.EVENTDATA)));
        dispatch(setAlarmEventCount(eval(dataobj.COUNT)));
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
    }
}

function oDataGetAlarmEvent(filter) {
    return dispatch => {
		oData.getAlarmEvent(filter, data => dispatch(receiveGetAlarmEvent(data)));
    }
}

export function getAlarmEvent(filter) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetAlarmEvent(filter));
    }
}

function receiveGetAlarmDetails(data) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        };
        var result = data.results[0];
        var dataobj = eval(result);
        // _this.alarmEventDetails = eval(dataobj.ALARMEVENTDETAIL);
        dispatch(setAlarmEventDetails(eval(dataobj.ALARMEVENTDETAIL)));
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
    }
}

function oDataGetAlarmDetails(filter) {
    return dispatch => {
		oData.getAlarmDetails(filter, data => dispatch(receiveGetAlarmDetails(data)));
    }
}

export function getAlarmDetails(filter) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetAlarmDetails(filter));
    }
}

function receiveUpdateAlarmEventStatus(data) {
    return (dispatch,getState) => {
        var state = getState();
        dispatch(requestDataActions.setRequestSuccess());
        var filter = state.deviceMonitorReducer.alarmEventCurrentFilter;
        if(filter){
          dispatch(getAlarmEvent(filter));
        };
    }
}

function oDataUpdateAlarmEventStatus(dateObjec) {
    return dispatch => {
		oData.updateAlarmEventStatus(dateObjec, data => dispatch(receiveUpdateAlarmEventStatus(data)));
    }
}

export function updateAlarmEventStatus(dateObjec) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataUpdateAlarmEventStatus(dateObjec));
    }
}

function receiveGetIsCreateWorkOrder(data,that) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        };
        // _this.isCreateWorkOrder = data.results[0].WORKORDERCOUNT;
        dispatch(setIsCreateWorkOrder(data.results[0].WORKORDERCOUNT));
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
        if(that != null && that != ""){
          that.setState({bTouchOrder: true});
        }
    }
}

function oDataGetIsCreateWorkOrder(gbcode,that) {
    return dispatch => {
      if(that != null && that != ""){
        oData.getIsCreateWorkOrder(gbcode, data => dispatch(receiveGetIsCreateWorkOrder(data,that)));
      }else{
        oData.getIsCreateWorkOrder(gbcode, data => dispatch(receiveGetIsCreateWorkOrder(data)));
      };
    }
}

export function get_isCreateWorkOrder(gbcode,that) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        if(that != null && that != ""){
          return dispatch(oDataGetIsCreateWorkOrder(gbcode,that));
        }else{
          return dispatch(oDataGetIsCreateWorkOrder(gbcode));
        };
    }
}

function receiveGetVideoLoss(data) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        };
        var result = data.results[0];
        var dataobj = eval(result);
        // _this.videoLossData = eval(dataobj.VIDEOLOSSDATA);
        dispatch(setVideoLossData(eval(dataobj.VIDEOLOSSDATA)));
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
    }
}

function oDataGetVideoLoss(filter) {
    return dispatch => {
		oData.getVideoLoss(filter, data => dispatch(receiveGetVideoLoss(data)));
    }
}

export function get_videoLoss(filter) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetVideoLoss(filter));
    }
}

function receiveGetChannelInfo(data) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        };
        var result = data.results[0];
        var dataobj = eval(result);
        // _this.channelInfoData = eval(dataobj.VIDEODATA);
        dispatch(setChannelInfoData(eval(dataobj.VIDEODATA)));
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
    }
}

function oDataGetChannelInfo(filter) {
    return dispatch => {
		oData.getChannelInfo(filter, data => dispatch(receiveGetChannelInfo(data)));
    }
}

export function get_channelInfo(filter) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetChannelInfo(filter));
    }
}

function receiveGetWorkOrderToMonitorData(data) {
    return dispatch => {
        if(data.results.length == 0) {
            dispatch(requestDataActions.setRequestFail());
            return;
        }
        var baseData = data.results[0].BASEDATA;
        baseData = eval(baseData);
        var otherData = data.results[0].OTHERDATA;
        otherData = eval(otherData);
        // that.videoLossData = [];
        dispatch(setVideoLossData([]));
        if(tp == "摄像机"){
          var List = [];
          for(var i=0;i<otherData.length;i++){
            var param = {
              no:i+1,
              lostduration:otherData[i].LOSTDURATION,
              loststartime:otherData[i].LOSTSTARTTIME,
              lostendtime:otherData[i].LOSTENDTIME
            };
            List.push(param);
          };
        //   that.videoLossData = List;
          dispatch(setVideoLossData(List));
        };
        // that.monitorTableSelectedRowData = baseData[0];
        // that.monitorTableSelectedRowData.LAG = gb;
        // that.monitorTableSelectedRowData.BRAND = baseData[0].BASETYPE;
        dispatch(setMonitorTableSelectedRowData(baseData[0]));
        dispatch(setMonitorTableSelectedRowDataField(gb, baseData[0].BASETYPE));
        // that.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
        $(".operationMonitorInfoDiv").find("#deviceInfoModal").modal("show");
    }
}

function oDataGetWorkOrderToMonitorData(filter) {
    return dispatch => {
		oData.getWorkOrderToMonitorData(filter, data => dispatch(receiveGetWorkOrderToMonitorData(data)));
    }
}

export function getWorkOrderToMonitorData(row) {
    return dispatch => {
        var gb = row.nat;
        var tp = row.pTypeName;
        if(tp!="NVR" && tp!="DVR" && tp!="IPSAN" && tp!="摄像机" && tp!="编码器"){
          showDialog("提示","设备类型不存在");
          return false;
        };
        var filter = [{key:"GB",value:gb},{key:"EQUIPMENTTYPE",value:tp}];
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetWorkOrderToMonitorData(filter));
    }
}

function oDataInsertUserFeedBack(param) {
    return dispatch => {
		oData.insertUserFeedBack({
            data: param.data,
            callback: function(resp){
                dispatch(requestDataActions.setRequestSuccess());
                if(param.callback) param.callback(resp);
                // if(!param.noChange) _this.emit("change");
            },
            error: function(resp){
                dispatch(requestDataActions.setRequestFail());
                if(param.error) param.error(resp);
                // if(!param.noChange) _this.emit("change");
            },
        });
    }
}

export function setUserFeedback(param) {
    return dispatch => {
        if(!param.data) return;
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataInsertUserFeedBack(param));
    }
}

function oDataUpdateUserFeedBack(param) {
    return dispatch => {
		oData.insertUserFeedBack({
            data: param.data,
            callback: function(resp){
                dispatch(requestDataActions.setRequestSuccess());
                if(param.callback) param.callback(resp);
                // if(!param.noChange) _this.emit("change");
            },
            error: function(resp){
                dispatch(requestDataActions.setRequestFail());
                if(param.error) param.error(resp);
                // if(!param.noChange) _this.emit("change");
            },
        });
    }
}

export function setUserFeedbackReset(param) {
    return dispatch => {
        if(!param.data) return;
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataUpdateUserFeedBack(param));
    }
}

export function clearMonitorTableViewData() {
  return dispatch => {
    dispatch(setGroupAllColumnData([]));
    dispatch(setGroupTableData([]));
    dispatch(setGroupAllShowColumnData([]));
    dispatch(setGroupTableCount(0));
  }
}

export function clearAlarmEventDesViewData() {
  return dispatch => {
    dispatch(setAlarmEventData([]));
    dispatch(setAlarmEventCount(0));
  }
}

function receiveChildrenGroups(data){
  return dispatch => {
    // console.log(data);
    dispatch(setChildrenGroup(data.results));
  }
}

function oDataGetChildrenGroups(pid) {
  return dispatch => {
    oData.getChildrenGroups(pid,data => dispatch(receiveChildrenGroups(data)));
  }
}

export function getChildrenGroups(pid) {
  return dispatch => {
    dispatch(oDataGetChildrenGroups(pid));
  }
}

function receiveChildrenEquip(data){
  return dispatch => {
    // console.log(data);
    dispatch(setCHildrenEquip(data.results));
  }
}

function oDataGetChildrenEquip(pid) {
  return dispatch => {
    oData.getChildrenEquips(pid,data => dispatch(receiveChildrenEquip(data)));
  }
}

export function getChildrenEquip(pid) {
  return dispatch => {
    dispatch(oDataGetChildrenEquip(pid));
  }
}

export function updateGroupSorter(param, monitorTreeObj){
  return dispatch => {
    oData.updateGroupSorter(param,function(){
        monitorTreeObj.props.onClickRefresh("");
        showDialog("提示","保存成功。");
    })
  }
}

export function updateEquipmentSorter(param, monitorTreeObj){
  return dispatch => {
    oData.updateEquipmentSorter(param,function(){
        monitorTreeObj.props.onClickRefresh("");
        showDialog("提示","保存成功。");
    })
  }
}

export function changeGroupStatus(param, monitorTreeObj){
  return dispatch => {
    oData.changeGroupStatus(param,function(){
        monitorTreeObj.props.onClickRefresh("");
        showDialog("提示","修改成功。");
    })
  }
}

export function updateEccGroup(param, monitorTreeObj){
  return dispatch => {
    oData.updateEccGroup(param,function(){
        monitorTreeObj.props.onClickRefresh("");
        showDialog("提示","修改成功。");
    })
  }
}

export function createEccGroup(param, monitorTreeObj){
  return dispatch => {
    oData.createEccGroup(param,function(){
        monitorTreeObj.props.onClickRefresh("");
        showDialog("提示","保存成功。");
    })
  }
}

export function getEccGroupById(param){
  return dispatch => {
    oData.getEccGroupById(param,function(result){
      // console.log(result);
      var re = result.results[0];
      dispatch(setSelectedDeviceGroup(re))
    })
  }
}

export function changeEquipmentStatus(param, monitorTreeObj){
  return dispatch => {
    oData.changeEquipmentStatus(param,function(){
        monitorTreeObj.props.onClickRefresh("");
        showDialog("提示","修改成功。");
    })
  }
}
