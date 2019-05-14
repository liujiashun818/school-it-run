/**
* Created by Yuchen  2016/01/08.
*/

require('bootstrap');
var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
// var Fluxxor = require('fluxxor');
// var FluxMixin = Fluxxor.FluxMixin(React),
//     StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReactWidgets = require('react-widgets');
//
var Globalize = require('globalize')
var globalizeLocalizer = require('react-widgets/lib/localizers/globalize')

globalizeLocalizer(Globalize);

var AreaValueInput = React.createClass({
    render() {
        return (
            <span>
                <span>{this.props.item.name}</span>
            </span>
        );
    }
});
var AssetTypeInput = React.createClass({
    render() {
        return (
            <span>
                <span>{this.props.item.name}</span>
            </span>
        );
    }
});
var AssetStatusInput = React.createClass({
    render() {
        return (
            <span>
                <span>{this.props.item.name}</span>
            </span>
        );
    }
});

var Detail_desView_assetTabs = React.createClass({
    mixins: [History],
    // getStateFromFlux: function() {
    //     var flux = this.getFlux();
    //     return {
    //         itoss:flux.store("AssetManageStore").getState()
    //     }
    // },
    componentDidMount: function(){

    },
    render: function() {
        var _this = this;
        var changeDate = (name, value) => {
            var d = new Date(value);
            if(name=="createTime"){
                if(value==null) _this.props.setState({createTime: null})
                else _this.props.setState({createTime: d})
            }
            else if(name=="warrantyEndTime"){
                if(value==null) _this.props.setState({warrantyEndTime: null})
                else _this.props.setState({warrantyEndTime: d})
            }
        }
        var changeDropdown = (name, value) => {
            if(name=="assetType"){
                _this.props.setState({assetType: value.id})
            }
            else if(name=="status"){
                _this.props.setState({status: value.id})
            }
            else if(name=="areaId"){
                _this.props.setState({areaId: value.id})
            }
        }
        return (
            <div className='table-basic width8 no-left-margin'>
                <div className="table-basic-row width8">
                    <div className="table-basic-h3 block width1 no-bottom-border">资产属性</div>
                    <div className="table-basic-h3 block-content width7 no-bottom-border">
                        <div className="table-basic-h2 width3">
                            <div className="table-basic-h1 width4">资产编码 <red>*</red></div>
                            <div className="table-basic-h1-input width4" id="assetTabs-assetCode">
                                <div className="alert-block">资产编码不能为空</div>
                                <input tabIndex="1" type="text" placeholder="" className="input-xlarge width8" />
                            </div>
                            <div className="table-basic-h1 width4">资产类型</div>
                            <div className="table-basic-h1-input width4" id="assetTabs-assetType">
                                <ReactWidgets.DropdownList tabIndex="4" className='form-control dropdownStyle width8' data={this.props.assetTypeList}
                                    value={this.props.assetType} textField='name' valueField='id' valueComponent={AssetTypeInput} onChange={changeDropdown.bind(null,"assetType")} />
                            </div>
                        </div>
                        <div className="table-basic-h2 width3">
                            <div className="table-basic-h1 width4">资产名称 <red>*</red></div>
                            <div className="table-basic-h1-input width4" id="assetTabs-assetName">
                                <div className="alert-block">资产名称不能为空</div>
                                <input tabIndex="2" type="text" placeholder="" className="input-xlarge width8" />
                            </div>
                            <div className="table-basic-h1 width4">资产型号</div>
                            <div className="table-basic-h1-input width4" id="assetTabs-productModel"><input tabIndex="5" type="text" placeholder="" className="input-xlarge width8" /></div>
                        </div>
                        <div className="table-basic-h2 width3">
                            <div className="table-basic-h1 width4">区域</div>
                            <div className="table-basic-h1-input width4 no-right-border" id="assetTabs-area">
                                <ReactWidgets.DropdownList tabIndex="3" className='form-control dropdownStyle width8' data={this.props.areaIdList}
                                    value={this.props.areaId} textField='name' valueField='id' valueComponent={AreaValueInput} onChange={changeDropdown.bind(null,"areaId")} />
                            </div>
                            <div className="table-basic-h1 width4">品牌</div>
                            <div className="table-basic-h1-input width4 no-right-border" id="assetTabs-productBrand"><input tabIndex="6" type="text" placeholder="" className="input-xlarge width8" /></div>
                        </div>
                        <div className="table-basic-h1 width1d6 no-bottom-border">朝向</div>
                        <div className="table-basic-h1-input width1d6 no-bottom-border" id="assetTabs-orientation"><input tabIndex="7" type="text" placeholder="" className="input-xlarge width8" /></div>
                        <div className="table-basic-h1 width1d6 no-bottom-border">安装地址</div>
                        <div className="table-basic-h1-input width4 no-bottom-border no-right-border" id="assetTabs-installAddress"><input tabIndex="8" type="text" placeholder="" className="input-xlarge width8" /></div>
                    </div>
                </div>
                <div className="table-basic-row width8">
                    <div className="table-basic-h3 block width1">维保属性</div>
                    <div className="table-basic-h3 block-content width7 no-bottom-border">
                        <div className="table-basic-h2 width3">
                            <div className="table-basic-h1 width4">创建人 <red>*</red></div>
                            <div className="table-basic-h1-input width4" id="assetTabs-creator">
                                <div className="alert-block">创建人不能为空</div>
                                <input type="text" disabled="disabled" placeholder="" className="input-xlarge width8" />
                            </div>
                            <div className="table-basic-h1 width4">维保截止时间 <red>*</red></div>
                            <div className="table-basic-h1-input width4" id="assetTabs-warrantyEndTime">
                                <div className="alert-block">维保截止时间不能为空</div>
                                <ReactWidgets.DateTimePicker tabIndex="11" className='dateTimePickerStyle full-width width8' format={"yyyy-MM-dd"} time={false}
                                    value={this.props.warrantyEndTime} onChange={changeDate.bind(null,"warrantyEndTime")} />
                            </div>
                        </div>
                        <div className="table-basic-h2 width3">
                            <div className="table-basic-h1 width4">创建时间</div>
                            <div className="table-basic-h1-input width4" id="assetTabs-createTime">
                                <ReactWidgets.DateTimePicker tabIndex="9" className='dateTimePickerStyle full-width width8' format={"yyyy-MM-dd"} time={false}
                                    value={this.props.createTime} onChange={changeDate.bind(null,"createTime")} />
                            </div>
                            <div className="table-basic-h1 width4">IP地址</div>
                            <div className="table-basic-h1-input width4" id="assetTabs-ipAddress">
                                <div className="alert-block">IP地址无效</div>
                                <input tabIndex="12" type="text" placeholder="" className="input-xlarge width8" />
                            </div>
                        </div>
                        <div className="table-basic-h2 width3">
                            <div className="table-basic-h1 width4">维护人 <red>*</red></div>
                            <div className="table-basic-h1-input width4 no-right-border" id="assetTabs-maintainer">
                                <div className="alert-block">维护人不能为空</div>
                                <input tabIndex="10" type="text" placeholder="" className="input-xlarge width8" />
                            </div>
                            <div className="table-basic-h1 width4">维护人单位</div>
                            <div className="table-basic-h1-input width4 no-right-border" id="assetTabs-maintainerUnit"><input tabIndex="13" type="text" placeholder="" className="input-xlarge width8" /></div>
                        </div>
                        <div className="table-basic-h1 width1d6">资产状态 <red>*</red></div>
                        <div className="table-basic-h1-input width1d6" id="assetTabs-assetState">
                            <div className="alert-block">资产状态不能为空</div>
                            <ReactWidgets.DropdownList tabIndex="14" className='form-control dropdownStyle width8' data={this.props.StatusList}
                                value={this.props.status} textField='name' valueField='id' valueComponent={AssetStatusInput} onChange={changeDropdown.bind(null,"status")} />
                        </div>
                        <div className="table-basic-h1 width1d6">国标编码</div>
                        <div className="table-basic-h1-input width4 no-right-border" id="assetTabs-internationalCode"><input tabIndex="15" type="text" placeholder="" className="input-xlarge width8" /></div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Detail_desView_assetTabs;
