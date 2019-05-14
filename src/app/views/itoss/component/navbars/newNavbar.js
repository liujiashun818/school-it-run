/*
页面外框框架，导航条主题
权限判断甄别
引用一二级菜单
*/
'use strict';
// var React = require('react');
require('bootstrap');
import React from 'react'
// var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import { connect } from 'react-redux';
import { setCurOneNode,setCurTwoNode,setPreTwoNode,setCurThreeNode,setPreThreeNode } from '../../../../actions/navbar_action';
import { set_NewNavbarComponent } from '../../../../actions/index_action';

// var Store = require('../../../../server/store');
// var dateChange = require('../../../../utils/dateChange');
// var base64 = require('../../../../utils/base64');
// var ReactWidgets = require('react-widgets');
// var NavTreeOne = require('./newNavTreeOne');
// var NavTreeTwo = require('./newNavTreeTwo');
import Store from '../../../../server/store';
import dateChange from '../../../../utils/dateChange';
import base64 from '../../../../utils/base64';
import ReactWidgets from 'react-widgets';
import NavTreeOne from './newNavTreeOne';
import NavTreeTwo from './newNavTreeTwo';

var bShowIndexPages = false;
var bShowEquipmentmanage = false, bShowMonitor = false, bShowAlarm = false, bShowSetting = false, bShowTemplateset = false,bShowMonitorSet = false,bShowResourceSet = false, bShowDashboardCenter = false,
    bShowAlarmConfig = false, bShowAlarmRulesIssue = false, bShowAlarmEvent = false, bShowAlarmUpgrade = false,bShowAlarmLog = false,bShowAlarmRule = false, bShowView = false, bShowTopologyView = false;
var bShowAssetmanage = false, bShowAsset = false, bShowAssetStatistic = false, bShowAssetList = false, bShowAssetMonitorsync = false, bShowAssetMaintain = false,bShowMaintain = false, bShowMaintainList = false;
var bShowNetworktopology = false, bShowTopologynav = false;
var bShowOperationmanage = false, bShowWorkordermanage = false, bShowCreateworkorder = false, bShowWorkspace = false,bShowAutoWorkOrderRules=false, bShowSla = false, bShowSlaList = false,
    bShowNoticemanage = false, bShowNoticehistorylist = false, bShowNoticesubmitlist = false, bShowNoticeapproval = false, bShowNoticelist = false,
    bShowRepository = false, bShowRepositorylist = false, bShowRepositoryapproval = false, bShowFlowdesign = false,bShowDutyManagement = false,bShowCalendar = false,bShowRotaSet = false, bShowWorkOrderTemplate = false;
var bShowReportmanage = false, bShowVideoReport = false, bShowCameravideocheck = false, bShowCameraofflinereport = false, bShowCameramedialostreport = false, bShowCameravideolostreport = false, bShowCameravideorealtimereport = false, bShowCameraonlinetrendsreport = false,
    bShowDepVideoReport = false, bShowDepCameravideocheck = false,
    bShowNovideoReport = false, bShowDvrstatisticsreport = false, bShowNvrstatisticsreport = false, bShowEncoderstatisticsreport = false, bShowServerstatisticsreport = false, bShowNetworkstatisticsreport = false, bShowFirewallstatisticsreport = false, bShowDatabasestatisticsreport = false,
    bShowDepNovideoReport = false, bShowDepDvrstatisticsreport = false, bShowDepNvrstatisticsreport = false, bShowDepEncoderstatisticsreport = false,bShowDepServerstatisticsreport = false, bShowDepNetworkstatisticsreport = false, bShowDepFirewallstatisticsreport = false, bShowDepDatabasestatisticsreport = false,
    bShowWorkorderReport = false, bShowWorkorderStatisticReport = false,bShowAssetReport = false, bShowAssetstatisticReport = false, bShowAssetmaintainReport = false, bShowBillingReport = false,bShowAssessmentstatisticReport = false, bShowDepWorkorderReport = false,bShowDepWorkorderStatisticReport = false;
