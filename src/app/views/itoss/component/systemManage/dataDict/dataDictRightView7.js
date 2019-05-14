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

window.dataDictTable7Event = {
  'click .dataDictTable1Edit':function(e, value, row, index){
    var canDelete = _this.props.canDelete;
    if(canDelete == 1){
      document.getElementById('publicMessageModelTitle').innerHTML = "提示"
      document.getElementById('publicMessageModalcontent').innerHTML = "您的权限不足执行此操作。"
      $('#publicMessageModal').modal('show');
      return false;
    };
    var id = row.RecId;
    _this.props.set_sysFaultTypeId(id);
    $("#sysFaultTypeNameInput").val(row.FaultName);
  },
  'click .dataDictTable1Delete':function(e, value, row, index){
    var canDelete = _this.props.canDelete;
    if(canDelete == 1){
      document.getElementById('publicMessageModelTitle').innerHTML = "提示"
      document.getElementById('publicMessageModalcontent').innerHTML = "您的权限不足执行此操作。"
      $('#publicMessageModal').modal('show');
      return false;
    };
    var id = row.RecId;
    _this.props.set_sysFaultTypeId(id);
    $("#sysFaultTypeNameInput").val(row.FaultName);
    $("#dataDictModal7").modal("show");
  }
};

var dataDictRightView = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     dict:flux.store("DictStore").getState()
    //   }
    // },
    getInitialState: function () {
        _this = this;
        return {
            isOk:1
        }
    },
    componentDidUpdate:function(){
      var bdata = this.props.faultType;
      $("#dataDictRightTable7").bootstrapTable("load",bdata);
    },
    componentDidMount:function(){
      $('#dataDictRightTable7').bootstrapTable({
        columns: [
          {
            title: '故障大类名称',
            field: 'FaultName',
            halign: 'left',
            align: 'left',
            sortable: true
          },{
            title: '编辑',
            halign: 'left',
            align: 'left',
            events: dataDictTable7Event,
            formatter: editPic
          },{
            title: '删除',
            halign: 'left',
            align: 'left',
            events: dataDictTable7Event,
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
      // var id = e.RecId;
      // this.getFlux().actions.DictActions.set_sysFaultTypeId(id);
      // $("#sysFaultTypeNameInput").val(e.FaultName);
    },
    deleteSysFaultType:function(){
      this.props.delete_sysFaultType();
      $("#dataDictModal7").modal("hide");
    },
    render:function(){
      return (
        <div id='dataDictRightPage7' className="dataDictRightPages col-md-12">
          <div className="modal fade" id="dataDictModal7" tabIndex="-1" role="dialog">
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
                  <button type="button" className="btn btn-primary" onClick={this.deleteSysFaultType}>确定</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-group">
              <span className="input-group-addon">故障大类名称<span style={{"color":"#FF0000"}}>*</span></span>
              <input type="text" className="form-control" placeholder="故障大类名称" id="sysFaultTypeNameInput"/>
            </div>
          </div>
          <div className="col-md-12">
            <table id="dataDictRightTable7"
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
