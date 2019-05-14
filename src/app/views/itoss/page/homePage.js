/**
 * Created by SHIN on 2015/12/8.
 */
// var React = require('react');
import React from 'react';
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Store = require('../../../server/store.js');
var ReactWidgets = require('react-widgets');
// var Sidebar = require('react-sidebar');
// var ModulesPage = require('./modulesPage');
import NewNavbar from '../component/navbars/NewNavbar';
//
// var EquipmentGroupInfoView = require('../component/equipmentManage/groupInfoView');
// var EquipmentListView = require('../component/equipmentManage/listView');
import CreateResourceViews from '../component/equipmentManage/createResourceViews/createResourceView';
import CreateMonitorViews from '../component/equipmentManage/createMonitorViews/createMonitorView';
import MonitorView from '../component/equipmentManage/monitor/monitorView';
import AlarmConfigView from '../component/equipmentManage/alarm/alarmConfigView';//阀值设置
import AlarmRulesIssueView from '../component/equipmentManage/alarm/alarmRulesIssueView';//厅级升级配置
import AlarmEventView from '../component/equipmentManage/alarm/alarmEventView';//告警事件列表

import MonitorSetView from '../component/equipmentManage/setting/monitorSetView';//其他监测器设置
import ResourceSetView from '../component/equipmentManage/setting/resourceSetView';//资源设置

import MyOperationWorkSpace from '../component/operationManage/myWorkSpace/myWorkSpaceView';//工单管理-工作台

import CreateOperationView  from '../component/operationManage/createOperation/createOperationView';//新建工单页
// import CreateOperationView  from '../component/operationManage/workOrderModel/createOperationView';//新建工单页  用来处理模板的
import EditOperationView from '../component/operationManage/editOperation/editOperationView';//编辑工单
// import EditOperationView from '../component/operationManage/workOrderModel/editOperationView';//编辑工单 用来处理模板的
// //var FlowDesignView = require('../component/operationManage/flowDesign/flowDesignView');
import FlowDesignView from '../component/operationManage/flowDesignManage/flowListView';//流程设计
import FlowDesignEditView from '../component/operationManage/flowDesignManage/flowDesignEditView';//流程编辑

import DutyListView from '../component/operationManage/dutyManagement/dutyListView';//值班管理-值班日历
import DutyListView2 from '../component/operationManage/dutyManagement/dutyListView2';//值班管理-值班表设置
import AutoWorkOrderRulesView from '../component/operationManage/autoWorkOrderRules/autoWorkOrderRulesView';//自动工单规则
import WorkOrderTemplateListView from '../component/operationManage/workOrderTemplate/workOrderTemplateListView';//工单模板列表
import CreateWorkOrderTemplateView from '../component/operationManage/workOrderTemplate/createWorkOrderTemplateView';//创建工单模板
//
// //服务级别协议/发布管理/知识库
import SlaList from '../component/baseManage/sla/slaList';
import SlaAdd from '../component/baseManage/sla/slaAdd';
import SlaDetails from '../component/baseManage/sla/slaDetails';
import NoticeList from '../component/baseManage/noticeManage/noticeList';
import NoticeInfo from '../component/baseManage/noticeManage/noticeInfo';
import NoticeApproval from '../component/baseManage/noticeManage/noticeApproval';
import NoticeHistoryList from '../component/baseManage/noticeManage/noticeHistoryList';
import NoticeSubmitList from '../component/baseManage/noticeManage/noticeSubmitList';
import NoticeSubmitDetails from '../component/baseManage/noticeManage/noticeSubmitDetails';
import NoticeListDetails from '../component/baseManage/noticeManage/noticeListDetails';
import NoticeHistoryListDetails from '../component/baseManage/noticeManage/noticeHistoryListDetails';
import NoticeApprovalDetails from '../component/baseManage/noticeManage/noticeApprovalDetails';
import RepositoryList from '../component/baseManage/repository/repositoryList';
import RepositoryDetails from '../component/baseManage/repository/repositoryDetails';
import RepositoryListDetails from '../component/baseManage/repository/repositoryListDetails';
import RepositoryApproval from '../component/baseManage/repository/repositoryApproval';
import RepositoryAdd  from '../component/baseManage/repository/repositoryAdd';
//
// //reset by Yuchen
import AssetStatistic from '../component/assetManage/statistic';//资产统计
import AssetManageListPage from '../component/assetManage/assetListPage';//资产列表
import AssetCreateView from '../component/assetManage/createView';//新建资产
import AssetMaintainView from '../component/assetManage/maintain';//维修清单列表
import AssetCreateMaintainView from '../component/assetManage/maintainCreate';
import AssetMonitorView from '../component/assetManage/monitor'; //资产监控同步
import AssetDetailView from '../component/assetManage/detail';//资产详情
import AssetAssetMaintainView from '../component/assetManage/assetMaintain';//资产维保
import AssetMaintainDetailView from '../component/assetManage/maintainDetail';//维修单详情

