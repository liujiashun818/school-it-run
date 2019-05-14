/**
* Created by Yuchen  2016/01/13.
* 维修清单列表头部
*/

require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');
var widget = require('./../../../../utils/widget.js');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var Maintain_desView_static = React.createClass({
    mixins: [History],
    render: function() {
        var valid_create = util.hasPermission(this.props.Permissions,"/assetmanage/maintain/maintainlist/add");
        var valid_delete = util.hasPermission(this.props.Permissions,"/assetmanage/maintain/maintainlist/delete");
        var create_btn = valid_create!=null?<button type="button" id="btn-create" className="btn btn-success btnNormal" onClick={this.props.handleOnClick} >新建维修单</button>:"";
        var delete_btn = valid_delete!=null?<button type="button" id="btn-delete" className="btn btn-success btnDelete btnNormal" onClick={this.props.handleOnClick} >删除维修单</button>:"";
        return (
            <div className="staticDiv col-md-12">
                <div className="staticLeftDiv">
                    <div className='remarkDiv2'>
                        <span>维修清单的功能：查看组织资产库中资产维修记录，并可以按维修单号、区域、申请人、维修人查询查看组织资产库中资产维修记录</span>
                    </div>
                    <div className='btnGroupDiv2' id="btn-btnGroup">
                        {create_btn}
                        {delete_btn}
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = Maintain_desView_static;
