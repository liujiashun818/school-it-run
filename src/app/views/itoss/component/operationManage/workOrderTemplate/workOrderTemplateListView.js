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
import * as FlowdesignActions from '../../../../../actions/flowdesign_action'

var base64 = require('../../../../../utils/base64');
var ConfirmDeleteWorkOrderTemplateModal = require('./confirmDeleteWorkOrderTemplateModal');

function typeFormatter(value, row) {
    switch (value) {
        case "0":
            return "工单主页";
            break;
        case "1":
            return "处理表单";
            break;
        default:
            return value;
            break;
    }
}

function isEnableFormatter(value, row) {
    if(value == true) {
        return "是";
    }
    else {
        return "否";
    }
}

function editFormatter(value, row) {
    return [
        '<a class="editWorkOrderTemplate" href="javascript:void(0)"><i class="fa fa-pencil-square-o"></i></a>'
    ].join('');
}

var _this;
window.operateTemplateEvents = {
    'click .editWorkOrderTemplate': function (e, value, row, index) {
        const { dispatch } = _this.props;
        dispatch(OperationActions.set_selectedWorkOrderTemplate({workOrderTemplate:row, flag:"edit"}));
        dispatch(OperationActions.setWorkOrderTemplateInfoChangeFlag(false));
        _this.history.pushState(null,'operationmanage/createWorkOrderTemplate');
    },
};

