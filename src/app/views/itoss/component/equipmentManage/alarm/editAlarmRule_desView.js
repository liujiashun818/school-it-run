/**
 * Created by Yuchen on 2016/03/11.
 * 编辑告警规则主窗口
 */
var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');
var widget = require('../../../../../utils/widget.js');

var EditAlarmRule_infoTab = require('./addAlarmRuleInfoTab');
var EditAlarmRule_ruleTab = require('./addAlarmRuleRuleTab');
var EditAlarmRule_actionTab = require('./addAlarmRuleActionTab');

var EditAlarmRule_desView = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        var _this = this;
        if(document.getElementById('addAlarmRule_desView') != null) {
            document.getElementById('addAlarmRule_desView').style.height = $(window).height() - 110 - 30 + 'px';
        }
    },
    render: function() {
        return (
            <div id="addAlarmRule_desView" className='overviewDesViewDiv'>
                <div className="operationButtons">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            编辑告警规则
                        </div>
                        <div className="titleRight">
                            <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                            <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-md-12">
                        <div className="buttonInfo">
                            <p>编辑告警规则的主要功能：编辑单项告警规则的属性</p>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="buttonInfo">
                            <button id="save-btn" className="btn" onClick={this._handleOnClick} style={{marginRight:5}}>保存</button>
                            <button id="goBack-btn" className="btn" onClick={this._handleOnClick}>返回告警规则列表</button>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className='operationCreateTableDiv col-md-12'>
                    <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#tab-info" aria-controls="tab-info">告警信息</a></li>
                        <li><a data-toggle="tab" href="#tab-rule" aria-controls="tab-rule">告警规则</a></li>
                        <li><a data-toggle="tab" href="#tab-action" aria-controls="tab-action">告警动作</a></li>
                    </ul>
                    <fieldset className="tab-content contentDiv marginleft_none">
                        <div className="tab-pane active" id="tab-info">
                            <EditAlarmRule_infoTab setState={this.props.setState} state={this.props.state}
                                User_addAlarmRule={this.props.User_addAlarmRule}
                                User_addAlarmRule2={this.props.User_addAlarmRule2}
                                UserIdList={this.props.UserIdList}
                                ReceiverIdList={this.props.ReceiverIdList} />
                        </div>
                        <div className="tab-pane" id="tab-rule">
                            <EditAlarmRule_ruleTab setState={this.props.setState} state={this.props.state} />
                        </div>
                        <div className="tab-pane" id="tab-action">
                            <EditAlarmRule_actionTab setState={this.props.setState} state={this.props.state}
                                MailTemplete={this.props.MailTemplete}
                                SmsTemplete={this.props.SmsTemplete} />
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    },
    _handleOnClick: function(e){
        var _this = this;
        switch ($(e.target).attr("id")) {
            case "save-btn":
                var data = {};
                var users = {};
                var receivers = {};
                var valid = true;
                var name = $("#name").val();
                if(name!="") data.AlarmName = name;
                var levelUpTime = parseInt($("#levelUpTime input").val(),10);
                var stopTime = parseInt($("#stopTime input").val(),10);
                if(!isNaN(levelUpTime)) data.UpgradeTimes = levelUpTime;
                if(!isNaN(stopTime)) data.StopTimes = stopTime;
                users = $("#user-table").bootstrapTable("getSelections");
                receivers = $("#receiver-table").bootstrapTable("getSelections");
                data.ErrorAlarm = $("#condition-error").is(":checked");
                data.WarningAlarm = $("#condition-danger").is(":checked");
                data.AlarmLevel = $("#alarmLevelList >.rw-input >span >span").text();
                data.AlarmFilter = parseInt($("input[name='format']:checked").val(),10);
                data.Times = false;
                switch(data.AlarmFilter){
                    case 1:
                        var formatTime = parseInt($("#format1-time input").val(),10);
                        if(!isNaN(formatTime)) data.AlarmStart = formatTime;
                        break;
                    case 2:
                        var formatTime = parseInt($("#format2-time input").val(),10);
                        if(!isNaN(formatTime)) data.AlarmStart = formatTime;
                        break;
                    case 3:
                        var formatTime1 = parseInt($("#format3-time1 input").val(),10);
                        var formatTime2 = parseInt($("#format3-time2 input").val(),10);
                        if(!isNaN(formatTime1)) data.AlarmStart = formatTime1;
                        if(!isNaN(formatTime2)) data.AlarmEnd = formatTime2;
                        break;
                    case 4:
                        data.Times = true;
                        var formatTime = parseInt($("#format4-time input").val(),10);
                        if(!isNaN(formatTime)) data.TimesNum = formatTime;
                        break;
                }
                data.EamilAlarm = $("input[name='mail-alarm']").is(":checked");
                data.WeChatAlarm = $("input[name='wechat-alarm']").is(":checked");
                data.SMSAlarm = $("input[name='sms-alarm']").is(":checked");
                data.SoundAlarm = $("input[name='voice-alarm']").is(":checked");
                data.IsCreateIncident = $("input[name='generateWordOrder']").is(":checked");
                if(data.EamilAlarm){
                    if(this.props.state.mailTempleteID!="") data.MailTemplates = this.props.state.mailTempleteID;
                }
                if(data.WeChatAlarm){
                    data.WeChatUser = $("#wechat-account").val();
                }
                if(data.SMSAlarm){
                    if(this.props.state.smsTempleteID!="") data.SMSTemplates = this.props.state.smsTempleteID;
                }
                if(data.SoundAlarm){
                    data.ServerAddress = $("#server").val();
                    data.UserName = $("#login-name").val();
                    data.Pwd = $("#password").val();
                    data.PlayPath = $("#player-path").val();
                    data.FilePath = $("#voice-file-path").val();
                }
                if(!data.AlarmName||data.AlarmName.length<=0){
                    var valid = false;
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                        document.getElementById('publicMessageModalcontent').innerHTML = "告警名称不能为空";
                        $('#publicMessageModal').modal('show');
                    },100);
                    $('a[aria-controls="tab-info"]').tab('show');
                    $("#name").focus();
                }
                else if(data.EamilAlarm&&(!data.MailTemplates||data.MailTemplates.length<=0)){
                    var valid = false;
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                        document.getElementById('publicMessageModalcontent').innerHTML = "Email模板不能为空";
                        $('#publicMessageModal').modal('show');
                    },100);
                    $('a[aria-controls="tab-action"]').tab('show');
                    $("#mailTempleteDropdown").focus();
                }
                else if(data.SMSAlarm&&(!data.SMSTemplates||data.SMSTemplates.length<=0)){
                    var valid = false;
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                        document.getElementById('publicMessageModalcontent').innerHTML = "短信模板不能为空";
                        $('#publicMessageModal').modal('show');
                    },100);
                    $('a[aria-controls="tab-action"]').tab('show');
                    $("#smsTempleteDropdown").focus();
                }
                else if(data.SoundAlarm&&(!data.UserName||data.UserName.length<=0)){
                    var valid = false;
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                        document.getElementById('publicMessageModalcontent').innerHTML = "登录名不能为空";
                        $('#publicMessageModal').modal('show');
                    },100);
                    $('a[aria-controls="tab-action"]').tab('show');
                    $("#login-name").focus();
                }
                data.RecId = this.props.AlarmRuleId;
                console.log("@TEST1",users);
                console.log("@TEST2",receivers);
                if(valid){//保存
                    this.props.update_alarm_rule({
                        data: data,
                        users: users,
                        receivers: receivers,
                        callback: function(resp){
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                                document.getElementById('publicMessageModalcontent').innerHTML = "编辑成功";
                                $('#publicMessageModal').modal('show');
                            },100);
                            _this.history.pushState(null,'equipmentManage/alarmRulePage');
                        },
                        error: function(resp){
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                                document.getElementById('publicMessageModalcontent').innerHTML = "编辑失败";
                                $('#publicMessageModal').modal('show');
                            },100);
                        },
                    });
                }
                break;
            case "goBack-btn":
                //this.props.set_linshiData(0);
                this.history.pushState(null,'equipmentManage/alarmRulePage');
                break;
        }
    },
});

$(window).resize(function () {
    if(document.getElementById('addAlarmRule_desView') != null) {
        document.getElementById('addAlarmRule_desView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = EditAlarmRule_desView;
