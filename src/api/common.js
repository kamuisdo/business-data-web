import requestFactory from "../utils/request";
import cityData from "../enum/region";
import { ProjectTypeEnum } from '../enum/projectType'

let mockApiHost = 'REACT_APP_MOCK_HOST'
let apiHost = 'REACT_APP_HOST'

const getRegionInfoAsync = () => {
    let t = cityData.map((v) => {
        return {text: v.text, value: v.value}
    })
    // t.unshift({ text:'全国',value:null })
    // console.log(t)
    return t
}

const getProvinceInfoAsync = (regionCode) => {
    // 没有regionCode的时候，返回全部的省
    if(!regionCode){
        let t =[]
        cityData.forEach((v)=>{
            t = t.concat(v.children)
        })
        return t
    }
    let item = cityData.find((v) => {
        return v.value === regionCode
    })
    return item ? item.children : []
}

// 获取城市的下拉框
const getCityInfoAsync = (provinceCode,regionCode) => {

    // 只有地区，没有选择省，先过滤省
    let totalData = regionCode ? cityData.filter((v)=>{ return v.value === regionCode }) : cityData;
    let provinceList = []
    for (let i = 0; i < totalData.length; i++) {
        provinceList = provinceList.concat(totalData[i].children)
    }
    if(!provinceCode){
        //如果没有传省，就返回所有的城市
        let cityList = []
        provinceList.forEach((v)=>{
            cityList = cityList.concat(v.children)
        })
        return  cityList
    }else {
        let item = provinceList.find((v) => {
            return v.value === provinceCode
        })
        return item ? item.children : []
    }

}

// 获取区域下拉框
const getRegionInfo = () => {
    return new Promise((resolve, reject) => {
        let list = getRegionInfoAsync()
        resolve(list)
    })
}
// 获取省份下拉框
const getProvinceInfo = ({regionCode}) => {
    return new Promise((resolve, reject) => {
        // console.log(regionCode)
        let provinceList = getProvinceInfoAsync(regionCode)
        resolve(provinceList)
    })
}

// 获取省份的表格
const getProvinceTable = requestFactory({
    url: 'post/area/getProvinceTable',
    hostType: 'REACT_APP_MOCK_HOST',
    mockUrl: 'post/area/getProvinceTable'
})

// 获取城市的下拉框
const getCityInfo = ({provinceCode,regionCode}) => {
    return new Promise((resolve, reject) => {
        let cityList = getCityInfoAsync(provinceCode,regionCode)
        resolve(cityList)
    })
}
// 获取物件类型
const getProjectType = () => {
    return new Promise((resolve, reject) => {
        let provinceList = ProjectTypeEnum.toObjectArray()
        resolve(provinceList)
    })
}

// 获取物件表格
const getProjectList = requestFactory({
    url: 'post/report/query/commerce/v1/building/getBuildingInfoByParam',
    hostType: apiHost,
    mockUrl: 'post/common/getProjectList'
})

// 获取LCNo表格
const getLcNoList = requestFactory({
url: 'get/report/query/commerce/v1/building/getTerminalInfoByBuildingId',
    hostType: apiHost,
    mockUrl: 'post/common/getLcNoList'
})


// 获取系统的下拉框
const getSystemList = requestFactory({
    url: 'get/report/query/commerce/v1/building/getLineInfoByTerminalId',
    hostType: apiHost,
    mockUrl: 'post/common/getSystemList'
})

// 获取室内机的下拉框
const getInnerList = requestFactory({
    url: 'get/report/query/commerce/v1/building/getInUnitInfoByLineId',
    hostType: apiHost,
    mockUrl: 'post/common/getSystemList'
})

// 获取物件表格
const getProjectTableList = requestFactory({
    url: 'post/report/query/commerce/v1/building/getBuildingInfo',
    hostType: apiHost,
    mockUrl: 'post/common/getBuildingInfo'
})

// 物件详情获取
const getBuildingDetailById = requestFactory({
    url: 'get/report/query/commerce/v1/building/getBuildingDetailById',
    hostType: apiHost,
    mockUrl: 'get/common/getBuildingDetailById'
})


export {
    getProvinceTable,
    getRegionInfo,
    getRegionInfoAsync,
    getProvinceInfo,
    getProvinceInfoAsync,
    getCityInfo,
    getCityInfoAsync,
    getProjectType,
    getProjectList,
    getLcNoList,
    getSystemList,
    getInnerList,
    getProjectTableList,
    getBuildingDetailById
}