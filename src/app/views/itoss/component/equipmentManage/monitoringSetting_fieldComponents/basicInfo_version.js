require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');

var versionData = [
    {id:'0', name:'V1'},
    {id:'1', name:'V2'},
    {id:'2', name:'V3'}
];

var BasicInfo_version = React.createClass({
    render:function(){
        return(
            <div className={'contentTabDiv col-md-3 ' + (this.props.paddingLeft?'ContentTabRightDiv':'')} >
                <p className="help-block">版本{this.props.required?<span style={{color: "red"}}>*</span>:''}&nbsp;&nbsp;<i title ="版本" className="fa fa-question-circle fa-lg"></i></p>
                <ReactWidgets.DropdownList className='form-control dropdownStyle dropdowngroup col-md-12' data={versionData} defaultValue={versionData[0]} textField='name'/>
            </div>
        );
    }
});

module.exports = BasicInfo_version;
