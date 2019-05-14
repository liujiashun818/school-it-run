/**
* 资源监测-设置-左边列表功能标题页
*/
// var React = require('react');
import React from 'react'
var ReactDOM = require('react-dom');
require('bootstrap');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var base64 = require('../../../../../utils/base64');
var CommonTree = require('../../monitorTree/commonTree');

var SettingLeftList = React.createClass({
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
      var list = [];
        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        var bShowMonitorSet = false,bShowResourceSet = false;
        var bShowAlarmconfig = false;
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/equipmentmanage/setting/alarmconfig") {
                bShowAlarmconfig = true;
                list.push({id:1,name:"视频阀值设置",pid:0,toUrl:"equipmentManage/alarmConfigPage"});
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/setting/monitorset") {
                bShowMonitorSet = true;
                list.push({id:2,name:"其他监测器设置",pid:0,toUrl:"equipmentManage/monitorSetPage"});
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/setting/resourceset") {
                bShowResourceSet = true;
                list.push({id:3,name:"资源设置",pid:0,toUrl:"equipmentManage/resourceSetPage"});
            }
        }
        if(!bShowAlarmconfig) {
            $("#alarmList_alarmConfig").hide();
        }
        if(!bShowMonitorSet) {
            $("#settingList_MonitorConfig").hide();
        }
        if(!bShowResourceSet) {
            $("#settingList_ResourceConfig").hide();
        }

        $(".list-group").find("a").each(function(){
          var $node = $(this);
          $node.mouseover(function(){
            var claz = $node.attr("class");
            var ind = claz.indexOf("active");
            if(ind>=0){
              $node.attr("class","");
              $node.attr("class","list-group-item fadeInMenu active");
            }else{
              $node.attr("class","list-group-item fadeInMenuHover");
            };
          });
          $node.mouseout(function(){
            var claz = $node.attr("class");
            var ind = claz.indexOf("active");
            if(ind>=0){
              $node.attr("class","");
              $node.attr("class","list-group-item fadeInMenu active");
            }else{
              $node.attr("class","list-group-item fadeOutMenuHover");
            };
          });
        });
        this.setState({treeData:list});
    },

    _handleOnClick: function(e) {
        if(e.target.id == 'alarmList_alarmConfig'){
            this.history.pushState(null,'equipmentManage/alarmConfigPage');
        }
        else if(e.target.id == 'settingList_MonitorConfig'){
            this.history.pushState(null,'equipmentManage/monitorSetPage');
        }
        else if(e.target.id == 'settingList_ResourceConfig'){
            this.history.pushState(null,'equipmentManage/resourceSetPage');
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
                <a id="alarmList_alarmConfig"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>视频阀值设置</a>
                <a id="settingList_MonitorConfig"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>其他监测器设置</a>
                <a id="settingList_ResourceConfig"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资源设置</a>
              </div>
            </div>
            <CommonTree data={treeData} curThreeNode={curThreeNode} curName={this.props.curName} setCurName={this.props.curName} preThreeNode={preThreeNode} onGetCurThreeNode={onGetCurThreeNode} onGetPreThreeNode={onGetPreThreeNode}/>
          </div>
        );
      }else{
        return (
          <div className="assetManageListDiv">
            <div className="iq-list" style={{"display":"none"}}>
              <div className="list-group">
                <a id="alarmList_alarmConfig"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>视频阀值设置</a>
                <a id="settingList_MonitorConfig"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>其他监测器设置</a>
                <a id="settingList_ResourceConfig"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资源设置</a>
              </div>
            </div>
          </div>
        );
      };
    }
});

module.exports = SettingLeftList;
