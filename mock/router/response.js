module.exports = function (req,res){
    let data = res.locals.data;
    let error = !!res.locals.error;
    let resData = {
        error,
        data
    }
    setTimeout(()=>{
        res.status(200).json(resData)
    },2000)
    
}