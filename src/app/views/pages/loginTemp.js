'use strict';
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
var LoginForm2Temp = require('../component/loginfrom2Temp.js');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
// import { setErrorMsg, getToken, getSelectedRolePermission } from '../../actions/login_action'
import * as loginActions from '../../actions/login_action'

//调用样式
//require('../../../public/css/login.css');
var SelectRoleModal = require('../itoss/component/selectRoleModal');

var Store = require('../../server/store');
var base64 = require('../../utils/base64.js');

var loginPageTemp = React.createClass({
    // mixins: [History, FluxMixin],
    componentDidMount: function() {
        // if(document.getElementById('loginPageTemp') != null) {
        //     document.getElementById('loginPageTemp').style.height = $(window).height() + 'px';
        // };
    },

    handleComfirmOnClick: function() {
        const { dispatch } = this.props
        // this.getFlux().actions.LoginActions.get_SelectedRolePermission();
        dispatch(loginActions.getSelectedRolePermission());
    },

    handleCancelOnClick: function() {
        const { dispatch } = this.props
        //注销登录用户
        var token = Store.get("token");
        var serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            Store.set("token","");
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"Logout?token="+token;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: false,
                url:rquestUri,
                dataType: "json",
                success : function(result){
                },error : function(result){
                    //console.log(result.responseText);
                }
            });
        }
        window.location.href="#";
        // this.getFlux().actions.LoginActions.setErrorMsg("");
        dispatch(loginActions.setErrorMsg(""));
        // window.location.reload();
    },

    handleLoginOnClick: function(e) {
        e.preventDefault();
        const { dispatch } = this.props

        var loginid = document.getElementById('usernameInput').value;
        loginid = loginid.toLowerCase();//转成小写字符
        var user = {};
        user.username = loginid;
        user.password = document.getElementById('passwordInput').value;
        user.password = base64.base64encode(encodeURI(user.password));
        //		console.log(user);
        //var loginActions=this.getFlux().actions.LoginActions;
        // var loginActions=this.props.flux.actions.LoginActions;
        if(!user.username || !user.password){
            var msg = '请输入用户名和密码。';
            // loginActions.setErrorMsg(msg);
            dispatch(loginActions.setErrorMsg(msg));
            return;
        }
        // this.props.flux.actions.NavbarActions.init_navbarData();//清除单菜单原有数据
        // loginActions.get_Token(user);//获取token
        dispatch(loginActions.getToken(user));
        if(document.getElementById('remember').checked) {
            Store.set('localUserPwd', user.password);
            Store.set('remember', 'yes');
        }else{
            Store.set('localUserPwd', "");
            Store.set('remember', 'no');
        };
        Store.set('localUserName', user.username);
    },

    render : function(){
        const { errorMsg } = this.props;
        return(
            <div id="loginPageTemp">
                <LoginForm2Temp onLoginClick={e => this.handleLoginOnClick(e)} errorMsg={errorMsg}/>
            </div>
        );
    }
});

// $(window).resize(function () {
//     if(document.getElementById('loginPageTemp') != null) {
//         document.getElementById('loginPageTemp').style.height = $(window).height()+ 'px';
//     }
// });

loginPageTemp.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { errorMsg } = state.loginReducer

  return {
    errorMsg
  }
}

export default connect(mapStateToProps)(loginPageTemp)
