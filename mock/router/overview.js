let express = require('express')
let router = express.Router()

let utils = require('../utils')

/**
 * 全国地图数据
 */
router.post('/chinaMap',function (req,res,next){
    res.locals.data = {
        list:[
            { name: '北京', selected: false, value: 1 },
            { name: '天津', selected: false, value: 2 },
            { name: '上海', selected: false, value: 3 },
            { name: '重庆', selected: false, value: 4 },
            { name: '河北', selected: false, value: 5 },
            { name: '河南', selected: false, value: 6 },
            { name: '云南', selected: false, value: 7 },
            { name: '辽宁', selected: false, value: 8 },
            { name: '黑龙江', selected: false, value: 9 },
            { name: '湖南', selected: false, value: 10 },
            { name: '安徽', selected: false, value: 11 },
            { name: '山东', selected: false, value: 12 },
            { name: '新疆', selected: false, value: 13 },
            { name: '江苏', selected: false, value: 14 },
            { name: '浙江', selected: false, value: 15 },
            { name: '江西', selected: false, value: 16 },
            { name: '湖北', selected: false, value: 17 },
            { name: '广西', selected: false, value: 18 },
            { name: '甘肃', selected: false, value: 19 },
            { name: '山西', selected: false, value: 20 },
            { name: '内蒙古', selected: false, value: 21 },
            { name: '陕西', selected: false, value: 22 },
            { name: '吉林', selected: false, value: 23 },
            { name: '福建', selected: false, value: 24 },
            { name: '贵州', selected: false, value: 25 },
            { name: '广东', selected: false, value: 26 },
            { name: '青海', selected: false, value: 27 },
            { name: '西藏', selected: false, value: 28 },
            { name: '四川', selected: false, value: 29 },
            { name: '宁夏', selected: false, value: 30 },
            { name: '海南', selected: false, value: 31 },
            { name: '台湾', selected: false, value: 32 },
            { name: '香港', selected: false, value: 33 },
            { name: '澳门', selected: false, value: 34 }
        ],
        total:{
            projectCount:234234,
            lcCount:7345,
            sysCount:5432,
            innerCount:4353
        }
    }
    // res.locals.error = true

    next()
})

/**
 * 统计总数
 */
router.post('/chinaMapCount',function (req,res,next){
    res.locals.data = {
        projectCount:234234,
        lcCount:7345,
        sysCount:5432,
        innerCount:4353
    }

    next()
})


/**
 * 在线率趋势图
 */
router.post('/onlineCountLine',(req,res,next)=>{
    res.locals.data = {
        sysData:utils.createIncreaseData(),
        projectData:utils.createIncreaseData()
    }

    next()
})

/**
 * 在线率趋势图
 */
router.post('/getProjectTypeChart',(req,res,next)=>{
    res.locals.data = {
        projectData:[69,130,12,115,586,3,150,65,122,58,40,51,20],
        sysData:[350,438,39,578,3561,43,936,761,1081,378,269,71,57]
    }

    next()
})






module.exports = router