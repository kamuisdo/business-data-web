import requestFactory from "../utils/request";
import { TimeTypeEnum } from '../enum/timeType'
import dayjs from 'dayjs';

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
    let format = TimeTypeEnum.get(query.timeType).format
    let warm = []
    let cold = []
    
    data.forEach(item => {
        let time = dayjs(item._id || item.RECORD_DATE).format(format);
        warm.push([time,item.ihetim])
        cold.push([time,item.icotim])
    });
    return { warm,cold }
}

// 多对象的运转时间格式化
const formatMultiTimeData = (data,query)=>{
    let format = TimeTypeEnum.get(query.timeType).format
    data = data.sort((a,b)=>{
        let at = dayjs(a.RECORD_DATE).unix()
        let bt = dayjs(b.RECORD_DATE).unix()
        return at - bt
    })
    return data.map(item => {
        let time = dayjs(item.RECORD_DATE).format(format);
        return [time,item.iopesum]
    });
}

// 格式化数据成为0-24小时的数据
// 返回24长度的数组
const formatTimeDataToHour = (data)=>{
    let t = [];
    // console.log(data);
    data.forEach((v)=>{
        
        let h = dayjs(v._id || v.RECORD_DATE).hour()
        // console.log(dayjs(v._id).format('YYYY/MM/DD HH:mm:ss'));
        h = h === 0 ? 23 : h-1
        // console.log(h);
        if(!t[h]){
            t[h] = 0
        }
        t[h] = t[h] + v.iopesum
    })
    return t
}

export {
    getRunTimeBarChart,
    getRunTimeHours,
    getRunTimeMulti,
    getRunTimeHoursMulti,
    formatTimeData,
    formatTimeDataToHour,
    formatMultiTimeData
    // getRunTimeErrLine,
    // getRunTimeMultiLine,
    // getRunTimeErrorMultiLine
}