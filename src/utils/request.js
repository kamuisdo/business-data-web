import axios from "axios";

let defaultConfig = {
    timeout:100000,
    responseType:'json'
}

export default function request(apiInstance,opt){
    opt = opt || {}
    opt = Object.assign(defaultConfig,opt,{
        url:apiInstance.url,
        method:apiInstance.method
    })
    return axios.request(opt)
}