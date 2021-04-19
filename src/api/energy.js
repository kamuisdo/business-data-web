import requestFactory from "../utils/request";


const getEnergyBarChart = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/energy/getEnergyBarChart' })

const getEnergyErrLine = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/energy/getEnergyErrLine' })

// 多对象耗电量
const getEnergyMultiLine = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/energy/getEnergyMultiLine' })

const getEnergyErrorMultiLine = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/energy/getEnergyErrorMultiLine' })


export {
    getEnergyBarChart,
    getEnergyErrLine,
    getEnergyMultiLine,
    getEnergyErrorMultiLine
}