/**
 * Created zxn
    知识库管理
 */
require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var HomePage = require('../homePage');

var RepositoryList = React.createClass({
    render: function() {
        return (
            <HomePage pageId={95}/>
        );
    }
});
var RepositoryAdd = React.createClass({
    render: function() {
        return (
            <HomePage pageId={96}/>
        );
    }
});
var RepositoryApproval = React.createClass({
    render: function() {
        return (
            <HomePage pageId={97}/>
        );
    }
});
var RepositoryDetails = React.createClass({
    render: function() {
        return (
            <HomePage pageId={98}/>
        );
    }
});
var RepositoryListDetails = React.createClass({
    render: function() {
        return (
            <HomePage pageId={99}/>
        );
    }
});

module.exports = {
  RepositoryList:RepositoryList,
  RepositoryAdd:RepositoryAdd,
  RepositoryApproval:RepositoryApproval,
  RepositoryDetails:RepositoryDetails,
  RepositoryListDetails:RepositoryListDetails
};
