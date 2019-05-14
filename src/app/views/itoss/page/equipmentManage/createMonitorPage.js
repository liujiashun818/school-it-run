/**
 * Created by SHIN on 2015/12/29.
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../homePage');

var CreateMonitorPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={52}/>
        );
    }
});

module.exports = CreateMonitorPage;
