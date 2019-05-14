/**
  资产管理相关的 action 方法
*/
var oData = require('../server/odata-asset');
import * as requestDataActions from './requestData_action'

export const IPADDRESS_FILTER_ASSET = 'IPADDRESS_FILTER_ASSET'
export const MOBILE_FILTER_ASSET = 'MOBILE_FILTER_ASSET'
export const CREATE_MONITOR_ASSET_SUCCESS = "CREATE_MONITOR_ASSET_SUCCESS"
export const CREATE_MONITOR_ASSET_FAILURDLIST= "CREATE_MONITOR_ASSET_FAILURDLIST"
export const GET_STATISTIC_DATA_TYPELIST= "GET_STATISTIC_DATA_TYPELIST"
export const GET_STATISTIC_DATA_OVERTYPELIST= "GET_STATISTIC_DATA_OVERTYPELIST"
export const GET_STATISTIC_DATA_MAINTAINTOP= "GET_STATISTIC_DATA_MAINTAINTOP"
export const GET_CREATE_DATA_AREAIDLIST= "GET_CREATE_DATA_AREAIDLIST"
export const GET_CREATE_DATA_STATUSLIST= "GET_CREATE_DATA_STATUSLIST"
export const GET_DEVLIST_DATA= "GET_DEVLIST_DATA"
export const GET_MAINTAIN_ORDER_MAINTAINORDERLIST= "GET_MAINTAIN_ORDER_MAINTAINORDERLIST"
export const GET_MAINTAIN_ORDER_MAINTAINORDERCOUNT= "GET_MAINTAIN_ORDER_MAINTAINORDERCOUNT"
export const GET_MAINTAIN_ORDER_FILTERAREALIST= "GET_MAINTAIN_ORDER_FILTERAREALIST"
export const GET_ASSET_DATA_FILTERTYPLIST= "GET_ASSET_DATA_FILTERTYPLIST"
export const GET_ASSET_DATA_ASSETLIST_ASSET = 'GET_ASSET_DATA_ASSETLIST_ASSET'
export const GET_ASSET_DATA_ASSETCOUNT= "GET_ASSET_DATA_ASSETCOUNT"
export const GET_ASSET_DATA_EXPORTASSETLIST= "GET_ASSET_DATA_EXPORTASSETLIST"
export const GET_MONITOR_DATA= "GET_MONITOR_DATA"
export const GET_DETAIL_DATA_SINGLEASSET= 'GET_DETAIL_DATA_SINGLEASSET'
export const GET_DETAIL_DATA_ASSETDETAILID= 'GET_DETAIL_DATA_ASSETDETAILID'
export const GET_MAINTAIN_DETAIL_DATA_ID = 'GET_MAINTAIN_DETAIL_DATA_ID'
export const GET_MAINTAIN_DETAIL_DATA_ORDER = 'GET_MAINTAIN_DETAIL_DATA_ORDER'
export const SET_DEFAULT_FILTER_VALUE_ASSETLIST= "SET_DEFAULT_FILTER_VALUE_ASSETLIST"
export const SET_DEFAULT_FILTER_VALUE_ASSETMAINTAIN_TYPEID= "SET_DEFAULT_FILTER_VALUE_ASSETMAINTAIN_TYPEID"
export const SET_DEFAULT_FILTER_VALUE_ASSETMAINTAIN_FILTERWS = 'SET_DEFAULT_FILTER_VALUE_ASSETMAINTAIN_FILTERWS'
export const SET_PERMISSIONS_ASSET= "SET_PERMISSIONS_ASSET"

