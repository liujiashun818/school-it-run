/**
 * Created by yinxuexue on 2016/02/19.
 * 厅级视频类设备报表-摄像机视频考核
 */
require('bootstrap');

// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as reportManageActions from '../../../../../actions/reportManage_action'

var CameraVideoCheckReportView = require('./cameraVideoCheckReportView');

var CameraVideoCheckReport = React.createClass({
    render: function() {
        const { dispatch, videoCheckDailyData, videoCheckWeeklyData, videoCheckMonthlyData, videoCheckQuarterlyData, videoCheckYearlyData, videoCheckCustomData, videoCheckCustomLineData } = this.props;
        return (
            <div className='overviewDiv'>
                <CameraVideoCheckReportView videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData} videoCheckMonthlyData={videoCheckMonthlyData}
                    videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData} videoCheckCustomLineData={videoCheckCustomLineData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getVideoCheckData={param => dispatch(reportManageActions.getVideoCheckData(param))}/>
            </div>
        );
    }
});

// module.exports = CameraVideoCheckReport;
CameraVideoCheckReport.propTypes = {
    videoCheckDailyData: PropTypes.array.isRequired,
    videoCheckWeeklyData: PropTypes.array.isRequired,
    videoCheckMonthlyData: PropTypes.array.isRequired,
    videoCheckQuarterlyData: PropTypes.array.isRequired,
    videoCheckYearlyData: PropTypes.array.isRequired,
    videoCheckCustomData: PropTypes.array.isRequired,
    videoCheckCustomLineData: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { videoCheckDailyData, videoCheckWeeklyData, videoCheckMonthlyData, videoCheckQuarterlyData, videoCheckYearlyData, videoCheckCustomData, videoCheckCustomLineData } = state.reportManageReducer

  return {
    videoCheckDailyData,
    videoCheckWeeklyData,
    videoCheckMonthlyData,
    videoCheckQuarterlyData,
    videoCheckYearlyData,
    videoCheckCustomData,
    videoCheckCustomLineData
  }
}

export default connect(mapStateToProps)(CameraVideoCheckReport)
