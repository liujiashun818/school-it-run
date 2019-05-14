/**
 * Created by SHIN on 2016/5/26.
 * 监测器磁盘IO 列表模态框
 */
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MonitorDiskIOTableModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    componentDidMount: function() {
        $('#monitorDiskIOTable').bootstrapTable({
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
                key: 'monitorDiskIO'+index
              }
            }
        });

        var _this = this;
        $('#monitorDiskIOTableModal').on('show.bs.modal', function () {
            $('#monitorDiskIOTable').bootstrapTable('resetView');
            $('#monitorDiskIOTable').bootstrapTable('refreshOptions', {data: _this.props.monitorDiskIONames});
        });
    },

    componentDidUpdate:function(){
        $('#monitorDiskIOTable').bootstrapTable('refreshOptions', {data: this.props.monitorDiskIONames});
    },

    _handleOnClickOK: function() {
        var selectedDiskIO = $('#monitorDiskIOTable').bootstrapTable('getSelections');
        if(selectedDisk.length == 0) {
            this.props.setSelectedMonitorDiskIOName(null);
        }
        else {
            this.props.setSelectedMonitorDiskIOName(selectedDiskIO[0]);
        }
    },

    render : function(){
        return (
            <div className="modal fade" id="monitorDiskIOTableModal" tabIndex="-1" role="dialog" aria-labelledby="monitorDiskIOTableModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog" style={{width:"400px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">磁盘列表</h4>
                        </div>
                        <div className="modal-body">
                            <div className='marginTop_5'>
                                <table id='monitorDiskIOTable'
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

module.exports = MonitorDiskIOTableModal;
