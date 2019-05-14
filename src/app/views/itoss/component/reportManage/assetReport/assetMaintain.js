/**
* Created by Yuchen  2016/01/26.
* 资产维修报表
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
import { setCurThreeNode,setPreThreeNode,curName } from '../../../../../actions/navbar_action'
var AssetReportManageList = require('./assetReportList');
var MaintainReportView = require('./assetMaintainView');

var MaintainReport = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        if(document.getElementById('assetMaintainReport') != null) {
            document.getElementById('assetMaintainReport').style.height = $(window).height() - 110 - 30 + 'px';
        };
        if(document.getElementById('statistic')!=null) document.getElementById('statistic').className = 'list-group-item';
        if(document.getElementById('maintain')!=null) document.getElementById('maintain').className = 'list-group-item active';
    },
    render: function() {
        const { dispatch,
                permissions,
                defaultDeviceStateValue,
                maintainReportMonthlyData,
                maintainReportYearlyData,
                curThreeNode,
                preThreeNode } = this.props;
        var report = {
            defaultDeviceStateValue: defaultDeviceStateValue,
            maintainReportMonthlyData: maintainReportMonthlyData,
            maintainReportYearlyData: maintainReportYearlyData,
        }
        return (
            <div id='assetMaintainReport' className='overviewDiv'>
                <div className='leftListDiv col-md-1'>
                    <AssetReportManageList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName}
                      onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                      setCurName={data => dispatch(setCurName(data))}
                      onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}/>
                </div>
                <MaintainReportView
                    report={report}
                    set_InitAssetReportData={this._set_InitAssetReportData}
                    get_maintain_report_data={this._get_maintain_report_data} />
            </div>
        );
    },
    _set_InitAssetReportData: function(param){
        const { dispatch } = this.props;
        dispatch(actions.setInitData(param));
    },
    _get_maintain_report_data: function(param){
        const { dispatch } = this.props;
        dispatch(actions.getMaintainReportData(param));
    },
});

$(window).resize(function () {
    if(document.getElementById('assetMaintainReport') != null) {
        document.getElementById('assetMaintainReport').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

MaintainReport.propTypes = {
    dispatch: PropTypes.func.isRequired,
    defaultDeviceStateValue: PropTypes.number.isRequired,
    maintainReportMonthlyData: PropTypes.array.isRequired,
    maintainReportYearlyData: PropTypes.array.isRequired,
}
function mapStateToProps(state) {
    const { permissions,
            defaultDeviceStateValue,
            maintainReportMonthlyData,
            maintainReportYearlyData, } = state.assetReportReducer;
    const { curThreeNode, preThreeNode,curName } = state.navbarReducer;
    return {
        permissions,
        defaultDeviceStateValue,
        maintainReportMonthlyData,
        maintainReportYearlyData,
        curThreeNode,
        preThreeNode,
        curName
    }
}
export default connect(mapStateToProps)(MaintainReport)
