/**
 * Created by SHIN on 2016/1/22.
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../homePage');

var AlarmConfigPage = React.createClass({
    render: function() {
        return (
            <HomePage flux={this.props.flux} pageId={54}/>
        );
    }
});

module.exports = AlarmConfigPage;
