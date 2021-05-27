import requestFactory from "../utils/request";
import { TimeTypeEnum } from '../enum/timeType'
import dayjs from 'dayjs';
import { parseVal } from '../utils/utils'

const getRunTimeBarChart = requestFactory({ 
    url: 'post/report/query/commerce/v1/device/getRunTimeConsume', 
    hostType: 'REACT_APP_HOST',
    mockUrl: 'post/runtime/getRunTimeBarChart' 
})

const getRunTimeHours = requestFactory({ url: 'post/report/query/commerce/v1/getRegionInfo', hostType: 'REACT_APP_MOCK_HOST', mockUrl: 'post/runtime/getRunTimeHours' })

// 多对象每天运行时长
const getRunTimeMulti = requestFactory({ 
    url: 'post/report/query/commerce//v1/device/getRunTimeBatchConsume', 
    hostType: 'REACT_APP_HOST', 
    mockUrl: 'post/runtime/getRunTimeMulti' 
})

// 多对象每时刻运行时长
const getRunTimeHoursMulti = requestFactory({ url: 'post/report/query/commerce/v1/getRegionInfo', hostType: 'REACT_APP_MOCK_HOST', mockUrl: 'post/runtime/getRunTimeHoursMulti' })


const formatTimeData = (data,query)=>{
    let formatFn = TimeTypeEnum.get(query.timeType).formatFn
    let warm = []
    let cold = []
    let temper = []
    data = data.sort((a,b)=>{
        return (a.RECORD_DATE||a.recordDate) - (b.RECORD_DATE || b.recordDate)
    })
    console.log(data)
    data.forEach(item => {
        console.log(item)
        let time = formatFn(item.RECORD_DATE || item.recordDate);
        // console.log(item.recordDate)
        // console.log(time)
        warm.push([time,parseVal(item.ihetim)])
        cold.push([time,parseVal(item.icotim)])
        temper.push([time,parseVal(item.temper)])
    });
    return { warm,cold,temper }
}

// 多对象的运转时间格式化
const formatMultiTimeData = (data,query)=>{
    let formatFn = TimeTypeEnum.get(query.timeType).formatFn
    data = data.sort((a,b)=>{
        return a.recordDate - b.recordDate
    })
    console.log('--- 多对象的运转时间格式化 ---')
    console.log(data)
    return data.map(item => {
        let time = formatFn(item.recordDate)
        return [time,item.iopesum]
    });
}

// 判断是不是返回了空数据
const ifNoDataFn = (data) =>{
    if(!data || data.length === 0){ return true }
    let t = []
    data.forEach((v)=>{
        for(let k in v){
            t = t.concat(v[k])
        }
    })
    return t.length === 0
}

// 格式化数据成为1-24小时的数据
// 返回24长度的数组
const formatTimeDataToHour = (data)=>{
    let t = [];
    // console.log(data);
    data.forEach((v)=>{
        
        let h = Number(v.recordDate.toString().slice(8,10))
        // console.log(dayjs(v._id).format('YYYY/MM/DD HH:mm:ss'));
        // console.log(h)
        h = ((h === 0) ? 23 : (h-1))
        // console.log(h);
        if(!t[h]){
            t[h] = 0
        }
        t[h] = t[h] + v.iopesum
    })
    // console.log(t)
    return t
}

export {
    getRunTimeBarChart,
    getRunTimeHours,
    getRunTimeMulti,
    getRunTimeHoursMulti,
    formatTimeData,
    formatTimeDataToHour,
    formatMultiTimeData,
    ifNoDataFn
    // getRunTimeErrLine,
    // getRunTimeMultiLine,
    // getRunTimeErrorMultiLine
}