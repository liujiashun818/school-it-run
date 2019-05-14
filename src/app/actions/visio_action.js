import oData from '../server/odataVisio';
var Store = require('../server/store');
import * as requestDataActions from './requestData_action'

//===================获取所有Visio视图数据====================
export const GETVISIOLIST = 'GETVISIOLIST';//获取visio 数据
export function emitSetVisioList(data) {
    return {
        type: GETVISIOLIST,
        data
    }
}
function setVisioList(data){
  return dispatch => {
    dispatch(requestDataActions.setRequestSuccess());
    return dispatch(emitSetVisioList(data));
  }
}
export function loadVisioList(obj){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.loadVisioList(obj,data => dispatch(setVisioList(data)));
  }
}
//==================获取单个Visio视图数据=========================
export const GETONEVISIODATA = 'GETONEVISIODATA';//获取visio 数据
export function emitSetOneVisioData(data) {
    return {
        type: GETONEVISIODATA,
        data
    }
}
function setOneVisioData(data){
  return dispatch => {
    dispatch(requestDataActions.setRequestSuccess());
    return dispatch(emitSetOneVisioData(data));
  }
}
export function getOneVisioData(obj){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.getClickTopology(obj,data => dispatch(setOneVisioData(data)));
  }
}
//======================清除单个Visio视图数据==========================
export function destroyTopology(){
  return dispatch => {
    return dispatch(emitSetOneVisioData({status:"clear"}));
  }
}
//===========================获取组织机构树============================
export const GETALLGROUPORG = "GETALLGROUPORG";
export function emitGetAllGroupOrg(data) {
    return {
        type: GETALLGROUPORG,
        data
    }
}
function setGetAllGroupOrg(data){
  return dispatch => {
    dispatch(requestDataActions.setRequestSuccess());
    return dispatch(emitGetAllGroupOrg(data));
  }
}
export function getAllGroupOrg(){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.getAllGroupOrg(data => {
      if(data.status == "ok"){
        var resultData = $.parseJSON(data.result.results[0].ORGANIZATION);
        var list = [];
        var temp = Store.get("localUserName");
        if(temp != "admin"){
          for(var i=0;i<resultData.length;i++){
            var pId = resultData[i].parentOrganization;
            var nam = resultData[i].organizationName;
            if(pId == null || pId == "" || pId == "undefined"){
              pId = 0;
            };
            if(nam == null || nam == ""){
              continue;
            };
            var ldata = {
              id:resultData[i].organizationCode,
              pId:pId,
              name:resultData[i].organizationName
            };
            list.push(ldata);
          };
        }else{
          list.push({
            id:"0",
            pId:"0",
            open: true,
            parent: false,
            name:"所有组织机构"
          });
          for(var i=0;i<resultData.length;i++){
            var pId = resultData[i].parentOrganization;
            var nam = resultData[i].organizationName;
            if(pId == null || pId == "" || pId == "undefined"){
              pId = 0;
            };
            if(nam == null || nam == ""){
              continue;
            };
            var ldata = {
              id:resultData[i].organizationCode,
              pId:pId,
              name:resultData[i].organizationName
            };
            list.push(ldata);
          };
        }
        dispatch(setGetAllGroupOrg(list))
        dispatch(emitSetVisioStatus(true));
      }
    });

  }
}
//=============================设置树是否要更新===========================
export const SETVISIOSTATUS = "SETVISIOSTATUS";
export function emitSetVisioStatus(data) {
    return {
        type: SETVISIOSTATUS,
        data
    }
}

//=============================设置选中树ID===============================
export const SELECTTREEID = "SELECTTREEID";
export function emitSelectTreeId(data) {
    return {
        type: SELECTTREEID,
        data
    }
}
export function setTreeId(id){
  return dispatch => {
    return dispatch(emitSelectTreeId(id));
  }
}
//=============================设置修改树选中ID===============================
export const SELECEDITTTREEID = "SELECEDITTTREEID";
export function emitSelectEditTreeId(data) {
    return {
        type: SELECEDITTTREEID,
        data
    }
}
export function setEditTreeId(id){
  return dispatch => {
    return dispatch(emitSelectEditTreeId(id));
  }
}
//===========================修改Visio图属性==================================
export const EDITVISIOPROPERTY = "EDITVISIOPROPERTY";
export function emiteditVisioProperty(data) {
    return {
        type: EDITVISIOPROPERTY,
        data
    }
}
export function editVisioProperty(obj){
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oData.editTopology(obj,function(data){
      refreshPage(dispatch,obj);
      $.showPublicDialog("拓扑缩略图","修改成功!");
      $('#myViewModal').modal('hide');
      dispatch(requestDataActions.setRequestSuccess());
    });
  }
}
//==============================删除VIsio视图===============================
export function deleteVisio(obj){
  return dispatch => {
      dispatch(requestDataActions.setRequest());
      oData.deleteTopology(obj,function(){
        refreshPage(dispatch,obj);
        dispatch(requestDataActions.setRequestSuccess());
      })
  }
}

//=========================内部公用方法===================================
//查询数据更新界面
function refreshPage(dispatch,obj){
  if(obj.updateNodeId == "0"){
    dispatch(loadVisioList({}));
  }else{
    dispatch(loadVisioList({ORGANIZATION:obj.updateNodeId}));
  }
}