export function set_IPAddressFilter(value){
    return {
        type:IPADDRESS_FILTER_ASSET,
        value
    }
}
export function set_MobileFilter(value){
    return {
        type: MOBILE_FILTER_ASSET,
        value
    }
}
export function set_create_monitor_asset_success(param){
    return {
        type: CREATE_MONITOR_ASSET_SUCCESS,
        param
    }
}
export function set_create_monitor_asset_failureList(param){
    return {
        type: CREATE_MONITOR_ASSET_FAILURDLIST,
        param
    }
}
export function set_assetTypeList(assetTypeList){
    return {
        type: GET_STATISTIC_DATA_TYPELIST,
        assetTypeList
    }
}
export function set_overtimeAssetTypeList(overtimeAssetTypeList){
    return {
        type: GET_STATISTIC_DATA_OVERTYPELIST,
        overtimeAssetTypeList
    }
}
export function set_maintainTopTen(maintainTopTen){
    return {
        type: GET_STATISTIC_DATA_MAINTAINTOP,
        maintainTopTen
    }
}
export function set_CreateData_areaIdList(areaIdList){
    return {
        type: GET_CREATE_DATA_AREAIDLIST,
        areaIdList
    }
}
export function set_CreateData_statusList(statusList){
    return {
        type: GET_CREATE_DATA_STATUSLIST,
        statusList
    }
}
export function set_get_devList_data(devList){
    return {
        type: GET_DEVLIST_DATA,
        devList
    }
}
export function set_maintain_order_maintainOrderList(maintainOrderList){
    return {
        type: GET_MAINTAIN_ORDER_MAINTAINORDERLIST,
        maintainOrderList
    }
}
export function set_maintain_order_maintainOrderCount(maintainOrderCount){
    return {
        type: GET_MAINTAIN_ORDER_MAINTAINORDERCOUNT,
        maintainOrderCount
    }
}
export function set_maintain_order_filterAreaList(filter_areaList){
    return {
        type: GET_MAINTAIN_ORDER_FILTERAREALIST,
        filter_areaList
    }
}
export function set_AssetData_filterTypeList(filter_typeList){
    return {
        type: GET_ASSET_DATA_FILTERTYPLIST,
        filter_typeList
    }
}
export function set_AssetData_ExportAssetList(exportAssetList){
    return {
        type: GET_ASSET_DATA_EXPORTASSETLIST,
        exportAssetList
    }
}
export function set_AssetDataList(assetLista){
    return {
        type: GET_ASSET_DATA_ASSETLIST_ASSET,
        assetLista
    }
}
export function set_AssetDataCount(assetCount){
    return {
        type: GET_ASSET_DATA_ASSETCOUNT,
        assetCount
    }
}
export function set_MonitorData(devCount){
    return {
        type: GET_MONITOR_DATA,
        devCount
    }
}
export function set_detailData_SingleAsset(singleAsset){
    return {
        type: GET_DETAIL_DATA_SINGLEASSET,
        singleAsset
    }
}
export function set_detailData_AssetDetailID(assetDetailID){
    return {
        type: GET_DETAIL_DATA_ASSETDETAILID,
        assetDetailID
    }
}
export function set_maintainDetailData_ID(maintainDetailID){
    return {
        type: GET_MAINTAIN_DETAIL_DATA_ID,
        maintainDetailID
    }
}
export function set_maintainDetailData_order(singleMaintainOrder){
    return {
        type: GET_MAINTAIN_DETAIL_DATA_ORDER,
        singleMaintainOrder
    }
}
//设置资产统计列表页的过滤器默认值
//资产统计列表-默认【设备类型】过滤器列表index
export function set_defaultFilter_valueAssetList(defaultTypeID_assetList){
    return {
        type: SET_DEFAULT_FILTER_VALUE_ASSETLIST,
        defaultTypeID_assetList
    }
}
//设置资产维保页的过滤器默认值
//资产维保-默认【设备类型】过滤器列表index
export function set_defaultFilter_valueAssetMaintain_TypeID(defaultTypeID_assetMaintain){
    return {
        type: SET_DEFAULT_FILTER_VALUE_ASSETMAINTAIN_TYPEID,
        defaultTypeID_assetMaintain
    }
}
//资产维保-是否默认过滤过保资产
export function set_defaultFilter_valueAssetMaintain_filterWS(filter_ws){
    return {
        type: SET_DEFAULT_FILTER_VALUE_ASSETMAINTAIN_FILTERWS,
        filter_ws
    }
}
//用户操作权限
export function set_permissions_asset(param){
    return {
        type: SET_PERMISSIONS_ASSET,
        param
    }
}

//新建资产
export function create_asset(param){
  //this.dispatch(Constants.CREATE_ASSET,param);
  return dispatch =>{
    if(!param || !param.data) return;
    dispatch(requestDataActions.setRequest());
    oData.createAsset(
        param.data,
        function(resp){
            if(param.callback) param.callback();
            dispatch(requestDataActions.setRequestSuccess());
        },
        function(resp){
            if(param.error) param.error();
            dispatch(requestDataActions.setRequestFail());
        }
    );
  }
}