var bShowSystemmanage = false, bShowGroupmanage = false, bShowUserlist = false, bShowRoleManage = false , bShowDataDict = false, bShowLineUser = false,softwarelicence=false;

var newNavBar = React.createClass({
    getInitialState: function(){
      return {
        firstMenu: [],
        indexMenu: [],
        resourceMenu: [],
        mapMenu: [],
        assetMenu: [],
        workOrderMenu: [],
        reportMenu: [],
        systemMenu: [],
        isMenu:false
      };
    },
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    componentDidMount: function(){
        this.props.dispatch(set_NewNavbarComponent(this));//将 newNavBar 控件放到 indexReducer 中。

        // dateChange.changeViewStyle();
        var groupname = Store.get("GROUP_NAME");
        var role = localStorage.getItem("CURRENT_ROLENAME");
        var name = localStorage.getItem("localUserName");
        $("#navbar2logininfor").text(groupname+" | "+role +" | "+name);

        bShowIndexPages = false;
        bShowEquipmentmanage = false, bShowMonitor = false, bShowAlarm = false, bShowSetting = false, bShowTemplateset = false,bShowMonitorSet = false,bShowResourceSet = false, bShowDashboardCenter = false;
        bShowAlarmConfig = false, bShowAlarmRulesIssue = false, bShowAlarmEvent = false, bShowAlarmUpgrade = false;
        bShowView = false,bShowTopologyView = false;
        bShowAlarmLog = false,bShowAlarmRule = false;
        bShowAssetmanage = false, bShowAsset = false, bShowAssetStatistic = false, bShowAssetList = false, bShowAssetMonitorsync = false, bShowAssetMaintain = false, bShowMaintain = false, bShowMaintainList = false;
        bShowNetworktopology = false, bShowTopologynav = false;
        bShowOperationmanage = false, bShowWorkordermanage = false, bShowCreateworkorder = false, bShowWorkspace = false,bShowAutoWorkOrderRules=false,bShowSla = false, bShowSlaList = false;
        bShowNoticemanage = false, bShowNoticehistorylist = false, bShowNoticesubmitlist = false, bShowNoticeapproval = false, bShowNoticelist = false;
        bShowRepository = false, bShowRepositorylist = false, bShowRepositoryapproval = false, bShowFlowdesign = false, bShowDutyManagement = false,bShowCalendar = false,bShowRotaSet = false, bShowWorkOrderTemplate = false;
        bShowReportmanage = false, bShowVideoReport = false, bShowCameravideocheck = false, bShowCameraofflinereport = false, bShowCameramedialostreport = false, bShowCameravideolostreport = false, bShowCameravideorealtimereport = false, bShowCameraonlinetrendsreport = false;
        bShowNovideoReport = false, bShowDvrstatisticsreport = false, bShowNvrstatisticsreport = false, bShowEncoderstatisticsreport = false, bShowServerstatisticsreport = false, bShowNetworkstatisticsreport = false, bShowFirewallstatisticsreport = false, bShowDatabasestatisticsreport = false;
        bShowWorkorderReport = false,bShowWorkorderStatisticReport = false, bShowAssetReport = false, bShowAssetstatisticReport = false, bShowAssetmaintainReport = false, bShowBillingReport = false,bShowAssessmentstatisticReport = false;
        bShowSystemmanage = false, bShowGroupmanage = false, bShowUserlist = false, bShowRoleManage = false,bShowDataDict = false, bShowLineUser = false,softwarelicence=false,
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
            else if(permissionsValue[i].resourceType == "/operationmanage/workOrderTemplate") {
                bShowWorkOrderTemplate = true;
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
        var moduleTab = this.props.moduleTab;
        var firstModu = "";
        var secondModu = "";
        if(moduleTab!=null && moduleTab!=""){
          var moduleTabs = moduleTab.split("-");
          firstModu = moduleTabs[0];
          secondModu = moduleTabs[1];
        };
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
        //   if(bShowWorkOrderTemplate) {
          if(true) {
              workOrderMenu.push({id:7,name:"工单模板",pid:0,toUrl:"operationmanage/workOrderTemplateList",markId:8});
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
          systemMenu:systemMenu,
          firstModu:firstModu,
          secondModu:secondModu
        });
    },
    Logout:function(){
      var token = Store.get("token");
      var serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          Store.set("token","");
          //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
          var rquestUri = serviceAddress+"Logout?token="+token;
          //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
          rquestUri = encodeURI(rquestUri);
          $.ajax({
              type: "get",
              async: false,
              url:rquestUri,
              dataType: "json",
              success : function(result){

              },error : function(result){
                  //console.log(result.responseText);
              }
          });
      }
      window.location.href="#";
    },
    isMenu:function(){

      if(this.state.isMenu){
        $("#dLabel").parent().removeClass('openInfinova');
        this.setState({isMenu:false});
      }else{
        $("#dLabel").parent().addClass('openInfinova');
        this.setState({isMenu:true});
      }
    },
    render:function(){
       var version = localStorage.getItem("Version");
       var firstMenu = this.state.firstMenu;
       var indexMenu = this.state.indexMenu;
       var resourceMenu = this.state.resourceMenu;
       var mapMenu = this.state.mapMenu;
       var assetMenu = this.state.assetMenu;
       var workOrderMenu = this.state.workOrderMenu;
       var reportMenu = this.state.reportMenu;
       var systemMenu = this.state.systemMenu;
       var firstModu = this.state.firstModu;
       var secondModu = this.state.secondModu;
       const { dispatch } = this.props;
       const { curOneNode } = this.props;
       const { curTwoNode } = this.props;
       const { preTwoNode } = this.props;
       const { curThreeNode } = this.props;
       const { requestStatus } = this.props;
       var progressBarDisplay = requestStatus.isRequesting?"block":"none";
       if(firstMenu!=null && firstMenu!="" && firstMenu.length>0){
         return (
             <div>
                 <nav className="navbar navbar-default">
                     <div className="container-fluid">
                         <div className="">
                             <a href="javascript:void(0)" className="navbar-brand" style={{width:"auto"}}>
                                 <img src="img/itoss/logo.png" className="brand-icon" style={{width:"370px", height:"35px", marginTop:"7.5px", cursor:"default"}}/>
                             </a>
                         </div>
                         <div className="collapse navbar-collapse">
                           <nav>
                             <ul className="nav navbar-nav navbar-right">
                               <li>
                                 <a id="dLabel" href="javascript:void(0);" onClick={this.isMenu} style={{marginBottom:"0"}}>消息</a>
                                 <ul className="infinova-dropdown-menu">
                                   <li>123</li>
                                   <li>123</li><li>123</li>
                                   <li>123</li><li>123</li>
                                   <li>123</li><li>123</li>
                                   <li>123</li>
                                 </ul>
                               </li>
                                 <li><a id="navbar2logininfor"></a></li>
                                 <li><a href="javascript:void(0);" onClick={this.Logout}>注销</a></li>
                             </ul>
                           </nav>
                         </div>
                         <div className="collapse navbar-collapse">
                             <div className="navbar-tab-div">
                                 <form className="navbar-left">
                                     <div className="tab-base">
                                        <NavTreeOne data={firstMenu} firstModu={firstModu} curThreeNode={curThreeNode} onSetCurOneNode={curNode => dispatch(setCurOneNode(curNode))} curOneNode={curOneNode} onSetCurThreeNode={data => dispatch(setCurThreeNode(data))} onSetPreThreeNode={data => dispatch(setPreThreeNode(data))}/>
                                        <div id="navbar-tab-content" className="tab-content">
                                          <div id="lft-tab-0" className="lftMenuDiv">
                                            <NavTreeTwo data={indexMenu} treeId={"indexMenu"} firstModu={firstModu} secondModu={secondModu} curOneNode={curOneNode} curTwoNode={curTwoNode} preTwoNode={preTwoNode} curThreeNode={curThreeNode} onSetCurTwoNode={param => dispatch(setCurTwoNode(param))} onSetPreTwoNode={param => dispatch(setPreTwoNode(param))} onSetCurThreeNode={data => dispatch(setCurThreeNode(data))} onSetPreThreeNode={data => dispatch(setPreThreeNode(data))}/>
                                          </div>
                                          <div id="lft-tab-1" className="lftMenuDiv">
                                            <NavTreeTwo data={resourceMenu} treeId={"resourceMenu"} firstModu={firstModu} secondModu={secondModu} curOneNode={curOneNode} curTwoNode={curTwoNode} preTwoNode={preTwoNode} curThreeNode={curThreeNode} onSetCurTwoNode={param => dispatch(setCurTwoNode(param))} onSetPreTwoNode={param => dispatch(setPreTwoNode(param))} onSetCurThreeNode={data => dispatch(setCurThreeNode(data))} onSetPreThreeNode={data => dispatch(setPreThreeNode(data))}/>
                                          </div>
                                          <div id="lft-tab-2" className="lftMenuDiv">
                                            <NavTreeTwo data={mapMenu} treeId={"mapMenu"} firstModu={firstModu} secondModu={secondModu} curOneNode={curOneNode} curTwoNode={curTwoNode} preTwoNode={preTwoNode} curThreeNode={curThreeNode} onSetCurTwoNode={param => dispatch(setCurTwoNode(param))} onSetPreTwoNode={param => dispatch(setPreTwoNode(param))} onSetCurThreeNode={data => dispatch(setCurThreeNode(data))} onSetPreThreeNode={data => dispatch(setPreThreeNode(data))}/>
                                          </div>
                                          <div id="lft-tab-3" className="lftMenuDiv">
                                            <NavTreeTwo data={assetMenu} treeId={"assetMenu"} firstModu={firstModu} secondModu={secondModu} curOneNode={curOneNode} curTwoNode={curTwoNode} preTwoNode={preTwoNode} curThreeNode={curThreeNode} onSetCurTwoNode={param => dispatch(setCurTwoNode(param))} onSetPreTwoNode={param => dispatch(setPreTwoNode(param))} onSetCurThreeNode={data => dispatch(setCurThreeNode(data))} onSetPreThreeNode={data => dispatch(setPreThreeNode(data))}/>
                                          </div>
                                          <div id="lft-tab-4" className="lftMenuDiv">
                                            <NavTreeTwo data={workOrderMenu} treeId={"workOrderMenu"} firstModu={firstModu} secondModu={secondModu} curOneNode={curOneNode} curTwoNode={curTwoNode} preTwoNode={preTwoNode} curThreeNode={curThreeNode} onSetCurTwoNode={param => dispatch(setCurTwoNode(param))} onSetPreTwoNode={param => dispatch(setPreTwoNode(param))} onSetCurThreeNode={data => dispatch(setCurThreeNode(data))} onSetPreThreeNode={data => dispatch(setPreThreeNode(data))}/>
                                          </div>
                                          <div id="lft-tab-5" className="lftMenuDiv">
                                            <NavTreeTwo data={reportMenu} treeId={"reportMenu"} firstModu={firstModu} secondModu={secondModu} curOneNode={curOneNode} curTwoNode={curTwoNode} preTwoNode={preTwoNode} curThreeNode={curThreeNode} onSetCurTwoNode={param => dispatch(setCurTwoNode(param))} onSetPreTwoNode={param => dispatch(setPreTwoNode(param))} onSetCurThreeNode={data => dispatch(setCurThreeNode(data))} onSetPreThreeNode={data => dispatch(setPreThreeNode(data))}/>
                                          </div>
                                          <div id="lft-tab-6" className="lftMenuDiv">
                                            <NavTreeTwo data={systemMenu} treeId={"systemMenu"} firstModu={firstModu} secondModu={secondModu} curOneNode={curOneNode} curTwoNode={curTwoNode} preTwoNode={preTwoNode} curThreeNode={curThreeNode} onSetCurTwoNode={param => dispatch(setCurTwoNode(param))} onSetPreTwoNode={param => dispatch(setPreTwoNode(param))} onSetCurThreeNode={data => dispatch(setCurThreeNode(data))} onSetPreThreeNode={data => dispatch(setPreThreeNode(data))}/>
                                          </div>
                                        </div>
                                     </div>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </nav>
                 <nav className="navbar navbar-default navbar-bottom">
                     <div className="container">
                         Shenzhen <b style={{color: '#008b1a'}}>INFINOVA</b> Technology Co.LTd   {version}
                         <div className="progress-bar progress-bar-striped active" style={{float:"right",width:"150px",height:"14px",marginTop:"8px",display:progressBarDisplay}}/>
                     </div>
                 </nav>
             </div>
         );
       }else{
         return (
             <div>
                 <nav className="navbar navbar-default">
                     <div className="container-fluid">
                         <div className="">
                             <a href="javascript:void(0)" className="navbar-brand" style={{width:"auto"}}>
                                 <img src="img/itoss/logo.png" className="brand-icon" style={{width:"370px", height:"35px", marginTop:"7.5px", cursor:"default"}}/>
                             </a>
                         </div>
                         <div className="collapse navbar-collapse">
                           <nav>
                             <ul className="nav navbar-nav navbar-right">
                               <li>
                                 <a id="dLabel" href="javascript:void(0);" onClick={this.isMenu} style={{marginBottom:"0"}}>消息</a>
                                 <ul className="infinova-dropdown-menu">
                                   <li>123</li>
                                   <li>123</li><li>123</li>
                                   <li>123</li><li>123</li>
                                   <li>123</li><li>123</li>
                                   <li>123</li>
                                 </ul>
                               </li>
                                 <li><a id="navbar2logininfor"></a></li>
                                 <li><a href="javascript:void(0);" onClick={this.Logout}>注销</a></li>
                             </ul>
                           </nav>
                         </div>
                         <div className="collapse navbar-collapse">
                             <div className="navbar-tab-div">
                                 <form className="navbar-left">
                                     <div className="tab-base">
                                        <div id="navbar-tab-content" className="tab-content">
                                          <div id="lft-tab-0" className="lftMenuDiv">
                                          </div>
                                          <div id="lft-tab-1" className="lftMenuDiv">
                                          </div>
                                          <div id="lft-tab-2" className="lftMenuDiv">
                                          </div>
                                          <div id="lft-tab-3" className="lftMenuDiv">
                                          </div>
                                          <div id="lft-tab-4" className="lftMenuDiv">
                                          </div>
                                          <div id="lft-tab-5" className="lftMenuDiv">
                                          </div>
                                          <div id="lft-tab-6" className="lftMenuDiv">
                                          </div>
                                        </div>
                                     </div>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </nav>
                 <nav className="navbar navbar-default navbar-bottom">
                     <div className="container">
                         Shenzhen <b style={{color: '#008b1a'}}>INFINOVA</b> Technology Co.LTd   {version}
                         <div className="progress-bar progress-bar-striped active" style={{float:"right",width:"150px",height:"14px",marginTop:"8px",display:progressBarDisplay}}/>
                     </div>
                 </nav>
             </div>
           );
       };
    }
});

function mapNewNavBarState(state) {
  const { curOneNode } = state.navbarReducer
  const { curTwoNode } = state.navbarReducer
  const { preTwoNode } = state.navbarReducer
  const { curThreeNode } = state.navbarReducer
  const { requestStatus } = state.requestDataReducer
  return {
    curOneNode:curOneNode,
    curTwoNode:curTwoNode,
    preTwoNode:preTwoNode,
    curThreeNode:curThreeNode,
    requestStatus
  }
}

export default connect(mapNewNavBarState)(newNavBar)
