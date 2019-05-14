/**
* 流程设计相关的action方法
*/

var oData = require('../server/odataOperation');
var Store = require('../server/store');
import * as requestDataActions from './requestData_action'

export const SET_FLOWDESIGNRESULTDATA_FLOW="SET_FLOWDESIGNRESULTDATA_FLOW"
export const GET_WORKFLOWNAME_FLOWNAME="GET_WORKFLOWNAME_FLOWNAME"
export const GET_WORKFLOWNAME_FLOWOBJECT='GET_WORKFLOWNAME_FLOWOBJECT'
export const GET_FLOWDESIGNPICDATA_FLOW="GET_FLOWDESIGNPICDATA_FLOW"
export const GET_WORKFLOWTABLE_FLOW="GET_WORKFLOWTABLE_FLOW"
export const GET_WORKFLOWDETAILSTABLE_FLOW="GET_WORKFLOWDETAILSTABLE_FLOW"
export const SET_CURRFLOW="SET_CURRFLOW"
export const SET_FLOWPANEL="SET_FLOWPANEL"
export const SET_FLOWONLYSHOW="SET_FLOWONLYSHOW"
export const SET_WORKORDERTEMPLATES="SET_WORKORDERTEMPLATES"
export const SET_WORKORDERTEMPLATESID = "SET_WORKORDERTEMPLATESID"
export const SET_FLOWDESIGNTEMPLATESID = "SET_FLOWDESIGNTEMPLATESID"


//设置 flowDeignResultData 数据
export function set_flowDesignResultData_flow(flowDeignResultData) {
    return {
        type: SET_FLOWDESIGNRESULTDATA_FLOW,
        flowDeignResultData
    }
}

export function set_flowName(flowName) {
    return {
        type: GET_WORKFLOWNAME_FLOWNAME,
        flowName
    }
}

export function set_flowObjects(flowObjects) {
    return {
        type: GET_WORKFLOWNAME_FLOWOBJECT,
        flowObjects
    }
}

export function set_flowDesignPicData(flowDesignPicData) {
    return {
        type: GET_FLOWDESIGNPICDATA_FLOW,
        flowDesignPicData
    }
}

export function set_workFlowTable(workFlowTable) {
    return {
        type: GET_WORKFLOWTABLE_FLOW,
        workFlowTable
    }
}
export function set_workFlowDetailTable(workFlowDetailTable) {
    return {
        type: GET_WORKFLOWDETAILSTABLE_FLOW,
        workFlowDetailTable
    }
}
//设置当前流程
export function set_currFlow(currFlowData){
  return {
      type: SET_CURRFLOW,
      currFlowData
  }

}

export function set_flowPanel(flowPanelState){
  //this.dispatch(Constants.SET_FLOWPANEL,data);
  return {
      type: SET_FLOWPANEL,
      flowPanelState
  }
}

export function set_flowOnlyShow(flowOnlyShow){
  //this.dispatch(Constants.SET_FLOWONLYSHOW,data);
  return {
      type: SET_FLOWONLYSHOW,
      flowOnlyShow
  }
}

//清空flowDeignResultData 数据
export function clear_flowDesignResultData_flow(){
  return dispatch=>{
    dispatch(set_flowDesignResultData_flow([]));
  }
}

export function set_workOrderTemplates(data) {
    return {
        type: SET_WORKORDERTEMPLATES,
        data
    }
}

//获取流程图信息
export function get_workFlowName_flow(){
  return dispatch=>{
    try {
      //oData.getWorkFlowTable({"key":"Name","value":name},function(result1)  {"key":"WorkOrderType","value":"WorkOrderCommon"}
      dispatch(requestDataActions.setRequest());
      oData.getWorkFlowTable({"key":"WorkOrderType","value":'WorkOrderCommon'},result1 => {
        //console.log("getWorkFlowName");
        //console.log(result1);
        var dataresult = result1.results;
        var flowtemp=[""];
        var flowObjectstemp=[];
        if(dataresult.length>0) {
          //dataresult = dataresult[0];
          for (var i = 0; i < dataresult.length; i++) {
            var flowobj= dataresult[i]
            flowtemp.push(flowobj.Name);
            var newObj1={};
            newObj1["workflowid"]=flowobj.RecId;
            newObj1["name"] = flowobj.Name;
            newObj1["createby"] = flowobj.CreatedBy;
            newObj1["lastmodby"] = flowobj.LastModBy;
            newObj1["lastmoddatetime"] = flowobj.LastModDateTime;
            flowObjectstemp.push(newObj1);
          }
        }
        //that.flowName=flowtemp;
        //that.flowObjects=flowObjectstemp;
        dispatch(set_flowName(flowtemp));
        dispatch(set_flowObjects(flowObjectstemp));
        dispatch(requestDataActions.setRequestSuccess());
      });
    }
    catch (e) {} finally {}
  }
}
//获取工单模板信息
export function get_workOrderTemplates(){
  return dispatch=>{
    try {
      //oData.getWorkFlowTable({"key":"Name","value":name},function(result1)  {"key":"WorkOrderType","value":"WorkOrderCommon"}
      dispatch(requestDataActions.setRequest());
      oData.getworkOrderTemplates({},result1 => {
        var dataresult = result1.results;
        dispatch(set_workOrderTemplates(dataresult));
        dispatch(requestDataActions.setRequestSuccess());
      });
    }
    catch (e) {} finally {}
  }
}

