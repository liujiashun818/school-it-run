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

var OnLineUserListView = React.createClass({
  // mixins: [History, FluxMixin, StoreWatchMixin("YFTSystemStore")],
  // getStateFromFlux: function() {
  //     var flux = this.getFlux();
  //     return {
  //         itoss_system:flux.store("YFTSystemStore").getState()
  //     }
  // },

  componentWillMount: function() {
      const { dispatch } = this.props;
      dispatch(systemActions.getSessionUsers());
  },
  componentDidMount: function() {
    if(document.getElementById('userListView_desView') != null) {
        document.getElementById('userListView_desView').style.height = $(window).height() - 110 - 30 + 'px';
    }
    $('#userListTable').bootstrapTable({
        exportDataType:"all",
        columns: [
            {
                title: '用户登录名',
                field: 'LOGIN_ID',
                sortable: true
            }, {
                title: '组织机构',
                field: 'ORGANIZATION_NAME',
                sortable: true
            },{
              title: '角色',
              field: 'ROLE_NAME',
              sortable: true
            }, {
                title: '用户姓名',
                field: 'USER_NAME',
                sortable: true
            },{
                title: 'IP地址',
                field: 'REMOTE_ADDRESS',
                sortable: true
            }, {
                title: '登录时间',
                field: 'LOGIN_TIME',
                sortable: true
            },{
              title: '最后操作时间',
              field: 'LAST_ACCESS_TIME',
              sortable: true
            }
        ],
        data: this.props.sessionUsers,
        exportDataType:"all"
    });
  },

  componentDidUpdate: function() {
      $('#userListTable').bootstrapTable('refreshOptions', {data: this.props.sessionUsers});
  },

  render:function(){
    return (
        <div id='userListView' className='overviewDiv'>
          <div id='userListView_desView' className='overviewDesViewDiv userListView_desView'>
              <div className="operationButtons">
                  <div className="systemGroupButtonGroup1 oBGroup">
                      <div className="titleDiv col-md-12">
                          <div className="titleLeft">
                              系统设置-在线用户
                          </div>
                          <div className="titleRight">
                              <a href=""><i className="fa fa-question-circle"></i></a>
                              <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                          </div>
                      </div>
                  </div>
              </div>
              <div className='operationCreateTableDiv col-md-12'>
                  <div id='userListTable_toolbar'>
                      <div id='toolbar-form' role='form'>
                          <div style={{float: "right"}}>
                              {/**<span>用户数：{this.getFlux().store("YFTSystemStore").getState().sessionUsers.length} </span>*/}
                          </div>
                      </div>
                  </div>
                  <table id='userListTable'
                         data-toggle='table'
                         data-search='true'
                         data-classes='table table-no-bordered table-striped table-hover'
                         data-toolbar='#userListTable_toolbar'
                         data-resizable='true'
                         data-show-refresh='false'
                         data-show-toggle='true'
                         data-show-columns='true'
                         data-pagination='true'
                         data-page-size='15'
                         data-click-to-select='true'>
                  </table>
              </div>
          </div>
        </div>
    );
  }
});

$(window).resize(function () {
    if(document.getElementById('userListView_desView') != null) {
        document.getElementById('userListView_desView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});
// module.exports = OnLineUserListView;
OnLineUserListView.propTypes = {
    sessionUsers: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { sessionUsers } = state.systemReducer

  return {
      sessionUsers
  }
}

export default connect(mapStateToProps)(OnLineUserListView)
