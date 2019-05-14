require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

import OperationDetail from './editOperationDetail.js';
import OperationHandle from './editOperationHandle.js';
import OperationButtons from './editOperationButton.js';
import OperationFlowLog from './editOperationFlowLog.js';
import OperationFlowPic from './editOperationFlowPic.js';
import OperationPersonnelModal from './editoperationPersonnelModal.js';

var getworkOrderNextData = 0;
var editOperationForm = React.createClass({
    mixins: [History],
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
      //控制显示按钮
      var id = $(e.target).attr("id");
      var that = this;
      $(".oBGroup").hide();
      if(id=="operationDetailTab"){
        //工单详情
        $(".operationButtonGroup1").show();
      }else if(id=="operationHandleTab"){
        //处理表单
        $(".operationButtonGroup2").show();
      }else if(id=="operationFlowPicTab"){
        //流程图
        $(".operationButtonGroup3").show();
        ReactDOM.render(<OperationFlowPic  flowPicData={that.props.flowPicData}/>,document.getElementById('tab_3'));
      }else if(id=="operationFlowLogTab"){
        //流程日志
        $(".operationButtonGroup4").show();
      }
    },
    render:function(){
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
            workOrderTemplatesMainForm={this.props.workOrderTemplatesMainForm}
            workOrderTemplatesSheetForm={this.props.workOrderTemplatesSheetForm}
            busObDefFieldDetail={this.props.busObDefFieldDetail}
            busObDefFieldHandle={this.props.busObDefFieldHandle}
            workOrderTemplatesMainData={this.props.workOrderTemplatesMainData}
            save_updateDetailTemplate={this.props.save_updateDetailTemplate}
            add_WorkFlowLogDataAndHandleTemplate={this.props.add_WorkFlowLogDataAndHandleTemplate}
          />
          <div className='operationCreateTableDiv col-md-12'>
            <ul className="nav nav-tabs">
              <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick} id="operationDetailTab">工单详情</a></li>
              <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick} id="operationHandleTab">处理表单</a></li>
              <li><a href="#tab_3" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowPicTab">流程图</a></li>
              <li><a href="#tab_4" data-toggle="tab" onClick={this.handleTabClick} id="operationFlowLogTab">流程日志</a></li>
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
                      workOrderTemplatesMainForm={this.props.workOrderTemplatesMainForm}
                      getBusObDefFieldsDetail={this.props.getBusObDefFieldsDetail}
                      workOrderTemplatesMainData={this.props.workOrderTemplatesMainData}
                      busObDefFieldDetail={this.props.busObDefFieldDetail}
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
                      workOrderTemplatesSheetForm={this.props.workOrderTemplatesSheetForm}
                      getBusObDefFieldsHandle={this.props.getBusObDefFieldsHandle}
                      workOrderTemplatesSheetData={this.props.workOrderTemplatesSheetData}
                      workFlowDetailCurrent={this.props.workFlowDetailCurrent}
                      get_workOrderTemplatesSheetFromId={this.props.get_workOrderTemplatesSheetFromId}
                      busObDefFieldHandle={this.props.busObDefFieldHandle}
                    />
                  </div>
                  <div className="tab-pane" id="tab_3">
                  </div>
                  <div className="tab-pane" id="tab_4">
                    <OperationFlowLog  orderDetailData={this.props.orderDetailData}/>
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

module.exports = editOperationForm;
