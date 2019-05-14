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
        var data = this._getReportData(chartKey);//厅级
        var tableId = this.props.tableId;
        $('#'+tableId).bootstrapTable('refreshOptions',{data: data});
    },
    _initTable: function(){
      var tableId = this.props.tableId;
      var chartKey = this.props.chartKey;
      var data = this._getReportData(chartKey);//厅级
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
    _getReportData: function(chartKey){
      var check = null, data = [];
      switch (chartKey) {
        case 1:
          check = this.props.orderDailyData;
          break;
        case 2:
          check = this.props.orderWeeklyData;
          break;
        case 3:
          check = this.props.orderMonthlyData;
          break;
        case 4:
          check = this.props.orderQuarterlyData;
          break;
        case 5:
          check = this.props.orderYearlyData;
          break;
        case 6:
          check = this.props.orderCustomData;
          break;
        default:
      }
      if(check && typeof(check) == 'object' && check.constructor !== Array) {
          //check.length >= 3 是要显示 厅、州、县级 三层数据；check.length = 2 是要显示 州、县级 二层数据，厅级不显示；check.length = 1 是要显示 县级 一层数据，厅、州级不显示；
          if(check.length >= 3){
            var dataone = check[1];
            for(var i=0;i<dataone.length;i++){
              if (dataone[i]) {
                data.push(dataone[i]);
              }
            }
          }else if (check.length == 2) {
            var dataone = check[0];
            for(var i=0;i<dataone.length;i++){
              if (dataone[i]) {
                data.push(dataone[i]);
              }
            }
          }
      }else if(check && check.constructor == Array) {
        //check.length >= 3 是要显示 厅、州、县级 三层数据；check.length = 2 是要显示 州、县级 二层数据，厅级不显示；check.length = 1 是要显示 县级 一层数据，厅、州级不显示；
        if(check.length >= 3){
          var dataone = check[1];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }else if (check.length == 2) {
          var dataone = check[0];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }
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

OrderReportTable.propTypes = {
    tableId: PropTypes.string.isRequired,
    chartKey: PropTypes.number.isRequired,
    orderDailyData: PropTypes.array.isRequired,
    orderWeeklyData: PropTypes.array.isRequired,
    orderMonthlyData: PropTypes.array.isRequired,
    orderQuarterlyData: PropTypes.array.isRequired,
    orderYearlyData: PropTypes.array.isRequired,
    orderCustomData: PropTypes.array.isRequired
}

module.exports = {
  OrderReportTable: OrderReportTable
};
