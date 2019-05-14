/**
 * Created by SHIN on 2016/1/27.
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../../homePage');

var DVRStatisticsReportPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={400}/>
        );
    }
});

module.exports = DVRStatisticsReportPage;
