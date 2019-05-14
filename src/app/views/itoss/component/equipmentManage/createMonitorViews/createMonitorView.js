/**
 * Created by SHIN on 2015/12/29.
 */
require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
// StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as EquipmentActions from '../../../../../actions/equipment_action'

// var MonitorTree2 = require('../../monitorTree/monitorTree2.js');
// var CreateResourceModal = require('../createResourceModal');
// var CreateMonitorModal = require('../createMonitorModal');
var ErrorAlarmConditionModal = require('./common/createMonitorView_errorAlarmConditionModal');
var WarningAlarmConditionModal = require('./common/createMonitorView_warningAlarmConditionModal');
var GoodAlarmConditionModal = require('./common/createMonitorView_goodAlarmConditionModal');
var MonitorDiskTableModal = require('./common/createMonitorView_monitorDiskTableModal');
var MonitorDiskIOTableModal = require('./common/createMonitorView_monitorDiskIOTableModal');
var MonitorNetworkTableModal = require('./common/createMonitorView_monitorNetworkTableModal');
var MonitorScriptTableModal = require('./common/createMonitorView_monitorScriptTableModal');
var MonitorProcessTableModal = require('./common/createMonitorView_monitorProcessTableModal');
var MonitorGigabitInterfaceTableModal = require('./common/createMonitorView_monitorGigabitInterfaceTableModal');
var MonitorServiceTableModal = require('./common/createMonitorView_monitorServiceTableModal');
var MonitorNTEventLogTableModal = require('./common/createMonitorView_monitorNTEventLogTableModal');
var MonitorMySqlTableModal = require('./common/createMonitorView_monitorMySqlTableModal');
var MonitorSnmpMIBTableModal = require('./common/createMonitorView_monitorSnmpMIBTableModal');

