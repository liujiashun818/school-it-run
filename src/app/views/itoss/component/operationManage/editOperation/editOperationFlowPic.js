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

var MaidFlow = require('../../maidFlow/MaidFlow.js');

var operationFlowPic =  React.createClass ({
    mixins: [Navigation],
    getStateFromFlux: function() {
      var flux = this.props.flux;
      return {
        itoss:flux.store("YFTOperationStore").getState()
      }
    },
    selectitem :function(tag){
        console.log(tag);
       },
    componentDidMount:function(){
      // var flux = this.props.flux;
      // var id = this.state.itoss.curWorkOrderId;
      // flux.actions.YFTOperationActions.get_flowPicData(id);
      // console.log(this.state.itoss)
    },
    render :function() {
      var data = this.props.flowPicData;
      var flowv = "";
      var userdata = [];
      var statedata = [];
      if(data!=null&&data!=""){
        flowv = data.DESC;
        userdata = data.LOG_DESC;
        userdata = eval(userdata);
        statedata = data.PASS_DESC;
        statedata = eval(statedata);
      };
      // var obj={};
      // var userdata = new Array();
      // obj={};
      // obj["name"]="分服务台";
      // obj["gdid"]="gdid1";
      // obj["desc"]="已经解决<br/>2015-11-5 13:22";
      // obj["worker"]="黎明";
      // userdata.push(obj);
      // obj={};
      // obj["name"]="工程师";
      // obj["gdid"]="gdid2";
      // obj["desc"]="重新安装操作系统<br/>完成时间:2015-09-11  14:30";
      // obj["worker"]="赵轩";
      // userdata.push(obj);
      // var flowv ="graph LR;分服务台--复杂事件fffff,状态为分配-->工程师;"
      //     	    +"工程师--未完成,状态为提交-->分服务台;"
      //           +"工程师--已经完成-->电话回访;"
      //           +"电话回访--回访完成-->分服务台;";
      // var statedata =[{"name":"分服务台","state":1}, {"name":"工程师","state":1,"start":"分服务台"}, {"name":"电话回访","state":1,"start":"工程师"},
      //    {"name":"工程师","state":1,"start":"分服务台"}, {"name":"分服务台","state":1,"start":"电话回访"}];
      console.log(flowv)
      console.log(userdata);
      console.log(statedata);
      return <div><MaidFlow   Flowv={flowv} Statedata={statedata} Userdata={userdata} selectitem={this.selectitem}/></div>;
    }
});
//
// var operationFlowPic = React.createClass({
//   render:function(){
//     return(
//       <div className="operationFlowPicDiv">
//         <Mdflow />
//       </div>
//     );
//   }
// });

module.exports = operationFlowPic;
