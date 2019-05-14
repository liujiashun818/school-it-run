/**
 * Created by xuexue.yin on 2016/02/22.
 * 厅级非视频类设备报表-NVR统计
 */
require('bootstrap');

// var React = require('react');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var DateTimePicker = require('react-widgets').DateTimePicker;

var NVRReportChart = require('./statisticsReportChart').NVRReportChart;
var NVRReportChartTwo = require('./statisticsReportChartTwo').NVRReportChart;
var NVRReportChartThree = require('./statisticsReportChartThree').NVRReportChart;

var NVRCustomReportChart = require('./statisticsReportChart').NVRCustomReportChart;
var NVRCustomReportChartTwo = require('./statisticsReportChartTwo').NVRCustomReportChart;
var NVRCustomReportChartThree = require('./statisticsReportChartThree').NVRCustomReportChart;

var NVRReportTable = require('./statisticsReportTable').NVRReportTable;
var NVRReportTableTwo = require('./statisticsReportTableTwo').NVRReportTable;
var NVRReportTableThree = require('./statisticsReportTableThree').NVRReportTable;

var Util = require('../../../../../utils/util');
var DateChange = require('../../../../../utils/dateChange.js');
var curdepnvrtabsState = 1;
var NVRStatisticsReportView = React.createClass({
    // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         report:flux.store("ReportManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return{//@MODIFY
            tabsState: 1,
            customOption: 1,
            initdate:""
        }
    },
    componentDidMount: function() {
        curdepnvrtabsState = 1;
        //清空自定义报表数据
        this.props.setinitCustomData();
        if (this.isMounted()) {
            if($('#nvrStatisticsReport') != null) {
                var height = $(window).height() - 110 - 30 + 'px';
                $('#nvrStatisticsReport').css("height",height);
            }
            $(window).resize(function () {
                if($('#nvrStatisticsReport') != null) {
                    var height = $(window).height() - 110 - 30 + 'px';
                    $('#nvrStatisticsReport').css("height",height);
                }
            });
            var _this = this;
            setTimeout(function(){
              _this.getInitData();
            },800);
        }
    },
    getInitData: function(){
        this._getInitDailyData();
        // this._getInitWeeklyData();
        // this._getInitMonthlyData();
        // this._getInitQuarterlyData();
        // this._getInitYearlyData();
    },
    _getInitDailyData: function(){
        var date = Util.getAgoDate();
        this.setState({initdate: date});
        var par = {
            key: 1,
            startTime: date
        }
        this._getCheckData(par);
    },
    _getInitWeeklyData: function(){
        var date = Util.getLastDay().lastWeekStartDate;
        this.setState({initdate: date});
        var par = {
            key: 2,
            startTime: date
        }
        this._getCheckData(par);
    },
    _getInitMonthlyData: function(){
        var date = Util.getLastDay().lastMonthStartDate;
        this.setState({initdate: date});
        var par = {
            key: 3,
            startTime: date
        }
        this._getCheckData(par);
    },
    _getInitQuarterlyData: function(){
        var date = Util.getLastDay().lastQuarterStartDate;
        this.setState({initdate: date});
        var par = {
            key: 4,
            startTime: date
        }
        this._getCheckData(par);
    },
    _getInitYearlyData: function(){
        var date = Util.getLastDay().lastYearStartDate;
        this.setState({initdate: date});
        var par = {
            key: 5,
            startTime: date
        }
        this._getCheckData(par);
    },
    _getCheckData: function(par){
        var param = {}, type = '';
        var key = par.key;
        if (key == 6) {
            key = this.state.customOption;
        };
        var tabsState = curdepnvrtabsState;
        switch (key) {
            case 1:
                type = 'storageNVRDaily'
                break;
            case 2:
                type = 'storageNVRWeekly'
                break;
            case 3:
                type = 'storageNVRMonthly'
                break;
            case 4:
                type = 'storageNVRQuarterly'
                break;
            case 5:
                type = 'storageNVRYearly'
                break;
            default:
        }
        param.status = 2;
        param.key = tabsState;
        param.reportType = type;
        param.startTime = par.startTime;
        if (par.endTime) {
            param.endTime = par.endTime;
        }
        this.props.getStorageData(param);
    },
    componentDidUpdate: function() {
      if(this.state.tabsState == 1){
        ReactDOM.findDOMNode(this.refs.dayReportTime).firstChild.value = this.state.initdate;
      }else if (this.state.tabsState == 2) {
        ReactDOM.findDOMNode(this.refs.weekReportTime).firstChild.value = this.state.initdate;
      }else if (this.state.tabsState == 3) {
        ReactDOM.findDOMNode(this.refs.monthReportTime).firstChild.value = this.state.initdate;
      }else if (this.state.tabsState == 4) {
        ReactDOM.findDOMNode(this.refs.quarterReportTime).firstChild.value = this.state.initdate;
      }else if (this.state.tabsState == 5) {
        ReactDOM.findDOMNode(this.refs.yearReportTime).firstChild.value = this.state.initdate;
      }
    },
    render: function() {
        const { nvrStorageDailyData, nvrStorageWeeklyData, nvrStorageMonthlyData, nvrStorageQuarterlyData, nvrStorageYearlyData, nvrStorageCustomData, nvrStorageCustomLineData } = this.props;
        return (
            <div id="nvrStatisticsReport" className='overviewDesViewDiv assetDesViewDiv'>
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">报表：NVR统计</div>
                    <div className="titleRight">
                        <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                        <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="col-md-12">
                    <div className="re-view">
                        <ul className="nav nav-tabs">
                            <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick.bind(this, 1)}>日报</a></li>
                            <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick.bind(this, 2)}>周报</a></li>
                            <li><a href="#tab_3" data-toggle="tab" onClick={this.handleTabClick.bind(this, 3)}>月报</a></li>
                            <li><a href="#tab_4" data-toggle="tab" onClick={this.handleTabClick.bind(this, 4)}>季报</a></li>
                            <li><a href="#tab_5" data-toggle="tab" onClick={this.handleTabClick.bind(this, 5)}>年报</a></li>
                            <li><a href="#tab_6" data-toggle="tab" onClick={this.handleTabClick.bind(this, 6)}>自定义报表</a></li>
                        </ul>
                        <fieldset className="maintainOrderTable assetManageTable">
                            <div className="contentDiv tab-content marginleft_none">
                                <div className="tab-pane active" id="tab_1">
                                    <div className="form-inline re-form">
                                        <div className="form-group">
                                            <label>请选择：</label>
                                        </div>
                                        <div className="form-group">
                                            <DateTimePicker ref="dayReportTime" className="dateTimePickerStyle" time={false} defaultValue={null} format={"yyyy-MM-dd"}/>
                                        </div>
                                        <div className="form-group padding-left-10">
                                            <button className="btn btn-success" onClick={this.handleSearch.bind(this, 1)}>查询</button>
                                        </div>
                                    </div>
                                    <div className="tingji">
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingOne">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            厅级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChart chartId="nvrDailyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTable tableId="nvrDailyReportTable" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="dizhouji">
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingTwo">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            地州级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseTwo" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChartTwo chartId="nvrDailyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTableTwo tableId="dvrDailyReportTableTwo" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingThree">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                            县市级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseThree" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingThree">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChartThree chartId="nvrDailyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTableThree tableId="dvrDailyReportTableThree" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab_2">
                                    <div className="form-inline re-form">
                                        <div className="form-group">
                                            <label>请选择：</label>
                                        </div>
                                        <div className="form-group">
                                            <DateTimePicker ref="weekReportTime" className="dateTimePickerStyle" time={false} defaultValue={null} format={"yyyy-MM-dd"}/>
                                        </div>
                                        <div className="form-group padding-left-10">
                                            <button className="btn btn-success" onClick={this.handleSearch.bind(this, 2)}>查询</button>
                                        </div>
                                    </div>
                                    <div className="tingji">
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingOne2">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne2" aria-expanded="true" aria-controls="collapseOne2">
                                            厅级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseOne2" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne2">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChart chartId="nvrWeeklyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTable tableId="nvrWeeklyReportTable" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="dizhouji">
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingTwo2">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo2" aria-expanded="true" aria-controls="collapseTwo2">
                                            地州级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseTwo2" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo2">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChartTwo chartId="nvrWeeklyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTableTwo tableId="nvrWeeklyReportTableTwo" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingThree2">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree2" aria-expanded="true" aria-controls="collapseThree2">
                                            县市级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseThree2" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingThree2">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChartThree chartId="nvrWeeklyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTableThree tableId="nvrWeeklyReportTableThree" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                              {/** 月报*/}
                                <div className="tab-pane" id="tab_3">
                                    <div className="form-inline re-form">
                                        <div className="form-group">
                                            <label>请选择：</label>
                                        </div>
                                        <div className="form-group">
                                            <DateTimePicker ref="monthReportTime" className="dateTimePickerStyle" time={false} defaultValue={null} format={"yyyy-MM-dd"}/>
                                        </div>
                                        <div className="form-group padding-left-10">
                                            <button className="btn btn-success" onClick={this.handleSearch.bind(this, 3)}>查询</button>
                                        </div>
                                    </div>
                                    <div className="tingji">
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingOne3">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne3" aria-expanded="true" aria-controls="collapseOne3">
                                            厅级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseOne3" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne3">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChart chartId="nvrMonthlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTable tableId="nvrMonthlyReportTable" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="dizhouji">
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingTwo3">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo3" aria-expanded="true" aria-controls="collapseTwo3">
                                            地州级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseTwo3" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo3">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChartTwo chartId="nvrMonthlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTableTwo tableId="nvrMonthlyReportTableTwo" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingThree3">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree3" aria-expanded="true" aria-controls="collapseThree3">
                                            县市级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseThree3" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingThree3">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChartThree chartId="nvrMonthlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTableThree tableId="nvrMonthlyReportTableThree" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab_4">
                                    <div className="form-inline re-form">
                                        <div className="form-group">
                                            <label>请选择：</label>
                                        </div>
                                        <div className="form-group">
                                            <DateTimePicker ref="quarterReportTime" className="dateTimePickerStyle" time={false} defaultValue={null} format={"yyyy-MM-dd"}/>
                                        </div>
                                        <div className="form-group padding-left-10">
                                            <button className="btn btn-success" onClick={this.handleSearch.bind(this, 4)}>查询</button>
                                        </div>
                                    </div>
                                    <div className="tingji">
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingOne4">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne4" aria-expanded="true" aria-controls="collapseOne4">
                                            厅级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseOne4" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne4">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChart chartId="nvrQuarterlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTable tableId="nvrQuarterlyReportTable" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="dizhouji">
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingTwo4">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo4" aria-expanded="true" aria-controls="collapseTwo4">
                                            地州级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseTwo4" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo4">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChartTwo chartId="nvrQuarterlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTableTwo tableId="nvrQuarterlyReportTableTwo" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingThree4">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree4" aria-expanded="true" aria-controls="collapseThree4">
                                            县市级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseThree4" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingThree4">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChartThree chartId="nvrQuarterlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTableThree tableId="nvrQuarterlyReportTableThree" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab_5">
                                    <div className="form-inline re-form">
                                        <div className="form-group">
                                            <label>请选择：</label>
                                        </div>
                                        <div className="form-group">
                                            <DateTimePicker ref="yearReportTime" className="dateTimePickerStyle" time={false} defaultValue={null} format={"yyyy-MM-dd"}/>
                                        </div>
                                        <div className="form-group padding-left-10">
                                            <button className="btn btn-success" onClick={this.handleSearch.bind(this, 5)}>查询</button>
                                        </div>
                                    </div>
                                    <div className="tingji">
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingOne5">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne5" aria-expanded="true" aria-controls="collapseOne5">
                                            厅级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseOne5" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne5">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChart chartId="nvrYearlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTable tableId="nvrYearlyReportTable" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="dizhouji">
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingTwo5">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo5" aria-expanded="true" aria-controls="collapseTwo5">
                                            地州级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseTwo5" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo5">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChartTwo chartId="nvrYearlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTableTwo tableId="nvrYearlyReportTableTwo" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                    <div className="panel panel-default">
                                      <div className="panel-heading" role="tab" id="headingThree5">
                                        <h4 className="panel-title">
                                          <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree5" aria-expanded="true" aria-controls="collapseThree5">
                                            县市级统计图
                                          </a>
                                        </h4>
                                      </div>
                                      <div id="collapseThree5" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingThree5">
                                        <div className="panel-body">
                                          <div className="re-chart">
                                              <NVRReportChartThree chartId="nvrYearlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NVRReportTableThree tableId="nvrYearlyReportTableThree" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                  nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab_6">
                                    <div className="col-md-6">
                                        <div className="form-inline re-form">
                                            <div className="form-group">
                                                <label>开始时间：</label>
                                            </div>
                                            <div className="form-group">
                                                <DateTimePicker ref="customReportStartTime" className="dateTimePickerStyle" time={false} defaultValue={null} format={"yyyy-MM-dd"}/>
                                            </div>
                                            <div className="form-group padding-left-10">
                                                <label>结束时间：</label>
                                            </div>
                                            <div className="form-group">
                                                <DateTimePicker ref="customReportEndTime" className="dateTimePickerStyle" time={false} defaultValue={null} format={"yyyy-MM-dd"}/>
                                            </div>
                                            <div className="form-group padding-left-10">
                                                <button className="btn btn-success" onClick={this.handleSearch.bind(this, 6)}>查询</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inline re-form2">
                                            <div className="form-group">
                                                <label><b>时间颗粒度：</b></label>
                                            </div>
                                            <div className="form-group re-inter">
                                                <a href="javascript:;" className='active' onClick={this.selectCustomOptions.bind(this, 1)}>日</a>
                                                <a href="javascript:;" onClick={this.selectCustomOptions.bind(this, 2)}>周</a>
                                                <a href="javascript:;" onClick={this.selectCustomOptions.bind(this, 3)}>月</a>
                                                <a href="javascript:;" onClick={this.selectCustomOptions.bind(this, 4)}>季度</a>
                                                <a href="javascript:;" onClick={this.selectCustomOptions.bind(this, 5)}>年</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tingjiCustom">
                                    <div className="subGroupPanel col-md-12" id="accordionCustomOne" role="tablist" aria-multiselectable="true" >
                                      <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingCustomOne">
                                          <h4 className="panel-title">
                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordionCustomOne" href="#collapseCustomOne" aria-expanded="true" aria-controls="collapseCustomOne">
                                              厅级统计图
                                            </a>
                                          </h4>
                                        </div>
                                        <div id="collapseCustomOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingCustomOne">
                                          <div className="panel-body">
                                            <div className="re-chart col-md-12">
                                                <NVRCustomReportChart chartId="nvrCustomReportChart" chartKey={this.state.tabsState} nvrStorageCustomLineData={nvrStorageCustomLineData}/>
                                            </div>
                                            <div className="re-table col-md-12">
                                                <NVRReportTable tableId="nvrCustomReportTable" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                    nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="dizhoujiCustom">
                                    <div className="subGroupPanel col-md-12" id="accordionCustomTwo" role="tablist" aria-multiselectable="true" >
                                      <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingCustomTwo">
                                          <h4 className="panel-title">
                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordionCustomTwo" href="#collapseCustomTwo" aria-expanded="true" aria-controls="collapseCustomTwo">
                                              地州级统计图
                                            </a>
                                          </h4>
                                        </div>
                                        <div id="collapseCustomTwo" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingCustomTwo">
                                          <div className="panel-body">
                                            <div className="re-chart col-md-12">
                                                <NVRCustomReportChartTwo chartId="nvrCustomReportChartTwo" chartKey={this.state.tabsState} nvrStorageCustomLineData={nvrStorageCustomLineData}/>
                                            </div>
                                            <div className="re-table col-md-12">
                                                <NVRReportTableTwo tableId="nvrCustomReportTableTwo" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                    nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                    <div className="subGroupPanel col-md-12" id="accordionCustomThree" role="tablist" aria-multiselectable="true" >
                                      <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingCustomThree">
                                          <h4 className="panel-title">
                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordionCustomThree" href="#collapseCustomThree" aria-expanded="true" aria-controls="collapseCustomThree">
                                              县市级统计图
                                            </a>
                                          </h4>
                                        </div>
                                        <div id="collapseCustomThree" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingCustomThree">
                                          <div className="panel-body">
                                            <div className="re-chart col-md-12">
                                                <NVRCustomReportChartThree chartId="nvrCustomReportChartThree" chartKey={this.state.tabsState} nvrStorageCustomLineData={nvrStorageCustomLineData}/>
                                            </div>
                                            <div className="re-table col-md-12">
                                                <NVRReportTableThree tableId="nvrCustomReportTableThree" chartKey={this.state.tabsState} nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData}
                                                    nvrStorageMonthlyData={nvrStorageMonthlyData} nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}/>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>

                        </fieldset>
                    </div>
                </div>
            </div>
        );
    },
    handleTabClick: function(key){
        this.setState({tabsState: key});
        curdepnvrtabsState = key;
        var timeValue = "";
        if(key == 1){
          timeValue = ReactDOM.findDOMNode(this.refs.dayReportTime).firstChild.value;
          if(timeValue == ""){
            this._getInitDailyData();
          }else{
            this.setState({initdate: timeValue});
          }
        }else if (key == 2) {
          timeValue = ReactDOM.findDOMNode(this.refs.weekReportTime).firstChild.value;
          if(timeValue == ""){
            this._getInitWeeklyData();
          }else{
            this.setState({initdate: timeValue});
          }
        }else if (key == 3) {
          timeValue = ReactDOM.findDOMNode(this.refs.monthReportTime).firstChild.value;
          if(timeValue == ""){
            this._getInitMonthlyData();
          }else{
            this.setState({initdate: timeValue});
          }
        }else if (key == 4) {
          timeValue = ReactDOM.findDOMNode(this.refs.quarterReportTime).firstChild.value;
          if(timeValue == ""){
            this._getInitQuarterlyData();
          }else{
            this.setState({initdate: timeValue});
          }
        }else if (key == 5) {
          timeValue = ReactDOM.findDOMNode(this.refs.yearReportTime).firstChild.value;
          if(timeValue == ""){
            this._getInitYearlyData();
          }else{
            this.setState({initdate: timeValue});
          }
        }
    },
    handleSearch: function(key){
        var timeValue = '';
        switch (key) {
            case 1:
                timeValue = ReactDOM.findDOMNode(this.refs.dayReportTime).firstChild.value;
                this.setState({initdate: timeValue});
                break;
            case 2:
                timeValue = ReactDOM.findDOMNode(this.refs.weekReportTime).firstChild.value;
                this.setState({initdate: timeValue});
                break;
            case 3:
                timeValue = ReactDOM.findDOMNode(this.refs.monthReportTime).firstChild.value;
                this.setState({initdate: timeValue});
                break;
            case 4:
                timeValue = ReactDOM.findDOMNode(this.refs.quarterReportTime).firstChild.value;
                this.setState({initdate: timeValue});
                break;
            case 5:
                timeValue = ReactDOM.findDOMNode(this.refs.yearReportTime).firstChild.value;
                this.setState({initdate: timeValue});
                break;
            case 6:
                timeValue = ReactDOM.findDOMNode(this.refs.customReportStartTime).firstChild.value;
                var endTimeValue = ReactDOM.findDOMNode(this.refs.customReportEndTime).firstChild.value;
                break;
            default:
        };
        if(key == 6){
          if (!timeValue || !endTimeValue) {
            alert("请选择开始时间和结束时间。");
            return;
          }else{
            var startTimetemp = DateChange.strToDate(timeValue);
            var endTimetemp = DateChange.strToDate(endTimeValue);
            if(startTimetemp > endTimetemp){
              alert("开始时间不能大于结束时间。");
              return;
            }
          }
        }else{
          if (!timeValue) {
            return;
          }
        };
        var par = {
            key: key,
            startTime: timeValue
        }
        if (endTimeValue) {
            par.endTime = endTimeValue;
        }
        this._getCheckData(par);
    },
    selectCustomOptions: function(key, e){
        $(".re-inter").find("a").each(function(){
            $(this).attr("class","");
        });
        $(e.target).attr("class","active");
        var startTimeValue = ReactDOM.findDOMNode(this.refs.customReportStartTime).firstChild.value;
        var endTimeValue = ReactDOM.findDOMNode(this.refs.customReportEndTime).firstChild.value;
        if (!startTimeValue || !endTimeValue) {
            alert("请选择开始时间和结束时间。");
            return;
        };
        var startTimetemp = DateChange.strToDate(startTimeValue);
        var endTimetemp = DateChange.strToDate(endTimeValue);
        if(startTimetemp > endTimetemp){
          alert("开始时间不能大于结束时间。");
          return;
        };
        this.setState({customOption: key});
        var param = {
            key: key,
            startTime: startTimeValue,
            endTime: endTimeValue
        }
        this._getCheckData(param);
    }
});

NVRStatisticsReportView.propTypes = {
    nvrStorageDailyData: PropTypes.array.isRequired,
    nvrStorageWeeklyData: PropTypes.array.isRequired,
    nvrStorageMonthlyData: PropTypes.array.isRequired,
    nvrStorageQuarterlyData: PropTypes.array.isRequired,
    nvrStorageYearlyData: PropTypes.array.isRequired,
    nvrStorageCustomData: PropTypes.array.isRequired,
    nvrStorageCustomLineData: PropTypes.array.isRequired,
    setinitCustomData: PropTypes.func.isRequired,
    getStorageData: PropTypes.func.isRequired
}

module.exports = NVRStatisticsReportView;
