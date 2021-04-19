let dayjs = require('dayjs')

/**
 * 创建一年内按照天逐步增长的数据
 * @param amount  每天增长量
 * @returns {[[*|string, number]]}
 */
let createIncreaseData = (amount=10) =>{
    let orgDate = dayjs('2021-01-01');
    let orgVal = Math.floor(Math.random() * 300)
    let data = [[orgDate.format('YYYY/MM/DD'),orgVal]]
    for(let i=0;i<364;i++){
        data.push([
            orgDate.add(i+1,'day').format('YYYY/MM/DD'),
            orgVal+=Math.floor(Math.random() * amount)
        ]);
    }
    return data;
}


let createRandomData = (m,n,day=365)=>{
    let orgDate = dayjs('2021-01-01');
    let orgVal = Math.floor(Math.random()*(m-n))+n
    let data = [[orgDate.format('YYYY/MM/DD'),orgVal]]
    for(let i=0;i<(day-1);i++){
        data.push([
            orgDate.add(i+1,'day').format('YYYY/MM/DD'),
            Math.floor(Math.random()*(m-n))+n
        ]);
    }
    return data;
}


let randomData = (m,n)=>{
    return Math.floor(Math.random()*(m-n))+n
}

module.exports = {
    createIncreaseData,
    createRandomData,
    randomData
}