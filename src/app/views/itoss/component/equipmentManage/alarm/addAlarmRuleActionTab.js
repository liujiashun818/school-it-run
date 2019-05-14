/**
 * Created by Yuchen on 2016/03/10.
 * 告警规则新增&编辑页-告警动作tab页
 */
var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');

var AddAlarmRuleActionTab = React.createClass({
    mixins: [History],
    componentDidUpdate: function() {
        $(".checkbox-td input[type='checkbox']").click(function(e){
            e.stopPropagation();
        });
        $(".checkbox-td").unbind("click");
        $(".checkbox-td").find("input").unbind("click");
        $(".checkbox-td").click(function(e){
            e.stopPropagation();
            var input = $(this).find("input");
            input.prop("checked",!input.is(":checked"));
            //设置desc-group的样式
            var value = input.val();
            if(input.is(":checked")) $("td[data-target='action-"+value+"']").removeClass("forbidden");
            else $("td[data-target='action-"+value+"']").addClass("forbidden");
        });
        $(".checkbox-td").find("input").click(function(e){
            e.stopPropagation();
            //设置desc-group的样式
            var value = $(this).val();
            if($(this).is(":checked")) $("td[data-target='action-"+value+"']").removeClass("forbidden");
            else $("td[data-target='action-"+value+"']").addClass("forbidden");
        });
        //设置desc-group的样式
        var values = [];
        if($("input[name='mail-alarm']").is(":checked")) values.push("action-1");
        if($("input[name='wechat-alarm']").is(":checked")) values.push("action-2");
        if($("input[name='sms-alarm']").is(":checked")) values.push("action-3");
        if($("input[name='voice-alarm']").is(":checked")) values.push("action-4");
        var DOMNode = $(ReactDOM.findDOMNode(this));
        DOMNode.find(".desc-group").each(function(){
            $(this).addClass("forbidden");
            var action = $(this).data("target");
            if($.inArray(action,values)!=-1){
                $(this).removeClass("forbidden");
            }
        })
    },
    render: function() {
        if(!this.props.state.origin) return (<div></div>);
        var _this = this;
        var change = (flag,value) =>{
            switch(flag){
                case 1:
                    _this.props.setState({
                        mailTempleteID: value.RecId,
                    });
                    break;
                case 2:
                    _this.props.setState({
                        smsTempleteID: value.RecId,
                    });
                    break;
            }
        }
        var mail = this.props.state.origin.EamilAlarm?"checked":"";
        var wechat = this.props.state.origin.WeChatAlarm?"checked":"";
        var sms = this.props.state.origin.SMSAlarm?"checked":"";
        var voice = this.props.state.origin.SoundAlarm?"checked":"";
        var generateWordOrder = this.props.state.origin.IsCreateIncident?"checked":"";
        var wechat_val = this.props.state.origin.WeChatUser || "";
        var server_val = this.props.state.origin.ServerAddress || "127.0.0.1";
        var userAccount_val = this.props.state.origin.UserName || "administrator";
        var password_val = this.props.state.origin.Pwd || "";
        var player_path_val = this.props.state.origin.PlayPath || "";
        var voice_file_path_val = this.props.state.origin.FilePath || "";
        var defaultMailTempleteID = this.props.state.mailTempleteID;
        var defaultSMSTempleteID = this.props.state.smsTempleteID;
        return (
            <div className="createGroupDetailDiv userAddView_desView_form addAlarmRule_form">
                <table className="normal-table">
                    <tbody>
                        <tr>
                            <td className="col-md-1 checkbox-td text-center">
                                <span><input name="mail-alarm" type="checkbox" defaultChecked={mail} value="1" /></span>
                                邮件告警
                            </td>
                            <td className="col-md-1 desc-group text-center" data-target="action-1"><span>Email模板 <red>*</red> :</span></td>
                            <td className="col-md-5 no-padding inline-input desc-group text-center" data-target="action-1">
                                <ReactWidgets.DropdownList id="mailTempleteDropdown" tabIndex="1" onChange={change.bind(null,1)}
                                    className='dropdownStyle' data={this.props.MailTemplete} value={defaultMailTempleteID} textField='MailTitle' valueField='RecId' />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1 checkbox-td text-center">
                                <span><input name="wechat-alarm" type="checkbox" defaultChecked={wechat} value="2" /></span>
                                微信告警
                            </td>
                            <td className="col-md-1 desc-group text-center" data-target="action-2"><span>微信账号 :</span></td>
                            <td className="col-md-5 no-padding inline-input desc-group text-center" data-target="action-2">
                                <input id="wechat-account" tabIndex="2" type="text" defaultValue={wechat_val} placeholder="(关注OMS公众号，注册企业用户，此处填写企业公众号)" />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1 checkbox-td text-center">
                                <span><input name="sms-alarm" type="checkbox" defaultChecked={sms} value="3" /></span>
                                短信告警
                            </td>
                            <td className="col-md-1 desc-group text-center" data-target="action-3"><span>短信模板 <red>*</red> :</span></td>
                            <td className="col-md-5 no-padding inline-input desc-group text-center" data-target="action-3">
                                <ReactWidgets.DropdownList id="smsTempleteDropdown" tabIndex="3" onChange={change.bind(null,2)}
                                    className='dropdownStyle' data={this.props.SmsTemplete} value={defaultSMSTempleteID} textField='MailTitle' valueField='RecId' />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1 checkbox-td text-center" rowSpan={5} >
                                <span><input name="voice-alarm" type="checkbox" defaultChecked={voice} value="4" /></span>
                                声音告警
                            </td>
                            <td className="col-md-1 desc-group text-center" data-target="action-4"><span>服务器 :</span></td>
                            <td className="col-md-5 no-padding inline-input desc-group text-center" data-target="action-4">
                                <input id="server" tabIndex="4" type="text" defaultValue={server_val} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1 desc-group text-center" data-target="action-4"><span>登录名 <red>*</red> :</span></td>
                            <td className="col-md-5 no-padding inline-input desc-group text-center" data-target="action-4">
                                <input id="login-name" tabIndex="5" type="text" defaultValue={userAccount_val} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1 desc-group text-center" data-target="action-4"><span>登录密码 :</span></td>
                            <td className="col-md-5 no-padding inline-input desc-group text-center" data-target="action-4">
                                <input id="password" tabIndex="6" type="password" defaultValue={password_val} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1 desc-group text-center" data-target="action-4"><span>播放器路径 :</span></td>
                            <td className="col-md-5 no-padding inline-input desc-group text-center" data-target="action-4">
                                <input id="player-path" tabIndex="7" type="text" defaultValue={player_path_val} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1 desc-group text-center" data-target="action-4"><span>声音文件路径 :</span></td>
                            <td className="col-md-5 no-padding inline-input desc-group text-center" data-target="action-4">
                                <input id="voice-file-path" tabIndex="8" type="text" defaultValue={voice_file_path_val} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1 checkbox-td text-center" rowSpan={5} >
                                <span><input name="generateWordOrder" type="checkbox" defaultChecked={generateWordOrder} value="5" /></span>
                                是否生成工单
                            </td>
                            <td className="col-md-11" colSpan={2}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    },
});

module.exports = AddAlarmRuleActionTab;