//设置主模板id和处理表单id
export function set_workOrderTemplatesId(data) {
    return {
        type: SET_WORKORDERTEMPLATESID,
        data
    }
}
//设置流程设计的处理表单id
export function set_flowDesignTemplatesId(data) {
    return {
        type: SET_FLOWDESIGNTEMPLATESID,
        data
    }
}


//获取流程设计
export function get_flowDesignPicData_flow(){
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oData.getFlowDesignPicData(data => {
      // console.log(data);
      var result = data.results[0];
      //that.flowDesignPicData = result;
      dispatch(set_flowDesignPicData(result));
      dispatch(requestDataActions.setRequestSuccess());
    });
  }
}
//根据流程名称获取流程设计
export function get_flowDesignPicDataByName_flow(name){
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oData.getFlowDesignPicDataByName(name,data => {
      // console.log(data);
      var result = data.results[0];
      //that.flowDesignPicData = result;
      dispatch(set_flowDesignPicData(result));
      dispatch(requestDataActions.setRequestSuccess());
    });
  }
}
//获取WorkFlow table
export function get_workFlowTable_flow(){
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oData.getWorkFlowTable(data => {
      // console.log(data);
      var result = data.results[0];
      //that.workFlowTable = result;
      dispatch(set_workFlowTable(result));
      dispatch(requestDataActions.setRequestSuccess());
    });
  }
}
//获取WorkFlowdetail table
export function get_workFlowDetailsTable_flow(){
  //this.dispatch(Constants.GET_WORKFLOWDETAILSTABLE_FLOW);
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oData.getWorkFlowDetailsTable(data => {
      // console.log(data);
      var result = data.results[0];
      //that.workFlowDetailTable = result;
      dispatch(set_workFlowDetailTable(result));
      dispatch(requestDataActions.setRequestSuccess());
    });
  }
}
//保存流程设计
export function save_flowDesignPicData_flow(data){
  return dispatch =>{
    dispatch(requestDataActions.setRequest());
    oData.addFlowDesign(data[0],result => {
      var curWorkFlowId = result.RecId;
      //console.log("curWorkFlowId:"+curWorkFlowId);
      //that.emit("change");
      if(curWorkFlowId){
        for(var i=0;i<data[1].length;i++){
          var obj1 = data[1][i];
            //console.log(obj1);
          var dataSave = {
            WorkFlowId:curWorkFlowId,
            FromId:obj1.from,
            ToId:obj1.to,
            Status:obj1.state,
            FlowAction:obj1.description
          };
          dispatch(requestDataActions.setRequest());
          oData.addFlowDesignDetail(dataSave,result2 => {
            console.log(result2);
            dispatch(requestDataActions.setRequestSuccess());
          });
        };
      };
      dispatch(requestDataActions.setRequestSuccess());
    });
  }
}

