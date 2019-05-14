/**
 * 数据字典相关action
 */
var oData = require('../server/odataDict');
import * as requestDataActions from './requestData_action'

export const SET_RIGHTDICTPAGE = 'SET_RIGHTDICTPAGE'
export const SET_BRANDDATA = 'SET_BRANDDATA'
export const SET_BRANDID = 'SET_BRANDID'
export const SET_ASSETSSTATUS = 'SET_ASSETSSTATUS'
export const SET_ASSETSSTATUID = 'SET_ASSETSSTATUID'
export const SET_ASSETSTYPE = 'SET_ASSETSTYPE'
export const SET_ASSETSTYPEID = 'SET_ASSETSTYPEID'
export const SET_FAULTTYPE = 'SET_FAULTTYPE'
export const SET_FAULTTYPEID = 'SET_FAULTTYPEID'
export const SET_FAULTSUBDATA = 'SET_FAULTSUBDATA'
export const SET_FAULTSUBID = 'SET_FAULTSUBID'
export const SET_FAULTSUBPID = 'SET_FAULTSUBPID'
export const SET_AREADATA = 'SET_AREADATA'
export const SET_AREAID = 'SET_AREAID'
export const SET_TPDATA = 'SET_TPDATA'
export const SET_WORKORDERSTATUSDATA = 'SET_WORKORDERSTATUSDATA'
export const SET_TPID = 'SET_TPID'
export const SET_WORKORDERSTATUSID = 'SET_WORKORDERSTATUSID'
export const SET_SYSTEMINFODATA = 'SET_SYSTEMINFODATA'

export function setRightDictPage(rightDictPage) {
    return {
        type: SET_RIGHTDICTPAGE,
        rightDictPage
    }
}

export function setBrandData(brandData) {
    return {
        type: SET_BRANDDATA,
        brandData
    }
}

export function setBrandId(brandId) {
    return {
        type: SET_BRANDID,
        brandId
    }
}

export function setAssetsStatus(assetsStatus) {
    return {
        type: SET_ASSETSSTATUS,
        assetsStatus
    }
}

export function setAssetsStatuId(assetsStatuId) {
    return {
        type: SET_ASSETSSTATUID,
        assetsStatuId
    }
}

export function setAssetsType(assetsType) {
    return {
        type: SET_ASSETSTYPE,
        assetsType
    }
}

export function setAssetsTypeId(assetsTypeId) {
    return {
        type: SET_ASSETSTYPEID,
        assetsTypeId
    }
}

export function setFaultType(faultType) {
    return {
        type: SET_FAULTTYPE,
        faultType
    }
}

export function setFaultTypeId(faultTypeId) {
    return {
        type: SET_FAULTTYPEID,
        faultTypeId
    }
}

export function setFaultSubData(faultSubData) {
    return {
        type: SET_FAULTSUBDATA,
        faultSubData
    }
}

export function setFaultSubId(faultSubId) {
    return {
        type: SET_FAULTSUBID,
        faultSubId
    }
}

export function setFaultSubPid(faultSubPid) {
    return {
        type: SET_FAULTSUBPID,
        faultSubPid
    }
}

export function setAreaData(areaData) {
    return {
        type: SET_AREADATA,
        areaData
    }
}

export function setAreaId(areaId) {
    return {
        type: SET_AREAID,
        areaId
    }
}

export function setTpData(tpData) {
    return {
        type: SET_TPDATA,
        tpData
    }
}

export function setWorkOrderStatusData(workOrderStatusData) {
    return {
        type: SET_WORKORDERSTATUSDATA,
        workOrderStatusData
    }
}

export function setTpId(tpId) {
    return {
        type: SET_TPID,
        tpId
    }
}

export function setWorkOrderStatusId(workerOrderStatusId) {
    return {
        type: SET_WORKORDERSTATUSID,
        workerOrderStatusId
    }
}


