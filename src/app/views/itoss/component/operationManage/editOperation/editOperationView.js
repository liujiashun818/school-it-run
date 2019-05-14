require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import { connect } from 'react-redux'
import * as operationAction from '../../../../../actions/operation_action'
import * as operationflowAction from '../../../../../actions/operationflow_action'
import { getWorkOrderToMonitorData } from '../../../../../actions/deviceMonitor_action'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
var Store = require('../../../../../server/store.js');
var base64 = require('../../../../../utils/base64.js');
import OperationForm from './editOperationFormView.js';
import CommonTree from '../../monitorTree/commonTree.js';

var editOperation = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("YFTOperationStore").getState()
    //     }
    // },
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    _handleOnClick: function(e) {
      const { dispatch } = this.props;
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
        setTimeout(function(){
          dispatch(operationAction.init_detailData(2));
          dispatch(operationAction.set_curWorkFlowType(e.target.id));
          var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
          dispatch(operationAction.get_createOrderInfo(param));
        },1000);
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
    onGetServiceName:function(){
      const { dispatch } = this.props;
      dispatch(operationAction.get_serviceName());
    },
    render:function(){
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
      const { dispatch } = this.props;
      return(
        <div id='editOperation' className='overviewDiv'>
          <div className='leftListDiv col-md-1'>
            <div className="assetManageListDiv">
              <CommonTree data={treeList}
                curThreeNode={this.props.curThreeNode}
                preThreeNode={this.props.preThreeNode}
                curName={this.props.curName}
                setCurName={data => dispatch(setCurName(data))}
                onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                init_detailData={param => dispatch(operationAction.init_detailData(param))}
                set_curWorkFlowType={param => dispatch(operationAction.set_curWorkFlowType(param))}
                get_createOrderInfo={param => dispatch(operationAction.get_createOrderInfo(param))}
                clearMark="1" isOperationMark="1" canUpdate={this.props.canUpdate}
                setCanUpdate={param => dispatch(operationAction.setCanUpdate(param))}
              />
            </div>
          </div>
          <OperationForm
            orderDetailData={this.props.orderDetailData} workFlowDetailsData={this.props.workFlowDetailsData} workFlowTypes={this.props.workFlowTypes}
            permissions={this.props.permissions} curWorkOrderId={this.props.curWorkOrderId} serviceData={this.props.serviceData}
            faultTypes={this.props.faultTypes} faultSubTypes={this.props.faultSubTypes} serviceName={this.props.serviceName}
            assets={this.props.assets} currentNextPerson={this.props.currentNextPerson} workFlowLogData={this.props.workFlowLogData}
            workOrderProcessLogData={this.props.workOrderProcessLogData} flowActionListData={this.props.flowActionListData} curWorkOrderStatus={this.props.curWorkOrderStatus}
            flowPersonnelListData={this.props.flowPersonnelListData} delayIndex={this.props.delayIndex} flowPicData={this.props.flowPicData}
            faultTypeId={this.props.faultTypeId} faultSubTypeId={this.props.faultSubTypeId} flowLevel={this.props.flowLevel}
            serviceId={this.props.serviceId} steps={this.props.steps} curDelayId={this.props.curDelayId}
            get_WorkOrderNextPersonData={filter => dispatch(operationflowAction.get_WorkOrderNextPersonData(filter))}
            onSetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
            onSetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
            get_flowPicData={param => dispatch(operationAction.get_flowPicData(param))}
            get_faultSubType={param => dispatch(operationAction.get_faultSubType(param))}
            setFaultTypeId={data => dispatch(operationAction.setFaultTypeId(data))}
            setServiceName={data => dispatch(operationAction.setServiceName(data))}
            setFlowLevel={data => dispatch(operationAction.setFlowLevel(data))}
            setHandleAssetsId={data => dispatch(operationAction.setHandleAssetsId(data))}
            setCurWorkOrderStatus={data => dispatch(operationAction.setCurWorkOrderStatus(data))}
            getWorkOrderToMonitorData={param => dispatch(getWorkOrderToMonitorData(param))}
            getAssets={param => dispatch(operationAction.getAssets(param))}
            setCurrentNextPerson={data => dispatch(operationflowAction.setCurrentNextPerson(data))}
            get_WorkOrderNextPersonData={param => dispatch(operationflowAction.get_WorkOrderNextPersonData(param))}
            update_WorkOrderCommonStatusData={data => dispatch(operationflowAction.update_WorkOrderCommonStatusData(data))}
            get_delaySerialNum={param => dispatch(operationAction.get_delaySerialNum(param))}
            setCurDelayId={param => dispatch(operationAction.setCurDelayId(param))}
            save_updateOrder={data => dispatch(operationAction.save_updateOrder(data))}
            add_WorkOrderProcessLogData={data => dispatch(operationflowAction.add_WorkOrderProcessLogData(data))}
            add_WorkFlowLogData={data => dispatch(operationflowAction.add_WorkFlowLogData(data))}
            set_WorkFlowSendEmail={data => dispatch(operationflowAction.set_WorkFlowSendEmail(data))}
            save_createDelay={data => dispatch(operationAction.save_createDelay(data))}
            save_updateDelay={data => dispatch(operationAction.save_updateDelay(data))}
            save_satisfyScore={data => dispatch(operationAction.save_satisfyScore(data))}
            get_serviceName={this.onGetServiceName}
            setCurName={data => dispatch(setCurName(data))}
          />
        </div>
      );
    }
});

function mapEditOperationState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { workFlowTypes,curWorkFlowId,orderDetailData,permissions,curWorkOrderId,serviceData,faultTypes,faultSubTypes,serviceName,assets,curWorkOrderStatus,
  delayIndex,flowPicData,faultTypeId,faultSubTypeId,serviceId,curDelayId } = state.operationReducer
  const { workFlowDetailsData,currentNextPerson,workFlowLogData,workOrderProcessLogData,flowActionListData,flowPersonnelListData,steps } = state.operationFlowReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    workFlowTypes:workFlowTypes,
    curWorkFlowId:curWorkFlowId,
    orderDetailData:orderDetailData,
    workFlowDetailsData:workFlowDetailsData,
    permissions:permissions,
    curWorkOrderId:curWorkOrderId,
    serviceData:serviceData,
    faultTypes:faultTypes,
    faultSubTypes:faultSubTypes,
    serviceName:serviceName,
    assets:assets,
    currentNextPerson:currentNextPerson,
    workFlowLogData:workFlowLogData,
    workOrderProcessLogData:workOrderProcessLogData,
    flowActionListData:flowActionListData,
    curWorkOrderStatus:curWorkOrderStatus,
    flowPersonnelListData:flowPersonnelListData,
    delayIndex:delayIndex,
    flowPicData:flowPicData,
    faultTypeId:faultTypeId,
    faultSubTypeId:faultSubTypeId,
    serviceId:serviceId,
    steps:steps,
    curDelayId:curDelayId,
    curName:curName
  }
}

export default connect(mapEditOperationState)(editOperation)
