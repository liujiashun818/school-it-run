/**
 * Created by SHIN on 2015/12/11.
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var data = [
    {
        "id": "1",
        "status": "ok",
        "nameChar": "192.168.0.10",
        "resource": "0",
        "normalResource": "0",
        "errorResource": "0",
        "monitor": "0",
        "normalMonitor": "0",
        "dangerMonitor": "0",
        "errorMonitor": "0",
        "banMonitor": "0",
        "lastModify": "2015-11-30 15:20:00"
    },{
        "id": "2",
        "status": "ok",
        "nameChar": "192.168.0.10",
        "resource": "0",
        "normalResource": "0",
        "errorResource": "0",
        "monitor": "0",
        "normalMonitor": "0",
        "dangerMonitor": "0",
        "errorMonitor": "0",
        "banMonitor": "0",
        "lastModify": "2015-11-30 15:20:00"
    },{
        "id": "3",
        "status": "ok",
        "nameChar": "192.168.0.10",
        "resource": "0",
        "normalResource": "0",
        "errorResource": "0",
        "monitor": "0",
        "normalMonitor": "0",
        "dangerMonitor": "0",
        "errorMonitor": "0",
        "banMonitor": "0",
        "lastModify": "2015-11-30 15:20:00"
    },{
        "id": "4",
        "status": "ok",
        "nameChar": "192.168.0.10",
        "resource": "0",
        "normalResource": "0",
        "errorResource": "0",
        "monitor": "0",
        "normalMonitor": "0",
        "dangerMonitor": "0",
        "errorMonitor": "0",
        "banMonitor": "0",
        "lastModify": "2015-11-30 15:20:00"
    },{
        "id": "5",
        "status": "ok",
        "nameChar": "192.168.0.10",
        "resource": "0",
        "normalResource": "0",
        "errorResource": "0",
        "monitor": "0",
        "normalMonitor": "0",
        "dangerMonitor": "0",
        "errorMonitor": "0",
        "banMonitor": "0",
        "lastModify": "2015-11-30 15:20:00"
    },{
        "id": "6",
        "status": "ok",
        "nameChar": "192.168.0.10",
        "resource": "0",
        "normalResource": "0",
        "errorResource": "0",
        "monitor": "0",
        "normalMonitor": "0",
        "dangerMonitor": "0",
        "errorMonitor": "0",
        "banMonitor": "0",
        "lastModify": "2015-11-30 15:20:00"
    },{
        "id": "7",
        "status": "ok",
        "nameChar": "192.168.0.10",
        "resource": "0",
        "normalResource": "0",
        "errorResource": "0",
        "monitor": "0",
        "normalMonitor": "0",
        "dangerMonitor": "0",
        "errorMonitor": "0",
        "banMonitor": "0",
        "lastModify": "2015-11-30 15:20:00"
    },{
        "id": "8",
        "status": "ok",
        "nameChar": "192.168.0.10",
        "resource": "0",
        "normalResource": "0",
        "errorResource": "0",
        "monitor": "0",
        "normalMonitor": "0",
        "dangerMonitor": "0",
        "errorMonitor": "0",
        "banMonitor": "0",
        "lastModify": "2015-11-30 15:20:00"
    },{
        "id": "9",
        "status": "ok",
        "nameChar": "192.168.0.10",
        "resource": "0",
        "normalResource": "0",
        "errorResource": "0",
        "monitor": "0",
        "normalMonitor": "0",
        "dangerMonitor": "0",
        "errorMonitor": "0",
        "banMonitor": "0",
        "lastModify": "2015-11-30 15:20:00"
    },{
        "id": "10",
        "status": "ok",
        "nameChar": "192.168.0.10",
        "resource": "0",
        "normalResource": "0",
        "errorResource": "0",
        "monitor": "0",
        "normalMonitor": "0",
        "dangerMonitor": "0",
        "errorMonitor": "0",
        "banMonitor": "0",
        "lastModify": "2015-11-30 15:20:00"
    }
];

function settingFomatter(value, row) {
    // console.log(row);
    return [
        '<div id="settingBtnGroup_' + row.id + '" class="btn-group settingBtnGroup" style="display: none">',
        '<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">',
        '<i class="fa fa-cog"></i><span class="caret"></span>',
        '</a>',
        '<ul class="dropdown-menu">',
        '<li><a href="javascript:void(0)">编辑</a></li>',
        '<li><a href="javascript:void(0)">删除</a></li>',
        '</ul>',
        '</div>'
    ].join('');
}

function tableResetView() {
  var tbl = document.getElementById('sonGroupMonitorTable');
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

var SonGroup = React.createClass({
    //getStateFromFlux: function() {
    //  var flux = this.props.flux;
    //  return {
    //  }
    //},

    componentDidMount: function() {
      var that = this;
        $('#sonGroupMonitorTable').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '状态',
                    field: 'status',
                    sortable: false
                },{
                    title: '组名',
                    field: 'nameChar',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    title: '资源',
                    field: 'resource',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    title: '正常资源',
                    field: 'normalResource',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    title: '错误资源',
                    field: 'errorResource',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    title: '监测器',
                    field: 'monitor',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    title: '正常监测器',
                    field: 'normalMonitor',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    title: '危险监测器',
                    field: 'dangerMonitor',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    title: '错误监测器',
                    field: 'errorMonitor',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    title: '禁止监测器',
                    field: 'banMonitor',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    title: '最后更新',
                    field: 'lastModify',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                },{
                    width: 50,
                    formatter: settingFomatter
                }
            ],
            data: data});
        var refreshBtnObj= document.createElement('button');
        refreshBtnObj.setAttribute('class', 'btn btn-default');
        refreshBtnObj.setAttribute('type', 'button');
        refreshBtnObj.setAttribute('name', 'refresh');
        refreshBtnObj.setAttribute('title', '刷新');
        refreshBtnObj.setAttribute('data-toggle', 'modal');
        refreshBtnObj.setAttribute('data-target', '#tab1_Gy_refresh');
        refreshBtnObj.innerHTML = '<i class="fa fa-refresh"></i>';
        var deleteBtnObj= document.createElement('button');
        deleteBtnObj.setAttribute('class', 'btn btn-default');
        deleteBtnObj.setAttribute('type', 'button');
        deleteBtnObj.setAttribute('name', 'delete');
        deleteBtnObj.setAttribute('title', '删除');
        deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';
        var addBtnObj = document.createElement('button');
        addBtnObj.setAttribute('class', 'btn btn-default');
        addBtnObj.setAttribute('type', 'button');
        addBtnObj.setAttribute('name', 'add');
        addBtnObj.setAttribute('title', '添加');
        addBtnObj.setAttribute('data-toggle', 'modal');
        addBtnObj.setAttribute('data-target', '#tab1_Gy_add');
        addBtnObj.innerHTML = '<i class="fa fa-plus"></i>';
        var searchObj = document.createElement('input');
        searchObj.setAttribute('type', 'text');
        searchObj.setAttribute('class', 'pull-left limitFileInput');
        searchObj.setAttribute('placeholder', '名称过滤文本');
        var btnGroup = document.getElementsByClassName('equipmentManageTable')[0].firstChild.firstChild.childNodes[1];
        btnGroup.insertBefore(refreshBtnObj, btnGroup.childNodes[0]);
        btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
        btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
        btnGroup.insertBefore(searchObj, btnGroup.childNodes[0]);

        tableResetView();
        $('#sonGroupMonitorTable').on('reset-view.bs.table', function (){
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
                <div id='sonGroupMonitorTable-toolbar'>
                    <div className='form-inline' role='form'>
                        <div className='form-group marginRight_10'>
                            <span className='spanFontStyle'>监测器列表（4）</span>
                        </div>
                    </div>
                </div>
                <table id='sonGroupMonitorTable'
                       data-toggle='table'
                       data-classes='table table-no-bordered table-hover'
                       data-height={285}
                       data-toolbar='#sonGroupMonitorTable-toolbar'
                       data-show-refresh='false'
                       data-show-toggle='true'
                       data-show-columns='true'
                       data-pagination='true'
                       data-page-size='10'
                       data-resizable='true'>
                </table>
            </div>
        );
    }
});

module.exports = SonGroup;
