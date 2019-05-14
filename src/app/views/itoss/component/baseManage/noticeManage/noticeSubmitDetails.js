/**
* 张锌楠
* 已创建公告-编辑":"保存
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
  __html: '<textarea id="editor_id" name="content" style="width:100%;height:600px;"></textarea>'
}; };

var NoticeSubmitDetails = React.createClass({
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
      // this.getFlux().actions.YFTNoticeActions.getPureOrganization(null);//获取组织结构数据.
      var noticeObj = this.props.noticeObj;
      // var noticeObj = this.getFlux().store("YFTNoticeStore").getState().noticeObj;
      this.props.dispatch(setCurName("已创建公告"));
      if(typeof(noticeObj.TOPIC_ID) == "undefined"){
        this.history.pushState(null,'baseManage/noticeSubmitList');
        return;
      }
      var topicObj = [{key:"TOPIC_ID",value:noticeObj.TOPIC_ID}];
      dispatch(getTopicReceiverOrganization(topicObj));
      // this.getFlux().actions.YFTNoticeActions.getTopicReceiverOrganization(topicObj);//获取发布区域选择项
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
              window.editor = K.create('#editor_id');
          });
          editor.html(noticeObj.TOPIC_CONTENT);
          editor.readonly(true);
        } catch (e) {

        }

    },
    componentDidUpdate:function(){
      var treeObjData = this.props.getPureOrganizationData;
      $(document).ready(function(){
        $.fn.zTree.init($("#noticeTree"), this.rSetting(), treeObjData);
      }.bind(this));
      //设置组织树选项
      var treeObj = $.fn.zTree.getZTreeObj("noticeTree");
      // var selectArray = this.getFlux().store("YFTNoticeStore").getState().selectPureOrganizationData;
      var selectArray = this.props.selectPureOrganizationData;
      Util.setTreeNode(treeObj,selectArray);
      Util.setTreeDisabled(treeObj,this.state.isDisabled);
    },
    _submit:function(){
      var treeObj = $.fn.zTree.getZTreeObj("noticeTree");
      var selectTreeNode = Util.getTreeNode(treeObj);
      editor.sync();
      var tContent = $('#editor_id').val();
      var ttValue =tContent.replace(/&nbsp;/g,"");
      var tValu = ttValue.replace(/\s+/g,"");

      if(this.state.isDisabled){
        this.setState({isDisabled:false});
        // Util.setTreeDisabled(treeObj,false);
        editor.readonly(false);
      }else{
        // var noticeObj = this.getFlux().store("YFTNoticeStore").getState().noticeObj;
        var noticeObj = this.props.noticeObj;
        var flag = true;
        var topicValidityTime = new Date(Date.parse($("#topicValidityTime").find("input").val().replace(/-/,"/")));
        if($("#topicValidityTime").find("input").val().trim() == ""){
          alert("公告过期时间不能为空!!");
          return;
        }
        if(!Util.isTimeGood(topicValidityTime)){
          alert("过期时间不能小于或等于当天时间!");
          return;
        }
        if($('#noticeTheme').find("input").val() == ""){
          $("#noticeTheme").find(".alert-block").show();
          flag = false;
        }
        if(tValu == ""){
          $("#topicInfo").find(".alert-block").show();
          flag = false;
        }
        if(selectTreeNode ==""){
          $("#topicArea").find(".alert-block").show();
          flag = false;
        }
        if(flag){
          var dataObj ={
            CreatedBy:$('#noticePerson').val(),
            validityTime:topicValidityTime,
            topicName:$('#noticeTheme').find("input").val(),
            topicContent: $('#editor_id').val(),
            topicStatus: "0",
            descript:""
          }
          var needUpdate = {
            type:"update",
            RecId:noticeObj.TOPIC_ID,
            updateObj:dataObj
          };
          const { dispatch } = this.props;
          dispatch(updateNotice(needUpdate));
          // this.getFlux().actions.YFTNoticeActions.updateNotice(needUpdate);
          this.setState({isDisabled:true});
          editor.readonly(true);
          //修改发布区域状态
          var gData = [{key:"TOPIC_ID",value:noticeObj.TOPIC_ID},{key:"SAFEGROUP_IDS",value:Util.getTreeNode(treeObj)}];
          var allData={
            groupData:gData
          };
          dispatch(setTopicReceives(allData));
          // this.getFlux().actions.YFTNoticeActions.setTopicReceives(allData);
        }
      }
    },

    render:function(){
      const { dispatch } = this.props;
      // var noticeObj = this.getFlux().store("YFTNoticeStore").getState().noticeObj;
      // var noticeLimitObj = this.getFlux().store("YFTNoticeStore").getState().noticeLimitObj;
      var noticeObj=this.props.noticeObj ;
      var noticeLimitObj=Util.getSlaLimit();
      return(
          <div className='repositoryOverview'>

            <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
              onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
              curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
            />

            <div className="overviewDesViewDiv panelBasic">
                <Widget.NoticeTitle title="已创建公告" returnUrl="baseManage/noticeSubmitList" returnUrlName="返回已创建公告" setCurName={data => dispatch(setCurName(data))}  paterName="已创建公告"/>

                <div className="staticDiv col-md-12">
                    <div className="staticLeftDiv">
                        <div className='repositoryAddHead'>
                          <span>已创建公告的功能：创建一个新的公告，并可查看用户创建的公告。</span>
                        </div>
                        <div className='btnGroupDiv2'>
                          { noticeLimitObj.noticeSubmitUpdate ?
                            <button type="button" className="repositorySubmit yunweiHeight" onClick={this._submit}>{this.state.isDisabled ? "编辑":"保存"}</button>
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
                        <td><ReactWidgets.DateTimePicker format={"yyyy-MM-dd"} id="topicValidityTime" defaultValue={new Date(noticeObj.TOPIC_VALIDITYTIME)} disabled={this.state.isDisabled} time={false} /></td>
                        <td rowSpan="2" style={{"width":"300px"}} className="slaTableFontBold slaTableFontCenter">发布区域<span className="slaPan"> *</span></td>
                      </tr>
                      <tr>
                        <td style={{"width":"200px"}} className="slaTableFontBold slaTableFontCenter">信息发布主题<span className="slaPan"> *</span></td>
                        <td colSpan="3" id="noticeTheme" className="table-basic-td-input">
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
                          <div className="repositoryOverview" style={{"height":"600px"}}><ul id="noticeTree" className="ztree"></ul></div>
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
    window.editor = K.create('#editor_id');
});

function mapNoticeSubmitDetails(state) {
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
export default connect(mapNoticeSubmitDetails)(NoticeSubmitDetails);
// noticeObj

// module.exports = NoticeSubmitDetails;
