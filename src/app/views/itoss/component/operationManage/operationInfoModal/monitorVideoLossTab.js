var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
// var History = ReactRouter.History;

var MonitorVideoLossTable = React.createClass({
    //mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },
    getInitialState: function() {
        return {
            //monitorVideoLossData: []
        };
    },
    componentDidMount: function() {
        // var monitorVideoLossData = [];
        $('#monitorVideoLossTable').bootstrapTable({
            columns: [
                {
                    title: '录像丢失',
                    field: 'no',
                    align: 'left',
                    halign: 'left',
                    sortable: false
                }, {
                    title: '持续时间(秒)',
                    field: 'lostduration',
                    align: 'left',
                    halign: 'left',
                    sortable: false
                }, {
                    title: '开始时间',
                    field: 'loststartime',
                    align: 'left',
                    halign: 'left',
                    sortable: false
                }, {
                    title: '结束时间',
                    field: 'lostendtime',
                    align: 'left',
                    halign: 'left',
                    sortable: false
                }
            ]
        });

        var _this = this;
        $('#deviceInfoModal').on('shown.bs.modal', function () {
            $('#monitorVideoLossTable').bootstrapTable('resetView');
            $('#monitorVideoLossTable').bootstrapTable('refreshOptions', {data: _this.props.videoLossData});
        });
    },

    render: function() {
        return (
            <div className='row monitorBasicInfoTab'>
                <table id='monitorVideoLossTable'
                       data-toggle='table'
                       data-classes='table table-no-bordered table-striped table-hover'>
                </table>
            </div>
        );
    }
});

module.exports = MonitorVideoLossTable;
