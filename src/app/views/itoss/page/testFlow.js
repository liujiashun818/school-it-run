
var React = require('react');
var MaidFlow = require('../component/maidFlow/MaidFlow.js');
var Mdflow =  React.createClass ({
  selectitem :function(tag){
      console.log(tag);
     },
  render :function() {
    var obj={};
    var userdata = new Array();
    obj={};
    obj["name"]="分服务台";
    obj["gdid"]="gdid1";
    obj["desc"]="已经解决<br/>2015-11-5 13:22";
    obj["worker"]="黎明";
    userdata.push(obj);
    obj={};
    obj["name"]="工程师";
    obj["gdid"]="gdid2";
    obj["desc"]="重新安装操作系统<br/>完成时间:2015-09-11  14:30";
    obj["worker"]="赵轩";
    userdata.push(obj);
    obj={};
    obj["name"]="电话回访";
    obj["gdid"]="gdid3";
    obj["desc"]="电话回访中<br/>12345678910";
    obj["worker"]="嘻嘻嘻";
    var flowv ="graph LR;分服务台--复杂事件fffff,状态为分配-->工程师;"
        	    +"工程师--未完成,状态为提交-->分服务台;"
              +"工程师--已经完成-->电话回访;"
              +"电话回访--回访完成-->分服务台;";
    var statedata =[{"name":"分服务台","state":1}, {"name":"工程师","state":1,"start":"分服务台"},{"name":"分服务台","state":1,"start":"工程师"},
      {"name":"工程师","state":1,"start":"分服务台"},{"name":"电话回访","state":1,"start":"工程师"}, {"name":"分服务台","state":1,"start":"电话回访"}];
    return <div><MaidFlow   Flowv={flowv} Statedata={statedata} Userdata={userdata}selectitem={this.selectitem}/></div>;
  }
});
module.exports = Mdflow;
