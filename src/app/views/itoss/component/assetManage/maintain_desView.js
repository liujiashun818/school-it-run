/**
* Created by Yuchen  2016/01/13.
* 维修清单列表主窗口
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

var Maintain_desView_static = require('./maintain_desView_static');
var Maintain_desView_assetTabs = require('./maintain_desView_assetTabs');

var Maintain_desView = React.createClass({
    mixins: [History],
    componentDidMount: function() {
        if(document.getElementById('maintainDesViewDiv') != null) {
            document.getElementById('maintainDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
        }
    },
    render: function() {
        return (
            <div id="maintainDesViewDiv" className="overviewDesViewDiv assetDesViewDiv">
                <div className="titleDiv col-md-12">
                    <div className="titleLeft">
                        资产管理：维修清单
                    </div>
                    <div className="titleRight2">
                        <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <Maintain_desView_static Permissions={this.props.Permissions} handleOnClick={this._handleOnClick} />
                <Maintain_desView_assetTabs
                    Permissions={this.props.Permissions}
                    MaintainOrderList={this.props.MaintainOrderList}
                    MaintainOrderCount={this.props.MaintainOrderCount}
                    Filter_AreaList={this.props.Filter_AreaList}
                    get_maintain_order={this.props.get_maintain_order}
                    set_maintainDetailID={this.props.set_maintainDetailID} />
            </div>
        );
    },
    _handleOnClick: function(e){
        var _this = this;
        var B = $(e.target);
        var id = B.attr("id");
        switch(id){
            case "btn-create":
                _this.history.pushState(null,'assetManage/createMaintain');
            break;
            case "btn-delete":
                var table = $('#maintainOrderTable');
                var selections = table.bootstrapTable('getSelections');
                _this.props.delete_maintain_orders({
                    data: selections,
                    callback: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "维修清单";
                            document.getElementById('publicMessageModalcontent').innerHTML = "删除成功";
                            $('#publicMessageModal').modal('show');
                        },100);
                        var DOMNode = $(ReactDOM.findDOMNode(_this));
                        var B = DOMNode.find('button[name="refresh"]');
                        B.click();
                    },
                    error: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "维修清单";
                            document.getElementById('publicMessageModalcontent').innerHTML = "删除失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    }
                });
            break;
        }
    },
});

$(window).resize(function () {
    if(document.getElementById('maintainDesViewDiv') != null) {
        document.getElementById('maintainDesViewDiv').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = Maintain_desView;
