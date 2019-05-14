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

var VideoReportChart = require('./videoReportChart').VideoRealTimeReportChart;
var VideoReportTable = require('./VideoReportTable').VideoRealTimeReportTable;

var CameraVideoLostStatisticsReportView = React.createClass({
    // mixins: [FluxMixin, StoreWatchMixin("ReportManageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         report:flux.store("ReportManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return{//@MODIFY

        }
    },
    componentDidMount: function() {
      //清空自定义报表数据
      this.props.setinitCustomData();
      if (this.isMounted()) {
        if($('#videoRealTimeReport') != null) {
          var height = $(window).height() - 110 - 30 + 'px';
    			$('#videoRealTimeReport').css("height",height);
    		}
        $(window).resize(function () {
          if($('#videoRealTimeReport') != null) {
              var height = $(window).height() - 110 - 30 + 'px';
              $('#videoRealTimeReport').css("height",height);
          }
        });
        var _this = this;
        setTimeout(function(){
          _this._getCheckData();
        },800);
      }
    },
    _getCheckData: function(){
      this.props.getVideoRealTimeData();
    },
    componentDidUpdate: function() {

    },
    render: function() {
      const { videoRealTimeData } = this.props;
      return (
        <div id="videoRealTimeReport" className='overviewDesViewDiv assetDesViewDiv'>
          <div className="titleDiv col-md-12">
              <div className="titleLeft">报表：摄像机视频质量实时统计</div>
              <div className="titleRight">
                  <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                  <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
              </div>
              <div className="clearfix"></div>
          </div>
          <div className="col-md-12">
            <div className="re-view">
              <fieldset className="maintainOrderTable hardwareAssetTableBox">
                <div className="re-chart" style={{border:"none"}}>
                  <VideoReportChart chartId="cameraVideoRealTimeReportChart" videoRealTimeData={videoRealTimeData}/>
                </div>
                <div className="re-table">
                  <VideoReportTable tableId="cameraVideoRealTimeReportTable" videoRealTimeData={videoRealTimeData}/>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      );
    },

});

CameraVideoLostStatisticsReportView.propTypes = {
    videoRealTimeData: PropTypes.array.isRequired,
    setinitCustomData: PropTypes.func.isRequired,
    getVideoRealTimeData: PropTypes.func.isRequired
}

module.exports = CameraVideoLostStatisticsReportView;
