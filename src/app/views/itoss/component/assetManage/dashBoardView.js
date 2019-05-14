/**
 * Created by SHIN on 2015/12/23.
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var assetStatusData = [
    { name:'调拨', value:335 },
    { name:'维修', value:310 },
    { name:'借用', value:234 },
    { name:'报废', value:135 },
    { name:'库存', value:1548 }
];

var rankingData = [
    { rank:'1', assetOwnership:'北京市朝阳区现代教育技术信息网络中心', maintainTimes:70},
    { rank:'2', assetOwnership:'北京市朝阳区实验小学', maintainTimes:52},
    { rank:'3', assetOwnership:'北京市朝阳区教委办公室', maintainTimes:46},
    { rank:'4', assetOwnership:'北京市朝阳区七里庄小学', maintainTimes:21},
    { rank:'5', assetOwnership:'北京市朝阳区安贞里幼儿园', maintainTimes:17}
];

var outOfWarrantyAssetData = [
    { assetName:'华三交换机', assetOwnership:'北京市朝阳区现代教育技术信息网络中心', assetType:'硬件', maintainDate: '2015-12-15', maintainPerson: '彭振宇'},
    { assetName:'三星硬盘录像机', assetOwnership:'北京市朝阳区安贞里幼儿园', assetType:'硬件', maintainDate: '2015-12-30', maintainPerson: '彭振宇'},
    { assetName:'三星硬盘录像机', assetOwnership:'北京市朝阳区安贞里幼儿园', assetType:'硬件', maintainDate: '2015-12-30', maintainPerson: '彭振宇'},
    { assetName:'三星硬盘录像机', assetOwnership:'北京市朝阳区安贞里幼儿园', assetType:'硬件', maintainDate: '2015-12-30', maintainPerson: '彭振宇'},
    { assetName:'三星硬盘录像机', assetOwnership:'北京市朝阳区安贞里幼儿园', assetType:'硬件', maintainDate: '2015-12-30', maintainPerson: '彭振宇'},
];

function test(row) {
    switch (row.rank) {
        case '1':
            return '①';
            break;
        case '2':
            return '②';
            break;
        case '3':
            return '③';
            break;
        case '4':
            return '④';
            break;
        case '5':
            return '⑤';
            break;
    }
}

function rankFormatter(value, row) {
    //console.log(row);
    //var a = test(row);
    return [
        '<div>',
        row.rank,
        '</div>'
    ].join('');
}

var assetStatusChart, assetStatisticChart;
var DashBoardView = React.createClass({
    //getStateFromFlux: function() {
    //  var flux = this.props.flux;
    //  return {
    //  }
    //},
    componentDidMount: function() {
        if(document.getElementById('dashBoardView') != null) {
            document.getElementById('dashBoardView').style.height = $(window).height() - 110 - 30 + 'px';
        }

        assetStatusChart = echarts.init(document.getElementById('assetStatus_chartDiv'), 'macarons');
        var statusChartOption = {
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                itemGap: 0,
                data:['调拨','借用','维修','报废','库存']
            },
            toolbox: {
                show : true,
                orient : 'vertical',
                x: 'right',
                feature : {
                    //dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    type:'pie',
                    radius : '80%',
                    center: ['55%', '50%'],
                    itemStyle: {
                        normal: {
                            label: { show: false },
                            labelLine: { show:false }
                        }
                    },
                    data:assetStatusData
                }
            ]
        };
        // 为echarts对象加载数据
        assetStatusChart.setOption(statusChartOption);

        $('#maintainRankTable').bootstrapTable({
            columns: [
                {
                    title: '排名',
                    width: 60,
                    halign: 'center',
                    align: 'center',
                    formatter: rankFormatter
                }, {
                    title: '资产归属',
                    field: 'assetOwnership',
                    sortable: false
                }, {
                    title: '维修次数',
                    field: 'maintainTimes',
                    width: 60,
                    halign: 'right',
                    align: 'right',
                    sortable: false
                }
            ],
            data: rankingData
        });

        assetStatisticChart = echarts.init(document.getElementById('assetStatistic_chartDiv'), 'macarons');
        var statisticChartOption = {
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c}"
            },
            legend: {
                show: false,
                data:['交换机','路由器','机柜','不间断电源','监控主机','防火墙','空调','显示器','编码器','服务器','硬盘录像机','网络管理平台','传输设备','一体化终端']
            },
            toolbox: {
                show : true,
                orient : 'vertical',
                x: 'right',
                feature : {
                    //dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : false,
            grid : {
                y: 20,
                y2: 30
            },
            xAxis : [
                {
                    type : 'value',
                    //boundaryGap : [0, 0.01]
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : ['交换机','路由器','机柜','不间断电源','监控主机','防火墙','空调','显示器','编码器','服务器','硬盘录像机','网络管理平台','传输设备','一体化终端']
                }
            ],
            series : [
                {
                    type:'bar',
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                var colorList = [
                                    '#FF001E','#0DD398','#D3A70B','#AD3641','#3570AC',
                                    '#5F9207','#EC0E80','#B85504','#14C835','#5AB1EF',
                                    '#FFB981','#B6A2DF','#D77B80','#2DC7C7'
                                ];
                                return colorList[params.dataIndex]
                            },
                            label: {
                                show: true,
                                position: 'right',
                                formatter: '{c}'
                            }
                        }
                    },
                    data:[98, 56, 114, 7, 30, 48, 82, 164, 21, 184, 91, 152, 61, 105]
                }
            ]
        };
        // 为echarts对象加载数据
        assetStatisticChart.setOption(statisticChartOption);

        $('#outOfWarrantyAssetTable').bootstrapTable({
            columns: [
                {
                    title: '资产名称',
                    field: 'assetName',
                    sortable: false
                }, {
                    title: '资产归属',
                    field: 'assetOwnership',
                    sortable: false
                }, {
                    title: '资产类型',
                    field: 'assetType',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '维保期',
                    field: 'maintainDate',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '维保人',
                    field: 'maintainPerson',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }
            ],
            data: outOfWarrantyAssetData
        });

        $(window).resize(function () {
            assetStatusChart.resize();
            assetStatisticChart.resize();
            // if(document.getElementById('dashBoardView') != null) {
            //     document.getElementById('dashBoardView').style.height = $(window).height() - 110 - 30 + 'px';
            // }
            //
            // if(!document.getElementById('assetStatus_chartDiv')) return;
            // var assetStatusChart = echarts.init(document.getElementById('assetStatus_chartDiv'), 'macarons');
            // var statusChartOption = {
            //     tooltip : {
            //         trigger: 'item',
            //         formatter: "{b} : {c} ({d}%)"
            //     },
            //     legend: {
            //         orient : 'vertical',
            //         x : 'left',
            //         itemGap: 0,
            //         data:['调拨','借用','维修','报废','库存']
            //     },
            //     toolbox: {
            //         show : true,
            //         orient : 'vertical',
            //         x: 'right',
            //         feature : {
            //             dataView : {show: true, readOnly: false},
            //             restore : {show: true},
            //             saveAsImage : {show: true}
            //         }
            //     },
            //     calculable : true,
            //     series : [
            //         {
            //             type:'pie',
            //             radius : '80%',
            //             center: ['55%', '50%'],
            //             itemStyle: {
            //                 normal: {
            //                     label: { show: false },
            //                     labelLine: { show:false }
            //                 }
            //             },
            //             data:assetStatusData
            //         }
            //     ]
            // };
            // // 为echarts对象加载数据
            // assetStatusChart.setOption(statusChartOption);
            //
            // if(!document.getElementById('assetStatistic_chartDiv')) return;
            // var assetStatisticChart = echarts.init(document.getElementById('assetStatistic_chartDiv'), 'macarons');
            // var statisticChartOption = {
            //     tooltip : {
            //         trigger: 'item',
            //         formatter: "{b} : {c}"
            //     },
            //     legend: {
            //         show: false,
            //         data:['交换机','路由器','机柜','不间断电源','监控主机','防火墙','空调','显示器','编码器','服务器','硬盘录像机','网络管理平台','传输设备','一体化终端']
            //     },
            //     toolbox: {
            //         show : true,
            //         orient : 'vertical',
            //         x: 'right',
            //         feature : {
            //             dataView : {show: true, readOnly: false},
            //             restore : {show: true},
            //             saveAsImage : {show: true}
            //         }
            //     },
            //     calculable : false,
            //     grid : {
            //         y: 20,
            //         y2: 30
            //     },
            //     xAxis : [
            //         {
            //             type : 'value',
            //             //boundaryGap : [0, 0.01]
            //         }
            //     ],
            //     yAxis : [
            //         {
            //             type : 'category',
            //             data : ['交换机','路由器','机柜','不间断电源','监控主机','防火墙','空调','显示器','编码器','服务器','硬盘录像机','网络管理平台','传输设备','一体化终端']
            //         }
            //     ],
            //     series : [
            //         {
            //             type:'bar',
            //             itemStyle: {
            //                 normal: {
            //                     color: function(params) {
            //                         // build a color map as your need.
            //                         var colorList = [
            //                             '#FF001E','#0DD398','#D3A70B','#AD3641','#3570AC',
            //                             '#5F9207','#EC0E80','#B85504','#14C835','#5AB1EF',
            //                             '#FFB981','#B6A2DF','#D77B80','#2DC7C7'
            //                         ];
            //                         return colorList[params.dataIndex]
            //                     },
            //                     label: {
            //                         show: true,
            //                         position: 'right',
            //                         formatter: '{c}'
            //                     }
            //                 }
            //             },
            //             data:[98, 56, 114, 7, 30, 48, 82, 164, 21, 184, 91, 152, 61, 105]
            //         }
            //     ]
            // };
            // // 为echarts对象加载数据
            // assetStatisticChart.setOption(statisticChartOption);
        });
    },

    render: function() {
        return (
            <div id="dashBoardView" className="dashBoardViewDiv">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        资产管理：仪表盘
                    </div>
                    <div className="titleRight">
                        <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                        <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                    </div>
                </div>
                <div className = "assetStatusPanel col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingAssetStatus">
                            <div className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseAssetStatus" aria-expanded="true" aria-controls="collapseAssetStatus">
                                    资产状态
                                </a>
                            </div>
                        </div>
                        <div id="collapseAssetStatus" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingAssetStatus">
                            <div className="panel-body">
                                <div id="assetStatus_chartDiv" style={{height: "135px"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "rankingPanel col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingRanking">
                            <div className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseRanking" aria-expanded="true" aria-controls="collapseRanking">
                                    维修设备排名 <span className="panel-title-total">合计:254</span>
                                </a>
                            </div>
                        </div>
                        <div id="collapseRanking" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingRanking">
                            <div className="panel-body">
                                <table id='maintainRankTable'
                                       data-toggle='table'
                                       data-classes='table table-no-bordered table-striped'
                                       data-height={135}>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "statisticsPanel col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingStatistics">
                            <div className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseStatistics" aria-expanded="true" aria-controls="collapseStatistics">
                                    硬件资产统计 <span className="panel-title-total">合计:1524</span>
                                </a>
                            </div>
                        </div>
                        <div id="collapseStatistics" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingStatistics">
                            <div className="panel-body">
                                <div id="assetStatistic_chartDiv" style={{height: "315px"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "tablePanel col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingTable">
                            <div className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTable" aria-expanded="true" aria-controls="collapseTable">
                                    近期过保资产
                                </a>
                            </div>
                        </div>
                        <div id="collapseTable" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTable">
                            <div className="panel-body">
                                <table id='outOfWarrantyAssetTable'
                                       data-toggle='table'
                                       data-classes='table table-no-bordered table-striped'
                                       data-height={135}>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DashBoardView;
