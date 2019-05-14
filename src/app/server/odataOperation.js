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

Object.defineProperty(oDataHandle, 'getFaultType',{
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
Object.defineProperty(oDataHandle, 'getAllFaults',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="FaultClassification";
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
Object.defineProperty(oDataHandle, 'getFaultSubType',{
  value: function(id,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="FaultClassification";
          newObj.type = "query";
          newObj.filter = {"key":"ParentID","value":id};
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
Object.defineProperty(oDataHandle, 'getServiceName',{
  value: function(callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="ServiceLevelAgreement";
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
Object.defineProperty(oDataHandle, 'getAllAssets',{
  value: function(filter,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="HardwareAssetss";
          newObj.type = "query";
          newObj.token = token;
          if(filter.length>0){
            if(filter.length == 1){
              newObj.filter = filter[0];
            }else{
              newObj.filter = filter;
            };
          };
          newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
Object.defineProperty(oDataHandle, 'getAllAssets3',{
  value: function(filter,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="HardwareAssetss";
          newObj.type = "query";
          newObj.token = token;
          newObj.filter = filter;
          newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
//这个接口有安全群群主权限控制
Object.defineProperty(oDataHandle, 'getAllAssets2', {
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
            var rquestUri = serviceAddress+"GetAssetsList?token="+token+filterString;
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
Object.defineProperty(oDataHandle, 'saveCreateOrder',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkOrderCommon";
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
Object.defineProperty(oDataHandle, 'saveOrderAsset',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkOrderAssetss";
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
Object.defineProperty(oDataHandle, 'getWorkOrderList', {
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
            var rquestUri = serviceAddress+"GetWorkOrderDetailList?token="+token+filterString;
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
                    //console.log(result)
                    // if(result.status == 500){
                    //   //token 过期
                    //   alert("认证过期。");
                    //   window.location.href = '#';
                    // }else if(result.status == 0){
                    //   //连接服务器失败
                    //   alert("连接服务器连接失败。");
                    //   window.location.href = '#';
                    // };
                }
            });
        }
    }
});
Object.defineProperty(oDataHandle, 'getColorSpan', {
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
            var rquestUri = serviceAddress+"GetOrderCount?token="+token+filterString;
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
Object.defineProperty(oDataHandle, 'getOrderDetails', {
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
            var rquestUri = serviceAddress+"GetOrderDetails?token="+token+filterString;
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
Object.defineProperty(oDataHandle, 'updateWorkOrderCommon', {
	value: function(updateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="WorkOrderCommon";
				newObj.type = "update";
        newObj.token = token;
				newObj.recId = updateObjec.RecId;
				newObj.updateObjec = updateObjec;
				oDataHandle.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
		}
	}
});
Object.defineProperty(oDataHandle, 'deleteMonitorInfo', {
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
          var rquestUri = serviceAddress+"BatchDelete?token="+token+"&"+filterString;
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
                  //console.log("delete data error")
              }
          });
      }
  }
});
Object.defineProperty(oDataHandle, 'getSerailNumber', {
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
          var rquestUri = serviceAddress+"GetAutoIncrementSerialNumber?token="+token+"&"+filterString;
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
                  //console.log("delete data error")
              }
          });
      }
  }
});
Object.defineProperty(oDataHandle, 'saveCreateDelay',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="ExtensionRequest";
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
Object.defineProperty(oDataHandle, 'saveCreateDelayRelation',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkOrderExtension";
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
Object.defineProperty(oDataHandle, 'saveUpdateDelay', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="ExtensionRequest";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
				oDataHandle.handle(newObj, function(resp) {
					callback(resp);
				});
			}
		}
});
Object.defineProperty(oDataHandle, 'saveSatisfyScore',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="Satisfaction";
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
Object.defineProperty(oDataHandle, 'getOrderPrepare', {
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
          var rquestUri = serviceAddress+"GetNewWorkOrderInfo?token="+token+"&"+filterString;
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
                  //console.log("delete data error")
              }
          });
      }
  }
});
Object.defineProperty(oDataHandle, 'getFlowPicData', {
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
          var rquestUri = serviceAddress+"GetWorkOrderFlowChartInfo?token="+token+"&"+filterString;
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
                  //console.log("delete data error")
              }
          });
      }
  }
});
Object.defineProperty(oDataHandle, 'getWorkFlowTypes',{
  value: function(callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkFlow";
          newObj.type = "query";
          newObj.token = token;
          newObj.filter = {key:"WorkOrderType",value:"WorkOrderCommon"};
          newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
Object.defineProperty(oDataHandle, 'deleteWorkOrder', {
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
      var rquestUri = serviceAddress+"DeleteWorkOrder?token="+token+"&"+filterString;
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
              //console.log("get data error")
          }
      });
    }
  }
});

