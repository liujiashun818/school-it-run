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
    $('#delayClaimTable').bootstrapTable({
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
    // console.log(e);
    $("#editOperationClaimModal").modal("show");
    $("#claimModalIndex").val(e.serialNumber);
    $("#claimWorkOrderIndex").val(e.workOrderNum);
    $("#claimWorkOrderState").val(e.status);
    $("#claimWorkOrderMan").val(e.requester);
    $("#claimWorkOrderPhone").val(e.requesterPhone);
    $("#claimWorkOrderTime").val(e.extendTime);
    $("#claimWorkOrderReason").val(e.reason);
    $("#claimWorkOrderOpinion").val(e.opinion);
  },
  render:function(){
    // console.log(this.state.itoss);
    var detailData = this.props.orderDetailData;
    if(detailData!=null&&detailData!=""){
      var extensions = detailData.EXTENSIONS;
      extensions = eval(extensions);
      $("#delayClaimTable").bootstrapTable('load', extensions);
    };
    return (
      <div className="operationMonitorInfoDiv">
        <div className="modal fade" id="editOperationClaimModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">延期申请详情</h4>
              </div>
              <div className="modal-body">
                <table>
                  <tbody>
                    <tr>
                      <td>申请单号</td>
                      <td><input type="text" className="form-control" id="claimModalIndex" disabled/></td>
                      <td>工单号</td>
                      <td><input type="text" className="form-control" id="claimWorkOrderIndex" disabled/></td>
                      <td>延期状态</td>
                      <td><input type="text" className="form-control" id="claimWorkOrderState" disabled/></td>
                    </tr>
                    <tr>
                      <td>申请人</td>
                      <td><input type="text" className="form-control" id="claimWorkOrderMan" disabled/></td>
                      <td>申请人电话</td>
                      <td><input type="text" className="form-control" id="claimWorkOrderPhone" disabled/></td>
                      <td>延长时间</td>
                      <td><input type="text" className="form-control" id="claimWorkOrderTime" disabled/></td>
                    </tr>
                    <tr>
                      <td style={{"borderRight":"none","height":"30px"}}>申请原因</td>
                      <td colSpan="5" style={{"borderLeft":"none"}}>&nbsp;</td>
                    </tr>
                    <tr>
                      <td colSpan="6"><textarea rows="4" className="form-control" id="claimWorkOrderReason" disabled></textarea></td>
                    </tr>
                    <tr>
                      <td style={{"borderRight":"none","height":"30px"}}>审批意见</td>
                      <td colSpan="5" style={{"borderLeft":"none"}}>&nbsp;</td>
                    </tr>
                    <tr>
                      <td colSpan="6"><textarea rows="4" className="form-control" id="claimWorkOrderOpinion" disabled></textarea></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
              </div>
            </div>
          </div>
        </div>
        <label className="operationMonitorLabel">延期申请</label>
        <div className="operationTableDiv">
          <table id='delayClaimTable'
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
