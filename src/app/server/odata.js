var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');
// Store.get_ServiceAddress();
// Store.get_tokenVerify();
// Store.get_mapUrl();
var serviceAddress = Store.get("serviceUrl");
var tokenVerify = Store.get("tokenUrl");

var oDataHandle = function(){}
var portletData = Store.get_portletData();
var token ="";

//正常登录调的接口
Object.defineProperty(oDataHandle,'getToken',{
	value: function(user, callback){
		$.getJSON("./path.json",function(data){
				var host = window.location.host;//"yft.siteview.com";
				var href = window.location.href;//"http://yft.siteview.com/nds/yft/index.html#/";
				var hostwz = href.indexOf(host) + host.length;
				var newaddress = href.substring(hostwz);
				var yftwz = newaddress.indexOf("/yft/");
				var correction = "";//获取是不是需要修改服务器访问地址
				if(yftwz > 0){
					var tempstr = newaddress.substring(0,yftwz);
					if(tempstr){
						correction = tempstr;
					};
				};
				//设置是否弹出显示，认证过期或服务器连接失败窗口；0 可以显示 1 不显示
				Store.set("showinfo",0);
				serviceAddress = correction+data.ServiceAddress;
				Store.set("serviceUrl",serviceAddress);
				tokenVerify = correction+data.TokenVerify;
				Store.set("tokenUrl",tokenVerify);
				Store.set("mapUrl",data.mapUrl);
				Store.set("servletServiceUrl",correction+data.ServletServiceAddress);
				//var pwd = base64.base64encode(encodeURI(user.password));
				var pwd = user.password;
				Store.set("localUserName",user.username);
				Store.set("itossUrl",data.ServiceItoss);
				$.ajax({
					type: "get",
					async: false,
					url: tokenVerify,
					dataType: "json",
					cache:false,
					data: {
						user:user.username,
						passwd:pwd
					},
					success: function (data) {
						if(data.result =="ok"){
							token =  data.token;
							Store.set("token",token);
							Store.set("multi_roles", data.multi_roles);
							if(data.multi_roles == "1") {
								Store.set("roles", data.roles);
								callback(data);
							}
							else {
								Store.set("CURRENT_ROLENAME", data.roles);
								oDataHandle.queryGetUserInfo(user.username,function(data){
									//console.log(data);
									callback(data);
								});
							}
							//console.log("token = ",token);
						}else {
							callback(data);
						}
					},
					timeout: 5000,
					error: function (data) {
						callback(data);
						//  Util.customInterfaceInfo(data);
						//console.log("获取token失败！"+data);
					}
				});
		});
	}
});
Object.defineProperty(oDataHandle, 'queryGetUserInfo', {
	value: function(loginid,callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			// newObj.filter ={key:"RecId",value:WorkOrderID};
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
					 //console.log("Get UserInfo error")
					//  if(result.status == 200){
						 var tempdata=[];
						 var tempvalue={
							 USER_ID:''
						 };
						 tempdata.push(tempvalue);
						 var datavalue = {
							 results:tempdata
						 };
						 callback(datavalue);
					//  }else {
					//  		Util.customInterfaceInfo(result);
					//  }
				 }
			});
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandle, 'queryGetUserInfoTwo', {
	value: function(tokens,callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(tokens != '') {
			var rquestUri = serviceAddress+"GetUserInfo"
			$.ajax({
				 type: "get",
				 async: false,
				 url:rquestUri,
				 dataType: "json",
				 cache:false,
				 data: {
					 token: tokens
				 },
				 success : function(result){
						 callback(result.d)
				 },error : function(result){
					  Util.customInterfaceInfo(result);
						 //console.log("Get UserInfo error")
				 }
			});
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandle, 'GetCurrentRole', {
	value: function(callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			var rquestUri = serviceAddress+"GetCurrentRole"
			$.ajax({
				 type: "get",
				 async: false,
				 url:rquestUri,
				 dataType: "json",
				 cache:false,
				 data: {
					 token: token
				 },
				 success : function(result){
						 callback(result.d)
				 },error : function(result){
					  Util.customInterfaceInfo(result);
						 //console.log("Get CurrentRole error")
				 }
			});
		} else {
			//console.log('token -  not null');
		}
	}
});
Object.defineProperty(oDataHandle, 'GetCurrentRoleTwo', {
	value: function(tokens,callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(tokens != '') {
			var rquestUri = serviceAddress+"GetCurrentRole"
			$.ajax({
				 type: "get",
				 async: false,
				 url:rquestUri,
				 dataType: "json",
				 cache:false,
				 data: {
					 token: tokens
				 },
				 success : function(result){
						 callback(result.d)
				 },error : function(result){
					  Util.customInterfaceInfo(result);
						 //console.log("Get CurrentRole error")
				 }
			});
		} else {
			//console.log('token -  not null');
		}
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
						 //console.log("Get CurrentRole error")
				 }
			});
		} else {
			//console.log('token -  not null');
		}
	}
});

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
						 //console.log("Get CurrentRole error")
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


Object.defineProperty(oDataHandle,'handle',{
	value: function(object, callback){
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
										Util.oDataInterfaceInfo(err);
                    //console.log("查询失败",err.message);
                });
                break;
            case "update":
								console.log(object.updateObjec);
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
										Util.oDataInterfaceInfo(err);
                    //console.log("更新失败",err.message);
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
										Util.oDataInterfaceInfo(err);
                    //console.log("添加失败",err.message);
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
									  Util.oDataInterfaceInfo(err);
                    //console.log("删除失败",err.message);
                });
                break;
        }
	}
});


Object.defineProperty(oDataHandle, 'queryPortletData', {
	value: function(pageid,callback){
		if(pageid != '') {
			var rquestUri = portletData;//@MODIFY
			$.ajax({
				 type: "get",
				 async: false,
				 url:rquestUri,
				 cache:false,
				 success : function(data){
						 callback(data);
				 },error : function(result){
					   Util.customInterfaceInfo(result);
						 //console.log("Error");
				 }
			});
		}
		else {
			//console.log('page id -  not null');
		}
	}
});

Object.defineProperty(oDataHandle, 'updatePortletData', {
	value: function(pageid,data,callback){
		if(pageid != '') {
			var rquestUri = portletData;//@MODIFY
			$.ajax({
				 type: "get",
				 async: false,
				 url:rquestUri,
				 cache:false,
				 success : function(){
						 callback("success");
				 },error : function(result){
						 callback("error");
						 Util.customInterfaceInfo(result);
						 //console.log("Error");
				 }
			});
		}
		else {
			//console.log('page id -  not null');
		}
	}
});

module.exports = oDataHandle;
