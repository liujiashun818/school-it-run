/**
 * Created by SHIN on 2015/12/11.
 * 资源监测-统一监控平台-监测器列表
 */
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');

var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

function statusFormatter(value, row) {
    var imgUrl = '';
    switch (row.status) {
        case 'good':
            imgUrl = 'img/itoss/entityok.png';
            break;
        case 'warning':
            imgUrl = 'img/itoss/entitywarning.png';
            break;
        case 'error':
            imgUrl = 'img/itoss/entityerror.png';
            break;
        case 'disabled':
            imgUrl = 'img/itoss/entitydisable.png';
            break;
        case 'nodata':
            imgUrl = 'img/itoss/entitynodata.png';
            break;
        default:
            imgUrl = 'img/itoss/entitynodata.png';
            break;
    }
    return [
        '<img src="' + imgUrl + '" width="15px" height="15px"/>'
    ].join('');
}

function editFormatter(value, row) {
    return [
        // '<img src="img/itoss/dataDictEdit.png" width="15px" height="15px"/>'
        '<div class="editRole-options" style="display:flex">',
            '<img class="edit" src="img/itoss/dataDictEdit.png" width="15px" height="15px" style="margin-right:5px"/>',
            '<img class="refresh" src="img/itoss/Refresh.png" width="15px" height="15px"/>',
        '</div>'
    ].join('');
}

// function refreshFormatter(value, row) {
//     return [
//         '<img src="img/itoss/Refresh.png" width="15px" height="15px"/>'
//     ].join('');
// }

function discribeFormatter(value, row) {
    return [
        '<span>' + value + '</span>'
    ].join('');
}

var _this;
window.monitorTableRowEvents = {
    'click .edit': function (e, value, row, index) {
        const { setGetMonitorsPropertyDataDoneFlag, setGetAlarmConditionDataDoneFlag, setGetMySqlMonitorCounterDataDoneFlag } = _this.props;
        setGetMonitorsPropertyDataDoneFlag(false);
        setGetAlarmConditionDataDoneFlag(false);
        _this.setState({particularType:""});
        if(row.type == "Mysql"){
            _this.setState({particularType:"Mysql"});
            setGetMySqlMonitorCounterDataDoneFlag(false);
        }
        _this.setState({bClickTableRowEdit:true});
    },
    'click .refresh': function (e, value, row, index) {
        const { setGetMonitorsPropertyDataDoneFlag, setGetAlarmConditionDataDoneFlag, setGetMySqlMonitorCounterDataDoneFlag } = _this.props;
        setGetMonitorsPropertyDataDoneFlag(false);
        setGetAlarmConditionDataDoneFlag(false);
        _this.setState({particularType:""});
        if(row.type == "Mysql"){
            _this.setState({particularType:"Mysql"});
            setGetMySqlMonitorCounterDataDoneFlag(false);
        }
        _this.setState({bClickTableRowRefresh:true});
    }
};

