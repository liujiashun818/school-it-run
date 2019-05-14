/**
 * Created by Yuchen on 2015/12/11.

 @props: width[string] - 初始图表宽度
 @props: height[string] - 初始图表高度
 @props: marginTop[string] - 初始图表上边距
 @props: marginLeft[string] - 初始图表左边距
 @props: oData[object] - 图表数据
 @props: type[int] - 图表类型索引
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;
// require('../lib/echarts-all.js');

var devChart = React.createClass({
    componentDidMount: function(){
        /*var DOMNode = $(ReactDOM.findDOMNode(this));
        var Jchart = DOMNode.find(".tab2_chart").eq(0);
        Jchart.width(Jchart.parent().width());
    	this._showChart(this.props.type);*/
    	this._showChart(this.props.type);
    },
    componentDidUpdate: function(){
        this.state.chart.resize();
    },
    render: function() {
        return (
            <div className="equipmentManage_tab2_chart" style={{width:this.props.width}}>
                <div className="tab2_chart" style={{height:this.props.height,width:this.props.width,marginTop:this.props.marginTop,marginLeft:this.props.marginLeft}}></div>
            </div>
        );
    },
    _showChart: function(chartType){
        var DOMNode = $(ReactDOM.findDOMNode(this));
        var Jchart = DOMNode.find(".tab2_chart").eq(0);
        var chart = echarts.init(Jchart[0]);
        var option = {};
        switch(chartType){
            case 1://ping chart
                option = {
                    color : ['rgb(126,178,109)','rgb(234,184,57)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: 'bottom',
                        data: ['往返时间(ms)','包成功率(%)'],
                        formatter: function(name){
                            return 'Ping - '+name;
                        }
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if(i%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : [ '04:00','04:10','04:20','04:30','04:40','04:50',
                                    '05:00','05:10','05:20','05:30','05:40','05:50',
                                    '06:00','06:10','06:20','06:30','06:40','06:50',
                                    '07:00','07:10','07:20','07:30','07:40','07:50',
                                    '08:00','08:10','08:20','08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00']
                            /*data : [new Date("2016-01-06 08:00:00"),new Date("2016-01-06 08:10:00"),new Date("2016-01-06 08:20:00"),new Date("2016-01-06 08:30:00"),new Date("2016-01-06 08:40:00"),new Date("2016-01-06 08:50:00"),
                                    new Date("2016-01-06 09:00:00"),new Date("2016-01-06 09:10:00"),new Date("2016-01-06 09:20:00"),new Date("2016-01-06 09:30:00"),new Date("2016-01-06 09:40:00"),new Date("2016-01-06 09:50:00"),
                                    new Date("2016-01-06 10:00:00"),new Date("2016-01-06 10:10:00"),new Date("2016-01-06 10:20:00"),new Date("2016-01-06 10:30:00"),new Date("2016-01-06 10:40:00"),new Date("2016-01-06 10:50:00"),
                                    new Date("2016-01-06 11:00:00"),new Date("2016-01-06 11:10:00"),new Date("2016-01-06 11:20:00"),new Date("2016-01-06 11:30:00"),new Date("2016-01-06 11:40:00"),new Date("2016-01-06 11:50:00"),
                                    new Date("2016-01-06 12:00:00"),new Date("2016-01-06 12:10:00"),new Date("2016-01-06 12:20:00"),new Date("2016-01-06 12:30:00"),new Date("2016-01-06 12:40:00"),new Date("2016-01-06 12:50:00"),
                                    new Date("2016-01-06 13:00:00"),new Date("2016-01-06 13:10:00"),new Date("2016-01-06 13:20:00"),new Date("2016-01-06 13:30:00"),new Date("2016-01-06 13:40:00"),new Date("2016-01-06 13:50:00"),
                                    new Date("2016-01-06 14:00:00")],*/
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 125
                        }
                    ],
                    series : [
                        {
                            name:'包成功率(%)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: 'rgba(234,184,57,0.1)'}
                            }},
                            data: this.props.oData.success_rate
                        },
                        {
                            name:'往返时间(ms)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: 'rgba(126,178,109,0.1)'}
                            }},
                            data: this.props.oData.propagation_time
                        },
                    ]
                };
                break;
            case 2://SNMP chart
                option = {
                    color : ['rgb(126,178,109)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: 'bottom',
                        data: ['CPU平均利用率(%)'],
                        formatter: function(name){
                            return 'CPU_SNMP - '+name;
                        }
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 50,
                            data: [0,10,20,30,40,50]
                        }
                    ],
                    series : [
                        {
                            name:'CPU平均利用率(%)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: 'rgba(126,178,109,0.1)'}
                            }},
                            data: this.props.oData.avg_cpu_usage_rate
                        }
                    ]
                };
                break;
            case 3://device chart
                option = {
                    color : ['rgb(126,178,109)','rgb(234,184,57)','rgb(110,208,224)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: 'bottom',
                        data: ['总空间(G)','剩余空间(G)','磁盘使用率(%)'],
                        formatter: function(name){
                            return '磁盘:D - '+name;
                        }
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 120,
                            data: [0,20,40,60,80,100,120]
                        }
                    ],
                    series : [
                        {
                            z:1,
                            name:'总空间(G)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.total
                        },
                        {
                            z:2,
                            name:'剩余空间(G)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.remain
                        },
                        {
                            z:3,
                            name:'磁盘使用率(%)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.usage_rate
                        }
                    ]
                };
                break;
            case 4://memory SNMP chart
                option = {
                    color : ['rgb(126,178,109)','rgb(234,184,57)','rgb(110,208,224)','rgb(239,132,60)','rgb(226,77,66)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: '230',
                        data: ['物理内存总空间(MB)','虚拟内存利用率(%)','物理内存利用率(%)','物理内存剩余空间(MB)','虚拟内存总空间(MB)'],
                        formatter: function(name){
                            return 'Memory_SNMP - '+name;
                        }
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 120,
                            data: [0,20,40,60,80,100,120]
                        }
                    ],
                    series : [
                        {
                            z:1,
                            name:'物理内存总空间(MB)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.total_phy_memory
                        },
                        {
                            z:2,
                            name:'虚拟内存利用率(%)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.vir_memory_use_rate
                        },
                        {
                            z:3,
                            name:'物理内存利用率(%)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.phy_memory_use_rate
                        },
                        {
                            z:4,
                            name:'物理内存剩余空间(MB)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.remain_phy_memory
                        },
                        {
                            z:5,
                            name:'虚拟内存总空间(MB)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.remain_vir_memory
                        }
                    ]
                };
                break;
            case 5://端口状态 chart
                option = {
                    color : ['rgb(126,178,109)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: 'bottom',
                        data: ['状态'],
                        formatter: function(name){
                            return '端口 - '+name+'(200为端口开启)';
                        }
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 500,
                            data: [0,100,200,300,400,500]
                        }
                    ],
                    series : [
                        {
                            name:'状态',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: 'rgba(126,178,109,0.1)'}
                            }},
                            data: this.props.oData.state
                        }
                    ]
                };
                break;
            case 6://SNMP trap chart
                option = {
                    color : ['rgb(126,178,109)','rgb(234,184,57)','rgb(110,208,224)','rgb(239,132,60)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: 'bottom',
                        data: ['增加行数','总行数','增加匹配数','总匹配数'],
                        formatter: function(name){
                            return 'SNMP Trap - '+name;
                        }
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 500,
                            data: [0,100,200,300,400,500]
                        }
                    ],
                    series : [
                        {
                            z:1,
                            name:'增加行数',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.new_row_count
                        },
                        {
                            z:2,
                            name:'总行数',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.total_row_count
                        },
                        {
                            z:3,
                            name:'增加匹配数',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.new_match_count
                        },
                        {
                            z:4,
                            name:'总匹配数',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.total_match_count
                        },
                    ]
                };
                break;
            case 7://设备运行时间 chart
                option = {
                    color : ['rgb(126,178,109)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        x: '80',
                        y: 'bottom',
                        data: ['设备运行时间'],
                        formatter: function(name){
                            return '设备运行时间 - '+name;
                        }
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                            axisLine: {
                              show: false
                            },
                            axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                            axisLine: {
                              show: false
                            },
                            axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 50,
                            data: [0,10,20,30,40,50]
                        }
                    ],
                    series : [
                        {
                            name:'设备运行时间',
                            type:'line',
                            symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: 'rgba(126,178,109,0.1)'}
                            }},
                            data: this.props.oData.time
                        }
                    ]
                };
                break;
            case 8://SysLog chart
                option = {
                    color : ['rgb(126,178,109)','rgb(234,184,57)','rgb(110,208,224)','rgb(239,132,60)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: 'bottom',
                        data: ['总匹配数','增加行数','增加匹配书','总行数'],
                        formatter: function(name){
                            return 'SysLog - '+name;
                        }
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 500,
                            data: [0,100,200,300,400,500]
                        }
                    ],
                    series : [
                        {
                            z:1,
                            name:'总匹配数',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.total_match_count
                        },
                        {
                            z:2,
                            name:'增加行数',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.new_row_count
                        },
                        {
                            z:3,
                            name:'增加匹配书',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.new_match_count
                        },
                        {
                            z:4,
                            name:'总行数',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.total_row_count
                        },
                    ]
                };
                break;
            case 9://网卡 chart
                option = {
                    color : ['rgb(126,178,109)','rgb(234,184,57)','rgb(110,208,224)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: 'bottom',
                        data: ['错误数据包数(个)','发送速率(Kbit/s)','接受速率(Kbit/s)'],
                        formatter: (function(name){
                            return '网卡:'+this.props.netAdapterName+' - '+name;
                        }).bind(this)
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 500,
                            data: [0,100,200,300,400,500]
                        }
                    ],
                    series : [
                        {
                            z:1,
                            name:'错误数据包数(个)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.error_pkt_count
                        },
                        {
                            z:2,
                            name:'发送速率(Kbit/s)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.send_rate
                        },
                        {
                            z:3,
                            name:'接受速率(Kbit/s)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.receive_rate
                        },
                    ]
                };
                break;
            case 10://URL chart
                option = {
                    color : ['rgb(126,178,109)','rgb(234,184,57)','rgb(110,208,224)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        x: '80',
                        y: '230',
                        orient: 'vertical',
                        data: ['状态','文件大小(bytes)','下载时间(ms)'],
                        formatter: (function(name){
                            return 'URL:'+(this.props.url||'')+' - '+name;
                        }).bind(this)
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                            axisLine: {
                              show: false
                            },
                            axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                            axisLine: {
                              show: false
                            },
                            axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 500,
                            data: [0,100,200,300,400,500]
                        }
                    ],
                    series : [
                        {
                            z:1,
                            name:'状态',
                            type:'line',
                            symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.state
                        },
                        {
                            z:2,
                            name:'文件大小(bytes)',
                            type:'line',
                            symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.file_size
                        },
                        {
                            z:3,
                            name:'下载时间(ms)',
                            type:'line',
                            symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.download_time
                        },
                    ]
                };
                break;
            case 11://内存 chart
                option = {
                    color : ['rgb(126,178,109)','rgb(234,184,57)','rgb(110,208,224)','rgb(239,132,60)','rgb(226,77,66)','rgb(31,120,193)','rgb(186,67,169)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: '230',
                        data: ['虚拟内存剩余空间(MB)','buffers(MB)','虚拟内存利用率(%)','物理内存剩余空间(MB)','物理内存总空间(MB)','物理内存利用率(%)','cached(MB)'],
                        formatter: function(name){
                            return '内存 - '+name;
                        }
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 120,
                            data: [0,20,40,60,80,100,120]
                        }
                    ],
                    series : [
                        {
                            z:1,
                            name:'虚拟内存剩余空间(MB)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.remain_vir_memory
                        },
                        {
                            z:2,
                            name:'buffers(MB)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.buffers
                        },
                        {
                            z:3,
                            name:'虚拟内存利用率(%)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.vir_memory_use_rate
                        },
                        {
                            z:4,
                            name:'物理内存剩余空间(MB)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.remain_phy_memory
                        },
                        {
                            z:5,
                            name:'物理内存总空间(MB)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.total_phy_memory
                        },
                        {
                            z:6,
                            name:'物理内存利用率(%)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.phy_memory_use_rate
                        },
                        {
                            z:7,
                            name:'cached(MB)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: "rgba(220,220,220,0.1)"}
                            }},
                            data: this.props.oData.cached
                        }
                    ]
                };
                break;
            case 12://文件 chart
                option = {
                    color : ['rgb(126,178,109)','rgb(234,184,57)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: 'bottom',
                        data: ['文件大小(KB)','修改时间'],
                        formatter: (function(name){
                            return '文件:'+this.props.fileName+' - '+name;
                        }).bind(this)
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 500,
                            data: [0,100,200,300,400,500]
                        }
                    ],
                    series : [
                        {
                            name:'文件大小(KB)',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: 'rgba(126,178,109,0.1)'}
                            }},
                            data: this.props.oData.file_size
                        },
                        {
                            name:'修改时间',
                            type:'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: 'rgba(126,178,109,0.1)'}
                            }},
                            data: this.props.oData.update_time
                        }
                    ]
                };
                break;
            case 13://服务 chart
                option = {
                    color : ['rgb(126,178,109)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: 'bottom',
                        data: ['状态'],
                        formatter: (function(name){
                            return '服务:'+this.props.serviceName+' - '+name;
                        }).bind(this)
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 500,
                            data: [0,100,200,300,400,500]
                        }
                    ],
                    series : [
                        {
                            name: '状态',
                            type: 'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: 'rgba(126,178,109,0.1)'}
                            }},
                            data: this.props.oData.state
                        }
                    ]
                };
                break;
            case 14://目录 chart
                option = {
                    color : ['rgb(126,178,109)','rgb(234,184,57)'],
                    grid : {
                        height : '140'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                      	x: '80',
                      	y: 'bottom',
                        data: ['文件大小(KB)','项目个数'],
                        formatter: (function(name){
                            return '目录:'+this.props.dirName+' - '+name;
                        }).bind(this)
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                          	axisLabel: {
                              interval: function(i,v){
                                  if((i-3)%6==0&&i!=0) return true;
                                  return false;
                              }
                            },
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            data : ['08:30','08:40','08:50',
                                    '09:00','09:10','09:20','09:30','09:40','09:50',
                                    '10:00','10:10','10:20','10:30','10:40','10:50',
                                    '11:00','11:10','11:20','11:30','11:40','11:50',
                                    '12:00','12:10','12:20','12:30','12:40','12:50',
                                    '13:00','13:10','13:20','13:30','13:40','13:50',
                                    '14:00','14:10','14:20'
                                ]
                        }
                    ],
                    yAxis : [
                        {
                          	axisLine: {
                              show: false
                            },
                          	axisTick: {
                              show: false
                            },
                            type : 'value',
                            max: 500,
                            data: [0,100,200,300,400,500]
                        }
                    ],
                    series : [
                        {
                            name: '文件大小(KB)',
                            type: 'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: 'rgba(126,178,109,0.1)'}
                            }},
                            data: this.props.oData.file_size
                        },
                        {
                            name: '项目个数',
                            type: 'line',
                          	symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: 'rgba(126,178,109,0.1)'}
                            }},
                            data: this.props.oData.dir_count
                        }
                    ]
                };
                break;
            case 15://监测器历史 chart
                var xAxisData = [];
                var start_time = this.props.startTime;
                var end_time = this.props.endTime;
                var splitNumber = this.props.splitNumber;
                var labelInterval = this.props.labelInterval;
                var intervalRange = (end_time-start_time)/(splitNumber*labelInterval);
                for(var i=start_time,j=0;i<end_time;i+=intervalRange,j++){
                    xAxisData.push(start_time+j*intervalRange);
                }
                if(end_time-start_time<=0) xAxisData[0]=end_time;
                option = {
  	                color : ['rgba(0,0,0,0)'],
                    grid : {
                        height : 165,
                        width: 600,
                    },
                    tooltip : {
                        axisPointer: {
                            type: "none",
                        },
                    },
                    animation : false,
                    xAxis : [
                        {
                            type : 'category',
                            axisTick: {
                              show: true,
                            },
                            data: xAxisData,
                            splitLine: {
                            	lineStyle: {
                                  	color: "#000",
                                	type: "dashed",
                                  	width: 0.3
                                }
                            },
                          	splitArea: {
                              areaStyle: {
                                color: 'rgba(0,0,0,0)',
                              },
                            },
                          	axisLine: {
                              lineStyle: {
                                color: '#777',
                                type: "solid",
                                width: 1
                              },
                            },
                            axisLabel: {
                                onGap: true,
                                interval: function(i,v){
                                    if(i%labelInterval==0&&i!=0) return true;
                                    return false;
                                },
                                formatter: function(v){
                                    var d = new Date();
                                    d.setTime(v*60*1000);
                                    var par = [(d.getMonth()+1)+"",
                                               (d.getDate())+"",
                                               (d.getHours())+"",
                                               (d.getMinutes())+""];
                                 	var res = [];
                                  	for(var r in par){
                                    	var n = par[r];
                                      	if(n.length<2) n="0"+n;
                                      	res.push(n);
                                    }
                                	return res[0]+"/"+res[1]+" "+res[2]+":"+res[3];
                                },
                                textStyle: {
                                    align: "left",
                                    baseline: "top",
                                    fontSize: 5
                                },
                                rotate: 90,
                            },
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisTick: {
                              show: true,
                            },
                            data: [0,10,20,30,40,50,60,70,80,90,100,110],
                            splitNumber: 11,
                            name: "发包成功率（%）",
                            nameTextStyle: {
                              color: "#000",
                              fontWeight: "bold",
                            },
                          	splitArea: {
                              areaStyle: {
                                color: 'rgba(0,0,0,0)',
                              },
                            },
                            splitLine: {
                                lineStyle: {
                                	color: "#777",
                                    type: "dashed",
                                	width: 0.3
                                }
                            },

                            axisLabel: {
                                textStyle: {
                                    fontSize: 8
                                },
                            },
                          	axisLine: {
                              lineStyle: {
                                color: '#777',
                                type: "solid",
                                width: 1
                              },
                            },
                        }
                    ],
                    series : [
                        {
                            name: '时间',
                            type: 'line',
                            symbol: 'none',
                            itemStyle: {normal: {
                              areaStyle: { color: 'rgba(51,204,255,0.6)'},
                            }},
                            data: this.props.oData,
                        }
                    ]
                };
                break;
            default:
                console.log("INVALID CHART TYPE");
                break;
        }
        chart.setOption(option);
        this.setState({
            chart:chart,
        },(function(){
            this.state.chart.resize();
        }).bind(this));
    },
});

module.exports = devChart;
