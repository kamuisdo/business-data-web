import requestFactory from "../utils/request";

const onlineRateMultiLine = requestFactory({ 
    url:'post/report/query/commerce/v1/national/getDeviceOnlineNumCompare',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/onlineCountMulti/onlineRateMultiLine' 
})

export {
    onlineRateMultiLine
}