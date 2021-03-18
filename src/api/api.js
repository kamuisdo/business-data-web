/**
 * 生成API实体，设置API的默认值
 * @urlString 请求方法和请求地址 e.g  POST/http://dev.com/api
 */
export default class Api{
    constructor(urlString,opt) {
        if(!urlString || urlString.length === 0){ throw new Error(`Api Class Error:UrlString is required`)}
        let method = urlString.split('/')[0].toLowerCase();
        let url = urlString.replace(`${method}/`,'');
        let availableMethod = ['get','delete','head','options','post','put','patch'];
        if(availableMethod.indexOf(method) < 0){
            throw new Error(`Api Class Error: urlString method is invalidate`)
        }
        opt = opt || {};
        opt = Object.assign({
            hostType:'API_HOST', // 对应env文件中的键值
            commandType:getApiCommandType(url)
        },opt);
        let host = process.env[opt.hostType];
        this.method = method;
        this.host = host;
        this.url = `${host}/${url}`;
        this.commandType = opt.commandType;
    }
}

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