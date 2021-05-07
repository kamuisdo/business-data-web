import requestFactory from "../utils/request";
import { TimeTypeEnum } from '../enum/timeType'
import dayjs from 'dayjs';

const getHabitsSingleLine = requestFactory({ 
    url:'post/report/query/commerce/v1/device/getUsageHabitConsume',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/habits/getHabitsSingleLine' 
})

const getHabitsMultiLine = requestFactory({
    url:'post/report/query/commerce/v1/device/getUsageHabitBatchConsume',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/habits/getHabitsMultiLine' 
})

// 格式化返回值
const formatHabitsData = (data,query)=>{
    let format = TimeTypeEnum.get(query.timeType).format
    let setTemper = []
    let returnTemper = []
    let energy = []
    // data = data.map((v)=>{ 
    //     let t = dayjs(v.RECORD_DATE).unix()
    //     v.time = t
    //     return v
    // })
    data = data.sort((a,b)=>{ 
        let at = dayjs(a.RECORD_DATE).unix()
        let bt = dayjs(b.RECORD_DATE).unix()
        return at - bt
    })
    data.forEach((v)=>{    
        let time =  dayjs(v.RECORD_DATE).format(format)
        setTemper.push([time,v.artmp])
        returnTemper.push([time,v.arsut])
        energy.push([time,v.sew])
    })
    return {setTemper,returnTemper,energy}
}


export {
    getHabitsSingleLine,
    getHabitsMultiLine,
    formatHabitsData
}