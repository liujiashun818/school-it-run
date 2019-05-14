/**
* 张锌楠
* 审核知识详情
*/

require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var History = ReactRouter.History;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var ReactWidgets = require('react-widgets');
var Widget = require('./widget/Widget');
var Util = require('../util');
import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
import { getFaultType,getFaultSubType,repositoryUpdate } from '../../../../../actions/repository_action';
$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});

var RepositoryDetails = React.createClass({
    mixins: [History],
    getInitialState: function() {
      return {
        faultId: "",
        faultSubId:"",
        btnStatus:true,
        flag:false
      };
    },
    componentWillMount:function(){
      // var repositorObj = this.getFlux().store("YFTRepositoryStore").getState().checkPendingObj;
      var checkPendingObj = this.props.checkPendingObj;
      this.props.dispatch(setCurName("审核知识"));
      if(typeof(checkPendingObj.RECID) == "undefined"){
        this.history.pushState(null,'baseManage/repositoryApproval');
        return;
      }

      //获取故障id和故障子类型id
      const { dispatch } = this.props;
      dispatch(getFaultType());
      dispatch(getFaultSubType(checkPendingObj.FAULT_RECID));
      this.setState({faultId:checkPendingObj.FAULT_RECID});
      this.setState({faultSubId:checkPendingObj.FAULT_ITEM_RECID});
      // this.getFlux().actions.YFTRepositoryActions.getFaultType(repositorObj.FAULT_RECID);

    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",150);
      $("#repositoryTheme,#faultTypePrompt,#faultSubTypePrompt,#repositoryFaultXX,#repositoryFaultFX,#repositorySolveBZ,#repositoryAnalyzeZJ").mouseover(function(){
          $(this).find(".alert-block").hide();
      });
      // this.getFlux().actions.YFTOperationActions.get_faultType();
      // var repositorObj = this.getFlux().store("YFTRepositoryStore").getState().checkPendingObj;
      var repositorObj = {};
      // this.getFlux().actions.YFTRepositoryActions.getFaultType(repositorObj.FAULT_RECID);
    },
    getFaultSubType: function(e){
      $('#faultSubTypePrompt').find('.rw-widget').find('.rw-input').text("");
      var id = e.id;
      this.setState({faultId:id});
      this.setState({flag:true});
      const { dispatch } = this.props;
      dispatch(getFaultSubType(id));
      // this.getFlux().actions.YFTOperationActions.get_faultSubType(id);
    },
    setFaultSubType: function(e){
      var id = e.id;
      this.setState({faultSubId:id});
      // this.getFlux().actions.YFTOperationActions.set_faultSubType(id);
    },
    _promptInfo:function(){
      var name=prompt("请输入不通过原因","");
      if(name.trim() == ""){
        alert("请输入不通过原因");
        name = this._promptInfo();
      }
      return name;
    },
    _checkBtn:function(e){
      const { dispatch } = this.props;
      // var repositorObj = this.getFlux().store("YFTRepositoryStore").getState().checkPendingObj;
      var repositorObj= this.props.checkPendingObj;
      var data = {
        FaultID:this.state.faultId,
        FaultSubID:this.state.faultSubId,
        // Status:"已提交",
        theme: $('#repositoryTheme').find("input").val(),
        FaultPhenomenon: $('#repositoryFaultXX').find("textarea").val(),
        FaultAnalysis:$('#repositoryFaultFX').find("textarea").val(),
        SolvingSteps:$('#repositorySolveBZ').find("textarea").val(),
        AnalysisSummary:$('#repositoryAnalyzeZJ').find("textarea").val(),
      };
      if(e.currentTarget.id == "checkPass"){//通过
        if(confirm("确认审核通过?")){
          data.Descript = "";
          data.Status = "审核通过";
          var updateData = {
            type:"pass",
            RecId:repositorObj.RECID,
            updateObj:data
          };
          dispatch(repositoryUpdate(updateData));
          // this.getFlux().actions.YFTRepositoryActions.repositoryUpdate(updateData);
        }
      }else if(e.currentTarget.id == "checkNotPass"){//不通过 添加原因
        var inputValue = $('#message-text').val();
        if(inputValue == "" || inputValue.trim() ==""){
          alert("内容不能为空!");
          return;
        }
        data.Descript = inputValue;
        data.Status = "审核不通过";
        var updateData = {
          type:"nopass",
          RecId:repositorObj.RECID,
          updateObj:data
        };
        dispatch(repositoryUpdate(updateData));
        // this.getFlux().actions.YFTRepositoryActions.repositoryUpdate(updateData);
        $('#myModal').modal('hide');
      }else if(e.currentTarget.id == "checkSave"){
        if(this.state.btnStatus){
          this.setState({btnStatus:false});
        }else{
          var flag = true;
          if(this.state.faultId == "" || $('#faultTypePrompt').find('.rw-widget').find('.rw-input').text() == ""){
            $("#faultTypePrompt").find(".alert-block").show();
            flag = false;
          }
          if(this.state.faultSubId == "" || $('#faultSubTypePrompt').find('.rw-widget').find('.rw-input').text() == ""){
            $("#faultSubTypePrompt").find(".alert-block").show();
            flag = false;
          }
          if($('#repositoryTheme').find("input").val().trim() == ""){
            $("#repositoryTheme").find(".alert-block").show();
            flag = false;
          }
          if($('#repositoryFaultXX').find("textarea").val().trim() == ""){
            $("#repositoryFaultXX").find(".alert-block").show();
            flag = false;
          }
          if($('#repositoryFaultFX').find("textarea").val().trim() == ""){
            $("#repositoryFaultFX").find(".alert-block").show();
            flag = false;
          }
          if($('#repositorySolveBZ').find("textarea").val().trim() == ""){
            $("#repositorySolveBZ").find(".alert-block").show();
            flag = false;
          }
          if($('#repositoryAnalyzeZJ').find("textarea").val().trim() == ""){
            $("#repositoryAnalyzeZJ").find(".alert-block").show();
            flag = false;
          }
          if(flag){
            data.Descript = "";
            data.Status = "已提交";
            var updateData = {
              type:"commit",
              RecId:repositorObj.RECID,
              updateObj:data
            };

            dispatch(repositoryUpdate(updateData));
            // this.getFlux().actions.YFTRepositoryActions.repositoryUpdate(updateData);
          }
          this.setState({btnStatus:true});
        }
      }
    },
    _onClickChange:function(){

    },
    _cleanText:function(){
      $('#message-text').val("");
    },

    render:function(){
      const { dispatch } = this.props;
      var faultTypes = this.props.faultTypes;
      var faultSubTypes = this.props.faultSubTypes;

      var myFaultSubTypes = [];

      if(faultSubTypes.length > 0){
        // myFaultSubTypes = this.state.itoss.faultSubTypes;
          myFaultSubTypes = [];
      }
      // var repositorObj = this.getFlux().store("YFTRepositoryStore").getState().checkPendingObj;
      // var repositoryLimitObj = this.getFlux().store("YFTRepositoryStore").getState().repositoryLimitObj;
      var repositorObj = this.props.checkPendingObj;
      var repositoryLimitObj= Util.getSlaLimit();
      return(
            <div id='hardwareManageCreateView' className='repositoryOverview'>

              <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title" id="myModalLabel">审核不通过原因</h4>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <textarea className="form-control" id="message-text" rows="8" autofocus="autofocus"></textarea>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this._cleanText}>关闭</button>
                      <button id="checkNotPass" type="button" className="btn btn-primary" onClick={this._checkBtn}>保存</button>
                    </div>
                  </div>
                </div>
              </div>

              <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                 onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                 curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
              />

              <div id="createviewDesViewDiv" className="overviewDesViewDiv panelBasic">
                <Widget.RepositoryTitle title="审核知识详情" returnUrl="baseManage/repositoryApproval" returnUrlName="返回审核知识" setCurName={data => dispatch(setCurName(data))} paterName="审核知识"/>

                  <div className="staticDiv col-md-12">
                      <div className="staticLeftDiv">
                          <div className='repositoryAddHead'>
                            <span>知识清单的功能：故障解决方法生成知识库清单,浏览、查看、新建知识库清单，并可按被监测资源类型查看、检索知识库清单。</span>
                          </div>
                          <div className='btnGroupDiv2'>
                            { repositoryLimitObj.repositoryApprovalPassOrNo ?
                              <span>
                                <button id="checkPass" type="button" className="repositorySubmit yunweiHeight" onClick={this._checkBtn} disabled={!this.state.btnStatus ? true:false} style={!this.state.btnStatus ? {"backgroundColor":"#8B968D"}:{"backgroundColor":"#0EBB30"}}>审核通过</button>
                                <button type="button" className="repositorySubmit yunweiHeight" style={{"marginLeft":"10px"}} data-toggle="modal" data-target="#myModal" disabled={!this.state.btnStatus ? true:false} style={!this.state.btnStatus ? {"backgroundColor":"#8B968D","marginLeft":"10px"}:{"backgroundColor":"#0EBB30","marginLeft":"10px"}}>审核不通过</button>
                              </span>
                            : "" }
                            { repositoryLimitObj.repositoryApprovalUpdate ?
                              <span>
                                <button id="checkSave" type="button" className="repositorySubmit yunweiHeight" onClick={this._checkBtn} style={{"marginLeft":"10px"}}>{this.state.btnStatus ? "编辑":"保存"}</button>
                              </span>
                            : "" }
                        </div>
                      </div>
                  </div>

                  <div className="yunweiTable slaTableStyle">
                    <div>&nbsp;</div>

                    <table className="sla-table-basic">
                      <tbody>
                        <tr>
                          <td rowSpan="2" className="slaTableFontBold slaTableFontCenter" style={{"width":"10%"}}>知识信息</td>
                          <td className="slaTitleStyle" >&nbsp;&nbsp;主题<span className="slaPan"> *</span></td>
                          <td colSpan="3" id="repositoryTheme" className="slaTableFontBold table-basic-td-input">
                            <div className="alert-block">主题不能为空</div>
                            <input type="text" defaultValue={repositorObj.THEME} onChange={this._onClickChange} disabled={this.state.btnStatus ? true:false}/>
                          </td>
                        </tr>
                        <tr>
                          <td className="slaTitleStyle" style={{"width":"10%"}}>&nbsp;&nbsp;故障类型<span className="slaPan"> *</span></td>
                          <td colSpan="1" id="faultTypePrompt" className="slaTableFontBold table-basic-td-input" style={{"width":"20%"}}>
                            <div className="alert-block">故障类型不能为空</div>
                            <ReactWidgets.DropdownList data={faultTypes} textField='name' onChange={this.getFaultSubType} defaultValue={repositorObj.FAULT_NAME} disabled={this.state.btnStatus ? true:false}/>
                          </td>
                          <td className="slaTitleStyle" style={{"width":"10%"}}>&nbsp;&nbsp;故障子类型<span className="slaPan"> *</span></td>
                          <td id="faultSubTypePrompt" className="slaTableFontBold table-basic-td-input" style={{"width":"20%"}}>
                            <div className="alert-block">故障子类型不能为空</div>
                            <ReactWidgets.DropdownList data={faultSubTypes} textField='name' onChange={this.setFaultSubType} defaultValue={repositorObj.FAULT_ITEM_NAME} id="repositoryFaultSubType" disabled={this.state.btnStatus ? true:false}/>
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan="17" className="slaTableFontBold slaTableFontCenter">知识详情</td>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;故障现象<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryFaultXX">
                            <div className="alert-block">故障现象不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" defaultValue={repositorObj.FALUT_PHENOMENON} onChange={this._onClickChange} disabled={this.state.btnStatus ? true:false}></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;故障分析<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryFaultFX">
                            <div className="alert-block">故障分析不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" defaultValue={repositorObj.FAULT_ANALYSIS} onChange={this._onClickChange} disabled={this.state.btnStatus ? true:false}></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;解决步骤<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositorySolveBZ">
                            <div className="alert-block">解决步骤不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" defaultValue={repositorObj.SOLVING_STEPS} onChange={this._onClickChange} disabled={this.state.btnStatus ? true:false}></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;分析总结<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryAnalyzeZJ">
                            <div className="alert-block">分析总结不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" defaultValue={repositorObj.ANALYSIS_SUMMARY} onChange={this._onClickChange} disabled={this.state.btnStatus ? true:false}></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;审核不通过原因<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input">
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" id="repositoryCheckYY" defaultValue={repositorObj.DESCRIBE} disabled={true}></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/**
                  <div className="createGroupDetailDiv slaTableStyle">
                    <div>&nbsp;</div>
                    <div className="col-md-12">
                      <table className="sla-table-basic">
                        <tbody>
                          <tr>
                            <td className="borderRightNone slaTableFontBold slaTableFontCenter" style={{"width":"10%"}}>故障类型 *</td>
                            <td className="rw-widget-td" style={{"width":"20%"}} id="faultTypePrompt">
                              <div className="alert-block">故障类型不能为空</div>
                              <ReactWidgets.DropdownList data={this.state.itoss.faultTypes} textField='name' onChange={this.getFaultSubType} defaultValue={repositorObj.FAULT_NAME} disabled={this.state.btnStatus ? true:false}/>
                            </td>
                            <td className="borderRightNone repositoryBorderLeft slaTableFontBold slaTableFontCenter">故障子类型 *</td>
                            <td className="rw-widget-td" style={{"width":"20%"}} id="faultSubTypePrompt">
                              <div className="alert-block">故障子类型不能为空</div>
                              <ReactWidgets.DropdownList data={this.state.flag ? this.state.itoss.faultSubTypes:this.getFlux().store("YFTRepositoryStore").getState().faultSubTypes} textField='name' onChange={this.setFaultSubType} defaultValue={repositorObj.FAULT_ITEM_NAME} id="repositoryFaultSubType" disabled={this.state.btnStatus ? true:false}/>
                            </td>
                          </tr>
                          <tr>
                            <td className="borderRightNone slaTableFontBold slaTableFontCenter" style={{"width":"10%"}}>主题 *</td>
                            <td colSpan="6" className="borderRightNone repositoryBorderTop" id="repositoryTheme">
                              <div className="alert-block">主题不能为空</div>
                              <input type="text" defaultValue={repositorObj.THEME} onChange={this._onClickChange} disabled={this.state.btnStatus ? true:false}/>
                            </td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>故障现象 *</td>
                            <td colSpan="6" id="repositoryFaultXX" className="table-basic-td-input">
                              <div className="alert-block">故障现象不能为空</div>
                              <textarea rows="5" defaultValue={repositorObj.FALUT_PHENOMENON} onChange={this._onClickChange} disabled={this.state.btnStatus ? true:false}></textarea>
                            </td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>故障分析 *</td>
                            <td colSpan="6" id="repositoryFaultFX" className="table-basic-td-input">
                              <div className="alert-block">故障分析不能为空</div>
                              <textarea rows="6" defaultValue={repositorObj.FAULT_ANALYSIS} onChange={this._onClickChange} disabled={this.state.btnStatus ? true:false}></textarea>
                            </td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>解决步骤 *</td>
                            <td colSpan="6" id="repositorySolveBZ" className="table-basic-td-input">
                              <div className="alert-block">解决步骤不能为空</div>
                              <textarea rows="5" defaultValue={repositorObj.SOLVING_STEPS} onChange={this._onClickChange} disabled={this.state.btnStatus ? true:false}></textarea>
                            </td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>分析总结 *</td>
                            <td colSpan="6" id="repositoryAnalyzeZJ" className="table-basic-td-input">
                              <div className="alert-block">分析总结不能为空</div>
                              <textarea  rows="5" defaultValue={repositorObj.ANALYSIS_SUMMARY} onChange={this._onClickChange} disabled={this.state.btnStatus ? true:false}></textarea>
                            </td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>审核不通过原因 *</td>
                            <td colSpan="6" className="table-basic-td-input"><textarea placeholder="审核不通过原因" rows="5" id="repositoryCheckYY" defaultValue={repositorObj.DESCRIBE} disabled={true}></textarea></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                */}
              </div>

            </div>
      );
    }
});

function mapRepositoryDetails(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { checkPendingObj,faultTypes,faultSubTypes } = state.repositoryReducer;

  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    checkPendingObj:checkPendingObj,
    faultTypes:faultTypes,
    faultSubTypes:faultSubTypes
  }
}
export default connect(mapRepositoryDetails)(RepositoryDetails);

// module.exports = RepositoryDetails;
