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

var VideoOnlineTrendsChart = require('./videoReportChart').VideoOnlineTrendsChart;
// var VideoReportTable = require('./VideoReportTable').VideoReportTable;

var Util = require('../../../../../utils/util');

var CameraOnlineTrendsReportView = React.createClass({
    // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         report:flux.store("ReportManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return{//@MODIFY
          initdate:""
        }
    },
    componentDidMount: function() {
      //清空自定义报表数据
      this.props.setinitCustomData();
      if (this.isMounted()) {
        if($('#onlineTrendsReport') != null) {
          var height = $(window).height() - 110 - 30 + 'px';
    			$('#onlineTrendsReport').css("height",height);
    		}
        $(window).resize(function () {
          if($('#onlineTrendsReport') != null) {
              var height = $(window).height() - 110 - 30 + 'px';
              $('#onlineTrendsReport').css("height",height);
          }
        });
        var _this = this;
        setTimeout(function(){
          var date = Util.getNowDate();
          _this.setState({initdate: date});
          _this.props.getVideoOnlineTrends(date);
        },800);
      }
    },
    componentDidUpdate: function() {
    },
    render: function() {
      const { videoOnlineTrendsAxis, videoOnlineTrendsData } = this.props;
      return (
        <div id="onlineTrendsReport" className='overviewDesViewDiv assetDesViewDiv'>
          <div className="titleDiv col-md-12">
              <div className="titleLeft">报表：摄像机在线趋势图</div>
              <div className="titleRight">
                  <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                  <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
              </div>
              <div className="clearfix"></div>
          </div>
          <div className="col-md-12">
            <div className="re-view">
              <fieldset className="maintainOrderTable hardwareAssetTableBox">
                <div className="contentDiv tab-content marginleft_none">
                <div className="form-inline re-form">
                  <div className="form-group">
                    <label>请选择：</label>
                  </div>
                  <div className="form-group">
                    <DateTimePicker ref="dayReportTime" className="dateTimePickerStyle" time={false} defaultValue={new Date()} format={"yyyy-MM-dd"}/>
                  </div>
                  <div className="form-group padding-left-10">
                    <button className="btn btn-success" onClick={this.handleSearch}>查询</button>
                  </div>
                </div>
                </div>
                <div className="re-chart">
                  <VideoOnlineTrendsChart chartId="cameraOnlineTrendsReportChart" reportdate={this.state.initdate} videoOnlineTrendsAxis={videoOnlineTrendsAxis} videoOnlineTrendsData={videoOnlineTrendsData}/>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      );
    },
    handleSearch: function(){
      var timeValue = ReactDOM.findDOMNode(this.refs.dayReportTime).firstChild.value;
      //console.log(timeValue);
      if (!timeValue) {
        return;
      };
      this.setState({initdate: timeValue});
      this.props.getVideoOnlineTrends(timeValue);
    },

});

CameraOnlineTrendsReportView.propTypes = {
    videoOnlineTrendsAxis: PropTypes.array.isRequired,
    videoOnlineTrendsData: PropTypes.array.isRequired,
    setinitCustomData: PropTypes.func.isRequired,
    getVideoOnlineTrends: PropTypes.func.isRequired
}

module.exports = CameraOnlineTrendsReportView;
