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

var dvrDailyReportChart, dvrWeeklyReportChart, dvrMonthlyReportChart, dvrQuarterlyReportChart, dvrYearlyReportChart, dvrCustomReportChart;
var nvrDailyReportChart, nvrWeeklyReportChart, nvrMonthlyReportChart, nvrQuarterlyReportChart, nvrYearlyReportChart, nvrCustomReportChart;
var encoderDailyReportChart, encoderWeeklyReportChart, encoderMonthlyReportChart, encoderQuarterlyReportChart, encoderYearlyReportChart, encoderCustomReportChart;
var serverDailyReportChart, serverWeeklyReportChart, serverMonthlyReportChart, serverQuarterlyReportChart, serverYearlyReportChart, serverCustomReportChart;
var networkDailyReportChart, networkWeeklyReportChart, networkMonthlyReportChart, networkQuarterlyReportChart, networkYearlyReportChart, networkCustomReportChart;
var firewallDailyReportChart, firewallWeeklyReportChart, firewallMonthlyReportChart, firewallQuarterlyReportChart, firewallYearlyReportChart, firewallCustomReportChart;
var databaseDailyReportChart, databaseWeeklyReportChart, databaseMonthlyReportChart, databaseQuarterlyReportChart, databaseYearlyReportChart, databaseCustomReportChart;

var DVRReportChart = React.createClass({
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
      var chartTitle = "DVR统计";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();

      switch (chartId) {
          case "dvrDailyReportChart":
              chartTitle = "DVR统计日报"+this.props.reportdate;
              break;
          case "dvrWeeklyReportChart":
              chartTitle = "DVR统计周报"+this.props.reportdate;
              break;
          case "dvrMonthlyReportChart":
              var strMonth = "";
              if(this.props.reportdate != ""){
                strMonth = this.props.reportdate;
                strMonth = strMonth.substring(0,7);
              };
              chartTitle = "DVR统计月报"+strMonth;
              break;
          case "dvrQuarterlyReportChart":
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
              chartTitle = "DVR统计季报"+DateChange.getLastQuarter(objYear,currentjdcs);
              break;
          case "dvrYearlyReportChart":
              chartTitle = "DVR统计年报"+objYear;
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
            data:['']
        },
        xAxis : [
            {
                type : 'category',
                data : ['总数','在线数','完好数']
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
                  chartData = this.props.dvrStorageDailyData;
                  break;
                case 2:
                  chartData = this.props.dvrStorageWeeklyData;
                  break;
                case 3:
                  chartData = this.props.dvrStorageMonthlyData;
                  break;
                case 4:
                  chartData = this.props.dvrStorageQuarterlyData;
                  break;
                case 5:
                  chartData = this.props.dvrStorageYearlyData;
                  break;
                case 6:
                  chartData = this.props.dvrStorageCustomData;
                  break;
                default:
              }
              var data = chartData[0];
              if (data && data.total) {
                d.push(data.total);
                d.push(data.onlinecount);
                d.push(data.intactcount);
              }
              return d;
            }.bind(this))()
          }
        ]
      };

      switch (chartId) {
          case "dvrDailyReportChart":
              dvrDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dvrDailyReportChart.setOption(option);
              break;
          case "dvrWeeklyReportChart":
              dvrWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dvrWeeklyReportChart.setOption(option);
              break;
          case "dvrMonthlyReportChart":
              dvrMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dvrMonthlyReportChart.setOption(option);
              break;
          case "dvrQuarterlyReportChart":
              dvrQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dvrQuarterlyReportChart.setOption(option);
              break;
          case "dvrYearlyReportChart":
              dvrYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dvrYearlyReportChart.setOption(option);
              break;
      };
      $(window).resize(function(){
          dvrDailyReportChart.resize();
          dvrWeeklyReportChart.resize();
          dvrMonthlyReportChart.resize();
          dvrQuarterlyReportChart.resize();
          dvrYearlyReportChart.resize();
      })
    }
});