export function setSystemInfoData(systemInfoData) {
    return {
        type: SET_SYSTEMINFODATA,
        systemInfoData
    }
}

export function get_brandData() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
		oData.getBrandData(function(data){
			var results = data.results;
            dispatch(setBrandData(results));
            dispatch(setBrandId(""));
            dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function save_brand(data) {
    return (dispatch, getState) => {
        var state = getState();
        var id = state.dataDictReducer.brandId;
		var brands = state.dataDictReducer.brandData;
		for(var i=0;i<brands.length;i++){
			var bname = brands[i].BrandName;
			if(data == bname){
                setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "品牌名称已存在"
                    $('#publicMessageModal').modal('show');
                },100);
				return false;
			}
		}
		if(id!=null && id!=""){
			var param = {RecId:id,BrandName:data};
            dispatch(requestDataActions.setRequest());
			oData.editBrand(param,function(data2){
				$("#brandNameInput").val("");
                dispatch(setBrandId(""));
				dispatch(get_brandData());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
                    $('#publicMessageModal').modal('show');
                },100);
            });
		}else{
			var param = {BrandName:data};
            dispatch(requestDataActions.setRequest());
			oData.addBrand(param,function(data2){
				$("#brandNameInput").val("");
                dispatch(setBrandId(""));
				dispatch(get_brandData());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
                    document.getElementById('publicMessageModelTitle').innerHTML = "提示"
                    document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
                    $('#publicMessageModal').modal('show');
                },100);
            });
		}
    }
}

export function delete_brand() {
    return (dispatch, getState) => {
        var state = getState();
		var id = state.dataDictReducer.brandId;
		if(id==null || id==""){
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "请选择要删除的记录"
				$('#publicMessageModal').modal('show');
			},100);
			return false;
		}
        dispatch(requestDataActions.setRequest());
		oData.deleteBrand(id,function(data2){
			console.log(data2);
			$("#brandNameInput").val("");
            dispatch(setBrandId(""));
            dispatch(get_brandData());
            dispatch(requestDataActions.setRequestSuccess());
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "删除完成"
				$('#publicMessageModal').modal('show');
			},100);
		});
    }
}

export function get_assetsStatus() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
		oData.getAssetsStatus(function(data){
			var results = data.results;
            dispatch(setAssetsStatus(results));
            dispatch(setAssetsStatuId(""));
            dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function save_assetsStatus(data) {
    return (dispatch, getState) => {
        var state = getState();
        var id = state.dataDictReducer.assetsStatuId;
		var brands = state.dataDictReducer.assetsStatus;
		for(var i=0;i<brands.length;i++){
			var bname = brands[i].StatusName;
			if(data == bname){
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "资产状态已存在"
					$('#publicMessageModal').modal('show');
				},100);
				return false;
			}
		}
		if(id!=null && id!=""){
			var param = {RecId:id,StatusName:data};
            dispatch(requestDataActions.setRequest());
			oData.editAssetsStatus(param,function(data2){
				$("#statusNameInput").val("");
                dispatch(setAssetsStatuId(""));
                dispatch(get_assetsStatus());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
			});
		}else{
			var param = {StatusName:data};
            dispatch(requestDataActions.setRequest());
			oData.addAssetsStatus(param,function(data2){
				$("#statusNameInput").val("");
                dispatch(setAssetsStatuId(""));
                dispatch(get_assetsStatus());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
			});
		};
    }
}

export function delete_assetsStatus() {
    return (dispatch, getState) => {
        var state = getState();
		var id = state.dataDictReducer.assetsStatuId;
		if(id==null || id==""){
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "请选择要删除的记录"
				$('#publicMessageModal').modal('show');
			},100);
			return false;
		}
        dispatch(requestDataActions.setRequest());
		oData.deleteAssetsStatus(id,function(data2){
			console.log(data2);
			$("#statusNameInput").val("");
            dispatch(setAssetsStatuId(""));
            dispatch(get_assetsStatus());
            dispatch(requestDataActions.setRequestSuccess());
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "删除完成"
				$('#publicMessageModal').modal('show');
			},100);
		});
    }
}

