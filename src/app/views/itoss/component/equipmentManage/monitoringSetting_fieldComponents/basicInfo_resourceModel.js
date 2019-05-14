require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');

var modelData = [
    {id:'0', name:'other'},
    {id:'1', name:'3COM'},
    {id:'2', name:'CoreBuilder-9400'}
];

var BasicInfo_resourceModel = React.createClass({
    render:function(){
        return(
            <div className={'contentTabDiv col-md-6 ' + (this.props.paddingLeft?'ContentTabRightDiv':'')} >
                <p className="help-block">资源型号{this.props.required?<span style={{color: "red"}}>*</span>:''}&nbsp;&nbsp;<i title ="资源型号" className="fa fa-question-circle fa-lg"></i></p>
                <ReactWidgets.DropdownList className='form-control dropdownStyle dropdowngroup col-md-9' data={modelData} defaultValue={modelData[0]} textField='name'/>
                <button type="button" className="btn btn-default btnGetModel col-md-3">获取型号</button>
            </div>
        );
    }
});

module.exports = BasicInfo_resourceModel;
