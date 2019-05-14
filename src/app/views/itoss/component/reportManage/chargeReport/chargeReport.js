/**
* Created by tianzhuo.nie  2016/01/26.
* 计费考核统计报表
* xuexue.yin  2016/03/09.
* 重新设计界面展示
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
var ReactWidgets = require('react-widgets');

var Util = require('../../../../../utils/util');
var DateChange = require('../../../../../utils/dateChange.js');
var ChargeReportChart = require('./chargeReportChart').ChargeReportChart;
var ChargeReportTable = require('./chargeReportTable').ChargeReportTable;
var curchargetabsState = 3;

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var ChargeReport = React.createClass({
  // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
  // getStateFromFlux: function() {
  //     var flux = this.getFlux();
  //     return {
  //         report:flux.store("ReportManageStore").getState()
  //     }
  // },
  getInitialState: function(){
      return{
          tabsState: 3,
          initdate:""
      }
  },
  componentDidMount: function() {
      const { dispatch } = this.props;
      curchargetabsState = 3;
      //清空自定义报表数据
      dispatch(reportManageActions.setinitCustomData());
      if (this.isMounted()) {
        if(document.getElementById('chargeReportDiv') != null) {
            document.getElementById('chargeReportDiv').style.height = $(window).height() - 110 - 30 + 'px';
        };
        $(window).resize(function () {
            if(document.getElementById('chargeReportDiv') != null) {
                document.getElementById('chargeReportDiv').style.height = $(window).height() - 110 - 30 + 'px';
            }
        });
        var _this = this;
        setTimeout(function(){
          _this.getInitData();
        },800);
      }
  },
  getInitData: function(){
      this._getInitMonthlyData();
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
    var tabState = curchargetabsState;
    var name = "";
    var data = {};
    // var startTimetemp = DateChange.strToDate(param.startTime);
    switch (key) {
      case 3:
        // year = startTimetemp.getFullYear();
        // month = startTimetemp.getMonth()+1;
        // if(month.toString().length<2) month = "0"+month;
        // data.startDateStr = year+"-"+month+"-01";
        // oneDay = 24*60*60*1000;
        // days = new Date(year, month, 0);
        // endDate = new Date(days.getDate()*oneDay+e.getTime());
        // year = endDate.getFullYear();
        // month = endDate.getMonth()+1;
        // if(month.toString().length<2) month = "0"+month;
        // data.endDateStr = year+"-"+month+"-01";
        // data.reportType = "Monthly";
        name = "accountingassessmentMonthly"
        break;
      case 4:
        // year = startTimetemp.getFullYear();
        // month = startTimetemp.getMonth()+1;
        // if(month.toString().length<2) month = "0"+month;
        // data.startDateStr = year+"-"+month+"-01";
        // oneDay = 24*60*60*1000;
        // days = new Date(year, month, 0);
        // endDate = new Date(days.getDate()*oneDay+e.getTime());
        // year = endDate.getFullYear();
        // month = endDate.getMonth()+1;
        // if(month.toString().length<2) month = "0"+month;
        // data.endDateStr = year+"-"+month+"-01";
        // data.reportType = "Monthly";
        name = "accountingassessmentQuarterly"
        break;
      case 5:
        // year = startTimetemp.getFullYear();
        // month = startTimetemp.getMonth()+1;
        // data.startDateStr = year+"-01-01";
        // year++;
        // data.endDateStr = year+"-01-01";
        // data.reportType = "Yearly";
        name = "accountingassessmentYearly"
        break;
    };
    var filter = {
      REPORT_TYPE:name,
      STARTTIME:param.startTime
    };
    // var filter = {
    //   REPORT_TYPE:name,
    //   STARTTIME:data.startDateStr
    // };
    dispatch(reportManageActions.getChargeReportData(filter));
  },
  componentDidUpdate: function() {
    if (this.state.tabsState == 3) {
      ReactDOM.findDOMNode(this.refs.monthReportTime).firstChild.value = this.state.initdate;
    }else if (this.state.tabsState == 4) {
      ReactDOM.findDOMNode(this.refs.quarterReportTime).firstChild.value = this.state.initdate;
    }else if (this.state.tabsState == 5) {
      ReactDOM.findDOMNode(this.refs.yearReportTime).firstChild.value = this.state.initdate;
    }
  },
  handleSearch: function(key){
      var timeValue = '';
      switch (key) {
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
      };
      if (!timeValue) {
        return;
      };
      var par = {
          key: key,
          startTime: timeValue
      };
      this._getCheckData(par);
  },
  handleTabClick:function(key){
    this.setState({tabsState: key});
    curchargetabsState = key;
    var timeValue = "";
    if (key == 3) {
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
  render: function() {
    const { chargePicData, chargeMonthlyData, chargeQuarterlyData, chargeYearlyData } = this.props;
    return (
      <div className='overviewDiv'>
        <div id="chargeReportDiv" className='overviewDesViewDiv assetDesViewDiv'>
            <div className="titleDiv col-md-12">
                <div className="titleLeft">报表：计费考核</div>
                <div className="titleRight">
                    <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                    <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="col-md-12">
                <div className="re-view">
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick.bind(this, 3)}>月报</a></li>
                        <li><a href="#tab_3" data-toggle="tab" onClick={this.handleTabClick.bind(this, 4)}>季报</a></li>
                        <li><a href="#tab_4" data-toggle="tab" onClick={this.handleTabClick.bind(this, 5)}>年报</a></li>
                    </ul>
                    <fieldset className="maintainOrderTable assetManageTable">
                        <div className="contentDiv tab-content marginleft_none">
                            <div className="tab-pane active" id="tab_2">
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
                                    <ChargeReportChart chartId="reportMonthlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} chargePicData={chargePicData}/>
                                </div>
                                <div className="re-table">
                                    <ChargeReportTable tableId="reportMonthlyReportTable" chartKey={this.state.tabsState} chargeMonthlyData={chargeMonthlyData} chargeQuarterlyData={chargeQuarterlyData} chargeYearlyData={chargeYearlyData}/>
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
                                    <ChargeReportChart chartId="reportQuarterlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} chargePicData={chargePicData}/>
                                </div>
                                <div className="re-table">
                                    <ChargeReportTable tableId="reportQuarterlyReportTable" chartKey={this.state.tabsState} chargeMonthlyData={chargeMonthlyData} chargeQuarterlyData={chargeQuarterlyData} chargeYearlyData={chargeYearlyData}/>
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
                                    <ChargeReportChart chartId="reportYearlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate} chargePicData={chargePicData}/>
                                </div>
                                <div className="re-table">
                                    <ChargeReportTable tableId="reportYearlyReportTable" chartKey={this.state.tabsState} chargeMonthlyData={chargeMonthlyData} chargeQuarterlyData={chargeQuarterlyData} chargeYearlyData={chargeYearlyData}/>
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

// module.exports = ChargeReport;
ChargeReport.propTypes = {
    chargePicData: PropTypes.array.isRequired,
    chargeMonthlyData: PropTypes.array.isRequired,
    chargeQuarterlyData: PropTypes.array.isRequired,
    chargeYearlyData: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { chargePicData, chargeMonthlyData, chargeQuarterlyData, chargeYearlyData } = state.reportManageReducer

  return {
      chargePicData,
      chargeMonthlyData,
      chargeQuarterlyData,
      chargeYearlyData
  }
}

export default connect(mapStateToProps)(ChargeReport)
