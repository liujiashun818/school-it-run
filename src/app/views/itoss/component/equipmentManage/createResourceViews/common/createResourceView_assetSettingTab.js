/**
 * Created by SHIN on 2015/12/28.
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('bootstrap');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');

var productTypeData = [
    {id:'0', name:'传输设备'},
    {id:'1', name:'监控主机'},
    {id:'2', name:'other'}
];

var projectNameData = [
    {id:'0', name:'光纤网维护项目'},
    {id:'1', name:'运维管理'}
];

var assetStatusData = [
    {id:'0', name:'库存'},
    {id:'1', name:'在用'},
    {id:'2', name:'在线'},
    {id:'3', name:'维修'},
    {id:'4', name:'未知'},
    {id:'5', name:'停用'},
    {id:'6', name:'调拨'},
    {id:'7', name:'报废'}
];

var ywUnitData = [
    {id:'0', name:'**软件公司'},
    {id:'1', name:'Administrators'},
    {id:'2', name:'电信'}
];

var AssetSettingTab = React.createClass({
    // mixins: [History, FluxMixin, StoreWatchMixin("SampleStore")],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         //itoss:flux.store("SampleStore").getState()
    //     }
    // },
    render: function() {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        return (
            <div className="createGroupDetailDiv" style={{borderTop:"none",marginTop:"0"}}>
              <table>
                <tbody>
                  <tr>
                    <th rowSpan="7" style={{width:"10%"}}>设备属性</th>
                    <td className="paddingleft10" style={{width:"15%"}}>资产编码</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text" defaultValue="CY-XX-XX-XX-01"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>设备名称</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>IP地址</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>采购日期<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DateTimePicker className='dateTimePickerStyle full-width col-md-12' format={"yyyy-MM-dd HH:mm:ss"} defaultValue={date}/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>设备供应商电话</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>设备原厂商</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>产品类型</td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={productTypeData} defaultValue={productTypeData[0]} textField='name'/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>产品型号</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>序列号</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>模块数</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="number" defaultValue="0"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>品牌名称</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>规格</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                  </tr>
                  <tr>
                      <td className="paddingleft10" style={{width:"15%"}}>备注</td>
                      <td colSpan="5" style={{width:"75%"}}><textarea className="form-control" style={{height:"60px"}}/></td>
                  </tr>

                  <tr>
                    <th rowSpan="6" style={{width:"10%"}}>管理属性</th>
                    <td className="paddingleft10" style={{width:"15%"}}>项目名称</td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={projectNameData} defaultValue={projectNameData[0]} textField='name'/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>资产状态</td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={assetStatusData} defaultValue={assetStatusData[0]} textField='name'/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>运维单位<span style={{color: "red"}}>*</span></td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DropdownList data={ywUnitData} defaultValue={ywUnitData[0]} textField='name'/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>运维负责人</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>业主负责人</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>部门</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>物理位置</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>维保期</td>
                    <td colSpan="2" style={{width:"30%"}}><ReactWidgets.DateTimePicker className='dateTimePickerStyle full-width col-md-12' format={"yyyy-MM-dd HH:mm:ss"} defaultValue={date}/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>资产归属</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                    <td className="paddingleft10" style={{width:"15%"}}>资产用途</td>
                    <td colSpan="2" style={{width:"30%"}}><input type="text"/></td>
                  </tr>
                  <tr>
                    <td className="paddingleft10" style={{width:"15%"}}>合同单号</td>
                    <td colSpan="5" style={{width:"30%"}}><input type="text"/></td>
                  </tr>
                </tbody>
              </table>
            </div>
        );
    }
});

module.exports = AssetSettingTab;
