/**
 * Created zxn
    发布管理
 */
var React = require('react');
var HomePage = require('../homePage');

var NoticeList = React.createClass({
    render: function() {
        return (
            <HomePage pageId={90}/>
        );
    }
});
var NoticeInfo = React.createClass({
    render: function() {
        return (
            <HomePage pageId={91}/>
        );
    }
});
var NoticeApproval = React.createClass({
    render: function() {
        return (
            <HomePage pageId={92}/>
        );
    }
});
var NoticeHistoryList = React.createClass({
    render: function() {
        return (
            <HomePage  pageId={93}/>
        );
    }
});
var NoticeSubmitList = React.createClass({
    render: function() {
        return (
            <HomePage pageId={94}/>
        );
    }
});
var NoticeSubmitDetails = React.createClass({
    render: function() {
        return (
            <HomePage pageId={940}/>
        );
    }
});
var NoticeListDetails = React.createClass({
    render: function() {
        return (
            <HomePage pageId={941}/>
        );
    }
});
var NoticeHistoryListDetails = React.createClass({
    render: function() {
        return (
            <HomePage pageId={942}/>
        );
    }
});
var NoticeApprovalDetails = React.createClass({
    render: function() {
        return (
            <HomePage pageId={943}/>
        );
    }
});


module.exports = {
  NoticeList:NoticeList,
  NoticeInfo:NoticeInfo,
  NoticeApproval:NoticeApproval,
  NoticeHistoryList:NoticeHistoryList,
  NoticeSubmitList:NoticeSubmitList,
  NoticeSubmitDetails:NoticeSubmitDetails,
  NoticeListDetails:NoticeListDetails,
  NoticeApprovalDetails:NoticeApprovalDetails,
  NoticeHistoryListDetails:NoticeHistoryListDetails
};
