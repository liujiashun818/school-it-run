/**
* Created by Yuchen  2016/01/08.
*/

var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');
require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');

var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../actions/navbar_action'
import * as assetManageAction from '../../../../actions/assetManage_action';

import AssetLeftList from './assetList.js';
import AssetManageListTable from './statistic_desView_assetTable.js';

var AssetListPage = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    getInitialState: function() {
        return {
            origin_filter: {
                name: "",
                type: "全部",
                area: "全部",
                search: "",
            },
            from: 1,
            numPerPage: 25,
            currentPage: 1,
            sort_name: "",
            sort_order: "",
        }
    },
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    componentWillMount:function(){
      // this.props.dispatch(setCurName("资产统计列表"));
    },
    componentDidMount: function() {
      var _this = this;
      var data = {
          from: this.state.from-1,
          to: this.state.numPerPage,
      };
      var typeID = this.props.DefaultTypeID_assetList;
      if(typeID&&typeID!="-") data.typeID = typeID;
      const { dispatch, DefaultTypeID_assetList } = this.props;
      dispatch(assetManageAction.get_asset_data({
        data: data,
        callback: function(resp){
            var origin_filter = _this.state.origin_filter;
            for(var i in resp.filter_typeList){
                if(resp.filter_typeList[i].RecId==DefaultTypeID_assetList){
                    origin_filter.type = resp.filter_typeList[i].TypeName;
                }
            };
            _this.setState({
                origin_filter: origin_filter,
            });
        }
      }));
      if(document.getElementById('assetListPageDivPage') != null) {
          document.getElementById('assetListPageDivPage').style.height = $(window).height() - 110 - 30 - 150 + 'px';
          document.getElementById('assetMaintainDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
      };
      // if(document.getElementById('statisticList')!=null) document.getElementById('statisticList').className = 'list-group-item active';
    },
    _onLoadTableHeader: function(param){
      var _this = this;
      const { dispatch } = this.props;
      var DOMNode = $(ReactDOM.findDOMNode(this));
      var B = DOMNode.find('button[name="refresh"]');
      B.unbind("click");
      B.click(function(e){//按下刷新按钮
          _this.setState({
              from: 1,
              currentPage: 1,
              origin_filter: {
                  name: "",
                  type: "全部",
                  area: "全部",
                  search: "",
              },
          },function(){
              data = {
                  from: _this.state.from-1,
                  to: _this.state.numPerPage,
              };
              dispatch(assetManageAction.get_asset_data({
                  data: data,
              }));
          })
      })
    },
    render: function() {
      const { curThreeNode,preThreeNode,curName } = this.props;
      const { dispatch } = this.props;
      return (
          <div id='assetListPageDivPage' className='overviewDiv'>
              <div className='leftListDiv col-md-1'>
                  <AssetLeftList curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={curName}
                    setCurName={data => dispatch(setCurName(data))} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                    onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                  />
              </div>
              <AssetManageListTable
                onLoadTableHeader={this._onLoadTableHeader} Permissions={this.props.Permissions} curThreeNode={curThreeNode}
                setState={this._setState} AssetCount={this.props.AssetCount} Filter_TypeList={this.props.Filter_TypeList}
                origin_filter={this.state.origin_filter} Filter_AreaList={this.props.Filter_AreaList}
                state={this.state} AssetList={this.props.AssetList} DefaultTypeID_assetList={this.props.DefaultTypeID_assetList}
                set_assetDetailID={data => dispatch(assetManageAction.set_assetDetailID(data))}
                set_default_filter_value_assetList={data => dispatch(assetManageAction.set_default_filter_value_assetList(data))}
                get_asset_data={param => dispatch(assetManageAction.get_asset_data(param))}
                onSetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                onSetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                setCurName={data => dispatch(setCurName(data))}
              />
          </div>
      );
    },
    _setState: function(data,callback){
        if(!data) return;
        if(callback) this.setState(data,callback);
        else this.setState(data);
    },
});

$(window).resize(function () {
    if(document.getElementById('assetListPageDivPage') != null) {
        document.getElementById('assetListPageDivPage').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

function mapAssetListState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { DefaultTypeID_assetList,AssetList,AssetCount,Permissions,Filter_TypeList,Filter_AreaList } = state.assetManageReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    DefaultTypeID_assetList:DefaultTypeID_assetList,
    AssetList:AssetList,
    AssetCount:AssetCount,
    Permissions:Permissions,
    Filter_TypeList:Filter_TypeList,
    Filter_AreaList:Filter_AreaList
  }
}

export default connect(mapAssetListState)(AssetListPage)
