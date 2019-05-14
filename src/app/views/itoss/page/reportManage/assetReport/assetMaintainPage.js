/**
* Created by Yuchen  2016/01/26.
*/
var React = require('react');
require('bootstrap');

var HomePage = require('../../homePage');

var AssetMaintainPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={302}/>
        );
    },
});

module.exports = AssetMaintainPage;
