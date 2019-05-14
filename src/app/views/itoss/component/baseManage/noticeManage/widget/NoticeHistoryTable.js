var React = require('react');
require('bootstrap');
require('bootstrap-table');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Util = require('../../util');
import { connect } from 'react-redux';
import { queryHistoryNotice,setNoticeObj,noticeMultDelete } from '../../../../../../actions/notice_action';

var NoticeHistoryTable = React.createClass({
    mixins: [History],
    createDeleteBtn:function(){
      var deleteBtnObj= document.createElement('button');
      deleteBtnObj.setAttribute('class', 'btn btn-default');
      deleteBtnObj.setAttribute('type', 'button');
      deleteBtnObj.setAttribute('name', 'delete');
      deleteBtnObj.setAttribute('title', '删除');
      deleteBtnObj.onclick = function() {
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
              var obj = {flag:"history",deleteObj:deleteObj};
              const { dispatch } = this.props;
              dispatch(noticeMultDelete(obj));

              // var data = this.getFlux().store("YFTNoticeStore").getState().queryTopicHistoryData;
              // var data ;
              // var multStr = Util.tableMultDeleteRefresh(data,selectMult);
              // this.createDeleteBtn();
              // var deleteObj = [{key:'TABLENAME',value:'TopicRelease'},{key:'KEYWORD',value:'RecId'},{key:'VALUE',value:multStr}];
              // var obj = {flag:"history",deleteObj:deleteObj};
              // // this.getFlux().actions.YFTNoticeActions.noticeMultDelete(obj);
              // var deleteRelation = [{key:'TABLENAME',value:'TopicReleaseReceiveOrganize'},{key:'KEYWORD',value:'topic_id'},{key:'VALUE',value:multStr}];
              // // this.getFlux().actions.YFTNoticeActions.noticeMultDelete(obj);
            }
          }else{
            return;
          }
      }.bind(this);
      deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';
      var btnGroup = document.getElementsByClassName('hardwareAssetTableBox')[0].firstChild.firstChild.childNodes[1];
      btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
    },
    componentDidMount: function() {
      var updateObj = [{key:"TOPIC_STATUS",value:"2"},{key:"TOPIC_RELEASE_IF_EXPIRED",value:"0"}];//已通过
      const { dispatch } = this.props;
      dispatch(queryHistoryNotice(updateObj));
      // this.getFlux().actions.YFTNoticeActions.queryHistoryNotice(updateObj);
        $('#hardwareAssetTable').bootstrapTable({
            exportDataType:"all",
            columns: [
                {
                    field: 'state',
                    checkbox: true,
                    width: "2%"
                },{
                    title: '主题名称',
                    field: 'TOPIC_NAME',
                    sortable: true,
                    width: "24%"
                }, {
                    title: '起草人',
                    field: 'TOPIC_COMMITER',
                    sortable: true,
                    width: "11%"
                },{
                    title: '审批人',
                    field: 'TOPIC_REVIEWER',
                    sortable: true,
                    width: "11%"
                },{
                    title: '发布人',
                    field: 'TOPIC_RELEASER',
                    sortable: true,
                    width: "11%"
                }, {
                    title: '状态',
                    field: 'TOPIC_STATUS',
                    sortable: true,
                    width: "11%"
                }, {
                    title: '处理时间',
                    field: 'TOPIC_LASTMODDATETIME',
                    sortable: true,
                    width: "15%"
                },{
                    title: '过期时间',
                    field: 'TOPIC_VALIDITYTIME',
                    sortable: true,
                    width: "15%"
                }
            ],
            onClickRow: this.navigateToDetail,
            exportDataType:"all"
        });
        // var noticeLimitObj = this.getFlux().store("YFTNoticeStore").getState().noticeLimitObj;
        // var noticeLimitObj;
        // if(noticeLimitObj.noticeHistoryDelete){
        //   this.createDeleteBtn();
        // }
    },
    componentDidUpdate:function(){
      $('#hardwareAssetTable').bootstrapTable('resetView');
      $('#hardwareAssetTable').bootstrapTable('refreshOptions', {
          data: this.props.queryTopicHistoryData
      });
      // var delteBtns = $('.hardwareAssetTableBox').find("button[name='delete']");
      // if(delteBtns.length == 0){
      //   var quxianLimit = Util.getSlaLimit();
      //   if(quxianLimit.noticeHistoryDelete){
      //     this.createDeleteBtn();
      //   }
      // }
    },

    navigateToDetail: function(row, element) {
      // var zTree = $.fn.zTree.getZTreeObj("commonTree");
      // var treeNodes = zTree.getNodes();
      // var beforeNode = zTree.getNodeByParam("name","历史发布");
      // var targetNode = zTree.getNodeByParam("name","历史发布");
      // var tid = targetNode.tId;
      // var tIndex = zTree.getNodeIndex(targetNode);
      // document.getElementById(tid).className = "fadeInMenu";
      // zTree.selectNode(targetNode);

      // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
      // this.getFlux().actions.YFTIndexActions.set_linshiNode(beforeNode);
      //
      const { dispatch } = this.props;
      dispatch(setNoticeObj(row));
      // this.getFlux().actions.YFTNoticeActions.setNoticeObj(row);
      this.props.setCurName("历史发布");
      this.history.pushState(null,'baseManage/noticeHistoryListDetails');
    },
    historyDelete:function(){
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
          var obj = {flag:"history",deleteObj:deleteObj};
          const { dispatch } = this.props;
          dispatch(noticeMultDelete(obj));
        }
      }
    },
    render: function() {
      var quxianLimit = Util.getSlaLimit();
        return (
            <div className='hardwareAssetTableBox col-md-12 repositoryStyle'>
              <div style={{float:"left",color:"#F00",marginLeft:"10px"}}>
                {quxianLimit.noticeHistoryDelete ? <input type="button" className="yunweiDelete yunweiHeight y-f-historyDelete" value="删除" onClick={this.historyDelete}/> : ""}
              </div>
                <table id='hardwareAssetTable'
                       data-toggle='table'
                       data-search='true'
                       data-classes='table table-no-bordered table-hover'
                       data-toolbar='#toolbar'
                       data-show-export="true"
                       data-show-refresh='true'
                       data-show-toggle='true'
                       data-show-columns='true'
                       data-pagination='true'
                       data-page-size='10'
                       data-resizable='true'>
                </table>
            </div>
        );
    }
});

function mapNoticeHistory(state) {
  const { queryTopicHistoryData } = state.noticeReducer

  return {
    queryTopicHistoryData:queryTopicHistoryData
  }
}

export default connect(mapNoticeHistory)(NoticeHistoryTable);
