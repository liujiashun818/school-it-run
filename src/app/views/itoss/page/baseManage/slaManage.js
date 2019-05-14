/**
 * Created zxn
    服务级别协议管理
 */
var React = require('react');
var HomePage = require('../homePage');
var SlaList = React.createClass({
    componentDidMount:function(){

    },
    render: function() {
        return (
            <HomePage pageId={900}/>
        );
    }
});
var SlaAdd = React.createClass({
    render: function() {
        return (
            <HomePage pageId={901}/>
        );
    }
});
var SlaDetails = React.createClass({
    render: function() {
        return (
            <HomePage pageId={902}/>
        );
    }
});
module.exports = {
  SlaList:SlaList,
  SlaAdd:SlaAdd,
  SlaDetails:SlaDetails
};
