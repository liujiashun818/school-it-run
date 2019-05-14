import React, { PropTypes } from 'react';
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;

var UpdateMonitorModal = React.createClass({
    mixins: [History],
    getInitialState:function(){
      return null;
    },
    componentDidMount:function(){
      var that = this;
      $("#updateResourceModal").on("show.bs.modal",function(){
        var node = that.props.selectedNode;
        var nid = node.id;
        that.props.getEccGroupById(nid);
      });
    },
    saveUpdateGroup:function(){
      var pNode = this.props.selectedNode;
      var pid = pNode.id;
      var gName = $("#updateGroupName").val();
      if(gName == null || gName == ""){
        alert("请填写组织的名字")
        return false;
      };
      var gDesc = $("#updateGroupDesc").val();
      var param = {
        Description:gDesc,
        GroupName:gName,
        RecId:pid,
      };
      this.props.updateEccGroup(param);
      $("#updateResourceModal").modal("hide");
    },
    closeUpdateGroup:function(){
      $("#updateGroupName").val("");
      $("#updateGroupDesc").val("");
      $("#updateResourceModal").modal("hide");
    },
    render:function(){
      var pNode = this.props.selectedDeivceGroup;
      var pName = pNode.GroupName;
      var pDesc = pNode.Description;
      $("#updateGroupName").val(pName);
      $("#updateGroupDesc").val(pDesc);
      // console.log(pNode);
      return (
        <div className="modal fade" id="updateResourceModal" tabIndex="-1" role="dialog" aria-labelledby="updateResourceModalLabel" aria-hidden="true">
            <div className="modal-dialog updateResourceModallDialog">
                <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">编辑组</h4>
                    </div>
                    <div className="modal-body">
                      <div className="input-group">
                        <span className="input-group-addon">组名</span>
                        <input type="text" className="form-control" id="updateGroupName"/>
                      </div>
                      <div className="input-group" style={{"marginTop":"10px"}}>
                        <span className="input-group-addon">描述</span>
                        <textarea className="form-control monitorModalArea" rows="5" id="updateGroupDesc"/>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-success btn-sm modalFootBtn" onClick={this.saveUpdateGroup}>保存</button>
                      <button type="button" className="btn btn-default btn-sm modalFootBtn" onClick={this.closeUpdateGroup}>关闭</button>
                    </div>
                </div>
            </div>
        </div>
      );
    }
});

module.exports = UpdateMonitorModal;
