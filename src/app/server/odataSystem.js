var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');
import * as requestDataActions from '../actions/requestData_action'
// Store.get_ServiceAddress();
// Store.get_tokenVerify();
var serviceAddress = Store.get("serviceUrl");
var tokenVerify = Store.get("tokenUrl");
var servletAddress = Store.get("servletServiceUrl");

var oDataHandle = function(){}
var portletData = Store.get_portletData();
var token ="";

Object.defineProperty(oDataHandle, 'getCreateInfo', {
    value: function(filters,dispatch, callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            var filterString="";
            if(filters != null){
                filters.map(function(obj,i){
                    var key = obj.key;
                    var value = obj.value;
                    if(filterString == ""){
                        filterString = "&"+key+"="+"'"+value+"'";
                    }else{
                        filterString += "&"+key+"="+"'"+value+"'";
                    }
                });
            }
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetOrganizationUI?token="+token+filterString;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                    dispatch(requestDataActions.setRequestFail());
                }
            });
        }
    }
});
Object.defineProperty(oDataHandle, 'getRoles', {
    value: function(filters,dispatch, callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            var filterString="";
            if(filters != null){
                filters.map(function(obj,i){
                    var key = obj.key;
                    var value = obj.value;
                    if(filterString == ""){
                        filterString = "&"+key+"="+"'"+value+"'";
                    }else{
                        filterString += "&"+key+"="+"'"+value+"'";
                    }
                });
            }
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetRoles?token="+token+filterString;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                    dispatch(requestDataActions.setRequestFail());
                }
            });
        }
    }
});

Object.defineProperty(oDataHandle, 'getMonitorTree', {
    value: function(dispatch,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetMonitorSetUpUi?token="+token;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                    dispatch(requestDataActions.setRequestFail());
                }
            });
        }
    }
});

Object.defineProperty(oDataHandle, 'getSessionUsers', {
    value: function(dispatch,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetSessionUsers?token="+token;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                    dispatch(requestDataActions.setRequestFail());
                }
            });
        }
    }
});

Object.defineProperty(oDataHandle, 'getMonitorReturnItem', {
    value: function(monitorType,dispatch,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetMonitorReturnItem?token="+token+"&MONITORTYPE='"+monitorType+"'";
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                    dispatch(requestDataActions.setRequestFail());
                }
            });
        }
    }
});

// Object.defineProperty(oDataHandle, 'setMonitorReturnItem',{
//   value: function(needObj,callback) {
//       var token = Store.get("token");
//       if(token != '') {
//           var newObj = {};
//           newObj.tableName ="SetMonitorReturnItem";
//           newObj.type = "update";
//           newObj.token = token;
//           // newObj.recId = needObj.RecId;
//           newObj.updateObjec =needObj;
//           oDataHandle.handle(newObj, function(resp) {
//               callback(resp);
//           });
//       }
//   }
// });

Object.defineProperty(oDataHandle, 'setMonitorIsAlarm', {
    value: function(isAlarmObj,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"SetMonitorIsAlarm?token="+token+"&MONITORID="+isAlarmObj.MONITORTID+"&ISALARM="+isAlarmObj.ISALARM;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                }
            });
        }
    }
});
Object.defineProperty(oDataHandle, 'setMonitorReturnItem', {
    value: function(monitorType,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"SetMonitorReturnItem?token="+token+"&MONITORID="+monitorType.MONITORTID+
            "&ERRORALARM="+monitorType.ERRORALARM+"&WARNINGALARM="+monitorType.WARNINGALARM+"&GOODALARM="+
            monitorType.GOODALARM+"&ISOR_ERROR="+monitorType.ISOR_ERROR+"&ISOR_WARNING="+monitorType.ISOR_WARNING+"&ISOR_GOOD="+monitorType.ISOR_GOOD+"&MONITORTYPE="+monitorType.MONITORTYPE;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                // data:monitorType,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                }
            });
        }
    }
});
Object.defineProperty(oDataHandle, 'setMonitorRefresh', {
    value: function(refreshObj,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
          var isErrorCheckStr = "";
          if(refreshObj.ISERRORCHECK != undefined){
            isErrorCheckStr = "&ISERRORCHECK="+refreshObj.ISERRORCHECK;
          }
          //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
          var rquestUri = serviceAddress+"SetMonitorRefresh?token="+token+"&MONITORID="+refreshObj.MONITORTID+"&TIME="+refreshObj.TIME+"&TIMEUNIT="+refreshObj.TIMEUNIT+isErrorCheckStr;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                }
            });
        }
    }
});