import CreateMonitorView_AcAssociatedusers from './createMonitorView_AcAssociatedusers';
import CreateMonitorView_AcOnlineusers from './createMonitorView_AcOnlineusers';
import CreateMonitorView_ACPortStatus from './createMonitorView_ACPortStatus';
// import CreateMonitorView_Agent from './createMonitorView_Agent';
// import CreateMonitorView_AgentAppMemory from './createMonitorView_AgentAppMemory';
// import CreateMonitorView_AgentCPU from './createMonitorView_AgentCPU';
// import CreateMonitorView_AgentCPUPerformance from './createMonitorView_AgentCPUPerformance';
// import CreateMonitorView_AgentDirectory from './createMonitorView_AgentDirectory';
// import CreateMonitorView_AgentDiskInodes from './createMonitorView_AgentDiskInodes';
// import CreateMonitorView_AgentDiskIO from './createMonitorView_AgentDiskIO';
// import CreateMonitorView_AgentDiskSpace from './createMonitorView_AgentDiskSpace';
// import CreateMonitorView_AgentFile from './createMonitorView_AgentFile';
// import CreateMonitorView_AgentMemory from './createMonitorView_AgentMemory';
// import CreateMonitorView_AgentNetIF from './createMonitorView_AgentNetIF';
// import CreateMonitorView_AgentNTEventLog from './createMonitorView_AgentNTEventLog';
// import CreateMonitorView_AgentProcess from './createMonitorView_AgentProcess';
// import CreateMonitorView_AgentScript from './createMonitorView_AgentScript';
// import CreateMonitorView_AgentService from './createMonitorView_AgentService';
import CreateMonitorView_Apache from './createMonitorView_Apache';
import CreateMonitorView_APBearingUser from './createMonitorView_APBearingUser';
import CreateMonitorView_ApConnectedusers from './createMonitorView_ApConnectedusers';
// import CreateMonitorView_APConnectinfo from './createMonitorView_APConnectinfo';
import CreateMonitorView_APConnectSuccessRate from './createMonitorView_APConnectSuccessRate';
import CreateMonitorView_ApCpu from './createMonitorView_ApCpu';
// import CreateMonitorView_APCurrentChannel from './createMonitorView_APCurrentChannel';
import CreateMonitorView_APFaultRate from './createMonitorView_APFaultRate';
// import CreateMonitorView_APFlow from './createMonitorView_APFlow';
import CreateMonitorView_ApMemory from './createMonitorView_ApMemory';
import CreateMonitorView_APPercentage from './createMonitorView_APPercentage';
import CreateMonitorView_AppMemory from './createMonitorView_AppMemory';
// import CreateMonitorView_APSignal from './createMonitorView_APSignal';
import CreateMonitorView_ApWlanOnline from './createMonitorView_ApWlanOnline';
// import CreateMonitorView_CiscoCpu from './createMonitorView_CiscoCpu';
// import CreateMonitorView_CiscoMemory from './createMonitorView_CiscoMemory';
// import CreateMonitorView_CocoaTempAndPower from './createMonitorView_CocoaTempAndPower';
// import CreateMonitorView_ConnectionsNumber from './createMonitorView_ConnectionsNumber';
import CreateMonitorView_CPU from './createMonitorView_CPU';
import CreateMonitorView_CPUPerformance from './createMonitorView_CPUPerformance';
import CreateMonitorView_DataQuery from './createMonitorView_DataQuery';
import CreateMonitorView_Directory from './createMonitorView_Directory';
import CreateMonitorView_DiskInodes from './createMonitorView_DiskInodes';
import CreateMonitorView_DiskIO from './createMonitorView_DiskIO';
import CreateMonitorView_DiskSpace from './createMonitorView_DiskSpace';
import CreateMonitorView_DNS from './createMonitorView_DNS';
import CreateMonitorView_FanStatus from './createMonitorView_FanStatus';
import CreateMonitorView_FibreChannelStatus from './createMonitorView_FibreChannelStatus';
import CreateMonitorView_File from './createMonitorView_File';
import CreateMonitorView_Ftp from './createMonitorView_Ftp';
import CreateMonitorView_IPMIFAN from './createMonitorView_IPMIFAN';
import CreateMonitorView_IPMIPOWERSUPPLY from './createMonitorView_IPMIPOWERSUPPLY';
import CreateMonitorView_IPMISENSOR from './createMonitorView_IPMISENSOR';
import CreateMonitorView_IPMITEMPERATURE from './createMonitorView_IPMITEMPERATURE';
import CreateMonitorView_MAIL from './createMonitorView_MAIL';
import CreateMonitorView_Memory from './createMonitorView_Memory';
import CreateMonitorView_ModuleStatus from './createMonitorView_ModuleStatus';
import CreateMonitorView_MongoDBPerformance from './createMonitorView_MongoDBPerformance';
import CreateMonitorView_MongoQuery from './createMonitorView_MongoQuery';
import CreateMonitorView_Mysql from './createMonitorView_Mysql';
import CreateMonitorView_MysqlBase from './createMonitorView_MysqlBase';
import CreateMonitorView_MysqlMasterSlave from './createMonitorView_MysqlMasterSlave';
import CreateMonitorView_MysqlMemoryStatus from './createMonitorView_MysqlMemoryStatus';
import CreateMonitorView_MysqlProcess from './createMonitorView_MysqlProcess';
import CreateMonitorView_NetWork from './createMonitorView_NetWork';
import CreateMonitorView_NetworkCpu from './createMonitorView_NetworkCpu';
import CreateMonitorView_NetworkMemory from './createMonitorView_NetworkMemory';
import CreateMonitorView_Nginx from './createMonitorView_Nginx';
import CreateMonitorView_NTEventLog from './createMonitorView_NTEventLog';
// import CreateMonitorView_OnlineStatus from './createMonitorView_OnlineStatus';
import CreateMonitorView_Oracle from './createMonitorView_Oracle';
import CreateMonitorView_OracleConnections from './createMonitorView_OracleConnections';
import CreateMonitorView_OracleInfo from './createMonitorView_OracleInfo';
import CreateMonitorView_OraclePerformance from './createMonitorView_OraclePerformance';
import CreateMonitorView_OracleSGA from './createMonitorView_OracleSGA';
import CreateMonitorView_OracleTableSpace from './createMonitorView_OracleTableSpace';
// import CreateMonitorView_ParentalControl from './createMonitorView_ParentalControl';
import CreateMonitorView_Ping from './createMonitorView_Ping';
import CreateMonitorView_Port from './createMonitorView_Port';
import CreateMonitorView_PowerStatus from './createMonitorView_PowerStatus';
import CreateMonitorView_Process from './createMonitorView_Process';
import CreateMonitorView_RoomEnvironment from './createMonitorView_RoomEnvironment';
import CreateMonitorView_Script from './createMonitorView_Script';
import CreateMonitorView_Service from './createMonitorView_Service';
import CreateMonitorView_SnmpCpu from './createMonitorView_SnmpCpu';
import CreateMonitorView_SnmpDisk from './createMonitorView_SnmpDisk';
import CreateMonitorView_SnmpGigabitInterface from './createMonitorView_SnmpGigabitInterface';
import CreateMonitorView_SnmpMemory from './createMonitorView_SnmpMemory';
import CreateMonitorView_SnmpMIB from './createMonitorView_SnmpMIB';
import CreateMonitorView_SnmpNWBandwidth from './createMonitorView_SnmpNWBandwidth';
import CreateMonitorView_SnmpProcess from './createMonitorView_SnmpProcess';
import CreateMonitorView_SnmpSwapDisk from './createMonitorView_SnmpSwapDisk';
import CreateMonitorView_SNMPTrap from './createMonitorView_SNMPTrap';
import CreateMonitorView_SnmpUpTime from './createMonitorView_SnmpUpTime';
import CreateMonitorView_SQLBuffer from './createMonitorView_SQLBuffer';
import CreateMonitorView_SQLCache from './createMonitorView_SQLCache';
import CreateMonitorView_SQLMemory from './createMonitorView_SQLMemory';
import CreateMonitorView_SQLServer from './createMonitorView_SQLServer';
import CreateMonitorView_SQLStatic from './createMonitorView_SQLStatic';
import CreateMonitorView_SQLUser from './createMonitorView_SQLUser';
import CreateMonitorView_SSL from './createMonitorView_SSL';
import CreateMonitorView_StorageCache from './createMonitorView_StorageCache';
import CreateMonitorView_StorageDisk from './createMonitorView_StorageDisk';
import CreateMonitorView_StorageFaults from './createMonitorView_StorageFaults';
import CreateMonitorView_StorageProcessors from './createMonitorView_StorageProcessors';
import CreateMonitorView_StorageStatus from './createMonitorView_StorageStatus';
import CreateMonitorView_StorageVolume from './createMonitorView_StorageVolume';
import CreateMonitorView_SysLog from './createMonitorView_SysLog';
import CreateMonitorView_Temperature from './createMonitorView_Temperature';
import CreateMonitorView_Tomcat from './createMonitorView_Tomcat';
import CreateMonitorView_URL from './createMonitorView_URL';
import CreateMonitorView_VMwareDatastore from './createMonitorView_VMwareDatastore';
import CreateMonitorView_VMwareHostCpu from './createMonitorView_VMwareHostCpu';
import CreateMonitorView_VMwareHostDisk from './createMonitorView_VMwareHostDisk';
import CreateMonitorView_VMwareHostInfo from './createMonitorView_VMwareHostInfo';
import CreateMonitorView_VMwareHostMemory from './createMonitorView_VMwareHostMemory';
import CreateMonitorView_VMwareHostNetwork from './createMonitorView_VMwareHostNetwork';
import CreateMonitorView_VMwareHostPower from './createMonitorView_VMwareHostPower';
import CreateMonitorView_VMwareVirtualMachine from './createMonitorView_VMwareVirtualMachine';
import CreateMonitorView_WeblogicCluster from './createMonitorView_WeblogicCluster';
import CreateMonitorView_WeblogicConnPool from './createMonitorView_WeblogicConnPool';
import CreateMonitorView_WeblogicExecuteQueue from './createMonitorView_WeblogicExecuteQueue';
import CreateMonitorView_WeblogicHeap from './createMonitorView_WeblogicHeap';
import CreateMonitorView_WeblogicJms from './createMonitorView_WeblogicJms';
import CreateMonitorView_WeblogicServer from './createMonitorView_WeblogicServer';
import CreateMonitorView_WeblogicStatus from './createMonitorView_WeblogicStatus';
import CreateMonitorView_WeblogicWebApp from './createMonitorView_WeblogicWebApp';
// import CreateMonitorView_WebsphereConnPool from './createMonitorView_WebsphereConnPool';
// import CreateMonitorView_WebsphereJVM from './createMonitorView_WebsphereJVM';
// import CreateMonitorView_WebsphereServSession from './createMonitorView_WebsphereServSession';
// import CreateMonitorView_WebsphereThreadPool from './createMonitorView_WebsphereThreadPool';
// import CreateMonitorView_WebsphereTranscation from './createMonitorView_WebsphereTranscation';
// import CreateMonitorView_WebsphereWebApp from './createMonitorView_WebsphereWebApp';

