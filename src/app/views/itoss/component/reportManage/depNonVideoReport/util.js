var DateChange = require('../../../../../utils/dateChange.js');
var Util = {
  // -------------------------报表图表----------------------
  getTingJiView:function(name,data,chartTitle){
    $(".tingji").show();
    $(".dizhouji").show();
    var area =[];
    var total =[];
    var onlinecount = [];
    var intactcount = [];
    if(data.length > 0){
      if(data.length == 1){
        //隐藏 12
        $(".tingji").hide();
        $(".dizhouji").hide();
      }else if(data.length == 2){
        $(".tingji").hide();
        //隐藏 1
      }else if(data.length ==3){
        var dataone = data[0];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            area.push(dataone[i].area);
            total.push(dataone[i].total);
            onlinecount.push(dataone[i].onlinecount);
            intactcount.push(dataone[i].intactcount);
          };
        };
      }
    }
    var option = {
        title : {
            text: chartTitle,
            x: 'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: false},
            //dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : false,
        legend: {
          data:[name+'总数',name+'在线数',name+'完好数']
        },
        xAxis : [
          {
            type : 'category',
            data : area
          }
        ],
        yAxis : [
          {
            type : 'value',
            name : '数量',
            axisLabel : {
              formatter: '{value}'
            }
          }
        ],
        series : [
          {
            name: name+'总数',
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: total
          },
          {
            name: name+'在线数',
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: onlinecount
          },
          {
            name: name+'完好数',
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: intactcount
          }
        ]
      };
      return option;
  },
  getDiZhouJiView:function(name,data,chartTitle){
    var area =[];
    var total =[];
    var onlinecount = [];
    var intactcount = [];
    var intactrate = [];
    if(data.length > 0){
      if(data.length == 1){
        //隐藏 12
      }else if(data.length == 2){
        var dataone = data[0];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            area.push(dataone[i].area);
            total.push(dataone[i].total);
            onlinecount.push(dataone[i].onlinecount);
            intactcount.push(dataone[i].intactcount);
            intactrate.push(dataone[i].intactrate);
          };
        };
      }else if(data.length ==3){
        var dataone = data[1];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            area.push(dataone[i].area);
            total.push(dataone[i].total);
            onlinecount.push(dataone[i].onlinecount);
            intactcount.push(dataone[i].intactcount);
            intactrate.push(dataone[i].intactrate);
          };
        };
      }
    }

    var option = {
        title : {
            text: chartTitle,
            x: 'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: false},
            //dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : false,
        dataZoom : {
            show : true,
            // realtime : true,
            // orient: 'horizontal',
            // type: 'inside',
            start : 0,
            end : 100
        },
        legend: {
          data:[name+'总数',name+'在线数',name+'完好数',name+'完好率']
        },
        xAxis : [
          {
            type : 'category',
            data : area
          }
        ],
        yAxis : [
          {
            type : 'value',
            name : '数量',
            axisLabel : {
              formatter: '{value}'
            }
          },
          {
              type : 'value',
              name : name+'完好率',
              axisLabel : {
                  formatter: '{value}%'
              }
          }
        ],
        series : [
          {
            name: name+'总数',
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: total
          },
          {
            name: name+'在线数',
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: onlinecount
          },
          {
            name: name+'完好数',
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: intactcount
          },
          {
            name: name+'完好率',
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%'
                    }
                }
            },
            data: intactrate
          }
        ]
      };
      return option;
  },
  getXianShiJiView:function(name,data,chartTitle){
    var area =[];
    var total =[];
    var onlinecount = [];
    var intactcount = [];
    var intactrate = [];
    if(data.length > 0){
      if(data.length == 1){
        var dataone = data[0];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            area.push(dataone[i].area);
            total.push(dataone[i].total);
            onlinecount.push(dataone[i].onlinecount);
            intactcount.push(dataone[i].intactcount);
            intactrate.push(dataone[i].intactrate);
          };
        };
      }else if(data.length == 2){
        var dataone = data[1];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            area.push(dataone[i].area);
            total.push(dataone[i].total);
            onlinecount.push(dataone[i].onlinecount);
            intactcount.push(dataone[i].intactcount);
            intactrate.push(dataone[i].intactrate);
          };
        };
      }else if(data.length ==3){
        var dataone = data[2];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            area.push(dataone[i].area);
            total.push(dataone[i].total);
            onlinecount.push(dataone[i].onlinecount);
            intactcount.push(dataone[i].intactcount);
            intactrate.push(dataone[i].intactrate);
          };
        };
      }
    }
    var option = {
        title : {
            text: chartTitle,
            x: 'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: false},
            //dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : false,
        dataZoom : {
            show : true,
            // realtime : true,
            // orient: 'horizontal',
            // type: 'inside',
            start : 0,
            end : 100
        },
        legend: {
          data:[name+'总数',name+'在线数',name+'完好数',name+'完好率']
        },
        xAxis : [
          {
            type : 'category',
            data : area
          }
        ],
        yAxis : [
          {
            type : 'value',
            name : '数量',
            axisLabel : {
              formatter: '{value}'
            }
          },
          {
              type : 'value',
              name : name+'完好率',
              axisLabel : {
                  formatter: '{value}%'
              }
          }
        ],
        series : [
          {
            name: name+'总数',
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: total
          },
          {
            name: name+'在线数',
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: onlinecount
          },
          {
            name: name+'完好数',
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                    }
                }
            },
            data: intactcount
          },
          {
            name: name+'完好率',
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%'
                    }
                }
            },
            data: intactrate
          }
        ]
      };
      return option;
  },
  // ---------------------报表table数据-----------------------
  getTingJiTableData:function(check){
    var data = [];
    if(check && typeof(check) == 'object' && check.constructor !== Array) {
      //data.push(check);
      if(check.length > 0){
        var dataone = check[0];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            data.push(dataone[i]);
          }
        }
      }
    }else if(check && check.constructor == Array) {
      if(check.length > 0){
        if(check.length == 1){

        }else if(check.length == 2){

        }else if(check.length ==3){
          var dataone = check[0];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }
      }
    };
    return data;
  },
  getDiZhouJiTableData:function(check){
    var data = [];
    if(check && typeof(check) == 'object' && check.constructor !== Array) {
      //data.push(check);
      if(check.length > 1){
        var dataone = check[1];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            data.push(dataone[i]);
          }
        }
      }
    }else if(check && check.constructor == Array) {
      if(check.length > 0){
          if(check.length == 1){

          }else if(check.length == 2){
            var dataone = check[0];
            for(var i=0;i<dataone.length;i++){
              if (dataone[i]) {
                data.push(dataone[i]);
              }
            }
          }else if(check.length ==3){
            var dataone = check[1];
            for(var i=0;i<dataone.length;i++){
              if (dataone[i]) {
                data.push(dataone[i]);
              }
            }
          }
        }
    }
    return data;
  },
  getXianShiJiTableData:function(check){
    var data = [];
    if(check && typeof(check) == 'object' && check.constructor !== Array) {
      //data.push(check);
      if(check.length > 2){
        var dataone = check[2];
        for(var i=0;i<dataone.length;i++){
          if (dataone[i]) {
            data.push(dataone[i]);
          }
        }
      }
    }else if(check && check.constructor == Array) {
      if(check.length > 0){
        if(check.length == 1){
          var dataone = check[0];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }else if(check.length == 2){
          var dataone = check[1];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }else if(check.length ==3){
          var dataone = check[2];
          for(var i=0;i<dataone.length;i++){
            if (dataone[i]) {
              data.push(dataone[i]);
            }
          }
        }
      }
    }
    return data;
  },
  // -----------------------------------自定义报表-----------------------------
  getTingJiCustomView:function(name,customData,chartTitle){
    var onlinerate =[];
    $(".tingjiCustom").show();
    $(".dizhoujiCustom").show();
    if(customData.length > 0){
      var dataone =[];
      if(customData.length == 1){
        $(".tingjiCustom").hide();
        $(".dizhoujiCustom").hide();
      }else if(customData.length == 2){
        $(".tingjiCustom").hide();
      }else if(customData.length = 3){
        dataone = customData[0];
      }
      if (dataone.length > 0) {
        for(var n=0;n<dataone.length;n++){
          var datatwo = dataone[n];
          if(datatwo){
            for(var item in datatwo){
              var datathree = datatwo[item];//key所对应的value
              if(datathree){
                for(var i=0;i<datathree.length;i++){
                  if (datathree[i]) {
                    // var xzb = datathree[i].date;
                    // //var yzb = dataone[i].onlinerate * 100;
                    // var yzb = datathree[i].onlinerate;
                    // var year = xzb.year < 1900 ? 1900 + xzb.year : xzb.year;
                    // onlinerate.push([
                    //   new Date(year, xzb.month, xzb.date),
                    //   yzb
                    // ]);
                    var dates = datathree[i].date;
                    var dated = new Date();
                    if(dates != ""){
                      dated = DateChange.strToDate(dates);
                    };
                    var yzb = datathree[i].onlinerate;
                    onlinerate.push([
                      dated,
                      yzb
                    ]);
                  }
                }
              }
            };
          };
        };
      };
    };

    var option = {
        title : {
            text: chartTitle,
            x: 'left'
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
              var date = new Date(params.value[0]);
              data = date.getFullYear() + '-'
                + (date.getMonth() + 1) + '-'
                + date.getDate();
              return data + '<br/>'	+ params.seriesName + ': ' + params.value[1] + '%';
            }
        },
        toolbox: {
            show : true,
            feature : {
                //mark : {show: true},
                //dataView : {show: true, readOnly: false},
                //restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        dataZoom: {
            show: true,
            start : 30,
            end : 100
        },
        legend : {
            data:[name+'在线率']
        },
        grid: {
            y2: 80
        },
        xAxis : [
            {
                type : 'time',
                splitNumber:10
            }
        ],
        yAxis : [
            {
              type : 'value',
              name : name+'在线率',
              axisLabel : {
                  formatter: '{value}%'
              }
            }
        ],
        series : [
            {
                name: name+'在线率',
                type: 'line',
                showAllSymbol: true,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'top',
                            formatter : function (params) {
                              return params.value[1] + '%';
                            }
                        }
                    }
                },
                data: onlinerate
            }
        ]
    };
    return option;
  },
  getDiZhouJiCustomView:function(name,customData,chartTitle){
    var onlinerate = [];
    var legenddata = [];
    var seriesdata = [];
    if(customData.length > 0){
      var dataone =[];
      if(customData.length == 1){

      }else if(customData.length == 2){
        dataone = customData[0];
      }else if(customData.length == 3){
        dataone = customData[1];
      }
      if (dataone.length > 0) {
        for(var n=0;n<dataone.length;n++){
          var datatwo = dataone[n];
          if(datatwo){
            for(var item in datatwo){
              var datathree = datatwo[item];//key所对应的value
              legenddata.push(item);
              var onlineratetemp = [];
              if(datathree){
                for(var i=0;i<datathree.length;i++){
                  if (datathree[i]) {
                    // var xzb = datathree[i].date;
                    // //var yzb = dataone[i].onlinerate * 100;
                    // var yzb = datathree[i].onlinerate;
                    // var year = xzb.year < 1900 ? 1900 + xzb.year : xzb.year;
                    // onlineratetemp.push([
                    //   new Date(year, xzb.month, xzb.date),
                    //   yzb
                    // ]);
                    var dates = datathree[i].date;
                    var dated = new Date();
                    if(dates != ""){
                      dated = DateChange.strToDate(dates);
                    };
                    var yzb = datathree[i].onlinerate;
                    onlineratetemp.push([
                      dated,
                      yzb
                    ]);
                  }
                }
              }
              onlinerate.push(onlineratetemp);
            };
          };
        };
      };
    };
    if(legenddata.length > 0){
      for(var i=0;i<legenddata.length;i++){
          var seriestemp ={
            name: legenddata[i],
            type: 'line',
            showAllSymbol: true,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                          return params.value[1] + '%';
                        }
                    }
                }
            },
            data: onlinerate[i]
          };
          seriesdata.push(seriestemp);
      }
    }else{
      var seriestemp ={
        name: "默认",
        type: 'line',
        showAllSymbol: true,
        data: []
      };
      seriesdata.push(seriestemp);
    }
    var option = {
        title : {
            text: chartTitle,
            x: 'left'
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
              var date = new Date(params.value[0]);
              data = date.getFullYear() + '-'
                + (date.getMonth() + 1) + '-'
                + date.getDate();
              return data + '<br/>'	+ params.seriesName + ': ' + params.value[1] + '%';
            }
        },
        toolbox: {
            show : true,
            feature : {
                //mark : {show: true},
                //dataView : {show: true, readOnly: false},
                //restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        dataZoom: {
            show: true,
            start : 30,
            end : 100
        },
        legend : {
            data:legenddata
        },
        grid: {
            y2: 80
        },
        xAxis : [
            {
                type : 'time',
                splitNumber:10
            }
        ],
        yAxis : [
            {
              type : 'value',
              name : name+'在线率',
              axisLabel : {
                  formatter: '{value}%'
              }
            }
        ],
        series : seriesdata
    };
    return option;
  },
  getXianShiJiCustomView:function(name,customData,chartTitle){
    var onlinerate = [];
    var legenddata = [];
    var seriesdata = [];
    if(customData.length > 0){
      var dataone =[];
      if(customData.length == 1){
        dataone = customData[0];
      }else if(customData.length == 2){
        dataone = customData[1];
      }else if(customData.length == 3){
        dataone = customData[2];
      }
      if (dataone.length > 0) {
        for(var n=0;n<dataone.length;n++){
          var datatwo = dataone[n];
          if(datatwo){
            for(var item in datatwo){
              var datathree = datatwo[item];//key所对应的value
              legenddata.push(item);
              var onlineratetemp = [];
              if(datathree){
                for(var i=0;i<datathree.length;i++){
                  if (datathree[i]) {
                    // var xzb = datathree[i].date;
                    // //var yzb = dataone[i].onlinerate * 100;
                    // var yzb = datathree[i].onlinerate;
                    // var year = xzb.year < 1900 ? 1900 + xzb.year : xzb.year;
                    // onlineratetemp.push([
                    //   new Date(year, xzb.month, xzb.date),
                    //   yzb
                    // ]);
                    var dates = datathree[i].date;
                    var dated = new Date();
                    if(dates != ""){
                      dated = DateChange.strToDate(dates);
                    };
                    var yzb = datathree[i].onlinerate;
                    onlineratetemp.push([
                      dated,
                      yzb
                    ]);
                  }
                }
              }
              onlinerate.push(onlineratetemp);
            };
          };
        };
      };
    };

    if(legenddata.length > 0){
      for(var i=0;i<legenddata.length;i++){
          var seriestemp ={
            name: legenddata[i],
            type: 'line',
            showAllSymbol: true,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                          return params.value[1] + '%';
                        }
                    }
                }
            },
            data: onlinerate[i]
          };
          seriesdata.push(seriestemp);
      }
    }else{
      var seriestemp ={
        name: "默认",
        type: 'line',
        showAllSymbol: true,
        data: []
      };
      seriesdata.push(seriestemp);
    };
    var option = {
        title : {
            text: chartTitle,
            x: 'left'
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
              var date = new Date(params.value[0]);
              data = date.getFullYear() + '-'
                + (date.getMonth() + 1) + '-'
                + date.getDate();
              return data + '<br/>'	+ params.seriesName + ': ' + params.value[1] + '%';
            }
        },
        toolbox: {
            show : true,
            feature : {
                //mark : {show: true},
                //dataView : {show: true, readOnly: false},
                //restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        dataZoom: {
            show: true,
            start : 30,
            end : 100
        },
        legend : {
            //data:['在线率']
            data:legenddata
        },
        grid: {
            y2: 80
        },
        xAxis : [
            {
                type : 'time',
                splitNumber:10
            }
        ],
        yAxis : [
            {
              type : 'value',
              name : name+'在线率',
              axisLabel : {
                  formatter: '{value}%'
              }
            }
        ],
        series : seriesdata
    };
    return option;
  }
}
module.exports = Util;
