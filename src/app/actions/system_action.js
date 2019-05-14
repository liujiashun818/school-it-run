/**
* 系统设置相关的action方法
*/
var oData = require('../server/odataSystem');
var Store = require('../server/store');
var base64 = require('../utils/base64.js');
import * as requestDataActions from './requestData_action'
//GETMONITORTREE
export const SET_MONITOR_TREE='SET_MONITOR_TREE'
//SETOLDTREE
export const SET_MONITOR_TREE_CHECKEDNODES='SET_MONITOR_TREE_CHECKEDNODES'
//SETTREECLEAR
export const SET_TREE_CLEAR='SET_TREE_CLEAR'
//SETMONITORTYPEARRAY
export const SET_MONITOR_TYPE_ARRAY='SET_MONITOR_TYPE_ARRAY'
//GETMONITORRETURNITEM
export const SET_MONITOR_RETURNITEM='SET_MONITOR_RETURNITEM'
//SETMONITORRETURNITEMDEFAULTVALUE
export const SET_MONITORRE_TURNITEMDEFAULT_VALUE='SET_MONITORRE_TURNITEMDEFAULT_VALUE'
export const SET_MONITORRE_TREE_INIT='SET_MONITORRE_TREE_INIT'
//SETTREEIDS
export const SET_MONITORRE_TREE_IDS='SET_MONITORRE_TREE_IDS'
//SETMONITORISALARM
export const SET_MONITOR_ISALARM='SET_MONITOR_ISALARM'
//SETMONITORREFRESH
export const SET_MONITORRE_FRESH='SET_MONITORRE_FRESH'
//SETMONITORRETURNITEM
export const SET_MONITORRE_TURNITEM='SET_MONITORRE_TURNITEM'


export const SET_GROUPS='SET_GROUPS'
export const SET_ALLGROUPDATA='SET_ALLGROUPDATA'
export const SET_CREATEINFO='SET_CREATEINFO'
export const SET_PARENTCODE='SET_PARENTCODE'
export const SET_CURGROUPDATA='SET_CURGROUPDATA'
export const SET_CURGROUPDATA_PARENTORGANIZATIONNAME='SET_CURGROUPDATA_PARENTORGANIZATIONNAME'
export const SET_CURGROUPDATA_ORGANIZATIONPWD='SET_CURGROUPDATA_ORGANIZATIONPWD'
export const SET_CURGROUPDATA_ROLE='SET_CURGROUPDATA_ROLE'
export const SET_SAFEGROUPS='SET_SAFEGROUPS'
export const SET_USERORGANIZATION='SET_USERORGANIZATION'
export const SET_PUREORGANIZATION='SET_PUREORGANIZATION'
export const SET_USERS='SET_USERS'
export const SET_SELECTEDUSER='SET_SELECTEDUSER'
export const SET_OPERATIONFLAG='SET_OPERATIONFLAG'
export const SET_CHANGEPASSWORDFLAG='SET_CHANGEPASSWORDFLAG'
export const SET_ROLES='SET_ROLES'
export const SET_CURTREE='SET_CURTREE'
export const SET_PCODEMARK='SET_PCODEMARK'
export const SET_PERMISSIONS='SET_PERMISSIONS'
export const SET_ISUPDATE='SET_ISUPDATE'
export const SET_ROLETREE='SET_ROLETREE'
export const SET_SESSIONUSERS='SET_SESSIONUSERS'
export const SET_USERINFOCHANGEFLAG='SET_USERINFOCHANGEFLAG'
export const SET_SYSMAPDATA='SET_SYSMAPDATA'
export const SET_SYSMAPDATAVALUE='SET_SYSMAPDATAVALUE'

