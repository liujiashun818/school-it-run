require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MonitorTree2 = require('../monitorTree/monitorTree2.js');
var CreateResourceModal = require('./createResourceModal');
var CreateMonitorModal = require('./createMonitorModal');
var GroupInfoView_desView = require('./groupInfoView_desView');

var GroupInfoView = React.createClass({

    componentDidMount: function() {
        if(document.getElementById('equipmentManageGroupInfoView') != null) {
            document.getElementById('equipmentManageGroupInfoView').style.height = $(window).height() - 110 - 30 + 'px';
        }
    },

    render:function(){
        return(
            <div id='equipmentManageGroupInfoView' className='overviewDiv'>
                <CreateResourceModal />
                <CreateMonitorModal />
                <div className='leftListDiv col-md-2'>
                    <MonitorTree2 />
                </div>
                <GroupInfoView_desView />
          </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('equipmentManageGroupInfoView') != null) {
        document.getElementById('equipmentManageGroupInfoView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

module.exports = GroupInfoView;
