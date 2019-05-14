/**
* Created by Yuchen  2016/01/08.
*/

var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');

var GridChart_item = React.createClass({
    render: function() {
        var img;
        switch(this.props.name){
            case "摄像机":
                img = (<img src="./img/itoss/assetStatistic/camera.png" />);
            break;
            case "DVR":
                img = (<img src="./img/itoss/assetStatistic/NVR.png" />);
            break;
            case "NVR":
                img = (<img src="./img/itoss/assetStatistic/NVR.png" />);
            break;
            case "编码器":
                img = (<img src="./img/itoss/assetStatistic/editor.png" />);
            break;
            case "IPSAN"://
                img = (<img src="./img/itoss/assetStatistic/IPSAN.png" />);
            break;
            case "光端机"://
                img = (<img src="./img/itoss/assetStatistic/guangduanji.png" />);
            break;
            case "路由器":
                img = (<img src="./img/itoss/assetStatistic/router.png" />);
            break;
            case "交换机":
                img = (<img src="./img/itoss/assetStatistic/switcher.png" />);
            break;
            case "服务器":
                img = (<img src="./img/itoss/assetStatistic/server.png" />);
            break;
            case "中间件"://
                img = (<img src="./img/itoss/assetStatistic/zhongjianjian.png" />);
            break;
            case "防火墙":
                img = (<img src="./img/itoss/assetStatistic/firewall.png" />);
            break;
            case "网闸"://
                img = (<img src="./img/itoss/assetStatistic/wangzha.png" />);
            break;
            default://@MODIFY
                img = (<img src="./img/itoss/assetStatistic/wangzha.png" />);
            break;
        }
        return (
            <div className="item" onClick={this.props.onClick.bind(null,this.props.id)}>
                <span className="img">{img}</span>
                <span className="text">
                    <label className="amount">
                        {this.props.amount}
                    </label>
                    <label className="name">
                        {this.props.name}
                    </label>
                </span>
            </div>
        );
    },
});

var Overview_desView_gridChart = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    componentDidMount: function() {

    },
    render: function() {
        var _this = this;
        var assetList = this.props.data;
        if(assetList != null && assetList != ""){
          var listDiv = _this.props.data.map(function(d,i){
            if(i>=12) return null;
            return (
              <GridChart_item amount={d.ASSETS_NUMBER} name={d.ASSETS_TYPE_NAME} id={d.PRODUCT_TYE_ID} onClick={_this._onClick} key={i} />
            );
          })
        }else{
          listDiv = "暂无数据";
        }
        return (
            <div className="assetChartDiv gridChart col-md-12">
                <div className="row">
                    {listDiv}
                </div>
            </div>
        );
    },
    _onClick: function(id,e){//@MODIFY
        var _this = this;
        var valid = util.hasPermission(this.props.permissions,"/assetmanage/asset/assetlist");
        if(valid==null) return;
        this.props.set_default_filter_value_assetList({typeID: id,noChange: true});

        // var zTree = $.fn.zTree.getZTreeObj("commonTree");
        // var treeNodes = zTree.getNodes();
        // var beforeNode = zTree.getNodeByParam("name","资产统计");
        // var targetNode = zTree.getNodeByParam("name","资产统计列表");
        // // console.log(targetNode);
        // var tid = targetNode.tId;
        // var tIndex = zTree.getNodeIndex(targetNode);
        // document.getElementById(tid).className = "fadeInMenu";
        // zTree.selectNode(targetNode);
        // this.props.onSetPreThreeNode(beforeNode);
        // this.props.onSetCurThreeNode(targetNode);

        this.props.setCurName("资产统计列表");
        this.history.pushState(null,'assetManage/assetlist');
    },
});

module.exports = Overview_desView_gridChart;