export function delete_flowDesignPicData_flow(data){
 return (dispatch,getState) => {
   var state = getState();
   var curWorkFlowName = data;
   var curWorkFlowId ="";
   var flowObjects1 = state.flowDesignReducer.flowObjects;
   for (var i = 0; i < flowObjects1.length; i++) {
       if(flowObjects1[i].name == curWorkFlowName){
           curWorkFlowId=flowObjects1[i].workflowid;
       }
   }
   var deldata=[{key:'TABLENAME',value:'WorkFlow'},{key:'KEYWORD',value:'Name'},{key:"VALUE",value:"'"+curWorkFlowName+"'"}];

   if(curWorkFlowId){
     var querydata={key:"WorkOrderType",value:curWorkFlowId};
     dispatch(requestDataActions.setRequest());
     oData.getWorkOrderByID(querydata,result5 => {
         var dataresult = result5.results;
           if(dataresult.length > 0){
               //alert("请删除相关工单数据！");
               $.showPublicDialog("系统提示","请删除相关工单数据。");
           }else {
             dispatch(requestDataActions.setRequest());
             oData.deleteFlowDesign(deldata,result => {
               //console.log("deleteFlowDesign ");
               //console.log(result);
               $.showPublicDialog("系统提示","删除成功。");
               $("#OperationFlowDesignPic").hide();
                //document.getElementById('OperationFlowDesignPic').innerHTML="";
                //that.getWorkFlowName_flow();
                dispatch(get_workFlowName_flow());
                dispatch(requestDataActions.setRequestSuccess());
             });
             var deldetaildata = [{key:'TABLENAME',value:'WorkFlowDetails'},{key:'KEYWORD',value:'WorkFlowId'},{key:'VALUE',value:"'"+curWorkFlowId+"'"}];
             //console.log("delete curWorkFlowId:"+curWorkFlowId);
             dispatch(requestDataActions.setRequest());
             oData.deleteFlowDesign(deldetaildata,result2 => {
               console.log("deleteWorkFlowDetails");
               //   alert("删除成功！");
               //    that.getWorkFlowName();
               dispatch(requestDataActions.setRequestSuccess());
             });
            }
            dispatch(requestDataActions.setRequestSuccess());
     });
     // oData.deleteFlowDesign(deldata,function(result){
     //   console.log("deleteFlowDesign ");
     //   console.log(result);
     // });
     // var deldetaildata = [{key:'TABLENAME',value:'WorkFlowDetails'},{key:'KEYWORD',value:'WorkFlowId'},{key:'VALUE',value:"'"+curWorkFlowId+"'"}];
     // console.log("delete curWorkFlowId:"+curWorkFlowId);
     // oData.deleteFlowDesign(deldetaildata,function(result2){
     //   console.log("deleteWorkFlowDetails");
     //   alert("删除成功！");
     //    that.getWorkFlowName();
     // that.emit("change");
     // });
   }
 }
}

