require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var Store = require('../../../../../server/store');
var base64 = require('../../../../../utils/base64.js');

var groupButtons = React.createClass({
  mixins: [History],
  // getStateFromFlux: function() {
  //   var flux = this.getFlux();
  //   return {
  //     itoss:flux.store("YFTSystemStore").getState()
  //   }
  // },
  getInitialState:function(){
    return ({
      isAllDelete:0
    });
  },
  createGroup:function(){
    var data={};
    var curData = this.props.curGroupData;
    if(curData!=null && curData!=''){
      var re = /^[1-9]+[0-9]*]*$/;
      var info = this.props.createInfo;
      var pcodeMark = this.props.pcodeMark;
      var pcode = this.props.parentCode;
      var maplv = this.props.sysMapDataValue;
      if(maplv!=null && maplv!=""){
        data.MAPLV = "'"+maplv+"'";
      }else {
        maplv = curData.maplv;
        data.MAPLV = "'"+maplv+"'";
      };
      if(pcodeMark){
        data.PARENTORGANIZATION = "'"+pcode+"'";
      }else{
        pcode = curData.parentOrganization;
        data.PARENTORGANIZATION = "'"+pcode+"'";
      }
      var groups = this.props.groups;
      var ccode = curData.organizationCode;
      var cname = curData.organizationName;
      var isParentHasDelete = false;
      var code = $("#createGroupCode").val();
      if(ccode != code){
        if(code!=null&&code!=""){
          if(!re.test(code)){
            setTimeout(function(){
              document.getElementById('publicMessageModelTitle').innerHTML = '提示';
              document.getElementById('publicMessageModalcontent').innerHTML = '组织编码请输入正整数';
              $('#publicMessageModal').modal('show');
            },100);
            return false;
          }else{
            for(var i=0;i<groups.length;i++){
              var gc = groups[i].id;
              if(code == gc){
                setTimeout(function(){
                  document.getElementById('publicMessageModelTitle').innerHTML = '提示';
                  document.getElementById('publicMessageModalcontent').innerHTML = '该组织编码已存在，请重新输入';
                  $('#publicMessageModal').modal('show');
                },100);
                return false;
              };
              if(pcode == gc){
                isParentHasDelete = true;
              };
            };
            if(isParentHasDelete){
              var ind = code.indexOf(pcode);
              // console.log(ind,pcode);
              if(ind!=0){
                setTimeout(function(){
                  document.getElementById('publicMessageModelTitle').innerHTML = '提示';
                  document.getElementById('publicMessageModalcontent').innerHTML = '组织编码请用父组织的组织编码开头：'+pcode+'*';
                  $('#publicMessageModal').modal('show');
                },100);
                return false;
              };
            }else{
              pcode = "";
              data.PARENTORGANIZATION = "'"+pcode+"'";
            };
            data.ORGANIZATIONCODE = "'"+code+"'";
          };
        }else{
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = '请填写组织编码';
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        };
      }else{
        var ind = code.indexOf(pcode);
        // console.log(ind);
        if(ind!=0){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = '组织编码请用父组织的组织编码开头：'+pcode+'*';
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        };
        data.ORGANIZATIONCODE = "'"+ccode+"'";
      };
      var name = $("#createGroupName").val();
      if(cname != name){
        if(name!=null&&name!=""){
          for(var i=0;i<groups.length;i++){
            var gn = groups[i].name;
            if(name == gn){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = '提示';
                document.getElementById('publicMessageModalcontent').innerHTML = '该组织名称已存在，请重新输入';
                $('#publicMessageModal').modal('show');
              },100);
              return false;
            };
          };
          data.ORGANIZATIONNAME = "'"+name+"'";
        };
      }else{
        data.ORGANIZATIONNAME = "'"+cname+"'";
      };
      var domain = $("#createGroupDomain").val();
      if(domain!=null&&domain!=""){
        var RegUrl = new RegExp();
        RegUrl.compile("^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{0,5})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$");
        if (!domain.match(RegUrl)){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = '请输入正确的域名（域名加端口）';
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        }else{
          data.ORGANIZATIONDOMAIN = "'"+domain+"'";
        };
      };
      var outdomain = $("#createGroupDomainOut").val();
      if(outdomain!=null&&outdomain!=""){
        var RegUrl = new RegExp();
        RegUrl.compile("^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{0,5})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$");
        if (!outdomain.match(RegUrl)){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = '请输入正确的域名（域名加端口）';
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        }else{
          data.IN_HOST = "'"+outdomain+"'";
        };
      };
      var res = /^((0|[1-9]\d|1[0-7]\d)(\.\d{1,20})?|180)(\,)((0|[1-8]\d)(\.\d{1,20})?|90)$/;
      var desc = $("#createGroupDesc").val();
      if(desc!=null && desc!=""){
        if(!res.test(desc)){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = '不匹配，请先输入0-180的经度，再以英文逗号隔开，再输入0-90的纬度。';
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        };
      };
      data.ORGANIZATIONDES = "'"+desc+"'";
      var man = $("#createGroupUser").val();
      if(man!=null&&man!=""){
        data.ORGANIZATIONACCOUNTS = "'"+man+"'";
      };
      var pwd = $("#createGroupPwd").val();
      if(pwd!=null&&pwd!=""){
        data.ORGANIZATIONPWD = "'"+pwd+"'";
      };
      var roles = [];
      var roleTree = this.props.roleTree;
      var nodes = roleTree.getChecked();
      for(var i=0;i<nodes.length;i++){
        var rolename = nodes[i].name;
        roles.push(rolename);
      };
      if(roles.length<=0){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = '请选择组织包含角色。';
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      }else{
        data.ROLES = "'"+roles+"'";
      };

      var relid = curData.relid;
      var said = curData.safetyGroupId;
      var rid = curData.organizationRecId;
      data.SAFETYGROUPID = "'"+said+"'";
      data.RELID = "'"+relid+"'";
      data.ORGANIZATIONRECID = "'"+rid+"'";
      $("#createGroupCode").attr("disabled",false);
      $(".systemGroupButtonGroup1").find(".titleLeft").find(".extraText").text("");
      // console.log(data);
    }else{
      var pcode = this.props.parentCode;
      var maplv = this.props.sysMapDataValue;
      var gname = localStorage.getItem("GROUP_NAME");
      if(gname != "Administrators"){
        if(pcode == null || pcode == "" || pcode == 0){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = '请选择父组织';
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        };
      };
      // console.log(pcode)
      var re = /^[1-9]+[0-9]*]*$/;
      var info = this.props.createInfo;
      var groups = this.props.groups;
      var code = $("#createGroupCode").val();
      if(code==null||code==""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = '请填写组织编码';
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      }else{
        if(!re.test(code)){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = '组织编码请输入正整数';
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        }else{
          for(var i=0;i<groups.length;i++){
            var gc = groups[i].id;
            if(code == gc){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = '提示';
                document.getElementById('publicMessageModalcontent').innerHTML = '该组织编码已存在，请重新输入';
                $('#publicMessageModal').modal('show');
              },100);
              return false;
            };
          };
          var ind = code.indexOf(pcode);
          // console.log(ind);
          if(ind!=0){
            setTimeout(function(){
              document.getElementById('publicMessageModelTitle').innerHTML = '提示';
              document.getElementById('publicMessageModalcontent').innerHTML = "组织编码请用父组织的组织编码开头："+pcode+"*";
              $('#publicMessageModal').modal('show');
            },100);
            return false;
          };
        };
      }
      var name = $("#createGroupName").val();
      if(name==null||name==""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = "请填写组织名称";
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      }else{
        for(var i=0;i<groups.length;i++){
          var gn = groups[i].name;
          if(name == gn){
            setTimeout(function(){
              document.getElementById('publicMessageModelTitle').innerHTML = '提示';
              document.getElementById('publicMessageModalcontent').innerHTML = "该组织名称已存在，请重新输入";
              $('#publicMessageModal').modal('show');
            },100);
            return false;
          };
        };
      };
      var domain = $("#createGroupDomain").val();
      if(domain != null && domain != ""){
        var RegUrl = new RegExp();
        RegUrl.compile("^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{0,5})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$");
        if (!domain.match(RegUrl)){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = "请输入正确的域名（域名加端口）";
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        };
      };
      var outdomain = $("#createGroupDomainOut").val();
      if(outdomain != null && outdomain != ""){
        var RegUrl = new RegExp();
        RegUrl.compile("^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{0,5})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$");
        if (!outdomain.match(RegUrl)){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = "请输入正确的域名（域名加端口）";
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        };
      };
      var res = /^((0|[1-9]\d|1[0-7]\d)(\.\d{1,20})?|180)(\,)((0|[1-8]\d)(\.\d{1,20})?|90)$/;
      var desc = $("#createGroupDesc").val();
      if(desc!=null && desc!=""){
        if(!res.test(desc)){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = '提示';
            document.getElementById('publicMessageModalcontent').innerHTML = "不匹配，请先输入0-180的经度，再以英文逗号隔开，再输入0-90的纬度。";
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        };
      };
      var man = $("#createGroupUser").val();
      var pwd = $("#createGroupPwd").val();
      var roles = [];
      var roleTree = this.props.roleTree;
      var nodes = roleTree.getChecked();
      for(var i=0;i<nodes.length;i++){
        var rolename = nodes[i].name;
        roles.push(rolename);
      };
      if(roles.length<=0){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = '提示';
          document.getElementById('publicMessageModalcontent').innerHTML = "请选择组织包含角色";
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      data = {
        ORGANIZATIONNAME:"'"+name+"'",
        ORGANIZATIONDES:"'"+desc+"'",
        ORGANIZATIONCODE:"'"+code+"'",
        PARENTORGANIZATION:"'"+pcode+"'",
        ORGANIZATIONDOMAIN:"'"+domain+"'",
        ORGANIZATIONACCOUNTS:"'"+man+"'",
        ORGANIZATIONPWD:"'"+pwd+"'",
        ROLES:"'"+roles+"'",
        IN_HOST:"'"+outdomain+"'",
        MAPLV:"'"+maplv+"'"
      };
    };
    this.props.save_createGroup(data);
  },
  onClickCircle:function(e){
    var claz = $(e.target).attr("class");
    if(claz==null||claz==""){
      claz = $(e.target).find("i").attr("class");
    };
  },
  onDeleteConfirm:function(){
    var that = this;
    var curData = this.props.curGroupData;
    var curTree = this.props.curTree;
    curTree.setState({curNode:""});
    var rid = curData.organizationRecId;
    var sid = curData.safetyGroupId;
    var rname = curData.organizationName;
    var code = curData.organizationCode;
    var param = {rid:rid,sid:sid,rname:rname,code:code};
    var isDeleteAll = this.state.isAllDelete;
    if(isDeleteAll>0){
      that.props.delete_groupAll(param);
    }else{
      that.props.delete_groupById(param);
    }
    $("#deleteAlertModal").modal('hide');
    $(".systemGroupButtonGroup1").find(".titleLeft").find(".extraText").text("");
  },
  onCancelDelete:function(){
    $("#deleteAlertModal").modal('hide');
  },
  onCancelDelete2:function(){
    $("#deleteAlertModal2").modal('hide');
  },
  deleteGroup:function(){
    var curData = this.props.curGroupData;
    if(curData!=null&&curData!=""){
      $("#deleteAlertModal").modal('show');
    }else{
      $("#deleteAlertModal2").modal('show');
    };
    this.setState({isAllDelete:0});
  },
  deleteGroup2:function(){
    var curData = this.props.curGroupData;
    if(curData!=null&&curData!=""){
      $("#deleteAlertModal").modal('show');
    }else{
      $("#deleteAlertModal2").modal('show');
    };
    this.setState({isAllDelete:1});
  },
  render:function(){
    var isCanCreate = false;
    var isCanUpdate = false;
    var curData = this.props.curGroupData;
    var temp = Store.get("PERMISSIONS");
    var permissions = "";
    if(temp!=null&&temp!=""){
      temp = base64.base64decode(temp);
      temp = decodeURI(temp);
      var ttemp = eval(temp);
      permissions = ttemp;
    };
    for(var i=0;i<permissions.length;i++){
      var resourceType = permissions[i].resourceType;
      if(resourceType == "/systemmanage/groupmanage/add"){
        isCanCreate = true;
      };
      if(resourceType == "/systemmanage/groupmanage/update"){
        isCanUpdate = true;
      };
    };
    if(isCanCreate){
      if(isCanUpdate){
        $($(".systemGroupButtonGroup1").find(".buttonInfo").find("button")[0]).show();
      }else{
        if(curData==null||curData==""){
          $($(".systemGroupButtonGroup1").find(".buttonInfo").find("button")[0]).show();
        }else{
          $($(".systemGroupButtonGroup1").find(".buttonInfo").find("button")[0]).css('display',"none");
        };
      };
    }else{
      if(isCanUpdate){
        if(curData==null||curData==""){
          $($(".systemGroupButtonGroup1").find(".buttonInfo").find("button")[0]).css('display',"none");
        }else{
          $($(".systemGroupButtonGroup1").find(".buttonInfo").find("button")[0]).show();
        };
      }else{
        $($(".systemGroupButtonGroup1").find(".buttonInfo").find("button")[0]).css('display',"none");
      };
    };
    return (
      <div className="operationButtons">
        <div className="modal fade" id="deleteAlertModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">删除组织机构</h4>
              </div>
              <div className="modal-body">
                删除组织机构将导致组织机构下的用户无法使用，有关的工单和资产将会丢失，你确定要删除吗？
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.onCancelDelete}>取消</button>
                <button type="button" className="btn btn-primary" onClick={this.onDeleteConfirm}>确定</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="deleteAlertModal2" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">删除组织机构</h4>
              </div>
              <div className="modal-body">
                请选择要删除的节点
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.onCancelDelete2}>取消</button>
              </div>
            </div>
          </div>
        </div>
        <div className="systemGroupButtonGroup1 oBGroup">
          <div className="titleDiv col-md-12">
            <div className="titleLeft">
                系统设置-组织机构管理<span className="extraText"></span>
            </div>
            <div className="titleRight">
              <a onClick={this.onClickCircle}><i className="fa fa-cog"></i></a>
            </div>
          </div>
          <div className="col-md-12">
            <div className="buttonInfo">
              <p>组织机构的功能：创建组织机构，编辑修改删除对组织架构等。并可右键操作选择左侧组织架构树上节点实现对该节点进行增改删除功能。或者仅删除将删除组织本身，删除所有将删除组织本身及所有的子组。</p>
              <button onClick={this.createGroup}>保存</button>
              <button onClick={this.deleteGroup} className="toPageButton">仅删除</button>
              <button onClick={this.deleteGroup2} className="deleteButton">删除所有</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = groupButtons;
