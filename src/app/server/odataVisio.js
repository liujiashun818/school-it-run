var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');
// Store.get_ServiceAddress();
// Store.get_tokenVerify();
var serviceAddress = Store.get("serviceUrl");
var tokenVerify = Store.get("tokenUrl");
var odataVisio = function(){}
var portletData = Store.get_portletData();
var token ="";

Object.defineProperty(odataVisio, 'getAllGroupOrg', {
    value: function(callBack) {
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
                    callBack({status:"ok",result:result.d});
                },error : function(error){
                    callBack({status:"error",result:error.message});
                    Util.customInterfaceInfo(result);
                }
            });
        }
    }
});

Object.defineProperty(odataVisio, 'loadAll2',{
  value: function(data,callBack) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="svgtable";
          newObj.type = "query";
          newObj.token = token;
          newObj.updateObjec =data;
          odataVisio.handle(newObj, function(code,resp) {
              callBack(code,resp);
          });
      }
  }
});

Object.defineProperty(odataVisio, 'loadAll',{
  value: function(callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="svgtable";
          newObj.type = "query";
          newObj.token = token;
          // newObj.filter = {key:"TOPIC_STATUS",value:"2"};
          odataVisio.handle(newObj, function(code,resp) {
              callback(code,resp);
          });
      }
  }
});

Object.defineProperty(odataVisio, 'deleteTopology',{
  value: function(deleteObj,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="svgtable";
          newObj.type = "delete";
          newObj.token = token;
          newObj.recId = deleteObj.recId;
          // newObj.updateObjec = filter;
          odataVisio.handle(newObj, function(resp) {
              callback(resp);
          });
      }
  }
});

Object.defineProperty(odataVisio, 'editTopology',{
  value: function(data,callBack) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    if(token != '') {
      var newObj = {};
      newObj.tableName ="svgtable";
      newObj.type = "update";
      newObj.token = token;
      newObj.recId = data.RecId;
      newObj.updateObjec =data.updateObj;
      odataVisio.handle(newObj, function(resp) {
          callBack(resp);
      });

        // var rquestUri = serviceAddress+"UpdateName?token="+token+"&Name='"+editObj.name+"'&NewName='"+editObj.newName+"'&ORGANIZATION='"+editObj.organization+"'";
        // rquestUri = encodeURI(rquestUri);
        // $.ajax({
        //     type: "get",
        //     async: true,
        //     url:rquestUri,
        //     dataType: "json",
        //     cache:false,
        //     success : function(result){
        //         callback("ok",result.d);
        //     },error : function(error){
        //         callback("error",error.message);
        //         Util.customInterfaceInfo(error);
        //     }
        // });

    }
  }
});

Object.defineProperty(odataVisio, 'loadVisioList2',{
  value: function(callBack) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    if(token != '') {
      var rObj = {
        state:"ok",
        result:"hello"
      };
      callBack(rObj);
        // var rquestUri = serviceAddress+"GetVisioImgListByName?token="+token;
        // rquestUri = encodeURI(rquestUri);
        // $.ajax({
        //     type: "get",
        //     async: false,
        //     url:rquestUri,
        //     dataType: "json",
        //     cache:false,
        //     success : function(result){
        //         callBack("ok",result.d);
        //     },error : function(error){
        //         callBack("error",error.message);
        //         Util.customInterfaceInfo(error);
        //     }
        // });
    }
  }
});

Object.defineProperty(odataVisio, 'loadVisioList',{
  value: function(visioObj,callBack) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    if(token != '') {
      var rquestUri= "";
        if(visioObj.ORGANIZATION){
          rquestUri = serviceAddress+"GetVisioImgListByName?token="+token+"&ORGANIZATION='"+visioObj.ORGANIZATION+"'";
        }else{
          rquestUri = serviceAddress+"GetVisioImgListByName?token="+token;
        }
        rquestUri = encodeURI(rquestUri);
        $.ajax({
            type: "get",
            async: true,
            url:rquestUri,
            dataType: "json",
            cache:false,
            success : function(result){
              callBack({status:"ok",result:result.d});
            },error : function(error){
              callBack({status:"error",result:error.message});
                Util.customInterfaceInfo(error);
            }
        });
    }
  }
});

Object.defineProperty(odataVisio, 'getClickTopology',{
  value: function(vname, callBack) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
        // GetVisioEquipmentsByName;
          //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
          var rquestUri = serviceAddress+"GetFreshData?token="+token+"&Name='"+vname+"'";
          //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
          rquestUri = encodeURI(rquestUri);
          $.ajax({
              type: "get",
              async: true,
              url:rquestUri,
              dataType: "json",
              cache:false,
              success : function(result){
                  // callback("ok",result.d);
                  callBack({status:"ok",result:result.d});
              },error : function(error){
                // callback("error",error.message);
                callBack({status:"error",result:error.message});
                Util.customInterfaceInfo(error);
              }
          });
      }
  }
});

Object.defineProperty(odataVisio, 'queryOneVisio',{
  value: function(recId,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="svgtable";
          newObj.type = "query";
          newObj.token = token;
          newObj.filter = {key:"RecId",value:recId};
          odataVisio.handle(newObj, function(code,resp) {
              callback(code,resp);
          });
      }
  }
});

Object.defineProperty(odataVisio,'handle',{
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
                        callback("ok",data);
                    },
                    function error(err) {
                        callback("error",err.message);
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
                        // callback("ok",data);
                        callback({status:"ok",result:data});
                    },
                    function error(err) {
                        // callback("error",err.message);
                        callback({status:"error",result:err.message});
                        // Util.oDataInterfaceInfo(err);
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
                        callback("ok",data);
                    },
                    function error(err) {
                        callback("error",err.message);
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
                        callback({status:"ok",result:data});
                    },
                    function error(err) {
                        callback({status:"error",result:err.message});
                        Util.oDataInterfaceInfo(err);
                    });
                break;
        }
    }
});

module.exports = odataVisio;
