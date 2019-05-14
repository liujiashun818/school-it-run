/**
 * Created by SHIN on 2016/1/27.
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../../homePage');

var firewallStatisticsReportPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={405}/>
        );
    }
});

module.exports = firewallStatisticsReportPage;
