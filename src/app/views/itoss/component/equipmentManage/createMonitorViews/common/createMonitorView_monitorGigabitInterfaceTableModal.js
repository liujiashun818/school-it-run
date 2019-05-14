/**
 * Created by SHIN on 2016/5/26.
 * 监测器网卡列表模态框
 */
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

function statusFormatter(value, row) {
    switch (value) {
        case "1":
            return "up";
            break;
        case "2":
            return "down";
            break;
        case "3":
            return "testing";
            break;
        case "4":
            return "unknown";
            break;
        case "5":
            return "dormant";
            break;
        case "6":
            return "notPresent";
            break;
        case "7":
            return "lowerLayerDown";
            break;
        case "65536":
            return "activing";
            break;
        case "65537":
            return "block";
            break;
        case "65538":
            return "config";
            break;
        case "65539":
            return "localloopback";
            break;
        case "65540":
            return "remoteloopback";
            break;
        case "65541":
            return "payloadloopback";
            break;
        case "65542":
            return "blockandlocalloopback";
            break;
        case "65543":
            return "blockandremoteloopback";
            break;
        case "65544":
            return "blockandpayloadloopback";
            break;
        case "65545":
            return "linkrxblock";
            break;
        case "65546":
            return "linktxblock";
            break;
        case "65547":
            return "linkallblock";
            break;
        case "65548":
            return "fault";
            break;
        case "65549":
            return "unconfig";
            break;
        case "65550":
            return "empty";
            break;
        default:
            return value;
            break;
    }
}

var MonitorGigabitInterfaceTableModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    componentDidMount: function() {
        $('#monitorGigabitInterfaceTable').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    radio: true
                }, {
                    title: 'Status',
                    field: 'status',
                    formatter: statusFormatter,
                    sortable: true
                }, {
                    title: '千兆网络接口',
                    field: 'name',
                    sortable: true
                }
            ],
            data: []
        });

        var _this = this;
        $('#monitorGigabitInterfaceTableModal').on('show.bs.modal', function () {
            $('#monitorGigabitInterfaceTable').bootstrapTable('resetView');
            $('#monitorGigabitInterfaceTable').bootstrapTable('refreshOptions', {data: _this.props.monitorNetworks});
        });
    },

    componentDidUpdate:function(){
        $('#monitorGigabitInterfaceTable').bootstrapTable('refreshOptions', {data: this.props.monitorNetworks});
    },

    _handleOnClickOK: function() {
        var selectedNetwork = $('#monitorGigabitInterfaceTable').bootstrapTable('getSelections');
        if(selectedNetwork.length == 0) {
            this.props.setSelectedMonitorNetwork(null);
        }
        else {
            this.props.setSelectedMonitorNetwork(selectedNetwork[0]);
        }
    },

    render : function(){
        return (
            <div className="modal fade" id="monitorGigabitInterfaceTableModal" tabIndex="-1" role="dialog" aria-labelledby="monitorGigabitInterfaceTableModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog" style={{width:"400px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">网络接口列表</h4>
                        </div>
                        <div className="modal-body">
                            <div className='marginTop_5'>
                                <table id='monitorGigabitInterfaceTable'
                                       data-toggle='table'
                                       data-classes='table table-no-bordered table-striped table-hover'
                                       data-height={200}
                                       data-click-to-select='true'>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK}>确定</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MonitorGigabitInterfaceTableModal;
