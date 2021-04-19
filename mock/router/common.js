let express = require('express')
let router = express.Router()
let Mock = require('mockjs')

/**
 * 获取物件类型
 */
router.post('/getProjectType',(req,res,next)=>{
    let list = ['A1商店','A2餐馆，娱乐场所','A3多店铺','B1工厂，仓库','B2办公室','B3计算机房','C1政府机构','C2医院机构','C3学校，教育机构','C4银行机构','D1宾馆，旅社','E1私人住宅','ZZ其他']
    res.locals.data = list.map((v)=>{ return {name:v,value:v} })

    next()
})

/**
 * 获取物件表格
 */
router.post('/getProjectList',(req,res,next)=>{
    let listData = Mock.mock({
        'list|10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'key|+1': 1,
            "projectName": "@ctitle"
        }]
    })
    res.locals.data = Object.assign(listData,{ total:100 })

    next()
})

/**
 * 获取LcNo表格
 */
router.post('/getLcNoList',(req,res,next)=>{
    let listData = Mock.mock({
        'list|10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'key|+1': 1,
            "lcNoName": "@character"
        }]
    })
    res.locals.data = Object.assign(listData,{ total:100 })

    next()
})

/**
 * 获取System表格
 */
router.post('/getSystemList',(req,res,next)=>{
    let listData = Mock.mock({
        'list|10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'key|+1': 1,
            "lcNoName": "@string"
        }]
    })
    res.locals.data = Object.assign(listData,{ total:100 })

    next()
})

/**
 * 获取物件列表
 */
