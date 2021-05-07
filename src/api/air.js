import requestFactory from "../utils/request";

// 物件详情获取
const getCo2 = requestFactory({ url:'get/report/query/commerce/v1/building/getBuildingDetailById',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/air/getCo2' })

// 获取空气传感器数据
const getAirSensorData = requestFactory({ 
    url:'post/report/query/commerce//v1/device/getAirQualityBySensor',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/air/getCo2' 
})


export {
    getCo2,
    getAirSensorData
}