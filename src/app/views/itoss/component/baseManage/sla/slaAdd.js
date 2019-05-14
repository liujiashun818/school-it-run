/**
* 张锌楠
* 新建服务级别协议
*/
require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
import { connect } from 'react-redux';
import { getSlaList,getServiceBigType,addSla } from '../../../../../actions/sla_action';

var Util = require('../util');
var Widget = require('./widget/Widget');

$(window).resize(function(){
  $.panelHeight(".panelBasic",90);
});

var SlaAdd = React.createClass({
    getInitialState: function() {
      return {
        serviceCatalogId: ""
      };
    },
    componentWillMount:function(){
      const { dispatch } = this.props;
      if(this.props.getSlaListData.length <= 0){
        dispatch(getSlaList({}));
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
      var flag = true;
      var slaNameString = $("#slaName").find("input").val().trim();
      if(slaNameString == ""){
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
      var allServerNameArray = this.props.getSlaListData;
      if(allServerNameArray && allServerNameArray.length > 0){
        for(var i = 0; i< allServerNameArray.length;i++){
          if(slaNameString == allServerNameArray[i].serviceLevelAgreementName){
            flag = false;
            $.showPublicDialog('提示','服务协议名称已存在');
            return;
          }
        }
      }
      if(flag){
        var slaName = slaNameString;
        var slaProvider = $("#slaProvider").find("input").val();
        var slaServiceCatalogId = serviceCatalogId;
        var slaState = $('#slaState').find('.rw-input').text();
        var slaResponseTime =  $('#slaResponseTime').val();
        var slaSolveTime =  $('#slaSolveTime').val();
        var slaTimeoutCharges=  $('#slaTimeoutCharges').val();
        var slaCreatePerson = $('#slaCreatePerson').val();
        var slaCreateTime = new Date(Date.parse($("#slaCreateTime").find('input').val().replace(/-/,"/")));
        var data={
          Title:slaName,
          ServiceContent:slaProvider,
          ServiceCatalog:slaServiceCatalogId,
          Status:slaState,
          ResponseTime:slaResponseTime,
          SolutionTime:slaSolveTime,
          TotalCount:slaTimeoutCharges
        };
        const { dispatch } = this.props;
        dispatch(addSla(data));
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
      this.changeSlaState();
    },
    changeSlaState:function(){
      // this.getFlux().actions.YFTSlaActions.setSlaState();
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
      var newFaultTypes = this.getServiceBigTypeArray();
      return(
            <div id='hardwareManageCreateView' className='repositoryOverview'>

                  <div className="overviewDesViewDiv panelBasic">

                      <Widget.RepositoryTitle title="新建服务级别协议" returnUrl="#/baseManage/slaList" returnUrlName="返回服务级别列表"/>

                      <div className="staticDiv col-md-12">
                          <div className="staticLeftDiv">
                              <div className='repositoryAddHead'>
                                <span>服务级别协议的功能：新建和查看组织内服务级别协议列表，并编辑工单的响应时间、解决时间、超过时间时、扣费标准等。</span>
                              </div>
                              <div className='btnGroupDiv2'>
                                  <button type="button" className="repositorySubmit yunweiHeight" onClick={this._subSave} style={false ? {"backgroundColor":"#9EAAAA"}:{"backgroundColor":"#00b724"}} disabled={false? true:false}>保存</button>
                              </div>
                          </div>
                      </div>
                      <div className="yunweiTable slaTableStyle">
                        <div>&nbsp;</div>

                        <table className="sla-table-basic">
                          <tbody>
                            <tr>
                              <td rowSpan="5" className="slaTableFontBold slaTableFontCenter">服务协议</td>
                              <td className="slaTitleStyle">&nbsp;&nbsp;服务协议名称<span className="slaPan"> *</span></td>
                              <td colSpan="3" id="slaName" className="slaTableFontBold table-basic-td-input">
                                <div className="alert-block">服务协议名称不能为空</div>
                                <input type="text" onChange={this.changeSlaState} />
                              </td>
                            </tr>
                            <tr>
                              <td className="slaTitleStyle">&nbsp;&nbsp;服务提供商<span className="slaPan"> *</span></td>
                              <td colSpan="1" id="slaProvider" className="slaTableFontBold table-basic-td-input">
                                <div className="alert-block">服务提供商不能为空</div>
                                <input type="text" onChange={this.changeSlaState} />
                              </td>
                              <td className="slaTitleStyle">&nbsp;&nbsp;服务大类<span className="slaPan"> *</span></td>
                              <td id="slaLongType" className="slaTableFontBold table-basic-td-input">
                                <div className="alert-block">服务大类不能为空</div>
                                <ReactWidgets.DropdownList data={newFaultTypes} textField='name'/>
                              </td>
                            </tr>
                            <tr>
                              <td className="slaTitleStyle">&nbsp;&nbsp;状态</td>
                              <td className="slaTableFontBold"><ReactWidgets.DropdownList data={["启用","禁用"]} defaultValue="启用" textField='name' id="slaState" onChange={this.changeSlaState}/></td>
                              <td className="slaTitleStyle">&nbsp;&nbsp;响应时间<span className="slaPan"> *</span></td>
                              <td id="slaResponseTimePrompt" className="slaTableFontBold table-basic-td-input">
                                <div className="alert-block">响应时间不能为空</div>
                                <input className="sla-input-width" type="number" id="slaResponseTime" min="1" max="9999" onChange={this.checkNumber}/>
                                <div className="salNowrap">小时</div>
                              </td>
                            </tr>
                            <tr>
                              <td className="slaTitleStyle">&nbsp;&nbsp;解决时间<span className="slaPan"> *</span></td>
                              <td id="slaSolveTimePrompt" className="slaTableFontBold table-basic-td-input">
                                <div className="alert-block">解决时间不能为空</div>
                                <input className="sla-input-width" type="number" id="slaSolveTime" min="1" max="9999" onChange={this.checkNumber}/>
                                <div className="salNowrap">小时</div>
                              </td>
                              <td className="slaTitleStyle">&nbsp;&nbsp;超时收费<span className="slaPan"> *</span></td>
                              <td id="slaTimeoutChargesPrompt" className="slaTableFontBold table-basic-td-input">
                                <div className="alert-block">超时收费不能为空</div>
                                <input className="sla-input-width" type="number" id="slaTimeoutCharges" min="0" max="9999" onChange={this.checkNumber}/>
                                <div className="salNowrap">元/小时</div>
                              </td>
                            </tr>
                            <tr>
                              <td className="slaTitleStyle">&nbsp;&nbsp;创建人</td>
                              <td className="slaTableFontBold yunweiBorder" disabled>
                                <input type="text" id="slaCreatePerson" defaultValue={localStorage.getItem("localUserName")} disabled/>
                              </td>
                              <td className="slaTitleStyle">&nbsp;&nbsp;创建时间</td>
                              <td className="slaTableFontBold">
                                <ReactWidgets.DateTimePicker format={"yyyy-MM-dd HH:mm:ss"} id="slaCreateTime" defaultValue={new Date()} disabled={true} />
                              </td>
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
  const { getSlaListData ,getServiceBigTypeData } = state.slaReducer

  return {
    getSlaListData:getSlaListData,
    getServiceBigTypeData:getServiceBigTypeData
  }
}

export default connect(mapSlaListState)(SlaAdd)
// module.exports = SLAAdd;
