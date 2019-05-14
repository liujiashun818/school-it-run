// var React = require('react');
import React, { PropTypes } from 'react'
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var util = require('../../../../../utils/util.js');

var ConfirmChangeWorkOrderTemplateInfoModal = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    _handleOnClickSave: function() {
        const { selectedWorkOrderTemplate, edit_workOrderTemplate, templateType } = this.props;
        $("#confirmChangeWorkOrderTemplateInfoModal").modal("hide");

        var template_name = $.trim($("#template_name").val());
        if(template_name==null||template_name==""){
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请填写模板名称"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }

        var template_entity = $.trim($("#template_entity").val());
        if(template_entity==null||template_entity==""){
            setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请填写模板实例"
                $('#publicMessageModal').modal('show');
            },100);
            return false;
        }

        var dataObj = {
            RecId: selectedWorkOrderTemplate.RecId,
            t_name: template_name,
            t_descript: $.trim($("#template_description").val()),
            t_type: templateType.id,
            t_entity: template_entity,
            t_isEnable: document.getElementById("template_isEnable").checked,
            t_content: $.trim($("#template_content").val())
        }
        edit_workOrderTemplate(dataObj);
    },

    _handleOnClickNoSave: function() {
        $("#confirmChangeWorkOrderTemplateInfoModal").modal("hide");
        this.history.pushState(null,'operationmanage/workOrderTemplateList');
    },

    render : function(){
        return (
            <div className="modal fade" id="confirmChangeWorkOrderTemplateInfoModal" tabIndex="-1" role="dialog" aria-labelledby="confirmChangeWorkOrderTemplateInfoModalLabel" aria-hidden="true">
                <div className="modal-dialog fieldSettingModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">确认修改</h5>
                        </div>
                        <div className="modal-body">
                            工单模板已被修改，是否保存？
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickSave}>保存</button>
                            <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickNoSave}>不保存</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

ConfirmChangeWorkOrderTemplateInfoModal.propTypes = {
    selectedWorkOrderTemplate: PropTypes.object,
    edit_workOrderTemplate: PropTypes.func.isRequired,
    templateType: PropTypes.object
}

module.exports = ConfirmChangeWorkOrderTemplateInfoModal;
