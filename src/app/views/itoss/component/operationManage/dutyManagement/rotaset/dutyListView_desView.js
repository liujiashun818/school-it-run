/**
* xuexue.yin  2016/02/24.
* 值班管理
*/

require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var ReactWidgets = require('react-widgets');

var dateChange = require('../../../../../../utils/dateChange');
var base64 = require('../../../../../../utils/base64.js');
var Store = require('../../../../../../server/store.js');
var util = require('../../../../../../utils/util.js');
var DutyListView_desView_static = require('./dutyListView_desView_static');

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var _this;
window.dutyListRowEvent = {
    'click .editData1': function (e, value, row, index) {
        var canEdit = _this.state.canEdit;
        if(canEdit){
          $("#dtm1NameInput").val(row.Name);
          $("#dtm1BeginTimeInput").val(row.StartTime);
          $("#dtm1EndTimeInput").val(row.EndTime);
          $("#dutyTableModel1").modal("show");
          _this.setState({curRow:row});
        }else{
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "没有修改权限"
            $('#publicMessageModal').modal('show');
          },100);
        };
    },
    'click .deleteData1': function (e, value, row, index) {
        var canDelete = _this.state.canDelete;
        if(canDelete){
          $("#dutyDeleteModel").modal("show");
          _this.setState({curRow:row,deleteMark:1});
        }else{
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "没有删除权限"
            $('#publicMessageModal').modal('show');
          },100);
        };
    },
    'click .editData2': function (e, value, row, index) {
      var canEdit = _this.state.canEdit;
      if(canEdit){
        $("#dtm2NameInput").val(row.DutyGroupName);
        $("#dutyTableModel2").modal("show");
        _this.setState({curRow:row});
      }else{
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "没有修改权限"
          $('#publicMessageModal').modal('show');
        },100);
      };
    },
    'click .deleteData2': function (e, value, row, index) {
        var canDelete = _this.state.canDelete;
        if(canDelete){
          $("#dutyDeleteModel").modal("show");
          _this.setState({curRow:row,deleteMark:2});
        }else{
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "没有删除权限"
            $('#publicMessageModal').modal('show');
          },100);
        };
    },
    'click .editData3': function (e, value, row, index) {
        const { setCurDutyGroup, curDataDutyGroup, curDutyGroup } = _this.props;
        var canEdit = _this.state.canEdit;
        if(canEdit){
          var curGroupData = curDataDutyGroup;
          var curGroup = curDutyGroup;
          if(curGroup != curGroupData){
            setCurDutyGroup(curGroupData);
          };
          var id = row.USER_ID;
          $('#dutyListTable2_5').bootstrapTable('uncheckAll');
          $('#dutyListTable2_5').bootstrapTable('checkBy',{field:'USER_ID',values:[id]});
          $("#dutyTableModel3").modal("show");
          _this.setState({curRow:row});
        }else{
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "没有修改权限"
            $('#publicMessageModal').modal('show');
          },100);
        };
    },
    'click .deleteData3': function (e, value, row, index) {
        var canDelete = _this.state.canDelete;
        if(canDelete){
          $("#dutyDeleteModel").modal("show");
          _this.setState({curRow:row,deleteMark:3});
        }else{
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "没有删除权限"
            $('#publicMessageModal').modal('show');
          },100);
        };
    },
    'click .editData4': function (e, value, row, index) {
        const { setCurDutyGroup, setDutyEccData, curDataDutyGroup, curDutyGroup, dutyGroupArrs } = _this.props;
        var canEdit = _this.state.canEdit;
        if(canEdit){
          var curGroupData = curDataDutyGroup;
          var curGroup = curDutyGroup;
          if(curGroup != curGroupData){
            setCurDutyGroup(curGroupData);
          };
          setDutyEccData(row);
          var dutyRule = row.DUTY_RULE; //加入。排除
          var period = row.PERIOD;//每天每月
          var startTime = row.STARTDATETIME;//开始时间
          var endTime = row.ENDDATETIME;//结束时间
          var dutyArr = row.DUTYARRANGEMENTS_ID;
          var arrs = dutyGroupArrs;
          for(var i=0;i<arrs.length;i++){
            var arrsid = arrs[i].RecId;
            if(dutyArr == arrsid){
              $("#dtm4SelectArr").find(".rw-input").text(arrs[i].Name);
            };
          };
          //DUTYARR....排班安排id  DUTYTABLE_ID...recid
          $("#dtm4SelectRole").find(".rw-input").text(dutyRule);
          if(period == "每天"){
            $("input[type='radio']").each(function(){
              var val = $(this).val();
              if(val == "1"){
                $(this).attr("checked",true);
              };
            });
          }else if(period.indexOf("每月")>=0){
            $("input[type='radio']").each(function(){
              var val = $(this).val();
              if(val == "3"){
                $(this).attr("checked",true);
              };
            });
            period = period.substring(2,period.length-1);
            var dalys = period.split("号至");
            $("#dtm4SelectFirstData").find(".rw-input").text(dalys[0]);
            $("#dtm4SelectNextData").find(".rw-input").text(dalys[1]);
            var list = [];
            for(var i=1;i<=31;i++){
              if(i>=dalys[0]){
                list.push(i);
              };
            };
            _this.setState({bigMonthData:list});
          }else{
            $("input[type='radio']").each(function(){
              var val = $(this).val();
              if(val == "2"){
                $(this).attr("checked",true);
              };
            });
            var ind1 = period.indexOf("周一");
            var ind2 = period.indexOf("周二");
            var ind3 = period.indexOf("周三");
            var ind4 = period.indexOf("周四");
            var ind5 = period.indexOf("周五");
            var ind6 = period.indexOf("周六");
            var ind7 = period.indexOf("周日");
            $("#dutyTableModel4 input[type='checkbox']").each(function(){
              var val = $(this).val();
              if(ind1>=0){
                if(val == "0"){
                  $(this).attr("checked",true);
                };
              };
              if(ind2>=0){
                if(val == "1"){
                  $(this).attr("checked",true);
                };
              };
              if(ind3>=0){
                if(val == "2"){
                  $(this).attr("checked",true);
                };
              };
              if(ind4>=0){
                if(val == "3"){
                  $(this).attr("checked",true);
                };
              };
              if(ind5>=0){
                if(val == "4"){
                  $(this).attr("checked",true);
                };
              };
              if(ind6>=0){
                if(val == "5"){
                  $(this).attr("checked",true);
                };
              };
              if(ind7>=0){
                if(val == "6"){
                  $(this).attr("checked",true);
                };
              };
            });
          };
          $("#dutyTableModel4").modal("show");
          startTime = dateChange.strToDate(startTime);
          endTime = dateChange.strToDate(endTime);
          _this.setState({curRow:row,duty4StartTime:startTime,duty4EndTime:endTime,curArrId:dutyArr});
        }else{
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "没有修改权限"
            $('#publicMessageModal').modal('show');
          },100);
        };
    },
    'click .deleteData4': function (e, value, row, index) {
        var canDelete = _this.state.canDelete;
        if(canDelete){
          $("#dutyDeleteModel").modal("show");
          _this.setState({curRow:row,deleteMark:4});
        }else{
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "没有删除权限"
            $('#publicMessageModal').modal('show');
          },100);
        };
    },
};

