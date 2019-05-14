/**
* Created by xuexue.yin  2016/03/15.
* 资产维修统计报表-表格
*/
require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var dateFormatter = function(value){
    var date = new Date(value);
    if(!value||value==null||value==""||isNaN(date)) return "-";
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    if(month.toString().length<2) month = "0"+month;
    var day = date.getDate();
    if(day.toString().length<2) day = "0"+day;
    return year+"-"+month+"-"+day;
};

var AssetMaintainViewTable = React.createClass({
    /*getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            report:flux.store("AssetReportStore").getState()
        }
    },*/
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
                {
                    title: '维修开始时间',
                    field: 'START_TIME',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }, {
                    title: '维修结束时间',
                    field: 'END_TIME',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                },{
                    title: '资产编号',
                    field: 'ASSETS_CODE',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }, {
                    title: '维修人员',
                    field: 'CHECK_NAME',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }, {
                    title: '维修费用(元)',
                    field: 'MAINTENANCE_PAY',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                },
            ],
            data: data,
            exportDataType: "all"
        });
    },
    _getReportData: function(chartKey){
      var check = null, data = [];
      switch (chartKey) {
        case 3:
          check = this.props.report.maintainReportMonthlyData;
          break;
        case 5:
          check = this.props.report.maintainReportYearlyData;
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

module.exports = {
  AssetMaintainViewTable: AssetMaintainViewTable
};
