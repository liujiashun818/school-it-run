/**
* Created by Yuchen  2016/01/08.
*/

require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Createview_desView_static = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    render: function() {
        return (
            <div className="staticDiv col-md-12">
                <div className="staticLeftDiv">
                    <div className='remarkDiv2'>
                        <span>新建资产的功能：新添加一个组织中资产基本信息，并可与被监测的对应资源进行绑定关联，或者将被监测的一个资源监控绑定来新增一个资源记录入资产库。（注意：带有 * 标识的属性为必填项）</span>
                    </div>
                    <div className='btnGroupDiv2'>
                        <button type="button" className="btn btn-success btnNormal" data-toggle="modal" data-target="#assetModal-bindDevice">监控绑定</button>
                        <button type="button" className="btn btn-success btnSave" onClick={this._submit}>保存</button>
                    </div>
                </div>
            </div>
        );
    },

    _submit: function(e){
        this.props.submit(e);
    },
});

module.exports = Createview_desView_static;
