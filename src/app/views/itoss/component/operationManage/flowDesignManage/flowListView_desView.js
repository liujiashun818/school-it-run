require('bootstrap');
import React from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var ReactWidgets = require('react-widgets');
var base64 = require('../../../../../utils/base64');
import FlowListView_desView_static from './flowListView_desView_static';

function timeFormatter(value, row) {
  var value1 =value.substr(value.indexOf("(")+1);
  var value2 = value1.substr(0,value1.indexOf(")"));
  var d = new Date(parseInt(value2));
  if(!isNaN(d)) return d.Format("yyyy-MM-dd hh:mm:ss");
  return "-";
}

function queryFormatter(value, row) {
    return [
        '<a class="queryFlow" href="javascript:void(0)"><i class="fa icon-eye-open"></i></a>'
    ].join('');
}

function editFormatter(value, row) {
    return [
        '<a class="editFlow" href="javascript:void(0)"><i class="fa fa-pencil-square-o"></i></a>'
    ].join('');
}

function deleteFormatter(value, row) {
    return [
        '<a class="deleteFlow" href="javascript:void(0)"><i class="glyphicon glyphicon-trash icon-trash"></i></a>'
    ].join('');
}

var _this;
window.operateFlowQueryEvents = {
  'click .queryFlow': function (e, value, row, index) {
    _this.props.set_currFlow(row);
    _this.props.set_flowOnlyShow(1);
    _this.props.set_flowPanel(0);
    var data1 = row;
    var currflowname ="";
    if(data1){
      if(typeof(data1)=='string'){
         currflowname = data1;
      }else {
        currflowname = data1.name;
      }
    }
    _this.props.get_flowDesignPicDataByName_flow(currflowname);

    _this.history.pushState(null,'operationManage/flowDesignEdit');
  }
};
window.operateFlowEvents = {
    'click .editFlow': function (e, value, row, index) {
        _this.props.set_currFlow(row);
        _this.props.set_flowOnlyShow(0);
        _this.props.set_flowPanel(0);

        var data1 = row;
        var currflowname ="";
        if(data1){
          if(typeof(data1)=='string'){
             currflowname = data1;
          }else {
            currflowname = data1.name;
          }
        }
        _this.props.get_flowDesignPicDataByName_flow(currflowname);

        _this.history.pushState(null,'operationManage/flowDesignEdit');
    }
};
window.operateFlowDelEvents = {
    'click .deleteFlow': function (e, value, row, index) {
      if(row.name){
        if(row.name=='英飞拓工单'){
          $.showPublicDialog("系统提示","默认流程不能删除。");
        }else {
          if(confirm("确定删除流程（"+row.name+"）吗？")){
            _this.props.delete_flowDesignPicData_flow(row.name);
            _this.props.get_workFlowName_flow();
            $('#flowListTable').bootstrapTable('refreshOptions', {data: _this.props.flowObjects});
          }
        }
      }
    },
};

