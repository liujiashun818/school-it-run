var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Util = require('../../util');
import { connect } from 'react-redux';
import { getCheckPending,setCheckPendingObj,repositoryDelete } from '../../../../../../actions/repository_action';

var RepositoryTableBox = React.createClass({
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
              var cId = "";
              for(var i =0; i < selectMult.length; i++){
                if(i == selectMult.length-1){
                  mRecid = "'"+mRecid+selectMult[i].RECID+"'";
                  cId = cId+selectMult[i].id;
                }else{
                  mRecid = ""+mRecid+selectMult[i].RECID+"','";
                  cId = cId+selectMult[i].id+",";
                }
              }
              var obj = [{key:'TABLENAME',value:'FaultKnowledgeBase'},{key:'KEYWORD',value:'RecId'},{key:'VALUE',value:mRecid}];
              const { dispatch } = this.props;
              dispatch(repositoryDelete(obj));

              // var counts = cId.split(",");
              // var data = this.getFlux().store("YFTRepositoryStore").getState().checkPending;
              // var newData = [];
              // for(var y=0;y < data.length;y++){
              //   var has = false;
              //   for(var z =0;z < counts.length;z++){
              //     if(data[y].id == counts[z]){
              //       has = true;
              //       break;
              //     }
              //   }
              //   if(!has){
              //     newData.push(data[y]);
              //   }
              // }
              // for(var z=0;z < newData.length;z++){
              //   newData[z].id = z;
              // }
              //
              // $('#hardwareAssetTable').bootstrapTable('refreshOptions', {data: newData});
              // this.createDeleteBtn();
              // this.getFlux().actions.YFTRepositoryActions.repositoryDelete(obj);
            }else{
              return;
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
      var filter = [{key:"Status",value:"已提交"},{key:"Status",value:"审核不通过"}];
      // this.getFlux().actions.YFTRepositoryActions.getCheckPending(filter);
      const { dispatch } = this.props;
      dispatch(getCheckPending(filter));
      $('#hardwareAssetTable').bootstrapTable({
          columns: [
              {
                  field: 'state',
                  checkbox: true
              }, {
                  title: '主题',
                  field: 'THEME',
                  sortable: true
              }, {
                  title: '状态',
                  field: 'STATUS',
                  sortable: true
              }, {
                  title: '故障类型',
                  field: 'FAULT_NAME',
                  sortable: true
              }, {
                  title: '提交人',
                  field: 'CREATED_BY',
                  sortable: true
              }, {
                  title: '时间',
                  field: 'LAST_MOD_DATE_TIME',
                  sortable: true
              }
          ],
          data: [],//this.getFlux().store("YFTRepositoryStore").getState().checkPending
            onClickRow: this.navigateToDetail
        });

    },
    componentDidUpdate:function(){
      $('#hardwareAssetTable').bootstrapTable('resetView');
      $('#hardwareAssetTable').bootstrapTable('refreshOptions', {
          data: this.props.checkPending
      });

      // var delteBtns = $('.hardwareAssetTableBox').find("button[name='delete']");
      // if(delteBtns.length == 0){
      //   var repositoryLimitObj = Util.getSlaLimit();
      //   if(repositoryLimitObj.repositoryApprovalDelete){
      //     this.createDeleteBtn();
      //   }
      // }
    },

    navigateToDetail: function(row, element) {
      // var zTree = $.fn.zTree.getZTreeObj("commonTree");
      // var treeNodes = zTree.getNodes();
      // var beforeNode = zTree.getNodeByParam("name","审核知识");
      // var targetNode = zTree.getNodeByParam("name","审核知识");
      // // console.log(targetNode);
      // var tid = targetNode.tId;
      // var tIndex = zTree.getNodeIndex(targetNode);
      // document.getElementById(tid).className = "fadeInMenu";
      // zTree.selectNode(targetNode);
      // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
      // this.getFlux().actions.YFTIndexActions.set_linshiNode(beforeNode);

      // this.getFlux().actions.YFTRepositoryActions.setCheckPendingObj(row);
      const { dispatch } = this.props;
      dispatch(setCheckPendingObj(row));
      this.history.pushState(null,'baseManage/repositoryDetails');
    },

    render: function() {
        return (
            <div className='hardwareAssetTableBox col-md-12 repositoryStyle'>
                <table id='hardwareAssetTable'
                       data-toggle='table'
                       data-search='true'
                       data-classes='table table-no-bordered table-hover'
                       data-toolbar='#toolbar'
                       data-show-refresh='true'
                       data-show-toggle='true'
                       data-show-columns='true'
                       data-pagination='true'
                       data-show-export="true"
                       data-page-size='10'
                       data-resizable='true'>
                </table>
            </div>
        );
    }
});

function mapRepositoryTableBox(state) {
  const { checkPending } = state.repositoryReducer;
  return {
    checkPending:checkPending
  }
}

export default connect(mapRepositoryTableBox)(RepositoryTableBox);

// module.exports = RepositoryTableBox;
