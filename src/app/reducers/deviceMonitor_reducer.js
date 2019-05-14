/**
 * 统一监控平台相关的reducer
 */
import { combineReducers } from 'redux'
import {
  SET_GROUPALLCOLUMNDATA, SET_GROUPALLSHOWCOLUMNDATA, SET_GROUPTABLEDATA, SET_GROUPTABLECOUNT,
  SET_TEARMALLMAPDATA, SET_TEARMEQUIPMENTTYPEDATA, SET_TEARMEQUIPMENTNAMEDATA, SET_SELECTEDTEARMEQUIPMENTNAMEDATA,
  SET_TEARMSUBMAPDATA, SET_MONITORTREE2, SET_MONITORVIEW, SET_PIECHARTMONITORTYPE,
  SET_MONITORNAME, SET_MONITORGROUPID, SET_MONITORTYPE, SET_MONITORTABLECOLUMNS,
  SET_BCLICKTREENODE, SET_GETTEARMLISTDATATYPE, SET_PIECHARTDATATYPE, SET_TEARMALLMAPDATA_PIECHARTMONITORTYPERADIO,
  SET_TEARMALLMAPDATA_MONITORTYPERADIO, SET_TEARMEQUIPMENTTYPEDATA_MONITORTYPERADIO, SET_TEARMEQUIPMENTNAMEDATA_MONITORTYPERADIO, SET_TEARMSUBMAPDATA_MONITORTYPERADIO,
  SET_TEARMMAPDATA_MONITORTYPERADIO, SET_TEARMMAPDATA_MONITORTYPERADIO_SINGLE, SET_STATUSGRIDMONITORGROUPID, SET_MONITORTABLESELECTEDROWDATA,
  SET_MONITORTABLESELECTEDROWDATA_FIELD, SET_SEARCHAREADATA,
  SET_SETTINGSEARCHAREADATA, SET_MONITORTABLECURRENTPAGE, SET_MONITORTABLENUMPERPAGE, SET_MONITORTABLEFILTER,
  SET_MONITORFILTERSTATUS, SET_FILTEREDGROUPTABLEDATA, SET_YFTALARMDATA, SET_YFTALARMRULEDATA,
  SET_ERRORALARMTEXT, SET_WARNINGALARMTEXT, SET_GOODALARMTEXT, SET_ERRORCONDITIONSDATA,
  SET_SETTINGERRORCONDITIONSDATA, SET_ISORERROR, SET_SETTINGISORERROR, SET_WARNINGCONDITIONSDATA,
  SET_SETTINGWARNINGCONDITIONSDATA, SET_ISORWARNING, SET_SETTINGISORWARNING, SET_GOODCONDITIONSDATA,
  SET_SETTINGGOODCONDITIONSDATA, SET_ISORGOOD, SET_SETTINGISORGOOD, SET_ALARMISSUEDTABLEDATA,
  SET_ALARMISSUEDEQUIPMENTTYPE, SET_ALARMISSUEDMONITORTYPE, SET_ALARMEVENTDATA, SET_ALARMEVENTCOUNT,
  SET_SELECTEDALARMEVENT, SET_ALARMEVENTCURRENTPAGE, SET_ALARMEVENTNUMPERPAGE, SET_ALARMEVENTFILTER,
  SET_ALARMEVENTDETAILS, SET_ALARMEVENTDETAILMODALOPENEDFROMPAGE, SET_ISCREATEWORKORDER, SET_VIDEOLOSSDATA,
  SET_BSHOWVIDEOLOSSTAB, SET_CHANNELINFODATA, SET_SIPID,SET_ALARMEVENTPAGE_CURRENTFILTER, SET_CHILDRENGROUP,SET_CHILDRENEQUIP,SET_SELECTEDDEVICEGROUP
} from '../actions/deviceMonitor_action'

function childrenEquip(state = [], action) {
  switch (action.type) {
      case SET_CHILDRENEQUIP:
          return action.cEquip
      default:
          return state
  }
}

function childrenGroup(state = [], action) {
  switch (action.type) {
      case SET_CHILDRENGROUP:
          return action.cGroup
      default:
          return state
  }
}

