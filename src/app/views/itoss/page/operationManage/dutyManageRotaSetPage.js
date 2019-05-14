/**
 * Created by xuexue.yin  on 2016/02/29.
 * 值班管理-值班表设置
 */

 require('bootstrap');

 var React = require('react');

 var HomePage = require('../homePage');

 var DutyManageRotaSetPage = React.createClass({
     render: function() {
         return (
             <HomePage pageId={86}/>
         );
     }
 });

 module.exports = DutyManageRotaSetPage;
