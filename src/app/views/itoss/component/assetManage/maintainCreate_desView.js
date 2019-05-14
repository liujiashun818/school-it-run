/**
* Created by Yuchen  2016/01/13.
* 新建维修单主窗口
*/

require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var MaintainCreate_desView_static = require('./maintainCreate_desView_static');
var MaintainCreate_desView_assetTabs = require('./maintainCreate_desView_assetTabs');

var Maintain_desView = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        if(document.getElementById('maintainDesViewDiv') != null) {
            document.getElementById('maintainDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
        }
        this.props.get_create_data();
    },
    render: function() {
        return (
            <div id="maintainDesViewDiv" className="overviewDesViewDiv assetDesViewDiv">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        资产管理：新建维修单
                    </div>
                    <div className="titleRight2">
                        <a className="home-link" href="#/assetManage/maintain">返回维修清单</a>
                        <a className="home-link"><i title ="点击返回维修清单" className="fa fa-question-circle fa-lg" style={{marginLeft: '8px'}}></i></a>
                        <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <MaintainCreate_desView_static
                    MOBILE_FILTER={this.props.MOBILE_FILTER}
                    AreaIdList={this.props.AreaIdList}
                    Permissions={this.props.Permissions}
                    create_asset_maintainOrder={this.props.create_asset_maintainOrder} />
                <MaintainCreate_desView_assetTabs
                    Permissions={this.props.Permissions}
                    AssetDetailID={this.props.AssetDetailID}
                    StatusList={this.props.StatusList}
                    AreaIdList={this.props.AreaIdList}
                    Filter_TypeList={this.props.Filter_TypeList}
                    AssetList={this.props.AssetList}
                    AssetCount={this.props.AssetCount}
                    get_create_data={this.props.get_create_data}
                    get_detail_data={this.props.get_detail_data}
                    set_assetDetailID={this.props.set_assetDetailID}
                    get_asset_data={this.props.get_asset_data} />
            </div>
        );
    },
});

$(window).resize(function () {
    if(document.getElementById('maintainDesViewDiv') != null) {
        document.getElementById('maintainDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = Maintain_desView;
