import { ObjectValue,ObjectValueCollection } from './objectValueService'

class  Hour  extends ObjectValue{
    constructor(){
        super('hour', '小时','hour',{ format:'YYYY/MM/DD HH' })
    }
}

class Day  extends ObjectValue{
    constructor(){
        super('day', '天','day',{ format:'YYYY/MM/DD' })
    }
}
class Month extends ObjectValue {
    constructor() {
        super('month', '月', 'month',{ format:'YYYY/MM' })
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
