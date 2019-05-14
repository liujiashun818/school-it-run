/*
页面外框框架，市级首页
获取数据
*/
require('bootstrap');
require('bootstrap-table');
// require('../../equipmentManage/lib/echarts-all.js');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
// var Navigation = require('react-router').Navigation;
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cityIndexEchart;

var cityIndexLine1 = React.createClass({
  mixins: [History],
  // getStateFromFlux: function() {
  //     var flux = this.getFlux();
  //     return {
  //         itoss:flux.store("YFTIndexStore").getState()
  //     }
  // },
  getInitialState:function(){
    return {
      eqpName:"摄像机"
    };
  },
  componentDidUpdate:function(){
    // console.log(this.state.itoss.cityIndexData);
    var data = this.props.data;
    var monitorData = data.monitorData;
    var workOrderData = data.workOrderData;
    $('#cityIndexTable1').bootstrapTable('load',workOrderData);
    if(monitorData.total == null || monitorData.total == ""){
      var eChartData = [
        {value:monitorData.intactcount,name:"正常"},
        {value:monitorData.anomalycount,name:"危险"},
        {value:monitorData.onlinecount,name:"错误"}
      ];
      cityIndexEchart.setOption({
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
      cityIndexEchart.refresh();
    }else{
      var eChartData = [
        {value:monitorData.intactcount,name:"完好数"},
        {value:monitorData.anomalycount,name:"异常数"},
        {value:monitorData.onlinecount,name:"离线数"}
      ];
      cityIndexEchart.setOption({
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
      cityIndexEchart.refresh();
    };
  },
  componentDidMount:function(){
    cityIndexEchart = echarts.init(document.getElementById('eCityIndexPic'));
    cityIndexEchart.setOption({
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
    $(window).resize(function(){
        cityIndexEchart.resize();
    })

    $('#cityIndexTable1').bootstrapTable({
        columns: [
            {
                title: '工单主题',
                field: 'SUBJECT',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '工单创建人',
                field: 'CREATEBY',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '新建时间',
                field: 'CREATEDATA_TIME',
                halign: 'left',
                align: 'left',
                sortable: true
            }
        ],
        data: [],
        onClickRow: this.onRowClick,
      });
  },
  onRowClick:function(e){
    var id = e.WORKORDER_ID;
    var flowid = e.WORKFLOW_ID;
    var filter = [{"key":"WORKORDER_ID","value":id}];
    this.props.setCurWorkFlowId(flowid);
    this.props.get_orderDetails(filter);
    //工单流程日志数据
    this.props.get_WorkFlowLogData(id);
    //工单处理信息
    this.props.get_WorkOrderProcessLogData(id);
    //清除 下级处理人 数据
    this.props.setCurrentNextPerson("");
    this.history.pushState(null,'operationManage/editOperation');
  },

  toWorkSpace:function(){
    this.props.setCurName("工作台");
    this.history.pushState(null,'operationManage/myWorkSpace');
  },
  render:function(){
    return (
      <div className='col-md-12'>
        <div className='col-md-5'>
          <label className="picTitle">设备状态 -- {this.state.eqpName}</label>
          <div className="picToggleDiv">
            <span className="curSpan" onClick={this.props.onChangeData}>摄像机</span>
            <span className="normalSpan" onClick={this.props.onChangeData}>DVR</span>
            <span className="normalSpan" onClick={this.props.onChangeData}>NVR</span>
            <span className="normalSpan" onClick={this.props.onChangeData}>编码器</span>
            <span className="normalSpan" onClick={this.props.onChangeData}>网络设备</span>
          </div>
          <div id="eCityIndexPic" className="cityIndexPic"></div>
        </div>
        <div className='col-md-7 marginLeft'>
          <label className="picTitle">我的待处理工单</label>
          <button type='button' className="rightToPageBtn" onClick={this.toWorkSpace}>更多&nbsp;<i className="fa fa-angle-double-right"></i></button>
          <div className="cityIndexPic">
            <table id='cityIndexTable1'
               data-toggle='table'
               data-classes='table table-no-bordered table-hover'
               data-show-refresh='false'
               data-show-toggle='false'
               data-show-columns='false'
               data-pagination='false'
               data-page-size='5'>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = cityIndexLine1;
