/**
 * Created by SHIN on 2016/5/26.
 * 监测器日志列表模态框
 */
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MonitorNTEventLogTableModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    componentDidMount: function() {
        $('#monitorNTEventLogTable').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    radio: true
                }, {
                    title: '日志名称',
                    field: 'EVENT_NAME',
                    sortable: true
                }
            ],
            data: []
        });

        var _this = this;
        $('#monitorNTEventLogTableModal').on('show.bs.modal', function () {
            $('#monitorNTEventLogTable').bootstrapTable('resetView');
            $('#monitorNTEventLogTable').bootstrapTable('refreshOptions', {data: _this.props.monitorNTEventLogs});
        });
    },

    componentDidUpdate:function(){
        $('#monitorNTEventLogTable').bootstrapTable('refreshOptions', {data: this.props.monitorNTEventLogs});
    },

    _handleOnClickOK: function() {
        var selectedNTEventLog = $('#monitorNTEventLogTable').bootstrapTable('getSelections');
        if(selectedNTEventLog.length == 0) {
            this.props.setSelectedMonitorNTEventLog(null);
        }
        else {
            this.props.setSelectedMonitorNTEventLog(selectedNTEventLog[0]);
        }
    },

    render : function(){
        return (
            <div className="modal fade" id="monitorNTEventLogTableModal" tabIndex="-1" role="dialog" aria-labelledby="monitorNTEventLogTableModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog" style={{width:"400px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">日志列表</h4>
                        </div>
                        <div className="modal-body">
                            <div className='marginTop_5'>
                                <table id='monitorNTEventLogTable'
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

module.exports = MonitorNTEventLogTableModal;
