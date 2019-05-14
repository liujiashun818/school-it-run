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

var ServerReportChart = require('./statisticsReportChart').ServerReportChart;
var ServerReportChartTwo = require('./statisticsReportChartTwo').ServerReportChart;
var ServerReportChartThree = require('./statisticsReportChartThree').ServerReportChart;

var ServerCustomReportChart = require('./statisticsReportChart').ServerCustomReportChart;
var ServerCustomReportChartTwo = require('./statisticsReportChartTwo').ServerCustomReportChart;
var ServerCustomReportChartThree = require('./statisticsReportChartThree').ServerCustomReportChart;

var ServerReportTable = require('./statisticsReportTable').ServerReportTable;
var ServerReportTableTwo = require('./statisticsReportTableTwo').ServerReportTable;
var ServerReportTableThree = require('./statisticsReportTableThree').ServerReportTable;
var Util = require('../../../../../utils/util');
var DateChange = require('../../../../../utils/dateChange.js');
var curdepservertabsState = 1;
var RegionalReport = React.createClass({
    render: function() {
        return (
          <div className="panel panel-default">
            <div className="panel-heading" role="tab" id={this.props.heading}>
              <h4 className="panel-title">
                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href={"#"+this.props.collapse} aria-expanded="true" aria-controls={this.props.collapse}>
                  {this.props.chartName}
                </a>
              </h4>
            </div>
            <div id={this.props.collapse} className="panel-collapse collapse in" role="tabpanel" aria-labelledby={this.props.heading}>
              <div className="panel-body">
                <div className="re-chart">
                    {this.props.ServerReportChart}
                </div>
                <div className="re-table">
                    {this.props.ServerReportTable}
                </div>
              </div>
            </div>
          </div>
        );
    }
});

