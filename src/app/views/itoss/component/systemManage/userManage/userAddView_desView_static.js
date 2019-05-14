require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var base64 = require('../../../../../utils/base64');

var UserAddView_desView_static = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_system:flux.store("YFTSystemStore").getState()
    //     }
    // },

    getInitialState: function() {
        return {
            title: "",
            description: ""
        }
    },

    componentDidMount:function(){
        const { operationFlag, selectedUser } = this.props;
        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        var bShowEdit = false;
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/systemmanage/userlist/update") {
                bShowEdit = true;
            }
        }

        if(operationFlag != "add") {
            this.setState({title: "编辑用户"});
            this.setState({description: "编辑用户的主要功能：修改用户信息"});
            if(bShowEdit) {
                if(operationFlag == "show") {
                    $("#userAddview_editBtn").show();
                    $("#userAddview_saveBtn").hide();
                }
                else if(operationFlag == "edit") {
                    $("#userAddview_editBtn").hide();
                    $("#userAddview_saveBtn").show();
                }
            }
            else {
                $("#userAddview_editBtn").hide();
                $("#userAddview_saveBtn").hide();
            }

            if(localStorage.getItem('localUserName') == selectedUser.LOGIN_ID) {
                $("#userAddview_changePasswordBtn").show();
            }
            else {
                $("#userAddview_changePasswordBtn").hide();
            }
            if(localStorage.getItem('localUserName') == "admin" && localStorage.getItem('localUserName') != selectedUser.LOGIN_ID) {
                $("#userAddview_resetPasswordBtn").show();
            }
            else {
                $("#userAddview_resetPasswordBtn").hide();
            }
        }
        else {
            this.setState({title: "新建用户"});
            this.setState({description: "新建用户的主要功能：创建用户，并分配角色以及组织机构"});
            $("#userAddview_editBtn").hide();
            $("#userAddview_saveBtn").show();
            $("#userAddview_changePasswordBtn").hide();
            $("#userAddview_resetPasswordBtn").hide();
        }
    },

    _handleOnClickBack: function() {
        const { operationFlag, userInfoChangeFlag } = this.props;
        if(operationFlag != "add" && userInfoChangeFlag) {
            $("#confirmChangeUserInfoModal").modal("show");
        }
        else {
            this.history.pushState(null,'systemManage/userListPage');
        }
    },

    _handleOnClickEdit: function() {
        const { selectedUser, set_selectedUser } = this.props;
        if(selectedUser.LOGIN_ID == "admin") {
            // alert("不能编辑管理员admin用户");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "不能编辑管理员admin用户"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        else if(selectedUser.LOGIN_ID == localStorage.getItem("localUserName")) {
            // alert("不能编辑当前登陆用户");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "不能编辑当前登陆用户"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        set_selectedUser({user:selectedUser, flag:"edit"});
        $("#userAddview_editBtn").hide();
        $("#userAddview_saveBtn").show();
    },

    _handleOnClickSave: function() {
        const { operationFlag, roles, edit_user, add_user } = this.props
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
        var password, confirmPassword;
        if(operationFlag == "add") {
            password = $("#userAdd_password").val();
            if(password==null||password==""){
                // alert("请填写密码");
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "请填写密码"
                    $('#publicMessageModal').modal('show');
                },100);
                return false;
            }
            else if(password.length < 6 || password.length > 18){
                // alert("长度为6-18任意组合的密码");
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "长度为6-18任意组合的密码"
                    $('#publicMessageModal').modal('show');
                },100);
                return false;
            }
            confirmPassword = $("#userAdd_confirmPassword").val();
            if(confirmPassword==null||confirmPassword==""){
                // alert("请填写确认密码");
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "请填写确认密码"
                    $('#publicMessageModal').modal('show');
                },100);
                return false;
            }
            else if(confirmPassword.length < 6 || confirmPassword.length > 18){
                // alert("长度为6-18任意组合的密码");
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "长度为6-18任意组合的密码"
                    $('#publicMessageModal').modal('show');
                },100);
                return false;
            }
            else if(confirmPassword != password){
                // alert("两次密码不一致");
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "两次密码不一致"
                    $('#publicMessageModal').modal('show');
                },100);
                return false;
            }
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

        if(operationFlag == "add") {
            filter.push({key: "LOGIN_PWD", value: password});
        }

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

        if(operationFlag != "add") {
            edit_user(filter);
        }
        else {
            add_user(filter);
        }
    },

    _handleOnClickChangePassword: function() {
        this.props.setChangePasswordFlag("change");
        $("#changePasswordModal").modal("show");
    },

    _handleOnClickResetPassword: function() {
        this.props.setChangePasswordFlag("reset");
        $("#changePasswordModal").modal("show");
    },
    render:function(){
        return (
            <div className="operationButtons">
                <div className="systemGroupButtonGroup1 oBGroup">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            {this.state.title}
                        </div>
                        <div className="titleRight">
                            <a className="backSpaceText" onClick={this._handleOnClickBack}>返回用户管理列表</a>
                            <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="buttonInfo">
                            <p>{this.state.description}</p>
                            <button id="userAddview_editBtn" className="btn" onClick={this._handleOnClickEdit}>编辑</button>
                            <button id="userAddview_saveBtn" className="btn" onClick={this._handleOnClickSave}>保存</button>
                            <button id="userAddview_changePasswordBtn" className="btn" onClick={this._handleOnClickChangePassword}>修改密码</button>
                            <button id="userAddview_resetPasswordBtn" className="btn" onClick={this._handleOnClickResetPassword}>重置密码</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

UserAddView_desView_static.propTypes = {
    operationFlag: PropTypes.string.isRequired,
    selectedUser: PropTypes.object,
    userInfoChangeFlag: PropTypes.bool.isRequired,
    set_selectedUser: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    edit_user: PropTypes.func.isRequired,
    add_user: PropTypes.func.isRequired,
    setChangePasswordFlag: PropTypes.func.isRequired
}

module.exports = UserAddView_desView_static;
