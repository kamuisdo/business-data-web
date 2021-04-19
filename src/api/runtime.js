import requestFactory from "../utils/request";


const getRunTimeBarChart = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/runtime/getRunTimeBarChart' })

const getRunTimeHours = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/runtime/getRunTimeHours' })

// 多对象每天运行时长
const getRunTimeMulti = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/runtime/getRunTimeMulti' })

// 多对象每时刻运行时长
const getRunTimeHoursMulti = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/runtime/getRunTimeHoursMulti' })


export {
    getRunTimeBarChart,
    getRunTimeHours,
    getRunTimeMulti,
    getRunTimeHoursMulti
    // getRunTimeErrLine,
    // getRunTimeMultiLine,
    // getRunTimeErrorMultiLine
}