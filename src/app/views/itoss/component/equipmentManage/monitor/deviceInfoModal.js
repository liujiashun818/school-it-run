/*
* 资源监测-统一监控平台-设备信息
*/
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var base64 = require('../../../../../utils/base64');

var MonitorBasicInfoTab = require("./monitorBasicInfoTab");
var MonitorStatusTab = require("./monitorStatusTab");
var MonitorVideoLossTab = require("./monitorVideoLossTab");
var MonitorChannelInfoTab = require("./monitorChannelInfoTab");

var DeviceInfoModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore","YFTOperationStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //       itoss:flux.store("YFTOperationStore").getState(),
    //       itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    getInitialState: function() {
        return {
            // monitorName: ""
        };
    },

    componentDidMount: function() {
        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        var bShowTriggerWorkOrder = false;
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/equipmentmanage/monitor/trigger") {
                bShowTriggerWorkOrder = true;
            }
        }
        if(!bShowTriggerWorkOrder) {
            $("#triggerWorkOrderDiv").hide();
            $(".deviceInfoTouchDiv").hide();
        }
    },

    componentDidUpdate: function() {
        var _this = this;
        $('#deviceInfoModal').on('show.bs.modal', function () {
            if(_this.props.bShowVideoLossTab) {
                document.getElementById("tab_li_basicInfo").className = "";
                document.getElementById("tab_li_status").className = "";
                document.getElementById("tab_li_videoLoss").className = "active";
                document.getElementById("tab_li_channelInfo").className = "";

                document.getElementById("basicInfo_tab").className = "tab-pane subTabDiv";
                document.getElementById("status_tab").className = "tab-pane subTabDiv";
                document.getElementById("videoLoss_tab").className = "tab-pane active subTabDiv";
                document.getElementById("channelInfo_tab").className = "tab-pane subTabDiv";
            }
            else {
                document.getElementById("tab_li_basicInfo").className = "active";
                document.getElementById("tab_li_status").className = "";
                document.getElementById("tab_li_videoLoss").className = "";
                document.getElementById("tab_li_channelInfo").className = "";

                document.getElementById("basicInfo_tab").className = "tab-pane active subTabDiv";
                document.getElementById("status_tab").className = "tab-pane subTabDiv";
                document.getElementById("videoLoss_tab").className = "tab-pane subTabDiv";
                document.getElementById("channelInfo_tab").className = "tab-pane subTabDiv";
            }
        })
    },

    getMonitorName: function() {
        const { monitorType, monitorTableSelectedRowData } = this.props;
        if(monitorTableSelectedRowData != null) {
            switch (monitorType) {
                case "1":
                    // _this.setState({monitorName: _this.state.itoss_Monitor.MonitorTableSelectedRowData.VIDEONAME});
                    return monitorTableSelectedRowData.VIDEONAME;
                    break;
                case "2":
                case "3":
                case "4":
                case "5":
                    // _this.setState({monitorName: _this.state.itoss_Monitor.MonitorTableSelectedRowData.SERVERNAME});
                    return monitorTableSelectedRowData.SERVERNAME;
                    break;
            }
        }
    },

    // onTouchWorkOrder:function(){
    //     this.getFlux().actions.YFTDeviceMonitorActions.get_isCreateWorkOrder(this.state.itoss_Monitor.MonitorTableSelectedRowData.LAG);
    //     var status;
    //     switch (this.state.itoss_Monitor.MonitorType) {
    //         case "1":
    //             status = this.state.itoss_Monitor.MonitorTableSelectedRowData.ONLINESTATUS;
    //             break;
    //         case "2":
    //         case "3":
    //         case "4":
    //         case "5":
    //             status = this.state.itoss_Monitor.MonitorTableSelectedRowData.NETBREAK;
    //             break;
    //     }
    //     if(status == "1") {
    //         alert("设备正常，无需生成工单。");
    //     }
    //     else if(this.getFlux().store("YFTDeviceMonitorStore").getState().IsCreateWorkOrder == "0"){
    //       var data = this.state.itoss_Monitor.MonitorTableSelectedRowData;
    //       var type = this.state.itoss_Monitor.MonitorType;
    //       data.markType = type;
    //       // console.log(data);
    //       this.getFlux().actions.YFTOperationActions.init_detailData(0);
    //       this.getFlux().actions.YFTOperationActions.get_faultType();
    //       this.getFlux().actions.YFTOperationActions.get_serviceName();
    //       var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
    //       this.getFlux().actions.YFTOperationActions.get_createOrderInfo(param);
    //       this.getFlux().actions.YFTOperationActions.get_workFlowTypes();
    //       this.getFlux().actions.YFTOperationActions.change_isBunder(0);
    //       // console.log(this.state.itoss_Monitor.MonitorTableSelectedRowData);
    //       this.getFlux().actions.YFTOperationActions.set_touchWorkOrderData(data);
    //       $('#triggerOperationModal').modal('show');
    //       $("#triggerOperationFaultSubType").find(".rw-input").text("");
    //       $("#triggerOperationOrderResponse").val("");
    //       $("#triggerOperationOrderOver").val("");
    //       $("#triggerOperationOrderLevel").find(".rw-input").text("");
    //       $("#triggerOperationOrderSla").find(".rw-input").text("");
    //       $("#triggerOperationFlowType").find(".rw-input").text("");
    //     }
    //     else{
    //         setTimeout(function(){
    //           document.getElementById('publicMessageModelTitle').innerHTML = "提示";
    //           document.getElementById('publicMessageModalcontent').innerHTML = "已经存在工单。";
    //           $('#publicMessageModal').modal('show');
    //         },100);
    //     }
    //
    // },

    onOpenVideoModal: function() {
        const { monitorTableSelectedRowData, set_sipid } = this.props;
        set_sipid(monitorTableSelectedRowData.LAG);
        $('#videoLinkModal').modal('show');
    },

    onOpenImageModal: function() {
        const { monitorTableSelectedRowData, set_sipid } = this.props;
        set_sipid(monitorTableSelectedRowData.LAG);
        $('#imageLinkModal').modal('show');
    },

    render : function(){
        const { monitorType, onTouchWorkOrder, monitorTableSelectedRowData, groupAllColumnData, videoLossData, channelInfoData } = this.props;
        var typeName = "";
        switch (monitorType) {
            case "1":
                typeName = "摄像机";
                break;
            case "2":
                typeName = "DVR";
                break;
            case "3":
                typeName = "NVR";
                break;
            case "4":
                typeName = "编码器";
                break;
            case "5":
                typeName = "IPSAN";
                break;
        }
        return (
            <div className="modal fade" id="deviceInfoModal" tabIndex="-1" role="dialog" aria-labelledby="deviceInfoModalLabel" aria-hidden="true">
                <div className="modal-dialog deviceInfoModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">{typeName}属性</h5>
                        </div>
                        <div className="modal-body" style={{height:monitorType=="1"?"540px":"420px"}}>
                            <div className='col-md-6 marginBottom_10'>
                                <div className="boldFontStyle">{this.getMonitorName()}</div>
                            </div>
                            <div className='col-md-6 marginBottom_10 deviceInfoTouchDiv'>
                              <button onClick={onTouchWorkOrder}>触发工单</button>
                              <button onClick={this.onOpenVideoModal} style={{display:monitorType=="1"?"block":"none"}}>查看视频</button>
                              <button onClick={this.onOpenImageModal} style={{display:monitorType=="1"?"block":"none"}}>查看图片</button>
                            </div>
                            <div className="tabbable tabDiv">
                                <ul className="nav nav-tabs">
                                    <li id="tab_li_basicInfo" className="active"><a href="#basicInfo_tab" data-toggle="tab">{typeName}基础信息</a></li>
                                    <li id="tab_li_status"><a href="#status_tab" data-toggle="tab">{typeName}状态</a></li>
                                    <li id="tab_li_videoLoss"><a href="#videoLoss_tab" data-toggle="tab" style={{display:monitorType=="1"?"block":"none"}}>录像丢失</a></li>
                                    <li id="tab_li_channelInfo"><a href="#channelInfo_tab" data-toggle="tab" style={{display:monitorType=="1"?"none":"block"}}>{typeName}通道信息</a></li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active subTabDiv" id="basicInfo_tab">
                                        <MonitorBasicInfoTab monitorType={monitorType} monitorTableSelectedRowData={monitorTableSelectedRowData}/>
                                    </div>
                                    <div className="tab-pane subTabDiv" id="status_tab">
                                        <MonitorStatusTab monitorType={monitorType} monitorTableSelectedRowData={monitorTableSelectedRowData} groupAllColumnData={groupAllColumnData}/>
                                    </div>
                                    <div className="tab-pane subTabDiv" id="videoLoss_tab">
                                        <MonitorVideoLossTab videoLossData={videoLossData}/>
                                    </div>
                                    <div className="tab-pane subTabDiv" id="channelInfo_tab">
                                        <MonitorChannelInfoTab channelInfoData={channelInfoData}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

DeviceInfoModal.propTypes = {
	monitorType: PropTypes.string.isRequired,
	monitorTableSelectedRowData: PropTypes.object,
	bShowVideoLossTab: PropTypes.bool.isRequired,
    groupAllColumnData: PropTypes.array.isRequired,
    videoLossData: PropTypes.array.isRequired,
    channelInfoData: PropTypes.array.isRequired,
	set_sipid: PropTypes.func.isRequired,
	onTouchWorkOrder: PropTypes.func.isRequired
}

module.exports = DeviceInfoModal;
