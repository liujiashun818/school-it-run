var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');
// Store.get_ServiceAddress();
// Store.get_tokenVerify();
var serviceAddress = Store.get("serviceUrl");
var tokenVerify = Store.get("tokenUrl");

var oDataRepository = function(){}
var portletData = Store.get_portletData();
var token ="";

//获取知识库清单
Object.defineProperty(oDataRepository, 'getKnowledgeBaseList',{
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
          var rquestUri = serviceAddress+"GetKnowledgeBaseList?token="+token+filterString;
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
              },error : function(error){
                  Util.customInterfaceInfo(error);
              }
          });
      }
  }
});
//获取常用知识
Object.defineProperty(oDataRepository, 'getCommonKnowledge',{
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
          var rquestUri = serviceAddress+"GetCommonKnowledgeBase?token="+token+filterString;
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
              },error : function(error){
                  Util.customInterfaceInfo(error);
              }
          });
      }
  }
});
//获取更新知识
Object.defineProperty(oDataRepository, 'getUpdateKnowledge',{
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
          var rquestUri = serviceAddress+"GetUpdateKnowledgeBase?token="+token+filterString;
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
              },error : function(error){
                  Util.customInterfaceInfo(error);
              }
          });
      }
  }
});
//获取知识库统计
Object.defineProperty(oDataRepository, 'getRepositoryStatistics',{
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
          var rquestUri = serviceAddress+"GetFaultTypeStatistics?token="+token+filterString;
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
              },error : function(error){
                  Util.customInterfaceInfo(error);
              }
          });
      }
  }
});

// 添加知识库
Object.defineProperty(oDataRepository, 'saveRepository',{
  value: function(data,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="FaultKnowledgeBase";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec =data;
          oDataRepository.handle(newObj, function(code,resp) {
              callback(code,resp);
          });
      }
  }
});
//待审核知识
// Object.defineProperty(oDataRepository, 'getCheckPending',{
//   value: function(filter,callback) {
//       var token = Store.get("token");
//       if(token != '') {
//           var newObj = {};
//           newObj.tableName ="FaultKnowledgeBase";
//           newObj.type = "query";
//           newObj.token = token;
//           newObj.filter = filter;
//           oDataRepository.handle(newObj, function(code,resp) {
//               callback(code,resp);
//           });
//       } else {
//
//       }
//   }
// });

//待审核知识
Object.defineProperty(oDataRepository, 'getCheckPending',{
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
          var rquestUri = serviceAddress+"GetReviewKnowledgeBase?token="+token+filterString;
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
              },error : function(error){
                  callback("error",error.message);
                  Util.customInterfaceInfo(error);
              }
          });
      }
  }
});
//修改知识库状态/数据
Object.defineProperty(oDataRepository, 'repositoryUpdate',{
  value: function(needObj,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="FaultKnowledgeBase";
          newObj.type = "update";
          newObj.token = token;
          newObj.recId = needObj.RecId;
          newObj.updateObjec =needObj.updateObj;
          oDataRepository.handle(newObj, function(code,resp) {
              callback(code,resp);
          });
      } else {

      }
  }
});
//var filters = [{key:'TABLENAME',value:'FaultKnowledgeBase'},{key:'KEYWORD',value:'RecId'},{key:'VALUE',value:"'"+data.RecId+"'"}];
//删除审核知识
Object.defineProperty(oDataRepository, 'repositoryDelete',{
  value: function(filters,callback) {

    // var token = Store.get("token");
    // if(token != '') {
    //     var newObj = {};
    //     newObj.tableName ="FaultKnowledgeBase";
    //     newObj.type = "delete";
    //     newObj.token = token;
    //     newObj.recId = filter;
    //     // newObj.updateObjec = filter;
    //     oDataRepository.handle(newObj, function(code,resp) {
    //         callback(code,resp);
    //     });
    // } else {
    //
    // }

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
                callback("ok",result.d);
            },error : function(error){
                callback("error",error.message);
                Util.customInterfaceInfo(error);
            }
        });
    }
  }
});
//故障类型
Object.defineProperty(oDataRepository, 'getFaultType',{
  value: function(callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="FaultClassification";
          newObj.type = "query";
          newObj.filter = {"key":"ParentID","value":""};
          newObj.token = token;
          newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
          oDataRepository.handle(newObj, function(code,resp) {
              callback(code,resp);
          });
      }
  }
});
//故障子类型
Object.defineProperty(oDataRepository, 'getFaultSubType',{
  value: function(id,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="FaultClassification";
          newObj.type = "query";
          newObj.filter = {"key":"ParentID","value":id};
          newObj.token = token;
          newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
          oDataRepository.handle(newObj, function(code,resp) {
              callback(code,resp);
          });
      }
  }
});

Object.defineProperty(oDataRepository,'handle',{
    value: function(object, callback){
      var serviceAddress = Store.get("serviceUrl");
        var joint="",
            recid="";
        if(object.recId){
            recid = "('"+object.recId+"')";
        };
        if(object.filter){//不同字段过滤
            if(object.filter.length >= 1){
                var tempstring="&$filter="
                object.filter.map(function(obj,i){
                    if(i==0){
                        tempstring += obj.key+" eq'"+obj.value+"' ";
                    }else{
                        tempstring += "or "+obj.key+" eq'"+obj.value+"' ";
                    };
                });
                joint += tempstring
            }else{
                joint += "&$filter="+object.filter.key+" eq'"+object.filter.value+"' ";
            };
            //joint += "&$filter=Status eq '已提交' or Status eq '审核通过' or Status eq '审核不通过' ";//同字段过滤
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
                console.log(object.updateObjec);
                OData.request({
                        requestUri:rquestUri,
                        method: "PUT",
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
                        callback("ok",data);
                    },
                    function error(err) {
                      callback("error",err.message);
                      Util.oDataInterfaceInfo(err);
                    });
                break;
        }
    }
});

module.exports = oDataRepository;
