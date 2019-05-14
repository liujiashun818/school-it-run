/**
 * Created by SHIN on 2015/12/11.
 * 工单管理-工作台
 */
import React from 'react'
var ReactDOM = require('react-dom');
require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

function isAddKb(value,row){
  var statu = row.STATUS;
  if(statu != "关闭"){
    return "无法转入";
  }else{
    if(value=="false"){
      return "<a class='workSpaceToKb' href='javascript:void(0)' title='加入知识库'>转入知识库</a>";
    }else{
      return "<a>已转入知识库</a>";
    };
  };
};

var _this;
window.workSpaceEvent = {
  'click .workSpaceToKb':function(e, value, row, index){
    //加入知识库调用
    var id = row.WORKORDER_ID;
    var flowid = row.WORKFLOW_ID;
    var filter = [{"key":"WORKORDER_ID","value":id}];
    // _this.getFlux().actions.YFTOperationFlowActions.set_curWorkFlowId(flowid);
    _this.props.setCurWorkFlowId(flowid);
    // _this.getFlux().actions.YFTOperationActions.get_orderDetails(filter);
    // _this.getFlux().actions.YFTOperationActions.get_allFaults();
    _this.props.get_orderDetails(filter);
    _this.props.get_allFaults();
    // window.location.href="#/operationManage/editOperation";
    //工单流程日志数据
    //var flowlogfilter = [{"key":"WORKORDER_ID","value":id},{"key":"WORKFLOW_ID","value":flowid}];
    // _this.getFlux().actions.YFTOperationFlowActions.get_WorkFlowLogData(id);
    _this.props.get_WorkFlowLogData(id);
    //工单处理信息
    // _this.getFlux().actions.YFTOperationFlowActions.get_WorkOrderProcessLogData(id);
    _this.props.get_WorkOrderProcessLogData(id);
    //清除 下级处理人 数据
    // _this.getFlux().actions.YFTOperationFlowActions.set_CurrentNextPerson('');
    _this.props.setCurrentNextPerson('');

    $("#toKbModal").modal("show");
    $("#toKbDesc2").val("");
    $("#toKbDesc4").val("");
  }
};

var data=[];

