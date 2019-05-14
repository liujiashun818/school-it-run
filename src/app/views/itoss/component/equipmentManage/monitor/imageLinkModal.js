/*
* 资源监测-统一监控平台-摄像机图片
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

var ImageLinkModal = React.createClass({
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
        $('#imageLinkModal').on('show.bs.modal', function () {
            document.getElementById('imageLinkModalContent').src = "http://"+localStorage.getItem("DIAGNOSIS")+":80/Snapshots/"+_this.props.monitorTableSelectedRowData.LAG+".jpg";
            document.getElementById('imageLinkModal_videoName').innerText = _this.props.monitorTableSelectedRowData.VIDEONAME;
            document.getElementById('imageLinkModal_url').innerText = (localStorage.getItem("DIAGNOSIS")==null||localStorage.getItem("DIAGNOSIS")=="") ? "" : "http://"+localStorage.getItem("DIAGNOSIS")+":80/Snapshots/"+_this.props.monitorTableSelectedRowData.LAG+".jpg";
        });
        $('#imageLinkModal').on('shown.bs.modal', function () {
            if(document.getElementById('imageLinkModalContent').width+30 > $(window).width()) {
                document.getElementById('imageLinkModal').style.textAlign = "left";
                document.getElementById('imageLinkModalDialog').style.position = "absolute";
            }
            else {
                document.getElementById('imageLinkModal').style.textAlign = "center";
                document.getElementById('imageLinkModalDialog').style.display = "relative";
            }
        })
    },

    render : function(){
        return (
            <div className="modal fade" id="imageLinkModal" tabIndex="-1" role="dialog" aria-labelledby="imageLinkModalLabel" aria-hidden="true">
                <div id="imageLinkModalDialog" className="modal-dialog imageLinkModalDialog" style={{width:"auto"}}>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>摄像机名称：<span id="imageLinkModal_videoName"/></div>
                            <div>图片URL：<span id="imageLinkModal_url"/></div>
                            <div style={{textAlign:"center",width:"800px",height:"600px"}}>
                                <img id="imageLinkModalContent" style={{width:"800px",height:"600px"}}/>
                            </div>
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

ImageLinkModal.propTypes = {
	monitorTableSelectedRowData: PropTypes.object
}

module.exports = ImageLinkModal;
