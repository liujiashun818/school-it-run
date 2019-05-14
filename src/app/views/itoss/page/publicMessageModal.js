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

var PublicMessageModal = React.createClass({
  _handleOnClickOK: function() {
    $('#publicMessageModal').modal('hide');
  },
  render:function(){
    return (
      <div className="modal fade" id="publicMessageModal" tabIndex="-1" role="dialog" aria-labelledby="publicMessageModalLabel" aria-hidden="true">
        <div className="modal-dialog fieldSettingModalDialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="publicMessageModelTitle">提示</h4>
            </div>
            <div className="modal-body">
              <p id="publicMessageModalcontent">内容</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this._handleOnClickOK}>确定</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PublicMessageModal;
