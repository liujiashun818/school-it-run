/**
* 首页、告警升级列表相关的action方法
*/

var oData = require('../server/odataIndex');
var Store = require('../server/store');
var base64 = require('../utils/base64.js');
import * as requestDataActions from './requestData_action'

export const GET_CITY_INDEXDATA = 'GET_CITY_INDEXDATA'    //获取市级首页数据
export const SET_CITY_INDEXDATA = 'SET_CITY_INDEXDATA'    //保存市级首页数据
export const CHANGE_CITY_INDEXDATA = 'CHANGE_CITY_INDEXDATA'  //获取切换的数据
export const SET_CHANGE_INDEXDATA = 'SET_CHANGE_INDEXDATA'   //保存切换的数据
export const GET_DEPART_INDEXDATA = 'GET_DEPART_INDEXDATA' //获取厅级首页数据
export const SET_DEPART_INDEXDATA = 'SET_DEPART_INDEXDATA' //保存厅级首页数据
export const CHANGE_DEPT_INDEXDATA = 'CHANGE_DEPT_INDEXDATA'  //获取切换的数据
export const SET_CHANGE_DEPTINDEXDATA = 'SET_CHANGE_DEPTINDEXDATA'   //保存切换的数据
export const GETREPORTERRORDATA = 'GETREPORTERRORDATA'       //获取所有报警升级
export const GETUSERINFOBYTOKEN ='GETUSERINFOBYTOKEN'        //根据token 获取用户权限信息
export const GETREPORTERRORDATAUI_EQUIPMENTTYPES ='GETREPORTERRORDATAUI_EQUIPMENTTYPES' //获取报警下拉框-设备类型
export const GETREPORTERRORDATAUI_ORGANIZATIONS ='GETREPORTERRORDATAUI_ORGANIZATIONS' //获取报警下拉框
export const SET_LINSHIDATA = 'SET_LINSHIDATA'
export const SET_LINSHINODE = 'SET_LINSHINODE'
export const SET_LINSHINAME = 'SET_LINSHINAME'
export const SET_VERSION_INDEX = 'SET_VERSION_INDEX' //获取程序版本信息
export const SET_NEWNAVBAR_COMPONENT = 'SET_NEWNAVBAR_COMPONENT' //保存newNavBar控件
export const SET_BUSOBDEFNAMES = 'SET_BUSOBDEFNAMES' //保存所有业务对象名
export const SET_BUSOBDEFFIELD = 'SET_BUSOBDEFFIELD' //保存业务对象字段

export function setBusObDefField(data) {
  return {
    type: SET_BUSOBDEFFIELD,
    data
  }
}

export function setBusObDefNames(data) {
  return {
    type: SET_BUSOBDEFNAMES,
    data
  }
}

//调用reducer
export function setCityIndexData(data) {
    return {
        type: SET_CITY_INDEXDATA,
        data
    }
}
//调用reducer
export function setChangeIndexData(data) {
    return {
        type: SET_CHANGE_INDEXDATA,
        data
    }
}
//调用reducer
export function setDepartIndexData(data){
    return {
        type: SET_DEPART_INDEXDATA,
        data
    }
}
export function setChangeDeptIndexData(data){
    return {
        type: SET_CHANGE_DEPTINDEXDATA,
        data
    }
}

export function setReportErrorData(reportErrorData){
    return {
        type: GETREPORTERRORDATA,
        reportErrorData
    }
}
export function setReportErrorDataUI_equipmentTypes(equipmentTypes){
    return {
        type: GETREPORTERRORDATAUI_EQUIPMENTTYPES,
        equipmentTypes
    }
}
export function setReportErrorDataUI_organizations(organizations){
    return {
        type: GETREPORTERRORDATAUI_ORGANIZATIONS,
        organizations
    }
}
export function set_linshiData(data){
    return {
        type: SET_LINSHIDATA,
        data
    }
}
export function set_linshiNode(data){
    return {
        type: SET_LINSHINODE,
        data
    }
}
export function set_linshiName(data){
    return {
        type: SET_LINSHINAME,
        data
    }
}

export function set_NewNavbarComponent(newnavbarcomponent){
    return {
        type: SET_NEWNAVBAR_COMPONENT,
        newnavbarcomponent
    }
}

//消息提示 showDialog("基础设置","修改成功。");
function showDialog(title,content) {
    setTimeout(function(){
      document.getElementById('publicMessageModelTitle').innerHTML = title;
      document.getElementById('publicMessageModalcontent').innerHTML = content;
      $('#publicMessageModal').modal('show');
    },100);
}

//外部调用的方法--获取市级首页数据
export function getCityIndexData() {
  return dispatch => {
      return dispatch(oDataGetCityIndexData())
  }
}

//外部调用的方法--获取市级首页改变的数据
export function changeCityIndexData(type) {
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    return dispatch(oDataChangeCityIndexData(type));
  }
}

//外部调用的方法--获取厅级首页数据
export function getDepartIndexData() {
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    return dispatch(oDataGetDepartIndexData());
  }
}

//外部调用的方法--获取厅级首页改变的数据
export function changeDeptIndexData(type){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    return dispatch(oDataChangeDepartIndexData(type));
  }
}

//内部调用访问数据库的方法--获取市级首页数据
function oDataGetCityIndexData(){
  return dispatch => {
    oData.getCityIndexData(dispatch, data => dispatch(receiveCityIndexData(data)));
  }
}

//内部调用访问数据库的方法--获取市级首页改变的数据
function oDataChangeCityIndexData(type){
  return dispatch =>{
    oData.changeCityIndexData(type,dispatch,data => dispatch(receiveChangeCityIndexData(data)));
  }
}

//内部调用访问数据库的方法--获取厅级首页数据
function oDataGetDepartIndexData(){
  return dispatch => {
    oData.getDepartmentIndexData(dispatch,data => dispatch(receiveDepartIndexData(data)));
  }
}

//内部调用访问数据库的方法--获取厅级首页改变的数据
function oDataChangeDepartIndexData(type){
  return dispatch => {
    oData.changeDepartmentIndexData(type,dispatch,data => dispatch(receiveChangeDepartIndexData(data)));
  }
}

//处理市级首页数据
function receiveCityIndexData(data){
  return dispatch => {
    var cityIndexData = {
      monitorData : "",
      assetData : "",
      workOrderData : "",
      alarmData : "",
    };
    if(data.results!=null && data.results!="" && data.results.length>0){
      var result = data.results[0];
      var monitorData = result.MONITORDATA;
      monitorData = eval(monitorData);
      var assetData = result.ASSETSDATA;
      assetData = eval(assetData);
      var workOrderData = result.WORKORDERDATA;
      workOrderData = eval(workOrderData);
      var alarmData = result.ALARMEVENT;
      alarmData = eval(alarmData);
      // console.log(alarmData,that.cityIndexData.alarmData);
      cityIndexData.monitorData = monitorData[0];
      cityIndexData.assetData = assetData;
      cityIndexData.workOrderData = workOrderData;
      cityIndexData.alarmData = alarmData;
      //console.log("查询成功",cityIndexData);
      dispatch(requestDataActions.setRequestSuccess());
    }else{
      //console.log("get data error");
      dispatch(requestDataActions.setRequestFail());
    };
    return dispatch(setCityIndexData(cityIndexData));
  }
}

//处理市级首页改变的数据
function receiveChangeCityIndexData(data){
  return dispatch => {
    var result = data.results[0].MONITORDATA;
    result = eval(result);
    var monitorData = result[0];
    dispatch(requestDataActions.setRequestSuccess());
    return dispatch(setChangeIndexData(monitorData));
  }
}

