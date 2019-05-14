require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var base64 = require('../../../../../utils/base64');

var OrderLeftList = React.createClass({
    mixins: [History],
    getInitialState: function(){
        return{//@MODIFY

        }
    },
    render: function() {
      return (
        <div className='leftListDiv col-md-1'>
          <div className="assetManageListDiv">
            <div className="iq-list">
              <div className="list-group">
                <a className={"list-group-item" + (this.props.activeMenu == 1 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a1">DVR统计</a>
                <a className={"list-group-item" + (this.props.activeMenu == 2 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a2">NVR统计</a>
                <a className={"list-group-item" + (this.props.activeMenu == 3 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a3">编码器统计</a>
                <a className={"list-group-item" + (this.props.activeMenu == 4 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a4">服务器统计</a>
                <a className={"list-group-item" + (this.props.activeMenu == 5 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a5">网络设备统计</a>
                <a className={"list-group-item" + (this.props.activeMenu == 6 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a6">防火墙统计</a>
                <a className={"list-group-item" + (this.props.activeMenu == 7 ? ' active' : '')} onClick={this._handleOnClick} id="nonVideo_left_a7">数据库统计</a>
              </div>
            </div>
          </div>
        </div>
      );
    },
});

module.exports = OrderLeftList;
