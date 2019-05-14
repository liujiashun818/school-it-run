/**
 * Created by SHIN on 2015/12/29.
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

// var VideoReportChart = require('./videoReportChart').VideoOfflineReportChart;
var VideoReportTable = require('./VideoReportTable').VideoOffineReportTable;
var Util = require('../../../../../utils/util');
var DateChange = require('../../../../../utils/dateChange.js');

var CameraOfflineStatisticsReportView = React.createClass({
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
          initdate:""
        }
    },
    componentDidMount: function() {
      //清空自定义报表数据
      this.props.setinitCustomData();
      if (this.isMounted()) {
        if($('#videoOfflineReport') != null) {
          var height = $(window).height() - 110 - 30 + 'px';
    			$('#videoOfflineReport').css("height",height);
    		}
        $(window).resize(function () {
          if($('#videoOfflineReport') != null) {
              var height = $(window).height() - 110 - 30 + 'px';
              $('#videoOfflineReport').css("height",height);
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
      switch (par.key) {
        case 1:
          type = 'videoOfflineDetailsDaily'
          break;
        case 2:
          type = 'videoOfflineDetailsWeekly'
          break;
        case 3:
          type = 'videoOfflineDetailsMonthly'
          break;
        case 4:
          type = 'videoOfflineDetailsQuarterly'
          break;
        case 5:
          type = 'videoOfflineDetailsYearly'
          break;
        case 6:
          type = 'videoOfflineDetailsDaily'
          break;
        default:

      }
      param.type = type;
      param.datetime = par.startTime;
      param.endTime = par.endTime || '';
      param.status = 1;
      param.key = par.key;
      this.props.getVideoDetailsData(param);
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
      const { videoOfflineDailyData, videoOfflineWeeklyData, videoOfflineMonthlyData, videoOfflineQuarterlyData, videoOfflineYearlyData, videoOfflineCustomData } = this.props;
      return (
        <div id="videoOfflineReport" className='overviewDesViewDiv assetDesViewDiv'>
          <div className="titleDiv col-md-12">
              <div className="titleLeft">报表：摄像机离线状态详细统计</div>
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
                      <div className="re-table">
                        <VideoReportTable tableId="cameraOfflineDailyReportTable" chartKey={this.state.tabsState} videoOfflineDailyData={videoOfflineDailyData} videoOfflineWeeklyData={videoOfflineWeeklyData}
                            videoOfflineMonthlyData={videoOfflineMonthlyData} videoOfflineQuarterlyData={videoOfflineQuarterlyData} videoOfflineYearlyData={videoOfflineYearlyData} videoOfflineCustomData={videoOfflineCustomData}/>
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
                      <div className="re-table">
                        <VideoReportTable tableId="cameraOfflineWeeklyReportTable" chartKey={this.state.tabsState} videoOfflineDailyData={videoOfflineDailyData} videoOfflineWeeklyData={videoOfflineWeeklyData}
                            videoOfflineMonthlyData={videoOfflineMonthlyData} videoOfflineQuarterlyData={videoOfflineQuarterlyData} videoOfflineYearlyData={videoOfflineYearlyData} videoOfflineCustomData={videoOfflineCustomData}/>
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
                      <div className="re-table">
                        <VideoReportTable tableId="cameraOfflineMonthlyReportTable" chartKey={this.state.tabsState} videoOfflineDailyData={videoOfflineDailyData} videoOfflineWeeklyData={videoOfflineWeeklyData}
                            videoOfflineMonthlyData={videoOfflineMonthlyData} videoOfflineQuarterlyData={videoOfflineQuarterlyData} videoOfflineYearlyData={videoOfflineYearlyData} videoOfflineCustomData={videoOfflineCustomData}/>
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
                      <div className="re-table">
                        <VideoReportTable tableId="cameraOfflineQuarterlyReportTable" chartKey={this.state.tabsState} videoOfflineDailyData={videoOfflineDailyData} videoOfflineWeeklyData={videoOfflineWeeklyData}
                            videoOfflineMonthlyData={videoOfflineMonthlyData} videoOfflineQuarterlyData={videoOfflineQuarterlyData} videoOfflineYearlyData={videoOfflineYearlyData} videoOfflineCustomData={videoOfflineCustomData}/>
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
                      <div className="re-table">
                        <VideoReportTable tableId="cameraOfflineYearlyReportTable" chartKey={this.state.tabsState} videoOfflineDailyData={videoOfflineDailyData} videoOfflineWeeklyData={videoOfflineWeeklyData}
                            videoOfflineMonthlyData={videoOfflineMonthlyData} videoOfflineQuarterlyData={videoOfflineQuarterlyData} videoOfflineYearlyData={videoOfflineYearlyData} videoOfflineCustomData={videoOfflineCustomData}/>
                      </div>
                    </div>
                    <div className="tab-pane" id="tab_6">
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
                      <div className="re-table">
                        <VideoReportTable tableId="cameraOfflineCustomReportTable" chartKey={this.state.tabsState} videoOfflineDailyData={videoOfflineDailyData} videoOfflineWeeklyData={videoOfflineWeeklyData}
                            videoOfflineMonthlyData={videoOfflineMonthlyData} videoOfflineQuarterlyData={videoOfflineQuarterlyData} videoOfflineYearlyData={videoOfflineYearlyData} videoOfflineCustomData={videoOfflineCustomData}/>
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
        startTime: timeValue,
        endTime: endTimeValue ? endTimeValue : ''
      }
      this._getCheckData(par);
    },
});

CameraOfflineStatisticsReportView.propTypes = {
    videoOfflineDailyData: PropTypes.array.isRequired,
    videoOfflineWeeklyData: PropTypes.array.isRequired,
    videoOfflineMonthlyData: PropTypes.array.isRequired,
    videoOfflineQuarterlyData: PropTypes.array.isRequired,
    videoOfflineYearlyData: PropTypes.array.isRequired,
    videoOfflineCustomData: PropTypes.array.isRequired,
    setinitCustomData: PropTypes.func.isRequired,
    getVideoDetailsData: PropTypes.func.isRequired
}

module.exports = CameraOfflineStatisticsReportView;
