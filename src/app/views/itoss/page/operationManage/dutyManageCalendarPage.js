/**
 * Created by xuexue.yin  on 2016/02/29.
 * 值班管理-值班日历
 */

 require('bootstrap');

 var React = require('react');

 var HomePage = require('../homePage');

 var DutyManageCalendarPage = React.createClass({
     render: function() {
         return (
             <HomePage pageId={85}/>
         );
     }
 });

 module.exports = DutyManageCalendarPage;
