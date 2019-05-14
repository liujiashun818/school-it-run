/**
* xuexue.yin  2016/03/18.
* 拓扑导航-外网地址 选择角色窗口
*/
import React from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

var TopologSelectRoleNetModal = React.createClass({
    mixins: [History],//, FluxMixin, StoreWatchMixin("YFTTopologyNavStore")
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         nav:flux.store("YFTTopologyNavStore").getState()
    //     }
    // },
    getInitialState: function() {
        return {
            activeMenu: "",
            roles: [],
            rolestemp:""
        };
    },
    componentWillUpdate:function(){
      var _this = this;

      if(localStorage.getItem("roles_topolog") != undefined && localStorage.getItem("roles_topolog") != "") {
          $('#topologSelectRoleNetModal').on('show.bs.modal', function (e) {
              if(_this.state.rolestemp !=  localStorage.getItem("roles_topolog")){
                _this.setState({activeMenu: localStorage.getItem("roles_topolog").split(",")[0]});
                localStorage.setItem("CURRENT_ROLENAME_topolog", localStorage.getItem("roles_topolog").split(",")[0]);
                _this.setState({roles: localStorage.getItem("roles_topolog").split(",")});
              }
          })
      }
    },
    _handleOnClick: function(e) {
        for(var i = 0; i < this.state.roles.length; i++) {
            if(e.currentTarget.id == 'role_'+this.state.roles[i]) {
                this.setState({activeMenu: this.state.roles[i]});
                localStorage.setItem("CURRENT_ROLENAME_topolog", this.state.roles[i]);
                break;
            }
        }
    },
    _handleOnClickOK: function() {
        // var url = "http://" + this.state.nav.nodePoint.IN_HOST;
        // var token = this.state.nav.nodeToken;
        // var role = localStorage.getItem("CURRENT_ROLENAME_topolog");
        // var href = url + '/yft/index.html#/cityIndex';
        // window.location.href = href + "/" + token + "/" + this.state.nav.nodePoint.USER +"/" + role;

        var url = "http://" + this.props.nodePoint.IN_HOST;
        var token = this.props.nodeToken;
        var role = localStorage.getItem("CURRENT_ROLENAME_topolog");
        var href = url + '/yft/index.html#/cityIndex';
        window.location.href = href + "/" + token + "/" + this.props.nodePoint.USER +"/" + role;
        //window.location.reload();//刷新当前页面(不能用)
    },
    _handleOnClickCancel:function(){
      //注销登录用户
      // var token = this.state.nav.nodeToken;
      // var host = this.state.nav.nodePoint.IN_HOST;
      // this.getFlux().actions.YFTTopologyNavActions.onSetInitNodeToken();
      var token = this.props.nodeToken;
      var host = this.props.nodePoint.HOST;
      this.props.onSetInitNodeToken('');
      var serviceAddress = "http://" + host +"/bods.svc/";
      if(token != '') {
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
                 console.log(result);
              }
          });
      };
    },
    _handleOnKeyDown: function(e) {
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
            this._handleOnClickOK();
        }
        else if(keynum == 27) {
            $('#topologSelectRoleNetModal').modal('hide');
            this._handleOnClickCancel();
        }
        else if(keynum == 38) {
            // console.log("up");
            for(var i = 0; i < this.state.roles.length; i++) {
                if(this.state.activeMenu ==  this.state.roles[i]) {
                    if(i != 0) {
                        this.setState({activeMenu: this.state.roles[i-1]});
                        localStorage.setItem("CURRENT_ROLENAME_topolog", this.state.roles[i-1]);
                        break;
                    }
                    else {
                        this.setState({activeMenu: this.state.roles[this.state.roles.length-1]});
                        localStorage.setItem("CURRENT_ROLENAME_topolog", this.state.roles[this.state.roles.length-1]);
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
                        localStorage.setItem("CURRENT_ROLENAME_topolog", this.state.roles[i+1]);
                        break;
                    }
                    else {
                        this.setState({activeMenu: this.state.roles[0]});
                        localStorage.setItem("CURRENT_ROLENAME_topolog", this.state.roles[0]);
                        break;
                    }
                }
            }
        }
    },

    render : function(){
        var _this = this;
        return (
            <div className="modal fade" id="topologSelectRoleNetModal" tabIndex="-1" role="dialog" aria-labelledby="topologSelectRoleNetModalLabel" aria-hidden="true" onKeyDown={this._handleOnKeyDown}>
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
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK}>确定</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickCancel}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TopologSelectRoleNetModal;
