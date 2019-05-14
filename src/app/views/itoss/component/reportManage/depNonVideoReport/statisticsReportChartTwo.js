/**
 * Created by xuexue.yin on 2016/02/22.
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
var Util = require('./util');
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
          _this._getDailyReportChart();
        },400);
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
      var chartKey = this.props.chartKey;
      var chartData = [];
      var chartTitle = "DVR统计报表";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartKey) {
        case 1:
          chartData = this.props.dvrStorageDailyData;
          chartTitle = "DVR统计日报"+this.props.reportdate;
          break;
        case 2:
          chartData = this.props.dvrStorageWeeklyData;
          chartTitle = "DVR统计周报"+this.props.reportdate;
          break;
        case 3:
          chartData = this.props.dvrStorageMonthlyData;
          var strMonth = "";
          if(this.props.reportdate != ""){
            strMonth = this.props.reportdate;
            strMonth = strMonth.substring(0,7);
          };
          chartTitle = "DVR统计月报"+strMonth;
          break;
        case 4:
          chartData = this.props.dvrStorageQuarterlyData;
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
        case 5:
          chartData = this.props.dvrStorageYearlyData;
          chartTitle = "DVR统计年报"+objYear;
          break;
        case 6:
          chartData = this.props.dvrStorageCustomData;
          break;
        default:
      }
      var data = chartData;
      var option = Util.getDiZhouJiView("DVR",data,chartTitle);
      switch (chartId) {
          case "dvrDailyReportChartTwo":
              dvrDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dvrDailyReportChart.setOption(option);
              break;
          case "dvrWeeklyReportChartTwo":
              dvrWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dvrWeeklyReportChart.setOption(option);
              break;
          case "dvrMonthlyReportChartTwo":
              dvrMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dvrMonthlyReportChart.setOption(option);
              break;
          case "dvrQuarterlyReportChartTwo":
              dvrQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dvrQuarterlyReportChart.setOption(option);
              break;
          case "dvrYearlyReportChartTwo":
              dvrYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dvrYearlyReportChart.setOption(option);
              break;
      }
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
          _this._getDailyReportChart();
        },400);
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
      var customData = this.props.dvrStorageCustomLineData;
      var chartTitle = "DVR统计报表";
      var option = Util.getDiZhouJiCustomView("DVR",customData,chartTitle);
      dvrCustomReportChart.setOption(option);
      $(window).resize(function(){
          dvrCustomReportChart.resize();
      })
    }

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
          _this._getDailyReportChart();
        },400);
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
      var chartKey = this.props.chartKey;
      var chartTitle = "NVR统计报表"
      var chartData = [];
      switch (chartKey) {
        case 1:
          chartData = this.props.nvrStorageDailyData;
          chartTitle = "NVR统计日报"+this.props.reportdate;
          break;
        case 2:
          chartData = this.props.nvrStorageWeeklyData;
          chartTitle = "NVR统计周报"+this.props.reportdate;
          break;
        case 3:
          chartData = this.props.nvrStorageMonthlyData;
          var strMonth = "";
          if(this.props.reportdate != ""){
            strMonth = this.props.reportdate;
            strMonth = strMonth.substring(0,7);
          };
          chartTitle = "NVR统计月报"+strMonth;
          break;
        case 4:
          chartData = this.props.nvrStorageQuarterlyData;
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
        case 5:
          chartData = this.props.nvrStorageYearlyData;
          chartTitle = "NVR统计年报"+objYear;
          break;
        case 6:
          chartData = this.props.nvrStorageCustomData;
          break;
        default:
      }
      var data = chartData;
      var option = Util.getDiZhouJiView("NVR",data,chartTitle);

      switch (chartId) {
          case "nvrDailyReportChartTwo":
              nvrDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              nvrDailyReportChart.setOption(option);
              break;
          case "nvrWeeklyReportChartTwo":
              nvrWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              nvrWeeklyReportChart.setOption(option);
              break;
          case "nvrMonthlyReportChartTwo":
              nvrMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              nvrMonthlyReportChart.setOption(option);
              break;
          case "nvrQuarterlyReportChartTwo":
              nvrQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              nvrQuarterlyReportChart.setOption(option);
              break;
          case "nvrYearlyReportChartTwo":
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
          _this._getDailyReportChart();
        },400);
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
      var customData = this.props.nvrStorageCustomLineData;
      var chartTitle = "NVR统计报表";
      var option = Util.getDiZhouJiCustomView("NVR",customData,chartTitle);
      nvrCustomReportChart.setOption(option);
      $(window).resize(function(){
          nvrCustomReportChart.resize();
      })
    }
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
          _this._getDailyReportChart();
        },400);
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
      var chartKey = this.props.chartKey;
      var chartData = [];
      var chartTitle = "编码器统计报表";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartKey) {
        case 1:
          chartData = this.props.encoderStorageDailyData;
          chartTitle = "编码器统计日报"+this.props.reportdate;
          break;
        case 2:
          chartData = this.props.encoderStorageWeeklyData;
          chartTitle = "编码器统计周报"+this.props.reportdate;
          break;
        case 3:
          chartData = this.props.encoderStorageMonthlyData;
          var strMonth = "";
          if(this.props.reportdate != ""){
            strMonth = this.props.reportdate;
            strMonth = strMonth.substring(0,7);
          };
          chartTitle = "编码器统计月报"+strMonth;
          break;
        case 4:
          chartData = this.props.encoderStorageQuarterlyData;
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
        case 5:
          chartData = this.props.encoderStorageYearlyData;
          chartTitle = "编码器统计年报"+objYear;
          break;
        case 6:
          chartData = this.props.encoderStorageCustomData;
          break;
        default:
      }
      var data = chartData;
      var option = Util.getDiZhouJiView("编码器",data,chartTitle);
      switch (chartId) {
          case "encoderDailyReportChartTwo":
              encoderDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              encoderDailyReportChart.setOption(option);
              break;
          case "encoderWeeklyReportChartTwo":
              encoderWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              encoderWeeklyReportChart.setOption(option);
              break;
          case "encoderMonthlyReportChartTwo":
              encoderMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              encoderMonthlyReportChart.setOption(option);
              break;
          case "encoderQuarterlyReportChartTwo":
              encoderQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              encoderQuarterlyReportChart.setOption(option);
              break;
          case "encoderYearlyReportChartTwo":
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
    }
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
          _this._getDailyReportChart();
        },400);
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
      var customData = this.props.encoderStorageCustomLineData;
      var chartTitle = "编码器统计报表";
      var option = Util.getDiZhouJiCustomView("编码器",customData,chartTitle);
      encoderCustomReportChart.setOption(option);
      $(window).resize(function(){
          encoderCustomReportChart.resize();
      })
    }

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
          _this._getDailyReportChart();
        },400);
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
      var chartKey = this.props.chartKey;
      var chartData = [];
      var chartTitle = "服务器统计报表";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartKey) {
        case 1:
          chartData = this.props.serverDailyData;
          chartTitle = "服务器统计日报"+this.props.reportdate;
          break;
        case 2:
          chartData = this.props.serverWeeklyData;
          chartTitle = "服务器统计周报"+this.props.reportdate;
          break;
        case 3:
          chartData = this.props.serverMonthlyData;
          var strMonth = "";
          if(this.props.reportdate != ""){
            strMonth = this.props.reportdate;
            strMonth = strMonth.substring(0,7);
          };
          chartTitle = "服务器统计月报"+strMonth;
          break;
        case 4:
          chartData = this.props.serverQuarterlyData;
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
        case 5:
          chartData = this.props.serverYearlyData;
          chartTitle = "服务器统计年报"+objYear;
          break;
        case 6:
          chartData = this.props.serverCustomData;
          break;
        default:
      }
      var data = chartData;
      var option = Util.getDiZhouJiView("服务器",data,chartTitle);
      switch (chartId) {
          case "serverDailyReportChartTwo":
              serverDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              serverDailyReportChart.setOption(option);
              break;
          case "serverWeeklyReportChartTwo":
              serverWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              serverWeeklyReportChart.setOption(option);
              break;
          case "serverMonthlyReportChartTwo":
              serverMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              serverMonthlyReportChart.setOption(option);
              break;
          case "serverQuarterlyReportChartTwo":
              serverQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              serverQuarterlyReportChart.setOption(option);
              break;
          case "serverYearlyReportChartTwo":
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
    }
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
          _this._getDailyReportChart();
        },400);
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
      var customData = this.props.serverCustomLineData;
      var chartTitle = "服务器统计报表";
      var option = Util.getDiZhouJiCustomView("服务器",customData,chartTitle);
      serverCustomReportChart.setOption(option);
      $(window).resize(function(){
          serverCustomReportChart.resize();
      })
    }

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
          _this._getDailyReportChart();
        },400);
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
      var chartKey = this.props.chartKey;
      var chartData = [];
      var chartTitle = "网络设备统计报表";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartKey) {
        case 1:
          chartData = this.props.networkDailyData;
          chartTitle = "网络设备统计日报"+this.props.reportdate;
          break;
        case 2:
          chartData = this.props.networkWeeklyData;
          chartTitle = "网络设备统计周报"+this.props.reportdate;
          break;
        case 3:
          chartData = this.props.networkMonthlyData;
          var strMonth = "";
          if(this.props.reportdate != ""){
            strMonth = this.props.reportdate;
            strMonth = strMonth.substring(0,7);
          };
          chartTitle = "网络设备统计月报"+strMonth;
          break;
        case 4:
          chartData = this.props.networkQuarterlyData;
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
        case 5:
          chartData = this.props.networkYearlyData;
          chartTitle = "网络设备统计年报"+objYear;
          break;
        case 6:
          chartData = this.props.networkCustomData;
          break;
        default:
      };
      var data = chartData;
      var option = Util.getDiZhouJiView("网络设备",data,chartTitle);
      switch (chartId) {
          case "networkDailyReportChartTwo":
              networkDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              networkDailyReportChart.setOption(option);
              break;
          case "networkWeeklyReportChartTwo":
              networkWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              networkWeeklyReportChart.setOption(option);
              break;
          case "networkMonthlyReportChartTwo":
              networkMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              networkMonthlyReportChart.setOption(option);
              break;
          case "networkQuarterlyReportChartTwo":
              networkQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              networkQuarterlyReportChart.setOption(option);
              break;
          case "networkYearlyReportChartTwo":
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
    }
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
          _this._getDailyReportChart();
        },400);
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
      var customData = this.props.networkCustomLineData;
      var chartTitle = "网络设备统计报表";
      var option = Util.getDiZhouJiCustomView("网络设备",customData,chartTitle);
      networkCustomReportChart.setOption(option);
      $(window).resize(function(){
          networkCustomReportChart.resize();
      })
    }

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
          _this._getDailyReportChart();
        },400);
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
      var chartKey = this.props.chartKey;
      var chartData = [];
      var chartTitle = "防火墙统计报表";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartKey) {
        case 1:
          chartData = this.props.firewallDailyData;
          chartTitle = "防火墙统计日报"+this.props.reportdate;
          break;
        case 2:
          chartData = this.props.firewallWeeklyData;
          chartTitle = "防火墙统计周报"+this.props.reportdate;
          break;
        case 3:
          chartData = this.props.firewallMonthlyData;
          var strMonth = "";
          if(this.props.reportdate != ""){
            strMonth = this.props.reportdate;
            strMonth = strMonth.substring(0,7);
          };
          chartTitle = "防火墙统计月报"+strMonth;
          break;
        case 4:
          chartData = this.props.firewallQuarterlyData;
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
        case 5:
          chartData = this.props.firewallYearlyData;
          chartTitle = "防火墙统计年报"+objYear;
          break;
        case 6:
          chartData = this.props.firewallCustomData;
          break;
        default:
      }
      var data = chartData;
      var option = Util.getDiZhouJiView("防火墙",data,chartTitle);
      switch (chartId) {
          case "firewallDailyReportChartTwo":
              firewallDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              firewallDailyReportChart.setOption(option);
              break;
          case "firewallWeeklyReportChartTwo":
              firewallWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              firewallWeeklyReportChart.setOption(option);
              break;
          case "firewallMonthlyReportChartTwo":
              firewallMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              firewallMonthlyReportChart.setOption(option);
              break;
          case "firewallQuarterlyReportChartTwo":
              firewallQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              firewallQuarterlyReportChart.setOption(option);
              break;
          case "firewallYearlyReportChartTwo":
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
    }
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
          _this._getDailyReportChart();
        },400);
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
      var customData = this.props.firewallCustomLineData;
      var chartTitle = "防火墙统计报表";
      var option = Util.getDiZhouJiCustomView("防火墙",customData,chartTitle);
      firewallCustomReportChart.setOption(option);
      $(window).resize(function(){
          firewallCustomReportChart.resize();
      })
    }

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
          _this._getDailyReportChart();
        },400);
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
      var chartKey = this.props.chartKey;
      var chartData = [];
      var chartTitle = "数据库统计报表";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartKey) {
        case 1:
          chartData = this.props.databaseDailyData;
          chartTitle = "数据库统计日报"+this.props.reportdate;
          break;
        case 2:
          chartData = this.props.databaseWeeklyData;
          chartTitle = "数据库统计周报"+this.props.reportdate;
          break;
        case 3:
          chartData = this.props.databaseMonthlyData;
          var strMonth = "";
          if(this.props.reportdate != ""){
            strMonth = this.props.reportdate;
            strMonth = strMonth.substring(0,7);
          };
          chartTitle = "数据库统计月报"+strMonth;
          break;
        case 4:
          chartData = this.props.databaseQuarterlyData;
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
        case 5:
          chartData = this.props.databaseYearlyData;
          chartTitle = "数据库统计年报"+objYear;
          break;
        case 6:
          chartData = this.props.databaseCustomData;
          break;
        default:
      };
      var data = chartData;
      var option = Util.getDiZhouJiView("数据库",data,chartTitle);
      switch (chartId) {
          case "databaseDailyReportChartTwo":
              databaseDailyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              databaseDailyReportChart.setOption(option);
              break;
          case "databaseWeeklyReportChartTwo":
              databaseWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              databaseWeeklyReportChart.setOption(option);
              break;
          case "databaseMonthlyReportChartTwo":
              databaseMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              databaseMonthlyReportChart.setOption(option);
              break;
          case "databaseQuarterlyReportChartTwo":
              databaseQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              databaseQuarterlyReportChart.setOption(option);
              break;
          case "databaseYearlyReportChartTwo":
              databaseYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              databaseYearlyReportChart.setOption(option);
              break;
      };
      $(window).resize(function(){
          databaseDailyReportChart.resize();
          databaseWeeklyReportChart.resize();
          databaseMonthlyReportChart.resize();
          databaseQuarterlyReportChart.resize();
          databaseYearlyReportChart.resize();
      })
    }
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
          _this._getDailyReportChart();
        },400);
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
      var customData = this.props.databaseCustomLineData;
      var chartTitle = "数据库统计报表";
      var option = Util.getDiZhouJiCustomView("数据库",customData,chartTitle);
      databaseCustomReportChart.setOption(option);
      $(window).resize(function(){
          databaseCustomReportChart.resize();
      })
    }

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
    dvrStorageCustomLineData: PropTypes.array.isRequired
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
    nvrStorageCustomLineData: PropTypes.array.isRequired
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
    encoderStorageCustomLineData: PropTypes.array.isRequired
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
    serverCustomLineData: PropTypes.array.isRequired
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
    networkCustomLineData: PropTypes.array.isRequired
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
    firewallCustomLineData: PropTypes.array.isRequired
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
    databaseCustomLineData: PropTypes.array.isRequired
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