var DutyListView_desView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("YFTOperationStore")],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     itoss:flux.store("YFTOperationStore").getState()
    //   }
    // },
    getInitialState: function () {
        _this = this;
        return {
          duty4StartTime:null,
          duty4EndTime:null
        }
    },
    componentDidUpdate: function(){
      const { dutyGroups, dutyGroupArrs, dutyUsers, dutyUserList, dutyDutyList } = this.props;
      var groupClass = dutyGroups;
      $('#dutyListTable2_2').bootstrapTable('load',groupClass);
      var groupArrClass = dutyGroupArrs;
      $('#dutyListTable2_1').bootstrapTable('load',groupArrClass);
      // var groupUsers = dutyUsers;
      var groupUsers = [];
      for(var n=0;n<dutyUsers.length;n++){
        var datarow = dutyUsers[n];
        var curuserid = dutyUsers[n].USER_ID;
        var addrow = true;
        if(dutyUserList.length > 0){
          for(var i=0;i<dutyUserList.length;i++){
            var uinfo = dutyUserList[i].USER_ID;
            if(curuserid == uinfo){
              addrow = false;
              break;
            }
          }
        };
        if(addrow){
          groupUsers.push(datarow);
        };
      };
      $('#dutyListTable2_5').bootstrapTable('load',groupUsers);
      var groupUserList = dutyUserList;
      $('#dutyListTable2_3').bootstrapTable('load',groupUserList);
      //var dutyDutyList = this.state.itoss.dutyDutyList;
      $('#dutyListTable2_4').bootstrapTable('load',dutyDutyList);
    },
    componentDidMount: function() {
      var height = $(window).height();
      height = height-150;
      $("#dutyListView_desView2").css("height",height+"px");
      var that = this;
      var temp = Store.get("PERMISSIONS");
      if(temp&&temp!=null&&temp!=""){
          temp = base64.base64decode(temp);
          temp = decodeURI(temp);
          temp = eval(temp);
      };
      var canAdd = false;
      var canEdit = false;
      var canDelete = false;
      var valid1 = util.hasPermission(temp,"/operationmanage/dutymanagement/rotaset/add");
      var valid2 = util.hasPermission(temp,"/operationmanage/dutymanagement/rotaset/edit");
      var valid3 = util.hasPermission(temp,"/operationmanage/dutymanagement/rotaset/delete");
      if(valid1!=null && valid1!=""){
        canAdd = true;
      };
      if(valid2!=null && valid2!=""){
        canEdit = true;
      };
      if(valid3!=null && valid3!=""){
        canDelete = true;
      };
      that.initTable(canAdd);
      setTimeout(function(){
        that.props.get_dutyGroup();
        that.props.get_dutyUsers();
        that.setState({canAdd:canAdd,canEdit:canEdit,canDelete:canDelete});
      },300);
    },
    beEdit:function(){
      return '<a class="editData1 tipLink" href="javascript:void(0)"><i class="fa fa-pencil-square-o"></i></a><a class="deleteData1 tipLink" href="javascript:void(0)"><i class="fa fa-trash-o"></i></a>';
    },
    beEdit2:function(){
      return '<a class="editData2 tipLink" href="javascript:void(0)"><i class="fa fa-pencil-square-o"></i></a><a class="deleteData2 tipLink" href="javascript:void(0)"><i class="fa fa-trash-o"></i></a>';
    },
    beEdit3:function(){
      return '<a class="deleteData3 tipLink" href="javascript:void(0)"><i class="fa fa-trash-o"></i></a>';
    },
    beEdit4:function(){
      return '<a class="editData4 tipLink" href="javascript:void(0)"><i class="fa fa-pencil-square-o"></i></a><a class="deleteData4 tipLink" href="javascript:void(0)"><i class="fa fa-trash-o"></i></a>';
    },
    initTable:function(canAdd){
      var that = this;
      $('#dutyListTable2_1').bootstrapTable({
          columns: [
              {
                  title: '排班名称',
                  field: 'Name',
                  align: 'left',
                  halign: 'left',
                  sortable: true
              },{
                  title: '开始时间',
                  field: 'StartTime',
                  align: 'left',
                  halign: 'left',
                  sortable: true
              },{
                  title: '结束时间',
                  field: 'EndTime',
                  align: 'left',
                  halign: 'left',
                  sortable: true
              },{
                  title: '操作',
                  align: 'left',
                  halign: 'left',
                  formatter: that.beEdit,
                  events: dutyListRowEvent,
                  sortable: true
              }
          ],
          data: [],
          onClickRow: this._onClickRow,
          exportDataType: "all"
      });
      $('#dutyListTable2_2').bootstrapTable({
        columns: [
            {
                title: '值班组',
                field: 'DutyGroupName',
                align: 'left',
                halign: 'left',
                sortable: true
            },{
                title: '操作',
                align: 'left',
                halign: 'left',
                formatter: that.beEdit2,
                events: dutyListRowEvent,
                sortable: true
            }
        ],
        data: [],
        onClickRow: this._onClickGroupRow,
        exportDataType: "all"
      });
      $('#dutyListTable2_3').bootstrapTable({
        columns: [
            {
                title: '值班人员',
                field: 'USER_NAME',
                align: 'left',
                halign: 'left',
                sortable: true
            },{
                title: '操作',
                align: 'left',
                halign: 'left',
                formatter: that.beEdit3,
                events: dutyListRowEvent,
                sortable: true
            }
        ],
        data: [],
        onClickRow: this._onClickRow,
        exportDataType: "all"
      });
      $('#dutyListTable2_4').bootstrapTable({
        columns: [
            {
                title: '排班名称',
                field: 'SCHEDULING',
                align: 'left',
                halign: 'left',
                sortable: true
            },{
                title: '时间段',
                field: 'PERIOD',
                align: 'left',
                halign: 'left',
                sortable: true
            },{
                title: '开始时间',
                field: 'STARTDATETIME',
                align: 'left',
                halign: 'left',
                sortable: true
            },{
                title: '结束时间',
                field: 'ENDDATETIME',
                align: 'left',
                halign: 'left',
                sortable: true
            },{
                title: '规则',
                field: 'DUTY_RULE',
                align: 'left',
                halign: 'left',
                sortable: true
            },{
                title: '操作',
                align: 'left',
                halign: 'left',
                formatter: that.beEdit4,
                events: dutyListRowEvent,
                sortable: true
            }
        ],
        data: [],
        onClickRow: this._onClickRow,
        exportDataType: "all"
      });
      $('#dutyListTable2_5').bootstrapTable({
        columns: [
            {
                title: '',
                checkbox: true
            },{
                title: '用户名',
                field: 'LOGIN_ID',
                align: 'left',
                halign: 'left',
                sortable: true
            },{
                title: '姓名',
                field: 'USER_NAME',
                align: 'left',
                halign: 'left',
                sortable: true
            },{
                title: '组织机构',
                field: 'ORANIZATION_NAME',
                align: 'left',
                halign: 'left',
                sortable: true
            },{
                title: '用户编码',
                field: 'USER_ID',
                align: 'left',
                halign: 'left',
                sortable: true,
                visible:false
            }
        ],
        data: [],
        // onClickRow: this._onClickRow,
        exportDataType: "all"
      });
      // var canAdd = that.state.canAdd;
      var addBtnObj1 = document.createElement('button');
      addBtnObj1.setAttribute('class', 'btn btn-default createDuty');
      addBtnObj1.setAttribute('type', 'button');
      addBtnObj1.setAttribute('name', 'add');
      addBtnObj1.setAttribute('title', '添加');
      addBtnObj1.setAttribute('data-toggle', 'modal');
      addBtnObj1.setAttribute('data-target', '#dutyTableModel1');
      addBtnObj1.innerHTML = '<i class="fa fa-plus"></i>';
      var btnGroup1 = document.getElementsByClassName('bootstrap-table')[1].childNodes[0].childNodes[0];

      var addBtnObj2 = document.createElement('button');
      addBtnObj2.setAttribute('class', 'btn btn-default createDuty');
      addBtnObj2.setAttribute('type', 'button');
      addBtnObj2.setAttribute('name', 'add');
      addBtnObj2.setAttribute('title', '添加');
      addBtnObj2.setAttribute('data-toggle', 'modal');
      addBtnObj2.setAttribute('data-target', '#dutyTableModel2');
      addBtnObj2.innerHTML = '<i class="fa fa-plus"></i>';
      var btnGroup2 = document.getElementsByClassName('bootstrap-table')[2].childNodes[0].childNodes[0];

      var addBtnObj3 = document.createElement('button');
      addBtnObj3.setAttribute('class', 'btn btn-default createDuty');
      addBtnObj3.setAttribute('type', 'button');
      addBtnObj3.setAttribute('name', 'add');
      addBtnObj3.setAttribute('title', '添加');
      addBtnObj3.setAttribute('data-toggle', 'modal');
      addBtnObj3.setAttribute('data-target', '#dutyTableModel3');
      addBtnObj3.innerHTML = '<i class="fa fa-plus"></i>';
      var btnGroup3 = document.getElementsByClassName('bootstrap-table')[3].childNodes[0].childNodes[0];

      var addBtnObj4 = document.createElement('button');
      addBtnObj4.setAttribute('class', 'btn btn-default createDuty');
      addBtnObj4.setAttribute('type', 'button');
      addBtnObj4.setAttribute('name', 'add');
      addBtnObj4.setAttribute('title', '添加');
      addBtnObj4.setAttribute('data-toggle', 'modal');
      addBtnObj4.setAttribute('data-target', '#dutyTableModel4');
      addBtnObj4.innerHTML = '<i class="fa fa-plus"></i>';
      var btnGroup4 = document.getElementsByClassName('bootstrap-table')[4].childNodes[0].childNodes[0];
      if(canAdd){
        btnGroup1.insertBefore(addBtnObj1, btnGroup1.childNodes[0]);
        btnGroup2.insertBefore(addBtnObj2, btnGroup2.childNodes[0]);
        btnGroup3.insertBefore(addBtnObj3, btnGroup3.childNodes[0]);
        btnGroup4.insertBefore(addBtnObj4, btnGroup4.childNodes[0]);
      };
      $(".createDuty").click(function(){
        var target = $(this).attr("data-target");
        if(target == "#dutyTableModel1"){
          $("#dtm1NameInput").val("");
          $("#dtm1BeginTimeInput").val("00:00:00");
          $("#dtm1EndTimeInput").val("00:00:00");
        }else if(target == "#dutyTableModel2") {
          $("#dtm2NameInput").val("");
        }else if(target == "#dutyTableModel3") {
          $('#dutyListTable2_5').bootstrapTable('uncheckAll');
        }else if(target == "#dutyTableModel4") {
          $("#dtm4SelectArr").find(".rw-input").text("");
          $("#dtm4SelectRole").find(".rw-input").text("");
          $("#dtm4SelectFirstData").find(".rw-input").text("");
          $("#dtm4SelectNextData").find(".rw-input").text("");
          $($("input:radio[name='dutyRadioType']")[0]).attr("checked",true);
          $("#dutyTableModel4 input[type='checkbox']:checked").attr("checked",false);
          that.setState({bigMonthData:"",duty4StartTime:null,duty4EndTime:null,curRow:"",curArrId:null});
        };
      });
    },
    saveDutyArrangements:function(){
      const { edit_dutyGroupArr, save_dutyArrangements, dutyGroupArrs } = this.props;
      var that = this;

      var curRow = this.state.curRow;
      var name = $("#dtm1NameInput").val();
      if(name == null || name == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请填写名称"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      }else{
        var groupArrClass = dutyGroupArrs;
        for(var i=0;i<groupArrClass.length;i++){
          var aname = groupArrClass[i].Name;
          var aid = groupArrClass[i].RecId;
          if(curRow!=null && curRow!=""){
            var recId = curRow.RecId;
            if(name == aname && recId!=aid){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "名称不能重复"
                $('#publicMessageModal').modal('show');
              },100);
              that.setState({curRow:""});
              return false;
            };
          }else {
            if(name == aname){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "名称不能重复"
                $('#publicMessageModal').modal('show');
              },100);
              that.setState({curRow:""});
              return false;
            };
          };
        };
        if(name.length>99){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "名称过长"
            $('#publicMessageModal').modal('show');
          },100);
          that.setState({curRow:""});
          return false;
        };
        var re = /[~#^$@%&!*]/gi;
        if(re.test(name)){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "名称中包含特殊字符"
            $('#publicMessageModal').modal('show');
          },100);
          that.setState({curRow:""});
          return false;
        };
      };
      var beginTime = $("#dtm1BeginTimeInput").val();
      var endTime = $("#dtm1EndTimeInput").val();
      var ra = /^(0|[0-9]|[0-1][0-9]|2[0-3])(\:)([0-9]|[0-5][0-9])(\:)([0-9]|[0-5][0-9])$/
      if(!ra.test(beginTime)){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "不匹配，请输入00:00:00到23:59:59范围内的开始时间"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      };
      if(!ra.test(endTime)){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "不匹配，请输入00:00:00到23:59:59范围内的结束时间"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      };
      beginTime = dateChange.strToDate2(beginTime);
      endTime = dateChange.strToDate2(endTime);
      var isOk = beginTime < endTime;
      if(!isOk){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "开始时间应小于结束时间。"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      };
      if(curRow != null && curRow != ""){
        var data = {
          Name:name,StartTime:beginTime,EndTime:endTime,RecId:curRow.RecId
        };
        edit_dutyGroupArr(data);
      }else{
        var data = {
          Name:name,StartTime:beginTime,EndTime:endTime
        };
        save_dutyArrangements(data);
      };
      that.setState({curRow:""});
      $("#dutyTableModel1").modal("hide");
    },
    saveDutyGroupName:function(){
      const { edit_dutyGroup, save_dutyGroupName, dutyGroups } = this.props;
      var that = this;
      var curRow = this.state.curRow;
      var name = $("#dtm2NameInput").val();
      if(name == null || name ==""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请填写名称"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      }else{
        var groupClass = dutyGroups;
        for(var i=0;i<groupClass.length;i++){
          var gName = groupClass[i].DutyGroupName;
          var gid = groupClass[i].RecId;
          if(curRow!=null && curRow!=""){
            var groupId = curRow.RecId;
            if(gName == name && gid != groupId){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "名称不能重复"
                $('#publicMessageModal').modal('show');
              },100);
              that.setState({curRow:""});
              return false;
            };
          }else {
            if(gName == name){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "名称不能重复"
                $('#publicMessageModal').modal('show');
              },100);
              that.setState({curRow:""});
              return false;
            };
          };
        };
        if(name.length>99){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "名称过长"
            $('#publicMessageModal').modal('show');
          },100);
          that.setState({curRow:""});
          return false;
        };
        var re = /[~#^$@%&!*]/gi;
        if(re.test(name)){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "名称中包含特殊字符"
            $('#publicMessageModal').modal('show');
          },100);
          that.setState({curRow:""});
          return false;
        };
      };
      if(curRow != null && curRow != ""){
        var data = {
          DutyGroupName:name,RecId:curRow.RecId
        };
        edit_dutyGroup(data);
      }else{
        var data = {
          DutyGroupName:name
        };
        save_dutyGroupName(data);
      };
      that.setState({curRow:""});
      $("#dutyTableModel2").modal("hide");
    },
    changeCurDutyGroup:function(e){
      this.props.setCurDutyGroup(e);
    },
    _onClickGroupRow:function(e){
      var param = [e,e];
      this.props.change_curDutyGroup2(param);
      $(".dutyExtraText").text("-"+e.DutyGroupName);
    },
    saveDutyPerson_old:function(){
      const { edit_dutyUser, save_dutyUser, dutyUserList, curDutyGroup } = this.props;
      var that = this;
      var $table = $("#dutyListTable2_5");
      var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.USER_ID;
      });
      var curRow = this.state.curRow;
      if(ids == null || ids == "" || ids == []){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请选择值班人员"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      }else{
        var groupUserList = dutyUserList;
        var uid = ids[0];
        for(var i=0;i<groupUserList.length;i++){
          var uinfo = groupUserList[i].USER_ID;
          var dgId = groupUserList[i].RECID;
          if(curRow!=null && curRow!=""){
            var recId = curRow.RECID;
            if(uid == uinfo && recId != dgId){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请勿重复添加"
                $('#publicMessageModal').modal('show');
              },100);
              that.setState({curRow:""});
              return false;
            };
          }else {
            if(uid == uinfo){
              setTimeout(function(){
                document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                document.getElementById('publicMessageModalcontent').innerHTML = "请勿重复添加"
                $('#publicMessageModal').modal('show');
              },100);
              that.setState({curRow:""});
              return false;
            };
          };
        };
      };
      if(curRow!=null && curRow!=""){
        var rid = curDutyGroup.RecId;
        var param = {RecId:curRow.RECID,UserInfo:ids[0],DutyGroupId:rid};
        edit_dutyUser(param);
      }else{
        save_dutyUser(ids);
      };
      that.setState({curRow:""});
      $("#dutyTableModel3").modal("hide");
    },
    saveDutyPerson:function(){
      const { edit_dutyUser, save_dutyUser, dutyUserList, curDutyGroup } = this.props;
      var that = this;
      var $table = $("#dutyListTable2_5");
      var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.USER_ID;
      });
      var curRow = this.state.curRow;
      var duplicateRecords = false;
      if(ids == null || ids == "" || ids == []){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请选择值班人员"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      }else{
        var groupUserList = dutyUserList;
        for(var m=0;m<ids.length;m++){
          var uid = ids[m];
          var update = true;
          if(groupUserList.length > 0){
            for(var i=0;i<groupUserList.length;i++){
              var uinfo = groupUserList[i].USER_ID;
              var dgId = groupUserList[i].RECID;
              if(curRow != null && curRow != ""){
                var recId = curRow.RECID;
                if(uid == uinfo && recId != dgId){
                  duplicateRecords = true;
                  update = false;
                  break;
                }
              }else {
                if(uid == uinfo){
                  duplicateRecords = true;
                  update = false;
                  break;
                }
              };
            };
          };
          if(update){
            if(curRow != null && curRow != ""){
              var rid = curDutyGroup.RecId;
              var param = {RecId:curRow.RECID,UserInfo:uid,DutyGroupId:rid};
              edit_dutyUser(param);
            }else{
              save_dutyUser(uid);
            };
          };
        }
      };

      if(duplicateRecords){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "已经存的用户将不会被增添加"
          $('#publicMessageModal').modal('show');
        },100);
      }
      that.setState({curRow:""});
      $("#dutyTableModel3").modal("hide");
    },
    onGetSelectNextData:function(e){
      var list = [];
      for(var i=1;i<=31;i++){
        if(i>=e){
          list.push(i);
        };
      };
      $("#dtm4SelectNextData").find(".rw-input").text("");
      this.setState({bigMonthData:list});
    },
    onSelectArr:function(e){
      var rid = e.RecId;
      var name = e.Name;
      $("#dtm4SelectArr").find(".rw-input").text(name);
      this.setState({curArrId:rid});
    },
    onSelectRole:function(e){
      $("#dtm4SelectRole").find(".rw-input").text(e);
    },
    onChangeWarning:function(){},
    onChangeStartTime:function(e, formatTime){
      this.setState({
          //duty4StartTime: new Date(formatTime)
          duty4StartTime: new Date(Date.parse(formatTime.replace(/-/,"/")))
      });
    },
    onChangeEndTime:function(e, formatTime){
      this.setState({
          //duty4EndTime: new Date(formatTime)
          duty4EndTime: new Date(Date.parse(formatTime.replace(/-/,"/")))
      });
    },
    onSavePlan:function(){
      const { edit_eccDuty, save_eccDuty, curDutyGroup } = this.props;
      var that = this;
      var groupId = curDutyGroup.RecId;
      var arrId = this.state.curArrId;
      if(arrId == null || arrId == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请选择排班名称"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      };
      var gz = $("#dtm4SelectRole").find(".rw-input").text();
      if(gz == null || gz == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请选择值班规则"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      };
      var radios = $("input:radio[name='dutyRadioType']:checked").val();
      if(radios == null || radios == ""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请选择排班时间"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      };
      var weekFile = "";
      var dayNumber = "";
      if(radios == "1"){
        radios = "每天";
      }else if(radios == "2"){
        radios = "每周";
        var checks = $("#dutyTableModel4 input[type='checkbox']:checked");
        for(var i=0;i<checks.length;i++){
          var val = checks[i].value;
          if(i==checks.length-1){
            weekFile = weekFile+val;
          }else{
            weekFile = weekFile+val+",";
          };
        };
        if(weekFile == null || weekFile == ""){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "请选择排班时间"
            $('#publicMessageModal').modal('show');
          },100);
          that.setState({curRow:""});
          return false;
        };
      }else if(radios == "3"){
        radios = "每月";
        weekFile = $("#dtm4SelectFirstData").find(".rw-input").text();
        dayNumber = $("#dtm4SelectNextData").find(".rw-input").text();
        if(weekFile == null || weekFile == ""){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "请选择排班时间"
            $('#publicMessageModal').modal('show');
          },100);
          that.setState({curRow:""});
          return false;
        };
        if(dayNumber == null || dayNumber == ""){
          setTimeout(function(){
            document.getElementById('publicMessageModelTitle').innerHTML = "提示"
            document.getElementById('publicMessageModalcontent').innerHTML = "请选择排班时间"
            $('#publicMessageModal').modal('show');
          },100);
          that.setState({curRow:""});
          return false;
        };
      };

      var beginTime = $("#dtm4beginTimeInput").find(".rw-input").val();
      var endTime = $("#dtm4endTimeInput").find(".rw-input").val();
      if(beginTime==null || beginTime==""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请选择开始时间"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      }else{
        beginTime = dateChange.strToDate(beginTime);
      };
      if(endTime==null || endTime==""){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "请选择结束时间"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      }else{
        endTime = dateChange.strToDate(endTime);
      };
      var isOk = beginTime<=endTime;
      if(!isOk){
        setTimeout(function(){
          document.getElementById('publicMessageModelTitle').innerHTML = "提示"
          document.getElementById('publicMessageModalcontent').innerHTML = "开始时间应小于等于结束时间。"
          $('#publicMessageModal').modal('show');
        },100);
        that.setState({curRow:""});
        return false;
      };
      // dtm4SelectGroup
      var curRow = this.state.curRow;
      if(curRow!=null && curRow!=""){
        var param = {
          RecId:curRow.DUTYTABLE_ID,
          DutyTableName:arrId,
          ApplyYearNumber:gz,
          DutyGroup:groupId,
          DutyForm:radios,
          WeekField:weekFile,
          DayNumber:dayNumber,
          StartDateTime:beginTime,
          EndDateTime:endTime
        };
        edit_eccDuty(param);
      }else{
        var param = {
          DutyTableName:arrId,
          ApplyYearNumber:gz,
          DutyGroup:groupId,
          DutyForm:radios,
          WeekField:weekFile,
          DayNumber:dayNumber,
          StartDateTime:beginTime,
          EndDateTime:endTime
        };
        save_eccDuty(param);
      }
      that.setState({curRow:""});
      $("#dutyTableModel4").modal('hide');
    },
    onDeleteData:function(){
      const { delete_dutyGroupArr, delete_dutyGroup, delete_dutyGroupUser, delete_eccDuty } = this.props;
      var that = this;
      var curRow = this.state.curRow;
      var deleteMark = this.state.deleteMark;
      var deleteId = "";
      switch (deleteMark) {
        case 1:
          deleteId = curRow.RecId;
          delete_dutyGroupArr(deleteId);
          break;
        case 2:
          deleteId = curRow.RecId;
          delete_dutyGroup(deleteId);
          break;
        case 3:
          deleteId = curRow.RECID;
          delete_dutyGroupUser(deleteId);
          break;
        case 4:
          deleteId = curRow.DUTYTABLE_ID;
          delete_eccDuty(deleteId);
          break;
      };
      $("#dutyDeleteModel").modal("hide");
      this.setState({curRow:""});
    },
    render:function(){
      const { dutyGroups, curDutyGroup, dutyGroupArrs } = this.props;
      var monthData = [
        "1","2","3","4","5","6","7","8","9","10",
        "11","12","13","14","15","16","17","18","19","20",
        "21","22","23","24","25","26","27","28","29","30",
        "31"
      ];
      var bigMonthData = this.state.bigMonthData;
      if(bigMonthData == null || bigMonthData == ""){
        bigMonthData = monthData;
      };
        return (
            <div id='dutyListView_desView2' className='overviewDesViewDiv userListView_desView'>
                <DutyListView_desView_static />
                <div className="modal fade" id="dutyDeleteModel" tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">删除</h4>
                      </div>
                      <div className="modal-body">
                        你确定要删除吗?
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" className="btn btn-primary" onClick={this.onDeleteData}>确定</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal fade" id="dutyTableModel1" tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">排班安排</h4>
                      </div>
                      <div className="modal-body">
                        <div className="input-group">
                          <span className="input-group-addon">排班名称<span style={{"color":"#FF0000"}}>*</span></span>
                          <input type="text" className="form-control" id="dtm1NameInput"/>
                        </div>
                        <div className="input-group">
                          <span className="input-group-addon">开始时间<span style={{"color":"#FF0000"}}>*</span></span>
                          <input type="text" className="form-control" id="dtm1BeginTimeInput"/>
                        </div>
                        <div className="input-group">
                          <span className="input-group-addon">结束时间<span style={{"color":"#FF0000"}}>*</span></span>
                          <input type="text" className="form-control" id="dtm1EndTimeInput"/>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" className="btn btn-primary" onClick={this.saveDutyArrangements}>保存</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal fade" id="dutyTableModel2" tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">值班组</h4>
                      </div>
                      <div className="modal-body">
                        <div className="input-group">
                          <span className="input-group-addon">值班组名称<span style={{"color":"#FF0000"}}>*</span></span>
                          <input type="text" className="form-control" id="dtm2NameInput"/>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" className="btn btn-primary" onClick={this.saveDutyGroupName}>保存</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal fade" id="dutyTableModel3" tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">值班人员</h4>
                      </div>
                      <div className="modal-body">
                        <div className="input-group">
                          <span className="input-group-addon">选择值班组</span>
                          <ReactWidgets.DropdownList data={dutyGroups} textField='DutyGroupName' id="dtm3SelectInput" value={curDutyGroup} onSelect={this.changeCurDutyGroup} onChange={this.onChangeWarning}/>
                        </div>
                        <table id="dutyListTable2_5"
                           data-toggle='table'
                           data-search='true'
                           data-classes='table table-no-bordered table-hover'
                           data-show-export="true"
                           data-show-refresh='true'
                           data-show-toggle='true'
                           data-show-columns='true'
                           data-pagination='true'
                           data-resizable='true'>
                        </table>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" className="btn btn-primary" onClick={this.saveDutyPerson}>保存</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal fade" id="dutyTableModel4" tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">值班计划</h4>
                      </div>
                      <div className="modal-body">
                        <div className="input-group">
                          <span className="input-group-addon">值班组<span style={{"color":"#FF0000"}}>*</span></span>
                          <ReactWidgets.DropdownList data={dutyGroups} textField='DutyGroupName' id="dtm4SelectGroup" value={curDutyGroup} onSelect={this.changeCurDutyGroup} onChange={this.onChangeWarning}/>
                        </div>
                        <div className="input-group">
                          <span className="input-group-addon">排班名称<span style={{"color":"#FF0000"}}>*</span></span>
                          <ReactWidgets.DropdownList data={dutyGroupArrs} textField='Name' id="dtm4SelectArr" onSelect={this.onSelectArr} onChange={this.onChangeWarning}/>
                        </div>
                        <div className="input-group">
                          <span className="input-group-addon">值班规则<span style={{"color":"#FF0000"}}>*</span></span>
                          <ReactWidgets.DropdownList data={["加入","排除"]} id="dtm4SelectRole" onSelect={this.onSelectRole} onChange={this.onChangeWarning}/>
                        </div>
                        <div className="pbsjDiv">
                          <label>排班时间<span style={{"color":"#FF0000"}}>*</span></label>
                          <div className="radio">
                            <label>
                              <input type="radio" name="dutyRadioType" value="1"/> <span style={{"verticalAlign":"sub"}}>每天</span>
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input type="radio" name="dutyRadioType" value="2"/> 每周
                              <label className="checkbox-inline">
                                <input type="checkbox" value="0"/> <span style={{"display":"inline-block","paddingTop": "3px"}}>周一</span>
                              </label>
                              <label className="checkbox-inline">
                                <input type="checkbox" value="1"/> 周二
                              </label>
                              <label className="checkbox-inline">
                                <input type="checkbox" value="2"/> 周三
                              </label>
                              <label className="checkbox-inline">
                                <input type="checkbox" value="3"/> 周四
                              </label>
                              <label className="checkbox-inline">
                                <input type="checkbox" value="4"/> 周五
                              </label>
                              <label className="checkbox-inline">
                                <input type="checkbox" value="5"/> 周六
                              </label>
                              <label className="checkbox-inline">
                                <input type="checkbox" value="6"/> 周日
                              </label>
                            </label>
                          </div>
                          <div className="radio">
                            <label style={{"width":"auto"}}>
                              <input type="radio" name="dutyRadioType" style={{"marginTop":"2px"}} value="3"/> 每月
                            </label>
                            <ReactWidgets.DropdownList data={monthData} textField='name' className="inlineDropDown" id="dtm4SelectFirstData" onSelect={this.onGetSelectNextData} onChange={this.onChangeWarning}/>
                            至 <ReactWidgets.DropdownList data={bigMonthData} textField='name' className="inlineDropDown" id="dtm4SelectNextData" onChange={this.onChangeWarning}/>
                          </div>
                        </div>
                        <div className="input-group">
                          <span className="input-group-addon">开始时间<span style={{"color":"#FF0000"}}>*</span></span>
                          <ReactWidgets.DateTimePicker className="dateTimePickerStyle" time={false} format={"yyyy-MM-dd"} id="dtm4beginTimeInput" value={this.state.duty4StartTime} onChange={this.onChangeStartTime}/>
                        </div>
                        <div className="input-group">
                          <span className="input-group-addon">结束时间<span style={{"color":"#FF0000"}}>*</span></span>
                          <ReactWidgets.DateTimePicker className="dateTimePickerStyle" time={false} format={"yyyy-MM-dd"} id="dtm4endTimeInput" value={this.state.duty4EndTime} onChange={this.onChangeEndTime}/>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" className="btn btn-primary" onClick={this.onSavePlan}>保存</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-12'>
                  <label className="dutyListTableTitle">排班安排</label>
                  <table id="dutyListTable2_1"
                     data-toggle='table'
                     data-search='true'
                     data-classes='table table-no-bordered table-hover'
                     data-show-export="true"
                     data-show-refresh='true'
                     data-show-toggle='true'
                     data-show-columns='true'
                     data-pagination='true'
                     data-resizable='true'
                     data-page-size='5'
                     data-page-list='[5,10,15,20]'>
                  </table>
                </div>
                <div className='col-md-6'>
                  <label className="dutyListTableTitle">值班组</label>
                  <table id="dutyListTable2_2"
                     data-toggle='table'
                     data-search='true'
                     data-classes='table table-no-bordered table-hover'
                     data-show-export="true"
                     data-show-refresh='true'
                     data-show-toggle='true'
                     data-show-columns='true'
                     data-pagination='true'
                     data-resizable='true'
                     data-page-size='5'
                     data-page-list='[5,10,15,20]'>
                  </table>
                </div>
                <div className='col-md-6'>
                  <label className="dutyListTableTitle">值班人员<span className="dutyExtraText"></span></label>
                  <table id="dutyListTable2_3"
                     data-toggle='table'
                     data-search='true'
                     data-classes='table table-no-bordered table-hover'
                     data-show-export="true"
                     data-show-refresh='true'
                     data-show-toggle='true'
                     data-show-columns='true'
                     data-pagination='true'
                     data-resizable='true'
                     data-page-size='5'
                     data-page-list='[5,10,15,20]'>
                  </table>
                </div>
                <div className='col-md-12'>
                  <label className="dutyListTableTitle">值班计划<span className="dutyExtraText"></span></label>
                  <table id="dutyListTable2_4"
                     data-toggle='table'
                     data-search='true'
                     data-classes='table table-no-bordered table-hover'
                     data-show-export="true"
                     data-show-refresh='true'
                     data-show-toggle='true'
                     data-show-columns='true'
                     data-pagination='true'
                     data-resizable='true'
                     data-page-size='5'
                     data-page-list='[5,10,15,20]'>
                  </table>
                </div>
            </div>
        );
    }
});

