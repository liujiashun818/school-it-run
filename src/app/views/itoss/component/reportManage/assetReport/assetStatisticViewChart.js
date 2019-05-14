/**
* Created by xuexue.yin  2016/03/09.
* 计费考核统计报表-图型
*/
require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var DateChange = require('../../../../../utils/dateChange.js');

var reportOverMonthlyReportChart, reportOverYearlyReportChart;
var reportMonthlyReportChart, reportQuarterlyReportChart, reportYearlyReportChart;
//设置过保统计饼图
var AssetOvertimePieChart = React.createClass({
    getInitialState: function(){
        return{
            report: this.props.report,
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
          <div id={this.props.chartId} style={{height:"240px",width:"98%",paddingLeft:"1%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      var data = [];
      var legendData = ["过保资产数","未过保资产数"];
      var label = {
          normal : {
              label : {show : false},
              labelLine : {show : false}
          }
      };
      var chartKey = this.props.chartKey;
      var chartData = [];
      var chartTitle = "资产过保统计"
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartKey) {
        case 3:
          var strMonth = "";
          if(this.props.reportdate != ""){
            strMonth = this.props.reportdate;
            strMonth = strMonth.substring(0,7);
          };
          chartTitle = "资产过保统计月报"+strMonth;
          chartData = this.props.report.assetReportMonthlyData;
          break;
        case 5:
          chartTitle = "资产过保统计年报"+objYear;
          chartData = this.props.report.assetReportYearlyData;
          break;
      }
      var odata = chartData;
      var yes = 0, no = 0;
      if(odata&&odata[0]&&odata[0]!=null){
          for(var i in odata){
              (odata[i].wpflag?(yes++):(no++));
          }
          if(yes>0) data.push({name:legendData[0],value:yes,itemStyle:label});
          if(no>0) data.push({name:legendData[1],value:no,itemStyle:label});
      }
      if(yes==0) legendData = ["未过保资产数"];
      else if(no==0) legendData = ["过保资产数"];
      else if(yes==0&&no==0) legendData = [];
      var option = {
          title : {
              text: chartTitle,
              x: 'center'
          },
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
                  //dataView: {show: true, readOnly: false},
                  //restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          calculable : true,
          series: [
              {
                  name:'过保资产',
                  type:'pie',
                  radius: '66%',
                  data: data
              }
          ]
      };
      switch (chartId) {
          case "reportOverMonthlyReportChart":
              reportOverMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportOverMonthlyReportChart.setOption(option);
              break;
          case "reportOverYearlyReportChart":
              reportOverYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportOverYearlyReportChart.setOption(option);
              break;
      };
      $(window).resize(function(){
          reportOverMonthlyReportChart.resize();
          reportOverYearlyReportChart.resize();
      })
    }
});

//设置状态统计饼图
var AssetStatePieChart = React.createClass({
    getInitialState: function(){
        return{
            report: this.props.report,
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
          <div id={this.props.chartId} style={{height:"240px",width:"98%",paddingLeft:"1%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      var chartKey = this.props.chartKey;
      var chartData = [];
      var chartTitle = "资产状态统计";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartKey) {
        case 3:
          var strMonth = "";
          if(this.props.reportdate != ""){
            strMonth = this.props.reportdate;
            strMonth = strMonth.substring(0,7);
          };
          chartTitle = "资产状态统计月报"+strMonth;
          chartData = this.props.report.assetReportMonthlyData;
          break;
        case 5:
          chartTitle = "资产状态统计年报"+objYear;
          chartData = this.props.report.assetReportYearlyData;
          break;
      }
      var odata = chartData;
      var data = [];
      var legendData = [];
      var label = {
          normal : {
              label : {show : false},
              labelLine : {show : false}
          }
      };
      if(odata&&odata[0]&&odata[0]!=null){
          for(var i in odata){
              if(odata[i].assetsStatus.length<=0){
                  odata[i].assetsStatus = "未填";
              }
              if($.inArray(odata[i].assetsStatus,legendData)==-1) legendData.push(odata[i].assetsStatus);
          }
          for(var i in legendData){
              var value = 0;
              for(var j in odata){
                  if(odata[j].assetsStatus==legendData[i]) value++;
              }
              data.push({name:legendData[i],value:value,itemStyle:label});
          }
      }
      var option = {
          title : {
              text: chartTitle,
              x: 'center'
          },
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
                  //dataView: {show: true, readOnly: false},
                  //restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          calculable : true,
          series: [
              {
                  itemStyle: {
                      normal: {
                          color: function(params) {
                              var colorList = ['#E83535','#26C0C0','#F4E001','#009900','#663399','#E87C25','#FF99FF'];
                              return colorList[params.dataIndex]
                          },
                      }
                  },
                  name:'资产状态',
                  type:'pie',
                  radius: '66%',
                  data: data
              }
          ]
      };

      switch (chartId) {
          case "reportMonthlyReportChart":
              reportMonthlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportMonthlyReportChart.setOption(option);
              break;
          case "reportYearlyReportChart":
              reportYearlyReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              reportYearlyReportChart.setOption(option);
              break;
      };
      $(window).resize(function(){
          reportMonthlyReportChart.resize();
          reportYearlyReportChart.resize();
      })
    }
});

module.exports = {
  AssetOvertimePieChart: AssetOvertimePieChart,
  AssetStatePieChart: AssetStatePieChart
};
