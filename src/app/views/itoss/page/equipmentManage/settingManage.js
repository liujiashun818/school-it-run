/**
* 资源监测-设置 路由地址管理页
*
*/
require('bootstrap');
var React = require('react');
var HomePage = require('../homePage');

var TemplateSet = React.createClass({
    render: function() {
        return (
            <HomePage pageId={60}/>
        );
    }
});

var MonitorSet = React.createClass({
    render: function() {
        return (
            <HomePage pageId={61}/>
        );
    }
});

var ResourceSet = React.createClass({
    render: function() {
        return (
            <HomePage pageId={62}/>
        );
    }
});

module.exports = {
  TemplateSet:TemplateSet,
  MonitorSet:MonitorSet,
  ResourceSet:ResourceSet
};
