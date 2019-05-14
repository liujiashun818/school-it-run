var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');
require('bootstrap-table');

var ReactRouter = require('react-router');
var ReactWidgets = require('react-widgets');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
var _this="";

function selectExcelKey(value,row){
  // console.log(_this,row);
  var keyList = _this.state.keyList;
  var dataList = [];
  for(var i=0;i<keyList.length;i++){
    dataList.push(keyList[i].field);
  };
  var optionList = [];
  optionList.push("<option> </option>")
  for(var i=0;i<dataList.length;i++){
    var dataObj = dataList[i];
    var optionObj = "<option>"+dataObj+"</option>";
    optionList.push(optionObj);
  };
  return "<select class='selectExcelVal'>"+optionList+"<select>";
};

var exportInModal = React.createClass({
  getInitialState:function(){
    _this = this;
    return ({
      isLoadExcel:0,
      sheetVal:1,
      curBusOb:"",
      sheetList: [],
      keyList:[]
    });
  },
  mc:function(){
    var _i=document.getElementById("uploadfile");
    _i.click();
  },
  mm:function(e){
    // console.log($(e.target),"111111111111111111111111111111");
    var val = $(e.target).val();
    // var val = document.f1.uf.value;
    document.getElementById("puf").value=val;
  },
  readExcel:function(){
    var that = this;
    $('#exportExcelTable').bootstrapTable('destroy');
    $('#exportOdataTable').bootstrapTable('destroy');
    var tempStr = "";
    //得到文件路径的值
    //var filePath = document.getElementById("upfile").value;
    var filePath = document.getElementById("puf").value;
    var oXL = null;
    //检索浏览器 这种判断支持 IE11
   if(!!window.ActiveXObject || "ActiveXObject" in window){
       //IE浏览器
   }else{
     alert('请用IE浏览器进行Excel电子表格数据导入。');
     return;
   };
   try {
     //创建操作EXCEL应用程序的实例
     oXL = new ActiveXObject("Excel.application");
   }catch(e) {
     alert("请确认:\n1.Microsoft Excel已被安装。\n2.IE浏览器须允许执行“ActiveX 控件”。\n工具 => Internet 选项=> 安全 => 设置 \"启用不安全的 ActiveX\"\n");
     return "";
   };
    //打开指定路径的excel文件
    var oWB = oXL.Workbooks.open(filePath);

    //获取excel文件中所以工作表单sheet的名称
    var sheetsum = oWB.Worksheets.count;
    var sheetList = [];
    for(var n=1;n<=sheetsum;n++){
     var sheetname = '';
     //oWB.worksheets(n).select();
     var oSheettemp = oWB.worksheets(n);
     sheetname = oSheettemp.Name;
     var sheetObj = {
       index:n,
       name:sheetname
     };
     sheetList.push(sheetObj);
    };
    this.setState({sheetList:sheetList});

    $("#workSheetsSelect").find(".rw-input").text(sheetList[0].name);

    var sheetNumber = that.state.sheetVal;
   //  console.log(sheetNumber);
    //操作第一个sheet(从一开始，而非零)
    sheetNumber = parseInt(sheetNumber);
    try {
      oWB.worksheets(sheetNumber).select();
    }catch(e){
      alert("选择的是无效的工作区间");
      return false;
    }
    var oSheet = oWB.ActiveSheet;
    //使用的行数
    var rows = oSheet.usedrange.rows.count;
    //使用的列数
    var cols = oSheet.usedrange.columns.count;
    if(rows <=1){
      tempStr = "表格无有效数据";
      alert("表格无有效数据");
    }else{
      tempStr += "  ";
      try {
        var jsonList = [];
        var keyList = [];
        for (var i = 1; i <= rows; i++) {
         //  if (oSheet.Cells(i, 1).value == "null" || oSheet.Cells(i, 2).value == "null") break;
          for(var j=1;j<=cols;j++){
            var addStr = oSheet.Cells(i, j).value;
            if(addStr == "undefined" || addStr == "" || addStr == null){
              addStr = "----";
            }else{
              addStr = oSheet.Cells(i, j).value.toString();
            };
            tempStr += addStr;
            tempStr += "  ";
            if(j==cols){
              tempStr += "\n";
            };
          };
          //  tempStr += (" " + oSheet.Cells(i, 1).value + " " + oSheet.Cells(i, 2).value + " " + oSheet.Cells(i, 3).value + " " + oSheet.Cells(i, 4).value + " " + oSheet.Cells(i, 5).value+" " + oSheet.Cells(i, 6).value + " "+ oSheet.Cells(i, 7).value + " " + "\n");
        };

        for(var i=2;i<=rows;i++){
          var objTest = {};
          for(var j=1;j<=cols;j++){
            var keys = oSheet.Cells(1, j).value;
            var addStr = oSheet.Cells(i, j).value;
            if(addStr == "undefined" || addStr == "" || addStr == null){
              addStr = "";
            }else{
              addStr = oSheet.Cells(i, j).value.toString();
            };
            objTest[keys] = addStr;
            if(i==2){
              var keyListObj = {
                title:keys,
                field:keys,
                halign: 'left',
                align: 'left',
                sortable: true
              }
              keyList.push(keyListObj);
            };
          };
          jsonList.push(objTest);
        };
        // console.log(jsonList,keyList);
        $('#exportExcelTable').bootstrapTable({
          columns: keyList,
          data: jsonList
        });
        that.setState({isLoadExcel:1,keyList:keyList});
      } catch(e) {
        //  console.log(e);
        // document.getElementById("txtArea").value = tempStr;
      };
    };
    // document.getElementById("txtArea").value = tempStr;
    //退出操作excel的实例对象
    oXL.Application.Quit();
     //手动调用垃圾收集器
    CollectGarbage();
  },
  changeSheet:function(e){
    var val = e.index;
    console.log(e);
    var that = this;
    $('#exportExcelTable').bootstrapTable('destroy');
    $('#exportOdataTable').bootstrapTable('destroy');
    var tempStr = "";
    //得到文件路径的值
    var filePath = document.getElementById("puf").value;
    var oXL = null;
    //检索浏览器 这种判断支持 IE11
   if(!!window.ActiveXObject || "ActiveXObject" in window){
       //IE浏览器
   }else{
     alert('请用IE浏览器进行Excel电子表格数据导入。');
     return;
   };
   try {
     //创建操作EXCEL应用程序的实例
     oXL = new ActiveXObject("Excel.application");
   }catch(e) {
     alert("请确认:\n1.Microsoft Excel已被安装。\n2.IE浏览器须允许执行“ActiveX 控件”。\n工具 => Internet 选项=> 安全 => 设置 \"启用不安全的 ActiveX\"\n");
     return "";
   };
    //打开指定路径的excel文件
    var oWB = oXL.Workbooks.open(filePath);

    var sheetsum = oWB.Worksheets.count;
    var sheetList = [];
    for(var n=1;n<=sheetsum;n++){
     var sheetname = '';
     //oWB.worksheets(n).select();
     var oSheettemp = oWB.worksheets(n);
     sheetname = oSheettemp.Name;
     var sheetObj = {
       index:n,
       name:sheetname
     };
     sheetList.push(sheetObj);
    };
    this.setState({sheetList:sheetList});

    var sheetNumber = val;
    //操作第一个sheet(从一开始，而非零)
    sheetNumber = parseInt(sheetNumber);
    try {
      oWB.worksheets(sheetNumber).select();
    }catch(e){
      alert("选择的是无效的工作区间");
      return false;
    }
    var oSheet = oWB.ActiveSheet;
    //使用的行数
    var rows = oSheet.usedrange.rows.count;
    //使用的列数
    var cols = oSheet.usedrange.columns.count;
    if(rows <=1){
      tempStr = "表格无有效数据";
      alert("表格无有效数据");
    }else{
      tempStr += "  ";
      try {
        var jsonList = [];
        var keyList = [];
        for (var i = 1; i <= rows; i++) {
          for(var j=1;j<=cols;j++){
            var addStr = oSheet.Cells(i, j).value;
            if(addStr == "undefined" || addStr == "" || addStr == null){
              addStr = "----";
            }else{
              addStr = oSheet.Cells(i, j).value.toString();
            };
            tempStr += addStr;
            tempStr += "  ";
            if(j==cols){
              tempStr += "\n";
            };
          };
        };

        for(var i=2;i<=rows;i++){
          var objTest = {};
          for(var j=1;j<=cols;j++){
            var keys = oSheet.Cells(1, j).value;
            var addStr = oSheet.Cells(i, j).value;
            if(addStr == "undefined" || addStr == "" || addStr == null){
              addStr = "";
            }else{
              addStr = oSheet.Cells(i, j).value.toString();
            };
            objTest[keys] = addStr;
            if(i==2){
              var keyListObj = {
                title:keys,
                field:keys,
                halign: 'left',
                align: 'left',
                sortable: true
              }
              keyList.push(keyListObj);
            };
          };
          jsonList.push(objTest);
        };
        $('#exportExcelTable').bootstrapTable({
          columns: keyList,
          data: jsonList
        });
        that.setState({isLoadExcel:1,keyList:keyList});
      } catch(e) {
        //  console.log(e);
      };
    };
    //退出操作excel的实例对象
    oXL.Application.Quit();
     //手动调用垃圾收集器
    CollectGarbage();
  },
  changeBusOb:function(e){
    var selectedBusOb = e.name;
    this.props.getBusObDefFields(selectedBusOb);
    this.setState({curBusOb:e.name});
  },
  initExportOdataTable:function(){
    var busObDefField=this.props.busObDefField;
    var isLoadExcel=this.state.isLoadExcel;
    $('#exportOdataTable').bootstrapTable('destroy');
    if(isLoadExcel>0){
      $('#exportOdataTable').bootstrapTable({
        columns: [
          {
            title:"数据库字段",
            field:"alias",
            halign:"left",
            align:"left",
            sortable: true
          },{
            title:"对应表中字段",
            field:"name",
            halign:"left",
            align:"left",
            formatter: selectExcelKey,
            sortable: true
          }
        ],
        data:busObDefField
      });
    }else{
      alert("请先读取Excel再读取业务对象。");
    };
  },
  saveExcelData:function(){
    var busObDefField=this.props.busObDefField;
    var selectExcelValList = [];
    $(".selectExcelVal").each(function(){
      var selectExcel = $(this).val();
      selectExcelValList.push(selectExcel);
    });
    var totalData = $('#exportExcelTable').bootstrapTable("getData");
    // console.log(selectExcelValList,totalData);
    var sqlDataList = [];
    for(var i=0;i<totalData.length;i++){
      var rowData = totalData[i];
      var sqlData = {};
      for(var j=0;j<selectExcelValList.length;j++){
        var selectExcel = selectExcelValList[j];
        if(selectExcel != null && selectExcel != ""){
          var busObN = busObDefField[j].name;
          // console.log(selectExcel,busObN);
          sqlData[busObN] = rowData[selectExcel];
          // for(var k=0;k<busObDefField.length;k++){
          //   var busObA = busObDefField[k].alias;
          //   var busObN = busObDefField[k].name;
          //   console.log(busObA,busObN);
          //   if(busObA == selectExcel){
          //     var sqlData = {};
          //     sqlData[busObN] = rowData[busObA];
          //     sqlDataList.push(sqlData);
          //   };
          // };
        };
      };
      sqlDataList.push(sqlData);
    };
    var curBusOb = this.state.curBusOb;
    var tableObj = {
      tableName:curBusOb,
      tableData:sqlDataList
    };
    // console.log(tableObj);
    this.props.saveExcelDataToSpace(tableObj);
  },
  render:function(){
    var busObDefName = this.props.busObDefName;
    var sheets = this.state.sheetList;
    // var optionList = [];
    // for(var i=0;i<busObDefName.length;i++){
    //   var dataObj = busObDefName[i].alias;
    //   var dataVal = busObDefName[i].name;
    //   var optionObj = (<option value={dataVal}>{dataObj}</option>);
    //   optionList.push(optionObj);
    // };
    // console.log(optionList,"11111111111111111111111111111111");
    return (
      <div className="modal fade" id="exportInModal" tabIndex="-1" role="dialog" aria-labelledby="exportInModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">导入数据</h4>
            </div>
            <div className="modal-body">
              <div className="col-md-8" style={{"borderRight":"1px solid #eee","height":"500px"}}>
                <div className="col-md-6">
                  <input type="text" name="predent" id="puf" placeholder="请选择要导入的表格" disabled="true"/>
                  <button onClick={this.mc} className="btn btn-default" style={{"marginLeft":"10px"}}>浏览</button>
                  <input type="file" name="uf" id="uploadfile" style={{"display":"none"}} onChange={this.mm}/>
                  <button onClick={this.readExcel} className="btn btn-success" style={{"marginLeft":"10px"}}>读取</button>
                </div>
                <div className="col-md-6">
                  <ReactWidgets.DropdownList className='dropdownStyle' onSelect={this.changeSheet} textField='name' data={sheets} id="workSheetsSelect"/>
                  {/*<select id="workSheetsSelect">
                    <option value="1">Sheet1</option>
                    <option value="2">Sheet2</option>
                    <option value="3">Sheet3</option>
                  </select>*/}
                  <span className="workSheetsTitle">请选择工作区间</span>
                </div>
                {/*<textarea id="txtArea" cols="150" rows="50"></textarea>*/}
                <div className="col-md-12">
                  <table id='exportExcelTable'
                    data-toggle='table'
                    data-search='true'
                    data-classes='table table-no-bordered table-hover'
                    data-toolbar='#toolbar'
                    data-show-refresh='false'
                    data-show-toggle='false'
                    data-show-columns='false'
                    data-show-export='false'
                    data-pagination='true'
                    data-page-list='[10]'>
                  </table>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col-md-12">
                  <button className="btn btn-success" onClick={this.initExportOdataTable} id="exportOdataTableInitButton">读取</button>
                  <ReactWidgets.DropdownList className='dropdownStyle' onSelect={this.changeBusOb} textField='alias' data={busObDefName} id="ywdxSelect"/>
                  {/*<select id="ywdxSelect" onSelect={this.changeBusOb}>
                    {this.optionList}
                  </select>*/}
                  <span className="workSheetsTitle">请选择业务对象</span>
                </div>
                <div className="col-md-12">
                  <table id='exportOdataTable'
                    data-toggle='table'
                    data-search='true'
                    data-classes='table table-no-bordered table-hover'
                    data-toolbar='#toolbar'
                    data-show-refresh='false'
                    data-show-toggle='false'
                    data-show-columns='false'
                    data-show-export='false'
                    data-pagination='false'
                    data-height={430}
                    data-page-list='[100]'>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={this.saveExcelData}>导入数据库</button>
              <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = exportInModal;
