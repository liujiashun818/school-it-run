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

var DutyListView_desView = require('./calender/dutyListView_desView');
var DutyManageList = require('./dutyManageList');
var DutyLogModal = require('./calender/dutyLogModal');

var DutyListView = React.createClass({
  // mixins: [History, FluxMixin, StoreWatchMixin("YFTSystemStore")],
  // getStateFromFlux: function() {
  //   var flux = this.getFlux();
  //   return {
  //     itoss_system:flux.store("YFTSystemStore").getState()
  //   }
  // },
  componentDidMount: function() {
      if(document.getElementById('dutyListView') != null) {
          document.getElementById('dutyListView').style.height = $(window).height() - 110 - 30 + 'px';
      };
  },
  render:function(){
      const { dispatch, curThreeNode, preThreeNode, getCalendarDataFlag, selectedCalendarDate, dutyLogs, isSign, calendarData, dutySignIns, clickedDutyLog } = this.props;
      return (
          <div id='dutyListView' className='overviewDiv'>
              <DutyLogModal clickedDutyLog={clickedDutyLog} selectedCalendarDate={selectedCalendarDate} update_dutyLog={data=>dispatch(operationActions.update_dutyLog(data))}
                    add_dutyLog={data=>dispatch(operationActions.add_dutyLog(data))} get_dutyLog={filter=>dispatch(operationActions.get_dutyLog(filter))}
                    get_dutySignIn={filter=>dispatch(operationActions.get_dutySignIn(filter))}/>
              <div className='leftListDiv col-md-1'>
                    <DutyManageList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                        onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))} set_permission={permissions => dispatch(operationActions.setPermissionsOperation(permissions))}
                        setCurName={data => dispatch(setCurName(data))}/>
              </div>
              <DutyListView_desView getCalendarDataFlag={getCalendarDataFlag} selectedCalendarDate={selectedCalendarDate} dutyLogs={dutyLogs} isSign={isSign} calendarData={calendarData} dutySignIns={dutySignIns}
                    get_dutyManageCalendarData={filter=>dispatch(operationActions.get_dutyManageCalendarData(filter))} setSelectedCalendarDate={selectedCalendarDate=>dispatch(operationActions.setSelectedCalendarDate(selectedCalendarDate))}
                    get_dutyLog={filter=>dispatch(operationActions.get_dutyLog(filter))} get_dutySignIn={filter=>dispatch(operationActions.get_dutySignIn(filter))}
                    setGetCalendarDataFlag={getCalendarDataFlag=>dispatch(operationActions.setGetCalendarDataFlag(getCalendarDataFlag))} add_dutySignIn={data=>dispatch(operationActions.add_dutySignIn(data))}
                    setClickedDutyLog={clickedDutyLog=>dispatch(operationActions.setClickedDutyLog(clickedDutyLog))}/>
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
    getCalendarDataFlag: PropTypes.bool.isRequired,
    selectedCalendarDate: PropTypes.string.isRequired,
    dutyLogs: PropTypes.array.isRequired,
    isSign: PropTypes.bool.isRequired,
    calendarData: PropTypes.array.isRequired,
    dutySignIns: PropTypes.array.isRequired,
    clickedDutyLog: PropTypes.object,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer
  const { getCalendarDataFlag, selectedCalendarDate, dutyLogs, isSign, calendarData, dutySignIns, clickedDutyLog } = state.operationReducer

  return {
      curThreeNode,
      preThreeNode,
      getCalendarDataFlag,
      selectedCalendarDate,
      dutyLogs,
      isSign,
      calendarData,
      dutySignIns,
      clickedDutyLog,
      curName
  }
}

export default connect(mapStateToProps)(DutyListView)
