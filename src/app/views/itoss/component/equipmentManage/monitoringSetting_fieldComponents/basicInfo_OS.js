require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');

var osData = [
    {id:'0', name:'AIX'},
    {id:'1', name:'FreeBSD'},
    {id:'2', name:'HP/UX'},
    {id:'3', name:'HP/UX 64-bit'},
    {id:'4', name:'Linux'},
    {id:'5', name:'MacOSX'},
    {id:'6', name:'OPENSERVER'},
    {id:'7', name:'Red Hat Enterprise Linux'},
    {id:'8', name:'SCO'},
    {id:'9', name:'SGI Irix'}
];

var BasicInfo_OS = React.createClass({
    render:function(){
        return(
            <div className={'contentTabDiv col-md-3 ' + (this.props.paddingLeft?'ContentTabRightDiv':'')} >
                <p className="help-block">操作系统{this.props.required?<span style={{color: "red"}}>*</span>:''}&nbsp;&nbsp;<i title ="操作系统" className="fa fa-question-circle fa-lg"></i></p>
                <ReactWidgets.DropdownList className='form-control dropdownStyle dropdowngroup col-md-12' data={osData} defaultValue={osData[0]} textField='name'/>
            </div>
        );
    }
});

module.exports = BasicInfo_OS;
