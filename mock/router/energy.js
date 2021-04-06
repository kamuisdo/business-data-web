let express = require('express')
let router = express.Router()
let utils = require('../utils')

/**
 * 获取物件类型
 */
router.post('/getEnergyBarChart',(req,res,next)=>{
    res.locals.data = {
        warm:utils.createRandomData(100,200),
        cold:utils.createRandomData(100,200),
        temper:utils.createRandomData(0,40),
    }

    next()
})





module.exports = router