/**
 * Created by SHIN on 2016/1/22.
 * 告警事件列表
 */
var React = require('react');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
import { connect } from 'react-redux'
import * as deviceMonitorAction from '../../../../../actions/deviceMonitor_action'
import * as indexAction from '../../../../../actions/index_action'
import * as operationAction from '../../../../../actions/operation_action'
import * as operationFlowAction from '../../../../../actions/operationflow_action'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import AlarmList from './alarmList';
import AlarmEventView_desView from './alarmEventView_desView';
import AlarmEventDetailModal from'./alarmEventDetailModal';
import AlarmEventWorkOrderModal from './alarmEventWorkOrderModal';

var AlarmEventView = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },
    componentDidMount: function() {
        if(document.getElementById('alarmConfigView') != null) {
            document.getElementById('alarmConfigView').style.height = $(window).height() - 110 - 30 + 'px';
        }
        document.getElementById('alarmList_alarmEvent').className = 'list-group-item active';

        $(window).resize(function () {
            if(document.getElementById('alarmConfigView') != null) {
                document.getElementById('alarmConfigView').style.height = $(window).height() - 110 - 30 + 'px';
            }
        });
        var filter = [{key:"FROM", value:0}, {key:"TO", value:10}];
        const { dispatch } = this.props;
        dispatch(deviceMonitorAction.getAlarmEvent(filter));

        // var _this = this;
        // setTimeout(function () {
        //     _this.getFlux().actions.YFTDeviceMonitorActions.get_alarmEvent(filter);
        // }, 100);
    },
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    onGetAlarmIssued:function(){
      const { dispatch } = this.props;
      dispatch(deviceMonitorAction.getAlarmIssued());
    },
    onGetCityIndexData:function(){
      const { dispatch } = this.props;
      dispatch(indexAction.getCityIndexData());
    },
    onGetFaultType:function(){
      const { dispatch } = this.props;
      dispatch(operationAction.get_faultType());
    },
    onGetServiceName:function(){
      const { dispatch } = this.props;
      dispatch(operationAction.get_serviceName());
    },
    onGetWorkFlowTypes:function(){
      const { dispatch } = this.props;
      dispatch(operationAction.get_workFlowTypes());
    },
    render: function() {
      const { curThreeNode,preThreeNode } = this.props;
      const { dispatch } = this.props;
      return (
          <div id='alarmConfigView' className='overviewDiv'>
              <AlarmEventDetailModal
                alarmEventDetails={this.props.alarmEventDetails} selectedAlarmEvent={this.props.selectedAlarmEvent} alarmEventDetailModalOpenedFromPage={this.props.alarmEventDetailModalOpenedFromPage}
                alarmEventCurrentPage={this.props.alarmEventCurrentPage} alarmEventNumPerPage={this.props.alarmEventNumPerPage} alarmEventFilter={this.props.alarmEventFilter} cityIndexData={this.props.cityIndexData}
                isCreateWorkOrder={this.props.isCreateWorkOrder}
                updateAlarmEventStatus={dataObj => dispatch(deviceMonitorAction.updateAlarmEventStatus(dataObj))}
                getAlarmEvent={filter => dispatch(deviceMonitorAction.getAlarmEvent(filter))}
                initDetailData={param => dispatch(operationAction.init_detailData(param))}
                getFaultType={this.onGetFaultType}  getCityIndexData={this.onGetCityIndexData} getServiceName={this.onGetServiceName}
                getCreateOrderInfo={filter => dispatch(operationAction.get_createOrderInfo(filter))}
                getWorkFlowTypes={this.onGetWorkFlowTypes}
                setIsBunder={isBunder => dispatch(operationAction.setIsBunder(isBunder))}
                setWorkTheme={theme => dispatch(operationAction.setWorkTheme(theme))}
                setWorkDescription={description => dispatch(operationAction.setWorkDescription(description))}
                setTouchWorkOrderDataDesc={data => dispatch(operationAction.set_touchWorkOrderDataDesc(data))}
                get_workOrderUi={data => dispatch(operationAction.get_workOrderUi(data))}
                setAlarmEventPageCurrentFilter={filter => dispatch(deviceMonitorAction.setAlarmEventPageCurrentFilter(filter))}
              />
              <AlarmEventWorkOrderModal
                curWorkFlowId={this.props.curWorkFlowId} faultTypeId={this.props.faultTypeId} faultSubTypeId={this.props.faultSubTypeId} touchFaultSubId={this.props.touchFaultSubId}
                flowLevel={this.props.flowLevel} serviceId={this.props.serviceId} createOrderInfo={this.props.createOrderInfo} selectedAlarmEvent={this.props.selectedAlarmEvent}
                serviceData={this.props.serviceData} touchWorkOrderData={this.props.touchWorkOrderData} curWorkOrderFlowId={this.props.curWorkOrderFlowId} faultTypes={this.props.faultTypes}
                allFaults={this.props.allFaults} workFlowTypes={this.props.workFlowTypes} faultSubTypes={this.props.faultSubTypes} serviceName={this.props.serviceName}
                assets={this.props.assets} isBunder={this.props.isBunder}
                updateAlarmEventStatus={dataObj => dispatch(deviceMonitorAction.updateAlarmEventStatus(dataObj))}
                saveCreateOrder={data => dispatch(operationAction.save_createOrder(data))}
                saveCreateOrder2={data => dispatch(operationAction.save_createOrder2(data))}
                setCurrentNextPerson={person => dispatch(operationFlowAction.setCurrentNextPerson(person))}
                get_WorkOrderNextPersonData={filter => dispatch(operationFlowAction.get_WorkOrderNextPersonData(filter))}
                getFaultSubType={id => dispatch(operationAction.get_faultSubType(id))}
                setFaultSubTypeId={id => dispatch(operationAction.setFaultSubTypeId(id))}
                setServiceId={serviceId => dispatch(operationAction.setServiceId(serviceId))}
                setFlowLevel={flowLevel => dispatch(operationAction.setFlowLevel(flowLevel))}
                setCurWorkFlowType={data => dispatch(operationAction.set_curWorkFlowType(data))}
                setHandleAssetsId={data => dispatch(operationAction.setHandleAssetsId(data))}
                setIsBunder={isBunder => dispatch(operationAction.setIsBunder(isBunder))}
                getAssets={filter => dispatch(operationAction.getAssets(filter))}

                flowPersonnelListData={this.props.flowPersonnelListData} flowActionListData={this.props.flowActionListData}
                curWorkOrderId={this.props.curWorkOrderId} curWorkOrderData={this.props.curWorkOrderData}
                currentNextPerson={this.props.currentNextPerson}
                update_WorkOrderCommonStatusData={statusData=>dispatch(operationFlowAction.update_WorkOrderCommonStatusData(statusData))}
                add_CreateWorkFlowLogData={flowData=>dispatch(operationFlowAction.add_CreateWorkFlowLogData(flowData))}
                set_WorkFlowSendEmail={emaildata=>dispatch(operationFlowAction.set_WorkFlowSendEmail(emaildata))}
                setAlarmEventPageCurrentFilter={filter => dispatch(deviceMonitorAction.setAlarmEventPageCurrentFilter(filter))}
              />
              <div className='leftListDiv col-md-1'>
                  <AlarmList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName}
                  setCurName={data => dispatch(setCurName(data))} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                  onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}/>
              </div>
              <AlarmEventView_desView
                alarmEventData={this.props.alarmEventData} alarmEventCount={this.props.alarmEventCount} isCreateWorkOrder={this.props.isCreateWorkOrder}
                selectedAlarmEvent={this.props.selectedAlarmEvent}
                getAlarmIssued={this.onGetAlarmIssued}
                getAlarmEvent={filter => dispatch(deviceMonitorAction.getAlarmEvent(filter))}
                getAlarmDetails={filter => dispatch(deviceMonitorAction.getAlarmDetails(filter))}
                setAlarmEventData={alarmEventData => dispatch(deviceMonitorAction.setAlarmEventData(alarmEventData))}
                setAlarmEventCount={alarmEventCount => dispatch(deviceMonitorAction.setAlarmEventCount(alarmEventCount))}
                setSelectedAlarmEvent={selectedAlarmEvent => dispatch(deviceMonitorAction.setSelectedAlarmEvent(selectedAlarmEvent))}
                setAlarmEventCurrentPage={alarmEventCurrentPage => dispatch(deviceMonitorAction.setAlarmEventCurrentPage(alarmEventCurrentPage))}
                setAlarmEventNumPerPage={alarmEventNumPerPage => dispatch(deviceMonitorAction.setAlarmEventNumPerPage(alarmEventNumPerPage))}
                setAlarmEventFilter={alarmEventFilter => dispatch(deviceMonitorAction.setAlarmEventFilter(alarmEventFilter))}
                setAlarmEventDetailModalOpenedFromPage={AlarmEventDetailModalOpenedFromPage => dispatch(deviceMonitorAction.setAlarmEventDetailModalOpenedFromPage(AlarmEventDetailModalOpenedFromPage))}
                get_isCreateWorkOrder={gbcode => dispatch(deviceMonitorAction.get_isCreateWorkOrder(gbcode))}
                updateAlarmEventStatus={dataObj => dispatch(deviceMonitorAction.updateAlarmEventStatus(dataObj))}
                initDetailData={param => dispatch(operationAction.init_detailData(param))}
                getFaultType={this.onGetFaultType}  getCityIndexData={this.onGetCityIndexData} getServiceName={this.onGetServiceName}
                getCreateOrderInfo={filter => dispatch(operationAction.get_createOrderInfo(filter))}
                getWorkFlowTypes={this.onGetWorkFlowTypes}
                setIsBunder={isBunder => dispatch(operationAction.setIsBunder(isBunder))}
                get_workOrderUi={data => dispatch(operationAction.get_workOrderUi(data))}
                setWorkTheme={theme => dispatch(operationAction.setWorkTheme(theme))}
                setWorkDescription={description => dispatch(operationAction.setWorkDescription(description))}
                setTouchWorkOrderDataDesc={data => dispatch(operationAction.set_touchWorkOrderDataDesc(data))}
                setAlarmEventPageCurrentFilter={filter => dispatch(deviceMonitorAction.setAlarmEventPageCurrentFilter(filter))}
              />
          </div>
      );
    }
});

