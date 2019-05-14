/**
* Created by Yuchen  2016/01/21.
* 角色与权限管理-头部按钮组
*/

require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var groupButtons = React.createClass({
    mixins: [History],
    render:function(){
        return (
            <div className="operationButtons">
                <div className="systemGroupButtonGroup1 oBGroup">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            系统设置-角色和权限管理
                        </div>
                        <div className="titleRight">
                            <a href=""><i className="fa fa-question-circle"></i></a>
                            <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="col-md-12">
                        <div className="buttonInfo">
                            <p>角色与权限管理的功能：创建、管理组织的角色与权限等。</p>
                            <button id="btn-addRole" data-toggle="modal" data-target="#systemModal-createRole">新增角色</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = groupButtons;
