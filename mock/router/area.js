let express = require('express')
let router = express.Router()
let Mock = require('mockjs')
let utils = require('../utils')

const areaMap = {
    '华东':['上海','江苏','安徽','浙江'],
    '华南':['云南','贵州','广西','广东','福建','海南'],
    '华北':['河北','山西','北京','天津','山东'],
    '中西部':['新疆','西藏','甘肃','青海','宁夏','陕西','河南','湖北','湖南','江西','四川','重庆'],
    '东北':['内蒙古','辽宁','黑龙江','吉林']
}

/**
 * 区域
 */
router.post('/getRegionInfo',(req,res,next)=>{

    res.locals.data = Object.keys(areaMap).map((v)=>{ return {regionName:v,regionCode:v} })

    next()
})

/**
 * 根据区域获取省份
 */
router.post('/getProvinceInfo',(req,res,next)=>{

    let data = [];
    if(areaMap[req.body.region]){
        data = areaMap[req.body.region].map((v)=>{ return {provinceName:v,provinceCode:v} })
    }

    res.locals.data = data

    next()
})


/**
 * 获取省份
 */
router.post('/getProvinceTable',(req,res,next)=>{

    res.locals.data = {
        list:['上海','江苏','安徽','浙江','云南','贵州','广西','广东','福建','海南','河北','山西','北京','天津','山东','新疆','西藏','甘肃','青海','宁夏','陕西','河南','湖北','湖南','江西','四川','重庆','内蒙古','辽宁','黑龙江','吉林'],
        total:29
    }

    next()
})





module.exports = router