import { combineReducers } from 'redux'

function getSlaListData(state = [], action) {
    switch (action.type) {
        case "GETSLALIST":
          return action.data;
        default:
          return state
    }
}
function getSlaState(state = {}, action) {
    switch (action.type) {
        case "GETSLASTATE":
          return action.data;
        default:
          return state
    }
}
function getSelectRowObj(state = {}, action) {
    switch (action.type) {
        case "GELECTROWOBJ":
          return action.data;
        default:
          return state
    }
}
function getServiceBigTypeData(state = {}, action) {
    switch (action.type) {
        case "GETSERVICEBIGTYPE":
          return action.data;
        default:
          return state
    }
}

const slaReducer = combineReducers({
  getSlaListData,
  getSlaState,
  getSelectRowObj,
  getServiceBigTypeData
})

export default slaReducer
