/**
* Created by Yuchen  2016/01/15.
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

var Detail_desView_static = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("AssetManageStore").getState()
    //     }
    // },

    componentDidMount: function(){

    },

    render: function() {
        return (
            <div className="staticDiv col-md-12">
                <div className="staticLeftDiv">
                    <div className='remarkDiv2'>
                        <span>修改资产详情（带有 * 标识的属性为必填字段）</span>
                    </div>
                    <div className='btnGroupDiv2'>
                        <button type="button" className="btn btn-success btnNormal" data-toggle="modal" data-target="#assetModal-bindDevice">监控绑定</button>
                        <button type="button" className="btn btn-success btnSave" id="btn-save" onClick={this._submit}>保存</button>
                    </div>
                </div>
            </div>
        );
    },

    _submit: function(e){
        this.props.submit(e);
    },
});

module.exports = Detail_desView_static;
