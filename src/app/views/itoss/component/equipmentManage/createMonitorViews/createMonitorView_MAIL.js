/**
 * Created by SHIN on 2015/12/29.
 */
require('bootstrap');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
import { connect } from 'react-redux'
import * as EquipmentActions from '../../../../../actions/equipment_action'

var ReactWidgets = require('react-widgets');
var AlarmConditions = require('./common/createMonitorView_alarmConditions');

var timeUnitData = [
    {id:'0', name:'小时'},
    {id:'1', name:'分钟'},
    {id:'2', name:'秒钟'}
];

var operationData = [
  {id:'0', name:'发送和接收'},
  {id:'1', name:'仅发送'}
];

var receiverProtocol = [
  {id:'0', name:'IMAP4'},
  {id:'1', name:'POP3'}
];

var taskSchedulerData = [
    {id:'0', name:'5*8'},
    {id:'1', name:'7*24'},
    {id:'2', name:'测试'}
];

var CreateMonitorView_MAIL = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    componentDidMount: function() {
        if(document.getElementById('createMonitorView_MAIL') != null) {
            document.getElementById('createMonitorView_MAIL').style.height = $(window).height() - 110 - 30 + 'px';
        }
    },

    handleOnClickCancel: function() {
        const { dispatch } = this.props;
        dispatch(EquipmentActions.setNavigateFromCreateMonitorViewFlag(true));
        this.history.pushState(null,'equipmentManage/MonitorPage');
    },

    render: function() {
        const { dispatch, monitorErrorAlarmText, monitorWarningAlarmText, monitorGoodAlarmText, monitorErrorConditionsData,
                monitorWarningConditionsData, monitorGoodConditionsData,monitorsPropertyData,monitorsPropertyEdit } = this.props;
        return (
            <div id="createMonitorView_MAIL" className="overviewDesViewDiv monitoringSettingTab operationButtons">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        {this.props.monitor.name}
                    </div>
                    <div className="titleRight">
                        <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: "8px"}}></i></a>
                    </div>
                </div>
                <div className="col-md-12">
                  <div className="buttonInfo">
                    <p>{this.props.monitor.description}的相关设置</p>
                    <button>保存</button>
                    <button className="deleteButton" onClick={this.handleOnClickCancel}>取消</button>
                  </div>
                </div>
                <div className="assetCreateTableDiv col-md-12" style={{borderTop:"3px #f1f1f1 solid",paddingTop:"6px"}}>
                    <div className="createGroupDetailDiv" style={{borderTop:"none",marginTop:"0"}}>
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="7" style={{width:"10%"}}>基本信息</th>
                            <td className="paddingleft10" style={{width:"15%"}}>标题<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>运用到告警</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}}>
                                    <input type="checkbox" className="input-checkbox"/>运用到告警
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>刷新频率<span style={{color: "red"}}>*</span></td>
                            <td style={{width:"25%"}}><input type="number"/></td>
                            <td style={{width:"5%"}}><ReactWidgets.DropdownList data={timeUnitData} defaultValue={timeUnitData[1]} textField='name'/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>操作</td>
                            <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={operationData} defaultValue={operationData[0]} textField='name'/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>SMTP服务器地址<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>发件人地址<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>SMTP用户<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>SMTP密码</td>
                            <td colSpan="2" style={{width:"30%"}}><input type="password"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>接收方协议</td>
                            <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={receiverProtocol} defaultValue={receiverProtocol[1]} textField='name'/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>接收邮件服务器地址<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>收件人地址<span style={{color: "red"}}>*</span></td>
                            <td colSpan="5" style={{width:"75%"}}><input type="text"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>接收邮件用户名<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>接收邮件密码</td>
                            <td colSpan="2" style={{width:"30%"}}><input type="password"/></td>
                          </tr>

                          <tr>
                            <th rowSpan="5" style={{width:"10%"}}>高级选项</th>
                            <td className="paddingleft10" style={{width:"15%"}}>超时(毫秒)<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input type="number"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>POP3端口<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input type="number"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>IMAP端口<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input type="number"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>校验错误</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}}>
                                    <input type="checkbox" className="input-checkbox"/>监测器错误校验
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>错误频率</td>
                            <td style={{width:"25%"}}><input type="number"/></td>
                            <td style={{width:"5%"}}><ReactWidgets.DropdownList data={timeUnitData} defaultValue={timeUnitData[1]} textField='name'/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>禁用</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}}>
                                    <input type="checkbox" className="input-checkbox"/>禁用监测器
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>任务计划</td>
                            <td colSpan="5" style={{width:"75%"}}><ReactWidgets.DropdownList data={taskSchedulerData} defaultValue={taskSchedulerData[0]} textField='name'/></td>
                          </tr>
                          <tr>
                              <td className="paddingleft10" style={{width:"15%"}}>描述</td>
                              <td colSpan="5" style={{width:"75%"}}><textarea className="form-control" style={{height:"60px"}}/></td>
                          </tr>

                          <AlarmConditions.ErrorCondition monitorAlarmData={monitorErrorConditionsData} monitorErrorAlarmText={monitorErrorAlarmText}
                              setMonitorErrorAlarmText={monitorErrorAlarmText => dispatch(EquipmentActions.setMonitorErrorAlarmText(monitorErrorAlarmText))}/>
                          <AlarmConditions.WarningCondition monitorAlarmData={monitorWarningConditionsData} monitorWarningAlarmText={monitorWarningAlarmText}
                              setMonitorWarningAlarmText={monitorWarningAlarmText => dispatch(EquipmentActions.setMonitorWarningAlarmText(monitorWarningAlarmText))}/>
                          <AlarmConditions.GoodCondition monitorAlarmData={monitorGoodConditionsData} monitorGoodAlarmText={monitorGoodAlarmText}
                              setMonitorGoodAlarmText={monitorGoodAlarmText => dispatch(EquipmentActions.setMonitorGoodAlarmText(monitorGoodAlarmText))}/>
                          <AlarmConditions.CreatInfo monitorsPropertyData={monitorsPropertyData} monitorsPropertyEdit={monitorsPropertyEdit}/>
                          <AlarmConditions.ModifyInfo monitorsPropertyData={monitorsPropertyData} monitorsPropertyEdit={monitorsPropertyEdit}/>
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('createMonitorView_MAIL') != null) {
        document.getElementById('createMonitorView_MAIL').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = CreateMonitorView_MAIL;
CreateMonitorView_MAIL.propTypes = {
  monitorErrorAlarmText: PropTypes.string.isRequired,
  monitorWarningAlarmText: PropTypes.string.isRequired,
  monitorGoodAlarmText: PropTypes.string.isRequired,
  monitorErrorConditionsData: PropTypes.array.isRequired,
  monitorWarningConditionsData: PropTypes.array.isRequired,
  monitorGoodConditionsData: PropTypes.array.isRequired,
  equipmentServerAddress: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { monitorErrorAlarmText, monitorWarningAlarmText, monitorGoodAlarmText, monitorErrorConditionsData, monitorWarningConditionsData,
          monitorGoodConditionsData, equipmentServerAddress, monitorsPropertyData, monitorsPropertyEdit, selectedNode } = state.equipmentReducer

  return {
    monitorErrorAlarmText,
    monitorWarningAlarmText,
    monitorGoodAlarmText,
    monitorErrorConditionsData,
    monitorWarningConditionsData,
    monitorGoodConditionsData,
    equipmentServerAddress,
    monitorsPropertyData,
    monitorsPropertyEdit,
    selectedNode
  }
}

export default connect(mapStateToProps)(CreateMonitorView_MAIL)
