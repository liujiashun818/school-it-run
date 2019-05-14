/**
 * Created by  on 2016/01/20.
 * 流程设计
 */
require('bootstrap');
import React from 'react'
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Store = require('../../../../../server/store');
var base64 = require('../../../../../utils/base64.js');

var FlowDesignEditButton = React.createClass({
  mixins: [History],
  deleteFlowData:function(){
    this.props.deleteFlowData();
  },
  saveFlowData:function(){
   this.props.saveFlowData();
  },
  backtoSpace:function(){
    this.history.pushState(null,'operationManage/flowDesign');
  },
  setFlowPanl:function(e){
      var btntext= document.getElementById('operationmanageflowdesignedit').innerText;
      if(btntext=='设计'){
           //this.getFlux().actions.YFTFlowDesignActions.set_flowPanel(1);
           this.props.set_flowPanel(1);
           document.getElementById('operationmanageflowdesignedit').innerText="查看";
      }else {
           //this.getFlux().actions.YFTFlowDesignActions.set_flowPanel(0);
           this.props.set_flowPanel(0);
           document.getElementById('operationmanageflowdesignedit').innerText="设计";
      }
  },
  componentWillMount:function(){
    //this.getFlux().actions.YFTOperationActions.get_workFlowName();
  },
  componentDidMount: function() {
    //this.getFlux().actions.YFTOperationActions.get_workFlowName();
    var temp = Store.get("PERMISSIONS");
    try {
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var index1 =temp.indexOf("/operationmanage/flowdesign/add");
        // if(index1>0){
        //   $("#operationmanageflowdesignadd").show();
        //    //this.setState({addf: false});
        // }else {
        //   document.getElementById("poperationmanageflowdesignadd").style.width='0px';
        // }
        var data1 = this.props.currFlowData;
        var currflowname ="";
        if(data1){
          if(typeof(data1)=='string'){
             currflowname = "";
          }else {
            currflowname = data1.name;
          }
        }
        var hidebtn = this.props.flowOnlyShow;

        // index1 =temp.indexOf("/operationmanage/flowdesign/update");
        // if(index1>0){
        //     $("#operationmanageflowdesignedit").show();
        // }else {
        //   document.getElementById("operationmanageflowdesignedit").style.width='0px';
        // }
        // index1 =temp.indexOf("/operationmanage/flowdesign/delete");
        // if(index1>0 && currflowname){
        //    $("#operationmanageflowdesigndelete").show();
        // }else {
        //   document.getElementById("poperationmanageflowdesigndelete").style.width='0px';
        // }
        if(hidebtn==1){
              $("#operationmanageflowdesigndelete").hide();
              $("#operationmanageflowdesignedit").hide();
              $("#operationmanageflowdesignupdate").hide();
        }
    } catch (e) {
      console.log(e);
    } finally { }
    //console.log("权限");
    //console.log(temp);
   },
  render:function(){
    var data1 = this.props.currFlowData;
    var showtip =  this.props.flowPanelState;
    var btnsjtxt = "设计"
    if(showtip==1){
      btnsjtxt = "查看";
    }
    var currflowname ="";
    if(data1){
      if(typeof(data1)=='string'){
         currflowname = data1+"（新建）";
      }else {
        currflowname = data1.name;
      }
    }
    var flowName = "流程设计-"+currflowname;
    return (
      <div className="operationButtons">
        <div className="systemGroupButtonGroup1 oBGroup">
          <div className="titleDiv col-md-12">
            <div className="titleLeft">
                {flowName}
            </div>
            <div className="titleRight">
              <a className="backSpaceText" onClick={this.backtoSpace}>返回流程设计</a>
              <a href=""><i className="fa fa-question-circle"></i></a>
              <a href="#/operationManage/myWorkSpace"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
            </div>
          </div>
          <div className="col-md-12">
            <div className="buttonInfo">
              <p>流程设计的功能：创新一个新的运维流程，定义各角色之间工单流转，以及工单流转前后状态变化。</p>
              <table>
                <tbody>
                <tr>
                  <td className="rw-widget-td" style={{"borderTop":"none","width":"70px"}}>
                    <button type="button"  id="operationmanageflowdesignedit"   className="btn btn-success addFiltrateFieldBtn " onClick={this.setFlowPanl} >{btnsjtxt}</button>
                 </td>
                  <td className="rw-widget-td" style={{"borderTop":"none","width":"70px"}}>
                      <button type="button"  id="operationmanageflowdesignupdate"   className="btn btn-success addFiltrateFieldBtn " onClick={this.saveFlowData} >保存</button>
                  </td>
                  <td  className="rw-widget-td"  style={{"borderTop":"none","width":"70px"}}>
                      <button type="button" id="operationmanageflowdesigndelete" style={{"display":"none"}} className="deleteButton"  onClick={this.deleteFlowData} >删除</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FlowDesignEditButton;
