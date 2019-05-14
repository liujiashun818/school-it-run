/**
* Created by Yuchen  2016/01/15.
*/

require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');

var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import Detail_desView_static from './detail_desView_static';
import Detail_desView_assetTabs from './detail_desView_assetTabs';
import Detail_desView_maintainOrderTable from './detail_desView_maintainOrderTable';

var Detail_desView = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return {
            warrantyEndTime: null,
            createTime: null,
            areaIdList: [],
            statusList: [],
            assetTypeList: [],
            areaId: "",
            status: "",
            assetType: "",
        }
    },
    componentDidMount: function() {
        var _this = this;
        if(document.getElementById('detailDesViewDiv') != null) {
            document.getElementById('detailDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
        }
        $("#assetTabs-assetCode,#assetTabs-assetName,#assetTabs-creator,#assetTabs-warrantyEndTime,#assetTabs-maintainer,#assetTabs-ipAddress,#assetTabs-assetState").mouseover(function(){
            $(this).find(".alert-block").hide();
        })
        $("#assetTabs-assetCode,#assetTabs-assetName,#assetTabs-creator,#assetTabs-maintainer,#assetTabs-ipAddress,#assetTabs-assetState").find("input").focus(function(){
            $(this).parent().find(".alert-block").hide();
        })
        $("#assetTabs-warrantyEndTime").find("input").focus(function(){
            $(this).parent().parent().find(".alert-block").hide();
        })
        this.props.get_create_data({
          callback: function(resp){
            _this.props.get_detail_data({
                data: {recid:_this.props.AssetDetailID},
                callback: function(resp){
                    var asset = eval(resp.asset.d.results[0].ASSETS_INFO)[0];
                    if(!asset) return;
                    $("#assetTabs-assetCode").find("input").val(asset.assetsCode);
                    $("#assetTabs-assetCode").data("old",asset.assetsCode);
                    $("#assetTabs-assetName").find("input").val(asset.assetsName);
                    $("#assetTabs-assetType").find("input").val(asset.productTypeName);
                    $("#assetTabs-productModel").find("input").val(asset.productModel);
                    $("#assetTabs-productBrand").find("input").val(asset.brandId);
                    $("#assetTabs-orientation").find("input").val(asset.toward);
                    $("#assetTabs-installAddress").find("input").val(asset.installAddress);
                    $("#assetTabs-creator").find("input").val(asset.createdBy);
                    $("#assetTabs-maintainer").find("input").val(asset.maintenancePeople);
                    $("#assetTabs-internationalCode").find("input").val(asset.gbCode);
                    $("#assetTabs-maintainerUnit").find("input").val(asset.maintenanceUnit);
                    $("#assetTabs-ipAddress").find("input").val(asset.ipAddress);
                    var createTime_Date = util.getDateObj(asset.assetsYear);
                    var warrantyEndTime_Date = util.getDateObj(asset.warrantyPeriod);
                    if(isNaN(createTime_Date)||asset.assetsYear=="1970-01-01") createTime_Date = null;
                    if(isNaN(warrantyEndTime_Date)||asset.warrantyPeriod=="1970-01-01") warrantyEndTime_Date = null;
                    _this.setState({
                        warrantyEndTime: warrantyEndTime_Date,
                        createTime: createTime_Date,
                        areaIdList: resp.areaIdList,
                        statusList: resp.statusList,
                        assetTypeList: resp.assetTypeList,
                        areaId: asset.areaId,
                        status: asset.assetsStatus,
                        assetType: asset.productTypeId
                    })
                },
                error: function(resp){
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "资产";
                        document.getElementById('publicMessageModalcontent').innerHTML = "获取数据失败："+resp.statusText;
                        $('#publicMessageModal').modal('show');
                    },100);
                },
            });
          }
        });
    },
    render: function() {
        return (
            <div id="detailDesViewDiv" className="overviewDesViewDiv assetDesViewDiv">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        资产管理：资产详情
                    </div>
                    <div className="titleRight2">
                        <a className="home-link" id="home-link" onClick={this._handleOnClick} >返回资产统计列表</a>
                        <a className="home-link"><i title ="点击返回资产统计" className="fa fa-question-circle fa-lg" style={{marginLeft: '8px'}}></i></a>
                        <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <Detail_desView_static submit={this._submit}/>
                <Detail_desView_assetTabs
                    setState={this._setState}
                    warrantyEndTime={this.state.warrantyEndTime}
                    createTime={this.state.createTime}
                    areaIdList={this.state.areaIdList}
                    statusList={this.state.statusList}
                    assetTypeList={this.state.assetTypeList}
                    areaId={this.state.areaId}
                    status={this.state.status}
                    assetType={this.state.assetType}
                    StatusList={this.props.StatusList}
                 />
                <div className="clearfix"></div>
                <Detail_desView_maintainOrderTable
                  MaintainOrderList={this.props.MaintainOrderList}
                  set_maintainDetailID={this.props.set_maintainDetailID}
                />
            </div>
        );
    },
    _submit: function(e){
        var valid = true;
        var data = {};
        var _this = this;
        var asset = eval(this.props.SingleAsset.ASSETS_INFO)[0];
        data.RecId = asset.recId;
        data.AssetsCode = $("#assetTabs-assetCode").find("input").val();//必填
        data.AssetsName = $("#assetTabs-assetName").find("input").val();//必填
        data.AreaID = $("#assetTabs-area").find(".rw-input").children().eq(0).children().eq(0).text();
        data.ProductType = $("#assetTabs-assetType").find(".rw-input").children().eq(0).children().eq(0).text();
        data.AssetsYear = $("#assetTabs-createTime").find("input").val();
        data.CreatedBy = $("#assetTabs-creator").find("input").val();//必填
        data.WarrantyPeriod = $("#assetTabs-warrantyEndTime").find("input").val();//必填
        data.MaintenancePeople = $("#assetTabs-maintainer").find("input").val();//必填
        data.ProductModel = $("#assetTabs-productModel").find("input").val();
        data.AssetsBrand = $("#assetTabs-productBrand").find("input").val();
        data.GBCode = $("#assetTabs-internationalCode").find("input").val();
        data.Toward = $("#assetTabs-orientation").find("input").val();
        data.AssetStates = $("#assetTabs-assetState").find(".rw-input").children().eq(0).children().eq(0).text();
        data.InstallAddress = $("#assetTabs-installAddress").find("input").val();
        data.IPAddress = $("#assetTabs-ipAddress").find("input").val();
        data.MaintenanceUnit = $("#assetTabs-maintainerUnit").find("input").val();
        if(data.AssetsCode.length==0){
            $("#assetTabs-assetCode").find(".alert-block").show();
            valid = false;
        }
        if(data.AssetsName.length==0){
            $("#assetTabs-assetName").find(".alert-block").show();
            valid = false;
        }
        if(data.CreatedBy.length==0){
            $("#assetTabs-creator").find(".alert-block").show();
            valid = false;
        }
        if(data.WarrantyPeriod.length==0){
            $("#assetTabs-warrantyEndTime").find(".alert-block").show();
            valid = false;
        }
        if(data.MaintenancePeople.length==0){
            $("#assetTabs-maintainer").find(".alert-block").show();
            valid = false;
        }
        if(data.AssetStates.length==0){
            $("#assetTabs-assetState").find(".alert-block").show();
            valid = false;
        }
        var ipFilter = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
        if(data.IPAddress.length>0&&!ipFilter.test(data.IPAddress)){
            $("#assetTabs-ipAddress").find(".alert-block").show();
            valid = false;
        }
        //formatter
        for(var a in this.props.AssetTypeList){
            if(this.props.AssetTypeList[a].name == data.ProductType){
                data.ProductType = this.props.AssetTypeList[a].id;
                break;
            }
        }
        for(var a in this.props.StatusList){
            if(this.props.StatusList[a].name == data.AssetStates){
                data.AssetStates = this.props.StatusList[a].id;
                break;
            }
        }
        for(var a in this.props.AreaIdList){
            if(this.props.AreaIdList[a].name == data.AreaID){
                data.AreaID = this.props.AreaIdList[a].id;
                break;
            }
        }
        data.WarrantyPeriod = util.getDateObj(data.WarrantyPeriod);
        data.AssetsYear = util.getDateObj(data.AssetsYear);
        if(isNaN(data.WarrantyPeriod)) data.WarrantyPeriod = util.getDateObj("1970-01-01");
        if(isNaN(data.AssetsYear)) data.AssetsYear = util.getDateObj("1970-01-01");
        var isOld = (data.AssetsCode==$("#assetTabs-assetCode").data("old"));
        if(valid){//提交
            var saveBtn = $(e.target);
            saveBtn.text("保存中");
            saveBtn.attr("disabled","disabled");
            this.props.update_single_asset({
                data: data,
                old: isOld,
                callback: function(resp){
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "资产";
                        document.getElementById('publicMessageModalcontent').innerHTML = "修改成功";
                        $('#publicMessageModal').modal('show');
                    },100);
                    saveBtn.text("保存");
                    saveBtn.removeAttr("disabled");
                    $("#assetTabs-assetCode").data("old",data.AssetsCode);
                },
                error: function(resp){
                    if(resp.invalidAssetCode){
                        $("#assetTabs-assetCode").find("input").focus();
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "资产";
                            document.getElementById('publicMessageModalcontent').innerHTML = "修改失败：资产编号已存在，请输入其他的资产编号！";
                            $('#publicMessageModal').modal('show');
                        },100);
                    }
                    else{
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "资产";
                            document.getElementById('publicMessageModalcontent').innerHTML = "修改失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    }
                    saveBtn.text("保存");
                    saveBtn.removeAttr("disabled");
                }
            });
        }
    },
    _setState: function(state){
        this.setState(state);
    },
    _handleOnClick: function(e){
        var B = $(e.target);
        var id = B.attr("id");
        switch(id){
            case "home-link":
                var valid = util.hasPermission(this.props.Permissions,"/assetmanage/asset/assetlist");
                if(valid==null) return;

                // var zTree = $.fn.zTree.getZTreeObj("commonTree");
                // var treeNodes = zTree.getNodes();
                // var beforeNode = zTree.getNodeByParam("name","资产统计列表");
                // var targetNode = zTree.getNodeByParam("name","资产统计列表");
                // // console.log(targetNode);
                // var tid = targetNode.tId;
                // var tIndex = zTree.getNodeIndex(targetNode);
                // document.getElementById(tid).className = "fadeInMenu";
                // zTree.selectNode(targetNode);
                // this.props.onSetPreThreeNode("");
                // this.props.onSetCurThreeNode(targetNode);

                this.props.setCurName("资产统计列表");
                this.history.pushState(null,'assetManage/assetList');
            break;
        }
    },
});

$(window).resize(function () {
    if(document.getElementById('detailDesViewDiv') != null) {
        document.getElementById('detailDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = Detail_desView;
