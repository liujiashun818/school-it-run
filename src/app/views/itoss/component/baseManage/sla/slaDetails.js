/**
* 张锌楠
* 服务级别详情
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var History = ReactRouter.History;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

import { connect } from 'react-redux';
import { getSlaList, slaUpdate, getServiceBigType } from '../../../../../actions/sla_action';

var ReactWidgets = require('react-widgets');
var Util = require('../util');
var Widget = require('./widget/Widget');

$(window).resize(function(){
  $.panelHeight(".panelBasic",90);
});

var SlaDetails = React.createClass({
    mixins: [History],
    getInitialState: function() {
      return {
        isDisabled:true,
        serviceCatalogId: ""
      };
    },

    componentWillMount:function(){
      var slaObj = this.props.getSelectRowObj;
      if(typeof(slaObj.serviceLevelAgreementRecId) == "undefined"){
        this.history.pushState(null,'baseManage/slaList');
        return;
      }
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",90);
      const { dispatch } = this.props;
      dispatch(getServiceBigType());
      $("#slaName,#slaProvider,#slaLongType,#slaResponseTimePrompt,#slaSolveTimePrompt,#slaTimeoutChargesPrompt").mouseover(function(){
          $(this).find(".alert-block").hide();
      });
    },

    _subSave:function(){
      if(this.state.isDisabled){
        this.setState({isDisabled:false});
      }else{
        var slaObj = this.props.getSelectRowObj;
        var flag = true;
        if($("#slaName").find("input").val().trim() == ""){
          $("#slaName").find(".alert-block").show();
          flag = false;
        }
        if($("#slaProvider").find("input").val().trim() == ""){
          $("#slaProvider").find(".alert-block").show();
          flag = false;
        }

        var slaLongTypeString = $('#slaLongType').find('.rw-widget').find('.rw-input').text();
        var  serviceCatalogId = this.getServiceBigTypeId(slaLongTypeString);
        if(slaLongTypeString == "" || serviceCatalogId == ""){
          $("#slaLongType").find(".alert-block").show();
          flag = false;
        }
        if($('#slaResponseTime').val().trim() ==""){
          $("#slaResponseTimePrompt").find(".alert-block").show();
          flag = false;
        }
        if($('#slaSolveTime').val().trim() ==""){
          $("#slaSolveTimePrompt").find(".alert-block").show();
          flag = false;
        }
        if($('#slaTimeoutCharges').val().trim() ==""){
          $("#slaTimeoutChargesPrompt").find(".alert-block").show();
          flag = false;
        }
        if(flag){
          var slaName = $("#slaName").find("input").val();
          var slaProvider = $("#slaProvider").find("input").val();
          var slaServiceCatalogId = serviceCatalogId;
          var slaState = $('#slaState').find('.rw-input').text();
          var slaResponseTime =  $('#slaResponseTime').val();
          var slaSolveTime =  $('#slaSolveTime').val();
          var slaTimeoutCharges=  $('#slaTimeoutCharges').val();
          var slaCreatePerson = $('#slaCreatePerson').val();
          // var slaCreateTime = $("#slaCreateTime").find('input').val();
          // slaCreateTime = new Date(Date.parse(slaCreateTime.replace(/-/,"/")));
          var dataObj={
            Title:slaName,
            ServiceContent:slaProvider,
            ServiceCatalog:slaServiceCatalogId,
            Status:slaState,
            ResponseTime:slaResponseTime,
            SolutionTime:slaSolveTime,
            TotalCount:slaTimeoutCharges
          };
          var needUpdate = {
            RecId:slaObj.serviceLevelAgreementRecId,
            updateObj:dataObj
          };
          const { dispatch } = this.props;
          dispatch(slaUpdate(needUpdate));
          this.setState({isDisabled:true});
        }
      }
    },
    checkNumber:function(e){
      if(e.currentTarget.id =="slaResponseTime"){
        Util._testing('#slaResponseTime');
      }else if(e.currentTarget.id =="slaSolveTime"){
        Util._testing('#slaSolveTime');
      }else if(e.currentTarget.id =="slaTimeoutCharges"){
        Util._testing2('#slaTimeoutCharges');
      }
    },
    getServiceBigTypeArray:function(){
      var newFaultTypes = [];
      if(this.props.getServiceBigTypeData){
        if(this.props.getServiceBigTypeData.length > 0){
          for(var i=0;i<this.props.getServiceBigTypeData.length;i++){
            if(this.props.getServiceBigTypeData[i].id != "0"){
              newFaultTypes.push(this.props.getServiceBigTypeData[i]);
            }
          }
        }
      }
      return newFaultTypes;
    },
    getServiceBigTypeId:function(str){
      var mId = "";
      var mArray = this.getServiceBigTypeArray();
      for(let i=0;i < mArray.length;i++){
        if(str == mArray[i].name){
          mId = mArray[i].id;
          break;
        }
      }
      return mId;
    },
    render:function(){
      var slaObj =  this.props.getSelectRowObj;
      var quanxianLimit = Util.getSlaLimit();
      var newFaultTypes = this.getServiceBigTypeArray();
      return(
            <div className='repositoryOverview'>

              <div className="overviewDesViewDiv panelBasic">

                  <Widget.RepositoryTitle title="服务级别详情" returnUrl="#/baseManage/slaList" returnUrlName="返回服务级别列表"/>

                  <div className="staticDiv col-md-12 " id="operationmanageSla">
                      <div className="staticLeftDiv">
                          <div className='repositoryAddHead'>
                            <span>服务级别协议的功能：新建和查看组织内服务级别协议列表，并编辑工单的响应时间、解决时间、超过时间时、扣费标准等。</span>
                          </div>
                          <div className='btnGroupDiv2'>
                              { quanxianLimit.slaListUpdate ? <button type="button" className="repositorySubmit yunweiHeight" onClick={this._subSave}>{this.state.isDisabled ? "编辑":"保存"}</button> :""}
                          </div>
                      </div>
                  </div>

                  <div className="yunweiTable slaTableStyle">
                    <div>&nbsp;</div>
                    <table className="sla-table-basic">
                      <tbody>
                        <tr>
                          <td rowSpan="6" className="slaTableFontBold slaTableFontCenter">服务协议</td>
                          <td className="slaTitleStyle">&nbsp;&nbsp;服务协议名称<span className="slaPan"> *</span></td>
                            <td colSpan="4" id="slaName" className="slaTableFontBold table-basic-td-input">
                              <div className="alert-block">服务协议名称不能为空</div>
                              <input type="text" defaultValue={slaObj.serviceLevelAgreementName} disabled={this.state.isDisabled} disabled={true}/>
                            </td>
                        </tr>
                        <tr>
                          <td className="slaTitleStyle">&nbsp;&nbsp;服务提供商<span className="slaPan"> *</span></td>
                          <td id="slaProvider" className="slaTableFontBold table-basic-td-input">
                            <div className="alert-block">服务提供商不能为空</div>
                            <input type="text" defaultValue={slaObj.serviceProvider} disabled={this.state.isDisabled}/>
                          </td>
                          <td className="slaTitleStyle">&nbsp;&nbsp;服务大类<span className="slaPan"> *</span></td>
                          <td id="slaLongType" className="slaTableFontBold table-basic-td-input">
                            <div className="alert-block">服务大类不能为空</div>
                            <ReactWidgets.DropdownList data={newFaultTypes} textField='name' defaultValue={slaObj.serviceCatalogName} disabled={this.state.isDisabled}/>
                          </td>
                        </tr>
                        <tr>
                          <td className="slaTitleStyle">&nbsp;&nbsp;状态</td>
                          <td className="slaTableFontBold"><ReactWidgets.DropdownList data={["启用","禁用"]} textField='name' id="slaState" defaultValue={slaObj.status} disabled={this.state.isDisabled}/></td>
                          <td className="slaTitleStyle">&nbsp;&nbsp;响应时间<span className="slaPan"> *</span></td>
                          <td id="slaResponseTimePrompt" className="slaTableFontBold table-basic-td-input">
                            <div className="alert-block">响应时间不能为空</div>
                            <input className="sla-input-width" type="number" id="slaResponseTime" min="1" max="9999" defaultValue={slaObj.responseTime} disabled={this.state.isDisabled} onChange={this.checkNumber}/>
                            <div className="salNowrap">小时</div>
                          </td>
                        </tr>
                        <tr>
                          <td className="slaTitleStyle">&nbsp;&nbsp;解决时间<span className="slaPan"> *</span></td>
                          <td id="slaSolveTimePrompt" className="slaTableFontBold table-basic-td-input">
                            <div className="alert-block">解决时间不能为空</div>
                            <input className="sla-input-width" type="number" id="slaSolveTime" min="1" max="9999" defaultValue={slaObj.solveTime} disabled={this.state.isDisabled} onChange={this.checkNumber}/>
                            <div className="salNowrap">小时</div>
                          </td>
                          <td className="slaTitleStyle">&nbsp;&nbsp;超时收费<span className="slaPan"> *</span></td>
                          <td id="slaTimeoutChargesPrompt" className="slaTableFontBold table-basic-td-input">
                            <div className="alert-block">超时收费不能为空</div>
                            <input className="sla-input-width" type="number" id="slaTimeoutCharges" min="0" max="9999" defaultValue={slaObj.timeoutCharges} disabled={this.state.isDisabled} onChange={this.checkNumber}/>
                            <div className="salNowrap">元/小时</div>
                          </td>
                        </tr>
                        <tr>
                          <td className="slaTitleStyle">&nbsp;&nbsp;创建人</td>
                          <td className="slaTableFontBold yunweiBorder"><input type="text" id="slaCreatePerson" defaultValue={slaObj.createdby} disabled={true}/></td>
                          <td className="slaTitleStyle">&nbsp;&nbsp;创建时间</td>
                          <td className="slaTableFontBold"><ReactWidgets.DateTimePicker format={"yyyy-MM-dd HH:mm:ss"} id="slaCreateTime" defaultValue={new Date(Date.parse(slaObj.createddatetime.replace(/-/,"/")))} disabled={true} /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

              </div>

            </div>
      );
    }
});
function mapSlaListState(state) {
  const { getSlaListData ,getSelectRowObj,getServiceBigTypeData } = state.slaReducer

  return {
    getSlaListData:getSlaListData,
    getSelectRowObj:getSelectRowObj,
    getServiceBigTypeData:getServiceBigTypeData
  }
}

export default connect(mapSlaListState)(SlaDetails);
