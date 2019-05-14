/**
 * Created by SHIN on 2015/12/28.
 */
require('bootstrap');
// var React = require('react');
import React, { PropTypes } from 'react'
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
// StoreWatchMixin = Fluxxor.StoreWatchMixin;
import { connect } from 'react-redux'

// var MonitorTree2 = require('../../monitorTree/monitorTree2.js');
var DependOnModal = require('./common/createResourceView_dependOnModal');

// import CreateResourceView_AgentUnix from './createResourceView_AgentUnix';
// import CreateResourceView_AgentWindows from './createResourceView_AgentWindows';
import CreateResourceView_Apache from './createResourceView_Apache';
import CreateResourceView_APC from './createResourceView_APC';
import CreateResourceView_APEM6100 from './createResourceView_APEM6100';
import CreateResourceView_CheckPoint from './createResourceView_CheckPoint';
import CreateResourceView_Database from './createResourceView_Database';
import CreateResourceView_DB2 from './createResourceView_DB2';
import CreateResourceView_DME3000 from './createResourceView_DME3000';
import CreateResourceView_DNS from './createResourceView_DNS';
// import CreateResourceView_Domino from './createResourceView_Domino';
import CreateResourceView_EMCStorage from './createResourceView_EMCStorage';
import CreateResourceView_Emerson from './createResourceView_Emerson';
// import CreateResourceView_Exchange from './createResourceView_Exchange';
import CreateResourceView_F5BigIp from './createResourceView_F5BigIp';
import CreateResourceView_FireWall from './createResourceView_FireWall';
import CreateResourceView_FTP from './createResourceView_FTP';
import CreateResourceView_IBMStorage from './createResourceView_IBMStorage';
// import CreateResourceView_IIS from './createResourceView_IIS';
import CreateResourceView_Informix from './createResourceView_Informix';
import CreateResourceView_IPMIServer from './createResourceView_IPMIServer';
// import CreateResourceView_JBOSS from './createResourceView_JBOSS';
import CreateResourceView_LiebertCorp from './createResourceView_LiebertCorp';
// import CreateResourceView_LotusNotes from './createResourceView_LotusNotes';
import CreateResourceView_Mail from './createResourceView_Mail';
import CreateResourceView_MongoDB from './createResourceView_MongoDB';
import CreateResourceView_Mysql from './createResourceView_Mysql';
import CreateResourceView_Netscreen from './createResourceView_Netscreen';
import CreateResourceView_Network from './createResourceView_Network';
import CreateResourceView_Nginx from './createResourceView_Nginx';
import CreateResourceView_Oracle from './createResourceView_Oracle';
import CreateResourceView_PIX from './createResourceView_PIX';
import CreateResourceView_Raritan from './createResourceView_Raritan';
// import CreateResourceView_Router from './createResourceView_Router';
import CreateResourceView_Santakups from './createResourceView_Santakups';
import CreateResourceView_SNMPUnix from './createResourceView_SNMPUnix';
import CreateResourceView_SNMPWindows from './createResourceView_SNMPWindows';
import CreateResourceView_SqlServer from './createResourceView_SqlServer';
import CreateResourceView_SyBase from './createResourceView_SyBase';
import CreateResourceView_Tomcat from './createResourceView_Tomcat';
import CreateResourceView_TOPSEC from './createResourceView_TOPSEC';
import CreateResourceView_Unix from './createResourceView_Unix';
import CreateResourceView_URL from './createResourceView_URL';
// import CreateResourceView_URLContent from './createResourceView_URLContent';
// import CreateResourceView_URLList from './createResourceView_URLList';
// import CreateResourceView_URLSequence from './createResourceView_URLSequence';
import CreateResourceView_VMware from './createResourceView_VMware';
import CreateResourceView_Weblogic from './createResourceView_Weblogic';
// import CreateResourceView_Websphere from './createResourceView_Websphere';
import CreateResourceView_Windows from './createResourceView_Windows';
import CreateResourceView_WirelessNetwork from './createResourceView_WirelessNetwork';

