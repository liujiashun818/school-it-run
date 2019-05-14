/**
* Created by Yuchen  2016/02/18.
*/

require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

// var SideBar = require('../../component/sidebar');
var HomePage = require('../homePage');
// var PortalPage = require('../portalPage');

var AssetMaintain = React.createClass({
    render: function() {
        return (
            <HomePage pageId={108}/>
        );
    },
});

module.exports = AssetMaintain;
