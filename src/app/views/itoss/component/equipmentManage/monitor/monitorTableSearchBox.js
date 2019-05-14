/*
* 资源监测-统一监控平台-设备列表上方搜索栏
*/
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactWidgets = require('react-widgets');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SearchBox = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    componentDidUpdate: function() {
        const { monitorType } = this.props;
        switch (monitorType) {
            case "1":
                document.getElementById('radio_monitorType_camera').checked = true;
                break;
            case "2":
                document.getElementById('radio_monitorType_DVR').checked = true;
                break;
            case "3":
                document.getElementById('radio_monitorType_NVR').checked = true;
                break;
            case "4":
                document.getElementById('radio_monitorType_encoder').checked = true;
                break;
            case "5":
                document.getElementById('radio_monitorType_IPSAN').checked = true;
                break;
            default:
                document.getElementById('radio_monitorType_camera').checked = true;
                break;
        }
    },

    componentDidMount: function() {
        const { monitorType } = this.props;
        switch (monitorType) {
            case "1":
                document.getElementById('radio_monitorType_camera').checked = true;
                break;
            case "2":
                document.getElementById('radio_monitorType_DVR').checked = true;
                break;
            case "3":
                document.getElementById('radio_monitorType_NVR').checked = true;
                break;
            case "4":
                document.getElementById('radio_monitorType_encoder').checked = true;
                break;
            case "5":
                document.getElementById('radio_monitorType_IPSAN').checked = true;
                break;
            default:
                document.getElementById('radio_monitorType_camera').checked = true;
                break;
        }
    },

    // _handleClickRadio: function(e) {
    //     var _this = this;
    //     // setTimeout(function () {
    //         var name, treeNodeType, groupId;
    //         switch (e.target.value) {
    //             case "1":
    //                 name = "摄像机";
    //                 treeNodeType = "vedio";
    //                 break;
    //             case "2":
    //                 name = "DVR";
    //                 treeNodeType = "dvr";
    //                 break;
    //             case "3":
    //                 name = "NVR";
    //                 treeNodeType = "nvr";
    //                 break;
    //             case "4":
    //                 name = "编码器";
    //                 treeNodeType = "code";
    //                 break;
    //             case "5":
    //                 name = "IPSAN";
    //                 treeNodeType = "ipsan";
    //                 break;
    //             default:
    //                 name = "摄像机";
    //                 treeNodeType = "vedio";
    //                 break;
    //         }
    //         var yftDeviceMonitorAction = _this.getFlux().actions.YFTDeviceMonitorActions;
    //         var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
    //         var nodes = treeObj.transformToArray(treeObj.getNodes());
    //         for(var i = 0; i < nodes.length; i++) {
    //             if(nodes[i].id == _this.state.itoss_Monitor.MonitorGroupId) {
    //                 for(var j = 0; j < nodes.length; j++) {
    //                     if(nodes[j].pid == nodes[i].pid && nodes[j].type == treeNodeType) {
    //                         if(nodes[j].pid == _this.state.itoss_Monitor.SearchAreaData.id) {
    //                             treeObj.selectNode(nodes[j]);
    //                             this.state.itoss_Monitor.MonitorTree2.setState({curNode:nodes[j]});
    //                         }
    //                         groupId = nodes[j].id;
    //                         break;
    //                     }
    //                 }
    //                 break;
    //             }
    //         }
    //         var filter = [{key:"SELECTGROUP",value:_this.state.itoss_Monitor.SearchAreaData.id}, {key:"GROUPID",value:groupId}, {key:"NAME",value:name}, {key:"TYPE",value:e.target.value}];
    //         yftDeviceMonitorAction.set_monitorTableFilter(filter.slice(0));
    //         filter.push({key:"FROM", value:0});
    //         filter.push({key:"TO", value:20});
    //         yftDeviceMonitorAction.get_GroupListData(filter);
    //         document.getElementById("fixed-monitorTable-pagination").style.display = "block";
    //         $('#monitorTable').bootstrapTable('refreshOptions', {
    //             pagination: false
    //         });
    //         // var filter2 = [{key:"GROUPID",value:_this.state.itoss_Monitor.MonitorGroupId},{key:"TYPE",value:e.target.value},{bSearchBox_monitorType:"true",groupName:name}];
    //         // yftDeviceMonitorAction.get_TearmListData(filter2);
    //         yftDeviceMonitorAction.set_MonitorGroupId(groupId);
    //         yftDeviceMonitorAction.set_MonitorName(_this.state.itoss_Monitor.MonitorName.substring(0, _this.state.itoss_Monitor.MonitorName.lastIndexOf("-")) + "-" + name + "(" + (_this.getFlux().store("YFTDeviceMonitorStore").getState().TearmAllMAPData.good+_this.getFlux().store("YFTDeviceMonitorStore").getState().TearmAllMAPData.warning).toString() + "/" + _this.getFlux().store("YFTDeviceMonitorStore").getState().TearmAllMAPData.sum + ")");
    //         yftDeviceMonitorAction.set_monitorTableCurrentPage(1);
    //         yftDeviceMonitorAction.set_monitorTableNumPerPage(20);
    //         yftDeviceMonitorAction.set_MonitorFilterStatus("all");
    //     // }, 100);
    // },
    //
    // _handleOnClickFilterStatus: function (e) {
    //     var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
    //     var yftDeviceMonitorStoreState = this.getFlux().store("YFTDeviceMonitorStore").getState();
    //     yftDeviceMonitorAction.set_monitorTableCurrentPage(1);
    //     var showStart = 0;
    //     var showEnd = 1*yftDeviceMonitorStoreState.MonitorTableNumPerPage;
    //     var monitorName;
    //     switch (yftDeviceMonitorStoreState.MonitorType) {
    //         case "1":
    //             monitorName = "摄像机";
    //             break;
    //         case "2":
    //             monitorName = "DVR";
    //             break;
    //         case "3":
    //             monitorName = "NVR";
    //             break;
    //         case "4":
    //             monitorName = "编码器";
    //             break;
    //         case "5":
    //             monitorName = "IPSAN";
    //             break;
    //         default:
    //             monitorName = "摄像机";
    //             break;
    //     }
    //     var filter = [
    //         {key:"SELECTGROUP",value:yftDeviceMonitorStoreState.SearchAreaData.id},
    //         {key:"GROUPID", value:yftDeviceMonitorStoreState.MonitorGroupId},
    //         {key:"NAME", value:monitorName},
    //         {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}
    //     ];
    //
    //     switch (e.currentTarget.id){
    //         case "monitorTableFilter_all_btn":
    //             yftDeviceMonitorAction.set_MonitorFilterStatus("all");
    //             // yftDeviceMonitorAction.get_filteredGroupTableData(null);
    //             break;
    //         case "monitorTableFilter_good_btn":
    //             if(yftDeviceMonitorStoreState.MonitorFilterStatus != "good") {
    //                 yftDeviceMonitorAction.set_MonitorFilterStatus("good");
    //                 // yftDeviceMonitorAction.get_filteredGroupTableData({status: "1"});
    //                 filter.push({key:"STATUS", value:"good"});
    //             }
    //             else {
    //                 yftDeviceMonitorAction.set_MonitorFilterStatus("all");
    //                 // yftDeviceMonitorAction.get_filteredGroupTableData(null);
    //             }
    //             break;
    //         case "monitorTableFilter_warning_btn":
    //             if(yftDeviceMonitorStoreState.MonitorFilterStatus != "warning") {
    //                 yftDeviceMonitorAction.set_MonitorFilterStatus("warning");
    //                 // yftDeviceMonitorAction.get_filteredGroupTableData({status: "-1"});
    //                 filter.push({key:"STATUS", value:"warning"});
    //             }
    //             else {
    //                 yftDeviceMonitorAction.set_MonitorFilterStatus("all");
    //                 // yftDeviceMonitorAction.get_filteredGroupTableData(null);
    //             }
    //             break;
    //         case "monitorTableFilter_error_btn":
    //             if(yftDeviceMonitorStoreState.MonitorFilterStatus != "error") {
    //                 yftDeviceMonitorAction.set_MonitorFilterStatus("error");
    //                 // yftDeviceMonitorAction.get_filteredGroupTableData({status: "0"});
    //                 filter.push({key:"STATUS", value:"error"});
    //             }
    //             else {
    //                 yftDeviceMonitorAction.set_MonitorFilterStatus("all");
    //                 // yftDeviceMonitorAction.get_filteredGroupTableData(null);
    //             }
    //             break;
    //     }
    //     yftDeviceMonitorAction.set_monitorTableFilter(filter.slice(0));
    //     filter.push({key:"FROM", value:showStart});
    //     filter.push({key:"TO", value:showEnd});
    //     yftDeviceMonitorAction.get_GroupListData(filter);
    //     document.getElementById("fixed-monitorTable-pagination").style.display = "block";
    //     $('#monitorTable').bootstrapTable('refreshOptions', {
    //         pagination: false
    //     });
    // },

    render: function() {
        const { monitorFilterStatus, tearmAllMAPData, onClickTypeRadio, onClickFilterBtn } = this.props;
        return (
            <div className='searchBoxDiv col-md-12'>
                <div className='col-md-6 typeDiv'>
                    <div className="sourceTypeDiv searchFontStyle">资源类型：</div>
                    <div className="radio radioDiv">
                        <label className='searchFontStyle'>
                            <input type="radio" id="radio_monitorType_camera" name="radio_monitorType" value="1" defaultChecked="true" onClick={onClickTypeRadio}/>摄像机
                        </label>
                    </div>
                    <div className="radio radioDiv">
                        <label className='searchFontStyle'>
                            <input type="radio" id="radio_monitorType_DVR" name="radio_monitorType" value="2" onClick={onClickTypeRadio}/>DVR
                        </label>
                    </div>
                    <div className="radio radioDiv">
                        <label className='searchFontStyle'>
                            <input type="radio" id="radio_monitorType_NVR" name="radio_monitorType" value="3" onClick={onClickTypeRadio}/>NVR
                        </label>
                    </div>
                    <div className="radio radioDiv">
                        <label className='searchFontStyle'>
                            <input type="radio" id="radio_monitorType_encoder" name="radio_monitorType" value="4" onClick={onClickTypeRadio}/>编码器
                        </label>
                    </div>
                    <div className="radio radioDiv">
                        <label className='searchFontStyle'>
                            <input type="radio" id="radio_monitorType_IPSAN" name="radio_monitorType" value="5" onClick={onClickTypeRadio}/>IPSAN
                        </label>
                    </div>
                </div>
                <div className='col-md-6'>
                        <div className="btn-group pull-right" role="group">
                            <button id="monitorTableFilter_all_btn" type="button" className={"btn btn-default btnNoShadow btnAll" + (monitorFilterStatus=="all"?" active":"")} title="全部" onClick={onClickFilterBtn}>全部({tearmAllMAPData?tearmAllMAPData.sum:0})</button>
                            <button id="monitorTableFilter_good_btn" type="button" className={"btn btn-default btnNoShadow btnGood" + (monitorFilterStatus=="good"?" active":"")} title="完好数" onClick={onClickFilterBtn}><img src="img/itoss/Good.png" className="statusImg"/>完好数({tearmAllMAPData?tearmAllMAPData.good:0})</button>
                            <button id="monitorTableFilter_warning_btn" type="button" className={"btn btn-default btnNoShadow btnWarning" + (monitorFilterStatus=="warning"?" active":"")} title="异常数" onClick={onClickFilterBtn}><img src="img/itoss/Warning.png" className="statusImg"/>异常数({tearmAllMAPData?tearmAllMAPData.warning:0})</button>
                            <button id="monitorTableFilter_error_btn" type="button" className={"btn btn-default btnNoShadow btnError" + (monitorFilterStatus=="error"?" active":"")} title="离线数" onClick={onClickFilterBtn}><img src="img/itoss/Error.png" className="statusImg"/>离线数({tearmAllMAPData?tearmAllMAPData.error:0})</button>
                            <button type='button' className='btn btn-default btn-sm searchBtn' data-toggle="modal" data-target="#fieldSettingModal"><i className="fa fa-cog fa-lg"></i> 设置表显示</button>
                        </div>
                </div>

                <div className='col-md-12 titleDivderLine subForm'/>
            </div>
        );
    }
});

SearchBox.propTypes = {
	monitorType: PropTypes.string.isRequired,
    monitorFilterStatus: PropTypes.string.isRequired,
    // tearmAllMAPData: PropTypes.object,
    onClickTypeRadio: PropTypes.func.isRequired,
    onClickFilterBtn: PropTypes.func.isRequired
}

module.exports = SearchBox;
