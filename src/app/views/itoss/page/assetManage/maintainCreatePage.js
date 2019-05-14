/**
* Created by Yuchen  2016/01/13.
* 新建维修单
*/

var React = require('react');
require('bootstrap');

var HomePage = require('../homePage');

var MaintainCreatePage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={104}/>
        );
    },
});

module.exports = MaintainCreatePage;
