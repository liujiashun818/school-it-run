/**
* 工单流转相关的action方法
*/

var oData = require('../server/odata');
var oOperationData = require('../server/odataOperation');
import * as requestDataActions from './requestData_action'
import * as navActions from './navbar_action'

export const SET_FLOWPERSONNELLISTDATA = 'SET_FLOWPERSONNELLISTDATA'
export const SET_FLOWACTIONLISTDATA = 'SET_FLOWACTIONLISTDATA'
export const SET_CURRENTNEXTPERSON = 'SET_CURRENTNEXTPERSON'
export const SET_WORKFLOWLOGDATA = 'SET_WORKFLOWLOGDATA'
export const SET_CURRENTWORKFLOWLOGDATA = 'SET_CURRENTWORKFLOWLOGDATA'
export const SET_STEPS = 'SET_STEPS'
export const SET_CURRENTWORKORDERPROCESSLOGDATA = 'SET_CURRENTWORKORDERPROCESSLOGDATA'
export const SET_WORKORDERPROCESSLOGDATA = 'SET_WORKORDERPROCESSLOGDATA'
export const SET_WORKFLOWDETAILSDATA = 'SET_WORKFLOWDETAILSDATA'
export const SET_CURWORKFLOWID = 'SET_CURWORKFLOWID'

export function setFlowPersonnelListData(flowPersonnelListData) {
    return {
        type: SET_FLOWPERSONNELLISTDATA,
        flowPersonnelListData
    }
}

export function setFlowActionListData(flowActionListData) {
    return {
        type: SET_FLOWACTIONLISTDATA,
        flowActionListData
    }
}
//当前工单下一个人员流传信息
// data={
// 	GROUP_NAME:"",
// 	ROLE_NAME:"",
// 	USER_ID:"",
// 	USERNAME:"",
// 	LOGIN_ID:""
// }
//set_CurrentNextPersonRender set_CurrentNextPerson
export function setCurrentNextPerson(currentNextPerson) {
    return {
        type: SET_CURRENTNEXTPERSON,
        currentNextPerson
    }
}

export function setWorkFlowLogData(workFlowLogData) {
    return {
        type: SET_WORKFLOWLOGDATA,
        workFlowLogData
    }
}

export function setCurrentWorkFlowLogData(currentWorkFlowLogData) {
    return {
        type: SET_CURRENTWORKFLOWLOGDATA,
        currentWorkFlowLogData
    }
}

export function setSteps(steps) {
    return {
        type: SET_STEPS,
        steps
    }
}

export function setCurrentWorkOrderProcessLogData(currentWorkOrderProcessLogData) {
    return {
        type: SET_CURRENTWORKORDERPROCESSLOGDATA,
        currentWorkOrderProcessLogData
    }
}

export function setWorkOrderProcessLogData(workOrderProcessLogData) {
    return {
        type: SET_WORKORDERPROCESSLOGDATA,
        workOrderProcessLogData
    }
}

