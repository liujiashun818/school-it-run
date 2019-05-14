/**
* Created by Yuchen  2016/01/29.
* 维修单详情
*/

'use strict';
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
var Store = require('./../../../../server/store.js');
var base64 = require('./../../../../utils/base64.js');
var util = require('./../../../../utils/util.js');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

import { connect } from 'react-redux'
import * as actions from '../../../../actions/assetManage_action'

var MaintainDetailDesView = require('./maintainDetail_desView');

var MaintainDetail = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        const { dispatch } = this.props;
        if(document.getElementById('maintainDetailView') != null) {
            document.getElementById('maintainDetailView').style.height = $(window).height() - 110 - 30 + 'px';
        };
        $(".left-nav-item-maintain").css("display","block");
        if(document.getElementById('maintainOrder') != null) document.getElementById('maintainOrder').className = 'list-group-item active';
        //获取权限集合
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            dispatch(actions.set_permissions_asset(temp));
            var valid = util.hasPermission(temp,"/assetmanage/maintain/maintainlist/update");//编辑维修单的权限
            var backValid = util.hasPermission(temp,"/assetmanage/maintain/maintainlist");
            if(valid==null){
                $("#btn-save").attr("disabled","disabled");
            }
            if(backValid==null){
                $(".home-link").hide();
            }
        }
    },
    render:function(){
        const { dispatch, Permissions, AreaIdList, StatusList, AssetDetailID, Filter_TypeList, AssetList, AssetCount, SingleMaintainOrder } = this.props;
        const MOBILE_FILTER = /^([0-9-]+)$/;
        return(
            <div id='maintainDetailView' className='overviewDiv'>
                <MaintainDetailDesView
                    Permissions={Permissions}
                    MOBILE_FILTER={MOBILE_FILTER}
                    AreaIdList={AreaIdList}
                    StatusList={StatusList}
                    AssetDetailID={AssetDetailID}
                    Filter_TypeList={Filter_TypeList}
                    AssetList={AssetList}
                    AssetCount={AssetCount}
                    SingleMaintainOrder={SingleMaintainOrder}
                    update_single_maintainOrder={this._update_single_maintainOrder}
                    set_assetDetailID={this._set_assetDetailID}
                    get_create_data={this._get_create_data}
                    get_maintain_detail_data={this._get_maintain_detail_data}
                    get_detail_data={this._get_detail_data}
                    get_asset_data={this._get_asset_data} />
            </div>
        );
    },
    _update_single_maintainOrder: function(param){
        const { dispatch } = this.props;
        dispatch(actions.update_single_maintainOrder({
            data: param.data,
            oldFileNumber: param.oldFileNumber,
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _set_assetDetailID: function(param){
        const { dispatch } = this.props;
        dispatch(actions.set_assetDetailID({
            val: param.val,
        }));
    },
    _get_create_data: function(param){
        const { dispatch } = this.props;
        dispatch(actions.get_create_data({
            callback: function(res){
                if(param&&param.callback) param.callback(res);
            },
        }));
    },
    _get_maintain_detail_data: function(param){
        const { dispatch } = this.props;
        dispatch(actions.get_maintain_detail_data({
            callback: function(res){
                if(param&&param.callback) param.callback(res);
            },
        }));
    },
    _get_detail_data: function(param){
        const { dispatch } = this.props;
        dispatch(actions.get_detail_data({
            data: param.data,
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _get_asset_data: function(param){
        const { dispatch } = this.props;
        dispatch(actions.get_asset_data({
            data: param.data,
        }));
    },
});

$(window).resize(function () {
    if(document.getElementById('maintainDetailView') != null) {
        document.getElementById('maintainDetailView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

MaintainDetail.propTypes = {
    AreaIdList: PropTypes.array.isRequired,
    StatusList: PropTypes.array.isRequired,
    AssetDetailID: PropTypes.string.isRequired,
    Filter_TypeList: PropTypes.array.isRequired,
    AssetList: PropTypes.array.isRequired,
    // AssetCount: PropTypes.number.isRequired,
    SingleMaintainOrder: PropTypes.object,
    MaintainDetailID: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state) {
    const { Permissions, AreaIdList, StatusList, AssetDetailID, Filter_TypeList, AssetList, AssetCount, SingleMaintainOrder, MaintainDetailID } = state.assetManageReducer;
    return {
        Permissions,
        AreaIdList,
        StatusList,
        AssetDetailID,
        Filter_TypeList,
        AssetList,
        AssetCount,
        SingleMaintainOrder,
        MaintainDetailID,
    }
}
export default connect(mapStateToProps)(MaintainDetail)
