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
var CameraVideoQualityStatisticsReportView = require('./cameraVideoQualityStatisticsReportView');

var CameraVideoQualityStatisticsReport = React.createClass({
    render: function() {
        const { dispatch, videoRealTimeData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <VideoLeftBar activeMenu={5} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <CameraVideoQualityStatisticsReportView videoRealTimeData={videoRealTimeData} setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getVideoRealTimeData={param => dispatch(reportManageActions.getVideoRealTimeData(param))}/>
            </div>
        );
    }
});

// module.exports = CameraVideoQualityStatisticsReport;
CameraVideoQualityStatisticsReport.propTypes = {
    videoRealTimeData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { videoRealTimeData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      videoRealTimeData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(CameraVideoQualityStatisticsReport)
