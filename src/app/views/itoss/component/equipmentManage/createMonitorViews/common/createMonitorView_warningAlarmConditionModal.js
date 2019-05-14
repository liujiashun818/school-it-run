/**
 * Created by SHIN on 2015/12/29.
 */
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var ReactWidgets = require('react-widgets');

var conditionSymbolData = ['==','!=','>=','>','<=','<','contains','!contains'];

var WarningAlarmConditionModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    getInitialState: function () {
        return {
            selectedConditionName: null,
            selectedConditionSymbol: conditionSymbolData[0]
        }
    },

    componentDidMount: function() {
        $('#warningAlarmConditionsTable').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '项目',
                    field: 'conditionName',
                    sortable: false
                }, {
                    title: '操作符',
                    field: 'conditionSymbol',
                    sortable: false
                }, {
                    title: '值',
                    field: 'conditionValue',
                    sortable: false
                }, {
                    title: '关系',
                    field: 'conditionRelation',
                    sortable: false
                }
            ],
            data: []
        });

        var _this = this;
        $('#warningAlarmConditionModal').on('show.bs.modal', function () {
            _this.setState({selectedConditionName: _this.props.monitorAlarmConditionNameData.length!=0 ? _this.props.monitorAlarmConditionNameData[0] : null});
            _this.setState({selectedConditionSymbol: conditionSymbolData[0]});
            document.getElementById("warningAlarmConditionModal_conditionValue").value = "";
            document.getElementById('warningAlarmConditionModal_radio_And').checked = true;

            $('#warningAlarmConditionsTable').bootstrapTable('resetView');
            $('#warningAlarmConditionsTable').bootstrapTable('refreshOptions', {data: _this.props.monitorSettingWarningConditionsData});
        });
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if (nextProps.monitorAlarmConditionNameData !== this.props.monitorAlarmConditionNameData) {
            this.setState({selectedConditionName: nextProps.monitorAlarmConditionNameData.length!=0 ? nextProps.monitorAlarmConditionNameData[0] : null});
        }
        return true;
    },

    componentDidUpdate:function(){
        $('#warningAlarmConditionsTable').bootstrapTable('refreshOptions', {data: this.props.monitorSettingWarningConditionsData});
    },

    _handleOnClickAdd: function() {
        var warningConditionsData = this.props.monitorSettingWarningConditionsData.slice(0);
        var conditionName = this.state.selectedConditionName.name;
        var returnValue = this.state.selectedConditionName.saveItem;
        var conditionSymbol = this.state.selectedConditionSymbol;
        var conditionValue = document.getElementById("warningAlarmConditionModal_conditionValue").value;
        var conditionRelation = document.getElementById('warningAlarmConditionModal_radio_And').checked ? "0" : "1";
        for(var i = 0; i < warningConditionsData.length; i++) {
            if(conditionName == warningConditionsData[i].conditionName && conditionSymbol == warningConditionsData[i].conditionSymbol
                && conditionValue == warningConditionsData[i].conditionValue && conditionRelation == warningConditionsData[i].conditionRelation) {
                alert("该条件已存在");
                return false;
            }
        }
        warningConditionsData.push({id:'', conditionName: conditionName, returnValue: returnValue, conditionSymbol: conditionSymbol, conditionValue: conditionValue, conditionRelation: conditionRelation});
        this.props.setMonitorSettingWarningConditionsData(warningConditionsData);
        $('#warningAlarmConditionsTable').bootstrapTable('refreshOptions', {data: this.props.monitorSettingWarningConditionsData});
    },

    _handleOnClickDelete: function() {
        var selectedConditionData = $('#warningAlarmConditionsTable').bootstrapTable('getSelections');
        var warningConditionsData = this.props.monitorSettingWarningConditionsData.slice(0);
        for(var i = 0; i < selectedConditionData.length; i++) {
            for(var j = 0; j< warningConditionsData.length; j++) {
                if(selectedConditionData[i].conditionName == warningConditionsData[j].conditionName && selectedConditionData[i].conditionSymbol == warningConditionsData[j].conditionSymbol
                    && selectedConditionData[i].conditionValue == warningConditionsData[j].conditionValue && selectedConditionData[i].conditionRelation == warningConditionsData[j].conditionRelation) {
                    warningConditionsData.splice(j, 1);
                    j--;
                }
            }
        }
        this.props.setMonitorSettingWarningConditionsData(warningConditionsData);
        $('#warningAlarmConditionsTable').bootstrapTable('refreshOptions', {data: this.props.monitorSettingWarningConditionsData});
    },

    _handleOnClickOK: function() {
        var monitorSettingWarningConditionsData = this.props.monitorSettingWarningConditionsData.slice(0);
        var monitorWarningConditionsData = this.props.monitorWarningConditionsData.slice(0);
        var deleteMonitorAlarmConditionsData = this.props.deleteMonitorAlarmConditionsData.slice(0);
        for(var i = 0; i < monitorWarningConditionsData.length; i++) {
            var bDeleted = true;
            for(var j = 0; j < monitorSettingWarningConditionsData.length; j++) {
                if(monitorWarningConditionsData[i].id != "" && monitorWarningConditionsData[i].id == monitorSettingWarningConditionsData[j].id) {
                    bDeleted = false;
                    break;
                }
            }

            if(bDeleted) {
                deleteMonitorAlarmConditionsData.push(monitorWarningConditionsData[i]);
            }
        }
        this.props.setDeleteMonitorAlarmConditionsData(deleteMonitorAlarmConditionsData.slice(0));

        this.props.setMonitorWarningConditionsData(this.props.monitorSettingWarningConditionsData.slice(0));
    },

    _handleOnClickCancel: function() {
        this.props.setMonitorSettingWarningConditionsData(this.props.monitorWarningConditionsData.slice(0));
    },

    _handleOnChangeConditonName: function(e) {
        this.setState({selectedConditionName: e});
    },

    _handleOnChangeConditionSymbol: function(e) {
        this.setState({selectedConditionSymbol: e});
    },

    render : function(){
        return (
            <div className="modal fade" id="warningAlarmConditionModal" tabIndex="-1" role="dialog" aria-labelledby="warningAlarmConditionModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">编辑危险告警条件</h4>
                        </div>
                        <div className="modal-body">
                            <div className='col-md-12'>
                                <div className='col-md-1'>
                                    <label className="label-name">条件</label>
                                </div>
                                <div className='col-md-4'>
                                    <div className="subForm">
                                        <ReactWidgets.DropdownList id="warningAlarmConditionModal_conditionName" className="form-control" data={this.props.monitorAlarmConditionNameData} value={this.state.selectedConditionName} textField="name" onChange={this._handleOnChangeConditonName}/>
                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    <div className="subForm">
                                        <ReactWidgets.DropdownList id="warningAlarmConditionModal_conditionSymbol" className="form-control" data={conditionSymbolData} value={this.state.selectedConditionSymbol} onChange={this._handleOnChangeConditionSymbol}/>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="subForm">
                                        <input id="warningAlarmConditionModal_conditionValue" type="text" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12 marginTop_5'>
                                <div className='col-md-6'>
                                    <div className="col-md-2">
                                        <label className="label-name">关系</label>
                                    </div>
                                    <div className="col-md-10">
                                        <div className="radio radioDiv">
                                            <label>
                                                <input id="warningAlarmConditionModal_radio_And" type="radio" name="warningAlarmConditionModal_radio_and_or" value="1" defaultChecked="true"/> 与
                                            </label>
                                        </div>
                                        <div className="radio radioDiv">
                                            <label>
                                                <input id="warningAlarmConditionModal_radio_Or" type="radio" name="warningAlarmConditionModal_radio_and_or" value="2"/> 或
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="subForm pull-right">
                                        <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickAdd}>添加</button>
                                    </div>
                                </div>
                            </div>
                            <div className='marginTop_5'>
                                <table id='warningAlarmConditionsTable'
                                       data-toggle='table'
                                       data-classes='table table-no-bordered table-striped table-hover'
                                       data-height={200}
                                       data-click-to-select='true'>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickDelete}>删除</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK}>确定</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickCancel}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = WarningAlarmConditionModal;
