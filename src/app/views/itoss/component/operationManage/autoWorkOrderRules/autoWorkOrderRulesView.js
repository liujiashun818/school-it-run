/**
 * 运维管理-自动工单规则
 */
require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;
// var Navigation = require('react-router').Navigation;
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as operationActions from '../../../../../actions/operation_action'
import { setCurThreeNode, setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'

var AutoWorkOrderRulesView_desView = require('./autoWorkOrderRulesView_desView');
var CommonTree = require('../../monitorTree/commonTree.js');
var Store = require('../../../../../server/store.js');
var base64 = require('../../../../../utils/base64.js');

var AutoWorkOrderRulesView = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("YFTOperationStore").getState()
    //     }
    // },
    componentDidMount:function(){
        const{ dispatch, workFlowTypes } = this.props;
        if(workFlowTypes.length<=0){
            dispatch(operationActions.get_workFlowTypes());
        };
    },
    componentDidUpdate:function(){
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
    },
    _handleOnClick: function(e) {
        const { dispatch } = this.props;
        if(e.target.id == 'eToMyWorkSpace'){
            this.history.pushState(null,'operationManage/myWorkSpace');
        }
        else if(e.target.id == 'eToAutoWorkOrderRules'){
            this.history.pushState(null,'operationManage/autoWorkOrderRules');
        }
        else{
            dispatch(operationActions.set_curWorkFlowType(e.target.id));
            this.history.pushState(null,'operationManage/createOperation');
        }
    },
    render:function(){
        const { dispatch, workFlowTypes, curWorkFlowId, curThreeNode, preThreeNode, equipmentType, monitorType, automaticWorkOrder } = this.props;
        // var workFlowTypes = this.state.itoss.workFlowTypes;
        var curFlowId = curWorkFlowId;
        var list = [];
        var treeList = [];
        var isCanShow = false;
        var isCanWorkSpace = false;
        var isCanAutoworkorderRules = false;
        var permissions = "";
        if(permissions == null || permissions == ""){
            var temp = Store.get("PERMISSIONS");
            if(temp!=null&&temp!=""){
                temp = base64.base64decode(temp);
                temp = decodeURI(temp);
                var ttemp = eval(temp);
                // console.log(ttemp);
                permissions = ttemp;
            };
        };
        for(var i=0;i<permissions.length;i++){
            var resourceType = permissions[i].resourceType;
            if(resourceType == "/operationmanage/workordermanage/workspace"){
                isCanWorkSpace = true;
            };
            if(resourceType == "/operationmanage/workordermanage/autoworkorderrules"){
                isCanAutoworkorderRules = true;
            };
            if(resourceType == "/operationmanage/workordermanage/createworkorder"){
                isCanShow = true;
            };
        };

        if(isCanWorkSpace){
            var spaceItem = (<a className="list-group-item" id="eToMyWorkSpace" onClick={this._handleOnClick} style={{cursor:'pointer'}} key="1">工作台</a>);
            list.push(spaceItem);
            treeList.push({id:1,name:"工作台",pid:0,toUrl:"operationManage/myWorkSpace"});
        };
        if (isCanAutoworkorderRules) {
            list.push(<a className="list-group-item" id="eToAutoWorkOrderRules" onClick={this._handleOnClick} style={{cursor:'pointer'}} key="2">自动工单规则</a>);
            treeList.push({id:2,name:"自动工单规则",pid:0,toUrl:"operationManage/autoWorkOrderRules"});
        };
        if (isCanShow) {
            if(workFlowTypes.length>0){
                for(var i=0;i<workFlowTypes.length;i++){
                    var id = workFlowTypes[i].RecId;
                    var name = workFlowTypes[i].Name;
                    if(id == curFlowId){
                        var data = (<a className="list-group-item" id={id} onClick={this._handleOnClick} style={{cursor:'pointer'}}>{"新建"+name}</a>);
                        var tdata = {id:i+3,name:"新建"+name,pid:0,toUrl:"operationManage/createOperation",flowId:id};
                        list.push(data);
                        treeList.push(tdata);
                    }else{
                        var data = (<a className="list-group-item" id={id} onClick={this._handleOnClick} style={{cursor:'pointer'}}>{"新建"+name}</a>);
                        var tdata = {id:i+3,name:"新建"+name,pid:0,toUrl:"operationManage/createOperation",flowId:id};
                        list.push(data);
                        treeList.push(tdata);
                    };
                };
            };
        };
        return(
            <div id='autoWorkOrderRulesView' className='overviewDiv'>
                <div className='leftListDiv col-md-1'>
                <div className="assetManageListDiv">
                    <CommonTree data={treeList} curThreeNode={curThreeNode} preThreeNode={preThreeNode} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                      init_detailData={param =>dispatch(operationActions.init_detailData(param))} isOperationMark="1" canUpdate={this.props.canUpdate} curName={this.props.curName}
                      setCanUpdate={param => dispatch(operationActions.setCanUpdate(param))} setCurName={data => dispatch(setCurName(data))}
                      set_curWorkFlowType={param =>dispatch(operationActions.set_curWorkFlowType(param))}
                      get_createOrderInfo={param =>dispatch(operationActions.get_createOrderInfo(param))}
                    />
                </div>
            </div>
            <AutoWorkOrderRulesView_desView equipmentType={equipmentType} monitorType={monitorType} automaticWorkOrder={automaticWorkOrder} get_automaticWorkOrderUI={()=>dispatch(operationActions.get_automaticWorkOrderUI())}
                del_automaticWorkOrder={dateObjec=>operationActions.del_automaticWorkOrder(dateObjec)} update_automaticWorkOrder={dateObjec=>dispatch(operationActions.update_automaticWorkOrder(dateObjec))}
                add_automaticWorkOrder={dateObjec=>dispatch(operationActions.add_automaticWorkOrder(dateObjec))} setCanUpdate={param => dispatch(operationActions.setCanUpdate(param))}/>
            </div>
        );
    }
});

// module.exports = AutoWorkOrderRulesView;
AutoWorkOrderRulesView.propTypes = {
  // curThreeNode: PropTypes.string.isRequired,
  // preThreeNode: PropTypes.string.isRequired,
  workFlowTypes: PropTypes.array.isRequired,
  curWorkFlowId: PropTypes.string.isRequired,
  equipmentType: PropTypes.array.isRequired,
  monitorType: PropTypes.array.isRequired,
  automaticWorkOrder: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { curThreeNode, preThreeNode,curName } = state.navbarReducer
  const { workFlowTypes, curWorkFlowId, equipmentType, monitorType, automaticWorkOrder,canUpdate } = state.operationReducer

  return {
    curThreeNode,
    preThreeNode,
    workFlowTypes,
    curWorkFlowId,
    equipmentType,
    monitorType,
    automaticWorkOrder,
    canUpdate:canUpdate,
    curName
  }
}

export default connect(mapStateToProps)(AutoWorkOrderRulesView)
