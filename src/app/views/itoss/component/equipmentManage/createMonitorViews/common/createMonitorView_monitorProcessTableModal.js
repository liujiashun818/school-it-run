/**
 * Created by SHIN on 2016/5/26.
 * 监测器进程列表模态框
 */
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MonitorProcessTableModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    componentDidMount: function() {
        $('#monitorProcessTable').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    radio: true
                }, {
                    title: '进程',
                    field: 'name',
                    sortable: true
                }
            ],
            data: []
        });

        var _this = this;
        $('#monitorProcessTableModal').on('show.bs.modal', function () {
            $('#monitorProcessTable').bootstrapTable('resetView');
            $('#monitorProcessTable').bootstrapTable('refreshOptions', {data: _this.props.monitorProcesses});
        });
    },

    componentDidUpdate:function(){
        $('#monitorProcessTable').bootstrapTable('refreshOptions', {data: this.props.monitorProcesses});
    },

    _handleOnClickOK: function() {
        var selectedProcess = $('#monitorProcessTable').bootstrapTable('getSelections');
        if(selectedProcess.length == 0) {
            this.props.setSelectedMonitorProcess(null);
        }
        else {
            this.props.setSelectedMonitorProcess(selectedProcess[0]);
        }
    },

    render : function(){
        return (
            <div className="modal fade" id="monitorProcessTableModal" tabIndex="-1" role="dialog" aria-labelledby="monitorProcessTableModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog" style={{width:"400px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">进程列表</h4>
                        </div>
                        <div className="modal-body">
                            <div className='marginTop_5'>
                                <table id='monitorProcessTable'
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

module.exports = MonitorProcessTableModal;
