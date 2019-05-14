var React = require('react');
require('bootstrap');
require('bootstrap-table');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Util = require('../../util');
import { connect } from 'react-redux';
import { queryNotice,setNoticeObj,noticeMultDelete } from '../../../../../../actions/notice_action';

var DatedTopicTable = React.createClass({
    mixins: [History],
    createDeleteBtn:function(){
      var deleteBtnObj= document.createElement('button');
      deleteBtnObj.setAttribute('class', 'btn btn-default');
      deleteBtnObj.setAttribute('type', 'button');
      deleteBtnObj.setAttribute('name', 'delete');
      deleteBtnObj.setAttribute('title', '删除');
      deleteBtnObj.onclick = function() {
          var selectMult = $('#datedTopicTable').bootstrapTable('getSelections');
          if(selectMult instanceof Array && selectMult.length > 0){
            if(confirm("确认要删除吗?")){

              // var mRecid = "";
              // for(var i =0; i < selectMult.length; i++){
              //   if(i == selectMult.length-1){
              //     mRecid = "'"+mRecid+selectMult[i].RECID+"'";
              //   }else{
              //     mRecid = ""+mRecid+selectMult[i].RECID+"','";
              //   }
              // }

              var mRecid = "";
              for(var i =0; i < selectMult.length; i++){
                if(i == selectMult.length-1){
                  mRecid = "'"+mRecid+selectMult[i].TOPIC_ID+"'";
                }else{
                  mRecid = ""+mRecid+selectMult[i].TOPIC_ID+"','";
                }
              }

              var deleteObj = [{key:'TABLENAME',value:'TopicRelease'},{key:'KEYWORD',value:'RecId'},{key:'VALUE',value:mRecid}];
              var obj = {flag:"dated",deleteObj:deleteObj};
              var deleteRelation = [{key:'TABLENAME',value:'TopicReleaseReceiveOrganize'},{key:'KEYWORD',value:'topic_id'},{key:'VALUE',value:mRecid}];
              const { dispatch } = this.props;
              dispatch(noticeMultDelete(obj));
              //TODO 关系没有删除

              // var data = this.getFlux().store("YFTNoticeStore").getState().queryNoticeData;
              // var data ;
              // var multStr = Util.tableMultDeleteRefreshDated(data,selectMult);
              // this.createDeleteBtn();
              // var deleteObj = [{key:'TABLENAME',value:'TopicRelease'},{key:'KEYWORD',value:'RecId'},{key:'VALUE',value:multStr}];
              // var obj = {flag:"dated",deleteObj:deleteObj};
              // // this.getFlux().actions.YFTNoticeActions.noticeMultDelete(obj);
              // var deleteRelation = [{key:'TABLENAME',value:'TopicReleaseReceiveOrganize'},{key:'KEYWORD',value:'topic_id'},{key:'VALUE',value:multStr}];
              // // this.getFlux().actions.YFTNoticeActions.noticeMultDelete(obj);
            }
          }else{
            return;
          }
      }.bind(this);
      deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';
      var btnGroup = document.getElementsByClassName('datedTopicTableBox')[0].firstChild.firstChild.childNodes[1];
      btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
    },
    componentDidMount: function() {
      var updateObj = [{key:"TOPIC_STATUS",value:"2"},{key:"TOPIC_RELEASE_IF_EXPIRED",value:"1"}];//已通过
      const { dispatch } = this.props;
      dispatch(queryNotice(updateObj));
      // this.getFlux().actions.YFTNoticeActions.queryNotice(updateObj);
        $('#datedTopicTable').bootstrapTable({
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
      $('#datedTopicTable').bootstrapTable('resetView');
      $('#datedTopicTable').bootstrapTable('refreshOptions', {
          data: this.props.queryNoticeData
      });
      // var delteBtns = $('.datedTopicTableBox').find("button[name='delete']");
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
      // // console.log(targetNode);
      // var tid = targetNode.tId;
      // var tIndex = zTree.getNodeIndex(targetNode);
      // document.getElementById(tid).className = "fadeInMenu";
      // zTree.selectNode(targetNode);

      // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
      // this.getFlux().actions.YFTIndexActions.set_linshiNode(beforeNode);
      //
      // this.getFlux().actions.YFTNoticeActions.setNoticeObj(row);
      const { dispatch } = this.props;
      dispatch(setNoticeObj(row));
      this.props.setCurName("历史发布");
      this.history.pushState(null,'baseManage/noticeHistoryListDetails');
    },
    historyDelete:function(){
      var selectMult = $('#datedTopicTable').bootstrapTable('getSelections');
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
          var obj = {flag:"dated",deleteObj:deleteObj};
          var deleteRelation = [{key:'TABLENAME',value:'TopicReleaseReceiveOrganize'},{key:'KEYWORD',value:'topic_id'},{key:'VALUE',value:mRecid}];
          const { dispatch } = this.props;
          dispatch(noticeMultDelete(obj));
        }
      }
    },
    render: function() {
      var quxianLimit = Util.getSlaLimit();
        return (
            <div className='hardwareAssetTableBox col-md-12 repositoryStyle datedTopicTableBox'>
                <div style={{float:"left",color:"#F00",marginLeft:"10px"}}>
                    {/**<input type="button" className="operationCreateFlowBtn" value="shan" onClick={this.onClickCreate}/>*/}
                    {quxianLimit.noticeHistoryDelete ? <input type="button" className="yunweiDelete yunweiHeight y-f-historyDelete" value="删除" onClick={this.historyDelete}/> : ""}
                </div>
                <table id='datedTopicTable'
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
  const { queryNoticeData } = state.noticeReducer

  return {
    queryNoticeData:queryNoticeData
  }
}

export default connect(mapNoticeHistory)(DatedTopicTable);
