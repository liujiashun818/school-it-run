/**
 *
 * visio视图控件使用实例
 */

require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SvgVisio = require('./svgvisio.js');
var VisioShow =  React.createClass ({
  mixins: [Navigation, FluxMixin, StoreWatchMixin("YFTVisioStore")],
  selectitem :function(tag,data){
    console.log(tag);
   },
   updateProps:function(){

        },
   getStateFromFlux: function() {
     var flux = this.getFlux();
     return {
       visio:flux.store("YFTVisioStore").getState()
     }
   },
   componentWillMount:function(){
    //  this.getFlux().actions.YFTVisioAction.loadAll();
   },
   componentDidMount: function() {
    // var topologyArray = this.getFlux().store("YFTVisioStore").getState().topologyData;
    // console.log(topologyArray);
    alert();
     setInterval(this.updateProps,6000);
     console.log("VisioShow componentDidMount ");
   },
  render :function() {
    var svgContent='<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:v="http://schemas.microsoft.com/visio/2003/SVGExtensions/" width="8.26772in" height="11.6929in" viewBox="0 0 595.276 841.89" xml:space="preserve" color-interpolation-filters="sRGB" class="st15" preserveAspectRatio="xMidYMid meet" zoomAndPan="magnify" version="1.1" contentScriptType="text/ecmascript" contentStyleType="text/css"><v:documentProperties v:langID="2052" v:metric="true" v:viewMarkup="false">        <v:userDefs>            <v:ud v:nameU="msvNoAutoConnect" v:val="VT0(1):26"/>        </v:userDefs>    </v:documentProperties><style type="text/css" xml:space="preserve">    <![CDATA[        .st1 {fill:#ff00ff;fill-opacity:0;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:0;stroke-width:0.72}        .st2 {fill:url(#grad0-7)}        .st3 {stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.36}        .st4 {fill:url(#grad11-12)}        .st5 {stroke:#a78450;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.36}        .st6 {fill:url(#grad12-19);stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.36}        .st7 {stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5}        .st8 {fill:url(#grad12-28);stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.36}        .st9 {stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.6}        .st10 {fill:#000000;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.36}        .st11 {fill:url(#grad8-44);stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.12}        .st12 {fill:url(#grad10-49);stroke:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.12}        .st13 {fill:#000000;stroke:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.24}        .st14 {stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.36}        .st15 {fill:none;fill-rule:evenodd;font-size:12px;overflow:visible;stroke-linecap:square;stroke-miterlimit:3}    ]]>    </style><defs id="Patterns_And_Gradients"><linearGradient id="grad0-7" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(270 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="1" stop-color="#e1d8c1" stop-opacity="1"/></linearGradient><pattern id="grad11-12" x="0" y="0" width="1" height="1" patternContentUnits="objectBoundingBox" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad" preserveAspectRatio="xMidYMid meet"><path d="M 0 1 L 0 0 L 1 0 z" style="fill:url(#grad0-13)"/><path d="M 0 1 L 1 1 L 1 0 z" style="fill:url(#grad0-14)"/></pattern><linearGradient id="grad0-13" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(180 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="1" stop-color="#c9ba96" stop-opacity="1"/></linearGradient><linearGradient id="grad0-14" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(90 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="1" stop-color="#c9ba96" stop-opacity="1"/></linearGradient><pattern id="grad12-19" x="0" y="0" width="1" height="1" patternContentUnits="objectBoundingBox" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad" preserveAspectRatio="xMidYMid meet"><path d="M 0 0 L 0 1 L 1 1 z" style="fill:url(#grad0-20)"/><path d="M 0 0 L 1 0 L 1 1 z" style="fill:url(#grad0-21)"/></pattern><linearGradient id="grad0-20" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(90 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="1" stop-color="#b6a06d" stop-opacity="1"/></linearGradient><linearGradient id="grad0-21" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(360 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="1" stop-color="#b6a06d" stop-opacity="1"/></linearGradient><pattern id="grad12-28" x="0" y="0" width="1" height="1" patternContentUnits="objectBoundingBox" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad" preserveAspectRatio="xMidYMid meet"><path d="M 0 0 L 0 1 L 1 1 z" style="fill:url(#grad0-29)"/><path d="M 0 0 L 1 0 L 1 1 z" style="fill:url(#grad0-30)"/></pattern><linearGradient id="grad0-29" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(90 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="1" stop-color="#339966" stop-opacity="1"/></linearGradient><linearGradient id="grad0-30" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(360 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="1" stop-color="#339966" stop-opacity="1"/></linearGradient><linearGradient id="grad0-34" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(270 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="1" stop-color="#e7e4cd" stop-opacity="1"/></linearGradient><pattern id="grad8-44" x="0" y="0" width="1" height="1" patternContentUnits="objectBoundingBox" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad" preserveAspectRatio="xMidYMid meet"><path d="M 0 0 L 1 0 L 1 1 z" style="fill:url(#grad0-34)"/><path d="M 0 0 L 0 1 L 1 1 z" style="fill:url(#grad0-45)"/></pattern><linearGradient id="grad0-45" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(180 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="1" stop-color="#e7e4cd" stop-opacity="1"/></linearGradient><pattern id="grad10-49" x="0" y="0" width="1" height="1" patternContentUnits="objectBoundingBox" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad" preserveAspectRatio="xMidYMid meet"><path d="M 0.5 0.5 L 0 0 L 0 1 z" style="fill:url(#grad0-50)"/><path d="M 0.5 0.5 L 1 0 L 1 1 z" style="fill:url(#grad0-51)"/><path d="M 0.5 0.5 L 0 0 L 1 0 z" style="fill:url(#grad0-52)"/><path d="M 0.5 0.5 L 0 1 L 1 1 z" style="fill:url(#grad0-53)"/></pattern><linearGradient id="grad0-50" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(180 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#000000" stop-opacity="0.4"/><stop offset="1" stop-color="#e7e4cd" stop-opacity="0.4"/></linearGradient><linearGradient id="grad0-51" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(360 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#000000" stop-opacity="0.4"/><stop offset="1" stop-color="#e7e4cd" stop-opacity="0.4"/></linearGradient><linearGradient id="grad0-52" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(270 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#000000" stop-opacity="0.4"/><stop offset="1" stop-color="#e7e4cd" stop-opacity="0.4"/></linearGradient><linearGradient id="grad0-53" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(90 0.5 0.5)" xlink:type="simple" xlink:show="other" xlink:actuate="onLoad"><stop offset="0" stop-color="#000000" stop-opacity="0.4"/><stop offset="1" stop-color="#e7e4cd" stop-opacity="0.4"/></linearGradient><filter id="svgerror"><feFlood flood-color="red" result="base"/><feMorphology result="bigger" in="SourceGraphic" operator="dilate" radius="2"/><feColorMatrix result="mask" in="bigger" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/><feComposite result="drop" in="base" in2="mask" operator="in"/><feGaussianBlur result="blur" in="drop" stdDeviation="1"/><feBlend in="SourceGraphic" in2="blur" mode="normal"/></filter><filter id="svgwarn"><feFlood flood-color="#ffc20e" result="base"/><feMorphology result="bigger" in="SourceGraphic" operator="dilate" radius="2"/><feColorMatrix result="mask" in="bigger" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/><feComposite result="drop" in="base" in2="mask" operator="in"/><feGaussianBlur result="blur" in="drop" stdDeviation="1"/><feBlend in="SourceGraphic" in2="blur" mode="normal"/></filter><filter id="svgok"><feFlood flood-color="green" result="base"/><feMorphology result="bigger" in="SourceGraphic" operator="dilate" radius="2"/><feColorMatrix result="mask" in="bigger" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/><feComposite result="drop" in="base" in2="mask" operator="in"/><feGaussianBlur result="blur" in="drop" stdDeviation="1"/><feBlend in="SourceGraphic" in2="blur" mode="normal"/></filter></defs><g v:mID="5" v:index="1" v:groupContext="foregroundPage" class="svip" svip="192.168.1.6"><v:custProps>            <v:cp v:nameU="Row_1" v:lbl="SV_IP" v:type="0" v:langID="2052"  v:val="VT4(192.168.1.6)"/>        </v:custProps><title>ҳ-1</title><v:pageProperties v:drawingScale="0.0393701" v:pageScale="0.0393701" v:drawingUnits="24" v:shadowOffsetX="8.50394" v:shadowOffsetY="-8.50394"/><g id="group1-1" transform="translate(95.9914,-719.613)" v:mID="1" v:groupContext="group"><title>������</title><g id="shape2-2" v:mID="2" v:groupContext="shape"><path d="M51.02 781.53 L31.4 771.03 L0 788.13 L0.01 832.07 A33.0369 30.8521 -180 0 0 19.37 841.89 L51.02 824.78 L51.02        781.53 ZM8.71 794.97 A34.0948 31.84 -180 0 0 19.37 798.76 A33.7139 31.4843 0 0 1 8.71 794.97 Z" class="st1"/></g><g id="shape3-4" v:mID="3" v:groupContext="shape" transform="translate(0,-43.1295)"><path d="M19.36 841.89 L51.02 824.66 L31.4 814.15 L0 831.26 A34.0948 31.84 -180 0 0 19.37 841.89 L19.36 841.89 Z" class="st2"/><path d="M19.36 841.89 L51.02 824.66 L31.4 814.15 L0 831.26 A34.0948 31.84 -180 0 0 19.37 841.89" class="st3"/></g><g id="shape4-9" v:mID="4" v:groupContext="shape" transform="translate(0.0115937,-3.41061E-013)"><path d="M19.36 798.76 A33.7139 31.4843 0 0 1 0 788.08 L0 832.07 A33.0369 30.8521 -180 0 0 19.36 841.89 L19.35 798.76        L19.36 798.76 Z" class="st4"/><path d="M19.36 798.76 A33.7139 31.4843 0 0 1 0 788.08 L0 832.07 A33.0369 30.8521 -180 0 0 19.36 841.89 L19.35 798.76" class="st5"/></g><g id="shape5-16" v:mID="5" v:groupContext="shape" transform="translate(19.3628,-0.0487457)"><path d="M0 798.81 L0 841.89 L31.66 824.83 L31.66 781.58 L0 798.81 Z" class="st6"/></g><g id="shape6-22" v:mID="6" v:groupContext="shape" transform="translate(0,-0.00156214)"><path d="M51.02 781.53 L31.4 771.03 L0 788.13 L0.01 832.07 A33.0369 30.8521 -180 0 0 19.37 841.89 L51.02 824.78 L51.02        781.53" class="st7"/></g><g id="shape7-25" v:mID="7" v:groupContext="shape" transform="translate(-279.736,27.991) rotate(-20)"><ellipse cx="1.4821" cy="839.872" rx="1.4821" ry="2.01816" class="st8"/></g><g id="shape8-31" v:mID="8" v:groupContext="shape" transform="translate(3.13992,-6.23262)"><path d="M-0 829.92 A37.8205 34.5426 -96.44 0 0 13.08 836.64" class="st9"/><path d="M0 832.54 A37.8205 34.5426 -96.44 0 0 13.08 839.26" class="st9"/><path d="M0 835.17 A37.8205 34.5426 -96.44 0 0 13.08 841.89" class="st9"/></g><g id="group9-38" transform="translate(2.6166,-30.546)" v:mID="9" v:groupContext="group"><g id="shape10-39" v:mID="10" v:groupContext="shape" transform="translate(0,-7.06961)"><path d="M0.47 835.17 A32.9981 30.8159 -180 0 0 13.55 841.89 a0.670503 0.62616 -180 0 0 1.77636E-015 -1.22178         A32.1003 29.9774 0 0 1 0.73 834.14 a0.434387 0.40566 -180 0 0 -0.725202 0.344859 a0.946727 0.884117         -180 0 0 0.463543 0.681433 Z" class="st10"/></g><g id="shape11-41" v:mID="11" v:groupContext="shape" transform="translate(4.16081,-8.60965)"><path d="M4.02 841.84 A4.90309 2.98481 -90.9 0 0 0.1 839.88 A3.22599 1.60837 -180 0 0 4.02 841.84 Z" class="st11"/></g><g id="shape12-46" v:mID="12" v:groupContext="shape" transform="translate(0.523319,-0.0610888)"><path d="M0 831.75 L0 835.17 A35.496 33.1485 -180 0 0 13.08 841.89 L13.08 838.47 A36.6577 34.2334 0 0 1 -0 831.75         Z" class="st12"/></g><g id="shape13-54" v:mID="13" v:groupContext="shape" transform="translate(0.523319,-1.95484)"><path d="M0 835.17 A32.1279 30.0032 -180 0 0 13.08 841.89 L13.08 841.03 A35.5103 33.1619 0 0 1 0 834.31 L0 835.17         Z" class="st13"/></g><g id="shape14-56" v:mID="14" v:groupContext="shape" transform="translate(0.523319,-0.122178)"><path d="M0 831.75 L0 835.17 A35.496 33.1485 -180 0 0 13.08 841.89" class="st3"/></g><g id="shape15-59" v:mID="15" v:groupContext="shape" transform="translate(0.523319,1.13687E-013)"><path d="M13.08 841.89 L13.08 838.47 A36.6577 34.2334 0 0 1 -0 831.75" class="st14"/></g></g></g></g></svg>';
    var ipdata =[{"ip":"192.168.1.6","mid":"ip1","state":102,"desc":"ip:192.168.1.6"},
    {"ip":"192.168.1.6","mid":"1","state":1,"desc":"ping ok"},
    {"ip":"192.168.1.6","mid":"2","state":1,"desc":"磁盘监测ok"}];
    var assetsdata =[{"ip":"192.168.1.6","mid":"ip1","state":102,"desc":"ip:192.168.1.6"},
    {"ip":"192.168.1.6","mid":"1","state":999,"desc":"Mac:UIIH8998JKK"}];
    var linkdata=[{"link":"sss","state":101}];
    var linedata=[{"line":"interface1","state":100,"v1":"10kbps"},{"line":"interface2","state":101,"v1":"200kbps"}];
    return <div><SvgVisio   SvgContent={svgContent} IPData={ipdata} DevData={assetsdata} LinkData={linedata} LineData={linedata}  selectitem={this.selectitem}/></div>;
  }
});
module.exports = VisioShow;