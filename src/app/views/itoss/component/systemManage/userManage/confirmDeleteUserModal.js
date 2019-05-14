// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var base64 = require('../../../../../utils/base64');

var ConfirmDeleteUserModal = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_system:flux.store("YFTSystemStore").getState()
    //     }
    // },

    getInitialState: function() {
        return {
            bShowAdd: false,
            bShowDelete: false
        };
    },

    componentDidMount: function() {
        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        // var bShowAdd = false, bShowEdit = false, bShowDelete = false;
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/systemmanage/userlist/add") {
                // bShowAdd = true;
                this.setState({bShowAdd: true});
            }
            else if(permissionsValue[i].resourceType == "/systemmanage/userlist/delete") {
                // bShowDelete = true;
                this.setState({bShowDelete: true});
            }
        }
    },

    _handleOnClickConfirm: function() {
        const { selectedUser, users, delete_user, get_allUser, set_selectedUser, setUserInfoChangeFlag } = this.props;
        delete_user(selectedUser.LOGIN_ID);
        get_allUser();
        $('#userListTable').bootstrapTable('refreshOptions', {data: users});

        var _this = this;
        var refreshBtnObj= document.createElement('button');
        refreshBtnObj.setAttribute('class', 'btn btn-default');
        refreshBtnObj.setAttribute('type', 'button');
        refreshBtnObj.setAttribute('name', 'refresh');
        refreshBtnObj.setAttribute('title', '刷新');
        refreshBtnObj.onclick = function() {
            get_allUser();
            $('#userListTable').bootstrapTable('refreshOptions', {data: users});
            var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
            btnGroup.insertBefore(this, btnGroup.childNodes[0]);
            if(_this.state.bShowDelete) {
                btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
            }
            if(_this.state.bShowAdd) {
                btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
            }
        };
        refreshBtnObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';

        var deleteBtnObj= document.createElement('button');
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
                set_selectedUser({user:selections[0], flag:"delete"});
                $("#confirmDeleteUserModal").modal("show");
            }
        };
        deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';

        var addBtnObj= document.createElement('button');
        addBtnObj.setAttribute('class', 'btn btn-default');
        addBtnObj.setAttribute('type', 'button');
        addBtnObj.setAttribute('name', 'add');
        addBtnObj.setAttribute('title', '新建用户');
        addBtnObj.onclick = function() {
            set_selectedUser({user:null, flag:"add"});
            setUserInfoChangeFlag(true);
            _this.history.pushState(null,'systemManage/userAddPage');
        };
        addBtnObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';

        var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
        btnGroup.insertBefore(refreshBtnObj, btnGroup.childNodes[0]);
        if(_this.state.bShowDelete) {
            btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
        }
        if(_this.state.bShowAdd) {
            btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
        }
        $("#confirmDeleteUserModal").modal("hide");
    },

    render : function(){
        return (
            <div className="modal fade" id="confirmDeleteUserModal" tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteUserModalLabel" aria-hidden="true">
                <div className="modal-dialog fieldSettingModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">删除用户确认</h5>
                        </div>
                        <div className="modal-body">
                            是否确定删除用户：{this.props.selectedUser==null?"":this.props.selectedUser.LOGIN_ID}？
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickConfirm}>确定</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

ConfirmDeleteUserModal.propTypes = {
    users: PropTypes.array.isRequired,
    selectedUser: PropTypes.object,
    delete_user: PropTypes.func.isRequired,
    get_allUser: PropTypes.func.isRequired,
    set_selectedUser: PropTypes.func.isRequired
}

module.exports = ConfirmDeleteUserModal;
