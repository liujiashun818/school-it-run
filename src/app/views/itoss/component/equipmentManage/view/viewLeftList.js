/**
  createby zxn
  资源监测-视图-组织机构结构树
*/
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var base64 = require('../../../../../utils/base64');

var CommonTree = require('../../monitorTree/commonTree');

import { connect } from 'react-redux';
import { emitSetVisioStatus } from '../../../../../actions/visio_action';

var ViewLeftList = React.createClass({
    mixins: [History],
    getInitialState:function(){
      return {
        status: true,
      }
    },
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     itoss:flux.store("YFTIndexStore").getState()
    //   }
    // },
    rSetting:function(treeName){
    var _this =  this;
    var  setting = {
        check: {enable: false},
        data: {simpleData: {enable: true}},
        callback: {
          beforeClick: function(treeId, treeNode) {
            _this.props.beforeClick(treeNode);
            // _this.getFlux().actions.YFTVisioAction.setLeftTreeId(treeNode.id);
            // if(treeNode.id == "0"){
            //   _this.getFlux().actions.YFTVisioAction.loadVisioList({});
            // }else{
            //   _this.getFlux().actions.YFTVisioAction.loadVisioList({ORGANIZATION:treeNode.id});
            // }
          }
        }
      }
      return setting;
    },
    componentWillMount:function(){
      // this.getFlux().actions.YFTVisioAction.getAllGroupOrg();
      // const { dispatch } = this.props;
      // dispatch(emitSetVisioStatus(true));
    },
    componentDidUpdate:function(){
      var _this = this;
      if(this.props.groupOrg instanceof Array && this.props.groupOrg.length>0){
        if(this.props.getVisioStatus){
          var treeObj= $.fn.zTree.init($("#visioTree"), this.rSetting("visioTree"), this.props.groupOrg);
          var nodes = treeObj.getNodes();
          if (nodes.length>0) {
          	treeObj.selectNode(nodes[0]);
            _this.props.beforeClick(nodes[0]);
          }
          const { dispatch } = this.props;
          dispatch(emitSetVisioStatus(false));
          // this.setState({status:false});
        }
      }
    },
    componentDidMount: function() {
      if(this.props.groupOrg instanceof Array && this.props.groupOrg.length>0){
        $.fn.zTree.init($("#visioTree"), this.rSetting("visioTree"), this.props.groupOrg);
      }
        var list = [];
        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        var bShowTemplateset = false,bShowMonitorSet = false,bShowResourceSet = false;
        var bShowAlarmconfig = false, bShowAlarmrulesissue = false, bShowAlarmevent = false;
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/equipmentmanage/view/topologyview") {
                bShowTemplateset = true;
                list.push({id:1,name:"拓扑视图",pid:0,toUrl:"equipmentmanage/topologyPage"});
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/setting/monitorset") {
                bShowMonitorSet = true;
                //list.push({id:2,name:"实时状态",pid:0,toUrl:"equipmentManage/monitorSetPage"});
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/setting/resourceset") {
                bShowResourceSet = true;
                //list.push({id:3,name:"虚拟视图",pid:0,toUrl:"equipmentManage/resourceSetPage"});
            }
        }
        if(!bShowTemplateset) {
            // $("#topologyView").hide();
        }
        if(!bShowMonitorSet) {
            // $("#alarmList_alarmIssue").hide();
        }
        if(!bShowResourceSet) {
            // $("#alarmList_alarmRule").hide();
        }

        $(".list-group").find("a").each(function(){
          var $node = $(this);
          $node.mouseover(function(){
            var claz = $node.attr("class");
            var ind = claz.indexOf("active");
            if(ind>=0){
              $node.attr("class","");
              $node.attr("class","list-group-item fadeInMenu active");
            }else{
              $node.attr("class","list-group-item fadeInMenuHover");
            };
          });
          $node.mouseout(function(){
            var claz = $node.attr("class");
            var ind = claz.indexOf("active");
            if(ind>=0){
              $node.attr("class","");
              $node.attr("class","list-group-item fadeInMenu active");
            }else{
              $node.attr("class","list-group-item fadeOutMenuHover");
            };
          });
        });
        this.setState({treeData:list});

        // var relyModaltreeObj = this.getFlux().store("YFTVisioStore").getState().visioTree;
        // var allgroupOrg = this.props.getAllGroupOrg;


    },

    _handleOnClick: function(e) {
        if(e.target.id == 'topologyView'){
            this.history.pushState(null,'equipmentmanage/topologyPage');
        }
        else if(e.target.id == 'alarmList_alarmIssue'){
            // this.history.pushState(null,'equipmentManage/monitorSetPage');
        }
        else if(e.target.id == 'alarmList_alarmRule'){
            // this.history.pushState(null,'equipmentManage/resourceSetPage');
        }
    },
    render: function() {
      return(
        <div className="zTreeMonitor groupZTree">
          <div>
              <label>组织机构结构树</label>
          </div>
          <ul id="visioTree" className="ztree"></ul>
      </div>
      )
    }
});

function mapViewLeftList(state) {
  const { getVisioStatus } = state.visioReducer

  return {
    getVisioStatus:getVisioStatus
  }
}
export default connect(mapViewLeftList)(ViewLeftList);
// module.exports = ViewLeftList;
