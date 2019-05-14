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

window.dataDictTable10Event = {
  'click .dataDictTable1Edit':function(e, value, row, index){
    // console.log(e,value,row,index,"edit")
    var canDelete = _this.props.canDelete;
    if(canDelete == 1){
      document.getElementById('publicMessageModelTitle').innerHTML = "提示"
      document.getElementById('publicMessageModalcontent').innerHTML = "您的权限不足执行此操作。"
      $('#publicMessageModal').modal('show');
      return false;
    };
    var id = row.RecId;
    _this.props.setAreaId(id);
    $("#areaNameInput").val(row.Name);
    $("#areaCodeInput").val(row.Code);
    $("#areaDescInput").val(row.AreaDesc);
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
    var id = row.RecId;
    _this.props.setAreaId(id);
    $("#areaNameInput").val(row.Name);
    $("#areaCodeInput").val(row.Code);
    $("#areaDescInput").val(row.AreaDesc);
    $("#dataDictModal10").modal("show");
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
      var bdata = this.props.areaData;
      $("#dataDictRightTable10").bootstrapTable("load",bdata);
    },
    componentDidMount:function(){
      $('#dataDictRightTable10').bootstrapTable({
        columns: [
          {
            title: '区域名称',
            field: 'Name',
            halign: 'left',
            align: 'left',
            sortable: true
          },{
            title: '代号',
            field: 'Code',
            halign: 'left',
            align: 'left',
            sortable: true
          },{
            title: '描述',
            field: 'AreaDesc',
            halign: 'left',
            align: 'left',
            sortable: true
          },{
            title: '编辑',
            halign: 'left',
            align: 'left',
            events: dataDictTable10Event,
            formatter: editPic
          },{
            title: '删除',
            halign: 'left',
            align: 'left',
            events: dataDictTable10Event,
            formatter: deletePic
          }
        ],
        data: [],
        onClickRow: this._onClickRow,
        exportDataType: "all"
      });
    },
    deleteAreaData:function(){
      this.props.delete_areaData();
      $("#dataDictModal10").modal("hide");
    },
    render:function(){
      return (
        <div id='dataDictRightPage10' className="dataDictRightPages col-md-12">
          <div className="modal fade" id="dataDictModal10" tabIndex="-1" role="dialog">
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
                  <button type="button" className="btn btn-primary" onClick={this.deleteAreaData}>确定</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">区域名称<span style={{"color":"#FF0000"}}>*</span></span>
                <input type="text" className="form-control" placeholder="区域名称" id="areaNameInput"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">代号<span style={{"color":"#FF0000"}}>*</span></span>
                <input type="text" className="form-control" placeholder="代号" id="areaCodeInput"/>
              </div>
            </div>
            <div className="col-md-12">
              <textarea className="form-control" id="areaDescInput" placeholder="区域描述"></textarea>
            </div>
          </div>
          <div className="col-md-12">
            <table id="dataDictRightTable10"
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
