var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');
// Store.get_ServiceAddress();
// Store.get_tokenVerify();
var serviceAddress = Store.get("serviceUrl");
var tokenVerify = Store.get("tokenUrl");
var oDataHandle = require('./odata.js');

var oDataTopology = function(){}
var token ="";

//获取网络拓扑数据 - 不带参数(只得当前登录用户的数据)
Object.defineProperty(oDataTopology,'getTopologyData',{
    value:function(callback){
        var token = Store.get("token");
        if(token != '') {
          serviceAddress = Store.get("serviceUrl");
          var rquestUri = serviceAddress+"GetYFTGisSubsetInfo?token="+token;
          $.ajax({
      			method: 'get',
            async: true,
      			url: rquestUri,
      			dataType: "json",
            cache:false,
            error : function(result){
                Util.customInterfaceInfo(result);
            }
      		}).then(function (response) {
            callback(response.d.results);
      		});
        } else {
            //console.log('token -  not null');
        }
    }
});
//获取网络拓扑数据 - 带参数(得当前登录用户和下级的数据)
Object.defineProperty(oDataTopology,'getTopologyDataParam',{
    value:function(param,callback){
        var token = Store.get("token");
        if(token != '') {
          serviceAddress = Store.get("serviceUrl");
          var rquestUri = serviceAddress+"GetYFTGisSubsetInfo";
          $.ajax({
      			method: 'get',
            async: true,
      			url: rquestUri,
      			dataType: "json",
            cache:false,
            data: {
   					 token: token,
   					 MAPLV:"'"+param.MAPLV+"'"
   				 },
            error : function(result){
                Util.customInterfaceInfo(result);
            }
      		}).then(function (response) {
            callback(response.d.results);
      		});
        } else {
            //console.log('token -  not null');
        }
    }
});
//
Object.defineProperty(oDataTopology,'getNodeToken',{
    value:function(param, callback){
        // Store.set("BACKTOKEN",Store.get("token"));
        // Store.set("BACKROLE_NAME",Store.get("CURRENT_ROLENAME"));
        // Store.set("BACKLOCALUSERNAME",Store.get("localUserName"));
        var token = Store.get("token");
        if(token != '') {
          serviceAddress = Store.get("serviceUrl");
          //var rquestUri = serviceAddress+"GetYFTGisNodeToken?token="+token+"&O_CODE='"+id+"'";
          var rquestUri = serviceAddress+"GetYFTGisNodeToken";
          $.ajax({
      			method: 'get',
            async: true,
      			url: rquestUri,
      			dataType: "json",
            cache:false,
            data: {
   					 token: token,
   					 O_CODE:"'"+param.id+"'",
             HOST:"'"+param.host+"'"
   				 },
            error : function(result){
                Util.customInterfaceInfo(result);
            }
      		}).then(function (response) {
            var res = response.d.results[0];
            if (res.TOKEN) {
              var data = JSON.parse(res.TOKEN);
              callback(res.TOKEN);
            }else {
              callback(false);
            }
      		});
        } else {
            console.log('token -  not null');
        }
    }
});
//根据用户名和密码直接获取token
Object.defineProperty(oDataTopology,'getNodeTokenNew',{
	value: function(param, callback){
				var pwd = base64.base64encode(encodeURI(param.password));
        //"TokenVerify":"http://192.168.9.163:10080/rest/auth/login",
        var tokenVerify = "http://"+ param.url +"/rest/auth/login";
				$.ajax({
					type: "get",
					async: false,
					url: tokenVerify,
					dataType: "json",
					cache:false,
					data: {
						user:param.username,
						passwd:pwd
					},
					success: function (data) {
							callback(data);
					},
					timeout: 5000,
					error: function (data) {
						callback(data);
						//  Util.customInterfaceInfo(data);
						//console.log("获取token失败！"+data);
					}
				});
		}
});

Object.defineProperty(oDataTopology, 'queryGetUserInfo', {
	value: function(param,callback) {
		serviceAddress = Store.get("serviceUrl");
		if(param.token) {
			// newObj.filter ={key:"RecId",value:WorkOrderID};
			var rquestUri = serviceAddress+"GetUserInfo"
			$.ajax({
				 type: "get",
				 async: false,
				 url:rquestUri,
				 dataType: "json",
         cache:false,
				 data: {
					 token: param.token,
					 LOGIN_ID:"'"+param.loginid+"'"
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

Object.defineProperty(oDataTopology, 'getTpjbDictionaryData',{
  value: function(callback) {
      token = Store.get("token");
      serviceAddress = Store.get("serviceUrl");
      if(token != '') {
          // var newObj = {};
          // newObj.tableName ="DictionaryData";
          // newObj.type = "query";
          // newObj.token = token;
          // newObj.filter = {"key":"DictNo","value":"tptjb"};
          // oDataTopology.handle(newObj, function(resp) {
          //     callback(resp);
          // });
          var rquestUri = serviceAddress+"GetYFTGisLV"
          $.ajax({
             type: "get",
             async: true,
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
             }
          });

      } else {
          //console.log('token -  not null');
      }
  }
});

Object.defineProperty(oDataTopology,'handle',{
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

module.exports = oDataTopology;
