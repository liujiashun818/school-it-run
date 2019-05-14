/**
 * Created by SHIN on 2015/12/28.
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../homePage');

var CreateResourcePage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={51}/>
        );
    },
});

module.exports = CreateResourcePage;