var CreateMonitorView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState(),
    //     }
    // },

    componentDidMount: function() {
        const { dispatch } = this.props;
        if(document.getElementById('createMonitorView') != null) {
            document.getElementById('createMonitorView').style.height = $(window).height() - 110 - 30 + 'px';
        }
        dispatch(EquipmentActions.setDeleteMonitorAlarmConditionsData([]));
    },

    getForm: function(selectedMonitor) {
        // return <CreateMonitorView_SQLServer monitor={selectedMonitor}/>;     //测试用
        const {dispatch,selectedNode } = this.props;

        switch (selectedMonitor.monitorType) {
            case 'AcAssociatedusers':
                return <CreateMonitorView_AcAssociatedusers monitor={selectedMonitor}/>;
                break;
            case 'AcOnlineusers':
                return <CreateMonitorView_AcOnlineusers monitor={selectedMonitor}/>;
                break;
            case 'ACPortStatus':
                return <CreateMonitorView_ACPortStatus monitor={selectedMonitor}/>;
                break;
            // case 'Agent':
            //     return <CreateMonitorView_Agent monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentAppMemory':
            //     return <CreateMonitorView_AgentAppMemory monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentCPU':
            //     return <CreateMonitorView_AgentCPU monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentCPUPerformance':
            //     return <CreateMonitorView_AgentCPUPerformance monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentDirectory':
            //     return <CreateMonitorView_AgentDirectory monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentDiskInodes':
            //     return <CreateMonitorView_AgentDiskInodes monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentDiskIO':
            //     return <CreateMonitorView_AgentDiskIO monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentDiskSpace':
            //     return <CreateMonitorView_AgentDiskSpace monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentFile':
            //     return <CreateMonitorView_AgentFile monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentMemory':
            //     return <CreateMonitorView_AgentMemory monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentNetIF':
            //     return <CreateMonitorView_AgentNetIF monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentNTEventLog':
            //     return <CreateMonitorView_AgentNTEventLog monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentProcess':
            //     return <CreateMonitorView_AgentProcess monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentScript':
            //     return <CreateMonitorView_AgentScript monitor={selectedMonitor}/>;
            //     break;
            // case 'AgentService':
            //     return <CreateMonitorView_AgentService monitor={selectedMonitor}/>;
            //     break;
            case 'Apache':
                return <CreateMonitorView_Apache monitor={selectedMonitor}/>;
                break;
            case 'APBearingUser':
                return <CreateMonitorView_APBearingUser monitor={selectedMonitor}/>;
                break;
            case 'ApConnectedusers':
                return <CreateMonitorView_ApConnectedusers monitor={selectedMonitor}/>;
                break;
            // case 'APConnectinfo':
            //     return <CreateMonitorView_APConnectinfo monitor={selectedMonitor}/>;
            //     break;
            case 'APConnectSuccessRate':
                return <CreateMonitorView_APConnectSuccessRate monitor={selectedMonitor}/>;
                break;
            case 'ApCpu':
                return <CreateMonitorView_ApCpu monitor={selectedMonitor}/>;
                break;
            // case 'APCurrentChannel':
            //     return <CreateMonitorView_APCurrentChannel monitor={selectedMonitor}/>;
            //     break;
            case 'APFaultRate':
                return <CreateMonitorView_APFaultRate monitor={selectedMonitor}/>;
                break;
            // case 'APFlow':
            //     return <CreateMonitorView_APFlow monitor={selectedMonitor}/>;
            //     break;
            case 'ApMemory':
                return <CreateMonitorView_ApMemory monitor={selectedMonitor}/>;
                break;
            case 'APPercentage':
                return <CreateMonitorView_APPercentage monitor={selectedMonitor}/>;
                break;
            case 'AppMemory':
                return <CreateMonitorView_AppMemory monitor={selectedMonitor}/>;
                break;
            // case 'APSignal':
            //     return <CreateMonitorView_APSignal monitor={selectedMonitor}/>;
            //     break;
            case 'ApWlanOnline':
                return <CreateMonitorView_ApWlanOnline monitor={selectedMonitor}/>;
                break;
            // case 'CiscoCpu':
            //     return <CreateMonitorView_CiscoCpu monitor={selectedMonitor}/>;
            //     break;
            // case 'CiscoMemory':
            //     return <CreateMonitorView_CiscoMemory monitor={selectedMonitor}/>;
            //     break;
            // case 'CocoaTempAndPower':
            //     return <CreateMonitorView_CocoaTempAndPower monitor={selectedMonitor}/>;
            //     break;
            // case 'ConnectionsNumber':
            //     return <CreateMonitorView_ConnectionsNumber monitor={selectedMonitor}/>;
            //     break;
            case 'CPU':
                return <CreateMonitorView_CPU monitor={selectedMonitor}/>;
                break;
            case 'CPUPerformance':
                return <CreateMonitorView_CPUPerformance monitor={selectedMonitor}/>;
                break;
            case 'DataQuery':
                return <CreateMonitorView_DataQuery monitor={selectedMonitor}/>;
                break;
            case 'Directory':
                return <CreateMonitorView_Directory monitor={selectedMonitor}/>;
                break;
            case 'DiskInodes':
                return <CreateMonitorView_DiskInodes monitor={selectedMonitor}/>;
                break;
            case 'DiskIO':
                return <CreateMonitorView_DiskIO monitor={selectedMonitor}/>;
                break;
            case 'DiskSpace':
                return <CreateMonitorView_DiskSpace monitor={selectedMonitor}/>;
                break;
            case 'DNS':
                return <CreateMonitorView_DNS monitor={selectedMonitor}/>;
                break;
            case 'FanStatus':
                return <CreateMonitorView_FanStatus monitor={selectedMonitor}/>;
                break;
            case 'FibreChannelStatus':
                return <CreateMonitorView_FibreChannelStatus monitor={selectedMonitor}/>;
                break;
            case 'File':
                return <CreateMonitorView_File monitor={selectedMonitor}/>;
                break;
            case 'Ftp':
                return <CreateMonitorView_Ftp monitor={selectedMonitor}/>;
                break;
            case 'IPMIFAN':
                return <CreateMonitorView_IPMIFAN monitor={selectedMonitor}/>;
                break;
            case 'IPMIPOWERSUPPLY':
                return <CreateMonitorView_IPMIPOWERSUPPLY monitor={selectedMonitor}/>;
                break;
            case 'IPMISENSOR':
                return <CreateMonitorView_IPMISENSOR monitor={selectedMonitor}/>;
                break;
            case 'IPMITEMPERATURE':
                return <CreateMonitorView_IPMITEMPERATURE monitor={selectedMonitor}/>;
                break;
            case 'MAIL':
                return <CreateMonitorView_MAIL monitor={selectedMonitor}/>;
                break;
            case 'Memory':
                return <CreateMonitorView_Memory monitor={selectedMonitor}/>;
                break;
            case 'ModuleStatus':
                return <CreateMonitorView_ModuleStatus monitor={selectedMonitor}/>;
                break;
            case 'MongoDBPerformance':
                return <CreateMonitorView_MongoDBPerformance monitor={selectedMonitor}/>;
                break;
            case 'MongoQuery':
                return <CreateMonitorView_MongoQuery monitor={selectedMonitor}/>;
                break;
            case 'Mysql':
                return <CreateMonitorView_Mysql monitor={selectedMonitor}/>;
                break;
            case 'MysqlBase':
                return <CreateMonitorView_MysqlBase monitor={selectedMonitor}/>;
                break;
            case 'MysqlMasterSlave':
                return <CreateMonitorView_MysqlMasterSlave monitor={selectedMonitor}/>;
                break;
            case 'MysqlMemoryStatus':
                return <CreateMonitorView_MysqlMemoryStatus monitor={selectedMonitor}/>;
                break;
            case 'MysqlProcess':
                return <CreateMonitorView_MysqlProcess monitor={selectedMonitor}/>;
                break;
            case 'NetWork':
                return <CreateMonitorView_NetWork monitor={selectedMonitor}/>;
                break;
            case 'NetworkCpu':
                return <CreateMonitorView_NetworkCpu monitor={selectedMonitor}/>;
                break;
            case 'NetworkMemory':
                return <CreateMonitorView_NetworkMemory monitor={selectedMonitor}/>;
                break;
            case 'Nginx':
                return <CreateMonitorView_Nginx monitor={selectedMonitor}/>;
                break;
            case 'NTEventLog':
                return <CreateMonitorView_NTEventLog monitor={selectedMonitor}/>;
                break;
            // case 'OnlineStatus':
            //     return <CreateMonitorView_OnlineStatus monitor={selectedMonitor}/>;
            //     break;
            case 'Oracle':
                return <CreateMonitorView_Oracle monitor={selectedMonitor}/>;
                break;
            case 'OracleConnections':
                return <CreateMonitorView_OracleConnections monitor={selectedMonitor}/>;
                break;
            case 'OracleInfo':
                return <CreateMonitorView_OracleInfo monitor={selectedMonitor}/>;
                break;
            case 'OraclePerformance':
                return <CreateMonitorView_OraclePerformance monitor={selectedMonitor}/>;
                break;
            case 'OracleSGA':
                return <CreateMonitorView_OracleSGA monitor={selectedMonitor}/>;
                break;
            case 'OracleTableSpace':
                return <CreateMonitorView_OracleTableSpace monitor={selectedMonitor}/>;
                break;
            // case 'ParentalControl':
            //     return <CreateMonitorView_ParentalControl monitor={selectedMonitor}/>;
            //     break;
            case 'Ping':
                return <CreateMonitorView_Ping monitor={selectedMonitor}/>;
                break;
            case 'Port':
                return <CreateMonitorView_Port monitor={selectedMonitor}/>;
                break;
            case 'PowerStatus':
                return <CreateMonitorView_PowerStatus monitor={selectedMonitor}/>;
                break;
            case 'Process':
                return <CreateMonitorView_Process monitor={selectedMonitor}/>;
                break;
            case 'RoomEnvironment':
                return <CreateMonitorView_RoomEnvironment monitor={selectedMonitor}/>;
                break;
            case 'Script':
                return <CreateMonitorView_Script monitor={selectedMonitor}/>;
                break;
            case 'Service':
                return <CreateMonitorView_Service monitor={selectedMonitor}/>;
                break;
            case 'SnmpCpu':
                return <CreateMonitorView_SnmpCpu monitor={selectedMonitor}/>;
                break;
            case 'SnmpDisk':
                return <CreateMonitorView_SnmpDisk monitor={selectedMonitor}/>;
                break;
            case 'SnmpGigabitInterface':
                return <CreateMonitorView_SnmpGigabitInterface monitor={selectedMonitor}/>;
                break;
            case 'SnmpMemory':
                return <CreateMonitorView_SnmpMemory monitor={selectedMonitor}/>;
                break;
            case 'SnmpMIB':
                return <CreateMonitorView_SnmpMIB monitor={selectedMonitor}/>;
                break;
            case 'SnmpNWBandwidth':
                return <CreateMonitorView_SnmpNWBandwidth monitor={selectedMonitor}/>;
                break;
            case 'SnmpProcess':
                return <CreateMonitorView_SnmpProcess monitor={selectedMonitor}/>;
                break;
            case 'SnmpSwapDisk':
                return <CreateMonitorView_SnmpSwapDisk monitor={selectedMonitor}/>;
                break;
            case 'SNMPTrap':
                return <CreateMonitorView_SNMPTrap monitor={selectedMonitor}/>;
                break;
            case 'SnmpUpTime':
                return <CreateMonitorView_SnmpUpTime monitor={selectedMonitor}/>;
                break;

            case 'SQLBuffer':
                return <CreateMonitorView_SQLBuffer monitor={selectedMonitor}/>;
                break;
            case 'SQLCache':
                return <CreateMonitorView_SQLCache monitor={selectedMonitor}/>;
                break;
            case 'SQLMemory':
                return <CreateMonitorView_SQLMemory monitor={selectedMonitor}/>;
                break;
            case 'SQLServer':
                return <CreateMonitorView_SQLServer monitor={selectedMonitor}/>;
                break;
            case 'SQLStatic':
                return <CreateMonitorView_SQLStatic monitor={selectedMonitor}/>;
                break;
            case 'SQLUser':
                return <CreateMonitorView_SQLUser monitor={selectedMonitor}/>;
                break;
            case 'SSL':
                return <CreateMonitorView_SSL monitor={selectedMonitor}/>;
                break;
            case 'StorageCache':
                return <CreateMonitorView_StorageCache monitor={selectedMonitor}/>;
                break;
            case 'StorageDisk':
                return <CreateMonitorView_StorageDisk monitor={selectedMonitor}/>;
                break;
            case 'StorageFaults':
                return <CreateMonitorView_StorageFaults monitor={selectedMonitor}/>;
                break;
            case 'StorageProcessors':
                return <CreateMonitorView_StorageProcessors monitor={selectedMonitor}/>;
                break;
            case 'StorageStatus':
                return <CreateMonitorView_StorageStatus monitor={selectedMonitor}/>;
                break;
            case 'StorageVolume':
                return <CreateMonitorView_StorageVolume monitor={selectedMonitor}/>;
                break;
            case 'SysLog':
                return <CreateMonitorView_SysLog monitor={selectedMonitor}/>;
                break;
            case 'Temperature':
                return <CreateMonitorView_Temperature monitor={selectedMonitor}/>;
                break;
            case 'Tomcat':
                return <CreateMonitorView_Tomcat monitor={selectedMonitor}/>;
                break;
            case 'URL':
                return <CreateMonitorView_URL monitor={selectedMonitor}/>;
                break;
            case 'VMwareDatastore':
                return <CreateMonitorView_VMwareDatastore monitor={selectedMonitor}/>;
                break;
            case 'VMwareHostCpu':
                return <CreateMonitorView_VMwareHostCpu monitor={selectedMonitor}/>;
                break;
            case 'VMwareHostDisk':
                return <CreateMonitorView_VMwareHostDisk monitor={selectedMonitor}/>;
                break;
            case 'VMwareHostInfo':
                return <CreateMonitorView_VMwareHostInfo monitor={selectedMonitor}/>;
                break;
            case 'VMwareHostMemory':
                return <CreateMonitorView_VMwareHostMemory monitor={selectedMonitor}/>;
                break;
            case 'VMwareHostNetwork':
                return <CreateMonitorView_VMwareHostNetwork monitor={selectedMonitor}/>;
                break;
            case 'VMwareHostPower':
                return <CreateMonitorView_VMwareHostPower monitor={selectedMonitor}/>;
                break;
            case 'VMwareVirtualMachine':
                return <CreateMonitorView_VMwareVirtualMachine monitor={selectedMonitor}/>;
                break;
            case 'WeblogicCluster':
                return <CreateMonitorView_WeblogicCluster monitor={selectedMonitor}/>;
                break;
            case 'WeblogicConnPool':
                return <CreateMonitorView_WeblogicConnPool monitor={selectedMonitor}/>;
                break;
            case 'WeblogicExecuteQueue':
                return <CreateMonitorView_WeblogicExecuteQueue monitor={selectedMonitor}/>;
                break;
            case 'WeblogicHeap':
                return <CreateMonitorView_WeblogicHeap monitor={selectedMonitor}/>;
                break;
            case 'WeblogicJms':
                return <CreateMonitorView_WeblogicJms monitor={selectedMonitor}/>;
                break;
            case 'WeblogicServer':
                return <CreateMonitorView_WeblogicServer monitor={selectedMonitor}/>;
                break;
            case 'WeblogicStatus':
                return <CreateMonitorView_WeblogicStatus monitor={selectedMonitor}/>;
                break;
            case 'WeblogicWebApp':
                return <CreateMonitorView_WeblogicWebApp monitor={selectedMonitor}/>;
                break;
            // case 'WebsphereConnPool':
            //     return <CreateMonitorView_WebsphereConnPool monitor={selectedMonitor}/>;
            //     break;
            // case 'WebsphereJVM':
            //     return <CreateMonitorView_WebsphereJVM monitor={selectedMonitor}/>;
            //     break;
            // case 'WebsphereServSession':
            //     return <CreateMonitorView_WebsphereServSession monitor={selectedMonitor}/>;
            //     break;
            // case 'WebsphereThreadPool':
            //     return <CreateMonitorView_WebsphereThreadPool monitor={selectedMonitor}/>;
            //     break;
            // case 'WebsphereTranscation':
            //     return <CreateMonitorView_WebsphereTranscation monitor={selectedMonitor}/>;
            //     break;
            // case 'WebsphereWebApp':
            //     return <CreateMonitorView_WebsphereWebApp monitor={selectedMonitor}/>;
            //     break;
            // default:
            //     //return <CreateMonitorView_Network />;
            //     break;
        }
    },

    render:function(){
        const { dispatch, selectedMonitor, monitorAlarmConditionNameData, monitorDisks, monitorDiskIONames, monitorNetworks, monitorScripts, monitorProcesses, monitorServices, monitorNTEventLogs,
            mySqlCounterData, mySqlCurrentCounterData, monitorSnmpMIBCounter } = this.props;
        return(
            <div id='createMonitorView' className='overviewDiv'>
                <ErrorAlarmConditionModal monitorAlarmConditionNameData={monitorAlarmConditionNameData} monitorErrorConditionsData={this.props.monitorErrorConditionsData}
                    monitorSettingErrorConditionsData={this.props.monitorSettingErrorConditionsData} deleteMonitorAlarmConditionsData={this.props.deleteMonitorAlarmConditionsData}
                    setMonitorErrorConditionsData={monitorErrorConditionsData => dispatch(EquipmentActions.setMonitorErrorConditionsData(monitorErrorConditionsData))}
                    setMonitorSettingErrorConditionsData={monitorSettingErrorConditionsData => dispatch(EquipmentActions.setMonitorSettingErrorConditionsData(monitorSettingErrorConditionsData))}
                    setDeleteMonitorAlarmConditionsData={deleteMonitorAlarmConditionsData => dispatch(EquipmentActions.setDeleteMonitorAlarmConditionsData(deleteMonitorAlarmConditionsData))}/>
                <WarningAlarmConditionModal monitorAlarmConditionNameData={monitorAlarmConditionNameData} monitorWarningConditionsData={this.props.monitorWarningConditionsData}
                    monitorSettingWarningConditionsData={this.props.monitorSettingWarningConditionsData} deleteMonitorAlarmConditionsData={this.props.deleteMonitorAlarmConditionsData}
                    setMonitorWarningConditionsData={monitorWarningConditionsData => dispatch(EquipmentActions.setMonitorWarningConditionsData(monitorWarningConditionsData))}
                    setMonitorSettingWarningConditionsData={monitorSettingWarningConditionsData => dispatch(EquipmentActions.setMonitorSettingWarningConditionsData(monitorSettingWarningConditionsData))}
                    setDeleteMonitorAlarmConditionsData={deleteMonitorAlarmConditionsData => dispatch(EquipmentActions.setDeleteMonitorAlarmConditionsData(deleteMonitorAlarmConditionsData))}/>
                <GoodAlarmConditionModal monitorAlarmConditionNameData={monitorAlarmConditionNameData} monitorGoodConditionsData={this.props.monitorGoodConditionsData}
                    monitorSettingGoodConditionsData={this.props.monitorSettingGoodConditionsData} deleteMonitorAlarmConditionsData={this.props.deleteMonitorAlarmConditionsData}
                    setMonitorGoodConditionsData={monitorGoodConditionsData => dispatch(EquipmentActions.setMonitorGoodConditionsData(monitorGoodConditionsData))}
                    setMonitorSettingGoodConditionsData={monitorSettingGoodConditionsData => dispatch(EquipmentActions.setMonitorSettingGoodConditionsData(monitorSettingGoodConditionsData))}
                    setDeleteMonitorAlarmConditionsData={deleteMonitorAlarmConditionsData => dispatch(EquipmentActions.setDeleteMonitorAlarmConditionsData(deleteMonitorAlarmConditionsData))}/>
                <MonitorDiskTableModal monitorDisks={monitorDisks} setSelectedMonitorDisk={selectedMonitorDisk => dispatch(EquipmentActions.setSelectedMonitorDisk(selectedMonitorDisk))}/>
                <MonitorDiskIOTableModal monitorDiskIONames={monitorDiskIONames} setSelectedMonitorDiskIOName={selectedMonitorDiskIOName => dispatch(EquipmentActions.setSelectedMonitorDiskIOName(selectedMonitorDiskIOName))}/>
                <MonitorNetworkTableModal monitorNetworks={monitorNetworks} setSelectedMonitorNetwork={selectedMonitorNetwork => dispatch(EquipmentActions.setSelectedMonitorNetwork(selectedMonitorNetwork))} />
                <MonitorScriptTableModal monitorScripts={monitorScripts}
                  setSelectedMonitorScript={selectedMonitorScript => dispatch(EquipmentActions.setSelectedMonitorScript(selectedMonitorScript))}
                  getMonitorScripts={param =>dispatch(EquipmentActions.getMonitorScripts(param))}
                  selectedNode = {this.props.selectedNode}/>
                <MonitorProcessTableModal monitorProcesses={monitorProcesses} setSelectedMonitorProcess={selectedMonitorProcess => dispatch(EquipmentActions.setSelectedMonitorProcess(selectedMonitorProcess))}/>
                <MonitorGigabitInterfaceTableModal monitorNetworks={monitorNetworks} setSelectedMonitorNetwork={selectedMonitorNetwork => dispatch(EquipmentActions.setSelectedMonitorNetwork(selectedMonitorNetwork))}/>
                <MonitorServiceTableModal monitorServices={monitorServices} setSelectedMonitorService={selectedMonitorService => dispatch(EquipmentActions.setSelectedMonitorService(selectedMonitorService))}/>
                <MonitorNTEventLogTableModal monitorNTEventLogs={monitorNTEventLogs} setSelectedMonitorNTEventLog={selectedMonitorNTEventLog => dispatch(EquipmentActions.setSelectedMonitorNTEventLog(selectedMonitorNTEventLog))}/>
                <MonitorMySqlTableModal mySqlCounterData={mySqlCounterData} mySqlCurrentCounterData={mySqlCurrentCounterData} setMySqlMonitorCurrentCounterData={counterData => dispatch(EquipmentActions.setMySqlMonitorCurrentCounterData(counterData))}/>
                <MonitorSnmpMIBTableModal monitorSnmpMIBCounter={monitorSnmpMIBCounter} setSelectedMonitorSnmpMIBCounter={selectedMonitorSnmpMIBCounter => dispatch(EquipmentActions.setSelectedMonitorSnmpMIBCounter(selectedMonitorSnmpMIBCounter))}/>
                {this.getForm(selectedMonitor)}
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('createMonitorView') != null) {
        document.getElementById('createMonitorView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = CreateMonitorView;
CreateMonitorView.propTypes = {
  createMonitorViewId: PropTypes.number.isRequired,
  selectedMonitor: PropTypes.object,
  monitorAlarmConditionNameData: PropTypes.array.isRequired,
  monitorErrorConditionsData: PropTypes.array.isRequired,
  monitorSettingErrorConditionsData: PropTypes.array.isRequired,
  monitorWarningConditionsData: PropTypes.array.isRequired,
  monitorSettingWarningConditionsData: PropTypes.array.isRequired,
  monitorGoodConditionsData: PropTypes.array.isRequired,
  monitorSettingGoodConditionsData: PropTypes.array.isRequired,
  deleteMonitorAlarmConditionsData: PropTypes.array.isRequired,
  monitorDisks: PropTypes.array.isRequired,
  monitorDiskIONames: PropTypes.array.isRequired,
  monitorNetworks: PropTypes.array.isRequired,
  monitorScripts: PropTypes.array.isRequired,
  monitorProcesses: PropTypes.array.isRequired,
  monitorServices: PropTypes.array.isRequired,
  monitorNTEventLogs: PropTypes.array.isRequired,
  monitorSnmpMIBCounter: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { createMonitorViewId, selectedMonitor, monitorAlarmConditionNameData, monitorErrorConditionsData, monitorSettingErrorConditionsData, monitorWarningConditionsData,
          monitorSettingWarningConditionsData, monitorGoodConditionsData, monitorSettingGoodConditionsData, deleteMonitorAlarmConditionsData, selectedNode,
          monitorDisks, monitorDiskIONames, monitorNetworks, monitorScripts, monitorProcesses, monitorServices, monitorNTEventLogs, mySqlCounterData,mySqlCurrentCounterData, monitorSnmpMIBCounter } = state.equipmentReducer

  return {
    createMonitorViewId,
    selectedMonitor,
    monitorAlarmConditionNameData,
    monitorErrorConditionsData,
    monitorSettingErrorConditionsData,
    monitorWarningConditionsData,
    monitorSettingWarningConditionsData,
    monitorGoodConditionsData,
    monitorSettingGoodConditionsData,
    deleteMonitorAlarmConditionsData,
    selectedNode,
    monitorDisks,
    monitorDiskIONames,
    monitorNetworks,
    monitorScripts,
    monitorProcesses,
    monitorServices,
    monitorNTEventLogs,
    mySqlCounterData,
    mySqlCurrentCounterData,
    monitorSnmpMIBCounter
  }
}

export default connect(mapStateToProps)(CreateMonitorView)
