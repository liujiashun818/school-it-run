var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
import LoginPage from './loginTemp'; //登录页

var loginModal = React.createClass({
  render:function(){
    return (
      <div className="modal fade" id="loginModel" tabIndex="-1" role="dialog" aria-labelledby="loginModelLabel" aria-hidden="true">
        <div className="modal-dialog loginSettingModalDialog">
          <div className="modal-content">
            <div className="modal-body">
              <LoginPage />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = loginModal;
