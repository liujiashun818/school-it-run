/**
 * Created by SHIN on 2015/12/29.
 */
var React = require('react');
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DependOnModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    _handleOnClickOK: function() {
    },

    render : function(){
        return (
            <div className="modal fade" id="dependOnModal" tabIndex="-1" role="dialog" aria-labelledby="dependOnModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">依赖于</h4>
                        </div>
                        <div className="modal-body">
                            <div className='row'>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK} disabled={true}>依赖</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">关闭</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">无依赖</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DependOnModal;
