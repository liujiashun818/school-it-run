/**
* Created by Yuchen  2016/01/13.
* 新建维修单头部
*/

require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./../../../../utils/util.js');
var Store = require('./../../../../server/store.js');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var Maintain_desView_static = React.createClass({
    mixins: [History],
    componentDidMount: function(){
        var creator_input = $("#assetTabs-applier").find("input");
        creator_input.val(Store.get("localUserName"));
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
                        <span>维修清单的主要功能：记录资产维修信息（带有 * 标识的属性为必填字段）</span>
                    </div>
                    <div className='btnGroupDiv2'>
                        <button type="button" className="btn btn-success btnSave" onClick={this._submit}>保存</button>
                    </div>
                </div>
            </div>
        );
    },
    _submit: function(e){
        var valid = true;
        var data = {};
        var _this = this;
        data.FileNumber = $("#maintainOrderCreateTable #assetTabs-maintainCode").find("input").val();
        data.CheckName = $("#maintainOrderCreateTable #assetTabs-checkName").find("input").val();
        data.CreatedBy = $("#maintainOrderCreateTable #assetTabs-applier").find("input").val();
        data.AreaID = $("#maintainOrderCreateTable #assetTabs-area .rw-dropdownlist .rw-input").children().eq(0).children().eq(0).text();
        data.CheckPhone = $("#maintainOrderCreateTable #assetTabs-maintainerMobile").find("input").val();
        data.MaintenancePay = $("#maintainOrderCreateTable #assetTabs-maintainPay").find("input").val();
        data.CheckTime = $("#maintainOrderCreateTable #assetTabs-maintainTime").find("input").val();
        data.ManufacturerInfo = $("#maintainOrderCreateTable #assetTabs-manufacturerInfo").val();
        var assetData = $("#selectedAssetTable").bootstrapTable('getData')[0]||[];
        data.GBCode = assetData.recId||"";
        data.CheckTime = util.getDateObj(data.CheckTime);
        data.UnitName = localStorage.getItem("GROUP_ID");
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
            this.props.create_asset_maintainOrder({
                data: data,
                callback: function(resp){
                    setTimeout(function(){
                        document.getElementById('publicMessageModelTitle').innerHTML = "维修清单";
                        document.getElementById('publicMessageModalcontent').innerHTML = "添加成功";
                        $('#publicMessageModal').modal('show');
                    },100);
                    var valid = util.hasPermission(_this.props.Permissions,"/assetmanage/maintain/maintainlist");
                    if(valid==null){
                        saveBtn.text("已保存");
                        return;
                    }
                    _this.history.pushState(null,'assetManage/maintain');
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

module.exports = Maintain_desView_static;
