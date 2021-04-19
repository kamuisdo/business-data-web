let express = require('express')
let router = express.Router()
let utils = require('../utils')

/**
 * 单物件电力柱状图
 */
router.post('/getEnergyBarChart',(req,res,next)=>{
    res.locals.data = {
        warm:utils.createRandomData(100,200),
        cold:utils.createRandomData(100,200),
        temper:utils.createRandomData(0,40),
    }

    next()
})

/**
 * 单物件电力ErrDay
 */
router.post('/getEnergyErrLine',(req,res,next)=>{
    res.locals.data = utils.createRandomData(0,5)

    next()
})

/**
 * 多物件耗电量
 */
router.post('/getEnergyMultiLine',(req,res,next)=>{

    res.locals.data = req.body.selected.map(()=>{
        return utils.createRandomData(0,1.9)
    })

    next()
})

/**
 * 多物件错误率
 */
router.post('/getEnergyErrorMultiLine',(req,res,next)=>{

    res.locals.data = req.body.selected.map(()=>{
        return utils.createRandomData(0,1.9)
    })

    next()
})







module.exports = router