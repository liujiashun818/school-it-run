require('bootstrap');
var React = require('react');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;


$(window).resize(function(){
  var height = $(window).height();
  height = height - 110 - 30;
  $(".panelBasic").css("height",height+"px");
});

var SoftwareLicence = React.createClass({
    mixins: [Navigation, FluxMixin, StoreWatchMixin("YFTRepositoryStore")],
    getInitialState: function() {
      return {
        faultId: "",
        faultSubId:""
      };
    },
    getStateFromFlux: function() {
      var flux = this.getFlux();
      return {
        repository:flux.store("YFTRepositoryStore").getState()
      }
    },
    componentWillMount:function(){
      // this.getFlux().actions.YFTOperationActions.get_faultType();
    },
    componentDidMount: function() {
        var height = $(window).height();
        height = height - 110 - 30;
        $(".panelBasic").css("height",height+"px");

        $("#repositoryTheme,#faultTypePrompt,#faultSubTypePrompt,#repositoryFaultXX,#repositoryFaultFX,#repositorySolveBZ,#repositoryAnalyzeZJ").mouseover(function(){
            $(this).find(".alert-block").hide();
        });
    },
    render:function(){
      return(
            <div id='hardwareManageCreateView' className='repositoryOverview'>
              <div id="createviewDesViewDiv" className="overviewDesViewDiv panelBasic">
                  <div className="titleDiv col-md-12">
                      <div className="titleLeft">
                          系统设置-软件许可
                      </div>
                      <div className="titleRight2">
                          <a ><i title ="" className="fa fa-question-circle fa-lg" style={{marginLeft: '8px'}}></i></a>
                          <a href="javascript:void(0)"><i title ="进入设置页" className="fa fa-cog fa-lg" style={{marginLeft: '8px'}}></i></a>
                      </div>
                  </div>
                  <div className="staticDiv col-md-12">
                      <div className="staticLeftDiv">
                          <div className='repositoryAddHead'>
                            <span>软件许可的主要功能:</span>
                          </div>
                      </div>
                  </div>

                  <div className="yunweiTable slaTableStyle">
                    <div>&nbsp;</div>

                    <table className="sla-table-basic">
                      <tbody>
                        <tr>
                          <td rowSpan="2" className="slaTableFontBold slaTableFontCenter" style={{"width":"10%"}}>知识信息</td>
                          <td className="slaTitleStyle" >&nbsp;&nbsp;主题<span className="slaPan"> *</span></td>
                          <td colSpan="3" id="repositoryTheme" className="slaTableFontBold table-basic-td-input">
                            <div className="alert-block">主题不能为空</div>
                            <input type="text" />
                          </td>
                        </tr>
                        <tr>
                          <td className="slaTitleStyle" style={{"width":"10%"}}>&nbsp;&nbsp;故障类型<span className="slaPan"> *</span></td>
                          <td colSpan="1" id="faultTypePrompt" className="slaTableFontBold table-basic-td-input" style={{"width":"20%"}}>
                            <div className="alert-block">故障类型不能为空</div>
                          </td>
                          <td className="slaTitleStyle" style={{"width":"10%"}}>&nbsp;&nbsp;故障子类型<span className="slaPan"> *</span></td>
                          <td id="faultSubTypePrompt" className="slaTableFontBold table-basic-td-input" style={{"width":"20%"}}>
                            <div className="alert-block">故障子类型不能为空</div>
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan="12" className="slaTableFontBold slaTableFontCenter">知识详情</td>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;故障现象<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryFaultXX">
                            <div className="alert-block">故障现象不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4"></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;故障分析<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryFaultFX">
                            <div className="alert-block">故障分析不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4"></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;解决步骤<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositorySolveBZ">
                            <div className="alert-block">解决步骤不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4"></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle">&nbsp;&nbsp;分析总结<span className="slaPan"> *</span></td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="slaTitleStyle table-basic-td-input" id="repositoryAnalyzeZJ">
                            <div className="alert-block">分析总结不能为空</div>
                            <textarea className="table-basic-h2 textarea-xlarge bottom-border" rows="4"></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>

            </div>
      );
    }
});

module.exports = SoftwareLicence;
