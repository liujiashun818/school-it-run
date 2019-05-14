require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import OperationDetail from './editOperationDetail.js';
import OperationHandle from './editOperationHandle.js';
import OperationButtons from './editOperationButton.js';
import OperationDelay from './editOperationDelayClaim.js';
import OperationApprove from './editOperationDelayApprove.js';
import OperationSatisfy from './editOperationSatisfy.js';
import OperationFlowLog from './editOperationFlowLog.js';
import OperationFlowPic from './editOperationFlowPic.js';
import OperationPersonnelModal from './editoperationPersonnelModal.js';

var getworkOrderNextData = 0;
var editOperationForm = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     itoss:flux.store("YFTOperationStore").getState(),
    //     flow:flux.store("YFTOperationFlowStore").getState()
    //   }
    // },
    componentDidMount: function() {
      getworkOrderNextData = 0;
      if($('#createOperationForm') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
  			$('#createOperationForm').css("height",height);
  		};
    },
    componentDidUpdate: function() {
      if(getworkOrderNextData == 0){
        var curWorkFlowId = "";
        var grouid = "";
        if(this.props.orderDetailData){
          if(this.props.orderDetailData.WORKFLOW_ID){
            curWorkFlowId = this.props.orderDetailData.WORKFLOW_ID;
            grouid = this.props.orderDetailData.GROUP_ID;
            var filter = [{key:"FROM_ID",value:localStorage.getItem("CURRENT_ROLENAME")},{key:"WORKFLOW_ID",value:curWorkFlowId},{key:"GROUP_ID",value:grouid}];
            this.props.get_WorkOrderNextPersonData(filter);
            getworkOrderNextData = 1;
          };
        };
      }
    },
    handleTabClick:function(e){
      var id = $(e.target).attr("id");
      // console.log(id)
      var that = this;
      $(".oBGroup").hide();
      if(id=="operationDetailTab"){
        $(".operationButtonGroup1").show();
      }else if(id=="operationHandleTab"){
        $(".operationButtonGroup2").show();
      }else if(id=="operationDelayTab"){
        $(".operationButtonGroup3").show();
      }else if(id=="operationDelayApproveTab"){
        $(".operationButtonGroup4").show();
      }else if(id=="operationFlowPicTab"){
        $(".operationButtonGroup5").show();
        ReactDOM.render(<OperationFlowPic
            flowPicData={that.props.flowPicData}
          />,document.getElementById('tab_5'));
      }else if(id=="operationFlowLogTab"){
        $(".operationButtonGroup6").show();
      }else if(id=="operationCallBackTab"){
        $(".operationButtonGroup7").show();
      };
    },
    render:function(){
        var that = this;
        var Flag=false;  //是否是维护人员(false 不是，true 是)
        if(this.props.workFlowDetailsData){
          if(this.props.workFlowDetailsData.length > 0){
            Flag = this.props.workFlowDetailsData[0].Flag;
          };
        };
        if(this.props.orderDetailData)
        { //工单Status：申请延期批复	sqyqpf;申请延期拒绝	sqyqjj;申请延期	sqyq;待验证	wc;关闭	gb;草稿	cg;待处理	cl;待分配 fp;
          var workstatus = this.props.orderDetailData.STATUS_EN;
          if(workstatus == "cl" || workstatus == "sqyqpf" || workstatus == "sqyqjj" || workstatus == "sqyq"){
            if(this.props.orderDetailData.CURRENT_HANDLER == localStorage.getItem("USERNAME")){
                //if(localStorage.getItem("CURRENT_ROLENAME") == "运维人员"){
                if(Flag){
                    //是运维人员本人处理 可以编辑、显示 延期申请 ; 不显示 延期审批
                    return(
                      <div id='createOperationForm' className='overviewDesViewDiv'>
                        <OperationPersonnelModal
                          flowPersonnelListData={this.props.flowPersonnelListData}
                          setCurrentNextPerson={this.props.setCurrentNextPerson}
                        />
                        <OperationButtons
                          orderDetailData={this.props.orderDetailData} workFlowTypes={this.props.workFlowTypes} permissions={this.props.permissions}
                          curWorkOrderId={this.props.curWorkOrderId} faultTypeId={this.props.faultTypeId} faultSubTypeId={this.props.faultSubTypeId}
                          flowLevel={this.props.flowLevel} serviceId={this.props.serviceId} currentNextPerson={this.props.currentNextPerson}
                          flowActionListData={this.props.flowActionListData} curWorkOrderStatus={this.props.curWorkOrderStatus} steps={this.props.steps}
                          curDelayId={this.props.curDelayId} workFlowLogData={this.props.workFlowLogData} save_satisfyScore={this.props.save_satisfyScore}
                          onSetCurThreeNode={this.props.onSetCurThreeNode} onSetPreThreeNode={this.props.onSetPreThreeNode} save_updateOrder={this.props.save_updateOrder}
                          add_WorkOrderProcessLogData={this.props.add_WorkOrderProcessLogData} update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData}
                          add_WorkFlowLogData={this.props.add_WorkFlowLogData} set_WorkFlowSendEmail={this.props.set_WorkFlowSendEmail} save_createDelay={this.props.save_createDelay}
                          save_updateDelay={this.props.save_updateDelay}
                          setCurName={this.props.setCurName}
                        />
                        <div className='operationCreateTableDiv col-md-12'>
                          <ul className="nav nav-tabs">
                            <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick} id="operationDetailTab">工单详情</a></li>
                            <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick} id="operationHandleTab">处理表单</a></li>
                            <li><a href="#tab_3" data-toggle="tab" onClick={this.handleTabClick} id="operationDelayTab">延期申请</a></li>
                            <li><a href="#tab_5" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowPicTab">流程图</a></li>
                            <li><a href="#tab_6" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowLogTab">流程日志</a></li>
                            <li><a href="#tab_7" data-toggle="tab" onClick={this.handleTabClick} id="operationCallBackTab">满意度调查</a></li>
                          </ul>
                          <fieldset>
                            <div className="contentDiv tab-content marginleft_none">
                                <div className="tab-pane active" id="tab_1">
                                  <OperationDetail mark={true}
                                    permissions={this.props.permissions} curWorkOrderId={this.props.curWorkOrderId} serviceData={this.props.serviceData}
                                    faultTypes={this.props.faultTypes} faultSubTypes={this.props.faultSubTypes} serviceName={this.props.serviceName}
                                    orderDetailData={this.props.orderDetailData} assets={this.props.assets}
                                    get_serviceName={this.props.get_serviceName} get_flowPicData={this.props.get_flowPicData} get_faultSubType={this.props.get_faultSubType}
                                    setFaultTypeId={this.props.setFaultTypeId} setServiceName={this.props.setServiceName} setFlowLevel={this.props.setFlowLevel}
                                    setHandleAssetsId={this.props.setHandleAssetsId} getWorkOrderToMonitorData={this.props.getWorkOrderToMonitorData}
                                    getAssets={this.props.getAssets}
                                  />
                                </div>
                                <div className="tab-pane" id="tab_2">
                                  <OperationHandle
                                    orderDetailData={this.props.orderDetailData} currentNextPerson={this.props.currentNextPerson} workFlowLogData={this.props.workFlowLogData}
                                    workOrderProcessLogData={this.props.workOrderProcessLogData} flowActionListData={this.props.flowActionListData}
                                    workFlowDetailsData={this.props.workFlowDetailsData} curWorkOrderStatus={this.props.curWorkOrderStatus} curWorkOrderId={this.props.curWorkOrderId}
                                    flowPersonnelListData={this.props.flowPersonnelListData}
                                    setCurrentNextPerson={this.props.setCurrentNextPerson} get_WorkOrderNextPersonData={this.props.get_WorkOrderNextPersonData}
                                    update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData} setCurWorkOrderStatus={this.props.setCurWorkOrderStatus}
                                  />
                                </div>
                                <div className="tab-pane" id="tab_3">
                                  <OperationDelay
                                    permissions={this.props.permissions} delayIndex={this.props.delayIndex} orderDetailData={this.props.orderDetailData}
                                    get_delaySerialNum={this.props.get_delaySerialNum}
                                  />
                                </div>
                                <div className="tab-pane" id="tab_5">
                                </div>
                                <div className="tab-pane" id="tab_6">
                                  <OperationFlowLog
                                    orderDetailData={this.props.orderDetailData}
                                  />
                                </div>
                                <div className="tab-pane" id="tab_7">
                                  <OperationSatisfy
                                    permissions={this.props.permissions} orderDetailData={this.props.orderDetailData}
                                  />
                                </div>
                            </div>
                          </fieldset>
          	            </div>
                      </div>
                    );
                }
                else{
                   //是视频监控管理人员或 派出所监控管理员 本人处理 可以编辑、显示 延期审批 ; 不显示 延期申请
                   return(
                     <div id='createOperationForm' className='overviewDesViewDiv'>
                       <OperationPersonnelModal
                         flowPersonnelListData={this.props.flowPersonnelListData}
                         setCurrentNextPerson={this.props.setCurrentNextPerson}
                       />
                       <OperationButtons
                         orderDetailData={this.props.orderDetailData} workFlowTypes={this.props.workFlowTypes} permissions={this.props.permissions}
                         curWorkOrderId={this.props.curWorkOrderId} faultTypeId={this.props.faultTypeId} faultSubTypeId={this.props.faultSubTypeId}
                         flowLevel={this.props.flowLevel} serviceId={this.props.serviceId} currentNextPerson={this.props.currentNextPerson}
                         flowActionListData={this.props.flowActionListData} curWorkOrderStatus={this.props.curWorkOrderStatus} steps={this.props.steps}
                         curDelayId={this.props.curDelayId} workFlowLogData={this.props.workFlowLogData} save_satisfyScore={this.props.save_satisfyScore}
                         onSetCurThreeNode={this.props.onSetCurThreeNode} onSetPreThreeNode={this.props.onSetPreThreeNode} save_updateOrder={this.props.save_updateOrder}
                         add_WorkOrderProcessLogData={this.props.add_WorkOrderProcessLogData} update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData}
                         add_WorkFlowLogData={this.props.add_WorkFlowLogData} set_WorkFlowSendEmail={this.props.set_WorkFlowSendEmail} save_createDelay={this.props.save_createDelay}
                         save_updateDelay={this.props.save_updateDelay}
                         setCurName={this.props.setCurName}
                       />
                       <div className='operationCreateTableDiv col-md-12'>
                         <ul className="nav nav-tabs">
                           <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick} id="operationDetailTab">工单详情</a></li>
                           <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick} id="operationHandleTab">处理表单</a></li>
                           <li><a href="#tab_4" data-toggle="tab" onClick={this.handleTabClick} id="operationDelayApproveTab">延期审批</a></li>
                           <li><a href="#tab_5" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowPicTab">流程图</a></li>
                           <li><a href="#tab_6" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowLogTab">流程日志</a></li>
                           <li><a href="#tab_7" data-toggle="tab" onClick={this.handleTabClick} id="operationCallBackTab">满意度调查</a></li>
                         </ul>
                         <fieldset>
                           <div className="contentDiv tab-content marginleft_none">
                               <div className="tab-pane active" id="tab_1">
                                 <OperationDetail mark={true}
                                   permissions={this.props.permissions} curWorkOrderId={this.props.curWorkOrderId} serviceData={this.props.serviceData}
                                   faultTypes={this.props.faultTypes} faultSubTypes={this.props.faultSubTypes} serviceName={this.props.serviceName}
                                   orderDetailData={this.props.orderDetailData} assets={this.props.assets}
                                   get_serviceName={this.props.get_serviceName} get_flowPicData={this.props.get_flowPicData} get_faultSubType={this.props.get_faultSubType}
                                   setFaultTypeId={this.props.setFaultTypeId} setServiceName={this.props.setServiceName} setFlowLevel={this.props.setFlowLevel}
                                   setHandleAssetsId={this.props.setHandleAssetsId} getWorkOrderToMonitorData={this.props.getWorkOrderToMonitorData}
                                   getAssets={this.props.getAssets}
                                 />
                               </div>
                               <div className="tab-pane" id="tab_2">
                                 <OperationHandle
                                   orderDetailData={this.props.orderDetailData} currentNextPerson={this.props.currentNextPerson} workFlowLogData={this.props.workFlowLogData}
                                   workOrderProcessLogData={this.props.workOrderProcessLogData} flowActionListData={this.props.flowActionListData}
                                   workFlowDetailsData={this.props.workFlowDetailsData} curWorkOrderStatus={this.props.curWorkOrderStatus} curWorkOrderId={this.props.curWorkOrderId}
                                   flowPersonnelListData={this.props.flowPersonnelListData}
                                   setCurrentNextPerson={this.props.setCurrentNextPerson} get_WorkOrderNextPersonData={this.props.get_WorkOrderNextPersonData}
                                   update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData} setCurWorkOrderStatus={this.props.setCurWorkOrderStatus}
                                 />
                               </div>
                               <div className="tab-pane" id="tab_4">
                                 <OperationApprove
                                    permissions={this.props.permissions} orderDetailData={this.props.orderDetailData}
                                    setCurDelayId={this.props.setCurDelayId}
                                 />
                               </div>
                               <div className="tab-pane" id="tab_5">
                               </div>
                               <div className="tab-pane" id="tab_6">
                                 <OperationFlowLog
                                    orderDetailData={this.props.orderDetailData}
                                 />
                               </div>
                               <div className="tab-pane" id="tab_7">
                                 <OperationSatisfy
                                    permissions={this.props.permissions} orderDetailData={this.props.orderDetailData}
                                 />
                               </div>
                           </div>
                         </fieldset>
                      </div>
                     </div>
                   );
                };
            }else{
              //是其他 人员浏览 不可编辑 延期申请; 不显示 延期审批
              return(
                <div id='createOperationForm' className='overviewDesViewDiv'>
                  <OperationPersonnelModal
                    flowPersonnelListData={this.props.flowPersonnelListData}
                    setCurrentNextPerson={this.props.setCurrentNextPerson}
                  />
                  <OperationButtons
                    orderDetailData={this.props.orderDetailData} workFlowTypes={this.props.workFlowTypes} permissions={this.props.permissions}
                    curWorkOrderId={this.props.curWorkOrderId} faultTypeId={this.props.faultTypeId} faultSubTypeId={this.props.faultSubTypeId}
                    flowLevel={this.props.flowLevel} serviceId={this.props.serviceId} currentNextPerson={this.props.currentNextPerson}
                    flowActionListData={this.props.flowActionListData} curWorkOrderStatus={this.props.curWorkOrderStatus} steps={this.props.steps}
                    curDelayId={this.props.curDelayId} workFlowLogData={this.props.workFlowLogData} save_satisfyScore={this.props.save_satisfyScore}
                    onSetCurThreeNode={this.props.onSetCurThreeNode} onSetPreThreeNode={this.props.onSetPreThreeNode} save_updateOrder={this.props.save_updateOrder}
                    add_WorkOrderProcessLogData={this.props.add_WorkOrderProcessLogData} update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData}
                    add_WorkFlowLogData={this.props.add_WorkFlowLogData} set_WorkFlowSendEmail={this.props.set_WorkFlowSendEmail} save_createDelay={this.props.save_createDelay}
                    save_updateDelay={this.props.save_updateDelay}
                    setCurName={this.props.setCurName}
                  />
                  <div className='operationCreateTableDiv col-md-12'>
                    <ul className="nav nav-tabs">
                      <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick} id="operationDetailTab">工单详情</a></li>
                      <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick} id="operationHandleTab">处理表单</a></li>
                      <li><a href="#tab_3" data-toggle="tab" onClick={this.handleTabClick} id="operationDelayTab">延期申请</a></li>
                      <li><a href="#tab_5" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowPicTab">流程图</a></li>
                      <li><a href="#tab_6" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowLogTab">流程日志</a></li>
                      <li><a href="#tab_7" data-toggle="tab" onClick={this.handleTabClick} id="operationCallBackTab">满意度调查</a></li>
                    </ul>
                    <fieldset>
                      <div className="contentDiv tab-content marginleft_none">
                          <div className="tab-pane active" id="tab_1">
                            <OperationDetail mark={true}
                              permissions={this.props.permissions} curWorkOrderId={this.props.curWorkOrderId} serviceData={this.props.serviceData}
                              faultTypes={this.props.faultTypes} faultSubTypes={this.props.faultSubTypes} serviceName={this.props.serviceName}
                              orderDetailData={this.props.orderDetailData} assets={this.props.assets}
                              get_serviceName={this.props.get_serviceName} get_flowPicData={this.props.get_flowPicData} get_faultSubType={this.props.get_faultSubType}
                              setFaultTypeId={this.props.setFaultTypeId} setServiceName={this.props.setServiceName} setFlowLevel={this.props.setFlowLevel}
                              setHandleAssetsId={this.props.setHandleAssetsId} getWorkOrderToMonitorData={this.props.getWorkOrderToMonitorData}
                              getAssets={this.props.getAssets}
                            />
                          </div>
                          <div className="tab-pane" id="tab_2">
                            <OperationHandle
                              orderDetailData={this.props.orderDetailData} currentNextPerson={this.props.currentNextPerson} workFlowLogData={this.props.workFlowLogData}
                              workOrderProcessLogData={this.props.workOrderProcessLogData} flowActionListData={this.props.flowActionListData}
                              workFlowDetailsData={this.props.workFlowDetailsData} curWorkOrderStatus={this.props.curWorkOrderStatus} curWorkOrderId={this.props.curWorkOrderId}
                              flowPersonnelListData={this.props.flowPersonnelListData}
                              setCurrentNextPerson={this.props.setCurrentNextPerson} get_WorkOrderNextPersonData={this.props.get_WorkOrderNextPersonData}
                              update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData} setCurWorkOrderStatus={this.props.setCurWorkOrderStatus}
                            />
                          </div>
                          <div className="tab-pane" id="tab_3">
                            <OperationDelay mark={true}
                              permissions={this.props.permissions} delayIndex={this.props.delayIndex} orderDetailData={this.props.orderDetailData}
                              get_delaySerialNum={this.props.get_delaySerialNum}
                            />
                          </div>
                          <div className="tab-pane" id="tab_5">
                          </div>
                          <div className="tab-pane" id="tab_6">
                            <OperationFlowLog
                              orderDetailData={this.props.orderDetailData}
                            />
                          </div>
                          <div className="tab-pane" id="tab_7">
                            <OperationSatisfy
                              permissions={this.props.permissions} orderDetailData={this.props.orderDetailData}
                            />
                          </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              );
            }
          }else if(workstatus == "cg"){
            //不显示 延期申请  延期审批
            return(
              <div id='createOperationForm' className='overviewDesViewDiv'>
                <OperationPersonnelModal
                  flowPersonnelListData={this.props.flowPersonnelListData}
                  setCurrentNextPerson={this.props.setCurrentNextPerson}
                />
                <OperationButtons
                  orderDetailData={this.props.orderDetailData} workFlowTypes={this.props.workFlowTypes} permissions={this.props.permissions}
                  curWorkOrderId={this.props.curWorkOrderId} faultTypeId={this.props.faultTypeId} faultSubTypeId={this.props.faultSubTypeId}
                  flowLevel={this.props.flowLevel} serviceId={this.props.serviceId} currentNextPerson={this.props.currentNextPerson}
                  flowActionListData={this.props.flowActionListData} curWorkOrderStatus={this.props.curWorkOrderStatus} steps={this.props.steps}
                  curDelayId={this.props.curDelayId} workFlowLogData={this.props.workFlowLogData} save_satisfyScore={this.props.save_satisfyScore}
                  onSetCurThreeNode={this.props.onSetCurThreeNode} onSetPreThreeNode={this.props.onSetPreThreeNode} save_updateOrder={this.props.save_updateOrder}
                  add_WorkOrderProcessLogData={this.props.add_WorkOrderProcessLogData} update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData}
                  add_WorkFlowLogData={this.props.add_WorkFlowLogData} set_WorkFlowSendEmail={this.props.set_WorkFlowSendEmail} save_createDelay={this.props.save_createDelay}
                  save_updateDelay={this.props.save_updateDelay}
                  setCurName={this.props.setCurName}
                />
                <div className='operationCreateTableDiv col-md-12'>
                  <ul className="nav nav-tabs">
                    <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick} id="operationDetailTab">工单详情</a></li>
                    <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick} id="operationHandleTab">处理表单</a></li>
                    <li><a href="#tab_5" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowPicTab">流程图</a></li>
                    <li><a href="#tab_6" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowLogTab">流程日志</a></li>
                    <li><a href="#tab_7" data-toggle="tab" onClick={this.handleTabClick} id="operationCallBackTab">满意度调查</a></li>
                  </ul>
                  <fieldset>
                    <div className="contentDiv tab-content marginleft_none">
                        <div className="tab-pane active" id="tab_1">
                          <OperationDetail
                            permissions={this.props.permissions} curWorkOrderId={this.props.curWorkOrderId} serviceData={this.props.serviceData}
                            faultTypes={this.props.faultTypes} faultSubTypes={this.props.faultSubTypes} serviceName={this.props.serviceName}
                            orderDetailData={this.props.orderDetailData} assets={this.props.assets}
                            get_serviceName={this.props.get_serviceName} get_flowPicData={this.props.get_flowPicData} get_faultSubType={this.props.get_faultSubType}
                            setFaultTypeId={this.props.setFaultTypeId} setServiceName={this.props.setServiceName} setFlowLevel={this.props.setFlowLevel}
                            setHandleAssetsId={this.props.setHandleAssetsId} getWorkOrderToMonitorData={this.props.getWorkOrderToMonitorData}
                            getAssets={this.props.getAssets}
                          />
                        </div>
                        <div className="tab-pane" id="tab_2">
                          <OperationHandle
                            orderDetailData={this.props.orderDetailData} currentNextPerson={this.props.currentNextPerson} workFlowLogData={this.props.workFlowLogData}
                            workOrderProcessLogData={this.props.workOrderProcessLogData} flowActionListData={this.props.flowActionListData}
                            workFlowDetailsData={this.props.workFlowDetailsData} curWorkOrderStatus={this.props.curWorkOrderStatus} curWorkOrderId={this.props.curWorkOrderId}
                            flowPersonnelListData={this.props.flowPersonnelListData}
                            setCurrentNextPerson={this.props.setCurrentNextPerson} get_WorkOrderNextPersonData={this.props.get_WorkOrderNextPersonData}
                            update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData} setCurWorkOrderStatus={this.props.setCurWorkOrderStatus}
                          />
                        </div>
                        <div className="tab-pane" id="tab_5">
                        </div>
                        <div className="tab-pane" id="tab_6">
                          <OperationFlowLog
                            orderDetailData={this.props.orderDetailData}
                          />
                        </div>
                        <div className="tab-pane" id="tab_7">
                          <OperationSatisfy
                            permissions={this.props.permissions} orderDetailData={this.props.orderDetailData}
                          />
                        </div>
                    </div>
                  </fieldset>
  	            </div>
              </div>
            );
          }else if(workstatus == "wc" || workstatus == "gb"){
            //不能编辑 延期申请  ;不显示 延期审批
            return(
              <div id='createOperationForm' className='overviewDesViewDiv'>
                <OperationPersonnelModal
                  flowPersonnelListData={this.props.flowPersonnelListData}
                  setCurrentNextPerson={this.props.setCurrentNextPerson}
                />
                <OperationButtons
                  orderDetailData={this.props.orderDetailData} workFlowTypes={this.props.workFlowTypes} permissions={this.props.permissions}
                  curWorkOrderId={this.props.curWorkOrderId} faultTypeId={this.props.faultTypeId} faultSubTypeId={this.props.faultSubTypeId}
                  flowLevel={this.props.flowLevel} serviceId={this.props.serviceId} currentNextPerson={this.props.currentNextPerson}
                  flowActionListData={this.props.flowActionListData} curWorkOrderStatus={this.props.curWorkOrderStatus} steps={this.props.steps}
                  curDelayId={this.props.curDelayId} workFlowLogData={this.props.workFlowLogData} save_satisfyScore={this.props.save_satisfyScore}
                  onSetCurThreeNode={this.props.onSetCurThreeNode} onSetPreThreeNode={this.props.onSetPreThreeNode} save_updateOrder={this.props.save_updateOrder}
                  add_WorkOrderProcessLogData={this.props.add_WorkOrderProcessLogData} update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData}
                  add_WorkFlowLogData={this.props.add_WorkFlowLogData} set_WorkFlowSendEmail={this.props.set_WorkFlowSendEmail} save_createDelay={this.props.save_createDelay}
                  save_updateDelay={this.props.save_updateDelay}
                  setCurName={this.props.setCurName}
                />
                <div className='operationCreateTableDiv col-md-12'>
                  <ul className="nav nav-tabs">
                    <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick} id="operationDetailTab">工单详情</a></li>
                    <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick} id="operationHandleTab">处理表单</a></li>
                    <li><a href="#tab_3" data-toggle="tab" onClick={this.handleTabClick} id="operationDelayTab">延期申请</a></li>
                    <li><a href="#tab_5" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowPicTab">流程图</a></li>
                    <li><a href="#tab_6" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowLogTab">流程日志</a></li>
                    <li><a href="#tab_7" data-toggle="tab" onClick={this.handleTabClick} id="operationCallBackTab">满意度调查</a></li>
                  </ul>
                  <fieldset>
                    <div className="contentDiv tab-content marginleft_none">
                        <div className="tab-pane active" id="tab_1">
                          <OperationDetail mark={true}
                            permissions={this.props.permissions} curWorkOrderId={this.props.curWorkOrderId} serviceData={this.props.serviceData}
                            faultTypes={this.props.faultTypes} faultSubTypes={this.props.faultSubTypes} serviceName={this.props.serviceName}
                            orderDetailData={this.props.orderDetailData} assets={this.props.assets}
                            get_serviceName={this.props.get_serviceName} get_flowPicData={this.props.get_flowPicData} get_faultSubType={this.props.get_faultSubType}
                            setFaultTypeId={this.props.setFaultTypeId} setServiceName={this.props.setServiceName} setFlowLevel={this.props.setFlowLevel}
                            setHandleAssetsId={this.props.setHandleAssetsId} getWorkOrderToMonitorData={this.props.getWorkOrderToMonitorData}
                            getAssets={this.props.getAssets}
                          />
                        </div>
                        <div className="tab-pane" id="tab_2">
                          <OperationHandle
                            orderDetailData={this.props.orderDetailData} currentNextPerson={this.props.currentNextPerson} workFlowLogData={this.props.workFlowLogData}
                            workOrderProcessLogData={this.props.workOrderProcessLogData} flowActionListData={this.props.flowActionListData}
                            workFlowDetailsData={this.props.workFlowDetailsData} curWorkOrderStatus={this.props.curWorkOrderStatus} curWorkOrderId={this.props.curWorkOrderId}
                            flowPersonnelListData={this.props.flowPersonnelListData}
                            setCurrentNextPerson={this.props.setCurrentNextPerson} get_WorkOrderNextPersonData={this.props.get_WorkOrderNextPersonData}
                            update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData} setCurWorkOrderStatus={this.props.setCurWorkOrderStatus}
                          />
                        </div>
                        <div className="tab-pane" id="tab_3">
                          <OperationDelay mark={true}
                            permissions={this.props.permissions} delayIndex={this.props.delayIndex} orderDetailData={this.props.orderDetailData}
                            get_delaySerialNum={this.props.get_delaySerialNum}
                          />
                        </div>
                        <div className="tab-pane" id="tab_4">
                          <OperationApprove mark={true}
                            permissions={this.props.permissions} orderDetailData={this.props.orderDetailData}
                            setCurDelayId={this.props.setCurDelayId}
                          />
                        </div>
                        <div className="tab-pane" id="tab_5">
                        </div>
                        <div className="tab-pane" id="tab_6">
                          <OperationFlowLog
                            orderDetailData={this.props.orderDetailData}
                          />
                        </div>
                        <div className="tab-pane" id="tab_7">
                          <OperationSatisfy
                            permissions={this.props.permissions} orderDetailData={this.props.orderDetailData}
                          />
                        </div>
                    </div>
                  </fieldset>
  	            </div>
              </div>
            );
          }else if(workstatus == "fp"){
            return(
              <div id='createOperationForm' className='overviewDesViewDiv'>
                <OperationPersonnelModal
                  flowPersonnelListData={this.props.flowPersonnelListData}
                  setCurrentNextPerson={this.props.setCurrentNextPerson}
                />
                <OperationButtons
                  orderDetailData={this.props.orderDetailData} workFlowTypes={this.props.workFlowTypes} permissions={this.props.permissions}
                  curWorkOrderId={this.props.curWorkOrderId} faultTypeId={this.props.faultTypeId} faultSubTypeId={this.props.faultSubTypeId}
                  flowLevel={this.props.flowLevel} serviceId={this.props.serviceId} currentNextPerson={this.props.currentNextPerson}
                  flowActionListData={this.props.flowActionListData} curWorkOrderStatus={this.props.curWorkOrderStatus} steps={this.props.steps}
                  curDelayId={this.props.curDelayId} workFlowLogData={this.props.workFlowLogData} save_satisfyScore={this.props.save_satisfyScore}
                  onSetCurThreeNode={this.props.onSetCurThreeNode} onSetPreThreeNode={this.props.onSetPreThreeNode} save_updateOrder={this.props.save_updateOrder}
                  add_WorkOrderProcessLogData={this.props.add_WorkOrderProcessLogData} update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData}
                  add_WorkFlowLogData={this.props.add_WorkFlowLogData} set_WorkFlowSendEmail={this.props.set_WorkFlowSendEmail} save_createDelay={this.props.save_createDelay}
                  save_updateDelay={this.props.save_updateDelay}
                  setCurName={this.props.setCurName}
                />
                <div className='operationCreateTableDiv col-md-12'>
                  <ul className="nav nav-tabs">
                    <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick} id="operationDetailTab">工单详情</a></li>
                    <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick} id="operationHandleTab">处理表单</a></li>
                    <li><a href="#tab_3" data-toggle="tab" onClick={this.handleTabClick} id="operationDelayTab">延期申请</a></li>
                    <li><a href="#tab_5" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowPicTab">流程图</a></li>
                    <li><a href="#tab_6" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowLogTab">流程日志</a></li>
                    <li><a href="#tab_7" data-toggle="tab" onClick={this.handleTabClick} id="operationCallBackTab">满意度调查</a></li>
                  </ul>
                  <fieldset>
                    <div className="contentDiv tab-content marginleft_none">
                        <div className="tab-pane active" id="tab_1">
                          <OperationDetail mark={true}
                            permissions={this.props.permissions} curWorkOrderId={this.props.curWorkOrderId} serviceData={this.props.serviceData}
                            faultTypes={this.props.faultTypes} faultSubTypes={this.props.faultSubTypes} serviceName={this.props.serviceName}
                            orderDetailData={this.props.orderDetailData} assets={this.props.assets}
                            get_serviceName={this.props.get_serviceName} get_flowPicData={this.props.get_flowPicData} get_faultSubType={this.props.get_faultSubType}
                            setFaultTypeId={this.props.setFaultTypeId} setServiceName={this.props.setServiceName} setFlowLevel={this.props.setFlowLevel}
                            setHandleAssetsId={this.props.setHandleAssetsId} getWorkOrderToMonitorData={this.props.getWorkOrderToMonitorData}
                            getAssets={this.props.getAssets}
                          />
                        </div>
                        <div className="tab-pane" id="tab_2">
                          <OperationHandle
                            orderDetailData={this.props.orderDetailData} currentNextPerson={this.props.currentNextPerson} workFlowLogData={this.props.workFlowLogData}
                            workOrderProcessLogData={this.props.workOrderProcessLogData} flowActionListData={this.props.flowActionListData}
                            workFlowDetailsData={this.props.workFlowDetailsData} curWorkOrderStatus={this.props.curWorkOrderStatus} curWorkOrderId={this.props.curWorkOrderId}
                            flowPersonnelListData={this.props.flowPersonnelListData}
                            setCurrentNextPerson={this.props.setCurrentNextPerson} get_WorkOrderNextPersonData={this.props.get_WorkOrderNextPersonData}
                            update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData} setCurWorkOrderStatus={this.props.setCurWorkOrderStatus}
                          />
                        </div>
                        <div className="tab-pane" id="tab_3">
                          <OperationDelay mark={true}
                            permissions={this.props.permissions} delayIndex={this.props.delayIndex} orderDetailData={this.props.orderDetailData}
                            get_delaySerialNum={this.props.get_delaySerialNum}
                          />
                        </div>
                        <div className="tab-pane" id="tab_5">
                        </div>
                        <div className="tab-pane" id="tab_6">
                          <OperationFlowLog
                            orderDetailData={this.props.orderDetailData}
                          />
                        </div>
                        <div className="tab-pane" id="tab_7">
                          <OperationSatisfy
                            permissions={this.props.permissions} orderDetailData={this.props.orderDetailData}
                          />
                        </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            );
          }else{
            // that.history.pushState(null,'operationManage/myWorkSpace');
            // setTimeout(function(){
            //   document.getElementById('publicMessageModelTitle').innerHTML = "提示";
            //   document.getElementById('publicMessageModalcontent').innerHTML = "工单数据出错";
            //   $('#publicMessageModal').modal('show');
            // },100);
            return (
              <div></div>
            );
          };
        }else{
          // that.history.pushState(null,'operationManage/myWorkSpace');
          // window.location.reload("true");
          return (
            <div></div>
          );
        };
    }
});

$(window).resize(function () {
  if($('#createOperationForm') != null) {
    var height = $(window).height() - 110 - 30 + 'px';
    $('#createOperationForm').css("height",height);
  }
});

module.exports = editOperationForm;
