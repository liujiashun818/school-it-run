var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var serviceAddress = Store.get("serviceUrl");
var tokenVerify = Store.get("tokenUrl");
var servletAddress = Store.get("servletServiceUrl");
var Util = require('../utils/util.js');

var oDataHandle = function(){}
var token ="";

Object.defineProperty(oDataHandle, 'getBrandData',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EquipmentBrand";
          newObj.type = "query";
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
Object.defineProperty(oDataHandle, 'addBrand',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EquipmentBrand";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec =data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
Object.defineProperty(oDataHandle, 'editBrand',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EquipmentBrand";
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
Object.defineProperty(oDataHandle, 'deleteBrand',{
  value: function(id,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EquipmentBrand";
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

Object.defineProperty(oDataHandle, 'getAssetsStatus',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="AssetsStatuss";
          newObj.type = "query";
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
Object.defineProperty(oDataHandle, 'addAssetsStatus',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="AssetsStatuss";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec =data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
Object.defineProperty(oDataHandle, 'editAssetsStatus',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="AssetsStatuss";
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
Object.defineProperty(oDataHandle, 'deleteAssetsStatus',{
  value: function(id,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="AssetsStatuss";
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

Object.defineProperty(oDataHandle, 'getAssetsTypes',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="ProductType";
          newObj.type = "query";
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
Object.defineProperty(oDataHandle, 'addAssetsTypes',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="ProductType";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec =data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
Object.defineProperty(oDataHandle, 'editAssetsTypes',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="ProductType";
          newObj.type = "update";
          newObj.token = token;
  				newObj.recId = data.RecId;
  				newObj.updateObjec = data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          console.log('token -  not null');
      }
  }
});
Object.defineProperty(oDataHandle, 'deleteAssetsTypes',{
  value: function(id,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="ProductType";
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

Object.defineProperty(oDataHandle, 'getSysFaultType',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="FaultClassification";
          newObj.type = "query";
          newObj.filter = {"key":"ParentID","value":""};
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
Object.defineProperty(oDataHandle, 'addSysFaultType',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="FaultClassification";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec =data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
Object.defineProperty(oDataHandle, 'editSysFaultType',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="FaultClassification";
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
Object.defineProperty(oDataHandle, 'deleteSysFaultType',{
  value: function(id,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="FaultClassification";
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

Object.defineProperty(oDataHandle, 'getAreaData',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Area";
          newObj.type = "query";
          newObj.filter = {"key":"ParentGroupId","value":""};
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
Object.defineProperty(oDataHandle, 'addAreaData',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Area";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec =data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
Object.defineProperty(oDataHandle, 'editAreaData',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Area";
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
Object.defineProperty(oDataHandle, 'deleteAreaData',{
  value: function(id,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Area";
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

Object.defineProperty(oDataHandle, 'getTpData',{
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

Object.defineProperty(oDataHandle, 'getWorkOrderStatusData',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="DictionaryData";
          newObj.type = "query";
          newObj.filter = {"key":"DictNo","value":"gdzt"};
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

//添加数据字典值
Object.defineProperty(oDataHandle, 'addDictionaryData',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="DictionaryData";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec =data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
//修改数据字典值
Object.defineProperty(oDataHandle, 'editDictionaryData',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="DictionaryData";
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
Object.defineProperty(oDataHandle, 'deleteDictionaryData',{
  value: function(id,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="DictionaryData";
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

Object.defineProperty(oDataHandle, 'addTpData',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="DictionaryData";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec =data;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
Object.defineProperty(oDataHandle, 'editTpData',{
  value: function(data,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="DictionaryData";
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
Object.defineProperty(oDataHandle, 'deleteTpData',{
  value: function(id,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="DictionaryData";
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

Object.defineProperty(oDataHandle, 'getSysFaultSubType',{
  value: function(callback) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    if(token != '') {
        //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
        var rquestUri = serviceAddress+"GetFaultClassification?token="+token;
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
Object.defineProperty(oDataHandle, 'getSystemInfoData',{
  value: function(callback) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    if(token != '') {
        //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
        var rquestUri = serviceAddress+"GetLicenseInfo?token="+token;
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
        console.log("查询地址",rquestUri);
        var headers = { 'Cache-Control': 'no-cache', Pragma: 'no-cache' };
        switch(object.type){
            case "query":
                OData.request({
                        requestUri: rquestUri,
                        method: "GET",
                        headers: headers
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
                        console.log("更新成功","success");
                        callback("success");
                    },
                    function error(err) {
                        console.log("更新失败",err.message);
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
                        console.log("添加失败",err.message);
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