Object.defineProperty(oDataHandle, 'getAllGroupOrg', {
    value: function(dispatch,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetOrganization?token="+token;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                    dispatch(requestDataActions.setRequestFail());
                }
            });
        }
    }
});
Object.defineProperty(oDataHandle, 'saveCreateGroup',{
  value: function(data,callback) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    if(token != '') {
        //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
        var rquestUri = serviceAddress+"SetOrganization?token="+token;
        //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
        rquestUri = encodeURI(rquestUri);
        $.ajax({
            type: "get",
            async: true,
            data:data,
            url:rquestUri,
            dataType: "json",
            cache:false,
            success : function(result){
                callback(result.d);
            },error : function(result){
                Util.customInterfaceInfo(result);
            }
        });
    }
  }
});
Object.defineProperty(oDataHandle, 'deleteOrganization', {
    value: function(filters, callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            var filterString="";
            if(filters != null){
                filters.map(function(obj,i){
                    var key = obj.key;
                    var value = obj.value;
                    if(filterString == ""){
                        filterString = "&"+key+"="+"'"+value+"'";
                    }else{
                        filterString += "&"+key+"="+"'"+value+"'";
                    }
                });
            }
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"DeleteOrganization?token="+token+filterString;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                }
            });
        }
    }
});

Object.defineProperty(oDataHandle, 'getSafeGroups', {
    value: function(dispatch,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetSafeGroups?token="+token;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                    dispatch(requestDataActions.setRequestFail());
                }
            });
        }
    }
});
Object.defineProperty(oDataHandle, 'getUserOrganization', {
    value: function(filters,dispatch, callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            var filterString="";
            if(filters != null){
                filters.map(function(obj,i){
                    var key = obj.key;
                    var value = obj.value;
                    if(filterString == ""){
                        filterString = "&"+key+"="+"'"+value+"'";
                    }else{
                        filterString += "&"+key+"="+"'"+value+"'";
                    }
                });
            }
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetUserOrganization?token="+token+filterString;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                    dispatch(requestDataActions.setRequestFail());
                }
            });
        }
    }
});
Object.defineProperty(oDataHandle, 'getPureOrganization', {
    value: function(filters, dispatch,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            var filterString="";
            if(filters != null){
                filters.map(function(obj,i){
                    var key = obj.key;
                    var value = obj.value;
                    if(filterString == ""){
                        filterString = "&"+key+"="+"'"+value+"'";
                    }else{
                        filterString += "&"+key+"="+"'"+value+"'";
                    }
                });
            }
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetPureOrganization?token="+token+filterString;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                    dispatch(requestDataActions.setRequestFail());
                }
            });
        }
    }
});
Object.defineProperty(oDataHandle, 'sysUser', {
    value: function(filters, callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            var filterString="";
            if(filters != null){
                filters.map(function(obj,i){
                    var key = obj.key;
                    var value = obj.value;
                    if(filterString == ""){
                        filterString = "&"+key+"="+"'"+value+"'";
                    }else{
                        filterString += "&"+key+"="+"'"+value+"'";
                    }
                });
            }
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            // var rquestUri = serviceAddress+"SysUser?token="+token+filterString;
            var rquestUri = serviceAddress+"SetUser?token="+token+filterString;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                    //console.log("Get/Set sysUser error")
                    // if(filters != null){
                    //     filters.map(function(obj,i){
                    //         var key = obj.key;
                    //         var value = obj.value;
                    //         if(key == "OPERATOR_TYPE" && value == "ADD") {
                    //             alert("新建用户失败！");
                    //         }
                    //         else if(key == "OPERATOR_TYPE" && value == "EDIT") {
                    //             alert("修改用户失败！");
                    //         }
                    //         else if(key == "OPERATOR_TYPE" && value == "DELETE") {
                    //             alert("删除用户失败！");
                    //         }
                    //     });
                    // }
                }
            });
        }
    }
});

