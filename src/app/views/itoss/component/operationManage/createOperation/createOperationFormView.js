/**
* 工单管理-新建工单-工单详情
*/
require('bootstrap');
import React from 'react'
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

import OperationDetail from './createOperationDetail.js';
import OperationHandle from './createOperationHandle.js';
import OperationButtons from './createOperationButton.js';
// var OperationDelay = require('./createOperationDelayClaim.js');
// var OperationApprove = require('./createOperationDelayApprove.js');
// var OperationSatisfy = require('./createOperationSatisfy.js');
// var OperationFlowLog = require('./createOperationFlowLog.js');
// var OperationFlowPic = require('./createOperationFlowPic.js');
import OperationPersonnelModal from '../editOperation/editoperationPersonnelModal.js';
import CreateOperationPersonnelModal from './createOperationPersonnelModal.js';

var createOperationForm = React.createClass({
    componentDidMount: function() {
      if($('#createOperationForm') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
  			$('#createOperationForm').css("height",height);
  		}
    },
    handleTabClick:function(e){
      var id = $(e.target).attr("id");
      // console.log(id)
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
        ReactDOM.render(<OperationFlowPic/>,document.getElementById('OperationFlowPic'));
      }else if(id=="operationFlowLogTab"){
        $(".operationButtonGroup6").show();
      }else if(id=="operationCallBackTab"){
        $(".operationButtonGroup7").show();
      };
    },
    render:function(){
        return(
            <div id='createOperationForm' className='overviewDesViewDiv'>
              <CreateOperationPersonnelModal flowPersonnelListData={this.props.flowPersonnelListData} flowActionListData={this.props.flowActionListData}
                  curWorkOrderId={this.props.curWorkOrderId} curWorkOrderData={this.props.curWorkOrderData}
                  update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData}
                  add_CreateWorkFlowLogData={this.props.add_CreateWorkFlowLogData}
                  set_WorkFlowSendEmail={this.props.set_WorkFlowSendEmail} />
              <OperationPersonnelModal flowPersonnelListData={this.props.flowPersonnelListData} setCurrentNextPerson={this.props.setCurrentNextPerson} />
              <OperationButtons curWorkOrderId={this.props.curWorkOrderId} curWorkFlowId={this.props.curWorkFlowId} workFlowTypes={this.props.workFlowTypes} faultTypeId={this.props.faultTypeId} faultSubTypeId={this.props.faultSubTypeId}
                  flowLevel={this.props.flowLevel} serviceId={this.props.serviceId} createOrderInfo={this.props.createOrderInfo} permissions={this.props.permissions} flowActionListData={this.props.flowActionListData}
                  currentNextPerson={this.props.currentNextPerson} setCurrentNextPerson={this.props.setCurrentNextPerson}
                  save_createOrder={this.props.save_createOrder} save_createOrder2={this.props.save_createOrder2} get_WorkOrderNextPersonData={this.props.get_WorkOrderNextPersonData}
                  update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData} add_WorkFlowLogData={this.props.add_WorkFlowLogData}
                  set_WorkFlowSendEmail={this.props.set_WorkFlowSendEmail} set_linshiData={this.props.set_linshiData} set_linshiNode={this.props.set_linshiNode}
                  add_WorkOrderProcessLogData={this.props.add_WorkOrderProcessLogData}
                  onSetCurThreeNode={this.props.onSetCurThreeNode}
                  onSetPreThreeNode={this.props.onSetCurThreeNode}
                  curThreeNode={this.props.curThreeNode}
                  setCanUpdate={this.props.setCanUpdate}
              />
              <div className='operationCreateTableDiv col-md-12'>
                <ul className="nav nav-tabs">
                  <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick} id="operationDetailTab">工单详情</a></li>
                  <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick} id="operationHandleTab">处理表单</a></li>
                </ul>
                <fieldset>
                  <div className="contentDiv tab-content marginleft_none">
                      <div className="tab-pane active" id="tab_1">
                        <OperationDetail serviceData={this.props.serviceData} createOrderInfo={this.props.createOrderInfo} faultTypes={this.props.faultTypes} faultSubTypes={this.props.faultSubTypes} serviceName={this.props.serviceName}
                            get_faultType={this.props.get_faultType} get_serviceName={this.props.get_serviceName} get_createOrderInfo={this.props.get_createOrderInfo}
                            get_faultSubType={this.props.get_faultSubType} setServiceId={this.props.setServiceId} setFlowLevel={this.props.setFlowLevel} setFaultSubTypeId={this.props.setFaultSubTypeId}
                            assets={this.props.assets}
                            setHandleAssetsId={this.props.setHandleAssetsId} getWorkOrderToMonitorData={this.props.getWorkOrderToMonitorData} getAssets={this.props.getAssets}
                            setCanUpdate={this.props.setCanUpdate}
                        />
                      </div>
                      <div className="tab-pane" id="tab_2">
                        <OperationHandle curWorkFlowId={this.props.curWorkFlowId} currentNextPerson={this.props.currentNextPerson}
                            setCurrentNextPerson={this.props.setCurrentNextPerson} init_detailData={this.props.init_detailData} get_WorkOrderNextPersonData={this.props.get_WorkOrderNextPersonData}
                            setCanUpdate={this.props.setCanUpdate}
                        />
                      </div>
                  </div>
                </fieldset>
	            </div>
            </div>
        );
    }
});

$(window).resize(function () {
  if($('#createOperationForm') != null) {
    var height = $(window).height() - 110 - 30 + 'px';
    $('#createOperationForm').css("height",height);
  }
});

module.exports = createOperationForm;
