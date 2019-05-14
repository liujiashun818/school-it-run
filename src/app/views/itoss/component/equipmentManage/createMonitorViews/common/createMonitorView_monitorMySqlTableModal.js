/**
 * Created by SHIN on 2016/5/30.
 * Mysql监测器计数器列表模态框
 */

import React, { PropTypes } from 'react'
require('bootstrap');
var Router = require('react-router');
var History = require('react-router').History;

var MonitorMySqlTableModal = React.createClass({
    componentDidMount: function() {
        $('#monitorMySqlTable').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '计数器',
                    field: 'COUNT_NAME',
                    sortable: true
                }
            ],
            data: []
        });
        var _this = this;
        $('#monitorMySqlTableModal').on('show.bs.modal', function () {
            $('#monitorMySqlTable').bootstrapTable('resetView');
            $('#monitorMySqlTable').bootstrapTable('refreshOptions', {data: _this.props.mySqlCounterData});
        });
    },
    componentDidUpdate:function(){
        const {mySqlCounterData,mySqlCurrentCounterData } = this.props;
        $('#monitorMySqlTable').bootstrapTable('refreshOptions', {data: this.props.mySqlCounterData});
        if(mySqlCurrentCounterData.length > 0){
          for (var i = 0; i < mySqlCounterData.length; i++) {
            var COUNT_NAME = mySqlCounterData[i].COUNT_NAME;
            for (var n = 0; n < mySqlCurrentCounterData.length; n++) {
               if(COUNT_NAME == mySqlCurrentCounterData[n]){
                 $('#monitorMySqlTable').bootstrapTable('check', i);
                 break;
               };
            };
          };
        };
    },
    _handleOnClickOK: function() {
        var selectedItem = $('#monitorMySqlTable').bootstrapTable('getSelections');
        if(selectedItem.length == 0) {
            //MySQL监测器:计数器 当前选择项数据
            this.props.setMySqlMonitorCurrentCounterData([]);
        }
        else {
            var currentCounterData = [];
            for (var i = 0; i < selectedItem.length; i++) {
              currentCounterData.push(selectedItem[i].COUNT_NAME);
            };
            //MySQL监测器:计数器 当前选择项数据
            this.props.setMySqlMonitorCurrentCounterData(currentCounterData);
        }
    },
    render : function(){
        return (
            <div className="modal fade" id="monitorMySqlTableModal" tabIndex="-1" role="dialog" aria-labelledby="monitorMySqlTableModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog" style={{width:"400px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">计数器列表</h4>
                        </div>
                        <div className="modal-body">
                            <div className='marginTop_5'>
                                <table id='monitorMySqlTable'
                                       data-search='true'
                                       data-toggle='table'
                                       data-classes='table table-no-bordered table-striped table-hover'
                                       data-height={400}
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

module.exports = MonitorMySqlTableModal;
