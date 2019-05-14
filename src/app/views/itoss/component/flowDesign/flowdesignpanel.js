/*******************************************
 *date: 2016/1/15
 *auther: bin.liu
 *MaidFlowDesign
 *流程设计控件
 *  lib/smil.user.js 文件是用来处理d3.js 跟IE浏览器 兼容的问题
 *******************************************/

import React from 'react'
 var ReactWidgets = require('react-widgets');
 var ReactRouter = require('react-router');

 var Store = require('../../../../server/store');
 var base64 = require('../../../../utils/base64.js');

 import { connect } from 'react-redux'
 import * as flowDesignAction from '../../../../actions/flowdesign_action'

var FlowDesignPanel = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },
  updatemenu: function() {
    var that = this;
    // var flux = this.props.flux;
    var businessobjects = this.props.Businessobjects;
    var mddname = this.Mddname;
    var name = "";
    var boid = "";
    var astyle = " "
    var mmddname ='main' + mddname;
    var strMenuHTML = "<ul>";
    try {
      businessobjects.map(function(obj, index) {
        name = obj.name;
        boid = obj.boid;
        //that.imagesdata[name] = obj;
      //  console.log(that.imagesdata[name]);
        //list-style-position:inside;
        strMenuHTML += "<li class='menuItem' name=" + name + " doAction=" + boid + " style='background: #FFF url(img/flows/bg.gif) repeat-x 0 2px;list-style:url(img/flows/arrow.gif); margin: 0; padding: 0;cursor:pointer;' >" + " <a style='font: normal 12px Arial;  border-top: 1px solid #ccc;display: block;color: black;text-decoration: none;line-height:26px;padding-left:26px;cursor:pointer; '><span>";
        strMenuHTML += name + "</span></a></li>";
      });
      // name = "保存";
      //
      // strMenuHTML += "<li class='menuItem' name=" + name + " doAction=" + boid + " style='background: #FFF url(img/flows/bg.gif) repeat-x 0 2px;list-style:url(img/flows/arrow.gif);list-style-position:inside;  margin: 0; padding: 0;cursor:pointer;' >" + " <a  style='font: normal 12px Arial;  border-top: 1px solid #ccc;display: block;color: black;text-decoration: none;line-height:26px;padding-left:26px;cursor:pointer; '><span>";
      // strMenuHTML += name + "</span></a></li>";
      name = "撤销上一步";

      strMenuHTML += "<li class='menuItem' name=" + name + " doAction=" + boid + " style='background: #FFF url(img/flows/bg.gif) repeat-x 0 2px;list-style:url(img/flows/arrow.gif);margin: 0; padding: 0;cursor:pointer;' >" + " <a  style='font: normal 12px Arial;  border-top: 1px solid #ccc;display: block;color: black;text-decoration: none;line-height:26px;padding-left:26px; cursor:pointer;'><span>";
      strMenuHTML += name + "</span></a></li>";
      name = "清除当前流程";

      strMenuHTML += "<li class='menuItem' name=" + name + " doAction=" + boid + " style='background: #FFF url(img/flows/bg.gif) repeat-x 0 2px;list-style:url(img/flows/arrow.gif); margin: 0; padding: 0;cursor:pointer;' >" + " <a  style='font: normal 12px Arial;  border-top: 1px solid #ccc;display: block;color: black;text-decoration: none;line-height:26px;padding-left:26px;cursor:pointer; '><span>";
      strMenuHTML += name + "</span></a></li>";
      strMenuHTML += "</ul>";


      d3.select('.mainmenu' + mddname).style('visibility', 'visible')
        .html(strMenuHTML);

      d3.select('.main' + mddname).style('display', 'none');

      var times = 0;
      d3.select('.mainmenu' + mddname).selectAll(".menuItem").on("click", function(d, i) {
        var mitem = d3.select(this);
        var name = mitem.attr("name");
      //  var busobj = that.imagesdata[name];
        if (name == '清除当前流程') {
          console.log("clean");
          that.setFlowv("graph LR;");
          that.resultdata = [];
          d3.select('.main' + mddname).style.display = 'none';
          if(that.subdiv){
            that.subdiv.style('display','none');
            // that.subdiv.style.display = 'none';
          }
          //flux.actions.YFTFlowDesignActions.clear_flowDesignResultData_flow();
          that.props.dispatch(flowDesignAction.clear_flowDesignResultData_flow());
        } else if (name == '保存') {
          //that.handleClick('save', that.Flowv);
          that.handleClick('result',that.flowName,that.resultdata);
          d3.select('.main' + mddname).style.display = 'none';;
        } else if (name == '撤销上一步') {
          var txt1 = that.Flowv;
          if (txt1.length > 10) {
            var txt2 = txt1.substr(0, txt1.length - 1);
            txt2 = txt2.substr(0, txt2.lastIndexOf(";") + 1);
            that.setFlowv(txt2);
            that.resultdata.pop();
            if(that.maindiv){
              that.maindiv.style('display','none');
              // that.subdiv.style.display = 'none';
            }
            //flux.actions.YFTFlowDesignActions.set_flowDesignResultData_flow(that.resultdata);
            that.props.dispatch(flowDesignAction.set_flowDesignResultData_flow(that.resultdata));
          }
        } else {
          console.log("ddd1");
          if (that.Flowv) {
            var txt1 = name + ";";
            if (that.Flowv.indexOf(";"+txt1) < 0)
              that.setFlowv(that.Flowv + txt1);
          } else {
            that.setFlowv("graph LR;" + name + ";");
          }
        }
        //console.log('busobj');
        //console.log(busobj);
        //console.log("hhhhh1");
        that.lastname = name;
        try {
          //console.log(that.maindiv);
          if(that.maindiv){
            that.maindiv.style('display','none');
            // that.maindiv.style.display = 'none';
          }
        } catch (e) {
        console.log("hide mainmenu fail!");
        } finally { }

        //d3.select('.main' + mddname).style('display', 'none');
        //var kk='main' + mddname;
        //console.log(that.refs.kk.getDOMNode());
        //  console.log(d3.select('.main' + mddname));
      });
    } catch (e) {
      //console.log(e);
      //alert("业务对象数据格式错误！");
      $.showPublicDialog("系统提示","业务对象数据格式错误。");
    } finally {

    }
  },
  updatesubmenu: function() {
    var that = this;
    //var flux = this.props.flux;
    var businessobjects = this.props.Businessobjects;
    var mddname = this.Mddname;
    var name = "";
    var boid = "";
    var strMenuHTML = "<ul>";
    try {
      businessobjects.map(function(obj, index) {
        name = obj.name;
        boid = obj.boid;
        strMenuHTML += "<li class='menuItem' name=" + name + " doAction=" + boid + " style='background: #FFF url(img/flows/bg.gif) repeat-x 0 2px;list-style:url(img/flows/arrow.gif); margin: 0; padding: 0;cursor:pointer;' >" + " <a style='font: normal 12px Arial;  border-top: 1px solid #ccc;display: block;color: black;text-decoration: none;line-height:26px;padding-left:26px;cursor:pointer; '><span>";
        strMenuHTML += name + "</span></a></li>";
      });
      name = "撤销";

      strMenuHTML += "<li class='menuItem' name=" + name + " doAction=" + boid + " style='background: #FFF url(img/flows/bg.gif) repeat-x 0 2px;list-style:url(img/flows/arrow.gif);margin: 0; padding: 0;cursor:pointer;' >" + " <a  style='font: normal 12px Arial;  border-top: 1px solid #ccc;display: block;color: black;text-decoration: none;line-height:26px;padding-left:26px;cursor:pointer; '><span>";
      strMenuHTML += name + "</span></a></li>";
      strMenuHTML += "</ul>";
      d3.select('.submenu' + mddname).style('visibility', 'visible')
        .html(strMenuHTML);

      var currentnode = "";
      var bodyNode = d3.select("."+mddname).node();
      var submenu = d3.select('.sub' + mddname);
      var nodexx = 0;
      var nodeyy = 0;
      //console.log(d3.select("."+mddname).node());
      d3.select("."+mddname).select(".nodes").selectAll(".node").on("click", function() {
        d3.select('.main' + mddname).style('display', 'none');
        currentnode = d3.select(this).attr('id');
        that.lastname = currentnode;
        //console.log(currentnode);
        that.subvisible = 1;
        //console.log("bodyNode");

        //console.log(bodyNode);
        var position = d3.mouse(bodyNode);
        //console.log(position);
        var xx = position[0];
        if (xx > 100)
          xx = xx - 100;
          nodexx = xx;
         var yy = position[1];
         nodeyy = yy;

        //var submenu = d3.select('.sub' + mddname);
        var showtip =  that.props.flowPanelState;
        submenu.style('display', 'none');
        if(showtip==1){
          submenu
            .style('position', 'absolute')
            .style('left', xx + "px")
            .style('top', yy + "px")
            .style('display', 'inline-block');
        }
      });
      d3.select('#modalclose').on('click', function(d, i) {
          d3.select('#modal_wrapper').style('display', 'none');
      });
      d3.select('.submenu' + mddname).selectAll(".menuItem").on("click", function(d, i) {
        var mitem = d3.select(this);
        that.subitemfinish =1;
        var name = mitem.attr("name");
        if (name == '撤销') {
          var newresultdata = that.resultdata.filter(function(value) {
             //var dd=value.from+"_"+value.to;
             var dd=value.to;
             var ff=value.from;
             return (dd!==currentnode && ff!==currentnode)
           });
           //console.log(currentnode);
           //console.log(newresultdata);
           that.resultdata = newresultdata;
           var txt2="graph LR;";
           //this.setFlowv(flowvvv);
           for (var i = 0; i < newresultdata.length; i++) {
             var rr = newresultdata[i];
             txt2=txt2+rr.from+"--"+rr.des+"-->"+rr.to+";";
           }
           that.setFlowv(txt2);
           if(that.subdiv){
             that.subdiv.style('display','none');
            //  that.subdiv.style.display = 'none';
           }
           //flux.actions.YFTFlowDesignActions.set_flowDesignResultData_flow(that.resultdata);
           that.props.dispatch(flowDesignAction.set_flowDesignResultData_flow(that.resultdata));
        }else {
          if (that.Flowv) {
            console.log("that.Flowv");
            //var bodyNode = d3.select("."+mddname).node();
            var position = d3.mouse(bodyNode);
            var xx = position[0];
            if (xx > 100)
              xx = xx - 100;
            var yy = position[1] - 20;
            d3.select('#modal_wrapper').style('position', 'absolute')
              .style('left', nodexx + "px")
              .style('top', nodeyy + "px")
              .style('display', 'inline-block');
            document.getElementById("line_des").value = '';
            document.getElementById('cbwhjs').checked=false;
            d3.select('#modal_title').html('添加线路描述(' + name + ')')
            d3.select('#modalok').on('click', function(d, i) {
              //设置处理表单
              var sel3 = document.getElementById('selectstate2');
              var state3 = sel3.options[sel3.selectedIndex].value;


              var line_des = document.getElementById("line_des").value;
              if (line_des) {
                var txt1 = currentnode + "--" + line_des + "-->" + name + ";";
                if (that.Flowv.indexOf(txt1) < 0)
                  that.setFlowv(that.Flowv + txt1);
                var divform = d3.select('.sub' + that.mddname);
                var sel1 = document.getElementById('selectstate');
                var state1 = sel1.options[sel1.selectedIndex].value;
                var sel2 = document.getElementById('selectstate1');
                var state2 = sel2.options[sel2.selectedIndex].value;
                var checkbox = document.getElementById('cbwhjs');//
                var tempobj = {};
                //var busobj = that.imagesdata[name];
                //console.log(busobj);
                tempobj['from'] = that.lastname;
                tempobj['to'] = name;
                tempobj['state'] = state1;
                tempobj['nextstatus'] = state2;
                tempobj['flag'] = 0;
                if(checkbox.checked){
                  tempobj['flag'] = 1;
                  that.isjswh=true;
                }
                tempobj['des'] = line_des;
                tempobj['templdateId'] = state3;
                that.resultdata.push(tempobj);
                d3.select('#modal_wrapper').style('display', 'none');
                that.lastname = name;
                that.subitemfinish=1;

                // that.props.dispatch(flowDesignAction.set_flowDesignTemplatesId({templdateId:state3}));
                //flux.actions.YFTFlowDesignActions.set_flowDesignResultData_flow(that.resultdata);
                that.props.dispatch(flowDesignAction.set_flowDesignResultData_flow(that.resultdata));
              } else {
                //console.log("请输入描述信息!");
                //alert("请输入描述信息!");
                $.showPublicDialog("系统提示","请输入描述信息。");
              }
            });
          } else {
            that.setFlowv("graph LR;" + name + ";");
          }
        }

        that.subvisible = 0;
        try {
            that.subdiv.style('display', 'none');
        } catch (e) {
        } finally { }
        //console.log("hhhhh1");
      });
    } catch (e) {
      //alert("业务对象数据格式错误！");
      $.showPublicDialog("系统提示","业务对象数据格式错误。");
    } finally {

    }
  },
  updateImagelabel: function() {
    var that = this;
    var mdname = this.Mddname;
    try {
      var nodes = d3.select("." + mdname).select(".nodes").selectAll(".node")[0];
      nodes.map(function(obj1, index) {
        var obj = d3.select(obj1);
        var name = obj.attr("id");
        //var imagesdatas = that.imagesdata;
      //  var image1 = imagesdatas[name].image1;
        var newname = name;
        // if (image1 == 0) {
        //   newname = "default";
        // }
        var imgurl = "img/flows/" + newname + ".png";
        //console.log(imgurl);
        d3.select("." + mdname).select("#" + name).selectAll("*").remove();
        d3.select("." + mdname).select("#" + name).append("svg:image")
          .style("cursor", "pointer")
          .attr("x", -30)
          .attr("y", -20)
          .attr("width", 60)
          .attr("height", 40)
          .attr("xlink:href", function(d) {
            return imgurl;
          });
          var dd= that.checkImage(imgurl,newname);
          ///  console.log("imgurl ok");
        d3.select("." + mdname).select("#" + name).append("svg:text").attr("dy", "40")
          .style("stroke-width", "1px")
          .style("cursor", "default")
          .style("stroke-linejoin", "round")
          .style("font-family", "Arial")
          .style("font-size", "9px")
          .style("text-anchor", "middle")
          .transition()
          .duration(5000)
          .ease("bounce")
          .delay(function(d, i) {
            return 200 * i;
          })
          .text(function(d) {
            return name;
          });
      });

    } catch (e) {
      //alert("初始化图片失败!");
       console.log("初始化图片失败!");
    } finally {  }
  },
  updatEdges: function() {
    try {
      console.log("updatEdges");
      var mdname = this.Mddname;
      var edges = mermaid.getEdges();
      d3.select("." + mdname).selectAll(".edgePath").data(edges).attr("id", function(d) {
        return d.start + "_" + d.end;
      });
      d3.select("." + mdname).selectAll(".edgePath").style("cursor","auto");
      d3.select("." + mdname).selectAll(".edgePaths").style("cursor","auto");
      d3.select("." + mdname).selectAll(".edgeLabels").style("cursor","auto");
      var userdata=this.resultdata
      var vuserMenu= d3.select('.vuserMenu' + mdname);
      var vuserinfo=d3.select('.userinfo' + mdname);
      vuserMenu.on("click",function(){
       vuserMenu.style('display', 'none');
      });
      var bodyNode = d3.select("."+mdname).node();
      var _this =this;
      d3.select("."+mdname).selectAll(".node").on("mouseover", showmenu);
      function showmenu() {
        var that = this;
        var showtip =  _this.props.flowPanelState;
        if(showtip==1){
          return;
        }
        var dnode = d3.select(that);
        var svid = dnode.attr("id");
        var position = d3.mouse(bodyNode);
        var xx = position[0];
        var yy = position[1]+30;
        var strMenuHTML = "";
        var gddata = [];

        var sfrom = "";
        var sto = "";
        var strDesc = "";
        var srtwh ="";
        var sflag;
        //alert(that.userdata);
       var gddata = userdata.filter(function(value) {
          //var dd=value.from+"_"+value.to;
          var dd=value.to;
          return (dd==svid)
        });
        if(gddata.length==0)
          return;
        //device state 100 ok 101 warning 102 error
        gddata.map(function(obj, index) {
          strDesc = obj.des;
          sfrom = obj.state;
          sto = obj.nextstatus;
          sflag =obj.flag;
          if(sflag==1){
            srtwh='维护角色';
          }
          if(sflag=='1'){
            srtwh='维护角色';
          }
          //strDesc = "<span style='position:relative;width:13;height:10;COLOR:Blue'>::</span>&nbsp;" +obj.name;background: #eeeeee;
          if (strDesc) {
            strMenuHTML += "<div class='menuItem'  style='margin:3px; padding: 2px 2px 2px 2px;font-size:9pt;line-height:18px;background: #FFF url(img/flows/bg.gif);'>";
            strMenuHTML += strDesc + "</div>";
          }
          if(srtwh){
            strMenuHTML += "<div class='menuItem'  style='margin:3px; padding: 2px 2px 2px 2px;font-size:9pt;line-height:18px;background: #FFF url(img/flows/bg.gif);color:#FF0000;'>";
            strMenuHTML += srtwh + "</div>";
          }
          strMenuHTML += "<div class='menuItem'  style='margin:3px; padding: 2px 2px 2px 2px;cursor:pointer;font-size:9pt;line-height:18px;background: #FFF url(img/flows/bg.gif);color:#FF0000;' > <u>";
          strMenuHTML += "响应前："+sfrom+" 响应后："+sto+ "</u></div>";
          //strDesc = "<span style='position:relative;width:13;height:10;COLOR:Blue'>::</span>&nbsp;" +worker;
        });

        vuserinfo.style('visibility', 'visible')
          .html(strMenuHTML);
        vuserMenu.style('position', 'absolute')
          .style('left', xx + "px")
          .style('top', yy + "px")
          .style('display', 'inline-block')
          .on('mouseleave', function() {
            //d3.select('.vmenu').style('display', 'none');
          });
        d3.event.preventDefault();
      }
    } catch (e) {
    } finally { }

  },
  checkImage:function (url,name)
  {
     var img = new Image;
     var rer = true;
     var mdname = this.Mddname;
     img.onerror = img_onError;
     img.src = url;
     function img_onError() {
       //console.log("Image url error!");
       d3.select("#" + name).select("image")
         .attr("xlink:href", function(d) {
           return "img/flows/default.png";
         });
     }
     return rer;
},

  setStatedata: function(statedata) {
    this.statedata = statedata;
    var that = this;

    var sel1= d3.select('#selectstate');
    var sel2 = d3.select("#selectstate1");
    var sel3 = d3.select("#selectstate2");
    for (var i = 0; i < statedata.length; i++) {
      var obj = statedata[i];
      // <option value="http://www.msnbc.com">MSNBC</option>
      //            <option value="http://www.excite.com">EXCITE</option>
      sel1.append('option').attr('value',obj.name1).text(obj.name);
      sel2.append('option').attr('value',obj.name1).text(obj.name);
    }
    var templateData = this.props.workOrderTemplatesData;

    if(templateData.length > 0){
      // var testArray = [{id:"123",name:"1"},{id:"456",name:"2"},{id:"789",name:"3"}];
      for(var i = 0;i <templateData.length;i++){
        if("1" == templateData[i].t_type){
          sel3.append('option').attr('value',templateData[i].RecId).text(templateData[i].t_name);
        }

      }
    }

  },
  setFlowv: function(flowv) {
    var flowv = flowv;
    this.Flowv =flowv;
    var that = this;
    var mddname =this.Mddname;
    console.log("flowv");
    console.log(flowv);
    if(flowv.length>10){
      d3.select("." + mddname).style("cursor","default");
    }else {
      d3.select("." + mddname).style("cursor","pointer");
    }
    //console.log("setFlowv");
    d3.select("." + mddname).html(flowv);
    try {
      mermaid.init({
        noteMargin: 10
      }, "." + mddname);
      //mermaid.init();
      //   console.log("setFlowv ok!");
      d3.select("." + mddname).attr("data-processed","");

      try {
        that.updateImagelabel();
      //     console.log("updateImagelabel ok!");
      } catch (e) {
        //alert("初始化image失败");
        $.showPublicDialog("系统提示","初始化image失败。");
      } finally {
      }
      try {
        that.updatEdges();
      //   console.log("updatEdges ok!");
      } catch (e) {
        //alert("边错误");
        $.showPublicDialog("系统提示","边错误。");
      } finally {

      }
      d3.select("." + mddname).select(".edgeLabels").style("opacity", "0");
      that.updatesubmenu();
    } catch (e) {
      //alert("内容数据格式错误！");
      $.showPublicDialog("系统提示","内容数据格式错误。");
    } finally {  }
    // static update without animation
  },
  initflow:function(){
    var that = this;
    var mddname =this.Mddname;
    console.log("initflow");
    try {
      mermaid.init({
        noteMargin: 10
      }, "." + mddname);
      //mermaid.init();
        // console.log("setFlowv ok!");
      d3.select("." + mddname).attr("data-processed","");

      try {
        that.updateImagelabel();
           //console.log("updateImagelabel ok!");
      } catch (e) {
        //alert("初始化image失败");
        $.showPublicDialog("系统提示","初始化image失败。");
      } finally {

      }
      try {
        that.updatEdges();
         //console.log("updatEdges ok!");
      } catch (e) {
        //alert("边错误");
        $.showPublicDialog("系统提示","边错误。");
      } finally {

      }
      d3.select("." + mddname).select(".edgeLabels").style("opacity", "0");
      that.updatesubmenu();
    } catch (e) {
      //alert("内容数据格式错误！");
      $.showPublicDialog("系统提示","内容数据格式错误。");
    } finally {

    }
  },
  handleCBClick:function(event){
     var checkbox = document.getElementById('cbwhjs')
     if(this.isjswh){
       if(checkbox.checked){
          //alert("已经存在维护角色!");
          $.showPublicDialog("系统提示","已经存在维护角色。");
          checkbox.checked=false;
       }
     }
  },
  handledivClick:function(event){
    //console.log("hhhhh2");
    var that= this;
    var mddname = this.Mddname;
    var vuserMenu= d3.select('.vuserMenu' + mddname);
    vuserMenu.style('display', 'none');
     if(this.subitemfinish==1){
         this.subitemfinish=0;
          return;
     }
    // console.log(event.clientX);
    // var bodyNode = d3.select('#OperationFlowDesignPic').node();
    //     console.log(bodyNode);
    //  var position = d3.mouse(bodyNode);
     var xx = event.clientX-180;
     if(xx<30){
       xx=30;
     }
     var yy = event.clientY-120;
  // var xx = event.screenX;
  // var yy = event.screenY;
    // console.log(document.getElementById("main"+mddname));
    //alert(bodyNode);
    //console.log("mainmenu");
    var mainmenu = d3.select('.main' + mddname);
    this.maindiv = mainmenu;
  // var mainmenu = d3.select('#mainclass');
    // console.log(mainmenu);
    // try {
    //   console.log(mainmenu.style('display'));
    // } catch (e) {
    //   console.log("mainmenu.style('display')");
    // } finally {
    //
    // }

    if (mainmenu.style('display') != 'none') {
      mainmenu.style('display', 'none');
      return;
    }
    //  console.log("submenu");
    var submenu = d3.select('.sub' + mddname);
    this.subdiv = submenu;
  //  console.log("submenu");
    if (submenu.style('display') != 'none' && that.subvisible == 0) {
      submenu.style('display', 'none');
      return;
    }
    var showtip =  this.props.flowPanelState;
    //console.log(that.subvisible);
    if (that.subvisible == 0) {
      submenu.style('display', 'none');
      if(showtip==1 && that.Flowv.length<10){
        mainmenu
          .style('position', 'absolute')
          .style('left', xx + "px")
          .style('top', yy + "px")
          .style('display', 'inline-block');
      }
    } else {
      that.subvisible = 0;
      mainmenu
        .style('display', 'none');
    }
  },
  handleClick: function(tag,name,data) {
    this.props.selectitem(tag,name,data);
  },
  componentDidMount: function() {
    var mddname = this.Mddname;
    console.log('designame  ' + mddname);
    var that = this;
    this.updatemenu();
    var statedata1 = this.props.Statedata;
    this.setStatedata(statedata1);
    //this.setFlowv("graph LR;");
    this.initflow();
    //var flux = this.props.flux;
    //flux.actions.YFTFlowDesignActions.set_flowDesignResultData_flow(this.resultdata);
    this.props.dispatch(flowDesignAction.set_flowDesignResultData_flow(this.resultdata));
    this.canEdit=true;
    if(this.isOkEdit){
      var temp = Store.get("PERMISSIONS");
      try {
          temp = base64.base64decode(temp);
          temp = decodeURI(temp);
          var index1 =temp.indexOf("/operationmanage/flowdesign/update");
          //console.log("canEdit");
          //console.log(index1);
          if(index1<0){
             this.canEdit=false;
          }
      } catch (e) {
        console.log(e);
      } finally {  }
    }
  },
  componentWillMount:function(){
    this.resultdata=this.props.Resultdata;
    this.Flowv = "";
    var resultdata1=this.props.Resultdata;
      var flowvvv="graph LR;";
      //this.setFlowv(flowvvv);
      for (var i = 0; i < resultdata1.length; i++) {
        var rr = resultdata1[i];
        if(rr.flag=='1')
          this.isjswh=true;
        flowvvv=flowvvv+rr.from+"--"+rr.des+"-->"+rr.to+";";
      }
      this.Flowv = flowvvv;
      this.props.dispatch(flowDesignAction.get_workOrderTemplates());
  },
  render: function() {
    var timestamp = new Date().getTime();
    var mddname = "design" + timestamp;
    console.log('render designame  ' + mddname);
    //this.imagesdata = [];
    var resultdata1 =[];
    this.maindiv ={};
    this.subdiv={};
    //this.Flowv ="";
    this.Mddname = mddname;
    this.lastname = '';
    this.subvisible = 0;
    this.mainclick =0;
    this.subitemfinish=0;
    this.isjswh=false;
    this.isOkEdit=this.props.isOkEdit;
    //console.log("isOkEdit");
    //console.log(this.isOkEdit);

    //this.resultdata=this.props.Resultdata;
    resultdata1=this.props.Resultdata;
    this.flowName =this.props.flowName;
    var flowvvv="graph LR;";
    //this.setFlowv(flowvvv);
    for (var i = 0; i < resultdata1.length; i++) {
      var rr = resultdata1[i];
      if(rr.flag=='1')
        this.isjswh=true;
      flowvvv=flowvvv+rr.from+"--"+rr.des+"-->"+rr.to+";";
    }
    //this.Flowv = flowvvv;

    var mainclass = "main" + mddname;
    var mainmenu = 'mainmenu' + mddname;
    var subclass = "sub" + mddname;
    var submenu = "submenu" + mddname;
    var userinfo1 = 'userinfo' + mddname;
    var menuclass = "vuserMenu" + mddname;
    var flowv = this.props.Flowv;
    var menustyle = {
      background: "#eeeeee",
      border: "1px solid #ccc",
      zIndex: 99,
      display: "none"
    };
    var titlestyle1 = {
      height: "30px",
      lineHeight: "30px",
      paddingLeft: "6px"
    };
    var formtitle ={
      fontSize:"18px",
      fontWeight:300
    };
    var menuinfostyle = {
      width: "180px",
      borderTop: "none",
      position: "relative",
      fontSize: 0,
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "block",
      zIndex: 99
    };
    var modalstyle = {
      background: "#eeeeee",
      border: "1px solid #ccc",
      display: "none",
      zIndex: "100",
      width: "400px",
      paddingLeft:"10px"
      //color: "#FF0000"
    };
    var inputstyle ={
       width: "300px"
    };
    var btnstyle = {
      height: "30px",
      width: "100px"
    };
    var flowstyle={};
    if(resultdata1.length>0){
      flowstyle ={
        border: "#F2F2F2 1px outset"
      };
    }else {
      flowstyle ={
        border: "#F2F2F2 1px outset",
        cursor:"pointer"
      };
    }
    var modalid = 'modal_wrapper';
    // <input id="modalok" type="button" value="确定" style={btnstyle} />
    // <input id="modalclose" type="button" value="关闭" style={btnstyle} />
    //< div id = "modal_title" style = {titlestyle1} >添加线路描述< /div>
    return <div>
            <div onClick={this.handledivClick} className = {mddname} style={flowstyle} >{flowvvv}< /div>
            <div  id={mainclass} className = {mainclass} style = {menustyle} >
              <div style = {titlestyle1} > 新建业务对象 < /div>
              <div className = {mainmenu} style ={menuinfostyle} > < /div>
            < /div>
            <div id={subclass} className={subclass}  style={menustyle} >
              < div style = {titlestyle1} > 分配对象 < /div>
              < div className = {submenu} style ={menuinfostyle} > < /div>
            < /div>
            <div className={menuclass}  style={menustyle} >
              < div style = {titlestyle1} > 流程信息 < /div>
              < div className = {userinfo1} style ={menuinfostyle} > < /div>
            < /div>
            <div id={modalid} style={modalstyle} >
              <h4  id = "modal_title" style={formtitle} >添加线路描述</h4>
              <table cellPadding="2" cellSpacing="4">
                <tbody>
                  <tr>
                    <td height="30px">线路描述 :</td >
                    <td height="30px">
                      <input type = "text" name = "line_des" id = "line_des" style = {inputstyle} />
                    </td>
                  </tr>
                  <tr>
                    <td height="30px">响应前状态:</td>
                    <td height="30px">
                      <select name="selectstate" id="selectstate" size="1" style={inputstyle} />
                    < /td>
                  </tr>
                  <tr>
                    <td height="30px">响应后状态:</td>
                    <td height="30px">
                      <select name="selectstate1" id="selectstate1" size="1" style={inputstyle} />
                    < /td>
                  </tr>
                  <tr>
                    <td height="30px">处理表单:</td>
                    <td height="30px">
                      <select name="selectstate1" id="selectstate2" size="1" style={inputstyle} />
                    < /td>
                  </tr>
                  <tr>
                    <td height="30px">维护角色:</td>
                    <td height="30px">
                    <input type="checkbox" onClick={this.handleCBClick}  name="cbwhjs" id="cbwhjs"/> 维护工单角色用来触发工单响应时间
                    < /td>
                  </tr>
                </tbody>
              < /table>
              <div  style={{margin:6}}>
                <table>
                  <tbody>
                  <tr>
                    <td className="rw-widget-td" style={{"borderTop":"none","width":"300px",paddingLeft:"240px"}}>
                        <button type="button" id="modalok"  className="btn btn-success addFiltrateFieldBtn " > 确定 </button>
                    </td>
                    <td className="rw-widget-td" style={{"borderTop":"none","width":"100px"}}>
                        <button type="button"  id="modalclose"  className="btn btn-success addFiltrateFieldBtn " > 关闭 </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            < /div>
          < /div>;
  }
});
//module.exports = FlowDesignPanel;
function mapResourceState(state) {
  const { flowPanelState , workOrderTemplatesData } = state.flowDesignReducer
  return {
    flowPanelState:flowPanelState,
    workOrderTemplatesData:workOrderTemplatesData
  }
}

export default connect(mapResourceState)(FlowDesignPanel)
