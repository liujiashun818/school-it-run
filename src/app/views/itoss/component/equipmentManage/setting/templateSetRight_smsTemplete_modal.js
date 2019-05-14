/**
 * Created by Yuchen on 2016/03/15.
 * 模板设置-短信模板新建&编辑页
 */
var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');

var defaultHeight2 = 518;

var SMSTemplete = React.createClass({
    mixins: [History],
    getInitialState: function () {
        return {

        }
    },
    componentDidMount: function() {
        var maxHeight = defaultHeight2;
        if(maxHeight > $(window).height()) maxHeight = $(window).height();
        $("#smsTemplete >div").height(maxHeight);
        $("#smsTemplete .modal-body").height(maxHeight-72);
        $("#smsTemplete-title-div,#smsTemplete-templeteTitle-div").mouseover(function(){
            $(this).find(".alert-block").hide();
        })
        $("#smsTemplete-title-div,#smsTemplete-templeteTitle-div").find("input").focus(function(){
            $(this).parent().find(".alert-block").hide();
        })
    },
    componentDidUpdate: function() {
        //if(this.props.state.modalType==0) $("#smsTemplete-content").val(this.props.state.default_sms_content);
    },
    render: function() {
        return (
            <div className="modal fade fullable" id="smsTemplete" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog assetModalDialog templeteConfig" style={{width:"60%",height:(defaultHeight2+"px")}}>
                    <div className="modal-content" style={{height:"100%"}}>
                        <div className="modal-header">
                            {this.props.state.modalType==0?"新建短信模板":"编辑短信模板"}
                        </div>
                        <div className="modal-body">
                            <input id="smsTemplete-id" type="hidden" />
                            <div className='row createGroupDetailDiv userAddView_desView_form addAlarmRule_form'>
                                <table className="normal-table">
                                    <tbody>
                                        <tr>
                                            <td className="col-md-1">短信标题: <red>*</red></td>
                                            <td id="smsTemplete-title-div" className="col-md-11 no-padding inline-input">
                                                <div className="alert-block">短信标题不能为空</div>
                                                <input id="smsTemplete-title" tabIndex="1" type="text" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="col-md-1">短信内容:</td>
                                            <td className="col-md-11 no-padding inline-input">
                                                <textarea id="smsTemplete-content" className="largeTextArea" tabIndex="2"></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="col-md-1">模板标题: <red>*</red></td>
                                            <td id="smsTemplete-templeteTitle-div" className="col-md-11 no-padding inline-input">
                                                <div className="alert-block">模板标题不能为空</div>
                                                <input id="smsTemplete-templeteTitle" tabIndex="3" type="text" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='row'>
                                <pre>
                                    注意: 系统模板不可以删除和修改，请不要随意输入“@”和两个“@”间的参数变量,可以参考系统模板进行添加。参数变量如下: <br/>
                                    @FullPathGroup@ : 监测点所在设备所在组的全部路径名称 <br/>
                                    @Status@ : 监测器点的状态 <br/>
                                    @AllGroup@ : 监测点所在设备所在组名称 <br/>
                                    @Group@ : 监测点所在组下 <br/>
                                    @Device@ : 监测点所在设备的名称 <br/>
                                    @Monitor@ : 监测点名称 <br/>
                                    @MonitorDstr@ : 监测点报警描述，在监测点高级设置中设置 <br/>
                                    @Time@ : 报警时间
                                </pre>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" id="smsTemplete-btn-save" onClick={this._handleOnClick} style={{width:84}}>保存</button>
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _handleOnClick: function(e){
        var $e = $(e.target);
        var id = $e.attr("id");
        switch(id){
            case "smsTemplete-btn-save":
                var data = {}, valid = true;
                data.MailTitle = $("#smsTemplete-title").val();
                data.MailContent = $("#smsTemplete-content").val();
                data.MailModle = $("#smsTemplete-templeteTitle").val();
                data.RecId = $("#smsTemplete-id").val();
                data.ModleType = "SMS";
                if(data.MailTitle.length<=0){
                    valid = false;
                    $("#smsTemplete-title-div").find(".alert-block").show();
                }
                if(data.MailModle.length<=0){
                    valid = false;
                    $("#smsTemplete-templeteTitle-div").find(".alert-block").show();
                }
                if(!valid) return;
                switch(this.props.state.modalType){
                    case 0://新建模板
                        this.props.create_templete({
                            data: data,
                            callback: function(resp){
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                                    document.getElementById('publicMessageModalcontent').innerHTML = "新建成功";
                                    $('#publicMessageModal').modal('show');
                                },100);
                                $("#smsTemplete").modal("hide");
                            },
                            error: function(resp){
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                                    document.getElementById('publicMessageModalcontent').innerHTML = "新建失败";
                                    $('#publicMessageModal').modal('show');
                                },100);
                            },
                        });
                    break;
                    case 1://编辑模板
                        this.props.update_templete({
                            data: data,
                            callback: function(resp){
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                                    document.getElementById('publicMessageModalcontent').innerHTML = "编辑成功";
                                    $('#publicMessageModal').modal('show');
                                },100);
                                $("#smsTemplete").modal("hide");
                            },
                            error: function(resp){
                                setTimeout(function(){
                                    document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                                    document.getElementById('publicMessageModalcontent').innerHTML = "编辑失败";
                                    $('#publicMessageModal').modal('show');
                                },100);
                            },
                        });
                    break;
                }
            break;
        }
    },
});
$(window).resize(function () {
    var maxHeight = defaultHeight2;
    if(maxHeight > $(window).height()) maxHeight = $(window).height();
    $("#smsTemplete >div").height(maxHeight);
    $("#smsTemplete .modal-body").height(maxHeight-72);
});

module.exports = SMSTemplete;
