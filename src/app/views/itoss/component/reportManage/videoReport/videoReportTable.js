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

var VideoReportTable = React.createClass({
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
          _this._initTable();
        },300);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var chartKey = this.props.chartKey;
        var data = this._getReportData(chartKey);//市级
        // var data = check ? [check] : [];
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this._getReportData(chartKey);//市级
      // var data = check && check.length ? [check] : [];
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '区域',
                    field: 'area',
                    sortable: false
                }, {
                    title: '总数',
                    field: 'total',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    title: '在线数',
                    field: 'onlinecount',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '在线率',
                    field: 'onlinerate',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '完好数',
                    field: 'intactcount',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '完好率',
                    field: 'intactrate',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '视频丢失数',
                    field: 'videolosscount',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '视频丢失率',
                    field: 'videolossrate',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '图像异常数',
                    field: 'anomalycount',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '图像异常数率',
                    field: 'anomalyrate',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },
                // {
                //     title: '升级告警数',
                //     field: 'alarmcount',
                //     halign: 'center',
                //     align: 'center',
                //     sortable: false
                // },
                {
                    title: '录像丢失总时长(秒)',
                    field: 'videolossduration',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '日期',
                    field: 'date',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }
            ],
            data: data,
            onClickRow: this._onClickRow,
            exportDataType: "all"
        });
    },
    _getReportData: function(chartKey){
      var check = null, data = [];
      switch (chartKey) {
        case 1:
          check = this.props.videoCheckDailyData[0];
          break;
        case 2:
          check = this.props.videoCheckWeeklyData[0];
          break;
        case 3:
          check = this.props.videoCheckMonthlyData[0];
          break;
        case 4:
          check = this.props.videoCheckQuarterlyData[0];
          break;
        case 5:
          check = this.props.videoCheckYearlyData[0];
          break;
        case 6:
          check = this.props.videoCheckCustomData;
          break;
        default:
      }
      if(check && typeof(check) == 'object' && check.constructor !== Array) {
				data.push(check);
			}else if(check && check.constructor == Array) {
				data = check;
			}
      return data;
    },
    _onClickRow: function(){

    },
    render: function() {
      return (
        <div className="padding-top-20">
          <table id={this.props.tableId}
                 data-toggle='table'
                 data-search='true'
                 data-classes='table table-no-bordered table-hover'
                 data-show-export="true"
                 data-show-refresh='true'
                 data-show-toggle='true'
                 data-show-columns='true'
                 data-pagination='true'
                 data-resizable='true'>
          </table>
        </div>
      );
    },
});

var VideoOffineReportTable = React.createClass({
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
          _this._initTable();
        },300);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var chartKey = this.props.chartKey;
        var tableId = this.props.tableId;
        var data = this._getReportData(chartKey);//市级
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
        if(chartKey != 1 && chartKey != 6){
          $('#'+tableId).bootstrapTable('hideColumn', 'time');
        }else{
          $('#'+tableId).bootstrapTable('showColumn', 'time');
        };
    },
    _initTable: function(){
        var tableId = this.props.tableId;
        var chartKey = this.props.chartKey;
        var data = this._getReportData(chartKey);//市级

        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '摄像机名称',
                    field: 'videoname',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                },{
                    title: 'IP地址',
                    field: 'ipaddress',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '安装位置',
                    field: 'iplace',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '离线时间段',
                    field: 'time',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '离线总时长(秒)',
                    field: 'longtime',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '日期',
                    field: 'date',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }
            ],
            data: data,
            exportDataType: "all"
        });
    },
    _getReportData: function(chartKey){
      var check = [];
      switch (chartKey) {
        case 1:
          check = this.props.videoOfflineDailyData;
          break;
        case 2:
          check = this.props.videoOfflineWeeklyData;
          break;
        case 3:
          check = this.props.videoOfflineMonthlyData;
          break;
        case 4:
          check = this.props.videoOfflineQuarterlyData;
          break;
        case 5:
          check = this.props.videoOfflineYearlyData;
          break;
        case 6:
          check = this.props.videoOfflineCustomData;
          break;
        default:
      }
      // console.log(check);
      return check;
    },
    render: function() {
      return (
        <div className="padding-top-20">
          <table id={this.props.tableId}
            data-toggle='table'
            data-search='true'
            data-classes='table table-no-bordered table-hover'
            data-show-refresh='true'
            data-show-export="true"
            data-show-toggle='true'
            data-show-columns='true'
            data-pagination='true'
            data-resizable='true'>
          </table>
        </div>
      );
    },
});

