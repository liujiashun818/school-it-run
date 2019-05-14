/**
* Created by Yuchen  2016/03/11.
* 编辑告警规则主页面
*/

var React = require('react');
require('bootstrap');

var HomePage = require('../homePage');

var EditAlarmLogPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={71}/>
        );
    },
});

module.exports = EditAlarmLogPage;