var DVRCustomReportChart = React.createClass({
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
      dvrCustomReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      var chartTitle = "DVR统计报表";
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
        dataZoom: {
            show: true,
            start : 30,
            end : 100
        },
        legend: {
            data:['在线率']
        },
        xAxis : [
            {
                type : 'time',
                // boundaryGap : false,
                splitNumber:10
                // ,
                // axisLabel: {
                //   interval: 0,
                //   formatter: function(value){
                //     var val = '';
                //     var date = new Date(value);
                //     var year = date.getFullYear();
                //     if (year == 1970) {
                //       val = '';
                //     }else {
                //       val = date.getFullYear() + '-' + (date.getMonth() + 1) + '-'	+ date.getDate();
                //     }
                //     return val;
                //   }
                // }
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
						var customData = this.props.dvrStorageCustomData;
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
            // console.log(d);
						return d;
					}.bind(this))()
          }
        ]
      };

      dvrCustomReportChart.setOption(option);
      $(window).resize(function(){
          dvrCustomReportChart.resize();
      })
    },

});

var NVRReportChart = React.createClass({
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
          <div id={this.props.chartId} style={{height:"320px",width:"98%",paddingLeft:"1%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      var chartTitle = "NVR统计";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartId) {
          case "nvrDailyReportChart":
              chartTitle = "NVR统计日报"+this.props.reportdate;
              break;
          case "nvrWeeklyReportChart":
              chartTitle = "NVR统计周报"+this.props.reportdate;
              break;
          case "nvrMonthlyReportChart":
              var strMonth = "";
              if(this.props.reportdate != ""){
                strMonth = this.props.reportdate;
                strMonth = strMonth.substring(0,7);
              };
              chartTitle = "NVR统计月报"+strMonth;
              break;
          case "nvrQuarterlyReportChart":
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
              chartTitle = "NVR统计季报"+DateChange.getLastQuarter(objYear,currentjdcs);
              break;
          case "nvrYearlyReportChart":
              chartTitle = "NVR统计年报"+objYear;
              break;
      };
      //市级
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
              data : ['总数','在线数','完好数']
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
                  chartData = this.props.nvrStorageDailyData;
                  break;
                  case 2:
                  chartData = this.props.nvrStorageWeeklyData;
                  break;
                  case 3:
                  chartData = this.props.nvrStorageMonthlyData;
                  break;
                  case 4:
                  chartData = this.props.nvrStorageQuarterlyData;
                  break;
                  case 5:
                  chartData = this.props.nvrStorageYearlyData;
                  break;
                  case 6:
                  chartData = this.props.nvrStorageCustomData;
                  break;
                  default:
                }
                var data = chartData[0];
                if (data && data.total) {
                  d.push(data.total);
                  d.push(data.onlinecount);
                  d.push(data.intactcount);
                }
                return d;
              }.bind(this))()
            }
          ]
        };

      switch (chartId) {
          case "nvrDailyReportChart":
              nvrDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              nvrDailyReportChart.setOption(option);
              break;
          case "nvrWeeklyReportChart":
              nvrWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              nvrWeeklyReportChart.setOption(option);
              break;
          case "nvrMonthlyReportChart":
              nvrMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              nvrMonthlyReportChart.setOption(option);
              break;
          case "nvrQuarterlyReportChart":
              nvrQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              nvrQuarterlyReportChart.setOption(option);
              break;
          case "nvrYearlyReportChart":
              nvrYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              nvrYearlyReportChart.setOption(option);
              break;
      }

      $(window).resize(function(){
          nvrDailyReportChart.resize();
          nvrWeeklyReportChart.resize();
          nvrMonthlyReportChart.resize();
          nvrQuarterlyReportChart.resize();
          nvrYearlyReportChart.resize();
      })
    },

});

var NVRCustomReportChart = React.createClass({
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
      nvrCustomReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      var chartTitle = "NVR统计报表";
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
        dataZoom: {
            show: true,
            start : 30,
            end : 100
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
						var customData = this.props.nvrStorageCustomData;
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
            // console.log(d);
						return d;
					}.bind(this))()
          }
        ]
      };

      nvrCustomReportChart.setOption(option);
      $(window).resize(function(){
          nvrCustomReportChart.resize();
      })
    },

});

