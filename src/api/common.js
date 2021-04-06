import requestFactory from "../utils/request";

// 获取区域
const getRegionInfo = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/area/getRegionInfo' })

// 获取省份
const getProvinceInfo = requestFactory({ url:'post/report/query/commerce/v1/getProvinceInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/area/getProvinceInfo' })

// 获取省份的表格
const getProvinceTable = requestFactory({ url:'post/area/getProvinceTable',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/area/getProvinceTable' })

// 获取城市的下拉框
const getCityInfo = requestFactory({ url:'post/area/getCityInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/area/getCityInfo' })

// 获取城市的下拉框
const getProjectType = requestFactory({ url:'post/common/getProjectType',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/common/getProjectType' })


export {
    getProvinceTable,
    getRegionInfo,
    getProvinceInfo,
    getCityInfo,
    getProjectType
}