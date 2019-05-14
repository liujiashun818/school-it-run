/**
* Created by Yuchen  2016/01/08.
*
*/

var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

//var Sidebar = require('../../component/sidebar');
var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var History = ReactRouter.History;
/*var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;*/

//var Store = require('../../../server/store.js');
//var SideBar = require('../../component/sidebar');
var HomePage = require('../homePage');
//var PortalPage = require('../portalPage');

var StatisticPage = React.createClass({
    /*mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    getStateFromFlux: function() {
        var flux = this.getFlux();
        return{
            //itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
        }
    },*/
    render: function() {
        return (
            <HomePage pageId={101}/>
        );
    },
});

module.exports = StatisticPage;
