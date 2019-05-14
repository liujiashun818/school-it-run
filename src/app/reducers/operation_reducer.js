/**
* 工单管理:工单列表、工单详情、工单新建 相关的reducer方法
*/

import { combineReducers } from 'redux'
import {
  SET_FAULTTYPES, SET_FAULTSUBTYPES, SET_SERVICENAME, SET_SERVICEDATA, SET_FAULTTYPEID,
  SET_FAULTSUBTYPEID, SET_SERVICEID, SET_FLOWLEVEL, SET_ASSETS, SET_HANDLEASSETSID,
  SET_WORKORDERLIST, SET_COLORSPANNUM1, SET_COLORSPANNUM2, SET_COLORSPANNUM3, SET_COLORSPANNUM4,
  SET_COLORSPANNUM5, SET_COLORSPANNUM6, SET_COLORSPANNUM7, SET_COLORSPANNUM8, SET_PICLIST,
  SET_PICLIST2, SET_CURWORKORDERDATA, SET_CURWORKORDERID, SET_CURWORKORDERSTATUS, SET_CURWORKORDERFLOWID,
  SET_CURWORKORDERGROUPID, SET_ORDERDETAILDATA, SET_DELAYLIST, SET_DELAYINDEX, SET_CURDELAYID,
  SET_CREATEORDERINFO, SET_FLOWPICDATA, SET_FLOWDESIGNPICDATA, SET_WORKFLOWTABLE, SET_WORKFLOWDETAILTABLE,
  SET_FLOWNAME, SET_FLOWOBJECTS, SET_WORKTHEME, SET_WORKDESCRIPTION, SET_WORKFLOWTYPES,
  SET_FLOWDEIGNRESULTDATA, SET_CURWORKFLOWID, SET_TOUCHWORKORDERDATA, SET_TOUCHWORKORDERDATA_MONITORDATA, SET_CURSTATEPARAM, SET_PERMISSIONS_OPERATION,
  SET_AUTOMATICWORKORDER, SET_EQUIPMENTTYPE, SET_MONITORTYPE_OPERATION, SET_ALLFAULTS, SET_ISBUNDER,
  SET_WORKORDERFILTERLIST, SET_TOUCHEQUIPMENTDATA, SET_TOUCHFAULTSUBID, SET_DUTYGROUPS, SET_DUTYGROUPARRS,
  SET_DUTYUSERS, SET_CURDUTYGROUP, SET_CURDATADUTYGROUP, SET_DUTYUSERLIST, SET_DUTYDUTYLIST,
  SET_DUTYECCDATA, SET_CALENDARDATA, SET_ISSIGN, SET_GETCALENDARDATAFLAG, SET_SELECTEDCALENDARDATE,
  SET_DUTYLOGS, SET_DUTYSIGNINS, SET_CLICKEDDUTYLOG, SET_CANUPDATE, SET_SELECTEDWORKORDERTEMPLATE,
  SET_WORKORDERTEMPLATEOPERATIONFLAG, SET_WORKORDERTEMPLATEINFOCHANGEFLAG,
  SET_WORKFLOWDETAIL_CURRENT,SET_WORKORDERTEMPLATES_MAINFORM,SET_WORKORDERTEMPLATES_SHEETFORM,SET_BUSOBDEFFIELD_OPERATION_DETAIL,SET_BUSOBDEFFIELD_OPERATION_HANDLE,
  SET_WORKORDERTEMPLATES_MAINDATA,SET_WORKORDERTEMPLATES_SHEETDATA
} from '../actions/operation_action'

function canUpdate(state = "true",action) {
  switch (action.type) {
      case SET_CANUPDATE:
          return action.data
      default:
          return state
  }
}

function faultTypes(state = [], action) {
    switch (action.type) {
        case SET_FAULTTYPES:
            return action.faultTypes
        default:
            return state
    }
}

function faultSubTypes(state = [], action) {
    switch (action.type) {
        case SET_FAULTSUBTYPES:
            return action.faultSubTypes
        default:
            return state
    }
}

