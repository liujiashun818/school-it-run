/**
* Created by xuexue.yin  2016/03/09.
* 计费考核统计报表-图型
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

var reportMonthlyReportChart, reportQuarterlyReportChart, reportYearlyReportChart;

var ChargeReportChart = React.createClass({
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
      var chartTitle = "计费考核";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();

      switch (chartId) {
          case "reportMonthlyReportChart":
              var strMonth = "";
              if(this.props.reportdate != ""){
                strMonth = this.props.reportdate;
                strMonth = strMonth.substring(0,7);
              };
              chartTitle = "计费考核月报"+strMonth;
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
              chartTitle = "计费考核季报"+DateChange.getLastQuarter(objYear,currentjdcs);
              break;
          case "reportYearlyReportChart":
              chartTitle = "计费考核年报"+objYear;
              break;
      };

      var data = this.props.chargePicData;
      var xList = [];
      var dateList = [];
      for(var i=0;i<data.length;i++){
        xList.push(data[i].isp);
        dateList.push(data[i].costdeduction);
      };

      var option = {
          title : {
              text: chartTitle,
              x: 'center'
          },
          tooltip: {
              trigger: 'item'
          },
          toolbox: {
              show: true,
              feature: {
                  //dataView: {show: true, readOnly: false},
                  //restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          calculable: true,
          grid: {
              borderWidth: 0,
              y: 80,
              y2: 60
          },
          dataZoom : {
              show : true,
              // realtime : true,
              // orient: 'horizontal',
              // type: 'inside',
              start : 0,
              end : 100
          },
          xAxis: [
              {
                  type: 'category',
                  show: true,
                  data: xList
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  show: true,
                  name : '所扣费用(元)'
              }
          ],
          series: [
              {
                  type: 'bar',
                  barWidth: 30,
                  itemStyle: {
                      normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                              '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            var index = params.dataIndex%15;
                            // console.log(index);
                            return colorList[index]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}'
                            //formatter: '{b}\n{c}'
                        }
                      }
                  },
                  data: dateList
              }
          ]
      };

      switch (chartId) {
          case "reportMonthlyReportChart":
              reportMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportMonthlyReportChart.setOption(option);
              break;
          case "reportQuarterlyReportChart":
              reportQuarterlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportQuarterlyReportChart.setOption(option);
              break;
          case "reportYearlyReportChart":
              reportYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportYearlyReportChart.setOption(option);
              break;
      };
      $(window).resize(function(){
          reportMonthlyReportChart.resize();
          reportQuarterlyReportChart.resize();
          reportYearlyReportChart.resize();
      })
    }
});

ChargeReportChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    reportdate: PropTypes.string.isRequired,
    chargePicData: PropTypes.array.isRequired
}

module.exports = {
  ChargeReportChart: ChargeReportChart
};
