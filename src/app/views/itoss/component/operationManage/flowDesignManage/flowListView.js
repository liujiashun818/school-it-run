/**
 * Created by  on 2016/01/20.
 * 流程设计
 */

require('bootstrap');
import React from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;

import { connect } from 'react-redux'
import * as flowDesignAction from '../../../../../actions/flowdesign_action'

import FlowListView_desView from './flowListView_desView';
//var ConfirmDeleteUserModal = require('./confirmDeleteUserModal');

var FlowListView = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },
  componentWillMount: function() {
      //this.getFlux().actions.YFTFlowDesignActions.get_workFlowName_flow();
      this.props.dispatch(flowDesignAction.get_workFlowName_flow());
      this.props.dispatch(flowDesignAction.get_workOrderTemplates());
  },
//  <ConfirmDeleteUserModal />
  render:function(){
    const { dispatch } = this.props;
    return (
        <div id='flowListView' className='overviewDiv'>
          <FlowListView_desView flowObjects={this.props.flowObjects}
            set_currFlow={data =>dispatch(flowDesignAction.set_currFlow(data))}
            set_flowOnlyShow={data =>dispatch(flowDesignAction.set_flowOnlyShow(data))}
            set_flowPanel={data =>dispatch(flowDesignAction.set_flowPanel(data))}
            delete_flowDesignPicData_flow={param => dispatch(flowDesignAction.delete_flowDesignPicData_flow(param))}
            get_workFlowName_flow={param => dispatch(flowDesignAction.get_workFlowName_flow())}
            get_flowDesignPicDataByName_flow={param => dispatch(flowDesignAction.get_flowDesignPicDataByName_flow(param))}
            get_workOrderTemplatesData = {this.props.workOrderTemplatesData}
            set_workOrderTemplatesId = {data =>dispatch(flowDesignAction.set_workOrderTemplatesId(data))}
          />
        </div>
    );
  }
});

function mapResourceState(state) {
  const {flowObjects,workOrderTemplatesData} = state.flowDesignReducer
  return {
    flowObjects:flowObjects,
    workOrderTemplatesData:workOrderTemplatesData
  }
}

export default connect(mapResourceState)(FlowListView)
