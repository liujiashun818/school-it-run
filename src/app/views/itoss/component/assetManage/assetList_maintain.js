/**
* Created by Yuchen  2016/01/13.
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

var AssetMaintainList = React.createClass({
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
        if(e.target.id == 'maintain'){
            this.history.pushState(null,'assetManage/maintain');
        }
        else if(e.target.id == 'create'){
            this.history.pushState(null,'assetManage/createMaintain');
        }
    },

    render: function() {
        return (
            <div className="assetManageListDiv">
                <div className="iq-list">
                    <div className="list-group">
                        <a id="maintain"  className="list-group-item" onClick={this._handleOnClick}  style={{cursor:'pointer'}}>维修清单</a>
                        <a id="create"  className="list-group-item" onClick={this._handleOnClick}  style={{cursor:'pointer'}}>新建维修单</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = AssetMaintainList;