//调用reducer-设置监测树
export function setMonitorTreeData(monitorTreeData) {
    return {
        type: SET_MONITOR_TREE,
        monitorTreeData
    }
}
//调用reducer-设置上次选择的监测树节点 CheckedNodes
export function setMonitorTreeCheckedNodes(checkedNodes) {
    return {
        type: SET_MONITOR_TREE_CHECKEDNODES,
        checkedNodes
    }
}
//调用reducer-清除树标志
export function setTreeClear(flag){
  return {
      type: SET_TREE_CLEAR,
      flag
  }
}
//调用reducer-
export function setMonitorTypeArray(monitorTypeArray){
  return {
      type: SET_MONITOR_TYPE_ARRAY,
      monitorTypeArray
  }
}
//调用reducer-
export function emitMonitorReturnItem(monitorReturnItem){
  return {
      type: SET_MONITOR_RETURNITEM,
      monitorReturnItem
  }
}
//调用reducer-
export function setMonitorReturnItemDefaultValue(monitorReturnItemDefaultValue){
  return {
      type: SET_MONITORRE_TURNITEMDEFAULT_VALUE,
      monitorReturnItemDefaultValue
  }
}
//调用reducer-
export function setMonitorTreeInit(value){
  return {
      type: SET_MONITORRE_TREE_INIT,
      value
  }
}
//调用reducer-
export function setTreeIds(treeIds){
  return {
      type: SET_MONITORRE_TREE_IDS,
      treeIds
  }
}
//调用reducer-
export function setMonitorIsAlarmValue(treeIds){
  return {
      type: SET_MONITOR_ISALARM,
      treeIds
  }
}

export function setGroups(groups) {
    return {
        type: SET_GROUPS,
        groups
    }
}

export function setAllGroupData(allGroupData) {
    return {
        type: SET_ALLGROUPDATA,
        allGroupData
    }
}

export function setCreateInfo(createInfo) {
    return {
        type: SET_CREATEINFO,
        createInfo
    }
}

export function setParentCode(parentCode) {
    return {
        type: SET_PARENTCODE,
        parentCode
    }
}

export function setCurGroupData(curGroupData) {
    return {
        type: SET_CURGROUPDATA,
        curGroupData
    }
}
export function setCurGroupData_parentOrganizationName(parentOrganizationName) {
    return {
        type: SET_CURGROUPDATA_PARENTORGANIZATIONNAME,
        parentOrganizationName
    }
}
export function setCurGroupData_organizationPwd(organizationPwd) {
    return {
        type: SET_CURGROUPDATA_ORGANIZATIONPWD,
        organizationPwd
    }
}
export function setCurGroupData_role(role) {
    return {
        type: SET_CURGROUPDATA_ROLE,
        role
    }
}

export function setSafeGroups(safeGroups) {
    return {
        type: SET_SAFEGROUPS,
        safeGroups
    }
}

export function setUserOrganization(userOrganization) {
    return {
        type: SET_USERORGANIZATION,
        userOrganization
    }
}

export function setPureOrganization(pureOrganization) {
    return {
        type: SET_PUREORGANIZATION,
        pureOrganization
    }
}

export function setUsers(users) {
    return {
        type: SET_USERS,
        users
    }
}

export function setSelectedUser(selectedUser) {
    return {
        type: SET_SELECTEDUSER,
        selectedUser
    }
}

export function setOperationFlag(operationFlag) {
    return {
        type: SET_OPERATIONFLAG,
        operationFlag
    }
}

export function setChangePasswordFlag(changePasswordFlag) {
    return {
        type: SET_CHANGEPASSWORDFLAG,
        changePasswordFlag
    }
}

export function setRoles(roles) {
    return {
        type: SET_ROLES,
        roles
    }
}

export function setCurTree(curTree) {
    return {
        type: SET_CURTREE,
        curTree
    }
}

export function setPcodeMark(pcodeMark) {
    return {
        type: SET_PCODEMARK,
        pcodeMark
    }
}

export function setPermissions(permissions) {
    return {
        type: SET_PERMISSIONS,
        permissions
    }
}

export function setIsUpdate(isUpdate) {
    return {
        type: SET_ISUPDATE,
        isUpdate
    }
}

export function setRoleTree(roleTree) {
    return {
        type: SET_ROLETREE,
        roleTree
    }
}

export function setSessionUsers(sessionUsers) {
    return {
        type: SET_SESSIONUSERS,
        sessionUsers
    }
}

