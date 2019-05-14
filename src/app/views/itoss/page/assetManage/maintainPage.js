/**
* Created by Yuchen  2016/03/09.
* 维修清单列表
*/

var React = require('react');
require('bootstrap');

var HomePage = require('../homePage');

var MaintainPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={103}/>
        );
    },
});

module.exports = MaintainPage;