// var bShowAdd = false, bShowEdit = false, bShowDelete = false;
var bShowAdd = true, bShowEdit = true, bShowDelete = true;
var refreshBtnObj, deleteBtnObj, addBtnObj;
var WorkOrderTemplateListView = React.createClass({
  mixins: [History],
  // getStateFromFlux: function() {
  //     var flux = this.getFlux();
  //     return {
  //         //itoss_system:flux.store("YFTSystemStore").getState()
  //     }
  // },

  getInitialState: function () {
      _this = this;
      return {
          workOrderTemplateNum: 0
      }
  },

  componentWillMount: function() {
      const { dispatch } = this.props;
      dispatch(FlowdesignActions.get_workOrderTemplates());
  },

  componentDidMount: function() {
      if(document.getElementById('workOrderTemplateListView_desView') != null) {
          document.getElementById('workOrderTemplateListView_desView').style.height = $(window).height() - 110 - 30 + 'px';
      }

    //   var temp = localStorage.getItem("PERMISSIONS");
    //   temp = base64.base64decode(temp);
    //   temp = decodeURI(temp);
    //   var permissionsValue = eval(temp);
    //   for(var i = 0; i < permissionsValue.length; i++) {
    //       if(permissionsValue[i].resourceType == "/systemmanage/userlist/add") {
    //           bShowAdd = true;
    //       }
    //       else if(permissionsValue[i].resourceType == "/systemmanage/userlist/update") {
    //           bShowEdit = true;
    //       }
    //       else if(permissionsValue[i].resourceType == "/systemmanage/userlist/delete") {
    //           bShowDelete = true;
    //       }
    //   }

      var tableColumns = [
          {
              field: 'state',
              radio: true
          }, {
              title: '模板名称',
              field: 't_name',
              sortable: true
          }, {
              title: '模板类型',
              field: 't_type',
              formatter: typeFormatter,
              sortable: true
          }, {
              title: '模版实例',
              field: 't_entity',
              sortable: true
          }, {
              title: '是否可用',
              field: 't_isEnable',
              formatter: isEnableFormatter,
              sortable: true
          }
      ];
      if(bShowEdit) {
          tableColumns.push(
              {
                  title: '编辑',
                  events: operateTemplateEvents,
                  formatter: editFormatter
              }
          );
      }
      $('#workOrderTemplateListTable').bootstrapTable({
          columns: tableColumns,
          data: [],
          onDblClickRow: this.showWorkOrderTemplateInfo,
          singleSelect: 'true'
      });

      var _this = this;
      refreshBtnObj= document.createElement('button');
      refreshBtnObj.setAttribute('class', 'btn btn-default');
      refreshBtnObj.setAttribute('type', 'button');
      refreshBtnObj.setAttribute('name', 'refresh');
      refreshBtnObj.setAttribute('title', '刷新');
      refreshBtnObj.onclick = function() {
          const { dispatch } = _this.props;
          dispatch(FlowdesignActions.get_workOrderTemplates());
      };
      refreshBtnObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';

      deleteBtnObj= document.createElement('button');
      deleteBtnObj.setAttribute('class', 'btn btn-default');
      deleteBtnObj.setAttribute('type', 'button');
      deleteBtnObj.setAttribute('name', 'delete');
      deleteBtnObj.setAttribute('title', '删除模板');
      deleteBtnObj.onclick = function() {
          var selections = $('#workOrderTemplateListTable').bootstrapTable('getSelections');
          if(selections.length != 0) {
              const { dispatch } = _this.props;
              dispatch(OperationActions.set_selectedWorkOrderTemplate({workOrderTemplate:selections[0], flag:"delete"}));
              $("#confirmDeleteWorkOrderTemplateModal").modal("show");
          }
      };
      deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';

      addBtnObj= document.createElement('button');
      addBtnObj.setAttribute('class', 'btn btn-default');
      addBtnObj.setAttribute('type', 'button');
      addBtnObj.setAttribute('name', 'add');
      addBtnObj.setAttribute('title', '新建模板');
      addBtnObj.onclick = function() {
          const { dispatch } = _this.props;
          dispatch(OperationActions.set_selectedWorkOrderTemplate({workOrderTemplate:null, flag:"add"}));
          dispatch(OperationActions.setWorkOrderTemplateInfoChangeFlag(true));
          _this.history.pushState(null,'operationmanage/createWorkOrderTemplate');
      };
      addBtnObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';

      var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
      btnGroup.insertBefore(refreshBtnObj, btnGroup.childNodes[0]);
      if(bShowDelete) {
          btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
      }
      if(bShowAdd) {
          btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
      }

      this.setState({workOrderTemplateNum: $('#workOrderTemplateListTable').bootstrapTable('getData').length});
      $('#workOrderTemplateListTable').on('reset-view.bs.table', function () {
          _this.setState({workOrderTemplateNum: $('#workOrderTemplateListTable').bootstrapTable('getData').length});
      });
  },

  shouldComponentUpdate: function(nextProps, nextState){
    if (nextProps.workOrderTemplatesData !== this.props.workOrderTemplatesData) {
      $('#workOrderTemplateListTable').bootstrapTable('refreshOptions', {data: nextProps.workOrderTemplatesData});
      var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
      btnGroup.insertBefore(refreshBtnObj, btnGroup.childNodes[0]);
      if(bShowDelete) {
          btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
      }
      if(bShowAdd) {
          btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
      }
    }
    return true;
  },

  showWorkOrderTemplateInfo: function(row, element){
      const { dispatch } = this.props;
      dispatch(OperationActions.set_selectedWorkOrderTemplate({workOrderTemplate:row, flag:"show"}));
      dispatch(OperationActions.setWorkOrderTemplateInfoChangeFlag(false));
      this.history.pushState(null,'operationmanage/createWorkOrderTemplate');
  },

  render:function(){
      const { dispatch, workOrderTemplatesData, selectedWorkOrderTemplate } = this.props;
      return (
          <div id='workOrderTemplateListView' className='overviewDiv'>
              <ConfirmDeleteWorkOrderTemplateModal workOrderTemplatesData={workOrderTemplatesData} selectedWorkOrderTemplate={selectedWorkOrderTemplate}
                  delete_workOrderTemplate={workOrderTemplateId=>dispatch(OperationActions.delete_workOrderTemplate(workOrderTemplateId))}
                  get_workOrderTemplates={()=>dispatch(FlowdesignActions.get_workOrderTemplates())}
                  set_selectedWorkOrderTemplate={params=>dispatch(OperationActions.set_selectedWorkOrderTemplate(params))}
                  setWorkOrderTemplateInfoChangeFlag={params=>dispatch(OperationActions.setWorkOrderTemplateInfoChangeFlag(params))}/>
              <div id='workOrderTemplateListView_desView' className='overviewDesViewDiv userListView_desView'>
                  <div className="operationButtons">
                      <div className="systemGroupButtonGroup1 oBGroup">
                          <div className="titleDiv col-md-12">
                              <div className="titleLeft">
                                  工单模板-模板列表
                              </div>
                              <div className="titleRight">
                                  <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='operationCreateTableDiv col-md-12'>
                      <div id='workOrderTemplateListTable_toolbar'>
                          <div role='form'>
                              <div style={{marginLeft: "10px"}}>
                                  <span>工单模板数：{this.state.workOrderTemplateNum}&nbsp;&nbsp;<span style={{"color":"#FF0000"}}>（双击查看模板信息）</span></span>
                              </div>
                          </div>
                      </div>
                      <table id='workOrderTemplateListTable'
                             data-toggle='table'
                             data-search='true'
                             data-classes='table table-no-bordered table-striped table-hover'
                             data-toolbar='#workOrderTemplateListTable_toolbar'
                             data-resizable='true'
                             data-show-refresh='false'
                             data-show-toggle='true'
                             data-show-columns='true'
                             data-click-to-select='true'>
                      </table>
                  </div>
              </div>
          </div>
      );
  }
});

$(window).resize(function () {
    if(document.getElementById('workOrderTemplateListView_desView') != null) {
        document.getElementById('workOrderTemplateListView_desView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = WorkOrderTemplateListView;
WorkOrderTemplateListView.propTypes = {
  workOrderTemplatesData: PropTypes.array.isRequired,
  selectedWorkOrderTemplate: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { workOrderTemplatesData } = state.flowDesignReducer
  const { selectedWorkOrderTemplate } = state.operationReducer
  return {
      workOrderTemplatesData,
      selectedWorkOrderTemplate
  }
}

export default connect(mapStateToProps)(WorkOrderTemplateListView)
