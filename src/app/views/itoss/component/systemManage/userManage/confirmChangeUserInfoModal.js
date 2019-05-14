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
var util = require('../../../../../utils/util.js');

var ConfirmChangeUserInfoModal = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    _handleOnClickSave: function() {
        const { roles, edit_user } = this.props;
        $("#confirmChangeUserInfoModal").modal("hide");

        var username = $.trim($("#userAdd_username").val());
        var usernameReg = /^[a-zA-Z0-9]+$/;
        if(username==null||username==""){
            // alert("请填写用户名");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请填写用户名"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        else if(usernameReg.test(username)==false){
            // alert("无效的用户名");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "无效的用户名"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }

        var name = $.trim($("#userAdd_name").val());
        if(name==null||name==""){
            // alert("请填写姓名");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请填写姓名"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        var department = $.trim($("#userAdd_department").val());
        if(department!=""&&department.length>25){
            // alert("部门长度不能大于25");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "部门长度不能大于25"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        var mail = $.trim($("#userAdd_mail").val());
        var mailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(mail==null||mail==""){
            // alert("请填写邮箱");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请填写邮箱"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        else if(mailReg.test(mail)==false){
            // alert("无效的邮箱地址");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "无效的邮箱地址"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        var phone = $.trim($("#userAdd_phone").val());
        var reg=/^\d+$/;
        if(phone==null||phone==""){
            // alert("请填写手机");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请填写手机"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        else if(reg.test(phone)==false) {
            // alert("无效的手机号");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "无效的手机号"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        var telephone = $.trim($("#userAdd_telephone").val());
        if(telephone!=null&&telephone!=""&&reg.test(telephone)==false) {
            // alert("无效的固定电话号码");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "无效的固定电话号码"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }

        var group = document.getElementById("userAdd_group").childNodes[1].innerText;
        if(group==null||group==""){
            // alert("请选择组织机构");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请选择组织机构"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }

        var filter = [
            {key: "LOGIN_ID", value: username},
            {key: "ORANIZATION_NAME", value: document.getElementById("userAdd_group").childNodes[1].innerText},
            {key: "USER_NAME", value: name}
        ];

        var orgRoles = roles;
        var strRoles = "";
        for(var i = 0; i < orgRoles.length; i++) {
            if(document.getElementById("role_"+orgRoles[i]).checked == true) {
                strRoles += (strRoles.length==0?"":",") + orgRoles[i];
            }
        }
        if(strRoles == "") {
            // alert("请选择角色");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请选择角色"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        filter.push({key: "ROLE_NAME", value: strRoles});

        if(department != null && department != "") {
            filter.push({key: "DEPARTMENT", value: department});
        }
        if(mail != null && mail != "") {
            filter.push({key: "EMAIL", value: mail});
        }
        if(phone != null && phone != "") {
            filter.push({key: "PHONE", value: phone});
        }
        if(telephone != null && telephone != "") {
            filter.push({key: "TELEPHONE", value: telephone});
        }

        edit_user(filter);
    },

    _handleOnClickNoSave: function() {
        $("#confirmChangeUserInfoModal").modal("hide");
        this.history.pushState(null,'systemManage/userListPage');
    },

    render : function(){
        return (
            <div className="modal fade" id="confirmChangeUserInfoModal" tabIndex="-1" role="dialog" aria-labelledby="confirmChangeUserInfoModalLabel" aria-hidden="true">
                <div className="modal-dialog fieldSettingModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">确认修改</h5>
                        </div>
                        <div className="modal-body">
                            用户信息已被修改，是否保存？
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickSave}>保存</button>
                            <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickNoSave}>不保存</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

ConfirmChangeUserInfoModal.propTypes = {
    roles: PropTypes.array.isRequired,
    edit_user: PropTypes.func.isRequired
}

module.exports = ConfirmChangeUserInfoModal;
