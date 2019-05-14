/*
* 资源监测-统一监控平台-设备信息-视频丢失页
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

var MonitorVideoLossTable = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
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
        $('#monitorVideoLossTable').bootstrapTable({
            columns: [
                {
                    title: '录像丢失',
                    field: 'no',
                    sortable: false
                }, {
                    title: '持续时间(秒)',
                    field: 'lostduration',
                    sortable: false
                }, {
                    title: '开始时间',
                    field: 'loststartime',
                    sortable: false
                }, {
                    title: '结束时间',
                    field: 'lostendtime',
                    sortable: false
                }
            ]
        });
    },

    componentDidUpdate: function() {
        var _this = this;
        $('#deviceInfoModal').on('shown.bs.modal', function () {
            $('#monitorVideoLossTable').bootstrapTable('resetView');
            $('#monitorVideoLossTable').bootstrapTable('refreshOptions', {
                data: _this.props.videoLossData,
                pageNumber: 1
            });
        });
    },

    render: function() {
        return (
            <div className='row monitorBasicInfoTab'>
                <table id='monitorVideoLossTable'
                       data-toggle='table'
                       data-classes='table table-no-bordered table-striped table-hover'
                       data-pagination='true'
                       data-page-size='15'
                       data-page-list='[10, 15]'>
                </table>
            </div>
        );
    }
});

MonitorVideoLossTable.propTypes = {
	videoLossData: PropTypes.array.isRequired
}

module.exports = MonitorVideoLossTable;