export function setUserInfoChangeFlag(userInfoChangeFlag) {
    return {
        type: SET_USERINFOCHANGEFLAG,
        userInfoChangeFlag
    }
}

export function setSysMapData(sysMapData) {
    return {
        type: SET_SYSMAPDATA,
        sysMapData
    }
}

export function setSysMapDataValue(sysMapDataValue) {
    return {
        type: SET_SYSMAPDATAVALUE,
        sysMapDataValue
    }
}

//获取监测树-外部调用
export function getMonitorTree() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetMonitorTree());
    }
}

function oDataGetMonitorTree() {
    return dispatch => {
		    oData.getMonitorTree(dispatch,data => dispatch(getMonitorTreeData(data)));
    }
}
//获取监测树-内部调用
function getMonitorTreeData(data){
  return (dispatch, getState) => {
    var state = getState();
      var resultData = $.parseJSON(data.results[0].TREEDATA);
      if(resultData instanceof Array && resultData.length > 0){
        var newData =[];
        newData.push({
          bid: "",
          icon: "",
          id: "se",
          name:"监测树",
          open: true,
          parent: false,
          pId: "0",
          type: "all"
        });
        for(var i=0;i< resultData.length;i++){
          var nData={};
          if(resultData[i].frequency){
            nData  ={
              bid: resultData[i].bid,
              icon: resultData[i].icon,
              id: resultData[i].id,
              name:resultData[i].name,
              open:resultData[i].open,
              parent: resultData[i].parent,
              pId: resultData[i].pid,
              type: resultData[i].type,
              frequency: resultData[i].frequency+resultData[i].frequencyUtil,
              verifyErrorFrequency: resultData[i].verifyErrorFrequency+resultData[i].ErrorFrequencyUtil,
              IsVerifyerror:resultData[i].IsVerifyerror,
              isalarm:resultData[i].isalarm
            };
          }else{
            nData  ={
              bid: resultData[i].bid,
              icon: resultData[i].icon,
              id: resultData[i].id,
              name:resultData[i].name,
              open:resultData[i].open,
              parent: resultData[i].parent,
              pId: resultData[i].pid,
              type: resultData[i].type
            };
          }
           newData.push(nData);
        };
        //如果右边树有选择
        var oldTreeList = [];
        oldTreeList = state.systemReducer.oldTree;
        if(oldTreeList.length > 0 ){
          for(var i =0;i <newData.length;i++){
            for(var j=0;j < oldTreeList.length;j++){
              if(newData[i].id == oldTreeList[j].id){
                newData[i].open =oldTreeList[j].open;
              }
            }
          }
            dispatch(setMonitorTreeData(newData));
            dispatch(isShowTree(true));
        }else{
          dispatch(setMonitorTreeData(newData));
        }
        dispatch(requestDataActions.setRequestSuccess());
      }
  }
}

//设置监测器告警-外部调用
export function setMonitorIsAlarm(inputObj){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.setMonitorIsAlarm(inputObj,data => {
            dispatch(requestDataActions.setRequestSuccess());
            $.showPublicDialog("提示信息","修改成功。");
            dispatch(getMonitorTree());
        }
      );
    }
}
//刷新监测器-外部调用
export function setMonitorRefresh(inputObj){
  return dispatch => {
      dispatch(requestDataActions.setRequest());
      oData.setMonitorRefresh(inputObj,data => {
          dispatch(requestDataActions.setRequestSuccess());
          $.showPublicDialog("提示信息","修改成功。");
          dispatch(getMonitorTree());
      }
    );
  }
}
//====================报警条件 应用==================================
//设置监测器项-外部调用
export function setMonitorReturnItem(inputObj){
  return dispatch => {
      dispatch(requestDataActions.setRequest());
      oData.setMonitorReturnItem(inputObj,data => {
          dispatch(requestDataActions.setRequestSuccess());
          $.showPublicDialog("提示信息","修改成功。");
          dispatch(getMonitorTree());
      });
  }
}

