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

var UserAddView_desView_static = require('./userAddView_desView_static');
var UserAddView_desView_form = require('./userAddView_desView_form');

var UserAddView_desView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTSystemStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_system:flux.store("YFTSystemStore").getState()
    //     }
    // },

    componentDidMount: function() {
        if($('#userAddView_desView') != null) {
            var height = $(window).height() - 110 - 30 + 'px';
            $('#userAddView_desView').css("height",height);
        }
    },

    render:function(){
        const { userInfoChangeFlag, operationFlag, selectedUser, set_selectedUser, roles, edit_user, add_user, setChangePasswordFlag, safeGroups, get_roles,
                setUserInfoChangeFlag, preTwoNode, setPreTwoNode, setCurTwoNode } = this.props;
        return (
            <div id='userAddView_desView' className='overviewDesViewDiv'>
                <UserAddView_desView_static operationFlag={operationFlag} selectedUser={selectedUser} userInfoChangeFlag={userInfoChangeFlag} set_selectedUser={set_selectedUser}
                    roles={roles} edit_user={edit_user} add_user={add_user} setChangePasswordFlag={setChangePasswordFlag}/>
                <div className='operationCreateTableDiv col-md-12'>
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#userAddView_desView_tab_1" data-toggle="tab">用户详情{userInfoChangeFlag?<span style={{"color":"#FF0000"}}>*</span>:""}</a></li>
                    </ul>
                    <fieldset>
                        <div className="contentDiv tab-content marginleft_none">
                            <div className="tab-pane active" id="userAddView_desView_tab_1">
                                <UserAddView_desView_form safeGroups={safeGroups} operationFlag={operationFlag} selectedUser={selectedUser} get_roles={get_roles}
                                    roles={roles} userInfoChangeFlag={userInfoChangeFlag} setUserInfoChangeFlag={setUserInfoChangeFlag} preTwoNode={preTwoNode}
                                    setPreTwoNode={setPreTwoNode} setCurTwoNode={setCurTwoNode}/>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
});

$(window).resize(function () {
    if($('#userAddView_desView') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
        $('#userAddView_desView').css("height",height);
    }
});

UserAddView_desView.propTypes = {
  userInfoChangeFlag: PropTypes.bool.isRequired,
  operationFlag: PropTypes.string.isRequired,
  selectedUser: PropTypes.object,
  set_selectedUser: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  edit_user: PropTypes.func.isRequired,
  add_user: PropTypes.func.isRequired,
  setChangePasswordFlag: PropTypes.func.isRequired,
  safeGroups: PropTypes.array.isRequired,
  get_roles: PropTypes.func.isRequired,
  setUserInfoChangeFlag: PropTypes.func.isRequired,
  preTwoNode: PropTypes.object,
  setPreTwoNode: PropTypes.func.isRequired,
  setCurTwoNode: PropTypes.func.isRequired
}

module.exports = UserAddView_desView;
