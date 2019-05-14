/**
* 张锌楠
* 知识清单
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
// var Navigation = require('react-router').Navigation;
var History = ReactRouter.History;
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var ReactWidgets = require('react-widgets');
import RepositoryTableListBox  from './widget/RepositoryTableListBox';
var Widget = require('./widget/Widget');
var Util = require('../util');

$(window).resize(function(){
  $.panelHeight(".panelBasic",160);
});

import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
import { getRepositoryStatistics } from '../../../../../actions/repository_action';

var RepositoryList = React.createClass({
    mixins: [History],
    getInitialState: function() {
      return {
        faultId: "",
        faultSubId:"",
        title:"知识清单"
      };
    },
    componentWillMount:function(){
      // this.getFlux().actions.YFTRepositoryActions.setRepositoryLimit(Util.getSlaLimit());
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",160);
      // this.getFlux().actions.YFTRepositoryActions.getCommonKnowledge(null);//常用知识
      // this.getFlux().actions.YFTRepositoryActions.getUpdateKnowledge(null);//更新知识
      const { dispatch } = this.props;
      dispatch(getRepositoryStatistics(null));
      // this.getFlux().actions.YFTRepositoryActions.getRepositoryStatistics(null);//知识库统计
    },
    //常用知识列表
    createCommonKnowledgeTable:function(){
      // var ckList = this.getFlux().store("YFTRepositoryStore").getState().CommonKnowledgeList;
      var ckList = [];
      var myCommonKnowledgeList = ckList.map(function(obj,i){
        return <tr key={i}>
                <td>{obj.THEME}</td>
                <td>{obj.CLICK_NUMBER}</td>
              </tr>;
      });
      return(
        <tbody>
          {myCommonKnowledgeList}
        </tbody>
      );
    },
    //更新知识
    createUpdateKnowledgeTable:function(){
      // var upList = this.getFlux().store("YFTRepositoryStore").getState().updateKnowledgeList;
      var upList = [];
      var myUpdateKnowledgeList = upList.map(function(obj){
        return <tr>
                <td>{obj.THEME}</td>
                <td>{obj.TIME}</td>
              </tr>;
      });
      return(
        <tbody>
          {myUpdateKnowledgeList}
        </tbody>
      );
    },
    onFilter:function(e){
      if(e =="all"){
        this.setState({title:"所有知识"});
        $('#hardwareAssetTable').bootstrapTable('filterBy',{});
      }else{
        this.setState({title:e});
        $('#hardwareAssetTable').bootstrapTable('filterBy',{FAULT_NAME:e});
      }
    },
    //知识库统计
    createKnowledgeStatisticsDiv:function(){
      // var statisticsList = this.getFlux().store("YFTRepositoryStore").getState().knowledgeStatisticsList;
      var statisticsList= this.props.knowledgeStatisticsList;
      var allNumber = 0;
      var myKnowledgeStatisticsList = statisticsList.map(function(obj,i){
        allNumber += parseInt(obj.FAULT_NUMBER);
        if(i>5){
          i = i-6;
        };
        var colors = ["cBlue","cLightGreen","cPink","cOrange","cGreen","cPurple"];
        return <a href="javascript:void(0);" onClick={this.onFilter.bind(this,obj.FAULT_TYPE)}>
          <div className={"col-md-2 repositoryDiv "+colors[i]}>
            <div className="repositoryMargin">&nbsp;&nbsp;{obj.FAULT_TYPE}</div>
            <div className="repositorySumCenter">{obj.FAULT_NUMBER}</div>
          </div>
        </a>;
      }.bind(this));
      return(
        <div>
          <a href="javascript:void(0);" onClick={this.onFilter.bind(this,"all")}>
            <div className="col-md-2 repositoryDivFirst cPurple" style={{marginLeft:"10px"}}>
              <div className="repositoryMargin">&nbsp;&nbsp;所有知识</div>
              <div className="repositorySumCenter">{allNumber}</div>
            </div>
          </a>
          {myKnowledgeStatisticsList}
        </div>
      );
    },

    render:function(){
      const { dispatch } = this.props;
      // var ckList = this.getFlux().store("YFTRepositoryStore").getState().CommonKnowledgeList;
      // var upList = this.getFlux().store("YFTRepositoryStore").getState().updateKnowledgeList;
      // var statisticsList = this.getFlux().store("YFTRepositoryStore").getState().knowledgeStatisticsList;
      var ckList =[];
      var upList = [];
      var statisticsList = [];
      return(
          <div id='hardwareManageCreateView' className='repositoryOverview'>
            <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
              onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
              curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
            />

            <div id="createviewDesViewDiv" className="overviewDesViewDiv panelBasic">

                <Widget.RepositoryTitle title={this.state.title} returnUrl="" returnUrlName="" setCurName={data => dispatch(setCurName(data))} paterName={this.state.title} />

                <div className="staticDiv col-md-12">
                    <div className="staticLeftDiv">
                        <div className='remarkDiv2'>
                          <span>知识清单的功能：故障解决方法生成知识库清单,浏览、查看、新建知识库清单，并可按被监测资源类型查看、检索知识库清单。</span>
                        </div>
                    </div>
                    <div className="col-md-12" style={{"marginBottom":"20px"}}>
                      {this.createKnowledgeStatisticsDiv()}
                    </div>
                </div>
                {/**
                <div className="col-md-6">
                  <h3>常用知识</h3>
                    <table className="table table-bordered" style={{"text-align":"center"}}>
                      <thead>
                        <tr>
                          <th style={{"text-align":"center"}}>主题</th>
                          <th style={{"text-align":"center"}}>点击次数</th>
                        </tr>
                      </thead>
                      {this.createCommonKnowledgeTable()}
                    </table>
                </div>

                <div className="col-md-6">
                  <h3>更新知识</h3>
                    <table className="table table-bordered" style={{"text-align":"center"}}>
                      <thead>
                        <tr>
                          <th style={{"text-align":"center"}}>主题</th>
                          <th style={{"text-align":"center"}}>时间</th>
                        </tr>
                      </thead>
                      {this.createUpdateKnowledgeTable()}
                    </table>
                </div>
                */}

                <div className="col-md-12">
                  <div className="assetTableDiv col-md-12">
                      <fieldset>
                          <div className="tab-content">
                              <div className="tab-pane active">
                                <RepositoryTableListBox setCurName={data => dispatch(setCurName(data))} />
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

function mapRepositoryList(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { knowledgeStatisticsList } = state.repositoryReducer;

  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    knowledgeStatisticsList:knowledgeStatisticsList
  }
}

export default connect(mapRepositoryList)(RepositoryList);
