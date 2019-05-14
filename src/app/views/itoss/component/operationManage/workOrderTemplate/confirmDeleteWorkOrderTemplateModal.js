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

var base64 = require('../../../../../utils/base64');

var ConfirmDeleteWorkOrderTemplateModal = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_system:flux.store("YFTSystemStore").getState()
    //     }
    // },

    getInitialState: function() {
        return {
            bShowAdd: true,
            bShowDelete: true
        };
    },

    componentDidMount: function() {
        // var temp = localStorage.getItem("PERMISSIONS");
        // temp = base64.base64decode(temp);
        // temp = decodeURI(temp);
        // var permissionsValue = eval(temp);
        // for(var i = 0; i < permissionsValue.length; i++) {
        //     if(permissionsValue[i].resourceType == "/systemmanage/userlist/add") {
        //         this.setState({bShowAdd: true});
        //     }
        //     else if(permissionsValue[i].resourceType == "/systemmanage/userlist/delete") {
        //         this.setState({bShowDelete: true});
        //     }
        // }
    },

    _handleOnClickConfirm: function() {
        const { selectedWorkOrderTemplate, workOrderTemplatesData, delete_workOrderTemplate, get_workOrderTemplates, set_selectedWorkOrderTemplate, setWorkOrderTemplateInfoChangeFlag} = this.props;
        delete_workOrderTemplate(selectedWorkOrderTemplate.RecId);
        get_workOrderTemplates();
        $('#workOrderTemplateListTable').bootstrapTable('refreshOptions', {data: workOrderTemplatesData});

        var _this = this;
        var refreshBtnObj= document.createElement('button');
        refreshBtnObj.setAttribute('class', 'btn btn-default');
        refreshBtnObj.setAttribute('type', 'button');
        refreshBtnObj.setAttribute('name', 'refresh');
        refreshBtnObj.setAttribute('title', '刷新');
        refreshBtnObj.onclick = function() {
            get_workOrderTemplates();
            $('#workOrderTemplateListTable').bootstrapTable('refreshOptions', {data: workOrderTemplatesData});
            var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
            btnGroup.insertBefore(this, btnGroup.childNodes[0]);
            if(_this.state.bShowDelete) {
                btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
            }
            if(_this.state.bShowAdd) {
                btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
            }
        };
        refreshBtnObj.innerHTML = '<i class="glyphicon glyphicon-refresh icon-refresh"></i>';

        var deleteBtnObj= document.createElement('button');
        deleteBtnObj.setAttribute('class', 'btn btn-default');
        deleteBtnObj.setAttribute('type', 'button');
        deleteBtnObj.setAttribute('name', 'delete');
        deleteBtnObj.setAttribute('title', '删除模板');
        deleteBtnObj.onclick = function() {
            var selections = $('#workOrderTemplateListTable').bootstrapTable('getSelections');
            if(selections.length != 0) {
                set_selectedWorkOrderTemplate({workOrderTemplate:selections[0], flag:"delete"});
                $("#confirmDeleteWorkOrderTemplateModal").modal("show");
            }
        };
        deleteBtnObj.innerHTML = '<i class="glyphicon glyphicon-trash icon-trash"></i>';

        var addBtnObj= document.createElement('button');
        addBtnObj.setAttribute('class', 'btn btn-default');
        addBtnObj.setAttribute('type', 'button');
        addBtnObj.setAttribute('name', 'add');
        addBtnObj.setAttribute('title', '新建模板');
        addBtnObj.onclick = function() {
            set_selectedWorkOrderTemplate({workOrderTemplate:null, flag:"add"});
            setWorkOrderTemplateInfoChangeFlag(true);
            _this.history.pushState(null,'operationmanage/createWorkOrderTemplate');
        };
        addBtnObj.innerHTML = '<i class="glyphicon glyphicon-plus icon-plus"></i>';

        var btnGroup = document.getElementsByClassName('fixed-table-toolbar')[0].childNodes[1];
        btnGroup.insertBefore(refreshBtnObj, btnGroup.childNodes[0]);
        if(_this.state.bShowDelete) {
            btnGroup.insertBefore(deleteBtnObj, btnGroup.childNodes[0]);
        }
        if(_this.state.bShowAdd) {
            btnGroup.insertBefore(addBtnObj, btnGroup.childNodes[0]);
        }
        $("#confirmDeleteWorkOrderTemplateModal").modal("hide");
    },

    render : function(){
        return (
            <div className="modal fade" id="confirmDeleteWorkOrderTemplateModal" tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteWorkOrderTemplateModalLabel" aria-hidden="true">
                <div className="modal-dialog fieldSettingModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">删除模板确认</h5>
                        </div>
                        <div className="modal-body">
                            是否确定删除模板：{this.props.selectedWorkOrderTemplate==null?"":this.props.selectedWorkOrderTemplate.t_name}？
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm modalFootBtn" onClick={this._handleOnClickConfirm}>确定</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

ConfirmDeleteWorkOrderTemplateModal.propTypes = {
    workOrderTemplatesData: PropTypes.array.isRequired,
    selectedWorkOrderTemplate: PropTypes.object,
    delete_workOrderTemplate: PropTypes.func.isRequired,
    get_workOrderTemplates: PropTypes.func.isRequired,
    set_selectedWorkOrderTemplate: PropTypes.func.isRequired
}

module.exports = ConfirmDeleteWorkOrderTemplateModal;
