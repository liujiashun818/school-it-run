/**
* Created by Yuchen  2016/01/29.
* 维修单详情-表单
*/

require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');
var MaintainDetail_desView_tableModal = require('./maintainDetail_desView_tableModal');
var MaintainDetail_desView_detailModal = require('./maintainDetail_desView_detailModal');

var areaValueInput = React.createClass({
    render() {
        return (
            <span>
                <span>{this.props.item.name}</span>
            </span>
        );
    }
});

var Detailview_desView_assetTabs = React.createClass({
    mixins: [History],
    componentDidMount: function(){
        var _this = this;
        var table = $("#selectedAssetTable");
        var data = [_this.props.asset];
        if(!_this.props.asset||_this.props.asset==null) data = [];
        table.bootstrapTable({
            columns: [
                {
                    title: '资产编码',
                    field: 'assetsCode',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '资产名称',
                    field: 'assetsName',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '资产类型',
                    field: 'productTypeName',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '资产型号',
                    field: 'productModel',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }, {
                    title: '资产品牌',
                    field: 'brandId',
                    halign: 'center',
                    align: 'center',
                    sortable: false
                }
            ],
            data: data,
            onClickRow: this._onClickRow
        });
    },
    componentDidUpdate: function(){
        var table = $("#selectedAssetTable");
        var data = [this.props.asset];
        if(!this.props.asset||this.props.asset==null) data = [];
        table.bootstrapTable('refreshOptions',{data: data});
        $('#assetModal-selectAssets').on('hide.bs.modal',function(e){
            $("#assetsName-input").val("");
        })
        $('#assetModal-selectAssets').on('show.bs.modal',function(e){
            $("#assetsName-input").val("");
        })
    },
    _onClickRow: function(e){
        var valid = util.hasPermission(this.props.Permissions,"/assetmanage/asset/assetlist");//查看资产详情德权限
        if(valid==null) return;
        this.props.set_assetDetailID({val:e.recId});
        $("#assetModal-detail").modal('show');
    },
    render: function() {
        var _this = this;
        var change = (flag,value) => {
            switch(flag){
                case 1: _this.props.setState({areaId: value.id});break;//修改区域
                case 2: _this.props.setState({maintenancePay: value});break;//修改费用
                case 3: _this.props.setState({checkTime: value});break;//修改时间
            }
        }
        return (
            <div id="maintainOrderDetailTable" className="maintainOrderTable hardwareAssetTableBox">
                <MaintainDetail_desView_tableModal
                    Filter_TypeList={this.props.Filter_TypeList}
                    AssetList={this.props.AssetList}
                    AssetCount={this.props.AssetCount}
                    get_asset_data={this.props.get_asset_data}
                    showSelectedAsset={this._showSelectedAsset} />
                <MaintainDetail_desView_detailModal
                    AssetDetailID={this.props.AssetDetailID}
                    StatusList={this.props.StatusList}
                    Permissions={this.props.Permissions}
                    get_create_data={this.props.get_create_data}
                    get_detail_data={this.props.get_detail_data} />
                <div className='table-basic width8 no-left-margin'>
                    <div className="table-basic-row width8">
                        <div className="table-basic-h6 block width1">维修单属性</div>
                        <div className="table-basic-h6 block-content width7">
                            <div className="table-basic-h3 width3">
                                <div className="table-basic-h1 width4">维修单号 <red>*</red></div>
                                <div className="table-basic-h1-input width4" id="assetTabs-maintainCode">
                                    <div className="alert-block">维修单号不能为空</div>
                                    <input type="text" tabIndex="1" placeholder="" className="input-xlarge width8" />
                                </div>
                                <div className="table-basic-h1 width4">维修人 <red>*</red></div>
                                <div className="table-basic-h1-input width4" id="assetTabs-checkName">
                                    <div className="alert-block">维修人不能为空</div>
                                    <input tabIndex="4" type="text" placeholder="" className="input-xlarge width8" />
                                </div>
                                <div className="table-basic-h1 width4 no-bottom-border">申请人 <red>*</red></div>
                                <div className="table-basic-h1-input width4 no-bottom-border" id="assetTabs-applier">
                                    <input type="text" disabled="disabled" placeholder="" className="input-xlarge input-xlarge-full width8" />
                                </div>
                            </div>
                            <div className="table-basic-h3 width3">
                                <div className="table-basic-h1 width4">区域</div>
                                <div className="table-basic-h1-input width4" id="assetTabs-area">
                                    <ReactWidgets.DropdownList tabIndex="2" className='form-control dropdownStyle width8' data={this.props.areaIdList}
                                        value={this.props.areaId} textField='name' valueField='id' valueComponent={areaValueInput} onChange={change.bind(null,1)} />
                                </div>
                                <div className="table-basic-h1 width4">维修人电话</div>
                                <div className="table-basic-h1-input width4" id="assetTabs-maintainerMobile">
                                    <div className="alert-block">电话号码无效</div>
                                    <input tabIndex="5" type="text" placeholder="" className="input-xlarge width8" />
                                </div>
                                <div className="table-basic-h1 width8 no-bottom-border no-right-border"></div>
                            </div>
                            <div className="table-basic-h3 width3">
                                <div className="table-basic-h1 width4">维修费用</div>
                                <div className="table-basic-h1-input money-input width4 no-right-border" id="assetTabs-maintainPay">
                                    <ReactWidgets.NumberPicker tabIndex="3" min={0} value={this.props.maintenancePay} onChange={change.bind(null,2)} />
                                    <div className="input-group-addon unit">元</div>
                                </div>
                                <div className="table-basic-h1 width4">维修结束时间 <red>*</red></div>
                                <div className="table-basic-h1-input width4 no-right-border" id="assetTabs-maintainTime">
                                    <div className="alert-block">维修时间不能为空</div>
                                    <ReactWidgets.DateTimePicker tabIndex="6" className='dateTimePickerStyle full-width width8' format={"yyyy-MM-dd HH:mm"} value={this.props.checkTime} onChange={change.bind(null,3)} />
                                </div>
                                <div className="table-basic-h1 width8 no-bottom-border no-right-border"></div>
                            </div>
                            <div className="table-basic-h3 width8">
                                <div className="table-basic-h1 width8 no-right-border top-border">维修描述</div>
                                <textarea tabIndex="7" className="table-basic-h2 input-xlarge width8 bottom-border" id="assetTabs-manufacturerInfo"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="get-need-asset left-margin-6" data-toggle="modal" data-target="#assetModal-selectAssets"><i className="fa fa-plus-circle fa-lg"></i>&nbsp;获取您需要维修的硬件资产</a>
                <div className="clearfix"></div>
                <div id="alert-maintainAssetError" className="alert-block get-need-asset">维修资产不能为空</div>
                <table id='selectedAssetTable' style={{display:"none"}}
                       data-toggle='table'
                       data-classes='table table-no-bordered table-hover'
                       data-cache='false'
                       data-resizable='true'>
                </table>
                <a id='btn-clearTable' className="get-need-asset left-margin-6" onClick={this._clearSelectedTable} style={{"display":"none"}}><i className="fa fa-minus-circle fa-lg"></i>&nbsp;取消维修该硬件资产</a>
            </div>
        );
    },
    _showSelectedAsset: function(asset){
        var _this = this;
        var table = $("#selectedAssetTable");
        this.props.setState({asset:asset},function(){
            table.show();
            $("#btn-clearTable").show();
            $("#alert-maintainAssetError").hide();
        })
    },
    _clearSelectedTable: function(){
        var _this = this;
        var table = $("#selectedAssetTable");
        this.setState({asset:[]},function(){
            table.bootstrapTable('refreshOptions',{data: []});
            table.hide();
            $("#btn-clearTable").hide();
        })
    },
});

module.exports = Detailview_desView_assetTabs;
