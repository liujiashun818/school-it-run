/**
* Created by Yuchen  2016/01/22.
* 角色与权限管理-角色列表
*/

require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Store = require('./../../../../../server/store.js');
var base64 = require('./../../../../../utils/base64.js');
var util = require('./../../../../../utils/util.js');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;


var RoleListTable = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        var _this = this;
        var table = $('#roleListTable');
        var columns = [], editFormatter;
        //获取权限集合
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            this.props.set_permissions(temp);
        }
        var valid1 = util.hasPermission(temp,"/systemmanage/rolemanage/update");
        var valid2 = util.hasPermission(temp,"/systemmanage/rolemanage/delete");
        var curName = localStorage.getItem("CURRENT_ROLENAME");
        if(valid1==null&&valid2==null){//不可删除，不可编辑
            columns = [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '角色名称',
                    field: 'ROLE_NAME',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }, {
                    title: '角色描述',
                    field: 'ROLE_DESC',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }
            ]
        }
        else{
            if(valid1==null&&valid2!=null){//可删除不可编辑
                editFormatter = function(value, row) {
                    if(row.ROLE_NAME=="管理员"||row.ROLE_NAME==curName) return "";
                    return [
                        '<div class="editRole-options">',
                        '<a data-ROLE_NAME="'+row.ROLE_NAME+'" class="deleteRole"><i class="fa fa-trash-o"></i></a>',
                        '</div>'
                    ].join('');
                }
            }
            else if(valid1!=null&&valid2==null){//可编辑不可删除
                editFormatter = function(value, row) {
                    if(row.ROLE_NAME=="管理员"||row.ROLE_NAME==curName) return "";
                    return [
                        '<div class="editRole-options">',
                        '<a data-toggle="modal" data-target="#systemModal-editRole" data-ROLE_NAME="'+row.ROLE_NAME+'" data-ROLE_DESC="'+row.ROLE_DESC+'" class="editRole"><i class="fa fa-pencil-square-o"></i></a>',
                        '</div>'
                    ].join('');
                }
            }
            else{//可编辑，可删除
                editFormatter = function(value, row) {
                    if(row.ROLE_NAME=="管理员"||row.ROLE_NAME==curName) return "";
                    return [
                        '<div class="editRole-options">',
                        '<a data-toggle="modal" data-target="#systemModal-editRole" data-ROLE_NAME="'+row.ROLE_NAME+'" data-ROLE_DESC="'+row.ROLE_DESC+'" class="editRole"><i class="fa fa-pencil-square-o"></i></a>',
                        '<a data-ROLE_NAME="'+row.ROLE_NAME+'" class="deleteRole"><i class="fa fa-trash-o"></i></a>',
                        '</div>'
                    ].join('');
                }
            }
            columns = [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '角色名称',
                    field: 'ROLE_NAME',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }, {
                    title: '角色描述',
                    field: 'ROLE_DESC',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }, {
                    width: 80,
                    title: '编辑',
                    field: 'edit',
                    align: 'center',
                    formatter: editFormatter
                }
            ]
        }
        table.bootstrapTable({
            columns: columns,
            data: _this.props.Roles,
            onClickRow: _this._onClickRow,
            onPostHeader: this._onLoadTableHeader,
            exportDataType: "all"
        });
        $("#systemModal-editRole").on("show.bs.modal",function(e){
            var target = $(e.relatedTarget);
            var role_name = target.attr("data-ROLE_NAME");
            var role_desc = target.attr("data-ROLE_DESC");
            $("#edit_role").find("input").val(role_name);
            $("#edit_desc").find("input").val(role_desc);
            _this.props.set_edit_role_namedesc({
                name:role_name,
                desc:role_desc
            });
        });
        $("#systemModal-editRole").on("hidden.bs.modal",function(e){
            $("#edit_role").find("input").val("");
        });
    },
    componentDidUpdate: function(){
        var _this = this;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        var table = $('#roleListTable');
        table.bootstrapTable('refreshOptions',{data: _this.props.Roles});
        var valid = util.hasPermission(this.props.Permissions,"/systemmanage/rolemanage/delete");
        if(valid!=null){
            //设置批量删除角色的按钮
            var btnGroup = document.getElementById('roleListField').firstChild.firstChild.firstChild;
            var deleteButton = $(btnGroup).find("button[name='delete']");
            if(deleteButton.length==0){
                //添加delete按钮
                var deleteBtnObj= document.createElement('button');
                deleteBtnObj.setAttribute('class', 'btn btn-default');
                deleteBtnObj.setAttribute('type', 'button');
                deleteBtnObj.setAttribute('name', 'delete');
                deleteBtnObj.setAttribute('title', '删除');
                deleteBtnObj.onclick = function() {
                    var selections = $('#roleListTable').bootstrapTable('getSelections');
                    var CURRENT_ROLENAME = localStorage.getItem("CURRENT_ROLENAME");
                    var canDelete = true;
                    if(selections.length==0) return;
                    for(var i in selections){
                        if(selections[i].ROLE_NAME=="管理员"||selections[i].ROLE_NAME==CURRENT_ROLENAME){
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                                document.getElementById('publicMessageModalcontent').innerHTML = "无法删除管理员和登录用户本身角色";
                                $('#publicMessageModal').modal('show');
                            },100);
                            canDelete = false;
                            break;
                        }
                    }
                    if(!canDelete) return;
                    var C = confirm("确认要删除吗？");
                    if(C){
                        _this.props.delete_roles({
                            data: selections,
                            callback: function(response){
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                                    document.getElementById('publicMessageModalcontent').innerHTML = "删除成功";
                                    $('#publicMessageModal').modal('show');
                                },100);
                            },
                            error: function(response){
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                                    document.getElementById('publicMessageModalcontent').innerHTML = "删除失败";
                                    $('#publicMessageModal').modal('show');
                                },100);
                            }
                        });
                    }
                };
                deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';
                btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
            }
            //设置单个角色的删除按钮
            var B = DOMNode.find(".deleteRole");
            B.unbind("click");
            B.click(function(e){
                var role_name = $(this).attr("data-ROLE_NAME");
                var C = confirm("确认要删除吗？");
                if(C){
                    _this.props.delete_roles({
                        data: [{ROLE_NAME:role_name}],
                        callback: function(response){
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                                document.getElementById('publicMessageModalcontent').innerHTML = "删除成功";
                                $('#publicMessageModal').modal('show');
                            },100);
                        },
                        error: function(response){
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                                document.getElementById('publicMessageModalcontent').innerHTML = "删除失败";
                                $('#publicMessageModal').modal('show');
                            },100);
                        }
                    });
                }
            });
        }
        var data = table.bootstrapTable('getData');
        for(var i=0;i<data.length;i++){
            if(data[i].ROLE_NAME==this.props.clickRole){
                var tr = table.find("tbody tr").eq(i);
                table.find("tbody tr").removeClass("bg-grey");
                tr.addClass("bg-grey");
            }
        }
    },
    _onLoadTableHeader: function(){
        var _this = this;
        var B = $('#roleListView button[name="refresh"]');
        B.unbind("click");
        B.click(function(e){
            _this.props.get_roleManage_data();
        })
    },
    render:function() {
        return (
            <div id='roleListView' className='assetCreateTableDiv operationCreateTableDiv operationCreateTableDiv2 col-md-4' style={{padding:0,marginTop:0}}>
                <ul className="nav nav-tabs no-right-margin">
                    <li className="active"><a data-toggle="tab">角色列表</a></li>
                </ul>
                <fieldset id='roleListField' className="assetManageTable hardwareAssetTableBox">
                    <table id='roleListTable'
                           data-toggle='table'
                           data-search='true'
                           data-classes='table table-no-bordered table-hover'
                           data-show-refresh='true'
                           data-show-export="true"
                           data-show-toggle='true'
                           data-pagination='true'
                           data-page-size='25'
                           data-page-list='[10,25,50,100]'
                           data-resizable='true'>
                    </table>
                </fieldset>
            </div>
        );
    },
    _onClickRow: function(r,tr) {
        var table = $('#roleListTable');
        table.find("tbody tr").removeClass("bg-grey");
        tr.addClass("bg-grey");
        this.props.onClickRow(r);
    },
});

module.exports = RoleListTable;
