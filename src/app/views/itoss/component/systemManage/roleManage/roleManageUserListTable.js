/**
* Created by Yuchen  2016/01/22.
* 角色与权限管理-用户列表
*/

require('bootstrap');
var React = require('react');
var Store = require('./../../../../../server/store.js');
var util = require('./../../../../../utils/util.js');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var AddUserTable = require('./roleManageAddUserModal.js');
var Permissions = require('./roleManageUserPermission.js');

var UserListTable = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        var _this = this;
        var table = $('#userListTable');
        table.bootstrapTable({
            columns: [
                {
                    field: 'state',
                    checkbox: true
                },
                {
                    title: '用户登录名称',
                    field: 'LOGIN_ID',
                    halign: 'left',
                    align: 'left',
                    width: '20%',
                    sortable: true
                },
                {
                    title: '用户姓名',
                    field: 'USER_NAME',
                    halign: 'left',
                    align: 'left',
                    width: '20%',
                    sortable: true
                },
                {
                    title: '部门',
                    field: 'DEPARTMENT',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                },
            ],
            data: _this.props.Users,
            onPostHeader: this._onLoadTableHeader,
            exportDataType: "all"
        });
    },
    _onLoadTableHeader: function(){
        var _this = this;
        var B = $('#userListView button[name="refresh"]');
        B.unbind("click");
        B.click(function(e){
            _this.props.get_roleManage_data();
        })
    },
    componentDidUpdate: function(){
        var _this = this;
        var table = $('#userListTable');
        //过滤用户
        var organization_name = Store.get("GROUP_NAME");
        var users = this.props.Users;
        for(var i in users){
            if(organization_name!="Administrators"&&users[i].ORANIZATION_NAME!=organization_name){
                users[i].SHOW = false;
            }
            else{
                var roles = eval(users[i].ROLE_NAME);
                var show = false;
                for(var j in roles){
                    if(roles[j].name==this.props.clickRole){
                        show = true;
                        break;
                    }
                }
                users[i].SHOW = show;
            }
        }
        table.bootstrapTable('refreshOptions',{data: (this.props.clickRole==null?[]:users)});
        table.bootstrapTable('filterBy',{SHOW: true});
        var valid = util.hasPermission(this.props.Permissions,"/systemmanage/rolemanage/update");
        var curName = localStorage.getItem("CURRENT_ROLENAME");
        var clickRoleValid = true;
        if(this.props.clickRole==null||this.props.clickRole=="管理员"||this.props.clickRole==curName) clickRoleValid = false;
        var btnGroup = document.getElementById('userListField').firstChild.firstChild.firstChild.firstChild.firstChild;
        if(valid!=null&&clickRoleValid){
            //设置批量移除用户的按钮
            var deleteButton = $(btnGroup).find("button[name='delete']");
            if(deleteButton.length==0){
                //添加delete按钮
                var deleteBtnObj= document.createElement('button');
                deleteBtnObj.setAttribute('class', 'btn btn-default');
                deleteBtnObj.setAttribute('type', 'button');
                deleteBtnObj.setAttribute('name', 'delete');
                deleteBtnObj.setAttribute('title', '删除');
                deleteBtnObj.onclick = function() {//将多个用户从角色删除
                    var selections = $('#userListTable').bootstrapTable('getSelections');
                    var data = {
                        selections: selections,
                        roleName: _this.props.clickRole
                    }
                    if(selections.length==0) return;
                    _this.props.remove_users_from_role({
                        data: data,
                        callback: function(response){
                            var resp = response.result.d.results[0];
                            var fail_users = eval(resp.FAIL_USERS);
                            var fail_users_array1 = [];
                            var fail_users_array0 = [];
                            for(var i in fail_users){
                                if(fail_users[i].flag=="1") fail_users_array1.push(fail_users[i].loginId);
                                if(fail_users[i].flag=="0") fail_users_array0.push(fail_users[i].loginId);
                            }
                            if(resp.OUT_FLAG=="false"){
                                var errMsg = "";
                                if(fail_users_array1.length>0){
                                    errMsg += "以下用户只有一个角色，因此无法删除:\n";
                                    errMsg += fail_users_array1.join("\n");
                                    errMsg += "\n";
                                }
                                if(fail_users_array0.length>0){
                                    errMsg += "以下用户因系统异常删除失败:\n";
                                    errMsg += fail_users_array0.join("\n");
                                }
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                                    document.getElementById('publicMessageModalcontent').innerHTML = errMsg;
                                    $('#publicMessageModal').modal('show');
                                },100);
                            }
                            else{
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                                    document.getElementById('publicMessageModalcontent').innerHTML = "用户移除成功";
                                    $('#publicMessageModal').modal('show');
                                },100);
                            }
                        },
                        error: function(response){
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                                document.getElementById('publicMessageModalcontent').innerHTML = "用户移除失败";
                                $('#publicMessageModal').modal('show');
                            },100);
                        }
                    });
                };
                deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';
                btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
            }
            //设置添加用户的按钮
            var addButton = $(btnGroup).find("button[name='add']");
            if(addButton.length==0){
                //添加add按钮
                var addBtnObj= document.createElement('button');
                addBtnObj.setAttribute('class', 'btn btn-default');
                addBtnObj.setAttribute('type', 'button');
                addBtnObj.setAttribute('name', 'add');
                addBtnObj.setAttribute('title', '添加');
                addBtnObj.onclick = function() {//添加多个用户到角色
                    if(_this.props.clickRole!=null) $('#systemModal-addUser').modal('show');
                    else{
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                            document.getElementById('publicMessageModalcontent').innerHTML = "请选择一个角色";
                            $('#publicMessageModal').modal('show');
                        },100);
                    }
                };
                addBtnObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';
                btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
            }
        }
        if(!clickRoleValid){
            $(btnGroup).find("button[name='delete']").remove();
            $(btnGroup).find("button[name='add']").remove();
        }
    },
    render: function(){
        return (
            <div id='userListView' className='assetCreateTableDiv operationCreateTableDiv operationCreateTableDiv2 col-md-8' style={{padding:0,marginTop:0}}>
                <AddUserTable
                    clickRole={this.props.clickRole}
                    NotRoleUsers={this.props.NotRoleUsers}
                    create_userRoles={this.props.create_userRoles}
                    get_not_role_users={this.props.get_not_role_users} />
                <ul className="nav nav-tabs no-right-margin">
                    <li className="active"><a data-toggle="tab" href="#tab_1">角色对应用户列表</a></li>
                    <li><a data-toggle="tab" href="#tab_2">角色权限</a></li>
                </ul>
                <fieldset id="userListField" className="assetManageTable hardwareAssetTableBox">
                  <div className="contentDiv tab-content marginleft_none">
                    <div className="tab-pane active" id="tab_1">
                      <table id='userListTable'
                        data-toggle='table'
                        data-search='true'
                        data-classes='table table-no-bordered table-hover'
                        data-show-refresh='true'
                        data-show-export="true"
                        data-show-toggle='true'
                        data-click-to-select='true'
                        data-pagination='true'
                        data-page-size='25'
                        data-page-list='[10,25,50,100]'
                        data-resizable='true'>
                      </table>
                    </div>
                    <div className="tab-pane" id="tab_2">
                      <Permissions
                        clickRole={this.props.clickRole}
                        setState={this.props.setState}
                        expand={this.props.expand}
                        Permissions={this.props.Permissions}
                        setPermissionTree={this.props.setPermissionTree}
                        setPermissionTreeData={this.props.setPermissionTreeData}

                        permissionTreeData={this.props.permissionTreeData}
                        curRoleName={this.props.curRoleName}
                        initPermissionTree={this.props.initPermissionTree}
                        get_permissionTreeData={this.props.get_permissionTreeData}
                        save_permissionTree={this.props.save_permissionTree}
                        set_permissionTreeData={this.props.set_permissionTreeData} />
                    </div>
                </div>
                </fieldset>
            </div>
        );
    },
});

module.exports = UserListTable;
