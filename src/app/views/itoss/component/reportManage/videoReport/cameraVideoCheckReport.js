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
var CameraVideoCheckReportView = require('./cameraVideoCheckReportView');

var CameraVideoCheckReport = React.createClass({
    render: function() {
        const { dispatch, videoCheckDailyData, videoCheckWeeklyData, videoCheckMonthlyData, videoCheckQuarterlyData, videoCheckYearlyData, videoCheckCustomData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <VideoLeftBar activeMenu={1} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <CameraVideoCheckReportView videoCheckDailyData={videoCheckDailyData} videoCheckWeeklyData={videoCheckWeeklyData} videoCheckMonthlyData={videoCheckMonthlyData}
                    videoCheckQuarterlyData={videoCheckQuarterlyData} videoCheckYearlyData={videoCheckYearlyData} videoCheckCustomData={videoCheckCustomData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getVideoCheckData={param => dispatch(reportManageActions.getVideoCheckData(param))}/>
            </div>
        );
    },
});

// module.exports = CameraVideoCheckReport;
CameraVideoCheckReport.propTypes = {
    videoCheckDailyData: PropTypes.array.isRequired,
    videoCheckWeeklyData: PropTypes.array.isRequired,
    videoCheckMonthlyData: PropTypes.array.isRequired,
    videoCheckQuarterlyData: PropTypes.array.isRequired,
    videoCheckYearlyData: PropTypes.array.isRequired,
    videoCheckCustomData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { videoCheckDailyData, videoCheckWeeklyData, videoCheckMonthlyData, videoCheckQuarterlyData, videoCheckYearlyData, videoCheckCustomData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      videoCheckDailyData,
      videoCheckWeeklyData,
      videoCheckMonthlyData,
      videoCheckQuarterlyData,
      videoCheckYearlyData,
      videoCheckCustomData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(CameraVideoCheckReport)
