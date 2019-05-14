/**
 * Created by Yuchen on 2016/03/17.
 * 模板设置-发送邮件测试模态框
 */
var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');

var EmailTest = React.createClass({
    mixins: [History],
    getInitialState: function () {
        return {

        }
    },
    componentDidMount: function() {

    },
    componentDidUpdate: function() {

    },
    render: function() {
        return (
            <div className="modal fade fullable" id="emailTest" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog assetModalDialog templeteConfig" style={{width:"25%",height:"306px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            Email测试
                        </div>
                        <div className="modal-body" style={{height:"232px"}}>
                            <div className='row'>
                                <div className='row_title'>邮件接收地址（多个邮件以分号隔开）</div>
                                <input id="emailTest-receivers" className="modal-input" type="text" />
                            </div>
                            <div className='row'>
                                <div className='row_title'>邮件内容：</div>
                                <textarea id="emailTest-content" style={{height:"128px"}} className="modal-input" ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" id="emailTest-btn-send" onClick={this._handleOnClick} style={{width:84}}>发送</button>
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
            case "emailTest-btn-send":
                var data = {};
                data.receivers = $("#emailTest-receivers").val();
                data.subject = "";
                data.content = $("#emailTest-content").val();
                this.props.send_email({
                    data: data,
                    callback: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "测试";
                            document.getElementById('publicMessageModalcontent').innerHTML = "发送成功";
                            $('#publicMessageModal').modal('show');
                        },100);
                        $("#emailTest").modal("hide");
                    },
                    error: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "测试";
                            document.getElementById('publicMessageModalcontent').innerHTML = "发送失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                });
            break;
        }
    },
});

module.exports = EmailTest;
