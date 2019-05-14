/**
* Created by Yuchen  2016/01/20.
*/

var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');
require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var data = [];

var dateTimeFormatter = function(value){
    var res = "-";
    if(!value||value==null) return res;
    var date = util.getDateObj(value);
    if(isNaN(date)) return res;
    res = date.Format("yyyy-MM-dd hh:mm:ss");
    return res;
}

var MaintainOrderTable = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    componentDidMount: function() {
        var _this = this;
        var table = $('#maintainOrderTable');
        table.bootstrapTable({
            columns: [
                {
                    field: 'state',
                    checkbox: true
                }, {
                    title: '维修单号',
                    field: 'fileNumber',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '区域',
                    field: 'areaName',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '维修人',
                    field: 'checkName',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '维修人电话',
                    field: 'checkPhone',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, {
                    title: '维修时间',
                    field: 'checkTime',
                    halign: 'center',
                    align: 'center',
                    formatter: dateTimeFormatter,
                    sortable: true
                }
            ],
            data: [],//_this.state.itoss.MaintainOrderList,
            onClickRow: _this._onClickRow,
            exportDataType: "all"
        });
    },
    componentDidUpdate: function() {
        var _this = this;
        var table = $('#maintainOrderTable');
        table.bootstrapTable('refreshOptions',{data: this.props.MaintainOrderList});
    },
    render: function() {
        return (
            <div className='assetCreateTableDiv col-md-12'>
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab">维修记录</a></li>
                </ul>
                <fieldset className="assetManageTable hardwareAssetTableBox">
                    <table id='maintainOrderTable'
                           data-toggle='table'
                           data-search='true'
                           data-classes='table table-no-bordered table-hover'
                           data-show-refresh='true'
                           data-show-export="true"
                           data-show-toggle='true'
                           data-show-columns='true'
                           data-pagination='true'
                           data-page-size='10'
                           data-resizable='true'>
                    </table>
                </fieldset>
            </div>
        );
    },
    _onClickRow: function(e) {
        this.props.set_maintainDetailID({val:e.recId});
        this.history.pushState(null,'assetManage/maintainDetail');
    },
});

module.exports = MaintainOrderTable;
