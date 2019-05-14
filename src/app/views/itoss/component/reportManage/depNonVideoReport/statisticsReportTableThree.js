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
var Util = require('./util');
var DVRReportTable = React.createClass({
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
        },500);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var chartKey = this.props.chartKey;
        var data = this._getReportData(chartKey);//厅级
        // var data = check ? [check] : [];
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data= this._getReportData(chartKey);//厅级
      // var data = check && check.length ? [check] : [];
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '区域',
                    field: 'area',
                    sortable: true
                }, {
                    title: 'DVR总数',
                    field: 'total',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },{
                    title: 'DVR在线数',
                    field: 'onlinecount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: 'DVR在线率',
                    field: 'onlinerate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: 'DVR完好数',
                    field: 'intactcount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: 'DVR完好率',
                    field: 'intactrate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
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
      var check = null;
      switch (chartKey) {
        case 1:
          check = this.props.dvrStorageDailyData;
          break;
        case 2:
          check = this.props.dvrStorageWeeklyData;
          break;
        case 3:
          check = this.props.dvrStorageMonthlyData;
          break;
        case 4:
          check = this.props.dvrStorageQuarterlyData;
          break;
        case 5:
          check = this.props.dvrStorageYearlyData;
          break;
        case 6:
          check = this.props.dvrStorageCustomData;
          break;
        default:
      }
      return Util.getXianShiJiTableData(check);
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

var NVRReportTable = React.createClass({
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
        },500);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var chartKey = this.props.chartKey;
        var data = this._getReportData(chartKey);
        // var data = check ? [check] : [];
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this._getReportData(chartKey);
      // var data = check && check.length ? [check] : [];
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '区域',
                    field: 'area',
                    sortable: true
                }, {
                    title: 'NVR总数',
                    field: 'total',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },{
                    title: 'NVR在线数',
                    field: 'onlinecount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: 'NVR在线率',
                    field: 'onlinerate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: 'NVR完好数',
                    field: 'intactcount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: 'NVR完好率',
                    field: 'intactrate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
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
      var check = null;
      switch (chartKey) {
        case 1:
          check = this.props.nvrStorageDailyData;
          break;
        case 2:
          check = this.props.nvrStorageWeeklyData;
          break;
        case 3:
          check = this.props.nvrStorageMonthlyData;
          break;
        case 4:
          check = this.props.nvrStorageQuarterlyData;
          break;
        case 5:
          check = this.props.nvrStorageYearlyData;
          break;
        case 6:
          check = this.props.nvrStorageCustomData;
          break;
        default:
      }
      return Util.getXianShiJiTableData(check);
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

var EncoderReportTable = React.createClass({
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
        },500);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var chartKey = this.props.chartKey;
        var data = this._getReportData(chartKey);
        // var data = check ? [check] : [];
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this._getReportData(chartKey);
      // var data = check && check.length ? [check] : [];
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '区域',
                    field: 'area',
                    sortable: true
                }, {
                    title: '编码器总数',
                    field: 'total',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },{
                    title: '编码器在线数',
                    field: 'onlinecount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '编码器在线率',
                    field: 'onlinerate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '编码器完好数',
                    field: 'intactcount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '编码器完好率',
                    field: 'intactrate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
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
      var check = null;
      switch (chartKey) {
        case 1:
          check = this.props.encoderStorageDailyData;
          break;
        case 2:
          check = this.props.encoderStorageWeeklyData;
          break;
        case 3:
          check = this.props.encoderStorageMonthlyData;
          break;
        case 4:
          check = this.props.encoderStorageQuarterlyData;
          break;
        case 5:
          check = this.props.encoderStorageYearlyData;
          break;
        case 6:
          check = this.props.encoderStorageCustomData;
          break;
        default:
      }
      return Util.getXianShiJiTableData(check);
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

var ServerReportTable = React.createClass({
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
        },500);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var chartKey = this.props.chartKey;
        var data = this._getReportData(chartKey);
        // var data = check ? [check] : [];
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this._getReportData(chartKey);
      // var data = check && check.length ? [check] : [];
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '区域',
                    field: 'area',
                    sortable: true
                }, {
                    title: '服务器总数',
                    field: 'total',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },{
                    title: '服务器在线数',
                    field: 'onlinecount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '服务器在线率',
                    field: 'onlinerate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '服务器完好数',
                    field: 'intactcount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '服务器完好率',
                    field: 'intactrate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
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
      var check = null;
      switch (chartKey) {
        case 1:
          check = this.props.serverDailyData;
          break;
        case 2:
          check = this.props.serverWeeklyData;
          break;
        case 3:
          check = this.props.serverMonthlyData;
          break;
        case 4:
          check = this.props.serverQuarterlyData;
          break;
        case 5:
          check = this.props.serverYearlyData;
          break;
        case 6:
          check = this.props.serverCustomData;
          break;
        default:
      }
      return Util.getXianShiJiTableData(check);
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

var NetworkReportTable = React.createClass({
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
        },500);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var chartKey = this.props.chartKey;
        var data = this._getReportData(chartKey);
        // var data = check ? [check] : [];
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this._getReportData(chartKey);
      // var data = check && check.length ? [check] : [];
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '区域',
                    field: 'area',
                    sortable: true
                }, {
                    title: '网络设备总数',
                    field: 'total',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },{
                    title: '网络设备在线数',
                    field: 'onlinecount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '网络设备在线率',
                    field: 'onlinerate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '网络设备完好数',
                    field: 'intactcount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '网络设备完好率',
                    field: 'intactrate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
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
      var check = null;
      switch (chartKey) {
        case 1:
          check = this.props.networkDailyData;
          break;
        case 2:
          check = this.props.networkWeeklyData;
          break;
        case 3:
          check = this.props.networkMonthlyData;
          break;
        case 4:
          check = this.props.networkQuarterlyData;
          break;
        case 5:
          check = this.props.networkYearlyData;
          break;
        case 6:
          check = this.props.networkCustomData;
          break;
        default:
      }
      return Util.getXianShiJiTableData(check);
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

var FirewallReportTable = React.createClass({
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
        },500);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var chartKey = this.props.chartKey;
        var data = this._getReportData(chartKey);
        // var data = check ? [check] : [];
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this._getReportData(chartKey);
      // var data = check && check.length ? [check] : [];
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '区域',
                    field: 'area',
                    sortable: true
                }, {
                    title: '防火墙总数',
                    field: 'total',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },{
                    title: '防火墙在线数',
                    field: 'onlinecount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '防火墙在线率',
                    field: 'onlinerate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '防火墙完好数',
                    field: 'intactcount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '防火墙完好率',
                    field: 'intactrate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
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
      var check = null;
      switch (chartKey) {
        case 1:
          check = this.props.firewallDailyData;
          break;
        case 2:
          check = this.props.firewallWeeklyData;
          break;
        case 3:
          check = this.props.firewallMonthlyData;
          break;
        case 4:
          check = this.props.firewallQuarterlyData;
          break;
        case 5:
          check = this.props.firewallYearlyData;
          break;
        case 6:
          check = this.props.firewallCustomData;
          break;
        default:
      }
      return Util.getXianShiJiTableData(check);
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

var DatabaseReportTable = React.createClass({
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
        },500);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var chartKey = this.props.chartKey;
        var data = this._getReportData(chartKey);
        // var data = check ? [check] : [];
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this._getReportData(chartKey);
      // var data = check && check.length ? [check] : [];
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '区域',
                    field: 'area',
                    sortable: true
                }, {
                    title: '数据库总数',
                    field: 'total',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },{
                    title: '数据库在线数',
                    field: 'onlinecount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '数据库在线率',
                    field: 'onlinerate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '数据库完好数',
                    field: 'intactcount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '数据库完好率',
                    field: 'intactrate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
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
      var check = null;
      switch (chartKey) {
        case 1:
          check = this.props.databaseDailyData;
          break;
        case 2:
          check = this.props.databaseWeeklyData;
          break;
        case 3:
          check = this.props.databaseMonthlyData;
          break;
        case 4:
          check = this.props.databaseQuarterlyData;
          break;
        case 5:
          check = this.props.databaseYearlyData;
          break;
        case 6:
          check = this.props.databaseCustomData;
          break;
        default:
      }
      return Util.getXianShiJiTableData(check);
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

DVRReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    dvrStorageDailyData: PropTypes.array.isRequired,
    dvrStorageWeeklyData: PropTypes.array.isRequired,
    dvrStorageMonthlyData: PropTypes.array.isRequired,
    dvrStorageQuarterlyData: PropTypes.array.isRequired,
    dvrStorageYearlyData: PropTypes.array.isRequired,
    dvrStorageCustomData: PropTypes.array.isRequired
}
NVRReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    nvrStorageDailyData: PropTypes.array.isRequired,
    nvrStorageWeeklyData: PropTypes.array.isRequired,
    nvrStorageMonthlyData: PropTypes.array.isRequired,
    nvrStorageQuarterlyData: PropTypes.array.isRequired,
    nvrStorageYearlyData: PropTypes.array.isRequired,
    nvrStorageCustomData: PropTypes.array.isRequired
}
EncoderReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    encoderStorageDailyData: PropTypes.array.isRequired,
    encoderStorageWeeklyData: PropTypes.array.isRequired,
    encoderStorageMonthlyData: PropTypes.array.isRequired,
    encoderStorageQuarterlyData: PropTypes.array.isRequired,
    encoderStorageYearlyData: PropTypes.array.isRequired,
    encoderStorageCustomData: PropTypes.array.isRequired
}
ServerReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    serverDailyData: PropTypes.array.isRequired,
    serverWeeklyData: PropTypes.array.isRequired,
    serverMonthlyData: PropTypes.array.isRequired,
    serverQuarterlyData: PropTypes.array.isRequired,
    serverYearlyData: PropTypes.array.isRequired,
    serverCustomData: PropTypes.array.isRequired
}
NetworkReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    networkDailyData: PropTypes.array.isRequired,
    networkWeeklyData: PropTypes.array.isRequired,
    networkMonthlyData: PropTypes.array.isRequired,
    networkQuarterlyData: PropTypes.array.isRequired,
    networkYearlyData: PropTypes.array.isRequired,
    networkCustomData: PropTypes.array.isRequired
}
FirewallReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    firewallDailyData: PropTypes.array.isRequired,
    firewallWeeklyData: PropTypes.array.isRequired,
    firewallMonthlyData: PropTypes.array.isRequired,
    firewallQuarterlyData: PropTypes.array.isRequired,
    firewallYearlyData: PropTypes.array.isRequired,
    firewallCustomData: PropTypes.array.isRequired
}
DatabaseReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    databaseDailyData: PropTypes.array.isRequired,
    databaseWeeklyData: PropTypes.array.isRequired,
    databaseMonthlyData: PropTypes.array.isRequired,
    databaseQuarterlyData: PropTypes.array.isRequired,
    databaseYearlyData: PropTypes.array.isRequired,
    databaseCustomData: PropTypes.array.isRequired
}

module.exports = {
  DVRReportTable: DVRReportTable,
  NVRReportTable: NVRReportTable,
  EncoderReportTable: EncoderReportTable,
  ServerReportTable: ServerReportTable,
  NetworkReportTable: NetworkReportTable,
  FirewallReportTable: FirewallReportTable,
  DatabaseReportTable: DatabaseReportTable
};
