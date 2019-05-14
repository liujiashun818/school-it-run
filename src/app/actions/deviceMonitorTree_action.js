/**
 * 统一监控平台左侧树相关action
 */
var oData = require('../server/odatayft');
import * as requestDataActions from './requestData_action'

export const SET_DEVICEMONITORTREEDATA = 'SET_DEVICEMONITORTREEDATA'
export const SET_AREADATA = 'SET_AREADATA'
// export const GET_DEVICEMONITORTREEDATA = 'GET_DEVICEMONITORTREEDATA'

export function setDeviceMonitorTreeData(deviceMonitorTreeData) {
    return {
        type: SET_DEVICEMONITORTREEDATA,
        deviceMonitorTreeData
    }
}

export function setAreaData(areaData) {
    return {
        type: SET_AREADATA,
        areaData
    }
}

function receiveGetDeviceMonitorTree(data) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        };
        var tempdata = data.results[0];
        // //通过eval() 函数可以将JSON字符串转化为对象
        var dataobj = eval(tempdata);
        dataobj = dataobj.MONITORTREE;
        dataobj = eval('('+dataobj+')');//将json对像转成数组
        var areaData = [];
        for(var i = 0; i < dataobj.length; i++) {
            if(dataobj[i].type=="organize" || dataobj[i].type=="other") {
                // _this.areaData.push(dataobj[i]);
                areaData.push(dataobj[i]);
            }
        }
        dispatch(setDeviceMonitorTreeData(dataobj));
        dispatch(setAreaData(areaData));
        // _this.deviceMonitorTreeData = dataobj;
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
    }
}
function oDataGetDeviceMonitorTree(filter) {
    return dispatch => {
		oData.getDeviceMonitorTree(filter, data => dispatch(receiveGetDeviceMonitorTree(data)));
    }
}
export function getDeviceMonitorTreeData(filter) {
    return dispatch => {
        // dispatch(setDeviceMonitorTreeData([]));
        // dispatch(setAreaData([]));
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetDeviceMonitorTree(filter))
    }
}

function receiveGetDeviceMonitorTreeByType(data) {
    return dispatch => {
        if(data.results.length == 0){
            // _this.emit("change");
            dispatch(requestDataActions.setRequestFail());
            return;
        };
        var tempdata = data.results[0];
        // //通过eval() 函数可以将JSON字符串转化为对象
        var dataobj = eval(tempdata);
        dataobj = dataobj.MONITORTREE;
        dataobj = eval('('+dataobj+')');//将json对像转成数组
        var areaData = [];
        for(var i = 0; i < dataobj.length; i++) {
            if(dataobj[i].type=="organize" || dataobj[i].type=="other") {
                // _this.areaData.push(dataobj[i]);
                areaData.push(dataobj[i]);
            }
        }
        dispatch(setDeviceMonitorTreeData(dataobj));
        dispatch(setAreaData(areaData));
        // _this.deviceMonitorTreeData = dataobj;
        // _this.emit("change");
        dispatch(requestDataActions.setRequestSuccess());
    }
}
function oDataGetDeviceMonitorTreeByType(filter) {
    return dispatch => {
		oData.getDeviceMonitorTreeByType(filter, data => dispatch(receiveGetDeviceMonitorTreeByType(data)));
    }
}
export function getDeviceMonitorTreeDataByType(filter) {
    return dispatch => {
        // dispatch(setDeviceMonitorTreeData([]));
        // dispatch(setAreaData([]));
        dispatch(requestDataActions.setRequest());
        return dispatch(oDataGetDeviceMonitorTreeByType(filter))
    }
}
