/**
* 资源监测-仪表板中心
*/

require('bootstrap');
import React from 'react'
var ReactRouter = require('react-router');

$(window).resize(function(){
  var height = $(window).height();
  height = height-140;
  $(".dashboardBasic").css("height",height+"px");
});

var DashboardView = React.createClass({
    componentDidMount: function() {
      var height = $(window).height();
      height = height-140;
      $(".dashboardBasic").css("height",height+"px");
      // document.getElementById('overview').className = 'list-group-item active';
    },
    render: function() {
        return (
            <div className="dashboardBasic">
              <iframe frameBorder="0" style={{width:"100%",height:"100%"}} src="/grafana/" ></iframe>
            </div>
        );
    }
});

module.exports = DashboardView;
