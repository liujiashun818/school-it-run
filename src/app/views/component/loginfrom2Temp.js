/**
 * 登录页
 */
'use strict';
require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react';
var History = require('react-router').History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Store = require('../../server/store');
var base64 = require('../../utils/base64.js');
//调用样式
//require('../../../public/css/login.css');

 // const {Surface} = require("gl-react-dom");
 // var HelloGL = require("./test");

var LoginForm2Temp = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("LoginPageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     // var flux = this.props.flux;
    //     return flux.store("LoginPageStore").getState();
    // },
    getInitialState: function() {
        return {
            // localUser: {}
        };
    },
    componentDidMount: function() {
        //测试用/////////////////
        //this.history.pushState(null,'equipmentManage/alarmConfigPage/${"yinxue"}');
        // Store.set("serviceUrl","");
        // Store.set("tokenUrl","");
        // Store.set("mapUrl","");
        // Store.set("servletServiceUrl","");
        //this.props.flux.actions.LoginActions.set_BackdePartmentInfor();
        ////////////////////////////
        if(this.isMounted()){
            var localUser = {};
            localUser.username = Store.get('localUserName');
            if(Store.get('localUserPwd') == "" || Store.get('localUserPwd') == undefined){
                localUser.password ="";
            }else{
                //localUser.password = Store.get('localUserPwd');
                localUser.password = base64.base64decode(decodeURI(Store.get('localUserPwd')));
            }
            if(!localUser.username) {
                return;
            };
            if(Store.get('remember') == "" || Store.get('remember') == undefined){
                localUser.remember = 'no';
            }else{
                localUser.remember = Store.get('remember')
            };
            // this.setState({localUser: localUser});
            document.getElementById('usernameInput').value = localUser.username;
            document.getElementById('passwordInput').value = localUser.password;
            if(localUser.remember == 'yes'){
                document.getElementById('remember').checked = true;
            }
        }
	},

    _handleOnClick: function() {
        if(document.getElementById('showPassword').className == 'fa fa-eye-slash') {
            document.getElementById('showPassword').className = 'fa fa-eye';
            document.getElementById('passwordInput').type = 'text';
        }
        else {
            document.getElementById('showPassword').className = 'fa fa-eye-slash';
            document.getElementById('passwordInput').type = 'password';
        }
    },
    // _handleLoginOnClick: function(e) {
    //     e.preventDefault();
    //     this.setState({loginUser:{} });
    //     var loginid = document.getElementById('usernameInput').value;
    //     loginid = loginid.toLowerCase();//转成小写字符
    //     var user = {};
    //     user.username = loginid;
    //     user.password = document.getElementById('passwordInput').value;
    //     user.password = base64.base64encode(encodeURI(user.password));
    //     //		console.log(user);
    //     //var loginActions=this.getFlux().actions.LoginActions;
    //     var loginActions=this.props.flux.actions.LoginActions;
    //     if(!user.username || !user.password){
    //         var msg = '请输入用户名和密码。'
    //         loginActions.setErrorMsg(msg);
    //         return;
    //     }
    //     this.props.flux.actions.NavbarActions.init_navbarData();//清除菜单原有数据
    //     loginActions.get_Token(user);//获取token
    //     if(document.getElementById('remember').checked) {
    //         Store.set('localUserPwd', user.password);
    //         Store.set('remember', 'yes');
    //     }else{
    //         Store.set('localUserPwd', "");
    //         Store.set('remember', 'no');
    //     };
    //     Store.set('localUserName', user.username);
    // },
    _handleOnKeyDown: function(e) {
        const { onLoginClick } = this.props;
        var keynum

        if(window.event) // IE
        {
            keynum = e.keyCode
        }
        else if(e.which) // Netscape/Firefox/Opera
        {
            keynum = e.which
        }

        if(keynum == 13) {
            // this._handleLoginOnClick(e);
            onLoginClick(e);
        }
    },
  render : function(){
      const { onLoginClick, errorMsg } = this.props;
    //   return(
    //       <Surface width={300} height={200}>
    //         <HelloGL/>
    //       </Surface>
    //   );
    return(
      <div className="main-login" tabIndex="-1"  onKeyDown={this._handleOnKeyDown}>
          <div className="login-contentb">
              <div className="login-title">
                用户登录
              </div>
              <span className="errorMsg"><h5>{errorMsg}</h5></span>
              <form action="" method="post" id="login-form" name="login-form">
                  <div className="login-info">
                      <span className="user">&nbsp;</span>
                      <input name="username" id="usernameInput" type="text" className="login-input" placeholder="请输入用户名"/>
                  </div>
                  <div className="login-info login-top">
                      <span className="pwd">&nbsp;</span>
                      <input name="password" id="passwordInput" type="password" className="login-input" placeholder="请输入密码"/>
                      <span className="eyePosition" onClick={this._handleOnClick}><i id="showPassword" className="fa fa-eye-slash"></i></span>
                  </div>
                  <div className=" login-oper piaochecked on_check">
                      <input id="remember" name="need_inv" type="checkbox" className="radioclass input"/>
                      <label>记住密码</label>
                  </div>
                  <div className="login-in-temp">
                      <input name="" type="submit" value="登 录" className="start-btn-temp" onClick={onLoginClick}/>
                  </div>
              </form>
          </div>
      </div>
    );
  }
});

LoginForm2Temp.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired
};

module.exports = LoginForm2Temp;