Object.defineProperty(oDataHandle, 'changePassword', {
    value: function(filters, callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            var filterString="";
            if(filters != null){
                filters.map(function(obj,i){
                    var key = obj.key;
                    var value = obj.value;
                    if(filterString == ""){
                        filterString = "&"+key+"="+"'"+value+"'";
                    }else{
                        filterString += "&"+key+"="+"'"+value+"'";
                    }
                });
            }
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            // var rquestUri = serviceAddress+"SysUser?token="+token+filterString;
            var rquestUri = serviceAddress+"ChangePassword?token="+token+filterString;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                    //alert("修改密码失败！");
                }
            });
        }
    }
});

//Reset by Yuchen
Object.defineProperty(oDataHandle, 'getRoleManageData',{
  value: function(dispatch,callback) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    var response = {}, rquestUri = "";
    if(token != '') {
        rquestUri = encodeURI(serviceAddress+"GetOrganization?token="+token);
        $.ajax({//获取组织机构列表
            type: "get",
            async: true,
            url: rquestUri,
            dataType: "json",
            cache:false,
            success : function(result1){
                response.groups = result1;
                rquestUri = encodeURI(serviceAddress+"GetRole?OPERATOR_TYPE='GET'&token="+token);
                $.ajax({//获取角色列表
                    type: "get",
                    async: true,
                    url: rquestUri,
                    dataType: "json",
                    cache:false,
                    success : function(result2){
                        response.roles = result2;
                        rquestUri = encodeURI(serviceAddress+"SetUser?OPERATOR_TYPE='GET'&token="+token);
                        $.ajax({//获取用户列表
                            type: "get",
                            async: false,
                            url: rquestUri,
                            dataType: "json",
                            cache:false,
                            success : function(result3){
                                response.users = result3;
                                callback(response);
                            },
                            error : function(result){
                                Util.customInterfaceInfo(result);
                                dispatch(requestDataActions.setRequestFail());
                            }
                        });
                    },
                    error : function(result){
                        Util.customInterfaceInfo(result);
                        dispatch(requestDataActions.setRequestFail());
                    }
                });
            },
            error : function(result){
                Util.customInterfaceInfo(result);
                dispatch(requestDataActions.setRequestFail());
            }
        });
    }
  }
});
Object.defineProperty(oDataHandle, 'getNotRoleUsers',{//获取非指定角色的用户
  value: function(dataObjec,callback,errorCallback) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    var response = {}, rquestUri = "";
    if(token != '') {
        rquestUri = encodeURI(serviceAddress+"GetNotRoleUsers?ROLE_NAME='"+dataObjec.ROLE_NAME+"'&token="+token);
        $.ajax({
            type: "get",
            async: true,
            url: rquestUri,
            dataType: "json",
            cache:false,
            success : function(result){
                response = result;
                if(callback) callback(response);
            },
            error : function(result){
                response = result;
                if(errorCallback) errorCallback(response);
                Util.customInterfaceInfo(result);
            }
        });
    }
  }
});
Object.defineProperty(oDataHandle, 'addRole',{
  value: function(data, callback, error) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    if(token != '') {
        var rquestUri = serviceAddress+"SysRole?OPERATOR_TYPE='ADD'&ORANIZATION_NAME='"+data.group+"'&ROLE_NAME='"+data.role+"'&ROLE_DESC='"+data.desc+"'&token="+token;
        var response = {};
        rquestUri = encodeURI(rquestUri);
        $.ajax({
            type: "get",
            async: true,
            url:rquestUri,
            dataType: "json",
            cache:false,
            success : function(result){
                response.result = result;
                callback(response);
            },
            error : function(result){
                if(error) error(result.statusText);
                Util.customInterfaceInfo(result);
            }
        });
    }
  }
});
Object.defineProperty(oDataHandle, 'editRole',{
  value: function(data, callback, error) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    if(token != '') {
        var rquestUri = serviceAddress+"SysRole?OPERATOR_TYPE='EDIT'&ROLE_NAME='"+data.role+"'&OLD_ROLE_NAME='"+data.old_role+"'&ROLE_DESC='"+data.desc+"'&token="+token;
        var response = {};
        rquestUri = encodeURI(rquestUri);
        $.ajax({
            type: "get",
            async: true,
            url:rquestUri,
            dataType: "json",
            cache:false,
            success : function(result){
                response.result = result;
                callback(response);
            },
            error : function(result){
                if(error) error(result.statusText);
                Util.customInterfaceInfo(result);
            }
        });
    }
  }
});
Object.defineProperty(oDataHandle, 'getOrganizationPwd',{
  value: function(id,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Organization";
          newObj.type = "query";
          newObj.filter = {"key":"RecId","value":id};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
    }
  });
