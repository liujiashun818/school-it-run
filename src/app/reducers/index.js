import { combineReducers } from 'redux'
import navbarReducer from './navbar_reducer'
import loginReducer from './login_reducer'
import deviceMonitorReducer from './deviceMonitor_reducer'
import deviceMonitorTreeReducer from './deviceMonitorTree_reducer'
import equipmentReducer from './equipment_reducer'
import indexReducer from './index_reducer'
import operationReducer from './operation_reducer'
import operationFlowReducer from './operationflow_reducer'
import visioReducer from './visio_reducer'
import alarmReducer from './alarm_reducer'
import noticeReducer from './notice_reducer'
import slaReducer from './sla_reducer'
import repositoryReducer from './repository_reducer'
import systemReducer from './system_reducer'
import assetManageReducer from './assetManage_reducer'
import topologyNavReducer from './topologyNav_reducer'
import requestDataReducer from './requestData_reducer'
import yftsystemRoleReducer from './systemRole_reducer'
import flowDesignReducer from './flowdesign_reducer'
import dataDictReducer from './dataDict_reducer'
import reportManageReducer from './reportManage_reducer'
import assetReportReducer from './assetReport_reducer'


const rootReducer = combineReducers({
  loginReducer,
  navbarReducer,
  deviceMonitorReducer,
  deviceMonitorTreeReducer,
  equipmentReducer,
  indexReducer,
  operationReducer,
  operationFlowReducer,
  visioReducer,
  alarmReducer,
  noticeReducer,
  slaReducer,
  repositoryReducer,
  systemReducer,
  assetManageReducer,
  topologyNavReducer,
  requestDataReducer,
  yftsystemRoleReducer,
  flowDesignReducer,
  dataDictReducer,
  reportManageReducer,
  assetReportReducer,
})

export default rootReducer
