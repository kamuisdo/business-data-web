let express = require('express')
let router = express.Router()
let utils = require('../utils')
let Mock = require('mockjs')

/**
 * 单物件运转时长柱状图
 */
router.post('/getHabitsSingleLine',(req,res,next)=>{
    res.locals.data = {
        setTemper:utils.createRandomData(20,30),
        returnTemper:utils.createRandomData(24,34),
        energy:utils.createRandomData(100,400),
    }
   //  let Random = Mock.Random
   //  let t = [];
   //  for(let i=0;i<30;i++){
   //      let a = '#' + Random.integer(180, 255).toString(16) +
   //          Random.integer(140, 255).toString(16) +
   //          Random.integer(120, 220).toString(16)
   //      t.push(a)
   //  }
   // console.log(t)

    next()
})

/**
 * 单物件每时刻的运转时长总数
 */
router.post('/getHabitsMultiLine',(req,res,next)=>{
    let t = req.body.selected.map((v)=>{
        return {
            setTemper:utils.createRandomData(20,30),
            returnTemper:utils.createRandomData(24,34),
            energy:utils.createRandomData(100,400),
        }
    });
    res.locals.data = t

    next()
})







module.exports = router