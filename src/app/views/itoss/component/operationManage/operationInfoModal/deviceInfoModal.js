/**
* 工单管理-工单-资产信息弹出窗口
*/

import React from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

import { connect } from 'react-redux'
import * as deviceMonitorAction from '../../../../../actions/deviceMonitor_action'

var base64 = require('../../../../../utils/base64');

var MonitorBasicInfoTab = require("./monitorBasicInfoTab");
var MonitorStatusTab = require("./monitorStatusTab");
var MonitorVideoLossTab = require("./monitorVideoLossTab");
var MonitorChannelInfoTab = require("./monitorChannelInfoTab");

var DeviceInfoModal = React.createClass({
    mixins: [History],
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            monitorName: ""
        };
    },
    componentDidMount: function() {
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
            switch (_this.props.monitorType) {
                case "1":
                    _this.setState({monitorName: _this.props.monitorTableSelectedRowData.VIDEONAME});
                    break;
                case "2":
                case "3":
                case "4":
                case "5":
                    _this.setState({monitorName: _this.props.monitorTableSelectedRowData.SERVERNAME});
                    break;
            }
        })
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
    render : function(){
        var typeName = "";
        // console.log(this.state.itoss_Monitor);
        switch (this.props.monitorType) {
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
                        <div className="modal-body">
                            <div className='marginBottom_10'>
                                <div className="boldFontStyle">{this.state.monitorName}</div>
                            </div>
                            <div className="tabbable tabDiv">
                                <ul className="nav nav-tabs">
                                    <li id="tab_li_basicInfo" className="active"><a href="#basicInfo_tab" data-toggle="tab">{typeName}基础信息</a></li>
                                    <li id="tab_li_status"><a href="#status_tab" data-toggle="tab">{typeName}状态</a></li>
                                    <li id="tab_li_videoLoss"><a href="#videoLoss_tab" data-toggle="tab" style={{display:this.props.monitorType=="1"?"block":"none"}}>录像丢失</a></li>
                                    <li id="tab_li_channelInfo"><a href="#channelInfo_tab" data-toggle="tab" style={{display:this.props.monitorType=="1"?"none":"block"}}>{typeName}通道信息</a></li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active subTabDiv" id="basicInfo_tab">
                                        <MonitorBasicInfoTab monitorType={this.props.monitorType} monitorTableSelectedRowData={this.props.monitorTableSelectedRowData}/>
                                    </div>
                                    <div className="tab-pane subTabDiv" id="status_tab">
                                        <MonitorStatusTab monitorType={this.props.monitorType} monitorTableSelectedRowData={this.props.monitorTableSelectedRowData}/>
                                    </div>
                                    <div className="tab-pane subTabDiv" id="videoLoss_tab">
                                        <MonitorVideoLossTab videoLossData={this.props.videoLossData}/>
                                    </div>
                                    <div className="tab-pane subTabDiv" id="channelInfo_tab">
                                        <MonitorChannelInfoTab channelInfoData={this.props.channelInfoData}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

function mapResourceState(state) {
  const {bShowVideoLossTab,monitorType,monitorTableSelectedRowData,channelInfoData,videoLossData } = state.deviceMonitorReducer
  return {
    bShowVideoLossTab:bShowVideoLossTab,
    monitorType:monitorType,
    monitorTableSelectedRowData:monitorTableSelectedRowData,
    channelInfoData:channelInfoData,
    videoLossData
  }
}

export default connect(mapResourceState)(DeviceInfoModal)
