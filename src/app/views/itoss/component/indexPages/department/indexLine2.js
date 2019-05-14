/*
页面外框框架，厅级首页
获取数据
*/
require('bootstrap');
// require('../../equipmentManage/lib/echarts-all.js');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var departmentIndexChart2;
var departmentIndexLine2 = React.createClass({
  mixins: [History],
  componentDidUpdate:function(){
    var tdata = this.props.data;
    var areaList = [];
    var totalList = [];
    var intactList = [];
    var onlineList = [];
    var intactRateList = [];
    if(tdata!=null && tdata!=""){
      var ttdata = tdata.monitorData;
      for(var i=0;i<ttdata.length;i++){
        var area = ttdata[i].area;
        areaList.push(area);
        var totleNum = ttdata[i].total;
        var intact = ttdata[i].intactcount;
        var intactRate = ttdata[i].onlinerate;
        onlineList.push(ttdata[i].onlinecount);
        totalList.push(totleNum);
        intactList.push(intact);
        intactRateList.push(intactRate);
      };
    }
    departmentIndexChart2.setOption({
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data:['在线率','总数','完好数','在线数']
      },
      toolbox: {
          show : true,
          feature : {
              // mark : {show: true},
              // //dataView : {show: true, readOnly: false},
              // magicType : {show: true, type: ['line', 'bar']},
              // restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      dataZoom : {
          show : true,
          start : 0,
          end : 100
      },
      xAxis : [
          {
              type : 'category',
              boundaryGap : true,
              data: areaList
          }
      ],
      yAxis : [
          {
              type : 'value',
              name : '完好数'
          },
          {
              type : 'value',
              axisLabel : {
                formatter: '{value} %'
              },
              name : '在线率'
          }
      ],
      series : [
          {
              name:'在线率',
              type:'line',
              symbol:"emptyTriangle",
              symbolSize: 6,
              yAxisIndex: 1,
              lineStyle:{
                width:2
              },
              data:intactRateList
          },{
              name:'总数',
              type:'bar',
              barWidth: 30,
              itemStyle: {
                  normal: {
                    color: "#0088FF",
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                  }
              },
              data:totalList
          },{
              name:'完好数',
              type:'bar',
              barWidth: 30,
              itemStyle: {
                  normal: {
                    color: "#00AA00",
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                  }
              },
              data:intactList
          },{
            name:"在线数",
            type:'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                  color: "#CD5C5C",
                  label: {
                      show: true,
                      position: 'top',
                      formatter: '{c}'
                  }
                }
            },
            data:onlineList
          }
      ]
    });
  },
  componentDidMount:function(){
    departmentIndexChart2 = echarts.init(document.getElementById('edepartmentIndexPic2'));
    departmentIndexChart2.setOption({
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data:['在线率','总数','完好数','在线数']
      },
      toolbox: {
          show : true,
          feature : {
              // mark : {show: true},
              // //dataView : {show: true, readOnly: false},
              // magicType : {show: true, type: ['line', 'bar']},
              // restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      dataZoom : {
          show : true,
          start : 0,
          end : 100
      },
      xAxis : [
          {
              type : 'category',
              boundaryGap : true,
              data: []
          }
      ],
      yAxis : [
          {
              type : 'value',
              name : '完好数'
          },
          {
              type : 'value',
              axisLabel : {
                formatter: '{value} %'
              },
              name : '在线率'
          }
      ]
    });
  },
  render:function(){
    return (
      <div className='col-md-12'>
        <label className="picTitle">摄像机在线信息</label>
        <div id="edepartmentIndexPic2" className="cityIndexPic"></div>
      </div>
    );
  }
});

module.exports = departmentIndexLine2;