Object.defineProperty(oDataHandle, 'deleteRoles',{//批量删除角色
  value: function(dataObjec, callback, errorCallback) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    var response = {};
    if(token != '') {
        var index = 0;
        if(!dataObjec[index]) return;
        try{
            recursive(dataObjec[index]);
        }
        catch(e){
            errorCallback(e.message);
        }
        function recursive(data){
            var rquestUri = encodeURI(serviceAddress+"SysRole?OPERATOR_TYPE='DELETE'&ROLE_NAME='"+data.ROLE_NAME+"'&token="+token);
            $.ajax({
                 type: "get",
                 async: true,
                 url: rquestUri,
                 dataType: "json",
                 cache:false,
                 success : function(result){
                     response.result = result;
                     if(dataObjec[++index]){
                         recursive(dataObjec[index]);
                     }
                     else{
                         callback(response);
                     }
                 },
                 error : function(result){
                     if(errorCallback) errorCallback(result);
                     Util.customInterfaceInfo(result);
                 }
            });
        }
    }
  }
});
Object.defineProperty(oDataHandle, 'removeUsersFromRole',{//批量从角色移除用户
  value: function(param, callback, errorCallback) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    var dataObjec = param.selections;
    var roleName = param.roleName;
    var response = {};
    if(token != '') {
        var ids = "";
        for(var i in dataObjec){
            ids += dataObjec[i].LOGIN_ID;
            if(i!=dataObjec.length-1) ids += ",";
        }
        var rquestUri = encodeURI(serviceAddress+"DeleteUserRole?ROLE_NAME='"+roleName+"'&LOGIN_ID='"+ids+"'&token="+token);
        $.ajax({
             type: "get",
             async: true,
             url: rquestUri,
             dataType: "json",
             cache:false,
             success : function(result){
                 response.result = result;
                 if(callback) callback(response);
             },
             error : function(result){
                 if(errorCallback) errorCallback(result);
                 Util.customInterfaceInfo(result);
             }
        });
    }
  }
});
Object.defineProperty(oDataHandle, 'createUserRoles',{//添加多个用户到角色
  value: function(param,callback,errorCallback) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    var dataObjec = param.data;
    var roleName = param.roleName;
    var response = {}, rquestUri = "";
    if(token != '') {
        var index = 0;
        if(!dataObjec[index]) return;
        try{
            recursive(dataObjec[index]);
        }
        catch(e){
            errorCallback(e.message);
        }
        function recursive(data){
            var newObj = {};
            newObj.tableName ="UserRole";
            newObj.type = "add";
            var updateObjec = {
                RoleId: roleName,
                UserId: data.id,
            };
            newObj.updateObjec = updateObjec;
            oDataHandle.handle(
                newObj,
                function(resp) {
                    if(dataObjec[++index]){
                        recursive(dataObjec[index]);
                    }
                    else{
                        callback(resp);
                    }
                },
                function(resp) {
                    if(errorCallback) errorCallback(resp);
                }
            );
        }
    }
  }
});
Object.defineProperty(oDataHandle, 'getOperationPermissions', {
    value: function(name, dispatch,callback) {
        token = Store.get("token");
        servletAddress = Store.get("servletServiceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = servletAddress+"opResourcePermissions?token="+token;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "POST",
                async: true,
                url:rquestUri,
                data:{ROLE_NAME:name,OPERATOR_TYPE:"GET"},
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result);
                },error : function(result){
                  Util.customInterfaceInfo(result);
                  dispatch(requestDataActions.setRequestFail());
                }
            });
        }
    }
});
Object.defineProperty(oDataHandle, 'deleteOperationPermissions', {
    value: function(name, callback) {
        token = Store.get("token");
        servletAddress = Store.get("servletServiceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = servletAddress+"opResourcePermissions?token="+token;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "POST",
                async: true,
                url:rquestUri,
                data:{ROLE_NAME:name,OPERATOR_TYPE:"DELETE"},
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                }
            });
        }
    }
});
Object.defineProperty(oDataHandle, 'addOperationPermissions', {
    value: function(param, callback) {
        token = Store.get("token");
        servletAddress = Store.get("servletServiceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = servletAddress+"opResourcePermissions?token="+token;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "POST",
                async: true,
                url:rquestUri,
                data:{ROLE_NAME:param.name,OPERATOR_TYPE:"ADD",PERMISSIONS:param.group},
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                }
            });
        }
    }
});
Object.defineProperty(oDataHandle, 'editOperationPermissions', {
    value: function(param, callback) {
        token = Store.get("token");
        servletAddress = Store.get("servletServiceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = servletAddress+"opResourcePermissions?token="+token;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "POST",
                async: true,
                url:rquestUri,
                data:{ROLE_NAME:param.name,OPERATOR_TYPE:"EDIT",PERMISSIONS:param.group,EDIT_PERMISSIONS:param.newgroup},
                dataType: "json",
                cache:false,
                success : function(result){
                    callback(result);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                }
            });
        }
    }
});

