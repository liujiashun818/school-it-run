/**
* Created by SHIN on 2015/12/11.
* 工单管理-工作台
*/

require('bootstrap');
// require('../../equipmentManage/lib/echarts-all.js');
import React from 'react'
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

import { connect } from 'react-redux'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
import * as operationAction from '../../../../../actions/operation_action'
import * as operationFlowAction from '../../../../../actions/operationflow_action'
import { addRepository } from '../../../../../actions/repository_action'

var Store = require('../../../../../server/store.js');
var base64 = require('../../../../../utils/base64.js');
var CommonTree = require('../../monitorTree/commonTree.js');

import MyTable from './myWorkSpaceTableBox';

var myWorkSpaceView = React.createClass({
    mixins: [History],
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            typeIndex:0,
            faultIndex:0,
            WorkSpaceTitle:""
        }
    },
    componentWillMount: function() {
      var that = this;
      var temp = Store.get("PERMISSIONS");
      if(temp!=null&&temp!=""){
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var ttemp = eval(temp);
        // console.log(ttemp);
        //that.getFlux().actions.YFTOperationActions.set_permission(ttemp);
        that.props.dispatch(operationAction.setPermissionsOperation(ttemp));
      };
    },
    componentDidMount: function() {
      // dateChange.changeViewStyle();
      if($('#operationMyWorkSpace') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
  			$('#operationMyWorkSpace').css("height",height);
  		};
      this.setState({curStatu:2});
      const { dispatch } = this.props;
      //this.getFlux().actions.YFTOperationActions.init_detailData(0);
      dispatch(operationAction.init_detailData(0));
      // var _this = this;
      // setTimeout(function(){
      //   var faultTypes = _this.state.itoss.faultTypes;
      //   if(!faultTypes.length>0){
      //     _this.getFlux().actions.YFTOperationActions.get_faultType();
      //   };
      //   _this.getFlux().actions.YFTOperationActions.get_colorSpan();
      //   _this.getFlux().actions.YFTOperationActions.get_workFlowTypes();
      // },500);
      //
      // setTimeout(function(){
      //   var filter= [{"key":"PARAM","value":2}];
      //   _this.getFlux().actions.YFTOperationActions.get_workOrderList(filter);
      // },500);

      var faultTypes = this.props.faultTypes;
      if(!faultTypes.length>0){
        dispatch(operationAction.get_faultType());
      };
      dispatch(operationAction.get_colorSpan());
      dispatch(operationAction.get_workFlowTypes());
      var filter= [{"key":"PARAM","value":2}];
      dispatch(operationAction.get_workOrderList(filter));

      $(".list-group").find("a").each(function(){
        var $node = $(this);
        $node.mouseover(function(){
          var claz = $node.attr("class");
          var ind = claz.indexOf("active");
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","list-group-item fadeInMenu active");
          }else{
            $node.attr("class","list-group-item fadeInMenuHover");
          };
        });
        $node.mouseout(function(){
          var claz = $node.attr("class");
          var ind = claz.indexOf("active");
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","list-group-item fadeInMenu active");
          }else{
            $node.attr("class","list-group-item fadeOutMenuHover");
          };
        });
      });
    },
    componentDidUpdate:function(){
      var picList1 = this.props.picList;
      var picData1 = [];
      var picName1 = [];
      for(var i=0;i<picList1.length;i++){
        picData1.push(picList1[i].value);
        picName1.push(picList1[i].name);
      };
      if(!picList1.length>0){
        //当 picList1 为空时，在图型控件中会出错，必须要初始值
        // picData1 = [5,10,7,3];
        // picName1 = ["样例1","样例2","样例3","样例4"];
        picData1 = [0];
        picName1 = [''];
      };
      var picData2 = this.props.picList2;
      var picName2 = [];
      for(var i=0;i<picData2.length;i++){
        picName2.push(picData2[i].name);
      };
      if(!picData2.length>0){
        //当 picData2 为空时，在图型控件中会出错，必须要初始值
        // picData2 = [{name:"样例1",value:5},{name:"样例2",value:10},{name:"样例3",value:7},{name:"样例4",value:3}];
        // picName2 = ["样例1","样例2","样例3","样例4"];
        picData2 = [{name:'',value:0}];
        picName2 = [''];
      };
      var echart1 = echarts.init(document.getElementById('eOperatePeopleList'));
      echart1.setOption({
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            feature: {
                // dataView: {show: true, readOnly: false},
                // restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: picName1
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                name: '待处理工单人员排序',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                              '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: picData1,
                markPoint: {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0)',
                        formatter: function(params){
                            return '<img src="'
                                    + params.data.symbol.replace('image://', '')
                                    + '"/>';
                        }
                    },
                    data: [
                        {xAxis:0, y: 350, name:'Line'},
                        {xAxis:1, y: 350, name:'Bar'},
                        {xAxis:2, y: 350, name:'Scatter'},
                        {xAxis:3, y: 350, name:'K'},
                        {xAxis:4, y: 350, name:'Pie'},
                        {xAxis:5, y: 350, name:'Radar'},
                        {xAxis:6, y: 350, name:'Chord'},
                        {xAxis:7, y: 350, name:'Force'},
                        {xAxis:8, y: 350, name:'Map'},
                        {xAxis:9, y: 350, name:'Gauge'},
                        {xAxis:10, y: 350, name:'Funnel'},
                    ]
                }
            }
        ]
      });
      var echart2 = echarts.init(document.getElementById('eOperateWorkorderType'));
      echart2.setOption({
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:picName2
        },
        toolbox: {
            show : true,
            feature : {
                //mark : {show: true},
                //dataView : {show: true, readOnly: false},
                // magicType : {
                //     show: true,
                //     type: ['pie', 'funnel'],
                //     option: {
                //         funnel: {
                //             x: '25%',
                //             width: '50%',
                //             funnelAlign: 'left',
                //             max: 1548
                //         }
                //     }
                // },
                //restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'故障工单类型',
                type:'pie',
                radius : '55%',
                center: ['50%', '40%'],
                data:picData2
            }
        ]
      });
      $(".list-group").find("a").each(function(){
        var $node = $(this);
        $node.mouseover(function(){
          var claz = $node.attr("class");
          var ind = claz.indexOf("active");
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","list-group-item fadeInMenu active");
          }else{
            $node.attr("class","list-group-item fadeInMenuHover");
          };
        });
        $node.mouseout(function(){
          var claz = $node.attr("class");
          var ind = claz.indexOf("active");
          if(ind>=0){
            $node.attr("class","");
            $node.attr("class","list-group-item fadeInMenu active");
          }else{
            $node.attr("class","list-group-item fadeOutMenuHover");
          };
        });
      });
    },
    handleTabClick:function(e){
      var id = $(e.target).attr("id");
      if(id=="operationListTab"){
        $("#myWorkSpaceTitleStatu").text(this.state.WorkSpaceTitle);
      }else if(id=="operationChartTab"){
        this.setState({WorkSpaceTitle:$("#myWorkSpaceTitleStatu").text()});
        $("#myWorkSpaceTitleStatu").text("工单统计图");
        //this.setState({isshow:1});//刷新图显示
      }
    },
    colorSpanClick:function(e){
      var that = this;
      // console.log($(e.target).attr("id"));
      var id = $(e.target).attr("id");
      if(id == null || id == ""){
        id = $(e.target).parent().parent().attr("id");
      };
      // console.log(id);
      var filter=[];
      switch (id) {
        case "colorSpan1":
        case "colorSpan1_1":
        case "colorSpan1_2":
          filter = [{"key":"PARAM","value":1}];
          that.setState({curStatu:1});
          $("#myWorkSpaceTitleStatu").text("工单列表-我参与的工单");
          break;
        case "colorSpan2":
        case "colorSpan2_1":
        case "colorSpan2_2":
          filter = [{"key":"PARAM","value":2}];
          that.setState({curStatu:2});
          $("#myWorkSpaceTitleStatu").text("工单列表-待处理工单");
          break;
        case "colorSpan3":
        case "colorSpan3_1":
        case "colorSpan3_2":
          filter = [{"key":"PARAM","value":3}];
          that.setState({curStatu:3});
          $("#myWorkSpaceTitleStatu").text("工单列表-完成工单");
          break;
        case "colorSpan4":
        case "colorSpan4_1":
        case "colorSpan4_2":
          filter = [{"key":"PARAM","value":4}];
          that.setState({curStatu:4});
          $("#myWorkSpaceTitleStatu").text("工单列表-所有工单");
          break;
        case "colorSpan5":
        case "colorSpan5_1":
        case "colorSpan5_2":
          filter = [{"key":"PARAM","value":5}];
          that.setState({curStatu:5});
          $("#myWorkSpaceTitleStatu").text("工单列表-超时工单");
          break;
        case "colorSpan6":
        case "colorSpan6_1":
        case "colorSpan6_2":
          filter = [{"key":"PARAM","value":6}];
          that.setState({curStatu:6});
          $("#myWorkSpaceTitleStatu").text("工单列表-不满意工单");
          break;
        case "colorSpan7":
        case "colorSpan7_1":
        case "colorSpan7_2":
          filter = [{"key":"PARAM","value":7}];
          that.setState({curStatu:7});
          $("#myWorkSpaceTitleStatu").text("工单列表-未完成延期工单");
          break;
        case "colorSpan8":
        case "colorSpan8_1":
        case "colorSpan8_2":
          filter = [{"key":"PARAM","value":8}];
          that.setState({curStatu:8});
          $("#myWorkSpaceTitleStatu").text("工单列表-已完成延期工单");
          break;
        // default:
        //   filter = [{"key":"PARAM","value":1}];
        //   that.setState({curStatu:1});
        //   $("#myWorkSpaceTitleStatu").text("我参与的工单");
        //   break;
      };
      // $("#eOperatePeopleList").slideToggle("slow");
      // $("#eOperateWorkorderType").slideToggle("slow");
      if(id!=null && id!=""){
        that.setState({typeIndex:0,faultIndex:0});
        //this.getFlux().actions.YFTOperationActions.get_workOrderList(filter);
        this.props.dispatch(operationAction.get_workOrderList(filter));
      };
    },
    filterFaultTypeData:function(e){
      var that = this;
      var typesList = this.props.faultTypes;
      var name = e.name;
      for(var i=0;i<typesList.length;i++){
        var tname = typesList[i].name;
        if(tname == name){
          that.setState({typeIndex:i+1});
        };
      };
      if(name == "全部"){
        that.setState({typeIndex:0});
      };
      var level = $("#myWorkSpaceFaultLevelDropDown").find(".rw-input").text();
      var statu = this.state.curStatu;
      var filter = [name,level,statu];
      //this.getFlux().actions.YFTOperationActions.filter_orderList(filter);
      this.props.dispatch(operationAction.filter_orderList(filter));
    },
    filterFaultLevelData:function(e){
      var that = this;
      var levelData = ["全部","高","中","低"];
      var name = e;
      for(var i=0;i<levelData.length;i++){
        var tname = levelData[i];
        if(tname == name){
          that.setState({faultIndex:i});
        };
      };
      var type = $("#myWorkSpaceFaultTypeDropDown").find(".rw-input").text();
      var statu = this.state.curStatu;
      var filter = [type,name,statu];
      //this.getFlux().actions.YFTOperationActions.filter_orderList(filter);
      this.props.dispatch(operationAction.filter_orderList(filter));
    },
    _handleOnClick: function(e) {
      if(e.target.id == 'eToMyWorkSpace'){
        this.history.pushState(null,'operationManage/myWorkSpace');
      }
      else if(e.target.id == 'eToAutoWorkOrderRules'){
          this.history.pushState(null,'operationManage/autoWorkOrderRules');
      }
      else {
        //this.getFlux().actions.YFTOperationActions.set_curWorkFlowType(e.target.id);
        this.props.dispatch(set_curWorkFlowType(e.target.id));
        this.history.pushState(null,'operationManage/createOperation');
      };
    },
    showSpanLight:function(){
      $(".faultTypeSpan").css("background-color","rgba(0,0,0,0.1)");
      $(".faultTypeSpan").css("border-color","#aaa");
    },
    hideSpanLight:function(){
      $(".faultTypeSpan").css("background-color","#fff");
      $(".faultTypeSpan").css("border-color","#ccc");
    },
    showSpanLight2:function(){
      $(".faultLevelSpan").css("background-color","rgba(0,0,0,0.1)");
      $(".faultLevelSpan").css("border-color","#aaa");
    },
    hideSpanLight2:function(){
      $(".faultLevelSpan").css("background-color","#fff");
      $(".faultLevelSpan").css("border-color","#ccc");
    },
    render:function(){
        var isCanShow = false;
        var isCanWorkSpace = false;
        var isCanAutoworkorderRules = false;
        var permissions = this.props.permissions;
        for(var i=0;i<permissions.length;i++){
          var resourceType = permissions[i].resourceType;
          if(resourceType == "/operationmanage/workordermanage/createworkorder"){
            isCanShow = true;
          };
          if(resourceType == "/operationmanage/workordermanage/workspace"){
            isCanWorkSpace = true;
          };
          if(resourceType == "/operationmanage/workordermanage/autoworkorderrules"){
            isCanAutoworkorderRules = true;
          };
        };
        var workFlowTypes = this.props.workFlowTypes;
        var typesList = this.props.faultTypes;
        var typeIndex = this.state.typeIndex;
        var faultIndex = this.state.faultIndex;
        var faultLevels = ["全部","高","中","低"];
        var list = [];
        var treeList = [];
        var typeList = [];

        if(isCanWorkSpace){
          var spaceItem = (<a className="list-group-item active fadeInMenu" id="eToMyWorkSpace" onClick={this._handleOnClick} style={{cursor:'pointer'}} key="1">工作台</a>);
          list.push(spaceItem);
          treeList.push({id:1,name:"工作台",pid:0,toUrl:"operationManage/myWorkSpace"});
        };
        if (isCanAutoworkorderRules) {
          list.push(<a className="list-group-item" id="eToAutoWorkOrderRules" onClick={this._handleOnClick} style={{cursor:'pointer'}} key="2">自动工单规则</a>);
          treeList.push({id:2,name:"自动工单规则",pid:0,toUrl:"operationManage/autoWorkOrderRules"});
        };
        if(isCanShow){
          if(workFlowTypes.length>0){
            for(var i=0;i<workFlowTypes.length;i++){
              var id = workFlowTypes[i].RecId;
              var name = workFlowTypes[i].Name;
              var t = i+3;
              var data = (<a className="list-group-item" id={id} onClick={this._handleOnClick} style={{cursor:'pointer'}} key={t}>{"新建"+name}</a>);
              var tdata = {id:t,name:"新建"+name,pid:0,toUrl:"operationManage/createOperation",flowId:id};
              // list.push(data);
              treeList.push(tdata);
            };
          };
        };
        typeList.push({id:0,name:"全部"});
        for(var i=0;i<typesList.length;i++){
          typeList.push(typesList[i]);
        };
        const { dispatch } = this.props;
        const { curThreeNode } = this.props;
        const { preThreeNode } = this.props;
        if(treeList.length<=2){
          return(
              <div id='myWorkSpaceView' className='overviewDiv groupInfoView'>
                <div className="modal fade" id="addFilterWords" tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">添加过滤字段</h4>
                      </div>
                      <div className="modal-body">
                        <div className="filterHeader" style={{"height":"70px"}}>
                          <div className="input-group">
                            <span className="input-group-addon">字段名称</span>
                            <input type="text" className="form-control"/>
                          </div>
                          <div className="input-group">
                            <span className="input-group-addon">字段的值</span>
                            <input type="text" className="form-control"/>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">筛选</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='leftListDiv col-md-1'>
                  <div className="assetManageListDiv">
                    <div className="iq-list">
                      <div className="list-group">
                        {list}
                      </div>
                    </div>
                  </div>
                </div>
                <div id='operationMyWorkSpace' className='overviewDesViewDiv'>
                  <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        工单管理-<span id="myWorkSpaceTitleStatu">工单列表-待处理工单</span>
                    </div>
                    <div className="titleRight">
                      <a><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                    </div>
                  </div>
                  <div className='operationCreateTableDiv noborder col-md-12'>
                    <ul className="nav nav-tabs">
                      <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick} id="operationListTab">工单列表</a></li>
                      <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick} id="operationChartTab">工单统计图</a></li>
                    </ul>
                    <fieldset>
                      <div className="contentDiv tab-content marginleft_none">
                        <div className="tab-pane active" id="tab_1">
                          <div className="col-md-12 noborder-top">
                            <span className="colorSpan colorYellow" id="colorSpan1" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan1_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">我参与了的工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan1_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum1}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorRed" id="colorSpan2" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan2_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">待处理中的工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan2_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum2}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorBlue" id="colorSpan3" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan3_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">已完成了的工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan3_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum3}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorPerpose" id="colorSpan4" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan4_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">所有状态的工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan4_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum4}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorBlue2" id="colorSpan7" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan7_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">未完成延期工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan7_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum7}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorYellow2" id="colorSpan8" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan8_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">已完成延期工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan8_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum8}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorBlue2" id="colorSpan5" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan5_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">超过时限的工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan5_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum5}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorBlue" id="colorSpan6" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan6_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">回访不满意工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan6_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum6}</label>
                              </div>
                            </span>
                          </div>
                          <div className="col-md-12 border-top">
                            <div className="subDiv1 col-md-8">
                              <div className="input-group">
                                <span className="input-group-addon faultTypeSpan">故障类型</span>
                                <ReactWidgets.DropdownList className='dropdownStyle' textField='name' data={typeList} value={typeList[typeIndex]} onChange={this.filterFaultTypeData} onMouseOver={this.showSpanLight} onMouseOut={this.hideSpanLight} id="myWorkSpaceFaultTypeDropDown"/>
                                <span className="input-group-addon faultLevelSpan">故障级别</span>
                                <ReactWidgets.DropdownList className='dropdownStyle' textField='name' data={faultLevels} value={faultLevels[faultIndex]} onChange={this.filterFaultLevelData} onMouseOver={this.showSpanLight2} onMouseOut={this.hideSpanLight2} id="myWorkSpaceFaultLevelDropDown"/>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <MyTable curStatu={this.state.curStatu} permissions={this.props.permissions} faultTypes={this.props.faultTypes} orderDetailData={this.props.orderDetailData}
                                    allFaults={this.props.allFaults} curWorkOrderId={this.props.curWorkOrderId} WorkOrderProcessLogData={this.props.WorkOrderProcessLogData}
                                    get_orderDetails={filter => dispatch(operationAction.get_orderDetails(filter))}
                                    get_allFaults={param => dispatch(operationAction.get_allFaults())}
                                    get_workOrderList={filter => dispatch(operationAction.get_workOrderList(filter))}
                                    delete_workOrder={param => dispatch(operationAction.delete_workOrder(param))}
                                    setCurWorkFlowId={param => dispatch(operationFlowAction.setCurWorkFlowId(param))}
                                    get_WorkFlowLogData={param => dispatch(operationFlowAction.get_WorkFlowLogData(param))}
                                    get_WorkOrderProcessLogData={param => dispatch(operationFlowAction.get_WorkOrderProcessLogData(param))}
                                    setCurrentNextPerson={param => dispatch(operationFlowAction.setCurrentNextPerson(param))}
                                    addRepository={data =>dispatch(addRepository(data))} />
                          </div>
                        </div>
                        <div className="tab-pane" id="tab_2">
                          <div className="col-md-7">
                            <label className="picTitle paddingleft1">待处理工单人员排序</label>
                            <div id="eOperatePeopleList" style={{"height":"300px"}}></div>
                          </div>
                          <div className="col-md-5">
                            <label className="picTitle paddingleft2">故障工单类型</label>
                            <div id="eOperateWorkorderType" style={{"height":"300px"}}></div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
          );
        }else{
          return(
              <div id='myWorkSpaceView' className='overviewDiv groupInfoView'>
                <div className="modal fade" id="addFilterWords" tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">添加过滤字段</h4>
                      </div>
                      <div className="modal-body">
                        <div className="filterHeader" style={{"height":"70px"}}>
                          <div className="input-group">
                            <span className="input-group-addon">字段名称</span>
                            <input type="text" className="form-control"/>
                          </div>
                          <div className="input-group">
                            <span className="input-group-addon">字段的值</span>
                            <input type="text" className="form-control"/>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">筛选</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='leftListDiv col-md-1'>
                  <div className="assetManageListDiv">
                    <CommonTree data={treeList} curName={this.props.curName} curThreeNode={curThreeNode} preThreeNode={preThreeNode}
                      onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                      init_detailData={param =>dispatch(operationAction.init_detailData(param))} isOperationMark="0" canUpdate={this.props.canUpdate}
                      setCanUpdate={param => dispatch(operationAction.setCanUpdate(param))} setCurName={data => dispatch(setCurName(data))}
                      set_curWorkFlowType={param =>dispatch(operationAction.set_curWorkFlowType(param))}
                      get_createOrderInfo={param =>dispatch(operationAction.get_createOrderInfo(param))}
                    />
                  </div>
                </div>
                <div id='operationMyWorkSpace' className='overviewDesViewDiv'>
                  <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        工单管理-<span id="myWorkSpaceTitleStatu">工单列表-待处理工单</span>
                    </div>
                    <div className="titleRight">
                      <a><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                    </div>
                  </div>
                  <div className='operationCreateTableDiv noborder col-md-12'>
                    <ul className="nav nav-tabs">
                      <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.handleTabClick} id="operationListTab">工单列表</a></li>
                      <li><a href="#tab_2" data-toggle="tab" onClick={this.handleTabClick} id="operationChartTab">工单统计图</a></li>
                    </ul>
                    <fieldset>
                      <div className="contentDiv tab-content marginleft_none">
                        <div className="tab-pane active" id="tab_1">
                          <div className="col-md-12 noborder-top">
                            <span className="colorSpan colorYellow" id="colorSpan1" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan1_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">我参与了的工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan1_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum1}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorRed" id="colorSpan2" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan2_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">待处理中的工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan2_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum2}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorBlue" id="colorSpan3" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan3_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">已完成了的工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan3_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum3}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorPerpose" id="colorSpan4" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan4_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">所有状态的工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan4_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum4}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorBlue2" id="colorSpan7" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan7_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">未完成延期工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan7_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum7}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorYellow2" id="colorSpan8" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan8_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">已完成延期工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan8_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum8}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorBlue2" id="colorSpan5" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan5_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">超过时限的工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan5_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum5}</label>
                              </div>
                            </span>
                            <span className="colorSpan colorBlue" id="colorSpan6" onClick={this.colorSpanClick}>
                              <div className="repositoryMargin" id="colorSpan6_1" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">回访不满意工单</label>
                              </div>
                              <div className="repositorySumCenter" id="colorSpan6_2" onClick={this.colorSpanClick}>
                                <label className="colorSpanLabel">{this.props.colorSpanNum6}</label>
                              </div>
                            </span>
                          </div>
                          <div className="col-md-12 border-top">
                            <div className="subDiv1 col-md-8">
                              <div className="input-group">
                                <span className="input-group-addon faultTypeSpan">故障类型</span>
                                <ReactWidgets.DropdownList className='dropdownStyle' textField='name' data={typeList} value={typeList[typeIndex]} onChange={this.filterFaultTypeData} onMouseOver={this.showSpanLight} onMouseOut={this.hideSpanLight} id="myWorkSpaceFaultTypeDropDown"/>
                                <span className="input-group-addon faultLevelSpan">故障级别</span>
                                <ReactWidgets.DropdownList className='dropdownStyle' textField='name' data={faultLevels} value={faultLevels[faultIndex]} onChange={this.filterFaultLevelData} onMouseOver={this.showSpanLight2} onMouseOut={this.hideSpanLight2} id="myWorkSpaceFaultLevelDropDown"/>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <MyTable curStatu={this.state.curStatu} permissions={this.props.permissions} faultTypes={this.props.faultTypes} orderDetailData={this.props.orderDetailData}
                                    allFaults={this.props.allFaults} curWorkOrderId={this.props.curWorkOrderId} WorkOrderProcessLogData={this.props.WorkOrderProcessLogData}
                                    get_orderDetails={filter => dispatch(operationAction.get_orderDetails(filter))}
                                    get_allFaults={param => dispatch(operationAction.get_allFaults())}
                                    get_workOrderList={filter => dispatch(operationAction.get_workOrderList(filter))}
                                    delete_workOrder={param => dispatch(operationAction.delete_workOrder(param))}
                                    setCurWorkFlowId={param => dispatch(operationFlowAction.setCurWorkFlowId(param))}
                                    get_WorkFlowLogData={param => dispatch(operationFlowAction.get_WorkFlowLogData(param))}
                                    get_WorkOrderProcessLogData={param => dispatch(operationFlowAction.get_WorkOrderProcessLogData(param))}
                                    setCurrentNextPerson={param => dispatch(operationFlowAction.setCurrentNextPerson(param))}
                                    addRepository={data =>dispatch(addRepository(data))}
                                    get_workOrderTemplatesFromWorkFlowId={param => dispatch(operationAction.get_workOrderTemplatesFromWorkFlowId(param))}
                                    get_workFlowDetailsFromWorkFlowId={param => dispatch(operationAction.get_workFlowDetailsFromWorkFlowId(param))}
                            />
                          </div>
                        </div>
                        <div className="tab-pane" id="tab_2">
                          <div className="col-md-7">
                            <label className="picTitle paddingleft1">待处理工单人员排序</label>
                            <div id="eOperatePeopleList" style={{"height":"300px"}}></div>
                          </div>
                          <div className="col-md-5">
                            <label className="picTitle paddingleft2">故障工单类型</label>
                            <div id="eOperateWorkorderType" style={{"height":"300px"}}></div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
          );
        };
    }
});

