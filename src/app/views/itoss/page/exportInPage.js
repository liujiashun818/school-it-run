var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import { connect } from 'react-redux'
import * as indexActions from "../../../actions/index_action"
var ExportInModal = require("./exportInModal");

var exportInPage = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },
  componentWillMount:function(){
    const { dispatch } = this.props;
    dispatch(indexActions.getAllBusObDefNames());
  },
  componentDidMount:function(){
    $("#exportInModal").modal("show");
  },
  showExport:function(){
    $("#exportInModal").modal("show");
  },
  render:function(){
    // console.log(this.props.busObDefNames);
    const { dispatch } = this.props;
    return (
      <div className="col-md-12">
        <ExportInModal busObDefName={this.props.busObDefNames} busObDefField={this.props.busObDefField}
        getBusObDefFields={param => dispatch(indexActions.getBusObDefFields(param))}
        saveExcelDataToSpace={param => dispatch(indexActions.saveExcelDataToSpace(param))}/>
        <button onClick={this.showExport}>ExportIn</button>
      </div>
    );
  }
});

function mapExportInData(state) {
  const { busObDefNames,busObDefField } = state.indexReducer
  return {
    busObDefNames:busObDefNames,
    busObDefField:busObDefField
  }
}

export default connect(mapExportInData)(exportInPage)
