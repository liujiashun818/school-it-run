require('bootstrap');

var React = require('react');
// var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;

// var SideBar = require('../../component/sidebar');
var HomePage = require('../homePage');
// var PortalPage = require('../portalPage');

var GroupAddPage = React.createClass({
  render: function() {
      return (
          <HomePage pageId={1001}/>
      );
  }
});

module.exports = GroupAddPage;