function serviceName(state = [], action) {
    switch (action.type) {
        case SET_SERVICENAME:
            return action.serviceName
        default:
            return state
    }
}

function serviceData(state = [], action) {
    switch (action.type) {
        case SET_SERVICEDATA:
            return action.serviceData
        default:
            return state
    }
}

function faultTypeId(state = "", action) {
    switch (action.type) {
        case SET_FAULTTYPEID:
            return action.faultTypeId
        default:
            return state
    }
}

function faultSubTypeId(state = "", action) {
    switch (action.type) {
        case SET_FAULTSUBTYPEID:
            return action.faultSubTypeId
        default:
            return state
    }
}

function serviceId(state = "", action) {
    switch (action.type) {
        case SET_SERVICEID:
            return action.serviceId
        default:
            return state
    }
}

function flowLevel(state = "", action) {
    switch (action.type) {
        case SET_FLOWLEVEL:
            return action.flowLevel
        default:
            return state
    }
}

function assets(state = [], action) {
    switch (action.type) {
        case SET_ASSETS:
            return action.assets
        default:
            return state
    }
}

function handleAssetsId(state = '', action) {
    switch (action.type) {
        case SET_HANDLEASSETSID:
            return action.handleAssetsId
        default:
            return state
    }
}

function workOrderList(state = [], action) {
    switch (action.type) {
        case SET_WORKORDERLIST:
            return action.workOrderList
        default:
            return state
    }
}

function colorSpanNum1(state = "0", action) {
    switch (action.type) {
        case SET_COLORSPANNUM1:
            return action.colorSpanNum1
        default:
            return state
    }
}

function colorSpanNum2(state = "0", action) {
    switch (action.type) {
        case SET_COLORSPANNUM2:
            return action.colorSpanNum2
        default:
            return state
    }
}

function colorSpanNum3(state = "0", action) {
    switch (action.type) {
        case SET_COLORSPANNUM3:
            return action.colorSpanNum3
        default:
            return state
    }
}

function colorSpanNum4(state = "0", action) {
    switch (action.type) {
        case SET_COLORSPANNUM4:
            return action.colorSpanNum4
        default:
            return state
    }
}

function colorSpanNum5(state = "0", action) {
    switch (action.type) {
        case SET_COLORSPANNUM5:
            return action.colorSpanNum5
        default:
            return state
    }
}

function colorSpanNum6(state = "0", action) {
    switch (action.type) {
        case SET_COLORSPANNUM6:
            return action.colorSpanNum6
        default:
            return state
    }
}

function colorSpanNum7(state = "0", action) {
    switch (action.type) {
        case SET_COLORSPANNUM7:
            return action.colorSpanNum7
        default:
            return state
    }
}

function colorSpanNum8(state = "0", action) {
    switch (action.type) {
        case SET_COLORSPANNUM8:
            return action.colorSpanNum8
        default:
            return state
    }
}

function picList(state = [], action) {
    switch (action.type) {
        case SET_PICLIST:
            return action.picList
        default:
            return state
    }
}

function picList2(state = [], action) {
    switch (action.type) {
        case SET_PICLIST2:
            return action.picList2
        default:
            return state
    }
}

function curWorkOrderData(state = null, action) {
    switch (action.type) {
        case SET_CURWORKORDERDATA:
            return action.curWorkOrderData
        default:
            return state
    }
}

function curWorkOrderId(state = "", action) {
    switch (action.type) {
        case SET_CURWORKORDERID:
            return action.curWorkOrderId
        default:
            return state
    }
}

function curWorkOrderStatus(state = "", action) {
    switch (action.type) {
        case SET_CURWORKORDERSTATUS:
            return action.curWorkOrderStatus
        default:
            return state
    }
}

function curWorkOrderFlowId(state = "", action) {
    switch (action.type) {
        case SET_CURWORKORDERFLOWID:
            return action.curWorkOrderFlowId
        default:
            return state
    }
}