var VideoMediaLossReportTable = React.createClass({
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
          _this._initTable();
        },300);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var tableId = this.props.tableId;
        var chartKey = this.props.chartKey;
        var data = this._getReportData(chartKey);
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
        if(chartKey != 1 && chartKey != 6){
          $('#'+tableId).bootstrapTable('hideColumn', 'time');
        }else{
          $('#'+tableId).bootstrapTable('showColumn', 'time');
        };
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this._getReportData(chartKey);
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '摄像机名称',
                    field: 'videoname',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                },{
                    title: 'IP地址',
                    field: 'ipaddress',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '安装位置',
                    field: 'iplace',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '录像丢失时间段',
                    field: 'time',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '丢失总时长(秒)',
                    field: 'longtime',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '日期',
                    field: 'date',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }
            ],
            data: data,
            exportDataType: "all"
        });
    },
    _getReportData: function(chartKey){
      var check = [];
      switch (chartKey) {
        case 1:
          check = this.props.videoMediaLossDailyData;
          break;
        case 2:
          check = this.props.videoMediaLossWeeklyData;
          break;
        case 3:
          check = this.props.videoMediaLossMonthlyData;
          break;
        case 4:
          check = this.props.videoMediaLossQuarterlyData;
          break;
        case 5:
          check = this.props.videoMediaLossYearlyData;
          break;
        case 6:
          check = this.props.videoMediaLossCustomData;
          break;
        default:
      }
      // console.log(check);
      return check;
    },
    render: function() {
      return (
        <div className="padding-top-20">
          <table id={this.props.tableId}
                 data-toggle='table'
                 data-search='true'
                 data-classes='table table-no-bordered table-hover'
                 data-show-export="true"
                 data-show-refresh='true'
                 data-show-toggle='true'
                 data-show-columns='true'
                 data-pagination='true'
                 data-resizable='true'>
          </table>
        </div>
      );
    },
});

var VideoLossReportTable = React.createClass({
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
          _this._initTable();
        },300);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var tableId = this.props.tableId;
        var chartKey = this.props.chartKey;
        var data = this._getReportData(chartKey);
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this._getReportData(chartKey);
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '摄像机名称',
                    field: 'videoname',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                },{
                    title: 'IP地址',
                    field: 'ipaddress',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '安装位置',
                    field: 'iplace',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '丢失次数',
                    field: 'losttimes',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '丢失总时长(秒)',
                    field: 'longtime',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '日期',
                    field: 'date',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }
            ],
            data: data,
            exportDataType: "all"
        });
    },
    _getReportData: function(chartKey){
      var check = [];
      switch (chartKey) {
        case 1:
          check = this.props.videoLossDailyData;
          break;
        case 2:
          check = this.props.videoLossWeeklyData;
          break;
        case 3:
          check = this.props.videoLossMonthlyData;
          break;
        case 4:
          check = this.props.videoLossQuarterlyData;
          break;
        case 5:
          check = this.props.videoLossYearlyData;
          break;
        case 6:
          check = this.props.videoLossCustomData;
          break;
        default:
      }
      // console.log(check);
      return check;
    },
    render: function() {
      return (
        <div className="padding-top-20">
          <table id={this.props.tableId}
                 data-toggle='table'
                 data-search='true'
                 data-classes='table table-no-bordered table-hover'
                 data-show-export="true"
                 data-show-refresh='true'
                 data-show-toggle='true'
                 data-show-columns='true'
                 data-pagination='true'
                 data-resizable='true'>
          </table>
        </div>
      );
    },
});

