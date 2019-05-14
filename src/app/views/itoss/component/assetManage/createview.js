/**
* Created by Yuchen  2016/01/08.
* 新建资产
*/

require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Store = require('./../../../../server/store.js');
var base64 = require('./../../../../utils/base64.js');
var util = require('./../../../../utils/util.js');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as assetManageAction from '../../../../actions/assetManage_action'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../actions/navbar_action'

import AssetManageList from './assetList';
import Createview_desView from './createview_desView';
import AssetManageTable from './createview_desView_tableModal';

var CreateView = React.createClass({
    mixins: [History],
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
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
    componentDidMount: function() {
        // this.props.dispatch(setCurName("资产统计列表"));
        if(document.getElementById('assetCreateView') != null) {
            document.getElementById('assetCreateView').style.height = $(window).height() - 110 - 30 + 'px';
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
            var valid = util.hasPermission(temp,"/assetmanage/asset/assetlist/add");
            var backValid = util.hasPermission(temp,"/assetmanage/asset/statistic");
            if(valid==null){
                this.setState({
                    showMainDiv: false
                });
            }
            else if(backValid==null){
                $(".home-link").hide();
            }
        }
    },
    render:function(){
      const { dispatch } = this.props;
      var mainDiv = this.state.showMainDiv;
      if(mainDiv){
        return(
            <div id='assetCreateView' className='overviewDiv'>
                <AssetManageTable
                  DevList={this.props.DevList}
                  get_devList_data={param => dispatch(assetManageAction.get_devList_data(param))}
                 />
                <div className='leftListDiv col-md-1'>
                    <AssetManageList curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
                      onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                      curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
                    />
                </div>
                <Createview_desView
                  AssetTypeList={this.props.AssetTypeList} AreaIdList={this.props.AreaIdList} StatusList={this.props.StatusList}
                  Permissions={this.props.Permissions} curThreeNode={this.props.curThreeNode}
                  get_create_data={param => dispatch(assetManageAction.get_create_data(param))}
                  create_asset={data => dispatch(assetManageAction.create_asset(data))}
                  onSetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                  onSetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                  setCurName={data => dispatch(setCurName(data))}
                />
            </div>
        );
      }else{
        return(
          <div id='assetCreateView' className='overviewDiv'>
            <AssetManageTable
              DevList={this.props.DevList}
              get_devList_data={param => dispatch(assetManageAction.get_devList_data(param))}
            />
            <div className='leftListDiv col-md-1'>
              <AssetManageList curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode} curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
                onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}/>
            </div>
          </div>
        );
      };
    }
});

$(window).resize(function () {
    if(document.getElementById('assetCreateView') != null) {
        document.getElementById('assetCreateView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

function mapCreateViewState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { DevList,AssetTypeList,AreaIdList,StatusList,Permissions } = state.assetManageReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    DevList:DevList,
    AssetTypeList:AssetTypeList,
    AreaIdList:AreaIdList,
    StatusList:StatusList,
    Permissions:Permissions
  }
}

export default connect(mapCreateViewState)(CreateView)