function curWorkOrderGroupID(state = "", action) {
    switch (action.type) {
        case SET_CURWORKORDERGROUPID:
            return action.curWorkOrderGroupID
        default:
            return state
    }
}

function orderDetailData(state = "", action) {
    switch (action.type) {
        case SET_ORDERDETAILDATA:
            return action.orderDetailData
        default:
            return state
    }
}

function delayList(state = [], action) {
    switch (action.type) {
        case SET_DELAYLIST:
            return action.delayList
        default:
            return state
    }
}

function delayIndex(state = "", action) {
    switch (action.type) {
        case SET_DELAYINDEX:
            return action.delayIndex
        default:
            return state
    }
}

function curDelayId(state = "", action) {
    switch (action.type) {
        case SET_CURDELAYID:
            return action.curDelayId
        default:
            return state
    }
}

function createOrderInfo(state = null, action) {
    switch (action.type) {
        case SET_CREATEORDERINFO:
            return action.createOrderInfo
        default:
            return state
    }
}

function flowPicData(state = "", action) {
    switch (action.type) {
        case SET_FLOWPICDATA:
            return action.flowPicData
        default:
            return state
    }
}

function flowDesignPicData(state = "", action) {
    switch (action.type) {
        case SET_FLOWDESIGNPICDATA:
            return action.flowDesignPicData
        default:
            return state
    }
}

function workFlowTable(state = "", action) {
    switch (action.type) {
        case SET_WORKFLOWTABLE:
            return action.workFlowTable
        default:
            return state
    }
}

function workFlowDetailTable(state = "", action) {
    switch (action.type) {
        case SET_WORKFLOWDETAILTABLE:
            return action.workFlowDetailTable
        default:
            return state
    }
}

function flowName(state = [], action) {
    switch (action.type) {
        case SET_FLOWNAME:
            return action.flowName
        default:
            return state
    }
}

function flowObjects(state = [], action) {
    switch (action.type) {
        case SET_FLOWOBJECTS:
            return action.flowObjects
        default:
            return state
    }
}

function workTheme(state = "", action) {
    switch (action.type) {
        case SET_WORKTHEME:
            return action.workTheme
        default:
            return state
    }
}

function workDescription(state = "", action) {
    switch (action.type) {
        case SET_WORKDESCRIPTION:
            return action.workDescription
        default:
            return state
    }
}

function workFlowTypes(state = [], action) {
    switch (action.type) {
        case SET_WORKFLOWTYPES:
            return action.workFlowTypes
        default:
            return state
    }
}

function flowDeignResultData(state = [], action) {
    switch (action.type) {
        case SET_FLOWDEIGNRESULTDATA:
            return action.flowDeignResultData
        default:
            return state
    }
}

function curWorkFlowId(state = "", action) {
    switch (action.type) {
        case SET_CURWORKFLOWID:
            return action.curWorkFlowId
        default:
            return state
    }
}

function touchWorkOrderData(state = null, action) {
    switch (action.type) {
        case SET_TOUCHWORKORDERDATA:
            return action.touchWorkOrderData
        case SET_TOUCHWORKORDERDATA_MONITORDATA:
            return Object.assign({}, state, {
                monitorData: action.monitorData
            });
        default:
            return state
    }
}

function curstateparam(state = "", action) {
    switch (action.type) {
        case SET_CURSTATEPARAM:
            return action.curstateparam
        default:
            return state
    }
}

function permissions(state = "", action) {
    switch (action.type) {
        case SET_PERMISSIONS_OPERATION:
            return action.permissions
        default:
            return state
    }
}

function automaticWorkOrder(state = [], action) {
    switch (action.type) {
        case SET_AUTOMATICWORKORDER:
            return action.automaticWorkOrder
        default:
            return state
    }
}

function equipmentType(state = [], action) {
    switch (action.type) {
        case SET_EQUIPMENTTYPE:
            return action.equipmentType
        default:
            return state
    }
}

function monitorType(state = [], action) {
    switch (action.type) {
        case SET_MONITORTYPE_OPERATION:
            return action.monitorType
        default:
            return state
    }
}

