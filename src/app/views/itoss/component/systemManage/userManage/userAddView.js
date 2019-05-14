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
import { connect } from 'react-redux'
import * as systemActions from '../../../../../actions/system_action'
import * as navbarActions from '../../../../../actions/navbar_action'

var UserAddView_desView = require('./userAddView_desView');
var ChangePasswordModal = require('./changePasswordModal');
var ConfirmChangeUserInfoModal = require('./confirmChangeUserInfoModal');

var UserAddView = React.createClass({
  // mixins: [History, FluxMixin, StoreWatchMixin("YFTSystemStore")],
  // getStateFromFlux: function() {
  //     var flux = this.getFlux();
  //     return {
  //         itoss_system:flux.store("YFTSystemStore").getState()
  //     }
  // },

  componentWillMount: function() {
      const { dispatch } = this.props;
      dispatch(systemActions.get_safeGroups());
  },

  render:function(){
      const { dispatch, userInfoChangeFlag, operationFlag, selectedUser, roles, safeGroups, preTwoNode, changePasswordFlag } = this.props;
      return (
          <div id='userAddView' className='overviewDiv'>
            <ChangePasswordModal selectedUser={selectedUser} changePasswordFlag={changePasswordFlag} changePassword={code=>dispatch(systemActions.changePassword(code))}/>
            <ConfirmChangeUserInfoModal roles={roles} edit_user={filter=>dispatch(systemActions.edit_user(filter))}/>
            <UserAddView_desView userInfoChangeFlag={userInfoChangeFlag} operationFlag={operationFlag} selectedUser={selectedUser} roles={roles} safeGroups={safeGroups} preTwoNode={preTwoNode}
                set_selectedUser={params=>dispatch(systemActions.set_selectedUser(params))} edit_user={filter=>dispatch(systemActions.edit_user(filter))}
                add_user={filter=>dispatch(systemActions.add_user(filter))} setChangePasswordFlag={changePasswordFlag=>dispatch(systemActions.setChangePasswordFlag(changePasswordFlag))}
                get_roles={organizationName=>dispatch(systemActions.get_roles(organizationName))} setUserInfoChangeFlag={userInfoChangeFlag=>dispatch(systemActions.setUserInfoChangeFlag(userInfoChangeFlag))}
                setPreTwoNode={param=>dispatch(navbarActions.setPreTwoNode(param))} setCurTwoNode={param=>dispatch(navbarActions.setCurTwoNode(param))}/>
          </div>
      );
  }
});

// module.exports = UserAddView;
UserAddView.propTypes = {
    userInfoChangeFlag: PropTypes.bool.isRequired,
    operationFlag: PropTypes.string.isRequired,
    selectedUser: PropTypes.object,
    roles: PropTypes.array.isRequired,
    safeGroups: PropTypes.array.isRequired,
    preTwoNode: PropTypes.object,
    changePasswordFlag: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { userInfoChangeFlag, operationFlag, selectedUser, roles, safeGroups, changePasswordFlag } = state.systemReducer
  const { preTwoNode } = state.navbarReducer

  return {
      userInfoChangeFlag,
      operationFlag,
      selectedUser,
      roles,
      safeGroups,
      preTwoNode,
      changePasswordFlag
  }
}

export default connect(mapStateToProps)(UserAddView)
