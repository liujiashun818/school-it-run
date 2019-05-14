require('bootstrap');
var React = require('react');
var ReactWidgets = require('react-widgets');
var ReactRouter = require('react-router');
var Navigation = require('react-router').Navigation;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var operationSatisfy = React.createClass({
  render:function(){
    return (
      <div className="operationSatisfyDiv">
        <div className="col-md-12">
          <table>
            <tbody>
              <tr>
                <td>联系人</td>
                <td colSpan="2"><input type="text" className="form-control"/></td>
                <td>确认时间</td>
                <td colSpan="2"><input type="text" className="form-control"/></td>
              </tr>
              <tr>
                <td style={{"borderRight":"none","height":"30px"}}>服务要求建议</td>
                <td colSpan="5" style={{"borderLeft":"none"}}>&nbsp;</td>
              </tr>
              <tr>
                <td colSpan="6"><textarea rows="4" className="form-control"></textarea></td>
              </tr>
              <tr>
                <td style={{"borderRight":"none","height":"30px"}}>服务评价</td>
                <td colSpan="5" style={{"borderLeft":"none"}}>&nbsp;</td>
              </tr>
              <tr>
                <td>服务时效</td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="serviceTime" value="1"/>很满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="serviceTime" value="2"/>满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="serviceTime" value="3"/>可接受
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="serviceTime" value="4"/>不满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="serviceTime" value="5"/>很不满意
                  </label>
                </td>
              </tr>
              <tr>
                <td>技术水平</td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="skillLevel" value="1"/>很满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="skillLevel" value="2"/>满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="skillLevel" value="3"/>可接受
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="skillLevel" value="4"/>不满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="skillLevel" value="5"/>很不满意
                  </label>
                </td>
              </tr>
              <tr>
                <td>故障说明</td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="faultExplain" value="1"/>很满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="faultExplain" value="2"/>满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="faultExplain" value="3"/>可接受
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="faultExplain" value="4"/>不满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="faultExplain" value="5"/>很不满意
                  </label>
                </td>
              </tr>
              <tr>
                <td>服务态度</td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="serviceAttitude" value="1"/>很满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="serviceAttitude" value="2"/>满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="serviceAttitude" value="3"/>可接受
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="serviceAttitude" value="4"/>不满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="serviceAttitude" value="5"/>很不满意
                  </label>
                </td>
              </tr>
              <tr>
                <td>产品质量</td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="productQuility" value="1"/>很满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="productQuility" value="2"/>满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="productQuility" value="3"/>可接受
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="productQuility" value="4"/>不满意
                  </label>
                </td>
                <td>
                  <label className="maginTop">
                    <input type="radio" name="productQuility" value="5"/>很不满意
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
