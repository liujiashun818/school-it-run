/**
 * 导航栏相关action
 */
var oData = require('../server/odata');
var Store = require('../server/store');
var base64 = require('../utils/base64.js');

export const SET_CUR_ONENODE = 'SET_CUR_ONENODE'    //设置当前一级菜单
export const SET_CUR_TWONODE1 = 'SET_CUR_TWONODE1'    //设置当前二级菜单
export const SET_CUR_TWONODE2 = 'SET_CUR_TWONODE2'    //设置当前二级菜单
export const SET_CUR_TWONODE3 = 'SET_CUR_TWONODE3'    //设置当前二级菜单
export const SET_CUR_TWONODE4 = 'SET_CUR_TWONODE4'    //设置当前二级菜单
export const SET_CUR_TWONODE5 = 'SET_CUR_TWONODE5'    //设置当前二级菜单
export const SET_CUR_TWONODE6 = 'SET_CUR_TWONODE6'    //设置当前二级菜单
export const SET_CUR_TWONODE7 = 'SET_CUR_TWONODE7'    //设置当前二级菜单
export const SET_PRE_TWONODE1 = 'SET_PRE_TWONODE1'    //设置之前二级菜单
export const SET_PRE_TWONODE2 = 'SET_PRE_TWONODE2'    //设置之前二级菜单
export const SET_PRE_TWONODE3 = 'SET_PRE_TWONODE3'    //设置之前二级菜单
export const SET_PRE_TWONODE4 = 'SET_PRE_TWONODE4'    //设置之前二级菜单
export const SET_PRE_TWONODE5 = 'SET_PRE_TWONODE5'    //设置之前二级菜单
export const SET_PRE_TWONODE6 = 'SET_PRE_TWONODE6'    //设置之前二级菜单
export const SET_PRE_TWONODE7 = 'SET_PRE_TWONODE7'    //设置之前二级菜单
export const SET_CUR_THREENODE = 'SET_CUR_THREENODE'  //设置当前三级菜单
export const SET_PRE_THREENODE = 'SET_PRE_THREENODE'  //设置之前三级菜单
export const SET_CURNAME='SET_CURNAME'

export function setCurName(curName){
  return {
    type: SET_CURNAME,
    curName
  }
}

export function setCurOneNode(curNode) {
  return {
    type: SET_CUR_ONENODE,
    curNode
  }
}

export function setCurThreeNode(curNode){
  return {
    type: SET_CUR_THREENODE,
    curNode
  }
}

export function setPreThreeNode(curNode){
  return {
    type: SET_PRE_THREENODE,
    curNode
  }
}

export function setCurTwoNode(param) {
  var treeId = param[0];
  var curNode = param[1];
  switch (treeId) {
    case "indexMenu":
      return {
        type: SET_CUR_TWONODE1,
        curNode
      }
      break;
    case "resourceMenu":
      return {
        type: SET_CUR_TWONODE2,
        curNode
      }
      break;
    case "assetMenu":
      return {
        type: SET_CUR_TWONODE3,
        curNode
      }
      break;
    case "mapMenu":
      return {
        type: SET_CUR_TWONODE4,
        curNode
      }
      break;
    case "workOrderMenu":
      return {
        type: SET_CUR_TWONODE5,
        curNode
      }
      break;
    case "reportMenu":
      return {
        type: SET_CUR_TWONODE6,
        curNode
      }
      break;
    case "systemMenu":
      return {
        type: SET_CUR_TWONODE7,
        curNode
      }
      break;
  };
}

export function setPreTwoNode(param) {
  var treeId = param[0];
  var curNode = param[1];
  switch (treeId) {
    case "indexMenu":
      return {
        type: SET_PRE_TWONODE1,
        curNode
      }
      break;
    case "resourceMenu":
      return {
        type: SET_PRE_TWONODE2,
        curNode
      }
      break;
    case "assetMenu":
      return {
        type: SET_PRE_TWONODE3,
        curNode
      }
      break;
    case "mapMenu":
      return {
        type: SET_PRE_TWONODE4,
        curNode
      }
      break;
    case "workOrderMenu":
      return {
        type: SET_PRE_TWONODE5,
        curNode
      }
      break;
    case "reportMenu":
      return {
        type: SET_PRE_TWONODE6,
        curNode
      }
      break;
    case "systemMenu":
      return {
        type: SET_PRE_TWONODE7,
        curNode
      }
      break;
  };
}
