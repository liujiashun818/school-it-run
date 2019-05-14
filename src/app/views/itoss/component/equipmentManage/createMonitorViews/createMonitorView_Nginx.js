/**
 * Created by SHIN on 2015/12/29.
 * Nginx 完成
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

var CreateMonitorView_Nginx = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },
    getInitialState: function() {
        return {
            refreshUnit: timeUnitData[1],
            errorCheckingUnit: timeUnitData[1],
            taskScheduler: taskSchedulerData[0]
        }
    },
    componentDidMount: function() {
        if(document.getElementById('createMonitorView_Nginx') != null) {
            document.getElementById('createMonitorView_Nginx').style.height = $(window).height() - 110 - 30 + 'px';
        }
        if (this.isMounted()) {
          const { monitorsPropertyData,monitorsPropertyEdit,monitor } = this.props;
          if(monitorsPropertyEdit){
            //编辑监测器属性
            if(monitorsPropertyData){
              var SpecialPropertiesTemp = monitorsPropertyData.SpecialProperties;
              var SpecialProperties = SpecialPropertiesTemp.split(",");
              var timeOut = "";
              var urlStr="";
              var httpProxyServerAddress="";
              var proxyServerUser="";
              var proxyServerPassword="";
              for (var i = 0; i < SpecialProperties.length; i++) {
                var temp = SpecialProperties[i].split("=");
                if(SpecialProperties[i].indexOf("=") > 0){
                  if(temp[0]=="timeOut"){
                    timeOut = temp[1];
                  }else if(temp[0]=="urlStr"){
                    urlStr = temp[1];
                  }else if(temp[0]=="httpProxyServerAddress"){
                    httpProxyServerAddress = temp[1];
                  }
                  else if(temp[0]=="proxyServerUser"){
                    proxyServerUser = temp[1];
                  }
                  else if(temp[0]=="proxyServerPassword"){
                    proxyServerPassword = temp[1];
                  }
                }
              };

              $("#IsTimeOut_Nginx").val(timeOut);//超时
              $("#IsUrlSite_Nginx").val(urlStr);//URL地址
              $("#IsAgency_Nginx").val(httpProxyServerAddress);//代理名称
              $("#IsAgencyUser_Nginx").val(proxyServerUser);//代理用户
              $("#IsAgencyPwd_Nginx").val(proxyServerPassword);//代理密码

              var Title = monitorsPropertyData.Title;
              $("#Title_Nginx").val(Title); //标题
              var IsRunningAlarm = monitorsPropertyData.IsRunningAlarm;
              if (IsRunningAlarm) {
                //运用到告警
                // document.getElementById("IsRunningAlarm_Mysql").checked=true;
                $("#IsRunningAlarm_Nginx").attr("checked", 'true');
              };
              var RefreshTime = monitorsPropertyData.RefreshTime;
              $("#RefreshTime_Nginx").val(RefreshTime); //刷新频率
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
                $("#IsErrorChecking_Nginx").attr("checked", 'true'); //监测器错误校验
              }
              var ErrorCheckingTime = monitorsPropertyData.ErrorCheckingTime;
              $("#ErrorCheckingTime_Nginx").val(ErrorCheckingTime); //错误频率
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
                $("#IsDisabled_Nginx").attr("checked", 'true'); //禁用监测器
              };
              var TaskScheduler = monitorsPropertyData.TaskScheduler;
              this.setState({taskScheduler: TaskScheduler});  //任务计划
              var Description = monitorsPropertyData.Description;
              $("#description_Nginx").val(Description); //描述
            };
          }else{
              const { dispatch } = this.props;
              dispatch(EquipmentActions.setMySqlMonitorPropertyCounterData([]));
              dispatch(EquipmentActions.setMySqlMonitorCurrentCounterData([]));
              //增加监测器
              $("#Title_Nginx").val("Nginx服务器");
              $("#IsRunningAlarm_Nginx").attr("checked",true);
              $("#RefreshTime_Nginx").val("10");
              $("#IsErrorChecking_Nginx").attr("checked",false);
              $("#ErrorCheckingTime_Nginx").val("10");
              $("#IsDisabled_Nginx").attr("checked",false);
              $("#description_Nginx").val("");
          }
        };
    },
    handleOnClickSave:function(){
      const { dispatch, monitorsPropertyData, monitorsPropertyEdit, selectedNode} = this.props;
      //保存监测器数据
      //编辑监测器属性-保存

      var specialProperties = "";
      var timeOut = $.trim($("#IsTimeOut_Nginx").val());
      var urlStr = $.trim($("#IsUrlSite_Nginx").val());
      var httpProxyServerAddress = $.trim($("#IsAgency_Nginx").val());
      var proxyServerUser = $.trim($("#IsAgencyUser_Nginx").val());
      var proxyServerPassword = $.trim($("#IsAgencyPwd_Nginx").val());

      //超时
      if (!timeOut) {
        $.showPublicDialog("系统提示","请填写超时时间。");
        return;
      }

      //URL
      if (!urlStr) {
        $.showPublicDialog("系统提示","请填写URL。");
        return;
      }

      //代理名称
      if (!httpProxyServerAddress) {
        $.showPublicDialog("系统提示","请填写代理名称。");
        return;
      }

      //代理用户
      if (!proxyServerUser) {
        $.showPublicDialog("系统提示","请填写代理用户。");
        return;
      }

      //代理密码
      if (!proxyServerPassword) {
        $.showPublicDialog("系统提示","请填写代理密码。");
        return;
      }

      specialProperties = "timeOut=" + timeOut + ",urlStr=" + urlStr + ",httpProxyServerAddress=" + httpProxyServerAddress + ",proxyServerUser=" + proxyServerUser + ",proxyServerPassword=" + proxyServerPassword;

      var Title = $.trim($("#Title_Nginx").val());//标题
      if(!Title){
        $.showPublicDialog("系统提示","请填写标题。");
        return;
      }
      var IsRunningAlarm = false;
      //运用到告警
      if(document.getElementById("IsRunningAlarm_Nginx").checked){
        IsRunningAlarm = true;
      };
      var RefreshTime = $.trim($("#RefreshTime_Nginx").val()); //刷新频率
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
      if (document.getElementById("IsErrorChecking_Nginx").checked) {
        IsErrorChecking = true;
      };
      var ErrorCheckingTime = $.trim($("#ErrorCheckingTime_Nginx").val()); //错误频率;
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
      if (document.getElementById("IsDisabled_Nginx").checked) {
        IsDisabled = true; //禁用监测器
      };
      var TaskScheduler = this.state.taskScheduler;//任务计划
      var Description = $.trim($("#description_Nginx").val()); //描述

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
          MonitorType: "Nginx",
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
          MonitorType: "Nginx",
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
          MonitorPackage: "com.siteview.monitor.NginxMonitor",
          GroupId: GroupId,
          EquipmentId: EquipmentId,
          MonitorStatus: "good",
          MonitorTimeOut: 30000,
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

    render: function() {
        const { dispatch, monitorErrorAlarmText, monitorWarningAlarmText, monitorGoodAlarmText, monitorErrorConditionsData,
                monitorWarningConditionsData, monitorGoodConditionsData,monitorsPropertyData,monitorsPropertyEdit } = this.props;
        return (
            <div id="createMonitorView_Nginx" className="overviewDesViewDiv monitoringSettingTab operationButtons">
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
                            <td className="paddingleft10" style={{width:"15%"}}>URL<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input id="IsUrlSite_Nginx" type="text" title="填写Nginx服务器管理URL地址"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>运用到告警</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="监测器生成事件后告警">
                                    <input id="IsRunningAlarm_Nginx" type="checkbox" className="input-checkbox"/>运用到告警
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>刷新频率<span style={{color: "red"}}>*</span></td>
                            <td style={{width:"25%"}}><input id="RefreshTime_Nginx" type="number" title="监测器的监测频率"/></td>
                            <td style={{width:"5%"}}><ReactWidgets.DropdownList data={timeUnitData} defaultValue={timeUnitData[1]} textField='name'/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>标题<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input id="Title_Nginx" type="text" title="监测器显示的名称"/></td>
                          </tr>

                          <tr>
                            <th rowSpan="6" style={{width:"10%"}}>高级选项</th>
                            <td className="paddingleft10" style={{width:"15%"}}>代理</td>
                            <td colSpan="5" style={{width:"75%"}}><input id="IsAgency_Nginx" type="text" title="代理显示名称"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>代理用户</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="IsAgencyUser_Nginx" type="text" title="代理用户"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>代理密码</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="IsAgencyPwd_Nginx" type="password" title="代理密码"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>超时</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="IsTimeOut_Nginx" type="number" title="超出时间"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>校验错误</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="如果监测器检测到错误，立即再次执行监测器校验错误">
                                    <input id="IsErrorChecking_Nginx" type="checkbox" className="input-checkbox"/>监测器错误校验
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>错误频率</td>
                            <td style={{width:"25%"}}><input id="ErrorCheckingTime_Nginx" type="number" title="处于“错误”条件时监测器刷新频率"/></td>
                            <td style={{width:"5%"}}><ReactWidgets.DropdownList id="ErrorCheckingUnit_Nginx" data={timeUnitData} defaultValue={timeUnitData[1]} textField='name'/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>禁用</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="勾选此项后监测器停止监测">
                                    <input id="IsDisabled_Nginx" type="checkbox" className="input-checkbox"/>禁用监测器
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>任务计划</td>
                            <td colSpan="5" style={{width:"75%"}}><ReactWidgets.DropdownList id="taskScheduler_Nginx" data={taskSchedulerData} defaultValue={taskSchedulerData[0]} textField='name'/></td>
                          </tr>
                          <tr>
                              <td className="paddingleft10" style={{width:"15%"}}>描述</td>
                              <td colSpan="5" style={{width:"75%"}}><textarea id="description_Nginx" className="form-control" style={{height:"60px"}}/></td>
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
    if(document.getElementById('createMonitorView_Nginx') != null) {
        document.getElementById('createMonitorView_Nginx').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = CreateMonitorView_Nginx;
CreateMonitorView_Nginx.propTypes = {
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

export default connect(mapStateToProps)(CreateMonitorView_Nginx)
