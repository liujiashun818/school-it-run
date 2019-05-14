/**
 * Created by Yuchen on 2016/03/09.
 * 告警规则主窗口
 */
var React = require('react');
var util = require('../../../../../utils/util.js');
require('bootstrap');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');

var AlarmRule_desView = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        var _this = this;
        if(document.getElementById('alarmRule_desView') != null) {
            document.getElementById('alarmRule_desView').style.height = $(window).height() - 110 - 30 + 'px';
        }
        this._initTable([]);
        this.props.get_alarm_rule_data({
            error: function(res){
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                    document.getElementById('publicMessageModalcontent').innerHTML = "获取告警规则列表失败";
                    $('#publicMessageModal').modal('show');
                },100);
            },
        });
    },
    componentDidUpdate: function() {
        var _this = this;
        var table = $('#alarmRuleTable');
        var data = this.props.alarmRuleList;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        this._initTable(data);
        table.bootstrapTable('refreshOptions', {data: data});
        //绑定列表行中的编辑和删除按钮事件
        DOMNode.find("[name='row-edit-btn'],[name='row-delete-btn']").unbind("click");
        DOMNode.find("[name='row-edit-btn']").click(function(e){
            e.stopPropagation();
            var B = $(e.target).parent();
            _this.props.set_alarm_rule_id({
                id: B.data("rule_id"),
            });
            _this.history.pushState(null,'equipmentManage/editAlarmRulePage');
        });
        DOMNode.find("[name='row-delete-btn']").click(function(e){
            e.stopPropagation();
            var B = $(e.target).parent();
            var RecId = B.data("rule_id");
            var C = confirm("确认要删除吗？");
            if(C){
                _this.props.delete_alarm_rules({
                    data: [{
                        RecId: RecId,
                    }],
                    callback: function(response){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                            document.getElementById('publicMessageModalcontent').innerHTML = "删除成功";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                    error: function(response){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                            document.getElementById('publicMessageModalcontent').innerHTML = "删除失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    }
                });
            }
        });
    },
    render: function() {
        var _this = this;
        var valid_edit = util.hasPermission(this.props.permissions,"/equipmentmanage/alarm/alarmrule/edit");
        var btn_create = valid_edit!=null?(<button id="btn-create" className="btn btnSave" style={{marginRight: '8px'}} onClick={this._handleOnClick}>新建告警规则</button>):"";
        var btn_delete = valid_edit!=null?(<button id="btn-delete" className="btn btnSave btnDelete" style={{marginRight: '8px'}} onClick={this._handleOnClick}>删除告警规则</button>):"";
        var btn_setAllow = valid_edit!=null?(<button id="btn-setAllow" className="btn btnSave" style={{marginRight: '8px'}} onClick={this._handleOnClick}>批量允许</button>):"";
        var btn_setNotAllow = valid_edit!=null?(<button id="btn-setNotAllow" className="btn btnSave" style={{marginRight: '8px'}} onClick={this._handleOnClick}>批量禁止</button>):"";
        return (
            <div id="alarmRule_desView" className='overviewDesViewDiv alarmRulesIssueView'>
                <div className="operationButtons">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            告警规则列表
                        </div>
                        <div className="titleRight">
                            <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                            <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-md-12">
                        <div className="buttonInfo">
                            <p>告警规则的功能：创建一个新的告警规则，包括告警信息、告警规则、告警动作。并可以查看、编辑、删除、禁止告警规则。</p>
                            {btn_create}
                            {btn_delete}
                            {btn_setAllow}
                            {btn_setNotAllow}
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div id="alarmRuleField" className='operationCreateTableDiv col-md-12'>
                    <table id="alarmRuleTable"
                           data-toggle='table'
                           data-classes='table table-no-bordered table-hover'
                           data-show-refresh='true'
                           data-show-toggle='true'
                           data-show-columns='true'
                           data-click-to-select='true'
                           data-resizable='true'>
                    </table>
                </div>
            </div>
        );
    },
    _handleOnClick: function(e){
        var _this = this;
        var $e = $(e.target);
        var id = $e.attr("id");
        switch(id){
            case "btn-create"://添加告警规则
                this.history.pushState(null,'equipmentManage/addAlarmRulePage');
            break;
            case "btn-delete"://删除多个告警规则
                var selections = $('#alarmRuleTable').bootstrapTable('getSelections');
                if(selections.length<=0) return;
                var C = confirm("确认要删除吗？");
                if(C){
                    _this.props.delete_alarm_rules({
                        data: selections,
                        callback: function(response){
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                                document.getElementById('publicMessageModalcontent').innerHTML = "删除成功";
                                $('#publicMessageModal').modal('show');
                            },100);
                        },
                        error: function(response){
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                                document.getElementById('publicMessageModalcontent').innerHTML = "删除失败";
                                $('#publicMessageModal').modal('show');
                            },100);
                        }
                    });
                }
            break;
            case "btn-setAllow"://允许多个告警规则
                var selections = $('#alarmRuleTable').bootstrapTable('getSelections');
                var data = [];
                for(var i in selections){
                    data.push({
                        RecId: selections[i].RecId,
                        AlarmStatus: selections[i].AlarmStatus,
                    });
                }
                _this.props.set_alarm_rule_states({
                    flag: true,
                    data: data,
                    callback: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                            document.getElementById('publicMessageModalcontent').innerHTML = "设置成功";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                    error: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                            document.getElementById('publicMessageModalcontent').innerHTML = "设置告警规则状态失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                });
            break;
            case "btn-setNotAllow"://禁止多个告警规则
                var selections = $('#alarmRuleTable').bootstrapTable('getSelections');
                var data = [];
                for(var i in selections){
                    data.push({
                        RecId: selections[i].RecId,
                        AlarmStatus: selections[i].AlarmStatus,
                    });
                }
                _this.props.set_alarm_rule_states({
                    flag: false,
                    data: data,
                    callback: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                            document.getElementById('publicMessageModalcontent').innerHTML = "设置成功";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                    error: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                            document.getElementById('publicMessageModalcontent').innerHTML = "设置告警规则状态失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                });
            break;
        }
    },
    _initTable: function(odata){
        var _this = this;
        var valid_edit = util.hasPermission(this.props.permissions,"/equipmentmanage/alarm/alarmrule/edit");
        var editFormatter = function(value, row) {
            return [
                '<div class="editRole-options" style="display:inline-block">',
                    '<a data-RULE_ID="'+row.RecId+'" class="editRole link" name="row-edit-btn" ><i class="fa fa-pencil-square-o"></i></a>',
                    '<a data-RULE_ID="'+row.RecId+'" class="deleteRole link" name="row-delete-btn" ><i class="fa fa-trash-o"></i></a>',
                '</div>'
            ].join('');
        }
        var stateFormatter = function(value, row) {
            var src = row.AlarmStatus?"./img/itoss/start.png":"./img/itoss/disable.png";
            return [
                "<span class='alarmRuleState' style='display:inline-block'>",
                    "<img src='"+src+"' />"+(row.AlarmStatus?"允许":"禁止"),
                "</span>",
            ].join('');
        }
        var columns = [
            {
                field: 'state',
                checkbox: true
            }, {
                title: '名称',
                field: 'AlarmName',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '告警级别',
                field: 'AlarmLevel',
                halign: 'left',
                align: 'left',
                sortable: true
            },{
                title: '允许/禁止',
                field: 'AlarmStatus',
                halign: 'left',
                align: 'left',
                formatter: stateFormatter,
                sortable: true
            },
        ]
        if(valid_edit!=null) columns.push({
            title: '编辑',
            halign: 'left',
            align: 'left',
            widht: '82px',
            formatter: editFormatter,
        });
        $('#alarmRuleTable').bootstrapTable('destroy');
        $('#alarmRuleTable').bootstrapTable({
            columns: columns,
            data: odata,
            onPostHeader: this._onLoadTableHeader,
            onToggle: function(cardview){
                var DOMNode = $(ReactDOM.findDOMNode(_this));
                //绑定列表行中的编辑和删除按钮事件
                DOMNode.find("[name='row-edit-btn'],[name='row-delete-btn']").unbind("click");
                DOMNode.find("[name='row-edit-btn']").click(function(e){
                    e.stopPropagation();
                    var B = $(e.target).parent();
                    _this.props.set_alarm_rule_id({id: B.data("rule_id"),});
                    _this.history.pushState(null,'equipmentManage/editAlarmRulePage');
                });
                DOMNode.find("[name='row-delete-btn']").click(function(e){
                    e.stopPropagation();
                    var B = $(e.target).parent();
                    var RecId = B.data("rule_id");
                    var C = confirm("确认要删除吗？");
                    if(C){
                        _this.props.delete_alarm_rules({
                            data: [{
                                RecId: RecId,
                            }],
                            callback: function(response){
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                                    document.getElementById('publicMessageModalcontent').innerHTML = "删除成功";
                                    $('#publicMessageModal').modal('show');
                                },100);
                            },
                            error: function(response){
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                                    document.getElementById('publicMessageModalcontent').innerHTML = "删除失败";
                                    $('#publicMessageModal').modal('show');
                                },100);
                            }
                        });
                    }
                });
            },
        });
    },
    _onLoadTableHeader: function(){
        var _this = this;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        var B = DOMNode.find('button[name="refresh"]');
        B.unbind("click");
        B.click(function(e){//按下刷新按钮
            _this.props.get_alarm_rule_data({
                error: function(resp){
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "告警规则";
                        document.getElementById('publicMessageModalcontent').innerHTML = "获取告警规则列表失败";
                        $('#publicMessageModal').modal('show');
                    },100);
                },
            });
        })
    },
});

$(window).resize(function () {
    if(document.getElementById('alarmRule_desView') != null) {
        document.getElementById('alarmRule_desView').style.height = $(window).height() - 110 - 30 + 'px';
    }
    $('#alarmRule_desView').bootstrapTable('resetView');
});

module.exports = AlarmRule_desView;
