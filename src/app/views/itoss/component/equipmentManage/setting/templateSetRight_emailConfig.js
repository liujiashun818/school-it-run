/**
 * Created by Yuchen on 2016/03/15.
 * 模板设置-邮件设置tab
 */
var React = require('react');
var util = require('../../../../../utils/util.js');
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');

var EmailConfig = React.createClass({
    mixins: [History],
    getInitialState: function () {
        return {
            origin: {
                default_sender_smtp: "smtp.exmail.qq.com",
                default_sender_email: "itossadmin@dragonflow.com",
                default_backup_smtp: "smtp.exmail.qq.com",
                default_login_id: "itossadmin@dragonflow.com",
                default_login_password: "siteview123!@#",
            }
        }
    },
    componentWillMount: function() {

    },
    componentDidMount: function() {

    },
    render: function() {
        var valid_edit = util.hasPermission(this.props.Permissions,"/equipmentmanage/alarm/templateset/edit");
        var applyBtn = valid_edit!=null?(<button id="emailServerConfig_apply" className="btn btnSave" style={{marginRight: '8px'}} onClick={this._handleOnClick}>应用</button>):"";
        var resetBtn = valid_edit!=null?(<button id="emailServerConfig_reset" className="btn btnSave" style={{marginRight: '8px'}} onClick={this._handleOnClick}>重新获得</button>):"";
        return (
            <div className="createGroupDetailDiv userAddView_desView_form addAlarmRule_form">
                <input id="emailServerConfigId" type="hidden" />
                <table className="normal-table">
                    <tbody>
                        <tr>
                            <td className="col-md-1">发送服务器SMTP</td>
                            <td className="col-md-11 no-padding inline-input">
                                <input id="sender_smtp" tabIndex="1" type="text" defaultValue={this.state.origin.default_sender_smtp} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1">发送方Email地址</td>
                            <td className="col-md-11 no-padding inline-input">
                                <input id="sender_email" tabIndex="2" type="text" defaultValue={this.state.origin.default_sender_email} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1">备份发送服务器</td>
                            <td className="col-md-11 no-padding inline-input">
                                <input id="backup_smtp" tabIndex="3" type="text" defaultValue={this.state.origin.default_backup_smtp} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1">身份验证用户名</td>
                            <td className="col-md-11 no-padding inline-input">
                                <input id="login_id" autoComplete="off" tabIndex="4" type="text" defaultValue={this.state.origin.default_login_id} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1">身份验证密码</td>
                            <td className="col-md-11 no-padding inline-input">
                                <input id="login_password" autoComplete="off" tabIndex="5" type="password" defaultValue={this.state.origin.default_login_password} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="operationButtons tabBottomButtons">
                    <div className="col-md-12 pad-no">
                        <div className="buttonInfo">
                            {applyBtn}
                            {resetBtn}
                            <button id="emailServerConfig_test" className="btn btnSave" onClick={this._handleOnClick}>测试</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _handleOnClick: function(e){
        var $e = $(e.target);
        var id = $e.attr("id");
        switch(id){
            case "emailServerConfig_apply":
                var data = {};
                data.MailType = "send";
                data.SendServer = $("#sender_smtp").val();
                data.MailAddress = $("#sender_email").val();
                data.BackupSendServer = $("#backup_smtp").val();
                data.MailUserName = $("#login_id").val();
                data.MailPwd = $("#login_password").val();
                data.RecId = $("#emailServerConfigId").val();
                this.props.update_email_server_config({
                    data: data,
                    callback: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "邮件服务器配置";
                            document.getElementById('publicMessageModalcontent').innerHTML = "设置成功";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                    error: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "邮件服务器配置";
                            document.getElementById('publicMessageModalcontent').innerHTML = "设置失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                });
                break;
            case "emailServerConfig_reset":
                $("#sender_smtp").val(this.state.origin.default_sender_smtp);
                $("#sender_email").val(this.state.origin.default_sender_email);
                $("#backup_smtp").val(this.state.origin.default_backup_smtp);
                $("#login_id").val(this.state.origin.default_login_id);
                $("#login_password").val(this.state.origin.default_login_password);
                break;
            case "emailServerConfig_test":
                $("#emailTest-receivers").val("");
                $("#emailTest-content").val("");
                $("#emailTest").modal("show");
                break;
        }
    },
});

module.exports = EmailConfig;
