require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BasicInfo_databaseIP = React.createClass({
    render:function(){
        return(
            <div className={'contentTabDiv col-md-3 ' + (this.props.paddingLeft?'ContentTabRightDiv':'')} >
                <p className="help-block">数据库IP{this.props.required?<span style={{color: "red"}}>*</span>:''}&nbsp;&nbsp;<i title ="数据库IP" className="fa fa-question-circle fa-lg"></i></p>
                <input type="text" className="input-xlarge col-md-12" />
            </div>
        );
    }
});

module.exports = BasicInfo_databaseIP;
