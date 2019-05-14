/**
* 张锌楠
* 历史发布
*/

require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

import NoticeHistoryTable from './widget/NoticeHistoryTable';
import DatedTopicTable from './widget/DatedTopicTable';
var Widget = require('./widget/Widget');
var Util = require('../util');

import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action';
import { noticeMultDelete } from '../../../../../actions/notice_action';

$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});

var NoticeHistoryList = React.createClass({
    mixins: [History],
    getInitialState: function() {
      return {
        faultId: "",
        faultSubId:""
      };
    },
    componentWillMount:function(){
      // this.getFlux().actions.YFTNoticeActions.setNoticeLimit(Util.getSlaLimit());
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",150);
    },
    render:function(){
      var quxianLimit = Util.getSlaLimit();
      const { dispatch } = this.props;
      return(
            <div className='repositoryOverview'>
              <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
                onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
                curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
              />
              <div className="overviewDesViewDiv panelBasic">
                  <Widget.NoticeTitle title="历史发布" returnUrl="" returnUrlName="" setCurName={data => dispatch(setCurName(data))} paterName="历史发布"/>

                  <div className="staticDiv col-md-12">
                      <div className="staticLeftDiv">
                          <div className='repositoryAddHead'>
                            <span>历史发布的功能：查看组织中需处理公告、过期公告等。</span>
                          </div>
                      </div>
                  </div>
                  <div className="datedTopicTitleDiv">
                      <span>需处理公告</span>
                  </div>
                  <div>
                      <NoticeHistoryTable setCurName={data => dispatch(setCurName(data))}/>
                  </div>
                  <div className="datedTopicTitleDiv">
                      <span>过期公告&nbsp;&nbsp;</span>
                  </div>
                  <div>
                    <DatedTopicTable setCurName={data => dispatch(setCurName(data))}/>
                  </div>
              </div>

            </div>
      );
    }
});

function mapNoticeHistoryList(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer

  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName
  }
}

export default connect(mapNoticeHistoryList)(NoticeHistoryList);

// module.exports = NoticeHistoryList;
