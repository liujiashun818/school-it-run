/**
 * Created by Yuchen on 2016/03/08.
 * 告警日志主窗口
 */
var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');
var widget = require('../../../../../utils/widget.js');
var util = require('../../../../../utils/util.js');

var dateTimeFormatter = function(value,row){
    var res = "-";
    if(!value||value==null) return res;
    var date = util.getDateObj(value);
    if(isNaN(date)) return res;
    res = date.Format("yyyy-MM-dd hh:mm:ss");
    return res;
}

var AlarmLog_desView = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            initFrom: 1,
            initNumPerPage: 25,
            initCurrentPage: 1,
            numPerPage: 25,
            selectedAlarmName: "",
            selectedAlarmDevice: "",
            alarmNameId: "-",
        }
    },
    componentDidMount: function() {
        var _this = this;
        if(document.getElementById('alarmLog_desView') != null) {
            document.getElementById('alarmLog_desView').style.height = $(window).height() - 110 - 30 + 'px';
        }
        var _from = this.state.initFrom*this.state.initCurrentPage - 1;
        var _to = this.state.initNumPerPage;
        var _startTime = $("#alarmLog_startTime").find("input").val();
        var _endTime = $("#alarmLog_endTime").find("input").val();
        this.setState({
            origin_filter: {
                startTime: _startTime,
                endTime: _endTime,
            },
        },function(){
            setTimeout(function () {
                _this.props.get_alarm_log_page_data({
                    data: {
                        from: _from,
                        to: _to,
                        startTime: _startTime,
                        endTime: _endTime,
                    },
                    error: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                            document.getElementById('publicMessageModalcontent').innerHTML = "查询失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                });
            }, 100);
        });

    },
    componentDidUpdate: function() {
        var table = $('#alarmLogTable');
        var data = this.props.AlarmLogList;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        table.bootstrapTable('refreshOptions', {data: data});
    },
    render: function() {
        var _this = this;
        //filter参数设置
        var alarmDevice_list = [{id:"-",name:"全部"}];
        var alarmName_list =  [{id:"-",name:"全部"}];
        var default_alarmDeviceID = "-";
        var default_alarmNameID = "-";
        for(var i in this.props.AlarmDeviceList){//加工告警设备列表
            alarmDevice_list.push({id:this.props.AlarmDeviceList[i].RecId,name:this.props.AlarmDeviceList[i].TITLE});
        }
        for(var i in this.props.AlarmNameList){//加工告警名称列表
            alarmName_list.push({id:this.props.AlarmNameList[i].RecId,name:this.props.AlarmNameList[i].AlarmName});
        }
        var date = new Date();
        date.setDate(date.getDate()-1);
        //table参数设置
        var onClickRow = function(e){};
        var onClickSort = function(e){};
        var onClickRefresh = function(e){
            var _from = e.from*e.currentPage - 1;
            var _to = e.numPerPage - e.from + 1;
            _this.props.get_alarm_log_list({
                data: {
                    from: _from,
                    to: _to,
                }
            });
        };
        var columns = [
            {
                title: '告警状态',
                field: 'alarmStatus',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '告警时间',
                field: 'alarmTime',
                halign: 'left',
                align: 'left',
                formatter: dateTimeFormatter,
                sortable: true
            }, {
                title: '告警名称',
                field: 'alarmName',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '告警设备',
                field: 'serverAddress',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '告警监测器',
                field: 'monitorName',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '邮件告警',
                field: 'alarmEmail',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '短信告警',
                field: 'alarmSMS',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '微信告警',
                field: 'alarmWechar',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '声音告警',
                field: 'alarmSound',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '脚本告警',
                field: 'alarmScript',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '监测器值',
                field: 'monitorValue',
                halign: 'left',
                align: 'left',
                sortable: true
        },];
        var change = (flag,value) =>{
            _this.setState({alarmNameId: value.id,});
        };
        return (
            <div id="alarmLog_desView" className='overviewDesViewDiv alarmRulesIssueView'>
                <div className="operationButtons">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            告警日志列表
                        </div>
                        <div className="titleRight">
                            <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                            <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-md-12">
                        <div className="buttonInfo">
                            <p>告警日志的功能：查看某一时间段告警日志。</p>
                            <button className="btn btnSave" id="search-btn" onClick={this._handleOnClickQuery}>查询</button>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className='operationCreateTableDiv col-md-12'>
                    <div className='table-basic col-md-12'>
                        <div className="table-basic-row col-md-12 no-bottom-border">
                            <div className="col-md-6">
                                <div className="table-basic-h1 col-md-6">告警设备</div>
                                <div className="table-basic-h1-input col-md-6">
                                    <input id="nameList-Dropdown_input" className='form-control dropdownStyle width5-full' type="text" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="table-basic-h1 col-md-6">告警名称</div>
                                <div className="table-basic-h1-input col-md-6">
                                <ReactWidgets.DropdownList id="deviceList-Dropdown" className='dropdownStyle' defaultValue={alarmName_list[0].id}
                                    valueField='id' textField='name' data={alarmName_list} caseSensitive={false} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="table-basic-h1 col-md-6">告警开始时间</div>
                                <div className="table-basic-h1-input col-md-6">
                                    <ReactWidgets.DateTimePicker id="alarmLog_startTime" className='dateTimePickerStyle full-width col-md-12' format={"yyyy-MM-dd HH:mm:ss"} defaultValue={date} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="table-basic-h1 col-md-6">告警结束时间</div>
                                <div className="table-basic-h1-input col-md-6">
                                    <ReactWidgets.DateTimePicker id="alarmLog_endTime" className='dateTimePickerStyle full-width col-md-12' format={"yyyy-MM-dd HH:mm:ss"} defaultValue={new Date()} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clearContentTabDiv"></div>
                    <div className="contentline col-md-12"/>
                    <widget.PaginationTable
                        state={this.state}
                        setState={this._setState}
                        initFrom={this.state.initFrom}
                        initNumPerPage={this.state.initNumPerPage}
                        initCurrentPage={this.state.initCurrentPage}
                        columns={columns}
                        list={this.props.AlarmLogList}
                        id={"alarmLogTable"}
                        count={this.props.AlarmLogCount}
                        onClickRow={onClickRow}
                        onClickSort={onClickSort}
                        onClickRefresh={onClickRefresh}
                        request={this._request}
                        requestBtnId={"search-btn"}
                        noTableTool={true} />
                </div>
            </div>
        );
    },
    _setState: function(data,callback){
        if(!data) return;
        if(callback) this.setState(data,callback);
        else this.setState(data);
    },
    _handleOnClickQuery: function(){
        var _this = this;
        var startTime = $("#alarmLog_startTime").find("input").val();
        var endTime = $("#alarmLog_endTime").find("input").val();
        var selectedAlarmDevice = $("#nameList-Dropdown_input").val();
        var selectedAlarmName = $("#deviceList-Dropdown").find(".rw-input").text();
        if(selectedAlarmDevice=="全部") selectedAlarmDevice = undefined;
        if(selectedAlarmName=="全部") selectedAlarmName = undefined;
        this.setState({
            origin_filter:{
                device: selectedAlarmDevice,
                name: selectedAlarmName,
                startTime: startTime,
                endTime: endTime,
            },
            from: 1,
            currentPage: 1,
        },function(){
            _this._request({
                range:{
                    from: parseInt(_this.state.initFrom,10),
                    to: parseInt(_this.state.numPerPage,10),
                }
            });
        });
    },
    _request: function(e){
        var filter = {};
        if(this.state.origin_filter){
            filter.startTime = this.state.origin_filter.startTime;
            filter.endTime = this.state.origin_filter.endTime;
            if(this.state.origin_filter.device) filter.device = this.state.origin_filter.device;
            if(this.state.origin_filter.name) filter.name = this.state.origin_filter.name;
        }
        if(e.range.from!=undefined) filter.from = e.range.from - 1;
        if(e.range.to!=undefined) filter.to = e.range.to - filter.from;
        if(this.state.sort_name!=undefined) filter.sort_name = this.state.sort_name;
        if(this.state.sort_order!=undefined) filter.sort_order = this.state.sort_order;
        this.props.get_alarm_log_page_data({
            data: filter,
            error: function(resp){
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "告警日志";
                    document.getElementById('publicMessageModalcontent').innerHTML = "查询失败";
                    $('#publicMessageModal').modal('show');
                },100);
            },
        });
    },
});
$(window).resize(function () {
    if(document.getElementById('alarmLog_desView') != null) {
        document.getElementById('alarmLog_desView').style.height = $(window).height() - 110 - 30 + 'px';
    }
    $('#alarmLog_desView').bootstrapTable('resetView');
});

module.exports = AlarmLog_desView;
