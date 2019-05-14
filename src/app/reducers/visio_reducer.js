import { combineReducers } from 'redux'

function getVisioList(state = [], action) {
    switch (action.type) {
        case "GETVISIOLIST":
          return action.data.status == "ok" ? action.data.result.results:[];
        default:
          return state
    }
}

//Visio数据
function getVisioData(state = '', action) {
    switch (action.type) {
        case "GETONEVISIODATA":
          return action.data.status == "ok" ? action.data.result.results[0]:{};
        default:
          return state
    }
}

//组织树数据
function getAllGroupOrg(state = '', action) {
    switch (action.type) {
        case "GETALLGROUPORG":
          return action.data;
        default:
          return state
    }
}

function getTreeId(state = '0', action) {
    switch (action.type) {
        case "SELECTTREEID":
          return action.data;
        default:
          return state
    }
}

function getEditTreeId(state = '', action) {
    switch (action.type) {
        case "SELECEDITTTREEID":
          return action.data;
        default:
          return state
    }
}

function getVisioStatus(state = true, action) {
    switch (action.type) {
        case "SETVISIOSTATUS":
          return action.data;
        default:
          return state
    }
}

const visioReducer = combineReducers({
  getVisioList,
  getVisioData,
  getAllGroupOrg,
  getTreeId,
  getEditTreeId,
  getVisioStatus
})

export default visioReducer
