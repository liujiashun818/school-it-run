/**
 * Created by Yuchen on 2016/03/09.
 * 新建告警规则
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

var AddAlarmRule_desView = require('./addAlarmRule_desView');

var AddAlarmRuleView = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return {
            showMainDiv: true
        }
    },
    componentDidMount: function() {
        const { dispatch } = this.props;
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
            var valid = util.hasPermission(temp,"/equipmentmanage/alarm/alarmrule");
            if(valid==null){//没有访问权限
                this.setState({
                    showMainDiv: false
                });
            }
            else{//有访问权限
                dispatch(actions.getAddAlarmRulePageData({
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
    render: function() {
        const { permissions, user_addAlarmRule, user_addAlarmRule2, userIdList, receiverIdList, smsTemplete, mailTemplete, } = this.props;
        var desView =
            <AddAlarmRule_desView
                User_addAlarmRule={user_addAlarmRule}
                User_addAlarmRule2={user_addAlarmRule2}
                UserIdList={userIdList}
                ReceiverIdList={receiverIdList}
                SmsTemplete={smsTemplete}
                MailTemplete={mailTemplete}
                create_alarm_rule={this._create_alarm_rule} />
        var mainDiv = this.state.showMainDiv?desView:"";
        return (
            <div id='addAlarmRuleView' className='overviewDiv'>
                {mainDiv}
            </div>
        );
    },
    _create_alarm_rule: function(param){
        const { dispatch } = this.props;
        dispatch(actions.createAlarmRule({
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

AddAlarmRuleView.propTypes = {
    user_addAlarmRule: PropTypes.array.isRequired,
    user_addAlarmRule2: PropTypes.array.isRequired,
    userIdList: PropTypes.array.isRequired,
    receiverIdList: PropTypes.array.isRequired,
    smsTemplete: PropTypes.array.isRequired,
    mailTemplete: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    const { permissions, user_addAlarmRule, user_addAlarmRule2, userIdList, receiverIdList, smsTemplete, mailTemplete, } = state.alarmReducer;
    const { curThreeNode, preThreeNode,curName } = state.navbarReducer
    return {
        permissions,
        user_addAlarmRule,
        user_addAlarmRule2,
        userIdList,
        receiverIdList,
        smsTemplete,
        mailTemplete,
        curThreeNode,
        preThreeNode,
        curName
    }
}

export default connect(mapStateToProps)(AddAlarmRuleView)
