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

var claimRecord = React.createClass({
  mixins: [Navigation],
  // getStateFromFlux: function() {
  //   var flux = this.getFlux();
  //   return {
  //     itoss:flux.store("YFTOperationStore").getState()
  //   }
  // },
  componentDidMount:function(){
    var data = [];
    $('#delayApproveTable').bootstrapTable({
        columns: [
            {
                title: '申请时间',
                field: 'requestTime',
                width: '25%',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '申请人',
                field: 'requester',
                width: '10%',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '申请人电话',
                field: 'requesterPhone',
                width: '15%',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '状态',
                field: 'status',
                width: '15%',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '审批人',
                field: 'approver',
                width: '10%',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '审批时间',
                field: 'approvalTime',
                width: '25%',
                halign: 'left',
                align: 'left',
                sortable: true
            }
        ],
        data: data,
        onClickRow: this.onRowClick
      });
  },
  onRowClick:function(e){
    var index = e.serialNumber;
    var status = e.status;
    var man = e.requester;
    var phone = e.requesterPhone;
    var time = e.extendTime;
    var reason = e.reason;
    var opinion = e.opinion;
    var num = e.workOrderNum;
    $("#delayApproveIndex").val(index);
    $("#delayApproveNumber").val(num);
    $("#delayApproveStatus").val(status);
    $("#delayApproveMan").val(man);
    $("#delayApproveTelephone").val(phone);
    $("#delayApproveTime").val(time);
    $("#delayApproveReason").val(reason);
    $("#delayApproveOpinion").val(opinion);
    var id = e.id;
    this.props.setCurDelayId(id);
  },
  render:function(){
    // console.log(this.state.itoss);
    var detailData = this.props.orderDetailData;
    if(detailData!=null&&detailData!=""){
      var extensions = detailData.EXTENSIONS;
      extensions = eval(extensions);
      $("#delayApproveTable").bootstrapTable('load', extensions);
    };
    return (
      <div className="operationMonitorInfoDiv">
        <label className="operationMonitorLabel">延期申请</label>
        <div className="operationTableDiv">
          <table id='delayApproveTable'
             data-toggle='table'
             data-classes='table table-no-bordered table-hover'
             data-height={260}
             data-show-refresh='false'
             data-show-toggle='false'
             data-show-columns='false'
             data-pagination='true'
             data-page-size='4'>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = claimRecord;
