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

var ErrorAlarmConditionModal = React.createClass({
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
        $('#errorAlarmConditionsTable').bootstrapTable({
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
        $('#errorAlarmConditionModal').on('show.bs.modal', function () {
            _this.setState({selectedConditionName: _this.props.monitorAlarmConditionNameData.length!=0 ? _this.props.monitorAlarmConditionNameData[0] : null});
            _this.setState({selectedConditionSymbol: conditionSymbolData[0]});
            document.getElementById("errorAlarmConditionModal_conditionValue").value = "";
            document.getElementById('errorAlarmConditionModal_radio_And').checked = true;

            $('#errorAlarmConditionsTable').bootstrapTable('resetView');
            $('#errorAlarmConditionsTable').bootstrapTable('refreshOptions', {data: _this.props.monitorSettingErrorConditionsData});
        });
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if (nextProps.monitorAlarmConditionNameData !== this.props.monitorAlarmConditionNameData) {
            this.setState({selectedConditionName: nextProps.monitorAlarmConditionNameData.length!=0 ? nextProps.monitorAlarmConditionNameData[0] : null});
        }
        return true;
    },

    componentDidUpdate:function(){
        $('#errorAlarmConditionsTable').bootstrapTable('refreshOptions', {data: this.props.monitorSettingErrorConditionsData});
    },

    _handleOnClickAdd: function() {
        var errorConditionsData = this.props.monitorSettingErrorConditionsData.slice(0);
        var conditionName = this.state.selectedConditionName.name;
        var returnValue = this.state.selectedConditionName.saveItem;
        var conditionSymbol = this.state.selectedConditionSymbol;
        var conditionValue = document.getElementById("errorAlarmConditionModal_conditionValue").value;
        var conditionRelation = document.getElementById('errorAlarmConditionModal_radio_And').checked ? "0" : "1";
        for(var i = 0; i < errorConditionsData.length; i++) {
            if(conditionName == errorConditionsData[i].conditionName && conditionSymbol == errorConditionsData[i].conditionSymbol
                && conditionValue == errorConditionsData[i].conditionValue && conditionRelation == errorConditionsData[i].conditionRelation) {
                alert("该条件已存在");
                return false;
            }
        }
        errorConditionsData.push({id:'', conditionName: conditionName, returnValue: returnValue, conditionSymbol: conditionSymbol, conditionValue: conditionValue, conditionRelation: conditionRelation});
        this.props.setMonitorSettingErrorConditionsData(errorConditionsData);
        $('#errorAlarmConditionsTable').bootstrapTable('refreshOptions', {data: this.props.monitorSettingErrorConditionsData});
    },

    _handleOnClickDelete: function() {
        var selectedConditionData = $('#errorAlarmConditionsTable').bootstrapTable('getSelections');
        var errorConditionsData = this.props.monitorSettingErrorConditionsData.slice(0);
        for(var i = 0; i < selectedConditionData.length; i++) {
            for(var j = 0; j< errorConditionsData.length; j++) {
                if(selectedConditionData[i].conditionName == errorConditionsData[j].conditionName && selectedConditionData[i].conditionSymbol == errorConditionsData[j].conditionSymbol
                    && selectedConditionData[i].conditionValue == errorConditionsData[j].conditionValue && selectedConditionData[i].conditionRelation == errorConditionsData[j].conditionRelation) {
                    errorConditionsData.splice(j, 1);
                    j--;
                }
            }
        }
        this.props.setMonitorSettingErrorConditionsData(errorConditionsData);
        $('#errorAlarmConditionsTable').bootstrapTable('refreshOptions', {data: this.props.monitorSettingErrorConditionsData});
    },

    _handleOnClickOK: function() {
        var monitorSettingErrorConditionsData = this.props.monitorSettingErrorConditionsData.slice(0);
        var monitorErrorConditionsData = this.props.monitorErrorConditionsData.slice(0);
        var deleteMonitorAlarmConditionsData = this.props.deleteMonitorAlarmConditionsData.slice(0);
        for(var i = 0; i < monitorErrorConditionsData.length; i++) {
            var bDeleted = true;
            for(var j = 0; j < monitorSettingErrorConditionsData.length; j++) {
                if(monitorErrorConditionsData[i].id != "" && monitorErrorConditionsData[i].id == monitorSettingErrorConditionsData[j].id) {
                    bDeleted = false;
                    break;
                }
            }

            if(bDeleted) {
                deleteMonitorAlarmConditionsData.push(monitorErrorConditionsData[i]);
            }
        }
        this.props.setDeleteMonitorAlarmConditionsData(deleteMonitorAlarmConditionsData.slice(0));

        this.props.setMonitorErrorConditionsData(this.props.monitorSettingErrorConditionsData.slice(0));
    },

    _handleOnClickCancel: function() {
        this.props.setMonitorSettingErrorConditionsData(this.props.monitorErrorConditionsData.slice(0));
    },

    _handleOnChangeConditonName: function(e) {
        this.setState({selectedConditionName: e});
    },

    _handleOnChangeConditionSymbol: function(e) {
        this.setState({selectedConditionSymbol: e});
    },

    render : function(){
        return (
            <div className="modal fade" id="errorAlarmConditionModal" tabIndex="-1" role="dialog" aria-labelledby="errorAlarmConditionModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">编辑错误告警条件</h4>
                        </div>
                        <div className="modal-body">
                            <div className='col-md-12'>
                                <div className='col-md-1'>
                                    <label className="label-name">条件</label>
                                </div>
                                <div className='col-md-4'>
                                    <div className="subForm">
                                        <ReactWidgets.DropdownList id="errorAlarmConditionModal_conditionName" className="form-control" data={this.props.monitorAlarmConditionNameData} value={this.state.selectedConditionName} textField="name" onChange={this._handleOnChangeConditonName}/>
                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    <div className="subForm">
                                        <ReactWidgets.DropdownList id="errorAlarmConditionModal_conditionSymbol" className="form-control" data={conditionSymbolData} value={this.state.selectedConditionSymbol} onChange={this._handleOnChangeConditionSymbol}/>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="subForm">
                                        <input id="errorAlarmConditionModal_conditionValue" type="text" className="form-control"/>
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
                                                <input id="errorAlarmConditionModal_radio_And" type="radio" name="errorAlarmConditionModal_radio_and_or" value="1" defaultChecked="true"/> 与
                                            </label>
                                        </div>
                                        <div className="radio radioDiv">
                                            <label>
                                                <input id="errorAlarmConditionModal_radio_Or" type="radio" name="errorAlarmConditionModal_radio_and_or" value="2"/> 或
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
                                <table id='errorAlarmConditionsTable'
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

module.exports = ErrorAlarmConditionModal;
