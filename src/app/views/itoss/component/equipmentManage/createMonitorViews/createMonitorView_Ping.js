/**
 * Created by SHIN on 2015/12/29.
 * Ping 完成
 */
require('bootstrap');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var History = ReactRouter.History;
import { connect } from 'react-redux'
import * as EquipmentActions from '../../../../../actions/equipment_action'

var ReactWidgets = require('react-widgets');
var AlarmConditions = require('./common/createMonitorView_alarmConditions');
var Tools = require('../../../../../utils/tool');

var timeUnitData = ["小时","分钟","秒钟"];
var taskSchedulerData = ["5*8","7*24"];

var CreateMonitorView_Ping = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            refreshUnit: timeUnitData[1],
            errorCheckingUnit: timeUnitData[1],
            taskScheduler: taskSchedulerData[0]
        }
    },
    componentDidMount: function() {
        if(document.getElementById('createMonitorView_Ping') != null) {
            document.getElementById('createMonitorView_Ping').style.height = $(window).height() - 110 - 30 + 'px';
        };
        document.getElementById('hostname_Ping').disabled = this.props.equipmentServerAddress!="" ? true : false;
        if (this.isMounted()) {
          const { monitorsPropertyData,monitorsPropertyEdit,monitor } = this.props;
          if(monitorsPropertyEdit){
            //编辑监测器属性
            if(monitorsPropertyData){
              //monitorsPropertyData 用此值回填
              // BelongID: ""
              // CreatedBy: "admin"
              // CreatedDateTime: "/Date(1462418820000)/"
              // EquipmentId: "87A5DDACAAB54DF4990D1FAC097A14EA"
              // ErrorCheckingTime: "10"
              // ErrorCheckingUnit: "MINUTES"
              // GroupId: "145E242B19AB44A7ADA1D318BDBE23D2"
              // IsDisabled: false
              // IsErrorChecking: false
              // IsKeepalive: true
              // IsRunningAlarm: true
              // LastModBy: "admin"
              // LastModDateTime: "/Date(1463730617000)/"
              // MonitorPackage: "com.siteview.monitor.PingMonitor"
              // MonitorStatus: "good"
              // MonitorTimeOut: "30000"
              // MonitorType: "Ping"
              // MonitorValue: "PERCENT_GOOD=100,ROUND_TRIP_TIME=1.0"
              // RecId: "D8D5C6A7495F44FD85852A9E6EE65BB6"
              // RefreshTime: "10"
              // RefreshUnit: "MINUTES"
              // SpecialProperties: "kInitialPacketCount=3,timeout=4000,size=32,hostname=192.168.9.81"
              // Title: "Ping"
              //TaskScheduler: ""5*8""
              //Description: "描述"
              var SpecialPropertiesTemp = monitorsPropertyData.SpecialProperties;
              var SpecialProperties = SpecialPropertiesTemp.split(","); //ping 的自有属性SpecialProperties:"kInitialPacketCount=3,timeout=4000,size=32,hostname=192.168.9.81"
              for (var i = 0; i < SpecialProperties.length; i++) {
                if (SpecialProperties[i].indexOf("kInitialPacketCount") >= 0) {
                  //ping 执行次数
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#kInitialPacketCount_Ping").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("timeout") >= 0) {
                  //ping 超时（毫秒）
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#timeout_Ping").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("size") >= 0) {
                  //ping 包大小（字节）
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#size_Ping").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("hostname") >= 0) {
                  //ping 主机
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#hostname_Ping").val(temp[1]); //主机
                    }
                  }
                }
              };
              var Title = monitorsPropertyData.Title;
              $("#Title_Ping").val(Title); //标题
              var IsRunningAlarm = monitorsPropertyData.IsRunningAlarm;
              if (IsRunningAlarm) {
                //运用到告警
                // document.getElementById("IsRunningAlarm_Ping").checked=true;
                $("#IsRunningAlarm_Ping").attr("checked", 'true');
              };
              var RefreshTime = monitorsPropertyData.RefreshTime;
              $("#RefreshTime_Ping").val(RefreshTime); //刷新频率
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
                $("#IsErrorChecking_Ping").attr("checked", 'true'); //监测器错误校验
              }
              var ErrorCheckingTime = monitorsPropertyData.ErrorCheckingTime;
              $("#ErrorCheckingTime_Ping").val(ErrorCheckingTime); //错误频率
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
                $("#IsDisabled_Ping").attr("checked", 'true'); //禁用监测器
              };
              var TaskScheduler = monitorsPropertyData.TaskScheduler;
              this.setState({taskScheduler: TaskScheduler});  //任务计划
              var Description = monitorsPropertyData.Description;
              $("#description_Ping").val(Description); //描述
            };
          }else{
              //增加监测器
              $("#hostname_Ping").val("");
              $("#IsRunningAlarm_Ping").attr("checked",true);
              $("#RefreshTime_Ping").val("10");
              $("#Title_Ping").val("Ping");
              $("#kInitialPacketCount_Ping").val("3");
              $("#size_Ping").val("32");
              $("#timeout_Ping").val("5000");
              $("#IsErrorChecking_Ping").attr("checked",false);
              $("#ErrorCheckingTime_Ping").val("0");
              $("#IsDisabled_Ping").attr("checked",false);
              $("#description_Ping").val("");
          }

        };
    },

    handleOnClickSave:function(){
      const { dispatch, monitorsPropertyData, monitorsPropertyEdit, selectedNode} = this.props;
      //保存监测器数据
      //编辑监测器属性-保存
      var specialProperties = ""; //ping 的自有属性 SpecialProperties: "kInitialPacketCount=3,timeout=4000,size=32,hostname=192.168.9.81"
      var kInitialPacketCount = $.trim($("#kInitialPacketCount_Ping").val());//ping 执行次数
      var timeout = $.trim($("#timeout_Ping").val());//ping 超时（毫秒）
      var size = $.trim($("#size_Ping").val());//ping 包大小（字节）
      var hostname = $.trim($("#hostname_Ping").val()); //主机
      if(!this.props.equipmentServerAddress){
        //需要填写主机IP
        if(!hostname){
          $.showPublicDialog("系统提示","请填写主机。");
          return;
        }
      };
      if(kInitialPacketCount){
        if(!Tools.checkNumStr(kInitialPacketCount)){
          $.showPublicDialog("系统提示","无效的执行次数。");
          return;
        };
        specialProperties = "kInitialPacketCount=" + parseInt(kInitialPacketCount);
      };
      if(timeout) {
        if(!Tools.checkNumStr(timeout)){
          $.showPublicDialog("系统提示","无效的超时。");
          return;
        };
        if(specialProperties){
          specialProperties = specialProperties + ",timeout=" + parseInt(timeout);
        }else{
          specialProperties =  "timeout="+ parseInt(timeout);
        }
      };
      if(size) {
        if(!Tools.checkNumStr(size)){
          $.showPublicDialog("系统提示","无效的包大小。");
          return;
        };
        if(specialProperties){
          specialProperties = specialProperties + ",size=" + parseInt(size);
        }else{
          specialProperties =  "size="+ parseInt(size);
        }
      };
      if(hostname) {
        if(specialProperties){
          specialProperties = specialProperties + ",hostname=" + hostname;
        }else{
          specialProperties = "hostname=" + hostname;
        }
      };
      var Title = $.trim($("#Title_Ping").val());//标题
      if(!Title){
        $.showPublicDialog("系统提示","请填写标题。");
        return;
      }
      var IsRunningAlarm = false;
      //运用到告警
      if(document.getElementById("IsRunningAlarm_Ping").checked){
        IsRunningAlarm = true;
      };
      var RefreshTime = $.trim($("#RefreshTime_Ping").val()); //刷新频率
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
      if (document.getElementById("IsErrorChecking_Ping").checked) {
        IsErrorChecking = true;
      };
      var ErrorCheckingTime = $.trim($("#ErrorCheckingTime_Ping").val()); //错误频率;
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
      if (document.getElementById("IsDisabled_Ping").checked) {
        IsDisabled = true; //禁用监测器
      };
      var TaskScheduler = this.state.taskScheduler;//任务计划
      var Description = $.trim($("#description_Ping").val()); //描述

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
          MonitorType: "Ping",
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
          MonitorType: "Ping",
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
          TaskScheduler: TaskScheduler,
          Description: Description,
          MonitorPackage: "com.siteview.monitor.PingMonitor",
          GroupId: GroupId,
          EquipmentId: EquipmentId,
          MonitorStatus: "good",
          MonitorTimeOut: 30000,
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
    handleOnChangeHostname:function(e){
      var hostname = $.trim($("#hostname_Ping").val()); //主机
      var Title = "";
      //Title = $.trim($("#Title_Ping").val());//标题
      Title = "Ping:"+ hostname;
      $("#Title_Ping").val(Title);
    },
    render: function() {
        const { dispatch, monitorErrorAlarmText, monitorWarningAlarmText, monitorGoodAlarmText, monitorErrorConditionsData,
                monitorWarningConditionsData, monitorGoodConditionsData,monitorsPropertyData,monitorsPropertyEdit } = this.props;
        return (
            <div id="createMonitorView_Ping" className="overviewDesViewDiv monitoringSettingTab operationButtons">
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
                            <th rowSpan="2" style={{width:"10%"}}>基本信息</th>
                            <td className="paddingleft10" style={{width:"15%"}}>主机<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input id="hostname_Ping" type="text" onChange={this.handleOnChangeHostname}/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>运用到告警</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="监测器生成事件后告警">
                                    <input id="IsRunningAlarm_Ping" type="checkbox" className="input-checkbox"/>运用到告警
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>刷新频率<span style={{color: "red"}}>*</span></td>
                            <td style={{width:"25%"}}><input id="RefreshTime_Ping" type="number" title="监测器的监测频率"/></td>
                            <td style={{width:"5%"}}><ReactWidgets.DropdownList id="RefreshUnit_Ping" data={timeUnitData} value={this.state.refreshUnit} onChange={this.handleOnChangeRefreshUnit}/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>标题<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input id="Title_Ping" type="text" title="监测器显示的名称"/></td>
                          </tr>

                          <tr>
                            <th rowSpan="5" style={{width:"10%"}}>高级选项</th>
                            <td className="paddingleft10" style={{width:"15%"}}>执行次数</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="kInitialPacketCount_Ping" type="number" title="Ping主机地址的执行次数"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>包大小（字节）</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="size_Ping" type="number" title="Ping消息的大小"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>超时（毫秒）</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="timeout_Ping" type="number" title="在Ping超时之前等待回复的时间"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>校验错误</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="如果监测器检测到错误，立即再次执行监测器校验错误">
                                    <input id="IsErrorChecking_Ping" type="checkbox" className="input-checkbox"/>监测器错误校验
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>错误频率</td>
                            <td style={{width:"25%"}}><input id="ErrorCheckingTime_Ping" type="number" title="处于“错误”条件时监测器刷新频率"/></td>
                            <td style={{width:"5%"}}><ReactWidgets.DropdownList id="ErrorCheckingUnit_Ping" data={timeUnitData} value={this.state.errorCheckingUnit} onChange={this.handleOnChangeErrorCheckingUnit}/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>禁用</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="勾选此项后监测器停止监测">
                                    <input type="checkbox" id="IsDisabled_Ping" className="input-checkbox"/>禁用监测器
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>任务计划</td>
                            <td colSpan="5" style={{width:"75%"}}><ReactWidgets.DropdownList id="taskScheduler_Ping" data={taskSchedulerData} value={this.state.taskScheduler} onChange={this.handleOnChangeTaskScheduler} title="从下拉框中选择监测器执行何种任务计划"/></td>
                          </tr>
                          <tr>
                              <td className="paddingleft10" style={{width:"15%"}}>描述</td>
                              <td colSpan="5" style={{width:"75%"}}><textarea id="description_Ping" className="form-control" style={{height:"60px"}}/></td>
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
    if(document.getElementById('createMonitorView_Ping') != null) {
        document.getElementById('createMonitorView_Ping').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = CreateMonitorView_Ping;
CreateMonitorView_Ping.propTypes = {
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

export default connect(mapStateToProps)(CreateMonitorView_Ping)
