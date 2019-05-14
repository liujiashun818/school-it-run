/**
 * 数据字典相关的reducer
 */
import { combineReducers } from 'redux'
import {
  SET_RIGHTDICTPAGE, SET_BRANDDATA, SET_BRANDID, SET_ASSETSSTATUS, SET_ASSETSSTATUID,
  SET_ASSETSTYPE, SET_ASSETSTYPEID, SET_FAULTTYPE, SET_FAULTTYPEID, SET_FAULTSUBDATA,
  SET_FAULTSUBID, SET_FAULTSUBPID, SET_AREADATA, SET_AREAID, SET_TPDATA,SET_WORKORDERSTATUSDATA,
  SET_TPID, SET_WORKORDERSTATUSID,SET_SYSTEMINFODATA
} from '../actions/dataDict_action'

function rightDictPage(state = {id:0,name:"请选择菜单"}, action) {
    switch (action.type) {
        case SET_RIGHTDICTPAGE:
            return action.rightDictPage
        default:
            return state
    }
}

function brandData(state = [], action) {
    switch (action.type) {
        case SET_BRANDDATA:
            return action.brandData
        default:
            return state
    }
}

function brandId(state = "", action) {
    switch (action.type) {
        case SET_BRANDID:
            return action.brandId
        default:
            return state
    }
}

function assetsStatus(state = [], action) {
    switch (action.type) {
        case SET_ASSETSSTATUS:
            return action.assetsStatus
        default:
            return state
    }
}

function assetsStatuId(state = "", action) {
    switch (action.type) {
        case SET_ASSETSSTATUID:
            return action.assetsStatuId
        default:
            return state
    }
}

function assetsType(state = [], action) {
    switch (action.type) {
        case SET_ASSETSTYPE:
            return action.assetsType
        default:
            return state
    }
}

function assetsTypeId(state = "", action) {
    switch (action.type) {
        case SET_ASSETSTYPEID:
            return action.assetsTypeId
        default:
            return state
    }
}

function faultType(state = [], action) {
    switch (action.type) {
        case SET_FAULTTYPE:
            return action.faultType
        default:
            return state
    }
}

function faultTypeId(state = "", action) {
    switch (action.type) {
        case SET_FAULTTYPEID:
            return action.faultTypeId
        default:
            return state
    }
}

function faultSubData(state = [], action) {
    switch (action.type) {
        case SET_FAULTSUBDATA:
            return action.faultSubData
        default:
            return state
    }
}

function faultSubId(state = "", action) {
    switch (action.type) {
        case SET_FAULTSUBID:
            return action.faultSubId
        default:
            return state
    }
}

function faultSubPid(state = "", action) {
    switch (action.type) {
        case SET_FAULTSUBPID:
            return action.faultSubPid
        default:
            return state
    }
}

function areaData(state = [], action) {
    switch (action.type) {
        case SET_AREADATA:
            return action.areaData
        default:
            return state
    }
}

function areaId(state = "", action) {
    switch (action.type) {
        case SET_AREAID:
            return action.areaId
        default:
            return state
    }
}

function tpData(state = [], action) {
    switch (action.type) {
        case SET_TPDATA:
            return action.tpData
        default:
            return state
    }
}

function workOrderStatusData(state = [], action) {
    switch (action.type) {
        case SET_WORKORDERSTATUSDATA:
            return action.workOrderStatusData
        default:
            return state
    }
}


function tpId(state = "", action) {
    switch (action.type) {
        case SET_TPID:
            return action.tpId
        default:
            return state
    }
}
function workOrderStatusId(state = "", action) {
    switch (action.type) {
        case SET_WORKORDERSTATUSID:
            return action.workerOrderStatusId
        default:
            return state
    }
}



function systemInfoData(state = [], action) {
    switch (action.type) {
        case SET_SYSTEMINFODATA:
            return action.systemInfoData
        default:
            return state
    }
}

const dataDictReducer = combineReducers({
    rightDictPage,
    brandData,
    brandId,
    assetsStatus,
    assetsStatuId,
    assetsType,
    assetsTypeId,
    faultType,
    faultTypeId,
    faultSubData,
    faultSubId,
    faultSubPid,
    areaData,
    areaId,
    tpData,
    workOrderStatusData,
    tpId,
    workOrderStatusId,
    systemInfoData
})

export default dataDictReducer
