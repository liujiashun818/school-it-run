/**
* xuexue.yin  2016/02/24.
* 值班管理
*/

require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var EventCalendar = require('react-event-calendar');

var ReactWidgets = require('react-widgets');
var moment = require('moment');
var Button = require('react-bootstrap/lib/Button');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Popover = require('react-bootstrap/lib/PopOver');
var Overlay = require('react-bootstrap/lib/Overlay');

var base64 = require('../../../../../../utils/base64');
var DutyListView_desView_static = require('./dutyListView_desView_static');

var DutyListView_desView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTOperationStore")],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     itoss_operation:flux.store("YFTOperationStore").getState()
    //   }
    // },

    getInitialState: function () {
        return {
            moment: moment(),
            showPopover: false,
            popoverTitle: null,
            popoverContent: null,
            popoverTarget: null,
            selectedDay: moment().year() + '-' + moment().month() + '-' + moment().date()
        }
    },

    componentDidMount: function() {
        const { get_dutyManageCalendarData, setSelectedCalendarDate, get_dutyLog, get_dutySignIn } = this.props;
        if(document.getElementById('dutyListView_desView') != null) {
			document.getElementById('dutyListView_desView').style.height = $(window).height() - 110 - 30 + 'px';
		}
        document.getElementById('dutyLogListDiv').style.height = $('#dutyCalendarDiv').height()/2 + 'px';
        document.getElementById('checkInTimeListDiv').style.height = $('#dutyCalendarDiv').height()/2 + 'px';
        // console.log(this.eventCalendar.getCalendarDays());
        var calendarDays = this.eventCalendar.getCalendarDays();
        var firstDay = calendarDays[0];
        var lastDay = calendarDays[calendarDays.length-1];
        var filter = [{key:"OPERATOR_TYPE", value:"GET"}, {key:"STARTDATETIME", value:firstDay.year+"-"+(firstDay.month+1)+"-"+firstDay.day}, {key:"ENDDATETIME", value:lastDay.year+"-"+(lastDay.month+1)+"-"+lastDay.day}]
        var _this = this;
        setTimeout(function () {
            get_dutyManageCalendarData(filter);
        }, 100);

        setSelectedCalendarDate(moment().year()+'-'+moment().month()+'-'+moment().date());
        var filter2 = [
            {key:"CreatedDateTime", symbol:"ge", value:moment().year()+'-'+(moment().month()+1)+'-'+moment().date()+'T00:00:00'},
            {key:"CreatedDateTime", symbol:"le", value:moment().year()+'-'+(moment().month()+1)+'-'+moment().date()+'T23:59:59'}
        ];
        get_dutyLog(filter2);
        get_dutySignIn(filter2);
    },

    componentDidUpdate: function() {
        const { getCalendarDataFlag, get_dutyManageCalendarData } = this.props;
        document.getElementById('dutyLogListDiv').style.height = $('#dutyCalendarDiv').height()/2 + 'px';
        document.getElementById('checkInTimeListDiv').style.height = $('#dutyCalendarDiv').height()/2 + 'px';

        if(getCalendarDataFlag) {
            var calendarDays = this.eventCalendar.getCalendarDays();
            var firstDay = calendarDays[0];
            var lastDay = calendarDays[calendarDays.length-1];
            var filter = [{key:"OPERATOR_TYPE", value:"GET"}, {key:"STARTDATETIME", value:firstDay.year+"-"+(firstDay.month+1)+"-"+firstDay.day}, {key:"ENDDATETIME", value:lastDay.year+"-"+(lastDay.month+1)+"-"+lastDay.day}]
            var _this = this;
            setTimeout(function () {
                get_dutyManageCalendarData(filter);
            }, 100);
        }
    },

    handleSelectDate: function(date, value) {
        this.setState({
            moment: moment(value)
        });
        this.props.setGetCalendarDataFlag(true);
    },

    handleNextMonth: function() {
        this.setState({
            moment: this.state.moment.add(1, 'M')
        });
        this.props.setGetCalendarDataFlag(true);
    },

    handlePreviousMonth: function() {
        this.setState({
            moment: this.state.moment.subtract(1, 'M')
        });
        this.props.setGetCalendarDataFlag(true);
    },

    handleToday: function() {
        const { setGetCalendarDataFlag, setSelectedCalendarDate, get_dutyLog, get_dutySignIn } = this.props;
        this.setState({
            moment: moment(),
            selectedDay: moment().year() + '-' + moment().month() + '-' + moment().date()
        });
        setGetCalendarDataFlag(true);
        setSelectedCalendarDate(moment().year()+'-'+moment().month()+'-'+moment().date());

        var filter = [
            {key:"CreatedDateTime", symbol:"ge", value:moment().year()+'-'+(moment().month()+1)+'-'+moment().date()+'T00:00:00'},
            {key:"CreatedDateTime", symbol:"le", value:moment().year()+'-'+(moment().month()+1)+'-'+moment().date()+'T23:59:59'}
        ];
        get_dutyLog(filter);
        get_dutySignIn(filter);

        $("#addDutyLog_a").show();
    },

    handleCheckIn: function() {
        const { selectedCalendarDate, add_dutySignIn, get_dutyLog, get_dutySignIn } = this.props;
        var param = {
          SignUser: localStorage.getItem("USERNAME"),
          SignUserId: localStorage.getItem("USER_ID")
        };
        add_dutySignIn(param);

        var _this = this;
        setTimeout(function () {
            // var selectedCalendarDate = _this.getFlux().store("YFTOperationStore").getState().SelectedCalendarDate;
            var selectedYear = selectedCalendarDate.substring(0, selectedCalendarDate.indexOf("-"));
            var selectedMonth = parseInt(selectedCalendarDate.substring(selectedCalendarDate.indexOf("-")+1, selectedCalendarDate.lastIndexOf("-")))+1;
            var selectedDay = selectedCalendarDate.substr(selectedCalendarDate.lastIndexOf("-")+1);
            var filter = [
                {key:"CreatedDateTime", symbol:"ge", value:selectedYear+'-'+selectedMonth+'-'+selectedDay+'T00:00:00'},
                {key:"CreatedDateTime", symbol:"le", value:selectedYear+'-'+selectedMonth+'-'+selectedDay+'T23:59:59'}
            ];
            get_dutyLog(filter);
            get_dutySignIn(filter);
        }, 100);
    },

    handleEventMouseOver: function(target, data) {
        // this.setState({
        //     showPopover: true,
        //     popoverTarget: () => ReactDOM.findDOMNode(target),
        //     popoverTitle: data.title,
        //     popoverContent: data.description
        // });
    },

     handleEventMouseOut: function() {
        // this.setState({
        //     showPopover: false
        // });
    },

    handleEventClick: function(ref, data) {
        // alert('Maybe you want to go somewhere!');
    },

    handleDayClick: function(data, ref) {
        const { setSelectedCalendarDate, get_dutyLog, get_dutySignIn } = this.props;
        // alert('You clicked ' + data.year + '-' + data.month + '-' + data.day);
        this.setState({
            selectedDay: data.year + '-' + data.month + '-' + data.day
        });
        setSelectedCalendarDate(data.year+'-'+data.month+'-'+data.day);

        var filter = [
            {key:"CreatedDateTime", symbol:"ge", value:data.year+'-'+(data.month+1)+'-'+data.day+'T00:00:00'},
            {key:"CreatedDateTime", symbol:"le", value:data.year+'-'+(data.month+1)+'-'+data.day+'T23:59:59'}
        ];
        get_dutyLog(filter);
        get_dutySignIn(filter);

        if(data.year==moment().year() && data.month==moment().month() && data.day==moment().date()) {
            $("#addDutyLog_a").show();
        }
        else {
            $("#addDutyLog_a").hide();
        }
    },

    handleClickAddLog: function() {
        this.props.setClickedDutyLog(null);
        $('#dutyLogModal').modal('show');
    },

    handleClickLog: function(e) {
        const { dutyLogs, setClickedDutyLog } = this.props;
        // var dutyLogs = this.getFlux().store("YFTOperationStore").getState().DutyLogs;
        for(var i = 0; i < dutyLogs.length; i++) {
            if(dutyLogs[i].id == e.target.id.substr(8)) {
                setClickedDutyLog(dutyLogs[i]);
                break;
            }
        }
        $('#dutyLogModal').modal('show');
    },

    // getState: function(now) {
    //     return {
    //         moment: now,
    //     };
    // },

    getHumanDate: function() {
        return [moment.months('MM', this.state.moment.month()), this.state.moment.year(), ].join(' ');
    },

    render:function(){
        const { isSign, calendarData, dutyLogs, dutySignIns } = this.props;
        var _this = this;
        return (
            <div id='dutyListView_desView' className='overviewDesViewDiv dutyListView_desView'>
                <DutyListView_desView_static />
                <div className='operationCreateTableDiv col-md-12'>
                    <div className='table-basic col-md-12'>
                        <div className="table-basic-row col-md-12">
                            <div className="col-md-9">
                                <div className="table-basic-h2 col-md-12 rightBottomBorder">
                                    <div className="col-md-6" style={{paddingLeft:"10px", paddingTop:"15px"}}>
                                        <ReactWidgets.DateTimePicker className='dateTimePickerStyle' initialView={"year"} time={false} format={"yyyy-MM"} value={this.state.moment.toDate()} onChange={this.handleSelectDate}/>
                                        <ButtonToolbar>
                                            <Button onClick={this.handlePreviousMonth}>&lt;</Button>
                                            <Button onClick={this.handleNextMonth}>&gt;</Button>
                                            <Button onClick={this.handleToday}>今天</Button>
                                        </ButtonToolbar>
                                    </div>
                                    <div className="col-md-3" style={{textAlign:"center", paddingTop:"15px"}}>
                                        <Button onClick={this.handleCheckIn} disabled={!isSign}>签到</Button>
                                    </div>
                                    <div className="col-md-3 calendarDateDiv">
                                        {this.getHumanDate()}
                                    </div>
                                </div>
                                <div id="dutyCalendarDiv" className="col-md-12 rightBottomBorder">
                                    {/*<Overlay
                                        show={this.state.showPopover}
                                        rootClose={true}
                                        onHide = {()=>this.setState({showPopover: false, })}
                                        placement="top"
                                        container={ReactDOM.findDOMNode(document.getElementById("dutyCalendarDiv"))}
                                        target={this.state.popoverTarget}>
                                      <Popover id="event" title={this.state.popoverTitle}>{this.state.popoverContent}</Popover>
                                    </Overlay>*/}
                                    <EventCalendar
                                        ref={(component) => this.eventCalendar = component}
                                        month={this.state.moment.month()}
                                        year={this.state.moment.year()}
                                        events={calendarData}
                                        onEventClick={this.handleEventClick}
                                        onEventMouseOver={this.handleEventMouseOver}
                                        onEventMouseOut={this.handleEventMouseOut}
                                        onDayClick={this.handleDayClick}
                                        selectedDay={this.state.selectedDay} />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="table-basic-h1 col-md-12">
                                    值班日志
                                </div>
                                <div id="dutyLogListDiv" className="col-md-12 rightBottomBorder" style={{padding:"0 10px", overflowY:"auto"}}>
                                    <a id="addDutyLog_a" className="get-need-asset col-md-12" onClick={this.handleClickAddLog}>
                                        <i className="fa fa-plus-circle fa-lg"/>&nbsp;填写日志
                                    </a>
                                    <ul className="col-md-12">
                                        {dutyLogs.map(function(dutyLog, index) {
                                            return <li id={"dutyLog_"+dutyLog.id} className="dutyLogLi" onClick={_this.handleClickLog}>{(index+1)+'. '+dutyLog.userName+' '+dutyLog.content.substr(0, 25)+(dutyLog.content.length>25?"...":"")}</li>;
                                        })}
                                    </ul>
                                </div>
                                <div className="table-basic-h1 col-md-12">
                                    签到时间
                                </div>
                                <div id="checkInTimeListDiv" className="col-md-12 rightBottomBorder" style={{padding:"0 10px", overflowY:"auto"}}>
                                    <ul className="col-md-12">
                                        {dutySignIns.map(function(dutySignIn, index) {
                                            return <li className="dutycheckInTimeLi">{(index+1)+'.'+dutySignIn.signUser+' '+dutySignIn.signTime}</li>;
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

$(window).resize(function () {
	if(document.getElementById('dutyListView_desView') != null) {
		document.getElementById('dutyListView_desView').style.height = $(window).height() - 110 - 30 + 'px';
	}
});

DutyListView_desView.propTypes = {
    get_dutyManageCalendarData: PropTypes.func.isRequired,
    setSelectedCalendarDate: PropTypes.func.isRequired,
    get_dutyLog: PropTypes.func.isRequired,
    get_dutySignIn: PropTypes.func.isRequired,
    getCalendarDataFlag: PropTypes.bool.isRequired,
    setGetCalendarDataFlag: PropTypes.func.isRequired,
    selectedCalendarDate: PropTypes.string.isRequired,
    add_dutySignIn: PropTypes.func.isRequired,
    setClickedDutyLog: PropTypes.func.isRequired,
    dutyLogs: PropTypes.array.isRequired,
    isSign: PropTypes.bool.isRequired,
    calendarData: PropTypes.array.isRequired,
    dutySignIns: PropTypes.array.isRequired
}

module.exports = DutyListView_desView;