var VideoRealTimeReportTable = React.createClass({
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
          _this._initTable();
        },300);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var data = this.props.videoRealTimeData;
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '总数',
                    field: 'total',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    title: '在线',
                    field: 'ONLINESTATUS',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '信号丢失',
                    field: 'SIGNALLOSS',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '画面丢失',
                    field: 'IMAGELOSS',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '云台控制',
                    field: 'PTZ',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '偏亮',
                    field: 'BRIGHT',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '偏暗',
                    field: 'DIM',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '偏色',
                    field: 'COLORCOST',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '清晰度',
                    field: 'DEFINITION',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '条纹',
                    field: 'STREAK',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '雪花',
                    field: 'SNOWFLAKE',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '滚屏',
                    field: 'SCREENSCROLL',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '抖屏',
                    field: 'SCREENSHAKE',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '冻结',
                    field: 'FREEZE',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '遮挡',
                    field: 'COVERSTATUS',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '其他错误',
                    field: 'OTHERERROR',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }
            ],
            data: this.props.videoRealTimeData,
            exportDataType: "all"
        });
    },
    render: function() {
      return (
        <div className="padding-top-20">
          <table id={this.props.tableId}
                 data-toggle='table'
                 data-search='true'
                 data-classes='table table-no-bordered table-hover'
                 data-show-export="true"
                 data-show-refresh='true'
                 data-show-toggle='true'
                 data-show-columns='true'
                 data-pagination='true'
                 data-resizable='true'>
          </table>
        </div>
      );
    },
});

VideoReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    videoCheckDailyData: PropTypes.array.isRequired,
    videoCheckWeeklyData: PropTypes.array.isRequired,
    videoCheckMonthlyData: PropTypes.array.isRequired,
    videoCheckQuarterlyData: PropTypes.array.isRequired,
    videoCheckYearlyData: PropTypes.array.isRequired,
    videoCheckCustomData: PropTypes.array.isRequired
}

VideoOffineReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    videoOfflineDailyData: PropTypes.array.isRequired,
    videoOfflineWeeklyData: PropTypes.array.isRequired,
    videoOfflineMonthlyData: PropTypes.array.isRequired,
    videoOfflineQuarterlyData: PropTypes.array.isRequired,
    videoOfflineYearlyData: PropTypes.array.isRequired,
    videoOfflineCustomData: PropTypes.array.isRequired
}

VideoMediaLossReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    videoMediaLossDailyData: PropTypes.array.isRequired,
    videoMediaLossWeeklyData: PropTypes.array.isRequired,
    videoMediaLossMonthlyData: PropTypes.array.isRequired,
    videoMediaLossQuarterlyData: PropTypes.array.isRequired,
    videoMediaLossYearlyData: PropTypes.array.isRequired,
    videoMediaLossCustomData: PropTypes.array.isRequired
}

VideoLossReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    videoLossDailyData: PropTypes.array.isRequired,
    videoLossWeeklyData: PropTypes.array.isRequired,
    videoLossMonthlyData: PropTypes.array.isRequired,
    videoLossQuarterlyData: PropTypes.array.isRequired,
    videoLossYearlyData: PropTypes.array.isRequired,
    videoLossCustomData: PropTypes.array.isRequired
}

VideoRealTimeReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    videoRealTimeData: PropTypes.array.isRequired
}

module.exports = {
  VideoReportTable: VideoReportTable,
  VideoOffineReportTable: VideoOffineReportTable,
  VideoMediaLossReportTable: VideoMediaLossReportTable,
  VideoLossReportTable: VideoLossReportTable,
  VideoRealTimeReportTable: VideoRealTimeReportTable
};
