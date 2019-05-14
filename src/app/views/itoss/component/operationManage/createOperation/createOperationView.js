/**
* 工单管理-新建工单
*/
require('bootstrap');
import React from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;

import { connect } from 'react-redux'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
import * as operationAction from '../../../../../actions/operation_action'
import * as operationFlowAction from '../../../../../actions/operationflow_action'
import {set_linshiData,set_linshiNode} from '../../../../../actions/index_action'
import {getWorkOrderToMonitorData } from '../../../../../actions/deviceMonitor_action'

var Store = require('../../../../../server/store.js');
var base64 = require('../../../../../utils/base64.js');
var CommonTree = require('../../monitorTree/commonTree.js');

import OperationForm from './createOperationFormView.js';

var createOperation = React.createClass({
    mixins: [History],
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    componentDidMount:function(){
      var workFlowTypes = this.props.workFlowTypes;
      if(workFlowTypes.length <= 0){
        this.props.dispatch(operationAction.get_workFlowTypes());
      };
    },
    _handleOnClick: function(e) {
      if(e.target.id == 'eToMyWorkSpace'){
        this.history.pushState(null,'operationManage/myWorkSpace');
      }
      else if(e.target.id == 'eToAutoWorkOrderRules'){
          this.history.pushState(null,'operationManage/autoWorkOrderRules');
      }
      else{
        $("#createOperationOrderTitle").val("");
        $("#createOperationOrderExplain").val("");
        $("#createOperationFaultType").find(".rw-input").text("");
        $("#createOperationFaultSubType").find(".rw-input").text("");
        $("#createOperationOrderLevel").find(".rw-input").text("");
        $("#createOperationOrderSla").find(".rw-input").text("");
        $("#createOperationOrderResponse").val("");
        $("#createOperationOrderOver").val("");
        // setTimeout(function(){
        //   this.getFlux().actions.YFTOperationActions.init_detailData(2);
        //   this.getFlux().actions.YFTOperationActions.set_curWorkFlowType(e.target.id);
        //   var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
        //   this.getFlux().actions.YFTOperationActions.get_createOrderInfo(param);
        // },1000);
        const {dispatch} = this.props;
        dispatch(operationAction.init_detailData(2));
        dispatch(operationAction.set_curWorkFlowType(e.target.id));
        var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
        dispatch(operationAction.get_createOrderInfo(param));

        this.history.pushState(null,'operationManage/createOperation');
        $(".operationButtonGroup1").find(".buttonInfo").find("button").each(function(){
          $(this).attr("disabled",false);
          // console.log($(this).index());
          var indes = $(this).index();
          if(indes == 1){
            $(this).css("background-color","#00b724");
          }else if(indes == 2){
            $(this).css("background-color","#FF9933");
          };
        });
      }
    },
    componentDidUpdate:function(){
      $(".list-group").find("a").each(function(){
        var $node = $(this);
        $node.mouseover(function(){
          var claz = $node.attr("class");
          var ind = claz.indexOf("active");
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","list-group-item fadeInMenu active");
          }else{
            $node.attr("class","list-group-item fadeInMenuHover");
          };
        });
        $node.mouseout(function(){
          var claz = $node.attr("class");
          var ind = claz.indexOf("active");
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","list-group-item fadeInMenu active");
          }else{
            $node.attr("class","list-group-item fadeOutMenuHover");
          };
        });
      });
    },
    render:function(){
      const { dispatch } = this.props;
      var that = this;
      var workFlowTypes = this.props.workFlowTypes;
      var curFlowId = this.props.curWorkFlowId;
      var list = [];
      var treeList = [];
      var isCanShow = false;
      var isCanWorkSpace = false;
      var isCanAutoworkorderRules = false;
      var permissions = "";
      if(permissions == null || permissions == ""){
        var temp = Store.get("PERMISSIONS");
        if(temp!=null&&temp!=""){
          temp = base64.base64decode(temp);
          temp = decodeURI(temp);
          var ttemp = eval(temp);
          // console.log(ttemp);
          permissions = ttemp;
        };
      };
      for(var i=0;i<permissions.length;i++){
        var resourceType = permissions[i].resourceType;
        if(resourceType == "/operationmanage/workordermanage/workspace"){
          isCanWorkSpace = true;
        };
        if(resourceType == "/operationmanage/workordermanage/autoworkorderrules"){
          isCanAutoworkorderRules = true;
        };
        if(resourceType == "/operationmanage/workordermanage/createworkorder"){
          isCanShow = true;
        };
      };

      if(isCanWorkSpace){
        var spaceItem = (<a className="list-group-item" id="eToMyWorkSpace" onClick={this._handleOnClick} style={{cursor:'pointer'}} key="1">工作台</a>);
        list.push(spaceItem);
        treeList.push({id:1,name:"工作台",pid:0,toUrl:"operationManage/myWorkSpace"});
      };
      if (isCanAutoworkorderRules) {
        list.push(<a className="list-group-item" id="eToAutoWorkOrderRules" onClick={this._handleOnClick} style={{cursor:'pointer'}} key="2">自动工单规则</a>);
        treeList.push({id:2,name:"自动工单规则",pid:0,toUrl:"operationManage/autoWorkOrderRules"});
      };
      if (isCanShow) {
        if(workFlowTypes.length>0){
          if(curFlowId==""||curFlowId==null){
            curFlowId = workFlowTypes[0].RecId;
            //that.getFlux().actions.YFTOperationActions.set_curWorkFlowType(curFlowId);
            dispatch(operationAction.set_curWorkFlowType(curFlowId));
          };
          for(var i=0;i<workFlowTypes.length;i++){
            var id = workFlowTypes[i].RecId;
            var name = workFlowTypes[i].Name;
            var t=i+3;
            if(id == curFlowId){
              var data = (<a className="list-group-item fadeInMenu active" id={id} onClick={this._handleOnClick} style={{cursor:'pointer'}} key={t}>{"新建"+name}</a>);
              var tdata = {id:i+3,name:"新建"+name,pid:0,toUrl:"operationManage/createOperation",flowId:id};
              list.push(data);
              treeList.push(tdata);
            }else{
              var data = (<a className="list-group-item" id={id} onClick={this._handleOnClick} style={{cursor:'pointer'}} key={t}>{"新建"+name}</a>);
              var tdata = {id:i+3,name:"新建"+name,pid:0,toUrl:"operationManage/createOperation",flowId:id};
              list.push(data);
              treeList.push(tdata);
            };
          };
        };
      };
      const { curThreeNode } = this.props;
      const { preThreeNode } = this.props;
      return(
          <div id='createOperation' className='overviewDiv'>
            <div className='leftListDiv col-md-1'>
              <div className="assetManageListDiv">
                <CommonTree data={treeList} curThreeNode={curThreeNode} preThreeNode={preThreeNode} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                  init_detailData={param =>dispatch(operationAction.init_detailData(param))} isOperationMark="1" canUpdate={this.props.canUpdate}
                  setCanUpdate={param => dispatch(operationAction.setCanUpdate(param))} curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
                  set_curWorkFlowType={param =>dispatch(operationAction.set_curWorkFlowType(param))}
                  get_createOrderInfo={param =>dispatch(operationAction.get_createOrderInfo(param))}
                />
              </div>
            </div>
            <OperationForm flowPersonnelListData={this.props.flowPersonnelListData} flowActionListData={this.props.flowActionListData}
                curWorkOrderId={this.props.curWorkOrderId} curWorkOrderData={this.props.curWorkOrderData}
                update_WorkOrderCommonStatusData={statusData=>dispatch(operationFlowAction.update_WorkOrderCommonStatusData(statusData))}
                add_CreateWorkFlowLogData={flowData=>dispatch(operationFlowAction.add_CreateWorkFlowLogData(flowData))}
                set_WorkFlowSendEmail={emaildata=>dispatch(operationFlowAction.set_WorkFlowSendEmail(emaildata))}
                setCanUpdate={param => dispatch(operationAction.setCanUpdate(param))}

                workFlowTypes={this.props.workFlowTypes} faultTypeId={this.props.faultTypeId} faultSubTypeId={this.props.faultSubTypeId}
                flowLevel={this.props.flowLevel} serviceId={this.props.serviceId} createOrderInfo={this.props.createOrderInfo} permissions={this.props.permissions}
                currentNextPerson={this.props.currentNextPerson}
                save_createOrder={data =>dispatch(operationAction.save_createOrder(data))} save_createOrder2={data =>dispatch(operationAction.save_createOrder2(data))}
                setCurrentNextPerson={data =>dispatch(operationFlowAction.setCurrentNextPerson(data))}
                get_WorkOrderNextPersonData={filter =>dispatch(operationFlowAction.get_WorkOrderNextPersonData(filter))}
                add_WorkFlowLogData={flowData=>dispatch(operationFlowAction.add_WorkFlowLogData(flowData))}
                set_linshiData={data =>dispatch(set_linshiData(data))} set_linshiNode={data =>dispatch(set_linshiNode(data))}
                add_WorkOrderProcessLogData={data =>dispatch(operationFlowAction.add_WorkOrderProcessLogData(data))}

                serviceData={this.props.serviceData} faultTypes={this.props.faultTypes} faultSubTypes={this.props.faultSubTypes} serviceName={this.props.serviceName}
                get_faultType={data =>dispatch(operationAction.get_faultType())} get_serviceName={data =>dispatch(operationAction.get_serviceName())}
                get_createOrderInfo={param =>dispatch(operationAction.get_createOrderInfo(param))}
                get_faultSubType={param =>dispatch(operationAction.get_faultSubType(param))}
                setServiceId={param =>dispatch(operationAction.setServiceId(param))} setFlowLevel={param =>dispatch(operationAction.setFlowLevel(param))}
                setFaultSubTypeId={param =>dispatch(operationAction.setFaultSubTypeId(param))}
                assets={this.props.assets} setHandleAssetsId={param =>dispatch(operationAction.setHandleAssetsId(param))}
                getWorkOrderToMonitorData={param =>dispatch(getWorkOrderToMonitorData(param))}
                getAssets={param =>dispatch(operationAction.getAssets(param))}
                onSetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                onSetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                curThreeNode={curThreeNode}

                curWorkFlowId={this.props.curWorkFlowId}
                init_detailData={param =>dispatch(operationAction.init_detailData(param))} get_WorkOrderNextPersonData={filter =>dispatch(operationFlowAction.get_WorkOrderNextPersonData(filter))}
            />
          </div>
      );
    }
});

