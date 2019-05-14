/**
 * Created by SHIN on 2015/12/29.
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../../homePage');

var CameraVideoCheckReport = React.createClass({
    getInitialState: function(){
        return{}
    },
    render: function() {
        return (
            <HomePage pageId={200}/>
        );
    }
});

module.exports = CameraVideoCheckReport;