var EncoderReportChart = React.createClass({
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
          <div id={this.props.chartId} style={{height:"320px",width:"98%",paddingLeft:"1%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      var chartTitle = "编码器统计";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartId) {
          case "encoderDailyReportChart":
              chartTitle = "编码器统计日报"+this.props.reportdate;
              break;
          case "encoderWeeklyReportChart":
              chartTitle = "编码器统计周报"+this.props.reportdate;
              break;
          case "encoderMonthlyReportChart":
              var strMonth = "";
              if(this.props.reportdate != ""){
                strMonth = this.props.reportdate;
                strMonth = strMonth.substring(0,7);
              };
              chartTitle = "编码器统计月报"+strMonth;
              break;
          case "encoderQuarterlyReportChart":
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
              chartTitle = "编码器统计季报"+DateChange.getLastQuarter(objYear,currentjdcs);
              break;
          case "encoderYearlyReportChart":
              chartTitle = "编码器统计年报"+objYear;
              break;
      };
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
                data : ['总数','在线数','完好数']
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
                  chartData = this.props.encoderStorageDailyData;
                  break;
                case 2:
                  chartData = this.props.encoderStorageWeeklyData;
                  break;
                case 3:
                  chartData = this.props.encoderStorageMonthlyData;
                  break;
                case 4:
                  chartData = this.props.encoderStorageQuarterlyData;
                  break;
                case 5:
                  chartData = this.props.encoderStorageYearlyData;
                  break;
                case 6:
                  chartData = this.props.encoderStorageCustomData;
                  break;
                default:
              }
              var data = chartData[0];
              if (data && data.total) {
                d.push(data.total);
                d.push(data.onlinecount);
                d.push(data.intactcount);
              }
              return d;
            }.bind(this))()
          }
        ]
      };

      switch (chartId) {
          case "encoderDailyReportChart":
              encoderDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              encoderDailyReportChart.setOption(option);
              break;
          case "encoderWeeklyReportChart":
              encoderWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              encoderWeeklyReportChart.setOption(option);
              break;
          case "encoderMonthlyReportChart":
              encoderMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              encoderMonthlyReportChart.setOption(option);
              break;
          case "encoderQuarterlyReportChart":
              encoderQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              encoderQuarterlyReportChart.setOption(option);
              break;
          case "encoderYearlyReportChart":
              encoderYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              encoderYearlyReportChart.setOption(option);
              break;
      }

      $(window).resize(function(){
          encoderDailyReportChart.resize();
          encoderWeeklyReportChart.resize();
          encoderMonthlyReportChart.resize();
          encoderQuarterlyReportChart.resize();
          encoderYearlyReportChart.resize();
      })
    },

});

var EncoderCustomReportChart = React.createClass({
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
      encoderCustomReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      var chartTitle = "编码器统计报表";
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
        dataZoom: {
            show: true,
            start : 30,
            end : 100
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
						var customData = this.props.encoderStorageCustomData;
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
            // console.log(d);
						return d;
					}.bind(this))()
          }
        ]
      };

      encoderCustomReportChart.setOption(option);
      $(window).resize(function(){
          encoderCustomReportChart.resize();
      })
    },

});

