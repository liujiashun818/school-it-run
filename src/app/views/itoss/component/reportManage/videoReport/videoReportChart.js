/**
 * Created by SHIN on 2015/12/29.
 */
require('bootstrap');

// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var DateChange = require('../../../../../utils/dateChange.js');

var dailyVideoReportChart, weeklyVideoReportChart, monthlyVideoReportChart, quarterlyVideoReportChart, yearlyVideoReportChart;
var dailyVideoCheckCustomChart, dailyVideoOnlineTrendsChart, dailyVideoOfflineReportChart, dailyVideoMediaLossReportChart, dailyVideoLossChart, dailyVideoQualityReportChart;
var VideoReportChart = React.createClass({
    // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         report:flux.store("ReportManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return{//@MODIFY

        }
    },
    componentDidMount: function() {
      if (this.isMounted()) {
        var _this = this;
        setTimeout(function(){
          _this._getDailyReportChart();//市级
        },300);
      }
    },
    componentDidUpdate: function(nextProps, nextState) {
        this._getDailyReportChart();//市级
    },
    render: function() {
      return (
          <div id={this.props.chartId} style={{height:"320px",width:"98%",paddingLeft:"1%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      var chartTitle = "摄像机视频考核";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();

      switch (chartId) {
          case "videoDailyReportChart":
              chartTitle = "摄像机视频考核日报"+this.props.reportdate;
              break;
          case "videoWeeklyReportChart":
              chartTitle = "摄像机视频考核周报"+this.props.reportdate;
              break;
          case "videoMonthlyReportChart":
              var strMonth = "";
              if(this.props.reportdate != ""){
                strMonth = this.props.reportdate;
                strMonth = strMonth.substring(0,7);
              };
              chartTitle = "摄像机视频考核月报"+strMonth;
              break;
          case "videoQuarterlyReportChart":
              var currentjdcs = 0;
              if(objMonth >= 1 && objMonth <= 3){
                currentjdcs = 0;
              }else if (objMonth >= 4 && objMonth <= 6) {
                currentjdcs = 3;
              }else if (objMonth >= 7 && objMonth <= 9) {
                currentjdcs = 6;
              }else if (objMonth >= 10 && objMonth <= 12) {
                currentjdcs = 9;
              };
              chartTitle = "摄像机视频考核季报"+DateChange.getLastQuarter(objYear,currentjdcs);
              break;
          case "videoYearlyReportChart":
              chartTitle = "摄像机视频考核年报"+objYear;
              break;
      }

      var option = {
        title : {
            text: chartTitle,
            x: 'center'
        },
        tooltip : {
            trigger: 'axis',
            formatter: "{b} : {c}"
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        // dataZoom : {
        //     show : true,
        //     realtime : true,
        //     // orient: 'vertical',   // 'horizontal'
        //     //x: 0,
        //     // y: 36,
        //     //width: 400,
        //     height: 20,
        //     //backgroundColor: 'rgba(221,160,221,0.5)',
        //     //dataBackgroundColor: 'rgba(138,43,226,0.5)',
        //     //fillerColor: 'rgba(38,143,26,0.6)',
        //     //handleColor: 'rgba(128,43,16,0.8)',
        //     //xAxisIndex:[],
        //     //yAxisIndex:[],
        //     start : 40,
        //     end : 60
        // },
        legend: {
            data:['']
        },
        xAxis : [
            {
                type : 'category',
                data : ['总数','在线数','完好数','异常数','视频丢失数']
                //data : ['总数','在线数','完好数','告警数','异常数','视频丢失数']
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '数量',
                axisLabel : {
                    formatter: '{value}'
                }
            }
        ],
        series : [
          {
            name: '',
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: (function(){
              var d =[];
              var chartKey = this.props.chartKey;
              var chartData = [];
              switch (chartKey) {
                case 1:
                  chartData = this.props.videoCheckDailyData;
                  break;
                case 2:
                  chartData = this.props.videoCheckWeeklyData;
                  break;
                case 3:
                  chartData = this.props.videoCheckMonthlyData;
                  break;
                case 4:
                  chartData = this.props.videoCheckQuarterlyData;
                  break;
                case 5:
                  chartData = this.props.videoCheckYearlyData;
                  break;
                case 6:
                  chartData = this.props.videoCheckCustomData;
                  break;
                default:
              }
              var data = chartData[0];
              if (data && data.total) {
                d.push(data.total);
                d.push(data.onlinecount);
                d.push(data.intactcount);
                // d.push(data.alarmcount);
                d.push(data.anomalycount);
                d.push(data.videolosscount);
              }
              return d;
            }.bind(this))()
          }
        ]
      };

      switch (chartId) {
          case "videoDailyReportChart":
              dailyVideoReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dailyVideoReportChart.setOption(option);
              break;
          case "videoWeeklyReportChart":
              weeklyVideoReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              weeklyVideoReportChart.setOption(option);
              break;
          case "videoMonthlyReportChart":
              monthlyVideoReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              monthlyVideoReportChart.setOption(option);
              break;
          case "videoQuarterlyReportChart":
              quarterlyVideoReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              quarterlyVideoReportChart.setOption(option);
              break;
          case "videoYearlyReportChart":
              yearlyVideoReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              yearlyVideoReportChart.setOption(option);
              break;
      }

      $(window).resize(function(){
          dailyVideoReportChart.resize();
          weeklyVideoReportChart.resize();
          monthlyVideoReportChart.resize();
          quarterlyVideoReportChart.resize();
          yearlyVideoReportChart.resize();
      })
    }

});

var VideoCheckCustomChart = React.createClass({
    // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         report:flux.store("ReportManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return{//@MODIFY

        }
    },
    componentDidMount: function() {
      if (this.isMounted()) {
        var _this = this;
        setTimeout(function(){
          _this._getDailyReportChart();//市级
        },300);
      }
    },
    componentDidUpdate: function(nextProps, nextState) {
        this._getDailyReportChart();//市级
    },
    render: function() {
      return (
          <div id={this.props.chartId} style={{height:"320px",width:"98%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      dailyVideoCheckCustomChart = echarts.init(document.getElementById(chartId), 'macarons');
      var chartTitle = "摄像机视频考核报表";
      // if(this.props.chartKey == 1){
      //   chartTitle = "摄像机视频考核日报"
      // }else if (this.props.chartKey == 2) {
      //   chartTitle = "摄像机视频考核周报"
      // }else if (this.props.chartKey == 3) {
      //   chartTitle = "摄像机视频考核月报"
      // }else if (this.props.chartKey == 4) {
      //   chartTitle = "摄像机视频考核季报"
      // }else if (this.props.chartKey == 5) {
      //   chartTitle = "摄像机视频考核日报"
      // }
      var option = {
        title : {
            text: chartTitle,
            x: 'left'
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
              // console.log(params);
    					var date = new Date(params.value[0]);
    					data = date.getFullYear() + '-'
    						+ (date.getMonth() + 1) + '-'
    						+ date.getDate();
    					return data + '<br/>'
    						+ params.seriesName + ': ' + params.value[1] + '%';
    				}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: false},
                //dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        dataZoom : {
            show : true,
            // realtime : true,
            // orient: 'horizontal',
            // type: 'inside',
            start : 30,
            end : 70
        },
        legend: {
            data:['在线率']
        },
        xAxis : [
            {
                type : 'time',
                // boundaryGap : false,
                splitNumber:10
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '在线率',
                axisLabel : {
                    formatter: '{value}%'
                }
            }
        ],
        series : [
          {
            name: '在线率',
            type: 'line',
            showAllSymbol: true,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                          //console.log(params);
                					return params.value[1] + '%';
                				}
                    }
                }
            },
            data: (function () {
						var d = [];
						var customData = this.props.videoCheckCustomData;
						for(var i = 0;i < customData.length; i++){
							// var xzb = customData[i].date;
							// var yzb = customData[i].onlinerate * 100;
              // var year = xzb.year < 1900 ? 1900 + xzb.year : xzb.year;
							// d.push([
							// 	new Date(year, xzb.month, xzb.date),
							// 	yzb
							// ]);
              var dates = customData[i].date;
              var dated = new Date();
              if(dates != ""){
                dated = DateChange.strToDate(dates);
              };
              var yzb = customData[i].onlinerate;
              d.push([
                dated,
                yzb
              ]);
						}
						return d;
					}.bind(this))()
          }
        ]
      };

      dailyVideoCheckCustomChart.setOption(option);
      $(window).resize(function(){
          dailyVideoCheckCustomChart.resize();
      })
    }

});

