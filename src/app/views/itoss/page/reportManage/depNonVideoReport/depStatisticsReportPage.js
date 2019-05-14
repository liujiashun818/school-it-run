/**
 * Created by ZXN on 2016/2/19.
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../../homePage');

var DVRStatisticsReportPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={4000}/>
        );
    }
});

var NVRStatisticsReportPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={4001}/>
        );
    }
});

var encoderStatisticsReportPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={4002}/>
        );
    }
});

var serverStatisticsReportPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={4003}/>
        );
    }
});

var networkStatisticsReportPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={4004}/>
        );
    }
});

var firewallStatisticsReportPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={4005}/>
        );
    }
});

var databaseStatisticsReportPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={4006}/>
        );
    }
});

module.exports = {
  DVRStatisticsReportPage:DVRStatisticsReportPage,
  NVRStatisticsReportPage:NVRStatisticsReportPage,
  EncoderStatisticsReportPage:encoderStatisticsReportPage,
  ServerStatisticsReportPage:serverStatisticsReportPage,
  NetworkStatisticsReportPage:networkStatisticsReportPage,
  FirewallStatisticsReportPage:firewallStatisticsReportPage,
  DatabaseStatisticsReportPage:databaseStatisticsReportPage
};
