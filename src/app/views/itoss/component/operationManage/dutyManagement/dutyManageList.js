/**
 * Created by xuexue.yin on 2016/02/29.
 */

 // var React = require('react');
 import React, { PropTypes } from 'react'
 var ReactDOM = require('react-dom');
 require('bootstrap');

 var ReactRouter = require('react-router');
 var Router = ReactRouter.Router;
 var Route = ReactRouter.Route;
 var History = ReactRouter.History;
 // var Fluxxor = require('fluxxor');
 // var FluxMixin = Fluxxor.FluxMixin(React),
 //     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Store = require('../../../../../server/store.js');
var base64 = require('../../../../../utils/base64.js');
var util = require('../../../../../utils/util.js');
var CommonTree = require('../../monitorTree/commonTree');

var DutyManageList = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_system:flux.store("YFTSystemStore").getState()
    //     }
    // },
    getInitialState: function() {
        return {
            treeList: []
        }
    },
    componentDidMount: function() {
        // //获取权限集合
        var temp = Store.get("PERMISSIONS");
        if(temp&&temp!=null&&temp!=""){
            temp = base64.base64decode(temp);
            temp = decodeURI(temp);
            temp = eval(temp);
            this.props.set_permission(temp);
        }
        var valid1 = util.hasPermission(temp,"/operationmanage/dutymanagement/calendar");
        var valid2 = util.hasPermission(temp,"/operationmanage/dutymanagement/rotaset");
        var list = [];
        if(valid1!=null && valid1!=""){
          list.push({id:1,name:"值班日历",pid:0,toUrl:"operationManage/dutyManagement/calendar"});
        };
        if(valid2!=null && valid2!=""){
          list.push({id:2,name:"值班表设置",pid:0,toUrl:"operationManage/dutyManagement/rotaset"});
        };
        this.setState({treeList:list});
        $(".list-group").find("a").each(function(){
          var $node = $(this);
          $node.mouseover(function(){
            var claz = $node.attr("class");
            var ind = claz.indexOf("active");
            if(ind>=0){
              $node.attr("class","");
              $node.attr("class","list-group-item fadeInMenu active");
            }else{
              $node.attr("class","list-group-item fadeInMenuHover");
            };
          });
          $node.mouseout(function(){
            var claz = $node.attr("class");
            var ind = claz.indexOf("active");
            if(ind>=0){
              $node.attr("class","");
              $node.attr("class","list-group-item fadeInMenu active");
            }else{
              $node.attr("class","list-group-item fadeOutMenuHover");
            };
          });
        });
    },
    _handleOnClick: function(e) {
        if(e.target.id == 'calendar'){
            this.history.pushState(null,'operationManage/dutyManagement/calendar');
        }
        else if(e.target.id == 'rotaset'){
            this.history.pushState(null,'operationManage/dutyManagement/rotaset');
        }
    },
    render: function() {
      const { curThreeNode, preThreeNode, onGetCurThreeNode, onGetPreThreeNode } = this.props;
      var list = this.state.treeList;
      if(list== null || list == "" || list.length<=0){
        return (
            <div className="assetManageListDiv">
                <div className="iq-list" style={{"display":"none"}}>
                    <div className="list-group">
                        <a id="calendar"  className="list-group-item" onClick={this._handleOnClick}>值班日历</a>
                        <a id="rotaset"  className="list-group-item" onClick={this._handleOnClick}>值班表设置</a>
                    </div>
                </div>
            </div>
        );
      }else{
        return (
            <div className="assetManageListDiv">
                <CommonTree data={list} curThreeNode={curThreeNode} preThreeNode={preThreeNode} curName={this.props.curName} setCurName={this.props.setCurName} onGetCurThreeNode={onGetCurThreeNode} onGetPreThreeNode={onGetPreThreeNode}/>
            </div>
        );
      };
    }
});

DutyManageList.propTypes = {
    // curThreeNode: PropTypes.string.isRequired,
    // preThreeNode: PropTypes.string.isRequired,
    set_permission: PropTypes.func.isRequired,
    onGetCurThreeNode: PropTypes.func.isRequired,
    onGetPreThreeNode: PropTypes.func.isRequired,
}

module.exports = DutyManageList;