export function get_assetsTypes() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
		oData.getAssetsTypes(function(data){
			var results = data.results;
            dispatch(setAssetsType(results));
            dispatch(setAssetsTypeId(""));
            dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function save_assetsType(data) {
    return (dispatch, getState) => {
        var state = getState();
        var id = state.dataDictReducer.assetsTypeId;
		var brands = state.dataDictReducer.assetsType;
		if(id!=null && id!=""){
			for(var i=0;i<brands.length;i++){
				var bname = brands[i].TypeName;
				var bcode = brands[i].CodeName;
				var braid = brands[i].RecId;
				if(data.TypeName == bname && id != braid){
					setTimeout(function(){
						document.getElementById('publicMessageModelTitle').innerHTML = "提示"
						document.getElementById('publicMessageModalcontent').innerHTML = "资产类型名称已存在"
						$('#publicMessageModal').modal('show');
					},100);
					return false;
				}
				if(data.CodeName == bcode && id != braid){
					setTimeout(function(){
						document.getElementById('publicMessageModelTitle').innerHTML = "提示"
						document.getElementById('publicMessageModalcontent').innerHTML = "资产类型代号已存在"
						$('#publicMessageModal').modal('show');
					},100);
					return false;
				}
			}
		}else{
			for(var i=0;i<brands.length;i++){
				var bname = brands[i].TypeName;
				var bcode = brands[i].CodeName;
				if(data.TypeName == bname){
					setTimeout(function(){
						document.getElementById('publicMessageModelTitle').innerHTML = "提示"
						document.getElementById('publicMessageModalcontent').innerHTML = "资产类型名称已存在"
						$('#publicMessageModal').modal('show');
					},100);
					return false;
				}
				if(data.CodeName == bcode){
					setTimeout(function(){
						document.getElementById('publicMessageModelTitle').innerHTML = "提示"
						document.getElementById('publicMessageModalcontent').innerHTML = "资产类型代号已存在"
						$('#publicMessageModal').modal('show');
					},100);
					return false;
				}
			}
		}
		if(id!=null && id!=""){
			var param = {RecId:id,CodeName:data.CodeName,TypeName:data.TypeName};
            dispatch(requestDataActions.setRequest());
			oData.editAssetsTypes(param,function(data2){
                $("#assetsTypeNameInput").val("");
                $("#assetsTypeCodeInput").val("");
                dispatch(setAssetsTypeId(""));
                dispatch(get_assetsTypes());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
			});
		}else{
			var param = {CodeName:data.CodeName,TypeName:data.TypeName};
            dispatch(requestDataActions.setRequest());
			oData.addAssetsTypes(param,function(data2){
                $("#assetsTypeNameInput").val("");
                $("#assetsTypeCodeInput").val("");
                dispatch(setAssetsTypeId(""));
                dispatch(get_assetsTypes());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
			});
		}
    }
}

export function delete_assetsType() {
    return (dispatch, getState) => {
        var state = getState();
		var id = state.dataDictReducer.assetsTypeId;
		if(id==null || id==""){
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "请选择要删除的记录"
				$('#publicMessageModal').modal('show');
			},100);
			return false;
		}
        dispatch(requestDataActions.setRequest());
		oData.deleteAssetsTypes(id,function(data2){
			$("#assetsTypeNameInput").val("");
            $("#assetsTypeCodeInput").val("");
            dispatch(setAssetsTypeId(""));
            dispatch(get_assetsTypes());
            dispatch(requestDataActions.setRequestSuccess());
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "删除完成"
				$('#publicMessageModal').modal('show');
			},100);
		});
    }
}

