/**
* 首页、告警升级列表相关的reducer方法
*/

import { combineReducers } from 'redux'
import {
  SET_CITY_INDEXDATA,
  SET_CHANGE_INDEXDATA,
  SET_DEPART_INDEXDATA,
  SET_CHANGE_DEPTINDEXDATA,
  GETREPORTERRORDATA,
  GETUSERINFOBYTOKEN,
  GETREPORTERRORDATAUI_EQUIPMENTTYPES,
  GETREPORTERRORDATAUI_ORGANIZATIONS,
  SET_LINSHIDATA,
  SET_LINSHINODE,
  SET_LINSHINAME,
  SET_NEWNAVBAR_COMPONENT,
  SET_BUSOBDEFNAMES,
  SET_BUSOBDEFFIELD
} from '../actions/index_action'

function busObDefField(state = [], action) {
  switch (action.type) {
    case SET_BUSOBDEFFIELD:
      return action.data;
    default:
      return state;
  }
}
function busObDefNames(state = [], action) {
  switch (action.type) {
    case SET_BUSOBDEFNAMES:
      return action.data;
    default:
      return state;
  }
}
function cityIndexData(state = '', action) {
    switch (action.type) {
        case SET_CITY_INDEXDATA:
          return action.data;
        case SET_CHANGE_INDEXDATA:
          return Object.assign({},state,{
              monitorData: action.data
          });
        default:
          return state
    }
}
function departmentIndexData(state = '', action) {
    switch (action.type) {
        case SET_DEPART_INDEXDATA:
          return action.data;
        case SET_CHANGE_DEPTINDEXDATA:
          return Object.assign({},state,{
              statusData: action.data
          });
        default:
          return state
    }
}

function reportErrorData(state = [], action) {
    switch (action.type) {
        case GETREPORTERRORDATA:
          return action.reportErrorData;
        default:
          return state
    }
};

function equipmentTypes(state =[] , action) {
    switch (action.type) {
        case GETREPORTERRORDATAUI_EQUIPMENTTYPES:
          return action.equipmentTypes;
        default:
          return state
    }
};

function organizations(state =[] , action) {
    switch (action.type) {
        case GETREPORTERRORDATAUI_ORGANIZATIONS:
          return action.organizations;
        default:
          return state
    }
};

function linshiData(state ='' , action) {
    switch (action.type) {
        case SET_LINSHIDATA:
          return action.data;
        default:
          return state
    }
};

function linshiNode(state ='' , action) {
    switch (action.type) {
        case SET_LINSHINODE:
          return action.data;
        default:
          return state
    }
};

function linshiName(state ='' , action) {
    switch (action.type) {
        case SET_LINSHINAME:
          return action.data;
        default:
          return state
    }
};

function newnavbarcomponent(state = null , action) {
    switch (action.type) {
        case SET_NEWNAVBAR_COMPONENT:
          return action.newnavbarcomponent;
        default:
          return state
    }
};


const indexReducer = combineReducers({
    cityIndexData,
    departmentIndexData,
    reportErrorData,
    equipmentTypes,
    organizations,
    linshiData,
    linshiNode,
    linshiName,
    newnavbarcomponent,
    busObDefNames,
    busObDefField
})

export default indexReducer