var VideoOnlineTrendsChart = React.createClass({
    // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         report:flux.store("ReportManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return{//@MODIFY

        }
    },
    componentDidMount: function() {
      if (this.isMounted()) {
        var _this = this;
        setTimeout(function(){
          _this._getDailyReportChart();//市级
        },300);
      }
    },
    componentDidUpdate: function(nextProps, nextState) {
      this._getDailyReportChart();
    },
    render: function() {
      return (
          <div id={this.props.chartId} style={{height:"320px",width:"98%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      dailyVideoOnlineTrendsChart = echarts.init(document.getElementById(chartId), 'macarons');
      var chartTitle = "摄像机在线趋势图"+this.props.reportdate;

      var option = {
        title : {
            text: chartTitle,
            x: 'left'
        },
        tooltip : {
            trigger: 'axis',
            formatter: "{b} <br/>{a} : {c}%"
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: false},
                //dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        // dataZoom : {
        //     show : true,
        //     realtime : true,
        //     // orient: 'vertical',   // 'horizontal'
        //     //x: 0,
        //     // y: 36,
        //     //width: 400,
        //     height: 20,
        //     //backgroundColor: 'rgba(221,160,221,0.5)',
        //     //dataBackgroundColor: 'rgba(138,43,226,0.5)',
        //     //fillerColor: 'rgba(38,143,26,0.6)',
        //     //handleColor: 'rgba(128,43,16,0.8)',
        //     //xAxisIndex:[],
        //     //yAxisIndex:[],
        //     start : 40,
        //     end : 60
        // },
        legend: {
            data:['摄像机在线率'],
            x: 'center' //'center' | 'left' | 'right' | '35px'
            //y: '35px'
            //y: 'bottom' //'top' | 'bottom' | 'center' | '35px'
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : this.props.videoOnlineTrendsAxis,
                axisLabel: {
                  interval: 0,
                  formatter: function(value){
                    var label = value.split(' ');
                    var label2 = label[1].split(':');
                    return label2[0];
                  }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '在线率',
                axisLabel : {
                    formatter: '{value}%'
                }
            }
        ],
        series : [
          {
            name: '摄像机在线率',
            type: 'line',
            showAllSymbol: true,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%'
                    }
                }
            },
            data: this.props.videoOnlineTrendsData
          }
        ]
      };

      dailyVideoOnlineTrendsChart.setOption(option);
      $(window).resize(function(){
          dailyVideoOnlineTrendsChart.resize();
      })
    },

});

