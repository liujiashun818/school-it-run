var $ = require('jquery');
var Store = require('./store.js');
var base64 = require('../utils/base64.js');
var Util = require('../utils/util.js');
import * as requestDataActions from '../actions/requestData_action'
// Store.get_ServiceAddress();
// Store.get_tokenVerify();
var serviceAddress = Store.get("serviceUrl");
var tokenVerify = Store.get("tokenUrl");
var oDataHandle = require('./odata.js');

var oDataReport = function(){}
var token ="";
var serviceUrl = "";
var debug = false;

//获取视频考核的报表
Object.defineProperty(oDataReport,'getVideoCheckReport',{
    value:function(param,dispatch,callback){
        var token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
          var filters = {
            REPORT_TYPE: param.reportType,
            STARTTIME: param.startTime
          }
          if (param.endTime) {
            filters.ENDTIME = param.endTime;
          }
          var filterString="";
          if(filters != null){
              for(var key in filters){
                // console.log(obj);
                var value = filters[key];
                if(filterString == ""){
                    filterString = "&"+key+"="+"'"+value+"'";
                }else{
                    filterString += "&"+key+"="+"'"+value+"'";
                };
              }
          };
          var rquestUri = serviceAddress+"VideoAssessmentReport?token="+token+filterString;
          $.ajax({
      			method: 'get',
            async: true,
      			url: rquestUri,
      			dataType: "json",
            cache:false,
            error : function(result){
                Util.customInterfaceInfo(result);
                dispatch(requestDataActions.setRequestFail());
            }
      		}).then(function (response) {
             callback(response);
      		});
        } else {
            //console.log('token -  not null');
        }
    }
});

//获取摄像机在线的趋势报表
Object.defineProperty(oDataReport,'getCameraOnlineTrends',{
    value:function(time,dispatch,callback){
        var token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
          var filters = {
            DATETIME: time
          }
          var filterString= "&DATETIME=" + "'" + time + "'";
          var rquestUri = serviceAddress+"VideoTrendsOnlineReport?token="+token+filterString;

          $.ajax({
      			method: 'get',
            async: true,
      			url: rquestUri,
      			dataType: "json",
            cache:false,
            error : function(result){
                Util.customInterfaceInfo(result);
                dispatch(requestDataActions.setRequestFail());
            }
      		}).then(function (response) {
            callback(response);
      		});
        } else {
            //console.log('token -  not null');
        }
    }
});

//获取摄像机的统计报表（离线，录像丢失，视频丢失）
Object.defineProperty(oDataReport,'getVideoDetailsReport',{
    value:function(param,dispatch,callback){
        var token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
          var filters = {
            TYPE: param.type,
            DATETIME: param.datetime
          }
          if (param.endTime) {
            filters.ENDTIME = param.endTime;
          }
          // console.log(filters);
          var filterString="";
          if(filters != null){
              for(var key in filters){
                // console.log(obj);
                var value = filters[key];
                if(filterString == ""){
                    filterString = "&"+key+"="+"'"+value+"'";
                }else{
                    filterString += "&"+key+"="+"'"+value+"'";
                };
              }
          };
          var rquestUri = serviceAddress+"VideoDetailedReport?token="+token+filterString;

          $.ajax({
      			method: 'get',
            async: true,
      			url: rquestUri,
      			dataType: "json",
            cache:false,
            error : function(result){
                Util.customInterfaceInfo(result);
                dispatch(requestDataActions.setRequestFail());
            }
      		}).then(function (response) {
            callback(response);
      		});
        } else {
            //console.log('token -  not null');
        }
    }
});

//获取资产统计报表数据
Object.defineProperty(oDataReport, 'getStatisticReportData', {
	value: function(data,callback,errorCallback) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		var response = {};
		if(token != '') {
			var rquestUri = serviceAddress+"GetAssetsStatisticsReport?token="+token+
                            "&START_TIME='"+data.startDateStr+"'"+
                            "&END_TIME='"+data.endDateStr+"'"+
                            "&REPORT_TYPE='"+data.reportType+"'";
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({//获取资产统计报表数据
				 type: "get",
				 async: true,
				 url: rquestUri,
				 dataType: "json",
         cache:false,
				 success : function(result){
 					if(debug) console.log("[获取数据]",result);
					 response.assetReportList = result;
				 	 if(callback) callback(response);
				},error : function(result){
			   		 if(errorCallback) errorCallback(result.responseText);
					   Util.customInterfaceInfo(result);
				 }
			});
		}
		else {
			//console.log('token -  not null');
		}
	}
});
//获取资产维修报表数据
Object.defineProperty(oDataReport, 'getMaintainReportData', {
	value: function(data,callback,errorCallback) {
		serviceAddress = Store.get("serviceUrl");
		token = Store.get("token");
		var response = {};
		if(token != '') {
			var rquestUri = serviceAddress+"GetAssetsMaintenanceReport?token="+token+
                            "&START_TIME='"+data.startDateStr+"'"+
                            "&END_TIME='"+data.endDateStr+"'"+
                            "&REPORT_TYPE='"+data.reportType+"'";
			if(debug) console.log("[请求地址]",rquestUri);
			$.ajax({//获取资产维修报表数据
				 type: "get",
				 async: true,
				 url: rquestUri,
				 dataType: "json",
         cache:false,
				 success : function(result){
 					if(debug) console.log("[获取数据]",result);
					 response.maintainReportList = result;
				 	 if(callback) callback(response);
				},error : function(result){
			   		 if(errorCallback) errorCallback(result.responseText);
					   Util.customInterfaceInfo(result);
				 }
			});
		}
		else {
			//console.log('token -  not null');
		}
	}
});
//获取摄像机视频质量实时统计
Object.defineProperty(oDataReport,'getVideoRealTimeReport',{
    value:function(dispatch,callback){
        var token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
          var rquestUri = serviceAddress+"VideoRealTimeReporting?token="+token;
          $.ajax({
      			method: 'get',
            async: true,
      			url: rquestUri,
      			dataType: "json",
            cache:false,
            error : function(result){
                Util.customInterfaceInfo(result);
                dispatch(requestDataActions.setRequestFail());
            }
      		}).then(function (response) {
            callback(response);
      		});
        } else {
            //console.log('token -  not null');
        }
    }
});

