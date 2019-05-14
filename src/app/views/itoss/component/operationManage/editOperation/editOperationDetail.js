require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import MonitorInfo from './editOperationMonitorInfo.js';

// var dateChange = require('../../../../../utils/dateChange.js');

var editOperationForm = React.createClass({
    mixins: [Navigation],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     itoss:flux.store("YFTOperationStore").getState()
    //   }
    // },
    componentDidMount: function() {
      // dateChange.changeViewStyle();
      // console.log(this.state.itoss.permissions)
      var isCanUpdate = false;
      var permissions = this.props.permissions;
      for(var i=0;i<permissions.length;i++){
        var resourceType = permissions[i].resourceType;
        if(resourceType == "/operationmanage/workordermanage/workspacedetails/update"){
          isCanUpdate = true;
          break;
        };
      } ;
      if(!isCanUpdate){
        $(".operationButtonGroup1").find(".buttonInfo").find("button").attr("disabled",true);
        $(".operationButtonGroup1").find(".buttonInfo").find("button").css('background-color',"#ddd");
      };
      var id = this.props.curWorkOrderId;
      this.props.get_serviceName();
      this.props.get_flowPicData(id);
    },
    getFaultSubType: function(e){
      // console.log(e);
      var id = e.id;
      this.props.get_faultSubType(id);
      $("#editOperationOrderFault").find(".rw-input").text(e.name);
      $("#editOperationOrderFaultSub").find(".rw-input").text("");
    },
    setFaultSubType: function(e){
      var id = e.id;
      this.props.setFaultTypeId(id);
      $("#editOperationOrderFaultSub").find(".rw-input").text(e.name);
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
          $("#editOperationOrderResponse").val(responseTime);
          $("#editOperationOrderOver").val(solutionTime);
          $("#editOperationOrderSla").find(".rw-input").text(datas[i].Title);
          this.props.setServiceName(id);
        };
      };
    },
    setFlowLevel: function(e){
      this.props.setFlowLevel(e);
      $("#editOperationOrderLevel").find(".rw-input").text(e);
    },
    render:function(){
        var subject="";var desc="";var faultLarge="";var faultSmall="";var workOrderNum="";var priority="";var state ="";var createBy="";var dept="";var cellPhone="";
        var telephone="";var slaTitle="";var responseTime="";var resolveTime="";var deadline="";var resolveLong="";var assets=[];
        var data = this.props.orderDetailData;
        // console.log(this.state.itoss.orderDetailData);
        if(data!=null && data!=""){
          subject = data.SUBJECT;
          desc = data.DESC;
          faultLarge = data.FAULT_LARGE;
          faultSmall = data.FAULT_SMALL;
          workOrderNum = data.WORKORDERNUM;
          priority = data.PRIORITY;
          state = data.STATUS;
          createBy = data.CREATEBY;
          dept = data.DEPT;
          cellPhone = data.CELLPHONE;
          telephone = data.TELEPHONE;
          slaTitle = data.SLA_TITLE;
          responseTime = data.RESPONSE_TIME;
          resolveTime = data.RESOLVE_TIME;
          deadline = data.EXTENDED_DEADLINE;
          resolveLong = data.RESOLVE_LONG;
          assets = data.ASSETS;
        };
        var mark = false;
        var premark = this.props.mark;
        if(premark != null && premark !="" ){
          mark = premark;
          $(".operationButtonGroup1").find(".buttonInfo").find("button").attr("disabled",true);
          $(".operationButtonGroup1").find(".buttonInfo").find("button").css('background-color',"#ddd");
        };
        return(
            <div className="operationFormDiv">
              <div className="col-md-12">
                <table>
                  <tbody>
                    <tr>
                      <td rowSpan="5" className="operationTableTitle">工单信息</td>
                      <th className="borderRightNone">工单主题<span style={{"color":"#FF0000"}}>*</span></th>
                      <td colSpan="5"><input type="text" className="form-control" id="editOperationOrderTitle" defaultValue={subject} disabled={mark}/></td>
                    </tr>
                    <tr>
                      <td colSpan="6"><textarea className="form-control orderExplain" placeholder="工单描述" style={{"borderTop":"none"}} rows="5" id="editOperationOrderExplain" defaultValue={desc} disabled={mark}></textarea></td>
                    </tr>
                    <tr>
                      <th className="borderButtom">故障大类<span style={{"color":"#FF0000"}}>*</span></th>
                      <td className="rw-widget-td" style={{"width":"20%"}}><ReactWidgets.DropdownList data={this.props.faultTypes} textField='name' onSelect={this.getFaultSubType} defaultValue={faultLarge} disabled={mark} id="editOperationOrderFault"/></td>
                      <th className="borderButtom">故障细类<span style={{"color":"#FF0000"}}>*</span></th>
                      <td className="rw-widget-td" style={{"width":"20%"}}><ReactWidgets.DropdownList data={this.props.faultSubTypes} textField='name' onSelect={this.setFaultSubType} defaultValue={faultSmall} disabled={mark} id="editOperationOrderFaultSub"/></td>
                      <th className="borderButtom">工单号</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" style={{"borderTop":"none"}} id="editOperationOrderNumber" defaultValue={workOrderNum} disabled/></td>
                    </tr>
                    <tr>
                      <th className="borderButtom">创建人</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="editOperationOrderPerson" defaultValue={createBy} disabled/></td>
                      <th className="borderButtom">部门</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="editOperationOrderUnit" defaultValue={dept} disabled/></td>
                      <th className="borderButtom">手机</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="editOperationOrderMobile" defaultValue={cellPhone} disabled/></td>
                    </tr>
                    <tr>
                      <th className="borderButtom">固定电话</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="editOperationOrderPhone" defaultValue={telephone} disabled/></td>
                      <th className="borderButtom">优先级<span style={{"color":"#FF0000"}}>*</span></th>
                      <td className="rw-widget-td" style={{"width":"20%"}}><ReactWidgets.DropdownList data={["高","中","低"]} textField='name' onSelect={this.setFlowLevel} defaultValue={priority} disabled={mark} id="editOperationOrderLevel"/></td>
                      <th className="borderButtom">工单状态</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="editOperationOrderStatus" defaultValue={state} disabled/></td>
                    </tr>
                    <tr>
                      <td rowSpan="2" className="operationTableTitle">服务级别协议</td>
                      <th className="borderRightNone">服务级别协议名称</th>
                      <td className="rw-widget-td" style={{"width":"20%"}}><ReactWidgets.DropdownList data={this.props.serviceName} textField='name' onSelect={this.getSla} defaultValue={slaTitle} disabled={mark} id="editOperationOrderSla"/></td>
                      <th className="borderButtom">响应时间</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="editOperationOrderResponse" defaultValue={responseTime} disabled/></td>
                      <th className="borderButtom">解决时间</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" style={{"borderBottom":"1px solid #eee"}} id="editOperationOrderOver" defaultValue={resolveTime} disabled/></td>
                    </tr>
                    <tr>
                      <th className="borderButtom">延期截止时间</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" style={{"borderBottom":"1px solid #eee"}} defaultValue={deadline} disabled/></td>
                      <th className="borderButtom">解决时长</th>
                      <td style={{"width":"20%"}}><input id="editOperationDetailWorkload" type="text" className="form-control" style={{"borderBottom":"1px solid #eee"}} defaultValue={resolveLong} disabled/></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-12">
                <MonitorInfo data={assets} mark={mark}
                  assets={this.props.assets}
                  setHandleAssetsId={this.props.setHandleAssetsId}
                  getWorkOrderToMonitorData={this.props.getWorkOrderToMonitorData}
                  getAssets={this.props.getAssets}
                />
              </div>
            </div>
        );
    }
});

module.exports = editOperationForm;