//=================是否显示树============
export const ISSHOWTREE = 'ISSHOWTREE';//获取visio 数据
export function emitIsShowTree(data){
  return {
      type: ISSHOWTREE,
      data
  }
}
export function isShowTree(isShow){
  return dispatch => {
    return dispatch(emitIsShowTree(isShow));
  }
}
//=================设置条件以及选择默认条件==================
export function getMonitorReturnItem(monitorType){
  return dispatch => {
      dispatch(requestDataActions.setRequest());
      oData.getMonitorReturnItem(monitorType,dispatch,function(data){
        var resultData = $.parseJSON(data.results[0].RETURNITEM);
        if(resultData.length >0){
          var newData =[];
          for(var i=0;i<resultData.length;i++){
            newData.push({id:resultData[i].savename,name:resultData[i].showname});
          }
          dispatch(emitMonitorReturnItem(newData));
          dispatch(setMonitorReturnItemDefaultValue(newData[0]));
          dispatch(requestDataActions.setRequestSuccess());
        }
      });
  }
}

export function getSessionUsers(){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.getSessionUsers(dispatch,function(data){
            dispatch(setSessionUsers(data.results));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function get_allGroup(param){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.getAllGroupOrg(dispatch,function(data){
            var result = data.results[0];
            result = eval(result);
            var org = result.ORGANIZATION;
            org = eval(org);
            var list = [];
            if(org == null || org == ""){
                dispatch(requestDataActions.setRequestSuccess());
                return false;
            }
            for(var i=0;i<org.length;i++){
                var pId = org[i].parentOrganization;
                var nam = org[i].organizationName;
                if(pId == null || pId == "" || pId == "undefined"){
                    pId = 0;
                }
                if(nam == null || nam == ""){
                    continue;
                }
                var ldata = {
                    id:org[i].organizationCode,
                    pid:pId,
                    name:org[i].organizationName
                };
                list.push(ldata);
            }
            dispatch(setGroups(list));
            dispatch(setAllGroupData(org));
            if(param){
              dispatch(init_tree(param));
            }
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function init_data(mark){
    return dispatch => {
        if(mark){
            dispatch(setParentCode(""));
        }else{
            dispatch(setIsUpdate(false));
            dispatch(setCurGroupData(""));
            dispatch(refreshRoleTree(""));
        }
    }
}

export function get_createInfo(that){
    return dispatch => {
        var filter = [];
        dispatch(requestDataActions.setRequest());
        oData.getCreateInfo(filter,dispatch,function(data){
            var result = data.results[0];
            var roles = result.ROLES;
            roles = eval(roles);
            var group = result.ORGANIZATION;
            group = eval(group);
            var cinfo = {
                group:group,
                roles:roles
            };
            dispatch(setCreateInfo(cinfo));
            if(that){
              dispatch(init_roleTree(that));
            };
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function set_parentCode(code){
    return dispatch => {
        dispatch(setParentCode(code));
        dispatch(setPcodeMark(true));
        dispatch(setIsUpdate(true));
    }
}

export function save_createGroup(data){
    return (dispatch, getState) => {
        var state = getState();
        dispatch(requestDataActions.setRequest());
        oData.saveCreateGroup(data,function(result){
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "保存完成。"
                $('#publicMessageModal').modal('show');
            },100);
            // window.location.reload(true);
            dispatch(setPcodeMark(false));
            dispatch(setIsUpdate(false));
            dispatch(setSysMapDataValue(""));
            dispatch(refreshRoleTree(""));
            var tree = state.systemReducer.curTree;
            var ztree = tree.getTree();
            var RecId = data.ORGANIZATIONRECID;
            var pcode = state.systemReducer.parentCode;
            var cid = data.ORGANIZATIONCODE;
            cid = cid.substring(1,cid.length-1);
            if(pcode == null || pcode == ""){
                pcode = data.PARENTORGANIZATION;
                pcode = pcode.substring(1,pcode.length-1);
            }
            dispatch(refreshTree(pcode,cid));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function set_curGroupData(data){
    return (dispatch, getState) => {
        var state = getState();
        var id = data.id;
        var list = state.systemReducer.allGroupData;
        for(var i=0;i<list.length;i++){
            var lid = list[i].organizationCode;
            if(id==lid){
                dispatch(setCurGroupData(list[i]));
                var pid = list[i].parentOrganization;
                for(var j=0;j<list.length;j++){
                    var llid = list[j].organizationCode;
                    if(pid == llid){
                        dispatch(setCurGroupData_parentOrganizationName(list[j].organizationName));
                    }
                }
                var id = list[i].organizationRecId;
                var keyName = list[i].organizationName;
                dispatch(requestDataActions.setRequest());
                oData.getOrganizationPwd(id,function(data3){
                    var pwd = data3.results[0].prop_login_pwd;
                    dispatch(setCurGroupData_organizationPwd(pwd));
                    var filter = [{key:"ORGANIZATIONNAME",value:keyName}];
                    dispatch(requestDataActions.setRequest());
                    oData.getRoles(filter,dispatch,function(data2){
                        var result = data2.results[0].ROLES;
                        result = eval(result);
                        dispatch(setCurGroupData_role(result));
                        dispatch(setIsUpdate(false));
                        dispatch(setSysMapDataValue(""));
                        if(result!=null && result!="" && result.length<=0){
                            dispatch(refreshRoleTree(""));
                        }else{
                            dispatch(refreshRoleTree(result));
                        }
                        dispatch(requestDataActions.setRequestSuccess());
                    });
                    dispatch(requestDataActions.setRequestSuccess());
                });
            }
        }
    }
}

export function get_safeGroups(){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.getSafeGroups(dispatch,function(data){
            if(data.results.length == 0){
                return;
            }
            dispatch(setSafeGroups(eval(data.results)));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function get_userOrganization(filter){
    return dispatch => {
        dispatch(setUserOrganization([]));
        dispatch(requestDataActions.setRequest());
        oData.getUserOrganization(filter, dispatch,function(data){
            if(data.results.length == 0){
                return;
            }
            dispatch(setUserOrganization(eval(data.results)));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function get_pureOrganization(filter){
    return dispatch => {
        dispatch(setPureOrganization([]));
        dispatch(requestDataActions.setRequest());
        oData.getPureOrganization(filter, dispatch,function(data){
            if(data.results.length == 0){
                return;
            }
            dispatch(setPureOrganization(eval(data.results)));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function get_allUser(){
    return dispatch => {
        dispatch(setUsers([]));
        var filter = [{key:"OPERATOR_TYPE",value:'GET'}];
        dispatch(requestDataActions.setRequest());
        oData.sysUser(filter, function(data){
            if(data.results.length == 0){
                return;
            }
            dispatch(setUsers(eval(data.results)));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function add_user(filter){
    return dispatch => {
        filter.unshift({key:"OPERATOR_TYPE",value:'ADD'});
        dispatch(requestDataActions.setRequest());
        oData.sysUser(filter, function(data){
            if(data.results.length == 0){
                dispatch(requestDataActions.setRequestFail());
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "新建用户失败！"
                    $('#publicMessageModal').modal('show');
                },100);
                return;
            }
            var obj = eval(data.results);
            if(obj[0].OUT_FLAG == "true") {
                dispatch(requestDataActions.setRequestSuccess());
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "新建用户成功！"
                    $('#publicMessageModal').modal('show');
                },100);
                window.location.href = '#/systemManage/userListPage';
            }
            else if(obj[0].OUT_FLAG == "exists") {
                dispatch(requestDataActions.setRequestFail());
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "用户名已存在！"
                    $('#publicMessageModal').modal('show');
                },100);
            }
            else {
                dispatch(requestDataActions.setRequestFail());
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "新建用户失败！"
                    $('#publicMessageModal').modal('show');
                },100);
            }
        });
    }
}

export function edit_user(filter){
    return dispatch => {
        filter.unshift({key:"OPERATOR_TYPE",value:'EDIT'});
        dispatch(requestDataActions.setRequest());
        oData.sysUser(filter, function(data){
            if(data.results.length == 0){
                dispatch(requestDataActions.setRequestFail());
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "修改用户失败！"
                    $('#publicMessageModal').modal('show');
                },100);
                return;
            }
            var obj = eval(data.results);
            if(obj[0].OUT_FLAG == "true") {
                dispatch(requestDataActions.setRequestSuccess());
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "修改用户成功！"
                    $('#publicMessageModal').modal('show');
                },100);
                window.location.href = '#/systemManage/userListPage';
            }
            else {
                dispatch(requestDataActions.setRequestFail());
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "修改用户失败！"
                    $('#publicMessageModal').modal('show');
                },100);
            }
        });
    }
}

export function delete_user(loginId){
    return dispatch => {
        var filter = [{key:"OPERATOR_TYPE",value:"DELETE"},{key:"LOGIN_ID",value:loginId}];
        dispatch(requestDataActions.setRequest());
        oData.sysUser(filter, function(data){
            if(data.results.length == 0){
                dispatch(requestDataActions.setRequestFail());
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "删除用户失败！"
                    $('#publicMessageModal').modal('show');
                },100);
                return;
            };
            var obj = eval(data.results);
            if(obj[0].OUT_FLAG == "true") {
                dispatch(requestDataActions.setRequestSuccess());
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "删除用户成功！"
                    $('#publicMessageModal').modal('show');
                },100);
            }
            else {
                dispatch(requestDataActions.setRequestFail());
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "删除用户失败！"
                    $('#publicMessageModal').modal('show');
                },100);
            }
        });
    }
}

export function set_selectedUser(params){
    return dispatch => {
        dispatch(setSelectedUser(params.user));
        dispatch(setOperationFlag(params.flag));
    }
}

export function changePassword(params){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.changePassword(params, function(data){
            if(data.results.length == 0){
                dispatch(requestDataActions.setRequestFail());
                return;
            }
            var obj = eval(data.results);
            if(obj[0].FLAG == "0") {
                alert(obj[0].MESSAGE);
            }
            else {
                params.map(function(obj,i){
                    var key = obj.key;
                    var value = obj.value;
                    if(key == "LOGIN_ID") {
                        if(value == "") {
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                                document.getElementById('publicMessageModalcontent').innerHTML = "修改成功，程序将自动跳转到登录页面。"
                                $('#publicMessageModal').modal('show');
                            },100);
                            $("#changePasswordModal").modal("hide");
                            var token = Store.get("token");
                            var serviceAddress = Store.get("serviceUrl");
                            if(token != '') {
                                Store.set("token","");
                                //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
                                var rquestUri = serviceAddress+"Logout?token="+token;
                                //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
                                rquestUri = encodeURI(rquestUri);
                                $.ajax({
                                    type: "get",
                                    async: false,
                                    url:rquestUri,
                                    dataType: "json",
                                    success : function(result){

                                    },error : function(result){
                                        // console.log(result.responseText);
                                    }
                                });
                            }
                            window.location.href="#";
                        }
                        else {
                            setTimeout(function(){
                                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                                document.getElementById('publicMessageModalcontent').innerHTML = "重置成功。"
                                $('#publicMessageModal').modal('show');
                            },100);
                            $("#changePasswordModal").modal("hide");
                        }
                    }
                });
            }
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function delete_groupById(param){
    return dispatch => {
        var filter = [{key:"ORGANIZATIONRECID",value:param.rid},{key:"ORGANIZATIONNAME",value:param.rname},{key:"SAFETYGROUPID",value:param.sid},{key:"ORGANIZATIONCODE",value:param.code},{key:"DELETE_ALL",value:"false"}];
        dispatch(requestDataActions.setRequest());
        oData.deleteOrganization(filter,function(data){
            dispatch(refreshTree());
            dispatch(refreshRoleTree(""));
            $("#createGroupCode").attr("disabled",false);
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function get_roles(organizationName){
    return dispatch => {
        var filter = [{key:"ORGANIZATIONNAME", value:organizationName}];
        dispatch(requestDataActions.setRequest());
        oData.getRoles(filter, dispatch,function(data){
            if(data.results.length == 0){
                return;
            };
            var result = data.results[0].ROLES;
            dispatch(setRoles(eval(result)));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function init_tree(param){
    return (dispatch, getState) => {
        var state = getState();
        param.initTree(state.systemReducer.groups);
        dispatch(setCurTree(param));
    }
}

function refreshTree(paramId,paramId2){
    return (dispatch, getState) => {
        var state = getState();
        dispatch(requestDataActions.setRequest());
        oData.getAllGroupOrg(dispatch,function(data){
            var result = data.results[0];
            result = eval(result);
            var org = result.ORGANIZATION;
            org = eval(org);
            var list = [];
            for(var i=0;i<org.length;i++){
                var pId = org[i].parentOrganization;
                var nam = org[i].organizationName;
                if(pId == null || pId == ""){
                    pId = 0;
                }
                if(nam == null || nam == ""){
                    continue;
                }
                var ldata = {
                    id:org[i].organizationCode,
                    pid:pId,
                    name:org[i].organizationName
                };
                list.push(ldata);
            }
            dispatch(setGroups(list));
            dispatch(setAllGroupData(org));
            dispatch(setCurGroupData(""));
            var curTree = state.systemReducer.curTree;
            if(paramId!=null && paramId!="" && paramId2!=null && paramId2!=""){
                curTree.initTree(list);
                var tree = curTree.getTree();
                var targetNode = tree.getNodeByParam("id",paramId2);
                tree.selectNode(targetNode);
                dispatch(set_curGroupData(targetNode));
                var tname = targetNode.name;
                $(".systemGroupButtonGroup1").find(".titleLeft").find(".extraText").text("-"+tname);
                var isParent = targetNode.isParent;
                if(isParent){
                    $("#createGroupCode").attr("disabled",true);
                }else{
                    $("#createGroupCode").attr("disabled",false);
                }
            }else {
                curTree.initTree(list);
            }
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function delete_groupAll(param){
    return dispatch => {
        var filter = [{key:"ORGANIZATIONRECID",value:param.rid},{key:"ORGANIZATIONNAME",value:param.rname},{key:"SAFETYGROUPID",value:param.sid},{key:"ORGANIZATIONCODE",value:param.code},{key:"DELETE_ALL",value:"true"}];
        dispatch(requestDataActions.setRequest());
        oData.deleteOrganization(filter,function(data){
            dispatch(refreshTree());
            dispatch(refreshRoleTree(""));
            $("#createGroupCode").attr("disabled",false);
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function set_groupRoleData(data){
    return dispatch => {
        dispatch(setCurGroupData_role(data));
        dispatch(setIsUpdate(true));
    }
}

export function init_roleTree(data){
    return (dispatch, getState) => {
        var state = getState();
        var roles = state.systemReducer.createInfo.roles;
        var dataList = [];
        if(roles){
          for(var i=0;i<roles.length;i++){
              dataList.push({id:i+1,name:roles[i],pid:0});
          }
        }
        dispatch(setRoleTree(data));
        data.initTree(dataList);
    }
}

function refreshRoleTree(data){
    return (dispatch, getState) => {
        var state = getState();
        var roleTree = state.systemReducer.roleTree;
        var roles = state.systemReducer.createInfo.roles;
        var dataList = [];
        if(data!=null && data!="" && data.length>0){
            for(var i=0;i<roles.length;i++){
                var mark = false;
                for(var j=0;j<data.length;j++){
                    if(roles[i]==data[j]){
                        mark = true;
                        break;
                    }
                }
                if(mark){
                    dataList.push({id:i+1,name:roles[i],pid:0,checked:true});
                }else{
                    dataList.push({id:i+1,name:roles[i],pid:0});
                }
            }
        }else{
            for(var i=0;i<roles.length;i++){
                dataList.push({id:i+1,name:roles[i],pid:0});
            }
        }
        roleTree.initTree(dataList);
    }
}

export function get_sysMapData(){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.getSysMapData(function(data){
            dispatch(setSysMapData(data.results));
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function set_sysMapDataValue(data){
    return dispatch => {
        dispatch(setSysMapDataValue(data));
        dispatch(setIsUpdate(true));
    }
}
