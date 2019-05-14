/**
 * Created by SHIN on 2015/12/29.
 * 系统事件日志 完成
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
var Tools = require('../../../../../utils/tool');

var timeUnitData = ["小时","分钟","秒钟"];
var taskSchedulerData = ["5*8","7*24"];
var eventTypeData = [
    {id:'ERROR_WARNING', name:'错误或者告警'},
    {id:'ANY', name:'任何'},
    {id:'ERROR', name:'错误'},
    {id:'WARNING', name:'告警'},
    {id:'INFORMATION', name:'信息'},
    {id:'AUDITSUCCESS', name:'审核成功'},
    {id:'AUDITFAILURE', name:'审核失败'}
];

var bUpdateInDidMount = false;
var CreateMonitorView_NTEventLog = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            refreshUnit: timeUnitData[1],
            errorCheckingUnit: timeUnitData[1],
            taskScheduler: taskSchedulerData[0],
            eventType: eventTypeData[0]
        }
    },

    componentDidMount: function() {
        if(document.getElementById('createMonitorView_NTEventLog') != null) {
            document.getElementById('createMonitorView_NTEventLog').style.height = $(window).height() - 110 - 30 + 'px';
        }
        if (this.isMounted()) {
          const { dispatch, monitorsPropertyData,monitorsPropertyEdit,monitor } = this.props;
          if(monitorsPropertyEdit){
            //编辑监测器属性
            if(monitorsPropertyData){
              var SpecialPropertiesTemp = monitorsPropertyData.SpecialProperties;
              var SpecialProperties = SpecialPropertiesTemp.split(",");
              for (var i = 0; i < SpecialProperties.length; i++) {
                if (SpecialProperties[i].indexOf("eventType") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      for(var i = 0; i < eventTypeData.length; i++) {
                          if(temp[1] == eventTypeData[i].id) {
                              this.setState({eventType: eventTypeData[i]});
                              break;
                          }
                      }
                    }
                  }
                } else if (SpecialProperties[i].indexOf("refresh") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#refresh_NTEventLog").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("fileName") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      dispatch(EquipmentActions.setSelectedMonitorNTEventLog({EVENT_NAME:temp[1]}));
                    }
                  }
                } else if (SpecialProperties[i].indexOf("IDSource") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#IDSource_NTEventLog").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("filterIDSource") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#filterIDSource_NTEventLog").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("message") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#message_NTEventLog").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("filterMessage") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#filterMessage_NTEventLog").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("type") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#type_NTEventLog").val(temp[1]);
                    }
                  }
                }
              };
              bUpdateInDidMount = true;
              var Title = monitorsPropertyData.Title;
              $("#Title_NTEventLog").val(Title); //标题
              var IsRunningAlarm = monitorsPropertyData.IsRunningAlarm;
              if (IsRunningAlarm) {
                //运用到告警
                $("#IsRunningAlarm_NTEventLog").attr("checked", 'true');
              };
              var RefreshTime = monitorsPropertyData.RefreshTime;
              $("#RefreshTime_NTEventLog").val(RefreshTime); //刷新频率
              var RefreshUnit = monitorsPropertyData.RefreshUnit;
              if(RefreshUnit == 'MINUTES'){
                this.setState({refreshUnit: timeUnitData[1]});
              }else if(RefreshUnit == 'HOURS'){
                this.setState({refreshUnit: timeUnitData[0]});
              }else if(RefreshUnit == 'SECONDS'){
                this.setState({refreshUnit: timeUnitData[2]});
              };

              var IsErrorChecking = monitorsPropertyData.IsErrorChecking;
              if (IsErrorChecking) {
                $("#IsErrorChecking_NTEventLog").attr("checked", 'true'); //监测器错误校验
              }
              var ErrorCheckingTime = monitorsPropertyData.ErrorCheckingTime;
              $("#ErrorCheckingTime_NTEventLog").val(ErrorCheckingTime); //错误频率
              var ErrorCheckingUnitTemp = monitorsPropertyData.ErrorCheckingUnit;
              if (ErrorCheckingUnitTemp == 'MINUTES') {
                this.setState({errorCheckingUnit: timeUnitData[1]});
              } else if (ErrorCheckingUnitTemp == 'HOURS') {
                this.setState({errorCheckingUnit: timeUnitData[0]});
              } else if (ErrorCheckingUnitTemp == 'SECONDS') {
                this.setState({errorCheckingUnit: timeUnitData[2]});
              };

              var IsDisabled = monitorsPropertyData.IsDisabled;
              if (IsDisabled) {
                $("#IsDisabled_NTEventLog").attr("checked", 'true'); //禁用监测器
              };
              var MonitorTimeOut = monitorsPropertyData.MonitorTimeOut;
              $("#monitorTimeOut_NTEventLog").val(MonitorTimeOut); //超时时间
              var TaskScheduler = monitorsPropertyData.TaskScheduler;
              this.setState({taskScheduler: TaskScheduler});  //任务计划
              var Description = monitorsPropertyData.Description;
              $("#description_NTEventLog").val(Description); //描述
            };
          }else{
              //增加监测器
              $("#serviceName_NTEventLog").val("");
              $("#IsRunningAlarm_NTEventLog").attr("checked",true);
              $("#RefreshTime_NTEventLog").val("10");
              $("#Title_NTEventLog").val("系统事件日志");
              $("#monitorTimeOut_NTEventLog").val("30000");
              $("#IDSource_NTEventLog").val("");
              $("#filterIDSource_NTEventLog").val("");
              $("#message_NTEventLog").val("");
              $("#filterMessage_NTEventLog").val("");
              $("#type_NTEventLog").val("");
              $("#refresh_NTEventLog").val("24");
              $("#IsErrorChecking_NTEventLog").attr("checked",false);
              $("#ErrorCheckingTime_NTEventLog").val("0");
              $("#IsDisabled_NTEventLog").attr("checked",false);
              $("#description_NTEventLog").val("");
          }

        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if (!bUpdateInDidMount && nextProps.selectedMonitorNTEventLog !== this.props.selectedMonitorNTEventLog) {
            var eventName = nextProps.selectedMonitorNTEventLog ? nextProps.selectedMonitorNTEventLog.EVENT_NAME : ""
            var Title = "系统事件日志:"+ eventName;
            $("#Title_NTEventLog").val(Title);
        }
        bUpdateInDidMount = false;
        return true;
    },

    componentWillUnmount: function() {
        const { dispatch } = this.props;
        dispatch(EquipmentActions.setSelectedMonitorNTEventLog(null));
    },

    handleOnClickSave:function(){
      const { dispatch, monitorsPropertyData, monitorsPropertyEdit, selectedNode, selectedMonitorNTEventLog } = this.props;
      //保存监测器数据
      //编辑监测器属性-保存
      var specialProperties = "";
      var eventName = $.trim($("#eventName_NTEventLog").val());
      var IDSource = $.trim($("#IDSource_NTEventLog").val());
      var filterIDSource = $.trim($("#filterIDSource_NTEventLog").val());
      var message = $.trim($("#message_NTEventLog").val());
      var filterMessage = $.trim($("#filterMessage_NTEventLog").val());
      var type = $.trim($("#type_NTEventLog").val());
      var refresh = $.trim($("#refresh_NTEventLog").val());

      specialProperties =  "eventType="+ this.state.eventType.id;
      if(!eventName){
        $.showPublicDialog("系统提示","请选择日志。");
        return;
      }else{
          if(specialProperties){
            specialProperties = specialProperties + ",fileName=" + eventName;
          }else{
            specialProperties =  "fileName="+ eventName;
          }
      };
      if(IDSource) {
        if(specialProperties){
          specialProperties = specialProperties + ",IDSource=" + IDSource;
        }else{
          specialProperties =  "IDSource="+ IDSource;
        }
      };
      if(filterIDSource) {
        if(specialProperties){
          specialProperties = specialProperties + ",filterIDSource=" + filterIDSource;
        }else{
          specialProperties =  "filterIDSource="+ filterIDSource;
        }
      };
      if(message) {
        if(specialProperties){
          specialProperties = specialProperties + ",message=" + message;
        }else{
          specialProperties =  "message="+ message;
        }
      };
      if(filterMessage) {
        if(specialProperties){
          specialProperties = specialProperties + ",filterMessage=" + filterMessage;
        }else{
          specialProperties =  "filterMessage="+ filterMessage;
        }
      };
      if(type) {
        if(specialProperties){
          specialProperties = specialProperties + ",type=" + type;
        }else{
          specialProperties =  "type="+ type;
        }
      };
      if(refresh) {
        if(!Tools.checkNumStr(refresh)){
          $.showPublicDialog("系统提示","无效的时间间隔。");
          return;
        };
        if(specialProperties){
          specialProperties = specialProperties + ",refresh=" + parseInt(refresh);
        }else{
          specialProperties =  "refresh="+ parseInt(refresh);
        }
      };
      var Title = $.trim($("#Title_NTEventLog").val());//标题
      if(!Title){
        $.showPublicDialog("系统提示","请填写标题。");
        return;
      }
      var IsRunningAlarm = false;
      //运用到告警
      if(document.getElementById("IsRunningAlarm_NTEventLog").checked){
        IsRunningAlarm = true;
      };
      var RefreshTime = $.trim($("#RefreshTime_NTEventLog").val()); //刷新频率
      if(!RefreshTime){
        $.showPublicDialog("系统提示","请填写刷新频率。");
        return;
      }else{
        if(!Tools.checkNumStr(RefreshTime)){
          $.showPublicDialog("系统提示","无效的刷新频率。");
          return;
        };
      };
      var iRefreshTime = 0;
      if(RefreshTime){
        iRefreshTime = parseInt(RefreshTime);
      };
      var RefreshUnit = "MINUTES";
      if(this.state.refreshUnit  == '分钟'){
        RefreshUnit = "MINUTES";
      }else if(this.state.refreshUnit  == '小时'){
        RefreshUnit = "HOURS";
      }else if(this.state.refreshUnit  == '秒钟'){
        RefreshUnit = "SECONDS";
      };
      var IsErrorChecking = false; //监测器错误校验;
      if (document.getElementById("IsErrorChecking_NTEventLog").checked) {
        IsErrorChecking = true;
      };
      var ErrorCheckingTime = $.trim($("#ErrorCheckingTime_NTEventLog").val()); //错误频率;
      var iErrorCheckingTime = 0;
      if(ErrorCheckingTime){
        if(!Tools.checkNumStr(ErrorCheckingTime)){
          $.showPublicDialog("系统提示","无效的错误频率。");
          return;
        };
        iErrorCheckingTime = parseInt(ErrorCheckingTime);
      };
      var ErrorCheckingUnit = "MINUTES";
      if(this.state.errorCheckingUnit  == '分钟'){
        ErrorCheckingUnit = "MINUTES";
      }else if(this.state.errorCheckingUnit  == '小时'){
        ErrorCheckingUnit = "HOURS";
      }else if(this.state.errorCheckingUnit  == '秒钟'){
        ErrorCheckingUnit = "SECONDS";
      };
      var IsDisabled = false;
      if (document.getElementById("IsDisabled_NTEventLog").checked) {
        IsDisabled = true; //禁用监测器
      };
      var MonitorTimeOut = $.trim($("#monitorTimeOut_NTEventLog").val()); //超时时间
      if(!Tools.checkNumStr(MonitorTimeOut)){
        $.showPublicDialog("系统提示","无效的超时时间。");
        return;
      };
      var TaskScheduler = this.state.taskScheduler;//任务计划
      var Description = $.trim($("#description_NTEventLog").val()); //描述

      if(monitorsPropertyEdit){
        var recId = "";
        if(monitorsPropertyData){
          recId = monitorsPropertyData.RecId;
        }
        if(!recId){
          $.showPublicDialog("系统提示","没有获取到监测器的主键值,不能保存数据。");
          return;
        };
        var propertyData = {
          RecId: recId,
          MonitorType: "NTEventLog",
          ErrorCheckingTime: iErrorCheckingTime,
          ErrorCheckingUnit: ErrorCheckingUnit,
          IsDisabled: IsDisabled,
          IsErrorChecking: IsErrorChecking,
          IsRunningAlarm: IsRunningAlarm,
          LastModBy: localStorage.getItem("localUserName"),
          RefreshTime: iRefreshTime,
          RefreshUnit: RefreshUnit,
          SpecialProperties: specialProperties,
          Title: Title,
          MonitorTimeOut: MonitorTimeOut,
          TaskScheduler: TaskScheduler,
          Description: Description
        };
        dispatch(EquipmentActions.updataMonitorsProperty(propertyData));
      }
      else{
        var GroupId = "";
        var EquipmentId = "";
        if(selectedNode){
          GroupId = selectedNode.pid;
          EquipmentId = selectedNode.id;
        };
        if(!GroupId || !EquipmentId){
          $.showPublicDialog("系统提示","没有获取到资源或组主键值,不能增加监测器。");
          return;
        };
        //增加新监测器-保存
        var propertyData = {
          MonitorType: "NTEventLog",
          ErrorCheckingTime: iErrorCheckingTime,
          ErrorCheckingUnit: ErrorCheckingUnit,
          IsDisabled: IsDisabled,
          IsErrorChecking: IsErrorChecking,
          IsRunningAlarm: IsRunningAlarm,
          LastModBy: localStorage.getItem("localUserName"),
          CreatedBy: localStorage.getItem("localUserName"),
          RefreshTime: iRefreshTime,
          RefreshUnit: RefreshUnit,
          SpecialProperties: specialProperties,
          Title: Title,
          MonitorTimeOut: MonitorTimeOut,
          TaskScheduler: TaskScheduler,
          Description: Description,
          MonitorPackage: "com.siteview.monitor.sqlusermanager.NTEventLogMonitor",
          GroupId: GroupId,
          EquipmentId: EquipmentId,
          MonitorStatus: "good",
          MonitorValue: "",
          BelongID: "",
          IsKeepalive: true
        };
        dispatch(EquipmentActions.addMonitorsProperty(propertyData));
      }
    },

    handleOnClickCancel: function() {
        const { dispatch } = this.props;
        dispatch(EquipmentActions.setNavigateFromCreateMonitorViewFlag(true));
        this.history.pushState(null,'equipmentManage/MonitorPage');
    },

    handleOnChangeRefreshUnit: function(e) {
        this.setState({refreshUnit: e});
    },

    handleOnChangeErrorCheckingUnit: function(e) {
        this.setState({errorCheckingUnit: e});
    },

    handleOnChangeTaskScheduler: function(e) {
        this.setState({taskScheduler: e});
    },

    handleOnChangeEventType: function(e) {
        this.setState({eventType: e});
    },

    handleOnClickGetMonitorNTEventLog:function(){
        const { dispatch, selectedNode } = this.props;
        dispatch(EquipmentActions.getMonitorNTEventLog(selectedNode.id));
    },

    render: function() {
        const { dispatch, monitorErrorAlarmText, monitorWarningAlarmText, monitorGoodAlarmText, monitorErrorConditionsData,
                monitorWarningConditionsData, monitorGoodConditionsData,monitorsPropertyData,monitorsPropertyEdit, selectedMonitorNTEventLog } = this.props;
        return (
            <div id="createMonitorView_NTEventLog" className="overviewDesViewDiv monitoringSettingTab operationButtons">
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
                    <button onClick={this.handleOnClickSave}>保存</button>
                    <button className="deleteButton" onClick={this.handleOnClickCancel}>取消</button>
                  </div>
                </div>
                <div className="assetCreateTableDiv col-md-12" style={{borderTop:"3px #f1f1f1 solid",paddingTop:"6px"}}>
                    <div className="createGroupDetailDiv" style={{borderTop:"none",marginTop:"0"}}>
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="3" style={{width:"10%"}}>基本信息</th>
                            <td className="paddingleft10" style={{width:"15%"}}>日志名称<span style={{color: "red"}}>*</span></td>
                            <td style={{width:"25%"}}><input id="eventName_NTEventLog" type="text" value={selectedMonitorNTEventLog?selectedMonitorNTEventLog.EVENT_NAME:""} title="所监测日志的类型"/></td>
                            <td style={{width:"5%"}}><button type="button" className="btn btn-default btnGetModel" style={{width:"100%"}} data-toggle="modal" data-target="#monitorNTEventLogTableModal" onClick={this.handleOnClickGetMonitorNTEventLog}>获取</button></td>
                            <td className="paddingleft10" style={{width:"15%"}}>事件类型<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList id="eventType_NTEventLog" data={eventTypeData} value={this.state.eventType} textField="name" onChange={this.handleOnChangeEventType} title="监测事件的类型或级别"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>运用到告警</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="监测器生成事件后告警">
                                    <input id="IsRunningAlarm_NTEventLog" type="checkbox" className="input-checkbox"/>运用到告警
                                </label>
                            </td>
                            <td className="paddingleft10" style={{width:"15%"}}>刷新频率<span style={{color: "red"}}>*</span></td>
                            <td style={{width:"25%"}}><input id="RefreshTime_NTEventLog" type="number" title="监测器的监测频率"/></td>
                            <td style={{width:"5%"}}><ReactWidgets.DropdownList id="RefreshUnit_NTEventLog" data={timeUnitData} value={this.state.refreshUnit} onChange={this.handleOnChangeRefreshUnit}/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>标题<span style={{color: "red"}}>*</span></td>
                            <td colSpan="5" style={{width:"75%"}}><input id="Title_NTEventLog" type="text" title="监测器的显示名称"/></td>
                          </tr>

                          <tr>
                            <th rowSpan="7" style={{width:"10%"}}>高级选项</th>
                            <td className="paddingleft10" style={{width:"15%"}}>超时时间（毫秒）</td>
                            <td colSpan="5" style={{width:"75%"}}><input id="monitorTimeOut_NTEventLog" type="number" title="监测器的超时时间(ms)"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>匹配ID或源</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="IDSource_NTEventLog" type="text" title="匹配事件的ID或者来源"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>过滤ID或源</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="filterIDSource_NTEventLog" type="text" title="过滤事件的ID或者来源"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>匹配描述</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="message_NTEventLog" type="text" title="匹配事件的描述"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>过滤描述</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="filterMessage_NTEventLog" type="text" title="过滤事件的描述"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>任务类别</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="type_NTEventLog" type="text" title="监测事件的任务类型，一般为无"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>时间间隔（小时）</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="refresh_NTEventLog" type="number" title="监测的时间段大小(h)(例如：时间间隔=2，等于2监测小时之前到当前时间的数据)"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>校验错误</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="如果监测器检测到错误，立即再次执行监测器以校验错误">
                                    <input id="IsErrorChecking_NTEventLog" type="checkbox" className="input-checkbox"/>监测器错误校验
                                </label>
                            </td>
                            <td className="paddingleft10" style={{width:"15%"}}>错误频率</td>
                            <td style={{width:"25%"}}><input id="ErrorCheckingTime_NTEventLog" type="number" title="处于“错误”条件时监测器的刷新频率"/></td>
                            <td style={{width:"5%"}}><ReactWidgets.DropdownList id="ErrorCheckingUnit_NTEventLog" data={timeUnitData} value={this.state.errorCheckingUnit} onChange={this.handleOnChangeErrorCheckingUnit}/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>禁用</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="勾选此项后监测器停止监测">
                                    <input id="IsDisabled_NTEventLog" type="checkbox" className="input-checkbox"/>禁用监测器
                                </label>
                            </td>
                            <td className="paddingleft10" style={{width:"15%"}}>任务计划</td>
                            <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList id="taskScheduler_NTEventLog" data={taskSchedulerData} value={this.state.taskScheduler} onChange={this.handleOnChangeTaskScheduler} title="从下拉框中选择该监测器执行何种任务计划"/></td>
                          </tr>
                          <tr>
                              <td className="paddingleft10" style={{width:"15%"}}>描述</td>
                              <td colSpan="5" style={{width:"75%"}}><textarea id="description_NTEventLog" className="form-control" style={{height:"60px"}}/></td>
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
    if(document.getElementById('createMonitorView_NTEventLog') != null) {
        document.getElementById('createMonitorView_NTEventLog').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = CreateMonitorView_NTEventLog;
CreateMonitorView_NTEventLog.propTypes = {
  monitorErrorAlarmText: PropTypes.string.isRequired,
  monitorWarningAlarmText: PropTypes.string.isRequired,
  monitorGoodAlarmText: PropTypes.string.isRequired,
  monitorErrorConditionsData: PropTypes.array.isRequired,
  monitorWarningConditionsData: PropTypes.array.isRequired,
  monitorGoodConditionsData: PropTypes.array.isRequired,
  equipmentServerAddress: PropTypes.string.isRequired,
  selectedMonitorNTEventLog: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { monitorErrorAlarmText, monitorWarningAlarmText, monitorGoodAlarmText, monitorErrorConditionsData, monitorWarningConditionsData,
          monitorGoodConditionsData, equipmentServerAddress, monitorsPropertyData, monitorsPropertyEdit, selectedNode, selectedMonitorNTEventLog } = state.equipmentReducer

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
    selectedNode,
    selectedMonitorNTEventLog
  }
}

export default connect(mapStateToProps)(CreateMonitorView_NTEventLog)
