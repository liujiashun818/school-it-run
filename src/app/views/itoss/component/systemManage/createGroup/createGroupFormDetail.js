require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var ReactWidgets = require('react-widgets');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var RoleTree = require('../../monitorTree/rolesTree.js');
var Store = require('../../../../../server/store.js');
var base64 = require('../../../../../utils/base64.js');
var CommonTree = require('../../monitorTree/commonTree.js');

var createGroupDetail = React.createClass({
  mixins: [History],
  // getStateFromFlux: function() {
  //   var flux = this.getFlux();
  //   return {
  //     itoss:flux.store("YFTSystemStore").getState(),
  //     lis:[]
  //   }
  // },
  getInitialState:function(){
      return({
        lis:[]
      })
  },
  componentDidMount:function(){
    var isCanAdd = false;
    var isCanUpdate = false;
    var isCanDelete = false;
    var permissions = "";
    if(permissions == null || permissions == ""){
      var temp = Store.get("PERMISSIONS");
      if(temp!=null&&temp!=""){
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var ttemp = eval(temp);
        permissions = ttemp;
      };
    };
    for(var i=0;i<permissions.length;i++){
      var resourceType = permissions[i].resourceType;
      if(resourceType == "/systemmanage/groupmanage/add"){
        isCanAdd = true;
      };
      if(resourceType == "/systemmanage/groupmanage/delete"){
        isCanDelete = true;
      };
      if(resourceType == "/systemmanage/groupmanage/update"){
        isCanUpdate = true;
      };
    } ;
    if(!isCanAdd){
      $($(".groupTreeRightMenu").find("ul").find("li")[0]).css('display',"none");
    };
    if(!isCanUpdate){
      $($(".groupTreeRightMenu").find("ul").find("li")[1]).css('display',"none");
    };
    if(!isCanDelete){
      $($(".groupTreeRightMenu").find("ul").find("li")[2]).css('display',"none");
      $($(".systemGroupButtonGroup1").find(".buttonInfo").find("button")[1]).css('display',"none");
      $($(".systemGroupButtonGroup1").find(".buttonInfo").find("button")[2]).css('display',"none");
    };
  },
  setParentGroup:function(e){
    var code = e.value;
    this.props.set_parentCode(code);
    $("#createGroupParentCode").find(".rw-input").text(e.name);
  },
  setGisMapTp:function(e){
    var name = e.DictDataName;
    var value = e.DictDataValue;
    this.props.set_sysMapDataValue(value);
    $("#createGroupMapTp").find(".rw-input").text(name);
  },
  componentDidUpdate:function(){
    var isUpdate = this.props.isUpdate;
    if(isUpdate){
      return false;
    };
    var that = this;
    var info = this.props.createInfo;
    var infoGroup = this.props.groups;
    var mapData = this.props.sysMapData;
    var curData = this.props.curGroupData;
    var gname = localStorage.getItem("GROUP_NAME");
    var roles = [];
    if(info!=null && info!=""){
      roles = info.roles;
    };
    var code,name,domain,desc,account,pwd,outdomain,maplv;
    var parent = "";
    var maplvval = "";
    var role=[];
    if(curData!=null && curData!=""){
      // console.log(curData);
      code = curData.organizationCode;
      name = curData.organizationName;
      domain = curData.organizationDomain;
      outdomain = curData.in_host;
      parent = curData.parentOrganizationName;
      maplv = curData.maplv;
      for(var i=0;i<mapData.length;i++){
        var maplvname = mapData[i].DictDataName;
        var maplvValue = mapData[i].DictDataValue;
        if(maplv == maplvValue){
          maplvval = maplvname;
          break;
        };
      }
      if(parent==null || parent==""){
        if(gname == "Administrators"){
          parent = "根目录";
        };
      };
      desc = curData.organizationDesc;
      account = curData.organizationAccounts;
      pwd = curData.organizationPwd;
      role = curData.role;
      for(var i=0;i<roles.length;i++){
        var mark = false;
        for(var j=0;j<role.length;j++){
          if(role[j]==roles[i]){
            mark = true;
            break;
          };
        };
      };
    }else{
      // console.log(this.state.itoss.parentCode)
      var infoGroup = this.props.groups;
      var pcode = this.props.parentCode;
      if(pcode != null && pcode != ""){
        for(var i=0;i<infoGroup.length;i++){
          var markcode = infoGroup[i].id;
          if(pcode == markcode){
            parent = infoGroup[i].name;
          };
        };
      }else{
        if(gname == "Administrators"){
          parent = "根目录";
        };
      };
    };
    $("#createGroupCode").val(code);
    $("#createGroupName").val(name);
    $("#createGroupDomain").val(domain);
    $("#createGroupDomainOut").val(outdomain);
    if(pcode==null || pcode==""){
      $("#createGroupParentCode").find(".rw-input").text(parent);
    };
    $("#createGroupDesc").val(desc);
    $("#createGroupUser").val(account);
    $("#createGroupPwd").val(pwd);
    $("#createGroupMapTp").find(".rw-input").text(maplvval);
  },
  render:function(){
    var that = this;
    // var isChange = this.state.isChange;
    // console.log(isChange);
    var info = this.props.createInfo;
    var curData = this.props.curGroupData;
    var gname = localStorage.getItem("GROUP_NAME");
    var groups = [];
    var roles = [];
    var parent = "";
    if(info!=null && info!="" && curData!="" && curData !=null){
      var infoGroup = this.props.groups;
      if(gname == "Administrators"){
        groups.push({name:"根目录",value:""});
      };
      for(var i=0;i<infoGroup.length;i++){
        var cname = infoGroup[i].name;
        var mname = curData.organizationName;
        if(cname != mname){
          var gdata = {name:cname,value:infoGroup[i].id};
          groups.push(gdata);
        };
      };
      roles = info.roles;
    };
    var canUse = false;
    if(groups.length<=0){
      canUse = true;
    }else{
      canUse = false;
    };
    var isUpdate = this.props.isUpdate;
    if(!isUpdate && (curData==null || curData=="")){
      var infoGroup = that.props.groups;
      var pcode = that.props.parentCode;
      if(pcode != null && pcode != ""){
        for(var i=0;i<infoGroup.length;i++){
          var markcode = infoGroup[i].id;
          if(pcode == markcode){
            parent = infoGroup[i].name;
          };
        };
      }else{
        if(gname == "Administrators"){
          parent = "根目录";
        };
      };
    };

    return (
      <div className="createGroupDetailDiv">
        <table>
          <tbody>
            <tr>
              <th rowSpan="3" style={{"width":"13%"}}>组织机构</th>
              <td className="paddingleft10" style={{"width":"11%"}}>组织编码<span style={{"color":"#FF0000"}}>*</span></td>
              <td style={{"width":"18%"}}><input type="text" id="createGroupCode"/></td>
              <td className="paddingleft10" style={{"width":"11%"}}>组织名称<span style={{"color":"#FF0000"}}>*</span></td>
              <td style={{"width":"18%"}}><input type="text" id="createGroupName"/></td>
              <td className="paddingleft10" style={{"width":"11%"}}>父组织编码</td>
              <td style={{"width":"18%"}}><ReactWidgets.DropdownList data={groups} textField='name' onSelect={this.setParentGroup} id="createGroupParentCode" disabled={canUse}/></td>
            </tr>
            <tr>
              <td className="paddingleft10">内网域名</td>
              <td><input type="text" id="createGroupDomain" placeholder="请填写IP加端口或域名，不用写http"/></td>
              <td className="paddingleft10">外网域名</td>
              <td><input type="text" id="createGroupDomainOut" placeholder="请填写IP加端口或域名，不用写http"/></td>
              <td className="paddingleft10">Gis地图层次</td>
              <td><ReactWidgets.DropdownList data={this.props.sysMapData} textField='DictDataName' onSelect={this.setGisMapTp} id="createGroupMapTp"/></td>
            </tr>
            <tr>
              <td className="subTitle">经纬度</td>
              <td colSpan="5"><input type="text" id="createGroupDesc" placeholder="请按此格式书写：89.158(经度),35.568(纬度) 逗号为英文逗号，括号不要写。"/></td>
            </tr>
            <tr>
              <th rowSpan="3">组织管理</th>
              <td className="paddingleft10">管理账号</td>
              <td colSpan="2"><input type="text" id="createGroupUser"/></td>
              <td className="paddingleft10">管理密码</td>
              <td colSpan="2"><input type="password" id="createGroupPwd"/></td>
            </tr>
            <tr>
              <td className="subTitle">包含角色<span style={{"color":"#FF0000"}}>*</span></td>
              <td className="subTitleSub" colSpan="5"></td>
            </tr>
            <tr>
              <td colSpan="6">
                <RoleTree
                  init_roleTree={this.props.init_roleTree} get_createInfo={this.props.get_createInfo}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = createGroupDetail;
