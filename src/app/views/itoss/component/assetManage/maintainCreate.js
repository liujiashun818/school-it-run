/**
* Created by Yuchen  2016/01/13.
* 新建维修单
*/

'use strict';
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var Store = require('./../../../../server/store.js');
var base64 = require('./../../../../utils/base64.js');
var util = require('./../../../../utils/util.js');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

import { connect } from 'react-redux'
import * as actions from '../../../../actions/assetManage_action'

var MaintainCreateDesView = require('./maintainCreate_desView');

var MaintainCreate = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        const { dispatch } = this.props;
        if(document.getElementById('maintainCreateView') != null) {
            document.getElementById('maintainCreateView').style.height = $(window).height() - 110 - 30 + 'px';
        };
        $(".left-nav-item-maintain").css("display","block");
        if(document.getElementById('createMaintainOrder') != null) document.getElementById('createMaintainOrder').className = 'list-group-item active';
        //获取权限集合
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            dispatch(actions.set_permissions_asset(temp));
            var backValid = util.hasPermission(temp,"/assetmanage/maintain/maintainlist");
            if(backValid==null){
                $(".home-link").hide();
            }
        }
    },
    render: function(){
        const { dispatch, Permissions, AreaIdList, StatusList, AssetDetailID, Filter_TypeList, AssetList, AssetCount } = this.props;
        const MOBILE_FILTER = /^([0-9-]+)$/;
        return(
            <div id='maintainCreateView' className='overviewDiv'>
                <MaintainCreateDesView
                    Permissions={Permissions}
                    MOBILE_FILTER={MOBILE_FILTER}
                    AreaIdList={AreaIdList}
                    StatusList={StatusList}
                    AssetDetailID={AssetDetailID}
                    Filter_TypeList={Filter_TypeList}
                    AssetList={AssetList}
                    AssetCount={AssetCount}
                    create_asset_maintainOrder={this._create_asset_maintainOrder}
                    set_assetDetailID={this._set_assetDetailID}
                    get_create_data={this._get_create_data}
                    get_detail_data={this._get_detail_data}
                    get_asset_data={this._get_asset_data} />
            </div>
        );
    },
    _create_asset_maintainOrder: function(param){
        const { dispatch } = this.props;
        dispatch(actions.create_asset_maintainOrder({
            data: param.data,
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
    if(document.getElementById('maintainCreateView') != null) {
        document.getElementById('maintainCreateView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

MaintainCreate.propTypes = {
    AreaIdList: PropTypes.array.isRequired,
    StatusList: PropTypes.array.isRequired,
    AssetDetailID: PropTypes.string.isRequired,
    Filter_TypeList: PropTypes.array.isRequired,
    AssetList: PropTypes.array.isRequired,
    // AssetCount: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state) {
    const { Permissions, AreaIdList, StatusList, AssetDetailID, Filter_TypeList, AssetList, AssetCount } = state.assetManageReducer;
    return {
        Permissions,
        AreaIdList,
        StatusList,
        AssetDetailID,
        Filter_TypeList,
        AssetList,
        AssetCount,
    }
}
export default connect(mapStateToProps)(MaintainCreate)
