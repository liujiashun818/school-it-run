/**
  审核知识
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
import RepositoryTableBox  from './widget/RepositoryTableBox';
var Widget = require('./widget/Widget');
var Util = require('../util');
import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
import { getRepositoryStatistics,repositoryDelete } from '../../../../../actions/repository_action';

$(window).resize(function(){
  $.panelHeight(".panelBasic",90);
});

var RepositoryApproval = React.createClass({
    // mixins: [Navigation, FluxMixin, StoreWatchMixin("YFTRepositoryStore")],
    getInitialState: function() {
      return {
        faultId: "",
        faultSubId:""
      };
    },
    getStateFromFlux: function() {
      var flux = this.getFlux();
      return {
        repository:flux.store("YFTRepositoryStore").getState()
      }
    },
    componentWillMount:function(){
      // this.getFlux().actions.YFTRepositoryActions.setRepositoryLimit(Util.getSlaLimit());
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",90);
    },
    onClickDelete:function(){
      var selectMult = $('#hardwareAssetTable').bootstrapTable('getSelections');
      if(selectMult instanceof Array && selectMult.length > 0){
        if(confirm("确认要删除吗?")){
          var mRecid = "";
          var cId = "";
          for(var i =0; i < selectMult.length; i++){
            if(i == selectMult.length-1){
              mRecid = "'"+mRecid+selectMult[i].RECID+"'";
              cId = cId+selectMult[i].id;
            }else{
              mRecid = ""+mRecid+selectMult[i].RECID+"','";
              cId = cId+selectMult[i].id+",";
            }
          }
          var obj = [{key:'TABLENAME',value:'FaultKnowledgeBase'},{key:'KEYWORD',value:'RecId'},{key:'VALUE',value:mRecid}];
          const { dispatch } = this.props;
          dispatch(repositoryDelete(obj));
        }else{
          return;
        }
      }
    },
    render:function(){
      var quxianLimit = Util.getSlaLimit();
      const { dispatch } = this.props;
      var tempData = [];
      return(
          <div className='repositoryOverview'>
            <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
              onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
              curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
            />

            <div id="createviewDesViewDiv" className="overviewDesViewDiv panelBasic">

              <Widget.RepositoryTitle title="审核知识" returnUrl="" returnUrlName="" setCurName={data => dispatch(setCurName(data))} paterName="审核知识"/>

                <div className="staticDiv col-md-12">
                    <div className="staticLeftDiv">
                        <div className='repositoryAddHead'>
                          <span>审核知识的功能：审核或再次编辑生成的知识库清单。</span>
                        </div>
                        <div>
                          {quxianLimit.repositoryApprovalDelete ? <input type="button" className="yunweiDelete yunweiHeight yunweiDescribeMargin" value="删除" onClick={this.onClickDelete}/> : ""}
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                  <div className="assetTableDiv col-md-12">
                      <fieldset>
                          <div className="tab-content">
                              <div className="tab-pane active" id="overviewDesview_tab_1">
                                  <RepositoryTableBox />
                              </div>
                          </div>
                      </fieldset>
                  </div>
                </div>
            </div>

          </div>
      );
    }
});

function mapRepositoryApproval(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { knowledgeStatisticsList } = state.repositoryReducer;

  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    knowledgeStatisticsList:knowledgeStatisticsList
  }
}
export default connect(mapRepositoryApproval)(RepositoryApproval);

// module.exports = RepositoryApproval;