function mapAlarmEventState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { alarmEventData,alarmEventCount,isCreateWorkOrder,alarmEventDetails,selectedAlarmEvent,alarmEventDetailModalOpenedFromPage,
          alarmEventCurrentPage,alarmEventNumPerPage,alarmEventFilter } = state.deviceMonitorReducer
  const { cityIndexData } = state.indexReducer
  const { curWorkFlowId,faultTypeId,faultSubTypeId,touchFaultSubId,flowLevel,serviceId,createOrderInfo,serviceData,
          touchWorkOrderData,curWorkOrderFlowId,faultTypes,allFaults,workFlowTypes,faultSubTypes,serviceName,assets,isBunder,
          curWorkOrderId,curWorkOrderData
        } = state.operationReducer
  const { flowPersonnelListData,flowActionListData,currentNextPerson } = state.operationFlowReducer

  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    alarmEventData:alarmEventData,
    alarmEventCount:alarmEventCount,
    isCreateWorkOrder:isCreateWorkOrder,
    alarmEventDetails:alarmEventDetails,
    selectedAlarmEvent:selectedAlarmEvent,
    alarmEventDetailModalOpenedFromPage:alarmEventDetailModalOpenedFromPage,
    alarmEventCurrentPage:alarmEventCurrentPage,
    alarmEventNumPerPage:alarmEventNumPerPage,
    alarmEventFilter:alarmEventFilter,
    cityIndexData:cityIndexData,
    curWorkFlowId:curWorkFlowId,
    faultTypeId:faultTypeId,
    faultSubTypeId:faultSubTypeId,
    touchFaultSubId:touchFaultSubId,
    flowLevel:flowLevel,
    serviceId:serviceId,
    createOrderInfo:createOrderInfo,
    serviceData:serviceData,
    touchWorkOrderData:touchWorkOrderData,
    curWorkOrderFlowId:curWorkOrderFlowId,
    faultTypes:faultTypes,
    allFaults:allFaults,
    workFlowTypes:workFlowTypes,
    faultSubTypes:faultSubTypes,
    serviceName:serviceName,
    assets:assets,
    isBunder:isBunder,
    curWorkOrderId:curWorkOrderId,
    curWorkOrderData:curWorkOrderData,
    flowPersonnelListData:flowPersonnelListData,
    flowActionListData:flowActionListData,
    currentNextPerson:currentNextPerson
  }
}

export default connect(mapAlarmEventState)(AlarmEventView)
