/**
 * Created by SHIN on 2015/12/29.
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

var GroupAddPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={801}/>
        );
    }
});

module.exports = GroupAddPage;
