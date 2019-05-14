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
import { getSlaList,emitSelectRowObj,slaMultDelete } from '../../../../../../actions/sla_action';

function settingFomatter(value, row) {
    return [
        '<div id="settingBtnGroup_' + row.id + '" class="btn-group settingBtnGroup" style="display: none">',
        '<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">',
        '<i class="fa fa-cog"></i><span class="caret"></span>',
        '</a>',
        '<ul class="dropdown-menu">',
        '<li><a id="edit_' + row.id + '" class="edit" href="javascript:void(0)">编辑</a></li>',
        '<li><a id="remove_' + row.id + '" class="remove" href="javascript:void(0)">删除</a></li>',
        '</ul>',
        '</div>'
    ].join('');
}

var SlaTableBox = React.createClass({
    mixins: [History],
    getInitialState: function() {
      return {
        selectObj: {}
      };
    },
    componentWillMount:function(){
      const { dispatch } = this.props;
      dispatch(getSlaList({}));
    },
    createDeleteBtn:function(){
      var deleteBtnObj= document.createElement('button');
      deleteBtnObj.setAttribute('class', 'btn btn-default');
      deleteBtnObj.setAttribute('type', 'button');
      deleteBtnObj.setAttribute('name', 'delete');
      deleteBtnObj.setAttribute('title', '删除服务级别协议');

      deleteBtnObj.onclick = function() {
          var selectMult = $('#slaTable').bootstrapTable('getSelections');
          if(selectMult instanceof Array && selectMult.length > 0){
            if(confirm("确认要删除吗?")){
              var mRecid = "";
              var cId = "";
              for(var i =0; i < selectMult.length; i++){
                if(i == selectMult.length-1){
                  mRecid = "'"+mRecid+selectMult[i].serviceLevelAgreementRecId+"'";
                  cId = cId+selectMult[i].id;
                }else{
                  mRecid = ""+mRecid+selectMult[i].serviceLevelAgreementRecId+"','";
                  cId = cId+selectMult[i].id+",";
                }
              }
              var obj = [{key:'TABLENAME',value:'ServiceLevelAgreement'},{key:'KEYWORD',value:'RecId'},{key:'VALUE',value:mRecid}];
              // var data = this.getFlux().store("YFTSlaStore").getState().ServiceLevelAgreementData;
              // var counts = cId.split(",");
              //
              //  var data = this.props.getSlaListData;
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

              // $('#slaTable').bootstrapTable('refreshOptions', {data: newData});
              // this.createDeleteBtn();
              // var quxianLimit = Util.getSlaLimit();
              // if(quxianLimit.slaAdd){
              //   this.createAddBtn();
              // };

              const { dispatch } = this.props;
              dispatch(slaMultDelete(obj));
            }else{
              return;
            }
          }else{
            return;
          }
      }.bind(this);
      deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';
      var btnGroup = document.getElementsByClassName('slaTableBox')[0].firstChild.firstChild.childNodes[1];
      btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
    },
    createAddBtn:function(){
      var addBtnObj= document.createElement('button');
      addBtnObj.setAttribute('class', 'btn btn-default');
      addBtnObj.setAttribute('type', 'button');
      addBtnObj.setAttribute('name', 'add');
      addBtnObj.setAttribute('title', '新建服务级别协议');

      addBtnObj.onclick = function() {
        this.history.pushState(null,'baseManage/slaAdd');
      }.bind(this);
      addBtnObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';
      var btnGroup = document.getElementsByClassName('slaTableBox')[0].firstChild.firstChild.childNodes[1];
      btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
    },
    componentDidMount: function() {
        $('#slaTable').bootstrapTable({
            exportDataType:"all",
            columns: [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '服务名称',
                    field: 'serviceLevelAgreementName',
                    sortable: true
                }, {
                    title: '服务提供商',
                    field: 'serviceProvider',
                    sortable: true
                }, {
                    title: '服务大类',
                    field: 'serviceCatalogName',
                    sortable: true
                }, {
                    title: '状态',
                    field: 'status',
                    sortable: true
                }, {
                    title: '响应时间',
                    field: 'responseTime',
                    sortable: true
                }, {
                    title: '解决时间',
                    field: 'solveTime',
                    sortable: true
                }, {
                    title: '超时收费',
                    field: 'timeoutCharges',
                    sortable: true
                },{
                  title: '创建时间',
                  field: 'createddatetime',
                  sortable: true
                }
            ],
            onResetView: this.refreshSettingBtnGroups,
            onClickRow: this.navigateToDetail,
            exportDataType:"all"
        });
    },
    componentDidUpdate:function(){
      $('#slaTable').bootstrapTable('resetView');
      $('#slaTable').bootstrapTable('refreshOptions', {
          data: this.props.getSlaListData
      });

      // var delteBtns = $('.slaTableBox').find("button[name='delete']");
      // if(delteBtns.length == 0){
      //   var quxianLimit = Util.getSlaLimit();
      //   if(quxianLimit.slaListDelete){
      //     this.createDeleteBtn();
      //   };
      //   if(quxianLimit.slaAdd){
      //     this.createAddBtn();
      //   };
      // }
    },
    navigateToDetail: function(row, element) {
      const { dispatch } = this.props;
      dispatch(emitSelectRowObj(row));
      this.history.pushState(null,'baseManage/slaDetails');
    },

    refreshSettingBtnGroups: function() {
      /**
        var _this = this;
        var tbl = document.getElementById('slaTable');
        var vtrs = tbl.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var i = 0; i < vtrs.length; i++) {
            vtrs[i].onmouseover=function(e){
                var settingBtnGroupId = "settingBtnGroup_" + _this.getFlux().store("YFTSlaStore").getState().ServiceLevelAgreementData[this.getAttribute('data-index')].id;
                document.getElementById(settingBtnGroupId).style.display = 'block';
            };
            vtrs[i].onmouseout=function(e){
                var settingBtnGroupId = "settingBtnGroup_" + _this.getFlux().store("YFTSlaStore").getState().ServiceLevelAgreementData[this.getAttribute('data-index')].id;
                if(document.getElementById(settingBtnGroupId)){
                  document.getElementById(settingBtnGroupId).style.display = 'none';
                }
            };
        }

        var dropdown_removes = document.getElementsByClassName('remove');
        for(var i = 0; i < dropdown_removes.length; i++) {
            dropdown_removes[i].onclick = function(e) {
                var rowId = e.target.id.substr(7);
                var data = _this.getFlux().store("YFTSlaStore").getState().ServiceLevelAgreementData;
                for(var j = 0; j < data.length; j++) {
                    if(data[j].id == rowId) {
                        if(confirm("确认要删除吗?")){
                          var newData = [];
                          for(var y=0;y < data.length;y++){
                            if(data[y].id != rowId){
                              newData.push(data[y]);
                            }
                          }
                          for(var z=0;z < newData.length;z++){
                            newData[z].id = z;
                          }
                          $('#slaTable').bootstrapTable('refreshOptions', {data: newData});
                          // console.log('delete: ' + JSON.stringify(data[j]));
                          _this.getFlux().actions.YFTSlaActions.slaDelete(_this.state.selectObj.serviceLevelAgreementRecId);
                          _this.createDeleteBtn();
                        }
                        break;
                    }
                }
            };
        }s

        var dropdown_edits = document.getElementsByClassName('edit');
        for(var i = 0; i < dropdown_edits.length; i++) {
            dropdown_edits[i].onclick = function(e) {
                // var rowId = e.target.id.substr(5);
                _this.getFlux().actions.YFTSlaActions.setServiceLevelAgreementObj(_this.state.selectObj);
                _this.history.pushState(null,'baseManage/slaDetails');
            };
        }
        */
    },
    filterLastName:function(){
      $('#slaTable').bootstrapTable('filterBy',{});
    },
    render: function() {

        return (
          <div className="assetTableDiv col-md-12">
              <fieldset>
                  <div className="tab-content">
                      <div className="tab-pane active" id="overviewDesview_tab_1">
          <div>
            {/**
            <div className="fixedFiltrationConditionDiv freeFiltrationConditionDiv col-md-12">
                <div className="col-md-12">
                    <div className="width1-full dropdown-item">
                        <div className="fixedHeader width1-full" >服务名称</div>
                        <ReactWidgets.Combobox id="serviceNameCombobox" className='form-control dropdownStyle width5-full' valueField='id' textField='val' data={["1","2"]} defaultValue={"1"}
                        filter={this.filterLastName} />
                    </div>
                    <div className="width1 marginLeft dropdown-item">
                        <div className="fixedHeader width1-full">服务提供商</div>
                        <ReactWidgets.Combobox id="typeList-Dropdown" className='form-control dropdownStyle width5-full' valueField='id' textField='val' data={["1","2"]} defaultValue={"1"}
                        filter={this.filterLastName} />
                    </div>
                    <div className="width1 marginLeft dropdown-item">
                        <div className="fixedHeader width1-full">服务大类</div>
                        <ReactWidgets.Combobox id="areaList-Dropdown" className='form-control dropdownStyle width5-full' valueField='id' textField='val' data={["1","2"]} defaultValue={"1"}
                        filter={this.filterLastName} />
                    </div>
                    <div className="width1 marginLeft dropdown-item">
                        <div className="fixedHeader width1-full">状态</div>
                        <ReactWidgets.Combobox id="areaList-Dropdown" className='form-control dropdownStyle width5-full' valueField='id' textField='val' data={["1","2"]} defaultValue={"1"}
                        filter={this.filterLastName} />
                    </div>
                </div>
            </div>*/}

            <div className='slaTableBox col-md-12 repositoryStyle'>
                <table id='slaTable'
                       data-toggle='table'
                       data-search='true'
                       data-classes='table table-no-bordered table-hover'
                       data-toolbar='#toolbar'
                       data-show-export="true"
                       data-show-refresh='true'
                       data-show-toggle='true'
                       data-show-columns='true'
                       data-pagination='true'
                       data-page-size='20'
                       data-resizable='true'>
                </table>
            </div>
          </div>
        </div>
    </div>
</fieldset>
</div>
        );
    }
});

// module.exports = SlaTableBox;

function mapSlaListState(state) {
  const { getSlaListData ,getSelectRowObj } = state.slaReducer

  return {
    getSlaListData:getSlaListData,
    getSelectRowObj:getSelectRowObj
  }
}

export default connect(mapSlaListState)(SlaTableBox)
