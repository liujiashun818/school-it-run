/**
  createby zxn
  资源监测-视图
*/
var React = require('react');
require('bootstrap');
var Store = require('../../../../../server/store');
var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var History = ReactRouter.History;

// var ViewLeftList = require('./viewLeftList');
import ViewLeftList from './viewLeftList';
// var TopologyRightView = require('./topologyRightView');
// var saveSvgAsPng = require('./saveSvgAsPng.js');
var TopologyUtil = require('./topologyUtil');
var SvgVisio = require('../../visio/svgvisio');

import { connect } from 'react-redux';
import { loadVisioList ,getOneVisioData,destroyTopology,getAllGroupOrg,setTreeId,setEditTreeId,editVisioProperty,deleteVisio,emitSetVisioStatus } from '../../../../../actions/visio_action';

$(window).resize(function(){
  var dialogWidth = $(window).width();
  var dialogHeight = $(window).height();
  $('#myModalFullDialog').css({'width' : ''+(dialogWidth-100)+'','height' : ''+(dialogHeight-200)+''});
  $('.visio-modalBody').css('height',(dialogHeight-200));
  $('.visio-modalBody').find('svg').attr({'width' : ''+(dialogWidth-200)+'','height' : ''+(dialogHeight-220)+''});

  var height = $(window).height();
  height = height-150;
  $(".panelBasic").css("height",height+"px");

});
function createProgress() { return {
  __html: '<div class="progress progress-striped active" style="display:show"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 10%;"><span class="sr-only">40% 完成</span></div></div>'
}; };

function createSlider(){
  return{
    __html: '<input id="ex6" type="text" data-slider-min="0" data-slider-max="200" data-slider-step="1" data-slider-value="0" /><span id="ex6CurrentSliderValLabel">&nbsp;&nbsp;&nbsp;&nbsp;<span id="ex6SliderVal">0</span>%</span>'
  }
};