export function get_sysFaultType() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
		oData.getSysFaultType(function(data){
			var results = data.results;
            dispatch(setFaultType(results));
            dispatch(setFaultTypeId(""));
            dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function save_sysFaultType(data) {
    return (dispatch, getState) => {
        var state = getState();
        var id = state.dataDictReducer.faultTypeId;
		var brands = state.dataDictReducer.faultType;
		for(var i=0;i<brands.length;i++){
			var bname = brands[i].FaultName;
			if(data == bname){
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "故障大类已存在"
					$('#publicMessageModal').modal('show');
				},100);
				return false;
			}
		}
		if(id!=null && id!=""){
			var param = {RecId:id,FaultName:data};
            dispatch(requestDataActions.setRequest());
			oData.editSysFaultType(param,function(data2){
				$("#sysFaultTypeNameInput").val("");
                dispatch(setFaultTypeId(""));
                dispatch(get_sysFaultType());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
			});
		}else{
			var param = {FaultName:data};
            dispatch(requestDataActions.setRequest());
			oData.addSysFaultType(param,function(data2){
				$("#sysFaultTypeNameInput").val("");
                dispatch(setFaultTypeId(""));
                dispatch(get_sysFaultType());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
			});
		}
    }
}

export function delete_sysFaultType() {
    return (dispatch, getState) => {
        var state = getState();
		var id = state.dataDictReducer.faultTypeId;
		if(id==null || id==""){
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "请选择要删除的记录"
				$('#publicMessageModal').modal('show');
			},100);
			return false;
		}
        dispatch(requestDataActions.setRequest());
		oData.deleteSysFaultType(id,function(data2){
			console.log(data2);
			$("#sysFaultTypeNameInput").val("");
            dispatch(setFaultTypeId(""));
            dispatch(get_sysFaultType());
            dispatch(requestDataActions.setRequestSuccess());
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "删除完成"
				$('#publicMessageModal').modal('show');
			},100);
		});
    }
}

export function get_sysFaultSubType() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
		oData.getSysFaultSubType(function(data){
			var results = data.results;
			if(results.length>0){
				var result = results[0].FAULTS;
				var faults = eval(result);
                dispatch(setFaultSubData(faults));
                dispatch(setFaultSubPid(""));
                dispatch(setFaultSubId(""));
                dispatch(requestDataActions.setRequestSuccess());
			};
		});
    }
}

export function save_sysFaultSubType(data) {
    return (dispatch, getState) => {
        var state = getState();
		var id = state.dataDictReducer.faultSubId;
		var pid = state.dataDictReducer.faultSubPid;
		if(pid == null || pid == ""){
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "请选择故障大类"
				$('#publicMessageModal').modal('show');
			},100);
			return false;
		}
		var brands = state.dataDictReducer.faultSubData;
		for(var i=0;i<brands.length;i++){
			var bname = brands[i].cName;
			var bpid = brands[i].pId;
			if(data == bname && pid == bpid){
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "该故障大类下故障细类已存在"
					$('#publicMessageModal').modal('show');
				},100);
				return false;
			}
		}
		if(id!=null && id!=""){
			var param = {RecId:id,FaultName:data,ParentID:pid};
            dispatch(requestDataActions.setRequest());
			oData.editSysFaultType(param,function(data2){
                $("#faultTypeSelect").find(".rw-input").text("");
                $("#faultSubTypeNameInput").val("");
                dispatch(setFaultSubPid(""));
                dispatch(setFaultSubId(""));
                dispatch(get_sysFaultSubType());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
			});
		}else{
			var param = {FaultName:data,ParentID:pid};
            dispatch(requestDataActions.setRequest());
			oData.addSysFaultType(param,function(data2){
				$("#faultTypeSelect").find(".rw-input").text("");
                $("#faultSubTypeNameInput").val("");
                dispatch(setFaultSubPid(""));
                dispatch(setFaultSubId(""));
                dispatch(get_sysFaultSubType());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
			});
		}
    }
}