export function create_asset_maintainOrder(param){
  return dispatch=>{
      dispatch(requestDataActions.setRequest());
    oData.getMaintainOrderData({data: {fileNumber: param.data.FileNumber},callback: response=>{
				var list = [], valid = true;
				if(response.maintainOrder.d.results[0]) list = eval(response.maintainOrder.d.results[0].MAINTENANCE_INFO);
				for(var i in list){
					if(list[i].fileNumber===param.data.FileNumber){
						valid = false;
						break;
					}
				}
				if(valid){
					oData.createAssetMaintainOrder(param.data, param.callback, param.error);
                    dispatch(requestDataActions.setRequestSuccess());
				}
				else{
					if(param.error) param.error({invalidFileNumber:true});
                    dispatch(requestDataActions.setRequestFail());
				}
			}
		});
  }
}

//绑定选中的监控设备
export function create_monitor_asset(param){
  return dispatch=>{
    if(!param||param==null||!param.data||!param.data) return;
    dispatch(requestDataActions.setRequest());
    var newData = [];
    for(var i =0;i<10;i++){
      newData = newData.concat(param.data);//concat函数可以连接两个或者多个数组，参数可以是数组对象也可以是具体元素。
    }
    param.data = newData;
    oData.createMonitorAsset(param.data, response => {
        dispatch(set_create_monitor_asset_success(response.SUCCESS_TOTAL));
        dispatch(set_create_monitor_asset_failureList(response.FAILURE_EQUIPMENT_LIST));
        var resp = {
          success: response.SUCCESS_TOTAL,
          failureList: response.FAILURE_EQUIPMENT_LIST
        }
        if(param.callback) param.callback(resp);
        dispatch(requestDataActions.setRequestSuccess());
      },
      response => {
        dispatch(set_create_monitor_asset_success(0));
        dispatch(set_create_monitor_asset_failureList([]));
        if(param.error) param.error(response);
        dispatch(requestDataActions.setRequestFail());
      }
    );
  }
}
//绑定全部监控设备
export function create_all_monitor_asset(param){
  return dispatch=>{
        if(!param||param==null) return;
        dispatch(requestDataActions.setRequest());
		oData.createAllMonitorAsset(response => {
                dispatch(set_create_monitor_asset_success(response.SUCCESS_TOTAL));
                dispatch(set_create_monitor_asset_failureList(response.FAILURE_EQUIPMENT_LIST));
				var resp = {
					success: response.SUCCESS_TOTAL,
					failureList: response.FAILURE_EQUIPMENT_LIST
				}
				if(param.callback) param.callback(resp);
                dispatch(requestDataActions.setRequestSuccess());
			},
			response => {
                dispatch(set_create_monitor_asset_success(0));
                dispatch(set_create_monitor_asset_failureList([]));
				if(param.error) param.error(response);
                dispatch(requestDataActions.setRequestFail());
			}
		);
  }
}
//获取资产统计页全部数据
export function get_statistic_data(param){
    return (dispatch) => {
        dispatch(requestDataActions.setRequest());
        oData.getStatisticData(response => {
            dispatch(set_assetTypeList([]));
            dispatch(set_overtimeAssetTypeList([]));
            dispatch(set_maintainTopTen([]));
            if(response){
                dispatch(set_assetTypeList(response.assetTypeList.d.results));
                dispatch(set_overtimeAssetTypeList(response.overtimeAssetTypeList.d.results));
                dispatch(set_maintainTopTen(response.maintainTop10.d.results));
            }
            param.callback({
                overtimeAssetTypeList: response.overtimeAssetTypeList.d.results,
                maintainTop10: response.maintainTop10.d.results
            });
            dispatch(requestDataActions.setRequestSuccess());
        });
    }
}

