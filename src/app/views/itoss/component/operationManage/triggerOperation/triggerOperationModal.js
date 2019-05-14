/**
* xuexue.yin  2016/01/26.
* 触发工单
*/
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactWidgets = require('react-widgets');
var History = require('react-router').History;

// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as operationActions from '../../../../../actions/operation_action'
import * as operationflowActions from '../../../../../actions/operationflow_action'

var TriggerTable = require('./triggerOperationModalTable.js');
var PersonModel = require('../createOperation/createOperationPersonnelModal.js');

var TriggerOperationModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTOperationStore","YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("YFTOperationStore").getState(),
    //         itoss_Device:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },
    componentDidMount: function() {
        var width = $(window).width();
        width = width - 100;
        $(".alarmEventWorkOrderModalDialog").css('width',width);
        $(".triggerOperationModalDialog").css('width',width);
    },

    _handleOnClickSave: function() {
        const { dispatch, curWorkFlowId, faultTypeId, faultSubTypeId, touchFaultSubId, flowLevel, serviceId, createOrderInfo } = this.props;
        // var that = this;
        var title = $("#triggerOperationOrderTitle").val();
        if(title == null || title == ""){
            title = "无主题";
            alert("请填写工单主题");
            return false;
        };
        // var curWorkFlowId = this.state.itoss.curWorkFlowId;
        if(curWorkFlowId == null || curWorkFlowId == ""){
            alert("请选择流程类型");
            return false;
        };
        var explain = $("#triggerOperationOrderExplain").val();
        if(explain == null || explain == ""){
            explain = "无描述";
        };
        var faultLarge = faultTypeId;
        if(faultLarge==null||faultLarge==""){
            alert("请选择故障大类");
            return false;
        };
        var faultSmall = faultSubTypeId;
        if(faultSmall==null||faultSmall==""){
            // var touchFaultSubId = that.state.itoss.touchFaultSubId;
            if(touchFaultSubId == null || touchFaultSubId == ""){
                alert("请选择故障细类");
                return false;
            }else{
                faultSmall = touchFaultSubId;
            };
        };
        var faultLevel = flowLevel;
        if(faultLevel==null||faultLevel==""){
            alert("请选择优先级");
            return false;
        };
        // var serviceId = this.state.itoss.serviceId;
        // if(serviceId==null||serviceId==""){
        //   alert("请选择服务级别协议名称");
        //   return false;
        // };
        var workOrderNumber = createOrderInfo.SERIALNUMBER;
        var data = {
            Subject:title,
            WorkOrderDesc:explain,
            FaultLarge:faultLarge,
            FaultSmall:faultSmall,
            FaultLevelId:faultLevel,
            Status:"cg",
            WorkOrderNumber:workOrderNumber,
            SerialNumber:workOrderNumber,
            CurrentHandle:localStorage.getItem("USERNAME"),
            SLAId:serviceId,
        };
        // this.getFlux().actions.YFTOperationActions.save_createOrder(data);
        dispatch(operationActions.save_createOrder(data));
        $("#triggerOperationModal").modal("hide");
    },
    _handleOnClickSaveAndAllocation: function() {
        const { dispatch, curWorkFlowId, faultTypeId, faultSubTypeId, touchFaultSubId, flowLevel, serviceId, createOrderInfo } = this.props;
        // var that = this;
        var title = $("#triggerOperationOrderTitle").val();
        if(title == null || title == ""){
            title = "无主题";
            alert("请填写工单主题");
            return false;
        };
        // var curWorkFlowId = this.state.itoss.curWorkFlowId;
        if(curWorkFlowId == null || curWorkFlowId == ""){
            alert("请选择流程类型");
            return false;
        };
        var explain = $("#triggerOperationOrderExplain").val();
        if(explain == null || explain == ""){
            explain = "无描述";
        };
        var faultLarge = faultTypeId;
        if(faultLarge==null||faultLarge==""){
            alert("请选择故障大类");
            return false;
        };
        var faultSmall = faultSubTypeId;
        if(faultSmall==null||faultSmall==""){
            // var touchFaultSubId = that.state.itoss.touchFaultSubId;
            if(touchFaultSubId == null || touchFaultSubId == ""){
                alert("请选择故障细类");
                return false;
            }else{
                faultSmall = touchFaultSubId;
            };
        };
        var faultLevel = flowLevel;
        if(faultLevel==null||faultLevel==""){
            alert("请选择优先级");
            return false;
        };
        //清除当前流转人员数据
        // this.getFlux().actions.YFTOperationFlowActions.set_CurrentNextPerson("");
        dispatch(operationflowActions.setCurrentNextPerson(""));
        var filter = [
            {key:"FROM_ID",value:localStorage.getItem("CURRENT_ROLENAME")},
            {key:"WORKFLOW_ID",value:curWorkFlowId},
            {key:"GROUP_ID",value:localStorage.getItem("GROUP_ID")}
        ];
        // this.getFlux().actions.YFTOperationFlowActions.get_WorkOrderNextPersonData(filter);
        dispatch(operationflowActions.get_WorkOrderNextPersonData(filter));
        // var serviceId = this.state.itoss.serviceId;
        // if(serviceId==null||serviceId==""){
        //   alert("请选择服务级别协议名称");
        //   return false;
        // };
        var workOrderNumber = createOrderInfo.SERIALNUMBER;
        var data = {
            Subject:title,
            WorkOrderDesc:explain,
            FaultLarge:faultLarge,
            FaultSmall:faultSmall,
            FaultLevelId:faultLevel,
            Status:"cg",
            WorkOrderNumber:workOrderNumber,
            SerialNumber:workOrderNumber,
            CurrentHandle:localStorage.getItem("USERNAME"),
            SLAId:serviceId,
        };
        // this.getFlux().actions.YFTOperationActions.save_createOrder2(data);
        dispatch(operationActions.save_createOrder2(data));
        $("#triggerOperationModal").modal("hide");
    },
    getFaultSubType: function(e){
        const { dispatch } = this.props;
        // console.log(e);
        var id = e.id;
        // this.getFlux().actions.YFTOperationActions.get_faultSubType(id);
        dispatch(operationActions.get_faultSubType(id));
        $("#triggerOperationFaultBigType").find(".rw-input").text(e.name);
        $("#triggerOperationFaultSubType").find(".rw-input").text("");
    },
    setFaultSubType: function(e){
        const { dispatch } = this.props;
        var id = e.id;
        // this.getFlux().actions.YFTOperationActions.set_faultSubType(id);
        dispatch(operationActions.setFaultSubTypeId(id));
        $("#triggerOperationFaultSubType").find(".rw-input").text(e.name);
    },
    getSla:function(e){
        const { dispatch, serviceData } = this.props;
        var id = e.id;
        var datas = serviceData;
        for(var i=0;i<datas.length;i++){
            var rid = datas[i].RecId;
            if(id == rid){
                // console.log(datas[i]);
                var responseTime = datas[i].ResponseTime;
                var solutionTime = datas[i].SolutionTime;
                $("#triggerOperationOrderResponse").val(responseTime);
                $("#triggerOperationOrderOver").val(solutionTime);
                $("#triggerOperationOrderSla").find(".rw-input").text(datas[i].Title);
                // this.getFlux().actions.YFTOperationActions.set_serviceName(id);
                dispatch(operationActions.setServiceId(id));
            };
        };
    },
    setFlowLevel: function(e){
        const { dispatch } = this.props;
        // this.getFlux().actions.YFTOperationActions.set_flowLevel(e);
        dispatch(operationActions.setFlowLevel(e));
        $("#triggerOperationOrderLevel").find(".rw-input").text(e);
    },
    setCurWorkFlowId:function(e){
        const { dispatch } = this.props;
        // this.getFlux().actions.YFTOperationActions.set_curWorkFlowType(e.RecId);
        dispatch(operationActions.set_curWorkFlowType(e.RecId));
        $("#triggerOperationFlowType").find(".rw-input").text(e.Name);
    },
    render : function(){
        const { dispatch, createOrderInfo, touchWorkOrderData, faultTypeId, faultSubTypeId, serviceId, curWorkOrderFlowId, faultTypes, allFaults,
                serviceData, workFlowTypes, touchFaultSubId, faultSubTypes, serviceName, assets, isBunder, flowPersonnelListData, flowActionListData,
                curWorkOrderId, curWorkOrderData } = this.props;
        var user = localStorage.getItem("localUserName");
        var info = createOrderInfo;
        var workIndex = "";var createUnit = "";var createCell = "";var createPhone = "";
        if(info!=null&&info!=""){
            workIndex = info.SERIALNUMBER;
            createUnit = info.DEPARTMENT;
            createCell = info.CELLPHONE;
            createPhone = info.DEPARTMENT;
        };
        var touchData = touchWorkOrderData;
        var wSubject = "";
        var wDesc = "";
        var wMdata = [];
        if(touchData!=null && touchData!=""){
            wSubject = touchData.subject;
            wDesc = touchData.desc;
            wMdata = touchData.monitorData;
        };
        var bigTypeid = faultTypeId;
        var smallId = faultSubTypeId;
        // var serviceId = this.state.itoss.serviceId;
        var flowId = curWorkOrderFlowId;
        var groups = faultTypes;
        // var allFaults = this.state.itoss.allFaults;
        var servicess = serviceData;
        var flowData = workFlowTypes;
        if(bigTypeid!= null && bigTypeid!= ""){
            for(var i=0;i<groups.length;i++){
                var id = groups[i].id;
                if(id == bigTypeid){
                    $("#triggerOperationFaultBigType").find(".rw-input").text(groups[i].name);
                };
            };
        };
        var that = this;
        if(smallId!= null && smallId!= ""){
            for(var i=0;i<allFaults.length;i++){
                var id = allFaults[i].RecId;
                if(id == smallId){
                    $("#triggerOperationFaultSubType").find(".rw-input").text(allFaults[i].FaultName);
                };
            };
        }else{
            // var touchFaultSubId = that.state.itoss.touchFaultSubId;
            if(touchFaultSubId!=null && touchFaultSubId!=""){
                for(var i=0;i<allFaults.length;i++){
                    var id = allFaults[i].RecId;
                    if(id == touchFaultSubId && bigTypeid == allFaults[i].ParentID){
                        $("#triggerOperationFaultSubType").find(".rw-input").text(allFaults[i].FaultName);
                    };
                };
            };
        };
        if(serviceId!= null && serviceId!= ""){
            for(var i=0;i<servicess.length;i++){
                var id = servicess[i].RecId;
                if(id == serviceId){
                    $("#triggerOperationOrderSla").find(".rw-input").text(servicess[i].Title);
                    $("#triggerOperationOrderResponse").val(servicess[i].ResponseTime);
                    $("#triggerOperationOrderOver").val(servicess[i].SolutionTime);
                };
            };
        };
        if(flowId!=null && flowId!=""){
            for(var i=0;i<flowData.length;i++){
                var id = flowData[i].RecId;
                if(id == flowId){
                    $("#triggerOperationFlowType").find(".rw-input").text(flowData[i].Name);
                };
            };
        };
        if(touchData!=null && touchData!="" && touchData.subject!=null && touchData.subject!=""){
            $("#triggerOperationOrderTitle").val(wSubject);
        };
        $("#triggerOperationOrderExplain").val(wDesc);
        return (
            <div>
              <div className="modal fade" id="triggerOperationModal" tabIndex="-1" role="dialog" aria-labelledby="triggerOperationModalLabel" aria-hidden="true">
                  <div className="modal-dialog triggerOperationModalDialog">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                              <h5 className="modal-title">工单详情</h5>
                          </div>
                          <div className="modal-body">
                            <div className="operationFormDiv">
                              <div className="col-md-12">
                                <table>
                                  <tbody>
                                    <tr>
                                      <th rowSpan="6" className="operationTableTitle">工单信息</th>
                                      <th>工单主题<span style={{"color":"#FF0000"}}>*</span></th>
                                      <td colSpan="5"><input type="text" className="form-control" id="triggerOperationOrderTitle"/></td>
                                    </tr>
                                    <tr>
                                      <th>工单流程类型<span style={{"color":"#FF0000"}}>*</span></th>
                                      <td colSpan="5"><ReactWidgets.DropdownList data={workFlowTypes} textField='Name' onSelect={this.setCurWorkFlowId} style={{"borderBottom":"1px solid #ddd"}} id="triggerOperationFlowType"/></td>
                                    </tr>
                                    <tr>
                                      <td colSpan="6"><textarea className="form-control orderExplain" placeholder="工单描述" rows="5" id="triggerOperationOrderExplain"></textarea></td>
                                    </tr>
                                    <tr>
                                      <th>故障大类<span style={{"color":"#FF0000"}}>*</span></th>
                                      <td className="rw-widget-td"><ReactWidgets.DropdownList data={faultTypes} textField='name' onSelect={this.getFaultSubType} id="triggerOperationFaultBigType"/></td>
                                      <th>故障细类<span style={{"color":"#FF0000"}}>*</span></th>
                                      <td className="rw-widget-td"><ReactWidgets.DropdownList data={faultSubTypes} textField='name' onSelect={this.setFaultSubType} id="triggerOperationFaultSubType"/></td>
                                      <th>工单号</th>
                                      <td><input type="text" className="form-control" id="triggerOperationOrderNumber" value={workIndex} disabled/></td>
                                    </tr>
                                    <tr>
                                      <th>创建人</th>
                                      <td><input type="text" className="form-control" id="triggerOperationOrderPerson" defaultValue={user} disabled/></td>
                                      <th>部门</th>
                                      <td><input type="text" className="form-control" id="triggerOperationOrderUnit" value={createUnit} disabled/></td>
                                      <th>手机</th>
                                      <td><input type="text" className="form-control" id="triggerOperationOrderMobile" value={createCell} disabled/></td>
                                    </tr>
                                    <tr>
                                      <th>固定电话</th>
                                      <td><input type="text" className="form-control" id="triggerOperationOrderPhone" value={createPhone} disabled/></td>
                                      <th>优先级<span style={{"color":"#FF0000"}}>*</span></th>
                                      <td className="rw-widget-td"><ReactWidgets.DropdownList data={["高","中","低"]} id="triggerOperationOrderLevel" textField='name' onSelect={this.setFlowLevel}/></td>
                                      <th>工单状态</th>
                                      <td><input type="text" className="form-control" id="triggerOperationOrderStatus" defaultValue="草稿" disabled/></td>
                                    </tr>
                                    <tr>
                                      <th rowSpan="2" className="operationTableTitle">服务级别协议</th>
                                      <th>服务级别协议名称</th>
                                      <td className="rw-widget-td"><ReactWidgets.DropdownList data={serviceName} id="triggerOperationOrderSla" textField='name' onSelect={this.getSla}/></td>
                                      <th>响应时间</th>
                                      <td><input type="text" className="form-control" id="triggerOperationOrderResponse" disabled/></td>
                                      <th>解决时间</th>
                                      <td><input type="text" className="form-control" id="triggerOperationOrderOver" disabled/></td>
                                    </tr>
                                    <tr>
                                      <th>延期截止时间</th>
                                      <td><input type="text" className="form-control" defaultValue="--" disabled/></td>
                                      <th>解决时长</th>
                                      <td><input type="text" className="form-control" defaultValue="--" disabled/></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="col-md-12" style={{"marginBottom":"20px"}}>
                                <TriggerTable data={wMdata} assets={assets} isBunder={isBunder} set_handleAssets={handleAssets=>dispatch(operationActions.setHandleAssetsId(handleAssets))}
                                    change_isBunder={isBunder=>dispatch(operationActions.setIsBunder(isBunder))} get_Assets={filter=>dispatch(operationActions.getAssets(filter))}/>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer" style={{"backgroundColor":"#fff","border":"none"}}>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" onClick={this._handleOnClickSaveAndAllocation}>保存并分配</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" onClick={this._handleOnClickSave}>仅保存</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                          </div>
                      </div>
                  </div>
              </div>
              <PersonModel flowPersonnelListData={flowPersonnelListData} flowActionListData={flowActionListData} curWorkOrderId={curWorkOrderId} curWorkOrderData={curWorkOrderData}
                  update_WorkOrderCommonStatusData={statusData=>dispatch(operationflowActions.update_WorkOrderCommonStatusData(statusData))} add_CreateWorkFlowLogData={flowData=>dispatch(operationflowActions.add_CreateWorkFlowLogData(flowData))}
                  set_WorkFlowSendEmail={emaildata=>dispatch(operationflowActions.set_WorkFlowSendEmail(emaildata))}/>
            </div>
        );
    }
});

