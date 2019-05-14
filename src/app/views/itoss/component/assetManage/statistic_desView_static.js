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

import GridChart from './statistic_desView_gridChart';

var Overview_desView_static = React.createClass({
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
        if(this.props.pieChart) this.props.pieChart.resize();
    },
    render: function() {
        return (
            <div className="staticDiv assetStatic col-md-12">
                <div className="staticChartDiv col-md-8">
                    <div className='remarkDiv'>
                        <span>资产类型统计</span>
                    </div>
                    <div id="gridChartDiv" style={{height:"305px"}}>
                      <GridChart
                        data={this.props.AssetTypeList} permissions={this.props.permissions}
                        set_default_filter_value_assetList={this.props.set_default_filter_value_assetList}
                        onSetCurThreeNode={this.props.onSetCurThreeNode}
                        onSetPreThreeNode={this.props.onSetPreThreeNode}
                        setCurName={this.props.setCurName}
                      />
                    </div>
                </div>
                <div className="staticChartDiv col-md-4">
                    <div className='remarkDiv'>
                        <span>过保资产统计</span>
                    </div>
                    <div id="pieChartDiv" style={{height:"295px"}} ></div>
                </div>
            </div>
        );
    }
});

module.exports = Overview_desView_static;
