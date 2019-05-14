/**
* Created by Yuchen  2016/01/15.
* 资产监控同步
*/

import React from 'react'
var ReactDOM = require('react-dom');
var Store = require('./../../../../server/store.js');
var base64 = require('./../../../../utils/base64.js');
var util = require('./../../../../utils/util.js');
require('bootstrap');

var ReactRouter = require('react-router');
var History = ReactRouter.History;

import { connect } from 'react-redux'
import * as assetManageAction from '../../../../actions/assetManage_action'
import { set_linshiData,set_linshiNode } from '../../../../actions/index_action'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../actions/navbar_action'

import AssetManageList from './assetList';
import Monitor_desView from './monitor_desView';
import AssetResponseTable from './monitor_desView_responseModal';

var Monitor = React.createClass({
    mixins: [History],//, FluxMixin, StoreWatchMixin("AssetManageStore")
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    getInitialState: function(){
        return {
            showMainDiv: true
        }
    },
    componentWillMount:function(){
      // this.props.dispatch(setCurName("监控同步"));
    },
    componentDidMount: function() {
        if(document.getElementById('assetMonitor') != null) {
            document.getElementById('assetMonitor').style.height = $(window).height() - 110 - 30 + 'px';
        };
        // if(document.getElementById('monitor') != null) document.getElementById('monitor').className = 'list-group-item active';
        //获取权限集合
        var temp = Store.get("PERMISSIONS");
        var valid = null;
        if(temp && temp != null && temp != ""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            this.props.dispatch(assetManageAction.set_permissions_asset(temp));
            var valid = util.hasPermission(temp,"/assetmanage/asset/monitorsync");
            if(valid == null){
                this.setState({
                    showMainDiv: false
                });
            }
        }
        //valid = util.hasPermission(this.state.itoss.Permissions,"/assetmanage/asset/assetlist/edit");//有编辑资产的权限
        valid = util.hasPermission(temp,"/assetmanage/asset/assetlist/edit");//有编辑资产的权限
        var backValid = util.hasPermission(temp,"/assetmanage/asset/statistic");
        if(valid == null){
            $("#btn-save").hide();
        }
        if(backValid == null){
            $(".home-link").hide();
        }
    },
    render: function() {
        const { dispatch } = this.props;
        var mainDiv = this.state.showMainDiv?<Monitor_desView showResponseModal={this._showResponseModal} Permissions={this.props.Permissions}
                    DevList={this.props.DevList} DevCount={this.props.DevCount}
                    create_monitor_asset={data=>dispatch(assetManageAction.create_monitor_asset(data))}
                    create_all_monitor_asset={data => dispatch(assetManageAction.create_all_monitor_asset(data))}
                    set_linshiData={data =>dispatch(set_linshiData(data))} set_linshiNode={data=>dispatch(set_linshiNode(data))}
                    setCurName={data => dispatch(setCurName(data))}
                    get_monitor_data={data =>dispatch(assetManageAction.get_monitor_data(data))} />:"";
        return (
            <div id='assetMonitor' className='overviewDiv'>
                <AssetResponseTable  Permissions={this.props.Permissions} MonitorResponse_failureList={this.props.MonitorResponse_failureList}
                  MonitorResponse_success={this.props.MonitorResponse_success}
                  set_linshiData={data =>dispatch(set_linshiData(data))} set_linshiNode={data=>dispatch(set_linshiNode(data))}
                  setCurName={data => dispatch(setCurName(data))}
                />
                <div className='leftListDiv col-md-1'>
                    <AssetManageList  curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode} curName={this.props.curName}
                    setCurName={data => dispatch(setCurName(data))} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                    onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))} />
                </div>
                {mainDiv}
            </div>
        );
    },
    _showResponseModal: function(resp){
        $("#assetModal-monitor").modal("hide");
        $("#assetModal-monitor-response").modal("show");
    },
});

$(window).resize(function () {
    if(document.getElementById('assetMonitor') != null) {
        document.getElementById('assetMonitor').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

function mapResourceState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { DevList,Permissions,DevCount, MonitorResponse_failureList,MonitorResponse_success } = state.assetManageReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    DevList:DevList,
    Permissions:Permissions,
    DevCount:DevCount,
    MonitorResponse_failureList:MonitorResponse_failureList,
    MonitorResponse_success:MonitorResponse_success,
    curName:curName
  }
}

export default connect(mapResourceState)(Monitor)
// module.exports = Monitor;
