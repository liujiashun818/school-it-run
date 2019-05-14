/**
* xuexue.yin  2016/02/24.
* 值班管理
*/

require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DutyListView_desView_static = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTSystemStore")],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     itoss_system:flux.store("YFTSystemStore").getState()
    //   }
    // },
    render:function(){
        return (
            <div className="operationButtons">
                <div className="systemGroupButtonGroup1 oBGroup">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            值班管理-值班表设置
                        </div>
                        <div className="titleRight">
                            <a href=""><i className="fa fa-question-circle"></i></a>
                            <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DutyListView_desView_static;
