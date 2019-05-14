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
var CameraOnlineTrendsReportView = require('./cameraOnlineTrendsReportView');

var CameraOnlineTrendsReport = React.createClass({
    render: function() {
        const { dispatch, videoOnlineTrendsAxis, videoOnlineTrendsData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <VideoLeftBar activeMenu={6} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <CameraOnlineTrendsReportView videoOnlineTrendsAxis={videoOnlineTrendsAxis} videoOnlineTrendsData={videoOnlineTrendsData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getVideoOnlineTrends={time => dispatch(reportManageActions.getVideoOnlineTrends(time))}/>
            </div>
        );
    }
});

// module.exports = CameraOnlineTrendsReport;
CameraOnlineTrendsReport.propTypes = {
    videoOnlineTrendsAxis: PropTypes.array.isRequired,
    videoOnlineTrendsData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { videoOnlineTrendsAxis, videoOnlineTrendsData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      videoOnlineTrendsAxis,
      videoOnlineTrendsData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(CameraOnlineTrendsReport)
