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

//厅级视频类设备报表-摄像机视频考核
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
        var data = this._getReportData(chartKey);//厅级
        // var data = check ? [check] : [];
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
          check = this.props.videoCheckDailyData;
          break;
        case 2:
          check = this.props.videoCheckWeeklyData;
          break;
        case 3:
          check = this.props.videoCheckMonthlyData;
          break;
        case 4:
          check = this.props.videoCheckQuarterlyData;
          break;
        case 5:
          check = this.props.videoCheckYearlyData;
          break;
        case 6:
          check = this.props.videoCheckCustomData;
          break;
        default:
      }
      if(check && typeof(check) == 'object' && check.constructor !== Array) {
        //check.length >= 3 是要显示 厅、州、县级 三层数据；check.length = 2 是要显示 州、县级 二层数据，厅级不显示；check.length = 1 是要显示 县级 一层数据，厅、州级不显示；
        if(check.length >= 3){
          var dataone = check[2];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }else if(check.length == 2){
          var dataone = check[1];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }
        else if(check.length == 1){
          var dataone = check[0];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }
				//data.push(check);
			}else if(check && check.constructor == Array) {
        //check.length >= 3 是要显示 厅、州、县级 三层数据；check.length = 2 是要显示 州、县级 二层数据，厅级不显示；check.length = 1 是要显示 县级 一层数据，厅、州级不显示；
        if(check.length >= 3){
          var dataone = check[2];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }else if(check.length == 2){
          var dataone = check[1];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }
        else if(check.length == 1){
          var dataone = check[0];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }
				//data = check;
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
    }
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

module.exports = {
  VideoReportTable: VideoReportTable
};
