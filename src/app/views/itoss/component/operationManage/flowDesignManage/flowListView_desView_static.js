require('bootstrap');
import React from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;

var FlowListView_desView_static = React.createClass({
    mixins: [History],  
    getInitialState: function() {
        return {
        }
    },
    componentDidMount:function(){
    },
    render:function(){
        return (
            <div className="operationButtons">
                <div className="systemGroupButtonGroup1 oBGroup">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            运维管理-流程设计
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

module.exports = FlowListView_desView_static;
