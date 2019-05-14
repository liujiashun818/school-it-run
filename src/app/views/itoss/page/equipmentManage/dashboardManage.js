require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');

var HomePage = require('../homePage');
var DashboardCenter = React.createClass({
    render: function() {
        return (
            <HomePage pageId={7000}/>
        );
    }
});

module.exports = {
  DashboardCenter:DashboardCenter
};
