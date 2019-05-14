require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

import GroupButtons from './createGroupButtons.js';
import GroupDetail from './createGroupFormDetail.js';

var Store = require('../../../../../server/store');
var base64 = require('../../../../../utils/base64.js');

var createGroupFormView = React.createClass({
  mixins: [History],
  // getStateFromFlux: function() {
  //   var flux = this.getFlux();
  //   return {
  //     itoss:flux.store("YFTSystemStore").getState(),
  //     lis:[]
  //   }
  // },
  componentDidMount: function() {
    if($('#createGroupForm') != null) {
      var height = $(window).height() - 110 - 30 + 'px';
      $('#createGroupForm').css("height",height);
    }
  },
  // componentWillMount: function() {
  //   var that = this;
  //   var temp = Store.get("PERMISSIONS");
  //   if(temp!=null&&temp!=""){
  //     temp = base64.base64decode(temp);
  //     temp = decodeURI(temp);
  //     var ttemp = eval(temp);
  //     // console.log(ttemp);
  //     that.getFlux().actions.YFTSystemActions.set_permissionsys(ttemp);
  //   };
  // },
  render:function(){
    return (
      <div id='createGroupForm' className='overviewDesViewDiv'>
        <GroupButtons
          curTree={this.props.curTree} createInfo={this.props.createInfo} pcodeMark={this.props.pcodeMark}
          curGroupData={this.props.curGroupData} parentCode={this.props.parentCode} sysMapDataValue={this.props.sysMapDataValue}
          groups={this.props.groups} roleTree={this.props.roleTree}

          delete_groupAll={this.props.delete_groupAll}
          delete_groupById={this.props.delete_groupById}
          save_createGroup={this.props.save_createGroup}
        />
        <div className='operationCreateTableDiv col-md-12'>
          <GroupDetail
            isUpdate={this.props.isUpdate} createInfo={this.props.createInfo} groups={this.props.groups}
            sysMapData={this.props.sysMapData} curGroupData={this.props.curGroupData} parentCode={this.props.parentCode}

            init_roleTree={this.props.init_roleTree}
            set_parentCode={this.props.set_parentCode}
            set_sysMapDataValue={this.props.set_sysMapDataValue}
            get_createInfo={this.props.get_createInfo}
          />
        </div>
      </div>
    );
  }
});

$(window).resize(function () {
  if($('#createGroupForm') != null) {
    var height = $(window).height() - 110 - 30 + 'px';
    $('#createGroupForm').css("height",height);
  }
});

module.exports = createGroupFormView;
