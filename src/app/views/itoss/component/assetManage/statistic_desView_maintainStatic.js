/**
* Created by Yuchen  2016/01/08.
*/

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

// require('../equipmentManage/lib/echarts-all.js');

var Statistic_desView_static = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    componentDidMount: function() {

    },
    componentDidUpdate: function() {
        if(this.props.barChart) this.props.barChart.resize();
    },
    render: function() {
        return (
            <div className="staticDiv assetStatic col-md-12">
                <div className="staticChartDiv col-md-12">
                    <div className='remarkDiv' style={{marginBottom:0}}>
                        <span>设备维修TOP10</span>
                    </div>
                    <div id="barChartDiv" style={{height:"360px"}} ></div>
                </div>
            </div>
        );
    }
});

module.exports = Statistic_desView_static;
