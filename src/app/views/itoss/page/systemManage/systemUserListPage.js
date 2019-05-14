/**
 * Created by SHIN on 2016/1/21.
 */
require('bootstrap');

var React = require('react');

var HomePage = require('../homePage');

var UserListPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={700}/>
        );
    },
});

module.exports = UserListPage;
