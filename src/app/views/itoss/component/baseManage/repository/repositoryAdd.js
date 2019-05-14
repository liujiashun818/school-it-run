/**
* 张锌楠
* 新建知识
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var ReactWidgets = require('react-widgets');
var Widget = require('./widget/Widget');
var Util = require('../util');
import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
import { setRepositoryState,getFaultType,getFaultSubType,addRepository } from '../../../../../actions/repository_action';
$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});
var RepositoryAdd = React.createClass({
    getInitialState: function() {
      return {
        faultId: "",
        faultSubId:""
      };
    },
    componentWillMount:function(){
      const { dispatch } = this.props;
      dispatch(getFaultType());
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",150);
      $("#repositoryTheme,#faultTypePrompt,#faultSubTypePrompt,#repositoryFaultXX,#repositoryFaultFX,#repositorySolveBZ,#repositoryAnalyzeZJ").mouseover(function(){
          $(this).find(".alert-block").hide();
      });
      // this.changeRepositoryState();
    },
    getFaultSubType: function(e){
      $('#faultSubTypePrompt').find('.rw-widget').find('.rw-input').text("");
      var id = e.id;
      this.setState({faultId:id});
      const { dispatch } = this.props;
      dispatch(getFaultSubType(id));
      // this.getFlux().actions.YFTOperationActions.get_faultSubType(id);
      // this.changeRepositoryState();
    },
    setFaultSubType: function(e){
      var id = e.id;
      this.setState({faultSubId:id});
      // this.getFlux().actions.YFTOperationActions.set_faultSubType(id);
      // this.changeRepositoryState();
    },
    _submit:function(){
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
        var data = {
          FaultID:this.state.faultId,
          FaultSubID:this.state.faultSubId,
          Status:"已提交",
          theme: $('#repositoryTheme').find("input").val(),
          FaultPhenomenon: $('#repositoryFaultXX').find("textarea").val(),
          FaultAnalysis:$('#repositoryFaultFX').find("textarea").val(),
          SolvingSteps:$('#repositorySolveBZ').find("textarea").val(),
          AnalysisSummary:$('#repositoryAnalyzeZJ').find("textarea").val(),
          ProjectID:"",
          ClickNumber:"0",
          WorkOrderId:""
        };
        const { dispatch } = this.props;
        dispatch(addRepository(data));
      }
    },

    changeRepositoryState:function(){
      const { dispatch } = this.props;
      dispatch(setRepositoryState(false));
    },
    render:function(){
      const { dispatch } = this.props;
      var faultTypes = this.props.faultTypes;
      var faultSubTypes = this.props.faultSubTypes;
      return(
            <div id='hardwareManageCreateView' className='repositoryOverview'>
              <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
                onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
              />
              <div id="createviewDesViewDiv" className="overviewDesViewDiv panelBasic">

                  <Widget.RepositoryTitle title="新建知识" returnUrl="baseManage/repositoryList" returnUrlName="返回知识清单" setCurName={data => dispatch(setCurName(data))} paterName="知识清单"/>

                  <div className="staticDiv col-md-12">
                      <div className="staticLeftDiv">
                          <div className='repositoryAddHead'>
                            <span>知识清单的功能：故障解决方法生成知识库清单,浏览、查看、新建知识库清单，并可按被监测资源类型查看、检索知识库清单。</span>
                          </div>
                          <div className='btnGroupDiv2'>
                              <button type="button" className="repositorySubmit yunweiHeight" onClick={this._submit} style={this.props.isDisabled ? {"backgroundColor":"#9EAAAA"}:{"backgroundColor":"#00b724"}} disabled={this.props.isDisabled ? true:false}>保存</button>
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
                            <input type="text" onChange={this.changeRepositoryState}/>
                          </td>
                        </tr>
                        <tr>
                          <td className="slaTitleStyle" style={{"width":"10%"}}>&nbsp;&nbsp;故障类型<span className="slaPan"> *</span></td>
                          <td colSpan="1" id="faultTypePrompt" className="slaTableFontBold table-basic-td-input" style={{"width":"20%"}}>
                            <div className="alert-block">故障类型不能为空</div>
                            <ReactWidgets.DropdownList data={faultTypes} textField='name' onChange={this.getFaultSubType}/>
                          </td>
                          <td className="slaTitleStyle" style={{"width":"10%"}}>&nbsp;&nbsp;故障子类型<span className="slaPan"> *</span></td>
                          <td id="faultSubTypePrompt" className="slaTableFontBold table-basic-td-input" style={{"width":"20%"}}>
                            <div className="alert-block">故障子类型不能为空</div>
                            <ReactWidgets.DropdownList  data={faultSubTypes} textField='name' onChange={this.setFaultSubType}/>
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan="12" className="slaTableFontBold slaTableFontCenter">知识详情</td>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;故障现象<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryFaultXX">
                            <div className="alert-block">故障现象不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" onChange={this.changeRepositoryState}></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;故障分析<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryFaultFX">
                            <div className="alert-block">故障分析不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" onChange={this.changeRepositoryState}></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;解决步骤<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositorySolveBZ">
                            <div className="alert-block">解决步骤不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" onChange={this.changeRepositoryState}></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;分析总结<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryAnalyzeZJ">
                            <div className="alert-block">分析总结不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" onChange={this.changeRepositoryState}></textarea>
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
                            <td className="borderRightNone" style={{"width":"10%"}}>&nbsp;&nbsp;故障类型<span className="slaPan"> *</span></td>
                            <td className="rw-widget-td" style={{"width":"20%"}} id="faultTypePrompt">
                              <div className="alert-block">故障类型不能为空</div>
                              <ReactWidgets.DropdownList data={this.state.itoss.faultTypes} textField='name' onChange={this.getFaultSubType}/>
                            </td>
                            <td className="borderRightNone repositoryBorderLeft slaTableFontBold slaTableFontCenter">&nbsp;&nbsp;故障子类型<span className="slaPan"> *</span></td>
                            <td className="rw-widget-td" style={{"width":"20%"}} id="faultSubTypePrompt">
                              <div className="alert-block">故障子类型不能为空</div>
                              <ReactWidgets.DropdownList  data={this.state.itoss.faultSubTypes} textField='name' onChange={this.setFaultSubType}/>
                            </td>
                          </tr>
                          <tr>
                            <td className="borderRightNone" style={{"width":"10%"}}>&nbsp;&nbsp;主题<span className="slaPan"> *</span></td>
                            <td colSpan="6" className="borderRightNone repositoryBorderTop" id="repositoryTheme">
                              <div className="alert-block">主题不能为空</div>
                              <input type="text" onChange={this.changeRepositoryState}/>
                            </td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>&nbsp;&nbsp;故障现象<span className="slaPan"> *</span></td>
                            <td colSpan="6" id="repositoryFaultXX" className="table-basic-td-input">
                              <div className="alert-block">故障现象不能为空</div>
                              <textarea rows="6" onChange={this.changeRepositoryState}></textarea></td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>&nbsp;&nbsp;故障分析<span className="slaPan"> *</span></td>
                            <td colSpan="6" id="repositoryFaultFX" className="table-basic-td-input">
                              <div className="alert-block">故障分析不能为空</div>
                              <textarea rows="6" onChange={this.changeRepositoryState}></textarea></td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>&nbsp;&nbsp;解决步骤<span className="slaPan"> *</span></td>
                            <td colSpan="6" id="repositorySolveBZ" className="table-basic-td-input">
                              <div className="alert-block">解决步骤不能为空</div>
                              <textarea rows="6" onChange={this.changeRepositoryState}></textarea></td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>&nbsp;&nbsp;分析总结<span className="slaPan"> *</span></td>
                            <td colSpan="6" id="repositoryAnalyzeZJ" className="table-basic-td-input">
                              <div className="alert-block">分析总结不能为空</div>
                              <textarea  rows="6" onChange={this.changeRepositoryState}></textarea></td>
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

function mapRepositoryAdd(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { isDisabled,faultTypes,faultSubTypes } = state.repositoryReducer;

  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    isDisabled:isDisabled,
    faultTypes:faultTypes,
    faultSubTypes:faultSubTypes
  }
}

export default connect(mapRepositoryAdd)(RepositoryAdd);
// module.exports = RepositoryAdd;
