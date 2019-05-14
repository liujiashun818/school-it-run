/*
* 资源监测-统一监控平台-组信息页面-饼图组件
*/
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var ReactWidgets = require('react-widgets');
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var groupMonitorsStatusChart;
var PieChartView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    componentDidUpdate: function() {
        const { getTearmListDataType, pieChartDataType, tearmAllMAPData, tearmAllMAPData_pieChartMonitorTypeRadio } = this.props;
        // if(this.state.itoss_Monitor.GetTearmListDataType != 2) {
        if(getTearmListDataType != 2) {
            var assetStatusData;
            // if (this.state.itoss_Monitor.PieChartDataType == 0) {
            //     if (this.state.itoss_Monitor.TearmAllMAPData != undefined) {
            if (pieChartDataType == 0) {
                if (tearmAllMAPData != undefined) {
                    assetStatusData = [
                        // {name: '完好数', value: parseInt(this.state.itoss_Monitor.TearmAllMAPData.good)},
                        // {name: '离线数', value: parseInt(this.state.itoss_Monitor.TearmAllMAPData.error)},
                        // {name: '异常数', value: parseInt(this.state.itoss_Monitor.TearmAllMAPData.warning)}
                        {name: '完好数', value: parseInt(tearmAllMAPData.good)},
                        {name: '离线数', value: parseInt(tearmAllMAPData.error)},
                        {name: '异常数', value: parseInt(tearmAllMAPData.warning)}
                    ];
                }
                else {
                    assetStatusData = [
                        {name: '完好数', value: 0},
                        {name: '离线数', value: 0},
                        {name: '异常数', value: 0}
                    ];
                }
            }
            else {
                // if (this.state.itoss_Monitor.TearmAllMAPData_pieChartMonitorTypeRadio != undefined) {
                if (tearmAllMAPData_pieChartMonitorTypeRadio != undefined) {
                    assetStatusData = [
                        {
                            name: '完好数',
                            // value: parseInt(this.state.itoss_Monitor.TearmAllMAPData_pieChartMonitorTypeRadio.good)
                            value: parseInt(tearmAllMAPData_pieChartMonitorTypeRadio.good)
                        },
                        {
                            name: '离线数',
                            // value: parseInt(this.state.itoss_Monitor.TearmAllMAPData_pieChartMonitorTypeRadio.error)
                            value: parseInt(tearmAllMAPData_pieChartMonitorTypeRadio.error)
                        },
                        {
                            name: '异常数',
                            // value: parseInt(this.state.itoss_Monitor.TearmAllMAPData_pieChartMonitorTypeRadio.warning)
                            value: parseInt(tearmAllMAPData_pieChartMonitorTypeRadio.warning)
                        }
                    ];
                }
                else {
                    assetStatusData = [
                        {name: '完好数', value: 0},
                        {name: '离线数', value: 0},
                        {name: '异常数', value: 0}
                    ];
                }
            }

            groupMonitorsStatusChart = echarts.init(document.getElementById('groupMonitorsStatus_chartDiv'), 'macarons');
            var statusChartOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    itemGap: 0,
                    data: ['完好数', '离线数', '异常数']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    feature: {
                        // dataView: {show: true, readOnly: false},
                        // restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                series: [
                    {
                        type: 'pie',
                        radius: '60%',
                        center: ['50%', '50%'],
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#00AA00', '#CC0000', '#F08000'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    show: true,
                                    formatter: '{b} : {c} ({d}%)'
                                }
                            }
                        },
                        data: assetStatusData
                    }
                ]
            };
            // 为echarts对象加载数据
            groupMonitorsStatusChart.setOption(statusChartOption);
        }
    },

    componentDidMount: function() {
        const { pieChartDataType, tearmAllMAPData, tearmAllMAPData_pieChartMonitorTypeRadio, pieChartMonitorType } = this.props;
        var assetStatusData;
        // if(this.state.itoss_Monitor.PieChartDataType == 0){
        //     if(this.state.itoss_Monitor.TearmAllMAPData != undefined){
        if(pieChartDataType == 0){
            if(tearmAllMAPData != undefined){
                assetStatusData = [
                    // { name:'完好数', value:parseInt(this.state.itoss_Monitor.TearmAllMAPData.good)},
                    // { name:'离线数', value:parseInt(this.state.itoss_Monitor.TearmAllMAPData.error)},
                    // { name:'异常数', value:parseInt(this.state.itoss_Monitor.TearmAllMAPData.warning)}
                    { name:'完好数', value:parseInt(tearmAllMAPData.good)},
                    { name:'离线数', value:parseInt(tearmAllMAPData.error)},
                    { name:'异常数', value:parseInt(tearmAllMAPData.warning)}
                ];
            }
            else{
                assetStatusData = [
                    { name:'完好数', value:0},
                    { name:'离线数', value:0},
                    { name:'异常数', value:0}
                ];
            }
        }
        else{
            // if(this.state.itoss_Monitor.TearmAllMAPData_pieChartMonitorTypeRadio != undefined){
            if(tearmAllMAPData_pieChartMonitorTypeRadio != undefined){
                assetStatusData = [
                    // { name:'完好数', value:parseInt(this.state.itoss_Monitor.TearmAllMAPData_pieChartMonitorTypeRadio.good)},
                    // { name:'离线数', value:parseInt(this.state.itoss_Monitor.TearmAllMAPData_pieChartMonitorTypeRadio.error)},
                    // { name:'异常数', value:parseInt(this.state.itoss_Monitor.TearmAllMAPData_pieChartMonitorTypeRadio.warning)}
                    { name:'完好数', value:parseInt(tearmAllMAPData_pieChartMonitorTypeRadio.good)},
                    { name:'离线数', value:parseInt(tearmAllMAPData_pieChartMonitorTypeRadio.error)},
                    { name:'异常数', value:parseInt(tearmAllMAPData_pieChartMonitorTypeRadio.warning)}
                ];
            }
            else{
                assetStatusData = [
                    { name:'完好数', value:0},
                    { name:'离线数', value:0},
                    { name:'异常数', value:0}
                ];
            }
        }

        groupMonitorsStatusChart = echarts.init(document.getElementById('groupMonitorsStatus_chartDiv'), 'macarons');
        var statusChartOption = {
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                itemGap: 0,
                data:['完好数','离线数','异常数']
            },
            toolbox: {
                show : true,
                orient : 'vertical',
                x: 'right',
                feature : {
                    //dataView : {show: true, readOnly: false},
                    //restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    type:'pie',
                    radius : '60%',
                    center: ['50%', '50%'],
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colorList = [
                                    '#00AA00','#CC0000','#F08000'
                                ];
                                return colorList[params.dataIndex]
                            },
                            label: {
                                show: true,
                                formatter: '{b} : {c} ({d}%)'
                            }
                        }
                    },
                    data:assetStatusData
                }
            ]
        };
        // 为echarts对象加载数据
        groupMonitorsStatusChart.setOption(statusChartOption);

        // switch (this.state.itoss_Monitor.PieChartMonitorType) {
        switch (pieChartMonitorType) {
            case "1":
                document.getElementById('radio_pieChart_monitorType_camera').checked = true;
                break;
            case "2":
                document.getElementById('radio_pieChart_monitorType_DVR').checked = true;
                break;
            case "3":
                document.getElementById('radio_pieChart_monitorType_NVR').checked = true;
                break;
            case "4":
                document.getElementById('radio_pieChart_monitorType_encoder').checked = true;
                break;
            case "5":
                document.getElementById('radio_pieChart_monitorType_IPSAN').checked = true;
                break;
            default:
                document.getElementById('radio_pieChart_monitorType_camera').checked = true;
                break;
        }

        var _this = this;
        $(window).resize(function () {
            groupMonitorsStatusChart.resize();
        });
    },

    // _handleClickRadio: function(e) {
    //     var _this = this;
    //     // setTimeout(function () {
    //         var yftDeviceMonitorAction = _this.getFlux().actions.YFTDeviceMonitorActions;
    //         var filter = [{key:"GROUPID",value:_this.state.itoss_Monitor.MonitorGroupId},{key:"TYPE",value:e.target.value}];
    //         yftDeviceMonitorAction.set_GetTearmListDataType(1);
    //         yftDeviceMonitorAction.get_TearmListData(filter);
    //         yftDeviceMonitorAction.set_PieChartMonitorType(e.target.value);
    //         yftDeviceMonitorAction.set_SelectedTearmEquipmentNameData({RecId:"0", name:""});
    //     // }, 100);
    // },
    //
    // _handleSelectType: function(e) {
    //     console.log(e.RecId);
    //     var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
    //     yftDeviceMonitorAction.set_PieChartMonitorType(e.RecId);
    //     yftDeviceMonitorAction.set_SelectedTearmEquipmentNameData(e);
    //     document.getElementById('radio_pieChart_monitorType_camera').checked = false;
    //     document.getElementById('radio_pieChart_monitorType_DVR').checked = false;
    //     document.getElementById('radio_pieChart_monitorType_NVR').checked = false;
    //     document.getElementById('radio_pieChart_monitorType_encoder').checked = false;
    //     document.getElementById('radio_pieChart_monitorType_IPSAN').checked = false;
    // },

    render: function() {
        const { tearmEquipmentNameData, selectedTearmEquipmentNameData, onClickRadio, onSelectType } = this.props;
        return (
            <div className='col-md-6 pieChartView'>
                <div id="groupMonitorsStatus_chartDiv" style={{height: "500px"}}></div>
                <div className='pieChartToolBar'>
                    <div className="radio radioDiv">
                        <label className='searchFontStyle'>
                            <input type="radio" id="radio_pieChart_monitorType_camera" name="radio_monitorType" value="1" defaultChecked="true" onClick={onClickRadio}/>摄像机
                        </label>
                    </div>
                    <div className="radio radioDiv">
                        <label className='searchFontStyle'>
                            <input type="radio" id="radio_pieChart_monitorType_DVR" name="radio_monitorType" value="2" onClick={onClickRadio}/>DVR
                        </label>
                    </div>
                    <div className="radio radioDiv">
                        <label className='searchFontStyle'>
                            <input type="radio" id="radio_pieChart_monitorType_NVR" name="radio_monitorType" value="3" onClick={onClickRadio}/>NVR
                        </label>
                    </div>
                    <div className="radio radioDiv">
                        <label className='searchFontStyle'>
                            <input type="radio" id="radio_pieChart_monitorType_encoder" name="radio_monitorType" value="4" onClick={onClickRadio}/>编码器
                        </label>
                    </div>
                    <div className="radio radioDiv">
                        <label className='searchFontStyle'>
                            <input type="radio" id="radio_pieChart_monitorType_IPSAN" name="radio_monitorType" value="5" onClick={onClickRadio}/>IPSAN
                        </label>
                    </div>
                    <div className="input-group dropdownList" style={{display:"none"}}>
                        <ReactWidgets.DropdownList className='form-control dropdownStyle' data={tearmEquipmentNameData} value={selectedTearmEquipmentNameData} textField='name' onChange={onSelectType}/>
                    </div>
                </div>
            </div>
        );
    }
});

PieChartView.propTypes = {
  getTearmListDataType: PropTypes.number.isRequired,
  pieChartDataType: PropTypes.number.isRequired,
  tearmAllMAPData: PropTypes.object,
  tearmAllMAPData_pieChartMonitorTypeRadio: PropTypes.array.isRequired,
  pieChartMonitorType: PropTypes.string.isRequired,
  tearmEquipmentNameData: PropTypes.array.isRequired,
  selectedTearmEquipmentNameData: PropTypes.object,
  onClickRadio: PropTypes.func.isRequired,
  onSelectType: PropTypes.func.isRequired
};

module.exports = PieChartView;
