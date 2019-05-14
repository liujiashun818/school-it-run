/**
* Created by Yuchen  2016/01/08.
* 资产统计
*/

require('bootstrap');
import React from 'react'
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var Store = require('./../../../../server/store');
var base64 = require('./../../../../utils/base64');
var util = require('./../../../../utils/util');
var dateChange = require('../../../../utils/dateChange.js');

import AssetManageList from './assetList';
import Overview_desView from './statistic_desView';

import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../actions/navbar_action'
import * as assetManageAction from '../../../../actions/assetManage_action';

var Overview = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return {
            showMainDiv: true
        }
    },
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    componentWillMount:function(){
      // this.props.dispatch(setCurName("资产统计"));
    },
    componentDidMount: function() {
        dateChange.changeViewStyle();
        const { dispatch }=this.props;
        if(document.getElementById('assetStatistic') != null) {
            document.getElementById('assetStatistic').style.height = $(window).height() - 110 - 30 + 'px';
        };
        // if(document.getElementById('statistic')!=null) document.getElementById('statistic').className = 'list-group-item active';
        //获取权限集合
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            dispatch(assetManageAction.set_permissions_asset(temp));
            // this.getFlux().actions.AssetManageActions.set_permissions(temp);
            var valid = util.hasPermission(temp,"/assetmanage/asset/statistic");
            if(valid==null){
                this.setState({
                    showMainDiv: false
                });
            }
        }
        $(window).resize(function () {
          if(document.getElementById('assetStatistic') != null) {
            document.getElementById('assetStatistic').style.height = $(window).height() - 110 - 30 + 'px';
          }
        });
    },
    render: function() {
      var mainDiv = "";
      const { curThreeNode } = this.props;
      const { preThreeNode } = this.props;
      const { dispatch } = this.props;
      if(this.state.showMainDiv){
        return (
          <div id='assetStatistic' className='overviewDiv'>
            <div className='leftListDiv col-md-1'>
              <AssetManageList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName}
                setCurName={data => dispatch(setCurName(data))} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}/>
            </div>
            <Overview_desView
              permissions={this.props.Permissions} AssetTypeList={this.props.AssetTypeList}
              get_statistic_data={param => dispatch(assetManageAction.get_statistic_data(param))}
              set_default_filter_value_assetMaintain={param => dispatch(assetManageAction.set_default_filter_value_assetMaintain(param))}
              set_default_filter_value_assetList={param => dispatch(assetManageAction.set_default_filter_value_assetList(param))}
              set_assetDetailID={param => dispatch(assetManageAction.set_assetDetailID(param))}
              onSetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
              onSetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
              setCurName={data => dispatch(setCurName(data))}
            />
          </div>
        );
      }else{
        return (
          <div id='assetStatistic' className='overviewDiv'>
            <div className='leftListDiv col-md-1'>
              <AssetManageList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName}
              setCurName={data => dispatch(setCurName(data))} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
              onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}/>
            </div>
          </div>
        );
      };
    }
});

function mapAsseteState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { Permissions,AssetTypeList } = state.assetManageReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    Permissions:Permissions,
    AssetTypeList:AssetTypeList,
    curName:curName
  }
}

export default connect(mapAsseteState)(Overview)
