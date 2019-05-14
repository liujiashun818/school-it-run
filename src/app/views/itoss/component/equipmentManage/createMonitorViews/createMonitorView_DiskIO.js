/**
 * Created by SHIN on 2015/12/29.
 * DiskIO by Fenzhou on 2016/06/15 完成.
 */
require('bootstrap');
import React, { PropTypes } from 'react';
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

var bUpdateInDidMount = false;
var CreateMonitorView_DiskIO = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            refreshUnit: timeUnitData[1],
            errorCheckingUnit: timeUnitData[1],
            taskScheduler: taskSchedulerData[0]
        };
      },

    componentDidMount: function() {
          if(document.getElementById('createMonitorView_DiskIO') != null) {
              document.getElementById('createMonitorView_DiskIO').style.height = $(window).height() - 110 - 30 + 'px';
          };
          if (this.isMounted()) {
            const { dispatch, monitorsPropertyData,monitorsPropertyEdit,monitor } = this.props;
            if(monitorsPropertyEdit){
              //编辑监测器属性
              if(monitorsPropertyData){
                var SpecialPropertiesTemp = monitorsPropertyData.SpecialProperties;
                var SpecialProperties = SpecialPropertiesTemp.split(",");
                var diskName = "", oid = "";
                for (var i = 0; i < SpecialProperties.length; i++) {
                  if (SpecialProperties[i].indexOf("diskName") >= 0) {
                    var temp = SpecialProperties[i].split("=");
                    if (temp.length == 2) {
                      if (temp[1]) {
                        diskName = temp[1];
                      }
                    }
                  } else if (SpecialProperties[i].indexOf("oid") >= 0) {
                    var temp = SpecialProperties[i].split("=");
                    if (temp.length == 2) {
                      if (temp[1]) {
                        oid = temp[1];
                      }
                    }
                  }
                };
                dispatch(EquipmentActions.setSelectedMonitorDisk({name:diskName, oid:oid}));
                bUpdateInDidMount = true;
                var Title = monitorsPropertyData.Title;
                $("#Title_DiskIO").val(Title); //标题
                var IsRunningAlarm = monitorsPropertyData.IsRunningAlarm;
                if (IsRunningAlarm) {
                  //运用到告警
                  // document.getElementById("IsRunningAlarm_DiskIO").checked=true;
                  $("#IsRunningAlarm_DiskIO").attr("checked", 'true');
                };
                var RefreshTime = monitorsPropertyData.RefreshTime;
                $("#RefreshTime_DiskIO").val(RefreshTime); //刷新频率
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
                  $("#IsErrorChecking_DiskIO").attr("checked", 'true'); //监测器错误校验
                }
                var ErrorCheckingTime = monitorsPropertyData.ErrorCheckingTime;
                $("#ErrorCheckingTime_DiskIO").val(ErrorCheckingTime); //错误频率
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
                  $("#IsDisabled_DiskIO").attr("checked", 'true'); //禁用监测器
                };
                var TaskScheduler = monitorsPropertyData.TaskScheduler;
                this.setState({taskScheduler: TaskScheduler});  //任务计划
                var Description = monitorsPropertyData.Description;
                $("#description_DiskIO").val(Description); //描述
              };
            }else{
                //增加监测器
                $("#diskName_DiskIO").val("");
                $("#IsRunningAlarm_DiskIO").attr("checked",true);
                $("#RefreshTime_DiskIO").val("10");
                $("#Title_DiskIO").val("");
                $("#IsErrorChecking_DiskIO").attr("checked",false);
                $("#ErrorCheckingTime_DiskIO").val("0");
                $("#IsDisabled_DiskIO").attr("checked",false);
                $("#description_DiskIO").val("");
            }

          };
      },

    shouldComponentUpdate: function(nextProps, nextState) {
          if (!bUpdateInDidMount && nextProps.selectedMonitorDiskIOName !== this.props.selectedMonitorDiskIOName) {
              var diskName = nextProps.selectedMonitorDiskIOName ? nextProps.selectedMonitorDiskIOName : ""
              var Title = "磁盘:"+ diskName;
              $("#Title_DiskIO").val(Title);
          }
          bUpdateInDidMount = false;
          return true;
      },

    componentWillUnmount: function() {
          const { dispatch } = this.props;
          dispatch(EquipmentActions.setSelectedMonitorDisk(null));
      },

    handleOnClickSave:function(){
      const { dispatch, monitorsPropertyData, monitorsPropertyEdit, selectedNode, selectedMonitorDiskIOName} = this.props;
      //保存监测器数据
      //编辑监测器属性-保存
      var specialProperties = "";
      var diskName = $.trim($("#diskName_DiskIO").val());
      if(!diskName){
        $.showPublicDialog("系统提示","请选择磁盘。");
        return;
      }else{
          if(selectedMonitorDiskIOName.oid == "") {
              specialProperties = "diskName=" + diskName;
          }
          else {
              specialProperties = "oid=" + selectedMonitorDiskIOName.oid + ",diskName=" + diskName;
          }
      };
      var Title = $.trim($("#Title_DiskIO").val());//标题
      if(!Title){
        $.showPublicDialog("系统提示","请填写标题。");
        return;
      }
      var IsRunningAlarm = false;
      //运用到告警
      if(document.getElementById("IsRunningAlarm_DiskIO").checked){
        IsRunningAlarm = true;
      };
      var RefreshTime = $.trim($("#RefreshTime_DiskIO").val()); //刷新频率
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
      if (document.getElementById("IsErrorChecking_DiskIO").checked) {
        IsErrorChecking = true;
      };
      var ErrorCheckingTime = $.trim($("#ErrorCheckingTime_DiskIO").val()); //错误频率;
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
      if (document.getElementById("IsDisabled_DiskIO").checked) {
        IsDisabled = true; //禁用监测器
      };
      var TaskScheduler = this.state.taskScheduler;//任务计划
      var Description = $.trim($("#description_DiskIO").val()); //描述

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
          MonitorType: "DiskIO",
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
          MonitorType: "DiskIO",
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
          MonitorPackage: "com.siteview.monitor.disk.io.DiskIOMonitor",
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

    handleOnClickGetMonitorDiskIOName:function(){
        const { dispatch, selectedNode } = this.props;
        dispatch(EquipmentActions.getMonitorDiskIONames(selectedNode.id));
    },

    render: function() {
        const { dispatch, monitorErrorAlarmText, monitorWarningAlarmText, monitorGoodAlarmText, monitorErrorConditionsData,
                monitorWarningConditionsData, monitorGoodConditionsData,monitorsPropertyData,monitorsPropertyEdit, selectedMonitorDiskIOName } = this.props;
        return (
            <div id="createMonitorView_DiskIO" className="overviewDesViewDiv monitoringSettingTab operationButtons">
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
                            <td className="paddingleft10" style={{width:"15%"}}>磁盘<span style={{color: "red"}}>*</span></td>
                            <td style={{width:"25%"}}><input id="diskName_DiskIO" type="text" value={selectedMonitorDiskIOName?selectedMonitorDiskIOName:""}/></td>
                            <td style={{width:"5%"}}><button type="button" className="btn btn-default btnGetModel" style={{width:"100%"}} data-toggle="modal" data-target="#monitorDiskIOTableModal" onClick={this.handleOnClickGetMonitorDiskIOName}>获取磁盘列表</button></td>
                            <td className="paddingleft10" style={{width:"15%"}}>运用到告警</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="监测器生成事件后告警">
                                    <input id="IsRunningAlarm_DiskIO" type="checkbox" className="input-checkbox"/>运用到告警
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>刷新频率<span style={{color: "red"}}>*</span></td>
                            <td style={{width:"25%"}}><input id="RefreshTime_DiskIO" type="number" title="监测器的监测频率"/></td>
                            <td style={{width:"5%"}}><ReactWidgets.DropdownList id="RefreshUnit_DiskIO" data={timeUnitData} defaultValue={timeUnitData[1]} textField='name'/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>标题<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input id="Title_DiskIO" type="text" title="监测器显示的名称"/></td>
                          </tr>

                          <tr>
                            <th rowSpan="3" style={{width:"10%"}}>高级选项</th>
                            <td className="paddingleft10" style={{width:"15%"}}>校验错误</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="如果监测器检测到错误，立即再次执行监测器校验错误">
                                    <input id="IsErrorChecking_DiskIO" type="checkbox" className="input-checkbox"/>监测器错误校验
                                </label>
                            </td>
                            <td className="paddingleft10" style={{width:"15%"}}>错误频率</td>
                            <td style={{width:"25%"}}><input id="ErrorCheckingTime_DiskIO" type="number" title="处于“错误”条件时监测器刷新频率"/></td>
                            <td style={{width:"5%"}}><ReactWidgets.DropdownList id="ErrorCheckingUnit_DiskIO" data={timeUnitData} defaultValue={timeUnitData[1]} textField='name' value={this.state.errorCheckingUnit} onChange={this.handleOnChangeErrorCheckingUnit}/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>禁用</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="勾选此项后监测器停止监测">
                                    <input id="IsDisabled_DiskIO" type="checkbox" className="input-checkbox"/>禁用监测器
                                </label>
                            </td>
                            <td className="paddingleft10" style={{width:"15%"}}>任务计划</td>
                            <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList id="taskScheduler_DiskIO" data={taskSchedulerData} defaultValue={taskSchedulerData[0]} textField='name' value={this.state.taskScheduler} onChange={this.handleOnChangeTaskScheduler} title="从下拉框中选择监测器执行何种任务计划"/></td>
                          </tr>
                          <tr>
                              <td className="paddingleft10" style={{width:"15%"}}>描述</td>
                              <td colSpan="5" style={{width:"75%"}}><textarea id="description_DiskIO" className="form-control" style={{height:"60px"}}/></td>
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
    if(document.getElementById('createMonitorView_DiskIO') != null) {
        document.getElementById('createMonitorView_DiskIO').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = CreateMonitorView_DiskIO;
CreateMonitorView_DiskIO.propTypes = {
  monitorErrorAlarmText: PropTypes.string.isRequired,
  monitorWarningAlarmText: PropTypes.string.isRequired,
  monitorGoodAlarmText: PropTypes.string.isRequired,
  monitorErrorConditionsData: PropTypes.array.isRequired,
  monitorWarningConditionsData: PropTypes.array.isRequired,
  monitorGoodConditionsData: PropTypes.array.isRequired,
  equipmentServerAddress: PropTypes.string.isRequired,
  selectedMonitorDiskIOName: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { monitorErrorAlarmText, monitorWarningAlarmText, monitorGoodAlarmText, monitorErrorConditionsData, monitorWarningConditionsData,
          monitorGoodConditionsData, equipmentServerAddress, monitorsPropertyData, monitorsPropertyEdit, selectedNode, selectedMonitorDiskIOName } = state.equipmentReducer

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
    selectedMonitorDiskIOName
  }
}

export default connect(mapStateToProps)(CreateMonitorView_DiskIO)
