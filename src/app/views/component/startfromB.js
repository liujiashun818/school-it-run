/**
 *
 */
'use strict';
require('bootstrap');
import React, { PropTypes } from 'react';
var History = require('react-router').History;

var StartFormB = React.createClass({
      getInitialState: function() {
          return {
              // localUser: {}
          };
      },
      componentDidMount: function() {
          if(this.isMounted()){
              var localUser = {};
              // localUser.username = Store.get('localUserName');
              // if(Store.get('localUserPwd') == "" || Store.get('localUserPwd') == undefined){
              //     localUser.password ="";
              // }else{
              //     //localUser.password = Store.get('localUserPwd');
              //     localUser.password = base64.base64decode(decodeURI(Store.get('localUserPwd')));
              // }
              // if(!localUser.username) {
              //     return;
              // };
              // if(Store.get('remember') == "" || Store.get('remember') == undefined){
              //     localUser.remember = 'no';
              // }else{
              //     localUser.remember = Store.get('remember')
              // };
              // // this.setState({localUser: localUser});
              // document.getElementById('usernameInput').value = localUser.username;
              // document.getElementById('passwordInput').value = localUser.password;
              // if(localUser.remember == 'yes'){
              //     document.getElementById('remember').checked = true;
              // }
          }
  	},
    _handleOnKeyDown: function(e) {
        const { onLoginClick } = this.props;
        var keynum;
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
            onLoginClick('react');
        }
    },
    _handleLoginTypeRap:function(){
      const { onLoginClick } = this.props;
      onLoginClick('rap');
      $('#loginModel').modal('show');
    },
    _handleLoginTypeReact:function(){
      const { onLoginClick } = this.props;
      onLoginClick('react');
      $('#loginModel').modal('show');
    },
    render : function(){
      const { loginType } = this.props;
      return(
        <div className="main-login" tabIndex="-1"  onKeyDown={this._handleOnKeyDown}>
            <div className="loginStyle ">
                  <img className="login-logo1" src="./img/login/badge.png"/>
                  <img className="login-logo2" src="./img/login/character.png"/>
            </div>
            <div className="start-content">
                <form action="" method="post" id="start-formB" name="login-form">
                  <div className="login-item">
                    <div className="spanContainer">
                      <span className="spanDes">&nbsp;1.x版本，使用传统成熟的Eclipse界面技术</span>
                    </div>
                    <div className="start-inrap">
                        <a className="start-btn" onClick={this._handleLoginTypeRap}>
                          <img src="./img/login/raplogin.png" style={{width:"146px", height:"180px"}}/>
                        </a>
                    </div>
                  </div>
                  <div className="login-item">
                    <div className="spanContainer">
                      <span className="spanDes">&nbsp;2.x版本，基本最新的HTML5和JavaScrip技术(火热开发中)<br />同一个后台，不同的界面</span>
                    </div>
                    <div className="start-inrap">
                      <a className="start-btn" onClick={this._handleLoginTypeReact}>
                        <img src="./img/login/reactlogin.png" style={{width:"146px", height:"180px"}}/>
                      </a>
                    </div>
                  </div>
                </form>
            </div>
        </div>
      );
    }
});

module.exports = StartFormB;