export function delete_sysFaultSubType() {
    return (dispatch, getState) => {
        var state = getState();
		var id = state.dataDictReducer.faultSubId;
		if(id==null || id==""){
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "请选择要删除的记录"
				$('#publicMessageModal').modal('show');
			},100);
			return false;
		}
        dispatch(requestDataActions.setRequest());
		oData.deleteSysFaultType(id,function(data2){
			$("#faultTypeSelect").find(".rw-input").text("");
            $("#faultSubTypeNameInput").val("");
            dispatch(setFaultSubPid(""));
            dispatch(setFaultSubId(""));
            dispatch(get_sysFaultSubType());
            dispatch(requestDataActions.setRequestSuccess());
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "删除完成"
				$('#publicMessageModal').modal('show');
			},100);
		});
    }
}

export function get_areaData() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
		oData.getAreaData(function(data){
            dispatch(setAreaData(data.results));
            dispatch(setAreaId(""));
            dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function save_areaData(data) {
    return (dispatch, getState) => {
        var state = getState();
        var id = state.dataDictReducer.areaId;
		var brands = state.dataDictReducer.areaData;
		if(id!=null && id!=""){
			for(var i=0;i<brands.length;i++){
				var bid = brands[i].RecId;
				var bname = brands[i].Name;
				var bcode = brands[i].Code;
				if(data[0] == bname && bid != id){
					setTimeout(function(){
						document.getElementById('publicMessageModelTitle').innerHTML = "提示"
						document.getElementById('publicMessageModalcontent').innerHTML = "区域名称已存在"
						$('#publicMessageModal').modal('show');
					},100);
					return false;
				}
				if(data[1] == bcode && bid != id){
					setTimeout(function(){
						document.getElementById('publicMessageModelTitle').innerHTML = "提示"
						document.getElementById('publicMessageModalcontent').innerHTML = "区域代号已存在"
						$('#publicMessageModal').modal('show');
					},100);
					return false;
				}
			}
			var param = {RecId:id,Name:data[0],AreaDesc:data[2],Code:data[1]};
            dispatch(requestDataActions.setRequest());
			oData.editAreaData(param,function(data2){
				$("#areaNameInput").val("");
                $("#areaCodeInput").val("");
                $("#areaDescInput").val("");
                dispatch(setAreaId(""));
                dispatch(get_areaData());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
			});
		}else{
			for(var i=0;i<brands.length;i++){
				var bname = brands[i].Name;
				var bcode = brands[i].Code;
				if(data[0] == bname){
					setTimeout(function(){
						document.getElementById('publicMessageModelTitle').innerHTML = "提示"
						document.getElementById('publicMessageModalcontent').innerHTML = "区域名称已存在"
						$('#publicMessageModal').modal('show');
					},100);
					return false;
				}
				if(data[1] == bcode){
					setTimeout(function(){
						document.getElementById('publicMessageModelTitle').innerHTML = "提示"
						document.getElementById('publicMessageModalcontent').innerHTML = "区域代号已存在"
						$('#publicMessageModal').modal('show');
					},100);
					return false;
				}
			}
			var param = {Name:data[0],AreaDesc:data[2],Code:data[1]};
            dispatch(requestDataActions.setRequest());
			oData.addAreaData(param,function(data2){
				$("#areaNameInput").val("");
                $("#areaCodeInput").val("");
                $("#areaDescInput").val("");
                dispatch(setAreaId(""));
                dispatch(get_areaData());
                dispatch(requestDataActions.setRequestSuccess());
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
			});
		}
    }
}

export function delete_areaData() {
    return (dispatch, getState) => {
        var state = getState();
		var id = state.dataDictReducer.areaId;
		if(id==null || id==""){
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "请选择要删除的记录"
				$('#publicMessageModal').modal('show');
			},100);
			return false;
		};
        dispatch(requestDataActions.setRequest());
		oData.deleteAreaData(id,function(data2){
			$("#areaNameInput").val("");
			$("#areaCodeInput").val("");
			$("#areaDescInput").val("");
            dispatch(setAreaId(""));
            dispatch(get_areaData());
            dispatch(requestDataActions.setRequestSuccess());
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "删除完成"
				$('#publicMessageModal').modal('show');
			},100);
		});
    }
}

