/**
 * Created by SHIN on 2016/1/27.
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

var DVRReportChart = require('./statisticsReportChart').DVRReportChart;
var DVRReportChartTwo = require('./statisticsReportChartTwo').DVRReportChart;
var DVRReportChartThree = require('./statisticsReportChartThree').DVRReportChart;

var DVRCustomReportChart = require('./statisticsReportChart').DVRCustomReportChart;
var DVRCustomReportChartTwo = require('./statisticsReportChartTwo').DVRCustomReportChart;
var DVRCustomReportChartThree = require('./statisticsReportChartThree').DVRCustomReportChart;

var DVRReportTable = require('./statisticsReportTable').DVRReportTable;
var DVRReportTableTwo = require('./statisticsReportTableTwo').DVRReportTable;
var DVRReportTableThree = require('./statisticsReportTableThree').DVRReportTable;
// var oDataReport = require('../../../../../server/oDataReport');
var Util = require('../../../../../utils/util');
var DateChange = require('../../../../../utils/dateChange.js');
var curdepdvrtabsState = 1;

var DVRStatisticsReportView = React.createClass({
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
        curdepdvrtabsState = 1;
        //清空自定义报表数据
        this.props.setinitCustomData();
        if (this.isMounted()) {
            if($('#dvrStatisticsReport') != null) {
                var height = $(window).height() - 110 - 30 + 'px';
                $('#dvrStatisticsReport').css("height",height);
            }
            $(window).resize(function () {
                if($('#dvrStatisticsReport') != null) {
                    var height = $(window).height() - 110 - 30 + 'px';
                    $('#dvrStatisticsReport').css("height",height);
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
        var tabsState = curdepdvrtabsState;
        switch (key) {
            case 1:
                type = 'storageDVRDaily'
                break;
            case 2:
                type = 'storageDVRWeekly'
                break;
            case 3:
                type = 'storageDVRMonthly'
                break;
            case 4:
                type = 'storageDVRQuarterly'
                break;
            case 5:
                type = 'storageDVRYearly'
                break;
            default:
        }
        param.status = 1;
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
        const { dvrStorageDailyData, dvrStorageWeeklyData, dvrStorageMonthlyData, dvrStorageQuarterlyData, dvrStorageYearlyData, dvrStorageCustomData, dvrStorageCustomLineData } = this.props;
        return (
            <div id="dvrStatisticsReport" className='overviewDesViewDiv assetDesViewDiv'>
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">报表：DVR统计</div>
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
                              {/** 日报*/}
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
                                                <DVRReportChart chartId="dvrDailyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                            </div>
                                            <div className="re-table">
                                                <DVRReportTable tableId="dvrDailyReportTable" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
                                                <DVRReportChartTwo chartId="dvrDailyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                            </div>
                                            <div className="re-table">
                                                <DVRReportTableTwo tableId="dvrDailyReportTableTwo" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
                                              <DVRReportChartThree chartId="dvrDailyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                  dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <DVRReportTableThree tableId="dvrDailyReportTableThree" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                  dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                                {/** 周报*/}
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
                                                <DVRReportChart chartId="dvrWeeklyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                            </div>
                                            <div className="re-table">
                                                <DVRReportTable tableId="dvrWeeklyReportTable" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
                                                <DVRReportChartTwo chartId="dvrWeeklyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                            </div>
                                            <div className="re-table">
                                                <DVRReportTableTwo tableId="dvrWeeklyReportTableTwo" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
                                              <DVRReportChartThree chartId="dvrWeeklyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                  dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <DVRReportTableThree tableId="dvrWeeklyReportTableThree" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                  dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
                                                <DVRReportChart chartId="dvrMonthlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                            </div>
                                            <div className="re-table">
                                                <DVRReportTable tableId="dvrMonthlyReportTable" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
                                                <DVRReportChartTwo chartId="dvrMonthlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                            </div>
                                            <div className="re-table">
                                                <DVRReportTableTwo tableId="dvrMonthlyReportTableTwo" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
                                              <DVRReportChartThree chartId="dvrMonthlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                  dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <DVRReportTableThree tableId="dvrMonthlyReportTableThree" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                  dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                </div>
                                {/** 季报*/}
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
                                                <DVRReportChart chartId="dvrQuarterlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                            </div>
                                            <div className="re-table">
                                                <DVRReportTable tableId="dvrQuarterlyReportTable" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
                                                <DVRReportChartTwo chartId="dvrQuarterlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                            </div>
                                            <div className="re-table">
                                                <DVRReportTableTwo tableId="dvrQuarterlyReportTableTwo" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
                                              <DVRReportChartThree chartId="dvrQuarterlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                  dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <DVRReportTableThree tableId="dvrQuarterlyReportTableThree" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                  dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                </div>
                                {/** 年报*/}
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
                                                <DVRReportChart chartId="dvrYearlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                            </div>
                                            <div className="re-table">
                                                <DVRReportTable tableId="dvrYearlyReportTable" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
                                                <DVRReportChartTwo chartId="dvrYearlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                            </div>
                                            <div className="re-table">
                                                <DVRReportTableTwo tableId="dvrYearlyReportTableTwo" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                    dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
                                              <DVRReportChartThree chartId="dvrYearlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                  dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <DVRReportTableThree tableId="dvrYearlyReportTableThree" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                  dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                </div>
                                {/** 自定义报表*/}
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
                                              <div className="panel-heading" role="tab" id="headingWorkStatusCustom">
                                                  <div className="panel-title">
                                                      <a role="button" data-toggle="collapse" data-parent="#accordionCustomOne" href="#collapseWorkStatusCustom" aria-expanded="false" aria-controls="collapseWorkStatusCustom" onClick={this.showEchart}>
                                                          厅级统计图
                                                      </a>
                                                  </div>
                                              </div>
                                              <div id="collapseWorkStatusCustom" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusCustom" aria-expanded="false">
                                                  <div className="panel-body">
                                                    <div className="re-chart col-md-12">
                                                      <DVRCustomReportChart chartId="dvrCustomReportChart" chartKey={this.state.tabsState} dvrStorageCustomLineData={dvrStorageCustomLineData}/>
                                                    </div>
                                                    <div className="re-table col-md-12">
                                                      <DVRReportTable tableId="dvrCustomReportTable" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                          dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                                    </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                    </div>
                                    <div className="dizhoujiCustom">
                                      <div className="subGroupPanel col-md-12" id="accordionCustomTwo" role="tablist" aria-multiselectable="true" >
                                          <div className="panel panel-default">
                                              <div className="panel-heading" role="tab" id="headingWorkStatusCustom2">
                                                  <div className="panel-title">
                                                      <a role="button" data-toggle="collapse" data-parent="#accordionCustomTwo" href="#collapseWorkStatusCustom2" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatusCustom2" onClick={this.showEchart}>
                                                          地州级统计图
                                                      </a>
                                                  </div>
                                              </div>
                                              <div id="collapseWorkStatusCustom2" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusCustom2" aria-expanded="false">
                                                  <div className="panel-body">
                                                    <div className="re-chart col-md-12">
                                                      <DVRCustomReportChartTwo chartId="dvrCustomReportChartTwo" chartKey={this.state.tabsState} dvrStorageCustomLineData={dvrStorageCustomLineData}/>
                                                    </div>
                                                    <div className="re-table col-md-12">
                                                      <DVRReportTableTwo tableId="dvrCustomReportTableTwo" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                          dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
                                                    </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                    </div>
                                    <div className="subGroupPanel col-md-12" id="accordionCustomThree" role="tablist" aria-multiselectable="true" >
                                        <div className="panel panel-default">
                                            <div className="panel-heading" role="tab" id="headingWorkStatusCustom3">
                                                <div className="panel-title">
                                                    <a role="button" data-toggle="collapse" data-parent="#accordionCustomThree" href="#collapseWorkStatusCustom3" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatusCustom3" onClick={this.showEchart}>
                                                        县市级统计图
                                                    </a>
                                                </div>
                                            </div>
                                            <div id="collapseWorkStatusCustom3" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusCustom3" aria-expanded="false">
                                                <div className="panel-body">
                                                  <div className="re-chart col-md-12">
                                                    <DVRCustomReportChartThree chartId="dvrCustomReportChartThree" chartKey={this.state.tabsState} dvrStorageCustomLineData={dvrStorageCustomLineData}/>
                                                  </div>
                                                  <div className="re-table col-md-12">
                                                    <DVRReportTableThree tableId="dvrCustomReportTableThree" chartKey={this.state.tabsState} dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData}
                                                        dvrStorageMonthlyData={dvrStorageMonthlyData} dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}/>
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
        curdepdvrtabsState = key;
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

DVRStatisticsReportView.propTypes = {
    dvrStorageDailyData: PropTypes.array.isRequired,
    dvrStorageWeeklyData: PropTypes.array.isRequired,
    dvrStorageMonthlyData: PropTypes.array.isRequired,
    dvrStorageQuarterlyData: PropTypes.array.isRequired,
    dvrStorageYearlyData: PropTypes.array.isRequired,
    dvrStorageCustomData: PropTypes.array.isRequired,
    dvrStorageCustomLineData: PropTypes.array.isRequired,
    setinitCustomData: PropTypes.func.isRequired,
    getStorageData: PropTypes.func.isRequired
}

module.exports = DVRStatisticsReportView;
