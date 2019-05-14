/**
 * Created by Yuchen on 2016/03/15.
 * 模板设置-模板列表tab
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

var TempleteList = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        this._initTable([]);
    },
    componentDidUpdate: function() {
        var _this = this;
        var table = $('#TempleteList');
        var data = this.props.TempleteList;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        table.bootstrapTable('refreshOptions', {data: data});
        //绑定列表行中的编辑和删除按钮事件
        DOMNode.find("[name='row-edit-btn'],[name='row-delete-btn']").unbind("click");
        DOMNode.find("[name='row-edit-btn']").click(function(e){
            e.stopPropagation();
            var B = $(e.target).parent();
            var RecId = B.data("id");
            var tableData = table.bootstrapTable('getData');
            var templeteData = {};
            for(var i in tableData){
                if(tableData[i].RecId==RecId){
                    templeteData = tableData[i];
                }
            }
            _this.props.setState({
                modalType: 1,
            },function(){
                if(templeteData.ModleType=="email"){
                    $("#emailTemplete-title").val(templeteData.MailTitle);
                    $("#emailTemplete-content").val(templeteData.MailContent);
                    $("#emailTemplete-templeteTitle").val(templeteData.MailModle);
                    $("#emailTemplete-id").val(templeteData.RecId);
                    $("#emailTemplete").modal("show");
                }
                else if(templeteData.ModleType=="SMS"){
                    $("#smsTemplete-title").val(templeteData.MailTitle);
                    $("#smsTemplete-content").val(templeteData.MailContent);
                    $("#smsTemplete-templeteTitle").val(templeteData.MailModle);
                    $("#smsTemplete-id").val(templeteData.RecId);
                    $("#smsTemplete").modal("show");
                }
            });
        });
        DOMNode.find("[name='row-delete-btn']").click(function(e){
            e.stopPropagation();
            var B = $(e.target).parent();
            var RecId = B.data("id");
            var C = confirm("确认要删除吗？");
            if(C){
                _this.props.delete_templetes({
                    data: [{
                        RecId: RecId,
                    }],
                    callback: function(response){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                            document.getElementById('publicMessageModalcontent').innerHTML = "删除成功";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                    error: function(response){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                            document.getElementById('publicMessageModalcontent').innerHTML = "删除失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    }
                });
            }
        });
    },
    render: function() {
        return (
            <div id="TempleteListField" className='col-md-12'>
                <table id="TempleteList"
                       data-toggle='table'
                       data-classes='table table-no-bordered table-hover'
                       data-show-refresh='true'
                       data-show-toggle='true'
                       data-show-columns='true'
                       data-click-to-select='true'
                       data-resizable='true'>
                </table>
            </div>
        );
    },
    _initTable: function(odata){
        var _this = this;
        var valid_edit = util.hasPermission(this.props.Permissions,"/equipmentmanage/alarm/templateset/edit");
        var valid_delete = util.hasPermission(this.props.Permissions,"/equipmentmanage/alarm/templateset/delete");
        var editFormatter = function(value, row) {
            return [
                '<div class="editRole-options" style="display:inline-block">',
                    valid_edit!=null?('<a data-ID="'+row.RecId+'" class="editRole link" name="row-edit-btn" ><i class="fa fa-pencil-square-o"></i></a>'):"",
                    valid_delete!=null?('<a data-ID="'+row.RecId+'" class="deleteRole link" name="row-delete-btn" ><i class="fa fa-trash-o"></i></a>'):"",
                '</div>'
            ].join('');
        };
        var typeFormatter = function(value, row) {
            return [
                "<span class='alarmRuleState' style='display:inline-block'>",
                (row.ModleType=="email"?"Email":"短信"),
                "</span>",
            ].join('');
        };
        var columns = [
            {
                field: 'state',
                checkbox: true
            }, {
                title: '标题',
                field: 'MailTitle',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '模板标题',
                field: 'MailModle',
                halign: 'left',
                align: 'left',
                sortable: true
            },{
                title: '模板类型',
                field: 'ModleType',
                halign: 'left',
                align: 'left',
                formatter: typeFormatter,
                sortable: true
            }, {
                title: '编辑',
                halign: 'left',
                align: 'left',
                widht: '82px',
                formatter: editFormatter,
            },
        ];
        if(valid_edit==null&&valid_delete==null){//如果没有编辑权限，也没有删除权限
            columns = [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '标题',
                    field: 'MailTitle',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }, {
                    title: '模板标题',
                    field: 'MailModle',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                },{
                    title: '模板类型',
                    field: 'ModleType',
                    halign: 'left',
                    align: 'left',
                    formatter: typeFormatter,
                    sortable: true
                },
            ];
        };
        $('#TempleteList').bootstrapTable('destroy');
        $('#TempleteList').bootstrapTable({
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
                    var RecId = B.data("id");
                    var tableData = $('#TempleteList').bootstrapTable('getData');
                    var templeteData = {};
                    for(var i in tableData){
                        if(tableData[i].RecId==RecId){
                            templeteData = tableData[i];
                        }
                    }
                    _this.props.setState({
                        modalType: 1,
                    },function(){
                        if(templeteData.ModleType=="email"){
                            $("#emailTemplete-title").val(templeteData.MailTitle);
                            $("#emailTemplete-content").val(templeteData.MailContent);
                            $("#emailTemplete-templeteTitle").val(templeteData.MailModle);
                            $("#emailTemplete-id").val(templeteData.RecId);
                            $("#emailTemplete").modal("show");
                        }
                        else if(templeteData.ModleType=="SMS"){
                            $("#smsTemplete-title").val(templeteData.MailTitle);
                            $("#smsTemplete-content").val(templeteData.MailContent);
                            $("#smsTemplete-templeteTitle").val(templeteData.MailModle);
                            $("#smsTemplete-id").val(templeteData.RecId);
                            $("#smsTemplete").modal("show");
                        }
                    });
                });
                DOMNode.find("[name='row-delete-btn']").click(function(e){
                    e.stopPropagation();
                    var B = $(e.target).parent();
                    var RecId = B.data("id");
                    var C = confirm("确认要删除吗？");
                    if(C){
                        _this.props.delete_templetes({
                            data: [{
                                RecId: RecId,
                            }],
                            callback: function(response){
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                                    document.getElementById('publicMessageModalcontent').innerHTML = "删除成功";
                                    $('#publicMessageModal').modal('show');
                                },100);
                            },
                            error: function(response){
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "模板";
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
            _this.props.get_templete_list({
                error: function(resp){
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                        document.getElementById('publicMessageModalcontent').innerHTML = "获取模板列表失败";
                        $('#publicMessageModal').modal('show');
                    },100);
                },
            });
        })
    },
});

module.exports = TempleteList;
