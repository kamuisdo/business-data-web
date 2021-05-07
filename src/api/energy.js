import requestFactory from "../utils/request";
import {TimeTypeEnum} from '../enum/timeType';
import dayjs from 'dayjs'
import config from '../utils/config';

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


// 格式化数据
const formatEnergyData = (query,data)=>{
    let format = TimeTypeEnum.get(query.timeType).format;
    return data.map((v)=>{
        let electric = query.type === '合计' ? v.coldElectric + v.hotElectric : query.type === '暖房' ? v.hotElectric : v.coldElectric;
        let capacity = query.type === '合计' ? v.coolCapacity + v.heatCapacity : query.type === '暖房' ? v.heatCapacity : v.coolCapacity;
        let recordDate = dayjs(v.recordDate).format(format)
        let eer = (capacity/electric/config.err_day_params).toFixed(2)
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