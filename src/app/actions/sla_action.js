import oData from '../server/odataSla';
import * as requestDataActions from './requestData_action'

//获取服务级别列表========================================
export const GETSLALIST = 'GETSLALIST';
export function emitSlaList(data) {
    return {
        type: GETSLALIST,
        data
    }
}

export function getSlaList(obj){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.GetServiceLevelAgreement(obj,function(data){
      if(data.code == "ok"){
          var resultData = $.parseJSON(data.result.results[0].SERVICELEVELAGREEMENT);
           var newData =[];
           if(resultData instanceof Array && resultData.length > 0){
             for(var i=0;i< resultData.length;i++){
                resultData[i].id=i;
                var str = resultData[i].createddatetime;
                var slaStr = str.substring(0,str.length-2);
                resultData[i].createddatetime =slaStr;
                newData.push(resultData[i]);
             }
           }
          dispatch(emitSlaList(newData)) ;
          dispatch(requestDataActions.setRequestSuccess());
        }
    });
  }
}

//添加服务级别=============================================
export function addSla(obj){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.slaAdd(obj,function(data){
      if(data.code == "ok"){
        window.location.href="#/baseManage/slaList";
        dispatch(requestDataActions.setRequestSuccess());
      }
    });
  }
}

//删除服务级别==============================
export function slaDelete(obj){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.slaDelete(obj,function(data){
        dispatch(requestDataActions.setRequestSuccess());
    });
  }
}
//多条记录删除====================================================
export function slaMultDelete(obj){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.slaMultDelete(obj,function(data){
      if(data.code == "ok"){
        dispatch(getSlaList({}));
        $.showPublicDialog('提示','删除成功!');
        dispatch(requestDataActions.setRequestSuccess());
      }
    });
  }
}
//更新服务级别========================================
export function slaUpdate(obj){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.slaUpdate(obj,function(data){
      if(data.code == "ok"){
          window.location.href="#/baseManage/slaList";
          dispatch(requestDataActions.setRequestSuccess());
      }
    });
  }
}
//设置选择行数据==========================================
export const GELECTROWOBJ = 'GELECTROWOBJ';
export function emitSelectRowObj(data) {
    return {
        type: GELECTROWOBJ,
        data
    }
}

//用于更新状态===========================================
export const GETSLASTATE = 'GETSLASTATE';
//{isAdd:false,isDelete:false}
export function emitSlaState(data) {
    return {
        type: GETSLALIST,
        data
    }
}
//获取服务大类===================================================================
export const GETSERVICEBIGTYPE = 'GETSERVICEBIGTYPE';
export function emitServiceBigType(data) {
    return {
        type: GETSERVICEBIGTYPE,
        data
    }
}

export function getServiceBigType(obj){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.getServiceBigType(function(data){
      if(data.code == "ok"){
        var dataList = [];
        for(var i=0;i<data.result.results.length;i++){
            let reData = {id:data.result.results[i].RecId,name:data.result.results[i].FaultName};
            dataList.push(reData);
          }
        dispatch(emitServiceBigType(dataList));
        dispatch(requestDataActions.setRequestSuccess());
        }
    });
  }
}
