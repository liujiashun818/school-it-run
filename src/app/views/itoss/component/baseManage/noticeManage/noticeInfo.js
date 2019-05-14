/**
* 张锌楠
* 新建公告
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var ReactWidgets = require('react-widgets');
var Util = require('../util');
var Widget = require('./widget/Widget');
import { connect } from 'react-redux';
import { setCurThreeNode,setPreThreeNode,setCurName } from '../../../../../actions/navbar_action';
import { getPureOrganization,addNotice } from '../../../../../actions/notice_action';

$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});

function createMarkup() { return {
  __html: '<textarea id="editor_id" name="content" style="width:100%;height:600px;"></textarea>'
}; };

function Shade(){
  var s = document.getElementById("shade");
  s.style.display = "none";
};

var NoticeInfo = React.createClass({
    // mixins: [Navigation, FluxMixin, StoreWatchMixin("YFTNoticeStore")],
    getInitialState: function() {
      return {
        faultId: "",
        faultSubId:""
      };
    },
    componentWillMount:function(){
      const { dispatch } = this.props;
      dispatch(getPureOrganization(null));
      // this.getFlux().actions.YFTNoticeActions.getPureOrganization(null);//获取组织结构数据.
      // this.getFlux().actions.YFTNoticeActions.setNoticeLimit(Util.getSlaLimit());
    },
    myTest:function(){
      this.changeNoticeState();
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
          },
      		onCheck: this.myTest
      	}
      }
      return setting;
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",150);
      var _this = this;
        KindEditor.ready(function(K) {
            window.editor = K.create('#editor_id',{
              afterChange:function(){
                _this.changeNoticeState();
              }
            });
        });

        // var treeObj = this.getFlux().store("YFTNoticeStore").getState().getPureOrganizationData;
        // var treeObj = this.props.getPureOrganizationData;
        // $(document).ready(function(){
        //   $.fn.zTree.init($("#noticeTree"), this.rSetting(), treeObj);
        // }.bind(this));

        $("#noticeTheme").mouseover(function(){
            $(this).find(".alert-block").hide();
        });
        $("#topicInfo,#topicArea").mouseover(function(){
            $(this).find(".alert-block").hide();
        });

    },
    componentDidUpdate:function(){
      var treeObj = this.props.getPureOrganizationData;
      $(document).ready(function(){
        $.fn.zTree.init($("#noticeTree"), this.rSetting(), treeObj);
      }.bind(this));
    },
    _submit:function(){
      var treeObj = $.fn.zTree.getZTreeObj("noticeTree");
      var selectTreeNode = Util.getTreeNode(treeObj);
      editor.sync();
      var tContent = $('#editor_id').val();
      var ttValue =tContent.replace(/&nbsp;/g,"");
      var tValu = ttValue.replace(/\s+/g,"");
      var topicValidityTime = new Date(Date.parse($("#topicValidityTime").find("input").val().replace(/-/,"/")));
      var flag = true;
      if($("#topicValidityTime").find('input').val().trim() == ""){
        $.showPublicDialog('提示','公告过期时间不能为空!');
        return;
      }
      if(!Util.isTimeGood(topicValidityTime)){
        $.showPublicDialog('提示','过期时间不能小于或等于当天时间!');
        return;
      }
      if($('#noticeTheme').find("input").val() == ""){
        // $("#noticeTheme").find(".alert-block").show();
        // flag = false;
        $.showPublicDialog('提示','信息发布主题不能为空!');
        return;
      }
      if(tValu == ""){
        $.showPublicDialog('提示','发布信息不能为空!');
        // $("#topicInfo").find(".alert-block").show();
        return;
        // flag = false;
      }
      if(selectTreeNode ==""){
        $.showPublicDialog('提示','发布区域至少选择一项!');
        // $("#topicArea").find(".alert-block").show();
        return;
        // flag = false;
      }
      if(flag){
        var gData =[{key:"SAFEGROUP_IDS",value:selectTreeNode}];
        var tData ={
          CreatedBy:$('#noticePerson').val(),
          validityTime:topicValidityTime,
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
        const { dispatch } = this.props;
        dispatch(addNotice(allData));
        // this.getFlux().actions.YFTNoticeActions.addNotice(allData);
      }
    },
    changeNoticeState:function(){
      // this.getFlux().actions.YFTNoticeActions.setNoticeState();
    },
    render:function(){
      const { dispatch } = this.props;
      // var noticeObj = this.getFlux().store("YFTNoticeStore").getState().noticeObj;
      var noticeObj;
      return(
          <div className='repositoryOverview'>

            <Widget.NavLeft curThreeNode={this.props.curThreeNode} preThreeNode={this.props.preThreeNode}
              onGetCurThreeNode={curNode => dispatch(setCurThreeNode(curNode))} onGetPreThreeNode={curNode => dispatch(setPreThreeNode(curNode))}
              curName={this.props.curName} setCurName={data => dispatch(setCurName(data))}
            />

            <div className="overviewDesViewDiv panelBasic">

                <Widget.NoticeTitle title="新建公告" returnUrl="baseManage/noticeSubmitList" returnUrlName="返回已创建公告" setCurName={data => dispatch(setCurName(data))} paterName="已创建公告"/>

                <div className="staticDiv col-md-12">
                    <div className="staticLeftDiv">
                        <div className='repositoryAddHead'>
                          <span>已创建公告的功能：创建一个新的公告，并可查看用户创建的公告。</span>
                        </div>
                        <div className='btnGroupDiv2'>
                            <button type="button" className="repositorySubmit yunweiHeight" onClick={this._submit} style={false ? {"backgroundColor":"#9EAAAA"}:{"backgroundColor":"#00b724"}} disabled={false ? true:false}>提交</button>
                        </div>
                    </div>
                </div>
                <div className="createGroupDetailDiv slaTableStyle">
                  <div>&nbsp;</div>

                  <table className="sla-table-basic">
                    <tbody>
                      <tr>
                        <td style={{"width":"200px"}} className="slaTableFontBold slaTableFontCenter">起草人</td>
                        <td><input type="text" className="form-control" id="noticePerson" defaultValue={localStorage.getItem("USERNAME")}  disabled={true}/></td>
                        <td style={{"width":"200px"}} className="slaTableFontBold slaTableFontCenter">过期时间</td>
                        <td><ReactWidgets.DateTimePicker format={"yyyy-MM-dd"} id="topicValidityTime" defaultValue={Util.getCurrentMonthLastDay()} time={false} /></td>
                        <td rowSpan="2" style={{"width":"300px"}} className="slaTableFontBold slaTableFontCenter">发布区域<span className="slaPan"> *</span></td>
                      </tr>
                      <tr>
                        <td colSpan="1" style={{"width":"200px"}} className="slaTableFontBold slaTableFontCenter">信息发布主题<span className="slaPan"> *</span></td>
                        <td colSpan="3" id="noticeTheme" className="table-basic-td-input">
                          <div className="alert-block">信息发布主题不能为空</div>
                          <input type="text" className="form-control" onChange={this.changeNoticeState}/>
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan="3" className="slaTableFontBold slaTableFontCenter">发布信息<span className="slaPan"> *</span></td>
                        <td colSpan="3" id="topicInfo">
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

          </div>
      );
    }
});

function mapNoticeInfo(state) {
  const { curThreeNode,preThreeNode,curName } = state.navbarReducer
  const { getPureOrganizationData } = state.noticeReducer

  return {
    curThreeNode:curThreeNode,
    preThreeNode:preThreeNode,
    curName:curName,
    getPureOrganizationData:getPureOrganizationData
  }
}

export default connect(mapNoticeInfo)(NoticeInfo);

// KindEditor.ready(function(K) {
//     window.editor = K.create('#editor_id');
// });
// module.exports = NoticeInfo;
