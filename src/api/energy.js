import requestFactory from "../utils/request";

// 获取区域
const getEnergyBarChart = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/energy/getEnergyBarChart' })

export {
    getEnergyBarChart
}