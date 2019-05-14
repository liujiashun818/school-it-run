/**
* Created by Yuchen  2016/01/29.
* 维修单详情主窗口
*/

require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var MaintainDetail_desView_static = require('./maintainDetail_desView_static');
var MaintainDetail_desView_assetTabs = require('./maintainDetail_desView_assetTabs');

var MaintainDetail_desView = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return {
            maintenancePay: 0,
            areaId: "",
            areaIdList: [],
            checkTime: null,
            asset: null,
        }
    },
    componentDidMount: function() {
        var _this = this;
        if(document.getElementById('maintainDetailDesViewDiv') != null) {
            document.getElementById('maintainDetailDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
        }
        this.props.get_create_data({callback:function(resp1){
            _this.props.get_maintain_detail_data({
                callback: function(resp2){
                    _this._initForm(resp2.maintainOrder);
                    if(resp2.asset.length>0) _this._initTable(resp2.asset);
                }
            });
        }});

    },
    render: function() {
        return (
            <div id="maintainDetailDesViewDiv" className="overviewDesViewDiv assetDesViewDiv">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        资产管理：维修单详情
                    </div>
                    <div className="titleRight2">
                        <a className="home-link" href="#/assetManage/maintain">返回维修清单</a>
                        <a className="home-link"><i title ="点击返回维修清单" className="fa fa-question-circle fa-lg" style={{marginLeft: '8px'}}></i></a>
                        <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <MaintainDetail_desView_static
                    Permissions={this.props.Permissions}
                    MOBILE_FILTER={this.props.MOBILE_FILTER}
                    SingleMaintainOrder={this.props.SingleMaintainOrder}
                    AreaIdList={this.props.AreaIdList}
                    update_single_maintainOrder={this.props.update_single_maintainOrder} />
                <MaintainDetail_desView_assetTabs
                    Permissions={this.props.Permissions}
                    AssetDetailID={this.props.AssetDetailID}
                    StatusList={this.props.StatusList}
                    Filter_TypeList={this.props.Filter_TypeList}
                    AssetList={this.props.AssetList}
                    AssetCount={this.props.AssetCount}
                    get_create_data={this.props.get_create_data}
                    get_detail_data={this.props.get_detail_data}
                    set_assetDetailID={this.props.set_assetDetailID}
                    get_asset_data={this.props.get_asset_data}

                    asset={this.state.asset}
                    maintenancePay={this.state.maintenancePay}
                    areaId={this.state.areaId}
                    areaIdList={this.state.areaIdList}
                    checkTime={this.state.checkTime}
                    setState={this._setState} />
            </div>
        );
    },
    _initForm: function(odata){
        $("#maintainOrderDetailTable #assetTabs-maintainCode").find("input").val(odata.fileNumber);
        $("#maintainOrderDetailTable #assetTabs-maintainCode").data("old-fileNumber",odata.fileNumber);
        $("#maintainOrderDetailTable #assetTabs-checkName").find("input").val(odata.checkName);
        $("#maintainOrderDetailTable #assetTabs-applier").find("input").val(odata.createdBy);
        $("#maintainOrderDetailTable #assetTabs-maintainerMobile").find("input").val(odata.checkPhone);
        $("#maintainOrderDetailTable #assetTabs-manufacturerInfo").val(odata.manufacturerInfo);
        var checkTime = util.getDateObj(odata.checkTime);
        if(isNaN(checkTime)) checkTime = null;
        this.setState({
            maintenancePay: parseInt(odata.maintenancePay),
            areaId: odata.areaId,
            areaIdList: this.props.AreaIdList,
            checkTime: checkTime,
        });
    },
    _initTable: function(odata){
        if(!odata||odata==null) return;
        this.setState({asset: odata},function(){
            $("#selectedAssetTable").show();
            $("#btn-clearTable").show();
        });
    },
    _setState: function(data,callback){
        this.setState(data,function(){
            if(callback) callback();
        });
    },
});

$(window).resize(function () {
    if(document.getElementById('maintainDetailDesViewDiv') != null) {
        document.getElementById('maintainDetailDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = MaintainDetail_desView;