Object.defineProperty(oDataHandle, 'getAutomaticWorkOrderUI', {
  value: function(callback) {
    token = Store.get("token");
    serviceAddress = Store.get("serviceUrl");
    if(token != '') {
      //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
      var rquestUri = serviceAddress+"GetAutomaticWorkOrderUI?token="+token;
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
              //console.log("get data error")
          }
      });
    }
  }
});

Object.defineProperty(oDataHandle, 'addAutomaticWorkOrder', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="AutomaticWorkOrder";
				newObj.type = "add";
				newObj.updateObjec = dateObjec;
				oDataHandle.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandle, 'updateAutomaticWorkOrder', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="AutomaticWorkOrder";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
				oDataHandle.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandle, 'deleteAutomaticWorkOrder', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="AutomaticWorkOrder";
				newObj.type = "delete";
                newObj.token = token;
                newObj.recId = dateObjec.recId;
				oDataHandle.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

/**
工单流程设计
**/
Object.defineProperty(oDataHandle, 'getFlowDesignPicDataByName', {
  value: function(name,callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var filterString="&NAME='"+name+"'&STATUS_DICTNO='gdzt'";
          //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
          var rquestUri = serviceAddress+"GetCustomFlowInfo?token="+token+filterString;
          //Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码
          rquestUri = encodeURI(rquestUri);
          $.ajax({
              type: "get",
              async:false,
              url:rquestUri,
              dataType: "json",
              cache:false,
              success : function(result){
                  callback(result.d);
              },error : function(result){
                  Util.customInterfaceInfo(result);
                  //console.log("get data error")
              }
          });
      }
  }
});
/**
工单流程设计
**/
Object.defineProperty(oDataHandle, 'getFlowDesignPicData', {
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          //url 地址中可能包括中文字符所以需要对此生成 地址进行转码
          var rquestUri = serviceAddress+"GetCustomFlowInfo?token="+token;
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
                  //console.log("get data error")
              }
          });
      }
  }
});

/**
流程设计保存
**/
Object.defineProperty(oDataHandle, 'saveFlowDesignPicData', {
  value: function(data, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var filterString="";
          if(data != null){
              data.map(function(obj,i){
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
          var rquestUri = serviceAddress+"SaveCustomWorkOrderFlowData?token="+token+"&"+filterString;
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
                  //console.log("save data error")
              }
          });
      }
  }
});
/**
 流程设计主数据{name,workordertype}
**/
Object.defineProperty(oDataHandle, 'addFlowDesign', {
    value: function(dateObjec, callback) {
        token = Store.get("token");
        if(token != '') {
                var newObj = {};
                newObj.tableName ="WorkFlow";
                newObj.type = "add";
                newObj.updateObjec = dateObjec;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});
/**
 流程设计详细数据{FromId,ToId,state，FlowAction,flowId}
**/
Object.defineProperty(oDataHandle, 'addFlowDesignDetail', {
    value: function(dateObjec, callback) {
        token = Store.get("token");
        if(token != '') {
                var newObj = {};
                newObj.tableName ="WorkFlowDetailss";
                newObj.type = "add";
                newObj.updateObjec = dateObjec;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});
//删除流程设计主数据
// Object.defineProperty(oDataHandle, 'deleteFlowDesign',{
//   value: function(filter,callback) {
//       var token = Store.get("token");
//       if(token != '') {
//           var newObj = {};
//           newObj.tableName ="WorkFlow";
//           newObj.type = "delete";
//           newObj.token = token;
//           newObj.Name = filter;
//           // newObj.updateObjec = filter;
//           oDataHandle.handle(newObj, function(code,resp) {
//               callback(code,resp);
//           });
//       } else {
//           //console.log('token -  not null');
//       }
//   }
// });
Object.defineProperty(oDataHandle, 'deleteFlowDesign', {
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
          var rquestUri = serviceAddress+"BatchDelete?token="+token+"&"+filterString;
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
                  //console.log("delete data error")
              }
          });
      }
  }
});
//删除流程设计详细数据
// Object.defineProperty(oDataHandle, 'deleteFlowDesignDetail',{
//   value: function(filter,callback) {
//       var token = Store.get("token");
//       if(token != '') {
//           var newObj = {};
//           newObj.tableName ="WorkFlowDetailss";
//           newObj.type = "delete";
//           newObj.token = token;
//           newObj.WorkFlowId = filter;
//           // newObj.updateObjec = filter;
//           oDataHandle.handle(newObj, function(code,resp) {
//               callback(code,resp);
//           });
//       } else {
//           //console.log('token -  not null');
//       }
//   }
// });

