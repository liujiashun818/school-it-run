/**
 * Created by Yuchen on 2016/03/11.
 * 编辑告警规则
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

var EditAlarmRule_desView = require('./editAlarmRule_desView');

var alarmLevelList = [
    {id:1,title:"严重告警"},
    {id:2,title:"主要告警"},
    {id:3,title:"次要告警"},
    {id:4,title:"警告告警"},
]

var EditAlarmRuleView = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return {
            showMainDiv: true,
            alarmLevel: 2,
            mailTempleteID: "",
            smsTempleteID: "",
        }
    },
    componentDidMount: function() {
        const { dispatch } = this.props;
        var _this = this;
        if(document.getElementById('addAlarmRuleView') != null) {
            document.getElementById('addAlarmRuleView').style.height = $(window).height() - 110 - 30 + 'px';
        }
        //获取权限集合
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            dispatch(actions.setPermissions(temp));
            var valid = util.hasPermission(temp,"/equipmentmanage/alarm/alarmrule/edit");
            if(valid==null){//没有访问权限
                this.setState({
                    showMainDiv: false
                });
            }
            else{//有访问权限
                dispatch(actions.getEditAlarmRulePageData({
                    callback: function(resp){
                        var alarmRule = resp.alarmRule;
                        if(!alarmRule) return;
                        alarmRule.UpgradeTimes = parseInt(alarmRule.UpgradeTimes,10);
                        alarmRule.StopTimes = parseInt(alarmRule.StopTimes,10);
                        alarmRule.AlarmStart = parseInt(alarmRule.AlarmStart,10);
                        alarmRule.AlarmFilter = parseInt(alarmRule.AlarmFilter,10);
                        alarmRule.AlarmEnd = parseInt(alarmRule.AlarmEnd,10);
                        alarmRule.TimesNum = parseInt(alarmRule.TimesNum,10);
                        var alarmLevel = 2;
                        for(var i in alarmLevelList){
                            if(alarmLevelList[i].title===alarmRule.AlarmLevel){
                                alarmLevel = alarmLevelList[i].id;
                                break;
                            }
                        };
                        _this.setState({
                            origin: alarmRule,
                            mailTempleteID: alarmRule.MailTemplates,
                            smsTempleteID: alarmRule.SMSTemplates,
                            alarmLevel: alarmLevel,
                        });
                    },
                    error: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                            document.getElementById('publicMessageModalcontent').innerHTML = "获取页面数据失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                }));
            }
        }
    },
    componentDidUpdate: function(){
    },
    render: function() {
        const { permissions, user_addAlarmRule, user_addAlarmRule2, userIdList, receiverIdList, smsTemplete, mailTemplete, alarmRuleID, } = this.props;
        var desView =
            <EditAlarmRule_desView state={this.state} setState={this._setState}
                User_addAlarmRule={user_addAlarmRule}
                User_addAlarmRule2={user_addAlarmRule2}
                UserIdList={userIdList}
                ReceiverIdList={receiverIdList}
                SmsTemplete={smsTemplete}
                MailTemplete={mailTemplete}
                AlarmRuleId={alarmRuleID}
                update_alarm_rule={this._update_alarm_rule} />
        var mainDiv = this.state.showMainDiv?desView:"";
        return (
            <div id='addAlarmRuleView' className='overviewDiv'>
                {mainDiv}
            </div>
        );
    },
    _setState: function(data,callback){
        if(!data) return;
        if(callback) this.setState(data,callback);
        else this.setState(data);
    },
    _update_alarm_rule: function(param){
        const { dispatch } = this.props;
        dispatch(actions.updateAlarmRule({
            data: param.data,
            users: param.users,
            receivers: param.receivers,
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
    if(document.getElementById('addAlarmRuleView') != null) {
        document.getElementById('addAlarmRuleView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

EditAlarmRuleView.propTypes = {
    user_addAlarmRule: PropTypes.array.isRequired,
    user_addAlarmRule2: PropTypes.array.isRequired,
    userIdList: PropTypes.array.isRequired,
    receiverIdList: PropTypes.array.isRequired,
    smsTemplete: PropTypes.array.isRequired,
    mailTemplete: PropTypes.array.isRequired,
    alarmRuleID: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    const { permissions, user_addAlarmRule, user_addAlarmRule2, userIdList, receiverIdList, smsTemplete, mailTemplete, alarmRuleID, } = state.alarmReducer;
    const { curThreeNode, preThreeNode,curName } = state.navbarReducer
    return {
        permissions,
        user_addAlarmRule,
        user_addAlarmRule2,
        userIdList,
        receiverIdList,
        smsTemplete,
        mailTemplete,
        alarmRuleID,
        curThreeNode,
        preThreeNode,
        curName
    }
}

export default connect(mapStateToProps)(EditAlarmRuleView)