// module.exports = TriggerOperationModal;
TriggerOperationModal.propTypes = {
	createOrderInfo: PropTypes.object,
    touchWorkOrderData: PropTypes.object,
    faultTypeId: PropTypes.string.isRequired,
    faultSubTypeId: PropTypes.string.isRequired,
    serviceId: PropTypes.string.isRequired,
    curWorkOrderFlowId: PropTypes.string.isRequired,
    faultTypes: PropTypes.array.isRequired,
    allFaults: PropTypes.array.isRequired,
    serviceData: PropTypes.array.isRequired,
    workFlowTypes: PropTypes.array.isRequired,
    touchFaultSubId: PropTypes.string.isRequired,
    faultSubTypes: PropTypes.array.isRequired,
    serviceName: PropTypes.array.isRequired,
    curWorkFlowId: PropTypes.string.isRequired,
    flowLevel: PropTypes.string.isRequired,
    assets: PropTypes.array.isRequired,
    isBunder: PropTypes.number.isRequired,
    flowPersonnelListData: PropTypes.array.isRequired,
	flowActionListData: PropTypes.array.isRequired,
	curWorkOrderId: PropTypes.string.isRequired,
	curWorkOrderData: PropTypes.object,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { createOrderInfo, touchWorkOrderData, faultTypeId, faultSubTypeId, serviceId, curWorkOrderFlowId, faultTypes, allFaults, serviceData,
            workFlowTypes, touchFaultSubId, faultSubTypes, serviceName, curWorkFlowId, flowLevel, assets, isBunder, curWorkOrderId, curWorkOrderData } = state.operationReducer
    const { flowPersonnelListData, flowActionListData } = state.operationFlowReducer

    return {
		createOrderInfo,
		touchWorkOrderData,
		faultTypeId,
		faultSubTypeId,
		serviceId,
		curWorkOrderFlowId,
		faultTypes,
		allFaults,
		serviceData,
		workFlowTypes,
		touchFaultSubId,
		faultSubTypes,
		serviceName,
        curWorkFlowId,
        flowLevel,
        assets,
        isBunder,
        flowPersonnelListData,
    	flowActionListData,
    	curWorkOrderId,
    	curWorkOrderData
    }
}

export default connect(mapStateToProps)(TriggerOperationModal)
