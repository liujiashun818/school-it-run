require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');

var MonitorInfo = require('./createOperationMonitorInfo.js');

var createOperationForm = React.createClass({
    componentDidMount: function() {
      $(".oBGroup").hide();
      $(".operationButtonGroup1").show();
      this.props.get_faultType();
      this.props.get_serviceName();
      var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
      this.props.get_createOrderInfo(param);
      if (this.isMounted()) {
        // if(this.props.workOrderTemplatesMainForm){
        //   //ReactDOM.render(<OperationFlowPic/>,document.getElementById('OperationFlowPic'));
        //   var detailDiv = document.getElementById('createWorkOrderModelDetail');
        //   detailDiv.innerHTML = this.props.workOrderTemplatesMainForm.t_content;
        //   this.props.getBusObDefFieldsDetail(this.props.workOrderTemplatesMainForm.t_entity);
        // }
      }
    },
    shouldComponentUpdate: function(nextProps, nextState){
      if (nextProps.workOrderTemplatesMainForm !== this.props.workOrderTemplatesMainForm) {
        if(nextProps.workOrderTemplatesMainForm){
          //ReactDOM.render(<OperationFlowPic/>,document.getElementById('OperationFlowPic'));
          var detailDiv = document.getElementById('createWorkOrderModelDetail');
          if(detailDiv){
            detailDiv.innerHTML = nextProps.workOrderTemplatesMainForm.t_content;
            this.props.getBusObDefFieldsDetail(nextProps.workOrderTemplatesMainForm.t_entity);
          }
        };
      };
      return true;
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
              <div className="col-md-12" id="createWorkOrderModelDetail">

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
