require('bootstrap');

var React = require('react');
// var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;

// var SideBar = require('../../component/sidebar');
var HomePage = require('../homePage');
// var PortalPage = require('../portalPage');

var GroupAddPage = React.createClass({
  childContextTypes: {
    params: React.PropTypes.object,
    location: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      params: this.props.params,
      location: this.props.location
    };
  },
  render: function() {
      return (
          <HomePage pageId={1000}/>
      );
  }
});

module.exports = GroupAddPage;
