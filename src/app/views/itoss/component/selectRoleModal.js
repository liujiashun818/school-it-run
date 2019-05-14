/**
 * 登录页-选择角色
 */
// var React = require('react');
import React, { PropTypes } from 'react';
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var Store = require('../../../server/store');

var SelectRoleModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("LoginPageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         logininfo:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },
    getInitialState: function() {
        return {
            activeMenu: "",
            roles: [],
            rolestemp:""
        };
    },

    componentDidMount: function() {
        var _this = this;
        // if(localStorage.getItem("roles") != null) {
        //     _this.setState({activeMenu: localStorage.getItem("roles").split(",")[0]});
        //     localStorage.setItem("CURRENT_ROLENAME", localStorage.getItem("roles").split(",")[0]);
        //     $('#selectRoleModal').on('show.bs.modal', function (e) {
        //         _this.setState({roles: localStorage.getItem("roles").split(",")});
        //     })
        // }

        $('#selectRoleModal').on('show.bs.modal', function (e) {
              if(localStorage.getItem("roles") != undefined && localStorage.getItem("roles") != "" && _this.state.rolestemp !=  localStorage.getItem("roles")){
                  _this.setState({activeMenu: localStorage.getItem("roles").split(",")[0]});
                  localStorage.setItem("CURRENT_ROLENAME", localStorage.getItem("roles").split(",")[0]);
                  _this.setState({roles: localStorage.getItem("roles").split(",")});
              }
          })
    },

    _handleOnClick: function(e) {
        for(var i = 0; i < this.state.roles.length; i++) {
            if(e.currentTarget.id == 'role_'+this.state.roles[i]) {
                this.setState({activeMenu: this.state.roles[i]});
                localStorage.setItem("CURRENT_ROLENAME", this.state.roles[i]);
                break;
            }
        }
    },
    // _handleOnClickOK: function() {
    //     this.getFlux().actions.LoginActions.get_SelectedRolePermission();
    // },
    // _handleOnClickCancel:function(){
    //   //注销登录用户
    //   var token = Store.get("token");
    //   var serviceAddress = Store.get("serviceUrl");
    //   if(token != '') {
    //       Store.set("token","");
    //       //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
    //       var rquestUri = serviceAddress+"Logout?token="+token;
    //       //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
    //       rquestUri = encodeURI(rquestUri);
    //       $.ajax({
    //           type: "get",
    //           async: false,
    //           url:rquestUri,
    //           dataType: "json",
    //           success : function(result){
    //           },error : function(result){
    //               //console.log(result.responseText);
    //           }
    //       });
    //   }
    //   window.location.href="#";
    //   this.getFlux().actions.LoginActions.setErrorMsg("");
    //   // window.location.reload();
    // },
    _handleOnKeyDown: function(e) {
        const { onComfirmClick, onCancelClick } = this.props;
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
            // this._handleOnClickOK();
            onComfirmClick();
        }
        else if(keynum == 27) {
            $('#selectRoleModal').modal('hide');
            // this._handleOnClickCancel();
            onCancelClick();
        }
        else if(keynum == 38) {
            // console.log("up");
            for(var i = 0; i < this.state.roles.length; i++) {
                if(this.state.activeMenu ==  this.state.roles[i]) {
                    if(i != 0) {
                        this.setState({activeMenu: this.state.roles[i-1]});
                        localStorage.setItem("CURRENT_ROLENAME", this.state.roles[i-1]);
                        break;
                    }
                    else {
                        this.setState({activeMenu: this.state.roles[this.state.roles.length-1]});
                        localStorage.setItem("CURRENT_ROLENAME", this.state.roles[this.state.roles.length-1]);
                        break;
                    }
                }
            }
        }
        else if(keynum == 40) {
            // console.log("down");
            for(var i = 0; i < this.state.roles.length; i++) {
                if(this.state.activeMenu ==  this.state.roles[i]) {
                    if(i != this.state.roles.length-1) {
                        this.setState({activeMenu: this.state.roles[i+1]});
                        localStorage.setItem("CURRENT_ROLENAME", this.state.roles[i+1]);
                        break;
                    }
                    else {
                        this.setState({activeMenu: this.state.roles[0]});
                        localStorage.setItem("CURRENT_ROLENAME", this.state.roles[0]);
                        break;
                    }
                }
            }
        }
    },

    render : function(){
        const { onComfirmClick, onCancelClick } = this.props;
        var _this = this;
        return (
            <div className="modal fade" id="selectRoleModal" tabIndex="-1" role="dialog" aria-labelledby="selectRoleModalLabel" aria-hidden="true" onKeyDown={this._handleOnKeyDown}>
                <div className="modal-dialog selectRoleModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">选择角色</h5>
                        </div>
                        <div className="modal-body">
                            <div className="roleList">
                                <div className="list-group">
                                    {_this.state.roles.map(function(role) {
                                        return (
                                            <a className={"list-group-item" + (_this.state.activeMenu == role ? ' active' : '')} onClick={_this._handleOnClick} id={"role_"+role}>{role}</a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={onComfirmClick}>确定</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={onCancelClick}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

SelectRoleModal.propTypes = {
  onComfirmClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired
};

module.exports = SelectRoleModal;
