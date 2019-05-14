/*
* 资源监测-统一监控平台-设置表显示
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

var FieldCheckBoxes = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    _handleOnClickCheckBox: function(e) {
        document.getElementById(e.currentTarget.id).checked = e.currentTarget.checked;
    },

    render: function() {
        var _this = this;
        return (
            <div className='row'>
                {this.props.groupAllColumnData.map(function(groupAllColumnData) {
                    return (
                        <div className='col-md-6'>
                            <label className='labelFontStyle'>
                                <input type="checkbox" id={"check_"+groupAllColumnData.recid} disabled={groupAllColumnData.isRequired=="1"?true:false} onClick={_this._handleOnClickCheckBox}/> {groupAllColumnData.showname}
                            </label>
                        </div>
                    );
                })}
            </div>
        );
    }
});

var DeviceTypeFormatter = React.createClass({
    render:function(){
        var imgSrc = "";
        switch (this.props.value) {
            case "1":
                imgSrc = "img/itoss/Boll.png";
                break;
            default:
                imgSrc = "img/itoss/Qj.png";
                break;
        }
        return (
            this.props.isImage=="1"?<img src={imgSrc}></img>:<div>{this.props.value}</div>
        );
    }
});

var StatusFormatter = React.createClass({
    render:function(){
        var imgSrc = "";
        switch (this.props.value) {
            case "1":
                imgSrc = "img/itoss/Good.png";
                break;
            case "0":
                imgSrc = "img/itoss/Error.png";
                break;
            case "-1":
                imgSrc = "img/itoss/Warning.png";
                break;
            default:
                imgSrc = "img/itoss/Good.png";
                break;
        }
        return (
            this.props.isImage=="1"?<img src={imgSrc}></img>:<div>{this.props.value}</div>
        );
    }
});

var ImageLinkFormatter = React.createClass({
    render:function(){
        if(this.props.isImage=="1") {
            return (
                <a href={this.props.value}>
                    <img src="img/itoss/Image.png"></img>
                </a>
            );
        }
        else {
            return (
                <div>{this.props.value}</div>
            );
        }
    }
});

var VideoLinkFormatter = React.createClass({
    render:function(){
        if(this.props.isImage=="1") {
            return (
                <a href={this.props.value}>
                    <img src="img/itoss/RealTimeVideo.png"></img>
                </a>
            );
        }
        else {
            return (
                <div>{this.props.value}</div>
            );
        }
    }
});

var FeedbackFormatter = React.createClass({
    render:function(){
        if(this.props.isImage=="1") {
            return (
                <a href={this.props.value}>
                    <img src="img/itoss/Feedback.png"></img>
                </a>
            );
        }
        else {
            return (
                <div>{this.props.value}</div>
            );
        }
    }
});

var FieldSettingModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    componentDidUpdate: function() {
        var _this = this;
        $('#fieldSettingModal').on('show.bs.modal', function () {
            for(var i = 0; i < _this.props.groupAllColumnData.length; i++) {
                document.getElementById("check_"+_this.props.groupAllColumnData[i].recid).checked = _this.props.groupAllColumnData[i].isshow=="1"?true:false;
            }
        })
    },

    _handleOnClickOK: function() {
        const { groupAllColumnData, set_MonitorTableColumns } = this.props;
        var columns = groupAllColumnData;
        for(var i=0; i<columns.length; i++) {
            columns[i].isshow = "0";
            if(document.getElementById('check_'+columns[i].recid).checked){
                columns[i].isshow = "1";
            }
        }

        set_MonitorTableColumns(columns);
    },

    render : function(){
        return (
            <div className="modal fade" id="fieldSettingModal" tabIndex="-1" role="dialog" aria-labelledby="fieldSettingModalLabel" aria-hidden="true">
                <div className="modal-dialog fieldSettingModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">显示字段设置</h5>
                        </div>
                        <div className="modal-body">
                            <FieldCheckBoxes groupAllColumnData={this.props.groupAllColumnData}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK}>确定</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

FieldSettingModal.propTypes = {
	groupAllColumnData: PropTypes.array.isRequired,
	set_MonitorTableColumns: PropTypes.func.isRequired
}

module.exports = FieldSettingModal;
