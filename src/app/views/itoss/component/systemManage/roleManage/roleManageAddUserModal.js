/**
* Created by Yuchen  2016/01/31.
* 角色与权限管理-（为角色）添加用户模态框
*/

require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var ReactWidgets = require('react-widgets');

var RoleManageAddUserModal = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        if($('#systemModal-addUser') != null) {
            var height = $(window).height() + 'px';
            $('#systemModal-addUser').css("height",height);
        }
        var _this = this;
        var table = $('#addUserListTable');
        table.bootstrapTable({
            columns: [
                {
                    field: 'state',
                    checkbox: true
                },
                {
                    title: '用户登录名称',
                    field: 'id',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },
                {
                    title: '用户姓名',
                    field: 'name',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },
            ],
            data: _this.props.NotRoleUsers,
        });
        $('#systemModal-addUser').on('show.bs.modal', function(e){
            if(!_this.props.clickRole) return;
            _this.props.get_not_role_users({
                data: _this.props.clickRole,
                callback: function(response){
                    var table = $('#addUserListTable');
                    table.bootstrapTable("refreshOptions",{data: response.notRoleUsers});
                },
                error: function(response){
                    console.log(response);
                }
            });
        })
    },
    render:function(){
        var change = (value) =>{
            this.setState({
                group: value.ORANIZATION_NAME
            });
        };
        return (
            <div className="modal fade" id="systemModal-addUser" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog assetModalDialog" style={{height:620,width:"50%"}} >
                    <div className="modal-content">
                        <div className="modal-header">
                            选择需要添加的用户
                        </div>
                        <div className="modal-body" style={{height:547}}>
                            <table id='addUserListTable'
                                   data-toggle='table'
                                   data-search='true'
                                   data-classes='table table-no-bordered table-hover'
                                   data-pagination='true'
                                   data-page-size='10'
                                   data-page-list='[10,25,50]'
                                   data-resizable='true'
                                   data-click-to-select='true'
                                   >
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" onClick={this._handleOnClickOK}>确定</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _handleOnClickOK: function(e){
        var selections = $('#addUserListTable').bootstrapTable('getSelections');
        var data = {
            roleName: this.props.clickRole,
            selections: selections,
        }
        this.props.create_userRoles({
            data: data,
            callback: function(response){
                $('#systemModal-addUser').modal("hide");
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                    document.getElementById('publicMessageModalcontent').innerHTML = "用户添加成功";
                    $('#publicMessageModal').modal('show');
                },100);
            },
            error: function(response){
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                    document.getElementById('publicMessageModalcontent').innerHTML = "用户添加失败";
                    $('#publicMessageModal').modal('show');
                },100);
            }
        });
    },
});

$(window).resize(function () {
    if($('#systemModal-addUser') != null) {
        var height = $(window).height() + 'px';
        $('#systemModal-addUser').css("height",height);
    }
});

module.exports = RoleManageAddUserModal;
