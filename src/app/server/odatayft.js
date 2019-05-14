var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');

var oDataHandleYFT = function(){}
// Store.get_ServiceAddress();
// Store.get_ServletServiceAddress();
// Store.get_tokenVerify();
var serviceAddress = Store.get("serviceUrl");
var servletServiceAddress = Store.get("servletServiceUrl");
var tokenVerify = Store.get("tokenUrl");
var rquestUri = "";

var token ="";
var debug = false;

Object.defineProperty(oDataHandleYFT,'handle',{
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
                    //console.log("查询失败",err.message);
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
                    //console.log("更新成功",data);
										callback(data);
                },
                function error(err) {
                    //console.log("更新失败",err.message);
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
										Util.oDataInterfaceInfo(err);
                });
                break;
        }
	}
});

Object.defineProperty(oDataHandleYFT, 'getDeviceMonitorTree', {
	value: function(filters,callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			// var rquestUri = serviceAddress+"GetCNFTree?token="+token;
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
			var rquestUri = serviceAddress+"GetCNFTree?token="+token+filterString;
			//Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
			rquestUri = encodeURI(rquestUri);
			$.ajax({
				 type: "get",
				 async: true,
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

Object.defineProperty(oDataHandleYFT, 'getDeviceMonitorTreeByType', {
	value: function(filters,callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			// var rquestUri = serviceAddress+"GetCNFTree?token="+token;
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
			var rquestUri = serviceAddress+"GetCNFTreeByType?token="+token+filterString;
			//Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
			rquestUri = encodeURI(rquestUri);
			$.ajax({
				 type: "get",
				 async: true,
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

Object.defineProperty(oDataHandleYFT, 'getGroupList', {
	value: function(filters,callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			// GROUPID=54BDCB5114534D619FFDFBFE78974999&NAME=DVR  这两是必须的条件
			//&STATUS=good&NODEID=se 这两个是可选条件
			var filterString="", bAsync=true;
			if(filters != null){
					filters.map(function(obj,i){
							var key = obj.key;
							var value = obj.value;
							if(key != "async") {
								if(filterString == ""){
										filterString = "&"+key+"="+"'"+value+"'";
								}else{
										filterString += "&"+key+"="+"'"+value+"'";
								};
							}
							else {
								bAsync = value;
							}
					});
			};
			//url 地址中可能包括中文字符所以需要对此生成 地址进行转码
			var rquestUri = serviceAddress+"GetGroupList?token="+token+filterString;
			//Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
			rquestUri = encodeURI(rquestUri);
			$.ajax({
				 type: "get",
				 async: bAsync,
				 url:rquestUri,
				 dataType: "json",
				 cache:false,
				 success : function(result){
						 callback(result.d);
				 },error : function(result){
						 Util.customInterfaceInfo(result);
				 }
			});
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandleYFT, 'setDisplayOrder', {
	value: function(filters,callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			// DISPLAYORDER=json字符串  这是必须的条件
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
			var rquestUri = serviceAddress+"SetDisplayOrder?token="+token+filterString;
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
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandleYFT, 'getTearmList', {
	value: function(filters,callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			// GROUPID='54BDCB5114534D619FFDFBFE78974999'&TYPE='1'
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
			var rquestUri = serviceAddress+"GetTearmList?token="+token+filterString;
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
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandleYFT, 'getVideoLoss', {
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
							};
					});
			};
			//url 地址中可能包括中文字符所以需要对此生成 地址进行转码
			var rquestUri = serviceAddress+"GetVideoLoss?token="+token+filterString;
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
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandleYFT, 'getChannelInfo', {
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
							};
					});
			};
			//url 地址中可能包括中文字符所以需要对此生成 地址进行转码
			var rquestUri = serviceAddress+"GetStorageAisle?token="+token+filterString;
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
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandleYFT, 'insertUserFeedBack', {//插入用户反馈，无则添加，有则先删除再增加
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			newObj.tableName ="UserFeedBack";
			newObj.type = "query";
			newObj.filter = {"key":"VIDEOFLAG","value":param.data.VIDEOFLAG};
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(resp.results.length == 0) {
						var newObj_add = {};
						newObj_add.tableName ="UserFeedBack";
						newObj_add.type = "add";
						newObj_add.updateObjec = param.data;
						oDataHandleYFT.handle(
							newObj_add,
							function(resp) {
								if(param&&param.callback) param.callback(resp);
							},
							function(resp) {
								if(param&&param.error) param.error(resp);
							}
						);
					}
					else {
						var newObj_delete = {};
						newObj_delete.tableName ="UserFeedBack";
						newObj_delete.type = "delete";
						newObj_delete.recId = resp.results[0].RecId;
						// newObj_delete.filter = {"key":"VIDEOFLAG","value":param.data.VIDEOFLAG};
						oDataHandleYFT.handle(
							newObj_delete,
							function(resp) {
								var newObj_add = {};
								newObj_add.tableName ="UserFeedBack";
								newObj_add.type = "add";
								newObj_add.updateObjec = param.data;
								oDataHandleYFT.handle(
									newObj_add,
									function(resp) {
										if(param&&param.callback) param.callback(resp);
									},
									function(resp) {
										if(param&&param.error) param.error(resp);
									}
								);
							},
							function(resp) {
								if(param&&param.error) param.error(resp);
							}
						);
					}
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});

Object.defineProperty(oDataHandleYFT, 'updateUserFeedBack', {//更新用户反馈，无则添加，有则更新
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			newObj.tableName ="UserFeedBack";
			newObj.type = "query";
			newObj.filter = {"key":"VIDEOFLAG","value":param.data.VIDEOFLAG};
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(resp.results.length == 0) {
						var newObj_add = {};
						newObj_add.tableName ="UserFeedBack";
						newObj_add.type = "add";
						newObj_add.updateObjec = param.data;
						oDataHandleYFT.handle(
							newObj_add,
							function(resp) {
								if(param&&param.callback) param.callback(resp);
							},
							function(resp) {
								if(param&&param.error) param.error(resp);
							}
						);
					}
					else {
						var newObj_update = {};
						newObj_update.tableName ="UserFeedBack";
						newObj_update.type = "update";
						newObj_update.updateObjec = param.data;
						newObj_update.recId = resp.results[0].RecId;
						oDataHandleYFT.handle(
							newObj_update,
							function(resp) {
								if(param&&param.callback) param.callback(resp);
							},
							function(resp) {
								if(param&&param.error) param.error(resp);
							}
						);
					}
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});

Object.defineProperty(oDataHandleYFT, 'getYFTAlarm', {
    value: function(callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetYFTAlarm?token="+token;
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

Object.defineProperty(oDataHandleYFT, 'setYFTAlarm', {
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
                    };
                });
            };
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"SetYFTAlarm?token="+token+filterString;
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

Object.defineProperty(oDataHandleYFT, 'getAlarmIssued', {
    value: function(callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetAlarmIssued?token="+token;
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
										//alert("获取告警规则失败");
                }
            });
        }
    }
});

Object.defineProperty(oDataHandleYFT, 'setAlarmIssued', {
    value: function(filters, callback) {
        token = Store.get("token");
        // serviceAddress = Store.get("serviceUrl");
		    servletServiceAddress = Store.get("servletServiceUrl");
        if(token != '') {
            var filterString="";
			var data = {token: token};
            if(filters != null){
                filters.map(function(obj,i){
                    var key = obj.key;
                    var value = obj.value;
					// data[key] = value;
                    if(filterString == ""){
											filterString = "&"+key+"="+value;
                    }else{
											filterString += "&"+key+"="+value;
                    };
                });
            };
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = servletServiceAddress+"alarmIssued?token="+token+filterString;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "post",
                async: true,
                url:rquestUri,
                dataType: "json",
								cache:false,
                success : function(result){
                    callback(result);
                },error : function(result){
                    Util.customInterfaceInfo(result);
										//alert("保存告警规则失败");
                }
            });
        }
    }
});

Object.defineProperty(oDataHandleYFT, 'deleteAlarmIssued', {
    value: function(filters, callback) {
        token = Store.get("token");
        // serviceAddress = Store.get("serviceUrl");
		servletServiceAddress = Store.get("servletServiceUrl");
        if(token != '') {
            var filterString="";
            if(filters != null){
                filters.map(function(obj,i){
                    var key = obj.key;
                    var value = obj.value;
                    if(filterString == ""){
                        filterString = "&"+key+"="+value;
                    }else{
                        filterString += "&"+key+"="+value;
                    };
                });
            };
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = servletServiceAddress+"deleteAlarmIssued?token="+token+filterString;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
								cache:false,
				        success : function(result){
                    callback(result);
                },error : function(result){
                    Util.customInterfaceInfo(result);
										//alert("删除告警规则失败");
                }
            });
        }
    }
});

Object.defineProperty(oDataHandleYFT, 'getAlarmEvent', {
    value: function(filters, callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            var filterString="", bAsync=true;
            if(filters != null){
                filters.map(function(obj,i){
                    var key = obj.key;
                    var value = obj.value;
										if(key != "async") {
											if(filterString == ""){
	                        filterString = "&"+key+"="+"'"+value+"'";
	                    }else{
	                        filterString += "&"+key+"="+"'"+value+"'";
	                    };
										} else {
											bAsync = value;
										}
                });
            };
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetAlarmEvent?token="+token+filterString;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
						console.log("告警事件列表数据请地址：");
						console.log(rquestUri);
            $.ajax({
                type: "get",
                async: bAsync,
                url:rquestUri,
                dataType: "json",
				        cache:false,
                success : function(result){
									  console.log("告警事件列表数据");
										console.log(result.d);
                    callback(result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                }
            });
        }
    }
});

Object.defineProperty(oDataHandleYFT, 'getAlarmDetails', {
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
							};
					});
			};
			//url 地址中可能包括中文字符所以需要对此生成 地址进行转码
			var rquestUri = serviceAddress+"GetAlarmDetails?token="+token+filterString;
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
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandleYFT, 'updateAlarmEventStatus', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="AlarmEvent";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
				oDataHandleYFT.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandleYFT, 'getIsCreateWorkOrder', {
	value: function(gbcode,callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			// newObj.filter ={key:"RecId",value:WorkOrderID};
			var rquestUri = serviceAddress+"IsCreateWorkOrder"
			$.ajax({
				 type: "get",
				 async: true,
				 url:rquestUri,
				 dataType: "json",
				 cache:false,
				 data: {
					 token: token,
					 GBCODE:"'"+gbcode+"'"
				 },
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

Object.defineProperty(oDataHandleYFT, 'getWorkOrderToMonitorData', {
	value: function(filters,callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			// var rquestUri = serviceAddress+"GetCNFTree?token="+token;
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
			var rquestUri = serviceAddress+"WorkOrderMonitor?token="+token+filterString;
			//Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
			rquestUri = encodeURI(rquestUri);
			$.ajax({
				 type: "get",
				 async: true,
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

//reset by Yuchen
Object.defineProperty(oDataHandleYFT, 'getAlarmLogList', {
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			rquestUri = serviceAddress+"GetAlarmLog?token="+token+"&";
			if(param&&param.data){
				rquestUri += "FROM='"+param.data.from+"'";
				rquestUri += "&TO='"+param.data.to+"'";
				if(param.data.startTime) rquestUri += "&STARTTIME='"+param.data.startTime+"'";
				if(param.data.endTime) rquestUri += "&ENDTIME='"+param.data.endTime+"'";
				if(param.data.device) rquestUri += "&EQUIPMENT_ID='"+param.data.device+"'";
				if(param.data.name) rquestUri += "&ALARM_NAME='"+param.data.name+"'";
				if(param.data.sort_name&&param.data.sort_order){
					var sort_name = param.data.sort_name[0].toUpperCase();
					sort_name += param.data.sort_name.substr(1,param.data.sort_name.length);
					rquestUri += "&ORDERBY='"+sort_name+" "+param.data.sort_order.toUpperCase()+"'";
				}
			}
			rquestUri = encodeURI(rquestUri);
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({
				type: "get",
				async: true,
				url:rquestUri,
				dataType: "json",
				cache:false,
				success : function(result){
					if(debug) console.log("[获取数据]",result);
					if(param.callback) param.callback(result);
				},
				error : function(result){
					if(param.error) param.error(result);
					Util.customInterfaceInfo(result);
				}
			});
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getAlarmDeviceList', {//获取告警设备列表
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			newObj.tableName ="Equipment";
			newObj.type = "query";
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getAlarmNameList', {//获取告警名称列表
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			newObj.tableName ="AlarmConfig";
			newObj.type = "query";
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getAlarmRuleList', {//获取告警规则列表
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			newObj.tableName ="AlarmConfig";
			newObj.type = "query";
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getAlarmRule', {//获取单个告警规则的数据
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		var response = {};
		if(token != '') {
			var newObj = {};
			newObj.tableName ="AlarmStaff";
			newObj.type = "query";
			newObj.filter = {"key":"AlarmConfigRecId","value":param.data.id};
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp1) {
					if(debug) console.log("[获取数据]",resp1);
					response.staff = resp1;
					newObj = {};
					newObj.tableName ="AlarmConfig";
					newObj.type = "query";
					newObj.filter = {"key":"RecId","value":param.data.id};
					if(debug) console.log("[请求数据]",newObj);
					oDataHandleYFT.handle(
						newObj,
						function(resp2) {
							if(debug) console.log("[获取数据]",resp2);
							response.alarmRule = resp2;
							if(param&&param.callback) param.callback(response);
						},
						function(resp2) {
							if(param&&param.error) param.error(resp2);
						}
					);
				},
				function(resp1) {
					if(param&&param.error) param.error(resp1);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getAlarmConfigUI', {//获取新增告警规则页面数据
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			rquestUri = serviceAddress+"GetAlarmConfigUI?token="+token+"&";
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({
				type: "get",
				async: true,
				url:rquestUri,
				dataType: "json",
				cache:false,
				success : function(resp){
					if(debug) console.log("[获取数据]",resp);
					if(param.callback) param.callback(resp);
				},
				error : function(resp){
					if(param.error) param.error(resp);
					Util.customInterfaceInfo(resp);
				}
			});
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getTempleteList', {//获取模板列表
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			newObj.tableName ="EccMailModle";
			newObj.type = "query";
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getEmailServerConfig', {//获取邮件服务器配置信息
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			newObj.tableName ="EccMail";
			newObj.type = "query";
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getSMSServerConfig', {//获取短信服务器配置信息
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			newObj.tableName ="EccSMS";
			newObj.type = "query";
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getSMSServerStatus', {//获取短信服务器状态
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			rquestUri = serviceAddress+"SMSSetUp?token="+token+"&";
			rquestUri += "OPERATE_TYPE='GET'&";
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({
				type: "get",
				async: true,
				url:rquestUri,
				dataType: "json",
				cache:false,
				success : function(resp){
					if(debug) console.log("[获取数据]",resp);
					if(param.callback) param.callback(resp);
				},
				error : function(resp){
					if(param.error) param.error(resp);
					Util.customInterfaceInfo(resp);
				}
			});
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'setAlarmRuleStates', {//批量设置告警规则的禁止状态
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param) return;
		if(token!=''&&param.dataObjec) {
			var index = 0;
			try{
				recursive(param.dataObjec[index]);
			}
			catch(e){
				if(param.error) param.error(e.message);
			}
			function recursive(data){
				var newObj = {};
				data.AlarmStatus = param.flag;
				newObj.tableName ="AlarmConfig";
				newObj.type = "update";
				newObj.updateObjec = data;
				newObj.recId = data.RecId;
				if(debug) console.log("[请求数据]",newObj);
				oDataHandleYFT.handle(
					newObj,
					function(resp) {
						if(debug) console.log("[获取数据]",resp);
						if(param.dataObjec[++index]){
							recursive(param.dataObjec[index]);
						}
						else if(param&&param.callback) param.callback(resp);
					},
					function(resp) {
						if(param&&param.error) param.error(resp);
					}
				);
			}
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'createAlarmRule', {//新增告警规则
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param||!param.data) return;
		if(token != '') {
			var newObj = {};
			newObj.tableName ="AlarmConfig";
			newObj.type = "add";
			newObj.updateObjec = param.data;
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'createAlarmStaffs', {//新增告警规则关联用户
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param||!param.dataObjec) return;
		if(token != '') {
			var index = 0;
			try{
				recursive(param.dataObjec[index]);
			}
			catch(e){
				if(param.error) param.error(e.message);
			}
			function recursive(data){
				var newObj = {};
				newObj.tableName ="AlarmStaff";
				newObj.type = "add";
				newObj.updateObjec = data;
				if(debug) console.log("[请求数据]",newObj);
				oDataHandleYFT.handle(
					newObj,
					function(resp) {
						if(debug) console.log("[获取数据]",resp);
						if(param.dataObjec[++index]){
							recursive(param.dataObjec[index]);
						}
						else if(param&&param.callback) param.callback(resp);
					},
					function(resp) {
						if(param&&param.error) param.error(resp);
					}
				);
			}
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'createTemplete', {//新增模板
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param||!param.data) return;
		if(token != '') {
			var newObj = {};
			newObj.tableName ="EccMailModle";
			newObj.type = "add";
			newObj.updateObjec = param.data;
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'updateAlarmRule', {//更新告警规则
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param||!param.data) return;
		if(token != '') {
			var newObj = {};
			newObj.tableName ="AlarmConfig";
			newObj.type = "update";
			newObj.updateObjec = param.data;
			newObj.recId = param.data.RecId;
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'updateAlarmStaffs', {//更新告警规则关联用户
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param||!param.data) return;
		if(token != '') {
			rquestUri = serviceAddress+"AlarmRuleOperate?token="+token+"&";
			rquestUri += "OPERATE_TYPE='EDIT'&";
			rquestUri += "ALARMRULE_ID='"+param.data.id+"'&";
			rquestUri += "USERS='"+param.data.users+"'&";
			rquestUri += "UPGRADE_USERS='"+param.data.upgrade_users+"'&";
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({
				type: "get",
				async: true,
				url: rquestUri,
				dataType: "json",
				cache: false,
				success : function(resp){
					if(debug) console.log("[获取数据]",resp);
					if(param.callback) param.callback(resp);
				},
				error : function(resp){
					if(param.error) param.error(resp);
					Util.customInterfaceInfo(resp);
				}
			});
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'updateTemplete', {//更新模板
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param||!param.data) return;
		if(token != '') {
			var newObj = {};
			newObj.tableName ="EccMailModle";
			newObj.type = "update";
			newObj.updateObjec = param.data;
			newObj.recId = param.data.RecId;
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'updateEmailServerConfig', {//更新邮件服务器配置信息
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param||!param.data) return;
		if(token != '') {
			var newObj = {};
			newObj.tableName ="EccMail";
			newObj.type = "update";
			newObj.updateObjec = param.data;
			newObj.recId = param.data.RecId;
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'updateSMSServerConfig', {//更新短信服务器配置信息
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param||!param.data) return;
		if(token != '') {
			var newObj = {};
			newObj.tableName ="EccSMS";
			newObj.type = "update";
			newObj.updateObjec = param.data;
			newObj.recId = param.data.RecId;
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				function(resp) {
					if(param&&param.error) param.error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'deleteAlarmRules', {//批量删除告警规则
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param) return;
		if(token!=''&&param.dataObjec) {
			var index = 0;
			try{
				recursive(param.dataObjec[index]);
			}
			catch(e){
				if(param.error) param.error(e.message);
			}
			function recursive(data){
				var newObj = {};
				newObj.tableName ="AlarmConfig";
				newObj.type = "delete";
				newObj.recId = data.RecId;
				if(debug) console.log("[请求数据]",newObj);
				oDataHandleYFT.handle(
					newObj,
					function(resp) {
						if(debug) console.log("[获取数据]",resp);
						if(param.dataObjec[++index]){
							recursive(param.dataObjec[index]);
						}
						else if(param&&param.callback) param.callback(resp);
					},
					function(resp) {
						if(param&&param.error) param.error(resp);
					}
				);
			}
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'deleteTempletes', {//批量删除模板
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param) return;
		if(token!=''&&param.dataObjec) {
			var index = 0;
			try{
				recursive(param.dataObjec[index]);
			}
			catch(e){
				if(param.error) param.error(e.message);
			}
			function recursive(data){
				var newObj = {};
				newObj.tableName ="EccMailModle";
				newObj.type = "delete";
				newObj.recId = data.RecId;
				if(debug) console.log("[请求数据]",newObj);
				oDataHandleYFT.handle(
					newObj,
					function(resp) {
						if(debug) console.log("[获取数据]",resp);
						if(param.dataObjec[++index]){
							recursive(param.dataObjec[index]);
						}
						else if(param&&param.callback) param.callback(resp);
					},
					function(resp) {
						if(param&&param.error) param.error(resp);
					}
				);
			}
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'activateSMSServer', {//开启短信服务器
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			rquestUri = serviceAddress+"SMSSetUp?token="+token+"&";
			rquestUri += "OPERATE_TYPE='START'&";
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({
				type: "get",
				async: true,
				url:rquestUri,
				dataType: "json",
				cache:false,
				success : function(resp){
					if(debug) console.log("[获取数据]",resp);
					if(param.callback) param.callback(resp);
				},
				error : function(resp){
					if(param.error) param.error(resp);
					Util.customInterfaceInfo(resp);
				}
			});
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'sendEmail', {//发送测试邮件
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param||!param.data||!param.data.receivers) return;
		if(token != '') {
			rquestUri = serviceAddress+"SendEmail?token="+token+"&";
			rquestUri += "EMAIL='"+(param.data.receivers||"")+"'&";
			rquestUri += "SUBJECT='"+(param.data.subject||"")+"'&";
			rquestUri += "CONTENT='"+(param.data.content||"")+"'&";
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({
				type: "get",
				async: true,
				url: rquestUri,
				dataType: "json",
				cache:false,
				success: function(resp){
					if(debug) console.log("[获取数据]",resp);
					if(param&&param.callback) param.callback(resp);
				},
				error: function(resp){
					if(param.error) param.error(resp);
					Util.customInterfaceInfo(resp);
				}
			});
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'sendSMS', {//发送测试短信
	value: function(param) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(!param||!param.data||!param.data.receivers) return;
		if(token != '') {
			rquestUri = serviceAddress+"SMSSetUp?token="+token+"&";
			rquestUri += "OPERATE_TYPE='SEND'&";
			rquestUri += "PHONE='"+(param.data.receiver||"")+"'&";
			rquestUri += "SMS_CONTENT='"+(param.data.content||"")+"'&";
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({
				type: "get",
				async: true,
				url:rquestUri,
				dataType: "json",
				cache:false,
				success : function(resp){
					if(debug) console.log("[获取数据]",resp);
					if(param.callback) param.callback(resp);
				},
				error : function(resp){
					if(param.error) param.error(resp);
					Util.customInterfaceInfo(resp);
				}
			});
		}
	}
});

Object.defineProperty(oDataHandleYFT, 'getChildrenGroups',{
  value: function(pid,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EccGroup";
          newObj.type = "query";
          newObj.filter = {"key":"ParentGroupId","value":pid};
          newObj.token = token;
          oDataHandleYFT.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandleYFT, 'getChildrenEquips',{
  value: function(pid,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Equipment";
          newObj.type = "query";
          newObj.filter = {"key":"GROUP_ID","value":pid};
          newObj.token = token;
          oDataHandleYFT.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandleYFT, 'updateGroupSorter', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="EccGroup";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
				oDataHandleYFT.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandleYFT, 'updateEquipmentSorter', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="Equipment";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
				oDataHandleYFT.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandleYFT, 'changeGroupStatus', {
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
                    };
                });
            };
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"OperateGroupOdata?token="+token+filterString;
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
                    //console.log("Get data error")
                }
            });
        }
    }
});

Object.defineProperty(oDataHandleYFT, 'updateEccGroup', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="EccGroup";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
				oDataHandleYFT.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandleYFT, 'createEccGroup', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="EccGroup";
				newObj.type = "add";
				newObj.updateObjec = dateObjec;
				oDataHandleYFT.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandleYFT, 'getEccGroupById', {
	value: function(param, callback) {
		token = Store.get("token");
		serviceAddress = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			newObj.tableName ="EccGroup";
			newObj.type = "query";
			newObj.filter = {"key":"RecId","value":param};
			oDataHandleYFT.handle(newObj, function(resp) {
				callback(resp);
			});
		}
	}
});

Object.defineProperty(oDataHandleYFT, 'changeEquipmentStatus', {
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
                    };
                });
            };
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"OperateEquipmentOdata?token="+token+filterString;
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
                    //console.log("Get data error")
                }
            });
        }
    }
});

module.exports = oDataHandleYFT;
