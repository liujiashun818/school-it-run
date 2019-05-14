/**
 * Created by SHIN on 2015/12/15.
 * 配件资产
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var AssetAccessoriesManageList = React.createClass({
    mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            //itoss:flux.store("SampleStore").getState()
        }
    },

    componentWillMount: function() {
    },

    _handleOnClick: function(e) {
        console.log(e.target.innerText);
        if(e.target.id == 'accessory_overview'){
            this.history.pushState(null,'assetManage/accessoriesManage/overview');
        }else if(e.target.id == 'accessory_create'){
            this.history.pushState(null,'assetManage/accessoriesManage/createView');
        }else if(e.target.id == 'accessory_allocate'){
            this.history.pushState(null,'assetManage/accessoriesManage/allocateView');
        }else if(e.target.id == 'accessory_borrowing'){
            this.history.pushState(null,'assetManage/accessoriesManage/borrowView');
        }else if(e.target.id == 'accessory_repair'){
            this.history.pushState(null,'assetManage/accessoriesManage/maintainView');
        }else if(e.target.id == 'accessory_scraped'){
            this.history.pushState(null,'assetManage/accessoriesManage/scrapView');
        };
    },

    render: function() {
        return (
            <div className="assetManageListDiv">
                <div className="iq-list">
                    <div className="list-group">
                        <a id="accessory_overview"  className="list-group-item" onClick={this._handleOnClick}>概述</a>
                        <a id="accessory_create"  className="list-group-item active" onClick={this._handleOnClick}>新增配件资产</a>
                        <a id="accessory_allocate" className="list-group-item" onClick={this._handleOnClick}>调拨配件资产</a>
                        <a id="accessory_borrowing" className="list-group-item" onClick={this._handleOnClick}>借用配件资产</a>
                        <a id="accessory_repair" className="list-group-item" onClick={this._handleOnClick}>维修配件资产</a>
                        <a id="accessory_scraped" className="list-group-item" onClick={this._handleOnClick}>报废配件资产</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = AssetAccessoriesManageList;
