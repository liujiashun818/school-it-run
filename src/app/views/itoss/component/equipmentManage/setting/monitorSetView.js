/**
* 资源监测-设置-其他监测器设置
*/

require('bootstrap');
import React from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;
import { connect } from 'react-redux'
import SettingLeftList from './settingLeftList';
import MonitorSetRightView from'./monitorSetRightView';

import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'

var MonitorSetView = React.createClass({
    componentDidMount: function() {
        if(document.getElementById('settingView') != null) {
            document.getElementById('settingView').style.height = $(window).height() - 110 - 30 + 'px';
        }
        document.getElementById('settingList_MonitorConfig').className = 'list-group-item active';
    },
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    render: function() {
        const { curThreeNode } = this.props;
        const { preThreeNode } = this.props;
        const { dispatch } = this.props;
        return (
            <div id='settingView' className='overviewDiv'>
                <div className='leftListDiv col-md-1'>
                    <SettingLeftList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.setCurName}
                    setCurName={data => dispatch(setCurName(data))} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                    onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}/>
                </div>
                <MonitorSetRightView />
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('settingView') != null) {
        document.getElementById('settingView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

function mapResourceState(state) {
  const { curThreeNode } = state.navbarReducer
  const { preThreeNode,curName } = state.navbarReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName
  }
}

export default connect(mapResourceState)(MonitorSetView)
