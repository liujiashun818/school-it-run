// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ChangePasswordModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTSystemStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_system:flux.store("YFTSystemStore").getState()
    //     }
    // },

    getInitialState: function() {
        return {
        };
    },

    componentDidMount: function() {
        var _this = this;
        $('#changePasswordModal').on('show.bs.modal', function () {
            document.getElementById("changePassword_userName").value = _this.props.selectedUser.LOGIN_ID;
            document.getElementById("changePassword_newPassword").value = "";
            document.getElementById("changePassword_confirmNewPassword").value = "";
        });
    },

    _handleOnClickConfirm: function() {
        const { changePasswordFlag, selectedUser, changePassword } = this.props;
        var newPassword = $("#changePassword_newPassword").val();
        if(newPassword==null||newPassword==""){
            // alert("请填写新密码");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请填写新密码"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        else if(newPassword.length < 6 || newPassword.length > 18){
            // alert("长度为6-18任意组合的密码");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "长度为6-18任意组合的密码"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        };
        var confirmNewPassword = $("#changePassword_confirmNewPassword").val();
        if(confirmNewPassword==null||confirmNewPassword==""){
            // alert("请填写确认新密码");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请填写确认新密码"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        else if(confirmNewPassword.length < 6 || confirmNewPassword.length > 18){
            // alert("长度为6-18任意组合的密码");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "长度为6-18任意组合的密码"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        else if(confirmNewPassword != newPassword){
            // alert("两次密码不一致");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "两次密码不一致"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        };

        var params = [
            {key: "LOGIN_ID", value: changePasswordFlag=="change"?"":selectedUser.LOGIN_ID},
            {key: "NEW_PWD", value: newPassword},
            {key: "SURE_NEW_PWD", value: confirmNewPassword}
        ];
        changePassword(params);
    },

    render : function(){
        return (
            <div className="modal fade" id="changePasswordModal" tabIndex="-1" role="dialog" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
                <div className="modal-dialog fieldSettingModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">{this.props.changePasswordFlag=="change"?"修改密码":"重置密码"}</h5>
                        </div>
                        <div className="modal-body createGroupDetailDiv userAddView_desView_form">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="col-md-3">用户名</td>
                                        <td className="col-md-9"><input type="text" id="changePassword_userName" disabled={true}/></td>
                                    </tr>
                                    <tr>
                                        <td className="col-md-3">新密码</td>
                                        <td className="col-md-9"><input type="password" id="changePassword_newPassword"/></td>
                                    </tr>
                                    <tr>
                                        <td className="col-md-3">确认新密码</td>
                                        <td className="col-md-9"><input type="password" id="changePassword_confirmNewPassword"/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickConfirm}>确定</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

ChangePasswordModal.propTypes = {
  selectedUser: PropTypes.object,
  changePasswordFlag: PropTypes.string.isRequired,
  changePassword: PropTypes.func.isRequired
}

module.exports = ChangePasswordModal;
