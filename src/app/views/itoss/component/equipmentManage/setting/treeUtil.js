'use strict';
var nameArray = [];
var TreeUtil = {
  getCheckedNodes:function(){
    var treeObj = $.fn.zTree.getZTreeObj("monitortree");
    return treeObj.getCheckedNodes(true);
  },
  setTreeNode:function(whoTree,ids){
    var treeObj = $.fn.zTree.getZTreeObj(whoTree);
    for(var x=0; x< ids.length;x++){
      var node = treeObj.getNodeByParam("id",ids[x].ID);
      treeObj.checkNode(node, true, true);
    }
  },
  getMonitorTreeNode:function(){
    var treeObj = $.fn.zTree.getZTreeObj("monitortree");
    var checkNodes = treeObj.getCheckedNodes(true);
    var newNodes = [];
    for(var i = 0;i < checkNodes.length ;i++){
      if(checkNodes[i].status){
        var nodeObj = {
          id:checkNodes[i].id,
          name:checkNodes[i].name,
          status:checkNodes[i].status,
          title:checkNodes[i].title,
          type:checkNodes[i].type,
          alarmconfig:checkNodes[i].alarmconfig,
          alarmname:checkNodes[i].alarmname
        }
        newNodes.push(nodeObj);
      }
    }
    // console.log(newNodes);
    return newNodes;
  },
  monitortreeF:function(){
    var selectTreeNode = TreeUtil.getMonitorTreeNode();
    $('#resourceSetTable').bootstrapTable('refreshOptions', {data: selectTreeNode});
  },
  getString:function(i,objNode){
    // console.log(objNode);
    if(i == 0){
      return nameArray;
    }else{
      var obj = objNode.getParentNode();
      nameArray.push({key:i,value:obj.name});
      return TreeUtil.getString(i-1,obj);
      // return obj.name;
    }

  },
  relyModaltreeF:function(){
    nameArray = [];
    var treeObj = $.fn.zTree.getZTreeObj("relyModaltree");
    var checkNodes = treeObj.getSelectedNodes();

    var newNodes = [];
    // for(var i = 0;i < checkNodes.length ;i++){
    //   if(checkNodes[i].status){
    //     var nodeObj = {
    //       id:checkNodes[i].id,
    //       name:checkNodes[i].name,
    //       status:checkNodes[i].status,
    //       title:checkNodes[i].title,
    //       type:checkNodes[i].type,
    //       alarmconfig:checkNodes[i].alarmconfig,
    //       alarmname:checkNodes[i].alarmname
    //     }
    //     newNodes.push(nodeObj);
    //   }
    // }
    // console.log(checkNodes);
    // console.log(checkNodes[0].getParentNode());
    if(checkNodes[0].frequency){
      var countNumber = parseInt(checkNodes[0].level);
      var hehe = TreeUtil.getString(countNumber,checkNodes[0]);
      // nameArray.push({key:countNumber,value:checkNodes[0].name});
      nameArray.sort(function(x,y){
        return x.key > y.key ? 1:-1;
      });
      // console.log("hehe==");
      // console.log(nameArray);
      var nameStr = "";
      for(var i = 0; i < nameArray.length;i++){
        if(i == (nameArray.length - 1)){
          nameStr += nameArray[i].value+":"+checkNodes[0].name;
        }else{
          nameStr += nameArray[i].value+":";
        }
      }
      // console.log("nameStr===");
      // console.log(nameStr);
      return {selectId:checkNodes[0].id,relyString: nameStr};
    }
    return "";
  },
  myTest3:function(){
    alert(3);
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
  rSetting:function(treeName){
    var thisF;
    var setting = {};
    if(treeName == "monitortree"){
      setting = {
        check: {enable: true},
        data: {simpleData: {enable: true}},
        callback: {
          beforeClick: function(treeId, treeNode) {
            TreeUtil.onClickChild(treeNode);
            TreeUtil.monitortreeF();
          },
          onCheck: this.monitortreeF
        }
      }
    }else if(treeName == "relyModaltree"){
      setting = {
        check: {enable: false},
        data: {simpleData: {enable: true}},
        callback: {
          beforeClick: function(treeId, treeNode) {
            TreeUtil.onClickChild(treeNode);
          },
          onClick: this.relyModaltreeF
        }
      }
    }
    // var setting = {
    //   check: {enable: treeName == relyModaltree ? false:true},
    //   data: {simpleData: {enable: true}},
    //   callback: {
    //     onCheck: thisF
    //   }
    // }
    return setting;
  },
  treeConfig:function(treeName,treeObj){
    $(document).ready(function(){
      $.fn.zTree.init($("#"+treeName), this.rSetting(treeName), treeObj);
    }.bind(this));
  },
}

module.exports = TreeUtil;
