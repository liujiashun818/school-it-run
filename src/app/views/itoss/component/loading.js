/**
 * Created by SHIN on 2016/1/20.
 */
var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Loading = React.createClass({
	mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            itoss:flux.store("SampleStore").getState()
        }
    },

    render: function() {
        return (
            <div id="loadingPic" className={this.getFlux().store("SampleStore").getState().bLoadingDisplay?"modal loadingDiv in":"modal loadingDiv"}>
                <img src="img/loader.gif" style={{width:"32px", height:"32px"}}/>
            </div>
        );
    }
});

module.exports = Loading;
