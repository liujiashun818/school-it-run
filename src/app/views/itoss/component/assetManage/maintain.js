/**
* Created by Yuchen  2016/01/13.
* 维修清单列表
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

var MaintainDesView = require('./maintain_desView');

var Maintain = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return {
            showMainDiv: true
        }
    },
    componentDidMount: function() {
        const { dispatch } = this.props;
        if(document.getElementById('maintainView') != null) {
            document.getElementById('maintainView').style.height = $(window).height() - 110 - 30 + 'px';
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
            var valid = util.hasPermission(temp,"/assetmanage/maintain/maintainlist");
            if(valid==null){
                this.setState({
                    showMainDiv: false
                });
            }
        }
    },
    render: function(){
        const { dispatch, Permissions, MaintainOrderList, MaintainOrderCount, Filter_AreaList} = this.props;
        var desView =
            <MaintainDesView
                Permissions={Permissions}
                MaintainOrderList={MaintainOrderList}
                MaintainOrderCount={MaintainOrderCount}
                Filter_AreaList={Filter_AreaList}
                delete_maintain_orders={this._delete_maintain_orders}
                get_maintain_order={this._get_maintain_order}
                set_maintainDetailID={this._set_maintainDetailID} />;
        var mainDiv = this.state.showMainDiv?desView:"";
        return(
            <div id='maintainView' className='overviewDiv'>
                {mainDiv}
            </div>
        );
    },
    _delete_maintain_orders: function(param){
        const { dispatch } = this.props;
        dispatch(actions.delete_maintain_orders({
            data: param.data,
            callback: function(res){
                if(param.callback) param.callback(res);
            },
            error: function(resp){
                if(param.error) param.error(resp);
            },
        }));
    },
    _get_maintain_order: function(param){
        const { dispatch } = this.props;
        dispatch(actions.get_maintain_order({
            data: param.data,
        }));
    },
    _set_maintainDetailID: function(param){
        const { dispatch } = this.props;
        dispatch(actions.set_maintainDetailID({
            val: param.val,
        }));
    },
});

$(window).resize(function () {
    if(document.getElementById('maintainView') != null) {
        document.getElementById('maintainView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});
Maintain.propTypes = {
    MaintainOrderList: PropTypes.array.isRequired,
    MaintainOrderCount: PropTypes.number.isRequired,
    Filter_AreaList: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { Permissions, MaintainOrderList, MaintainOrderCount, Filter_AreaList } = state.assetManageReducer;
    return {
        Permissions,
        MaintainOrderList,
        MaintainOrderCount,
        Filter_AreaList,
    }
}

export default connect(mapStateToProps)(Maintain)
