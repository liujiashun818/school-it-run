
var Store = require('../server/store.js');

var Util = function(){}
// Example：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

Object.defineProperty(Util, 'getNowDate', {
	value: function() {
		var date = new Date();
        date = date.Format("yyyy-MM-dd");
		// console.log(date);
		return date;
	}
});

Object.defineProperty(Util, 'getAgoDate', {
	value: function() {
		var date = new Date();
        date.setDate(date.getDate() - 1);
        date = date.Format("yyyy-MM-dd");
		// console.log(date);
		return date;
	}
});

Object.defineProperty(Util, 'getLastDay', {
	value: function(key) {
    var nowDate = new Date();
    var nowDayOfWeek = nowDate.getDay();      //今天本周的第几天
    var nowDay = nowDate.getDate();              //当前日
    var nowMonth = nowDate.getMonth();           //当前月
    var nowYear = nowDate.getYear();             //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;
    var currentYear = nowDate.getFullYear();

    var lastMonthDate = new Date();  //上月日期
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
    var lastYear = lastMonthDate.getFullYear();
    var lastMonth = lastMonthDate.getMonth();

    //获得上周的开始日期
   var lastWeekStartDate = nowDate.setDate(nowDay - nowDayOfWeek - 6);
   lastWeekStartDate = new Date(lastWeekStartDate).Format("yyyy-MM-dd");
  //  console.log(lastWeekStartDate);

   //获得上月开始时间
    var lastMonthStartDate = new Date(lastYear, lastMonth, 1);
    lastMonthStartDate = lastMonthStartDate.Format("yyyy-MM-dd");
    // console.log(lastMonthStartDate);

    // 取得上一个季度开始时间
    //当前真实月份
    var currentMonth = nowMonth + 1;
    var lastQuarterStartDate = "";
    var currentjdcs = 0;
    if(currentMonth >= 1 && currentMonth <= 3){
      currentjdcs = 0;
    }else if (currentMonth >= 4 && currentMonth <= 6) {
      currentjdcs = 3;
    }else if (currentMonth >= 7 && currentMonth <= 9) {
      currentjdcs = 6;
    }else if (currentMonth >= 10 && currentMonth <= 12) {
      currentjdcs = 9;
    }
    lastQuarterStartDate = this.getLastQuarterStartDate(currentYear, currentjdcs);
    lastQuarterStartDate = lastQuarterStartDate.Format("yyyy-MM-dd");
    // console.log(lastQuarterStartDate);

    //获取上一年的开始时间
    currentYear--;
    var lastYearStartDate = new Date(currentYear,0,1);
    var lastYearStartDate = lastYearStartDate.Format("yyyy-MM-dd");
    // console.log(lastYearStartDate);

		return {
      lastWeekStartDate: lastWeekStartDate,
      lastMonthStartDate: lastMonthStartDate,
      lastQuarterStartDate: lastQuarterStartDate,
      lastYearStartDate: lastYearStartDate
    }
	}
});

//获得某月的天数
Object.defineProperty(Util, 'getMonthDays', {
	value: function() {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
    return days;
	}
});

//获得上季度的第一天
Object.defineProperty(Util, 'getLastQuarterStartDate', {
	value: function(year, month) {
    var quarterMonthStart=0;
    var spring=0; //春
    var summer=3; //夏
    var fall=6;   //秋
    var winter=9;//冬
    //月份从0-11
    switch(month){//季度的其实月份
      case spring:
          //如果是第一季度则应该到去年的冬季
            year--;
            month=winter;
          break;
      case summer:
          month=spring;
          break;
      case fall:
          month=summer;
          break;
      case winter:
          month=fall;
          break;
    };
    return new Date(year,month,1);
	}
});

//判断是否拥有权限
Object.defineProperty(Util, 'hasPermission', {
   value: function(permissions,permission){
        var result = null;
        if(permissions.length<=0) return result;
        for(var i in permissions){
            if(permissions[i].resourceType===permission){
                result = permissions[i];
                break;
            }
        }
        return result;
    }
});

