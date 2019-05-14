/**
* 公告管理相关的reducer方法
*/

import { combineReducers } from 'redux'
import {
  NOTICE_SETNOTICESTATE,
  // NOTICE_ADDNOTICE,
  // NOTICE_GETCHECKNOTICE,
  // NOTICE_UPDATENOTICE,
  NOTICE_QUERYNOTICE,
  NOTICE_QUERYHISTORYNOTICE,
  NOTICE_SETNOTICEOBJ,
  NOTICE_GETPUREORGANIZATION,
  // NOTICE_SETTOPICRECEIVES,
  // NOTICE_SETRELEASETOPIC,
  NOTICE_GETTOPICRECEIVERORGANIZATION,
  // NOTICE_NOTICEMULTDELETE,
  NOTICE_SETNOTICELIMIT
} from '../actions/notice_action'

function isDisabled(state = false, action) {
    switch (action.type) {
        case NOTICE_SETNOTICESTATE:
          return action.isDisabled;
        default:
          return state
    }
};

function queryNoticeData(state = [], action) {
    switch (action.type) {
        case NOTICE_QUERYNOTICE:
          return action.queryNoticeData;
        default:
          return state
    }
};

function queryTopicHistoryData(state = [], action) {
    switch (action.type) {
        case NOTICE_QUERYHISTORYNOTICE:
          return action.queryTopicHistoryData;
        default:
          return state
    }
};

function noticeObj(state = {}, action) {
    switch (action.type) {
        case NOTICE_SETNOTICEOBJ:
          return action.noticeObj;
        default:
          return state
    }
};

function getPureOrganizationData(state = [], action) {
    switch (action.type) {
        case NOTICE_GETPUREORGANIZATION:
          return action.getPureOrganizationData;
        default:
          return state
    }
};
//组织树结构
function selectPureOrganizationData(state = [], action) {
    switch (action.type) {
        case NOTICE_GETTOPICRECEIVERORGANIZATION:
          return action.selectPureOrganizationData;
        default:
          return state
    }
};
//设置权限
function noticeLimitObj(state = {}, action) {
    switch (action.type) {
        case NOTICE_SETNOTICELIMIT:
          return action.noticeLimitObj;
        default:
          return state
    }
};

const noticeReducer = combineReducers({
  isDisabled,
  queryNoticeData,
  queryTopicHistoryData,
  noticeObj,
  getPureOrganizationData,
  selectPureOrganizationData,
  noticeLimitObj
})

export default noticeReducer
