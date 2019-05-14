/*
页面外框框架，市级首页
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
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cityIndexEchart2;
var cityIndexLine2 = React.createClass({
  mixins: [History],
  // getStateFromFlux: function() {
  //     var flux = this.getFlux();
  //     return {
  //         itoss:flux.store("YFTIndexStore").getState()
  //     }
  // },
  componentDidUpdate:function(){
    var data = this.props.data;
    var monitorData = data.monitorData;
    // console.log(monitorData);
    if(monitorData.total == null || monitorData.total == "" || monitorData.total == 0){
      var totalData = monitorData.intactcount+monitorData.anomalycount+monitorData.onlinecount;
      var treeOnline = totalData - monitorData.onlinecount;
      cityIndexEchart2.setOption({
        series : [
          {
            name:'',
            type:'bar',
            barWidth: 30,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    '#0088FF' , '#CD5C5C', '#00AA00', '#CC0000' , '#F08000'
                  ];
                  return colorList[params.dataIndex]
                },
                // label: {
                //     show: true,
                //     position: 'top',
                //     formatter: '{b}\n{c}'
                // }
              }
            },
            data:[totalData,treeOnline,monitorData.intactcount,monitorData.anomalycount,monitorData.onlinecount]
          }
        ]
      });
      cityIndexEchart2.refresh();
    }else{
      var treeOnline = monitorData.total - monitorData.onlinecount;
      cityIndexEchart2.setOption({
        series : [
          {
            name:'',
            type:'bar',
            barWidth: 30,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    '#0088FF' , '#CD5C5C', '#00AA00', '#CC0000' , '#F08000'
                  ];
                  return colorList[params.dataIndex]
                },
                // label: {
                //     show: true,
                //     position: 'top',
                //     formatter: '{b}\n{c}'
                // }
              }
            },
            data:[monitorData.total,treeOnline,monitorData.intactcount,monitorData.anomalycount,monitorData.onlinecount]
          }
        ]
      });
      cityIndexEchart2.refresh();
    };
  },
  componentDidMount:function(){
    // var data = this.state.itoss.cityIndexData;
    // var monitorData = data.monitorData;
    // var treeOnline = monitorData.total - monitorData.onlinecount;
    // console.log(monitorData);
    cityIndexEchart2 = echarts.init(document.getElementById('eCityIndexPic2'), 'macarons');
    cityIndexEchart2.setOption({
      tooltip : {
          trigger: 'axis',
          formatter: "{b} : {c}"
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
          show : false,
          start : 0,
          end : 100
      },
      xAxis : [
          {
              type : 'category',
              data : ['总数','在线数','完好数','异常数','离线数']
          }
      ],
      yAxis : [
          {
              type : 'value',
              name : '数量',
              axisLabel : {
                  formatter: '{value}'
              }
          }
      ],
      series : [
          {
              name:'',
              type:'bar',
              barWidth: 30,
              itemStyle: {
                  normal: {
                      color: function (params) {
                          var colorList = [
                              '#0088FF' , '#CD5C5C', '#00AA00', '#CC0000' , '#F08000'
                          ];
                          return colorList[params.dataIndex]
                      },
                      label: {
                          show: true,
                          position: 'top',
                          formatter: '{c}'
                      }
                  }
              },
              data:[0,0,0,0,0]
          }
      ]
    });
    $(window).resize(function(){
        cityIndexEchart2.resize();
    })
  },
  render:function(){
    return (
      <div className='col-md-12'>
        <label className="picTitle" id="cityIndexChangePicTitle">摄像机在线信息</label>
        <div id="eCityIndexPic2" className="cityIndexPic"></div>
      </div>
    );
  }
});

module.exports = cityIndexLine2;
