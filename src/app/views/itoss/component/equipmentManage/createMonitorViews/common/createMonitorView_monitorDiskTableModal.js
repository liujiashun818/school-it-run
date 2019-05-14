/**
 * Created by SHIN on 2016/5/26.
 * 监测器磁盘列表模态框
 */
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MonitorDiskTableModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    componentDidMount: function() {
        $('#monitorDiskTable').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    radio: true
                }, {
                    title: '磁盘',
                    field: 'name',
                    sortable: false
                }
            ],
            data: [],
            rowAttributes:function(row,index){
              return {
                key: 'monitorDisk'+index
              }
            }
        });

        var _this = this;
        $('#monitorDiskTableModal').on('show.bs.modal', function () {
            $('#monitorDiskTable').bootstrapTable('resetView');
            $('#monitorDiskTable').bootstrapTable('refreshOptions', {data: _this.props.monitorDisks});
        });
    },

    componentDidUpdate:function(){
        $('#monitorDiskTable').bootstrapTable('refreshOptions', {data: this.props.monitorDisks});
    },

    _handleOnClickOK: function() {
        var selectedDisk = $('#monitorDiskTable').bootstrapTable('getSelections');
        if(selectedDisk.length == 0) {
            this.props.setSelectedMonitorDisk(null);
        }
        else {
            this.props.setSelectedMonitorDisk(selectedDisk[0]);
        }
    },

    render : function(){
        return (
            <div className="modal fade" id="monitorDiskTableModal" tabIndex="-1" role="dialog" aria-labelledby="monitorDiskTableModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog" style={{width:"400px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">磁盘列表</h4>
                        </div>
                        <div className="modal-body">
                            <div className='marginTop_5'>
                                <table id='monitorDiskTable'
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

module.exports = MonitorDiskTableModal;
