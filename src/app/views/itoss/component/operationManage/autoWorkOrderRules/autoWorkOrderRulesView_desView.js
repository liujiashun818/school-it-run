/**
 * Created by SHIN on 2016/1/14.
 */
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');
var dateChange = require('../../../../../utils/dateChange');
var base64 = require('../../../../../utils/base64');

var symbolData = ['==','!=','>=','>','<=','<','contains','!contains'];

function deleteFormatter(value, row) {
    return [
        '<a class="delete" href="javascript:void(0)"><i class="fa fa-trash-o"></i></a>'
    ].join('');
}

var _this;
window.operateAutoWorkOrderRulesEvents = {
    'click .delete': function (e, value, row, index) {
        // document.getElementById("loadingPic").style.display = 'block';
        // setTimeout(function () {
            _this.props.del_automaticWorkOrder({recId: row.recid});
            _this.props.get_automaticWorkOrderUI();
            _this.props.setCanUpdate("false");
            // $('#autoWorkOrderRuleTable').bootstrapTable('refreshOptions', {data: _this.getFlux().store("YFTOperationStore").getState().automaticWorkOrder});
        //     document.getElementById("loadingPic").style.display = 'none';
        // }, 100);
    }
};

var AutoWorkOrderRulesView_desView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore","YFTOperationStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState(),
    //         itoss_Operation:flux.store("YFTOperationStore").getState()
    //     }
    // },

    getInitialState: function () {
        _this = this;
        return {
            equipmentType: [],
            selectedEquipmentType: null,
            monitorType: [],
            selectedMonitorType: null,
            selectedSymbol: symbolData[0],
            enableAdd: false,
            enableEdit: false
        }
    },

    componentWillMount: function() {
        this.props.get_automaticWorkOrderUI();
    },

    componentDidMount: function() {
        // dateChange.changeViewStyle();
        if(document.getElementById('autoWorkOrderRulesView_desView') != null) {
            document.getElementById('autoWorkOrderRulesView_desView').style.height = $(window).height() - 110 - 30 + 'px';
        }

        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        var enableAdd = false, enableEdit = false, enableDelete = false;
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/operationmanage/workordermanage/autoworkorderrules/add") {
                enableAdd = true;
                this.setState({enableAdd: true});
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/workordermanage/autoworkorderrules/edit") {
                enableEdit = true;
                this.setState({enableEdit: true});
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/workordermanage/autoworkorderrules/delete") {
                enableDelete = true;
            }
        }
        if(!enableAdd && !enableEdit) {
            $("#autoWorkOrderRule_saveBtn").hide();
        }

        var tableColumns = [
            {
                title: '设备类型',
                field: 'equipmettypename',
                sortable: true
            }, {
                title: '参数',
                field: 'monitortypename',
                sortable: true
            }, {
                title: '符号',
                field: 'operation',
                sortable: true
            }, {
                title: '时间(小时)',
                field: 'longtime',
                sortable: true
            }
        ];

        if(enableDelete) {
            tableColumns.push(
                {
                    title: '删除',
                    events: operateAutoWorkOrderRulesEvents,
                    formatter: deleteFormatter
                }
            );
        }

        $('#autoWorkOrderRuleTable').bootstrapTable({
            columns: tableColumns,
            data: this.props.automaticWorkOrder,
            onClickRow: this._handleOnClickRow
        });
    },

    shouldComponentUpdate: function(nextProps, nextState){
        if (nextProps.automaticWorkOrder !== this.props.automaticWorkOrder) {
            $('#autoWorkOrderRuleTable').bootstrapTable('refreshOptions', {data: nextProps.automaticWorkOrder});
        }
        if(nextProps.equipmentType !== this.props.equipmentType) {
            var automaticWorkOrderEquipmentType = nextProps.equipmentType[0];
            var equipmentType = [];
            for (var key in automaticWorkOrderEquipmentType)
            {
                equipmentType.push({id: automaticWorkOrderEquipmentType[key], name: key});
            }
            this.setState({equipmentType: equipmentType});
            this.setState({selectedEquipmentType: equipmentType[0]});

        }
        if(nextProps.monitorType !== this.props.monitorType) {
            var monitorType = [];
            var automaticWorkOrderMonitorType = nextProps.monitorType[0];
            for (var key in automaticWorkOrderMonitorType)
            {
                if(key == this.state.equipmentType[0].id) {
                    for(var i = 0; i < automaticWorkOrderMonitorType[key].length; i++) {
                        var strMonitorType = automaticWorkOrderMonitorType[key][i];
                        monitorType.push({showname: strMonitorType.substring(0, strMonitorType.indexOf("=")), savename: strMonitorType.substring(strMonitorType.indexOf("=")+1)});
                    }
                    break;
                }
            }
            this.setState({monitorType: monitorType});
            this.setState({selectedMonitorType: monitorType[0]});
        }
        return true;
    },

    _handleOnClickRow: function(row, element) {
        var equipmentType = this.state.equipmentType.slice(0);
        for(var i = 0; i < equipmentType.length; i++) {
            if(equipmentType[i].id == row.equipmenttype) {
                this.setState({selectedEquipmentType: equipmentType[i]});

                var monitorType = [];
                var automaticWorkOrderMonitorType = this.props.monitorType[0];
                for (var key in automaticWorkOrderMonitorType)
                {
                    if(key == equipmentType[i].id) {
                        for(var j = 0; j < automaticWorkOrderMonitorType[key].length; j++) {
                            var strMonitorType = automaticWorkOrderMonitorType[key][j];
                            monitorType.push({showname: strMonitorType.substring(0, strMonitorType.indexOf("=")), savename: strMonitorType.substring(strMonitorType.indexOf("=")+1)});
                        }
                        break;
                    }
                }
                this.setState({monitorType: monitorType});

                for(var j = 0; j < monitorType.length; j++) {
                    if(monitorType[j].savename == row.monitortype) {
                        this.setState({selectedMonitorType: monitorType[j]});
                        break;
                    }
                }
                break;
            }
        }

        this.setState({selectedSymbol: row.operation});
        document.getElementById("autoWorkOrderRule_time").value = row.longtime;
    },

    _handleOnSelectTypeName: function(e) {
        this.setState({selectedEquipmentType: e});

        var monitorType = [];
        var automaticWorkOrderMonitorType = this.props.monitorType[0];
        for (var key in automaticWorkOrderMonitorType)
        {
            if(key == e.id) {
                for(var i = 0; i < automaticWorkOrderMonitorType[key].length; i++) {
                    var strMonitorType = automaticWorkOrderMonitorType[key][i];
                    monitorType.push({showname: strMonitorType.substring(0, strMonitorType.indexOf("=")), savename: strMonitorType.substring(strMonitorType.indexOf("=")+1)});
                }
                break;
            }
        }
        this.setState({monitorType: monitorType});
        this.setState({selectedMonitorType: monitorType[0]});
        this.setState({selectedSymbol: symbolData[0]});
        document.getElementById("autoWorkOrderRule_time").value = "";
    },

    _handleOnChangeMonitorType: function(e) {
        this.setState({selectedMonitorType: e});
    },

    _handleOnChangeSymbol: function(e) {
        this.setState({selectedSymbol: e});
    },

    _handleOnClickSave: function() {
        var longTime = $.trim($("#autoWorkOrderRule_time").val());
        var reg=/^\d+$/;
        if(longTime==null||longTime==""){
            alert("请填写时间");
            return false;
        }
        else if(reg.test(longTime)==false) {
            alert("无效的时间");
            return false;
        }

        var dateObjec;
        var bInAutomaticWorkOrder = false;
        var automaticWorkOrder = this.props.automaticWorkOrder;
        for(var i = 0; i < automaticWorkOrder.length; i++) {
            if(automaticWorkOrder[i].equipmenttype == this.state.selectedEquipmentType.id && automaticWorkOrder[i].monitortype == this.state.selectedMonitorType.savename) {
                bInAutomaticWorkOrder = true;
                if(!this.state.enableEdit) {
                    alert("当前用户没有修改自动工单规则的权限");
                    return false;
                }

                dateObjec = {
                    RecId: automaticWorkOrder[i].recid,
                    Operation: document.getElementById("autoWorkOrderRule_symbol").childNodes[1].innerText,
                    Longtime: longTime
                };
                this.props.update_automaticWorkOrder(dateObjec);
                break;
            }
        }
        if(!bInAutomaticWorkOrder) {
            if(!this.state.enableAdd) {
                alert("当前用户没有添加自动工单规则的权限");
                return false;
            }

            dateObjec = {
                EquipmentType: this.state.selectedEquipmentType.id,
                EquipmentTypeName: this.state.selectedEquipmentType.name,
                MonitorType: this.state.selectedMonitorType.savename,
                MonitorTypeName: this.state.selectedMonitorType.showname,
                Operation: document.getElementById("autoWorkOrderRule_symbol").childNodes[1].innerText,
                Longtime: longTime
            };
            this.props.add_automaticWorkOrder(dateObjec);
        }

        var _this = this;
        _this.props.setCanUpdate("false");
        setTimeout(function () {
            _this.props.get_automaticWorkOrderUI();
            // $('#autoWorkOrderRuleTable').bootstrapTable('refreshOptions', {
            //     data: _this.getFlux().store("YFTOperationStore").getState().automaticWorkOrder
            // });
        }, 100);
    },

    render: function() {
        return (
            <div id="autoWorkOrderRulesView_desView" className='overviewDesViewDiv alarmConfigView'>
                <div className="operationButtons">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            自动工单规则
                        </div>
                        <div className="titleRight">
                            <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                            <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="buttonInfo">
                            <p>配置自动触发生成工单的规则。</p>
                            <button id="autoWorkOrderRule_saveBtn" className="btn btnSave" onClick={this._handleOnClickSave}>保存</button>
                        </div>
                    </div>
                </div>
                <div className='operationCreateTableDiv col-md-12'>
                    <div className='table-basic col-md-12'>
                        <div className="table-basic-row col-md-12">
                            <div className="col-md-3">
                                <div className="table-basic-h1 width3">设备类型</div>
                                <div className="table-basic-h1-input width4">
                                    <ReactWidgets.DropdownList id="autoWorkOrderRule_monitorType" className='form-control dropdownStyle col-md-12' data={this.state.equipmentType} value={this.state.selectedEquipmentType} textField='name' onChange={this._handleOnSelectTypeName}/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="table-basic-h1 width3">参数</div>
                                <div className="table-basic-h1-input width4">
                                    <ReactWidgets.DropdownList id="autoWorkOrderRule_param" className='form-control dropdownStyle col-md-12' data={this.state.monitorType} value={this.state.selectedMonitorType} textField='showname' onChange={this._handleOnChangeMonitorType}/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="table-basic-h1 width3">符号</div>
                                <div className="table-basic-h1-input width4">
                                    <ReactWidgets.DropdownList id="autoWorkOrderRule_symbol" className='form-control dropdownStyle col-md-12' data={symbolData} value={this.state.selectedSymbol} onChange={this._handleOnChangeSymbol}/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="table-basic-h1 width3">时间(小时)</div>
                                <div className="table-basic-h1-input width4"><input id="autoWorkOrderRule_time" type="text" className="input-xlarge col-md-12" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="contentline col-md-12"/>
                    <table id='autoWorkOrderRuleTable'
                           data-toggle='table'
                           data-classes='table table-no-bordered table-hover'
                           data-height={500}>
                    </table>
                </div>
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('autoWorkOrderRulesView_desView') != null) {
        document.getElementById('autoWorkOrderRulesView_desView').style.height = $(window).height() - 110 - 30 + 'px';
    }

    $('#autoWorkOrderRuleTable').bootstrapTable('resetView');
});

AutoWorkOrderRulesView_desView.propTypes = {
  equipmentType: PropTypes.array.isRequired,
  monitorType: PropTypes.array.isRequired,
  automaticWorkOrder: PropTypes.array.isRequired,
  get_automaticWorkOrderUI: PropTypes.func.isRequired,
  del_automaticWorkOrder: PropTypes.func.isRequired,
  update_automaticWorkOrder: PropTypes.func.isRequired,
  add_automaticWorkOrder: PropTypes.func.isRequired
}

module.exports = AutoWorkOrderRulesView_desView;
