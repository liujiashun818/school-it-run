/*
页面外框框架，厅级首页
获取数据
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Util = require('../../baseManage/util');

var departmentIndexLine3 = React.createClass({
  mixins: [History],
  componentDidUpdate:function(){
    var data = this.props.data;
    var workOrderData = data.workOrderData;
    var alarmData = data.alarmData;
    var walarmData = [];
    if(alarmData.length>5){
      for(var i=0;i<5;i++){
        walarmData.push(alarmData[i]);
      };
    }else{
      walarmData = alarmData;
    };
    var systemInfo = data.systemInfo;
    $('#departmentIndexTable2').bootstrapTable('load',workOrderData);
    $('#departmentIndexTable3').bootstrapTable('load',walarmData);
    $('#departmentIndexTable4').bootstrapTable('load',systemInfo);
  },
  componentDidMount:function(){
    $('#departmentIndexTable2').bootstrapTable({
        columns: [
            {
                title: '工单主题',
                field: 'SUBJECT',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '工单创建人',
                field: 'CREATEBY',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '新建时间',
                field: 'CREATEDATA_TIME',
                halign: 'left',
                align: 'left',
                sortable: true
            }
        ],
        data: [],
        onClickRow: this.onRowClick,
      });

      $('#departmentIndexTable3').bootstrapTable({
          columns: [
              {
                  title: '区域',
                  field: 'area',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                  title: '设备类型',
                  field: 'machinetype',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                  title: '未处理故障数',
                  field: 'cycle',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }, {
                  title: '告警时间',
                  field: 'date',
                  halign: 'left',
                  align: 'left',
                  sortable: true
              }
          ],
          data: [],
          onClickRow: this.onRowClickUpLevel
        });

      $('#departmentIndexTable4').bootstrapTable({
        columns: [
            {
                title: '内容',
                field: 'TOPIC_CONTENT',
                halign: 'left',
                align: 'left',
                sortable: true
            }
        ],
        data: [],
        onClickRow: this.onRowClickReport
      });
  },
  onRowClick:function(e){
    var id = e.WORKORDER_ID;
    var flowid = e.WORKFLOW_ID;
    var filter = [{"key":"WORKORDER_ID","value":id}];
    this.props.setCurWorkFlowId(flowid);
    this.props.get_orderDetails(filter);
    //工单流程日志数据
    this.props.get_WorkFlowLogData(id);
    //工单处理信息
    this.props.get_WorkOrderProcessLogData(id);
    //清除 下级处理人 数据
    this.props.setCurrentNextPerson("");
    this.history.pushState(null,'operationManage/editOperation');
  },
  onRowClickReport:function(e){
    this.props.setNoticeObj(e);
    this.props.setNoticeLimit(Util.getSlaLimit());
    this.history.pushState(null,'baseManage/noticeHistoryListDetails');
  },
  onRowClickUpLevel:function(e){
    console.log(e);
  },
  toReportError:function(){
    this.props.setCurName("告警升级列表");
    this.history.pushState(null,'equipmentManage/reportError');
  },
  toSystemReport:function(){
    this.props.setCurName("历史发布");
    this.history.pushState(null,'baseManage/noticeHistoryList');
  },
  toWorkSpace:function(){
    this.props.setCurName("工作台");
    this.history.pushState(null,'operationManage/myWorkSpace');
  },
  render:function(){
    return (
      <div className='col-md-12'>
        <div className='col-md-5'>
          <label className="picTitle">系统公告</label>
          <button type='button' className="rightToPageBtn" onClick={this.toSystemReport}>更多&nbsp;<i className="fa fa-angle-double-right"></i></button>
          <div className="cityIndexPic" style={{"height":"500px"}}>
            <table id='departmentIndexTable4'
               data-toggle='table'
               data-classes='table table-no-bordered table-hover'
               data-show-refresh='false'
               data-show-toggle='false'
               data-show-columns='false'
               data-page-size='15'>
            </table>
          </div>
        </div>
        <div className='col-md-7 marginLeft'>
          <div className='col-md-12'>
            <label className="picTitle">我的待处理工单</label>
            <button type='button' className="rightToPageBtn" onClick={this.toWorkSpace}>更多&nbsp;<i className="fa fa-angle-double-right"></i></button>
            <div className="cityIndexPic">
              <table id='departmentIndexTable2'
                 data-toggle='table'
                 data-classes='table table-no-bordered table-hover'
                 data-show-refresh='false'
                 data-show-toggle='false'
                 data-show-columns='false'
                 data-pagination='false'
                 data-page-size='5'>
              </table>
            </div>
          </div>
          <div className='col-md-12'>
            <label className="picTitle">告警升级</label>
            <button type='button' className="rightToPageBtn" onClick={this.toReportError}>更多&nbsp;<i className="fa fa-angle-double-right"></i></button>
            <div className="cityIndexPic">
              <table id='departmentIndexTable3'
                 data-toggle='table'
                 data-classes='table table-no-bordered table-hover'
                 data-show-refresh='false'
                 data-show-toggle='false'
                 data-show-columns='false'
                 data-pagination='false'
                 data-page-size='5'>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = departmentIndexLine3;
