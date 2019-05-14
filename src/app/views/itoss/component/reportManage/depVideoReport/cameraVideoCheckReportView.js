/**
 * Created by yinxuexue on 2016/02/19.
 * 厅级视频类设备报表-摄像机视频考核
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

var VideoReportChart = require('./videoReportChart').VideoReportChart;
var VideoReportChartTwo = require('./videoReportChartTwo').VideoReportChart;
var VideoReportChartThree = require('./videoReportChartThree').VideoReportChart;

var VideoCheckCustomChart = require('./videoReportChart').VideoCheckCustomChart;
var VideoCheckCustomChartTwo = require('./videoReportChartTwo').VideoCheckCustomChart;
var VideoCheckCustomChartThree = require('./videoReportChartThree').VideoCheckCustomChart;

var VideoReportTable = require('./VideoReportTable').VideoReportTable;
var VideoReportTableTwo = require('./VideoReportTableTwo').VideoReportTable;
var VideoReportTableThree = require('./VideoReportTableThree').VideoReportTable;

var Util = require('../../../../../utils/util');
var DateChange = require('../../../../../utils/dateChange.js');

var curdepvideochecktabsState = 1;

var CameraVideoCheckReportView = React.createClass({
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
      curdepvideochecktabsState = 1;
      //清空自定义报表数据
      this.props.setinitCustomData();
      if (this.isMounted()) {
        if($('#cameraVideoCheckReport') != null) {
          var height = $(window).height() - 110 - 30 + 'px';
    			$('#cameraVideoCheckReport').css("height",height);
    		}
        $(window).resize(function () {
          if($('#cameraVideoCheckReport') != null) {
              var height = $(window).height() - 110 - 30 + 'px';
              $('#cameraVideoCheckReport').css("height",height);
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
      }
      var tabsState = curdepvideochecktabsState;
      switch (key) {
        case 1:
          type = 'videoDaily'
          break;
        case 2:
          type = 'videoWeekly'
          break;
        case 3:
          type = 'videoMonthly'
          break;
        case 4:
          type = 'videoQuarterly'
          break;
        case 5:
          type = 'videoYearly'
          break;
        default:
      }
      param.key = tabsState;
      param.reportType = type;
      param.startTime = par.startTime;
      if (par.endTime) {
        param.endTime = par.endTime;
      }
      this.props.getVideoCheckData(param);
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
    showEchart:function(){
      this.setState({isshow:1});
    },
    render: function() {
      const { videoCheckDailyData, videoCheckWeeklyData, videoCheckMonthlyData, videoCheckQuarterlyData, videoCheckYearlyData, videoCheckCustomData, videoCheckCustomLineData } = this.props;
      return (
        <div id="cameraVideoCheckReport" className='overviewDesViewDiv assetDesViewDiv'>
          <div className="titleDiv col-md-12">
              <div className="titleLeft">报表：摄像机视频考核</div>
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
                        <div className="subGroupPanel col-md-12" id="accordionOne" role="tablist" aria-multiselectable="true" >
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingWorkStatus">
                                    <div className="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordionOne" href="#collapseWorkStatus" aria-expanded="false" aria-controls="collapseWorkStatus" onClick={this.showEchart}>
                                            厅级统计图
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseWorkStatus" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatus" aria-expanded="false">
                                    <div className="panel-body">
                                      <div className="re-chart">
                                        <VideoReportChart chartId="videoDailyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                      <div className="re-table">
                                        <VideoReportTable tableId="videoDailyReportTable" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="dizhouji">
                        <div className="subGroupPanel col-md-12" id="accordionTwo" role="tablist" aria-multiselectable="true" >
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingWorkStatus2">
                                    <div className="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordionTwo" href="#collapseWorkStatus2" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatus2" onClick={this.showEchart}>
                                            地州级统计图
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseWorkStatus2" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatus2" aria-expanded="false">
                                    <div className="panel-body">
                                      <div className="re-chart">
                                        <VideoReportChartTwo chartId="videoDailyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                      <div className="re-table">
                                        <VideoReportTableTwo tableId="videoDailyReportTableTwo" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="subGroupPanel col-md-12" id="accordionThree" role="tablist" aria-multiselectable="true" >
                          <div className="panel panel-default">
                              <div className="panel-heading" role="tab" id="headingWorkStatus3">
                                  <div className="panel-title">
                                      <a role="button" data-toggle="collapse" data-parent="#accordionThree" href="#collapseWorkStatus3" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatus3" onClick={this.showEchart}>
                                          县市级统计图
                                      </a>
                                  </div>
                              </div>
                              <div id="collapseWorkStatus3" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatus3" aria-expanded="false">
                                  <div className="panel-body">
                                    <div className="re-chart">
                                      <VideoReportChartThree chartId="videoDailyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                          videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                    </div>
                                    <div className="re-table">
                                      <VideoReportTableThree tableId="videoDailyReportTableThree" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                          videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                    </div>
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
                        <div className="subGroupPanel col-md-12" id="accordionWeeklyOne" role="tablist" aria-multiselectable="true" >
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingWorkStatusWeekly">
                                    <div className="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordionWeeklyOne" href="#collapseWorkStatusWeekly" aria-expanded="false" aria-controls="collapseWorkStatusWeekly" onClick={this.showEchart}>
                                            厅级统计图
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseWorkStatusWeekly" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusWeekly" aria-expanded="false">
                                    <div className="panel-body">
                                      <div className="re-chart">
                                        <VideoReportChart chartId="videoWeeklyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                      <div className="re-table">
                                        <VideoReportTable tableId="videoWeeklyReportTable" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="dizhouji">
                        <div className="subGroupPanel col-md-12" id="accordionWeeklyTwo" role="tablist" aria-multiselectable="true" >
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingWorkStatusWeekly2">
                                    <div className="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordionWeeklyTwo" href="#collapseWorkStatusWeekly2" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatusWeekly2" onClick={this.showEchart}>
                                            地州级统计图
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseWorkStatusWeekly2" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusWeekly2" aria-expanded="false">
                                    <div className="panel-body">
                                      <div className="re-chart">
                                        <VideoReportChartTwo chartId="videoWeeklyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                      <div className="re-table">
                                        <VideoReportTableTwo tableId="videoWeeklyReportTableTwo" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="subGroupPanel col-md-12" id="accordionWeeklyThree" role="tablist" aria-multiselectable="true" >
                          <div className="panel panel-default">
                              <div className="panel-heading" role="tab" id="headingWorkStatusWeekly3">
                                  <div className="panel-title">
                                      <a role="button" data-toggle="collapse" data-parent="#accordionWeeklyThree" href="#collapseWorkStatusWeekly3" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatusWeekly3" onClick={this.showEchart}>
                                          县市级统计图
                                      </a>
                                  </div>
                              </div>
                              <div id="collapseWorkStatusWeekly3" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusWeekly3" aria-expanded="false">
                                  <div className="panel-body">
                                    <div className="re-chart">
                                      <VideoReportChartThree chartId="videoWeeklyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                          videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                    </div>
                                    <div className="re-table">
                                      <VideoReportTableThree tableId="videoWeeklyReportTableThree" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                          videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                    </div>
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
                        <div className="subGroupPanel col-md-12" id="accordionMonthlyOne" role="tablist" aria-multiselectable="true" >
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingWorkStatusMonthly">
                                    <div className="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordionMonthlyOne" href="#collapseWorkStatusMonthly" aria-expanded="false" aria-controls="collapseWorkStatusMonthly" onClick={this.showEchart}>
                                            厅级统计图
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseWorkStatusMonthly" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusMonthly" aria-expanded="false">
                                    <div className="panel-body">
                                      <div className="re-chart">
                                        <VideoReportChart chartId="videoMonthlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                      <div className="re-table">
                                        <VideoReportTable tableId="videoMonthlyReportTable" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="dizhouji">
                        <div className="subGroupPanel col-md-12" id="accordionMonthlyTwo" role="tablist" aria-multiselectable="true" >
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingWorkStatusMonthly2">
                                    <div className="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordionMonthlyTwo" href="#collapseWorkStatusMonthly2" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatusMonthly2" onClick={this.showEchart}>
                                            地州级统计图
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseWorkStatusMonthly2" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusMonthly2" aria-expanded="false">
                                    <div className="panel-body">
                                      <div className="re-chart">
                                        <VideoReportChartTwo chartId="videoMonthlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                      <div className="re-table">
                                        <VideoReportTableTwo tableId="videoMonthlyReportTableTwo" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="subGroupPanel col-md-12" id="accordionMonthlyThree" role="tablist" aria-multiselectable="true" >
                          <div className="panel panel-default">
                              <div className="panel-heading" role="tab" id="headingWorkStatusMonthly3">
                                  <div className="panel-title">
                                      <a role="button" data-toggle="collapse" data-parent="#accordionMonthlyThree" href="#collapseWorkStatusMonthly3" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatusMonthly3" onClick={this.showEchart}>
                                          县市级统计图
                                      </a>
                                  </div>
                              </div>
                              <div id="collapseWorkStatusMonthly3" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusMonthly3" aria-expanded="false">
                                  <div className="panel-body">
                                    <div className="re-chart">
                                      <VideoReportChartThree chartId="videoMonthlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                          videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                    </div>
                                    <div className="re-table">
                                      <VideoReportTableThree tableId="videoMonthlyReportTableThree" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                          videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                    </div>
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
                        <div className="subGroupPanel col-md-12" id="accordionQuarterlyOne" role="tablist" aria-multiselectable="true" >
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingWorkStatusQuarterly">
                                    <div className="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordionQuarterlyOne" href="#collapseWorkStatusQuarterly" aria-expanded="false" aria-controls="collapseWorkStatusQuarterly" onClick={this.showEchart}>
                                            厅级统计图
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseWorkStatusQuarterly" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusQuarterly" aria-expanded="false">
                                    <div className="panel-body">
                                      <div className="re-chart">
                                        <VideoReportChart chartId="videoQuarterlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                      <div className="re-table">
                                        <VideoReportTable tableId="videoQuarterlyReportTable" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="dizhouji">
                        <div className="subGroupPanel col-md-12" id="accordionQuarterlyTwo" role="tablist" aria-multiselectable="true" >
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingWorkStatusQuarterly2">
                                    <div className="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordionQuarterlyTwo" href="#collapseWorkStatusQuarterly2" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatusQuarterly2" onClick={this.showEchart}>
                                            地州级统计图
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseWorkStatusQuarterly2" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusQuarterly2" aria-expanded="false">
                                    <div className="panel-body">
                                      <div className="re-chart">
                                        <VideoReportChartTwo chartId="videoQuarterlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                      <div className="re-table">
                                        <VideoReportTableTwo tableId="videoQuarterlyReportTableTwo" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="subGroupPanel col-md-12" id="accordionQuarterlyThree" role="tablist" aria-multiselectable="true" >
                          <div className="panel panel-default">
                              <div className="panel-heading" role="tab" id="headingWorkStatusQuarterly3">
                                  <div className="panel-title">
                                      <a role="button" data-toggle="collapse" data-parent="#accordionQuarterlyThree" href="#collapseWorkStatusQuarterly3" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatusQuarterly3" onClick={this.showEchart}>
                                          县市级统计图
                                      </a>
                                  </div>
                              </div>
                              <div id="collapseWorkStatusQuarterly3" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusQuarterly3" aria-expanded="false">
                                  <div className="panel-body">
                                    <div className="re-chart">
                                      <VideoReportChartThree chartId="videoQuarterlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                          videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                    </div>
                                    <div className="re-table">
                                      <VideoReportTableThree tableId="videoQuarterlyReportTableThree" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                          videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                    </div>
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
                        <div className="subGroupPanel col-md-12" id="accordionYearlyOne" role="tablist" aria-multiselectable="true" >
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingWorkStatusYearly">
                                    <div className="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordionYearlyOne" href="#collapseWorkStatusYearly" aria-expanded="false" aria-controls="collapseWorkStatusYearly" onClick={this.showEchart}>
                                            厅级统计图
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseWorkStatusYearly" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusYearly" aria-expanded="false">
                                    <div className="panel-body">
                                      <div className="re-chart">
                                        <VideoReportChart chartId="videoYearlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                      <div className="re-table">
                                        <VideoReportTable tableId="videoYearlyReportTable" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="dizhouji">
                        <div className="subGroupPanel col-md-12" id="accordionYearlyTwo" role="tablist" aria-multiselectable="true" >
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab" id="headingWorkStatusYearly2">
                                    <div className="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordionYearlyTwo" href="#collapseWorkStatusYearly2" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatusYearly2" onClick={this.showEchart}>
                                            地州级统计图
                                        </a>
                                    </div>
                                </div>
                                <div id="collapseWorkStatusYearly2" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusYearly2" aria-expanded="false">
                                    <div className="panel-body">
                                      <div className="re-chart">
                                        <VideoReportChartTwo chartId="videoYearlyReportChartTwo" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                      <div className="re-table">
                                        <VideoReportTableTwo tableId="videoYearlyReportTableTwo" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="subGroupPanel col-md-12" id="accordionYearlyThree" role="tablist" aria-multiselectable="true" >
                          <div className="panel panel-default">
                              <div className="panel-heading" role="tab" id="headingWorkStatusYearly3">
                                  <div className="panel-title">
                                      <a role="button" data-toggle="collapse" data-parent="#accordionYearlyThree" href="#collapseWorkStatusYearly3" className="collapsed" aria-expanded="false" aria-controls="collapseWorkStatusYearly3" onClick={this.showEchart}>
                                          县市级统计图
                                      </a>
                                  </div>
                              </div>
                              <div id="collapseWorkStatusYearly3" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingWorkStatusYearly3" aria-expanded="false">
                                  <div className="panel-body">
                                    <div className="re-chart">
                                      <VideoReportChartThree chartId="videoYearlyReportChartThree" chartKey={this.state.tabsState} reportdate={this.state.initdate} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                          videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                    </div>
                                    <div className="re-table">
                                      <VideoReportTableThree tableId="videoYearlyReportTableThree" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                          videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
                                    </div>
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
                                        <VideoCheckCustomChart chartId="videoCustomReportChart" chartKey={this.state.tabsState} videoCheckCustomLineData={videoCheckCustomLineData}/>
                                      </div>
                                      <div className="re-table col-md-12">
                                        <VideoReportTable tableId="videoCustomReportTable" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
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
                                        <VideoCheckCustomChartTwo chartId="videoCustomReportChartTwo" chartKey={this.state.tabsState} videoCheckCustomLineData={videoCheckCustomLineData}/>
                                      </div>
                                      <div className="re-table col-md-12">
                                        <VideoReportTableTwo tableId="videoCustomReportTableTwo" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                            videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
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
                                      <VideoCheckCustomChartThree chartId="videoCustomReportChartThree" chartKey={this.state.tabsState} videoCheckCustomLineData={videoCheckCustomLineData}/>
                                    </div>
                                    <div className="re-table col-md-12">
                                      <VideoReportTableThree tableId="videoCustomReportTableThree" chartKey={this.state.tabsState} videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData}
                                          videoCheckMonthlyData={videoCheckMonthlyData} videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}/>
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
      curdepvideochecktabsState = key;
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
      }
      var dstartTimeValue = DateChange.strToDate(startTimeValue);
      var dendTimeValue = DateChange.strToDate(endTimeValue);
      if(dstartTimeValue > dendTimeValue){
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

CameraVideoCheckReportView.propTypes = {
    videoCheckDailyData: PropTypes.array.isRequired,
    videoCheckWeeklyData: PropTypes.array.isRequired,
    videoCheckMonthlyData: PropTypes.array.isRequired,
    videoCheckQuarterlyData: PropTypes.array.isRequired,
    videoCheckYearlyData: PropTypes.array.isRequired,
    videoCheckCustomData: PropTypes.array.isRequired,
    videoCheckCustomLineData: PropTypes.array.isRequired,
    setinitCustomData: PropTypes.func.isRequired,
    getVideoCheckData: PropTypes.func.isRequired
}

module.exports = CameraVideoCheckReportView;
