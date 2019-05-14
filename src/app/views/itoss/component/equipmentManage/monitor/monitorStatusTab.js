/*
* 资源监测-统一监控平台-设备信息-状态信息页
*/
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

function statusFormatter(value, row) {
    var imgSrc = "";
    switch (value) {
        case "1":
            imgSrc = "img/itoss/Good.png";
            break;
        case "0":
            imgSrc = "img/itoss/Error.png";
            break;
        case "-1":
            imgSrc = "img/itoss/Nodata.png";
            break;
        default:
            imgSrc = "img/itoss/Nodata.png";
            break;
    }
    return [
        (row.hasOwnProperty('isImage') && !row.isImage) ? value : '<img src="' + imgSrc + '"/>'
    ].join('');
}

var MonitorStatusTab = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    componentDidMount: function() {
        var communicationStatusData = [], pictrueStatusData = [];

        $('#monitorCommunicationStatusTable').bootstrapTable({
            columns: [
                {
                    title: '指标名称',
                    field: 'quotaName',
                    width: 120,
                    sortable: false
                }, {
                    title: '指标值',
                    field: 'quotaValue',
                    sortable: false,
                    formatter: statusFormatter
                }, {
                    title: '监测时间',
                    field: 'alarmTime',
                    width: 150,
                    sortable: false
                }
            ],
            data: communicationStatusData
        });

        $('#monitorPictrueStatusTable').bootstrapTable({
            columns: [
                {
                    title: '指标名称',
                    field: 'quotaName',
                    width: 120,
                    sortable: false
                }, {
                    title: '指标值',
                    field: 'quotaValue',
                    sortable: false,
                    formatter: statusFormatter
                }, {
                    title: '监测时间',
                    field: 'alarmTime',
                    width: 150,
                    sortable: false
                }
            ],
            data: pictrueStatusData
        });


    },

    componentDidUpdate: function() {
        var _this = this;
        $('#deviceInfoModal').on('shown.bs.modal', function () {
            var communicationStatusData = [], pictrueStatusData = [];
            $('#monitorCommunicationStatusTable').bootstrapTable('resetView');
            switch (_this.props.monitorType) {
                case "1":
                    communicationStatusData = [
                        {quotaName: "信号丢失", quotaValue: _this.props.monitorTableSelectedRowData.SIGNALLOSS, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "画面丢失", quotaValue: _this.props.monitorTableSelectedRowData.IMAGELOSS, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "视频遮挡", quotaValue: _this.props.monitorTableSelectedRowData.COVERSTATUS, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "云台控制", quotaValue: _this.props.monitorTableSelectedRowData.PTZ, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME}
                    ];

                    $('#monitorPictrueStatusTable').bootstrapTable('resetView');
                    pictrueStatusData = [
                        {quotaName: "偏亮", quotaValue: _this.props.monitorTableSelectedRowData.BRIGHT, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "偏暗", quotaValue: _this.props.monitorTableSelectedRowData.DIM, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "偏色", quotaValue: _this.props.monitorTableSelectedRowData.COLORCOST, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "清晰度", quotaValue: _this.props.monitorTableSelectedRowData.DEFINITION, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "雪花", quotaValue: _this.props.monitorTableSelectedRowData.SNOWFLAKE, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "条纹", quotaValue: _this.props.monitorTableSelectedRowData.STREAK, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "冻结", quotaValue: _this.props.monitorTableSelectedRowData.FREEZE, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "滚屏", quotaValue: _this.props.monitorTableSelectedRowData.SCREENSCROLL, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "抖屏", quotaValue: _this.props.monitorTableSelectedRowData.SCREENSHAKE, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME}
                    ];
                    $('#monitorPictrueStatusTable').bootstrapTable('refreshOptions', {data: pictrueStatusData});
                    break;
                case "2":
                    var isImage_IPERROR, isImage_DISKFULLINFO, isImage_DISKERRINFO, isImage_DISKLOSTINFO, isImage_VIDEOERRCHAN, isImage_ENCODEERRCHAN, isImage_INPUTOVERLOADCHAN, isImage_USERILLEGAL, isImage_OTHERERROR;
                    var allColumnData = _this.props.groupAllColumnData;
                    for(var i = 0; i < allColumnData.length; i++) {
                        switch (allColumnData[i].savename) {
                            case "IPERROR":
                                isImage_IPERROR = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "DISKFULLINFO":
                                isImage_DISKFULLINFO = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "DISKERRINFO":
                                isImage_DISKERRINFO = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "DISKLOSTINFO":
                                isImage_DISKLOSTINFO = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "VIDEOERRCHAN":
                                isImage_VIDEOERRCHAN = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "ENCODEERRCHAN":
                                isImage_ENCODEERRCHAN = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "INPUTOVERLOADCHAN":
                                isImage_INPUTOVERLOADCHAN = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "USERILLEGAL":
                                isImage_USERILLEGAL = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "OTHERERROR":
                                isImage_OTHERERROR = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            default:
                                break;
                        }
                    }
                    communicationStatusData = [
                        {quotaName: "IP地址冲突", quotaValue: _this.props.monitorTableSelectedRowData.IPERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_IPERROR},
                        {quotaName: "硬盘满", quotaValue: _this.props.monitorTableSelectedRowData.DISKFULLINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_DISKFULLINFO},
                        {quotaName: "硬盘出错", quotaValue: _this.props.monitorTableSelectedRowData.DISKERRINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_DISKERRINFO},
                        {quotaName: "硬盘丢失", quotaValue: _this.props.monitorTableSelectedRowData.DISKLOSTINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_DISKLOSTINFO},
                        {quotaName: "视频异常通道", quotaValue: _this.props.monitorTableSelectedRowData.VIDEOERRCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_VIDEOERRCHAN},
                        {quotaName: "编码失败通道", quotaValue: _this.props.monitorTableSelectedRowData.ENCODEERRCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_ENCODEERRCHAN},
                        {quotaName: "输入过载通道", quotaValue: _this.props.monitorTableSelectedRowData.INPUTOVERLOADCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_INPUTOVERLOADCHAN},
                        {quotaName: "非法访问", quotaValue: _this.props.monitorTableSelectedRowData.USERILLEGAL, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_USERILLEGAL},
                        {quotaName: "其他错误", quotaValue: _this.props.monitorTableSelectedRowData.OTHERERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_OTHERERROR}
                    ];
                    break;
                case "3":
                    var isImage_IPERROR, isImage_DISKFULLINFO, isImage_DISKERRINFO, isImage_DISKLOSTINFO, isImage_BANDWIDTHFULL, isImage_USERILLEGAL, isImage_OTHERERROR;
                    var allColumnData = _this.props.groupAllColumnData;
                    for(var i = 0; i < allColumnData.length; i++) {
                        switch (allColumnData[i].savename) {
                            case "IPERROR":
                                isImage_IPERROR = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "DISKFULLINFO":
                                isImage_DISKFULLINFO = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "DISKERRINFO":
                                isImage_DISKERRINFO = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "DISKLOSTINFO":
                                isImage_DISKLOSTINFO = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "BANDWIDTHFULL":
                                isImage_BANDWIDTHFULL = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "USERILLEGAL":
                                isImage_USERILLEGAL = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "OTHERERROR":
                                isImage_OTHERERROR = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            default:
                                break;
                        }
                    }
                    communicationStatusData = [
                        {quotaName: "IP地址冲突", quotaValue: _this.props.monitorTableSelectedRowData.IPERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_IPERROR},
                        {quotaName: "硬盘满", quotaValue: _this.props.monitorTableSelectedRowData.DISKFULLINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_DISKFULLINFO},
                        {quotaName: "硬盘出错", quotaValue: _this.props.monitorTableSelectedRowData.DISKERRINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_DISKERRINFO},
                        {quotaName: "硬盘丢失", quotaValue: _this.props.monitorTableSelectedRowData.DISKLOSTINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_DISKLOSTINFO},
                        {quotaName: "宽带占满", quotaValue: _this.props.monitorTableSelectedRowData.BANDWIDTHFULL, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_BANDWIDTHFULL},
                        {quotaName: "非法访问", quotaValue: _this.props.monitorTableSelectedRowData.USERILLEGAL, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_USERILLEGAL},
                        {quotaName: "其他错误", quotaValue: _this.props.monitorTableSelectedRowData.OTHERERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_OTHERERROR}
                    ];
                    break;
                case "4":
                    var isImage_IPERROR, isImage_VIDEOERRCHAN, isImage_ENCODEERRCHAN, isImage_INPUTOVERLOADCHAN, isImage_USERILLEGAL, isImage_OTHERERROR;
                    var allColumnData = _this.props.groupAllColumnData;
                    for(var i = 0; i < allColumnData.length; i++) {
                        switch (allColumnData[i].savename) {
                            case "IPERROR":
                                isImage_IPERROR = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "VIDEOERRCHAN":
                                isImage_VIDEOERRCHAN = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "ENCODEERRCHAN":
                                isImage_ENCODEERRCHAN = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "INPUTOVERLOADCHAN":
                                isImage_INPUTOVERLOADCHAN = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "USERILLEGAL":
                                isImage_USERILLEGAL = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "OTHERERROR":
                                isImage_OTHERERROR = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            default:
                                break;
                        }
                    }
                    communicationStatusData = [
                        {quotaName: "IP地址冲突", quotaValue: _this.props.monitorTableSelectedRowData.IPERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_IPERROR},
                        {quotaName: "视频异常通道", quotaValue: _this.props.monitorTableSelectedRowData.VIDEOERRCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_VIDEOERRCHAN},
                        {quotaName: "编码失败通道", quotaValue: _this.props.monitorTableSelectedRowData.ENCODEERRCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_ENCODEERRCHAN},
                        {quotaName: "输入过载通道", quotaValue: _this.props.monitorTableSelectedRowData.INPUTOVERLOADCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_INPUTOVERLOADCHAN},
                        {quotaName: "非法访问", quotaValue: _this.props.monitorTableSelectedRowData.USERILLEGAL, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_USERILLEGAL},
                        {quotaName: "其他错误", quotaValue: _this.props.monitorTableSelectedRowData.OTHERERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_OTHERERROR}
                    ];
                    break;
                case "5":
                    var isImage_IPERROR, isImage_RAIDFULLINFO, isImage_RAIDERRINFO, isImage_RAIDLOSTINFO, isImage_TEMPERATUREOVER, isImage_USERILLEGAL, isImage_OTHERERROR;
                    var allColumnData = _this.props.groupAllColumnData;
                    for(var i = 0; i < allColumnData.length; i++) {
                        switch (allColumnData[i].savename) {
                            case "IPERROR":
                                isImage_IPERROR = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "RAIDFULLINFO":
                                isImage_RAIDFULLINFO = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "RAIDERRINFO":
                                isImage_RAIDERRINFO = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "RAIDLOSTINFO":
                                isImage_RAIDLOSTINFO = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "TEMPERATUREOVER":
                                isImage_TEMPERATUREOVER = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "USERILLEGAL":
                                isImage_USERILLEGAL = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            case "OTHERERROR":
                                isImage_OTHERERROR = allColumnData[i].isimage == "0" ? false : true;
                                break;
                            default:
                                break;
                        }
                    }
                    communicationStatusData = [
                        {quotaName: "IP地址冲突", quotaValue: _this.props.monitorTableSelectedRowData.IPERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_IPERROR},
                        {quotaName: "阵列满", quotaValue: _this.props.monitorTableSelectedRowData.RAIDFULLINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_RAIDFULLINFO},
                        {quotaName: "阵列出错", quotaValue: _this.props.monitorTableSelectedRowData.RAIDERRINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_RAIDERRINFO},
                        {quotaName: "阵列丢失", quotaValue: _this.props.monitorTableSelectedRowData.RAIDLOSTINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_RAIDLOSTINFO},
                        {quotaName: "温度过高", quotaValue: _this.props.monitorTableSelectedRowData.TEMPERATUREOVER, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_TEMPERATUREOVER},
                        {quotaName: "非法访问", quotaValue: _this.props.monitorTableSelectedRowData.USERILLEGAL, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_USERILLEGAL},
                        {quotaName: "其他错误", quotaValue: _this.props.monitorTableSelectedRowData.OTHERERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME, isImage: isImage_OTHERERROR}
                    ];
                    break;
            }
            $('#monitorCommunicationStatusTable').bootstrapTable('refreshOptions', {data: communicationStatusData});
        });
    },

    render: function() {
        var typeName = "";
        switch (this.props.monitorType) {
            case "1":
                typeName = "摄像头";
                return (
                    <div className="row monitorStatusTab">
                        <div className='boldFontStyle marginTop_10'>{typeName}通讯状态</div>
                        <table id='monitorCommunicationStatusTable'
                               data-toggle='table'
                               data-classes='table table-no-bordered table-striped table-hover'>
                        </table>
                        <div className='boldFontStyle marginTop_10'>{typeName}图像状态</div>
                        <table id='monitorPictrueStatusTable'
                               data-toggle='table'
                               data-classes='table table-no-bordered table-striped table-hover'>
                        </table>
                    </div>
                );
                break;
            case "2":
                typeName = "DVR";
            case "3":
                typeName = "NVR";
            case "4":
                typeName = "IPSAN";
            case "5":
                typeName = "编码器";
                return (
                    <div className="row monitorStatusTab">
                        <div className='boldFontStyle marginTop_10'>{typeName}状态</div>
                        <table id='monitorCommunicationStatusTable'
                               data-toggle='table'
                               data-classes='table table-no-bordered table-striped table-hover'>
                        </table>
                    </div>
                );
                break;
            default:
                typeName = "";
                return (
                    <div className="row monitorStatusTab">
                    </div>
                );
                break;
        }
    }
});

MonitorStatusTab.propTypes = {
	monitorType: PropTypes.string.isRequired,
	monitorTableSelectedRowData: PropTypes.object,
	groupAllColumnData: PropTypes.array.isRequired
}

module.exports = MonitorStatusTab;
