require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BasicInfo_password = React.createClass({
    render:function(){
        return(
            <div className={'contentTabDiv col-md-3 ' + (this.props.paddingLeft?'ContentTabRightDiv':'')} >
                <p className="help-block">密码{this.props.required?<span style={{color: "red"}}>*</span>:''}&nbsp;&nbsp;<i title ="密码" className="fa fa-question-circle fa-lg"></i></p>
                <input type="password" className="input-xlarge col-md-12" disabled={true}/>
            </div>
        );
    }
});

module.exports = BasicInfo_password;
