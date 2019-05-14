var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var TokenInfoModal = React.createClass({
    _handleOnClickOK: function() {
      window.location.href = '#';
    },
    render : function(){
        return (
            <div className="modal fade" id="tokenInfoModal" tabIndex="-1" role="dialog" aria-labelledby="tokenInfoModalLabel" aria-hidden="true">
                <div className="modal-dialog fieldSettingModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">提示</h5>
                        </div>
                        <div className="modal-body"><p id="tokeninfocontent">内容</p></div>
                        <div className="modal-footer">
                            <button type="button" className="btn modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickOK}>关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TokenInfoModal;
