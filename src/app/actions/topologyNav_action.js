/**
* 拓朴导航 相关的 action 方法
*/

var History = require('react-router').History;
var oDataTopology = require('../server/odataTopology');
var Store = require('../server/store');
import * as requestDataActions from './requestData_action'

export const SET_ALLMAP_MARKERS_LIST_MAPLV = 'SET_ALLMAP_MARKERS_LIST_MAPLV'
export const SET_ALLMAP_MARKERS_LIST = 'SET_ALLMAP_MARKERS_LIST'
export const SET_ALLMAP_MARKERS_MYLIST = 'SET_ALLMAP_MARKERS_MYLIST'
export const SET_NODEPOINT_TOPOLOGYNAV = 'SET_NODEPOINT_TOPOLOGYNAV'
export const SET_INITNODETOKEN_TOPOLOGYNAV = 'SET_INITNODETOKEN_TOPOLOGYNAV'
export const GET_TPJBDICTIONARYDATA = 'GET_TPJBDICTIONARYDATA'

export function onSetNodePoint(nodePoint) {
  return {
      type: SET_NODEPOINT_TOPOLOGYNAV,
      nodePoint
  }
}

export function onSetInitNodeToken(nodeToken) {
  return {
      type: SET_INITNODETOKEN_TOPOLOGYNAV,
      nodeToken
  }
}

export function set_map_markers_maplv(initMAPLV) {
  return {
      type: SET_ALLMAP_MARKERS_LIST_MAPLV,
      initMAPLV
  }
}

export function set_allmap_markers_list(deviceMaps) {
  return {
      type: SET_ALLMAP_MARKERS_LIST,
      deviceMaps
  }
}

export function set_allmap_markers_mylist(mydeviceMaps) {
  return {
      type: SET_ALLMAP_MARKERS_MYLIST,
      mydeviceMaps
  }
}

export function set_TpjbDictionaryData(tpjbdictionaryData){
  return {
      type: GET_TPJBDICTIONARYDATA,
      tpjbdictionaryData
  }
}

//获取当前要跳转点的token -上个版本
export function getMapNodeToken(param) {
  return dispatch => {
    dispatch(requestDataActions.setRequest());
    oDataTopology.getNodeToken(param, data => {
      var res = JSON.parse(data);
      // console.log(res);
      if (res.result == 'ok') {
        //this.nodeToken = res.token;
        dispatch(onSetInitNodeToken(res.token));
        Store.set("multi_roles_topolog", res.multi_roles);
        if(res.multi_roles == "1") {
          Store.set("roles_topolog", res.roles);
        }else{
          Store.set("CURRENT_ROLENAME_topolog", res.roles);
        }
        // Store.set("token",this.nodeToken);
      }
      dispatch(requestDataActions.setRequestSuccess());
    });
  }
}
//获取当前要跳转点的token
export function getMapNodeTokenNew(param) {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        var param1 = {
          password:param.PASSWD,
          username:param.USER,
          url:param.HOSTA
        };
        oDataTopology.getNodeTokenNew(param1, data => {
            // multi_roles: "0"
            // result: "ok"
            // roles: "管理员"
            // token: "A3165EABF39446A88D8CF632248207E6"
            if (data.result == 'ok') {
              dispatch(onSetInitNodeToken(data.token));
              Store.set("multi_roles_topolog", data.multi_roles);
              if(data.multi_roles == "1") {
                Store.set("roles_topolog", data.roles);
              }else{
                Store.set("CURRENT_ROLENAME_topolog", data.roles);
              }
            }
            else if(data.result == "error"){
              //{"result":"error","errorMsg":"您输入的用户名或密码不正确, 请重新输入。"}
              $.showPublicDialog("系统提示",data.errorMsg);
            }
            else if(data.results == undefined){
              $.showPublicDialog("系统提示","获的token出错，所以不能进行跳转。");
            }
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}
// this.deviceMaps = [
//    {"latitude":43.8059382,"longtitude":87.6055852,"city_Name":"乌鲁木齐市"},
//    {"latitude":42.8393058,"longtitude":93.5042928,"city_Name":"哈密市"},
//    {"latitude":41.7613869,"longtitude":86.144541,"city_Name":"库尔勒市"}
// ];
//获取网络拓扑数据
export function getAllMapMarkersList(param) {
  return (dispatch, getState) =>{
    dispatch(requestDataActions.setRequest());
    var state = getState();
    if(param.MAPLV == ''){
      oDataTopology.getTopologyData(data => {
        var tempdata = data;
        //this.initMAPLV ='';
        dispatch(set_map_markers_maplv(''));
        if(tempdata.length > 0){
          //this.mydeviceMaps = tempdata;
          dispatch(set_allmap_markers_mylist(tempdata));
          state = getState();
          for (var i = 0; i < state.topologyNavReducer.tpjbdictionaryData.length; i++) {
            if(state.topologyNavReducer.tpjbdictionaryData[i].CODE == state.topologyNavReducer.mydeviceMaps[0].MAPLV){
              if((i+1) < state.topologyNavReducer.tpjbdictionaryData.length){
                //this.initMAPLV = this.tpjbdictionaryData[i+1];
                dispatch(set_map_markers_maplv(state.topologyNavReducer.tpjbdictionaryData[i+1]));
              }else{
                //this.initMAPLV = this.tpjbdictionaryData[i];
                dispatch(set_map_markers_maplv(state.topologyNavReducer.tpjbdictionaryData[i]));
              };
              break;
            }
          };
          state = getState();
          var tempparam = {
            MAPLV:state.topologyNavReducer.initMAPLV.CODE
          };
          oDataTopology.getTopologyDataParam(tempparam,data => {
            // this.deviceMaps = data;
            dispatch(set_allmap_markers_list(data));
            dispatch(requestDataActions.setRequestSuccess());
          });
        }else{
          dispatch(requestDataActions.setRequestSuccess());
        }
      });
    }else{
      oDataTopology.getTopologyDataParam(param,data => {
        dispatch(set_allmap_markers_list(data))
        dispatch(requestDataActions.setRequestSuccess());
      });
    }
  }
}

export function onGetUserInfoByToken(par) {
  return dispatch =>{
    var url = "http://" + par.host;
    var href = url + '/yft/index.html#/cityIndex';
    Store.set("serviceUrl",url + '/bods.svc/');
    Store.set("servletServiceUrl",url + '/');
    Store.set("tokenUrl",url + '/rest/auth/login');
    // console.log('serviceUrl',Store.get('serviceUrl'));
    // console.log('servletServiceUrl',Store.get('servletServiceUrl'));
    // console.log('tokenUrl',Store.get('tokenUrl'));
    oDataTopology.queryGetUserInfo(par, data => {
      // console.log(data.results[0]);
      Store.set("USER_ID",data.results[0].USER_ID);
      Store.set("USERNAME",data.results[0].USERNAME);
      Store.set("LEVEL",data.results[0].LEVEL);//1是厅级  2是市级
      Store.set("GROUP_NAME",data.results[0].GROUP_NAME);//安全群群组名
      Store.set("GROUP_ID",data.results[0].GROUP_ID);//安全群群组ID
      Store.set("DIAGNOSIS",data.results[0].DIAGNOSIS);//诊断平台地址
      //console.log('token=========',Store.get('token'));
      window.location.href = href + "/" + par.token + "/" + par.loginid +"/" + par.role;
    });
  }
}

export function onGetTpjbDictionaryData() {
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oDataTopology.getTpjbDictionaryData(data => {
      dispatch(set_TpjbDictionaryData(data.results))
      dispatch(requestDataActions.setRequestSuccess());
    });
  }
}
