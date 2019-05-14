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
var CreateMonitorModal = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },

    componentDidMount: function() {
        const { createMonitorsTableData, getMonitors, getMonitorsBySearchName } = this.props;
        $('#createMonitorTable').bootstrapTable({
            columns: [
                {
                    title: '资源',
                    field: 'name',
                    width: 120,
                    sortable: false
                }, {
                    title: '描述',
                    field: 'description',
                    sortable: false
                }, {
                    title: '返回值',
                    field: 'returnValue',
                    sortable: false
                }
            ],
            data: createMonitorsTableData,
            onClickRow: this._handleOnClickTableRow,
            rowAttributes:function(row,index){
              return {
                key: 'createMonitor'+index
              }
            }
        });

        var _this = this;
        $('#createMonitorModal').on('show.bs.modal', function () {
            const { selectedNode, equipmentModel } = _this.props;
            $('#createMonitorTable').bootstrapTable('resetView');
            getMonitors(selectedNode.type, selectedNode.connectionType, equipmentModel);
            $('#monitor_quickSearch').keyup(function(event){
                last = event.timeStamp;
                setTimeout(function(){
                    if(last-event.timeStamp == 0)
                    {
                        getMonitorsBySearchName($('#monitor_quickSearch').val(), selectedNode.type, selectedNode.connectionType);
                    }
                }, 500);
            });
        });
    },

    componentDidUpdate: function() {
        const { createMonitorsTableData } = this.props;
        $('#createMonitorTable').bootstrapTable('refreshOptions', {data: createMonitorsTableData});
    },

    _handleOnClickTableRow: function(row, element) {
        this.props.setSelectedMonitor(row);
        this.props.getMonitorAlarmConditionNameData(row.monitorType);
        this.props.getInitialAlarmConditionDataFromMonitorType(row.monitorType);
        this.props.setMonitorsPropertyEdit(false);
        $('#createMonitorModal').modal('hide');
        this.history.pushState(null,'equipmentManage/createMonitorPage');
    },

    _handleOnClickCommonMonitor: function(e) {
        const { commonMonitors } = this.props;
        for(var i = 0; i < commonMonitors.length; i++) {
            if(e.currentTarget.id.substring(14) == commonMonitors[i].id) {
                this.props.setSelectedMonitor(commonMonitors[i]);
                this.props.getMonitorAlarmConditionNameData(commonMonitors[i].monitorType);
                this.props.getInitialAlarmConditionDataFromMonitorType(commonMonitors[i].monitorType);
                this.props.setMonitorsPropertyEdit(false);
                $('#createMonitorModal').modal('hide');
                this.history.pushState(null,'equipmentManage/createMonitorPage');
                break;
            }
        }
    },

    render : function(){
        const { commonMonitors } = this.props;
        var _this = this;
        return (
            <div className="modal fade" id="createMonitorModal" tabIndex="-1" role="dialog" aria-labelledby="createMonitorModalLabel" aria-hidden="true">
                <div className="modal-dialog createMonitorModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">新建监测器</h4>
                        </div>
                        <div className="modal-body">
                            <div className="contentTabDiv">
                                <div className="subHeader">快速搜索</div>
                            </div>
                            <div className="clearContentTabDiv"></div>
                            <div className='contentTabDiv'>
                                <input id="monitor_quickSearch" type="text" className="input-xlarge width3"/>
                            </div>
                            <div className="clearContentTabDiv"></div>
                            <div className="contentline" />

                            <div className="contentTabDiv">
                                <div className="subHeader">常用监测器</div>
                            </div>
                            <div className="clearContentTabDiv"></div>
                            {commonMonitors.map(function(commonMonitor) {
                                return (
                                    <div className='contentTabDiv marginRight_8' key={"commonMonitor_"+commonMonitor.id}>
                                        <a id={"commonMonitor_"+commonMonitor.id} className="input-xlarge width10" onClick={_this._handleOnClickCommonMonitor}>{commonMonitor.name}</a>
                                    </div>
                                );
                            })}
                            <div className="clearContentTabDiv"></div>
                            <div className="contentline" />

                            <div className="contentTabDiv">
                                <div className="subHeader">可用监测器</div>
                            </div>
                            <div className="clearContentTabDiv"></div>

                            <table id='createMonitorTable'
                                   data-toggle='table'
                                   data-classes='table table-no-bordered table-hover table-striped'
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

CreateMonitorModal.propTypes = {
  createMonitorsTableData: PropTypes.array.isRequired,
  selectedNode: PropTypes.object,
  commonMonitors: PropTypes.array.isRequired,
  setSelectedMonitor: PropTypes.func.isRequired,
  getMonitorAlarmConditionNameData: PropTypes.func.isRequired,
  getInitialAlarmConditionDataFromMonitorType: PropTypes.func.isRequired,
  setMonitorsPropertyEdit: PropTypes.func.isRequired,
  getMonitors: PropTypes.func.isRequired,
  getMonitorsBySearchName: PropTypes.func.isRequired
};

module.exports = CreateMonitorModal;
