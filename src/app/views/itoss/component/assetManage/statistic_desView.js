/**
* Created by Yuchen  2016/01/08.
* 资产统计
*/

var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');
require('bootstrap');

var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import Overview_desView_static from './statistic_desView_static';
import Overview_desView_maintainStatic from './statistic_desView_maintainStatic';

var pieChart, barChart;

var Overview_desView = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return {
            statisticFilter_nameList : [],
            statisticFilter_typeList : [],
            statisticFilter_areaList : [],
        }
    },
    componentDidMount: function() {
        var _this = this;
        this.props.get_statistic_data({callback:function(response){
            _this._overTime_dataLoaded(response.overtimeAssetTypeList);
            _this._maintain_dataLoaded(response.maintainTop10);
        }});
        if(document.getElementById('statisticDesViewDiv') != null) {
            document.getElementById('statisticDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
        }
    },
    render: function() {
        return (
            <div id="statisticDesViewDiv" className="overviewDesViewDiv assetDesViewDiv">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        资产管理：资产统计
                    </div>
                    <div className="titleRight2">
                        <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <Overview_desView_static
                  pieChart={pieChart} permissions={this.props.permissions} AssetTypeList={this.props.AssetTypeList}
                  set_default_filter_value_assetList={this.props.set_default_filter_value_assetList}
                  onSetCurThreeNode={this.props.onSetCurThreeNode}
                  onSetPreThreeNode={this.props.onSetPreThreeNode}
                  setCurName={this.props.setCurName}
                />
                <Overview_desView_maintainStatic barChart={barChart} />
            </div>
        );
    },
    _overTime_dataLoaded: function(overtimeAssetTypeList) {
        var _this = this;
        var inner_radius = 50, outer_radius = 72;
        pieChart = echarts.init(document.getElementById('pieChartDiv'), 'macarons');
        var data = [];
        var legendData = [];
        for(var i in overtimeAssetTypeList){
            data.push({
                value: overtimeAssetTypeList[i].ASSETS_NUMBER,
                name: overtimeAssetTypeList[i].ASSETS_TYPE_NAME,
                tid: overtimeAssetTypeList[i].PRODUCT_TYPE_ID
            });
            legendData.push(overtimeAssetTypeList[i].ASSETS_TYPE_NAME);
        }
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: legendData
            },
            toolbox: {
                show: true,
                feature: {
                    // dataView: {show: true, readOnly: false},
                    // restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable : true,
            series: [
                {
                    name:'过保资产',
                    type:'pie',
                    radius: [inner_radius+'%', outer_radius+'%'],
                    itemStyle : {
                       normal : {
                           label : {
                               show : false
                           },
                           labelLine : {
                               show : false
                           }
                       },
                       emphasis : {
                           label : {
                               show : true,
                               position : 'center',
                               textStyle : {
                                   fontSize : '16',
                                   fontWeight : 'bold'
                               }
                           }
                       }
                   },
                    data: data
                }
            ]
        };
        pieChart.setOption(option);
        pieChart.on("click",function(e){
            var valid = util.hasPermission(_this.props.permissions,"/assetmanage/asset/assetmaintain");
            if(valid==null) return;
            _this.props.set_default_filter_value_assetMaintain({typeID: e.data.tid, noChange: true, filter_ws: true});

            // var zTree = $.fn.zTree.getZTreeObj("commonTree");
            // var treeNodes = zTree.getNodes();
            // var beforeNode = zTree.getNodeByParam("name","资产统计");
            // var targetNode = zTree.getNodeByParam("name","资产统计列表");
            // // console.log(targetNode);
            // var tid = targetNode.tId;
            // var tIndex = zTree.getNodeIndex(targetNode);
            // document.getElementById(tid).className = "fadeInMenu";
            // zTree.selectNode(targetNode);
            // _this.props.onSetPreThreeNode(beforeNode);
            // _this.props.onSetCurThreeNode(targetNode);

            _this.props.setCurName("资产维保");
            _this.history.pushState(null,'assetManage/assetMaintain');
        })
        $(window).resize(function(){
            if(pieChart) pieChart.resize();
            if(barChart) barChart.resize();
        })
    },
    _maintain_dataLoaded: function(maintainTop10) {
        var _this = this;
        barChart = echarts.init(document.getElementById('barChartDiv'), 'macarons');
        var data = [];
        var xAxisData = [];
        var markPointData = [];
        for(var i in maintainTop10){
            if(i>=10) break;
            data.push({
                value: maintainTop10[i].MAINTENANCE_NUMBER,
                id: maintainTop10[i].ASSETS_NAME,
                aid: maintainTop10[i].ASSETS_ID
            });
            xAxisData.push(maintainTop10[i].ASSETS_NAME);
            markPointData.push({
                xAxis: markPointData.length,
                y: 350,
                name: maintainTop10[i].ASSETS_NAME,
                symbolSize: 20
            });
        }
        var option = {
            title: {
                x: 'center',
                text: '设备维修TOP10',
            },
            tooltip: {
                trigger: 'item'
            },
            toolbox: {
                show: true,
                feature: {
                    // dataView: {show: true, readOnly: false},
                    // restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            grid: {
                borderWidth: 0,
                y: 80,
                y2: 60
            },
            xAxis: [
                {
                    type: 'category',
                    show: false,
                    data: xAxisData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: false
                }
            ],
            series: [
                {
                    name: '设备维修次数',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                var colorList = [
                                  '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD'
                                ];
                                return colorList[params.dataIndex]
                            },
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{b}\n{c}'
                            },
                            barBorderRadius: 0
                        }
                    },
                    data: data,
                }
            ]
        };
        barChart.setOption(option);
        barChart.on("click",function(e){
            var valid = util.hasPermission(_this.props.permissions,"/assetmanage/asset/assetlist");
            if(valid==null) return;
            _this.props.set_assetDetailID({val:e.data.aid});

            var zTree = $.fn.zTree.getZTreeObj("commonTree");
            var treeNodes = zTree.getNodes();
            var beforeNode = zTree.getNodeByParam("name","资产统计");
            var targetNode = zTree.getNodeByParam("name","资产统计列表");
            // console.log(targetNode);
            var tid = targetNode.tId;
            var tIndex = zTree.getNodeIndex(targetNode);
            document.getElementById(tid).className = "fadeInMenu";
            zTree.selectNode(targetNode);
            _this.props.onSetPreThreeNode(beforeNode);
            _this.props.onSetCurThreeNode(targetNode);

            // _this.props.setCurName("资产统计列表");
            _this.history.pushState(null,'assetManage/detail');
        })
        $(window).resize(function(){
            if(pieChart) pieChart.resize();
            if(barChart) barChart.resize();
        })
    }
});

$(window).resize(function () {
    if(document.getElementById('statisticDesViewDiv') != null) {
        document.getElementById('statisticDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = Overview_desView;
