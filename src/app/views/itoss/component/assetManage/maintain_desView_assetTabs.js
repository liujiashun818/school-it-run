/**
* Created by Yuchen  2016/01/13.
* 维修清单列表 列表部
*/

require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');
var widget = require('./../../../../utils/widget.js');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');

var dateFormatter = function(value){
    var res = "-";
    if(!value||value==null) return res;
    var date = util.getDateObj(value);
    if(isNaN(date)) return res;
    res = date.Format("yyyy-MM-dd hh:mm:ss");
    return res;
}

var Filter = React.createClass({//过滤器组件
    mixins: [History],
    render: function(){
        var area_list = [{id:"-",name:"全部"}];
        //加工
        for(var i in this.props.Filter_AreaList){
            area_list.push({id:this.props.Filter_AreaList[i].RecId,name:this.props.Filter_AreaList[i].Name});
        }
        var default_areaID = area_list[0].id;
        return (
            <div className="fixedFiltrationConditionDiv freeFiltrationConditionDiv col-md-12">
                <div className="col-md-12">
                    <div className="_width1 dropdown-item">
                        <div className="fixedHeader width1-full">维修单号</div>
                        <div className="form-control dropdownStyle width5-full rw-combobox rw-widget" style={{border:"none"}}>
                            <input id="code-input" className="form-control rw-widget" type="text" />
                        </div>
                    </div>
                    <div className="_width1 marginLeft dropdown-item">
                        <div className="fixedHeader width1-full">区域</div>
                        <ReactWidgets.DropdownList id="areaList-Dropdown" className='form-control dropdownStyle width5-full' valueField='id' textField='name' data={area_list}
                        defaultValue={default_areaID} caseSensitive={false} />
                    </div>
                    <div className="_width1 marginLeft dropdown-item">
                        <div className="fixedHeader width1-full" >申请人</div>
                        <div className="form-control dropdownStyle width5-full rw-combobox rw-widget" style={{border:"none"}}>
                            <input id="applier-input" className="form-control rw-widget" type="text" />
                        </div>
                    </div>
                    <div className="_width1 marginLeft dropdown-item">
                        <div className="fixedHeader width1-full" >维修人</div>
                        <div className="form-control dropdownStyle width5-full rw-combobox rw-widget" style={{border:"none"}}>
                            <input id="maintainer-input" className="form-control rw-widget" type="text" />
                        </div>
                    </div>
                    <div className="_width2 marginLeft search-item">
                        <button id="search-btn" type="button" onClick={this._request} className="btn btn-default btnSave btnSave2">查询</button>
                    </div>
                </div>
                <div className="cleafix"></div>
            </div>
        );
    },
    _request: function(){
        var _this = this;
        var filter = {};
        filter.code = $("#code-input").val();
        filter.area = $("#areaList-Dropdown").find(".rw-input").text();
        filter.applier = $("#applier-input").val();
        filter.maintainer = $("#maintainer-input").val();
        this.props.setState({
            origin_filter: filter,
        },function(){
            _this.props.request({
                range:{
                    from: 1,
                    to: _this.props.state.numPerPage,
                },
            });
        });
    },
});
var Maintain_desView_assetTabs = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            initFrom: 1,
            initNumPerPage: 25,
            initCurrentPage: 1,
            numPerPage: 25,
        }
    },
    componentDidMount: function(){
        var _this = this;
        var _from = _this.state.initFrom*_this.state.initCurrentPage - 1;
        var _to = _this.state.initNumPerPage;
        this.props.get_maintain_order({
            data: {
                from: _from,
                to: _to,
            },
        });
    },
    componentDidUpdate: function(){
        var _this = this;
        var table = $('#maintainOrderTable');
        var data = _this.props.MaintainOrderList;
        table.bootstrapTable('refreshOptions', {data: data});
    },
    render: function() {
        var _this = this;
        var onClickRow = function(e){
            var valid = util.hasPermission(_this.props.Permissions,"/assetmanage/maintain/maintainlist");
            if(valid==null) return;
            _this.props.set_maintainDetailID({val:e.recId});
            _this.history.pushState(null,'assetManage/maintainDetail');
        };
        var onClickSort = function(e){};
        var onClickRefresh = function(e){
            var _from = e.from*e.currentPage - 1;
            var _to = e.numPerPage - e.from + 1;
            _this.props.get_maintain_order({
                data: {
                    from: _from,
                    to: _to,
                }
            });
        };
        var columns = [
            {
                field: 'state',
                checkbox: true
            }, {
                title: '维修单号',
                field: 'fileNumber',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '区域',
                field: 'areaName',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '申请人',
                field: 'createdBy',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '维修人',
                field: 'checkName',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '维修人电话',
                field: 'checkPhone',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '创建时间',
                field: 'createdDateTime',
                halign: 'left',
                align: 'left',
                formatter: dateFormatter,
                sortable: true
            }, {
                title: '维修时间',
                field: 'checkTime',
                halign: 'left',
                align: 'left',
                formatter: dateFormatter,
                sortable: true
            }];
        return (
            <div className='assetCreateTableDiv col-md-12'>
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab">维修清单</a></li>
                </ul>
                <fieldset className="assetManageTable hardwareAssetTableBox">
                    <Filter request={this._request} setState={this._setState} state={this.state} />
                    <widget.PaginationTable
                        state={this.state}
                        setState={this._setState}
                        initFrom={this.state.initFrom}
                        initNumPerPage={this.state.initNumPerPage}
                        initCurrentPage={this.state.initCurrentPage}
                        columns={columns}
                        list={this.props.MaintainOrderList}
                        id={"maintainOrderTable"}
                        count={this.props.MaintainOrderCount}
                        onClickRow={onClickRow}
                        onClickSort={onClickSort}
                        onClickRefresh={onClickRefresh}
                        request={this._request}
                        requestBtnId={"search-btn"} />
                </fieldset>
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
        data.from = param.range.from - 1;
        data.to = param.range.to-param.range.from + 1;
        if(param.sort_name) data.sort_name=param.sort_name;
        if(param.sort_order) data.sort_order=param.sort_order;
        if(this.state.sort_name) data.sort_name = this.state.sort_name;
        if(this.state.sort_order) data.sort_order = this.state.sort_order;
        filter = this.state.origin_filter;
        if(filter){
            if(filter.code&&filter.code!="") data.code = filter.code;
            if(filter.area&&filter.area!="") {
                for(var i in this.props.Filter_AreaList) {//通过区域名字获取区域ID
                    if(this.props.Filter_AreaList[i].Name==filter.area){
                        data.areaID = this.props.Filter_AreaList[i].RecId;
                        break;
                    }
                }
            }
            if(filter.applier&&filter.applier!="") data.applier = filter.applier;
            if(filter.maintainer&&filter.maintainer!="") data.maintainer = filter.maintainer;
        }
        this.props.get_maintain_order({
            data: data
        });
    },
});

module.exports = Maintain_desView_assetTabs;
