/**
* Created by Yuchen  2016/01/08.
*/

var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');
var importAsset = require('./../../../../utils/importAsset.js');
require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');

var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var dateTimeFormatter = function(value){
    var d = util.getDateObj(value);
    if(!isNaN(d)) return d.Format("yyyy-MM-dd hh:mm:ss");
    return "-";
}
var dateFormatter = function(value){
    var d = util.getDateObj(value);
    if(!isNaN(d)) return d.Format("yyyy-MM-dd");
    return "-";
}

var Table = React.createClass({//表格组件
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     };
    // },
    componentDidMount: function() {
        //初始化table
        this._initTable();
    },
    componentDidUpdate: function() {
        var _this = this;
        var table = $('#assetTable');
        //更新table
        table.bootstrapTable('refreshOptions',{data: this.props.AssetList});
        table.bootstrapTable('load',this.props.AssetList);
        //设置导出的按钮
        var btnGroup = $('#assetManageTable-fieldset').find(".fixed-table-toolbar").children().eq(0)[0];
        var button = $(btnGroup).find("button[name='export']");
        if(button.length==0){
            var btnObj= document.createElement('button');
            btnObj.setAttribute('class', 'btn btn-default');
            btnObj.setAttribute('type', 'button');
            btnObj.setAttribute('name', 'export');
            btnObj.setAttribute('id', 'btn-export');
            btnObj.setAttribute('title', '导出到Excel');
            btnObj.onclick = function(e){
                _this.props.handleOnExport();
            };
            btnObj.innerHTML = '<i class="glyphicon glyphicon-export icon-export"></i>';
            btnGroup.insertBefore(btnObj, btnGroup.childNodes[0]);
        }
        //设置导入的按钮
        var button = $(btnGroup).find("button[name='import']");
        if(button.length==0){
            var btnObj= document.createElement('button');
            btnObj.setAttribute('class', 'btn btn-default');
            btnObj.setAttribute('type', 'button');
            btnObj.setAttribute('name', 'import');
            btnObj.setAttribute('id', 'btn-import');
            btnObj.setAttribute('title', '导入Excel');
            btnObj.onclick = function(e){
                _this.props.handleOnImport();
            };
            btnObj.innerHTML = '<i class="glyphicon glyphicon-import icon-import"></i>';
            btnGroup.insertBefore(btnObj, btnGroup.childNodes[0]);
        }
    },
    render: function(){
        var showFrom = this.props.state.from;
        var showTo = showFrom+this.props.state.numPerPage-1;
        var showAmount = this.props.AssetCount;
        if(showTo>showAmount) showTo = showAmount;
        if(showAmount==0){
            showFrom = 0;
            showTo = 0;
        }
        return (
            <div>
                <table id='assetTable'
                    data-toggle='table'
                    data-classes='table table-no-bordered table-hover'
                    data-show-refresh='true'
                    data-show-toggle='true'
                    data-show-columns='true'
                    data-sort-name='CREATED_DATETIME'
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
        $('#assetTable').bootstrapTable({
            columns: [{
                    title: '资产编码',
                    field: 'assetsCode',
                    sortable: true
                }, {
                    title: '资产名称',
                    field: 'assetsName',
                    halign: 'left',
                    align: 'left',
                    sortable: true,
                }, {
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
                    formatter: dateTimeFormatter,
                    sortable: true,
                }, {
                    title: '维保截止时间',
                    field: 'warrantyPeriod',
                    halign: 'left',
                    align: 'left',
                    formatter: dateFormatter,
                    sortable: true
                }, {//资产ID
                    field: 'recId',
                    visible: false
                }, {//设备类型ID
                    field: 'productTypeId',
                    visible: false
                },
            ],
            data: [],
            onClickRow: this._onClickRow,
            onSort: this._onClickSort,
            onPostHeader: this._onLoadTableHeader,
            exportDataType: "all"
        });
    },
    _onClickRow: function(e){
        var valid = util.hasPermission(this.props.Permissions,"/assetmanage/asset/assetlist");
        if(valid==null) return;
        this.props.set_assetDetailID({val:e.recId, noChange: true});

        // var zTree = $.fn.zTree.getZTreeObj("commonTree");
        // var treeNodes = zTree.getNodes();
        // var targetNode = zTree.getNodeByParam("name","资产统计列表");
        // // console.log(targetNode);
        // var tid = targetNode.tId;
        // var tIndex = zTree.getNodeIndex(targetNode);
        // document.getElementById(tid).className = "fadeInMenu";
        // zTree.selectNode(targetNode);
        // var curThreeNode = this.props.curThreeNode;
        // this.props.onSetPreThreeNode("");
        // this.props.onSetCurThreeNode(targetNode);

        this.props.setCurName("资产统计列表");
        this.history.pushState(null,'assetManage/detail');
    },
    _onClickSort: function(e){
        var _this = this;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        var D = DOMNode.find("th[data-field="+e+"]").find(".sortable");
        var order = "";
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
                    to: _to,
                }
            });
        });
    },
    _onLoadTableHeader: function(){
        var _this = this;
        this.props.onLoadTableHeader({
            refreshFilter: function(){
                this.props.set_default_filter_value_assetList({typeID: "-",noChange: true});
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
        var aimFrom = (currentPage-1)*val+1;
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
                    to: _to,
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
            from: aimFrom,
        },function(){//请求服务器
            var _from = aimFrom;
            var numPerPage = _this.props.state.numPerPage
            var _to = _from+numPerPage-1;
            if(_to>_this.props.AssetCount) _to = _this.props.AssetCount;
            _this.props.request({
                range:{
                    from: _from,
                    to: _to,
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
                            var active = page==_this.props.state.currentPage;
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
            pageArray = [this.props.state.currentPage-2, this.props.state.currentPage-1, this.props.state.currentPage, this.props.state.currentPage+1, this.props.state.currentPage+2];
            return (
                <ul id="pagination-list" className="pagination">
                    <li className={disable_first?"page-first disabled":"page-first"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">«</a></li>
                    <li className={disable_first?"page-pre disabled":"page-pre"} onClick={this._handleOnClickPage}><a href="javascript:void(0)">‹</a></li>
                    {
                        pageArray.map(function(page) {
                            var active = page==_this.props.state.currentPage;
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
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     };
    // },
    componentWillUnmount: function(){
        this.props.set_default_filter_value_assetList({typeID: "-",noChange: true});
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
        var default_typeID = this.props.DefaultTypeID_assetList;
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
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    render: function() {
        var _this = this;
        var valid_create = util.hasPermission(this.props.Permissions,"/assetmanage/asset/assetlist/add");
        var create_btn = valid_create!=null?<button type="button" id="btn-create" className="btn btn-success btnNormal" onClick={this._handleOnClick} >新建资产</button>:"";
        return (
            <div id="assetMaintainDesViewDiv" className="overviewDesViewDiv assetDesViewDiv">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        资产管理：资产统计列表
                    </div>
                    <div className="titleRight2">
                        <a className="home-link" id="home-link" onClick={this._handleOnClick} >返回资产统计</a>
                        <a className="home-link"><i title ="点击返回资产统计" className="fa fa-question-circle fa-lg" style={{marginLeft: '8px'}}></i></a>
                        <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="staticDiv col-md-12">
                    <div className="staticLeftDiv">
                        <div className='remarkDiv2'>
                            <span>资产统计列表的功能：采用列表查看组织全部资产信息，并可以按任一条件如资产名称、设备类型、区域、搜索资产其它信息查询资产的状况。</span>
                        </div>
                        <div className='btnGroupDiv2' id="btn-btnGroup">
                            {create_btn}
                        </div>
                    </div>
                </div>
                <div className='assetCreateTableDiv col-md-12'>
                    <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab">资产列表</a></li>
                    </ul>
                    <fieldset className="assetManageTable hardwareAssetTableBox" id="assetManageTable-fieldset">
                        <Filter request={this._request} setState={this.props.setState} state={this.props.state}
                          set_default_filter_value_assetList={this.props.set_default_filter_value_assetList}
                          Filter_TypeList={this.props.Filter_TypeList} Filter_AreaList={this.props.Filter_AreaList}
                          DefaultTypeID_assetList={this.props.DefaultTypeID_assetList} />
                        <Table onLoadTableHeader={this.props.onLoadTableHeader}
                            request={this._request}
                            setState={this.props.setState}
                            state={this.props.state}
                            handleOnExport={this._handleOnExport}
                            handleOnImport={this._handleOnImport}
                            AssetList={this.props.AssetList}
                            AssetCount={this.props.AssetCount}
                            Permissions={this.props.Permissions}
                            curThreeNode={this.props.curThreeNode}
                            set_assetDetailID={this.props.set_assetDetailID}
                            onSetPreThreeNode={this.props.onSetPreThreeNode}
                            onSetCurThreeNode={this.props.onSetCurThreeNode}
                            setCurName={this.props.setCurName}
                            set_default_filter_value_assetList={this.props.set_default_filter_value_assetList}/>
                        <div id="assetTable2-div">
                            <table id='assetTable2'
                                data-toggle='table'
                                data-classes='table table-no-bordered table-hover'
                                data-show-export="true"
                                data-toggle='table'>
                            </table>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    },
    _request: function(param){
        var _this = this;
        var filter = {}, data = {};
        if(param&&param.range){//通过点击页码查询
            filter.name = this.props.origin_filter.name;
            filter.code = this.props.origin_filter.code;
            filter.type = this.props.origin_filter.type;
            filter.area = this.props.origin_filter.area;
            filter.from = parseInt(param.range.from,10);
            filter.to = parseInt(param.range.to,10);
        }
        else{//通过点击【查询】按钮查询
            filter.name = $("#assetsName-input").val();
            filter.code = $("#assetsCode-input").val();
            filter.type = $("#typeList-Dropdown").find(".rw-input").text();
            filter.area = $("#areaList-Dropdown").find(".rw-input").text();
            filter.from = parseInt(this.props.state.from,10);
            filter.to = parseInt(this.props.state.numPerPage,10)-filter.from;
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
        if(filter.name&&filter.name!="") data.name = filter.name;
        if(filter.code&&filter.code!="") data.code = filter.code;
        if(this.props.state.sort_name!="") data.sort_name = this.props.state.sort_name;
        if(this.props.state.sort_order!="") data.sort_order = this.props.state.sort_order;
        data.from = filter.from-1;
        data.to = this.props.state.numPerPage;
        if(filter.typeID&&filter.typeID!="-") data.typeID = filter.typeID;
        if(filter.areaID&&filter.areaID!="-") data.areaID = filter.areaID;
        this.props.get_asset_data({
            data: data
        });
    },
    _handleOnClick: function(e){
        var _this = this;
        var B = $(e.target);
        var id = B.attr("id");
        switch(id){
            case "home-link"://返回
                var valid = util.hasPermission(this.props.Permissions,"/assetmanage/asset/statistic");
                if(valid==null) return;

                // var zTree = $.fn.zTree.getZTreeObj("commonTree");
                // var treeNodes = zTree.getNodes();
                // var beforeNode = zTree.getNodeByParam("name","资产统计列表");
                // var targetNode = zTree.getNodeByParam("name","资产统计");
                // // console.log(targetNode);
                // var tid = targetNode.tId;
                // var tIndex = zTree.getNodeIndex(targetNode);
                // document.getElementById(tid).className = "fadeInMenu";
                // zTree.selectNode(targetNode);
                // this.props.onSetCurThreeNode(targetNode);
                // this.props.onSetPreThreeNode(beforeNode);
                // // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
                // // this.getFlux().actions.YFTIndexActions.set_linshiNode(beforeNode);
                this.props.setCurName("资产统计");
                this.history.pushState(null,'assetManage/statistic');
            break;
            case "btn-create":
                // var zTree = $.fn.zTree.getZTreeObj("commonTree");
                // var treeNodes = zTree.getNodes();
                // var beforeNode = zTree.getNodeByParam("name","资产统计列表");
                // var targetNode = zTree.getNodeByParam("name","资产统计列表");
                // var tid = targetNode.tId;
                // var tIndex = zTree.getNodeIndex(targetNode);
                // document.getElementById(tid).className = "fadeInMenu";
                // zTree.selectNode(targetNode);
                // // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
                // // this.getFlux().actions.YFTIndexActions.set_linshiNode(beforeNode);
                this.props.setCurName("资产统计列表");
                this.history.pushState(null,'assetManage/createview');
            break;
        }
    },
    _handleOnExport: function(e){
        var _this = this;
        this.props.get_asset_data({
            data: {
                from: 0,
                to: this.props.AssetCount,
            },
            callback: function(resp){
                $('#assetTable2').bootstrapTable({
                    columns: [{
                            title: '资产编码',
                            field: 'assetsCode',
                        }, {
                            title: '资产名称',
                            field: 'assetsName',
                        }, {
                            title: '设备类型',
                            field: 'productTypeName',
                        }, {
                            title: '设备型号',
                            field: 'productModel',
                        }, {
                            title: '区域',
                            field: 'areaName',
                        }, {
                            title: '录入时间',
                            field: 'createdDateTime',
                        }, {
                            title: '维保截止时间',
                            field: 'warrantyPeriod',
                        },
                    ],
                    data: resp.exportAssetList,
                    exportDataType: "all"
                });
                $("#assetTable2-div").show();
                $("#assetTable2-div").find(".export .dropdown-menu li[data-type='excel'] a").click();
                $("#assetTable2-div").hide();
            },
            export_data: true,
        });
    },
    _handleOnImport: function(e){
        var _this = this;
        console.log("导入");
    },
});

module.exports = AssetTable;
