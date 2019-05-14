/**
* Created by Yuchen  2016/01/15.
*/

var React = require('react');
var ReactDOM = require('react-dom');
var Store = require('./../../../../server/store.js');
var base64 = require('./../../../../utils/base64.js');
var util = require('./../../../../utils/util.js');
require('bootstrap');

var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as assetManageAction from '../../../../actions/assetManage_action'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../actions/navbar_action'

import AssetManageList from './assetList';
import Detail_desView from './detail_desView';
import AssetDetailTable from './detail_desView_tableModal';

var Detail = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return {
            showMainDiv: true
        }
    },
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    componentDidMount: function() {
        // this.props.dispatch(setCurName("资产统计列表"));
        if(document.getElementById('assetMonitor') != null) {
            document.getElementById('assetMonitor').style.height = $(window).height() - 110 - 30 + 'px';
        };
        //if(document.getElementById('statisticList') != null) document.getElementById('statisticList').className = 'list-group-item active';
        //获取权限集合
        const { dispatch }=this.props;
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            dispatch(assetManageAction.set_permissions_asset(temp));
        }
        var valid1 = util.hasPermission(temp,"/assetmanage/asset/assetlist/edit");//有编辑资产的权限
        var valid2 = util.hasPermission(temp,"/assetmanage/asset/assetlist");//有查看资产的权限
        var backValid = util.hasPermission(temp,"/assetmanage/asset/statistic");
        if(valid1==null){
            $("#btn-save").attr("disabled","disabled");
        }
        if(valid2==null){
            this.setState({
                showMainDiv: false
            });
        }
        if(backValid==null){
            $(".home-link").hide();
        }
    },
    render: function() {
      const { dispatch } = this.props;
      var mainDiv = this.state.showMainDiv;
        // var mainDiv = this.state.showMainDiv?<Detail_desView />:"";
      if(mainDiv){
        return (
            <div id='assetDetail' className='overviewDiv'>
                <AssetDetailTable
                  DevList={this.props.DevList}
                  get_devList_data={param => dispatch(assetManageAction.get_devList_data(param))}
                />
                <div className='leftListDiv col-md-1'>
                    <AssetManageList curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode} curName={this.props.curName}
                    setCurName={data => dispatch(setCurName(data))} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                    onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}/>
                </div>
                <Detail_desView
                  AssetDetailID={this.props.AssetDetailID} SingleAsset={this.props.SingleAsset} AssetTypeList={this.props.AssetTypeList} AreaIdList={this.props.AreaIdList}
                  StatusList={this.props.StatusList} Permissions={this.props.Permissions} MaintainOrderList={this.props.MaintainOrderList}
                  get_create_data={param => dispatch(assetManageAction.get_create_data(param))}
                  get_detail_data={param => dispatch(assetManageAction.get_detail_data(param))}
                  update_single_asset={data => dispatch(assetManageAction.update_single_asset(data))}
                  set_maintainDetailID={param => dispatch(assetManageAction.set_maintainDetailID(param))}
                  onSetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                  onSetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                  setCurName={data => dispatch(setCurName(data))}
                />
            </div>
        );
      }else{
        return (
            <div id='assetDetail' className='overviewDiv'>
                <AssetDetailTable
                  DevList={this.props.DevList}
                  get_devList_data={param => dispatch(assetManageAction.get_devList_data(param))}
                />
                <div className='leftListDiv col-md-1'>
                    <AssetManageList curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
                      onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                      curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
                    />
                </div>
            </div>
        );
      };
    }
});

$(window).resize(function () {
    if(document.getElementById('assetMonitor') != null) {
        document.getElementById('assetMonitor').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

function mapDetailViewState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { DevList,AssetDetailID,AssetTypeList,AreaIdList,StatusList,Permissions,SingleAsset,MaintainOrderList } = state.assetManageReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    DevList:DevList,
    AssetTypeList:AssetTypeList,
    AreaIdList:AreaIdList,
    StatusList:StatusList,
    Permissions:Permissions,
    AssetDetailID:AssetDetailID,
    SingleAsset:SingleAsset,
    MaintainOrderList:MaintainOrderList
  }
}

export default connect(mapDetailViewState)(Detail)
