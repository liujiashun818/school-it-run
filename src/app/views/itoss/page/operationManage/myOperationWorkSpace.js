/**
 * Created by SHIN on 2015/12/29.
 * 工单管理-工作台
 */
require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var HomePage = require('../homePage');

var CreateOperationPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={80}/>
        );
    }
});

module.exports = CreateOperationPage;
