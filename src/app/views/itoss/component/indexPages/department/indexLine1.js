/*
页面外框框架，厅级首页
获取数据
*/
require('bootstrap');
require('bootstrap-table');
// require('../../equipmentManage/lib/echarts-all.js');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var departmentIndexEchart;
function addHondrad(value,e){
  return value+"%";
};

var departmentIndexLine1 = React.createClass({
  mixins: [History],
  getInitialState:function(){
    return {
      eqpName:"摄像机"
    };
  },
  componentDidUpdate:function(){
    // console.log(this.state.itoss.cityIndexData);
    var data = this.props.data;
    var monitorData = data.statusData[0];
    var anData = monitorData.onlinecount - monitorData.intactcount;
    var outData = monitorData.total - monitorData.onlinecount;
    if(monitorData.area == "" || monitorData.area == null){
      var wx = monitorData.anomalycount;
      var zc = monitorData.intactcount;
      var cw = monitorData.onlinecount;
      departmentIndexEchart.setOption({
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient : 'vertical',
          x : 'left',
          data:['正常','危险','错误']
        },
        calculable : true,
        series : [
          {
            name:'设备状态',
            type:'pie',
            radius : '70%',
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    '#00AA00', '#F08000', '#CC0000'
                  ];
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true,
                  formatter: '{b} : {c} ({d}%)'
                }
              }
            },
            center: ['55%', '55%'],
            data:[
              {value:zc,name:"正常"},
              {value:wx,name:"危险"},
              {value:cw,name:"错误"}
            ]
          }
        ]
      });
    }else{
      var eChartData = [
        {value:monitorData.intactcount,name:"完好数"},
        {value:anData,name:"异常数"},
        {value:outData,name:"离线数"}
      ];
      departmentIndexEchart.setOption({
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient : 'vertical',
          x : 'left',
          data:['完好数','异常数','离线数']
        },
        calculable : true,
        series: [
          {
            name:'设备状态',
            type:'pie',
            radius : '70%',
            center: ['55%', '55%'],
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    '#00AA00', '#F08000', '#CC0000'
                  ];
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true,
                  formatter: '{b} : {c} ({d}%)'
                }
              }
            },
            data:eChartData
          }
        ]
      });
    };
    departmentIndexEchart.refresh();
    var tableData = [];
    if(data!=null && data!=""){
      tableData = data.monitorData;
    }
    $('#departmentIndexTable1').bootstrapTable('load',tableData);
  },
  componentDidMount:function(){
    var tdata = this.props.data;
    // var picData = tdata.statusData[0];
    // if(picData!=null && picData!=""){
    departmentIndexEchart = echarts.init(document.getElementById('edepartmentIndexPic'));
    departmentIndexEchart.setOption({
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient : 'vertical',
        x : 'left',
        data:['完好数','异常数','离线数']
      },
      calculable : true
    });

    var tableData = [];
    // if(tdata!=null && tdata!=""){
    //   tableData = tdata.monitorData;
    // }
    $('#departmentIndexTable1').bootstrapTable({
      columns: [
        {
          title: '区域',
          field: 'area',
          halign: 'left',
          align: 'left',
          sortable: true
        }, {
          title: '摄像机总数',
          field: 'total',
          halign: 'left',
          align: 'left',
          sortable: true
        }, {
          title: '在线数',
          field: 'onlinecount',
          halign: 'left',
          align: 'left',
          sortable: true
        }, {
          title: '在线率',
          field: 'onlinerate',
          halign: 'left',
          align: 'left',
          formatter: addHondrad,
          sortable: true
        }
      ],
      data: []
    });
    // };
  },

  render:function(){
    return (
      <div className='col-md-12'>
        <div className='col-md-5'>
          <label className="picTitle">设备状态 -- {this.props.eqpName}</label>
          <div className="picToggleDiv">
            <span className="curSpan" onClick={this.props.onChangeData}>摄像机</span>
            <span className="normalSpan" onClick={this.props.onChangeData}>DVR</span>
            <span className="normalSpan" onClick={this.props.onChangeData}>NVR</span>
            <span className="normalSpan" onClick={this.props.onChangeData}>编码器</span>
            <span className="normalSpan" onClick={this.props.onChangeData}>网络设备</span>
          </div>
          <div id="edepartmentIndexPic" className="cityIndexPic"></div>
        </div>
        <div className='col-md-7 marginLeft'>
          <label className="picTitle">摄像机地州在线排名</label>
          <div className="cityIndexPic">
            <table id='departmentIndexTable1'
               data-toggle='table'
               data-classes='table table-no-bordered table-hover'
               data-show-refresh='false'
               data-show-toggle='false'
               data-show-columns='false'
               data-pagination='true'
               data-page-size='5'>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = departmentIndexLine1;
