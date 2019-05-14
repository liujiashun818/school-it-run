var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');
// Store.get_ServiceAddress();
// Store.get_tokenVerify();
var serviceAddress = Store.get("serviceUrl");
var tokenVerify = Store.get("tokenUrl");
var odataNotice = function(){}
var portletData = Store.get_portletData();
var token ="";

// 添加公告
Object.defineProperty(odataNotice, 'addNotice',{
  value: function(data,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="TopicRelease";
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec =data.topicData;
          odataNotice.handle(newObj, function(code,resp) {
              callback(code,resp);
          });
      } else {

      }
  }
});
// 获取审核公告
Object.defineProperty(odataNotice, 'getCheckNotice',{
  value: function(filter,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="GetTopicList";
          newObj.type = "query";
          newObj.token = token;
          newObj.filter = {key:"TOPIC_STATUS",value:"2"};
          odataNotice.handle(newObj, function(code,resp) {
              callback(code,resp);
          });
      } else {

      }
  }
});
// 更新公告
Object.defineProperty(odataNotice, 'updateNotice',{
  value: function(needObj,callback) {
      var token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="TopicRelease";
          newObj.type = "update";
          newObj.token = token;
          newObj.recId = needObj.RecId;
          newObj.updateObjec =needObj.updateObj;
          odataNotice.handle(newObj, function(code,resp) {
              callback(code,resp);
          });
      } else {

      }
  }
});

// 查询公告
Object.defineProperty(odataNotice, 'queryNotice',{
  value: function(filters,callback) {

      // var token = Store.get("token");
      // if(token != '') {
      //     var newObj = {};
      //     newObj.tableName ="TopicRelease";
      //     newObj.type = "query";
      //     newObj.token = token;
      //     newObj.filter = {key:"TOPIC_STATUS",value:"1"};
      //     odataNotice.handle(newObj, function(code,resp) {
      //         callback(code,resp);
      //     });
      // } else {
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
          var rquestUri = serviceAddress+"GetTopicList?token="+token+filterString;
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
                  callback("error",result.message);
                  Util.customInterfaceInfo(result);
              }
          });
      }
  }
});

// 查询组织树结构
Object.defineProperty(odataNotice, 'getPureOrganization',{
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
                  callback("ok",result.d);
              },error : function(result){
                  callback("error",result.message);
                  Util.customInterfaceInfo(result);
              }
          });
      }
  }
});
//设置发布接收组织
Object.defineProperty(odataNotice, 'setTopicReceives',{
  value: function(filters,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var filterString="";
          if(filters.groupData != null){
              filters.groupData.map(function(obj,i){
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
          var rquestUri = serviceAddress+"SetTopicReceives?token="+token+filterString;
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
                  callback("error",result.message);
                  Util.customInterfaceInfo(result);
              }
          });
      }
  }
});
//批量发布知识
Object.defineProperty(odataNotice, 'setReleaseTopic',{
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
        var rquestUri = serviceAddress+"SetReleaseTopic?token="+token+filterString;
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
                callback("error",result.message);
                Util.customInterfaceInfo(result);
            }
        });
    }
  }
});
// 获取组织树勾选数据
Object.defineProperty(odataNotice, 'getTopicReceiverOrganization',{
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
        var rquestUri = serviceAddress+"GetTopicReceiverOrganization?token="+token+filterString;
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
                callback("error",result.message);
                Util.customInterfaceInfo(result);
            }
        });
    }
  }
});
//noticeMultDelete
Object.defineProperty(odataNotice, 'noticeMultDelete',{
  value: function(filters,callback) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    if(token != '') {
        var filterString="";
        if(filters.deleteObj != null){
            filters.deleteObj.map(function(obj,i){
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
            },error : function(result){
                callback("error",result.message);
                Util.customInterfaceInfo(result);
            }
        });
    }
  }
});

Object.defineProperty(odataNotice,'handle',{
    value: function(object, callback){
      var serviceAddress = Store.get("serviceUrl");
        var joint="",
            recid="";
        if(object.recId){
            recid = "('"+object.recId+"')";
        };
        if(object.filter){
            if(object.filter.length > 1){
                var tempstring="&"
                object.filter.map(function(obj,i){
                    if(i==0){
                        tempstring += obj.key+" eq'"+obj.value+"' ";
                    }else{
                        tempstring += "and "+obj.key+" eq'"+obj.value+"' ";
                    };
                });
                joint += tempstring
            }else{
                joint += "&"+object.filter.key+" eq'"+object.filter.value+"' ";
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
                // console.log(object.updateObjec);
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

module.exports = odataNotice;