function mapResourceState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { workFlowTypes,curWorkOrderId,curWorkOrderData,faultTypeId,faultSubTypeId,flowLevel,serviceId,createOrderInfo,permissions,
          serviceData,faultTypes,faultSubTypes,serviceName,assets,curWorkFlowId,canUpdate
        } = state.operationReducer
  const { WorkOrderProcessLogData,flowPersonnelListData,flowActionListData,currentNextPerson } = state.operationFlowReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    workFlowTypes:workFlowTypes,
    curWorkOrderId:curWorkOrderId,
    curWorkOrderData:curWorkOrderData,
    faultTypeId:faultTypeId,
    faultSubTypeId:faultSubTypeId,
    flowLevel:flowLevel,
    serviceId:serviceId,
    createOrderInfo:createOrderInfo,
    permissions:permissions,
    serviceData:serviceData,
    faultTypes:faultTypes,
    faultSubTypes:faultSubTypes,
    serviceName:serviceName,
    assets:assets,
    curWorkFlowId:curWorkFlowId,
    canUpdate:canUpdate,

    WorkOrderProcessLogData:WorkOrderProcessLogData,
    flowPersonnelListData:flowPersonnelListData,
    flowActionListData:flowActionListData,
    currentNextPerson:currentNextPerson,
    curName:curName
  }
}

export default connect(mapResourceState)(createOperation)