//获取WorkFlow 数据
Object.defineProperty(oDataHandle, 'getWorkFlowTable',{
  // filter,
  value: function(filter,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkFlow";
          newObj.type = "query";
          newObj.token = token;
          newObj.filter = filter;
          newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
//获取WorkOrderCommon数据
Object.defineProperty(oDataHandle, 'getWorkOrderByID',{
  // filter,
  value: function(filter,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkOrderCommon";
          newObj.type = "query";
          newObj.token = token;
          newObj.filter = filter;
          newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
//获取模板数据 数据
Object.defineProperty(oDataHandle, 'getworkOrderTemplates',{
  // filter,
  value: function(filter,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkOrderTemplatess";
          newObj.type = "query";
          newObj.token = token;
          // newObj.filter = filter;
          newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});
//获取WorkFlowDetailss 数据
Object.defineProperty(oDataHandle, 'getWorkFlowDetailsTable',{
  value: function(callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkFlowDetailss";
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

//获取WorkFlowDetailss 数据
Object.defineProperty(oDataHandle, 'getWorkFlowDetailsFromWorkFlowId',{
  value: function(workFlowId,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkFlowDetailss";
          newObj.type = "query";
          newObj.token = token;
          newObj.filter = {key:"WorkFlowId",value:workFlowId};
          newObj.orderby ={key:"SN",sort:"asc"};
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

//获取工单模板库指定ID数据
Object.defineProperty(oDataHandle, 'getWorkOrderTemplatesFromId',{
  value: function(recId,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkOrderTemplatess";
          newObj.type = "query";
          newObj.token = token;
          newObj.filter = {key:"RecId",value:recId};
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

//获取工单模板库业务对象中存储的数据
Object.defineProperty(oDataHandle, 'getWorkOrderTemplatesObjData',{
  value: function(filt,callback) {
      token = Store.get("token");
      if(token != '') {
          var tableNameString="";
          var filter= {};
          if(filt != null){
              filt.map(function(obj,i){
                  var key = obj.key;
                  var value = obj.value;
                  if(key == "tableName"){
                      tableNameString = value;
                      //判断是否是 s 结尾
                      if(tableNameString.substring((tableNameString.length - 1)) == 's'){
                        tableNameString = tableNameString + 's';
                      }
                  };
                  if(key == "workOrderId"){
                      filter = {key:"workOrderId",value:value};
                  };
              });
          };
          var newObj = {};
          newObj.tableName = tableNameString;
          newObj.type = "query";
          newObj.token = token;
          newObj.filter = filter;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

//工单流转操作////////////////////////////////////////////
Object.defineProperty(oDataHandle, 'getWorkOrderNextPerson', {
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
				//url 地址中可能包括中文字符所以需要对此生成 地址进行转码
				var rquestUri = serviceAddress+"GetNextWorkFlow?token="+token+filterString;
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
							 //console.log("Get NextWorkFlow error")
					 }
				});
		} else {
			//console.log('token -  not null');
		}
	}
});
Object.defineProperty(oDataHandle, 'queryWorkFlowLog', {
	value: function(WorkOrderId,callback) {
		token = Store.get("token");
		if(token != '') {
  			var newObj = {};
  			newObj.tableName ="WorkFlowLog";
  			newObj.type = "query";
  			newObj.filter = {key:"WorkOrderId",value:WorkOrderId};
  			newObj.orderby ={key:"Step",sort:"desc"};
  			oDataHandle.handle(newObj, function(resp) {
				callback(resp);
			});
		} else {
			//console.log('token -  not null');
		}
	}
});

Object.defineProperty(oDataHandle, 'addWorkFlowLog', {
	value: function(dateObjec, callback) {
  		token = Store.get("token");
  		if(token != '') {
  				var newObj = {};
  				newObj.tableName ="WorkFlowLog";
  				newObj.type = "add";
  				newObj.updateObjec = dateObjec;
          //console.log(dateObjec);
  				oDataHandle.handle(newObj, function(resp) {
  					callback(resp);
  				});
			}else{
        console.log('token -  not null');
      }
		}
});
Object.defineProperty(oDataHandle, 'updateWorkFlowLog', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="WorkFlowLog";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
				oDataHandle.handle(newObj, function(resp) {
					callback(resp);
				});
			}
		}
});
Object.defineProperty(oDataHandle, 'updateWorkOrderCommonStatus', {
    value: function(dateObjec, callback) {
            token = Store.get("token");
            if(token != '') {
                var newObj = {};
                newObj.tableName ="WorkOrderCommon";
                newObj.type = "update";
                newObj.recId = dateObjec.RecId;
                newObj.updateObjec = dateObjec;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});
Object.defineProperty(oDataHandle, 'queryWorkOrderProcessLog', {
    value: function(WorkOrderId,callback) {
        token = Store.get("token");
        if(token != '') {
              var newObj = {};
              newObj.tableName ="WorkOrderProcessLog";
              newObj.type = "query";
              newObj.filter = {key:"WorkOrderId",value:WorkOrderId};
              newObj.orderby ={key:"CreatedDateTime",sort:"desc"};
              oDataHandle.handle(newObj, function(resp) {
                callback(resp);
            });
        } else {
            //console.log('token -  not null');
        }
    }
});

Object.defineProperty(oDataHandle, 'addWorkOrderProcessLog', {
    value: function(dateObjec, callback) {
        token = Store.get("token");
        if(token != '') {
                var newObj = {};
                newObj.tableName ="WorkOrderProcessLog";
                newObj.type = "add";
                newObj.updateObjec = dateObjec;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});

Object.defineProperty(oDataHandle, 'queryWorkFlowDetailsFilters', {
    value: function(filters, callback) {
            token = Store.get("token");
            if(token != '') {
                var newObj = {};
                newObj.tableName ="WorkFlowDetailss";
                newObj.type = "query";
                newObj.filter = filters;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});

Object.defineProperty(oDataHandle, 'setWorkFlowSendEmail', {
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
				//url 地址中包括中文字符所以需要对此生成 地址进行转码
				var rquestUri = serviceAddress+"SendEmail?token="+token+filterString;
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
////////////////////////////////////////////////////////

Object.defineProperty(oDataHandle, 'getWorkOrderUI', {
  value: function(data, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var filterString="";
          if(data != null){
              data.map(function(obj,i){
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
          var rquestUri = serviceAddress+"GetWorkOrderUI?token="+token+"&"+filterString;
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
                  //console.debug("save data error")
                  Util.customInterfaceInfo(result);
              }
          });
      }
  }
});
Object.defineProperty(oDataHandle, 'getDutyUsers', {
  value: function(data, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var filterString="";
          if(data != null){
              data.map(function(obj,i){
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
          var rquestUri = serviceAddress+"SetUser?token="+token+"&"+filterString;
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
                  //console.debug("save data error")
                  Util.customInterfaceInfo(result);
              }
          });
      }
  }
});
Object.defineProperty(oDataHandle, 'getDutyManageListInfo', {
  value: function(data, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var filterString="";
          if(data != null){
              data.map(function(obj,i){
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
          var rquestUri = serviceAddress+"GetDutyManageListInfo?token="+token+"&"+filterString;
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
                  //console.debug("save data error")
                  Util.customInterfaceInfo(result);
              }
          });
      }
  }
});

Object.defineProperty(oDataHandle, 'addGroupName', {
    value: function(dateObjec, callback) {
        token = Store.get("token");
        if(token != '') {
                var newObj = {};
                newObj.tableName ="EccDutyGroup";
                newObj.type = "add";
                newObj.updateObjec = dateObjec;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});
Object.defineProperty(oDataHandle, 'getDutyGroups',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="EccDutyGroup";
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
Object.defineProperty(oDataHandle, 'updateDutyGroup', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="EccDutyGroup";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
				oDataHandle.handle(newObj, function(resp) {
					callback(resp);
				});
			}
		}
});
Object.defineProperty(oDataHandle, 'deleteDutyGroup', {
	value: function(id, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="EccDutyGroup";
				newObj.type = "delete";
        newObj.token = token;
        newObj.recId = id;
				oDataHandle.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandle, 'addGroupArrangements', {
    value: function(dateObjec, callback) {
        token = Store.get("token");
        if(token != '') {
                var newObj = {};
                newObj.tableName ="DutyArrangementss";
                newObj.type = "add";
                newObj.updateObjec = dateObjec;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});
Object.defineProperty(oDataHandle, 'getDutyGroupArrs',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="DutyArrangementss";
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
Object.defineProperty(oDataHandle, 'updateDutyGroupArr', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="DutyArrangementss";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
				oDataHandle.handle(newObj, function(resp) {
					callback(resp);
				});
			}
		}
});
Object.defineProperty(oDataHandle, 'deleteDutyGroupArr', {
	value: function(id, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="DutyArrangementss";
				newObj.type = "delete";
        newObj.token = token;
        newObj.recId = id;
				oDataHandle.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandle, 'addDutyUser', {
    value: function(dateObjec, callback) {
        token = Store.get("token");
        if(token != '') {
                var newObj = {};
                newObj.tableName ="DutyDetail";
                newObj.type = "add";
                newObj.updateObjec = dateObjec;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});
Object.defineProperty(oDataHandle, 'editDutyUser', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="DutyDetail";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
				oDataHandle.handle(newObj, function(resp) {
					callback(resp);
				});
			}
		}
});
Object.defineProperty(oDataHandle, 'deleteDutyUser', {
	value: function(id, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="DutyDetail";
				newObj.type = "delete";
        newObj.token = token;
        newObj.recId = id;
				oDataHandle.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandle, 'addEccDuty', {
    value: function(dateObjec, callback) {
        token = Store.get("token");
        if(token != '') {
                var newObj = {};
                newObj.tableName ="EccDutyTable";
                newObj.type = "add";
                newObj.updateObjec = dateObjec;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});
Object.defineProperty(oDataHandle, 'editEccDuty', {
	value: function(dateObjec, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="EccDutyTable";
				newObj.type = "update";
				newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
				oDataHandle.handle(newObj, function(resp) {
					callback(resp);
				});
			}
		}
});
Object.defineProperty(oDataHandle, 'deleteEssDuty', {
	value: function(id, callback) {
			token = Store.get("token");
			if(token != '') {
				var newObj = {};
				newObj.tableName ="EccDutyTable";
				newObj.type = "delete";
        newObj.token = token;
        newObj.recId = id;
				oDataHandle.handle(newObj, function(resp) {
					//console.log(resp);
					callback(resp);
				});
			}
		}
});

Object.defineProperty(oDataHandle, 'getDutyManageCalendarData', {
  value: function(data, callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          var filterString="";
          if(data != null){
              data.map(function(obj,i){
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
          var rquestUri = serviceAddress+"DutyManage?token="+token+"&"+filterString;
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
                  //console.debug("save data error")
                  Util.customInterfaceInfo(result);
              }
          });
      }
  }
});

Object.defineProperty(oDataHandle, 'getDutyLog',{
  value: function(filter, callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="DutyLog";
          newObj.type = "query";
          newObj.timeFilter = filter;
          newObj.token = token;
          newObj.orderby ={key:"CreatedDateTime",sort:"asc"};
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      }
  }
});

Object.defineProperty(oDataHandle, 'addDutyLog', {
    value: function(dateObjec, callback) {
        token = Store.get("token");
        if(token != '') {
                var newObj = {};
                newObj.tableName ="DutyLog";
                newObj.type = "add";
                newObj.updateObjec = dateObjec;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});

Object.defineProperty(oDataHandle, 'updateDutyLog', {
    value: function(dateObjec, callback) {
        token = Store.get("token");
        if(token != '') {
                var newObj = {};
                newObj.tableName ="DutyLog";
                newObj.type = "update";
                newObj.recId = dateObjec.RecId;
				newObj.updateObjec = dateObjec;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});

Object.defineProperty(oDataHandle, 'getDutySignIn',{
  value: function(filter, callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="DutySignIn";
          newObj.type = "query";
          newObj.timeFilter = filter;
          newObj.token = token;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      }
  }
});

Object.defineProperty(oDataHandle, 'addDutySignIn', {
    value: function(dateObjec, callback) {
        token = Store.get("token");
        if(token != '') {
                var newObj = {};
                newObj.tableName ="DutySignIn";
                newObj.type = "add";
                newObj.updateObjec = dateObjec;
                oDataHandle.handle(newObj, function(resp) {
                    callback(resp);
                });
            }
        }
});

Object.defineProperty(oDataHandle, 'addOrderTemplate',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkOrderTemplatess";
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

Object.defineProperty(oDataHandle, 'editOrderTemplate',{
  value: function(data,callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkOrderTemplatess";
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

Object.defineProperty(oDataHandle, 'deleteOrderTemplate',{
  value: function(workOrderTemplateId, callback) {
      token = Store.get("token");
      if(token != '') {
          var newObj = {};
          newObj.tableName ="WorkOrderTemplatess";
          newObj.type = "delete";
          newObj.token = token;
          newObj.recId = workOrderTemplateId;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

// 方法名:GetAllBusObDefNames
// 描述:获取所有的页面对象
// 输入参数:method='GetAllBusObDefNames'
// 输出参数:result=[{name:"业务对象名",alias:"业务对象别名"}...] json数组
// example:
// http://192.168.9.147:8080/bods.svc/BusObDefOperator?method='GetAllBusObDefNames'&token=E5DBBD2AFD844EF8837CB46C754A71B3
// ------------------------------------------
//
// 方法名:GetBusObDefFields
// 描述:获取指定业务对象的字段
// 输入参数:method='GetBusObDefFields'&params='busObDefName=业务对象名'
// 输出参数:result=[{name:"字段名",alias:"字段别名",type:"text"}...] json数组
// example:
// http://192.168.9.147:8080/bods.svc/BusObDefOperator?method='GetBusObDefFields'&params='busObDefName=EccGroup'&token=E5DBBD2AFD844EF8837CB46C754A71B3
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

Object.defineProperty(oDataHandle, 'addWorkOrderForm',{
  value: function(params, entity, callback) {
      token = Store.get("token");
      if(token != '') {
          //判断是否是 s 结尾
          if(entity.substring((entity.length - 1)) == 's'){
            entity = entity + 's';
          };
          var newObj = {};
          newObj.tableName = entity;
          newObj.type = "add";
          newObj.token = token;
          newObj.updateObjec = params;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataHandle, 'updateWorkOrderForm',{
  value: function(params, entity, callback) {
      token = Store.get("token");
      if(token != '') {
          //判断是否是 s 结尾
          if(entity.substring((entity.length - 1)) == 's'){
            entity = entity + 's';
          };
          var newObj = {};
          newObj.tableName = entity;
          newObj.type = "update";
          newObj.recId = params.RecId;
          newObj.updateObjec = params;
          oDataHandle.handle(newObj, function(resp) {
              callback(resp);
          });
      } else {
          //console.log('token -  not null');
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
                        if(obj.key != "Flag"){
                          tempstring += obj.key+" eq'"+obj.value+"' ";
                        }else{
                          tempstring += obj.key+" eq "+obj.value+" ";
                        }

                    }else{
                      if(obj.key != "Flag"){
                        tempstring += "and "+obj.key+" eq'"+obj.value+"' ";
                      }else{
                        tempstring += "and "+obj.key+" eq "+obj.value+" ";
                      }

                    };
                });
                joint += tempstring
            }else{
                joint += "&$filter="+object.filter.key+" eq'"+object.filter.value+"' ";
            };
        }
        if(object.timeFilter){
            if(object.timeFilter.length > 1){
                var tempstring="&$filter="
                object.timeFilter.map(function(obj,i){
                    if(i==0){
                        tempstring += obj.key+" "+obj.symbol+" datetime'"+obj.value+"' ";
                    }else{
                        tempstring += "and "+obj.key+" "+obj.symbol+" datetime'"+obj.value+"' ";
                    };
                });
                joint += tempstring
            }else{
                joint += "&$filter="+object.timeFilter.key+" "+object.timeFilter.symbol+" datetime'"+object.timeFilter.value+"' ";
            };
        };
        if(object.orderby){
            joint += "&$orderby="+object.orderby.key+" "+object.orderby.sort;
        };

        serviceAddress = Store.get("serviceUrl");
        var rquestUri = serviceAddress+object.tableName+recid+"?token="+token+joint;
        rquestUri = encodeURI(rquestUri);
        //console.log(rquestUri);
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
