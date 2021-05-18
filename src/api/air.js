import requestFactory from "../utils/request";

// 物件详情获取
const getCo2 = requestFactory({ url:'get/report/query/commerce/v1/building/getBuildingDetailById',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/air/getCo2' })

// 获取空气传感器数据
const getAirSensorData = requestFactory({ 
    url:'post/report/query/commerce//v1/device/getAirQualityBySensor',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/air/getCo2' 
})

const ifNoData = (data)=>{
    // 初始化状态data=null 需要展示loading  所以直接返回false  生成chart的dom
    if(data === null){ return  false }
    // if(!data || data.length === 0){ return true }
    let t = []
    data.forEach((v)=>{
        t = t.concat(v.data)
    })
    return t.length === 0
}


export {
    getCo2,
    getAirSensorData,
    ifNoData
}