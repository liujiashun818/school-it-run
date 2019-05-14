/*
* 资源监测-统一监控平台-反馈恢复所有默认参数
*/
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
var util = require('../../../../../utils/util.js');

var FeedbackRestoreAllModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    _handleOnClickOK: function() {
        const { groupTableData, setUserFeedbackReset } = this.props;
        var param = {};
        param.VIDEOFLAG = groupTableData[0].LAG;
        param.ALARMTIME_FEEDBACK = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
        param.FEEDBCAK_USERID = localStorage.getItem("localUserName");
        param.FEEDBCAK_RESET = 2;
        // this.getFlux().actions.YFTDeviceMonitorActions.set_userFeedback(param);
        setUserFeedbackReset({
            data: param,
            callback: function(resp){
                // alert("设置成功");
            },
            error: function(resp){
                // alert("恢复失败：\n"+resp);
                setTimeout(function(){
                  document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                  document.getElementById('publicMessageModalcontent').innerHTML = "恢复失败： "+resp
                  $('#publicMessageModal').modal('show');
                },100);
            },
        });
        $('#feedbackRestoreAllModal').modal('hide');
    },

    render : function(){
        return (
            <div className="modal fade" id="feedbackRestoreAllModal" tabIndex="-1" role="dialog" aria-labelledby="feedbackRestoreAllModalLabel" aria-hidden="true">
                <div className="modal-dialog feedbackModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">恢复默认诊断参数</h5>
                        </div>
                        <div className="modal-body">
                            是否恢复所有摄像机默认图像质量诊断参数？
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickOK}>确定</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

FeedbackRestoreAllModal.propTypes = {
	groupTableData: PropTypes.array.isRequired,
	setUserFeedbackReset: PropTypes.func.isRequired
}

module.exports = FeedbackRestoreAllModal;
