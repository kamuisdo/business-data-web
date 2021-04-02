import requestFactory from "../utils/request";

// 获取区域
const getRegionInfo = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/area/getRegionInfo' })

// 获取省份
const getProvinceInfo = requestFactory({ url:'post/report/query/commerce/v1/getProvinceInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/area/getProvinceInfo' })


const getProvinceTable = requestFactory({ url:'post/area/getProvinceTable',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/area/getProvinceTable' })

export {
    getProvinceTable,
    getRegionInfo,
    getProvinceInfo
}