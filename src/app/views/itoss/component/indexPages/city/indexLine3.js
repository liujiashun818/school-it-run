/*
页面外框框架，市级首页
获取数据
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var indexLine3Echart1;

function resetView(value,row,index){
  var returnVal = "";
  switch (value) {
    case "1":
      returnVal = "未确认";
      break;
    case "2":
      returnVal = "已确认";
      break;
    case "3":
      returnVal = "派发工单";
      break;
  };
  // console.log(returnVal);
  return returnVal;
};

var cityIndexLine3 = React.createClass({
  mixins: [History],
  // getStateFromFlux: function() {
  //     var flux = this.getFlux();
  //     return {
  //         itoss:flux.store("YFTIndexStore").getState()
  //     }
  // },
  componentDidUpdate:function(){
    var data = this.props.data;
    var alarmData = data.alarmData;
    for(var i=0;i<alarmData.length;i++){
      var statu = alarmData[i].equipmentstatus;
      var atime = alarmData[i].alarmtime;
      var btime = alarmData[i].lasttime;
      if(statu == "error"){
        alarmData[i].equipmentstatus = "错误";
      }else if(statu == "warning"){
        alarmData[i].equipmentstatus = "危险";
      };
    };
    $('#cityIndexTable2').bootstrapTable('load',alarmData);
    var _this = this;
    var assetData = data.assetData;
    var echartName = [];
    var echartData = [];
    for(var i=0;i<assetData.length;i++){
      var edata = {
          value:assetData[i].ASSETS_NUMBER,
          name:assetData[i].ASSETS_TYPE_NAME,
          tid:assetData[i].PRODUCT_TYPE_ID
      };
      echartData.push(edata);
      echartName.push(edata.name);
    };
    indexLine3Echart1.setOption({
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient : 'vertical',
          x : 'left',
          data:echartName
      },
      toolbox: {
          show : true,
          feature : {
              // mark : {show: true},
              // //dataView : {show: true, readOnly: false},
              // magicType : {
              //     show: true,
              //     type: ['pie', 'funnel'],
              //     option: {
              //         funnel: {
              //             x: '25%',
              //             width: '50%',
              //             funnelAlign: 'center',
              //             max: 1548
              //         }
              //     }
              // },
              // restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      calculable : true,
      animation : false,
      series : [
          {
              name:'过保资产统计',
              type:'pie',
              radius : ['50%', '70%'],
              itemStyle : {
                  normal : {
                      label: {
                          show: true,
                          formatter: '{b} : {c}'
                      },
                      labelLine : {
                          show : true
                      }
                  },
                  emphasis : {
                      label : {
                          show : false,
                          position : 'center',
                          textStyle : {
                              fontSize : '30',
                              fontWeight : 'bold'
                          }
                      }
                  }
              },
              data:echartData
          }
      ]
    });
    indexLine3Echart1.refresh();
  },
  componentDidMount:function(){
    $('#cityIndexTable2').bootstrapTable({
        columns: [
            {
                title: '事件级别',
                field: 'equipmentstatus',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '事件设备',
                field: 'equipmentip',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '事件生成时间',
                field: 'alarmtime',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '事件上次修改时间',
                field: 'lasttime',
                halign: 'left',
                align: 'left',
                sortable: true
            }, {
                title: '事件状态',
                field: 'eventstatus',
                halign: 'left',
                align: 'left',
                formatter: resetView,
                sortable: true
            }, {
                title: '详细',
                field: 'alarmcontent',
                halign: 'left',
                align: 'left',
                sortable: true
            }
        ],
        data: [],
        onClickRow: this.showEventInfo
      });

      // console.log(assetData);
      indexLine3Echart1 = echarts.init(document.getElementById('ecityIndexPic3'));
      indexLine3Echart1.setOption({
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable : true,
        animation : false
      });
      indexLine3Echart1.on("click",function(e){
          // _this.getFlux().actions.AssetManageActions.set_default_productType_id({val:e.data.tid});
          // _this.getFlux().actions.AssetManageActions.set_default_productType_value({val:e.name});
          // _this.history.pushState(null,'assetManage/assetMaintain');
      });
      $(window).resize(function(){
          indexLine3Echart1.resize();
      })
  },
  showEventInfo: function(row, element) {
      this.props.setMonitorTableSelectedRowData(row);
      var filter = [{key:"EQUIPMENTRECID", value:row.equipmentRecId}];
      this.props.getAlarmDetails(filter);
      this.props.setSelectedAlarmEvent(row);
      this.props.setAlarmEventDetailModalOpenedFromPage("cityIndex");
      $('#alarmEventDetailModal').modal('show')
  },
  toReportError:function(){
    this.props.setCurName("告警事件列表");
    this.history.pushState(null,'equipmentManage/alarmEventPage');
  },
  toAssetManage:function(){
    this.props.setCurName("资产维保");
    this.history.pushState(null,'assetManage/assetMaintain');
  },
  render:function(){
    return (
      <div className='col-md-12'>
        <div className='col-md-5'>
          <label className="picTitle">过保资产统计</label>
          <button type='button' className="rightToPageBtn" onClick={this.toAssetManage}>更多&nbsp;<i className="fa fa-angle-double-right"></i></button>
          <div id="ecityIndexPic3" className="cityIndexPic"></div>
        </div>
        <div className='col-md-7 marginLeft'>
          <label className="picTitle">最新告警事件</label>
          <button type='button' className="rightToPageBtn" onClick={this.toReportError}>更多&nbsp;<i className="fa fa-angle-double-right"></i></button>
          <div className="cityIndexPic">
            <table id='cityIndexTable2'
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

module.exports = cityIndexLine3;
