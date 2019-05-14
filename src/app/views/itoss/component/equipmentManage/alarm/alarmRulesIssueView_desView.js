/**
 * Created by SHIN on 2016/1/14.
 * 厅级升级配置主窗口
 */
var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');
var dateChange = require('../../../../../utils/dateChange');
var base64 = require('../../../../../utils/base64');
var Tools = require('../../../../../utils/tool');

function whetherSendFormatter(value, row) {
    if(value == "true") {
        return "是";
    }
    else {
        return "否";
    }
}

function editFormatter(value, row) {
    return [
        '<a class="edit" href="javascript:void(0)"><i class="fa fa-pencil-square-o"></i></a>'
    ].join('');
}

function deleteFormatter(value, row) {
    return [
        '<a class="delete" href="javascript:void(0)"><i class="fa fa-trash-o"></i></a>'
    ].join('');
}

var _this;
window.operateAlarmRulesEvents = {
    'click .edit': function (e, value, row, index) {
        var alarmIssuedEquipmentType = _this.props.alarmIssuedEquipmentType[0];
        for (var key in alarmIssuedEquipmentType)
        {
            if(alarmIssuedEquipmentType[key] == row.machineTypeId) {
                _this.setState({selectedEquipmentType: {id: alarmIssuedEquipmentType[key], name: key}});
            }
        }
        document.getElementById("alarmIssued_cycle").value = row.cycle;
        document.getElementById("alarmIssued_alarmNumber").value = row.alarmNumber;
        document.getElementById("alarmIssued_responseTime").value = row.responseTime;
        document.getElementById("alarmIssued_tjUpdateCycle").value = row.updatetime;
        if(row.whetherSend == "true") {
            document.getElementById("alarmRulesIssue_radio_yes").checked = true;
        }
        else {
            document.getElementById("alarmRulesIssue_radio_no").checked = true;
        }

        var monitorType = [];
        var alarmIssuedMonitorType = _this.props.alarmIssuedMonitorType[0];
        for (var key in alarmIssuedMonitorType)
        {
            if(key == row.machineTypeId) {
                for(var i = 0; i < alarmIssuedMonitorType[key].length; i++) {
                    var strMonitorType = alarmIssuedMonitorType[key][i];
                    monitorType.push({showname: strMonitorType.substring(0, strMonitorType.indexOf("=")), savename: strMonitorType.substring(strMonitorType.indexOf("=")+1)});
                }
                break;
            }
        }
        _this.setState({monitorType: monitorType});

        var alarmIssuedRelArr = row.alarmIssuedRel.split(",");
        var selectedMonitorTypeIds = [];
        for(var i = 0; i < alarmIssuedRelArr.length; i++) {
            // document.getElementById("alarmIssuedMonitorType_"+alarmIssuedRelArr[i].substring(0, alarmIssuedRelArr[i].indexOf("="))).checked = true;
            selectedMonitorTypeIds.push("alarmIssuedMonitorType_"+alarmIssuedRelArr[i].substring(0, alarmIssuedRelArr[i].indexOf("=")));
        }
        _this.setState({selectedMonitorTypeIds: selectedMonitorTypeIds});
    },
    'click .delete': function (e, value, row, index) {
        // setTimeout(function () {
            _this.props.deleteAlarmIssued([{key: "id", value: row.machineTypeId}]);
            _this.props.getAlarmIssued();
            // $('#alarmRulesIssueTable').bootstrapTable('refreshOptions', {data: _this.props.alarmIssuedTableData});
        // }, 100);

        // var temp = localStorage.getItem("PERMISSIONS");
        // temp = base64.base64decode(temp);
        // temp = decodeURI(temp);
        // var permissions = eval(temp);
        // var enableSave = false;
        // for(var i = 0; i < permissions.length; i++) {
        //     if(permissions[i].resourceType == "/equipmentmanage/alarm/alarmrulesissue/add" || permissions[i].resourceType == "/equipmentmanage/alarm/alarmrulesissue/update") {
        //         enableSave = true;
        //     }
        // }
        // if(!enableSave) {
        //     $("#alarmRulesIssueView_desView").find(".btnSave").hide();
        // }
    }
};

