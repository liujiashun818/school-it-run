require('bootstrap');
import React from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;

import { connect } from 'react-redux'
import * as flowDesignAction from '../../../../../actions/flowdesign_action'

import FlowDesignEditFormView from './flowDesignEditFormView';

var FlowDesignEditView = React.createClass({
  mixins: [History],
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },
  // componentWillMount: function() {
  //   var data1 = this.props.currFlowData;
  //   var currflowname ="";
  //   if(data1){
  //     if(typeof(data1)=='string'){
  //        currflowname = data1;
  //     }else {
  //       currflowname = data1.name;
  //     }
  //   }
  //   //this.getFlux().actions.YFTFlowDesignActions.get_flowDesignPicDataByName_flow(currflowname);
  //   this.props.dispatch(flowDesignAction.get_flowDesignPicDataByName_flow(currflowname));
  // },
  componentDidMount: function() {
      var data1 = this.props.currFlowData;
      var currflowname ="";
      if(data1){
        if(typeof(data1)=='string'){
           currflowname = data1;
        }else {
          currflowname = data1.name;
        }
      }
      //this.getFlux().actions.YFTFlowDesignActions.get_flowDesignPicDataByName_flow(currflowname);
      //this.props.dispatch(flowDesignAction.get_flowDesignPicDataByName_flow(currflowname));
  },
  render:function(){
    //var fl = this.getFlux();
    var data1 = this.props.currFlowData;
    var currflowname ="";
    if(data1){
      if(typeof(data1)=='string'){
         currflowname = data1;
      }else {
        currflowname = data1.name;
      }

    }
    const { dispatch } = this.props;
    return (
        <div id='flowDesignEditView' className='overviewDiv'>
          <FlowDesignEditFormView flowName={currflowname} flowDesignPicData={this.props.flowDesignPicData} flowDeignResultData={this.props.flowDeignResultData}
            update_flowDesignPicData_flow={data =>dispatch(flowDesignAction.update_flowDesignPicData_flow(data))}
            delete_flowDesignPicData_flow={param => dispatch(flowDesignAction.delete_flowDesignPicData_flow(param))}
            currFlowData={this.props.currFlowData} flowOnlyShow={this.props.flowOnlyShow} flowPanelState={this.props.flowPanelState}
            set_flowPanel={param => dispatch(flowDesignAction.set_flowPanel(param))}
            workOrderTemplatesId = {this.props.workOrderTemplatesId}
            flowDesignTemplatesId = {this.props.flowDesignTemplatesId}
          />
        </div>
    );
  }
});

function mapResourceState(state) {
  const {currFlowData,flowDesignPicData,flowDeignResultData,flowOnlyShow,flowPanelState,workOrderTemplatesId,flowDesignTemplatesId  } = state.flowDesignReducer
  return {
    currFlowData:currFlowData,
    flowDesignPicData:flowDesignPicData,
    flowDeignResultData:flowDeignResultData,
    flowOnlyShow:flowOnlyShow,
    flowPanelState:flowPanelState,
    workOrderTemplatesId:workOrderTemplatesId,
    flowDesignTemplatesId:flowDesignTemplatesId
  }
}

export default connect(mapResourceState)(FlowDesignEditView)
