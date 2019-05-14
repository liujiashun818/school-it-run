/**
* Created by tianzhuo.nie  2016/01/26.
* 工单报表-图型
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
      var that = this;
      var areas = [];
      var createCounts = [];
      var completeCounts = [];
      var completeRates = [];
      var datas = "";
      var chartTitle = "工单统计";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();

      switch (chartId) {
          case "reportWeeklyReportChart":
              chartTitle = "工单统计周报"+this.props.reportdate;
              datas = that.props.orderWeeklyData;
              break;
          case "reportMonthlyReportChart":
              var strMonth = "";
              if(this.props.reportdate != ""){
                strMonth = this.props.reportdate;
                strMonth = strMonth.substring(0,7);
              };
              chartTitle = "工单统计月报"+strMonth;
              datas = that.props.orderMonthlyData;
              break;
          case "reportQuarterlyReportChart":
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
              datas = that.props.orderQuarterlyData;
              break;
          case "reportYearlyReportChart":
              chartTitle = "工单统计年报"+objYear;
              datas = that.props.orderYearlyData;
              break;
      };
      for(var i=0;i<datas.length;i++){
        var data11 = datas[i];
        areas.push(data11.area);
        createCounts.push(data11.newtotal);
        completeCounts.push(data11.completecount);
        completeRates.push(data11.completerate);
      };

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
              show : true,
              feature : {
                  // mark : {show: true},
                  //dataView : {show: true, readOnly: false},
                  // magicType: {show: true, type: ['line', 'bar']},
                  // restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          calculable : true,
          legend: {
              data:['新建工单数','完成工单数','完成工单率']
              //orient : 'vertical',
              //x : 'right'
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
          case "reportWeeklyReportChart":
              reportWeeklyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportWeeklyReportChart.setOption(optionExample);
              break;
          case "reportMonthlyReportChart":
              reportMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportMonthlyReportChart.setOption(optionExample);
              break;
          case "reportQuarterlyReportChart":
              reportQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportQuarterlyReportChart.setOption(optionExample);
              break;
          case "reportYearlyReportChart":
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
      var that = this;
      var areas = [];
      var createCounts = [];
      var completeCounts = [];
      var completeRates = [];
      var datas = this.props.orderCustomData;
      for(var i=0;i<datas.length;i++){
        var data11 = datas[i];
        areas.push(data11.area);
        createCounts.push(data11.newtotal);
        completeCounts.push(data11.completecount);
        completeRates.push(data11.completerate);
      };
      reportCustomReportChart = echarts.init(document.getElementById(chartId), 'macarons');
      var chartTitle = "工单统计报表";
      var optionExample =
        {
          title : {
              text: chartTitle,
              x: 'left'
          },
          tooltip : {
              trigger: 'axis'
          },
          toolbox: {
              show : true,
              feature : {
                  //mark : {show: true},
                  //dataView : {show: true, readOnly: false},
                  //magicType: {show: true, type: ['line', 'bar']},
                  //restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          dataZoom: {
              show: true,
              start : 0,
              end : 100
          },
          calculable : true,
          legend: {
              data:['新建工单数','完成工单数','完成工单率']
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
                  yAxisIndex: 1,
                  itemStyle: {
                      normal: {
                          label: {
                              show: true,
                              position: 'top',
                              formatter: '{c}%'
                          }
                      }
                  },
                  data:completeRates
              }
          ]
      };
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
    orderWeeklyData: PropTypes.array.isRequired,
    orderMonthlyData: PropTypes.array.isRequired,
    orderQuarterlyData: PropTypes.array.isRequired,
    orderYearlyData: PropTypes.array.isRequired
}
OrderReportCustomChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    orderCustomData: PropTypes.array.isRequired
}

module.exports = {
  OrderReportChart: OrderReportChart,
  OrderReportCustomChart: OrderReportCustomChart
};
