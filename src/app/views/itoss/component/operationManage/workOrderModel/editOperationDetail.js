require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
import MonitorInfo from './editOperationMonitorInfo.js';


var editOperationForm = React.createClass({

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
      this.props.get_serviceName();
    },
    shouldComponentUpdate: function(nextProps, nextState){
      if (nextProps.workOrderTemplatesMainForm !== this.props.workOrderTemplatesMainForm) {
        if(nextProps.workOrderTemplatesMainForm){
          //ReactDOM.render(<OperationFlowPic/>,document.getElementById('OperationFlowPic'));
          var detailDiv = document.getElementById('editWorkOrderModelDetail');
          if(detailDiv){
            detailDiv.innerHTML = nextProps.workOrderTemplatesMainForm.t_content;
            this.props.getBusObDefFieldsDetail(nextProps.workOrderTemplatesMainForm.t_entity);
          }
        };
      };
      if (nextProps.workOrderTemplatesMainData !== this.props.workOrderTemplatesMainData) {
        if(this.props.busObDefFieldDetail.length > 0){
             var objFieldDetail = this.props.busObDefFieldDetail;
            //回填值
            if(nextProps.workOrderTemplatesMainData.length > 0){
              for (var i = 0; i < objFieldDetail.length; i++) {
                var fieldtemp = objFieldDetail[i].name;
                if(fieldtemp != 'RecId' && fieldtemp != 'LastModDateTime' && fieldtemp != 'LastModBy'
                   && fieldtemp != 'CreatedDateTime'  && fieldtemp != 'CreatedBy' && fieldtemp != 'workOrderId'){
                     var idfield = '#'+fieldtemp;
                     $(idfield).val(nextProps.workOrderTemplatesMainData[0][fieldtemp]);
                     //$(idfield).attr("disabled",true);
                }
              };
            }
        };
      };
      if (nextProps.curWorkOrderId !== this.props.curWorkOrderId) {
        if(nextProps.curWorkOrderId){
          this.props.get_flowPicData(nextProps.curWorkOrderId);
        }
      };

      return true;
    },
    render:function(){
        // var subject="";var desc="";var faultLarge="";var faultSmall="";var workOrderNum="";var priority="";var state ="";var createBy="";var dept="";var cellPhone="";
        // var telephone="";var slaTitle="";var responseTime="";var resolveTime="";var deadline="";var resolveLong="";
        var assets=[];
        var data = this.props.orderDetailData;
        // // console.log(this.state.itoss.orderDetailData);
        if(data!=null && data!=""){
        //   subject = data.SUBJECT;
        //   desc = data.DESC;
        //   faultLarge = data.FAULT_LARGE;
        //   faultSmall = data.FAULT_SMALL;
        //   workOrderNum = data.WORKORDERNUM;
        //   priority = data.PRIORITY;
        //   state = data.STATUS;
        //   createBy = data.CREATEBY;
        //   dept = data.DEPT;
        //   cellPhone = data.CELLPHONE;
        //   telephone = data.TELEPHONE;
        //   slaTitle = data.SLA_TITLE;
        //   responseTime = data.RESPONSE_TIME;
        //   resolveTime = data.RESOLVE_TIME;
        //   deadline = data.EXTENDED_DEADLINE;
        //   resolveLong = data.RESOLVE_LONG;
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
              <div className="col-md-12" id="editWorkOrderModelDetail">

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
