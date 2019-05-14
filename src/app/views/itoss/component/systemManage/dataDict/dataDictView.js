require('bootstrap');
// require('../../equipmentManage/lib/echarts-all.js');
var React = require('react');
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as dictActions from '../../../../../actions/dataDict_action'

var Store = require('../../../../../server/store.js');
var base64 = require('../../../../../utils/base64.js');
var util = require('../../../../../utils/util.js');

var LeftTree = require('../../monitorTree/dataDictTree.js');
var RightView3 = require('./dataDictRightView3.js');
var RightView6 = require('./dataDictRightView6.js');
var RightView7 = require('./dataDictRightView7.js');
var RightView8 = require('./dataDictRightView8.js');
var RightView10 = require('./dataDictRightView10.js');
var RightView12 = require('./dataDictRightView12.js');
var RightView14 = require('./dataDictRightView14.js');

var dataDict = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     dict:flux.store("DictStore").getState()
    //   }
    // },
    getInitialState: function() {
      return {
        curTabName:""
      };
    },
    propTypes: {
      dispatch: React.PropTypes.func.isRequired
    },
    componentDidUpdate:function(){
      if($('.dataDictRightPages') != null) {
        var height = $(window).height() - 110 - 170 + 'px';
  			$('.dataDictRightPages').css("height",height);
  		};
    },
    componentDidMount:function(){
      var temp = Store.get("PERMISSIONS");
      if(temp&&temp!=null&&temp!=""){
          temp = base64.base64decode(temp);
          temp = decodeURI(temp);
          temp = eval(temp);
      }
      var valid1 = util.hasPermission(temp,"/systemmanage/datadict/edit");
      if(valid1==null || valid1==""){
        // console.log("1111")
        $("#dataDictPage").find(".buttonInfo").find("button").hide();
        this.setState({canDelete:1});
      };
    },
    deleteAssetStatu:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.delete_assetsStatus());
    },
    deleteAssetType:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.delete_assetsType());
    },
    deleteSysFaultType:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.delete_sysFaultType());
    },
    deleteSysFaultSubType:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.delete_sysFaultSubType());
    },
    deleteAreaData:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.delete_areaData());
    },
    deleteTpData:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.delete_tpData());
    },
    deleteWorkOrderStatusData:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.delete_workOrderStatusData());
    },
    testFunction:function(){
      const { dispatch } = this.props;
      var canDelete = this.state.canDelete;
      var data = this.props.rightDictPage;
      var pageId = data.id;
      switch (pageId) {
        case 5:
          return (<RightView3 canDelete={canDelete}
              assetsStatus={this.props.assetsStatus}
              delete_assetsStatus={this.deleteAssetStatu}
              setAssetsStatuId={data => dispatch(dictActions.setAssetsStatuId(data))}
            />);
          break;
        case 8:
          return (<RightView6 canDelete={canDelete}
              assetsType={this.props.assetsType}
              delete_assetsType={this.deleteAssetType}
              set_assetsTypeId={data => dispatch(dictActions.setAssetsTypeId(data))}
            />);
          break;
        case 9:
          return (<RightView7 canDelete={canDelete}
              faultType={this.props.faultType}
              delete_sysFaultType={this.deleteSysFaultType}
              set_sysFaultTypeId={data => dispatch(dictActions.setFaultTypeId(data))}
            />);
          break;
        case 10:
          return (<RightView8 canDelete={canDelete}
              faultSubData={this.props.faultSubData} faultType={this.props.faultType}
              delete_sysFaultSubType={this.deleteSysFaultSubType}
              setFaultSubPid={data => dispatch(dictActions.setFaultSubPid(data))}
              setFaultSubId={data => dispatch(dictActions.setFaultSubId(data))}
            />);
          break;
        case 13:
          return (<RightView10 canDelete={canDelete}
              areaData={this.props.areaData}
              delete_areaData={this.deleteAreaData}
              setAreaId={data => dispatch(dictActions.setAreaId(data))}
            />);
          break;
        case 16:
          return (<RightView12 canDelete={canDelete}
              tpData={this.props.tpData}
              delete_tpData={this.deleteTpData}
              setTpId={data => dispatch(dictActions.setTpId(data))}
            />);
          break;
        case 18:
        return (<RightView14 canDelete={canDelete}
            workOrderStatusData={this.props.workOrderStatusData}
            delete_workOrderStatusData={this.deleteWorkOrderStatusData}
            setWorkOrderStatusId = {data => dispatch(dictActions.setWorkOrderStatusId(data))}
          />);
        break;
      };
    },
    saveBrand:function(){
      var bname = $("#brandNameInput").val();
      if(bname == null || bname == ""){
        setTimeout(function(){
  				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
  				document.getElementById('publicMessageModalcontent').innerHTML = "请输入品牌名称"
  				$('#publicMessageModal').modal('show');
  			},100);
        return false;
      };
      const { dispatch } = this.props;
      dispatch(dictActions.save_brand(bname));
    },
    createNew:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.setBrandId(""));
      $("#brandNameInput").val("");
    },
    saveStatus:function(){
      var sname = $("#statusNameInput").val();
      if(sname == null || sname == ""){
        setTimeout(function(){
  				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
  				document.getElementById('publicMessageModalcontent').innerHTML = "请输入资产状态名称"
  				$('#publicMessageModal').modal('show');
  			},100);
        return false;
      };
      const { dispatch } = this.props;
      dispatch(dictActions.save_assetsStatus(sname));
    },
    createStatus:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.setAssetsStatuId(""));
      $("#statusNameInput").val("");
    },
    saveAssetsType:function(){
      var bname = $("#assetsTypeNameInput").val();
      if(bname == null || bname == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请输入资产类型名称"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var bcode = $("#assetsTypeCodeInput").val();
      if(bcode == null || bcode == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请输入资产类型代号"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var data = {
        CodeName:bcode,TypeName:bname
      };
      const { dispatch } = this.props;
      dispatch(dictActions.save_assetsType(data));
    },
    createAssetsType:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.setAssetsTypeId(""));
      $("#assetsTypeNameInput").val("");
      $("#assetsTypeCodeInput").val("");
    },
    saveSysFaultType:function(){
      var bname = $("#sysFaultTypeNameInput").val();
      if(bname == null || bname == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请输入故障大类名称"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      const { dispatch } = this.props;
      dispatch(dictActions.save_sysFaultType(bname));
    },
    createSysFaultType:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.setFaultTypeId(""));
      $("#sysFaultTypeNameInput").val("");
    },
    saveFaultSubType:function(){
      var pid = this.props.faultSubPid;
      if(pid == null || pid == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请选择故障大类"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var cName = $("#faultSubTypeNameInput").val();
      if(cName == null || cName == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请输入故障细类名称"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      const { dispatch } = this.props;
      dispatch(dictActions.save_sysFaultSubType(cName));
    },
    createFaultSubType:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.setFaultSubPid(""));
      dispatch(dictActions.setFaultSubId(""));
      $("#faultTypeSelect").find(".rw-input").text("");
      $("#faultSubTypeNameInput").val("");
    },
    saveAreaData:function(){
      var areas = this.props.areaData;
      var name = $("#areaNameInput").val();
      if(name == null || name == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请输入区域名称"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var code = $("#areaCodeInput").val();
      if(code == null || code == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请输入区域代号"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var desc = $("#areaDescInput").val();
      var param = [name,code,desc];
      const { dispatch } = this.props;
      dispatch(dictActions.save_areaData(param));
    },
    createAreaData:function(){
      const { dispatch } = this.props;
      dispatch(dictActions.setAreaId(""));
      $("#areaNameInput").val("");
      $("#areaCodeInput").val("");
      $("#areaDescInput").val("");
    },
    saveTpData:function(){
      var tpName = $("#tpNameInput").val();
      var tpId = this.props.tpId;
      var tpData = this.props.tpData;
      if(tpName == null || tpName == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请输入导航名称"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      }else{
        for(var i=0;i<tpData.length;i++){
          var tName = tpData[i].DictDataName;
          var tId = tpData[i].RecId;
          if(tpId != null && tpId != ""){
            if(tpName == tName && tId != tpId){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "导航名称不能重复"
                $('#publicMessageModal').modal('show');
              },100);
              return false;
            };
          }else{
            if(tpName == tName){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "导航名称不能重复"
                $('#publicMessageModal').modal('show');
              },100);
              return false;
            };
          };
        };
      }
      var tpValue = $("#tpValueInput").val();
      if(tpValue == null || tpValue == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请输入导航值"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var tpDesc = $("#tpDescInput").val();
      var data = {
        DictDataName : tpName,
        DictDataValue : tpValue,
        DictNo : "tptjb",
        DictDataDesc : tpDesc
      };
      // console.log(data);
      const { dispatch } = this.props;
      dispatch(dictActions.save_tpData(data));
    },
    createTpData:function(){
      $("#tpNameInput").val("");
      $("#tpValueInput").val("");
      $("#tpDescInput").val("");
      const { dispatch } = this.props;
      dispatch(dictActions.setTpId(""));
    },
    saveWorkOrderData:function(){
      var tpName = $("#tpNameInput").val();
      var dictDataValue = $("#tpValueInput").val();
      var workOrderStatusId = this.props.workOrderStatusId;
      //先查询所有数据确认是否存在
      var workOrderStatusData = this.props.workOrderStatusData;
      if(tpName == null || tpName == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请输入状态名称"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      }else{
        for(var i=0;i<workOrderStatusData.length;i++){
          var tName = workOrderStatusData[i].DictDataName;
          var dValue = workOrderStatusData[i].DictDataValue;
          var tId = workOrderStatusData[i].RecId;
          if(workOrderStatusId != null && workOrderStatusId != ""){
            if(tpName == tName && tId != workOrderStatusId){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "状态名称不能重复"
                $('#publicMessageModal').modal('show');
              },100);
              return false;
            };
            if(dictDataValue == dValue){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "状态值不能重复"
                $('#publicMessageModal').modal('show');
              },100);
              return false;
            };
          }else{
            if(tpName == tName){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "状态名称不能重复"
                $('#publicMessageModal').modal('show');
              },100);
              return false;
            };
            if(dictDataValue == dValue){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "状态值不能重复"
                $('#publicMessageModal').modal('show');
              },100);
              return false;
            };
          };
        };
      }
      var tpValue = $("#tpValueInput").val();
      if(tpValue == null || tpValue == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请输入状态值"
          $('#publicMessageModal').modal('show');
        },100);
        return false;
      };
      var tpDesc = $("#tpDescInput").val();
      var data = {
        DictDataName : tpName,
        DictDataValue : tpValue,
        DictNo : "gdzt",
        DictDataDesc : tpDesc,
        DictNo_Valid:"215D8ECD7B7B439FA5577DD41CA73ABC"
      };
      // console.log(data);
      const { dispatch } = this.props;
      dispatch(dictActions.save_workOrderStatusData(data));
    },
    createWorkOrderData:function(){
      $("#tpNameInput").val("");
      $("#tpValueInput").val("");
      const { dispatch } = this.props;
      dispatch(dictActions.workOrderStatusId(""));
    },
    onClickSave:function(){
      var that = this;
      var data = this.props.rightDictPage;
      var pageId = data.id;
      // console.log(pageId);
      switch (pageId) {
        case 3:
          that.saveBrand();
          break;
        case 5:
          that.saveStatus();
          break;
        case 8:
          that.saveAssetsType();
          break;
        case 9:
          that.saveSysFaultType();
          break;
        case 10:
          that.saveFaultSubType();
          break;
        case 13:
          that.saveAreaData();
          break;
        case 16:
          that.saveTpData();
          break;
        case 18:
          that.saveWorkOrderData();
          break;
      };
    },
    onClickReset:function(){
      var that = this;
      var data = this.props.rightDictPage;
      var pageId = data.id;
      // console.log(pageId);
      switch (pageId) {
        case 3:
          that.createNew();
          break;
        case 5:
          that.createStatus();
          break;
        case 8:
          that.createAssetsType();
          break;
        case 9:
          that.createSysFaultType();
          break;
        case 10:
          that.createFaultSubType();
          break;
        case 13:
          that.createAreaData();
          break;
        case 16:
          that.createTpData();
          break;
        case 18:
          that.createWorkOrderData();
          break;
      };
    },
    getRightPageData:function(param){
      const { dispatch } = this.props;
      switch (param) {
        case 1:
          dispatch(dictActions.get_brandData());
          break;
        case 2:
          dispatch(dictActions.get_assetsStatus());
          break;
        case 3:
          dispatch(dictActions.get_assetsTypes());
          break;
        case 4:
          dispatch(dictActions.get_sysFaultType());
          break;
        case 5:
          dispatch(dictActions.get_sysFaultType());
          dispatch(dictActions.get_sysFaultSubType());
          break;
        case 6:
          dispatch(dictActions.get_areaData());
          break;
        case 7:
          dispatch(dictActions.get_tpData());
          break;
        case 8:
          dispatch(dictActions.get_WorkOrderStatusData());
          break;
      }
    },
    render:function(){
      const { dispatch } = this.props;
      return (
        <div id='dataDictPage' className='overviewDiv'>
          <div className='leftListDiv col-md-2'>
            <LeftTree
              getRightPageData={this.getRightPageData}
              setRightDictPage={data => dispatch(dictActions.setRightDictPage(data))}
            />
          </div>
          <div className='col-md-10' style={{"padding":"0"}}>
            <div className="titleDiv col-md-12">
              <div className="titleLeft">
                数据字典{"-"+this.props.rightDictPage.name}
              </div>
            </div>
            <div className="col-md-12">
              <div className="buttonInfo">
                <p>数据字典的功能：创建、管理组织的数据字典菜单树、系统中各功能下拉选项的属性值或状态选项标识。</p>
                <button type="button" className="btn btn-success" onClick={this.onClickSave}>保存</button>
                <button type="button" className="btn btn-warning" onClick={this.onClickReset}>重置</button>
              </div>
            </div>
            {this.testFunction()}
          </div>
        </div>
      );
    }
});

function mapDataDictState(state) {
  const { faultSubPid,areaData,tpId,tpData,workOrderStatusId,workOrderStatusData,rightDictPage,assetsStatus,assetsType,faultType,faultSubData } = state.dataDictReducer;
  return {
    faultSubPid:faultSubPid,
    areaData:areaData,
    tpId:tpId,
    tpData:tpData,
    workOrderStatusId:workOrderStatusId,
    workOrderStatusData:workOrderStatusData,
    rightDictPage:rightDictPage,
    assetsStatus:assetsStatus,
    assetsType:assetsType,
    faultType:faultType,
    faultSubData:faultSubData
  }
}

export default connect(mapDataDictState)(dataDict)
