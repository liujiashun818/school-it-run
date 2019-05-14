/**
* Created by Yuchen  2016/02/18.
* 资产维保
*/

import React from 'react'
var util = require('./../../../../utils/util.js');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var History = ReactRouter.History;

import AssetMaintain_desView_assetTable  from './assetMaintain_desView_assetTable';
import AssetMaintain_desView_static  from './assetMaintain_desView_static';

var AssetMaintain_desView = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return {
            origin_filter: {
                name: "",
                type: "全部",
                area: "全部",
                search: "",
            },
            from: 1,
            numPerPage: 25,
            currentPage: 1,
            sort_name: "",
            sort_order: "",
        }
    },
    componentDidMount: function() {
        var _this = this;
        var data = {
            from: this.state.from-1,
            to: this.state.numPerPage,
        };
        var typeID = this.props.DefaultTypeID_assetMaintain;
        if(typeID && typeID!="-"){
            data.typeID = typeID;
            data.wpflag = true;
        }
        this.props.get_asset_data({data: data,callback: function(resp){
                var origin_filter = _this.state.origin_filter;
                for(var i in resp.filter_typeList){
                    if(resp.filter_typeList[i].RecId == _this.props.DefaultTypeID_assetMaintain){
                        origin_filter.type = resp.filter_typeList[i].TypeName;
                    }
                }
                _this.setState({
                    origin_filter: origin_filter,
                });
            },
            export_data:false
        });
        if(document.getElementById('assetMaintainDesViewDiv') != null) {
            document.getElementById('assetMaintainDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
        }
    },
    _onLoadTableHeader: function(param){
        var _this = this;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        var B = DOMNode.find('button[name="refresh"]');
        B.unbind("click");
        B.click(function(e){//按下刷新按钮
            _this.setState({
                from: 1,
                currentPage: 1,
            },function(){
                var data = {
                    from: _this.state.from-1,
                    to: _this.state.numPerPage,
                    origin_filter: {
                        name: "",
                        type: "全部",
                        area: "全部",
                        search: "",
                    },
                };
                _this.props.get_asset_data({data: data,});
            })
        })
    },
    render: function() {
        return (
            <div id="assetMaintainDesViewDiv" className="overviewDesViewDiv assetDesViewDiv">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        资产管理：资产维保
                    </div>
                    <div className="titleRight2">
                        <a className="home-link" id="home-link" onClick={this._handleOnClick} >返回资产统计</a>
                        <a className="home-link"><i title ="点击返回资产统计" className="fa fa-question-circle fa-lg" style={{marginLeft: '8px'}}></i></a>
                        <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <AssetMaintain_desView_static />
                <AssetMaintain_desView_assetTable onLoadTableHeader={this._onLoadTableHeader} setState={this._setState} origin_filter={this.state.origin_filter} state={this.state}
                  DefaultTypeID_assetMaintain={this.props.DefaultTypeID_assetMaintain} Permissions={this.props.Permissions} AssetList={this.props.AssetList}
                  AssetCount={this.props.AssetCount} Filter_TypeList={this.props.Filter_TypeList} Filter_AreaList={this.props.Filter_AreaList}
                  get_asset_data={this.props.get_asset_data} set_linshiData={this.props.set_linshiData} set_linshiNode={this.props.set_linshiNode}
                  set_assetDetailID={this.props.set_assetDetailID} set_default_filter_value_assetMaintain={this.props.set_default_filter_value_assetMaintain}
                  setCurName={this.props.setCurName}
                />
            </div>
        );
    },
    _setState: function(data,callback){
        if(!data) return;
        if(callback) this.setState(data,callback);
        else this.setState(data);
    },
    _handleOnClick: function(e){
        var B = $(e.target);
        var id = B.attr("id");
        switch(id){
            case "home-link":
                var valid = util.hasPermission(this.props.Permissions,"/assetmanage/asset/statistic");
                if(valid==null) return;

                // var zTree = $.fn.zTree.getZTreeObj("commonTree");
                // var treeNodes = zTree.getNodes();
                // var beforeNode = zTree.getNodeByParam("name","资产维保");
                // var targetNode = zTree.getNodeByParam("name","资产统计");
                // // console.log(targetNode);
                // var tid = targetNode.tId;
                // var tIndex = zTree.getNodeIndex(targetNode);
                // document.getElementById(tid).className = "fadeInMenu";
                // zTree.selectNode(targetNode);
                // this.props.set_linshiData(tIndex)
                // this.props.set_linshiNode(beforeNode);
                this.props.setCurName("资产统计");
                this.history.pushState(null,'assetManage/statistic');
            break;
        }
    },
});

$(window).resize(function () {
    if(document.getElementById('assetMaintainDesViewDiv') != null) {
        document.getElementById('assetMaintainDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = AssetMaintain_desView;
