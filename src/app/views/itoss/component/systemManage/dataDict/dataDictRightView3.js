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

window.dataDictTable3Event = {
  'click .dataDictTable1Edit':function(e, value, row, index){
    var canDelete = _this.props.canDelete;
    if(canDelete == 1){
      document.getElementById('publicMessageModelTitle').innerHTML = "提示"
      document.getElementById('publicMessageModalcontent').innerHTML = "您的权限不足执行此操作。"
      $('#publicMessageModal').modal('show');
      return false;
    };
    var id = row.RecId;
    _this.props.setAssetsStatuId(id);
    $("#statusNameInput").val(row.StatusName);
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
    _this.props.setAssetsStatuId(id);
    $("#statusNameInput").val(row.StatusName);
    $("#dataDictModal3").modal("show");
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
      var bdata = this.props.assetsStatus;
      $("#dataDictRightTable3").bootstrapTable("load",bdata);
    },
    componentDidMount:function(){
      $('#dataDictRightTable3').bootstrapTable({
        columns: [
          {
            title: '资产状态',
            field: 'StatusName',
            halign: 'left',
            align: 'left',
            sortable: true
          },{
            title: '编辑',
            halign: 'left',
            align: 'left',
            events: dataDictTable3Event,
            formatter: editPic
          },{
            title: '删除',
            halign: 'left',
            align: 'left',
            events: dataDictTable3Event,
            formatter: deletePic
          }
        ],
        data: [],
        exportDataType: "all"
      });
    },
    deleteStatus:function(){
      this.props.delete_assetsStatus();
      $("#dataDictModal3").modal("hide");
    },
    render:function(){
      return (
        <div id='dataDictRightPage3' className="dataDictRightPages col-md-12">
          <div className="modal fade" id="dataDictModal3" tabIndex="-1" role="dialog">
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
                  <button type="button" className="btn btn-primary" onClick={this.deleteStatus}>确定</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="input-group">
              <span className="input-group-addon">资产状态<span style={{"color":"#FF0000"}}>*</span></span>
              <input type="text" className="form-control" placeholder="资产状态" id="statusNameInput"/>
            </div>
          </div>
          <div className="col-md-12">
            <table id="dataDictRightTable3"
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
