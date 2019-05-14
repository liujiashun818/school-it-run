var base64 = require('./base64.js');
var DateChange = {
    toDate: function(target){
        target = target.substring(6, (target.length - 2));
        var objData = new Date(parseInt(target));
        var objYear = objData.getYear()+1900;
        var objMonth = objData.getMonth()+1;
        var objDay = objData.getDate();
        var objHour = objData.getHours();
        var objMin = objData.getMinutes();
        var objSec = objData.getSeconds();
        var objDate = objYear+"-"+objMonth+"-"+objDay+" "+objHour+":"+objMin+":"+objSec;
        return objDate;
    },
    toDate2: function(target){
        target = target.substring(6, (target.length - 2));
        return parseInt(target);
    },
    strToDate2:function(str){
      var date;
      var ss = "2016-3-14 ";
      ss = ss + str;
      //date = new Date(ss);
      date = new Date(Date.parse(ss.replace(/-/,"/")));
      return date;
    },
    strToDate: function(str) {
      var date;
      var tempStrs = str.split(" ");
      if(tempStrs.length != 2) {
        //date = new Date(str);
        date = new Date(Date.parse(str.replace(/-/,"/")));
      }
      else {
        var dateStrs = tempStrs[0].split("-");
        var year = parseInt(dateStrs[0], 10);
        var month = parseInt(dateStrs[1], 10) - 1;
        var day = parseInt(dateStrs[2], 10);
        var timeStrs = tempStrs[1].split(":");
        var hour = parseInt(timeStrs [0], 10);
        var minute = parseInt(timeStrs[1], 10);
        var second = parseInt(timeStrs[2], 10);
        date = new Date(year, month, day, hour, minute, second);
      }
      return date;
    },
    DatetoStr: function(target){
        var objData = target;
        var objYear = objData.getYear()+1900;
        var objMonth = objData.getMonth()+1;
        var objDay = objData.getDate();
        var objHour = objData.getHours();
        var objMin = objData.getMinutes();
        var objSec = objData.getSeconds();
        var objDate = objYear+"-"+objMonth+"-"+objDay+" "+objHour+":"+objMin+":"+objSec;
        return objDate;
    },
    getPagePermissions:function(data){
      // console.log(data);
      var temp = localStorage.getItem("PERMISSIONS");
      var markList = [];
      if(temp!=null&&temp!=""){
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var ttemp = eval(temp);
        for(var i=0;i<data.length;i++){
          var d = data[i];
          var mark = false;
          for(var j=0;j<ttemp.length;j++){
            var rs = ttemp[j].resourceType;
            if(rs == d){
              mark = true;
              break;
            };
          };
          markList.push(mark);
        };
      };
      return markList;
    },
    changeViewStyle:function(){
      $(".yftStaticStyleDisabled").attr("disabled",true);
      var temp = localStorage.getItem("PERMISSIONS");
      if(temp!=null&&temp!=""){
        temp = base64.base64decode(temp);
        temp = decodeURI(temp);
        var ttemp = eval(temp);
        var idList = [];
        for(var i=0;i<ttemp.length;i++){
          var data = ttemp[i].resourceType;
          data = data.split("/").join('');
          $("#"+data).show();
          $("#"+data).attr("disabled",false);
          $("."+data).show();
          idList.push(data);
          if(data == "systemmanagegroupmanagedelete"){
            $("#systemmanagegroupmanagedeleteall").show();
            $("#systemmanagegroupmanagedeletetree").show();
          };
          if(data == "systemmanagegroupmanageadd"){
            $("#systemmanagegroupmanageaddtree").show();
          };
        };
        // console.log(idList);
      };
    },
    addDateRstr:function(date, days) {
        // 日期，在原有日期基础上，增加days天数，默认增加1天
        // date参数是要进行加减的日期，days参数是要加减的天数
        if (days == undefined || days == "") {
            days = 1;
        };
        var date = new Date(date);
        date.setDate(date.getDate() + days);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return date.getFullYear() + "-" + month + "-" + day;
    },
    addHoursRDate:function(date, hours) {
        // 日期，在原有时间基础上，增加 hours 小时数，默认增加1小时
        // date参数是要进行加减的日期，days参数是要加减的天数
        if (hours == undefined || hours == "") {
            hours = 1;
        };
        date.setHours(date.getHours() + hours);
        return date;
    },
    getLastQuarter: function(year, month) {
        //获得季度信息
        var quarterMonthStart=0;
        var temp="";
        var spring=0; //春
        var summer=3; //夏
        var fall=6;   //秋
        var winter=9;//冬
        //月份从0-11
        switch(month){//季度的其实月份
          case spring:
              temp="一季度";
              break;
          case summer:
              temp="二季度";
              break;
          case fall:
              temp="三季度";
              break;
          case winter:
              temp="四季度";
              break;
        };
        return year+temp;
    }
};

module.exports = DateChange;
