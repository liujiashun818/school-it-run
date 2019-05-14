var React = require('react');
var ReactWidgets = require('react-widgets');

import FlowDesignPanel from '../../flowDesign/flowdesignpanel.js';

var FlowDesignEdit = React.createClass ({
  selectitem :function(tag,name,data1){
  },
  componentDidMount: function() {
  },
  render :function() {
       var statedata=[];
       var BOdata = [];
       var resultdata = [];
       var tempresultdata  = [];
       try {
         var data = this.props.flowDesignPicData;
         if(!data){
           return <div></div>;
         }
         statedata = eval(data.STATUS);
         BOdata = eval(data.ROLES);
         if (data.DETAILS) {
            resultdata=eval(data.DETAILS);
         }
         console.log(data);
       } catch (e) {
       } finally {
       }
       if(typeof(BOdata) == "undefined"){
         statedata=[];
         BOdata =[];
         resultdata=[];
       }
       if(typeof(resultdata) == "undefined"){
         resultdata=[];
       }
       var flowv ="graph LR;";
       var flowname =this.props.flowName;
       var isokedit = this.props.isEdit1;
       return <div><FlowDesignPanel Flowv={flowv} Statedata={statedata} Businessobjects={BOdata} Resultdata={resultdata} flowName={flowname} isOkEdit={isokedit} selectitem={this.selectitem}/> </div>;
     }
});

module.exports = FlowDesignEdit;
