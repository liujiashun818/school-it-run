var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');
// Store.get_ServiceAddress();
// Store.get_tokenVerify();
var serviceAddress = Store.get("serviceUrl");
var tokenVerify = Store.get("tokenUrl");
var odataSla = function(){}
var portletData = Store.get_portletData();
var token ="";
// 添加服务级别
Object.defineProperty(odataSla, 'slaAdd',{
  value: function(data,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="ServiceLevelAgreement";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec =data;
          odataSla.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {

      }
  }
});
//获取服务级别协议
Object.defineProperty(odataSla, 'GetServiceLevelAgreement',{
  value: function(obj, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var filterString="";
          if(obj.filters != null){
              obj.filters.map(function(obj,i){
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
          var rquestUri = serviceAddress+"GetServiceLevelAgreement?token="+token+filterString;
          //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
          rquestUri = encodeURI(rquestUri);
          $.ajax({
              type: "get",
              async: true,
              url:rquestUri,
              dataType: "json",
              cache:false,
              success : function(result){
                callback({code:"ok",result:result.d});
              },error : function(error){
                callback({code:"error",result:error.message});
                Util.customInterfaceInfo(error);
              }
          });
      }
  }
});
//修改服务级别协议
Object.defineProperty(odataSla, 'slaUpdate',{
  value: function(needObj,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="ServiceLevelAgreement";
          newObj.type = "update";
          newObj.token = token;
          newObj.recId = needObj.RecId;
          newObj.updateObjec =needObj.updateObj;
          odataSla.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {

      }
  }
});
//删除服务级别协议
Object.defineProperty(odataSla, 'slaDelete',{
  value: function(filter,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="ServiceLevelAgreement";
          newObj.type = "delete";
          newObj.token = token;
          newObj.recId = filter;
          // newObj.updateObjec = filter;
          odataSla.handle(newObj, function(code,resp) {
              callback(code,resp);
          });
      } else {

      }
  }
});
//删除多条服务级别协议
Object.defineProperty(odataSla, 'slaMultDelete',{
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
        var rquestUri = serviceAddress+"BatchDelete?token="+token+filterString;
        //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
        rquestUri = encodeURI(rquestUri);
        $.ajax({
            type: "get",
            async: true,
            url:rquestUri,
            dataType: "json",
            cache:false,
            success : function(result){
              callback({code:"ok",result:result.d});
            },error : function(error){
              callback({code:"error",result:error.message});
              Util.customInterfaceInfo(error);
            }
        });
    }
  }
});

// Object.defineProperty(odataSla, 'getServiceBigType',{
//   value: function(callBack) {
//       token = Store.get("token");
//       serviceAddress = Store.get("serviceUrl");
//       if(token != '') {
//           var newObj = {};
//           newObj.tableName ="FaultClassification";
//           newObj.type = "query";
//           newObj.filter = {"key":"ParentID","value":""};
//           newObj.token = token;
//           newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
//           odataSla.handle(newObj, function(resp) {
//               callBack(resp);
//           });
//       }
//   }
// });

Object.defineProperty(odataSla, 'getServiceBigType',{
  value: function(callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="FaultClassification";
          newObj.type = "query";
          newObj.filter = {"key":"ParentID","value":""};
          newObj.token = token;
          newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
          odataSla.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {

      }
  }
});


Object.defineProperty(odataSla,'handle',{
    value: function(object, callback){
      var serviceAddress = Store.get("serviceUrl");
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

        var rquestUri = serviceAddress+object.tableName+recid+"?token="+object.token+joint;
        var headers = { 'Cache-Control': 'no-cache', Pragma: 'no-cache' };
        switch(object.type){
            case "query":
                OData.request({
                        requestUri: rquestUri,
                        headers: headers,
                        method: "GET"
                    },
                    function success(data, response) {
                        callback({code:"ok",result:data});
                    },
                    function error(err) {
                        callback({code:"error",result:err.message});
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
                        callback({code:"ok",result:data});
                    },
                    function error(err) {
                        callback({code:"error",result:err.message});
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
                        callback({code:"ok",result:data});
                    },
                    function error(err) {
                        callback({code:"error",result:err.message});
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
                        callback({code:"ok",result:data});
                    },
                    function error(err) {
                        callback({code:"error",result:err.message});
                        Util.oDataInterfaceInfo(err);
                    });
                break;
        }
    }
});

module.exports = odataSla;
