/**
* xuexue.yin  2016/01/14.
* 拓扑导航
*/

require('bootstrap');
import React from 'react'
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

import TopologyNavView_desView_Map from './topologynavview_desView_map';

var TopologyNavView_desView = React.createClass({
    mixins: [History],
    getInitialState: function() {
      return {
        current: 1,
        current_map: 1
      };
    },
    componentDidMount: function() {
        // if(document.getElementById('topologyNavViewdesViewDiv') != null) {
        //     document.getElementById('topologyNavViewdesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
        // }
    },
    _handleOnClick: function(e) {
        //console.log(e.target.innerText);
    },
    handleChangePageCall: function(){
      this.setState({current:1});
    },
    render: function() {
        return (
            <div id="topologyNavViewdesViewDiv" className="overviewDesViewDiv" style={{marginLeft: '5px'}}>
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        拓扑导航
                    </div>
                    <div className="titleRight2">
                        <a ><i title ="拓扑导航" className="fa fa-question-circle fa-lg"></i></a>
                        <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg"></i></a>
                    </div>
                </div>
                <TopologyNavView_desView_Map current_map={this.state.current_map} fun={this.handleChangePageCall}
                    nodeToken={this.props.nodeToken} tpjbdictionaryData={this.props.tpjbdictionaryData}
                    initMAPLV={this.props.initMAPLV} mydeviceMaps={this.props.mydeviceMaps} deviceMaps={this.props.deviceMaps}
                    onGetTpjbDictionaryData={this.props.onGetTpjbDictionaryData}
                    getAllMapMarkersList={this.props.getAllMapMarkersList}
                    getMapNodeToken={this.props.getMapNodeToken}
                    getMapNodeTokenNew={this.props.getMapNodeTokenNew}
                    onGetUserInfoByToken={this.props.onGetUserInfoByToken}
                    onSetNodePoint={this.props.onSetNodePoint}
                />
            </div>
        );
    }
});

$(window).resize(function () {
    // if(document.getElementById('topologyNavViewdesViewDiv') != null) {
    //     document.getElementById('topologyNavViewdesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
    // }
});

module.exports = TopologyNavView_desView;