var ServerStatisticsReportView = React.createClass({
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
        curdepservertabsState = 1;
        //清空自定义报表数据
        this.props.setinitCustomData();
        if (this.isMounted()) {
            if($('#serverStatisticsReport') != null) {
                var height = $(window).height() - 110 - 30 + 'px';
                $('#serverStatisticsReport').css("height",height);
            }
            $(window).resize(function () {
                if($('#serverStatisticsReport') != null) {
                    var height = $(window).height() - 110 - 30 + 'px';
                    $('#serverStatisticsReport').css("height",height);
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
        var tabsState = curdepservertabsState;
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
        param.status = 1;
        param.key = tabsState;
        param.reportType = type;
        param.startTime = par.startTime;
        param.serverType = 'server';
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
        const { serverDailyData, serverWeeklyData, serverMonthlyData, serverQuarterlyData, serverYearlyData, serverCustomData, serverCustomLineData } = this.props;
        return (
            <div id="serverStatisticsReport" className='overviewDesViewDiv assetDesViewDiv'>
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">报表：服务器统计</div>
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
                                    <RegionalReport
                                      chartName="厅级统计图"
                                      heading="headingT"
                                      collapse="collapseT"
                                      ServerReportChart={<ServerReportChart chartId="serverDailyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTable tableId="serverDailyReportTable" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                  </div>
                                  <div className="dizhouji">
                                    <RegionalReport
                                      chartName="地州级统计图"
                                      heading="headingD"
                                      collapse="collapseD"
                                      ServerReportChart={<ServerReportChartTwo chartId="serverDailyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTableTwo tableId="serverDailyReportTableTwo" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                  </div>
                                    <RegionalReport
                                      chartName="县市级统计图"
                                      heading="headingX"
                                      collapse="collapseX"
                                      ServerReportChart={<ServerReportChartThree chartId="serverDailyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTableThree tableId="serverDailyReportTableThree" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>

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
                                    <RegionalReport
                                      chartName="厅级统计图"
                                      heading="headingT2"
                                      collapse="collapseT2"
                                      ServerReportChart={<ServerReportChart chartId="serverWeeklyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTable tableId="serverWeeklyReportTable" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                  </div>
                                  <div className="dizhouji">
                                    <RegionalReport
                                      chartName="地州级统计图"
                                      heading="headingD2"
                                      collapse="collapseD2"
                                      ServerReportChart={<ServerReportChartTwo chartId="serverWeeklyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTableTwo tableId="serverWeeklyReportTableTwo" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                  </div>
                                    <RegionalReport
                                      chartName="县市级统计图"
                                      heading="headingX2"
                                      collapse="collapseX2"
                                      ServerReportChart={<ServerReportChartThree chartId="serverWeeklyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTableThree tableId="serverWeeklyReportTableThree" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>

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
                                    <RegionalReport
                                      chartName="厅级统计图"
                                      heading="headingT3"
                                      collapse="collapseT3"
                                      ServerReportChart={<ServerReportChart chartId="serverMonthlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTable tableId="serverMonthlyReportTable" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                  </div>
                                  <div className="dizhouji">
                                    <RegionalReport
                                      chartName="地州级统计图"
                                      heading="headingD3"
                                      collapse="collapseD3"
                                      ServerReportChart={<ServerReportChartTwo chartId="serverMonthlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTableTwo tableId="serverMonthlyReportTableTwo" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                  </div>
                                    <RegionalReport
                                      chartName="县市级统计图"
                                      heading="headingX3"
                                      collapse="collapseX3"
                                      ServerReportChart={<ServerReportChartThree chartId="serverMonthlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTableThree tableId="serverMonthlyReportTableThree" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>

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
                                    <RegionalReport
                                      chartName="厅级统计图"
                                      heading="headingT4"
                                      collapse="collapseT4"
                                      ServerReportChart={<ServerReportChart chartId="serverQuarterlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTable tableId="serverQuarterlyReportTable" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                  </div>
                                  <div className="dizhouji">
                                    <RegionalReport
                                      chartName="地州级统计图"
                                      heading="headingD4"
                                      collapse="collapseD4"
                                      ServerReportChart={<ServerReportChartTwo chartId="serverQuarterlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTableTwo tableId="serverQuarterlyReportTableTwo" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                  </div>
                                    <RegionalReport
                                      chartName="县市级统计图"
                                      heading="headingX4"
                                      collapse="collapseX4"
                                      ServerReportChart={<ServerReportChartThree chartId="serverQuarterlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTableThree tableId="serverQuarterlyReportTableThree" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
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
                                    <RegionalReport
                                      chartName="厅级统计图"
                                      heading="headingT5"
                                      collapse="collapseT5"
                                      ServerReportChart={<ServerReportChart chartId="serverYearlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTable tableId="serverYearlyReportTable" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                  </div>
                                  <div className="dizhouji">
                                    <RegionalReport
                                      chartName="地州级统计图"
                                      heading="headingD5"
                                      collapse="collapseD5"
                                      ServerReportChart={<ServerReportChartTwo chartId="serverYearlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTableTwo tableId="serverYearlyReportTableTwo" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                  </div>
                                    <RegionalReport
                                      chartName="县市级统计图"
                                      heading="headingX5"
                                      collapse="collapseX5"
                                      ServerReportChart={<ServerReportChartThree chartId="serverYearlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}
                                      ServerReportTable={<ServerReportTableThree tableId="serverYearlyReportTableThree" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                          serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
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
                                      <RegionalReport
                                        chartName="厅级统计图"
                                        heading="headingT6"
                                        collapse="collapseT6"
                                        ServerReportChart={<ServerCustomReportChart chartId="serverCustomReportChart" chartKey={this.state.tabsState} serverCustomLineData={serverCustomLineData}/>}
                                        ServerReportTable={<ServerReportTable tableId="serverCustomReportTable" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                            serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                    </div>
                                  </div>
                                  <div className="dizhoujiCustom">
                                    <div className="subGroupPanel col-md-12" id="accordionCustomOne" role="tablist" aria-multiselectable="true" >
                                      <RegionalReport
                                        chartName="地州级统计图"
                                        heading="headingD6"
                                        collapse="collapseD6"
                                        ServerReportChart={<ServerCustomReportChartTwo chartId="serverCustomReportChartTwo" chartKey={this.state.tabsState} serverCustomLineData={serverCustomLineData}/>}
                                        ServerReportTable={<ServerReportTableTwo tableId="serverCustomReportTableTwo" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                            serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
                                    </div>
                                  </div>
                                    <div className="subGroupPanel col-md-12" id="accordionCustomOne" role="tablist" aria-multiselectable="true" >
                                      <RegionalReport
                                        chartName="县市级统计图"
                                        heading="headingX6"
                                        collapse="collapseX6"
                                        ServerReportChart={<ServerCustomReportChartThree chartId="serverCustomReportChartThree" chartKey={this.state.tabsState} serverCustomLineData={serverCustomLineData}/>}
                                        ServerReportTable={<ServerReportTableThree tableId="serverCustomReportTableThree" chartKey={this.state.tabsState} serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData}
                                            serverMonthlyData={serverMonthlyData} serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}/>}/>
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
        curdepservertabsState = key;
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

ServerStatisticsReportView.propTypes = {
    serverDailyData: PropTypes.array.isRequired,
    serverWeeklyData: PropTypes.array.isRequired,
    serverMonthlyData: PropTypes.array.isRequired,
    serverQuarterlyData: PropTypes.array.isRequired,
    serverYearlyData: PropTypes.array.isRequired,
    serverCustomData: PropTypes.array.isRequired,
    serverCustomLineData: PropTypes.array.isRequired,
    setinitCustomData: PropTypes.func.isRequired,
    getServerReportData: PropTypes.func.isRequired
}

module.exports = ServerStatisticsReportView;
