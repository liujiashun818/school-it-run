
/**
 * Created by Yuchen on 2016/03/10.
 * 告警规则新增&编辑页-告警规则tab页
 */
var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');

var alarmLevelListInput = React.createClass({
    render() {
        return (
            <span>
                <span>{this.props.item.title}</span>
            </span>
        );
    }
});
var alarmLevelList = [
    {id:1,title:"严重告警"},
    {id:2,title:"主要告警"},
    {id:3,title:"次要告警"},
    {id:4,title:"警告告警"},
]

var AddAlarmRuleRuleTab = React.createClass({
    mixins: [History],
    componentDidUpdate: function() {
        $(".checkbox-group >span").unbind("click");
        $(".checkbox-group input[type='checkbox']").click(function(e){
            e.stopPropagation();
        });
        $(".checkbox-group >span").click(function(e){
            e.stopPropagation();
            var input = $(this).find("input");
            input.prop("checked",!input.is(":checked"));
        });
        $(".radio-group").unbind("click");
        $(".radio-group").click(function(e){
            e.stopPropagation();
            var input = $(this).find("input");
            input.prop("checked",true);
            //设置desc-group的样式
            var value = input.val();
            $(".desc-group").addClass("forbidden");
            $("td[data-target='format-"+value+"']").removeClass("forbidden");
        });
        //设置desc-group的样式
        var value = parseInt($("input[name='format']:checked").val(),10);
        var DOMNode = $(ReactDOM.findDOMNode(this));
        DOMNode.find(".desc-group").addClass("forbidden");
        DOMNode.find("td[data-target='format-"+value+"']").removeClass("forbidden");
    },
    render: function() {
        if(!this.props.state.origin) return (<div></div>);
        var _this = this;
        var change = (value) =>{
            _this.props.setState({
                alarmLevel: value.id,
            });
        }
        var alarmLevel = this.props.state.alarmLevel;
        var conditionError = this.props.state.origin.ErrorAlarm?"checked":"";
        var conditionDanger = this.props.state.origin.WarningAlarm?"checked":"";
        var filter1 = "checked";
        var filter2 = "";
        var filter3 = "";
        var filter4 = "";
        var filter1_start = 1;
        var filter2_start = 1;
        var filter3_start = 2;
        var filter3_end = 3;
        var filter4_start = 1;
        if(this.props.state.origin.AlarmFilter){
            filter1 = "";
            switch(this.props.state.origin.AlarmFilter){
                case 1: filter1 = "checked"; break;
                case 2: filter2 = "checked"; break;
                case 3: filter3 = "checked"; break;
            }
            if(this.props.state.origin.Times){
                filter1 = filter2 = filter3 = "";
                filter4 = "checked";
                filter4_start = this.props.state.origin.TimesNum;
            }
            else if(this.props.state.origin.AlarmStart){
                switch(this.props.state.origin.AlarmFilter){
                    case 1: filter1_start = this.props.state.origin.AlarmStart; break;
                    case 2: filter2_start = this.props.state.origin.AlarmStart; break;
                    case 3: filter3_start = this.props.state.origin.AlarmStart; break;
                }
            }
            if(this.props.state.origin.AlarmFilter==3&&this.props.state.origin.AlarmEnd){
                filter3_end = this.props.state.origin.AlarmEnd;
            }
        }
        return (
            <div className="createGroupDetailDiv userAddView_desView_form addAlarmRule_form">
                <table className="normal-table">
                    <tbody>
                        <tr>
                            <td className="col-md-3 text-center">告警条件</td>
                            <td className="col-md-3 no-padding checkbox-group text-center">
                                <span>
                                    <input name="condition" id="condition-error" type="checkbox" defaultChecked={conditionError} value="1" />错误
                                </span>
                                <span>
                                    <input name="condition" id="condition-danger" type="checkbox" defaultChecked={conditionDanger} value="2" />危险
                                </span>
                            </td>
                            <td className="col-md-3 text-center">告警级别</td>
                            <td className="col-md-3 no-padding text-center">
                                <ReactWidgets.DropdownList id="alarmLevelList" className='dropdownStyle' data={alarmLevelList}
                                    value={alarmLevel} onChange={change} textField='title' valueField='id' valueComponent={alarmLevelListInput} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-3 text-center" rowSpan={4}>告警形式</td>
                            <td className="col-md-3 no-padding radio-group text-center">
                                <span><input name="format" type="radio" defaultChecked={filter1} value="1" />连续不断发送告警</span>
                            </td>
                            <td className="col-md-6 no-padding format-desc-group desc-group text-center" data-target="format-1" colSpan={2}>
                                <span>总是发送，从第 <ReactWidgets.NumberPicker id="format1-time" min={0} defaultValue={filter1_start} /> 次符合告警发送条件开始发送告警</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-3 no-padding radio-group text-center">
                                <span><input name="format" type="radio" defaultChecked={filter2} value="2" />只发送一次告警</span>
                            </td>
                            <td className="col-md-6 no-padding format-desc-group desc-group text-center" data-target="format-2" colSpan={2}>
                                <span>发送一次，从第 <ReactWidgets.NumberPicker id="format2-time" min={0} defaultValue={filter2_start}  /> 次符合告警发送条件开始发送告警</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-3 no-padding radio-group text-center">
                                <span><input name="format" type="radio" defaultChecked={filter3} value="3" />选择性发送告警</span>
                            </td>
                            <td className="col-md-6 no-padding format-desc-group desc-group text-center" data-target="format-3" colSpan={2}>
                                <span>当第 <ReactWidgets.NumberPicker id="format3-time1" min={0} defaultValue={filter3_start} />
                                    次符合告警发送条件时，及其以后每重复 <ReactWidgets.NumberPicker id="format3-time2" min={0} defaultValue={filter3_end} /> 次时发送告警</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-3 no-padding radio-group text-center">
                                <span><input name="format" type="radio" defaultChecked={filter4} value="4" />按时间发送告警</span>
                            </td>
                            <td className="col-md-6 no-padding format-desc-group desc-group text-center" data-target="format-4" colSpan={2}>
                                <span>非正常状态持续 <ReactWidgets.NumberPicker id="format4-time" min={0} defaultValue={filter4_start} /> 个小时后发送告警</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    },
});

module.exports = AddAlarmRuleRuleTab;
