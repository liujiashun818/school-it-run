/**
* Created by Yuchen  2016/03/07.
* 告警日志主页面
*/

var React = require('react');
require('bootstrap');

var HomePage = require('../homePage');

var AlarmLogPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={57}/>
        );
    },
});

module.exports = AlarmLogPage;