//处理厅级首页数据
function receiveDepartIndexData(data){
  // console.log(data);
  return dispatch => {
    var departmentIndexData = {
      monitorData:"",
      workOrderData:"",
      alarmData:"",
      statusData:"",
      systemInfo:""
    };
    if(data.results!=null && data.results!="" && data.results.length>0){
      var result = data.results[0];
      var monitorData = result.MONITORDATA;
      monitorData = eval(monitorData);
      for(var i=0;i<monitorData.length;i++){
        var rate = monitorData[i].intactrate;
        rate = parseInt(rate);
        monitorData[i].intactrate = rate;
      };
      var workOrderData = result.WORKORDERDATA;
      workOrderData = eval(workOrderData);
      var alarmData = result.ALARMDATA;
      alarmData = eval(alarmData);
      // for(var i=0;i<alarmData.length;i++){
      //   var cdate = alarmData[i].date;
      //   var dateText = cdate.substring(0,cdate.length-2);
      //   alarmData[i].date = dateText;
      // };
      var statusData = result.STATUSSTATISTICS;
      statusData = eval(statusData);
      var releasetopic = result.RELEASETOPIC;
      releasetopic = eval(releasetopic);
      departmentIndexData.monitorData = monitorData;
      departmentIndexData.workOrderData = workOrderData;
      departmentIndexData.alarmData = alarmData;
      departmentIndexData.statusData = statusData;
      departmentIndexData.systemInfo = releasetopic;
      console.log("查询成功",departmentIndexData);
      dispatch(requestDataActions.setRequestSuccess());
    }else{
      dispatch(requestDataActions.setRequestFail());
      console.log("get data error");
    };
    return dispatch(setDepartIndexData(departmentIndexData));
  }
}

//处理厅级首页改变的数据
function receiveChangeDepartIndexData(data){
  return dispatch => {
    var result = data.results[0].STATUSSTATISTICS;
    result = eval("("+result+")");
    dispatch(requestDataActions.setRequestSuccess());
    return dispatch(setChangeDeptIndexData(result));
  }
}

//获取程序版本信息
function getVersionindex(){
  oData.getVersion(function(data){
      Store.set("Version",data);
  });
}

