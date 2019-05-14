/**
  公告管理相关的 action 方法
  新建公告 > 至少一个接收用户 > 保存 > 审核公告 |
                                            >通过 > 发布公告 状态:已审核 描述:审核通过
                                            >不通过 >原因
*/

var oData = require('../server/odataNotice');
var Store = require('../server/store');
import * as requestDataActions from './requestData_action'

export const NOTICE_SETNOTICESTATE='NOTICE_SETNOTICESTATE'
// export const NOTICE_ADDNOTICE='NOTICE_ADDNOTICE'
// export const NOTICE_GETCHECKNOTICE='NOTICE_GETCHECKNOTICE'
// export const NOTICE_UPDATENOTICE='NOTICE_UPDATENOTICE'
export const NOTICE_QUERYNOTICE='NOTICE_QUERYNOTICE'
export const NOTICE_QUERYHISTORYNOTICE='NOTICE_QUERYHISTORYNOTICE'
export const NOTICE_SETNOTICEOBJ='NOTICE_SETNOTICEOBJ'
export const NOTICE_GETPUREORGANIZATION='NOTICE_GETPUREORGANIZATION'
// export const NOTICE_SETTOPICRECEIVES='NOTICE_SETTOPICRECEIVES'
// export const NOTICE_SETRELEASETOPIC='NOTICE_SETRELEASETOPIC'
export const NOTICE_GETTOPICRECEIVERORGANIZATION='NOTICE_GETTOPICRECEIVERORGANIZATION'
// export const NOTICE_NOTICEMULTDELETE='NOTICE_NOTICEMULTDELETE'
export const NOTICE_SETNOTICELIMIT='NOTICE_SETNOTICELIMIT'


export function setNoticeState(isDisabled) {
    return {
        type: NOTICE_SETNOTICESTATE,
        isDisabled
    }
};
export function setqueryNoticeData(queryNoticeData) {
    return {
      type: NOTICE_QUERYNOTICE,
      queryNoticeData
    }
};
export function setqueryTopicHistoryData(queryTopicHistoryData) {
    return {
        type: NOTICE_QUERYHISTORYNOTICE,
        queryTopicHistoryData
    }
};
//行选择设置obj
export function setNoticeObj(noticeObj) {
    return {
        type: NOTICE_SETNOTICEOBJ,
        noticeObj
    }
};

export function setgetPureOrganizationData(getPureOrganizationData) {
    return {
        type: NOTICE_GETPUREORGANIZATION,
        getPureOrganizationData
    }
};
//组织树结构
export function setselectPureOrganizationData(selectPureOrganizationData) {
    return {
        type: NOTICE_GETTOPICRECEIVERORGANIZATION,
        selectPureOrganizationData
    }
};
//设置权限
export function setNoticeLimit(noticeLimitObj) {
    return {
        type: NOTICE_SETNOTICELIMIT,
        noticeLimitObj
    }
};

