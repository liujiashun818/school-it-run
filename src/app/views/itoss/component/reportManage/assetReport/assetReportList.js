/**
* Created by Yuchen  2016/01/21.
* 资产报表-左侧导航栏
*/

var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var base64 = require('../../../../../utils/base64');
var CommonTree = require('../../monitorTree/commonTree');

var AssetList = React.createClass({
    mixins: [History],
    /*getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            itoss:flux.store("YFTIndexStore").getState()
        }
    },*/
    getInitialState:function(){
        return {
            treeData:[]
        }
    },

    componentDidMount: function(){
        var list =[];
        // var bShowAssetstatisticReport = false, bShowAssetmaintainReport = false;
        // var temp = localStorage.getItem("PERMISSIONS");
        // temp = base64.base64decode(temp);
        // temp = decodeURI(temp);
        // var permissionsValue = eval(temp);
        // for(var i = 0; i < permissionsValue.length; i++) {
        //     if(permissionsValue[i].resourceType == "/reportmanage/asset/assetstatistic") {
        //         bShowAssetstatisticReport = true;
                list.push({id:1,name:"资产统计",pid:0,toUrl:"reportManage/assetStatistic"});
            // }
            // else if(permissionsValue[i].resourceType == "/reportmanage/asset/assetmaintain") {
            //     bShowAssetmaintainReport = true;
                list.push({id:2,name:"资产维修",pid:0,toUrl:"reportManage/assetMaintain"});
        //     }
        // }
        // if(!bShowAssetstatisticReport) {
        //     $("#statistic").hide();
        // }
        // if(!bShowAssetmaintainReport) {
        //     $("#maintain").hide();
        // }
        this.setState({treeData:list});
    },
    _handleOnClick: function(e) {
        if(e.target.id == 'statistic'){
            this.history.pushState(null,'reportManage/assetStatistic');
        }
        else if(e.target.id == 'maintain'){
            this.history.pushState(null,'reportManage/assetMaintain');
        }
    },
    render: function() {
      var treeData = this.state.treeData;
      if(treeData != null && treeData != ""){
        var curThreeNode = this.props.curThreeNode;
        var preThreeNode = this.props.preThreeNode;
        var onGetCurThreeNode = this.props.onGetCurThreeNode;
        var onGetPreThreeNode = this.props.onGetPreThreeNode;
        return (
            <div className="assetManageListDiv">
                <div className="iq-list" style={{"display":"none"}}>
                    <div className="list-group">
                        <a id="statistic"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资产统计</a>
                        <a id="maintain"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资产维修</a>
                    </div>
                </div>
                <CommonTree data={treeData} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={this.props.setCurName} onGetCurThreeNode={onGetCurThreeNode} onGetPreThreeNode={onGetPreThreeNode}/>
            </div>
        );
      }else{
        return (
            <div className="assetManageListDiv">
                <div className="iq-list" style={{"display":"none"}}>
                    <div className="list-group">
                        <a id="statistic"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资产统计</a>
                        <a id="maintain"  className="list-group-item" onClick={this._handleOnClick} style={{cursor:'pointer'}}>资产维修</a>
                    </div>
                </div>
            </div>
        );
      };
    }
});

module.exports = AssetList;
