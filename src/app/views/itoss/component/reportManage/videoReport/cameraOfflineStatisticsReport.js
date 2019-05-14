/**
 * Created by SHIN on 2015/12/29.
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
import * as navbarActions from '../../../../../actions/navbar_action'
import * as reportManageActions from '../../../../../actions/reportManage_action'

var VideoLeftBar = require('./videoLeftBar');
var CameraOfflineStatisticsReportView = require('./CameraOfflineStatisticsReportView');

var CameraOfflineStatisticsReport = React.createClass({
    render: function() {
        const { dispatch, videoOfflineDailyData, videoOfflineWeeklyData, videoOfflineMonthlyData, videoOfflineQuarterlyData, videoOfflineYearlyData, videoOfflineCustomData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <VideoLeftBar activeMenu={2} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <CameraOfflineStatisticsReportView videoOfflineDailyData={videoOfflineDailyData} videoOfflineWeeklyData={videoOfflineWeeklyData} videoOfflineMonthlyData={videoOfflineMonthlyData}
                    videoOfflineQuarterlyData={videoOfflineQuarterlyData} videoOfflineYearlyData={videoOfflineYearlyData} videoOfflineCustomData={videoOfflineCustomData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getVideoDetailsData={param => dispatch(reportManageActions.getVideoDetailsData(param))}/>
            </div>
        );
    }
});

// module.exports = CameraOfflineStatisticsReport;
CameraOfflineStatisticsReport.propTypes = {
    videoOfflineDailyData: PropTypes.array.isRequired,
    videoOfflineWeeklyData: PropTypes.array.isRequired,
    videoOfflineMonthlyData: PropTypes.array.isRequired,
    videoOfflineQuarterlyData: PropTypes.array.isRequired,
    videoOfflineYearlyData: PropTypes.array.isRequired,
    videoOfflineCustomData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { videoOfflineDailyData, videoOfflineWeeklyData, videoOfflineMonthlyData, videoOfflineQuarterlyData, videoOfflineYearlyData, videoOfflineCustomData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      videoOfflineDailyData,
      videoOfflineWeeklyData,
      videoOfflineMonthlyData,
      videoOfflineQuarterlyData,
      videoOfflineYearlyData,
      videoOfflineCustomData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(CameraOfflineStatisticsReport)
