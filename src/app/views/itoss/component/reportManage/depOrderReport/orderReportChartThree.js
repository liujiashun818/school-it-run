/**
* Created by yinxuexue  2016/03/08.
* 厅级工单-地州级图型
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

var reportWeeklyReportChart, reportMonthlyReportChart, reportQuarterlyReportChart, reportYearlyReportChart, reportCustomReportChart;

var OrderReportChart = React.createClass({
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
      var that = this;
      var areas = [];
      var createCounts = [];
      var completeCounts = [];
      var completeRates = [];

      var chartKey = this.props.chartKey;
      var chartData = [];
      var chartTitle = "工单统计报表";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartKey) {
        case 1:
          chartData = this.props.orderDailyData;
          chartTitle = "工单统计日报"+this.props.reportdate;
          break;
        case 2:
          chartData = this.props.orderWeeklyData;
          chartTitle = "工单统计周报"+this.props.reportdate;
          break;
        case 3:
          chartData = this.props.orderMonthlyData;
          var strMonth = "";
          if(this.props.reportdate != ""){
            strMonth = this.props.reportdate;
            strMonth = strMonth.substring(0,7);
          };
          chartTitle = "工单统计月报"+strMonth;
          break;
        case 4:
          chartData = this.props.orderQuarterlyData;
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
          chartTitle = "工单统计季报"+DateChange.getLastQuarter(objYear,currentjdcs);
          break;
        case 5:
          chartData = this.props.orderYearlyData;
          chartTitle = "工单统计年报"+objYear;
          break;
        case 6:
          chartData = this.props.orderCustomData;
          break;
        default:
      }
      var data = chartData;
      //check.length >= 3 是要显示 厅、州、县级 三层数据；check.length = 2 是要显示 州、县级 二层数据，厅级不显示；
      //check.length = 1 是要显示 县级 一层数据，厅、州级不显示；
      if(data.length >= 3){
        var dataone = data[2];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            areas.push(dataone[i].area);
            createCounts.push(dataone[i].newtotal);
            completeCounts.push(dataone[i].completecount);
            completeRates.push(dataone[i].completerate);
          };
        };
      }else if (data.length == 2) {
        var dataone = data[1];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            areas.push(dataone[i].area);
            createCounts.push(dataone[i].newtotal);
            completeCounts.push(dataone[i].completecount);
            completeRates.push(dataone[i].completerate);
          };
        };
      }else if (data.length == 1) {
        var dataone = data[0];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            areas.push(dataone[i].area);
            createCounts.push(dataone[i].newtotal);
            completeCounts.push(dataone[i].completecount);
            completeRates.push(dataone[i].completerate);
          };
        };
      };

      // for(var i=0;i<datas.length;i++){
      //   var data11 = datas[i];
      //   areas.push(data11.area);
      //   createCounts.push(data11.newtotal);
      //   completeCounts.push(data11.completecount);
      //   completeRates.push(data11.completerate);
      // };

      var optionExample =
        {
          title : {
              text: chartTitle,
              x: 'left'
              // x : 'center'
          },
          tooltip : {
              trigger: 'axis'
          },
          toolbox: {
              show : false,
              feature : {
                  mark : {show: true},
                  //dataView : {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          calculable : true,
          legend: {
              data:['新建工单数','完成工单数','完成工单率']
          },
          dataZoom : {
              show : true,
              start : 0,
              end : 100
          },
          xAxis : [
              {
                  type : 'category',
                  data : areas
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  name : '工单数',
                  axisLabel : {
                      formatter: '{value}'
                  }
              },
              {
                  type : 'value',
                  name : '完成率',
                  axisLabel : {
                      formatter: '{value}%'
                  }
              }
          ],
          series : [
              {
                  name:'新建工单数',
                  type:'bar',
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
                  data:createCounts
              },
              {
                  name:'完成工单数',
                  type:'bar',
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
                  data:completeCounts
              },
              {
                  name:'完成工单率',
                  type:'line',
                  itemStyle: {
                      normal: {
                          label: {
                              show: true,
                              position: 'top',
                              formatter: '{c}%'
                          }
                      }
                  },
                  yAxisIndex: 1,
                  data:completeRates
              }
          ]
      };
      switch (chartId) {
          case "reportWeeklyReportChartThree":
              reportWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportWeeklyReportChart.setOption(optionExample);
              break;
          case "reportMonthlyReportChartThree":
              reportMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportMonthlyReportChart.setOption(optionExample);
              break;
          case "reportQuarterlyReportChartThree":
              reportQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportQuarterlyReportChart.setOption(optionExample);
              break;
          case "reportYearlyReportChartThree":
              reportYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportYearlyReportChart.setOption(optionExample);
              break;
      };
      $(window).resize(function(){
          reportWeeklyReportChart.resize();
          reportMonthlyReportChart.resize();
          reportQuarterlyReportChart.resize();
          reportYearlyReportChart.resize();
      })
    }
});

var OrderReportCustomChart = React.createClass({
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
      var that = this;
      var areas = [];
      var dates = [];
      var completeRates = [];
      var completeRatestemp = [];
      var customData = this.props.orderCustomLineData;
      //customData.length >= 3 是要显示 厅、州、县级 三层数据；check.length = 2 是要显示 州、县级 二层数据，厅级不显示；check.length = 1 是要显示 县级 一层数据，厅、州级不显示；
      //显示
      $(".tingjiCustom").show();
      $(".dizhoujiCustom").show();
      if(customData.length > 0){
        var dataone = [];
        if(customData.length >= 3){
          dataone = customData[2];
        }else if (customData.length == 2) {
          dataone = customData[1];
        }else if (customData.length == 1) {
          dataone = customData[0];
        };
        if (dataone.length > 0) {
          for(var n=0;n<dataone.length;n++){
            var datatwo = dataone[n];
            if(datatwo){
              for(var item in datatwo){
                areas.push(item);
                var datathree = datatwo[item];//key所对应的value
                var temp = [];
                if(datathree){
                  for(var i=0;i<datathree.length;i++){
                    if (datathree[i]) {
                      var dates = datathree[i].date;
                      var dated = new Date();
                      if(dates != ""){
                        dated = DateChange.strToDate(dates);
                      };
                      var yzb = datathree[i].completerate;
                      temp.push([
                        dated,
                        yzb
                      ]);
                    }
                  }
                }
                completeRatestemp.push(temp);
              };
            };
          };
        };
      };
      if(areas.length > 0){
        for(var i=0;i<areas.length;i++){
            var seriestemp ={
              name: areas[i],
              type: 'line',
              showAllSymbol: true,
              itemStyle: {
                  normal: {
                      label: {
                          show: true,
                          position: 'top',
                          formatter : function (params) {
                            return params.value[1] + '%';
                          }
                      }
                  }
              },
              data: completeRatestemp[i]
            };
            completeRates.push(seriestemp);
        }
      }else{
        var seriestemp ={
          name: "默认",
          type: 'line',
          showAllSymbol: true,
          data: []
        };
        completeRates.push(seriestemp);
      };
      var chartTitle = "工单统计报表";
      var optionExample =
        {
          title : {
              text: chartTitle,
              x: 'left'
          },
          tooltip : {
            trigger: 'item',
            formatter : function (params) {
              var date = new Date(params.value[0]);
              data = date.getFullYear() + '-'
                + (date.getMonth() + 1) + '-'
                + date.getDate();
              return data + '<br/>'	+ params.seriesName + ': ' + params.value[1] + '%';
            }
          },
          toolbox: {
              show : false,
              feature : {
                  mark : {show: true},
                  //dataView : {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          calculable : true,
          legend: {
              data:areas
          },
          dataZoom : {
              show : true,
              start : 30,
              end : 100
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
                  name : '完成率',
                  axisLabel : {
                      formatter: '{value}%'
                  }
              }
          ],
          series : completeRates
      };
      reportCustomReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      reportCustomReportChart.setOption(optionExample);
      $(window).resize(function(){
          reportCustomReportChart.resize();
      })
    }
});

OrderReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    reportdate: PropTypes.string.isRequired,
    orderDailyData: PropTypes.array.isRequired,
    orderWeeklyData: PropTypes.array.isRequired,
    orderMonthlyData: PropTypes.array.isRequired,
    orderQuarterlyData: PropTypes.array.isRequired,
    orderYearlyData: PropTypes.array.isRequired,
    orderCustomData: PropTypes.array.isRequired
}
OrderReportCustomChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    orderCustomLineData: PropTypes.array.isRequired
}

module.exports = {
  OrderReportChart: OrderReportChart,
  OrderReportCustomChart: OrderReportCustomChart,
};
