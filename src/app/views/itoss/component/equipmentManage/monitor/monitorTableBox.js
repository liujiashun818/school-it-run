/*
* 资源监测-统一监控平台-设备列表组件
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

var AreaValueInput = React.createClass({
    render() {
        return (
            <span className="dropdownListValueInput">
                <span className="fixedHeader">区域:</span> <span className="dropdownListValue">{this.props.item!=null?this.props.item.name:""}</span>
            </span>
        );
    }
});

function DeviceTypeFormatter(value, row) {
    var imgSrc = "", name = "";
    switch (row.BASETYPE) {
        case "1":
            imgSrc = "img/itoss/Boll.png";
            name = "球机";
            break;
        default:
            imgSrc = "img/itoss/Qj.png";
            name = "枪机";
            break;
    }
    return [
        '<img src="' + imgSrc + '">',
        '<span style="display:none">',
        name,
        '</span>',
        '</img>'
    ].join('');
}

function OnlineStatusFormatter(value, row) {
    var imgSrc = "", name = "";
    switch (value) {
        case "1":
            imgSrc = "img/itoss/Good.png";
            name = "正常";
            break;
        case "0":
            imgSrc = "img/itoss/Error.png";
            name = "错误";
            break;
        case "-1":
            imgSrc = "img/itoss/Warning.png";
            name = "危险";
            break;
    }
    return [
        '<img src="' + imgSrc + '">',
        '<span style="display:none">',
        name,
        '</span>',
        '</img>'
    ].join('');
}

function StatusFormatter(value, row) {
    var imgSrc = "", name = "";
    switch (value) {
        case "1":
            imgSrc = "img/itoss/Good.png";
            name = "正常";
            break;
        case "0":
            imgSrc = "img/itoss/Error.png";
            name = "异常";
            break;
        case "-1":
            imgSrc = "img/itoss/Nodata.png";
            name = "无";
            break;
    }
    return [
        '<img src="' + imgSrc + '">',
        '<span style="display:none">',
        name,
        '</span>',
        '</img>'
    ].join('');
}

function videoLossFormatter(value, row) {
    return [
        '<a class="videoLoss" href="javascript:void(0)" style="padding:5px 5px 5px 0;text-decoration: underline;color: #337ab7;">',
        value,
        '</a>'
    ].join('');
}

function ImageLinkFormatter(value, row) {
    return [
        '<img src="img/itoss/Image.png">',
        '<span style="display:none">',
        value,
        '</span>',
        '</img>'
    ].join('');
}

function VideoLinkFormatter(value, row) {
    return [
        '<img src="img/itoss/RealTimeVideo.png">',
        '<span style="display:none">',
        value,
        '</span>',
        '</img>'
    ].join('');
}

function FeedbackFormatter(value, row) {
    if(row.ONLINESTATUS != "0" && row.SIGNALLOSS == "1" && row.IMAGELOSS == "1") {
        return [
            '<img src="img/itoss/Feedback.png">',
            '<span style="display:none">',
            value,
            '</span>',
            '</img>'
        ].join('');
    }
    else {
        return "";
    }
}

var bExportMonitorTable = false;
var bClickImageLink = false, bClickVideoLink = false, bClickFeedback = false;
var MonitorTableBox = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore", "YFTDeviceMonitorTreePageStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    getInitialState: function() {
        return {
            // currentPage: 1,
            // numPerPage: 20
        };
    },

    componentDidMount: function() {
        const { groupAllColumnData, groupTableData, monitorType, groupTableCount, monitorTableNumPerPage, monitorTableCurrentPage } = this.props;
        var tableColumns = [];
        var allColumnData = groupAllColumnData;
        for(var i = 0; i < allColumnData.length; i++) {
            if(allColumnData[i].isshow == "1") {
                if(allColumnData[i].isimage == "0") {
                    if(allColumnData[i].savename == "RECORD") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: videoLossFormatter
                            }
                        )
                    }
                    else {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false
                            }
                        )
                    }
                }
                else {
                    if(allColumnData[i].savename == "BASETYPE") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: DeviceTypeFormatter
                            }
                        )
                    }
                    else if(allColumnData[i].savename == "Image") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: ImageLinkFormatter
                            }
                        )
                    }
                    else if(allColumnData[i].savename == "video") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: VideoLinkFormatter
                            }
                        )
                    }
                    else if(allColumnData[i].savename == "return") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: FeedbackFormatter
                            }
                        )
                    }
                    else if(allColumnData[i].savename == "ONLINESTATUS" || allColumnData[i].savename == "NETBREAK") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: OnlineStatusFormatter
                            }
                        )
                    }
                    else {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: StatusFormatter
                            }
                        )
                    }
                }
            }
        }
        $('#monitorTable').bootstrapTable({
            columns: tableColumns,
            data: groupTableData,
            onClickRow: this.showDeviceInfo,
            onClickCell: this.handleOnClickCell,
            exportDataType: 'all'
        });

        // var groupTableCount = this.getFlux().store("YFTDeviceMonitorStore").getState().GroupTableCount;
        if(groupTableCount == 0) {
            document.getElementById("monitorTable-pagination-detail").style.display = "none";
            document.getElementById("monitorTable-pagination").style.display = "none";
        }
        else if(Math.ceil(groupTableCount/monitorTableNumPerPage) == 1) {
            document.getElementById("monitorTable-pagination-detail").style.display = "block";
            document.getElementById("monitorTable-pagination").style.display = "none";
        }
        else {
            document.getElementById("monitorTable-pagination-detail").style.display = "block";
            document.getElementById("monitorTable-pagination").style.display = "block";
        }

        var paginationLi = document.getElementById("monitorTable-pagination-list").childNodes;
        var totalPageNum = Math.ceil(groupTableCount/monitorTableNumPerPage);
        if(monitorTableCurrentPage == 1) {
            paginationLi[0].className = "page-first disabled";
            paginationLi[1].className = "page-pre disabled";
        }
        else {
            paginationLi[0].className = "page-first";
            paginationLi[1].className = "page-pre";
        }

        if(monitorTableCurrentPage == totalPageNum) {
            paginationLi[paginationLi.length-2].className = "page-next disabled";
            paginationLi[paginationLi.length-1].className = "page-last disabled";
        }
        else {
            paginationLi[paginationLi.length-2].className = "page-next";
            paginationLi[paginationLi.length-1].className = "page-last";
        }

        var paginationLi = document.getElementById("monitorTable-pagination-list").childNodes;
        for(var i = 0; i < paginationLi.length; i++) {
            if(parseInt(paginationLi[i].innerText) == monitorTableCurrentPage) {
                paginationLi[i].className = "page-number active";
                break;
            }
        }

        if(monitorType == "1") {
            $("#restoreAllBtn").show();
            $("#restoreAllBtn").attr("disabled", groupTableData.length == 0 ? true : false);
        }
        else {
            $("#restoreAllBtn").hide();
        }
    },

    componentDidUpdate: function() {
        const { groupAllColumnData, groupTableData, monitorType, groupTableCount, monitorTableNumPerPage, monitorTableCurrentPage } = this.props;
        var tableColumns = [];
        var allColumnData = groupAllColumnData;
        for(var i = 0; i < allColumnData.length; i++) {
            if(allColumnData[i].isshow == "1") {
                if(allColumnData[i].isimage == "0") {
                    if(allColumnData[i].savename == "RECORD") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: videoLossFormatter
                            }
                        )
                    }
                    else {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false
                            }
                        )
                    }
                }
                else {
                    if(allColumnData[i].savename == "BASETYPE") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: DeviceTypeFormatter
                            }
                        )
                    }
                    else if(allColumnData[i].savename == "Image") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: ImageLinkFormatter
                            }
                        )
                    }
                    else if(allColumnData[i].savename == "video") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: VideoLinkFormatter
                            }
                        )
                    }
                    else if(allColumnData[i].savename == "return") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: FeedbackFormatter
                            }
                        )
                    }
                    else if(allColumnData[i].savename == "ONLINESTATUS" || allColumnData[i].savename == "NETBREAK") {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: OnlineStatusFormatter
                            }
                        )
                    }
                    else {
                        tableColumns.push(
                            {
                                title: allColumnData[i].showname,
                                field: allColumnData[i].savename,
                                width: parseInt(allColumnData[i].legth),
                                visible: allColumnData[i].isshow=="1"?true:false,
                                formatter: StatusFormatter
                            }
                        )
                    }
                }
            }
        }

        $('#monitorTable').bootstrapTable('refreshOptions', {
            columns: tableColumns,
            data: groupTableData
        });

        // var groupTableCount = this.getFlux().store("YFTDeviceMonitorStore").getState().GroupTableCount;
        if(groupTableCount == 0) {
            document.getElementById("monitorTable-pagination-detail").style.display = "none";
            document.getElementById("monitorTable-pagination").style.display = "none";
        }
        else if(Math.ceil(groupTableCount/monitorTableNumPerPage) == 1) {
            document.getElementById("monitorTable-pagination-detail").style.display = "block";
            document.getElementById("monitorTable-pagination").style.display = "none";
        }
        else {
            document.getElementById("monitorTable-pagination-detail").style.display = "block";
            document.getElementById("monitorTable-pagination").style.display = "block";
        }

        var paginationLi = document.getElementById("monitorTable-pagination-list").childNodes;
        var totalPageNum = Math.ceil(groupTableCount/monitorTableNumPerPage);
        if(monitorTableCurrentPage == 1) {
            paginationLi[0].className = "page-first disabled";
            paginationLi[1].className = "page-pre disabled";
        }
        else {
            paginationLi[0].className = "page-first";
            paginationLi[1].className = "page-pre";
        }

        if(monitorTableCurrentPage == totalPageNum) {
            paginationLi[paginationLi.length-2].className = "page-next disabled";
            paginationLi[paginationLi.length-1].className = "page-last disabled";
        }
        else {
            paginationLi[paginationLi.length-2].className = "page-next";
            paginationLi[paginationLi.length-1].className = "page-last";
        }

        for(var i = 2; i < paginationLi.length-2; i++) {
            paginationLi[i].className = "page-number";
        }
        for(var i = 0; i < paginationLi.length; i++) {
            if(parseInt(paginationLi[i].innerText) == monitorTableCurrentPage) {
                paginationLi[i].className = "page-number active";
                break;
            }
        }

        var pageList = document.getElementById("monitorTable-page-list");
        for(var i = 0; i < pageList.childNodes.length; i++) {
            if(pageList.childNodes[i].innerText == monitorTableNumPerPage) {
                pageList.childNodes[i].className = "active";
            }
            else {
                pageList.childNodes[i].className = "";
            }
        }

        if(bExportMonitorTable) {
            $('#monitorTable').bootstrapTable('refreshOptions', {
                pagination: false
            });

            $('#monitorTable').tableExport({type:'excel'});
            bExportMonitorTable = false;

            $('#monitorTable').bootstrapTable('refreshOptions', {
                pagination: true,
                pageSize: monitorTableNumPerPage,
                pageList: [10,20,50,100]
            });
        }

        if(monitorType == "1") {
            $("#restoreAllBtn").show();
            $("#restoreAllBtn").attr("disabled", groupTableData.length == 0 ? true : false);
        }
        else {
            $("#restoreAllBtn").hide();
        }
    },

    showDeviceInfo: function(row, element) {
        const { monitorType, set_MonitorTableSelectedRowData, get_videoLoss, get_channelInfo, set_sipid } = this.props;
        // var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
        if(!bClickImageLink && !bClickVideoLink && !bClickFeedback) {
            set_MonitorTableSelectedRowData(row);
            if(monitorType == "1") {
                get_videoLoss([{key:"VIDEOFLAG", value:row.LAG}]);
            }
            else {
                get_channelInfo([{key:"SERVERFLAG", value:row.LAG}]);
            }
            $('#deviceInfoModal').modal('show');
        }
        else if(bClickImageLink) {
            set_MonitorTableSelectedRowData(row);
            $('#imageLinkModal').modal('show');
        }
        else if(bClickVideoLink) {
            set_sipid(row.LAG);
            $('#videoLinkModal').modal('show');
        }
        else if(bClickFeedback) {
            set_MonitorTableSelectedRowData(row);
            $('#feedbackModal').modal('show');
        }
    },

    handleOnClickCell: function(field, value, row, element) {
        const { set_showVideoLossTab } = this.props;
        if(field == "Image") {
            bClickImageLink = true;
            bClickVideoLink = false;
            bClickFeedback = false;
        }
        else if(field == "video") {
            bClickImageLink = false;
            bClickVideoLink = true;
            bClickFeedback = false;
            // window.open("http://"+localStorage.getItem("DIAGNOSIS")+":80/play.htm?VIDEOFLAG="+row.LAG);
        }
        else if(field == "return" && row.ONLINESTATUS != "0" && row.SIGNALLOSS == "1" && row.IMAGELOSS == "1") {
            bClickImageLink = false;
            bClickVideoLink = false;
            bClickFeedback = true;
        }
        else if(field == "RECORD") {
            bClickImageLink = false;
            bClickVideoLink = false;
            bClickFeedback = false;
            set_showVideoLossTab(true);
        }
        else {
            bClickImageLink = false;
            bClickVideoLink = false;
            bClickFeedback = false;
            set_showVideoLossTab(false);
        }
    },

    _handleChangeEventArea: function (e) {
        // this.getFlux().actions.YFTDeviceMonitorActions.set_SettingSearchAreaData(e);
        this.props.set_SettingSearchAreaData(e);
    },

    // _handleOnClickSearch: function() {
    //     var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
    //     var yftDeviceMonitorStoreState = this.getFlux().store("YFTDeviceMonitorStore").getState();
    //     var yftDeviceMonitorTreeStoreState = this.getFlux().store("YFTDeviceMonitorTreePageStore").getState();
    //     var baseSearch = "";
    //     if(yftDeviceMonitorStoreState.SettingSearchAreaData != yftDeviceMonitorStoreState.SearchAreaData) {
    //         var monitorType;
    //         switch (yftDeviceMonitorStoreState.MonitorType) {
    //             case "1":
    //                 monitorType = "vedio";
    //                 break;
    //             case "2":
    //                 monitorType = "dvr";
    //                 break;
    //             case "3":
    //                 monitorType = "nvr";
    //                 break;
    //             case "4":
    //                 monitorType = "code";
    //                 break;
    //             case "5":
    //                 monitorType = "ipsan";
    //                 break;
    //         }
    //
    //         if($.trim(document.getElementById('quickSearchInput').value) != "") {
    //             switch (document.getElementById('quickSearchType').childNodes[1].innerText) {
    //                 case "IP地址":
    //                     if(yftDeviceMonitorStoreState.MonitorType == "1") {
    //                         baseSearch = "e.IPADDRESS like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                     }
    //                     else {
    //                         baseSearch = "e.SERVERIP like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                     }
    //                     break;
    //                 case "设备名称":
    //                     if(yftDeviceMonitorStoreState.MonitorType == "1") {
    //                         baseSearch = "e.VIDEONAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                     }
    //                     else {
    //                         baseSearch = "e.SERVERNAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                     }
    //                     break;
    //             }
    //         }
    //
    //         var _this = this;
    //         // setTimeout(function () {
    //             var flag = false;
    //             for(var i = 0; i < yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData.length; i++) {
    //                 if(yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].type == monitorType && yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].pid == yftDeviceMonitorStoreState.SettingSearchAreaData.id) {
    //                     flag = true;
    //                     var filter = [
    //                         {key:"SELECTGROUP", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].pid},
    //                         {key:"GROUPID", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id},
    //                         {key:"NAME", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].name.substring(0, yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].name.indexOf("("))},
    //                         {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}
    //                     ];
    //                     if(baseSearch != "") {
    //                         filter.push({key:"BASESEARCH", value:baseSearch});
    //                     }
    //                     if(yftDeviceMonitorStoreState.MonitorFilterStatus != "all") {
    //                         filter.push({key:"STATUS", value:yftDeviceMonitorStoreState.MonitorFilterStatus});
    //                     }
    //                     yftDeviceMonitorAction.set_monitorTableFilter(filter.slice(0));
    //                     filter.push({key:"FROM", value:0});
    //                     filter.push({key:"TO", value:20});
    //                     yftDeviceMonitorAction.get_GroupListData(filter);
    //                     document.getElementById("fixed-monitorTable-pagination").style.display = "block";
    //                     $('#monitorTable').bootstrapTable('refreshOptions', {
    //                         pagination: false
    //                     });
    //                     // var filter2 = [{key:"GROUPID", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id}, {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}];
    //                     // yftDeviceMonitorAction.get_TearmListData(filter2);
    //                     yftDeviceMonitorAction.set_MonitorGroupId(yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id);
    //                     yftDeviceMonitorAction.set_MonitorName(yftDeviceMonitorStoreState.SettingSearchAreaData.name.substring(0, yftDeviceMonitorStoreState.SettingSearchAreaData.name.indexOf("(")) + "-" + yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].name);
    //                     yftDeviceMonitorAction.set_SearchAreaData(yftDeviceMonitorStoreState.SettingSearchAreaData);
    //                     yftDeviceMonitorAction.set_monitorTableCurrentPage(1);
    //                     yftDeviceMonitorAction.set_monitorTableNumPerPage(20);
    //
    //                     var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
    //                     var nodes = treeObj.transformToArray(treeObj.getNodes());
    //                     if(nodes.length > 0) {
    //                         for(var j = 0; j < nodes.length; j++) {
    //                             if(nodes[j].id == yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id) {
    //                                 treeObj.selectNode(nodes[j]);
    //                                 this.state.itoss_Monitor.MonitorTree2.setState({curNode:nodes[j]});
    //                                 break;
    //                             }
    //                         }
    //                     }
    //                     break;
    //                 }
    //             }
    //
    //             if(!flag) {
    //                 var name;
    //                 switch (yftDeviceMonitorStoreState.MonitorType) {
    //                     case "1":
    //                         name = "摄像机";
    //                         break;
    //                     case "2":
    //                         name = "DVR";
    //                         break;
    //                     case "3":
    //                         name = "NVR";
    //                         break;
    //                     case "4":
    //                         name = "编码器";
    //                         break;
    //                     case "5":
    //                         name = "IPSAN";
    //                         break;
    //                     default:
    //                         name = "摄像机";
    //                         break;
    //                 }
    //
    //                 var filter = [
    //                     {key:"SELECTGROUP", value:yftDeviceMonitorStoreState.SettingSearchAreaData.id},
    //                     {key:"GROUPID", value:yftDeviceMonitorStoreState.MonitorGroupId},
    //                     {key:"NAME", value:name},
    //                     {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}
    //                 ];
    //                 if(baseSearch != "") {
    //                     filter.push({key:"BASESEARCH", value:baseSearch});
    //                 }
    //                 if(yftDeviceMonitorStoreState.MonitorFilterStatus != "all") {
    //                     filter.push({key:"STATUS", value:yftDeviceMonitorStoreState.MonitorFilterStatus});
    //                 }
    //                 yftDeviceMonitorAction.set_monitorTableFilter(filter.slice(0));
    //                 filter.push({key:"FROM", value:0});
    //                 filter.push({key:"TO", value:20});
    //                 yftDeviceMonitorAction.get_GroupListData(filter);
    //                 document.getElementById("fixed-monitorTable-pagination").style.display = "block";
    //                 $('#monitorTable').bootstrapTable('refreshOptions', {
    //                     pagination: false
    //                 });
    //                 // var filter2 = [{key:"GROUPID", value:yftDeviceMonitorTreeStoreState.DeviceMonitorTreeData[i].id}, {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}];
    //                 // yftDeviceMonitorAction.get_TearmListData(filter2);
    //                 yftDeviceMonitorAction.set_MonitorName(yftDeviceMonitorStoreState.SettingSearchAreaData.name.substring(0, yftDeviceMonitorStoreState.SettingSearchAreaData.name.indexOf("(")) + "-" + name + "(" + (this.getFlux().store("YFTDeviceMonitorStore").getState().TearmAllMAPData.good+this.getFlux().store("YFTDeviceMonitorStore").getState().TearmAllMAPData.warning).toString() + "/" + this.getFlux().store("YFTDeviceMonitorStore").getState().TearmAllMAPData.sum + ")");
    //                 yftDeviceMonitorAction.set_SearchAreaData(yftDeviceMonitorStoreState.SettingSearchAreaData);
    //                 yftDeviceMonitorAction.set_monitorTableCurrentPage(1);
    //                 yftDeviceMonitorAction.set_monitorTableNumPerPage(20);
    //             }
    //         // }, 100);
    //     }
    //     else {
    //         if($.trim(document.getElementById('quickSearchInput').value) != "") {
    //             switch (document.getElementById('quickSearchType').childNodes[1].innerText) {
    //                 case "IP地址":
    //                     if(yftDeviceMonitorStoreState.MonitorType == "1") {
    //                         baseSearch = "e.IPADDRESS like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                     }
    //                     else {
    //                         baseSearch = "e.SERVERIP like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                     }
    //                     break;
    //                 case "设备名称":
    //                     if(yftDeviceMonitorStoreState.MonitorType == "1") {
    //                         baseSearch = "e.VIDEONAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                     }
    //                     else {
    //                         baseSearch = "e.SERVERNAME like '%" + $.trim(document.getElementById('quickSearchInput').value) + "%'";
    //                     }
    //                     break;
    //             }
    //         }
    //         var monitorName;
    //         switch (yftDeviceMonitorStoreState.MonitorType) {
    //             case "1":
    //                 monitorName = "摄像机";
    //                 break;
    //             case "2":
    //                 monitorName = "DVR";
    //                 break;
    //             case "3":
    //                 monitorName = "NVR";
    //                 break;
    //             case "4":
    //                 monitorName = "编码器";
    //                 break;
    //             case "5":
    //                 monitorName = "IPSAN";
    //                 break;
    //             default:
    //                 monitorName = "摄像机";
    //                 break;
    //         }
    //         var filter = [
    //             {key:"SELECTGROUP", value:yftDeviceMonitorStoreState.SearchAreaData.id},
    //             {key:"GROUPID", value:yftDeviceMonitorStoreState.MonitorGroupId},
    //             {key:"NAME", value:monitorName},
    //             {key:"TYPE", value:yftDeviceMonitorStoreState.MonitorType}
    //         ];
    //         if(baseSearch != "") {
    //             filter.push({key:"BASESEARCH", value:baseSearch});
    //         }
    //         if(yftDeviceMonitorStoreState.MonitorFilterStatus != "all") {
    //             filter.push({key:"STATUS", value:yftDeviceMonitorStoreState.MonitorFilterStatus});
    //         }
    //         yftDeviceMonitorAction.set_monitorTableFilter(filter.slice(0));
    //         filter.push({key:"FROM", value:0});
    //         filter.push({key:"TO", value:20});
    //         yftDeviceMonitorAction.get_GroupListData(filter);
    //         document.getElementById("fixed-monitorTable-pagination").style.display = "block";
    //         $('#monitorTable').bootstrapTable('refreshOptions', {
    //             pagination: false
    //         });
    //         yftDeviceMonitorAction.set_monitorTableCurrentPage(1);
    //         yftDeviceMonitorAction.set_monitorTableNumPerPage(20);
    //     }
    // },

    _handleOnClickExport: function(e) {
        const { monitorTableFilter, groupTableCount, get_GroupListData } = this.props;
        bExportMonitorTable = true;
        var filter = monitorTableFilter.slice(0);
        filter.push({key:"FROM", value:0});
        filter.push({key:"TO", value:groupTableCount});
        filter.push({key:"async", value:false});
        get_GroupListData(filter);

        document.getElementById("fixed-monitorTable-pagination").style.display = "none";
    },

    _handleOnClickPageList: function(e) {
        const { monitorTableFilter, groupTableCount, monitorTableCurrentPage, set_monitorTableNumPerPage, set_monitorTableCurrentPage, get_GroupListData } = this.props;
        var numPerPage = parseInt(e.currentTarget.innerText);
        set_monitorTableNumPerPage(numPerPage);
        // var groupTableCount = this.getFlux().store("YFTDeviceMonitorStore").getState().GroupTableCount;
        var totalPageNum = Math.ceil(groupTableCount/numPerPage);
        var currentPage = monitorTableCurrentPage;
        if(currentPage > totalPageNum) {
            set_monitorTableCurrentPage(totalPageNum);
            currentPage = totalPageNum;
        }
        var pageList = e.currentTarget.parentNode;
        for(var i = 0; i < pageList.childNodes.length; i++) {
            pageList.childNodes[i].className = ""
        }
        e.currentTarget.className = "active";

        var showStart = (currentPage-1)*numPerPage;
        var showEnd = currentPage*numPerPage;
        var filter = monitorTableFilter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        get_GroupListData(filter);
    },

    _handleOnClickPageFirst: function() {
        const { monitorTableFilter, monitorTableNumPerPage, set_monitorTableCurrentPage, get_GroupListData } = this.props;
        set_monitorTableCurrentPage(1);
        var showStart = 0;
        var showEnd = 1*monitorTableNumPerPage;
        var filter = monitorTableFilter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        get_GroupListData(filter);
    },

    _handleOnClickPagePre: function() {
        const { monitorTableFilter, monitorTableCurrentPage, monitorTableNumPerPage, set_monitorTableCurrentPage, get_GroupListData } = this.props;
        var currentPage = monitorTableCurrentPage-1;
        set_monitorTableCurrentPage(currentPage);

        var showStart = (currentPage-1)*monitorTableNumPerPage;
        var showEnd = currentPage*monitorTableNumPerPage;
        var filter = monitorTableFilter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        get_GroupListData(filter);
    },

    _handleOnClickPageNumber: function(e) {
        const { monitorTableFilter, monitorTableNumPerPage, set_monitorTableCurrentPage, get_GroupListData } = this.props;
        var currentPage = parseInt(e.currentTarget.innerText);
        set_monitorTableCurrentPage(currentPage);

        var showStart = (currentPage-1)*monitorTableNumPerPage;
        var showEnd = currentPage*monitorTableNumPerPage;
        var filter = monitorTableFilter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        get_GroupListData(filter);
    },

    _handleOnClickPageNext: function() {
        const { monitorTableFilter, monitorTableCurrentPage, monitorTableNumPerPage, set_monitorTableCurrentPage, get_GroupListData } = this.props;
        var currentPage = monitorTableCurrentPage+1;
        set_monitorTableCurrentPage(currentPage);

        var showStart = (currentPage-1)*monitorTableNumPerPage;
        var showEnd = currentPage*monitorTableNumPerPage;
        var filter = monitorTableFilter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        get_GroupListData(filter);
    },

    _handleOnClickPageLast: function() {
        const { monitorTableFilter, groupTableCount, monitorTableNumPerPage, set_monitorTableCurrentPage, get_GroupListData } = this.props;
        // var groupTableCount = this.getFlux().store("YFTDeviceMonitorStore").getState().GroupTableCount;
        var totalPageNum = Math.ceil(groupTableCount/monitorTableNumPerPage);
        set_monitorTableCurrentPage(totalPageNum);

        var showStart = (totalPageNum-1)*monitorTableNumPerPage;
        var showEnd = totalPageNum*monitorTableNumPerPage;
        var filter = monitorTableFilter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        get_GroupListData(filter);
    },

    getPageNumberLi: function() {
        const { groupTableCount, monitorTableCurrentPage, monitorTableNumPerPage } = this.props;
        // var groupTableCount = this.getFlux().store("YFTDeviceMonitorStore").getState().GroupTableCount;
        var totalPageNum = Math.ceil(groupTableCount/monitorTableNumPerPage);
        var currentPage = monitorTableCurrentPage;
        var pageArray = [];
        var _this = this;
        if(totalPageNum <= 5) {
            for(var i = 0; i < totalPageNum; i++) {
                pageArray.push(i+1);
            }
            return (
                <ul id="monitorTable-pagination-list" className="pagination">
                    <li className="page-first" onClick={this._handleOnClickPageFirst}><a href="javascript:void(0)">«</a></li>
                    <li className="page-pre" onClick={this._handleOnClickPagePre}><a href="javascript:void(0)">‹</a></li>
                    {pageArray.map(function(page) {
                        return (<li className="page-number" onClick={_this._handleOnClickPageNumber}><a href="javascript:void(0)">{page}</a></li>);
                    })}
                    <li className="page-next" onClick={this._handleOnClickPageNext}><a href="javascript:void(0)">›</a></li>
                    <li className="page-last" onClick={this._handleOnClickPageLast}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else if(currentPage-1 <= 2) {
            return (
                <ul id="monitorTable-pagination-list" className="pagination">
                    <li className="page-first" onClick={this._handleOnClickPageFirst}><a href="javascript:void(0)">«</a></li>
                    <li className="page-pre" onClick={this._handleOnClickPagePre}><a href="javascript:void(0)">‹</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">1</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">2</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">3</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">4</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">5</a></li>
                    <li className="page-next" onClick={this._handleOnClickPageNext}><a href="javascript:void(0)">›</a></li>
                    <li className="page-last" onClick={this._handleOnClickPageLast}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else if(totalPageNum-currentPage <= 2) {
            return (
                <ul id="monitorTable-pagination-list" className="pagination">
                    <li className="page-first" onClick={this._handleOnClickPageFirst}><a href="javascript:void(0)">«</a></li>
                    <li className="page-pre" onClick={this._handleOnClickPagePre}><a href="javascript:void(0)">‹</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">{totalPageNum-4}</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">{totalPageNum-3}</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">{totalPageNum-2}</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">{totalPageNum-1}</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">{totalPageNum}</a></li>
                    <li className="page-next" onClick={this._handleOnClickPageNext}><a href="javascript:void(0)">›</a></li>
                    <li className="page-last" onClick={this._handleOnClickPageLast}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else {
            pageArray = [currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2];
            return (
                <ul id="monitorTable-pagination-list" className="pagination">
                    <li className="page-first disabled" onClick={this._handleOnClickPageFirst}><a href="javascript:void(0)">«</a></li>
                    <li className="page-pre disabled" onClick={this._handleOnClickPagePre}><a href="javascript:void(0)">‹</a></li>
                    {pageArray.map(function(page) {
                        return (<li className="page-number" onClick={_this._handleOnClickPageNumber}><a href="javascript:void(0)">{page}</a></li>);
                    })}
                    <li className="page-next" onClick={this._handleOnClickPageNext}><a href="javascript:void(0)">›</a></li>
                    <li className="page-last" onClick={this._handleOnClickPageLast}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
    },

    render: function() {
        const { groupTableCount, monitorTableCurrentPage, monitorTableNumPerPage, settingSearchAreaData, areaData, onClickSearch } = this.props;
        var currentPage = monitorTableCurrentPage;
        var numPerPage = monitorTableNumPerPage;
        // var groupTableCount = this.getFlux().store("YFTDeviceMonitorStore").getState().GroupTableCount;
        var showStart = (currentPage-1)*numPerPage+1;
        var showEnd = (currentPage*numPerPage>groupTableCount ? groupTableCount : currentPage*numPerPage);
        return (
            <div className='monitorTableDiv col-md-12'>
                <div id='monitorTable-toolbar' className='col-md-12'>
                    <div id='toolbar-form' role='form'>
                        <div className='col-md-3'>
                            <ReactWidgets.DropdownList className='form-control dropdownStyle' data={areaData} value={settingSearchAreaData} textField='name' valueComponent={AreaValueInput} onChange={this._handleChangeEventArea}/>
                        </div>
                        <div className='col-md-2'>
                            <ReactWidgets.DropdownList id="quickSearchType" className='form-control dropdownStyle' data={[{id:0, name:'设备名称'}, {id:1, name:'IP地址'}]} defaultValue={{id:0, name:'设备名称'}} textField='name'/>
                        </div>
                        <div className='col-md-3'>
                            <input id="quickSearchInput" type="text" className="form-control inputMargin customSearchInputStyle"/>
                        </div>
                        <div className='col-md-3'>
                            <button type='button' className='btn btn-default searchBtn marginRight_8' data-toggle="modal" data-target="#advancedSearchModal">
                                高级搜索
                            </button>
                            <button type='button' className='btn btn-default searchBtn' onClick={onClickSearch}>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                        <div className='col-md-1' style={{textAlign: "right"}}>
                            <button id="restoreAllBtn" title="恢复所有摄像机默认图像质量诊断参数" type='button' className='btn btn-default searchBtn' data-toggle="modal" data-target="#feedbackRestoreAllModal">
                                <i className="fa fa-undo"></i>
                            </button>
                            <div className='btn-group'>
                                <button className='btn dropdown-toggle' data-toggle='dropdown' type='button'>
                                    <i className='glyphicon glyphicon-export icon-share'/>
                                    <span className='caret'/>
                                </button>
                                <ul className='dropdown-menu dropdown-menu-right' role='menu'>
                                    <li data-type='excel' onClick={this._handleOnClickExport}>
                                        <a href='javascript:void(0)'>MS-Excel</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <table id='monitorTable'
                       data-toggle='table'
                       data-classes='table table-no-bordered table-hover'
                       data-toolbar='#monitorTable-toolbar'>
                </table>
                <div id="fixed-monitorTable-pagination" className="fixed-table-pagination">
                    <div id="monitorTable-pagination-detail" className="pull-left pagination-detail">
                        <span className="pagination-info">显示第 {showStart} 到第 {showEnd} 条记录，总共 {groupTableCount} 条记录</span>
                        <span className="page-list">
                            {"每页显示 "}
                            <span className="btn-group dropup">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {numPerPage} <span className="caret"></span>
                                </button>
                                <ul id="monitorTable-page-list" className="dropdown-menu">
                                    <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)">10</a></li>
                                    <li className="active" onClick={this._handleOnClickPageList}><a href="javascript:void(0)">20</a></li>
                                    <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)">50</a></li>
                                    <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)">100</a></li>
                                </ul>
                            </span>
                            {" 条记录"}
                        </span>
                    </div>
                    <div id="monitorTable-pagination" className="pull-right pagination">
                        {this.getPageNumberLi()}
                    </div>
                </div>
            </div>
        );
    }
});

MonitorTableBox.propTypes = {
    groupAllColumnData: PropTypes.array.isRequired,
    groupTableData: PropTypes.array.isRequired,
    monitorType: PropTypes.string.isRequired,
    groupTableCount: PropTypes.number.isRequired,
    monitorTableNumPerPage: PropTypes.number.isRequired,
    monitorTableCurrentPage: PropTypes.number.isRequired,
    monitorTableFilter: PropTypes.array.isRequired,
    settingSearchAreaData: PropTypes.object,
    areaData: PropTypes.array.isRequired,

    set_MonitorTableSelectedRowData: PropTypes.func.isRequired,
    get_videoLoss: PropTypes.func.isRequired,
    get_channelInfo: PropTypes.func.isRequired,
    set_sipid: PropTypes.func.isRequired,
    set_showVideoLossTab: PropTypes.func.isRequired,
    set_SettingSearchAreaData: PropTypes.func.isRequired,
    get_GroupListData: PropTypes.func.isRequired,
    set_monitorTableNumPerPage: PropTypes.func.isRequired,
    set_monitorTableCurrentPage: PropTypes.func.isRequired,
    onClickSearch: PropTypes.func.isRequired
}

module.exports = MonitorTableBox;
