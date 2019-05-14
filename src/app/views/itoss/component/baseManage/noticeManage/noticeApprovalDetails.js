/**
* 张锌楠
* 审核公告
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var ReactWidgets = require('react-widgets');
var Util = require('../util');
var Widget = require('./widget/Widget');
import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action';
import { getPureOrganization,getTopicReceiverOrganization,updateNotice,setTopicReceives } from '../../../../../actions/notice_action';

$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});

function createMarkup() { return {
  __html: '<textarea id="editor_approval" name="content" style="width:100%;height:600px;"></textarea>'
}; };

var noticeApprovalDetails = React.createClass({
    mixins: [History],
    getInitialState: function() {
      return {
        isDisabled:true,
        faultId: "",
        faultSubId:""
      };
    },
    componentWillMount:function(){
      const { dispatch } = this.props;
      dispatch(getPureOrganization(null));
      var noticeObj = this.props.noticeObj;
      this.props.dispatch(setCurName("审核公告"));
      if(typeof(noticeObj.TOPIC_ID) == "undefined"){
        this.history.pushState(null,'baseManage/noticeApproval');
        return;
      }
      var topicObj = [{key:"TOPIC_ID",value:noticeObj.TOPIC_ID}];
      dispatch(getTopicReceiverOrganization(topicObj));
    },
    onClickChild:function(treeNode){
      var zTree = $.fn.zTree.getZTreeObj("noticeTree");
      var checkedState = treeNode.checked;
      if(checkedState){
        checkedState = false;
      }else{
        checkedState = true;
      };
      zTree.checkNode(treeNode,checkedState,true);
    },
    rSetting:function(){
      var _this = this;
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
          beforeClick: function(treeId, treeNode) {
            _this.onClickChild(treeNode);
          }
        }
      }
      return setting;
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",150);
      $("#noticeTheme,#topicInfo,#topicArea").mouseover(function(){
          $(this).find(".alert-block").hide();
      });
      // 初始化树的状态和编辑器的状态
      var noticeObj = this.props.noticeObj;
      try {
        KindEditor.ready(function(K) {
            window.editor = K.create('#editor_approval');
        });
        editor.html(noticeObj.TOPIC_CONTENT);
        editor.readonly(true);
      } catch (e) {

      }

    },
    componentDidUpdate:function(){
        var treeData = this.props.getPureOrganizationData;
        $.fn.zTree.init($("#noticeTree"), this.rSetting(), treeData);
        //设置组织树选项
        var treeObj = $.fn.zTree.getZTreeObj("noticeTree");
        var selectArray = this.props.selectPureOrganizationData;
        Util.setTreeNode(treeObj,selectArray);
        // 初始化树的状态和编辑器的状态
        Util.setTreeDisabled(treeObj,this.state.isDisabled);
    },
    _submit:function(){
      var treeObj = $.fn.zTree.getZTreeObj("noticeTree");
      var selectTreeNode = Util.getTreeNode(treeObj);
      editor.sync();
      var tContent = $('#editor_approval').val();
      var ttValue =tContent.replace(/&nbsp;/g,"");
      var tValu = ttValue.replace(/\s+/g,"");

      if(this.state.isDisabled){
        this.setState({isDisabled:false});
        Util.setTreeDisabled(treeObj,false);
        editor.readonly(false);
      }else{
        // var noticeObj = this.getFlux().store("YFTNoticeStore").getState().noticeObj;
        var noticeObj = this.props.noticeObj;
        var flag = true;
        var topicValidityTime = new Date(Date.parse($("#topicValidityTime").find("input").val().replace(/-/,"/")));
        if($("#topicValidityTime").find("input").val().trim() == ""){
          $.showPublicDialog('提示','公告过期时间不能为空');
          return false;
        }
        if(!Util.isTimeGood(topicValidityTime)){
          alert("过期时间不能小于或等于当天时间!");
          return false;
        }
        if($('#noticeTheme').val() == ""){
          // $("#noticeTheme").find(".alert-block").show();
          $.showPublicDialog('提示','信息发布主题不能为空');
          return false;
        }
        if(tValu == ""){
          // $("#topicInfo").find(".alert-block").show();
          $.showPublicDialog('提示','发布信息不能为空');
          return false;
        }
        if(selectTreeNode ==""){
          // $("#topicArea").find(".alert-block").show();
          $.showPublicDialog('提示','发布区域至少选择一项');
          return false;
        }
        if(flag){
          var dataObj ={
            CreatedBy:$('#noticePerson').val(),
            topicName:$('#noticeTheme').val(),
            validityTime: new Date(Date.parse($('#topicValidityTime').find("input").val().replace(/-/,"/"))),
            topicContent: $('#editor_approval').val()
          }
          var needUpdate = {
            type:"approval",
            RecId:noticeObj.TOPIC_ID,
            updateObj:dataObj
          };
          // this.getFlux().actions.YFTNoticeActions.updateNotice(needUpdate);
          const { dispatch } = this.props;
          dispatch(updateNotice(needUpdate));

          //修改发布区域状态
          var gData = [{key:"TOPIC_ID",value:noticeObj.TOPIC_ID},{key:"SAFEGROUP_IDS",value:Util.getTreeNode(treeObj)}];
          var allData={
            groupData:gData
          };
          dispatch(setTopicReceives(allData));
          // this.getFlux().actions.YFTNoticeActions.setTopicReceives(allData);

          this.setState({isDisabled:true});
          editor.readonly(true);
          Util.setTreeDisabled(treeObj,true);
        }
      }
    },
    _promptInfo:function(){
      var name=prompt("请输入不通过原因","");
      if(name.trim() == ""){
        $.showPublicDialog('提示','请输入不通过原因');
        name = this._promptInfo();
      }
      return name;
    },
    _checkBtn:function(e){
      if(e.currentTarget.id =="checkPass"){
        if(confirm("确认审核通过?")){
          // var noticeObj = this.getFlux().store("YFTNoticeStore").getState().noticeObj;
          var noticeObj = this.props.noticeObj;
          var dataObj ={
            topicStatus:"1",
            topicReviewer: localStorage.getItem("localUserName")
          }
          var needUpdate = {
            type:"pass",
            RecId:noticeObj.TOPIC_ID,
            updateObj:dataObj
          };
          const { dispatch } = this.props;
          dispatch(updateNotice(needUpdate));
          // this.getFlux().actions.YFTNoticeActions.updateNotice(needUpdate);
        }
      }else if(e.currentTarget.id =="checkNotPass"){
        var inputValue = $('#message-text').val();
        if(inputValue == "" || inputValue.trim() ==""){
          $.showPublicDialog('提示','内容不能为空!');
          return;
        }
            // var noticeObj = this.getFlux().store("YFTNoticeStore").getState().noticeObj;
            var noticeObj = this.props.noticeObj;
            var dataObj ={
              topicStatus:"-1",
              descript:inputValue,
              topicReviewer: localStorage.getItem("localUserName")
            }
            var needUpdate = {
              type:"nopass",
              RecId:noticeObj.TOPIC_ID,
              updateObj:dataObj
            };
            const { dispatch } = this.props;
            dispatch(updateNotice(needUpdate));
            // this.getFlux().actions.YFTNoticeActions.updateNotice(needUpdate);
            $('#myModal').modal('hide');
      }
    },
    _cleanText:function(){
      $('#message-text').val("");
    },
    render:function(){
      const { dispatch } = this.props;
      // var noticeObj = this.getFlux().store("YFTNoticeStore").getState().noticeObj;
      // var noticeLimitObj = this.getFlux().store("YFTNoticeStore").getState().noticeLimitObj;
      var noticeObj = this.props.noticeObj ;
      var noticeLimitObj = Util.getSlaLimit();
      return(
          <div className='repositoryOverview'>

            <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">审核不通过原因</h4>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <textarea className="form-control" id="message-text" rows="8" autofocus="autofocus"></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this._cleanText}>关闭</button>
                    <button id="checkNotPass" type="button" className="btn btn-primary" onClick={this._checkBtn}>保存</button>
                  </div>
                </div>
              </div>
            </div>

            <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
              onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
              curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
            />

            <div className="overviewDesViewDiv panelBasic">
                <Widget.NoticeTitle title="审核公告详情" returnUrl="baseManage/noticeApproval" returnUrlName="返回审核公告"  setCurName={data => dispatch(setCurName(data))} paterName="审核公告"/>

                <div className="staticDiv col-md-12">
                    <div className="staticLeftDiv">
                        <div className='repositoryAddHead'>
                          <span>审核公告的功能：审核已经创建的公告。</span>
                        </div>
                        <div className='btnGroupDiv2'>
                          { noticeLimitObj.noticeApprovalPassOrNo ?
                          <span>
                            <button id="checkPass" type="button" className="repositorySubmit yunweiHeight" onClick={this._checkBtn} disabled={!this.state.isDisabled ? true:false} style={!this.state.isDisabled ? {"backgroundColor":"#8B968D"}:{"backgroundColor":"#0EBB30"}}>审核通过</button>
                            <button type="button" className="repositorySubmit yunweiHeight" style={{"marginLeft":"10px"}} data-toggle="modal" data-target="#myModal" disabled={!this.state.isDisabled ? true:false} style={!this.state.isDisabled ? {"backgroundColor":"#8B968D","marginLeft":"10px"}:{"backgroundColor":"#0EBB30","marginLeft":"10px"}}>审核不通过</button>
                          </span>
                          :""}
                          { noticeLimitObj.noticeApprovalUpdate ?
                          <span>
                            <button id="checkSave" type="button" className="repositorySubmit yunweiHeight" onClick={this._submit} style={{"marginLeft":"10px"}}>{this.state.isDisabled ? "编辑":"提交"}</button>
                          </span>
                          :""}
                        </div>
                    </div>
                </div>
                <div className="createGroupDetailDiv slaTableStyle">
                  <div>&nbsp;</div>

                  <table className="sla-table-basic">
                    <tbody>
                      <tr>
                        <td style={{"width":"200px"}} className="slaTableFontBold slaTableFontCenter">起草人</td>
                        <td><input type="text" className="form-control" id="noticePerson" defaultValue={noticeObj.TOPIC_COMMITER} disabled={true}/></td>
                        <td style={{"width":"200px"}} className="slaTableFontBold slaTableFontCenter">过期时间</td>
                        <td>
                          <div className="alert-block topicAreaStyle">公告过期时间不能为空</div>
                          <ReactWidgets.DateTimePicker id="topicValidityTime" format={"yyyy-MM-dd"} defaultValue={new Date(noticeObj.TOPIC_VALIDITYTIME)} disabled={this.state.isDisabled} time={false} />
                        </td>
                        <td rowSpan="2" style={{"width":"300px"}} className="slaTableFontBold slaTableFontCenter">发布区域<span className="slaPan"> *</span></td>
                      </tr>
                      <tr>
                        <td style={{"width":"200px"}} className="slaTableFontBold slaTableFontCenter">信息发布主题<span className="slaPan"> *</span></td>
                        <td colSpan="3" className="table-basic-td-input">
                          <div className="alert-block">信息发布主题不能为空</div>
                          <input type="text" className="form-control" id="noticeTheme" defaultValue={noticeObj.TOPIC_NAME} disabled={this.state.isDisabled}/>
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan="3" className="slaTableFontBold slaTableFontCenter">发布信息<span className="slaPan"> *</span></td>
                        <td colSpan="3" id="topicInfo">
                          <div className="alert-block topicInfoStyle">发布信息不能为空</div>
                          <div dangerouslySetInnerHTML={createMarkup()}></div>
                        </td>
                        <td rowSpan="3" id="topicArea">
                          <div className="alert-block topicAreaStyle">发布区域至少选择一项</div>
                          <div className="repositoryOverview" style={{"height":"600px"}} disabled={true}><ul id="noticeTree" className="ztree"></ul></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

            </div>

          </div>
      );
    }
});

KindEditor.ready(function(K) {
    window.editor = K.create('#editor_approval');
});

function mapNoticeApprovalDetails(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { noticeObj,getPureOrganizationData,selectPureOrganizationData } = state.noticeReducer
  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    noticeObj:noticeObj,
    getPureOrganizationData:getPureOrganizationData,
    selectPureOrganizationData:selectPureOrganizationData
  }
}
export default connect(mapNoticeApprovalDetails)(noticeApprovalDetails);
// module.exports = noticeApprovalDetails;
