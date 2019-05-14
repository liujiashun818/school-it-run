/**
 * Created by SHIN on 2016/1/27.
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../../homePage');

var networkStatisticsReportPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={404}/>
        );
    }
});

module.exports = networkStatisticsReportPage;