DutyListView_desView.propTypes = {
    setCurDutyGroup: PropTypes.func.isRequired,
    curDataDutyGroup: PropTypes.object,
    curDutyGroup: PropTypes.object,
    setDutyEccData: PropTypes.func.isRequired,
    dutyGroupArrs: PropTypes.array.isRequired,
    dutyGroups: PropTypes.array.isRequired,
    dutyUsers: PropTypes.array.isRequired,
    dutyUserList: PropTypes.array.isRequired,
    dutyDutyList: PropTypes.array.isRequired,
    get_dutyGroup: PropTypes.func.isRequired,
    get_dutyUsers: PropTypes.func.isRequired,
    edit_dutyGroupArr: PropTypes.func.isRequired,
    save_dutyArrangements: PropTypes.func.isRequired,
    edit_dutyGroup: PropTypes.func.isRequired,
    save_dutyGroupName: PropTypes.func.isRequired,
    change_curDutyGroup2: PropTypes.func.isRequired,
    edit_dutyUser: PropTypes.func.isRequired,
    save_dutyUser: PropTypes.func.isRequired,
    edit_eccDuty: PropTypes.func.isRequired,
    save_eccDuty: PropTypes.func.isRequired,
    delete_dutyGroupArr: PropTypes.func.isRequired,
    delete_dutyGroup: PropTypes.func.isRequired,
    delete_dutyGroupUser: PropTypes.func.isRequired,
    delete_eccDuty: PropTypes.func.isRequired
}

module.exports = DutyListView_desView;
