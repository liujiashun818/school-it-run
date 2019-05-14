/**
 * Created by SHIN on 2015/12/9.
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

//var Sidebar = require('../../component/sidebar');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

//var Store = require('../../../server/store.js');
var Widget = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function(){
        return(
            <li className="draggable"
                data-xid={this.props.widgetData.xid}
                data-title={this.props.widgetData.title}
                data-subtitle={this.props.widgetData.subtitle}
                data-content={this.props.widgetData.content}
                data-style-width={this.props.widgetData.style.width}
                data-style-height={this.props.widgetData.style.height}
            >
                <div className="snag pull-left">
                    <div className="snag-drag"></div>
                </div>
                <div className="content pull-left">
                    <div className="title">{this.props.widgetData.title}</div>
                    <div className="subtitle">{this.props.widgetData.subtitle}</div>
                    <div className="details">
                        <a>Details</a>
                    </div>
                </div>
                <div className="clearfix"></div>
            </li>
        );
    },
});

var ModulesPage = React.createClass({
    getInitialState: function() {
        return {};
    },
    onClickShowHide: function() {
        //this.setState({sidebarDock: !this.state.sidebarDock});
    },
    componentDidUpdate: function() {
        var _this = this;
        $("#moduleLeft .draggable").draggable({
            connectToSortable: ".modules-container",
            containment: "#main-module-container",
            helper: "clone",
            scope: "tasks",
            opacity: 0.5,
            cursor: "move",
            scroll: false,
            start: function(e,ui){
                ui.helper.removeAttr("data-reactid");
                ui.helper.find("*").each(function(){
                    $(this).removeAttr("data-reactid");
                })
                ui.helper.width($(this).attr("data-style-width"));
                ui.helper.height($(this).attr("data-style-height"));
            },
         });
    },
    render: function() {
        var module_list = this.props.dataset.map(function(m,i){
            return(<Widget widgetData={m} key={i}/>);
        });
        return (
            <div>
                模块页
                <ul className="modules-container from" id="moduleLeft">
                    {module_list}
                </ul>
            </div>
        );
    },
});

module.exports = ModulesPage;
