/**
 * 导航栏相关的reducer
 */
import { combineReducers } from 'redux'
import {
  SET_CUR_ONENODE,
  SET_CUR_TWONODE1,
  SET_CUR_TWONODE2,
  SET_CUR_TWONODE3,
  SET_CUR_TWONODE4,
  SET_CUR_TWONODE5,
  SET_CUR_TWONODE6,
  SET_CUR_TWONODE7,
  SET_PRE_TWONODE1,
  SET_PRE_TWONODE2,
  SET_PRE_TWONODE3,
  SET_PRE_TWONODE4,
  SET_PRE_TWONODE5,
  SET_PRE_TWONODE6,
  SET_PRE_TWONODE7,
  SET_CUR_THREENODE,
  SET_PRE_THREENODE,
  SET_CURNAME
} from '../actions/navbar_action'

const initialState = {
  curOneNode: ""
};

// function curOneNode(state = initialState, action) {
//   switch (action.type) {
//     case SET_CUR_ONENODE:
//       return Object.assign({},state,{
//         curOneNode: action.curNode
//       });
//     default:
//       return state
//   }
// }

function curName(state = "", action) {
  switch (action.type) {
    case SET_CURNAME:
      return action.curName;
    default:
      return state
  }
}

function curOneNode(state = "", action) {
  switch (action.type) {
    case SET_CUR_ONENODE:
      return action.curNode;
    default:
      return state
  }
}

function curThreeNode(state = "", action) {
  switch (action.type) {
    case SET_CUR_THREENODE:
      return action.curNode;
    default:
      return state
  }
}

function preThreeNode(state = "", action) {
  switch (action.type) {
    case SET_PRE_THREENODE:
      return action.curNode;
    default:
      return state
  }
}

function curTwoNode(state = "", action) {
  switch (action.type) {
    case SET_CUR_TWONODE1:
      return Object.assign({},state,{
              indexMenu: action.curNode
            });
    case SET_CUR_TWONODE2:
      return Object.assign({},state,{
              resourceMenu: action.curNode
            });
    case SET_CUR_TWONODE3:
      return Object.assign({},state,{
              assetMenu: action.curNode
            });
    case SET_CUR_TWONODE4:
      return Object.assign({},state,{
              mapMenu: action.curNode
            });
    case SET_CUR_TWONODE5:
      return Object.assign({},state,{
              workOrderMenu: action.curNode
            });
    case SET_CUR_TWONODE6:
      return Object.assign({},state,{
              reportMenu: action.curNode
            });
    case SET_CUR_TWONODE7:
      return Object.assign({},state,{
              systemMenu: action.curNode
            });
    default:
      return state
  }
}

function preTwoNode(state = "", action) {
  switch (action.type) {
    case SET_PRE_TWONODE1:
      return Object.assign({},state,{
              indexMenu: action.curNode
            });
    case SET_PRE_TWONODE2:
      return Object.assign({},state,{
              resourceMenu: action.curNode
            });
    case SET_PRE_TWONODE3:
      return Object.assign({},state,{
              assetMenu: action.curNode
            });
    case SET_PRE_TWONODE4:
      return Object.assign({},state,{
              mapMenu: action.curNode
            });
    case SET_PRE_TWONODE5:
      return Object.assign({},state,{
              workOrderMenu: action.curNode
            });
    case SET_PRE_TWONODE6:
      return Object.assign({},state,{
              reportMenu: action.curNode
            });
    case SET_PRE_TWONODE7:
      return Object.assign({},state,{
              systemMenu: action.curNode
            });
    default:
      return state
  }
}

const navbarReducer = combineReducers({
  curOneNode,
  curTwoNode,
  preTwoNode,
  curThreeNode,
  preThreeNode,
  curName
})

export default navbarReducer
