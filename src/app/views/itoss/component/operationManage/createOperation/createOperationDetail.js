require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');

var MonitorInfo = require('./createOperationMonitorInfo.js');

var createOperationForm = React.createClass({
    componentDidMount: function() {
      $(".oBGroup").hide();
      $(".operationButtonGroup1").show();
      // var _this = this;
      // setTimeout(function(){
      //   _this.getFlux().actions.YFTOperationActions.get_faultType();
      //   _this.getFlux().actions.YFTOperationActions.get_serviceName();
      //   var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
      //   _this.getFlux().actions.YFTOperationActions.get_createOrderInfo(param);
      // },1000);
      this.props.get_faultType();
      this.props.get_serviceName();
      var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
      this.props.get_createOrderInfo(param);
    },
    getFaultSubType: function(e){
      // console.log(e);
      var id = e.id;
      this.props.get_faultSubType(id);
      $("#createOperationFaultType").find(".rw-input").text(e.name);
      $("#createOperationFaultSubType").find(".rw-input").text("");
      this.props.setCanUpdate("false");
    },
    setFaultSubType: function(e){
      var id = e.id;
      //this.props.setFaultSubTypes(id);
      this.props.setFaultSubTypeId(id);
      this.props.setCanUpdate("false");
      $("#createOperationFaultSubType").find(".rw-input").text(e.name);
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
          $("#createOperationOrderResponse").val(responseTime);
          $("#createOperationOrderOver").val(solutionTime);
          $("#createOperationOrderSla").find(".rw-input").text(datas[i].Title);
          this.props.setServiceId(id);
          this.props.setCanUpdate("false");
        };
      };
    },
    setFlowLevel: function(e){
      this.props.setFlowLevel(e);
      this.props.setCanUpdate("false");
      $("#createOperationOrderLevel").find(".rw-input").text(e);
    },
    render:function(){
        var user = localStorage.getItem("localUserName");
        var info = this.props.createOrderInfo;
        var workIndex = "";var createUnit = "";var createCell = "";var createPhone = "";
        if(info!=null&&info!=""){
          workIndex = info.SERIALNUMBER;
          createUnit = info.DEPARTMENT;
          createCell = info.CELLPHONE;
          createPhone = info.DEPARTMENT;
        };
        return(
            <div className="operationFormDiv">
              <div className="col-md-12">
                <table>
                  <tbody>
                    <tr>
                      <th rowSpan="5" className="operationTableTitle">工单信息</th>
                      <th>工单主题<span style={{"color":"#FF0000"}}>*</span></th>
                      <td colSpan="5"><input type="text" className="form-control" id="createOperationOrderTitle"/></td>
                    </tr>
                    <tr>
                      <td colSpan="6"><textarea className="form-control orderExplain" placeholder="工单描述" rows="5" id="createOperationOrderExplain"></textarea></td>
                    </tr>
                    <tr>
                      <th>故障大类<span style={{"color":"#FF0000"}}>*</span></th>
                      <td className="rw-widget-td" style={{"width":"20%"}}><ReactWidgets.DropdownList data={this.props.faultTypes} textField='name' onSelect={this.getFaultSubType} id="createOperationFaultType"/></td>
                      <th>故障细类<span style={{"color":"#FF0000"}}>*</span></th>
                      <td className="rw-widget-td" style={{"width":"20%"}}><ReactWidgets.DropdownList data={this.props.faultSubTypes} textField='name' onSelect={this.setFaultSubType} id="createOperationFaultSubType"/></td>
                      <th>工单号</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="createOperationOrderNumber" value={workIndex} disabled/></td>
                    </tr>
                    <tr>
                      <th>创建人</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="createOperationOrderPerson" defaultValue={user} disabled/></td>
                      <th>部门</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="createOperationOrderUnit" value={createUnit} disabled/></td>
                      <th>手机</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="createOperationOrderMobile" value={createCell} disabled/></td>
                    </tr>
                    <tr>
                      <th>固定电话</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="createOperationOrderPhone" value={createPhone} disabled/></td>
                      <th>优先级<span style={{"color":"#FF0000"}}>*</span></th>
                      <td className="rw-widget-td" style={{"width":"20%"}}><ReactWidgets.DropdownList data={["高","中","低"]} textField='name' onSelect={this.setFlowLevel} id="createOperationOrderLevel"/></td>
                      <th>工单状态</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="createOperationOrderStatus" defaultValue="草稿" disabled/></td>
                    </tr>
                    <tr>
                      <th rowSpan="2" className="operationTableTitle">服务级别协议</th>
                      <th>服务级别协议名称</th>
                      <td className="rw-widget-td" style={{"width":"20%"}}><ReactWidgets.DropdownList data={this.props.serviceName} textField='name' onSelect={this.getSla} id="createOperationOrderSla"/></td>
                      <th>响应时间</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="createOperationOrderResponse" disabled/></td>
                      <th>解决时间</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" id="createOperationOrderOver" disabled/></td>
                    </tr>
                    <tr>
                      <th>延期截止时间</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" defaultValue="--" disabled/></td>
                      <th>解决时长</th>
                      <td style={{"width":"20%"}}><input type="text" className="form-control" defaultValue="--" disabled/></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-12">
                <MonitorInfo assets={this.props.assets}
                   setHandleAssetsId={this.props.setHandleAssetsId} getWorkOrderToMonitorData={this.props.getWorkOrderToMonitorData} getAssets={this.props.getAssets}
                />
              </div>
            </div>
        );
    }
});

module.exports = createOperationForm;
