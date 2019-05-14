/**
*  react 流程图展示控件
*  lib/smil.user.js 文件是用来处理d3.js 跟IE浏览器 兼容的问题
*/
var React = require('react');

var MaidFlow = React.createClass({
  updatemenu: function() {
    var mdname = this.Mddname;
    var thatvv = this;
    var userdata = this.props.Userdata;

  // d3.select(("."+mdname)).on("click",function(){
  //  d3.select('.vuserMenu' + mdname).style('display', 'none');
  // });
  d3.select(("body")).on("click",function(){
   d3.select('.vuserMenu' + mdname).style('display', 'none');
  });
   d3.select("."+mdname).selectAll(".node").on("mouseover", showmenu);
    function showmenu() {
      var that = this;
    //  thatvv._m = true;
      var dnode = d3.select(that);
      var svid = dnode.attr("id");
      var bodyNode = d3.select("."+mdname).node();
      var position = d3.mouse(bodyNode);
      var xx = position[0];
      var yy = position[1];
      var strMenuHTML = "";
      var gddata = [];

      var gdid = "";
      var worker = "";
      var strDesc = "";
      //alert(that.userdata);
     var gddata = userdata.filter(function(value) {
        return value.name == svid;
      });
      if(gddata.length==0)
        return;
      //device state 100 ok 101 warning 102 error
      gddata.map(function(obj, index) {
        strDesc = obj.desc;
        gdid = obj.gdid;
        worker = obj.worker;
        //strDesc = "<span style='position:relative;width:13;height:10;COLOR:Blue'>::</span>&nbsp;" +obj.name;background: #eeeeee;
        strMenuHTML += "<div class='menuItem'  doAction=" + gdid + " style='margin:3px; padding: 2px 2px 2px 2px;cursor:pointer;font-size:9pt;line-height:18px;background: #FFF url(img/flows/bg.gif);color:#FF0000;' > <u>";
        strMenuHTML += worker + "</u></div>";
        //strDesc = "<span style='position:relative;width:13;height:10;COLOR:Blue'>::</span>&nbsp;" +worker;
        if (strDesc) {
          strMenuHTML += "<div class='menuItem'  style='margin:3px; padding: 2px 2px 2px 2px;font-size:9pt;line-height:18px;background: #FFF url(img/flows/bg.gif);'>";
          strMenuHTML += strDesc + "</div>";
        }
      });

      d3.select('.userinfo' + mdname).style('visibility', 'visible')
        .html(strMenuHTML);
      var len = gddata.length;
      if (len > 12)
        d3.select('.vuserMenu' + mdname).style('height', '304px');
      else
        d3.select('.vuserMenu' + mdname).style('height', 'auto');
      d3.select('.vuserMenu' + mdname)
        .style('position', 'absolute')
        .style('left', xx + "px")
        .style('top', yy + "px")
        .style('display', 'inline-block')
        .on('mouseleave', function() {
          //d3.select('.vmenu').style('display', 'none');
        });
      d3.select('.vuserMenu' + mdname).selectAll(".menuItem").on("click", function(d, i) {
        var mitem = d3.select(this);
        console.log(d3.select("#animate1svg").html());
        var svid = mitem.attr("doAction");
        thatvv.handleClick(svid);
      });
      d3.event.preventDefault();
    }
  },
  handleClick: function (tag) {
       this.props.selectitem(tag);
   },
  updatEdges: function() {
    var mdname = this.Mddname;
    var edges = mermaid.getEdges();
    d3.select("." + mdname).selectAll(".path").data(edges).attr("id", function(d) {
      return d.start + "_" + d.end;
    });
  },
  updatEdgeState: function() {
    var statedata = this.props.Statedata;
    var statedata1 = this.props.Statedata.filter(function(value) {
      return value.state == 1;
    });
    var mdname = this.Mddname;
    console.log("updatEdgeState");
    var dpath = "";
    var dpaths = [];
    var timess = 10000.0 / statedata1.length;
    statedata1.map(function(obj, index) {
      var start1 = "";
      try {
        start1 = obj.start;
      } catch (err) {
        start1 = "";
      }
      var name1 = start1 + "_" + obj.name;
        console.log(name1);
      var s12 = d3.select("." + mdname).select(".edgePaths").select("#" + name1);
      var pathdb = "";
      try {
        pathdb = s12.attr("d");
      } catch (e) {
        pathdb = "";
      }
      dpath += pathdb;
      if (pathdb)
        dpaths.push(pathdb);
      s12.style("fill", "none")
        .transition()
        .duration(3000)
        .ease("bounce") //linear bounce
        .delay(3000 * index)
        .style("stroke", "#7CFC00");
    });
    //

    function registerAnimation(anim) {
        var targets = getTargets(anim);
        var elAnimators = new Array();
        for(var i=0; i<targets.length ;i++) {
          var target = targets[i];
          var animator = new Animator(anim, target, i);
          animators.push(animator);
          elAnimators[i] = animator;
        }
        anim.animators = elAnimators;
        var id = anim.getAttribute("id");
        if (id)
          id2anim[id] = anim;
        for(var i=0; i<elAnimators.length ;i++)
          elAnimators[i].register();
    }
    //clusters
  console.log(dpaths);
    try {
      //var animate1 = d3.select("." + mdname).select(".clusters").append("svg:rect");
      var animate1 = d3.select("svg" ).append("svg:rect");
      animate1.attr("id","animate1svg").attr("x", 0)
        .attr("y", 0)
        .attr("rx", "5")
        .attr("ry", "5")
        .attr("width", "30")
        .attr("height", "15")
        .style("stroke", "#006600")
        .style("fill", " #00ff00");
       var anitxt="";



     if (navigator.userAgent.indexOf('MSIE') != -1 || navigator.userAgent.indexOf('Trident') != -1 ){
       //调用的lib/smil.user.js 中的东西,处理与IE浏览器兼容///////////////////////
       var animation ;
       for (var j = 0; j < dpaths.length; j++) {
         var upani = j*3;
         animation = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
         animation.setAttributeNS(null, 'path', dpaths[j]);
         animation.setAttributeNS(null, 'dur', 3);
         animation.setAttributeNS(null, 'begin', upani);
         animation.setAttributeNS(null, 'fill', 'freeze');
         animation.setAttributeNS(null, 'rotate', 'auto');
         document.getElementById('animate1svg').appendChild(animation);
         registerAnimation(animation);
       }
       ////////////////////////////////////////////////////////////////////////
     }else {
       for (var i = 0; i < dpaths.length; i++) {
         try {
           var ani = "animate" + i;
           var txt1 = "";
           if (i == 0) {
             txt1 = "<animateMotion id=" + ani + " path='" + dpaths[i] + "' begin='0s' dur='3s' fill = 'freeze' rotate='auto'  />";
           } else {
             //var upani = "animate" + (i - 1) + ".end";
             var upani = i*3;
             txt1 = "<animateMotion id=" + ani + " path='" + dpaths[i] + "' begin='" + upani + "s' dur='3s' fill = 'freeze' rotate='auto'  />";
           }
           anitxt+=txt1;
         } catch (e) {

         } finally {

         }
       }
       document.getElementById("animate1svg").innerHTML=anitxt;
       //console.log(document.getElementById("animate1svg").innerHTML);

     }



    } catch (ex) {

    }


    //console.log(dpath);

  },
  updatestate: function() {
    var statedata = this.props.Statedata;
    var mdname = this.Mddname;
    //nodes
    try {
      var nodes = d3.select("." + mdname).select(".nodes").selectAll(".node")[0];
      nodes.map(function(obj1, index) {
        var obj = d3.select(obj1);
        var name = obj.attr("id");
        var imgurl = "img/flows/" + name + "-1.png";
        d3.select("." + mdname).select("#" + name).selectAll("*").remove();
        d3.select("." + mdname).select("#" + name).append("svg:image")
          .attr("x", -30)
          .attr("y", -20)
          .attr("width", 60)
          .attr("height", 40)
          .attr("xlink:href", function(d) {

            return imgurl;

          });
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
      alert("初始化图片失败!");

    } finally {

    }


    statedata.map(function(obj, index) {
      var imgurl = "img/flows/" + obj.name + ".png";
      if (obj.state != 1) {
        imgurl = "img/flows/" + obj.name + "-1.png";
      }
      d3.select("." + mdname).select("#" + obj.name).selectAll("*").remove();
      d3.select("." + mdname).select("#" + obj.name).append("svg:image")
        .attr("x", -30)
        .attr("y", -20)
        .attr("width", 60)
        .attr("height", 40)
        .attr("xlink:href", function(d) {

          return imgurl;

        });
      d3.select("." + mdname).select("#" + obj.name).append("svg:text").attr("dy", "40")
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
          return obj.name;
        });
    });

   d3.select("." + mdname).select(".edgeLabels").style("opacity", "0");
  },
  componentDidMount: function() {
    var mddname = this.Mddname;
    console.log('chartname  '+mddname);
    try {
      mermaid.init({
        noteMargin: 10
      }, "." + mddname);

      console.log('init chart');
      try {
        this.updatestate();
      } catch (e) {
        alert("状态数据错误");
      } finally {

      }
      try {
        this.updatEdges();
        this.updatEdgeState();
      } catch (e) {
        alert("状态数据(边)错误");
      } finally {
      }
    try {
      this.updatemenu();
    } catch (e) {

    } finally {

    }

    } catch (e) {
      console.error('init fail!');
    } finally {

    }
  },
  render: function() {
    var timestamp = new Date().getTime();
    var mddname = "flowchart" + timestamp;
    this.Mddname = mddname;
    var userinfo1 = 'userinfo' + mddname;
    var menuclass = "vuserMenu" + mddname;
    var flowv = this.props.Flowv;
    var menustyle ={
        background:"#eeeeee",
        border:"1px solid #ccc",
        display:"none"
    };
    var titlestyle1 ={
      height:"30px",
      lineheight:"30px",
      paddingleft:"6px"
    };
    var menuinfostyle={
       width:"180px",
       bordertop:"none",
       position:"relative",
       fontsize:0,
       liststyle:"none",
       margin:0,
       padding:0,
       display:"block",
       zindex:9
    };

    return <div><div className={mddname}>{flowv}</div>
           <div className={menuclass}  style={menustyle} >
           <div>工单记录</div>
          <div className={userinfo1} > < /div>
         </div></div>;
  }
});
module.exports = MaidFlow;
