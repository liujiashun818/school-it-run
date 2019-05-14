/**
* Created by tianzhuo.nie  2016/01/26.
* 工单报表
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
import { connect } from 'react-redux'
import * as reportManageActions from '../../../../../actions/reportManage_action'

var DateTimePicker = require('react-widgets').DateTimePicker;
var Util = require('../../../../../utils/util');
var DateChange = require('../../../../../utils/dateChange.js');
var DatabaseReportChart = require('./statisticsReportChart').OrderReportChart;
var DatabaseCustomReportChart = require('./statisticsReportChart').OrderReportCustomChart;
var DatabaseReportTable = require('./statisticsReportTable').OrderReportTable;

var curordertabsState = 2;

var OrderReport = React.createClass({
  // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
  // getStateFromFlux: function() {
  //     var flux = this.getFlux();
  //     return {
  //         report:flux.store("ReportManageStore").getState()
  //     }
  // },
  getInitialState: function(){
      return{//@MODIFY
          tabsState: 2,
          customOption: 2,
          initdate:""
      }
  },
  componentDidMount: function() {
      const { dispatch } = this.props;
      curordertabsState = 2;
      //清空自定义报表数据
      dispatch(reportManageActions.setinitCustomData());
      if (this.isMounted()) {
          if($('#OrderStatisticsReport') != null) {
              var height = $(window).height() - 110 - 30 + 'px';
              $('#OrderStatisticsReport').css("height",height);
          }
          $(window).resize(function () {
              if($('#OrderStatisticsReport') != null) {
                  var height = $(window).height() - 110 - 30 + 'px';
                  $('#OrderStatisticsReport').css("height",height);
              }
          });
          var _this = this;
          setTimeout(function(){
            _this.getInitData();
          },800);
      }
  },
  getInitData: function(){
      this._getInitWeeklyData();
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
  _getCheckData:function(param){
    const { dispatch } = this.props;
    var key = param.key;
    if (key == 6) {
      key = this.state.customOption;
    };
    var tabState = curordertabsState;
    var name = "";
    switch (key) {
      case 1:
        name = "workOrderDayly"
        break;
      case 2:
        name = "workOrderWeekly"
        break;
      case 3:
        name = "workOrderMonthly"
        break;
      case 4:
        name = "workOrderQuarterly"
        break;
      case 5:
        name = "workOrderYearly"
        break;
    };
    var filter = {
      key:tabState,
      REPORT_TYPE:name,
      STARTTIME:param.startTime
    };
    if(param.endTime!=null && param.endTime!=""){
      filter.ENDTIME = param.endTime;
    };
    dispatch(reportManageActions.getOrderReportData(filter));
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
  handleTabClick: function(key){
      this.setState({tabsState: key});
      curordertabsState = key;
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
  },
  render: function() {
    const { orderWeeklyData, orderMonthlyData, orderQuarterlyData, orderYearlyData, orderCustomData } = this.props;
    return (
      <div className='overviewDiv'>
        <div id="OrderStatisticsReport" className='overviewDesViewDiv assetDesViewDiv'>
            <div className="titleDiv col-md-12">
                <div className="titleLeft">报表：工单统计</div>
                <div className="titleRight">
                    <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                    <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="col-md-12">
                <div className="re-view">
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick.bind(this, 2)}>周报</a></li>
                        <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick.bind(this, 3)}>月报</a></li>
                        <li><a href="#tab_3" data-toggle="tab" onClick={this.handleTabClick.bind(this, 4)}>季报</a></li>
                        <li><a href="#tab_4" data-toggle="tab" onClick={this.handleTabClick.bind(this, 5)}>年报</a></li>
                        <li><a href="#tab_5" data-toggle="tab" onClick={this.handleTabClick.bind(this, 6)}>自定义报表</a></li>
                    </ul>
                    <fieldset className="maintainOrderTable assetManageTable">
                        <div className="contentDiv tab-content marginleft_none">
                            <div className="tab-pane active" id="tab_1">
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
                                <div className="re-chart">
                                    <DatabaseReportChart chartId="reportWeeklyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} orderWeeklyData={orderWeeklyData}
                                        orderMonthlyData={orderMonthlyData} orderQuarterlyData={orderQuarterlyData} orderYearlyData={orderYearlyData}/>
                                </div>
                                <div className="re-table">
                                    <DatabaseReportTable tableId="reportWeeklyReportTable" chartKey={this.state.tabsState} orderWeeklyData={orderWeeklyData} orderMonthlyData={orderMonthlyData}
                                        orderQuarterlyData={orderQuarterlyData} orderYearlyData={orderYearlyData} orderCustomData={orderCustomData}/>
                                </div>
                            </div>
                            <div className="tab-pane" id="tab_2">
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
                                <div className="re-chart">
                                    <DatabaseReportChart chartId="reportMonthlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} orderWeeklyData={orderWeeklyData}
                                        orderMonthlyData={orderMonthlyData} orderQuarterlyData={orderQuarterlyData} orderYearlyData={orderYearlyData}/>
                                </div>
                                <div className="re-table">
                                    <DatabaseReportTable tableId="reportMonthlyReportTable" chartKey={this.state.tabsState} orderWeeklyData={orderWeeklyData} orderMonthlyData={orderMonthlyData}
                                        orderQuarterlyData={orderQuarterlyData} orderYearlyData={orderYearlyData} orderCustomData={orderCustomData}/>
                                </div>
                            </div>
                            <div className="tab-pane" id="tab_3">
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
                                <div className="re-chart">
                                    <DatabaseReportChart chartId="reportQuarterlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} orderWeeklyData={orderWeeklyData}
                                        orderMonthlyData={orderMonthlyData} orderQuarterlyData={orderQuarterlyData} orderYearlyData={orderYearlyData}/>
                                </div>
                                <div className="re-table">
                                    <DatabaseReportTable tableId="reportQuarterlyReportTable" chartKey={this.state.tabsState} orderWeeklyData={orderWeeklyData} orderMonthlyData={orderMonthlyData}
                                        orderQuarterlyData={orderQuarterlyData} orderYearlyData={orderYearlyData} orderCustomData={orderCustomData}/>
                                </div>
                            </div>
                            <div className="tab-pane" id="tab_4">
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
                                <div className="re-chart">
                                    <DatabaseReportChart chartId="reportYearlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} orderWeeklyData={orderWeeklyData}
                                        orderMonthlyData={orderMonthlyData} orderQuarterlyData={orderQuarterlyData} orderYearlyData={orderYearlyData}/>
                                </div>
                                <div className="re-table">
                                    <DatabaseReportTable tableId="reportYearlyReportTable" chartKey={this.state.tabsState} orderWeeklyData={orderWeeklyData} orderMonthlyData={orderMonthlyData}
                                        orderQuarterlyData={orderQuarterlyData} orderYearlyData={orderYearlyData} orderCustomData={orderCustomData}/>
                                </div>
                            </div>
                            <div className="tab-pane" id="tab_5">
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
                                            <a href="javascript:;" className='active' onClick={this.selectCustomOptions.bind(this, 2)}>周</a>
                                            <a href="javascript:;" onClick={this.selectCustomOptions.bind(this, 3)}>月</a>
                                            <a href="javascript:;" onClick={this.selectCustomOptions.bind(this, 4)}>季度</a>
                                            <a href="javascript:;" onClick={this.selectCustomOptions.bind(this, 5)}>年</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="re-chart col-md-12">
                                    <DatabaseCustomReportChart chartId="reportCustomReportChart" chartKey={this.state.tabsState} orderCustomData={orderCustomData}/>
                                </div>
                                <div className="re-table col-md-12">
                                    <DatabaseReportTable tableId="reportCustomReportTable" chartKey={this.state.tabsState} orderWeeklyData={orderWeeklyData} orderMonthlyData={orderMonthlyData}
                                        orderQuarterlyData={orderQuarterlyData} orderYearlyData={orderYearlyData} orderCustomData={orderCustomData}/>
                                </div>
                            </div>
                        </div>

                    </fieldset>
                </div>
            </div>
        </div>
      </div>
    );
  }
});

// module.exports = OrderReport;
OrderReport.propTypes = {
    orderWeeklyData: PropTypes.array.isRequired,
    orderMonthlyData: PropTypes.array.isRequired,
    orderQuarterlyData: PropTypes.array.isRequired,
    orderYearlyData: PropTypes.array.isRequired,
    orderCustomData: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { orderWeeklyData, orderMonthlyData, orderQuarterlyData, orderYearlyData, orderCustomData } = state.reportManageReducer

  return {
      orderWeeklyData,
      orderMonthlyData,
      orderQuarterlyData,
      orderYearlyData,
      orderCustomData
  }
}

export default connect(mapStateToProps)(OrderReport)
