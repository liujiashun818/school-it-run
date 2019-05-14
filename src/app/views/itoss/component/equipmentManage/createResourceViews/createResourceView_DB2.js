/**
 * Created by SHIN on 2015/12/28.
 */
require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'

var ReactWidgets = require('react-widgets');
var Globalize = require('globalize');
var globalizeLocalizer = require('react-widgets/lib/localizers/globalize');

var MonitoringSettingTab = require('./createResourceView_DB2_monitoringSettingTab');

globalizeLocalizer(Globalize);

var CreateResourceView_DB2 = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    componentDidMount: function() {
        if(document.getElementById('createResourceView_DB2') != null) {
            document.getElementById('createResourceView_DB2').style.height = $(window).height() - 110 - 30 + 'px';
        }
    },

    handleOnClickCancel: function() {
        this.history.pushState(null,'equipmentManage/MonitorPage');
    },

    render: function() {
        return (
            <div id="createResourceView_DB2" className="overviewDesViewDiv operationButtons">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        DB2
                    </div>
                    <div className="titleRight">
                        <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                    </div>
                </div>
                <div className="col-md-12">
                  <div className="buttonInfo">
                    <p>{this.props.resource.descript}的相关设置</p>
                    <button>保存</button>
                    <button className="deleteButton" onClick={this.handleOnClickCancel}>取消</button>
                    <button className="toPageButton">测试连接</button>
                  </div>
                </div>
                <div className='assetCreateTableDiv col-md-12' style={{borderTop:"3px #f1f1f1 solid",paddingTop:"6px"}}>
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#createResourceView_tab_monitoringSetting" data-toggle="tab">监控设置</a></li>
                    </ul>
                    <fieldset>
                        <div className="contentDiv tab-content marginleft_none">
                            <div className="tab-pane active" id="createResourceView_tab_monitoringSetting">
                                <MonitoringSettingTab/>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('createResourceView_DB2') != null) {
        document.getElementById('createResourceView_DB2').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = CreateResourceView_DB2;
CreateResourceView_DB2.propTypes = {
  // createResourceViewId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  // const { createResourceViewId } = state.equipmentReducer

  return {
    // createResourceViewId
  }
}

export default connect(mapStateToProps)(CreateResourceView_DB2)
