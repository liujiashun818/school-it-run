require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var base64 = require('../../../../../utils/base64');
var UserListView_desView_static = require('./userListView_desView_static');

function roleFormatter(value, row) {
    var roles = eval(value);
    var strRoles = "";
    if(roles != null) {
        for(var i = 0; i < roles.length; i++) {
            strRoles += (strRoles.length==0?"":",") + roles[i].name;
        }
    }
    return strRoles;
}

function editFormatter(value, row) {
    return [
        '<a class="editUser" href="javascript:void(0)"><i class="fa fa-pencil-square-o"></i></a>'
    ].join('');
}

var _this;
window.operateUserEvents = {
    'click .editUser': function (e, value, row, index) {
        const { set_selectedUser, setUserInfoChangeFlag, get_userOrganization } = _this.props;
        if(row.LOGIN_ID == "admin") {
            // alert("不能编辑管理员admin用户");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "不能编辑管理员admin用户"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        else if(row.LOGIN_ID == localStorage.getItem("localUserName")) {
            // alert("不能编辑当前登陆用户");
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "不能编辑当前登陆用户"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }
        set_selectedUser({user:row, flag:"edit"});
        setUserInfoChangeFlag(false);
        get_userOrganization([{key:"LOGIN_ID", value:row.LOGIN_ID}]);
        _this.history.pushState(null,'systemManage/userAddPage');
    },
};

