require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'
import * as dataDictActions from '../../../../actions/dataDict_action'

var Store = require('../../../../server/store.js');
var base64 = require('../../../../utils/base64.js');
var util = require('../../../../utils/util.js');

var SystemInfoPage = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("DictStore")],
    // getStateFromFlux: function() {
    //   var flux = this.getFlux();
    //   return {
    //     dict:flux.store("DictStore").getState()
    //   }
    // },
    componentDidMount:function(){
        const { dispatch } = this.props;
        if($('#systemInfoPageView') != null) {
            var height = $(window).height() - 110 - 30 + 'px';
            $('#systemInfoPageView').css("height",height);
        }
        dispatch(dataDictActions.get_systemInfoData());
    },
    render:function(){
      var infoData = this.props.systemInfoData;
      var serverTotalCount = "";
      var serverUseCount = "";
      var netWorkTotalCount = "";
      var netWorkUseCount = "";
      var visioIsBuy = "";
      var AlmIsBuy = "";
      var userName = "";
      var version = "";
      var expireDate = "";
      var versionNum = "";
      var phoneNum = "";
      var webSite = "";
      var weibaoStartTime = "";
      var weibaoEndTime = "";
      if(infoData!=null && infoData!=""){
        infoData = infoData[0];
        serverTotalCount = infoData.SERVER_TOTAL_COUNT;
        serverUseCount = infoData.SERVER_USE_COUNT;
        netWorkTotalCount = infoData.NETWORK_TOTAL_COUNT;
        netWorkUseCount = infoData.NETWORK_USE_COUNT;
        visioIsBuy = infoData.VISIO_ISBUY;
        AlmIsBuy = infoData.ALM_ISBUY;
        userName = infoData.USERNAME;
        version = infoData.VERSION;
        expireDate = infoData.EXPIRE_DATE;
        versionNum = infoData.VERSION_NUM;
        phoneNum = infoData.PHONE_NUM;
        webSite = infoData.WEBSITE;
        weibaoStartTime = infoData.MAINTENANCE_STARTTIME;
        weibaoEndTime = infoData.MAINTENANCE_ENDTIME;
      };
      if(weibaoStartTime == "未购买"){
        $("#weibaoStartTime").attr("colSpan","4");
        $("#weibaoEndTime").hide();
      }else{
        $("#weibaoStartTime").attr("colSpan","2");
        $("#weibaoEndTime").attr("colSpan","2");
        $("#weibaoEndTime").show();
      }
      return (
        <div id='systemInfoPage' className='overviewDiv'>
          <div id='systemInfoPageView'>
            <table id="systemInfoPageTable">
              <tbody>
                <tr>
                  <th rowSpan="5">功能模块</th>
                  <td>服务器监测 SV-S</td>
                  <th rowSpan="2">使用点数</th>
                  <td style={{"width":"15%"}}>{serverUseCount}</td>
                  <th rowSpan="2">购买点数</th>
                  <td style={{"width":"15%"}}>{serverTotalCount}</td>
                </tr>
                <tr>
                  <td>NNM网络设备管理模块</td>
                  <td>{netWorkUseCount}</td>
                  <td>{netWorkTotalCount}</td>
                </tr>
                <tr>
                  <td>Visio拓扑图模块</td>
                  <td colSpan="4">{visioIsBuy}</td>
                </tr>
                <tr>
                  <td>ALM资产管理模块</td>
                  <td colSpan="4">{AlmIsBuy}</td>
                </tr>
                <tr>
                  <td>ITSM运维管理模块</td>
                  <td colSpan="4">免费</td>
                </tr>
                <tr>
                  <th>用户名称</th>
                  <td colSpan="5">{userName}</td>
                </tr>
                <tr>
                  <th rowSpan="3">版本信息</th>
                  <td>{version}</td>
                  <td>到期时间</td>
                  <td colSpan="3">{expireDate}</td>
                </tr>
                <tr>
                  <td id="weibaoTag">维保时间</td>
                  <td colSpan="2" id="weibaoStartTime">{weibaoStartTime}</td>
                  <td colSpan="2" id="weibaoEndTime">{weibaoEndTime}</td>
                </tr>
                <tr>
                  <td>版本编号</td>
                  <td colSpan="4">{versionNum}</td>
                </tr>
                <tr>
                  <th>联系电话</th>
                  <td colSpan="5">{phoneNum}</td>
                </tr>
                <tr>
                  <th>网站</th>
                  <td colSpan="5">{webSite}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
});

// module.exports = SystemInfoPage;
SystemInfoPage.propTypes = {
    systemInfoData: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { systemInfoData } = state.dataDictReducer

  return {
      systemInfoData
  }
}

export default connect(mapStateToProps)(SystemInfoPage)
