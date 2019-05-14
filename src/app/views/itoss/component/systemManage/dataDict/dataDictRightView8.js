require('bootstrap');
// require('../../equipmentManage/lib/echarts-all.js');
var React = require('react');
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

function editPic(){
  return '<a class="dataDictTable1Edit" href="javascript:void(0)" title="编辑"><img src="img/itoss/dataDictEdit.png"/></a>';
};
function deletePic(){
  return '<a class="dataDictTable1Delete" href="javascript:void(0)" title="删除"><img src="img/itoss/dataDictDelete.png"/></a>';
};

var _this;

window.dataDictTable8Event = {
  'click .dataDictTable1Edit':function(e, value, row, index){
    // console.log(e,value,row,index,"edit")
    var canDelete = _this.props.canDelete;
    if(canDelete == 1){
      document.getElementById('publicMessageModelTitle').innerHTML = "提示"
      document.getElementById('publicMessageModalcontent').innerHTML = "您的权限不足执行此操作。"
      $('#publicMessageModal').modal('show');
      return false;
    };
    var pid = row.pId;
    var cid = row.cId;
    var cName = row.cName;
    var pName = row.pName;
    _this.props.setFaultSubPid(pid);
    _this.props.setFaultSubId(cid);
    $("#faultTypeSelect").find(".rw-input").text(pName);
    $("#faultSubTypeNameInput").val(cName);
  },
  'click .dataDictTable1Delete':function(e, value, row, index){
    // console.log(e,"delete")
    var canDelete = _this.props.canDelete;
    if(canDelete == 1){
      document.getElementById('publicMessageModelTitle').innerHTML = "提示"
      document.getElementById('publicMessageModalcontent').innerHTML = "您的权限不足执行此操作。"
      $('#publicMessageModal').modal('show');
      return false;
    };
    var pid = row.pId;
    var cid = row.cId;
    var cName = row.cName;
    var pName = row.pName;
    _this.props.setFaultSubPid(pid);
    _this.props.setFaultSubId(cid);
    $("#faultTypeSelect").find(".rw-input").text(pName);
    $("#faultSubTypeNameInput").val(cName);
    $("#dataDictModal8").modal("show");
  }
};

var dataDictRightView = React.createClass({
    mixins: [History],
    getInitialState: function () {
        _this = this;
        return {
            faultIndex:0
        }
    },
    componentDidUpdate:function(){
      var bdata = this.props.faultSubData;
      $("#dataDictRightTable8").bootstrapTable("load",bdata);
    },
    componentDidMount:function(){
      $('#dataDictRightTable8').bootstrapTable({
        columns: [
          {
            title: '故障细类名称',
            field: 'cName',
            halign: 'left',
            align: 'left',
            sortable: true
          },{
            title: '故障大类名称',
            field: 'pName',
            halign: 'left',
            align: 'left',
            sortable: true
          },{
            title: '编辑',
            halign: 'left',
            align: 'left',
            events: dataDictTable8Event,
            formatter: editPic
          },{
            title: '删除',
            halign: 'left',
            align: 'left',
            events: dataDictTable8Event,
            formatter: deletePic
          }
        ],
        data: [],
        onClickRow: this._onClickRow,
        exportDataType: "all"
      });
    },
    _onClickRow:function(e){
      // console.log(e);
      // var pid = e.pId;
      // var cid = e.cId;
      // var cName = e.cName;
      // var pName = e.pName;
      // this.getFlux().actions.DictActions.set_curPid(pid);
      // this.getFlux().actions.DictActions.set_sysFaultSubTypeId(cid);
      // $("#faultTypeSelect").find(".rw-input").text(pName);
      // $("#faultSubTypeNameInput").val(cName);
    },
    setCurPid:function(e){
      var faultType = this.props.faultType;
      var pid = e.RecId;
      var that = this;
      for(var i=0;i<faultType.length;i++){
        var faultid = faultType[i].RecId;
        if(pid == faultid){
          that.setState({faultIndex:i+1});
        };
      };
      // console.log(e)
      $("#faultTypeSelect").find(".rw-input").text(e.FaultName);
      this.props.setFaultSubPid(pid);
    },
    deleteFaultSubType:function(){
      this.props.delete_sysFaultSubType();
      $("#dataDictModal8").modal("hide");
    },
    onChangeDropDown:function(){},
    render:function(){
      var faultIndex = this.state.faultIndex;
      var faults = this.props.faultType;
      var list = [];
      list.push({RecId:"",FaultName:" "});
      for(var i=0;i<faults.length;i++){
        list.push(faults[i]);
      };
      return (
        <div id='dataDictRightPage8' className="dataDictRightPages col-md-12">
          <div className="modal fade" id="dataDictModal8" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">提示</h4>
                </div>
                <div className="modal-body">
                  你确定要删除吗？
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                  <button type="button" className="btn btn-primary" onClick={this.deleteFaultSubType}>确定</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">故障大类名称<span style={{"color":"#FF0000"}}>*</span></span>
                <ReactWidgets.DropdownList className="dataDictDropDown" data={list} value={list[faultIndex]} textField="FaultName" onSelect={this.setCurPid} onChange={this.onChangeDropDown} id="faultTypeSelect"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">故障细类名称<span style={{"color":"#FF0000"}}>*</span></span>
                <input type="text" className="form-control" placeholder="故障细类名称" id="faultSubTypeNameInput"/>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <table id="dataDictRightTable8"
                   data-toggle='table'
                   data-search='true'
                   data-classes='table table-no-bordered table-hover'
                   data-show-export="true"
                   data-show-refresh='false'
                   data-show-toggle='true'
                   data-show-columns='true'
                   data-pagination='true'
                   data-page-size='10'
                   data-resizable='true'>
            </table>
          </div>
        </div>
      );
    }
});

module.exports = dataDictRightView;
