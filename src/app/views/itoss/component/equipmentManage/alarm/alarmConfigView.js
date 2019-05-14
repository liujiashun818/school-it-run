/**
 * Created by SHIN on 2016/1/22.
 * 视频阀值设置
 */
var React = require('react');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
import { connect } from 'react-redux'
import * as deviceMonitorAction from '../../../../../actions/deviceMonitor_action'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import AlarmList from '../setting/settingLeftList';
import EditErrorConditionModal from './editErrorConditionModal';
import EditWarningConditionModal from './editWarningConditionModal';
import EditGoodConditionModal from './editGoodConditionModal';
import AlarmConfigView_desView from './alarmConfigView_desView';

var yftAlarmTypeData = {
    ONLINESTATUS: "离线",
    SIGNALLOSS: "信号丢失",
    IMAGELOSS: "画面丢失",
    DEFINITION: "清晰度",
    BRIGHT: "偏亮",
    DIM: "偏暗",
    COLORCOST: "偏色",
    SNOWFLAKE: "雪花",
    STREAK: "条纹",
    SCREENSCROLL: "滚屏",
    SCREENSHAKE: "抖屏",
    COVERSTATUS: "遮挡",
    FREEZE: "冻结",
    PTZ: "云台控制",
    'return': "反馈",
    NETBREAK: "状态",
    IPERROR: "IP地址冲突",
    USERILLEGAL: "非法访问",
    OTHERERROR: "其他错误",
    DISKERRINFO: "硬盘出错",
    DISKFULLINFO: "硬盘满",
    DISKLOSTINFO: "硬盘丢失",
    INPUTOVERLOADCHAN: "输入过载通道",
    VIDEOERRCHAN: "视频异常通道",
    ENCODEERRCHAN: "编码失败通道",
    BANDWIDTHFULL: "宽带占满",
    RAIDFULLINFO: "阵列满",
    RAIDERRINFO: "阵列出错",
    RAIDLOSTINFO: "阵列丢失损坏",
    TEMPERATUREOVER: "温度过高"
};