var VideoOfflineReportChart = React.createClass({
    // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         report:flux.store("ReportManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return{//@MODIFY

        }
    },
    componentDidMount: function() {
      if (this.isMounted()) {
        var _this = this;
        setTimeout(function(){
          _this._getDailyReportChart();//市级
        },300);
      }
    },
    componentDidUpdate: function(nextProps, nextState) {
      this._getDailyReportChart();
    },
    render: function() {
      return (
          <div id={this.props.chartId} style={{height:"320px",width:"98%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      dailyVideoOfflineReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      var option = {
        tooltip : {
            trigger: 'axis',
            formatter: "{b} : {c}"
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                //dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        legend: {
            data:['']
        },
        xAxis : [
            {
                type : 'category',
                data : ['告警数','异常数','异常率','完好数','完好率','不可用时长','在线数','在线率','总数','视频丢失数','视频丢失时长','视频丢失率']
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '数量',
                axisLabel : {
                    formatter: '{value}'
                }
            },
            {
                type : 'value',
                name : '在线率',
                axisLabel : {
                    formatter: '{value} %'
                }
            }
        ],
        series : [
          {
            name: '',
            type: 'bar',
            data: this.props.videoOfflineData
          }
        ]
      };

      dailyVideoOfflineReportChart.setOption(option);
      $(window).resize(function(){
          dailyVideoOfflineReportChart.resize();
      })
    },
});