import AlarmLogView from '../component/equipmentManage/alarm/alarmLog';
import AlarmRuleView from '../component/equipmentManage/alarm/alarmRule';
import AddAlarmRuleView from '../component/equipmentManage/alarm/addAlarmRule';
import EditAlarmRuleView from '../component/equipmentManage/alarm/editAlarmRule';
import TemplateSetView from '../component/equipmentManage/setting/templateSetView';

// 网络拓扑-拓扑导航
import TopologyNavView from '../component/networkTopology/topologynavview';

// //报表管理
// //--视频类设备报表
import CameraVideoCheckReport from '../component/reportManage/videoReport/cameraVideoCheckReport';   //摄像机视频考核
import CameraOfflineStatisticsReport from '../component/reportManage/videoReport/cameraOfflineStatisticsReport';   //摄像机离线状态详细统计报表
import CameraMediaLostStatisticsReport from '../component/reportManage/videoReport/cameraMediaLostStatisticsReport';   //摄像机录像丢失详细统计报表
import CameraVideoLostStatisticsReport from '../component/reportManage/videoReport/cameraVideoLostStatisticsReport';   //摄像机视频丢失详细统计报表
import CameraVideoQualityStatisticsReport from '../component/reportManage/videoReport/cameraVideoQualityStatisticsReport';   //摄像机视频质量实时统计
import CameraOnlineTrendsReport from '../component/reportManage/videoReport/cameraOnlineTrendsReport';   //摄像机在线趋势图

//--厅级视频类设备报表
import DepCameraVideoCheckReport from '../component/reportManage/depVideoReport/cameraVideoCheckReport';   //摄像机视频考核

//--非视频类设备报表
import DVRStatisticsReport from '../component/reportManage/nonVideoReport/dvrStatisticsReport';              //DVR统计报表
import NVRStatisticsReport from '../component/reportManage/nonVideoReport/nvrStatisticsReport';              //NVR统计报表
import EncoderStatisticsReport from '../component/reportManage/nonVideoReport/encoderStatisticsReport';      //编码器统计报表
import ServerStatisticsReport from '../component/reportManage/nonVideoReport/serverStatisticsReport';        //服务器统计报表
import NetworkStatisticsReport from '../component/reportManage/nonVideoReport/networkStatisticsReport';      //网络设备统计报表
import FirewallStatisticsReport from '../component/reportManage/nonVideoReport/firewallStatisticsReport';    //防火墙统计报表
import DatabaseStatisticsReport from '../component/reportManage/nonVideoReport/databaseStatisticsReport';    //数据库统计报表
//--厅级非视频类设备报表
import DepDVRStatisticsReport from '../component/reportManage/depNonVideoReport/dvrStatisticsReport';              //DVR统计报表
import DepNVRStatisticsReport from '../component/reportManage/depNonVideoReport/nvrStatisticsReport';              //NVR统计报表
import DepEncoderStatisticsReport from '../component/reportManage/depNonVideoReport/encoderStatisticsReport';      //编码器统计报表
import DepServerStatisticsReport from '../component/reportManage/depNonVideoReport/serverStatisticsReport';        //服务器统计报表
import DepNetworkStatisticsReport from '../component/reportManage/depNonVideoReport/networkStatisticsReport';      //网络设备统计报表
import DepFirewallStatisticsReport from '../component/reportManage/depNonVideoReport/firewallStatisticsReport';    //防火墙统计报表
import DepDatabaseStatisticsReport from '../component/reportManage/depNonVideoReport/databaseStatisticsReport';    //数据库统计报表

import OrderReportView from '../component/reportManage/orderReport/orderReport';//工单报表
import DepOrderReportView from '../component/reportManage/depOrderReport/orderReport';
import ChargeReportView from '../component/reportManage/chargeReport/chargeReport';//计费报表

