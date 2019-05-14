/**
 * Created by SHIN on 2015/12/29.
 * 新建工单
 */
require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var HomePage = require('../homePage');

var CreateOperationPage = React.createClass({  
    render: function() {
        return (
            <HomePage  pageId={81}/>
        );
    }
});

module.exports = CreateOperationPage;
