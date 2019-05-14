/**
  知识库相关的action 方法
*/

var oData = require('../server/odataRepository');
var Store = require('../server/store');
var Util  = require('../views/itoss/component/baseManage/util');
import * as requestDataActions from './requestData_action'
import * as navActions from './navbar_action'

export const SETREPOSITORYSTATE_REPOSITORY = 'SETREPOSITORYSTATE_REPOSITORY'
export const SETREPOSITORYLIMIT_REPOSITORY = 'SETREPOSITORYLIMIT_REPOSITORY'
export const GET_CHECKPENDING_REPOSITORY = 'GET_CHECKPENDING_REPOSITORY'
export const SETCHECKPENDINGOBJ_REPOSITORY = 'SETCHECKPENDINGOBJ_REPOSITORY'
export const GETKNOWLEDGEBASELIST_REPOSITORY = 'GETKNOWLEDGEBASELIST_REPOSITORY'
export const SETKNOWLEDGELISTOBJ_REPOSITORY = 'SETKNOWLEDGELISTOBJ_REPOSITORY'
export const GETCOMMONKNOWLEDGE_REPOSITORY = 'GETCOMMONKNOWLEDGE_REPOSITORY'
export const GETUPDATEKNOWLEDGE_REPOSITORY = 'GETUPDATEKNOWLEDGE_REPOSITORY'
export const GETREPOSITORYSTATISTICS_REPOSITORY = 'GETREPOSITORYSTATISTICS_REPOSITORY'
export const GETFAULTTYPE_REPOSITORY = 'GETFAULTTYPE_REPOSITORY'
export const GETFAULTSUBTYPE_REPOSITORY = 'GETFAULTSUBTYPE_REPOSITORY'


export function setRepositoryState(isDisabled){
  return {
      type: SETREPOSITORYSTATE_REPOSITORY,
      isDisabled
  }
}
//设置权限
export function setRepositoryLimit(repositoryLimitObj){
  return {
      type: SETREPOSITORYLIMIT_REPOSITORY,
      repositoryLimitObj
  }
}
//待审核
export function set_checkPending(checkPending){
  return {
      type: GET_CHECKPENDING_REPOSITORY,
      checkPending
  }
}
//行选择设置obj
export function setCheckPendingObj(checkPendingObj){
  return {
      type: SETCHECKPENDINGOBJ_REPOSITORY,
      checkPendingObj
  }
}
//清单
export function set_knowledgeList(knowledgeList){
  return {
      type: GETKNOWLEDGEBASELIST_REPOSITORY,
      knowledgeList
  }
}
export function setknowledgeListObj(knowledgeListObj){
    return {
        type: SETKNOWLEDGELISTOBJ_REPOSITORY,
        knowledgeListObj
    }
}
//常用知识
export function set_CommonKnowledgeList(CommonKnowledgeList){
  return {
      type: GETCOMMONKNOWLEDGE_REPOSITORY,
      CommonKnowledgeList
  }
}
//更新知识
export function set_updateKnowledgeList(updateKnowledgeList){
  return {
      type: GETUPDATEKNOWLEDGE_REPOSITORY,
      updateKnowledgeList
  }
}
//知识库统计
export function set_knowledgeStatisticsList(knowledgeStatisticsList){
  return {
      type: GETREPOSITORYSTATISTICS_REPOSITORY,
      knowledgeStatisticsList
  }
}
//故障类型
export function set_faultTypes(faultTypes){
  return {
      type: GETFAULTTYPE_REPOSITORY,
      faultTypes
  }
}
//故障子类型
export function set_faultSubTypes(faultSubTypes){
  return {
      type: GETFAULTSUBTYPE_REPOSITORY,
      faultSubTypes
  }
}

