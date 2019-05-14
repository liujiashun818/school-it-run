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

var UserListView_desView = require('./userListView_desView');
var ConfirmDeleteUserModal = require('./confirmDeleteUserModal');

var UserListView = React.createClass({
  // mixins: [History, FluxMixin, StoreWatchMixin("YFTSystemStore")],
  // getStateFromFlux: function() {
  //     var flux = this.getFlux();
  //     return {
  //         //itoss_system:flux.store("YFTSystemStore").getState()
  //     }
  // },

  componentWillMount: function() {
      const { dispatch } = this.props;
      dispatch(systemActions.get_allUser());
  },

  render:function(){
      const { dispatch, users, selectedUser } = this.props;
      return (
          <div id='userListView' className='overviewDiv'>
              <ConfirmDeleteUserModal users={users} selectedUser={selectedUser} delete_user={loginId=>dispatch(systemActions.delete_user(loginId))} get_allUser={()=>dispatch(systemActions.get_allUser())}
                  set_selectedUser={params=>dispatch(systemActions.set_selectedUser(params))} setUserInfoChangeFlag={userInfoChangeFlag=>dispatch(systemActions.setUserInfoChangeFlag(userInfoChangeFlag))}/>
              <UserListView_desView users={users} set_selectedUser={params=>dispatch(systemActions.set_selectedUser(params))} setUserInfoChangeFlag={userInfoChangeFlag=>dispatch(systemActions.setUserInfoChangeFlag(userInfoChangeFlag))}
                  get_userOrganization={filter=>dispatch(systemActions.get_userOrganization(filter))} get_allUser={()=>dispatch(systemActions.get_allUser())}/>
          </div>
      );
  }
});

// module.exports = UserListView;
UserListView.propTypes = {
  users: PropTypes.array.isRequired,
  selectedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { users, selectedUser } = state.systemReducer

  return {
    users,
    selectedUser
  }
}

export default connect(mapStateToProps)(UserListView)
