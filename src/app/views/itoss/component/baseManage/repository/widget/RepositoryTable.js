var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');
var RepositoryTableBox = require('./RepositoryTableBox');

var RepositoryTable = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],

    componentDidMount: function() {

    },

    render: function() {
        return (
            <div className="assetTableDiv col-md-12">
                <fieldset>
                    <div className="tab-content">
                        <div className="tab-pane active" id="overviewDesview_tab_1">
                            <RepositoryTableBox />
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }
});

module.exports = RepositoryTable;
