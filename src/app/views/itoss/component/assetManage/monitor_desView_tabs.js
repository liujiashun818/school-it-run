/**
* Created by Yuchen  2016/01/13.
* 资产监控同步
*/

require('bootstrap');
import React from 'react'
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');
var widget = require('./../../../../utils/widget.js');

var ReactRouter = require('react-router');
var History = ReactRouter.History;
var ReactWidgets = require('react-widgets');

function bindStateFormatter(value,row){
    return (parseInt(row.STATUS)==0?"已被绑定":"未绑定");
}

var Monitor_desView_tabs = React.createClass({
    mixins: [History],//, FluxMixin, StoreWatchMixin("AssetManageStore")
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    getInitialState: function() {
        return {
            initFrom: 1,
            initNumPerPage: 25,
            initCurrentPage: 1,
        }
    },
    componentDidMount:function(){
        var _this = this;
        var _from = this.state.initFrom*this.state.initCurrentPage - 1;
        var _to = this.state.initNumPerPage;
        // this.getFlux().actions.AssetManageActions.get_monitor_data({
        this.props.get_monitor_data({
            data: {
                from: _from,
                to: _to,
            }
        });
    },
    onClickRow:function(e){
    },
    onClickSort:function(e){
    },
    onClickRefresh:function(e){
        //console.log("刷新");
        var _from = e.from*e.currentPage - 1;
        var _to = e.numPerPage - e.from + 1;
        // _this.getFlux().actions.AssetManageActions.get_monitor_data({
        this.props.get_monitor_data({
            data: {
                from: _from,
                to: _to,
            }
        });
    },
    render: function() {
        var _this = this;

        var columns = [
            {
                field: 'state',
                checkbox: true,
            }, {
                title: '组名',
                field: 'GROUPNAME',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '设备名称',
                field: 'NAME',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: 'IP地址',
                field: 'IP',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '绑定状态',
                sortable: true,
                formatter: bindStateFormatter,
                halign: 'left',
                align: 'left',
                visible: false
            }, {
                field: 'GBCODE',
                visible: false
            }, {
                field: 'EQUIPMENTTYPE',
                visible: false
            }];
        return (
            <div className='assetCreateTableDiv col-md-12'>
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab">设备列表</a></li>
                </ul>
                <fieldset className="assetManageTable hardwareAssetTableBox">
                    <widget.PaginationTable
                        initFrom={this.state.initFrom}
                        initNumPerPage={this.state.initNumPerPage}
                        initCurrentPage={this.state.initCurrentPage}
                        columns={columns}
                        list={this.props.DevList}
                        id={"deviceTable"}
                        count={this.props.DevCount}
                        onClickRow={this.onClickRow}
                        onClickSort={this.onClickSort}
                        onClickRefresh={this.onClickRefresh}
                        request={this._request} />
                </fieldset>
            </div>
        );
    },
    _request: function(param){
        var _this = this;
        var data = {};
        data.from = param.range.from - 1;
        data.to = param.range.to-param.range.from + 1;
        if(param.sort_name) data.sort_name=param.sort_name;
        if(param.sort_order) data.sort_order=param.sort_order;
        // this.getFlux().actions.AssetManageActions.get_monitor_data({
        this.props.get_monitor_data({
            data: data
        });
    },
});

module.exports = Monitor_desView_tabs;
