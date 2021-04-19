let express = require('express')
let router = express.Router()
let utils = require('../utils')

/**
 * 单物件电力柱状图
 */
router.post('/getCo2',(req,res,next)=>{
    let data = req.body.selected.map((v)=>{
        return {
            name:v.name,
            data:utils.createRandomData(100,200,30)
        }
    })
    res.locals.data = data

    next()
})


module.exports = router