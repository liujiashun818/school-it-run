/**
* Created by Yuchen  2016/01/29.
* 维修单详情头部
*/

require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var MaintainDetail_desView_static = React.createClass({
    mixins: [History],
    componentDidMount: function(){
        $("#assetTabs-maintainCode,#assetTabs-checkName,#assetTabs-maintainTime,#assetTabs-maintainerMobile").mouseover(function(){
            $(this).find(".alert-block").hide();
        })
        $("#assetTabs-maintainCode,#assetTabs-checkName,#assetTabs-maintainerMobile").find("input").focus(function(){
            $(this).parent().find(".alert-block").hide();
        })
        $("#assetTabs-maintainTime").find("input").focus(function(){
            $(this).parent().parent().find(".alert-block").hide();
        })
    },
    render: function() {
        return (
            <div className="staticDiv col-md-12">
                <div className="staticLeftDiv">
                    <div className='remarkDiv2'>
                        <span>维修单详情的主要功能：展示和编辑单个资产维修单的详细信息（带有 * 标识的属性为必填字段）</span>
                    </div>
                    <div className='btnGroupDiv2'>
                        <button type="button" className="btn btn-success btnSave" id="btn-save" onClick={this._submit}>保存</button>
                    </div>
                </div>
            </div>
        );
    },
    _submit: function(e){
        var valid = true;
        var data = {};
        var _this = this;
        data.RecId = this.props.SingleMaintainOrder.recId;
        data.FileNumber = $("#maintainOrderDetailTable #assetTabs-maintainCode").find("input").val();
        var old_FileNumber = $("#maintainOrderDetailTable #assetTabs-maintainCode").data("old-fileNumber");
        data.CheckName = $("#maintainOrderDetailTable #assetTabs-checkName").find("input").val();
        data.CreatedBy = $("#maintainOrderDetailTable #assetTabs-applier").find("input").val();
        data.AreaID = $("#maintainOrderDetailTable #assetTabs-area .rw-dropdownlist .rw-input").children().eq(0).children().eq(0).text();
        data.CheckPhone = $("#maintainOrderDetailTable #assetTabs-maintainerMobile").find("input").val();
        data.MaintenancePay = $("#maintainOrderDetailTable #assetTabs-maintainPay").find("input").val();
        data.CheckTime = $("#maintainOrderDetailTable #assetTabs-maintainTime").find("input").val();
        data.ManufacturerInfo = $("#maintainOrderDetailTable #assetTabs-manufacturerInfo").val();
        var assetData = $("#selectedAssetTable").bootstrapTable('getData')[0]||[];
        data.GBCode = assetData.recId||"";
        data.CheckTime = util.getDateObj(data.CheckTime);
        if(data.FileNumber.length==0){
            $("#assetTabs-maintainCode").find(".alert-block").show();
            valid = false;
        }
        if(data.GBCode.length==0){
            $("#alert-maintainAssetError").show();
            valid = false;
        }
        if(data.CheckName.length==0){
            $("#assetTabs-checkName").find(".alert-block").show();
            valid = false;
        }
        if(isNaN(data.CheckTime)){
            $("#assetTabs-maintainTime").find(".alert-block").show();
            valid = false;
        }
        if(data.CheckPhone.length>0&&!this.props.MOBILE_FILTER.test(data.CheckPhone)){
            $("#assetTabs-maintainerMobile").find(".alert-block").show();
            valid = false;
        }
        //formatter
        for(var a in this.props.AreaIdList){
            if(this.props.AreaIdList[a].name == data.AreaID){
                data.AreaID = this.props.AreaIdList[a].id;
                break;
            }
        }
        if(valid){//提交
            var saveBtn = $(e.target);
            saveBtn.text("保存中");
            saveBtn.attr("disabled","disabled");
            this.props.update_single_maintainOrder({
                data: data,
                oldFileNumber: old_FileNumber,
                callback: function(resp){
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "维修清单";
                        document.getElementById('publicMessageModalcontent').innerHTML = "修改成功";
                        $('#publicMessageModal').modal('show');
                    },100);
                    saveBtn.text("保存");
                    saveBtn.removeAttr("disabled");
                },
                error: function(resp){
                    if(resp.invalidFileNumber){
                        $("#maintainOrderCreateTable #assetTabs-maintainCode").find("input").focus();
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "维修清单";
                            document.getElementById('publicMessageModalcontent').innerHTML = "添加失败：维修单号已存在，请输入其他的维修单号！";
                            $('#publicMessageModal').modal('show');
                        },100);
                    }
                    else{
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "维修清单";
                            document.getElementById('publicMessageModalcontent').innerHTML = "添加失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    }
                    saveBtn.text("保存");
                    saveBtn.removeAttr("disabled");
                }
            });
        }
    },
});

module.exports = MaintainDetail_desView_static;