//跳转页时，存在菜单权限不对正常的情况，所以需要重新初始化一下
function iniNewNavBarMenu(){
    var groupname = Store.get("GROUP_NAME");
    var role = localStorage.getItem("CURRENT_ROLENAME");
    var name = localStorage.getItem("localUserName");
    $("#navbar2logininfor").text(groupname+" | "+role +" | "+name);

    var bShowIndexPages = false;
    var bShowEquipmentmanage = false, bShowMonitor = false, bShowAlarm = false, bShowSetting = false, bShowTemplateset = false,bShowMonitorSet = false,bShowResourceSet = false, bShowDashboardCenter = false;
    var bShowAlarmConfig = false, bShowAlarmRulesIssue = false, bShowAlarmEvent = false, bShowAlarmUpgrade = false;
    var bShowView = false,bShowTopologyView = false;
    var bShowAlarmLog = false,bShowAlarmRule = false;
    var bShowAssetmanage = false, bShowAsset = false, bShowAssetStatistic = false, bShowAssetList = false, bShowAssetMonitorsync = false, bShowAssetMaintain = false, bShowMaintain = false, bShowMaintainList = false;
    var bShowNetworktopology = false, bShowTopologynav = false;
    var bShowOperationmanage = false, bShowWorkordermanage = false, bShowCreateworkorder = false, bShowWorkspace = false,bShowAutoWorkOrderRules=false,bShowSla = false, bShowSlaList = false;
    var bShowNoticemanage = false, bShowNoticehistorylist = false, bShowNoticesubmitlist = false, bShowNoticeapproval = false, bShowNoticelist = false;
    var bShowRepository = false, bShowRepositorylist = false, bShowRepositoryapproval = false, bShowFlowdesign = false, bShowDutyManagement = false,bShowCalendar = false,bShowRotaSet = false;
    var bShowReportmanage = false, bShowVideoReport = false, bShowCameravideocheck = false, bShowCameraofflinereport = false, bShowCameramedialostreport = false, bShowCameravideolostreport = false, bShowCameravideorealtimereport = false, bShowCameraonlinetrendsreport = false;
    var bShowNovideoReport = false, bShowDvrstatisticsreport = false, bShowNvrstatisticsreport = false, bShowEncoderstatisticsreport = false, bShowServerstatisticsreport = false, bShowNetworkstatisticsreport = false, bShowFirewallstatisticsreport = false, bShowDatabasestatisticsreport = false;
    var bShowWorkorderReport = false,bShowWorkorderStatisticReport = false, bShowAssetReport = false, bShowAssetstatisticReport = false, bShowAssetmaintainReport = false, bShowBillingReport = false,bShowAssessmentstatisticReport = false;
    var bShowSystemmanage = false, bShowGroupmanage = false, bShowUserlist = false, bShowRoleManage = false,bShowDataDict = false, bShowLineUser = false,softwarelicence=false,
        bShowDepVideoReport = false, bShowDepCameravideocheck = false,
        bShowDepNovideoReport = false, bShowDepDvrstatisticsreport = false, bShowDepNvrstatisticsreport = false, bShowDepEncoderstatisticsreport = false,bShowDepServerstatisticsreport = false, bShowDepNetworkstatisticsreport = false, bShowDepFirewallstatisticsreport = false, bShowDepDatabasestatisticsreport = false,
        bShowDepWorkorderReport = false,bShowDepWorkorderStatisticReport = false;

    var temp = Store.get("PERMISSIONS");
    temp = base64.base64decode(temp);
    temp = decodeURI(temp);

    var permissionsValue = eval(temp);
    var firstMenu = [];//一级层菜单（首页、资源监测、网络拓扑、资产管理、运维管理、报表管理、系统设置）
    var indexMenu = [];//暂时没有数据(二级菜单)
    var resourceMenu = [];//资源监测包括下级菜单(二级菜单)
    var mapMenu = [];//网络拓扑包括下级菜单(二级菜单)
    var assetMenu = [];//资产管理包括下级菜单(二级菜单)
    var workOrderMenu = [];//运维管理包括下级菜单(二级菜单)
    var reportMenu = [];//报表管理包括下级菜单(二级菜单) :注报表权限：仅控制到二级菜单，第三级不需要控制。
    var systemMenu = [];//系统设置包括下级菜单(二级菜单)
    var level = localStorage.getItem('LEVEL');//1 厅级;2 市级
    for(var i = 0; i < permissionsValue.length; i++) {
        if(permissionsValue[i].resourceType == "/indexPages") {
            bShowIndexPages = true;
        }else if(permissionsValue[i].resourceType == "/equipmentmanage") {
            bShowEquipmentmanage = true;
        }else if(permissionsValue[i].resourceType == "/equipmentmanage/monitor") {
            bShowMonitor = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm") {
            bShowAlarm = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmrule") {
            bShowAlarmRule = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/templateset") {
            bShowTemplateset = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmrulesissue") {
            bShowAlarmRulesIssue = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmevent") {
            bShowAlarmEvent = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/reporterror") {
            bShowAlarmUpgrade = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmlog") {
            bShowAlarmLog = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/grafana") {
            bShowDashboardCenter = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/setting") {
            bShowSetting = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/setting/alarmconfig") {
            bShowAlarmConfig = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/setting/monitorset") {
            bShowMonitorSet = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/setting/resourceset") {
            bShowResourceSet = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/view"){
            bShowView = true;
        }
        else if(permissionsValue[i].resourceType == "/equipmentmanage/view/topologyview") {
            bShowTopologyView = true;
        }
        else if(permissionsValue[i].resourceType == "/assetmanage") {
            bShowAssetmanage = true;
        }
        else if(permissionsValue[i].resourceType == "/assetmanage/asset") {
            bShowAsset = true;
        }
        else if(permissionsValue[i].resourceType == "/assetmanage/asset/statistic") {
            bShowAssetStatistic = true;
        }
        else if(permissionsValue[i].resourceType == "/assetmanage/asset/assetlist") {
            bShowAssetList = true;
        }
        else if(permissionsValue[i].resourceType == "/assetmanage/asset/monitorsync") {
            bShowAssetMonitorsync = true;
        }
        else if(permissionsValue[i].resourceType == "/assetmanage/asset/assetmaintain") {
            bShowAssetMaintain = true;
        }
        else if(permissionsValue[i].resourceType == "/assetmanage/maintain") {
            bShowMaintain = true;
        }
        else if(permissionsValue[i].resourceType == "/assetmanage/maintain/maintainlist") {
            bShowMaintainList = true;
        }
        else if(permissionsValue[i].resourceType == "/networktopology") {
            bShowNetworktopology = true;
        }
        else if(permissionsValue[i].resourceType == "/networktopology/topologynav") {
            bShowTopologynav = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage") {
            bShowOperationmanage = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/workordermanage") {
            bShowWorkordermanage = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/workordermanage/workspace") {
            bShowWorkspace = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/workordermanage/autoworkorderrules") {
            bShowAutoWorkOrderRules = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/workordermanage/createworkorder") {
            bShowCreateworkorder = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/sla") {
            bShowSla = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/sla/slalist") {
            bShowSlaList = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/noticemanage") {
            bShowNoticemanage = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/noticemanage/noticehistorylist") {
            bShowNoticehistorylist = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/noticemanage/noticesubmitlist") {
            bShowNoticesubmitlist = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/noticemanage/noticeapproval") {
            bShowNoticeapproval = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/noticemanage/noticelist") {
            bShowNoticelist = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/repository") {
            bShowRepository = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/repository/repositorylist") {
            bShowRepositorylist = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/repository/repositoryapproval") {
            bShowRepositoryapproval = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/flowdesign") {
            bShowFlowdesign = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/dutymanagement") {
            bShowDutyManagement = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/dutymanagement/calendar") {
            bShowCalendar = true;
        }
        else if(permissionsValue[i].resourceType == "/operationmanage/dutymanagement/rotaset") {
            bShowRotaSet = true;
        }
        else if(permissionsValue[i].resourceType == "/reportmanage") {
            bShowReportmanage = true;
        }
        else if(permissionsValue[i].resourceType == "/reportmanage/video") {
            if(level == 1){
              bShowDepVideoReport = true;
            }else if(level == 2){
              bShowVideoReport = true;
            }
        }
        // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameravideocheck") {
        //     if(level == 1){
        // 			bShowDepCameravideocheck = true;
        // 		}else if(level == 2){
        // 			bShowCameravideocheck = true;
        // 		}
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameraofflinereport") {
        //     bShowCameraofflinereport = true;
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameramedialostreport") {
        //     bShowCameramedialostreport = true;
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameravideolostreport") {
        //     bShowCameravideolostreport = true;
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameravideorealtimereport") {
        //     bShowCameravideorealtimereport = true;
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameraonlinetrendsreport") {
        //     bShowCameraonlinetrendsreport = true;
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/depvideo") {
        //     bShowDepVideoReport = true;
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/depvideo/cameravideocheck") {
        //     bShowDepCameravideocheck = true;
        // }
        else if(permissionsValue[i].resourceType == "/reportmanage/novideo") {
            if(level == 1){
              bShowDepNovideoReport = true;
            }else if(level == 2){
              bShowNovideoReport = true;
            }
        }
        // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/dvrstatisticsreport") {
        //     if(level == 1){
        //       bShowDepDvrstatisticsreport = true;
        // 		}else if(level == 2){
        //       bShowDvrstatisticsreport = true;
        // 		}
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/nvrstatisticsreport") {
        //     if(level == 1){
        //       bShowDepNvrstatisticsreport = true;
        // 		}else if(level == 2){
        //       bShowNvrstatisticsreport = true;
        // 		}
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/encoderstatisticsreport") {
        //     if(level == 1){
        //       bShowDepEncoderstatisticsreport = true;
        // 		}else if(level == 2){
        //       bShowEncoderstatisticsreport = true;
        // 		}
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/serverstatisticsreport") {
        //     if(level == 1){
        //       bShowDepServerstatisticsreport = true;
        // 		}else if(level == 2){
        //       bShowServerstatisticsreport = true;
        // 		}
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/networkstatisticsreport") {
        //     if(level == 1){
        // 			bShowDepNetworkstatisticsreport = true;
        // 		}else if(level == 2){
        // 			bShowNetworkstatisticsreport = true;
        // 		}
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/firewallstatisticsreport") {
        //     if(level == 1){
        // 			bShowDepFirewallstatisticsreport = true;
        // 		}else if(level == 2){
        // 			bShowFirewallstatisticsreport = true;
        // 		}
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/databasestatisticsreport") {
        //     if(level == 1){
        // 			bShowDepDatabasestatisticsreport = true;
        // 		}else if(level == 2){
        // 			bShowDatabasestatisticsreport = true;
        // 		}
        // }
        else if(permissionsValue[i].resourceType == "/reportmanage/workorder") {
            if(level == 1){
              bShowDepWorkorderReport = true;
            }else if(level == 2){
              bShowWorkorderReport = true;
            }
        }
        // else if(permissionsValue[i].resourceType == "/reportmanage/workorder/statistic") {
        //     if(level == 1){
        // 			bShowDepWorkorderStatisticReport = true;
        // 		}else if(level == 2){
        // 			bShowWorkorderStatisticReport = true;
        // 		}
        // }
        else if(permissionsValue[i].resourceType == "/reportmanage/asset") {
            bShowAssetReport = true;
        }
        // else if(permissionsValue[i].resourceType == "/reportmanage/asset/assetstatistic") {
        //     bShowAssetstatisticReport = true;
        // }
        // else if(permissionsValue[i].resourceType == "/reportmanage/asset/assetmaintain") {
        //     bShowAssetmaintainReport = true;
        // }
        else if(permissionsValue[i].resourceType == "/reportmanage/billing") {
            bShowBillingReport = true;
        }
        // else if(permissionsValue[i].resourceType == "/reportmanage/billing/assessmentstatistic") {
        //     bShowAssessmentstatisticReport = true;
        // }
        else if(permissionsValue[i].resourceType == "/systemmanage") {
            bShowSystemmanage = true;
        }else if(permissionsValue[i].resourceType == "/systemmanage/groupmanage") {
            bShowGroupmanage = true;
        }else if(permissionsValue[i].resourceType == "/systemmanage/userlist") {
            bShowUserlist = true;
        }else if(permissionsValue[i].resourceType == "/systemmanage/rolemanage") {
            bShowRoleManage = true;
        }else if(permissionsValue[i].resourceType == "/systemmanage/datadict"){
            bShowDataDict = true;
        }else if(permissionsValue[i].resourceType == "/systemmanage/onlineuser"){
            bShowLineUser = true;
        }else if(permissionsValue[i].resourceType == "/systemmanage/softwarelicence"){
          softwarelicence=true;
        }
    };
    // var moduleTab = this.props.moduleTab;
    // var firstModu = "";
    // var secondModu = "";
    // if(moduleTab!=null && moduleTab!=""){
    //   var moduleTabs = moduleTab.split("-");
    //   firstModu = moduleTabs[0];
    //   secondModu = moduleTabs[1];
    // };
    // console.log(firstModu,secondModu);

    if(bShowIndexPages) {
      if(level=="1") {
        firstMenu.push({id:1,name:"首页",pid:0,toUrl:"departmentIndex"});
      };
      if(level=="2") {
        firstMenu.push({id:1,name:"首页",pid:0,toUrl:"cityIndex"});
      };
    };
    if(bShowEquipmentmanage) {
      if(bShowMonitor) {
        resourceMenu.push({id:1,name:"资源监测",pid:0,toUrl:"equipmentManage/MonitorPage",markId:1});
      }
      if(bShowAlarm) {
        if(bShowAlarmRule) {
          resourceMenu.push({id:2,name:"告警信息",pid:0,toUrl:"equipmentManage/alarmRulePage",markId:2});
        }else if(bShowTemplateset){
          resourceMenu.push({id:2,name:"告警信息",pid:0,toUrl:"equipmentManage/templateSetPage",markId:2});
        }else if(bShowAlarmRulesIssue){
          resourceMenu.push({id:2,name:"告警信息",pid:0,toUrl:"equipmentManage/alarmRulesIssuePage",markId:2});
        }else if(bShowAlarmEvent){
          resourceMenu.push({id:2,name:"告警信息",pid:0,toUrl:"equipmentManage/alarmEventPage",markId:2});
        }else if(bShowAlarmUpgrade){
          resourceMenu.push({id:2,name:"告警信息",pid:0,toUrl:"equipmentManage/reportError",markId:2});
        }else if(bShowAlarmLog){
          resourceMenu.push({id:2,name:"告警信息",pid:0,toUrl:"equipmentManage/alarmLogPage",markId:2});
        }
      }
      if(bShowDashboardCenter) {
        resourceMenu.push({id:3,name:"仪表板中心",pid:0,toUrl:"equipmentManage/DashboardCenter",markId:4});
      }
      if(bShowSetting) {
        if(bShowAlarmConfig) {
          resourceMenu.push({id:4,name:"诊断阈值设置",pid:0,toUrl:"equipmentManage/alarmConfigPage",markId:3});
        }else if(bShowMonitorSet){
          resourceMenu.push({id:4,name:"诊断阈值设置",pid:0,toUrl:"equipmentManage/monitorSetPage",markId:3});
        }else if(bShowResourceSet){
          resourceMenu.push({id:4,name:"诊断阈值设置",pid:0,toUrl:"equipmentManage/resourceSetPage",markId:3});
        }
      }
      if(bShowView){
        if(bShowTopologyView){
          resourceMenu.push({id:5,name:"拓扑视图",pid:0,toUrl:"equipmentManage/topologyPage",markId:5});
        }
      }
      if(resourceMenu.length > 0){
        firstMenu.push({id:2,name:"资源监测",pid:0,toUrl:resourceMenu[0].toUrl});
      }
    }
    if(bShowAssetmanage) {
      if(bShowAsset) {
        if(bShowAssetStatistic) {
          assetMenu.push({id:1,name:"资产",pid:0,toUrl:"assetManage/statistic",markId:1});
        }else if(bShowAssetList) {
          assetMenu.push({id:1,name:"资产",pid:0,toUrl:"assetManage/assetList",markId:1});
        }else if(bShowAssetMonitorsync) {
          assetMenu.push({id:1,name:"资产",pid:0,toUrl:"assetManage/monitorSync",markId:1});
        }else if(bShowAssetMaintain) {
          assetMenu.push({id:1,name:"资产",pid:0,toUrl:"assetManage/assetMaintain",markId:1});
        }
      };
      if(bShowMaintain) {
        if(bShowMaintainList){
          assetMenu.push({id:2,name:"维修",pid:0,toUrl:"assetManage/maintain",markId:4});
        }
      };
      if(assetMenu.length > 0){
        firstMenu.push({id:4,name:"资产管理",pid:0,toUrl:assetMenu[0].toUrl});
      }
    };
    if(bShowNetworktopology && level == "1") {
      if(bShowTopologynav) {
        mapMenu.push({id:1,name:"拓扑导航",pid:0,toUrl:"networkTopology/topologyNav",markId:1});
      };
      if(mapMenu.length > 0){
        firstMenu.push({id:3,name:"网络拓扑",pid:0,toUrl:mapMenu[0].toUrl});
      }
    }
    if(bShowOperationmanage) {
      if(bShowWorkordermanage) {
        if(bShowWorkspace){
          workOrderMenu.push({id:1,name:"工单管理",pid:0,toUrl:"operationManage/myWorkSpace",markId:1});
        }else if(bShowAutoWorkOrderRules){
          workOrderMenu.push({id:1,name:"工单管理",pid:0,toUrl:"operationManage/autoWorkOrderRules",markId:1});
        }else if(bShowCreateworkorder){
          workOrderMenu.push({id:1,name:"工单管理",pid:0,toUrl:"operationManage/createOperation",markId:1});
        }
      }
      if(bShowSla) {
        if(bShowSlaList){
          workOrderMenu.push({id:2,name:"服务级别协议",pid:0,toUrl:"baseManage/slaList",markId:3});
        }
      }
      if(bShowNoticemanage) {
        if(bShowNoticehistorylist){
          workOrderMenu.push({id:3,name:"发布管理",pid:0,toUrl:"baseManage/noticeHistoryList",markId:4});
        }else if (bShowNoticesubmitlist) {
          workOrderMenu.push({id:3,name:"发布管理",pid:0,toUrl:"baseManage/noticeSubmitList",markId:4});
        }else if (bShowNoticeapproval) {
          workOrderMenu.push({id:3,name:"发布管理",pid:0,toUrl:"baseManage/noticeApproval",markId:4});
        }else if (bShowNoticelist) {
          workOrderMenu.push({id:3,name:"发布管理",pid:0,toUrl:"baseManage/noticeList",markId:4});
        }
      }
      if(bShowRepository) {
        if (bShowRepositorylist) {
          workOrderMenu.push({id:4,name:"知识库",pid:0,toUrl:"baseManage/repositoryList",markId:5});
        }else if (bShowRepositoryapproval) {
          workOrderMenu.push({id:4,name:"知识库",pid:0,toUrl:"baseManage/repositoryApproval",markId:5});
        }
      }
      if(bShowFlowdesign) {
        workOrderMenu.push({id:5,name:"流程设计",pid:0,toUrl:"operationManage/flowDesign",markId:6});
      }
      if(bShowDutyManagement) {
        if (bShowCalendar) {
          workOrderMenu.push({id:6,name:"值班管理",pid:0,toUrl:"operationManage/dutymanagement/calendar",markId:7});
        }else if (bShowRotaSet) {
          workOrderMenu.push({id:6,name:"值班管理",pid:0,toUrl:"operationManage/dutymanagement/rotaset",markId:7});
        }
      }
      if(workOrderMenu.length > 0){
        firstMenu.push({id:5,name:"运维管理",pid:0,toUrl:workOrderMenu[0].toUrl});
      }
    }
    if(bShowReportmanage) {
      if(bShowVideoReport && level == "2") {
        // if (bShowCameravideocheck) {
          reportMenu.push({id:1,name:"视频类设备",pid:0,toUrl:"reportManage/videoReport/cameraVideoCheck",markId:1});
        // }else if (bShowCameraofflinereport) {
        //   reportMenu.push({id:1,name:"视频类设备",pid:0,toUrl:"reportManage/videoReport/cameraOfflineReport"});
        // }else if (bShowCameramedialostreport) {
        //   reportMenu.push({id:1,name:"视频类设备",pid:0,toUrl:"reportManage/videoReport/cameraMediaLostReport"});
        // }else if (bShowCameravideolostreport) {
        //   reportMenu.push({id:1,name:"视频类设备",pid:0,toUrl:"reportManage/videoReport/cameraVideoLostReport"});
        // }else if (bShowCameravideorealtimereport) {
        //   reportMenu.push({id:1,name:"视频类设备",pid:0,toUrl:"reportManage/videoReport/cameraVideoRealTimeReport"});
        // }else if (bShowCameraonlinetrendsreport) {
        //   reportMenu.push({id:1,name:"视频类设备",pid:0,toUrl:"reportManage/videoReport/cameraOnlineTrendsReport"});
        // }
      }
      if(bShowDepVideoReport && level == "1") {
        // if (bShowDepCameravideocheck) {
          reportMenu.push({id:2,name:"视频类设备",pid:0,toUrl:"reportManage/depvideoReport/cameraVideoCheck",markId:6});
        // }
      }
      if(bShowNovideoReport && level == "2") {
        // if (bShowDvrstatisticsreport) {
          reportMenu.push({id:3,name:"非视频类设备",pid:0,toUrl:"reportManage/nonVideoReport/dvrStatisticsReportPage",markId:2});
        // }else if (bShowNvrstatisticsreport) {
        //   reportMenu.push({id:3,name:"非视频类设备",pid:0,toUrl:"reportManage/nonVideoReport/nvrStatisticsReportPage"});
        // }else if (bShowEncoderstatisticsreport) {
        //   reportMenu.push({id:3,name:"非视频类设备",pid:0,toUrl:"reportManage/nonVideoReport/encoderStatisticsReportPage"});
        // }else if (bShowServerstatisticsreport) {
        //   reportMenu.push({id:3,name:"非视频类设备",pid:0,toUrl:"reportManage/nonVideoReport/serverStatisticsReportPage"});
        // }else if (bShowNetworkstatisticsreport) {
        //   reportMenu.push({id:3,name:"非视频类设备",pid:0,toUrl:"reportManage/nonVideoReport/networkStatisticsReportPage"});
        // }else if (bShowFirewallstatisticsreport) {
        //   reportMenu.push({id:3,name:"非视频类设备",pid:0,toUrl:"reportManage/nonVideoReport/firewallStatisticsReportPage"});
        // }else if (bShowDatabasestatisticsreport) {
        //   reportMenu.push({id:3,name:"非视频类设备",pid:0,toUrl:"reportManage/nonVideoReport/databaseStatisticsReportPage"});
        // }
      }
      if(bShowDepNovideoReport && level == "1") {
        // if (bShowDepDvrstatisticsreport) {
          reportMenu.push({id:4,name:"非视频类设备",pid:0,toUrl:"reportManage/depNonVideoReport/depDvrStatisticsReportPage",markId:7});
        // }else if (bShowDepNvrstatisticsreport) {
        //   reportMenu.push({id:4,name:"非视频类设备",pid:0,toUrl:"reportManage/depNonVideoReport/depNvrStatisticsReportPage"});
        // }else if (bShowDepEncoderstatisticsreport) {
        //   reportMenu.push({id:4,name:"非视频类设备",pid:0,toUrl:"reportManage/depNonVideoReport/depEncoderStatisticsReportPage"});
        // }else if (bShowDepServerstatisticsreport) {
        //   reportMenu.push({id:4,name:"非视频类设备",pid:0,toUrl:"reportManage/depNonVideoReport/serverStatisticsReportPage"});
        // }else if (bShowDepNetworkstatisticsreport) {
        //   reportMenu.push({id:4,name:"非视频类设备",pid:0,toUrl:"reportManage/depNonVideoReport/networkStatisticsReportPage"});
        // }else if (bShowDepFirewallstatisticsreport) {
        //   reportMenu.push({id:4,name:"非视频类设备",pid:0,toUrl:"reportManage/depNonVideoReport/firewallStatisticsReportPage"});
        // }else if (bShowDepDatabasestatisticsreport) {
        //   reportMenu.push({id:4,name:"非视频类设备",pid:0,toUrl:"reportManage/depNonVideoReport/databaseStatisticsReportPage"});
        // }
      }
      if(bShowWorkorderReport && level == "2") {
        // if (bShowWorkorderStatisticReport) {
          reportMenu.push({id:5,name:"工单",pid:0,toUrl:"reportManage/orderStatisticsReport",markId:3});
        // }
      }
      if(bShowDepWorkorderReport && level == "1") {
        // if (bShowDepWorkorderStatisticReport) {
          reportMenu.push({id:6,name:"工单",pid:0,toUrl:"reportManage/depOrderReport",markId:8});
        // }
      };
      if(bShowAssetReport) {
        // if (bShowAssetstatisticReport) {
          reportMenu.push({id:7,name:"资产",pid:0,toUrl:"reportManage/assetStatistic",markId:4});
        // }else if (bShowAssetmaintainReport) {
        //   reportMenu.push({id:7,name:"资产",pid:0,toUrl:"reportManage/assetMaintain"});
        // }
      }
      if(bShowBillingReport) {
        // if (bShowAssessmentstatisticReport) {
          reportMenu.push({id:8,name:"计费",pid:0,toUrl:"reportManage/chargeStatisticsReport",markId:5});
        // }
      }
      if(reportMenu.length > 0){
        firstMenu.push({id:6,name:"报表管理",pid:0,toUrl:reportMenu[0].toUrl});
      }
    }
    if(bShowSystemmanage) {
      if(bShowGroupmanage) {
        systemMenu.push({id:1,name:"组织机构",pid:0,toUrl:"systemManage/groupManage",markId:1});
      }
      if(bShowUserlist) {
        systemMenu.push({id:2,name:"用户管理",pid:0,toUrl:"systemManage/userListPage",markId:2});
      }
      if(bShowRoleManage) {
        systemMenu.push({id:3,name:"角色和权限管理",pid:0,toUrl:"systemManage/roleManagePage",markId:3});
      }
      if(bShowDataDict) {
        systemMenu.push({id:4,name:"数据字典",pid:0,toUrl:"systemManage/dataDictPage",markId:4});
      }
      if(bShowLineUser) {
        systemMenu.push({id:5,name:"在线用户",pid:0,toUrl:"systemManage/onLineUserListPage",markId:5});
      }
      if(softwarelicence){
        systemMenu.push({id:6,name:"软件许可",pid:0,toUrl:"systemManage/infoPage",markId:6});
      }
      if(systemMenu.length > 0){
        firstMenu.push({id:7,name:"系统设置",pid:0,toUrl:systemMenu[0].toUrl});
      }
    }
    this.setState({
      firstMenu:firstMenu,
      indexMenu:indexMenu,
      resourceMenu:resourceMenu,
      mapMenu:mapMenu,
      assetMenu:assetMenu,
      workOrderMenu:workOrderMenu,
      reportMenu:reportMenu,
      systemMenu:systemMenu
      // ,
      // firstModu:firstModu,
      // secondModu:secondModu
    });
}

