let express = require('express')
let router = express.Router()
let utils = require('../utils')

/**
 * 单物件运转时长柱状图
 */
router.post('/getRunTimeBarChart',(req,res,next)=>{
    res.locals.data = {
        warm:utils.createRandomData(100,200),
        cold:utils.createRandomData(100,200),
        temper:utils.createRandomData(0,40),
    }

    next()
})

/**
 * 单物件每时刻的运转时长总数
 */
router.post('/getRunTimeHours',(req,res,next)=>{
    let t = [];
    for(let i=1;i<25;i++){
        t.push(utils.randomData(100,200))
    }

    res.locals.data = t

    next()
})

/**
 * 多物件每日运行时长
 */
router.post('/getRunTimeMulti',(req,res,next)=>{

    res.locals.data = req.body.selected.map(()=>{
        return utils.createRandomData(100,40)
    })

    next()
})

/**
 * 多物件每时刻运行时长
 */
router.post('/getRunTimeHoursMulti',(req,res,next)=>{

    res.locals.data = req.body.selected.map(()=>{
        let t = [];
        for(let i=1;i<25;i++){
            t.push(utils.randomData(100,200))
        }

        return t
    })

    next()
})







module.exports = router