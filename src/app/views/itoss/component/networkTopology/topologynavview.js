/**
* xuexue.yin  2016/01/14.
* 拓扑导航
*/

require('bootstrap');
import React from 'react'
var ReactRouter = require('react-router');

import { connect } from 'react-redux'
import * as topologyNavAction from '../../../../actions/topologyNav_action'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../actions/navbar_action'

import TopologyNavView_desView from './topologynavview_desView';
import TopologSelectRoleModal from './topologSelectRoleModal';
import TopologSelectRoleNetModal from './topologSelectRoleNetModal';

var TopologyNavView = React.createClass({
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    componentDidMount: function() {
        if(document.getElementById('topologynavview') != null) {
            document.getElementById('topologynavview').style.height = $(window).height() - 110 - 30 + 'px';
        };
    },
    render:function(){
      const { dispatch } = this.props;
      return(
          <div id='topologynavview' className='overviewDiv'>
            <TopologSelectRoleModal nodePoint={this.props.nodePoint} nodeToken={this.props.nodeToken} onSetInitNodeToken={data =>dispatch(topologyNavAction.onSetInitNodeToken(data))} />
            <TopologSelectRoleNetModal nodePoint={this.props.nodePoint} nodeToken={this.props.nodeToken} onSetInitNodeToken={data =>dispatch(topologyNavAction.onSetInitNodeToken(data))} />
            <TopologyNavView_desView nodeToken={this.props.nodeToken} tpjbdictionaryData={this.props.tpjbdictionaryData}
                initMAPLV={this.props.initMAPLV} mydeviceMaps={this.props.mydeviceMaps} deviceMaps={this.props.deviceMaps}
                onGetTpjbDictionaryData={data=>dispatch(topologyNavAction.onGetTpjbDictionaryData())}
                getAllMapMarkersList={param =>dispatch(topologyNavAction.getAllMapMarkersList(param))}
                getMapNodeToken={param =>dispatch(topologyNavAction.getMapNodeToken(param))}
                getMapNodeTokenNew={param =>dispatch(topologyNavAction.getMapNodeTokenNew(param))}
                onGetUserInfoByToken={param =>dispatch(topologyNavAction.onGetUserInfoByToken(param))}
                onSetNodePoint={param =>dispatch(topologyNavAction.onSetNodePoint(param))} />
          </div>
      );
    }
});

$(window).resize(function () {
    if(document.getElementById('topologynavview') != null) {
        document.getElementById('topologynavview').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

function mapResourceState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { nodePoint,nodeToken,tpjbdictionaryData,initMAPLV,mydeviceMaps,deviceMaps } = state.topologyNavReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    nodePoint:nodePoint,
    nodeToken:nodeToken,
    tpjbdictionaryData:tpjbdictionaryData,
    initMAPLV:initMAPLV,
    mydeviceMaps:mydeviceMaps,
    deviceMaps:deviceMaps,
    curName:curName
  }
}

export default connect(mapResourceState)(TopologyNavView)
