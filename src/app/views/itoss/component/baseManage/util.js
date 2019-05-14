'use strict';
var Store = require('../../../../server/store');
var base64 = require('../../../../utils/base64.js');

var Util = {
  // 获取树的组织id,返回  1,11,111
	getTreeNode:function(treeObj){
    // var checked = treeObj.getNodes();//获取所有树节点
    // var checkeds = treeObj.getNodes()[0];
    var checkNodes = treeObj.getCheckedNodes(true);//获取勾选的选项
    var rStr = "";
    for(var i=0;i < checkNodes.length;i++){
      if(i == checkNodes.length -1){
        rStr = rStr+checkNodes[i].safegroupId;
      }else{
        rStr = rStr+checkNodes[i].safegroupId+",";
      }
    }
    return rStr;
  },
  // 设置树的节点 传入组织id
  setTreeNode:function(treeObj,ids){
    for(var x=0; x< ids.length;x++){
      var node = treeObj.getNodeByParam("id",ids[x].ID);
      treeObj.checkNode(node, true, false);
    }
  },
  setTreeDisabled:function(treeObj,flag){
    var nodes = treeObj.getNodes();
    for(var i=0;i < nodes.length;i++ ){
      if(flag){
        treeObj.setChkDisabled(nodes[i], flag, flag, flag);
      }else{
        treeObj.setChkDisabled(nodes[i], flag, true, true);
      }
    }
  },

  //Table 单条记录删除刷新
  tableSingleDeleteRefresh:function(sourceData,deleteData){
    var newData = [];
    for(var y=0;y < sourceData.length;y++){
      if(sourceData[y].id != deleteData){
        newData.push(sourceData[y]);
      }
    }
    for(var z=0;z < newData.length;z++){
      newData[z].id = z;
    }
    $('#hardwareAssetTable').bootstrapTable('refreshOptions', {data: newData});
  },
  //Table 多条记录删除刷新
  tableMultDeleteRefresh:function(sourceData,deleteDatas){
    var mRecid = "";
    var cId = "";
    for(var i =0; i < deleteDatas.length; i++){
      if(i == deleteDatas.length-1){
        mRecid = "'"+mRecid+deleteDatas[i].TOPIC_ID+"'";
        cId = cId+deleteDatas[i].id;
      }else{
        mRecid = ""+mRecid+deleteDatas[i].TOPIC_ID+"','";
        cId = cId+deleteDatas[i].id+",";
      }
    }

    var counts = cId.split(",");
    var newData = [];
    for(var y=0;y < sourceData.length;y++){
      var has = false;
      for(var z =0;z < counts.length;z++){
        if(sourceData[y].id == counts[z]){
          has = true;
          break;
        }
      }
      if(!has){
        newData.push(sourceData[y]);
      }
    }
    for(var z=0;z < newData.length;z++){
      newData[z].id = z;
    }

    $('#hardwareAssetTable').bootstrapTable('refreshOptions', {data: newData});
    return mRecid;
  },
	tableMultDeleteRefreshDated:function(sourceData,deleteDatas){
    var mRecid = "";
    var cId = "";
    for(var i =0; i < deleteDatas.length; i++){
      if(i == deleteDatas.length-1){
        mRecid = "'"+mRecid+deleteDatas[i].TOPIC_ID+"'";
        cId = cId+deleteDatas[i].id;
      }else{
        mRecid = ""+mRecid+deleteDatas[i].TOPIC_ID+"','";
        cId = cId+deleteDatas[i].id+",";
      }
    }

    var counts = cId.split(",");
    var newData = [];
    for(var y=0;y < sourceData.length;y++){
      var has = false;
      for(var z =0;z < counts.length;z++){
        if(sourceData[y].id == counts[z]){
          has = true;
          break;
        }
      }
      if(!has){
        newData.push(sourceData[y]);
      }
    }
    for(var z=0;z < newData.length;z++){
      newData[z].id = z;
    }

    $('#datedTopicTable').bootstrapTable('refreshOptions', {data: newData});
    return mRecid;
  },
  //Table2 多条记录删除刷新
  tableMultDeleteRefresh2:function(sourceData,deleteDatas){
    var mRecid = "";
    var cId = "";
    for(var i =0; i < deleteDatas.length; i++){
      if(i == deleteDatas.length-1){
        mRecid = mRecid+deleteDatas[i].TOPIC_ID;
        cId = cId+deleteDatas[i].id;
      }else{
        mRecid = mRecid+deleteDatas[i].TOPIC_ID+",";
        cId = cId+deleteDatas[i].id+",";
      }
    }

    var counts = cId.split(",");
    var newData = [];
    for(var y=0;y < sourceData.length;y++){
      var has = false;
      for(var z =0;z < counts.length;z++){
        if(sourceData[y].id == counts[z]){
          has = true;
          break;
        }
      }
      if(!has){
        newData.push(sourceData[y]);
      }
    }
    for(var z=0;z < newData.length;z++){
      newData[z].id = z;
    }

    $('#hardwareAssetTable').bootstrapTable('refreshOptions', {data: newData});
    return mRecid;
  },
  _testing:function(id){
    var intValue = parseInt($(id).val());
    if(intValue < 1){
      $(id).val("1");
    }else{
      if(intValue > 9999){
        $(id).val("9999");
      }else{
        $(id).val(intValue);
      }
    }
  },
	_testing2:function(id){
		var intValue = parseInt($(id).val());
		if(intValue < 0){
			$(id).val("0");
		}else{
			if(intValue > 9999){
				$(id).val("9999");
			}else{
				$(id).val(intValue);
			}
		}
	},
	//获取当月的最后一天
	getCurrentMonthLastDay:function(){
		//获取下个月第一天 减一天
		 var current=new Date();
		 var currentMonth=current.getMonth();
		 var nextMonth=++currentMonth;
		 var nextMonthDayOne =new Date(current.getFullYear(),nextMonth,1);
		 var minusDate=1000*60*60*24;
		 return new Date(nextMonthDayOne.getTime()-minusDate);
	},
	isTimeGood:function(timeString){
		var current=new Date();
		return timeString.getTime() > current.getTime() ? true:false;
	},
  getSlaLimit:function(){
    //权限统一调用了服务级别的方法 this.getFlux().actions.YFTSlaActions.setSlaLimit(Util.getSlaLimit());
    var temp = Store.get("PERMISSIONS");
    var temps = base64.base64decode(temp);
    var ttt=  decodeURI(temps);
    var qxStr =  $.parseJSON(ttt);

    var qxLimit = {};
    for(var i=0;i < qxStr.length;i++){
      //服务级别协议
			if(qxStr[i].resourceType == "/operationmanage/sla/slalist"){
        qxLimit.slaList = true;//列表
      }else if(qxStr[i].resourceType == "/operationmanage/sla/slalist/add"){
        qxLimit.slaAdd =true; //添加服务级别协议
      }else if(qxStr[i].resourceType == "/operationmanage/sla/slalist/delete"){
        qxLimit.slaListDelete = true;//删除服务级别协议
      }else if(qxStr[i].resourceType == "/operationmanage/sla/slalist/update"){
        qxLimit.slaListUpdate = true;//修改服务级别协议
      }
      //知识库
      else if(qxStr[i].resourceType == "/operationmanage/repository/repositorylist" ){
        qxLimit.repositoryList =true;//知识清单
      }else if(qxStr[i].resourceType == "/operationmanage/repository/repositorylist/delete" ){
        qxLimit.repositoryDelete =true;//知识清单删除
      }else if(qxStr[i].resourceType == "/operationmanage/repository/repositorylist/add" ){
        qxLimit.repositoryAdd =true;//添加知识
      }else if(qxStr[i].resourceType == "/operationmanage/repository/repositoryapproval" ){
        qxLimit.repositoryApprovalList =true;//审核知识列表
      }else if(qxStr[i].resourceType == "/operationmanage/repository/repositoryapproval/delete" ){
        qxLimit.repositoryApprovalDelete =true;//审核知识列表删除
      }else if(qxStr[i].resourceType == "/operationmanage/repository/repositoryapproval/approval" ){
        qxLimit.repositoryApprovalPassOrNo =true;//审核知识 审核通过/审核不通过
      }else if(qxStr[i].resourceType == "/operationmanage/repository/repositoryapproval/update" ){
        qxLimit.repositoryApprovalUpdate =true;//审核知识 修改
      }
      //发布管理
      else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticesubmitlist" ){
        qxLimit.noticeSubmit =true;//已创建公告列表
      }else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticesubmitlist/add" ){
        qxLimit.noticeAdd =true;//添加公告
      }else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticesubmitlist/delete" ){
        qxLimit.noticeSubmitDelete =true;//删除提交公告
      }else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticesubmitlist/update" ){
        qxLimit.noticeSubmitUpdate =true;//修改提交公告
      }else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticeapproval" ){
        qxLimit.noticeApproval =true;//审核公告
      }else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticeapproval/delete" ){
        qxLimit.noticeApprovalDelete =true;//审核公告删除
      }else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticeapproval/approval" ){
        qxLimit.noticeApprovalPassOrNo =true;//审核公告 通过或不通过
      }else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticeapproval/update" ){
        qxLimit.noticeApprovalUpdate =true;//修改审核公告
      }else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticelist" ){
        qxLimit.noticeRelease =true;//发布公告列表
      }else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticelist/delete"){
				qxLimit.noticeReleaseDelete =true;//发布公告列表
			}else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticelist/update" ){
        qxLimit.noticeReleaseYes =true;//发布公告
      }else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticehistorylist" ){
        qxLimit.noticeHistory =true;//发布历史
      }else if(qxStr[i].resourceType == "/operationmanage/noticemanage/noticehistorylist/delete" ){
        qxLimit.noticeHistoryDelete =true;//发布历史
      }

    }
    return qxLimit;
  }
}

module.exports = Util;
