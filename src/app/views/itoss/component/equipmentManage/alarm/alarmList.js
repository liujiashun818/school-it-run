/**
* Created by SHIN  2016/1/22.
* 资源监测-告警左侧树
*/
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var dateChange = require('../../../../../utils/dateChange');
var base64 = require('../../../../../utils/base64');

var CommonTree = require('../../monitorTree/commonTree');

var AlarmList = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     itoss:flux.store("YFTIndexStore").getState()
    //   }
    // },
    getInitialState:function(){
      return {
        treeData:[]
      }
    },
    componentDidMount: function() {
        // dateChange.changeViewStyle();
        var list = [];
        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        var bShowAlarmrulesissue = false, bShowAlarmevent = false,
            bShowReporterror = false, bShowAlarmLog = false, bShowAlarmRule = false, bShowTemplateset = false;
        var level = localStorage.getItem('LEVEL');//1 厅级;2 市级
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmrule") {
                bShowAlarmRule = true;
                list.push({id:1,name:"告警规则",pid:0,toUrl:"equipmentManage/alarmRulePage"});
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/templateset") {
                bShowTemplateset = true;
                list.push({id:2,name:"模板设置",pid:0,toUrl:"equipmentManage/templateSetPage"});
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmrulesissue") {
              // if (level == 1) {
                bShowAlarmrulesissue = true;
                list.push({id:3,name:"厅级升级配置",pid:0,toUrl:"equipmentManage/alarmRulesIssuePage"});
              // }
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmevent") {
                bShowAlarmevent = true;
                list.push({id:4,name:"告警事件列表",pid:0,toUrl:"equipmentManage/alarmEventPage"});
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/reporterror") {
                bShowReporterror = true;
                list.push({id:5,name:"告警升级列表",pid:0,toUrl:"equipmentManage/reportError"});
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmlog") {
                bShowAlarmLog = true;
                list.push({id:6,name:"告警日志",pid:0,toUrl:"equipmentManage/alarmLogPage"});
            }
        }
        if(!bShowAlarmRule) {
            $("#alarmList_alarmRule").hide();
        }
        if(!bShowTemplateset) {
            $("#settingList_TemplateConfig").hide();
        }
        if(!bShowAlarmrulesissue) {
            $("#alarmList_alarmIssue").hide();
        }
        if(!bShowAlarmevent) {
            $("#alarmList_alarmEvent").hide();
        }
        if(!bShowReporterror) {
            $("#alarmList_alarmUpdate").hide();
        }
        if(!bShowAlarmLog) {
            $("#alarmList_alarmLog").hide();
        }
        // $(".list-group").find("a").each(function(){
        //   var $node = $(this);
        //   $node.mouseover(function(){
        //     var claz = $node.attr("class");
        //     var ind = claz.indexOf("active");
        //     if(ind>=0){
        //       $node.attr("class","");
        //       $node.attr("class","list-group-item fadeInMenu active");
        //     }else{
        //       $node.attr("class","list-group-item fadeInMenuHover");
        //     };
        //   });
        //   $node.mouseout(function(){
        //     var claz = $node.attr("class");
        //     var ind = claz.indexOf("active");
        //     if(ind>=0){
        //       $node.attr("class","");
        //       $node.attr("class","list-group-item fadeInMenu active");
        //     }else{
        //       $node.attr("class","list-group-item fadeOutMenuHover");
        //     };
        //   });
        // });
        this.setState({treeData:list});
    },

    _handleOnClick: function(e) {
      if(e.target.id == 'alarmList_alarmRule'){
          this.history.pushState(null,'equipmentManage/alarmRulePage');
      }
      else if(e.target.id == 'settingList_TemplateConfig'){
          this.history.pushState(null,'equipmentManage/templateSetPage');
      }
      else if(e.target.id == 'alarmList_alarmIssue'){
          this.history.pushState(null,'equipmentManage/alarmRulesIssuePage');
      }
      else if(e.target.id == 'alarmList_alarmEvent'){
          this.history.pushState(null,'equipmentManage/alarmEventPage');
      }
      else if(e.target.id == 'alarmList_alarmUpdate'){
          this.history.pushState(null,'equipmentManage/reportError');
      }
      else if(e.target.id == 'alarmList_alarmLog'){
          this.history.pushState(null,'equipmentManage/alarmLogPage');
      }
    },
    render: function() {
      var that = this;
      var treeData = this.state.treeData;
      if(treeData != null && treeData != ""){
        var curThreeNode = that.props.curThreeNode;
        var preThreeNode = that.props.preThreeNode;
        var onGetCurThreeNode = that.props.onGetCurThreeNode;
        var onGetPreThreeNode = that.props.onGetPreThreeNode;
        return (
            <div className="assetManageListDiv">
                <div className="iq-list" style={{"display":"none"}}>
                    <div className="list-group">
                        <a id="alarmList_alarmRule"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>告警规则</a>
                        <a id="settingList_TemplateConfig"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>模板设置</a>
                        <a id="alarmList_alarmIssue"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>厅级升级配置</a>
                        <a id="alarmList_alarmEvent"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>告警事件列表</a>
                        <a id="alarmList_alarmUpdate"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>告警升级列表</a>
                        <a id="alarmList_alarmLog"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>告警日志</a>
                    </div>
                </div>
                <CommonTree data={treeData} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={this.props.setCurName} onGetCurThreeNode={onGetCurThreeNode} onGetPreThreeNode={onGetPreThreeNode}/>
            </div>
        );
      }else{
        return (
          <div className="assetManageListDiv">
              <div className="iq-list" style={{"display":"none"}}>
                  <div className="list-group">
                      <a id="alarmList_alarmRule"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>告警规则</a>
                      <a id="settingList_TemplateConfig"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>模板设置</a>
                      <a id="alarmList_alarmIssue"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>厅级升级配置</a>
                      <a id="alarmList_alarmEvent"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>告警事件列表</a>
                      <a id="alarmList_alarmUpdate"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>告警升级列表</a>
                      <a id="alarmList_alarmLog"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>告警日志</a>
                  </div>
              </div>
          </div>
        );
      };
    }
});

module.exports = AlarmList;
