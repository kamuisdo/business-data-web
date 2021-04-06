let express = require('express')
let router = express.Router()

/**
 * 获取物件类型
 */
router.post('/getProjectType',(req,res,next)=>{
    let list = ['A1商店','A2餐馆，娱乐场所','A3多店铺','B1工厂，仓库','B2办公室','B3计算机房','C1政府机构','C2医院机构','C3学校，教育机构','C4银行机构','D1宾馆，旅社','E1私人住宅','ZZ其他']
    res.locals.data = list.map((v)=>{ return {name:v,value:v} })

    next()
})





module.exports = router