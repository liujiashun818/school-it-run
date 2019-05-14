/**
* Created by Yuchen  2016/02/18.
* 资产维保
*/

import React from 'react'
var ReactDOM = require('react-dom');
var Store = require('./../../../../server/store.js');
var base64 = require('./../../../../utils/base64.js');
var util = require('./../../../../utils/util.js');
require('bootstrap');

var ReactRouter = require('react-router');
var History = ReactRouter.History;

var dateChange = require('../../../../utils/dateChange.js');
import AssetManageList from './assetList';
import AssetMaintain_desView from './assetMaintain_desView';

import { connect } from 'react-redux'
import * as assetManageAction from '../../../../actions/assetManage_action'
import * as indexAction from '../../../../actions/index_action'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../actions/navbar_action'

var AssetMaintain = React.createClass({
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    getInitialState: function(){
        return {
            showMainDiv: true
        }
    },
    componentWillMount:function(){
      // this.props.dispatch(setCurName("资产维保"));
    },
    componentDidMount: function() {
        dateChange.changeViewStyle();
        if(document.getElementById('assetMaintainDivPage') != null) {
            document.getElementById('assetMaintainDivPage').style.height = $(window).height() - 110 - 30 + 'px';
        };

        // if(document.getElementById('assetMaintain')!=null) document.getElementById('assetMaintain').className = 'list-group-item active';

        //获取权限集合
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            this.props.dispatch(assetManageAction.set_permissions_asset(temp));
            var valid = util.hasPermission(temp,"/assetmanage/asset/assetmaintain");
            if(valid == null){
                this.setState({
                    showMainDiv: false
                });
            }
        }
    },
    render: function() {
        const { dispatch } = this.props;
        var mainDiv = this.state.showMainDiv?<AssetMaintain_desView DefaultTypeID_assetMaintain={this.props.DefaultTypeID_assetMaintain}
          Permissions={this.props.Permissions} AssetList={this.props.AssetList}
          AssetCount={this.props.AssetCount} Filter_TypeList={this.props.Filter_TypeList} Filter_AreaList={this.props.Filter_AreaList}
          get_asset_data={data => dispatch(assetManageAction.get_asset_data(data))}
          set_linshiData={data =>dispatch(indexAction.set_linshiData(data))}
          set_linshiNode={data =>dispatch(indexAction.set_linshiNode(data))}
          set_assetDetailID={param =>dispatch(assetManageAction.set_assetDetailID(param))}
          setCurName={data => dispatch(setCurName(data))}
          set_default_filter_value_assetMaintain={param =>assetManageAction.set_default_filter_value_assetMaintain(param)} />:"";
        return (
            <div id='assetMaintainDivPage' className='overviewDiv'>
                <div className='leftListDiv col-md-1'>
                    <AssetManageList curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode} curName={this.props.curName}
                      setCurName={data => dispatch(setCurName(data))} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                      onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}/>
                </div>
                {mainDiv}
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('assetMaintainDivPage') != null) {
        document.getElementById('assetMaintainDivPage').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

function mapResourceState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { DefaultTypeID_assetMaintain,Permissions,AssetList,AssetCount,Filter_TypeList,Filter_AreaList } = state.assetManageReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    DefaultTypeID_assetMaintain:DefaultTypeID_assetMaintain,
    Permissions:Permissions,
    AssetList:AssetList,
    AssetCount:AssetCount,
    Filter_TypeList:Filter_TypeList,
    Filter_AreaList:Filter_AreaList
  }
}

export default connect(mapResourceState)(AssetMaintain)
