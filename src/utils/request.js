import axios from "axios";
import { notification } from 'antd';

let defaultConfig = {
    timeout:10000000,
    responseType:'json'
}

/**
 * 实际发起请求的方法
 * @param apiInstance
 * @param opt
 * @returns {Promise<AxiosResponse<any>>}
 */
// function request(apiInstance,opt){
//     opt = opt || {}
//     opt = Object.assign(defaultConfig,opt,{
//         url:apiInstance.url,
//         method:apiInstance.method
//     })
//     return axios.request(opt)
// }

/**
 * 根据url的内容判断API的类型
 * @return 'command' or 'read'
 */
function getApiCommandType(url){
    url = url.toLowerCase();
    let keyWords = ['add','create','update','change','delete','remove']
    for(let i=0;i<keyWords.length;i++){
        if(url.indexOf(keyWords[i]) >= 0){
            return 'command'
        }
    }
    return 'read'
}

// 请求失败的通知
function errorNotification(resOrErr){
    notification.open({
        message: '数据请求失败',
        description:'温馨提示：因为服务器问题，暂时无法请求到数据。若需查看数据，可以进行刷新或稍后重试',
        className: 'error-notification',
        style: {
            width: 450,
        },
        // duration:null
    });
    // 默认将错误继续抛出
    throw new Error(resOrErr)
}

/**
 * 返回暴露给试图层调用的方法
 */
export default function requestFactory(apiOpt={}){
    // data: 请求参数
    let hostType = apiOpt.hostType || 'REACT_APP_HOST'
    let mockUrlString = apiOpt.mockUrl || apiOpt.url;
    let urlString = hostType === 'REACT_APP_HOST' ? apiOpt.url : mockUrlString;
    if(!urlString || urlString.length === 0){ throw new Error(`apiOpt.url is required`)}
    let tempArr = urlString.split('/');
    let method = tempArr[0].toLowerCase();
    let url = `/${tempArr.slice(1).join('/')}`;
    let availableMethod = ['get','delete','head','options','post','put','patch'];
    if(availableMethod.indexOf(method) < 0){
        throw new Error(`Api Class Error: urlString method is invalidate`)
    }
    let commandType = getApiCommandType(url);
    apiOpt = Object.assign({
        hostType:'REACT_APP_HOST', // 对应env文件中的键值
        commandType:commandType
    },apiOpt);

    let host = process.env[apiOpt.hostType];

    // console.log(apiOpt.hostType)
    // console.log(host)

    return function (data={},requestOpt={}){
        let dataKey = method === 'get' ? 'params' : 'data';
        let axiosConfig = Object.assign({},defaultConfig,apiOpt,requestOpt,{
            url:url,
            baseURL: host,
            method:method,
            [dataKey]:data
        })
        // console.log(dataKey);
        // console.log(apiOpt);
        // console.log(requestOpt);
        // console.log(axiosConfig);
        return axios.request(axiosConfig).then((res)=>{
            let ifError = res.data.code !== 0;
            if(ifError){
                //TODO 此处可加入默认的发生错误时的副作用
                console.log('-  ifError --');
                errorNotification(res)
            }
            return res.data.data
        })
        // .catch((err)=>{
        //     console.log('-  catch --');
        //     errorNotification(err)
        // })
    }
}
