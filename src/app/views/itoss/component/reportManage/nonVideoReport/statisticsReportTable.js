require('bootstrap');

// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

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
        },300);
      }
    },
    componentDidUpdate: function() {
        //更新table
        var chartKey = this.props.chartKey;
        // var data = this._getReportData(chartKey);
        var data = this._getReportData(chartKey);//市级
        // var data = check ? [check] : [];
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data= this._getReportData(chartKey);//市级
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
      var check = null, data = [];
      switch (chartKey) {
        case 1:
          check = this.props.dvrStorageDailyData[0];
          break;
        case 2:
          check = this.props.dvrStorageWeeklyData[0];
          break;
        case 3:
          check = this.props.dvrStorageMonthlyData[0];
          break;
        case 4:
          check = this.props.dvrStorageQuarterlyData[0];
          break;
        case 5:
          check = this.props.dvrStorageYearlyData[0];
          break;
        case 6:
          check = this.props.dvrStorageCustomData;
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
    _getDepartmentReportData: function(chartKey){
      //厅级报表数据
      var check = null, data = [];
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
      if(check && typeof(check) == 'object' && check.constructor !== Array) {
				data.push(check);
			}else if(check && check.constructor == Array) {
				data = check;
			}
      return data;
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
        },300);
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
      var check = null, data = [];
      switch (chartKey) {
        case 1:
          check = this.props.nvrStorageDailyData[0];
          break;
        case 2:
          check = this.props.nvrStorageWeeklyData[0];
          break;
        case 3:
          check = this.props.nvrStorageMonthlyData[0];
          break;
        case 4:
          check = this.props.nvrStorageQuarterlyData[0];
          break;
        case 5:
          check = this.props.nvrStorageYearlyData[0];
          break;
        case 6:
          check = this.props.nvrStorageCustomData;
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
        },300);
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
      var check = null, data = [];
      switch (chartKey) {
        case 1:
          check = this.props.encoderStorageDailyData[0];
          break;
        case 2:
          check = this.props.encoderStorageWeeklyData[0];
          break;
        case 3:
          check = this.props.encoderStorageMonthlyData[0];
          break;
        case 4:
          check = this.props.encoderStorageQuarterlyData[0];
          break;
        case 5:
          check = this.props.encoderStorageYearlyData[0];
          break;
        case 6:
          check = this.props.encoderStorageCustomData;
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
        },300);
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
      var check = null, data = [];
      switch (chartKey) {
        case 1:
          check = this.props.serverDailyData[0];
          break;
        case 2:
          check = this.props.serverWeeklyData[0];
          break;
        case 3:
          check = this.props.serverMonthlyData[0];
          break;
        case 4:
          check = this.props.serverQuarterlyData[0];
          break;
        case 5:
          check = this.props.serverYearlyData[0];
          break;
        case 6:
          check = this.props.serverCustomData;
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
        },300);
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
      var check = null, data = [];
      switch (chartKey) {
        case 1:
          check = this.props.networkDailyData[0];
          break;
        case 2:
          check = this.props.networkWeeklyData[0];
          break;
        case 3:
          check = this.props.networkMonthlyData[0];
          break;
        case 4:
          check = this.props.networkQuarterlyData[0];
          break;
        case 5:
          check = this.props.networkYearlyData[0];
          break;
        case 6:
          check = this.props.networkCustomData;
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
        },300);
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
      var check = null, data = [];
      switch (chartKey) {
        case 1:
          check = this.props.firewallDailyData[0];
          break;
        case 2:
          check = this.props.firewallWeeklyData[0];
          break;
        case 3:
          check = this.props.firewallMonthlyData[0];
          break;
        case 4:
          check = this.props.firewallQuarterlyData[0];
          break;
        case 5:
          check = this.props.firewallYearlyData[0];
          break;
        case 6:
          check = this.props.firewallCustomData;
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
        },300);
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
      var check = null, data = [];
      switch (chartKey) {
        case 1:
          check = this.props.databaseDailyData[0];
          break;
        case 2:
          check = this.props.databaseWeeklyData[0];
          break;
        case 3:
          check = this.props.databaseMonthlyData[0];
          break;
        case 4:
          check = this.props.databaseQuarterlyData[0];
          break;
        case 5:
          check = this.props.databaseYearlyData[0];
          break;
        case 6:
          check = this.props.databaseCustomData;
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
