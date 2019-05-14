/**
* 资源监测-设置-其他监测器设置
*/

require('bootstrap');
import React from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var ReactWidgets = require('react-widgets');
var base64 = require('../../../../../utils/base64');
import { connect } from 'react-redux'
import {isShowTree,getMonitorTree,setMonitorTreeCheckedNodes,setMonitorTypeArray,getMonitorReturnItem,setTreeClear,
        setTreeIds,setMonitorIsAlarm,setMonitorRefresh,setMonitorReturnItem,setMonitorReturnItemDefaultValue} from '../../../../../actions/system_action'

// var settreeConfig = 0;
$(window).resize(function(){
  var height = $(window).height();
  height = height-220;
  $(".leftTreeBase").css("height",($(window).height()-220)+"px");
  $(".panelBasic").css("height",height+"px");
});

var timeUnit = [{id:"HOURS",name:"小时"},{id:"MINUTES",name:"分钟"},{id:"SECONDS",name:"秒"}];
var eArray = ['==','!=','>=','>','<=','<','contains','!contains'];
var MonitorSettingView = React.createClass({
  mixins: [History],//, FluxMixin, StoreWatchMixin("YFTSystemStore")
  getInitialState: function(){
    return {
      settreeConfig:true,
      title:"",
      errorArray:[],//编辑条件的表格
      dangerArray:[],
      normalArray:[],
      oldErrorData:[],
      oldDangerData:[],
      oldNormalData:[],
      flag:0,
      monitorType:[],
      value:"",
      tabId:1,
      conditionValue:"",
      errorRelation:"",
      dangerRelation:"",
      goodRelation:"",
      expressionArray:eArray[0],
      timeUnitDefault:timeUnit[0],
      timeUnitErrorDefault:timeUnit[0]
    }
  },
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    monitorTree:React.PropTypes.array.isRequired,
    oldTree:React.PropTypes.array.isRequired,
    monitorTypeArray:React.PropTypes.array.isRequired,
    monitorReturnItem:React.PropTypes.array.isRequired,
    monitorReturnItemDefaultValue:React.PropTypes.string.isRequired,
    isTreeClear:React.PropTypes.bool.isRequired,
    treeIds:React.PropTypes.string.isRequired
  },
  getTreeNode:function(){
    var treeObj = $.fn.zTree.getZTreeObj("monitortree");
    var checkNodes = treeObj.getCheckedNodes(true);
    // console.log("checkNodes===============");
    // console.log(checkNodes);
    var newNodes = [];
    for(var i = 0;i < checkNodes.length ;i++){
      if(checkNodes[i].frequency){
        var nodeObj = {
          id:checkNodes[i].id,
          name:checkNodes[i].name,
          frequency:checkNodes[i].frequency,
          verifyErrorFrequency:checkNodes[i].verifyErrorFrequency,
          IsVerifyerror:checkNodes[i].IsVerifyerror,
          isalarm:checkNodes[i].isalarm,
          type:checkNodes[i].type
        }
        newNodes.push(nodeObj);
      }
    }
    return newNodes;
  },
  myTest:function(){
    this.clearTextarea();
    var selectTreeNode = this.getTreeNode();
    // console.log("获取树的数据==");
    // console.log(selectTreeNode);
    $('#monitorTable').bootstrapTable('refreshOptions', {data: selectTreeNode});
    const { dispatch } = this.props;
    if(selectTreeNode.length > 0){
      var newNodes = [];
      for(var i=0;i < selectTreeNode.length;i++){
        newNodes.push(selectTreeNode[i].type);
      }
      newNodes.sort();
      var res = [newNodes[0]];
      for(var i = 1; i < newNodes.length; i++){
       if(newNodes[i] !== res[res.length - 1]){
        res.push(newNodes[i]);
       }
      }
      //this.getFlux().actions.YFTSystemActions.setMonitorTypeArray(res);
      dispatch(setMonitorTypeArray(res));
      //// this.setState({monitorType:res});
      this.setState({value:res[0]});
    }else{
      //this.getFlux().actions.YFTSystemActions.setMonitorTypeArray([]);
      dispatch(setMonitorTypeArray([]));
      this.setState({value:""});
    }
  },
  onClickChild:function(treeNode){
    var zTree = $.fn.zTree.getZTreeObj("monitortree");
    var checkedState = treeNode.checked;
    if(checkedState){
      checkedState = false;
    }else{
      checkedState = true;
    };
    zTree.checkNode(treeNode,checkedState,true);
  },
  rSetting:function(){
    var _this = this;
    var setting = {
      check: {
        enable: true
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        beforeClick: function(treeId, treeNode) {
          _this.onClickChild(treeNode);
          _this.myTest();
        },
        onCheck: this.myTest
      }
    }
    return setting;
  },
  componentWillMount: function() {
    //this.getFlux().actions.YFTSystemActions.getMonitorTree();
    // settreeConfig = 0;
    // this.setState({settreeConfig:true});
    const { dispatch } = this.props;
    dispatch(getMonitorTree());
    dispatch(isShowTree(true));
  },
  //设置选中子复选框并勾选它所有父类
  setTreeNode:function(treeObj,ids){
    for(var x=0; x< ids.length;x++){
      var node = treeObj.getNodeByParam("id",ids[x].ID);
      treeObj.checkNode(node, true, true);
    }
  },
  componentDidUpdate:function(){
    if(this.props.isShowTree && this.props.monitorTree.length > 0){
      //var treeObj = this.getFlux().store("YFTSystemStore").getState().monitorTree;
      var treeObj = this.props.monitorTree;
      $(document).ready(function(){
        $.fn.zTree.init($("#monitortree"), this.rSetting(), treeObj);
      }.bind(this));
      $('input:radio:first').attr('checked', 'checked');
      if(this.props.treeIds.length > 0){
        var treeObj = $.fn.zTree.getZTreeObj("monitortree");
        this.setTreeNode(treeObj,this.props.treeIds);
      }
      var selectTreeNode = this.getTreeNode();
      if(selectTreeNode.length > 0){
        $('#monitorTable').bootstrapTable('refreshOptions', {data: selectTreeNode});
      }else{
        const { dispatch } = this.props;
        dispatch(setMonitorTypeArray([]));
        $('#monitorTypeList').find('.rw-input').text('');
      }

      // if(selectTreeNode.length <= 0){
      //   //this.getFlux().actions.YFTSystemActions.setMonitorTypeArray([]);
      //   const { dispatch } = this.props;
      //   dispatch(setMonitorTypeArray([]));
      //   $('#monitorTypeList').find('.rw-input').text('');
      // }
      const { dispatch } = this.props;
      dispatch(isShowTree(false));
    }
  },
  componentDidMount:function(){
    var height = $(window).height();
    height = height-220;
    $(".leftTreeBase").css("height",($(window).height()-220)+"px");
    $(".panelBasic").css("height",height+"px");
    // //var treeObj = this.getFlux().store("YFTSystemStore").getState().monitorTree;
    // var treeObj = this.props.monitorTree;
    // $(document).ready(function(){
    //   $.fn.zTree.init($("#monitortree"), this.rSetting(), treeObj);
    // }.bind(this));

    $('#monitorTable').bootstrapTable({
        exportDataType:"all",
        columns: [
            {
                title: '名称',
                field: 'name',
                sortable: true
            }, {
                title: '监测频率',
                field: 'frequency',
                sortable: true
            }, {
                title: '错误校验频率',
                field: 'verifyErrorFrequency',
                sortable: true
            }, {
                title: '是否进行错误校验',
                field: 'IsVerifyerror',
                sortable: true
            }, {
                title: '监测生成事件后告警',
                field: 'isalarm',
                sortable: true
            }
        ],
        data: [],
        exportDataType:"all"
    });

    $('#conditionTable').bootstrapTable({
        exportDataType:"all",
        columns: [
          {
              field: 'state',
              checkbox: true
          },
            {
                title: '项目',
                field: 'project',
                sortable: true
            }, {
                title: '操作符',
                field: 'operator',
                sortable: true
            }, {
                title: '值',
                field: 'value',
                sortable: true
            }
        ],
        data: [],
        exportDataType:"all"
    });
    //  $('input:radio:first').attr('checked', 'checked');
    //  var selectTreeNode = this.getTreeNode();
    //  if(selectTreeNode.length <= 0){
    //    //this.getFlux().actions.YFTSystemActions.setMonitorTypeArray([]);
    //    const { dispatch } = this.props;
    //    dispatch(setMonitorTypeArray([]));
    //    $('#monitorTypeList').find('.rw-input').text('');
    //  }

     //quanxianshezhi
     var temp = localStorage.getItem("PERMISSIONS");
     temp = base64.base64decode(temp);
     temp = decodeURI(temp);
     var permissionsValue = eval(temp);
     var level = localStorage.getItem('LEVEL');
     var oterMonitorSetting = false;
     for(var i = 0; i < permissionsValue.length; i++) {
         if(permissionsValue[i].resourceType == "/equipmentmanage/setting/monitorset/edit") {
           oterMonitorSetting = true;
       }
     }
     if(!oterMonitorSetting){
       $('.repositorySubmit').hide();
     }
  },
  editCondition:function(key){
    //清空一次
    var selectTreeNode = this.getTreeNode();
    if(selectTreeNode.length <= 0){
      alert("请选择监测器!");
      return;
    }
    $('#conditionC').val("");
    this.setState({expressionArray:eArray[0]});
    this.setState({errorArray:this.state.oldErrorData});
    this.setState({dangerArray:this.state.oldDangerData});
    this.setState({normalArray:this.state.oldNormalData});
    //// $('#monitorTypeList').find('.rw-input').text();
    //this.getFlux().actions.YFTSystemActions.getMonitorReturnItem($('#monitorTypeList').find('.rw-input').text());
    const { dispatch } = this.props;
    dispatch(getMonitorReturnItem($('#monitorTypeList').find('.rw-input').text()));

    $('#editErrorConditionModal').modal('show');
    if(key ==1){
      this.setState({title:"编辑错误条件",flag:1});

      //if(this.getFlux().store("YFTSystemStore").getState().isTreeClear){
      if(this.props.isTreeClear){
        this.setState({oldErrorData:[]});
        this.setState({oldDangerData:[]});
        this.setState({oldNormalData:[]});
        this.setState({errorArray:[]});
        this.setState({dangerArray:[]});
        this.setState({normalArray:[]});
        //this.getFlux().actions.YFTSystemActions.setTreeClear(false);
        dispatch(setTreeClear(false));
        $('#conditionTable').bootstrapTable('refreshOptions', {data: []});
      }else{
        $('#conditionTable').bootstrapTable('refreshOptions', {data: this.state.oldErrorData});
      }
    }else if(key == 2){
      this.setState({title:"编辑危险条件",flag:2});

      //if(this.getFlux().store("YFTSystemStore").getState().isTreeClear){
      if(this.props.isTreeClear){
        this.setState({oldErrorData:[]});
        this.setState({oldDangerData:[]});
        this.setState({oldNormalData:[]});
        this.setState({errorArray:[]});
        this.setState({dangerArray:[]});
        this.setState({normalArray:[]});
        //this.getFlux().actions.YFTSystemActions.setTreeClear(false);
        dispatch(setTreeClear(false));
        $('#conditionTable').bootstrapTable('refreshOptions', {data: []});
      }else{
        $('#conditionTable').bootstrapTable('refreshOptions', {data: this.state.oldDangerData});
      }
    }else if(key == 3){
      this.setState({title:"编辑正常条件",flag:3});

      //if(this.getFlux().store("YFTSystemStore").getState().isTreeClear){
      if(this.props.isTreeClear){
        this.setState({oldErrorData:[]});
        this.setState({oldDangerData:[]});
        this.setState({oldNormalData:[]});
        this.setState({errorArray:[]});
        this.setState({dangerArray:[]});
        this.setState({normalArray:[]});
        //this.getFlux().actions.YFTSystemActions.setTreeClear(false);
        dispatch(setTreeClear(false));
        $('#conditionTable').bootstrapTable('refreshOptions', {data: []});
      }else{
        $('#conditionTable').bootstrapTable('refreshOptions', {data: this.state.oldNormalData});
      }
    }
  },
  uuid:function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  },
  conditionAdd:function(){
    var conditionA  = $('#conditionA').find('.rw-input').text();
    var conditionStr = "";
    var conditionB  = $('#conditionB').find('.rw-input').text();
    var conditionC  = $('#conditionC').val();
    //var conditionItem = this.state.itoss_system.monitorReturnItem;
    var conditionItem = this.props.monitorReturnItem;
    for(var i=0;i < conditionItem.length ;i++){
      if(conditionA == conditionItem[i].name){
        conditionStr = conditionItem[i].id;
      }
    }
    if(conditionC.trim() == ""){
      alert("项目表达式的值不能为空!");
      return;
    }
    var tableObj = {
      id:this.uuid(),
      project:conditionA,
      projectStr:conditionStr,
      operator:conditionB,
      value:conditionC
    };
    var nextItems =[];
    if(this.state.flag == 1){
      var eArray = this.state.errorArray;
      for(var i=0;i < eArray.length;i++){
        if(conditionA == eArray[i].project && conditionB == eArray[i].operator && conditionC == eArray[i].value){
          alert("该条件已存在");
          return false;
        }
      }
      nextItems = this.state.errorArray.concat([tableObj]);
      this.setState({errorArray:nextItems});
      $('#conditionTable').bootstrapTable('refreshOptions', {data: nextItems});
    }else if(this.state.flag == 2){
      var dArray = this.state.dangerArray;
      for(var i=0;i < dArray.length;i++){
        if(conditionA == dArray[i].project && conditionB == dArray[i].operator && conditionC == dArray[i].value){
          alert("该条件已存在");
          return false;
        }
      }
      nextItems = this.state.dangerArray.concat([tableObj]);
      this.setState({dangerArray:nextItems});
      $('#conditionTable').bootstrapTable('refreshOptions', {data: nextItems});
    }else{
      var nArray = this.state.normalArray;
      for(var i=0;i < nArray.length;i++){
        if(conditionA == nArray[i].project && conditionB == nArray[i].operator && conditionC == nArray[i].value){
          alert("该条件已存在");
          return false;
        }
      }
      nextItems = this.state.normalArray.concat([tableObj]);
      this.setState({normalArray:nextItems});
      $('#conditionTable').bootstrapTable('refreshOptions', {data: nextItems});
    }
  },
  _addBtn:function(){
    if(this.state.flag == 1){
      if(this.state.errorArray.length <= 0){
        $("#errorValue").val("");
        $("#hideErrorValue").val("");
        this.setState({oldErrorData:[]});
        return;
      }
      //如果进行过删除操作
      //获取关系
      var radioValue =   $("input[type='radio']:checked").val();
      this.setState({errorRelation:radioValue});
      var errorData = this.state.errorArray;
      var newStr = "";
      var newHideStr = "";
      for(var i =0;i< errorData.length;i++){
        if(i == errorData.length-1){
          newStr += "["+errorData[i].project+errorData[i].operator+errorData[i].value+"]";
          newHideStr += errorData[i].projectStr+" "+errorData[i].operator+" "+errorData[i].value;
        }else{
          newStr += "["+errorData[i].project+errorData[i].operator+errorData[i].value+"]"+(radioValue == "1" ? "与":"或");
          newHideStr += errorData[i].projectStr+" "+errorData[i].operator+" "+errorData[i].value+",";
        }
      }
      this.setState({oldErrorData:errorData});
      $("#errorValue").val(newStr);
      $("#hideErrorValue").val(newHideStr);
    }else if(this.state.flag == 2){
      if(this.state.dangerArray.length <= 0){
        $("#dangerValue").val("");
        $("#hideDangerValue").val("");
        this.setState({oldDangerData:[]});
        return;
      }
      var radioValue =   $("input[type='radio']:checked").val();
      this.setState({dangerRelation:radioValue});
      var dangerData = this.state.dangerArray;
      var newStr = "";
      var newHideStr = "";
      for(var i =0;i< dangerData.length;i++){
        if(i == dangerData.length-1){
          newStr += "["+dangerData[i].project+dangerData[i].operator+dangerData[i].value+"]";
          newHideStr += dangerData[i].projectStr+" "+dangerData[i].operator+" "+dangerData[i].value;
        }else{
          newStr += "["+dangerData[i].project+dangerData[i].operator+dangerData[i].value+"]"+(radioValue == "1" ? "与":"或");
          newHideStr += dangerData[i].projectStr+" "+dangerData[i].operator+" "+dangerData[i].value+",";
        }
      }
      this.setState({oldDangerData:dangerData});
      $("#dangerValue").val(newStr);
      $("#hideDangerValue").val(newHideStr);
    }else{
      if(this.state.normalArray.length <= 0){
        $("#normalValue").val("");
        $("#hideNormalValue").val("");
        this.setState({oldNormalData:[]});
        return;
      }
      var radioValue = $("input[type='radio']:checked").val();
      this.setState({goodRelation:radioValue});
      var normalData = this.state.normalArray;
      var newStr = "";
      var newHideStr = "";
      for(var i =0;i< normalData.length;i++){
        if(i == normalData.length-1){
          newStr += "["+normalData[i].project+normalData[i].operator+normalData[i].value+"]";
          newHideStr += normalData[i].projectStr+" "+normalData[i].operator+" "+normalData[i].value;
        }else{
          newStr += "["+normalData[i].project+normalData[i].operator+normalData[i].value+"]"+(radioValue == "1" ? "与":"或");
          newHideStr += normalData[i].projectStr+" "+normalData[i].operator+" "+normalData[i].value+",";
        }
      }
      this.setState({oldNormalData:normalData});
      $("#normalValue").val(newStr);
      $("#hideNormalValue").val(newHideStr);
    }
  },
  useBtn:function(){
    // console.log("--tab-"+this.state.tabId);
    var selectTreeNode = this.getTreeNode();
    if(selectTreeNode.length <= 0){
      //alert("请选择监测器!");
      $.showPublicDialog("其他监测器设置","请选择监测器。");
      return;
    }
    // console.log("selectTreeNode==");
    // console.log(selectTreeNode);
    var idStr = "'";
    var idStrThree = "'";
    var idArrayThree = [];
    //获取到当前监测器类型
    // $('#monitorTypeList').find('.rw-input').text();
    // debugger;
    for(var i =0;i< selectTreeNode.length;i++){
      if($('#monitorTypeList').find('.rw-input').text() == selectTreeNode[i].type){
        idArrayThree.push(selectTreeNode[i].id);
      }
      if(i == selectTreeNode.length-1){
        idStr +=selectTreeNode[i].id+"'"
        // if(this.state.value == selectTreeNode[i].type){
        //   idStrThree +=selectTreeNode[i].id+"'"
        // }
      }else{
        idStr +=selectTreeNode[i].id+","
        // if(this.state.value == selectTreeNode[i].type){
        //   idStrThree +=selectTreeNode[i].id+","
        // }
      }
    }

    for(var j=0;j < idArrayThree.length;j++){
      if(j == idArrayThree.length-1){
        idStrThree +=idArrayThree[j]+"'"
      }else{
        idStrThree +=idArrayThree[j]+","
      }
    }
    //更新树
    var newIds = [];
    for(var i = 0;i < selectTreeNode.length ;i++){
        newIds.push({ID:selectTreeNode[i].id});
    }
    var treeObj = $.fn.zTree.getZTreeObj("monitortree");
    var checkNodes = treeObj.getCheckedNodes(true);
    // this.getFlux().actions.YFTSystemActions.setOldTree(checkNodes);
    // this.getFlux().actions.YFTSystemActions.setTreeIds(newIds);
    const { dispatch } = this.props;
    dispatch(setMonitorTreeCheckedNodes(checkNodes));
    dispatch(setTreeIds(newIds));

    if(this.state.tabId == 1){
      var isAlarmObj = {
        MONITORTID: idStr,
        ISALARM:$("#jcGaojin").is(':checked') ? "'1'":"'0'"
      };
      //this.getFlux().actions.YFTSystemActions.setMonitorIsAlarm(isAlarmObj);
      dispatch(setMonitorIsAlarm(isAlarmObj));
    }else if(this.state.tabId == 2){
      var cwNumber = $("#jcNumber").val();
      if(cwNumber == ""){
        $.showPublicDialog("其他监测器设置","修改值不能为空。");
        return;
      }
      var timeStr = "";
      var jcTime = $("#jcTime").find('.rw-input').text();
      if(jcTime == "小时"){
        timeStr = "HOURS";
      }else if(jcTime == "分钟"){
        timeStr = "MINUTES";
      }else if(jcTime == "秒"){
        timeStr = "SECONDS";
      }
      //minute MINUTES  seconds  SECONDS
      var refreshObj = {
        MONITORTID: idStr,
        TIME:"'"+cwNumber+"'",
        TIMEUNIT:"'"+timeStr+"'"
      };
      //this.getFlux().actions.YFTSystemActions.setMonitorRefresh(refreshObj);
      dispatch(setMonitorRefresh(refreshObj));
    }else if(this.state.tabId == 3){
      //此修改只对同类型生效
      var errorValue=  $("#errorValue").val();
      var dangerValue = $("#dangerValue").val();
      var normalValue = $("#normalValue").val();
      //debugger;
      //CPU平均利用率(%) == 0，CPU平均利用率(%) == 12

      var isError = this.state.errorRelation;
      var isWarning = this.state.dangerRelation;
      var isGood = this.state.goodRelation;
      if($("#errorValue").val() =="" && $("#dangerValue").val() =="" && $("#normalValue").val() == ""){
        //alert("阀值没有修改!");
        $.showPublicDialog("其他监测器设置","阀值没有修改。");
        return;
      }
      var inputObj = {
        MONITORTID: idStrThree,
        ERRORALARM: "'"+$("#hideErrorValue").val()+"'",//错误
        WARNINGALARM: "'"+$("#hideDangerValue").val()+"'",//危险
        GOODALARM: "'"+$("#hideNormalValue").val()+"'",//正常
        ISOR_ERROR: "'"+isError+"'",
        ISOR_WARNING: "'"+isWarning+"'",
        ISOR_GOOD: "'"+isGood+"'",
        MONITORTYPE: "'"+$('#monitorTypeList').find('.rw-input').text()+"'"//监测器类型
      };
      // console.log("操作的数据");
      // console.log(inputObj);
      //this.getFlux().actions.YFTSystemActions.setMonitorReturnItem(inputObj);
      dispatch(setMonitorReturnItem(inputObj));
    }else if(this.state.tabId == 4){
      var cwNumber = $("#cwNumber").val();
      if(cwNumber == ""){
        //alert("修改值不能为空!");
        $.showPublicDialog("其他监测器设置","修改值不能为空。");
        return;
      }
      var timeStr = "";
      var cwTime = $("#cwTime").find('.rw-input').text();
      if(cwTime == "小时"){
        timeStr = "HOURS";
      }else if(cwTime == "分钟"){
        timeStr = "MINUTES";
      }else if(cwTime == "秒"){
        timeStr = "SECONDS";
      }
      //minute MINUTES  seconds  SECONDS
      var refreshObj = {
        MONITORTID: idStr,
        TIME:"'"+cwNumber+"'",
        TIMEUNIT:"'"+timeStr+"'",
        ISERRORCHECK: $("#cwXiaoyan").is(':checked') ? "'1'":"'0'"
      };
      //this.getFlux().actions.YFTSystemActions.setMonitorRefresh(refreshObj);
      dispatch(setMonitorRefresh(refreshObj));
    }
    // settreeConfig = 0;
  },
  changeTab:function(key){
    this.setState({tabId:key});
  },
  checkNumber:function(e){
    if(e.currentTarget.id =="cwNumber"){
      // $('#cwNumber').val('');
      this._testing('#cwNumber','#cwTime');
    }else if(e.currentTarget.id =="jcNumber"){
      // $('#jcNumber').val('');
      this._testing('#jcNumber','#jcTime');
    }
  },
  checkTime:function(e){
    this.setState({timeUnitDefault:e});
    $('#jcNumber').val('');
  },
  checkErrorTime:function(e){
    this.setState({timeUnitErrorDefault:e});
    $('#cwNumber').val('');
  },
  _testing:function(id,id2){
    var intValue = parseInt($(id).val());
    if(intValue < 1){
      $(id).val("1");
    }else{
      //判断分/秒
      if("小时" == $(id2).find('.rw-input').text()){
        if(intValue > 24){
          $(id).val("24");
        }else{
          $(id).val(intValue);
        }
      }else{
        if(intValue > 60){
          $(id).val("60");
        }else{
          $(id).val(intValue);
        }
      }
    }
  },
  setConditionValue:function(e){
    //this.getFlux().actions.YFTSystemActions.setMonitorReturnItemDefaultValue(e);
    const {dispatch} = this.props;
    dispatch(setMonitorReturnItemDefaultValue(e));
  },
  _handleOnClickAdd:function(){
    var conditionC = $("#conditionC").val();
    if($.trim(conditionC) == "") {
        //alert("值不能为空");
        $.showPublicDialog("其他监测器设置","值不能为空。");
        return;
    }
  },
  _handleOnClickDelete:function(){
    var selectMult = $('#conditionTable').bootstrapTable('getSelections');
    // console.log("需要删除的数据");
    // console.log(selectMult);
    if(this.state.flag == 1){
      var eArray = this.state.errorArray;
      if(selectMult.length > 0 ){
        var newData = [];
        for(var y=0;y < eArray.length;y++){
          var has = false;
          for(var z =0;z < selectMult.length;z++){
            if(eArray[y].id == selectMult[z].id){
              has = true;
              break;
            }
          }
          if(!has){
            newData.push(eArray[y]);
          }
        }
        this.setState({errorArray:newData});
        $('#conditionTable').bootstrapTable('refreshOptions', {data: newData});
      }
    }else if(this.state.flag ==2 ){
      var dArray = this.state.dangerArray;
      if(selectMult.length > 0 ){
        var newData = [];
        for(var y=0;y < dArray.length;y++){
          var has = false;
          for(var z =0;z < selectMult.length;z++){
            if(dArray[y].id == selectMult[z].id){
              has = true;
              break;
            }
          }
          if(!has){
            newData.push(dArray[y]);
          }
        }
        this.setState({dangerArray:newData});
        $('#conditionTable').bootstrapTable('refreshOptions', {data: newData});
      }
    }else if(this.state.flag = 3){
      var nArray = this.state.normalArray;
      if(selectMult.length > 0 ){
        var newData = [];
        for(var y=0;y < nArray.length;y++){
          var has = false;
          for(var z =0;z < selectMult.length;z++){
            if(nArray[y].id == selectMult[z].id){
              has = true;
              break;
            }
          }
          if(!has){
            newData.push(nArray[y]);
          }
        }
        this.setState({normalArray:newData});
        $('#conditionTable').bootstrapTable('refreshOptions', {data: newData});
      }
    }
  },
  setMonitorType:function(e){
    // value => this.setState({ value }
    this.setState({value:e});
    this.clearTextarea();
  },
  clearTextarea:function(){
    $("#errorValue").val("");
    $("#dangerValue").val("");
    $("#normalValue").val("");
    $("#hideErrorValue").val("");
    $("#hideDangerValue").val("");
    $("#hideNormalValue").val("");
    this.setState({oldErrorData:[]});
    this.setState({oldDangerData:[]});
    this.setState({oldNormalData:[]});
    this.setState({errorArray:[]});
    this.setState({dangerArray:[]});
    this.setState({normalArray:[]});
    $("#jcNumber").val("");
    $("#cwNumber").val("");
    $('#jcGaojin').attr('checked', false);
    $('#cwXiaoyan').attr('checked', false);
    // $('#jcTime').find('.rw-input').text("小时");
    // $('#cwTime').find('.rw-input').text("小时");
  },
  setExpression:function(e){
    // this.setState
  },
  render:function(){
    return (
      <div className='overviewDiv'>

        <div className="modal fade" id="editErrorConditionModal" tabIndex="-1" role="dialog" aria-labelledby="editErrorConditionModalLabel" aria-hidden="true">
            <div className="modal-dialog editConditionModalDialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this._handleOnClickCancel}>&times;</button>
                        <h5 className="modal-title">{this.state.title}</h5>
                    </div>
                    <div className="modal-body">
                        <div className='col-md-12'>
                            <div className='col-md-1'>
                                <label className="label-name">条件</label>
                            </div>
                            <div className='col-md-4'>
                                <div className="subForm">
                                    <ReactWidgets.DropdownList id="conditionA" className="form-control" data={this.props.monitorReturnItem} textField='name' value={this.props.monitorReturnItemDefaultValue} onChange={this.setConditionValue} />
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className="subForm">
                                    <ReactWidgets.DropdownList id="conditionB" className="form-control" data={eArray} value={this.state.expressionArray} onChange={expressionArray => this.setState({ expressionArray })} />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="subForm">
                                    <input id="conditionC" type="text" className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 marginTop_5'>
                            <div className='col-md-6'>
                                <div className="col-md-2">
                                    <label className="label-name">关系</label>
                                </div>
                                <div className="col-md-10">
                                    <div className="radio radioDiv">
                                        <label>
                                            <input id="editErrorConditionModal_radio_And" type="radio" name="editErrorConditionModal_radio_and_or" value="1" defaultChecked="true" onClick={this._handleOnClickRadio}/> 与
                                        </label>
                                    </div>
                                    <div className="radio radioDiv">
                                        <label>
                                            <input id="editErrorConditionModal_radio_Or" type="radio" name="editErrorConditionModal_radio_and_or" value="2" onClick={this._handleOnClickRadio}/> 或
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="subForm pull-right">
                                    <button type="button" className="btn btn-default btn-sm modalFootBtn" onClick={this.conditionAdd}>添加</button>
                                </div>
                            </div>
                        </div>
                        <div className='marginTop_5'>
                            <table id='conditionTable'
                                   data-toggle='table'
                                   data-classes='table table-no-bordered table-striped table-hover'
                                   data-height={200}
                                   data-click-to-select='true'>
                            </table>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default btn-sm modalFootBtn" onClick={this._handleOnClickDelete}>删除</button>
                        <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._addBtn}>确定</button>
                        <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>

        {/**
        <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
          <div className="modal-dialog" role="document" style={{width:"700px"}}>
            <div className="modal-content" >
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">{this.state.title}</h4>
              </div>

              <div className="modal-body modalStyle" style={{height:"600px",paddingTop:"40px",overflow:"auto"}}>
                <div className="col-md-12">
                  <div className="col-md-2 col-sm-2 col-xs-2 monitorFont">条件</div>
                  <div className="col-md-4 col-sm-4 col-xs-4"><ReactWidgets.DropdownList id="conditionA" data={this.state.itoss_system.monitorReturnItem} textField='name' defaultValue={this.state.conditionValue} onChange={value => this.setState({ value })}/></div>
                  <div className="col-md-3 col-sm-3 col-xs-3"><ReactWidgets.DropdownList id="conditionB" data={["==","!=",">=",">","<=","<","contains","!contains"]} textField='name' defaultValue="=="/></div>
                  <div className="col-md-2 col-sm-2 col-xs-2 monitorFont" ><input id="conditionC" type="text"/></div>
                </div>
                <div className="col-md-12" style={{marginTop:"5px"}}>
                  <div className="col-md-2 col-sm-2 col-xs-2 monitorFont">关系</div>
                  <div className="col-md-4 col-sm-4 col-xs-4"  style={{marginTop:"3px"}}>
                    <label className="radio-inline">
                      <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="与"/> 与
                    </label>
                    <label className="radio-inline">
                      <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="或" /> 或
                    </label>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-6">
                    <button type="button" className="btn btn-default" style={{float:"right"}} onClick={this.conditionAdd}>添加</button>
                  </div>
                </div>

                <table id='conditionTable'
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
              </div>
              <div className="modal-footer navbar-fixed-bottom">
                <button type="button" className="btn btn-default">删除</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                <button id="checkNotPass" type="button" className="btn btn-primary" onClick={this._addBtn} data-dismiss="modal">确定</button>
              </div>
            </div>
          </div>
        </div>*/}

        <div className="monitorSetViewContent">
          <div className="titleDiv col-md-12 col-sm-12 col-xs-12">
            <div className="titleLeft">
                其他监测器设置
            </div>
            <div className="titleRight">
              <a onClick={this.onClickCircle}><i className="fa fa-cog"></i></a>
            </div>
          </div>
          <div className='col-md-12' style={{paddingLeft:"0px",paddingRight:"0px"}}>

            <div className="buttonInfo col-md-12">
              <p>&nbsp;&nbsp;监测器设置的功能：编辑设置或者批量设置除视频类设备以外监测器的功能属性，包括监测生成事件后告警、基础信息、报警条件、错误校验等。</p>
            </div>
            <div className='col-md-2 col-sm-3 col-xs-3 overviewDesViewDiv leftTreeBase' style={{paddingLeft:"0px",paddingRight:"0px",paddingTop:"0px"}}>
              <div className="zTreeMonitor groupZTree" style={{marginLeft:"0px",overflow:"visible"}}>
                  {/**<div>
                      <label style={{margin:"0px !important"}}>批量修改监测器设置</label>
                  </div>*/}
                  <ul id="monitortree" style={{marginLeft:"0px !important"}}  className="ztree"></ul>
              </div>
            </div>
            <div className="col-md-10 col-sm-9 col-xs-9 monitorSetTable overviewDesViewDiv panelBasic" style={{paddingTop:"0px"}}>
              <table id='monitorTable'
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
                        <li className="active"><a href="#tab_1" data-toggle="tab" onClick={this.changeTab.bind(this,1)}>监测生成事件后告警</a></li>
                        <li><a href="#tab_2" data-toggle="tab" onClick={this.changeTab.bind(this,2)}>基础信息</a></li>
                        <li><a href="#tab_3" data-toggle="tab" onClick={this.changeTab.bind(this,3)}>报警条件</a></li>
                        <li><a href="#tab_4" data-toggle="tab" onClick={this.changeTab.bind(this,4)}>错误校验</a></li>
                    </ul>
                    <fieldset className="maintainOrderTable hardwareAssetTableBox">
                        <div className="contentDiv tab-content marginleft_none">
                          <div className="tab-pane active" id="tab_1">
                              <label>
                                <input id="jcGaojin" type="checkbox" /> 监测生成事件后告警
                              </label>
                          </div>
                          <div className="tab-pane monitorSettingStyle" id="tab_2">
                              <table className="sla-table-basic">
                                <tbody>
                                  <tr>
                                    <td className="borderRightNone" style={{"width":"5%"}}>&nbsp;监测器频率 <span className="slaPan"> *</span></td>
                                    <td className="rw-widget-td table-basic-td-input" style={{"width":"8%"}}>
                                      <input id="jcNumber" type="number" min="1" max="24" size="4" onChange={this.checkNumber}/>
                                    </td>
                                    <td className="rw-widget-td" style={{"width":"1%"}}>
                                      <ReactWidgets.DropdownList id="jcTime"  data={timeUnit} textField='name' value={this.state.timeUnitDefault} onChange={this.checkTime}/>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                          </div>
                          <div className="tab-pane monitorSettingStyle" id="tab_3">



                            <div className="yunweiTable slaTableStyle">
                              <div>&nbsp;</div>

                              <table className="sla-table-basic">
                                <tbody>
                                  <tr>
                                    <td colSpan="2" className="slaTitleStyle slaTitleStyleWidth">&nbsp;监测器类型<span className="slaPan"> *</span></td>
                                    <td colSpan="2" className="slaTitleStyle">
                                      <ReactWidgets.DropdownList id="monitorTypeList"  data={this.props.monitorTypeArray} textField='name' value={this.state.value} onChange={this.setMonitorType}/>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan="2" className="slaTitleStyle slaBorderRight">&nbsp;错误</td>
                                    <td colSpan="2" className="slaTitleStyle" style={{textAlign:"right",borderLeft:"none"}}>
                                      <button className="btn btn-default" type="button" style={{backgroundColor:"#0EBB30",color:"white",fontWeight:"bold"}} type="button" onClick={this.editCondition.bind(this,1)}>设置条件</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan="4" className="slaTitleStyle table-basic-td-input">
                                      <textarea id="errorValue" disabled="true" className="table-basic-h2 textarea-xlarge bottom-border" rows="3"></textarea>
                                      <input type="hidden" id="hideErrorValue" disabled="false" />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan="2" className="slaTitleStyle slaBorderRight">&nbsp;危险</td>
                                    <td colSpan="2" className="slaTitleStyle" style={{textAlign:"right",borderLeft:"none"}}>
                                      <button className="btn btn-default" type="button" style={{backgroundColor:"#0EBB30",color:"white",fontWeight:"bold"}} type="button" onClick={this.editCondition.bind(this,2)}>设置条件</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan="4" className="slaTitleStyle table-basic-td-input">
                                      <textarea id="dangerValue" disabled="true" className="table-basic-h2 textarea-xlarge bottom-border" rows="3"></textarea>
                                      <input type="hidden" id="hideDangerValue" disabled="true" />
                                  </td>
                                  </tr>
                                  <tr>
                                    <td colSpan="2" className="slaTitleStyle slaBorderRight">&nbsp;正常</td>
                                    <td colSpan="2" className="slaTitleStyle" style={{textAlign:"right",borderLeft:"none"}}>
                                      <button className="btn btn-default" type="button" style={{backgroundColor:"#0EBB30",color:"white",fontWeight:"bold"}} type="button" onClick={this.editCondition.bind(this,3)}>设置条件</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan="4" className="slaTitleStyle table-basic-td-input">
                                      <textarea id="normalValue" disabled="true" className="table-basic-h2 textarea-xlarge bottom-border" rows="3"></textarea>
                                      <input type="hidden" id="hideNormalValue" disabled="true" />
                                  </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                          </div>
                          <div className="tab-pane monitorSettingStyle" id="tab_4">
                            <table className="sla-table-basic">
                              <tbody>
                                <tr>
                                  <td className="borderRightNone" style={{"width":"5%"}}>&nbsp;错误校验</td>
                                  <td colSpan="2" className="rw-widget-td" style={{"width":"5%"}}>&nbsp;
                                      <label>
                                        <input type="checkbox" id="cwXiaoyan"/>监测器错误校验
                                      </label>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="borderRightNone" style={{"width":"5%"}}>&nbsp;错误校验频率<span className="slaPan"> *</span></td>
                                  <td className="rw-widget-td table-basic-td-input" style={{"width":"8%"}}>
                                    <input id="cwNumber" type="number" min="1" max="60" size="4" onChange={this.checkNumber}/>
                                  </td>
                                  <td className="rw-widget-td" style={{"width":"1%"}}>
                                    <ReactWidgets.DropdownList id="cwTime" data={timeUnit} textField='name' value={this.state.timeUnitErrorDefault} onChange={this.checkErrorTime} />
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
  const { isShowTree,monitorTree,oldTree,monitorTypeArray,monitorReturnItem,monitorReturnItemDefaultValue,isTreeClear,treeIds } = state.systemReducer
  return {
    isShowTree,
    monitorTree,
    oldTree,
    monitorTypeArray,
    monitorReturnItem,
    monitorReturnItemDefaultValue,
    isTreeClear,
    treeIds
  }
}
export default connect(mapStateToProps)(MonitorSettingView)
//module.exports = MonitorSettingView;
