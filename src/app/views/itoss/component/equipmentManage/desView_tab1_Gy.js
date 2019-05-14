/**
 * Created by SHIN on 2015/12/11.
 * 资源监测-统一监控平台-监测器概要
 */
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
require('bootstrap');
require('bootstrap-table');
var ReactWidgets = require('react-widgets');

var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var GyPic = require('./desView_tab1_GyPic.js');

$(window).resize(function(){
    // var height = $(window).height();
    // height = height-500;
    // $(".emWatchBasic").css("height",height+"px");
});

var GyView = React.createClass({
    // mixins: [Navigation, FluxMixin, StoreWatchMixin("YFTEquipmentStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("YFTEquipmentStore").getState()
    //     }
    // },
    componentDidMount:function(){
        // var height = $(window).height();
        // height = height-485;
        // $(".emWatchBasic").css("height",height+"px");
    },
    // changePicData:function(e){
    //     $("#inlineRadio1").click();
    //     var key = $($(e.target).parent("tr").find("td")[0]).text();
    //     $(".picDataSelect").find("option").each(function(){
    //         var name = $(this).val();
    //         if(name==key){
    //             // $(this).click();
    //             $(this).context.selected = true;
    //         };
    //     });
    //     this.getFlux().actions.YFTEquipmentActions.change_picData(key);
    // },
    render: function() {
        const { curTowHourValue, funcValue, logGood, logError, logDanger, logBan, goodAlarm, warningAlarm, errorAlarm, selectedMonitorName, onClickRow,
                curTowHourName, twoHoursReport, onSelectChangePicData } = this.props;
        var that = this;
        var curTval = curTowHourValue;
        var beginTime = "";
        var endTime = "";
        if(curTval.length>0){
            var keyList = [];
            for(var i=0;i<curTval.length;i++){
                var curMap = curTval[i].split("$");
                keyList.push(curMap[1]);
            };
            beginTime = keyList[0];
            endTime = keyList[keyList.length-1];
        };
        var funcVal = funcValue;
        if(funcVal && funcVal.length>0){
            var rowList = [];
            for(var i=0;i<funcVal.length;i++){
                rowList.push((<tr key={i} onClick={onClickRow}><td>{funcVal[i].MonitorEntry}</td><td>{funcVal[i].max}</td><td>{funcVal[i].avg}</td><td>{funcVal[i].min}</td><td>{funcVal[i].new}</td></tr>))
            };
        };
        // var selectedMonitorName = this.getFlux().store("YFTEquipmentStore").getState().SelectedMonitorName;
        return (
            <div className="emWatchBasic">
                <div className="emWatchBasicHead">
                    <label style={{fontSize:"18px"}}>监测器概要{selectedMonitorName!="" ? "："+selectedMonitorName : ""}</label>
                </div>
                <div className="emWatchBasicParamDiv">
                    <table>
                        <tbody>
                        <tr>
                            <td className="tdParam">正&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;常：</td>
                            <td className="tdSuccess">{logGood}条</td>
                            <td className="tdParam">危&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;险：</td>
                            <td className="tdDanger">{logDanger}条</td>
                            <td className="tdParam">错&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;误：</td>
                            <td className="tdWrong">{logError}条</td>
                            <td className="tdParam">禁&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;止：</td>
                            <td className="tdLimit">{logBan}条</td>
                        </tr>
                        <tr>
                            <td className="tdParam">正常阀值：</td>
                            <td>{goodAlarm}</td>
                            <td className="tdParam">危险阀值：</td>
                            <td>{warningAlarm}</td>
                            <td className="tdParam">错误阀值：</td>
                            <td>{errorAlarm}</td>
                            <td className="tdParam">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="tdParam">开始时间：</td>
                            <td>{beginTime}</td>
                            <td className="tdParam">结束时间：</td>
                            <td>{endTime}</td>
                            <td className="tdParam">&nbsp;</td>
                            <td>&nbsp;</td>
                            <td className="tdParam">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <GyPic curTowHourName={curTowHourName} curTowHourValue={curTowHourValue} twoHoursReport={twoHoursReport} onChangePicData={onSelectChangePicData}/>
                <div className="emWatchBasicTable">
                    <table className="table table-hover">
                        <tbody>
                        <tr>
                            <th>返回值</th>
                            <th>最大值</th>
                            <th>平均值</th>
                            <th>最小值</th>
                            <th>最新值</th>
                        </tr>
                        {rowList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

GyView.propTypes = {
    curTowHourValue: PropTypes.array.isRequired,
    funcValue: PropTypes.array.isRequired,
    logGood: PropTypes.string.isRequired,
    logError: PropTypes.string.isRequired,
    logDanger: PropTypes.string.isRequired,
    logBan: PropTypes.string.isRequired,
    goodAlarm: PropTypes.string.isRequired,
    warningAlarm: PropTypes.string.isRequired,
    errorAlarm: PropTypes.string.isRequired,
    selectedMonitorName: PropTypes.string.isRequired,
    onClickRow: PropTypes.func.isRequired,

    curTowHourName: PropTypes.string.isRequired,
    twoHoursReport: PropTypes.array.isRequired,
    onSelectChangePicData: PropTypes.func.isRequired
};

module.exports = GyView;
