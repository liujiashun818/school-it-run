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

window.dataDictTable6Event = {
  'click .dataDictTable1Edit':function(e, value, row, index){
    var canDelete = _this.props.canDelete;
    if(canDelete == 1){
      document.getElementById('publicMessageModelTitle').innerHTML = "提示"
      document.getElementById('publicMessageModalcontent').innerHTML = "您的权限不足执行此操作。"
      $('#publicMessageModal').modal('show');
      return false;
    };
    var id = row.RecId;
    _this.props.set_assetsTypeId(id);
    $("#assetsTypeNameInput").val(row.TypeName);
    $("#assetsTypeCodeInput").val(row.CodeName);
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
    _this.props.set_assetsTypeId(id);
    $("#assetsTypeNameInput").val(row.TypeName);
    $("#assetsTypeCodeInput").val(row.CodeName);
    $("#dataDictModal6").modal("show");
  }
};

var dataDictRightView = React.createClass({
    mixins: [History],
    getInitialState: function () {
        _this = this;
        return {
            isOk:1
        }
    },
    componentDidUpdate:function(){
      var bdata = this.props.assetsType;
      $("#dataDictRightTable6").bootstrapTable("load",bdata);
    },
    componentDidMount:function(){
      $('#dataDictRightTable6').bootstrapTable({
        columns: [
          {
            title: '资产类型',
            field: 'TypeName',
            halign: 'left',
            align: 'left',
            sortable: true
          },{
            title: '代号',
            field: 'CodeName',
            halign: 'left',
            align: 'left',
            sortable: true
          },{
            title: '编辑',
            halign: 'left',
            align: 'left',
            events: dataDictTable6Event,
            formatter: editPic
          },{
            title: '删除',
            halign: 'left',
            align: 'left',
            events: dataDictTable6Event,
            formatter: deletePic
          }
        ],
        data: [],
        exportDataType: "all"
      });
    },
    deleteAssetsType:function(){
      this.props.delete_assetsType();
      $("#dataDictModal6").modal("hide");
    },
    render:function(){
      return (
        <div id='dataDictRightPage6' className="dataDictRightPages col-md-12">
          <div className="modal fade" id="dataDictModal6" tabIndex="-1" role="dialog">
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
                  <button type="button" className="btn btn-primary" onClick={this.deleteAssetsType}>确定</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">资产类型<span style={{"color":"#FF0000"}}>*</span></span>
                <input type="text" className="form-control" placeholder="资产类型" id="assetsTypeNameInput"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">代号<span style={{"color":"#FF0000"}}>*</span></span>
                <input type="text" className="form-control" placeholder="代号" id="assetsTypeCodeInput"/>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <table id="dataDictRightTable6"
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
