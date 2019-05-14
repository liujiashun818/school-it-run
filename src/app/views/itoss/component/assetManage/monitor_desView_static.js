/**
* Created by Yuchen  2016/01/15.
* 资产监控同步
*/

require('bootstrap');
import React from 'react'

var Monitor_desView_static = React.createClass({
    render: function() {
        return (
            <div className="staticDiv col-md-12">
                <div className="staticLeftDiv">
                    <div className='remarkDiv2'>
                        <span>监控同步的功能：查看被监测的资源未入资产库的记录，可批量绑定监控来新增批量资源记录入资产库，或者全部绑定来新增全部资源记录入资产库。</span>
                    </div>
                    <div className='btnGroupDiv2' id="btn-btnGroup">
                        <button type="button" id="btn-bind" className="btn btn-success btnNormal" onClick={this.props.handleClickEvent} >绑定监控</button>
                        <button type="button" id="btn-bindall" className="btn btn-success btnNormal" onClick={this.props.handleClickEvent} >全部绑定</button>
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = Monitor_desView_static;
