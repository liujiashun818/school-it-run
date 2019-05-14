/**
 * 告警规则、告警日志和模板配置action
 */
var oData = require('../server/odatayft');
import * as requestDataActions from './requestData_action'

export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const SET_ALARMLOGLIST = 'SET_ALARMLOGLIST';
export const SET_ALARMLOGCOUNT = 'SET_ALARMLOGCOUNT';
export const SET_ALARMNAMELIST = 'SET_ALARMNAMELIST';
export const SET_ALARMRULEID = 'SET_ALARMRULEID';
export const SET_ALARMRULELIST = 'SET_ALARMRULELIST';
export const SET_USER_ADDALARMRULE = 'SET_USER_ADDALARMRULE';
export const SET_USER_ADDALARMRULE2 = 'SET_USER_ADDALARMRULE2';
export const SET_USERIDLIST = 'SET_USERIDLIST';
export const SET_RECEIVERIDLIST = 'SET_RECEIVERIDLIST';
export const SET_SMSTEMPLETE = 'SET_SMSTEMPLETE';
export const SET_MAILTEMPLETE = 'SET_MAILTEMPLETE';
export const SET_STAFF = 'SET_STAFF';
export const SET_ALARMRULE = 'SET_ALARMRULE';
export const SET_TEMPLATELIST = 'SET_TEMPLATELIST';
export const SET_SMSSERVERSTATUS = 'SET_SMSSERVERSTATUS';

export function setPermissions(permissions) {
    return {
        type: SET_PERMISSIONS,
        permissions
    }
}
export function setAlarmNameList(alarmNameList){
    return {
        type: SET_ALARMNAMELIST,
        alarmNameList
    }
}
export function setAlarmLogList(alarmLogList){
    return {
        type: SET_ALARMLOGLIST,
        alarmLogList
    }
}
export function setAlarmLogCount(alarmLogCount){
    return {
        type: SET_ALARMLOGCOUNT,
        alarmLogCount
    }
}
export function setAlarmRuleID(alarmRuleID){
    return {
        type: SET_ALARMRULEID,
        alarmRuleID
    }
}
export function setAlarmRuleList(alarmRuleList){
    return {
        type: SET_ALARMRULELIST,
        alarmRuleList
    }
}
export function setUser_addAlarmRule(user_addAlarmRule){
    return {
        type: SET_USER_ADDALARMRULE,
        user_addAlarmRule
    }
}
export function setUser_addAlarmRule2(user_addAlarmRule2){
    return {
        type: SET_USER_ADDALARMRULE2,
        user_addAlarmRule2
    }
}
export function setUserIdList(userIdList){
    return {
        type: SET_USERIDLIST,
        userIdList
    }
}
export function setReceiverIdList(receiverIdList){
    return {
        type: SET_RECEIVERIDLIST,
        receiverIdList
    }
}
export function setSmsTemplete(smsTemplete){
    return {
        type: SET_SMSTEMPLETE,
        smsTemplete
    }
}
export function setMailTemplete(mailTemplete){
    return {
        type: SET_MAILTEMPLETE,
        mailTemplete
    }
}
export function setStaff(staff){
    return {
        type: SET_STAFF,
        staff
    }
}
export function setAlarmRule(alarmRule){
    return {
        type: SET_ALARMRULE,
        alarmRule
    }
}
export function setTempleteList(templeteList) {
    return {
        type: SET_TEMPLATELIST,
        templeteList
    }
}
export function setSmsServerStatus(smsServerStatus) {
    return {
        type: SET_SMSSERVERSTATUS,
        smsServerStatus
    }
}

