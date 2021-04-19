let express = require('express')
let router = express.Router()
let Mock = require('mockjs')
let utils = require('../utils')

/**
 * 在线率数量
 */
router.post('/onlineCountSingleLine',(req,res,next)=>{
    res.locals.data = {
        warm:utils.createRandomData(100,200),
        cold:utils.createRandomData(100,200),
        temper:utils.createRandomData(0,40),
    }

    next()
})


/**
 * 在线率数量
 */
router.post('/getOnlineRateLine',(req,res,next)=>{
    res.locals.data = utils.createRandomData(0,2)

    next()
})





module.exports = router