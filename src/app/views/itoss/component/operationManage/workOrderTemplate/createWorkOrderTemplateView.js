require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as OperationActions from '../../../../../actions/operation_action'

var ReactWidgets = require('react-widgets');
var ConfirmChangeWorkOrderTemplateInfoModal = require('./confirmChangeWorkOrderTemplateInfoModal');

var templateTypeData=[
    {id:"0", name:"工单主页"},
    {id:"1", name:"处理表单"}
];

var CreateWorkOrderTemplateView = React.createClass({
  mixins: [History],
  // getStateFromFlux: function() {
  //     var flux = this.getFlux();
  //     return {
  //         itoss_system:flux.store("YFTSystemStore").getState()
  //     }
  // },
  getInitialState: function() {
      return {
          title: "",
          description: "",
          templateType: templateTypeData[0],
          typeDisable: false
      }
  },

  componentDidMount: function() {
      if($('#createWorkOrderTemplateView_desView') != null) {
          var height = $(window).height() - 110 - 30 + 'px';
          $('#createWorkOrderTemplateView_desView').css("height",height);
      }

      const { workOrderTemplateOperationFlag, selectedWorkOrderTemplate } = this.props;
    //   var temp = localStorage.getItem("PERMISSIONS");
    //   temp = base64.base64decode(temp);
    //   temp = decodeURI(temp);
    //   var permissionsValue = eval(temp);
    //   var bShowEdit = false;
    //   for(var i = 0; i < permissionsValue.length; i++) {
    //       if(permissionsValue[i].resourceType == "/systemmanage/userlist/update") {
    //           bShowEdit = true;
    //       }
    //   }
      var bShowEdit = true;

      if(workOrderTemplateOperationFlag != "add") {
          this.setState({title: "工单模板-编辑模板"});
          this.setState({description: "编辑模板的主要功能：修改工单模板信息"});
          if(bShowEdit) {
              if(workOrderTemplateOperationFlag == "show") {
                  $("#createWorkOrderTemplateView_editBtn").show();
                  $("#createWorkOrderTemplateView_saveBtn").hide();
              }
              else if(workOrderTemplateOperationFlag == "edit") {
                  $("#createWorkOrderTemplateView_editBtn").hide();
                  $("#createWorkOrderTemplateView_saveBtn").show();
              }
          }
          else {
              $("#createWorkOrderTemplateView_editBtn").hide();
              $("#createWorkOrderTemplateView_saveBtn").hide();
          }

          if(workOrderTemplateOperationFlag == "show") {
              document.getElementById("template_name").disabled = true;
              document.getElementById("template_description").disabled = true;
            //   document.getElementById("template_type").disabled = true;
              this.setState({typeDisable: true});
              document.getElementById("template_entity").disabled = true;
              document.getElementById("template_isEnable").disabled = true;
              document.getElementById("template_content").disabled = true;
          }
          document.getElementById("template_name").value = selectedWorkOrderTemplate.t_name;
          document.getElementById("template_description").value = selectedWorkOrderTemplate.t_descript;
          for(var i = 0; i < templateTypeData.length; i++) {
              if(templateTypeData[i].id == selectedWorkOrderTemplate.t_type) {
                  this.setState({templateType: templateTypeData[i]});
                  break;
              }
          }
          document.getElementById("template_entity").value = selectedWorkOrderTemplate.t_entity;
          $("#template_isEnable").attr("checked", selectedWorkOrderTemplate.t_isEnable ? true : false);
          document.getElementById("template_content").value = selectedWorkOrderTemplate.t_content;
      }
      else {
          this.setState({title: "工单模板-新建模版"});
          this.setState({description: "新建模板的主要功能：创建新的工单模板"});
          $("#createWorkOrderTemplateView_editBtn").hide();
          $("#createWorkOrderTemplateView_saveBtn").show();
      }
  },

  shouldComponentUpdate: function(nextProps, nextState){
    if (nextProps.workOrderTemplateOperationFlag !== this.props.workOrderTemplateOperationFlag) {
        if(nextProps.workOrderTemplateOperationFlag != "add") {
            if(nextProps.workOrderTemplateOperationFlag == "show") {
                document.getElementById("template_name").disabled = true;
                document.getElementById("template_description").disabled = true;
              //   document.getElementById("template_type").disabled = true;
                this.setState({typeDisable: true});
                document.getElementById("template_entity").disabled = true;
                document.getElementById("template_isEnable").disabled = true;
                document.getElementById("template_content").disabled = true;
            }
            else if(nextProps.workOrderTemplateOperationFlag == "edit") {
                document.getElementById("template_name").disabled = false;
                document.getElementById("template_description").disabled = false;
              //   document.getElementById("template_type").disabled = false;
                this.setState({typeDisable: false});
                document.getElementById("template_entity").disabled = false;
                document.getElementById("template_isEnable").disabled = false;
                document.getElementById("template_content").disabled = false;
            }
        }
    }
    return true;
  },

  // componentDidUpdate: function() {
  //     const { workOrderTemplateOperationFlag } = this.props;
  //     if(workOrderTemplateOperationFlag != "add") {
  //         if(workOrderTemplateOperationFlag == "show") {
  //             document.getElementById("template_name").disabled = true;
  //             document.getElementById("template_description").disabled = true;
  //           //   document.getElementById("template_type").disabled = true;
  //             this.setState({typeDisable: true});
  //             document.getElementById("template_entity").disabled = true;
  //             document.getElementById("template_isEnable").disabled = true;
  //             document.getElementById("template_content").disabled = true;
  //         }
  //         else if(workOrderTemplateOperationFlag == "edit") {
  //             document.getElementById("template_name").disabled = false;
  //             document.getElementById("template_description").disabled = false;
  //           //   document.getElementById("template_type").disabled = false;
  //             this.setState({typeDisable: false});
  //             document.getElementById("template_entity").disabled = false;
  //             document.getElementById("template_isEnable").disabled = false;
  //             document.getElementById("template_content").disabled = false;
  //         }
  //     }
  // },

  _handleOnClickBack: function() {
      const { workOrderTemplateOperationFlag, workOrderTemplateInfoChangeFlag } = this.props;
      if(workOrderTemplateOperationFlag != "add" && workOrderTemplateInfoChangeFlag) {
          $("#confirmChangeWorkOrderTemplateInfoModal").modal("show");
      }
      else {
          this.history.pushState(null,'operationmanage/workOrderTemplateList');
      }
  },

  _handleOnClickEdit: function() {
      const { dispatch, selectedWorkOrderTemplate } = this.props;
      dispatch(OperationActions.set_selectedWorkOrderTemplate({workOrderTemplate:selectedWorkOrderTemplate, flag:"edit"}));
      $("#createWorkOrderTemplateView_editBtn").hide();
      $("#createWorkOrderTemplateView_saveBtn").show();
  },

  _handleOnClickSave: function() {
      const { dispatch, selectedWorkOrderTemplate, workOrderTemplateOperationFlag } = this.props;
      var template_name = $.trim($("#template_name").val());
      if(template_name==null||template_name==""){
          setTimeout(function(){
              document.getElementById('publicMessageModelTitle').innerHTML = "提示"
              document.getElementById('publicMessageModalcontent').innerHTML = "请填写模板名称"
              $('#publicMessageModal').modal('show');
          },100);
          return false;
      }

      var template_entity = $.trim($("#template_entity").val());
      if(template_entity==null||template_entity==""){
          setTimeout(function(){
              document.getElementById('publicMessageModelTitle').innerHTML = "提示"
              document.getElementById('publicMessageModalcontent').innerHTML = "请填写模板实例"
              $('#publicMessageModal').modal('show');
          },100);
          return false;
      }

      if(workOrderTemplateOperationFlag != "add") {
          var dataObj = {
              RecId: selectedWorkOrderTemplate.RecId,
              t_name: template_name,
              t_descript: $.trim($("#template_description").val()),
              t_type: this.state.templateType.id,
              t_entity: template_entity,
              t_isEnable: document.getElementById("template_isEnable").checked,
              t_content: $.trim($("#template_content").val())
          }
          dispatch(OperationActions.edit_workOrderTemplate(dataObj));
      }
      else {
          var dataObj = {
              t_name: template_name,
              t_descript: $.trim($("#template_description").val()),
              t_type: this.state.templateType.id,
              t_entity: template_entity,
              t_isEnable: document.getElementById("template_isEnable").checked,
              t_content: $.trim($("#template_content").val())
          }
          dispatch(OperationActions.add_workOrderTemplate(dataObj));
      }
  },

  _handleOnChangeTemplateType: function(e) {
      const { dispatch, workOrderTemplateOperationFlag, selectedWorkOrderTemplate } = this.props;
      this.setState({templateType: e});

      if(workOrderTemplateOperationFlag != "add") {
          var bChanged = false;
          if(document.getElementById("template_name").value != selectedWorkOrderTemplate.t_name) bChanged = true;
          if(document.getElementById("template_description").value != selectedWorkOrderTemplate.t_descript) bChanged = true;
          if(document.getElementById("template_entity").value != selectedWorkOrderTemplate.t_entity) bChanged = true;
          if(document.getElementById("template_isEnable").checked != selectedWorkOrderTemplate.t_isEnable) bChanged = true;
          if(document.getElementById("template_content").value != selectedWorkOrderTemplate.t_content) bChanged = true;
          if(e.id != selectedWorkOrderTemplate.t_type) {
              bChanged = true;
          }
          dispatch(OperationActions.setWorkOrderTemplateInfoChangeFlag(bChanged));
      }
  },

  checkInfoChanged:function(e){
      const { dispatch, workOrderTemplateOperationFlag, selectedWorkOrderTemplate } = this.props;
      if(workOrderTemplateOperationFlag != "add") {
          var bChanged = false;
          if(document.getElementById("template_name").value != selectedWorkOrderTemplate.t_name) bChanged = true;
          if(document.getElementById("template_description").value != selectedWorkOrderTemplate.t_descript) bChanged = true;
          if(document.getElementById("template_entity").value != selectedWorkOrderTemplate.t_entity) bChanged = true;
          if(document.getElementById("template_isEnable").checked != selectedWorkOrderTemplate.t_isEnable) bChanged = true;
          if(document.getElementById("template_content").value != selectedWorkOrderTemplate.t_content) bChanged = true;
          if(this.state.templateType.id != selectedWorkOrderTemplate.t_type) {
              bChanged = true;
          }
          dispatch(OperationActions.setWorkOrderTemplateInfoChangeFlag(bChanged));
      }
  },

  render:function(){
      const { dispatch, selectedWorkOrderTemplate, workOrderTemplateInfoChangeFlag } = this.props;
      return (
          <div id='createWorkOrderTemplateView' className='overviewDiv'>
              <ConfirmChangeWorkOrderTemplateInfoModal selectedWorkOrderTemplate={selectedWorkOrderTemplate} templateType={this.state.templateType}
                  edit_workOrderTemplate={dataObj=>dispatch(OperationActions.edit_workOrderTemplate(dataObj))}/>
              <div id='createWorkOrderTemplateView_desView' className='overviewDesViewDiv'>
                  <div className="operationButtons">
                      <div className="titleDiv col-md-12">
                          <div className="titleLeft">
                              {this.state.title}
                          </div>
                          <div className="titleRight">
                            <a className="backSpaceText" onClick={this._handleOnClickBack}>返回模板列表</a>
                              <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                          </div>
                      </div>
                      <div className="col-md-12">
                          <div className="buttonInfo">
                              <p>{this.state.description}</p>
                              <button id="createWorkOrderTemplateView_editBtn" className="btn" onClick={this._handleOnClickEdit}>编辑</button>
                              <button id="createWorkOrderTemplateView_saveBtn" className="btn" onClick={this._handleOnClickSave}>保存</button>
                          </div>
                      </div>
                  </div>
                  <div className='operationCreateTableDiv col-md-12'>
                      <ul className="nav nav-tabs">
                          <li className="active"><a href="#createWorkOrderTemplateView_desView_tab_1" data-toggle="tab">模板详情{workOrderTemplateInfoChangeFlag?<span style={{"color":"#FF0000"}}>*</span>:""}</a></li>
                      </ul>
                      <fieldset>
                          <div className="contentDiv tab-content marginleft_none">
                              <div className="tab-pane active" id="createWorkOrderTemplateView_desView_tab_1">
                                  <div className="operationFormDiv" style={{borderTop:"3px #f1f1f1 solid",marginTop:"10px"}}>
                                    <div className="col-md-12">
                                      <table>
                                        <tbody>
                                          <tr>
                                            <th>模版名称<span style={{"color":"#FF0000"}}>*</span></th>
                                            <td colSpan="5"><input id="template_name" type="text" className="form-control" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}/></td>
                                          </tr>
                                          <tr>
                                            <th>模版描述</th>
                                            <td colSpan="5"><textarea id="template_description" className="form-control orderExplain" placeholder="模版描述" rows="5" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}></textarea></td>
                                          </tr>
                                          <tr>
                                            <th>模版类型<span style={{"color":"#FF0000"}}>*</span></th>
                                            <td style={{"width":"20%"}}><ReactWidgets.DropdownList id="template_type" data={templateTypeData} value={this.state.templateType} textField="name" onChange={this._handleOnChangeTemplateType} disabled={this.state.typeDisable}/></td>
                                            <th>模版实例<span style={{"color":"#FF0000"}}>*</span></th>
                                            <td style={{"width":"20%"}}><input id="template_entity" type="text" className="form-control" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}/></td>
                                            <th>是否可用<span style={{"color":"#FF0000"}}>*</span></th>
                                            <td>
                                                <label style={{marginBottom:"0"}}>
                                                    <input id="template_isEnable" type="checkbox" className="input-checkbox" defaultChecked={true} onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}/>可用
                                                </label>
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>模版内容</th>
                                            <td colSpan="5"><textarea id="template_content" className="form-control orderExplain" placeholder="模版内容" rows="25" onPropertyChange={this.checkInfoChanged} onInput={this.checkInfoChanged}></textarea></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </fieldset>
                  </div>
              </div>
          </div>
      );
  }
});

$(window).resize(function () {
    if($('#createWorkOrderTemplateView_desView') != null) {
        var height = $(window).height() - 110 - 30 + 'px';
        $('#createWorkOrderTemplateView_desView').css("height",height);
    }
});

// module.exports = CreateWorkOrderTemplateView;
CreateWorkOrderTemplateView.propTypes = {
    workOrderTemplateInfoChangeFlag: PropTypes.bool.isRequired,
    workOrderTemplateOperationFlag: PropTypes.string.isRequired,
    selectedWorkOrderTemplate: PropTypes.object,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { workOrderTemplateInfoChangeFlag, workOrderTemplateOperationFlag, selectedWorkOrderTemplate } = state.operationReducer
  return {
    workOrderTemplateInfoChangeFlag,
    workOrderTemplateOperationFlag,
    selectedWorkOrderTemplate
  }
}

export default connect(mapStateToProps)(CreateWorkOrderTemplateView)