var CreateResourceView = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState(),
    //     }
    // },

    componentDidMount: function() {
        if(document.getElementById('createResourceView') != null) {
            document.getElementById('createResourceView').style.height = $(window).height() - 110 - 30 + 'px';
        }
    },

    getForm: function(selectedResource) {
        switch (selectedResource.relationEqName) {
            // case 'Equipment.AgentUnix':
            //     return <CreateResourceView_AgentUnix resource={selectedResource}/>;
            //     break;
            // case 'Equipment.AgentWindows':
            //     return <CreateResourceView_AgentWindows resource={selectedResource}/>;
            //     break;
            case 'Equipment.Apache':
                return <CreateResourceView_Apache resource={selectedResource}/>;
                break;
            case 'Equipment.APC':
                return <CreateResourceView_APC resource={selectedResource}/>;
                break;
            case 'Equipment.APEM6100':
                return <CreateResourceView_APEM6100 resource={selectedResource}/>;
                break;
            case 'Equipment.CheckPoint':
                return <CreateResourceView_CheckPoint resource={selectedResource}/>;
                break;
            case 'Equipment.Database':
                return <CreateResourceView_Database resource={selectedResource}/>;
                break;
            case 'Equipment.DB2':
                return <CreateResourceView_DB2 resource={selectedResource}/>;
                break;
            case 'Equipment.DME3000':
                return <CreateResourceView_DME3000 resource={selectedResource}/>;
                break;
            case 'Equipment.DNS':
                return <CreateResourceView_DNS resource={selectedResource}/>;
                break;
            // case 'Equipment.Domino':
            //     return <CreateResourceView_Domino resource={selectedResource}/>;
            //     break;
            case 'Equipment.EMCStorage':
                return <CreateResourceView_EMCStorage resource={selectedResource}/>;
                break;
            case 'Equipment.Emerson':
                return <CreateResourceView_Emerson resource={selectedResource}/>;
                break;
            // case 'Equipment.Exchange':
            //     return <CreateResourceView_Exchange resource={selectedResource}/>;
            //     break;
            case 'Equipment.F5BigIp':
                return <CreateResourceView_F5BigIp resource={selectedResource}/>;
                break;
            case 'Equipment.FireWall':
                return <CreateResourceView_FireWall resource={selectedResource}/>;
                break;
            case 'Equipment.FTP':
                return <CreateResourceView_FTP resource={selectedResource}/>;
                break;
            case 'Equipment.IBMStorage':
                return <CreateResourceView_IBMStorage resource={selectedResource}/>;
                break;
            // case 'Equipment.IIS':
            //     return <CreateResourceView_IIS resource={selectedResource}/>;
            //     break;
            case 'Equipment.Informix':
                return <CreateResourceView_Informix resource={selectedResource}/>;
                break;
            case 'Equipment.IPMIServer':
                return <CreateResourceView_IPMIServer resource={selectedResource}/>;
                break;
            // case 'Equipment.JBOSS':
            //     return <CreateResourceView_JBOSS resource={selectedResource}/>;
            //     break;
            case 'Equipment.LiebertCorp':
                return <CreateResourceView_LiebertCorp resource={selectedResource}/>;
                break;
            // case 'Equipment.LotusNotes':
            //     return <CreateResourceView_LotusNotes resource={selectedResource}/>;
            //     break;
            case 'Equipment.Mail':
                return <CreateResourceView_Mail resource={selectedResource}/>;
                break;
            case 'Equipment.MongoDB':
                return <CreateResourceView_MongoDB resource={selectedResource}/>;
                break;
            case 'Equipment.Mysql':
                return <CreateResourceView_Mysql resource={selectedResource}/>;
                break;
            case 'Equipment.Netscreen':
                return <CreateResourceView_Netscreen resource={selectedResource}/>;
                break;
            case 'Equipment.Network':
                return <CreateResourceView_Network resource={selectedResource}/>;
                break;
            case 'Equipment.Nginx':
                return <CreateResourceView_Nginx resource={selectedResource}/>;
                break;
            case 'Equipment.Oracle':
                return <CreateResourceView_Oracle resource={selectedResource}/>;
                break;
            case 'Equipment.PIX':
                return <CreateResourceView_PIX resource={selectedResource}/>;
                break;
            case 'Equipment.Raritan':
                return <CreateResourceView_Raritan resource={selectedResource}/>;
                break;
            // case 'Equipment.Router':
            //     return <CreateResourceView_Router resource={selectedResource}/>;
            //     break;
            case 'Equipment.Santakups':
                return <CreateResourceView_Santakups resource={selectedResource}/>;
                break;
            case 'Equipment.SNMPUnix':
                return <CreateResourceView_SNMPUnix resource={selectedResource}/>;
                break;
            case 'Equipment.SNMPWindows':
                return <CreateResourceView_SNMPWindows resource={selectedResource}/>;
                break;
            case 'Equipment.SqlServer':
                return <CreateResourceView_SqlServer resource={selectedResource}/>;
                break;
            case 'Equipment.SyBase':
                return <CreateResourceView_SyBase resource={selectedResource}/>;
                break;
            case 'Equipment.Tomcat':
                return <CreateResourceView_Tomcat resource={selectedResource}/>;
                break;
            case 'Equipment.TOPSEC':
                return <CreateResourceView_TOPSEC resource={selectedResource}/>;
                break;
            case 'Equipment.Unix':
                return <CreateResourceView_Unix resource={selectedResource}/>;
                break;
            case 'Equipment.URL':
                return <CreateResourceView_URL resource={selectedResource}/>;
                break;
            // case 'Equipment.URLContent':
            //     return <CreateResourceView_URLContent resource={selectedResource}/>;
            //     break;
            // case 'Equipment.URLList':
            //     return <CreateResourceView_URLList resource={selectedResource}/>;
            //     break;
            // case 'Equipment.URLSequence':
            //     return <CreateResourceView_URLSequence resource={selectedResource}/>;
            //     break;
            case 'Equipment.VMware':
                return <CreateResourceView_VMware resource={selectedResource}/>;
                break;
            case 'Equipment.Weblogic':
                return <CreateResourceView_Weblogic resource={selectedResource}/>;
                break;
            // case 'Equipment.Websphere':
            //     return <CreateResourceView_Websphere resource={selectedResource}/>;
            //     break;
            case 'Equipment.Windows':
                return <CreateResourceView_Windows resource={selectedResource}/>;
                break;
            case 'Equipment.WirelessNetwork':
                return <CreateResourceView_WirelessNetwork resource={selectedResource}/>;
                break;
            // default:
            //     return <CreateResourceView_Network resource={selectedResource}/>;
            //     break;
        }
    },

    render:function(){
        return(
            <div id='createResourceView' className='overviewDiv'>
                <DependOnModal />
                {this.getForm(this.props.selectedResource)}
            </div>
        );
    }
});

$(window).resize(function () {
    if(document.getElementById('createResourceView') != null) {
        document.getElementById('createResourceView').style.height = $(window).height() - 110 - 30 + 'px';
    }
});

// module.exports = CreateResourceView;
CreateResourceView.propTypes = {
  selectedResource: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedResource } = state.equipmentReducer

  return {
    selectedResource
  }
}

export default connect(mapStateToProps)(CreateResourceView)