//控制登录后当前打开要跳转的页
function navToPage(){
        var bShowDepartmentIndex = false, bShowCityIndex = false;
        var bShowEquipmentmanage = false, bShowMonitor = false, bShowAlarm = false, bShowAlarmRules = false,bShowTemplateset = false,bShowAlarmRulesIssue = false, bShowAlarmEvent = false, bShowAlarmUpgrade = false, bShowAlarmlog = false;
        var bShowEquipmentmanageGrafana = false;
        var bShowEquipmentmanageSetting = false, bShowAlarmConfig = false, bShowMonitorset = false, bShowResourceset = false;
        var bShowEquipmentmanageView = false, bShowTopologyView = false;
        var bShowAssetmanage = false, bShowAsset = false, bShowAssetStatistic = false, bShowAssetList = false,bShowAssetMonitorsync = false,bShowAssetMaintain = false, bShowMaintain = false, bShowMaintainList = false;
        var bShowNetworktopology = false, bShowTopologynav = false;
        var bShowOperationmanage = false, bShowWorkordermanage = false, bShowCreateworkorder = false, bShowWorkspace = false, bShowSla = false, bShowSlaList = false;
        var bShowNoticemanage = false, bShowNoticehistorylist = false, bShowNoticesubmitlist = false, bShowNoticeapproval = false, bShowNoticelist = false;
        var bShowRepository = false, bShowRepositorylist = false, bShowRepositoryapproval = false, bShowFlowdesign = false;
        var bShowDutyManagement = false,bShowCalendar = false,bShowRotaset = false;
        var bShowReportmanage = false, bShowVideoReport = false, bShowCameravideocheck = false, bShowCameraofflinereport = false, bShowCameramedialostreport = false, bShowCameravideolostreport = false, bShowCameravideorealtimereport = false, bShowCameraonlinetrendsreport = false;
        var bShowNovideoReport = false, bShowDvrstatisticsreport = false, bShowNvrstatisticsreport = false, bShowEncoderstatisticsreport = false, bShowServerstatisticsreport = false, bShowNetworkstatisticsreport = false, bShowFirewallstatisticsreport = false, bShowDatabasestatisticsreport = false;
        var bShowWorkorderReport = false, bShowWorkorderStatisticReport = false,bShowAssetReport = false, bShowAssetstatisticReport = false, bShowAssetmaintainReport = false, bShowBillingReport = false, bShowAssessmentstatisticReport = false;
        var bShowDepVideoReport = false,bShowDepNovideoReport = false,bShowDepWorkorderReport = false;
        var bShowSystemmanage = false, bShowGroupmanage = false, bShowUserlist = false, bShowRoleManage = false, bShowDataDict = false, bShowOnLineUserList = false,bsoftwarelicence=false;

        var temp = Store.get("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        //首页
        var level = localStorage.getItem("LEVEL");//1 厅级;2 市级
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/indexPages") {
                if(level == 1){
                    bShowDepartmentIndex = true;
                }else if(level == 2){
                    bShowCityIndex = true;
                }
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage") {
                bShowEquipmentmanage = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/monitor") {
                bShowMonitor = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm") {
                bShowAlarm = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmrule") {
                bShowAlarmRules = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/templateset") {
                bShowTemplateset = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmrulesissue") {
                bShowAlarmRulesIssue = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmevent") {
                bShowAlarmEvent = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/reporterror") {
                bShowAlarmUpgrade = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmlog") {
                bShowAlarmlog = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/grafana") {
                bShowEquipmentmanageGrafana = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/setting") {
                bShowEquipmentmanageSetting = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/setting/alarmconfig") {
                bShowAlarmConfig = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/setting/monitorset") {
                bShowMonitorset = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/setting/resourceset") {
                bShowResourceset = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/view") {
                bShowEquipmentmanageView = true;
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/view/topologyview") {
                bShowTopologyView = true;
            }
            else if(permissionsValue[i].resourceType == "/assetmanage") {
                bShowAssetmanage = true;
            }
            else if(permissionsValue[i].resourceType == "/assetmanage/asset") {
                bShowAsset = true;
            }
            else if(permissionsValue[i].resourceType == "/assetmanage/asset/statistic") {
                bShowAssetStatistic = true;
            }
            else if(permissionsValue[i].resourceType == "/assetmanage/asset/assetlist") {
                bShowAssetList = true;
            }
            else if(permissionsValue[i].resourceType == "/assetmanage/asset/monitorsync") {
                bShowAssetMonitorsync = true;
            }
            else if(permissionsValue[i].resourceType == "/assetmanage/asset/assetmaintain") {
                bShowAssetMaintain = true;
            }
            else if(permissionsValue[i].resourceType == "/assetmanage/maintain") {
                bShowMaintain = true;
            }
            else if(permissionsValue[i].resourceType == "/assetmanage/maintain/maintainlist") {
                bShowMaintainList = true;
            }
            else if(permissionsValue[i].resourceType == "/networktopology") {
                bShowNetworktopology = true;
            }
            else if(permissionsValue[i].resourceType == "/networktopology/topologynav") {
                bShowTopologynav = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage") {
                bShowOperationmanage = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/workordermanage") {
                bShowWorkordermanage = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/workordermanage/createworkorder") {
                bShowCreateworkorder = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/workordermanage/workspace") {
                bShowWorkspace = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/sla") {
                bShowSla = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/sla/slalist") {
                bShowSlaList = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/noticemanage") {
                bShowNoticemanage = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/noticemanage/noticehistorylist") {
                bShowNoticehistorylist = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/noticemanage/noticesubmitlist") {
                bShowNoticesubmitlist = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/noticemanage/noticeapproval") {
                bShowNoticeapproval = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/noticemanage/noticelist") {
                bShowNoticelist = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/repository") {
                bShowRepository = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/repository/repositorylist") {
                bShowRepositorylist = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/repository/repositoryapproval") {
                bShowRepositoryapproval = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/flowdesign") {
                bShowFlowdesign = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/dutymanagement") {
                bShowDutyManagement = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/dutymanagement/calendar") {
                bShowCalendar = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/dutymanagement/rotaset") {
                bShowRotaset = true;
            }
            else if(permissionsValue[i].resourceType == "/reportmanage") {
                bShowReportmanage = true;
            }
            else if(permissionsValue[i].resourceType == "/reportmanage/video") {
                if(level == 1){
                  bShowDepVideoReport = true;
                }else if(level == 2){
                  bShowVideoReport = true;
                }
            }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameravideocheck") {
            //     bShowCameravideocheck = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameraofflinereport") {
            //     bShowCameraofflinereport = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameramedialostreport") {
            //     bShowCameramedialostreport = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameravideolostreport") {
            //     bShowCameravideolostreport = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameravideorealtimereport") {
            //     bShowCameravideorealtimereport = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameraonlinetrendsreport") {
            //     bShowCameraonlinetrendsreport = true;
            // }
            else if(permissionsValue[i].resourceType == "/reportmanage/novideo") {
                if(level == 1){
                  bShowDepNovideoReport = true;
                }else if(level == 2){
                  bShowNovideoReport = true;
                }
            }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/dvrstatisticsreport") {
            //     bShowDvrstatisticsreport = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/nvrstatisticsreport") {
            //     bShowNvrstatisticsreport = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/encoderstatisticsreport") {
            //     bShowEncoderstatisticsreport = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/serverstatisticsreport") {
            //     bShowServerstatisticsreport = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/networkstatisticsreport") {
            //     bShowNetworkstatisticsreport = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/firewallstatisticsreport") {
            //     bShowFirewallstatisticsreport = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/databasestatisticsreport") {
            //     bShowDatabasestatisticsreport = true;
            // }
            else if(permissionsValue[i].resourceType == "/reportmanage/workorder") {
                if(level == 1){
                  bShowDepWorkorderReport = true;
                }else if(level == 2){
                  bShowWorkorderReport = true;
                }
            }
            // else if(permissionsValue[i].resourceType == "/reportmanage/workorder/statistic") {
            //     bShowWorkorderStatisticReport = true;
            // }
            else if(permissionsValue[i].resourceType == "/reportmanage/asset") {
                bShowAssetReport = true;
            }
            // else if(permissionsValue[i].resourceType == "/reportmanage/asset/assetstatistic") {
            //     bShowAssetstatisticReport = true;
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/asset/assetmaintain") {
            //     bShowAssetmaintainReport = true;
            // }
            else if(permissionsValue[i].resourceType == "/reportmanage/billing") {
                bShowBillingReport = true;
            }
            // else if(permissionsValue[i].resourceType == "/reportmanage/billing/assessmentstatistic") {
            //     bShowAssessmentstatisticReport = true;
            // }
            else if(permissionsValue[i].resourceType == "/systemmanage") {
                bShowSystemmanage = true;
            }
            else if(permissionsValue[i].resourceType == "/systemmanage/groupmanage") {
                bShowGroupmanage = true;
            }
            else if(permissionsValue[i].resourceType == "/systemmanage/userlist") {
                bShowUserlist = true;
            }
            else if(permissionsValue[i].resourceType == "/systemmanage/rolemanage") {
                bShowRoleManage = true;
            }
            else if(permissionsValue[i].resourceType == "/systemmanage/datadict") {
                bShowDataDict = true;
            }
            else if(permissionsValue[i].resourceType == "/systemmanage/onlineuser") {
                bShowOnLineUserList = true;
            }
            else if(permissionsValue[i].resourceType == "/systemmanage/softwarelicence") {
                bsoftwarelicence = true;
            }
        }

        if(level == 2){
            if(bShowCityIndex) {
                window.location.href = '#/cityIndex';
                return false;
            }
        }else if(level == 1){
            if(bShowDepartmentIndex){
                window.location.href = '#/departmentIndex';
                return false;
            }
        }

        //资源监测
        if(bShowMonitor) {
            window.location.href = '#/equipmentManage/MonitorPage';
        }
        else if(bShowAlarm) {
            if(bShowAlarmRules) {
                window.location.href = '#/equipmentManage/alarmRulePage';
            }
            if(bShowTemplateset) {
                window.location.href = '#/equipmentManage/templateSetPage';
            }
            else if(bShowAlarmRulesIssue) {
                window.location.href = '#/equipmentManage/alarmRulesIssuePage';
            }
            else if(bShowAlarmEvent) {
                window.location.href = '#/equipmentManage/alarmEventPage';
            }
            else if(bShowAlarmUpgrade) {
                window.location.href = '#/equipmentManage/reportError';
            }
            else if(bShowAlarmlog) {
                window.location.href = '#/equipmentManage/alarmLogPage';
            }
        }
        else if(bShowEquipmentmanageGrafana) {
            window.location.href = '#/equipmentManage/DashboardCenter';
        }
        else if(bShowEquipmentmanageSetting) {
            if(bShowAlarmConfig) {
                window.location.href = '#/equipmentManage/alarmConfigPage';
            }
            else if(bShowMonitorset) {
                window.location.href = '#/equipmentManage/monitorSetPage';
            }
            else if(bShowResourceset) {
                window.location.href = '#/equipmentManage/resourceSetPage';
            }
        }
        else if(bShowEquipmentmanageView) {
            if(bShowTopologyView) {
                window.location.href = '#/equipmentManage/topologyPage';
            }
        }
        //资产管理
        else if(bShowAsset) {
            if(bShowAssetStatistic) {
                window.location.href = '#/assetManage/statistic';
            }
            else if(bShowAssetList) {
                window.location.href = '#/assetManage/assetList';
            }
            else if(bShowAssetMonitorsync) {
                window.location.href = '#/assetManage/monitorSync';
            }
            else if(bShowAssetMaintain) {
                window.location.href = '#/assetManage/assetMaintain';
            }
        }
        else if(bShowMaintain) {
            if(bShowMaintainList) {
                window.location.href = '#/assetManage/maintain';
            }
        }
        //网络拓扑
        else if(bShowNetworktopology) {
            if(bShowTopologynav) {
                window.location.href = '#/networkTopology/topologyNav';
            }
        }
        //运维管理
        else if(bShowWorkordermanage) {
            if(bShowWorkspace) {
                window.location.href = '#/operationManage/myWorkSpace';
            }
            else if(bShowCreateworkorder) {
                window.location.href = '#/operationManage/createOperation';
            }
        }
        else if(bShowSla) {
            if(bShowSlaList) {
                window.location.href = '#/baseManage/slaList';
            }
        }
        else if(bShowNoticemanage) {
            if(bShowNoticehistorylist) {
                window.location.href = '#/baseManage/noticeHistoryList';
            }
            else if(bShowNoticesubmitlist) {
                window.location.href = '#/baseManage/noticeSubmitList';
            }
            else if(bShowNoticeapproval) {
                window.location.href = '#/baseManage/noticeApproval';
            }
            else if(bShowNoticelist) {
                window.location.href = '#/baseManage/noticeList';
            }
        }
        else if(bShowRepository) {
            if(bShowRepositorylist) {
                window.location.href = '#/baseManage/repositoryList';
            }
            else if(bShowRepositoryapproval) {
                window.location.href = '#/baseManage/repositoryApproval';
            }
        }
        else if(bShowFlowdesign) {
            window.location.href = '#/operationManage/flowDesign';
        }
        else if(bShowDutyManagement) {
            if(bShowCalendar) {
                window.location.href = '#/operationManage/dutymanagement/calendar';
            }
            else if(bShowRotaset) {
                window.location.href = '#/operationManage/dutymanagement/rotaset';
            }
        }
        //报表管理
        else if(bShowVideoReport) {
            // if(bShowCameravideocheck) {
                window.location.href = '#/reportManage/videoReport/cameraVideoCheck';
            // }
            // else if(bShowCameraofflinereport) {
            //     window.location.href = '#/reportManage/videoReport/cameraOfflineReport';
            // }
            // else if(bShowCameramedialostreport) {
            //     window.location.href = '#/reportManage/videoReport/cameraMediaLostReport';
            // }
            // else if(bShowCameravideolostreport) {
            //     window.location.href = '#/reportManage/videoReport/cameraVideoLostReport';
            // }
            // else if(bShowCameravideorealtimereport) {
            //     window.location.href = '#/reportManage/videoReport/cameraVideoRealTimeReport';
            // }
            // else if(bShowCameraonlinetrendsreport) {
            //     window.location.href = '#/reportManage/videoReport/cameraOnlineTrendsReport';
            // }
        }
        else if(bShowDepVideoReport) {
          //厅级
          window.location.href = '#/reportManage/depvideoReport/cameraVideoCheck';
        }
        else if(bShowNovideoReport) {
            // if(bShowDvrstatisticsreport) {
                window.location.href = '#/reportManage/nonVideoReport/dvrStatisticsReportPage';
            // }
            // else if(bShowNvrstatisticsreport) {
            //     window.location.href = '#/reportManage/nonVideoReport/nvrStatisticsReportPage';
            // }
            // else if(bShowEncoderstatisticsreport) {
            //     window.location.href = '#/reportManage/nonVideoReport/encoderStatisticsReportPage';
            // }
            // else if(bShowServerstatisticsreport) {
            //     window.location.href = '#/reportManage/nonVideoReport/serverStatisticsReportPage';
            // }
            // else if(bShowNetworkstatisticsreport) {
            //     window.location.href = '#/reportManage/nonVideoReport/networkStatisticsReportPage';
            // }
            // else if(bShowFirewallstatisticsreport) {
            //     window.location.href = '#/reportManage/nonVideoReport/firewallStatisticsReportPage';
            // }
            // else if(bShowDatabasestatisticsreport) {
            //     window.location.href = '#/reportManage/nonVideoReport/databaseStatisticsReportPage';
            // }
        }
        else if(bShowDepNovideoReport) {
          //厅级
          window.location.href = '#/reportManage/depNonVideoReport/depDvrStatisticsReportPage';
        }
        else if(bShowWorkorderReport){
            // if(bShowWorkorderStatisticReport) {
                window.location.href = '#/reportManage/orderStatisticsReport';
            // }
        }
        else if(bShowDepWorkorderReport){
            //厅级
            window.location.href = '#/reportManage/depOrderReport';
        }
        else if(bShowAssetReport) {
            // if(bShowAssetstatisticReport) {
                window.location.href = '#/reportManage/assetStatistic';
            // }
            // else if(bShowAssetmaintainReport) {
            //     window.location.href = '#/reportManage/assetMaintain';
            // }
        }
        else if(bShowBillingReport){
            // if(bShowAssessmentstatisticReport) {
                window.location.href = '#/reportManage/chargeStatisticsReport';
            // }
        }
        //系统设置
        else if(bShowGroupmanage) {
            window.location.href = '#/systemManage/groupManage';
        }
        else if(bShowUserlist) {
            window.location.href = '#/systemManage/userListPage';
        }
        else if(bShowRoleManage) {
            window.location.href = '#/systemManage/roleManagePage';
        }
        else if(bShowDataDict) {
            window.location.href = '#/systemManage/dataDictPage';
        }
        else if(bShowOnLineUserList) {
            window.location.href = '#/systemManage/onLineUserListPage';
        }
        else if(bsoftwarelicence) {
            window.location.href = '#/systemManage/infoPage';
        }
        else{
            showDialog("系统提示","没有权限不能进入系统。");
        }
}

