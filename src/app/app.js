//进入"严格模式"的标志，是下面这行语句："use strict";
'use strict';

var React = require('react');
//var Router = require('react-router');
// var Fluxxor = require('fluxxor');
//var Route = Router.Route;
//var DefaultRoute = Router.DefaultRoute;
//var RouteHandler = Router.RouteHandler;

var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
//React.initializeTouchEvents(true);
var createHashHistory = require('history/lib/createHashHistory');

var AppRoutes = require('./app-route.js');

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// var SampleAction = require('./actions/sample-actions.js');
// var SampleStore = require('./stores/sample-store.js');
//
// var loginAction = require('./actions/login-actions.js');
// var loginpageStore = require('./stores/loginpage-store.js');
//
// var yftDeviceMonitorTreeAction = require('./actions/yftdevicemonitortree-actions.js');
// var yftDeviceMonitorTreepageStore = require('./stores/yftdevicemonitortree-store.js');
//
// var yftDeviceMonitorAction = require('./actions/yftdevicemonitor-actions.js');
// var yftDeviceMonitorStore = require('./stores/yftdevicemonitor-store.js');
//
// //资源监测
// var yftEquipmentAction = require('./actions/yftequipment-actions.js');
// var yftEquipmentStore = require('./stores/yftequipment-store.js');
// var yftAlarmAction = require('./actions/yftalarm-actions.js');
// var yftAlarmStore = require('./stores/yftalarm-store.js');
// var yftVisioAction = require('./actions/yftvisio-actions.js');
// var yftVisioStore = require('./stores/yftvisio-store.js');
//
// //硬件资产详情
// var itossAssetHardwareDetailsAction = require('./actions/itossAssetHardwareDetails-actions.js');
// var itossAssetHardwareDetailsStore = require('./stores/itossAssetHardwareDetails-store.js');
//
// //资产管理
// var AssetManageAction = require('./actions/assetManage-actions.js');
// var AssetManageStore = require('./stores/assetManage-store.js');
//
// //运维管理
// var OperationAction = require('./actions/yftoperation-actions.js');
// var OperationStore = require('./stores/yftoperation-store.js');
// //
// var YFTOperationFlowAction = require('./actions/yftoperationflow-actions.js');
// var YFTOperationFlowStore = require('./stores/yftoperationflow-store.js');
// //
// var FlowDesignAction = require('./actions/yftflowdesign-actions.js');
// var FlowDesignStore = require('./stores/yftflowdesign-store.js');
// //服务级别协议
// var YFTSlaActions = require('./actions/yftsla-actions.js');
// var YFTSlaStore = require('./stores/yftsla-store.js');
//
// //知识库
// var YFTRepositoryActions = require('./actions/yftrepository-actions.js');
// var YFTRepositoryStore = require('./stores/yftrepository-store.js');
//
// //发布管理
// var YFTNoticeActions = require('./actions/yftnotice-actions.js');
// var YFTNoticeStore = require('./stores/yftnotice-store.js');
//
// //拓朴导航
// var YFTTopologyNavActions = require('./actions/yfttopologyNav-actions.js');
// var YFTTopologyNavStore = require('./stores/yfttopologyNav-store.js');
//
// //报表管理
// var ReportManageActions = require('./actions/yftreportmanage-actions.js');
// var ReportManageStore = require('./stores/yftreportmanage-store.js');
//
// var AssetReportActions = require('./actions/assetReport-actions.js');
// var AssetReportStore = require('./stores/assetReport-store.js');
//
// //系统管理
// var YFTSystemActions = require('./actions/yftsystem-actions.js');
// var YFTSystemStore = require('./stores/yftsystem-store.js');
// var YFTSystemRoleActions = require('./actions/yftsystemRole-actions.js');
// var YFTSystemRoleStore = require('./stores/yftsystemRole-store.js');
//
// //首页
// var YFTIndexActions = require('./actions/yftIndex-actions.js');
// var YFTIndexStore = require('./stores/yftIndex-store.js');
//
// //数据字典
// var DictActions = require('./actions/yftdataDict-actions.js');
// var DictStore = require('./stores/yftdataDict-store.js');
//
// var NavbarActions = require('./actions/yftNavbar-actions.js');
// var NavbarStore = require('./stores/yftNavbar-store.js');
//
// var PublicAction = {
//     stores : {
//         "SampleStore": new SampleStore(),
//         "AssetManageStore": new AssetManageStore(),
//         "LoginPageStore": new loginpageStore(),
//         "ItossAssetHardwareDetailsStore": new itossAssetHardwareDetailsStore(),
//         "YFTDeviceMonitorTreePageStore": new yftDeviceMonitorTreepageStore(),
//         "YFTDeviceMonitorStore": new yftDeviceMonitorStore(),
//         "YFTEquipmentStore": new yftEquipmentStore(),
//         "YFTOperationStore": new OperationStore(),
//         "YFTFlowDesignStore": new FlowDesignStore(),
//         "YFTOperationFlowStore": new YFTOperationFlowStore(),
//         "YFTSlaStore": new YFTSlaStore(),
//         "YFTRepositoryStore": new YFTRepositoryStore(),
//         "YFTNoticeStore": new YFTNoticeStore(),
//         "YFTTopologyNavStore": new YFTTopologyNavStore(),
//         "ReportManageStore": new ReportManageStore(),
//         "AssetReportStore": new AssetReportStore(),
//         "YFTSystemStore": new YFTSystemStore(),
//         "YFTSystemRoleStore": new YFTSystemRoleStore(),
//         "YFTIndexStore": new YFTIndexStore(),
//         "DictStore": new DictStore(),
//         "YFTAlarmStore": new yftAlarmStore(),
//         "YFTVisioStore": new yftVisioStore(),
//         "NavbarStore": new NavbarStore()
//     },
//     actions : {
//         "SampleActions": SampleAction,
//         "AssetManageActions": AssetManageAction,
//         "LoginActions": loginAction,
//         "ItossAssetHardwareDetailsActions": itossAssetHardwareDetailsAction,
//         "YFTDeviceMonitorTreeActions": yftDeviceMonitorTreeAction,
//         "YFTDeviceMonitorActions": yftDeviceMonitorAction,
//         "YFTEquipmentActions": yftEquipmentAction,
//         "YFTOperationActions": OperationAction,
//         "YFTFlowDesignActions": FlowDesignAction,
//         "YFTOperationFlowActions": YFTOperationFlowAction,
//         "YFTSlaActions":YFTSlaActions,
//         "YFTRepositoryActions": YFTRepositoryActions,
//         "YFTNoticeActions": YFTNoticeActions,
//         "YFTTopologyNavActions": YFTTopologyNavActions,
//         "ReportManageActions": ReportManageActions,
//         "AssetReportActions": AssetReportActions,
//         "YFTSystemActions": YFTSystemActions,
//         "YFTSystemRoleActions": YFTSystemRoleActions,
//         "YFTIndexActions": YFTIndexActions,
//         "DictActions": DictActions,
//         "YFTAlarmAction": yftAlarmAction,
//         "YFTVisioAction":yftVisioAction,
//         "NavbarActions": NavbarActions
//     }
// }
//
// var flux = new Fluxxor.Flux(PublicAction.stores, PublicAction.actions);
// window.flux = flux;
//
// flux.on("dispatch", function(type, payload) {
// 	if (console && console.log) {
// 		//console.log("[Dispatch]", type, payload);
// 	}
// });

var store = configureStore();
var createComponent = (Component, props) => {
    return <Component {...props} />;
};

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={createHashHistory({queryKey: false})} createElement={createComponent}>
                {AppRoutes}
            </Router>
        </Provider>,
        document.getElementById("root")
    );
});
