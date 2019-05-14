/**
 * Created by Yuchen on 2016/01/21.
* 角色与权限管理页
*/

var React = require('react');
require('bootstrap');

var HomePage = require('../homePage');

var SystemRoleManageView = React.createClass({
    render: function() {
        return (
            <HomePage pageId={851}/>
        );
    },
});

module.exports = SystemRoleManageView;
