/**
 * Created by SHIN on 2016/1/25.
 */
require('bootstrap');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

// var SideBar = require('../../component/sidebar');
var HomePage = require('../homePage');
// var PortalPage = require('../portalPage');

var AlarmEventPage = React.createClass({
    // getInitialState: function(){
    //     return{//@MODIFY
    //         originDataset : [
    //             {"xid":"1","title":"Account Balances","subtitle":"Balances at a glance","content":"Cash & cash alt.",
    //                 "style":{"width":"160","height":"120"}},
    //             {"xid":"2","title":"RSS Reader","subtitle":"Any feed you like - you choose","content":"Dow Jones Industrials.",
    //                 "style":{"width":"160","height":"120"}},
    //             {"xid":"3","title":"Stock Events","subtitle":"Your fingers on the pulse of the market","content":"U.S. Day Ahead: Retail sales,consumer sentiment in focus.",
    //                 "style":{"width":"300","height":"150"}},
    //             {"xid":"4","title":"Streaming News1","subtitle":"Market news the way you want it","content":"There are no positions to display for this account.",
    //                 "style":{"width":"300","height":"150"}},
    //             {"xid":"5","title":"aaaa","subtitle":"bbbb","content":"cccccccccccwrd.",
    //                 "style":{"width":"160","height":"80"}},
    //         ],
    //         newDatasetCollection : {
    //             container1 : [],
    //             container2 : [],
    //             container3 : [],
    //             container4 : [],
    //             container5 : [],
    //             container6 : [],
    //             container7 : []
    //         }
    //     }
    // },
    render: function() {
        return (
            //<div>
            //    <SideBar flux={this.props.flux}
            //             mainContent = {<HomePage flux={this.props.flux} dataset={this.state.originDataset} update={this.update} pageId={52}/>}
            //             sidebarContent = {<PortalPage flux={this.props.flux} datasetCollection={this.state.newDatasetCollection} update={this.update}/>}>
            //    </SideBar>
            //</div>
            <HomePage flux={this.props.flux} pageId={56}/>
        );
    },
    // update: function(callback){
    //     var newC1Data = [];
    //     var newC2Data = [];
    //     var newC3Data = [];
    //     var newC4Data = [];
    //     var newC5Data = [];
    //     var newC6Data = [];
    //     var newC7Data = [];
    //     var newDatasetCollection;
    //     var getBrickData = function(o){
    //         return {
    //             "xid":o.attr("data-xid"),"title":o.attr("data-title"),"subtitle":o.attr("data-subtitle"),"content":o.attr("data-content"),
    //             "style":{
    //                 "width":o.width(),"height":o.height()
    //             }
    //         };
    //     }
    //     $("#moduleContainer1 .draggable").each(function(i){
    //         if($(this).css("visibility")=="hidden"||$(this).css("display")=="none") return;
    //         newC1Data.push(getBrickData($(this)));
    //     });
    //     $("#moduleContainer2 .draggable").each(function(i){
    //         if($(this).css("visibility")=="hidden"||$(this).css("display")=="none") return;
    //         newC2Data.push(getBrickData($(this)));
    //     });
    //     $("#moduleContainer3 .draggable").each(function(i){
    //         if($(this).css("visibility")=="hidden"||$(this).css("display")=="none") return;
    //         newC3Data.push(getBrickData($(this)));
    //     });
    //     $("#moduleContainer4 .draggable").each(function(i){
    //         if($(this).css("visibility")=="hidden"||$(this).css("display")=="none") return;
    //         newC4Data.push(getBrickData($(this)));
    //     });
    //     $("#moduleContainer5 .draggable").each(function(i){
    //         if($(this).css("visibility")=="hidden"||$(this).css("display")=="none") return;
    //         newC5Data.push(getBrickData($(this)));
    //     });
    //     $("#moduleContainer6 .draggable").each(function(i){
    //         if($(this).css("visibility")=="hidden"||$(this).css("display")=="none") return;
    //         newC6Data.push(getBrickData($(this)));
    //     });
    //     $("#moduleContainer7 .draggable").each(function(i){
    //         if($(this).css("visibility")=="hidden"||$(this).css("display")=="none") return;
    //         newC7Data.push(getBrickData($(this)));
    //     });
    //
    //     newDatasetCollection = {
    //         container1: newC1Data,
    //         container2: newC2Data,
    //         container3: newC3Data,
    //         container4: newC4Data,
    //         container5: newC5Data,
    //         container6: newC6Data,
    //         container7: newC7Data
    //     };
    //     if(callback){
    //         this.setState({
    //             newDatasetCollection: newDatasetCollection
    //         },callback);
    //     }
    //     else{
    //         this.setState({
    //             newDatasetCollection: newDatasetCollection
    //         });
    //     }
    //     return newDatasetCollection;
    // }
});

module.exports = AlarmEventPage;
