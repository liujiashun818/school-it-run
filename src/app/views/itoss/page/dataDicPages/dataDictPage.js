/**
 * Created by SHIN on 2016/1/22.
 */
require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var HomePage = require('../homePage');

var AlarmConfigPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={803}/>
        );
    }
});

module.exports = AlarmConfigPage;
