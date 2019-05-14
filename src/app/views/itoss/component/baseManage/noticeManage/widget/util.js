'use strict';

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

}

module.exports = Util;