//获取所有报警升级数据
export function get_reportErrorData (filter){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.getReportErrorList(filter,dispatch,data => {
      var results = data.results;
      if(results!=null && results!="" && results.length>0){
        var result = results[0].ALARMDATA;
        result = eval(result);
        //console.log(result);
        // for(var i=0;i<result.length;i++){
        //   var cdate = result[i].date;
        //   var dateText = cdate.substring(0,cdate.length-2);
        //   result[i].date = dateText;
        // };
        $("#reportErrorList").bootstrapTable('load',result);
        dispatch(setReportErrorData(result));
        dispatch(requestDataActions.setRequestSuccess());
      };
      dispatch(requestDataActions.setRequestFail());
    });
  }
}
//更新报警升级数据
export function change_uploadErrorStatu(data){
  return dispatch => {
    var dataList = data[0];
    var dataStatu = data[1];
    for(var i=0;i<dataList.length;i++){
      var id = dataList[i].id;
      var param = {RecId:id,alarmAction:dataStatu};
      oData.updateErrorUpload(param,data2 =>{
        //console.log(data2);
        dispatch(get_reportErrorData(null));
      });
    };
  }
}
//获取所有报警下拉框数据
export function get_reportErrorDataUI(){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.getReportErrorListUI(dispatch,data => {
      // console.log(data.results)
      var equipmentTypes = [];
      var organizations = [];
      var result = data.results[0];
      var etype = result.EQUIPMENTTYPE;
      etype = eval(etype);
      var org = result.ORGANIZATION;
      org = eval(org);
      // console.log(org)
      equipmentTypes.push("全部");
      organizations.push({name:"全部",id:""});
      for(var i=0;i<etype.length;i++){
        equipmentTypes.push(etype[i]);
      };
      for(var i=0;i<org.length;i++){
        organizations.push({name:org[i].organizationName,id:org[i].organizationCode});
      };
      dispatch(setReportErrorDataUI_equipmentTypes(equipmentTypes));
      dispatch(setReportErrorDataUI_organizations(organizations));
      dispatch(requestDataActions.setRequestSuccess());
    });
  }
}
//根据token 获取用户权限信息
export function get_userInfoByToken(par){
  return dispatch => {
    var _this = this;
    var host = window.location.host;//"yft.siteview.com";
    var hreftemp = window.location.href;//"http://yft.siteview.com/nds/yft/index.html#/";
    var hostwz = hreftemp.indexOf(host) + host.length;
    var newaddress = hreftemp.substring(hostwz);
    var yftwz = newaddress.indexOf("/yft/");
    var correction = "";//获取是不是需要修改服务器访问地址
    if(yftwz > 0){
      var tempstr = newaddress.substring(0,yftwz);
      if(tempstr){
        correction = tempstr;
      };
    };
    dispatch(requestDataActions.setRequest());

    var url = "http://" + par.host;
    var href = url + '/yft/index.html#/cityIndex';
    Store.set("serviceUrl",url + correction + '/bods.svc/');
    Store.set("servletServiceUrl",url + correction + '/');
    Store.set("tokenUrl",url + correction + '/rest/auth/login');
    console.log("serviceUrl:"+ url + correction + '/bods.svc/');

    getVersionindex();
    var filters = [{key:"ROLE_ID",value:par.loginrole}];
    oData.SelectUserRole(filters, function(data) {
        console.log("角色验证：");
        console.log(data);
        if(data.flag == "0"){
          //'角色验证失败, 请重新选择角色。';
          // console.log("角色验证失败, 请重新选择角色。");
          $.showPublicDialog("系统提示","角色验证失败, 请重新选择角色。");
          dispatch(requestDataActions.setRequestFail());
          return;
        };
        oData.queryGetUserInfo(par.loginid, data => {
            // console.log(data.results[0]);
            if(data.results.length == 0){
              //console.log("获取用户信息失败。");
              $.showPublicDialog("系统提示","获取用户信息失败。");
              dispatch(requestDataActions.setRequestFail());
              return;
            };
            if(!data.results[0].USER_ID){
              //console.log("获取用户信息失败。");
              $.showPublicDialog("系统提示","获取用户信息失败。");
              dispatch(requestDataActions.setRequestFail());
              return;
            };
            Store.set("USER_ID",data.results[0].USER_ID);
            Store.set("USERNAME",data.results[0].USERNAME);
            Store.set("LEVEL",data.results[0].LEVEL);//1是厅级  2是市级
            Store.set("GROUP_NAME",data.results[0].GROUP_NAME);//安全群群组名
            Store.set("GROUP_ID",data.results[0].GROUP_ID);//安全群群组ID
            Store.set("DIAGNOSIS",data.results[0].DIAGNOSIS);//诊断平台地址
            Store.set("PHONE",data.results[0].PHONE);//用户手机
            Store.set("TELEPHONE",data.results[0].TELEPHONE);//固定电话

            //获取操作权限 filters 格试 [{key:"ROLE_NAME",value:""},{key:"GROUP_NAME",value:""}];
            var filters = [{key:"ROLE_NAME",value:par.loginrole},
                           {key:"GROUP_NAME",value:Store.get("GROUP_NAME")},
                           {key:"COMPANY",value:"OMS"}];
           oData.GetCurrentPermissions(filters,data => {
               if(data.results.length == 0){
                 dispatch(requestDataActions.setRequestSuccess());
                 return;
               };
               //dispatch(getCityIndexData());
               getCityIndexData();
               var permissionsValue =  data.results[0].PERMISSIONS;
               //console.log('permissionsValue',permissionsValue);
               permissionsValue = encodeURI(permissionsValue);
               permissionsValue = base64.base64encode(permissionsValue);
               Store.set("PERMISSIONS",permissionsValue);
               //跳转页时，存在菜单权限不对正常的情况，所以需要重新初始化一下
               iniNewNavBarMenu();
               navToPage();
           });
        });
    });
  }
}

