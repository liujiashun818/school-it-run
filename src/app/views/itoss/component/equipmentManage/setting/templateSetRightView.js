/**
 * Created by SHIN on 2016/01/14.
 * Editd by Yuchen on 2016/03/15.
 * 模板设置主窗口
 */
var React = require('react');
var util = require('../../../../../utils/util.js');
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');

var EmailTemplete_modal = require('./templateSetRight_emailTemplete_modal');
var SMSTemplete_modal = require('./templateSetRight_smsTemplete_modal');
var EmailTest_modal = require('./templateSetRight_emailTest_modal');
var SMSTest_modal = require('./templateSetRight_smsTest_modal');
var Templete_list = require('./templateSetRight_templeteList');
var Email_config = require('./templateSetRight_emailConfig');
var SMS_config = require('./templateSetRight_smsConfig');

var SettingRightView = React.createClass({
    mixins: [History],
    getInitialState: function () {
        return {
            //modalType: 0-新建 | 1-编辑
            modalType: 0,
            default_email_content: ("监测点所在设备所在组的全部路径名称: @FullPathGroup@\n监测器: @Group@ : @Monitor@\n组: @AllGroup@\n设备: @Device@\n监测器描述: @MonitorDstr@\n状态: @Status@\n时间: @Time@\n监测点告警描述: @MonitorAlertDes@"),
            default_sms_content: ("监测点所在设备所在组的全部路径名称: @FullPathGroup@\n监测器点的状态: @Status@ \n监测点所在设备所在组名称: @AllGroup@\n监测点所在组下: @Group@\n监测点所在设备的名称: @Device@\n监测点名称: @Monitor@\n监测点告警描述: @MonitorDstr@\n告警时间: @Time@"),
        }
    },
    componentDidMount: function() {
        var _this = this;
        this.props.get_templete_config_page_data({
            callback: function(resp){
                $("#emailServerConfigId").val(resp.emailServerConfig.RecId);
                $("#smsServerConfigId").val(resp.smsServerConfig.RecId);
                $("#sender_smtp").val(resp.emailServerConfig.SendServer);
                $("#sender_email").val(resp.emailServerConfig.MailAddress);
                $("#backup_smtp").val(resp.emailServerConfig.BackupSendServer);
                $("#login_id").val(resp.emailServerConfig.MailUserName);
                $("#login_password").val(resp.emailServerConfig.MailPwd);
                $("#gateway").val(resp.smsServerConfig.SMSUserName);
                $("#serialPort").val(resp.smsServerConfig.SMSPwd);
                $("#baudRate").val(resp.smsServerConfig.SMSLength);
                $("#manufacturer").val(resp.smsServerConfig.TaskPlanType);
                $("#model").val(resp.smsServerConfig.MouldId);
            },
            error: function(resp){
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                    document.getElementById('publicMessageModalcontent').innerHTML = "获取模板列表失败";
                    $('#publicMessageModal').modal('show');
                },100);
            },
        });
    },
    render: function() {
        var valid_add = util.hasPermission(this.props.Permissions,"/equipmentmanage/alarm/templateset/add");
        var valid_delete = util.hasPermission(this.props.Permissions,"/equipmentmanage/alarm/templateset/delete");
        var createEmailModelBtn = valid_add!=null?(<button id="alarmConfigView_createEmailTemplete" className="btn btnSave" style={{marginRight: '8px'}} onClick={this._handleOnClick}>新建邮件模板</button>):"";
        var createSMSModelBtn = valid_add!=null?(<button id="alarmConfigView_createSMSTemplete" className="btn btnSave" style={{marginRight: '8px'}} onClick={this._handleOnClick}>新建短信模板</button>):"";
        var deleteModelBtn = valid_delete!=null?(<button id="alarmConfigView_deleteTemplete" className="btn btnSave btnDelete" style={{marginRight: '8px'}} onClick={this._handleOnClick}>删除模板</button>):"";
        return (
            <div id="templateSet" className='overviewDesViewDiv'>
                <EmailTemplete_modal setState={this._setState} state={this.state}
                    create_templete={this.props.create_templete}
                    update_templete={this.props.update_templete} />
                <SMSTemplete_modal setState={this._setState} state={this.state}
                    create_templete={this.props.create_templete}
                    update_templete={this.props.update_templete} />
                <EmailTest_modal setState={this._setState} state={this.state} send_email={this.props.send_email} />
                <SMSTest_modal setState={this._setState} state={this.state} send_sms={this.props.send_sms} />
                <div className="operationButtons">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            模板设置
                        </div>
                        <div className="titleRight">
                            <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                            <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="buttonInfo">
                            <p>模板设置的功能：创建邮件、短信告警的模板；并提供邮件服务器设置和短信发送统一配置。</p>
                            {createEmailModelBtn}
                            {createSMSModelBtn}
                            {deleteModelBtn}
                        </div>
                    </div>
                </div>
                <div className='operationCreateTableDiv col-md-12'>
                    <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#tab-list" aria-controls="tab-list">模板列表</a></li>
                        <li><a data-toggle="tab" href="#tab-email-config" aria-controls="tab-email-config">邮件服务器设置</a></li>
                        <li><a data-toggle="tab" href="#tab-sms-config" aria-controls="tab-sms-config">短信发送</a></li>
                    </ul>
                    <fieldset className="tab-content narrow">
                        <div className="tab-pane active" id="tab-list">
                            <Templete_list setState={this._setState} state={this.state}
                                Permissions={this.props.Permissions}
                                TempleteList={this.props.TempleteList}
                                get_templete_list={this.props.get_templete_list}
                                delete_templetes={this.props.delete_templetes} />
                        </div>
                        <div className="tab-pane" id="tab-email-config">
                            <Email_config setState={this._setState} state={this.state}
                                Permissions={this.props.Permissions}
                                update_email_server_config={this.props.update_email_server_config} />
                        </div>
                        <div className="tab-pane" id="tab-sms-config">
                            <SMS_config setState={this._setState} state={this.state}
                                Permissions={this.props.Permissions}
                                SmsServerStatus={this.props.SmsServerStatus}
                                activate_sms_server={this.props.activate_sms_server}
                                update_sms_server_config={this.props.update_sms_server_config} />
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    },
    _setState: function(data,callback){
        if(!data) return;
        if(callback) this.setState(data,callback);
        else this.setState(data);
    },
    _handleOnClick: function(e){
        var _this = this;
        var $e = $(e.target);
        var id = $e.attr("id");
        switch(id){
            case "alarmConfigView_createEmailTemplete":
                this.setState({
                    modalType: 0,
                },function(){
                    $("#emailTemplete-title").val("");
                    //$("#emailTemplete-content").val("");
                    $("#emailTemplete-templeteTitle").val("");
                    $("#emailTemplete").modal("show");
                });
            break;
            case "alarmConfigView_createSMSTemplete":
                this.setState({
                    modalType: 0,
                },function(){
                    $("#smsTemplete-title").val("");
                    $("#smsTemplete-content").val("");
                    $("#smsTemplete-templeteTitle").val("");
                    $("#smsTemplete").modal("show");
                });
            break;
            case "alarmConfigView_deleteTemplete":
                var table = $('#TempleteList');
                var selections = table.bootstrapTable('getSelections');
                if(selections.length<=0) return;
                var C = confirm("确认要删除吗？");
                if(C){
                    _this.props.delete_templetes({
                        data: selections,
                        callback: function(resp){
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                                document.getElementById('publicMessageModalcontent').innerHTML = "删除成功";
                                $('#publicMessageModal').modal('show');
                            },100);
                        },
                        error: function(resp){
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                                document.getElementById('publicMessageModalcontent').innerHTML = "删除失败";
                                $('#publicMessageModal').modal('show');
                            },100);
                        },
                    });
                }
            break;
        }
    },
});
$(window).resize(function () {
    if(document.getElementById('templateSet') != null) {
        document.getElementById('templateSet').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = SettingRightView;
