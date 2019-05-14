/**
* Created by Yuchen  2016/02/18.
* 资产维保
*/

require('bootstrap');
import React from 'react'
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var History = ReactRouter.History;

var AssetMaintain_desView_static = React.createClass({
    mixins: [History],
    componentDidMount: function(){
    },
    render: function() {
        return (
            <div className="staticDiv col-md-12">
                <div className="staticLeftDiv">
                    <div className='remarkDiv2'>
                        <span>资产维保的功能：查看组织资产库中资产维保记录，并可以按资产名称、设备类型、区域、搜索资产记录中的相关信息来查询查看组织资产库中资产维保记录。</span>
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = AssetMaintain_desView_static;
