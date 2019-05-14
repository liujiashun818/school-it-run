/**
 * Created by 聂天卓 on 2016/1/22.
 * 告警升级列表
 */
require('bootstrap');
var React = require('react');
var HomePage = require('../homePage');

var GroupAddPage = React.createClass({

    render: function() {
        return (
            <HomePage pageId={1002}/>
        );
    }
});

module.exports = GroupAddPage;
