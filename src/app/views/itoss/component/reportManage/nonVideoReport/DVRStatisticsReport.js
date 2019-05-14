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
var DVRStatisticsReportView = require('./dvrStatisticsReportView');

var DVRStatisticsReport = React.createClass({
    render: function() {
        const { dispatch, dvrStorageDailyData, dvrStorageWeeklyData, dvrStorageMonthlyData, dvrStorageQuarterlyData, dvrStorageYearlyData, dvrStorageCustomData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <NonVideoLeftList activeMenu={1} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <DVRStatisticsReportView dvrStorageDailyData={dvrStorageDailyData} dvrStorageWeeklyData={dvrStorageWeeklyData} dvrStorageMonthlyData={dvrStorageMonthlyData}
                    dvrStorageQuarterlyData={dvrStorageQuarterlyData} dvrStorageYearlyData={dvrStorageYearlyData} dvrStorageCustomData={dvrStorageCustomData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getStorageData={param => dispatch(reportManageActions.getStorageData(param))}/>
            </div>
        );
    }
});

// module.exports = DVRStatisticsReport;
DVRStatisticsReport.propTypes = {
    dvrStorageDailyData: PropTypes.array.isRequired,
    dvrStorageWeeklyData: PropTypes.array.isRequired,
    dvrStorageMonthlyData: PropTypes.array.isRequired,
    dvrStorageQuarterlyData: PropTypes.array.isRequired,
    dvrStorageYearlyData: PropTypes.array.isRequired,
    dvrStorageCustomData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { dvrStorageDailyData, dvrStorageWeeklyData, dvrStorageMonthlyData, dvrStorageQuarterlyData, dvrStorageYearlyData, dvrStorageCustomData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      dvrStorageDailyData,
      dvrStorageWeeklyData,
      dvrStorageMonthlyData,
      dvrStorageQuarterlyData,
      dvrStorageYearlyData,
      dvrStorageCustomData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(DVRStatisticsReport)
