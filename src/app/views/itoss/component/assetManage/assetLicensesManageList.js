/**
 * Created by SHIN on 2015/12/14.
 * 软件资产
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

var AssetLicensesManageList = React.createClass({
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
        if(e.target.id == 'license_overview'){
            this.history.pushState(null,'assetManage/licensesManage/overview');
        }else if(e.target.id == 'license_create'){
            this.history.pushState(null,'assetManage/licensesManage/createView');
        }else if(e.target.id == 'license_allocate'){
            this.history.pushState(null,'assetManage/licensesManage/allocateView');
        }else if(e.target.id == 'license_borrowing'){
            this.history.pushState(null,'assetManage/licensesManage/borrowView');
        }else if(e.target.id == 'license_repair'){
            this.history.pushState(null,'assetManage/licensesManage/maintainView');
        }else if(e.target.id == 'license_scraped'){
            this.history.pushState(null,'assetManage/licensesManage/scrapView');
        };
    },

    render: function() {
        return (
            <div className="assetManageListDiv">
                <div className="iq-list">
                    <div className="list-group">
                        <a id="license_overview"  className="list-group-item" onClick={this._handleOnClick}>概述</a>
                        <a id="license_create"  className="list-group-item active" onClick={this._handleOnClick}>新增软件资产</a>
                        <a id="license_allocate" className="list-group-item" onClick={this._handleOnClick}>调拨软件资产</a>
                        <a id="license_borrowing" className="list-group-item" onClick={this._handleOnClick}>借用软件资产</a>
                        <a id="license_repair" className="list-group-item" onClick={this._handleOnClick}>维修软件资产</a>
                        <a id="license_scraped" className="list-group-item" onClick={this._handleOnClick}>报废软件资产</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = AssetLicensesManageList;
