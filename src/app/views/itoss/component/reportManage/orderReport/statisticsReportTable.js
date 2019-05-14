/**
* Created by tianzhuo.nie  2016/01/26.
* 工单报表-table
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

var OrderReportTable = React.createClass({
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
        var that = this;
        var datas = [];
        // debugger;
        switch (chartKey) {
            case 2:
                datas = that.props.orderWeeklyData;
                break;
            case 3:
                datas = that.props.orderMonthlyData;
                break;
            case 4:
                datas = that.props.orderQuarterlyData;
                break;
            case 5:
                datas = that.props.orderYearlyData;
                break;
            case 6:
                datas = that.props.orderCustomData;
                break;
        };
        // var data = check ? [check] : [];
        // console.log(datas);
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: datas});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this.props.orderWeeklyData;
      // var data = check && check.length ? [check] : [];
        $('#'+tableId).bootstrapTable({
            columns: [
                {
                    title: '区域',
                    field: 'area',
                    sortable: true
                }, {
                    title: '新建工单数',
                    field: 'newtotal',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },{
                    title: '完成工单数',
                    field: 'completecount',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '完成工单率',
                    field: 'completerate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '平均维护时长(小时)',
                    field: 'avgduration',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '超时完成率',
                    field: 'outcompleterate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '超时未完成率',
                    field: 'outnocompleterate',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '时间',
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

OrderReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    orderWeeklyData: PropTypes.array.isRequired,
    orderMonthlyData: PropTypes.array.isRequired,
    orderQuarterlyData: PropTypes.array.isRequired,
    orderYearlyData: PropTypes.array.isRequired,
    orderCustomData: PropTypes.array.isRequired
}

module.exports = {
  OrderReportTable: OrderReportTable
};