$(window).resize(function () {
  if($('#operationMyWorkSpace') != null) {
    var height = $(window).height() - 110 - 30 + 'px';
    $('#operationMyWorkSpace').css("height",height);
  }
});

function mapResourceState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { faultTypes,picList,picList2,permissions,workFlowTypes,colorSpanNum1,colorSpanNum2,colorSpanNum3,colorSpanNum4,colorSpanNum5,colorSpanNum6,colorSpanNum7,colorSpanNum8,
          orderDetailData,allFaults,curWorkOrderId,canUpdate
        } = state.operationReducer
  const { WorkOrderProcessLogData } = state.operationFlowReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    faultTypes:faultTypes,
    picList:picList,
    picList2:picList2,
    permissions:permissions,
    workFlowTypes:workFlowTypes,
    colorSpanNum1:colorSpanNum1,
    colorSpanNum2:colorSpanNum2,
    colorSpanNum3:colorSpanNum3,
    colorSpanNum4:colorSpanNum4,
    colorSpanNum5:colorSpanNum5,
    colorSpanNum6:colorSpanNum6,
    colorSpanNum7:colorSpanNum7,
    colorSpanNum8:colorSpanNum8,
    orderDetailData:orderDetailData,
    allFaults:allFaults,
    curWorkOrderId:curWorkOrderId,
    WorkOrderProcessLogData:WorkOrderProcessLogData,
    canUpdate:canUpdate,
    curName:curName
  }
}

export default connect(mapResourceState)(myWorkSpaceView)
