import requestFactory from "../utils/request";
import {TimeTypeEnum} from '../enum/timeType';
import dayjs from 'dayjs'

const onlineCountBar = requestFactory({ 
    url:'post/report/query/commerce/v1/national/getDeviceOnlineNumInfo',
    hostType:'REACT_APP_HOST',
    mockUrl:'post/onlineCountSingle/onlineCountSingleLine' 
})

const getOnlineRateLine = requestFactory({
    url:'',
    hostType:'REACT_APP_MOCK_HOST',
    mockUrl:'post/onlineCountSingle/getOnlineRateLine'
})

const formatDataByType = (value,data)=>{
     // 先根据类型取到相应的字段
     let coldKey = value.type === '物件' ? 'coldBuildingNum' :'coldLineNum';
     let hotKey = value.type === '物件' ? 'hotBuildingNum' :'hotLineNum';
     let onKey = value.type === '物件' ? 'buildingOnNum' :'lineOnNum';
     let sumKey = value.type === '物件' ? 'buildingNum' :'lineNum';
     let format = TimeTypeEnum.get(value.timeType).format;
     let formatFn = TimeTypeEnum.get(value.timeType).formatFn;
    data = data.sort((a,b)=>{ return a.recordDate - b.recordDate })
     let t = data.map((v)=>{
         return {
             cold:v[coldKey],
             hot:v[hotKey],
             on:v[onKey],
             sum:v[sumKey],
             maxWeather:v.maxWeather,
             // recordDate:dayjs(v.recordDate).format(format),
             recordDate:formatFn(v.recordDate)
         }
     })
    // console.log(data)
    // console.log(t)
     return t
}

export {
    onlineCountBar,
    getOnlineRateLine,
    formatDataByType
}