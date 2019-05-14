/**
 * Created by Yuchen on 2016/01/15.
 * 资产监控同步
 */
import React from 'react'
require('bootstrap');
var util = require('./../../../../utils/util.js');
var History = require('react-router').History;

var MonitorResponseTable = React.createClass({
    mixins: [History],//, FluxMixin, StoreWatchMixin("AssetManageStore")
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    componentDidMount:function(){
    },
    _handleOnClick: function(e) {
        var B = $(e.target);
        var id = B.attr("id");
        switch(id){
            case "btn-backToAssetList":
              // var zTree = $.fn.zTree.getZTreeObj("commonTree");
              // var treeNodes = zTree.getNodes();
              // var beforeNode = zTree.getNodeByParam("name","监控同步");
              // var targetNode = zTree.getNodeByParam("name","资产统计列表");
              // // console.log(targetNode);
              // var tid = targetNode.tId;
              // var tIndex = zTree.getNodeIndex(targetNode);
              // document.getElementById(tid).className = "fadeInMenu";
              // zTree.selectNode(targetNode);
              // // this.getFlux().actions.YFTIndexActions.set_linshiData(tIndex);
              // // this.getFlux().actions.YFTIndexActions.set_linshiNode(beforeNode);
              // this.props.set_linshiData(tIndex);
              // this.props.set_linshiNode(beforeNode);
              this.props.setCurName("资产统计列表");
              this.history.pushState(null,'assetManage/assetList');
            break;
        }
    },
    render : function(){
        var _this = this;
        // var response_failureList = this.state.itoss.MonitorResponse_failureList;
        var response_failureList = this.props.MonitorResponse_failureList;
        var failure_list = [];
        var backBtn = null;
        for(var i in response_failureList){
            failure_list.push(response_failureList[i]);
        }
        var failure_list_div = failure_list.map(function(m,i){
            return(
                <li>{m}</li>
            );
        });
        // var valid = util.hasPermission(this.state.itoss.Permissions,"/assetmanage/asset/statistic");
        var valid = util.hasPermission(this.props.Permissions,"/assetmanage/asset/statistic");
        if(valid!=null){
            backBtn = (<button type="button" id="btn-backToAssetList" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClick}>返回资产统计列表</button>);
        }
        return (
            <div className="modal fade" id="assetModal-monitor-response" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog assetModalDialog">
                    <div className="modal-content" style={{minHeight:335}}>
                        <div className="modal-header">
                            监控资产信息导入结果
                        </div>
                        <div className="modal-body monitorSyncResponseBody" style={{minHeight:260}}>
                            <div className='row bottomBorder'>
                                <div>绑定成功个数：{this.props.MonitorResponse_success}</div>
                                <div>绑定失败个数：{this.props.MonitorResponse_failureList.length}</div>
                            </div>
                            <div className='row'>
                                <div>绑定失败的监控设备为：</div>
                                <ul className="list">{failure_list_div}</ul>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="btn-confirm" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClick}>确定</button>
                            {backBtn}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MonitorResponseTable;
