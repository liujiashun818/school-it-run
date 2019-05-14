var React = require('react');
var ReactRouter = require('react-router');
// var Navigation = require('react-router').Navigation;
var History = ReactRouter.History;
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;

var Util = require('../../util');
var CommonTree = require('../../../monitorTree/commonTree');

var NavLeft = React.createClass({
  mixins: [History],
  getInitialState:function(){
    return {
      treeData:[]
    }
  },
  _handleOnClick: function(e) {
      if(e.target.id == 'borrowing'){
          this.history.pushState(null,'baseManage/noticeHistoryList');
      }else if(e.target.id == 'create'){
          this.history.pushState(null,'baseManage/noticeInfo');
      }else if(e.target.id == 'repair'){
          this.history.pushState(null,'baseManage/noticeSubmitList');
      }else if(e.target.id == 'allocate'){
          this.history.pushState(null,'baseManage/noticeApproval');
      }else if(e.target.id == 'overview'){
          this.history.pushState(null,'baseManage/noticeList');
      }
  },
  componentDidMount:function(){
    $(".list-group").find("a").each(function(){
      var $node = $(this);
      $node.mouseover(function(){
        var claz = $node.attr("class");
        var ind = claz.indexOf("active");
        if(ind>=0){
          $node.attr("class","");
          $node.attr("class","list-group-item fadeInMenu active");
        }else{
          $node.attr("class","list-group-item fadeInMenuHover");
        };
      });
      $node.mouseout(function(){
        var claz = $node.attr("class");
        var ind = claz.indexOf("active");
        if(ind>=0){
          $node.attr("class","");
          $node.attr("class","list-group-item fadeInMenu active");
        }else{
          $node.attr("class","list-group-item fadeOutMenuHover");
        };
      });
    });

    var list = [];
    var noticeLimitObj= Util.getSlaLimit();;
    if(noticeLimitObj.noticeHistory){
      list.push({id:1,name:"历史发布",pid:0,toUrl:"baseManage/noticeHistoryList"});
    };
    if(noticeLimitObj.noticeSubmit){
      list.push({id:2,name:"已创建公告",pid:0,toUrl:"baseManage/noticeSubmitList"});
    };
    if(noticeLimitObj.noticeApproval){
      list.push({id:3,name:"审核公告",pid:0,toUrl:"baseManage/noticeApproval"});
    };
    if(noticeLimitObj.noticeRelease){
      list.push({id:4,name:"发布公告",pid:0,toUrl:"baseManage/noticeList"});
    };
    this.setState({treeData:list});
  },
    render: function() {
      var noticeLimitObj= Util.getSlaLimit();;
      var treeData = this.state.treeData;
      if(treeData.length > 0 && treeData != null){
        return (
          <div className='leftListDiv col-md-1 yunweiLeft'>
            <div className="assetManageListDiv">
              <CommonTree data={treeData} curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
                curName={this.props.curName} setCurName={this.props.setCurName} onGetCurThreeNode={this.props.onGetCurThreeNode}
                onGetPreThreeNode={this.props.onGetPreThreeNode}/>
            </div>
          </div>
        );
      }else{
        return (
          <div className='leftListDiv col-md-1 yunweiLeft'>
            <div className="assetManageListDiv">
                <div className="iq-list">
                    <div className="list-group">
                      {noticeLimitObj.noticeHistory ?
                        <a id="borrowing" className="list-group-item" onClick={this._handleOnClick}>历史发布</a>
                      :""}
                      {noticeLimitObj.noticeSubmit ?
                        <a id="repair" className="list-group-item" onClick={this._handleOnClick}>已创建公告</a>
                      :""}
                      {noticeLimitObj.noticeApproval ?
                        <a id="allocate" className="list-group-item" onClick={this._handleOnClick}>审核公告</a>
                      :""}
                      {noticeLimitObj.noticeRelease ?
                        <a id="overview" className="list-group-item" onClick={this._handleOnClick}>发布公告</a>
                      :""}
                    </div>
                </div>
            </div>
          </div>
        );
      }
    }
});

