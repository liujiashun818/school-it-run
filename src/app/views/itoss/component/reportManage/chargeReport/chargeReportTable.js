/**
* Created by xuexue.yin  2016/03/09.
* 计费考核统计报表-表格
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

var ChargeReportTable = React.createClass({
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
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this._getReportData(chartKey);
        $('#'+tableId).bootstrapTable({
            columns: [
                // {
                //     title: '区域',
                //     field: 'organization',
                //     halign: 'center',
                //     align: 'center',
                //     sortable: true
                // },
                {
                    title: '工单创建时间',
                    field: 'createdate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },{
                    title: '工单号',
                    field: 'workordernum',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '延迟时长(小时)',
                    field: 'longdelay',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '服务提供商',
                    field: 'isp',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },{
                    title: '所扣费用(元)',
                    field: 'costdeduction',
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
        case 3:
          check = this.props.chargeMonthlyData;
          break;
        case 4:
          check = this.props.chargeQuarterlyData;
          break;
        case 5:
          check = this.props.chargeYearlyData;
          break;
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

ChargeReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    chargeMonthlyData: PropTypes.array.isRequired,
    chargeQuarterlyData: PropTypes.array.isRequired,
    chargeYearlyData: PropTypes.array.isRequired
}

module.exports = {
  ChargeReportTable: ChargeReportTable
};
