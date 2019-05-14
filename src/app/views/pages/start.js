'use strict';

import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
import { connect } from 'react-redux'
import * as loginActions from '../../actions/login_action'

var StartForm = require('../component/startfrom.js');
// var StartFormB = require('../component/startfromB.js');
var LoginModel = require('./loginModel.js');

var startPage = React.createClass({
    componentDidMount: function() {
        if(document.getElementById('loginStartPage') != null) {
            document.getElementById('loginStartPage').style.height = $(window).height() + 'px';
        };
    },
    handleLoginOnClick: function(value) {
        //e.preventDefault();
        const { dispatch } = this.props;
        dispatch(loginActions.setLoginType(value));
    },
    render : function(){
        const { loginType } = this.props;
        return(
            <div id="loginStartPage" className="loginPage">
                <LoginModel />
                {/*<StartFormB onLoginClick={e => this.handleLoginOnClick(e)} loginType={loginType}/>*/}
                <StartForm onLoginClick={e => this.handleLoginOnClick(e)} loginType={loginType}/>
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('loginStartPage') != null) {
        document.getElementById('loginStartPage').style.height = $(window).height()+ 'px';
    }
});

startPage.propTypes = {
  loginType: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { loginType } = state.loginReducer

  return {
    loginType
  }
}

export default connect(mapStateToProps)(startPage)
