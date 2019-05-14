/**
 * Created by SHIN on 2016/1/29.
 * 告警事件触发工单
 */
var React = require('react');
require('bootstrap');
var ReactWidgets = require('react-widgets');
var History = require('react-router').History;

import AlarmEventWorkOrderModalTable from './alarmEventWorkOrderModalTable';
var PersonModel = require('../../operationManage/createOperation/createOperationPersonnelModal.js');

var AlarmEventWorkOrderModal = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        var width = $(window).width();
        width = width - 100;
        $(".alarmEventWorkOrderModalDialog").css('width',width);
    },
    _handleOnClickSave: function() {
      var title = $("#alarmEventWorkOrderTitle").val();
      if(title == null || title == ""){
        title = "无主题";
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = '请填写工单主题';
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var curWorkFlowId = this.props.curWorkFlowId;
      if(curWorkFlowId == null || curWorkFlowId == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = '请选择流程类型';
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var explain = $("#alarmEventWorkOrderDescription").val();
      if(explain == null || explain == ""){
        explain = "无描述";
      };
      var faultLarge = this.props.faultTypeId;
      if(faultLarge==null||faultLarge==""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = '请选择故障大类';
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var faultSmall = this.props.faultSubTypeId;
      if(faultSmall==null||faultSmall==""){
        var touchFaultSubId = this.props.touchFaultSubId;
        if(touchFaultSubId == null || touchFaultSubId == ""){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = '请选择故障细类';
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        }else{
          faultSmall = touchFaultSubId;
        };
      };
      var faultLevel = this.props.flowLevel;
      if(faultLevel==null||faultLevel==""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = '请选择优先级';
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var serviceId = this.props.serviceId;
      var workOrderNumber = this.props.createOrderInfo.SERIALNUMBER;
      var data = {
        Subject:title,
        WorkOrderDesc:explain,
        FaultLarge:faultLarge,
        FaultSmall:faultSmall,
        FaultLevelId:faultLevel,
        Status:"cg",
        WorkOrderNumber:workOrderNumber,
        SerialNumber:workOrderNumber,
        CurrentHandle:localStorage.getItem("USERNAME"),
        SLAId:serviceId,
      };
      // console.log(data);
      this.props.saveCreateOrder(data);

      var dateObjec = {
        RecId:this.props.selectedAlarmEvent.recid,
        EventStatus: "3"
      };
      this.props.updateAlarmEventStatus(dateObjec);
      $("#alarmEventWorkOrderModal").modal("hide");
    },
    _handleOnClickSaveAndAllocation: function() {
      var title = $("#alarmEventWorkOrderTitle").val();
      if(title == null || title == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = '请填写工单主题';
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var curWorkFlowId = this.props.curWorkFlowId;
      if(curWorkFlowId == null || curWorkFlowId == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = '请选择流程类型';
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var explain = $("#alarmEventWorkOrderDescription").val();
      if(explain == null || explain == ""){
        explain = "无描述";
      };
      var faultLarge = this.props.faultTypeId;
      if(faultLarge==null||faultLarge==""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = '请选择故障大类';
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var faultSmall = this.props.faultSubTypeId;
      if(faultSmall==null||faultSmall==""){
        var touchFaultSubId = this.props.touchFaultSubId;
        if(touchFaultSubId == null || touchFaultSubId == ""){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = '请选择故障细类';
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        }else{
          faultSmall = touchFaultSubId;
        };
      };
      var faultLevel = this.props.flowLevel;
      if(faultLevel==null||faultLevel==""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = '请选择优先级';
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      //清除当前流转人员数据
      this.props.setCurrentNextPerson("");
      var filter = [{key:"FROM_ID",value:localStorage.getItem("CURRENT_ROLENAME")},
                    {key:"WORKFLOW_ID",value:this.props.curWorkFlowId},
                    {key:"GROUP_ID",value:localStorage.getItem("GROUP_ID")}];
      this.props.get_WorkOrderNextPersonData(filter);
      var serviceId = this.props.serviceId;
      var workOrderNumber = this.props.createOrderInfo.SERIALNUMBER;
      var data = {
        Subject:title,
        WorkOrderDesc:explain,
        FaultLarge:faultLarge,
        FaultSmall:faultSmall,
        FaultLevelId:faultLevel,
        Status:"cg",
        WorkOrderNumber:workOrderNumber,
        SerialNumber:workOrderNumber,
        CurrentHandle:localStorage.getItem("USERNAME"),
        SLAId:serviceId,
      };
      this.props.saveCreateOrder2(data);

      var dateObjec = {
        RecId:this.props.selectedAlarmEvent.recid,
        EventStatus: "3"
      };
      this.props.updateAlarmEventStatus(dateObjec);
      $("#alarmEventWorkOrderModal").modal("hide");
    },
    getFaultSubType: function(e){
      var id = e.id;
      this.props.getFaultSubType(id);
      $("#alarmOperationFaultSubType").find(".rw-input").text("");
      $("#alarmOperationFaultBigType").find(".rw-input").text(e.name);
    },
    setFaultSubType: function(e){
      var id = e.id;
      this.props.setFaultSubTypeId(id);
      $("#alarmOperationFaultSubType").find(".rw-input").text(e.name);
    },
    getSla:function(e){
      var id = e.id;
      var datas = this.props.serviceData;
      for(var i=0;i<datas.length;i++){
        var rid = datas[i].RecId;
        if(id == rid){
          // console.log(datas[i]);
          var responseTime = datas[i].ResponseTime;
          var solutionTime = datas[i].SolutionTime;
          $("#alarmEventWorkOrderResponseTime").val(responseTime);
          $("#alarmEventWorkOrderOverTime").val(solutionTime);
          $("#alarmOperationOrderSla").find(".rw-input").text(datas[i].Title);
          this.props.setServiceId(id);
        };
      };
    },
    setFlowLevel: function(e){
      this.props.setFlowLevel(e);
      $("#alarmOperationOrderLevel").find(".rw-input").text(e);
    },
    setCurWorkFlowId:function(e){
      this.props.setCurWorkFlowType(e.RecId);
      $("#alarmOperationOrderFlowType").find(".rw-input").text(e.Name);
    },
    render : function(){
      var user = localStorage.getItem("localUserName");
      var info = this.props.createOrderInfo;
      var workIndex = "";var createUnit = "";var createCell = "";var createPhone = "";
      if(info!=null&&info!=""){
        workIndex = info.SERIALNUMBER;
        createUnit = info.DEPARTMENT;
        createCell = info.CELLPHONE;
        createPhone = info.DEPARTMENT;
      };
      // console.log("11111111111111",this.state.itoss.touchWorkOrderData)
      var touchData = this.props.touchWorkOrderData;
      // console.log(touchData);
      var wSubject = "";
      var wDesc = "";
      var wMdata = "";
      if(touchData!=null && touchData!=""){
        wSubject = touchData.subject;
        wDesc = touchData.desc;
        wMdata = touchData.monitorData;
        // console.log("1111111111111",wMdata);
      };
      var bigTypeid = this.props.faultTypeId;
      var smallId = this.props.faultSubTypeId;
      var serviceId = this.props.serviceId;
      var flowId = this.props.curWorkOrderFlowId;
      var groups = this.props.faultTypes;
      var allFaults = this.props.allFaults;
      var servicess = this.props.serviceData;
      var flowData = this.props.workFlowTypes;
      // console.log(servicess);
      if(bigTypeid!= null && bigTypeid!= ""){
        for(var i=0;i<groups.length;i++){
          var id = groups[i].id;
          if(id == bigTypeid){
            $("#alarmOperationFaultBigType").find(".rw-input").text(groups[i].name);
          };
        };
      };
      var that = this;
      if(smallId!= null && smallId!= ""){
        for(var i=0;i<allFaults.length;i++){
          var id = allFaults[i].RecId;
          if(id == smallId){
            $("#alarmOperationFaultSubType").find(".rw-input").text(allFaults[i].FaultName);
          };
        };
      }else{
        var touchFaultSubId = that.props.touchFaultSubId;
        // console.log("222222",touchFaultSubId);
        if(touchFaultSubId!=null && touchFaultSubId!=""){
          for(var i=0;i<allFaults.length;i++){
            var id = allFaults[i].RecId;
            if(id == touchFaultSubId){
              $("#alarmOperationFaultSubType").find(".rw-input").text(allFaults[i].FaultName);
            };
          };
        };
      };
      if(serviceId!= null && serviceId!= ""){
        for(var i=0;i<servicess.length;i++){
          var id = servicess[i].RecId;
          if(id == serviceId){
            $("#alarmOperationOrderSla").find(".rw-input").text(servicess[i].Title);
            $("#alarmEventWorkOrderResponseTime").val(servicess[i].ResponseTime);
            $("#alarmEventWorkOrderOverTime").val(servicess[i].SolutionTime);
          };
        };
      };
      // console.log(flowId);
      if(flowId!=null && flowId!=""){
        for(var i=0;i<flowData.length;i++){
          var id = flowData[i].RecId;
          // console.log(flowData[i]);
          if(id == flowId){
            $("#alarmOperationOrderFlowType").find(".rw-input").text(flowData[i].Name);
          };
        };
      };
      // if(touchData !=null && touchData != ""){
      //   if(touchData.subject!=null && touchData.subject!=""){
          if(wSubject){
            $("#alarmEventWorkOrderTitle").val(wSubject);
          }
      //   };
      // };
      if(wDesc){
        $("#alarmEventWorkOrderDescription").val(wDesc);
      }
        return (
          <div>
            <PersonModel flowPersonnelListData={this.props.flowPersonnelListData} flowActionListData={this.props.flowActionListData}
                curWorkOrderId={this.props.curWorkOrderId} curWorkOrderData={this.props.curWorkOrderData}
                update_WorkOrderCommonStatusData={this.props.update_WorkOrderCommonStatusData}
                add_CreateWorkFlowLogData={this.props.add_CreateWorkFlowLogData}
                set_WorkFlowSendEmail={this.props.set_WorkFlowSendEmail}
            />
            <div className="modal fade" id="alarmEventWorkOrderModal" tabIndex="-1" role="dialog" aria-labelledby="alarmEventWorkOrderModalLabel" aria-hidden="true">
                <div className="modal-dialog alarmEventWorkOrderModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h6 className="modal-title">工单详情</h6>
                        </div>
                        <div className="modal-body">
                          <div className="operationFormDiv">
                            <div className="col-md-12">
                              <table>
                                <tbody>
                                  <tr>
                                    <th rowSpan="6" className="operationTableTitle">工单信息</th>
                                    <th>工单主题<span style={{"color":"#FF0000"}}>*</span></th>
                                    <td colSpan="5"><input type="text" className="form-control" id="alarmEventWorkOrderTitle"/></td>
                                  </tr>
                                  <tr>
                                    <th>工单流程类型<span style={{"color":"#FF0000"}}>*</span></th>
                                    <td colSpan="5"><ReactWidgets.DropdownList data={this.props.workFlowTypes} textField='Name' onSelect={this.setCurWorkFlowId} style={{"borderBottom":"1px solid #ddd"}} id="alarmOperationOrderFlowType"/></td>
                                  </tr>
                                  <tr>
                                    <td colSpan="6"><textarea className="form-control orderExplain" placeholder="工单描述" rows="5" id="alarmEventWorkOrderDescription"></textarea></td>
                                  </tr>
                                  <tr>
                                    <th>故障大类<span style={{"color":"#FF0000"}}>*</span></th>
                                    <td className="rw-widget-td"><ReactWidgets.DropdownList data={this.props.faultTypes} textField='name' onSelect={this.getFaultSubType} id="alarmOperationFaultBigType"/></td>
                                    <th>故障细类<span style={{"color":"#FF0000"}}>*</span></th>
                                    <td className="rw-widget-td"><ReactWidgets.DropdownList data={this.props.faultSubTypes} textField='name' onSelect={this.setFaultSubType} id="alarmOperationFaultSubType"/></td>
                                    <th>工单号</th>
                                    <td><input type="text" className="form-control" id="createOperationOrderNumber" value={workIndex} disabled/></td>
                                  </tr>
                                  <tr>
                                    <th>创建人</th>
                                    <td><input type="text" className="form-control" id="createOperationOrderPerson" defaultValue={user} disabled/></td>
                                    <th>部门</th>
                                    <td><input type="text" className="form-control" id="createOperationOrderUnit" value={createUnit} disabled/></td>
                                    <th>手机</th>
                                    <td><input type="text" className="form-control" id="createOperationOrderMobile" value={createCell} disabled/></td>
                                  </tr>
                                  <tr>
                                    <th>固定电话</th>
                                    <td><input type="text" className="form-control" id="createOperationOrderPhone" value={createPhone} disabled/></td>
                                    <th>优先级<span style={{"color":"#FF0000"}}>*</span></th>
                                    <td className="rw-widget-td"><ReactWidgets.DropdownList data={["高","中","低"]} textField='name' onSelect={this.setFlowLevel} id="alarmOperationOrderLevel"/></td>
                                    <th>工单状态</th>
                                    <td><input type="text" className="form-control" id="createOperationOrderStatus" defaultValue="草稿" disabled/></td>
                                  </tr>
                                  <tr>
                                    <th rowSpan="2" className="operationTableTitle">服务级别协议</th>
                                    <th>服务级别协议名称</th>
                                    <td className="rw-widget-td"><ReactWidgets.DropdownList data={this.props.serviceName} textField='name' onSelect={this.getSla} id="alarmOperationOrderSla"/></td>
                                    <th>响应时间</th>
                                    <td><input type="text" className="form-control" id="alarmEventWorkOrderResponseTime" disabled/></td>
                                    <th>解决时间</th>
                                    <td><input type="text" className="form-control" id="alarmEventWorkOrderOverTime" disabled/></td>
                                  </tr>
                                  <tr>
                                    <th>延期截止时间</th>
                                    <td><input type="text" className="form-control" defaultValue="--" disabled/></td>
                                    <th>解决时长</th>
                                    <td><input type="text" className="form-control" defaultValue="--" disabled/></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="col-md-12" style={{"marginBottom":"20px"}}>
                              <AlarmEventWorkOrderModalTable
                               data={wMdata} setHandleAssetsId={this.props.setHandleAssetsId}
                               assets={this.props.assets} isBunder={this.props.isBunder}
                               setIsBunder={this.props.setIsBunder} getAssets={this.props.getAssets}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer" style={{"backgroundColor":"#fff","border":"none"}}>
                          <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickSaveAndAllocation}>保存并分配</button>
                          <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickSave}>仅保存</button>
                          <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
    }
});

$(window).resize(function () {
    $(".alarmEventWorkOrderModalDialog").css('width', $(window).width()-100);
});

module.exports = AlarmEventWorkOrderModal;