//获取存储设备的报表（DVR,NVR,编码器）
Object.defineProperty(oDataReport,'getStorageReport',{
    value:function(param,dispatch,callback){
        var token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
          var filters = {
            REPORT_TYPE: param.reportType,
            STARTTIME: param.startTime
          }
          if (param.endTime) {
            filters.ENDTIME = param.endTime;
          }
          var filterString="";
          if(filters != null){
              for(var key in filters){
                // console.log(obj);
                var value = filters[key];
                if(filterString == ""){
                    filterString = "&"+key+"="+"'"+value+"'";
                }else{
                    filterString += "&"+key+"="+"'"+value+"'";
                };
              }
          };
          var rquestUri = serviceAddress+"StorageAssessmentReport?token="+token+filterString;

          $.ajax({
      			method: 'get',
            async: true,
      			url: rquestUri,
      			dataType: "json",
            cache:false,
            error : function(result){
                Util.customInterfaceInfo(result);
                dispatch(requestDataActions.setRequestFail());
            }
      		}).then(function (response) {
            callback(response);
      		});
        } else {
            //console.log('token -  not null');
        }
    }
});

//获取非视频类设备报表（服务器，交换机，防火墙，数据库）
Object.defineProperty(oDataReport,'getServerReport',{
    value:function(param,dispatch,callback){
        var token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
          var filters = {
            REPORT_TYPE: param.reportType,
            STARTTIME: param.startTime,
            SERVER_TYPE: param.serverType
          }
          if (param.endTime) {
            filters.ENDTIME = param.endTime;
          }
          var filterString="";
          if(filters != null){
              for(var key in filters){
                // console.log(obj);
                var value = filters[key];
                if(filterString == ""){
                    filterString = "&"+key+"="+"'"+value+"'";
                }else{
                    filterString += "&"+key+"="+"'"+value+"'";
                };
              }
          };
          var rquestUri = serviceAddress+"GetServerReport?token="+token+filterString;

          $.ajax({
      			method: 'get',
            async: true,
      			url: rquestUri,
      			dataType: "json",
            cache:false,
            error : function(result){
                Util.customInterfaceInfo(result);
                dispatch(requestDataActions.setRequestFail());
            }
      		}).then(function (response) {
            callback(response);
      		});
        } else {
            //console.log('token -  not null');
        }
    }
});

Object.defineProperty(oDataReport,'getOrderReportData',{
    value:function(param,dispatch,callback){
        var token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
          var filters = {
            REPORT_TYPE: param.REPORT_TYPE,
            STARTTIME: param.STARTTIME
          }
          if (param.ENDTIME) {
            filters.ENDTIME = param.ENDTIME;
          }
          var filterString="";
          if(filters != null){
              for(var key in filters){
                var value = filters[key];
                if(filterString == ""){
                    filterString = "&"+key+"="+"'"+value+"'";
                }else{
                    filterString += "&"+key+"="+"'"+value+"'";
                };
              }
          };
          var rquestUri = serviceAddress+"GetWorkOrderReport?token="+token+filterString;
          $.ajax({
      			method: 'get',
            async: true,
      			url: rquestUri,
      			dataType: "json",
            cache:false,
            error : function(result){
                Util.customInterfaceInfo(result);
                dispatch(requestDataActions.setRequestFail());
            }
      		}).then(function (response) {
            callback(response);
      		});
        } else {
            //console.log('token -  not null');
        }
    }
});

Object.defineProperty(oDataReport,'getChargeReportData',{
    value:function(filters,dispatch,callback){
        var token = Store.get("token");
        serviceAddress = Store.get("serviceUrl");
        if(token != '') {
          // console.log(filters);
          var filterString="";
          if(filters != null){
              for(var key in filters){
                // console.log(obj);
                var value = filters[key];
                if(filterString == ""){
                    filterString = "&"+key+"="+"'"+value+"'";
                }else{
                    filterString += "&"+key+"="+"'"+value+"'";
                };
              }
          };
          var rquestUri = serviceAddress+"GetAccountingAssessmentReport?token="+token+filterString;
          // console.log(rquestUri)
          $.ajax({
      			method: 'get',
            async: true,
      			url: rquestUri,
      			dataType: "json",
            cache:false,
            error : function(result){
                Util.customInterfaceInfo(result);
                dispatch(requestDataActions.setRequestFail());
            }
      		}).then(function (response) {
            callback(response);
      		});
        } else {
            //console.log('token -  not null');
        }
    }
});

module.exports = oDataReport
