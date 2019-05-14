/**
* 张锌楠
* 已创建公告
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
import NoticeSubmitTable from './widget/NoticeSubmitTable';
var Widget = require('./widget/Widget');
var Util = require('../util');
import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action';
import { noticeMultDelete } from '../../../../../actions/notice_action';
$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});

var NoticeSubmitList = React.createClass({
    mixins: [History],
    componentWillMount:function(){
      // this.getFlux().actions.YFTNoticeActions.setNoticeLimit(Util.getSlaLimit());
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",150);
    },
    onClickAdd:function(){
        this.props.dispatch(setCurName("已创建公告"));
        this.history.pushState(null,'baseManage/noticeInfo');
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
          var obj = {flag:"submit",deleteObj:deleteObj};
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
                <Widget.NoticeTitle title="已创建公告" returnUrl="" returnUrlName="" setCurName={data => dispatch(setCurName(data))} paterName="已创建公告"/>

                <div className="staticDiv col-md-12">
                    <div className="staticLeftDiv">
                        <div className='repositoryAddHead'>
                          <span>信息发布的主要功能:将信息发布给各级厅级,市级,县级人员</span>
                        </div>
                        <div>
                          {quxianLimit.noticeAdd ? <input type="button" className="repositorySubmit yunweiHeight" value="添加" onClick={this.onClickAdd}/> : ""}
                          {quxianLimit.noticeSubmitDelete ? <input type="button" className="yunweiDelete yunweiHeight yunweiDescribeMargin" value="删除" onClick={this.onClickDelete}/> : ""}
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                  <NoticeSubmitTable setCurName={data => dispatch(setCurName(data))}/>
                </div>
            </div>
          </div>
      );
    }
});
function mapNoticeSubmitList(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer

  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName
  }
}

export default connect(mapNoticeSubmitList)(NoticeSubmitList);



// module.exports = NoticeSubmitList;
