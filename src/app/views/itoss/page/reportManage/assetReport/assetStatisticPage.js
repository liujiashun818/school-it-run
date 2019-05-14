/**
* Created by Yuchen  2016/01/21.
*/
var React = require('react');
require('bootstrap');

var HomePage = require('../../homePage');

var AssetStatisticPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={301}/>
        );
    },
});

module.exports = AssetStatisticPage;
