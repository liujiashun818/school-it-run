//进入"严格模式"的标志，是下面这行语句："use strict";
'use strict';

var React = require('react');
//var Router = require('react-router');
//var RouteHandler = Router.RouteHandler;

var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var DefaultRoute = ReactRouter.DefaultRoute;
var RouteHandler = ReactRouter.RouteHandler;

var Store = require('../../server/store');

var App = React.createClass({
	componentWillMount: function() {
		if(Store.get('theme') == 'dark') {
			var fileref=document.createElement("link");
			fileref.setAttribute("id", "testcss2");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", "main2.css");
			document.getElementsByTagName("head")[0].replaceChild(fileref, document.getElementById("testcss"));
		}
	},

  render: function() {
    //return (
    //    //<RouteHandler {...this.props}/>
    //    React.cloneElement(this.props.children)
    //);
	  return <div>{this.props.children}</div>;
  }
});

module.exports = App;