// var ListGroupView = require('../component/systemManage/listGroup/listGroupView');
import CreateGroupView from '../component/systemManage/createGroup/createGroupView';
// var EditGroupView = require('../component/systemManage/editGroup/editGroupView');
import UserListView from '../component/systemManage/userManage/userListView';
import UserAddView from '../component/systemManage/userManage/userAddView';
import OnLineUserListView from '../component/systemManage/userManage/onLineUserListView';
import RoleManageView from '../component/systemManage/roleManage/roleManageView';
import DataDictionary from '../component/systemManage/dataDict/dataDictView';//数据字典
import SystemInfoPage from '../component/systemManage/InfoPage';//软件许可
//
// //资产统计报表
import AssetStatisticReportView from '../component/reportManage/assetReport/assetStatistic';
import AssetMaintainReportView from '../component/reportManage/assetReport/assetMaintain';
//
import DashboardCenterView from '../component/equipmentManage/dashboardCenter/dashboardView';//资源监测-仪表板中心
import TopologyView from '../component/equipmentManage/view/topologyView';//visio视图
// var TopologyDetailsView = require('../component/equipmentManage/view/topologyDetailsView');
import IndexPage1 from '../component/indexPages/city/index'; //市级首页
import IndexPage2 from '../component/indexPages/department/index';//厅级首页
import ReportError from '../component/equipmentManage/alarm/reportErrorView';//告警升级列表
//
var ErrMessageModal = require('./errMessageModal.js');//错误消息提示窗口
var TokenInfoModal = require('./tokenInfoModal.js');// 认证过期或服务器连接失败提示窗口。
var PublicMessageModal = require('./publicMessageModal.js');//公共消息提示窗口
var ExportInModal = require('./exportInModal.js');//导入数据页面

