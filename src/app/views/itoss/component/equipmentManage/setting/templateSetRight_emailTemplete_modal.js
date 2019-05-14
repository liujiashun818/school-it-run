/**
 * Created by Yuchen on 2016/03/15.
 * 模板设置-邮件模板新建&编辑页
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

var EmailTemplete = React.createClass({
    mixins: [History],
    getInitialState: function () {
        return {

        }
    },
    componentDidMount: function() {
        var maxHeight = defaultHeight2;
        if(maxHeight > $(window).height()) maxHeight = $(window).height();
        $("#emailTemplete >div").height(maxHeight);
        $("#emailTemplete .modal-body").height(maxHeight-72);
        $("#emailTemplete-title-div,#emailTemplete-templeteTitle-div").mouseover(function(){
            $(this).find(".alert-block").hide();
        })
        $("#emailTemplete-title-div,#emailTemplete-templeteTitle-div").find("input").focus(function(){
            $(this).parent().find(".alert-block").hide();
        })
    },
    componentDidUpdate: function() {
        if(this.props.state.modalType==0) $("#emailTemplete-content").val(this.props.state.default_email_content);
    },
    render: function() {
        return (
            <div className="modal fade fullable" id="emailTemplete" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog assetModalDialog templeteConfig" style={{width:"60%",height:(defaultHeight2+"px")}}>
                    <div className="modal-content" style={{height:"100%"}}>
                        <div className="modal-header">
                            {this.props.state.modalType==0?"新建Email模板":"编辑Email模板"}
                        </div>
                        <div className="modal-body">
                            <input id="emailTemplete-id" type="hidden" />
                            <div className='row createGroupDetailDiv userAddView_desView_form addAlarmRule_form'>
                                <table className="normal-table">
                                    <tbody>
                                        <tr>
                                            <td className="col-md-1">邮件标题: <red>*</red></td>
                                            <td id="emailTemplete-title-div" className="col-md-11 no-padding inline-input">
                                                <div className="alert-block">邮件标题不能为空</div>
                                                <input id="emailTemplete-title" tabIndex="1" type="text" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="col-md-1">邮件内容:</td>
                                            <td className="col-md-11 no-padding inline-input">
                                                <textarea id="emailTemplete-content" className="largeTextArea" tabIndex="2"></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="col-md-1">邮件模板: <red>*</red></td>
                                            <td id="emailTemplete-templeteTitle-div" className="col-md-11 no-padding inline-input">
                                                <div className="alert-block">邮件模板不能为空</div>
                                                <input id="emailTemplete-templeteTitle" tabIndex="3" type="text" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='row'>
                                <pre>
                                    注意: 系统模板不可以删除和修改，请不要随意输入“@”和两个“@”间的参数变量,可以参考系统模板进行添加。参数变量如下: <br/>
                                    @FullPathGroup@ : 监测点所在设备所在组的全部路径名称<br/>
                                    @Status@ : 监测器点的状态<br/>
                                    @AllGroup@ : 监测点所在设备所在组名称<br/>
                                    @Device@ : 监测点所在设备的名称<br/>
                                    @Monitor@ : 监测点名称<br/>
                                    @MonitorDstr@ : 监测器描述<br/>
                                    @MonitorAlertDes@ : 监测点报警描述<br/>
                                    @Time@ : 报警时间<br/>
                                </pre>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" id="emailTemplete-btn-save" onClick={this._handleOnClick} style={{width:84}}>保存</button>
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
            case "emailTemplete-btn-save":
                var data = {}, valid = true;
                data.MailTitle = $("#emailTemplete-title").val();
                data.MailContent = $("#emailTemplete-content").val();
                data.MailModle = $("#emailTemplete-templeteTitle").val();
                data.RecId = $("#emailTemplete-id").val();
                data.ModleType = "email";
                if(data.MailTitle.length<=0){
                    valid = false;
                    $("#emailTemplete-title-div").find(".alert-block").show();
                }
                if(data.MailModle.length<=0){
                    valid = false;
                    $("#emailTemplete-templeteTitle-div").find(".alert-block").show();
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
                                $("#emailTemplete").modal("hide");
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
                                $("#emailTemplete").modal("hide");
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
    $("#emailTemplete >div").height(maxHeight);
    $("#emailTemplete .modal-body").height(maxHeight-72);
});

module.exports = EmailTemplete;
