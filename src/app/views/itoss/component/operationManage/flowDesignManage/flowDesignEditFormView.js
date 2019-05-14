/**
 * Created by  on 2016/01/20.
 * 流程设计
 */
require('bootstrap');
import React from 'react'
var ReactDOM = require('react-dom');
var ReactWidgets = require('react-widgets');

import FlowDesignEdit from './flowDesignEdit.js';
import FlowDesignEditButton from './flowDesignEditButton.js';

var FlowDesignFormViewv = React.createClass({
    componentDidMount: function() {
    //  this.getFlux().actions.YFTFlowDesignActions.get_flowDesignPicData();
      if($('#createOperationForm1') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
  			$('#createOperationForm1').css("height",height);
  		}
      var tableColumns = [
           {
              title: '可选角色',
              field: 'name'
          }, {
              title: '功能描述',
              field: 'desc'
          }
      ];
      var tableColumns1 = [
           {
              title: '工单状态',
              field: 'name'
          }, {
              title: '功能描述',
              field: 'desc'
          }
      ];
      var data = this.props.flowDesignPicData;
      var statedata = eval(data.STATUS);
      var BOdata = eval(data.ROLES);
      $('#roleListTable').bootstrapTable({
          columns: tableColumns,
          data: BOdata,
          singleSelect: 'true'
      });
      $('#stateListTable').bootstrapTable({
          columns: tableColumns1,
          data: statedata,
          singleSelect: 'true'
      });
    },
    saveFlowData:function(){
      //var flux= this.props.flux;
      var name = this.props.flowName;
      var data1 = this.props.flowDeignResultData;
      if(data1){
          if(name){
            if(confirm("确定保存流程（"+name+"）吗？")){
              var data = [{
                  Name:name,
                  WorkOrderType:"WorkOrderCommon",
                },data1,this.props.workOrderTemplatesId,this.props.flowDesignTemplatesId];
              //  console.log(data1);
              //flux.actions.YFTFlowDesignActions.update_flowDesignPicData_flow(data);
              this.props.update_flowDesignPicData_flow(data);
            }
          }
      }
    },
    deleteFlowData:function(){
      var that =this;
      //var flux= this.props.flux;
      var fname="";
       fname=this.props.flowName;
      if(fname){
        if(fname=='英飞拓工单'){
            $.showPublicDialog("系统提示","默认流程不能删除。");
        }
        else {
            if(confirm("确定删除流程（"+fname+"）吗？")){
              //flux.actions.YFTFlowDesignActions.delete_flowDesignPicData_flow(fname);
              this.props.delete_flowDesignPicData_flow(fname);
            }
        }
      }
    },
    handleTabClick:function(e){
      var id = $(e.target).attr("id");
      // console.log(id)
      if(id=="operationDetailTab"){
        $(".operationButtonGroup1").show();
        //ReactDOM.render(<FlowDesignFlowPic/>,document.getElementById('OperationFlowDesignPic'));
      };
    },
    render:function(){
        var fl= this.props.flux;
        var name = this.props.flowName;
        var tm = false;
        if(name){
          tm = true;
        }
      // <ul className="nav nav-tabs">
      //   <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick} id="operationDetailTab">流程设计</a></li>
      // </ul>
      // <fieldset>
      //   <div className="contentDiv tab-content marginleft_none">
      //       <div className="tab-pane active" id="tab_1">
      //         <div id="OperationFlowDesignPic"/>
      //       </div>
      //   </div>
      // </fieldset>
        //this.getFlux().actions.YFTFlowDesignActions.get_flowDesignPicData();   <FlowDesignFlowPic />
        return(
            <div id='createOperationForm1' className='overviewDesViewDiv'>
              <FlowDesignEditButton  saveFlowData={this.saveFlowData} deleteFlowData={this.deleteFlowData}
                  currFlowData={this.props.currFlowData} flowOnlyShow={this.props.flowOnlyShow} flowPanelState={this.props.flowPanelState}
                  set_flowPanel={this.props.set_flowPanel}
              />
              <div className='staticDiv col-md-12'>
	            </div>
              <FlowDesignEdit flowName={name} isEdit1={tm} flowDesignPicData={this.props.flowDesignPicData} />
              <div className='col-md-12'>
                <div className='col-md-5'>
                  <div id="ecityIndexPic3" className="cityIndexPic">
                  <table id='roleListTable'
                     data-toggle='table'
                     data-classes='table table-no-bordered table-hover'
                     data-show-refresh='false'
                     data-show-toggle='false'
                     data-show-columns='false'
                     data-pagination='false'
                     data-page-size='5'>
                  </table>
                  </div>
                </div>
                <div className='col-md-7 marginLeft'>
                  <div className="cityIndexPic">
                    <table id='stateListTable'
                       data-toggle='table'
                       data-classes='table table-no-bordered table-hover'
                       data-show-refresh='false'
                       data-show-toggle='false'
                       data-show-columns='false'
                       data-pagination='false'
                       data-page-size='5'>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        );
    }
});

$(window).resize(function () {
  if($('#createOperationForm1') != null) {
    var height = $(window).height() - 110 - 30 + 'px';
    $('#createOperationForm1').css("height",height);
  }
});

module.exports = FlowDesignFormViewv;
