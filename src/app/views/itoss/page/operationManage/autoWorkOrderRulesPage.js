/**
 * Created by SHIN on 2016/2/24.
 */
require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

// var SideBar = require('../../component/sidebar');
var HomePage = require('../homePage');
// var PortalPage = require('../portalPage');

var AutoWorkOrderRulesPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={84}/>
        );
    }
});

module.exports = AutoWorkOrderRulesPage;
