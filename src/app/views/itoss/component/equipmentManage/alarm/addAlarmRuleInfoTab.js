/**
 * Created by Yuchen on 2016/03/10.
 * 告警规则新增&编辑页-告警信息tab页
 */
var React = require('react');
require('bootstrap');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var ReactWidgets = require('react-widgets');

var watchStanderListInput = React.createClass({
    render() {
        return (
            <span>
                <span>{this.props.item.name}</span>
            </span>
        );
    }
});

var AddAlarmRuleInfoTab = React.createClass({
    mixins: [History],
    componentDidUpdate: function() {
        //初始化用户表格
        var userTable = $("#user-table"), receiverTable = $("#receiver-table");
        userTable.bootstrapTable({
            columns: [{
                    title: '状态',
                    field: 'state',
                    checkbox: true,
                }, {
                    title: '用户名称',
                    field: 'DisplayName',
                    halign: 'left',
                    align: 'left',
                    sortable: false,
                },
            ],
            data: [],
        });
        receiverTable.bootstrapTable({
            columns: [{
                    title: '状态',
                    field: 'state',
                    checkbox: true,
                }, {
                    title: '用户名称',
                    field: 'DisplayName',
                    halign: 'left',
                    align: 'left',
                    sortable: false,
                },
            ],
            data: [],
        });
        userTable.bootstrapTable('refreshOptions', {data: this.props.User_addAlarmRule});
        receiverTable.bootstrapTable('refreshOptions', {data: this.props.User_addAlarmRule2});
        if(this.props.UserIdList.length>0){//自动勾选相关用户
            var users = userTable.bootstrapTable("getData");
            for(var i in users){
                for(var j in this.props.UserIdList){
                    if(users[i].USER_ID==this.props.UserIdList[j]){
                        userTable.bootstrapTable('check',i);
                    }
                }
            }
        }
        if(this.props.ReceiverIdList.length>0){//自动勾选相关接收人
            var receivers = receiverTable.bootstrapTable("getData");
            for(var i in receivers){
                for(var j in this.props.ReceiverIdList){
                    if(receivers[i].USER_ID==this.props.ReceiverIdList[j]){
                        receiverTable.bootstrapTable('check',i);
                    }
                }
            }
        }
    },
    render: function() {
        if(!this.props.state.origin) return (<div></div>);
        var name = this.props.state.origin.AlarmName || "";
        var levelUpTime = this.props.state.origin.UpgradeTimes || 0;
        var stopTime = this.props.state.origin.StopTimes || 0;
        levelUpTime = parseInt(levelUpTime);
        stopTime = parseInt(stopTime);
        return (
            <div className="createGroupDetailDiv userAddView_desView_form addAlarmRule_form">
                <table className="normal-table">
                    <tbody>
                        <tr>
                            <td className="col-md-1 text-center">告警名称 <red>*</red></td>
                            <td className="col-md-2"><input id="name" tabIndex="1" type="text" defaultValue={name} /></td>
                            <td className="col-md-1 text-center">升级次数</td>
                            <td className="col-md-2"><ReactWidgets.NumberPicker id="levelUpTime" tabIndex="2" min={0} defaultValue={levelUpTime} /></td>
                            <td className="col-md-1 text-center">停止次数</td>
                            <td className="col-md-2"><ReactWidgets.NumberPicker id="stopTime" tabIndex="3" min={0} defaultValue={stopTime} /></td>
                            <td className="col-md-1 text-center">值班告警列表</td>
                            <td className="col-md-2">
                                <ReactWidgets.DropdownList id="watchStanderList" tabIndex="4" className='dropdownStyle' data={[]} textField='name' valueComponent={watchStanderListInput} />
                            </td>
                        </tr>
                        <tr>
                            <td className="col-md-1 text-center">用户</td>
                            <td className="col-md-5 no-padding normal-bootstrapTable-td" colSpan="3">
                                <table id="user-table"
                                    data-classes='table table-no-bordered table-hover'
                                    data-click-to-select='true'
                                    data-resizable='true'>
                                </table>
                            </td>
                            <td className="col-md-1 text-center">升级接收人</td>
                            <td className="col-md-5 no-padding normal-bootstrapTable-td" colSpan="3">
                                <table id="receiver-table"
                                    data-classes='table table-no-bordered table-hover'
                                    data-click-to-select='true'
                                    data-resizable='true'>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    },
});

module.exports = AddAlarmRuleInfoTab;