var HomePage = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("SampleStore").getState(),
    //     }
    // },
    getForm: function(pageId) {
        switch (pageId) {
            // case 0: //资产管理仪表盘
            //     return <DashBoardView />;
            //     break;
            // case 1: //硬件资产概述
            //     return <HardwareOverview />;
            //     break;
            // case 2: //新增硬件资产
            //     return <HardwareCreateView />;
            //     break;
            // case 3: //硬件资产详情
            //     return <HardwareDetailsView />;
            //     break;
            // case 4: //借用硬件资产
            //     return <HardwareBorrowView />;
            //     break;
            // case 5: //调拨硬件资产
            //     return <HardwareAllocateView />;
            //     break;
            // case 6: //维修硬件资产
            //     return <HardwareMaintainView />;
            //     break;
            // case 7: //报废硬件资产
            //     return <HardwareScrapView />;
            //     break;
            // case 9: //软件资产概述
            //     return <LicensesOverview />;
            //     break;
            // case 10://新增软件资产
            //     return <LicensesCreateView />;
            //     break;
            // case 12: //借用软件资产
            //     return <LicensesBorrowView />;
            //     break;
            // case 13: //调拨软件资产
            //     return <LicensesAllocateView />;
            //     break;
            // case 14: //维修软件资产
            //     return <LicensesMaintainView />;
            //     break;
            // case 15: //报废软件资产
            //     return <LicensesScrapView />;
            //     break;
            // case 17: //耗材资产概述
            //     return <ConsumablesOverview />;
            //     break;
            // case 18://新增耗材资产
            //     return <ConsumablesCreateView />;
            //     break;
            // case 20: //借用耗材资产
            //     return <ConsumablesBorrowView />;
            //     break;
            // case 21: //调拨耗材资产
            //     return <ConsumablesAllocateView />;
            //     break;
            // case 22: //维修耗材资产
            //     return <ConsumablesMaintainView />;
            //     break;
            // case 23: //报废耗材资产
            //     return <ConsumablesScrapView />;
            //     break;
            // case 24: //配件资产概述
            //     return <AccessoriesOverview />;
            //     break;
            // case 25://新增配件资产
            //     return <AccessoriesCreateView />;
            //     break;
            // case 26: //借用配件资产
            //     return <AccessoriesBorrowView />;
            //     break;
            // case 27: //调拨配件资产
            //     return <AccessoriesAllocateView />;
            //     break;
            // case 28: //维修配件资产
            //     return <AccessoriesMaintainView />;
            //     break;
            // case 29: //报废配件资产
            //     return <AccessoriesScrapView />;
            //     break;
            // case 40: //资产管理硬件统计报表
            //     return <HardwareStatisticalFormView />;
            //     break;
            // case 41: //资产管理软件统计报表
            //     return <LicenseStatisticalFormView />;
            //     break;
            // case 42: //资产管理耗材统计报表
            //     return <ConsumableStatisticalFormView />;
            //     break;
            // case 43: //资产管理配件统计报表
            //     return <AccessoryStatisticalFormView />;
            //     break;
            // case 49: //资源监测组信息
            //     return <EquipmentGroupInfoView />;
            //     break;
            // case 50:
            //     return <EquipmentListView />;
            //     break;
            case 51: //添加资源页
                return <CreateResourceViews />;
                break;
            case 52: //添加监测器页
                return <CreateMonitorViews />;
                break;
            case 53: //监测器统计页
                return <MonitorView />;
                break;
            case 54: //告警配置页
                return <AlarmConfigView />;
                break;
            case 55: //告警规则下发页
                return <AlarmRulesIssueView />;
                break;
            case 56: //告警事件查询页
                return <AlarmEventView />;
                break;
            case 57: //告警日志
                return <AlarmLogView />;
                break;
            case 58: //告警规则
                return <AlarmRuleView />;
                break;
            case 70: //新增告警规则页
                return <AddAlarmRuleView />;
                break;
            case 71: //编辑告警规则页
                return <EditAlarmRuleView />;
                break;
            case 60: //模板设置
                return <TemplateSetView />;
                break;
            case 61: //监测器设置
                return <MonitorSetView />;
                break;
            case 62: //资源设置
                return <ResourceSetView />;
                break;
            case 80://工单管理-工作台
                return <MyOperationWorkSpace />;
                break;
            case 81://新建工单页
                return <CreateOperationView />;
                break;
            case 82://修改工单页
                return <EditOperationView />;
                break;
            case 83://流程设计
                return <FlowDesignView />;
                break;
            case 831://流程编辑
                return <FlowDesignEditView />;
                break;
            case 84://自动工单规则
                return <AutoWorkOrderRulesView />;
                break;
            case 85://值班管理-值班日历
                return <DutyListView />;
                break;
            case 86://值班管理-值班表设置
                return <DutyListView2 />;
                break;
            case 87://工单模板-模板列表
                return <WorkOrderTemplateListView />;
                break;
            case 88://工单模板-创建模板
                return <CreateWorkOrderTemplateView />;
                break;
            case 700://用户管理列表
                return <UserListView />
                break;
            case 701://用户新增页
                return <UserAddView />
                break;
            case 702://在线用户
                return <OnLineUserListView />
                break;
            case 801://系统组织管理
                return <CreateGroupView />
                break;
            case 803://系统数据字典
                return <DataDictionary />
                break;
            case 806://系统软件许可
                return <SystemInfoPage />
                break;
            case 851://角色和权限管理
                return <RoleManageView />
                break;
            case 900://服务级别列表
                return <SlaList />;
                break;
            case 901://服务级添加
                return <SlaAdd />;
                break;
            case 902://服务级详情
                return <SlaDetails />;
                break;
            case 90://发布列表
                return <NoticeList />;
                break;
            case 91://发布信息
                return <NoticeInfo />;
                break;
            case 92://发布信息审批
                return <NoticeApproval />;
                break;
            case 93://历史发布
                return <NoticeHistoryList />;
                break;
            case 94://提交公告
                return <NoticeSubmitList />;
                break;
            case 940://提交公告
                return <NoticeSubmitDetails />;
                break;
            case 941://发布公告
                return <NoticeListDetails />;
                break;
            case 942://历史公告
                return <NoticeHistoryListDetails />;
                break;
            case 943://提交公告
                return <NoticeApprovalDetails />;
                break;
            case 95://知识清单
                return <RepositoryList />;
                break;
            case 96://新建知识
                return <RepositoryAdd />;
                break;
            case 97://审核知识列表
                return <RepositoryApproval />;
                break;
            case 98://审核知识详情
                return <RepositoryDetails />;
                break;
            case 99://知识清单详情
                return <RepositoryListDetails />;
                break;
            case 101: //资产统计
                return <AssetStatistic />;
                break;
            case 102: //新建资产
                return <AssetCreateView />;
                break;
            case 103: //资产维修清单
                return <AssetMaintainView />;
                break;
            case 104: //新建资产维修单
                return <AssetCreateMaintainView />;
                break;
            case 105: //资产监控同步
                return <AssetMonitorView />;
                break;
            case 106: //资产详情
                return <AssetDetailView />;
                break;
            case 107: //新建资产维修单
                return <AssetMaintainDetailView />;
                break;
            case 108: //资产维保
                return <AssetAssetMaintainView />;
                break;
            case 109://资产列表
                return <AssetManageListPage />
                break;
            case 150: //网络拓扑-拓扑导航
                return <TopologyNavView />;
                break;
            case 200: //报表管理：摄像机视频考核
                return <CameraVideoCheckReport />;
                break;
            case 202: //报表管理：摄像机离线状态详细统计报表
                return <CameraOfflineStatisticsReport />;
                break;
            case 203: //报表管理：摄像机录像丢失详细统计报表
                return <CameraMediaLostStatisticsReport />;
                break;
            case 204: //报表管理：摄像机视频丢失详细统计报表
                return <CameraVideoLostStatisticsReport />;
                break;
            case 205: //报表管理：摄像机视频质量实时统计
                return <CameraVideoQualityStatisticsReport />;
                break;
            case 206: //报表管理：摄像机在线趋势图
                return <CameraOnlineTrendsReport />;
                break;
            case 220: //厅级报表管理：摄像机视频考核
                return <DepCameraVideoCheckReport />;
                break;
            case 400: //DVR统计报表
                return <DVRStatisticsReport />;
                break;
            case 401: //NVR统计报表
                return <NVRStatisticsReport />;
                break;
            case 402: //编码器统计报表
                return <EncoderStatisticsReport />;
                break;
            case 403: //服务器统计报表
                return <ServerStatisticsReport />;
                break;
            case 404: //网络设备统计报表
                return <NetworkStatisticsReport />;
                break;
            case 405: //防火墙统计报表
                return <FirewallStatisticsReport />;
                break;
            case 406: //数据库统计报表
                return <DatabaseStatisticsReport />;
                break;
            case 4000: //DVR统计报表
                return <DepDVRStatisticsReport />;
                break;
            case 4001: //NVR统计报表
                return <DepNVRStatisticsReport />;
                break;
            case 4002: //编码器统计报表
                return <DepEncoderStatisticsReport />;
                break;
            case 4003: //服务器统计报表
                return <DepServerStatisticsReport />;
                break;
            case 4004: //网络设备统计报表
                return <DepNetworkStatisticsReport />;
                break;
            case 4005: //防火墙统计报表
                return <DepFirewallStatisticsReport />;
                break;
            case 4006: //数据库统计报表
                return <DepDatabaseStatisticsReport />;
                break;
            case 301: //资产统计报表
                return <AssetStatisticReportView />;
                break;
            case 302: //资产维修报表
                return <AssetMaintainReportView />;
                break;
            case 501: //工单报表
                return <OrderReportView />
            case 502: //计费报表
                return <ChargeReportView />
            case 503: //厅级工单报表
                return <DepOrderReportView />
            case 1000: //市县级首页
                return <IndexPage1 />;
                break;
            case 1001: //厅级首页
                return <IndexPage2 />;
                break;
            case 1002: //告警升级详情
                return <ReportError />;
                break;
            case 7000: //资源监测-仪表板中心
              return <DashboardCenterView />;
              break;
            case 8000: //visio视图
              return <TopologyView />;
              break;
            // case 8001: //告警详情
            //   return <TopologyDetailsView />;
            //   break;
            // default:
            //     return <DashBoardView />;
            //     break;
        }
    },

    render: function() {
        var moduleTab = 0;
        switch(this.props.pageId){
            case 101: //资产统计
            case 102: //新建资产
            case 105: //资产监控同步
            case 106: //资产详情
            case 108: //资产维保
            case 109:
                moduleTab = '2-1';
                break;
            case 103: //资产维修清单
            case 104: //新建资产维修单
            case 107: //维修单详情
                moduleTab = '2-4';
                break;
            case 150: //网络拓朴-拓朴导航
                moduleTab = '3-1';
                break;
            case 49: //资源监测
            case 50:
            case 51:
            case 52:
            case 53:
                moduleTab = '1-1';
                break;
            case 55:
            case 56:
            case 57:
            case 58:
            case 59:
            case 70:
            case 71:
            case 1002:
            case 60:
                moduleTab = '1-2';
                break;
            case 54:
            case 61:
            case 62:
                moduleTab = '1-3';
                break;
            case 7000:
                moduleTab = '1-4';
                break;
            case 8000:
                moduleTab = '1-5';
                break;
            case 8001:
                moduleTab = '1-5';
                break;
            case 80: //运维管理
            case 81:
            case 82:
            case 84:
                moduleTab = '4-1';
                break;
            case 83:
                moduleTab = '4-6';
                break;
            case 831:
                moduleTab = '4-6';
                break;
            case 85:
            case 86:
                moduleTab = '4-7';
                break;
            case 87:
            case 88:
                moduleTab = '4-8';
                break;
            case 700:
            case 701:
                moduleTab = '6-2';
                break;
            case 702:
                moduleTab = '6-5';
                break;
            case 800:
            case 801:
            case 802:
                moduleTab = '6-1';
                break;
            case 803:
                moduleTab = '6-4';
                break;
            case 806:
                moduleTab = '6-6';
                break;
            case 851:
                moduleTab = '6-3';
                break;
            case 900:
            case 901:
            case 902:
                moduleTab = '4-3';
                break;
            case 90:
            case 91:
            case 92:
            case 93:
            case 94:
                moduleTab = '4-4';
                break;
            case 940:
                moduleTab = '4-4';
               break;
            case 941:
                moduleTab = '4-4';
                break;
            case 942:
                moduleTab = '4-4';
               break;
            case 943:
               moduleTab = '4-4';
              break;
            case 95:
            case 96:
            case 97:
            case 98:
            case 99:
                moduleTab = '4-5';
                break;
            case 200:
            case 202:
            case 203:
            case 204:
            case 205:
            case 206:
                moduleTab = '5-1';
                break;
            case 220:
                moduleTab = '5-6';
                break;
            case 207:
            case 208:
            case 209:
            case 400:
            case 401:
            case 402:
            case 403:
            case 404:
            case 405:
            case 406:
                moduleTab = '5-2';
                break;
            case 4000:
            case 4001:
            case 4002:
            case 4003:
            case 4004:
            case 4005:
            case 4006:
                moduleTab = '5-7';
                break;
            case 501:
                moduleTab = '5-3';
                break;
            case 502:
                moduleTab = '5-5';
                break;
            case 503:
                moduleTab = '5-8';
                break;
            case 201://统计报表
            case 301:
            case 302:
                moduleTab = '5-4';
                break;
            case 1000:
                moduleTab = '0-1';
                break;
            case 1001:
                moduleTab = '0-2';
                break;
        }
        return (
            <div className="homePageDiv">
              {/*<Navbar moduleTab={moduleTab} />*/}
              <TokenInfoModal />
              <ErrMessageModal />
              <PublicMessageModal />
              <ExportInModal />
              <NewNavbar moduleTab={moduleTab}/>
              {this.getForm(this.props.pageId)}
            </div>
        );
    }
});

var HomePageSideBar = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("SampleStore").getState()
    //     }
    // },

    getInitialState: function() {
        return {
            sidebaropen: false
        };
    },

    onClickShowHide: function() {
        this.setState({sidebaropen: !this.state.sidebaropen});
    },

    render: function() {
        var sidebarContent = <b style={{background: '#fff'}}>Sidebar content</b>;
        var token = Store.get("token");
        if(token == null || token == "") {
            this.history.pushState(null,'');
        }
        return (
            //<Sidebar sidebar={<ModulesPage dataset={this.props.dataset} update={this.props.update}/>}
            //         open={this.state.itoss.bShowModules}
            //         sidebarWidth={200}
            //         overlayRight={$(window).width() - 950}
            //         sidebarBackground={'#fff'}
            //         pullRight={true}
            //         overflowX={"hidden"}>
            //    <HomePage flux={this.props.flux} pageId={this.props.pageId}/>
            //</Sidebar>
            // <HomePage flux={this.props.flux} pageId={this.props.pageId}/>
            <HomePage pageId={this.props.pageId}/>
        );
    }
});

module.exports = HomePageSideBar;
