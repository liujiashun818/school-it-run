require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BasicInfo_userName = React.createClass({
    render:function(){
        return(
            <div className={'contentTabDiv col-md-3 ' + (this.props.paddingLeft?'ContentTabRightDiv':'')} >
                <p className="help-block">用户名{this.props.required?<span style={{color: "red"}}>*</span>:''}&nbsp;&nbsp;<i title ="用户名" className="fa fa-question-circle fa-lg"></i></p>
                <input type="text" className="input-xlarge col-md-12" disabled={true}/>
            </div>
        );
    }
});

module.exports = BasicInfo_userName;
