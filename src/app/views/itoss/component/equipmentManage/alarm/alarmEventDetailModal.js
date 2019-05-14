/**
 * 告警事件详细
 */
var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var base64 = require('../../../../../utils/base64');

function StatusFormatter(value, row) {
    var imgSrc = "";
    switch (value) {
        case "error":
            imgSrc = "img/itoss/Error.png";
            break;
        case "warning":
            imgSrc = "img/itoss/Warning.png";
            break;
        default:
            imgSrc = "img/itoss/Warning.png";
            break;
    }
    return [
        '<img src="' + imgSrc + '"></img>'
    ].join('');
}

var DeviceInfoModal = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            // videoName: ""
        };
    },
    shouldComponentUpdate: function(nextProps, nextState){
      if (nextProps.alarmEventDetails !== this.props.alarmEventDetails) {
        this.handleAlarmEventDetails(nextProps);
      }
      return true;
    },
    handleAlarmEventDetails:function(props){
      var alarmEventDetails = props.alarmEventDetails;
      $('#alarmEventDetailTable').bootstrapTable('load',alarmEventDetails);

      var temp = localStorage.getItem("PERMISSIONS");
      temp = base64.base64decode(temp);
      temp = decodeURI(temp);
      var permissionsValue = eval(temp);
      var enableChangeAlarmStatus = false, enableTriggerWorkOrder = false;
      for(var i = 0; i < permissionsValue.length; i++) {
          if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmevent/update") {
              enableChangeAlarmStatus = true;
          }
          else if(permissionsValue[i].resourceType == "/equipmentmanage/alarm/alarmevent/trigger") {
              enableTriggerWorkOrder = true;
          }
      }

      if(!enableChangeAlarmStatus) {
          $("#alarmEventDetailModal_confirmAlarmBtn").hide();
          $("#alarmEventDetailModal_continueAlarmBtn").hide();
      }
      else {
          if(this.props.selectedAlarmEvent.eventstatus!="2") {
              $("#alarmEventDetailModal_confirmAlarmBtn").show();
              $("#alarmEventDetailModal_continueAlarmBtn").hide();
          }
          else {
              $("#alarmEventDetailModal_confirmAlarmBtn").hide();
              $("#alarmEventDetailModal_continueAlarmBtn").show();
          }
      }

      var _this = this;
      $('#alarmEventDetailModal').on('show.bs.modal', function () {
          $('#alarmEventDetailTable').bootstrapTable('resetView');
          $('#alarmEventDetailTable').bootstrapTable('refreshOptions', {data: alarmEventDetails});

          if(!enableChangeAlarmStatus) {
              $("#alarmEventDetailModal_confirmAlarmBtn").hide();
              $("#alarmEventDetailModal_continueAlarmBtn").hide();
          }
          else {
              if(_this.props.selectedAlarmEvent.eventstatus!="2") {
                  $("#alarmEventDetailModal_confirmAlarmBtn").show();
                  $("#alarmEventDetailModal_continueAlarmBtn").hide();
              }
              else {
                  $("#alarmEventDetailModal_confirmAlarmBtn").hide();
                  $("#alarmEventDetailModal_continueAlarmBtn").show();
              }
          }

          if(!enableTriggerWorkOrder) {
              $("#alarmEventDetailModal_creatWorkOrderBtn").hide();
          }
      });
    },
    componentDidMount: function() {
        // var _this = this;
        // $('#deviceInfoModal').on('show.bs.modal', function () {
        //     _this.setState({videoName: _this.state.itoss_Monitor.MonitorTableSelectedRowData.VIDEONAME});
        // })
        $('#alarmEventDetailTable').bootstrapTable({
            columns: [
                {
                    title: '状态',
                    field: 'monitorstatus',
                    formatter: StatusFormatter,
                    sortable: false
                }, {
                    title: '监测器名称',
                    field: 'monitorName',
                    sortable: false
                }, {
                    title: '告警内容',
                    field: 'alarmcontent',
                    sortable: false
                }, {
                    title: '生成时间',
                    field: 'createddatetime',
                    sortable: false
                }, {
                    title: '最后修改时间',
                    field: 'lastmoddatetime',
                    sortable: false
                }
            ],
            data: []//this.state.itoss_Monitor.AlarmEventDetails
        });
    },

    _handleOnClickCreatWorkOrder: function() {
        if(this.props.isCreateWorkOrder=="0"){
            this.props.initDetailData(0);
            this.props.getFaultType();
            this.props.getServiceName();
            var param = [{key:"TABLENAME",value:"WorkOrderCommon"},{key:"KEYWORD",value:"WorkOrderNumber"}];
            this.props.getCreateOrderInfo(param);
            this.props.getWorkFlowTypes();
            this.props.setIsBunder(0);
            var sae = this.props.selectedAlarmEvent;
            var aed = this.props.alarmEventDetails;
            var equipId = sae.equipmentRecId;
            var uiParam = [{key:"RECID",value:equipId},{key:"MONITORTYPE",value:""}];
            if(equipId){
              this.props.get_workOrderUi(uiParam)
            };
            var title = sae.equipmentip + " (故障)";
            this.props.setWorkTheme(title);
            var desc = sae.alarmcontent;
            this.props.setWorkDescription(desc);
            this.props.setTouchWorkOrderDataDesc(desc);
            $('#alarmEventWorkOrderModal').modal('show')
            $("#alarmEventWorkOrderTitle").val(title);
            $("#alarmEventWorkOrderDescription").val(desc);
            $("#alarmOperationFaultBigType").find(".rw-input").text("");
            $("#alarmOperationFaultSubType").find(".rw-input").text("");
            $("#alarmEventWorkOrderResponseTime").val("");
            $("#alarmEventWorkOrderOverTime").val("");
            $("#alarmOperationOrderLevel").find(".rw-input").text("");
            $("#alarmOperationOrderSla").find(".rw-input").text("");
            $("#alarmOperationOrderFlowType").find(".rw-input").text("");
        }else{
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示";
            document.getElementById('publicMessageModalcontent').innerHTML = "已经存在工单。";
            $('#publicMessageModal').modal('show');
          },100);
        }
    },

    _handleOnClickChangeAlarmStatus: function(e) {
        var dateObjec = {
          RecId:this.props.selectedAlarmEvent.recid,
          EventStatus: e.currentTarget.innerHTML=="确认告警"?"2":"1"
        };
        this.props.updateAlarmEventStatus(dateObjec);

        if(this.props.alarmEventDetailModalOpenedFromPage == "alarmEventPage") {
          var showStart = (this.props.alarmEventCurrentPage-1) * this.props.alarmEventNumPerPage;
          var showEnd = this.props.alarmEventCurrentPage * this.props.alarmEventNumPerPage;
          var filter = this.props.alarmEventFilter.slice(0);
          filter.push({key:"FROM", value:showStart});
          filter.push({key:"TO", value:showEnd});
          // this.props.getAlarmEvent(filter);

          // var that = this;
          // setTimeout(that.props.getAlarmEvent(filter),1000);
          this.props.setAlarmEventPageCurrentFilter(filter);

          // $('#alarmEventTable').bootstrapTable('refreshOptions', {
          //     data: this.getFlux().store("YFTDeviceMonitorStore").getState().AlarmEventData
          // });
          // this.addRightClickListener();
          document.getElementById("fixed-alarmEventTable-pagination").style.display = "block";

          // setTimeout(($('#alarmEventTable').bootstrapTable('refreshOptions', {
          //     pagination: false
          // }))
          // ,100)
          $('#alarmEventTable').bootstrapTable('refreshOptions',{});
        }
        else if(this.props.alarmEventDetailModalOpenedFromPage == "cityIndex") {
            this.props.getCityIndexData();
            var data = this.props.cityIndexData;
            var alarmData = data.alarmData;
            // console.log(alarmData);
            for(var i=0;i<alarmData.length;i++){
              var statu = alarmData[i].equipmentstatus;
              var atime = alarmData[i].alarmtime;
              atime = atime.substring(0,atime.length-2);
              alarmData[i].alarmtime = atime;
              var btime = alarmData[i].lasttime;
              btime = btime.substring(0,btime.length-2);
              alarmData[i].lasttime = btime;
              if(statu == "error"){
                alarmData[i].equipmentstatus = "错误";
              }else if(statu == "warning"){
                alarmData[i].equipmentstatus = "危险";
              };
            };
            $('#cityIndexTable2').bootstrapTable('refreshOptions', {
                data: alarmData
            });
        }
    },

    addRightClickListener: function() {
        if(document.getElementById("alarmEventTable")!=null) {
            var trObjs = document.getElementById("alarmEventTable").getElementsByTagName("tbody")[0].childNodes;
            for(var i = 0; i < trObjs.length; i++) {
                // LTEvent.addListener(trObjs[i],"contextmenu",LTEvent.cancelBubble);
                // LTEvent.addListener(trObjs[i],"contextmenu",this.showMenu);
                var _this = this;
                trObjs[i].oncontextmenu = function (e){
                    _this.showMenu(e);
                    return false;
                }
            }
            document.onclick = this.hideMenu;
            document.getElementById("alarmEventRightClickMenu").onclick = this.hideMenu;
        }
    },

    render : function(){
        return (
            <div className="modal fade" id="alarmEventDetailModal" tabIndex="-1" role="dialog" aria-labelledby="alarmEventDetailModalLabel" aria-hidden="true">
                <div className="modal-dialog alarmEventDetailModalDialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 className="modal-title">告警事件详细</h5>
                        </div>
                        <div className="modal-body">
                            <table id='alarmEventDetailTable'
                                   data-toggle='table'
                                   data-classes='table table-no-bordered table-striped table-hover'
                                   data-height={400}>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button id="alarmEventDetailModal_creatWorkOrderBtn" type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickCreatWorkOrder}>触发工单</button>
                            <button id="alarmEventDetailModal_confirmAlarmBtn" type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickChangeAlarmStatus}>确认告警</button>
                            <button id="alarmEventDetailModal_continueAlarmBtn" type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal" onClick={this._handleOnClickChangeAlarmStatus} style={{display:"none"}}>继续告警</button>
                            <button type="button" className="btn btn-sm modalFootBtn" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DeviceInfoModal;
