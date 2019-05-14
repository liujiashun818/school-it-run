var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Bar = require('../component/navbars/newNavbar');

var newNavbar = React.createClass({
  mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
  getStateFromFlux: function() {
      var flux = this.getFlux();
      return {
          itoss:flux.store("SampleStore").getState(),
      }
  },
  render:function(){
    return(
      <Bar/>
    );
  }
});

module.exports = newNavbar;
