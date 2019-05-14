/**
 * Created by SHIN on 2016/1/29.
 * 告警事件触发工单资产列表
 */
require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

var dataUniqList = [];
var dataValueList = [];
var handleAssets = [];
var monitorInfo = React.createClass({
  getInitialState:function(){
    return ({
      lists:[],
      pages:[]
    });
  },
  mixins: [Navigation],
  onResetForm:function(){
    $("#operationMonitorName").val(null);
    $("#operationMonitorIp").val(null);
    $('#operationModalMonitorTable').bootstrapTable('load',[]);
  },
  onDeleteInfo:function(){
    $("#operationModalMonitorTable2").find("tr").each(function(){
      var claz = $(this).attr("class");
      if(claz == 'selected'){
        var id = $($(this).find("td")[2]).text();
        for(var i=0;i<dataValueList.length;){
          var num = dataValueList[i].num;
          var rid = dataValueList[i].rid;
          if(id == num){
            var index = handleAssets.indexOf(rid);
            if(index>=0){
              handleAssets.splice(index,1);
            };
            dataValueList.splice(i,1);
            continue;
          };
          i++;
        };
      };
    });
    $("#operationModalMonitorTable2").bootstrapTable('load',dataValueList);
    this.props.setHandleAssetsId(handleAssets);
    this.onResetForm();
    $("#deleteInfoOperation").modal('hide');
  },
  onCancelDelete:function(){
    this.onResetForm();
    $("#deleteInfoOperation").modal('hide');
  },
  onCloseMonitorModal:function(){
    this.onResetForm();
    $("#addInfoOperation").modal('hide');
  },
  componentDidUpdate:function(){
    var assets = this.props.assets;
    if(assets.length<=0){
      dataUniqList = [];
      dataValueList = [];
      handleAssets = [];
      $('#operationModalMonitorTable2').bootstrapTable('load',dataValueList);
    };
    var propList = this.props.data;
    var isBunder = this.props.isBunder;
    if(isBunder == 0 && dataValueList.length == 0){
      for(var i=0;i<propList.length;i++){
        var length = dataUniqList.length;
        // console.log(row);
        var name = propList[i].AssetsName;
        var num = propList[i].AssetsCode;
        var peop = propList[i].MaintenancePeople;
        var comp = propList[i].MaintenanceUnit;
        var nat = propList[i].GBCode;
        var fwd = propList[i].Toward;
        var stup = propList[i].InstallAddress;
        var rid = propList[i].RecId;
        var data = {name:name,num:num,peop:peop,comp:comp,nat:nat,fwd:fwd,stup:stup,id:length,rid:rid};
        dataValueList.push(data);
        dataUniqList.push(length);
        handleAssets.push(rid);
      };
      $('#operationModalMonitorTable2').bootstrapTable('load',dataValueList);
    };
  },
  shouldComponentUpdate: function(nextProps, nextState){
    if (nextProps.assets !== this.props.assets) {
      this.handleAssetsData(nextProps);
    }
    return true;
  },
  handleAssetsData:function(props){
    var assets = props.assets;
    $('#operationModalMonitorTable').bootstrapTable('load',assets);
  },
  componentDidMount:function(){
    var that = this;
    setTimeout(function(){
      dataUniqList = [];
      dataValueList = [];
      handleAssets = [];
      $('#operationModalMonitorTable').bootstrapTable({
        columns: [
            {
                title: '资产名称',
                field: 'assetsName',
                sortable: false
            }, {
                title: '资产编码',
                field: 'assetsCode',
                sortable: false
            }, {
                title: 'IP地址',
                field: 'ipAddress',
                sortable: false
            }
        ],
        data: [],//that.state.itoss.assets,
        onClickRow: that.onRowClick
      });
      $('#operationModalMonitorTable2').bootstrapTable({
          columns: [
              {
                  field: 'state',
                  width: '5%',
                  checkbox: true
              },{
                  title: '资产名称',
                  field: 'name',
                  width: '10%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              }, {
                  title: '资产编码',
                  field: 'num',
                  width: '20%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              }, {
                  title: '维护人',
                  field: 'peop',
                  width: '10%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              }, {
                  title: '维护人单位',
                  field: 'comp',
                  width: '10%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              }, {
                  title: '国际编码',
                  field: 'nat',
                  width: '20%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              }, {
                  title: '朝向',
                  field: 'fwd',
                  width: '10%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              }, {
                  title: '安装位置',
                  field: 'stup',
                  width: '15%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              }
          ],
          data: dataValueList
        });
        var addBtnObj = document.createElement('button');
        addBtnObj.setAttribute('class', 'btn btn-default');
        addBtnObj.setAttribute('type', 'button');
        addBtnObj.setAttribute('name', 'add');
        addBtnObj.setAttribute('title', '添加');
        addBtnObj.setAttribute('data-toggle', 'modal');
        addBtnObj.setAttribute('data-target', '#addInfoOperation');
        addBtnObj.innerHTML = '<i class="fa fa-plus"></i>';
        var deleteBtnObj = document.createElement('button');
        deleteBtnObj.setAttribute('class', 'btn btn-default');
        deleteBtnObj.setAttribute('type', 'button');
        deleteBtnObj.setAttribute('name', 'add');
        deleteBtnObj.setAttribute('title', '删除');
        deleteBtnObj.setAttribute('data-toggle', 'modal');
        deleteBtnObj.setAttribute('data-target', '#deleteInfoOperation');
        deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';
        var btnGroup = document.getElementsByClassName('monitorTableHead')[0].childNodes[1];
        btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
        btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
        $('#deleteInfoOperation').on('show.bs.modal', function (e) {
          if(handleAssets.length == 0){
            $("#deleteInfoOperation").find(".modal-body").text("没有可删除的资产");
          };
          that.props.setIsBunder(1);
        });
        $('#addInfoOperation').on('show.bs.modal', function (e) {
          that.props.setIsBunder(1);
        });
      $('#operationModalMonitorTable').bootstrapTable('load',[]);
    },200);
  },
  onRowClick: function(row){
    var that = this;
    $("#addInfoOperation").modal('hide');
    var length = dataUniqList.length;
    // console.log(row);
    var name = row.assetsName;
    var num = row.assetsCode;
    var peop = row.maintenancePeople;
    var comp = row.maintenanceUnit;
    var nat = row.gbCode;
    var fwd = row.toward;
    var stup = row.installAddress;
    var rid = row.recId;
    var index = handleAssets.indexOf(rid);
    if(index<0){
      handleAssets.push(rid);
      var data = {name:name,num:num,peop:peop,comp:comp,nat:nat,fwd:fwd,stup:stup,id:length,rid:rid};
      dataValueList.push(data);
      dataUniqList.push(length);
      that.onResetForm();
      $('#operationModalMonitorTable').bootstrapTable('load',[]);
      $('#operationModalMonitorTable2').bootstrapTable('load',dataValueList);
      that.props.setHandleAssetsId(handleAssets);
    }else{
      console.log("已关联");
    };
  },
  getAssets:function(){
    var name = $("#operationMonitorName").val();
    var ip = $("#operationMonitorIp").val();
    var filter = [];
    if(name!=""){
      filter.push({"key":"ASSETS_NAME","value":name});
    };
    if(ip!=""){
      filter.push({"key":"IP_ADDRESS","value":ip});
    };
    this.props.getAssets(filter);
  },
  render:function(){
    return (
      <div className="operationMonitorInfoDiv">
        <div className="modal fade" id="addInfoOperation" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={this.onCloseMonitorModal}><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">添加资产</h4>
              </div>
              <div className="modal-body">
                <div className="filterHeader" style={{"height":"32px"}}>
                  <div className="input-group pull-left">
                    <span className="input-group-addon">资产名称</span>
                    <input type="text" className="form-control" id="operationMonitorName"/>
                    <span className="input-group-addon">IP地址</span>
                    <input type="text" className="form-control" id="operationMonitorIp"/>
                  </div>
                  <input type="button" value="筛选" className="btn btn-success pull-right" onClick={this.getAssets}/>
                </div>
                <div className="filterTable">
                  <table id='operationModalMonitorTable'
                   data-toggle='table'
                   data-classes='table table-no-bordered table-hover'
                   data-show-refresh='false'
                   data-show-toggle='false'
                   data-show-columns='false'
                   data-pagination='true'
                   data-page-size='10'>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.onCloseMonitorModal}>关闭</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="deleteInfoOperation" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">删除资产</h4>
              </div>
              <div className="modal-body">
                你确定要删除吗？
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.onCancelDelete}>取消</button>
                <button type="button" className="btn btn-primary" onClick={this.onDeleteInfo}>确定</button>
              </div>
            </div>
          </div>
        </div>
        <div className="monitorTableHead">
          <label className="operationMonitorLabel">资产信息</label>
          <div className="btn-group operationTableToolbar pull-right" role="group">
            <div style={{"display":"none"}}></div>
          </div>
        </div>
        <table id='operationModalMonitorTable2'
           data-toggle='table'
           data-classes='table table-no-bordered table-hover'
           data-show-refresh='false'
           data-show-toggle='false'
           data-show-columns='false'
           data-pagination='true'
           data-page-size='10'>
        </table>
      </div>
    );
  }
});

module.exports = monitorInfo;
