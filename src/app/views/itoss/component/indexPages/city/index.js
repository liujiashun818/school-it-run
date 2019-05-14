/*
页面外框框架，市级首页
获取数据
*/
'use strict';
require('bootstrap');
import React from 'react'
// var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var CityIndexLine1 = require('./indexLine1.js');
var CityIndexLine2 = require('./indexLine2.js');
var CityIndexLine3 = require('./indexLine3.js');
var Store = require('../../../../../server/store');
import { connect } from 'react-redux'
import * as indexActions from '../../../../../actions/index_action'
import * as navActions from '../../../../../actions/navbar_action'
import * as deviceActions from '../../../../../actions/deviceMonitor_action'
import * as assetActions from '../../../../../actions/assetManage_action'
import * as operationActions from '../../../../../actions/operation_action'
import * as flowActions from '../../../../../actions/operationflow_action'
var AlarmEventDetailModal = require('../../equipmentManage/alarm/alarmEventDetailModal');
var AlarmEventWorkOrderModal = require('../../equipmentManage/alarm/alarmEventWorkOrderModal');

var cityIndex = React.createClass({
  mixins: [History],
  contextTypes: {
    params: React.PropTypes.object,
    location: React.PropTypes.object
  },
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },
  componentWillMount:function(){
    const { dispatch } = this.props;//var dispatch = this.props.dispatch;
    var params = this.context.params;
    if(params != null && params != ""){
      if (this.context.params.token && this.context.params.loginid) {
        console.log("跳转信息："+this.context.params.token +"   " +this.context.params.loginid);
        // this.getFlux().actions.NavbarActions.init_navbarData();//清除单菜单原有数据
        Store.set("showinfo",0);//设置是否弹出显示，认证过期或服务器连接失败窗口；0 可以显示 1 不显示
        Store.set("token",this.context.params.token);
        Store.set("localUserName",this.context.params.loginid);
        Store.set("CURRENT_ROLENAME",this.context.params.loginrole);

        var par = {
          host: window.location.host,//window.location.host  //yft.siteview.com
          loginid: this.context.params.loginid,
          loginrole: this.context.params.loginrole
        };
        // this.getFlux().actions.YFTIndexActions.get_userInfoByToken(par);
        dispatch(indexActions.get_userInfoByToken(par));
      }else{
        dispatch(indexActions.getCityIndexData());
      };
    }else{
      dispatch(indexActions.getCityIndexData());
    };
  },
  componentDidMount:function(){
    if($('#cityIndexDiv') != null) {
      var height = $(window).height() - 110 - 30 + 'px';
      $('#cityIndexDiv').css("height",height);
    }
    $("#tab-li-0-2").hide();
    $(window).resize(function () {
      if($('#cityIndexDiv') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
        $('#cityIndexDiv').css("height",height);
      }
    });
  },
  changePicSpan:function(e){
    e.preventDefault();
    $(".picToggleDiv").find("span").attr("class","normalSpan");
    $(e.target).attr("class","curSpan");
    var text = $(e.target).text();
    var type = "";
    switch (text) {
      case "摄像机":
        type = "VIDEOALARMRESULT";
        break;
      case "DVR":
        type = "DVRALARMRESULT";
        break;
      case "NVR":
        type = "NVRALARMRESULT";
        break;
      case "编码器":
        type = "CODERALARMRESULT";
        break;
      case "网络设备":
        type = "NETWORK";
        break;
    }
    $("#cityIndexChangePicTitle").text(text+"在线信息");
    // this.getFlux().actions.YFTIndexActions.change_cityIndexData(type);
    const { dispatch } = this.props;
    dispatch(indexActions.changeCityIndexData(type));
    this.setState({eqpName:text});
  },
  onGetCityIndexData:function(){
    const { dispatch } = this.props;
    dispatch(indexAction.getCityIndexData());
  },
  onGetFaultType:function(){
    const { dispatch } = this.props;
    dispatch(operationActions.get_faultType());
  },
  onGetServiceName:function(){
    const { dispatch } = this.props;
    dispatch(operationActions.get_serviceName());
  },
  onGetWorkFlowTypes:function(){
    const { dispatch } = this.props;
    dispatch(operationActions.get_workFlowTypes());
  },
  render:function(){
    // console.log(this.props.cityIndexData);
    const { dispatch } = this.props;
    var cityIndexData = this.props.cityIndexData;
    return (
      <div id='cityIndexDiv' className='overviewDesViewDiv'>
        <AlarmEventDetailModal
          alarmEventDetails={this.props.alarmEventDetails} selectedAlarmEvent={this.props.selectedAlarmEvent} alarmEventDetailModalOpenedFromPage={this.props.alarmEventDetailModalOpenedFromPage}
          alarmEventCurrentPage={this.props.alarmEventCurrentPage} alarmEventNumPerPage={this.props.alarmEventNumPerPage} alarmEventFilter={this.props.alarmEventFilter} cityIndexData={this.props.cityIndexData}
          isCreateWorkOrder={this.props.isCreateWorkOrder}
          updateAlarmEventStatus={dataObj => dispatch(deviceActions.updateAlarmEventStatus(dataObj))}
          getAlarmEvent={filter => dispatch(deviceActions.getAlarmEvent(filter))}
          initDetailData={param => dispatch(operationActions.init_detailData(param))}
          getFaultType={this.onGetFaultType}  getCityIndexData={this.onGetCityIndexData} getServiceName={this.onGetServiceName}
          getCreateOrderInfo={filter => dispatch(operationActions.get_createOrderInfo(filter))}
          getWorkFlowTypes={this.onGetWorkFlowTypes}
          setIsBunder={isBunder => dispatch(operationActions.setIsBunder(isBunder))}
          setWorkTheme={theme => dispatch(operationActions.setWorkTheme(theme))}
          setWorkDescription={description => dispatch(operationActions.setWorkDescription(description))}
          setTouchWorkOrderDataDesc={data => dispatch(operationActions.set_touchWorkOrderDataDesc(data))}
          get_workOrderUi={data => dispatch(operationActions.get_workOrderUi(data))}
          setAlarmEventPageCurrentFilter={filter => dispatch(deviceActions.setAlarmEventPageCurrentFilter(filter))}
        />
        <AlarmEventWorkOrderModal
          curWorkFlowId={this.props.curWorkFlowId} faultTypeId={this.props.faultTypeId} faultSubTypeId={this.props.faultSubTypeId} touchFaultSubId={this.props.touchFaultSubId}
          flowLevel={this.props.flowLevel} serviceId={this.props.serviceId} createOrderInfo={this.props.createOrderInfo} selectedAlarmEvent={this.props.selectedAlarmEvent}
          serviceData={this.props.serviceData} touchWorkOrderData={this.props.touchWorkOrderData} curWorkOrderFlowId={this.props.curWorkOrderFlowId} faultTypes={this.props.faultTypes}
          allFaults={this.props.allFaults} workFlowTypes={this.props.workFlowTypes} faultSubTypes={this.props.faultSubTypes} serviceName={this.props.serviceName}
          assets={this.props.assets} isBunder={this.props.isBunder}
          updateAlarmEventStatus={dataObj => dispatch(deviceActions.updateAlarmEventStatus(dataObj))}
          saveCreateOrder={data => dispatch(operationActions.save_createOrder(data))}
          saveCreateOrder2={data => dispatch(operationActions.save_createOrder2(data))}
          setCurrentNextPerson={person => dispatch(flowActions.setCurrentNextPerson(person))}
          get_WorkOrderNextPersonData={filter => dispatch(flowActions.get_WorkOrderNextPersonData(filter))}
          getFaultSubType={id => dispatch(operationActions.get_faultSubType(id))}
          setFaultSubTypeId={id => dispatch(operationActions.setFaultSubTypeId(id))}
          setServiceId={serviceId => dispatch(operationActions.setServiceId(serviceId))}
          setFlowLevel={flowLevel => dispatch(operationActions.setFlowLevel(flowLevel))}
          setCurWorkFlowType={data => dispatch(operationActions.set_curWorkFlowType(data))}
          setHandleAssetsId={data => dispatch(operationActions.setHandleAssetsId(data))}
          setIsBunder={isBunder => dispatch(operationActions.setIsBunder(isBunder))}
          getAssets={filter => dispatch(operationActions.getAssets(filter))}

          flowPersonnelListData={this.props.flowPersonnelListData} flowActionListData={this.props.flowActionListData}
          curWorkOrderId={this.props.curWorkOrderId} curWorkOrderData={this.props.curWorkOrderData}
          currentNextPerson={this.props.currentNextPerson}
          update_WorkOrderCommonStatusData={statusData=>dispatch(flowActions.update_WorkOrderCommonStatusData(statusData))}
          add_CreateWorkFlowLogData={flowData=>dispatch(flowActions.add_CreateWorkFlowLogData(flowData))}
          set_WorkFlowSendEmail={emaildata=>dispatch(flowActions.set_WorkFlowSendEmail(emaildata))}
          setAlarmEventPageCurrentFilter={filter => dispatch(deviceActions.setAlarmEventPageCurrentFilter(filter))}
        />
        <CityIndexLine1 data={cityIndexData} onChangeData={e => this.changePicSpan(e)}
          get_orderDetails={data => dispatch(operationActions.get_orderDetails(data))}
          setCurWorkFlowId={data => dispatch(flowActions.setCurWorkFlowId(data))}
          get_WorkFlowLogData={data => dispatch(flowActions.get_WorkFlowLogData(data))}
          get_WorkOrderProcessLogData={data => dispatch(flowActions.get_WorkOrderProcessLogData(data))}
          setCurrentNextPerson={data => dispatch(flowActions.setCurrentNextPerson(data))}
          setCurName={data => dispatch(navActions.setCurName(data))}
        />
        <CityIndexLine2 data={cityIndexData}/>
        <CityIndexLine3 data={cityIndexData}
          setMonitorTableSelectedRowData={data => dispatch(deviceActions.setMonitorTableSelectedRowData(data))}
          getAlarmDetails={data => dispatch(deviceActions.getAlarmDetails(data))}
          setSelectedAlarmEvent={data => dispatch(deviceActions.setSelectedAlarmEvent(data))}
          setAlarmEventDetailModalOpenedFromPage={data => dispatch(deviceActions.setAlarmEventDetailModalOpenedFromPage(data))}
          setCurName={data => dispatch(navActions.setCurName(data))}
        />
      </div>
    );
  }
});