var NoticeTitle = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     notice:flux.store("YFTNoticeStore").getState()
    //   }
    // },
    onhandleClick:function(){
        // var zTree = $.fn.zTree.getZTreeObj("commonTree");
        // var treeNodes = zTree.getNodes();
        // var beforeNode = null;
        // var targetNode = null;
        // if(this.props.returnUrl == "baseManage/noticeSubmitList"){
        //   beforeNode = zTree.getNodeByParam("name","已创建公告");
        //   targetNode = zTree.getNodeByParam("name","已创建公告");
        // }
        // else if(this.props.returnUrl == "baseManage/noticeList"){
        //   beforeNode = zTree.getNodeByParam("name","发布公告");
        //   targetNode = zTree.getNodeByParam("name","发布公告");
        // }
        // else if(this.props.returnUrl == "baseManage/noticeHistoryList"){
        //   beforeNode = zTree.getNodeByParam("name","历史发布");
        //   targetNode = zTree.getNodeByParam("name","历史发布");
        // }
        // else if(this.props.returnUrl == "baseManage/noticeApproval"){
        //   beforeNode = zTree.getNodeByParam("name","审核公告");
        //   targetNode = zTree.getNodeByParam("name","审核公告");
        // };
        // var tid = targetNode.tId;
        // var tIndex = zTree.getNodeIndex(targetNode);
        // document.getElementById(tid).className = "fadeInMenu";
        // zTree.selectNode(targetNode);
        // // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
        // // this.getFlux().actions.YFTIndexActions.set_linshiNode(beforeNode);

        this.props.setCurName(this.props.paterName);
        this.history.pushState(null,this.props.returnUrl);
    },
    render: function() {
        return (
          <div className="titleDiv col-md-12">
              <div className="titleLeft">
                  发布管理-{this.props.title}
              </div>
              <div className="titleRight2">
                  <a href="javascript:void(0)" onClick={this.onhandleClick}>{this.props.returnUrlName}</a>
                  <a ><i title ="返回工作台" className="fa fa-question-circle fa-lg" style={{marginLeft: '8px'}}></i></a>
                  <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
              </div>
          </div>
        );
    }
});
var NavInfo = React.createClass({
  componentDidMount: function() {
    var height = $(window).height();
    height = height-150;
    $(".panelBasic").css("height",height+"px");
  },
    render: function() {
      var noticeObj = this.props.noticeObj;
      var item = [];
      item.push(<div className="history-container modify-time-container" style={{marginLeft:"20px"}}>
          <span className="time">发布人：</span>
          <span className="time" title={noticeObj.TOPIC_RELEASER}>{noticeObj.TOPIC_RELEASER}</span>
      </div>);
      item.push(<div className="vline size-info-line"></div>);
        return (
          <div className="topicPreview panelBasic">
            <h3>{noticeObj.TOPIC_NAME}</h3>
            <div className="history-content">
              <div className="history-container">
                  <span className="history-text">创建人：</span>
                  <span className="history-name" title={noticeObj.TOPIC_COMMITER}>{noticeObj.TOPIC_COMMITER}</span>
              </div>
              <div className="vline file-info-line"></div>
              <div className="history-container modify-time-container">
                  <span className="time">审批人：</span>
                  <span className="time" title={noticeObj.TOPIC_REVIEWER}>{noticeObj.TOPIC_REVIEWER}</span>
              </div>
              <div className="vline size-info-line"></div>
              {
                this.props.isHistory ? item : ""
              }
              <div className="history-container modify-time-container history-time">
                  <span className="time">创建时间：</span>
                  <span className="time">{noticeObj.TOPIC_LASTMODDATETIME}</span>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{__html:noticeObj.TOPIC_CONTENT}}></div>
          </div>
        );
    }
});

module.exports = {
  NavLeft:NavLeft,
  NoticeTitle:NoticeTitle,
  NavInfo:NavInfo
};
