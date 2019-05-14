/**
* odata请求数据状态相关的action方法
*/

export const SET_REQUEST = 'SET_REQUEST'
export const SET_REQUEST_SUCCESS = 'SET_REQUEST_SUCCESS'
export const SET_REQUEST_FAIL = 'SET_REQUEST_FAIL'

export function setRequest() {
    return {
        type: SET_REQUEST,
        status: "requesting"
    }
}

export function setRequestSuccess() {
    return {
        type: SET_REQUEST_SUCCESS,
        status: "request success"
    }
}

export function setRequestFail() {
    return {
        type: SET_REQUEST_FAIL,
        status: "request fail"
    }
}
