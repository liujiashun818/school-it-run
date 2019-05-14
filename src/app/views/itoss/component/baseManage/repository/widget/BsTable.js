/**
 * Created by SHIN on 2015/12/11.
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');

var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var data=[
  {name:"校园网",theme:"上网问题",state:"状态",type:"应用",cperson:"王超",time:"2015-09"},{name:"校园网",theme:"上网问题",state:"状态",type:"应用",cperson:"王超",time:"2015-09"},
  {name:"校园网",theme:"上网问题",state:"状态",type:"应用",cperson:"王超",time:"2015-09"},{name:"校园网",theme:"上网问题",state:"状态",type:"应用",cperson:"王超",time:"2015-09"},
  {name:"校园网",theme:"上网问题",state:"状态",type:"应用",cperson:"王超",time:"2015-09"},{name:"校园网",theme:"上网问题",state:"状态",type:"应用",cperson:"王超",time:"2015-09"},
  {name:"校园网",theme:"上网问题",state:"状态",type:"应用",cperson:"王超",time:"2015-09"},{name:"校园网",theme:"上网问题",state:"状态",type:"应用",cperson:"王超",time:"2015-09"},
];

function settingFomatter(value, row) {
    // console.log(row);
    return [
        '<div id="settingBtnGroup_' + row.id + '" class="btn-group settingBtnGroup" style="display: none">',
        '<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">',
        '<i class="fa fa-cog"></i><span class="caret"></span>',
        '</a>',
        '<ul class="dropdown-menu">',
        '<li><a href="javascript:void(0)"><i class="fa fa-trash-o"></i></a></li>',
        '<li><a href="javascript:void(0)"><i class="fa fa-play"></i></a></li>',
        '<li><a href="javascript:void(0)"><i class="fa fa-ban"></i></a></li>',
        '</ul>',
        '</div>'
    ].join('');
}

function tableResetView() {
  var tbl = document.getElementById('equipmentManageTable');
  var vtrs = tbl.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  for (var i = 0; i < vtrs.length; i++) {
    vtrs[i].onmouseover=function(e){
      var settingBtnGroupId = "settingBtnGroup_" + data[this.getAttribute('data-index')].id;
      document.getElementById(settingBtnGroupId).style.display = 'block';
    };
    vtrs[i].onmouseout=function(e){
      var settingBtnGroupId = "settingBtnGroup_" + data[this.getAttribute('data-index')].id;
      document.getElementById(settingBtnGroupId).style.display = 'none';
    };
  }
}

var BsTable = React.createClass({
  // mixins: [Navigation, FluxMixin, StoreWatchMixin("YFTEquipmentStore")],
  // componentDidUpdate: function(){
  //   data = this.state.itoss.monitors;
  //   $('#equipmentManageTable').bootstrapTable('load',data);
  // },
    componentDidMount: function() {
      var that = this;
      $('#equipmentManageTable').bootstrapTable({
          columns: [
              {
                  field: 'state',
                  width: '5%',
                  halign: 'center',
                  align: 'center',
                  checkbox: true
              }, {
                  title: '项目名称',
                  field: 'name',
                  width: '15%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              }, {
                  title: '主题',
                  field: 'theme',
                  width: '15%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              },{
                  title: '状态',
                  field: 'state',
                  width: '15%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              },{
                  title: '类型',
                  field: 'type',
                  width: '15%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              }, {
                  title: '提交人',
                  field: 'cperson',
                  width: '15%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              },{
                  title: '时间',
                  field: 'time',
                  width: '15%',
                  halign: 'center',
                  align: 'center',
                  sortable: false
              },{
                  width: '5%',
                  formatter: settingFomatter
              }
          ],
          data: data});

        tableResetView();
        $('#equipmentManageTable').on('reset-view.bs.table', function (){
          tableResetView();
        });
    },
    //getHeight: function() {
    //    return $(window).height() - 47 - 20 - 50;
    //},

    removeFiltration: function(e) {
      e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode);
    },

    render: function() {
        return (
            <div className='hardwareAssetTableBox equipmentManageTable'>
                <table id='equipmentManageTable'
                       data-toggle='table'
                       data-classes='table table-no-bordered table-hover'
                       data-height={285}
                       data-toolbar='#toolbar'
                       data-show-refresh='false'
                       data-show-toggle='false'
                       data-show-columns='false'
                       data-pagination='true'
                       data-page-size='4'
                       data-resizable='true'>
                </table>
            </div>
        );
    }
});

module.exports = BsTable;