function allFaults(state = [], action) {
    switch (action.type) {
        case SET_ALLFAULTS:
            return action.allFaults
        default:
            return state
    }
}

function isBunder(state = 0, action) {
    switch (action.type) {
        case SET_ISBUNDER:
            return action.isBunder
        default:
            return state
    }
}

function workOrderFilterList(state = [], action) {
    switch (action.type) {
        case SET_WORKORDERFILTERLIST:
            return action.workOrderFilterList
        default:
            return state
    }
}

function touchEquipmentData(state = [], action) {
    switch (action.type) {
        case SET_TOUCHEQUIPMENTDATA:
            return action.touchEquipmentData
        default:
            return state
    }
}

function touchFaultSubId(state = "", action) {
    switch (action.type) {
        case SET_TOUCHFAULTSUBID:
            return action.touchFaultSubId
        default:
            return state
    }
}

function dutyGroups(state = [], action) {
    switch (action.type) {
        case SET_DUTYGROUPS:
            return action.dutyGroups
        default:
            return state
    }
}

function dutyGroupArrs(state = [], action) {
    switch (action.type) {
        case SET_DUTYGROUPARRS:
            return action.dutyGroupArrs
        default:
            return state
    }
}

function dutyUsers(state = [], action) {
    switch (action.type) {
        case SET_DUTYUSERS:
            return action.dutyUsers
        default:
            return state
    }
}

function curDutyGroup(state = null, action) {
    switch (action.type) {
        case SET_CURDUTYGROUP:
            return action.curDutyGroup
        default:
            return state
    }
}

function curDataDutyGroup(state = null, action) {
    switch (action.type) {
        case SET_CURDATADUTYGROUP:
            return action.curDataDutyGroup
        default:
            return state
    }
}

function dutyUserList(state = [], action) {
    switch (action.type) {
        case SET_DUTYUSERLIST:
            return action.dutyUserList
        default:
            return state
    }
}

function dutyDutyList(state = [], action) {
    switch (action.type) {
        case SET_DUTYDUTYLIST:
            return action.dutyDutyList
        default:
            return state
    }
}

function dutyEccData(state = "", action) {
    switch (action.type) {
        case SET_DUTYECCDATA:
            return action.dutyEccData
        default:
            return state
    }
}

function calendarData(state = [], action) {
    switch (action.type) {
        case SET_CALENDARDATA:
            return action.calendarData
        default:
            return state
    }
}

function isSign(state = false, action) {
    switch (action.type) {
        case SET_ISSIGN:
            return action.isSign
        default:
            return state
    }
}

function getCalendarDataFlag(state = false, action) {
    switch (action.type) {
        case SET_GETCALENDARDATAFLAG:
            return action.getCalendarDataFlag
        default:
            return state
    }
}

function selectedCalendarDate(state = "", action) {
    switch (action.type) {
        case SET_SELECTEDCALENDARDATE:
            return action.selectedCalendarDate
        default:
            return state
    }
}

function dutyLogs(state = [], action) {
    switch (action.type) {
        case SET_DUTYLOGS:
            return action.dutyLogs
        default:
            return state
    }
}

function dutySignIns(state = [], action) {
    switch (action.type) {
        case SET_DUTYSIGNINS:
            return action.dutySignIns
        default:
            return state
    }
}

function clickedDutyLog(state = null, action) {
    switch (action.type) {
        case SET_CLICKEDDUTYLOG:
            return action.clickedDutyLog
        default:
            return state
    }
}

function selectedWorkOrderTemplate(state = null, action) {
    switch (action.type) {
        case SET_SELECTEDWORKORDERTEMPLATE:
            return action.selectedWorkOrderTemplate
        default:
            return state
    }
}

function workOrderTemplateOperationFlag(state = "add", action) {
    switch (action.type) {
        case SET_WORKORDERTEMPLATEOPERATIONFLAG:
            return action.workOrderTemplateOperationFlag
        default:
            return state
    }
}

