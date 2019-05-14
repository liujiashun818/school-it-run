/**
 * 编辑警告阀值
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

var EditWarningConditionModal = React.createClass({
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
        $('#warningConditionsTable').bootstrapTable({
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
            data: []
        });

        var _this = this;
        $('#editWarningConditionModal').on('show.bs.modal', function () {
            var yftAlarmData = _this.props.yftAlarmData;
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
            if(_this.props.settingIsOrWarning == "false") {
                document.getElementById('editWarningConditionModal_radio_And').checked = true;
            }
            else {
                document.getElementById('editWarningConditionModal_radio_Or').checked = true;
            }

            $('#warningConditionsTable').bootstrapTable('resetView');
            $('#warningConditionsTable').bootstrapTable('refreshOptions', {data: _this.props.settingWarningConditionsData});
        });
    },

    componentDidUpdate:function(){
      var warningConditions = this.props.settingWarningConditionsData
      $('#warningConditionsTable').bootstrapTable('refreshOptions', {data: warningConditions});
    },

    _handleOnClickAdd: function() {
        var warningConditionsData = this.props.settingWarningConditionsData.slice(0);
        var conditionName = this.state.selectedConditionName;
        var conditionSymbol = document.getElementById("editWarningConditionModal_conditionSymbol").childNodes[1].innerText;
        var conditionValue = document.getElementById("editWarningConditionModal_conditionValue").value;
        for(var i = 0; i < warningConditionsData.length; i++) {
            if(conditionName == warningConditionsData[i].conditionName && conditionSymbol == warningConditionsData[i].conditionSymbol && conditionValue == warningConditionsData[i].conditionValue) {
                alert("该条件已存在");
                return false;
            }
        }
        warningConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
        this.props.setSettingWarningConditionsData(warningConditionsData);
        $('#warningConditionsTable').bootstrapTable('refreshOptions', {data: this.props.settingWarningConditionsData});
    },

    _handleOnClickDelete: function() {
        var selectedConditionData = $('#warningConditionsTable').bootstrapTable('getSelections');
        var warningConditionsData = this.props.settingWarningConditionsData.slice(0);
        for(var i = 0; i < selectedConditionData.length; i++) {
            for(var j = 0; j< warningConditionsData.length; j++) {
                if(selectedConditionData[i].conditionName == warningConditionsData[j].conditionName && selectedConditionData[i].conditionSymbol == warningConditionsData[j].conditionSymbol
                    && selectedConditionData[i].conditionValue == warningConditionsData[j].conditionValue) {
                    warningConditionsData.splice(j, 1);
                    j--;
                }
            }
        }
        this.props.setSettingWarningConditionsData(warningConditionsData);
        $('#warningConditionsTable').bootstrapTable('refreshOptions', {data: this.props.settingWarningConditionsData});
    },

    _handleOnClickOK: function() {
        this.props.setWarningConditionsData(this.props.settingWarningConditionsData.slice(0));
        this.props.setIsOrWarning(this.props.settingIsOrWarning);
        var warningAlarmText = "";
        var warningConditionsData = this.props.settingWarningConditionsData;
        var isor_warning = this.props.settingIsOrWarning;
        for (var i = 0; i < warningConditionsData.length; i++) {
            if(i == 0) {
                warningAlarmText += warningConditionsData[i].conditionName + " " + warningConditionsData[i].conditionSymbol + " " + warningConditionsData[i].conditionValue;
            }
            else {
                warningAlarmText += (isor_warning=="false"?" 与 ":" 或 ") + warningConditionsData[i].conditionName + " " + warningConditionsData[i].conditionSymbol + " " + warningConditionsData[i].conditionValue;
            }
        }
        this.props.setWarningAlarmText(warningAlarmText);
    },

    _handleOnClickCancel: function() {
        this.props.setSettingWarningConditionsData(this.props.warningConditionsData.slice(0));
        this.props.setSettingIsOrWarning(this.props.isOrWarning);
    },

    _handleOnChangeConditonName: function(e) {
        this.setState({selectedConditionName: e});
    },

    _handleOnClickRadio: function(e) {
        if(document.getElementById('editWarningConditionModal_radio_And').checked) {
            this.props.setSettingIsOrWarning("false");
        }
        else if(document.getElementById('editWarningConditionModal_radio_Or').checked) {
            this.props.setSettingIsOrWarning("true");
        }
    },

    render : function(){
        return (
            <div className="modal fade" id="editWarningConditionModal" tabIndex="-1" role="dialog" aria-labelledby="editWarningConditionModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this._handleOnClickCancel}>&times;</button>
                            <h6 className="modal-title">编辑危险条件</h6>
                        </div>
                        <div className="modal-body">
                            <div className='col-md-12'>
                                <div className='col-md-1'>
                                    <label className="label-name">条件</label>
                                </div>
                                <div className='col-md-4'>
                                    <div className="subForm">
                                        <ReactWidgets.DropdownList id="editWarningConditionModal_conditionName" className="form-control" data={this.state.conditionNameData} value={this.state.selectedConditionName} textField='showname' onChange={this._handleOnChangeConditonName}/>
                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    <div className="subForm">
                                        <ReactWidgets.DropdownList id="editWarningConditionModal_conditionSymbol" className="form-control" data={['==','!=','>=','>','<=','<','contains','!contains']} defaultValue='=='/>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="subForm">
                                        <input id="editWarningConditionModal_conditionValue" type="text" className="form-control"/>
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
                                                <input id="editWarningConditionModal_radio_And" type="radio" name="editWarningConditionModal_radio_and_or" value="1" defaultChecked="true" onClick={this._handleOnClickRadio}/> 与
                                            </label>
                                        </div>
                                        <div className="radio radioDiv">
                                            <label>
                                                <input id="editWarningConditionModal_radio_Or" type="radio" name="editWarningConditionModal_radio_and_or" value="2" onClick={this._handleOnClickRadio}/> 或
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
                                <table id='warningConditionsTable'
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

module.exports = EditWarningConditionModal;
