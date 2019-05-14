/**
* 张锌楠
* 服务级别列表
*/
require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
import { connect } from 'react-redux';
import { slaMultDelete } from '../../../../../actions/sla_action';

import SlaTableBox from './widget/SlaTableBox';
var Widget = require('./widget/Widget');
var Util = require('../util');

$(window).resize(function(){
  $.panelHeight(".panelBasic",150);
});

var SlaList = React.createClass({
    mixins: [History],
    componentWillMount:function(){
      // const { dispatch } = this.props;
      // dispatch(getSlaList({}));
      // this.getFlux().actions.YFTSlaActions.setSlaLimit(Util.getSlaLimit());
    },
    componentDidMount: function() {
      $.panelHeight(".panelBasic",150);
    },
    onClickAdd:function(){
      this.history.pushState(null,'baseManage/slaAdd');
    },
    onClickDelete:function(){
      var selectMult = $('#slaTable').bootstrapTable('getSelections');
      if(selectMult instanceof Array && selectMult.length > 0){

        if(confirm("确认要删除吗?")){
          var mRecid = "";
          var cId = "";
          for(var i =0; i < selectMult.length; i++){
            if(i == selectMult.length-1){
              mRecid = "'"+mRecid+selectMult[i].serviceLevelAgreementRecId+"'";
              cId = cId+selectMult[i].id;
            }else{
              mRecid = ""+mRecid+selectMult[i].serviceLevelAgreementRecId+"','";
              cId = cId+selectMult[i].id+",";
            }
          }
          var obj = [{key:'TABLENAME',value:'ServiceLevelAgreement'},{key:'KEYWORD',value:'RecId'},{key:'VALUE',value:mRecid}];
          const { dispatch } = this.props;
          dispatch(slaMultDelete(obj));
        }
      }


    },
    render:function(){
      var quxianLimit = Util.getSlaLimit();
      return(
            <div id='hardwareManageCreateView' className='repositoryOverview'>
              <div className="overviewDesViewDiv panelBasic">
                  <Widget.RepositoryTitle title="服务级别列表" returnUrl="" returnUrlName=""/>
                  <div className="staticDiv col-md-12">
                      <div className="staticLeftDiv yunweiDescribeMargin">
                          <div className='repositoryAddHead'>
                            <span>服务级别协议的功能：新建和查看组织内服务级别协议列表，并编辑工单的响应时间、解决时间、超过时间时、扣费标准等。</span>
                          </div>
                          <div>
                            {quxianLimit.slaAdd ? <input type="button" className="repositorySubmit yunweiHeight" value="添加" onClick={this.onClickAdd}/> : ""}
                            {quxianLimit.slaListDelete ? <input type="button" className="yunweiDelete yunweiHeight yunweiDescribeMargin" value="删除" onClick={this.onClickDelete}/> : ""}
                          </div>
                      </div>
                  </div>
                  <div>
                      <SlaTableBox />
                  </div>
              </div>
            </div>
      );
    }
});
export default connect()(SlaList);
// export default SlaList;
