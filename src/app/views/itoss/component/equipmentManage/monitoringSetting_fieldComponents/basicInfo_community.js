require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BasicInfo_community = React.createClass({
    render:function(){
        return(
            <div className={'contentTabDiv col-md-3 ' + (this.props.paddingLeft?'ContentTabRightDiv':'')} >
                <p className="help-block">共同体{this.props.required?<span style={{color: "red"}}>*</span>:''}&nbsp;&nbsp;<i title ="共同体" className="fa fa-question-circle fa-lg"></i></p>
                <input type="password" className="input-xlarge col-md-12" />
            </div>
        );
    }
});

module.exports = BasicInfo_community;