var ServerReportChart = React.createClass({
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
          <div id={this.props.chartId} style={{height:"320px",width:"98%",paddingLeft:"1%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      var chartTitle = "服务器统计";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartId) {
          case "serverDailyReportChart":
              chartTitle = "服务器统计日报"+this.props.reportdate;
              break;
          case "serverWeeklyReportChart":
              chartTitle = "服务器统计周报"+this.props.reportdate;
              break;
          case "serverMonthlyReportChart":
              var strMonth = "";
              if(this.props.reportdate != ""){
                strMonth = this.props.reportdate;
                strMonth = strMonth.substring(0,7);
              };
              chartTitle = "服务器统计月报"+strMonth;
              break;
          case "serverQuarterlyReportChart":
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
              chartTitle = "服务器统计季报"+DateChange.getLastQuarter(objYear,currentjdcs);
              break;
          case "serverYearlyReportChart":
              chartTitle = "服务器统计年报"+objYear;
              break;
      };
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
                data : ['总数','在线数','完好数']
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
                  chartData = this.props.serverDailyData;
                  break;
                case 2:
                  chartData = this.props.serverWeeklyData;
                  break;
                case 3:
                  chartData = this.props.serverMonthlyData;
                  break;
                case 4:
                  chartData = this.props.serverQuarterlyData;
                  break;
                case 5:
                  chartData = this.props.serverYearlyData;
                  break;
                case 6:
                  chartData = this.props.serverCustomData;
                  break;
                default:
              }
              var data = chartData[0];
              if (data && data.total) {
                d.push(data.total);
                d.push(data.onlinecount);
                d.push(data.intactcount);
              }
              return d;
            }.bind(this))()
          }
        ]
      };

      switch (chartId) {
          case "serverDailyReportChart":
              serverDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              serverDailyReportChart.setOption(option);
              break;
          case "serverWeeklyReportChart":
              serverWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              serverWeeklyReportChart.setOption(option);
              break;
          case "serverMonthlyReportChart":
              serverMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              serverMonthlyReportChart.setOption(option);
              break;
          case "serverQuarterlyReportChart":
              serverQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              serverQuarterlyReportChart.setOption(option);
              break;
          case "serverYearlyReportChart":
              serverYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              serverYearlyReportChart.setOption(option);
              break;
      }

      $(window).resize(function(){
          serverDailyReportChart.resize();
          serverWeeklyReportChart.resize();
          serverMonthlyReportChart.resize();
          serverQuarterlyReportChart.resize();
          serverYearlyReportChart.resize();
      })
    },

});

var ServerCustomReportChart = React.createClass({
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
      serverCustomReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      var chartTitle = "服务器统计报表";
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
        dataZoom: {
            show: true,
            start : 30,
            end : 100
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
						var customData = this.props.serverCustomData;
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
            // console.log(d);
						return d;
					}.bind(this))()
          }
        ]
      };

      serverCustomReportChart.setOption(option);
      $(window).resize(function(){
          serverCustomReportChart.resize();
      })
    },

});

var NetworkReportChart = React.createClass({
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
          <div id={this.props.chartId} style={{height:"320px",width:"98%",paddingLeft:"1%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      var chartTitle = "网络设备统计";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartId) {
          case "networkDailyReportChart":
              chartTitle = "网络设备统计日报"+this.props.reportdate;
              break;
          case "networkWeeklyReportChart":
              chartTitle = "网络设备统计周报"+this.props.reportdate;
              break;
          case "networkMonthlyReportChart":
              var strMonth = "";
              if(this.props.reportdate != ""){
                strMonth = this.props.reportdate;
                strMonth = strMonth.substring(0,7);
              };
              chartTitle = "网络设备统计月报"+strMonth;
              break;
          case "networkQuarterlyReportChart":
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
              chartTitle = "网络设备统计季报"+DateChange.getLastQuarter(objYear,currentjdcs);
              break;
          case "networkYearlyReportChart":
              chartTitle = "网络设备统计年报"+objYear;
              break;
      };
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
                data : ['总数','在线数','完好数']
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
                  chartData = this.props.networkDailyData;
                  break;
                case 2:
                  chartData = this.props.networkWeeklyData;
                  break;
                case 3:
                  chartData = this.props.networkMonthlyData;
                  break;
                case 4:
                  chartData = this.props.networkQuarterlyData;
                  break;
                case 5:
                  chartData = this.props.networkYearlyData;
                  break;
                case 6:
                  chartData = this.props.networkCustomData;
                  break;
                default:
              }
              var data = chartData[0];
              if (data && data.total) {
                d.push(data.total);
                d.push(data.onlinecount);
                d.push(data.intactcount);
              }
              return d;
            }.bind(this))()
          }
        ]
      };

      switch (chartId) {
          case "networkDailyReportChart":
              networkDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              networkDailyReportChart.setOption(option);
              break;
          case "networkWeeklyReportChart":
              networkWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              networkWeeklyReportChart.setOption(option);
              break;
          case "networkMonthlyReportChart":
              networkMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              networkMonthlyReportChart.setOption(option);
              break;
          case "networkQuarterlyReportChart":
              networkQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              networkQuarterlyReportChart.setOption(option);
              break;
          case "networkYearlyReportChart":
              networkYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              networkYearlyReportChart.setOption(option);
              break;
      }

      $(window).resize(function(){
          networkDailyReportChart.resize();
          networkWeeklyReportChart.resize();
          networkMonthlyReportChart.resize();
          networkQuarterlyReportChart.resize();
          networkYearlyReportChart.resize();
      })
    },

});