export function get_create_data(param){
  return dispatch =>{
        dispatch(set_assetTypeList([]));
        dispatch(set_CreateData_areaIdList([]));
        dispatch(set_CreateData_statusList([]));
        dispatch(requestDataActions.setRequest());
		oData.getCreateData(response => {
			var assetTypeList = response.assetsTypeList;
			var areaList = response.areaList;
			var statusList = response.statusList;
			var devList = response.devList;
			var resp = {};
			var o;
            var assetTypeListtemp =[];
            var areaIdListtemp =[];
            var statusListtemp =[];
			//设置资产类型列表
			for(var a in assetTypeList.results){
				o = {};
				o.id = assetTypeList.results[a].RecId;
				o.name = assetTypeList.results[a].TypeName;
                assetTypeListtemp.push(o);
			}
			//设置资产状态列表
			for(var a in statusList.results){
				o = {};
				o.id = statusList.results[a].RecId;
				o.name = statusList.results[a].StatusName;
                statusListtemp.push(o);
			}
			//设置区域列表
			for(var a in areaList.d.results){
				o = {};
				o.id = areaList.d.results[a].RecId;
				o.name = areaList.d.results[a].Name;
                areaIdListtemp.push(o);
			}
            dispatch(set_assetTypeList(assetTypeListtemp));
            dispatch(set_CreateData_areaIdList(areaIdListtemp));
            dispatch(set_CreateData_statusList(statusListtemp));
            resp.assetTypeList = assetTypeListtemp;
			resp.statusList = statusListtemp;
			resp.areaIdList = areaIdListtemp;
			if(param && param.callback) param.callback(resp);
            dispatch(requestDataActions.setRequestSuccess());
			if(param && param.noChange) return;
		});
  }
}

export function get_devList_data(param){
  return dispatch =>{
      dispatch(requestDataActions.setRequest());
    oData.getDevListData(response => {
			var devList = response.devList;
			var resp = {};
			//设置未绑定的监控设备列表
            dispatch(set_get_devList_data(eval(devList.d.results[0].MONITOR_TREE)));
			resp.devList = eval(devList.d.results[0].MONITOR_TREE);
			if(param && param.callback) param.callback(resp);
            dispatch(requestDataActions.setRequestSuccess());
		});
  }
}

export function get_maintain_order(param){
  return dispatch =>{
        if(!param) return;
        dispatch(requestDataActions.setRequest());
		var data = param.data || {};
		oData.getMaintainOrderData({data: data,callback: response => {
				var obj = response.maintainOrder.d.results[0];
				if(obj){//通过过滤条件查询维修单列表
                    dispatch(set_maintain_order_maintainOrderList(eval(obj.MAINTENANCE_INFO)));
                    dispatch(set_maintain_order_maintainOrderCount(parseInt(obj.COUNT,10)));
                    dispatch(set_maintain_order_filterAreaList(response.areaList.d.results));
					if(param && param.callback) param.callback({
						maintainOrderList: eval(obj.MAINTENANCE_INFO),
						maintainOrderCount: parseInt(obj.COUNT,10),
						filter_areaList: response.areaList.d.results
					});
                    dispatch(requestDataActions.setRequestSuccess());
				}
                else{
                    dispatch(requestDataActions.setRequestFail());
                }
			}
		});
  }
}
//获取全部资产数据(需要测试 var state = getState();;
export function get_asset_data(param){
  return (dispatch, getState) => {
        if(!param) return;
        var state = getState();
		var data = param.data || {};
        dispatch(requestDataActions.setRequest());
		oData.getAssetData({data: data,callback: (response => {
				if(response){
					if(param.export_data){//设置导出资产列表
						// this.exportAssetList = eval(response.result.d.results[0].ASSETS_INFO);
                        dispatch(set_AssetData_ExportAssetList(eval(response.result.d.results[0].ASSETS_INFO)));
						/*for(var i in this.exportAssetList){
							assetsCode = this.exportAssetList[i].assetsCode;
							assetsCode = "'"+assetsCode;
							this.exportAssetList[i].assetsCode = assetsCode;
						}*/
					}
					else{
						// this.assetList = eval(response.result.d.results[0].ASSETS_INFO);
						// this.assetCount = response.result.d.results[0].COUNT;
						// this.filter_typeList = response.typeList.results;
						//this.filter_areaList = response.areaList.d.results;
                        dispatch(set_AssetDataList(eval(response.result.d.results[0].ASSETS_INFO)));
                        dispatch(set_AssetDataCount(response.result.d.results[0].COUNT));
                        dispatch(set_AssetData_filterTypeList(response.typeList.results));
                        dispatch(set_maintain_order_filterAreaList(response.areaList.d.results));
					}
				}
                state = getState();
				if(param && param.callback) param.callback({
					assetList: state.assetManageReducer.AssetList,
					exportAssetList: state.assetManageReducer.ExportAssetList,
					assetCount: state.assetManageReducer.AssetCount,
					filter_typeList: state.assetManageReducer.Filter_TypeList,
					filter_areaList: state.assetManageReducer.Filter_AreaList
				});
                dispatch(requestDataActions.setRequestSuccess());
			}),
		});
  }
}