var VideoMediaLossReportChart = React.createClass({
    // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         report:flux.store("ReportManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return{//@MODIFY

        }
    },
    componentDidMount: function() {
      if (this.isMounted()) {
        var _this = this;
        setTimeout(function(){
          _this._getDailyReportChart();//市级
        },300);
      }
    },
    componentDidUpdate: function(nextProps, nextState) {
      this._getDailyReportChart();
    },
    render: function() {
      return (
          <div id={this.props.chartId} style={{height:"320px",width:"98%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      dailyVideoMediaLossReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      var option = {
        tooltip : {
            trigger: 'axis',
            formatter: "{b} : {c}"
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                //dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        legend: {
            data:['']
        },
        xAxis : [
            {
                type : 'category',
                data : ['告警数','异常数','异常率','完好数','完好率','不可用时长','在线数','在线率','总数','视频丢失数','视频丢失时长','视频丢失率']
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '数量',
                axisLabel : {
                    formatter: '{value}'
                }
            },
            {
                type : 'value',
                name : '在线率',
                axisLabel : {
                    formatter: '{value} %'
                }
            }
        ],
        series : [
          {
            name: '',
            type: 'bar',
            data: this.props.videoMediaLossData
          }
        ]
      };

      dailyVideoMediaLossReportChart.setOption(option);
      $(window).resize(function(){
          dailyVideoMediaLossReportChart.resize();
      })
    },
});