var myWorkSpaceTableBox = React.createClass({
  mixins: [History],
  getInitialState: function () {
      _this = this;
      return {
          isOk:1
      }
  },
  // componentDidUpdate: function(){
  //   data = this.state.itoss.monitors;
  //   $('#equipmentManageTable').bootstrapTable('load',data);
  // },
  shouldComponentUpdate:function(nextProps, nextState){
    if(nextProps.permissions !== this.props.permissions){
      this.setTablePermissions(nextProps);
    }
    return true;
  },
    setTablePermissions: function(nextProps) {
      var that = this;
      $('#myWorkSpaceTable').bootstrapTable({
          columns: [
            {
                width: '2%',
                halign: 'center',
                align: 'center',
                checkbox: true
            },{
                  title: '工单号',
                  field: 'WORKORDERNUM',
                  width: '10%',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                title: '流程类型',
                field: 'WORKFLOW_NAME',
                width: '8%',
                halign: 'left',
                align: 'left',
                sortable: true
              },{
                  title: '主题',
                  field: 'SUBJECT',
                  width: '24%',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                  title: '故障级别',
                  field: 'PRIORITY',
                  width: '6%',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                  title: '创建人',
                  field: 'CREATEBY',
                  width: '6%',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                  title: '创建时间',
                  field: 'CREATEDATA_TIME',
                  width: '12%',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                  title: '服务提供商',
                  field: 'SP',
                  width: '6%',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                  title: '处理人',
                  field: 'CURRENT_HANDLE',
                  width: '6%',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                  title: '状态',
                  field: 'STATUS',
                  width: '6%',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                  title: '故障类型',
                  field: 'FAULT_TYPE',
                  width: '6%',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                  title: '工单转知识库',
                  width:"8%",
                  field: 'ISADD_KB',
                  halign: 'left',
                  align: 'left',
                  events: workSpaceEvent,
                  formatter: isAddKb,
                  sortable: true
              }
          ],
          data: data,
          onClickRow: this.onRowClick,
          exportDataType:"all"
        });
        var isCanDelete = false;
        var permissions = nextProps.permissions;
        for(var i=0;i<permissions.length;i++){
          var resourceType = permissions[i].resourceType;
          if(resourceType == "/operationmanage/workordermanage/workspace/delete"){
            isCanDelete = true;
            break;
          };
        } ;
        var refreshBtnObj = document.createElement('button');
        refreshBtnObj.setAttribute('class', 'btn btn-default');
        refreshBtnObj.setAttribute('type', 'button');
        refreshBtnObj.setAttribute('name', 'add');
        refreshBtnObj.setAttribute('title', '刷新');
        refreshBtnObj.setAttribute('id','refreshTableButton');
        refreshBtnObj.innerHTML = '<i class="fa fa-refresh"></i>';
        var deleteBtnObj = document.createElement('button');
        deleteBtnObj.setAttribute('class', 'btn btn-default');
        deleteBtnObj.setAttribute('type', 'button');
        deleteBtnObj.setAttribute('name', 'add');
        deleteBtnObj.setAttribute('title', '删除');
        deleteBtnObj.setAttribute('data-toggle', 'modal');
        deleteBtnObj.setAttribute('data-target', '#deleteWorkorderModal');
        if(!isCanDelete){
          deleteBtnObj.setAttribute('style', 'display:none;');
        };
        deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';
        var btnGroup = document.getElementsByClassName('workSpaceTable')[0].childNodes[2].childNodes[0].childNodes[1];
        btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
        btnGroup.insertBefore(refreshBtnObj, btnGroup.childNodes[0]);

        $('#deleteWorkorderModal').on('show.bs.modal', function (e) {
          var $table = $("#myWorkSpaceTable");
          var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
            // console.log(row);
            return row.WORKORDER_ID;
          });
          if(ids.length>0){
            $("#deleteWorkorderModal").find(".modal-body").text("你确定要删除选择的工单吗？");
            that.setState({deleteIds:ids});
          }else{
            $("#deleteWorkorderModal").find(".modal-body").text("请选择要删除的工单");
            that.setState({deleteIds:[]});
          };
        });
        $("#refreshTableButton").click(function(){
          that.refreshTable();
        });
    },
    refreshTable:function(){
      var statu = this.props.curStatu;
      var filter = [{"key":"PARAM","value":statu}];
      //this.getFlux().actions.YFTOperationActions.get_workOrderList(filter);
      this.props.get_workOrderList(filter);
      $('#myWorkSpaceFaultLevelDropDown').find(".rw-input").text("");
      $('#myWorkSpaceFaultTypeDropDown').find(".rw-input").text("");
      // $('#myWorkSpaceTable').bootstrapTable('refresh');
    },
    onRowClick: function(e,row){
      var tdIndex = row.context.cellIndex;
      if(tdIndex == 11){
        return false;
      };
      var that = this;
      var isCanEdit = false;
      var permissions = this.props.permissions;
      for(var i=0;i<permissions.length;i++){
        var resourceType = permissions[i].resourceType;
        if(resourceType == "/operationmanage/workordermanage/workspacedetails"){
          isCanEdit = true;
          break;
        };
      } ;
      if(isCanEdit){
        var id = e.WORKORDER_ID;
        var flowid = e.WORKFLOW_ID;
        var filter = [{"key":"WORKORDER_ID","value":id}];
        that.props.setCurWorkFlowId(flowid);//工单流程ID
        that.props.get_orderDetails(filter);
        //获取当前工单流程设计主表相关的模板数据和模板对象存储的数据
        var param ={
          workFlowId:flowid,
          workWorderId:id
        };
        that.props.get_workOrderTemplatesFromWorkFlowId(param);
        //获取指定流程ID相关的流程设计步骤数据
        that.props.get_workFlowDetailsFromWorkFlowId(flowid);

        //工单流程日志数据
        that.props.get_WorkFlowLogData(id);
        // //工单处理信息
        // that.props.get_WorkOrderProcessLogData(id);
        //清除 下级处理人 数据
        that.props.setCurrentNextPerson('');
        that.history.pushState(null,'operationManage/editOperation');
      };
    },
    onSaveOrderToKb:function(){
      //将数据保存到资识库
      //console.log(this.state.itoss);
      // console.log(this.state.flow);
      var orderData = this.props.orderDetailData;
      var faultLarge = orderData.FAULT_LARGE;
      var faults = this.props.faultTypes;
      var faultSmall = orderData.FAULT_SMALL;
      var allFaults = this.props.allFaults;

      var orderId = this.props.curWorkOrderId;
      var bigId = "";
      for(var i=0;i<faults.length;i++){
        var fname = faults[i].name;
        if(faultLarge == fname){
          bigId = faults[i].id;
          break;
        };
      };
      var smallId = "";
      for(var i=0;i<allFaults.length;i++){
        var fname = allFaults[i].FaultName;
        if(faultSmall == fname){
          smallId = allFaults[i].RecId;
          break;
        };
      }
      var theme = $("#toKbTheme").val();
      if(theme == null || theme == ""){
        alert("请填写主题");
        return false;
      };
      var gzxx = $("#toKbDesc").val();
      if(gzxx == null || gzxx == ""){
        alert("请填写故障现象");
        return false;
      };
      var gzfx = $("#toKbDesc2").val();
      if(gzfx == null || gzfx == ""){
        alert("请填写故障分析");
        return false;
      };
      var jjbz = $("#toKbDesc3").val();
      if(jjbz == null || jjbz == ""){
        alert("请填写解决步骤");
        return false;
      };
      var fxzj = $("#toKbDesc4").val();
      if(fxzj == null || fxzj == ""){
        alert("请填写分析总结");
        return false;
      };
      var data = {
        FaultID:bigId,
        FaultSubID:smallId,
        Status:"已提交",
        theme: theme,
        FaultPhenomenon: gzxx,
        FaultAnalysis:gzfx,
        SolvingSteps:jjbz,
        AnalysisSummary:fxzj,
        ProjectID:"",
        ClickNumber:"0",
        WorkOrderId:orderId
      };
      // console.log(data);
      this.props.addRepository(data);
      $("#toKbModal").modal("hide");
    },
    onDeleteOrder:function(){
      var ids = this.state.deleteIds;
      var that = this;
      if(ids.length>0){
        that.props.delete_workOrder(ids);
        that.setState({deleteIds:[]});
      };
    },
    componentDidUpdate:function(){
      var orderDetailData = this.props.orderDetailData;
      var processData = this.props.WorkOrderProcessLogData;
      if(orderDetailData!=null && orderDetailData!=""){
        var faultLarge = orderDetailData.FAULT_LARGE;
        var faultSmall = orderDetailData.FAULT_SMALL;
        var theme = orderDetailData.SUBJECT;
        var gzxx = orderDetailData.DESC;
        var jjbz = "";
        if(processData !=null && processData !=""){
          for(var i=0;i<processData.length;i++){
            var content = (i+1)+"、"+processData[i].Content+"\n";
            jjbz = jjbz + content;
          };
        };
        $("#toKbFaultType").find(".rw-input").text(faultLarge);
        $("#toKbFaultSubType").find(".rw-input").text(faultSmall);
        $("#toKbTheme").val(theme);
        $("#toKbDesc").val(gzxx);
        $("#toKbDesc3").val(jjbz);
      };
    },
    render: function() {
        return (
            <div className='hardwareAssetTableBox equipmentManageTable workSpaceTable repositoryStyle'>
              <div className="modal fade" id="deleteWorkorderModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">删除工单</h4>
                    </div>
                    <div className="modal-body">
                      你确定要删除吗？
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onDeleteOrder}>确定</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal fade" id="toKbModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document" style={{"width":"65%"}}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">转入知识库</h4>
                    </div>
                    <div className="modal-body">
                      <div className="yunweiTable slaTableStyle">
                        <div>&nbsp;</div>

                        <table className="sla-table-basic">
                          <tbody>
                            <tr>
                              <td rowSpan="2" className="slaTableFontBold slaTableFontCenter" style={{"width":"10%"}}>知识信息</td>
                              <td className="slaTitleStyle" >&nbsp;&nbsp;主题<span className="slaPan"> *</span></td>
                              <td colSpan="3" className="slaTableFontBold table-basic-td-input">
                                <input type="text" id="toKbTheme"/>
                              </td>
                            </tr>
                            <tr>
                              <td className="slaTitleStyle" style={{"width":"10%"}}>&nbsp;&nbsp;故障类型<span className="slaPan"> *</span></td>
                              <td colSpan="1" className="slaTableFontBold table-basic-td-input" style={{"width":"20%"}}>
                                <ReactWidgets.DropdownList id="toKbFaultType" disabled/>
                              </td>
                              <td className="slaTitleStyle" style={{"width":"10%"}}>&nbsp;&nbsp;故障子类型<span className="slaPan"> *</span></td>
                              <td className="slaTableFontBold table-basic-td-input" style={{"width":"20%"}}>
                                <ReactWidgets.DropdownList  id="toKbFaultSubType" disabled/>
                              </td>
                            </tr>
                            <tr>
                              <td rowSpan="12" className="slaTableFontBold slaTableFontCenter">知识详情</td>
                              <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;故障现象<span className="slaPan"> *</span></td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="slaTitleStyle table-basic-td-input">
                                <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" id="toKbDesc"></textarea>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;故障分析<span className="slaPan"> *</span></td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="slaTitleStyle table-basic-td-input">
                                <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" id="toKbDesc2"></textarea>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;解决步骤<span className="slaPan"> *</span></td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="slaTitleStyle table-basic-td-input">
                                <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" id="toKbDesc3"></textarea>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;分析总结<span className="slaPan"> *</span></td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="slaTitleStyle table-basic-td-input">
                                <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" id="toKbDesc4"></textarea>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                      <button type="button" className="btn btn-primary" onClick={this.onSaveOrderToKb}>保存</button>
                    </div>
                  </div>
                </div>
              </div>
              <table id='myWorkSpaceTable'
                 data-toggle='table'
                 data-search='true'
                 data-classes='table table-no-bordered table-hover'
                 data-toolbar='#toolbar'
                 data-show-refresh='false'
                 data-show-toggle='false'
                 data-show-columns='false'
                 data-show-export='true'
                 data-pagination='true'>
              </table>
            </div>
        );
    }
});

module.exports = myWorkSpaceTableBox;
