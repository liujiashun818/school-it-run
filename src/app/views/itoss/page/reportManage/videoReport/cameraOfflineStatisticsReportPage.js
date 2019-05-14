/**
 * Created by SHIN on 2015/12/29.
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../../homePage');

var CameraOfflineStatisticsReport = React.createClass({
    render: function() {
        return (
            <HomePage flux={this.props.flux} pageId={202}/>
        );
    }
});

module.exports = CameraOfflineStatisticsReport;
