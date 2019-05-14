/**
* Created by Yuchen  2016/01/15.
* 资产监控同步
*/

require('bootstrap');
import React from 'react'
var util = require('./../../../../utils/util.js');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var History = ReactRouter.History;

import Monitor_desView_static  from './monitor_desView_static';
import MonitorTable  from './monitor_desView_tabs';

var Monitor_desView = React.createClass({
    mixins: [History],//, FluxMixin, StoreWatchMixin("AssetManageStore")
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    componentDidMount: function() {
        if(document.getElementById('MonitorDesViewDiv') != null) {
            document.getElementById('MonitorDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
        }
    },
    render: function() {
        return (
            <div id="MonitorDesViewDiv" className="overviewDesViewDiv assetDesViewDiv">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        资产管理：监控同步
                    </div>
                    <div className="titleRight2">
                        <a className="home-link" id="home-link" onClick={this._handleOnClick} >返回资产统计列表</a>
                        <a className="home-link"><i title ="点击返回资产统计" className="fa fa-question-circle fa-lg" style={{marginLeft: '8px'}}></i></a>
                        <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <Monitor_desView_static handleClickEvent={this._handleClickEvent} />
                <MonitorTable Permissions={this.props.Permissions} DevList={this.props.DevList} DevCount={this.props.DevCount}
                  get_monitor_data={this.props.get_monitor_data} />
            </div>
        );
    },
    _handleClickEvent: function(e){
        var saveBtn = $(e.target);
        var _this = this;
        if(e.target.id=="btn-bind"){//绑定选中设备
            // if(this.state.itoss.DevList.length<=0){
            if(this.props.DevList.length <= 0){
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "设备绑定";
                    document.getElementById('publicMessageModalcontent').innerHTML = "设备均已全部绑定，无需要绑定的设备存在";
                    $('#publicMessageModal').modal('show');
                },100);
                return;
            }
            var selections = $("#deviceTable").bootstrapTable("getSelections");
            if(selections.length<=0){
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "设备绑定";
                    document.getElementById('publicMessageModalcontent').innerHTML = "请选择要绑定的设备";
                    $('#publicMessageModal').modal('show');
                },100);
            }
            else{
                saveBtn.text("绑定中");
                $(".btnNormal").attr("disabled","disabled");
                //this.getFlux().actions.AssetManageActions.create_monitor_asset({
                this.props.create_monitor_asset({
                    data: selections,
                    callback: function(resp){
                        saveBtn.text("绑定监控");
                        $(".btnNormal").removeAttr("disabled");
                        _this.props.showResponseModal(resp);
                        $("button[name='refresh']").click();
                    },
                    error: function(resp){
                        saveBtn.text("绑定监控");
                        $(".btnNormal").removeAttr("disabled");
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "设备绑定";
                            document.getElementById('publicMessageModalcontent').innerHTML = "绑定失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    }
                });
            }
        }
        if(e.target.id=="btn-bindall"){//绑定全部设备
            // if(this.state.itoss.DevList.length<=0){
            if(this.props.DevList.length<=0){
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "设备绑定";
                    document.getElementById('publicMessageModalcontent').innerHTML = "设备均已全部绑定，无需要绑定的设备存在";
                    $('#publicMessageModal').modal('show');
                },100);
                return;
            }
            var C = confirm("确定要绑定全部设备吗？");
            if(!C) return;
            saveBtn.text("绑定中");
            $(".btnNormal").attr("disabled","disabled");
            //this.getFlux().actions.AssetManageActions.create_all_monitor_asset({
            this.props.create_all_monitor_asset({
                callback: function(resp){
                    saveBtn.text("全部绑定");
                    $(".btnNormal").removeAttr("disabled");
                    _this.props.showResponseModal(resp);
                    $("button[name='refresh']").click();
                },
                error: function(resp){
                    saveBtn.text("全部绑定");
                    $(".btnNormal").removeAttr("disabled");
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "设备绑定";
                        document.getElementById('publicMessageModalcontent').innerHTML = "绑定失败";
                        $('#publicMessageModal').modal('show');
                    },100);
                }
            });
        }
    },
    _handleOnClick: function(e){
        var B = $(e.target);
        var id = B.attr("id");
        switch(id){
            case "home-link":
                // var valid = util.hasPermission(this.state.itoss.Permissions,"/assetmanage/asset/assetlist");
                var valid = util.hasPermission(this.props.Permissions,"/assetmanage/asset/assetlist");
                if(valid==null) return;

                // var zTree = $.fn.zTree.getZTreeObj("commonTree");
                // var treeNodes = zTree.getNodes();
                // var beforeNode = zTree.getNodeByParam("name","监控同步");
                // var targetNode = zTree.getNodeByParam("name","资产统计列表");
                // // console.log(targetNode);
                // var tid = targetNode.tId;
                // var tIndex = zTree.getNodeIndex(targetNode);
                // document.getElementById(tid).className = "fadeInMenu";
                // zTree.selectNode(targetNode);
                // // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
                // // this.getFlux().actions.YFTIndexActions.set_linshiNode(beforeNode);
                // this.props.set_linshiData(tIndex);
                // this.props.set_linshiNode(beforeNode);
                this.props.setCurName("资产统计列表");
                this.history.pushState(null,'assetManage/assetList');
            break;
        }
    },
});

$(window).resize(function () {
    if(document.getElementById('MonitorDesViewDiv') != null) {
        document.getElementById('MonitorDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = Monitor_desView;
