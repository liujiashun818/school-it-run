/*
* 资源监测-统一监控平台-摄像机视频
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

var base64 = require('../../../../../utils/base64');

var VideoLinkModal = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTDeviceMonitorStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    getInitialState: function() {
        return {
            // monitorName: ""
        };
    },

    componentDidMount: function() {
        var _this = this;
        $('#videoLinkModal').on('hidden.bs.modal', function () {
            var dom = document.getElementById('videoLinkModalBody');
            var videoFrameDom = dom.firstChild;
            dom.removeChild(videoFrameDom);
            videoFrameDom = null;
        })
        $('#videoLinkModal').on('show.bs.modal', function () {
            var videoFrameDom = document.createElement('iframe');
            videoFrameDom.style.width = $(window).width()*0.9 + 'px';
            videoFrameDom.style.height = $(window).height()*0.9 + 'px';
            videoFrameDom.src = "http://"+localStorage.getItem("DIAGNOSIS")+":80/play.htm?VIDEOFLAG="+_this.props.sipid;
            document.getElementById("videoLinkModalBody").appendChild(videoFrameDom);
        });
    },

    render : function(){
        return (
            <div className="modal fade" id="videoLinkModal" tabIndex="-1" role="dialog" aria-labelledby="videoLinkModalLabel" aria-hidden="true">
                <div className="modal-dialog videoLinkModalDialog" style={{width:"auto", marginTop:"10px"}}>
                    <div className="modal-content">
                        <div id="videoLinkModalBody" className="modal-body" style={{textAlign:"center"}}>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

VideoLinkModal.propTypes = {
	sipid: PropTypes.string.isRequired
}

module.exports = VideoLinkModal;
