let express = require('express')
let router = express.Router()
let Mock = require('mockjs')
let utils = require('../utils')

/**
 * 在线率数量
 */
router.post('/onlineRateMultiLine',(req,res,next)=>{
    let body = req.body;

    res.locals.data = req.body.selected.map(()=>{
        return utils.createRandomData(0,1.9)
    })

    next()
})





module.exports = router