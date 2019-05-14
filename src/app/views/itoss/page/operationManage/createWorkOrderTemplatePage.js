/**
 * Created by  on 2016/01/20.
 * 创建工单模版页
 */

 require('bootstrap');

 var React = require('react');
 var HomePage = require('../homePage');

 var CreateWorkOrderTemplatePage = React.createClass({
     render: function() {
         return (
             <HomePage pageId={88}/>
         );
     }
 });

 module.exports = CreateWorkOrderTemplatePage;
