/**
 * 编辑正常阀值
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

var EditGoodConditionModal = React.createClass({
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
        $('#goodConditionsTable').bootstrapTable({
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
            data: []//this.state.itoss_Monitor.SetWarningConditionsData
        });

        var _this = this;
        $('#editGoodConditionModal').on('show.bs.modal', function () {
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
            if(_this.props.settingIsOrGood == "false") {
                document.getElementById('editGoodConditionModal_radio_And').checked = true;
            }
            else {
                document.getElementById('editGoodConditionModal_radio_Or').checked = true;
            }

            $('#goodConditionsTable').bootstrapTable('resetView');
            $('#goodConditionsTable').bootstrapTable('refreshOptions', {data: _this.props.settingGoodConditionsData});
        });
    },

    componentDidUpdate:function(){
      var goodCondition = this.props.settingGoodConditionsData
      $('#goodConditionsTable').bootstrapTable('refreshOptions', {data: goodCondition});
    },

    _handleOnClickAdd: function() {
        var goodConditionsData = this.props.settingGoodConditionsData.slice(0);
        var conditionName = this.state.selectedConditionName;
        var conditionSymbol = document.getElementById("editGoodConditionModal_conditionSymbol").childNodes[1].innerText;
        var conditionValue = document.getElementById("editGoodConditionModal_conditionValue").value;
        for(var i = 0; i < goodConditionsData.length; i++) {
            if(conditionName == goodConditionsData[i].conditionName && conditionSymbol == goodConditionsData[i].conditionSymbol && conditionValue == goodConditionsData[i].conditionValue) {
                alert("该条件已存在");
                return false;
            }
        }
        goodConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
        this.props.setSettingGoodConditionsData(goodConditionsData);
        $('#goodConditionsTable').bootstrapTable('refreshOptions', {data: this.props.settingGoodConditionsData});
    },

    _handleOnClickDelete: function() {
        var selectedConditionData = $('#goodConditionsTable').bootstrapTable('getSelections');
        var goodConditionsData = this.props.settingGoodConditionsData.slice(0);
        for(var i = 0; i < selectedConditionData.length; i++) {
            for(var j = 0; j< goodConditionsData.length; j++) {
                if(selectedConditionData[i].conditionName == goodConditionsData[j].conditionName && selectedConditionData[i].conditionSymbol == goodConditionsData[j].conditionSymbol
                    && selectedConditionData[i].conditionValue == goodConditionsData[j].conditionValue) {
                    goodConditionsData.splice(j, 1);
                    j--;
                }
            }
        }
        this.props.setSettingGoodConditionsData(goodConditionsData);
        $('#goodConditionsTable').bootstrapTable('refreshOptions', {data: this.props.settingGoodConditionsData});
    },

    _handleOnClickOK: function() {
        this.props.setGoodConditionsData(this.props.settingGoodConditionsData.slice(0));
        this.props.setIsOrGood(this.props.settingIsOrGood);
        var goodAlarmText = "";
        var goodConditionsData = this.props.settingGoodConditionsData;
        var isor_good = this.props.settingIsOrGood;
        for (var i = 0; i < goodConditionsData.length; i++) {
            if(i == 0) {
                goodAlarmText += goodConditionsData[i].conditionName + " " + goodConditionsData[i].conditionSymbol + " " + goodConditionsData[i].conditionValue;
            }
            else {
                goodAlarmText += (isor_good=="false"?" 与 ":" 或 ") + goodConditionsData[i].conditionName + " " + goodConditionsData[i].conditionSymbol + " " + goodConditionsData[i].conditionValue;
            }
        }
        this.props.setGoodAlarmText(goodAlarmText);
    },

    _handleOnClickCancel: function() {
        this.props.setSettingGoodConditionsData(this.props.goodConditionsData.slice(0));
        this.props.setSettingIsOrGood(this.props.isOrGood);
    },

    _handleOnChangeConditonName: function(e) {
        this.setState({selectedConditionName: e});
    },

    _handleOnClickRadio: function(e) {
        if(document.getElementById('editGoodConditionModal_radio_And').checked) {
            this.props.setSettingIsOrGood("false");
        }
        else if(document.getElementById('editGoodConditionModal_radio_Or').checked) {
            this.props.setSettingIsOrGood("true");
        }
    },

    render : function(){
        return (
            <div className="modal fade" id="editGoodConditionModal" tabIndex="-1" role="dialog" aria-labelledby="editGoodConditionModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this._handleOnClickCancel}>&times;</button>
                            <h6 className="modal-title">编辑正常条件</h6>
                        </div>
                        <div className="modal-body">
                            <div className='col-md-12'>
                                <div className='col-md-1'>
                                    <label className="label-name">条件</label>
                                </div>
                                <div className='col-md-4'>
                                    <div className="subForm">
                                        <ReactWidgets.DropdownList id="editGoodConditionModal_conditionName" className="form-control" data={this.state.conditionNameData} value={this.state.selectedConditionName} textField='showname' onChange={this._handleOnChangeConditonName}/>
                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    <div className="subForm">
                                        <ReactWidgets.DropdownList id="editGoodConditionModal_conditionSymbol" className="form-control" data={['==','!=','>=','>','<=','<','contains','!contains']} defaultValue='=='/>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="subForm">
                                        <input id="editGoodConditionModal_conditionValue" type="text" className="form-control"/>
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
                                                <input id="editGoodConditionModal_radio_And" type="radio" name="editGoodConditionModal_radio_and_or" value="1" defaultChecked="true" onClick={this._handleOnClickRadio}/> 与
                                            </label>
                                        </div>
                                        <div className="radio radioDiv">
                                            <label>
                                                <input id="editGoodConditionModal_radio_Or" type="radio" name="editGoodConditionModal_radio_and_or" value="2" onClick={this._handleOnClickRadio}/> 或
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
                                <table id='goodConditionsTable'
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

module.exports = EditGoodConditionModal;
