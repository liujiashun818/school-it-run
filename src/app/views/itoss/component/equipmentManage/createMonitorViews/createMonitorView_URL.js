/**
 * Created by SHIN on 2015/12/29.
 * URL 完成
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

var CreateMonitorView_URL = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            refreshUnit: timeUnitData[1],
            errorCheckingUnit: timeUnitData[1],
            taskScheduler: taskSchedulerData[0]
        }
    },

    componentDidMount: function() {
        if(document.getElementById('createMonitorView_URL') != null) {
            document.getElementById('createMonitorView_URL').style.height = $(window).height() - 110 - 30 + 'px';
        }
        if (this.isMounted()) {
          const { monitorsPropertyData,monitorsPropertyEdit,monitor } = this.props;
          if(monitorsPropertyEdit){
            //编辑监测器属性
            if(monitorsPropertyData){
              var SpecialPropertiesTemp = monitorsPropertyData.SpecialProperties;
              var SpecialProperties = SpecialPropertiesTemp.split(",");
              for (var i = 0; i < SpecialProperties.length; i++) {
                if (SpecialProperties[i].indexOf("timeOut") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#timeOut_URL").val(temp[1]);
                    }
                  }
              } else if (SpecialProperties[i].indexOf("urlStr") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#urlStr_URL").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("matchContent") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#matchContent_URL").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("httpProxyServerAddress") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#httpProxyServerAddress_URL").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("proxyServerUser") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#proxyServerUser_URL").val(temp[1]);
                    }
                  }
                } else if (SpecialProperties[i].indexOf("proxyServerPassword") >= 0) {
                  var temp = SpecialProperties[i].split("=");
                  if (temp.length == 2) {
                    if (temp[1]) {
                      $("#proxyServerPassword_URL").val(temp[1]);
                    }
                  }
                }
              };
              var Title = monitorsPropertyData.Title;
              $("#Title_URL").val(Title); //标题
              var IsRunningAlarm = monitorsPropertyData.IsRunningAlarm;
              if (IsRunningAlarm) {
                //运用到告警
                $("#IsRunningAlarm_URL").attr("checked", 'true');
              };
              var RefreshTime = monitorsPropertyData.RefreshTime;
              $("#RefreshTime_URL").val(RefreshTime); //刷新频率
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
                $("#IsErrorChecking_URL").attr("checked", 'true'); //监测器错误校验
              }
              var ErrorCheckingTime = monitorsPropertyData.ErrorCheckingTime;
              $("#ErrorCheckingTime_URL").val(ErrorCheckingTime); //错误频率
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
                $("#IsDisabled_URL").attr("checked", 'true'); //禁用监测器
              };
              var TaskScheduler = monitorsPropertyData.TaskScheduler;
              this.setState({taskScheduler: TaskScheduler});  //任务计划
              var Description = monitorsPropertyData.Description;
              $("#description_URL").val(Description); //描述
            };
          }else{
              //增加监测器
              $("#urlStr_URL").val("");
              $("#matchContent_URL").val("");
              $("#IsRunningAlarm_URL").attr("checked",true);
              $("#RefreshTime_URL").val("10");
              $("#Title_URL").val("URL");
              $("#httpProxyServerAddress_URL").val("");
              $("#timeOut_URL").val("5000");
              $("#proxyServerUser_URL").val("");
              $("#proxyServerPassword_URL").val("");
              $("#IsErrorChecking_URL").attr("checked",false);
              $("#ErrorCheckingTime_URL").val("10");
              $("#IsDisabled_URL").attr("checked",false);
              $("#description_URL").val("");
          }

        };
    },

    handleOnClickSave:function(){
      const { dispatch, monitorsPropertyData, monitorsPropertyEdit, selectedNode} = this.props;
      //保存监测器数据
      //编辑监测器属性-保存
      var specialProperties = "";
      var urlStr = $.trim($("#urlStr_URL").val());
      var matchContent = $.trim($("#matchContent_URL").val());
      var httpProxyServerAddress = $.trim($("#httpProxyServerAddress_URL").val());
      var proxyServerUser = $.trim($("#proxyServerUser_URL").val());
      var proxyServerPassword = $.trim($("#proxyServerPassword_URL").val());
      var timeOut = $.trim($("#timeOut_URL").val());
      if(!urlStr){
        $.showPublicDialog("系统提示","请填写URL。");
        return;
      }else{
        specialProperties = "urlStr=" + urlStr;
      };
      if(matchContent) {
        if(specialProperties){
          specialProperties = specialProperties + ",matchContent=" + matchContent;
        }else{
          specialProperties =  "matchContent="+ matchContent;
        }
      };
      if(httpProxyServerAddress) {
        if(specialProperties){
          specialProperties = specialProperties + ",httpProxyServerAddress=" + httpProxyServerAddress;
        }else{
          specialProperties =  "httpProxyServerAddress="+ httpProxyServerAddress;
        }
      };
      if(proxyServerUser) {
        if(specialProperties){
          specialProperties = specialProperties + ",proxyServerUser=" + proxyServerUser;
        }else{
          specialProperties =  "proxyServerUser="+ proxyServerUser;
        }
      };
      if(proxyServerPassword) {
        if(specialProperties){
          specialProperties = specialProperties + ",proxyServerPassword=" + proxyServerPassword;
        }else{
          specialProperties =  "proxyServerPassword="+ proxyServerPassword;
        }
      };
      if(timeOut) {
        if(!Tools.checkNumStr(timeOut)){
          $.showPublicDialog("系统提示","无效的超时。");
          return;
        };
        if(specialProperties){
          specialProperties = specialProperties + ",timeOut=" + parseInt(timeOut);
        }else{
          specialProperties =  "timeOut="+ parseInt(timeOut);
        }
      };
      var Title = $.trim($("#Title_URL").val());//标题
      if(!Title){
        $.showPublicDialog("系统提示","请填写标题。");
        return;
      }
      var IsRunningAlarm = false;
      //运用到告警
      if(document.getElementById("IsRunningAlarm_URL").checked){
        IsRunningAlarm = true;
      };
      var RefreshTime = $.trim($("#RefreshTime_URL").val()); //刷新频率
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
      if (document.getElementById("IsErrorChecking_URL").checked) {
        IsErrorChecking = true;
      };
      var ErrorCheckingTime = $.trim($("#ErrorCheckingTime_URL").val()); //错误频率;
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
      if (document.getElementById("IsDisabled_URL").checked) {
        IsDisabled = true; //禁用监测器
      };
      var TaskScheduler = this.state.taskScheduler;//任务计划
      var Description = $.trim($("#description_URL").val()); //描述

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
          MonitorType: "URL",
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
          MonitorType: "URL",
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
          MonitorPackage: "com.siteview.monitor.URLMonitor",
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

    handleOnChangeUrlStr:function(e){
      var urlStr = $.trim($("#urlStr_URL").val());
      var Title = "";
      Title = "URL:"+ urlStr;
      $("#Title_URL").val(Title);
    },

    render: function() {
        const { dispatch, monitorErrorAlarmText, monitorWarningAlarmText, monitorGoodAlarmText, monitorErrorConditionsData,
                monitorWarningConditionsData, monitorGoodConditionsData,monitorsPropertyData,monitorsPropertyEdit } = this.props;
        return (
            <div id="createMonitorView_URL" className="overviewDesViewDiv monitoringSettingTab operationButtons">
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
                            <td className="paddingleft10" style={{width:"15%"}}>URL<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input id="urlStr_URL" type="text" onChange={this.handleOnChangeUrlStr} title="请输入要监测的网址。例：http://www.siteview.com"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>匹配内容</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="matchContent_URL" type="text" title="（可选），匹配指定字符串或正则表达式"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>运用到告警</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="监测器生成事件后告警">
                                    <input id="IsRunningAlarm_URL" type="checkbox" className="input-checkbox"/>运用到告警
                                </label>
                            </td>
                            <td className="paddingleft10" style={{width:"15%"}}>刷新频率<span style={{color: "red"}}>*</span></td>
                            <td style={{width:"25%"}}><input id="RefreshTime_URL" type="number" title="监测器的监测频率"/></td>
                            <td style={{width:"5%"}}>
                              <ReactWidgets.DropdownList id="RefreshUnit_URL" data={timeUnitData} value={this.state.refreshUnit} onChange={this.handleOnChangeRefreshUnit}/>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>标题<span style={{color: "red"}}>*</span></td>
                            <td colSpan="5" style={{width:"75%"}}><input id="Title_URL" type="text" title="监测器显示的名称"/></td>
                          </tr>
                          <tr>
                            <th rowSpan="5" style={{width:"10%"}}>高级选项</th>
                            <td className="paddingleft10" style={{width:"15%"}}>代理</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="httpProxyServerAddress_URL" type="text" title="HTTP代理服务器地址及端口，例如：192.168.4.67:8080"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>超时</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="timeOut_URL" type="number" title="URL响应的超时时间，（单位：毫秒）"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>代理用户</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="proxyServerUser_URL" type="text" title="可选项，输入代理服务器的用户名称"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>代理密码</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="proxyServerPassword_URL" type="password" title="可选项，输入代理服务器的用户密码"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>校验错误</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="如果监测器检测到错误，立即再次执行监测器校验错误">
                                    <input id="IsErrorChecking_URL" type="checkbox" className="input-checkbox"/>监测器错误校验
                                </label>
                            </td>
                            <td className="paddingleft10" style={{width:"15%"}}>错误频率</td>
                            <td style={{width:"25%"}}><input id="ErrorCheckingTime_URL" type="number" title="处于“错误”条件时监测器刷新频率"/></td>
                            <td style={{width:"5%"}}>
                              <ReactWidgets.DropdownList id="ErrorCheckingUnit_URL" data={timeUnitData} value={this.state.errorCheckingUnit} onChange={this.handleOnChangeErrorCheckingUnit}/>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>禁用</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="勾选此项后监测器停止监测">
                                    <input id="IsDisabled_URL" type="checkbox" className="input-checkbox"/>禁用监测器
                                </label>
                            </td>
                            <td className="paddingleft10" style={{width:"15%"}}>任务计划</td>
                            <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList id="taskScheduler_URL" data={taskSchedulerData} value={this.state.taskScheduler} onChange={this.handleOnChangeTaskScheduler} title="从下拉框中选择监测器执行何种任务计划"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>描述</td>
                            <td colSpan="5" style={{width:"75%"}}>
                                <textarea id="description_URL" className="form-control" style={{height:"60px"}}></textarea>
                            </td>
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
    if(document.getElementById('createMonitorView_URL') != null) {
        document.getElementById('createMonitorView_URL').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = CreateMonitorView_URL;
CreateMonitorView_URL.propTypes = {
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

export default connect(mapStateToProps)(CreateMonitorView_URL)
