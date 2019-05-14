/**
 * Created by yinxuexue on 2016/02/19.
 */
require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var base64 = require('../../../../../utils/base64');

var VideoLeftBar = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return{//@MODIFY

        }
    },
    componentDidMount: function(){
        // var bShowCameravideocheck = false, bShowCameraofflinereport = false;
        // var temp = localStorage.getItem("PERMISSIONS");
        // temp = base64.base64decode(temp);
        // temp = decodeURI(temp);
        // var permissionsValue = eval(temp);
        // for(var i = 0; i < permissionsValue.length; i++) {
        //     if(permissionsValue[i].resourceType == "/reportmanage/video/cameravideocheck") {
        //         bShowCameravideocheck = true;
        //     }
            // else if(permissionsValue[i].resourceType == "/reportmanage/video/cameraofflinereport") {
            //     bShowCameraofflinereport = true;
            // }
        // }
        // if(!bShowCameravideocheck) {
        //     $("#camera_left_a1").hide();
        // }
        // if(!bShowCameraofflinereport) {
        //     $("#camera_left_a2").hide();
        // }
    },
    _handleOnClick: function(e) {
        if(e.currentTarget.id == 'camera_left_a1'){
            this.history.pushState(null,'reportManage/depvideoReport/cameraVideoCheck');
        };
        // else if(e.currentTarget.id == 'camera_left_a2'){
        //     this.history.pushState(null,'reportManage/videoReport/cameraOfflineReport');
        // }
    },
    render: function() {
      return (
        <div className='leftListDiv col-md-2'>
          <div className="assetManageListDiv">
            <div className="iq-list">
              <div className="list-group">
                <a className={"list-group-item" + (this.props.activeMenu == 1 ? ' active' : '')} onClick={this._handleOnClick} id="camera_left_a1">摄像机视频考核</a>
              </div>
            </div>
          </div>
        </div>
      );
    },
});

module.exports = VideoLeftBar;
