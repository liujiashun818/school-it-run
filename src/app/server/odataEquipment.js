var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');
// Store.get_ServiceAddress();
// Store.get_tokenVerify();
var serviceAddress = Store.get("serviceUrl");
var tokenVerify = Store.get("tokenUrl");

var oDataHandle = function(){}
var portletData = Store.get_portletData();
var token ="";

Object.defineProperty(oDataHandle, 'getGroupAllData', {
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
            var rquestUri = serviceAddress+"GetGroup?token="+token+filterString;
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

Object.defineProperty(oDataHandle, 'getEquipmentAllData', {
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
            var rquestUri = serviceAddress+"GetEquipment?token="+token+filterString;
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

Object.defineProperty(oDataHandle, 'getMonitorData', {
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
            var rquestUri = serviceAddress+"GetMonitor?token="+token+filterString;
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

Object.defineProperty(oDataHandle, 'getResourceSetTree', {
    value: function(callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetEquipmentSetUp?token="+token;
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

Object.defineProperty(oDataHandle, 'setEquipment', {
    value: function(objList,callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
          var objStr="";
          if(objList != null){
              objList.map(function(obj,i){
                  var key = obj.key;
                  var value = obj.value;
                  if(objStr == ""){
                      objStr = "&"+key+"="+"'"+value+"'";
                  }else{
                      objStr += "&"+key+"="+"'"+value+"'";
                  };
              });
          };
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"SetEquipment?token="+token+objStr;
            //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
            rquestUri = encodeURI(rquestUri);
            $.ajax({
                type: "get",
                async: true,
                url:rquestUri,
                dataType: "json",
                cache:false,
                success : function(result){
                    callback("ok",result.d);
                },error : function(result){
                    Util.customInterfaceInfo(result);
                }
            });
        }
    }
});

Object.defineProperty(oDataHandle, 'getAssetByGb',{
  value: function(id,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="HardwareAssetss";
          newObj.type = "query";
          newObj.filter = {"key":"GBCode","value":id};
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

Object.defineProperty(oDataHandle, 'getResourceTypes',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EquipmentTypeRel";
          newObj.type = "query";
          newObj.filter = {key:"ParentID", value:""};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getAllResources',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EquipmentTypeRel";
          newObj.type = "query";
          newObj.symbolFilter = {key:"ParentID", symbol:"ne", value:""};
          newObj.orderby = {key:"typeAlias", sort:"asc"};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getResources',{
  value: function(resourceTypeId, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EquipmentTypeRel";
          newObj.type = "query";
          newObj.filter = {key:"ParentID", value:resourceTypeId};
          newObj.orderby = {key:"typeAlias", sort:"asc"};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getMonitors',{
  value: function(equipmentType, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EccMonitorList";
          newObj.type = "query";
          newObj.filter = [{key:"Range", value:equipmentType}, {key:"IsAvailable", value:"1"}];
          newObj.orderby = {key:"MonitorName", sort:"asc"};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getMibs',{
  value: function(vendor, resourceModel, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Mib";
          newObj.type = "query";
          newObj.filter = [{key:"Vendor", value:vendor}, {key:"MibModel", value:resourceModel}];
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getMonitorReturnValues',{
  value: function(monitorType, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Item";
          newObj.type = "query";
          newObj.filter = {key:"MonitorType", value:monitorType};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp, monitorType);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getEquipment',{
  value: function(equipmentId, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Equipment";
          newObj.type = "query";
          newObj.filter = {key:"RecId", value:equipmentId};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getInitialAlarmConditionDataFromMonitorType',{
  value: function(monitorType, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EccAlarmCondition";
          newObj.type = "query";
          newObj.filter = {key:"MonitorType", value:monitorType};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getAlarmConditionDataFromMonitorId',{
  value: function(monitorId, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Alarm";
          newObj.type = "query";
          newObj.filter = {key:"MonitorId", value:monitorId};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'addMonitorAlarmCondition', {
	value: function(param) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="Alarm";
				newObj.type = "add";
				newObj.updateObjec = param.data;
				// oDataHandle.handle(newObj, function(resp) {
				// 	//console.log(resp);
				// 	callback(resp);
				// });
                oDataHandle.handle(
    				newObj,
    				function(resp) {
    					if(param&&param.callback) param.callback(resp);
    				},
    				function(resp) {
    					if(param&&param.error) param.error(resp);
    				}
    			);
			}
		}
});

Object.defineProperty(oDataHandle, 'updateMonitorAlarmCondition', {
	value: function(param) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="Alarm";
				newObj.type = "update";
				newObj.recId = param.data.RecId;
				newObj.updateObjec = param.data;
				// oDataHandle.handle(newObj, function(resp) {
				// 	//console.log(resp);
				// 	callback(resp);
				// });
                oDataHandle.handle(
    				newObj,
    				function(resp) {
    					if(param&&param.callback) param.callback(resp);
    				},
    				function(resp) {
    					if(param&&param.error) param.error(resp);
    				}
    			);
			}
		}
});

Object.defineProperty(oDataHandle, 'deleteMonitorAlarmCondition', {
	value: function(param) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="Alarm";
				newObj.type = "delete";
				newObj.recId = param.data.RecId;
				// oDataHandle.handle(newObj, function(resp) {
				// 	//console.log(resp);
				// 	callback(resp);
				// });
                oDataHandle.handle(
    				newObj,
    				function(resp) {
    					if(param&&param.callback) param.callback(resp);
    				},
    				function(resp) {
    					if(param&&param.error) param.error(resp);
    				}
    			);
			}
		}
});

Object.defineProperty(oDataHandle, 'getMonitorDisk', {
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
            var rquestUri = serviceAddress+"GetMonitorDisk?token="+token+filterString;
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

Object.defineProperty(oDataHandle, 'getMonitorDiskIONames', {
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
            var rquestUri = serviceAddress+"GetDiskIONames?token="+token+filterString;
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

Object.defineProperty(oDataHandle, 'getMonitorProcess', {
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
            var rquestUri = serviceAddress+"GetMonitorProcess?token="+token+filterString;
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

Object.defineProperty(oDataHandle, 'getMonitorNetWork', {
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
            var rquestUri = serviceAddress+"GetMonitorNetWork?token="+token+filterString;
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

Object.defineProperty(oDataHandle, 'getMonitorServiceNames', {
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
            var rquestUri = serviceAddress+"GetServiceNames?token="+token+filterString;
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

Object.defineProperty(oDataHandle, 'getMonitorNTEventLog', {
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
            var rquestUri = serviceAddress+"GetNTEventlog?token="+token+filterString;
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

Object.defineProperty(oDataHandle, 'getMonitorScripts', {
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
            var rquestUri = serviceAddress+"GetScripts?token="+token+filterString;
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

Object.defineProperty(oDataHandle, 'getMonitorsPropertyDataFromID',{
  value: function(monitorId, callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Monitor";
          newObj.type = "query";
          newObj.filter = {key:"RecId", value:monitorId};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getMonitorsEntryAliasDataFromID',{
  value: function(monitorId, callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="MonitorEntryAliass";
          newObj.type = "query";
          newObj.filter = {key:"MonitorId", value:monitorId};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'addMonitorProperty',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Monitor";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec = data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
Object.defineProperty(oDataHandle, 'updateMonitorProperty',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Monitor";
          newObj.type = "update";
          newObj.token = token;
  				newObj.recId = data.RecId;
  				newObj.updateObjec = data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
Object.defineProperty(oDataHandle, 'deleteMonitorProperty',{
  value: function(id,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Monitor";
          newObj.type = "delete";
          newObj.token = token;
          newObj.recId = id;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getMySqlMonitorCounterData', {
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
            var rquestUri = serviceAddress+"GetMySqlCounter?token="+token+filterString;
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
Object.defineProperty(oDataHandle, 'getMySqlMonitorPropertyCounter',{
  value: function(monitorId, callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EccMonitorCount";
          newObj.type = "query";
          newObj.filter = {key:"monitorid", value:monitorId};
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getOracleMonitorCounterData', {
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
            var rquestUri = serviceAddress+"GetOracleCounter?token="+token+filterString;
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

Object.defineProperty(oDataHandle, 'addMonitorPropertyCounter',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EccMonitorCount";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec = data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'deleteMonitorPropertyCounter',{
  value: function(id,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EccMonitorCount";
          newObj.type = "delete";
          newObj.token = token;
          newObj.recId = id;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});


Object.defineProperty(oDataHandle, 'addMonitorPropertyEntryAlias',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="MonitorEntryAliass";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec = data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'deleteMonitorPropertyEntryAlias',{
  value: function(id,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="MonitorEntryAliass";
          newObj.type = "delete";
          newObj.token = token;
          newObj.recId = id;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'updateMonitorPropertyEntryAlias',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="MonitorEntryAliass";
          newObj.type = "update";
          newObj.token = token;
  				newObj.recId = data.RecId;
  				newObj.updateObjec = data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'getMonitorSnmpMIBFile', {
      value: function(callback) {
        token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
            //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
            var rquestUri = serviceAddress+"GetSNMPMIBFile?token="+token;
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

Object.defineProperty(oDataHandle, 'getMonitorSnmpMIBCounter', {
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
            var rquestUri = serviceAddress+"GetSNMPBIMCounter?token="+token+filterString;
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
                        tempstring += "'"+obj.key+"' eq'"+obj.value+"' ";
                    }else{
                        tempstring += "and '"+obj.key+"' eq'"+obj.value+"' ";
                    };
                });
                joint += tempstring
            }else{
                joint += "&$filter='"+object.filter.key+"' eq'"+object.filter.value+"' ";
            };
        }
        if(object.symbolFilter){
            if(object.symbolFilter.length > 1){
                var tempstring="&$filter="
                object.symbolFilter.map(function(obj,i){
                    if(i==0){
                        tempstring += "'"+obj.key+"' "+obj.symbol+" '"+obj.value+"' ";
                    }else{
                        tempstring += "and '"+obj.key+"' "+obj.symbol+" '"+obj.value+"' ";
                    };
                });
                joint += tempstring
            }else{
                joint += "&$filter='"+object.symbolFilter.key+"' "+object.symbolFilter.symbol+" '"+object.symbolFilter.value+"' ";
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
                        // console.log("添加失败",err.message);
                        // console.log(err.response.statusCode);
                        // console.log(err.response.body);
                        // if(err.response.statusCode == 500){
                        //   //token 过期
                        //   alert("认证过期。");
                        //   window.location.href = '#';
                        // }else if(err.response.statusCode == 0){
                        //   //连接服务器失败
                        //   alert("服务器连接失败。");
                        //   window.location.href = '#';
                        // };
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

module.exports = oDataHandle;
