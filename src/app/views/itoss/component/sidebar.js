/**
 * Created by SHIN on 2015/12/8.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var Sidebar = require('react-sidebar');

var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
// 	StoreWatchMixin = Fluxxor.StoreWatchMixin;

//var App1 = React.createClass({
//	render: function() {
//		return (
//			<div className='form-group'>
//				<b>Sidebar content 1</b>
//			</div>
//		);
//	}
//});
//
//var ChildSideBar = React.createClass({
//	getInitialState: function() {
//		return {sidebarDock: false};
//	},
//
//	onClickShowHide: function() {
//		this.setState({sidebarDock: !this.state.sidebarDock});
//	},
//
//	render: function() {
//		var sidebarContent = <b>Sidebar content 2</b>;
//
//		return (
//			<Sidebar sidebar={sidebarContent}
//			         docked={this.state.sidebarDock}
//					 sidebarWidth={100}>
//				<b>Main content 2</b>
//				<button type='button' className='btn btn-success btnFontStyle' onClick={this.onClickShowHide}>
//					test2
//				</button>
//				<div style={{width: '900px'}} >dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</div>
//			</Sidebar>
//		);
//	}
//});

var SideBar = React.createClass({
	//mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
	// getStateFromFlux: function() {
	//   var flux = this.getFlux();
	//   return {
	//     itoss:flux.store("SampleStore").getState()
	//   }
	// },

	getInitialState: function() {
		return {
			sidebarDock: false,
			sidebarWidth: $(window).width() - 950
		};
	},

	componentDidMount: function() {
		var _this = this;
		$(window).resize(function () {
			_this.setState({sidebarWidth: $(window).width() - 950})
		});
	},

	onClickShowHide: function() {
		this.setState({sidebarDock: !this.state.sidebarDock});
	},

	render: function() {
		//this.state.sidebarDock = this.state.itoss.bShowPortal;
		return (
			<Sidebar sidebar={this.props.sidebarContent}
			         docked={this.state.sidebarDock}
					 sidebarWidth={this.state.sidebarWidth}
					 pullRight={true}>
				{this.props.mainContent}
			</Sidebar>
		);
	}
});



module.exports = SideBar;
