/**
* Created by Yuchen  2016/02/18.
*/

require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

// var SideBar = require('../../component/sidebar');
var HomePage = require('../homePage');
// var PortalPage = require('../portalPage');

var AssetMaintain = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return{
    //         //itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },
    render: function() {
        return (
            <HomePage flux={this.props.flux} pageId={109}/>
        );
    },
});

module.exports = AssetMaintain;
