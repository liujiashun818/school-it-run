/**
 * Created by SHIN on 2015/12/11.
 */
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');
var DesView_tab1_tableBox = require('./desView_tab1_tableBox');
var DesView_tab1_Gy = require('./desView_tab1_Gy');
// var TriggerOperationModal = require("../operationManage/triggerOperation/triggerOperationModal");
import TriggerOperationModal from "../operationManage/triggerOperation/triggerOperationModal";

var desView_tab1 = React.createClass({
    // mixins: [Navigation, FluxMixin, StoreWatchMixin("YFTEquipmentStore")],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     itoss:flux.store("YFTEquipmentStore").getState()
    //   }
    // },
    render: function() {
        const { monitorFilterStatus, monitorTableData, monitorTableSelectFirstFlag, monitorsStatus, onClickDesViewMonitorTableRow, onKeyUpDesViewMonitorTableQuickSearch, onClickDesViewMonitorTableFilterStatus,
                curTowHourValue, funcValue, logGood, logError, logDanger, logBan, goodAlarm, warningAlarm, errorAlarm, selectedMonitorName, onClickRowChangePicData, curTowHourName,
                twoHoursReport, onSelectChangePicData, monitorsPropertyData, getMonitorsPropertyDataFromID, setMonitorsPropertyEdit, getAlarmConditionDataFromMonitorId,
                getMonitorsPropertyDataDoneFlag, getAlarmConditionDataDoneFlag, getMySqlMonitorCounterDataDoneFlag,
                setGetMonitorsPropertyDataDoneFlag, setGetAlarmConditionDataDoneFlag, setGetMySqlMonitorCounterDataDoneFlag, getMonitorsEntryAliasDataFromID } = this.props;

        return (
            <div className="equipmentManage_desTabDiv">
                <TriggerOperationModal />
                <DesView_tab1_tableBox monitorFilterStatus={monitorFilterStatus} monitorTableData={monitorTableData} monitorTableSelectFirstFlag={monitorTableSelectFirstFlag} monitorsStatus={monitorsStatus}
                    onClickRow={onClickDesViewMonitorTableRow} onKeyUpQuickSearch={onKeyUpDesViewMonitorTableQuickSearch} onClickTableFilterStatus={onClickDesViewMonitorTableFilterStatus}
                    monitorsPropertyData={monitorsPropertyData} getMonitorsPropertyDataFromID={getMonitorsPropertyDataFromID} setMonitorsPropertyEdit={setMonitorsPropertyEdit}
                    getAlarmConditionDataFromMonitorId={getAlarmConditionDataFromMonitorId}
                    getMonitorsPropertyDataDoneFlag={getMonitorsPropertyDataDoneFlag} getAlarmConditionDataDoneFlag={getAlarmConditionDataDoneFlag}
                    getMySqlMonitorCounterDataDoneFlag={getMySqlMonitorCounterDataDoneFlag} setGetMonitorsPropertyDataDoneFlag={setGetMonitorsPropertyDataDoneFlag}
                    setGetAlarmConditionDataDoneFlag={setGetAlarmConditionDataDoneFlag} setGetMySqlMonitorCounterDataDoneFlag={setGetMySqlMonitorCounterDataDoneFlag} getMonitorsEntryAliasDataFromID={getMonitorsEntryAliasDataFromID}/>
                <DesView_tab1_Gy curTowHourValue={curTowHourValue} funcValue={funcValue} logGood={logGood} logError={logError} logDanger={logDanger} logBan={logBan}
                    goodAlarm={goodAlarm} warningAlarm={warningAlarm} errorAlarm={errorAlarm} selectedMonitorName={selectedMonitorName} onClickRow={onClickRowChangePicData}
                    curTowHourName={curTowHourName} twoHoursReport={twoHoursReport} onSelectChangePicData={onSelectChangePicData}/>
            </div>
        );
    }
});

desView_tab1.propTypes = {
    monitorFilterStatus: PropTypes.string.isRequired,
    monitorTableData: PropTypes.array.isRequired,
    monitorTableSelectFirstFlag: PropTypes.bool.isRequired,
    monitorsStatus: PropTypes.array.isRequired,
    onClickDesViewMonitorTableRow: PropTypes.func.isRequired,
    onKeyUpDesViewMonitorTableQuickSearch: PropTypes.func.isRequired,
    onClickDesViewMonitorTableFilterStatus: PropTypes.func.isRequired,

    curTowHourValue: PropTypes.array.isRequired,
    funcValue: PropTypes.array.isRequired,
    logGood: PropTypes.string.isRequired,
    logError: PropTypes.string.isRequired,
    logDanger: PropTypes.string.isRequired,
    logBan: PropTypes.string.isRequired,
    goodAlarm: PropTypes.string.isRequired,
    warningAlarm: PropTypes.string.isRequired,
    errorAlarm: PropTypes.string.isRequired,
    selectedMonitorName: PropTypes.string.isRequired,
    onClickRowChangePicData: PropTypes.func.isRequired,
    curTowHourName: PropTypes.string.isRequired,
    twoHoursReport: PropTypes.array.isRequired,
    onSelectChangePicData: PropTypes.func.isRequired
};

module.exports = desView_tab1;