function groupAllColumnData(state = [], action) {
    switch (action.type) {
        case SET_GROUPALLCOLUMNDATA:
            return action.groupAllColumnData
        default:
            return state
    }
}

function groupAllShowColumnData(state = [], action) {
    switch (action.type) {
        case SET_GROUPALLSHOWCOLUMNDATA:
            return action.groupAllShowColumnData
        default:
            return state
    }
}

function groupTableData(state = [], action) {
    switch (action.type) {
        case SET_GROUPTABLEDATA:
            return action.groupTableData
        default:
            return state
    }
}

function groupTableCount(state = 0, action) {
    switch (action.type) {
        case SET_GROUPTABLECOUNT:
            return action.groupTableCount
        default:
            return state
    }
}

function tearmAllMAPData(state = {sum:0, good:0, warning:0, error:0}, action) {
    switch (action.type) {
        case SET_TEARMALLMAPDATA:
            return action.tearmAllMAPData
        default:
            return state
    }
}

function tearmEquipmentTypeData(state = [], action) {
    switch (action.type) {
        case SET_TEARMEQUIPMENTTYPEDATA:
            return action.tearmEquipmentTypeData
        default:
            return state
    }
}

function tearmEquipmentNameData(state = [], action) {
    switch (action.type) {
        case SET_TEARMEQUIPMENTNAMEDATA:
            return action.tearmEquipmentNameData
        default:
            return state
    }
}

function selectedTearmEquipmentNameData(state = {RecId:"0", name:""}, action) {
    switch (action.type) {
        case SET_SELECTEDTEARMEQUIPMENTNAMEDATA:
            return action.selectedTearmEquipmentNameData
        default:
            return state
    }
}

function tearmSubMAPData(state = [], action) {
    switch (action.type) {
        case SET_TEARMSUBMAPDATA:
            return action.tearmSubMAPData
        default:
            return state
    }
}

function monitorTree2(state = null, action) {
    switch (action.type) {
        case SET_MONITORTREE2:
            return action.monitorTree2
        default:
            return state
    }
}

function monitorView(state = 1, action) {
    switch (action.type) {
        case SET_MONITORVIEW:
            return action.monitorView
        default:
            return state
    }
}

function pieChartMonitorType(state = "1", action) {
    switch (action.type) {
        case SET_PIECHARTMONITORTYPE:
            return action.pieChartMonitorType
        default:
            return state
    }
}

function monitorName(state = "", action) {
    switch (action.type) {
        case SET_MONITORNAME:
            return action.monitorName
        default:
            return state
    }
}

function monitorGroupId(state = "", action) {
    switch (action.type) {
        case SET_MONITORGROUPID:
            return action.monitorGroupId
        default:
            return state
    }
}

function monitorType(state = "1", action) {
    switch (action.type) {
        case SET_MONITORTYPE:
            return action.monitorType
        default:
            return state
    }
}

