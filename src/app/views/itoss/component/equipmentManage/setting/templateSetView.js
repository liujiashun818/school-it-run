/**
 * Editd by Yuchen on 2016/03/15.
 * 模板设置
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

var SettingLeftList = require('../alarm/alarmList');
var TemplateSetRightView = require('./templateSetRightView');

var SettingView = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return {
            showMainDiv: true
        }
    },
    componentDidMount: function() {
        const { dispatch } = this.props;
        if(document.getElementById('settingView') != null) {
            document.getElementById('settingView').style.height = $(window).height() - 110 - 30 + 'px';
        }
        document.getElementById('settingList_TemplateConfig').className = 'list-group-item active';
        //获取权限集合
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            dispatch(actions.setPermissions(temp));
            var valid = util.hasPermission(temp,"/equipmentmanage/alarm/templateset");
            if(valid==null){
                this.setState({
                    showMainDiv: false
                });
            }
        }
    },
    render: function() {
        const { dispatch, permissions, templeteList, smsServerStatus, curThreeNode, preThreeNode } = this.props;
        var desView =
            <TemplateSetRightView
                Permissions={permissions}
                TempleteList={templeteList}
                SmsServerStatus={smsServerStatus}
                get_templete_config_page_data={this._get_templete_config_page_data}
                get_templete_list={this._get_templete_list}
                delete_templetes={this._delete_templetes}
                create_templete={this._create_templete}
                update_templete={this._update_templete}
                activate_sms_server={this._activate_sms_server}
                update_sms_server_config={this._update_sms_server_config}
                update_email_server_config={this._update_email_server_config}
                send_email={this._send_email}
                send_sms={this._send_sms} />;
        var mainDiv = this.state.showMainDiv?desView:"";
        return (
            <div id='settingView' className='overviewDiv'>
                <div className='leftListDiv col-md-1'>
                    <SettingLeftList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName}
                        onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                        onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                        setCurName={data => dispatch(setCurName(data))}/>
                </div>
                {mainDiv}
            </div>
        );
    },
    _get_templete_config_page_data: function(param){
        const { dispatch } = this.props;
        dispatch(actions.getTempleteConfigPageData({
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _get_templete_list: function(param){
        const { dispatch } = this.props;
        dispatch(actions.getTempleteList({
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _delete_templetes: function(param){
        const { dispatch } = this.props;
        dispatch(actions.deleteTempletes({
            data: param.data,
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _create_templete: function(param){
        const { dispatch } = this.props;
        dispatch(actions.createTemplete({
            data: param.data,
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _update_templete: function(param){
        const { dispatch } = this.props;
        dispatch(actions.updateTemplete({
            data: param.data,
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _activate_sms_server: function(param){
        const { dispatch } = this.props;
        dispatch(actions.activateSmsServer({
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _update_sms_server_config: function(param){
        const { dispatch } = this.props;
        dispatch(actions.updateSmsServerConfig({
            data: param.data,
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _update_email_server_config: function(param){
        const { dispatch } = this.props;
        dispatch(actions.updateEmailServerConfig({
            data: param.data,
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _send_email: function(param){
        const { dispatch } = this.props;
        dispatch(actions.sendEmail({
            data: param.data,
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _send_sms: function(param){
        const { dispatch } = this.props;
        dispatch(actions.sendSms({
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
    if(document.getElementById('settingView') != null) {
        document.getElementById('settingView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

SettingView.propTypes = {
    templeteList: PropTypes.array.isRequired,
    smsServerStatus: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
    const { permissions, templeteList, smsServerStatus, } = state.alarmReducer;
    const { curThreeNode, preThreeNode,curName } = state.navbarReducer;
    return {
        permissions,
        templeteList,
        smsServerStatus,
        curThreeNode,
        preThreeNode,
        curName
    }
}
export default connect(mapStateToProps)(SettingView)
