/**
* xuexue.yin  2016/01/14.
* 拓朴导航
*/

require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

var HomePage = require('../homePage');

var TopologyNavPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={150}/>
        );
    },
});

module.exports = TopologyNavPage;