var NetworkCustomReportChart = React.createClass({
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
      networkCustomReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      var chartTitle = "网络设备统计报表";
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
        dataZoom: {
            show: true,
            start : 30,
            end : 100
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
						var customData = this.props.networkCustomData;
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
            // console.log(d);
						return d;
					}.bind(this))()
          }
        ]
      };

      networkCustomReportChart.setOption(option);
      $(window).resize(function(){
          networkCustomReportChart.resize();
      })
    },

});

var FirewallReportChart = React.createClass({
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
          <div id={this.props.chartId} style={{height:"320px",width:"98%",paddingLeft:"1%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      var chartTitle = "防火墙统计";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartId) {
          case "firewallDailyReportChart":
              chartTitle = "防火墙统计日报"+this.props.reportdate;
              break;
          case "firewallWeeklyReportChart":
              chartTitle = "防火墙统计周报"+this.props.reportdate;
              break;
          case "firewallMonthlyReportChart":
              var strMonth = "";
              if(this.props.reportdate != ""){
                strMonth = this.props.reportdate;
                strMonth = strMonth.substring(0,7);
              };
              chartTitle = "防火墙统计月报"+strMonth;
              break;
          case "firewallQuarterlyReportChart":
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
              chartTitle = "防火墙统计季报"+DateChange.getLastQuarter(objYear,currentjdcs);
              break;
          case "firewallYearlyReportChart":
              chartTitle = "防火墙统计年报"+objYear;
              break;
      };
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
                data : ['总数','在线数','完好数']
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
                  chartData = this.props.firewallDailyData;
                  break;
                case 2:
                  chartData = this.props.firewallWeeklyData;
                  break;
                case 3:
                  chartData = this.props.firewallMonthlyData;
                  break;
                case 4:
                  chartData = this.props.firewallQuarterlyData;
                  break;
                case 5:
                  chartData = this.props.firewallYearlyData;
                  break;
                case 6:
                  chartData = this.props.firewallCustomData;
                  break;
                default:
              }
              var data = chartData[0];
              if (data && data.total) {
                d.push(data.total);
                d.push(data.onlinecount);
                d.push(data.intactcount);
              }
              return d;
            }.bind(this))()
          }
        ]
      };

      switch (chartId) {
          case "firewallDailyReportChart":
              firewallDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              firewallDailyReportChart.setOption(option);
              break;
          case "firewallWeeklyReportChart":
              firewallWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              firewallWeeklyReportChart.setOption(option);
              break;
          case "firewallMonthlyReportChart":
              firewallMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              firewallMonthlyReportChart.setOption(option);
              break;
          case "firewallQuarterlyReportChart":
              firewallQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              firewallQuarterlyReportChart.setOption(option);
              break;
          case "firewallYearlyReportChart":
              firewallYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              firewallYearlyReportChart.setOption(option);
              break;
      }

      $(window).resize(function(){
          firewallDailyReportChart.resize();
          firewallWeeklyReportChart.resize();
          firewallMonthlyReportChart.resize();
          firewallQuarterlyReportChart.resize();
          firewallYearlyReportChart.resize();
      })
    },

});

