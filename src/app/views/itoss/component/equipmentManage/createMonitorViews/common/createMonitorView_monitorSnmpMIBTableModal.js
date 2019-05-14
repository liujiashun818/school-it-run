/**
 * Created by SHIN on 2016/5/26.
 * 监测器 SnmpMIB 列表模态框
 */
// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var Router = require('react-router');

var History = require('react-router').History;
import { connect } from 'react-redux'
import * as EquipmentActions from '../../../../../../actions/equipment_action';

var MonitorSnmpMIBTableModal = React.createClass({
    componentDidUpdate:function(){
      const { monitorSnmpMIBCounter } = this.props;

      var treeObj = this.props.monitorSnmpMIBCounter;
      $(document).ready(function(){
        $.fn.zTree.init($("#counterTree"), this.rSetting(), treeObj);
      }.bind(this));
    },

    _handleOnClickOK: function() {

        if(selectedCounter.length == 0) {
            this.props.setSelectedMonitorSnmpMIBCounter(null);
        }
        else {
            this.props.setSelectedMonitorSnmpMIBCounter(selectedCounter[0]);
        }
    },

    onClickChild:function(treeNode){
      var zTree = $.fn.zTree.getZTreeObj("counterTree");
      var checkedState = treeNode.checked;
      if(checkedState){
        checkedState = false;
      }else{
        checkedState = true;
      };
      zTree.checkNode(treeNode,checkedState,true);
    },

    rSetting:function(){
      var _this = this;
      var setting = {
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          beforeClick: function(treeId, treeNode) {
            _this.onClickChild(treeNode);
          },
          onCheck: this.myTest
        }
      }
      return setting;
    },

    _handleOnClickOK:function(){

      var treeObj = $.fn.zTree.getZTreeObj("counterTree");
      var selectTreeNode = treeObj.getCheckedNodes(true);

      var selectTreeNodeStr = '';

      for(var i in selectTreeNode){
        if(selectTreeNodeStr){
          selectTreeNodeStr+='\n' + selectTreeNode[i].name;
        }else{
          selectTreeNodeStr+=selectTreeNode[i].name;

        }
      }
      if(selectTreeNodeStr) {
        this.props.setSelectedMonitorSnmpMIBCounter(selectTreeNodeStr);
        
      }
      else {
          this.props.setSelectedMonitorSnmpMIBCounter(null);

      }

    },

    render : function(){
        return (
            <div className="modal fade" id="monitorSnmpMIBTableModal" tabIndex="-1" role="dialog" aria-labelledby="monitorSnmpMIBTableModalLabel" aria-hidden="true">
                <div className="modal-dialog editConditionModalDialog" style={{width:"400px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">计数器</h4>
                        </div>
                        <div className="modal-body">
                            <div className='marginTop_5'>
                              <div className="repositoryOverview" style={{"height":"600px"}} onChange={this.changeCounterState}><ul id="counterTree" className="ztree"></ul></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK}>确定</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = MonitorSnmpMIBTableModal;
