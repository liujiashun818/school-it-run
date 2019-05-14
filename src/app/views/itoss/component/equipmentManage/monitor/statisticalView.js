/*
* 资源监测-统一监控平台-组信息页面
*/
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var PieChartView = require('./pieChartView');
var StatusGridView = require('./statusGridView');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
// import {
//     setGetTearmListDataType, getTearmListData, setPieChartMonitorType, setSelectedTearmEquipmentNameData, setMonitorGroupId, setMonitorName,
//     setMonitorView, setMonitorTableCurrentPage, setMonitorTableNumPerPage, setMonitorFilterStatus, setSearchAreaData, setSettingSearchAreaData,
//     setStatusGridMonitorGroupId, setMonitorTableFilter
// } from '../../../../../actions/deviceMonitor_action'
import * as deviceMonitorActions from '../../../../../actions/deviceMonitor_action'
import { getGroupAllData } from '../../../../../actions/equipment_action'

var StatisticalView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore","YFTDeviceMonitorTreePageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    componentDidMount: function() {
        if(document.getElementById('monitorStatisticalView') != null) {
            document.getElementById('monitorStatisticalView').style.height = $(window).height() - 110 - 30 + 'px';
        }

        // var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        // var nodes = treeObj.transformToArray(treeObj.getNodes());
        // for(var i = 0; i < nodes.length; i++) {
        //     // if(nodes[i].id == this.getFlux().store("YFTDeviceMonitorStore").getState().MonitorGroupId) {
        //     if(nodes[i].id == this.props.monitorGroupId) {
        //         var bHasParent = false;
        //         for(var j = 0; j < nodes.length; j++) {
        //             if(nodes[j].id == nodes[i].pid) {
        //                 bHasParent = true;
        //                 document.getElementById("statisticalView_GoBack").style.display = "inline-block";
        //                 break;
        //             }
        //         }
        //         if(!bHasParent) {
        //             document.getElementById("statisticalView_GoBack").style.display = "none";
        //         }
        //         break;
        //     }
        // }
    },

    componentDidUpdate: function() {
        const { monitorGroupId } = this.props;
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var i = 0; i < nodes.length; i++) {
            // if(nodes[i].id == this.getFlux().store("YFTDeviceMonitorStore").getState().MonitorGroupId) {
            if(nodes[i].id == monitorGroupId) {
                var bHasParent = false;
                for(var j = 0; j < nodes.length; j++) {
                    if(nodes[j].id == nodes[i].pid) {
                        bHasParent = true;
                        document.getElementById("statisticalView_GoBack").style.display = "inline-block";
                        break;
                    }
                }
                if(!bHasParent) {
                    document.getElementById("statisticalView_GoBack").style.display = "none";
                }
                break;
            }
        }
    },

    _handleOnClickGoBack: function() {
        const { dispatch, monitorGroupId, pieChartMonitorType, monitorTree2 } = this.props;
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var i = 0; i < nodes.length; i++) {
            // if(nodes[i].id == this.getFlux().store("YFTDeviceMonitorStore").getState().MonitorGroupId) {
            if(nodes[i].id == monitorGroupId) {
                for(var j = 0; j < nodes.length; j++) {
                    if(nodes[j].id == nodes[i].pid) {
                        treeObj.selectNode(nodes[j]);
                        // this.state.itoss_Monitor.MonitorTree2.setState({curNode:nodes[j]});
                        monitorTree2.setState({curNode:nodes[j]});
                        if(nodes[j].type=="organize" || nodes[j].type=="other") {
                            var filter = [{key:"GROUPID",value:nodes[j].id},{key:"TYPE",value:pieChartMonitorType}];
                            // this.getFlux().actions.YFTDeviceMonitorActions.set_monitorParam_3({getTearmListDataType: 0, groupId: nodes[j].id, monitorName: nodes[j].name, monitorView: 1});
                            // this.getFlux().actions.YFTDeviceMonitorActions.get_TearmListData(filter);
                            dispatch(deviceMonitorActions.setGetTearmListDataType(0));
                            dispatch(deviceMonitorActions.setMonitorGroupId(nodes[j].id));
                            dispatch(deviceMonitorActions.setMonitorName(nodes[j].name));
                            dispatch(deviceMonitorActions.setMonitorView(1));
                            dispatch(deviceMonitorActions.getTearmListData(filter));
                        }
                        else if(nodes[j].type=="group") {
                            // this.getFlux().actions.YFTEquipmentActions.get_GroupAllData(nodes[j].id);
                            // this.getFlux().actions.YFTDeviceMonitorActions.set_monitorParam_4({monitorName: nodes[j].name, monitorView: 3});
                            dispatch(getGroupAllData(nodes[j].id));
                            dispatch(deviceMonitorActions.setMonitorName(nodes[j].name));
                            dispatch(deviceMonitorActions.setMonitorView(3));
                        }
                        break;
                    }
                }
                break;
            }
        }
    },

    handlePieChartOnClickRadio: function(e) {
        const { dispatch, monitorGroupId } = this.props;
        // var _this = this;
        // setTimeout(function () {
            // var yftDeviceMonitorAction = _this.getFlux().actions.YFTDeviceMonitorActions;
            // var filter = [{key:"GROUPID",value:_this.state.itoss_Monitor.MonitorGroupId},{key:"TYPE",value:e.target.value}];
            // yftDeviceMonitorAction.set_GetTearmListDataType(1);
            // yftDeviceMonitorAction.get_TearmListData(filter);
            // yftDeviceMonitorAction.set_PieChartMonitorType(e.target.value);
            // yftDeviceMonitorAction.set_SelectedTearmEquipmentNameData({RecId:"0", name:""});
            var filter = [{key:"GROUPID",value:monitorGroupId},{key:"TYPE",value:e.target.value}];
            dispatch(deviceMonitorActions.setGetTearmListDataType(1));
            dispatch(deviceMonitorActions.getTearmListData(filter));
            dispatch(deviceMonitorActions.setPieChartMonitorType(e.target.value));
            dispatch(deviceMonitorActions.setSelectedTearmEquipmentNameData({RecId:"0", name:""}));
        // }, 100);
    },

    handlePieChartOnSelectType: function(e) {
        const { dispatch } = this.props;
        // console.log(e.RecId);
        // var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
        // yftDeviceMonitorAction.set_PieChartMonitorType(e.RecId);
        // yftDeviceMonitorAction.set_SelectedTearmEquipmentNameData(e);
        dispatch(deviceMonitorActions.setPieChartMonitorType(e.RecId));
        dispatch(deviceMonitorActions.setSelectedTearmEquipmentNameData(e));
        document.getElementById('radio_pieChart_monitorType_camera').checked = false;
        document.getElementById('radio_pieChart_monitorType_DVR').checked = false;
        document.getElementById('radio_pieChart_monitorType_NVR').checked = false;
        document.getElementById('radio_pieChart_monitorType_encoder').checked = false;
        document.getElementById('radio_pieChart_monitorType_IPSAN').checked = false;
    },

    handleStatusGridOnClickGroupName: function(e, data) {
        const { dispatch, monitorTree2, pieChartMonitorType } = this.props;
        // var _this = this;
        // setTimeout(function () {
            // var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
            // var filter = [{key:"GROUPID",value:this.props.data.GROUPID},{key:"TYPE",value:this.getFlux().store("YFTDeviceMonitorStore").getState().PieChartMonitorType}];
            // yftDeviceMonitorAction.set_GetTearmListDataType(0);
            // yftDeviceMonitorAction.get_TearmListData(filter);
            // yftDeviceMonitorAction.set_MonitorGroupId(this.props.data.GROUPID);
            // yftDeviceMonitorAction.set_MonitorName(this.props.data.GROUPNAME);
            // yftDeviceMonitorAction.set_MonitorView(1);
            var filter = [{key:"GROUPID",value:data.GROUPID},{key:"TYPE",value:pieChartMonitorType}];
            dispatch(deviceMonitorActions.setGetTearmListDataType(0));
            dispatch(deviceMonitorActions.getTearmListData(filter));
            dispatch(deviceMonitorActions.setMonitorGroupId(data.GROUPID));
            dispatch(deviceMonitorActions.setMonitorName(data.GROUPNAME));
            dispatch(deviceMonitorActions.setMonitorView(1));
        // }, 100);

        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for (var i = 0; i < nodes.length; i++) {
            if(nodes[i].id == data.GROUPID) {
                treeObj.selectNode(nodes[i]);
                // this.state.itoss_Monitor.MonitorTree2.setState({curNode:nodes[i]});
                monitorTree2.setState({curNode:nodes[i]});
                break;
            }
        }
    },

    handleStatusGridOnClickMonitorName: function(e, data) {
        const { dispatch, monitorTree2, pieChartMonitorType } = this.props;
        // var _this = this;
        // setTimeout(function () {
            // var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
            // var filter = [{key:"GROUPID",value:this.props.data.GROUPID}, {key:"NAME",value:this.props.data.GROUPNAME.substring(0, this.props.data.GROUPNAME.indexOf("("))}, {key:"TYPE",value:this.props.data.type}];
            // yftDeviceMonitorAction.set_monitorTableFilter(filter.slice(0));
            // yftDeviceMonitorAction.set_MonitorGroupId(this.props.data.GROUPID);
            // yftDeviceMonitorAction.set_monitorTableCurrentPage(1);
            // yftDeviceMonitorAction.set_monitorTableNumPerPage(20);
            // yftDeviceMonitorAction.set_MonitorFilterStatus("all");
            var filter = [{key:"GROUPID",value:data.GROUPID}, {key:"NAME",value:data.GROUPNAME.substring(0, data.GROUPNAME.indexOf("("))}, {key:"TYPE",value:data.type}];
            dispatch(deviceMonitorActions.setMonitorTableFilter(filter.slice(0)));
            dispatch(deviceMonitorActions.setMonitorGroupId(data.GROUPID));
            dispatch(deviceMonitorActions.setMonitorTableCurrentPage(1));
            dispatch(deviceMonitorActions.setMonitorTableNumPerPage(20));
            dispatch(deviceMonitorActions.setMonitorFilterStatus("all"));

            var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
            var nodes = treeObj.transformToArray(treeObj.getNodes());
            for(var i = 0; i < nodes.length; i++) {
                if(nodes[i].id == data.GROUPID) {
                    treeObj.selectNode(nodes[i]);
                    // this.state.itoss_Monitor.MonitorTree2.setState({curNode:nodes[i]});
                    monitorTree2.setState({curNode:nodes[i]});
                    for(var j = 0; j < nodes.length; j++) {
                        if(nodes[j].id == nodes[i].pid) {
                            // yftDeviceMonitorAction.set_MonitorName(nodes[j].name.substring(0, nodes[j].name.indexOf("(")) + "-" + nodes[i].name);
                            // yftDeviceMonitorAction.set_SearchAreaData(nodes[j]);
                            // yftDeviceMonitorAction.set_SettingSearchAreaData(nodes[j]);
                            dispatch(deviceMonitorActions.setMonitorName(nodes[j].name.substring(0, nodes[j].name.indexOf("(")) + "-" + nodes[i].name));
                            dispatch(deviceMonitorActions.setSearchAreaData(nodes[j]));
                            dispatch(deviceMonitorActions.setSettingSearchAreaData(nodes[j]));
                            break;
                        }
                    }
                    break;
                }
            }
            // yftDeviceMonitorAction.set_MonitorView(2);
            dispatch(deviceMonitorActions.setMonitorView(2));
        // }, 100);
    },

    handleStatusGridOnClickRadio: function(e) {
        const { dispatch } = this.props;
        // var _this = this;
        // setTimeout(function () {
            // var yftDeviceMonitorAction = _this.getFlux().actions.YFTDeviceMonitorActions;
            // var filter = [{key:"GROUPID",value:e.currentTarget.id.substr(e.currentTarget.id.lastIndexOf("_")+1)},{key:"TYPE",value:e.currentTarget.value}];
            // yftDeviceMonitorAction.set_GetTearmListDataType(2);
            // yftDeviceMonitorAction.set_StatusGridMonitorGroupId(e.currentTarget.id.substr(e.currentTarget.id.lastIndexOf("_")+1));
            // yftDeviceMonitorAction.get_TearmListData(filter);
            var filter = [{key:"GROUPID",value:e.currentTarget.id.substr(e.currentTarget.id.lastIndexOf("_")+1)},{key:"TYPE",value:e.currentTarget.value}];
            dispatch(deviceMonitorActions.setGetTearmListDataType(2));
            dispatch(deviceMonitorActions.setStatusGridMonitorGroupId(e.currentTarget.id.substr(e.currentTarget.id.lastIndexOf("_")+1)));
            dispatch(deviceMonitorActions.getTearmListData(filter));
        // }, 100);
    },

    render: function() {
        const { monitorName, getTearmListDataType, pieChartDataType, tearmAllMAPData, tearmAllMAPData_pieChartMonitorTypeRadio,
            pieChartMonitorType, tearmEquipmentNameData, selectedTearmEquipmentNameData, tearmSubMAPData, tearmMAPData_monitorTypeRadio } = this.props;
        return (
            <div id="monitorStatisticalView" className='overviewDesViewDiv'>
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        {monitorName}
                    </div>
                    <div className="titleRight">
                        <a id="statisticalView_GoBack" className="backSpaceText" onClick={this._handleOnClickGoBack}>返回上一级</a>
                        <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                        <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                    </div>
                </div>
                <div className='statisticalViewContentDiv col-md-12'>
                    <PieChartView getTearmListDataType={getTearmListDataType} pieChartDataType={pieChartDataType} tearmAllMAPData={tearmAllMAPData} tearmAllMAPData_pieChartMonitorTypeRadio={tearmAllMAPData_pieChartMonitorTypeRadio}
                        pieChartMonitorType={pieChartMonitorType} tearmEquipmentNameData={tearmEquipmentNameData} selectedTearmEquipmentNameData={selectedTearmEquipmentNameData} onClickRadio={this.handlePieChartOnClickRadio} onSelectType={this.handlePieChartOnSelectType}/>
                    <StatusGridView getTearmListDataType={getTearmListDataType} pieChartMonitorType={pieChartMonitorType} tearmSubMAPData={tearmSubMAPData} tearmMAPData_monitorTypeRadio={tearmMAPData_monitorTypeRadio}
                        onClickGroupName={this.handleStatusGridOnClickGroupName} onClickMonitorName={this.handleStatusGridOnClickMonitorName} onClickRadio={this.handleStatusGridOnClickRadio}/>
                </div>
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('monitorStatisticalView') != null) {
        document.getElementById('monitorStatisticalView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = StatisticalView;
StatisticalView.propTypes = {
  monitorView: PropTypes.number.isRequired,
  monitorName: PropTypes.string.isRequired,
  monitorGroupId: PropTypes.string.isRequired,
  pieChartMonitorType: PropTypes.string.isRequired,
  getTearmListDataType: PropTypes.number.isRequired,
  pieChartDataType: PropTypes.number.isRequired,
  // tearmAllMAPData: PropTypes.object,
  tearmAllMAPData_pieChartMonitorTypeRadio: PropTypes.array.isRequired,
  tearmEquipmentNameData: PropTypes.array.isRequired,
  selectedTearmEquipmentNameData: PropTypes.object,
  monitorTree2: PropTypes.object,
  tearmSubMAPData: PropTypes.array.isRequired,
  tearmMAPData_monitorTypeRadio: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { monitorView, monitorName, monitorGroupId, pieChartMonitorType, getTearmListDataType, pieChartDataType,
      tearmAllMAPData, tearmAllMAPData_pieChartMonitorTypeRadio, tearmEquipmentNameData, selectedTearmEquipmentNameData, monitorTree2,
      tearmSubMAPData, tearmMAPData_monitorTypeRadio } = state.deviceMonitorReducer

  return {
    monitorView,
    monitorName,
    monitorGroupId,
    pieChartMonitorType,
    getTearmListDataType,
    pieChartDataType,
    tearmAllMAPData,
    tearmAllMAPData_pieChartMonitorTypeRadio,
    tearmEquipmentNameData,
    selectedTearmEquipmentNameData,
    monitorTree2,
    tearmSubMAPData,
    tearmMAPData_monitorTypeRadio
  }
}

export default connect(mapStateToProps)(StatisticalView)
