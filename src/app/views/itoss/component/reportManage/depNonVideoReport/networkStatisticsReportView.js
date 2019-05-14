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

var NetworkReportChart = require('./statisticsReportChart').NetworkReportChart;
var NetworkReportChartTwo = require('./statisticsReportChartTwo').NetworkReportChart;
var NetworkReportChartThree = require('./statisticsReportChartThree').NetworkReportChart;

var NetworkCustomReportChart = require('./statisticsReportChart').NetworkCustomReportChart;
var NetworkCustomReportChartTwo = require('./statisticsReportChartTwo').NetworkCustomReportChart;
var NetworkCustomReportChartThree = require('./statisticsReportChartThree').NetworkCustomReportChart;

var NetworkReportTable = require('./statisticsReportTable').NetworkReportTable;
var NetworkReportTableTwo = require('./statisticsReportTableTwo').NetworkReportTable;
var NetworkReportTableThree = require('./statisticsReportTableThree').NetworkReportTable;

var Util = require('../../../../../utils/util');
var DateChange = require('../../../../../utils/dateChange.js');
var curdepnetworktabsState = 1;
var NetworkStatisticsReportView = React.createClass({
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
        curdepnetworktabsState = 1;
        //清空自定义报表数据
        this.props.setinitCustomData();
        if (this.isMounted()) {
            if($('#networkStatisticsReport') != null) {
                var height = $(window).height() - 110 - 30 + 'px';
                $('#networkStatisticsReport').css("height",height);
            }
            $(window).resize(function () {
                if($('#networkStatisticsReport') != null) {
                    var height = $(window).height() - 110 - 30 + 'px';
                    $('#networkStatisticsReport').css("height",height);
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
        var tabsState = curdepnetworktabsState;
        switch (key) {
            case 1:
                type = 'serverDaily'
                break;
            case 2:
                type = 'serverWeekly'
                break;
            case 3:
                type = 'serverMonthly'
                break;
            case 4:
                type = 'serverQuarterly'
                break;
            case 5:
                type = 'serverYearly'
                break;
            default:
        }
        param.status = 2;
        param.key = tabsState;
        param.reportType = type;
        param.startTime = par.startTime;
        param.serverType = 'network';
        if (par.endTime) {
            param.endTime = par.endTime;
        }
        this.props.getServerReportData(param);
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
        const { networkDailyData, networkWeeklyData, networkMonthlyData, networkQuarterlyData, networkYearlyData, networkCustomData, networkCustomLineData } = this.props;
        return (
            <div id="networkStatisticsReport" className='overviewDesViewDiv assetDesViewDiv'>
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">报表：网络设备统计</div>
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
                                              <NetworkReportChart chartId="networkDailyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTable tableId="networkDailyReportTable" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChartTwo chartId="networkDailyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTableTwo tableId="networkDailyReportTableTwo" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChartThree chartId="networkDailyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTableThree tableId="networkDailyReportTableThree" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChart chartId="networkWeeklyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTable tableId="networkWeeklyReportTable" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChartTwo chartId="networkWeeklyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTableTwo tableId="networkWeeklyReportTableTwo" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChartThree chartId="networkWeeklyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTableThree tableId="networkWeeklyReportTableThree" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
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
                                              <NetworkReportChart chartId="networkMonthlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTable tableId="networkMonthlyReportTable" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChartTwo chartId="networkMonthlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTableTwo tableId="networkMonthlyReportTableTwo" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChartThree chartId="networkMonthlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTableThree tableId="networkMonthlyReportTableThree" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChart chartId="networkQuarterlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTable tableId="networkQuarterlyReportTable" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChartTwo chartId="networkQuarterlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTableTwo tableId="networkQuarterlyReportTableTwo" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChartThree chartId="networkQuarterlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTableThree tableId="networkQuarterlyReportTableThree" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChart chartId="networkYearlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTable tableId="networkYearlyReportTable" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChartTwo chartId="networkYearlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTableTwo tableId="networkYearlyReportTableTwo" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                              <NetworkReportChartThree chartId="networkYearlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
                                          </div>
                                          <div className="re-table">
                                              <NetworkReportTableThree tableId="networkYearlyReportTableThree" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                  networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                                <NetworkCustomReportChart chartId="networkCustomReportChart" chartKey={this.state.tabsState} networkCustomLineData={networkCustomLineData}/>
                                            </div>
                                            <div className="re-table col-md-12">
                                                <NetworkReportTable tableId="networkCustomReportTable" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                    networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                                <NetworkCustomReportChartTwo chartId="networkCustomReportChartTwo" chartKey={this.state.tabsState} networkCustomLineData={networkCustomLineData}/>
                                            </div>
                                            <div className="re-table col-md-12">
                                                <NetworkReportTableTwo tableId="networkCustomReportTableTwo" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                    networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
                                                <NetworkCustomReportChartThree chartId="networkCustomReportChartThree" chartKey={this.state.tabsState} networkCustomLineData={networkCustomLineData}/>
                                            </div>
                                            <div className="re-table col-md-12">
                                                <NetworkReportTableThree tableId="networkCustomReportTableThree" chartKey={this.state.tabsState} networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData}
                                                    networkMonthlyData={networkMonthlyData} networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}/>
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
        curdepnetworktabsState = key;
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

NetworkStatisticsReportView.propTypes = {
    networkDailyData: PropTypes.array.isRequired,
    networkWeeklyData: PropTypes.array.isRequired,
    networkMonthlyData: PropTypes.array.isRequired,
    networkQuarterlyData: PropTypes.array.isRequired,
    networkYearlyData: PropTypes.array.isRequired,
    networkCustomData: PropTypes.array.isRequired,
    networkCustomLineData: PropTypes.array.isRequired,
    setinitCustomData: PropTypes.func.isRequired,
    getServerReportData: PropTypes.func.isRequired
}

module.exports = NetworkStatisticsReportView;
