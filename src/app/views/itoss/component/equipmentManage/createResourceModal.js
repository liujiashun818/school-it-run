/**
 * Created by SHIN on 2015/12/30.
 */
// var React = require('react');
import React, { PropTypes } from 'react';
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var last;
var CreateResourceModal = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    componentDidMount: function() {
        const { createResourcesTableData, getResourceTypes } = this.props;
        $('#createResourceTable').bootstrapTable({
            columns: [
                {
                    title: '资源',
                    field: 'typeAlias',
                    width: 220,
                    sortable: false
                }, {
                    title: '描述',
                    field: 'descript',
                    sortable: false
                }
            ],
            data: createResourcesTableData,
            onClickRow: this._handleOnClickTableRow
        });

        var _this = this;
        $('#createResourceModal').on('show.bs.modal', function () {
            $('#createResourceTable').bootstrapTable('resetView');
            getResourceTypes();
            $('#resource_quickSearch').keyup(function(event){
                const { resourceTypes, getResourcesBySearchName } = _this.props;
                last = event.timeStamp;
                setTimeout(function(){
                    if(last-event.timeStamp == 0)
                    {
                        document.getElementById('resourceType_all').className = 'input-xlarge width10';
                        for(var i = 0; i < resourceTypes.length; i++) {
                            if(document.getElementById('resourceType_'+resourceTypes[i].RecId) != null) {
                                document.getElementById('resourceType_'+resourceTypes[i].RecId).className = 'input-xlarge width10';
                            }
                        }

                        if($.trim($('#resource_quickSearch').val().toLowerCase()) == "") {
                            document.getElementById('resourceType_all').className = 'input-xlarge width10 active';
                        }
                        getResourcesBySearchName($('#resource_quickSearch').val());
                    }
                }, 500);
            });
        });
    },

    componentDidUpdate: function() {
        const { createResourcesTableData } = this.props;
        $('#createResourceTable').bootstrapTable('refreshOptions', {data: createResourcesTableData});
    },

    _handleOnClickTableRow: function(row, element) {
        this.props.setSelectedResource(row);
        $('#createResourceModal').modal('hide');
        this.history.pushState(null,'equipmentManage/createResourcePage');
    },

    _handleOnClickType: function(e) {
        const { resourceTypes, getResourcesByTypeId } = this.props;
        var filtrationConditions = {};
        document.getElementById('resourceType_all').className = 'input-xlarge width10';
        for(var i = 0; i < resourceTypes.length; i++) {
            if(document.getElementById('resourceType_'+resourceTypes[i].RecId) != null) {
                document.getElementById('resourceType_'+resourceTypes[i].RecId).className = 'input-xlarge width10';
            }
        }

        if(e.currentTarget.id == 'resourceType_all') {
            document.getElementById('resourceType_all').className = 'input-xlarge width10 active';
            getResourcesByTypeId('');
        }
        else {
            for(var i = 0; i < resourceTypes.length; i++) {
                if(e.currentTarget.id.substring(13) == resourceTypes[i].RecId) {
                    document.getElementById('resourceType_'+resourceTypes[i].RecId).className = 'input-xlarge width10 active';
                    getResourcesByTypeId(resourceTypes[i].RecId);
                }
            }
        }
    },

    render : function(){
        const { resourceTypes } = this.props;
        var _this = this;
        return (
            <div className="modal fade" id="createResourceModal" tabIndex="-1" role="dialog" aria-labelledby="createResourceModalLabel" aria-hidden="true">
                <div className="modal-dialog createResourceModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">添加资源</h4>
                        </div>
                        <div className="modal-body">
                            <div className="contentTabDiv">
                                <div className="subHeader">快速搜索</div>
                            </div>
                            <div className="clearContentTabDiv"></div>
                            <div className='contentTabDiv'>
                                <input id="resource_quickSearch" type="text" className="input-xlarge width3"/>
                            </div>
                            <div className="clearContentTabDiv"></div>
                            <div className="contentline" />

                            <div className="contentTabDiv">
                                <div className="subHeader">资源类型</div>
                            </div>
                            <div className="clearContentTabDiv"></div>
                            <div className='contentTabDiv marginRight_8'>
                                <a id="resourceType_all" className="input-xlarge width10 active" onClick={this._handleOnClickType}>所有</a>
                            </div>
                            {resourceTypes.map(function(resourceType) {
                                if(resourceType.ifshow) {
                                    return (
                                        <div className='contentTabDiv marginRight_8'>
                                            <a id={"resourceType_"+resourceType.RecId} className="input-xlarge width10" onClick={_this._handleOnClickType}>{resourceType.typeAlias}</a>
                                        </div>
                                    );
                                }
                            })}
                            <div className="clearContentTabDiv"></div>
                            <div className="contentline" />

                            <div className="contentTabDiv">
                                <div className="subHeader">资源列表</div>
                            </div>
                            <div className="clearContentTabDiv"></div>

                            <table id='createResourceTable'
                                   data-toggle='table'
                                   data-classes='table table-no-bordered table-striped table-hover'
                                   data-height={350}>
                            </table>
                            <div className="clearContentTabDiv"></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

CreateResourceModal.propTypes = {
  createResourcesTableData: PropTypes.array.isRequired,
  resourceTypes: PropTypes.array.isRequired,
  setSelectedResource: PropTypes.func.isRequired,
  getResourceTypes: PropTypes.func.isRequired,
  getResourcesByTypeId: PropTypes.func.isRequired,
  getResourcesBySearchName: PropTypes.func.isRequired
};

module.exports = CreateResourceModal;
