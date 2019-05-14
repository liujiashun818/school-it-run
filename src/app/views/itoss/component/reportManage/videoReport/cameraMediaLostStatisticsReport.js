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
var CameraMediaLostStatisticsReportView = require('./cameraMediaLostStatisticsReportView');

var CameraMediaLostStatisticsReport = React.createClass({
    render: function() {
        const { dispatch, videoMediaLossDailyData, videoMediaLossWeeklyData, videoMediaLossMonthlyData, videoMediaLossQuarterlyData, videoMediaLossYearlyData, videoMediaLossCustomData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <VideoLeftBar activeMenu={3} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <CameraMediaLostStatisticsReportView videoMediaLossDailyData={videoMediaLossDailyData} videoMediaLossWeeklyData={videoMediaLossWeeklyData} videoMediaLossMonthlyData={videoMediaLossMonthlyData}
                    videoMediaLossQuarterlyData={videoMediaLossQuarterlyData} videoMediaLossYearlyData={videoMediaLossYearlyData} videoMediaLossCustomData={videoMediaLossCustomData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getVideoDetailsData={param => dispatch(reportManageActions.getVideoDetailsData(param))}/>
            </div>
        );
    }
});

// module.exports = CameraMediaLostStatisticsReport;
CameraMediaLostStatisticsReport.propTypes = {
    videoMediaLossDailyData: PropTypes.array.isRequired,
    videoMediaLossWeeklyData: PropTypes.array.isRequired,
    videoMediaLossMonthlyData: PropTypes.array.isRequired,
    videoMediaLossQuarterlyData: PropTypes.array.isRequired,
    videoMediaLossYearlyData: PropTypes.array.isRequired,
    videoMediaLossCustomData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { videoMediaLossDailyData, videoMediaLossWeeklyData, videoMediaLossMonthlyData, videoMediaLossQuarterlyData, videoMediaLossYearlyData, videoMediaLossCustomData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      videoMediaLossDailyData,
      videoMediaLossWeeklyData,
      videoMediaLossMonthlyData,
      videoMediaLossQuarterlyData,
      videoMediaLossYearlyData,
      videoMediaLossCustomData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(CameraMediaLostStatisticsReport)
