/**
* xuexue.yin  2016/01/14.
* 拓扑导航
*/

require('bootstrap');
import React from 'react'
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var ReactWidgets = require('react-widgets');
var { Map, Marker, Popup, TileLayer } = require('react-leaflet');
var _leaflet = require('leaflet');

var Store = require('../../../../server/store');

var Globalize = require('globalize')
var globalizeLocalizer = require('react-widgets/lib/localizers/globalize')
globalizeLocalizer(Globalize);

var didUpdate = 0;
var selectRoleModal = 0;
var TopologyNavView_desView_Map = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return {
          current_map: 1,
          map_area: '',
          nodePoint: {}
        }
    },
    componentDidMount: function() {
        didUpdate = 0;
        var that = this;
        //that.getFlux().actions.YFTTopologyNavActions.onGetTpjbDictionaryData();
        this.props.onGetTpjbDictionaryData();
        if (this.isMounted()) {
          var map = this.refs.searchMap.getLeafletElement();
          map.on('zoomend', this.onZoomChange);//绑定zoomend事件
          // setTimeout(function(){
          //   //var territory = '';
          //   var tempparam = {
          //     MAPLV:""
          //   };
          //   that.getFlux().actions.YFTTopologyNavActions.getAllMapMarkersList(tempparam);
          //   //that.setState({map_area: territory});
          // },800);
          var tempparam = {
            MAPLV:''
          };
          this.props.getAllMapMarkersList(tempparam);
        }
    },
    componentDidUpdate: function(){
      //console.log('componentDidUpdate');
      $("#topoMapView .showdetail").click(function(){
        //console.log('id------------------------------');
        var nodePoint = this.state.nodePoint;
        if(!nodePoint.USER && !nodePoint.PASSWD && !nodePoint.HOST){
          $.showPublicDialog("系统提示","用户名、密码或跳转地址为有一个为空，所以不能进行跳转。");
          return;
        };
        //console.log(nodePoint);
        if (nodePoint.ID) {
          var param = {
            id:nodePoint.ID,
            host:"O_HOST",
            USER: nodePoint.USER,
            PASSWD: nodePoint.PASSWD,
            HOSTA: nodePoint.HOST
          };
          if(didUpdate == 0){
            selectRoleModal = 0;
            didUpdate = 3;//是执行 click 事件促发的 componentDidUpdate
            //this.getFlux().actions.YFTTopologyNavActions.getMapNodeToken(param);
            //this.props.getMapNodeToken(param);//上个版本
            this.props.getMapNodeTokenNew(param);
          };
          if (this.props.nodeToken == "") {
            didUpdate = 0;
          };
          if (this.props.nodeToken) {
            //console.log(this.props.nodeToken);
            if(localStorage.getItem("multi_roles_topolog") == "1") {
              if(selectRoleModal == 0){
                $('#topologSelectRoleModal').modal('show');
              };
              selectRoleModal = 1;
            }else{
              var url = "http://" + nodePoint.HOST;
              var token = this.props.nodeToken;
              var role = localStorage.getItem("CURRENT_ROLENAME_topolog");
              //console.log(token);
              // var par = {
              //   token: token,
              //   loginid: nodePoint.USER,
              //   host: nodePoint.HOST,
              //   role: role
              // }
              // this.getFlux().actions.YFTTopologyNavActions.onGetUserInfoByToken(par);
              // this.props.onGetUserInfoByToken(par);
              var href = url + '/yft/index.html#/cityIndex';
              //var href = url + '/#/cityIndex';//测试用
              window.location.href = href + "/" + token + "/" + nodePoint.USER +"/" + role;
              //window.location.reload();//刷新当前页面(不能用)
            }
          }
        }
      }.bind(this));
      $("#topoMapView .showdetailnet").click(function(){
        //console.log('id-outer net-----------------------------');
        var nodePoint = this.state.nodePoint;
        if(!nodePoint.USER && !nodePoint.PASSWD && !nodePoint.HOST){
          $.showPublicDialog("系统提示","用户名、密码或跳转地址为有一个为空，所以不能进行跳转。");
          return;
        };
        //console.log(nodePoint);
        if (nodePoint.ID) {
          var param = {
            id:nodePoint.ID,
            host:"IN_HOST",
            USER: nodePoint.USER,
            PASSWD: nodePoint.PASSWD,
            HOSTA: nodePoint.IN_HOST
          };
          if(didUpdate == 0){
            selectRoleModal = 0;
            didUpdate = 3;//是执行 click 事件促发的 componentDidUpdate
            //this.getFlux().actions.YFTTopologyNavActions.getMapNodeToken(param);
            //this.props.getMapNodeToken(param);//上个版本
            this.props.getMapNodeTokenNew(param);
          };
          if (this.props.nodeToken == "") {
            didUpdate = 0;
          };
          if (this.props.nodeToken) {
            if(localStorage.getItem("multi_roles_topolog") == "1") {
              if(selectRoleModal == 0){
                $('#topologSelectRoleNetModal').modal('show');
              };
              selectRoleModal = 1;
            }else{
              var url = "http://" + nodePoint.IN_HOST;
              var token = this.props.nodeToken;
              var role = localStorage.getItem("CURRENT_ROLENAME_topolog");

              var href = url + '/yft/index.html#/cityIndex';
              //var href = url + '/#/cityIndex';//测试用
              window.location.href = href + "/" + token + "/" + nodePoint.USER +"/" + role;
              //window.location.reload();//刷新当前页面(不能用)
            }
          }
        }
      }.bind(this));
    },
    onZoomChange: function(e){
       var map_area = this.state.map_area;
       var zoom = e.target._animateToZoom;
       var territory = '';
       for (var i = 0; i < this.props.tpjbdictionaryData.length; i++) {
         if(this.props.tpjbdictionaryData[i].LV){
           var mar = this.props.tpjbdictionaryData[i].LV.split('-');
           if(mar.length > 1){
             var istart = parseInt(mar[0]);
             var iend = parseInt(mar[1]);
             if(zoom >= istart && zoom <= iend){
               territory = this.props.tpjbdictionaryData[i].CODE;
               var tempparam = {
                 MAPLV:territory
               };
               if(map_area == ""){
                 if(this.props.initMAPLV){
                   if(this.props.initMAPLV.LV){
                     mar = this.props.initMAPLV.LV.split('-');
                     if(mar.length > 1){
                       istart = parseInt(mar[0]);
                       iend = parseInt(mar[1]);
                       if(zoom >= istart && zoom <= iend){
                         this.setState({map_area: territory});
                         break;
                       }else{
                         this.setState({map_area: territory});
                         //this.getFlux().actions.YFTTopologyNavActions.getAllMapMarkersList(tempparam);
                         this.props.getAllMapMarkersList(tempparam);
                         break;
                       };
                     }
                   };
                 };
               }else{
                 if (map_area !== territory) {
                   this.setState({map_area: territory});
                   //this.getFlux().actions.YFTTopologyNavActions.getAllMapMarkersList(tempparam);
                   this.props.getAllMapMarkersList(tempparam);
                   break;
                 }else{
                   break;
                 }
               };
             }
           }
         }
       };
       console.log(zoom);
    },
    componentWillUnmount: function() {
        // if (document.getElementById('popupEl')) {
        //   React.render(<p></p>, document.getElementById('popupEl'));
        // }
    },
    render: function() {
        //var height = document.documentElement.clientHeight > document.documentElement.scrollHeight ? document.documentElement.clientHeight : document.documentElement.scrollHeight;
        // height = height - 180;
        var height = $(window).height() - 110 - 30 - 40;
        //console.log(height);
        var mapUrl =  Store.get("mapUrl") +'/map/osm_tiles/{z}/{x}/{y}.png';
        //url='https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ'
        //公司地图服务器：/map/osm_tiles/{z}/{x}/{y}.png
        //用这个搜索某区域坐标 http://www.openstreetmap.org/export/#map=11/39.7956/115.8203
        //乌鲁木齐市  43.8059382, 87.6055852
        //新疆维吾尔自治区 41.047522, 85.9427714  #/cityIndex
        var position = [41.640, 87.979];//纬,经
        var izoom = 6;
        if(this.state.map_area == ""){
          if(this.props.mydeviceMaps.length > 0){
            if(this.props.mydeviceMaps[0].COORDINATES){
              var mar = this.props.mydeviceMaps[0].COORDINATES.split(',');
              position = [parseFloat(mar[1]),parseFloat(mar[0])];//纬,经
            };
          };
          if(this.props.initMAPLV){
            console.log("initMAPLV");
            console.log(this.props.initMAPLV);
            if(this.props.initMAPLV.DictDataDesc){
              var mar = this.props.initMAPLV.DictDataDesc.split('-');
              izoom = parseInt(mar[0]);
            };
          };
        };
        var deviceMaps = this.props.deviceMaps;
        console.log("deviceMaps");
        console.log(deviceMaps);
        var routerMarkersList = deviceMaps.map(function(device, i){
          var marker = {};
          var xhkey = i + 10000;
          if (device.COORDINATES) {
            var mar = device.COORDINATES.split(',')
            marker.lon = parseFloat(mar[0]);//经
            marker.lat = parseFloat(mar[1]);//纬
            var icon = {};
            switch (device.STATUS) {
              case 'good':
                icon = _leaflet.icon({
                  iconUrl: 'img/marker-icon.png',
                  iconAnchor: [13, 40],
                  popupAnchor: [0, -33],
                });
                break;
              case '':
              case 'error':
                icon = _leaflet.icon({
                  iconUrl: 'img/marker-error.png',
                  iconAnchor: [13, 40],
                  popupAnchor: [0, -33],
                });
                break;
              case 'warning':
                icon = _leaflet.icon({
                  iconUrl: 'img/marker-warn.png',
                  iconAnchor: [13, 40],
                  popupAnchor: [0, -33],
                });
                break;
              case 'disabled':
                icon = _leaflet.icon({
                  iconUrl: 'img/marker-dis.png',
                  iconAnchor: [13, 40],
                  popupAnchor: [0, -33],
                });
                break;
              default:
                icon = _leaflet.icon({
                  iconUrl: 'img/marker-icon.png',
                  iconAnchor: [13, 40],
                  popupAnchor: [0, -33],
                });
            }
            // if (!device.STATUS || device.STATUS == 'error') {
            //   icon = _leaflet.icon({
            //     iconUrl: 'public/img/marker-red.png',
            //     iconAnchor: [13, 40],
            //     popupAnchor: [0, -33],
            //   });
            // }else {
            //   icon = _leaflet.icon({
            //     iconUrl: 'public/img/marker-icon.png',
            //     iconAnchor: [13, 40],
            //     popupAnchor: [0, -33],
            //   });
            // }
            // Marker表示标注（在地图上示的形状）
            if(device.MAPLV == 'tptjb_county'){
              return (
                <Marker key={i} position={marker} icon={icon} onClick={this.handleClickMarker.bind(this, device)}>
                  <Popup>
                    <div id="popupEl">
                      <h5><b>{device.NAME}</b></h5>
                      <span>内网地址：<a className="showdetail" href="javascript:;">{device.HOST}</a></span>
                      <br/><br/>
                      <span>外网地址：<a className="showdetailnet" href="javascript:;">{device.IN_HOST}</a></span>
                    </div>
                  </Popup>
                </Marker>
              );
            }else{
              return (
                <Marker key={xhkey} position={marker} icon={icon} onClick={this.handleClickMarker.bind(this, device)}>
                  <Popup>
                    <div id="popupE2">
                      <h5><b>{device.NAME}</b></h5>
                      <span>正常数：{device.GOOD}</span>
                      <br/><br/>
                      <span>危险数：{device.WARNING}</span>
                      <br/><br/>
                      <span>错误数：{device.ERROR}</span>
                      <br/><br/>
                      <span>禁止数：{device.DISABLED}</span>
                    </div>
                  </Popup>
                </Marker>
              );
            }
          }
        }.bind(this));
        return (
          <div id="topoMapView" className='topoMapDiv col-md-12'>
            <Map center={position} zoom={izoom} style={{minHeight: height + 'px'}} ref="searchMap">
                <TileLayer
                  url= {mapUrl}
                />
                {routerMarkersList}
            </Map>
            <div id="over1" className="over"></div>
            <div id="layout1" className="layout"><img src="img/loading.gif" /></div>
          </div>
        );
    },
    handleClickMarker: function(node) {
      //console.log(node);
      didUpdate = 0;
      this.setState({nodePoint: node});
      //this.getFlux().actions.YFTTopologyNavActions.onSetNodePoint(node);
      this.props.onSetNodePoint(node);
      // node: Object
      // COORDINATES: "87.274865,44.020865"
      // HOST: "192.168.9.147:8080"
      // ID: "6523"
      // IN_HOST: "yft.siteview.com"
      // MAPLV: "tptjb_city"
      // NAME: "昌吉州"
      // PARENT_ID: "65"
      // SAFEGROUP_ID: "7AAFF886DA074CC18EA5121FBC700C32"
      // STATUS: "good"
      // PASSWD: "123456"
      // USER: "ceshi"
    }
});

module.exports = TopologyNavView_desView_Map;
