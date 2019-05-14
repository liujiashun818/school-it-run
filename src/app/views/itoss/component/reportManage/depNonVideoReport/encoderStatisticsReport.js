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
var EncoderStatisticsReportView = require('./encoderStatisticsReportView');

var EncoderStatisticsReport = React.createClass({
    render: function() {
        const { dispatch, encoderStorageDailyData, encoderStorageWeeklyData, encoderStorageMonthlyData, encoderStorageQuarterlyData, encoderStorageYearlyData, encoderStorageCustomData, encoderStorageCustomLineData, curThreeNode, preThreeNode } = this.props;
        return (
            <div className='overviewDiv'>
                <NonVideoLeftList activeMenu={3} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={data => dispatch(navbarActions.setCurName(data))} onGetCurThreeNode={curNode => dispatch(navbarActions.setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(navbarActions.setPreThreeNode(curNode))}/>
                <EncoderStatisticsReportView encoderStorageDailyData={encoderStorageDailyData} encoderStorageWeeklyData={encoderStorageWeeklyData} encoderStorageMonthlyData={encoderStorageMonthlyData}
                    encoderStorageQuarterlyData={encoderStorageQuarterlyData} encoderStorageYearlyData={encoderStorageYearlyData} encoderStorageCustomData={encoderStorageCustomData} encoderStorageCustomLineData={encoderStorageCustomLineData}
                    setinitCustomData={() => dispatch(reportManageActions.setinitCustomData())} getStorageData={param => dispatch(reportManageActions.getStorageData(param))}/>
            </div>
        );
    }
});

// module.exports = EncoderStatisticsReport;
EncoderStatisticsReport.propTypes = {
    encoderStorageDailyData: PropTypes.array.isRequired,
    encoderStorageWeeklyData: PropTypes.array.isRequired,
    encoderStorageMonthlyData: PropTypes.array.isRequired,
    encoderStorageQuarterlyData: PropTypes.array.isRequired,
    encoderStorageYearlyData: PropTypes.array.isRequired,
    encoderStorageCustomData: PropTypes.array.isRequired,
    encoderStorageCustomLineData: PropTypes.array.isRequired,
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { encoderStorageDailyData, encoderStorageWeeklyData, encoderStorageMonthlyData, encoderStorageQuarterlyData, encoderStorageYearlyData, encoderStorageCustomData, encoderStorageCustomLineData } = state.reportManageReducer
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer

  return {
      encoderStorageDailyData,
      encoderStorageWeeklyData,
      encoderStorageMonthlyData,
      encoderStorageQuarterlyData,
      encoderStorageYearlyData,
      encoderStorageCustomData,
      encoderStorageCustomLineData,
      curThreeNode,
      preThreeNode,
      curName
  }
}

export default connect(mapStateToProps)(EncoderStatisticsReport)
