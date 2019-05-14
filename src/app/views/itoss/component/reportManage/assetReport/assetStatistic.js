/**
* Created by Yuchen  2016/01/21.
* 资产统计报表
*/
'use strict';
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

import { connect } from 'react-redux'
import * as actions from '../../../../../actions/assetReport_actions'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
var AssetReportManageList = require('./assetReportList');
var AssetStatisticView = require('./assetStatisticView');

var StatisticReport = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        if(document.getElementById('assetStatistic') != null) {
            document.getElementById('assetStatistic').style.height = $(window).height() - 110 - 30 + 'px';
        };
        if(document.getElementById('statistic')!=null) document.getElementById('statistic').className = 'list-group-item active';
        if(document.getElementById('maintain')!=null) document.getElementById('maintain').className = 'list-group-item';
    },
    render: function() {
        const { dispatch,
                permissions,
                defaultDeviceStateValue,
                assetReportMonthlyData,
                assetReportYearlyData,
                curThreeNode,
                preThreeNode } = this.props;
        var report = {
            defaultDeviceStateValue: defaultDeviceStateValue,
            assetReportMonthlyData: assetReportMonthlyData,
            assetReportYearlyData: assetReportYearlyData,
        }
        return (
            <div id='assetStatisticReport' className='overviewDiv'>
                <div className='leftListDiv col-md-1'>
                    <AssetReportManageList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName}
                      setCurName={data => dispatch(setCurName(data))}
                      onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                      onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}/>
                </div>
                <AssetStatisticView
                    report={report}
                    set_InitAssetReportData={this._set_InitAssetReportData}
                    get_statistic_report_data={this._get_statistic_report_data} />
            </div>
        );
    },
    _set_InitAssetReportData: function(param){
        const { dispatch } = this.props;
        dispatch(actions.setInitData(param));
    },
    _get_statistic_report_data: function(param){
        const { dispatch } = this.props;
        dispatch(actions.getStatisticReportData(param));
    },
});

$(window).resize(function () {
    if(document.getElementById('assetStatistic') != null) {
        document.getElementById('assetStatistic').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

StatisticReport.propTypes = {
    dispatch: PropTypes.func.isRequired,
    defaultDeviceStateValue: PropTypes.number.isRequired,
    assetReportMonthlyData: PropTypes.array.isRequired,
    assetReportYearlyData: PropTypes.array.isRequired,
}
function mapStateToProps(state) {
    const { permissions,
            defaultDeviceStateValue,
            assetReportMonthlyData,
            assetReportYearlyData, } = state.assetReportReducer;
    const { curThreeNode, preThreeNode,curName } = state.navbarReducer;
    return {
        permissions,
        defaultDeviceStateValue,
        assetReportMonthlyData,
        assetReportYearlyData,
        curThreeNode,
        preThreeNode,
        curName
    }
}
export default connect(mapStateToProps)(StatisticReport)
