/**
 * Created by  on 2016/01/20.
 * 流程设计主页
 */

 require('bootstrap');

 var React = require('react');
 var HomePage = require('../homePage');

 var FlowDesignPage = React.createClass({
     render: function() {
         return (
             <HomePage pageId={83}/>
         );
     }
 });

 module.exports = FlowDesignPage;
