/**
* Created by Yuchen  2016/01/21.
* 资产统计报表主窗口
*/

var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var DateTimePicker = require('react-widgets').DateTimePicker;
var ReactWidgets = require('react-widgets');

var Util = require('../../../../../utils/util');
var DateChange = require('../../../../../utils/dateChange.js');
var AssetOvertimePieChart = require('./assetStatisticViewChart').AssetOvertimePieChart;
var AssetStatePieChart = require('./assetStatisticViewChart').AssetStatePieChart;
var AssetStatisticViewTable = require('./assetStatisticViewTable').AssetStatisticViewTable;
var curAssetStatabsState = 3;

var AssetStatisticView = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return{
            tabsState: 3,
            initdate:""
        }
    },
    componentDidMount: function() {
        curAssetStatabsState = 3;
        //清空报表数据
        this.props.set_InitAssetReportData();
        if (this.isMounted()) {
          if(document.getElementById('statisticReportDesViewDiv') != null) {
              document.getElementById('statisticReportDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
          };
          $(window).resize(function () {
              if(document.getElementById('statisticReportDesViewDiv') != null) {
                  document.getElementById('statisticReportDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
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
      var key = param.key;
      var tabState = curAssetStatabsState;
      var name = "";
      var data = {};
      var startTimetemp = DateChange.strToDate(param.startTime);
      switch (key) {
        case 3:
            var year = startTimetemp.getFullYear();
            var month = startTimetemp.getMonth()+1;
            if(month.toString().length<2) month = "0"+month;
            data.startDateStr = year+"-"+month+"-01";
            var oneDay = 24*60*60*1000;
            var days = new Date(year, month, 0);
            var endDate = new Date(days.getDate()*oneDay+startTimetemp.getTime());
            year = endDate.getFullYear();
            month = endDate.getMonth()+1;
            if(month.toString().length<2) month = "0"+month;
            data.endDateStr = year+"-"+month+"-01";
            data.reportType = "Monthly";
            this.props.get_statistic_report_data({
                data: data,
                callback: function(resp){
                },
                error: function(resp){
                    //_this._initTable([]);
                }
            });
            break;
        case 5:
            var year = startTimetemp.getFullYear();
            var month = startTimetemp.getMonth()+1;
            data.startDateStr = year+"-01-01";
            year++;
            data.endDateStr = year+"-01-01";
            data.reportType = "Yearly";
            this.props.get_statistic_report_data({
                data: data,
                callback: function(resp){
                },
                error: function(resp){
                    //_this._initTable([]);
                }
            });
            break;
         default:break;
      };
    },
    componentDidUpdate: function() {
      if (this.state.tabsState == 3) {
        ReactDOM.findDOMNode(this.refs.monthReportTime).firstChild.value = this.state.initdate;
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
      curAssetStatabsState = key;
      var timeValue = "";
      if (key == 3) {
        timeValue = ReactDOM.findDOMNode(this.refs.monthReportTime).firstChild.value;
        if(timeValue == ""){
          this._getInitMonthlyData();
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
        return (
            <div id="statisticReportDesViewDiv" className="overviewDesViewDiv assetDesViewDiv">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        报表：资产统计
                    </div>
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
                                    <div className="assetStatic col-md-12">
                                        <div className="col-md-6">
                                            <div id="statePieChartDiv" style={{width:"96%"}}>
                                                <div className="re-chartPie">
                                                  <AssetStatePieChart report={this.props.report} chartId="reportMonthlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div id="overtimePieChartDiv" style={{width:"96%"}}>
                                                <div className="re-chartPie">
                                                  <AssetOvertimePieChart report={this.props.report} chartId="reportOverMonthlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="staticChartDiv col-md-12">
                                            <div className="re-table">
                                              <AssetStatisticViewTable report={this.props.report} tableId="reportMonthlyReportTable" chartKey={this.state.tabsState} />
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
                                            <DateTimePicker ref="yearReportTime" className="dateTimePickerStyle" time={false} defaultValue={null} format={"yyyy-MM-dd"}/>
                                        </div>
                                        <div className="form-group padding-left-10">
                                            <button className="btn btn-success" onClick={this.handleSearch.bind(this, 5)}>查询</button>
                                        </div>
                                    </div>
                                    <div className="assetStatic col-md-12">
                                        <div className="col-md-6">
                                            <div id="statePieChartDiv" style={{width:"96%"}}>
                                              <div className="re-chartPie">
                                                <AssetStatePieChart report={this.props.report} chartId="reportYearlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate}/>
                                              </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div id="overtimePieChartDiv" style={{width:"96%"}}>
                                                <div className="re-chartPie">
                                                  <AssetOvertimePieChart report={this.props.report} chartId="reportOverYearlyReportChart" chartKey={this.state.tabsState} reportdate={this.state.initdate}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="staticChartDiv col-md-12">
                                          <div className="re-table">
                                            <AssetStatisticViewTable report={this.props.report} tableId="reportYearlyReportTable" chartKey={this.state.tabsState} />
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
});

module.exports = AssetStatisticView;
