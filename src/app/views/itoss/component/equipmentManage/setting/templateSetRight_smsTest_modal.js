/**
 * Created by Yuchen on 2016/03/17.
 * 模板设置-发送短信测试模态框
 */
var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');

var SMSTest = React.createClass({
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
            <div className="modal fade fullable" id="smsTest" tabIndex="-1" role="dialog" aria-labelledby="filtrationFieldModalLabel" aria-hidden="true">
                <div className="modal-dialog assetTableModalDialog assetModalDialog templeteConfig" style={{width:"25%",height:"306px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            Email测试
                        </div>
                        <div className="modal-body" style={{height:"232px"}}>
                            <div className='row'>
                                <div className='row_title'>电话号码</div>
                                <input id="smsTest-receivers" className="modal-input" type="text" />
                            </div>
                            <div className='row'>
                                <div className='row_title'>邮件内容：</div>
                                <textarea id="smsTest-content" style={{height:"128px"}} className="modal-input" ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default btn-sm modalFootBtn" id="smsTest-btn-send" onClick={this._handleOnClick} style={{width:84}}>发送</button>
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
            case "smsTest-btn-send":
                var data = {};
                data.receiver = $("#smsTest-receivers").val();
                data.content = $("#smsTest-content").val();
                this.props.send_sms({
                    data: data,
                    callback: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                            document.getElementById('publicMessageModalcontent').innerHTML = "发送成功";
                            $('#publicMessageModal').modal('show');
                        },100);
                        $("#smsTest").modal("hide");
                    },
                    error: function(resp){
                        setTimeout(function(){
                            document.getElementById('publicMessageModelTitle').innerHTML = "模板";
                            document.getElementById('publicMessageModalcontent').innerHTML = "发送失败";
                            $('#publicMessageModal').modal('show');
                        },100);
                    },
                });
            break;
        }
    },
});

module.exports = SMSTest;
