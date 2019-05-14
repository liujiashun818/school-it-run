/**
 * Created by SHIN on 2016/5/26.
 * 监测器服务列表模态框
 */
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MonitorServiceTableModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    componentDidMount: function() {
        $('#monitorServiceTable').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    radio: true
                }, {
                    title: '服务',
                    field: 'SERVICE_NAME',
                    sortable: true
                }
            ],
            data: []
        });

        var _this = this;
        $('#monitorServiceTableModal').on('show.bs.modal', function () {
            $('#monitorServiceTable').bootstrapTable('resetView');
            $('#monitorServiceTable').bootstrapTable('refreshOptions', {data: _this.props.monitorServices});
        });
    },

    componentDidUpdate:function(){
        $('#monitorServiceTable').bootstrapTable('refreshOptions', {data: this.props.monitorServices});
    },

    _handleOnClickOK: function() {
        var selectedService = $('#monitorServiceTable').bootstrapTable('getSelections');
        if(selectedService.length == 0) {
            this.props.setSelectedMonitorService(null);
        }
        else {
            this.props.setSelectedMonitorService(selectedService[0]);
        }
    },

    render : function(){
        return (
            <div className="modal fade" id="monitorServiceTableModal" tabIndex="-1" role="dialog" aria-labelledby="monitorServiceTableModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog" style={{width:"400px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">服务列表</h4>
                        </div>
                        <div className="modal-body">
                            <div className='marginTop_5'>
                                <table id='monitorServiceTable'
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

module.exports = MonitorServiceTableModal;
