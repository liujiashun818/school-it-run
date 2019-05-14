/**
* Created by Yuchen  2016/01/08.
* 资产管理-资产左边菜单
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

var CommonTree = require('../monitorTree/commonTree');

var AssetList = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    getInitialState:function(){
      return {
        treeData:[]
      }
    },
    componentDidMount: function() {
        //获取权限集合
        var list = [];
        var temp = Store.get("PERMISSIONS");
        if(temp && temp !=null && temp !=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            // this.getFlux().actions.AssetManageActions.set_permissions(temp);
        }
        var valid1 = util.hasPermission(temp,"/assetmanage/asset/statistic");
        var valid3 = util.hasPermission(temp,"/assetmanage/asset/monitorsync");
        var valid4 = util.hasPermission(temp,"/assetmanage/asset/assetmaintain");
        var valid5 = util.hasPermission(temp,"/assetmanage/asset/assetlist");
        if(valid1==null) {
          $("#statistic").hide();
        }else{
          list.push({id:1,name:"资产统计",pid:0,toUrl:"assetManage/statistic"});
        };
        if(valid5==null){
          $("#monitor").hide();
        }else{
          list.push({id:2,name:"资产统计列表",pid:0,toUrl:"assetManage/assetList"});
        };
        if(valid3==null){
          $("#assetMaintain").hide();
        }else{
          list.push({id:3,name:"监控同步",pid:0,toUrl:"assetManage/monitorSync"});
        };
        if(valid4==null){
          $("#statisticList").hide();
        }else{
          list.push({id:4,name:"资产维保",pid:0,toUrl:"assetManage/assetMaintain"});
        };
        this.setState({treeData:list});
    },
    _handleOnClick: function(e) {
        if(e.target.id == 'statistic'){
          this.history.pushState(null,'assetManage/statistic');
        }
        else if(e.target.id == 'statisticList'){
          this.history.pushState(null,'assetManage/assetList');
        }
        else if(e.target.id == 'monitor'){
          this.history.pushState(null,'assetManage/monitorSync');
        }
        else if(e.target.id == 'assetMaintain'){
          this.history.pushState(null,'assetManage/assetMaintain');
        }
    },
    render: function() {
      var that = this;
      var treeData = this.state.treeData;
      if(treeData != null && treeData != ""){
        var curThreeNode = that.props.curThreeNode;
        var preThreeNode = that.props.preThreeNode;
        var onGetCurThreeNode = that.props.onGetCurThreeNode;
        var onGetPreThreeNode = that.props.onGetPreThreeNode;
        var curName = that.props.curName;
        var setCurName = that.props.setCurName;
        return (
            <div className="assetManageListDiv">
                <div className="iq-list" style={{"display":"none"}}>
                    <div className="list-group">
                        <a id="statistic"  className="list-group-item left-nav-item-statistic" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资产统计</a>
                        <a id="statisticList"  className="list-group-item left-nav-item-statisticList" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资产统计列表</a>
                        <a id="monitor"  className="list-group-item left-nav-item-monitor" onClick={this._handleOnClick} style={{cursor:'pointer'}}>监控同步</a>
                        <a id="assetMaintain"  className="list-group-item left-nav-item-monitor" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资产维保</a>
                    </div>
                </div>
                <CommonTree data={treeData} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={curName} setCurName={setCurName}
                  onGetCurThreeNode={onGetCurThreeNode} onGetPreThreeNode={onGetPreThreeNode}
                />
            </div>
        );
      }else{
        return (
            <div className="assetManageListDiv">
                <div className="iq-list" style={{"display":"none"}}>
                    <div className="list-group">
                        <a id="statistic"  className="list-group-item left-nav-item-statistic" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资产统计</a>
                        <a id="statisticList"  className="list-group-item left-nav-item-statisticList" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资产统计列表</a>
                        <a id="monitor"  className="list-group-item left-nav-item-monitor" onClick={this._handleOnClick} style={{cursor:'pointer'}}>监控同步</a>
                        <a id="assetMaintain"  className="list-group-item left-nav-item-monitor" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资产维保</a>
                    </div>
                </div>
            </div>
        );
      };
    }
});

module.exports = AssetList;
