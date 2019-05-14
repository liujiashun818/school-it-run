/**
 * 登录页相关action
 */
// import fetch from 'isomorphic-fetch'
var oData = require('../server/odata');
var Store = require('../server/store');
var base64 = require('../utils/base64.js');

export const SET_ERROR_MSG = 'SET_ERROR_MSG'
// export const GET_TOKEN = 'GET_TOKEN'
// export const GET_SELECTEDROLEPERMISSION = 'GET_SELECTEDROLEPERMISSION'
export const SET_LOGIN_TYPE = 'SET_LOGIN_TYPE'

export function setErrorMsg(msg) {
    return {
        type: SET_ERROR_MSG,
        msg
    }
}

export function setLoginType(loginType) {
    return {
        type: SET_LOGIN_TYPE,
        loginType
    }
}

function getVersion() {
    oData.getVersion(function(data) {
        Store.set("Version",data);
    });
}

// function receiveGetCurrentPermissions(data) {
//     return dispatch => {
//         if(data.results.length == 0){
//             // _this.emit("change");
//             // _this.errorMsg = '获取用户权限出错, 请重新登录。';
//             // return;
//             return dispatch(setErrorMsg('获取用户权限出错, 请重新登录。'))
//         };
//         var permissionsValue =  data.results[0].PERMISSIONS;
//         permissionsValue = encodeURI(permissionsValue);
//         permissionsValue = base64.base64encode(permissionsValue);
//         Store.set("PERMISSIONS",permissionsValue);
//         dispatch(navToPage());
//         // _this.errorMsg = '';
//         // _this.emit("change");
//         return dispatch(setErrorMsg(''))
//     }
// }

function receiveGetCurrentPermissions(data) {
    return (dispatch, getState) => {
        if(data.results.length == 0){
            return dispatch(setErrorMsg('获取用户权限出错, 请重新登录。'))
        };
        var state = getState();
        var permissionsValue =  data.results[0].PERMISSIONS;
        permissionsValue = encodeURI(permissionsValue);
        permissionsValue = base64.base64encode(permissionsValue);
        Store.set("PERMISSIONS",permissionsValue);
        $('#loginModel').modal('hide');
        if(state.loginReducer.loginType == 'react'){
          dispatch(navToPage());
        }else{
          var itossUrl = Store.get("itossUrl");
          var token = Store.get("token");
          window.location.href = itossUrl+'?token='+token;
        };
        return dispatch(setErrorMsg(''))
    }
}

function navToPage(){
    return dispatch => {
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
        var bShowSystemmanage = false, bShowGroupmanage = false, bShowUserlist = false, bShowRoleManage = false, bShowDataDict = false, bShowOnLineUserList = false, bsoftwarelicence=false;

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
            // this.errorMsg = '没有权限不能进入系统。';
            // this.emit("change");
            return dispatch(setErrorMsg('没有权限不能进入系统。'))
        }

    }
}

function receiveGetToken(data) {
    return dispatch => {
        if(data.result == "error"){
            // _this.errorMsg = data.errorMsg;
            // _this.emit("change");
            // return;
            return dispatch(setErrorMsg(data.errorMsg));
        }
        getVersion();
        if(localStorage.getItem("multi_roles") == "1") {
            // _this.emit("change");
            $('#selectRoleModal').modal('show');
        }
        else {
            if(data.results == undefined) {
                return dispatch(setErrorMsg("无法获取token，登录失败。"));
            };
            if(!data.results[0].USER_ID){
              return dispatch(setErrorMsg("无法获取用户信息，登录失败。"));
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
            var filters = [
                {key:"ROLE_NAME",value:Store.get("CURRENT_ROLENAME")},
                {key:"GROUP_NAME",value:Store.get("GROUP_NAME")},
                {key:"COMPANY",value:"OMS"}
            ];
            oData.GetCurrentPermissions(filters, data => dispatch(receiveGetCurrentPermissions(data)));
            // dispatch(navToPage());
        }
    }
}

function oDataGetToken(user) {
    return dispatch => {
  		Store.set('roles',"")
  		oData.getToken(user, data => dispatch(receiveGetToken(data)));
    }
}

export function getToken(user) {
  return dispatch => {
      return dispatch(oDataGetToken(user))
  }
}

function receiveQueryGetUserInfo(data) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            // _this.errorMsg = '请求用户信息出错, 请重新登录。';
            // return;
            return dispatch(setErrorMsg('请求用户信息出错, 请重新登录。'))
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
        var filters = [
            {key:"ROLE_NAME",value:Store.get("CURRENT_ROLENAME")},
            {key:"GROUP_NAME",value:Store.get("GROUP_NAME")},
            {key:"COMPANY",value:"OMS"}
        ];
        oData.GetCurrentPermissions(filters, data => dispatch(receiveGetCurrentPermissions(data)));
        $('#selectRoleModal').modal('hide');
        // dispatch(navToPage());
    }
}

function receiveSelectUserRole(data) {
    return dispatch => {
        if(data.flag == "0"){
            // _this.errorMsg = '角色验证失败, 请重新选择角色。';
            // _this.emit("change");
            // return;
            return dispatch(setErrorMsg('角色验证失败, 请重新选择角色。'))
        };
        oData.queryGetUserInfo(Store.get("localUserName"), data => dispatch(receiveQueryGetUserInfo(data)));
    }
}

function oDataGetSelectUserRole(filters) {
    return dispatch => {
  		Store.set('roles',"")
  		oData.SelectUserRole(filters, data => dispatch(receiveSelectUserRole(data)));
    }
}

export function getSelectedRolePermission() {
  return dispatch => {
      var filters = [{key:"ROLE_ID",value:Store.get("CURRENT_ROLENAME")}];
      return dispatch(oDataGetSelectUserRole(filters))
  }
}
