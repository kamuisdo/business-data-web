import requestFactory from "../utils/request";

const chinaMap = requestFactory({ 
    url:'post/report/query/commerce/v1/getEntiretyDeviceInfo',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/overview/chinaMap' 
})

const onlineCountLine = requestFactory({ 
    url:'post/report/query/commerce/v1/getDeviceOnline',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/overview/onlineCountLine' 
})

const chinaMapCount = requestFactory({ 
    url:'post/report/query/commerce/v1/getEntiretyDeviceTotal',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/overview/chinaMapCount' 
})

const getProjectTypeChart = requestFactory({
    url:'post/report/query/commerce/v1/getBuildingTypeInfo',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/overview/getProjectTypeChart'
})

// 匹数分析
const getHpChart = requestFactory({
    url:'post/report/query/commerce/v1/getHPInfo',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/overview/getProjectTypeChart'
})

// LCNO连接数
const getLcNoLinkCount = requestFactory({
    url:'post/report/query/commerce/v1/getLcNoInfo',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/overview/getProjectTypeChart'
})

// 物件排名
const getProjectRankChart = requestFactory({
    url:'post/report/query/commerce/v1/getBuildingRanking',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/overview/getProjectTypeChart'
})


export {
    chinaMap,
    chinaMapCount,
    onlineCountLine,
    getProjectTypeChart,
    getHpChart,
    getLcNoLinkCount,
    getProjectRankChart
}