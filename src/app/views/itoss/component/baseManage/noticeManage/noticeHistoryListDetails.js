/**
* 张锌楠
* 历史发布详情
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
// var Navigation = require('react-router').Navigation;
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var Widget = require('./widget/Widget');

import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action';
// import { getPureOrganization,getTopicReceiverOrganization,updateNotice,setTopicReceives } from '../../../../../actions/notice_action';

$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});

var NoticeHistoryListDetails = React.createClass({
    // mixins: [History,Navigation, FluxMixin, StoreWatchMixin("YFTNoticeStore")],
    getInitialState: function() {
      return {
        faultId: "",
        faultSubId:""
      };
    },
    componentWillMount:function(){
      // var noticeObj = this.getFlux().store("YFTNoticeStore").getState().noticeObj;
      var noticeObj = this.props.noticeObj;
      this.props.dispatch(setCurName("历史发布"));
      if(typeof(noticeObj.TOPIC_ID) == "undefined"){
        this.history.pushState(null,'baseManage/noticeHistoryList');
        return;
      }
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",150);
      var li = $("#borrowing");
      if(li){
        $("#borrowing").attr("class","list-group-item active")
      };
    },
    render:function(){
      const { dispatch } = this.props;
      // var noticeObj = this.getFlux().store("YFTNoticeStore").getState().noticeObj;
       var noticeObj = this.props.noticeObj;
      return(
          <div className='repositoryOverview'>
            <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
              onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
              curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
            />
            <div className="overviewDesViewDiv panelBasic">
                <Widget.NoticeTitle title="历史发布详情" returnUrl="baseManage/noticeHistoryList" returnUrlName="返回历史发布" setCurName={data => dispatch(setCurName(data))} paterName="历史发布"/>

                <div className="staticDiv col-md-12">
                    <div className="staticLeftDiv">
                        <div className='repositoryAddHead'>
                          <span>历史发布的功能：查看组织中需处理公告、过期公告等。</span>
                        </div>
                    </div>
                </div>
                <div className="operationFormDiv">
                  <div className="col-md-12 historyBox">
                    <Widget.NavInfo noticeObj={noticeObj} isHistory={true} />
                  </div>
                </div>

            </div>

          </div>
      );
    }
});

function mapNoticeHistoryListDetails(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { noticeObj,getPureOrganizationData } = state.noticeReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    noticeObj:noticeObj
  }
}
export default connect(mapNoticeHistoryListDetails)(NoticeHistoryListDetails);
