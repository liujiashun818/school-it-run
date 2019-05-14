/**
 * Created by SHIN on 2015/12/15.
 * 耗材资产
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

var AssetConsumablesManageList = React.createClass({
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
        if(e.target.id == 'consumable_overview'){
            this.history.pushState(null,'assetManage/consumablesManage/overview');
        }else if(e.target.id == 'consumable_create'){
            this.history.pushState(null,'assetManage/consumablesManage/createView');
        }else if(e.target.id == 'consumable_allocate'){
            this.history.pushState(null,'assetManage/consumablesManage/allocateView');
        }else if(e.target.id == 'consumable_borrowing'){
            this.history.pushState(null,'assetManage/consumablesManage/borrowView');
        }else if(e.target.id == 'consumable_repair'){
            this.history.pushState(null,'assetManage/consumablesManage/maintainView');
        }else if(e.target.id == 'consumable_scraped'){
            this.history.pushState(null,'assetManage/consumablesManage/scrapView');
        };
    },

    render: function() {
        return (
            <div className="assetManageListDiv">
                <div className="iq-list">
                    <div className="list-group">
                        <a id="consumable_overview"  className="list-group-item" onClick={this._handleOnClick}>概述</a>
                        <a id="consumable_create"  className="list-group-item active" onClick={this._handleOnClick}>新增耗材资产</a>
                        <a id="consumable_allocate" className="list-group-item" onClick={this._handleOnClick}>调拨耗材资产</a>
                        <a id="consumable_borrowing" className="list-group-item" onClick={this._handleOnClick}>借用耗材资产</a>
                        <a id="consumable_repair" className="list-group-item" onClick={this._handleOnClick}>维修耗材资产</a>
                        <a id="consumable_scraped" className="list-group-item" onClick={this._handleOnClick}>报废耗材资产</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = AssetConsumablesManageList;
