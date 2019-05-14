/**
 * 报表-资产报表action
 */
var oData = require('../server/odataReport');
import * as requestDataActions from './requestData_action'

export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const SET_DEFAULTDEVICESTATEVALUE = 'SET_DEFAULTDEVICESTATEVALUE';
export const SET_MAINTAINREPORTMONTHLYDATA = 'SET_MAINTAINREPORTMONTHLYDATA';
export const SET_MAINTAINREPORTYEARLYDATA = 'SET_MAINTAINREPORTYEARLYDATA';
export const SET_ASSETREPORTMONTHLYDATA = 'SET_ASSETREPORTMONTHLYDATA';
export const SET_ASSETREPORTYEARLYDATA = 'SET_ASSETREPORTYEARLYDATA';
export function setPermissions(permissions) {
    return {
        type: SET_PERMISSIONS,
        permissions
    }
}
export function setDefaultDeviceStateValue(defaultDeviceStateValue) {
    return {
        type: SET_DEFAULTDEVICESTATEVALUE,
        defaultDeviceStateValue
    }
}
export function setMaintainReportMonthlyData(maintainReportMonthlyData) {
    return {
        type: SET_MAINTAINREPORTMONTHLYDATA,
        maintainReportMonthlyData
    }
}
export function setMaintainReportYearlyData(maintainReportYearlyData) {
    return {
        type: SET_MAINTAINREPORTYEARLYDATA,
        maintainReportYearlyData
    }
}
export function setAssetReportMonthlyData(assetReportMonthlyData) {
    return {
        type: SET_ASSETREPORTMONTHLYDATA,
        assetReportMonthlyData
    }
}
export function setAssetReportYearlyData(assetReportYearlyData) {
    return {
        type: SET_ASSETREPORTYEARLYDATA,
        assetReportYearlyData
    }
}

export function setInitData(param) {
    return dispatch => {
        dispatch(setMaintainReportMonthlyData([]));
        dispatch(setMaintainReportYearlyData([]));
        dispatch(setAssetReportMonthlyData([]));
        dispatch(setAssetReportYearlyData([]));
    }
}
export function getStatisticReportData(param) {
    return dispatch => {
  		if(!param||!param.data) return;
  		var type = param.data.reportType;
      dispatch(requestDataActions.setRequest());
  		oData.getStatisticReportData(param.data,
        function(response){ //成功回调
  				if(type=="Monthly"){
            var assetReportMonthlyData = [];
  					if(response){
  						assetReportMonthlyData = eval(response.assetReportList.d.results[0].ASSETS_INFO);
  					};
  					if(assetReportMonthlyData[0] == null) assetReportMonthlyData = [];
            dispatch(setAssetReportMonthlyData(assetReportMonthlyData));
  				}
          else if(type=="Yearly"){
              var assetReportYearlyData = [];
  					if(response){
  						assetReportYearlyData = eval(response.assetReportList.d.results[0].ASSETS_INFO);
  					};
  					if(assetReportYearlyData[0] == null) assetReportYearlyData = [];
              dispatch(setAssetReportYearlyData(assetReportYearlyData));
  				};
          dispatch(requestDataActions.setRequestSuccess());
  			},
  			function(response){ //失败回调
  				if(type=="Monthly"){
              dispatch(setAssetReportMonthlyData([]));
  				}
          else if(type=="Yearly"){
             dispatch(setAssetReportYearlyData([]));
  				};
          dispatch(requestDataActions.setRequestFail());
  			}
  		);
    }
}
export function getMaintainReportData(param) {
    return dispatch => {
        if(!param||!param.data) return;
    		var type = param.data.reportType;
        dispatch(requestDataActions.setRequest());
    		oData.getMaintainReportData(param.data,
    			function(response){//获取成功
    				if(type=="Monthly"){
              var maintainReportMonthlyData = [];
    					if(response){
    						maintainReportMonthlyData = response.maintainReportList.d.results;
    					};
              dispatch(setMaintainReportMonthlyData(maintainReportMonthlyData));
    				}
            else if(type=="Yearly"){
              var maintainReportYearlyData = [];
    					if(response){
    						maintainReportYearlyData = response.maintainReportList.d.results;
    					};
              dispatch(setMaintainReportYearlyData(maintainReportYearlyData));
    				};
            dispatch(requestDataActions.setRequestSuccess());
    			},
    			function(response){//获取失败
    				if(type=="Monthly"){
                dispatch(setMaintainReportMonthlyData([]));
    				}
            else if(type=="Yearly"){
                dispatch(setMaintainReportYearlyData([]));
    				};
            dispatch(requestDataActions.setRequestFail());
    			}
    		);
    }
}
