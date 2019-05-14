/**
 * Created by Yuchen on 2016/03/07.
 * 告警日志
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
var AlarmLog_desView = require('./alarmLog_desView');

var AlarmLogView = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return {
            showMainDiv: true
        }
    },
    componentDidMount: function() {
        const { dispatch } = this.props;
        if(document.getElementById('alarmLogView') != null) {
            document.getElementById('alarmLogView').style.height = $(window).height() - 110 - 30 + 'px';
        }
        // document.getElementById('alarmList_alarmLog').className = 'list-group-item active';
        //获取权限集合
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            dispatch(actions.setPermissions(temp));
            var valid = util.hasPermission(temp,"/equipmentmanage/alarm/alarmlog");
            if(valid==null){
                this.setState({
                    showMainDiv: false
                });
            }
        }
    },
    render: function() {
        const { dispatch, permissions, alarmLogList, alarmLogCount, alarmNameList, curThreeNode, preThreeNode } = this.props;
        var desView =
            <AlarmLog_desView
                AlarmLogList={alarmLogList}
                AlarmLogCount={alarmLogCount}
                AlarmNameList={alarmNameList}
                get_alarm_log_page_data={this._get_alarm_log_page_data} />;
        var mainDiv = this.state.showMainDiv?desView:"";
        return (
            <div id='alarmLogView' className='overviewDiv'>
                <div className='leftListDiv col-md-1'>
                    <AlarmList curThreeNode={curThreeNode} preThreeNode={preThreeNode} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                        onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))} curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}/>
                </div>
                {mainDiv}
            </div>
        );
    },
    _get_alarm_log_page_data: function(param){
        const { dispatch } = this.props;
        dispatch(actions.getAlarmLogPageData({
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
    if(document.getElementById('alarmLogView') != null) {
        document.getElementById('alarmLogView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

AlarmLogView.propTypes = {
    alarmLogList: PropTypes.array.isRequired,
    alarmLogCount: PropTypes.number.isRequired,
    alarmNameList: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { permissions, alarmLogList, alarmLogCount, alarmNameList } = state.alarmReducer;
    const { curThreeNode, preThreeNode,curName } = state.navbarReducer;
    return {
        permissions,
        alarmLogList,
        alarmLogCount,
        alarmNameList,
        curThreeNode,
        preThreeNode,
        curName
    }
}

export default connect(mapStateToProps)(AlarmLogView)