export function get_monitor_data(param){
  return (dispatch, getState) =>{
        if(!param) return;
        dispatch(requestDataActions.setRequest());
        var state = getState();
		var data = param.data || {};
		oData.getMonitorData({data: data,callback: response => {
                dispatch(set_get_devList_data(eval(response.result.d.results[0].UNBIND_EQUIPMENTS)));
                dispatch(set_MonitorData(parseInt(response.result.d.results[0].COUNT,10)));
                state = getState();
				if(param.callback) param.callback({
					devList: state.assetManageReducer.DevList,
					devCount: state.assetManageReducer.DevCount
				});
                dispatch(requestDataActions.setRequestSuccess());
			}
		});
  }
}
//获取单项资产数据
export function get_detail_data(param){
  return (dispatch, getState) =>{
        var state = getState();
        if(!param.data) param.data = {recid:state.AssetDetailID};
        dispatch(requestDataActions.setRequest());
        oData.getDetailData(param.data,resp => {
          dispatch(set_detailData_SingleAsset(resp.asset.d.results[0]));
          dispatch(set_maintain_order_maintainOrderList([]));
          if(resp.maintainOrder.d.results[0]){
            dispatch(set_maintain_order_maintainOrderList(eval(resp.maintainOrder.d.results[0].MAINTENANCE_INFO)));
          }
          if(resp.asset.d.results[0] && resp.asset.d.results[0].RecId){
            dispatch(set_detailData_AssetDetailID(resp.asset.d.results[0].RecId));
          }
          state = getState();
          resp.areaIdList = state.assetManageReducer.AreaIdList;
          resp.statusList = state.assetManageReducer.StatusList;
          resp.assetTypeList = state.assetManageReducer.AssetTypeList;
          if(param.callback) param.callback(resp);
          dispatch(requestDataActions.setRequestSuccess());
        },
			resp => {
                if(param.error) param.error(resp)
                dispatch(requestDataActions.setRequestFail());
            }
		);
  }
}
//获取单项维修单数据
export function get_maintain_detail_data(param){
  return (dispatch, getState) =>{
        var state = getState();
        if(!param) param = {data:{recid:state.assetManageReducer.MaintainDetailID}};
		if(!param.data) param.data = {recid:state.assetManageReducer.MaintainDetailID};
        dispatch(requestDataActions.setRequest());
		oData.getMaintainDetailData(param.data,resp => {
                var singleAsset = eval(resp.asset.d.results[0].ASSETS_INFO)[0];
                dispatch(set_maintainDetailData_order(resp.maintainOrder));
                if(singleAsset) dispatch(set_detailData_SingleAsset(singleAsset));
                state = getState();
				if(state.assetManageReducer.SingleMaintainOrder && state.assetManageReducer.SingleMaintainOrder.RecId) {
                    dispatch(set_maintainDetailData_ID(state.assetManageReducer.SingleMaintainOrder.RecId));
                }
				if(state.assetManageReducer.SingleAsset && state.assetManageReducer.SingleAsset.recId) {
                    dispatch(set_detailData_AssetDetailID(state.assetManageReducer.SingleAsset.recId));
                }
				param.callback({
					maintainOrder: state.assetManageReducer.SingleMaintainOrder,
					asset: state.assetManageReducer.SingleAsset,
				});
                dispatch(requestDataActions.setRequestSuccess());
			},
			resp => {
                if(param.error) param.error(resp)
                dispatch(requestDataActions.setRequestFail());
            }
		);
    }
}

