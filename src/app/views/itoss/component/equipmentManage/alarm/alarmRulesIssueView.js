/**
 * Created by SHIN on 2016/1/22.
 * 厅级升级配置
 */
var React = require('react');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import { connect } from 'react-redux'
import * as deviceMonitorAction from '../../../../../actions/deviceMonitor_action'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
import AlarmList from './alarmList';
import AlarmRulesIssueView_desView from './alarmRulesIssueView_desView';

var AlarmRulesIssueView = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    componentDidMount: function() {
        if(document.getElementById('alarmRulesIssueView') != null) {
            document.getElementById('alarmRulesIssueView').style.height = $(window).height() - 110 - 30 + 'px';
        }
        document.getElementById('alarmList_alarmIssue').className = 'list-group-item active';

        $(window).resize(function () {
            if(document.getElementById('alarmRulesIssueView') != null) {
                document.getElementById('alarmRulesIssueView').style.height = $(window).height() - 110 - 30 + 'px';
            }
        });
    },
    onGetAlarmIssued :function(){
      const { dispatch } = this.props;
      dispatch(deviceMonitorAction.getAlarmIssued())
    },
    render: function() {
      const { dispatch } = this.props;
      const { curThreeNode,preThreeNode } = this.props;
      return (
          <div id='alarmRulesIssueView' className='overviewDiv'>
              <div className='leftListDiv col-md-1'>
                  <AlarmList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName}
                  setCurName={data => dispatch(setCurName(data))} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                  onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}/>
              </div>
              <AlarmRulesIssueView_desView
                alarmIssuedEquipmentType={this.props.alarmIssuedEquipmentType} alarmIssuedMonitorType={this.props.alarmIssuedMonitorType} alarmIssuedTableData={this.props.alarmIssuedTableData}
                getAlarmIssued={this.onGetAlarmIssued} setAlarmIssued={param => dispatch(deviceMonitorAction.setAlarmIssued(param))}
                deleteAlarmIssued={param => dispatch(deviceMonitorAction.deleteAlarmIssued(param))}
              />
          </div>
      );
    }
});

function mapAlarmRulesIssueState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { alarmIssuedEquipmentType,alarmIssuedMonitorType,alarmIssuedTableData } = state.deviceMonitorReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    alarmIssuedEquipmentType:alarmIssuedEquipmentType,
    alarmIssuedMonitorType:alarmIssuedMonitorType,
    alarmIssuedTableData:alarmIssuedTableData,
    curName:curName
  }
}

export default connect(mapAlarmRulesIssueState)(AlarmRulesIssueView)
