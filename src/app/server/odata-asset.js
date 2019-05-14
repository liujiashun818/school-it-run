/**
* Created by Yuchen 2016/01/08
 */

var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');

var oDataHandleYFT = function(){}
// Store.get_ServiceAddress();
// Store.get_tokenVerify();

//var serviceAddress = Store.get("serviceUrl");
//var tokenVerify = Store.get("tokenUrl")
var serviceAddress = "";
var tokenVerify = "";
var serviceUrl = "";
var token = "";
var debug = true;

Object.defineProperty(oDataHandleYFT,'handle',{
	value: function(object, callback, errorCallback){
		serviceAddress = Store.get("serviceUrl");
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
										if(errorCallback) errorCallback(err.message||err);
										Util.oDataInterfaceInfo(err);
                });
                break;
            case "update":
				OData.request({
	               requestUri:rquestUri,
	               method: "PUT",
								 headers: headers,
	               data:object.updataObjec
                },
                function success(data, response) {
                    //console.log("更新成功",data);
					          callback(data);
                },
                function error(err) {
                    //console.log("更新失败",err.message);
										if(errorCallback) errorCallback(err.message||err);
										Util.oDataInterfaceInfo(err);
                });
                break;
            case "add":
                OData.request({
                    requestUri: rquestUri,
                    method: "POST",
										headers: headers,
                    data:object.updataObjec
                },
                function success(data, response) {
                    //console.log("添加成功",data);
										callback(data);
                },
                function error(err) {
                    //console.log("添加失败",err.message);
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

Object.defineProperty(oDataHandleYFT, 'createAsset', {
	value: function(dataObjec, callback, error) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		serviceUrl = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			var rquestUri = serviceAddress+"GetAssetsCodeVerification?ASSETS_CODE='"+dataObjec.AssetsCode+"'&token="+token+"&";
			rquestUri = encodeURI(rquestUri);
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({//获取资产编码是否唯一
				type: "get",
				async: true,
				url:rquestUri,
				dataType: "json",
				cache:false,
				success : function(result1){
					if(debug) console.log("[获取数据]",result1);
					if(result1.d.results[0].VERIFICATION_BOOLEAN=="false"){
						newObj.tableName ="HardwareAssetss";
						newObj.type = "add";
						newObj.updataObjec = dataObjec;
						oDataHandleYFT.handle(
							newObj,
							function(resp) {
								callback(resp);
							},
							function(resp) {
								if(error) error(resp);
							}
						);
					}
					else{
						if(error) error({invalidAssetCode:true});
					}
				},
				error : function(result1){
					if(error) error(result1);
					Util.customInterfaceInfo(result1);
				}
			});
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'createAssetMaintainOrder', {
	value: function(dataObjec, callback, error) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		serviceUrl = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			newObj.tableName ="AssetsMaintenanceList";
			newObj.type = "add";
			newObj.updataObjec = dataObjec;
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					if(debug) console.log("[获取数据]",resp);
					callback(resp);
				},
				function(resp) {
					if(error) error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'createMonitorAsset', {//根据监控设备信息列表生成多个资产
	value: function(dataObjec, callback, errorCallback) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		if(token != '') {
			var response = {};
			var datasets = [], dataset = [];
			var dataset_len = 200;
			for(var i=0;i<dataObjec.length;i+=dataset_len){
				dataset = [];
		 		for(var j=i;j<dataset_len+i;j++){
					if(!dataObjec[j]) break;
					dataset.push(dataObjec[j]);
				}
				datasets.push(dataset);
			}
			var finalResult = {
				SUCCESS_TOTAL:0,
				FAILURE_EQUIPMENT_LIST:[]
			};
			var index = 0;
			try{
				recursive(datasets[index]);
			}
			catch(e){
				errorCallback(e.message);
			}
			function recursive(dataset){
				var gb_codes = "";
				for(var i=0;i<dataset.length;i++){
					gb_codes += dataset[i].GBCODE;
					if(i<dataset.length-1) gb_codes += ",";
				}
				var rquestUri = serviceAddress+"GetYFTAssetBindAction?UNBINDLIST='"+gb_codes+"'&token="+token+"&";
				rquestUri = encodeURI(rquestUri);
				if(debug) console.log("[请求地址]",rquestUri);
				$.ajax({
					 type: "get",
					 async: true,
					 url: rquestUri,
					 dataType: "json",
					 cache:false,
					 success : function(result){
							var instance = result.d.results[0];
							if(instance.SUCCESS_TOTAL){
								var total = parseInt(instance.SUCCESS_TOTAL,10);
								finalResult.SUCCESS_TOTAL += total;
							}
							if(instance.FAILURE_EQUIPMENT_LIST){
								var J = eval(instance.FAILURE_EQUIPMENT_LIST);
								if(instance.FAILURE_EQUIPMENT_LIST=="[]"){
									J=[];
								}
								for(var k in J){
									finalResult.FAILURE_EQUIPMENT_LIST.push(J[k]);
								}
							}
							if(datasets[++index]){
								recursive(datasets[index]);
							}
							else{
								if(callback) callback(finalResult);
							}
					 },error : function(result){
		 				   errorCallback(result);
							 Util.customInterfaceInfo(result);
					 }
				});
			}
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'createAllMonitorAsset', {//绑定全部设备
	value: function(callback,errorCallback) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		var response = {};
		var finalResult = {
			SUCCESS_TOTAL:0,
			FAILURE_EQUIPMENT_LIST:[]
		};
		if(token != '') {
			var rquestUri = serviceAddress+"GetYFTAssetBindAction?token="+token+"&";
			rquestUri = encodeURI(rquestUri);
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({
				 type: "get",
				 async: true,
				 url: rquestUri,
				 dataType: "json",
				 cache:false,
				 success : function(result){
						var instance = result.d.results[0];
						finalResult.SUCCESS_TOTAL = instance.SUCCESS_TOTAL;
						finalResult.FAILURE_EQUIPMENT_LIST = eval(instance.FAILURE_EQUIPMENT_LIST);
						if(callback) callback(finalResult);
				 },error : function(result){
						if(errorCallback) errorCallback(result);
						Util.customInterfaceInfo(result);
				 }
			});
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getCreateData', {//获取新建资产页面数据（不包含未绑定检测设备列表）
	value: function(callback) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		var response = {};
		if(token != '') {
			var newObj = {};
			newObj.tableName ="ProductType";
			newObj.type = "query";
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(//获取设备类型列表
				newObj,
				function(result1) {
					response.assetsTypeList = result1;
					if(debug) console.log("[获取数据]",result1);
					newObj = {};
					newObj.tableName ="AssetsStatuss";
					newObj.type = "query";
					if(debug) console.log("[请求数据]",newObj);
					oDataHandleYFT.handle(//获取资产状态列表
						newObj,
						function(result2) {
							response.statusList = result2;
							if(debug) console.log("[获取数据]",result2);
							var rquestUri = serviceAddress+"Area?token="+token+"&";
							if(debug) console.log("[请求地址]",rquestUri);
							$.ajax({//获取区域id列表
								type: "get",
								async: true,
								url:rquestUri,
								dataType: "json",
								cache:false,
								success : function(result3){
									response.areaList = result3;
									if(debug) console.log("[获取数据]",result3);
									callback(response);
								},
								error : function(result3){
									Util.customInterfaceInfo(result3);
									//console.log("Get area id list error");
								}
							});
						}
					);
				}
			);
		}
		else {
			//console.log('token -  not null');
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getDevListData', {//获取未绑定检测设备列表
	value: function(callback) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		var response = {};
		if(token != '') {
			var rquestUri = serviceAddress+"GetUnboundedEquipmentList?token="+token+"&";
			rquestUri = encodeURI(rquestUri);
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({//获取未绑定的监控设备列表
				 type: "get",
				 async: true,
				 url:rquestUri,
				 dataType: "json",
				 cache:false,
				 success : function(result){
					 response.devList = result;
 					 if(debug) console.log("[获取数据]",result);
					 callback(response);
				 },
				 error : function(result){
					 Util.customInterfaceInfo(result);
					 //console.log("Get device list error");
				 }
			});
		}
		else {
			//console.log('token -  not null');
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getMaintainOrderData', {
	value: function(param) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		var response = {};
		if(token != '') {
			var rquestUri = serviceAddress+"Area?token="+token+"&";
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({//获取区域id列表
				type: "get",
				async: true,
				url:rquestUri,
				dataType: "json",
				cache:false,
				success : function(result){
					response.areaList = result;
					if(debug) console.log("[获取数据]",result);
					var rquestUri = serviceAddress+"GetMaintenanceList?token="+token+"&";
					if(param&&param.data&&param.data.fileNumber){
						rquestUri += "FILE_NUMBER='"+param.data.fileNumber+"'";
					}
					else if(param&&param.data){
						rquestUri += "FROM='"+param.data.from+"'";
						rquestUri += "&TO='"+param.data.to+"'";
						if(param.data.code) rquestUri += "&FILE_NUMBER_LIKE='"+param.data.code+"'";
						if(param.data.areaID) rquestUri += "&AREA_ID='"+param.data.areaID+"'";
						if(param.data.applier) rquestUri += "&CREATED_BY='"+param.data.applier+"'";
						if(param.data.maintainer) rquestUri += "&CHECK_NAME='"+param.data.maintainer+"'";
						if(param.data.sort_name&&param.data.sort_order){
							rquestUri += "&ORDERBY='"+param.data.sort_name+" "+param.data.sort_order+"'";
						}
					};
					rquestUri = encodeURI(rquestUri);
					if(debug) console.log("[请求地址]",rquestUri);
					$.ajax({//获取维修清单列表
						 type: "get",
						 async: true,
						 url: rquestUri,
						 dataType: "json",
						 cache:false,
						 success : function(result){
							 response.maintainOrder = result;
		 					 if(debug) console.log("[获取数据]",result);
							 if(param.callback) param.callback(response);
						 },error : function(result){
							 Util.customInterfaceInfo(result);
							 //console.log("Get maintain order list error");
						 }
					});
				},error : function(result){
					Util.customInterfaceInfo(result);
				}
			});
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getAssetData', {
	value: function(param) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		var response = {};
		if(token != '') {
			var newObj = {};
			newObj.tableName ="ProductType";
			newObj.type = "query";
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(//获取设备类型列表
				newObj,
				function(result1) {
					response.typeList = result1;
					if(debug) console.log("[获取数据]",result1);
					var rquestUri = serviceAddress+"Area?token="+token+"&";
					if(debug) console.log("[请求地址]",rquestUri);
					$.ajax({//获取区域id列表
						type: "get",
						async: true,
						url:rquestUri,
						dataType: "json",
						cache:false,
						success : function(result2){
							response.areaList = result2;
							if(debug) console.log("[获取数据]",result2);
							var rquestUri = serviceAddress+"GetAssetsList?token="+token+"&";
							if(param && param.data){
								rquestUri += "FROM='"+param.data.from+"'";
								rquestUri += "&TO='"+param.data.to+"'";
								if(param.data.name) rquestUri += "&ASSETS_NAME='"+param.data.name+"'";
								if(param.data.code) rquestUri += "&ASSETS_CODE='"+param.data.code+"'";
								if(param.data.typeID) rquestUri += "&PRODUCTTYPE_ID='"+param.data.typeID+"'";
								if(param.data.areaID) rquestUri += "&AREAID='"+param.data.areaID+"'";
								if(param.data.wpflag) rquestUri += "&WPFLAG='0'";
								if(param.data.sort_name && param.data.sort_order){
									rquestUri += "&ORDERBY='"+param.data.sort_name.toUpperCase()+" "+param.data.sort_order.toUpperCase()+"'";
								}
							}
							rquestUri = encodeURI(rquestUri);
							if(debug) console.log("[请求地址]",rquestUri);
							$.ajax({//获取资产列表
								 type: "get",
								 async: true,
								 url: rquestUri,
								 dataType: "json",
								 cache:false,
								 success : function(result3){
									 response.result = result3;
				 					 if(debug) console.log("[获取数据]",result3);
								 	 if(param.callback) param.callback(response);
								},error : function(result){
									 if(param.callback) param.callback(result);
									 Util.customInterfaceInfo(result);
								 }
							});
						},error : function(result){
							Util.customInterfaceInfo(result);
						}
					});
				}
			);
		}
		else {
			//console.log('token -  not null');
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getStatisticData', {
	value: function(callback) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		var response = {};
		if(token != '') {
			 var rquestUri = serviceAddress+"GetAssetsTypeStatistics?token="+token+"&";
 			 if(debug) console.log("[请求地址]",rquestUri);
			 $.ajax({//获取资产类型统计
 				 type: "get",
 				 async: true,
 				 url: rquestUri,
 				 dataType: "json",
				 cache:false,
 				 success : function(result1){
 					 response.assetTypeList = result1;
 					 if(debug) console.log("[获取数据]",result1);
					 var rquestUri = serviceAddress+"GetProtectAssetsStatistics?token="+token+"&";
		 			 if(debug) console.log("[请求地址]",rquestUri);
					 $.ajax({//获取过保资产类型统计
		 				 type: "get",
		 				 async: true,
		 				 url: rquestUri,
		 				 dataType: "json",
						 cache:false,
		 				 success : function(result2){//@MODIFY
		 					 response.overtimeAssetTypeList = result2;
		 					 if(debug) console.log("[获取数据]",result2);
							 var rquestUri = serviceAddress+"GetEquipmentMaintenanceTop?token="+token+"&";
				 			 if(debug) console.log("[请求地址]",rquestUri);
							 $.ajax({//获取设备维修TOP10统计
				 				 type: "get",
				 				 async: false,
				 				 url: rquestUri,
				 				 dataType: "json",
								 cache:false,
				 				 success : function(result3){
				 					 response.maintainTop10 = result3;
			 					 	 if(debug) console.log("[获取数据]",result3);
				 					 callback(response)
				 				},error : function(result){
									callback();
				 					 Util.customInterfaceInfo(result);
				 				 }
				 			});
		 				},error : function(result){
							callback();
		 					 Util.customInterfaceInfo(result);
		 				 }
		 			});
 				},error : function(result){
					 callback();
 					 Util.customInterfaceInfo(result);
 				 }
 			 });
		}
		else {
			//console.log('token -  not null');
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getMonitorData', {
	value: function(param) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		var response = {};
		if(token != '') {
			var rquestUri = serviceAddress+"GetYFTUnbindEquipment?STATUS='1'&token="+token+"&";
			if(param&&param.data){
				if(param.data.from!=undefined) rquestUri += "&FROM='"+param.data.from+"'";
				if(param.data.to!=undefined) rquestUri += "&TO='"+param.data.to+"'";
				if(param.data.sort_name&&param.data.sort_order){
					rquestUri += "&ORDERBY='"+param.data.sort_name.toUpperCase()+" "+param.data.sort_order.toUpperCase()+"'";
				}
			}
			rquestUri = encodeURI(rquestUri);
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({//获取未绑定的监控设备列表
				 type: "get",
				 async: true,
				 url: rquestUri,
				 dataType: "json",
				 cache:false,
				 success : function(result){
					 response.result = result;
 					 if(debug) console.log("[获取数据]",result);
				 	 if(param.callback) param.callback(response);
				},error : function(result){
					 Util.customInterfaceInfo(result);
				 }
			});
		}
		else {
			//console.log('token -  not null');
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getDetailData', {
	value: function(data,callback,errorCallback) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		var response = {};
		if(token != ''&& data.recid.length!=0) {
			var rquestUri = serviceAddress+"GetAssetsList?"+"RECID='"+data.recid+"'&token="+token+"&";
			rquestUri = encodeURI(rquestUri);
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({//获取单个资产详情
				 type: "get",
				 async: true,
				 url: rquestUri,
				 dataType: "json",
				 cache:false,
				 success : function(result1){
					 response.asset = result1;
 					 if(debug) console.log("[获取数据]",result1);
					 var rquestUri = serviceAddress+"GetMaintenanceList?"+"ASSETS_ID='"+data.recid+"'&token="+token+"&";
					 rquestUri = encodeURI(rquestUri);
		 			 if(debug) console.log("[请求地址]",rquestUri);
					 $.ajax({//获取该资产相关的维修单列表
						 type: "get",
						 async: false,
						 url: rquestUri,
						 dataType: "json",
						 cache:false,
						 success : function(result2){
							 response.maintainOrder = result2;
		 					 if(debug) console.log("[获取数据]",result2);
							 callback(response);
						 },error : function(result){
							 if(errorCallback) errorCallback(result);
							 Util.customInterfaceInfo(result);
						 }
					 });
					 callback(response);
				 },error : function(result){
					 if(errorCallback) errorCallback(result);
					 Util.customInterfaceInfo(result);
				 }
			});
		}
		else {
			//console.log('token -  not null');
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'getMaintainDetailData', {
	value: function(data,callback,errorCallback) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		var response = {};
		if(token != '' && data.recid.length!=0) {
			var rquestUri = serviceAddress+"GetMaintenanceList?"+"RECID='"+data.recid+"'&token="+token+"&";
			rquestUri = encodeURI(rquestUri);
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({//获取单个资产维修单详情
				 type: "get",
				 async: true,
				 url: rquestUri,
				 dataType: "json",
				 cache:false,
				 success : function(result1){//获取资产维修单对应的资产信息
		 			var singleMaintainOrder = eval(result1.d.results[0].MAINTENANCE_INFO)[0];
					if(debug) console.log("[获取数据]",result1);
					response.maintainOrder = singleMaintainOrder;
		 			var rquestUri = serviceAddress+"GetAssetsList?"+"RECID='"+response.maintainOrder.GBCode+"'&token="+token+"&";
					rquestUri = encodeURI(rquestUri);
					if(debug) console.log("[请求地址]",rquestUri);
					$.ajax({
						type: "get",
						async: false,
						url: rquestUri,
						dataType: "json",
						cache:false,
						success : function(result2){
	   					response.asset = result2;
	    				if(debug) console.log("[获取数据]",result2);
							if(callback) callback(response);
						},error : function(result){
							if(errorCallback) errorCallback(result);
							Util.customInterfaceInfo(result);
						}
					});
				 },error : function(result){
					 if(errorCallback) errorCallback(result);
					 Util.customInterfaceInfo(result);
				 }
			});
		}
		else {
			//console.log('token -  not null');
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'updateAsset', {
	value: function(dataObjec, old, callback, error) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		serviceUrl = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			if(!old){//如果资产编码有修改
				if(debug) console.log("[修改过资产编码，需验证唯一]");
				var rquestUri = serviceAddress+"GetAssetsCodeVerification?ASSETS_CODE='"+dataObjec.AssetsCode+"'&token="+token+"&";
				if(debug) console.log("[请求地址]",rquestUri);
				$.ajax({//获取资产编码是否唯一
					type: "get",
					async: true,
					url:rquestUri,
					dataType: "json",
					cache:false,
					success : function(result1){
						var newObj = {};
						if(debug) console.log("[获取数据]",result1);
						if(result1.d.results[0].VERIFICATION_BOOLEAN=="false"){
							newObj.tableName ="HardwareAssetss";
							newObj.type = "update";
							newObj.updataObjec = dataObjec;
							newObj.recId = dataObjec.RecId;
							if(debug) console.log("[请求数据]",newObj);
							oDataHandleYFT.handle(
								newObj,
								function(resp) {
									callback(resp);
								},
								function(resp) {
									if(error) error(resp);
								}
							);
						}
						else{
							if(error) error({invalidAssetCode:true});
						}
					},
					error : function(result1){
						if(error) error(result1);
						Util.customInterfaceInfo(result1);
					}
				});
			}
			else{//资产编码没有修改
				if(debug) console.log("[没有修改过资产编码，不验证唯一]");
				newObj.tableName ="HardwareAssetss";
				newObj.type = "update";
				newObj.updataObjec = dataObjec;
				newObj.recId = dataObjec.RecId;
				if(debug) console.log("[请求数据]",newObj);
				oDataHandleYFT.handle(
					newObj,
					function(resp) {
						callback(resp);
					},
					function(resp) {
						if(error) error(resp);
					}
				);
			}
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'updateMaintainOrder', {
	value: function(dataObjec, callback, error) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		serviceUrl = Store.get("serviceUrl");
		if(token != '') {
			var newObj = {};
			newObj.tableName ="AssetsMaintenanceList";
			newObj.type = "update";
			newObj.updataObjec = dataObjec;
			newObj.recId = dataObjec.RecId;
			if(debug) console.log("[请求数据]",newObj);
			oDataHandleYFT.handle(
				newObj,
				function(resp) {
					callback(resp);
				},
				function(resp) {
					if(error) error(resp);
				}
			);
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'deleteAssets', {//@MODIFY
	value: function(dataObjec, callback, error) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		serviceUrl = Store.get("serviceUrl");
		if(token != '') {
			var index = 0;
			try{
				recursive(dataObjec[index]);
			}
			catch(e){
				errorCallback(e.message);
				//console.log("Delete assets error: "+e.message);
			}
			function recursive(data){
				var newObj = {};
				newObj.tableName ="HardwareAssetss";
				newObj.type = "delete";
				newObj.updataObjec = data;
				newObj.recId = data.RECID;
				if(debug) console.log("[请求数据]",newObj);
				oDataHandleYFT.handle(
					newObj,
					function(resp) {
						callback(resp);
					},
					function(resp) {
						if(error) error(resp);
						//console.log("Delete assets error");
					}
				);
			}
		}
	}
});
Object.defineProperty(oDataHandleYFT, 'deleteMaintainOrders', {
	value: function(dataObjec, callback, errorCallback) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		serviceUrl = Store.get("serviceUrl");
		if(token != '') {
			var index = 0;
			if(!dataObjec[index]) return;
			try{
				recursive(dataObjec[index]);
			}
			catch(e){
				errorCallback(e.message);
			}
			function recursive(data){
				var newObj = {};
				newObj.tableName ="AssetsMaintenanceList";
				newObj.type = "delete";
				newObj.updataObjec = data;
				newObj.recId = data.recId;
				if(debug) console.log("[请求数据]",newObj);
				oDataHandleYFT.handle(
					newObj,
					function(resp) {
						if(dataObjec[++index]){
							recursive(dataObjec[index]);
						}
						else{
							if(callback) callback(resp);
						}
					},
					function(resp) {
						if(errorCallback) errorCallback(resp);
					}
				);
			}
		}
	}
});

module.exports = oDataHandleYFT;
