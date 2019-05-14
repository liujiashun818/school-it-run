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

var VideoLeftBar = React.createClass({
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
        // var bShowCameravideocheck = false, bShowCameraofflinereport = false, bShowCameramedialostreport = false, bShowCameravideolostreport = false, bShowCameravideorealtimereport = false, bShowCameraonlinetrendsreport = false;
        // var temp = localStorage.getItem("PERMISSIONS");
        // temp = base64.base64decode(temp);
        // temp = decodeURI(temp);
        // var permissionsValue = eval(temp);
        // for(var i = 0; i < permissionsValue.length; i++) {
            // if(permissionsValue[i].resourceType == "/reportmanage/video/cameravideocheck") {
            //     bShowCameravideocheck = true;
                list.push({id:1,name:"摄像机视频考核",pid:0,toUrl:"reportManage/videoReport/cameraVideoCheck"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameraofflinereport") {
            //     bShowCameraofflinereport = true;
                list.push({id:2,name:"摄像机离线状态详细统计",pid:0,toUrl:"reportManage/videoReport/cameraOfflineReport"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameramedialostreport") {
            //     bShowCameramedialostreport = true;
                list.push({id:3,name:"摄像机录像丢失详细统计",pid:0,toUrl:"reportManage/videoReport/cameraMediaLostReport"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameravideolostreport") {
            //     bShowCameravideolostreport = true;
                list.push({id:4,name:"摄像机视频丢失详细统计",pid:0,toUrl:"reportManage/videoReport/cameraVideoLostReport"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameravideorealtimereport") {
            //     bShowCameravideorealtimereport = true;
                list.push({id:5,name:"摄像机视频质量实时统计",pid:0,toUrl:"reportManage/videoReport/cameraVideoRealTimeReport"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameraonlinetrendsreport") {
            //     bShowCameraonlinetrendsreport = true;
                list.push({id:6,name:"摄像机在线趋势图",pid:0,toUrl:"reportManage/videoReport/cameraOnlineTrendsReport"});
            // }
        // }
        // if(!bShowCameravideocheck) {
        //     $("#camera_left_a1").hide();
        // }
        // if(!bShowCameraofflinereport) {
        //     $("#camera_left_a2").hide();
        // }
        // if(!bShowCameramedialostreport) {
        //     $("#camera_left_a3").hide();
        // }
        // if(!bShowCameravideolostreport) {
        //     $("#camera_left_a4").hide();
        // }
        // if(!bShowCameravideorealtimereport) {
        //     $("#camera_left_a5").hide();
        // }
        // if(!bShowCameraonlinetrendsreport) {
        //     $("#camera_left_a6").hide();
        // }
        this.setState({treeData:list});
    },
    _handleOnClick: function(e) {
        if(e.currentTarget.id == 'camera_left_a1'){
            this.history.pushState(null,'reportManage/videoReport/cameraVideoCheck');
        }else if(e.currentTarget.id == 'camera_left_a2'){
            this.history.pushState(null,'reportManage/videoReport/cameraOfflineReport');
        }else if(e.currentTarget.id == 'camera_left_a3'){
            this.history.pushState(null,'reportManage/videoReport/cameraMediaLostReport');
        }else if(e.currentTarget.id == 'camera_left_a4'){
            this.history.pushState(null,'reportManage/videoReport/cameraVideoLostReport');
        }else if(e.currentTarget.id == 'camera_left_a5'){
            this.history.pushState(null,'reportManage/videoReport/cameraVideoRealTimeReport');
        }else if(e.currentTarget.id == 'camera_left_a6'){
            this.history.pushState(null,'reportManage/videoReport/cameraOnlineTrendsReport');
        }
    },
    render: function() {
      const { curThreeNode, preThreeNode, onGetCurThreeNode, onGetPreThreeNode } = this.props;
      var treeData = this.state.treeData;
      if(treeData != null && treeData != ""){
        return (
          <div className='leftListDiv col-md-2'>
            <div className="assetManageListDiv">
              <div className="iq-list" style={{"display":"none"}}>
                <div className="list-group">
                  <a className={"list-group-item" + (this.props.activeMenu == 1 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a1">摄像机视频考核</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 2 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a2">摄像机离线状态详细统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 3 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a3">摄像机录像丢失详细统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 4 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a4">摄像机视频丢失详细统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 5 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a5">摄像机视频质量实时统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 6 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a6">摄像机在线趋势图</a>
                </div>
              </div>
              <CommonTree data={treeData} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={this.props.setCurName} onGetCurThreeNode={onGetCurThreeNode} onGetPreThreeNode={onGetPreThreeNode}/>
            </div>
          </div>
        );
      }else{
        return (
          <div className='leftListDiv col-md-2'>
            <div className="assetManageListDiv">
              <div className="iq-list" style={{"display":"none"}}>
                <div className="list-group">
                  <a className={"list-group-item" + (this.props.activeMenu == 1 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a1">摄像机视频考核</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 2 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a2">摄像机离线状态详细统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 3 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a3">摄像机录像丢失详细统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 4 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a4">摄像机视频丢失详细统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 5 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a5">摄像机视频质量实时统计</a>
                  <a className={"list-group-item" + (this.props.activeMenu == 6 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a6">摄像机在线趋势图</a>
                </div>
              </div>
            </div>
          </div>
        );
      };
    },
});

VideoLeftBar.propTypes = {
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    onGetCurThreeNode: PropTypes.func.isRequired,
    onGetPreThreeNode: PropTypes.func.isRequired
}

module.exports = VideoLeftBar;
