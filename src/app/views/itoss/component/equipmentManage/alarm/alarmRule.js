/**
 * Created by Yuchen on 2016/03/07.
 * 告警规则
 */
 'use strict';
import React, { PropTypes } from 'react'
var Store = require('../../../../../server/store.js');
var base64 = require('../../../../../utils/base64.js');
var util = require('../../../../../utils/util.js');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

import { connect } from 'react-redux'
import * as actions from '../../../../../actions/alarm_action'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'

var AlarmList = require('./alarmList');
var AlarmRule_desView = require('./alarmRule_desView');

var AlarmRuleView = React.createClass({
    getInitialState: function() {
        return {
            showMainDiv: true
        }
    },
    componentDidMount: function() {
        const { dispatch } = this.props;
        if(document.getElementById('alarmRuleView') != null) {
            document.getElementById('alarmRuleView').style.height = $(window).height() - 110 - 30 + 'px';
        }
        if(document.getElementById('alarmList_alarmRule')) document.getElementById('alarmList_alarmRule').className = 'list-group-item active';
        //获取权限集合
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            dispatch(actions.setPermissions(temp));
            var valid = util.hasPermission(temp,"/equipmentmanage/alarm/alarmrule");
            if(valid==null){
                this.setState({
                    showMainDiv: false
                });
            }
        }
    },
    render: function() {
        const { dispatch, permissions, alarmRuleList, curThreeNode, preThreeNode } = this.props;
        var desView =
            <AlarmRule_desView
                permissions={permissions}
                alarmRuleList={alarmRuleList}
                get_alarm_rule_data={this._get_alarm_rule_data}
                set_alarm_rule_id={this._set_alarm_rule_id}
                delete_alarm_rules={this._delete_alarm_rules}
                set_alarm_rule_states={this._set_alarm_rule_states} />;
        var mainDiv = this.state.showMainDiv?desView:"";
        return (
            <div id='alarmRuleView' className='overviewDiv'>
                <div className='leftListDiv col-md-1'>
                    <AlarmList curThreeNode={curThreeNode} preThreeNode={preThreeNode} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                        onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))} curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}/>
                </div>
                {mainDiv}
            </div>
        );
    },
    _get_alarm_rule_data: function(param){
        const { dispatch } = this.props;
        dispatch(actions.getAlarmRulePageData({
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _set_alarm_rule_id: function(param){
        const { dispatch } = this.props;
        dispatch(actions.setAlarmRuleID(param.id));
    },
    _delete_alarm_rules: function(param){
        const { dispatch } = this.props;
        dispatch(actions.deleteAlarmRules({
            data: param.data,
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _set_alarm_rule_states: function(param){
        const { dispatch } = this.props;
        dispatch(actions.setAlarmRuleStates({
            flag: param.flag,
            data: param.data,
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
});

$(window).resize(function () {
    if(document.getElementById('alarmRuleView') != null) {
        document.getElementById('alarmRuleView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

AlarmRuleView.propTypes = {
    alarmRuleList: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { permissions, alarmRuleList } = state.alarmReducer;
    const { curThreeNode, preThreeNode,curName } = state.navbarReducer;
    return {
        permissions,
        alarmRuleList,
        curThreeNode,
        preThreeNode,
        curName
    }
}

export default connect(mapStateToProps)(AlarmRuleView)