Object.defineProperty(oDataHandle, 'getSysMapData',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="DictionaryData";
          newObj.type = "query";
          newObj.filter = {"key":"DictNo","value":"tptjb"};
          newObj.token = token;
          newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle,'handle',{
    value: function(object, callback, errorCallback){
        var joint="",
            recid="";
        if(object.recId){
            recid = "('"+object.recId+"')";
        };
        if(object.filter){
            if(object.filter.length > 1){
                var tempstring="&$filter="
                object.filter.map(function(obj,i){
                    if(i==0){
                        tempstring += obj.key+" eq'"+obj.value+"' ";
                    }else{
                        tempstring += "and "+obj.key+" eq'"+obj.value+"' ";
                    };
                });
                joint += tempstring
            }else{
                joint += "&$filter="+object.filter.key+" eq'"+object.filter.value+"' ";
            };
        };
        if(object.orderby){
            joint += "&$orderby="+object.orderby.key+" "+object.orderby.sort;
        };
        serviceAddress = Store.get("serviceUrl");
        var rquestUri = serviceAddress+object.tableName+recid+"?token="+token+joint;
        var headers = { 'Cache-Control': 'no-cache', Pragma: 'no-cache' };
        switch(object.type){
            case "query":
                OData.request({
                        requestUri: rquestUri,
                        headers: headers,
                        method: "GET"
                    },
                    function success(data, response) {
                        //console.log("查询成功",data);
                        callback(data);
                    },
                    function error(err) {
                        //console.log("查询失败",err.message);
                        if(errorCallback) errorCallback(err.message||err);
                        Util.oDataInterfaceInfo(err);
                    });
                break;
            case "update":
                OData.request({
                        requestUri:rquestUri,
                        method: "PUT",
                        headers: headers,
                        data:object.updateObjec
                    },
                    function success(data, response) {
                        //console.log("更新成功","success");
                        callback("success");
                    },
                    function error(err) {
                        //console.log("更新失败",err.message);
                        if(errorCallback) errorCallback(err.message||err);
                        Util.oDataInterfaceInfo(err);
                    });
                break;
            case "add":
                OData.request({
                        requestUri: rquestUri,
                        method: "POST",
                        headers: headers,
                        data:object.updateObjec
                    },
                    function success(data, response) {
                        //console.log("添加成功",data);
                        callback(data);
                    },
                    function error(err) {
                        //console.log("添加失败",err.message);
                        if(errorCallback) errorCallback(err.message||err);
                        Util.oDataInterfaceInfo(err);
                    });
                break;
            case "delete":
                OData.request({
                        requestUri: rquestUri,
                        headers: headers,
                        method: "DELETE"
                    },
                    function success(data, response) {
                        //console.log("删除成功",data);
                        callback(data);
                    },
                    function error(err) {
                        //console.log("删除失败",err.message);
                        if(errorCallback) errorCallback(err.message||err);
                        Util.oDataInterfaceInfo(err);
                    });
                break;
        }
    }
});

module.exports = oDataHandle;
