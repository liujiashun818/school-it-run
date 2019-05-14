/**
* Created by Yuchen  2016/01/15.
*/

var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');

var History = ReactRouter.History;


var HomePage = require('../homePage');

var MonitorPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={105}/>
        );
    },
});

module.exports = MonitorPage;
