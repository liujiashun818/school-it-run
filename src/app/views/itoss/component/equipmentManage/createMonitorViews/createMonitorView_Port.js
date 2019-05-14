/**
 * Created by SHIN on 2015/12/29.
 * Modified by Yuchen on 2016/05/26 完成.
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

var timeUnitData = [
    {id:'0', name:'小时'},
    {id:'1', name:'分钟'},
    {id:'2', name:'秒钟'}
];
var taskSchedulerData = [
    {id:'0', name:'5*8'},
    {id:'1', name:'7*24'},
    {id:'2', name:'测试'}
];

var CreateMonitorView_Port = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            refreshUnit: timeUnitData[1].id,
            errorCheckingUnit: timeUnitData[1].id,
            taskScheduler: taskSchedulerData[0].id,
        }
    },
    componentDidMount: function() {
      if(document.getElementById('createMonitorView_Port') != null) {
          document.getElementById('createMonitorView_Port').style.height = $(window).height() - 110 - 30 + 'px';
      }
      document.getElementById('hostname_Port').disabled = this.props.equipmentServerAddress!="" ? true : false;
      if (this.isMounted()) {
        const { monitorsPropertyData,monitorsPropertyEdit,monitor } = this.props;
        if(monitorsPropertyEdit){
          //编辑监测器属性
          if(monitorsPropertyData){
            //monitorsPropertyData 用此值回填
            // BelongID: ""
            // CreatedBy: "admin"
            // CreatedDateTime: "/Date(1464233457000)/"
            // Description: ""
            // EquipmentId: "AB0272A3C18F4B8B95E55D93AB575928"
            // ErrorCheckingTime: "13"
            // ErrorCheckingUnit: "HOURS"
            // GroupId: "B1E7723710354074BE00EEBA33C5D23C"
            // IsDisabled: false
            // IsErrorChecking: false
            // IsKeepalive: true
            // IsRunningAlarm: true
            // LastModBy: "admin"
            // LastModDateTime: "/Date(1464311943000)/"
            // MonitorPackage: "com.siteview.monitor.PortMonitor"
            // MonitorStatus: "error"
            // MonitorTimeOut: "5000"
            // MonitorType: "Port"
            // MonitorValue: "STATUS_PORT=Connection refused: connect,ROUND_TRIP_TIME=1012.0"
            // RecId: "2EDEA2E222C04C569E6F71253E582179"
            // RefreshTime: "12"
            // RefreshUnit: "HOURS"
            // SpecialProperties: "port=11,sendString=y1,matchString=y2"
            // TaskScheduler: ""
            // Title: "端口:11"
            var SpecialPropertiesTemp = monitorsPropertyData.SpecialProperties;
            var SpecialProperties = SpecialPropertiesTemp.split(","); //port 的自有属性
            for (var i = 0; i < SpecialProperties.length; i++) {
              if (SpecialProperties[i].indexOf("sendString") >= 0) {
                //发送字节
                var temp = SpecialProperties[i].split("=");
                if (temp.length == 2) {
                  if (temp[1]) {
                    $("#character_Port").val(temp[1]);
                  }
                }
              }
              else if (SpecialProperties[i].indexOf("matchString") >= 0) {
                //匹配字节
                var temp = SpecialProperties[i].split("=");
                if (temp.length == 2) {
                  if (temp[1]) {
                    $("#matchCharacter_Port").val(temp[1]);
                  }
                }
              }
              else if (SpecialProperties[i].indexOf("port") >= 0) {
                //端口号
                var temp = SpecialProperties[i].split("=");
                if (temp.length == 2) {
                  if (temp[1]) {
                    $("#portNumber_Port").val(temp[1]); //端口号
                  }
                }
              }
              else if (SpecialProperties[i].indexOf("hostname") >= 0) {
                //端口号
                var temp = SpecialProperties[i].split("=");
                if (temp.length == 2) {
                  if (temp[1]) {
                    $("#hostname_Port").val(temp[1]); //端口号
                  }
                }
              }
            };

            var Title = monitorsPropertyData.Title;
            $("#Title_Port").val(Title); //标题
            var IsRunningAlarm = monitorsPropertyData.IsRunningAlarm;
            if (IsRunningAlarm) {
              //运用到告警
              // document.getElementById("IsRunningAlarm_Port").checked=true;
              $("#IsRunningAlarm_Port").attr("checked", 'true');
            };
            var RefreshTime = monitorsPropertyData.RefreshTime;
            $("#RefreshTime_Port").val(RefreshTime); //刷新频率
            var RefreshUnit = monitorsPropertyData.RefreshUnit;
            if(RefreshUnit == 'MINUTES'){
              this.setState({refreshUnit: timeUnitData[1]});
            }
            else if(RefreshUnit == 'HOURS'){
              this.setState({refreshUnit: timeUnitData[0]});
            }
            else if(RefreshUnit == 'SECONDS'){
              this.setState({refreshUnit: timeUnitData[2]});
            };
            var MonitorTimeOut = monitorsPropertyData.MonitorTimeOut;
            $("#timeout_Port").val(MonitorTimeOut); //超时
            var IsErrorChecking = monitorsPropertyData.IsErrorChecking;
            if (IsErrorChecking) {
              $("#IsErrorChecking_Port").attr("checked", 'true'); //监测器错误校验
            }
            var ErrorCheckingTime = monitorsPropertyData.ErrorCheckingTime;
            $("#ErrorCheckingTime_Port").val(ErrorCheckingTime); //错误频率
            var ErrorCheckingUnitTemp = monitorsPropertyData.ErrorCheckingUnit;
            if (ErrorCheckingUnitTemp == 'MINUTES') {
              this.setState({errorCheckingUnit: timeUnitData[1]});
            }
            else if (ErrorCheckingUnitTemp == 'HOURS') {
              this.setState({errorCheckingUnit: timeUnitData[0]});
            }
            else if (ErrorCheckingUnitTemp == 'SECONDS') {
              this.setState({errorCheckingUnit: timeUnitData[2]});
            };
            var IsDisabled = monitorsPropertyData.IsDisabled;
            if (IsDisabled) {
              $("#IsDisabled_Port").attr("checked", 'true'); //禁用监测器
            };
            var TaskScheduler = monitorsPropertyData.TaskScheduler;
            this.setState({taskScheduler: TaskScheduler});  //任务计划
            var Description = monitorsPropertyData.Description;
            $("#description_Port").val(Description); //描述
          };
        }
        else{
            //增加监测器
            $("#hostname_Port").val("");//主机
            $("#portNumber_Port").val("");//端口号
            $("#IsRunningAlarm_Port").attr("checked",true);//运用到告警
            $("#RefreshTime_Port").val("10");//刷新频率
            $("#Title_Port").val("Port");//标题
            $("#timeout_Port").val("5000");//超时
            $("#character_Port").val("");//发送字符
            $("#matchCharacter_Port").val("");//匹配字符
            $("#IsErrorChecking_Port").attr("checked",false);//校验错误
            $("#ErrorCheckingTime_Port").val("0");//错误频率
            $("#IsDisabled_Port").attr("checked",false);//禁用
            $("#description_Port").val("");//描述
        }
      }
    },
    handleOnClickSave:function(){
      const { dispatch, monitorsPropertyData, monitorsPropertyEdit, selectedNode} = this.props;
      //保存监测器数据
      //编辑监测器属性-保存
      var specialProperties = ""; //port 的自有属性 SpecialProperties: "port=11,sendString=y1,matchString=y2"
      var port = $.trim($("#portNumber_Port").val());//port 端口号
      var sendString = $.trim($("#character_Port").val());//port 发送字节
      var matchString = $.trim($("#matchCharacter_Port").val());//port 匹配字节
      var hostname = $.trim($("#hostname_Port").val()); //主机
      if(!this.props.equipmentServerAddress){
        //需要填写主机IP
        if(!hostname){
          $.showPublicDialog("系统提示","请填写主机。");
          return;
        }
      };
      if(port.length<=0){
        $.showPublicDialog("系统提示","请填写端口号。");
        return;
      };
      if(port) {
        //端口号
        if(!Tools.checkNumStr(port)){
          $.showPublicDialog("系统提示","无效的端口号。");
          return;
        };
        if(specialProperties){
          specialProperties = specialProperties + ",port=" + parseInt(port);
        }
        else{
          specialProperties =  "port="+ parseInt(port);
        }
      };
      if(sendString) {
        //发送字节
        if(specialProperties){
          specialProperties = specialProperties + ",sendString=" + sendString;
        }
        else{
          specialProperties =  "sendString=" + sendString;
        }
      };
      if(matchString) {
        //匹配字节
        if(specialProperties){
          specialProperties = specialProperties + ",matchString=" + matchString;
        }
        else{
          specialProperties =  "matchString=" + matchString;
        }
      };
      if(hostname) {
        if(specialProperties){
          specialProperties = specialProperties + ",hostname=" + hostname;
        }
        else{
          specialProperties = "hostname=" + hostname;
        }
      };
      var Title = $.trim($("#Title_Port").val());//标题
      if(!Title){
        $.showPublicDialog("系统提示","请填写标题。");
        return;
      }
      var IsRunningAlarm = false;
      //运用到告警
      if(document.getElementById("IsRunningAlarm_Port").checked){
        IsRunningAlarm = true;
      };
      var RefreshTime = $.trim($("#RefreshTime_Port").val()); //刷新频率
      if(!RefreshTime){
        $.showPublicDialog("系统提示","请填写刷新频率。");
        return;
      }
      else{
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
      if(this.state.refreshUnit.id  == '1'){
        RefreshUnit = "MINUTES";
      }
      else if(this.state.refreshUnit.id  == '0'){
        RefreshUnit = "HOURS";
      }
      else if(this.state.refreshUnit.id  == '2'){
        RefreshUnit = "SECONDS";
      };
      var IsErrorChecking = false; //监测器错误校验;
      if (document.getElementById("IsErrorChecking_Port").checked) {
        IsErrorChecking = true;
      };
      var ErrorCheckingTime = $.trim($("#ErrorCheckingTime_Port").val()); //错误频率;
      var iErrorCheckingTime = 0;
      if(ErrorCheckingTime){
        if(!Tools.checkNumStr(ErrorCheckingTime)){
          $.showPublicDialog("系统提示","无效的错误频率。");
          return;
        };
        iErrorCheckingTime = parseInt(ErrorCheckingTime);
      };
      var ErrorCheckingUnit = "MINUTES";
      if(this.state.errorCheckingUnit.id  == '1'){
        ErrorCheckingUnit = "MINUTES";
      }
      else if(this.state.errorCheckingUnit.id  == '0'){
        ErrorCheckingUnit = "HOURS";
      }
      else if(this.state.errorCheckingUnit.id  == '2'){
        ErrorCheckingUnit = "SECONDS";
      };
      var IsDisabled = false;
      if (document.getElementById("IsDisabled_Port").checked) {
        IsDisabled = true; //禁用监测器
      };
      var TaskScheduler = this.state.taskScheduler.name||"";//任务计划
      var Description = $.trim($("#description_Port").val()); //描述
      var MonitorTimeOut = $.trim($("#timeout_Port").val()); //主机

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
          MonitorType: "Port",
          ErrorCheckingTime: iErrorCheckingTime,
          ErrorCheckingUnit: ErrorCheckingUnit,
          IsDisabled: IsDisabled,
          IsErrorChecking: IsErrorChecking,
          IsRunningAlarm: IsRunningAlarm,
          LastModBy: localStorage.getItem("localUserName"),
          RefreshTime: iRefreshTime,
          RefreshUnit: RefreshUnit,
          MonitorTimeOut: MonitorTimeOut,
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
          MonitorType: "Port",
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
          MonitorPackage: "com.siteview.monitor.PortMonitor",
          GroupId: GroupId,
          EquipmentId: EquipmentId,
          MonitorStatus: "good",
          MonitorTimeOut: MonitorTimeOut,
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
        console.log(e);
        this.setState({refreshUnit: e});
    },
    handleOnChangeErrorCheckingUnit: function(e) {
        this.setState({errorCheckingUnit: e});
    },
    handleOnChangeTaskScheduler: function(e) {
        this.setState({taskScheduler: e});
    },
    handleOnChangeHostname:function(e){
      var hostname = $.trim($("#hostname_Port").val()); //主机
      var Title = "";
      Title = "Port:"+ hostname;
      $("#Title_Port").val(Title);
    },
    render: function() {
        const { dispatch, monitorErrorAlarmText, monitorWarningAlarmText, monitorGoodAlarmText, monitorErrorConditionsData,
                monitorWarningConditionsData, monitorGoodConditionsData,monitorsPropertyData,monitorsPropertyEdit } = this.props;
        return (
            <div id="createMonitorView_Port" className="overviewDesViewDiv monitoringSettingTab operationButtons">
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
                            <td className="paddingleft10" style={{width:"15%"}}>主机<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input id="hostname_Port" type="text" onChange={this.handleOnChangeHostname}/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>端口号<span style={{color: "red"}}>*</span></td>
                            <td colSpan="2" style={{width:"30%"}}><input id="portNumber_Port" type="text" title="要连接的端口号"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>运用到告警</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="监测器生成事件后告警">
                                    <input id="IsRunningAlarm_Port" type="checkbox" className="input-checkbox" title="监测器生成事件后告警"/>运用到告警
                                </label>
                            </td>
                            <td className="paddingleft10" style={{width:"15%"}}>刷新频率<span style={{color: "red"}}>*</span></td>
                            <td style={{width:"25%"}}><input id="RefreshTime_Port" type="number" title="监测器的检测频率"/></td>
                            <td style={{width:"5%"}}>
                              <ReactWidgets.DropdownList id="RefreshUnit_Port" data={timeUnitData} valueField='id'
                                value={this.state.refreshUnit} onChange={this.handleOnChangeRefreshUnit} textField='name'/>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>标题<span style={{color: "red"}}>*</span></td>
                            <td colSpan="5" style={{width:"75%"}}><input id="Title_Port" type="text" title="监测器的显示名称"/></td>
                          </tr>

                          <tr>
                            <th rowSpan="5" style={{width:"10%"}}>高级选项</th>
                            <td className="paddingleft10" style={{width:"15%"}}>超时（毫秒）</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="timeout_Port" type="number" title="在Port超时之前等待回复的时间单位为毫秒"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>发送字符</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="character_Port" type="text" title="连接后发送至端口的自定义字符串"/></td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>匹配字符</td>
                            <td colSpan="2" style={{width:"30%"}}><input id="matchCharacter_Port" type="text" title="连接后匹配的文本字符串"/></td>
                            <td className="paddingleft10" style={{width:"15%"}}>校验错误</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="如果监测器检测到错误，立即再次执行监测器校验错误">
                                    <input type="checkbox" id="IsErrorChecking_Port" className="input-checkbox" title="如果监测器检测到错误，立即再次执行监测器以效验错误"/>监测器错误校验
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>错误频率</td>
                            <td style={{width:"25%"}}><input id="ErrorCheckingTime_Port" type="number" title="处于“错误”条件时监测器的刷新频率"/></td>
                            <td style={{width:"5%"}}>
                              <ReactWidgets.DropdownList id="ErrorCheckingUnit_Port" data={timeUnitData} valueField='id'
                                value={this.state.errorCheckingUnit} onChange={this.handleOnChangeErrorCheckingUnit} textField='name'/>
                            </td>
                            <td className="paddingleft10" style={{width:"15%"}}>禁用</td>
                            <td colSpan="2" style={{width:"30%"}}>
                                <label style={{marginBottom:"0",paddingLeft:"5px"}} title="勾选此项后监测器停止监测">
                                    <input type="checkbox" id="IsDisabled_Port" className="input-checkbox" title="勾选此项后监测器停止监测"/>禁用监测器
                                </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="paddingleft10" style={{width:"15%"}}>任务计划</td>
                            <td colSpan="5" style={{width:"75%"}}>
                              <ReactWidgets.DropdownList id="taskScheduler_Port" data={taskSchedulerData} valueField='id'
                                value={this.state.taskScheduler} onChange={this.handleOnChangeTaskScheduler} textField='name' />
                            </td>
                          </tr>
                          <tr>
                              <td className="paddingleft10" style={{width:"15%"}}>描述</td>
                              <td colSpan="5" style={{width:"75%"}}><textarea id="description_Port" className="form-control" style={{height:"60px"}}/></td>
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
    if(document.getElementById('createMonitorView_Port') != null) {
        document.getElementById('createMonitorView_Port').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = CreateMonitorView_Port;
CreateMonitorView_Port.propTypes = {
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

export default connect(mapStateToProps)(CreateMonitorView_Port)
