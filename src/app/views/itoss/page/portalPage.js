/**
 * Created by SHIN on 2015/12/9.
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

//var Sidebar = require('../../component/sidebar');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


//var Store = require('../../../server/store.js');
var Title = React.createClass({
    mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            itoss:flux.store("SampleStore").getState(),
        }
    },
    render: function(){
        return(
            <div className="main-module-title">
                <button id='btn_showHideModules' type='button' className={this.props.bShowModules?'btn btn-success active':'btn btn-success'} onClick={this.onClickShowHide}>
                    新增模块
                </button>
                <button id='btn_saveModules' type='button' className='btn btn-success' style={{"marginLeft":"8px"}} onClick={this.onClickSave}>
                    保存
                </button>
                <div className="title">我的门户</div>
            </div>
        );
    },
    onClickShowHide: function() {
        this.getFlux().actions.SampleActions.setShowHideModules();
    },
    onClickSave: function() {
        //this.props.saveModules();
    },
});

var Header = React.createClass({
    getInitialState: function(){
        return{
            container_id_list:[
                "moduleContainer1",
                "moduleContainer2",
                "moduleContainer3",
                "moduleContainer4",
                "moduleContainer5",
                "moduleContainer6",
                "moduleContainer7",
            ],
            top_container_index: 0,
            moving: false,
        };
    },
    render: function(){
        var left_arrow_active = right_arrow_active = true;
        var dot_active_list = [false,false,false,false,];
        if(this.state.top_container_index<=0){
            left_arrow_active = false;
        }
        if(this.state.top_container_index>=this.state.container_id_list.length-1){
            right_arrow_active = false;
        }
        for(var i=this.state.top_container_index,j=0;j<dot_active_list.length;i++,j++){
            var c = this.state.container_id_list[i];
            if(c){
                dot_active_list[j] = true;
            }
        }
        return(
            <div className="main-module-header">
                <div className="pagination">
                    <div className="pbtn" onClick={this._move_left}>
                        <div className={left_arrow_active?"left-arrow active":"left-arrow"}></div>
                    </div>
                    <div className="pbtn">
                        <div className={dot_active_list[0]?"dot active":"dot"}></div>
                    </div>
                    <div className="pbtn">
                        <div className={dot_active_list[1]?"dot active":"dot"}></div>
                    </div>
                    <div className="pbtn">
                        <div className={dot_active_list[2]?"dot active":"dot"}></div>
                    </div>
                    <div className="pbtn" onClick={this._test}>
                        <div className={dot_active_list[3]?"dot active":"dot"}></div>
                    </div>
                    <div className="pbtn" onClick={this._move_right}>
                        <div className={right_arrow_active?"right-arrow active":"right-arrow"}></div>
                    </div>
                </div>
            </div>
        );
    },
    _move_left: function(){
        var current_index = this.state.top_container_index;
        if(this.state.moving||current_index<=0) return;
        this.setState({
            moving: true
        },(function(){
            this._move(this._get_top_container_width(-1),(function(){
                this.setState({
                    top_container_index: current_index-1,
                    moving: false,
                });
            }).bind(this));
        }).bind(this));
    },
    _move_right: function(){
        var current_index = this.state.top_container_index;
        if(this.state.moving||current_index>=this.state.container_id_list.length-1) return;
        this.setState({
            moving: true
        },(function(){
            this._move(-this._get_top_container_width(0),(function(){
                this.setState({
                    top_container_index: current_index+1,
                    moving: false,
                });
            }).bind(this));
        }).bind(this));
    },
    _get_top_container_width: function(shift){
        return $("#"+this.state.container_id_list[this.state.top_container_index+shift]).width();
    },
    _move: function(len,callback){
        var c = $("#main-module-container");
        var current = c.position().left=="auto"?0:c.position().left;
        c.animate({"left":(current+len)+"px"},250,callback);
        this.setState({
            moving: true
        });
    },
});

var MainModuleContainer = React.createClass({

    getInitialState: function() {
        return {
            datasetCollection: this.props.datasetCollection,
        };
    },
    componentDidMount: function(){
        var container_id_list = [
                "moduleContainer1",
                "moduleContainer2",
                "moduleContainer3",
                "moduleContainer4",
                "moduleContainer5",
                "moduleContainer6",
                "moduleContainer7",
            ];
        this.setState({
            dom_1: document.getElementById(container_id_list[0]).cloneNode(true),
            dom_2: document.getElementById(container_id_list[1]).cloneNode(true),
            dom_3: document.getElementById(container_id_list[2]).cloneNode(true),
            dom_4: document.getElementById(container_id_list[3]).cloneNode(true),
            dom_5: document.getElementById(container_id_list[4]).cloneNode(true),
            dom_6: document.getElementById(container_id_list[5]).cloneNode(true),
            dom_7: document.getElementById(container_id_list[6]).cloneNode(true),
        });
        for(var i=0;i<container_id_list.length;i++){
            var id = container_id_list[i];
            $("#"+id).sortable({
                opacity: 0.5,
                forceHelperSize: true,
                cursor: "move",
                containment: "#main-container-content",
                placeholder: "module-placeholder",
                connectWith: ".modules-container",
                scroll: false,
                start: (function(e,ui){
                    this._container_start(ui);
                }).bind(this),
                over: (function(e,ui){
                    this._container_over(ui);
                }).bind(this),
                sort: (function(e,ui){
                    this._container_sort(ui);
                }).bind(this),
                stop: (function(e,ui){
                    this._container_stop(e,ui,id);
                }).bind(this),
            });
        };
    },
    componentDidUpdate: function(){
    },
    render: function(){
        var _this = this;
        var empty_module_cover_1 = null,
            empty_module_cover_2 = null,
            empty_module_cover_3 = null,
            empty_module_cover_4 = null;
            empty_module_cover_5 = null,
            empty_module_cover_6 = null;
            empty_module_cover_7 = null;
        var modules_list_1 = this.state.datasetCollection.container1.map(function(m,i){
            return(<Widget widgetData={m} _remove={_this._remove} key={i}/>);
        });
        var modules_list_2 = this.state.datasetCollection.container2.map(function(m,i){
            return(<Widget widgetData={m} _remove={_this._remove} key={i}/>);
        });
        var modules_list_3 = this.state.datasetCollection.container3.map(function(m,i){
            return(<Widget widgetData={m} _remove={_this._remove} key={i}/>);
        });
        var modules_list_4 = this.state.datasetCollection.container4.map(function(m,i){
            return(<Widget widgetData={m} _remove={_this._remove} key={i}/>);
        });
        var modules_list_5 = this.state.datasetCollection.container5.map(function(m,i){
            return(<Widget widgetData={m} _remove={_this._remove} key={i}/>);
        });
        var modules_list_6 = this.state.datasetCollection.container6.map(function(m,i){
            return(<Widget widgetData={m} _remove={_this._remove} key={i}/>);
        });
        var modules_list_7 = this.state.datasetCollection.container7.map(function(m,i){
            return(<Widget widgetData={m} _remove={_this._remove} key={i}/>);
        });

        var width_1 = width_2 = width_3 = width_4 = width_5 = width_6 = width_7 = "auto";

        var empty_module_cover = (
            <div className="context">
                <em className="icon glyphicon glyphicon-circle-arrow-down"></em>
                <label className="text">Drag modules to display in this column</label>
            </div>
        );

        if(modules_list_1.length==0){
            empty_module_cover_1 = empty_module_cover;
            width_1 = "10%";
        }
        if(modules_list_2.length==0){
            empty_module_cover_2 = empty_module_cover;
            width_2 = "10%";
        }
        if(modules_list_3.length==0){
            empty_module_cover_3 = empty_module_cover;
            width_3 = "10%";
        }
        if(modules_list_4.length==0){
            empty_module_cover_4 = empty_module_cover;
            width_4 = "10%";
        }
        if(modules_list_5.length==0){
            empty_module_cover_5 = empty_module_cover;
            width_5 = "10%";
        }
        if(modules_list_6.length==0){
            empty_module_cover_6 = empty_module_cover;
            width_6 = "10%";
        }
        if(modules_list_7.length==0){
            empty_module_cover_7 = empty_module_cover;
            width_7 = "10%";
        }
        return(
            <div className="main-module-container" id="main-module-container">
                <div className="ul-module-container">
                    <ul className="modules-container to" id="moduleContainer1" style={{"width":width_1}}>
                        {modules_list_1}
                    </ul>
                    <ul className="modules-container to" id="moduleContainer2" style={{"width":width_2}}>
                        {modules_list_2}
                    </ul>
                    <ul className="modules-container to" id="moduleContainer3" style={{"width":width_3}}>
                        {modules_list_3}
                    </ul>
                    <ul className="modules-container to" id="moduleContainer4" style={{"width":width_4}}>
                        {modules_list_4}
                    </ul>
                    <ul className="modules-container to" id="moduleContainer5" style={{"width":width_5}}>
                        {modules_list_5}
                    </ul>
                    <ul className="modules-container to" id="moduleContainer6" style={{"width":width_6}}>
                        {modules_list_6}
                    </ul>
                    <ul className="modules-container to" id="moduleContainer7" style={{"width":width_7}}>
                        {modules_list_7}
                    </ul>
                </div>
                <div className="empty-column-container">
                    <div className="empty-column" target="moduleContainer1">
                        {empty_module_cover_1}
                    </div>
                    <div className="empty-column" target="moduleContainer2">
                        {empty_module_cover_2}
                    </div>
                    <div className="empty-column" target="moduleContainer3">
                        {empty_module_cover_3}
                    </div>
                    <div className="empty-column" target="moduleContainer4">
                        {empty_module_cover_4}
                    </div>
                    <div className="empty-column" target="moduleContainer5">
                        {empty_module_cover_5}
                    </div>
                    <div className="empty-column" target="moduleContainer6">
                        {empty_module_cover_6}
                    </div>
                    <div className="empty-column" target="moduleContainer7">
                        {empty_module_cover_7}
                    </div>
                </div>
            </div>
        );
    },
    _remove: function(node){
        var ui = {item:$(node)};
        var domid = $(node).parent().attr("id");
        $(node).hide();
        this._update(domid,ui);
    },
    _update: function(domid,ui){
        this.props.update((function(){
            if(this.state.dom_1){
                $("#moduleContainer1").html($(this.state.dom_1).html());
            }
            else{
                $("#moduleContainer1").html("");
            }
            if(this.state.dom_2){
                $("#moduleContainer2").html($(this.state.dom_2).html());
            }
            else{
                $("#moduleContainer2").html("");
            }
            if(this.state.dom_3){
                $("#moduleContainer3").html($(this.state.dom_3).html());
            }
            else{
                $("#moduleContainer3").html("");
            }
            if(this.state.dom_4){
                $("#moduleContainer4").html($(this.state.dom_4).html());
            }
            else{
                $("#moduleContainer4").html("");
            }
            if(this.state.dom_5){
                $("#moduleContainer5").html($(this.state.dom_5).html());
            }
            else{
                $("#moduleContainer5").html("");
            }
            if(this.state.dom_6){
                $("#moduleContainer6").html($(this.state.dom_6).html());
            }
            else{
                $("#moduleContainer6").html("");
            }
            if(this.state.dom_7){
                $("#moduleContainer7").html($(this.state.dom_7).html());
            }
            else{
                $("#moduleContainer7").html("");
            }
            var newDatasetCollection = this.props.datasetCollection;
            this.setState({datasetCollection: newDatasetCollection},(function(){
                if(ui){
                    var pid = ui.item.parent().attr("id");
                    if(pid==domid&&ui.item){
                        ui.item.remove();
                    }
                }
                var _dom_1 = document.getElementById("moduleContainer1").cloneNode(true);
                var _dom_2 = document.getElementById("moduleContainer2").cloneNode(true);
                var _dom_3 = document.getElementById("moduleContainer3").cloneNode(true);
                var _dom_4 = document.getElementById("moduleContainer4").cloneNode(true);
                var _dom_5 = document.getElementById("moduleContainer5").cloneNode(true);
                var _dom_6 = document.getElementById("moduleContainer6").cloneNode(true);
                var _dom_7 = document.getElementById("moduleContainer7").cloneNode(true);
                this.setState({
                    dom_1: _dom_1,
                    dom_2: _dom_2,
                    dom_3: _dom_3,
                    dom_4: _dom_4,
                    dom_5: _dom_5,
                    dom_6: _dom_6,
                    dom_7: _dom_7,
                },(function(){
                    $("#main-module-container .draggable").each(function(){
                        if($(this).hasClass("ui-resizable")){
                            $(this).resizable();
                            $(this).resizable("destroy");
                        }
                        $(this).resizable({
                            maxHeight: 1200,
                            maxWidth: 900,
                            minHeight: 50,
                            minWidth: 80
                        });
                    });
                    $(".empty-column").each(function(){
                        var moduleContainer = $("#"+$(this).attr("target"));
                        $(this).width(moduleContainer.width());
                    })
                }).bind(this));
            }).bind(this));
        }).bind(this));
    },
    _container_start: function(ui){
        ui.placeholder.width(ui.helper.width());
    },
    _container_over: function(ui){
        var item = ui.item;
        var placeholder = ui.placeholder;
        var title = item.attr("data-title"),
            subtitle = item.attr("data-subtitle"),
            content = item.attr("data-content");
        var html = "";
        html+="<div class='header'>";
        html+=  "<div class='title'>"+title+"</div>";
        html+=    "<div class='btn-gear'>";
        html+=      "<button class='glyphicon glyphicon-cog'></button>";
        html+=    "</div>";
        html+=  "</div>";
        html+="</div>";
        html+="<div class='content'>";
        html+=  "<div class='subtitle'>"+subtitle+"</div>";
        html+=  "<div class='data-content'>"+content+"</div>";
        html+="</div>";
        html+="<div class='clearfix'></div>";
        item.html(html);
        placeholder.css("height",item.css("height"));
    },
    _container_sort: function(ui){
        ui.item.height(ui.placeholder.height());
        ui.item.css("display","inline-block");
        $(".modules-container").each(function(){
            $(this).width($(this).children().length>0?"auto":"10%");
        });
        $(".empty-column").each(function(){
            var moduleContainer = $("#"+$(this).attr("target"));
            $(this).width(moduleContainer.width());
        });
    },
    _container_stop: function(e,ui,id){
        e.stopPropagation();
        this._update(id,ui);
    },
});

var Widget = React.createClass({
    getInitialState: function(){
        return {};
    },
    componentDidMount: function(){
        var _this = this;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        var P = $(DOMNode).parent();
        var P_width = P.width();
        var B = DOMNode.find("button");
        var R = $._data(B[0], "events");
        if(!(R&&R["click"])){
            B.click(function(){
                _this._toggleTips($(this).parent());
            });
        }
        $(DOMNode).attr("data-style-width",$(DOMNode).width());
        $(DOMNode).attr("data-style-height",$(DOMNode).height());
        $(DOMNode).resizable({
            maxHeight: 1200,
            maxWidth: 900,
            minHeight: 50,
            minWidth: 80
        });
    },
    componentDidUpdate: function(){
        var _this = this;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        var B = DOMNode.find("button");
        var R = $._data(B[0], "events");
        if(!(R&&R["click"])){
            B.click(function(){
                _this._toggleTips($(this).parent());
            });
        }
        $(DOMNode).attr("data-style-width",$(DOMNode).width());
        $(DOMNode).attr("data-style-height",$(DOMNode).height());

        $(".empty-column").each(function(){
            var moduleContainer = $("#"+$(this).attr("target"));
            $(this).width(moduleContainer.width());
        })
    },
    render: function(){
        var trueHeight = parseInt(this.props.widgetData.style.height) + 3;
        return(
            <li className="draggable"
                data-xid={this.props.widgetData.xid}
                data-title={this.props.widgetData.title}
                data-subtitle={this.props.widgetData.subtitle}
                data-content={this.props.widgetData.content}
                data-style-width={this.props.widgetData.style.width}
                data-style-height={this.props.widgetData.style.height}
                style={{"width":this.props.widgetData.style.width+"px","height":trueHeight+"px"}}
            >
                <div className="header">
                    <div className="title">{this.props.widgetData.title}</div>
                    <div className="btn-gear">
                        <button className="fa fa-cog fa-lg"></button>
                        <div className="tip" style={{"display":"none"}}>
                            <em></em><span></span>
                            <div className="btn btn-tip" onClick={this._setting}>Setting</div>
                            <div className="btn btn-tip" onClick={this._remove}>Remove</div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="subtitle">{this.props.widgetData.subtitle}</div>
                    <div className="data-content">{this.props.widgetData.content}</div>
                </div>
                <div className="clearfix"></div>
            </li>
        );
    },
    _remove: function(){
        this.props._remove(ReactDOM.findDOMNode(this));
    },
    _setting: function(){
        var _this = this;
        var DOMNode = $(ReactDOM.findDOMNode(this));
        $(".tip").hide();
        $(".tip").slideUp("fast");
        $("#pop-dialog-input-width").val($(DOMNode).width());
        $("#pop-dialog-input-height").val($(DOMNode).height());
        $("#module-config-dialog").dialog({
            draggable: true,
            resizable: false,
            width: 300,
            modal: true,
            title: this.props.widgetData.title,
            dialogClass: "pop-dialog",
            position: { my: "center", at: "top+33%", of: window },
            buttons:{
                "Save": function() {
                    var newWidth = parseFloat($("#pop-dialog-input-width").val());
                    var newHeight = parseFloat($("#pop-dialog-input-height").val());
                    var minWdith = parseFloat($("#pop-dialog-input-width").attr("min"));
                    var maxWdith = parseFloat($("#pop-dialog-input-width").attr("max"));
                    var minHeight = parseFloat($("#pop-dialog-input-height").attr("min"));
                    var maxHeight = parseFloat($("#pop-dialog-input-height").attr("max"));

                    var valid = !(newWidth<minWdith||newWidth>maxWdith||newHeight<minHeight||newHeight>maxHeight);
                    if(valid){
                        $(DOMNode).animate({"width":newWidth,"height":newHeight},100,function(){
                            $(".modules-container").each(function(){
                                $(this).width($(this).children().length>0?"auto":"10%");
                            });
                            $(".empty-column").each(function(){
                                var moduleContainer = $("#"+$(this).attr("target"));
                                $(this).width(moduleContainer.width());
                            });
                        });
                        $(DOMNode).attr("data-style-width",newWidth);
                        $(DOMNode).attr("data-style-height",newHeight);
                        $(this).dialog( "close" );
                    }
                    else{
                        alert("Invalid values");
                    }
                },
                Cancel: function() {
                    $(this).dialog( "close" );
                }
            },
        });
    },
    _toggleTips: function(elm){
        var tip = elm.find(".tip");
        if((tip.css("display")=="none")){
            $(".tip").hide();
            $(".tip").slideUp("fast");
        }
        tip.slideToggle("fast");
    },
});

var Dialog = React.createClass({
    render: function(){
        return(
            <form className="pop-dialog" id="module-config-dialog" style={{"display":"none"}}>
                <div className="row">
                    <label>Wdith:</label><input id="pop-dialog-input-width" type="number" min="80" max="900"/>px
                </div>
                <div className="row">
                    <label>Height:</label><input id="pop-dialog-input-height" type="number" min="50" max="1200"/>px
                </div>
                <hr className="divider"/>
            </form>
        );
    },
});

var PortalPage = React.createClass({
    mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    getStateFromFlux: function() {
        var flux = this.getFlux();
        return {
            itoss:flux.store("SampleStore").getState(),
        }
    },
    render: function() {
        var _this = this;
        return (
            <div id="main-container-content" style={{"height":"100%","overflowX":"hidden","minWidth":"200px"}}>
                <Title bShowModules={this.state.itoss.bShowModules} saveModules={this.props.saveModules} />
                <div className="clearfix"></div>
                <Header />
                <hr className="divider"/>
                <MainModuleContainer datasetCollection={this.props.datasetCollection} update={this.props.update}/>
                <Dialog />
            </div>
        );
    },
});

module.exports = PortalPage;
