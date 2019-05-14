/*
* 资源监测-统一监控平台-组信息页面-单元格组件
*/
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var ReactWidgets = require('react-widgets');
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var StatusGrid = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    componentDidUpdate: function() {
        const { getTearmListDataType, pieChartMonitorType } = this.props;
        // if(!this.props.data.hasOwnProperty('type') && this.state.itoss_Monitor.GetTearmListDataType != 2) {
        //     switch (this.state.itoss_Monitor.PieChartMonitorType) {
        if(!this.props.data.hasOwnProperty('type') && getTearmListDataType != 2) {
            switch (pieChartMonitorType) {
                case "1":
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = true;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = false;
                    break;
                case "2":
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = true;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = false;
                    break;
                case "3":
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = true;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = false;
                    break;
                case "4":
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = true;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = false;
                    break;
                case "5":
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = true;
                    break;
                default:
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = false;
                    break;
            }
        }
    },

    componentDidMount: function() {
        const { pieChartMonitorType } = this.props;
        if(!this.props.data.hasOwnProperty('type')) {
            // switch (this.state.itoss_Monitor.PieChartMonitorType) {
            switch (pieChartMonitorType) {
                case "1":
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = true;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = false;
                    break;
                case "2":
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = true;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = false;
                    break;
                case "3":
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = true;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = false;
                    break;
                case "4":
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = true;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = false;
                    break;
                case "5":
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = true;
                    break;
                default:
                    document.getElementById("radio_monitorType_camera_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_DVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_NVR_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_encoder_"+this.props.data.GROUPID).checked = false;
                    document.getElementById("radio_monitorType_IPSAN_"+this.props.data.GROUPID).checked = false;
                    break;
            }
        }
    },

    // _handleClickGroupName: function(e) {
    //     // var _this = this;
    //     // setTimeout(function () {
    //         var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
    //         var filter = [{key:"GROUPID",value:this.props.data.GROUPID},{key:"TYPE",value:this.getFlux().store("YFTDeviceMonitorStore").getState().PieChartMonitorType}];
    //         yftDeviceMonitorAction.set_GetTearmListDataType(0);
    //         yftDeviceMonitorAction.get_TearmListData(filter);
    //         yftDeviceMonitorAction.set_MonitorGroupId(this.props.data.GROUPID);
    //         yftDeviceMonitorAction.set_MonitorName(this.props.data.GROUPNAME);
    //         //yftDeviceMonitorAction.set_StatisticalView();
    //         yftDeviceMonitorAction.set_MonitorView(1);
    //     // }, 100);
    //
    //     var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
    //     var nodes = treeObj.transformToArray(treeObj.getNodes());
    //     for (var i = 0; i < nodes.length; i++) {
    //         if(nodes[i].id == this.props.data.GROUPID) {
    //             treeObj.selectNode(nodes[i]);
    //             this.state.itoss_Monitor.MonitorTree2.setState({curNode:nodes[i]});
    //             break;
    //         }
    //     }
    // },
    //
    // _handleClickMonitorName: function(e) {
    //     // var _this = this;
    //     // setTimeout(function () {
    //         var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
    //         var filter = [{key:"GROUPID",value:this.props.data.GROUPID}, {key:"NAME",value:this.props.data.GROUPNAME.substring(0, this.props.data.GROUPNAME.indexOf("("))}, {key:"TYPE",value:this.props.data.type}];
    //         yftDeviceMonitorAction.set_monitorTableFilter(filter.slice(0));
    //         // filter.push({key:"FROM", value:0});
    //         // filter.push({key:"TO", value:20});
    //         // yftDeviceMonitorAction.get_GroupListData(filter);
    //         yftDeviceMonitorAction.set_MonitorGroupId(this.props.data.GROUPID);
    //         yftDeviceMonitorAction.set_monitorTableCurrentPage(1);
    //         yftDeviceMonitorAction.set_monitorTableNumPerPage(20);
    //         yftDeviceMonitorAction.set_MonitorFilterStatus("all");
    //         var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
    //         var nodes = treeObj.transformToArray(treeObj.getNodes());
    //         for(var i = 0; i < nodes.length; i++) {
    //             if(nodes[i].id == this.props.data.GROUPID) {
    //                 treeObj.selectNode(nodes[i]);
    //                 this.state.itoss_Monitor.MonitorTree2.setState({curNode:nodes[i]});
    //                 for(var j = 0; j < nodes.length; j++) {
    //                     if(nodes[j].id == nodes[i].pid) {
    //                         yftDeviceMonitorAction.set_MonitorName(nodes[j].name.substring(0, nodes[j].name.indexOf("(")) + "-" + nodes[i].name);
    //                         yftDeviceMonitorAction.set_SearchAreaData(nodes[j]);
    //                         yftDeviceMonitorAction.set_SettingSearchAreaData(nodes[j]);
    //                         break;
    //                     }
    //                 }
    //                 break;
    //             }
    //         }
    //         yftDeviceMonitorAction.set_MonitorView(2);
    //     // }, 100);
    // },
    //
    // _handleClickRadio: function(e) {
    //     var _this = this;
    //     // setTimeout(function () {
    //         var yftDeviceMonitorAction = _this.getFlux().actions.YFTDeviceMonitorActions;
    //         var filter = [{key:"GROUPID",value:e.currentTarget.id.substr(e.currentTarget.id.lastIndexOf("_")+1)},{key:"TYPE",value:e.currentTarget.value}];
    //         yftDeviceMonitorAction.set_GetTearmListDataType(2);
    //         yftDeviceMonitorAction.set_StatusGridMonitorGroupId(e.currentTarget.id.substr(e.currentTarget.id.lastIndexOf("_")+1));
    //         yftDeviceMonitorAction.get_TearmListData(filter);
    //     // }, 100);
    // },

    render: function() {
        const { onClickGroupName, onClickMonitorName, onClickRadio} = this.props;
        if(this.props.data.hasOwnProperty('type')) {
            return (
                <div className='col-md-6'>
                    <div className='row statusGrid'>
                        <div className='col-md-12 gridHeader'><a id={"group_"+this.props.data.GROUPID} href="javascript:void(0)" onClick={e => onClickMonitorName(e, this.props.data)}>{this.props.data.GROUPNAME}</a></div>
                        <div className='col-md-4 gridContent'/>
                        <div className='col-md-8'>
                            <div className='col-md-12 gridContent'>
                                <img src="img/itoss/Good.png"></img> 完好数：{parseInt(this.props.data.good)}
                            </div>
                            <div className='col-md-12 gridContent'>
                                <img src="img/itoss/Error.png"></img> 离线数：{parseInt(this.props.data.error)}
                            </div>
                            <div className='col-md-12 gridContent'>
                                <img src="img/itoss/Warning.png"></img> 异常数：{parseInt(this.props.data.warning)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className='col-md-6'>
                    <div className='row statusGrid'>
                        <div className='col-md-12 gridHeader'><a id={"group_"+this.props.data.GROUPID} href="javascript:void(0)" onClick={e => onClickGroupName(e, this.props.data)}>{this.props.data.GROUPNAME}</a></div>
                        <div className='col-md-4 gridContent'/>
                        <div className='col-md-8'>
                            <div className='col-md-12 gridContent'>
                                <img src="img/itoss/Good.png"></img> 完好数：{parseInt(this.props.data.good)}
                            </div>
                            <div className='col-md-12 gridContent'>
                                <img src="img/itoss/Error.png"></img> 离线数：{parseInt(this.props.data.error)}
                            </div>
                            <div className='col-md-12 gridContent'>
                                <img src="img/itoss/Warning.png"></img> 异常数：{parseInt(this.props.data.warning)}
                            </div>
                        </div>
                        <div className='col-md-12 gridTail'>
                            <div className="radio radioDiv">
                                <label className='searchFontStyle'>
                                    <input type="radio" id={"radio_monitorType_camera_"+this.props.data.GROUPID} name={"radio_monitorType"+this.props.data.GROUPID} value="1" defaultChecked={true} onClick={onClickRadio}/>摄像机
                                </label>
                            </div>
                            <div className="radio radioDiv">
                                <label className='searchFontStyle'>
                                    <input type="radio" id={"radio_monitorType_DVR_"+this.props.data.GROUPID} name={"radio_monitorType"+this.props.data.GROUPID} value="2" defaultChecked={false} onClick={onClickRadio}/>DVR
                                </label>
                            </div>
                            <div className="radio radioDiv">
                                <label className='searchFontStyle'>
                                    <input type="radio" id={"radio_monitorType_NVR_"+this.props.data.GROUPID} name={"radio_monitorType"+this.props.data.GROUPID} value="3" defaultChecked={false} onClick={onClickRadio}/>NVR
                                </label>
                            </div>
                            <div className="radio radioDiv">
                                <label className='searchFontStyle'>
                                    <input type="radio" id={"radio_monitorType_encoder_"+this.props.data.GROUPID} name={"radio_monitorType"+this.props.data.GROUPID} value="4" defaultChecked={false} onClick={onClickRadio}/>编码器
                                </label>
                            </div>
                            <div className="radio radioDiv">
                                <label className='searchFontStyle'>
                                    <input type="radio" id={"radio_monitorType_IPSAN_"+this.props.data.GROUPID} name={"radio_monitorType"+this.props.data.GROUPID} value="5" defaultChecked={false} onClick={onClickRadio}/>IPSAN
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
});

var StatusGridView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    componentDidMount: function() {
        const { pieChartMonitorType, tearmSubMAPData, tearmMAPData_monitorTypeRadio } = this.props;
        if(document.getElementById('statusGridView') != null) {
            document.getElementById('statusGridView').style.height = $(window).height() - 110 - 50 - 60 + 'px';
        }

        // if(this.getFlux().store("YFTDeviceMonitorStore").getState().TearmMAPData_monitorTypeRadio.length > 0 && !this.getFlux().store("YFTDeviceMonitorStore").getState().TearmMAPData_monitorTypeRadio[0].hasOwnProperty('type')) {
        if(tearmMAPData_monitorTypeRadio.length > 0 && !tearmMAPData_monitorTypeRadio[0].hasOwnProperty('type')) {
            // var itoss_Monitor = this.getFlux().store("YFTDeviceMonitorStore").getState();
            // switch (itoss_Monitor.PieChartMonitorType) {
            switch (pieChartMonitorType) {
                case "1":
                    for (var i = 0; i < tearmSubMAPData.length; i++) {
                        document.getElementById('radio_monitorType_camera_'+tearmSubMAPData[i].GROUPID).checked = true;
                    }
                    break;
                case "2":
                    for (var i = 0; i < tearmSubMAPData.length; i++) {
                        document.getElementById('radio_monitorType_DVR_'+tearmSubMAPData[i].GROUPID).checked = true;
                    }
                    break;
                case "3":
                    for (var i = 0; i < tearmSubMAPData.length; i++) {
                        document.getElementById('radio_monitorType_NVR_'+tearmSubMAPData[i].GROUPID).checked = true;
                    }
                    break;
                case "4":
                    for (var i = 0; i < tearmSubMAPData.length; i++) {
                        document.getElementById('radio_monitorType_encoder_'+tearmSubMAPData[i].GROUPID).checked = true;
                    }
                    break;
                case "5":
                    for (var i = 0; i < tearmSubMAPData.length; i++) {
                        document.getElementById('radio_monitorType_IPSAN_'+tearmSubMAPData[i].GROUPID).checked = true;
                    }
                    break;
                default:
                    for (var i = 0; i < tearmSubMAPData.length; i++) {
                        document.getElementById('radio_monitorType_camera_'+tearmSubMAPData[i].GROUPID).checked = true;
                    }
                    break;
            }
        }
    },

    render: function() {
        const { getTearmListDataType, pieChartMonitorType, tearmMAPData_monitorTypeRadio, onClickGroupName, onClickMonitorName, onClickRadio } = this.props;
        return (
            <div id="statusGridView" className='col-md-6 statusGridView'>
                {tearmMAPData_monitorTypeRadio.map(function(data) {
                    return <StatusGrid data={data} getTearmListDataType={getTearmListDataType} pieChartMonitorType={pieChartMonitorType}
                                onClickGroupName={onClickGroupName} onClickMonitorName={onClickMonitorName} onClickRadio={onClickRadio}/>;
                })}
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('statusGridView') != null) {
        document.getElementById('statusGridView').style.height = $(window).height() - 110 - 50 -60 + 'px';
    }
});

StatusGridView.propTypes = {
  getTearmListDataType: PropTypes.number.isRequired,
  pieChartMonitorType: PropTypes.string.isRequired,
  tearmSubMAPData: PropTypes.array.isRequired,
  tearmMAPData_monitorTypeRadio: PropTypes.array.isRequired,
  onClickGroupName: PropTypes.func.isRequired,
  onClickMonitorName: PropTypes.func.isRequired,
  onClickRadio: PropTypes.func.isRequired
};

module.exports = StatusGridView;
