require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var ReactWidgets = require('react-widgets');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var roles = [];
var UserAddView_desView_form = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_system:flux.store("YFTSystemStore").getState(),
    //         itoss_navbar:flux.store("NavbarStore").getState()
    //     }
    // },

    getInitialState: function() {
        return {
            selectedGroup: this.props.safeGroups[0],
            selectedRole: null
        }
    },

    componentDidMount:function(){
        const { operationFlag, selectedUser, safeGroups, get_roles, roles } = this.props;
        var selectedGroup;
        if(operationFlag != "add") {
            document.getElementById("userAdd_username").disabled = true;
            document.getElementById("userAdd_password").disabled = true;
            document.getElementById("userAdd_confirmPassword").disabled = true;
            document.getElementById("span_showConfirmPassword").style.backgroundColor = "#f0f0f0";
            document.getElementById("span_showPassword").style.backgroundColor = "#f0f0f0";
            if(operationFlag == "show") {
                document.getElementById("userAdd_name").disabled = true;
                document.getElementById("userAdd_department").disabled = true;
                document.getElementById("userAdd_mail").disabled = true;
                document.getElementById("userAdd_phone").disabled = true;
                document.getElementById("userAdd_telephone").disabled = true;
            }

            document.getElementById("userAdd_username").value = selectedUser.LOGIN_ID;
            document.getElementById("userAdd_password").value = "123456";//this.state.itoss_system.SelectedUser.LOGIN_PWD;
            document.getElementById("userAdd_confirmPassword").value = "123456";//this.state.itoss_system.SelectedUser.LOGIN_PWD;
            var bOrgInGroups = false;
            for(var i = 0; i < safeGroups.length; i++) {
                if(safeGroups[i].SAFEGROUP_NAME == selectedUser.ORANIZATION_NAME) {
                    bOrgInGroups = true;
                    selectedGroup = safeGroups[i];
                    this.setState({selectedGroup: selectedGroup});
                    get_roles(selectedGroup.SAFEGROUP_NAME);
                    break;
                }
            }
            if(!bOrgInGroups) {
                selectedGroup = {SAFEGROUP_ID:"", SAFEGROUP_NAME:selectedUser.ORANIZATION_NAME};
                this.setState({selectedGroup: selectedGroup});
            }
            var userRoles = eval(selectedUser.ROLE_NAME);
            var orgRoles = roles;
            for(var i = 0; i < orgRoles.length; i++) {
                var bSelected = false;
                for(var j = 0; j < userRoles.length; j++) {
                    if(orgRoles[i] == userRoles[j].name) {
                        bSelected = true;
                        document.getElementById("role_"+orgRoles[i]).checked = true;
                        break;
                    }
                }
                if(!bSelected) {
                    document.getElementById("role_"+orgRoles[i]).checked = false;
                }
                if(operationFlag == "show") {
                    document.getElementById("role_"+orgRoles[i]).disabled = true;
                }
                else if(operationFlag == "edit") {
                    document.getElementById("role_"+orgRoles[i]).disabled = false;
                }
            }
            document.getElementById("userAdd_name").value = selectedUser.USER_NAME;
            document.getElementById("userAdd_department").value = selectedUser.DEPARTMENT;
            document.getElementById("userAdd_mail").value = selectedUser.EMAIL;
            document.getElementById("userAdd_phone").value = selectedUser.PHONE;
            document.getElementById("userAdd_telephone").value = selectedUser.TELEPHONE;
        }
        else {
          document.getElementById("span_showConfirmPassword").style.backgroundColor = "#fff";
          document.getElementById("span_showPassword").style.backgroundColor = "#fff";

          if(safeGroups.length != 0) {
              selectedGroup = safeGroups[0];
              get_roles(selectedGroup.SAFEGROUP_NAME);
          }
        }
    },

    componentDidUpdate: function() {
        const { operationFlag, userInfoChangeFlag, selectedUser, roles } = this.props;
        if(operationFlag != "add") {
            if(operationFlag == "show") {
                document.getElementById("userAdd_name").disabled = true;
                document.getElementById("userAdd_department").disabled = true;
                document.getElementById("userAdd_mail").disabled = true;
                document.getElementById("userAdd_phone").disabled = true;
                document.getElementById("userAdd_telephone").disabled = true;
            }
            else if(operationFlag == "edit") {
                document.getElementById("userAdd_name").disabled = false;
                document.getElementById("userAdd_department").disabled = false;
                document.getElementById("userAdd_mail").disabled = false;
                document.getElementById("userAdd_phone").disabled = false;
                document.getElementById("userAdd_telephone").disabled = false;
            }

            if(!userInfoChangeFlag) {
                var userRoles = eval(selectedUser.ROLE_NAME);
                var orgRoles = roles;
                for(var i = 0; i < orgRoles.length; i++) {
                    var bSelected = false;
                    for(var j = 0; j < userRoles.length; j++) {
                        if(orgRoles[i] == userRoles[j].name) {
                            bSelected = true;
                            document.getElementById("role_"+orgRoles[i]).checked = true;
                            break;
                        }
                    }
                    if(!bSelected) {
                        document.getElementById("role_"+orgRoles[i]).checked = false;
                    }
                    if(operationFlag == "show") {
                        document.getElementById("role_"+orgRoles[i]).disabled = true;
                    }
                    else if(operationFlag == "edit") {
                        document.getElementById("role_"+orgRoles[i]).disabled = false;
                    }
                }
            }
        }
    },

    shouldComponentUpdate: function(nextProps, nextState){
      if (nextProps.safeGroups !== this.props.safeGroups) {
          var selectedGroup, bOrgInGroups = false;
          if(nextProps.operationFlag != "add") {
              for(var i = 0; i < nextProps.safeGroups.length; i++) {
                  if(nextProps.safeGroups[i].SAFEGROUP_NAME == nextProps.selectedUser.ORANIZATION_NAME) {
                      bOrgInGroups = true;
                      selectedGroup = nextProps.safeGroups[i];
                      this.setState({selectedGroup: selectedGroup});
                      nextProps.get_roles(selectedGroup.SAFEGROUP_NAME);
                      break;
                  }
              }
              if(!bOrgInGroups) {
                  selectedGroup = {SAFEGROUP_ID:"", SAFEGROUP_NAME:nextProps.selectedUser.ORANIZATION_NAME};
                  this.setState({selectedGroup: selectedGroup});
              }
          }
          else {
              if(nextProps.safeGroups.length != 0) {
                  selectedGroup = nextProps.safeGroups[0];
                  nextProps.get_roles(selectedGroup.SAFEGROUP_NAME);
              }
          }
      }
      return true;
    },

    _handleOnClickShowPassword: function() {
        if(this.props.operationFlag == "add") {
            if(document.getElementById('showPassword').className == 'fa fa-eye-slash') {
              document.getElementById('showPassword').className = 'fa fa-eye';
              document.getElementById('userAdd_password').type = 'text';
            }
            else {
              document.getElementById('showPassword').className = 'fa fa-eye-slash';
              document.getElementById('userAdd_password').type = 'password';
            }
        }
    },

    _handleOnClickShowConfirmPassword: function() {
        if(this.props.operationFlag == "add") {
            if(document.getElementById('showConfirmPassword').className == 'fa fa-eye-slash') {
              document.getElementById('showConfirmPassword').className = 'fa fa-eye';
              document.getElementById('userAdd_confirmPassword').type = 'text';
            }
            else {
              document.getElementById('showConfirmPassword').className = 'fa fa-eye-slash';
              document.getElementById('userAdd_confirmPassword').type = 'password';
            }
        }
    },

    _handleOnSelectGroup:function(e){
        const { get_roles, operationFlag, selectedUser, roles, setUserInfoChangeFlag } = this.props;
        this.setState({selectedGroup: e});
        get_roles(e.SAFEGROUP_NAME);

        if(operationFlag != "add") {
            var bChanged = false;
            if(document.getElementById("userAdd_name").value != selectedUser.USER_NAME) bChanged = true;
            if(document.getElementById("userAdd_department").value != selectedUser.DEPARTMENT) bChanged = true;
            if(document.getElementById("userAdd_mail").value != selectedUser.EMAIL) bChanged = true;
            if(document.getElementById("userAdd_phone").value != selectedUser.PHONE) bChanged = true;
            if(document.getElementById("userAdd_telephone").value != selectedUser.TELEPHONE) bChanged = true;
            if(e.SAFEGROUP_NAME != selectedUser.ORANIZATION_NAME) {
                bChanged = true;
            }
            else {
                var userRoles = eval(selectedUser.ROLE_NAME);
                var orgRoles = roles;
                for(var i = 0; i < orgRoles.length; i++) {
                    var bInUserRoles = false;
                    for(var j = 0; j < userRoles.length; j++) {
                        if(orgRoles[i] == userRoles[j].name) {
                            bInUserRoles = true;
                            if(!document.getElementById("role_"+orgRoles[i]).checked) {
                                bChanged = true;
                                break;
                            }
                            break;
                        }
                    }
                    if(!bInUserRoles && document.getElementById("role_"+orgRoles[i]).checked) {
                        bChanged = true;
                        break;
                    }
                }
            }
            setUserInfoChangeFlag(bChanged);
        }
    },

    _handleOnSelectRole:function(e){
        this.setState({selectedRole: e});
    },

    checkInfoChanged:function(e){
        const { operationFlag, selectedUser, roles, setUserInfoChangeFlag } = this.props;
        if(operationFlag != "add") {
            var bChanged = false;
            if(document.getElementById("userAdd_name").value != selectedUser.USER_NAME) bChanged = true;
            if(document.getElementById("userAdd_department").value != selectedUser.DEPARTMENT) bChanged = true;
            if(document.getElementById("userAdd_mail").value != selectedUser.EMAIL) bChanged = true;
            if(document.getElementById("userAdd_phone").value != selectedUser.PHONE) bChanged = true;
            if(document.getElementById("userAdd_telephone").value != selectedUser.TELEPHONE) bChanged = true;
            if(this.state.selectedGroup.SAFEGROUP_NAME != selectedUser.ORANIZATION_NAME) {
                bChanged = true;
            }
            else {
                var userRoles = eval(selectedUser.ROLE_NAME);
                var orgRoles = roles;
                for(var i = 0; i < orgRoles.length; i++) {
                    var bInUserRoles = false;
                    for(var j = 0; j < userRoles.length; j++) {
                        if(orgRoles[i] == userRoles[j].name) {
                            bInUserRoles = true;
                            if(!document.getElementById("role_"+orgRoles[i]).checked) {
                                bChanged = true;
                                break;
                            }
                            break;
                        }
                    }
                    if(!bInUserRoles && document.getElementById("role_"+orgRoles[i]).checked) {
                        bChanged = true;
                        break;
                    }
                }
            }
            setUserInfoChangeFlag(bChanged);
        }
    },

    _handleOnClickEditRole: function() {
        const { preTwoNode, setPreTwoNode, setCurTwoNode } = this.props;
        var navBefore = preTwoNode.systemMenu;
        var treeNode = {id:3,name:"角色和权限管理",pid:0,tId: "systemMenu_3",toUrl:"systemManage/roleManagePage"};
        var param = ["systemMenu", navBefore];
        var param2 = ["systemMenu", treeNode];
        setPreTwoNode(param);
        setCurTwoNode(param2);
        this.history.pushState(null,'systemManage/roleManagePage');
    },

    render:function(){
        const { operationFlag, safeGroups, roles } = this.props;
        var _this = this;
        return (
            <div className="createGroupDetailDiv userAddView_desView_form">
                <table>
                    <tbody>
                        <tr>
                            <td className="col-md-1">用户名<span style={{"color":"#FF0000"}}>*</span></td>
                            <td className="col-md-3"><input type="text" id="userAdd_username" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}/></td>
                            <td className="col-md-1">密码<span style={{"color":"#FF0000"}}>*</span></td>
                            <td className="col-md-3">
                                <div className="input-group">
                                  <input id="userAdd_password" type="password" className="form-control" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}/>
                                  <span id="span_showPassword" className="input-group-addon" onClick={this._handleOnClickShowPassword}><i id="showPassword" className="fa fa-eye-slash"></i></span>
                                </div>
                            </td>
                            <td className="col-md-1">确认密码<span style={{"color":"#FF0000"}}>*</span></td>
                            <td className="col-md-3">
                                <div className="input-group">
                                  <input id="userAdd_confirmPassword" type="password" className="form-control" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}/>
                                  <span id="span_showConfirmPassword" className="input-group-addon" onClick={this._handleOnClickShowConfirmPassword}><i id="showConfirmPassword" className="fa fa-eye-slash"></i></span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1">姓名<span style={{"color":"#FF0000"}}>*</span></td>
                            <td className="col-md-3"><input type="text" id="userAdd_name" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}/></td>
                            <td className="col-md-1">部门</td>
                            <td className="col-md-3"><input type="text" id="userAdd_department" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}/></td>
                            <td className="col-md-1">邮箱<span style={{"color":"#FF0000"}}>*</span></td>
                            <td className="col-md-3"><input type="text" id="userAdd_mail" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}/></td>
                        </tr>
                        <tr>
                            <td className="col-md-1">手机<span style={{"color":"#FF0000"}}>*</span></td>
                            <td className="col-md-3"><input type="text" id="userAdd_phone" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}/></td>
                            <td className="col-md-1">固定电话</td>
                            <td className="col-md-3"><input type="text" id="userAdd_telephone" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}/></td>
                            <td className="col-md-1">组织机构<span style={{"color":"#FF0000"}}>*</span></td>
                            <td className="col-md-3">
                              <ReactWidgets.DropdownList id="userAdd_group" disabled={operationFlag=="show"?true:false}
                                data={safeGroups} value={this.state.selectedGroup} textField='SAFEGROUP_NAME' onChange={this._handleOnSelectGroup}
                                caseSensitive={false} filter='contains'
                              />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1">角色<span style={{"color":"#FF0000"}}>*</span></td>
                            <td className="col-md-3" colSpan="5" style={{textAlign:"left"}}>
                                <ReactWidgets.DropdownList id="userAdd_role" style={{display:"none"}} data={roles} value={this.state.selectedRole} onChange={this._handleOnSelectRole}/>
                                {roles.map(function(Role) {
                                    return (
                                        <label className="radioLabel">
                                            <input id={"role_"+Role} type="checkbox" name="alarmRulesIssue_checkbox" defaultChecked={false} onClick={_this.checkInfoChanged}/> {Role}
                                        </label>
                                    );
                                })}
                                <button className="btn btnEditRole" onClick={this._handleOnClickEditRole}>编辑角色</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

UserAddView_desView_form.propTypes = {
  safeGroups: PropTypes.array.isRequired,
  operationFlag: PropTypes.string.isRequired,
  selectedUser: PropTypes.object,
  get_roles: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  userInfoChangeFlag: PropTypes.bool.isRequired,
  setUserInfoChangeFlag: PropTypes.func.isRequired,
  preTwoNode: PropTypes.object,
  setPreTwoNode: PropTypes.func.isRequired,
  setCurTwoNode: PropTypes.func.isRequired
}

module.exports = UserAddView_desView_form;
