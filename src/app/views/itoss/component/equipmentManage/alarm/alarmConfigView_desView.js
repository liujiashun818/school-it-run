/**
 * Created by SHIN on 2016/1/14.
 * 视频阀值设置主窗口
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

var monitorTypeData = ['摄像机','DVR','NVR','编码器','IPSAN'];
function errorFormatter(value, row) {
    return value.replace(/,/g, row.isor_error == "false"?" 与 ":" 或 ");
}

function warningFormatter(value, row) {
    return value.replace(/,/g, row.isor_warning == "false"?" 与 ":" 或 ");
}

function goodFormatter(value, row) {
    return value.replace(/,/g, row.isor_good == "false"?" 与 ":" 或 ");
}

var AlarmConfigView_desView = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss_Monitor:flux.store("YFTDeviceMonitorStore").getState()
    //     }
    // },

    getInitialState: function () {
        return {
            selectedMonitorTypeName: monitorTypeData[0],
            selectedAlarmRule: null,
            enableAdd: false,
            enableEdit: false
        }
    },

    componentWillMount: function() {
        this.props.setErrorAlarmText("");
        this.props.setWarningAlarmText("");
        this.props.setGoodAlarmText("");
        this.props.setErrorConditionsData([]);
        this.props.setSettingErrorConditionsData([]);
        this.props.setIsOrError("false");
        this.props.setSettingIsOrError("false");
        this.props.setWarningConditionsData([]);
        this.props.setSettingWarningConditionsData([]);
        this.props.setIsOrWarning("false");
        this.props.setSettingIsOrWarning("false");
        this.props.setGoodConditionsData([]);
        this.props.setSettingGoodConditionsData([]);
        this.props.setIsOrGood("false");
        this.props.setSettingIsOrGood("false");
    },
    shouldComponentUpdate: function(nextProps, nextState){
      if (nextProps.yftAlarmRuleData !== this.props.yftAlarmRuleData) {
        this.handleYftALarmRuleData(nextProps);
      }
      return true;
    },

    handleYftALarmRuleData: function(props){
      var bInAlarm = false;
      var alarmData = props.yftAlarmData;
      var alarmRuleData = props.yftAlarmRuleData;
      this.setState({selectedAlarmRule: alarmRuleData[0]});
      // console.log(alarmRuleData,"11111111111111111111111111111");
      // var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
      for(var i = 0; i < alarmData.length; i++) {
          if(alarmData[i].type == this.state.selectedMonitorTypeName) {
              bInAlarm = true;
              props.setErrorAlarmText(alarmData[i].errorAlarm.replace(/,/g, alarmData[i].isor_error == "false"?" 与 ":" 或 "));
              props.setWarningAlarmText(alarmData[i].warningAlarm.replace(/,/g, alarmData[i].isor_warning == "false"?" 与 ":" 或 "));
              props.setGoodAlarmText(alarmData[i].goodAlarm.replace(/,/g, alarmData[i].isor_good == "false"?" 与 ":" 或 "));

              var errorConditionsData = [];
              if(alarmData[i].errorAlarm != "") {
                  var errorAlarmArr = alarmData[i].errorAlarm.split(",");
                  for(var j = 0; j < errorAlarmArr.length; j++) {
                      var conditionName = errorAlarmArr[j].substring(0, errorAlarmArr[j].indexOf(" "));
                      var conditionSymbol = errorAlarmArr[j].substring(errorAlarmArr[j].indexOf(" ")+1, errorAlarmArr[j].lastIndexOf(" "));
                      var conditionValue = errorAlarmArr[j].substring(errorAlarmArr[j].lastIndexOf(" ")+1);
                      errorConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
                  }
              }
              props.setErrorConditionsData(errorConditionsData);
              props.setSettingErrorConditionsData(errorConditionsData);
              props.setIsOrError(alarmData[i].isor_error);
              props.setSettingIsOrError(alarmData[i].isor_error);

              var warningConditionsData = [];
              if(alarmData[i].warningAlarm != "") {
                  var warningAlarmArr = alarmData[i].warningAlarm.split(",");
                  for(var j = 0; j < warningAlarmArr.length; j++) {
                      var conditionName = warningAlarmArr[j].substring(0, warningAlarmArr[j].indexOf(" "));
                      var conditionSymbol = warningAlarmArr[j].substring(warningAlarmArr[j].indexOf(" ")+1, warningAlarmArr[j].lastIndexOf(" "));
                      var conditionValue = warningAlarmArr[j].substring(warningAlarmArr[j].lastIndexOf(" ")+1);
                      warningConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
                  }
              }
              props.setWarningConditionsData(warningConditionsData);
              props.setSettingWarningConditionsData(warningConditionsData);
              props.setIsOrWarning(alarmData[i].isor_warning);
              props.setSettingIsOrWarning(alarmData[i].isor_warning);

              var goodConditionsData = [];
              if(alarmData[i].goodAlarm != "") {
                  var goodAlarmArr = alarmData[i].goodAlarm.split(",");
                  for(var j = 0; j < goodAlarmArr.length; j++) {
                      var conditionName = goodAlarmArr[j].substring(0, goodAlarmArr[j].indexOf(" "));
                      var conditionSymbol = goodAlarmArr[j].substring(goodAlarmArr[j].indexOf(" ")+1, goodAlarmArr[j].lastIndexOf(" "));
                      var conditionValue = goodAlarmArr[j].substring(goodAlarmArr[j].lastIndexOf(" ")+1);
                      goodConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
                  }
              }
              props.setGoodConditionsData(goodConditionsData);
              props.setSettingGoodConditionsData(goodConditionsData);
              props.setIsOrGood(alarmData[i].isor_good);
              props.setSettingIsOrGood(alarmData[i].isor_good);
              break;
          }
      }

      if(!bInAlarm) {
        props.setErrorAlarmText("");
        props.setWarningAlarmText("");
        props.setGoodAlarmText("");
        props.setErrorConditionsData([]);
        props.setSettingErrorConditionsData([]);
        props.setIsOrError("false");
        props.setSettingIsOrError("false");
        props.setWarningConditionsData([]);
        props.setSettingWarningConditionsData([]);
        props.setIsOrWarning("false");
        props.setSettingIsOrWarning("false");
        props.setGoodConditionsData([]);
        props.setSettingGoodConditionsData([]);
        props.setIsOrGood("false");
        props.setSettingIsOrGood("false");
      }
    },

    componentDidMount: function() {
        // dateChange.changeViewStyle();
        if(document.getElementById('alarmConfigView_desView') != null) {
            document.getElementById('alarmConfigView_desView').style.height = $(window).height() - 110 - 30 + 'px';
        }

        var temp = localStorage.getItem("PERMISSIONS");
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var permissionsValue = eval(temp);
        var enableAdd = false, enableEdit = false;
        for(var i = 0; i < permissionsValue.length; i++) {
            if(permissionsValue[i].resourceType == "/equipmentmanage/setting/alarmconfig/add") {
                enableAdd = true;
                this.setState({enableAdd: true});
            }
            else if(permissionsValue[i].resourceType == "/equipmentmanage/setting/alarmconfig/update") {
                enableEdit = true;
                this.setState({enableEdit: true});
            }
        }
        if(!enableAdd && !enableEdit) {
            $("#alarmConfigView_saveBtn").hide();
        }

        $('#alarmConfigTable').bootstrapTable({
            columns: [
                {
                    title: '设备类型',
                    field: 'type',
                    sortable: false
                }, {
                    title: '告警规则',
                    field: 'alarmname',
                    sortable: false
                }, {
                    title: '错误',
                    field: 'errorAlarm',
                    formatter: errorFormatter,
                    sortable: false
                }, {
                    title: '危险',
                    field: 'warningAlarm',
                    formatter: warningFormatter,
                    sortable: false
                }, {
                    title: '正常',
                    field: 'goodAlarm',
                    formatter: goodFormatter,
                    sortable: false
                }
            ],
            data: [],//this.getFlux().store("YFTDeviceMonitorStore").getState().YFTAlarmData
            onClickRow: this._handleOnClickRow
        });
        $(window).resize(function () {
            if(document.getElementById('alarmConfigView_desView') != null) {
                document.getElementById('alarmConfigView_desView').style.height = $(window).height() - 110 - 30 + 'px';
            }

            $('#alarmConfigTable').bootstrapTable('resetView');
        });
    },
    componentDidUpdate:function(){
      var alarmData = this.props.yftAlarmData;
    //   $('#alarmConfigTable').bootstrapTable('load',alarmData);
      $('#alarmConfigTable').bootstrapTable('refreshOptions', {data: alarmData});
    },

    _handleOnClickRow: function(row, element) {
        // var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;

        this.setState({selectedMonitorTypeName: row.type});
        this.setState({selectedAlarmRule: {alarmName:row.alarmname, recId:row.alarmconfig}});
        this.props.setErrorAlarmText(row.errorAlarm.replace(/,/g, row.isor_error == "false"?" 与 ":" 或 "));
        this.props.setWarningAlarmText(row.warningAlarm.replace(/,/g, row.isor_warning == "false"?" 与 ":" 或 "));
        this.props.setGoodAlarmText(row.goodAlarm.replace(/,/g, row.isor_good == "false"?" 与 ":" 或 "));

        var errorConditionsData = [];
        if(row.errorAlarm != "") {
            var errorAlarmArr = row.errorAlarm.split(",");
            for(var j = 0; j < errorAlarmArr.length; j++) {
                var conditionName = errorAlarmArr[j].substring(0, errorAlarmArr[j].indexOf(" "));
                var conditionSymbol = errorAlarmArr[j].substring(errorAlarmArr[j].indexOf(" ")+1, errorAlarmArr[j].lastIndexOf(" "));
                var conditionValue = errorAlarmArr[j].substring(errorAlarmArr[j].lastIndexOf(" ")+1);
                errorConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
            }
        }
        this.props.setErrorConditionsData(errorConditionsData);
        this.props.setSettingErrorConditionsData(errorConditionsData);
        this.props.setIsOrError(row.isor_error);
        this.props.setSettingIsOrError(row.isor_error);

        var warningConditionsData = [];
        if(row.warningAlarm != "") {
            var warningAlarmArr = row.warningAlarm.split(",");
            for(var j = 0; j < warningAlarmArr.length; j++) {
                var conditionName = warningAlarmArr[j].substring(0, warningAlarmArr[j].indexOf(" "));
                var conditionSymbol = warningAlarmArr[j].substring(warningAlarmArr[j].indexOf(" ")+1, warningAlarmArr[j].lastIndexOf(" "));
                var conditionValue = warningAlarmArr[j].substring(warningAlarmArr[j].lastIndexOf(" ")+1);
                warningConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
            }
        }
        this.props.setWarningConditionsData(warningConditionsData);
        this.props.setSettingWarningConditionsData(warningConditionsData);
        this.props.setIsOrWarning(row.isor_warning);
        this.props.setSettingIsOrWarning(row.isor_warning);

        var goodConditionsData = [];
        if(row.goodAlarm != "") {
            var goodAlarmArr = row.goodAlarm.split(",");
            for(var j = 0; j < goodAlarmArr.length; j++) {
                var conditionName = goodAlarmArr[j].substring(0, goodAlarmArr[j].indexOf(" "));
                var conditionSymbol = goodAlarmArr[j].substring(goodAlarmArr[j].indexOf(" ")+1, goodAlarmArr[j].lastIndexOf(" "));
                var conditionValue = goodAlarmArr[j].substring(goodAlarmArr[j].lastIndexOf(" ")+1);
                goodConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
            }
        }
        this.props.setGoodConditionsData(goodConditionsData);
        this.props.setSettingGoodConditionsData(goodConditionsData);
        this.props.setIsOrGood(row.isor_good);
        this.props.setSettingIsOrGood(row.isor_good);
    },

    _handleOnSelectTypeName: function(e) {
        this.setState({selectedMonitorTypeName: e});
        var that = this;
        var bInAlarm = false;
        var alarmData = this.props.yftAlarmData;

        // var yftDeviceMonitorAction = this.getFlux().actions.YFTDeviceMonitorActions;
        for(var i = 0; i < alarmData.length; i++) {
            if(alarmData[i].type == e) {
                bInAlarm = true;
                this.setState({selectedAlarmRule: {alarmName:alarmData[i].alarmname, recId:alarmData[i].alarmconfig}});

                that.props.setErrorAlarmText(alarmData[i].errorAlarm.replace(/,/g, alarmData[i].isor_error == "false"?" 与 ":" 或 "));
                that.props.setWarningAlarmText(alarmData[i].warningAlarm.replace(/,/g, alarmData[i].isor_warning == "false"?" 与 ":" 或 "));
                that.props.setGoodAlarmText(alarmData[i].goodAlarm.replace(/,/g, alarmData[i].isor_good == "false"?" 与 ":" 或 "));

                var errorConditionsData = [];
                if(alarmData[i].errorAlarm != "") {
                    var errorAlarmArr = alarmData[i].errorAlarm.split(",");
                    for(var j = 0; j < errorAlarmArr.length; j++) {
                        var conditionName = errorAlarmArr[j].substring(0, errorAlarmArr[j].indexOf(" "));
                        var conditionSymbol = errorAlarmArr[j].substring(errorAlarmArr[j].indexOf(" ")+1, errorAlarmArr[j].lastIndexOf(" "));
                        var conditionValue = errorAlarmArr[j].substring(errorAlarmArr[j].lastIndexOf(" ")+1);
                        errorConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
                    }
                }
                that.props.setErrorConditionsData(errorConditionsData);
                that.props.setSettingErrorConditionsData(errorConditionsData);
                that.props.setIsOrError(alarmData[i].isor_error);
                that.props.setSettingIsOrError(alarmData[i].isor_error);

                var warningConditionsData = [];
                if(alarmData[i].warningAlarm != "") {
                    var warningAlarmArr = alarmData[i].warningAlarm.split(",");
                    for(var j = 0; j < warningAlarmArr.length; j++) {
                        var conditionName = warningAlarmArr[j].substring(0, warningAlarmArr[j].indexOf(" "));
                        var conditionSymbol = warningAlarmArr[j].substring(warningAlarmArr[j].indexOf(" ")+1, warningAlarmArr[j].lastIndexOf(" "));
                        var conditionValue = warningAlarmArr[j].substring(warningAlarmArr[j].lastIndexOf(" ")+1);
                        warningConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
                    }
                }
                that.props.setWarningConditionsData(warningConditionsData);
                that.props.setSettingWarningConditionsData(warningConditionsData);
                that.props.setIsOrWarning(alarmData[i].isor_warning);
                that.props.setSettingIsOrWarning(alarmData[i].isor_warning);

                var goodConditionsData = [];
                if(alarmData[i].goodAlarm != "") {
                    var goodAlarmArr = alarmData[i].goodAlarm.split(",");
                    for(var j = 0; j < goodAlarmArr.length; j++) {
                        var conditionName = goodAlarmArr[j].substring(0, goodAlarmArr[j].indexOf(" "));
                        var conditionSymbol = goodAlarmArr[j].substring(goodAlarmArr[j].indexOf(" ")+1, goodAlarmArr[j].lastIndexOf(" "));
                        var conditionValue = goodAlarmArr[j].substring(goodAlarmArr[j].lastIndexOf(" ")+1);
                        goodConditionsData.push({conditionName: conditionName, conditionSymbol: conditionSymbol, conditionValue: conditionValue});
                    }
                }
                that.props.setGoodConditionsData(goodConditionsData);
                that.props.setSettingGoodConditionsData(goodConditionsData);
                that.props.setIsOrGood(alarmData[i].isor_good);
                that.props.setSettingIsOrGood(alarmData[i].isor_good);
                break;
            }
        }

        if(!bInAlarm) {
            var alarmRuleData = that.props.yftAlarmRuleData;
            that.setState({selectedAlarmRule: alarmRuleData[0]});
            that.props.setErrorAlarmText("");
            that.props.setWarningAlarmText("");
            that.props.setGoodAlarmText("");
            that.props.setErrorConditionsData([]);
            that.props.setSettingErrorConditionsData([]);
            that.props.setIsOrError("false");
            that.props.setSettingIsOrError("false");
            that.props.setWarningConditionsData([]);
            that.props.setSettingWarningConditionsData([]);
            that.props.setIsOrWarning("false");
            that.props.setSettingIsOrWarning("false");
            that.props.setGoodConditionsData([]);
            that.props.setSettingGoodConditionsData([]);
            that.props.setIsOrGood("false");
            that.props.setSettingIsOrGood("false");
        }
    },

    _handleOnSelectAlarmRule: function(e) {
        this.setState({selectedAlarmRule: e});
    },

    _handleOnClickSave: function() {
        var alarmConfigTableData = this.props.yftAlarmData;
        var bTypeInTableData = false;
        for(var i = 0; i < alarmConfigTableData.length; i++) {
            if(alarmConfigTableData[i].type == this.state.selectedMonitorTypeName) {
                bTypeInTableData = true;
            }
        }
        if(bTypeInTableData && !this.state.enableEdit) {
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示";
            document.getElementById('publicMessageModalcontent').innerHTML = "当前用户没有修改告警配置的权限";
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        }
        else if(!bTypeInTableData && !this.state.enableAdd) {
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示";
            document.getElementById('publicMessageModalcontent').innerHTML = "当前用户没有添加告警配置的权限";
            $('#publicMessageModal').modal('show');
          },100);
          return false;
        }

        var storageType = "", isor_error = "", isor_warning = "", isor_good = "", errorAlarm = "", warningAlarm = "", goodAlarm = "";
        switch (this.state.selectedMonitorTypeName) {
            case "摄像机":
                storageType = "VIDEOALARMRESULT";
                break;
            case "DVR":
                storageType = "DVRALARMRESULT";
                break;
            case "NVR":
                storageType = "NVRALARMRESULT";
                break;
            case "编码器":
                storageType = "CODERALARMRESULT";
                break;
            case "IPSAN":
                storageType = "IPSANALARMRESULT";
                break;
        }
        isor_error = this.props.isOrError;
        isor_warning = this.props.isOrWarning;
        isor_good = this.props.isOrGood;

        var errorConditionsData = this.props.errorConditionsData;
        for (var i = 0; i < errorConditionsData.length; i++) {
            var conditionName;
            for(var key in this.props.yftAlarmTypeData) {
                if(this.props.yftAlarmTypeData[key] == errorConditionsData[i].conditionName) {
                    conditionName = key;
                    break;
                }
            }
            errorAlarm += (i==0?"":",") + conditionName + " " + errorConditionsData[i].conditionSymbol + " " + errorConditionsData[i].conditionValue;
        }

        var warningConditionsData = this.props.warningConditionsData;
        for (var i = 0; i < warningConditionsData.length; i++) {
            var conditionName;
            for(var key in this.props.yftAlarmTypeData) {
                if(this.props.yftAlarmTypeData[key] == warningConditionsData[i].conditionName) {
                    conditionName = key;
                    break;
                }
            }
            warningAlarm += (i==0?"":",") + conditionName + " " + warningConditionsData[i].conditionSymbol + " " + warningConditionsData[i].conditionValue;
        }

        var goodConditionsData = this.props.goodConditionsData;
        for (var i = 0; i < goodConditionsData.length; i++) {
            var conditionName;
            for(var key in this.props.yftAlarmTypeData) {
                if(this.props.yftAlarmTypeData[key] == goodConditionsData[i].conditionName) {
                    conditionName = key;
                    break;
                }
            }
            goodAlarm += (i==0?"":",") + conditionName + " " + goodConditionsData[i].conditionSymbol + " " + goodConditionsData[i].conditionValue;
        }

        var params = [
            {key: "STORAGETYPE", value: storageType},
            {key: "ISOR_ERROR", value: isor_error},
            {key: "ISOR_WARNING", value: isor_warning},
            {key: "ISOR_GOOD", value: isor_good},
            {key: "ERRORALARM", value: errorAlarm},
            {key: "WARNINGALARM", value: warningAlarm},
            {key: "GOODALARM", value: goodAlarm},
            {key: "ALARMCONFIGRECID", value: this.state.selectedAlarmRule.recId}
        ];
        var _this = this;
        // setTimeout(function () {
            _this.props.setYFTAlarm(params);
            // _this.props.getYFTAlarm();
            // $('#alarmConfigTable').bootstrapTable('refreshOptions', {data: _this.props.yftAlarmData});
        // }, 100);

    },
    changeTextView:function(){

    },
    render: function() {
        return (
            <div id="alarmConfigView_desView" className='overviewDesViewDiv alarmConfigView'>
                <div className="operationButtons">
                    <div className="titleDiv col-md-12">
                        <div className="titleLeft">
                            视频阀值设置
                        </div>
                        <div className="titleRight">
                            <a href="javascript:void(0)"><i className="fa fa-question-circle"></i></a>
                            <a href="javascript:void(0)"><i className="fa fa-cog" style={{marginLeft: '8px'}}></i></a>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="buttonInfo">
                            <p>编辑设置或者批量设置视频类设备：DVR、NVR、IPSAN、摄像机、编码器的功能属性，包括监测生成事件后告警、基础信息、报警条件、错误校验等。</p>
                            <button id="alarmConfigView_saveBtn" className="btn btnSave" onClick={this._handleOnClickSave}>保存</button>
                        </div>
                    </div>
                </div>
                <div className='operationCreateTableDiv col-md-12'>
                    <div className='table-basic col-md-12'>
                        <div className="table-basic-row col-md-3">
                            <div className="table-basic-h1 width3 no-bottom-border">设备类型</div>
                            <div className="table-basic-h1-input width4 no-bottom-border">
                                <ReactWidgets.DropdownList id="alarmConfig-monitorType" className='form-control dropdownStyle col-md-12' data={monitorTypeData} value={this.state.selectedMonitorTypeName} onChange={this._handleOnSelectTypeName}/>
                            </div>
                        </div>
                        <div className="table-basic-row col-md-3">
                            <div className="table-basic-h1 width3 no-bottom-border">告警规则</div>
                            <div className="table-basic-h1-input width4 no-bottom-border">
                                <ReactWidgets.DropdownList id="alarmConfig-alarmRule" className='form-control dropdownStyle col-md-12' data={this.props.yftAlarmRuleData} textField="alarmName" value={this.state.selectedAlarmRule} onChange={this._handleOnSelectAlarmRule}/>
                            </div>
                        </div>
                        <div className="table-basic-row col-md-12">
                            <div className="table-basic-h2 rightBottomBorder width1"><span style={{padding:"0 5px"}}>错误</span></div>
                            <div className="table-basic-h2 rightBottomBorder width5">
                                <textarea id="textArea_errorAlarm" className="form-control" value={this.props.errorAlarmText} onChange={this.changeTextView}/>
                            </div>
                            <div className="table-basic-h2 textCenter rightBottomBorder width1">
                                <button type="button" className="btn btnEditCondition" data-toggle="modal" data-target="#editErrorConditionModal">编辑</button>
                            </div>
                            <div className="table-basic-h2 rightBottomBorder width1"><span style={{padding:"0 5px"}}>危险</span></div>
                            <div className="table-basic-h2 rightBottomBorder width5">
                                <textarea id="textArea_warningAlarm" className="form-control" value={this.props.warningAlarmText} onChange={this.changeTextView}/>
                            </div>
                            <div className="table-basic-h2 textCenter rightBottomBorder width1">
                                <button type="button" className="btn btnEditCondition" data-toggle="modal" data-target="#editWarningConditionModal">编辑</button>
                            </div>
                            <div className="table-basic-h2 rightBottomBorder width1"><span style={{padding:"0 5px"}}>正常</span></div>
                            <div className="table-basic-h2 rightBottomBorder width5">
                                <textarea id="textArea_goodAlarm" className="form-control" value={this.props.goodAlarmText} onChange={this.changeTextView}/>
                            </div>
                            <div className="table-basic-h2 textCenter rightBottomBorder width1">
                                <button type="button" className="btn btnEditCondition" data-toggle="modal" data-target="#editGoodConditionModal">编辑</button>
                            </div>
                        </div>
                    </div>
                    <div className="contentline col-md-12"/>
                    <table id='alarmConfigTable'
                           data-toggle='table'
                           data-classes='table table-no-bordered table-hover'
                           data-height={500}>
                    </table>
                </div>
            </div>
        );
    }
});

module.exports = AlarmConfigView_desView;
