/**
 * Created by yinxuexue on 2016/02/19.
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
var dailyVideoCheckCustomChart;
//厅级视频类设备报表-摄像机视频考核
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
          _this._getDailyReportChart();//厅级
        },300);
      }
    },
    componentDidUpdate: function(nextProps, nextState) {
        this._getDailyReportChart();//厅级
    },
    render: function() {
      return (
          <div id={this.props.chartId} style={{height:"320px",width:"98%",paddingLeft:"1%"}}></div>
      );
    },
    _getDailyReportChart: function() {
      var chartId = this.props.chartId;
      var area =[];
      var total =[];
      var onlinecount =[];
      var onlinerate = [];
      var intactcount =[];
      // var alarmcount =[];
      var anomalycount =[];
      var videolosscount =[];
      var chartKey = this.props.chartKey;
      var chartData = [];
      var chartTitle = "摄像机视频考核";
      var reportdate = new Date();
      if(this.props.reportdate != ""){
        reportdate = DateChange.strToDate(this.props.reportdate);
      };
      var objYear = reportdate.getYear()+1900;
      var objMonth = reportdate.getMonth()+1;
      var objDay = reportdate.getDate();
      switch (chartKey) {
        case 1:
          chartData = this.props.videoCheckDailyData;
          chartTitle = "摄像机视频考核日报"+this.props.reportdate;
          break;
        case 2:
          chartData = this.props.videoCheckWeeklyData;
          chartTitle = "摄像机视频考核周报"+this.props.reportdate;
          break;
        case 3:
          chartData = this.props.videoCheckMonthlyData;
          var strMonth = "";
          if(this.props.reportdate != ""){
            strMonth = this.props.reportdate;
            strMonth = strMonth.substring(0,7);
          };
          chartTitle = "摄像机视频考核月报"+strMonth;
          break;
        case 4:
          chartData = this.props.videoCheckQuarterlyData;
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
        case 5:
          chartData = this.props.videoCheckYearlyData;
          chartTitle = "摄像机视频考核年报"+objYear;
          break;
        case 6:
          chartData = this.props.videoCheckCustomData;
          break;
        default:
      }
      var data = chartData;
      //check.length >= 3 是要显示 厅、州、县级 三层数据；check.length = 2 是要显示 州、县级 二层数据，厅级不显示；check.length = 1 是要显示 县级 一层数据，厅、州级不显示；
      if(data.length >= 3){
        var dataone = data[2];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            area.push(dataone[i].area);
            total.push(dataone[i].total);
            onlinecount.push(dataone[i].onlinecount);
            intactcount.push(dataone[i].intactcount);
            // alarmcount.push(dataone[i].alarmcount);
            anomalycount.push(dataone[i].anomalycount);
            videolosscount.push(dataone[i].videolosscount);
            onlinerate.push(dataone[i].onlinerate);
          };
        };
      }else if (data.length == 2) {
        var dataone = data[1];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            area.push(dataone[i].area);
            total.push(dataone[i].total);
            onlinecount.push(dataone[i].onlinecount);
            intactcount.push(dataone[i].intactcount);
            // alarmcount.push(dataone[i].alarmcount);
            anomalycount.push(dataone[i].anomalycount);
            videolosscount.push(dataone[i].videolosscount);
            onlinerate.push(dataone[i].onlinerate);
          };
        };
      }else if (data.length == 1) {
        var dataone = data[0];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            area.push(dataone[i].area);
            total.push(dataone[i].total);
            onlinecount.push(dataone[i].onlinecount);
            intactcount.push(dataone[i].intactcount);
            // alarmcount.push(dataone[i].alarmcount);
            anomalycount.push(dataone[i].anomalycount);
            videolosscount.push(dataone[i].videolosscount);
            onlinerate.push(dataone[i].onlinerate);
          };
        };
      };
      var option = {
        title : {
            text: chartTitle,
            x: 'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
            start : 0,
            end : 100
        },
        legend: {
            data:['总数','在线数','完好数','异常数','视频丢失数','在线率']
            // data:['总数','在线数','完好数','告警数','异常数','视频丢失数','在线率']
        },
        xAxis : [
            {
                type : 'category',
                data : area
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
                    formatter: '{value}%'
                }
            }
        ],
        series : [
          {
            name: '总数',
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
            data: total
          },
          {
            name: '在线数',
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
            data: onlinecount
          },
          {
            name: '完好数',
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
            data: intactcount
          },
          // {
          //   name: '告警数',
          //   type: 'bar',
          //   barWidth: 30,
          //   itemStyle: {
          //       normal: {
          //           label: {
          //               show: true,
          //               position: 'top',
          //               formatter: '{c}'
          //           }
          //       }
          //   },
          //   data: alarmcount
          // },
          {
            name: '异常数',
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
            data: anomalycount
          },
          {
            name: '视频丢失数',
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
            data: videolosscount
          },
          {
            name: '在线率',
            type: 'line',
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
            data: onlinerate
          }
        ]
      };

      switch (chartId) {
          case "videoDailyReportChartThree":
              dailyVideoReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              dailyVideoReportChart.setOption(option);
              break;
          case "videoWeeklyReportChartThree":
              weeklyVideoReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              weeklyVideoReportChart.setOption(option);
              break;
          case "videoMonthlyReportChartThree":
              monthlyVideoReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              monthlyVideoReportChart.setOption(option);
              break;
          case "videoQuarterlyReportChartThree":
              quarterlyVideoReportChart = echarts.init(document.getElementById(chartId), 'macarons');
              quarterlyVideoReportChart.setOption(option);
              break;
          case "videoYearlyReportChartThree":
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
          _this._getDailyReportChart();//厅级
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
      var onlinerate = [];
      var legenddata = [];
      var seriesdata = [];
      //videoCheckCustomLineData  videoCheckCustomData
      var customData = this.props.videoCheckCustomLineData;
      //customData.length >= 3 是要显示 厅、州、县级 三层数据；check.length = 2 是要显示 州、县级 二层数据，厅级不显示；check.length = 1 是要显示 县级 一层数据，厅、州级不显示；
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
                var datathree = datatwo[item];//key所对应的value
                legenddata.push(item);
                var onlineratetemp = [];
                if(datathree){
                  for(var i=0;i<datathree.length;i++){
                    if (datathree[i]) {
                      // var xzb = datathree[i].date;
                      // //var yzb = dataone[i].onlinerate * 100;
                      // var yzb = datathree[i].onlinerate;
                      // var year = xzb.year < 1900 ? 1900 + xzb.year : xzb.year;
                      // onlineratetemp.push([
                      //   new Date(year, xzb.month, xzb.date),
                      //   yzb
                      // ]);
                      var dates = datathree[i].date;
                      var dated = new Date();
                      if(dates != ""){
                        dated = DateChange.strToDate(dates);
                      };
                      var yzb = datathree[i].onlinerate;
                      onlineratetemp.push([
                        dated,
                        yzb
                      ]);
                    }
                  }
                }
                onlinerate.push(onlineratetemp);
              };
            };
          };
        };
      };
      if(legenddata.length > 0){
        for(var i=0;i<legenddata.length;i++){
            var seriestemp ={
              name: legenddata[i],
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
              data: onlinerate[i]
            };
            seriesdata.push(seriestemp);
        }
      }else{
        var seriestemp ={
          name: "默认",
          type: 'line',
          showAllSymbol: true,
          data: []
        };
        seriesdata.push(seriestemp);
      };
      var chartTitle = "摄像机视频考核报表";
      var option = {
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
              show : true,
              feature : {
                  //mark : {show: true},
                  //dataView : {show: true, readOnly: false},
                  //restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          dataZoom: {
              show: true,
              start : 30,
              end : 100
          },
          legend : {
              data:legenddata
          },
          grid: {
              y2: 80
          },
          xAxis : [
              {
                  type : 'time',
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
          series : seriesdata
      };
      dailyVideoCheckCustomChart.setOption(option);
      $(window).resize(function(){
          dailyVideoCheckCustomChart.resize();
      })
    }

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
  videoCheckCustomLineData: PropTypes.array.isRequired
}

module.exports = {
  VideoReportChart: VideoReportChart,
  VideoCheckCustomChart: VideoCheckCustomChart
};
