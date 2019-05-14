/**
* xuexue.yin  2016/02/24.
* 值班管理-值班日历
*/
require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as operationActions from '../../../../../actions/operation_action'
import { setCurThreeNode, setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'

var DutyListView_desView = require('./rotaset/dutyListView_desView');
var DutyManageList = require('./dutyManageList');

var DutyListView = React.createClass({
  // mixins: [History, FluxMixin, StoreWatchMixin("YFTOperationStore")],
  // getStateFromFlux: function() {
  //   var flux = this.getFlux();
  //   return {
  //     itoss_operation:flux.store("YFTOperationStore").getState()
  //   }
  // },
  componentDidMount: function() {
      if(document.getElementById('dutyListView2') != null) {
          document.getElementById('dutyListView2').style.height = $(window).height() - 110 - 30 + 'px';
      };
  },
  render:function(){
      const { dispatch, curThreeNode, preThreeNode, curDataDutyGroup, curDutyGroup, dutyGroupArrs, dutyGroups, dutyUsers, dutyUserList, dutyDutyList } = this.props;
      return (
          <div id='dutyListView2' className='overviewDiv'>
              <div className='leftListDiv col-md-1'>
                  <DutyManageList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                      onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))} set_permission={permissions => dispatch(operationActions.setPermissionsOperation(permissions))}
                      setCurName={data => dispatch(setCurName(data))}/>
              </div>
              <DutyListView_desView curDataDutyGroup={curDataDutyGroup} curDutyGroup={curDutyGroup} dutyGroupArrs={dutyGroupArrs} dutyGroups={dutyGroups} dutyUsers={dutyUsers}
                  dutyUserList={dutyUserList} dutyDutyList={dutyDutyList} setCurDutyGroup={curDutyGroup => dispatch(operationActions.setCurDutyGroup(curDutyGroup))}
                  setDutyEccData={dutyEccData => dispatch(operationActions.setDutyEccData(dutyEccData))} get_dutyGroup={() => dispatch(operationActions.get_dutyGroup())}
                  get_dutyUsers={() => dispatch(operationActions.get_dutyUsers())} edit_dutyGroupArr={data => dispatch(operationActions.edit_dutyGroupArr(data))}
                  save_dutyArrangements={data => dispatch(operationActions.save_dutyArrangements(data))} edit_dutyGroup={data => dispatch(operationActions.edit_dutyGroup(data))}
                  save_dutyGroupName={data => dispatch(operationActions.save_dutyGroupName(data))} change_curDutyGroup2={data => dispatch(operationActions.change_curDutyGroup2(data))}
                  edit_dutyUser={data => dispatch(operationActions.edit_dutyUser(data))} save_dutyUser={data => dispatch(operationActions.save_dutyUser(data))}
                  edit_eccDuty={data => dispatch(operationActions.edit_eccDuty(data))} save_eccDuty={data => dispatch(operationActions.save_eccDuty(data))}
                  delete_dutyGroupArr={id => dispatch(operationActions.delete_dutyGroupArr(id))} delete_dutyGroup={id => dispatch(operationActions.delete_dutyGroup(id))}
                  delete_dutyGroupUser={id => dispatch(operationActions.delete_dutyGroupUser(id))} delete_eccDuty={id => dispatch(operationActions.delete_eccDuty(id))}/>
          </div>
      );
  }
});

$(window).resize(function () {
    if(document.getElementById('dutyListView') != null) {
        document.getElementById('dutyListView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = DutyListView;
DutyListView.propTypes = {
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    curDataDutyGroup: PropTypes.object,
    curDutyGroup: PropTypes.object,
    dutyGroupArrs: PropTypes.array.isRequired,
    dutyGroups: PropTypes.array.isRequired,
    dutyUsers: PropTypes.array.isRequired,
    dutyUserList: PropTypes.array.isRequired,
    dutyDutyList: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer
  const { curDataDutyGroup, curDutyGroup, dutyGroupArrs, dutyGroups, dutyUsers, dutyUserList, dutyDutyList } = state.operationReducer

  return {
      curThreeNode,
      preThreeNode,
      curDataDutyGroup,
      curDutyGroup,
      dutyGroupArrs,
      dutyGroups,
      dutyUsers,
      dutyUserList,
      dutyDutyList,
      curName
  }
}

export default connect(mapStateToProps)(DutyListView)