export function addNotice(allData){
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oData.addNotice(allData,(code,data) => {
      if(code == "ok"){
        //继续添加  接收人数据传过来
        var topicRecId = {key:"TOPIC_ID",value:data.RecId};
        allData.groupData.push(topicRecId);
        if(allData.groupData[0].value !=""){
          dispatch(setTopicReceives(allData));
        }
        dispatch(requestDataActions.setRequestSuccess());
      }else{
        //alert("添加失败!");
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
export function updateNotice(updateObj){
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oData.updateNotice(updateObj,(code,data)=>{
      if(code == "ok"){
        if(updateObj.type == "pass"){
          window.location.href="#/baseManage/noticeApproval";
        }else if(updateObj.type == "nopass"){
          window.location.href="#/baseManage/noticeApproval";
        }else if(updateObj.type == "update"){
          window.location.href="#/baseManage/noticeSubmitList";
        }else if(updateObj.type == "approval"){
          window.location.href="#/baseManage/noticeApproval";
        }
         //this.updatePage();
         dispatch(requestDataActions.setRequestSuccess());
      }else{
        //alert("操作失败!");
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
export function getCheckNotice(filter){
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oData.getCheckNotice(filter,(code,data)=>{
      if(code == "ok"){
         //alert("获取完成");
         $.showPublicDialog("系统提示","获取完成。");
         //this.updatePage();
         dispatch(requestDataActions.setRequestSuccess());
      }else{
        // alert("获取失败!"+data.results);
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
//公告查询 GetTopicList
export function queryNotice(filter){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.queryNotice(filter,(code,data)=>{
      if(code == "ok"){
           var resultData = data.results;
           var newData =[];
           if(resultData instanceof Array && resultData.length > 0){
             for(var i=0;i< resultData.length;i++){
               if(resultData[i].TOPIC_STATUS == "0"){
                 resultData[i].TOPIC_LASTMODBY="";
                 resultData[i].TOPIC_STATUS="已提交";
               }else if(resultData[i].TOPIC_STATUS == "1"){
                 resultData[i].TOPIC_STATUS="已审核";
               }else if(resultData[i].TOPIC_STATUS == "2"){
                 resultData[i].TOPIC_STATUS="已发布";
               }else if(resultData[i].TOPIC_STATUS == "-1"){
                 resultData[i].TOPIC_STATUS="审核不通过";
               }
                var str = resultData[i].TOPIC_LASTMODDATETIME;
                var topicStr = str.substring(0,str.length-2);
                resultData[i].TOPIC_LASTMODDATETIME =topicStr;
                resultData[i].id=i;
                newData.push(resultData[i]);
             }
           }
          // this.queryNoticeData = newData;
          dispatch(setqueryNoticeData(newData));
          dispatch(requestDataActions.setRequestSuccess());
      }else{
        //alert("查询失败!");
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
//查询历史公告
export function queryHistoryNotice(filter){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.queryNotice(filter,(code,data)=>{
      if(code == "ok"){
           var resultData = data.results;
           var newData =[];
           if(resultData instanceof Array && resultData.length > 0){
             for(var i=0;i< resultData.length;i++){
               if(resultData[i].TOPIC_STATUS == "0"){
                 resultData[i].TOPIC_LASTMODBY="";
                 resultData[i].TOPIC_STATUS="已提交";
               }else if(resultData[i].TOPIC_STATUS == "1"){
                 resultData[i].TOPIC_STATUS="已审核";
               }else if(resultData[i].TOPIC_STATUS == "2"){
                 resultData[i].TOPIC_STATUS="已发布";
               }else if(resultData[i].TOPIC_STATUS == "-1"){
                 resultData[i].TOPIC_STATUS="审核不通过";
               }

                var str = resultData[i].TOPIC_LASTMODDATETIME;
                var topicStr = str.substring(0,str.length-2);
                resultData[i].TOPIC_LASTMODDATETIME =topicStr;
                resultData[i].id=i;
                newData.push(resultData[i]);
             }
           }
          //  this.queryTopicHistoryData = newData;
          dispatch(setqueryTopicHistoryData(newData));
          dispatch(requestDataActions.setRequestSuccess());
      }
    });
  }
}
//获取组织数据
export function getPureOrganization(obj){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.getPureOrganization(obj,(code,data)=> {
      if(code == "ok"){
        var resultData = data.results;
        var newData =[];
        if(resultData instanceof Array && resultData.length > 0){
          for(var i=0;i< resultData.length;i++){
            var newObj = {id:resultData[i].ID,pId:resultData[i].PARENT_ID,name:resultData[i].NAME,safegroupId:resultData[i].SAFEGROUP_ID};
            newData.push(newObj);
          }
        }
        //this.getPureOrganizationData = newData;
        dispatch(setgetPureOrganizationData(newData));
        dispatch(requestDataActions.setRequestSuccess());
      }else{
         //alert("查询失败!");
         dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
//设置发布接收组织 SetTopicReceives
// 输入参数：SAFEGROUP_IDS 安全群组ID
export function setTopicReceives(allData){
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oData.setTopicReceives(allData,(code,data) => {
      if(code == "ok"){
        if(allData.type == "update"){
           window.location.href="#/baseManage/noticeSubmitList";
        }else if(allData.type == "noticSubmit"){
          //alert("添加成功");
          $.showPublicDialog("系统提示","添加成功。");
          dispatch(setNoticeState(true));//this.isDisabled  = true;
          window.location.href="#/baseManage/noticeSubmitList";
        }
        dispatch(requestDataActions.setRequestSuccess());
      }
    });
  }
}
//批量修改操作 用于发布
export function setReleaseTopic(updateObj){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.setReleaseTopic(updateObj,(code,data)=>{
      if(code == "ok"){
         //alert("发布成功");
         $.showPublicDialog("系统提示","发布成功。");
         //this.updatePage();
         dispatch(requestDataActions.setRequestSuccess());
      }else{
        //alert("更新失败!");
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
//用于勾选右侧发布区域
export function getTopicReceiverOrganization(id){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.getTopicReceiverOrganization(id,(code,data)=>{
      if(code == "ok"){
        var rData = data.results;
         //this.selectPureOrganizationData = rData;
         dispatch(setselectPureOrganizationData(rData));
         dispatch(requestDataActions.setRequestSuccess());
      }else{
        //alert("获取失败!");
        dispatch(requestDataActions.setRequestFail());
      }
    });
  }
}
export function noticeMultDelete(obj){
  return dispatch=>{
    dispatch(requestDataActions.setRequest());
    oData.noticeMultDelete(obj,(code,data)=>{
      if(code == "ok"){
        // alert("删除成功!");
        if(obj.flag == "submit"){
          // alert("删除成功!");
          var updateObj = [{key:"IF_UNREVIEW",value:"1"},{key:"TOPIC_STATUS",value:"0"}];
          dispatch(queryNotice(updateObj));
        }else if(obj.flag =="approval"){
          // alert("删除成功!");
          var updateObj = [{key:"TOPIC_STATUS",value:"0"}];
          dispatch(queryNotice(updateObj));
        }else if(obj.flag =="release"){
          var updateObj = [{key:"TOPIC_STATUS",value:"1"}];
          dispatch(queryNotice(updateObj));
        }else if(obj.flag =="history"){
          var updateObj = [{key:"TOPIC_STATUS",value:"2"},{key:"TOPIC_RELEASE_IF_EXPIRED",value:"0"}];
          dispatch(queryHistoryNotice(updateObj));
        }else if(obj.flag =="dated"){
          var updateObj = [{key:"TOPIC_STATUS",value:"2"},{key:"TOPIC_RELEASE_IF_EXPIRED",value:"1"}];
          dispatch(queryNotice(updateObj));
        }
        dispatch(requestDataActions.setRequestSuccess());
      }
    });
  }
}

function updatePage(){
  return dispatch=>{
    dispatch(queryNotice());
  }
}
