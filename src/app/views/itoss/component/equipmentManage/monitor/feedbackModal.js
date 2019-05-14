/*
* 资源监测-统一监控平台-摄像机反馈
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

var FeedbackModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    componentDidUpdate: function() {
        var _this = this;
        $('#feedbackModal').on('show.bs.modal', function () {
            document.getElementById("cb_currentStatus_BRIGHT").checked = _this.props.monitorTableSelectedRowData.BRIGHT != "1" ? true : false;
            document.getElementById("cb_modifiedStatus_BRIGHT").checked = _this.props.monitorTableSelectedRowData.BRIGHT != "1" ? true : false;
            document.getElementById("cb_currentStatus_DIM").checked = _this.props.monitorTableSelectedRowData.DIM != "1" ? true : false;
            document.getElementById("cb_modifiedStatus_DIM").checked = _this.props.monitorTableSelectedRowData.DIM != "1" ? true : false;
            document.getElementById("cb_currentStatus_COLORCOST").checked = _this.props.monitorTableSelectedRowData.COLORCOST != "1" ? true : false;
            document.getElementById("cb_modifiedStatus_COLORCOST").checked = _this.props.monitorTableSelectedRowData.COLORCOST != "1" ? true : false;
            document.getElementById("cb_currentStatus_DEFINITION").checked = _this.props.monitorTableSelectedRowData.DEFINITION != "1" ? true : false;
            document.getElementById("cb_modifiedStatus_DEFINITION").checked = _this.props.monitorTableSelectedRowData.DEFINITION != "1" ? true : false;
            document.getElementById("cb_currentStatus_SNOWFLAKE").checked = _this.props.monitorTableSelectedRowData.SNOWFLAKE != "1" ? true : false;
            document.getElementById("cb_modifiedStatus_SNOWFLAKE").checked = _this.props.monitorTableSelectedRowData.SNOWFLAKE != "1" ? true : false;
            document.getElementById("cb_currentStatus_STREAK").checked = _this.props.monitorTableSelectedRowData.STREAK != "1" ? true : false;
            document.getElementById("cb_modifiedStatus_STREAK").checked = _this.props.monitorTableSelectedRowData.STREAK != "1" ? true : false;
            document.getElementById("cb_currentStatus_FREEZE").checked = _this.props.monitorTableSelectedRowData.FREEZE != "1" ? true : false;
            document.getElementById("cb_modifiedStatus_FREEZE").checked = _this.props.monitorTableSelectedRowData.FREEZE != "1" ? true : false;
            document.getElementById("cb_currentStatus_COVERSTATUS").checked = _this.props.monitorTableSelectedRowData.COVERSTATUS != "1" ? true : false;
            document.getElementById("cb_modifiedStatus_COVERSTATUS").checked = _this.props.monitorTableSelectedRowData.COVERSTATUS != "1" ? true : false;
            document.getElementById("cb_currentStatus_SCREENSCROLL").checked = _this.props.monitorTableSelectedRowData.SCREENSCROLL != "1" ? true : false;
            document.getElementById("cb_modifiedStatus_SCREENSCROLL").checked = _this.props.monitorTableSelectedRowData.SCREENSCROLL != "1" ? true : false;
            document.getElementById("cb_currentStatus_SCREENSHAKE").checked = _this.props.monitorTableSelectedRowData.SCREENSHAKE != "1" ? true : false;
            document.getElementById("cb_modifiedStatus_SCREENSHAKE").checked = _this.props.monitorTableSelectedRowData.SCREENSHAKE != "1" ? true : false;
        });
    },

    _handleOnClickOK: function() {
        const { monitorTableSelectedRowData, setUserFeedback } = this.props;
        var bStatusChanged = false, param = {};
        param.BRIGHT_BEFORE = monitorTableSelectedRowData.BRIGHT;
        if(document.getElementById("cb_currentStatus_BRIGHT").checked != document.getElementById("cb_modifiedStatus_BRIGHT").checked) {
            bStatusChanged = true;
            param.BRIGHT_MODIFIED = document.getElementById("cb_modifiedStatus_BRIGHT").checked ? 0 : 1;
        }
        else {
            param.BRIGHT_MODIFIED = monitorTableSelectedRowData.BRIGHT;
        }

        param.DIM_BEFORE = monitorTableSelectedRowData.DIM;
        if(document.getElementById("cb_currentStatus_DIM").checked != document.getElementById("cb_modifiedStatus_DIM").checked) {
            bStatusChanged = true;
            param.DIM_MODIFIED = document.getElementById("cb_modifiedStatus_DIM").checked ? 0 : 1;
        }
        else {
            param.DIM_MODIFIED = monitorTableSelectedRowData.DIM;
        }

        param.COLOR_COST_BEFORE = monitorTableSelectedRowData.COLORCOST;
        if(document.getElementById("cb_currentStatus_COLORCOST").checked != document.getElementById("cb_modifiedStatus_COLORCOST").checked) {
            bStatusChanged = true;
            param.COLOR_COST_MODIFIED = document.getElementById("cb_modifiedStatus_COLORCOST").checked ? 0 : 1;
        }
        else {
            param.COLOR_COST_MODIFIED = monitorTableSelectedRowData.COLORCOST;
        }

        param.DEFINITION_BEFORE = monitorTableSelectedRowData.DEFINITION;
        if(document.getElementById("cb_currentStatus_DEFINITION").checked != document.getElementById("cb_modifiedStatus_DEFINITION").checked) {
            bStatusChanged = true;
            param.DEFINITION_MODIFIED = document.getElementById("cb_modifiedStatus_DEFINITION").checked ? 0 : 1;
        }
        else {
            param.DEFINITION_MODIFIED = monitorTableSelectedRowData.DEFINITION;
        }

        param.SNOWFLAKE_BEFORE = monitorTableSelectedRowData.SNOWFLAKE;
        if(document.getElementById("cb_currentStatus_SNOWFLAKE").checked != document.getElementById("cb_modifiedStatus_SNOWFLAKE").checked) {
            bStatusChanged = true;
            param.SNOWFLAKE_MODIFIED = document.getElementById("cb_modifiedStatus_SNOWFLAKE").checked ? 0 : 1;
        }
        else {
            param.SNOWFLAKE_MODIFIED = monitorTableSelectedRowData.SNOWFLAKE;
        }

        param.STREAK_BEFORE = monitorTableSelectedRowData.STREAK;
        if(document.getElementById("cb_currentStatus_STREAK").checked != document.getElementById("cb_modifiedStatus_STREAK").checked) {
            bStatusChanged = true;
            param.STREAK_MODIFIED = document.getElementById("cb_modifiedStatus_STREAK").checked ? 0 : 1;
        }
        else {
            param.STREAK_MODIFIED = monitorTableSelectedRowData.STREAK;
        }

        param.FREEZE_BEFORE = monitorTableSelectedRowData.FREEZE;
        if(document.getElementById("cb_currentStatus_FREEZE").checked != document.getElementById("cb_modifiedStatus_FREEZE").checked) {
            bStatusChanged = true;
            param.FREEZE_MODIFIED = document.getElementById("cb_modifiedStatus_FREEZE").checked ? 0 : 1;
        }
        else {
            param.FREEZE_MODIFIED = monitorTableSelectedRowData.FREEZE;
        }

        param.COVERSTATUS_BEFORE = monitorTableSelectedRowData.COVERSTATUS;
        if(document.getElementById("cb_currentStatus_COVERSTATUS").checked != document.getElementById("cb_modifiedStatus_COVERSTATUS").checked) {
            bStatusChanged = true;
            param.COVERSTATUS_MODIFIED = document.getElementById("cb_modifiedStatus_COVERSTATUS").checked ? 0 : 1;
        }
        else {
            param.COVERSTATUS_MODIFIED = monitorTableSelectedRowData.COVERSTATUS;
        }

        param.SCROLL_BEFORE = monitorTableSelectedRowData.SCREENSCROLL;
        if(document.getElementById("cb_currentStatus_SCREENSCROLL").checked != document.getElementById("cb_modifiedStatus_SCREENSCROLL").checked) {
            bStatusChanged = true;
            param.SCROLL_MODIFIED = document.getElementById("cb_modifiedStatus_SCREENSCROLL").checked ? 0 : 1;
        }
        else {
            param.SCROLL_MODIFIED = monitorTableSelectedRowData.SCREENSCROLL;
        }

        param.SHAKE_BEFORE = monitorTableSelectedRowData.SCREENSHAKE;
        if(document.getElementById("cb_currentStatus_SCREENSHAKE").checked != document.getElementById("cb_modifiedStatus_SCREENSHAKE").checked) {
            bStatusChanged = true;
            param.SHAKE_MODIFIED = document.getElementById("cb_modifiedStatus_SCREENSHAKE").checked ? 0 : 1;
        }
        else {
            param.SHAKE_MODIFIED = monitorTableSelectedRowData.SCREENSHAKE;
        }

        if(bStatusChanged) {
            param.VIDEOFLAG = monitorTableSelectedRowData.LAG;
            param.SIGNALSTATUS_BEFORE = -2;
            param.SIGNAL_LOSS_BEFORE = monitorTableSelectedRowData.SIGNALLOSS;
            param.PTZ_BEFORE = monitorTableSelectedRowData.PTZ;
            param.SIGNALSTATUS_MODIFIED = -2;
            param.SIGNAL_LOSS_MODIFIED = monitorTableSelectedRowData.SIGNALLOSS;
            param.PIZ_MODIFIED = monitorTableSelectedRowData.PTZ;
            param.ALARMTIME_BEFORE = monitorTableSelectedRowData.ALARMTIME;
            param.ALARMTIME_FEEDBACK = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
            param.FEEDBCAK_USERID = localStorage.getItem("localUserName");
            param.FEEDBCAK_RESET = 0;
            // this.getFlux().actions.YFTDeviceMonitorActions.set_userFeedback(param);
            setUserFeedback({
                data: param,
                callback: function(resp){
                    // alert("设置成功");
                },
                error: function(resp){
                    // alert("设置用户反馈失败：\n"+resp);
                    setTimeout(function(){
                      document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                      document.getElementById('publicMessageModalcontent').innerHTML = "设置用户反馈失败： "+resp
                      $('#publicMessageModal').modal('show');
                    },100);
                },
            });
        }
        $('#feedbackModal').modal('hide');
    },

    render : function(){
        return (
            <div className="modal fade" id="feedbackModal" tabIndex="-1" role="dialog" aria-labelledby="feedbackModalLabel" aria-hidden="true">
                <div className="modal-dialog feedbackModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">反馈</h5>
                        </div>
                        <div className="modal-body">
                            <div className="col-md-12">
                                <span className="col-md-offset-2 col-md-1 textAlignCenter">偏亮</span>
                                <span className="col-md-1 textAlignCenter">偏暗</span>
                                <span className="col-md-1 textAlignCenter">偏色</span>
                                <span className="col-md-1 textAlignCenter">清晰度</span>
                                <span className="col-md-1 textAlignCenter">雪花</span>
                                <span className="col-md-1 textAlignCenter">条纹</span>
                                <span className="col-md-1 textAlignCenter">冻结</span>
                                <span className="col-md-1 textAlignCenter">遮挡</span>
                                <span className="col-md-1 textAlignCenter">滚屏</span>
                                <span className="col-md-1 textAlignCenter">抖屏</span>
                            </div>
                            <div className="col-md-12">
                                <span className="col-md-2 textAlignCenter">当前状态</span>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_currentStatus_BRIGHT" type="checkbox" disabled={true} defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_currentStatus_DIM" type="checkbox" disabled={true} defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_currentStatus_COLORCOST" type="checkbox" disabled={true} defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_currentStatus_DEFINITION" type="checkbox" disabled={true} defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_currentStatus_SNOWFLAKE" type="checkbox" disabled={true} defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_currentStatus_STREAK" type="checkbox" disabled={true} defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_currentStatus_FREEZE" type="checkbox" disabled={true} defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_currentStatus_COVERSTATUS" type="checkbox" disabled={true} defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_currentStatus_SCREENSCROLL" type="checkbox" disabled={true} defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_currentStatus_SCREENSHAKE" type="checkbox" disabled={true} defaultChecked={false}/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <span className="col-md-2 textAlignCenter">修正状态</span>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_modifiedStatus_BRIGHT" type="checkbox" defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_modifiedStatus_DIM" type="checkbox" defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_modifiedStatus_COLORCOST" type="checkbox" defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_modifiedStatus_DEFINITION" type="checkbox" defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_modifiedStatus_SNOWFLAKE" type="checkbox" defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_modifiedStatus_STREAK" type="checkbox" defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_modifiedStatus_FREEZE" type="checkbox" defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_modifiedStatus_COVERSTATUS" type="checkbox" defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_modifiedStatus_SCREENSCROLL" type="checkbox" defaultChecked={false}/>
                                </div>
                                <div className="col-md-1 textAlignCenter">
                                    <input id="cb_modifiedStatus_SCREENSHAKE" type="checkbox" defaultChecked={false}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" data-toggle="modal" data-target="#feedbackRestoreModal">恢复默认参数</button>
                            <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickOK}>确定</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

FeedbackModal.propTypes = {
	monitorTableSelectedRowData: PropTypes.object,
	setUserFeedback: PropTypes.func.isRequired
}

module.exports = FeedbackModal;
