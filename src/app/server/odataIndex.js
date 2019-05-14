var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');
import * as requestDataActions from '../actions/requestData_action'
var serviceAddress = Store.get("serviceUrl");
var tokenVerify = Store.get("tokenUrl");

var oDataHandle = function(){}
var portletData = Store.get_portletData();
var token ="";

Object.defineProperty(oDataHandle, 'SelectUserRole', {
	value: function(filters,callback) {
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
			};
			var rquestUri = serviceAddress+"SelectUserRole?token="+token+filterString;
			//Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
			rquestUri = encodeURI(rquestUri);
			$.ajax({
				 type: "get",
				 async: false,
				 url:rquestUri,
				 dataType: "json",
				 cache:false,
				 success : function(result){
						 callback(result.d)
				 },error : function(result){
						 Util.customInterfaceInfo(result);
				 }
			});
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandle, 'queryGetUserInfo', {
	value: function(loginid,callback) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
		if(token) {
			var rquestUri = serviceAddress+"GetUserInfo"
			$.ajax({
				 type: "get",
				 async: false,
				 url:rquestUri,
				 dataType: "json",
				 cache:false,
				 data: {
					 token: token,
					 LOGIN_ID:"'"+loginid+"'"
				 },
				 success : function(result){
						 callback(result.d)
				 },error : function(result){
					  // if(result.status == 200){
							var tempdata=[];
							var tempvalue={
								USER_ID:''
							};
							tempdata.push(tempvalue);
							var datavalue = {
								results:tempdata
							};
							callback(datavalue);
					  // }else {
					  // 		Util.customInterfaceInfo(result);
					  // }
				 }
			});
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandle, 'getVersion', {
	value: function(callback) {
		var servletService = Store.get("servletServiceUrl");
    var rquestUri = servletService+"GetLastVersion";
		$.ajax({
			 type: "get",
			 async: true,
			 url:rquestUri,
			 dataType: "json",
			 cache:false,
			 success : function(result){
					 //callback(result.d)
			 },
			 error : function(result){
					 //console.log(result.responseText)
					 callback(result.responseText);
			 }
		});
	}
});

//获取用户权限
Object.defineProperty(oDataHandle, 'GetCurrentPermissions', {
	value: function(filters,callback) {
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
			};
			var rquestUri = serviceAddress+"GetResourcePermissions?token="+token+filterString;
			//Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
			rquestUri = encodeURI(rquestUri);
			//console.log("获取权限url地址："+rquestUri);
			$.ajax({
				 type: "get",
				 async: false,
				 url:rquestUri,
				 dataType: "json",
				 cache:false,
				 success : function(result){
						 callback(result.d)
				 },error : function(result){
						 Util.customInterfaceInfo(result);
				 }
			});
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandle, 'getCityIndexData', {
    value: function(dispatch, callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetYFTMunicipalHome?token="+token;
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
Object.defineProperty(oDataHandle, 'changeCityIndexData', {
    value: function(type,dispatch,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetYFTMunicipalHomeDeatil?token="+token+"&TYPE='"+type+"'";
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
Object.defineProperty(oDataHandle, 'getDepartmentIndexData', {
    value: function(dispatch, callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetYFTDepartmentalHome?token="+token;
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
Object.defineProperty(oDataHandle, 'changeDepartmentIndexData', {
    value: function(type,dispatch,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetYFTDepartmentalHomeDetail?token="+token+"&TYPE='"+type+"'";
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
Object.defineProperty(oDataHandle, 'getReportErrorList', {
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
                    };
                });
            };
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetUploadAlarm?token="+token+filterString;
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
Object.defineProperty(oDataHandle, 'getReportErrorListUI', {
    value: function(dispatch, callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetUploadAlarmUI?token="+token;
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

Object.defineProperty(oDataHandle, 'updateErrorUpload', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="AlarmUpload";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
        newObj.token = token;
				newObj.updateObjec = dateObjec;
				oDataHandle.handle(newObj, function(resp) {
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandle, 'getAllBusObDefNames', {
	value: function(filters,callback) {
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
			};
			var rquestUri = serviceAddress+"BusObDefOperator?token="+token+filterString;
			//Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
			rquestUri = encodeURI(rquestUri);
			$.ajax({
				 type: "get",
				 async: false,
				 url:rquestUri,
				 dataType: "json",
				 cache:false,
				 success : function(result){
						 callback(result.d)
				 },error : function(result){
						 Util.customInterfaceInfo(result);
				 }
			});
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandle, 'getBusObDefFields', {
	value: function(filters,callback) {
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
			};
			var rquestUri = serviceAddress+"BusObDefOperator?token="+token+filterString;
			//Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
			rquestUri = encodeURI(rquestUri);
			$.ajax({
				 type: "get",
				 async: false,
				 url:rquestUri,
				 dataType: "json",
				 cache:false,
				 success : function(result){
						 callback(result.d)
				 },error : function(result){
						 Util.customInterfaceInfo(result);
				 }
			});
		} else {
			//console.log('token -  not null');
		}
	}
});
Object.defineProperty(oDataHandle, 'saveExcelDataToSpace',{
  value: function(tableName,tableData,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName = tableName;
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec =tableData;
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
                //console.log(object.updateObjec);
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
                        console.log("添加成功",data);
                        callback(data);
                    },
                    function error(err) {
                        console.log("添加失败",err);
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
