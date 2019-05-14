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
var CameraVideoLostStatisticsReportView = require('./cameraVideoLostStatisticsReportView');

var CameraVideoLostStatisticsReport = React.createClass({
    render: function() {
        const { dispatch, videoLossDailyData, videoLossWeeklyData, videoLossMonthlyData, videoLossQuarterlyData, videoLossYearlyData, videoLossCustomData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <VideoLeftBar activeMenu={4} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <CameraVideoLostStatisticsReportView videoLossDailyData={videoLossDailyData} videoLossWeeklyData={videoLossWeeklyData} videoLossMonthlyData={videoLossMonthlyData}
                    videoLossQuarterlyData={videoLossQuarterlyData} videoLossYearlyData={videoLossYearlyData} videoLossCustomData={videoLossCustomData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getVideoDetailsData={param => dispatch(reportManageActions.getVideoDetailsData(param))}/>
                </div>
            );
    }
});

// module.exports = CameraVideoLostStatisticsReport;
CameraVideoLostStatisticsReport.propTypes = {
    videoLossDailyData: PropTypes.array.isRequired,
    videoLossWeeklyData: PropTypes.array.isRequired,
    videoLossMonthlyData: PropTypes.array.isRequired,
    videoLossQuarterlyData: PropTypes.array.isRequired,
    videoLossYearlyData: PropTypes.array.isRequired,
    videoLossCustomData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { videoLossDailyData, videoLossWeeklyData, videoLossMonthlyData, videoLossQuarterlyData, videoLossYearlyData, videoLossCustomData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      videoLossDailyData,
      videoLossWeeklyData,
      videoLossMonthlyData,
      videoLossQuarterlyData,
      videoLossYearlyData,
      videoLossCustomData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(CameraVideoLostStatisticsReport)
