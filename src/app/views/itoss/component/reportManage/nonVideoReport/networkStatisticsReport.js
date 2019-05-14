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
var NetworkStatisticsReportView = require('./networkStatisticsReportView');

var NetworkStatisticsReport = React.createClass({
    render: function() {
        const { dispatch, networkDailyData, networkWeeklyData, networkMonthlyData, networkQuarterlyData, networkYearlyData, networkCustomData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <NonVideoLeftList activeMenu={5} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <NetworkStatisticsReportView networkDailyData={networkDailyData} networkWeeklyData={networkWeeklyData} networkMonthlyData={networkMonthlyData}
                    networkQuarterlyData={networkQuarterlyData} networkYearlyData={networkYearlyData} networkCustomData={networkCustomData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getServerReportData={param => dispatch(reportManageActions.getServerReportData(param))}/>
            </div>
        );
    }
});

// module.exports = NetworkStatisticsReport;
NetworkStatisticsReport.propTypes = {
    networkDailyData: PropTypes.array.isRequired,
    networkWeeklyData: PropTypes.array.isRequired,
    networkMonthlyData: PropTypes.array.isRequired,
    networkQuarterlyData: PropTypes.array.isRequired,
    networkYearlyData: PropTypes.array.isRequired,
    networkCustomData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { networkDailyData, networkWeeklyData, networkMonthlyData, networkQuarterlyData, networkYearlyData, networkCustomData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      networkDailyData,
      networkWeeklyData,
      networkMonthlyData,
      networkQuarterlyData,
      networkYearlyData,
      networkCustomData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(NetworkStatisticsReport)
