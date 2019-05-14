require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');

var algorithmData = [
    {id:'0', name:'MD5'},
    {id:'1', name:'other'}
];

var BasicInfo_verificationAlgorithm = React.createClass({
    render:function(){
        return(
            <div className={'contentTabDiv col-md-3 ' + (this.props.paddingLeft?'ContentTabRightDiv':'')} >
                <p className="help-block">验证算法{this.props.required?<span style={{color: "red"}}>*</span>:''}&nbsp;&nbsp;<i title ="验证算法" className="fa fa-question-circle fa-lg"></i></p>
                <ReactWidgets.DropdownList className='form-control dropdownStyle dropdowngroup col-md-12' data={algorithmData} defaultValue={algorithmData[0]} textField='name' disabled={true}/>
            </div>
        );
    }
});

module.exports = BasicInfo_verificationAlgorithm;
