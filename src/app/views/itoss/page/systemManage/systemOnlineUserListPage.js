require('bootstrap');

var React = require('react');

var HomePage = require('../homePage');

var OnLineUserListPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={702}/>
        );
    }
});

module.exports = OnLineUserListPage;
