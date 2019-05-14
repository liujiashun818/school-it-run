/**
* Created by Yuchen  2016/03/07.
* 告警规则主页面
*/

var React = require('react');
require('bootstrap');

var HomePage = require('../homePage');

var AlarmRulePage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={58}/>
        );
    },
});

module.exports = AlarmRulePage;
