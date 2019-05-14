/**
* 资源监测-设置-资源设置
*/
require('bootstrap');
import React from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var TreeUtil = require('./treeUtil');
var base64 = require('../../../../../utils/base64');
var ReactWidgets = require('react-widgets');
import { connect } from 'react-redux'
import {isShowTree,getResourceSetTree,setTreeIds,setEquipment,emitOldResourceTreeNode} from '../../../../../actions/equipment_action'
import {getMonitorTree} from '../../../../../actions/system_action'

$(window).resize(function(){
  var height = $(window).height();
  height = height-220;
  $(".panelBasic").css("height",height+"px");
});

var timeUnit = [{id:"HOURS",name:"小时"},{id:"MINUTES",name:"分钟"},{id:"SECONDS",name:"秒"}];

var ResourceSetRightView = React.createClass({
  mixins: [History],
  getInitialState: function(){
    return {
      tabId:1,
      rulesValue:"",
      relyId:""
    }
  },
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    monitorTree:React.PropTypes.array.isRequired,
    oldTree:React.PropTypes.array.isRequired,
    resourceSetTree:React.PropTypes.array.isRequired,
    alarmRulesArray:React.PropTypes.array.isRequired
  },
  componentWillMount: function() {
    const { dispatch } = this.props;
    dispatch(getResourceSetTree());//资源设置,报警规则
    dispatch(getMonitorTree());
    dispatch(isShowTree(true));
  },
  componentDidUpdate:function(){
    //资源设置树/依赖条件树
    if(this.props.isShowTree && this.props.resourceSetTree.length > 0 && this.props.monitorTree.length > 0){

      TreeUtil.treeConfig("monitortree",this.props.resourceSetTree);
      TreeUtil.treeConfig("relyModaltree",this.props.monitorTree);

      if(this.props.treeIds.length > 0){
        TreeUtil.setTreeNode("monitortree",this.props.treeIds);
        TreeUtil.monitortreeF();
      }

      const { dispatch } = this.props;
      dispatch(isShowTree(false));
    }
  },
  componentDidMount:function(){
    var height = $(window).height();
    height = height-220;
    $(".panelBasic").css("height",height+"px");
    $('#resourceSetTable').bootstrapTable({
        exportDataType:"all",
        columns: [
            {
                title: '资源状态',
                field: 'status',
                sortable: true
            }, {
                title: '资源IP',
                field: 'name',
                sortable: true
            }, {
                title: '设备名称',
                field: 'title',
                sortable: true
            }, {
                title: '资源类型',
                field: 'type',
                sortable: true
            }, {
                title: '报警规则',
                field: 'alarmname',
                sortable: true
            }
        ],
        data: [],
        exportDataType:"all"
    });
    //quanxianshezhi
    var temp = localStorage.getItem("PERMISSIONS");
    temp = base64.base64decode(temp);
    temp = decodeURI(temp);
    var permissionsValue = eval(temp);
    var level = localStorage.getItem('LEVEL');
    var resourceSetting = false;
    for(var i = 0; i < permissionsValue.length; i++) {
        if(permissionsValue[i].resourceType == "/equipmentmanage/setting/resourceset/edit") {
          resourceSetting = true;
      }
    }
    if(!resourceSetting){
      $('.repositorySubmit').hide();
    }
  },
  useBtn:function(){
    var selectTreeNode = TreeUtil.getMonitorTreeNode();
    if(selectTreeNode.length <= 0){
      //alert("请选择资源设备!");
      $.showPublicDialog("资源设置","请选择资源设备。");
      return;
    }
    var idStr = "";
    for(var i =0;i< selectTreeNode.length;i++){
      if(i == selectTreeNode.length-1){
        idStr +=selectTreeNode[i].id;
      }else{
        idStr +=selectTreeNode[i].id+","
      }
    }
    var selectTreeNode = TreeUtil.getMonitorTreeNode();
    var newIds = [];
    for(var i = 0;i < selectTreeNode.length ;i++){
        newIds.push({ID:selectTreeNode[i].id});
    }
    // this.getFlux().actions.YFTSystemActions.setOldTree(TreeUtil.getCheckedNodes());
    //this.getFlux().actions.YFTEquipmentActions.setTreeIds(newIds);
    const { dispatch } = this.props;
    dispatch(emitOldResourceTreeNode(TreeUtil.getCheckedNodes()));
    dispatch(setTreeIds(newIds));

    if(this.state.tabId == 1){
      var userName = $("#userName").val();
      var passWord = $("#passWord").val();
      if(userName.trim() == ""){
        //alert("请输入用户名");
        $.showPublicDialog("资源设置","请输入用户名。");
        return;
      }
      if(passWord.trim() == ""){
        //alert("请输入密码");
        $.showPublicDialog("资源设置","请输入密码。");
        return;
      }
      var objList = [
        {key:"EQUIPMENTID",value:idStr},
        {key:"USERNAME",value:userName},
        {key:"PASSWORD",value:passWord}
      ];
      //this.getFlux().actions.YFTEquipmentActions.setEquipment(objList);
      dispatch(setEquipment(objList));
    }else if(this.state.tabId == 2){
      var communityInput = $("#communityInput").val();
      if(communityInput.trim() == ""){
        //alert("请输入参数");
        $.showPublicDialog("资源设置","请输入参数。");
        return;
      }
      var objList = [
        {key:"EQUIPMENTID",value:idStr},
        {key:"COMMUNITY",value:communityInput}
      ];
      //this.getFlux().actions.YFTEquipmentActions.setEquipment(objList);
      dispatch(setEquipment(objList));
    }else if(this.state.tabId == 3){
      var alarmRule = $("#alarmRule").find('.rw-input').text();
      if(alarmRule.trim() == "" || alarmRule.trim() == "无"){
        var objList = [
          {key:"EQUIPMENTID",value:idStr},
          {key:"ALARM_RULE",value:""}
        ];
        //this.getFlux().actions.YFTEquipmentActions.setEquipment(objList);
        dispatch(setEquipment(objList));
      }else{
        var rulesId = "";
        //var rulesIds = this.getFlux().store("YFTEquipmentStore").getState().alarmRulesArray;
        var rulesIds = this.props.alarmRulesArray;
        for(var i = 0;i < rulesIds.length;i++){
          if(alarmRule == rulesIds[i].name){
            rulesId = rulesIds[i].id;
          }
        }
        var objList = [
          {key:"EQUIPMENTID",value:idStr},
          {key:"ALARM_RULE",value:rulesId}
        ];
        //this.getFlux().actions.YFTEquipmentActions.setEquipment(objList);
        dispatch(setEquipment(objList));
      }
    }else if(this.state.tabId == 4){
      var radioChecked =  $('input:radio:checked').val();
      var relyStatus = $("#relyStatus").find('.rw-input').text();
      var objList = [
        {key:"EQUIPMENTID",value:idStr},
        {key:"ALARM_DEPEND",value: (radioChecked == 0 ? 1:0)},//报警依赖
        {key:"DEPEND_ID",value: this.state.relyId},
        {key:"MONITOR_DEPEND",value: (radioChecked == 1 ? 1:0)},//监测器依赖
        {key:"STATUS",value: relyStatus},
        {key:"DEPEND",value: $("#relyInput").val()}
      ];
      //this.getFlux().actions.YFTEquipmentActions.setEquipment(objList);
      dispatch(setEquipment(objList));
    }
  },
  changeTab:function(key){
    this.setState({tabId:key});
  },
  relyModal:function(){
    $('#relyModal').modal('show');

  },
  relyBtn:function(){
    var relyObj = TreeUtil.relyModaltreeF();
    this.setState({relyId:relyObj.selectId});
    if(relyObj.relyString == undefined){
      //alert("请选择依赖的设备");
      $.showPublicDialog("资源设置","请选择依赖的设备。");
      return;
    }
    $('#relyModal').modal('hide');
    $("#relyInput").val(relyObj.relyString);
  },
  render:function(){
    return (
      <div className='overviewDiv'>
        <div className="modal fade" id="relyModal" tabIndex="-1" role="dialog" aria-labelledby="editErrorConditionModalLabel" aria-hidden="true">
            <div className="modal-dialog editConditionModalDialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this._handleOnClickCancel}>&times;</button>
                        <h5 className="modal-title">依赖于</h5>
                    </div>
                    <div className="zTreeMonitor groupZTree" style={{height:"300px"}}>
                        <ul id="relyModaltree" className="ztree"></ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default btn-sm modalFootBtn"  onClick={this.relyBtn}>依赖</button>
                        <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._addBtn}>关闭</button>
                        <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">无依赖</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="monitorSetViewContent">
          <div className="titleDiv col-md-12 col-sm-12 col-xs-12">
            <div className="titleLeft">
                资源设置
            </div>
            <div className="titleRight">
              <a onClick={this.onClickCircle}><i className="fa fa-cog"></i></a>
            </div>
          </div>
          <div className='col-md-12' style={{paddingLeft:"0px",paddingRight:"0px"}}>

            <div className="buttonInfo col-md-12">
              <p>&nbsp;&nbsp;资源设置的功能：编辑设置资源的功能属性，包括基础设置、共同体、报警规则、依赖等。</p>
            </div>
            <div className='col-md-2 col-sm-3 col-xs-3 overviewDesViewDiv panelBasic' style={{paddingLeft:"0px",paddingRight:"0px",paddingTop:"0px"}}>
              <div className="zTreeMonitor groupZTree" style={{marginLeft:"0px",overflow:"visible"}}>
                  {/**<div>
                      <label style={{margin:"0px !important"}}>批量修改监测器设置</label>
                  </div>*/}
                  <ul id="monitortree" style={{marginLeft:"0px !important"}}  className="ztree"></ul>
              </div>
            </div>
            <div className="col-md-10 col-sm-9 col-xs-9 monitorSetTable overviewDesViewDiv panelBasic" style={{paddingTop:"0px"}}>
              <table id='resourceSetTable'
                     data-toggle='table'
                     data-classes='table table-no-bordered table-striped table-hover'
                     data-toolbar='#userListTable_toolbar'
                     data-resizable='true'
                     data-show-refresh='false'
                     data-show-toggle='false'
                     data-show-columns='false'
                     data-pagination='true'
                     data-page-size='10'
                     data-click-to-select='false'>
              </table>


              <div className='operationCreateTableDiv col-md-12'>
                <div className="createGroupDetailDiv monitorBaseDiv">
                  <div className="re-view">
                    <button type="button" className="repositorySubmit yunweiHeight" style={{marginLeft:"10px"}} onClick={this.useBtn}>应用</button>
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.changeTab.bind(this,1)}>基础设置</a></li>
                        <li><a href="#tab_2" data-toggle="tab" onClick={this.changeTab.bind(this,2)}>共同体</a></li>
                        <li><a href="#tab_3" data-toggle="tab" onClick={this.changeTab.bind(this,3)}>报警规则</a></li>
                        <li><a href="#tab_4" data-toggle="tab" onClick={this.changeTab.bind(this,4)}>依赖</a></li>
                    </ul>
                    <fieldset className="maintainOrderTable hardwareAssetTableBox">
                        <div className="contentDiv tab-content marginleft_none">
                          <div className="tab-pane monitorSettingStyle active" id="tab_1">
                            <table className="sla-table-basic">
                              <tbody>
                                <tr>
                                  <td className="borderRightNone" style={{"width":"2%"}}>&nbsp;用户 <span className="slaPan"> *</span></td>
                                  <td className="rw-widget-td table-basic-td-input" style={{"width":"2%"}}>
                                    <input id="userName" type="text"/>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="borderRightNone" style={{"width":"2%"}}>&nbsp;密码 <span className="slaPan"> *</span></td>
                                  <td className="rw-widget-td table-basic-td-input" style={{"width":"5%"}}>
                                    <input id="passWord" type="password"/>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="tab-pane monitorSettingStyle" id="tab_2">
                              <table className="sla-table-basic">
                                <tbody>
                                  <tr>
                                    <td className="borderRightNone" style={{"width":"2%"}}>&nbsp;共同体 <span className="slaPan"> *</span></td>
                                    <td className="rw-widget-td table-basic-td-input" style={{"width":"5%"}}>
                                      <input id="communityInput" type="text"/>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                          </div>
                          <div className="tab-pane monitorSettingStyle" id="tab_3">
                            <table className="sla-table-basic">
                              <tbody>
                                <tr>
                                  <td className="borderRightNone" style={{"width":"2%"}}>&nbsp;报警规则 <span className="slaPan"> *</span></td>
                                  <td className="rw-widget-td" style={{"width":"2%"}}>
                                    <ReactWidgets.DropdownList id="alarmRule"  data={this.props.alarmRulesArray}
                                       textField='name' value={this.state.rulesValue} onChange={rulesValue => this.setState({rulesValue})} />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="tab-pane monitorSettingStyle" id="tab_4">
                            <table className="sla-table-basic">
                              <tbody>
                                <tr>
                                  <td colSpan="3" className="rw-widget-td" style={{"width":"5%"}}>&nbsp;
                                      <label>
                                        <input name="yilai" type="radio" id="cwXiaoyan" value="0" defaultChecked="true"/>报警依赖
                                      </label>
                                      <label style={{marginLeft:"20px"}}>
                                        <input name="yilai" type="radio" id="cwXiaoyan" value="1"/>监测依赖
                                      </label>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="borderRightNone" style={{"width":"5%"}}>&nbsp;依赖<span className="slaPan"> *</span></td>
                                  <td colSpan="2" className="rw-widget-td table-basic-td-input" style={{"width":"8%"}}>
                                    <ReactWidgets.DropdownList id="relyStatus" data={["error","good","warning"]} textField='name' defaultValue={"good"} />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="borderRightNone" style={{"width":"5%"}}>&nbsp;依赖于<span className="slaPan"> *</span></td>
                                  <td className="rw-widget-td table-basic-td-input" style={{"width":"8%"}}>
                                    <input id="relyInput" type="text"/>
                                  </td>
                                  <td className="rw-widget-td" style={{"width":"1%"}}>
                                    <input  className="btn btn-default" type="button" style={{backgroundColor:"#0EBB30", width:"100%",color:"white",fontWeight:"bold"}} type="button" value="设置条件" onClick={this.relyModal}/>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

function mapStateToProps(state) {
  const { monitorTree,oldTree } = state.systemReducer
  const { resourceSetTree,alarmRulesArray,isShowTree,treeIds,getOldTree} = state.equipmentReducer
  return {
    monitorTree,
    oldTree,
    resourceSetTree,
    alarmRulesArray,
    isShowTree,
    treeIds,
    getOldTree
  }
}

export default connect(mapStateToProps)(ResourceSetRightView)
