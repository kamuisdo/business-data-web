import { ObjectValue,ObjectValueCollection } from './objectValueService'

class  FailsToNotifyThe  extends ObjectValue{
    constructor(){
        super('1', '未通知','FailsToNotifyThe')
    }
}

class PartOfTheNotice  extends ObjectValue{
    constructor(){
        super('2', '部分通知','PartOfTheNotice')
    }
}
class HaveInformed extends ObjectValue {
    constructor() {
        super('3', '已通知', 'HaveInformed')
    }
}

class OrderNoticeStatus extends ObjectValueCollection{
    constructor() {
        super();
        this.add(new FailsToNotifyThe());
        this.add(new PartOfTheNotice());
        this.add(new HaveInformed());
    }
}


export const OrderNoticeStatusInstance = new OrderNoticeStatus();
