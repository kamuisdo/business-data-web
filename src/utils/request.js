import axios from "axios";

let defaultConfig = {
    timeout:100000,
    responseType:'json'
}

function request(apiInstance,opt){
    opt = opt || {}
    opt = Object.assign(defaultConfig,opt,{
        url:apiInstance.url,
        method:apiInstance.method
    })
    return axios.request(opt)
}


function requestFactory(apiInstance,opt){
    // data: 请求参数
    // requestOpt
    return function (data={},requestOpt={}){

    }
}

export {
    request,
    requestFactory
}