//添加知识库
export function addRepository(filter){
  return (dispatch,getState) =>{
    dispatch(requestDataActions.setRequest());
    oData.saveRepository(filter,(code,data)=>{
      var state = getState();
      if(code == "ok"){
        $.showPublicDialog("系统提示","添加成功。");
        //this.isDisabled = true;
        dispatch(setRepositoryState(true));
        //if(this.repositoryLimitObj.repositoryApprovalList){

        if(Util.getSlaLimit().repositoryApprovalList){
          dispatch(navActions.setCurName("审核知识"));
          window.location.href="#/baseManage/repositoryApproval";
        }else{
          dispatch(navActions.setCurName("知识清单"));
          window.location.href="#/baseManage/repositoryList";
        }
        dispatch(requestDataActions.setRequestSuccess());
      }else{
        $.showPublicDialog("系统提示","添加失败。");
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
export function getCheckPending(filter){
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oData.getCheckPending(filter,(code,data)=>{
      if(code == "ok"){
         var resultData = data.results;
         var newData =[];
         if(resultData instanceof Array && resultData.length > 0){
           for(var i=0;i< resultData.length;i++){
             resultData[i].id=i;
             newData.push(resultData[i]);
           }
         }
         //this.checkPending = newData;
        dispatch(set_checkPending(newData));
        dispatch(requestDataActions.setRequestSuccess());
      }else{
        //alert("查询失败!");
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
//更新审核界面
function updatePage(){
  return dispatch=>{
    var filter = [{key:"Status",value:"已提交"},{key:"Status",value:"审核不通过"}];
    dispatch(getCheckPending(filter));
    dispatch(getCommonKnowledge(null));//常用知识
    dispatch(getUpdateKnowledge(null));//更新知识
    dispatch(getRepositoryStatistics(null));//知识库统计
  }
}

export function repositoryUpdate(updateObj){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.repositoryUpdate(updateObj,(code,data)=>{
      if(code == "ok"){
        if(updateObj.type == "count"){

        }else if(updateObj.type == "pass"){
          window.location.href="#/baseManage/repositoryApproval"
        }else if(updateObj.type == "nopass"){
          window.location.href="#/baseManage/repositoryApproval"
        }else if(updateObj.type == "commit"){
          window.location.href="#/baseManage/repositoryApproval"
        }
        dispatch(updatePage());
        dispatch(requestDataActions.setRequestSuccess());
      }else{
        if(updateObj.type == "pass"){
          $.showPublicDialog("系统提示","审核失败。");
        }else if(updateObj.type == "nopass"){
          $.showPublicDialog("系统提示","审核失败。");
        }else if(updateObj.type == "commit"){
          $.showPublicDialog("系统提示","提交失败。");
        }
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
//获取知识库清单
export function getKnowledgeBaseList(filter){
  //this.dispatch(Constants.REPOSITORY.GETKNOWLEDGEBASELIST,filter);
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.getKnowledgeBaseList(filter,(code,data)=>{
      if(code == "ok"){
         var resultData = data.results;
         var newData =[];
         if(resultData instanceof Array && resultData.length > 0){
           for(var i=0;i< resultData.length;i++){
            resultData[i].id=i;
             newData.push(resultData[i]);
           }
         }
         //this.knowledgeList = newData;
         dispatch(set_knowledgeList(newData));
         dispatch(requestDataActions.setRequestSuccess());
      }else{
        //alert("查询失败!"+results);
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}

//常用知识
export function getCommonKnowledge(filter){
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oData.getCommonKnowledge(filter,(code,data)=>{
      if(code == "ok"){
         var resultData = data.results;
         var newData =[];
         if(resultData instanceof Array && resultData.length > 0){
           for(var i=0;i< resultData.length;i++){
            resultData[i].id=i;
             newData.push(resultData[i]);
           }
         }
         //this.CommonKnowledgeList = newData;
         dispatch(set_CommonKnowledgeList(newData));
         dispatch(requestDataActions.setRequestSuccess());
      }else{
        //alert("查询失败!"+results);
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
//更新知识
export function getUpdateKnowledge(filter){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.getUpdateKnowledge(filter,(code,data)=>{
      if(code == "ok"){
         var resultData = data.results;
         var newData =[];
         if(resultData instanceof Array && resultData.length > 0){
           for(var i=0;i< resultData.length;i++){
            resultData[i].id=i;
             newData.push(resultData[i]);
           }
         }
        //  this.updateKnowledgeList = newData;
        dispatch(set_updateKnowledgeList(newData));
        dispatch(requestDataActions.setRequestSuccess());
      }else{
        //alert("查询失败!"+results);
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
//知识库统计
export function getRepositoryStatistics(filter){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.getRepositoryStatistics(filter,(code,data)=>{
      if(code == "ok"){
         var resultData = data.results;
         var newData =[];
         if(resultData instanceof Array && resultData.length > 0){
           for(var i=0;i< resultData.length;i++){
            resultData[i].id=i;
             newData.push(resultData[i]);
           }
         }
         //this.knowledgeStatisticsList = newData;
         dispatch(set_knowledgeStatisticsList(newData));
         dispatch(requestDataActions.setRequestSuccess());
      }else{
        //alert("查询失败!");
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
export function repositoryDelete(obj){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.repositoryDelete(obj,(code,data)=>{
      if(code == "ok"){
         $.showPublicDialog("系统提示","删除成功。");
         dispatch(getKnowledgeBaseList(null));
         dispatch(updatePage());
         dispatch(requestDataActions.setRequestSuccess());
      }else{
        // alert("删除失败!"+data);
        $.showPublicDialog("系统提示","删除失败。");
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
//故障类型
export function getFaultType(id){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.getFaultType((code,data)=>{
      if(code == "ok"){
        var faultData = data.results;
        var dataList = [];
        for(var i=0;i<faultData.length;i++){
          var data = {id:faultData[i].RecId,name:faultData[i].FaultName};
          dataList.push(data);
        }
        //this.faultSubTypes = dataList;
        dispatch(set_faultTypes(dataList));
        dispatch(requestDataActions.setRequestSuccess());
      }
    });
  }
}
//故障子类型
export function getFaultSubType(id){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.getFaultSubType(id,(code,data)=>{
      if(code == "ok"){
        var faultData = data.results;
        var dataList = [];
        for(var i=0;i<faultData.length;i++){
          var data = {id:faultData[i].RecId,name:faultData[i].FaultName};
          dataList.push(data);
        }
        //this.faultSubTypes = dataList;
        dispatch(set_faultSubTypes(dataList));
        dispatch(requestDataActions.setRequestSuccess());
      }
    });
  }
}
