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

var NoticeTable = React.createClass({
    mixins: [History],
    getInitialState: function() {
      return {
        selectObj: {}
      };
    },
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
              var obj = {flag:"release",deleteObj:deleteObj};
              const { dispatch } = this.props;
              dispatch(noticeMultDelete(obj));

              // var data = this.getFlux().store("YFTNoticeStore").getState().queryNoticeData;
              // var data;
              // var multStr = Util.tableMultDeleteRefresh(data,selectMult);
              // this.createDeleteBtn();
              // var deleteObj = [{key:'TABLENAME',value:'TopicRelease'},{key:'KEYWORD',value:'RecId'},{key:'VALUE',value:multStr}];
              // var obj = {flag:"release",deleteObj:deleteObj};
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
      var updateObj = [{key:"TOPIC_STATUS",value:"1"}];//发布公告
      const { dispatch } = this.props;
      dispatch(queryNotice(updateObj));
      // this.getFlux().actions.YFTNoticeActions.queryNotice(updateObj);
        $('#hardwareAssetTable').bootstrapTable({
            exportDataType:"all",
            columns: [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '主题名称',
                    field: 'TOPIC_NAME',
                    sortable: true
                }, {
                    title: '提交人',
                    field: 'TOPIC_COMMITER',
                    sortable: true
                }, {
                    title: '审批人',
                    field: 'TOPIC_REVIEWER',
                    sortable: true
                }, {
                    title: '状态',
                    field: 'TOPIC_STATUS',
                    sortable: true
                },{
                    title: '处理时间',
                    field: 'TOPIC_LASTMODDATETIME',
                    sortable: true
                },{
                    title: '过期时间',
                    field: 'TOPIC_VALIDITYTIME',
                    sortable: true
                }
            ],
            data: [],//this.getFlux().store("YFTNoticeStore").getState().queryNoticeData
            onClickRow: this.navigateToDetail,
            exportDataType:"all"
        });
        // var noticeLimitObj = this.getFlux().store("YFTNoticeStore").getState().noticeLimitObj;
        // var noticeLimitObj;
        // if(noticeLimitObj.noticeReleaseDelete){
        //   this.createDeleteBtn();
        // }
    },
    componentDidUpdate:function(){
      $('#hardwareAssetTable').bootstrapTable('resetView');
      $('#hardwareAssetTable').bootstrapTable('refreshOptions', {
          data: this.props.queryNoticeData
      });

      // var delteBtns = $('.hardwareAssetTableBox').find("button[name='delete']");
      // if(delteBtns.length == 0){
      //   var quxianLimit = Util.getSlaLimit();
      //   if(quxianLimit.noticeReleaseDelete){
      //     this.createDeleteBtn();
      //   }
      // }
    },
    navigateToDetail: function(row, element) {
      // var zTree = $.fn.zTree.getZTreeObj("commonTree");
      // var treeNodes = zTree.getNodes();
      // var beforeNode = zTree.getNodeByParam("name","发布公告");
      // var targetNode = zTree.getNodeByParam("name","发布公告");
      // var tid = targetNode.tId;
      // var tIndex = zTree.getNodeIndex(targetNode);
      // document.getElementById(tid).className = "fadeInMenu";
      // zTree.selectNode(targetNode);
      // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
      // this.getFlux().actions.YFTIndexActions.set_linshiNode(beforeNode);

      // this.getFlux().actions.YFTNoticeActions.setNoticeObj(row);
      const { dispatch } = this.props;
      dispatch(setNoticeObj(row));
      this.props.setCurName("发布公告");
      this.history.pushState(null,'baseManage/noticeListDetails');
    },

    render: function() {
        return (
            <div className='hardwareAssetTableBox col-md-12 repositoryStyle'>
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
function mapNotice(state) {
  const { queryNoticeData } = state.noticeReducer

  return {
    queryNoticeData:queryNoticeData
  }
}

export default connect(mapNotice)(NoticeTable);
// module.exports = NoticeTable;
