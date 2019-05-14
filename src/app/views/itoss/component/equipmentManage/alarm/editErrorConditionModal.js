/**
 * 编辑错误阀值
 */
var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var ReactWidgets = require('react-widgets');

// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var EditErrorConditionModal = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    getInitialState: function () {
        return {
            conditionNameData: [],
            selectedConditionName: ""
        }
    },

    componentDidMount: function() {
        $('#errorConditionsTable').bootstrapTable({
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
                }
            ],
            data: []//this.state.itoss_Monitor.SetErrorConditionsData
        });

        var _this = this;
        $('#editErrorConditionModal').on('show.bs.modal', function () {
            switch (document.getElementById('alarmConfig-monitorType').childNodes[1].innerText) {
                case "摄像机":
                    _this.setState({
                        conditionNameData: ["离线","信号丢失","画面丢失","清晰度","偏亮","偏暗","偏色","雪花","条纹","滚屏","抖屏","遮挡","冻结","云台控制"]
                    });
                    break;
                case "DVR":
                    _this.setState({
                        conditionNameData: ["状态","IP地址冲突","非法访问","其他错误","硬盘出错","硬盘满","硬盘丢失","输入过载通道","视频异常通道","编码失败通道"]
                    });
                    break;
                case "NVR":
                    _this.setState({
                        conditionNameData: ["状态","IP地址冲突","非法访问","其他错误","硬盘出错","硬盘满","硬盘丢失","宽带占满"]
                    });
                    break;
                case "编码器":
                    _this.setState({
                        conditionNameData: ["状态","IP地址冲突","非法访问","其他错误","输入过载通道","编码失败通道","视频异常通道"]
                    });
                    break;
                case "IPSAN":
                    _this.setState({
                        conditionNameData: ["状态","IP地址冲突","非法访问","其他错误","阵列满","阵列出错","阵列丢失损坏","温度过高"]
                    });
                    break;
            }
            _this.setState({selectedConditionName: _this.state.conditionNameData[0]});
            if(_this.props.settingIsOrError == "false") {
                document.getElementById('editErrorConditionModal_radio_And').checked = true;
            }
            else {
                document.getElementById('editErrorConditionModal_radio_Or').checked = true;
            }

            $('#errorConditionsTable').bootstrapTable('resetView');
            $('#errorConditionsTable').bootstrapTable('refreshOptions', {data: _this.props.settingErrorConditionsData});
        });
    },

    componentDidUpdate:function(){
      var errorCondition = this.props.settingErrorConditionsData
      $('#errorConditionsTable').bootstrapTable('refreshOptions', {data: errorCondition});
    },

    _handleOnClickAdd: function() {
        var errorConditionsData = this.props.settingErrorConditionsData.slice(0);
        var conditionName = this.state.selectedConditionName;
        var conditionSymbol = document.getElementById("editErrorConditionModal_conditionSymbol").childNodes[1].innerText;
        var conditionValue = document.getElementById("editErrorConditionModal_conditionValue").value;
        for(var i = 0; i < errorConditionsData.length; i++) {
            if(conditionName == errorConditionsData[i].conditionName && conditionSymbol == errorConditionsData[i].conditionSymbol && conditionValue == errorConditionsData[i].conditionValue) {
                alert("该条件已存在");
                return false;
            }
        }
        errorConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
        this.props.setSettingErrorConditionsData(errorConditionsData);
        $('#errorConditionsTable').bootstrapTable('refreshOptions', {data: this.props.settingErrorConditionsData});
    },

    _handleOnClickDelete: function() {
        var selectedConditionData = $('#errorConditionsTable').bootstrapTable('getSelections');
        var errorConditionsData = this.props.settingErrorConditionsData.slice(0);
        for(var i = 0; i < selectedConditionData.length; i++) {
            for(var j = 0; j< errorConditionsData.length; j++) {
                if(selectedConditionData[i].conditionName == errorConditionsData[j].conditionName && selectedConditionData[i].conditionSymbol == errorConditionsData[j].conditionSymbol
                    && selectedConditionData[i].conditionValue == errorConditionsData[j].conditionValue) {
                    errorConditionsData.splice(j, 1);
                    j--;
                }
            }
        }
        this.props.setSettingErrorConditionsData(errorConditionsData);
        $('#errorConditionsTable').bootstrapTable('refreshOptions', {data: this.props.settingErrorConditionsData});
    },

    _handleOnClickOK: function() {
        this.props.setErrorConditionsData(this.props.settingErrorConditionsData.slice(0));
        this.props.setIsOrError(this.props.settingIsOrError);
        var errorAlarmText = "";
        var errorConditionsData = this.props.settingErrorConditionsData;
        var isor_error = this.props.settingIsOrError;
        for (var i = 0; i < errorConditionsData.length; i++) {
            if(i == 0) {
                errorAlarmText += errorConditionsData[i].conditionName + " " + errorConditionsData[i].conditionSymbol + " " + errorConditionsData[i].conditionValue;
            }
            else {
                errorAlarmText += (isor_error=="false"?" 与 ":" 或 ") + errorConditionsData[i].conditionName + " " + errorConditionsData[i].conditionSymbol + " " + errorConditionsData[i].conditionValue;
            }
        }
        this.props.setErrorAlarmText(errorAlarmText);
    },

    _handleOnClickCancel: function() {
        this.props.setSettingErrorConditionsData(this.props.errorConditionsData.slice(0));
        this.props.setSettingIsOrError(this.props.isOrError);
    },

    _handleOnChangeConditonName: function(e) {
        this.setState({selectedConditionName: e});
    },

    _handleOnClickRadio: function(e) {
        if(document.getElementById('editErrorConditionModal_radio_And').checked) {
            this.props.setSettingIsOrError("false");
        }
        else if(document.getElementById('editErrorConditionModal_radio_Or').checked) {
            this.props.setSettingIsOrError("true");
        }
    },

    render : function(){
        return (
            <div className="modal fade" id="editErrorConditionModal" tabIndex="-1" role="dialog" aria-labelledby="editErrorConditionModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this._handleOnClickCancel}>&times;</button>
                            <h6 className="modal-title">编辑错误条件</h6>
                        </div>
                        <div className="modal-body">
                            <div className='col-md-12'>
                                <div className='col-md-1'>
                                    <label className="label-name">条件</label>
                                </div>
                                <div className='col-md-4'>
                                    <div className="subForm">
                                        <ReactWidgets.DropdownList id="editErrorConditionModal_conditionName" className="form-control" data={this.state.conditionNameData} value={this.state.selectedConditionName} onChange={this._handleOnChangeConditonName}/>
                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    <div className="subForm">
                                        <ReactWidgets.DropdownList id="editErrorConditionModal_conditionSymbol" className="form-control" data={['==','!=','>=','>','<=','<','contains','!contains']} defaultValue='=='/>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="subForm">
                                        <input id="editErrorConditionModal_conditionValue" type="text" className="form-control"/>
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
                                                <input id="editErrorConditionModal_radio_And" type="radio" name="editErrorConditionModal_radio_and_or" value="1" defaultChecked="true" onClick={this._handleOnClickRadio}/> 与
                                            </label>
                                        </div>
                                        <div className="radio radioDiv">
                                            <label>
                                                <input id="editErrorConditionModal_radio_Or" type="radio" name="editErrorConditionModal_radio_and_or" value="2" onClick={this._handleOnClickRadio}/> 或
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
                                <table id='errorConditionsTable'
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

module.exports = EditErrorConditionModal;
