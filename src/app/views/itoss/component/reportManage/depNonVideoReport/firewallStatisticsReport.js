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
var FirewallStatisticsReportView = require('./firewallStatisticsReportView');

var FirewallStatisticsReport = React.createClass({
    render: function() {
        const { dispatch, firewallDailyData, firewallWeeklyData, firewallMonthlyData, firewallQuarterlyData, firewallYearlyData, firewallCustomData, firewallCustomLineData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <NonVideoLeftList activeMenu={6} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))} curThreeNode={curThreeNode} preThreeNode={preThreeNode} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <FirewallStatisticsReportView firewallDailyData={firewallDailyData} firewallWeeklyData={firewallWeeklyData} firewallMonthlyData={firewallMonthlyData}
                    firewallQuarterlyData={firewallQuarterlyData} firewallYearlyData={firewallYearlyData} firewallCustomData={firewallCustomData} firewallCustomLineData={firewallCustomLineData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getServerReportData={param => dispatch(reportManageActions.getServerReportData(param))}/>
            </div>
        );
    }
});

// module.exports = FirewallStatisticsReport;
FirewallStatisticsReport.propTypes = {
    firewallDailyData: PropTypes.array.isRequired,
    firewallWeeklyData: PropTypes.array.isRequired,
    firewallMonthlyData: PropTypes.array.isRequired,
    firewallQuarterlyData: PropTypes.array.isRequired,
    firewallYearlyData: PropTypes.array.isRequired,
    firewallCustomData: PropTypes.array.isRequired,
    firewallCustomLineData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { firewallDailyData, firewallWeeklyData, firewallMonthlyData, firewallQuarterlyData, firewallYearlyData, firewallCustomData, firewallCustomLineData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      firewallDailyData,
      firewallWeeklyData,
      firewallMonthlyData,
      firewallQuarterlyData,
      firewallYearlyData,
      firewallCustomData,
      firewallCustomLineData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(FirewallStatisticsReport)
