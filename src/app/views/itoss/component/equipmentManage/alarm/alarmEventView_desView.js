/**
 * Created by SHIN on 2016/1/14.
 * 告警事件主窗口
 */
var React = require('react');
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

var eventLevels = [
    {name:'全部', value:''},
    {name:'错误', value:'error'},
    {name:'危险', value:'warning'}
];
var eventStatus = [
    {name:'全部', value:''},
    {name:'未确认', value:'1'},
    {name:'已确认', value:'2'},
    {name:'派发工单', value:'3'}
];
var refreshTimer = null;

function EquipmentStatusFormatter(value, row) {
    switch (value) {
        case "error":
            return "错误"
            break;
        case "warning":
            return "危险"
            break;
    }
}

function EventStatusFormatter(value, row) {
    if(value == "2") {
        return "已确认";
    }
    else if(value == "3") {
        return "派发工单";
    }
    else {
        return "未确认";
    }
}

var bTableHasCheckBox = false, bExportAlarmEventTable = false;
var AlarmEventView_desView = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    getInitialState: function () {
        return {
            selectedLevel: eventLevels[0],
            selectedStatus: eventStatus[0],
            currentPage: 1,
            numPerPage: 10,
            filter: [],
            rightClickedEvent: null,
            enableChangeAlarmStatus: false
        }
    },

    componentWillMount: function() {
        this.props.getAlarmIssued();
        // var filter = [{key:"FROM", value:(this.state.currentPage-1)*this.state.numPerPage}, {key:"TO", value:this.state.currentPage*this.state.numPerPage}];
        // this.props.getAlarmEvent(filter);
    },

    componentDidMount: function() {
        // dateChange.changeViewStyle();
        if(document.getElementById('alarmEventView_desView') != null) {
            document.getElementById('alarmEventView_desView').style.height = $(window).height() - 110 - 30 + 'px';
        }

        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        var enableChangeAlarmStatus = false, enableTriggerWorkOrder = false;
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmevent/update") {
                enableChangeAlarmStatus = true;
                this.setState({enableChangeAlarmStatus: true});
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmevent/trigger") {
                enableTriggerWorkOrder = true;
            }
        }
        if(!enableChangeAlarmStatus) {
            $("#batchBtn").hide();
            $("#menuItem_confirmAlarm").hide();
            $("#menuItem_continueAlarm").hide();
        }
        if(!enableTriggerWorkOrder) {
            $("#menuItem_triggerWorkOrder").hide();
        }

        $('#alarmEventTable').bootstrapTable({
            columns: [
                {
                    title: '事件设备',
                    field: 'equipmentip',
                    sortable: false
                }, {
                    title: '事件级别',
                    field: 'equipmentstatus',
                    formatter: EquipmentStatusFormatter,
                    sortable: false
                }, {
                    title: '事件状态',
                    field: 'eventstatus',
                    formatter: EventStatusFormatter,
                    sortable: false
                }, {
                    title: '事件生成时间',
                    field: 'alarmtime',
                    sortable: false
                }, {
                    title: '事件上次修改时间',
                    field: 'lasttime',
                    sortable: false
                }, {
                    title: '详细',
                    field: 'alarmcontent',
                    sortable: false
                }
            ],
            data: [],
            onClickRow: this.showEventInfo
        });

        // refreshTimer = window.setInterval("refreshAlarmEvent", 5000);
        var _this = this;
        refreshTimer = setInterval(function () {
            var showStart = (_this.state.currentPage-1)*_this.state.numPerPage;
            var showEnd = _this.state.currentPage*_this.state.numPerPage;
            var filter = _this.state.filter.slice(0);
            filter.push({key:"FROM", value:showStart});
            filter.push({key:"TO", value:showEnd});
            _this.props.getAlarmEvent(filter);
            // $('#alarmEventTable').bootstrapTable('refreshOptions', {
            //     data: _this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventData
            // });
            _this.hideMenu();
            // _this.addRightClickListener();
            if(document.getElementById("fixed-alarmEventTable-pagination")){
              document.getElementById("fixed-alarmEventTable-pagination").style.display = "block";
            }
            $('#alarmEventTable').bootstrapTable('refreshOptions', {
                pagination: false
            });
        }, 120000);

        $("#cancelBatchBtn").hide();
        // $("#batchContinueAlarmBtn").hide();
        $("#batchConfirmAlarmBtn").hide();
    },

    componentDidUpdate: function() {
        var alarmEventData = this.props.alarmEventData;
        var alarmEventCount = this.props.alarmEventCount;

        $('#alarmEventTable').bootstrapTable('refreshOptions', {
            data: this.props.alarmEventData
        });
        // this.hideMenu();
        // this.addRightClickListener();

        if(alarmEventCount == 0) {
            document.getElementById("pagination-detail").style.display = "none";
            document.getElementById("pagination").style.display = "none";
        }
        else if(Math.ceil(alarmEventCount/this.state.numPerPage) == 1) {
            document.getElementById("pagination-detail").style.display = "block";
            document.getElementById("pagination").style.display = "none";
        }
        else {
            document.getElementById("pagination-detail").style.display = "block";
            document.getElementById("pagination").style.display = "block";
        }

        var paginationLi = [];
        if(pagination!=null && pagination!=""){
          paginationLi = document.getElementById("pagination-list").childNodes;
        };
        var totalPageNum = Math.ceil(alarmEventCount/this.state.numPerPage);
        if(this.state.currentPage == 1) {
            paginationLi[0].className = "page-first disabled";
            paginationLi[1].className = "page-pre disabled";
        }
        else {
            paginationLi[0].className = "page-first";
            paginationLi[1].className = "page-pre";
        }

        if(this.state.currentPage == totalPageNum) {
            paginationLi[paginationLi.length-2].className = "page-next disabled";
            paginationLi[paginationLi.length-1].className = "page-last disabled";
        }
        else {
            paginationLi[paginationLi.length-2].className = "page-next";
            paginationLi[paginationLi.length-1].className = "page-last";
        }

        for(var i = 2; i < paginationLi.length-2; i++) {
            paginationLi[i].className = "page-number";
        }
        for(var i = 0; i < paginationLi.length; i++) {
            if(parseInt(paginationLi[i].innerText) == this.state.currentPage) {
                paginationLi[i].className = "page-number active";
                break;
            }
        }

        if(bExportAlarmEventTable) {
            $('#alarmEventTable').bootstrapTable('refreshOptions', {
                pagination: false
            });

            $('#alarmEventTable').tableExport({type:'excel'});
            bExportAlarmEventTable = false;

            $('#alarmEventTable').bootstrapTable('refreshOptions', {
                pagination: true,
                pageSize: this.state.numPerPage,
                pageList: [10,25,50,100]
            });
        }
    },

    componentWillUnmount: function() {
        clearInterval(refreshTimer);
        var _this = this;
        setTimeout(function () {
            _this.props.setAlarmEventData([]);
            _this.props.setAlarmEventCount(0);
        }, 100);
    },

    // addRightClickListener: function() {
    //     var trObjs = document.getElementById("alarmEventTable").getElementsByTagName("tbody")[0].childNodes;
    //     for(var i = 0; i < trObjs.length; i++) {
    //         // LTEvent.addListener(trObjs[i],"contextmenu",LTEvent.cancelBubble);
    //         // LTEvent.addListener(trObjs[i],"contextmenu",this.showMenu);
    //         var _this = this;
    //         trObjs[i].oncontextmenu = function (e){
    //             _this.showMenu(e);
    //             return false;
    //         }
    //     }
    //     document.onclick = this.hideMenu;
    //     document.getElementById("alarmEventRightClickMenu").onclick = this.hideMenu;
    //
    //     // LTEvent.addListener(document,"click",this.hideMenu);
    // },

    showMenu: function(e) {
        var container = e.currentTarget;
        var menu = document.getElementById('alarmEventRightClickMenu');
        var evt = window.event || arguments[0];

        /*获取当前鼠标右键按下后的位置，据此定义菜单显示的位置*/
        var rightedge = container.clientWidth-evt.layerX;
        var bottomedge = $(window).height()-30-evt.clientY;

        /*如果从鼠标位置到容器右边的空间小于菜单的宽度，就定位菜单的左坐标（Left）为当前鼠标位置向左一个菜单宽度*/
        if (rightedge < menu.offsetWidth)
           menu.style.left = container.scrollLeft + evt.layerX - menu.offsetWidth + "px";
        else
            /*否则，就定位菜单的左坐标为当前鼠标位置*/
           menu.style.left = container.scrollLeft + evt.layerX + "px";

        /*如果从鼠标位置到容器下边的空间小于菜单的高度，就定位菜单的上坐标（Top）为当前鼠标位置向上一个菜单高度*/
        if (bottomedge < menu.offsetHeight)
           menu.style.top = evt.layerY - menu.offsetHeight + 113 + "px";
        else
            /*否则，就定位菜单的上坐标为当前鼠标位置*/
           menu.style.top = container.scrollTop + evt.layerY + 113 + "px";

        /*设置菜单可见*/
        menu.style.visibility = "visible";
        // LTEvent.addListener(menu,"contextmenu",LTEvent.cancelBubble);

        var tdNodes = e.currentTarget.childNodes;
        var alarmEventData = this.props.alarmEventData;
        for(var i = 0; i < alarmEventData.length; i++) {
            if(((alarmEventData[i].equipmentstatus=="error" && tdNodes[bTableHasCheckBox?2:1].innerText=="错误") || (alarmEventData[i].equipmentstatus=="warning" && tdNodes[bTableHasCheckBox?2:1].innerText=="危险"))
                && ((alarmEventData[i].eventstatus=="2" && tdNodes[bTableHasCheckBox?3:2].innerText=="已确认") || (alarmEventData[i].eventstatus!="2" && tdNodes[bTableHasCheckBox?3:2].innerText!="已确认"))
                && alarmEventData[i].equipmentip==tdNodes[bTableHasCheckBox?1:0].innerText && alarmEventData[i].alarmtime==tdNodes[bTableHasCheckBox?4:3].innerText && alarmEventData[i].lasttime==tdNodes[bTableHasCheckBox?5:4].innerText && alarmEventData[i].alarmcontent==tdNodes[bTableHasCheckBox?6:5].innerText) {
                    this.setState({rightClickedEvent: alarmEventData[i]});
                    if(this.state.enableChangeAlarmStatus) {
                        if(alarmEventData[i].eventstatus!="2") {
                            $("#menuItem_confirmAlarm").show();
                            $("#menuItem_continueAlarm").hide();
                        }
                        else {
                            $("#menuItem_confirmAlarm").hide();
                            $("#menuItem_continueAlarm").show();
                        }
                    }
                    this.props.get_isCreateWorkOrder(alarmEventData[i].equipmentRecId);
                    break;
                }
        }
    },
    /*隐藏菜单*/
    hideMenu: function(e) {
        var menu = document.getElementById('alarmEventRightClickMenu');
        if(menu != null) {
            menu.style.visibility = 'hidden';
        }
    },

    showEventInfo: function(row, element) {
        // console.log(row);
        // this.props.set_alarmEventTableSelectedRowData(row);
        var filter = [{key:"EQUIPMENTRECID", value:row.equipmentRecId}];
        this.props.getAlarmDetails(filter);
        this.props.setSelectedAlarmEvent(row);
        this.props.setAlarmEventCurrentPage(this.state.currentPage);
        this.props.setAlarmEventNumPerPage(this.state.numPerPage);
        this.props.setAlarmEventFilter(this.state.filter);
        this.props.setAlarmEventDetailModalOpenedFromPage("alarmEventPage");
        this.props.get_isCreateWorkOrder(row.equipmentRecId);
        $('#alarmEventDetailModal').modal('show')
    },

    _handleSelectEventLevel: function(e) {
        this.setState({selectedLevel: e});
    },

    _handleSelectEventStatus: function(e) {
        this.setState({selectedStatus: e});
    },

    _handleOnClickSearch: function() {
        var filter = [];
        if(this.state.selectedLevel.value != "") {
            filter.push({key:"ALARMLEVEL", value:this.state.selectedLevel.value});
        }
        if(this.state.selectedStatus.value != "") {
            filter.push({key:"EVENTSTATUS", value:this.state.selectedStatus.value});
        }
        if($.trim(document.getElementById("alarmEvent_equipment").value) != "") {
            filter.push({key:"EQUIPMENTIP", value:document.getElementById("alarmEvent_equipment").value});
        }
        if(document.getElementById("alarmEvent_radio_yes").checked) {
            filter.push({key:"STARTTIME", value:document.getElementById("alarmEvent_startTime").childNodes[0].value});
            filter.push({key:"ENDTIME", value:document.getElementById("alarmEvent_endTime").childNodes[0].value});
        }
        this.setState({filter: filter.slice(0)});
        // var showStart = (this.state.currentPage-1)*this.state.numPerPage;
        // var showEnd = this.state.currentPage*this.state.numPerPage;
        this.setState({currentPage: 1});
        var showStart = 0;
        var showEnd = 1*this.state.numPerPage;
        // var showEnd = this.state.numPerPage=="ALL" ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : (this.state.currentPage*this.state.numPerPage>this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : this.state.currentPage*this.state.numPerPage);
        // var filter = [{key:"FROM", value:showStart}, {key:"TO", value:showEnd}];
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        this.props.getAlarmEvent(filter);
        this.props.setAlarmEventPageCurrentFilter(filter);
        // $('#alarmEventTable').bootstrapTable('refreshOptions', {
        //     data: this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventData
        // });
        this.hideMenu();
        // this.addRightClickListener();
        document.getElementById("fixed-alarmEventTable-pagination").style.display = "block";
        $('#alarmEventTable').bootstrapTable('refreshOptions', {
            pagination: false
        });
    },

    _handleOnClickBatch: function() {
        //批量确认告警
        $("#batchBtn").hide();
        $("#cancelBatchBtn").show();
        // $("#batchContinueAlarmBtn").show();
        $("#batchConfirmAlarmBtn").show();

        bTableHasCheckBox = true;
        $('#alarmEventTable').bootstrapTable('refreshOptions', {
            columns: [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '事件设备',
                    field: 'equipmentip',
                    sortable: false
                }, {
                    title: '事件级别',
                    field: 'equipmentstatus',
                    formatter: EquipmentStatusFormatter,
                    sortable: false
                }, {
                    title: '事件状态',
                    field: 'eventstatus',
                    formatter: EventStatusFormatter,
                    sortable: false
                }, {
                    title: '事件生成时间',
                    field: 'alarmtime',
                    sortable: false
                }, {
                    title: '事件上次修改时间',
                    field: 'lasttime',
                    sortable: false
                }, {
                    title: '详细',
                    field: 'alarmcontent',
                    sortable: false
                }
            ]
        });
        this.hideMenu();
        // this.addRightClickListener();
    },

    _handleOnClickCancelBatch: function() {
        //取消
        $("#batchBtn").show();
        $("#cancelBatchBtn").hide();
        // $("#batchContinueAlarmBtn").hide();
        $("#batchConfirmAlarmBtn").hide();

        bTableHasCheckBox = false;
        $('#alarmEventTable').bootstrapTable('refreshOptions', {
            columns: [
                {
                    title: '事件设备',
                    field: 'equipmentip',
                    sortable: false
                }, {
                    title: '事件级别',
                    field: 'equipmentstatus',
                    formatter: EquipmentStatusFormatter,
                    sortable: false
                }, {
                    title: '事件状态',
                    field: 'eventstatus',
                    formatter: EventStatusFormatter,
                    sortable: false
                }, {
                    title: '事件生成时间',
                    field: 'alarmtime',
                    sortable: false
                }, {
                    title: '事件上次修改时间',
                    field: 'lasttime',
                    sortable: false
                }, {
                    title: '详细',
                    field: 'alarmcontent',
                    sortable: false
                }
            ]
        });
        this.hideMenu();
        // this.addRightClickListener();
    },

    _handleOnClickBatchChangeAlarmStatus: function(e) {
        //按钮：确认告警、继续告警
        var selections = $('#alarmEventTable').bootstrapTable('getSelections');
        if(selections.length != 0) {
            for(var i = 0; i < selections.length; i++) {
                var dateObjec = {
                  RecId:selections[i].recid,
                  EventStatus: e.currentTarget.id=="batchConfirmAlarmBtn"?"2":"1"
                };
                this.props.updateAlarmEventStatus(dateObjec);
            };

            // var _this = this;
            // setTimeout(function () {
            //     var showStart = (_this.state.currentPage-1)*_this.state.numPerPage;
            //     var showEnd = _this.state.currentPage*_this.state.numPerPage;
            //     var filter = _this.state.filter.slice(0);
            //     filter.push({key:"FROM", value:showStart});
            //     filter.push({key:"TO", value:showEnd});
            //     _this.props.getAlarmEvent(filter);
            //     document.getElementById("fixed-alarmEventTable-pagination").style.display = "block";
            //     // $('#alarmEventTable').bootstrapTable('refreshOptions', {
            //     //     pagination: false
            //     // });
            //     $('#alarmEventTable').bootstrapTable('refreshOptions', {
            //         data: _this.props.alarmEventData,
            //         pagination: false
            //     });
            //     _this.hideMenu();
            //     // _this.addRightClickListener();
            // }, 500);
            var showStart = (this.state.currentPage-1)*this.state.numPerPage;
            var showEnd = this.state.currentPage*this.state.numPerPage;
            var filter = this.state.filter.slice(0);
            filter.push({key:"FROM", value:showStart});
            filter.push({key:"TO", value:showEnd});
            this.props.setAlarmEventPageCurrentFilter(filter);
            $('#alarmEventTable').bootstrapTable('refreshOptions', {
                pagination: false
            });
            this.hideMenu();
        }
        else {
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = '未选择告警事件';
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        }

        $("#batchBtn").show();
        $("#cancelBatchBtn").hide();
        // $("#batchContinueAlarmBtn").hide();
        $("#batchConfirmAlarmBtn").hide();

        bTableHasCheckBox = false;
        $('#alarmEventTable').bootstrapTable('refreshOptions', {
            columns: [
                {
                    title: '事件设备',
                    field: 'equipmentip',
                    sortable: false
                }, {
                    title: '事件级别',
                    field: 'equipmentstatus',
                    formatter: EquipmentStatusFormatter,
                    sortable: false
                }, {
                    title: '事件状态',
                    field: 'eventstatus',
                    formatter: EventStatusFormatter,
                    sortable: false
                }, {
                    title: '事件生成时间',
                    field: 'alarmtime',
                    sortable: false
                }, {
                    title: '事件上次修改时间',
                    field: 'lasttime',
                    sortable: false
                }, {
                    title: '详细',
                    field: 'alarmcontent',
                    sortable: false
                }
            ]
        });
        this.hideMenu();
        // this.addRightClickListener();
    },

    _handleOnClickChangeAlarmStatus: function(e) {
        //下拉菜单：确认告警、继续告警
        var dateObjec = {
          RecId:this.state.rightClickedEvent.recid,
          EventStatus: e.currentTarget.innerHTML=="确认告警"?"2":"1"
        };
        this.props.updateAlarmEventStatus(dateObjec);

        // var _this = this;
        // setTimeout(function () {
        //     var showStart = (_this.state.currentPage-1)*_this.state.numPerPage;
        //     var showEnd = _this.state.currentPage*_this.state.numPerPage;
        //     var filter = _this.state.filter.slice(0);
        //     filter.push({key:"FROM", value:showStart});
        //     filter.push({key:"TO", value:showEnd});
        //     _this.props.getAlarmEvent(filter);
        //     document.getElementById("fixed-alarmEventTable-pagination").style.display = "block";
        //     // $('#alarmEventTable').bootstrapTable('refreshOptions', {
        //     //     pagination: false
        //     // });
        //     $('#alarmEventTable').bootstrapTable('refreshOptions', {
        //         data: _this.props.alarmEventData,
        //         pagination: false
        //     });
        //     _this.hideMenu();
        //     // _this.addRightClickListener();
        // }, 500);
        var showStart = (this.state.currentPage-1)*this.state.numPerPage;
        var showEnd = this.state.currentPage*this.state.numPerPage;
        var filter = this.state.filter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        this.props.setAlarmEventPageCurrentFilter(filter);
        $('#alarmEventTable').bootstrapTable('refreshOptions', {
            pagination: false
        });
        this.hideMenu();
    },

    _handleOnClickCreatWorkOrder: function() {
        if(this.props.isCreateWorkOrder == "0"){
            // var dateObjec = {
            //   RecId:this.state.rightClickedEvent.recid,
            //   EventStatus: "3"
            this.props.setSelectedAlarmEvent(this.state.rightClickedEvent);
            // };
            // this.props.update_alarmEventStatus(dateObjec);
            this.props.initDetailData(0);
            this.props.getFaultType();
            this.props.getServiceName();
            var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
            this.props.getCreateOrderInfo(param);
            this.props.getWorkFlowTypes();
            this.props.setIsBunder(0);
            // console.log(this.state.itoss_Monitor.MonitorTableSelectedRowData);
            var sae = this.props.selectedAlarmEvent;
            var equipId = sae.equipmentRecId;
            var uiParam = [{key:"RECID",value:equipId},{key:"MONITORTYPE",value:""}];
            if(equipId){
              this.props.get_workOrderUi(uiParam);
            };
            // var type = this.state.itoss_Monitor.MonitorType;
            // data.markType = type;
            // this.getFlux().actions.YFTOperationActions.set_touchWorkOrderData(data);
            var title = sae.equipmentip + " (故障)";
            this.props.setWorkTheme(title);
            var desc = sae.alarmcontent;
            this.props.setWorkDescription(desc);
            this.props.setTouchWorkOrderDataDesc(desc);
            $('#alarmEventWorkOrderModal').modal('show')
            $("#alarmEventWorkOrderTitle").val(title);
            $("#alarmEventWorkOrderDescription").val(desc);
            $("#alarmOperationFaultBigType").find(".rw-input").text("");
            $("#alarmOperationFaultSubType").find(".rw-input").text("");
            $("#alarmEventWorkOrderResponseTime").val("");
            $("#alarmEventWorkOrderOverTime").val("");
            $("#alarmOperationOrderLevel").find(".rw-input").text("");
            $("#alarmOperationOrderSla").find(".rw-input").text("");
            $("#alarmOperationOrderFlowType").find(".rw-input").text("");
        }else{
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示";
            document.getElementById('publicMessageModalcontent').innerHTML = "已经存在工单。";
            $('#publicMessageModal').modal('show');
          },100);
        }
    },

    _handleOnClickExport: function(e) {
        //导出所有数据
        bExportAlarmEventTable = true;
        var filter = this.state.filter.slice(0);
        filter.push({key:"FROM", value:0});
        filter.push({key:"TO", value:this.props.alarmEventCount});
        filter.push({key:"async", value:false});
        this.props.getAlarmEvent(filter);

        document.getElementById("fixed-alarmEventTable-pagination").style.display = "none";
    },

    _handleOnClickPageList: function(e) {
        //更改每一页显示行数
        var numPerPage = e.currentTarget.innerText;
        this.setState({numPerPage: numPerPage});
        var alarmEventCount = this.props.alarmEventCount;
        var totalPageNum = Math.ceil(alarmEventCount/numPerPage);
        var currentPage = this.state.currentPage;
        if(this.state.currentPage > totalPageNum) {
            this.setState({currentPage: totalPageNum});
            currentPage = totalPageNum;
        }
        var pageList = e.currentTarget.parentNode;
        for(var i = 0; i < pageList.childNodes.length; i++) {
            pageList.childNodes[i].className = ""
        }
        e.currentTarget.className = "active";

        var showStart = (currentPage-1)*numPerPage;
        var showEnd = currentPage*numPerPage;
        // var showEnd = numPerPage=="ALL" ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : (currentPage*numPerPage>this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : currentPage*numPerPage);
        var filter = this.state.filter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        this.props.getAlarmEvent(filter);
        // $('#alarmEventTable').bootstrapTable('refreshOptions', {
        //     data: this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventData
        // });
        this.hideMenu();
        // this.addRightClickListener();
    },

    _handleOnClickPageFirst: function() {
        this.setState({currentPage: 1});

        var showStart = 0;
        var showEnd = 1*this.state.numPerPage;
        // var showEnd = this.state.numPerPage=="ALL" ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : (1*this.state.numPerPage>this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : 1*this.state.numPerPage);
        var filter = this.state.filter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        this.props.getAlarmEvent(filter);
        // $('#alarmEventTable').bootstrapTable('refreshOptions', {
        //     data: this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventData
        // });
        this.hideMenu();
        // this.addRightClickListener();
    },

    _handleOnClickPagePre: function() {
        var currentPage = this.state.currentPage-1;
        this.setState({currentPage: currentPage});

        var showStart = (currentPage-1)*this.state.numPerPage;
        var showEnd = currentPage*this.state.numPerPage;
        // var showEnd = this.state.numPerPage=="ALL" ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : (currentPage*this.state.numPerPage>this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : currentPage*this.state.numPerPage);
        var filter = this.state.filter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        this.props.getAlarmEvent(filter);
        // $('#alarmEventTable').bootstrapTable('refreshOptions', {
        //     data: this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventData
        // });
        this.hideMenu();
        // this.addRightClickListener();
    },

    _handleOnClickPageNumber: function(e) {
        var currentPage = e.currentTarget.innerText;
        this.setState({currentPage: parseInt(currentPage)});

        var showStart = (parseInt(currentPage)-1)*this.state.numPerPage;
        var showEnd = parseInt(currentPage)*this.state.numPerPage;
        // var showEnd = this.state.numPerPage=="ALL" ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : (parseInt(currentPage)*this.state.numPerPage>this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : parseInt(currentPage)*this.state.numPerPage);
        var filter = this.state.filter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        this.props.getAlarmEvent(filter);
        // $('#alarmEventTable').bootstrapTable('refreshOptions', {
        //     data: this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventData
        // });
        this.hideMenu();
        // this.addRightClickListener();
    },

    _handleOnClickPageNext: function() {
        var currentPage = this.state.currentPage+1;
        this.setState({currentPage: currentPage});
        var showStart = (currentPage-1)*this.state.numPerPage;
        var showEnd = currentPage*this.state.numPerPage;
        // var showEnd = this.state.numPerPage=="ALL" ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : (currentPage*this.state.numPerPage>this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : currentPage*this.state.numPerPage);
        var filter = this.state.filter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        this.props.getAlarmEvent(filter);
        this.props.setAlarmEventPageCurrentFilter(filter);
        // $('#alarmEventTable').bootstrapTable('refreshOptions', {
        //     data: this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventData
        // });
        this.hideMenu();
        // this.addRightClickListener();
    },

    _handleOnClickPageLast: function() {
        var alarmEventCount = this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount;
        var totalPageNum = Math.ceil(alarmEventCount/this.state.numPerPage);
        this.setState({currentPage: totalPageNum});

        var showStart = (totalPageNum-1)*this.state.numPerPage;
        var showEnd = totalPageNum*this.state.numPerPage;
        // var showEnd = this.state.numPerPage=="ALL" ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : (totalPageNum*this.state.numPerPage>this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount ? this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventCount : totalPageNum*this.state.numPerPage);
        var filter = this.state.filter.slice(0);
        filter.push({key:"FROM", value:showStart});
        filter.push({key:"TO", value:showEnd});
        this.props.getAlarmEvent(filter);
        // $('#alarmEventTable').bootstrapTable('refreshOptions', {
        //     data: this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventData
        // });
        this.hideMenu();
        // this.addRightClickListener();
    },

    getPageNumberLi: function() {
        var alarmEventCount = this.props.alarmEventCount;
        var totalPageNum = Math.ceil(alarmEventCount/this.state.numPerPage);
        var pageArray = [];
        var _this = this;
        if(totalPageNum <= 5) {
            for(var i = 0; i < totalPageNum; i++) {
                pageArray.push(i+1);
            }
            return (
                <ul id="pagination-list" className="pagination">
                    <li className="page-first" onClick={this._handleOnClickPageFirst}><a href="javascript:void(0)">«</a></li>
                    <li className="page-pre" onClick={this._handleOnClickPagePre}><a href="javascript:void(0)">‹</a></li>
                    {pageArray.map(function(page) {
                        return (<li className="page-number" onClick={_this._handleOnClickPageNumber}><a href="javascript:void(0)">{page}</a></li>);
                    })}
                    <li className="page-next" onClick={this._handleOnClickPageNext}><a href="javascript:void(0)">›</a></li>
                    <li className="page-last" onClick={this._handleOnClickPageLast}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else if(this.state.currentPage-1 <= 2) {
            return (
                <ul id="pagination-list" className="pagination">
                    <li className="page-first" onClick={this._handleOnClickPageFirst}><a href="javascript:void(0)">«</a></li>
                    <li className="page-pre" onClick={this._handleOnClickPagePre}><a href="javascript:void(0)">‹</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">1</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">2</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">3</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">4</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">5</a></li>
                    <li className="page-next" onClick={this._handleOnClickPageNext}><a href="javascript:void(0)">›</a></li>
                    <li className="page-last" onClick={this._handleOnClickPageLast}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else if(totalPageNum-this.state.currentPage <= 2) {
            return (
                <ul id="pagination-list" className="pagination">
                    <li className="page-first" onClick={this._handleOnClickPageFirst}><a href="javascript:void(0)">«</a></li>
                    <li className="page-pre" onClick={this._handleOnClickPagePre}><a href="javascript:void(0)">‹</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">{totalPageNum-4}</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">{totalPageNum-3}</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">{totalPageNum-2}</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">{totalPageNum-1}</a></li>
                    <li className="page-number" onClick={this._handleOnClickPageNumber}><a href="javascript:void(0)">{totalPageNum}</a></li>
                    <li className="page-next" onClick={this._handleOnClickPageNext}><a href="javascript:void(0)">›</a></li>
                    <li className="page-last" onClick={this._handleOnClickPageLast}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else {
            pageArray = [this.state.currentPage-2, this.state.currentPage-1, this.state.currentPage, this.state.currentPage+1, this.state.currentPage+2];
            return (
                <ul id="pagination-list" className="pagination">
                    <li className="page-first disabled" onClick={this._handleOnClickPageFirst}><a href="javascript:void(0)">«</a></li>
                    <li className="page-pre disabled" onClick={this._handleOnClickPagePre}><a href="javascript:void(0)">‹</a></li>
                    {pageArray.map(function(page) {
                        return (<li className="page-number" onClick={_this._handleOnClickPageNumber}><a href="javascript:void(0)">{page}</a></li>);
                    })}
                    <li className="page-next" onClick={this._handleOnClickPageNext}><a href="javascript:void(0)">›</a></li>
                    <li className="page-last" onClick={this._handleOnClickPageLast}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
    },

    render: function() {
        var showStart = (this.state.currentPage-1)*this.state.numPerPage+1;
        var showEnd = (this.state.currentPage*this.state.numPerPage>this.props.alarmEventCount ? this.props.alarmEventCount : this.state.currentPage*this.state.numPerPage);
        var date = new Date();
        date.setDate(date.getDate() - 1);
        // var AlarmEventCount = 1;  //测试数据
        // var showStart = 1;  //测试数据
        // var showEnd = 2;  //测试数据
        return (
            <div id="alarmEventView_desView" className='overviewDesViewDiv alarmEventView'>
                <div className="operationButtons">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            告警事件列表
                        </div>
                        <div className="titleRight">
                            <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                            <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="buttonInfo">
                            <p>告警事件列表的功能：查看某一时间段告警的详细事件，并可以对未确认告警事件进确认告警和触发工单操作处理。</p>
                            <button className="btn btnSave" onClick={this._handleOnClickSearch}>查询</button>
                            <button id="batchBtn" type="button" className="btn btnSave" onClick={this._handleOnClickBatch}>批量确认告警</button>
                            <button id="batchConfirmAlarmBtn" type="button" className="btn btnSave" onClick={this._handleOnClickBatchChangeAlarmStatus}>确认告警</button>
                            <button id="batchContinueAlarmBtn" type="button" className="btn btnSave" onClick={this._handleOnClickBatchChangeAlarmStatus} style={{display:"none"}}>继续告警</button>
                            <button id="cancelBatchBtn" type="button" className="btn btnSave" onClick={this._handleOnClickCancelBatch}>取消</button>
                        </div>
                    </div>
                </div>
                <div className='operationCreateTableDiv col-md-12'>
                    <div className='table-basic col-md-12'>
                        <div className="table-basic-row col-md-12 no-bottom-border">
                            <div className="col-md-4">
                                <div className="table-basic-h1 col-md-6">事件级别</div>
                                <div className="table-basic-h1-input col-md-6">
                                    <ReactWidgets.DropdownList className='form-control dropdownStyle col-md-12' data={eventLevels} value={this.state.selectedLevel} textField="name" onChange={this._handleSelectEventLevel}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="table-basic-h1 col-md-6">事件状态</div>
                                <div className="table-basic-h1-input col-md-6">
                                    <ReactWidgets.DropdownList className='form-control dropdownStyle col-md-12' data={eventStatus} value={this.state.selectedStatus} textField="name" onChange={this._handleSelectEventStatus}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="table-basic-h1 col-md-6">事件设备</div>
                                <div className="table-basic-h1-input col-md-6"><input id="alarmEvent_equipment" type="text" className="input-xlarge col-md-12" /></div>
                            </div>
                            <div className="col-md-4">
                                <div className="table-basic-h1 col-md-6">是否查询时间</div>
                                <div className="table-basic-h1 col-md-6">
                                    <label className="radioLabel">
                                        <input id="alarmEvent_radio_yes" type="radio" name="alarmEvent_radio" value="1"/> 是
                                    </label>
                                    <label className="radioLabel">
                                        <input id="alarmEvent_radio_no" type="radio" name="alarmEvent_radio" value="0" defaultChecked="true"/> 否
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="table-basic-h1 col-md-6">开始时间</div>
                                <div className="table-basic-h1-input col-md-6">
                                    <ReactWidgets.DateTimePicker id="alarmEvent_startTime" className='dateTimePickerStyle full-width col-md-12' format={"yyyy-MM-dd HH:mm:ss"} defaultValue={date}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="table-basic-h1 col-md-6">结束时间</div>
                                <div className="table-basic-h1-input col-md-6">
                                    <ReactWidgets.DateTimePicker id="alarmEvent_endTime" className='dateTimePickerStyle full-width col-md-12' format={"yyyy-MM-dd HH:mm:ss"} defaultValue={new Date()} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clearContentTabDiv"></div>
                    <div className="contentline col-md-12"/>
                    <div id="alarmEventRightClickMenu" className="menu">
                        <div id="menuItem_confirmAlarm" className="menuitems">
                            <a href="javascript:void(0);" onClick={this._handleOnClickChangeAlarmStatus}>确认告警</a>
                        </div>
                        <div id="menuItem_continueAlarm" className="menuitems" style={{display:"none"}}>
                            <a href="javascript:void(0);" onClick={this._handleOnClickChangeAlarmStatus}>继续告警</a>
                        </div>
                        <div id="menuItem_triggerWorkOrder" className="menuitems">
                            <a href="javascript:void(0);" onClick={this._handleOnClickCreatWorkOrder}>生成工单</a>
                        </div>
                    </div>
                    <div id='alarmEventTable-toolbar' className='col-md-12' style={{textAlign: "right"}}>
                        <div id='toolbar-form' role='form'>
                            <div className='btn-group'>
                                <button className='btn dropdown-toggle' data-toggle='dropdown' type='button'>
                                    <i className='glyphicon glyphicon-export icon-share'/>
                                    <span className='caret'/>
                                </button>
                                <ul className='dropdown-menu dropdown-menu-right' role='menu'>
                                    <li data-type='excel' onClick={this._handleOnClickExport}>
                                        <a href='javascript:void(0)'>MS-Excel</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <table id='alarmEventTable'
                           data-toggle='table'
                           data-classes='table table-no-bordered table-hover'
                           data-toolbar='#alarmEventTable-toolbar'>
                    </table>
                    <div id="fixed-alarmEventTable-pagination" className="fixed-table-pagination">
                        <div id="pagination-detail" className="pull-left pagination-detail">
                            <span className="pagination-info">显示第 {showStart} 到第 {showEnd} 条记录，总共 {this.props.alarmEventCount} 条记录</span>
                            <span className="page-list">
                                {"每页显示 "}
                                <span className="btn-group dropup">
                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.state.numPerPage} <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li className="active" onClick={this._handleOnClickPageList}><a href="javascript:void(0)">10</a></li>
                                        <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)">25</a></li>
                                        <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)">50</a></li>
                                        <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)">100</a></li>
                                    </ul>
                                </span>
                                {" 条记录"}
                            </span>
                        </div>
                        <div id="pagination" className="pull-right pagination">
                            {this.getPageNumberLi()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('alarmEventView_desView') != null) {
        document.getElementById('alarmEventView_desView').style.height = $(window).height() - 110 - 30 + 'px';
    }

    $('#alarmEventTable').bootstrapTable('resetView');
});

module.exports = AlarmEventView_desView;