export function getAlarmLogList(param){
    return dispatch => {
        if(!param) return;
        dispatch(requestDataActions.setRequest());
        oData.getAlarmLogList({
            data: param.data || {},
            callback: function(resp){
                var obj = resp.d.results[0];
                var alarmLogList = eval(obj.ALARMLOG_LIST||[]);
                var alarmLogCount = parseInt(obj.COUNT,10||0);
                if(!(alarmLogList instanceof Array)) alarmLogList = [];
                if(alarmLogCount==null||isNaN(alarmLogCount)) alarmLogCount = 0;
                dispatch(setAlarmLogList(alarmLogList));
                dispatch(setAlarmLogCount(alarmLogCount));
                if(param.callback) param.callback({
                    alarmLogList: alarmLogList,
                    alarmLogCount: alarmLogCount,
                });
                dispatch(requestDataActions.setRequestSuccess());
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function getAlarmLogPageData(param){
    return dispatch => {
        if(!param) return;
        dispatch(requestDataActions.setRequest());
        oData.getAlarmNameList({
            callback: function(resp){
                dispatch(setAlarmNameList(resp.results));
                dispatch(requestDataActions.setRequestSuccess());
                return dispatch(getAlarmLogList(param));
            }
        })
    }
}
export function setAlarmRuleList(alarmRuleList) {
    return {
        type: SET_ALARMRULELIST,
        alarmRuleList
    }
}
export function getAlarmRulePageData(param){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.getAlarmRuleList({
            callback: function(resp){
                if(resp&&resp.results) dispatch(setAlarmRuleList(resp.results));
                if(param.callback) param.callback(resp.results);
                dispatch(requestDataActions.setRequestSuccess());
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function deleteAlarmRules(param){
    return dispatch => {
        if(!param||!param.data||param.data.length==0) return;
        dispatch(requestDataActions.setRequest());
        oData.deleteAlarmRules({
            dataObjec: param.data,
            callback: function(resp){
                return dispatch(getAlarmRulePageData({
                    callback: function(resp){
                      if(param.callback) param.callback(resp);
                      dispatch(requestDataActions.setRequestSuccess());
                    },
                    error: function(resp){
                      if(param.error) param.error(resp);
                      dispatch(requestDataActions.setRequestFail());
                    },
                }))
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function setAlarmRuleStates(param){
    return dispatch => {
        if(!param||!param.data||param.data.length==0) return;
        dispatch(requestDataActions.setRequest());
        oData.setAlarmRuleStates({
            flag: param.flag,
            dataObjec: param.data,
            callback: function(resp){
                return dispatch(getAlarmRulePageData({
                    callback: function(resp){
                        if(param.callback) param.callback(resp);
                        dispatch(requestDataActions.setRequestSuccess());
                    },
                    error: function(resp){
                        if(param.error) param.error(resp);
                        dispatch(requestDataActions.setRequestFail());
                    },
                }))
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function getAddAlarmRulePageData(param){
    return dispatch => {
        dispatch(setUserIdList([]));
        dispatch(setReceiverIdList([]));
        dispatch(requestDataActions.setRequest());
        oData.getAlarmConfigUI({
            callback: function(resp){
                var obj = resp.d.results[0];
                var smsTemplete = eval(obj.SMSTEMPLATE);
                var mailTemplete = eval(obj.MAILTEMPLATE);
                var user_addAlarmRule = eval(obj.USER);
                var user_addAlarmRule2 = eval(obj.USER).slice(0);
                dispatch(setSmsTemplete(smsTemplete));
                dispatch(setMailTemplete(mailTemplete));
                dispatch(setUser_addAlarmRule(user_addAlarmRule));
                dispatch(setUser_addAlarmRule2(user_addAlarmRule2));
                if(param.callback) param.callback({
                    smsTemplete: smsTemplete,
                    mailTemplete: mailTemplete,
                    user_addAlarmRule: user_addAlarmRule,
                    user_addAlarmRule2: user_addAlarmRule2,
                });
                dispatch(requestDataActions.setRequestSuccess());
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function getEditAlarmRulePageData(param){
    return (dispatch, getState) => {
        var state = getState();
        dispatch(setStaff([]));
        dispatch(setAlarmRule([]));
        dispatch(setUserIdList([]));
        dispatch(setReceiverIdList([]));
        dispatch(requestDataActions.setRequest());
        dispatch(getAddAlarmRulePageData({
            callback: function(resp){
                oData.getAlarmRule({
                    data: {
                        id: state.alarmReducer.alarmRuleID,
                    },
                    callback: function(resp){
                        var alarmRule = resp.alarmRule.results[0] || [];
                        var staff = resp.staff.results;
                        var userIdList = state.alarmReducer.userIdList;
                        var receiverIdList = state.alarmReducer.receiverIdList;
                        //解析staff，获取 user ID 数组和 receiver ID 数组
                        for(var i in staff){
                            if(staff[i].UserType=="1"){
                                userIdList.push(staff[i].UserLogID);
                            }
                            if(staff[i].UserType=="2"){
                                receiverIdList.push(staff[i].UserLogID);
                            }
                        }
                        dispatch(setAlarmRule(alarmRule));
                        dispatch(setStaff(staff));
                        dispatch(setUserIdList(userIdList));
                        dispatch(setReceiverIdList(receiverIdList));
                        state = getState();
                        var resp = {
                            alarmRule: state.alarmReducer.alarmRule,
                            staff: state.alarmReducer.staff,
                            userIdList: state.alarmReducer.userIdList,
                            receiverIdList: state.alarmReducer.receiverIdList,
                            smsTemplete: state.alarmReducer.smsTemplete,
                            mailTemplete: state.alarmReducer.mailTemplete,
                            user_addAlarmRule: state.alarmReducer.user_addAlarmRule,
                        }
                        if(param.callback) param.callback(resp);
                        dispatch(requestDataActions.setRequestSuccess());
                    },
                    error: function(resp){
                        if(param.error) param.error(resp);
                        dispatch(requestDataActions.setRequestFail());
                    },
                });
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        }))
    }
}
export function createAlarmRule(param){
    return dispatch => {
        if(!param||!param.data||param.data.length==0) return;
        dispatch(requestDataActions.setRequest());
        oData.createAlarmRule({//新增 alarm rule
            data: param.data,
            callback: function(resp){
                var staff = [];
                var RecId = resp.RecId;
                for(var i in param.users){
                    staff.push({
                        AlarmConfigRecId: RecId,
                        UserLogID: param.users[i].USER_ID,
                        UserType: "1",
                    });
                }
                for(var i in param.receivers){
                    staff.push({
                        AlarmConfigRecId: RecId,
                        UserLogID: param.receivers[i].USER_ID,
                        UserType: "2",
                    });
                }
                if(staff.length>0){
                    oData.createAlarmStaffs({// 新增 staff
                        dataObjec: staff,
                        callback: function(resp){
                            if(param.callback) param.callback(resp);
                            dispatch(requestDataActions.setRequestSuccess());
                        },
                        error: function(resp){
                            if(param.error) param.error(resp);
                            dispatch(requestDataActions.setRequestFail());
                        },
                    });
                }
                else{
                    if(param.callback) param.callback(resp);
                    dispatch(requestDataActions.setRequestSuccess());
                }
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function updateAlarmRule(param){
    return dispatch => {
        if(!param||!param.data||param.data.length==0) return;
        dispatch(requestDataActions.setRequest());
        var users_id_array = []
        var upgrade_users_id_array = [];
        for(var i in param.users) users_id_array.push(param.users[i].USER_ID);
        for(var i in param.receivers) upgrade_users_id_array.push(param.receivers[i].USER_ID);
        var users_stringify = users_id_array.join(',');
        var upgrade_users_stringify = upgrade_users_id_array.join(',');
        oData.updateAlarmRule({//更新 alarm rule
            data: param.data,
            callback: function(resp){
                oData.updateAlarmStaffs({//更新 staff
                    data: {
                        id: param.data.RecId,
                        users: users_stringify,
                        upgrade_users: upgrade_users_stringify,
                    },
                    callback: function(resp){
                        var resp = resp.d.results[0];
                        if(resp){
                            var flag = resp.OUT_FLAG || false;
                            if(param.callback&&flag){
                                param.callback(resp);
                                dispatch(requestDataActions.setRequestSuccess());
                            }
                            else if(param.error){
                                param.error("更新人员关联失败");
                                dispatch(requestDataActions.setRequestFail());
                            }
                        }
                        else{
                            dispatch(requestDataActions.setRequestFail());
                        }
                    },
                    error: function(resp){
                        if(param.error) param.error(resp);
                        dispatch(requestDataActions.setRequestFail());
                    },
                });
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function getTempleteConfigPageData(param){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.getEmailServerConfig({//获取邮件服务器配置信息
            callback: function(resp1){
                var obj1 = resp1.results[0] || {};
                var default_sender_smtp = obj1.SendServer || "smtp.exmail.qq.com";
                var default_sender_email = obj1.MailAddress || "itossadmin@dragonflow.com";
                var default_backup_smtp = obj1.BackupSendServer || "smtp.exmail.qq.com";
                var default_login_id = obj1.MailUserName || "itossadmin@dragonflow.com";
                var default_login_password = obj1.MailPwd || "siteview123!@#";
                oData.getSMSServerConfig({//获取短信服务器配置信息
                    callback: function(resp2){
                        var obj2 = resp2.results[0] || {};
                        var default_gateway = obj2.SMSUserName || "modem.com1";
                        var default_serialPort = obj2.SMSPwd || "COM1";
                        var default_baudRate = obj2.SMSLength || "9600";
                        var default_manufacturer = obj2.TaskPlanType || "wavecom";
                        var default_model = obj2.MouldId || "17254";
                        oData.getTempleteList({//获取模板列表
                            callback: function(resp3){
                                var templeteList = resp3.results;
                                dispatch(setTempleteList(templeteList));
                                oData.getSMSServerStatus({//获取短信服务器状态
                                    callback: function(resp4){
                                        var smsServerStatus = resp4.d.results[0].STATUS=="true";//@TEST
                                        dispatch(setSmsServerStatus(smsServerStatus));
                                        if(param.callback) param.callback({
                                            templeteList: templeteList,
                                            emailServerConfig: obj1,
                                            smsServerConfig: obj2,
                                            smsServerStatus: smsServerStatus,
                                        });
                                        dispatch(requestDataActions.setRequestSuccess());
                                    },
                                    error: function(resp){
                                        if(param.error) param.error(resp);
                                        dispatch(requestDataActions.setRequestFail());
                                    },
                                });
                            },
                            error: function(resp){
                                if(param.error) param.error(resp);
                                dispatch(requestDataActions.setRequestFail());
                            },
                        });
                    },
                    error: function(resp){
                        if(param.error) param.error(resp);
                        dispatch(requestDataActions.setRequestFail());
                    },
                });
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function getTempleteList(param){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.getTempleteList({//获取模板列表
            callback: function(resp){
                var templeteList = resp.results;
                dispatch(setTempleteList(templeteList));
                if(param.callback) param.callback({
                    templeteList: templeteList,
                });
                dispatch(requestDataActions.setRequestSuccess());
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function deleteTempletes(param){
    return dispatch => {
        if(!param||!param.data||param.data.length==0) return;
        dispatch(requestDataActions.setRequest());
        oData.deleteTempletes({
            dataObjec: param.data,
            callback: function(resp){
                dispatch(getTempleteConfigPageData({
                    callback: function(resp){
                        if(param.callback) param.callback(resp);
                        dispatch(requestDataActions.setRequestSuccess());
                    },
                    error: function(resp){
                        if(param.error) param.error(resp);
                        dispatch(requestDataActions.setRequestFail());
                    },
                }));
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function createTemplete(param){
    return dispatch => {
        if(!param||!param.data||param.data.length==0) return;
        dispatch(requestDataActions.setRequest());
        oData.createTemplete({
            data: param.data,
            callback: function(resp){
                dispatch(getTempleteList({
                    callback: function(resp){
                        if(param.callback) param.callback(resp);
                        dispatch(requestDataActions.setRequestSuccess());
                    }
                }));
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function updateTemplete(param){
    return dispatch => {
        if(!param||!param.data||param.data.length==0) return;
        dispatch(requestDataActions.setRequest());
        oData.updateTemplete({
            data: param.data,
            callback: function(resp){
                dispatch(getTempleteList({
                    callback: function(resp){
                        if(param.callback) param.callback(resp);
                        dispatch(requestDataActions.setRequestSuccess());
                    }
                }));
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function activateSmsServer(param){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.activateSMSServer({
            data: param.data,
            callback: function(resp){
                var obj = resp.d.results[0];
                if(obj.OUT_FLAG=="true"){
                    var smsServerStatus = true;
                    dispatch(setSmsServerStatus(smsServerStatus));
                    if(param.callback) param.callback(resp);
                    dispatch(requestDataActions.setRequestSuccess());
                }
                else{
                    if(param.error) param.error(obj.OUT_MSG);
                    dispatch(requestDataActions.setRequestFail());
                }
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function updateSmsServerConfig(param){
    return dispatch => {
        if(!param||!param.data||param.data.length==0) return;
        dispatch(requestDataActions.setRequest());
        oData.updateSMSServerConfig({
            data: param.data,
            callback: function(resp){
                if(param.callback) param.callback(resp);
                dispatch(requestDataActions.setRequestSuccess());
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function updateEmailServerConfig(param){
    return dispatch => {
        if(!param||!param.data||param.data.length==0) return;
        dispatch(requestDataActions.setRequest());
        oData.updateEmailServerConfig({
            data: param.data,
            callback: function(resp){
                if(param.callback) param.callback(resp);
                dispatch(requestDataActions.setRequestSuccess());
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function sendEmail(param){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.sendEmail({
            data: param.data,
            callback: function(resp){
                var obj = resp.d.results[0];
                if(obj.OUT_FLAG=="true"){
                    if(param.callback) param.callback(resp);
                    dispatch(requestDataActions.setRequestSuccess());
                }
                else{
                    if(param.error) param.error(obj.OUT_MSG);
                    dispatch(requestDataActions.setRequestFail());
                }
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
export function sendSms(param){
    return dispatch => {
        dispatch(requestDataActions.setRequest());
        oData.sendSMS({
            data: param.data,
            callback: function(resp){
                var obj = resp.d.results[0];
                if(obj.OUT_FLAG=="true"){
                    if(param.callback) param.callback(resp);
                    dispatch(requestDataActions.setRequestSuccess());
                }
                else{
                    if(param.error) param.error(obj.OUT_MSG);
                    dispatch(requestDataActions.setRequestFail());
                }
            },
            error: function(resp){
                if(param.error) param.error(resp);
                dispatch(requestDataActions.setRequestFail());
            },
        });
    }
}
