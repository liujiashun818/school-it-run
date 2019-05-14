// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var moment = require('moment');

var DutyLogModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTOperationStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_operation:flux.store("YFTOperationStore").getState()
    //     }
    // },

    getInitialState: function() {
        return {
        };
    },

    // componentDidMount: function() {
    //     const { clickedDutyLog } = this.props;
    //     var _this = this;
    //     $('#dutyLogModal').on('show.bs.modal', function () {
    //         if(clickedDutyLog) {
    //             document.getElementById("dutyLogTextarea").value = clickedDutyLog.content;
    //         }
    //         else {
    //             document.getElementById("dutyLogTextarea").value = "";
    //         }
    //     });
    // },

    componentDidUpdate: function() {
        const { clickedDutyLog } = this.props;
        var _this = this;
        $('#dutyLogModal').on('shown.bs.modal', function () {
            if(clickedDutyLog) {
                document.getElementById("dutyLogTextarea").value = clickedDutyLog.content;
            }
            else {
                document.getElementById("dutyLogTextarea").value = "";
            }
        });
    },

    _handleOnClickConfirm: function() {
        const { clickedDutyLog, update_dutyLog, add_dutyLog, selectedCalendarDate, get_dutyLog, get_dutySignIn } = this.props;
        var logContent = $.trim($("#dutyLogTextarea").val());
        if(logContent==null||logContent=="") {
            alert("请填写日志");
            return false;
        }

        $('#dutyLogModal').modal('hide');
        if(clickedDutyLog) {
            var param = {
                RecId: clickedDutyLog.id,
                Content: logContent,
                UserName: clickedDutyLog.userName
            };
            update_dutyLog(param);
        }
        else {
            var param = {
                Content: logContent,
                UserName: localStorage.getItem("USERNAME")
            };
            add_dutyLog(param);
        }

        var _this = this;
        setTimeout(function () {
            // var selectedCalendarDate = _this.getFlux().store("YFTOperationStore").getState().SelectedCalendarDate;
            var selectedYear = selectedCalendarDate.substring(0, selectedCalendarDate.indexOf("-"));
            var selectedMonth = parseInt(selectedCalendarDate.substring(selectedCalendarDate.indexOf("-")+1, selectedCalendarDate.lastIndexOf("-")))+1;
            var selectedDay = selectedCalendarDate.substr(selectedCalendarDate.lastIndexOf("-")+1);
            var filter = [
                {key:"CreatedDateTime", symbol:"ge", value:selectedYear+'-'+selectedMonth+'-'+selectedDay+'T00:00:00'},
                {key:"CreatedDateTime", symbol:"le", value:selectedYear+'-'+selectedMonth+'-'+selectedDay+'T23:59:59'}
            ];
            get_dutyLog(filter);
            get_dutySignIn(filter);
        }, 100);
    },

    render : function(){
        return (
            <div className="modal fade" id="dutyLogModal" tabIndex="-1" role="dialog" aria-labelledby="dutyLogModalLabel" aria-hidden="true">
                <div className="modal-dialog advancedSearchModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">值班日志</h5>
                        </div>
                        <div className="modal-body">
                            <textarea id="dutyLogTextarea" className="form-control" rows="5" style={{maxWidth:"668px"}}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickConfirm}>确定</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

DutyLogModal.propTypes = {
    clickedDutyLog: PropTypes.object,
    update_dutyLog: PropTypes.func.isRequired,
    add_dutyLog: PropTypes.func.isRequired,
    selectedCalendarDate: PropTypes.string.isRequired,
    get_dutyLog: PropTypes.func.isRequired,
    get_dutySignIn: PropTypes.func.isRequired
}

module.exports = DutyLogModal;
