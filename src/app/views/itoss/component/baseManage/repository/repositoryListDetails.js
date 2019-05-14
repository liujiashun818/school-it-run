/**
* 张锌楠
* 知识详情
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
// var Navigation = require('react-router').Navigation;
var History = ReactRouter.History;
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var ReactWidgets = require('react-widgets');
var Widget = require('./widget/Widget');

$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});
import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
import { getRepositoryStatistics } from '../../../../../actions/repository_action';

var RepositoryListDetails = React.createClass({
    mixins: [History],
    getInitialState: function() {
      return {
        faultId: "",
        faultSubId:""
      };
    },
    componentWillMount:function(){
      var repositorObj = this.props.knowledgeListObj;
      this.props.dispatch(setCurName("知识清单"));
      if(typeof(repositorObj.RECID) == "undefined"){
        this.history.pushState(null,'baseManage/repositoryList');
        return;
      }
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",150);
    },
    getFaultSubType: function(e){
      var id = e.id;
      this.setState({faultId:id});
      // this.getFlux().actions.YFTOperationActions.get_faultSubType(id);
    },
    setFaultSubType: function(e){
      var id = e.id;
      this.setState({faultSubId:id});
      // this.getFlux().actions.YFTOperationActions.set_faultSubType(id);
    },
    _checkBtn:function(e){
      if(e.currentTarget.id == "checkPass"){
        //更新状态
      }else if(e.currentTarget.id == "checkNotPass"){
        //更新状态 添加原因
      }else if(e.currentTarget.id == "checkSave"){
        //
      }
    },
    render:function(){
      const { dispatch } = this.props;
      // var repositorObj = this.getFlux().store("YFTRepositoryStore").getState().knowledgeListObj;
      // var faultTypes = this.state.itoss.faultTypes;
      // var faultSubTypes = this.state.itoss.faultSubTypes;
      var repositorObj = this.props.knowledgeListObj;
      var faultTypes = [];
      var faultSubTypes = [];
      return(
            <div className='repositoryOverview'>
              <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
                onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
              />

              <div className="overviewDesViewDiv panelBasic">

                <Widget.RepositoryTitle title="知识详情" returnUrl="baseManage/repositoryList" returnUrlName="返回知识清单" setCurName={data => dispatch(setCurName(data))} paterName="知识清单"/>

                  <div className="staticDiv col-md-12">
                      <div className="staticLeftDiv">
                          <div className='repositoryAddHead'>
                            <span>知识清单的功能：故障解决方法生成知识库清单,浏览、查看、新建知识库清单，并可按被监测资源类型查看、检索知识库清单。</span>
                          </div>
                          <div className='btnGroupDiv2'>
                            {/**
                            <button id="checkPass" type="button" className="repositorySubmit" onClick={this._checkBtn} style={{"background-color":"#A9A9A9"}} disabled={true}>审核通过</button>
                            <button id="checkNotPass" type="button" className="repositorySubmit" onClick={this._checkBtn} style={{"margin-left":"10px","background-color":"#A9A9A9"}} disabled={true}>审核不通过</button>
                            <button id="checkSave" type="button" className="repositorySubmit" onClick={this._checkBtn} style={{"margin-left":"10px","background-color":"#A9A9A9"}} disabled={true}>提交</button>
                            */}
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
                          <td colSpan="3" className="slaTableFontBold table-basic-td-input">
                            <input type="text" id="repositoryTheme" defaultValue={repositorObj.THEME} disabled={true} />
                          </td>
                        </tr>
                        <tr>
                          <td className="slaTitleStyle" style={{"width":"10%"}}>&nbsp;&nbsp;故障类型<span className="slaPan"> *</span></td>
                          <td colSpan="1" id="faultTypePrompt" className="slaTableFontBold table-basic-td-input" style={{"width":"20%"}}>
                            <ReactWidgets.DropdownList data={faultTypes} textField='name' onChange={this.getFaultSubType} defaultValue={repositorObj.FAULT_NAME} disabled={true}/>
                          </td>
                          <td className="slaTitleStyle" style={{"width":"10%"}}>&nbsp;&nbsp;故障子类型<span className="slaPan"> *</span></td>
                          <td id="faultSubTypePrompt" className="slaTableFontBold table-basic-td-input" style={{"width":"20%"}}>
                            <ReactWidgets.DropdownList data={faultSubTypes} textField='name' onChange={this.setFaultSubType} defaultValue={repositorObj.FAULT_ITEM_NAME} disabled={true}/>
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan="12" className="slaTableFontBold slaTableFontCenter">知识详情</td>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;故障现象<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryFaultXX">
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" id="repositoryFaultXX" defaultValue={repositorObj.FALUT_PHENOMENON} disabled={true}></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;故障分析<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryFaultFX">
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" id="repositoryFaultFX" defaultValue={repositorObj.FAULT_ANALYSIS} disabled={true}></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;解决步骤<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositorySolveBZ">
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" id="repositorySolveBZ" defaultValue={repositorObj.SOLVING_STEPS} disabled={true}></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;分析总结<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryAnalyzeZJ">
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4" id="repositoryAnalyzeZJ" defaultValue={repositorObj.ANALYSIS_SUMMARY} disabled={true}></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/**
                  <div className="createGroupDetailDiv slaTableStyle">
                    <div>&nbsp;</div>
                    <div className="col-md-12">
                      <table>
                        <tbody>
                          <tr>
                            <td className="borderRightNone slaTableFontBold slaTableFontCenter" style={{"width":"10%"}}>故障类型 *</td>
                            <td className="rw-widget-td" style={{"width":"20%"}}><ReactWidgets.DropdownList data={this.state.itoss.faultTypes} textField='name' onChange={this.getFaultSubType} defaultValue={repositorObj.FAULT_NAME} disabled={true}/></td>
                            <td className="borderRightNone slaTableFontBold slaTableFontCenter" style={{"border-left":"none","width":"10%"}}>故障子类型 *</td>
                            <td className="rw-widget-td" style={{"width":"20%"}}><ReactWidgets.DropdownList data={this.state.itoss.faultSubTypes} textField='name' onChange={this.setFaultSubType} defaultValue={repositorObj.FAULT_ITEM_NAME} disabled={true}/></td>
                          </tr>
                          <tr>
                            <td className="borderRightNone slaTableFontBold slaTableFontCenter" style={{"width":"10%"}}>主题 *</td>
                            <td colSpan="6" className="borderRightNone" style={{"borderTop":"none","border-left":"none"}}><input type="text" id="repositoryTheme" defaultValue={repositorObj.THEME} disabled={true} /></td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>故障现象 *</td>
                            <td colSpan="6"><textarea className="form-control orderExplain" placeholder="故障现象" style={{"borderTop":"none"}} rows="5" id="repositoryFaultXX" defaultValue={repositorObj.FALUT_PHENOMENON} disabled={true}></textarea></td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>故障分析 *</td>
                            <td colSpan="6"><textarea className="form-control orderExplain" placeholder="故障分析" style={{"borderTop":"none"}} rows="6" id="repositoryFaultFX" defaultValue={repositorObj.FAULT_ANALYSIS} disabled={true}></textarea></td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>解决步骤 *</td>
                            <td colSpan="6"><textarea className="form-control orderExplain" placeholder="解决步骤" style={{"borderTop":"none"}} rows="5" id="repositorySolveBZ" defaultValue={repositorObj.SOLVING_STEPS} disabled={true}></textarea></td>
                          </tr>
                          <tr>
                            <td className="operationTableTitle" style={{"width":"10%"}}>分析总结 *</td>
                            <td colSpan="6"><textarea className="form-control orderExplain" placeholder="分析总结" style={{"borderTop":"none"}}  rows="5" id="repositoryAnalyzeZJ" defaultValue={repositorObj.ANALYSIS_SUMMARY} disabled={true}></textarea></td>
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

function mapRepositoryListDetails(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { knowledgeListObj } = state.repositoryReducer;

  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    knowledgeListObj:knowledgeListObj
  }
}
export default connect(mapRepositoryListDetails)(RepositoryListDetails);

// module.exports = RepositoryListDetails;
