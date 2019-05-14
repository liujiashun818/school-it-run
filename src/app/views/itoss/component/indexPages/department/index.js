/*
页面外框框架，厅级首页
获取数据
*/
'use strict';
require('bootstrap');
import React from 'react'
// var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var DepartmentIndexLine1 = require('./indexLine1.js');
var DepartmentIndexLine2 = require('./indexLine2.js');
var DepartmentIndexLine3 = require('./indexLine3.js');

import { connect } from 'react-redux'
import * as indexActions from '../../../../../actions/index_action'
import * as navActions from '../../../../../actions/navbar_action'
import * as deviceActions from '../../../../../actions/deviceMonitor_action'
import * as assetActions from '../../../../../actions/assetManage_action'
import * as operationActions from '../../../../../actions/operation_action'
import * as flowActions from '../../../../../actions/operationflow_action'
import * as noticeActions from '../../../../../actions/notice_action'

var departmentIndex = React.createClass({
  // mixins: [History, FluxMixin, StoreWatchMixin("YFTIndexStore")],
  // getStateFromFlux: function() {
  //     var flux = this.getFlux();
  //     return {
  //         itoss:flux.store("YFTIndexStore").getState()
  //     }
  // },
  getInitialState:function(){
    return {
      eqpName:"摄像机"
    };
  },
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },
  componentWillMount:function(){
    const { dispatch } = this.props;
    dispatch(indexActions.getDepartIndexData());
  //   this.getFlux().actions.YFTIndexActions.get_departmentIndexData();
  },
  componentDidMount:function(){
    if($('#departmentIndexDiv') != null) {
      var height = $(window).height() - 110 - 30 + 'px';
      $('#departmentIndexDiv').css("height",height);
    }
    $("#tab-li-0-1").hide();
    $(window).resize(function () {
      if($('#departmentIndexDiv') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
        $('#departmentIndexDiv').css("height",height);
      }
    });
  },
  changePicSpan:function(e){
    e.preventDefault();
    $(".picToggleDiv").find("span").attr("class","normalSpan");
    $(e.target).attr("class","curSpan");
    var text = $(e.target).text();
    var type = "";
    switch (text) {
      case "摄像机":
        type = "VIDEOALARMRESULT";
        break;
      case "DVR":
        type = "DVRALARMRESULT";
        break;
      case "NVR":
        type = "NVRALARMRESULT";
        break;
      case "编码器":
        type = "CODERALARMRESULT";
        break;
      case "网络设备":
        type = "NETWORK";
        break;
    }
    const { dispatch } = this.props;
    dispatch(indexActions.changeDeptIndexData(type));
    this.setState({eqpName:text});
  },
  render:function(){
    const { dispatch } = this.props;
    var departmentIndexData = this.props.departmentIndexData;
    var eqpName = this.state.eqpName;
    return (
      <div id='departmentIndexDiv' className='overviewDesViewDiv'>
        <DepartmentIndexLine1 data={departmentIndexData}
          onChangeData={e => this.changePicSpan(e)} eqpName={eqpName}
        />
        <DepartmentIndexLine2 data={departmentIndexData}/>
        <DepartmentIndexLine3 data={departmentIndexData}
          get_orderDetails={data => dispatch(operationActions.get_orderDetails(data))}
          setCurWorkFlowId={data => dispatch(flowActions.setCurWorkFlowId(data))}
          get_WorkFlowLogData={data => dispatch(flowActions.get_WorkFlowLogData(data))}
          get_WorkOrderProcessLogData={data => dispatch(flowActions.get_WorkOrderProcessLogData(data))}
          setCurrentNextPerson={data => dispatch(flowActions.setCurrentNextPerson(data))}
          setCurName={data => dispatch(navActions.setCurName(data))}
          setNoticeObj={data => dispatch(noticeActions.setNoticeObj(data))}
          setNoticeLimit={data => dispatch(noticeActions.setNoticeLimit(data))}
        />
      </div>
    );
  }
});

// departmentIndex.propTypes = {
//   // curOneNode: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired
// }

function mapDepartIndexState(state) {
  const { departmentIndexData } = state.indexReducer

  return {
    departmentIndexData:departmentIndexData
  }
}

export default connect(mapDepartIndexState)(departmentIndex)
