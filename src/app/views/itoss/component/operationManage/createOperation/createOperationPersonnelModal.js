/**
* xuexue.yin  2016/01/20.
* 人员流转:新建工单 保存并分配时打开这个页
*/
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var History = require('react-router').History;

var DateChange = require('../../../../../utils/dateChange.js');

var CreateOperationPersonnelModal = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //       itoss:flux.store("YFTOperationStore").getState(),
    //       flow:flux.store("YFTOperationFlowStore").getState()
    //     }
    // },
    componentDidMount: function(){
      const { flowPersonnelListData } = this.props;
      var _this = this;
      // setTimeout(function(){
        $('#creatOperationPersonnelTable').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    radio: true
                }, {
                    title: '姓名',
                    field: 'name',
                    sortable: true
                }, {
                    title: '用户名',
                    field: 'loginId',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '角色名称',
                    field: 'roleName',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '邮箱',
                    field: 'email',
                    // halign: 'center',
                    // align: 'center',
                    sortable: true
                }, {
                    title: '用户ID',
                    field: 'recId',
                    // halign: 'center',
                    // align: 'center',
                    sortable: false,
                    visible:false
                }
            ],
            data: flowPersonnelListData,
            clickToSelect: true
        });
      // },500);
    },
    shouldComponentUpdate:function(nextProps, nextState){
      if(nextProps.flowPersonnelListData !== this.props.flowPersonnelListData){
        this.setFlowPersonnelTableData(nextProps);
      }
      return true;
    },
    setFlowPersonnelTableData:function(nextProps){
      $('#creatOperationPersonnelTable').bootstrapTable('refreshOptions', {data: nextProps.flowPersonnelListData});
    },
    // componentDidUpdate: function() {
    //   const { flowPersonnelListData } = this.props;
    //   var that = this;
    //   // setTimeout(function(){
    //     $('#creatOperationPersonnelTable').bootstrapTable('refreshOptions', {data: flowPersonnelListData});
    //   // },300);
    // },
    _handleOnClickOK: function(key) {
        const { flowActionListData, curWorkOrderId, curWorkOrderData, update_WorkOrderCommonStatusData, add_CreateWorkFlowLogData, set_WorkFlowSendEmail } = this.props;
        var selections = $('#creatOperationPersonnelTable').bootstrapTable('getSelections');
        if(selections.length > 0){
          //流程流转中每一个步骤状态列表数据
          var flowStatus="";
          var flowAction="";
          if(flowActionListData.length > 0){
            for(var i=0;i<flowActionListData.length;i++){
              if(flowActionListData[i].FROM_ID == localStorage.getItem("CURRENT_ROLENAME") && flowActionListData[i].TO_ID == selections[0].roleName){
                flowStatus=flowActionListData[i].STATUS;
                flowAction=flowActionListData[i].FLOW_ACTION;
                break;
              }
            }
          };
          if(flowStatus == ""){
            //alert("没有取到向下流转工单状态，不能向下流转工单。");
            setTimeout(function(){
              document.getElementById('publicMessageModelTitle').innerHTML = "系统提示";
              document.getElementById('publicMessageModalcontent').innerHTML = "没有取到向下流转工单状态，不能向下流转工单。"
              $('#publicMessageModal').modal('show');
            },100);
            return;
          };
          var iorderOver = 0;
          //工单角决时间
          if($("#createOperationOrderOver").val() != "" && $("#createOperationOrderOver").val() != null){
             iorderOver = parseInt($("#createOperationOrderOver").val());
          };
          var dispatchTime = new Date(); //派工时间
          var yjwcTime = DateChange.addHoursRDate(new Date(),iorderOver);   //预计完成时间

          //修改工单状态 WorkOrderCommon 的字段 Status：申请延期批复	sqyqpf;待验证	wc;关闭	gb;申请延期拒绝	sqyqjj;草稿	cg;待处理	cl;申请延期	sqyq;
          if(flowStatus == "cl"){
            //流程从 运维人员 -> 视频监控管理人员 流程状态变为 待验证; 其他情况为  待处理状态
            //下一步为工单状态为：cl 时，需要填写 AppointmentTime 预计完成时间；ResponseTime ：派工时间。
            //DispatchNumber 用于标志是否填了，派工时间。
            var statusData = {
              RecId:curWorkOrderId,
              Status:flowStatus,
              CurrentHandle:selections[0].name,
              ResponseTime:dispatchTime,
              AppointmentTime:yjwcTime,
              DispatchNumber:1
            };
            // this.getFlux().actions.YFTOperationFlowActions.update_WorkOrderCommonStatusData(statusData);
            update_WorkOrderCommonStatusData(statusData);
          }else{
            //流程从 运维人员 -> 视频监控管理人员 流程状态变为 待验证; 其他情况为  待处理状态
            var statusData = {
              RecId:curWorkOrderId,
              Status:flowStatus,
              CurrentHandle:selections[0].name
            };
            // this.getFlux().actions.YFTOperationFlowActions.update_WorkOrderCommonStatusData(statusData);
            update_WorkOrderCommonStatusData(statusData);
          };
          //工单处理信息 WorkOrderProcessLog 不需要增加
          var HandleProcess = "";
          if($("#createOperationHandleProcess").val()){
            HandleProcess = $("#createOperationHandleProcess").val();
          };
          var flowData = {
              FlowAction:flowAction,
              WorkOrderId: curWorkOrderId,//对应工单ID
              LinkDesc:"",//环境描述
              FromId: localStorage.getItem("CURRENT_ROLENAME"),//当前处理人角色名
              ToId: selections[0].roleName,//下级处理人角色名
              Content:HandleProcess,//处理意见
              //ProcessResult:$("input[name='wo_revisitResult']:checked").val(),//未解决原因
              //DispatchTime:new Date(Date.parse($("#createOperationHandleNextDisTime").find('input').val().replace(/-/,"/"))), //派工时间
              DispatchTime:dispatchTime, //派工时间
              ArrivalTime:new Date(),//响应时间，只有在维护人员才有用，所以在其他人员那里，只填当前时间作备用，在界面上不填值。
              ResolutionState:"未解决",//解决状态
              FromUser:localStorage.getItem("USERNAME"),//当前处理人
              ToUser:selections[0].name,//下级处理人
              Step:1,//流程步骤 this.state.flow.Steps
              OpIdentity:0
          };
          //增加 工单日志
          //this.getFlux().actions.YFTOperationFlowActions.add_CreateWorkFlowLogData(flowData);
          add_CreateWorkFlowLogData(flowData);
          //向当前工单下一个流转人员发送邮件
          if(key == 2){
            //filters 格试 [{key:"EMAIL",value:""},{key:"SUBJECT",value:""},{key:"CONTENT",value:""}];
            var contenttemp = "",ordertitle="";
            // var curWorkOrderData = this.state.itoss.curWorkOrderData;
            if(curWorkOrderData){
              contenttemp = curWorkOrderData.WorkOrderDesc;
              ordertitle = curWorkOrderData.Subject;
            };
            if($("#createOperationHandleProcess").val()){
              contenttemp = contenttemp + "\n"+"上级处理意见："+HandleProcess;
            };
            var emaildata = [{key:"EMAIL",value:selections[0].email},
                          {key:"SUBJECT",value:ordertitle},
                          {key:"CONTENT",value:contenttemp}];
            // this.getFlux().actions.YFTOperationFlowActions.set_WorkFlowSendEmail(emaildata);
            set_WorkFlowSendEmail(emaildata);
          };
        }else{
          //alert("由于没有选择流转人员，工单不能流转。");
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "系统提示";
            document.getElementById('publicMessageModalcontent').innerHTML = "由于没有选择流转人员，工单不能流转。"
            $('#publicMessageModal').modal('show');
          },100);
          //this.history.pushState(null,'operationManage/myWorkSpace');
        };
        $("#deviceInfoModal").modal("hide");
        $("#alarmEventDetailModal").modal("hide");
    },
    render : function(){
        return (
            <div className="modal fade" id="createOperationPersonnelTableModal" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">选择需要流转人员</h4>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <table id='creatOperationPersonnelTable'
                                       data-toggle='table'
                                       data-search='true'
                                       data-classes='table table-no-bordered table-hover'
                                       data-show-refresh='true'
                                       data-show-toggle='true'
                                       data-show-columns='true'
                                       data-pagination='true'
                                       data-page-size='10'
                                       data-resizable='true'>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK.bind(this, 1)}>确定</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK.bind(this, 2)}>确定并发邮件</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickCancel}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

CreateOperationPersonnelModal.propTypes = {
	flowPersonnelListData: PropTypes.array.isRequired,
	flowActionListData: PropTypes.array.isRequired,
	curWorkOrderId: PropTypes.string.isRequired,
	curWorkOrderData: PropTypes.object,
	update_WorkOrderCommonStatusData: PropTypes.func.isRequired,
	add_CreateWorkFlowLogData: PropTypes.func.isRequired,
	set_WorkFlowSendEmail: PropTypes.func.isRequired
}

module.exports = CreateOperationPersonnelModal;