router.post('/getBuildingInfo',(req,res,next)=>{
    res.locals.data = [{"snPk":89,"atStatus":"1","atStartDt":"2015-12-05T22:13:56.000+0000","atEndDt":null,"descr":" ","langCd":"ch","cntryCd":null,"tmzoneId":"Asia/Shanghai","customerId":88,"accCstmrId":"TEST005","ownerId":0,"buildingName":"大金中国投资有限公司","shortName":"大金中国","chargeSsId":799,"salseSpId":null,"maintainSpId":null,"contactPerson":" ","nightPerson":" ","nightInfo":"11.2金晓宇：联系陈志宇，U5内机目前改造，今后也永久不使用\n2018/1/30钱敏明：LI1N000137终端无效化，该设备已被家装智能使用。 ","buildingType":"B","centerType":0,"esBuildingName":null,"esShortName":null,"esAddress":null,"esNightPerson":null,"esContactPerson":null,"esNightInfo":null,"esDescr":null,"servicetypeId":0,"maintainSpViceId":null,"shopId":null,"floorArea":null,"packType":2,"commissioningFlag":null,"observPointId":null,"airnetSupportFlg":null,"dealerId":null,"regionName":"华东","regionCode":"10","provinceName":"上海","provinceCode":"310000","cityName":"上海市","cityCode":"310100","buildingSort":"B2","comterminalNum":"7","lineNum":"8","inunitNum":"70","powerNum":"88"},{"snPk":121,"atStatus":"1","atStartDt":"2016-01-11T20:33:43.000+0000","atEndDt":null,"descr":" ","langCd":"ch","cntryCd":null,"tmzoneId":"Asia/Shanghai","customerId":119,"accCstmrId":"S160001","ownerId":0,"buildingName":"上海春竹集团办公楼","shortName":"春竹集团","chargeSsId":799,"salseSpId":null,"maintainSpId":null,"contactPerson":" ","nightPerson":" ","nightInfo":" ","buildingType":"B","centerType":0,"esBuildingName":null,"esShortName":null,"esAddress":null,"esNightPerson":null,"esContactPerson":null,"esNightInfo":null,"esDescr":null,"servicetypeId":0,"maintainSpViceId":null,"shopId":null,"floorArea":600.0000,"packType":2,"commissioningFlag":null,"observPointId":null,"airnetSupportFlg":null,"dealerId":null,"regionName":"华东","regionCode":"10","provinceName":"上海","provinceCode":"310000","cityName":"上海市","cityCode":"310100","buildingSort":"B2","comterminalNum":"1","lineNum":"1","inunitNum":"19","powerNum":null},{"snPk":122,"atStatus":"1","atStartDt":"2016-01-12T00:44:30.000+0000","atEndDt":null,"descr":" ","langCd":"ch","cntryCd":null,"tmzoneId":"Asia/Shanghai","customerId":56,"accCstmrId":"S160002","ownerId":0,"buildingName":"上海交通大学电子信息楼重点实验室","shortName":"交大电信楼实验室","chargeSsId":799,"salseSpId":null,"maintainSpId":null,"contactPerson":"李璐怡","nightPerson":" ","nightInfo":"2017/6/21 交大的故障联系方全都修改为李璐怡担当（王晓霖改）","buildingType":"B","centerType":0,"esBuildingName":null,"esShortName":null,"esAddress":null,"esNightPerson":null,"esContactPerson":null,"esNightInfo":null,"esDescr":null,"servicetypeId":0,"maintainSpViceId":null,"shopId":null,"floorArea":400.0000,"packType":2,"commissioningFlag":null,"observPointId":null,"airnetSupportFlg":null,"dealerId":null,"regionName":"华东","regionCode":"10","provinceName":"上海","provinceCode":"310000","cityName":"上海市","cityCode":"310100","buildingSort":"B2","comterminalNum":"1","lineNum":"2","inunitNum":"12","powerNum":"60"},{"snPk":123,"atStatus":"1","atStartDt":"2016-01-31T23:07:23.000+0000","atEndDt":null,"descr":"LI2N000006品管测试用，不使用。（17.6.26 仓明惠）","langCd":"ch","cntryCd":null,"tmzoneId":"Asia/Shanghai","customerId":56,"accCstmrId":"TEST006","ownerId":0,"buildingName":"大金工厂品质管理","shortName":"工厂品管","chargeSsId":799,"salseSpId":null,"maintainSpId":null,"contactPerson":" ","nightPerson":" ","nightInfo":"18.2.26仓：原客户负责人离职，暂时不清楚交由谁负责。","buildingType":"B","centerType":0,"esBuildingName":null,"esShortName":null,"esAddress":null,"esNightPerson":null,"esContactPerson":null,"esNightInfo":null,"esDescr":null,"servicetypeId":0,"maintainSpViceId":null,"shopId":null,"floorArea":null,"packType":2,"commissioningFlag":null,"observPointId":null,"airnetSupportFlg":null,"dealerId":null,"regionName":"华东","regionCode":"10","provinceName":"上海","provinceCode":"310000","cityName":"上海市","cityCode":"310100","buildingSort":"B1","comterminalNum":"2","lineNum":"2","inunitNum":"15","powerNum":null},{"snPk":161,"atStatus":"1","atStartDt":"2016-08-07T21:35:54.000+0000","atEndDt":null,"descr":" ","langCd":"ch","cntryCd":null,"tmzoneId":"Asia/Shanghai","customerId":56,"accCstmrId":"TEST009","ownerId":0,"buildingName":"大金空调（上海）有限公司","shortName":"DIS","chargeSsId":799,"salseSpId":null,"maintainSpId":null,"contactPerson":" ","nightPerson":" ","nightInfo":" ","buildingType":"B","centerType":0,"esBuildingName":null,"esShortName":null,"esAddress":null,"esNightPerson":null,"esContactPerson":null,"esNightInfo":null,"esDescr":null,"servicetypeId":0,"maintainSpViceId":null,"shopId":null,"floorArea":null,"packType":2,"commissioningFlag":null,"observPointId":null,"airnetSupportFlg":null,"dealerId":null,"regionName":"华东","regionCode":"10","provinceName":"上海","provinceCode":"310000","cityName":"上海市","cityCode":"310100","buildingSort":"B1","comterminalNum":"24","lineNum":"29","inunitNum":"83","powerNum":"450"},{"snPk":190,"atStatus":"1","atStartDt":"2016-08-26T00:00:00.000+0000","atEndDt":null,"descr":" ","langCd":"ch","cntryCd":null,"tmzoneId":"Asia/Shanghai","customerId":56,"accCstmrId":"TEST026","ownerId":0,"buildingName":"DIC研修所","shortName":"DIC研修所","chargeSsId":799,"salseSpId":null,"maintainSpId":null,"contactPerson":" ","nightPerson":" ","nightInfo":" ","buildingType":"B","centerType":0,"esBuildingName":null,"esShortName":null,"esAddress":null,"esNightPerson":null,"esContactPerson":null,"esNightInfo":null,"esDescr":null,"servicetypeId":0,"maintainSpViceId":null,"shopId":null,"floorArea":null,"packType":2,"commissioningFlag":null,"observPointId":null,"airnetSupportFlg":null,"dealerId":null,"regionName":"华东","regionCode":"10","provinceName":"上海","provinceCode":"310000","cityName":"上海市","cityCode":"310100","buildingSort":"B1","comterminalNum":"8","lineNum":"15","inunitNum":"53","powerNum":"174"},{"snPk":199,"atStatus":"1","atStartDt":"2016-09-05T00:19:50.000+0000","atEndDt":null,"descr":" ","langCd":"ch","cntryCd":null,"tmzoneId":"Asia/Shanghai","customerId":56,"accCstmrId":"TEST030","ownerId":0,"buildingName":"Solution Plaza C, D会议室","shortName":"C会议室","chargeSsId":799,"salseSpId":null,"maintainSpId":null,"contactPerson":" ","nightPerson":" ","nightInfo":" ","buildingType":"B","centerType":0,"esBuildingName":null,"esShortName":null,"esAddress":null,"esNightPerson":null,"esContactPerson":null,"esNightInfo":null,"esDescr":null,"servicetypeId":0,"maintainSpViceId":null,"shopId":null,"floorArea":null,"packType":2,"commissioningFlag":null,"observPointId":null,"airnetSupportFlg":null,"dealerId":null,"regionName":"华东","regionCode":"10","provinceName":"上海","provinceCode":"310000","cityName":"上海市","cityCode":"310100","buildingSort":"B2","comterminalNum":"6","lineNum":"5","inunitNum":"24","powerNum":"80"},{"snPk":207,"atStatus":"1","atStartDt":"2016-10-11T18:29:34.000+0000","atEndDt":null,"descr":" ","langCd":"ch","cntryCd":null,"tmzoneId":"Asia/Shanghai","customerId":56,"accCstmrId":"S160016","ownerId":0,"buildingName":"星巴克碧云路店","shortName":"星巴克碧云路","chargeSsId":799,"salseSpId":null,"maintainSpId":null,"contactPerson":" ","nightPerson":" ","nightInfo":" ","buildingType":"A","centerType":0,"esBuildingName":null,"esShortName":null,"esAddress":null,"esNightPerson":null,"esContactPerson":null,"esNightInfo":null,"esDescr":null,"servicetypeId":0,"maintainSpViceId":null,"shopId":null,"floorArea":null,"packType":2,"commissioningFlag":null,"observPointId":101020600,"airnetSupportFlg":null,"dealerId":null,"regionName":"华东","regionCode":"10","provinceName":"上海","provinceCode":"310000","cityName":"上海市","cityCode":"310100","buildingSort":"A3","comterminalNum":"2","lineNum":"2","inunitNum":"8","powerNum":"32"},{"snPk":240,"atStatus":"1","atStartDt":"2016-11-23T20:58:03.000+0000","atEndDt":null,"descr":" ","langCd":"ch","cntryCd":null,"tmzoneId":"Asia/Shanghai","customerId":56,"accCstmrId":"S160017","ownerId":0,"buildingName":"星巴克金谊广场店","shortName":"星巴克金谊广场店","chargeSsId":799,"salseSpId":null,"maintainSpId":null,"contactPerson":" ","nightPerson":" ","nightInfo":" ","buildingType":"A","centerType":0,"esBuildingName":null,"esShortName":null,"esAddress":null,"esNightPerson":null,"esContactPerson":null,"esNightInfo":null,"esDescr":null,"servicetypeId":0,"maintainSpViceId":null,"shopId":null,"floorArea":null,"packType":2,"commissioningFlag":null,"observPointId":null,"airnetSupportFlg":null,"dealerId":null,"regionName":"华东","regionCode":"10","provinceName":"上海","provinceCode":"310000","cityName":"上海市","cityCode":"310100","buildingSort":"A3","comterminalNum":"1","lineNum":"1","inunitNum":"5","powerNum":"16"},{"snPk":284,"atStatus":"1","atStartDt":"2017-04-05T20:36:46.000+0000","atEndDt":null,"descr":" ","langCd":"ch","cntryCd":null,"tmzoneId":"Asia/Shanghai","customerId":56,"accCstmrId":"TEST031","ownerId":0,"buildingName":"宝山研修所","shortName":"宝山研修所","chargeSsId":799,"salseSpId":null,"maintainSpId":null,"contactPerson":" ","nightPerson":" ","nightInfo":" ","buildingType":"C","centerType":0,"esBuildingName":null,"esShortName":null,"esAddress":null,"esNightPerson":null,"esContactPerson":null,"esNightInfo":null,"esDescr":null,"servicetypeId":0,"maintainSpViceId":null,"shopId":null,"floorArea":null,"packType":2,"commissioningFlag":null,"observPointId":101020200,"airnetSupportFlg":null,"dealerId":null,"regionName":"华东","regionCode":"10","provinceName":"上海","provinceCode":"310000","cityName":"上海市","cityCode":"310100","buildingSort":"C3","comterminalNum":"3","lineNum":"16","inunitNum":"61","powerNum":"14"}]
    res.locals.type = 'pageable'
    // res.locals.error = true
    next()
})

/**
 * 根据物件获取室内机
 */
router.get('/getBuildingDetailById',(req,res,next)=>{
    let listData = Mock.mock({
        'list|10': [{
            'snPk': "@character",
            "Name": "@string",
            "lcNo|1": ['lcNo1','lcNo2'],
            "location": '@string',
            "lineId|1": ['line1','line2','line3'],
            "lineName|1": ['line1','line2','line3'],
            "unitId": '@character',
            "modeltypeId": '@character'
        }]
    })
    res.locals.data = listData.list
    // res.locals.error = true

    next()
})



module.exports = router