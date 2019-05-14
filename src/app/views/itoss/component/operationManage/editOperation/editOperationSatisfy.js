require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React);
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var operationSatisfy = React.createClass({
  mixins: [Navigation],
  // getStateFromFlux: function() {
  //   var flux = this.getFlux();
  //   return {
  //     itoss:flux.store("YFTOperationStore").getState()
  //   }
  // },
  componentDidMount:function(){
    var isCanSa = false;
    var permissions = this.props.permissions;
    for(var i=0;i<permissions.length;i++){
      var resourceType = permissions[i].resourceType;
      if(resourceType == "/operationmanage/workordermanage/workspacedetails/sa"){
        isCanSa = true;
        break;
      };
    } ;
    if(!isCanSa){
      $(".operationButtonGroup7").find(".buttonInfo").find("button").attr("disabled",true);
      $(".operationButtonGroup7").find(".buttonInfo").find("button").css('background-color',"#ddd");
    };
  },
  render:function(){
    var orderData = this.props.orderDetailData;
    var mark = false;
    if(orderData!=null && orderData!=""){
      var satisFaction = orderData.SATISFACTION;
      satisFaction = eval(satisFaction);
      // console.log(satisFaction);
      if(satisFaction.length>0){
        mark = true;
        $(".operationButtonGroup7").find(".buttonInfo").find("button").attr("disabled",true);
        $(".operationButtonGroup7").find(".buttonInfo").find("button").css('background-color',"#ddd");
        $("#satisfySuggest").val(satisFaction[0].suggestions);
        $("input[name='satisfyRadio']").each(function(){
          var value = $(this).val();
          if(value == satisFaction[0].servicesAging){
            $(this).attr("checked",true);
          };
        });
      };
    };
    return (
      <div className="operationSatisfyDiv">
        <div className="col-md-12">
          <table>
            <tbody>
              <tr>
                <td style={{"borderRight":"none","height":"30px"}}>服务要求建议</td>
                <td colSpan="5" style={{"borderLeft":"none"}}>&nbsp;</td>
              </tr>
              <tr>
                <td colSpan="6" style={{"paddingLeft":"0"}}><textarea rows="4" className="form-control" id="satisfySuggest" disabled={mark}></textarea></td>
              </tr>
              <tr>
                <td>满意度</td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="satisfyRadio" value="5" disabled={mark}/>很满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="satisfyRadio" value="4" disabled={mark}/>满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="satisfyRadio" value="3" disabled={mark}/>可接受
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="satisfyRadio" value="2" disabled={mark}/>不满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="satisfyRadio" value="1" disabled={mark}/>很不满意
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = operationSatisfy;
