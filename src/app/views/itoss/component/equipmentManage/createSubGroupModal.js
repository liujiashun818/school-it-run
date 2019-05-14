import React, { PropTypes } from 'react';
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;

var createSubGroupModal = React.createClass({
    mixins: [History],
    getInitialState:function(){
      return null;
    },
    componentDidMount:function(){
    },
    SaveSubGroup:function(){
      var pNode = this.props.selectedNode;
      var bid = pNode.bid;
      var pid = pNode.id;
      var status = "good";
      var gName = $("#createSubGroupName").val();
      var gDesc = $("#createSubGroupDescribe").val();
      if(gName == null || gName == ""){
        alert("请填写子组的名字")
        return false;
      };
      var param = {
        Description:gDesc,
        BelongID:bid,
        Status:status,
        GroupName:gName,
        ParentGroupId:pid,
        Sorter:1000
      };
      this.props.createEccGroup(param);
      $("#createSubGroupModal").modal("hide");
    },
    CloseSubGroup:function(){
      $("#createSubGroupName").val("");
      $("#createSubGroupDescribe").val("");
      $("#createSubGroupModal").modal("hide");
    },
    render:function(){
      return (
        <div className="modal fade" id="createSubGroupModal" tabIndex="-1" role="dialog" aria-labelledby="createSubGroupModalLabel" aria-hidden="true">
            <div className="modal-dialog createSubGroupModalDialog">
                <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">新增子组</h4>
                    </div>
                    <div className="modal-body">
                      <div className="input-group">
                        <span className="input-group-addon">组名</span>
                        <input type="text" className="form-control" id="createSubGroupName"/>
                      </div>
                      <div className="input-group" style={{"marginTop":"10px"}}>
                        <span className="input-group-addon">描述</span>
                        <textarea className="form-control monitorModalArea" rows="5" id="createSubGroupDescribe"/>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-success btn-sm modalFootBtn" onClick={this.SaveSubGroup}>保存</button>
                      <button type="button" className="btn btn-default btn-sm modalFootBtn" onClick={this.CloseSubGroup}>关闭</button>
                    </div>
                </div>
            </div>
        </div>
      );
    }
});

module.exports = createSubGroupModal;