var bPreventOnCheck = false;
var DesViewTab1TableBox = React.createClass({
    mixins: [History],
    getInitialState: function () {
        _this = this;
        return {
            bClickTableRowEdit: false,
            bClickTableRowRefresh: false,
            particularType: ""
        }
    },

    componentDidMount: function() {
        const { monitorFilterStatus, monitorTableData, monitorTableSelectFirstFlag, onKeyUpQuickSearch } = this.props;
        switch (monitorFilterStatus) {
            case "all":
                document.getElementById('desViewMonitorTableFilter_all_btn').className = 'btn btn-default btnNoShadow btnAll active';
                document.getElementById('desViewMonitorTableFilter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('desViewMonitorTableFilter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('desViewMonitorTableFilter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('desViewMonitorTableFilter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "good":
                document.getElementById('desViewMonitorTableFilter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('desViewMonitorTableFilter_good_btn').className = 'btn btn-default btnNoShadow btnGood active';
                document.getElementById('desViewMonitorTableFilter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('desViewMonitorTableFilter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('desViewMonitorTableFilter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "warning":
                document.getElementById('desViewMonitorTableFilter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('desViewMonitorTableFilter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('desViewMonitorTableFilter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning active';
                document.getElementById('desViewMonitorTableFilter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('desViewMonitorTableFilter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "error":
                document.getElementById('desViewMonitorTableFilter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('desViewMonitorTableFilter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('desViewMonitorTableFilter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('desViewMonitorTableFilter_error_btn').className = 'btn btn-default btnNoShadow btnError active';
                document.getElementById('desViewMonitorTableFilter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable';
                break;
            case "disabled":
                document.getElementById('desViewMonitorTableFilter_all_btn').className = 'btn btn-default btnNoShadow btnAll';
                document.getElementById('desViewMonitorTableFilter_good_btn').className = 'btn btn-default btnNoShadow btnGood';
                document.getElementById('desViewMonitorTableFilter_warning_btn').className = 'btn btn-default btnNoShadow btnWarning';
                document.getElementById('desViewMonitorTableFilter_error_btn').className = 'btn btn-default btnNoShadow btnError';
                document.getElementById('desViewMonitorTableFilter_disable_btn').className = 'btn btn-default btnNoShadow btnDisable active';
                break;
        }

        var monitors = [];
        if(monitorFilterStatus == "all") {
            monitors = monitorTableData;
        }
        else {
            for(var i = 0; i < monitorTableData.length; i++) {
                if(monitorTableData[i].status == monitorFilterStatus) {
                    monitors.push(monitorTableData[i]);
                }
            }
        }
        $('#desViewMonitorTable').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    halign: 'center',
                    align: 'center',
                    radio: true
                }, {
                    title: '状态',
                    field: 'status',
                    width: 50,
                    halign: 'center',
                    align: 'center',
                    sortable: false,
                    formatter: statusFormatter
                }, {
                    width: 50,
                    halign: 'center',
                    align: 'center',
                    sortable: false,
                    formatter: editFormatter,
                    events: monitorTableRowEvents,
                }, {
                    title: '名称',
                    field: 'nameChar',
                    sortable: false
                }, {
                    title: '描述',
                    field: 'discribe',
                    sortable: false,
                    formatter: discribeFormatter
                }, {
                    title: '最后更新',
                    field: 'lastModify',
                    width: 160,
                    sortable: false
                }
            ],
            data: monitors,
            // singleSelect: 'true',
            onCheck: this._handleOnClickRow,
            rowAttributes:function(row,index){
              return {
                key: 'desViewMonitor'+index
              }
            }
        });

        if(monitorTableSelectFirstFlag && monitors.length>0) {
            bPreventOnCheck = true;
            $('#desViewMonitorTable').bootstrapTable('check', 0);
        }

        $('#desViewMonitorTable_quickSearchName').keyup(event => onKeyUpQuickSearch(event));
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        const { setGetMonitorsPropertyDataDoneFlag, setGetAlarmConditionDataDoneFlag, setGetMySqlMonitorCounterDataDoneFlag } = this.props;
        if (nextProps.getMonitorsPropertyDataDoneFlag && nextProps.getAlarmConditionDataDoneFlag
            && (!nextState.particularType || (nextState.particularType=="Mysql" && nextProps.getMySqlMonitorCounterDataDoneFlag))) {
            if(nextState.bClickTableRowEdit) {
                this.handleOnClickEditMonitor();
                this.setState({bClickTableRowEdit:false});
                setGetMonitorsPropertyDataDoneFlag(false);
                setGetAlarmConditionDataDoneFlag(false);
                setGetMySqlMonitorCounterDataDoneFlag(false);
            }
            else if(nextState.bClickTableRowRefresh) {
                this.handleOnClickRefreshMonitor();
                this.setState({bClickTableRowRefresh:false});
                setGetMonitorsPropertyDataDoneFlag(false);
                setGetAlarmConditionDataDoneFlag(false);
                setGetMySqlMonitorCounterDataDoneFlag(false);
            }
        }
        return true;
    },

    componentDidUpdate: function(){
        const { monitorFilterStatus, monitorTableData, monitorTableSelectFirstFlag } = this.props;
        var monitors = [];
        if(monitorFilterStatus == "all") {
            monitors = monitorTableData;
        }
        else {
            for(var i = 0; i < monitorTableData.length; i++) {
                if(monitorTableData[i].status == monitorFilterStatus) {
                    monitors.push(monitorTableData[i]);
                }
            }
        }
        $('#desViewMonitorTable').bootstrapTable('refreshOptions', {data: monitors});
        $('#desViewMonitorTable').bootstrapTable('resetView');
        if(monitorTableSelectFirstFlag && monitors.length>0) {
            bPreventOnCheck = true;
            $('#desViewMonitorTable').bootstrapTable('check', 0);
        }
    },

    _handleOnClickRow: function(row, element) {
        const { onClickRow, getMonitorsPropertyDataFromID, getAlarmConditionDataFromMonitorId, getMonitorsEntryAliasDataFromID } = this.props;
        if(!bPreventOnCheck) {
            onClickRow(row);
            var filter ={
              monitorId:row.id,
              monitorType:row.type
            };
            getMonitorsPropertyDataFromID(filter);//获取当前选择的监测器属性数据
            getAlarmConditionDataFromMonitorId(row.id);//获取当前选择的监测器报警条件数据
            getMonitorsEntryAliasDataFromID(filter);

        }
        else {
            bPreventOnCheck = false;
        }
    },

    handleOnClickEditMonitor: function (e) {
      //设置监测器属性编辑状态，true 是编辑监测器 false 是增加监测器
      this.props.setMonitorsPropertyEdit(true);
      this.history.pushState(null,'equipmentManage/createMonitorPage');
    },

    handleOnClickRefreshMonitor: function (e) {

    },

    handleOnClickDeleteMonitor: function (e) {

    },

    handleOnClickStartMonitor: function (e) {

    },

    handleOnClickDisableMonitor: function (e) {

    },

    render: function() {
        const { monitorsStatus, onClickTableFilterStatus } = this.props;
        return (
            <div className='desViewMonitorTableBox equipmentManageTable'>
                <div className="monitorTableHead">
                    <label style={{fontSize:"18px"}}>监测器列表</label>
                    <div className="btn-group pull-right" role="group">
                        <input id="desViewMonitorTable_quickSearchName" type="text" className="pull-left quickSearchName" placeholder="名称过滤文本"/>
                        <button type="button" className="btn btn-default btnNoShadow" title="添加监测器" data-toggle="modal" data-target="#createMonitorModal"><img src="img/itoss/addmonitor.png" className="statusImg"/>&nbsp;添加</button>
                        <button type="button" className="btn btn-default btnNoShadow" title="编辑监测器" onClick={this.handleOnClickEditMonitor}><img src="img/itoss/dataDictEdit.png" className="statusImg"/>&nbsp;编辑</button>
                        <button type="button" className="btn btn-default btnNoShadow" title="刷新监测器" onClick={this.handleOnClickRefreshMonitor}><img src="img/itoss/Refresh.png" className="statusImg"/>&nbsp;刷新</button>
                        <button type="button" className="btn btn-default btnNoShadow" title="删除监测器" onClick={this.handleOnClickDeleteMonitor}><img src="img/itoss/dataDictDelete.png" className="statusImg"/>&nbsp;删除</button>
                        <button type="button" className="btn btn-default btnNoShadow" title="启动监测器" onClick={this.handleOnClickStartMonitor}><img src="img/itoss/start.png" className="statusImg"/>&nbsp;启动</button>
                        <button type="button" className="btn btn-default btnNoShadow marginRight_5" title="禁止监测器" onClick={this.handleOnClickDisableMonitor}><img src="img/itoss/monitordisable.png" className="statusImg"/>&nbsp;禁止</button>

                        <button id="desViewMonitorTableFilter_all_btn" type="button" className="btn btn-default btnNoShadow btnAll" title="监测器数量" onClick={onClickTableFilterStatus}><img src="img/itoss/monitor.png" className="statusImg"/>&nbsp;监测器({monitorsStatus[0]})</button>
                        <button id="desViewMonitorTableFilter_good_btn" type="button" className="btn btn-default btnNoShadow btnGood" title="正常监测器数" onClick={onClickTableFilterStatus}><img src="img/itoss/monitorgood.png" className="statusImg"/>&nbsp;正常({monitorsStatus[1]})</button>
                        <button id="desViewMonitorTableFilter_warning_btn" type="button" className="btn btn-default btnNoShadow btnWarning" title="危险监测器数" onClick={onClickTableFilterStatus}><img src="img/itoss/monitorwarning.png" className="statusImg"/>&nbsp;危险({monitorsStatus[2]})</button>
                        <button id="desViewMonitorTableFilter_error_btn" type="button" className="btn btn-default btnNoShadow btnError" title="错误监测器数" onClick={onClickTableFilterStatus}><img src="img/itoss/monitorerror.png" className="statusImg"/>&nbsp;错误({monitorsStatus[3]})</button>
                        <button id="desViewMonitorTableFilter_disable_btn" type="button" className="btn btn-default btnNoShadow btnDisable" title="禁止监测器数" onClick={onClickTableFilterStatus}><img src="img/itoss/monitordisable.png" className="statusImg"/>&nbsp;禁止({monitorsStatus[4]})</button>
                    </div>
                </div>
                <table id='desViewMonitorTable'
                       data-toggle='table'
                       data-classes='table table-no-bordered table-hover'
                       data-show-refresh='false'
                       data-show-toggle='false'
                       data-show-columns='false'
                       data-click-to-select='true'
                       data-resizable='true'>
                </table>
            </div>
        );
    }
});

DesViewTab1TableBox.propTypes = {
    monitorFilterStatus: PropTypes.string.isRequired,
    monitorTableData: PropTypes.array.isRequired,
    monitorTableSelectFirstFlag: PropTypes.bool.isRequired,
    monitorsStatus: PropTypes.array.isRequired,
    onClickRow: PropTypes.func.isRequired,
    onKeyUpQuickSearch: PropTypes.func.isRequired,
    onClickTableFilterStatus: PropTypes.func.isRequired
};

module.exports = DesViewTab1TableBox;
