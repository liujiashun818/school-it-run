/**
 * Created by Yuchen on 2016/01/29.
 * 维修单详情-资产列表模态框
 */
var React = require('react');
require('bootstrap');
var Router = require('react-router');
var widget = require('./../../../../utils/widget.js');
var ReactWidgets = require('react-widgets');

var History = require('react-router').History;

var Filter = React.createClass({//过滤器组件
    mixins: [History],
    render: function(){
        var type_list = [{id:"-",name:"全部"}];
        //加工
        for(var i in this.props.Filter_TypeList){
            type_list.push({id:this.props.Filter_TypeList[i].RecId,name:this.props.Filter_TypeList[i].TypeName});
        }
        var default_typeID = type_list[0].id;
        return (
            <div className="fixedFiltrationConditionDiv freeFiltrationConditionDiv col-md-12">
                <div className="col-md-12">
                    <div className="width1 dropdown-item">
                        <div className="fixedHeader width1-full" >资产名称</div>
                        <div className="form-control dropdownStyle width5-full rw-combobox rw-widget" style={{border:"none"}}>
                            <input id="assetsName-input" className="form-control rw-widget" type="text" />
                        </div>
                    </div>
                    <div className="width1 marginLeft dropdown-item">
                        <div className="fixedHeader width1-full">设备类型</div>
                        <ReactWidgets.DropdownList id="typeList-Dropdown" className='form-control dropdownStyle width5-full' valueField='id' textField='name' data={type_list}
                        defaultValue={default_typeID} caseSensitive={false} />
                    </div>
                    <div className="_width2 marginLeft search-item">
                        <button id="search-btn" type="button" onClick={this._request} className="btn btn-default btnSave btnSave2">查询</button>
                    </div>
                </div>
            </div>
        );
    },
    _request: function(){
        var _this = this;
        var filter = {};
        filter.name = $("#assetsName-input").val();
        filter.type = $("#typeList-Dropdown").find(".rw-input").text();
        this.props.setState({
            origin_filter: filter,
            from: 1,
            currentPage: 1,
        },function(){
            _this.props.request({});
        });
    },
});

var AssetTableModal = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            origin_filter: {
                name: "",
                type: "全部",
            },
            initFrom: 1,
            initNumPerPage: 15,
            initCurrentPage: 1,
        }
    },
    componentDidMount: function() {
        var _this = this;
        $("#assetModal-selectAssets").on('show.bs.modal',function(e){
            var _from = _this.state.initFrom*_this.state.initCurrentPage - 1;
            var _to = _this.state.initNumPerPage;
            _this.props.get_asset_data({
                data: {
                    from: _from,
                    to: _to,
                }});
        });
    },
    componentDidUpdate: function() {
        var _this = this;
        var table = $('#assetTable');
        var data = _this.props.AssetList;
        table.bootstrapTable('refreshOptions', {data: data});
    },
    _handleOnClickOK: function() {
        var table = $('#assetTable');
        var data = table.bootstrapTable('getSelections')[0];
        this.props.showSelectedAsset(data);
    },
    render : function() {
        var _this = this;
        var onClickRow = function(e){};
        var onClickSort = function(e){};
        var onClickRefresh = function(e){
            var _from = e.from*e.currentPage - 1;
            var _to = e.numPerPage - e.from + 1;
            _this.props.get_asset_data({
                data: {
                    from: _from,
                    to: _to,
                }
            });
        };
        var columns = [
            {
                field: 'state',
                radio: true
            },
            {
                title: '资产编码',
                field: 'assetsCode',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '资产名称',
                field: 'assetsName',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '设备类型',
                field: 'productTypeName',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '资产型号',
                field: 'productModel',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '资产品牌',
                field: 'brandId',
                halign: 'left',
                align: 'left',
                sortable: true
            }];
        return (
            <div className="modal fade" id="assetModal-selectAssets" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog assetModalDialog" style={{width:"70%",height:"auto"}}>
                    <div className="modal-content" style={{height:"100%"}}>
                        <div className="modal-header">
                            选择需要维修的资产
                        </div>
                        <div className="modal-body" style={{height:"auto",minHeight:"336px"}}>
                            <div className='row'>
                                <Filter request={this._request} setState={this._setState} state={this.state} Filter_TypeList={this.props.Filter_TypeList} />
                                <widget.PaginationTable
                                    state={this.state}
                                    setState={this._setState}
                                    initFrom={this.state.initFrom}
                                    initNumPerPage={this.state.initNumPerPage}
                                    initCurrentPage={this.state.initCurrentPage}
                                    columns={columns}
                                    list={this.props.AssetList}
                                    id={"assetTable"}
                                    count={this.props.AssetCount}
                                    onClickRow={onClickRow}
                                    onClickSort={onClickSort}
                                    onClickRefresh={onClickRefresh}
                                    request={this._request} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK}>确定</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _setState: function(data,callback){
        if(!data) return;
        if(callback) this.setState(data,callback);
        else this.setState(data);
    },
    _request: function(param) {
        var _this = this;
        var filter = {}, data = {};
        if(param&&param.range){//通过点击页码查询
            filter.name = this.state.origin_filter.name;
            filter.type = this.state.origin_filter.type;
            filter.from = parseInt(param.range.from,10);
            filter.to = parseInt(param.range.to,10) - filter.from + 1;
        }
        else{//通过点击【查询】按钮查询
            filter.name = $("#assetsName-input").val();
            filter.type = $("#typeList-Dropdown").find(".rw-input").text();
            filter.from = parseInt(this.state.initFrom,10);
            filter.to = parseInt(this.state.initNumPerPage,10) - filter.from + 1;
        }

        for(var i in this.props.Filter_TypeList){//通过资产类型名字获取资产类型ID
            if(this.props.Filter_TypeList[i].TypeName==filter.type){
                filter.typeID = this.props.Filter_TypeList[i].RecId;
                break;
            }
        }
        if(filter.name&&filter.name!="") data.name = filter.name;
        if(filter.typeID&&filter.typeID!="-") data.typeID = filter.typeID;
        if(param.sort_name) data.sort_name = param.sort_name;
        if(param.sort_order) data.sort_order = param.sort_order;
        if(this.state.sort_name) data.sort_name = this.state.sort_name;
        if(this.state.sort_order) data.sort_order = this.state.sort_order;
        data.from = filter.from-1;
        data.to = filter.to;
        this.props.get_asset_data({
            data: data
        });
    },
});

module.exports = AssetTableModal;