//根据日期&时间字符串获取日期对象（ie兼容版）
Object.defineProperty(Util, 'getDateObj', {
   value: function(date){
       if(date.length<=0) return undefined;
       if(!!window.ActiveXObject || "ActiveXObject" in window){//ie
           function aNewDate(str) {
               var strarray = str.split(' ');
               if(!strarray[0]) date_array = str.split('-');
               var date_array = strarray[0] && strarray[0].split('-');
               var time_array = strarray[1] && strarray[1].split(':');
               var date = new Date();
               date.setFullYear(date_array[0]||0, parseInt(date_array[1]||1,10)-1, date_array[2]||0);
               if(time_array) date.setHours(time_array[0]||0, time_array[1]||0, time_array[2]||0, time_array[3]||0);
               return date;
           }
           return aNewDate(date);
       }
       else{//其他浏览器
           return new Date(date);
       }
    }
});

//后台自定义接口，数据层数据获取出错误弹出信息
Object.defineProperty(Util, 'customInterfaceInfo', {
   value: function(err){
       var showinfo =  Store.get("showinfo");
       if(err.status == 500){
          if(err.responseJSON){
            if(err.responseJSON.error.message.value){
              if(err.responseJSON.error.message.value == "token invalid."){
                  //token 过期
                  if(showinfo == 0){
                    //设置是否弹出显示，认证过期或服务器连接失败窗口；0 可以显示 1 不显示
                    Store.set("showinfo",1);
                    //window.location.href = '#';
                    setTimeout(function(){
                      document.getElementById('tokeninfocontent').innerHTML = "认证过期。"
                      $('#tokenInfoModal').modal('show');
                    },200);
                  };
              }else{
                //alert(err.responseJSON.error.message.value);
                setTimeout(function(){
                  document.getElementById('errmessagecontent').innerHTML = err.responseJSON.error.message.value;
                  $('#errMessageModel').modal('show');
                },200);
              };
            }else{
              //alert(err.statusText);
              setTimeout(function(){
                document.getElementById('errmessagecontent').innerHTML = err.statusText;
                $('#errMessageModel').modal('show');
              },200);
            }
          };
        }else if(err.status == 0){
          //连接服务器失败
          // alert("服务器连接失败。");
          if(showinfo == 0){
            //设置是否弹出显示，认证过期或服务器连接失败窗口；0 可以显示 1 不显示
            Store.set("showinfo",1);
            //window.location.href = '#';
            setTimeout(function(){
              document.getElementById('tokeninfocontent').innerHTML = "服务器连接失败。"
              $('#tokenInfoModal').modal('show');
            },200);
          };
        };
    }
});

//oData接口，数据层数据获取出错误弹出信息
Object.defineProperty(Util, 'oDataInterfaceInfo', {
   value: function(err){
      var showinfo =  Store.get("showinfo");
      if(err.response.statusCode == 500){
          var bodyinfo = '[';
          bodyinfo = bodyinfo + err.response.body+']';
          if(bodyinfo){
            bodyinfo = eval(bodyinfo);
            if(bodyinfo[0].error.message.value){
              if(bodyinfo[0].error.message.value == "token invalid."){
                //token 过期
                if(showinfo == 0){
                  //设置是否弹出显示，认证过期或服务器连接失败窗口；0 可以显示 1 不显示
                  Store.set("showinfo",1);
                  //window.location.href = '#';
                  setTimeout(function(){
                    document.getElementById('tokeninfocontent').innerHTML = "认证过期。"
                    $('#tokenInfoModal').modal('show');
                  },200);
                };
              }else {
                //alert(bodyinfo[0].error.message.value);
                setTimeout(function(){
                  document.getElementById('errmessagecontent').innerHTML = bodyinfo[0].error.message.value;
                  $('#errMessageModel').modal('show');
                },200);
              };
            }else{
              //alert(err.response.statusText);
              setTimeout(function(){
                document.getElementById('errmessagecontent').innerHTML = err.response.statusText;
                $('#errMessageModel').modal('show');
              },200);
            }
          };
       }
       else if(err.response.statusCode == 0){
          //连接服务器失败
          if(showinfo == 0){
            //设置是否弹出显示，认证过期或服务器连接失败窗口；0 可以显示 1 不显示
            Store.set("showinfo",1);
            //window.location.href = '#';
            setTimeout(function(){
              document.getElementById('tokeninfocontent').innerHTML = "服务器连接失败。";
              $('#tokenInfoModal').modal('show');
            },200);
          };
       };
    }
});

module.exports = Util;
