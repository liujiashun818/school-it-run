/**
 * Created by SHIN on 2016/5/26.
 * 获取脚本模态框
 */
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
import { connect } from 'react-redux'
import * as EquipmentActions from '../../../../../../actions/equipment_action'

var MonitorScriptTableModal = React.createClass({
    componentDidMount: function() {
        $('#monitorScriptTable').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    radio: true
                }, {
                    title: '脚本名称',
                    field: 'SCRIPT_NAME',
                    sortable: true
                }
            ],
            data: []
        });

        var _this = this;
        $('#monitorScriptTableModal').on('show.bs.modal', function () {
            $('#monitorScriptTable').bootstrapTable('resetView');
            $('#monitorScriptTable').bootstrapTable('refreshOptions', {data: _this.props.monitorScripts});
        });
        $("#scriptMonitorPath").val('/root/scripts');
    },
    componentDidUpdate:function(){
        $('#monitorScriptTable').bootstrapTable('refreshOptions', {data: this.props.monitorScripts});
    },

    _handleOnClickOK: function() {
        var selectedScript = $('#monitorScriptTable').bootstrapTable('getSelections');
        if(selectedScript.length == 0) {
            this.props.setSelectedMonitorScript(null);
        }
        else {
            this.props.setSelectedMonitorScript(selectedScript[0]);
        }
    },

    // getScripts:function(){
    //   // const { dispatch } = this.props;
    //   var path = $("#scriptMonitorPath").val();
    //   var filter = [];
    //   if(path!=""){
    //     filter.push({"key":"FILE_PATH","value":path});
    //   }
    //   this.props.getScripts(filter);
    // },

    handleOnClickGetMonitorScript:function(){
      const { dispatch, selectedNode } = this.props;
        var path = $("#scriptMonitorPath").val();

        // var filter = [];

        // var filter = [];
        // if(path!=""){
        //   // filter.push({"key":"FILE_PATH","value":path});
        //   // dispatch(EquipmentActions.getMonitorScripts("equipmentId",'/root/scripts'));
        //   filter.push({"key":"FILE_PATH","value":path});
        //
        // }
        var EquipmentId = "";
        if(selectedNode){
          EquipmentId = selectedNode.id;
        };
        var filter ={
          equipmentId:EquipmentId,
          scriptPath:path
        };
        this.props.getMonitorScripts(filter);

    },

        // handleOnClickGetMonitorScript:function(){
        //     const { dispatch, selectedNode } = this.props;
        //     dispatch(EquipmentActions.getMonitorScripts(selectedNode.id, selectedNode.type));
        // },

    render : function(){
        return (
            <div className="modal fade" id="monitorScriptTableModal" tabIndex="-1" role="dialog" aria-labelledby="monitorScriptTableModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog" style={{width:"500px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">获取脚本</h4>
                        </div>
                        <div className="modal-body">
                          <div className="filterHeader" style={{"height":"32px"}}>
                            <div className="input-group pull-left" style={{width:"300px"}}>
                              <span className="input-group-addon">脚本路径</span>
                              <input type="text" className="form-control" id="scriptMonitorPath"/>
                            </div>
                            <input type="button" value="获取脚本" className="btn btn-success pull-right" onClick={this.handleOnClickGetMonitorScript}/>
                          </div>
                          <div className="filterTable">
                            <table id='monitorScriptTable'
                                   data-toggle='table'
                                   data-classes='table table-no-bordered table-striped table-hover'
                                   data-height={200}
                                   data-click-to-select='true'>
                            </table>
                          </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this._handleOnClickOK}>确定</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
// module.exports = CreateMonitorView_Script;

module.exports = MonitorScriptTableModal;
