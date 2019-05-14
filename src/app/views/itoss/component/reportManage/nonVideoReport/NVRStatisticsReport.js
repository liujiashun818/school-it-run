/**
 * Created by SHIN on 2016/1/27.
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

var NonVideoLeftList = require('./nonVideoLeftList');
var NVRStatisticsReportView = require('./nvrStatisticsReportView');

var NVRStatisticsReport = React.createClass({
    render: function() {
        const { dispatch, nvrStorageDailyData, nvrStorageWeeklyData, nvrStorageMonthlyData, nvrStorageQuarterlyData, nvrStorageYearlyData, nvrStorageCustomData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <NonVideoLeftList activeMenu={2} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))}  onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <NVRStatisticsReportView nvrStorageDailyData={nvrStorageDailyData} nvrStorageWeeklyData={nvrStorageWeeklyData} nvrStorageMonthlyData={nvrStorageMonthlyData}
                    nvrStorageQuarterlyData={nvrStorageQuarterlyData} nvrStorageYearlyData={nvrStorageYearlyData} nvrStorageCustomData={nvrStorageCustomData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getStorageData={param => dispatch(reportManageActions.getStorageData(param))}/>
            </div>
        );
    }
});

// module.exports = NVRStatisticsReport;
NVRStatisticsReport.propTypes = {
    nvrStorageDailyData: PropTypes.array.isRequired,
    nvrStorageWeeklyData: PropTypes.array.isRequired,
    nvrStorageMonthlyData: PropTypes.array.isRequired,
    nvrStorageQuarterlyData: PropTypes.array.isRequired,
    nvrStorageYearlyData: PropTypes.array.isRequired,
    nvrStorageCustomData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { nvrStorageDailyData, nvrStorageWeeklyData, nvrStorageMonthlyData, nvrStorageQuarterlyData, nvrStorageYearlyData, nvrStorageCustomData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      nvrStorageDailyData,
      nvrStorageWeeklyData,
      nvrStorageMonthlyData,
      nvrStorageQuarterlyData,
      nvrStorageYearlyData,
      nvrStorageCustomData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(NVRStatisticsReport)
