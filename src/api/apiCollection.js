import Api from "./api";
import request from "../utils/request";

console.log(`-------- apiCollection init ----------`)

const api = {
    'getUserInfo':{ urlString:'post/api/user',hostType:'API_HOST_MOCK' }
}


function requestFactory(){
    let final = {};
    for(let key in api){
        let apiInstance = new Api(api[key].urlString,api[key]);
        final[key] = function (opt){
            return request(apiInstance,opt)
        }
    }
    return final
}

let apiCollection = requestFactory();

console.log(apiCollection)

export default apiCollection