var bShowAdd = false, bShowEdit = false, bShowDelete = false;
var refreshBtnObj, deleteBtnObj, addBtnObj;
var UserListView_desView = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     itoss_system:flux.store("YFTSystemStore").getState()
    //   }
    // },

    getInitialState: function () {
        _this = this;
        return {
            userNum: 0
        }
    },

    componentDidMount: function() {
        if(document.getElementById('userListView_desView') != null) {
            document.getElementById('userListView_desView').style.height = $(window).height() - 110 - 30 + 'px';
        }

        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        // var bShowAdd = false, bShowEdit = false, bShowDelete = false;
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/systemmanage/userlist/add") {
                bShowAdd = true;
            }
            else if(permissionsValue[i].resourceType == "/systemmanage/userlist/update") {
                bShowEdit = true;
            }
            else if(permissionsValue[i].resourceType == "/systemmanage/userlist/delete") {
                bShowDelete = true;
            }
        }

        var tableColumns = [
            {
                field: 'state',
                radio: true
            }, {
                title: '用户名',
                field: 'LOGIN_ID',
                sortable: true
            }, {
                title: '姓名',
                field: 'USER_NAME',
                sortable: true
            }, {
                title: '组织机构',
                field: 'ORANIZATION_NAME',
                sortable: true
            }, {
                title: '角色名称',
                field: 'ROLE_NAME',
                formatter: roleFormatter,
                sortable: true
            }
        ];
        if(bShowEdit) {
            tableColumns.push(
                {
                    title: '编辑',
                    events: operateUserEvents,
                    formatter: editFormatter
                }
            );
        }
        $('#userListTable').bootstrapTable({
            columns: tableColumns,
            // data: this.getFlux().store("YFTSystemStore").getState().Users,
            data: [],
            onDblClickRow: this.showUserInfo,
            singleSelect: 'true'
        });

        var _this = this;
        refreshBtnObj= document.createElement('button');
        refreshBtnObj.setAttribute('class', 'btn btn-default');
        refreshBtnObj.setAttribute('type', 'button');
        refreshBtnObj.setAttribute('name', 'refresh');
        refreshBtnObj.setAttribute('title', '刷新');
        refreshBtnObj.onclick = function() {
            _this.props.get_allUser();
            // $('#userListTable').bootstrapTable('refreshOptions', {data: _this.getFlux().store("YFTSystemStore").getState().Users});
            // var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
            // btnGroup.insertBefore(this, btnGroup.childNodes[0]);
            // if(bShowDelete) {
            //     btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
            // }
            // if(bShowAdd) {
            //     btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
            // }
        };
        refreshBtnObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';

        deleteBtnObj= document.createElement('button');
        deleteBtnObj.setAttribute('class', 'btn btn-default');
        deleteBtnObj.setAttribute('type', 'button');
        deleteBtnObj.setAttribute('name', 'delete');
        deleteBtnObj.setAttribute('title', '删除用户');
        deleteBtnObj.onclick = function() {
            var selections = $('#userListTable').bootstrapTable('getSelections');
            if(selections.length != 0) {
                if(selections[0].LOGIN_ID == "admin") {
                    alert("不能删除管理员admin用户");
                    return false;
                }
                _this.props.set_selectedUser({user:selections[0], flag:"delete"});
                $("#confirmDeleteUserModal").modal("show");
            }
        };
        deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';

        addBtnObj= document.createElement('button');
        addBtnObj.setAttribute('class', 'btn btn-default');
        addBtnObj.setAttribute('type', 'button');
        addBtnObj.setAttribute('name', 'add');
        addBtnObj.setAttribute('title', '新建用户');
        addBtnObj.onclick = function() {
            _this.props.set_selectedUser({user:null, flag:"add"});
            _this.props.setUserInfoChangeFlag(true);
            _this.history.pushState(null,'systemManage/userAddPage');
        };
        addBtnObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';

        var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
        btnGroup.insertBefore(refreshBtnObj, btnGroup.childNodes[0]);
        if(bShowDelete) {
            btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
        }
        if(bShowAdd) {
            btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
        }

        this.setState({userNum: $('#userListTable').bootstrapTable('getData').length});
        $('#userListTable').on('reset-view.bs.table', function () {
            _this.setState({userNum: $('#userListTable').bootstrapTable('getData').length});
        });
    },

    shouldComponentUpdate: function(nextProps, nextState){
      if (nextProps.users !== this.props.users) {
        $('#userListTable').bootstrapTable('refreshOptions', {data: nextProps.users});
        var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
        btnGroup.insertBefore(refreshBtnObj, btnGroup.childNodes[0]);
        if(bShowDelete) {
            btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
        }
        if(bShowAdd) {
            btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
        }
      }
      return true;
    },

    showUserInfo: function(row, element){
        const { set_selectedUser, setUserInfoChangeFlag, get_userOrganization } = this.props;
        set_selectedUser({user:row, flag:"show"});
        setUserInfoChangeFlag(false);
        get_userOrganization([{key:"LOGIN_ID", value:row.LOGIN_ID}]);
        this.history.pushState(null,'systemManage/userAddPage');
    },

    render:function(){
        return (
            <div id='userListView_desView' className='overviewDesViewDiv userListView_desView'>
                <UserListView_desView_static />
                <div className='operationCreateTableDiv col-md-12'>
                    <div id='userListTable_toolbar'>
                        <div id='toolbar-form' role='form'>
                            <div style={{marginLeft: "10px"}}>
                                <span>用户数：{this.state.userNum}&nbsp;&nbsp;<span style={{"color":"#FF0000"}}>（双击查看用户信息）</span></span>
                            </div>
                        </div>
                    </div>
                    <table id='userListTable'
                           data-toggle='table'
                           data-search='true'
                           data-classes='table table-no-bordered table-striped table-hover'
                           data-toolbar='#userListTable_toolbar'
                           data-resizable='true'
                           data-show-refresh='false'
                           data-show-toggle='true'
                           data-show-columns='true'
                           data-click-to-select='true'>
                    </table>
                </div>
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('userListView_desView') != null) {
        document.getElementById('userListView_desView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

UserListView_desView.propTypes = {
    users: PropTypes.array.isRequired,
    set_selectedUser: PropTypes.func.isRequired,
    setUserInfoChangeFlag: PropTypes.func.isRequired,
    get_userOrganization: PropTypes.func.isRequired,
    get_allUser: PropTypes.func.isRequired
}

module.exports = UserListView_desView;