var AlarmConfigView = React.createClass({
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
    componentWillMount:function(){
      const { dispatch } = this.props;
      dispatch(deviceMonitorAction.getYFTAlarm());
    },
    componentDidMount: function() {
      if(document.getElementById('alarmConfigView') != null) {
          document.getElementById('alarmConfigView').style.height = $(window).height() - 110 - 30 + 'px';
      }
      // document.getElementById('alarmList_alarmConfig').className = 'list-group-item active';
      $(window).resize(function () {
          if(document.getElementById('alarmConfigView') != null) {
              document.getElementById('alarmConfigView').style.height = $(window).height() - 110 - 30 + 'px';
          }
      });
      const {dispatch} = this.props;
      dispatch(deviceMonitorAction.getYFTAlarm());
    },
    onGetYftAlarm:function(){
      const {dispatch} = this.props;
      dispatch(deviceMonitorAction.getYFTAlarm());
    },

    render: function() {
      const { curThreeNode } = this.props;
      const { preThreeNode } = this.props;
      const { dispatch } = this.props;
        return (
            <div id='alarmConfigView' className='overviewDiv'>
              <EditErrorConditionModal
                yftAlarmData={this.props.yftAlarmData} isOrError={this.props.isOrError} settingIsOrError={this.props.settingIsOrError}
                errorConditionsData={this.props.errorConditionsData} settingErrorConditionsData={this.props.settingErrorConditionsData}
                setErrorAlarmText={errorAlarmText => dispatch(deviceMonitorAction.setErrorAlarmText(errorAlarmText))}
                setErrorConditionsData={errorConditionsData => dispatch(deviceMonitorAction.setErrorConditionsData(errorConditionsData))}
                setSettingErrorConditionsData={settingErrorConditionsData => dispatch(deviceMonitorAction.setSettingErrorConditionsData(settingErrorConditionsData))}
                setIsOrError={isOrError => dispatch(deviceMonitorAction.setIsOrError(isOrError))}
                setSettingIsOrError={settingIsOrError => dispatch(deviceMonitorAction.setSettingIsOrError(settingIsOrError))}
              />
              <EditWarningConditionModal
                yftAlarmData={this.props.yftAlarmData} isOrWarning={this.props.isOrWarning} settingIsOrWarning={this.props.settingIsOrWarning}
                warningConditionsData={this.props.warningConditionsData} settingWarningConditionsData={this.props.settingWarningConditionsData}
                setWarningAlarmText={warningAlarmText => dispatch(deviceMonitorAction.setWarningAlarmText(warningAlarmText))}
                setWarningConditionsData={warningConditionsData => dispatch(deviceMonitorAction.setWarningConditionsData(warningConditionsData))}
                setSettingWarningConditionsData={settingWarningConditionsData => dispatch(deviceMonitorAction.setSettingWarningConditionsData(settingWarningConditionsData))}
                setIsOrWarning={isOrWarning => dispatch(deviceMonitorAction.setIsOrWarning(isOrWarning))}
                setSettingIsOrWarning={settingIsOrWarning => dispatch(deviceMonitorAction.setSettingIsOrWarning(settingIsOrWarning))}
              />
              <EditGoodConditionModal
                yftAlarmData={this.props.yftAlarmData} isOrGood={this.props.isOrGood} settingIsOrGood={this.props.settingIsOrGood}
                goodConditionsData={this.props.goodConditionsData} settingGoodConditionsData={this.props.settingGoodConditionsData}
                setGoodAlarmText={goodAlarmText => dispatch(deviceMonitorAction.setGoodAlarmText(goodAlarmText))}
                setGoodConditionsData={goodConditionsData => dispatch(deviceMonitorAction.setGoodConditionsData(goodConditionsData))}
                setSettingGoodConditionsData={settingGoodConditionsData => dispatch(deviceMonitorAction.setSettingGoodConditionsData(settingGoodConditionsData))}
                setIsOrGood={isOrGood => dispatch(deviceMonitorAction.setIsOrGood(isOrGood))}
                setSettingIsOrGood={settingIsOrGood => dispatch(deviceMonitorAction.setSettingIsOrGood(settingIsOrGood))}
              />
              <div className='leftListDiv col-md-1'>
                <AlarmList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName}
                setCurName={data => dispatch(setCurName(data))} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}/>
              </div>
              <AlarmConfigView_desView
              setErrorAlarmText={errorAlarmText => dispatch(deviceMonitorAction.setErrorAlarmText(errorAlarmText))}
              setWarningAlarmText={warningAlarmText => dispatch(deviceMonitorAction.setWarningAlarmText(warningAlarmText))}
              setGoodAlarmText={goodAlarmText => dispatch(deviceMonitorAction.setGoodAlarmText(goodAlarmText))}
              setErrorConditionsData={errorConditionsData => dispatch(deviceMonitorAction.setErrorConditionsData(errorConditionsData))}
              setSettingErrorConditionsData={settingErrorConditionsData => dispatch(deviceMonitorAction.setSettingErrorConditionsData(settingErrorConditionsData))}
              setIsOrError={isOrError => dispatch(deviceMonitorAction.setIsOrError(isOrError))}
              setSettingIsOrError={settingIsOrError => dispatch(deviceMonitorAction.setSettingIsOrError(settingIsOrError))}
              setWarningConditionsData={warningConditionsData => dispatch(deviceMonitorAction.setWarningConditionsData(warningConditionsData))}
              setSettingWarningConditionsData={settingWarningConditionsData => dispatch(deviceMonitorAction.setSettingWarningConditionsData(settingWarningConditionsData))}
              setIsOrWarning={isOrWarning => dispatch(deviceMonitorAction.setIsOrWarning(isOrWarning))}
              setSettingIsOrWarning={settingIsOrWarning => dispatch(deviceMonitorAction.setSettingIsOrWarning(settingIsOrWarning))}
              setGoodConditionsData={goodConditionsData => dispatch(deviceMonitorAction.setGoodConditionsData(goodConditionsData))}
              setSettingGoodConditionsData={settingGoodConditionsData => dispatch(deviceMonitorAction.setSettingGoodConditionsData(settingGoodConditionsData))}
              setIsOrGood={isOrGood => dispatch(deviceMonitorAction.setIsOrGood(isOrGood))}
              setSettingIsOrGood={settingIsOrGood => dispatch(deviceMonitorAction.setSettingIsOrGood(settingIsOrGood))}
              setYFTAlarm={params => dispatch(deviceMonitorAction.setYFTAlarm(params))} getYFTAlarm={this.onGetYftAlarm}
              yftAlarmData={this.props.yftAlarmData} yftAlarmRuleData={this.props.yftAlarmRuleData} errorAlarmText={this.props.errorAlarmText} isOrGood={this.props.isOrGood}
              warningAlarmText={this.props.warningAlarmText} goodAlarmText={this.props.goodAlarmText} isOrError={this.props.isOrError} isOrWarning={this.props.isOrWarning}
              errorConditionsData={this.props.errorConditionsData} warningConditionsData={this.props.warningConditionsData} goodConditionsData={this.props.goodConditionsData}
              yftAlarmTypeData={yftAlarmTypeData}
              />
            </div>
        );
    }
});

function mapAlarmConfigState(state) {
  const { yftAlarmData } = state.deviceMonitorReducer
  const { yftAlarmRuleData } = state.deviceMonitorReducer
  const { errorAlarmText } = state.deviceMonitorReducer
  const { warningAlarmText } = state.deviceMonitorReducer
  const { goodAlarmText } = state.deviceMonitorReducer
  const { errorConditionsData,settingErrorConditionsData,isOrError,settingIsOrError } = state.deviceMonitorReducer
  const { warningConditionsData,settingWarningConditionsData,isOrWarning,settingIsOrWarning } = state.deviceMonitorReducer
  const { goodConditionsData,settingGoodConditionsData,isOrGood,settingIsOrGood } = state.deviceMonitorReducer
  const { curThreeNode } = state.navbarReducer
  const { preThreeNode,curName } = state.navbarReducer
  return {
    yftAlarmData:yftAlarmData,
    yftAlarmRuleData:yftAlarmRuleData,
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    errorAlarmText:errorAlarmText,
    warningAlarmText:warningAlarmText,
    goodAlarmText:goodAlarmText,
    isOrError:isOrError,
    settingIsOrError:settingIsOrError,
    errorConditionsData:errorConditionsData,
    settingErrorConditionsData:settingErrorConditionsData,
    isOrWarning:isOrWarning,
    settingIsOrWarning:settingIsOrWarning,
    warningConditionsData:warningConditionsData,
    settingWarningConditionsData:settingWarningConditionsData,
    isOrGood:isOrGood,
    settingIsOrGood:settingIsOrGood,
    goodConditionsData:goodConditionsData,
    settingGoodConditionsData:settingGoodConditionsData,
    curName:curName
  }
}

export default connect(mapAlarmConfigState)(AlarmConfigView)
