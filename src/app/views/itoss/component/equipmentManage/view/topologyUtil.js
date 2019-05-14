/**
  createby zxn
  资源监测-视图-修改拓扑图名称
*/

// var TodopologyUtil = {
//   customDialog:function(){
//   var tt=   $('<div class="modal fade" id="myViewModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document">'+
//               '<div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
//               '<span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">修改拓扑图名称</h4></div>'+
//               '<div class="modal-body"><form><div class="form-group"><textarea class="form-control" id="message-text" rows="8" autofocus="autofocus">'+
//               '</textarea></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default" id="customDialogClose">关闭</button>'+
//               '<button id="checkNotPass" type="button" class="btn btn-primary">保存</button></div></div></div></div>');
//     $('#settingView').append(tt);
//     $('#customDialogClose').on('click',function(){
//       $('#myViewModal').modal('hide');
//       setTimeout(function(){
//         tt.remove();
//       }, 1000);
//
//     });
//     $('#myViewModal').modal('show');
//   }
// }
// module.exports = TodopologyUtil;
//如果使用动态构建,需要解决销毁出现的问题
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TopologyModal = React.createClass({
  getInitialState:function(){
    return {
      status: true,
    }
  },
  rSetting:function(treeName){
    var _this = this;
    var  setting = {
        check: {enable: false},
        data: {simpleData: {enable: true}},
        callback: {
          beforeClick: function(treeId, treeNode) {
            _this.props.editBeforeClick(treeNode);
            // _this.getFlux().actions.YFTVisioAction.setTreeId(treeNode.id);
          }
        }
      }
      return setting;
    },
    componentDidUpdate:function(){
      if(this.props.modaltreeObj instanceof Array && this.props.modaltreeObj.length>0){
        if(this.state.status){
          $.fn.zTree.init($("#editVisioTree"), this.rSetting("visioTree"), this.props.modaltreeObj);
          this.setState({status:false});
        }
      }
    },
    componentDidMount:function(){
      // var relyModaltreeObj = this.getFlux().store("YFTVisioStore").getState().visioTree;
      // // TreeUtil.treeConfig("visioTree",relyModaltreeObj);
      // $.fn.zTree.init($("#editVisioTree"), this.rSetting("visioTree"), relyModaltreeObj);
    },
    render: function() {
        return (
          <div className="modal fade" id="myViewModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title" id="myModalLabel">修改拓扑图名称</h4>
                </div>
                <div>
                  {/**<div>
                    <div>发布名称</div>
                    <div><input type="text" /></div>
                  </div>
                  <div>
                    <div>显示名称</div>
                    <div><input type="text" /></div>
                  </div>*/}

                  <div className="input-group input-group-sm">
                    <span className="input-group-addon">发布名称</span>
                    <input type="text" className="form-control" placeholder="发布名称" id="topologyViewText1" aria-describedby="sizing-addon3" disabled={true}/>
                  </div>
                  <div className="input-group input-group-sm">
                    <span className="input-group-addon" >显示名称</span>
                    <input type="text" className="form-control" placeholder="显示名称" id="topologyViewText2" aria-describedby="sizing-addon3" />
                  </div>
                  <div style={{height:"200px",overflow:"auto"}}>
                    <ul id="editVisioTree" className="ztree"></ul>
                  </div>
                  <div><input type="hidden" id="topologyViewText3" /></div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.closeDialogBtn}>关闭</button>
                  <button id="checkNotPass" type="button" className="btn btn-primary" onClick={this.props.topologySaveBtn}>保存</button>
                </div>
              </div>
            </div>
          </div>
        );
    }
});

module.exports = {
  TopologyModal:TopologyModal
};