//保存流程设计
export function update_flowDesignPicData_flow(data){
  //this.dispatch(Constants.UPDATE_FLOWDESIGNPICDATA_FLOW,data);
  return (dispatch,getState) => {
    var state = getState();
    var data0 = data[0];
    var templateIdAndTableId = data[2];//主模板+处理表单
    var flowDesignTemplatesId = data[3];//设计流程处理表单
    var name = data0.Name;
    //console.log(name);
    //var data1 = data[1];
    var data1 =state.flowDesignReducer.flowDeignResultData;
  //  console.log(data1);
    //delete
    try {
      dispatch(requestDataActions.setRequest());
      oData.getWorkFlowTable({"key":"Name","value":name},result1 => {
        var curWorkFlowId="";
        var curWorkname ="";
        var dataresult = result1.results;
        if(dataresult.length>0)
        {
          console.log("delete curWorkFlowId");
          //console.log(result1);
          dataresult=dataresult[0];
          try {
            curWorkFlowId = dataresult.RecId;
            curWorkname =dataresult.Name
          //  console.log("curWorkFlowId");
            //console.log(curWorkFlowId);
            //console.log(curWorkname);
            var deldata=[{key:'TABLENAME',value:'WorkFlow'},{key:'KEYWORD',value:'Name'},{key:"VALUE",value:"'"+curWorkname+"'"}];

            if(curWorkFlowId){
              // oData.deleteFlowDesign(deldata,function(result){
              //   console.log("deleteFlowDesign ");
              //   console.log(result);
              // });
              var deldetaildata = [{key:'TABLENAME',value:'WorkFlowDetails'},{key:'KEYWORD',value:'WorkFlowId'},{key:'VALUE',value:"'"+curWorkFlowId+"'"}];
            ///  console.log("delete curWorkFlowId:"+curWorkFlowId);
              dispatch(requestDataActions.setRequest());
              oData.deleteFlowDesign(deldetaildata,result2 => {
                    //console.log("deleteDetailFlowDesign ");
                    //  console.log(result2);
                    //add
                    var newdata1="[";
                    var endn= data1.length-1;
                    for (var i = 0; i < data1.length; i++) {
                      var obj=data1[i];
                      var n=i+1;
                      var temstring = "";
                      if(i<endn){
                        //temstring="{from:'"+obj.from+"',to:'"+obj.to+"',state:'"+obj.state+"',des:'"+obj.des+"',sn:"+n+"},";
                        temstring="{from:'"+obj.from+"',to:'"+obj.to+"',state:'"+obj.state+"',des:'"+obj.des+"',sn:"+n+",flag:"+obj.flag+",nextstatus:'"+obj.nextstatus+"',actionTableOrderId:'"+obj.templateId+"'},";
                      }
                       else {
                         temstring="{from:'"+obj.from+"',to:'"+obj.to+"',state:'"+obj.state+"',des:'"+obj.des+"',sn:"+n+",flag:"+obj.flag+",nextstatus:'"+obj.nextstatus+"',actionTableOrderId:'"+obj.templateId+"'}";
                          //temstring="{from:"+obj.from+",to:"+obj.to+",state:"+obj.state+",des:"+obj.description+",sn:"+n+"}";
                       }
                      newdata1+=temstring;
                    }
                    newdata1=newdata1+"]";
                    //console.log("newdata1");
                    //console.log(newdata1);
                    var newdata =[{key:"WORKFLOW_ID",value:curWorkFlowId},{key:"FLOWNAME",value:name},{key:"FLOWDETAIL",value:newdata1}];
                    dispatch(requestDataActions.setRequest());
                    oData.saveFlowDesignPicData(newdata,result => {
                      // console.log("saveFlowDesignPicData ok");
                      // console.log(result);
                        $.showPublicDialog("系统提示","保存完成。");
                        window.location.href = '#/operationManage/flowDesign';
                       //that.getFlowDesignPicDataByName_flow(name);
                       dispatch(requestDataActions.setRequestSuccess());
                    });
                    dispatch(requestDataActions.setRequestSuccess());
              });
            }
          } catch (e) {
          } finally { }
        }else {
          //add
          //console.log("add");
          var newdata1="[";
          var endn= data1.length-1;
          for (var i = 0; i < data1.length; i++) {
            var obj=data1[i];
            var n=i+1;
            var temstring = "";
            if(i<endn){
              //temstring="{from:'"+obj.from+"',to:'"+obj.to+"',state:'"+obj.state+"',des:'"+obj.description+"',sn:"+n+"},";
              temstring="{from:'"+obj.from+"',to:'"+obj.to+"',state:'"+obj.state+"',des:'"+obj.des+"',sn:"+n+",flag:"+obj.flag+",nextstatus:'"+obj.nextstatus+"',actionTableOrderId:'"+obj.templdateId+"'},";
            }
             else {
               //temstring="{from:'"+obj.from+"',to:'"+obj.to+"',state:'"+obj.state+"',des:'"+obj.description+"',sn:"+n+"}";
               temstring="{from:'"+obj.from+"',to:'"+obj.to+"',state:'"+obj.state+"',des:'"+obj.des+"',sn:"+n+",flag:"+obj.flag+",nextstatus:'"+obj.nextstatus+"',actionTableOrderId:'"+obj.templdateId+"'}";
                //temstring="{from:"+obj.from+",to:"+obj.to+",state:"+obj.state+",des:"+obj.description+",sn:"+n+"}";
             }
            newdata1+=temstring;
          }
          newdata1=newdata1+"]";
          //console.log("newdata1");
          //console.log(newdata1);
          var newdata =[{key:"WORKFLOW_ID",value:""},{key:"FLOWNAME",value:name},{key:"FLOWDETAIL",value:newdata1},{key:"WORKORDER_TEMPLATEID",value:templateIdAndTableId.gdztmbId},{key:"ACTIONTABLEORDERID",value:templateIdAndTableId.clbdId}];
          dispatch(requestDataActions.setRequest());
          oData.saveFlowDesignPicData(newdata,result => {
            if(result.results[0].OUT_FLAG == "true"){
              $.showPublicDialog("系统提示","保存完成。");
              window.location.href = '#/operationManage/flowDesign';
              dispatch(requestDataActions.setRequestSuccess());
            }else{
              $.showPublicDialog("系统提示","请保存一个业务对象并分配对象。");
            }
             //console.log("saveFlowDesignPicData ok");
             //console.log(result);

             //that.getWorkFlowName_flow();
             //that.getFlowDesignPicDataByName_flow(name);

          });
        }
        dispatch(requestDataActions.setRequestSuccess());
      });
    } catch (e) {
     console.log(e);
    } finally {}
  }
}