export function setWorkFlowDetailsData(workFlowDetailsData) {
    return {
        type: SET_WORKFLOWDETAILSDATA,
        workFlowDetailsData
    }
}
//设置当前工单流程图ID
//set_curWorkFlowId
export function setCurWorkFlowId(curWorkFlowId) {
    return {
        type: SET_CURWORKFLOWID,
        curWorkFlowId
    }
}
//获取流程的下一个节点数据接口。角色id/工单流程Id/安全群群组ID
//filters 格试 [{key:"FROM_ID",value:""},{key:"WORKFLOW_ID",value:""},{key:"GROUP_ID",value:""}];
export function get_WorkOrderNextPersonData(filters) {
    return dispatch => {
        // var _this = this;
        // this.flowPersonnelListData=[];   //流程下一步接收人列表数据
        // this.flowActionListData=[];      //流程流转中每一个步骤状态列表数据
        dispatch(setFlowPersonnelListData([]));
        dispatch(setFlowActionListData([]));
        dispatch(requestDataActions.setRequest());
        //角色id
        //filters 格试 [{key:"FROM_ID",value:""}];
        oOperationData.getWorkOrderNextPerson(filters,function(data) {
            // descript="下级人员集合"
    				// paramName="TO_USERS">
    				// descript="来自角色"
    				// paramName="FROM_ID">
    				// descript="流转到的角色"
    				// paramName="TO_ID">
    				// descript="流程操作内容"
    				// paramName="FLOW_ACTION"
    				// descript="工单状态"
    				// paramName="STATUS"
            if(data.results.length == 0){
                dispatch(requestDataActions.setRequestFail());
            }else{
                // this.flowActionListData = data.results;
                dispatch(setFlowActionListData(data.results));
                var flowPersonnelListData = [];
                for(var i=0;i<data.results.length;i++){
                    var users = JSON.parse(data.results[i].TO_USERS);
                    for(var n=0;n<users.length;n++){
                        flowPersonnelListData.push(users[n]);
                    }
                }
                dispatch(setFlowPersonnelListData(flowPersonnelListData));
                dispatch(requestDataActions.setRequestSuccess());
            }
            // this.emit("change");
        });
    }
}
//获取工单流程数据；
export function get_WorkFlowLogData(WorkOrderId) {
    return (dispatch, getState) => {
        var state = getState();
        // var _this = this;
		// this.workFlowLogData=[];
		// this.workFlowDetailsData = "";
        dispatch(setWorkFlowLogData([]));
        dispatch(setWorkFlowDetailsData(""));
        dispatch(requestDataActions.setRequest());
    		oOperationData.queryWorkFlowLog(WorkOrderId,function(data) {
    			////debugger;
    			if(data.results.length == 0){
            dispatch(requestDataActions.setRequestFail());
    				// _this.steps = 1;                     //步骤数
            dispatch(setSteps(1));
    				// _this.emit("change");
    			}else{
            var workFlowLogData = [];
    				for(var i=0;i<data.results.length;i++){
    					workFlowLogData.push(data.results[i]);
    				}
            dispatch(setWorkFlowLogData(workFlowLogData));
            // _this.steps = _this.workFlowLogData.length + 1;//步骤数
            dispatch(setSteps(workFlowLogData.length + 1));
            if(workFlowLogData[0].ToUser == localStorage.getItem("USERNAME") && workFlowLogData[0].ToId == localStorage.getItem("CURRENT_ROLENAME")){
                if(state.operationFlowReducer.curWorkFlowId != ""){
                    var filter = [{key:"WorkFlowId",value:state.operationFlowReducer.curWorkFlowId},{key:"Flag",value:1},{key:"ToId",value:workFlowLogData[0].ToId}];
        						//当前需要修改工单状态或响应时间判断条件数据
        						// _this.onGetWorkFlowDetailsFilterData(filter);
                    dispatch(get_WorkFlowDetailsFilterData(filter));
    					  }
            }
    			}
          dispatch(requestDataActions.setRequestSuccess());
    		});
    }
}
//增加工单流程数据；
export function add_WorkFlowLogData(dataobject) {
    return dispatch => {
		    oOperationData.addWorkFlowLog(dataobject,function(data) {
            dispatch(setCurrentWorkFlowLogData(data));
      			setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "处理表单"
                document.getElementById('publicMessageModalcontent').innerHTML = "保存完成。"
                $('#publicMessageModal').modal('show');
            },100);
      			//_this.history.pushState(null,'operationManage/myWorkSpace');
            dispatch(navActions.setCurName("工作台"));
      			window.location.href = '#/operationManage/myWorkSpace';
        });
    }
}
//在新建工单时调用,增加工单流程数据；
export function add_CreateWorkFlowLogData(dataobject) {
    return dispatch => {
        // var _this = this;
    		oOperationData.addWorkFlowLog(dataobject,function(data) {
            dispatch(setCurrentWorkFlowLogData(data));
            dispatch(navActions.setCurName("工作台"));
      			window.location.href = '#/operationManage/myWorkSpace';
    		});
    }
}
//修改工单流程数据；
export function update_WorkFlowLogData(dataobject) {
    return dispatch => {
      // var _this = this;
  		oOperationData.updateWorkFlowLog(dataobject,function(data) {
  			//_this.currentWorkFlowLogData = dataobject;
  			//_this.emit("change");
  		});
    }
}
//修改工单状态 WorkOrderCommon 的字段 Status
export function update_WorkOrderCommonStatusData(dataobject) {
    return dispatch => {
        // var _this = this;
    		oOperationData.updateWorkOrderCommonStatus(dataobject,function(data) {
    			//_this.currentWorkFlowLogData = dataobject;
    			//_this.emit("change");
    		});
    }
}
//获取 工单处理信息 数据；
export function get_WorkOrderProcessLogData(WorkOrderId) {
    return dispatch => {
        // this.workOrderProcessLogData=[];//工单处理信息数据
        dispatch(setWorkOrderProcessLogData([]));
        dispatch(requestDataActions.setRequest());
    		oOperationData.queryWorkOrderProcessLog(WorkOrderId,function(data) {
    			////debugger;
    			if(data.results.length > 0){
            var workOrderProcessLogData = [];
    				for(var i=0;i<data.results.length;i++){
    					workOrderProcessLogData.push(data.results[i]);
    				}
                    dispatch(setWorkOrderProcessLogData(workOrderProcessLogData));
    			}
          dispatch(requestDataActions.setRequestSuccess());
    		});
    }
}
//增加 工单处理信息 数据；
export function add_WorkOrderProcessLogData(dataobject) {
    return dispatch => {
        oOperationData.addWorkOrderProcessLog(dataobject,function(data) {
            dispatch(setCurrentWorkOrderProcessLogData(data));
        });
    }
}
//修改 工单处理信息 数据；
export function update_WorkOrderProcessLogData(dataobject) {
    return dispatch => {
        // var _this = this;
		      oOperationData.updateWorkOrderProcessLog(dataobject,function(data) {
            // _this.currentWorkFlowLogData = dataobject;
            dispatch(setCurrentWorkFlowLogData(dataobject));
      			//_this.emit("change");
      		});
    }
}
//获取当前操作人员的，当前需要修改工单状态或响应时间判断条件数据
export function get_WorkFlowDetailsFilterData(filters) {
    return dispatch => {
        // this.workFlowDetailsData = "";
        dispatch(setWorkFlowDetailsData(""));
        dispatch(requestDataActions.setRequest());
    		oOperationData.queryWorkFlowDetailsFilters(filters,function(data) {
          if(data.results.length > 0){
              // this.workFlowDetailsData = data.results; //当前需要修改工单状态或响应时间判断条件数据
              dispatch(setWorkFlowDetailsData(data.results));
    			}
          dispatch(requestDataActions.setRequestSuccess());
    		})
    }
}
//向当前工单下一个流转人员发送邮件：
//filters 格试 [{key:"EMAIL",value:""},{key:"SUBJECT",value:""},{key:"CONTENT",value:""}];
export function set_WorkFlowSendEmail(filters) {
    return dispatch => {
        //向当前工单下一个流转人员发送邮件：
    		//filters 格试 [{key:"EMAIL",value:""},{key:"SUBJECT",value:""},{key:"CONTENT",value:""}];
    		oOperationData.setWorkFlowSendEmail(filters,function(data) {
    			if(data.results.length == 0){
    				//this.emit("change");
    			}else{
    				var temp = data.results[0].OUT_FLAG;//成功："true"
    			};
    		});
    }
}

export function add_workOrderForm(params, entity) {
    return dispatch => {
      oOperationData.addWorkOrderForm(params, entity, function(data){
        // console.log(data);
      })
    }
}

export function add_WorkFlowLogDataAndHandleTemplate(data, handleData, entity) {
    return dispatch => {
        oOperationData.addWorkFlowLog(data,function(result) {
            dispatch(setCurrentWorkFlowLogData(result));
            handleData["workFlowLogId"] = result.RecId;
            dispatch(add_workOrderForm(handleData, entity));
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "处理表单"
                document.getElementById('publicMessageModalcontent').innerHTML = "保存完成。"
                $('#publicMessageModal').modal('show');
            },100);
      			//_this.history.pushState(null,'operationManage/myWorkSpace');
            dispatch(navActions.setCurName("工作台"));
            window.location.href = '#/operationManage/myWorkSpace';
        });
    }
}