var FirewallCustomReportChart = React.createClass({
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
      firewallCustomReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      var chartTitle = "防火墙统计报表";
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
        dataZoom: {
            show: true,
            start : 30,
            end : 100
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
						var customData = this.props.firewallCustomData;
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
            // console.log(d);
						return d;
					}.bind(this))()
          }
        ]
      };

      firewallCustomReportChart.setOption(option);
      $(window).resize(function(){
          firewallCustomReportChart.resize();
      })
    },

});

var DatabaseReportChart = React.createClass({
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
          <div id={this.props.chartId} style={{height:"320px",width:"98%",paddingLeft:"1%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      var chartTitle = "数据库统计";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartId) {
          case "databaseDailyReportChart":
              chartTitle = "数据库统计日报"+this.props.reportdate;
              break;
          case "databaseWeeklyReportChart":
              chartTitle = "数据库统计周报"+this.props.reportdate;
              break;
          case "databaseMonthlyReportChart":
              var strMonth = "";
              if(this.props.reportdate != ""){
                strMonth = this.props.reportdate;
                strMonth = strMonth.substring(0,7);
              };
              chartTitle = "数据库统计月报"+strMonth;
              break;
          case "databaseQuarterlyReportChart":
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
              chartTitle = "数据库统计季报"+DateChange.getLastQuarter(objYear,currentjdcs);
              break;
          case "databaseYearlyReportChart":
              chartTitle = "数据库统计年报"+objYear;
              break;
      };
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
                data : ['总数','在线数','完好数']
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
                  chartData = this.props.databaseDailyData;
                  break;
                case 2:
                  chartData = this.props.databaseWeeklyData;
                  break;
                case 3:
                  chartData = this.props.databaseMonthlyData;
                  break;
                case 4:
                  chartData = this.props.databaseQuarterlyData;
                  break;
                case 5:
                  chartData = this.props.databaseYearlyData;
                  break;
                case 6:
                  chartData = this.props.databaseCustomData;
                  break;
                default:
              }
              var data = chartData[0];
              if (data && data.total) {
                d.push(data.total);
                d.push(data.onlinecount);
                d.push(data.intactcount);
              }
              return d;
            }.bind(this))()
          }
        ]
      };

      switch (chartId) {
          case "databaseDailyReportChart":
              databaseDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              databaseDailyReportChart.setOption(option);
              break;
          case "databaseWeeklyReportChart":
              databaseWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              databaseWeeklyReportChart.setOption(option);
              break;
          case "databaseMonthlyReportChart":
              databaseMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              databaseMonthlyReportChart.setOption(option);
              break;
          case "databaseQuarterlyReportChart":
              databaseQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              databaseQuarterlyReportChart.setOption(option);
              break;
          case "databaseYearlyReportChart":
              databaseYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              databaseYearlyReportChart.setOption(option);
              break;
      }

      $(window).resize(function(){
          databaseDailyReportChart.resize();
          databaseWeeklyReportChart.resize();
          databaseMonthlyReportChart.resize();
          databaseQuarterlyReportChart.resize();
          databaseYearlyReportChart.resize();
      })
    },

});

var DatabaseCustomReportChart = React.createClass({
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
      databaseCustomReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      var chartTitle = "数据库统计报表";
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
        dataZoom: {
            show: true,
            start : 30,
            end : 100
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
						var customData = this.props.databaseCustomData;
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
            // console.log(d);
						return d;
					}.bind(this))()
          }
        ]
      };

      databaseCustomReportChart.setOption(option);
      $(window).resize(function(){
          databaseCustomReportChart.resize();
      })
    },

});

DVRReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    reportdate: PropTypes.string.isRequired,
    dvrStorageDailyData: PropTypes.array.isRequired,
    dvrStorageWeeklyData: PropTypes.array.isRequired,
    dvrStorageMonthlyData: PropTypes.array.isRequired,
    dvrStorageQuarterlyData: PropTypes.array.isRequired,
    dvrStorageYearlyData: PropTypes.array.isRequired,
    dvrStorageCustomData: PropTypes.array.isRequired
}
DVRCustomReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    dvrStorageCustomData: PropTypes.array.isRequired
}
NVRReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    reportdate: PropTypes.string.isRequired,
    nvrStorageDailyData: PropTypes.array.isRequired,
    nvrStorageWeeklyData: PropTypes.array.isRequired,
    nvrStorageMonthlyData: PropTypes.array.isRequired,
    nvrStorageQuarterlyData: PropTypes.array.isRequired,
    nvrStorageYearlyData: PropTypes.array.isRequired,
    nvrStorageCustomData: PropTypes.array.isRequired
}
NVRCustomReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    nvrStorageCustomData: PropTypes.array.isRequired
}
EncoderReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    reportdate: PropTypes.string.isRequired,
    encoderStorageDailyData: PropTypes.array.isRequired,
    encoderStorageWeeklyData: PropTypes.array.isRequired,
    encoderStorageMonthlyData: PropTypes.array.isRequired,
    encoderStorageQuarterlyData: PropTypes.array.isRequired,
    encoderStorageYearlyData: PropTypes.array.isRequired,
    encoderStorageCustomData: PropTypes.array.isRequired
}
EncoderCustomReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    encoderStorageCustomData: PropTypes.array.isRequired
}
ServerReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    reportdate: PropTypes.string.isRequired,
    serverDailyData: PropTypes.array.isRequired,
    serverWeeklyData: PropTypes.array.isRequired,
    serverMonthlyData: PropTypes.array.isRequired,
    serverQuarterlyData: PropTypes.array.isRequired,
    serverYearlyData: PropTypes.array.isRequired,
    serverCustomData: PropTypes.array.isRequired
}
ServerCustomReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    serverCustomData: PropTypes.array.isRequired
}
NetworkReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    reportdate: PropTypes.string.isRequired,
    networkDailyData: PropTypes.array.isRequired,
    networkWeeklyData: PropTypes.array.isRequired,
    networkMonthlyData: PropTypes.array.isRequired,
    networkQuarterlyData: PropTypes.array.isRequired,
    networkYearlyData: PropTypes.array.isRequired,
    networkCustomData: PropTypes.array.isRequired
}
NetworkCustomReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    networkCustomData: PropTypes.array.isRequired
}
FirewallReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    reportdate: PropTypes.string.isRequired,
    firewallDailyData: PropTypes.array.isRequired,
    firewallWeeklyData: PropTypes.array.isRequired,
    firewallMonthlyData: PropTypes.array.isRequired,
    firewallQuarterlyData: PropTypes.array.isRequired,
    firewallYearlyData: PropTypes.array.isRequired,
    firewallCustomData: PropTypes.array.isRequired
}
FirewallCustomReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    firewallCustomData: PropTypes.array.isRequired
}
DatabaseReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    reportdate: PropTypes.string.isRequired,
    databaseDailyData: PropTypes.array.isRequired,
    databaseWeeklyData: PropTypes.array.isRequired,
    databaseMonthlyData: PropTypes.array.isRequired,
    databaseQuarterlyData: PropTypes.array.isRequired,
    databaseYearlyData: PropTypes.array.isRequired,
    databaseCustomData: PropTypes.array.isRequired
}
DatabaseCustomReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    databaseCustomData: PropTypes.array.isRequired
}

module.exports = {
  DVRReportChart: DVRReportChart,
  DVRCustomReportChart: DVRCustomReportChart,
  NVRReportChart: NVRReportChart,
  NVRCustomReportChart: NVRCustomReportChart,
  EncoderReportChart: EncoderReportChart,
  EncoderCustomReportChart: EncoderCustomReportChart,
  ServerReportChart: ServerReportChart,
  ServerCustomReportChart: ServerCustomReportChart,
  NetworkReportChart: NetworkReportChart,
  NetworkCustomReportChart: NetworkCustomReportChart,
  FirewallReportChart: FirewallReportChart,
  FirewallCustomReportChart: FirewallCustomReportChart,
  DatabaseReportChart: DatabaseReportChart,
  DatabaseCustomReportChart: DatabaseCustomReportChart,
};
