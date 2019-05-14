/**
* 张锌楠
* 发布公告详情
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Widget = require('./widget/Widget');

import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action';
// import { getPureOrganization,getTopicReceiverOrganization,updateNotice,setTopicReceives } from '../../../../../actions/notice_action';
$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});

var NoticeListDetails = React.createClass({
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
      this.props.dispatch(setCurName("发布公告"));
      if(typeof(noticeObj.TOPIC_ID) == "undefined"){
        this.history.pushState(null,'baseManage/noticeList');
        return;
      }
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",150);
    },
    render:function(){
      const { dispatch } = this.props;
    // var noticeObj =   this.getFlux().store("YFTNoticeStore").getState().noticeObj;
    var noticeObj = this.props.noticeObj;
      return(
          <div className='repositoryOverview'>
            <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
              onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
              curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
            />
            <div className="overviewDesViewDiv panelBasic">
                <Widget.NoticeTitle title="发布公告详情" returnUrl="baseManage/noticeList" returnUrlName="返回发布公告" setCurName={data => dispatch(setCurName(data))} paterName="发布公告"/>

                <div className="staticDiv col-md-12">
                    <div className="staticLeftDiv">
                        <div className='repositoryAddHead'>
                          <span>发布公告的功能：发布一个或批量操作已经审核通过的公告。 </span>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                  <Widget.NavInfo noticeObj={noticeObj} isHistory={false} />
                </div>

            </div>

          </div>
      );
    }
});
function mapNoticeList(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { noticeObj } = state.noticeReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    noticeObj:noticeObj
  }
}
export default connect(mapNoticeList)(NoticeListDetails);
// module.exports = NoticeListDetails;
