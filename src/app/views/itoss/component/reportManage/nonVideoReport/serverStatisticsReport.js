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
var ServerStatisticsReportView = require('./serverStatisticsReportView');

var ServerStatisticsReport = React.createClass({
    render: function() {
        const { dispatch, serverDailyData, serverWeeklyData, serverMonthlyData, serverQuarterlyData, serverYearlyData, serverCustomData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <NonVideoLeftList activeMenu={4} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <ServerStatisticsReportView serverDailyData={serverDailyData} serverWeeklyData={serverWeeklyData} serverMonthlyData={serverMonthlyData}
                    serverQuarterlyData={serverQuarterlyData} serverYearlyData={serverYearlyData} serverCustomData={serverCustomData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getServerReportData={param => dispatch(reportManageActions.getServerReportData(param))}/>
            </div>
        );
    }
});

// module.exports = ServerStatisticsReport;
ServerStatisticsReport.propTypes = {
    serverDailyData: PropTypes.array.isRequired,
    serverWeeklyData: PropTypes.array.isRequired,
    serverMonthlyData: PropTypes.array.isRequired,
    serverQuarterlyData: PropTypes.array.isRequired,
    serverYearlyData: PropTypes.array.isRequired,
    serverCustomData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { serverDailyData, serverWeeklyData, serverMonthlyData, serverQuarterlyData, serverYearlyData, serverCustomData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      serverDailyData,
      serverWeeklyData,
      serverMonthlyData,
      serverQuarterlyData,
      serverYearlyData,
      serverCustomData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(ServerStatisticsReport)
