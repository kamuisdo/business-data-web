import requestFactory from "../utils/request";
import { TimeTypeEnum } from '../enum/timeType'
import dayjs from 'dayjs';
import { parseVal } from '../utils/utils'

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
    let formatFn = TimeTypeEnum.get(query.timeType).formatFn
    let setTemper = []
    let returnTemper = []
    let energy = []
    // data = data.map((v)=>{ 
    //     let t = dayjs(v.recordDate).unix()
    //     v.time = t
    //     return v
    // })
    data = data.sort((a,b)=>{
        return a.recordDate - b.recordDate
    })
    data.forEach((v)=>{    
        let time =  formatFn(v.recordDate)
        setTemper.push([time,parseVal(v.artmp)])
        returnTemper.push([time,parseVal(v.arsut)])
        energy.push([time,parseVal(v.energy)])
    })
    return {setTemper,returnTemper,energy}
}


export {
    getHabitsSingleLine,
    getHabitsMultiLine,
    formatHabitsData
}