var VideoLossChart = React.createClass({
    // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         report:flux.store("ReportManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return{//@MODIFY

        }
    },
    componentDidMount: function() {
      if (this.isMounted()) {
        var _this = this;
        setTimeout(function(){
          _this._getDailyReportChart();//市级
        },300);
      }
    },
    componentDidUpdate: function(nextProps, nextState) {
      this._getDailyReportChart();
    },
    render: function() {
      return (
          <div id={this.props.chartId} style={{height:"320px",width:"98%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      dailyVideoLossChart = echarts.init(document.getElementById(chartId), 'macarons');
      var option = {
        tooltip : {
            trigger: 'axis',
            formatter: "{b} : {c}"
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                //dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        legend: {
            data:['']
        },
        xAxis : [
            {
                type : 'category',
                data : ['告警数','异常数','异常率','完好数','完好率','不可用时长','在线数','在线率','总数','视频丢失数','视频丢失时长','视频丢失率']
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '数量',
                axisLabel : {
                    formatter: '{value}'
                }
            },
            {
                type : 'value',
                name : '在线率',
                axisLabel : {
                    formatter: '{value} %'
                }
            }
        ],
        series : [
          {
            name: '',
            type: 'bar',
            data: this.props.videoLossData
          }
        ]
      };

      dailyVideoLossChart.setOption(option);
      $(window).resize(function(){
          dailyVideoLossChart.resize();
      })
    },
});

var VideoRealTimeReportChart = React.createClass({
    // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         report:flux.store("ReportManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return{//@MODIFY

        }
    },
    componentDidMount: function() {
      if (this.isMounted()) {
        var _this = this;
        setTimeout(function(){
          _this._getDailyReportChart();//市级
        },300);
      }
    },
    componentDidUpdate: function(nextProps, nextState) {
      this._getDailyReportChart();
    },
    render: function() {
      return (
          <div id={this.props.chartId} style={{height:"320px",width:"98%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      dailyVideoQualityReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      var reportdate = new Date();
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      var chartTitle = "摄像机视频质量实时统计"+objYear+"-"+objMonth+"-"+objDay;
      var option = {
        title : {
            text: chartTitle,
            x: 'center'
        },
        tooltip : {
            trigger: 'axis',
            formatter: "{b} : {c}"
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: false},
                //dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        legend: {
            data:['']
        },
        xAxis : [
            {
                type : 'category',
                data : ['总数','在线','信号丢失','画面丢失','云台控制','偏亮','偏暗','偏色','清晰度','条纹','雪花','滚屏','抖屏','冻结','遮挡','其他错误']
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '数量',
                axisLabel : {
                    formatter: '{value}'
                }
            }
        ],
        series : [
          {
            name: '',
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: (function(){
              var d =[];
              var chartKey = this.props.chartKey;
              var data = this.props.videoRealTimeData[0];
              if (data && data.total) {
                d.push(data.total);
                d.push(data.ONLINESTATUS);
                d.push(data.SIGNALLOSS);
                d.push(data.IMAGELOSS);
                d.push(data.PTZ);
                d.push(data.BRIGHT);
                d.push(data.DIM);
                d.push(data.COLORCOST);
                d.push(data.DEFINITION);
                d.push(data.STREAK);
                d.push(data.SNOWFLAKE);
                d.push(data.SCREENSCROLL);
                d.push(data.SCREENSHAKE);
                d.push(data.FREEZE);
                d.push(data.COVERSTATUS);
                d.push(data.OTHERERROR);
              }
              return d;
            }.bind(this))()
          }
        ]
      };

      dailyVideoQualityReportChart.setOption(option);
      $(window).resize(function(){
          dailyVideoQualityReportChart.resize();
      })
    },
});

VideoReportChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  chartKey: PropTypes.number.isRequired,
  reportdate: PropTypes.string.isRequired,
  videoCheckDailyData: PropTypes.array.isRequired,
  videoCheckWeeklyData: PropTypes.array.isRequired,
  videoCheckMonthlyData: PropTypes.array.isRequired,
  videoCheckQuarterlyData: PropTypes.array.isRequired,
  videoCheckYearlyData: PropTypes.array.isRequired,
  videoCheckCustomData: PropTypes.array.isRequired
}

VideoCheckCustomChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  chartKey: PropTypes.number.isRequired,
  videoCheckCustomData: PropTypes.array.isRequired
}

VideoOnlineTrendsChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  reportdate: PropTypes.string.isRequired,
  videoOnlineTrendsAxis: PropTypes.array.isRequired,
  videoOnlineTrendsData: PropTypes.array.isRequired
}

VideoOfflineReportChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  videoOfflineData: PropTypes.array.isRequired
}

VideoMediaLossReportChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  videoMediaLossData: PropTypes.array.isRequired
}

VideoLossChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  videoLossData: PropTypes.array.isRequired
}

VideoRealTimeReportChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  chartKey: PropTypes.number,
  videoRealTimeData: PropTypes.array.isRequired
}

module.exports = {
  VideoReportChart: VideoReportChart,
  VideoCheckCustomChart: VideoCheckCustomChart,
  VideoOnlineTrendsChart: VideoOnlineTrendsChart,
  VideoOfflineReportChart: VideoOfflineReportChart,
  VideoMediaLossReportChart: VideoMediaLossReportChart,
  VideoLossChart: VideoLossChart,
  VideoRealTimeReportChart: VideoRealTimeReportChart
};
