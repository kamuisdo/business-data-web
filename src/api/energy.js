import requestFactory from "../utils/request";
import {TimeTypeEnum} from '../enum/timeType';
import dayjs from 'dayjs'
import config from '../utils/config';
import isNumber from 'lodash/isNumber'

const getEnergyBarChart = requestFactory({ 
    url:'post/report/query/commerce/v1/device/getElectricConsume',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/energy/getEnergyBarChart' 
})

const getEnergyErrLine = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/energy/getEnergyErrLine' })

// 多对象耗电量
const getEnergyMultiLine = requestFactory({ 
    url:'post/report/query/commerce/v1/device/getCompareElectricConsume',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/energy/getEnergyMultiLine' 
})

const getEnergyErrorMultiLine = requestFactory({ url:'post/report/query/commerce/v1/getRegionInfo',hostType:'REACT_APP_MOCK_HOST',mockUrl:'post/energy/getEnergyErrorMultiLine' })

function parseVal(val){
    return isNumber(val) ? val.toFixed(2) : '-'
}

// 格式化数据
const formatEnergyData = (query,data)=>{
    let formatFn = TimeTypeEnum.get(query.timeType).formatFn;
    data = data.sort((a,b)=>{ return a.recordDate - b.recordDate })
    return data.map((v)=>{
        let electric = parseVal(query.type === '合计' ? v.coldElectric + v.hotElectric : query.type === '暖房' ? v.hotElectric : v.coldElectric);
        let capacity = parseVal(query.type === '合计' ? v.coolCapacity + v.heatCapacity : query.type === '暖房' ? v.heatCapacity : v.coolCapacity);
        let recordDate = formatFn(v.recordDate)

        let t = capacity/electric/config.err_day_params;
        let eer = isNumber(t) ? t.toFixed(2) : '-'
        // console.log(recordDate)
        // console.log(t)
        // console.log(isNumber(t))
        // console.log(eer)
        return {
            electric,
            capacity,
            recordDate,
            eer
        }
    })
}

export {
    getEnergyBarChart,
    getEnergyErrLine,
    getEnergyMultiLine,
    getEnergyErrorMultiLine,
    formatEnergyData
}