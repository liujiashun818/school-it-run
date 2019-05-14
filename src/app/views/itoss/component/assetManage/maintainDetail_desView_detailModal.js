/**
 * Created by Yuchen on 2016/01/29.
 * 维修单详情-资产信息表格
 */
var React = require('react');
require('bootstrap');
var Router = require('react-router');
var util = require('./../../../../utils/util.js');

var History = require('react-router').History;

var AssetTableModal = React.createClass({
    mixins: [History],
    componentDidMount: function(){
        var _this = this;
        $('#assetModal-detail').on('show.bs.modal', function(e){
            _this.props.get_detail_data({
                data: {recid:_this.props.AssetDetailID},
                callback: function(resp){
                    var asset = eval(resp.asset.d.results[0].ASSETS_INFO)[0];
                    if(!asset) return;
                    var status = "";
                    //formatter
                    for(var a in _this.props.StatusList){
                        if(_this.props.StatusList[a].id == asset.assetsStatus){
                            status = _this.props.StatusList[a].name;
                            break;
                        }
                    }
                    var ay = new Date(asset.assetsYear);
                    var wp = new Date(asset.warrantyPeriod);
                    if(isNaN(ay)) ay = "-";
                    else ay = ay.Format("yyyy-MM-dd h:m:ss");
                    if(isNaN(wp)) wp = "-";
                    else wp = wp.Format("yyyy-MM-dd h:m:ss");
                    $("#assetTabs-assetCode").find("input").val(asset.assetsCode);
                    $("#assetTabs-assetName").find("input").val(asset.assetsName);
                    $("#assetTabs-area").find("input").val(asset.areaName);
                    $("#assetTabs-assetType").find("input").val(asset.productTypeName);
                    $("#assetTabs-productModel").find("input").val(asset.productModel);
                    $("#assetTabs-productBrand").find("input").val(asset.brandId);
                    $("#assetTabs-orientation").find("input").val(asset.toward);
                    $("#assetTabs-installAddress").find("input").val(asset.installAddress);
                    $("#assetTabs-createTime").find("input").val(ay);//创建时间
                    $("#assetTabs-warrantyEndTime").find("input").val(wp);//维修时间
                    $("#assetTabs-creator").find("input").val(asset.createdBy);
                    $("#assetTabs-maintainer").find("input").val(asset.maintenancePeople);
                    $("#assetTabs-internationalCode").find("input").val(asset.gbCode);
                    $("#assetTabs-maintainerUnit").find("input").val(asset.maintenanceUnit);
                    $("#assetTabs-assetState").find("input").val(status);
                    $("#assetTabs-ipAddress").find("input").val(asset.ipAddress);
                },
                error: function(resp){
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "维修清单";
                        document.getElementById('publicMessageModalcontent').innerHTML = "获取数据失败";
                        $('#publicMessageModal').modal('show');
                    },100);
                },
            });
        })
    },
    render : function(){
        return (
            <div className="modal fade" id="assetModal-detail" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog assetModalDialog" style={{width:"80%",height:"332px"}}>
                    <div className="modal-content" style={{height:"100%"}}>
                        <div className="modal-header">
                            资产详细信息
                        </div>
                        <div className="modal-body" style={{height:"259px"}}>
                            <div className='row'>
                                <div className='table-basic width8 no-left-margin'>
                                    <div className="table-basic-row width8">
                                        <div className="table-basic-h3 block width1 no-bottom-border">资产属性</div>
                                        <div className="table-basic-h3 block-content width7 no-bottom-border">
                                            <div className="table-basic-h2 width3">
                                                <div className="table-basic-h1 width4">资产编码</div>
                                                <div className="table-basic-h1-input width4" id="assetTabs-assetCode"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                                <div className="table-basic-h1 width4">资产类型</div>
                                                <div className="table-basic-h1-input width4" id="assetTabs-assetType"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                            </div>
                                            <div className="table-basic-h2 width3">
                                                <div className="table-basic-h1 width4">资产名称</div>
                                                <div className="table-basic-h1-input width4" id="assetTabs-assetName"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                                <div className="table-basic-h1 width4">资产型号</div>
                                                <div className="table-basic-h1-input width4" id="assetTabs-productModel"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                            </div>
                                            <div className="table-basic-h2 width3">
                                                <div className="table-basic-h1 width4">区域</div>
                                                <div className="table-basic-h1-input width4" id="assetTabs-area"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                                <div className="table-basic-h1 width4">品牌</div>
                                                <div className="table-basic-h1-input width4" id="assetTabs-productBrand"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                            </div>
                                            <div className="table-basic-h1 width1d6 no-bottom-border">朝向</div>
                                            <div className="table-basic-h1-input width1d6" id="assetTabs-orientation"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                            <div className="table-basic-h1 width1d6 no-bottom-border">安装地址</div>
                                            <div className="table-basic-h1-input width4" id="assetTabs-installAddress"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                        </div>
                                    </div>
                                    <div className="table-basic-row width8">
                                        <div className="table-basic-h3 block width1">维保属性</div>
                                        <div className="table-basic-h3 block-content width7 no-bottom-border">
                                            <div className="table-basic-h2 width3">
                                                <div className="table-basic-h1 width4">创建人</div>
                                                <div className="table-basic-h1-input width4" id="assetTabs-creator"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                                <div className="table-basic-h1 width4">维保截止时间</div>
                                                <div className="table-basic-h1-input width4" id="assetTabs-warrantyEndTime"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                            </div>
                                            <div className="table-basic-h2 width3">
                                                <div className="table-basic-h1 width4">创建时间</div>
                                                <div className="table-basic-h1-input width4" id="assetTabs-createTime"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                                <div className="table-basic-h1 width4">IP地址</div>
                                                <div className="table-basic-h1-input width4" id="assetTabs-ipAddress"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                            </div>
                                            <div className="table-basic-h2 width3">
                                                <div className="table-basic-h1 width4">维护人</div>
                                                <div className="table-basic-h1-input width4 no-right-border" id="assetTabs-maintainer"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                                <div className="table-basic-h1 width4">维护人单位</div>
                                                <div className="table-basic-h1-input width4 no-right-border" id="assetTabs-maintainerUnit"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                            </div>
                                            <div className="table-basic-h1 width1d6">资产状态</div>
                                            <div className="table-basic-h1-input width1d6" id="assetTabs-assetState"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                            <div className="table-basic-h1 width1d6">国际编码</div>
                                            <div className="table-basic-h1-input width4 no-right-border" id="assetTabs-internationalCode"><input type="text" disabled="disabled" className="input-xlarge width8" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" id="btn-detail-page" onClick={this._handleOnClick} style={{width:84}}>进入详情页</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _handleOnClick: function() {
        $("#assetModal-detail").modal('hide');
        var valid = util.hasPermission(this.props.Permissions,"/assetmanage/asset/assetlist");
        if(valid==null) return;
        // this.getFlux().actions.YFTIndexActions.set_linshiData(1);
        this.history.pushState(null,'assetManage/detail');
    },
});

module.exports = AssetTableModal;