var FlowListView_desView = React.createClass({
    mixins: [History],
    componentWillMount: function() {
      _this = this;
    },
    componentDidMount: function() {
        if(document.getElementById('flowListView_desView') != null) {
            document.getElementById('flowListView_desView').style.height = $(window).height() - 110 - 30 + 'px';
        }

        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        var bShowAdd = false, bShowEdit = false, bShowDelete = false;
        this.bAddShow = false;
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/operationmanage/flowdesign/add") {
                bShowAdd = true;
                this.bAddShow = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/flowdesign/update") {
                bShowEdit = true;
            }
            else if(permissionsValue[i].resourceType == "/operationmanage/flowdesign/delete") {
                bShowDelete = true;
            }
        }

        var tableColumns = [
             {
                title: '流程名称',
                field: 'name',
                sortable: true
            }, {
                title: '创建人',
                field: 'createby',
                sortable: true
            }, {
                title: '修改人',
                field: 'lastmodby',
                sortable: true
            }, {
                title: '最后修改时间',
                field: 'lastmoddatetime',
                formatter: timeFormatter,
                sortable: true
            },{
              title: '查看',
              events: operateFlowQueryEvents,
              formatter: queryFormatter
            }
        ];
        if(bShowEdit) {
            tableColumns.push(
                {
                    title: '编辑',
                    events: operateFlowEvents,
                    formatter: editFormatter
                }
            );
        }
        if(bShowDelete){
          tableColumns.push(
              {
                  title: '删除',
                  events: operateFlowDelEvents,
                  formatter: deleteFormatter
              }
          );
        }
        var flowdata = this.props.flowObjects;
        $('#flowListTable').bootstrapTable({
            columns: tableColumns,
            data: flowdata,
            onDblClickRow: this.showFlowInfo,
            singleSelect: 'true'
        });

        var _this = this;
        // var refreshBtnObj= document.createElement('button');
        // refreshBtnObj.setAttribute('class', 'btn btn-default');
        // refreshBtnObj.setAttribute('type', 'button');
        // refreshBtnObj.setAttribute('name', 'refresh');
        // refreshBtnObj.setAttribute('title', '刷新');
        // refreshBtnObj.onclick = function() {
        //     _this.getFlux().actions.YFTFlowDesignActions.get_workFlowName_flow();
        //     $('#flowListTable').bootstrapTable('refreshOptions', {data: _this.getFlux().store("YFTFlowDesignStore").getState().flowObjects});
        //     var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
        //     btnGroup.insertBefore(this, btnGroup.childNodes[0]);
        //     if(bShowDelete) {
        //         btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
        //     }
        //     if(bShowAdd) {
        //         btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
        //     }
        // };
        // refreshBtnObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';

        // var deleteBtnObj= document.createElement('button');
        // deleteBtnObj.setAttribute('class', 'btn btn-default');
        // deleteBtnObj.setAttribute('type', 'button');
        // deleteBtnObj.setAttribute('name', 'delete');
        // deleteBtnObj.setAttribute('title', '删除用户');
        // deleteBtnObj.onclick = function() {
        //     var selections = $('#userListTable').bootstrapTable('getSelections');
        //     if(selections.length != 0) {
        //         if(selections[0].LOGIN_ID == "admin") {
        //             alert("不能删除管理员admin用户");
        //             return false;
        //         }
        //         _this.getFlux().actions.YFTSystemActions.set_selectedUser({user:selections[0], flag:"delete"});
        //         $("#confirmDeleteUserModal").modal("show");
        //     }
        // };
        // deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';

        // var addBtnObj= document.createElement('button');
        // addBtnObj.setAttribute('class', 'btn btn-default');
        // addBtnObj.setAttribute('type', 'button');
        // addBtnObj.setAttribute('name', 'add');
        // addBtnObj.setAttribute('title', '新建流程');
        // addBtnObj.onclick = function() {
        //   _this.getFlux().actions.YFTFlowDesignActions.set_currFlow("");
        //   _this.history.pushState(null,'operationManage/flowDesignEdit');
        // };
        // addBtnObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';

        // var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
        // btnGroup.insertBefore(refreshBtnObj, btnGroup.childNodes[0]);
        // if(bShowDelete) {
        //     btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
        // }
        // if(bShowAdd) {
        //     btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
        // }

        // this.setState({userNum: $('#flowListTable').bootstrapTable('getData').length});
        // $('#flowListTable').on('reset-view.bs.table', function () {
        //     _this.setState({userNum: $('#flowListTable').bootstrapTable('getData').length});
        // });

    },
    getWorkOrderIdObj:function(gdztmbText,clbdText){
      var oObj = {gdztmbId:"",clbdId:""};
      var  tData = this.props.get_workOrderTemplatesData;
      for(var i = 0;i < tData.length; i++){
        if(gdztmbText == tData[i].t_name){
          oObj.gdztmbId = tData[i].RecId;
        }
        if(clbdText == tData[i].t_name){
          oObj.clbdId = tData[i].RecId;
        }
      }
      return oObj;
    },
    createWorkFlow:function() {

      var flowname= document.getElementById('textflowname').value;
      var gdztmbText = $("#gdztmb").find('.rw-input').text();
      var clbdText = $("#clbd").find('.rw-input').text();

      // _this.props.set_workOrderTemplatesId({gdztmbId:gdztmbId,clbdId:clbdId});
      if(flowname==''){
        //alert("名称不能为空！");
        $.showPublicDialog("系统提示","名称不能为空。");
        return;
      }
      if(gdztmbText == ""){
        $.showPublicDialog("系统提示","工单主模板不能为空。");
        return;
      }
      if(clbdText == "" ){
        $.showPublicDialog("系统提示","处理表单不能为空。");
        return;
      }
      _this.props.set_workOrderTemplatesId(this.getWorkOrderIdObj(gdztmbText,clbdText));

      var fobjs= this.props.flowObjects;
      var isexit=false;
      for (var i = 0; i < fobjs.length; i++) {
        var obj= fobjs[i];
        if(obj.name == flowname){
          isexit = true;
        }
      }
      if(isexit){
        //alert("名称已经存在！");
        $.showPublicDialog("系统提示","名称已经存在。");
        return;
      }
      _this.props.set_currFlow(flowname);
      _this.props.set_flowOnlyShow(0);
      _this.props.set_flowPanel(1);
      _this.props.get_flowDesignPicDataByName_flow(flowname);
      _this.history.pushState(null,'operationManage/flowDesignEdit');
    },
    showFlowInfo: function(row, element){
        this.props.set_currFlow(row);
        this.props.set_flowOnlyShow(1);
        this.props.set_flowPanel(0);
        var data1 = row;
        var currflowname ="";
        if(data1){
          if(typeof(data1)=='string'){
             currflowname = data1;
          }else {
            currflowname = data1.name;
          }
        }
        this.props.get_flowDesignPicDataByName_flow(currflowname);

        this.history.pushState(null,'operationManage/flowDesignEdit');
    },
    componentDidUpdate:function(){
      var _this = this;
      $('#flowListTable').bootstrapTable('refreshOptions', {data: _this.props.flowObjects});
      var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];

    var  flowrefreshbtn= document.getElementById('flowrefreshbtn');
    if(flowrefreshbtn){

    }else {
      var refreshBtnObj= document.createElement('button');
      refreshBtnObj.setAttribute('class', 'btn btn-default');
      refreshBtnObj.setAttribute('type', 'button');
      refreshBtnObj.setAttribute('name', 'refresh');
      refreshBtnObj.setAttribute('id', 'flowrefreshbtn');
      refreshBtnObj.setAttribute('title', '刷新');
      refreshBtnObj.onclick = function() {
          _this.props.get_workFlowName_flow();
          $('#flowListTable').bootstrapTable('refreshOptions', {data: _this.props.flowObjects});
          var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
          btnGroup.insertBefore(this, btnGroup.childNodes[0]);
          // if(bShowDelete) {
          //     btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
          // }
          if(this.bAddShow) {
              btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
          }
      };
      refreshBtnObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';
      btnGroup.insertBefore(refreshBtnObj, btnGroup.childNodes[0]);
    }

    var flowaddbtn = document.getElementById('flowaddbtn');
    if(flowaddbtn){

    }else {
      var addBtnObj= document.createElement('button');
      addBtnObj.setAttribute('class', 'btn btn-default');
      addBtnObj.setAttribute('type', 'button');
      addBtnObj.setAttribute('name', 'add');
      addBtnObj.setAttribute('id', 'flowaddbtn');
      addBtnObj.setAttribute('data-toggle','modal');
      addBtnObj.setAttribute('data-target','#addFlowDesigndialog');
      addBtnObj.setAttribute('title', '新建流程');
      // addBtnObj.onclick = function() {
      //   _this.getFlux().actions.YFTFlowDesignActions.set_currFlow("");
      //   _this.history.pushState(null,'operationManage/flowDesignEdit');
      // };
      addBtnObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';

      // if(bShowDelete) {
      //     btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
      // }
      if(this.bAddShow) {
          //btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
      }
    }

    },
    onClickCreate:function(){
      $('#addFlowDesigndialog').modal('show');
      $('#textflowname').val('');
    },
    render:function(){
      var modeData = this.props.get_workOrderTemplatesData;
      var mData = [];
      var oData = [];
      if(modeData.length > 0){
        for(var i=0;i<modeData.length;i++){
          if("0" == modeData[i].t_type){
            mData.push({id:modeData[i].RecId,name:modeData[i].t_name});
          }else{
            oData.push({id:modeData[i].RecId,name:modeData[i].t_name});
          }
        }

      }
      // <div style={{float: "right"}}>
      //     <span>记录数：{this.state.userNum}</span>
      // </div>
        return (
            <div id='flowListView_desView' className='overviewDesViewDiv userListView_desView'>
                <div className="modal fade" id="addFlowDesigndialog" tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">添加流程名称</h4>
                      </div>
                      <div className="modal-body">
                        <div className="filterHeader" style={{"height":"70px"}}>
                          <div className="input-group">
                            <span className="input-group-addon">流程名称</span>
                            <input type="text" id="textflowname" className="form-control"/>
                          </div>
                          <div style={{marginTop:"8"}}>
                            <div className="col-md-6 col-sm-6" style={{paddingLeft:"0",paddingRight:"0"}}>
                              <div className="input-group">
                                <span className="input-group-addon">工单主模板</span>
                                <ReactWidgets.DropdownList data={mData} defaultValue={mData.length>0 ? mData[0]:""} textField='name' id="gdztmb"/>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6" style={{paddingLeft:"0",paddingRight:"0"}}>
                              <div className="input-group">
                                <span className="input-group-addon">处理表单</span>
                                <ReactWidgets.DropdownList data={oData} defaultValue={oData.length>0 ? oData[0]:""} textField='name' id="clbd"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.createWorkFlow}>确定</button>
                      </div>
                    </div>
                  </div>
                </div>
                <FlowListView_desView_static />
                <div className='operationCreateTableDiv col-md-12'>
                    <div id='userListTable_toolbar'>
                        <div id='toolbar-form' role='form'>
                          <div style={{float:"left",color:"#F00",marginLeft:"10px"}}>
                              {this.bAddShow ? <input type="button" className="operationCreateFlowBtn" value="新建流程" onClick={this.onClickCreate}/>:""}
                          </div>
                        </div>
                    </div>
                    <table id='flowListTable'
                           data-toggle='table'
                           data-search='true'
                           data-classes='table table-no-bordered table-striped table-hover'
                           data-toolbar='#userListTable_toolbar'
                           data-resizable='true'
                           data-show-refresh='false'
                           data-show-toggle='true'
                           data-show-columns='true'
                           data-click-to-select='true'>
                    </table>
                </div>
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('flowListView_desView') != null) {
        document.getElementById('flowListView_desView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = FlowListView_desView;
