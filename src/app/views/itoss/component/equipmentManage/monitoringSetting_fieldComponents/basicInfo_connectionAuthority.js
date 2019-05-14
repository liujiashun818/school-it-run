require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');

var authorityData = [
    {id:'0', name:'password'},
    {id:'1', name:'keyfile'}
];

var BasicInfo_connectionAuthority = React.createClass({
    render:function(){
        return(
            <div className={'contentTabDiv col-md-3 ' + (this.props.paddingLeft?'ContentTabRightDiv':'')} >
                <p className="help-block">连接权限{this.props.required?<span style={{color: "red"}}>*</span>:''}&nbsp;&nbsp;<i title ="连接权限" className="fa fa-question-circle fa-lg"></i></p>
                <ReactWidgets.DropdownList className='form-control dropdownStyle dropdowngroup col-md-12' data={authorityData} defaultValue={authorityData[0]} textField='name'/>
            </div>
        );
    }
});

module.exports = BasicInfo_connectionAuthority;
