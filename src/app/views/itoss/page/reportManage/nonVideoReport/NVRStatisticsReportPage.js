/**
 * Created by SHIN on 2016/1/27.
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../../homePage');

var NVRStatisticsReportPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={401}/>
        );
    }
});

module.exports = NVRStatisticsReportPage;
