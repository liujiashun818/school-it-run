/**
 * Created by Yuchen on 2016/01/08.
 */
var React = require('react');
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var AssetTableModal = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    componentDidMount:function(){
        var _this = this;
        $('#assetModal-bindDevice').on('show.bs.modal',function(e){
            _this.props.get_devList_data({
                callback: function(resp){
                    _this._initTree(resp.devList);
                }
            });
        })
    },
    componentDidUpdate: function(){
        if(this.props.DevList.length==0){
            $("#leftTree").text("暂无数据");
        }
        else{
            this._initTree(this.props.DevList);
        }
    },
    _initTree:function(data){
        var zTree;
        var treeDatas;
        var setting = {
            view: {
                dblClickExpand: false,
                showLine: true,
                nameIsHTML: true,
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable:true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPid: ""
                }
            },
            check: {
                enable: true,
                autoCheckTrigger: true,
                chkStyle: "radio",
                radioType: "all"
            },
        };
        var t = $("#leftTree");
        t = $.fn.zTree.init(t, setting, data);
        var zTree = $.fn.zTree.getZTreeObj("leftTree");
        var groupNodes = zTree.getNodesByFilter(function(node){
            if(node.type=="group"||node.type=="root") return true;
            return false;
        });
        for(var a in groupNodes){
            zTree.setChkDisabled(groupNodes[a],true);
        }
    },
    _handleOnClickOK: function() {
        var zTree = $.fn.zTree.getZTreeObj("leftTree");
        if(!zTree) return;
        var GB_code = zTree.getCheckedNodes()[0].id;
        $("#assetTabs-internationalCode").find("input").val(GB_code);
    },
    render : function(){
        return (
            <div className="modal fade" id="assetModal-bindDevice" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog assetModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            选择绑定的监控设备
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className="zTreeMonitor">
                                    <ul id="leftTree" className="ztree"></ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK}>确定</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = AssetTableModal;
