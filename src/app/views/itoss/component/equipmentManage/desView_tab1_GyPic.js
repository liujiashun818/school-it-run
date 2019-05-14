/**
 * Created by SHIN on 2015/12/11.
 * 资源监测-统一监控平台-检测器概要-折线图
 */
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');

var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var myChartGyPic;
var myChartGyPic2;

var GyPicView = React.createClass({
    getInitialState:function(){
        return {
            pictype:{normal:{lineStyle:{type: 'solid'}}}
        }
    },
    // mixins: [Navigation, FluxMixin, StoreWatchMixin("YFTEquipmentStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("YFTEquipmentStore").getState()
    //     }
    // },
    componentDidUpdate:function(){
        const{ curTowHourName, curTowHourValue } = this.props;
        var curName = curTowHourName;
        var curData = curTowHourValue;
        var valList = [];
        var keyList = [];
        for(var i=0;i<curData.length;i++){
            var curMap = curData[i].split("$");
            valList.push(curMap[0]);
            keyList.push(curMap[1]);
        }
        myChartGyPic = echarts.init(document.getElementById('mainzzx'), 'macarons');
        myChartGyPic.setOption({
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : false
            },
            // calculable : true,
            xAxis : {
                type : 'category',
                boundaryGap : false,
                data : keyList,
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            yAxis : {
                type : 'value',
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            grid: {
                y: 10,
                x2: 30,
                y2: 30
            },
            series : [
                {
                    name:curName,
                    type:'line',
                    //smooth:true,
                    itemStyle: {normal: {lineStyle:{type: 'solid'}}},
                    data:valList
                }
            ]
        });

        myChartGyPic2 = echarts.init(document.getElementById('mainzzx2'), 'macarons');
        myChartGyPic2.setOption({
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : false
            },
            // calculable : true,
            xAxis : {
                type : 'category',
                boundaryGap : false,
                data : keyList,
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            yAxis : {
                type : 'value',
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            grid: {
                y: 10,
                x2: 30,
                y2: 30
            },
            series : [
                {
                    name:curName,
                    type:'line',
                    //smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:valList
                }
            ]
        });
    },
    componentDidMount:function(){
        const{ curTowHourName, curTowHourValue } = this.props;
        $("#inlineRadio1").attr("checked","true");
        // $("#mainzzx2").hide();

        var curName = curTowHourName;
        var curData = curTowHourValue;
        var valList = [];
        var keyList = [];
        for(var i=0;i<curData.length;i++){
            var curMap = curData[i].split("$");
            valList.push(curMap[0]);
            keyList.push(curMap[1]);
        }
        myChartGyPic = echarts.init(document.getElementById('mainzzx'), 'macarons');
        myChartGyPic.setOption({
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : false
            },
            // calculable : true,
            xAxis : {
                type : 'category',
                boundaryGap : false,
                data : keyList,
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            yAxis : {
                type : 'value',
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            grid: {
                y: 10,
                x2: 30,
                y2: 30
            },
            series : [
                {
                    name:curName,
                    type:'line',
                    //smooth:true,
                    itemStyle: {normal: {lineStyle:{type: 'solid'}}},
                    data:valList
                }
            ]
        });

        myChartGyPic2 = echarts.init(document.getElementById('mainzzx2'), 'macarons');
        myChartGyPic2.setOption({
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : false
            },
            // calculable : true,
            xAxis : {
                type : 'category',
                boundaryGap : false,
                data : keyList,
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            yAxis : {
                type : 'value',
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            grid: {
                y: 10,
                x2: 30,
                y2: 30
            },
            series : [
                {
                    name:curName,
                    type:'line',
                    //smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:valList
                }
            ]
        });

        var _this = this;
        $(window).resize(function () {
            myChartGyPic.resize();
            myChartGyPic2.resize();
        });
    },
    onChangePicStyle:function(e){
        var that = this;
        var type = $(e.target).val();
        if(type == "lineStyle"){
            $("#mainzzx").show();
            // $("#mainzzx2").hide();
            myChartGyPic.restore();
        }else{
            $("#mainzzx").hide();
            $("#mainzzx2").show();
            myChartGyPic2.restore();
        }
    },
    // onChangePicData:function(e){
    //     var target = e.target;
    //     var tval = $(target).val();
    //     $("#inlineRadio1").click();
    //     // console.log("change picdata :",tval);
    //     this.getFlux().actions.YFTEquipmentActions.change_picData(tval);
    // },
    render: function() {
        const{ twoHoursReport, onChangePicData } = this.props;
        var selectOptions = [];
        var thour = twoHoursReport;
        if(thour && thour.length>0){
            for(var i=0;i<thour.length;i++){
                selectOptions.push(<option key={i}>{thour[i].MonitorEntry}</option>);
            };
        }else{
            selectOptions = (<option>暂无数据</option>);
        }
        // console.log(selectOptions)
        return (
            <div className="emWatchBasicPic">
                <div className="emPicToolBar">
                    <label className="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="lineStyle" onClick={this.onChangePicStyle} className="picStyleRadio"/> 折线图
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="areaStyle" onClick={this.onChangePicStyle} className="picStyleRadio"/> 面积图
                    </label>
                    <select style={{"marginLeft":"20px"}} onChange={onChangePicData} className="picDataSelect">
                        {selectOptions}
                    </select>
                </div>
                <div style={{height:"200px","overflowX":"hidden"}} className="equipmentManage_tab2_chart">
                    <div id="mainzzx" style={{height: "200px"}}></div>
                    <div id="mainzzx2" style={{height: "200px"}}></div>
                </div>
            </div>
        );
    }
});

GyPicView.propTypes = {
    curTowHourName: PropTypes.string.isRequired,
    curTowHourValue: PropTypes.array.isRequired,
    twoHoursReport: PropTypes.array.isRequired,
    onChangePicData: PropTypes.func.isRequired
};

module.exports = GyPicView;
