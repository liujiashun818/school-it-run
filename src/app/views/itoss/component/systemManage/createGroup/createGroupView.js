require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as systemAction from '../../../../../actions/system_action'

import GroupForm from './createGroupFormView.js';
import LeftTree from '../../monitorTree/groupTree.js';

var createGroupView = React.createClass({
  mixins: [History],
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },
  componentWillMount:function(){
    const { dispatch } = this.props;
    //dispatch(systemAction.get_allGroup());
    //dispatch(systemAction.get_createInfo(this));
    dispatch(systemAction.get_sysMapData());
  },
  render:function(){
    const { dispatch } = this.props;
    return (
      <div id='createGroup' className='overviewDiv'>
        <div className='leftListDiv col-md-2'>
          <LeftTree
            treeData={this.props.groups}

            init_tree={data => dispatch(systemAction.init_tree(data))}
            init_data={data => dispatch(systemAction.init_data(data))}
            set_parentCode={data => dispatch(systemAction.set_parentCode(data))}
            setCurGroupData={data => dispatch(systemAction.set_curGroupData(data))}
            get_allGroup={param => dispatch(systemAction.get_allGroup(param))}
          />
        </div>
        <GroupForm
          curTree={this.props.curTree} createInfo={this.props.createInfo} pcodeMark={this.props.pcodeMark}
          curGroupData={this.props.curGroupData} parentCode={this.props.parentCode} sysMapDataValue={this.props.sysMapDataValue}
          groups={this.props.groups} roleTree={this.props.roleTree} isUpdate={this.props.isUpdate}
          sysMapData={this.props.sysMapData}

          init_roleTree={param => dispatch(systemAction.init_roleTree(param))}
          set_parentCode={param => dispatch(systemAction.set_parentCode(param))}
          delete_groupAll={param => dispatch(systemAction.delete_groupAll(param))}
          delete_groupById={param => dispatch(systemAction.delete_groupById(param))}
          save_createGroup={param => dispatch(systemAction.save_createGroup(param))}
          set_sysMapDataValue={param => dispatch(systemAction.set_sysMapDataValue(param))}
          get_createInfo={param => dispatch(systemAction.get_createInfo(param))}
        />
      </div>
    );
  }
});

function mapOrgnizationState(state) {
  const { groups,curGroupData,curTree,createInfo,pcodeMark,parentCode,sysMapDataValue,roleTree,isUpdate,sysMapData } = state.systemReducer;
  return {
    groups:groups,
    curGroupData:curGroupData,
    curTree:curTree,
    createInfo:createInfo,
    pcodeMark:pcodeMark,
    parentCode:parentCode,
    sysMapDataValue:sysMapDataValue,
    roleTree:roleTree,
    sysMapData:sysMapData,
    isUpdate:isUpdate
  }
}

export default connect(mapOrgnizationState)(createGroupView)
