/**
 * Created by  on 2016/01/20.
 * 工单模版列表页
 */

 require('bootstrap');

 var React = require('react');
 var HomePage = require('../homePage');

 var WorkOrderTemplateListPage = React.createClass({
     render: function() {
         return (
             <HomePage pageId={87}/>
         );
     }
 });

 module.exports = WorkOrderTemplateListPage;
