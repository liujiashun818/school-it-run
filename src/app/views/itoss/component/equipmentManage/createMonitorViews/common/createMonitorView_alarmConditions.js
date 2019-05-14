/**
 * Created by SHIN on 2015/12/29.
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

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

var AlarmConditions_error = React.createClass({
    componentWillMount: function() {
        var errorAlarmText = "";
        var errorConditionsData = this.props.monitorAlarmData;
        //按与或关系排序，先与后或
        errorConditionsData.sort(function(a,b){
            return a.conditionRelation>b.conditionRelation ? 1 : -1;
        });
        for (var i = 0; i < errorConditionsData.length; i++) {
            if(i == 0) {
                errorAlarmText += errorConditionsData[i].conditionName + " " + errorConditionsData[i].conditionSymbol + " " + errorConditionsData[i].conditionValue;
            }
            else {
                errorAlarmText += (errorConditionsData[i].conditionRelation==""||errorConditionsData[i].conditionRelation=="0" ? " 与 " : " 或 ") + errorConditionsData[i].conditionName + " " + errorConditionsData[i].conditionSymbol + " " + errorConditionsData[i].conditionValue;
            }
        }
        this.props.setMonitorErrorAlarmText(errorAlarmText);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if (nextProps.monitorAlarmData !== this.props.monitorAlarmData) {
            var errorAlarmText = "";
            var errorConditionsData = nextProps.monitorAlarmData;
            //按与或关系排序，先与后或
            errorConditionsData.sort(function(a,b){
                return a.conditionRelation>b.conditionRelation ? 1 : -1;
            });
            for (var i = 0; i < errorConditionsData.length; i++) {
                if(i == 0) {
                    errorAlarmText += errorConditionsData[i].conditionName + " " + errorConditionsData[i].conditionSymbol + " " + errorConditionsData[i].conditionValue;
                }
                else {
                    errorAlarmText += (errorConditionsData[i].conditionRelation==""||errorConditionsData[i].conditionRelation=="0" ? " 与 " : " 或 ") + errorConditionsData[i].conditionName + " " + errorConditionsData[i].conditionSymbol + " " + errorConditionsData[i].conditionValue;
                }
            }
            this.props.setMonitorErrorAlarmText(errorAlarmText);
        }
        return true;
    },

    render: function() {
        return (
            <tr>
                <th rowSpan="5" style={{width:"10%"}}>报警条件</th>
                <td className="paddingleft10" style={{width:"15%"}}>错误</td>
                <td colSpan="4" style={{width:"70%"}}><textarea className="form-control" style={{height:"60px"}} title="监测器为“错误”状态时的判断条件" value={this.props.monitorErrorAlarmText}/></td>
                <td style={{width:"5%"}}><button type="button" className="btn btn-default btnGetModel" style={{width:"100%"}} data-toggle="modal" data-target="#errorAlarmConditionModal">...</button></td>
            </tr>
        );
    }
});

var AlarmConditions_warning = React.createClass({
    componentWillMount: function() {
        var warningAlarmText = "";
        var warningConditionsData = this.props.monitorAlarmData;
        //按与或关系排序，先与后或
        warningConditionsData.sort(function(a,b){
            return a.conditionRelation>b.conditionRelation ? 1 : -1;
        });
        for (var i = 0; i < warningConditionsData.length; i++) {
            if(i == 0) {
                warningAlarmText += warningConditionsData[i].conditionName + " " + warningConditionsData[i].conditionSymbol + " " + warningConditionsData[i].conditionValue;
            }
            else {
                warningAlarmText += (warningConditionsData[i].conditionRelation==""||warningConditionsData[i].conditionRelation=="0" ? " 与 " : " 或 ") + warningConditionsData[i].conditionName + " " + warningConditionsData[i].conditionSymbol + " " + warningConditionsData[i].conditionValue;
            }
        }
        this.props.setMonitorWarningAlarmText(warningAlarmText);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if (nextProps.monitorAlarmData !== this.props.monitorAlarmData) {
            var warningAlarmText = "";
            var warningConditionsData = nextProps.monitorAlarmData;
            //按与或关系排序，先与后或
            warningConditionsData.sort(function(a,b){
                return a.conditionRelation>b.conditionRelation ? 1 : -1;
            });
            for (var i = 0; i < warningConditionsData.length; i++) {
                if(i == 0) {
                    warningAlarmText += warningConditionsData[i].conditionName + " " + warningConditionsData[i].conditionSymbol + " " + warningConditionsData[i].conditionValue;
                }
                else {
                    warningAlarmText += (warningConditionsData[i].conditionRelation==""||warningConditionsData[i].conditionRelation=="0" ? " 与 " : " 或 ") + warningConditionsData[i].conditionName + " " + warningConditionsData[i].conditionSymbol + " " + warningConditionsData[i].conditionValue;
                }
            }
            this.props.setMonitorWarningAlarmText(warningAlarmText);
        }
        return true;
    },

    render: function() {
        return (
            <tr>
                <td className="paddingleft10" style={{width:"15%"}}>危险</td>
                <td colSpan="4" style={{width:"70%"}}><textarea className="form-control" style={{height:"60px"}} title="监测器为“危险”状态时的判断条件" value={this.props.monitorWarningAlarmText}/></td>
                <td style={{width:"5%"}}><button type="button" className="btn btn-default btnGetModel" style={{width:"100%"}} data-toggle="modal" data-target="#warningAlarmConditionModal">...</button></td>
            </tr>
        );
    }
});

var AlarmConditions_good = React.createClass({
    componentWillMount: function() {
        var goodAlarmText = "";
        var goodConditionsData = this.props.monitorAlarmData;
        //按与或关系排序，先与后或
        goodConditionsData.sort(function(a,b){
            return a.conditionRelation>b.conditionRelation ? 1 : -1;
        });
        for (var i = 0; i < goodConditionsData.length; i++) {
            if(i == 0) {
                goodAlarmText += goodConditionsData[i].conditionName + " " + goodConditionsData[i].conditionSymbol + " " + goodConditionsData[i].conditionValue;
            }
            else {
                goodAlarmText += (goodConditionsData[i].conditionRelation==""||goodConditionsData[i].conditionRelation=="0" ? " 与 " : " 或 ") + goodConditionsData[i].conditionName + " " + goodConditionsData[i].conditionSymbol + " " + goodConditionsData[i].conditionValue;
            }
        }
        this.props.setMonitorGoodAlarmText(goodAlarmText);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if (nextProps.monitorAlarmData !== this.props.monitorAlarmData) {
            var goodAlarmText = "";
            var goodConditionsData = nextProps.monitorAlarmData;
            //按与或关系排序，先与后或
            goodConditionsData.sort(function(a,b){
                return a.conditionRelation>b.conditionRelation ? 1 : -1;
            });
            for (var i = 0; i < goodConditionsData.length; i++) {
                if(i == 0) {
                    goodAlarmText += goodConditionsData[i].conditionName + " " + goodConditionsData[i].conditionSymbol + " " + goodConditionsData[i].conditionValue;
                }
                else {
                    goodAlarmText += (goodConditionsData[i].conditionRelation==""||goodConditionsData[i].conditionRelation=="0" ? " 与 " : " 或 ") + goodConditionsData[i].conditionName + " " + goodConditionsData[i].conditionSymbol + " " + goodConditionsData[i].conditionValue;
                }
            }
            this.props.setMonitorGoodAlarmText(goodAlarmText);
        }
        return true;
    },

    render: function() {
        return (
            <tr>
                <td className="paddingleft10" style={{width:"15%"}}>正常</td>
                <td colSpan="4" style={{width:"70%"}}><textarea className="form-control" style={{height:"60px"}} title="监测器为“正常”状态时的判断条件" value={this.props.monitorGoodAlarmText}/></td>
                <td style={{width:"5%"}}><button type="button" className="btn btn-default btnGetModel" style={{width:"100%"}} data-toggle="modal" data-target="#goodAlarmConditionModal">...</button></td>
            </tr>
        );
    }
});

var AlarmConditions_creatInfo = React.createClass({
    getInitialState: function() {
        return {
            createdBy: "",
            createdDateTime: ""
        }
    },
    componentDidMount:function(){
      if (this.isMounted()) {
        const { monitorsPropertyData,monitorsPropertyEdit } = this.props;
        if(monitorsPropertyEdit){
          //编辑监测器属性
          if(monitorsPropertyData){
            var CreatedBy = monitorsPropertyData.CreatedBy;
            this.setState({createdBy:CreatedBy});
            var CreatedDateTimeTemp = monitorsPropertyData.CreatedDateTime;
            var CreatedDateTime = "";
            if(CreatedDateTimeTemp){
              var dCreatedDateTimeTemp = new Date(parseInt(CreatedDateTimeTemp.substring(6, (CreatedDateTimeTemp.length - 2))));
              CreatedDateTime = dCreatedDateTimeTemp.Format("yyyy-MM-dd hh:mm");
            }
            this.setState({createdDateTime:CreatedDateTime});
          };
        }else{
          //增加监测器
          this.setState({createdBy:localStorage.getItem("localUserName")});
          this.setState({createdDateTime:(new Date()).Format("yyyy-MM-dd hh:mm")});
        };
      }
    },
    render: function() {
        return (
            <tr>
                <td className="paddingleft10" style={{width:"15%"}}>创建人</td>
                <td colSpan="2" style={{width:"30%"}}>
                    <div style={{padding:"0 5px",fontWeight:"bold",color:"black"}} title="该对象的创建人">
                        {this.state.createdBy}
                    </div>
                </td>
                <td className="paddingleft10" style={{width:"15%"}}>创建时间</td>
                <td colSpan="2" style={{width:"30%"}}>
                   <div style={{padding:"0 5px",fontWeight:"bold",color:"black"}}>
                       {this.state.createdDateTime}
                   </div>
                </td>
            </tr>
        );
    }
});

var AlarmConditions_modifyInfo = React.createClass({
    getInitialState: function() {
        return {
            lastModBy: "",
            lastModDateTime: ""
        }
    },
    componentDidMount:function(){
      if (this.isMounted()) {
        const { monitorsPropertyData,monitorsPropertyEdit } = this.props;
        if(monitorsPropertyEdit){
          //编辑监测器属性
          if(monitorsPropertyData){
            var LastModBy = monitorsPropertyData.LastModBy;
            this.setState({lastModBy:LastModBy});
            var LastModDateTimeTemp = monitorsPropertyData.LastModDateTime;
            var LastModDateTime = "";
            if(LastModDateTimeTemp){
              var dLastModDateTime = new Date(parseInt(LastModDateTimeTemp.substring(6, (LastModDateTimeTemp.length - 2))));
              LastModDateTime = dLastModDateTime.Format("yyyy-MM-dd hh:mm");
            };
            this.setState({lastModDateTime:LastModDateTime});
          };
        }else{
          //增加监测器
            this.setState({lastModBy:localStorage.getItem("localUserName")});
            this.setState({lastModDateTime:(new Date()).Format("yyyy-MM-dd hh:mm")});
        };
      }
    },
    render: function() {
        return (
            <tr>
                <td className="paddingleft10" style={{width:"15%"}}>最后修改人</td>
                <td colSpan="2" style={{width:"30%"}}>
                   <div style={{padding:"0 5px",fontWeight:"bold",color:"black"}} title="该对象最后修改的人">
                       {this.state.lastModBy}
                   </div>
                </td>
                <td className="paddingleft10" style={{width:"15%"}}>最后修改时间</td>
                <td colSpan="2" style={{width:"30%"}}>
                    <div style={{padding:"0 5px",fontWeight:"bold",color:"black"}}>
                        {this.state.lastModDateTime}
                    </div>
                </td>
            </tr>
        );
    }
});

// module.exports = AlarmConditions;
module.exports = {
  ErrorCondition:AlarmConditions_error,
  WarningCondition:AlarmConditions_warning,
  GoodCondition:AlarmConditions_good,
  CreatInfo:AlarmConditions_creatInfo,
  ModifyInfo:AlarmConditions_modifyInfo
};
