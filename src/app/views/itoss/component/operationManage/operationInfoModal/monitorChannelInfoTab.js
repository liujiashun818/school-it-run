var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
//var History = ReactRouter.History;

var MonitorChannelInfoTable = React.createClass({
    //mixins: [History],//FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },
    getInitialState: function() {
        return {
            //monitorChannelInfoData: []
        };
    },
    componentDidMount: function() {
        var monitorChannelInfoData = [];
        $('#monitorChannelInfoTable').bootstrapTable({
            columns: [
                {
                    title: '名称',
                    field: 'VIDEONAME',
                    align: 'left',
                    halign: 'left',
                    sortable: false
                }, {
                    title: '国标编码',
                    field: 'VIDEOFLAG',
                    align: 'left',
                    halign: 'left',
                    width: 150,
                    sortable: false
                }, {
                    title: 'IP地址',
                    field: 'IPADDRESS',
                    align: 'left',
                    halign: 'left',
                    width: 150,
                    sortable: false
                }
            ],
            data: this.props.channelInfoData
        });

        var _this = this;
        $('#deviceInfoModal').on('shown.bs.modal', function () {
            $('#monitorChannelInfoTable').bootstrapTable('resetView');
            $('#monitorChannelInfoTable').bootstrapTable('refreshOptions', {data: _this.props.channelInfoData});
        });
    },

    render: function() {
        return (
            <div className='row monitorBasicInfoTab'>
                <table id='monitorChannelInfoTable'
                       data-toggle='table'
                       data-classes='table table-no-bordered table-striped table-hover'>
                </table>
            </div>
        );
    }
});

module.exports = MonitorChannelInfoTable;
