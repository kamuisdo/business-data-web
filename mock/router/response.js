module.exports = function (req,res){
    let data = res.locals.data;
    let type = res.locals.type;
    let error = !!res.locals.error;
    let code = error ? -1 : 0;
    if(type === 'pageable'){
        data = {
            list:data,
            pageInfo:{
                total:100,
                size:10,
                pageNumber:1,
                pageSize:10
            }
        }
    }
    let resData = {
        code,
        data
    }
    setTimeout(()=>{
        res.status(200).json(resData)
    },2000)
    
}