var React = require('react');

var HomePage = require('../homePage');

var TopologyPage = React.createClass({
    render: function() {
        return (
            <HomePage pageId={8000}/>
        );
    }
});
module.exports = {
  TopologyPage:TopologyPage
}