function monitorTableColumns(state = [], action) {
    switch (action.type) {
        case SET_MONITORTABLECOLUMNS:
            return action.monitorTableColumns
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

function getTearmListDataType(state = 0, action) {
    switch (action.type) {
        case SET_GETTEARMLISTDATATYPE:
            return action.getTearmListDataType
        default:
            return state
    }
}

function pieChartDataType(state = 0, action) {
    switch (action.type) {
        case SET_PIECHARTDATATYPE:
            return action.pieChartDataType
        case SET_GETTEARMLISTDATATYPE:
            if(action.getTearmListDataType != 2) {
                return action.getTearmListDataType
            }
            else {
                return state
            }
        default:
            return state
    }
}

function tearmAllMAPData_pieChartMonitorTypeRadio(state = [], action) {
    switch (action.type) {
        case SET_TEARMALLMAPDATA_PIECHARTMONITORTYPERADIO:
            return action.tearmAllMAPData_pieChartMonitorTypeRadio
        default:
            return state
    }
}

function tearmAllMAPData_monitorTypeRadio(state = [], action) {
    switch (action.type) {
        case SET_TEARMALLMAPDATA_MONITORTYPERADIO:
            return action.tearmAllMAPData_monitorTypeRadio
        default:
            return state
    }
}

function tearmEquipmentTypeData_monitorTypeRadio(state = [], action) {
    switch (action.type) {
        case SET_TEARMEQUIPMENTTYPEDATA_MONITORTYPERADIO:
            return action.tearmEquipmentTypeData_monitorTypeRadio
        default:
            return state
    }
}

function tearmEquipmentNameData_monitorTypeRadio(state = [], action) {
    switch (action.type) {
        case SET_TEARMEQUIPMENTNAMEDATA_MONITORTYPERADIO:
            return action.tearmEquipmentNameData_monitorTypeRadio
        default:
            return state
    }
}

function tearmSubMAPData_monitorTypeRadio(state = [], action) {
    switch (action.type) {
        case SET_TEARMSUBMAPDATA_MONITORTYPERADIO:
            return action.tearmSubMAPData_monitorTypeRadio
        default:
            return state
    }
}

function tearmMAPData_monitorTypeRadio(state = [], action) {
    switch (action.type) {
        case SET_TEARMMAPDATA_MONITORTYPERADIO:
            return action.tearmMAPData_monitorTypeRadio
        case SET_TEARMMAPDATA_MONITORTYPERADIO_SINGLE:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    good: action.tearmMAPData_monitorTypeRadio_single.good,
                    error: action.tearmMAPData_monitorTypeRadio_single.error,
                    warning: action.tearmMAPData_monitorTypeRadio_single.warning,
                    sum: action.tearmMAPData_monitorTypeRadio_single.sum
                }),
                ...state.slice(action.index + 1)
            ]
        default:
            return state
    }
}

function statusGridMonitorGroupId(state = "", action) {
    switch (action.type) {
        case SET_STATUSGRIDMONITORGROUPID:
            return action.statusGridMonitorGroupId
        default:
            return state
    }
}

function monitorTableSelectedRowData(state = null, action) {
    switch (action.type) {
        case SET_MONITORTABLESELECTEDROWDATA:
            return action.monitorTableSelectedRowData
        case SET_MONITORTABLESELECTEDROWDATA_FIELD:
            return Object.assign({}, state, {
                LAG: action.LAG,
                BRAND: action.BRAND
            });
        default:
            return state
    }
}

function searchAreaData(state = null, action) {
    switch (action.type) {
        case SET_SEARCHAREADATA:
            return action.searchAreaData
        default:
            return state
    }
}

function settingSearchAreaData(state = null, action) {
    switch (action.type) {
        case SET_SETTINGSEARCHAREADATA:
            return action.settingSearchAreaData
        default:
            return state
    }
}

function monitorTableCurrentPage(state = 1, action) {
    switch (action.type) {
        case SET_MONITORTABLECURRENTPAGE:
            return action.monitorTableCurrentPage
        default:
            return state
    }
}

function monitorTableNumPerPage(state = 20, action) {
    switch (action.type) {
        case SET_MONITORTABLENUMPERPAGE:
            return action.monitorTableNumPerPage
        default:
            return state
    }
}