export function update_single_asset(param){
  return dispatch =>{
    if(!param||!param.data) return;
    dispatch(requestDataActions.setRequest());
    oData.updateAsset(param.data, param.old,
        function(resp){
            if(param.callback) param.callback();
            dispatch(requestDataActions.setRequestSuccess());
        },
        function(resp){
            if(param.error) param.error();
            dispatch(requestDataActions.setRequestFail());
        }
    );
  }
}
//修改维修单
export function update_single_maintainOrder(param){
    return dispatch =>{
        if(param.oldFileNumber === param.data.FileNumber){
            dispatch(requestDataActions.setRequest());
			oData.updateMaintainOrder(param.data,
                function(resp){
                    if(param.callback) param.callback();
                    dispatch(requestDataActions.setRequestSuccess());
                },
                function(resp){
                    if(param.error) param.error();
                    dispatch(requestDataActions.setRequestFail());
                }
            );
		}
		else{
            dispatch(requestDataActions.setRequest());
			oData.getMaintainOrderData({data: {fileNumber: param.data.FileNumber},callback: response => {
					var list = [];
                    var valid = true;
					if(response.maintainOrder.d.results[0]) list = eval(response.maintainOrder.d.results[0].MAINTENANCE_INFO);
					for(var i in list){
						if(list[i].fileNumber===param.data.FileNumber){
							valid = false;
							break;
						}
					}
					if(valid){
						oData.updateMaintainOrder(param.data, param.callback, param.error);
					}
					else{
						if(param.error) param.error({invalidFileNumber:true});
					}
                    dispatch(requestDataActions.setRequestSuccess());
				}
			});
		}
  }
}

//设置资产统计列表页的过滤器默认值
//资产统计列表-默认【设备类型】过滤器列表index
export function set_default_filter_value_assetList(param){
    return dispatch =>{
      if(!param) return;
      if(param.typeID){
        //this.defaultTypeID_assetList = param.typeID;
        dispatch(set_defaultFilter_valueAssetList(param.typeID));
      }
      if(param.noChange) return;
    }
}

// //设置资产统计列表页的资产选择范围(from,to)
// export function set_range_assetList(param){
//   //this.dispatch(Constants.SET_RANGE_ASSETLIST,param);
//     // return {
//     //     type: SET_RANGE_ASSETLIST,
//     //     param
//     // }
//     return dispatch =>{
//       if(!param) return;
//       if(param.from) this.from_assetList = param.from;
//       if(param.to) this.to_assetList = param.to;
//       if(param.noChange) return;
//     }
// }

//设置资产维保页的过滤器默认值
//资产维保-默认【设备类型】过滤器列表index
export function set_default_filter_value_assetMaintain(param){
    return dispatch => {
      if(!param) return;
      if(param.typeID){
        //this.defaultTypeID_assetMaintain = param.typeID;
        dispatch(set_defaultFilter_valueAssetMaintain_TypeID(param.typeID));
      }
      if(param.filter_ws){
        //this.filter_ws = param.filter_ws;
        dispatch(set_defaultFilter_valueAssetMaintain_filterWS(param.filter_ws));
      }
      else {
        //this.filter_ws = false;
        dispatch(set_defaultFilter_valueAssetMaintain_filterWS(false));
      }
      if(param.noChange) return;
    }
}

export function set_assetDetailID(param){
    return dispatch =>{
      //this.assetDetailID = param.val;
      dispatch(set_detailData_AssetDetailID(param.val));
      if(param.noChange) return;
    }
}

export function set_maintainDetailID(param){
    return dispatch =>{
        dispatch(set_maintainDetailData_ID(param.val));
    }
}

export function delete_assets(param){
    return dispatch =>{
        dispatch(requestDataActions.setRequest());
        oData.deleteAssets(param.data,
            function(resp){
                if(param.callback) param.callback();
                dispatch(requestDataActions.setRequestSuccess());
            },
            function(resp){
                if(param.error) param.error();
                dispatch(requestDataActions.setRequestFail());
            }
        );
    }
}

export function delete_maintain_orders(param){
    return dispatch =>{
        dispatch(requestDataActions.setRequest());
        oData.deleteMaintainOrders(param.data,
            function(resp){
                if(param.callback) param.callback();
                dispatch(requestDataActions.setRequestSuccess());
            },
            function(resp){
                if(param.error) param.error();
                dispatch(requestDataActions.setRequestFail());
            }
        );
    }
}
