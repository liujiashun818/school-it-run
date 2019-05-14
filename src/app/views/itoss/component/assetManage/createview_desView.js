/**
* Created by Yuchen  2016/01/08.
* 新建资产
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

import Createview_desView_static from './createview_desView_static';
import Createview_desView_assetTabs from './createview_desView_assetTabs';

var Createview_desView = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    getInitialState: function(){
        return {
            status: "",
        }
    },
    componentDidMount: function() {
        var _this = this;
        if(document.getElementById('createviewDesViewDiv') != null) {
            document.getElementById('createviewDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
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
        this.props.get_create_data({callback:function(resp){//@MODIFY

        }});
    },
    render: function() {
        return (
            <div id="createviewDesViewDiv" className="overviewDesViewDiv assetDesViewDiv">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        资产管理：新建资产
                    </div>
                    <div className="titleRight2">
                        <a className="home-link" id="home-link" onClick={this._handleOnClick} >返回资产统计列表</a>
                        <a className="home-link"><i title ="点击返回资产统计" className="fa fa-question-circle fa-lg" style={{marginLeft: '8px'}}></i></a>
                        <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <Createview_desView_static
                  submit={this._submit}
                />
                <Createview_desView_assetTabs
                  setState={this._setState}
                  status={this.state.status}
                  AssetTypeList={this.props.AssetTypeList}
                  AreaIdList={this.props.AreaIdList}
                  StatusList={this.props.StatusList}
                />
            </div>
        );
    },
    _submit: function(e){
        var valid = true;
        var data = {};
        var _this = this;
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
        data.UnitName = localStorage.getItem("GROUP_ID");
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
        if(valid){//提交
            var saveBtn = $(e.target);
            saveBtn.text("保存中");
            saveBtn.attr("disabled","disabled");
            this.props.create_asset({
                data: data,
                callback: function(resp){
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "资产";
                        document.getElementById('publicMessageModalcontent').innerHTML = "添加成功";
                        $('#publicMessageModal').modal('show');
                    },100);
                    valid = util.hasPermission(_this.props.Permissions,"/assetmanage/asset/assetlist");
                    if(valid==null){
                        saveBtn.text("已保存");
                        return;
                    }
                    _this.props.setCurName("资产统计列表");
                    _this.history.pushState(null,'assetManage/assetList');
                },
                error: function(resp){
                    if(resp.invalidAssetCode){
                        $("#assetTabs-assetCode").find("input").focus();
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "资产";
                            document.getElementById('publicMessageModalcontent').innerHTML = "添加失败：资产编号已存在，请输入其他的资产编号！";
                            $('#publicMessageModal').modal('show');
                        },100);
                    }
                    else{
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "资产";
                            document.getElementById('publicMessageModalcontent').innerHTML = "添加失败";
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
                // var preNode = this.props.curThreeNode;
                // this.props.onSetPreThreeNode("");
                // this.props.onSetCurThreeNode(targetNode);
                // // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
                // // this.getFlux().actions.YFTIndexActions.set_linshiNode(beforeNode);

                this.props.setCurName("资产统计列表");
                this.history.pushState(null,'assetManage/assetList');
            break;
        }
    },
});

$(window).resize(function () {
    if(document.getElementById('createviewDesViewDiv') != null) {
        document.getElementById('createviewDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = Createview_desView;
