/**
 * Created by Yuchen on 2016/03/15.
 * 模板设置-短信设置tab
 */
var React = require('react');
var util = require('../../../../../utils/util.js');
require('bootstrap');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');

var SMSConfig = React.createClass({
    mixins: [History],
    getInitialState: function () {
        return {
            origin: {
                default_gateway: "modem.com1",
                default_serialPort: "COM1",
                default_baudRate: "9600",
                default_manufacturer: "wavecom",
                default_model: "17254",
            }
        }
    },
    componentWillMount: function() {

    },
    componentDidMount: function() {

    },
    render: function() {
        var valid_edit = util.hasPermission(this.props.Permissions,"/equipmentmanage/alarm/templateset/edit");
        var stateBtn = ((this.props.SmsServerStatus||valid_edit==null)?"":(<button id="smsConfig_switchOn" className="btn btnSave" style={{marginRight: '8px'}} onClick={this._handleOnClick}>开启短信服务</button>));
        var applyBtn = valid_edit!=null?(<button id="smsConfig_apply" className="btn btnSave" style={{marginRight: '8px'}} onClick={this._handleOnClick}>应用</button>):"";
        var resetBtn = valid_edit!=null?(<button id="smsConfig_reset" className="btn btnSave" style={{marginRight: '8px'}} onClick={this._handleOnClick}>重新获得</button>):"";
        return (
            <div className="createGroupDetailDiv userAddView_desView_form addAlarmRule_form">
                <input id="smsServerConfigId" type="hidden" />
                <table className="normal-table">
                    <tbody>
                        <tr>
                            <td className="col-md-1">网关ID</td>
                            <td className="col-md-11 no-padding inline-input">
                                <input id="gateway" tabIndex="1" type="text" defaultValue={this.state.origin.default_gateway} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1">串口名称</td>
                            <td className="col-md-11 no-padding inline-input">
                                <input id="serialPort" tabIndex="2" type="text" defaultValue={this.state.origin.default_serialPort} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1">波特率</td>
                            <td className="col-md-11 no-padding inline-input">
                                <input id="baudRate" tabIndex="3" type="number" defaultValue={parseInt(this.state.origin.default_baudRate,10)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1">制造商</td>
                            <td className="col-md-11 no-padding inline-input">
                                <input id="manufacturer" tabIndex="4" type="text" defaultValue={this.state.origin.default_manufacturer} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1">型号</td>
                            <td className="col-md-11 no-padding inline-input">
                                <input id="model" tabIndex="5" type="text" defaultValue={this.state.origin.default_model} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="operationButtons tabBottomButtons">
                    <div className="col-md-12 pad-no">
                        <div className="buttonInfo">
                            {stateBtn}
                            {applyBtn}
                            {resetBtn}
                            <button id="smsConfig_test" className="btn btnSave" onClick={this._handleOnClick}>测试</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _handleOnClick: function(e){
        var $e = $(e.target);
        var id = $e.attr("id");
        var _this = this;
        switch(id){
            case "smsConfig_switchOn":
                $e.attr("disabled","disabled");
                this.props.activate_sms_server({
                    callback: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                            document.getElementById('publicMessageModalcontent').innerHTML = "短信服务开启成功";
                            $('#publicMessageModal').modal('show');
                        },100);
                        _this.forceUpdate();
                    },
                    error: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                            document.getElementById('publicMessageModalcontent').innerHTML = resp;
                            $('#publicMessageModal').modal('show');
                        },100);
                        $e.removeAttr("disabled");
                    },
                });
                break;
            case "smsConfig_apply":
                var data = {};
                data.SMSType = "send";
                data.SMSUserName = $("#gateway").val();
                data.SMSPwd = $("#serialPort").val();
                data.SMSLength = parseInt($("#baudRate").val(),10);
                data.TaskPlanType = $("#manufacturer").val();
                data.MouldId = $("#model").val();
                data.RecId = $("#smsServerConfigId").val();
                this.props.update_sms_server_config({
                    data: data,
                    callback: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "短信服务器配置";
                            document.getElementById('publicMessageModalcontent').innerHTML = "设置成功";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                    error: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "短信服务器配置";
                            document.getElementById('publicMessageModalcontent').innerHTML = "设置失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                });
                break;
            case "smsConfig_reset":
                $("#gateway").val(this.state.origin.default_gateway);
                $("#serialPort").val(this.state.origin.default_serialPort);
                $("#baudRate").val(this.state.origin.default_baudRate);
                $("#manufacturer").val(this.state.origin.default_manufacturer);
                $("#model").val(this.state.origin.default_model);
                break;
            case "smsConfig_test":
                if(!this.props.SmsServerStatus){
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "测试";
                        document.getElementById('publicMessageModalcontent').innerHTML = "短信服务未开启，请先开启短信服务";
                        $('#publicMessageModal').modal('show');
                    },100);
                }
                else{
                    $("#smsTest-receivers").val("");
                    $("#smsTest-content").val("");
                    $("#smsTest").modal("show");
                }
                break;
        }
    },
});

module.exports = SMSConfig;
