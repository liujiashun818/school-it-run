/**
* Created by Yuchen  2016/01/21.
* 角色与权限管理-新建角色模态框
*/

require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var ReactWidgets = require('react-widgets');

var OrganizationInput = React.createClass({
    render() {
        return (
            <span>
                <span>{this.props.item.name}</span>
            </span>
        );
    }
});

var RoleManageCreateModal = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return {
            group: "",
        }
    },
    componentDidMount: function() {
        var _this = this;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        if($('#systemModal-createRole') != null) {
            var height = $(window).height() - 110 - 30 + 'px';
            $('#systemModal-createRole').css("height",height);
        }
        $("#group,#role").mouseover(function(){
            $(this).find(".alert-block").hide();
        })
        DOMNode.on('hidden.bs.modal', function(e){
            $(this).find("#role input").val("");
            $(this).find("#desc input").val("");
            _this.setState({
                group: "",
            })
        })
    },
    render:function(){
        var change = (value) =>{
            this.setState({
                group: value
            });
        };
        return (
            <div className="modal fade" id="systemModal-createRole" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog assetModalDialog" style={{height:433,width:650}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            创建新角色
                        </div>
                        <div className="modal-body" style={{height:360}}>
                            <div className='row createGroupDetailDiv createGroupDetailDiv2'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>组织机构</td>
                                            <td id="group">
                                                <div className="alert-block">组织机构不能为空</div>
                                                <ReactWidgets.DropdownList data={this.props.Groups} textField='ORANIZATION_NAME' value={this.state.group}
                                                    valueField='ORANIZATION_ID' onChange={change} caseSensitive={false} filter='contains'/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>角色名称</td>
                                            <td id="role">
                                                <div className="alert-block" id="alert-emptyRoleName">角色名称不能为空</div>
                                                <div className="alert-block" id="alert-dupRoleName">角色名称已存在</div>
                                                <div className="alert-block" id="alert-numerical">角色名只能由字母、数字、下划线和中文组成，且必须以字母、下划线或中文字符开头</div>
                                                <input type="text"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>角色描述</td>
                                            <td id="desc">
                                                <input type="text"/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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
        var valid = true, dup = false;
        var role = $("#role").find("input").val();
        var desc = $("#desc").find("input").val();
        var group = this.state.group;
        var reg = /^[a-zA-Z\u4e00-\u9fa5_][a-zA-Z0-9\u4e00-\u9fa5_]*$/;
        for(var i in this.props.Roles){
            if(this.props.Roles[i].ROLE_NAME==role){
                dup = true;
                break;
            }
        }
        if(group.length==0){
            valid = false;
            $("#group").find(".alert-block").show();
        }
        if(role.length==0){
            valid = false;
            $("#role").find("#alert-emptyRoleName").show();
        }
        else if(!reg.test(role)){
            valid = false;
            $("#role").find("#alert-numerical").show();
        }
        else if(dup){
            valid = false;
            $("#role").find("input").val("");
            $("#role").find("#alert-dupRoleName").show();
        }
        if(valid){
            $(e.target).text("添加中");
            $(e.target).attr("disabled","disabled");
            this.props.add_role({
                data: {
                    role: role,
                    group: group,
                    desc: desc
                },
                callback: function(response){
                    $(e.target).text("确定");
                    $(e.target).removeAttr("disabled");
                    $("#role").find("input").val("");
                    $("#systemModal-createRole").modal('hide');
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                        document.getElementById('publicMessageModalcontent').innerHTML = "新建成功";
                        $('#publicMessageModal').modal('show');
                    },100);
                },
                error: function(response){
                    $(e.target).text("确定");
                    $(e.target).removeAttr("disabled");
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "角色";
                        document.getElementById('publicMessageModalcontent').innerHTML = "新建失败";
                        $('#publicMessageModal').modal('show');
                    },100);
                }
            });
        }
    },
});

$(window).resize(function () {
    if($('#systemModal-createRole') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
        $('#systemModal-createRole').css("height",height);
    }
});

module.exports = RoleManageCreateModal;
