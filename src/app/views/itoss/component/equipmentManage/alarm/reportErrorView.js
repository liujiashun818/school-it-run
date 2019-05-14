/**
 * Created by 聂天卓 on 2016/1/22.
 * 告警升级列表
 */

require('bootstrap');
require('bootstrap-table');
import React from 'react'
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

var dateChange = require('../../../../../utils/dateChange');
var base64 = require('../../../../../utils/base64');
var Util = require('../../baseManage/util');
var AlarmList = require('./alarmList');
var _this;
var bExportAlarmEventTable = false;

import { connect } from 'react-redux'
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action'
import * as indexAction from '../../../../../actions/index_action'
import * as noticeAction from '../../../../../actions/notice_action'

function pushOut(){
  return '<a class="pushOutA" href="javascript:void(0)" title="发布公告"><img src="img/itoss/report.png"/></a>';
};
function createMarkup() { return {
  __html: '<textarea id="rErrorText" name="content" style="width:100%;height:600px;"></textarea>'
}; };

KindEditor.ready(function(K) {
    window.editor = K.create('#rErrorText');
});

window.upBrandEvent = {
  'click .pushOutA':function(e, value, row, index){
    //console.log(row);
    var statu = row.status;
    if(statu == "已发公告"){
        alert("已将公告提交至审核，请勿重复发布");
        return false;
    };
    $("#reportErrorPushOutModal").modal("show");
    var info = "区域："+row.area+"\r时间："+row.date+"\r内容："+row.machinetype+"共有"+row.cycle+"条未处理的告警";
    window.editor.html(info);
    _this.setState({curRow:row});
  }
};
var ReportErrorView = React.createClass({
  mixins: [History],
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    getPureOrganizationData:React.PropTypes.array.isRequired,
    noticeLimitObj:React.PropTypes.object,
    reportErrorData:React.PropTypes.array.isRequired,
    equipmentTypes:React.PropTypes.array.isRequired,
    organizations:React.PropTypes.array.isRequired
  },
  getInitialState: function () {
      _this = this;
      return {
          curRow:""
      }
  },
  componentDidUpdate:function(){
    // console.log(this.state)
    // var tableData = this.state.itoss.reportErrorData;
    // $("#reportErrorList").bootstrapTable('load',tableData);

    //var treeObj = this.getFlux().store("YFTNoticeStore").getState().getPureOrganizationData;
    var treeObj = this.props.getPureOrganizationData;
    $(document).ready(function(){
      $.fn.zTree.init($("#noticeTree"), this.rSetting(), treeObj);
    }.bind(this));

    if(bExportAlarmEventTable) {
      $('#reportErrorList').bootstrapTable('refreshOptions', {
          pagination: false
      });
      $('#reportErrorList').tableExport({type:'excel'});
      bExportAlarmEventTable = false;
      $('#reportErrorList').bootstrapTable('refreshOptions', {
          pagination: true,
          pageSize: 15,
          pageList: [15,25,50,100]
      });
    }
  },
  componentDidMount:function(){
    //   dateChange.changeViewStyle();
    document.getElementById('alarmList_alarmUpdate').className = 'list-group-item active';

    if($('#reportErrorDiv') != null) {
      var height = $(window).height() - 110 - 30 + 'px';
      $('#reportErrorDiv').css("height",height);
    };
    $(window).resize(function(){
      if($('#reportErrorDiv') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
        $('#reportErrorDiv').css("height",height);
      };
    });

    $("#upbatchConfirmAlarmBtn").hide();
    // $("#upbatchContinueAlarmBtn").hide();
    $("#upcancelBatchBtn").hide();

    $("#reportErrorList").bootstrapTable({
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
            }, {
                title: '告警状态',
                field: 'status',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
              title: '发布公告',
              halign: 'left',
              align: 'left',
              events: upBrandEvent,
              formatter: pushOut
            }
        ],
        data: [],
        onClickRow: this.onRowClick,
        pagination: true,
        exportDataType:'all'
      });
      $("#tab-li-0-1").hide();

      var _this = this;
      var height = $(window).height();
      height = height-150;
      KindEditor.ready(function(K) {
          window.editor = K.create('#rErrorText',{
            afterChange:function(){
              _this.changeNoticeState();
            }
          });
      });

      // //var treeObj = this.getFlux().store("YFTNoticeStore").getState().getPureOrganizationData;
      // var treeObj = this.props.getPureOrganizationData;
      // $(document).ready(function(){
      //   $.fn.zTree.init($("#noticeTree"), this.rSetting(), treeObj);
      // }.bind(this));

      const {dispatch} = this.props;
      dispatch(indexAction.get_reportErrorData());
      dispatch(indexAction.get_reportErrorDataUI());
      dispatch(noticeAction.getPureOrganization(null));//获取组织结构数据.
      dispatch(noticeAction.setNoticeLimit(Util.getSlaLimit()));
  },
  rSetting:function(){
    var setting = {
      check: {
        enable: true
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        onCheck: this.myTest
      }
    }
    return setting;
  },
  myTest:function(){
    this.changeNoticeState();
  },
  changeNoticeState:function(){
    //this.getFlux().actions.YFTNoticeActions.setNoticeState();
    console.log("changeNoticeState");
    this.props.dispatch(noticeAction.setNoticeState(false));
  },
  _submit:function(){
    var treeObj = $.fn.zTree.getZTreeObj("noticeTree");
    var selectTreeNode = Util.getTreeNode(treeObj);
    editor.sync();
    var tContent = $('#rErrorText').val();
    var ttValue =tContent.replace(/&nbsp;/g,"");
    var tValu = ttValue.replace(/\s+/g,"");
    var flag = true;
    if($('#noticeTheme').find("input").val() == ""){
      // $("#noticeTheme").find(".alert-block").show();
      // flag = false;
      alert("信息发布主题不能为空!");
      return;
    }
    if(tValu == ""){
      // $("#topicInfo").find(".alert-block").show();
      alert("发布信息不能为空!");
      return;
      // flag = false;
    }
    if(selectTreeNode ==""){
      // $("#topicArea").find(".alert-block").show();
      alert("发布区域至少选择一项!");
      return;
      // flag = false;
    }
    if(flag){
      var gData =[{key:"SAFEGROUP_IDS",value:selectTreeNode}];
      var tData ={
        CreatedBy:$('#noticePerson').val(),
        topicName:$('#noticeTheme').find("input").val(),
        topicContent: tContent,
        topicStatus: "0"
        // descript:"待审核"
      }
      var allData={
        type:"noticSubmit",
        groupData:gData,
        topicData:tData
      };
      var crowList = [];
      var crow = this.state.curRow;
      crowList.push(crow);
      var param = [crowList,"2"];
      // this.getFlux().actions.YFTIndexActions.change_uploadErrorStatu(param);
      // this.getFlux().actions.YFTNoticeActions.addNotice(allData);
      this.props.dispatch(indexAction.change_uploadErrorStatu(param));
      this.props.dispatch(noticeAction.addNotice(allData));
    };
    $("#reportErrorPushOutModal").modal("hide");
  },
  _handleOnClick:function(e){
    switch (e.target.id) {
      case "reportConfigPage":
        this.history.pushState(null,'equipmentManage/alarmConfigPage');
        break;
      case "reportDownPage":
        this.history.pushState(null,'equipmentManage/alarmRulesIssuePage');
        break;
      case "reportEventPage":
        this.history.pushState(null,'equipmentManage/alarmEventPage');
        break;
      case "reportErrorPage":
        this.history.pushState(null,'equipmentManage/reportError');
        break;
      case "reportAlarmLog":
        this.history.pushState(null,'equipmentManage/alarmLogPage');
        break;
      case "reportAlarmRule":
        this.history.pushState(null,'equipmentManage/alarmRulePage');
        break;
    }
  },
  setCurArea:function(e){
    // console.log(e);
    var code = e.id;
    this.setState({areaCode:code});
  },
  setMeshineType:function(e){
    this.setState({meshineType:e});
  },
  _handleOnClickSearch:function(){
    var filter = [];
    var code = this.state.areaCode;
    if(code!=null&&code!=""){
      filter.push({key:"AREACODE",value:code});
    };
    var type = this.state.meshineType;
    if(type!=null&&type!=""&&type!="全部"){
      filter.push({key:"EQUIPMENTTYPE",value:type});
    };
    var isTime = $("input[name='alarmUpdate_radio']:checked").val();
    if(isTime>0){
      var startTime = $("#alarmUpdateStartTime").find("input").val();
      var endTime = $("#alarmUpdateEndTime").find("input").val();
      filter.push({key:"STARTTIME",value:startTime});
      filter.push({key:"ENDTIME",value:endTime});
    };
    //console.log(filter);
    //this.getFlux().actions.YFTIndexActions.get_reportErrorData(filter);
    this.props.dispatch(indexAction.get_reportErrorData(filter));
  },
  _handleOnClickBatch:function(){
    $("#upbatchBtn").hide();
    $("#upbatchConfirmAlarmBtn").show();
    // $("#upbatchContinueAlarmBtn").show();
    $("#upcancelBatchBtn").show();

    $('#reportErrorList').bootstrapTable('refreshOptions', {
        columns: [
            {
                field: 'state',
                checkbox: true
            }, {
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
            }, {
                title: '告警状态',
                field: 'status',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
              title: '发布公告',
              halign: 'left',
              align: 'left',
              events: upBrandEvent,
              formatter: pushOut
            }
        ]
    });
  },
  _handleOnClickCancelBatch:function(){
    $("#upbatchBtn").show();
    $("#upbatchConfirmAlarmBtn").hide();
    // $("#upbatchContinueAlarmBtn").hide();
    $("#upcancelBatchBtn").hide();

    $('#reportErrorList').bootstrapTable('refreshOptions', {
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
            }, {
                title: '告警状态',
                field: 'status',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
              title: '发布公告',
              halign: 'left',
              align: 'left',
              events: upBrandEvent,
              formatter: pushOut
            }
        ],
        pagination: true,
        exportDataType:'all'
    });
  },
  _handleOnClickBatchCheck:function(){
    var that = this;
    var selections = $('#reportErrorList').bootstrapTable('getSelections');
    if(selections.length != 0) {
      console.log(selections);
      var param = [selections,"1"];
      // that.getFlux().actions.YFTIndexActions.change_uploadErrorStatu(param);
      this.props.dispatch(indexAction.change_uploadErrorStatu(param));
    }else{
      alert("未选择告警事件");
      return false;
    };
    this._handleOnClickCancelBatch();
  },
  _handleOnClickBatchUnCheck:function(){
    var that = this;
    var selections = $('#reportErrorList').bootstrapTable('getSelections');
    if(selections.length != 0) {
      console.log(selections);
      var param = [selections,"0"];
      //that.getFlux().actions.YFTIndexActions.change_uploadErrorStatu(param);
      this.props.dispatch(indexAction.change_uploadErrorStatu(param));
    }else{
      alert("未选择告警事件");
      return false;
    };
    this._handleOnClickCancelBatch();
  },
  _handleOnClickExport:function(e){
    bExportAlarmEventTable = true;
    var filter = [];
    var code = this.state.areaCode;
    if(code!=null&&code!=""){
      filter.push({key:"AREACODE",value:code});
    };
    var type = this.state.meshineType;
    if(type!=null&&type!=""&&type!="全部"){
      filter.push({key:"EQUIPMENTTYPE",value:type});
    };
    var isTime = $("input[name='alarmUpdate_radio']:checked").val();
    if(isTime>0){
      var startTime = $("#alarmUpdateStartTime").find("input").val();
      var endTime = $("#alarmUpdateEndTime").find("input").val();
      filter.push({key:"STARTTIME",value:startTime});
      filter.push({key:"ENDTIME",value:endTime});
    };
    this.props.dispatch(indexAction.get_reportErrorData(filter));
  },
  render:function(){
    // console.log(this.state.itoss)
    var date = new Date();
    date.setDate(date.getDate() - 1);
    const { curThreeNode } = this.props;
    const { preThreeNode } = this.props;
    const { dispatch } = this.props;
    return (
      <div id='reportErrorDiv' className='overviewDesViewDiv reportErrorView'>
        <div className="leftListDiv col-md-1">
            <AlarmList curThreeNode={curThreeNode} preThreeNode={preThreeNode} onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))}
                onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))} curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}/>
        </div>
        <div className="col-md-11">
          <div className="modal fade" id="reportErrorPushOutModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document" style={{"width":"65%"}}>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">发布公告</h4>
                </div>
                <div className="modal-body">
                  <div className="createGroupDetailDiv slaTableStyle">
                    <div>&nbsp;</div>

                    <table className="sla-table-basic">
                      <tbody>
                        <tr>
                          <td style={{"width":"200px"}} className="slaTableFontBold slaTableFontCenter">起草人</td>
                          <td><input type="text" className="form-control" id="noticePerson" defaultValue={localStorage.getItem("USERNAME")}  disabled={true}/></td>
                          <td rowSpan="2" style={{"width":"300px"}} className="slaTableFontBold slaTableFontCenter">发布区域<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td style={{"width":"200px"}} className="slaTableFontBold slaTableFontCenter">信息发布主题<span className="slaPan"> *</span></td>
                          <td id="noticeTheme" className="table-basic-td-input">
                            <div className="alert-block">信息发布主题不能为空</div>
                            <input type="text" className="form-control" onChange={this.changeNoticeState}/>
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan="3" className="slaTableFontBold slaTableFontCenter">发布信息<span className="slaPan"> *</span></td>
                          <td id="topicInfo">
                            <div className="alert-block topicInfoStyle">发布信息不能为空</div>
                            <div dangerouslySetInnerHTML={createMarkup()}></div>
                          </td>
                          <td rowSpan="3" id="topicArea">
                            <div id = "shade"></div>
                            <div className="alert-block topicAreaStyle">发布区域至少选择一项</div>
                            <div className="repositoryOverview" style={{"height":"600px"}} onChange={this.changeNoticeState}><ul id="noticeTree" className="ztree"></ul></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                  <button type="button" className="btn btn-primary" onClick={this._submit}>发布</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="operationButtons">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        告警升级列表
                    </div>
                    <div className="titleRight">
                        <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                        <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="buttonInfo">
                        <p>告警升级列表的功能：查看某一时间段升级的告警，并可以对未确认告警升级记录进行确认告警和对告警升级记录进行发布公告操作处理。</p>
                        <button className="btn btnSave" onClick={this._handleOnClickSearch}>查询</button>
                        <button id="upbatchBtn" type="button" className="btn btnSave" onClick={this._handleOnClickBatch}>批量确认告警</button>
                        <button id="upbatchConfirmAlarmBtn" type="button" className="btn btnSave" onClick={this._handleOnClickBatchCheck}>确认告警</button>
                        <button id="upcancelBatchBtn" type="button" className="btn btnSave" onClick={this._handleOnClickCancelBatch}>取消</button>
                    </div>
                </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="reportErrorFilter">
              <table>
                <tbody>
                  <tr>
                    <td style={{"width":"25%","textAlign":"left","paddingLeft":"5px"}}>设备类型</td>
                    <td style={{"width":"25%"}}><ReactWidgets.DropdownList textField='name' data={this.props.equipmentTypes} onChange={this.setMeshineType}/></td>
                    <td style={{"width":"25%","textAlign":"left","paddingLeft":"5px"}}>是否查询时间</td>
                    <td style={{"width":"25%","textAlign":"left","paddingLeft":"5px"}}>
                      <label className="radioLabel">
                      <input id="alarmEvent_radio_yes" type="radio" name="alarmUpdate_radio" value="1"/> 是
                      </label>
                      <label className="radioLabel">
                      <input id="alarmEvent_radio_no" type="radio" name="alarmUpdate_radio" value="0" defaultChecked="true"/> 否
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td style={{"width":"25%","textAlign":"left","paddingLeft":"5px"}}>开始时间</td>
                    <td style={{"width":"25%"}}><ReactWidgets.DateTimePicker format={"yyyy-MM-dd HH:mm:ss"} defaultValue={date} id="alarmUpdateStartTime"/></td>
                    <td style={{"width":"25%","textAlign":"left","paddingLeft":"5px"}}>结束时间</td>
                    <td style={{"width":"25%"}}><ReactWidgets.DateTimePicker format={"yyyy-MM-dd HH:mm:ss"} defaultValue={new Date()} id="alarmUpdateEndTime"/></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-12 reportErrorTable">
            <div id='reportErrorTable-toolbar' className='col-md-12' style={{textAlign: "right"}}>
                <div id='toolbar-form' role='form'>
                    <div className='btn-group'>
                        <button className='btn dropdown-toggle' data-toggle='dropdown' type='button'>
                            <i className='glyphicon glyphicon-export icon-share'/>
                            <span className='caret'/>
                        </button>
                        <ul className='dropdown-menu dropdown-menu-right' role='menu'>
                            <li data-type='excel' onClick={this._handleOnClickExport}>
                                <a href='javascript:void(0)'>MS-Excel</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <table
              id='reportErrorList'
              data-toggle='table'
              data-classes='table table-no-bordered table-hover'
              data-show-refresh='false'
              data-show-toggle='false'
              data-show-columns='false'
              data-pagination='true'
              data-page-size='15'>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

function mapResourceState(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { reportErrorData,equipmentTypes, organizations } = state.indexReducer
  const { getPureOrganizationData,noticeLimitObj } = state.noticeReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    getPureOrganizationData:getPureOrganizationData,
    noticeLimitObj:noticeLimitObj,
    reportErrorData:reportErrorData,
    equipmentTypes:equipmentTypes,
    organizations:organizations,
    curName:curName
  }
}

export default connect(mapResourceState)(ReportErrorView)
