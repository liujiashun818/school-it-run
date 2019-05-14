/**
* Created by Yuchen  2016/01/29.
* 维修单详情
*/

var React = require('react');
require('bootstrap');

var HomePage = require('../homePage');

var MaintainDetailPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={107}/>
        );
    },
});

module.exports = MaintainDetailPage;
