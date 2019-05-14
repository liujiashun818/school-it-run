import React, { PropTypes } from 'react';
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;

var _this;

function groupFormatter(value,row){
  var id = row.RecId;
  return '<input type="text" value="'+value+'" class="groupSorterInput" id="group'+id+'"/>'
}

function equipFormatter(value,row){
  // console.log(row)
  var id = row.RecId;
  // _this.setState({curMark:"Equip",curId:id});
  return '<input type="text" value="'+value+'" class="equipSorterInput" id="equip'+id+'"/>';
}

window.equipModalEvent = {
  'blur .equipSorterInput':function(e, value, row, index){
    var id = row.RecId;
    var newValue = $("#equip"+id).val();
    var pd = isNaN(newValue);
    if(pd){
      alert("请填写数字");
      return false;
    };
    // console.log(row,newValue);
    var param = {
      RecId:id,
      Sorter:newValue
    };
    _this.props.updateEquipmentSorter(param);
  },
  'blur .groupSorterInput':function(e, value, row, index){
    var id = row.RecId;
    var newValue = $("#group"+id).val();
    console.log(row,newValue);
  }
};

var PanelTable = React.createClass({
  componentDidMount:function(){
    var tableId = this.props.tableId;
    if(tableId == "listResourceZiZuTable"){
      $('#'+tableId).bootstrapTable({
        columns: [
          {
            width: '80%',
            title: '组名',
            field: 'GroupName',
            halign: 'left',
            align: 'left',
            sortable: true
          },{
            width: '20%',
            title: '排序',
            field: 'Sorter',
            halign: 'left',
            align: 'left',
            formatter: groupFormatter,
            events: equipModalEvent,
            sortable: true
          }
        ],
        data: [],
        onClickRow: this.onRowClick,
        exportDataType:"all"
      });
    }else if(tableId == "listResourceZiYuanTable"){
      $('#'+tableId).bootstrapTable({
        columns: [
          {
            width: '80%',
            title: '资源名',
            field: 'TITLE',
            halign: 'left',
            align: 'left',
            sortable: true
          },{
            width: '20%',
            title: '排序',
            field: 'Sorter',
            halign: 'left',
            align: 'left',
            formatter: equipFormatter,
            events: equipModalEvent,
            sortable: true
          }
        ],
        data: [],
        onClickRow: this.onRowClick,
        exportDataType:"all"
      });
    };
  },
  onRowClick:function(){

  },
  render:function(){
    var tableId = this.props.tableId;
    return(
      <table id={tableId}
         data-toggle='table'
         data-search='true'
         data-classes='table table-no-bordered table-hover'
         data-toolbar='#toolbar'
         data-show-refresh='false'
         data-show-toggle='false'
         data-show-columns='false'
         data-show-export='true'
         data-page-size='10'
         data-pagination='true'>
      </table>
    );
  }
});

var Panel = React.createClass({
  getTable:function(){
    var title = this.props.title;
    if(title == "子组"){
      return (<PanelTable tableId="listResourceZiZuTable"/>);
    }else if(title == "资源"){
      return (<PanelTable tableId="listResourceZiYuanTable"/>);
    };
  },
  componentDidMount:function(){
    $(".bootstrap-table").slideUp();
  },
  render:function(){
    var title = this.props.title;
    var panelId = "";
    if(title == "子组"){
      panelId = "listResourceZiZuPanel";
    }else if(title == "资源"){
      panelId = "listResourceZiYuanPanel";
    };
    return (
      <div className="panel panel-success">
        <div className="panel-heading" id={panelId}>
          {title}
        </div>
        {this.getTable()}
        {/*<div className="panel-footer">Panel footer</div>*/}
      </div>
    );
  }
});

var ListMonitorModal = React.createClass({
    mixins: [History],
    getInitialState:function(){
      _this = this;
      return null;
    },
    componentDidMount:function(){
      var that = this;
      $(function(){
        $("#listResourceZiZuPanel").click(function(){
          $(this).parent().find(".bootstrap-table").slideToggle("slow");
        });
        $("#listResourceZiYuanPanel").click(function(){
          $(this).parent().find(".bootstrap-table").slideToggle("slow");
        });
      });
      $('#listResourceModal').on('show.bs.modal', function (e) {
        var treeObj = $.fn.zTree.getZTreeObj("monitorTree");
        var node = treeObj.getSelectedNodes();
        var PId = node[0].id;
        that.props.getChildrenGroups(PId);
        that.props.getChildrenEquip(PId);
      });
    },
    componentDidUpdate:function(){
      var groups = this.props.childrenGroup;
      var monitors = this.props.childrenEquip;
      $("#listResourceZiZuTable").bootstrapTable('load',groups);
      $("#listResourceZiYuanTable").bootstrapTable('load',monitors);
      if(groups != null && groups != ""){
        $("#listResourceZiZuPanel").parent().find(".bootstrap-table").slideDown("slow");
      };
      if(monitors != null && monitors != ""){
        $("#listResourceZiYuanPanel").parent().find(".bootstrap-table").slideDown("slow");
      };
    },
    render:function(){
      return (
        <div className="modal fade" id="listResourceModal" tabIndex="-1" role="dialog" aria-labelledby="listResourceModalLabel" aria-hidden="true">
            <div className="modal-dialog listResourceModalDialog">
                <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">排序</h4>
                    </div>
                    <div className="modal-body">
                      <Panel title="子组"/>
                      <Panel title="资源"/>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
      );
    }
});

module.exports = ListMonitorModal;
