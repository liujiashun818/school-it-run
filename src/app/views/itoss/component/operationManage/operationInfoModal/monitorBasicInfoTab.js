var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
//var History = ReactRouter.History;

var MonitorBasicInfoTable = React.createClass({
    //mixins: [History],//, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },
    getInitialState: function() {
        return {
            //monitorBasicInfoData: []
        };
    },
    componentDidMount: function() {
        var monitorBasicInfoData = [];
        $('#monitorBasicInfoTable').bootstrapTable({
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
                    sortable: false
                }, {
                    title: '监测时间',
                    field: 'alarmTime',
                    align: 'left',
                    halign: 'left',
                    width: 150,
                    sortable: false
                }
            ],
            data: monitorBasicInfoData
        });

        var _this = this;
        $('#deviceInfoModal').on('shown.bs.modal', function () {
            $('#monitorBasicInfoTable').bootstrapTable('resetView');
            switch (_this.props.monitorType) {
                case "1":
                    monitorBasicInfoData = [
                        {quotaName: "摄像机名称", quotaValue: _this.props.monitorTableSelectedRowData.VIDEONAME, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "摄像机IP地址", quotaValue: _this.props.monitorTableSelectedRowData.IPADDRESS, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "摄像机国标编码", quotaValue: _this.props.monitorTableSelectedRowData.LAG, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "父节点国标编码", quotaValue: _this.props.monitorTableSelectedRowData.SERVERFLAG, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "区域编码", quotaValue: _this.props.monitorTableSelectedRowData.CIVILCODE, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "厂商", quotaValue: "", alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "型号", quotaValue: _this.props.monitorTableSelectedRowData.BRAND, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "安装地址", quotaValue: _this.props.monitorTableSelectedRowData.IPLACE, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "摄像机朝向", quotaValue: _this.props.monitorTableSelectedRowData.DIRECTIONTYPE, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "设备类型", quotaValue: _this.props.monitorTableSelectedRowData.BASETYPE, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME}
                    ];
                    break;
                case "2":
                case "3":
                case "4":
                case "5":
                    monitorBasicInfoData = [
                        {quotaName: "名称", quotaValue: _this.props.monitorTableSelectedRowData.SERVERNAME, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "IP地址", quotaValue: _this.props.monitorTableSelectedRowData.SERVERIP, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "国标编码", quotaValue: _this.props.monitorTableSelectedRowData.LAG, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "父节点国标编码", quotaValue: _this.props.monitorTableSelectedRowData.SERVERFLAG, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "区域编码", quotaValue: _this.props.monitorTableSelectedRowData.CIVILCODE, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "厂商", quotaValue: "", alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                        {quotaName: "品牌", quotaValue: _this.props.monitorTableSelectedRowData.MANUFACTURER, alarmTime: _this.props.monitorTableSelectedRowData.ALARMTIME},
                    ];
                    break;
            }

            $('#monitorBasicInfoTable').bootstrapTable('refreshOptions', {data: monitorBasicInfoData});
        });
    },

    render: function() {
        return (
            <div className='row monitorBasicInfoTab'>
                <table id='monitorBasicInfoTable'
                       data-toggle='table'
                       data-classes='table table-no-bordered table-striped table-hover'>
                </table>
            </div>
        );
    }
});

module.exports = MonitorBasicInfoTable;
