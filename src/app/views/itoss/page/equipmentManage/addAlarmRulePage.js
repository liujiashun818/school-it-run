/**
* Created by Yuchen  2016/03/09.
* 新建告警规则主页面
*/

var React = require('react');
require('bootstrap');

var HomePage = require('../homePage');

var AddAlarmLogPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={70}/>
        );
    },
});

module.exports = AddAlarmLogPage;