// module.exports = cityIndex;
// cityIndex.propTypes = {
//   dispatch: PropTypes.func.isRequired
// }

function mapCityIndexState(state) {
  const { cityIndexData } = state.indexReducer
  const { curWorkFlowId,faultTypeId,faultSubTypeId,touchFaultSubId,flowLevel,serviceId,createOrderInfo,serviceData,
          touchWorkOrderData,curWorkOrderFlowId,faultTypes,allFaults,workFlowTypes,faultSubTypes,serviceName,assets,isBunder,
          curWorkOrderId,curWorkOrderData
        } = state.operationReducer
  const { isCreateWorkOrder,alarmEventDetails,selectedAlarmEvent,alarmEventDetailModalOpenedFromPage,
          alarmEventCurrentPage,alarmEventNumPerPage,alarmEventFilter } = state.deviceMonitorReducer

  return {
    cityIndexData:cityIndexData,
    curWorkFlowId,
    faultTypeId,
    faultSubTypeId,
    touchFaultSubId,
    flowLevel,
    serviceId,
    createOrderInfo,
    serviceData,
    touchWorkOrderData,
    curWorkOrderFlowId,
    faultTypes,
    allFaults,
    workFlowTypes,
    faultSubTypes,
    serviceName,
    assets,
    isBunder,
    curWorkOrderId,
    curWorkOrderData,
    isCreateWorkOrder,
    alarmEventDetails,
    selectedAlarmEvent,
    alarmEventDetailModalOpenedFromPage,
    alarmEventCurrentPage,
    alarmEventNumPerPage,
    alarmEventFilter
  }
}

export default connect(mapCityIndexState)(cityIndex)
