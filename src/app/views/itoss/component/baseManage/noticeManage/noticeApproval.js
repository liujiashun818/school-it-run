/**
* 张锌楠
* 审核公告
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
import NoticeApprovalTable from './widget/NoticeApprovalTable';
var Widget = require('./widget/Widget');
var Util = require('../util');

import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action';
import { noticeMultDelete } from '../../../../../actions/notice_action';
$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});

var NoticeApproval = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTNoticeStore")],
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
        // this.getFlux().actions.YFTNoticeActions.getPureOrganization(null);
    },

    onClickDelete:function(){
      var selectMult = $('#hardwareAssetTable').bootstrapTable('getSelections');
      if(selectMult instanceof Array && selectMult.length > 0){
        if(confirm("确认要删除吗?")){
          var mRecid = "";
          for(var i =0; i < selectMult.length; i++){
            if(i == selectMult.length-1){
              mRecid = "'"+mRecid+selectMult[i].TOPIC_ID+"'";
            }else{
              mRecid = ""+mRecid+selectMult[i].TOPIC_ID+"','";
            }
          }
          var deleteObj = [{key:'TABLENAME',value:'TopicRelease'},{key:'KEYWORD',value:'RecId'},{key:'VALUE',value:mRecid}];
          var obj = {flag:"approval",deleteObj:deleteObj};
          const { dispatch } = this.props;
          dispatch(noticeMultDelete(obj));
        }
      }
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
                  <Widget.NoticeTitle title="审核公告" returnUrl="" returnUrlName="" setCurName={data => dispatch(setCurName(data))} paterName="审核公告"/>

                  <div className="staticDiv col-md-12">
                      <div className="staticLeftDiv">
                          <div className='repositoryAddHead'>
                            <span>审核公告的功能：审核已经创建的公告。</span>
                          </div>
                          <div>
                            {quxianLimit.noticeApprovalDelete ? <input type="button" className="yunweiDelete yunweiHeight" value="删除" onClick={this.onClickDelete}/> : ""}
                          </div>
                      </div>
                  </div>

                  <div className="col-md-12">
                      <NoticeApprovalTable setCurName={data => dispatch(setCurName(data))}/>
                  </div>
              </div>

            </div>
      );
    }
});

function mapNoticeApproval(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer

  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName
  }
}

export default connect(mapNoticeApproval)(NoticeApproval);
// module.exports = NoticeApproval;
