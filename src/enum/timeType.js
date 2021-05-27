import { ObjectValue,ObjectValueCollection } from './objectValueService'

class  Hour  extends ObjectValue{
    constructor(){
        super('hour', '小时','hour',{
            format:'YYYY/MM/DD HH:00',
            // date的格式为2010010101，数字类型
            formatFn:(date)=>{
                date = date.toString()
                let year = date.slice(0,4)
                let moth = date.slice(4,6)
                let day = date.slice(6,8)
                let hour = date.slice(8,10)
                return `${year}/${moth}/${day} ${hour}:00`
            }
        })
    }
}

class Day  extends ObjectValue{
    constructor(){
        super('day', '天','day',{
            format:'YYYY/MM/DD',
            formatFn:(date)=>{
                date = date.toString()
                let year = date.slice(0,4)
                let moth = date.slice(4,6)
                let day = date.slice(6,8)
                return `${year}/${moth}/${day}`
            }
        })
    }
}
class Month extends ObjectValue {
    constructor() {
        super('month', '月', 'month',{
            format:'YYYY/MM',
            formatFn:(date)=>{
                date = date.toString()
                let year = date.slice(0,4)
                let moth = date.slice(4,6)
                return `${year}/${moth}`
            }
        })
    }
}

class TimeType extends ObjectValueCollection{
    constructor() {
        super();
        this.add(new Hour());
        this.add(new Day());
        this.add(new Month());
    }
}


export const TimeTypeEnum = new TimeType();
