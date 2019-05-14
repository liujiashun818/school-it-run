/**
  * 资产管理相关的 reducers 方法
*/

import { combineReducers } from 'redux'
import {
    IPADDRESS_FILTER_ASSET,
    MOBILE_FILTER_ASSET,
    CREATE_MONITOR_ASSET_SUCCESS,
    CREATE_MONITOR_ASSET_FAILURDLIST,
    GET_STATISTIC_DATA_TYPELIST,
    GET_STATISTIC_DATA_OVERTYPELIST,
    GET_STATISTIC_DATA_MAINTAINTOP,
    GET_CREATE_DATA_AREAIDLIST,
    GET_CREATE_DATA_STATUSLIST,
    GET_DEVLIST_DATA,
    GET_MAINTAIN_ORDER_MAINTAINORDERLIST,
    GET_MAINTAIN_ORDER_MAINTAINORDERCOUNT,
    GET_MAINTAIN_ORDER_FILTERAREALIST,
    GET_ASSET_DATA_FILTERTYPLIST,
    GET_ASSET_DATA_ASSETLIST_ASSET,
    GET_ASSET_DATA_ASSETCOUNT,
    GET_ASSET_DATA_EXPORTASSETLIST,
    GET_MONITOR_DATA,
    GET_DETAIL_DATA_SINGLEASSET,
    GET_DETAIL_DATA_ASSETDETAILID,
    GET_MAINTAIN_DETAIL_DATA_ID,
    GET_MAINTAIN_DETAIL_DATA_ORDER,
    SET_DEFAULT_FILTER_VALUE_ASSETLIST,
    SET_DEFAULT_FILTER_VALUE_ASSETMAINTAIN_TYPEID,
    SET_DEFAULT_FILTER_VALUE_ASSETMAINTAIN_FILTERWS,
    SET_PERMISSIONS_ASSET
} from '../actions/assetManage_action'

function AssetTypeList(state = [], action) {
    switch (action.type) {
        case GET_STATISTIC_DATA_TYPELIST:
            return action.assetTypeList
        default:
            return state
    }
}
function OvertimeAssetTypeList(state = [], action) {
    switch (action.type) {
        case GET_STATISTIC_DATA_OVERTYPELIST:
            return action.overtimeAssetTypeList
        default:
            return state
    }
}
function MaintainTop10(state = [], action) {
    switch (action.type) {
        case GET_STATISTIC_DATA_MAINTAINTOP:
            return action.maintainTopTen
        default:
            return state
    }
}
function AreaIdList(state = [], action) {
    switch (action.type) {
        case GET_CREATE_DATA_AREAIDLIST:
            return action.areaIdList
        default:
            return state
    }
}
function StatusList(state = [], action) {
    switch (action.type) {
        case GET_CREATE_DATA_STATUSLIST:
            return action.statusList
        default:
            return state
    }
}
function DevList(state = [], action) {
    switch (action.type) {
        case GET_DEVLIST_DATA:
            return action.devList
        default:
            return state
    }
}
function MaintainOrderList(state = [], action) {
    switch (action.type) {
        case GET_MAINTAIN_ORDER_MAINTAINORDERLIST:
            return action.maintainOrderList
        default:
            return state
    }
}
function MaintainOrderCount(state = 0, action) {
    switch (action.type) {
        case GET_MAINTAIN_ORDER_MAINTAINORDERCOUNT:
            return action.maintainOrderCount
        default:
            return state
    }
}
function Filter_AreaList(state = [], action) {
    switch (action.type) {
        case GET_MAINTAIN_ORDER_FILTERAREALIST:
            return action.filter_areaList
        default:
            return state
    }
}
function Filter_TypeList(state = [], action) {
    switch (action.type) {
        case GET_ASSET_DATA_FILTERTYPLIST:
            return action.filter_typeList
        default:
            return state
    }
}
function ExportAssetList(state = [], action) {
    switch (action.type) {
        case GET_ASSET_DATA_EXPORTASSETLIST:
            return action.exportAssetList
        default:
            return state
    }
}
function AssetList(state = [], action) {
    switch (action.type) {
        case GET_ASSET_DATA_ASSETLIST_ASSET:
            return action.assetLista
        default:
            return state
    }
}
function AssetCount(state = 0, action) {
    switch (action.type) {
        case GET_ASSET_DATA_ASSETCOUNT:
            return action.assetCount
        default:
            return state
    }
}
function DevCount(state = 0, action) {
    switch (action.type) {
        case GET_MONITOR_DATA:
            return action.devCount
        default:
            return state
    }
}
function SingleAsset(state = {}, action) {
    switch (action.type) {
        case GET_DETAIL_DATA_SINGLEASSET:
            return action.singleAsset
        default:
            return state
    }
}
function AssetDetailID(state = '', action) {
    switch (action.type) {
        case GET_DETAIL_DATA_ASSETDETAILID:
            return action.assetDetailID
        default:
            return state
    }
}
function MaintainDetailID(state = '', action) {
    switch (action.type) {
        case GET_MAINTAIN_DETAIL_DATA_ID:
            return action.maintainDetailID
        default:
            return state
    }
}
function SingleMaintainOrder(state = {}, action) {
    switch (action.type) {
        case GET_MAINTAIN_DETAIL_DATA_ORDER:
            return action.singleMaintainOrder
        default:
            return state
    }
}
function DefaultTypeID_assetList(state = '-', action) {
    switch (action.type) {
        case SET_DEFAULT_FILTER_VALUE_ASSETLIST:
            return action.defaultTypeID_assetList
        default:
            return state
    }
}
function DefaultTypeID_assetMaintain(state = '-', action) {
    switch (action.type) {
        case SET_DEFAULT_FILTER_VALUE_ASSETMAINTAIN_TYPEID:
            return action.defaultTypeID_assetMaintain
        default:
            return state
    }
};
function Filter_ws(state = false, action) {
    switch (action.type) {
        case SET_DEFAULT_FILTER_VALUE_ASSETMAINTAIN_FILTERWS:
            return action.filter_ws
        default:
            return state
    }
};

function MonitorResponse_success(state = 0, action) {
    switch (action.type) {
        case CREATE_MONITOR_ASSET_SUCCESS:
            return action.param
        default:
            return state
    }
};
function MonitorResponse_failureList(state = [], action) {
    switch (action.type) {
        case CREATE_MONITOR_ASSET_FAILURDLIST:
            return action.param
        default:
            return state
    }
};
function Permissions(state = {}, action) {
    switch (action.type) {
        case SET_PERMISSIONS_ASSET:
            return action.param
        default:
            return state
    }
};
const assetManageReducer = combineReducers({
    AssetTypeList,
    OvertimeAssetTypeList,
    MaintainTop10,
    AreaIdList,
    StatusList,
    DevList,
    Filter_AreaList,
    Filter_TypeList,
    AssetList,
    AssetCount,
    ExportAssetList,
    DevCount,
    MaintainOrderList,
    MaintainOrderCount,
    SingleAsset,
    AssetDetailID,
    MaintainDetailID,
    SingleMaintainOrder,
    DefaultTypeID_assetList,
    DefaultTypeID_assetMaintain,
    Filter_ws,
    MonitorResponse_success,
    MonitorResponse_failureList,
    Permissions
})

export default assetManageReducer
