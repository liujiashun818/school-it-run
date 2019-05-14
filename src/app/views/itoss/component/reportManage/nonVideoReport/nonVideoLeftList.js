/**
 * Created by SHIN on 2015/12/29.
 */
require('bootstrap');

// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var base64 = require('../../../../../utils/base64');
var CommonTree = require('../../monitorTree/commonTree');

var NonVideoLeftList = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     itoss:flux.store("YFTIndexStore").getState()
    //   }
    // },
    getInitialState: function() {
        return {
            treeData: []
        }
    },
    componentDidMount: function(){
        var list = [];
        // var bShowDvrstatisticsreport = false, bShowNvrstatisticsreport = false, bShowEncoderstatisticsreport = false, bShowServerstatisticsreport = false, bShowNetworkstatisticsreport = false, bShowFirewallstatisticsreport = false, bShowDatabasestatisticsreport = false;
        // var temp = localStorage.getItem("PERMISSIONS");
        // temp = base64.base64decode(temp);
        // temp = decodeURI(temp);
        // var permissionsValue = eval(temp);
        // for(var i = 0; i < permissionsValue.length; i++) {
        //     if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/dvrstatisticsreport") {
        //         bShowDvrstatisticsreport = true;
                list.push({id:1,name:"DVR统计",pid:0,toUrl:"reportManage/nonVideoReport/dvrStatisticsReportPage"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/nvrstatisticsreport") {
            //     bShowNvrstatisticsreport = true;
                list.push({id:2,name:"NVR统计",pid:0,toUrl:"reportManage/nonVideoReport/nvrStatisticsReportPage"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/encoderstatisticsreport") {
            //     bShowEncoderstatisticsreport = true;
                list.push({id:3,name:"编码器统计",pid:0,toUrl:"reportManage/nonVideoReport/encoderStatisticsReportPage"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/serverstatisticsreport") {
            //     bShowServerstatisticsreport = true;
                list.push({id:4,name:"服务器统计",pid:0,toUrl:"reportManage/nonVideoReport/serverStatisticsReportPage"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/networkstatisticsreport") {
            //     bShowNetworkstatisticsreport = true;
                list.push({id:5,name:"网络设备统计",pid:0,toUrl:"reportManage/nonVideoReport/networkStatisticsReportPage"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/firewallstatisticsreport") {
            //     bShowFirewallstatisticsreport = true;
                list.push({id:6,name:"防火墙统计",pid:0,toUrl:"reportManage/nonVideoReport/firewallStatisticsReportPage"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/nonvideo/databasestatisticsreport") {
            //     bShowDatabasestatisticsreport = true;
                list.push({id:7,name:"数据库统计",pid:0,toUrl:"reportManage/nonVideoReport/databaseStatisticsReportPage"});
        //     }
        // }
        // if(!bShowDvrstatisticsreport) {
        //     $("#nonVideo_left_a1").hide();
        // }
        // if(!bShowNvrstatisticsreport) {
        //     $("#nonVideo_left_a2").hide();
        // }
        // if(!bShowEncoderstatisticsreport) {
        //     $("#nonVideo_left_a3").hide();
        // }
        // if(!bShowServerstatisticsreport) {
        //     $("#nonVideo_left_a4").hide();
        // }
        // if(!bShowNetworkstatisticsreport) {
        //     $("#nonVideo_left_a5").hide();
        // }
        // if(!bShowFirewallstatisticsreport) {
        //     $("#nonVideo_left_a6").hide();
        // }
        // if(!bShowDatabasestatisticsreport) {
        //     $("#nonVideo_left_a7").hide();
        // }
        this.setState({treeData:list});
    },
    _handleOnClick: function(e) {
        if(e.currentTarget.id == 'nonVideo_left_a1'){
            this.history.pushState(null,'reportManage/nonVideoReport/dvrStatisticsReportPage');
        }else if(e.currentTarget.id == 'nonVideo_left_a2'){
            this.history.pushState(null,'reportManage/nonVideoReport/nvrStatisticsReportPage');
        }else if(e.currentTarget.id == 'nonVideo_left_a3'){
            this.history.pushState(null,'reportManage/nonVideoReport/encoderStatisticsReportPage');
        }else if(e.currentTarget.id == 'nonVideo_left_a4'){
            this.history.pushState(null,'reportManage/nonVideoReport/serverStatisticsReportPage');
        }else if(e.currentTarget.id == 'nonVideo_left_a5'){
            this.history.pushState(null,'reportManage/nonVideoReport/networkStatisticsReportPage');
        }else if(e.currentTarget.id == 'nonVideo_left_a6'){
            this.history.pushState(null,'reportManage/nonVideoReport/firewallStatisticsReportPage');
        }else if(e.currentTarget.id == 'nonVideo_left_a7'){
            this.history.pushState(null,'reportManage/nonVideoReport/databaseStatisticsReportPage');
        }
    },
    render: function() {
      const { curThreeNode, preThreeNode, onGetCurThreeNode, onGetPreThreeNode } = this.props;
      var treeData = this.state.treeData;
      if(treeData != null && treeData != ""){
        return (
          <div className='leftListDiv col-md-1'>
            <div className="assetManageListDiv">
              <div className="iq-list" style={{"display":"none"}}>
                <div className="list-group">
                  <a className={"list-group-item" + (this.props.activeMenu == 1 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a1">DVR统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 2 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a2">NVR统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 3 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a3">编码器统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 4 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a4">服务器统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 5 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a5">网络设备统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 6 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a6">防火墙统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 7 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a7">数据库统计</a>
                </div>
              </div>
              <CommonTree data={treeData} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={this.props.setCurName} onGetCurThreeNode={onGetCurThreeNode} onGetPreThreeNode={onGetPreThreeNode}/>
            </div>
          </div>
        );
      }else{
        return (
          <div className='leftListDiv col-md-1'>
            <div className="assetManageListDiv">
              <div className="iq-list" style={{"display":"none"}}>
                <div className="list-group">
                  <a className={"list-group-item" + (this.props.activeMenu == 1 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a1">DVR统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 2 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a2">NVR统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 3 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a3">编码器统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 4 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a4">服务器统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 5 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a5">网络设备统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 6 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a6">防火墙统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 7 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a7">数据库统计</a>
                </div>
              </div>
            </div>
          </div>
        );
      };
    },
});

NonVideoLeftList.propTypes = {
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    onGetCurThreeNode: PropTypes.func.isRequired,
    onGetPreThreeNode: PropTypes.func.isRequired
}

module.exports = NonVideoLeftList;
