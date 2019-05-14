/**
 * Created by Yuchen on 2016/01/21.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Store = require('./../../../../server/store.js');
var base64 = require('./../../../../utils/base64.js');
var util = require('./../../../../utils/util.js');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CommonTree = require('../monitorTree/commonTree');

var AssetManageList = React.createClass({
    mixins: [History],
    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            itoss:flux.store("AssetManageStore").getState()
        }
    },
    componentDidMount: function() {
        //获取权限集合
        var list = [];
        temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            this.getFlux().actions.AssetManageActions.set_permissions(temp);
        }
        valid1 = util.hasPermission(temp,"/assetmanage/maintain/maintainlist");
        valid2 = util.hasPermission(temp,"/assetmanage/maintain/maintainlist/add");
        if(valid1==null) {
          $("#maintainOrder").hide();
        }else{
          list.push({id:1,name:"维修清单",pid:0,toUrl:"assetManage/maintain"});
        };
        if(valid1==null) {
          $("#createMaintainOrder").hide();
        }else{
          list.push({id:2,name:"新建维修单",pid:0,toUrl:"assetManage/createMaintain"});
        };
        this.setState({treeData:list});
    },
    _handleOnClick: function(e) {
        if(e.target.id == 'maintainOrder'){
            this.history.pushState(null,'assetManage/maintain');
        }
        else if(e.target.id == 'createMaintainOrder'){
            this.history.pushState(null,'assetManage/createMaintain');
        }
    },
    render: function() {
      var treeData = this.state.treeData;
      if(treeData != null && treeData != ""){
        return (
            <div className="assetManageListDiv">
                <div className="iq-list" style={{"display":"none"}}>
                    <div className="list-group">
                        <a id="maintainOrder"  className="list-group-item left-nav-item-statistic" onClick={this._handleOnClick}>维修清单</a>
                        <a id="createMaintainOrder"  className="list-group-item left-nav-item-statistic" onClick={this._handleOnClick}>新建维修单</a>
                    </div>
                </div>
                <CommonTree data={treeData} selectedNode={0}/>
            </div>
        );
      }else{
        return (
            <div className="assetManageListDiv">
                <div className="iq-list" style={{"display":"none"}}>
                    <div className="list-group">
                        <a id="maintainOrder"  className="list-group-item left-nav-item-statistic" onClick={this._handleOnClick}>维修清单</a>
                        <a id="createMaintainOrder"  className="list-group-item left-nav-item-statistic" onClick={this._handleOnClick}>新建维修单</a>
                    </div>
                </div>
            </div>
        );
      };
    }
});

module.exports = AssetManageList;