export function getAllBusObDefNames() {
  return dispatch => {
    var filter = [{"key":"method","value":"GetAllBusObDefNames"}];
    oData.getAllBusObDefNames(filter,function(data){
      var result = data.results[0].result;
      result = eval("("+result+")");
      // console.log(result,"1111111111111");
      dispatch(setBusObDefNames(result))
    });
  }
}

export function getBusObDefFields(param) {
  return dispatch => {
    var filter = [{"key":"method","value":"GetBusObDefFields"},{"key":"params","value":"busObDefName="+param+""}];
    oData.getBusObDefFields(filter,function(data){
      // console.log(data);
      var result = data.results[0].result;
      result = eval("("+result+")");
      dispatch(setBusObDefField(result))
    })
  }
}

export function saveExcelDataToSpace(data) {
  return dispatch => {
    // console.log(data,"11111111111111111111111");
    var tableName = data.tableName;
    var tableNameLastChart = tableName.substring(tableName.length-1,tableName.length);
    // console.log(tableNameLastChart);
    if(tableNameLastChart == "s"){
      tableName += "s";
      // console.log(tableName);
    };
    var tableData = data.tableData;
    for(var i=0;i<tableData.length;i++){
      var tableDataObj = tableData[i];
      oData.saveExcelDataToSpace(tableName,tableDataObj,function(re){
        console.log(re);
      });
      if(i == (tableData.length-1)){
        alert("导入完成");
        $('#exportExcelTable').bootstrapTable('destroy');
        $('#exportOdataTable').bootstrapTable('destroy');
        $('#exportInModal').modal('hide');
      };
    };
  }
}
