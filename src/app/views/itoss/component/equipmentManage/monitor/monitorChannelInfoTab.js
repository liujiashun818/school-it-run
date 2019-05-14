/*
* 资源监测-统一监控平台-设备信息-通道信息页
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

var MonitorChannelInfoTable = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
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
        $('#monitorChannelInfoTable').bootstrapTable({
            columns: [
                {
                    title: '名称',
                    field: 'VIDEONAME',
                    sortable: false
                }, {
                    title: '国标编码',
                    field: 'VIDEOFLAG',
                    width: 150,
                    sortable: false
                }, {
                    title: 'IP地址',
                    field: 'IPADDRESS',
                    width: 150,
                    sortable: false
                }
            ]
        });
    },

    componentDidUpdate: function() {
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
                       data-classes='table table-no-bordered table-striped table-hover'
                       data-pagination='true'
                       data-page-size='10'
                       data-page-list='[5, 10]'>
                </table>
            </div>
        );
    }
});

MonitorChannelInfoTable.propTypes = {
	channelInfoData: PropTypes.array.isRequired
}

module.exports = MonitorChannelInfoTable;
