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

var operationFlowLog = React.createClass({
  mixins: [Navigation],
  // getStateFromFlux: function() {
  //   var flux = this.getFlux();
  //   return {
  //     itoss:flux.store("YFTOperationStore").getState()
  //   }
  // },
  componentDidMount:function(){
    var data = [];
    $("#editOperationFlowLogTable").bootstrapTable({
      columns:[
        {
          title: '处理人',
          field: 'handler',
          width: '10%',
          halign: 'center',
          align: 'center',
          sortable: false
        },{
          title: '处理时间',
          field: 'handleTime',
          width: '20%',
          halign: 'center',
          align: 'center',
          sortable: false
        },{
          title: '操作流程',
          field: 'flowAction',
          width: '30%',
          halign: 'center',
          align: 'center',
          sortable: false
        },{
          title: '环节描述',
          field: 'content',
          width: '40%',
          halign: 'center',
          align: 'center',
          sortable: false
        }
      ],
      data: data,
    });
  },
  render:function(){
    var orderData = this.props.orderDetailData;
    if(orderData!=null && orderData!=""){
      var logs = orderData.LOGS;
      logs = eval(logs);
      $("#editOperationFlowLogTable").bootstrapTable("load",logs)
    };
    return(
      <div className="operationFlowLogDiv">
        <table id='editOperationFlowLogTable'
           data-toggle='table'
           data-classes='table table-no-bordered table-hover'
           data-toolbar='#toolbar'
           data-show-refresh='false'
           data-show-toggle='false'
           data-show-columns='false'
           data-pagination='true'
           data-page-size='10'>
        </table>
      </div>
    );
  }
});

module.exports = operationFlowLog;
