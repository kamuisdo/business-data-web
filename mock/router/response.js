module.exports = function (req,res){
    let data = res.locals.data;
    let resData = {
        error:false,
        data
    }
    setTimeout(()=>{
        res.status(200).json(resData)
    },5000)
    
}