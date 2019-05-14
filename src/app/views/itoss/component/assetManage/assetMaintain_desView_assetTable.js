/**
* Created by Yuchen  2016/02/18.
* 资产维保
*/

import React from 'react'
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');
require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');

var ReactRouter = require('react-router');
var History = ReactRouter.History;

var dateFormatter = function(value){
    var d = util.getDateObj(value);
    if(!isNaN(d)) return d.Format("yyyy-MM-dd");
    return "-";
}
var remainTimeFormatter = function(value){
    var res = "-";
    if(!value||value==null) return res;
    var days = parseInt(value,10);
    if(days<1){
        res = "<span class='i-warning'>已超过保修期</span>";
    }
    else if(days<7){
        res = days+" 天";
    }
    else if(days<30){
        res = Math.round(days/7,10);
        switch(res){
            case 1: res = "一"; break;
            case 2: res = "两"; break;
            case 3: res = "三"; break;
            case 4: res = "四"; break;
        }
        res += " 周";
    }
    else if(days<335){
        res = Math.round(days/30,10);
        switch(res){
            case 1: res = "一"; break;
            case 2: res = "两"; break;
            case 3: res = "三"; break;
            case 4: res = "四"; break;
            case 5: res = "五"; break;
            case 6: res = "六"; break;
            case 7: res = "七"; break;
            case 8: res = "八"; break;
            case 9: res = "九"; break;
            case 10: res = "十"; break;
            case 11: res = "11 "; break;
            case 12: res = "12 "; break;
        }
        res += "个月";
    }
    else{
        res = Math.round(days/335,10)+" 年";
    }
    return res;
}
//表格组件
var TableCom = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        //初始化table
        this._initTable();
    },
    shouldComponentUpdate: function(nextProps, nextState){
      if (nextProps.AssetList !== this.props.AssetList) {
        this.handleAssetList(nextProps);
      }
      return true;
    },
    handleAssetList:function(propstemp){
      var _this = this;
      var tabletemp = $('#assetTableData');
      console.log("assetTableData");
      console.log(tabletemp);
      console.log(propstemp.AssetList);
      tabletemp.bootstrapTable('refreshOptions',{data: propstemp.AssetList});
      //$('#assetTableData').bootstrapTable('refreshOptions', {data: propstemp.AssetList});
    },
    render: function(){
        var showFrom = this.props.state.from;
        var showTo = showFrom+this.props.state.numPerPage-1;
        var showAmount = this.props.AssetCount;
        if(showTo > showAmount) showTo = showAmount;
        if(showAmount == 0){
            showFrom = 0;
            showTo = 0;
        }
        return (
            <div>
                <table id='assetTableData'
                    data-toggle='table'
                    data-classes='table table-no-bordered table-hover'
                    data-show-refresh='true'
                    data-show-toggle='true'
                    data-show-columns='true'
                    data-sort-name='wpFlagTime'
                    data-sort-order='desc'
                    data-resizable='true'>
                </table>
                <div className="fixed-table-pagination">
                    <div id="pagination-detail" className="pull-left pagination-detail">
                        <span className="pagination-info">显示第 {showFrom} 到第 {showTo} 条记录，总共 {showAmount} 条记录</span>
                        <span className="page-list">
                            {"每页显示 "}
                            <span className="btn-group dropup">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.props.state.numPerPage} <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" id="select-numPerPage-list">
                                    <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)" data-val={10} >10</a></li>
                                    <li className="active" onClick={this._handleOnClickPageList}><a href="javascript:void(0)" data-val={25} >25</a></li>
                                    <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)" data-val={50} >50</a></li>
                                    <li onClick={this._handleOnClickPageList}><a href="javascript:void(0)" data-val={100} >100</a></li>
                                </ul>
                            </span>
                            {" 条记录"}
                        </span>
                    </div>
                    <div id="pagination" className="pull-right pagination">
                        {this._getPageNumberLi()}
                    </div>
                </div>
            </div>
        );
    },
    _initTable: function(){
        $('#assetTableData').bootstrapTable({
            columns: [
                {
                    title: '维保截止时间',
                    field: 'warrantyPeriod',
                    halign: 'left',
                    align: 'left',
                    formatter: dateFormatter,
                    sortable: true
                }, {
                    title: '维保剩余时间',
                    field: 'wpFlagTime',
                    halign: 'left',
                    align: 'left',
                    formatter: remainTimeFormatter,
                    sortable: true,
                    order: 'asc'
                }, {
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
                },{
                    title: '设备类型',
                    field: 'productTypeName',
                    halign: 'left',
                    align: 'left',
                    sortable: true
                }, {
                    title: '设备型号',
                    field: 'productModel',
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
                    title: '录入时间',
                    field: 'createdDateTime',
                    halign: 'left',
                    align: 'left',
                    sortable: true,
                }, {//资产ID
                    field: 'recId',
                    visible: false
                }, {//设备类型ID
                    field: 'productTypeId',
                    visible: false
                }, {//是否为过保资产
                    field: 'wpFlag',
                    visible: false
                }
            ],
            data: [],
            onClickRow: this._onClickRow,
            onSort: this._onClickSort,
            onPostHeader: this._onLoadTableHeader,
            exportDataType: "all"
        });
    },
    _onClickRow: function(e){
        this.props.set_assetDetailID({val:e.recId, noChange: true});

        // var zTree = $.fn.zTree.getZTreeObj("commonTree");
        // var treeNodes = zTree.getNodes();
        // var beforeNode = zTree.getNodeByParam("name","资产维保");
        // var targetNode = zTree.getNodeByParam("name","资产统计列表");
        // // console.log(targetNode);
        // var tid = targetNode.tId;
        // var tIndex = zTree.getNodeIndex(targetNode);
        // document.getElementById(tid).className = "fadeInMenu";
        // zTree.selectNode(targetNode);
        // this.props.set_linshiData(tIndex);
        // this.props.set_linshiNode(beforeNode);

        this.props.setCurName("资产统计列表");
        this.history.pushState(null,'assetManage/detail');
    },
    _onClickSort: function(e){
        var _this = this;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        var D = DOMNode.find("th[data-field="+e+"]").find(".sortable");
        var order = "desc";
        if(D.hasClass("desc")) {//降序变升序
            order = "asc";
        }
        else if(D.hasClass("asc")) {//升序变降序
            order = "desc";
        }
        else {//无序变降序
            order = "desc";
        }
        var sortData = {
            name: e,
            order: order,
        }
        this.props.setState({
            sort_name: e,
            sort_order: order,
        },function(){//请求服务器
            var _from = _this.props.state.from;
            var _to = _this.props.state.from+ _this.props.state.numPerPage-1;
            if(_to>_this.props.AssetCount) _to = _this.props.AssetCount;
            _this.props.request({
                range:{
                    from: _from,
                    to: _to
                }
            });
        });
    },
    _onLoadTableHeader: function(){
        var _this = this;
        this.props.onLoadTableHeader({
            refreshFilter: function(){
                this.props.set_default_filter_value_assetMaintain({typeID: "-",noChange: true});
            }
        });
    },
    _handleOnClickPageList: function(e){
        var _this = this;
        var val = parseInt($(e.target).data("val"),10);
        var aimFrom = 0;
        var currentPage = this.props.state.currentPage;
        var amount = this.props.AssetCount;
        var totalPageNum = Math.ceil(amount/val);
        if(currentPage>totalPageNum) currentPage=totalPageNum;
        aimFrom = (currentPage-1)*val+1;
        this.props.setState({
            numPerPage: val,
            currentPage: currentPage,
            from: aimFrom,
        },function(){
            $("#select-numPerPage-list li").removeClass("active");
            $("#select-numPerPage-list li").each(function(){
                a = $(this).find("a");
                if(a.data("val")==_this.props.state.numPerPage){
                    $(this).addClass("active");
                }
            });
            //请求服务器
            var _from = aimFrom;
            var _to = _from+val-1;
            if(_to>_this.props.AssetCount) _to = _this.props.AssetCount;
            _this.props.request({
                range:{
                    from: _from,
                    to: _to
                }
            });
        });
    },
    _handleOnClickPage: function(e){
        var _this = this;
        var val = $(e.target).text();
        var aim = 0;
        var aimFrom = 0;
        var amount = this.props.AssetCount;
        var totalPageNum = Math.ceil(amount/this.props.state.numPerPage);
        switch(val){
            case "«"://第一页
                aim=1;
                break;
            case "‹"://上一页
                aim=this.props.state.currentPage-1;
                if(aim<1) aim=1;
                break;
            case "»"://最后一页
                aim=totalPageNum;
                break;
            case "›"://下一页
                aim=this.props.state.currentPage+1;
                if(aim>totalPageNum) aim=totalPageNum;
                break;
            default://页码
                aim=parseInt(val,10);
                break;
        }
        aimFrom = (aim-1)*this.props.state.numPerPage+1;
        this.props.setState({
            currentPage: aim,
            from: aimFrom
        },function(){//请求服务器
            var _from = aimFrom;
            var numPerPage = _this.props.state.numPerPage
            var _to = _from+numPerPage-1;
             if(_to>_this.props.AssetCount) _to = _this.props.AssetCount;
            _this.props.request({
                range:{
                    from: _from,
                    to: _to
                }
            });
        });
    },
    _getPageNumberLi: function() {
        var _this = this;
        var amount = this.props.AssetCount;
        var totalPageNum = Math.ceil(amount/this.props.state.numPerPage);
        var pageArray = [];
        if(totalPageNum<=1) return null;

        var disable_first = this.props.state.currentPage==1;
        var disable_last = this.props.state.currentPage==totalPageNum;
        if(totalPageNum<=5) {
            for(var i = 0; i < totalPageNum; i++) {
                pageArray.push(i+1);
            }
            return (
                <ul id="pagination-list" className="pagination">
                    <li className={disable_first?"page-first disabled":"page-first"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">«</a></li>
                    <li className={disable_first?"page-pre disabled":"page-pre"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">‹</a></li>
                    {
                        pageArray.map(function(page) {
                            active = page==_this.props.state.currentPage;
                            return (<li className={active?"page-number active":"page-number"} onClick={_this._handleOnClickPage}><a href="javascript:void(0)">{page}</a></li>);
                        })
                    }
                    <li className={disable_last?"page-next disabled":"page-next"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">›</a></li>
                    <li className={disable_last?"page-last disabled":"page-last"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else if(this.props.state.currentPage<=3) {
            return (
                <ul id="pagination-list" className="pagination">
                    <li className={disable_first?"page-first disabled":"page-first"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">«</a></li>
                    <li className={disable_first?"page-pre disabled":"page-pre"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">‹</a></li>
                    <li className={this.props.state.currentPage==1?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">1</a></li>
                    <li className={this.props.state.currentPage==2?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">2</a></li>
                    <li className={this.props.state.currentPage==3?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">3</a></li>
                    <li className={this.props.state.currentPage==4?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">4</a></li>
                    <li className={this.props.state.currentPage==5?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">5</a></li>
                    <li className={disable_last?"page-next disabled":"page-next"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">›</a></li>
                    <li className={disable_last?"page-last disabled":"page-last"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else if(totalPageNum-this.props.state.currentPage<=2) {
            return (
                <ul id="pagination-list" className="pagination">
                    <li className={disable_first?"page-first disabled":"page-first"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">«</a></li>
                    <li className={disable_first?"page-pre disabled":"page-pre"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">‹</a></li>
                    <li className={this.props.state.currentPage==(totalPageNum-4)?"page-number active":"page-number"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">{totalPageNum-4}</a></li>
                    <li className={this.props.state.currentPage==(totalPageNum-3)?"page-number active":"page-number"}  onClick={this._handleOnClickPage}><a href="javascript:void(0)">{totalPageNum-3}</a></li>
                    <li className={this.props.state.currentPage==(totalPageNum-2)?"page-number active":"page-number"}  onClick={this._handleOnClickPage}><a href="javascript:void(0)">{totalPageNum-2}</a></li>
                    <li className={this.props.state.currentPage==(totalPageNum-1)?"page-number active":"page-number"}  onClick={this._handleOnClickPage}><a href="javascript:void(0)">{totalPageNum-1}</a></li>
                    <li className={this.props.state.currentPage==totalPageNum?"page-number active":"page-number"}  onClick={this._handleOnClickPage}><a href="javascript:void(0)">{totalPageNum}</a></li>
                    <li className={disable_last?"page-next disabled":"page-next"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">›</a></li>
                    <li className={disable_last?"page-last disabled":"page-last"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
        else {
            var pageArray = [this.props.state.currentPage-2, this.props.state.currentPage-1, this.props.state.currentPage, this.props.state.currentPage+1, this.props.state.currentPage+2];
            var active = 0;
            return (
                <ul id="pagination-list" className="pagination">
                    <li className={disable_first?"page-first disabled":"page-first"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">«</a></li>
                    <li className={disable_first?"page-pre disabled":"page-pre"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">‹</a></li>
                    {
                        pageArray.map(function(page) {
                            active = page == _this.props.state.currentPage;
                            return (<li className={active?"page-number active":"page-number"} onClick={_this._handleOnClickPage}><a href="javascript:void(0)">{page}</a></li>);
                        })
                    }
                    <li className={disable_last?"page-next disabled":"page-next"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">›</a></li>
                    <li className={disable_last?"page-last disabled":"page-last"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">»</a></li>
                </ul>
            )
        }
    },
});

var Filter = React.createClass({//过滤器组件
    mixins: [History],
    componentWillUnmount: function(){
        this.props.set_default_filter_value_assetMaintain({typeID: "-",noChange: true});
    },
    render: function(){
        var type_list = [{id:"-",name:"全部"}];
        var area_list = [{id:"-",name:"全部"}];
        //加工
        for(var i in this.props.Filter_TypeList){
            type_list.push({id:this.props.Filter_TypeList[i].RecId,name:this.props.Filter_TypeList[i].TypeName});
        }
        for(var i in this.props.Filter_AreaList){
            area_list.push({id:this.props.Filter_AreaList[i].RecId,name:this.props.Filter_AreaList[i].Name});
        }
        var default_typeID = this.props.DefaultTypeID_assetMaintain;
        var default_areaID = area_list[0].id;
        return (
            <div className="fixedFiltrationConditionDiv freeFiltrationConditionDiv col-md-12">
                <div className="col-md-12">
                    <div className="width1 dropdown-item">
                        <div className="fixedHeader width1-full" >资产编码</div>
                        <div className="form-control dropdownStyle width5-full rw-combobox rw-widget" style={{border:"none"}}>
                            <input id="assetsCode-input" className="form-control rw-widget" type="text" />
                        </div>
                    </div>
                    <div className="width1 marginLeft dropdown-item">
                        <div className="fixedHeader width1-full" >资产名称</div>
                        <div className="form-control dropdownStyle width5-full rw-combobox rw-widget" style={{border:"none"}}>
                            <input id="assetsName-input" className="form-control rw-widget" type="text" />
                        </div>
                    </div>
                    <div className="width6 marginLeft dropdown-item">
                        <div className="fixedHeader width1-full">设备类型</div>
                        <ReactWidgets.DropdownList id="typeList-Dropdown" className='form-control dropdownStyle width5-full' valueField='id' textField='name' data={type_list}
                        defaultValue={default_typeID} caseSensitive={false} />
                    </div>
                    <div className="width6 marginLeft dropdown-item">
                        <div className="fixedHeader width1-full">区域</div>
                        <ReactWidgets.DropdownList id="areaList-Dropdown" className='form-control dropdownStyle width5-full' valueField='id' textField='name' data={area_list}
                        defaultValue={default_areaID} caseSensitive={false} />
                    </div>
                    <div className="width7 marginLeft search-item">
                        <button id="search-btn" type="button" onClick={this._request} className="btn btn-default btnSave">查询</button>
                    </div>
                </div>
            </div>
        );
    },
    _request: function(){
        var _this = this;
        var filter = {};
        filter.name = $("#assetsName-input").val();
        filter.code = $("#assetsCode-input").val();
        filter.type = $("#typeList-Dropdown").find(".rw-input").text();
        filter.area = $("#areaList-Dropdown").find(".rw-input").text();
        this.props.setState({
            origin_filter: filter,
            from: 1,
            currentPage: 1,
        },function(){
            _this.props.request();
        });
    },
});
var AssetTable = React.createClass({
    mixins: [History],
    render: function() {
        var _this = this;
        return (
            <div className='assetCreateTableDiv col-md-12'>
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab">资产维保列表</a></li>
                </ul>
                <fieldset className="assetManageTable hardwareAssetTableBox">
                    <Filter request={this._request} setState={this.props.setState} state={this.props.state}
                      DefaultTypeID_assetMaintain={this.props.DefaultTypeID_assetMaintain} Filter_TypeList={this.props.Filter_TypeList} Filter_AreaList={this.props.Filter_AreaList}
                      set_default_filter_value_assetMaintain={this.props.set_default_filter_value_assetMaintain} />
                    <TableCom onLoadTableHeader={this.props.onLoadTableHeader} request={this._request} setState={this.props.setState} state={this.props.state}
                      AssetList={this.props.AssetList} AssetCount={this.props.AssetCount}
                      set_linshiData={this.props.set_linshiData} set_linshiNode={this.props.set_linshiNode}
                      set_assetDetailID={this.props.set_assetDetailID} set_default_filter_value_assetMaintain={this.props.set_default_filter_value_assetMaintain}
                      setCurName={this.props.setCurName}
                    />
                </fieldset>
            </div>
        );
    },
    _request: function(param){
        var _this = this;
        var filter = {}, data = {};
        if(param && param.range){//通过点击页码查询
            filter.name = this.props.origin_filter.name;
            filter.code = this.props.origin_filter.code;
            filter.type = this.props.origin_filter.type;
            filter.area = this.props.origin_filter.area;
            filter.from = parseInt(param.range.from,10);
            filter.to = parseInt(param.range.to,10);
            var typeID = this.props.DefaultTypeID_assetMaintain;
            if(typeID && typeID != "-"){
                data.wpflag = true;
            }
        }
        else{//通过点击【查询】按钮查询
            filter.name = $("#assetsName-input").val();
            filter.code = $("#assetsCode-input").val();
            filter.type = $("#typeList-Dropdown").find(".rw-input").text();
            filter.area = $("#areaList-Dropdown").find(".rw-input").text();
            filter.from = parseInt(this.props.state.from,10);
            filter.to = parseInt(this.props.state.numPerPage,10)-filter.from;
            _this.props.set_default_filter_value_assetMaintain({
                typeID: "-",
                noChange: true,
            });
        }
        for(var i in this.props.Filter_TypeList){//通过资产类型名字获取资产类型ID
            if(this.props.Filter_TypeList[i].TypeName==filter.type){
                filter.typeID = this.props.Filter_TypeList[i].RecId;
            }
        }
        for(var i in this.props.Filter_AreaList){//通过区域名字获取区域ID
            if(this.props.Filter_AreaList[i].Name==filter.area){
                filter.areaID = this.props.Filter_AreaList[i].RecId;
            }
        }

        if(filter.name && filter.name !="") data.name = filter.name;
        if(filter.code && filter.code !="") data.code = filter.code;
        if(this.props.state.sort_name !="") data.sort_name = this.props.state.sort_name;
        if(this.props.state.sort_order !="") data.sort_order = this.props.state.sort_order;
        data.from = filter.from-1;
        data.to = this.props.state.numPerPage;
        if(filter.typeID && filter.typeID !="-") data.typeID = filter.typeID;
        if(filter.areaID && filter.areaID !="-") data.areaID = filter.areaID;

        this.props.get_asset_data({data: data});
    },
});

module.exports = AssetTable;