var visioStyleFlag = 0;
var svgWidth = 0;
var svgHeight = 0;
var autoRefresh;
var TopologyView = React.createClass({
    // mixins: [History],
    getInitialState:function(){
      return {
        isDo:0,
        flag:0,
        visioModal:''
      }
    },
    componentWillMount: function(){
      const { dispatch } = this.props;
      dispatch(getAllGroupOrg());
      var temp = Store.get("localUserName");
      if(temp != "admin"){
        dispatch(loadVisioList({ORGANIZATION:this.props.getTreeId}));
      }else{
        dispatch(loadVisioList({}));
      }
    },
    componentDidMount: function() {
      visioStyleFlag = 0
      var height = $(window).height();
      height = height-150;
      $(".panelBasic").css("height",height+"px");

      $("#ex6").slider();
      $("#ex6").on('slide', function (slideEvt) {
          $("#ex6SliderVal").text(slideEvt.value);
          if(visioStyleFlag == 0){
            svgWidth = $('.visio-modalBody').find('svg').get(0).clientWidth;
            svgHeight = $('.visio-modalBody').find('svg').get(0).clientHeight;
            visioStyleFlag = 1;
          }
          $('.visio-modalBody').find('svg').attr({'width' : ''+(svgWidth+slideEvt.value*5)+'','height' : ''+(svgHeight+slideEvt.value*5)+''});
      });
      $('.slider-horizontal').on('click',function(e){
        $("#ex6SliderVal").text($('.tooltip-inner').text());

        var tInt = parseInt($('.tooltip-inner').text());
        if(visioStyleFlag == 0){
          svgWidth = $('.visio-modalBody').find('svg').get(0).clientWidth;
          svgHeight = $('.visio-modalBody').find('svg').get(0).clientHeight;
          visioStyleFlag = 1;
        }
        $('.visio-modalBody').find('svg').attr({'width' : ''+(svgWidth+tInt*5)+'','height' : ''+(svgHeight+tInt*5)+''});
      });

      var dialogWidth = $(window).width();
      var dialogHeight = $(window).height();
      $('#myModalFullDialog').css({'width' : ''+(dialogWidth-100)+'','height' : ''+(dialogHeight-200)+''});
      $('.visio-modalBody').css('height',(dialogHeight-200));
      $('.visio-modalBody').find('svg').attr({'width' : ''+(dialogWidth-200)+'','height' : ''+(dialogHeight-220)+''});

      autoRefresh = setInterval(this.refreshTopology,1000*60);
    },
    componentWillUnmount:function(){
      clearInterval(autoRefresh);
    },
    createVisioPngList:function(){
      var vData = this.props.getVisioList;
      if(vData instanceof Array && vData.length > 0){
        // var vData = this.getFlux().store("YFTVisioStore").getState().topologyListData;
        var pngList = vData.map(function(obj,i){
          return(
            <div key={i} id={"svgValue"+obj.ID} className="viewTopologyImgDiv">
              <div className="viewTopologyTextAlignLeft viewTopologyTextSize">{obj.SHOW_NAME}</div>
                <a href="javascript:void(0);" onClick={this.pngClick.bind(this,obj.ID)}>
                  <div className="viewTiltDiv"><img className="viewTopologyWidth viewTopologyHeight" src={'/'+obj.PNG}/></div>
                </a>
                <div className="viewTopologyTextAlignRight viewTopologyTextMargin">
                  <button className="btn btn-danger" onClick={this.deleteClick.bind(this,obj.ID)}>删除</button>&nbsp;&nbsp;&nbsp;
                  <button className="btn btn-primary" onClick={this.editClick.bind(this,obj)}>编辑</button>
                </div>
            </div>
          )
        }.bind(this));
        return(
          <div>{pngList}</div>
        )
      }

    },
    pngClick:function(e){
      var vData = this.props.getVisioList;
      //  var vData = this.getFlux().store("YFTVisioStore").getState().topologyListData;
       if(vData !=undefined && vData.length > 0 ){
          for(var i = 0;i < vData.length ;i++){
            if(e == vData[i].ID){
              const { dispatch } = this.props;
              dispatch(getOneVisioData(vData[i].VNAME));
              // this.getFlux().actions.YFTVisioAction.getClickTopology(vData[i].VNAME);
              this.visioRestore();
              this.setState({visioModal:<div></div>});
              $('#myModalFullscreen').modal('show');
              // break;
            }
          }
      }
    },
    deleteClick:function(e){
      if(confirm("确认要删除吗?")){
        let deleteObj = {
          recId:e,
          updateNodeId: this.props.getTreeId == '0' ? "0":this.props.getTreeId
        };
        const { dispatch } = this.props;
        dispatch(deleteVisio(deleteObj));
        // this.getFlux().actions.YFTVisioAction.deleteTopology(deleteObj);
      }
    },
    editClick:function(obj){
      $('#myViewModal').modal('show');
      $('#topologyViewText1').val(obj.VNAME);
      $('#topologyViewText2').val(obj.SHOW_NAME);
      $('#topologyViewText3').val(obj.ID);
    },

    stringToXml:function(xmlString) {
       var xmlDoc;
       if (typeof xmlString == "string") {
           //FF
           if (document.implementation.createDocument) {
               var parser = new DOMParser();
               xmlDoc = parser.parseFromString(xmlString, "text/xml");
           } else if (window.ActiveXObject) {
               xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
               xmlDoc.async = false;
               xmlDoc.loadXML(xmlString);
           }
       } else {
           xmlDoc = xmlString;
       }
       return xmlDoc;
   },
     //xml转换为string
   xmlToString:function(xmlDoc) {
       if (window.ActiveXObject) {
           return xmlDoc.xml; //IE
       } else {
           return (new XMLSerializer()).serializeToString(xmlDoc); //FF
       }
   },
   visioRestore:function(){
     var dialogWidth = $(window).width();
     var dialogHeight = $(window).height();
     $('.visio-modalBody').find('svg').attr({'width' : ''+(dialogWidth-200)+'','height' : ''+(dialogHeight-220)+''});
    //  $('.max-slider-handle').attr('style',"left:0%;");
     var mySlider = $("#ex6").slider();;
     mySlider.slider('setValue', 0);
     $("#ex6SliderVal").text('0');
   },
   svgSubStrToCanvas:function(svgValue){
     var sIndex = svgValue.indexOf("<svg");
     var hhh = svgValue.substr(sIndex, svgValue.length);
     var canvas = $(hhh)[0];
     return canvas;
   },
   closeDialogBtn:function(){

   },
   topologySaveBtn:function(){
     var tValue1 = $('#topologyViewText1').val();
     var tValue2 = $('#topologyViewText2').val();
     if(tValue1.trim() == "" || tValue2.trim() == ""){
       alert("修改值不能为空!");
       return;
     }
     var treeId = this.props.getTreeId;
     var editTreeId = this.props.getEditTreeId;
    //  var treeId = this.getFlux().store("YFTVisioStore").getState().treeId;
    //  if(treeId != null && treeId != "" ){

      var dataObj={
        LastModDateTime: new Date(),
        LastModBy: "admin",
        CreatedDateTime: new Date(),
        CreatedBy: "admin",
        show_name: $('#topologyViewText2').val(),
        organization: editTreeId == '' ? "0":editTreeId
      };
      //ORGANIZATION:treeId
      var needUpdate = {
        RecId:$('#topologyViewText3').val(),
        updateObj:dataObj,
        updateNodeId: treeId == '0' ? "0":treeId
      };
        const { dispatch } = this.props;
        dispatch(editVisioProperty(needUpdate));
      //  this.getFlux().actions.YFTVisioAction.editTopology(needUpdate);
    //  }
   },
   downloadVisio:function(e){
     if(e == 86){
       window.location.href = 'http://itossdemo.siteview.com/webloader?servicehandler=Download32bit&cid=2fe367c4&file=/home/siteview/bundle-cache/org.eclipse.osgi/173/0/.cp/resources/plugins/visio_plugin_setup_x86.zip';
     }else{
       window.location.href = 'http://itossdemo.siteview.com/webloader?servicehandler=Download64bit&cid=2fe367c4&file=/home/siteview/bundle-cache/org.eclipse.osgi/173/0/.cp/resources/plugins/visio_plugin_setup_x86_64.zip';
     }
   },
   refreshTopology:function(){
     const { dispatch } = this.props;
     var temp = Store.get("localUserName");
     if(temp != "admin"){
       dispatch(loadVisioList({ORGANIZATION:this.props.getTreeId}));
     }else{
       if(this.props.getTreeId == "0"){
         dispatch(loadVisioList({}));
       }else{
         dispatch(loadVisioList({ORGANIZATION:this.props.getTreeId}));
       }
     }
   },
   //跳转
   selectitem :function(tag,data){
     var _this = this;
     if(tag =="link"){
       const { dispatch } = this.props;
       dispatch(destroyTopology());
       setTimeout(function(){
         const { dispatch } = _this.props;
         dispatch(getOneVisioData(data));
       },500);
       //查询frame
      //  this.setState({visioModal:<div></div>});
      //
     }
    },
    //用来处理点击树 保存节点以及更新数据
    beforeClick:function(treeNode){
      const { dispatch } = this.props;
      dispatch(setTreeId(treeNode.id));
      if(treeNode.id == "0"){
        dispatch(loadVisioList({}));
      }else{
        dispatch(loadVisioList({ORGANIZATION:treeNode.id}));
      }
    },
    editBeforeClick:function(treeNode){
      const { dispatch } = this.props;
      dispatch(setEditTreeId(treeNode.id));
    },
    render: function() {
      var _this = this;
      var ipdata =[];
      var assetsdata =[];
      var linkdata = [];
      var linedata=[];

      var topologyObj = this.props.getVisioData;
      if(topologyObj){
        console.log("topologyObj",topologyObj);
        if(topologyObj.Svg){
          var ipdata =$.parseJSON(topologyObj.ipData);
          var assetsdata =$.parseJSON(topologyObj.assetData);
          var linkdata = [];
          var linedata=$.parseJSON(topologyObj.lineData);
          var dialogWidth = $(window).width();
          var dialogHeight = $(window).height();
          var xmlDoc = this.stringToXml(topologyObj.Svg);
          var hh = xmlDoc.getElementsByTagName('svg');
          hh[0].setAttribute("width", dialogWidth-200);
          hh[0].setAttribute("height", dialogHeight-220);
          var dhehe = this.xmlToString(xmlDoc);
          if(dhehe == undefined){
            dhehe = topologyObj.Svg
          }
          this.state.visioModal =(<SvgVisio SvgContent={dhehe} IPData={ipdata} DevData={assetsdata} LinkData={linedata} LineData={linedata}  selectitem={this.selectitem} oneView={true}/>);
        }
      }

      return (
          <div className='overviewDiv overviewDesViewDiv'>

            <div className="modal fade" id="myModalFullscreen" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div id="myModalFullDialog" className="modal-dialog" role="document">
                <div className="modal-content">
                  <div style={{padding:"15"}}>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div style={{textAlign:"center"}}  dangerouslySetInnerHTML={createSlider()}/>
                    <h4 className="modal-title" id="myModalLabel"></h4>
                  </div>
                  <div className="modal-body visio-modalBody" style={{overflow:"auto",padding:"0"}}>
                    {this.state.visioModal}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                  </div>
                </div>
              </div>
            </div>

              <TopologyUtil.TopologyModal modaltreeObj={this.props.getAllGroupOrg} editBeforeClick={this.editBeforeClick} closeDialogBtn={this.closeDialogBtn} topologySaveBtn={this.topologySaveBtn}/>
              <div className='leftListDiv col-md-2'>
                <ViewLeftList groupOrg={this.props.getAllGroupOrg} beforeClick={this.beforeClick}/>
              </div>
              <div className="col-md-10 viewTopologyOverflow panelBasic">
                <div className="titleDiv col-md-12 col-sm-12 col-xs-12">
                  <div className="titleLeft">
                      拓扑缩略图
                  </div>
                  <div className="titleRight">
                    <a onClick={this.onClickCircle}><i className="fa fa-cog"></i></a>
                  </div>
                </div>

                <div className="staticDiv col-md-12">
                  <div>
                    <input type="button" className="repositorySubmit yunweiHeight" value="刷新列表" onClick={this.refreshTopology}/>
                    {/**<a href="javascript:void(0)">自动播放</a>*/}
                    <input type="button" className="repositorySubmit yunweiHeight yunweiDescribeMargin" value="Visio插件下载x86" onClick={this.downloadVisio.bind(this,86)}/>
                    <input type="button" className="repositorySubmit yunweiHeight yunweiDescribeMargin" value="Visio插件下载x64" onClick={this.downloadVisio.bind(this,64)}/>
                    {/**<a href="javascript:void(0)">配置</a>*/}
                    {/**<div style={{marginLeft:"15px",marginTop:"5px"}} dangerouslySetInnerHTML={createProgress()}/>*/}
                  </div>
                  <div>
                    {this.createVisioPngList()}
                  </div>
                </div>
              </div>
          </div>
      );
    }
});
function mapDepartIndexState(state) {
  const { getVisioList,getVisioData , getAllGroupOrg , getTreeId , getEditTreeId } = state.visioReducer

  return {
    getVisioList:getVisioList,
    getVisioData:getVisioData,
    getAllGroupOrg:getAllGroupOrg,
    getTreeId:getTreeId,
    getEditTreeId:getEditTreeId
  }
}


export default connect(mapDepartIndexState)(TopologyView)
// module.exports = TopologyView;
