/**
* Created by Yuchen  2016/01/25.
* 角色与权限管理-编辑角色模态框
*/

require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var ReactWidgets = require('react-widgets');

var RoleManageEditModal = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        if($('#systemModal-editRole') != null) {
            var height = $(window).height() - 110 - 30 + 'px';
            $('#systemModal-editRole').css("height",height);
        }
        $("#edit_role").mouseover(function(){
            $(this).find(".alert-block").hide();
        })
    },
    render:function(){
        return (
            <div className="modal fade" id="systemModal-editRole" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog assetModalDialog" style={{height:433,width:650}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            编辑角色
                        </div>
                        <div className="modal-body" style={{height:360}}>
                            <div className='row createGroupDetailDiv createGroupDetailDiv2'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>角色名称</td>
                                            <td id="edit_role" data-old-role-name={this.props.EditRoleName} >
                                                <div className="alert-block" id="alert-edit-emptyRoleName">角色名称不能为空</div>
                                                <div className="alert-block" id="alert-edit-dupRoleName">角色名称已存在</div>
                                                <div className="alert-block" id="alert-numerical">角色名只能由字母、数字、下划线和中文组成，且必须以字母、下划线或中文字符开头</div>
                                                <input type="text" defaultValue={this.props.EditRoleName} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>角色描述</td>
                                            <td id="edit_desc">
                                                <input type="text" defaultValue={this.props.EditRoleDesc} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" onClick={this._handleOnClickOK}>保存</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _handleOnClickOK: function(e){
        var valid = true, dup = false;;
        var role = $("#edit_role").find("input").val();
        var desc = $("#edit_desc").find("input").val();
        var old_role = $("#edit_role").attr("data-old-role-name");
        var reg = /^[a-zA-Z\u4e00-\u9fa5_][a-zA-Z0-9\u4e00-\u9fa5_]*$/;
        for(var i in this.props.Roles){
            if(this.props.Roles[i].ROLE_NAME==role){
                dup = true;
                break;
            }
        }
        if(role===old_role) dup = false;
        if(role.length==0){
            valid = false;
            $("#edit_role").find("#alert-edit-emptyRoleName").show();
        }
        else if(!reg.test(role)){
            valid = false;
            $("#edit_role").find("#alert-numerical").show();
        }
        else if(dup){
            valid = false;
            $("#edit_role").find("#alert-edit-dupRoleName").show();
        }
        if(valid){
            var target = $(e.target);
            target.text("保存中");
            target.attr("disabled","disabled");
            this.props.edit_role({
                data: {
                    role: role,
                    old_role: old_role,
                    desc: desc
                },
                callback: function(response){
                    target.text("保存");
                    target.removeAttr("disabled");
                    $("#edit_role").find("input").val("");
                    $("#systemModal-editRole").modal('hide');
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                        document.getElementById('publicMessageModalcontent').innerHTML = "修改成功";
                        $('#publicMessageModal').modal('show');
                    },100);
                },
                error: function(response){
                    target.text("保存");
                    target.removeAttr("disabled");
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                        document.getElementById('publicMessageModalcontent').innerHTML = "修改失败";
                        $('#publicMessageModal').modal('show');
                    },100);
                }
            });
        }
    },
});

$(window).resize(function () {
    if($('#systemModal-editRole') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
        $('#systemModal-editRole').css("height",height);
    }
});

module.exports = RoleManageEditModal;
