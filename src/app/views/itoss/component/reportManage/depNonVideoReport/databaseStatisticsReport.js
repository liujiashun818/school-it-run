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
var DatabaseStatisticsReportView = require('./databaseStatisticsReportView');

var DatabaseStatisticsReport = React.createClass({
    render: function() {
        const { dispatch, databaseDailyData, databaseWeeklyData, databaseMonthlyData, databaseQuarterlyData, databaseYearlyData, databaseCustomData, databaseCustomLineData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <NonVideoLeftList activeMenu={7} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName}
                  setCurName={data => dispatch(navbarActions.setCurName(data))} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <DatabaseStatisticsReportView databaseDailyData={databaseDailyData} databaseWeeklyData={databaseWeeklyData} databaseMonthlyData={databaseMonthlyData}
                    databaseQuarterlyData={databaseQuarterlyData} databaseYearlyData={databaseYearlyData} databaseCustomData={databaseCustomData} databaseCustomLineData={databaseCustomLineData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getServerReportData={param => dispatch(reportManageActions.getServerReportData(param))}/>
            </div>
        );
    }
});

// module.exports = DatabaseStatisticsReport;
DatabaseStatisticsReport.propTypes = {
    databaseDailyData: PropTypes.array.isRequired,
    databaseWeeklyData: PropTypes.array.isRequired,
    databaseMonthlyData: PropTypes.array.isRequired,
    databaseQuarterlyData: PropTypes.array.isRequired,
    databaseYearlyData: PropTypes.array.isRequired,
    databaseCustomData: PropTypes.array.isRequired,
    databaseCustomLineData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { databaseDailyData, databaseWeeklyData, databaseMonthlyData, databaseQuarterlyData, databaseYearlyData, databaseCustomData, databaseCustomLineData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      databaseDailyData,
      databaseWeeklyData,
      databaseMonthlyData,
      databaseQuarterlyData,
      databaseYearlyData,
      databaseCustomData,
      databaseCustomLineData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(DatabaseStatisticsReport)