export function get_tpData() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
		oData.getTpData(function(data){
            dispatch(setTpData(data.results));
            dispatch(setTpId(""));
            dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

//获取工单状态
export function get_WorkOrderStatusData() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
		oData.getWorkOrderStatusData(function(data){
            dispatch(setWorkOrderStatusData(data.results));
            dispatch(setWorkOrderStatusId(""));
            dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function save_tpData(data) {
    return (dispatch, getState) => {
        var state = getState();
		var id = state.dataDictReducer.tpId;
		if(id != null && id != ""){
			data.RecId = id;
            dispatch(requestDataActions.setRequest());
			oData.editTpData(data,function(result){
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
				$("#tpNameInput").val("");
				$("#tpValueInput").val("");
				$("#tpDescInput").val("");
                dispatch(get_tpData());
                dispatch(requestDataActions.setRequestSuccess());
			});
		}else{
            dispatch(requestDataActions.setRequest());
			oData.addTpData(data,function(result){
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
				$("#tpNameInput").val("");
				$("#tpValueInput").val("");
				$("#tpDescInput").val("");
                dispatch(get_tpData());
                dispatch(requestDataActions.setRequestSuccess());
			});
		}
    }
}

//保存工单状态
export function save_workOrderStatusData(data) {
    return (dispatch, getState) => {
        var state = getState();
		var id = state.dataDictReducer.workOrderStatusId;
		if(id != null && id != ""){
			data.RecId = id;
            dispatch(requestDataActions.setRequest());
			oData.editDictionaryData(data,function(result){
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
				$("#tpNameInput").val("");
				$("#tpValueInput").val("");
                dispatch(get_WorkOrderStatusData());
                dispatch(requestDataActions.setRequestSuccess());
			});
		}else{
            dispatch(requestDataActions.setRequest());
			oData.addDictionaryData(data,function(result){
				setTimeout(function(){
					document.getElementById('publicMessageModelTitle').innerHTML = "提示"
					document.getElementById('publicMessageModalcontent').innerHTML = "保存完成"
					$('#publicMessageModal').modal('show');
				},100);
				$("#tpNameInput").val("");
				$("#tpValueInput").val("");
                dispatch(get_WorkOrderStatusData());
                dispatch(requestDataActions.setRequestSuccess());
			});
		}
    }
}
export function delete_workOrderStatusData() {
    return (dispatch, getState) => {
        var state = getState();
		var id = state.dataDictReducer.workOrderStatusId;
        dispatch(requestDataActions.setRequest());
		oData.deleteDictionaryData(id,function(data){
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "删除完成"
				$('#publicMessageModal').modal('show');
			},100);
			$("#tpNameInput").val("");
			$("#tpValueInput").val("");
            dispatch(get_WorkOrderStatusData());
            dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function delete_tpData() {
    return (dispatch, getState) => {
        var state = getState();
		var id = state.dataDictReducer.tpId;
        dispatch(requestDataActions.setRequest());
		oData.deleteTpData(id,function(data){
			setTimeout(function(){
				document.getElementById('publicMessageModelTitle').innerHTML = "提示"
				document.getElementById('publicMessageModalcontent').innerHTML = "删除完成"
				$('#publicMessageModal').modal('show');
			},100);
			$("#tpNameInput").val("");
			$("#tpValueInput").val("");
			$("#tpDescInput").val("");
            dispatch(get_tpData());
            dispatch(requestDataActions.setRequestSuccess());
		});
    }
}

export function get_systemInfoData() {
    return dispatch => {
        dispatch(requestDataActions.setRequest());
		oData.getSystemInfoData(function(result){
            dispatch(setSystemInfoData(result.results));
            dispatch(requestDataActions.setRequestSuccess());
		});
    }
}