function monitorTableFilter(state = [], action) {
    switch (action.type) {
        case SET_MONITORTABLEFILTER:
            return action.monitorTableFilter
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

function filteredGroupTableData(state = [], action) {
    switch (action.type) {
        case SET_FILTEREDGROUPTABLEDATA:
            return action.filteredGroupTableData
        default:
            return state
    }
}

function yftAlarmData(state = [], action) {
    switch (action.type) {
        case SET_YFTALARMDATA:
            return action.yftAlarmData
        default:
            return state
    }
}

function yftAlarmRuleData(state = [], action) {
    switch (action.type) {
        case SET_YFTALARMRULEDATA:
            return action.yftAlarmRuleData
        default:
            return state
    }
}

function errorAlarmText(state = "", action) {
    switch (action.type) {
        case SET_ERRORALARMTEXT:
            return action.errorAlarmText
        default:
            return state
    }
}

function warningAlarmText(state = "", action) {
    switch (action.type) {
        case SET_WARNINGALARMTEXT:
            return action.warningAlarmText
        default:
            return state
    }
}

function goodAlarmText(state = "", action) {
    switch (action.type) {
        case SET_GOODALARMTEXT:
            return action.goodAlarmText
        default:
            return state
    }
}

function errorConditionsData(state = [], action) {
    switch (action.type) {
        case SET_ERRORCONDITIONSDATA:
            return action.errorConditionsData
        default:
            return state
    }
}

function settingErrorConditionsData(state = [], action) {
    switch (action.type) {
        case SET_SETTINGERRORCONDITIONSDATA:
            return action.settingErrorConditionsData
        default:
            return state
    }
}

function isOrError(state = "false", action) {
    switch (action.type) {
        case SET_ISORERROR:
            return action.isOrError
        default:
            return state
    }
}

function settingIsOrError(state = "false", action) {
    switch (action.type) {
        case SET_SETTINGISORERROR:
            return action.settingIsOrError
        default:
            return state
    }
}

function warningConditionsData(state = [], action) {
    switch (action.type) {
        case SET_WARNINGCONDITIONSDATA:
            return action.warningConditionsData
        default:
            return state
    }
}

function settingWarningConditionsData(state = [], action) {
    switch (action.type) {
        case SET_SETTINGWARNINGCONDITIONSDATA:
            return action.settingWarningConditionsData
        default:
            return state
    }
}

function isOrWarning(state = "false", action) {
    switch (action.type) {
        case SET_ISORWARNING:
            return action.isOrWarning
        default:
            return state
    }
}

function settingIsOrWarning(state = "false", action) {
    switch (action.type) {
        case SET_SETTINGISORWARNING:
            return action.settingIsOrWarning
        default:
            return state
    }
}

function goodConditionsData(state = [], action) {
    switch (action.type) {
        case SET_GOODCONDITIONSDATA:
            return action.goodConditionsData
        default:
            return state
    }
}

function settingGoodConditionsData(state = [], action) {
    switch (action.type) {
        case SET_SETTINGGOODCONDITIONSDATA:
            return action.settingGoodConditionsData
        default:
            return state
    }
}

function isOrGood(state = "false", action) {
    switch (action.type) {
        case SET_ISORGOOD:
            return action.isOrGood
        default:
            return state
    }
}

function settingIsOrGood(state = "false", action) {
    switch (action.type) {
        case SET_SETTINGISORGOOD:
            return action.settingIsOrGood
        default:
            return state
    }
}

function alarmIssuedTableData(state = [], action) {
    switch (action.type) {
        case SET_ALARMISSUEDTABLEDATA:
            return action.alarmIssuedTableData
        default:
            return state
    }
}

function alarmIssuedEquipmentType(state = [], action) {
    switch (action.type) {
        case SET_ALARMISSUEDEQUIPMENTTYPE:
            return action.alarmIssuedEquipmentType
        default:
            return state
    }
}

function alarmIssuedMonitorType(state = [], action) {
    switch (action.type) {
        case SET_ALARMISSUEDMONITORTYPE:
            return action.alarmIssuedMonitorType
        default:
            return state
    }
}

function alarmEventData(state = [], action) {
    switch (action.type) {
        case SET_ALARMEVENTDATA:
            return action.alarmEventData
        default:
            return state
    }
}

function alarmEventCount(state = 0, action) {
    switch (action.type) {
        case SET_ALARMEVENTCOUNT:
            return action.alarmEventCount
        default:
            return state
    }
}

function selectedAlarmEvent(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDALARMEVENT:
            return action.selectedAlarmEvent
        default:
            return state
    }
}

function alarmEventCurrentPage(state = 1, action) {
    switch (action.type) {
        case SET_ALARMEVENTCURRENTPAGE:
            return action.alarmEventCurrentPage
        default:
            return state
    }
}

function alarmEventNumPerPage(state = 10, action) {
    switch (action.type) {
        case SET_ALARMEVENTNUMPERPAGE:
            return action.alarmEventNumPerPage
        default:
            return state
    }
}

function alarmEventFilter(state = null, action) {
    switch (action.type) {
        case SET_ALARMEVENTFILTER:
            return action.alarmEventFilter
        default:
            return state
    }
}

function alarmEventDetails(state = [], action) {
    switch (action.type) {
        case SET_ALARMEVENTDETAILS:
            return action.alarmEventDetails
        default:
            return state
    }
}

function alarmEventDetailModalOpenedFromPage(state = "", action) {
    switch (action.type) {
        case SET_ALARMEVENTDETAILMODALOPENEDFROMPAGE:
            return action.alarmEventDetailModalOpenedFromPage
        default:
            return state
    }
}

function isCreateWorkOrder(state = "0", action) {
    switch (action.type) {
        case SET_ISCREATEWORKORDER:
            return action.isCreateWorkOrder
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

function bShowVideoLossTab(state = false, action) {
    switch (action.type) {
        case SET_BSHOWVIDEOLOSSTAB:
            return action.bShowVideoLossTab
        default:
            return state
    }
}

function channelInfoData(state = [], action) {
    switch (action.type) {
        case SET_CHANNELINFODATA:
            return action.channelInfoData
        default:
            return state
    }
}

function sipid(state = "", action) {
    switch (action.type) {
        case SET_SIPID:
            return action.sipid
        default:
            return state
    }
}

function alarmEventCurrentFilter(state = null, action) {
    switch (action.type) {
        case SET_ALARMEVENTPAGE_CURRENTFILTER:
            return action.currentFilter
        default:
            return state
    }
}

function selectedDeivceGroup(state = "",action){
  switch (action.type) {
    case SET_SELECTEDDEVICEGROUP:
      return action.dGroup;
    default:
      return state
  }
}

const deviceMonitorReducer = combineReducers({
    groupAllColumnData,
    groupAllShowColumnData,
    groupTableData,
    groupTableCount,
    tearmAllMAPData,
    tearmEquipmentTypeData,
    tearmEquipmentNameData,
    selectedTearmEquipmentNameData,
    tearmSubMAPData,
    monitorTree2,
    monitorView,
    pieChartMonitorType,
    monitorName,
    monitorGroupId,
    monitorType,
    monitorTableColumns,
    bClickTreeNode,
    getTearmListDataType,
    pieChartDataType,
    tearmAllMAPData_pieChartMonitorTypeRadio,
    tearmAllMAPData_monitorTypeRadio,
    tearmEquipmentTypeData_monitorTypeRadio,
    tearmEquipmentNameData_monitorTypeRadio,
    tearmSubMAPData_monitorTypeRadio,
    tearmMAPData_monitorTypeRadio,
    statusGridMonitorGroupId,
    monitorTableSelectedRowData,
    searchAreaData,
    settingSearchAreaData,
    monitorTableCurrentPage,
    monitorTableNumPerPage,
    monitorTableFilter,
    monitorFilterStatus,
    filteredGroupTableData,
    yftAlarmData,
    yftAlarmRuleData,
    errorAlarmText,
    warningAlarmText,
    goodAlarmText,
    errorConditionsData,
    settingErrorConditionsData,
    isOrError,
    settingIsOrError,
    warningConditionsData,
    settingWarningConditionsData,
    isOrWarning,
    settingIsOrWarning,
    goodConditionsData,
    settingGoodConditionsData,
    isOrGood,
    settingIsOrGood,
    alarmIssuedTableData,
    alarmIssuedEquipmentType,
    alarmIssuedMonitorType,
    alarmEventData,
    alarmEventCount,
    selectedAlarmEvent,
    alarmEventCurrentPage,
    alarmEventNumPerPage,
    alarmEventFilter,
    alarmEventDetails,
    alarmEventDetailModalOpenedFromPage,
    isCreateWorkOrder,
    videoLossData,
    bShowVideoLossTab,
    channelInfoData,
    sipid,
    alarmEventCurrentFilter,
    childrenGroup,
    childrenEquip,
    selectedDeivceGroup
})

export default deviceMonitorReducer
