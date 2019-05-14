var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');
var RepositoryTableListBox = require('./RepositoryTableListBox');

var RepositoryTableList = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],

    render: function() {
        return (
            <div className="assetTableDiv col-md-12">
                <fieldset>
                    <div className="tab-content">
                        <div className="tab-pane active">
                            <RepositoryTableListBox />
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }
});

module.exports = RepositoryTableList;