function workOrderTemplateInfoChangeFlag(state = false, action) {
    switch (action.type) {
        case SET_WORKORDERTEMPLATEINFOCHANGEFLAG:
            return action.workOrderTemplateInfoChangeFlag
        default:
            return state
    }
}

function workFlowDetailCurrent(state = [], action) {
    switch (action.type) {
        case SET_WORKFLOWDETAIL_CURRENT:
            return action.workFlowDetailCurrent
        default:
            return state
    }
}

function workOrderTemplatesMainForm(state = null, action) {
    switch (action.type) {
        case SET_WORKORDERTEMPLATES_MAINFORM:
            return action.workOrderTemplatesMainForm
        default:
            return state
    }
}

function workOrderTemplatesSheetForm(state = null, action) {
    switch (action.type) {
        case SET_WORKORDERTEMPLATES_SHEETFORM:
            return action.workOrderTemplatesSheetForm
        default:
            return state
    }
}

function busObDefFieldDetail(state = [], action) {
  switch (action.type) {
    case SET_BUSOBDEFFIELD_OPERATION_DETAIL:
      return action.busObDefFieldDetail;
    default:
      return state;
  }
}

function busObDefFieldHandle(state = [], action) {
  switch (action.type) {
    case SET_BUSOBDEFFIELD_OPERATION_HANDLE:
      return action.busObDefFieldHandle;
    default:
      return state;
  }
}

function workOrderTemplatesMainData(state = [], action) {
    switch (action.type) {
        case SET_WORKORDERTEMPLATES_MAINDATA:
            return action.workOrderTemplatesMainData
        default:
            return state
    }
}

function workOrderTemplatesSheetData(state = [], action) {
    switch (action.type) {
        case SET_WORKORDERTEMPLATES_SHEETDATA:
            return action.workOrderTemplatesSheetData
        default:
            return state
    }
}

const operationReducer = combineReducers({
    faultTypes,
    faultSubTypes,
    serviceName,
    serviceData,
    faultTypeId,
    faultSubTypeId,
    serviceId,
    flowLevel,
    assets,
    handleAssetsId,
    workOrderList,
    colorSpanNum1,
    colorSpanNum2,
    colorSpanNum3,
    colorSpanNum4,
    colorSpanNum5,
    colorSpanNum6,
    colorSpanNum7,
    colorSpanNum8,
    picList,
    picList2,
    curWorkOrderData,
    curWorkOrderId,
    curWorkOrderStatus,
    curWorkOrderFlowId,
    curWorkOrderGroupID,
    orderDetailData,
    delayList,
    delayIndex,
    curDelayId,
    createOrderInfo,
    flowPicData,
    flowDesignPicData,
    workFlowTable,
    workFlowDetailTable,
    flowName,
    flowObjects,
    workTheme,
    workDescription,
    workFlowTypes,
    flowDeignResultData,
    curWorkFlowId,
    touchWorkOrderData,
    curstateparam,
    permissions,
    automaticWorkOrder,
    equipmentType,
    monitorType,
    allFaults,
    isBunder,
    workOrderFilterList,
    touchEquipmentData,
    touchFaultSubId,
    dutyGroups,
    dutyGroupArrs,
    dutyUsers,
    curDutyGroup,
    curDataDutyGroup,
    dutyUserList,
    dutyDutyList,
    dutyEccData,
    calendarData,
    isSign,
    getCalendarDataFlag,
    selectedCalendarDate,
    dutyLogs,
    dutySignIns,
    clickedDutyLog,
    canUpdate,
    selectedWorkOrderTemplate,
    workOrderTemplateOperationFlag,
    workOrderTemplateInfoChangeFlag,
    workFlowDetailCurrent,
    workOrderTemplatesMainForm,
    workOrderTemplatesSheetForm,
    busObDefFieldDetail,
    busObDefFieldHandle,
    workOrderTemplatesMainData,
    workOrderTemplatesSheetData
})

export default operationReducer