var AlarmRulesIssueView_desView = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    getInitialState: function () {
        _this = this;
        return {
            typeId: '1',
            equipmentType: [],
            selectedEquipmentType: null,
            monitorType: [],
            selectedMonitorTypeIds: [],
            enableChange: false
        }
    },

    componentWillMount: function() {
      this.props.getAlarmIssued();
    },
    shouldComponentUpdate: function(nextProps, nextState){
      if (nextProps.alarmIssuedEquipmentType !== this.props.alarmIssuedEquipmentType) {
        this.handleAlarmIssuedEquipmentType(nextProps);
      }
      return true;
    },
    handleAlarmIssuedEquipmentType:function(props){
      var alarmIssuedEquipmentType = props.alarmIssuedEquipmentType[0];
      var equipmentType = [];
      for (var key in alarmIssuedEquipmentType)
      {
          equipmentType.push({id: alarmIssuedEquipmentType[key], name: key});
      }
      this.setState({equipmentType: equipmentType});
      this.setState({selectedEquipmentType: equipmentType[0]});
      var monitorType = [];
      var alarmIssuedMonitorType = props.alarmIssuedMonitorType[0];
      for (var key in alarmIssuedMonitorType)
      {
          if(key == equipmentType[0].id) {
              for(var i = 0; i < alarmIssuedMonitorType[key].length; i++) {
                  var strMonitorType = alarmIssuedMonitorType[key][i];
                  monitorType.push({showname: strMonitorType.substring(0, strMonitorType.indexOf("=")), savename: strMonitorType.substring(strMonitorType.indexOf("=")+1)});
              }
              break;
          }
      }
      this.setState({monitorType: monitorType});

      var AlarmIssuedTableData = props.alarmIssuedTableData;
      var bEquipmentTypeInTableData = false;
      for(var i = 0; i < AlarmIssuedTableData.length; i++) {
          if(AlarmIssuedTableData[i].machineTypeId == equipmentType[0].id) {
              bEquipmentTypeInTableData = true;
              document.getElementById("alarmIssued_cycle").value = AlarmIssuedTableData[i].cycle;
              document.getElementById("alarmIssued_alarmNumber").value = AlarmIssuedTableData[i].alarmNumber;
              document.getElementById("alarmIssued_responseTime").value = AlarmIssuedTableData[i].responseTime;
              document.getElementById("alarmIssued_tjUpdateCycle").value = AlarmIssuedTableData[i].updatetime;
              if(AlarmIssuedTableData[i].whetherSend == "true") {
                  document.getElementById("alarmRulesIssue_radio_yes").checked = true;
              }
              else {
                  document.getElementById("alarmRulesIssue_radio_no").checked = true;
              }

              var alarmIssuedRelArr = AlarmIssuedTableData[i].alarmIssuedRel.split(",");
              var selectedMonitorTypeIds = [];
              for(var i = 0; i < alarmIssuedRelArr.length; i++) {
                  // document.getElementById("alarmIssuedMonitorType_"+alarmIssuedRelArr[i].substring(0, alarmIssuedRelArr[i].indexOf("="))).checked = true;
                  selectedMonitorTypeIds.push("alarmIssuedMonitorType_"+alarmIssuedRelArr[i].substring(0, alarmIssuedRelArr[i].indexOf("=")));
              }
              this.setState({selectedMonitorTypeIds: selectedMonitorTypeIds});
              break;
          }
      }

      if(monitorType.length == 0) {
          document.getElementById('table-basic-alarmTypeDiv').style.height = '30px';
          document.getElementById('table-basic-alarmTypeDiv').style.lineHeight = '30px';
          document.getElementById('table-basic-checkboxedDiv').style.height = '30px';
      }
      else {
          document.getElementById('table-basic-checkboxedDiv').style.height = 'auto';
          document.getElementById('table-basic-alarmTypeDiv').style.height = document.getElementById('table-basic-checkboxedDiv').offsetHeight + 'px';
          document.getElementById('table-basic-alarmTypeDiv').style.lineHeight = document.getElementById('table-basic-checkboxedDiv').offsetHeight + 'px';
      }

      var tableColumns = [
          {
              title: '设备类型',
              field: 'machineType',
              sortable: false
          }, {
              title: '巡检周期(天)',
              field: 'cycle',
              sortable: false
          }, {
              title: '未处理告警数量',
              field: 'alarmNumber',
              sortable: false
          }, {
              title: '告警允许响应时长(小时)',
              field: 'responseTime',
              sortable: false
          }, {
              title: '周期内未达到告警数目是否发送告警',
              field: 'whetherSend',
              formatter: whetherSendFormatter,
              sortable: false
          }
      ];
      // if(enableEdit) {
      //     tableColumns.push(
      //         {
      //             title: '编辑',
      //             events: operateAlarmRulesEvents,
      //             formatter: editFormatter
      //         }
      //     );
      // }
      var level = localStorage.getItem("LEVEL");
      if(level == 1){
          // if(enableDelete) {
              tableColumns.push(
                  {
                      title: '删除',
                      events: operateAlarmRulesEvents,
                      formatter: deleteFormatter
                  }
              );
          // }
      };

      $('#alarmRulesIssueTable').bootstrapTable({
          columns: tableColumns,
          data: props.alarmIssuedTableData,
          onClickRow: this.showEventInfo
      });
    },
    componentDidMount: function() {
        // dateChange.changeViewStyle();
        var level = localStorage.getItem("LEVEL");
        // console.log(level);

        if(level>1){
            $("#alarmRulesIssueView_desView").find(".btnSave").hide();
        }
        else {
            this.setState({enableChange: true});
        };
        if(document.getElementById('alarmRulesIssueView_desView') != null) {
            document.getElementById('alarmRulesIssueView_desView').style.height = $(window).height() - 110 - 30 + 'px';
        }

        $(window).resize(function () {
            if(document.getElementById('alarmRulesIssueView_desView') != null) {
                document.getElementById('alarmRulesIssueView_desView').style.height = $(window).height() - 110 - 30 + 'px';
            }

            $('#alarmRulesIssueTable').bootstrapTable('resetView');
        });
    },

    componentDidUpdate: function() {
        if(this.state.monitorType.length == 0) {
            document.getElementById('table-basic-alarmTypeDiv').style.height = '30px';
            document.getElementById('table-basic-alarmTypeDiv').style.lineHeight = '30px';
            document.getElementById('table-basic-checkboxedDiv').style.height = '30px';
        }
        else {
            document.getElementById('table-basic-checkboxedDiv').style.height = 'auto';
            document.getElementById('table-basic-alarmTypeDiv').style.height = document.getElementById('table-basic-checkboxedDiv').offsetHeight + 'px';
            document.getElementById('table-basic-alarmTypeDiv').style.lineHeight = document.getElementById('table-basic-checkboxedDiv').offsetHeight + 'px';
        }

        for(var i = 0; i < this.state.monitorType.length; i++) {
            var bSelected = false;
            for(var j = 0; j < this.state.selectedMonitorTypeIds.length; j++) {
                if("alarmIssuedMonitorType_"+this.state.monitorType[i].savename == this.state.selectedMonitorTypeIds[j]) {
                    bSelected = true;
                    document.getElementById("alarmIssuedMonitorType_"+this.state.monitorType[i].savename).checked = true;
                    break;
                }
            }
            if(!bSelected) {
                document.getElementById("alarmIssuedMonitorType_"+this.state.monitorType[i].savename).checked = false;
            }
        }

        $('#alarmRulesIssueTable').bootstrapTable('refreshOptions', {data: this.props.alarmIssuedTableData});
    },

    showEventInfo: function(row, element) {
        var alarmIssuedEquipmentType = this.props.alarmIssuedEquipmentType[0];
        for (var key in alarmIssuedEquipmentType)
        {
            if(alarmIssuedEquipmentType[key] == row.machineTypeId) {
                this.setState({selectedEquipmentType: {id: alarmIssuedEquipmentType[key], name: key}});
            }
        }
        document.getElementById("alarmIssued_cycle").value = row.cycle;
        document.getElementById("alarmIssued_alarmNumber").value = row.alarmNumber;
        document.getElementById("alarmIssued_responseTime").value = row.responseTime;
        document.getElementById("alarmIssued_tjUpdateCycle").value = row.updatetime;
        if(row.whetherSend == "true") {
            document.getElementById("alarmRulesIssue_radio_yes").checked = true;
        }
        else {
            document.getElementById("alarmRulesIssue_radio_no").checked = true;
        }

        var monitorType = [];
        var alarmIssuedMonitorType = this.props.alarmIssuedMonitorType[0];
        for (var key in alarmIssuedMonitorType)
        {
            if(key == row.machineTypeId) {
                for(var i = 0; i < alarmIssuedMonitorType[key].length; i++) {
                    var strMonitorType = alarmIssuedMonitorType[key][i];
                    monitorType.push({showname: strMonitorType.substring(0, strMonitorType.indexOf("=")), savename: strMonitorType.substring(strMonitorType.indexOf("=")+1)});
                }
                break;
            }
        }
        this.setState({monitorType: monitorType});

        var alarmIssuedRelArr = row.alarmIssuedRel.split(",");
        var selectedMonitorTypeIds = [];
        for(var i = 0; i < alarmIssuedRelArr.length; i++) {
            // document.getElementById("alarmIssuedMonitorType_"+alarmIssuedRelArr[i].substring(0, alarmIssuedRelArr[i].indexOf("="))).checked = true;
            selectedMonitorTypeIds.push("alarmIssuedMonitorType_"+alarmIssuedRelArr[i].substring(0, alarmIssuedRelArr[i].indexOf("=")));
        }
        this.setState({selectedMonitorTypeIds: selectedMonitorTypeIds});
    },

    _handleSelectEquipmentType: function(e) {
        this.setState({selectedEquipmentType: e});

        var AlarmIssuedTableData = this.props.alarmIssuedTableData;
        var bEquipmentTypeInTableData = false;
        for(var i = 0; i < AlarmIssuedTableData.length; i++) {
            if(AlarmIssuedTableData[i].machineTypeId == e.id) {
                bEquipmentTypeInTableData = true;
                document.getElementById("alarmIssued_cycle").value = AlarmIssuedTableData[i].cycle;
                document.getElementById("alarmIssued_alarmNumber").value = AlarmIssuedTableData[i].alarmNumber;
                document.getElementById("alarmIssued_responseTime").value = AlarmIssuedTableData[i].responseTime;
                document.getElementById("alarmIssued_tjUpdateCycle").value = AlarmIssuedTableData[i].updatetime;
                if(AlarmIssuedTableData[i].whetherSend == "true") {
                    document.getElementById("alarmRulesIssue_radio_yes").checked = true;
                }
                else {
                    document.getElementById("alarmRulesIssue_radio_no").checked = true;
                }

                var alarmIssuedRelArr = AlarmIssuedTableData[i].alarmIssuedRel.split(",");
                var selectedMonitorTypeIds = [];
                for(var i = 0; i < alarmIssuedRelArr.length; i++) {
                    // document.getElementById("alarmIssuedMonitorType_"+alarmIssuedRelArr[i].substring(0, alarmIssuedRelArr[i].indexOf("="))).checked = true;
                    selectedMonitorTypeIds.push("alarmIssuedMonitorType_"+alarmIssuedRelArr[i].substring(0, alarmIssuedRelArr[i].indexOf("=")));
                }
                _this.setState({selectedMonitorTypeIds: selectedMonitorTypeIds});
                break;
            }
        }
        if(!bEquipmentTypeInTableData) {
            document.getElementById("alarmIssued_cycle").value = "";
            document.getElementById("alarmIssued_alarmNumber").value = "";
            document.getElementById("alarmIssued_responseTime").value = "";
            document.getElementById("alarmIssued_tjUpdateCycle").value = "";
            document.getElementById("alarmRulesIssue_radio_yes").checked = true;
            this.setState({selectedMonitorTypeIds: []});
        }

        var monitorType = [];
        var alarmIssuedMonitorType = this.props.alarmIssuedMonitorType[0];
        for (var key in alarmIssuedMonitorType)
        {
            if(key == e.id) {
                for(var i = 0; i < alarmIssuedMonitorType[key].length; i++) {
                    var strMonitorType = alarmIssuedMonitorType[key][i];
                    monitorType.push({showname: strMonitorType.substring(0, strMonitorType.indexOf("=")), savename: strMonitorType.substring(strMonitorType.indexOf("=")+1)});
                }
                break;
            }
        }
        this.setState({monitorType: monitorType});
    },

    _handleOnClickSave: function() {
        var AlarmIssuedTableData = this.props.alarmIssuedTableData;
        var bEquipmentTypeInTableData = false;
        for(var i = 0; i < AlarmIssuedTableData.length; i++) {
            if(AlarmIssuedTableData[i].machineTypeId == this.state.selectedEquipmentType.id) {
                bEquipmentTypeInTableData = true;
            }
        }
        if(bEquipmentTypeInTableData && !this.state.enableChange) {
          $.showPublicDialog("提示","当前用户没有修改告警规则下发的权限。");
          return;
        }
        else if(!bEquipmentTypeInTableData && !this.state.enableChange) {
          $.showPublicDialog("提示","当前用户没有添加告警规则下发的权限。");
          return;
        }

        var cycle = $.trim(document.getElementById("alarmIssued_cycle").value);
        if(cycle==null||cycle=="") {
          $.showPublicDialog("提示","请填写巡检周期。");
          return;
        }else if(!Tools.checkNumStr(cycle)){
          $.showPublicDialog("提示","无效的巡检周期。");
          return;
        };
        var alarmNumber = $.trim(document.getElementById("alarmIssued_alarmNumber").value);
        if(alarmNumber==null||alarmNumber=="") {
          $.showPublicDialog("提示","请填写未处理告警数。");
          return;
        }else if(!Tools.checkNumStr(alarmNumber)){
          $.showPublicDialog("提示","无效的未处理告警数。");
          return;
        };
        var responseTime = $.trim(document.getElementById("alarmIssued_responseTime").value);
        if(responseTime==null||responseTime=="") {
          $.showPublicDialog("提示","请填写告警允许响应时长。");
          return;
        }else if(!Tools.checkNumStr(responseTime)){
          $.showPublicDialog("提示","无效的告警允许响应时长。");
          return;
        };
        var tjUpdateCycle = $.trim(document.getElementById("alarmIssued_tjUpdateCycle").value);
        if(tjUpdateCycle==null||tjUpdateCycle=="") {
          $.showPublicDialog("提示","请填写厅级告警升级周期。");
          return;
        }else if(!Tools.checkNumStr(tjUpdateCycle)){
          $.showPublicDialog("提示","无效的厅级告警升级周期。");
          return;
        };
        var params = [];
        params.push({key: "MachineType", value: this.state.selectedEquipmentType.name});
        params.push({key: "MachineTypeId", value: this.state.selectedEquipmentType.id});
        params.push({key: "WhetherSend", value: document.getElementById("alarmRulesIssue_radio_yes").checked==true?"true":"false"});
        params.push({key: "Cycle", value: document.getElementById("alarmIssued_cycle").value});
        params.push({key: "AlarmNumber", value: document.getElementById("alarmIssued_alarmNumber").value});
        params.push({key: "ResponseTime", value: document.getElementById("alarmIssued_responseTime").value});
        params.push({key: "UpdateTime", value: document.getElementById("alarmIssued_tjUpdateCycle").value});

        var strAlarmIssuedRel = "";
        var selectedMonitorTypeIds = [];
        for(var i = 0; i < this.state.monitorType.length; i++) {
            if(document.getElementById("alarmIssuedMonitorType_"+this.state.monitorType[i].savename).checked == true) {
                strAlarmIssuedRel += (strAlarmIssuedRel.length==0?"":",") + this.state.monitorType[i].savename + "=" + this.state.monitorType[i].showname;
                selectedMonitorTypeIds.push("alarmIssuedMonitorType_"+this.state.monitorType[i].savename);
            }
        }
        params.push({key: "AlarmIssuedRel", value: strAlarmIssuedRel});

        var _this = this;
        // setTimeout(function () {
            _this.props.setAlarmIssued(params);
            _this.setState({selectedMonitorTypeIds: selectedMonitorTypeIds});
            _this.props.getAlarmIssued();
            // $('#alarmRulesIssueTable').bootstrapTable('refreshOptions', {data: _this.props.alarmIssuedTableData});
        // }, 100);
    },

    render: function() {
        var _this = this;
        return (
            <div id="alarmRulesIssueView_desView" className='overviewDesViewDiv alarmRulesIssueView'>
                <div className="operationButtons">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            厅级升级配置
                        </div>
                        <div className="titleRight">
                            <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                            <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="buttonInfo">
                            <p>厅级升级配置的功能：编辑组织中单位接收到被监测资源的触发告警规则，并向该单位下级发布，包括：告警的规则的设备类型、巡检周期、未处理告警数、告警允许响应时长、周期未达数是否告警、告警类型、厅级告警升级周期等。</p>
                            <button className="btn btnSave" onClick={this._handleOnClickSave}>保存</button>
                        </div>
                    </div>
                </div>
                <div className='operationCreateTableDiv col-md-12'>
                    <div className='table-basic col-md-12'>
                        <div className="table-basic-row col-md-12 no-bottom-border">
                            <div className="col-md-4">
                                <div className="table-basic-h1 col-md-6">设备类型</div>
                                <div className="table-basic-h1-input col-md-6">
                                    <ReactWidgets.DropdownList className='form-control dropdownStyle col-md-12' data={this.state.equipmentType} value={this.state.selectedEquipmentType} textField='name' onChange={this._handleSelectEquipmentType}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="table-basic-h1 col-md-6">巡检周期(天)</div>
                                <div className="table-basic-h1-input col-md-6"><input id="alarmIssued_cycle" type="number" className="input-xlarge col-md-12" min="0"/></div>
                            </div>
                            <div className="col-md-4">
                                <div className="table-basic-h1 col-md-6">未处理告警数</div>
                                <div className="table-basic-h1-input col-md-6"><input id="alarmIssued_alarmNumber" type="number" className="input-xlarge col-md-12" min="0"/></div>
                            </div>
                            <div className="col-md-4">
                                <div className="table-basic-h1 col-md-6 no-bottom-border">告警允许响应时长(小时)</div>
                                <div className="table-basic-h1-input col-md-6 no-bottom-border"><input id="alarmIssued_responseTime" type="number" className="input-xlarge col-md-12" min="0"/></div>
                            </div>
                            <div className="col-md-4">
                                <div className="table-basic-h1 col-md-6 no-bottom-border">周期内未达到告警数目是否发送告警</div>
                                <div className="table-basic-h1 col-md-6 no-bottom-border">
                                    <label className="radioLabel">
                                        <input id="alarmRulesIssue_radio_yes" type="radio" name="alarmRulesIssue_radio" value="1" defaultChecked="true"/> 是
                                    </label>
                                    <label className="radioLabel">
                                        <input id="alarmRulesIssue_radio_no" type="radio" name="alarmRulesIssue_radio" value="0"/> 否
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="table-basic-row col-md-12">
                            <div id="table-basic-alarmTypeDiv" className="table-basic-alarmTypeDiv col-md-2">告警类型</div>
                            <div id="table-basic-checkboxedDiv" className="table-basic-checkboxedDiv col-md-10">
                                {this.state.monitorType.map(function(monitorType) {
                                    return (
                                        <label className="radioLabel">
                                            <input id={"alarmIssuedMonitorType_"+monitorType.savename} type="checkbox" name="alarmRulesIssue_checkbox" defaultChecked={false}/> {monitorType.showname}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='table-basic col-md-12'>
                        <div className="table-basic-row col-md-12">
                            <div className="table-basic-h1 col-md-2">厅级告警升级周期(天)</div>
                            <div className="table-basic-h1-input col-md-10"><input id="alarmIssued_tjUpdateCycle" type="number" className="input-xlarge col-md-12" min="0"/></div>
                        </div>
                    </div>
                    <div className="contentline col-md-12"/>
                    <table id='alarmRulesIssueTable'
                           data-toggle='table'
                           data-classes='table table-no-bordered table-hover'
                           data-height={450}>
                    </table>
                </div>
            </div>
        );
    }
});

module.exports = AlarmRulesIssueView_desView;
