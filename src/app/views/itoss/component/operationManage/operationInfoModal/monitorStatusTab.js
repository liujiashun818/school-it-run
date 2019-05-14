var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
//var History = ReactRouter.History;

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
        '<img src="' + imgSrc + '"/>'
    ].join('');
}

var MonitorStatusTab = React.createClass({
    //mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
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
                    align: 'left',
                    halign: 'left',
                    width: 120,
                    sortable: false
                }, {
                    title: '指标值',
                    field: 'quotaValue',
                    align: 'left',
                    halign: 'left',
                    sortable: false,
                    formatter: statusFormatter
                }, {
                    title: '监测时间',
                    field: 'alarmTime',
                    align: 'left',
                    halign: 'left',
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
                    align: 'left',
                    halign: 'left',
                    width: 120,
                    sortable: false
                }, {
                    title: '指标值',
                    field: 'quotaValue',
                    align: 'left',
                    halign: 'left',
                    sortable: false,
                    formatter: statusFormatter
                }, {
                    title: '监测时间',
                    field: 'alarmTime',
                    align: 'left',
                    halign: 'left',
                    width: 150,
                    sortable: false
                }
            ],
            data: pictrueStatusData
        });

        var _this = this;
        $('#deviceInfoModal').on('shown.bs.modal', function () {
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
                    communicationStatusData = [
                        {quotaName: "IP地址冲突", quotaValue: _this.props.monitorTableSelectedRowData.IPERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "硬盘满", quotaValue: _this.props.monitorTableSelectedRowData.DISKFULLINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "硬盘出错", quotaValue: _this.props.monitorTableSelectedRowData.DISKERRINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "硬盘丢失", quotaValue: _this.props.monitorTableSelectedRowData.DISKLOSTINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "视频异常通道", quotaValue: _this.props.monitorTableSelectedRowData.VIDEOERRCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "编码失败通道", quotaValue: _this.props.monitorTableSelectedRowData.ENCODEERRCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "输入过载通道", quotaValue: _this.props.monitorTableSelectedRowData.INPUTOVERLOADCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "非法访问", quotaValue: _this.props.monitorTableSelectedRowData.USERILLEGAL, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "其他错误", quotaValue: _this.props.monitorTableSelectedRowData.OTHERERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME}
                    ];
                    break;
                case "3":
                    communicationStatusData = [
                        {quotaName: "IP地址冲突", quotaValue: _this.props.monitorTableSelectedRowData.IPERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "硬盘满", quotaValue: _this.props.monitorTableSelectedRowData.DISKFULLINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "硬盘出错", quotaValue: _this.props.monitorTableSelectedRowData.DISKERRINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "硬盘丢失", quotaValue: _this.props.monitorTableSelectedRowData.DISKLOSTINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "宽带占满", quotaValue: _this.props.monitorTableSelectedRowData.BANDWIDTHFULL, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "非法访问", quotaValue: _this.props.monitorTableSelectedRowData.USERILLEGAL, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "其他错误", quotaValue: _this.props.monitorTableSelectedRowData.OTHERERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME}
                    ];
                    break;
                case "4":
                    communicationStatusData = [
                        {quotaName: "IP地址冲突", quotaValue: _this.props.monitorTableSelectedRowData.IPERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "阵列满", quotaValue: _this.props.monitorTableSelectedRowData.RAIDFULLINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "阵列出错", quotaValue: _this.props.monitorTableSelectedRowData.RAIDERRINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "阵列丢失", quotaValue: _this.props.monitorTableSelectedRowData.RAIDLOSTINFO, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "温度过高", quotaValue: _this.props.monitorTableSelectedRowData.TEMPERATUREOVER, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "非法访问", quotaValue: _this.props.monitorTableSelectedRowData.USERILLEGAL, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "其他错误", quotaValue: _this.props.monitorTableSelectedRowData.OTHERERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME}
                    ];
                    break;
                case "5":
                    communicationStatusData = [
                        {quotaName: "IP地址冲突", quotaValue: _this.props.monitorTableSelectedRowData.IPERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "视频异常通道", quotaValue: _this.props.monitorTableSelectedRowData.VIDEOERRCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "编码失败通道", quotaValue: _this.props.monitorTableSelectedRowData.ENCODEERRCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "输入过载通道", quotaValue: _this.props.monitorTableSelectedRowData.INPUTOVERLOADCHAN, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "非法访问", quotaValue: _this.props.monitorTableSelectedRowData.USERILLEGAL, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "其他错误", quotaValue: _this.props.monitorTableSelectedRowData.OTHERERROR, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME}
                    ];
                    break;
            }
            $('#monitorCommunicationStatusTable').bootstrapTable('refreshOptions', {data: communicationStatusData});
        });
    },

    componentDidUpdate: function() {
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
            ]
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
            ]
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
        }
    }
});

module.exports = MonitorStatusTab;
