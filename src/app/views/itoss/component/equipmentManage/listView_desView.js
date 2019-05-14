/**
* tianzhuo.nie  2015/12/11.
* 资源监测-统一监控平台-监测器列表
 */
require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as deviceMonitorActions from '../../../../actions/deviceMonitor_action'
import * as equipmentActions from '../../../../actions/equipment_action'
import * as operationActions from '../../../../actions/operation_action'

var ReactWidgets = require('react-widgets');
//
var Globalize = require('globalize')
var globalizeLocalizer = require('react-widgets/lib/localizers/globalize')

var DesTab1 = require('./desView_tab1.js');

globalizeLocalizer(Globalize);

var base64 = require('../../../../utils/base64');

var Listview_desView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore", "YFTEquipmentStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState(),
    //         itoss_Equipment:flux.store("YFTEquipmentStore").getState()
    //     }
    // },

	getInitialState: function() {
        return {
            bTouchOrder: false
        }
    },

	componentDidMount: function() {
		if(document.getElementById('listview_desView') != null) {
			document.getElementById('listview_desView').style.height = $(window).height() - 110 - 30 + 'px';
		}
        // $('.nav-tabs a[data-toggle="tab"]').on('shown.bs.tab', (function(e){
        //     this.forceUpdate();
        // }).bind(this));
        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        var bShowTriggerWorkOrder = false;
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/equipmentmanage/monitor/trigger") {
                bShowTriggerWorkOrder = true;
            }
        }
        if(!bShowTriggerWorkOrder) {
            $(".desViewMonitorTouchOrderBtn").hide();
        }

        // var _this = this;
        // setTimeout(function () {
        //     _this.getFlux().actions.YFTEquipmentActions.get_equipmentAllData(_this.getFlux().store("YFTEquipmentStore").getState().equipmentId);
        // }, 500);
	},

	shouldComponentUpdate: function(nextProps, nextState) {
			var that = this;
      if(nextState.bTouchOrder) {
          that.setState({bTouchOrder: false});
					that.handleOnTouchOrder(nextProps);
      }
      return true;
  	},

    componentDidUpdate: function() {
        // if(this.getFlux().store("YFTEquipmentStore").getState().bClickTreeNode) {
        //     var _this = this;
        //     setTimeout(function () {
        //         _this.getFlux().actions.YFTEquipmentActions.get_equipmentAllData(_this.getFlux().store("YFTEquipmentStore").getState().equipmentId);
        //     }, 500);
        // }
        // else if(this.getFlux().store("YFTEquipmentStore").getState().bClickDesViewMonitorTableRow) {
        //     var _this = this;
        //     setTimeout(function () {
        //         _this.getFlux().actions.YFTEquipmentActions.get_MonitorData(_this.getFlux().store("YFTEquipmentStore").getState().getMonitorDataFilter);
        //     }, 500);
        // }
    },

    componentWillUnmount: function() {
        // var _this = this;
        // setTimeout(function () {
        //     _this.getFlux().actions.YFTEquipmentActions.clear_desView_tab1_data();
        // }, 100);
    },

    _handleOnClickGoBack: function() {
		const { dispatch, equipmentId, monitorTree2, pieChartMonitorType } = this.props;
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var i = 0; i < nodes.length; i++) {
            // if(nodes[i].id == this.getFlux().store("YFTEquipmentStore").getState().equipmentId) {
            if(nodes[i].id == equipmentId) {
                for(var j = 0; j < nodes.length; j++) {
                    if(nodes[j].id == nodes[i].pid) {
                        treeObj.selectNode(nodes[j]);
                        // this.state.itoss_Monitor.MonitorTree2.setState({curNode:nodes[j]});
						monitorTree2.setState({curNode:nodes[j]});
                        if(nodes[j].type=="organize" || nodes[j].type=="other") {
                            // var filter = [{key:"GROUPID",value:nodes[j].id},{key:"TYPE",value:this.getFlux().store("YFTDeviceMonitorStore").getState().PieChartMonitorType}];
                            // this.getFlux().actions.YFTDeviceMonitorActions.set_monitorParam_3({getTearmListDataType: 0, groupId: nodes[j].id, monitorName: nodes[j].name, monitorView: 1});
                            // this.getFlux().actions.YFTDeviceMonitorActions.get_TearmListData(filter);
							var filter = [{key:"GROUPID",value:nodes[j].id},{key:"TYPE",value:pieChartMonitorType}];
							dispatch(deviceMonitorActions.setGetTearmListDataType(0));
							dispatch(deviceMonitorActions.setMonitorGroupId(nodes[j].id));
							dispatch(deviceMonitorActions.setMonitorName(nodes[j].name));
							dispatch(deviceMonitorActions.setMonitorView(1));
							dispatch(deviceMonitorActions.getTearmListData(filter));
                        }
                        else if(nodes[j].type=="group") {
                            // this.getFlux().actions.YFTEquipmentActions.get_GroupAllData(nodes[j].id);
                            // this.getFlux().actions.YFTDeviceMonitorActions.set_monitorParam_4({monitorName: nodes[j].name, monitorView: 3});
							dispatch(equipmentActions.getGroupAllData(nodes[j].id));
							dispatch(deviceMonitorActions.setMonitorName(nodes[j].name));
							dispatch(deviceMonitorActions.setMonitorView(3));
                        }
                        break;
                    }
                }
                break;
            }
        }
    },

	onTouchOrder:function(){
		const { dispatch, equipmentIdNtz } = this.props;
		var that = this;
		var rrid = equipmentIdNtz;
		dispatch(deviceMonitorActions.get_isCreateWorkOrder(rrid,that));
		// this.setState({bTouchOrder: true});
	},

	handleOnTouchOrder: function(props) {
		const { dispatch, equipmentIdNtz, assetIdNtz, monitorTableData, monitorName, isCreateWorkOrder } = props;
		var that = this;
		var rrid = equipmentIdNtz;
		var rrrid = assetIdNtz;
      	var rrrlist= [];
      	rrrlist.push(rrrid);

		var tableData = monitorTableData;
		var mName = monitorName;
      	var firstIndex = 0;

      	var mark = false;
      	var desc = "";
      	for(var i=0;i<tableData.length;i++){
        	var da = tableData[i];
        	if(da.status == "error"){
            	desc = desc + da.nameChar+"错误："+da.discribe+"\n";
            	if(firstIndex == 0 && tableData[0].status != "error" && tableData[0].status != "warning"){
              		firstIndex = i;
            	}
        	}
        	if(da.status == "warning"){
            	desc = desc + da.nameChar+"警告："+da.discribe+"\n";
            	if(firstIndex == 0 && tableData[0].status != "error" && tableData[0].status != "warning"){
              		firstIndex = i;
            	}
        	}
        	if(!mark){
	          	if(da.status == "error" || da.status == "warning"){
	              	mark = true;
	          	}
        	}
      	}
      	var firstIndexData = tableData[firstIndex];
      	var motp = tableData[firstIndex].type;
      	var param2 = [{key:"RECID",value:rrid},{key:"MONITORTYPE",value:motp}];
				if(mark){
					if(isCreateWorkOrder == "0"){
						dispatch(operationActions.init_detailData(0));
						dispatch(operationActions.get_faultType());
						dispatch(operationActions.get_serviceName());
						var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
						dispatch(operationActions.get_createOrderInfo(param));
						dispatch(operationActions.get_workFlowTypes());
						dispatch(operationActions.setIsBunder(0));
						dispatch(operationActions.setTouchWorkOrderData({subject:"", desc:desc, monitorData:[]}));
						if(rrid){
							dispatch(operationActions.get_workOrderUi(param2));
						};
						dispatch(operationActions.setHandleAssetsId(rrrlist));
		              	$('#triggerOperationModal').modal('show');
		              	$("#triggerOperationOrderTitle").val(mName);
		              	$("#triggerOperationOrderExplain").val(desc);
		              	$("#triggerOperationFaultSubType").find(".rw-input").text("");
		              	$("#triggerOperationOrderResponse").val("");
		              	$("#triggerOperationOrderOver").val("");
		              	$("#triggerOperationOrderLevel").find(".rw-input").text("");
		              	$("#triggerOperationOrderSla").find(".rw-input").text("");
		              	$("#triggerOperationFlowType").find(".rw-input").text("");
		              	$('#triggerOperationModal').modal('show');
					}else{
						setTimeout(function(){
	               			document.getElementById('publicMessageModelTitle').innerHTML = "提示";
	               			document.getElementById('publicMessageModalcontent').innerHTML = "工单已存在";
	               			$('#publicMessageModal').modal('show');
	             		},100);
	          		};
				}else{
					setTimeout(function(){
	             		document.getElementById('publicMessageModelTitle').innerHTML = "提示";
	             		document.getElementById('publicMessageModalcontent').innerHTML = "设备正常，无需生成工单。";
	             		$('#publicMessageModal').modal('show');
	           		},100);
				};
	},

	handleOnClickDesViewMonitorTableRow: function(row) {
		const { dispatch, selectedNode } = this.props;
		// var _this = this;
		// setTimeout(function () {
			var filter = [{key:"RECID", value:row.id}, {key:"MONITORTYPE", value:row.type}];
			// _this.getFlux().actions.YFTEquipmentActions.get_MonitorData(filter);
			// _this.getFlux().actions.YFTEquipmentActions.set_equipmentParam_2({bClickDesViewMonitorTableRow: true, monitorTableSelectFirstFlag: false, getMonitorDataFilter: filter, selectedMonitorName: row.nameChar});
			dispatch(equipmentActions.setbClickDesViewMonitorTableRow(true));
			dispatch(equipmentActions.setMonitorTableSelectFirstFlag(false));
			dispatch(equipmentActions.setGetMonitorDataFilter(filter));
			dispatch(equipmentActions.setSelectedMonitorName(row.nameChar));
			dispatch(equipmentActions.getMonitorData(filter));
			dispatch(equipmentActions.setSelectedMonitorByClickMonitorTableRow(selectedNode.type, row.type));
		// }, 100);
	},

	handleOnKeyUpDesViewMonitorTableQuickSearch: function(event) {
		const { dispatch } = this.props;
		var last = event.timeStamp;
        setTimeout(function(){
            if(last-event.timeStamp == 0)
            {
                var filtrationConditions = {includedName: $('#desViewMonitorTable_quickSearchName').val()};
                // _this.getFlux().actions.YFTEquipmentActions.get_MonitorTableData(filtrationConditions);
				dispatch(equipmentActions.getMonitorTableData(filtrationConditions));
            }
        }, 500);
	},

	handleOnClickDesViewMonitorTableFilterStatus: function(e) {
		const { dispatch } = this.props;
		// this.getFlux().actions.YFTEquipmentActions.set_monitorTableSelectFirstFlag(false);
		dispatch(equipmentActions.setMonitorTableSelectFirstFlag(false));
        switch (e.currentTarget.id){
            case "desViewMonitorTableFilter_all_btn":
                // this.getFlux().actions.YFTEquipmentActions.set_MonitorFilterStatus("all");
				dispatch(equipmentActions.setMonitorFilterStatus("all"));
                document.getElementById('desViewMonitorTableFilter_all_btn').className = 'btn btn-default btnNoShadow btnAll active';
                document.getElementById('desViewMonitorTableFilter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('desViewMonitorTableFilter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('desViewMonitorTableFilter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('desViewMonitorTableFilter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "desViewMonitorTableFilter_good_btn":
                // this.getFlux().actions.YFTEquipmentActions.set_MonitorFilterStatus("good");
				dispatch(equipmentActions.setMonitorFilterStatus("good"));
                document.getElementById('desViewMonitorTableFilter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('desViewMonitorTableFilter_good_btn').className = 'btn btn-default btnNoShadow btnGood active';
                document.getElementById('desViewMonitorTableFilter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('desViewMonitorTableFilter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('desViewMonitorTableFilter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "desViewMonitorTableFilter_warning_btn":
                // this.getFlux().actions.YFTEquipmentActions.set_MonitorFilterStatus("warning");
				dispatch(equipmentActions.setMonitorFilterStatus("warning"));
                document.getElementById('desViewMonitorTableFilter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('desViewMonitorTableFilter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('desViewMonitorTableFilter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning active';
                document.getElementById('desViewMonitorTableFilter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('desViewMonitorTableFilter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "desViewMonitorTableFilter_error_btn":
                // this.getFlux().actions.YFTEquipmentActions.set_MonitorFilterStatus("error");
				dispatch(equipmentActions.setMonitorFilterStatus("error"));
                document.getElementById('desViewMonitorTableFilter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('desViewMonitorTableFilter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('desViewMonitorTableFilter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('desViewMonitorTableFilter_error_btn').className = 'btn btn-default btnNoShadow btnError active';
                document.getElementById('desViewMonitorTableFilter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "desViewMonitorTableFilter_disable_btn":
                // this.getFlux().actions.YFTEquipmentActions.set_MonitorFilterStatus("disabled");
				dispatch(equipmentActions.setMonitorFilterStatus("disabled"));
                document.getElementById('desViewMonitorTableFilter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('desViewMonitorTableFilter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('desViewMonitorTableFilter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('desViewMonitorTableFilter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('desViewMonitorTableFilter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable active';
                break;
        }
	},

	handleOnClickRowChangePicData: function(e) {
		const { dispatch } = this.props;
		$("#inlineRadio1").click();
        var key = $($(e.target).parent("tr").find("td")[0]).text();
        $(".picDataSelect").find("option").each(function(){
            var name = $(this).val();
            if(name==key){
                // $(this).click();
                $(this).context.selected = true;
            };
        });
        // this.getFlux().actions.YFTEquipmentActions.change_picData(key);
		dispatch(equipmentActions.changePicData(key));
	},

	handleOnSelectChangePicData: function(e) {
		const { dispatch } = this.props;
		var target = e.target;
        var tval = $(target).val();
        $("#inlineRadio1").click();
        // this.getFlux().actions.YFTEquipmentActions.change_picData(tval);
		dispatch(equipmentActions.changePicData(tval));
	},

    render: function() {
	    	const { monitorName, monitorFilterStatus, monitorTableData, monitorTableSelectFirstFlag, monitorsStatus,
		 		    curTowHourValue, funcValue, logGood, logError, logDanger, logBan, goodAlarm, warningAlarm, errorAlarm,
				    selectedMonitorName, curTowHourName, twoHoursReport,monitorsPropertyData,
                    getMonitorsPropertyDataDoneFlag, getAlarmConditionDataDoneFlag, getMySqlMonitorCounterDataDoneFlag} = this.props;
				const { dispatch } = this.props;
        return (
            <div id="listview_desView" className="overviewDesViewDiv groupInfoView">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        {monitorName.replace("(", " (")}
                        <button className="btn desViewMonitorTouchOrderBtn" onClick={this.onTouchOrder}>触发工单</button>
                    </div>
                    <div className="titleRight">
                        <a className="backSpaceText" onClick={this._handleOnClickGoBack}>返回上一级</a>
                        <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                        <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                    </div>
                </div>
                <div className='assetCreateTableDiv col-md-12'>
                    <DesTab1 monitorFilterStatus={monitorFilterStatus} monitorTableData={monitorTableData} monitorTableSelectFirstFlag={monitorTableSelectFirstFlag} monitorsStatus={monitorsStatus} curTowHourValue={curTowHourValue} funcValue={funcValue} logGood={logGood}
                        logError={logError} logDanger={logDanger} logBan={logBan} goodAlarm={goodAlarm} warningAlarm={warningAlarm} errorAlarm={errorAlarm} selectedMonitorName={selectedMonitorName} curTowHourName={curTowHourName} twoHoursReport={twoHoursReport}
					    onClickDesViewMonitorTableRow={this.handleOnClickDesViewMonitorTableRow} onKeyUpDesViewMonitorTableQuickSearch={this.handleOnKeyUpDesViewMonitorTableQuickSearch} onClickDesViewMonitorTableFilterStatus={this.handleOnClickDesViewMonitorTableFilterStatus}
					    onClickRowChangePicData={this.handleOnClickRowChangePicData} onSelectChangePicData={this.handleOnSelectChangePicData}
                        monitorsPropertyData={monitorsPropertyData} getMonitorsPropertyDataDoneFlag={getMonitorsPropertyDataDoneFlag}
                        getAlarmConditionDataDoneFlag={getAlarmConditionDataDoneFlag} getMySqlMonitorCounterDataDoneFlag={getMySqlMonitorCounterDataDoneFlag}
                        getMonitorsPropertyDataFromID={filter => dispatch(equipmentActions.getMonitorsPropertyDataFromID(filter))}
                        setMonitorsPropertyEdit={data => dispatch(equipmentActions.setMonitorsPropertyEdit(data))}
                        getAlarmConditionDataFromMonitorId={monitorId => dispatch(equipmentActions.getAlarmConditionDataFromMonitorId(monitorId))}
                        setGetMonitorsPropertyDataDoneFlag={getMonitorsPropertyDataDoneFlag => dispatch(equipmentActions.setGetMonitorsPropertyDataDoneFlag(getMonitorsPropertyDataDoneFlag))}
                        setGetAlarmConditionDataDoneFlag={getAlarmConditionDataDoneFlag => dispatch(equipmentActions.setGetAlarmConditionDataDoneFlag(getAlarmConditionDataDoneFlag))}
                        setGetMySqlMonitorCounterDataDoneFlag={getMySqlMonitorCounterDataDoneFlag => dispatch(equipmentActions.setGetMySqlMonitorCounterDataDoneFlag(getMySqlMonitorCounterDataDoneFlag))} getMonitorsEntryAliasDataFromID={filter => dispatch(equipmentActions.getMonitorsEntryAliasDataFromID(filter))}/>
	            </div>
            </div>
        );
    }
});

$(window).resize(function () {
	if(document.getElementById('listview_desView') != null) {
		document.getElementById('listview_desView').style.height = $(window).height() - 110 - 30 + 'px';
	}
});

// module.exports = Listview_desView;
Listview_desView.propTypes = {
	monitorTree2: PropTypes.object,
	pieChartMonitorType: PropTypes.string.isRequired,
	monitorName: PropTypes.string.isRequired,
	isCreateWorkOrder: PropTypes.string.isRequired,
	equipmentId: PropTypes.string.isRequired,
	equipmentIdNtz: PropTypes.string.isRequired,
	assetIdNtz: PropTypes.string.isRequired,
	monitorTableData: PropTypes.array.isRequired,
	monitorFilterStatus: PropTypes.string.isRequired,
    monitorTableSelectFirstFlag: PropTypes.bool.isRequired,
    monitorsStatus: PropTypes.array.isRequired,
	curTowHourValue: PropTypes.array.isRequired,
    funcValue: PropTypes.array.isRequired,
    logGood: PropTypes.string.isRequired,
    logError: PropTypes.string.isRequired,
    logDanger: PropTypes.string.isRequired,
    logBan: PropTypes.string.isRequired,
    goodAlarm: PropTypes.string.isRequired,
    warningAlarm: PropTypes.string.isRequired,
    errorAlarm: PropTypes.string.isRequired,
    selectedMonitorName: PropTypes.string.isRequired,
	curTowHourName: PropTypes.string.isRequired,
    twoHoursReport: PropTypes.array.isRequired,
    selectedNode: PropTypes.object,
    getMonitorsPropertyDataDoneFlag: PropTypes.bool.isRequired,
    getAlarmConditionDataDoneFlag: PropTypes.bool.isRequired,
    getMySqlMonitorCounterDataDoneFlag: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { monitorTree2, pieChartMonitorType, monitorName, isCreateWorkOrder } = state.deviceMonitorReducer
    const { equipmentId, equipmentIdNtz, assetIdNtz, monitorTableData, monitorFilterStatus, monitorTableSelectFirstFlag, monitorsStatus,
        curTowHourValue, funcValue, logGood, logError, logDanger, logBan, goodAlarm, warningAlarm, errorAlarm, selectedMonitorName,
        curTowHourName, twoHoursReport, monitorsPropertyData, selectedNode, getMonitorsPropertyDataDoneFlag, getAlarmConditionDataDoneFlag, getMySqlMonitorCounterDataDoneFlag } = state.equipmentReducer

    return {
        monitorTree2,
		pieChartMonitorType,
		monitorName,
		isCreateWorkOrder,
		equipmentId,
		equipmentIdNtz,
		assetIdNtz,
		monitorTableData,
		monitorFilterStatus,
	    monitorTableSelectFirstFlag,
	    monitorsStatus,
		curTowHourValue,
		funcValue,
		logGood,
		logError,
		logDanger,
		logBan,
		goodAlarm,
		warningAlarm,
		errorAlarm,
		selectedMonitorName,
		curTowHourName,
	    twoHoursReport,
		monitorsPropertyData,
		selectedNode,
        getMonitorsPropertyDataDoneFlag,
        getAlarmConditionDataDoneFlag,
        getMySqlMonitorCounterDataDoneFlag
    }
}

export default connect(mapStateToProps)(Listview_desView)
