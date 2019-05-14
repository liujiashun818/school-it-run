/**
* 张锌楠
* 发布公告
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
import NoticeTable from './widget/NoticeTable';
var Util = require('../util');
var Widget = require('./widget/Widget');

import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action';
import { setReleaseTopic,noticeMultDelete } from '../../../../../actions/notice_action';

$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});

var NoticeList = React.createClass({
    // mixins: [Navigation, FluxMixin, StoreWatchMixin("YFTNoticeStore")],
    getInitialState: function() {
      return {
        btnStatus:true
      };
    },
    componentWillMount:function(){
      // this.getFlux().actions.YFTNoticeActions.setNoticeLimit(Util.getSlaLimit());
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",150);
    },
    _submit:function(){
      // var noticeData = this.getFlux().store("YFTNoticeStore").getState().queryNoticeData;
      var noticeData = this.props.queryNoticeData;
      if(noticeData.length <= 0){
        $.showPublicDialog('提示','没有可以发布的公告!');
        return;
      }else{
        var selectMult = $('#hardwareAssetTable').bootstrapTable('getSelections');
        if(selectMult.length > 0){
          if(selectMult instanceof Array && selectMult.length > 0){
            if(confirm("确认要发布吗?")){
              // var noticeData = this.getFlux().store("YFTNoticeStore").getState().queryNoticeData;
              var noticeData = this.props.queryNoticeData;
              var multStr = Util.tableMultDeleteRefresh2(noticeData,selectMult);
              var updateObj = [{key:"TOPIC_IDS",value:multStr}];
              const { dispatch } = this.props;
              dispatch(setReleaseTopic(updateObj));
              // this.getFlux().actions.YFTNoticeActions.setReleaseTopic(updateObj);
            }
          }else{
            return;
          }
        }else{
          $.showPublicDialog('提示','没有选择发布项!');
          return;
        }
      }
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
          var obj = {flag:"release",deleteObj:deleteObj};
          const { dispatch } = this.props;
          dispatch(noticeMultDelete(obj));
        }
      }
    },
    render:function(){
      // var noticeData = this.getFlux().store("YFTNoticeStore").getState().queryNoticeData;
      // var noticeLimitObj = this.getFlux().store("YFTNoticeStore").getState().noticeLimitObj;
      const { dispatch } = this.props;
      var noticeLimitObj= Util.getSlaLimit();
      return(
          <div className='repositoryOverview'>
            <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
              onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
              curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
            />
            <div className="overviewDesViewDiv panelBasic">
                <Widget.NoticeTitle title="发布公告" returnUrl="" returnUrlName="" setCurName={data => dispatch(setCurName(data))} paterName="发布公告"/>
                <div className="staticDiv col-md-12">
                    <div className="staticLeftDiv">
                        <div className='repositoryAddHead'>
                          <span>发布公告的功能：发布一个或批量操作已经审核通过的公告。 </span>
                        </div>
                        <div>
                          {noticeLimitObj.noticeReleaseYes ?
                            <button type="button" className="repositorySubmit yunweiHeight" onClick={this._submit} >发布</button>
                          :""}
                          {noticeLimitObj.noticeReleaseDelete ? <input type="button" className="yunweiDelete yunweiHeight yunweiDescribeMargin" value="删除" onClick={this.onClickDelete}/> : ""}
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                  <NoticeTable setCurName={data => dispatch(setCurName(data))}/>
                </div>
            </div>
          </div>
      );
    }
});

function mapNoticeList(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { queryNoticeData } = state.noticeReducer

  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    queryNoticeData:queryNoticeData
  }
}

export default connect(mapNoticeList)(NoticeList);

// module.exports = NoticeList;
